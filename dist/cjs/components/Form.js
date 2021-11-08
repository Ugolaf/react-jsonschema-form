"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _ErrorList = _interopRequireDefault(require("./ErrorList"));

var _utils = require("../utils");

var _validate = _interopRequireWildcard(require("../validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getUsedFormData", function (formData, fields) {
      //for the case of a single input form
      if (fields.length === 0 && _typeof(formData) !== "object") {
        return formData;
      }

      var data = (0, _pick2["default"])(formData, fields);

      if (Array.isArray(formData)) {
        return Object.keys(data).map(function (key) {
          return data[key];
        });
      }

      return data;
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldNames", function (pathSchema, formData) {
      var getAllPaths = function getAllPaths(_obj) {
        var acc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [""];
        Object.keys(_obj).forEach(function (key) {
          if (_typeof(_obj[key]) === "object") {
            var newPaths = paths.map(function (path) {
              return "".concat(path, ".").concat(key);
            }); // If an object is marked with additionalProperties, all its keys are valid

            if (_obj[key].__rjsf_additionalProperties && _obj[key].$name !== "") {
              acc.push(_obj[key].$name);
            } else {
              getAllPaths(_obj[key], acc, newPaths);
            }
          } else if (key === "$name" && _obj[key] !== "") {
            paths.forEach(function (path) {
              path = path.replace(/^\./, "");
              var formValue = (0, _get2["default"])(formData, path); // adds path to fieldNames if it points to a value
              // or an empty object/array

              if (_typeof(formValue) !== "object" || (0, _isEmpty2["default"])(formValue)) {
                acc.push(path);
              }
            });
          }
        });
        return acc;
      };

      return getAllPaths(pathSchema);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (formData, newErrorSchema) {
      if ((0, _utils.isObject)(formData) || Array.isArray(formData)) {
        var newState = _this.getStateFromProps(_this.props, formData);

        formData = newState.formData;
      }

      var mustValidate = !_this.props.noValidate && _this.props.liveValidate;
      var state = {
        formData: formData
      };
      var newFormData = formData;

      if (_this.props.omitExtraData === true && _this.props.liveOmit === true) {
        var retrievedSchema = (0, _utils.retrieveSchema)(_this.state.schema, _this.state.schema, formData);
        var pathSchema = (0, _utils.toPathSchema)(retrievedSchema, "", _this.state.schema, formData);

        var fieldNames = _this.getFieldNames(pathSchema, formData);

        newFormData = _this.getUsedFormData(formData, fieldNames);
        state = {
          formData: newFormData
        };
      }

      if (mustValidate) {
        var schemaValidation = _this.validate(newFormData);

        var errors = schemaValidation.errors;
        var errorSchema = schemaValidation.errorSchema;
        var schemaValidationErrors = errors;
        var schemaValidationErrorSchema = errorSchema;

        if (_this.props.extraErrors) {
          errorSchema = (0, _utils.mergeObjects)(errorSchema, _this.props.extraErrors, !!"concat arrays");
          errors = (0, _validate.toErrorList)(errorSchema);
        }

        state = {
          formData: newFormData,
          errors: errors,
          errorSchema: errorSchema,
          schemaValidationErrors: schemaValidationErrors,
          schemaValidationErrorSchema: schemaValidationErrorSchema
        };
      } else if (!_this.props.noValidate && newErrorSchema) {
        var _errorSchema = _this.props.extraErrors ? (0, _utils.mergeObjects)(newErrorSchema, _this.props.extraErrors, !!"concat arrays") : newErrorSchema;

        state = {
          formData: newFormData,
          errorSchema: _errorSchema,
          errors: (0, _validate.toErrorList)(_errorSchema)
        };
      }

      _this.setState(state, function () {
        return _this.props.onChange && _this.props.onChange(_this.state);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      if (_this.props.onBlur) {
        var _this$props;

        (_this$props = _this.props).onBlur.apply(_this$props, arguments);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      if (_this.props.onFocus) {
        var _this$props2;

        (_this$props2 = _this.props).onFocus.apply(_this$props2, arguments);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
      event.preventDefault();

      if (event.target !== event.currentTarget) {
        return;
      }

      event.persist();
      var newFormData = _this.state.formData;

      if (_this.props.omitExtraData === true) {
        var retrievedSchema = (0, _utils.retrieveSchema)(_this.state.schema, _this.state.schema, newFormData);
        var pathSchema = (0, _utils.toPathSchema)(retrievedSchema, "", _this.state.schema, newFormData);

        var fieldNames = _this.getFieldNames(pathSchema, newFormData);

        newFormData = _this.getUsedFormData(newFormData, fieldNames);
      }

      if (!_this.props.noValidate) {
        var schemaValidation = _this.validate(newFormData);

        var _errors = schemaValidation.errors;
        var _errorSchema2 = schemaValidation.errorSchema;
        var schemaValidationErrors = _errors;
        var schemaValidationErrorSchema = _errorSchema2;

        if (Object.keys(_errors).length > 0) {
          if (_this.props.extraErrors) {
            _errorSchema2 = (0, _utils.mergeObjects)(_errorSchema2, _this.props.extraErrors, !!"concat arrays");
            _errors = (0, _validate.toErrorList)(_errorSchema2);
          }

          _this.setState({
            errors: _errors,
            errorSchema: _errorSchema2,
            schemaValidationErrors: schemaValidationErrors,
            schemaValidationErrorSchema: schemaValidationErrorSchema
          }, function () {
            if (_this.props.onError) {
              _this.props.onError(_errors);
            } else {
              console.error("Form validation failed", _errors);
            }
          });

          return;
        }
      } // There are no errors generated through schema validation.
      // Check for user provided errors and update state accordingly.


      var errorSchema;
      var errors;

      if (_this.props.extraErrors) {
        errorSchema = _this.props.extraErrors;
        errors = (0, _validate.toErrorList)(errorSchema);
      } else {
        errorSchema = {};
        errors = [];
      }

      _this.setState({
        formData: newFormData,
        errors: errors,
        errorSchema: errorSchema,
        schemaValidationErrors: [],
        schemaValidationErrorSchema: {}
      }, function () {
        if (_this.props.onSubmit) {
          _this.props.onSubmit(_objectSpread({}, _this.state, {
            formData: newFormData,
            status: "submitted"
          }), event);
        }
      });
    });

    _this.state = _this.getStateFromProps(props, props.formData);

    if (_this.props.onChange && !(0, _utils.deepEquals)(_this.state.formData, _this.props.formData)) {
      _this.props.onChange(_this.state);
    }

    _this.formElement = null;
    return _this;
  }

  _createClass(Form, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var nextState = this.getStateFromProps(nextProps, nextProps.formData);

      if (!(0, _utils.deepEquals)(nextState.formData, nextProps.formData) && !(0, _utils.deepEquals)(nextState.formData, this.state.formData) && this.props.onChange) {
        this.props.onChange(nextState);
      }

      this.setState(nextState);
    }
  }, {
    key: "getStateFromProps",
    value: function getStateFromProps(props, inputFormData) {
      var state = this.state || {};
      var schema = "schema" in props ? props.schema : this.props.schema;
      var uiSchema = "uiSchema" in props ? props.uiSchema : this.props.uiSchema;
      var edit = typeof inputFormData !== "undefined";
      var liveValidate = "liveValidate" in props ? props.liveValidate : this.props.liveValidate;
      var mustValidate = edit && !props.noValidate && liveValidate;
      var rootSchema = schema;
      var formData = (0, _utils.getDefaultFormState)(schema, inputFormData, rootSchema);
      var retrievedSchema = (0, _utils.retrieveSchema)(schema, rootSchema, formData);
      var customFormats = props.customFormats;
      var localizeErrors = props.localizeErrors;
      var additionalMetaSchemas = props.additionalMetaSchemas;

      var getCurrentErrors = function getCurrentErrors() {
        if (props.noValidate) {
          return {
            errors: [],
            errorSchema: {}
          };
        } else if (!props.liveValidate) {
          return {
            errors: state.schemaValidationErrors || [],
            errorSchema: state.schemaValidationErrorSchema || {}
          };
        }

        return {
          errors: state.errors || [],
          errorSchema: state.errorSchema || {}
        };
      };

      var errors, errorSchema, schemaValidationErrors, schemaValidationErrorSchema;

      if (mustValidate) {
        var schemaValidation = this.validate(formData, schema, additionalMetaSchemas, customFormats, localizeErrors);
        errors = schemaValidation.errors;
        errorSchema = schemaValidation.errorSchema;
        schemaValidationErrors = errors;
        schemaValidationErrorSchema = errorSchema;
      } else {
        var currentErrors = getCurrentErrors();
        errors = currentErrors.errors;
        errorSchema = currentErrors.errorSchema;
        schemaValidationErrors = state.schemaValidationErrors;
        schemaValidationErrorSchema = state.schemaValidationErrorSchema;
      }

      if (props.extraErrors) {
        errorSchema = (0, _utils.mergeObjects)(errorSchema, props.extraErrors, !!"concat arrays");
        errors = (0, _validate.toErrorList)(errorSchema);
      }

      var idSchema = (0, _utils.toIdSchema)(retrievedSchema, uiSchema["ui:rootFieldId"], rootSchema, formData, props.idPrefix);
      var nextState = {
        schema: schema,
        uiSchema: uiSchema,
        idSchema: idSchema,
        formData: formData,
        edit: edit,
        errors: errors,
        errorSchema: errorSchema,
        additionalMetaSchemas: additionalMetaSchemas
      };

      if (schemaValidationErrors) {
        nextState.schemaValidationErrors = schemaValidationErrors;
        nextState.schemaValidationErrorSchema = schemaValidationErrorSchema;
      }

      return nextState;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
    }
  }, {
    key: "validate",
    value: function validate(formData) {
      var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.schema;
      var additionalMetaSchemas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.additionalMetaSchemas;
      var customFormats = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.props.customFormats;
      var localizeErrors = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.props.localizeErrors;
      var _this$props3 = this.props,
          validate = _this$props3.validate,
          transformErrors = _this$props3.transformErrors;

      var _this$getRegistry = this.getRegistry(),
          rootSchema = _this$getRegistry.rootSchema;

      var resolvedSchema = (0, _utils.retrieveSchema)(schema, rootSchema, formData);
      return (0, _validate["default"])(formData, resolvedSchema, validate, transformErrors, additionalMetaSchemas, customFormats, localizeErrors);
    }
  }, {
    key: "renderErrors",
    value: function renderErrors() {
      var _this$state = this.state,
          errors = _this$state.errors,
          errorSchema = _this$state.errorSchema,
          schema = _this$state.schema,
          uiSchema = _this$state.uiSchema;
      var _this$props4 = this.props,
          ErrorList = _this$props4.ErrorList,
          showErrorList = _this$props4.showErrorList,
          formContext = _this$props4.formContext;

      if (errors.length && showErrorList != false) {
        return _react["default"].createElement(ErrorList, {
          errors: errors,
          errorSchema: errorSchema,
          schema: schema,
          uiSchema: uiSchema,
          formContext: formContext
        });
      }

      return null;
    }
  }, {
    key: "getRegistry",
    value: function getRegistry() {
      // For BC, accept passed SchemaField and TitleField props and pass them to
      // the "fields" registry one.
      var _getDefaultRegistry = (0, _utils.getDefaultRegistry)(),
          fields = _getDefaultRegistry.fields,
          widgets = _getDefaultRegistry.widgets;

      return {
        fields: _objectSpread({}, fields, this.props.fields),
        widgets: _objectSpread({}, widgets, this.props.widgets),
        ArrayFieldTemplate: this.props.ArrayFieldTemplate,
        ObjectFieldTemplate: this.props.ObjectFieldTemplate,
        FieldTemplate: this.props.FieldTemplate,
        definitions: this.props.schema.definitions || {},
        rootSchema: this.props.schema,
        formContext: this.props.formContext || {}
      };
    }
  }, {
    key: "submit",
    value: function submit() {
      if (this.formElement) {
        this.formElement.dispatchEvent(new CustomEvent("submit", {
          cancelable: true
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          children = _this$props5.children,
          id = _this$props5.id,
          idPrefix = _this$props5.idPrefix,
          className = _this$props5.className,
          tagName = _this$props5.tagName,
          name = _this$props5.name,
          method = _this$props5.method,
          target = _this$props5.target,
          action = _this$props5.action,
          deprecatedAutocomplete = _this$props5.autocomplete,
          currentAutoComplete = _this$props5.autoComplete,
          enctype = _this$props5.enctype,
          acceptcharset = _this$props5.acceptcharset,
          noHtml5Validate = _this$props5.noHtml5Validate,
          disabled = _this$props5.disabled,
          readonly = _this$props5.readonly,
          formContext = _this$props5.formContext;
      var _this$state2 = this.state,
          schema = _this$state2.schema,
          uiSchema = _this$state2.uiSchema,
          formData = _this$state2.formData,
          errorSchema = _this$state2.errorSchema,
          idSchema = _this$state2.idSchema;
      var registry = this.getRegistry();
      var _SchemaField = registry.fields.SchemaField;
      var FormTag = tagName ? tagName : "form";

      if (deprecatedAutocomplete) {
        console.warn("Using autocomplete property of Form is deprecated, use autoComplete instead.");
      }

      var autoComplete = currentAutoComplete ? currentAutoComplete : deprecatedAutocomplete;
      return _react["default"].createElement(FormTag, {
        className: className ? className : "rjsf",
        id: id,
        name: name,
        method: method,
        target: target,
        action: action,
        autoComplete: autoComplete,
        encType: enctype,
        acceptCharset: acceptcharset,
        noValidate: noHtml5Validate,
        onSubmit: this.onSubmit,
        ref: function ref(form) {
          _this2.formElement = form;
        }
      }, this.renderErrors(), _react["default"].createElement(_SchemaField, {
        schema: schema,
        uiSchema: uiSchema,
        errorSchema: errorSchema,
        idSchema: idSchema,
        idPrefix: idPrefix,
        formContext: formContext,
        formData: formData,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        registry: registry,
        disabled: disabled,
        readonly: readonly
      }), children ? children : _react["default"].createElement("div", null, _react["default"].createElement("button", {
        type: "submit",
        className: "btn btn-info"
      }, "Submit")));
    }
  }]);

  return Form;
}(_react.Component);

exports["default"] = Form;

_defineProperty(Form, "defaultProps", {
  uiSchema: {},
  noValidate: false,
  liveValidate: false,
  disabled: false,
  readonly: false,
  noHtml5Validate: false,
  ErrorList: _ErrorList["default"],
  omitExtraData: false,
  localizeErrors: null
});

if (process.env.NODE_ENV !== "production") {
  Form.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    uiSchema: _propTypes["default"].object,
    formData: _propTypes["default"].any,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    widgets: _propTypes["default"].objectOf(_propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object])),
    fields: _propTypes["default"].objectOf(_propTypes["default"].elementType),
    ArrayFieldTemplate: _propTypes["default"].elementType,
    ObjectFieldTemplate: _propTypes["default"].elementType,
    FieldTemplate: _propTypes["default"].elementType,
    ErrorList: _propTypes["default"].func,
    onChange: _propTypes["default"].func,
    onError: _propTypes["default"].func,
    showErrorList: _propTypes["default"].bool,
    onSubmit: _propTypes["default"].func,
    id: _propTypes["default"].string,
    className: _propTypes["default"].string,
    tagName: _propTypes["default"].elementType,
    name: _propTypes["default"].string,
    method: _propTypes["default"].string,
    target: _propTypes["default"].string,
    action: _propTypes["default"].string,
    autocomplete: _propTypes["default"].string,
    autoComplete: _propTypes["default"].string,
    enctype: _propTypes["default"].string,
    acceptcharset: _propTypes["default"].string,
    noValidate: _propTypes["default"].bool,
    noHtml5Validate: _propTypes["default"].bool,
    liveValidate: _propTypes["default"].bool,
    validate: _propTypes["default"].func,
    transformErrors: _propTypes["default"].func,
    formContext: _propTypes["default"].object,
    customFormats: _propTypes["default"].object,
    additionalMetaSchemas: _propTypes["default"].arrayOf(_propTypes["default"].object),
    omitExtraData: _propTypes["default"].bool,
    extraErrors: _propTypes["default"].object
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Zvcm0uanMiXSwibmFtZXMiOlsiRm9ybSIsInByb3BzIiwiZm9ybURhdGEiLCJmaWVsZHMiLCJsZW5ndGgiLCJkYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsInBhdGhTY2hlbWEiLCJnZXRBbGxQYXRocyIsIl9vYmoiLCJhY2MiLCJwYXRocyIsImZvckVhY2giLCJuZXdQYXRocyIsInBhdGgiLCJfX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMiLCIkbmFtZSIsInB1c2giLCJyZXBsYWNlIiwiZm9ybVZhbHVlIiwibmV3RXJyb3JTY2hlbWEiLCJuZXdTdGF0ZSIsImdldFN0YXRlRnJvbVByb3BzIiwibXVzdFZhbGlkYXRlIiwibm9WYWxpZGF0ZSIsImxpdmVWYWxpZGF0ZSIsInN0YXRlIiwibmV3Rm9ybURhdGEiLCJvbWl0RXh0cmFEYXRhIiwibGl2ZU9taXQiLCJyZXRyaWV2ZWRTY2hlbWEiLCJzY2hlbWEiLCJmaWVsZE5hbWVzIiwiZ2V0RmllbGROYW1lcyIsImdldFVzZWRGb3JtRGF0YSIsInNjaGVtYVZhbGlkYXRpb24iLCJ2YWxpZGF0ZSIsImVycm9ycyIsImVycm9yU2NoZW1hIiwic2NoZW1hVmFsaWRhdGlvbkVycm9ycyIsInNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSIsImV4dHJhRXJyb3JzIiwic2V0U3RhdGUiLCJvbkNoYW5nZSIsIm9uQmx1ciIsIm9uRm9jdXMiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiY3VycmVudFRhcmdldCIsInBlcnNpc3QiLCJvbkVycm9yIiwiY29uc29sZSIsImVycm9yIiwib25TdWJtaXQiLCJzdGF0dXMiLCJmb3JtRWxlbWVudCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsImlucHV0Rm9ybURhdGEiLCJ1aVNjaGVtYSIsImVkaXQiLCJyb290U2NoZW1hIiwiY3VzdG9tRm9ybWF0cyIsImxvY2FsaXplRXJyb3JzIiwiYWRkaXRpb25hbE1ldGFTY2hlbWFzIiwiZ2V0Q3VycmVudEVycm9ycyIsImN1cnJlbnRFcnJvcnMiLCJpZFNjaGVtYSIsImlkUHJlZml4IiwidHJhbnNmb3JtRXJyb3JzIiwiZ2V0UmVnaXN0cnkiLCJyZXNvbHZlZFNjaGVtYSIsIkVycm9yTGlzdCIsInNob3dFcnJvckxpc3QiLCJmb3JtQ29udGV4dCIsIndpZGdldHMiLCJBcnJheUZpZWxkVGVtcGxhdGUiLCJPYmplY3RGaWVsZFRlbXBsYXRlIiwiRmllbGRUZW1wbGF0ZSIsImRlZmluaXRpb25zIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiY2FuY2VsYWJsZSIsImNoaWxkcmVuIiwiaWQiLCJjbGFzc05hbWUiLCJ0YWdOYW1lIiwibmFtZSIsIm1ldGhvZCIsImFjdGlvbiIsImRlcHJlY2F0ZWRBdXRvY29tcGxldGUiLCJhdXRvY29tcGxldGUiLCJjdXJyZW50QXV0b0NvbXBsZXRlIiwiYXV0b0NvbXBsZXRlIiwiZW5jdHlwZSIsImFjY2VwdGNoYXJzZXQiLCJub0h0bWw1VmFsaWRhdGUiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwicmVnaXN0cnkiLCJfU2NoZW1hRmllbGQiLCJTY2hlbWFGaWVsZCIsIkZvcm1UYWciLCJ3YXJuIiwiZm9ybSIsInJlbmRlckVycm9ycyIsIkNvbXBvbmVudCIsIkRlZmF1bHRFcnJvckxpc3QiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiYW55IiwiYm9vbCIsIm9iamVjdE9mIiwib25lT2ZUeXBlIiwiZnVuYyIsImVsZW1lbnRUeXBlIiwic3RyaW5nIiwiYXJyYXlPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQVVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR3FCQSxJOzs7OztBQWFuQixnQkFBWUMsS0FBWixF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QUEsV0FBVyxFQUFFc0Msc0JBQVVDLE1BbENSO0FBbUNmbkQsSUFBQUEsYUFBYSxFQUFFa0Qsc0JBQVVDLE1BbkNWO0FBb0NmakQsSUFBQUEscUJBQXFCLEVBQUVnRCxzQkFBVVUsT0FBVixDQUFrQlYsc0JBQVVDLE1BQTVCLENBcENSO0FBcUNmdEYsSUFBQUEsYUFBYSxFQUFFcUYsc0JBQVVJLElBckNWO0FBc0NmNUUsSUFBQUEsV0FBVyxFQUFFd0Usc0JBQVVDO0FBdENSLEdBQWpCO0FBd0NEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBfcGljayBmcm9tIFwibG9kYXNoL3BpY2tcIjtcclxuaW1wb3J0IF9nZXQgZnJvbSBcImxvZGFzaC9nZXRcIjtcclxuaW1wb3J0IF9pc0VtcHR5IGZyb20gXCJsb2Rhc2gvaXNFbXB0eVwiO1xyXG5cclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBEZWZhdWx0RXJyb3JMaXN0IH0gZnJvbSBcIi4vRXJyb3JMaXN0XCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0RGVmYXVsdEZvcm1TdGF0ZSxcclxuICByZXRyaWV2ZVNjaGVtYSxcclxuICBzaG91bGRSZW5kZXIsXHJcbiAgdG9JZFNjaGVtYSxcclxuICBnZXREZWZhdWx0UmVnaXN0cnksXHJcbiAgZGVlcEVxdWFscyxcclxuICB0b1BhdGhTY2hlbWEsXHJcbiAgaXNPYmplY3QsXHJcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB2YWxpZGF0ZUZvcm1EYXRhLCB7IHRvRXJyb3JMaXN0IH0gZnJvbSBcIi4uL3ZhbGlkYXRlXCI7XHJcbmltcG9ydCB7IG1lcmdlT2JqZWN0cyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHVpU2NoZW1hOiB7fSxcclxuICAgIG5vVmFsaWRhdGU6IGZhbHNlLFxyXG4gICAgbGl2ZVZhbGlkYXRlOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHJlYWRvbmx5OiBmYWxzZSxcclxuICAgIG5vSHRtbDVWYWxpZGF0ZTogZmFsc2UsXHJcbiAgICBFcnJvckxpc3Q6IERlZmF1bHRFcnJvckxpc3QsXHJcbiAgICBvbWl0RXh0cmFEYXRhOiBmYWxzZSxcclxuICAgIGxvY2FsaXplRXJyb3JzOiBudWxsLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgcHJvcHMuZm9ybURhdGEpO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlICYmXHJcbiAgICAgICFkZWVwRXF1YWxzKHRoaXMuc3RhdGUuZm9ybURhdGEsIHRoaXMucHJvcHMuZm9ybURhdGEpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlKTtcclxuICAgIH1cclxuICAgIHRoaXMuZm9ybUVsZW1lbnQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgVU5TQUZFX2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKG5leHRQcm9wcywgbmV4dFByb3BzLmZvcm1EYXRhKTtcclxuICAgIGlmIChcclxuICAgICAgIWRlZXBFcXVhbHMobmV4dFN0YXRlLmZvcm1EYXRhLCBuZXh0UHJvcHMuZm9ybURhdGEpICYmXHJcbiAgICAgICFkZWVwRXF1YWxzKG5leHRTdGF0ZS5mb3JtRGF0YSwgdGhpcy5zdGF0ZS5mb3JtRGF0YSkgJiZcclxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobmV4dFN0YXRlKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlRnJvbVByb3BzKHByb3BzLCBpbnB1dEZvcm1EYXRhKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGUgfHwge307XHJcbiAgICBjb25zdCBzY2hlbWEgPSBcInNjaGVtYVwiIGluIHByb3BzID8gcHJvcHMuc2NoZW1hIDogdGhpcy5wcm9wcy5zY2hlbWE7XHJcbiAgICBjb25zdCB1aVNjaGVtYSA9IFwidWlTY2hlbWFcIiBpbiBwcm9wcyA/IHByb3BzLnVpU2NoZW1hIDogdGhpcy5wcm9wcy51aVNjaGVtYTtcclxuICAgIGNvbnN0IGVkaXQgPSB0eXBlb2YgaW5wdXRGb3JtRGF0YSAhPT0gXCJ1bmRlZmluZWRcIjtcclxuICAgIGNvbnN0IGxpdmVWYWxpZGF0ZSA9XHJcbiAgICAgIFwibGl2ZVZhbGlkYXRlXCIgaW4gcHJvcHMgPyBwcm9wcy5saXZlVmFsaWRhdGUgOiB0aGlzLnByb3BzLmxpdmVWYWxpZGF0ZTtcclxuICAgIGNvbnN0IG11c3RWYWxpZGF0ZSA9IGVkaXQgJiYgIXByb3BzLm5vVmFsaWRhdGUgJiYgbGl2ZVZhbGlkYXRlO1xyXG4gICAgY29uc3Qgcm9vdFNjaGVtYSA9IHNjaGVtYTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gZ2V0RGVmYXVsdEZvcm1TdGF0ZShzY2hlbWEsIGlucHV0Rm9ybURhdGEsIHJvb3RTY2hlbWEpO1xyXG4gICAgY29uc3QgcmV0cmlldmVkU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICBjb25zdCBjdXN0b21Gb3JtYXRzID0gcHJvcHMuY3VzdG9tRm9ybWF0cztcclxuICAgIGNvbnN0IGxvY2FsaXplRXJyb3JzID0gcHJvcHMubG9jYWxpemVFcnJvcnM7XHJcbiAgICBjb25zdCBhZGRpdGlvbmFsTWV0YVNjaGVtYXMgPSBwcm9wcy5hZGRpdGlvbmFsTWV0YVNjaGVtYXM7XHJcblxyXG4gICAgY29uc3QgZ2V0Q3VycmVudEVycm9ycyA9ICgpID0+IHtcclxuICAgICAgaWYgKHByb3BzLm5vVmFsaWRhdGUpIHtcclxuICAgICAgICByZXR1cm4geyBlcnJvcnM6IFtdLCBlcnJvclNjaGVtYToge30gfTtcclxuICAgICAgfSBlbHNlIGlmICghcHJvcHMubGl2ZVZhbGlkYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGVycm9yczogc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycyB8fCBbXSxcclxuICAgICAgICAgIGVycm9yU2NoZW1hOiBzdGF0ZS5zY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgfHwge30sXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGVycm9yczogc3RhdGUuZXJyb3JzIHx8IFtdLFxyXG4gICAgICAgIGVycm9yU2NoZW1hOiBzdGF0ZS5lcnJvclNjaGVtYSB8fCB7fSxcclxuICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGVycm9ycyxcclxuICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXHJcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYTtcclxuICAgIGlmIChtdXN0VmFsaWRhdGUpIHtcclxuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoXHJcbiAgICAgICAgZm9ybURhdGEsXHJcbiAgICAgICAgc2NoZW1hLFxyXG4gICAgICAgIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcclxuICAgICAgICBjdXN0b21Gb3JtYXRzLFxyXG4gICAgICAgIGxvY2FsaXplRXJyb3JzXHJcbiAgICAgICk7XHJcbiAgICAgIGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xyXG4gICAgICBlcnJvclNjaGVtYSA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JTY2hlbWE7XHJcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY3VycmVudEVycm9ycyA9IGdldEN1cnJlbnRFcnJvcnMoKTtcclxuICAgICAgZXJyb3JzID0gY3VycmVudEVycm9ycy5lcnJvcnM7XHJcbiAgICAgIGVycm9yU2NoZW1hID0gY3VycmVudEVycm9ycy5lcnJvclNjaGVtYTtcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IHN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvcnM7XHJcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IHN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYTtcclxuICAgIH1cclxuICAgIGlmIChwcm9wcy5leHRyYUVycm9ycykge1xyXG4gICAgICBlcnJvclNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcclxuICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICBwcm9wcy5leHRyYUVycm9ycyxcclxuICAgICAgICAhIVwiY29uY2F0IGFycmF5c1wiXHJcbiAgICAgICk7XHJcbiAgICAgIGVycm9ycyA9IHRvRXJyb3JMaXN0KGVycm9yU2NoZW1hKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlkU2NoZW1hID0gdG9JZFNjaGVtYShcclxuICAgICAgcmV0cmlldmVkU2NoZW1hLFxyXG4gICAgICB1aVNjaGVtYVtcInVpOnJvb3RGaWVsZElkXCJdLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgcHJvcHMuaWRQcmVmaXhcclxuICAgICk7XHJcbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgZWRpdCxcclxuICAgICAgZXJyb3JzLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzLFxyXG4gICAgfTtcclxuICAgIGlmIChzY2hlbWFWYWxpZGF0aW9uRXJyb3JzKSB7XHJcbiAgICAgIG5leHRTdGF0ZS5zY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gc2NoZW1hVmFsaWRhdGlvbkVycm9ycztcclxuICAgICAgbmV4dFN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0U3RhdGU7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiBzaG91bGRSZW5kZXIodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIHNjaGVtYSA9IHRoaXMucHJvcHMuc2NoZW1hLFxyXG4gICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzID0gdGhpcy5wcm9wcy5hZGRpdGlvbmFsTWV0YVNjaGVtYXMsXHJcbiAgICBjdXN0b21Gb3JtYXRzID0gdGhpcy5wcm9wcy5jdXN0b21Gb3JtYXRzLFxyXG4gICAgbG9jYWxpemVFcnJvcnMgPSB0aGlzLnByb3BzLmxvY2FsaXplRXJyb3JzXHJcbiAgKSB7XHJcbiAgICBjb25zdCB7IHZhbGlkYXRlLCB0cmFuc2Zvcm1FcnJvcnMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHRoaXMuZ2V0UmVnaXN0cnkoKTtcclxuICAgIGNvbnN0IHJlc29sdmVkU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gdmFsaWRhdGVGb3JtRGF0YShcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICB2YWxpZGF0ZSxcclxuICAgICAgdHJhbnNmb3JtRXJyb3JzLFxyXG4gICAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMsXHJcbiAgICAgIGN1c3RvbUZvcm1hdHMsXHJcbiAgICAgIGxvY2FsaXplRXJyb3JzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyRXJyb3JzKCkge1xyXG4gICAgY29uc3QgeyBlcnJvcnMsIGVycm9yU2NoZW1hLCBzY2hlbWEsIHVpU2NoZW1hIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgeyBFcnJvckxpc3QsIHNob3dFcnJvckxpc3QsIGZvcm1Db250ZXh0IH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlmIChlcnJvcnMubGVuZ3RoICYmIHNob3dFcnJvckxpc3QgIT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8RXJyb3JMaXN0XHJcbiAgICAgICAgICBlcnJvcnM9e2Vycm9yc31cclxuICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFVzZWRGb3JtRGF0YSA9IChmb3JtRGF0YSwgZmllbGRzKSA9PiB7XHJcbiAgICAvL2ZvciB0aGUgY2FzZSBvZiBhIHNpbmdsZSBpbnB1dCBmb3JtXHJcbiAgICBpZiAoZmllbGRzLmxlbmd0aCA9PT0gMCAmJiB0eXBlb2YgZm9ybURhdGEgIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgcmV0dXJuIGZvcm1EYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkYXRhID0gX3BpY2soZm9ybURhdGEsIGZpZWxkcyk7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLm1hcChrZXkgPT4gZGF0YVtrZXldKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9O1xyXG5cclxuICBnZXRGaWVsZE5hbWVzID0gKHBhdGhTY2hlbWEsIGZvcm1EYXRhKSA9PiB7XHJcbiAgICBjb25zdCBnZXRBbGxQYXRocyA9IChfb2JqLCBhY2MgPSBbXSwgcGF0aHMgPSBbXCJcIl0pID0+IHtcclxuICAgICAgT2JqZWN0LmtleXMoX29iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgX29ialtrZXldID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICBsZXQgbmV3UGF0aHMgPSBwYXRocy5tYXAocGF0aCA9PiBgJHtwYXRofS4ke2tleX1gKTtcclxuICAgICAgICAgIC8vIElmIGFuIG9iamVjdCBpcyBtYXJrZWQgd2l0aCBhZGRpdGlvbmFsUHJvcGVydGllcywgYWxsIGl0cyBrZXlzIGFyZSB2YWxpZFxyXG4gICAgICAgICAgaWYgKF9vYmpba2V5XS5fX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMgJiYgX29ialtrZXldLiRuYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGFjYy5wdXNoKF9vYmpba2V5XS4kbmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRBbGxQYXRocyhfb2JqW2tleV0sIGFjYywgbmV3UGF0aHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIiRuYW1lXCIgJiYgX29ialtrZXldICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4ge1xyXG4gICAgICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwuLywgXCJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IF9nZXQoZm9ybURhdGEsIHBhdGgpO1xyXG4gICAgICAgICAgICAvLyBhZGRzIHBhdGggdG8gZmllbGROYW1lcyBpZiBpdCBwb2ludHMgdG8gYSB2YWx1ZVxyXG4gICAgICAgICAgICAvLyBvciBhbiBlbXB0eSBvYmplY3QvYXJyYXlcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtVmFsdWUgIT09IFwib2JqZWN0XCIgfHwgX2lzRW1wdHkoZm9ybVZhbHVlKSkge1xyXG4gICAgICAgICAgICAgIGFjYy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZ2V0QWxsUGF0aHMocGF0aFNjaGVtYSk7XHJcbiAgfTtcclxuXHJcbiAgb25DaGFuZ2UgPSAoZm9ybURhdGEsIG5ld0Vycm9yU2NoZW1hKSA9PiB7XHJcbiAgICBpZiAoaXNPYmplY3QoZm9ybURhdGEpIHx8IEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyh0aGlzLnByb3BzLCBmb3JtRGF0YSk7XHJcbiAgICAgIGZvcm1EYXRhID0gbmV3U3RhdGUuZm9ybURhdGE7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtdXN0VmFsaWRhdGUgPSAhdGhpcy5wcm9wcy5ub1ZhbGlkYXRlICYmIHRoaXMucHJvcHMubGl2ZVZhbGlkYXRlO1xyXG4gICAgbGV0IHN0YXRlID0geyBmb3JtRGF0YSB9O1xyXG4gICAgbGV0IG5ld0Zvcm1EYXRhID0gZm9ybURhdGE7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvcHMub21pdEV4dHJhRGF0YSA9PT0gdHJ1ZSAmJiB0aGlzLnByb3BzLmxpdmVPbWl0ID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIGZvcm1EYXRhXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHBhdGhTY2hlbWEgPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgcmV0cmlldmVkU2NoZW1hLFxyXG4gICAgICAgIFwiXCIsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZXMgPSB0aGlzLmdldEZpZWxkTmFtZXMocGF0aFNjaGVtYSwgZm9ybURhdGEpO1xyXG5cclxuICAgICAgbmV3Rm9ybURhdGEgPSB0aGlzLmdldFVzZWRGb3JtRGF0YShmb3JtRGF0YSwgZmllbGROYW1lcyk7XHJcbiAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGZvcm1EYXRhOiBuZXdGb3JtRGF0YSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobXVzdFZhbGlkYXRlKSB7XHJcbiAgICAgIGxldCBzY2hlbWFWYWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShuZXdGb3JtRGF0YSk7XHJcbiAgICAgIGxldCBlcnJvcnMgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9ycztcclxuICAgICAgbGV0IGVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvclNjaGVtYTtcclxuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IGVycm9ycztcclxuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gZXJyb3JTY2hlbWE7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XHJcbiAgICAgICAgZXJyb3JTY2hlbWEgPSBtZXJnZU9iamVjdHMoXHJcbiAgICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgICAhIVwiY29uY2F0IGFycmF5c1wiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICAgIH1cclxuICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxyXG4gICAgICAgIGVycm9ycyxcclxuICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzLFxyXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSxcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMubm9WYWxpZGF0ZSAmJiBuZXdFcnJvclNjaGVtYSkge1xyXG4gICAgICBjb25zdCBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXh0cmFFcnJvcnNcclxuICAgICAgICA/IG1lcmdlT2JqZWN0cyhcclxuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG5ld0Vycm9yU2NoZW1hO1xyXG4gICAgICBzdGF0ZSA9IHtcclxuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JTY2hlbWE6IGVycm9yU2NoZW1hLFxyXG4gICAgICAgIGVycm9yczogdG9FcnJvckxpc3QoZXJyb3JTY2hlbWEpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgc3RhdGUsXHJcbiAgICAgICgpID0+IHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlKVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBvbkJsdXIgPSAoLi4uYXJncykgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9uRm9jdXMgPSAoLi4uYXJncykgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xyXG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25TdWJtaXQgPSBldmVudCA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnQucGVyc2lzdCgpO1xyXG4gICAgbGV0IG5ld0Zvcm1EYXRhID0gdGhpcy5zdGF0ZS5mb3JtRGF0YTtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbWl0RXh0cmFEYXRhID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIG5ld0Zvcm1EYXRhXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHBhdGhTY2hlbWEgPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgcmV0cmlldmVkU2NoZW1hLFxyXG4gICAgICAgIFwiXCIsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgbmV3Rm9ybURhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZXMgPSB0aGlzLmdldEZpZWxkTmFtZXMocGF0aFNjaGVtYSwgbmV3Rm9ybURhdGEpO1xyXG5cclxuICAgICAgbmV3Rm9ybURhdGEgPSB0aGlzLmdldFVzZWRGb3JtRGF0YShuZXdGb3JtRGF0YSwgZmllbGROYW1lcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnByb3BzLm5vVmFsaWRhdGUpIHtcclxuICAgICAgbGV0IHNjaGVtYVZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKG5ld0Zvcm1EYXRhKTtcclxuICAgICAgbGV0IGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xyXG4gICAgICBsZXQgZXJyb3JTY2hlbWEgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9yU2NoZW1hO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYTtcclxuICAgICAgaWYgKE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XHJcbiAgICAgICAgICBlcnJvclNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcclxuICAgICAgICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGVycm9ycyxcclxuICAgICAgICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXHJcbiAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uRXJyb3IpIHtcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRXJyb3IoZXJyb3JzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRm9ybSB2YWxpZGF0aW9uIGZhaWxlZFwiLCBlcnJvcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGVyZSBhcmUgbm8gZXJyb3JzIGdlbmVyYXRlZCB0aHJvdWdoIHNjaGVtYSB2YWxpZGF0aW9uLlxyXG4gICAgLy8gQ2hlY2sgZm9yIHVzZXIgcHJvdmlkZWQgZXJyb3JzIGFuZCB1cGRhdGUgc3RhdGUgYWNjb3JkaW5nbHkuXHJcbiAgICBsZXQgZXJyb3JTY2hlbWE7XHJcbiAgICBsZXQgZXJyb3JzO1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZXh0cmFFcnJvcnMpIHtcclxuICAgICAgZXJyb3JTY2hlbWEgPSB0aGlzLnByb3BzLmV4dHJhRXJyb3JzO1xyXG4gICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlcnJvclNjaGVtYSA9IHt9O1xyXG4gICAgICBlcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICB7XHJcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxyXG4gICAgICAgIGVycm9yczogZXJyb3JzLFxyXG4gICAgICAgIGVycm9yU2NoZW1hOiBlcnJvclNjaGVtYSxcclxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzOiBbXSxcclxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWE6IHt9LFxyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWJtaXQpIHtcclxuICAgICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoXHJcbiAgICAgICAgICAgIHsgLi4udGhpcy5zdGF0ZSwgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLCBzdGF0dXM6IFwic3VibWl0dGVkXCIgfSxcclxuICAgICAgICAgICAgZXZlbnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGdldFJlZ2lzdHJ5KCkge1xyXG4gICAgLy8gRm9yIEJDLCBhY2NlcHQgcGFzc2VkIFNjaGVtYUZpZWxkIGFuZCBUaXRsZUZpZWxkIHByb3BzIGFuZCBwYXNzIHRoZW0gdG9cclxuICAgIC8vIHRoZSBcImZpZWxkc1wiIHJlZ2lzdHJ5IG9uZS5cclxuICAgIGNvbnN0IHsgZmllbGRzLCB3aWRnZXRzIH0gPSBnZXREZWZhdWx0UmVnaXN0cnkoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZpZWxkczogeyAuLi5maWVsZHMsIC4uLnRoaXMucHJvcHMuZmllbGRzIH0sXHJcbiAgICAgIHdpZGdldHM6IHsgLi4ud2lkZ2V0cywgLi4udGhpcy5wcm9wcy53aWRnZXRzIH0sXHJcbiAgICAgIEFycmF5RmllbGRUZW1wbGF0ZTogdGhpcy5wcm9wcy5BcnJheUZpZWxkVGVtcGxhdGUsXHJcbiAgICAgIE9iamVjdEZpZWxkVGVtcGxhdGU6IHRoaXMucHJvcHMuT2JqZWN0RmllbGRUZW1wbGF0ZSxcclxuICAgICAgRmllbGRUZW1wbGF0ZTogdGhpcy5wcm9wcy5GaWVsZFRlbXBsYXRlLFxyXG4gICAgICBkZWZpbml0aW9uczogdGhpcy5wcm9wcy5zY2hlbWEuZGVmaW5pdGlvbnMgfHwge30sXHJcbiAgICAgIHJvb3RTY2hlbWE6IHRoaXMucHJvcHMuc2NoZW1hLFxyXG4gICAgICBmb3JtQ29udGV4dDogdGhpcy5wcm9wcy5mb3JtQ29udGV4dCB8fCB7fSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzdWJtaXQoKSB7XHJcbiAgICBpZiAodGhpcy5mb3JtRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmZvcm1FbGVtZW50LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwic3VibWl0XCIsIHtcclxuICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2hpbGRyZW4sXHJcbiAgICAgIGlkLFxyXG4gICAgICBpZFByZWZpeCxcclxuICAgICAgY2xhc3NOYW1lLFxyXG4gICAgICB0YWdOYW1lLFxyXG4gICAgICBuYW1lLFxyXG4gICAgICBtZXRob2QsXHJcbiAgICAgIHRhcmdldCxcclxuICAgICAgYWN0aW9uLFxyXG4gICAgICBhdXRvY29tcGxldGU6IGRlcHJlY2F0ZWRBdXRvY29tcGxldGUsXHJcbiAgICAgIGF1dG9Db21wbGV0ZTogY3VycmVudEF1dG9Db21wbGV0ZSxcclxuICAgICAgZW5jdHlwZSxcclxuICAgICAgYWNjZXB0Y2hhcnNldCxcclxuICAgICAgbm9IdG1sNVZhbGlkYXRlLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIGZvcm1Db250ZXh0LFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgeyBzY2hlbWEsIHVpU2NoZW1hLCBmb3JtRGF0YSwgZXJyb3JTY2hlbWEsIGlkU2NoZW1hIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgcmVnaXN0cnkgPSB0aGlzLmdldFJlZ2lzdHJ5KCk7XHJcbiAgICBjb25zdCBfU2NoZW1hRmllbGQgPSByZWdpc3RyeS5maWVsZHMuU2NoZW1hRmllbGQ7XHJcbiAgICBjb25zdCBGb3JtVGFnID0gdGFnTmFtZSA/IHRhZ05hbWUgOiBcImZvcm1cIjtcclxuICAgIGlmIChkZXByZWNhdGVkQXV0b2NvbXBsZXRlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICBcIlVzaW5nIGF1dG9jb21wbGV0ZSBwcm9wZXJ0eSBvZiBGb3JtIGlzIGRlcHJlY2F0ZWQsIHVzZSBhdXRvQ29tcGxldGUgaW5zdGVhZC5cIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXV0b0NvbXBsZXRlID0gY3VycmVudEF1dG9Db21wbGV0ZVxyXG4gICAgICA/IGN1cnJlbnRBdXRvQ29tcGxldGVcclxuICAgICAgOiBkZXByZWNhdGVkQXV0b2NvbXBsZXRlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxGb3JtVGFnXHJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgPyBjbGFzc05hbWUgOiBcInJqc2ZcIn1cclxuICAgICAgICBpZD17aWR9XHJcbiAgICAgICAgbmFtZT17bmFtZX1cclxuICAgICAgICBtZXRob2Q9e21ldGhvZH1cclxuICAgICAgICB0YXJnZXQ9e3RhcmdldH1cclxuICAgICAgICBhY3Rpb249e2FjdGlvbn1cclxuICAgICAgICBhdXRvQ29tcGxldGU9e2F1dG9Db21wbGV0ZX1cclxuICAgICAgICBlbmNUeXBlPXtlbmN0eXBlfVxyXG4gICAgICAgIGFjY2VwdENoYXJzZXQ9e2FjY2VwdGNoYXJzZXR9XHJcbiAgICAgICAgbm9WYWxpZGF0ZT17bm9IdG1sNVZhbGlkYXRlfVxyXG4gICAgICAgIG9uU3VibWl0PXt0aGlzLm9uU3VibWl0fVxyXG4gICAgICAgIHJlZj17Zm9ybSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybTtcclxuICAgICAgICB9fT5cclxuICAgICAgICB7dGhpcy5yZW5kZXJFcnJvcnMoKX1cclxuICAgICAgICA8X1NjaGVtYUZpZWxkXHJcbiAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgIHVpU2NoZW1hPXt1aVNjaGVtYX1cclxuICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgIGlkUHJlZml4PXtpZFByZWZpeH1cclxuICAgICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgICAgIGZvcm1EYXRhPXtmb3JtRGF0YX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgb25CbHVyPXt0aGlzLm9uQmx1cn1cclxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25Gb2N1c31cclxuICAgICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cclxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIHtjaGlsZHJlbiA/IChcclxuICAgICAgICAgIGNoaWxkcmVuXHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4taW5mb1wiPlxyXG4gICAgICAgICAgICAgIFN1Ym1pdFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvRm9ybVRhZz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgRm9ybS5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHVpU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgZm9ybURhdGE6IFByb3BUeXBlcy5hbnksXHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB3aWRnZXRzOiBQcm9wVHlwZXMub2JqZWN0T2YoXHJcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMub2JqZWN0XSlcclxuICAgICksXHJcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuZWxlbWVudFR5cGUpLFxyXG4gICAgQXJyYXlGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBPYmplY3RGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBFcnJvckxpc3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBzaG93RXJyb3JMaXN0OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uU3VibWl0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGFnTmFtZTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG1ldGhvZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHRhcmdldDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGFjdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGF1dG9jb21wbGV0ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGF1dG9Db21wbGV0ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGVuY3R5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBhY2NlcHRjaGFyc2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbm9WYWxpZGF0ZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBub0h0bWw1VmFsaWRhdGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbGl2ZVZhbGlkYXRlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHZhbGlkYXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHRyYW5zZm9ybUVycm9yczogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBmb3JtQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGN1c3RvbUZvcm1hdHM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxyXG4gICAgb21pdEV4dHJhRGF0YTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBleHRyYUVycm9yczogUHJvcFR5cGVzLm9iamVjdCxcclxuICB9O1xyXG59XHJcbiJdfQ==