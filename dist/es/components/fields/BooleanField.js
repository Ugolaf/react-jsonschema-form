function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
import * as types from "../../types";
import { getWidget, getUiOptions, optionsList, getDefaultRegistry } from "../../utils";

function BooleanField(props) {
  var schema = props.schema,
      name = props.name,
      uiSchema = props.uiSchema,
      idSchema = props.idSchema,
      formData = props.formData,
      _props$registry = props.registry,
      registry = _props$registry === void 0 ? getDefaultRegistry() : _props$registry,
      required = props.required,
      disabled = props.disabled,
      readonly = props.readonly,
      autofocus = props.autofocus,
      onChange = props.onChange,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      rawErrors = props.rawErrors;
  var title = schema.title;
  var widgets = registry.widgets,
      formContext = registry.formContext,
      fields = registry.fields;

  var _getUiOptions = getUiOptions(uiSchema),
      _getUiOptions$widget = _getUiOptions.widget,
      widget = _getUiOptions$widget === void 0 ? "checkbox" : _getUiOptions$widget,
      options = _objectWithoutProperties(_getUiOptions, ["widget"]);

  var Widget = getWidget(schema, widget, widgets);
  var enumOptions;

  if (Array.isArray(schema.oneOf)) {
    enumOptions = optionsList({
      oneOf: schema.oneOf.map(function (option) {
        return _objectSpread({}, option, {
          title: option.title || (option["const"] === true ? "Yes" : "No")
        });
      })
    });
  } else {
    enumOptions = optionsList({
      "enum": schema["enum"] || [true, false],
      enumNames: schema.enumNames || (schema["enum"] && schema["enum"][0] === false ? ["No", "Yes"] : ["Yes", "No"])
    });
  }

  return React.createElement(Widget, {
    options: _objectSpread({}, options, {
      enumOptions: enumOptions
    }),
    schema: schema,
    uiSchema: uiSchema,
    id: idSchema && idSchema.$id,
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    label: title === undefined ? name : title,
    value: formData,
    required: required,
    disabled: disabled,
    readonly: readonly,
    registry: registry,
    formContext: formContext,
    autofocus: autofocus,
    rawErrors: rawErrors,
    DescriptionField: fields.DescriptionField
  });
}

if (process.env.NODE_ENV !== "production") {
  BooleanField.propTypes = types.fieldProps;
}

BooleanField.defaultProps = {
  uiSchema: {},
  disabled: false,
  readonly: false,
  autofocus: false
};
export default BooleanField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9Cb29sZWFuRmllbGQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJ0eXBlcyIsImdldFdpZGdldCIsImdldFVpT3B0aW9ucyIsIm9wdGlvbnNMaXN0IiwiZ2V0RGVmYXVsdFJlZ2lzdHJ5IiwiQm9vbGVhbkZpZWxkIiwicHJvcHMiLCJzY2hlbWEiLCJuYW1lIiwidWlTY2hlbWEiLCJpZFNjaGVtYSIsImZvcm1EYXRhIiwicmVnaXN0cnkiLCJyZXF1aXJlZCIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJhdXRvZm9jdXMiLCJvbkNoYW5nZSIsIm9uRm9jdXMiLCJvbkJsdXIiLCJyYXdFcnJvcnMiLCJ0aXRsZSIsIndpZGdldHMiLCJmb3JtQ29udGV4dCIsImZpZWxkcyIsIndpZGdldCIsIm9wdGlvbnMiLCJXaWRnZXQiLCJlbnVtT3B0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsIm9uZU9mIiwibWFwIiwib3B0aW9uIiwiZW51bU5hbWVzIiwiJGlkIiwidW5kZWZpbmVkIiwiRGVzY3JpcHRpb25GaWVsZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsImZpZWxkUHJvcHMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU8sS0FBS0MsS0FBWixNQUF1QixhQUF2QjtBQUVBLFNBQ0VDLFNBREYsRUFFRUMsWUFGRixFQUdFQyxXQUhGLEVBSUVDLGtCQUpGLFFBS08sYUFMUDs7QUFPQSxTQUFTQyxZQUFULENBQXNCQyxLQUF0QixFQUE2QjtBQUFBLE1BRXpCQyxNQUZ5QixHQWdCdkJELEtBaEJ1QixDQUV6QkMsTUFGeUI7QUFBQSxNQUd6QkMsSUFIeUIsR0FnQnZCRixLQWhCdUIsQ0FHekJFLElBSHlCO0FBQUEsTUFJekJDLFFBSnlCLEdBZ0J2QkgsS0FoQnVCLENBSXpCRyxRQUp5QjtBQUFBLE1BS3pC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ZSxTQUFWLEdBQXNCNUIsSUFBdEIsR0FBNkJhLEtBUnRDO0FBU0UsSUFBQSxLQUFLLEVBQUVWLFFBVFQ7QUFVRSxJQUFBLFFBQVEsRUFBRUUsUUFWWjtBQVdFLElBQUEsUUFBUSxFQUFFQyxRQVhaO0FBWUUsSUFBQSxRQUFRLEVBQUVDLFFBWlo7QUFhRSxJQUFBLFFBQVEsRUFBRUgsUUFiWjtBQWNFLElBQUEsV0FBVyxFQUFFVyxXQWRmO0FBZUUsSUFBQSxTQUFTLEVBQUVQLFNBZmI7QUFnQkUsSUFBQSxTQUFTLEVBQUVJLFNBaEJiO0FBaUJFLElBQUEsZ0JBQWdCLEVBQUVJLE1BQU0sQ0FBQ2E7QUFqQjNCLElBREY7QUFxQkQ7O0FBRUQsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNuQyxFQUFBQSxZQUFZLENBQUNvQyxTQUFiLEdBQXlCekMsS0FBSyxDQUFDMEMsVUFBL0I7QUFDRDs7QUFFRHJDLFlBQVksQ0FBQ3NDLFlBQWIsR0FBNEI7QUFDMUJsQyxFQUFBQSxRQUFRLEVBQUUsRUFEZ0I7QUFFMUJLLEVBQUFBLFFBQVEsRUFBRSxLQUZnQjtBQUcxQkMsRUFBQUEsUUFBUSxFQUFFLEtBSGdCO0FBSTFCQyxFQUFBQSxTQUFTLEVBQUU7QUFKZSxDQUE1QjtBQU9BLGVBQWVYLFlBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICBnZXRXaWRnZXQsXHJcbiAgZ2V0VWlPcHRpb25zLFxyXG4gIG9wdGlvbnNMaXN0LFxyXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuXHJcbmZ1bmN0aW9uIEJvb2xlYW5GaWVsZChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIHNjaGVtYSxcclxuICAgIG5hbWUsXHJcbiAgICB1aVNjaGVtYSxcclxuICAgIGlkU2NoZW1hLFxyXG4gICAgZm9ybURhdGEsXHJcbiAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICBkaXNhYmxlZCxcclxuICAgIHJlYWRvbmx5LFxyXG4gICAgYXV0b2ZvY3VzLFxyXG4gICAgb25DaGFuZ2UsXHJcbiAgICBvbkZvY3VzLFxyXG4gICAgb25CbHVyLFxyXG4gICAgcmF3RXJyb3JzLFxyXG4gIH0gPSBwcm9wcztcclxuICBjb25zdCB7IHRpdGxlIH0gPSBzY2hlbWE7XHJcbiAgY29uc3QgeyB3aWRnZXRzLCBmb3JtQ29udGV4dCwgZmllbGRzIH0gPSByZWdpc3RyeTtcclxuICBjb25zdCB7IHdpZGdldCA9IFwiY2hlY2tib3hcIiwgLi4ub3B0aW9ucyB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xyXG5cclxuICBsZXQgZW51bU9wdGlvbnM7XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5vbmVPZikpIHtcclxuICAgIGVudW1PcHRpb25zID0gb3B0aW9uc0xpc3Qoe1xyXG4gICAgICBvbmVPZjogc2NoZW1hLm9uZU9mLm1hcChvcHRpb24gPT4gKHtcclxuICAgICAgICAuLi5vcHRpb24sXHJcbiAgICAgICAgdGl0bGU6IG9wdGlvbi50aXRsZSB8fCAob3B0aW9uLmNvbnN0ID09PSB0cnVlID8gXCJZZXNcIiA6IFwiTm9cIiksXHJcbiAgICAgIH0pKSxcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBlbnVtT3B0aW9ucyA9IG9wdGlvbnNMaXN0KHtcclxuICAgICAgZW51bTogc2NoZW1hLmVudW0gfHwgW3RydWUsIGZhbHNlXSxcclxuICAgICAgZW51bU5hbWVzOlxyXG4gICAgICAgIHNjaGVtYS5lbnVtTmFtZXMgfHxcclxuICAgICAgICAoc2NoZW1hLmVudW0gJiYgc2NoZW1hLmVudW1bMF0gPT09IGZhbHNlXHJcbiAgICAgICAgICA/IFtcIk5vXCIsIFwiWWVzXCJdXHJcbiAgICAgICAgICA6IFtcIlllc1wiLCBcIk5vXCJdKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxXaWRnZXRcclxuICAgICAgb3B0aW9ucz17eyAuLi5vcHRpb25zLCBlbnVtT3B0aW9ucyB9fVxyXG4gICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICBpZD17aWRTY2hlbWEgJiYgaWRTY2hlbWEuJGlkfVxyXG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XHJcbiAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICBsYWJlbD17dGl0bGUgPT09IHVuZGVmaW5lZCA/IG5hbWUgOiB0aXRsZX1cclxuICAgICAgdmFsdWU9e2Zvcm1EYXRhfVxyXG4gICAgICByZXF1aXJlZD17cmVxdWlyZWR9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgIHJhd0Vycm9ycz17cmF3RXJyb3JzfVxyXG4gICAgICBEZXNjcmlwdGlvbkZpZWxkPXtmaWVsZHMuRGVzY3JpcHRpb25GaWVsZH1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIEJvb2xlYW5GaWVsZC5wcm9wVHlwZXMgPSB0eXBlcy5maWVsZFByb3BzO1xyXG59XHJcblxyXG5Cb29sZWFuRmllbGQuZGVmYXVsdFByb3BzID0ge1xyXG4gIHVpU2NoZW1hOiB7fSxcclxuICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gIGF1dG9mb2N1czogZmFsc2UsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCb29sZWFuRmllbGQ7XHJcbiJdfQ==