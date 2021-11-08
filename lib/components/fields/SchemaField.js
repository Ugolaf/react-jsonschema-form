function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import IconButton from "../IconButton";
import React from "react";
import PropTypes from "prop-types";
import * as types from "../../types";
import { ADDITIONAL_PROPERTY_FLAG, isSelect, retrieveSchema, toIdSchema, getDefaultRegistry, mergeObjects, deepEquals, getSchemaType, getDisplayLabel } from "../../utils";
var REQUIRED_FIELD_SYMBOL = "*";
var COMPONENT_TYPES = {
  array: "ArrayField",
  "boolean": "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  "null": "NullField"
};

function getFieldComponent(schema, uiSchema, idSchema, fields) {
  var field = uiSchema["ui:field"];

  if (typeof field === "function") {
    return field;
  }

  if (typeof field === "string" && field in fields) {
    return fields[field];
  }

  var componentName = COMPONENT_TYPES[getSchemaType(schema)]; // If the type is not defined and the schema uses 'anyOf' or 'oneOf', don't
  // render a field and let the MultiSchemaField component handle the form display

  if (!componentName && (schema.anyOf || schema.oneOf)) {
    return function () {
      return null;
    };
  }

  return componentName in fields ? fields[componentName] : function () {
    var UnsupportedField = fields.UnsupportedField;
    return React.createElement(UnsupportedField, {
      schema: schema,
      idSchema: idSchema,
      reason: "Unknown field type ".concat(schema.type)
    });
  };
}

function Label(props) {
  var label = props.label,
      required = props.required,
      id = props.id;

  if (!label) {
    return null;
  }

  return React.createElement("label", {
    className: "control-label",
    htmlFor: id
  }, label, required && React.createElement("span", {
    className: "required"
  }, REQUIRED_FIELD_SYMBOL));
}

function LabelInput(props) {
  var id = props.id,
      label = props.label,
      onChange = props.onChange;
  return React.createElement("input", {
    className: "form-control",
    type: "text",
    id: id,
    onBlur: function onBlur(event) {
      return onChange(event.target.value);
    },
    defaultValue: label
  });
}

function Help(props) {
  var id = props.id,
      help = props.help;

  if (!help) {
    return null;
  }

  if (typeof help === "string") {
    return React.createElement("p", {
      id: id,
      className: "help-block"
    }, help);
  }

  return React.createElement("div", {
    id: id,
    className: "help-block"
  }, help);
}

function ErrorList(props) {
  var _props$errors = props.errors,
      errors = _props$errors === void 0 ? [] : _props$errors;

  if (errors.length === 0) {
    return null;
  }

  return React.createElement("div", null, React.createElement("ul", {
    className: "error-detail bs-callout bs-callout-info"
  }, errors.filter(function (elem) {
    return !!elem;
  }).map(function (error, index) {
    return React.createElement("li", {
      className: "text-danger",
      key: index
    }, error);
  })));
}

function DefaultTemplate(props) {
  var id = props.id,
      label = props.label,
      children = props.children,
      errors = props.errors,
      help = props.help,
      description = props.description,
      hidden = props.hidden,
      required = props.required,
      displayLabel = props.displayLabel;

  if (hidden) {
    return React.createElement("div", {
      className: "hidden"
    }, children);
  }

  return React.createElement(WrapIfAdditional, props, displayLabel && React.createElement(Label, {
    label: label,
    required: required,
    id: id
  }), displayLabel && description ? description : null, children, errors, help);
}

if (process.env.NODE_ENV !== "production") {
  DefaultTemplate.propTypes = {
    id: PropTypes.string,
    classNames: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    errors: PropTypes.element,
    rawErrors: PropTypes.arrayOf(PropTypes.string),
    help: PropTypes.element,
    rawHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.element,
    rawDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    hidden: PropTypes.bool,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    displayLabel: PropTypes.bool,
    fields: PropTypes.object,
    formContext: PropTypes.object
  };
}

DefaultTemplate.defaultProps = {
  hidden: false,
  readonly: false,
  required: false,
  displayLabel: true
};

function WrapIfAdditional(props) {
  var id = props.id,
      classNames = props.classNames,
      disabled = props.disabled,
      label = props.label,
      onKeyChange = props.onKeyChange,
      onDropPropertyClick = props.onDropPropertyClick,
      readonly = props.readonly,
      required = props.required,
      schema = props.schema;
  var keyLabel = "".concat(label, " Key"); // i18n ?

  var additional = schema.hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);

  if (!additional) {
    return React.createElement("div", {
      className: classNames
    }, props.children);
  }

  return React.createElement("div", {
    className: classNames
  }, React.createElement("div", {
    className: "row"
  }, React.createElement("div", {
    className: "col-xs-5 form-additional"
  }, React.createElement("div", {
    className: "form-group"
  }, React.createElement(Label, {
    label: keyLabel,
    required: required,
    id: "".concat(id, "-key")
  }), React.createElement(LabelInput, {
    label: label,
    required: required,
    id: "".concat(id, "-key"),
    onChange: onKeyChange
  }))), React.createElement("div", {
    className: "form-additional form-group col-xs-5"
  }, props.children), React.createElement("div", {
    className: "col-xs-2"
  }, React.createElement(IconButton, {
    type: "danger",
    icon: "remove",
    className: "array-item-remove btn-block",
    tabIndex: "-1",
    style: {
      border: "0"
    },
    disabled: disabled || readonly,
    onClick: onDropPropertyClick(label)
  }))));
}

function SchemaFieldRender(props) {
  var uiSchema = props.uiSchema,
      formData = props.formData,
      errorSchema = props.errorSchema,
      idPrefix = props.idPrefix,
      name = props.name,
      onChange = props.onChange,
      onKeyChange = props.onKeyChange,
      onDropPropertyClick = props.onDropPropertyClick,
      required = props.required,
      _props$registry = props.registry,
      registry = _props$registry === void 0 ? getDefaultRegistry() : _props$registry,
      _props$wasPropertyKey = props.wasPropertyKeyModified,
      wasPropertyKeyModified = _props$wasPropertyKey === void 0 ? false : _props$wasPropertyKey;
  var rootSchema = registry.rootSchema,
      fields = registry.fields,
      formContext = registry.formContext;
  var FieldTemplate = uiSchema["ui:FieldTemplate"] || registry.FieldTemplate || DefaultTemplate;
  var idSchema = props.idSchema;
  var schema = retrieveSchema(props.schema, rootSchema, formData);
  idSchema = mergeObjects(toIdSchema(schema, null, rootSchema, formData, idPrefix), idSchema);
  var FieldComponent = getFieldComponent(schema, uiSchema, idSchema, fields);
  var DescriptionField = fields.DescriptionField;
  var disabled = Boolean(props.disabled || uiSchema["ui:disabled"]);
  var readonly = Boolean(props.readonly || uiSchema["ui:readonly"] || props.schema.readOnly || schema.readOnly);
  var autofocus = Boolean(props.autofocus || uiSchema["ui:autofocus"]);

  if (Object.keys(schema).length === 0) {
    return null;
  }

  var displayLabel = getDisplayLabel(schema, uiSchema, rootSchema);

  var __errors = errorSchema.__errors,
      fieldErrorSchema = _objectWithoutProperties(errorSchema, ["__errors"]); // See #439: uiSchema: Don't pass consumed class names to child components


  var field = React.createElement(FieldComponent, _extends({}, props, {
    idSchema: idSchema,
    schema: schema,
    uiSchema: _objectSpread({}, uiSchema, {
      classNames: undefined
    }),
    disabled: disabled,
    readonly: readonly,
    autofocus: autofocus,
    errorSchema: fieldErrorSchema,
    formContext: formContext,
    rawErrors: __errors
  }));
  var id = idSchema.$id; // If this schema has a title defined, but the user has set a new key/label, retain their input.

  var label;

  if (wasPropertyKeyModified) {
    label = name;
  } else {
    label = uiSchema["ui:title"] || props.schema.title || schema.title || name;
  }

  var description = uiSchema["ui:description"] || props.schema.description || schema.description;
  var errors = __errors;
  var help = uiSchema["ui:help"];
  var hidden = uiSchema["ui:widget"] === "hidden";
  var classNames = ["form-group", "field", "field-".concat(schema.type), errors && errors.length > 0 ? "field-error has-error has-danger" : "", uiSchema.classNames].join(" ").trim();
  var fieldProps = {
    description: React.createElement(DescriptionField, {
      id: id + "__description",
      description: description,
      formContext: formContext
    }),
    rawDescription: description,
    help: React.createElement(Help, {
      id: id + "__help",
      help: help
    }),
    rawHelp: typeof help === "string" ? help : undefined,
    errors: React.createElement(ErrorList, {
      errors: errors
    }),
    rawErrors: errors,
    id: id,
    label: label,
    hidden: hidden,
    onChange: onChange,
    onKeyChange: onKeyChange,
    onDropPropertyClick: onDropPropertyClick,
    required: required,
    disabled: disabled,
    readonly: readonly,
    displayLabel: displayLabel,
    classNames: classNames,
    formContext: formContext,
    formData: formData,
    fields: fields,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  };
  var _AnyOfField = registry.fields.AnyOfField;
  var _OneOfField = registry.fields.OneOfField;
  return React.createElement(FieldTemplate, fieldProps, React.createElement(React.Fragment, null, field, schema.anyOf && !isSelect(schema) && React.createElement(_AnyOfField, {
    disabled: disabled,
    errorSchema: errorSchema,
    formData: formData,
    idPrefix: idPrefix,
    idSchema: idSchema,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    options: schema.anyOf.map(function (_schema) {
      return retrieveSchema(_schema, rootSchema, formData);
    }),
    baseType: schema.type,
    registry: registry,
    schema: schema,
    uiSchema: uiSchema
  }), schema.oneOf && !isSelect(schema) && React.createElement(_OneOfField, {
    disabled: disabled,
    errorSchema: errorSchema,
    formData: formData,
    idPrefix: idPrefix,
    idSchema: idSchema,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    options: schema.oneOf.map(function (_schema) {
      return retrieveSchema(_schema, rootSchema, formData);
    }),
    baseType: schema.type,
    registry: registry,
    schema: schema,
    uiSchema: uiSchema
  })));
}

var SchemaField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SchemaField, _React$Component);

  function SchemaField() {
    _classCallCheck(this, SchemaField);

    return _possibleConstructorReturn(this, _getPrototypeOf(SchemaField).apply(this, arguments));
  }

  _createClass(SchemaField, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !deepEquals(this.props, nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      return SchemaFieldRender(this.props);
    }
  }]);

  return SchemaField;
}(React.Component);

SchemaField.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  disabled: false,
  readonly: false,
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  SchemaField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    idSchema: PropTypes.object,
    formData: PropTypes.any,
    errorSchema: PropTypes.object,
    registry: types.registry.isRequired
  };
}

export default SchemaField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TY2hlbWFGaWVsZC5qcyJdLCJuYW1lcyI6WyJJY29uQnV0dG9uIiwiUmVhY3QiLCJQcm9wVHlwZXMiLCJ0eXBlcyIsIkFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyIsImlzU2VsZWN0IiwicmV0cmlldmVTY2hlbWEiLCJ0b0lkU2NoZW1hIiwiZ2V0RGVmYXVsdFJlZ2lzdHJ5IiwibWVyZ2VPYmplY3RzIiwiZGVlcEVxdWFscyIsImdldFNjaGVtYVR5cGUiLCJnZXREaXNwbGF5TGFiZWwiLCJSRVFVSVJFRF9GSUVMRF9TWU1CT0wiLCJDT01QT05FTlRfVFlQRVMiLCJhcnJheSIsImludGVnZXIiLCJudW1iZXIiLCJvYmplY3QiLCJzdHJpbmciLCJnZXRGaWVsZENvbXBvbmVudCIsInNjaGVtYSIsInVpU2NoZW1hIiwiaWRTY2hlbWEiLCJmaWVsZHMiLCJmaWVsZCIsImNvbXBvbmVudE5hbWUiLCJhbnlPZiIsIm9uZU9mIiwiVW5zdXBwb3J0ZWRGaWVsZCIsInR5cGUiLCJMYWJlbCIsInByb3BzIiwibGFiZWwiLCJyZXF1aXJlZCIsImlkIiwiTGFiZWxJbnB1dCIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIkhlbHAiLCJoZWxwIiwiRXJyb3JMaXN0IiwiZXJyb3JzIiwibGVuZ3RoIiwiZmlsdGVyIiwiZWxlbSIsIm1hcCIsImVycm9yIiwiaW5kZXgiLCJEZWZhdWx0VGVtcGxhdGUiLCJjaGlsZHJlbiIsImRlc2NyaXB0aW9uIiwiaGlkZGVuIiwiZGlzcGxheUxhYmVsIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiY2xhc3NOYW1lcyIsIm5vZGUiLCJpc1JlcXVpcmVkIiwiZWxlbWVudCIsInJhd0Vycm9ycyIsImFycmF5T2YiLCJyYXdIZWxwIiwib25lT2ZUeXBlIiwicmF3RGVzY3JpcHRpb24iLCJib29sIiwicmVhZG9ubHkiLCJmb3JtQ29udGV4dCIsImRlZmF1bHRQcm9wcyIsIldyYXBJZkFkZGl0aW9uYWwiLCJkaXNhYmxlZCIsIm9uS2V5Q2hhbmdlIiwib25Ecm9wUHJvcGVydHlDbGljayIsImtleUxhYmVsIiwiYWRkaXRpb25hbCIsImhhc093blByb3BlcnR5IiwiYm9yZGVyIiwiU2NoZW1hRmllbGRSZW5kZXIiLCJmb3JtRGF0YSIsImVycm9yU2NoZW1hIiwiaWRQcmVmaXgiLCJuYW1lIiwicmVnaXN0cnkiLCJ3YXNQcm9wZXJ0eUtleU1vZGlmaWVkIiwicm9vdFNjaGVtYSIsIkZpZWxkVGVtcGxhdGUiLCJGaWVsZENvbXBvbmVudCIsIkRlc2NyaXB0aW9uRmllbGQiLCJCb29sZWFuIiwicmVhZE9ubHkiLCJhdXRvZm9jdXMiLCJPYmplY3QiLCJrZXlzIiwiX19lcnJvcnMiLCJmaWVsZEVycm9yU2NoZW1hIiwidW5kZWZpbmVkIiwiJGlkIiwidGl0bGUiLCJqb2luIiwidHJpbSIsImZpZWxkUHJvcHMiLCJfQW55T2ZGaWVsZCIsIkFueU9mRmllbGQiLCJfT25lT2ZGaWVsZCIsIk9uZU9mRmllbGQiLCJvbkJsdXIiLCJvbkZvY3VzIiwiX3NjaGVtYSIsIlNjaGVtYUZpZWxkIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiQ29tcG9uZW50IiwiYW55Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsVUFBUCxNQUF1QixlQUF2QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBTyxLQUFLQyxLQUFaLE1BQXVCLGFBQXZCO0FBRUEsU0FDRUMsd0JBREYsRUFFRUMsUUFGRixFQUdFQyxjQUhGLEVBSUVDLFVBSkYsRUFLRUMsa0JBTEYsRUFNRUMsWUFORixFQU9FQyxVQVBGLEVBUUVDLGFBUkYsRUFTRUMsZUFURixRQVVPLGFBVlA7QUFZQSxJQUFNQyxxQkFBcUIsR0FBRyxHQUE5QjtBQUNBLElBQU1DLGVBQWUsR0FBRztBQUN0QkMsRUFB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QUFRRDs7QUFFRCxlQUFla0QsV0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJY29uQnV0dG9uIGZyb20gXCIuLi9JY29uQnV0dG9uXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHLFxyXG4gIGlzU2VsZWN0LFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIHRvSWRTY2hlbWEsXHJcbiAgZ2V0RGVmYXVsdFJlZ2lzdHJ5LFxyXG4gIG1lcmdlT2JqZWN0cyxcclxuICBkZWVwRXF1YWxzLFxyXG4gIGdldFNjaGVtYVR5cGUsXHJcbiAgZ2V0RGlzcGxheUxhYmVsLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuY29uc3QgUkVRVUlSRURfRklFTERfU1lNQk9MID0gXCIqXCI7XHJcbmNvbnN0IENPTVBPTkVOVF9UWVBFUyA9IHtcclxuICBhcnJheTogXCJBcnJheUZpZWxkXCIsXHJcbiAgYm9vbGVhbjogXCJCb29sZWFuRmllbGRcIixcclxuICBpbnRlZ2VyOiBcIk51bWJlckZpZWxkXCIsXHJcbiAgbnVtYmVyOiBcIk51bWJlckZpZWxkXCIsXHJcbiAgb2JqZWN0OiBcIk9iamVjdEZpZWxkXCIsXHJcbiAgc3RyaW5nOiBcIlN0cmluZ0ZpZWxkXCIsXHJcbiAgbnVsbDogXCJOdWxsRmllbGRcIixcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldEZpZWxkQ29tcG9uZW50KHNjaGVtYSwgdWlTY2hlbWEsIGlkU2NoZW1hLCBmaWVsZHMpIHtcclxuICBjb25zdCBmaWVsZCA9IHVpU2NoZW1hW1widWk6ZmllbGRcIl07XHJcbiAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4gZmllbGQ7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgZmllbGQgPT09IFwic3RyaW5nXCIgJiYgZmllbGQgaW4gZmllbGRzKSB7XHJcbiAgICByZXR1cm4gZmllbGRzW2ZpZWxkXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBvbmVudE5hbWUgPSBDT01QT05FTlRfVFlQRVNbZ2V0U2NoZW1hVHlwZShzY2hlbWEpXTtcclxuXHJcbiAgLy8gSWYgdGhlIHR5cGUgaXMgbm90IGRlZmluZWQgYW5kIHRoZSBzY2hlbWEgdXNlcyAnYW55T2YnIG9yICdvbmVPZicsIGRvbid0XHJcbiAgLy8gcmVuZGVyIGEgZmllbGQgYW5kIGxldCB0aGUgTXVsdGlTY2hlbWFGaWVsZCBjb21wb25lbnQgaGFuZGxlIHRoZSBmb3JtIGRpc3BsYXlcclxuICBpZiAoIWNvbXBvbmVudE5hbWUgJiYgKHNjaGVtYS5hbnlPZiB8fCBzY2hlbWEub25lT2YpKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb21wb25lbnROYW1lIGluIGZpZWxkc1xyXG4gICAgPyBmaWVsZHNbY29tcG9uZW50TmFtZV1cclxuICAgIDogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgVW5zdXBwb3J0ZWRGaWVsZCB9ID0gZmllbGRzO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPFVuc3VwcG9ydGVkRmllbGRcclxuICAgICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgcmVhc29uPXtgVW5rbm93biBmaWVsZCB0eXBlICR7c2NoZW1hLnR5cGV9YH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gTGFiZWwocHJvcHMpIHtcclxuICBjb25zdCB7IGxhYmVsLCByZXF1aXJlZCwgaWQgfSA9IHByb3BzO1xyXG4gIGlmICghbGFiZWwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIiBodG1sRm9yPXtpZH0+XHJcbiAgICAgIHtsYWJlbH1cclxuICAgICAge3JlcXVpcmVkICYmIDxzcGFuIGNsYXNzTmFtZT1cInJlcXVpcmVkXCI+e1JFUVVJUkVEX0ZJRUxEX1NZTUJPTH08L3NwYW4+fVxyXG4gICAgPC9sYWJlbD5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBMYWJlbElucHV0KHByb3BzKSB7XHJcbiAgY29uc3QgeyBpZCwgbGFiZWwsIG9uQ2hhbmdlIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPGlucHV0XHJcbiAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgaWQ9e2lkfVxyXG4gICAgICBvbkJsdXI9e2V2ZW50ID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XHJcbiAgICAgIGRlZmF1bHRWYWx1ZT17bGFiZWx9XHJcbiAgICAvPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEhlbHAocHJvcHMpIHtcclxuICBjb25zdCB7IGlkLCBoZWxwIH0gPSBwcm9wcztcclxuICBpZiAoIWhlbHApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIGhlbHAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxwIGlkPXtpZH0gY2xhc3NOYW1lPVwiaGVscC1ibG9ja1wiPlxyXG4gICAgICAgIHtoZWxwfVxyXG4gICAgICA8L3A+XHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD17aWR9IGNsYXNzTmFtZT1cImhlbHAtYmxvY2tcIj5cclxuICAgICAge2hlbHB9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBFcnJvckxpc3QocHJvcHMpIHtcclxuICBjb25zdCB7IGVycm9ycyA9IFtdIH0gPSBwcm9wcztcclxuICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHVsIGNsYXNzTmFtZT1cImVycm9yLWRldGFpbCBicy1jYWxsb3V0IGJzLWNhbGxvdXQtaW5mb1wiPlxyXG4gICAgICAgIHtlcnJvcnNcclxuICAgICAgICAgIC5maWx0ZXIoZWxlbSA9PiAhIWVsZW0pXHJcbiAgICAgICAgICAubWFwKChlcnJvciwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIiBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgIHtlcnJvcn1cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIERlZmF1bHRUZW1wbGF0ZShwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIGlkLFxyXG4gICAgbGFiZWwsXHJcbiAgICBjaGlsZHJlbixcclxuICAgIGVycm9ycyxcclxuICAgIGhlbHAsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGhpZGRlbixcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgZGlzcGxheUxhYmVsLFxyXG4gIH0gPSBwcm9wcztcclxuICBpZiAoaGlkZGVuKSB7XHJcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJoaWRkZW5cIj57Y2hpbGRyZW59PC9kaXY+O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxXcmFwSWZBZGRpdGlvbmFsIHsuLi5wcm9wc30+XHJcbiAgICAgIHtkaXNwbGF5TGFiZWwgJiYgPExhYmVsIGxhYmVsPXtsYWJlbH0gcmVxdWlyZWQ9e3JlcXVpcmVkfSBpZD17aWR9IC8+fVxyXG4gICAgICB7ZGlzcGxheUxhYmVsICYmIGRlc2NyaXB0aW9uID8gZGVzY3JpcHRpb24gOiBudWxsfVxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIHtlcnJvcnN9XHJcbiAgICAgIHtoZWxwfVxyXG4gICAgPC9XcmFwSWZBZGRpdGlvbmFsPlxyXG4gICk7XHJcbn1cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIERlZmF1bHRUZW1wbGF0ZS5wcm9wVHlwZXMgPSB7XHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNsYXNzTmFtZXM6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG4gICAgZXJyb3JzOiBQcm9wVHlwZXMuZWxlbWVudCxcclxuICAgIHJhd0Vycm9yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXHJcbiAgICBoZWxwOiBQcm9wVHlwZXMuZWxlbWVudCxcclxuICAgIHJhd0hlbHA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLmVsZW1lbnQsXHJcbiAgICByYXdEZXNjcmlwdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICAgIGhpZGRlbjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNwbGF5TGFiZWw6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZmllbGRzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgZm9ybUNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgfTtcclxufVxyXG5cclxuRGVmYXVsdFRlbXBsYXRlLmRlZmF1bHRQcm9wcyA9IHtcclxuICBoaWRkZW46IGZhbHNlLFxyXG4gIHJlYWRvbmx5OiBmYWxzZSxcclxuICByZXF1aXJlZDogZmFsc2UsXHJcbiAgZGlzcGxheUxhYmVsOiB0cnVlLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gV3JhcElmQWRkaXRpb25hbChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIGlkLFxyXG4gICAgY2xhc3NOYW1lcyxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgbGFiZWwsXHJcbiAgICBvbktleUNoYW5nZSxcclxuICAgIG9uRHJvcFByb3BlcnR5Q2xpY2ssXHJcbiAgICByZWFkb25seSxcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgc2NoZW1hLFxyXG4gIH0gPSBwcm9wcztcclxuICBjb25zdCBrZXlMYWJlbCA9IGAke2xhYmVsfSBLZXlgOyAvLyBpMThuID9cclxuICBjb25zdCBhZGRpdGlvbmFsID0gc2NoZW1hLmhhc093blByb3BlcnR5KEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyk7XHJcblxyXG4gIGlmICghYWRkaXRpb25hbCkge1xyXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT57cHJvcHMuY2hpbGRyZW59PC9kaXY+O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy01IGZvcm0tYWRkaXRpb25hbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbCBsYWJlbD17a2V5TGFiZWx9IHJlcXVpcmVkPXtyZXF1aXJlZH0gaWQ9e2Ake2lkfS1rZXlgfSAvPlxyXG4gICAgICAgICAgICA8TGFiZWxJbnB1dFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgICAgICAgICByZXF1aXJlZD17cmVxdWlyZWR9XHJcbiAgICAgICAgICAgICAgaWQ9e2Ake2lkfS1rZXlgfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbktleUNoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hZGRpdGlvbmFsIGZvcm0tZ3JvdXAgY29sLXhzLTVcIj5cclxuICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0yXCI+XHJcbiAgICAgICAgICA8SWNvbkJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiZGFuZ2VyXCJcclxuICAgICAgICAgICAgaWNvbj1cInJlbW92ZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tcmVtb3ZlIGJ0bi1ibG9ja1wiXHJcbiAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBib3JkZXI6IFwiMFwiIH19XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCByZWFkb25seX1cclxuICAgICAgICAgICAgb25DbGljaz17b25Ecm9wUHJvcGVydHlDbGljayhsYWJlbCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNjaGVtYUZpZWxkUmVuZGVyKHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgdWlTY2hlbWEsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIGVycm9yU2NoZW1hLFxyXG4gICAgaWRQcmVmaXgsXHJcbiAgICBuYW1lLFxyXG4gICAgb25DaGFuZ2UsXHJcbiAgICBvbktleUNoYW5nZSxcclxuICAgIG9uRHJvcFByb3BlcnR5Q2xpY2ssXHJcbiAgICByZXF1aXJlZCxcclxuICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXHJcbiAgICB3YXNQcm9wZXJ0eUtleU1vZGlmaWVkID0gZmFsc2UsXHJcbiAgfSA9IHByb3BzO1xyXG4gIGNvbnN0IHsgcm9vdFNjaGVtYSwgZmllbGRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgY29uc3QgRmllbGRUZW1wbGF0ZSA9XHJcbiAgICB1aVNjaGVtYVtcInVpOkZpZWxkVGVtcGxhdGVcIl0gfHwgcmVnaXN0cnkuRmllbGRUZW1wbGF0ZSB8fCBEZWZhdWx0VGVtcGxhdGU7XHJcbiAgbGV0IGlkU2NoZW1hID0gcHJvcHMuaWRTY2hlbWE7XHJcbiAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEocHJvcHMuc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgaWRTY2hlbWEgPSBtZXJnZU9iamVjdHMoXHJcbiAgICB0b0lkU2NoZW1hKHNjaGVtYSwgbnVsbCwgcm9vdFNjaGVtYSwgZm9ybURhdGEsIGlkUHJlZml4KSxcclxuICAgIGlkU2NoZW1hXHJcbiAgKTtcclxuICBjb25zdCBGaWVsZENvbXBvbmVudCA9IGdldEZpZWxkQ29tcG9uZW50KHNjaGVtYSwgdWlTY2hlbWEsIGlkU2NoZW1hLCBmaWVsZHMpO1xyXG4gIGNvbnN0IHsgRGVzY3JpcHRpb25GaWVsZCB9ID0gZmllbGRzO1xyXG4gIGNvbnN0IGRpc2FibGVkID0gQm9vbGVhbihwcm9wcy5kaXNhYmxlZCB8fCB1aVNjaGVtYVtcInVpOmRpc2FibGVkXCJdKTtcclxuICBjb25zdCByZWFkb25seSA9IEJvb2xlYW4oXHJcbiAgICBwcm9wcy5yZWFkb25seSB8fFxyXG4gICAgICB1aVNjaGVtYVtcInVpOnJlYWRvbmx5XCJdIHx8XHJcbiAgICAgIHByb3BzLnNjaGVtYS5yZWFkT25seSB8fFxyXG4gICAgICBzY2hlbWEucmVhZE9ubHlcclxuICApO1xyXG4gIGNvbnN0IGF1dG9mb2N1cyA9IEJvb2xlYW4ocHJvcHMuYXV0b2ZvY3VzIHx8IHVpU2NoZW1hW1widWk6YXV0b2ZvY3VzXCJdKTtcclxuICBpZiAoT2JqZWN0LmtleXMoc2NoZW1hKS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcGxheUxhYmVsID0gZ2V0RGlzcGxheUxhYmVsKHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEpO1xyXG5cclxuICBjb25zdCB7IF9fZXJyb3JzLCAuLi5maWVsZEVycm9yU2NoZW1hIH0gPSBlcnJvclNjaGVtYTtcclxuXHJcbiAgLy8gU2VlICM0Mzk6IHVpU2NoZW1hOiBEb24ndCBwYXNzIGNvbnN1bWVkIGNsYXNzIG5hbWVzIHRvIGNoaWxkIGNvbXBvbmVudHNcclxuICBjb25zdCBmaWVsZCA9IChcclxuICAgIDxGaWVsZENvbXBvbmVudFxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgIHVpU2NoZW1hPXt7IC4uLnVpU2NoZW1hLCBjbGFzc05hbWVzOiB1bmRlZmluZWQgfX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICBlcnJvclNjaGVtYT17ZmllbGRFcnJvclNjaGVtYX1cclxuICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICByYXdFcnJvcnM9e19fZXJyb3JzfVxyXG4gICAgLz5cclxuICApO1xyXG5cclxuICBjb25zdCBpZCA9IGlkU2NoZW1hLiRpZDtcclxuXHJcbiAgLy8gSWYgdGhpcyBzY2hlbWEgaGFzIGEgdGl0bGUgZGVmaW5lZCwgYnV0IHRoZSB1c2VyIGhhcyBzZXQgYSBuZXcga2V5L2xhYmVsLCByZXRhaW4gdGhlaXIgaW5wdXQuXHJcbiAgbGV0IGxhYmVsO1xyXG4gIGlmICh3YXNQcm9wZXJ0eUtleU1vZGlmaWVkKSB7XHJcbiAgICBsYWJlbCA9IG5hbWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxhYmVsID0gdWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCBwcm9wcy5zY2hlbWEudGl0bGUgfHwgc2NoZW1hLnRpdGxlIHx8IG5hbWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZXNjcmlwdGlvbiA9XHJcbiAgICB1aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8XHJcbiAgICBwcm9wcy5zY2hlbWEuZGVzY3JpcHRpb24gfHxcclxuICAgIHNjaGVtYS5kZXNjcmlwdGlvbjtcclxuICBjb25zdCBlcnJvcnMgPSBfX2Vycm9ycztcclxuICBjb25zdCBoZWxwID0gdWlTY2hlbWFbXCJ1aTpoZWxwXCJdO1xyXG4gIGNvbnN0IGhpZGRlbiA9IHVpU2NoZW1hW1widWk6d2lkZ2V0XCJdID09PSBcImhpZGRlblwiO1xyXG4gIGNvbnN0IGNsYXNzTmFtZXMgPSBbXHJcbiAgICBcImZvcm0tZ3JvdXBcIixcclxuICAgIFwiZmllbGRcIixcclxuICAgIGBmaWVsZC0ke3NjaGVtYS50eXBlfWAsXHJcbiAgICBlcnJvcnMgJiYgZXJyb3JzLmxlbmd0aCA+IDAgPyBcImZpZWxkLWVycm9yIGhhcy1lcnJvciBoYXMtZGFuZ2VyXCIgOiBcIlwiLFxyXG4gICAgdWlTY2hlbWEuY2xhc3NOYW1lcyxcclxuICBdXHJcbiAgICAuam9pbihcIiBcIilcclxuICAgIC50cmltKCk7XHJcblxyXG4gIGNvbnN0IGZpZWxkUHJvcHMgPSB7XHJcbiAgICBkZXNjcmlwdGlvbjogKFxyXG4gICAgICA8RGVzY3JpcHRpb25GaWVsZFxyXG4gICAgICAgIGlkPXtpZCArIFwiX19kZXNjcmlwdGlvblwifVxyXG4gICAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICBmb3JtQ29udGV4dD17Zm9ybUNvbnRleHR9XHJcbiAgICAgIC8+XHJcbiAgICApLFxyXG4gICAgcmF3RGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgaGVscDogPEhlbHAgaWQ9e2lkICsgXCJfX2hlbHBcIn0gaGVscD17aGVscH0gLz4sXHJcbiAgICByYXdIZWxwOiB0eXBlb2YgaGVscCA9PT0gXCJzdHJpbmdcIiA/IGhlbHAgOiB1bmRlZmluZWQsXHJcbiAgICBlcnJvcnM6IDxFcnJvckxpc3QgZXJyb3JzPXtlcnJvcnN9IC8+LFxyXG4gICAgcmF3RXJyb3JzOiBlcnJvcnMsXHJcbiAgICBpZCxcclxuICAgIGxhYmVsLFxyXG4gICAgaGlkZGVuLFxyXG4gICAgb25DaGFuZ2UsXHJcbiAgICBvbktleUNoYW5nZSxcclxuICAgIG9uRHJvcFByb3BlcnR5Q2xpY2ssXHJcbiAgICByZXF1aXJlZCxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgcmVhZG9ubHksXHJcbiAgICBkaXNwbGF5TGFiZWwsXHJcbiAgICBjbGFzc05hbWVzLFxyXG4gICAgZm9ybUNvbnRleHQsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIGZpZWxkcyxcclxuICAgIHNjaGVtYSxcclxuICAgIHVpU2NoZW1hLFxyXG4gICAgcmVnaXN0cnksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgX0FueU9mRmllbGQgPSByZWdpc3RyeS5maWVsZHMuQW55T2ZGaWVsZDtcclxuICBjb25zdCBfT25lT2ZGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5PbmVPZkZpZWxkO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZpZWxkVGVtcGxhdGUgey4uLmZpZWxkUHJvcHN9PlxyXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAge2ZpZWxkfVxyXG5cclxuICAgICAgICB7LypcclxuICAgICAgICBJZiB0aGUgc2NoZW1hIGBhbnlPZmAgb3IgJ29uZU9mJyBjYW4gYmUgcmVuZGVyZWQgYXMgYSBzZWxlY3QgY29udHJvbCwgZG9uJ3RcclxuICAgICAgICByZW5kZXIgdGhlIHNlbGVjdGlvbiBhbmQgbGV0IGBTdHJpbmdGaWVsZGAgY29tcG9uZW50IGhhbmRsZVxyXG4gICAgICAgIHJlbmRlcmluZ1xyXG4gICAgICAqL31cclxuICAgICAgICB7c2NoZW1hLmFueU9mICYmICFpc1NlbGVjdChzY2hlbWEpICYmIChcclxuICAgICAgICAgIDxfQW55T2ZGaWVsZFxyXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxyXG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgb25CbHVyPXtwcm9wcy5vbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgb25Gb2N1cz17cHJvcHMub25Gb2N1c31cclxuICAgICAgICAgICAgb3B0aW9ucz17c2NoZW1hLmFueU9mLm1hcChfc2NoZW1hID0+XHJcbiAgICAgICAgICAgICAgcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIGJhc2VUeXBlPXtzY2hlbWEudHlwZX1cclxuICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7c2NoZW1hLm9uZU9mICYmICFpc1NlbGVjdChzY2hlbWEpICYmIChcclxuICAgICAgICAgIDxfT25lT2ZGaWVsZFxyXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxyXG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgb25CbHVyPXtwcm9wcy5vbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgb25Gb2N1cz17cHJvcHMub25Gb2N1c31cclxuICAgICAgICAgICAgb3B0aW9ucz17c2NoZW1hLm9uZU9mLm1hcChfc2NoZW1hID0+XHJcbiAgICAgICAgICAgICAgcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIGJhc2VUeXBlPXtzY2hlbWEudHlwZX1cclxuICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgPC9GaWVsZFRlbXBsYXRlPlxyXG4gICk7XHJcbn1cclxuXHJcbmNsYXNzIFNjaGVtYUZpZWxkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiAhZGVlcEVxdWFscyh0aGlzLnByb3BzLCBuZXh0UHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIFNjaGVtYUZpZWxkUmVuZGVyKHRoaXMucHJvcHMpO1xyXG4gIH1cclxufVxyXG5cclxuU2NoZW1hRmllbGQuZGVmYXVsdFByb3BzID0ge1xyXG4gIHVpU2NoZW1hOiB7fSxcclxuICBlcnJvclNjaGVtYToge30sXHJcbiAgaWRTY2hlbWE6IHt9LFxyXG4gIGRpc2FibGVkOiBmYWxzZSxcclxuICByZWFkb25seTogZmFsc2UsXHJcbiAgYXV0b2ZvY3VzOiBmYWxzZSxcclxufTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBTY2hlbWFGaWVsZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHVpU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgaWRTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBmb3JtRGF0YTogUHJvcFR5cGVzLmFueSxcclxuICAgIGVycm9yU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgcmVnaXN0cnk6IHR5cGVzLnJlZ2lzdHJ5LmlzUmVxdWlyZWQsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2NoZW1hRmllbGQ7XHJcbiJdfQ==