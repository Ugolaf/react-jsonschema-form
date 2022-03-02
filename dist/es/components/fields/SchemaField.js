function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _excluded = ["__errors"];

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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  null: "NullField"
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
    return /*#__PURE__*/React.createElement(UnsupportedField, {
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

  return /*#__PURE__*/React.createElement("label", {
    className: "control-label",
    htmlFor: id
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "required"
  }, REQUIRED_FIELD_SYMBOL));
}

function LabelInput(props) {
  var id = props.id,
      label = props.label,
      onChange = props.onChange;
  return /*#__PURE__*/React.createElement("input", {
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
    return /*#__PURE__*/React.createElement("p", {
      id: id,
      className: "help-block"
    }, help);
  }

  return /*#__PURE__*/React.createElement("div", {
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

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
    className: "error-detail bs-callout bs-callout-info"
  }, errors.filter(function (elem) {
    return !!elem;
  }).map(function (error, index) {
    return /*#__PURE__*/React.createElement("li", {
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
    return /*#__PURE__*/React.createElement("div", {
      className: "hidden"
    }, children);
  }

  return /*#__PURE__*/React.createElement(WrapIfAdditional, props, displayLabel && /*#__PURE__*/React.createElement(Label, {
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
    return /*#__PURE__*/React.createElement("div", {
      className: classNames
    }, props.children);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-xs-5 form-additional"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement(Label, {
    label: keyLabel,
    required: required,
    id: "".concat(id, "-key")
  }), /*#__PURE__*/React.createElement(LabelInput, {
    label: label,
    required: required,
    id: "".concat(id, "-key"),
    onChange: onKeyChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-additional form-group col-xs-5"
  }, props.children), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-2"
  }, /*#__PURE__*/React.createElement(IconButton, {
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
      fieldErrorSchema = _objectWithoutProperties(errorSchema, _excluded); // See #439: uiSchema: Don't pass consumed class names to child components


  var field = /*#__PURE__*/React.createElement(FieldComponent, _extends({}, props, {
    idSchema: idSchema,
    schema: schema,
    uiSchema: _objectSpread(_objectSpread({}, uiSchema), {}, {
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
    description: /*#__PURE__*/React.createElement(DescriptionField, {
      id: id + "__description",
      description: description,
      formContext: formContext
    }),
    rawDescription: description,
    help: /*#__PURE__*/React.createElement(Help, {
      id: id + "__help",
      help: help
    }),
    rawHelp: typeof help === "string" ? help : undefined,
    errors: /*#__PURE__*/React.createElement(ErrorList, {
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
  return /*#__PURE__*/React.createElement(FieldTemplate, fieldProps, /*#__PURE__*/React.createElement(React.Fragment, null, field, schema.anyOf && !isSelect(schema) && /*#__PURE__*/React.createElement(_AnyOfField, {
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
  }), schema.oneOf && !isSelect(schema) && /*#__PURE__*/React.createElement(_OneOfField, {
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

var SchemaField = /*#__PURE__*/function (_React$Component) {
  _inherits(SchemaField, _React$Component);

  var _super = _createSuper(SchemaField);

  function SchemaField() {
    _classCallCheck(this, SchemaField);

    return _super.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TY2hlbWFGaWVsZC5qcyJdLCJuYW1lcyI6WyJJY29uQnV0dG9uIiwiUmVhY3QiLCJQcm9wVHlwZXMiLCJ0eXBlcyIsIkFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyIsImlzU2VsZWN0IiwicmV0cmlldmVTY2hlbWEiLCJ0b0lkU2NoZW1hIiwiZ2V0RGVmYXVsdFJlZ2lzdHJ5IiwibWVyZ2VPYmplY3RzIiwiZGVlcEVxdWFscyIsImdldFNjaGVtYVR5cGUiLCJnZXREaXNwbGF5TGFiZWwiLCJSRVFVSVJFRF9GSUVMRF9TWU1CT0wiLCJDT01QT05FTlRfVFlQRVMiLCJhcnJheSIsImJvb2xlYW4iLCJpbnRlZ2VyIiwibnVtYmVyIiwib2JqZWN0Iiwic3RyaW5nIiwibnVsbCIsImdldEZpZWxkQ29tcG9uZW50Iiwic2NoZW1hIiwidWlTY2hlbWEiLCJpZFNjaGVtYSIsImZpZWxkcyIsImZpZWxkIiwiY29tcG9uZW50TmFtZSIsImFueU9mIiwib25lT2YiLCJVbnN1cHBvcnRlZEZpZWxkIiwidHlwZSIsIkxhYmVsIiwicHJvcHMiLCJsYWJlbCIsInJlcXVpcmVkIiwiaWQiLCJMYWJlbElucHV0Iiwib25DaGFuZ2UiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiSGVscCIsImhlbHAiLCJFcnJvckxpc3QiLCJlcnJvcnMiLCJsZW5ndGgiLCJmaWx0ZXIiLCJlbGVtIiwibWFwIiwiZXJyb3IiLCJpbmRleCIsIkRlZmF1bHRUZW1wbGF0ZSIsImNoaWxkcmVuIiwiZGVzY3JpcHRpb24iLCJoaWRkZW4iLCJkaXNwbGF5TGFiZWwiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJjbGFzc05hbWVzIiwibm9kZSIsImlzUmVxdWlyZWQiLCJlbGVtZW50IiwicmF3RXJyb3JzIiwiYXJyYXlPZiIsInJhd0hlbHAiLCJvbmVPZlR5cGUiLCJyYXdEZXNjcmlwdGlvbiIsImJvb2wiLCJyZWFkb25seSIsImZvcm1Db250ZXh0IiwiZGVmYXVsdFByb3BzIiwiV3JhcElmQWRkaXRpb25hbCIsImRpc2FibGVkIiwib25LZXlDaGFuZ2UiLCJvbkRyb3BQcm9wZXJ0eUNsaWNrIiwia2V5TGFiZWwiLCJhZGRpdGlvbmFsIiwiaGFzT3duUHJvcGVydHkiLCJib3JkZXIiLCJTY2hlbWFGaWVsZFJlbmRlciIsImZvcm1EYXRhIiwiZXJyb3JTY2hlbWEiLCJpZFByZWZpeCIsImlkU2VwYXJhdG9yIiwibmFtZSIsInJlZ2lzdHJ5Iiwid2FzUHJvcGVydHlLZXlNb2RpZmllZCIsInJvb3RTY2hlbWEiLCJGaWVsZFRlbXBsYXRlIiwiRmllbGRDb21wb25lbnQiLCJEZXNjcmlwdGlvbkZpZWxkIiwiQm9vbGVhbiIsInJlYWRPbmx5IiwiYXV0b2ZvY3VzIiwiT2JqZWN0Iiwia2V5cyIsIl9fZXJyb3JzIiwiZmllbGRFcnJvclNjaGVtYSIsInVuZGVmaW5lZCIsIiRpZCIsInRpdGxlIiwiam9pbiIsInRyaW0iLCJmaWVsZFByb3BzIiwiX0FueU9mRmllbGQiLCJBbnlPZkZpZWxkIiwiX09uZU9mRmllbGQiLCJPbmVPZkZpZWxkIiwib25CbHVyIiwib25Gb2N1cyIsIl9zY2hlbWEiLCJTY2hlbWFGaWVsZCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsIkNvbXBvbmVudCIsImFueSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsVUFBUCxNQUF1QixlQUF2QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBTyxLQUFLQyxLQUFaLE1BQXVCLGFBQXZCO0FBRUEsU0FDRUMsd0JBREYsRUFFRUMsUUFGRixFQUdFQyxjQUhGLEVBSUVDLFVBSkYsRUFLRUMsa0JBTEYsRUFNRUMsWUFORixFQU9FQyxVQVBGLEVBUUVDLGFBUkYsRUFTRUMsZUFURixRQVVPLGFBVlA7QUFZQSxJQUFNQyxxQkFBcUIs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TkgsR0FBeEI7QUFRRDs7QUFFRCxlQUFlbUQsV0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJY29uQnV0dG9uIGZyb20gXCIuLi9JY29uQnV0dG9uXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHLFxyXG4gIGlzU2VsZWN0LFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIHRvSWRTY2hlbWEsXHJcbiAgZ2V0RGVmYXVsdFJlZ2lzdHJ5LFxyXG4gIG1lcmdlT2JqZWN0cyxcclxuICBkZWVwRXF1YWxzLFxyXG4gIGdldFNjaGVtYVR5cGUsXHJcbiAgZ2V0RGlzcGxheUxhYmVsLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuY29uc3QgUkVRVUlSRURfRklFTERfU1lNQk9MID0gXCIqXCI7XHJcbmNvbnN0IENPTVBPTkVOVF9UWVBFUyA9IHtcclxuICBhcnJheTogXCJBcnJheUZpZWxkXCIsXHJcbiAgYm9vbGVhbjogXCJCb29sZWFuRmllbGRcIixcclxuICBpbnRlZ2VyOiBcIk51bWJlckZpZWxkXCIsXHJcbiAgbnVtYmVyOiBcIk51bWJlckZpZWxkXCIsXHJcbiAgb2JqZWN0OiBcIk9iamVjdEZpZWxkXCIsXHJcbiAgc3RyaW5nOiBcIlN0cmluZ0ZpZWxkXCIsXHJcbiAgbnVsbDogXCJOdWxsRmllbGRcIixcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldEZpZWxkQ29tcG9uZW50KHNjaGVtYSwgdWlTY2hlbWEsIGlkU2NoZW1hLCBmaWVsZHMpIHtcclxuICBjb25zdCBmaWVsZCA9IHVpU2NoZW1hW1widWk6ZmllbGRcIl07XHJcbiAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4gZmllbGQ7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgZmllbGQgPT09IFwic3RyaW5nXCIgJiYgZmllbGQgaW4gZmllbGRzKSB7XHJcbiAgICByZXR1cm4gZmllbGRzW2ZpZWxkXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBvbmVudE5hbWUgPSBDT01QT05FTlRfVFlQRVNbZ2V0U2NoZW1hVHlwZShzY2hlbWEpXTtcclxuXHJcbiAgLy8gSWYgdGhlIHR5cGUgaXMgbm90IGRlZmluZWQgYW5kIHRoZSBzY2hlbWEgdXNlcyAnYW55T2YnIG9yICdvbmVPZicsIGRvbid0XHJcbiAgLy8gcmVuZGVyIGEgZmllbGQgYW5kIGxldCB0aGUgTXVsdGlTY2hlbWFGaWVsZCBjb21wb25lbnQgaGFuZGxlIHRoZSBmb3JtIGRpc3BsYXlcclxuICBpZiAoIWNvbXBvbmVudE5hbWUgJiYgKHNjaGVtYS5hbnlPZiB8fCBzY2hlbWEub25lT2YpKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb21wb25lbnROYW1lIGluIGZpZWxkc1xyXG4gICAgPyBmaWVsZHNbY29tcG9uZW50TmFtZV1cclxuICAgIDogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgVW5zdXBwb3J0ZWRGaWVsZCB9ID0gZmllbGRzO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPFVuc3VwcG9ydGVkRmllbGRcclxuICAgICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgcmVhc29uPXtgVW5rbm93biBmaWVsZCB0eXBlICR7c2NoZW1hLnR5cGV9YH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gTGFiZWwocHJvcHMpIHtcclxuICBjb25zdCB7IGxhYmVsLCByZXF1aXJlZCwgaWQgfSA9IHByb3BzO1xyXG4gIGlmICghbGFiZWwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIiBodG1sRm9yPXtpZH0+XHJcbiAgICAgIHtsYWJlbH1cclxuICAgICAge3JlcXVpcmVkICYmIDxzcGFuIGNsYXNzTmFtZT1cInJlcXVpcmVkXCI+e1JFUVVJUkVEX0ZJRUxEX1NZTUJPTH08L3NwYW4+fVxyXG4gICAgPC9sYWJlbD5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBMYWJlbElucHV0KHByb3BzKSB7XHJcbiAgY29uc3QgeyBpZCwgbGFiZWwsIG9uQ2hhbmdlIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPGlucHV0XHJcbiAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgaWQ9e2lkfVxyXG4gICAgICBvbkJsdXI9e2V2ZW50ID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XHJcbiAgICAgIGRlZmF1bHRWYWx1ZT17bGFiZWx9XHJcbiAgICAvPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEhlbHAocHJvcHMpIHtcclxuICBjb25zdCB7IGlkLCBoZWxwIH0gPSBwcm9wcztcclxuICBpZiAoIWhlbHApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIGhlbHAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxwIGlkPXtpZH0gY2xhc3NOYW1lPVwiaGVscC1ibG9ja1wiPlxyXG4gICAgICAgIHtoZWxwfVxyXG4gICAgICA8L3A+XHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD17aWR9IGNsYXNzTmFtZT1cImhlbHAtYmxvY2tcIj5cclxuICAgICAge2hlbHB9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBFcnJvckxpc3QocHJvcHMpIHtcclxuICBjb25zdCB7IGVycm9ycyA9IFtdIH0gPSBwcm9wcztcclxuICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHVsIGNsYXNzTmFtZT1cImVycm9yLWRldGFpbCBicy1jYWxsb3V0IGJzLWNhbGxvdXQtaW5mb1wiPlxyXG4gICAgICAgIHtlcnJvcnNcclxuICAgICAgICAgIC5maWx0ZXIoZWxlbSA9PiAhIWVsZW0pXHJcbiAgICAgICAgICAubWFwKChlcnJvciwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIiBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgIHtlcnJvcn1cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIERlZmF1bHRUZW1wbGF0ZShwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIGlkLFxyXG4gICAgbGFiZWwsXHJcbiAgICBjaGlsZHJlbixcclxuICAgIGVycm9ycyxcclxuICAgIGhlbHAsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGhpZGRlbixcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgZGlzcGxheUxhYmVsLFxyXG4gIH0gPSBwcm9wcztcclxuICBpZiAoaGlkZGVuKSB7XHJcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJoaWRkZW5cIj57Y2hpbGRyZW59PC9kaXY+O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxXcmFwSWZBZGRpdGlvbmFsIHsuLi5wcm9wc30+XHJcbiAgICAgIHtkaXNwbGF5TGFiZWwgJiYgPExhYmVsIGxhYmVsPXtsYWJlbH0gcmVxdWlyZWQ9e3JlcXVpcmVkfSBpZD17aWR9IC8+fVxyXG4gICAgICB7ZGlzcGxheUxhYmVsICYmIGRlc2NyaXB0aW9uID8gZGVzY3JpcHRpb24gOiBudWxsfVxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIHtlcnJvcnN9XHJcbiAgICAgIHtoZWxwfVxyXG4gICAgPC9XcmFwSWZBZGRpdGlvbmFsPlxyXG4gICk7XHJcbn1cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIERlZmF1bHRUZW1wbGF0ZS5wcm9wVHlwZXMgPSB7XHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNsYXNzTmFtZXM6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG4gICAgZXJyb3JzOiBQcm9wVHlwZXMuZWxlbWVudCxcclxuICAgIHJhd0Vycm9yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXHJcbiAgICBoZWxwOiBQcm9wVHlwZXMuZWxlbWVudCxcclxuICAgIHJhd0hlbHA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLmVsZW1lbnQsXHJcbiAgICByYXdEZXNjcmlwdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICAgIGhpZGRlbjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNwbGF5TGFiZWw6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZmllbGRzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgZm9ybUNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgfTtcclxufVxyXG5cclxuRGVmYXVsdFRlbXBsYXRlLmRlZmF1bHRQcm9wcyA9IHtcclxuICBoaWRkZW46IGZhbHNlLFxyXG4gIHJlYWRvbmx5OiBmYWxzZSxcclxuICByZXF1aXJlZDogZmFsc2UsXHJcbiAgZGlzcGxheUxhYmVsOiB0cnVlLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gV3JhcElmQWRkaXRpb25hbChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIGlkLFxyXG4gICAgY2xhc3NOYW1lcyxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgbGFiZWwsXHJcbiAgICBvbktleUNoYW5nZSxcclxuICAgIG9uRHJvcFByb3BlcnR5Q2xpY2ssXHJcbiAgICByZWFkb25seSxcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgc2NoZW1hLFxyXG4gIH0gPSBwcm9wcztcclxuICBjb25zdCBrZXlMYWJlbCA9IGAke2xhYmVsfSBLZXlgOyAvLyBpMThuID9cclxuICBjb25zdCBhZGRpdGlvbmFsID0gc2NoZW1hLmhhc093blByb3BlcnR5KEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyk7XHJcblxyXG4gIGlmICghYWRkaXRpb25hbCkge1xyXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT57cHJvcHMuY2hpbGRyZW59PC9kaXY+O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy01IGZvcm0tYWRkaXRpb25hbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbCBsYWJlbD17a2V5TGFiZWx9IHJlcXVpcmVkPXtyZXF1aXJlZH0gaWQ9e2Ake2lkfS1rZXlgfSAvPlxyXG4gICAgICAgICAgICA8TGFiZWxJbnB1dFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgICAgICAgICByZXF1aXJlZD17cmVxdWlyZWR9XHJcbiAgICAgICAgICAgICAgaWQ9e2Ake2lkfS1rZXlgfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbktleUNoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hZGRpdGlvbmFsIGZvcm0tZ3JvdXAgY29sLXhzLTVcIj5cclxuICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0yXCI+XHJcbiAgICAgICAgICA8SWNvbkJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiZGFuZ2VyXCJcclxuICAgICAgICAgICAgaWNvbj1cInJlbW92ZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tcmVtb3ZlIGJ0bi1ibG9ja1wiXHJcbiAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBib3JkZXI6IFwiMFwiIH19XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCByZWFkb25seX1cclxuICAgICAgICAgICAgb25DbGljaz17b25Ecm9wUHJvcGVydHlDbGljayhsYWJlbCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNjaGVtYUZpZWxkUmVuZGVyKHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgdWlTY2hlbWEsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIGVycm9yU2NoZW1hLFxyXG4gICAgaWRQcmVmaXgsXHJcbiAgICBpZFNlcGFyYXRvcixcclxuICAgIG5hbWUsXHJcbiAgICBvbkNoYW5nZSxcclxuICAgIG9uS2V5Q2hhbmdlLFxyXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgIHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQgPSBmYWxzZSxcclxuICB9ID0gcHJvcHM7XHJcbiAgY29uc3QgeyByb290U2NoZW1hLCBmaWVsZHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcclxuICBjb25zdCBGaWVsZFRlbXBsYXRlID1cclxuICAgIHVpU2NoZW1hW1widWk6RmllbGRUZW1wbGF0ZVwiXSB8fCByZWdpc3RyeS5GaWVsZFRlbXBsYXRlIHx8IERlZmF1bHRUZW1wbGF0ZTtcclxuICBsZXQgaWRTY2hlbWEgPSBwcm9wcy5pZFNjaGVtYTtcclxuICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShwcm9wcy5zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICBpZFNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcclxuICAgIHRvSWRTY2hlbWEoc2NoZW1hLCBudWxsLCByb290U2NoZW1hLCBmb3JtRGF0YSwgaWRQcmVmaXgsIGlkU2VwYXJhdG9yKSxcclxuICAgIGlkU2NoZW1hXHJcbiAgKTtcclxuICBjb25zdCBGaWVsZENvbXBvbmVudCA9IGdldEZpZWxkQ29tcG9uZW50KHNjaGVtYSwgdWlTY2hlbWEsIGlkU2NoZW1hLCBmaWVsZHMpO1xyXG4gIGNvbnN0IHsgRGVzY3JpcHRpb25GaWVsZCB9ID0gZmllbGRzO1xyXG4gIGNvbnN0IGRpc2FibGVkID0gQm9vbGVhbihwcm9wcy5kaXNhYmxlZCB8fCB1aVNjaGVtYVtcInVpOmRpc2FibGVkXCJdKTtcclxuICBjb25zdCByZWFkb25seSA9IEJvb2xlYW4oXHJcbiAgICBwcm9wcy5yZWFkb25seSB8fFxyXG4gICAgICB1aVNjaGVtYVtcInVpOnJlYWRvbmx5XCJdIHx8XHJcbiAgICAgIHByb3BzLnNjaGVtYS5yZWFkT25seSB8fFxyXG4gICAgICBzY2hlbWEucmVhZE9ubHlcclxuICApO1xyXG4gIGNvbnN0IGF1dG9mb2N1cyA9IEJvb2xlYW4ocHJvcHMuYXV0b2ZvY3VzIHx8IHVpU2NoZW1hW1widWk6YXV0b2ZvY3VzXCJdKTtcclxuICBpZiAoT2JqZWN0LmtleXMoc2NoZW1hKS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcGxheUxhYmVsID0gZ2V0RGlzcGxheUxhYmVsKHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEpO1xyXG5cclxuICBjb25zdCB7IF9fZXJyb3JzLCAuLi5maWVsZEVycm9yU2NoZW1hIH0gPSBlcnJvclNjaGVtYTtcclxuXHJcbiAgLy8gU2VlICM0Mzk6IHVpU2NoZW1hOiBEb24ndCBwYXNzIGNvbnN1bWVkIGNsYXNzIG5hbWVzIHRvIGNoaWxkIGNvbXBvbmVudHNcclxuICBjb25zdCBmaWVsZCA9IChcclxuICAgIDxGaWVsZENvbXBvbmVudFxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgIHVpU2NoZW1hPXt7IC4uLnVpU2NoZW1hLCBjbGFzc05hbWVzOiB1bmRlZmluZWQgfX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICBlcnJvclNjaGVtYT17ZmllbGRFcnJvclNjaGVtYX1cclxuICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICByYXdFcnJvcnM9e19fZXJyb3JzfVxyXG4gICAgLz5cclxuICApO1xyXG5cclxuICBjb25zdCBpZCA9IGlkU2NoZW1hLiRpZDtcclxuXHJcbiAgLy8gSWYgdGhpcyBzY2hlbWEgaGFzIGEgdGl0bGUgZGVmaW5lZCwgYnV0IHRoZSB1c2VyIGhhcyBzZXQgYSBuZXcga2V5L2xhYmVsLCByZXRhaW4gdGhlaXIgaW5wdXQuXHJcbiAgbGV0IGxhYmVsO1xyXG4gIGlmICh3YXNQcm9wZXJ0eUtleU1vZGlmaWVkKSB7XHJcbiAgICBsYWJlbCA9IG5hbWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxhYmVsID0gdWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCBwcm9wcy5zY2hlbWEudGl0bGUgfHwgc2NoZW1hLnRpdGxlIHx8IG5hbWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZXNjcmlwdGlvbiA9XHJcbiAgICB1aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8XHJcbiAgICBwcm9wcy5zY2hlbWEuZGVzY3JpcHRpb24gfHxcclxuICAgIHNjaGVtYS5kZXNjcmlwdGlvbjtcclxuICBjb25zdCBlcnJvcnMgPSBfX2Vycm9ycztcclxuICBjb25zdCBoZWxwID0gdWlTY2hlbWFbXCJ1aTpoZWxwXCJdO1xyXG4gIGNvbnN0IGhpZGRlbiA9IHVpU2NoZW1hW1widWk6d2lkZ2V0XCJdID09PSBcImhpZGRlblwiO1xyXG4gIGNvbnN0IGNsYXNzTmFtZXMgPSBbXHJcbiAgICBcImZvcm0tZ3JvdXBcIixcclxuICAgIFwiZmllbGRcIixcclxuICAgIGBmaWVsZC0ke3NjaGVtYS50eXBlfWAsXHJcbiAgICBlcnJvcnMgJiYgZXJyb3JzLmxlbmd0aCA+IDAgPyBcImZpZWxkLWVycm9yIGhhcy1lcnJvciBoYXMtZGFuZ2VyXCIgOiBcIlwiLFxyXG4gICAgdWlTY2hlbWEuY2xhc3NOYW1lcyxcclxuICBdXHJcbiAgICAuam9pbihcIiBcIilcclxuICAgIC50cmltKCk7XHJcblxyXG4gIGNvbnN0IGZpZWxkUHJvcHMgPSB7XHJcbiAgICBkZXNjcmlwdGlvbjogKFxyXG4gICAgICA8RGVzY3JpcHRpb25GaWVsZFxyXG4gICAgICAgIGlkPXtpZCArIFwiX19kZXNjcmlwdGlvblwifVxyXG4gICAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICBmb3JtQ29udGV4dD17Zm9ybUNvbnRleHR9XHJcbiAgICAgIC8+XHJcbiAgICApLFxyXG4gICAgcmF3RGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgaGVscDogPEhlbHAgaWQ9e2lkICsgXCJfX2hlbHBcIn0gaGVscD17aGVscH0gLz4sXHJcbiAgICByYXdIZWxwOiB0eXBlb2YgaGVscCA9PT0gXCJzdHJpbmdcIiA/IGhlbHAgOiB1bmRlZmluZWQsXHJcbiAgICBlcnJvcnM6IDxFcnJvckxpc3QgZXJyb3JzPXtlcnJvcnN9IC8+LFxyXG4gICAgcmF3RXJyb3JzOiBlcnJvcnMsXHJcbiAgICBpZCxcclxuICAgIGxhYmVsLFxyXG4gICAgaGlkZGVuLFxyXG4gICAgb25DaGFuZ2UsXHJcbiAgICBvbktleUNoYW5nZSxcclxuICAgIG9uRHJvcFByb3BlcnR5Q2xpY2ssXHJcbiAgICByZXF1aXJlZCxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgcmVhZG9ubHksXHJcbiAgICBkaXNwbGF5TGFiZWwsXHJcbiAgICBjbGFzc05hbWVzLFxyXG4gICAgZm9ybUNvbnRleHQsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIGZpZWxkcyxcclxuICAgIHNjaGVtYSxcclxuICAgIHVpU2NoZW1hLFxyXG4gICAgcmVnaXN0cnksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgX0FueU9mRmllbGQgPSByZWdpc3RyeS5maWVsZHMuQW55T2ZGaWVsZDtcclxuICBjb25zdCBfT25lT2ZGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5PbmVPZkZpZWxkO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZpZWxkVGVtcGxhdGUgey4uLmZpZWxkUHJvcHN9PlxyXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAge2ZpZWxkfVxyXG5cclxuICAgICAgICB7LypcclxuICAgICAgICBJZiB0aGUgc2NoZW1hIGBhbnlPZmAgb3IgJ29uZU9mJyBjYW4gYmUgcmVuZGVyZWQgYXMgYSBzZWxlY3QgY29udHJvbCwgZG9uJ3RcclxuICAgICAgICByZW5kZXIgdGhlIHNlbGVjdGlvbiBhbmQgbGV0IGBTdHJpbmdGaWVsZGAgY29tcG9uZW50IGhhbmRsZVxyXG4gICAgICAgIHJlbmRlcmluZ1xyXG4gICAgICAqL31cclxuICAgICAgICB7c2NoZW1hLmFueU9mICYmICFpc1NlbGVjdChzY2hlbWEpICYmIChcclxuICAgICAgICAgIDxfQW55T2ZGaWVsZFxyXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxyXG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgb25CbHVyPXtwcm9wcy5vbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgb25Gb2N1cz17cHJvcHMub25Gb2N1c31cclxuICAgICAgICAgICAgb3B0aW9ucz17c2NoZW1hLmFueU9mLm1hcChfc2NoZW1hID0+XHJcbiAgICAgICAgICAgICAgcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIGJhc2VUeXBlPXtzY2hlbWEudHlwZX1cclxuICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7c2NoZW1hLm9uZU9mICYmICFpc1NlbGVjdChzY2hlbWEpICYmIChcclxuICAgICAgICAgIDxfT25lT2ZGaWVsZFxyXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxyXG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgb25CbHVyPXtwcm9wcy5vbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgb25Gb2N1cz17cHJvcHMub25Gb2N1c31cclxuICAgICAgICAgICAgb3B0aW9ucz17c2NoZW1hLm9uZU9mLm1hcChfc2NoZW1hID0+XHJcbiAgICAgICAgICAgICAgcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIGJhc2VUeXBlPXtzY2hlbWEudHlwZX1cclxuICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgPC9GaWVsZFRlbXBsYXRlPlxyXG4gICk7XHJcbn1cclxuXHJcbmNsYXNzIFNjaGVtYUZpZWxkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiAhZGVlcEVxdWFscyh0aGlzLnByb3BzLCBuZXh0UHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIFNjaGVtYUZpZWxkUmVuZGVyKHRoaXMucHJvcHMpO1xyXG4gIH1cclxufVxyXG5cclxuU2NoZW1hRmllbGQuZGVmYXVsdFByb3BzID0ge1xyXG4gIHVpU2NoZW1hOiB7fSxcclxuICBlcnJvclNjaGVtYToge30sXHJcbiAgaWRTY2hlbWE6IHt9LFxyXG4gIGRpc2FibGVkOiBmYWxzZSxcclxuICByZWFkb25seTogZmFsc2UsXHJcbiAgYXV0b2ZvY3VzOiBmYWxzZSxcclxufTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBTY2hlbWFGaWVsZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHVpU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgaWRTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBmb3JtRGF0YTogUHJvcFR5cGVzLmFueSxcclxuICAgIGVycm9yU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgcmVnaXN0cnk6IHR5cGVzLnJlZ2lzdHJ5LmlzUmVxdWlyZWQsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2NoZW1hRmllbGQ7XHJcbiJdfQ==