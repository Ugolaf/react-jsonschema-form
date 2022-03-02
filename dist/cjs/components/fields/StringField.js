"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      registry = _props$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _props$registry,
      rawErrors = props.rawErrors;
  var title = schema.title,
      format = schema.format;
  var widgets = registry.widgets,
      formContext = registry.formContext;
  var enumOptions = (0, _utils.isSelect)(schema) && (0, _utils.optionsList)(schema);
  var defaultWidget = enumOptions ? "select" : "text";

  if (format && (0, _utils.hasWidget)(schema, format, widgets)) {
    defaultWidget = format;
  }

  var _getUiOptions = (0, _utils.getUiOptions)(uiSchema),
      _getUiOptions$widget = _getUiOptions.widget,
      widget = _getUiOptions$widget === void 0 ? defaultWidget : _getUiOptions$widget,
      _getUiOptions$placeho = _getUiOptions.placeholder,
      placeholder = _getUiOptions$placeho === void 0 ? "" : _getUiOptions$placeho,
      options = _objectWithoutProperties(_getUiOptions, ["widget", "placeholder"]);

  var Widget = (0, _utils.getWidget)(schema, widget, widgets);
  return _react["default"].createElement(Widget, {
    options: _objectSpread({}, options, {
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
var _default = StringField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TdHJpbmdGaWVsZC5qcyJdLCJuYW1lcyI6WyJTdHJpbmdGaWVsZCIsInByb3BzIiwic2NoZW1hIiwibmFtZSIsInVpU2NoZW1hIiwiaWRTY2hlbWEiLCJmb3JtRGF0YSIsInJlcXVpcmVkIiwiZGlzYWJsZWQiLCJyZWFkb25seSIsImF1dG9mb2N1cyIsIm9uQ2hhbmdlIiwib25CbHVyIiwib25Gb2N1cyIsInJlZ2lzdHJ5IiwicmF3RXJyb3JzIiwidGl0bGUiLCJmb3JtYXQiLCJ3aWRnZXRzIiwiZm9ybUNvbnRleHQiLCJlbnVtT3B0aW9ucyIsImRlZmF1bHRXaWRnZXQiLCJ3aWRnZXQiLCJwbGFjZWhvbGRlciIsIm9wdGlvbnMiLCJXaWRnZXQiLCIkaWQiLCJ1bmRlZmluZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJ0eXBlcyIsImZpZWxkUHJvcHMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFTQSxTQUFTQSxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUFBLE1BRXhCQyxNQUZ3QixHQWdCdEJELEtBaEJzQixDQUV4QkMsTUFGd0I7QUFBQSxNQUd4QkMsSUFId0IsR0FnQnRCRixLQWhCc0IsQ0FHeEJFLElBSHdCO0FBQUEsTUFJeEJDLFFBSndCLEdBZ0J0QkgsS0FoQnNCLENBSXhCRyxRQUp3QjtBQUFBLE1BS3hCQyxRQUx3QixHQWdCdEJKLEtBaEJzQixDQUt4QkksUUFMd0I7QUFBQSxNQU14QkMsUUFOd0IsR0FnQnRCTCxLQWhCc0IsQ0FNeEJLLFFBTndCO0FBQUEsTUFPeEJDLFFBUHdCLEdBZ0J0Qk4sS0FoQnNCLENBT3hCTSxRQVB3QjtBQUFBLE1BUXhCQyxRQVJ3QixHQWdCdEJQLEtBaEJzQixDQVF4Qk8sUUFSd0I7QUFBQSxNQVN4QkMsUUFUd0IsR0FnQnRCUixLQWhCc0Is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c0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgZ2V0V2lkZ2V0LFxyXG4gIGdldFVpT3B0aW9ucyxcclxuICBpc1NlbGVjdCxcclxuICBvcHRpb25zTGlzdCxcclxuICBnZXREZWZhdWx0UmVnaXN0cnksXHJcbiAgaGFzV2lkZ2V0LFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gU3RyaW5nRmllbGQocHJvcHMpIHtcclxuICBjb25zdCB7XHJcbiAgICBzY2hlbWEsXHJcbiAgICBuYW1lLFxyXG4gICAgdWlTY2hlbWEsXHJcbiAgICBpZFNjaGVtYSxcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICBkaXNhYmxlZCxcclxuICAgIHJlYWRvbmx5LFxyXG4gICAgYXV0b2ZvY3VzLFxyXG4gICAgb25DaGFuZ2UsXHJcbiAgICBvbkJsdXIsXHJcbiAgICBvbkZvY3VzLFxyXG4gICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgIHJhd0Vycm9ycyxcclxuICB9ID0gcHJvcHM7XHJcbiAgY29uc3QgeyB0aXRsZSwgZm9ybWF0IH0gPSBzY2hlbWE7XHJcbiAgY29uc3QgeyB3aWRnZXRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgY29uc3QgZW51bU9wdGlvbnMgPSBpc1NlbGVjdChzY2hlbWEpICYmIG9wdGlvbnNMaXN0KHNjaGVtYSk7XHJcbiAgbGV0IGRlZmF1bHRXaWRnZXQgPSBlbnVtT3B0aW9ucyA/IFwic2VsZWN0XCIgOiBcInRleHRcIjtcclxuICBpZiAoZm9ybWF0ICYmIGhhc1dpZGdldChzY2hlbWEsIGZvcm1hdCwgd2lkZ2V0cykpIHtcclxuICAgIGRlZmF1bHRXaWRnZXQgPSBmb3JtYXQ7XHJcbiAgfVxyXG4gIGNvbnN0IHsgd2lkZ2V0ID0gZGVmYXVsdFdpZGdldCwgcGxhY2Vob2xkZXIgPSBcIlwiLCAuLi5vcHRpb25zIH0gPSBnZXRVaU9wdGlvbnMoXHJcbiAgICB1aVNjaGVtYVxyXG4gICk7XHJcbiAgY29uc3QgV2lkZ2V0ID0gZ2V0V2lkZ2V0KHNjaGVtYSwgd2lkZ2V0LCB3aWRnZXRzKTtcclxuICByZXR1cm4gKFxyXG4gICAgPFdpZGdldFxyXG4gICAgICBvcHRpb25zPXt7IC4uLm9wdGlvbnMsIGVudW1PcHRpb25zIH19XHJcbiAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgIGlkPXtpZFNjaGVtYSAmJiBpZFNjaGVtYS4kaWR9XHJcbiAgICAgIGxhYmVsPXt0aXRsZSA9PT0gdW5kZWZpbmVkID8gbmFtZSA6IHRpdGxlfVxyXG4gICAgICB2YWx1ZT17Zm9ybURhdGF9XHJcbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cclxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICByYXdFcnJvcnM9e3Jhd0Vycm9yc31cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIFN0cmluZ0ZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XHJcbn1cclxuXHJcblN0cmluZ0ZpZWxkLmRlZmF1bHRQcm9wcyA9IHtcclxuICB1aVNjaGVtYToge30sXHJcbiAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gIHJlYWRvbmx5OiBmYWxzZSxcclxuICBhdXRvZm9jdXM6IGZhbHNlLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RyaW5nRmllbGQ7XHJcbiJdfQ==