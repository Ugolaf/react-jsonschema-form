var _excluded = ["widget"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
      options = _objectWithoutProperties(_getUiOptions, _excluded);

  var Widget = getWidget(schema, widget, widgets);
  var enumOptions;

  if (Array.isArray(schema.oneOf)) {
    enumOptions = optionsList({
      oneOf: schema.oneOf.map(function (option) {
        return _objectSpread(_objectSpread({}, option), {}, {
          title: option.title || (option.const === true ? "Yes" : "No")
        });
      })
    });
  } else {
    enumOptions = optionsList({
      enum: schema.enum || [true, false],
      enumNames: schema.enumNames || (schema.enum && schema.enum[0] === false ? ["No", "Yes"] : ["Yes", "No"])
    });
  }

  return /*#__PURE__*/React.createElement(Widget, {
    options: _objectSpread(_objectSpread({}, options), {}, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9Cb29sZWFuRmllbGQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJ0eXBlcyIsImdldFdpZGdldCIsImdldFVpT3B0aW9ucyIsIm9wdGlvbnNMaXN0IiwiZ2V0RGVmYXVsdFJlZ2lzdHJ5IiwiQm9vbGVhbkZpZWxkIiwicHJvcHMiLCJzY2hlbWEiLCJuYW1lIiwidWlTY2hlbWEiLCJpZFNjaGVtYSIsImZvcm1EYXRhIiwicmVnaXN0cnkiLCJyZXF1aXJlZCIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJhdXRvZm9jdXMiLCJvbkNoYW5nZSIsIm9uRm9jdXMiLCJvbkJsdXIiLCJyYXdFcnJvcnMiLCJ0aXRsZSIsIndpZGdldHMiLCJmb3JtQ29udGV4dCIsImZpZWxkcyIsIndpZGdldCIsIm9wdGlvbnMiLCJXaWRnZXQiLCJlbnVtT3B0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsIm9uZU9mIiwibWFwIiwib3B0aW9uIiwiY29uc3QiLCJlbnVtIiwiZW51bU5hbWVzIiwiJGlkIiwidW5kZWZpbmVkIiwiRGVzY3JpcHRpb25GaWVsZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsImZpZWxkUHJvcHMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPLEtBQUtDLEtBQVosTUFBdUIsYUFBdkI7QUFFQSxTQUNFQyxTQURGLEVBRUVDLFlBRkYsRUFHRUMsV0FIRixFQUlFQyxrQkFKRixRQUtPLGFBTFA7O0FBT0EsU0FBU0MsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFDM0IsTUFDRUMsTUFERixHQWVJRCxLQWZKLENBQ0VDLE1BREY7QUFBQSxNQUVFQyxJQUZGLEdBZUlGLEtBZkosQ0FFRUUsSUFGRjtBQUFBLE1BR0VDLFFBSEYsR0FlSUgsS0FmSixDQUdFRyxRQUhGO0FBQUEsTUFJRUMsUUFK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QUFFRSxRQVZaO0FBV0UsSUFBQSxRQUFRLEVBQUVDLFFBWFo7QUFZRSxJQUFBLFFBQVEsRUFBRUMsUUFaWjtBQWFFLElBQUEsUUFBUSxFQUFFSCxRQWJaO0FBY0UsSUFBQSxXQUFXLEVBQUVXLFdBZGY7QUFlRSxJQUFBLFNBQVMsRUFBRVAsU0FmYjtBQWdCRSxJQUFBLFNBQVMsRUFBRUksU0FoQmI7QUFpQkUsSUFBQSxnQkFBZ0IsRUFBRUksTUFBTSxDQUFDZTtBQWpCM0IsSUFERjtBQXFCRDs7QUFFRCxJQUFJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q3JDLEVBQUFBLFlBQVksQ0FBQ3NDLFNBQWIsR0FBeUIzQyxLQUFLLENBQUM0QyxVQUEvQjtBQUNEOztBQUVEdkMsWUFBWSxDQUFDd0MsWUFBYixHQUE0QjtBQUMxQnBDLEVBQUFBLFFBQVEsRUFBRSxFQURnQjtBQUUxQkssRUFBQUEsUUFBUSxFQUFFLEtBRmdCO0FBRzFCQyxFQUFBQSxRQUFRLEVBQUUsS0FIZ0I7QUFJMUJDLEVBQUFBLFNBQVMsRUFBRTtBQUplLENBQTVCO0FBT0EsZUFBZVgsWUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gIGdldFdpZGdldCxcclxuICBnZXRVaU9wdGlvbnMsXHJcbiAgb3B0aW9uc0xpc3QsXHJcbiAgZ2V0RGVmYXVsdFJlZ2lzdHJ5LFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gQm9vbGVhbkZpZWxkKHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgc2NoZW1hLFxyXG4gICAgbmFtZSxcclxuICAgIHVpU2NoZW1hLFxyXG4gICAgaWRTY2hlbWEsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXHJcbiAgICByZXF1aXJlZCxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgcmVhZG9ubHksXHJcbiAgICBhdXRvZm9jdXMsXHJcbiAgICBvbkNoYW5nZSxcclxuICAgIG9uRm9jdXMsXHJcbiAgICBvbkJsdXIsXHJcbiAgICByYXdFcnJvcnMsXHJcbiAgfSA9IHByb3BzO1xyXG4gIGNvbnN0IHsgdGl0bGUgfSA9IHNjaGVtYTtcclxuICBjb25zdCB7IHdpZGdldHMsIGZvcm1Db250ZXh0LCBmaWVsZHMgfSA9IHJlZ2lzdHJ5O1xyXG4gIGNvbnN0IHsgd2lkZ2V0ID0gXCJjaGVja2JveFwiLCAuLi5vcHRpb25zIH0gPSBnZXRVaU9wdGlvbnModWlTY2hlbWEpO1xyXG4gIGNvbnN0IFdpZGdldCA9IGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgd2lkZ2V0cyk7XHJcblxyXG4gIGxldCBlbnVtT3B0aW9ucztcclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLm9uZU9mKSkge1xyXG4gICAgZW51bU9wdGlvbnMgPSBvcHRpb25zTGlzdCh7XHJcbiAgICAgIG9uZU9mOiBzY2hlbWEub25lT2YubWFwKG9wdGlvbiA9PiAoe1xyXG4gICAgICAgIC4uLm9wdGlvbixcclxuICAgICAgICB0aXRsZTogb3B0aW9uLnRpdGxlIHx8IChvcHRpb24uY29uc3QgPT09IHRydWUgPyBcIlllc1wiIDogXCJOb1wiKSxcclxuICAgICAgfSkpLFxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGVudW1PcHRpb25zID0gb3B0aW9uc0xpc3Qoe1xyXG4gICAgICBlbnVtOiBzY2hlbWEuZW51bSB8fCBbdHJ1ZSwgZmFsc2VdLFxyXG4gICAgICBlbnVtTmFtZXM6XHJcbiAgICAgICAgc2NoZW1hLmVudW1OYW1lcyB8fFxyXG4gICAgICAgIChzY2hlbWEuZW51bSAmJiBzY2hlbWEuZW51bVswXSA9PT0gZmFsc2VcclxuICAgICAgICAgID8gW1wiTm9cIiwgXCJZZXNcIl1cclxuICAgICAgICAgIDogW1wiWWVzXCIsIFwiTm9cIl0pLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFdpZGdldFxyXG4gICAgICBvcHRpb25zPXt7IC4uLm9wdGlvbnMsIGVudW1PcHRpb25zIH19XHJcbiAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgIGlkPXtpZFNjaGVtYSAmJiBpZFNjaGVtYS4kaWR9XHJcbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgb25Gb2N1cz17b25Gb2N1c31cclxuICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgIGxhYmVsPXt0aXRsZSA9PT0gdW5kZWZpbmVkID8gbmFtZSA6IHRpdGxlfVxyXG4gICAgICB2YWx1ZT17Zm9ybURhdGF9XHJcbiAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cclxuICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgcmF3RXJyb3JzPXtyYXdFcnJvcnN9XHJcbiAgICAgIERlc2NyaXB0aW9uRmllbGQ9e2ZpZWxkcy5EZXNjcmlwdGlvbkZpZWxkfVxyXG4gICAgLz5cclxuICApO1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQm9vbGVhbkZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XHJcbn1cclxuXHJcbkJvb2xlYW5GaWVsZC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgdWlTY2hlbWE6IHt9LFxyXG4gIGRpc2FibGVkOiBmYWxzZSxcclxuICByZWFkb25seTogZmFsc2UsXHJcbiAgYXV0b2ZvY3VzOiBmYWxzZSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJvb2xlYW5GaWVsZDtcclxuIl19