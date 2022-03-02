"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _ErrorList = _interopRequireDefault(require("./ErrorList"));

var _utils = require("../utils");

var _validate = _interopRequireWildcard(require("../validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form = /*#__PURE__*/function (_Component) {
  _inherits(Form, _Component);

  var _super = _createSuper(Form);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getUsedFormData", function (formData, fields) {
      //for the case of a single input form
      if (fields.length === 0 && _typeof(formData) !== "object") {
        return formData;
      }

      var data = (0, _pick2.default)(formData, fields);

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
              var formValue = (0, _get2.default)(formData, path); // adds path to fieldNames if it points to a value
              // or an empty object/array

              if (_typeof(formValue) !== "object" || (0, _isEmpty2.default)(formValue)) {
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
          _this.props.onSubmit(_objectSpread(_objectSpread({}, _this.state), {}, {
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
      return (0, _validate.default)(formData, resolvedSchema, validate, transformErrors, additionalMetaSchemas, customFormats, localizeErrors);
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
        return /*#__PURE__*/_react.default.createElement(ErrorList, {
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
        fields: _objectSpread(_objectSpread({}, fields), this.props.fields),
        widgets: _objectSpread(_objectSpread({}, widgets), this.props.widgets),
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
      return /*#__PURE__*/_react.default.createElement(FormTag, {
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
      }, this.renderErrors(), /*#__PURE__*/_react.default.createElement(_SchemaField, {
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
      }), children ? children : /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
        type: "submit",
        className: "btn btn-info"
      }, "Submit")));
    }
  }]);

  return Form;
}(_react.Component);

exports.default = Form;

_defineProperty(Form, "defaultProps", {
  uiSchema: {},
  noValidate: false,
  liveValidate: false,
  disabled: false,
  readonly: false,
  noHtml5Validate: false,
  ErrorList: _ErrorList.default,
  omitExtraData: false,
  localizeErrors: null
});

if (process.env.NODE_ENV !== "production") {
  Form.propTypes = {
    schema: _propTypes.default.object.isRequired,
    uiSchema: _propTypes.default.object,
    formData: _propTypes.default.any,
    disabled: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    widgets: _propTypes.default.objectOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])),
    fields: _propTypes.default.objectOf(_propTypes.default.elementType),
    ArrayFieldTemplate: _propTypes.default.elementType,
    ObjectFieldTemplate: _propTypes.default.elementType,
    FieldTemplate: _propTypes.default.elementType,
    ErrorList: _propTypes.default.func,
    onChange: _propTypes.default.func,
    onError: _propTypes.default.func,
    showErrorList: _propTypes.default.bool,
    onSubmit: _propTypes.default.func,
    id: _propTypes.default.string,
    className: _propTypes.default.string,
    tagName: _propTypes.default.elementType,
    name: _propTypes.default.string,
    method: _propTypes.default.string,
    target: _propTypes.default.string,
    action: _propTypes.default.string,
    autocomplete: _propTypes.default.string,
    autoComplete: _propTypes.default.string,
    enctype: _propTypes.default.string,
    acceptcharset: _propTypes.default.string,
    noValidate: _propTypes.default.bool,
    noHtml5Validate: _propTypes.default.bool,
    liveValidate: _propTypes.default.bool,
    validate: _propTypes.default.func,
    transformErrors: _propTypes.default.func,
    formContext: _propTypes.default.object,
    customFormats: _propTypes.default.object,
    additionalMetaSchemas: _propTypes.default.arrayOf(_propTypes.default.object),
    omitExtraData: _propTypes.default.bool,
    extraErrors: _propTypes.default.object
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Zvcm0uanMiXSwibmFtZXMiOlsiRm9ybSIsInByb3BzIiwiZm9ybURhdGEiLCJmaWVsZHMiLCJsZW5ndGgiLCJkYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsInBhdGhTY2hlbWEiLCJnZXRBbGxQYXRocyIsIl9vYmoiLCJhY2MiLCJwYXRocyIsImZvckVhY2giLCJuZXdQYXRocyIsInBhdGgiLCJfX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMiLCIkbmFtZSIsInB1c2giLCJyZXBsYWNlIiwiZm9ybVZhbHVlIiwibmV3RXJyb3JTY2hlbWEiLCJuZXdTdGF0ZSIsImdldFN0YXRlRnJvbVByb3BzIiwibXVzdFZhbGlkYXRlIiwibm9WYWxpZGF0ZSIsImxpdmVWYWxpZGF0ZSIsInN0YXRlIiwibmV3Rm9ybURhdGEiLCJvbWl0RXh0cmFEYXRhIiwibGl2ZU9taXQiLCJyZXRyaWV2ZWRTY2hlbWEiLCJzY2hlbWEiLCJmaWVsZE5hbWVzIiwiZ2V0RmllbGROYW1lcyIsImdldFVzZWRGb3JtRGF0YSIsInNjaGVtYVZhbGlkYXRpb24iLCJ2YWxpZGF0ZSIsImVycm9ycyIsImVycm9yU2NoZW1hIiwic2NoZW1hVmFsaWRhdGlvbkVycm9ycyIsInNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSIsImV4dHJhRXJyb3JzIiwic2V0U3RhdGUiLCJvbkNoYW5nZSIsIm9uQmx1ciIsIm9uRm9jdXMiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiY3VycmVudFRhcmdldCIsInBlcnNpc3QiLCJvbkVycm9yIiwiY29uc29sZSIsImVycm9yIiwib25TdWJtaXQiLCJzdGF0dXMiLCJmb3JtRWxlbWVudCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsImlucHV0Rm9ybURhdGEiLCJ1aVNjaGVtYSIsImVkaXQiLCJyb290U2NoZW1hIiwiY3VzdG9tRm9ybWF0cyIsImxvY2FsaXplRXJyb3JzIiwiYWRkaXRpb25hbE1ldGFTY2hlbWFzIiwiZ2V0Q3VycmVudEVycm9ycyIsImN1cnJlbnRFcnJvcnMiLCJpZFNjaGVtYSIsImlkUHJlZml4IiwiaWRTZXBhcmF0b3IiLCJ0cmFuc2Zvcm1FcnJvcnMiLCJnZXRSZWdpc3RyeSIsInJlc29sdmVkU2NoZW1hIiwiRXJyb3JMaXN0Iiwic2hvd0Vycm9yTGlzdCIsImZvcm1Db250ZXh0Iiwid2lkZ2V0cyIsIkFycmF5RmllbGRUZW1wbGF0ZSIsIk9iamVjdEZpZWxkVGVtcGxhdGUiLCJGaWVsZFRlbXBsYXRlIiwiZGVmaW5pdGlvbnMiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJjYW5jZWxhYmxlIiwiY2hpbGRyZW4iLCJpZCIsImNsYXNzTmFtZSIsInRhZ05hbWUiLCJuYW1lIiwibWV0aG9kIiwiYWN0aW9uIiwiZGVwcmVjYXRlZEF1dG9jb21wbGV0ZSIsImF1dG9jb21wbGV0ZSIsImN1cnJlbnRBdXRvQ29tcGxldGUiLCJhdXRvQ29tcGxldGUiLCJlbmN0eXBlIiwiYWNjZXB0Y2hhcnNldCIsIm5vSHRtbDVWYWxpZGF0ZSIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJyZWdpc3RyeSIsIl9TY2hlbWFGaWVsZCIsIlNjaGVtYUZpZWxkIiwiRm9ybVRhZyIsIndhcm4iLCJmb3JtIiwicmVuZGVyRXJyb3JzIiwiQ29tcG9uZW50IiwiRGVmYXVsdEVycm9yTGlzdCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJhbnkiLCJib29sIiwib2JqZWN0T2YiLCJvbmVPZlR5cGUiLCJmdW5jIiwiZWxlbWVudFR5cGUiLCJzdHJpbmciLCJhcnJheU9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdxQkEsSTs7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QlA7QUE4QmZwQixJQUFBQSxlQUFlLEVBQUVnQixtQkFBVUksSUE5Qlo7QUErQmY3RixJQUFBQSxZQUFZLEVBQUV5RixtQkFBVUksSUEvQlQ7QUFnQ2ZsRixJQUFBQSxRQUFRLEVBQUU4RSxtQkFBVU8sSUFoQ0w7QUFpQ2ZsRCxJQUFBQSxlQUFlLEVBQUUyQyxtQkFBVU8sSUFqQ1o7QUFrQ2Y3QyxJQUFBQSxXQUFXLEVBQUVzQyxtQkFBVUMsTUFsQ1I7QUFtQ2ZwRCxJQUFBQSxhQUFhLEVBQUVtRCxtQkFBVUMsTUFuQ1Y7QUFvQ2ZsRCxJQUFBQSxxQkFBcUIsRUFBRWlELG1CQUFVVSxPQUFWLENBQWtCVixtQkFBVUMsTUFBNUIsQ0FwQ1I7QUFxQ2Z2RixJQUFBQSxhQUFhLEVBQUVzRixtQkFBVUksSUFyQ1Y7QUFzQ2Y3RSxJQUFBQSxXQUFXLEVBQUV5RSxtQkFBVUM7QUF0Q1IsR0FBakI7QUF3Q0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IF9waWNrIGZyb20gXCJsb2Rhc2gvcGlja1wiO1xyXG5pbXBvcnQgX2dldCBmcm9tIFwibG9kYXNoL2dldFwiO1xyXG5pbXBvcnQgX2lzRW1wdHkgZnJvbSBcImxvZGFzaC9pc0VtcHR5XCI7XHJcblxyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIERlZmF1bHRFcnJvckxpc3QgfSBmcm9tIFwiLi9FcnJvckxpc3RcIjtcclxuaW1wb3J0IHtcclxuICBnZXREZWZhdWx0Rm9ybVN0YXRlLFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIHNob3VsZFJlbmRlcixcclxuICB0b0lkU2NoZW1hLFxyXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcclxuICBkZWVwRXF1YWxzLFxyXG4gIHRvUGF0aFNjaGVtYSxcclxuICBpc09iamVjdCxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHZhbGlkYXRlRm9ybURhdGEsIHsgdG9FcnJvckxpc3QgfSBmcm9tIFwiLi4vdmFsaWRhdGVcIjtcclxuaW1wb3J0IHsgbWVyZ2VPYmplY3RzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdWlTY2hlbWE6IHt9LFxyXG4gICAgbm9WYWxpZGF0ZTogZmFsc2UsXHJcbiAgICBsaXZlVmFsaWRhdGU6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gICAgbm9IdG1sNVZhbGlkYXRlOiBmYWxzZSxcclxuICAgIEVycm9yTGlzdDogRGVmYXVsdEVycm9yTGlzdCxcclxuICAgIG9taXRFeHRyYURhdGE6IGZhbHNlLFxyXG4gICAgbG9jYWxpemVFcnJvcnM6IG51bGwsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKHByb3BzLCBwcm9wcy5mb3JtRGF0YSk7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UgJiZcclxuICAgICAgIWRlZXBFcXVhbHModGhpcy5zdGF0ZS5mb3JtRGF0YSwgdGhpcy5wcm9wcy5mb3JtRGF0YSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtRWxlbWVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBuZXh0UHJvcHMuZm9ybURhdGEpO1xyXG4gICAgaWYgKFxyXG4gICAgICAhZGVlcEVxdWFscyhuZXh0U3RhdGUuZm9ybURhdGEsIG5leHRQcm9wcy5mb3JtRGF0YSkgJiZcclxuICAgICAgIWRlZXBFcXVhbHMobmV4dFN0YXRlLmZvcm1EYXRhLCB0aGlzLnN0YXRlLmZvcm1EYXRhKSAmJlxyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXh0U3RhdGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGVGcm9tUHJvcHMocHJvcHMsIGlucHV0Rm9ybURhdGEpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZSB8fCB7fTtcclxuICAgIGNvbnN0IHNjaGVtYSA9IFwic2NoZW1hXCIgaW4gcHJvcHMgPyBwcm9wcy5zY2hlbWEgOiB0aGlzLnByb3BzLnNjaGVtYTtcclxuICAgIGNvbnN0IHVpU2NoZW1hID0gXCJ1aVNjaGVtYVwiIGluIHByb3BzID8gcHJvcHMudWlTY2hlbWEgOiB0aGlzLnByb3BzLnVpU2NoZW1hO1xyXG4gICAgY29uc3QgZWRpdCA9IHR5cGVvZiBpbnB1dEZvcm1EYXRhICE9PSBcInVuZGVmaW5lZFwiO1xyXG4gICAgY29uc3QgbGl2ZVZhbGlkYXRlID1cclxuICAgICAgXCJsaXZlVmFsaWRhdGVcIiBpbiBwcm9wcyA/IHByb3BzLmxpdmVWYWxpZGF0ZSA6IHRoaXMucHJvcHMubGl2ZVZhbGlkYXRlO1xyXG4gICAgY29uc3QgbXVzdFZhbGlkYXRlID0gZWRpdCAmJiAhcHJvcHMubm9WYWxpZGF0ZSAmJiBsaXZlVmFsaWRhdGU7XHJcbiAgICBjb25zdCByb290U2NoZW1hID0gc2NoZW1hO1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBnZXREZWZhdWx0Rm9ybVN0YXRlKHNjaGVtYSwgaW5wdXRGb3JtRGF0YSwgcm9vdFNjaGVtYSk7XHJcbiAgICBjb25zdCByZXRyaWV2ZWRTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIGNvbnN0IGN1c3RvbUZvcm1hdHMgPSBwcm9wcy5jdXN0b21Gb3JtYXRzO1xyXG4gICAgY29uc3QgbG9jYWxpemVFcnJvcnMgPSBwcm9wcy5sb2NhbGl6ZUVycm9ycztcclxuICAgIGNvbnN0IGFkZGl0aW9uYWxNZXRhU2NoZW1hcyA9IHByb3BzLmFkZGl0aW9uYWxNZXRhU2NoZW1hcztcclxuXHJcbiAgICBjb25zdCBnZXRDdXJyZW50RXJyb3JzID0gKCkgPT4ge1xyXG4gICAgICBpZiAocHJvcHMubm9WYWxpZGF0ZSkge1xyXG4gICAgICAgIHJldHVybiB7IGVycm9yczogW10sIGVycm9yU2NoZW1hOiB7fSB9O1xyXG4gICAgICB9IGVsc2UgaWYgKCFwcm9wcy5saXZlVmFsaWRhdGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZXJyb3JzOiBzdGF0ZS5zY2hlbWFWYWxpZGF0aW9uRXJyb3JzIHx8IFtdLFxyXG4gICAgICAgICAgZXJyb3JTY2hlbWE6IHN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSB8fCB7fSxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZXJyb3JzOiBzdGF0ZS5lcnJvcnMgfHwgW10sXHJcbiAgICAgICAgZXJyb3JTY2hlbWE6IHN0YXRlLmVycm9yU2NoZW1hIHx8IHt9LFxyXG4gICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZXJyb3JzLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyxcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xyXG4gICAgaWYgKG11c3RWYWxpZGF0ZSkge1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShcclxuICAgICAgICBmb3JtRGF0YSxcclxuICAgICAgICBzY2hlbWEsXHJcbiAgICAgICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzLFxyXG4gICAgICAgIGN1c3RvbUZvcm1hdHMsXHJcbiAgICAgICAgbG9jYWxpemVFcnJvcnNcclxuICAgICAgKTtcclxuICAgICAgZXJyb3JzID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvcnM7XHJcbiAgICAgIGVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvclNjaGVtYTtcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IGVycm9ycztcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gZXJyb3JTY2hlbWE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjdXJyZW50RXJyb3JzID0gZ2V0Q3VycmVudEVycm9ycygpO1xyXG4gICAgICBlcnJvcnMgPSBjdXJyZW50RXJyb3JzLmVycm9ycztcclxuICAgICAgZXJyb3JTY2hlbWEgPSBjdXJyZW50RXJyb3JzLmVycm9yU2NoZW1hO1xyXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycztcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xyXG4gICAgfVxyXG4gICAgaWYgKHByb3BzLmV4dHJhRXJyb3JzKSB7XHJcbiAgICAgIGVycm9yU2NoZW1hID0gbWVyZ2VPYmplY3RzKFxyXG4gICAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICAgIHByb3BzLmV4dHJhRXJyb3JzLFxyXG4gICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgKTtcclxuICAgICAgZXJyb3JzID0gdG9FcnJvckxpc3QoZXJyb3JTY2hlbWEpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaWRTY2hlbWEgPSB0b0lkU2NoZW1hKFxyXG4gICAgICByZXRyaWV2ZWRTY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hW1widWk6cm9vdEZpZWxkSWRcIl0sXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBwcm9wcy5pZFByZWZpeCxcclxuICAgICAgcHJvcHMuaWRTZXBhcmF0b3JcclxuICAgICk7XHJcbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgZWRpdCxcclxuICAgICAgZXJyb3JzLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzLFxyXG4gICAgfTtcclxuICAgIGlmIChzY2hlbWFWYWxpZGF0aW9uRXJyb3JzKSB7XHJcbiAgICAgIG5leHRTdGF0ZS5zY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gc2NoZW1hVmFsaWRhdGlvbkVycm9ycztcclxuICAgICAgbmV4dFN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0U3RhdGU7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiBzaG91bGRSZW5kZXIodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIHNjaGVtYSA9IHRoaXMucHJvcHMuc2NoZW1hLFxyXG4gICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzID0gdGhpcy5wcm9wcy5hZGRpdGlvbmFsTWV0YVNjaGVtYXMsXHJcbiAgICBjdXN0b21Gb3JtYXRzID0gdGhpcy5wcm9wcy5jdXN0b21Gb3JtYXRzLFxyXG4gICAgbG9jYWxpemVFcnJvcnMgPSB0aGlzLnByb3BzLmxvY2FsaXplRXJyb3JzXHJcbiAgKSB7XHJcbiAgICBjb25zdCB7IHZhbGlkYXRlLCB0cmFuc2Zvcm1FcnJvcnMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHRoaXMuZ2V0UmVnaXN0cnkoKTtcclxuICAgIGNvbnN0IHJlc29sdmVkU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gdmFsaWRhdGVGb3JtRGF0YShcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICB2YWxpZGF0ZSxcclxuICAgICAgdHJhbnNmb3JtRXJyb3JzLFxyXG4gICAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMsXHJcbiAgICAgIGN1c3RvbUZvcm1hdHMsXHJcbiAgICAgIGxvY2FsaXplRXJyb3JzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyRXJyb3JzKCkge1xyXG4gICAgY29uc3QgeyBlcnJvcnMsIGVycm9yU2NoZW1hLCBzY2hlbWEsIHVpU2NoZW1hIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgeyBFcnJvckxpc3QsIHNob3dFcnJvckxpc3QsIGZvcm1Db250ZXh0IH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlmIChlcnJvcnMubGVuZ3RoICYmIHNob3dFcnJvckxpc3QgIT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8RXJyb3JMaXN0XHJcbiAgICAgICAgICBlcnJvcnM9e2Vycm9yc31cclxuICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFVzZWRGb3JtRGF0YSA9IChmb3JtRGF0YSwgZmllbGRzKSA9PiB7XHJcbiAgICAvL2ZvciB0aGUgY2FzZSBvZiBhIHNpbmdsZSBpbnB1dCBmb3JtXHJcbiAgICBpZiAoZmllbGRzLmxlbmd0aCA9PT0gMCAmJiB0eXBlb2YgZm9ybURhdGEgIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgcmV0dXJuIGZvcm1EYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkYXRhID0gX3BpY2soZm9ybURhdGEsIGZpZWxkcyk7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLm1hcChrZXkgPT4gZGF0YVtrZXldKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9O1xyXG5cclxuICBnZXRGaWVsZE5hbWVzID0gKHBhdGhTY2hlbWEsIGZvcm1EYXRhKSA9PiB7XHJcbiAgICBjb25zdCBnZXRBbGxQYXRocyA9IChfb2JqLCBhY2MgPSBbXSwgcGF0aHMgPSBbXCJcIl0pID0+IHtcclxuICAgICAgT2JqZWN0LmtleXMoX29iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgX29ialtrZXldID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICBsZXQgbmV3UGF0aHMgPSBwYXRocy5tYXAocGF0aCA9PiBgJHtwYXRofS4ke2tleX1gKTtcclxuICAgICAgICAgIC8vIElmIGFuIG9iamVjdCBpcyBtYXJrZWQgd2l0aCBhZGRpdGlvbmFsUHJvcGVydGllcywgYWxsIGl0cyBrZXlzIGFyZSB2YWxpZFxyXG4gICAgICAgICAgaWYgKF9vYmpba2V5XS5fX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMgJiYgX29ialtrZXldLiRuYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGFjYy5wdXNoKF9vYmpba2V5XS4kbmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRBbGxQYXRocyhfb2JqW2tleV0sIGFjYywgbmV3UGF0aHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIiRuYW1lXCIgJiYgX29ialtrZXldICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4ge1xyXG4gICAgICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwuLywgXCJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IF9nZXQoZm9ybURhdGEsIHBhdGgpO1xyXG4gICAgICAgICAgICAvLyBhZGRzIHBhdGggdG8gZmllbGROYW1lcyBpZiBpdCBwb2ludHMgdG8gYSB2YWx1ZVxyXG4gICAgICAgICAgICAvLyBvciBhbiBlbXB0eSBvYmplY3QvYXJyYXlcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtVmFsdWUgIT09IFwib2JqZWN0XCIgfHwgX2lzRW1wdHkoZm9ybVZhbHVlKSkge1xyXG4gICAgICAgICAgICAgIGFjYy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZ2V0QWxsUGF0aHMocGF0aFNjaGVtYSk7XHJcbiAgfTtcclxuXHJcbiAgb25DaGFuZ2UgPSAoZm9ybURhdGEsIG5ld0Vycm9yU2NoZW1hKSA9PiB7XHJcbiAgICBpZiAoaXNPYmplY3QoZm9ybURhdGEpIHx8IEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyh0aGlzLnByb3BzLCBmb3JtRGF0YSk7XHJcbiAgICAgIGZvcm1EYXRhID0gbmV3U3RhdGUuZm9ybURhdGE7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtdXN0VmFsaWRhdGUgPSAhdGhpcy5wcm9wcy5ub1ZhbGlkYXRlICYmIHRoaXMucHJvcHMubGl2ZVZhbGlkYXRlO1xyXG4gICAgbGV0IHN0YXRlID0geyBmb3JtRGF0YSB9O1xyXG4gICAgbGV0IG5ld0Zvcm1EYXRhID0gZm9ybURhdGE7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvcHMub21pdEV4dHJhRGF0YSA9PT0gdHJ1ZSAmJiB0aGlzLnByb3BzLmxpdmVPbWl0ID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIGZvcm1EYXRhXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHBhdGhTY2hlbWEgPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgcmV0cmlldmVkU2NoZW1hLFxyXG4gICAgICAgIFwiXCIsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZXMgPSB0aGlzLmdldEZpZWxkTmFtZXMocGF0aFNjaGVtYSwgZm9ybURhdGEpO1xyXG5cclxuICAgICAgbmV3Rm9ybURhdGEgPSB0aGlzLmdldFVzZWRGb3JtRGF0YShmb3JtRGF0YSwgZmllbGROYW1lcyk7XHJcbiAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGZvcm1EYXRhOiBuZXdGb3JtRGF0YSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobXVzdFZhbGlkYXRlKSB7XHJcbiAgICAgIGxldCBzY2hlbWFWYWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShuZXdGb3JtRGF0YSk7XHJcbiAgICAgIGxldCBlcnJvcnMgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9ycztcclxuICAgICAgbGV0IGVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvclNjaGVtYTtcclxuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IGVycm9ycztcclxuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gZXJyb3JTY2hlbWE7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XHJcbiAgICAgICAgZXJyb3JTY2hlbWEgPSBtZXJnZU9iamVjdHMoXHJcbiAgICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgICAhIVwiY29uY2F0IGFycmF5c1wiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICAgIH1cclxuICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxyXG4gICAgICAgIGVycm9ycyxcclxuICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzLFxyXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSxcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMubm9WYWxpZGF0ZSAmJiBuZXdFcnJvclNjaGVtYSkge1xyXG4gICAgICBjb25zdCBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXh0cmFFcnJvcnNcclxuICAgICAgICA/IG1lcmdlT2JqZWN0cyhcclxuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG5ld0Vycm9yU2NoZW1hO1xyXG4gICAgICBzdGF0ZSA9IHtcclxuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JTY2hlbWE6IGVycm9yU2NoZW1hLFxyXG4gICAgICAgIGVycm9yczogdG9FcnJvckxpc3QoZXJyb3JTY2hlbWEpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgc3RhdGUsXHJcbiAgICAgICgpID0+IHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlKVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBvbkJsdXIgPSAoLi4uYXJncykgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9uRm9jdXMgPSAoLi4uYXJncykgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xyXG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25TdWJtaXQgPSBldmVudCA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnQucGVyc2lzdCgpO1xyXG4gICAgbGV0IG5ld0Zvcm1EYXRhID0gdGhpcy5zdGF0ZS5mb3JtRGF0YTtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbWl0RXh0cmFEYXRhID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxyXG4gICAgICAgIG5ld0Zvcm1EYXRhXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHBhdGhTY2hlbWEgPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgcmV0cmlldmVkU2NoZW1hLFxyXG4gICAgICAgIFwiXCIsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgbmV3Rm9ybURhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZXMgPSB0aGlzLmdldEZpZWxkTmFtZXMocGF0aFNjaGVtYSwgbmV3Rm9ybURhdGEpO1xyXG5cclxuICAgICAgbmV3Rm9ybURhdGEgPSB0aGlzLmdldFVzZWRGb3JtRGF0YShuZXdGb3JtRGF0YSwgZmllbGROYW1lcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnByb3BzLm5vVmFsaWRhdGUpIHtcclxuICAgICAgbGV0IHNjaGVtYVZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKG5ld0Zvcm1EYXRhKTtcclxuICAgICAgbGV0IGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xyXG4gICAgICBsZXQgZXJyb3JTY2hlbWEgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9yU2NoZW1hO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYTtcclxuICAgICAgaWYgKE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XHJcbiAgICAgICAgICBlcnJvclNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcclxuICAgICAgICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGVycm9ycyxcclxuICAgICAgICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXHJcbiAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uRXJyb3IpIHtcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRXJyb3IoZXJyb3JzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRm9ybSB2YWxpZGF0aW9uIGZhaWxlZFwiLCBlcnJvcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGVyZSBhcmUgbm8gZXJyb3JzIGdlbmVyYXRlZCB0aHJvdWdoIHNjaGVtYSB2YWxpZGF0aW9uLlxyXG4gICAgLy8gQ2hlY2sgZm9yIHVzZXIgcHJvdmlkZWQgZXJyb3JzIGFuZCB1cGRhdGUgc3RhdGUgYWNjb3JkaW5nbHkuXHJcbiAgICBsZXQgZXJyb3JTY2hlbWE7XHJcbiAgICBsZXQgZXJyb3JzO1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZXh0cmFFcnJvcnMpIHtcclxuICAgICAgZXJyb3JTY2hlbWEgPSB0aGlzLnByb3BzLmV4dHJhRXJyb3JzO1xyXG4gICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlcnJvclNjaGVtYSA9IHt9O1xyXG4gICAgICBlcnJvcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICB7XHJcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxyXG4gICAgICAgIGVycm9yczogZXJyb3JzLFxyXG4gICAgICAgIGVycm9yU2NoZW1hOiBlcnJvclNjaGVtYSxcclxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzOiBbXSxcclxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWE6IHt9LFxyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWJtaXQpIHtcclxuICAgICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoXHJcbiAgICAgICAgICAgIHsgLi4udGhpcy5zdGF0ZSwgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLCBzdGF0dXM6IFwic3VibWl0dGVkXCIgfSxcclxuICAgICAgICAgICAgZXZlbnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGdldFJlZ2lzdHJ5KCkge1xyXG4gICAgLy8gRm9yIEJDLCBhY2NlcHQgcGFzc2VkIFNjaGVtYUZpZWxkIGFuZCBUaXRsZUZpZWxkIHByb3BzIGFuZCBwYXNzIHRoZW0gdG9cclxuICAgIC8vIHRoZSBcImZpZWxkc1wiIHJlZ2lzdHJ5IG9uZS5cclxuICAgIGNvbnN0IHsgZmllbGRzLCB3aWRnZXRzIH0gPSBnZXREZWZhdWx0UmVnaXN0cnkoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZpZWxkczogeyAuLi5maWVsZHMsIC4uLnRoaXMucHJvcHMuZmllbGRzIH0sXHJcbiAgICAgIHdpZGdldHM6IHsgLi4ud2lkZ2V0cywgLi4udGhpcy5wcm9wcy53aWRnZXRzIH0sXHJcbiAgICAgIEFycmF5RmllbGRUZW1wbGF0ZTogdGhpcy5wcm9wcy5BcnJheUZpZWxkVGVtcGxhdGUsXHJcbiAgICAgIE9iamVjdEZpZWxkVGVtcGxhdGU6IHRoaXMucHJvcHMuT2JqZWN0RmllbGRUZW1wbGF0ZSxcclxuICAgICAgRmllbGRUZW1wbGF0ZTogdGhpcy5wcm9wcy5GaWVsZFRlbXBsYXRlLFxyXG4gICAgICBkZWZpbml0aW9uczogdGhpcy5wcm9wcy5zY2hlbWEuZGVmaW5pdGlvbnMgfHwge30sXHJcbiAgICAgIHJvb3RTY2hlbWE6IHRoaXMucHJvcHMuc2NoZW1hLFxyXG4gICAgICBmb3JtQ29udGV4dDogdGhpcy5wcm9wcy5mb3JtQ29udGV4dCB8fCB7fSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzdWJtaXQoKSB7XHJcbiAgICBpZiAodGhpcy5mb3JtRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmZvcm1FbGVtZW50LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwic3VibWl0XCIsIHtcclxuICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2hpbGRyZW4sXHJcbiAgICAgIGlkLFxyXG4gICAgICBpZFByZWZpeCxcclxuICAgICAgaWRTZXBhcmF0b3IsXHJcbiAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgdGFnTmFtZSxcclxuICAgICAgbmFtZSxcclxuICAgICAgbWV0aG9kLFxyXG4gICAgICB0YXJnZXQsXHJcbiAgICAgIGFjdGlvbixcclxuICAgICAgYXV0b2NvbXBsZXRlOiBkZXByZWNhdGVkQXV0b2NvbXBsZXRlLFxyXG4gICAgICBhdXRvQ29tcGxldGU6IGN1cnJlbnRBdXRvQ29tcGxldGUsXHJcbiAgICAgIGVuY3R5cGUsXHJcbiAgICAgIGFjY2VwdGNoYXJzZXQsXHJcbiAgICAgIG5vSHRtbDVWYWxpZGF0ZSxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICBmb3JtQ29udGV4dCxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IHsgc2NoZW1hLCB1aVNjaGVtYSwgZm9ybURhdGEsIGVycm9yU2NoZW1hLCBpZFNjaGVtYSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IHJlZ2lzdHJ5ID0gdGhpcy5nZXRSZWdpc3RyeSgpO1xyXG4gICAgY29uc3QgX1NjaGVtYUZpZWxkID0gcmVnaXN0cnkuZmllbGRzLlNjaGVtYUZpZWxkO1xyXG4gICAgY29uc3QgRm9ybVRhZyA9IHRhZ05hbWUgPyB0YWdOYW1lIDogXCJmb3JtXCI7XHJcbiAgICBpZiAoZGVwcmVjYXRlZEF1dG9jb21wbGV0ZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgXCJVc2luZyBhdXRvY29tcGxldGUgcHJvcGVydHkgb2YgRm9ybSBpcyBkZXByZWNhdGVkLCB1c2UgYXV0b0NvbXBsZXRlIGluc3RlYWQuXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGF1dG9Db21wbGV0ZSA9IGN1cnJlbnRBdXRvQ29tcGxldGVcclxuICAgICAgPyBjdXJyZW50QXV0b0NvbXBsZXRlXHJcbiAgICAgIDogZGVwcmVjYXRlZEF1dG9jb21wbGV0ZTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Rm9ybVRhZ1xyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lID8gY2xhc3NOYW1lIDogXCJyanNmXCJ9XHJcbiAgICAgICAgaWQ9e2lkfVxyXG4gICAgICAgIG5hbWU9e25hbWV9XHJcbiAgICAgICAgbWV0aG9kPXttZXRob2R9XHJcbiAgICAgICAgdGFyZ2V0PXt0YXJnZXR9XHJcbiAgICAgICAgYWN0aW9uPXthY3Rpb259XHJcbiAgICAgICAgYXV0b0NvbXBsZXRlPXthdXRvQ29tcGxldGV9XHJcbiAgICAgICAgZW5jVHlwZT17ZW5jdHlwZX1cclxuICAgICAgICBhY2NlcHRDaGFyc2V0PXthY2NlcHRjaGFyc2V0fVxyXG4gICAgICAgIG5vVmFsaWRhdGU9e25vSHRtbDVWYWxpZGF0ZX1cclxuICAgICAgICBvblN1Ym1pdD17dGhpcy5vblN1Ym1pdH1cclxuICAgICAgICByZWY9e2Zvcm0gPT4ge1xyXG4gICAgICAgICAgdGhpcy5mb3JtRWxlbWVudCA9IGZvcm07XHJcbiAgICAgICAgfX0+XHJcbiAgICAgICAge3RoaXMucmVuZGVyRXJyb3JzKCl9XHJcbiAgICAgICAgPF9TY2hlbWFGaWVsZFxyXG4gICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWF9XHJcbiAgICAgICAgICBpZFNjaGVtYT17aWRTY2hlbWF9XHJcbiAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICBpZFNlcGFyYXRvcj17aWRTZXBhcmF0b3J9XHJcbiAgICAgICAgICBmb3JtQ29udGV4dD17Zm9ybUNvbnRleHR9XHJcbiAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XHJcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cclxuICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkJsdXJ9XHJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uRm9jdXN9XHJcbiAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgICB7Y2hpbGRyZW4gPyAoXHJcbiAgICAgICAgICBjaGlsZHJlblxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIj5cclxuICAgICAgICAgICAgICBTdWJtaXRcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L0Zvcm1UYWc+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIEZvcm0ucHJvcFR5cGVzID0ge1xyXG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICB1aVNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGZvcm1EYXRhOiBQcm9wVHlwZXMuYW55LFxyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgcmVhZG9ubHk6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgd2lkZ2V0czogUHJvcFR5cGVzLm9iamVjdE9mKFxyXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLm9iamVjdF0pXHJcbiAgICApLFxyXG4gICAgZmllbGRzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmVsZW1lbnRUeXBlKSxcclxuICAgIEFycmF5RmllbGRUZW1wbGF0ZTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgT2JqZWN0RmllbGRUZW1wbGF0ZTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgRmllbGRUZW1wbGF0ZTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgRXJyb3JMaXN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uRXJyb3I6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgc2hvd0Vycm9yTGlzdDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvblN1Ym1pdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHRhZ05hbWU6IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBtZXRob2Q6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBhY3Rpb246IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBhdXRvY29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBhdXRvQ29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBlbmN0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgYWNjZXB0Y2hhcnNldDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG5vVmFsaWRhdGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbm9IdG1sNVZhbGlkYXRlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGxpdmVWYWxpZGF0ZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB2YWxpZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICB0cmFuc2Zvcm1FcnJvcnM6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgZm9ybUNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBjdXN0b21Gb3JtYXRzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcclxuICAgIG9taXRFeHRyYURhdGE6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZXh0cmFFcnJvcnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgfTtcclxufVxyXG4iXX0=