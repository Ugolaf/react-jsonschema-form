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

function BooleanField(props) {
  var schema = props.schema,
      name = props.name,
      uiSchema = props.uiSchema,
      idSchema = props.idSchema,
      formData = props.formData,
      _props$registry = props.registry,
      registry = _props$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _props$registry,
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

  var _getUiOptions = (0, _utils.getUiOptions)(uiSchema),
      _getUiOptions$widget = _getUiOptions.widget,
      widget = _getUiOptions$widget === void 0 ? "checkbox" : _getUiOptions$widget,
      options = _objectWithoutProperties(_getUiOptions, ["widget"]);

  var Widget = (0, _utils.getWidget)(schema, widget, widgets);
  var enumOptions;

  if (Array.isArray(schema.oneOf)) {
    enumOptions = (0, _utils.optionsList)({
      oneOf: schema.oneOf.map(function (option) {
        return _objectSpread({}, option, {
          title: option.title || (option["const"] === true ? "Yes" : "No")
        });
      })
    });
  } else {
    enumOptions = (0, _utils.optionsList)({
      "enum": schema["enum"] || [true, false],
      enumNames: schema.enumNames || (schema["enum"] && schema["enum"][0] === false ? ["No", "Yes"] : ["Yes", "No"])
    });
  }

  return _react["default"].createElement(Widget, {
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
var _default = BooleanField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9Cb29sZWFuRmllbGQuanMiXSwibmFtZXMiOlsiQm9vbGVhbkZpZWxkIiwicHJvcHMiLCJzY2hlbWEiLCJuYW1lIiwidWlTY2hlbWEiLCJpZFNjaGVtYSIsImZvcm1EYXRhIiwicmVnaXN0cnkiLCJyZXF1aXJlZCIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJhdXRvZm9jdXMiLCJvbkNoYW5nZSIsIm9uRm9jdXMiLCJvbkJsdXIiLCJyYXdFcnJvcnMiLCJ0aXRsZSIsIndpZGdldHMiLCJmb3JtQ29udGV4dCIsImZpZWxkcyIsIndpZGdldCIsIm9wdGlvbnMiLCJXaWRnZXQiLCJlbnVtT3B0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsIm9uZU9mIiwibWFwIiwib3B0aW9uIiwiZW51bU5hbWVzIiwiJGlkIiwidW5kZWZpbmVkIiwiRGVzY3JpcHRpb25GaWVsZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsInR5cGVzIiwiZmllbGRQcm9wcyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQU9BLFNBQVNBLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCO0FBQUEsTUFFekJDLE1BRnlCLEdBZ0J2QkQsS0FoQnVCLENBRXpCQyxNQUZ5QjtBQUFBLE1BR3pCQyxJQUh5QixHQWdCdkJGLEtBaEJ1QixDQUd6QkUsSUFIeUI7QUFBQSxNQUl6QkMsUUFKeUIsR0FnQnZCSCxLQWhCdUIsQ0FJekJHLFFBSnlCO0FBQUEsTUFLekJDLFFBTHlCLEdBZ0J2QkosS0FoQnVCLENBS3pCSSxRQUx5QjtBQUFBLE1BTXpCQyxRQU55QixHQWdCdkJMLEtBaEJ1QixDQU16QkssUUFOeUI7QUFBQSx3QkFnQnZCTCxLQWhCdUIsQ0FPekJNLFFBUHlCO0FBQUEsTUFPekJBLFFBUHlCLGdDQU9kLGdDQVBjO0FBQUEsTUFRekJDLFFBUnlC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LElBQUEsU0FBUyxFQUFFUCxTQWZiO0FBZ0JFLElBQUEsU0FBUyxFQUFFSSxTQWhCYjtBQWlCRSxJQUFBLGdCQUFnQixFQUFFSSxNQUFNLENBQUNhO0FBakIzQixJQURGO0FBcUJEOztBQUVELElBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDbkMsRUFBQUEsWUFBWSxDQUFDb0MsU0FBYixHQUF5QkMsS0FBSyxDQUFDQyxVQUEvQjtBQUNEOztBQUVEdEMsWUFBWSxDQUFDdUMsWUFBYixHQUE0QjtBQUMxQm5DLEVBQUFBLFFBQVEsRUFBRSxFQURnQjtBQUUxQkssRUFBQUEsUUFBUSxFQUFFLEtBRmdCO0FBRzFCQyxFQUFBQSxRQUFRLEVBQUUsS0FIZ0I7QUFJMUJDLEVBQUFBLFNBQVMsRUFBRTtBQUplLENBQTVCO2VBT2VYLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICBnZXRXaWRnZXQsXHJcbiAgZ2V0VWlPcHRpb25zLFxyXG4gIG9wdGlvbnNMaXN0LFxyXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuXHJcbmZ1bmN0aW9uIEJvb2xlYW5GaWVsZChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIHNjaGVtYSxcclxuICAgIG5hbWUsXHJcbiAgICB1aVNjaGVtYSxcclxuICAgIGlkU2NoZW1hLFxyXG4gICAgZm9ybURhdGEsXHJcbiAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICBkaXNhYmxlZCxcclxuICAgIHJlYWRvbmx5LFxyXG4gICAgYXV0b2ZvY3VzLFxyXG4gICAgb25DaGFuZ2UsXHJcbiAgICBvbkZvY3VzLFxyXG4gICAgb25CbHVyLFxyXG4gICAgcmF3RXJyb3JzLFxyXG4gIH0gPSBwcm9wcztcclxuICBjb25zdCB7IHRpdGxlIH0gPSBzY2hlbWE7XHJcbiAgY29uc3QgeyB3aWRnZXRzLCBmb3JtQ29udGV4dCwgZmllbGRzIH0gPSByZWdpc3RyeTtcclxuICBjb25zdCB7IHdpZGdldCA9IFwiY2hlY2tib3hcIiwgLi4ub3B0aW9ucyB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xyXG5cclxuICBsZXQgZW51bU9wdGlvbnM7XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5vbmVPZikpIHtcclxuICAgIGVudW1PcHRpb25zID0gb3B0aW9uc0xpc3Qoe1xyXG4gICAgICBvbmVPZjogc2NoZW1hLm9uZU9mLm1hcChvcHRpb24gPT4gKHtcclxuICAgICAgICAuLi5vcHRpb24sXHJcbiAgICAgICAgdGl0bGU6IG9wdGlvbi50aXRsZSB8fCAob3B0aW9uLmNvbnN0ID09PSB0cnVlID8gXCJZZXNcIiA6IFwiTm9cIiksXHJcbiAgICAgIH0pKSxcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBlbnVtT3B0aW9ucyA9IG9wdGlvbnNMaXN0KHtcclxuICAgICAgZW51bTogc2NoZW1hLmVudW0gfHwgW3RydWUsIGZhbHNlXSxcclxuICAgICAgZW51bU5hbWVzOlxyXG4gICAgICAgIHNjaGVtYS5lbnVtTmFtZXMgfHxcclxuICAgICAgICAoc2NoZW1hLmVudW0gJiYgc2NoZW1hLmVudW1bMF0gPT09IGZhbHNlXHJcbiAgICAgICAgICA/IFtcIk5vXCIsIFwiWWVzXCJdXHJcbiAgICAgICAgICA6IFtcIlllc1wiLCBcIk5vXCJdKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxXaWRnZXRcclxuICAgICAgb3B0aW9ucz17eyAuLi5vcHRpb25zLCBlbnVtT3B0aW9ucyB9fVxyXG4gICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICBpZD17aWRTY2hlbWEgJiYgaWRTY2hlbWEuJGlkfVxyXG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XHJcbiAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICBsYWJlbD17dGl0bGUgPT09IHVuZGVmaW5lZCA/IG5hbWUgOiB0aXRsZX1cclxuICAgICAgdmFsdWU9e2Zvcm1EYXRhfVxyXG4gICAgICByZXF1aXJlZD17cmVxdWlyZWR9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgIHJhd0Vycm9ycz17cmF3RXJyb3JzfVxyXG4gICAgICBEZXNjcmlwdGlvbkZpZWxkPXtmaWVsZHMuRGVzY3JpcHRpb25GaWVsZH1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIEJvb2xlYW5GaWVsZC5wcm9wVHlwZXMgPSB0eXBlcy5maWVsZFByb3BzO1xyXG59XHJcblxyXG5Cb29sZWFuRmllbGQuZGVmYXVsdFByb3BzID0ge1xyXG4gIHVpU2NoZW1hOiB7fSxcclxuICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gIGF1dG9mb2N1czogZmFsc2UsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCb29sZWFuRmllbGQ7XHJcbiJdfQ==