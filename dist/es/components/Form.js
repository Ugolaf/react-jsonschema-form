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

import React, { Component } from "react";
import PropTypes from "prop-types";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { default as DefaultErrorList } from "./ErrorList";
import { getDefaultFormState, retrieveSchema, shouldRender, toIdSchema, getDefaultRegistry, deepEquals, toPathSchema, isObject } from "../utils";
import validateFormData, { toErrorList } from "../validate";
import { mergeObjects } from "../utils";

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

      var data = _pick(formData, fields);

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

              var formValue = _get(formData, path); // adds path to fieldNames if it points to a value
              // or an empty object/array


              if (_typeof(formValue) !== "object" || _isEmpty(formValue)) {
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
      if (isObject(formData) || Array.isArray(formData)) {
        var newState = _this.getStateFromProps(_this.props, formData);

        formData = newState.formData;
      }

      var mustValidate = !_this.props.noValidate && _this.props.liveValidate;
      var state = {
        formData: formData
      };
      var newFormData = formData;

      if (_this.props.omitExtraData === true && _this.props.liveOmit === true) {
        var retrievedSchema = retrieveSchema(_this.state.schema, _this.state.schema, formData);
        var pathSchema = toPathSchema(retrievedSchema, "", _this.state.schema, formData);

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
          errorSchema = mergeObjects(errorSchema, _this.props.extraErrors, !!"concat arrays");
          errors = toErrorList(errorSchema);
        }

        state = {
          formData: newFormData,
          errors: errors,
          errorSchema: errorSchema,
          schemaValidationErrors: schemaValidationErrors,
          schemaValidationErrorSchema: schemaValidationErrorSchema
        };
      } else if (!_this.props.noValidate && newErrorSchema) {
        var _errorSchema = _this.props.extraErrors ? mergeObjects(newErrorSchema, _this.props.extraErrors, !!"concat arrays") : newErrorSchema;

        state = {
          formData: newFormData,
          errorSchema: _errorSchema,
          errors: toErrorList(_errorSchema)
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
        var retrievedSchema = retrieveSchema(_this.state.schema, _this.state.schema, newFormData);
        var pathSchema = toPathSchema(retrievedSchema, "", _this.state.schema, newFormData);

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
            _errorSchema2 = mergeObjects(_errorSchema2, _this.props.extraErrors, !!"concat arrays");
            _errors = toErrorList(_errorSchema2);
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
        errors = toErrorList(errorSchema);
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

    if (_this.props.onChange && !deepEquals(_this.state.formData, _this.props.formData)) {
      _this.props.onChange(_this.state);
    }

    _this.formElement = null;
    return _this;
  }

  _createClass(Form, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var nextState = this.getStateFromProps(nextProps, nextProps.formData);

      if (!deepEquals(nextState.formData, nextProps.formData) && !deepEquals(nextState.formData, this.state.formData) && this.props.onChange) {
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
      var formData = getDefaultFormState(schema, inputFormData, rootSchema);
      var retrievedSchema = retrieveSchema(schema, rootSchema, formData);
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
        errorSchema = mergeObjects(errorSchema, props.extraErrors, !!"concat arrays");
        errors = toErrorList(errorSchema);
      }

      var idSchema = toIdSchema(retrievedSchema, uiSchema["ui:rootFieldId"], rootSchema, formData, props.idPrefix, props.idSeparator);
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
      return shouldRender(this, nextProps, nextState);
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

      var resolvedSchema = retrieveSchema(schema, rootSchema, formData);
      return validateFormData(formData, resolvedSchema, validate, transformErrors, additionalMetaSchemas, customFormats, localizeErrors);
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
        return /*#__PURE__*/React.createElement(ErrorList, {
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
      var _getDefaultRegistry = getDefaultRegistry(),
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
      return /*#__PURE__*/React.createElement(FormTag, {
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
      }, this.renderErrors(), /*#__PURE__*/React.createElement(_SchemaField, {
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
      }), children ? children : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        type: "submit",
        className: "btn btn-info"
      }, "Submit")));
    }
  }]);

  return Form;
}(Component);

_defineProperty(Form, "defaultProps", {
  uiSchema: {},
  noValidate: false,
  liveValidate: false,
  disabled: false,
  readonly: false,
  noHtml5Validate: false,
  ErrorList: DefaultErrorList,
  omitExtraData: false,
  localizeErrors: null
});

export { Form as default };

if (process.env.NODE_ENV !== "production") {
  Form.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.any,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    fields: PropTypes.objectOf(PropTypes.elementType),
    ArrayFieldTemplate: PropTypes.elementType,
    ObjectFieldTemplate: PropTypes.elementType,
    FieldTemplate: PropTypes.elementType,
    ErrorList: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    showErrorList: PropTypes.bool,
    onSubmit: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    tagName: PropTypes.elementType,
    name: PropTypes.string,
    method: PropTypes.string,
    target: PropTypes.string,
    action: PropTypes.string,
    autocomplete: PropTypes.string,
    autoComplete: PropTypes.string,
    enctype: PropTypes.string,
    acceptcharset: PropTypes.string,
    noValidate: PropTypes.bool,
    noHtml5Validate: PropTypes.bool,
    liveValidate: PropTypes.bool,
    validate: PropTypes.func,
    transformErrors: PropTypes.func,
    formContext: PropTypes.object,
    customFormats: PropTypes.object,
    additionalMetaSchemas: PropTypes.arrayOf(PropTypes.object),
    omitExtraData: PropTypes.bool,
    extraErrors: PropTypes.object
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Zvcm0uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJfcGljayIsIl9nZXQiLCJfaXNFbXB0eSIsImRlZmF1bHQiLCJEZWZhdWx0RXJyb3JMaXN0IiwiZ2V0RGVmYXVsdEZvcm1TdGF0ZSIsInJldHJpZXZlU2NoZW1hIiwic2hvdWxkUmVuZGVyIiwidG9JZFNjaGVtYSIsImdldERlZmF1bHRSZWdpc3RyeSIsImRlZXBFcXVhbHMiLCJ0b1BhdGhTY2hlbWEiLCJpc09iamVjdCIsInZhbGlkYXRlRm9ybURhdGEiLCJ0b0Vycm9yTGlzdCIsIm1lcmdlT2JqZWN0cyIsIkZvcm0iLCJwcm9wcyIsImZvcm1EYXRhIiwiZmllbGRzIiwibGVuZ3RoIiwiZGF0YSIsIkFycmF5IiwiaXNBcnJheSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJwYXRoU2NoZW1hIiwiZ2V0QWxsUGF0aHMiLCJfb2JqIiwiYWNjIiwicGF0aHMiLCJmb3JFYWNoIiwibmV3UGF0aHMiLCJwYXRoIiwiX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiJG5hbWUiLCJwdXNoIiwicmVwbGFjZSIsImZvcm1WYWx1ZSIsIm5ld0Vycm9yU2NoZW1hIiwibmV3U3RhdGUiLCJnZXRTdGF0ZUZyb21Qcm9wcyIsIm11c3RWYWxpZGF0ZSIsIm5vVmFsaWRhdGUiLCJsaXZlVmFsaWRhdGUiLCJzdGF0ZSIsIm5ld0Zvcm1EYXRhIiwib21pdEV4dHJhRGF0YSIsImxpdmVPbWl0IiwicmV0cmlldmVkU2NoZW1hIiwic2NoZW1hIiwiZmllbGROYW1lcyIsImdldEZpZWxkTmFtZXMiLCJnZXRVc2VkRm9ybURhdGEiLCJzY2hlbWFWYWxpZGF0aW9uIiwidmFsaWRhdGUiLCJlcnJvcnMiLCJlcnJvclNjaGVtYSIsInNjaGVtYVZhbGlkYXRpb25FcnJvcnMiLCJzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEiLCJleHRyYUVycm9ycyIsInNldFN0YXRlIiwib25DaGFuZ2UiLCJvbkJsdXIiLCJvbkZvY3VzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJwZXJzaXN0Iiwib25FcnJvciIsImNvbnNvbGUiLCJlcnJvciIsIm9uU3VibWl0Iiwic3RhdHVzIiwiZm9ybUVsZW1lbnQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJpbnB1dEZvcm1EYXRhIiwidWlTY2hlbWEiLCJlZGl0Iiwicm9vdFNjaGVtYSIsImN1c3RvbUZvcm1hdHMiLCJsb2NhbGl6ZUVycm9ycyIsImFkZGl0aW9uYWxNZXRhU2NoZW1hcyIsImdldEN1cnJlbnRFcnJvcnMiLCJjdXJyZW50RXJyb3JzIiwiaWRTY2hlbWEiLCJpZFByZWZpeCIsImlkU2VwYXJhdG9yIiwidHJhbnNmb3JtRXJyb3JzIiwiZ2V0UmVnaXN0cnkiLCJyZXNvbHZlZFNjaGVtYSIsIkVycm9yTGlzdCIsInNob3dFcnJvckxpc3QiLCJmb3JtQ29udGV4dCIsIndpZGdldHMiLCJBcnJheUZpZWxkVGVtcGxhdGUiLCJPYmplY3RGaWVsZFRlbXBsYXRlIiwiRmllbGRUZW1wbGF0ZSIsImRlZmluaXRpb25zIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiY2FuY2VsYWJsZSIsImNoaWxkcmVuIiwiaWQiLCJjbGFzc05hbWUiLCJ0YWdOYW1lIiwibmFtZSIsIm1ldGhvZCIsImFjdGlvbiIsImRlcHJlY2F0ZWRBdXRvY29tcGxldGUiLCJhdXRvY29tcGxldGUiLCJjdXJyZW50QXV0b0NvbXBsZXRlIiwiYXV0b0NvbXBsZXRlIiwiZW5jdHlwZSIsImFjY2VwdGNoYXJzZXQiLCJub0h0bWw1VmFsaWRhdGUiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwicmVnaXN0cnkiLCJfU2NoZW1hRmllbGQiLCJTY2hlbWFGaWVsZCIsIkZvcm1UYWciLCJ3YXJuIiwiZm9ybSIsInJlbmRlckVycm9ycyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJhbnkiLCJib29sIiwib2JqZWN0T2YiLCJvbmVPZlR5cGUiLCJmdW5jIiwiZWxlbWVudFR5cGUiLCJzdHJpbmciLCJhcnJheU9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixhQUFsQjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsWUFBakI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLGdCQUFyQjtBQUVBLFNBQVNDLE9BQU8sSUFBSUMsZ0JBQXBCLFFBQTRDLGFBQTVDO0FBQ0EsU0FDRUMsbUJBREYsRUFFRUMsY0FGRixFQUdFQyxZQUhGLEVBSUVDLFVBSkYsRUFLRUMsa0JBTEYsRUFNRUMsVUFORixFQU9FQyxZQVBGLEVBUUVDLFFBUkYsUUFTTyxVQVRQO0FBVUEsT0FBT0MsZ0JBQVAsSUFBMkJDLFdBQTNCLFFBQThDLGFBQTlDO0FBQ0EsU0FBU0MsWUFBVCxRQUE2QixVQUE3Qjs7SUFFcUJDLEk7Ozs7O0FBYW5CLGdCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOOztBQURpQixzRUF5SkQsVUFBQ0MsUUFBRCxFQUFXQyxNQUFYLEVBQXNCO0FBQ3RDO0FBQ0EsVUFBSUEsTUFBTSxDQUFDQyxNQUFQLEtBQWtCLENBQWxCLElBQXVCLFFBQU9GLFFBQVAsTUFBb0IsUUFBL0MsRUFBeUQ7QUFDdkQsZUFBT0EsUUFBUDtBQUNEOztBQUVELFVBQUlHLElBQUksR0FBR3JCLEtBQUssQ0FBQ2tCLFFBQUQsRUFBV0MsTUFBWCxDQUFoQjs7QUFDQSxVQUFJRyxLQUFLLENBQUNDLE9BQU4sQ0FBY0wsUUFBZCxDQUFKLEVBQTZCO0FBQzNCLGVBQU9NLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSixJQUFaLEVBQWtCSyxHQUFsQixDQUFzQixVQUFB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QUU5QyxTQUFTLENBQUN5SSxJQTdCUDtBQThCZmpCLElBQUFBLGVBQWUsRUFBRXhILFNBQVMsQ0FBQ3lJLElBOUJaO0FBK0JmMUYsSUFBQUEsWUFBWSxFQUFFL0MsU0FBUyxDQUFDeUksSUEvQlQ7QUFnQ2YvRSxJQUFBQSxRQUFRLEVBQUUxRCxTQUFTLENBQUM0SSxJQWhDTDtBQWlDZi9DLElBQUFBLGVBQWUsRUFBRTdGLFNBQVMsQ0FBQzRJLElBakNaO0FBa0NmMUMsSUFBQUEsV0FBVyxFQUFFbEcsU0FBUyxDQUFDc0ksTUFsQ1I7QUFtQ2ZqRCxJQUFBQSxhQUFhLEVBQUVyRixTQUFTLENBQUNzSSxNQW5DVjtBQW9DZi9DLElBQUFBLHFCQUFxQixFQUFFdkYsU0FBUyxDQUFDK0ksT0FBVixDQUFrQi9JLFNBQVMsQ0FBQ3NJLE1BQTVCLENBcENSO0FBcUNmcEYsSUFBQUEsYUFBYSxFQUFFbEQsU0FBUyxDQUFDeUksSUFyQ1Y7QUFzQ2YxRSxJQUFBQSxXQUFXLEVBQUUvRCxTQUFTLENBQUNzSTtBQXRDUixHQUFqQjtBQXdDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgX3BpY2sgZnJvbSBcImxvZGFzaC9waWNrXCI7XHJcbmltcG9ydCBfZ2V0IGZyb20gXCJsb2Rhc2gvZ2V0XCI7XHJcbmltcG9ydCBfaXNFbXB0eSBmcm9tIFwibG9kYXNoL2lzRW1wdHlcIjtcclxuXHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgRGVmYXVsdEVycm9yTGlzdCB9IGZyb20gXCIuL0Vycm9yTGlzdFwiO1xyXG5pbXBvcnQge1xyXG4gIGdldERlZmF1bHRGb3JtU3RhdGUsXHJcbiAgcmV0cmlldmVTY2hlbWEsXHJcbiAgc2hvdWxkUmVuZGVyLFxyXG4gIHRvSWRTY2hlbWEsXHJcbiAgZ2V0RGVmYXVsdFJlZ2lzdHJ5LFxyXG4gIGRlZXBFcXVhbHMsXHJcbiAgdG9QYXRoU2NoZW1hLFxyXG4gIGlzT2JqZWN0LFxyXG59IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgdmFsaWRhdGVGb3JtRGF0YSwgeyB0b0Vycm9yTGlzdCB9IGZyb20gXCIuLi92YWxpZGF0ZVwiO1xyXG5pbXBvcnQgeyBtZXJnZU9iamVjdHMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB1aVNjaGVtYToge30sXHJcbiAgICBub1ZhbGlkYXRlOiBmYWxzZSxcclxuICAgIGxpdmVWYWxpZGF0ZTogZmFsc2UsXHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICByZWFkb25seTogZmFsc2UsXHJcbiAgICBub0h0bWw1VmFsaWRhdGU6IGZhbHNlLFxyXG4gICAgRXJyb3JMaXN0OiBEZWZhdWx0RXJyb3JMaXN0LFxyXG4gICAgb21pdEV4dHJhRGF0YTogZmFsc2UsXHJcbiAgICBsb2NhbGl6ZUVycm9yczogbnVsbCxcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGVGcm9tUHJvcHMocHJvcHMsIHByb3BzLmZvcm1EYXRhKTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSAmJlxyXG4gICAgICAhZGVlcEVxdWFscyh0aGlzLnN0YXRlLmZvcm1EYXRhLCB0aGlzLnByb3BzLmZvcm1EYXRhKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZvcm1FbGVtZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIFVOU0FGRV9jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIG5leHRQcm9wcy5mb3JtRGF0YSk7XHJcbiAgICBpZiAoXHJcbiAgICAgICFkZWVwRXF1YWxzKG5leHRTdGF0ZS5mb3JtRGF0YSwgbmV4dFByb3BzLmZvcm1EYXRhKSAmJlxyXG4gICAgICAhZGVlcEVxdWFscyhuZXh0U3RhdGUuZm9ybURhdGEsIHRoaXMuc3RhdGUuZm9ybURhdGEpICYmXHJcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VcclxuICAgICkge1xyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5leHRTdGF0ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKG5leHRTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgaW5wdXRGb3JtRGF0YSkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlIHx8IHt9O1xyXG4gICAgY29uc3Qgc2NoZW1hID0gXCJzY2hlbWFcIiBpbiBwcm9wcyA/IHByb3BzLnNjaGVtYSA6IHRoaXMucHJvcHMuc2NoZW1hO1xyXG4gICAgY29uc3QgdWlTY2hlbWEgPSBcInVpU2NoZW1hXCIgaW4gcHJvcHMgPyBwcm9wcy51aVNjaGVtYSA6IHRoaXMucHJvcHMudWlTY2hlbWE7XHJcbiAgICBjb25zdCBlZGl0ID0gdHlwZW9mIGlucHV0Rm9ybURhdGEgIT09IFwidW5kZWZpbmVkXCI7XHJcbiAgICBjb25zdCBsaXZlVmFsaWRhdGUgPVxyXG4gICAgICBcImxpdmVWYWxpZGF0ZVwiIGluIHByb3BzID8gcHJvcHMubGl2ZVZhbGlkYXRlIDogdGhpcy5wcm9wcy5saXZlVmFsaWRhdGU7XHJcbiAgICBjb25zdCBtdXN0VmFsaWRhdGUgPSBlZGl0ICYmICFwcm9wcy5ub1ZhbGlkYXRlICYmIGxpdmVWYWxpZGF0ZTtcclxuICAgIGNvbnN0IHJvb3RTY2hlbWEgPSBzY2hlbWE7XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IGdldERlZmF1bHRGb3JtU3RhdGUoc2NoZW1hLCBpbnB1dEZvcm1EYXRhLCByb290U2NoZW1hKTtcclxuICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgY29uc3QgY3VzdG9tRm9ybWF0cyA9IHByb3BzLmN1c3RvbUZvcm1hdHM7XHJcbiAgICBjb25zdCBsb2NhbGl6ZUVycm9ycyA9IHByb3BzLmxvY2FsaXplRXJyb3JzO1xyXG4gICAgY29uc3QgYWRkaXRpb25hbE1ldGFTY2hlbWFzID0gcHJvcHMuYWRkaXRpb25hbE1ldGFTY2hlbWFzO1xyXG5cclxuICAgIGNvbnN0IGdldEN1cnJlbnRFcnJvcnMgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChwcm9wcy5ub1ZhbGlkYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgZXJyb3JzOiBbXSwgZXJyb3JTY2hlbWE6IHt9IH07XHJcbiAgICAgIH0gZWxzZSBpZiAoIXByb3BzLmxpdmVWYWxpZGF0ZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBlcnJvcnM6IHN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvcnMgfHwgW10sXHJcbiAgICAgICAgICBlcnJvclNjaGVtYTogc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hIHx8IHt9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBlcnJvcnM6IHN0YXRlLmVycm9ycyB8fCBbXSxcclxuICAgICAgICBlcnJvclNjaGVtYTogc3RhdGUuZXJyb3JTY2hlbWEgfHwge30sXHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBlcnJvcnMsXHJcbiAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzLFxyXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWE7XHJcbiAgICBpZiAobXVzdFZhbGlkYXRlKSB7XHJcbiAgICAgIGNvbnN0IHNjaGVtYVZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKFxyXG4gICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgIHNjaGVtYSxcclxuICAgICAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMsXHJcbiAgICAgICAgY3VzdG9tRm9ybWF0cyxcclxuICAgICAgICBsb2NhbGl6ZUVycm9yc1xyXG4gICAgICApO1xyXG4gICAgICBlcnJvcnMgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9ycztcclxuICAgICAgZXJyb3JTY2hlbWEgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9yU2NoZW1hO1xyXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRFcnJvcnMgPSBnZXRDdXJyZW50RXJyb3JzKCk7XHJcbiAgICAgIGVycm9ycyA9IGN1cnJlbnRFcnJvcnMuZXJyb3JzO1xyXG4gICAgICBlcnJvclNjaGVtYSA9IGN1cnJlbnRFcnJvcnMuZXJyb3JTY2hlbWE7XHJcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMgPSBzdGF0ZS5zY2hlbWFWYWxpZGF0aW9uRXJyb3JzO1xyXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgPSBzdGF0ZS5zY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWE7XHJcbiAgICB9XHJcbiAgICBpZiAocHJvcHMuZXh0cmFFcnJvcnMpIHtcclxuICAgICAgZXJyb3JTY2hlbWEgPSBtZXJnZU9iamVjdHMoXHJcbiAgICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgcHJvcHMuZXh0cmFFcnJvcnMsXHJcbiAgICAgICAgISFcImNvbmNhdCBhcnJheXNcIlxyXG4gICAgICApO1xyXG4gICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpZFNjaGVtYSA9IHRvSWRTY2hlbWEoXHJcbiAgICAgIHJldHJpZXZlZFNjaGVtYSxcclxuICAgICAgdWlTY2hlbWFbXCJ1aTpyb290RmllbGRJZFwiXSxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIHByb3BzLmlkUHJlZml4LFxyXG4gICAgICBwcm9wcy5pZFNlcGFyYXRvclxyXG4gICAgKTtcclxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBlZGl0LFxyXG4gICAgICBlcnJvcnMsXHJcbiAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMsXHJcbiAgICB9O1xyXG4gICAgaWYgKHNjaGVtYVZhbGlkYXRpb25FcnJvcnMpIHtcclxuICAgICAgbmV4dFN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvcnMgPSBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzO1xyXG4gICAgICBuZXh0U3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgcmV0dXJuIHNob3VsZFJlbmRlcih0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgc2NoZW1hID0gdGhpcy5wcm9wcy5zY2hlbWEsXHJcbiAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMgPSB0aGlzLnByb3BzLmFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcclxuICAgIGN1c3RvbUZvcm1hdHMgPSB0aGlzLnByb3BzLmN1c3RvbUZvcm1hdHMsXHJcbiAgICBsb2NhbGl6ZUVycm9ycyA9IHRoaXMucHJvcHMubG9jYWxpemVFcnJvcnNcclxuICApIHtcclxuICAgIGNvbnN0IHsgdmFsaWRhdGUsIHRyYW5zZm9ybUVycm9ycyB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgcm9vdFNjaGVtYSB9ID0gdGhpcy5nZXRSZWdpc3RyeSgpO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIHJldHVybiB2YWxpZGF0ZUZvcm1EYXRhKFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgIHZhbGlkYXRlLFxyXG4gICAgICB0cmFuc2Zvcm1FcnJvcnMsXHJcbiAgICAgIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcclxuICAgICAgY3VzdG9tRm9ybWF0cyxcclxuICAgICAgbG9jYWxpemVFcnJvcnNcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJFcnJvcnMoKSB7XHJcbiAgICBjb25zdCB7IGVycm9ycywgZXJyb3JTY2hlbWEsIHNjaGVtYSwgdWlTY2hlbWEgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCB7IEVycm9yTGlzdCwgc2hvd0Vycm9yTGlzdCwgZm9ybUNvbnRleHQgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaWYgKGVycm9ycy5sZW5ndGggJiYgc2hvd0Vycm9yTGlzdCAhPSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxFcnJvckxpc3RcclxuICAgICAgICAgIGVycm9ycz17ZXJyb3JzfVxyXG4gICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hfVxyXG4gICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgICAgICBmb3JtQ29udGV4dD17Zm9ybUNvbnRleHR9XHJcbiAgICAgICAgLz5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlZEZvcm1EYXRhID0gKGZvcm1EYXRhLCBmaWVsZHMpID0+IHtcclxuICAgIC8vZm9yIHRoZSBjYXNlIG9mIGEgc2luZ2xlIGlucHV0IGZvcm1cclxuICAgIGlmIChmaWVsZHMubGVuZ3RoID09PSAwICYmIHR5cGVvZiBmb3JtRGF0YSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICByZXR1cm4gZm9ybURhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhdGEgPSBfcGljayhmb3JtRGF0YSwgZmllbGRzKTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGZvcm1EYXRhKSkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkubWFwKGtleSA9PiBkYXRhW2tleV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH07XHJcblxyXG4gIGdldEZpZWxkTmFtZXMgPSAocGF0aFNjaGVtYSwgZm9ybURhdGEpID0+IHtcclxuICAgIGNvbnN0IGdldEFsbFBhdGhzID0gKF9vYmosIGFjYyA9IFtdLCBwYXRocyA9IFtcIlwiXSkgPT4ge1xyXG4gICAgICBPYmplY3Qua2V5cyhfb2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBfb2JqW2tleV0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgIGxldCBuZXdQYXRocyA9IHBhdGhzLm1hcChwYXRoID0+IGAke3BhdGh9LiR7a2V5fWApO1xyXG4gICAgICAgICAgLy8gSWYgYW4gb2JqZWN0IGlzIG1hcmtlZCB3aXRoIGFkZGl0aW9uYWxQcm9wZXJ0aWVzLCBhbGwgaXRzIGtleXMgYXJlIHZhbGlkXHJcbiAgICAgICAgICBpZiAoX29ialtrZXldLl9fcmpzZl9hZGRpdGlvbmFsUHJvcGVydGllcyAmJiBfb2JqW2tleV0uJG5hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgYWNjLnB1c2goX29ialtrZXldLiRuYW1lKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdldEFsbFBhdGhzKF9vYmpba2V5XSwgYWNjLCBuZXdQYXRocyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwiJG5hbWVcIiAmJiBfb2JqW2tleV0gIT09IFwiXCIpIHtcclxuICAgICAgICAgIHBhdGhzLmZvckVhY2gocGF0aCA9PiB7XHJcbiAgICAgICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC4vLCBcIlwiKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gX2dldChmb3JtRGF0YSwgcGF0aCk7XHJcbiAgICAgICAgICAgIC8vIGFkZHMgcGF0aCB0byBmaWVsZE5hbWVzIGlmIGl0IHBvaW50cyB0byBhIHZhbHVlXHJcbiAgICAgICAgICAgIC8vIG9yIGFuIGVtcHR5IG9iamVjdC9hcnJheVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1WYWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBfaXNFbXB0eShmb3JtVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgYWNjLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBnZXRBbGxQYXRocyhwYXRoU2NoZW1hKTtcclxuICB9O1xyXG5cclxuICBvbkNoYW5nZSA9IChmb3JtRGF0YSwgbmV3RXJyb3JTY2hlbWEpID0+IHtcclxuICAgIGlmIChpc09iamVjdChmb3JtRGF0YSkgfHwgQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcclxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKHRoaXMucHJvcHMsIGZvcm1EYXRhKTtcclxuICAgICAgZm9ybURhdGEgPSBuZXdTdGF0ZS5mb3JtRGF0YTtcclxuICAgIH1cclxuICAgIGNvbnN0IG11c3RWYWxpZGF0ZSA9ICF0aGlzLnByb3BzLm5vVmFsaWRhdGUgJiYgdGhpcy5wcm9wcy5saXZlVmFsaWRhdGU7XHJcbiAgICBsZXQgc3RhdGUgPSB7IGZvcm1EYXRhIH07XHJcbiAgICBsZXQgbmV3Rm9ybURhdGEgPSBmb3JtRGF0YTtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbWl0RXh0cmFEYXRhID09PSB0cnVlICYmIHRoaXMucHJvcHMubGl2ZU9taXQgPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgcmV0cmlldmVkU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGFcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcGF0aFNjaGVtYSA9IHRvUGF0aFNjaGVtYShcclxuICAgICAgICByZXRyaWV2ZWRTY2hlbWEsXHJcbiAgICAgICAgXCJcIixcclxuICAgICAgICB0aGlzLnN0YXRlLnNjaGVtYSxcclxuICAgICAgICBmb3JtRGF0YVxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29uc3QgZmllbGROYW1lcyA9IHRoaXMuZ2V0RmllbGROYW1lcyhwYXRoU2NoZW1hLCBmb3JtRGF0YSk7XHJcblxyXG4gICAgICBuZXdGb3JtRGF0YSA9IHRoaXMuZ2V0VXNlZEZvcm1EYXRhKGZvcm1EYXRhLCBmaWVsZE5hbWVzKTtcclxuICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtdXN0VmFsaWRhdGUpIHtcclxuICAgICAgbGV0IHNjaGVtYVZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKG5ld0Zvcm1EYXRhKTtcclxuICAgICAgbGV0IGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xyXG4gICAgICBsZXQgZXJyb3JTY2hlbWEgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9yU2NoZW1hO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYTtcclxuICAgICAgaWYgKHRoaXMucHJvcHMuZXh0cmFFcnJvcnMpIHtcclxuICAgICAgICBlcnJvclNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcclxuICAgICAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgdGhpcy5wcm9wcy5leHRyYUVycm9ycyxcclxuICAgICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIGVycm9ycyA9IHRvRXJyb3JMaXN0KGVycm9yU2NoZW1hKTtcclxuICAgICAgfVxyXG4gICAgICBzdGF0ZSA9IHtcclxuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JzLFxyXG4gICAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXHJcbiAgICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5ub1ZhbGlkYXRlICYmIG5ld0Vycm9yU2NoZW1hKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yU2NoZW1hID0gdGhpcy5wcm9wcy5leHRyYUVycm9yc1xyXG4gICAgICAgID8gbWVyZ2VPYmplY3RzKFxyXG4gICAgICAgICAgICBuZXdFcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5leHRyYUVycm9ycyxcclxuICAgICAgICAgICAgISFcImNvbmNhdCBhcnJheXNcIlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbmV3RXJyb3JTY2hlbWE7XHJcbiAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGZvcm1EYXRhOiBuZXdGb3JtRGF0YSxcclxuICAgICAgICBlcnJvclNjaGVtYTogZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgZXJyb3JzOiB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICBzdGF0ZSxcclxuICAgICAgKCkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc3RhdGUpXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIG9uQmx1ciA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcclxuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Gb2N1cyA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25Gb2N1cyguLi5hcmdzKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvblN1Ym1pdCA9IGV2ZW50ID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC5wZXJzaXN0KCk7XHJcbiAgICBsZXQgbmV3Rm9ybURhdGEgPSB0aGlzLnN0YXRlLmZvcm1EYXRhO1xyXG5cclxuICAgIGlmICh0aGlzLnByb3BzLm9taXRFeHRyYURhdGEgPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgcmV0cmlldmVkU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgbmV3Rm9ybURhdGFcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcGF0aFNjaGVtYSA9IHRvUGF0aFNjaGVtYShcclxuICAgICAgICByZXRyaWV2ZWRTY2hlbWEsXHJcbiAgICAgICAgXCJcIixcclxuICAgICAgICB0aGlzLnN0YXRlLnNjaGVtYSxcclxuICAgICAgICBuZXdGb3JtRGF0YVxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29uc3QgZmllbGROYW1lcyA9IHRoaXMuZ2V0RmllbGROYW1lcyhwYXRoU2NoZW1hLCBuZXdGb3JtRGF0YSk7XHJcblxyXG4gICAgICBuZXdGb3JtRGF0YSA9IHRoaXMuZ2V0VXNlZEZvcm1EYXRhKG5ld0Zvcm1EYXRhLCBmaWVsZE5hbWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMucHJvcHMubm9WYWxpZGF0ZSkge1xyXG4gICAgICBsZXQgc2NoZW1hVmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUobmV3Rm9ybURhdGEpO1xyXG4gICAgICBsZXQgZXJyb3JzID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvcnM7XHJcbiAgICAgIGxldCBlcnJvclNjaGVtYSA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JTY2hlbWE7XHJcbiAgICAgIGNvbnN0IHNjaGVtYVZhbGlkYXRpb25FcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgIGNvbnN0IHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hO1xyXG4gICAgICBpZiAoT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZXh0cmFFcnJvcnMpIHtcclxuICAgICAgICAgIGVycm9yU2NoZW1hID0gbWVyZ2VPYmplY3RzKFxyXG4gICAgICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5leHRyYUVycm9ycyxcclxuICAgICAgICAgICAgISFcImNvbmNhdCBhcnJheXNcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGVycm9ycyA9IHRvRXJyb3JMaXN0KGVycm9yU2NoZW1hKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZXJyb3JzLFxyXG4gICAgICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyxcclxuICAgICAgICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25FcnJvcikge1xyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMub25FcnJvcihlcnJvcnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGb3JtIHZhbGlkYXRpb24gZmFpbGVkXCIsIGVycm9ycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZXJlIGFyZSBubyBlcnJvcnMgZ2VuZXJhdGVkIHRocm91Z2ggc2NoZW1hIHZhbGlkYXRpb24uXHJcbiAgICAvLyBDaGVjayBmb3IgdXNlciBwcm92aWRlZCBlcnJvcnMgYW5kIHVwZGF0ZSBzdGF0ZSBhY2NvcmRpbmdseS5cclxuICAgIGxldCBlcnJvclNjaGVtYTtcclxuICAgIGxldCBlcnJvcnM7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5leHRyYUVycm9ycykge1xyXG4gICAgICBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXh0cmFFcnJvcnM7XHJcbiAgICAgIGVycm9ycyA9IHRvRXJyb3JMaXN0KGVycm9yU2NoZW1hKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVycm9yU2NoZW1hID0ge307XHJcbiAgICAgIGVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgIHtcclxuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JzOiBlcnJvcnMsXHJcbiAgICAgICAgZXJyb3JTY2hlbWE6IGVycm9yU2NoZW1hLFxyXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnM6IFtdLFxyXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYToge30sXHJcbiAgICAgIH0sXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Ym1pdCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdChcclxuICAgICAgICAgICAgeyAuLi50aGlzLnN0YXRlLCBmb3JtRGF0YTogbmV3Rm9ybURhdGEsIHN0YXR1czogXCJzdWJtaXR0ZWRcIiB9LFxyXG4gICAgICAgICAgICBldmVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0UmVnaXN0cnkoKSB7XHJcbiAgICAvLyBGb3IgQkMsIGFjY2VwdCBwYXNzZWQgU2NoZW1hRmllbGQgYW5kIFRpdGxlRmllbGQgcHJvcHMgYW5kIHBhc3MgdGhlbSB0b1xyXG4gICAgLy8gdGhlIFwiZmllbGRzXCIgcmVnaXN0cnkgb25lLlxyXG4gICAgY29uc3QgeyBmaWVsZHMsIHdpZGdldHMgfSA9IGdldERlZmF1bHRSZWdpc3RyeSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZmllbGRzOiB7IC4uLmZpZWxkcywgLi4udGhpcy5wcm9wcy5maWVsZHMgfSxcclxuICAgICAgd2lkZ2V0czogeyAuLi53aWRnZXRzLCAuLi50aGlzLnByb3BzLndpZGdldHMgfSxcclxuICAgICAgQXJyYXlGaWVsZFRlbXBsYXRlOiB0aGlzLnByb3BzLkFycmF5RmllbGRUZW1wbGF0ZSxcclxuICAgICAgT2JqZWN0RmllbGRUZW1wbGF0ZTogdGhpcy5wcm9wcy5PYmplY3RGaWVsZFRlbXBsYXRlLFxyXG4gICAgICBGaWVsZFRlbXBsYXRlOiB0aGlzLnByb3BzLkZpZWxkVGVtcGxhdGUsXHJcbiAgICAgIGRlZmluaXRpb25zOiB0aGlzLnByb3BzLnNjaGVtYS5kZWZpbml0aW9ucyB8fCB7fSxcclxuICAgICAgcm9vdFNjaGVtYTogdGhpcy5wcm9wcy5zY2hlbWEsXHJcbiAgICAgIGZvcm1Db250ZXh0OiB0aGlzLnByb3BzLmZvcm1Db250ZXh0IHx8IHt9LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN1Ym1pdCgpIHtcclxuICAgIGlmICh0aGlzLmZvcm1FbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnQuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJzdWJtaXRcIiwge1xyXG4gICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjaGlsZHJlbixcclxuICAgICAgaWQsXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBpZFNlcGFyYXRvcixcclxuICAgICAgY2xhc3NOYW1lLFxyXG4gICAgICB0YWdOYW1lLFxyXG4gICAgICBuYW1lLFxyXG4gICAgICBtZXRob2QsXHJcbiAgICAgIHRhcmdldCxcclxuICAgICAgYWN0aW9uLFxyXG4gICAgICBhdXRvY29tcGxldGU6IGRlcHJlY2F0ZWRBdXRvY29tcGxldGUsXHJcbiAgICAgIGF1dG9Db21wbGV0ZTogY3VycmVudEF1dG9Db21wbGV0ZSxcclxuICAgICAgZW5jdHlwZSxcclxuICAgICAgYWNjZXB0Y2hhcnNldCxcclxuICAgICAgbm9IdG1sNVZhbGlkYXRlLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIGZvcm1Db250ZXh0LFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgeyBzY2hlbWEsIHVpU2NoZW1hLCBmb3JtRGF0YSwgZXJyb3JTY2hlbWEsIGlkU2NoZW1hIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgcmVnaXN0cnkgPSB0aGlzLmdldFJlZ2lzdHJ5KCk7XHJcbiAgICBjb25zdCBfU2NoZW1hRmllbGQgPSByZWdpc3RyeS5maWVsZHMuU2NoZW1hRmllbGQ7XHJcbiAgICBjb25zdCBGb3JtVGFnID0gdGFnTmFtZSA/IHRhZ05hbWUgOiBcImZvcm1cIjtcclxuICAgIGlmIChkZXByZWNhdGVkQXV0b2NvbXBsZXRlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICBcIlVzaW5nIGF1dG9jb21wbGV0ZSBwcm9wZXJ0eSBvZiBGb3JtIGlzIGRlcHJlY2F0ZWQsIHVzZSBhdXRvQ29tcGxldGUgaW5zdGVhZC5cIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXV0b0NvbXBsZXRlID0gY3VycmVudEF1dG9Db21wbGV0ZVxyXG4gICAgICA/IGN1cnJlbnRBdXRvQ29tcGxldGVcclxuICAgICAgOiBkZXByZWNhdGVkQXV0b2NvbXBsZXRlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxGb3JtVGFnXHJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgPyBjbGFzc05hbWUgOiBcInJqc2ZcIn1cclxuICAgICAgICBpZD17aWR9XHJcbiAgICAgICAgbmFtZT17bmFtZX1cclxuICAgICAgICBtZXRob2Q9e21ldGhvZH1cclxuICAgICAgICB0YXJnZXQ9e3RhcmdldH1cclxuICAgICAgICBhY3Rpb249e2FjdGlvbn1cclxuICAgICAgICBhdXRvQ29tcGxldGU9e2F1dG9Db21wbGV0ZX1cclxuICAgICAgICBlbmNUeXBlPXtlbmN0eXBlfVxyXG4gICAgICAgIGFjY2VwdENoYXJzZXQ9e2FjY2VwdGNoYXJzZXR9XHJcbiAgICAgICAgbm9WYWxpZGF0ZT17bm9IdG1sNVZhbGlkYXRlfVxyXG4gICAgICAgIG9uU3VibWl0PXt0aGlzLm9uU3VibWl0fVxyXG4gICAgICAgIHJlZj17Zm9ybSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybTtcclxuICAgICAgICB9fT5cclxuICAgICAgICB7dGhpcy5yZW5kZXJFcnJvcnMoKX1cclxuICAgICAgICA8X1NjaGVtYUZpZWxkXHJcbiAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgIHVpU2NoZW1hPXt1aVNjaGVtYX1cclxuICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgIGlkUHJlZml4PXtpZFByZWZpeH1cclxuICAgICAgICAgIGlkU2VwYXJhdG9yPXtpZFNlcGFyYXRvcn1cclxuICAgICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgICAgIGZvcm1EYXRhPXtmb3JtRGF0YX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgb25CbHVyPXt0aGlzLm9uQmx1cn1cclxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25Gb2N1c31cclxuICAgICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cclxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIHtjaGlsZHJlbiA/IChcclxuICAgICAgICAgIGNoaWxkcmVuXHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4taW5mb1wiPlxyXG4gICAgICAgICAgICAgIFN1Ym1pdFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvRm9ybVRhZz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgRm9ybS5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHVpU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgZm9ybURhdGE6IFByb3BUeXBlcy5hbnksXHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB3aWRnZXRzOiBQcm9wVHlwZXMub2JqZWN0T2YoXHJcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMub2JqZWN0XSlcclxuICAgICksXHJcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuZWxlbWVudFR5cGUpLFxyXG4gICAgQXJyYXlGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBPYmplY3RGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBFcnJvckxpc3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBzaG93RXJyb3JMaXN0OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uU3VibWl0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGFnTmFtZTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG1ldGhvZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHRhcmdldDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGFjdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGF1dG9jb21wbGV0ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGF1dG9Db21wbGV0ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGVuY3R5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBhY2NlcHRjaGFyc2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbm9WYWxpZGF0ZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBub0h0bWw1VmFsaWRhdGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbGl2ZVZhbGlkYXRlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHZhbGlkYXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHRyYW5zZm9ybUVycm9yczogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBmb3JtQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGN1c3RvbUZvcm1hdHM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxyXG4gICAgb21pdEV4dHJhRGF0YTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBleHRyYUVycm9yczogUHJvcFR5cGVzLm9iamVjdCxcclxuICB9O1xyXG59XHJcbiJdfQ==