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

import React, { Component } from "react";
import PropTypes from "prop-types";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { default as DefaultErrorList } from "./ErrorList";
import { getDefaultFormState, retrieveSchema, shouldRender, toIdSchema, getDefaultRegistry, deepEquals, toPathSchema, isObject } from "../utils";
import validateFormData, { toErrorList } from "../validate";
import { mergeObjects } from "../utils";

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
          _this.props.onSubmit(_objectSpread({}, _this.state, {
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

      var idSchema = toIdSchema(retrievedSchema, uiSchema["ui:rootFieldId"], rootSchema, formData, props.idPrefix);
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
        return React.createElement(ErrorList, {
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
      return React.createElement(FormTag, {
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
      }, this.renderErrors(), React.createElement(_SchemaField, {
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
      }), children ? children : React.createElement("div", null, React.createElement("button", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Zvcm0uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJfcGljayIsIl9nZXQiLCJfaXNFbXB0eSIsImRlZmF1bHQiLCJEZWZhdWx0RXJyb3JMaXN0IiwiZ2V0RGVmYXVsdEZvcm1TdGF0ZSIsInJldHJpZXZlU2NoZW1hIiwic2hvdWxkUmVuZGVyIiwidG9JZFNjaGVtYSIsImdldERlZmF1bHRSZWdpc3RyeSIsImRlZXBFcXVhbHMiLCJ0b1BhdGhTY2hlbWEiLCJpc09iamVjdCIsInZhbGlkYXRlRm9ybURhdGEiLCJ0b0Vycm9yTGlzdCIsIm1lcmdlT2JqZWN0cyIsIkZvcm0iLCJwcm9wcyIsImZvcm1EYXRhIiwiZmllbGRzIiwibGVuZ3RoIiwiZGF0YSIsIkFycmF5IiwiaXNBcnJheSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJwYXRoU2NoZW1hIiwiZ2V0QWxsUGF0aHMiLCJfb2JqIiwiYWNjIiwicGF0aHMiLCJmb3JFYWNoIiwibmV3UGF0aHMiLCJwYXRoIiwiX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiJG5hbWUiLCJwdXNoIiwicmVwbGFjZSIsImZvcm1WYWx1ZSIsIm5ld0Vycm9yU2NoZW1hIiwibmV3U3RhdGUiLCJnZXRTdGF0ZUZyb21Qcm9wcyIsIm11c3RWYWxpZGF0ZSIsIm5vVmFsaWRhdGUiLCJsaXZlVmFsaWRhdGUiLCJzdGF0ZSIsIm5ld0Zvcm1EYXRhIiwib21pdEV4dHJhRGF0YSIsImxpdmVPbWl0IiwicmV0cmlldmVkU2NoZW1hIiwic2NoZW1hIiwiZmllbGROYW1lcyIsImdldEZpZWxkTmFtZXMiLCJnZXRVc2VkRm9ybURhdGEiLCJzY2hlbWFWYWxpZGF0aW9uIiwidmFsaWRhdGUiLCJlcnJvcnMiLCJlcnJvclNjaGVtYSIsInNjaGVtYVZhbGlkYXRpb25FcnJvcnMiLCJzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEiLCJleHRyYUVycm9ycyIsInNldFN0YXRlIiwib25DaGFuZ2UiLCJvbkJsdXIiLCJvbkZvY3VzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJwZXJzaXN0Iiwib25FcnJvciIsImNvbnNvbGUiLCJlcnJvciIsIm9uU3VibWl0Iiwic3RhdHVzIiwiZm9ybUVsZW1lbnQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJpbnB1dEZvcm1EYXRhIiwidWlTY2hlbWEiLCJlZGl0Iiwicm9vdFNjaGVtYSIsImN1c3RvbUZvcm1hdHMiLCJsb2NhbGl6ZUVycm9ycyIsImFkZGl0aW9uYWxNZXRhU2NoZW1hcyIsImdldEN1cnJlbnRFcnJvcnMiLCJjdXJyZW50RXJyb3JzIiwiaWRTY2hlbWEiLCJpZFByZWZpeCIsInRyYW5zZm9ybUVycm9ycyIsImdldFJlZ2lzdHJ5IiwicmVzb2x2ZWRTY2hlbWEiLCJFcnJvckxpc3QiLCJzaG93RXJyb3JMaXN0IiwiZm9ybUNvbnRleHQiLCJ3aWRnZXRzIiwiQXJyYXlGaWVsZFRlbXBsYXRlIiwiT2JqZWN0RmllbGRUZW1wbGF0ZSIsIkZpZWxkVGVtcGxhdGUiLCJkZWZpbml0aW9ucyIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImNhbmNlbGFibGUiLCJjaGlsZHJlbiIsImlkIiwiY2xhc3NOYW1lIiwidGFnTmFtZSIsIm5hbWUiLCJtZXRob2QiLCJhY3Rpb24iLCJkZXByZWNhdGVkQXV0b2NvbXBsZXRlIiwiYXV0b2NvbXBsZXRlIiwiY3VycmVudEF1dG9Db21wbGV0ZSIsImF1dG9Db21wbGV0ZSIsImVuY3R5cGUiLCJhY2NlcHRjaGFyc2V0Iiwibm9IdG1sNVZhbGlkYXRlIiwiZGlzYWJsZWQiLCJyZWFkb25seSIsInJlZ2lzdHJ5IiwiX1NjaGVtYUZpZWxkIiwiU2NoZW1hRmllbGQiLCJGb3JtVGFnIiwid2FybiIsImZvcm0iLCJyZW5kZXJFcnJvcnMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiYW55IiwiYm9vbCIsIm9iamVjdE9mIiwib25lT2ZUeXBlIiwiZnVuYyIsImVsZW1lbnRUeXBlIiwic3RyaW5nIiwiYXJyYXlPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLFlBQWpCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixnQkFBckI7QUFFQSxTQUFTQyxPQUFPLElBQUlDLGdCQUFwQixRQUE0QyxhQUE1QztBQUNBLFNBQ0VDLG1CQURGLEVBRUVDLGNBRkYsRUFHRUMsWUFIRixFQUlFQyxVQUpGLEVBS0VDLGtCQUxGLEVBTUVDLFVBTkYsRUFPRUMsWUFQRixFQVFFQyxRQVJGLFFBU08sVUFUUDtBQVVBLE9BQU9DLGdCQUFQLElBQTJCQyxXQUEzQixRQUE4QyxhQUE5QztBQUNBLFNBQVNDLFlBQVQsUUFBNkIsVUFBN0I7O0lBRXFCQyxJOzs7OztBQWFuQixnQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw4RUFBTUEsS0FBTjs7QUFEaUIsc0VBd0pELFVBQUNDLFFBQUQsRUFBV0MsTUFBWCxFQUFzQjtBQUN0QztBQUNBLFVBQUlBLE1BQU0sQ0FBQ0MsTUFBUCxLQUFrQixDQUFsQixJQUF1QixRQUFPRixRQUFQLE1BQW9CLFFBQS9DLEVBQXlEO0FBQ3ZELGVBQU9BLFFBQVA7QUFDRDs7QUFFRCxVQUFJRyxJQUFJLEdBQUdyQixLQUFLLENBQUNrQixRQUFELEVBQVdDLE1BQVgsQ0FBaEI7O0FBQ0EsVUFBSUcsS0FBSyxDQUFDQyxPQUFOLENBQWNMLFFBQWQsQ0FBSixFQUE2QjtBQUMzQixlQUFPTSxNQUFNLENBQUNDLElBQVAsQ0FBWUosSUFBWixFQUFrQkssR0FBbEIsQ0FBc0IsVUFBQUMsR0FBRztBQUFBLGlCQUFJTixJ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QUFlLEVBQUU1RixTQUFTLENBQUMySSxJQWpDWjtBQWtDZjFDLElBQUFBLFdBQVcsRUFBRWpHLFNBQVMsQ0FBQ3FJLE1BbENSO0FBbUNmaEQsSUFBQUEsYUFBYSxFQUFFckYsU0FBUyxDQUFDcUksTUFuQ1Y7QUFvQ2Y5QyxJQUFBQSxxQkFBcUIsRUFBRXZGLFNBQVMsQ0FBQzhJLE9BQVYsQ0FBa0I5SSxTQUFTLENBQUNxSSxNQUE1QixDQXBDUjtBQXFDZm5GLElBQUFBLGFBQWEsRUFBRWxELFNBQVMsQ0FBQ3dJLElBckNWO0FBc0NmekUsSUFBQUEsV0FBVyxFQUFFL0QsU0FBUyxDQUFDcUk7QUF0Q1IsR0FBakI7QUF3Q0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IF9waWNrIGZyb20gXCJsb2Rhc2gvcGlja1wiO1xyXG5pbXBvcnQgX2dldCBmcm9tIFwibG9kYXNoL2dldFwiO1xyXG5pbXBvcnQgX2lzRW1wdHkgZnJvbSBcImxvZGFzaC9pc0VtcHR5XCI7XHJcblxyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIERlZmF1bHRFcnJvckxpc3QgfSBmcm9tIFwiLi9FcnJvckxpc3RcIjtcclxuaW1wb3J0IHtcclxuICBnZXREZWZhdWx0Rm9ybVN0YXRlLFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIHNob3VsZFJlbmRlcixcclxuICB0b0lkU2NoZW1hLFxyXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcclxuICBkZWVwRXF1YWxzLFxyXG4gIHRvUGF0aFNjaGVtYSxcclxuICBpc09iamVjdCxcclxufSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHZhbGlkYXRlRm9ybURhdGEsIHsgdG9FcnJvckxpc3QgfSBmcm9tIFwiLi4vdmFsaWRhdGVcIjtcclxuaW1wb3J0IHsgbWVyZ2VPYmplY3RzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdWlTY2hlbWE6IHt9LFxyXG4gICAgbm9WYWxpZGF0ZTogZmFsc2UsXHJcbiAgICBsaXZlVmFsaWRhdGU6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gICAgbm9IdG1sNVZhbGlkYXRlOiBmYWxzZSxcclxuICAgIEVycm9yTGlzdDogRGVmYXVsdEVycm9yTGlzdCxcclxuICAgIG9taXRFeHRyYURhdGE6IGZhbHNlLFxyXG4gICAgbG9jYWxpemVFcnJvcnM6IG51bGwsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKHByb3BzLCBwcm9wcy5mb3JtRGF0YSk7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UgJiZcclxuICAgICAgIWRlZXBFcXVhbHModGhpcy5zdGF0ZS5mb3JtRGF0YSwgdGhpcy5wcm9wcy5mb3JtRGF0YSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtRWxlbWVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBuZXh0UHJvcHMuZm9ybURhdGEpO1xyXG4gICAgaWYgKFxyXG4gICAgICAhZGVlcEVxdWFscyhuZXh0U3RhdGUuZm9ybURhdGEsIG5leHRQcm9wcy5mb3JtRGF0YSkgJiZcclxuICAgICAgIWRlZXBFcXVhbHMobmV4dFN0YXRlLmZvcm1EYXRhLCB0aGlzLnN0YXRlLmZvcm1EYXRhKSAmJlxyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXh0U3RhdGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGVGcm9tUHJvcHMocHJvcHMsIGlucHV0Rm9ybURhdGEpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZSB8fCB7fTtcclxuICAgIGNvbnN0IHNjaGVtYSA9IFwic2NoZW1hXCIgaW4gcHJvcHMgPyBwcm9wcy5zY2hlbWEgOiB0aGlzLnByb3BzLnNjaGVtYTtcclxuICAgIGNvbnN0IHVpU2NoZW1hID0gXCJ1aVNjaGVtYVwiIGluIHByb3BzID8gcHJvcHMudWlTY2hlbWEgOiB0aGlzLnByb3BzLnVpU2NoZW1hO1xyXG4gICAgY29uc3QgZWRpdCA9IHR5cGVvZiBpbnB1dEZvcm1EYXRhICE9PSBcInVuZGVmaW5lZFwiO1xyXG4gICAgY29uc3QgbGl2ZVZhbGlkYXRlID1cclxuICAgICAgXCJsaXZlVmFsaWRhdGVcIiBpbiBwcm9wcyA/IHByb3BzLmxpdmVWYWxpZGF0ZSA6IHRoaXMucHJvcHMubGl2ZVZhbGlkYXRlO1xyXG4gICAgY29uc3QgbXVzdFZhbGlkYXRlID0gZWRpdCAmJiAhcHJvcHMubm9WYWxpZGF0ZSAmJiBsaXZlVmFsaWRhdGU7XHJcbiAgICBjb25zdCByb290U2NoZW1hID0gc2NoZW1hO1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBnZXREZWZhdWx0Rm9ybVN0YXRlKHNjaGVtYSwgaW5wdXRGb3JtRGF0YSwgcm9vdFNjaGVtYSk7XHJcbiAgICBjb25zdCByZXRyaWV2ZWRTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIGNvbnN0IGN1c3RvbUZvcm1hdHMgPSBwcm9wcy5jdXN0b21Gb3JtYXRzO1xyXG4gICAgY29uc3QgbG9jYWxpemVFcnJvcnMgPSBwcm9wcy5sb2NhbGl6ZUVycm9ycztcclxuICAgIGNvbnN0IGFkZGl0aW9uYWxNZXRhU2NoZW1hcyA9IHByb3BzLmFkZGl0aW9uYWxNZXRhU2NoZW1hcztcclxuXHJcbiAgICBjb25zdCBnZXRDdXJyZW50RXJyb3JzID0gKCkgPT4ge1xyXG4gICAgICBpZiAocHJvcHMubm9WYWxpZGF0ZSkge1xyXG4gICAgICAgIHJldHVybiB7IGVycm9yczogW10sIGVycm9yU2NoZW1hOiB7fSB9O1xyXG4gICAgICB9IGVsc2UgaWYgKCFwcm9wcy5saXZlVmFsaWRhdGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZXJyb3JzOiBzdGF0ZS5zY2hlbWFWYWxpZGF0aW9uRXJyb3JzIHx8IFtdLFxyXG4gICAgICAgICAgZXJyb3JTY2hlbWE6IHN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSB8fCB7fSxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZXJyb3JzOiBzdGF0ZS5lcnJvcnMgfHwgW10sXHJcbiAgICAgICAgZXJyb3JTY2hlbWE6IHN0YXRlLmVycm9yU2NoZW1hIHx8IHt9LFxyXG4gICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZXJyb3JzLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyxcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xyXG4gICAgaWYgKG11c3RWYWxpZGF0ZSkge1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShcclxuICAgICAgICBmb3JtRGF0YSxcclxuICAgICAgICBzY2hlbWEsXHJcbiAgICAgICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzLFxyXG4gICAgICAgIGN1c3RvbUZvcm1hdHMsXHJcbiAgICAgICAgbG9jYWxpemVFcnJvcnNcclxuICAgICAgKTtcclxuICAgICAgZXJyb3JzID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvcnM7XHJcbiAgICAgIGVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvclNjaGVtYTtcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IGVycm9ycztcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gZXJyb3JTY2hlbWE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjdXJyZW50RXJyb3JzID0gZ2V0Q3VycmVudEVycm9ycygpO1xyXG4gICAgICBlcnJvcnMgPSBjdXJyZW50RXJyb3JzLmVycm9ycztcclxuICAgICAgZXJyb3JTY2hlbWEgPSBjdXJyZW50RXJyb3JzLmVycm9yU2NoZW1hO1xyXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycztcclxuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xyXG4gICAgfVxyXG4gICAgaWYgKHByb3BzLmV4dHJhRXJyb3JzKSB7XHJcbiAgICAgIGVycm9yU2NoZW1hID0gbWVyZ2VPYmplY3RzKFxyXG4gICAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICAgIHByb3BzLmV4dHJhRXJyb3JzLFxyXG4gICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgKTtcclxuICAgICAgZXJyb3JzID0gdG9FcnJvckxpc3QoZXJyb3JTY2hlbWEpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaWRTY2hlbWEgPSB0b0lkU2NoZW1hKFxyXG4gICAgICByZXRyaWV2ZWRTY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hW1widWk6cm9vdEZpZWxkSWRcIl0sXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBwcm9wcy5pZFByZWZpeFxyXG4gICAgKTtcclxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBlZGl0LFxyXG4gICAgICBlcnJvcnMsXHJcbiAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMsXHJcbiAgICB9O1xyXG4gICAgaWYgKHNjaGVtYVZhbGlkYXRpb25FcnJvcnMpIHtcclxuICAgICAgbmV4dFN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvcnMgPSBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzO1xyXG4gICAgICBuZXh0U3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgcmV0dXJuIHNob3VsZFJlbmRlcih0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgc2NoZW1hID0gdGhpcy5wcm9wcy5zY2hlbWEsXHJcbiAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMgPSB0aGlzLnByb3BzLmFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcclxuICAgIGN1c3RvbUZvcm1hdHMgPSB0aGlzLnByb3BzLmN1c3RvbUZvcm1hdHMsXHJcbiAgICBsb2NhbGl6ZUVycm9ycyA9IHRoaXMucHJvcHMubG9jYWxpemVFcnJvcnNcclxuICApIHtcclxuICAgIGNvbnN0IHsgdmFsaWRhdGUsIHRyYW5zZm9ybUVycm9ycyB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgcm9vdFNjaGVtYSB9ID0gdGhpcy5nZXRSZWdpc3RyeSgpO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIHJldHVybiB2YWxpZGF0ZUZvcm1EYXRhKFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgIHZhbGlkYXRlLFxyXG4gICAgICB0cmFuc2Zvcm1FcnJvcnMsXHJcbiAgICAgIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcclxuICAgICAgY3VzdG9tRm9ybWF0cyxcclxuICAgICAgbG9jYWxpemVFcnJvcnNcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJFcnJvcnMoKSB7XHJcbiAgICBjb25zdCB7IGVycm9ycywgZXJyb3JTY2hlbWEsIHNjaGVtYSwgdWlTY2hlbWEgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCB7IEVycm9yTGlzdCwgc2hvd0Vycm9yTGlzdCwgZm9ybUNvbnRleHQgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaWYgKGVycm9ycy5sZW5ndGggJiYgc2hvd0Vycm9yTGlzdCAhPSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxFcnJvckxpc3RcclxuICAgICAgICAgIGVycm9ycz17ZXJyb3JzfVxyXG4gICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hfVxyXG4gICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgICAgICBmb3JtQ29udGV4dD17Zm9ybUNvbnRleHR9XHJcbiAgICAgICAgLz5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlZEZvcm1EYXRhID0gKGZvcm1EYXRhLCBmaWVsZHMpID0+IHtcclxuICAgIC8vZm9yIHRoZSBjYXNlIG9mIGEgc2luZ2xlIGlucHV0IGZvcm1cclxuICAgIGlmIChmaWVsZHMubGVuZ3RoID09PSAwICYmIHR5cGVvZiBmb3JtRGF0YSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICByZXR1cm4gZm9ybURhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhdGEgPSBfcGljayhmb3JtRGF0YSwgZmllbGRzKTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGZvcm1EYXRhKSkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkubWFwKGtleSA9PiBkYXRhW2tleV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH07XHJcblxyXG4gIGdldEZpZWxkTmFtZXMgPSAocGF0aFNjaGVtYSwgZm9ybURhdGEpID0+IHtcclxuICAgIGNvbnN0IGdldEFsbFBhdGhzID0gKF9vYmosIGFjYyA9IFtdLCBwYXRocyA9IFtcIlwiXSkgPT4ge1xyXG4gICAgICBPYmplY3Qua2V5cyhfb2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBfb2JqW2tleV0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgIGxldCBuZXdQYXRocyA9IHBhdGhzLm1hcChwYXRoID0+IGAke3BhdGh9LiR7a2V5fWApO1xyXG4gICAgICAgICAgLy8gSWYgYW4gb2JqZWN0IGlzIG1hcmtlZCB3aXRoIGFkZGl0aW9uYWxQcm9wZXJ0aWVzLCBhbGwgaXRzIGtleXMgYXJlIHZhbGlkXHJcbiAgICAgICAgICBpZiAoX29ialtrZXldLl9fcmpzZl9hZGRpdGlvbmFsUHJvcGVydGllcyAmJiBfb2JqW2tleV0uJG5hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgYWNjLnB1c2goX29ialtrZXldLiRuYW1lKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdldEFsbFBhdGhzKF9vYmpba2V5XSwgYWNjLCBuZXdQYXRocyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwiJG5hbWVcIiAmJiBfb2JqW2tleV0gIT09IFwiXCIpIHtcclxuICAgICAgICAgIHBhdGhzLmZvckVhY2gocGF0aCA9PiB7XHJcbiAgICAgICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC4vLCBcIlwiKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gX2dldChmb3JtRGF0YSwgcGF0aCk7XHJcbiAgICAgICAgICAgIC8vIGFkZHMgcGF0aCB0byBmaWVsZE5hbWVzIGlmIGl0IHBvaW50cyB0byBhIHZhbHVlXHJcbiAgICAgICAgICAgIC8vIG9yIGFuIGVtcHR5IG9iamVjdC9hcnJheVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1WYWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBfaXNFbXB0eShmb3JtVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgYWNjLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBnZXRBbGxQYXRocyhwYXRoU2NoZW1hKTtcclxuICB9O1xyXG5cclxuICBvbkNoYW5nZSA9IChmb3JtRGF0YSwgbmV3RXJyb3JTY2hlbWEpID0+IHtcclxuICAgIGlmIChpc09iamVjdChmb3JtRGF0YSkgfHwgQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcclxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKHRoaXMucHJvcHMsIGZvcm1EYXRhKTtcclxuICAgICAgZm9ybURhdGEgPSBuZXdTdGF0ZS5mb3JtRGF0YTtcclxuICAgIH1cclxuICAgIGNvbnN0IG11c3RWYWxpZGF0ZSA9ICF0aGlzLnByb3BzLm5vVmFsaWRhdGUgJiYgdGhpcy5wcm9wcy5saXZlVmFsaWRhdGU7XHJcbiAgICBsZXQgc3RhdGUgPSB7IGZvcm1EYXRhIH07XHJcbiAgICBsZXQgbmV3Rm9ybURhdGEgPSBmb3JtRGF0YTtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbWl0RXh0cmFEYXRhID09PSB0cnVlICYmIHRoaXMucHJvcHMubGl2ZU9taXQgPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgcmV0cmlldmVkU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGFcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcGF0aFNjaGVtYSA9IHRvUGF0aFNjaGVtYShcclxuICAgICAgICByZXRyaWV2ZWRTY2hlbWEsXHJcbiAgICAgICAgXCJcIixcclxuICAgICAgICB0aGlzLnN0YXRlLnNjaGVtYSxcclxuICAgICAgICBmb3JtRGF0YVxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29uc3QgZmllbGROYW1lcyA9IHRoaXMuZ2V0RmllbGROYW1lcyhwYXRoU2NoZW1hLCBmb3JtRGF0YSk7XHJcblxyXG4gICAgICBuZXdGb3JtRGF0YSA9IHRoaXMuZ2V0VXNlZEZvcm1EYXRhKGZvcm1EYXRhLCBmaWVsZE5hbWVzKTtcclxuICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtdXN0VmFsaWRhdGUpIHtcclxuICAgICAgbGV0IHNjaGVtYVZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKG5ld0Zvcm1EYXRhKTtcclxuICAgICAgbGV0IGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xyXG4gICAgICBsZXQgZXJyb3JTY2hlbWEgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9yU2NoZW1hO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gZXJyb3JzO1xyXG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYTtcclxuICAgICAgaWYgKHRoaXMucHJvcHMuZXh0cmFFcnJvcnMpIHtcclxuICAgICAgICBlcnJvclNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcclxuICAgICAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgdGhpcy5wcm9wcy5leHRyYUVycm9ycyxcclxuICAgICAgICAgICEhXCJjb25jYXQgYXJyYXlzXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIGVycm9ycyA9IHRvRXJyb3JMaXN0KGVycm9yU2NoZW1hKTtcclxuICAgICAgfVxyXG4gICAgICBzdGF0ZSA9IHtcclxuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JzLFxyXG4gICAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXHJcbiAgICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5ub1ZhbGlkYXRlICYmIG5ld0Vycm9yU2NoZW1hKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yU2NoZW1hID0gdGhpcy5wcm9wcy5leHRyYUVycm9yc1xyXG4gICAgICAgID8gbWVyZ2VPYmplY3RzKFxyXG4gICAgICAgICAgICBuZXdFcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5leHRyYUVycm9ycyxcclxuICAgICAgICAgICAgISFcImNvbmNhdCBhcnJheXNcIlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbmV3RXJyb3JTY2hlbWE7XHJcbiAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGZvcm1EYXRhOiBuZXdGb3JtRGF0YSxcclxuICAgICAgICBlcnJvclNjaGVtYTogZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgZXJyb3JzOiB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICBzdGF0ZSxcclxuICAgICAgKCkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc3RhdGUpXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIG9uQmx1ciA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcclxuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Gb2N1cyA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25Gb2N1cyguLi5hcmdzKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvblN1Ym1pdCA9IGV2ZW50ID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC5wZXJzaXN0KCk7XHJcbiAgICBsZXQgbmV3Rm9ybURhdGEgPSB0aGlzLnN0YXRlLmZvcm1EYXRhO1xyXG5cclxuICAgIGlmICh0aGlzLnByb3BzLm9taXRFeHRyYURhdGEgPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgcmV0cmlldmVkU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXHJcbiAgICAgICAgbmV3Rm9ybURhdGFcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcGF0aFNjaGVtYSA9IHRvUGF0aFNjaGVtYShcclxuICAgICAgICByZXRyaWV2ZWRTY2hlbWEsXHJcbiAgICAgICAgXCJcIixcclxuICAgICAgICB0aGlzLnN0YXRlLnNjaGVtYSxcclxuICAgICAgICBuZXdGb3JtRGF0YVxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29uc3QgZmllbGROYW1lcyA9IHRoaXMuZ2V0RmllbGROYW1lcyhwYXRoU2NoZW1hLCBuZXdGb3JtRGF0YSk7XHJcblxyXG4gICAgICBuZXdGb3JtRGF0YSA9IHRoaXMuZ2V0VXNlZEZvcm1EYXRhKG5ld0Zvcm1EYXRhLCBmaWVsZE5hbWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMucHJvcHMubm9WYWxpZGF0ZSkge1xyXG4gICAgICBsZXQgc2NoZW1hVmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUobmV3Rm9ybURhdGEpO1xyXG4gICAgICBsZXQgZXJyb3JzID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvcnM7XHJcbiAgICAgIGxldCBlcnJvclNjaGVtYSA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JTY2hlbWE7XHJcbiAgICAgIGNvbnN0IHNjaGVtYVZhbGlkYXRpb25FcnJvcnMgPSBlcnJvcnM7XHJcbiAgICAgIGNvbnN0IHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hO1xyXG4gICAgICBpZiAoT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZXh0cmFFcnJvcnMpIHtcclxuICAgICAgICAgIGVycm9yU2NoZW1hID0gbWVyZ2VPYmplY3RzKFxyXG4gICAgICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5leHRyYUVycm9ycyxcclxuICAgICAgICAgICAgISFcImNvbmNhdCBhcnJheXNcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGVycm9ycyA9IHRvRXJyb3JMaXN0KGVycm9yU2NoZW1hKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZXJyb3JzLFxyXG4gICAgICAgICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyxcclxuICAgICAgICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25FcnJvcikge1xyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMub25FcnJvcihlcnJvcnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGb3JtIHZhbGlkYXRpb24gZmFpbGVkXCIsIGVycm9ycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZXJlIGFyZSBubyBlcnJvcnMgZ2VuZXJhdGVkIHRocm91Z2ggc2NoZW1hIHZhbGlkYXRpb24uXHJcbiAgICAvLyBDaGVjayBmb3IgdXNlciBwcm92aWRlZCBlcnJvcnMgYW5kIHVwZGF0ZSBzdGF0ZSBhY2NvcmRpbmdseS5cclxuICAgIGxldCBlcnJvclNjaGVtYTtcclxuICAgIGxldCBlcnJvcnM7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5leHRyYUVycm9ycykge1xyXG4gICAgICBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXh0cmFFcnJvcnM7XHJcbiAgICAgIGVycm9ycyA9IHRvRXJyb3JMaXN0KGVycm9yU2NoZW1hKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVycm9yU2NoZW1hID0ge307XHJcbiAgICAgIGVycm9ycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgIHtcclxuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JzOiBlcnJvcnMsXHJcbiAgICAgICAgZXJyb3JTY2hlbWE6IGVycm9yU2NoZW1hLFxyXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnM6IFtdLFxyXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYToge30sXHJcbiAgICAgIH0sXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Ym1pdCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdChcclxuICAgICAgICAgICAgeyAuLi50aGlzLnN0YXRlLCBmb3JtRGF0YTogbmV3Rm9ybURhdGEsIHN0YXR1czogXCJzdWJtaXR0ZWRcIiB9LFxyXG4gICAgICAgICAgICBldmVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0UmVnaXN0cnkoKSB7XHJcbiAgICAvLyBGb3IgQkMsIGFjY2VwdCBwYXNzZWQgU2NoZW1hRmllbGQgYW5kIFRpdGxlRmllbGQgcHJvcHMgYW5kIHBhc3MgdGhlbSB0b1xyXG4gICAgLy8gdGhlIFwiZmllbGRzXCIgcmVnaXN0cnkgb25lLlxyXG4gICAgY29uc3QgeyBmaWVsZHMsIHdpZGdldHMgfSA9IGdldERlZmF1bHRSZWdpc3RyeSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZmllbGRzOiB7IC4uLmZpZWxkcywgLi4udGhpcy5wcm9wcy5maWVsZHMgfSxcclxuICAgICAgd2lkZ2V0czogeyAuLi53aWRnZXRzLCAuLi50aGlzLnByb3BzLndpZGdldHMgfSxcclxuICAgICAgQXJyYXlGaWVsZFRlbXBsYXRlOiB0aGlzLnByb3BzLkFycmF5RmllbGRUZW1wbGF0ZSxcclxuICAgICAgT2JqZWN0RmllbGRUZW1wbGF0ZTogdGhpcy5wcm9wcy5PYmplY3RGaWVsZFRlbXBsYXRlLFxyXG4gICAgICBGaWVsZFRlbXBsYXRlOiB0aGlzLnByb3BzLkZpZWxkVGVtcGxhdGUsXHJcbiAgICAgIGRlZmluaXRpb25zOiB0aGlzLnByb3BzLnNjaGVtYS5kZWZpbml0aW9ucyB8fCB7fSxcclxuICAgICAgcm9vdFNjaGVtYTogdGhpcy5wcm9wcy5zY2hlbWEsXHJcbiAgICAgIGZvcm1Db250ZXh0OiB0aGlzLnByb3BzLmZvcm1Db250ZXh0IHx8IHt9LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN1Ym1pdCgpIHtcclxuICAgIGlmICh0aGlzLmZvcm1FbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnQuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJzdWJtaXRcIiwge1xyXG4gICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjaGlsZHJlbixcclxuICAgICAgaWQsXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBjbGFzc05hbWUsXHJcbiAgICAgIHRhZ05hbWUsXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIG1ldGhvZCxcclxuICAgICAgdGFyZ2V0LFxyXG4gICAgICBhY3Rpb24sXHJcbiAgICAgIGF1dG9jb21wbGV0ZTogZGVwcmVjYXRlZEF1dG9jb21wbGV0ZSxcclxuICAgICAgYXV0b0NvbXBsZXRlOiBjdXJyZW50QXV0b0NvbXBsZXRlLFxyXG4gICAgICBlbmN0eXBlLFxyXG4gICAgICBhY2NlcHRjaGFyc2V0LFxyXG4gICAgICBub0h0bWw1VmFsaWRhdGUsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgZm9ybUNvbnRleHQsXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCB7IHNjaGVtYSwgdWlTY2hlbWEsIGZvcm1EYXRhLCBlcnJvclNjaGVtYSwgaWRTY2hlbWEgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCByZWdpc3RyeSA9IHRoaXMuZ2V0UmVnaXN0cnkoKTtcclxuICAgIGNvbnN0IF9TY2hlbWFGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5TY2hlbWFGaWVsZDtcclxuICAgIGNvbnN0IEZvcm1UYWcgPSB0YWdOYW1lID8gdGFnTmFtZSA6IFwiZm9ybVwiO1xyXG4gICAgaWYgKGRlcHJlY2F0ZWRBdXRvY29tcGxldGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgIFwiVXNpbmcgYXV0b2NvbXBsZXRlIHByb3BlcnR5IG9mIEZvcm0gaXMgZGVwcmVjYXRlZCwgdXNlIGF1dG9Db21wbGV0ZSBpbnN0ZWFkLlwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhdXRvQ29tcGxldGUgPSBjdXJyZW50QXV0b0NvbXBsZXRlXHJcbiAgICAgID8gY3VycmVudEF1dG9Db21wbGV0ZVxyXG4gICAgICA6IGRlcHJlY2F0ZWRBdXRvY29tcGxldGU7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZvcm1UYWdcclxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSA/IGNsYXNzTmFtZSA6IFwicmpzZlwifVxyXG4gICAgICAgIGlkPXtpZH1cclxuICAgICAgICBuYW1lPXtuYW1lfVxyXG4gICAgICAgIG1ldGhvZD17bWV0aG9kfVxyXG4gICAgICAgIHRhcmdldD17dGFyZ2V0fVxyXG4gICAgICAgIGFjdGlvbj17YWN0aW9ufVxyXG4gICAgICAgIGF1dG9Db21wbGV0ZT17YXV0b0NvbXBsZXRlfVxyXG4gICAgICAgIGVuY1R5cGU9e2VuY3R5cGV9XHJcbiAgICAgICAgYWNjZXB0Q2hhcnNldD17YWNjZXB0Y2hhcnNldH1cclxuICAgICAgICBub1ZhbGlkYXRlPXtub0h0bWw1VmFsaWRhdGV9XHJcbiAgICAgICAgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9XHJcbiAgICAgICAgcmVmPXtmb3JtID0+IHtcclxuICAgICAgICAgIHRoaXMuZm9ybUVsZW1lbnQgPSBmb3JtO1xyXG4gICAgICAgIH19PlxyXG4gICAgICAgIHt0aGlzLnJlbmRlckVycm9ycygpfVxyXG4gICAgICAgIDxfU2NoZW1hRmllbGRcclxuICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hfVxyXG4gICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgaWRQcmVmaXg9e2lkUHJlZml4fVxyXG4gICAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyfVxyXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkZvY3VzfVxyXG4gICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAge2NoaWxkcmVuID8gKFxyXG4gICAgICAgICAgY2hpbGRyZW5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvXCI+XHJcbiAgICAgICAgICAgICAgU3VibWl0XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9Gb3JtVGFnPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBGb3JtLnByb3BUeXBlcyA9IHtcclxuICAgIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBmb3JtRGF0YTogUHJvcFR5cGVzLmFueSxcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHdpZGdldHM6IFByb3BUeXBlcy5vYmplY3RPZihcclxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5vYmplY3RdKVxyXG4gICAgKSxcclxuICAgIGZpZWxkczogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5lbGVtZW50VHlwZSksXHJcbiAgICBBcnJheUZpZWxkVGVtcGxhdGU6IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcclxuICAgIE9iamVjdEZpZWxkVGVtcGxhdGU6IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcclxuICAgIEZpZWxkVGVtcGxhdGU6IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcclxuICAgIEVycm9yTGlzdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkVycm9yOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHNob3dFcnJvckxpc3Q6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgb25TdWJtaXQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0YWdOYW1lOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbWV0aG9kOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgYWN0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgYXV0b2NvbXBsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgYXV0b0NvbXBsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgZW5jdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGFjY2VwdGNoYXJzZXQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBub1ZhbGlkYXRlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG5vSHRtbDVWYWxpZGF0ZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBsaXZlVmFsaWRhdGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgdmFsaWRhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdHJhbnNmb3JtRXJyb3JzOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGZvcm1Db250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgY3VzdG9tRm9ybWF0czogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGFkZGl0aW9uYWxNZXRhU2NoZW1hczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXHJcbiAgICBvbWl0RXh0cmFEYXRhOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGV4dHJhRXJyb3JzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIH07XHJcbn1cclxuIl19