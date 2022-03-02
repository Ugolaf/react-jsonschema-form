"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

  var componentName = COMPONENT_TYPES[(0, _utils.getSchemaType)(schema)]; // If the type is not defined and the schema uses 'anyOf' or 'oneOf', don't
  // render a field and let the MultiSchemaField component handle the form display

  if (!componentName && (schema.anyOf || schema.oneOf)) {
    return function () {
      return null;
    };
  }

  return componentName in fields ? fields[componentName] : function () {
    var UnsupportedField = fields.UnsupportedField;
    return _react["default"].createElement(UnsupportedField, {
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

  return _react["default"].createElement("label", {
    className: "control-label",
    htmlFor: id
  }, label, required && _react["default"].createElement("span", {
    className: "required"
  }, REQUIRED_FIELD_SYMBOL));
}

function LabelInput(props) {
  var id = props.id,
      label = props.label,
      onChange = props.onChange;
  return _react["default"].createElement("input", {
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
    return _react["default"].createElement("p", {
      id: id,
      className: "help-block"
    }, help);
  }

  return _react["default"].createElement("div", {
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

  return _react["default"].createElement("div", null, _react["default"].createElement("ul", {
    className: "error-detail bs-callout bs-callout-info"
  }, errors.filter(function (elem) {
    return !!elem;
  }).map(function (error, index) {
    return _react["default"].createElement("li", {
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
    return _react["default"].createElement("div", {
      className: "hidden"
    }, children);
  }

  return _react["default"].createElement(WrapIfAdditional, props, displayLabel && _react["default"].createElement(Label, {
    label: label,
    required: required,
    id: id
  }), displayLabel && description ? description : null, children, errors, help);
}

if (process.env.NODE_ENV !== "production") {
  DefaultTemplate.propTypes = {
    id: _propTypes["default"].string,
    classNames: _propTypes["default"].string,
    label: _propTypes["default"].string,
    children: _propTypes["default"].node.isRequired,
    errors: _propTypes["default"].element,
    rawErrors: _propTypes["default"].arrayOf(_propTypes["default"].string),
    help: _propTypes["default"].element,
    rawHelp: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
    description: _propTypes["default"].element,
    rawDescription: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
    hidden: _propTypes["default"].bool,
    required: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    displayLabel: _propTypes["default"].bool,
    fields: _propTypes["default"].object,
    formContext: _propTypes["default"].object
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

  var additional = schema.hasOwnProperty(_utils.ADDITIONAL_PROPERTY_FLAG);

  if (!additional) {
    return _react["default"].createElement("div", {
      className: classNames
    }, props.children);
  }

  return _react["default"].createElement("div", {
    className: classNames
  }, _react["default"].createElement("div", {
    className: "row"
  }, _react["default"].createElement("div", {
    className: "col-xs-5 form-additional"
  }, _react["default"].createElement("div", {
    className: "form-group"
  }, _react["default"].createElement(Label, {
    label: keyLabel,
    required: required,
    id: "".concat(id, "-key")
  }), _react["default"].createElement(LabelInput, {
    label: label,
    required: required,
    id: "".concat(id, "-key"),
    onChange: onKeyChange
  }))), _react["default"].createElement("div", {
    className: "form-additional form-group col-xs-5"
  }, props.children), _react["default"].createElement("div", {
    className: "col-xs-2"
  }, _react["default"].createElement(_IconButton["default"], {
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
      registry = _props$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _props$registry,
      _props$wasPropertyKey = props.wasPropertyKeyModified,
      wasPropertyKeyModified = _props$wasPropertyKey === void 0 ? false : _props$wasPropertyKey;
  var rootSchema = registry.rootSchema,
      fields = registry.fields,
      formContext = registry.formContext;
  var FieldTemplate = uiSchema["ui:FieldTemplate"] || registry.FieldTemplate || DefaultTemplate;
  var idSchema = props.idSchema;
  var schema = (0, _utils.retrieveSchema)(props.schema, rootSchema, formData);
  idSchema = (0, _utils.mergeObjects)((0, _utils.toIdSchema)(schema, null, rootSchema, formData, idPrefix, idSeparator), idSchema);
  var FieldComponent = getFieldComponent(schema, uiSchema, idSchema, fields);
  var DescriptionField = fields.DescriptionField;
  var disabled = Boolean(props.disabled || uiSchema["ui:disabled"]);
  var readonly = Boolean(props.readonly || uiSchema["ui:readonly"] || props.schema.readOnly || schema.readOnly);
  var autofocus = Boolean(props.autofocus || uiSchema["ui:autofocus"]);

  if (Object.keys(schema).length === 0) {
    return null;
  }

  var displayLabel = (0, _utils.getDisplayLabel)(schema, uiSchema, rootSchema);

  var __errors = errorSchema.__errors,
      fieldErrorSchema = _objectWithoutProperties(errorSchema, ["__errors"]); // See #439: uiSchema: Don't pass consumed class names to child components


  var field = _react["default"].createElement(FieldComponent, _extends({}, props, {
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
    description: _react["default"].createElement(DescriptionField, {
      id: id + "__description",
      description: description,
      formContext: formContext
    }),
    rawDescription: description,
    help: _react["default"].createElement(Help, {
      id: id + "__help",
      help: help
    }),
    rawHelp: typeof help === "string" ? help : undefined,
    errors: _react["default"].createElement(ErrorList, {
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
  return _react["default"].createElement(FieldTemplate, fieldProps, _react["default"].createElement(_react["default"].Fragment, null, field, schema.anyOf && !(0, _utils.isSelect)(schema) && _react["default"].createElement(_AnyOfField, {
    disabled: disabled,
    errorSchema: errorSchema,
    formData: formData,
    idPrefix: idPrefix,
    idSchema: idSchema,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    options: schema.anyOf.map(function (_schema) {
      return (0, _utils.retrieveSchema)(_schema, rootSchema, formData);
    }),
    baseType: schema.type,
    registry: registry,
    schema: schema,
    uiSchema: uiSchema
  }), schema.oneOf && !(0, _utils.isSelect)(schema) && _react["default"].createElement(_OneOfField, {
    disabled: disabled,
    errorSchema: errorSchema,
    formData: formData,
    idPrefix: idPrefix,
    idSchema: idSchema,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    options: schema.oneOf.map(function (_schema) {
      return (0, _utils.retrieveSchema)(_schema, rootSchema, formData);
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
      return !(0, _utils.deepEquals)(this.props, nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      return SchemaFieldRender(this.props);
    }
  }]);

  return SchemaField;
}(_react["default"].Component);

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
    schema: _propTypes["default"].object.isRequired,
    uiSchema: _propTypes["default"].object,
    idSchema: _propTypes["default"].object,
    formData: _propTypes["default"].any,
    errorSchema: _propTypes["default"].object,
    registry: types.registry.isRequired
  };
}

var _default = SchemaField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TY2hlbWFGaWVsZC5qcyJdLCJuYW1lcyI6WyJSRVFVSVJFRF9GSUVMRF9TWU1CT0wiLCJDT01QT05FTlRfVFlQRVMiLCJhcnJheSIsImludGVnZXIiLCJudW1iZXIiLCJvYmplY3QiLCJzdHJpbmciLCJnZXRGaWVsZENvbXBvbmVudCIsInNjaGVtYSIsInVpU2NoZW1hIiwiaWRTY2hlbWEiLCJmaWVsZHMiLCJmaWVsZCIsImNvbXBvbmVudE5hbWUiLCJhbnlPZiIsIm9uZU9mIiwiVW5zdXBwb3J0ZWRGaWVsZCIsInR5cGUiLCJMYWJlbCIsInByb3BzIiwibGFiZWwiLCJyZXF1aXJlZCIsImlkIiwiTGFiZWxJbnB1dCIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIkhlbHAiLCJoZWxwIiwiRXJyb3JMaXN0IiwiZXJyb3JzIiwibGVuZ3RoIiwiZmlsdGVyIiwiZWxlbSIsIm1hcCIsImVycm9yIiwiaW5kZXgiLCJEZWZhdWx0VGVtcGxhdGUiLCJjaGlsZHJlbiIsImRlc2NyaXB0aW9uIiwiaGlkZGVuIiwiZGlzcGxheUxhYmVsIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiY2xhc3NOYW1lcyIsIm5vZGUiLCJpc1JlcXVpcmVkIiwiZWxlbWVudCIsInJhd0Vycm9ycyIsImFycmF5T2YiLCJyYXdIZWxwIiwib25lT2ZUeXBlIiwicmF3RGVzY3JpcHRpb24iLCJib29sIiwicmVhZG9ubHkiLCJmb3JtQ29udGV4dCIsImRlZmF1bHRQcm9wcyIsIldyYXBJZkFkZGl0aW9uYWwiLCJkaXNhYmxlZCIsIm9uS2V5Q2hhbmdlIiwib25Ecm9wUHJvcGVydHlDbGljayIsImtleUxhYmVsIiwiYWRkaXRpb25hbCIsImhhc093blByb3BlcnR5IiwiQURESVRJT05BTF9QUk9QRVJUWV9GTEFHIiwiYm9yZGVyIiwiU2NoZW1hRmllbGRSZW5kZXIiLCJmb3JtRGF0YSIsImVycm9yU2NoZW1hIiwiaWRQcmVmaXgiLCJpZFNlcGFyYXRvciIsIm5hbWUiLCJyZWdpc3RyeSIsIndhc1Byb3BlcnR5S2V5TW9kaWZpZWQiLCJyb290U2NoZW1hIiwiRmllbGRUZW1wbGF0ZSIsIkZpZWxkQ29tcG9uZW50IiwiRGVzY3JpcHRpb25GaWVsZCIsIkJvb2xlYW4iLCJyZWFkT25seSIsImF1dG9mb2N1cyIsIk9iamVjdCIsImtleXMiLCJfX2Vycm9ycyIsImZpZWxkRXJyb3JTY2hlbWEiLCJ1bmRlZmluZWQiLCIkaWQiLCJ0aXRsZSIsImpvaW4iLCJ0cmltIiwiZmllbGRQcm9wcyIsIl9BbnlPZkZpZWxkIiwiQW55T2ZGaWVsZCIsIl9PbmVPZkZpZWxkIiwiT25lT2ZGaWVsZCIsIm9uQmx1ciIsIm9uRm9jdXMiLCJfc2NoZW1hIiwiU2NoZW1hRmllbGQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJSZWFjdCIsIkNvbXBvbmVudCIsImFueSIsInR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxJQUFNQSxxQkFBcUIsR0FBRyxHQUE5QjtBQUNBLElBQU1DLGVBQWUsR0FBRztBQUN0QkMsRUFBQUEsS0FBSyxFQUFFLFlBRGU7QUFFdEIsYUFBUyxjQUZhO0FBR3RCQyxFQUFBQSxPQUFPLEVBQUUsYUFIYTtBQUl0QkMsRUFBQUEsTUFBTSxFQUFFLGFBSmM7QUFLdEJDLEVBQUFBLE1BQU0sRUFBRSxhQUxjO0FBTXRCQyxFQUFBQSxNQUFNLEVBQUUsYUFOYztBQU90QixVQUFNO0FBUGdCLENBQXhCOztBQVVBLFNBQVNDLGlCQUFULENBQTJCQyxNQUEzQixFQUFtQ0MsUUFBbkMsRUFBNkNDLFFBQTdDLEVBQXVEQyxNQUF2RCxFQUErRDtBQUM3RCxNQUFNQyxLQUFLLEdBQUdILFFBQVEsQ0FBQyxVQUFELENBQXRCOztBQUNBLE1BQUksT0FBT0csS0FBUCxL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QUFFLEVBSGU7QUFJekJvRCxFQUFBQSxRQUFRLEVBQUUsS0FKZTtBQUt6QkosRUFBQUEsUUFBUSxFQUFFLEtBTGU7QUFNekIwQixFQUFBQSxTQUFTLEVBQUU7QUFOYyxDQUEzQjs7QUFTQSxJQUFJekMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekN5RCxFQUFBQSxXQUFXLENBQUN4RCxTQUFaLEdBQXdCO0FBQ3RCdEMsSUFBQUEsTUFBTSxFQUFFdUMsc0JBQVUxQyxNQUFWLENBQWlCNkMsVUFESDtBQUV0QnpDLElBQUFBLFFBQVEsRUFBRXNDLHNCQUFVMUMsTUFGRTtBQUd0QkssSUFBQUEsUUFBUSxFQUFFcUMsc0JBQVUxQyxNQUhFO0FBSXRCa0UsSUFBQUEsUUFBUSxFQUFFeEIsc0JBQVU0RCxHQUpFO0FBS3RCbkMsSUFBQUEsV0FBVyxFQUFFekIsc0JBQVUxQyxNQUxEO0FBTXRCdUUsSUFBQUEsUUFBUSxFQUFFZ0MsS0FBSyxDQUFDaEMsUUFBTixDQUFlMUI7QUFOSCxHQUF4QjtBQVFEOztlQUVjb0QsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJY29uQnV0dG9uIGZyb20gXCIuLi9JY29uQnV0dG9uXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHLFxyXG4gIGlzU2VsZWN0LFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIHRvSWRTY2hlbWEsXHJcbiAgZ2V0RGVmYXVsdFJlZ2lzdHJ5LFxyXG4gIG1lcmdlT2JqZWN0cyxcclxuICBkZWVwRXF1YWxzLFxyXG4gIGdldFNjaGVtYVR5cGUsXHJcbiAgZ2V0RGlzcGxheUxhYmVsLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuY29uc3QgUkVRVUlSRURfRklFTERfU1lNQk9MID0gXCIqXCI7XHJcbmNvbnN0IENPTVBPTkVOVF9UWVBFUyA9IHtcclxuICBhcnJheTogXCJBcnJheUZpZWxkXCIsXHJcbiAgYm9vbGVhbjogXCJCb29sZWFuRmllbGRcIixcclxuICBpbnRlZ2VyOiBcIk51bWJlckZpZWxkXCIsXHJcbiAgbnVtYmVyOiBcIk51bWJlckZpZWxkXCIsXHJcbiAgb2JqZWN0OiBcIk9iamVjdEZpZWxkXCIsXHJcbiAgc3RyaW5nOiBcIlN0cmluZ0ZpZWxkXCIsXHJcbiAgbnVsbDogXCJOdWxsRmllbGRcIixcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldEZpZWxkQ29tcG9uZW50KHNjaGVtYSwgdWlTY2hlbWEsIGlkU2NoZW1hLCBmaWVsZHMpIHtcclxuICBjb25zdCBmaWVsZCA9IHVpU2NoZW1hW1widWk6ZmllbGRcIl07XHJcbiAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4gZmllbGQ7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgZmllbGQgPT09IFwic3RyaW5nXCIgJiYgZmllbGQgaW4gZmllbGRzKSB7XHJcbiAgICByZXR1cm4gZmllbGRzW2ZpZWxkXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBvbmVudE5hbWUgPSBDT01QT05FTlRfVFlQRVNbZ2V0U2NoZW1hVHlwZShzY2hlbWEpXTtcclxuXHJcbiAgLy8gSWYgdGhlIHR5cGUgaXMgbm90IGRlZmluZWQgYW5kIHRoZSBzY2hlbWEgdXNlcyAnYW55T2YnIG9yICdvbmVPZicsIGRvbid0XHJcbiAgLy8gcmVuZGVyIGEgZmllbGQgYW5kIGxldCB0aGUgTXVsdGlTY2hlbWFGaWVsZCBjb21wb25lbnQgaGFuZGxlIHRoZSBmb3JtIGRpc3BsYXlcclxuICBpZiAoIWNvbXBvbmVudE5hbWUgJiYgKHNjaGVtYS5hbnlPZiB8fCBzY2hlbWEub25lT2YpKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb21wb25lbnROYW1lIGluIGZpZWxkc1xyXG4gICAgPyBmaWVsZHNbY29tcG9uZW50TmFtZV1cclxuICAgIDogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgVW5zdXBwb3J0ZWRGaWVsZCB9ID0gZmllbGRzO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPFVuc3VwcG9ydGVkRmllbGRcclxuICAgICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgcmVhc29uPXtgVW5rbm93biBmaWVsZCB0eXBlICR7c2NoZW1hLnR5cGV9YH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gTGFiZWwocHJvcHMpIHtcclxuICBjb25zdCB7IGxhYmVsLCByZXF1aXJlZCwgaWQgfSA9IHByb3BzO1xyXG4gIGlmICghbGFiZWwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIiBodG1sRm9yPXtpZH0+XHJcbiAgICAgIHtsYWJlbH1cclxuICAgICAge3JlcXVpcmVkICYmIDxzcGFuIGNsYXNzTmFtZT1cInJlcXVpcmVkXCI+e1JFUVVJUkVEX0ZJRUxEX1NZTUJPTH08L3NwYW4+fVxyXG4gICAgPC9sYWJlbD5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBMYWJlbElucHV0KHByb3BzKSB7XHJcbiAgY29uc3QgeyBpZCwgbGFiZWwsIG9uQ2hhbmdlIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPGlucHV0XHJcbiAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgaWQ9e2lkfVxyXG4gICAgICBvbkJsdXI9e2V2ZW50ID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XHJcbiAgICAgIGRlZmF1bHRWYWx1ZT17bGFiZWx9XHJcbiAgICAvPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEhlbHAocHJvcHMpIHtcclxuICBjb25zdCB7IGlkLCBoZWxwIH0gPSBwcm9wcztcclxuICBpZiAoIWhlbHApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIGhlbHAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxwIGlkPXtpZH0gY2xhc3NOYW1lPVwiaGVscC1ibG9ja1wiPlxyXG4gICAgICAgIHtoZWxwfVxyXG4gICAgICA8L3A+XHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD17aWR9IGNsYXNzTmFtZT1cImhlbHAtYmxvY2tcIj5cclxuICAgICAge2hlbHB9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBFcnJvckxpc3QocHJvcHMpIHtcclxuICBjb25zdCB7IGVycm9ycyA9IFtdIH0gPSBwcm9wcztcclxuICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHVsIGNsYXNzTmFtZT1cImVycm9yLWRldGFpbCBicy1jYWxsb3V0IGJzLWNhbGxvdXQtaW5mb1wiPlxyXG4gICAgICAgIHtlcnJvcnNcclxuICAgICAgICAgIC5maWx0ZXIoZWxlbSA9PiAhIWVsZW0pXHJcbiAgICAgICAgICAubWFwKChlcnJvciwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIiBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgIHtlcnJvcn1cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIERlZmF1bHRUZW1wbGF0ZShwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIGlkLFxyXG4gICAgbGFiZWwsXHJcbiAgICBjaGlsZHJlbixcclxuICAgIGVycm9ycyxcclxuICAgIGhlbHAsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGhpZGRlbixcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgZGlzcGxheUxhYmVsLFxyXG4gIH0gPSBwcm9wcztcclxuICBpZiAoaGlkZGVuKSB7XHJcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJoaWRkZW5cIj57Y2hpbGRyZW59PC9kaXY+O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxXcmFwSWZBZGRpdGlvbmFsIHsuLi5wcm9wc30+XHJcbiAgICAgIHtkaXNwbGF5TGFiZWwgJiYgPExhYmVsIGxhYmVsPXtsYWJlbH0gcmVxdWlyZWQ9e3JlcXVpcmVkfSBpZD17aWR9IC8+fVxyXG4gICAgICB7ZGlzcGxheUxhYmVsICYmIGRlc2NyaXB0aW9uID8gZGVzY3JpcHRpb24gOiBudWxsfVxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIHtlcnJvcnN9XHJcbiAgICAgIHtoZWxwfVxyXG4gICAgPC9XcmFwSWZBZGRpdGlvbmFsPlxyXG4gICk7XHJcbn1cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIERlZmF1bHRUZW1wbGF0ZS5wcm9wVHlwZXMgPSB7XHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNsYXNzTmFtZXM6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG4gICAgZXJyb3JzOiBQcm9wVHlwZXMuZWxlbWVudCxcclxuICAgIHJhd0Vycm9yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXHJcbiAgICBoZWxwOiBQcm9wVHlwZXMuZWxlbWVudCxcclxuICAgIHJhd0hlbHA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLmVsZW1lbnQsXHJcbiAgICByYXdEZXNjcmlwdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICAgIGhpZGRlbjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNwbGF5TGFiZWw6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZmllbGRzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgZm9ybUNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgfTtcclxufVxyXG5cclxuRGVmYXVsdFRlbXBsYXRlLmRlZmF1bHRQcm9wcyA9IHtcclxuICBoaWRkZW46IGZhbHNlLFxyXG4gIHJlYWRvbmx5OiBmYWxzZSxcclxuICByZXF1aXJlZDogZmFsc2UsXHJcbiAgZGlzcGxheUxhYmVsOiB0cnVlLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gV3JhcElmQWRkaXRpb25hbChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIGlkLFxyXG4gICAgY2xhc3NOYW1lcyxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgbGFiZWwsXHJcbiAgICBvbktleUNoYW5nZSxcclxuICAgIG9uRHJvcFByb3BlcnR5Q2xpY2ssXHJcbiAgICByZWFkb25seSxcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgc2NoZW1hLFxyXG4gIH0gPSBwcm9wcztcclxuICBjb25zdCBrZXlMYWJlbCA9IGAke2xhYmVsfSBLZXlgOyAvLyBpMThuID9cclxuICBjb25zdCBhZGRpdGlvbmFsID0gc2NoZW1hLmhhc093blByb3BlcnR5KEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyk7XHJcblxyXG4gIGlmICghYWRkaXRpb25hbCkge1xyXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT57cHJvcHMuY2hpbGRyZW59PC9kaXY+O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy01IGZvcm0tYWRkaXRpb25hbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbCBsYWJlbD17a2V5TGFiZWx9IHJlcXVpcmVkPXtyZXF1aXJlZH0gaWQ9e2Ake2lkfS1rZXlgfSAvPlxyXG4gICAgICAgICAgICA8TGFiZWxJbnB1dFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgICAgICAgICByZXF1aXJlZD17cmVxdWlyZWR9XHJcbiAgICAgICAgICAgICAgaWQ9e2Ake2lkfS1rZXlgfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbktleUNoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hZGRpdGlvbmFsIGZvcm0tZ3JvdXAgY29sLXhzLTVcIj5cclxuICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0yXCI+XHJcbiAgICAgICAgICA8SWNvbkJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiZGFuZ2VyXCJcclxuICAgICAgICAgICAgaWNvbj1cInJlbW92ZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tcmVtb3ZlIGJ0bi1ibG9ja1wiXHJcbiAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBib3JkZXI6IFwiMFwiIH19XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCByZWFkb25seX1cclxuICAgICAgICAgICAgb25DbGljaz17b25Ecm9wUHJvcGVydHlDbGljayhsYWJlbCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNjaGVtYUZpZWxkUmVuZGVyKHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgdWlTY2hlbWEsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIGVycm9yU2NoZW1hLFxyXG4gICAgaWRQcmVmaXgsXHJcbiAgICBpZFNlcGFyYXRvcixcclxuICAgIG5hbWUsXHJcbiAgICBvbkNoYW5nZSxcclxuICAgIG9uS2V5Q2hhbmdlLFxyXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgIHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQgPSBmYWxzZSxcclxuICB9ID0gcHJvcHM7XHJcbiAgY29uc3QgeyByb290U2NoZW1hLCBmaWVsZHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcclxuICBjb25zdCBGaWVsZFRlbXBsYXRlID1cclxuICAgIHVpU2NoZW1hW1widWk6RmllbGRUZW1wbGF0ZVwiXSB8fCByZWdpc3RyeS5GaWVsZFRlbXBsYXRlIHx8IERlZmF1bHRUZW1wbGF0ZTtcclxuICBsZXQgaWRTY2hlbWEgPSBwcm9wcy5pZFNjaGVtYTtcclxuICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShwcm9wcy5zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICBpZFNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcclxuICAgIHRvSWRTY2hlbWEoc2NoZW1hLCBudWxsLCByb290U2NoZW1hLCBmb3JtRGF0YSwgaWRQcmVmaXgsIGlkU2VwYXJhdG9yKSxcclxuICAgIGlkU2NoZW1hXHJcbiAgKTtcclxuICBjb25zdCBGaWVsZENvbXBvbmVudCA9IGdldEZpZWxkQ29tcG9uZW50KHNjaGVtYSwgdWlTY2hlbWEsIGlkU2NoZW1hLCBmaWVsZHMpO1xyXG4gIGNvbnN0IHsgRGVzY3JpcHRpb25GaWVsZCB9ID0gZmllbGRzO1xyXG4gIGNvbnN0IGRpc2FibGVkID0gQm9vbGVhbihwcm9wcy5kaXNhYmxlZCB8fCB1aVNjaGVtYVtcInVpOmRpc2FibGVkXCJdKTtcclxuICBjb25zdCByZWFkb25seSA9IEJvb2xlYW4oXHJcbiAgICBwcm9wcy5yZWFkb25seSB8fFxyXG4gICAgICB1aVNjaGVtYVtcInVpOnJlYWRvbmx5XCJdIHx8XHJcbiAgICAgIHByb3BzLnNjaGVtYS5yZWFkT25seSB8fFxyXG4gICAgICBzY2hlbWEucmVhZE9ubHlcclxuICApO1xyXG4gIGNvbnN0IGF1dG9mb2N1cyA9IEJvb2xlYW4ocHJvcHMuYXV0b2ZvY3VzIHx8IHVpU2NoZW1hW1widWk6YXV0b2ZvY3VzXCJdKTtcclxuICBpZiAoT2JqZWN0LmtleXMoc2NoZW1hKS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcGxheUxhYmVsID0gZ2V0RGlzcGxheUxhYmVsKHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEpO1xyXG5cclxuICBjb25zdCB7IF9fZXJyb3JzLCAuLi5maWVsZEVycm9yU2NoZW1hIH0gPSBlcnJvclNjaGVtYTtcclxuXHJcbiAgLy8gU2VlICM0Mzk6IHVpU2NoZW1hOiBEb24ndCBwYXNzIGNvbnN1bWVkIGNsYXNzIG5hbWVzIHRvIGNoaWxkIGNvbXBvbmVudHNcclxuICBjb25zdCBmaWVsZCA9IChcclxuICAgIDxGaWVsZENvbXBvbmVudFxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgIHVpU2NoZW1hPXt7IC4uLnVpU2NoZW1hLCBjbGFzc05hbWVzOiB1bmRlZmluZWQgfX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICBlcnJvclNjaGVtYT17ZmllbGRFcnJvclNjaGVtYX1cclxuICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICByYXdFcnJvcnM9e19fZXJyb3JzfVxyXG4gICAgLz5cclxuICApO1xyXG5cclxuICBjb25zdCBpZCA9IGlkU2NoZW1hLiRpZDtcclxuXHJcbiAgLy8gSWYgdGhpcyBzY2hlbWEgaGFzIGEgdGl0bGUgZGVmaW5lZCwgYnV0IHRoZSB1c2VyIGhhcyBzZXQgYSBuZXcga2V5L2xhYmVsLCByZXRhaW4gdGhlaXIgaW5wdXQuXHJcbiAgbGV0IGxhYmVsO1xyXG4gIGlmICh3YXNQcm9wZXJ0eUtleU1vZGlmaWVkKSB7XHJcbiAgICBsYWJlbCA9IG5hbWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxhYmVsID0gdWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCBwcm9wcy5zY2hlbWEudGl0bGUgfHwgc2NoZW1hLnRpdGxlIHx8IG5hbWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZXNjcmlwdGlvbiA9XHJcbiAgICB1aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8XHJcbiAgICBwcm9wcy5zY2hlbWEuZGVzY3JpcHRpb24gfHxcclxuICAgIHNjaGVtYS5kZXNjcmlwdGlvbjtcclxuICBjb25zdCBlcnJvcnMgPSBfX2Vycm9ycztcclxuICBjb25zdCBoZWxwID0gdWlTY2hlbWFbXCJ1aTpoZWxwXCJdO1xyXG4gIGNvbnN0IGhpZGRlbiA9IHVpU2NoZW1hW1widWk6d2lkZ2V0XCJdID09PSBcImhpZGRlblwiO1xyXG4gIGNvbnN0IGNsYXNzTmFtZXMgPSBbXHJcbiAgICBcImZvcm0tZ3JvdXBcIixcclxuICAgIFwiZmllbGRcIixcclxuICAgIGBmaWVsZC0ke3NjaGVtYS50eXBlfWAsXHJcbiAgICBlcnJvcnMgJiYgZXJyb3JzLmxlbmd0aCA+IDAgPyBcImZpZWxkLWVycm9yIGhhcy1lcnJvciBoYXMtZGFuZ2VyXCIgOiBcIlwiLFxyXG4gICAgdWlTY2hlbWEuY2xhc3NOYW1lcyxcclxuICBdXHJcbiAgICAuam9pbihcIiBcIilcclxuICAgIC50cmltKCk7XHJcblxyXG4gIGNvbnN0IGZpZWxkUHJvcHMgPSB7XHJcbiAgICBkZXNjcmlwdGlvbjogKFxyXG4gICAgICA8RGVzY3JpcHRpb25GaWVsZFxyXG4gICAgICAgIGlkPXtpZCArIFwiX19kZXNjcmlwdGlvblwifVxyXG4gICAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICBmb3JtQ29udGV4dD17Zm9ybUNvbnRleHR9XHJcbiAgICAgIC8+XHJcbiAgICApLFxyXG4gICAgcmF3RGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgaGVscDogPEhlbHAgaWQ9e2lkICsgXCJfX2hlbHBcIn0gaGVscD17aGVscH0gLz4sXHJcbiAgICByYXdIZWxwOiB0eXBlb2YgaGVscCA9PT0gXCJzdHJpbmdcIiA/IGhlbHAgOiB1bmRlZmluZWQsXHJcbiAgICBlcnJvcnM6IDxFcnJvckxpc3QgZXJyb3JzPXtlcnJvcnN9IC8+LFxyXG4gICAgcmF3RXJyb3JzOiBlcnJvcnMsXHJcbiAgICBpZCxcclxuICAgIGxhYmVsLFxyXG4gICAgaGlkZGVuLFxyXG4gICAgb25DaGFuZ2UsXHJcbiAgICBvbktleUNoYW5nZSxcclxuICAgIG9uRHJvcFByb3BlcnR5Q2xpY2ssXHJcbiAgICByZXF1aXJlZCxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgcmVhZG9ubHksXHJcbiAgICBkaXNwbGF5TGFiZWwsXHJcbiAgICBjbGFzc05hbWVzLFxyXG4gICAgZm9ybUNvbnRleHQsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIGZpZWxkcyxcclxuICAgIHNjaGVtYSxcclxuICAgIHVpU2NoZW1hLFxyXG4gICAgcmVnaXN0cnksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgX0FueU9mRmllbGQgPSByZWdpc3RyeS5maWVsZHMuQW55T2ZGaWVsZDtcclxuICBjb25zdCBfT25lT2ZGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5PbmVPZkZpZWxkO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZpZWxkVGVtcGxhdGUgey4uLmZpZWxkUHJvcHN9PlxyXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAge2ZpZWxkfVxyXG5cclxuICAgICAgICB7LypcclxuICAgICAgICBJZiB0aGUgc2NoZW1hIGBhbnlPZmAgb3IgJ29uZU9mJyBjYW4gYmUgcmVuZGVyZWQgYXMgYSBzZWxlY3QgY29udHJvbCwgZG9uJ3RcclxuICAgICAgICByZW5kZXIgdGhlIHNlbGVjdGlvbiBhbmQgbGV0IGBTdHJpbmdGaWVsZGAgY29tcG9uZW50IGhhbmRsZVxyXG4gICAgICAgIHJlbmRlcmluZ1xyXG4gICAgICAqL31cclxuICAgICAgICB7c2NoZW1hLmFueU9mICYmICFpc1NlbGVjdChzY2hlbWEpICYmIChcclxuICAgICAgICAgIDxfQW55T2ZGaWVsZFxyXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxyXG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgb25CbHVyPXtwcm9wcy5vbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgb25Gb2N1cz17cHJvcHMub25Gb2N1c31cclxuICAgICAgICAgICAgb3B0aW9ucz17c2NoZW1hLmFueU9mLm1hcChfc2NoZW1hID0+XHJcbiAgICAgICAgICAgICAgcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIGJhc2VUeXBlPXtzY2hlbWEudHlwZX1cclxuICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7c2NoZW1hLm9uZU9mICYmICFpc1NlbGVjdChzY2hlbWEpICYmIChcclxuICAgICAgICAgIDxfT25lT2ZGaWVsZFxyXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxyXG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgb25CbHVyPXtwcm9wcy5vbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgb25Gb2N1cz17cHJvcHMub25Gb2N1c31cclxuICAgICAgICAgICAgb3B0aW9ucz17c2NoZW1hLm9uZU9mLm1hcChfc2NoZW1hID0+XHJcbiAgICAgICAgICAgICAgcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIGJhc2VUeXBlPXtzY2hlbWEudHlwZX1cclxuICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgPC9GaWVsZFRlbXBsYXRlPlxyXG4gICk7XHJcbn1cclxuXHJcbmNsYXNzIFNjaGVtYUZpZWxkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiAhZGVlcEVxdWFscyh0aGlzLnByb3BzLCBuZXh0UHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIFNjaGVtYUZpZWxkUmVuZGVyKHRoaXMucHJvcHMpO1xyXG4gIH1cclxufVxyXG5cclxuU2NoZW1hRmllbGQuZGVmYXVsdFByb3BzID0ge1xyXG4gIHVpU2NoZW1hOiB7fSxcclxuICBlcnJvclNjaGVtYToge30sXHJcbiAgaWRTY2hlbWE6IHt9LFxyXG4gIGRpc2FibGVkOiBmYWxzZSxcclxuICByZWFkb25seTogZmFsc2UsXHJcbiAgYXV0b2ZvY3VzOiBmYWxzZSxcclxufTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBTY2hlbWFGaWVsZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIHVpU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgaWRTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBmb3JtRGF0YTogUHJvcFR5cGVzLmFueSxcclxuICAgIGVycm9yU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgcmVnaXN0cnk6IHR5cGVzLnJlZ2lzdHJ5LmlzUmVxdWlyZWQsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2NoZW1hRmllbGQ7XHJcbiJdfQ==