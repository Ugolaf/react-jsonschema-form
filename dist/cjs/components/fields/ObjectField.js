"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AddButton = _interopRequireDefault(require("../AddButton"));

var _react = _interopRequireWildcard(require("react"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DefaultObjectFieldTemplate(props) {
  var TitleField = props.TitleField,
      DescriptionField = props.DescriptionField;
  return _react["default"].createElement("fieldset", {
    id: props.idSchema.$id
  }, (props.uiSchema["ui:title"] || props.title) && _react["default"].createElement(TitleField, {
    id: "".concat(props.idSchema.$id, "__title"),
    title: props.title || props.uiSchema["ui:title"],
    required: props.required,
    formContext: props.formContext
  }), props.description && _react["default"].createElement(DescriptionField, {
    id: "".concat(props.idSchema.$id, "__description"),
    description: props.description,
    formContext: props.formContext
  }), props.properties.map(function (prop) {
    return prop.content;
  }), (0, _utils.canExpand)(props.schema, props.uiSchema, props.formData) && _react["default"].createElement(_AddButton["default"], {
    className: "object-property-expand",
    onClick: props.onAddClick(props.schema),
    disabled: props.disabled || props.readonly
  }));
}

var ObjectField =
/*#__PURE__*/
function (_Component) {
  _inherits(ObjectField, _Component);

  function ObjectField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ObjectField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ObjectField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      wasPropertyKeyModified: false,
      additionalProperties: {}
    });

    _defineProperty(_assertThisInitialized(_this), "onPropertyChange", function (name) {
      var addedByAdditionalProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return function (value, errorSchema) {
        if (value === undefined && addedByAdditionalProperties) {
          // Don't set value = undefined for fields added by
          // additionalProperties. Doing so removes them from the
          // formData, which causes them to completely disappear
          // (including the input field for the property name). Unlike
          // fields which are "mandated" by the schema, these fields can
          // be set to undefined by clicking a "delete field" button, so
          // set empty values to the empty string.
          value = "";
        }

        var newFormData = _objectSpread({}, _this.props.formData, _defineProperty({}, name, value));

        _this.props.onChange(newFormData, errorSchema && _this.props.errorSchema && _objectSpread({}, _this.props.errorSchema, _defineProperty({}, name, errorSchema)));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onDropPropertyClick", function (key) {
      return function (event) {
        event.preventDefault();
        var _this$props = _this.props,
            onChange = _this$props.onChange,
            formData = _this$props.formData;

        var copiedFormData = _objectSpread({}, formData);

        delete copiedFormData[key];
        onChange(copiedFormData);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getAvailableKey", function (preferredKey, formData) {
      var index = 0;
      var newKey = preferredKey;

      while (formData.hasOwnProperty(newKey)) {
        newKey = "".concat(preferredKey, "-").concat(++index);
      }

      return newKey;
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyChange", function (oldValue) {
      return function (value, errorSchema) {
        if (oldValue === value) {
          return;
        }

        value = _this.getAvailableKey(value, _this.props.formData);

        var newFormData = _objectSpread({}, _this.props.formData);

        var newKeys = _defineProperty({}, oldValue, value);

        var keyValues = Object.keys(newFormData).map(function (key) {
          var newKey = newKeys[key] || key;
          return _defineProperty({}, newKey, newFormData[key]);
        });
        var renamedObj = Object.assign.apply(Object, [{}].concat(_toConsumableArray(keyValues)));

        _this.setState({
          wasPropertyKeyModified: true
        });

        _this.props.onChange(renamedObj, errorSchema && _this.props.errorSchema && _objectSpread({}, _this.props.errorSchema, _defineProperty({}, value, errorSchema)));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleAddClick", function (schema) {
      return function () {
        var type = schema.additionalProperties.type;

        var newFormData = _objectSpread({}, _this.props.formData);

        if (schema.additionalProperties.hasOwnProperty("$ref")) {
          var _this$props$registry = _this.props.registry,
              registry = _this$props$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props$registry;
          var refSchema = (0, _utils.retrieveSchema)({
            $ref: schema.additionalProperties["$ref"]
          }, registry.rootSchema, _this.props.formData);
          type = refSchema.type;
        }

        newFormData[_this.getAvailableKey("newKey", newFormData)] = _this.getDefaultValue(type);

        _this.props.onChange(newFormData);
      };
    });

    return _this;
  }

  _createClass(ObjectField, [{
    key: "isRequired",
    value: function isRequired(name) {
      var schema = this.props.schema;
      return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
    }
  }, {
    key: "getDefaultValue",
    value: function getDefaultValue(type) {
      switch (type) {
        case "string":
          return "New Value";

        case "array":
          return [];

        case "boolean":
          return false;

        case "null":
          return null;

        case "number":
          return 0;

        case "object":
          return {};

        default:
          // We don't have a datatype for some reason (perhaps additionalProperties was true)
          return "New Value";
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          uiSchema = _this$props2.uiSchema,
          formData = _this$props2.formData,
          errorSchema = _this$props2.errorSchema,
          idSchema = _this$props2.idSchema,
          name = _this$props2.name,
          required = _this$props2.required,
          disabled = _this$props2.disabled,
          readonly = _this$props2.readonly,
          idPrefix = _this$props2.idPrefix,
          idSeparator = _this$props2.idSeparator,
          onBlur = _this$props2.onBlur,
          onFocus = _this$props2.onFocus,
          _this$props2$registry = _this$props2.registry,
          registry = _this$props2$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props2$registry;
      var rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var SchemaField = fields.SchemaField,
          TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;
      var schema = (0, _utils.retrieveSchema)(this.props.schema, rootSchema, formData);
      var title = schema.title === undefined ? name : schema.title;
      var description = uiSchema["ui:description"] || schema.description;
      var orderedProperties;

      try {
        var properties = Object.keys(schema.properties || {});
        orderedProperties = (0, _utils.orderProperties)(properties, uiSchema["ui:order"]);
      } catch (err) {
        return _react["default"].createElement("div", null, _react["default"].createElement("p", {
          className: "config-error",
          style: {
            color: "red"
          }
        }, "Invalid ", name || "root", " object field configuration:", _react["default"].createElement("em", null, err.message), "."), _react["default"].createElement("pre", null, JSON.stringify(schema)));
      }

      var Template = uiSchema["ui:ObjectFieldTemplate"] || registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;
      var templateProps = {
        title: uiSchema["ui:title"] || title,
        description: description,
        TitleField: TitleField,
        DescriptionField: DescriptionField,
        properties: orderedProperties.map(function (name) {
          var addedByAdditionalProperties = schema.properties[name].hasOwnProperty(_utils.ADDITIONAL_PROPERTY_FLAG);
          var fieldUiSchema = addedByAdditionalProperties ? uiSchema.additionalProperties : uiSchema[name];
          var hidden = fieldUiSchema && fieldUiSchema["ui:widget"] === "hidden";
          return {
            content: _react["default"].createElement(SchemaField, {
              key: name,
              name: name,
              required: _this2.isRequired(name),
              schema: schema.properties[name],
              uiSchema: fieldUiSchema,
              errorSchema: errorSchema[name],
              idSchema: idSchema[name],
              idPrefix: idPrefix,
              idSeparator: idSeparator,
              formData: (formData || {})[name],
              wasPropertyKeyModified: _this2.state.wasPropertyKeyModified,
              onKeyChange: _this2.onKeyChange(name),
              onChange: _this2.onPropertyChange(name, addedByAdditionalProperties),
              onBlur: onBlur,
              onFocus: onFocus,
              registry: registry,
              disabled: disabled,
              readonly: readonly,
              onDropPropertyClick: _this2.onDropPropertyClick
            }),
            name: name,
            readonly: readonly,
            disabled: disabled,
            required: required,
            hidden: hidden
          };
        }),
        readonly: readonly,
        disabled: disabled,
        required: required,
        idSchema: idSchema,
        uiSchema: uiSchema,
        schema: schema,
        formData: formData,
        formContext: formContext,
        registry: registry
      };
      return _react["default"].createElement(Template, _extends({}, templateProps, {
        onAddClick: this.handleAddClick
      }));
    }
  }]);

  return ObjectField;
}(_react.Component);

_defineProperty(ObjectField, "defaultProps", {
  uiSchema: {},
  formData: {},
  errorSchema: {},
  idSchema: {},
  required: false,
  disabled: false,
  readonly: false
});

if (process.env.NODE_ENV !== "production") {
  ObjectField.propTypes = types.fieldProps;
}

var _default = ObjectField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9PYmplY3RGaWVsZC5qcyJdLCJuYW1lcyI6WyJEZWZhdWx0T2JqZWN0RmllbGRUZW1wbGF0ZSIsInByb3BzIiwiVGl0bGVGaWVsZCIsIkRlc2NyaXB0aW9uRmllbGQiLCJpZFNjaGVtYSIsIiRpZCIsInVpU2NoZW1hIiwidGl0bGUiLCJyZXF1aXJlZCIsImZvcm1Db250ZXh0IiwiZGVzY3JpcHRpb24iLCJwcm9wZXJ0aWVzIiwibWFwIiwicHJvcCIsImNvbnRlbnQiLCJzY2hlbWEiLCJmb3JtRGF0YSIsIm9uQWRkQ2xpY2siLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiT2JqZWN0RmllbGQiLCJ3YXNQcm9wZXJ0eUtleU1vZGlmaWVkIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJuYW1lIiwiYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwidmFsdWUiLCJlcnJvclNjaGVtYSIsInVuZGVmaW5lZCIsIm5ld0Zvcm1EYXRhIiwib25DaGFuZ2UiLCJrZXkiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY29waWVkRm9ybURhdGEiLCJwcmVmZXJyZWRLZXkiLCJpbmRleCIsIm5ld0tleSIsImhhc093blByb3BlcnR5Iiwib2xkVmFsdWUiLCJnZXRBdmFpbGFibGVLZXkiLCJuZXdLZXlzIiwia2V5VmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsInJlbmFtZWRPYmoiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsInR5cGUiLCJyZWdpc3RyeSIsInJlZlNjaGVtYSIsIiRyZWYiLCJyb290U2NoZW1hIiwiZ2V0RGVmYXVsdFZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXhPZiIsImlkUHJlZml4IiwiaWRTZXBhcmF0b3IiLCJvbkJsdXIiLCJvbkZvY3VzIiwiZmllbGRzIiwiU2NoZW1hRmllbGQiLCJvcmRlcmVkUHJvcGVydGllcyIsImVyciIsImNvbG9yIiwibWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJUZW1wbGF0ZSIsIk9iamVjdEZpZWxkVGVtcGxhdGUiLCJ0ZW1wbGF0ZVByb3BzIiwiQURESVRJT05BTF9QUk9QRVJUWV9GTEFHIiwiZmllbGRVaVNjaGVtYSIsImhpZGRlbiIsImlzUmVxdWlyZWQiLCJzdGF0ZSIsIm9uS2V5Q2hhbmdlIiwib25Qcm9wZXJ0eUNoYW5nZSIsIm9uRHJvcFByb3BlcnR5Q2xpY2siLCJoYW5kbGVBZGRDbGljayIsIkNvbXBvbmVudCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsInR5cGVzIiwiZmllbGRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLFNBQVNBLDBCQUFULENBQW9DQyxLQUFwQyxFQUEyQztBQUFBLE1BQ2pDQyxVQURpQyxHQUNBRCxLQURBLENBQ2pDQyxVQURpQztBQUFBLE1BQ3JCQyxnQkFEcUIsR0FDQUYsS0FEQSxDQUNyQkUsZ0JBRHFCO0FBRXpDLFNBQ0U7QUFBVSxJQUFBLEVBQUUsRUFBRUYsS0FBSyxDQUFDRyxRQUFOLENBQWVDO0FBQTdCLEtBQ0csQ0FBQ0osS0FBSyxDQUFDSyxRQUFOLENBQWUsVUFBZixLQUE4QkwsS0FBSyxDQUFDTSxLQUFyQyxLQUNDLGdDQUFDLFVBQUQ7QUFDRSxJQUFBLEVBQUUsWUFBS04sS0FBSyxDQUFDRyxRQUFOLENBQWVDLEdBQXBCLFlBREo7QUFFRSxJQUFBLEtBQUssRUFBRUosS0FBSyxDQUFDTSxLQUFOLElBQWVOLEtBQUssQ0FBQ0ssUUFBTixDQUFlLFVBQWYsQ0FGeEI7QUFHRSxJQUFBLFFBQVEsRUFBRUwsS0FBSyxDQUFDTyxRQUhsQjtBQUlFLElBQUEsV0FBVyxFQUFFUCxLQUFLLENBQUNRO0FBSnJCLElBRkosRUFTR1IsS0FBSyxDQUFDUyxXQUFOLElBQ0MsZ0NBQUMsZ0JBQUQ7QUFDRSxJQUFBLEVBQUUsWUFBS1QsS0FBSyxDQUFDRyxRQUFOLENBQWVDLEdB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QUFOQTtBQS9CSyxXQUFQO0FBaUNELFNBMUNXLENBTFE7QUFnRHBCdEQsUUFBQUEsUUFBUSxFQUFSQSxRQWhEb0I7QUFpRHBCRCxRQUFBQSxRQUFRLEVBQVJBLFFBakRvQjtBQWtEcEJWLFFBQUFBLFFBQVEsRUFBUkEsUUFsRG9CO0FBbURwQkosUUFBQUEsUUFBUSxFQUFSQSxRQW5Eb0I7QUFvRHBCRSxRQUFBQSxRQUFRLEVBQVJBLFFBcERvQjtBQXFEcEJTLFFBQUFBLE1BQU0sRUFBTkEsTUFyRG9CO0FBc0RwQkMsUUFBQUEsUUFBUSxFQUFSQSxRQXREb0I7QUF1RHBCUCxRQUFBQSxXQUFXLEVBQVhBLFdBdkRvQjtBQXdEcEJ1QyxRQUFBQSxRQUFRLEVBQVJBO0FBeERvQixPQUF0QjtBQTBEQSxhQUFPLGdDQUFDLFFBQUQsZUFBY3NCLGFBQWQ7QUFBNkIsUUFBQSxVQUFVLEVBQUUsS0FBS1M7QUFBOUMsU0FBUDtBQUNEOzs7O0VBL091QkMsZ0I7O2dCQUFwQjVELFcsa0JBQ2tCO0FBQ3BCZCxFQUFBQSxRQUFRLEVBQUUsRUFEVTtBQUVwQlUsRUFBQUEsUUFBUSxFQUFFLEVBRlU7QUFHcEJVLEVBQUFBLFdBQVcsRUFBRSxFQUhPO0FBSXBCdEIsRUFBQUEsUUFBUSxFQUFFLEVBSlU7QUFLcEJJLEVBQUFBLFFBQVEsRUFBRSxLQUxVO0FBTXBCVSxFQUFBQSxRQUFRLEVBQUUsS0FOVTtBQU9wQkMsRUFBQUEsUUFBUSxFQUFFO0FBUFUsQzs7QUFpUHhCLElBQUk4RCxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Qy9ELEVBQUFBLFdBQVcsQ0FBQ2dFLFNBQVosR0FBd0JDLEtBQUssQ0FBQ0MsVUFBOUI7QUFDRDs7ZUFFY2xFLFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRkQnV0dG9uIGZyb20gXCIuLi9BZGRCdXR0b25cIjtcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgb3JkZXJQcm9wZXJ0aWVzLFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcclxuICBjYW5FeHBhbmQsXHJcbiAgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gRGVmYXVsdE9iamVjdEZpZWxkVGVtcGxhdGUocHJvcHMpIHtcclxuICBjb25zdCB7IFRpdGxlRmllbGQsIERlc2NyaXB0aW9uRmllbGQgfSA9IHByb3BzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZmllbGRzZXQgaWQ9e3Byb3BzLmlkU2NoZW1hLiRpZH0+XHJcbiAgICAgIHsocHJvcHMudWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCBwcm9wcy50aXRsZSkgJiYgKFxyXG4gICAgICAgIDxUaXRsZUZpZWxkXHJcbiAgICAgICAgICBpZD17YCR7cHJvcHMuaWRTY2hlbWEuJGlkfV9fdGl0bGVgfVxyXG4gICAgICAgICAgdGl0bGU9e3Byb3BzLnRpdGxlIHx8IHByb3BzLnVpU2NoZW1hW1widWk6dGl0bGVcIl19XHJcbiAgICAgICAgICByZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XHJcbiAgICAgICAgICBmb3JtQ29udGV4dD17cHJvcHMuZm9ybUNvbnRleHR9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgICAge3Byb3BzLmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICA8RGVzY3JpcHRpb25GaWVsZFxyXG4gICAgICAgICAgaWQ9e2Ake3Byb3BzLmlkU2NoZW1hLiRpZH1fX2Rlc2NyaXB0aW9uYH1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtwcm9wcy5kZXNjcmlwdGlvbn1cclxuICAgICAgICAgIGZvcm1Db250ZXh0PXtwcm9wcy5mb3JtQ29udGV4dH1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgICB7cHJvcHMucHJvcGVydGllcy5tYXAocHJvcCA9PiBwcm9wLmNvbnRlbnQpfVxyXG4gICAgICB7Y2FuRXhwYW5kKHByb3BzLnNjaGVtYSwgcHJvcHMudWlTY2hlbWEsIHByb3BzLmZvcm1EYXRhKSAmJiAoXHJcbiAgICAgICAgPEFkZEJ1dHRvblxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwib2JqZWN0LXByb3BlcnR5LWV4cGFuZFwiXHJcbiAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkFkZENsaWNrKHByb3BzLnNjaGVtYSl9XHJcbiAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgKTtcclxufVxyXG5cclxuY2xhc3MgT2JqZWN0RmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB1aVNjaGVtYToge30sXHJcbiAgICBmb3JtRGF0YToge30sXHJcbiAgICBlcnJvclNjaGVtYToge30sXHJcbiAgICBpZFNjaGVtYToge30sXHJcbiAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICByZWFkb25seTogZmFsc2UsXHJcbiAgfTtcclxuXHJcbiAgc3RhdGUgPSB7XHJcbiAgICB3YXNQcm9wZXJ0eUtleU1vZGlmaWVkOiBmYWxzZSxcclxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7fSxcclxuICB9O1xyXG5cclxuICBpc1JlcXVpcmVkKG5hbWUpIHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMucHJvcHMuc2NoZW1hO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpICYmIHNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKG5hbWUpICE9PSAtMVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG9uUHJvcGVydHlDaGFuZ2UgPSAobmFtZSwgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gZmFsc2UpID0+IHtcclxuICAgIHJldHVybiAodmFsdWUsIGVycm9yU2NoZW1hKSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllcykge1xyXG4gICAgICAgIC8vIERvbid0IHNldCB2YWx1ZSA9IHVuZGVmaW5lZCBmb3IgZmllbGRzIGFkZGVkIGJ5XHJcbiAgICAgICAgLy8gYWRkaXRpb25hbFByb3BlcnRpZXMuIERvaW5nIHNvIHJlbW92ZXMgdGhlbSBmcm9tIHRoZVxyXG4gICAgICAgIC8vIGZvcm1EYXRhLCB3aGljaCBjYXVzZXMgdGhlbSB0byBjb21wbGV0ZWx5IGRpc2FwcGVhclxyXG4gICAgICAgIC8vIChpbmNsdWRpbmcgdGhlIGlucHV0IGZpZWxkIGZvciB0aGUgcHJvcGVydHkgbmFtZSkuIFVubGlrZVxyXG4gICAgICAgIC8vIGZpZWxkcyB3aGljaCBhcmUgXCJtYW5kYXRlZFwiIGJ5IHRoZSBzY2hlbWEsIHRoZXNlIGZpZWxkcyBjYW5cclxuICAgICAgICAvLyBiZSBzZXQgdG8gdW5kZWZpbmVkIGJ5IGNsaWNraW5nIGEgXCJkZWxldGUgZmllbGRcIiBidXR0b24sIHNvXHJcbiAgICAgICAgLy8gc2V0IGVtcHR5IHZhbHVlcyB0byB0aGUgZW1wdHkgc3RyaW5nLlxyXG4gICAgICAgIHZhbHVlID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBuZXdGb3JtRGF0YSA9IHsgLi4udGhpcy5wcm9wcy5mb3JtRGF0YSwgW25hbWVdOiB2YWx1ZSB9O1xyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFxyXG4gICAgICAgIG5ld0Zvcm1EYXRhLFxyXG4gICAgICAgIGVycm9yU2NoZW1hICYmXHJcbiAgICAgICAgICB0aGlzLnByb3BzLmVycm9yU2NoZW1hICYmIHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5lcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgW25hbWVdOiBlcnJvclNjaGVtYSxcclxuICAgICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgb25Ecm9wUHJvcGVydHlDbGljayA9IGtleSA9PiB7XHJcbiAgICByZXR1cm4gZXZlbnQgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCB7IG9uQ2hhbmdlLCBmb3JtRGF0YSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgY29uc3QgY29waWVkRm9ybURhdGEgPSB7IC4uLmZvcm1EYXRhIH07XHJcbiAgICAgIGRlbGV0ZSBjb3BpZWRGb3JtRGF0YVtrZXldO1xyXG4gICAgICBvbkNoYW5nZShjb3BpZWRGb3JtRGF0YSk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIGdldEF2YWlsYWJsZUtleSA9IChwcmVmZXJyZWRLZXksIGZvcm1EYXRhKSA9PiB7XHJcbiAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgdmFyIG5ld0tleSA9IHByZWZlcnJlZEtleTtcclxuICAgIHdoaWxlIChmb3JtRGF0YS5oYXNPd25Qcm9wZXJ0eShuZXdLZXkpKSB7XHJcbiAgICAgIG5ld0tleSA9IGAke3ByZWZlcnJlZEtleX0tJHsrK2luZGV4fWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3S2V5O1xyXG4gIH07XHJcblxyXG4gIG9uS2V5Q2hhbmdlID0gb2xkVmFsdWUgPT4ge1xyXG4gICAgcmV0dXJuICh2YWx1ZSwgZXJyb3JTY2hlbWEpID0+IHtcclxuICAgICAgaWYgKG9sZFZhbHVlID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFsdWUgPSB0aGlzLmdldEF2YWlsYWJsZUtleSh2YWx1ZSwgdGhpcy5wcm9wcy5mb3JtRGF0YSk7XHJcbiAgICAgIGNvbnN0IG5ld0Zvcm1EYXRhID0geyAuLi50aGlzLnByb3BzLmZvcm1EYXRhIH07XHJcbiAgICAgIGNvbnN0IG5ld0tleXMgPSB7IFtvbGRWYWx1ZV06IHZhbHVlIH07XHJcbiAgICAgIGNvbnN0IGtleVZhbHVlcyA9IE9iamVjdC5rZXlzKG5ld0Zvcm1EYXRhKS5tYXAoa2V5ID0+IHtcclxuICAgICAgICBjb25zdCBuZXdLZXkgPSBuZXdLZXlzW2tleV0gfHwga2V5O1xyXG4gICAgICAgIHJldHVybiB7IFtuZXdLZXldOiBuZXdGb3JtRGF0YVtrZXldIH07XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCByZW5hbWVkT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgLi4ua2V5VmFsdWVzKTtcclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB3YXNQcm9wZXJ0eUtleU1vZGlmaWVkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcclxuICAgICAgICByZW5hbWVkT2JqLFxyXG4gICAgICAgIGVycm9yU2NoZW1hICYmXHJcbiAgICAgICAgICB0aGlzLnByb3BzLmVycm9yU2NoZW1hICYmIHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5lcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgW3ZhbHVlXTogZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZSh0eXBlKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSBcInN0cmluZ1wiOlxyXG4gICAgICAgIHJldHVybiBcIk5ldyBWYWx1ZVwiO1xyXG4gICAgICBjYXNlIFwiYXJyYXlcIjpcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIGNhc2UgXCJib29sZWFuXCI6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBjYXNlIFwibnVsbFwiOlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICBjYXNlIFwibnVtYmVyXCI6XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIGNhc2UgXCJvYmplY3RcIjpcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gV2UgZG9uJ3QgaGF2ZSBhIGRhdGF0eXBlIGZvciBzb21lIHJlYXNvbiAocGVyaGFwcyBhZGRpdGlvbmFsUHJvcGVydGllcyB3YXMgdHJ1ZSlcclxuICAgICAgICByZXR1cm4gXCJOZXcgVmFsdWVcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUFkZENsaWNrID0gc2NoZW1hID0+ICgpID0+IHtcclxuICAgIGxldCB0eXBlID0gc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLnR5cGU7XHJcbiAgICBjb25zdCBuZXdGb3JtRGF0YSA9IHsgLi4udGhpcy5wcm9wcy5mb3JtRGF0YSB9O1xyXG5cclxuICAgIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XHJcbiAgICAgIGNvbnN0IHsgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgY29uc3QgcmVmU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgICAgeyAkcmVmOiBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXNbXCIkcmVmXCJdIH0sXHJcbiAgICAgICAgcmVnaXN0cnkucm9vdFNjaGVtYSxcclxuICAgICAgICB0aGlzLnByb3BzLmZvcm1EYXRhXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0eXBlID0gcmVmU2NoZW1hLnR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3Rm9ybURhdGFbXHJcbiAgICAgIHRoaXMuZ2V0QXZhaWxhYmxlS2V5KFwibmV3S2V5XCIsIG5ld0Zvcm1EYXRhKVxyXG4gICAgXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHR5cGUpO1xyXG5cclxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UobmV3Rm9ybURhdGEpO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBpZFNlcGFyYXRvcixcclxuICAgICAgb25CbHVyLFxyXG4gICAgICBvbkZvY3VzLFxyXG4gICAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgeyByb290U2NoZW1hLCBmaWVsZHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcclxuICAgIGNvbnN0IHsgU2NoZW1hRmllbGQsIFRpdGxlRmllbGQsIERlc2NyaXB0aW9uRmllbGQgfSA9IGZpZWxkcztcclxuICAgIGNvbnN0IHNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHRoaXMucHJvcHMuc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgPT09IHVuZGVmaW5lZCA/IG5hbWUgOiBzY2hlbWEudGl0bGU7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHwgc2NoZW1hLmRlc2NyaXB0aW9uO1xyXG4gICAgbGV0IG9yZGVyZWRQcm9wZXJ0aWVzO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KTtcclxuICAgICAgb3JkZXJlZFByb3BlcnRpZXMgPSBvcmRlclByb3BlcnRpZXMocHJvcGVydGllcywgdWlTY2hlbWFbXCJ1aTpvcmRlclwiXSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiY29uZmlnLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+XHJcbiAgICAgICAgICAgIEludmFsaWQge25hbWUgfHwgXCJyb290XCJ9IG9iamVjdCBmaWVsZCBjb25maWd1cmF0aW9uOlxyXG4gICAgICAgICAgICA8ZW0+e2Vyci5tZXNzYWdlfTwvZW0+LlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoc2NoZW1hKX08L3ByZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBUZW1wbGF0ZSA9XHJcbiAgICAgIHVpU2NoZW1hW1widWk6T2JqZWN0RmllbGRUZW1wbGF0ZVwiXSB8fFxyXG4gICAgICByZWdpc3RyeS5PYmplY3RGaWVsZFRlbXBsYXRlIHx8XHJcbiAgICAgIERlZmF1bHRPYmplY3RGaWVsZFRlbXBsYXRlO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlUHJvcHMgPSB7XHJcbiAgICAgIHRpdGxlOiB1aVNjaGVtYVtcInVpOnRpdGxlXCJdIHx8IHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgVGl0bGVGaWVsZCxcclxuICAgICAgRGVzY3JpcHRpb25GaWVsZCxcclxuICAgICAgcHJvcGVydGllczogb3JkZXJlZFByb3BlcnRpZXMubWFwKG5hbWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllcyA9IHNjaGVtYS5wcm9wZXJ0aWVzW1xyXG4gICAgICAgICAgbmFtZVxyXG4gICAgICAgIF0uaGFzT3duUHJvcGVydHkoQURESVRJT05BTF9QUk9QRVJUWV9GTEFHKTtcclxuICAgICAgICBjb25zdCBmaWVsZFVpU2NoZW1hID0gYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzXHJcbiAgICAgICAgICA/IHVpU2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzXHJcbiAgICAgICAgICA6IHVpU2NoZW1hW25hbWVdO1xyXG4gICAgICAgIGNvbnN0IGhpZGRlbiA9IGZpZWxkVWlTY2hlbWEgJiYgZmllbGRVaVNjaGVtYVtcInVpOndpZGdldFwiXSA9PT0gXCJoaWRkZW5cIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGNvbnRlbnQ6IChcclxuICAgICAgICAgICAgPFNjaGVtYUZpZWxkXHJcbiAgICAgICAgICAgICAga2V5PXtuYW1lfVxyXG4gICAgICAgICAgICAgIG5hbWU9e25hbWV9XHJcbiAgICAgICAgICAgICAgcmVxdWlyZWQ9e3RoaXMuaXNSZXF1aXJlZChuYW1lKX1cclxuICAgICAgICAgICAgICBzY2hlbWE9e3NjaGVtYS5wcm9wZXJ0aWVzW25hbWVdfVxyXG4gICAgICAgICAgICAgIHVpU2NoZW1hPXtmaWVsZFVpU2NoZW1hfVxyXG4gICAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYVtuYW1lXX1cclxuICAgICAgICAgICAgICBpZFNjaGVtYT17aWRTY2hlbWFbbmFtZV19XHJcbiAgICAgICAgICAgICAgaWRQcmVmaXg9e2lkUHJlZml4fVxyXG4gICAgICAgICAgICAgIGlkU2VwYXJhdG9yPXtpZFNlcGFyYXRvcn1cclxuICAgICAgICAgICAgICBmb3JtRGF0YT17KGZvcm1EYXRhIHx8IHt9KVtuYW1lXX1cclxuICAgICAgICAgICAgICB3YXNQcm9wZXJ0eUtleU1vZGlmaWVkPXt0aGlzLnN0YXRlLndhc1Byb3BlcnR5S2V5TW9kaWZpZWR9XHJcbiAgICAgICAgICAgICAgb25LZXlDaGFuZ2U9e3RoaXMub25LZXlDaGFuZ2UobmFtZSl9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25Qcm9wZXJ0eUNoYW5nZShcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBhZGRlZEJ5QWRkaXRpb25hbFByb3BlcnRpZXNcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgICAgICAgICAgb25Ecm9wUHJvcGVydHlDbGljaz17dGhpcy5vbkRyb3BQcm9wZXJ0eUNsaWNrfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICByZWFkb25seSxcclxuICAgICAgICAgIGRpc2FibGVkLFxyXG4gICAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgICBoaWRkZW4sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSksXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVxdWlyZWQsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgZm9ybUNvbnRleHQsXHJcbiAgICAgIHJlZ2lzdHJ5LFxyXG4gICAgfTtcclxuICAgIHJldHVybiA8VGVtcGxhdGUgey4uLnRlbXBsYXRlUHJvcHN9IG9uQWRkQ2xpY2s9e3RoaXMuaGFuZGxlQWRkQ2xpY2t9IC8+O1xyXG4gIH1cclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIE9iamVjdEZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdEZpZWxkO1xyXG4iXX0=