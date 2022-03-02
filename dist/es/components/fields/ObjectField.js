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

import AddButton from "../AddButton";
import React, { Component } from "react";
import * as types from "../../types";
import { orderProperties, retrieveSchema, getDefaultRegistry, canExpand, ADDITIONAL_PROPERTY_FLAG } from "../../utils";

function DefaultObjectFieldTemplate(props) {
  var TitleField = props.TitleField,
      DescriptionField = props.DescriptionField;
  return React.createElement("fieldset", {
    id: props.idSchema.$id
  }, (props.uiSchema["ui:title"] || props.title) && React.createElement(TitleField, {
    id: "".concat(props.idSchema.$id, "__title"),
    title: props.title || props.uiSchema["ui:title"],
    required: props.required,
    formContext: props.formContext
  }), props.description && React.createElement(DescriptionField, {
    id: "".concat(props.idSchema.$id, "__description"),
    description: props.description,
    formContext: props.formContext
  }), props.properties.map(function (prop) {
    return prop.content;
  }), canExpand(props.schema, props.uiSchema, props.formData) && React.createElement(AddButton, {
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
        return React.createElement("div", null, React.createElement("p", {
          className: "config-error",
          style: {
            color: "red"
          }
        }, "Invalid ", name || "root", " object field configuration:", React.createElement("em", null, err.message), "."), React.createElement("pre", null, JSON.stringify(schema)));
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
            content: React.createElement(SchemaField, {
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
      return React.createElement(Template, _extends({}, templateProps, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9PYmplY3RGaWVsZC5qcyJdLCJuYW1lcyI6WyJBZGRCdXR0b24iLCJSZWFjdCIsIkNvbXBvbmVudCIsInR5cGVzIiwib3JkZXJQcm9wZXJ0aWVzIiwicmV0cmlldmVTY2hlbWEiLCJnZXREZWZhdWx0UmVnaXN0cnkiLCJjYW5FeHBhbmQiLCJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJEZWZhdWx0T2JqZWN0RmllbGRUZW1wbGF0ZSIsInByb3BzIiwiVGl0bGVGaWVsZCIsIkRlc2NyaXB0aW9uRmllbGQiLCJpZFNjaGVtYSIsIiRpZCIsInVpU2NoZW1hIiwidGl0bGUiLCJyZXF1aXJlZCIsImZvcm1Db250ZXh0IiwiZGVzY3JpcHRpb24iLCJwcm9wZXJ0aWVzIiwibWFwIiwicHJvcCIsImNvbnRlbnQiLCJzY2hlbWEiLCJmb3JtRGF0YSIsIm9uQWRkQ2xpY2siLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiT2JqZWN0RmllbGQiLCJ3YXNQcm9wZXJ0eUtleU1vZGlmaWVkIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJuYW1lIiwiYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwidmFsdWUiLCJlcnJvclNjaGVtYSIsInVuZGVmaW5lZCIsIm5ld0Zvcm1EYXRhIiwib25DaGFuZ2UiLCJrZXkiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY29waWVkRm9ybURhdGEiLCJwcmVmZXJyZWRLZXkiLCJpbmRleCIsIm5ld0tleSIsImhhc093blByb3BlcnR5Iiwib2xkVmFsdWUiLCJnZXRBdmFpbGFibGVLZXkiLCJuZXdLZXlzIiwia2V5VmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsInJlbmFtZWRPYmoiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsInR5cGUiLCJyZWdpc3RyeSIsInJlZlNjaGVtYSIsIiRyZWYiLCJyb290U2NoZW1hIiwiZ2V0RGVmYXVsdFZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXhPZiIsImlkUHJlZml4IiwiaWRTZXBhcmF0b3IiLCJvbkJsdXIiLCJvbkZvY3VzIiwiZmllbGRzIiwiU2NoZW1hRmllbGQiLCJvcmRlcmVkUHJvcGVydGllcyIsImVyciIsImNvbG9yIiwibWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJUZW1wbGF0ZSIsIk9iamVjdEZpZWxkVGVtcGxhdGUiLCJ0ZW1wbGF0ZVByb3BzIiwiZmllbGRVaVNjaGVtYSIsImhpZGRlbiIsImlzUmVxdWlyZWQiLCJzdGF0ZSIsIm9uS2V5Q2hhbmdlIiwib25Qcm9wZXJ0eUNoYW5nZSIsIm9uRHJvcFByb3BlcnR5Q2xpY2siLCJoYW5kbGVBZGRDbGljayIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsImZpZWxkUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsU0FBUCxNQUFzQixjQUF0QjtBQUNBLE9BQU9DLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBTyxLQUFLQyxLQUFaLE1BQXVCLGFBQXZCO0FBRUEsU0FDRUMsZUFERixFQUVFQyxjQUZGLEVBR0VDLGtCQUhGLEVBSUVDLFNBSkYsRUFLRUMsd0JBTEYsUUFNTyxhQU5QOztBQVFBLFNBQVNDLDBCQUFULENBQW9DQyxLQUFwQyxFQUEyQztBQUFBLE1BQ2pDQyxVQURpQyxHQUNBRCxLQURBLENBQ2pDQyxVQURpQztBQUFBLE1BQ3JCQyxnQkFEcUIsR0FDQUYsS0FEQSxDQUNyQkUsZ0JBRHFCO0FBRXpDLFNBQ0U7QUFBVSxJQUFBLEVBQUUsRUFBRUYsS0FBSyxDQUFDRyxRQUFOLENBQWVDO0FBQTdCLEtBQ0csQ0FBQ0osS0FBSyxDQUFDSyxRQUFOLENBQWUsVUFBZixLQUE4QkwsS0FBSyxDQUFDTSxLQUFyQyxLQUNDLG9CQUFDLFVBQUQ7QUFDRSxJQUFBLEVBQUUsWUFBS04sS0FBSyxDQUFDRyxRQUFOLENBQWVDLEdBQXBCLFlBREo7QUFFRSxJQUFBLEtB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RUFBRTtBQVBVLEM7O0FBaVB4QixJQUFJNEQsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekM3RCxFQUFBQSxXQUFXLENBQUM4RCxTQUFaLEdBQXdCeEYsS0FBSyxDQUFDeUYsVUFBOUI7QUFDRDs7QUFFRCxlQUFlL0QsV0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZGRCdXR0b24gZnJvbSBcIi4uL0FkZEJ1dHRvblwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICBvcmRlclByb3BlcnRpZXMsXHJcbiAgcmV0cmlldmVTY2hlbWEsXHJcbiAgZ2V0RGVmYXVsdFJlZ2lzdHJ5LFxyXG4gIGNhbkV4cGFuZCxcclxuICBBRERJVElPTkFMX1BST1BFUlRZX0ZMQUcsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5mdW5jdGlvbiBEZWZhdWx0T2JqZWN0RmllbGRUZW1wbGF0ZShwcm9wcykge1xyXG4gIGNvbnN0IHsgVGl0bGVGaWVsZCwgRGVzY3JpcHRpb25GaWVsZCB9ID0gcHJvcHM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxmaWVsZHNldCBpZD17cHJvcHMuaWRTY2hlbWEuJGlkfT5cclxuICAgICAgeyhwcm9wcy51aVNjaGVtYVtcInVpOnRpdGxlXCJdIHx8IHByb3BzLnRpdGxlKSAmJiAoXHJcbiAgICAgICAgPFRpdGxlRmllbGRcclxuICAgICAgICAgIGlkPXtgJHtwcm9wcy5pZFNjaGVtYS4kaWR9X190aXRsZWB9XHJcbiAgICAgICAgICB0aXRsZT17cHJvcHMudGl0bGUgfHwgcHJvcHMudWlTY2hlbWFbXCJ1aTp0aXRsZVwiXX1cclxuICAgICAgICAgIHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cclxuICAgICAgICAgIGZvcm1Db250ZXh0PXtwcm9wcy5mb3JtQ29udGV4dH1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgICB7cHJvcHMuZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgIDxEZXNjcmlwdGlvbkZpZWxkXHJcbiAgICAgICAgICBpZD17YCR7cHJvcHMuaWRTY2hlbWEuJGlkfV9fZGVzY3JpcHRpb25gfVxyXG4gICAgICAgICAgZGVzY3JpcHRpb249e3Byb3BzLmRlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZm9ybUNvbnRleHQ9e3Byb3BzLmZvcm1Db250ZXh0fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICAgIHtwcm9wcy5wcm9wZXJ0aWVzLm1hcChwcm9wID0+IHByb3AuY29udGVudCl9XHJcbiAgICAgIHtjYW5FeHBhbmQocHJvcHMuc2NoZW1hLCBwcm9wcy51aVNjaGVtYSwgcHJvcHMuZm9ybURhdGEpICYmIChcclxuICAgICAgICA8QWRkQnV0dG9uXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJvYmplY3QtcHJvcGVydHktZXhwYW5kXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQWRkQ2xpY2socHJvcHMuc2NoZW1hKX1cclxuICAgICAgICAgIGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZCB8fCBwcm9wcy5yZWFkb25seX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgPC9maWVsZHNldD5cclxuICApO1xyXG59XHJcblxyXG5jbGFzcyBPYmplY3RGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHVpU2NoZW1hOiB7fSxcclxuICAgIGZvcm1EYXRhOiB7fSxcclxuICAgIGVycm9yU2NoZW1hOiB7fSxcclxuICAgIGlkU2NoZW1hOiB7fSxcclxuICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHJlYWRvbmx5OiBmYWxzZSxcclxuICB9O1xyXG5cclxuICBzdGF0ZSA9IHtcclxuICAgIHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQ6IGZhbHNlLFxyXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHt9LFxyXG4gIH07XHJcblxyXG4gIGlzUmVxdWlyZWQobmFtZSkge1xyXG4gICAgY29uc3Qgc2NoZW1hID0gdGhpcy5wcm9wcy5zY2hlbWE7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBBcnJheS5pc0FycmF5KHNjaGVtYS5yZXF1aXJlZCkgJiYgc2NoZW1hLnJlcXVpcmVkLmluZGV4T2YobmFtZSkgIT09IC0xXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25Qcm9wZXJ0eUNoYW5nZSA9IChuYW1lLCBhZGRlZEJ5QWRkaXRpb25hbFByb3BlcnRpZXMgPSBmYWxzZSkgPT4ge1xyXG4gICAgcmV0dXJuICh2YWx1ZSwgZXJyb3JTY2hlbWEpID0+IHtcclxuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgLy8gRG9uJ3Qgc2V0IHZhbHVlID0gdW5kZWZpbmVkIGZvciBmaWVsZHMgYWRkZWQgYnlcclxuICAgICAgICAvLyBhZGRpdGlvbmFsUHJvcGVydGllcy4gRG9pbmcgc28gcmVtb3ZlcyB0aGVtIGZyb20gdGhlXHJcbiAgICAgICAgLy8gZm9ybURhdGEsIHdoaWNoIGNhdXNlcyB0aGVtIHRvIGNvbXBsZXRlbHkgZGlzYXBwZWFyXHJcbiAgICAgICAgLy8gKGluY2x1ZGluZyB0aGUgaW5wdXQgZmllbGQgZm9yIHRoZSBwcm9wZXJ0eSBuYW1lKS4gVW5saWtlXHJcbiAgICAgICAgLy8gZmllbGRzIHdoaWNoIGFyZSBcIm1hbmRhdGVkXCIgYnkgdGhlIHNjaGVtYSwgdGhlc2UgZmllbGRzIGNhblxyXG4gICAgICAgIC8vIGJlIHNldCB0byB1bmRlZmluZWQgYnkgY2xpY2tpbmcgYSBcImRlbGV0ZSBmaWVsZFwiIGJ1dHRvbiwgc29cclxuICAgICAgICAvLyBzZXQgZW1wdHkgdmFsdWVzIHRvIHRoZSBlbXB0eSBzdHJpbmcuXHJcbiAgICAgICAgdmFsdWUgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG5ld0Zvcm1EYXRhID0geyAuLi50aGlzLnByb3BzLmZvcm1EYXRhLCBbbmFtZV06IHZhbHVlIH07XHJcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoXHJcbiAgICAgICAgbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JTY2hlbWEgJiZcclxuICAgICAgICAgIHRoaXMucHJvcHMuZXJyb3JTY2hlbWEgJiYge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgICBbbmFtZV06IGVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBvbkRyb3BQcm9wZXJ0eUNsaWNrID0ga2V5ID0+IHtcclxuICAgIHJldHVybiBldmVudCA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IHsgb25DaGFuZ2UsIGZvcm1EYXRhIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICBjb25zdCBjb3BpZWRGb3JtRGF0YSA9IHsgLi4uZm9ybURhdGEgfTtcclxuICAgICAgZGVsZXRlIGNvcGllZEZvcm1EYXRhW2tleV07XHJcbiAgICAgIG9uQ2hhbmdlKGNvcGllZEZvcm1EYXRhKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgZ2V0QXZhaWxhYmxlS2V5ID0gKHByZWZlcnJlZEtleSwgZm9ybURhdGEpID0+IHtcclxuICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICB2YXIgbmV3S2V5ID0gcHJlZmVycmVkS2V5O1xyXG4gICAgd2hpbGUgKGZvcm1EYXRhLmhhc093blByb3BlcnR5KG5ld0tleSkpIHtcclxuICAgICAgbmV3S2V5ID0gYCR7cHJlZmVycmVkS2V5fS0keysraW5kZXh9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdLZXk7XHJcbiAgfTtcclxuXHJcbiAgb25LZXlDaGFuZ2UgPSBvbGRWYWx1ZSA9PiB7XHJcbiAgICByZXR1cm4gKHZhbHVlLCBlcnJvclNjaGVtYSkgPT4ge1xyXG4gICAgICBpZiAob2xkVmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0QXZhaWxhYmxlS2V5KHZhbHVlLCB0aGlzLnByb3BzLmZvcm1EYXRhKTtcclxuICAgICAgY29uc3QgbmV3Rm9ybURhdGEgPSB7IC4uLnRoaXMucHJvcHMuZm9ybURhdGEgfTtcclxuICAgICAgY29uc3QgbmV3S2V5cyA9IHsgW29sZFZhbHVlXTogdmFsdWUgfTtcclxuICAgICAgY29uc3Qga2V5VmFsdWVzID0gT2JqZWN0LmtleXMobmV3Rm9ybURhdGEpLm1hcChrZXkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0tleSA9IG5ld0tleXNba2V5XSB8fCBrZXk7XHJcbiAgICAgICAgcmV0dXJuIHsgW25ld0tleV06IG5ld0Zvcm1EYXRhW2tleV0gfTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHJlbmFtZWRPYmogPSBPYmplY3QuYXNzaWduKHt9LCAuLi5rZXlWYWx1ZXMpO1xyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFxyXG4gICAgICAgIHJlbmFtZWRPYmosXHJcbiAgICAgICAgZXJyb3JTY2hlbWEgJiZcclxuICAgICAgICAgIHRoaXMucHJvcHMuZXJyb3JTY2hlbWEgJiYge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgICBbdmFsdWVdOiBlcnJvclNjaGVtYSxcclxuICAgICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgZ2V0RGVmYXVsdFZhbHVlKHR5cGUpIHtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlIFwic3RyaW5nXCI6XHJcbiAgICAgICAgcmV0dXJuIFwiTmV3IFZhbHVlXCI7XHJcbiAgICAgIGNhc2UgXCJhcnJheVwiOlxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgICAgY2FzZSBcImJvb2xlYW5cIjpcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGNhc2UgXCJudWxsXCI6XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIGNhc2UgXCJudW1iZXJcIjpcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgY2FzZSBcIm9iamVjdFwiOlxyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBXZSBkb24ndCBoYXZlIGEgZGF0YXR5cGUgZm9yIHNvbWUgcmVhc29uIChwZXJoYXBzIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIHdhcyB0cnVlKVxyXG4gICAgICAgIHJldHVybiBcIk5ldyBWYWx1ZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlQWRkQ2xpY2sgPSBzY2hlbWEgPT4gKCkgPT4ge1xyXG4gICAgbGV0IHR5cGUgPSBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMudHlwZTtcclxuICAgIGNvbnN0IG5ld0Zvcm1EYXRhID0geyAuLi50aGlzLnByb3BzLmZvcm1EYXRhIH07XHJcblxyXG4gICAgaWYgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIikpIHtcclxuICAgICAgY29uc3QgeyByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICBjb25zdCByZWZTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShcclxuICAgICAgICB7ICRyZWY6IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllc1tcIiRyZWZcIl0gfSxcclxuICAgICAgICByZWdpc3RyeS5yb290U2NoZW1hLFxyXG4gICAgICAgIHRoaXMucHJvcHMuZm9ybURhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHR5cGUgPSByZWZTY2hlbWEudHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdGb3JtRGF0YVtcclxuICAgICAgdGhpcy5nZXRBdmFpbGFibGVLZXkoXCJuZXdLZXlcIiwgbmV3Rm9ybURhdGEpXHJcbiAgICBdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUodHlwZSk7XHJcblxyXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdGb3JtRGF0YSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgbmFtZSxcclxuICAgICAgcmVxdWlyZWQsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgaWRQcmVmaXgsXHJcbiAgICAgIGlkU2VwYXJhdG9yLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEsIGZpZWxkcywgZm9ybUNvbnRleHQgfSA9IHJlZ2lzdHJ5O1xyXG4gICAgY29uc3QgeyBTY2hlbWFGaWVsZCwgVGl0bGVGaWVsZCwgRGVzY3JpcHRpb25GaWVsZCB9ID0gZmllbGRzO1xyXG4gICAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEodGhpcy5wcm9wcy5zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IHNjaGVtYS50aXRsZSA9PT0gdW5kZWZpbmVkID8gbmFtZSA6IHNjaGVtYS50aXRsZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdWlTY2hlbWFbXCJ1aTpkZXNjcmlwdGlvblwiXSB8fCBzY2hlbWEuZGVzY3JpcHRpb247XHJcbiAgICBsZXQgb3JkZXJlZFByb3BlcnRpZXM7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pO1xyXG4gICAgICBvcmRlcmVkUHJvcGVydGllcyA9IG9yZGVyUHJvcGVydGllcyhwcm9wZXJ0aWVzLCB1aVNjaGVtYVtcInVpOm9yZGVyXCJdKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjb25maWctZXJyb3JcIiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT5cclxuICAgICAgICAgICAgSW52YWxpZCB7bmFtZSB8fCBcInJvb3RcIn0gb2JqZWN0IGZpZWxkIGNvbmZpZ3VyYXRpb246XHJcbiAgICAgICAgICAgIDxlbT57ZXJyLm1lc3NhZ2V9PC9lbT4uXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShzY2hlbWEpfTwvcHJlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFRlbXBsYXRlID1cclxuICAgICAgdWlTY2hlbWFbXCJ1aTpPYmplY3RGaWVsZFRlbXBsYXRlXCJdIHx8XHJcbiAgICAgIHJlZ2lzdHJ5Lk9iamVjdEZpZWxkVGVtcGxhdGUgfHxcclxuICAgICAgRGVmYXVsdE9iamVjdEZpZWxkVGVtcGxhdGU7XHJcblxyXG4gICAgY29uc3QgdGVtcGxhdGVQcm9wcyA9IHtcclxuICAgICAgdGl0bGU6IHVpU2NoZW1hW1widWk6dGl0bGVcIl0gfHwgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBUaXRsZUZpZWxkLFxyXG4gICAgICBEZXNjcmlwdGlvbkZpZWxkLFxyXG4gICAgICBwcm9wZXJ0aWVzOiBvcmRlcmVkUHJvcGVydGllcy5tYXAobmFtZSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gc2NoZW1hLnByb3BlcnRpZXNbXHJcbiAgICAgICAgICBuYW1lXHJcbiAgICAgICAgXS5oYXNPd25Qcm9wZXJ0eShBRERJVElPTkFMX1BST1BFUlRZX0ZMQUcpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkVWlTY2hlbWEgPSBhZGRlZEJ5QWRkaXRpb25hbFByb3BlcnRpZXNcclxuICAgICAgICAgID8gdWlTY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXNcclxuICAgICAgICAgIDogdWlTY2hlbWFbbmFtZV07XHJcbiAgICAgICAgY29uc3QgaGlkZGVuID0gZmllbGRVaVNjaGVtYSAmJiBmaWVsZFVpU2NoZW1hW1widWk6d2lkZ2V0XCJdID09PSBcImhpZGRlblwiO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgY29udGVudDogKFxyXG4gICAgICAgICAgICA8U2NoZW1hRmllbGRcclxuICAgICAgICAgICAgICBrZXk9e25hbWV9XHJcbiAgICAgICAgICAgICAgbmFtZT17bmFtZX1cclxuICAgICAgICAgICAgICByZXF1aXJlZD17dGhpcy5pc1JlcXVpcmVkKG5hbWUpfVxyXG4gICAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hLnByb3BlcnRpZXNbbmFtZV19XHJcbiAgICAgICAgICAgICAgdWlTY2hlbWE9e2ZpZWxkVWlTY2hlbWF9XHJcbiAgICAgICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hW25hbWVdfVxyXG4gICAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYVtuYW1lXX1cclxuICAgICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgICAgaWRTZXBhcmF0b3I9e2lkU2VwYXJhdG9yfVxyXG4gICAgICAgICAgICAgIGZvcm1EYXRhPXsoZm9ybURhdGEgfHwge30pW25hbWVdfVxyXG4gICAgICAgICAgICAgIHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQ9e3RoaXMuc3RhdGUud2FzUHJvcGVydHlLZXlNb2RpZmllZH1cclxuICAgICAgICAgICAgICBvbktleUNoYW5nZT17dGhpcy5vbktleUNoYW5nZShuYW1lKX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vblByb3BlcnR5Q2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgIGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cclxuICAgICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgICAgICAgICBvbkRyb3BQcm9wZXJ0eUNsaWNrPXt0aGlzLm9uRHJvcFByb3BlcnR5Q2xpY2t9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgbmFtZSxcclxuICAgICAgICAgIHJlYWRvbmx5LFxyXG4gICAgICAgICAgZGlzYWJsZWQsXHJcbiAgICAgICAgICByZXF1aXJlZCxcclxuICAgICAgICAgIGhpZGRlbixcclxuICAgICAgICB9O1xyXG4gICAgICB9KSxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICByZXF1aXJlZCxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBzY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBmb3JtQ29udGV4dCxcclxuICAgICAgcmVnaXN0cnksXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIDxUZW1wbGF0ZSB7Li4udGVtcGxhdGVQcm9wc30gb25BZGRDbGljaz17dGhpcy5oYW5kbGVBZGRDbGlja30gLz47XHJcbiAgfVxyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgT2JqZWN0RmllbGQucHJvcFR5cGVzID0gdHlwZXMuZmllbGRQcm9wcztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0RmllbGQ7XHJcbiJdfQ==