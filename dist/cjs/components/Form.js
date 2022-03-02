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

      var idSchema = (0, _utils.toIdSchema)(retrievedSchema, uiSchema["ui:rootFieldId"], rootSchema, formData, props.idPrefix, props.idSeparator);
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
          idSeparator = _this$props5.idSeparator,
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
          formContext = _this$props5.formContext,
          _internalFormWrapper = _this$props5._internalFormWrapper;
      var _this$state2 = this.state,
          schema = _this$state2.schema,
          uiSchema = _this$state2.uiSchema,
          formData = _this$state2.formData,
          errorSchema = _this$state2.errorSchema,
          idSchema = _this$state2.idSchema;
      var registry = this.getRegistry();
      var _SchemaField = registry.fields.SchemaField; // The `semantic-ui` and `material-ui` themes have `_internalFormWrapper`s that take an `as` prop that is the
      // PropTypes.elementType to use for the inner tag so we'll need to pass `tagName` along if it is provided.
      // NOTE, the `as` prop is native to `semantic-ui` and is emulated in the `material-ui` theme

      var as = _internalFormWrapper ? tagName : undefined;
      var FormTag = _internalFormWrapper || tagName || "form";

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
        as: as,
        ref: function ref(form) {
          _this2.formElement = form;
        }
      }, this.renderErrors(), _react["default"].createElement(_SchemaField, {
        schema: schema,
        uiSchema: uiSchema,
        errorSchema: errorSchema,
        idSchema: idSchema,
        idPrefix: idPrefix,
        idSeparator: idSeparator,
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
    _internalFormWrapper: _propTypes["default"].elementType,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Zvcm0uanMiXSwibmFtZXMiOlsiRm9ybSIsInByb3BzIiwiZm9ybURhdGEiLCJmaWVsZHMiLCJsZW5ndGgiLCJkYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsInBhdGhTY2hlbWEiLCJnZXRBbGxQYXRocyIsIl9vYmoiLCJhY2MiLCJwYXRocyIsImZvckVhY2giLCJuZXdQYXRocyIsInBhdGgiLCJfX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMiLCIkbmFtZSIsInB1c2giLCJyZXBsYWNlIiwiZm9ybVZhbHVlIiwibmV3RXJyb3JTY2hlbWEiLCJuZXdTdGF0ZSIsImdldFN0YXRlRnJvbVByb3BzIiwibXVzdFZhbGlkYXRlIiwibm9WYWxpZGF0ZSIsImxpdmVWYWxpZGF0ZSIsInN0YXRlIiwibmV3Rm9ybURhdGEiLCJvbWl0RXh0cmFEYXRhIiwibGl2ZU9taXQiLCJyZXRyaWV2ZWRTY2hlbWEiLCJzY2hlbWEiLCJmaWVsZE5hbWVzIiwiZ2V0RmllbGROYW1lcyIsImdldFVzZWRGb3JtRGF0YSIsInNjaGVtYVZhbGlkYXRpb24iLCJ2YWxpZGF0ZSIsImVycm9ycyIsImVycm9yU2NoZW1hIiwic2NoZW1hVmFsaWRhdGlvbkVycm9ycyIsInNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSIsImV4dHJhRXJyb3JzIiwic2V0U3RhdGUiLCJvbkNoYW5nZSIsIm9uQmx1ciIsIm9uRm9jdXMiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiY3VycmVudFRhcmdldCIsInBlcnNpc3QiLCJvbkVycm9yIiwiY29uc29sZSIsImVycm9yIiwib25TdWJtaXQiLCJzdGF0dXMiLCJmb3JtRWxlbWVudCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsImlucHV0Rm9ybURhdGEiLCJ1aVNjaGVtYSIsImVkaXQiLCJyb290U2NoZW1hIiwiY3VzdG9tRm9ybWF0cyIsImxvY2FsaXplRXJyb3JzIiwiYWRkaXRpb25hbE1ldGFTY2hlbWFzIiwiZ2V0Q3VycmVudEVycm9ycyIsImN1cnJlbnRFcnJvcnMiLCJpZFNjaGVtYSIsImlkUHJlZml4IiwiaWRTZXBhcmF0b3IiLCJ0cmFuc2Zvcm1FcnJvcnMiLCJnZXRSZWdpc3RyeSIsInJlc29sdmVkU2NoZW1hIiwiRXJyb3JMaXN0Iiwic2hvd0Vycm9yTGlzdCIsImZvcm1Db250ZXh0Iiwid2lkZ2V0cyIsIkFycmF5RmllbGRUZW1wbGF0ZSIsIk9iamVjdEZpZWxkVGVtcGxhdGUiLCJGaWVsZFRlbXBsYXRlIiwiZGVmaW5pdGlvbnMiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJjYW5jZWxhYmxlIiwiY2hpbGRyZW4iLCJpZCIsImNsYXNzTmFtZSIsInRhZ05hbWUiLCJuYW1lIiwibWV0aG9kIiwiYWN0aW9uIiwiZGVwcmVjYXRlZEF1dG9jb21wbGV0ZSIsImF1dG9jb21wbGV0ZSIsImN1cnJlbnRBdXRvQ29tcGxldGUiLCJhdXRvQ29tcGxldGUiLCJlbmN0eXBlIiwiYWNjZXB0Y2hhcnNldCIsIm5vSHRtbDVWYWxpZGF0ZSIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJfaW50ZXJuYWxGb3JtV3JhcHBlciIsInJlZ2lzdHJ5IiwiX1NjaGVtYUZpZWxkIiwiU2NoZW1hRmllbGQiLCJhcyIsInVuZGVmaW5lZCIsIkZvcm1UYWciLCJ3YXJuIiwiZm9ybSIsInJlbmRlckVycm9ycyIsIkNvbXBvbmVudCIsIkRlZmF1bHRFcnJvckxpc3QiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiYW55IiwiYm9vbCIsIm9iamVjdE9mIiwib25lT2ZUeXBlIiwiZnVuYyIsImVsZW1lbnRUeXBlIiwic3RyaW5nIiwiYXJyYXlPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQVVBOzs7Ozs7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QUEyQmYvQixJQUFBQSxZQUFZLEVBQUVzQixzQkFBVVMsTUEzQlQ7QUE0QmY5QixJQUFBQSxPQUFPLEVBQUVxQixzQkFBVVMsTUE1Qko7QUE2QmY3QixJQUFBQSxhQUFhLEVBQUVvQixzQkFBVVMsTUE3QlY7QUE4QmZ0RyxJQUFBQSxVQUFVLEVBQUU2RixzQkFBVUksSUE5QlA7QUErQmZ2QixJQUFBQSxlQUFlLEVBQUVtQixzQkFBVUksSUEvQlo7QUFnQ2ZoRyxJQUFBQSxZQUFZLEVBQUU0RixzQkFBVUksSUFoQ1Q7QUFpQ2ZyRixJQUFBQSxRQUFRLEVBQUVpRixzQkFBVU8sSUFqQ0w7QUFrQ2ZyRCxJQUFBQSxlQUFlLEVBQUU4QyxzQkFBVU8sSUFsQ1o7QUFtQ2ZoRCxJQUFBQSxXQUFXLEVBQUV5QyxzQkFBVUMsTUFuQ1I7QUFvQ2Z2RCxJQUFBQSxhQUFhLEVBQUVzRCxzQkFBVUMsTUFwQ1Y7QUFxQ2ZyRCxJQUFBQSxxQkFBcUIsRUFBRW9ELHNCQUFVVSxPQUFWLENBQWtCVixzQkFBVUMsTUFBNUIsQ0FyQ1I7QUFzQ2YxRixJQUFBQSxhQUFhLEVBQUV5RixzQkFBVUksSUF0Q1Y7QUF1Q2ZoRixJQUFBQSxXQUFXLEVBQUU0RSxzQkFBVUM7QUF2Q1IsR0FBakI7QUF5Q0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IF9waWNrIGZyb20gXCJsb2Rhc2gvcGlja1wiO1xyXG5pbXBvcnQgX2dldCBmcm9tIFwibG9kYXNoL2dldFwiO1xyXG5pbXBvcnQgX2lzRW1wdHkgZnJvbSBcImxvZGFzaC9pc0VtcHR5XCI7XHJcblxyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIERlZmF1bHRFcnJvckxpc3QgfSBmcm9tIFwiLi9FcnJvckxpc3RcIjtcclxuaW1wb3J0IHtcclxuICBnZXREZWZhdWx0Rm9ybVN0YXRlLFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIHNob3VsZFJlbmRlcixcclxuICB0b0lkU2NoZW1hLFxyXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcclxuICBkZWVwRXF1YWxzLFxyXG4gIHRvUGF0aFNjaGVtYSxcclxuICBpc09iamVjdCxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHZhbGlkYXRlRm9ybURhdGEsIHsgdG9FcnJvckxpc3QgfSBmcm9tIFwiLi4vdmFsaWRhdGVcIjtcclxuaW1wb3J0IHsgbWVyZ2VPYmplY3RzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdWlTY2hlbWE6IHt9LFxyXG4gICAgbm9WYWxpZGF0ZTogZmFsc2UsXHJcbiAgICBsaXZlVmFsaWRhdGU6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gICAgbm9IdG1sNVZhbGlkYXRlOiBmYWxzZSxcclxuICAgIEVycm9yTGlzdDogRGVmYXVsdEVycm9yTGlzdCxcclxuICAgIG9taXRFeHRyYURhdGE6IGZhbHNlLFxyXG4gICAgbG9jYWxpemVFcnJvcnM6IG51bGwsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKHByb3BzLCBwcm9wcy5mb3JtRGF0YSk7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UgJiZcclxuICAgICAgIWRlZXBFcXVhbHModGhpcy5zdGF0ZS5mb3JtRGF0YSwgdGhpcy5wcm9wcy5mb3JtRGF0YSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtRWxlbWVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBuZXh0UHJvcHMuZm9ybURhdGEpO1xyXG4gICAgaWYgKFxyXG4gICAgICAhZGVlcEVxdWFscyhuZXh0U3RhdGUuZm9ybURhdGEsIG5leHRQcm9wcy5mb3JtRGF0YSkgJiZcclxuICAgICAgIWRlZXBFcXVhbHMobmV4dFN0YXRlLmZvcm1EYXRhLCB0aGlzLnN0YXRlLmZvcm1EYXRhKSAmJlxyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXh0U3RhdGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGVGcm9tUHJvcHMocHJvcHMsIGlucHV0Rm9ybURhdGEpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZSB8fCB7fTtcclxuICAgIGNvbnN0IHNjaGVtYSA9IFwic2NoZW1hXCIgaW4gcHJvcHMgPyBwcm9wcy5zY2hlbWEgOiB0aGlzLnByb3BzLnNjaGVtYTtcclxuICAgIGNvbnN0IHVpU2NoZW1hID0gXCJ1aVNjaGVtYVwiIGluIHByb3BzID8gcHJvcHMudWlTY2hlbWEgOiB0aGlzLnByb3BzLnVpU2NoZW1hO1xyXG4gICAgY29uc3QgZWRpdCA9IHR5cGVvZiBpbnB1dEZvcm1EYXRhICE9PSBcInVuZGVmaW5lZFwiO1xyXG4gICAgY29uc3QgbGl2ZVZhbGlkYXRlID1cclxuICAgICAgXCJsaXZlVmFsaWRhdGVcIiBpbiBwcm9wcyA/IHByb3BzLmxpdmVWYWxpZGF0ZSA6IHRoaXMucHJvcHMubGl2ZVZhbGlkYXRlO1xyXG4gICAgY29uc3QgbXVzdFZhbGlkYXRlID0gZWRpdCAmJiAhcHJvcHMubm9WYWxpZGF0ZSAmJiBsaXZlVmFsaWRhdGU7XHJcbiAgICBjb25zdCByb290U2NoZW1hID0gc2NoZW1hO1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBnZXREZWZhdWx0Rm9ybVN0YXRlKHNjaGVtYSwgaW5wdXRGb3JtRGF0YSwgcm9vdFNjaGVtYSk7XHJcbiAgICBjb25zdCByZXRyaWV2ZWRTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIGNvbnN0IGN1c3RvbUZvcm1hdHMgPSBwcm9wcy5jdXN0b21Gb3JtYXRzO1xyXG4gICAgY29uc3QgbG9jYWxpemVFcnJvcnMgPSBwcm9wcy5sb2NhbGl6ZUVycm9ycztcclxuICAgIGNvbnN0IGFkZGl0aW9uYWxNZXRhU2NoZW1hcyA9IHByb3BzLmFkZGl0aW9uYWxNZXRhU2NoZW1hcztcclxuXHJcbiAgICBjb25zdCBnZXRDdXJyZW50RXJyb3JzID0gKCkgPT4ge1xyXG4gICAgICBpZiAocHJvcHMubm9WYWxpZGF0ZSkge1xyXG4gICAgICAgIHJldHVybiB7IGVycm9yczogW10sIGVycm9yU2NoZW1hOiB7fSB9O1xyXG4gICAgICB9IGVsc2UgaWYgKCFwcm9wcy5saXZlVmFsaWRhdGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZXJyb3JzOiBzdGF0ZS5zY2hlbWFWYWxpZGF0aW9uRXJyb3JzIHx8IFtdLFxyXG4gICAgICAgICAgZXJyb3JTY2hlbWE6IHN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSB8fCB7fSxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZXJyb3JzOiBzdGF0ZS5lcnJvcnMgfHwgW10sXHJcbiAgICAgICAgZXJyb3JTY2hlbWE6IHN0YXRlLmVycm9yU2NoZW1hIHx8IHt9LFxyXG4gICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZXJyb3JzLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyxcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xyXG4gICAgaWYgKG11c3RWYWxpZGF0ZSkge1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShcclxuICAgICAgICBmb3JtRGF0YSxcclxuICAgICAgICBzY2hlbWEsXHJcbiAgICAgICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzLFxyXG4gICAgICAgIGN1c3RvbUZvcm1hdHMsXHJcbiAgICAgICAgbG9jYWxpemVFcnJvcnNcclxuICAgICAgKTtcclxuICAgICAgZXJyb3JzID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvcnM7XHJcbiAgICAgIGVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvclNjaGVtYTtcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IGVycm9ycztcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gZXJyb3JTY2hlbWE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjdXJyZW50RXJyb3JzID0gZ2V0Q3VycmVudEVycm9ycygpO1xyXG4gICAgICBlcnJvcnMgPSBjdXJyZW50RXJyb3JzLmVycm9ycztcclxuICAgICAgZXJyb3JTY2hlbWEgPSBjdXJyZW50RXJyb3JzLmVycm9yU2NoZW1hO1xyXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycztcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xyXG4gICAgfVxyXG4gICAgaWYgKHByb3BzLmV4dHJhRXJyb3JzKSB7XHJcbiAgICAgIGVycm9yU2NoZW1hID0gbWVyZ2VPYmplY3RzKFxyXG4gICAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICAgIHByb3BzLmV4dHJhRXJyb3JzLFxyXG4gICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgKTtcclxuICAgICAgZXJyb3JzID0gdG9FcnJvckxpc3QoZXJyb3JTY2hlbWEpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaWRTY2hlbWEgPSB0b0lkU2NoZW1hKFxyXG4gICAgICByZXRyaWV2ZWRTY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hW1widWk6cm9vdEZpZWxkSWRcIl0sXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBwcm9wcy5pZFByZWZpeCxcclxuICAgICAgcHJvcHMuaWRTZXBhcmF0b3JcclxuICAgICk7XHJcbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgZWRpdCxcclxuICAgICAgZXJyb3JzLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzLFxyXG4gICAgfTtcclxuICAgIGlmIChzY2hlbWFWYWxpZGF0aW9uRXJyb3JzKSB7XHJcbiAgICAgIG5leHRTdGF0ZS5zY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gc2NoZW1hVmFsaWRhdGlvbkVycm9ycztcclxuICAgICAgbmV4dFN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0U3RhdGU7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiBzaG91bGRSZW5kZXIodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIHNjaGVtYSA9IHRoaXMucHJvcHMuc2NoZW1hLFxyXG4gICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzID0gdGhpcy5wcm9wcy5hZGRpdGlvbmFsTWV0YVNjaGVtYXMsXHJcbiAgICBjdXN0b21Gb3JtYXRzID0gdGhpcy5wcm9wcy5jdXN0b21Gb3JtYXRzLFxyXG4gICAgbG9jYWxpemVFcnJvcnMgPSB0aGlzLnByb3BzLmxvY2FsaXplRXJyb3JzXHJcbiAgKSB7XHJcbiAgICBjb25zdCB7IHZhbGlkYXRlLCB0cmFuc2Zvcm1FcnJvcnMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHRoaXMuZ2V0UmVnaXN0cnkoKTtcclxuICAgIGNvbnN0IHJlc29sdmVkU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gdmFsaWRhdGVGb3JtRGF0YShcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICB2YWxpZGF0ZSxcclxuICAgICAgdHJhbnNmb3JtRXJyb3JzLFxyXG4gICAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMsXHJcbiAgICAgIGN1c3RvbUZvcm1hdHMsXHJcbiAgICAgIGxvY2FsaXplRXJyb3JzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyRXJyb3JzKCkge1xyXG4gICAgY29uc3QgeyBlcnJvcnMsIGVycm9yU2NoZW1hLCBzY2hlbWEsIHVpU2NoZW1hIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgeyBFcnJvckxpc3QsIHNob3dFcnJvckxpc3QsIGZvcm1Db250ZXh0IH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlmIChlcnJvcnMubGVuZ3RoICYmIHNob3dFcnJvckxpc3QgIT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8RXJyb3JMaXN0XHJcbiAgICAgICAgICBlcnJvcnM9e2Vycm9yc31cclxuICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFVzZWRGb3JtRGF0YSA9IChmb3JtRGF0YSwgZmllbGRzKSA9PiB7XHJcbiAgICAvL2ZvciB0aGUgY2FzZSBvZiBhIHNpbmdsZSBpbnB1dCBmb3JtXHJcbiAgICBpZiAoZmllbGRzLmxlbmd0aCA9PT0gMCAmJiB0eXBlb2YgZm9ybURhdGEgIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgcmV0dXJuIGZvcm1EYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkYXRhID0gX3BpY2soZm9ybURhdGEsIGZpZWxkcyk7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLm1hcChrZXkgPT4gZGF0YVtrZXldKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9O1xyXG5cclxuICBnZXRGaWVsZE5hbWVzID0gKHBhdGhTY2hlbWEsIGZvcm1EYXRhKSA9PiB7XHJcbiAgICBjb25zdCBnZXRBbGxQYXRocyA9IChfb2JqLCBhY2MgPSBbXSwgcGF0aHMgPSBbXCJcIl0pID0+IHtcclxuICAgICAgT2JqZWN0LmtleXMoX29iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgX29ialtrZXldID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICBsZXQgbmV3UGF0aHMgPSBwYXRocy5tYXAocGF0aCA9PiBgJHtwYXRofS4ke2tleX1gKTtcclxuICAgICAgICAgIC8vIElmIGFuIG9iamVjdCBpcyBtYXJrZWQgd2l0aCBhZGRpdGlvbmFsUHJvcGVydGllcywgYWxsIGl0cyBrZXlzIGFyZSB2YWxpZFxyXG4gICAgICAgICAgaWYgKF9vYmpba2V5XS5fX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMgJiYgX29ialtrZXldLiRuYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGFjYy5wdXNoKF9vYmpba2V5XS4kbmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRBbGxQYXRocyhfb2JqW2tleV0sIGFjYywgbmV3UGF0aHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIiRuYW1lXCIgJiYgX29ialtrZXldICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4ge1xyXG4gICAgICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwuLywgXCJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IF9nZXQoZm9ybURhdGEsIHBhdGgpO1xyXG4gICAgICAgICAgICAvLyBhZGRzIHBhdGggdG8gZmllbGROYW1lcyBpZiBpdCBwb2ludHMgdG8gYSB2YWx1ZVxyXG4gICAgICAgICAgICAvLyBvciBhbiBlbXB0eSBvYmplY3QvYXJyYXlcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtVmFsdWUgIT09IFwib2JqZWN0XCIgfHwgX2lzRW1wdHkoZm9ybVZhbHVlKSkge1xyXG4gICAgICAgICAgICAgIGFjYy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZ2V0QWxsUGF0aHMocGF0aFNjaGVtYSk7XHJcbiAgfTtcclxuXHJcbiAgb25DaGFuZ2UgPSAoZm9ybURhdGEsIG5ld0Vycm9yU2NoZW1hKSA9PiB7XHJcbiAgICBpZiAoaXNPYmplY3QoZm9ybURhdGEpIHx8IEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyh0aGlzLnByb3BzLCBmb3JtRGF0YSk7XHJcbiAgICAgIGZvcm1EYXRhID0gbmV3U3RhdGUuZm9ybURhdGE7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtdXN0VmFsaWRhdGUgPSAhdGhpcy5wcm9wcy5ub1ZhbGlkYXRlICYmIHRoaXMucHJvcHMubGl2ZVZhbGlkYXRlO1xyXG4gICAgbGV0IHN0YXRlID0geyBmb3JtRGF0YSB9O1xyXG4gICAgbGV0IG5ld0Zvcm1EYXRhID0gZm9ybURhdGE7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvcHMub21pdEV4dHJhRGF0YSA9PT0gdHJ1ZSAmJiB0aGlzLnByb3BzLmxpdmVPbWl0ID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIGZvcm1EYXRhXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHBhdGhTY2hlbWEgPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgcmV0cmlldmVkU2NoZW1hLFxyXG4gICAgICAgIFwiXCIsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZXMgPSB0aGlzLmdldEZpZWxkTmFtZXMocGF0aFNjaGVtYSwgZm9ybURhdGEpO1xyXG5cclxuICAgICAgbmV3Rm9ybURhdGEgPSB0aGlzLmdldFVzZWRGb3JtRGF0YShmb3JtRGF0YSwgZmllbGROYW1lcyk7XHJcbiAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGZvcm1EYXRhOiBuZXdGb3JtRGF0YSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobXVzdFZhbGlkYXRlKSB7XHJcbiAgICAgIGxldCBzY2hlbWFWYWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShuZXdGb3JtRGF0YSk7XHJcbiAgICAgIGxldCBlcnJvcnMgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9ycztcclxuICAgICAgbGV0IGVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvclNjaGVtYTtcclxuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IGVycm9ycztcclxuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gZXJyb3JTY2hlbWE7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XHJcbiAgICAgICAgZXJyb3JTY2hlbWEgPSBtZXJnZU9iamVjdHMoXHJcbiAgICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgICAhIVwiY29uY2F0IGFycmF5c1wiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICAgIH1cclxuICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxyXG4gICAgICAgIGVycm9ycyxcclxuICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzLFxyXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSxcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMubm9WYWxpZGF0ZSAmJiBuZXdFcnJvclNjaGVtYSkge1xyXG4gICAgICBjb25zdCBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXh0cmFFcnJvcnNcclxuICAgICAgICA/IG1lcmdlT2JqZWN0cyhcclxuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG5ld0Vycm9yU2NoZW1hO1xyXG4gICAgICBzdGF0ZSA9IHtcclxuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JTY2hlbWE6IGVycm9yU2NoZW1hLFxyXG4gICAgICAgIGVycm9yczogdG9FcnJvckxpc3QoZXJyb3JTY2hlbWEpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgc3RhdGUsXHJcbiAgICAgICgpID0+IHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlKVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBvbkJsdXIgPSAoLi4uYXJncykgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9uRm9jdXMgPSAoLi4uYXJncykgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xyXG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25TdWJtaXQgPSBldmVudCA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnQucGVyc2lzdCgpO1xyXG4gICAgbGV0IG5ld0Zvcm1EYXRhID0gdGhpcy5zdGF0ZS5mb3JtRGF0YTtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbWl0RXh0cmFEYXRhID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIG5ld0Zvcm1EYXRhXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHBhdGhTY2hlbWEgPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgcmV0cmlldmVkU2NoZW1hLFxyXG4gICAgICAgIFwiXCIsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgbmV3Rm9ybURhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZXMgPSB0aGlzLmdldEZpZWxkTmFtZXMocGF0aFNjaGVtYSwgbmV3Rm9ybURhdGEpO1xyXG5cclxuICAgICAgbmV3Rm9ybURhdGEgPSB0aGlzLmdldFVzZWRGb3JtRGF0YShuZXdGb3JtRGF0YSwgZmllbGROYW1lcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnByb3BzLm5vVmFsaWRhdGUpIHtcclxuICAgICAgbGV0IHNjaGVtYVZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKG5ld0Zvcm1EYXRhKTtcclxuICAgICAgbGV0IGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xyXG4gICAgICBsZXQgZXJyb3JTY2hlbWEgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9yU2NoZW1hO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYTtcclxuICAgICAgaWYgKE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XHJcbiAgICAgICAgICBlcnJvclNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcclxuICAgICAgICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGVycm9ycyxcclxuICAgICAgICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXHJcbiAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uRXJyb3IpIHtcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRXJyb3IoZXJyb3JzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRm9ybSB2YWxpZGF0aW9uIGZhaWxlZFwiLCBlcnJvcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGVyZSBhcmUgbm8gZXJyb3JzIGdlbmVyYXRlZCB0aHJvdWdoIHNjaGVtYSB2YWxpZGF0aW9uLlxyXG4gICAgLy8gQ2hlY2sgZm9yIHVzZXIgcHJvdmlkZWQgZXJyb3JzIGFuZCB1cGRhdGUgc3RhdGUgYWNjb3JkaW5nbHkuXHJcbiAgICBsZXQgZXJyb3JTY2hlbWE7XHJcbiAgICBsZXQgZXJyb3JzO1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZXh0cmFFcnJvcnMpIHtcclxuICAgICAgZXJyb3JTY2hlbWEgPSB0aGlzLnByb3BzLmV4dHJhRXJyb3JzO1xyXG4gICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlcnJvclNjaGVtYSA9IHt9O1xyXG4gICAgICBlcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICB7XHJcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxyXG4gICAgICAgIGVycm9yczogZXJyb3JzLFxyXG4gICAgICAgIGVycm9yU2NoZW1hOiBlcnJvclNjaGVtYSxcclxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzOiBbXSxcclxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWE6IHt9LFxyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWJtaXQpIHtcclxuICAgICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoXHJcbiAgICAgICAgICAgIHsgLi4udGhpcy5zdGF0ZSwgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLCBzdGF0dXM6IFwic3VibWl0dGVkXCIgfSxcclxuICAgICAgICAgICAgZXZlbnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGdldFJlZ2lzdHJ5KCkge1xyXG4gICAgLy8gRm9yIEJDLCBhY2NlcHQgcGFzc2VkIFNjaGVtYUZpZWxkIGFuZCBUaXRsZUZpZWxkIHByb3BzIGFuZCBwYXNzIHRoZW0gdG9cclxuICAgIC8vIHRoZSBcImZpZWxkc1wiIHJlZ2lzdHJ5IG9uZS5cclxuICAgIGNvbnN0IHsgZmllbGRzLCB3aWRnZXRzIH0gPSBnZXREZWZhdWx0UmVnaXN0cnkoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZpZWxkczogeyAuLi5maWVsZHMsIC4uLnRoaXMucHJvcHMuZmllbGRzIH0sXHJcbiAgICAgIHdpZGdldHM6IHsgLi4ud2lkZ2V0cywgLi4udGhpcy5wcm9wcy53aWRnZXRzIH0sXHJcbiAgICAgIEFycmF5RmllbGRUZW1wbGF0ZTogdGhpcy5wcm9wcy5BcnJheUZpZWxkVGVtcGxhdGUsXHJcbiAgICAgIE9iamVjdEZpZWxkVGVtcGxhdGU6IHRoaXMucHJvcHMuT2JqZWN0RmllbGRUZW1wbGF0ZSxcclxuICAgICAgRmllbGRUZW1wbGF0ZTogdGhpcy5wcm9wcy5GaWVsZFRlbXBsYXRlLFxyXG4gICAgICBkZWZpbml0aW9uczogdGhpcy5wcm9wcy5zY2hlbWEuZGVmaW5pdGlvbnMgfHwge30sXHJcbiAgICAgIHJvb3RTY2hlbWE6IHRoaXMucHJvcHMuc2NoZW1hLFxyXG4gICAgICBmb3JtQ29udGV4dDogdGhpcy5wcm9wcy5mb3JtQ29udGV4dCB8fCB7fSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzdWJtaXQoKSB7XHJcbiAgICBpZiAodGhpcy5mb3JtRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmZvcm1FbGVtZW50LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwic3VibWl0XCIsIHtcclxuICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2hpbGRyZW4sXHJcbiAgICAgIGlkLFxyXG4gICAgICBpZFByZWZpeCxcclxuICAgICAgaWRTZXBhcmF0b3IsXHJcbiAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgdGFnTmFtZSxcclxuICAgICAgbmFtZSxcclxuICAgICAgbWV0aG9kLFxyXG4gICAgICB0YXJnZXQsXHJcbiAgICAgIGFjdGlvbixcclxuICAgICAgYXV0b2NvbXBsZXRlOiBkZXByZWNhdGVkQXV0b2NvbXBsZXRlLFxyXG4gICAgICBhdXRvQ29tcGxldGU6IGN1cnJlbnRBdXRvQ29tcGxldGUsXHJcbiAgICAgIGVuY3R5cGUsXHJcbiAgICAgIGFjY2VwdGNoYXJzZXQsXHJcbiAgICAgIG5vSHRtbDVWYWxpZGF0ZSxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICBmb3JtQ29udGV4dCxcclxuICAgICAgLyoqXHJcbiAgICAgICAqIF9pbnRlcm5hbEZvcm1XcmFwcGVyIGlzIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBtYXRlcmlhbC11aSBhbmQgc2VtYW50aWMtdWkgdGhlbWVzIHRvIHByb3ZpZGUgYSBjdXN0b20gd3JhcHBlclxyXG4gICAgICAgKiBhcm91bmQgYDxGb3JtIC8+YCB0aGF0IHN1cHBvcnRzIHRoZSBwcm9wZXIgcmVuZGVyaW5nIG9mIHRob3NlIHRoZW1lcy4gVG8gdXNlIHRoaXMgcHJvcCwgb25lIG11c3QgcGFzcyBhXHJcbiAgICAgICAqIGNvbXBvbmVudCB0aGF0IHRha2VzIHR3byBwcm9wczogYGNoaWxkcmVuYCBhbmQgYGFzYC4gVGhhdCBjb21wb25lbnQsIGF0IG1pbmltdW0sIHNob3VsZCByZW5kZXIgdGhlIGBjaGlsZHJlbmBcclxuICAgICAgICogaW5zaWRlIG9mIGEgPGZvcm0gLz4gdGFnIHVubGVzcyBgYXNgIGlzIHByb3ZpZGVkLCBpbiB3aGljaCBjYXNlLCB1c2UgdGhlIGBhc2AgcHJvcCBpbiBwbGFjZSBvZiBgPGZvcm0gLz5gLlxyXG4gICAgICAgKiBpLmUuOlxyXG4gICAgICAgKiBgYGBcclxuICAgICAgICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW50ZXJuYWxGb3JtKHsgY2hpbGRyZW4sIGFzfSkge1xyXG4gICAgICAgKiAgIGNvbnN0IEZvcm1UYWcgPSBhcyB8fCAnZm9ybSc7XHJcbiAgICAgICAqICAgcmV0dXJuIDxGb3JtVGFnPntjaGlsZHJlbn08L0Zvcm1UYWc+O1xyXG4gICAgICAgKiB9XHJcbiAgICAgICAqIGBgYFxyXG4gICAgICAgKi9cclxuICAgICAgX2ludGVybmFsRm9ybVdyYXBwZXIsXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCB7IHNjaGVtYSwgdWlTY2hlbWEsIGZvcm1EYXRhLCBlcnJvclNjaGVtYSwgaWRTY2hlbWEgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCByZWdpc3RyeSA9IHRoaXMuZ2V0UmVnaXN0cnkoKTtcclxuICAgIGNvbnN0IF9TY2hlbWFGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5TY2hlbWFGaWVsZDtcclxuICAgIC8vIFRoZSBgc2VtYW50aWMtdWlgIGFuZCBgbWF0ZXJpYWwtdWlgIHRoZW1lcyBoYXZlIGBfaW50ZXJuYWxGb3JtV3JhcHBlcmBzIHRoYXQgdGFrZSBhbiBgYXNgIHByb3AgdGhhdCBpcyB0aGVcclxuICAgIC8vIFByb3BUeXBlcy5lbGVtZW50VHlwZSB0byB1c2UgZm9yIHRoZSBpbm5lciB0YWcgc28gd2UnbGwgbmVlZCB0byBwYXNzIGB0YWdOYW1lYCBhbG9uZyBpZiBpdCBpcyBwcm92aWRlZC5cclxuICAgIC8vIE5PVEUsIHRoZSBgYXNgIHByb3AgaXMgbmF0aXZlIHRvIGBzZW1hbnRpYy11aWAgYW5kIGlzIGVtdWxhdGVkIGluIHRoZSBgbWF0ZXJpYWwtdWlgIHRoZW1lXHJcbiAgICBjb25zdCBhcyA9IF9pbnRlcm5hbEZvcm1XcmFwcGVyID8gdGFnTmFtZSA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IEZvcm1UYWcgPSBfaW50ZXJuYWxGb3JtV3JhcHBlciB8fCB0YWdOYW1lIHx8IFwiZm9ybVwiO1xyXG4gICAgaWYgKGRlcHJlY2F0ZWRBdXRvY29tcGxldGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgIFwiVXNpbmcgYXV0b2NvbXBsZXRlIHByb3BlcnR5IG9mIEZvcm0gaXMgZGVwcmVjYXRlZCwgdXNlIGF1dG9Db21wbGV0ZSBpbnN0ZWFkLlwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhdXRvQ29tcGxldGUgPSBjdXJyZW50QXV0b0NvbXBsZXRlXHJcbiAgICAgID8gY3VycmVudEF1dG9Db21wbGV0ZVxyXG4gICAgICA6IGRlcHJlY2F0ZWRBdXRvY29tcGxldGU7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZvcm1UYWdcclxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSA/IGNsYXNzTmFtZSA6IFwicmpzZlwifVxyXG4gICAgICAgIGlkPXtpZH1cclxuICAgICAgICBuYW1lPXtuYW1lfVxyXG4gICAgICAgIG1ldGhvZD17bWV0aG9kfVxyXG4gICAgICAgIHRhcmdldD17dGFyZ2V0fVxyXG4gICAgICAgIGFjdGlvbj17YWN0aW9ufVxyXG4gICAgICAgIGF1dG9Db21wbGV0ZT17YXV0b0NvbXBsZXRlfVxyXG4gICAgICAgIGVuY1R5cGU9e2VuY3R5cGV9XHJcbiAgICAgICAgYWNjZXB0Q2hhcnNldD17YWNjZXB0Y2hhcnNldH1cclxuICAgICAgICBub1ZhbGlkYXRlPXtub0h0bWw1VmFsaWRhdGV9XHJcbiAgICAgICAgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9XHJcbiAgICAgICAgYXM9e2FzfVxyXG4gICAgICAgIHJlZj17Zm9ybSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybTtcclxuICAgICAgICB9fT5cclxuICAgICAgICB7dGhpcy5yZW5kZXJFcnJvcnMoKX1cclxuICAgICAgICA8X1NjaGVtYUZpZWxkXHJcbiAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgIHVpU2NoZW1hPXt1aVNjaGVtYX1cclxuICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgIGlkUHJlZml4PXtpZFByZWZpeH1cclxuICAgICAgICAgIGlkU2VwYXJhdG9yPXtpZFNlcGFyYXRvcn1cclxuICAgICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgICAgIGZvcm1EYXRhPXtmb3JtRGF0YX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgb25CbHVyPXt0aGlzLm9uQmx1cn1cclxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25Gb2N1c31cclxuICAgICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cclxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIHtjaGlsZHJlbiA/IChcclxuICAgICAgICAgIGNoaWxkcmVuXHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4taW5mb1wiPlxyXG4gICAgICAgICAgICAgIFN1Ym1pdFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvRm9ybVRhZz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgRm9ybS5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHVpU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgZm9ybURhdGE6IFByb3BUeXBlcy5hbnksXHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB3aWRnZXRzOiBQcm9wVHlwZXMub2JqZWN0T2YoXHJcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMub2JqZWN0XSlcclxuICAgICksXHJcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuZWxlbWVudFR5cGUpLFxyXG4gICAgQXJyYXlGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBPYmplY3RGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBFcnJvckxpc3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBzaG93RXJyb3JMaXN0OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uU3VibWl0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGFnTmFtZTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgX2ludGVybmFsRm9ybVdyYXBwZXI6IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBtZXRob2Q6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBhY3Rpb246IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBhdXRvY29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBhdXRvQ29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBlbmN0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgYWNjZXB0Y2hhcnNldDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG5vVmFsaWRhdGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbm9IdG1sNVZhbGlkYXRlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGxpdmVWYWxpZGF0ZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB2YWxpZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICB0cmFuc2Zvcm1FcnJvcnM6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgZm9ybUNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBjdXN0b21Gb3JtYXRzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcclxuICAgIG9taXRFeHRyYURhdGE6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZXh0cmFFcnJvcnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgfTtcclxufVxyXG4iXX0=