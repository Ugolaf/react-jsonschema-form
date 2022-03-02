"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

var _excluded = ["__errors"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var componentName = COMPONENT_TYPES[(0, _utils.getSchemaType)(schema)]; // If the type is not defined and the schema uses 'anyOf' or 'oneOf', don't
  // render a field and let the MultiSchemaField component handle the form display

  if (!componentName && (schema.anyOf || schema.oneOf)) {
    return function () {
      return null;
    };
  }

  return componentName in fields ? fields[componentName] : function () {
    var UnsupportedField = fields.UnsupportedField;
    return /*#__PURE__*/_react.default.createElement(UnsupportedField, {
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

  return /*#__PURE__*/_react.default.createElement("label", {
    className: "control-label",
    htmlFor: id
  }, label, required && /*#__PURE__*/_react.default.createElement("span", {
    className: "required"
  }, REQUIRED_FIELD_SYMBOL));
}

function LabelInput(props) {
  var id = props.id,
      label = props.label,
      onChange = props.onChange;
  return /*#__PURE__*/_react.default.createElement("input", {
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
    return /*#__PURE__*/_react.default.createElement("p", {
      id: id,
      className: "help-block"
    }, help);
  }

  return /*#__PURE__*/_react.default.createElement("div", {
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

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("ul", {
    className: "error-detail bs-callout bs-callout-info"
  }, errors.filter(function (elem) {
    return !!elem;
  }).map(function (error, index) {
    return /*#__PURE__*/_react.default.createElement("li", {
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
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "hidden"
    }, children);
  }

  return /*#__PURE__*/_react.default.createElement(WrapIfAdditional, props, displayLabel && /*#__PURE__*/_react.default.createElement(Label, {
    label: label,
    required: required,
    id: id
  }), displayLabel && description ? description : null, children, errors, help);
}

if (process.env.NODE_ENV !== "production") {
  DefaultTemplate.propTypes = {
    id: _propTypes.default.string,
    classNames: _propTypes.default.string,
    label: _propTypes.default.string,
    children: _propTypes.default.node.isRequired,
    errors: _propTypes.default.element,
    rawErrors: _propTypes.default.arrayOf(_propTypes.default.string),
    help: _propTypes.default.element,
    rawHelp: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
    description: _propTypes.default.element,
    rawDescription: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
    hidden: _propTypes.default.bool,
    required: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    displayLabel: _propTypes.default.bool,
    fields: _propTypes.default.object,
    formContext: _propTypes.default.object
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
    return /*#__PURE__*/_react.default.createElement("div", {
      className: classNames
    }, props.children);
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classNames
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-xs-5 form-additional"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement(Label, {
    label: keyLabel,
    required: required,
    id: "".concat(id, "-key")
  }), /*#__PURE__*/_react.default.createElement(LabelInput, {
    label: label,
    required: required,
    id: "".concat(id, "-key"),
    onChange: onKeyChange
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-additional form-group col-xs-5"
  }, props.children), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-xs-2"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
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
      fieldErrorSchema = _objectWithoutProperties(errorSchema, _excluded); // See #439: uiSchema: Don't pass consumed class names to child components


  var field = /*#__PURE__*/_react.default.createElement(FieldComponent, _extends({}, props, {
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
    description: /*#__PURE__*/_react.default.createElement(DescriptionField, {
      id: id + "__description",
      description: description,
      formContext: formContext
    }),
    rawDescription: description,
    help: /*#__PURE__*/_react.default.createElement(Help, {
      id: id + "__help",
      help: help
    }),
    rawHelp: typeof help === "string" ? help : undefined,
    errors: /*#__PURE__*/_react.default.createElement(ErrorList, {
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
  return /*#__PURE__*/_react.default.createElement(FieldTemplate, fieldProps, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, field, schema.anyOf && !(0, _utils.isSelect)(schema) && /*#__PURE__*/_react.default.createElement(_AnyOfField, {
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
  }), schema.oneOf && !(0, _utils.isSelect)(schema) && /*#__PURE__*/_react.default.createElement(_OneOfField, {
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
      return !(0, _utils.deepEquals)(this.props, nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      return SchemaFieldRender(this.props);
    }
  }]);

  return SchemaField;
}(_react.default.Component);

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
    schema: _propTypes.default.object.isRequired,
    uiSchema: _propTypes.default.object,
    idSchema: _propTypes.default.object,
    formData: _propTypes.default.any,
    errorSchema: _propTypes.default.object,
    registry: types.registry.isRequired
  };
}

var _default = SchemaField;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TY2hlbWFGaWVsZC5qcyJdLCJuYW1lcyI6WyJSRVFVSVJFRF9GSUVMRF9TWU1CT0wiLCJDT01QT05FTlRfVFlQRVMiLCJhcnJheSIsImJvb2xlYW4iLCJpbnRlZ2VyIiwibnVtYmVyIiwib2JqZWN0Iiwic3RyaW5nIiwibnVsbCIsImdldEZpZWxkQ29tcG9uZW50Iiwic2NoZW1hIiwidWlTY2hlbWEiLCJpZFNjaGVtYSIsImZpZWxkcyIsImZpZWxkIiwiY29tcG9uZW50TmFtZSIsImFueU9mIiwib25lT2YiLCJVbnN1cHBvcnRlZEZpZWxkIiwidHlwZSIsIkxhYmVsIiwicHJvcHMiLCJsYWJlbCIsInJlcXVpcmVkIiwiaWQiLCJMYWJlbElucHV0Iiwib25DaGFuZ2UiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiSGVscCIsImhlbHAiLCJFcnJvckxpc3QiLCJlcnJvcnMiLCJsZW5ndGgiLCJmaWx0ZXIiLCJlbGVtIiwibWFwIiwiZXJyb3IiLCJpbmRleCIsIkRlZmF1bHRUZW1wbGF0ZSIsImNoaWxkcmVuIiwiZGVzY3JpcHRpb24iLCJoaWRkZW4iLCJkaXNwbGF5TGFiZWwiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjbGFzc05hbWVzIiwibm9kZSIsImlzUmVxdWlyZWQiLCJlbGVtZW50IiwicmF3RXJyb3JzIiwiYXJyYXlPZiIsInJhd0hlbHAiLCJvbmVPZlR5cGUiLCJyYXdEZXNjcmlwdGlvbiIsImJvb2wiLCJyZWFkb25seSIsImZvcm1Db250ZXh0IiwiZGVmYXVsdFByb3BzIiwiV3JhcElmQWRkaXRpb25hbCIsImRpc2FibGVkIiwib25LZXlDaGFuZ2UiLCJvbkRyb3BQcm9wZXJ0eUNsaWNrIiwia2V5TGFiZWwiLCJhZGRpdGlvbmFsIiwiaGFzT3duUHJvcGVydHkiLCJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJib3JkZXIiLCJTY2hlbWFGaWVsZFJlbmRlciIsImZvcm1EYXRhIiwiZXJyb3JTY2hlbWEiLCJpZFByZWZpeCIsImlkU2VwYXJhdG9yIiwibmFtZSIsInJlZ2lzdHJ5Iiwid2FzUHJvcGVydHlLZXlNb2RpZmllZCIsInJvb3RTY2hlbWEiLCJGaWVsZFRlbXBsYXRlIiwiRmllbGRDb21wb25lbnQiLCJEZXNjcmlwdGlvbkZpZWxkIiwiQm9vbGVhbiIsInJlYWRPbmx5IiwiYXV0b2ZvY3VzIiwiT2JqZWN0Iiwia2V5cyIsIl9fZXJyb3JzIiwiZmllbGRFcnJvclNjaGVtYSIsInVuZGVmaW5lZCIsIiRpZCIsInRpdGxlIiwiam9pbiIsInRyaW0iLCJmaWVsZFByb3BzIiwiX0FueU9mRmllbGQiLCJBbnlPZkZpZWxkIiwiX09uZU9mRmllbGQiLCJPbmVPZkZpZWxkIiwib25CbHVyIiwib25Gb2N1cyIsIl9zY2hlbWEiLCJTY2hlbWFGaWVsZCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiYW55IiwidHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxJQUFNQSxxQkFBcUIsR0FBRyxHQUE5QjtBQUNBLElBQU1DLGVBQWUsR0FBRztBQUN0QkMsRUFBQUEsS0FBSyxFQUFFLFlBRGU7QUFFdEJDLEVBQUFBLE9BQU8sRUFBRSxjQUZhO0FBR3RCQyxFQUFBQSxPQUFPLEVBQUUsYUFIYTtBQUl0QkMsRUFBQUEsTUFBTSxFQUFFLGFBSmM7QUFLdEJDLEVBQUFBLE1BQU0sRUFBRSxhQUxjO0FBTXRCQyxFQUFBQSxNQUFNLEVBQUUsYUFOYztBQU90QkMsRUFBQUEsSUFBSSxFQUFFO0FBUGdCLENBQXhCOztBQVVBLFNBQVNDLGlCQUFULENBQTJCQyxNQUEzQixFQUFtQ0MsUUFBbkMsRUFBNkNDLFFBQTdDLEVBQXVEQyxNQUF2RCxFQUErRDtBQUM3RCxNQUFNQyxLQUFL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QUFBLFNBQVMsRUFBRTtBQU5jLENBQTNCOztBQVNBLElBQUl6QyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q3lELEVBQUFBLFdBQVcsQ0FBQ3hELFNBQVosR0FBd0I7QUFDdEJ0QyxJQUFBQSxNQUFNLEVBQUV1QyxtQkFBVTNDLE1BQVYsQ0FBaUI4QyxVQURIO0FBRXRCekMsSUFBQUEsUUFBUSxFQUFFc0MsbUJBQVUzQyxNQUZFO0FBR3RCTSxJQUFBQSxRQUFRLEVBQUVxQyxtQkFBVTNDLE1BSEU7QUFJdEJtRSxJQUFBQSxRQUFRLEVBQUV4QixtQkFBVTRELEdBSkU7QUFLdEJuQyxJQUFBQSxXQUFXLEVBQUV6QixtQkFBVTNDLE1BTEQ7QUFNdEJ3RSxJQUFBQSxRQUFRLEVBQUVnQyxLQUFLLENBQUNoQyxRQUFOLENBQWUxQjtBQU5ILEdBQXhCO0FBUUQ7O2VBRWNvRCxXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEljb25CdXR0b24gZnJvbSBcIi4uL0ljb25CdXR0b25cIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICBBRERJVElPTkFMX1BST1BFUlRZX0ZMQUcsXHJcbiAgaXNTZWxlY3QsXHJcbiAgcmV0cmlldmVTY2hlbWEsXHJcbiAgdG9JZFNjaGVtYSxcclxuICBnZXREZWZhdWx0UmVnaXN0cnksXHJcbiAgbWVyZ2VPYmplY3RzLFxyXG4gIGRlZXBFcXVhbHMsXHJcbiAgZ2V0U2NoZW1hVHlwZSxcclxuICBnZXREaXNwbGF5TGFiZWwsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5jb25zdCBSRVFVSVJFRF9GSUVMRF9TWU1CT0wgPSBcIipcIjtcclxuY29uc3QgQ09NUE9ORU5UX1RZUEVTID0ge1xyXG4gIGFycmF5OiBcIkFycmF5RmllbGRcIixcclxuICBib29sZWFuOiBcIkJvb2xlYW5GaWVsZFwiLFxyXG4gIGludGVnZXI6IFwiTnVtYmVyRmllbGRcIixcclxuICBudW1iZXI6IFwiTnVtYmVyRmllbGRcIixcclxuICBvYmplY3Q6IFwiT2JqZWN0RmllbGRcIixcclxuICBzdHJpbmc6IFwiU3RyaW5nRmllbGRcIixcclxuICBudWxsOiBcIk51bGxGaWVsZFwiLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0RmllbGRDb21wb25lbnQoc2NoZW1hLCB1aVNjaGVtYSwgaWRTY2hlbWEsIGZpZWxkcykge1xyXG4gIGNvbnN0IGZpZWxkID0gdWlTY2hlbWFbXCJ1aTpmaWVsZFwiXTtcclxuICBpZiAodHlwZW9mIGZpZWxkID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHJldHVybiBmaWVsZDtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJzdHJpbmdcIiAmJiBmaWVsZCBpbiBmaWVsZHMpIHtcclxuICAgIHJldHVybiBmaWVsZHNbZmllbGRdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tcG9uZW50TmFtZSA9IENPTVBPTkVOVF9UWVBFU1tnZXRTY2hlbWFUeXBlKHNjaGVtYSldO1xyXG5cclxuICAvLyBJZiB0aGUgdHlwZSBpcyBub3QgZGVmaW5lZCBhbmQgdGhlIHNjaGVtYSB1c2VzICdhbnlPZicgb3IgJ29uZU9mJywgZG9uJ3RcclxuICAvLyByZW5kZXIgYSBmaWVsZCBhbmQgbGV0IHRoZSBNdWx0aVNjaGVtYUZpZWxkIGNvbXBvbmVudCBoYW5kbGUgdGhlIGZvcm0gZGlzcGxheVxyXG4gIGlmICghY29tcG9uZW50TmFtZSAmJiAoc2NoZW1hLmFueU9mIHx8IHNjaGVtYS5vbmVPZikpIHtcclxuICAgIHJldHVybiAoKSA9PiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNvbXBvbmVudE5hbWUgaW4gZmllbGRzXHJcbiAgICA/IGZpZWxkc1tjb21wb25lbnROYW1lXVxyXG4gICAgOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBVbnN1cHBvcnRlZEZpZWxkIH0gPSBmaWVsZHM7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8VW5zdXBwb3J0ZWRGaWVsZFxyXG4gICAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgICByZWFzb249e2BVbmtub3duIGZpZWxkIHR5cGUgJHtzY2hlbWEudHlwZX1gfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBMYWJlbChwcm9wcykge1xyXG4gIGNvbnN0IHsgbGFiZWwsIHJlcXVpcmVkLCBpZCB9ID0gcHJvcHM7XHJcbiAgaWYgKCFsYWJlbCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiIGh0bWxGb3I9e2lkfT5cclxuICAgICAge2xhYmVsfVxyXG4gICAgICB7cmVxdWlyZWQgJiYgPHNwYW4gY2xhc3NOYW1lPVwicmVxdWlyZWRcIj57UkVRVUlSRURfRklFTERfU1lNQk9MfTwvc3Bhbj59XHJcbiAgICA8L2xhYmVsPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIExhYmVsSW5wdXQocHJvcHMpIHtcclxuICBjb25zdCB7IGlkLCBsYWJlbCwgb25DaGFuZ2UgfSA9IHByb3BzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8aW5wdXRcclxuICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICBpZD17aWR9XHJcbiAgICAgIG9uQmx1cj17ZXZlbnQgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgZGVmYXVsdFZhbHVlPXtsYWJlbH1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gSGVscChwcm9wcykge1xyXG4gIGNvbnN0IHsgaWQsIGhlbHAgfSA9IHByb3BzO1xyXG4gIGlmICghaGVscCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgaGVscCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHAgaWQ9e2lkfSBjbGFzc05hbWU9XCJoZWxwLWJsb2NrXCI+XHJcbiAgICAgICAge2hlbHB9XHJcbiAgICAgIDwvcD5cclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGlkPXtpZH0gY2xhc3NOYW1lPVwiaGVscC1ibG9ja1wiPlxyXG4gICAgICB7aGVscH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEVycm9yTGlzdChwcm9wcykge1xyXG4gIGNvbnN0IHsgZXJyb3JzID0gW10gfSA9IHByb3BzO1xyXG4gIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZXJyb3ItZGV0YWlsIGJzLWNhbGxvdXQgYnMtY2FsbG91dC1pbmZvXCI+XHJcbiAgICAgICAge2Vycm9yc1xyXG4gICAgICAgICAgLmZpbHRlcihlbGVtID0+ICEhZWxlbSlcclxuICAgICAgICAgIC5tYXAoKGVycm9yLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAge2Vycm9yfVxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gRGVmYXVsdFRlbXBsYXRlKHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgaWQsXHJcbiAgICBsYWJlbCxcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgZXJyb3JzLFxyXG4gICAgaGVscCxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgaGlkZGVuLFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICBkaXNwbGF5TGFiZWwsXHJcbiAgfSA9IHByb3BzO1xyXG4gIGlmIChoaWRkZW4pIHtcclxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlblwiPntjaGlsZHJlbn08L2Rpdj47XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFdyYXBJZkFkZGl0aW9uYWwgey4uLnByb3BzfT5cclxuICAgICAge2Rpc3BsYXlMYWJlbCAmJiA8TGFiZWwgbGFiZWw9e2xhYmVsfSByZXF1aXJlZD17cmVxdWlyZWR9IGlkPXtpZH0gLz59XHJcbiAgICAgIHtkaXNwbGF5TGFiZWwgJiYgZGVzY3JpcHRpb24gPyBkZXNjcmlwdGlvbiA6IG51bGx9XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAge2Vycm9yc31cclxuICAgICAge2hlbHB9XHJcbiAgICA8L1dyYXBJZkFkZGl0aW9uYWw+XHJcbiAgKTtcclxufVxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgRGVmYXVsdFRlbXBsYXRlLnByb3BUeXBlcyA9IHtcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgY2xhc3NOYW1lczogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcbiAgICBlcnJvcnM6IFByb3BUeXBlcy5lbGVtZW50LFxyXG4gICAgcmF3RXJyb3JzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcclxuICAgIGhlbHA6IFByb3BUeXBlcy5lbGVtZW50LFxyXG4gICAgcmF3SGVscDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuZWxlbWVudCxcclxuICAgIHJhd0Rlc2NyaXB0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gICAgaGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc3BsYXlMYWJlbDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBmb3JtQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdCxcclxuICB9O1xyXG59XHJcblxyXG5EZWZhdWx0VGVtcGxhdGUuZGVmYXVsdFByb3BzID0ge1xyXG4gIGhpZGRlbjogZmFsc2UsXHJcbiAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gIHJlcXVpcmVkOiBmYWxzZSxcclxuICBkaXNwbGF5TGFiZWw6IHRydWUsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBXcmFwSWZBZGRpdGlvbmFsKHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgaWQsXHJcbiAgICBjbGFzc05hbWVzLFxyXG4gICAgZGlzYWJsZWQsXHJcbiAgICBsYWJlbCxcclxuICAgIG9uS2V5Q2hhbmdlLFxyXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcclxuICAgIHJlYWRvbmx5LFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICBzY2hlbWEsXHJcbiAgfSA9IHByb3BzO1xyXG4gIGNvbnN0IGtleUxhYmVsID0gYCR7bGFiZWx9IEtleWA7IC8vIGkxOG4gP1xyXG4gIGNvbnN0IGFkZGl0aW9uYWwgPSBzY2hlbWEuaGFzT3duUHJvcGVydHkoQURESVRJT05BTF9QUk9QRVJUWV9GTEFHKTtcclxuXHJcbiAgaWYgKCFhZGRpdGlvbmFsKSB7XHJcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXN9Pntwcm9wcy5jaGlsZHJlbn08L2Rpdj47XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXN9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTUgZm9ybS1hZGRpdGlvbmFsXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPExhYmVsIGxhYmVsPXtrZXlMYWJlbH0gcmVxdWlyZWQ9e3JlcXVpcmVkfSBpZD17YCR7aWR9LWtleWB9IC8+XHJcbiAgICAgICAgICAgIDxMYWJlbElucHV0XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2xhYmVsfVxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgICAgICAgICBpZD17YCR7aWR9LWtleWB9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uS2V5Q2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWFkZGl0aW9uYWwgZm9ybS1ncm91cCBjb2wteHMtNVwiPlxyXG4gICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTJcIj5cclxuICAgICAgICAgIDxJY29uQnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJkYW5nZXJcIlxyXG4gICAgICAgICAgICBpY29uPVwicmVtb3ZlXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXJyYXktaXRlbS1yZW1vdmUgYnRuLWJsb2NrXCJcclxuICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJvcmRlcjogXCIwXCIgfX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHJlYWRvbmx5fVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkRyb3BQcm9wZXJ0eUNsaWNrKGxhYmVsKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gU2NoZW1hRmllbGRSZW5kZXIocHJvcHMpIHtcclxuICBjb25zdCB7XHJcbiAgICB1aVNjaGVtYSxcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgZXJyb3JTY2hlbWEsXHJcbiAgICBpZFByZWZpeCxcclxuICAgIGlkU2VwYXJhdG9yLFxyXG4gICAgbmFtZSxcclxuICAgIG9uQ2hhbmdlLFxyXG4gICAgb25LZXlDaGFuZ2UsXHJcbiAgICBvbkRyb3BQcm9wZXJ0eUNsaWNrLFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgd2FzUHJvcGVydHlLZXlNb2RpZmllZCA9IGZhbHNlLFxyXG4gIH0gPSBwcm9wcztcclxuICBjb25zdCB7IHJvb3RTY2hlbWEsIGZpZWxkcywgZm9ybUNvbnRleHQgfSA9IHJlZ2lzdHJ5O1xyXG4gIGNvbnN0IEZpZWxkVGVtcGxhdGUgPVxyXG4gICAgdWlTY2hlbWFbXCJ1aTpGaWVsZFRlbXBsYXRlXCJdIHx8IHJlZ2lzdHJ5LkZpZWxkVGVtcGxhdGUgfHwgRGVmYXVsdFRlbXBsYXRlO1xyXG4gIGxldCBpZFNjaGVtYSA9IHByb3BzLmlkU2NoZW1hO1xyXG4gIGNvbnN0IHNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHByb3BzLnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIGlkU2NoZW1hID0gbWVyZ2VPYmplY3RzKFxyXG4gICAgdG9JZFNjaGVtYShzY2hlbWEsIG51bGwsIHJvb3RTY2hlbWEsIGZvcm1EYXRhLCBpZFByZWZpeCwgaWRTZXBhcmF0b3IpLFxyXG4gICAgaWRTY2hlbWFcclxuICApO1xyXG4gIGNvbnN0IEZpZWxkQ29tcG9uZW50ID0gZ2V0RmllbGRDb21wb25lbnQoc2NoZW1hLCB1aVNjaGVtYSwgaWRTY2hlbWEsIGZpZWxkcyk7XHJcbiAgY29uc3QgeyBEZXNjcmlwdGlvbkZpZWxkIH0gPSBmaWVsZHM7XHJcbiAgY29uc3QgZGlzYWJsZWQgPSBCb29sZWFuKHByb3BzLmRpc2FibGVkIHx8IHVpU2NoZW1hW1widWk6ZGlzYWJsZWRcIl0pO1xyXG4gIGNvbnN0IHJlYWRvbmx5ID0gQm9vbGVhbihcclxuICAgIHByb3BzLnJlYWRvbmx5IHx8XHJcbiAgICAgIHVpU2NoZW1hW1widWk6cmVhZG9ubHlcIl0gfHxcclxuICAgICAgcHJvcHMuc2NoZW1hLnJlYWRPbmx5IHx8XHJcbiAgICAgIHNjaGVtYS5yZWFkT25seVxyXG4gICk7XHJcbiAgY29uc3QgYXV0b2ZvY3VzID0gQm9vbGVhbihwcm9wcy5hdXRvZm9jdXMgfHwgdWlTY2hlbWFbXCJ1aTphdXRvZm9jdXNcIl0pO1xyXG4gIGlmIChPYmplY3Qua2V5cyhzY2hlbWEpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwbGF5TGFiZWwgPSBnZXREaXNwbGF5TGFiZWwoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSk7XHJcblxyXG4gIGNvbnN0IHsgX19lcnJvcnMsIC4uLmZpZWxkRXJyb3JTY2hlbWEgfSA9IGVycm9yU2NoZW1hO1xyXG5cclxuICAvLyBTZWUgIzQzOTogdWlTY2hlbWE6IERvbid0IHBhc3MgY29uc3VtZWQgY2xhc3MgbmFtZXMgdG8gY2hpbGQgY29tcG9uZW50c1xyXG4gIGNvbnN0IGZpZWxkID0gKFxyXG4gICAgPEZpZWxkQ29tcG9uZW50XHJcbiAgICAgIHsuLi5wcm9wc31cclxuICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgdWlTY2hlbWE9e3sgLi4udWlTY2hlbWEsIGNsYXNzTmFtZXM6IHVuZGVmaW5lZCB9fVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgIGVycm9yU2NoZW1hPXtmaWVsZEVycm9yU2NoZW1hfVxyXG4gICAgICBmb3JtQ29udGV4dD17Zm9ybUNvbnRleHR9XHJcbiAgICAgIHJhd0Vycm9ycz17X19lcnJvcnN9XHJcbiAgICAvPlxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGlkID0gaWRTY2hlbWEuJGlkO1xyXG5cclxuICAvLyBJZiB0aGlzIHNjaGVtYSBoYXMgYSB0aXRsZSBkZWZpbmVkLCBidXQgdGhlIHVzZXIgaGFzIHNldCBhIG5ldyBrZXkvbGFiZWwsIHJldGFpbiB0aGVpciBpbnB1dC5cclxuICBsZXQgbGFiZWw7XHJcbiAgaWYgKHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQpIHtcclxuICAgIGxhYmVsID0gbmFtZTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGFiZWwgPSB1aVNjaGVtYVtcInVpOnRpdGxlXCJdIHx8IHByb3BzLnNjaGVtYS50aXRsZSB8fCBzY2hlbWEudGl0bGUgfHwgbmFtZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID1cclxuICAgIHVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHxcclxuICAgIHByb3BzLnNjaGVtYS5kZXNjcmlwdGlvbiB8fFxyXG4gICAgc2NoZW1hLmRlc2NyaXB0aW9uO1xyXG4gIGNvbnN0IGVycm9ycyA9IF9fZXJyb3JzO1xyXG4gIGNvbnN0IGhlbHAgPSB1aVNjaGVtYVtcInVpOmhlbHBcIl07XHJcbiAgY29uc3QgaGlkZGVuID0gdWlTY2hlbWFbXCJ1aTp3aWRnZXRcIl0gPT09IFwiaGlkZGVuXCI7XHJcbiAgY29uc3QgY2xhc3NOYW1lcyA9IFtcclxuICAgIFwiZm9ybS1ncm91cFwiLFxyXG4gICAgXCJmaWVsZFwiLFxyXG4gICAgYGZpZWxkLSR7c2NoZW1hLnR5cGV9YCxcclxuICAgIGVycm9ycyAmJiBlcnJvcnMubGVuZ3RoID4gMCA/IFwiZmllbGQtZXJyb3IgaGFzLWVycm9yIGhhcy1kYW5nZXJcIiA6IFwiXCIsXHJcbiAgICB1aVNjaGVtYS5jbGFzc05hbWVzLFxyXG4gIF1cclxuICAgIC5qb2luKFwiIFwiKVxyXG4gICAgLnRyaW0oKTtcclxuXHJcbiAgY29uc3QgZmllbGRQcm9wcyA9IHtcclxuICAgIGRlc2NyaXB0aW9uOiAoXHJcbiAgICAgIDxEZXNjcmlwdGlvbkZpZWxkXHJcbiAgICAgICAgaWQ9e2lkICsgXCJfX2Rlc2NyaXB0aW9uXCJ9XHJcbiAgICAgICAgZGVzY3JpcHRpb249e2Rlc2NyaXB0aW9ufVxyXG4gICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgLz5cclxuICAgICksXHJcbiAgICByYXdEZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICBoZWxwOiA8SGVscCBpZD17aWQgKyBcIl9faGVscFwifSBoZWxwPXtoZWxwfSAvPixcclxuICAgIHJhd0hlbHA6IHR5cGVvZiBoZWxwID09PSBcInN0cmluZ1wiID8gaGVscCA6IHVuZGVmaW5lZCxcclxuICAgIGVycm9yczogPEVycm9yTGlzdCBlcnJvcnM9e2Vycm9yc30gLz4sXHJcbiAgICByYXdFcnJvcnM6IGVycm9ycyxcclxuICAgIGlkLFxyXG4gICAgbGFiZWwsXHJcbiAgICBoaWRkZW4sXHJcbiAgICBvbkNoYW5nZSxcclxuICAgIG9uS2V5Q2hhbmdlLFxyXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgZGlzYWJsZWQsXHJcbiAgICByZWFkb25seSxcclxuICAgIGRpc3BsYXlMYWJlbCxcclxuICAgIGNsYXNzTmFtZXMsXHJcbiAgICBmb3JtQ29udGV4dCxcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgZmllbGRzLFxyXG4gICAgc2NoZW1hLFxyXG4gICAgdWlTY2hlbWEsXHJcbiAgICByZWdpc3RyeSxcclxuICB9O1xyXG5cclxuICBjb25zdCBfQW55T2ZGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5BbnlPZkZpZWxkO1xyXG4gIGNvbnN0IF9PbmVPZkZpZWxkID0gcmVnaXN0cnkuZmllbGRzLk9uZU9mRmllbGQ7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8RmllbGRUZW1wbGF0ZSB7Li4uZmllbGRQcm9wc30+XHJcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICB7ZmllbGR9XHJcblxyXG4gICAgICAgIHsvKlxyXG4gICAgICAgIElmIHRoZSBzY2hlbWEgYGFueU9mYCBvciAnb25lT2YnIGNhbiBiZSByZW5kZXJlZCBhcyBhIHNlbGVjdCBjb250cm9sLCBkb24ndFxyXG4gICAgICAgIHJlbmRlciB0aGUgc2VsZWN0aW9uIGFuZCBsZXQgYFN0cmluZ0ZpZWxkYCBjb21wb25lbnQgaGFuZGxlXHJcbiAgICAgICAgcmVuZGVyaW5nXHJcbiAgICAgICovfVxyXG4gICAgICAgIHtzY2hlbWEuYW55T2YgJiYgIWlzU2VsZWN0KHNjaGVtYSkgJiYgKFxyXG4gICAgICAgICAgPF9BbnlPZkZpZWxkXHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hfVxyXG4gICAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XHJcbiAgICAgICAgICAgIGlkUHJlZml4PXtpZFByZWZpeH1cclxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgICBvbkJsdXI9e3Byb3BzLm9uQmx1cn1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3Byb3BzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXtwcm9wcy5vbkZvY3VzfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtzY2hlbWEuYW55T2YubWFwKF9zY2hlbWEgPT5cclxuICAgICAgICAgICAgICByZXRyaWV2ZVNjaGVtYShfc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgYmFzZVR5cGU9e3NjaGVtYS50eXBlfVxyXG4gICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHtzY2hlbWEub25lT2YgJiYgIWlzU2VsZWN0KHNjaGVtYSkgJiYgKFxyXG4gICAgICAgICAgPF9PbmVPZkZpZWxkXHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hfVxyXG4gICAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XHJcbiAgICAgICAgICAgIGlkUHJlZml4PXtpZFByZWZpeH1cclxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgICBvbkJsdXI9e3Byb3BzLm9uQmx1cn1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3Byb3BzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXtwcm9wcy5vbkZvY3VzfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtzY2hlbWEub25lT2YubWFwKF9zY2hlbWEgPT5cclxuICAgICAgICAgICAgICByZXRyaWV2ZVNjaGVtYShfc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgYmFzZVR5cGU9e3NjaGVtYS50eXBlfVxyXG4gICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICA8L0ZpZWxkVGVtcGxhdGU+XHJcbiAgKTtcclxufVxyXG5cclxuY2xhc3MgU2NoZW1hRmllbGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgcmV0dXJuICFkZWVwRXF1YWxzKHRoaXMucHJvcHMsIG5leHRQcm9wcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gU2NoZW1hRmllbGRSZW5kZXIodGhpcy5wcm9wcyk7XHJcbiAgfVxyXG59XHJcblxyXG5TY2hlbWFGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgdWlTY2hlbWE6IHt9LFxyXG4gIGVycm9yU2NoZW1hOiB7fSxcclxuICBpZFNjaGVtYToge30sXHJcbiAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gIHJlYWRvbmx5OiBmYWxzZSxcclxuICBhdXRvZm9jdXM6IGZhbHNlLFxyXG59O1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIFNjaGVtYUZpZWxkLnByb3BUeXBlcyA9IHtcclxuICAgIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBpZFNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGZvcm1EYXRhOiBQcm9wVHlwZXMuYW55LFxyXG4gICAgZXJyb3JTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICByZWdpc3RyeTogdHlwZXMucmVnaXN0cnkuaXNSZXF1aXJlZCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2hlbWFGaWVsZDtcclxuIl19