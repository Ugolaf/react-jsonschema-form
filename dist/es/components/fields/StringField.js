var _excluded = ["widget", "placeholder"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
import * as types from "../../types";
import { getWidget, getUiOptions, isSelect, optionsList, getDefaultRegistry, hasWidget } from "../../utils";

function StringField(props) {
  var schema = props.schema,
      name = props.name,
      uiSchema = props.uiSchema,
      idSchema = props.idSchema,
      formData = props.formData,
      required = props.required,
      disabled = props.disabled,
      readonly = props.readonly,
      autofocus = props.autofocus,
      onChange = props.onChange,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      _props$registry = props.registry,
      registry = _props$registry === void 0 ? getDefaultRegistry() : _props$registry,
      rawErrors = props.rawErrors;
  var title = schema.title,
      format = schema.format;
  var widgets = registry.widgets,
      formContext = registry.formContext;
  var enumOptions = isSelect(schema) && optionsList(schema);
  var defaultWidget = enumOptions ? "select" : "text";

  if (format && hasWidget(schema, format, widgets)) {
    defaultWidget = format;
  }

  var _getUiOptions = getUiOptions(uiSchema),
      _getUiOptions$widget = _getUiOptions.widget,
      widget = _getUiOptions$widget === void 0 ? defaultWidget : _getUiOptions$widget,
      _getUiOptions$placeho = _getUiOptions.placeholder,
      placeholder = _getUiOptions$placeho === void 0 ? "" : _getUiOptions$placeho,
      options = _objectWithoutProperties(_getUiOptions, _excluded);

  var Widget = getWidget(schema, widget, widgets);
  return /*#__PURE__*/React.createElement(Widget, {
    options: _objectSpread(_objectSpread({}, options), {}, {
      enumOptions: enumOptions
    }),
    schema: schema,
    uiSchema: uiSchema,
    id: idSchema && idSchema.$id,
    label: title === undefined ? name : title,
    value: formData,
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus,
    required: required,
    disabled: disabled,
    readonly: readonly,
    formContext: formContext,
    autofocus: autofocus,
    registry: registry,
    placeholder: placeholder,
    rawErrors: rawErrors
  });
}

if (process.env.NODE_ENV !== "production") {
  StringField.propTypes = types.fieldProps;
}

StringField.defaultProps = {
  uiSchema: {},
  disabled: false,
  readonly: false,
  autofocus: false
};
export default StringField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TdHJpbmdGaWVsZC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInR5cGVzIiwiZ2V0V2lkZ2V0IiwiZ2V0VWlPcHRpb25zIiwiaXNTZWxlY3QiLCJvcHRpb25zTGlzdCIsImdldERlZmF1bHRSZWdpc3RyeSIsImhhc1dpZGdldCIsIlN0cmluZ0ZpZWxkIiwicHJvcHMiLCJzY2hlbWEiLCJuYW1lIiwidWlTY2hlbWEiLCJpZFNjaGVtYSIsImZvcm1EYXRhIiwicmVxdWlyZWQiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiYXV0b2ZvY3VzIiwib25DaGFuZ2UiLCJvbkJsdXIiLCJvbkZvY3VzIiwicmVnaXN0cnkiLCJyYXdFcnJvcnMiLCJ0aXRsZSIsImZvcm1hdCIsIndpZGdldHMiLCJmb3JtQ29udGV4dCIsImVudW1PcHRpb25zIiwiZGVmYXVsdFdpZGdldCIsIndpZGdldCIsInBsYWNlaG9sZGVyIiwib3B0aW9ucyIsIldpZGdldCIsIiRpZCIsInVuZGVmaW5lZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsImZpZWxkUHJvcHMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPLEtBQUtDLEtBQVosTUFBdUIsYUFBdkI7QUFFQSxTQUNFQyxTQURGLEVBRUVDLFlBRkYsRUFHRUMsUUFIRixFQUlFQyxXQUpGLEVBS0VDLGtCQUxGLEVBTUVDLFNBTkYsUUFPTyxhQVBQOztBQVNBLFNBQVNDLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQzFCLE1BQ0VDLE1BREYsR0FlSUQsS0FmSixDQUNFQyxNQURGO0FBQUEsTUFFRUMsSUFGRixHQWVJRixLQWZKLENBRUVFLElBRkY7QUFBQSxNQUdFQyxRQUhGLEdBZUlILEtBZkosQ0FHRUcsUUFIRjtBQUFBLE1BSUVDLFFBSkYsR0FlSUosS0FmSixD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QUV6QkksRUFBQUEsUUFBUSxFQUFFLEtBRmU7QUFHekJDLEVBQUFBLFFBQVEsRUFBRSxLQUhlO0FBSXpCQyxFQUFBQSxTQUFTLEVBQUU7QUFKYyxDQUEzQjtBQU9BLGVBQWVWLFdBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICBnZXRXaWRnZXQsXHJcbiAgZ2V0VWlPcHRpb25zLFxyXG4gIGlzU2VsZWN0LFxyXG4gIG9wdGlvbnNMaXN0LFxyXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcclxuICBoYXNXaWRnZXQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5mdW5jdGlvbiBTdHJpbmdGaWVsZChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIHNjaGVtYSxcclxuICAgIG5hbWUsXHJcbiAgICB1aVNjaGVtYSxcclxuICAgIGlkU2NoZW1hLFxyXG4gICAgZm9ybURhdGEsXHJcbiAgICByZXF1aXJlZCxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgcmVhZG9ubHksXHJcbiAgICBhdXRvZm9jdXMsXHJcbiAgICBvbkNoYW5nZSxcclxuICAgIG9uQmx1cixcclxuICAgIG9uRm9jdXMsXHJcbiAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgcmF3RXJyb3JzLFxyXG4gIH0gPSBwcm9wcztcclxuICBjb25zdCB7IHRpdGxlLCBmb3JtYXQgfSA9IHNjaGVtYTtcclxuICBjb25zdCB7IHdpZGdldHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcclxuICBjb25zdCBlbnVtT3B0aW9ucyA9IGlzU2VsZWN0KHNjaGVtYSkgJiYgb3B0aW9uc0xpc3Qoc2NoZW1hKTtcclxuICBsZXQgZGVmYXVsdFdpZGdldCA9IGVudW1PcHRpb25zID8gXCJzZWxlY3RcIiA6IFwidGV4dFwiO1xyXG4gIGlmIChmb3JtYXQgJiYgaGFzV2lkZ2V0KHNjaGVtYSwgZm9ybWF0LCB3aWRnZXRzKSkge1xyXG4gICAgZGVmYXVsdFdpZGdldCA9IGZvcm1hdDtcclxuICB9XHJcbiAgY29uc3QgeyB3aWRnZXQgPSBkZWZhdWx0V2lkZ2V0LCBwbGFjZWhvbGRlciA9IFwiXCIsIC4uLm9wdGlvbnMgfSA9IGdldFVpT3B0aW9ucyhcclxuICAgIHVpU2NoZW1hXHJcbiAgKTtcclxuICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8V2lkZ2V0XHJcbiAgICAgIG9wdGlvbnM9e3sgLi4ub3B0aW9ucywgZW51bU9wdGlvbnMgfX1cclxuICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgIHVpU2NoZW1hPXt1aVNjaGVtYX1cclxuICAgICAgaWQ9e2lkU2NoZW1hICYmIGlkU2NoZW1hLiRpZH1cclxuICAgICAgbGFiZWw9e3RpdGxlID09PSB1bmRlZmluZWQgPyBuYW1lIDogdGl0bGV9XHJcbiAgICAgIHZhbHVlPXtmb3JtRGF0YX1cclxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgb25Gb2N1cz17b25Gb2N1c31cclxuICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgIHJhd0Vycm9ycz17cmF3RXJyb3JzfVxyXG4gICAgLz5cclxuICApO1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgU3RyaW5nRmllbGQucHJvcFR5cGVzID0gdHlwZXMuZmllbGRQcm9wcztcclxufVxyXG5cclxuU3RyaW5nRmllbGQuZGVmYXVsdFByb3BzID0ge1xyXG4gIHVpU2NoZW1hOiB7fSxcclxuICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gIGF1dG9mb2N1czogZmFsc2UsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdHJpbmdGaWVsZDtcclxuIl19