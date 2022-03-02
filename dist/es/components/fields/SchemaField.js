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
      idSeparator = props.idSeparator,
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
  idSchema = mergeObjects(toIdSchema(schema, null, rootSchema, formData, idPrefix, idSeparator), idSchema);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TY2hlbWFGaWVsZC5qcyJdLCJuYW1lcyI6WyJJY29uQnV0dG9uIiwiUmVhY3QiLCJQcm9wVHlwZXMiLCJ0eXBlcyIsIkFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyIsImlzU2VsZWN0IiwicmV0cmlldmVTY2hlbWEiLCJ0b0lkU2NoZW1hIiwiZ2V0RGVmYXVsdFJlZ2lzdHJ5IiwibWVyZ2VPYmplY3RzIiwiZGVlcEVxdWFscyIsImdldFNjaGVtYVR5cGUiLCJnZXREaXNwbGF5TGFiZWwiLCJSRVFVSVJFRF9GSUVMRF9TWU1CT0wiLCJDT01QT05FTlRfVFlQRVMiLCJhcnJheSIsImludGVnZXIiLCJudW1iZXIiLCJvYmplY3QiLCJzdHJpbmciLCJnZXRGaWVsZENvbXBvbmVudCIsInNjaGVtYSIsInVpU2NoZW1hIiwiaWRTY2hlbWEiLCJmaWVsZHMiLCJmaWVsZCIsImNvbXBvbmVudE5hbWUiLCJhbnlPZiIsIm9uZU9mIiwiVW5zdXBwb3J0ZWRGaWVsZCIsInR5cGUiLCJMYWJlbCIsInByb3BzIiwibGFiZWwiLCJyZXF1aXJlZCIsImlkIiwiTGFiZWxJbnB1dCIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIkhlbHAiLCJoZWxwIiwiRXJyb3JMaXN0IiwiZXJyb3JzIiwibGVuZ3RoIiwiZmlsdGVyIiwiZWxlbSIsIm1hcCIsImVycm9yIiwiaW5kZXgiLCJEZWZhdWx0VGVtcGxhdGUiLCJjaGlsZHJlbiIsImRlc2NyaXB0aW9uIiwiaGlkZGVuIiwiZGlzcGxheUxhYmVsIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiY2xhc3NOYW1lcyIsIm5vZGUiLCJpc1JlcXVpcmVkIiwiZWxlbWVudCIsInJhd0Vycm9ycyIsImFycmF5T2YiLCJyYXdIZWxwIiwib25lT2ZUeXBlIiwicmF3RGVzY3JpcHRpb24iLCJib29sIiwicmVhZG9ubHkiLCJmb3JtQ29udGV4dCIsImRlZmF1bHRQcm9wcyIsIldyYXBJZkFkZGl0aW9uYWwiLCJkaXNhYmxlZCIsIm9uS2V5Q2hhbmdlIiwib25Ecm9wUHJvcGVydHlDbGljayIsImtleUxhYmVsIiwiYWRkaXRpb25hbCIsImhhc093blByb3BlcnR5IiwiYm9yZGVyIiwiU2NoZW1hRmllbGRSZW5kZXIiLCJmb3JtRGF0YSIsImVycm9yU2NoZW1hIiwiaWRQcmVmaXgiLCJpZFNlcGFyYXRvciIsIm5hbWUiLCJyZWdpc3RyeSIsIndhc1Byb3BlcnR5S2V5TW9kaWZpZWQiLCJyb290U2NoZW1hIiwiRmllbGRUZW1wbGF0ZSIsIkZpZWxkQ29tcG9uZW50IiwiRGVzY3JpcHRpb25GaWVsZCIsIkJvb2xlYW4iLCJyZWFkT25seSIsImF1dG9mb2N1cyIsIk9iamVjdCIsImtleXMiLCJfX2Vycm9ycyIsImZpZWxkRXJyb3JTY2hlbWEiLCJ1bmRlZmluZWQiLCIkaWQiLCJ0aXRsZSIsImpvaW4iLCJ0cmltIiwiZmllbGRQcm9wcyIsIl9BbnlPZkZpZWxkIiwiQW55T2ZGaWVsZCIsIl9PbmVPZkZpZWxkIiwiT25lT2ZGaWVsZCIsIm9uQmx1ciIsIm9uRm9jdXMiLCJfc2NoZW1hIiwiU2NoZW1hRmllbGQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJDb21wb25lbnQiLCJhbnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxVQUFQLE1BQXVCLGVBQXZCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPLEtBQUtDLEtBQVosTUFBdUIsYUFBdkI7QUFFQSxTQUNFQyx3QkFERixFQUVFQyxRQUZGLEVBR0VDLGNBSEYsRUFJRUMsVUFKRixFQUtFQyxrQkFMRixFQU1FQyxZQU5GLEVBT0VDLFVBUEYsRUFRRUMsYUFSRixFQVNFQyxlQVRGLFFBVU8sYUFWUDtBQVlBLElBQU1DLHFCQUFxQixHQUFHLEdBQTlCO0FBQ0EsSUFBTUMsZUFB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RixTQUFTLENBQUNnQixNQUxEO0FBTXRCcUUsSUFBQUEsUUFBUSxFQUFFcEYsS0FBSyxDQUFDb0YsUUFBTixDQUFlekI7QUFOSCxHQUF4QjtBQVFEOztBQUVELGVBQWVtRCxXQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEljb25CdXR0b24gZnJvbSBcIi4uL0ljb25CdXR0b25cIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICBBRERJVElPTkFMX1BST1BFUlRZX0ZMQUcsXHJcbiAgaXNTZWxlY3QsXHJcbiAgcmV0cmlldmVTY2hlbWEsXHJcbiAgdG9JZFNjaGVtYSxcclxuICBnZXREZWZhdWx0UmVnaXN0cnksXHJcbiAgbWVyZ2VPYmplY3RzLFxyXG4gIGRlZXBFcXVhbHMsXHJcbiAgZ2V0U2NoZW1hVHlwZSxcclxuICBnZXREaXNwbGF5TGFiZWwsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5jb25zdCBSRVFVSVJFRF9GSUVMRF9TWU1CT0wgPSBcIipcIjtcclxuY29uc3QgQ09NUE9ORU5UX1RZUEVTID0ge1xyXG4gIGFycmF5OiBcIkFycmF5RmllbGRcIixcclxuICBib29sZWFuOiBcIkJvb2xlYW5GaWVsZFwiLFxyXG4gIGludGVnZXI6IFwiTnVtYmVyRmllbGRcIixcclxuICBudW1iZXI6IFwiTnVtYmVyRmllbGRcIixcclxuICBvYmplY3Q6IFwiT2JqZWN0RmllbGRcIixcclxuICBzdHJpbmc6IFwiU3RyaW5nRmllbGRcIixcclxuICBudWxsOiBcIk51bGxGaWVsZFwiLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0RmllbGRDb21wb25lbnQoc2NoZW1hLCB1aVNjaGVtYSwgaWRTY2hlbWEsIGZpZWxkcykge1xyXG4gIGNvbnN0IGZpZWxkID0gdWlTY2hlbWFbXCJ1aTpmaWVsZFwiXTtcclxuICBpZiAodHlwZW9mIGZpZWxkID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHJldHVybiBmaWVsZDtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJzdHJpbmdcIiAmJiBmaWVsZCBpbiBmaWVsZHMpIHtcclxuICAgIHJldHVybiBmaWVsZHNbZmllbGRdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tcG9uZW50TmFtZSA9IENPTVBPTkVOVF9UWVBFU1tnZXRTY2hlbWFUeXBlKHNjaGVtYSldO1xyXG5cclxuICAvLyBJZiB0aGUgdHlwZSBpcyBub3QgZGVmaW5lZCBhbmQgdGhlIHNjaGVtYSB1c2VzICdhbnlPZicgb3IgJ29uZU9mJywgZG9uJ3RcclxuICAvLyByZW5kZXIgYSBmaWVsZCBhbmQgbGV0IHRoZSBNdWx0aVNjaGVtYUZpZWxkIGNvbXBvbmVudCBoYW5kbGUgdGhlIGZvcm0gZGlzcGxheVxyXG4gIGlmICghY29tcG9uZW50TmFtZSAmJiAoc2NoZW1hLmFueU9mIHx8IHNjaGVtYS5vbmVPZikpIHtcclxuICAgIHJldHVybiAoKSA9PiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNvbXBvbmVudE5hbWUgaW4gZmllbGRzXHJcbiAgICA/IGZpZWxkc1tjb21wb25lbnROYW1lXVxyXG4gICAgOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBVbnN1cHBvcnRlZEZpZWxkIH0gPSBmaWVsZHM7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8VW5zdXBwb3J0ZWRGaWVsZFxyXG4gICAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgICByZWFzb249e2BVbmtub3duIGZpZWxkIHR5cGUgJHtzY2hlbWEudHlwZX1gfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBMYWJlbChwcm9wcykge1xyXG4gIGNvbnN0IHsgbGFiZWwsIHJlcXVpcmVkLCBpZCB9ID0gcHJvcHM7XHJcbiAgaWYgKCFsYWJlbCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiIGh0bWxGb3I9e2lkfT5cclxuICAgICAge2xhYmVsfVxyXG4gICAgICB7cmVxdWlyZWQgJiYgPHNwYW4gY2xhc3NOYW1lPVwicmVxdWlyZWRcIj57UkVRVUlSRURfRklFTERfU1lNQk9MfTwvc3Bhbj59XHJcbiAgICA8L2xhYmVsPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIExhYmVsSW5wdXQocHJvcHMpIHtcclxuICBjb25zdCB7IGlkLCBsYWJlbCwgb25DaGFuZ2UgfSA9IHByb3BzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8aW5wdXRcclxuICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICBpZD17aWR9XHJcbiAgICAgIG9uQmx1cj17ZXZlbnQgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgZGVmYXVsdFZhbHVlPXtsYWJlbH1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gSGVscChwcm9wcykge1xyXG4gIGNvbnN0IHsgaWQsIGhlbHAgfSA9IHByb3BzO1xyXG4gIGlmICghaGVscCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgaGVscCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHAgaWQ9e2lkfSBjbGFzc05hbWU9XCJoZWxwLWJsb2NrXCI+XHJcbiAgICAgICAge2hlbHB9XHJcbiAgICAgIDwvcD5cclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGlkPXtpZH0gY2xhc3NOYW1lPVwiaGVscC1ibG9ja1wiPlxyXG4gICAgICB7aGVscH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEVycm9yTGlzdChwcm9wcykge1xyXG4gIGNvbnN0IHsgZXJyb3JzID0gW10gfSA9IHByb3BzO1xyXG4gIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZXJyb3ItZGV0YWlsIGJzLWNhbGxvdXQgYnMtY2FsbG91dC1pbmZvXCI+XHJcbiAgICAgICAge2Vycm9yc1xyXG4gICAgICAgICAgLmZpbHRlcihlbGVtID0+ICEhZWxlbSlcclxuICAgICAgICAgIC5tYXAoKGVycm9yLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAge2Vycm9yfVxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gRGVmYXVsdFRlbXBsYXRlKHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgaWQsXHJcbiAgICBsYWJlbCxcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgZXJyb3JzLFxyXG4gICAgaGVscCxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgaGlkZGVuLFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICBkaXNwbGF5TGFiZWwsXHJcbiAgfSA9IHByb3BzO1xyXG4gIGlmIChoaWRkZW4pIHtcclxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlblwiPntjaGlsZHJlbn08L2Rpdj47XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFdyYXBJZkFkZGl0aW9uYWwgey4uLnByb3BzfT5cclxuICAgICAge2Rpc3BsYXlMYWJlbCAmJiA8TGFiZWwgbGFiZWw9e2xhYmVsfSByZXF1aXJlZD17cmVxdWlyZWR9IGlkPXtpZH0gLz59XHJcbiAgICAgIHtkaXNwbGF5TGFiZWwgJiYgZGVzY3JpcHRpb24gPyBkZXNjcmlwdGlvbiA6IG51bGx9XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAge2Vycm9yc31cclxuICAgICAge2hlbHB9XHJcbiAgICA8L1dyYXBJZkFkZGl0aW9uYWw+XHJcbiAgKTtcclxufVxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgRGVmYXVsdFRlbXBsYXRlLnByb3BUeXBlcyA9IHtcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgY2xhc3NOYW1lczogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcbiAgICBlcnJvcnM6IFByb3BUeXBlcy5lbGVtZW50LFxyXG4gICAgcmF3RXJyb3JzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcclxuICAgIGhlbHA6IFByb3BUeXBlcy5lbGVtZW50LFxyXG4gICAgcmF3SGVscDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuZWxlbWVudCxcclxuICAgIHJhd0Rlc2NyaXB0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gICAgaGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc3BsYXlMYWJlbDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBmb3JtQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdCxcclxuICB9O1xyXG59XHJcblxyXG5EZWZhdWx0VGVtcGxhdGUuZGVmYXVsdFByb3BzID0ge1xyXG4gIGhpZGRlbjogZmFsc2UsXHJcbiAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gIHJlcXVpcmVkOiBmYWxzZSxcclxuICBkaXNwbGF5TGFiZWw6IHRydWUsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBXcmFwSWZBZGRpdGlvbmFsKHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgaWQsXHJcbiAgICBjbGFzc05hbWVzLFxyXG4gICAgZGlzYWJsZWQsXHJcbiAgICBsYWJlbCxcclxuICAgIG9uS2V5Q2hhbmdlLFxyXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcclxuICAgIHJlYWRvbmx5LFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICBzY2hlbWEsXHJcbiAgfSA9IHByb3BzO1xyXG4gIGNvbnN0IGtleUxhYmVsID0gYCR7bGFiZWx9IEtleWA7IC8vIGkxOG4gP1xyXG4gIGNvbnN0IGFkZGl0aW9uYWwgPSBzY2hlbWEuaGFzT3duUHJvcGVydHkoQURESVRJT05BTF9QUk9QRVJUWV9GTEFHKTtcclxuXHJcbiAgaWYgKCFhZGRpdGlvbmFsKSB7XHJcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXN9Pntwcm9wcy5jaGlsZHJlbn08L2Rpdj47XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXN9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTUgZm9ybS1hZGRpdGlvbmFsXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPExhYmVsIGxhYmVsPXtrZXlMYWJlbH0gcmVxdWlyZWQ9e3JlcXVpcmVkfSBpZD17YCR7aWR9LWtleWB9IC8+XHJcbiAgICAgICAgICAgIDxMYWJlbElucHV0XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2xhYmVsfVxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgICAgICAgICBpZD17YCR7aWR9LWtleWB9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uS2V5Q2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWFkZGl0aW9uYWwgZm9ybS1ncm91cCBjb2wteHMtNVwiPlxyXG4gICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTJcIj5cclxuICAgICAgICAgIDxJY29uQnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJkYW5nZXJcIlxyXG4gICAgICAgICAgICBpY29uPVwicmVtb3ZlXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXJyYXktaXRlbS1yZW1vdmUgYnRuLWJsb2NrXCJcclxuICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJvcmRlcjogXCIwXCIgfX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHJlYWRvbmx5fVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkRyb3BQcm9wZXJ0eUNsaWNrKGxhYmVsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gU2NoZW1hRmllbGRSZW5kZXIocHJvcHMpIHtcclxuICBjb25zdCB7XHJcbiAgICB1aVNjaGVtYSxcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgZXJyb3JTY2hlbWEsXHJcbiAgICBpZFByZWZpeCxcclxuICAgIGlkU2VwYXJhdG9yLFxyXG4gICAgbmFtZSxcclxuICAgIG9uQ2hhbmdlLFxyXG4gICAgb25LZXlDaGFuZ2UsXHJcbiAgICBvbkRyb3BQcm9wZXJ0eUNsaWNrLFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgd2FzUHJvcGVydHlLZXlNb2RpZmllZCA9IGZhbHNlLFxyXG4gIH0gPSBwcm9wcztcclxuICBjb25zdCB7IHJvb3RTY2hlbWEsIGZpZWxkcywgZm9ybUNvbnRleHQgfSA9IHJlZ2lzdHJ5O1xyXG4gIGNvbnN0IEZpZWxkVGVtcGxhdGUgPVxyXG4gICAgdWlTY2hlbWFbXCJ1aTpGaWVsZFRlbXBsYXRlXCJdIHx8IHJlZ2lzdHJ5LkZpZWxkVGVtcGxhdGUgfHwgRGVmYXVsdFRlbXBsYXRlO1xyXG4gIGxldCBpZFNjaGVtYSA9IHByb3BzLmlkU2NoZW1hO1xyXG4gIGNvbnN0IHNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHByb3BzLnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIGlkU2NoZW1hID0gbWVyZ2VPYmplY3RzKFxyXG4gICAgdG9JZFNjaGVtYShzY2hlbWEsIG51bGwsIHJvb3RTY2hlbWEsIGZvcm1EYXRhLCBpZFByZWZpeCwgaWRTZXBhcmF0b3IpLFxyXG4gICAgaWRTY2hlbWFcclxuICApO1xyXG4gIGNvbnN0IEZpZWxkQ29tcG9uZW50ID0gZ2V0RmllbGRDb21wb25lbnQoc2NoZW1hLCB1aVNjaGVtYSwgaWRTY2hlbWEsIGZpZWxkcyk7XHJcbiAgY29uc3QgeyBEZXNjcmlwdGlvbkZpZWxkIH0gPSBmaWVsZHM7XHJcbiAgY29uc3QgZGlzYWJsZWQgPSBCb29sZWFuKHByb3BzLmRpc2FibGVkIHx8IHVpU2NoZW1hW1widWk6ZGlzYWJsZWRcIl0pO1xyXG4gIGNvbnN0IHJlYWRvbmx5ID0gQm9vbGVhbihcclxuICAgIHByb3BzLnJlYWRvbmx5IHx8XHJcbiAgICAgIHVpU2NoZW1hW1widWk6cmVhZG9ubHlcIl0gfHxcclxuICAgICAgcHJvcHMuc2NoZW1hLnJlYWRPbmx5IHx8XHJcbiAgICAgIHNjaGVtYS5yZWFkT25seVxyXG4gICk7XHJcbiAgY29uc3QgYXV0b2ZvY3VzID0gQm9vbGVhbihwcm9wcy5hdXRvZm9jdXMgfHwgdWlTY2hlbWFbXCJ1aTphdXRvZm9jdXNcIl0pO1xyXG4gIGlmIChPYmplY3Qua2V5cyhzY2hlbWEpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwbGF5TGFiZWwgPSBnZXREaXNwbGF5TGFiZWwoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSk7XHJcblxyXG4gIGNvbnN0IHsgX19lcnJvcnMsIC4uLmZpZWxkRXJyb3JTY2hlbWEgfSA9IGVycm9yU2NoZW1hO1xyXG5cclxuICAvLyBTZWUgIzQzOTogdWlTY2hlbWE6IERvbid0IHBhc3MgY29uc3VtZWQgY2xhc3MgbmFtZXMgdG8gY2hpbGQgY29tcG9uZW50c1xyXG4gIGNvbnN0IGZpZWxkID0gKFxyXG4gICAgPEZpZWxkQ29tcG9uZW50XHJcbiAgICAgIHsuLi5wcm9wc31cclxuICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgdWlTY2hlbWE9e3sgLi4udWlTY2hlbWEsIGNsYXNzTmFtZXM6IHVuZGVmaW5lZCB9fVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgIGVycm9yU2NoZW1hPXtmaWVsZEVycm9yU2NoZW1hfVxyXG4gICAgICBmb3JtQ29udGV4dD17Zm9ybUNvbnRleHR9XHJcbiAgICAgIHJhd0Vycm9ycz17X19lcnJvcnN9XHJcbiAgICAvPlxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGlkID0gaWRTY2hlbWEuJGlkO1xyXG5cclxuICAvLyBJZiB0aGlzIHNjaGVtYSBoYXMgYSB0aXRsZSBkZWZpbmVkLCBidXQgdGhlIHVzZXIgaGFzIHNldCBhIG5ldyBrZXkvbGFiZWwsIHJldGFpbiB0aGVpciBpbnB1dC5cclxuICBsZXQgbGFiZWw7XHJcbiAgaWYgKHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQpIHtcclxuICAgIGxhYmVsID0gbmFtZTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGFiZWwgPSB1aVNjaGVtYVtcInVpOnRpdGxlXCJdIHx8IHByb3BzLnNjaGVtYS50aXRsZSB8fCBzY2hlbWEudGl0bGUgfHwgbmFtZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID1cclxuICAgIHVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHxcclxuICAgIHByb3BzLnNjaGVtYS5kZXNjcmlwdGlvbiB8fFxyXG4gICAgc2NoZW1hLmRlc2NyaXB0aW9uO1xyXG4gIGNvbnN0IGVycm9ycyA9IF9fZXJyb3JzO1xyXG4gIGNvbnN0IGhlbHAgPSB1aVNjaGVtYVtcInVpOmhlbHBcIl07XHJcbiAgY29uc3QgaGlkZGVuID0gdWlTY2hlbWFbXCJ1aTp3aWRnZXRcIl0gPT09IFwiaGlkZGVuXCI7XHJcbiAgY29uc3QgY2xhc3NOYW1lcyA9IFtcclxuICAgIFwiZm9ybS1ncm91cFwiLFxyXG4gICAgXCJmaWVsZFwiLFxyXG4gICAgYGZpZWxkLSR7c2NoZW1hLnR5cGV9YCxcclxuICAgIGVycm9ycyAmJiBlcnJvcnMubGVuZ3RoID4gMCA/IFwiZmllbGQtZXJyb3IgaGFzLWVycm9yIGhhcy1kYW5nZXJcIiA6IFwiXCIsXHJcbiAgICB1aVNjaGVtYS5jbGFzc05hbWVzLFxyXG4gIF1cclxuICAgIC5qb2luKFwiIFwiKVxyXG4gICAgLnRyaW0oKTtcclxuXHJcbiAgY29uc3QgZmllbGRQcm9wcyA9IHtcclxuICAgIGRlc2NyaXB0aW9uOiAoXHJcbiAgICAgIDxEZXNjcmlwdGlvbkZpZWxkXHJcbiAgICAgICAgaWQ9e2lkICsgXCJfX2Rlc2NyaXB0aW9uXCJ9XHJcbiAgICAgICAgZGVzY3JpcHRpb249e2Rlc2NyaXB0aW9ufVxyXG4gICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgLz5cclxuICAgICksXHJcbiAgICByYXdEZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICBoZWxwOiA8SGVscCBpZD17aWQgKyBcIl9faGVscFwifSBoZWxwPXtoZWxwfSAvPixcclxuICAgIHJhd0hlbHA6IHR5cGVvZiBoZWxwID09PSBcInN0cmluZ1wiID8gaGVscCA6IHVuZGVmaW5lZCxcclxuICAgIGVycm9yczogPEVycm9yTGlzdCBlcnJvcnM9e2Vycm9yc30gLz4sXHJcbiAgICByYXdFcnJvcnM6IGVycm9ycyxcclxuICAgIGlkLFxyXG4gICAgbGFiZWwsXHJcbiAgICBoaWRkZW4sXHJcbiAgICBvbkNoYW5nZSxcclxuICAgIG9uS2V5Q2hhbmdlLFxyXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgZGlzYWJsZWQsXHJcbiAgICByZWFkb25seSxcclxuICAgIGRpc3BsYXlMYWJlbCxcclxuICAgIGNsYXNzTmFtZXMsXHJcbiAgICBmb3JtQ29udGV4dCxcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgZmllbGRzLFxyXG4gICAgc2NoZW1hLFxyXG4gICAgdWlTY2hlbWEsXHJcbiAgICByZWdpc3RyeSxcclxuICB9O1xyXG5cclxuICBjb25zdCBfQW55T2ZGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5BbnlPZkZpZWxkO1xyXG4gIGNvbnN0IF9PbmVPZkZpZWxkID0gcmVnaXN0cnkuZmllbGRzLk9uZU9mRmllbGQ7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8RmllbGRUZW1wbGF0ZSB7Li4uZmllbGRQcm9wc30+XHJcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICB7ZmllbGR9XHJcblxyXG4gICAgICAgIHsvKlxyXG4gICAgICAgIElmIHRoZSBzY2hlbWEgYGFueU9mYCBvciAnb25lT2YnIGNhbiBiZSByZW5kZXJlZCBhcyBhIHNlbGVjdCBjb250cm9sLCBkb24ndFxyXG4gICAgICAgIHJlbmRlciB0aGUgc2VsZWN0aW9uIGFuZCBsZXQgYFN0cmluZ0ZpZWxkYCBjb21wb25lbnQgaGFuZGxlXHJcbiAgICAgICAgcmVuZGVyaW5nXHJcbiAgICAgICovfVxyXG4gICAgICAgIHtzY2hlbWEuYW55T2YgJiYgIWlzU2VsZWN0KHNjaGVtYSkgJiYgKFxyXG4gICAgICAgICAgPF9BbnlPZkZpZWxkXHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hfVxyXG4gICAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XHJcbiAgICAgICAgICAgIGlkUHJlZml4PXtpZFByZWZpeH1cclxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgICBvbkJsdXI9e3Byb3BzLm9uQmx1cn1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3Byb3BzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXtwcm9wcy5vbkZvY3VzfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtzY2hlbWEuYW55T2YubWFwKF9zY2hlbWEgPT5cclxuICAgICAgICAgICAgICByZXRyaWV2ZVNjaGVtYShfc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgYmFzZVR5cGU9e3NjaGVtYS50eXBlfVxyXG4gICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHtzY2hlbWEub25lT2YgJiYgIWlzU2VsZWN0KHNjaGVtYSkgJiYgKFxyXG4gICAgICAgICAgPF9PbmVPZkZpZWxkXHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hfVxyXG4gICAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XHJcbiAgICAgICAgICAgIGlkUHJlZml4PXtpZFByZWZpeH1cclxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgICBvbkJsdXI9e3Byb3BzLm9uQmx1cn1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3Byb3BzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXtwcm9wcy5vbkZvY3VzfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtzY2hlbWEub25lT2YubWFwKF9zY2hlbWEgPT5cclxuICAgICAgICAgICAgICByZXRyaWV2ZVNjaGVtYShfc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgYmFzZVR5cGU9e3NjaGVtYS50eXBlfVxyXG4gICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICA8L0ZpZWxkVGVtcGxhdGU+XHJcbiAgKTtcclxufVxyXG5cclxuY2xhc3MgU2NoZW1hRmllbGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgcmV0dXJuICFkZWVwRXF1YWxzKHRoaXMucHJvcHMsIG5leHRQcm9wcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gU2NoZW1hRmllbGRSZW5kZXIodGhpcy5wcm9wcyk7XHJcbiAgfVxyXG59XHJcblxyXG5TY2hlbWFGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgdWlTY2hlbWE6IHt9LFxyXG4gIGVycm9yU2NoZW1hOiB7fSxcclxuICBpZFNjaGVtYToge30sXHJcbiAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gIHJlYWRvbmx5OiBmYWxzZSxcclxuICBhdXRvZm9jdXM6IGZhbHNlLFxyXG59O1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIFNjaGVtYUZpZWxkLnByb3BUeXBlcyA9IHtcclxuICAgIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBpZFNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGZvcm1EYXRhOiBQcm9wVHlwZXMuYW55LFxyXG4gICAgZXJyb3JTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICByZWdpc3RyeTogdHlwZXMucmVnaXN0cnkuaXNSZXF1aXJlZCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2hlbWFGaWVsZDtcclxuIl19