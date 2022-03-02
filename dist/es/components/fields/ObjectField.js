function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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

import AddButton from "../AddButton";
import React, { Component } from "react";
import * as types from "../../types";
import { orderProperties, retrieveSchema, getDefaultRegistry, canExpand, ADDITIONAL_PROPERTY_FLAG } from "../../utils";

function DefaultObjectFieldTemplate(props) {
  var TitleField = props.TitleField,
      DescriptionField = props.DescriptionField;
  return /*#__PURE__*/React.createElement("fieldset", {
    id: props.idSchema.$id
  }, (props.uiSchema["ui:title"] || props.title) && /*#__PURE__*/React.createElement(TitleField, {
    id: "".concat(props.idSchema.$id, "__title"),
    title: props.title || props.uiSchema["ui:title"],
    required: props.required,
    formContext: props.formContext
  }), props.description && /*#__PURE__*/React.createElement(DescriptionField, {
    id: "".concat(props.idSchema.$id, "__description"),
    description: props.description,
    formContext: props.formContext
  }), props.properties.map(function (prop) {
    return prop.content;
  }), canExpand(props.schema, props.uiSchema, props.formData) && /*#__PURE__*/React.createElement(AddButton, {
    className: "object-property-expand",
    onClick: props.onAddClick(props.schema),
    disabled: props.disabled || props.readonly
  }));
}

var ObjectField = /*#__PURE__*/function (_Component) {
  _inherits(ObjectField, _Component);

  var _super = _createSuper(ObjectField);

  function ObjectField() {
    var _this;

    _classCallCheck(this, ObjectField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

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

        var newFormData = _objectSpread(_objectSpread({}, _this.props.formData), {}, _defineProperty({}, name, value));

        _this.props.onChange(newFormData, errorSchema && _this.props.errorSchema && _objectSpread(_objectSpread({}, _this.props.errorSchema), {}, _defineProperty({}, name, errorSchema)));
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

        _this.props.onChange(renamedObj, errorSchema && _this.props.errorSchema && _objectSpread(_objectSpread({}, _this.props.errorSchema), {}, _defineProperty({}, value, errorSchema)));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleAddClick", function (schema) {
      return function () {
        var type = schema.additionalProperties.type;

        var newFormData = _objectSpread({}, _this.props.formData);

        if (schema.additionalProperties.hasOwnProperty("$ref")) {
          var _this$props$registry = _this.props.registry,
              registry = _this$props$registry === void 0 ? getDefaultRegistry() : _this$props$registry;
          var refSchema = retrieveSchema({
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
          registry = _this$props2$registry === void 0 ? getDefaultRegistry() : _this$props2$registry;
      var rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var SchemaField = fields.SchemaField,
          TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;
      var schema = retrieveSchema(this.props.schema, rootSchema, formData);
      var title = schema.title === undefined ? name : schema.title;
      var description = uiSchema["ui:description"] || schema.description;
      var orderedProperties;

      try {
        var properties = Object.keys(schema.properties || {});
        orderedProperties = orderProperties(properties, uiSchema["ui:order"]);
      } catch (err) {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
          className: "config-error",
          style: {
            color: "red"
          }
        }, "Invalid ", name || "root", " object field configuration:", /*#__PURE__*/React.createElement("em", null, err.message), "."), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(schema)));
      }

      var Template = uiSchema["ui:ObjectFieldTemplate"] || registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;
      var templateProps = {
        title: uiSchema["ui:title"] || title,
        description: description,
        TitleField: TitleField,
        DescriptionField: DescriptionField,
        properties: orderedProperties.map(function (name) {
          var addedByAdditionalProperties = schema.properties[name].hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);
          var fieldUiSchema = addedByAdditionalProperties ? uiSchema.additionalProperties : uiSchema[name];
          var hidden = fieldUiSchema && fieldUiSchema["ui:widget"] === "hidden";
          return {
            content: /*#__PURE__*/React.createElement(SchemaField, {
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
      return /*#__PURE__*/React.createElement(Template, _extends({}, templateProps, {
        onAddClick: this.handleAddClick
      }));
    }
  }]);

  return ObjectField;
}(Component);

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

export default ObjectField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9PYmplY3RGaWVsZC5qcyJdLCJuYW1lcyI6WyJBZGRCdXR0b24iLCJSZWFjdCIsIkNvbXBvbmVudCIsInR5cGVzIiwib3JkZXJQcm9wZXJ0aWVzIiwicmV0cmlldmVTY2hlbWEiLCJnZXREZWZhdWx0UmVnaXN0cnkiLCJjYW5FeHBhbmQiLCJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJEZWZhdWx0T2JqZWN0RmllbGRUZW1wbGF0ZSIsInByb3BzIiwiVGl0bGVGaWVsZCIsIkRlc2NyaXB0aW9uRmllbGQiLCJpZFNjaGVtYSIsIiRpZCIsInVpU2NoZW1hIiwidGl0bGUiLCJyZXF1aXJlZCIsImZvcm1Db250ZXh0IiwiZGVzY3JpcHRpb24iLCJwcm9wZXJ0aWVzIiwibWFwIiwicHJvcCIsImNvbnRlbnQiLCJzY2hlbWEiLCJmb3JtRGF0YSIsIm9uQWRkQ2xpY2siLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiT2JqZWN0RmllbGQiLCJ3YXNQcm9wZXJ0eUtleU1vZGlmaWVkIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJuYW1lIiwiYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwidmFsdWUiLCJlcnJvclNjaGVtYSIsInVuZGVmaW5lZCIsIm5ld0Zvcm1EYXRhIiwib25DaGFuZ2UiLCJrZXkiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY29waWVkRm9ybURhdGEiLCJwcmVmZXJyZWRLZXkiLCJpbmRleCIsIm5ld0tleSIsImhhc093blByb3BlcnR5Iiwib2xkVmFsdWUiLCJnZXRBdmFpbGFibGVLZXkiLCJuZXdLZXlzIiwia2V5VmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsInJlbmFtZWRPYmoiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsInR5cGUiLCJyZWdpc3RyeSIsInJlZlNjaGVtYSIsIiRyZWYiLCJyb290U2NoZW1hIiwiZ2V0RGVmYXVsdFZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXhPZiIsImlkUHJlZml4IiwiaWRTZXBhcmF0b3IiLCJvbkJsdXIiLCJvbkZvY3VzIiwiZmllbGRzIiwiU2NoZW1hRmllbGQiLCJvcmRlcmVkUHJvcGVydGllcyIsImVyciIsImNvbG9yIiwibWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJUZW1wbGF0ZSIsIk9iamVjdEZpZWxkVGVtcGxhdGUiLCJ0ZW1wbGF0ZVByb3BzIiwiZmllbGRVaVNjaGVtYSIsImhpZGRlbiIsImlzUmVxdWlyZWQiLCJzdGF0ZSIsIm9uS2V5Q2hhbmdlIiwib25Qcm9wZXJ0eUNoYW5nZSIsIm9uRHJvcFByb3BlcnR5Q2xpY2siLCJoYW5kbGVBZGRDbGljayIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsImZpZWxkUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxPQUFPQyxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU8sS0FBS0MsS0FBWixNQUF1QixhQUF2QjtBQUVBLFNBQ0VDLGVBREYsRUFFRUMsY0FGRixFQUdFQyxrQkFIRixFQUlFQyxTQUpGLEVBS0VDLHdCQUxGLFFBTU8sYUFOUDs7QUFRQSxTQUFTQywwQkFBVCxDQUFvQ0MsS0FBcEMsRUFBMkM7QUFDekMsTUFBUUMsVUFBUixHQUF5Q0QsS0FBekMsQ0FBUUMsVUFBUjtBQUFBLE1BQW9CQyxnQkFBcEIsR0FBeUNGLEtBQXpDLENBQW9CRSxnQkFBcEI7QUFDQSxzQkFDRTtBQUFVLElBQUEsRUFBRSxFQUFFRixLQUFLLENBQUNHLFFBQU4sQ0FBZUM7QUFBN0IsS0FDRyxDQUFDSixLQUFLLENBQUNLLFFBQU4sQ0FBZSxVQUFmLEtBQThCTCxLQUFLLENBQUNNLEtBQXJDLGtCQUNDLG9CQUFDLFVBQUQ7QUFDRSxJQUFBLEVBQUUsWUFBS04sS0FBSyxDQUFDRyxRQUFOLENBQWVDLEdBQXBCLFlBREo7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QkMsRUFBQUEsUUFBUSxFQUFFO0FBUFUsQzs7QUFpUHhCLElBQUk0RCxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QzdELEVBQUFBLFdBQVcsQ0FBQzhELFNBQVosR0FBd0J4RixLQUFLLENBQUN5RixVQUE5QjtBQUNEOztBQUVELGVBQWUvRCxXQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkZEJ1dHRvbiBmcm9tIFwiLi4vQWRkQnV0dG9uXCI7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gIG9yZGVyUHJvcGVydGllcyxcclxuICByZXRyaWV2ZVNjaGVtYSxcclxuICBnZXREZWZhdWx0UmVnaXN0cnksXHJcbiAgY2FuRXhwYW5kLFxyXG4gIEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuXHJcbmZ1bmN0aW9uIERlZmF1bHRPYmplY3RGaWVsZFRlbXBsYXRlKHByb3BzKSB7XHJcbiAgY29uc3QgeyBUaXRsZUZpZWxkLCBEZXNjcmlwdGlvbkZpZWxkIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPGZpZWxkc2V0IGlkPXtwcm9wcy5pZFNjaGVtYS4kaWR9PlxyXG4gICAgICB7KHByb3BzLnVpU2NoZW1hW1widWk6dGl0bGVcIl0gfHwgcHJvcHMudGl0bGUpICYmIChcclxuICAgICAgICA8VGl0bGVGaWVsZFxyXG4gICAgICAgICAgaWQ9e2Ake3Byb3BzLmlkU2NoZW1hLiRpZH1fX3RpdGxlYH1cclxuICAgICAgICAgIHRpdGxlPXtwcm9wcy50aXRsZSB8fCBwcm9wcy51aVNjaGVtYVtcInVpOnRpdGxlXCJdfVxyXG4gICAgICAgICAgcmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxyXG4gICAgICAgICAgZm9ybUNvbnRleHQ9e3Byb3BzLmZvcm1Db250ZXh0fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICAgIHtwcm9wcy5kZXNjcmlwdGlvbiAmJiAoXHJcbiAgICAgICAgPERlc2NyaXB0aW9uRmllbGRcclxuICAgICAgICAgIGlkPXtgJHtwcm9wcy5pZFNjaGVtYS4kaWR9X19kZXNjcmlwdGlvbmB9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbj17cHJvcHMuZGVzY3JpcHRpb259XHJcbiAgICAgICAgICBmb3JtQ29udGV4dD17cHJvcHMuZm9ybUNvbnRleHR9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgICAge3Byb3BzLnByb3BlcnRpZXMubWFwKHByb3AgPT4gcHJvcC5jb250ZW50KX1cclxuICAgICAge2NhbkV4cGFuZChwcm9wcy5zY2hlbWEsIHByb3BzLnVpU2NoZW1hLCBwcm9wcy5mb3JtRGF0YSkgJiYgKFxyXG4gICAgICAgIDxBZGRCdXR0b25cclxuICAgICAgICAgIGNsYXNzTmFtZT1cIm9iamVjdC1wcm9wZXJ0eS1leHBhbmRcIlxyXG4gICAgICAgICAgb25DbGljaz17cHJvcHMub25BZGRDbGljayhwcm9wcy5zY2hlbWEpfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkIHx8IHByb3BzLnJlYWRvbmx5fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gICk7XHJcbn1cclxuXHJcbmNsYXNzIE9iamVjdEZpZWxkIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdWlTY2hlbWE6IHt9LFxyXG4gICAgZm9ybURhdGE6IHt9LFxyXG4gICAgZXJyb3JTY2hlbWE6IHt9LFxyXG4gICAgaWRTY2hlbWE6IHt9LFxyXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gIH07XHJcblxyXG4gIHN0YXRlID0ge1xyXG4gICAgd2FzUHJvcGVydHlLZXlNb2RpZmllZDogZmFsc2UsXHJcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge30sXHJcbiAgfTtcclxuXHJcbiAgaXNSZXF1aXJlZChuYW1lKSB7XHJcbiAgICBjb25zdCBzY2hlbWEgPSB0aGlzLnByb3BzLnNjaGVtYTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSAmJiBzY2hlbWEucmVxdWlyZWQuaW5kZXhPZihuYW1lKSAhPT0gLTFcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBvblByb3BlcnR5Q2hhbmdlID0gKG5hbWUsIGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllcyA9IGZhbHNlKSA9PiB7XHJcbiAgICByZXR1cm4gKHZhbHVlLCBlcnJvclNjaGVtYSkgPT4ge1xyXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiBhZGRlZEJ5QWRkaXRpb25hbFByb3BlcnRpZXMpIHtcclxuICAgICAgICAvLyBEb24ndCBzZXQgdmFsdWUgPSB1bmRlZmluZWQgZm9yIGZpZWxkcyBhZGRlZCBieVxyXG4gICAgICAgIC8vIGFkZGl0aW9uYWxQcm9wZXJ0aWVzLiBEb2luZyBzbyByZW1vdmVzIHRoZW0gZnJvbSB0aGVcclxuICAgICAgICAvLyBmb3JtRGF0YSwgd2hpY2ggY2F1c2VzIHRoZW0gdG8gY29tcGxldGVseSBkaXNhcHBlYXJcclxuICAgICAgICAvLyAoaW5jbHVkaW5nIHRoZSBpbnB1dCBmaWVsZCBmb3IgdGhlIHByb3BlcnR5IG5hbWUpLiBVbmxpa2VcclxuICAgICAgICAvLyBmaWVsZHMgd2hpY2ggYXJlIFwibWFuZGF0ZWRcIiBieSB0aGUgc2NoZW1hLCB0aGVzZSBmaWVsZHMgY2FuXHJcbiAgICAgICAgLy8gYmUgc2V0IHRvIHVuZGVmaW5lZCBieSBjbGlja2luZyBhIFwiZGVsZXRlIGZpZWxkXCIgYnV0dG9uLCBzb1xyXG4gICAgICAgIC8vIHNldCBlbXB0eSB2YWx1ZXMgdG8gdGhlIGVtcHR5IHN0cmluZy5cclxuICAgICAgICB2YWx1ZSA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV3Rm9ybURhdGEgPSB7IC4uLnRoaXMucHJvcHMuZm9ybURhdGEsIFtuYW1lXTogdmFsdWUgfTtcclxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcclxuICAgICAgICBuZXdGb3JtRGF0YSxcclxuICAgICAgICBlcnJvclNjaGVtYSAmJlxyXG4gICAgICAgICAgdGhpcy5wcm9wcy5lcnJvclNjaGVtYSAmJiB7XHJcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIFtuYW1lXTogZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIG9uRHJvcFByb3BlcnR5Q2xpY2sgPSBrZXkgPT4ge1xyXG4gICAgcmV0dXJuIGV2ZW50ID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgeyBvbkNoYW5nZSwgZm9ybURhdGEgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIGNvbnN0IGNvcGllZEZvcm1EYXRhID0geyAuLi5mb3JtRGF0YSB9O1xyXG4gICAgICBkZWxldGUgY29waWVkRm9ybURhdGFba2V5XTtcclxuICAgICAgb25DaGFuZ2UoY29waWVkRm9ybURhdGEpO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBnZXRBdmFpbGFibGVLZXkgPSAocHJlZmVycmVkS2V5LCBmb3JtRGF0YSkgPT4ge1xyXG4gICAgdmFyIGluZGV4ID0gMDtcclxuICAgIHZhciBuZXdLZXkgPSBwcmVmZXJyZWRLZXk7XHJcbiAgICB3aGlsZSAoZm9ybURhdGEuaGFzT3duUHJvcGVydHkobmV3S2V5KSkge1xyXG4gICAgICBuZXdLZXkgPSBgJHtwcmVmZXJyZWRLZXl9LSR7KytpbmRleH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0tleTtcclxuICB9O1xyXG5cclxuICBvbktleUNoYW5nZSA9IG9sZFZhbHVlID0+IHtcclxuICAgIHJldHVybiAodmFsdWUsIGVycm9yU2NoZW1hKSA9PiB7XHJcbiAgICAgIGlmIChvbGRWYWx1ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhbHVlID0gdGhpcy5nZXRBdmFpbGFibGVLZXkodmFsdWUsIHRoaXMucHJvcHMuZm9ybURhdGEpO1xyXG4gICAgICBjb25zdCBuZXdGb3JtRGF0YSA9IHsgLi4udGhpcy5wcm9wcy5mb3JtRGF0YSB9O1xyXG4gICAgICBjb25zdCBuZXdLZXlzID0geyBbb2xkVmFsdWVdOiB2YWx1ZSB9O1xyXG4gICAgICBjb25zdCBrZXlWYWx1ZXMgPSBPYmplY3Qua2V5cyhuZXdGb3JtRGF0YSkubWFwKGtleSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3S2V5ID0gbmV3S2V5c1trZXldIHx8IGtleTtcclxuICAgICAgICByZXR1cm4geyBbbmV3S2V5XTogbmV3Rm9ybURhdGFba2V5XSB9O1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgcmVuYW1lZE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIC4uLmtleVZhbHVlcyk7XHJcblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgd2FzUHJvcGVydHlLZXlNb2RpZmllZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoXHJcbiAgICAgICAgcmVuYW1lZE9iaixcclxuICAgICAgICBlcnJvclNjaGVtYSAmJlxyXG4gICAgICAgICAgdGhpcy5wcm9wcy5lcnJvclNjaGVtYSAmJiB7XHJcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICAgIFt2YWx1ZV06IGVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBnZXREZWZhdWx0VmFsdWUodHlwZSkge1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgXCJzdHJpbmdcIjpcclxuICAgICAgICByZXR1cm4gXCJOZXcgVmFsdWVcIjtcclxuICAgICAgY2FzZSBcImFycmF5XCI6XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICBjYXNlIFwiYm9vbGVhblwiOlxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgY2FzZSBcIm51bGxcIjpcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgY2FzZSBcIm51bWJlclwiOlxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgICBjYXNlIFwib2JqZWN0XCI6XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIFdlIGRvbid0IGhhdmUgYSBkYXRhdHlwZSBmb3Igc29tZSByZWFzb24gKHBlcmhhcHMgYWRkaXRpb25hbFByb3BlcnRpZXMgd2FzIHRydWUpXHJcbiAgICAgICAgcmV0dXJuIFwiTmV3IFZhbHVlXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVBZGRDbGljayA9IHNjaGVtYSA9PiAoKSA9PiB7XHJcbiAgICBsZXQgdHlwZSA9IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcy50eXBlO1xyXG4gICAgY29uc3QgbmV3Rm9ybURhdGEgPSB7IC4uLnRoaXMucHJvcHMuZm9ybURhdGEgfTtcclxuXHJcbiAgICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KFwiJHJlZlwiKSkge1xyXG4gICAgICBjb25zdCB7IHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCkgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIGNvbnN0IHJlZlNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgIHsgJHJlZjogc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzW1wiJHJlZlwiXSB9LFxyXG4gICAgICAgIHJlZ2lzdHJ5LnJvb3RTY2hlbWEsXHJcbiAgICAgICAgdGhpcy5wcm9wcy5mb3JtRGF0YVxyXG4gICAgICApO1xyXG5cclxuICAgICAgdHlwZSA9IHJlZlNjaGVtYS50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld0Zvcm1EYXRhW1xyXG4gICAgICB0aGlzLmdldEF2YWlsYWJsZUtleShcIm5ld0tleVwiLCBuZXdGb3JtRGF0YSlcclxuICAgIF0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZSh0eXBlKTtcclxuXHJcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld0Zvcm1EYXRhKTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBuYW1lLFxyXG4gICAgICByZXF1aXJlZCxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICBpZFByZWZpeCxcclxuICAgICAgaWRTZXBhcmF0b3IsXHJcbiAgICAgIG9uQmx1cixcclxuICAgICAgb25Gb2N1cyxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IHsgcm9vdFNjaGVtYSwgZmllbGRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IFNjaGVtYUZpZWxkLCBUaXRsZUZpZWxkLCBEZXNjcmlwdGlvbkZpZWxkIH0gPSBmaWVsZHM7XHJcbiAgICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYSh0aGlzLnByb3BzLnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gc2NoZW1hLnRpdGxlID09PSB1bmRlZmluZWQgPyBuYW1lIDogc2NoZW1hLnRpdGxlO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB1aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8IHNjaGVtYS5kZXNjcmlwdGlvbjtcclxuICAgIGxldCBvcmRlcmVkUHJvcGVydGllcztcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcyB8fCB7fSk7XHJcbiAgICAgIG9yZGVyZWRQcm9wZXJ0aWVzID0gb3JkZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIHVpU2NoZW1hW1widWk6b3JkZXJcIl0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImNvbmZpZy1lcnJvclwiIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19PlxyXG4gICAgICAgICAgICBJbnZhbGlkIHtuYW1lIHx8IFwicm9vdFwifSBvYmplY3QgZmllbGQgY29uZmlndXJhdGlvbjpcclxuICAgICAgICAgICAgPGVtPntlcnIubWVzc2FnZX08L2VtPi5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KHNjaGVtYSl9PC9wcmU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgVGVtcGxhdGUgPVxyXG4gICAgICB1aVNjaGVtYVtcInVpOk9iamVjdEZpZWxkVGVtcGxhdGVcIl0gfHxcclxuICAgICAgcmVnaXN0cnkuT2JqZWN0RmllbGRUZW1wbGF0ZSB8fFxyXG4gICAgICBEZWZhdWx0T2JqZWN0RmllbGRUZW1wbGF0ZTtcclxuXHJcbiAgICBjb25zdCB0ZW1wbGF0ZVByb3BzID0ge1xyXG4gICAgICB0aXRsZTogdWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCB0aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIFRpdGxlRmllbGQsXHJcbiAgICAgIERlc2NyaXB0aW9uRmllbGQsXHJcbiAgICAgIHByb3BlcnRpZXM6IG9yZGVyZWRQcm9wZXJ0aWVzLm1hcChuYW1lID0+IHtcclxuICAgICAgICBjb25zdCBhZGRlZEJ5QWRkaXRpb25hbFByb3BlcnRpZXMgPSBzY2hlbWEucHJvcGVydGllc1tcclxuICAgICAgICAgIG5hbWVcclxuICAgICAgICBdLmhhc093blByb3BlcnR5KEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyk7XHJcbiAgICAgICAgY29uc3QgZmllbGRVaVNjaGVtYSA9IGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllc1xyXG4gICAgICAgICAgPyB1aVNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllc1xyXG4gICAgICAgICAgOiB1aVNjaGVtYVtuYW1lXTtcclxuICAgICAgICBjb25zdCBoaWRkZW4gPSBmaWVsZFVpU2NoZW1hICYmIGZpZWxkVWlTY2hlbWFbXCJ1aTp3aWRnZXRcIl0gPT09IFwiaGlkZGVuXCI7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBjb250ZW50OiAoXHJcbiAgICAgICAgICAgIDxTY2hlbWFGaWVsZFxyXG4gICAgICAgICAgICAgIGtleT17bmFtZX1cclxuICAgICAgICAgICAgICBuYW1lPXtuYW1lfVxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkPXt0aGlzLmlzUmVxdWlyZWQobmFtZSl9XHJcbiAgICAgICAgICAgICAgc2NoZW1hPXtzY2hlbWEucHJvcGVydGllc1tuYW1lXX1cclxuICAgICAgICAgICAgICB1aVNjaGVtYT17ZmllbGRVaVNjaGVtYX1cclxuICAgICAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWFbbmFtZV19XHJcbiAgICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hW25hbWVdfVxyXG4gICAgICAgICAgICAgIGlkUHJlZml4PXtpZFByZWZpeH1cclxuICAgICAgICAgICAgICBpZFNlcGFyYXRvcj17aWRTZXBhcmF0b3J9XHJcbiAgICAgICAgICAgICAgZm9ybURhdGE9eyhmb3JtRGF0YSB8fCB7fSlbbmFtZV19XHJcbiAgICAgICAgICAgICAgd2FzUHJvcGVydHlLZXlNb2RpZmllZD17dGhpcy5zdGF0ZS53YXNQcm9wZXJ0eUtleU1vZGlmaWVkfVxyXG4gICAgICAgICAgICAgIG9uS2V5Q2hhbmdlPXt0aGlzLm9uS2V5Q2hhbmdlKG5hbWUpfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uUHJvcGVydHlDaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICAgICAgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICAgICAgICAgIG9uRHJvcFByb3BlcnR5Q2xpY2s9e3RoaXMub25Ecm9wUHJvcGVydHlDbGlja31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICksXHJcbiAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgcmVhZG9ubHksXHJcbiAgICAgICAgICBkaXNhYmxlZCxcclxuICAgICAgICAgIHJlcXVpcmVkLFxyXG4gICAgICAgICAgaGlkZGVuLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGZvcm1Db250ZXh0LFxyXG4gICAgICByZWdpc3RyeSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gPFRlbXBsYXRlIHsuLi50ZW1wbGF0ZVByb3BzfSBvbkFkZENsaWNrPXt0aGlzLmhhbmRsZUFkZENsaWNrfSAvPjtcclxuICB9XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBPYmplY3RGaWVsZC5wcm9wVHlwZXMgPSB0eXBlcy5maWVsZFByb3BzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3RGaWVsZDtcclxuIl19