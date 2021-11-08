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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9PYmplY3RGaWVsZC5qcyJdLCJuYW1lcyI6WyJBZGRCdXR0b24iLCJSZWFjdCIsIkNvbXBvbmVudCIsInR5cGVzIiwib3JkZXJQcm9wZXJ0aWVzIiwicmV0cmlldmVTY2hlbWEiLCJnZXREZWZhdWx0UmVnaXN0cnkiLCJjYW5FeHBhbmQiLCJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJEZWZhdWx0T2JqZWN0RmllbGRUZW1wbGF0ZSIsInByb3BzIiwiVGl0bGVGaWVsZCIsIkRlc2NyaXB0aW9uRmllbGQiLCJpZFNjaGVtYSIsIiRpZCIsInVpU2NoZW1hIiwidGl0bGUiLCJyZXF1aXJlZCIsImZvcm1Db250ZXh0IiwiZGVzY3JpcHRpb24iLCJwcm9wZXJ0aWVzIiwibWFwIiwicHJvcCIsImNvbnRlbnQiLCJzY2hlbWEiLCJmb3JtRGF0YSIsIm9uQWRkQ2xpY2siLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiT2JqZWN0RmllbGQiLCJ3YXNQcm9wZXJ0eUtleU1vZGlmaWVkIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJuYW1lIiwiYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwidmFsdWUiLCJlcnJvclNjaGVtYSIsInVuZGVmaW5lZCIsIm5ld0Zvcm1EYXRhIiwib25DaGFuZ2UiLCJrZXkiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY29waWVkRm9ybURhdGEiLCJwcmVmZXJyZWRLZXkiLCJpbmRleCIsIm5ld0tleSIsImhhc093blByb3BlcnR5Iiwib2xkVmFsdWUiLCJnZXRBdmFpbGFibGVLZXkiLCJuZXdLZXlzIiwia2V5VmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsInJlbmFtZWRPYmoiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsInR5cGUiLCJyZWdpc3RyeSIsInJlZlNjaGVtYSIsIiRyZWYiLCJyb290U2NoZW1hIiwiZ2V0RGVmYXVsdFZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXhPZiIsImlkUHJlZml4Iiwib25CbHVyIiwib25Gb2N1cyIsImZpZWxkcyIsIlNjaGVtYUZpZWxkIiwib3JkZXJlZFByb3BlcnRpZXMiLCJlcnIiLCJjb2xvciIsIm1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiVGVtcGxhdGUiLCJPYmplY3RGaWVsZFRlbXBsYXRlIiwidGVtcGxhdGVQcm9wcyIsImZpZWxkVWlTY2hlbWEiLCJoaWRkZW4iLCJpc1JlcXVpcmVkIiwic3RhdGUiLCJvbktleUNoYW5nZSIsIm9uUHJvcGVydHlDaGFuZ2UiLCJvbkRyb3BQcm9wZXJ0eUNsaWNrIiwiaGFuZGxlQWRkQ2xpY2siLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJmaWVsZFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxPQUFPQyxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU8sS0FBS0MsS0FBWixNQUF1QixhQUF2QjtBQUVBLFNBQ0VDLGVBREYsRUFFRUMsY0FGRixFQUdFQyxrQkFIRixFQUlFQyxTQUpGLEVBS0VDLHdCQUxGLFFBTU8sYUFOUDs7QUFRQSxTQUFTQywwQkFBVCxDQUFvQ0MsS0FBcEMsRUFBMkM7QUFBQSxNQUNqQ0MsVUFEaUMsR0FDQUQsS0FEQSxDQUNqQ0MsVUFEaUM7QUFBQSxNQUNyQkMsZ0JBRHFCLEdBQ0FGLEtBREEsQ0FDckJFLGdCQURxQjtBQUV6QyxTQUNFO0FBQVUsSUFBQSxFQUFFLEVBQUVGLEtBQUssQ0FBQ0csUUFBTixDQUFlQztBQUE3QixLQUNHLENBQUNKLEtBQUssQ0FBQ0ssUUFBTixDQUFlLFVBQWYsS0FBOEJMLEtBQUssQ0FBQ00sS0FBckMsS0FDQyxvQkFBQyxVQUFEO0FBQ0UsSUFBQSxFQUFFLFlBQUtOLEtBQUssQ0FBQ0csUUFBTixDQUFlQyxHQUFwQixZQURKO0FBRUUsSUFBQSxLQUFLLEVBQUVKLEtBQUss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QTJDO0FBQ3pDNUQsRUFBQUEsV0FBVyxDQUFDNkQsU0FBWixHQUF3QnZGLEtBQUssQ0FBQ3dGLFVBQTlCO0FBQ0Q7O0FBRUQsZUFBZTlELFdBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRkQnV0dG9uIGZyb20gXCIuLi9BZGRCdXR0b25cIjtcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgb3JkZXJQcm9wZXJ0aWVzLFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcclxuICBjYW5FeHBhbmQsXHJcbiAgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gRGVmYXVsdE9iamVjdEZpZWxkVGVtcGxhdGUocHJvcHMpIHtcclxuICBjb25zdCB7IFRpdGxlRmllbGQsIERlc2NyaXB0aW9uRmllbGQgfSA9IHByb3BzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZmllbGRzZXQgaWQ9e3Byb3BzLmlkU2NoZW1hLiRpZH0+XHJcbiAgICAgIHsocHJvcHMudWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCBwcm9wcy50aXRsZSkgJiYgKFxyXG4gICAgICAgIDxUaXRsZUZpZWxkXHJcbiAgICAgICAgICBpZD17YCR7cHJvcHMuaWRTY2hlbWEuJGlkfV9fdGl0bGVgfVxyXG4gICAgICAgICAgdGl0bGU9e3Byb3BzLnRpdGxlIHx8IHByb3BzLnVpU2NoZW1hW1widWk6dGl0bGVcIl19XHJcbiAgICAgICAgICByZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XHJcbiAgICAgICAgICBmb3JtQ29udGV4dD17cHJvcHMuZm9ybUNvbnRleHR9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgICAge3Byb3BzLmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICA8RGVzY3JpcHRpb25GaWVsZFxyXG4gICAgICAgICAgaWQ9e2Ake3Byb3BzLmlkU2NoZW1hLiRpZH1fX2Rlc2NyaXB0aW9uYH1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtwcm9wcy5kZXNjcmlwdGlvbn1cclxuICAgICAgICAgIGZvcm1Db250ZXh0PXtwcm9wcy5mb3JtQ29udGV4dH1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgICB7cHJvcHMucHJvcGVydGllcy5tYXAocHJvcCA9PiBwcm9wLmNvbnRlbnQpfVxyXG4gICAgICB7Y2FuRXhwYW5kKHByb3BzLnNjaGVtYSwgcHJvcHMudWlTY2hlbWEsIHByb3BzLmZvcm1EYXRhKSAmJiAoXHJcbiAgICAgICAgPEFkZEJ1dHRvblxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwib2JqZWN0LXByb3BlcnR5LWV4cGFuZFwiXHJcbiAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkFkZENsaWNrKHByb3BzLnNjaGVtYSl9XHJcbiAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgKTtcclxufVxyXG5cclxuY2xhc3MgT2JqZWN0RmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB1aVNjaGVtYToge30sXHJcbiAgICBmb3JtRGF0YToge30sXHJcbiAgICBlcnJvclNjaGVtYToge30sXHJcbiAgICBpZFNjaGVtYToge30sXHJcbiAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICByZWFkb25seTogZmFsc2UsXHJcbiAgfTtcclxuXHJcbiAgc3RhdGUgPSB7XHJcbiAgICB3YXNQcm9wZXJ0eUtleU1vZGlmaWVkOiBmYWxzZSxcclxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7fSxcclxuICB9O1xyXG5cclxuICBpc1JlcXVpcmVkKG5hbWUpIHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMucHJvcHMuc2NoZW1hO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpICYmIHNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKG5hbWUpICE9PSAtMVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG9uUHJvcGVydHlDaGFuZ2UgPSAobmFtZSwgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gZmFsc2UpID0+IHtcclxuICAgIHJldHVybiAodmFsdWUsIGVycm9yU2NoZW1hKSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllcykge1xyXG4gICAgICAgIC8vIERvbid0IHNldCB2YWx1ZSA9IHVuZGVmaW5lZCBmb3IgZmllbGRzIGFkZGVkIGJ5XHJcbiAgICAgICAgLy8gYWRkaXRpb25hbFByb3BlcnRpZXMuIERvaW5nIHNvIHJlbW92ZXMgdGhlbSBmcm9tIHRoZVxyXG4gICAgICAgIC8vIGZvcm1EYXRhLCB3aGljaCBjYXVzZXMgdGhlbSB0byBjb21wbGV0ZWx5IGRpc2FwcGVhclxyXG4gICAgICAgIC8vIChpbmNsdWRpbmcgdGhlIGlucHV0IGZpZWxkIGZvciB0aGUgcHJvcGVydHkgbmFtZSkuIFVubGlrZVxyXG4gICAgICAgIC8vIGZpZWxkcyB3aGljaCBhcmUgXCJtYW5kYXRlZFwiIGJ5IHRoZSBzY2hlbWEsIHRoZXNlIGZpZWxkcyBjYW5cclxuICAgICAgICAvLyBiZSBzZXQgdG8gdW5kZWZpbmVkIGJ5IGNsaWNraW5nIGEgXCJkZWxldGUgZmllbGRcIiBidXR0b24sIHNvXHJcbiAgICAgICAgLy8gc2V0IGVtcHR5IHZhbHVlcyB0byB0aGUgZW1wdHkgc3RyaW5nLlxyXG4gICAgICAgIHZhbHVlID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBuZXdGb3JtRGF0YSA9IHsgLi4udGhpcy5wcm9wcy5mb3JtRGF0YSwgW25hbWVdOiB2YWx1ZSB9O1xyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFxyXG4gICAgICAgIG5ld0Zvcm1EYXRhLFxyXG4gICAgICAgIGVycm9yU2NoZW1hICYmXHJcbiAgICAgICAgICB0aGlzLnByb3BzLmVycm9yU2NoZW1hICYmIHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5lcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgW25hbWVdOiBlcnJvclNjaGVtYSxcclxuICAgICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgb25Ecm9wUHJvcGVydHlDbGljayA9IGtleSA9PiB7XHJcbiAgICByZXR1cm4gZXZlbnQgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCB7IG9uQ2hhbmdlLCBmb3JtRGF0YSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgY29uc3QgY29waWVkRm9ybURhdGEgPSB7IC4uLmZvcm1EYXRhIH07XHJcbiAgICAgIGRlbGV0ZSBjb3BpZWRGb3JtRGF0YVtrZXldO1xyXG4gICAgICBvbkNoYW5nZShjb3BpZWRGb3JtRGF0YSk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIGdldEF2YWlsYWJsZUtleSA9IChwcmVmZXJyZWRLZXksIGZvcm1EYXRhKSA9PiB7XHJcbiAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgdmFyIG5ld0tleSA9IHByZWZlcnJlZEtleTtcclxuICAgIHdoaWxlIChmb3JtRGF0YS5oYXNPd25Qcm9wZXJ0eShuZXdLZXkpKSB7XHJcbiAgICAgIG5ld0tleSA9IGAke3ByZWZlcnJlZEtleX0tJHsrK2luZGV4fWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3S2V5O1xyXG4gIH07XHJcblxyXG4gIG9uS2V5Q2hhbmdlID0gb2xkVmFsdWUgPT4ge1xyXG4gICAgcmV0dXJuICh2YWx1ZSwgZXJyb3JTY2hlbWEpID0+IHtcclxuICAgICAgaWYgKG9sZFZhbHVlID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFsdWUgPSB0aGlzLmdldEF2YWlsYWJsZUtleSh2YWx1ZSwgdGhpcy5wcm9wcy5mb3JtRGF0YSk7XHJcbiAgICAgIGNvbnN0IG5ld0Zvcm1EYXRhID0geyAuLi50aGlzLnByb3BzLmZvcm1EYXRhIH07XHJcbiAgICAgIGNvbnN0IG5ld0tleXMgPSB7IFtvbGRWYWx1ZV06IHZhbHVlIH07XHJcbiAgICAgIGNvbnN0IGtleVZhbHVlcyA9IE9iamVjdC5rZXlzKG5ld0Zvcm1EYXRhKS5tYXAoa2V5ID0+IHtcclxuICAgICAgICBjb25zdCBuZXdLZXkgPSBuZXdLZXlzW2tleV0gfHwga2V5O1xyXG4gICAgICAgIHJldHVybiB7IFtuZXdLZXldOiBuZXdGb3JtRGF0YVtrZXldIH07XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCByZW5hbWVkT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgLi4ua2V5VmFsdWVzKTtcclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB3YXNQcm9wZXJ0eUtleU1vZGlmaWVkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcclxuICAgICAgICByZW5hbWVkT2JqLFxyXG4gICAgICAgIGVycm9yU2NoZW1hICYmXHJcbiAgICAgICAgICB0aGlzLnByb3BzLmVycm9yU2NoZW1hICYmIHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5lcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgW3ZhbHVlXTogZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZSh0eXBlKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSBcInN0cmluZ1wiOlxyXG4gICAgICAgIHJldHVybiBcIk5ldyBWYWx1ZVwiO1xyXG4gICAgICBjYXNlIFwiYXJyYXlcIjpcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIGNhc2UgXCJib29sZWFuXCI6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBjYXNlIFwibnVsbFwiOlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICBjYXNlIFwibnVtYmVyXCI6XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIGNhc2UgXCJvYmplY3RcIjpcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gV2UgZG9uJ3QgaGF2ZSBhIGRhdGF0eXBlIGZvciBzb21lIHJlYXNvbiAocGVyaGFwcyBhZGRpdGlvbmFsUHJvcGVydGllcyB3YXMgdHJ1ZSlcclxuICAgICAgICByZXR1cm4gXCJOZXcgVmFsdWVcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUFkZENsaWNrID0gc2NoZW1hID0+ICgpID0+IHtcclxuICAgIGxldCB0eXBlID0gc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLnR5cGU7XHJcbiAgICBjb25zdCBuZXdGb3JtRGF0YSA9IHsgLi4udGhpcy5wcm9wcy5mb3JtRGF0YSB9O1xyXG5cclxuICAgIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XHJcbiAgICAgIGNvbnN0IHsgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgY29uc3QgcmVmU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgICAgeyAkcmVmOiBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXNbXCIkcmVmXCJdIH0sXHJcbiAgICAgICAgcmVnaXN0cnkucm9vdFNjaGVtYSxcclxuICAgICAgICB0aGlzLnByb3BzLmZvcm1EYXRhXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0eXBlID0gcmVmU2NoZW1hLnR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3Rm9ybURhdGFbXHJcbiAgICAgIHRoaXMuZ2V0QXZhaWxhYmxlS2V5KFwibmV3S2V5XCIsIG5ld0Zvcm1EYXRhKVxyXG4gICAgXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHR5cGUpO1xyXG5cclxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UobmV3Rm9ybURhdGEpO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEsIGZpZWxkcywgZm9ybUNvbnRleHQgfSA9IHJlZ2lzdHJ5O1xyXG4gICAgY29uc3QgeyBTY2hlbWFGaWVsZCwgVGl0bGVGaWVsZCwgRGVzY3JpcHRpb25GaWVsZCB9ID0gZmllbGRzO1xyXG4gICAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEodGhpcy5wcm9wcy5zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IHNjaGVtYS50aXRsZSA9PT0gdW5kZWZpbmVkID8gbmFtZSA6IHNjaGVtYS50aXRsZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdWlTY2hlbWFbXCJ1aTpkZXNjcmlwdGlvblwiXSB8fCBzY2hlbWEuZGVzY3JpcHRpb247XHJcbiAgICBsZXQgb3JkZXJlZFByb3BlcnRpZXM7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pO1xyXG4gICAgICBvcmRlcmVkUHJvcGVydGllcyA9IG9yZGVyUHJvcGVydGllcyhwcm9wZXJ0aWVzLCB1aVNjaGVtYVtcInVpOm9yZGVyXCJdKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjb25maWctZXJyb3JcIiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT5cclxuICAgICAgICAgICAgSW52YWxpZCB7bmFtZSB8fCBcInJvb3RcIn0gb2JqZWN0IGZpZWxkIGNvbmZpZ3VyYXRpb246XHJcbiAgICAgICAgICAgIDxlbT57ZXJyLm1lc3NhZ2V9PC9lbT4uXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShzY2hlbWEpfTwvcHJlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFRlbXBsYXRlID1cclxuICAgICAgdWlTY2hlbWFbXCJ1aTpPYmplY3RGaWVsZFRlbXBsYXRlXCJdIHx8XHJcbiAgICAgIHJlZ2lzdHJ5Lk9iamVjdEZpZWxkVGVtcGxhdGUgfHxcclxuICAgICAgRGVmYXVsdE9iamVjdEZpZWxkVGVtcGxhdGU7XHJcblxyXG4gICAgY29uc3QgdGVtcGxhdGVQcm9wcyA9IHtcclxuICAgICAgdGl0bGU6IHVpU2NoZW1hW1widWk6dGl0bGVcIl0gfHwgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBUaXRsZUZpZWxkLFxyXG4gICAgICBEZXNjcmlwdGlvbkZpZWxkLFxyXG4gICAgICBwcm9wZXJ0aWVzOiBvcmRlcmVkUHJvcGVydGllcy5tYXAobmFtZSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gc2NoZW1hLnByb3BlcnRpZXNbXHJcbiAgICAgICAgICBuYW1lXHJcbiAgICAgICAgXS5oYXNPd25Qcm9wZXJ0eShBRERJVElPTkFMX1BST1BFUlRZX0ZMQUcpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkVWlTY2hlbWEgPSBhZGRlZEJ5QWRkaXRpb25hbFByb3BlcnRpZXNcclxuICAgICAgICAgID8gdWlTY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXNcclxuICAgICAgICAgIDogdWlTY2hlbWFbbmFtZV07XHJcbiAgICAgICAgY29uc3QgaGlkZGVuID0gZmllbGRVaVNjaGVtYSAmJiBmaWVsZFVpU2NoZW1hW1widWk6d2lkZ2V0XCJdID09PSBcImhpZGRlblwiO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgY29udGVudDogKFxyXG4gICAgICAgICAgICA8U2NoZW1hRmllbGRcclxuICAgICAgICAgICAgICBrZXk9e25hbWV9XHJcbiAgICAgICAgICAgICAgbmFtZT17bmFtZX1cclxuICAgICAgICAgICAgICByZXF1aXJlZD17dGhpcy5pc1JlcXVpcmVkKG5hbWUpfVxyXG4gICAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hLnByb3BlcnRpZXNbbmFtZV19XHJcbiAgICAgICAgICAgICAgdWlTY2hlbWE9e2ZpZWxkVWlTY2hlbWF9XHJcbiAgICAgICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hW25hbWVdfVxyXG4gICAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYVtuYW1lXX1cclxuICAgICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgICAgZm9ybURhdGE9eyhmb3JtRGF0YSB8fCB7fSlbbmFtZV19XHJcbiAgICAgICAgICAgICAgd2FzUHJvcGVydHlLZXlNb2RpZmllZD17dGhpcy5zdGF0ZS53YXNQcm9wZXJ0eUtleU1vZGlmaWVkfVxyXG4gICAgICAgICAgICAgIG9uS2V5Q2hhbmdlPXt0aGlzLm9uS2V5Q2hhbmdlKG5hbWUpfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uUHJvcGVydHlDaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICAgICAgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICAgICAgICAgIG9uRHJvcFByb3BlcnR5Q2xpY2s9e3RoaXMub25Ecm9wUHJvcGVydHlDbGlja31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICksXHJcbiAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgcmVhZG9ubHksXHJcbiAgICAgICAgICBkaXNhYmxlZCxcclxuICAgICAgICAgIHJlcXVpcmVkLFxyXG4gICAgICAgICAgaGlkZGVuLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGZvcm1Db250ZXh0LFxyXG4gICAgICByZWdpc3RyeSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gPFRlbXBsYXRlIHsuLi50ZW1wbGF0ZVByb3BzfSBvbkFkZENsaWNrPXt0aGlzLmhhbmRsZUFkZENsaWNrfSAvPjtcclxuICB9XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBPYmplY3RGaWVsZC5wcm9wVHlwZXMgPSB0eXBlcy5maWVsZFByb3BzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3RGaWVsZDtcclxuIl19