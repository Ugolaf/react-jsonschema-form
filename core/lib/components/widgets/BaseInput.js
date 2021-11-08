function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
import PropTypes from "prop-types";

function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  if (!props.id) {
    console.log("No id for", props);
    throw new Error("no id for props ".concat(JSON.stringify(props)));
  }

  var value = props.value,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      options = props.options,
      schema = props.schema,
      uiSchema = props.uiSchema,
      formContext = props.formContext,
      registry = props.registry,
      rawErrors = props.rawErrors,
      inputProps = _objectWithoutProperties(props, ["value", "readonly", "disabled", "autofocus", "onBlur", "onFocus", "options", "schema", "uiSchema", "formContext", "registry", "rawErrors"]); // If options.inputType is set use that as the input type


  if (options.inputType) {
    inputProps.type = options.inputType;
  } else if (!inputProps.type) {
    // If the schema is of type number or integer, set the input type to number
    if (schema.type === "number") {
      inputProps.type = "number"; // Setting step to 'any' fixes a bug in Safari where decimals are not
      // allowed in number inputs

      inputProps.step = "any";
    } else if (schema.type === "integer") {
      inputProps.type = "number"; // Since this is integer, you always want to step up or down in multiples
      // of 1

      inputProps.step = "1";
    } else {
      inputProps.type = "text";
    }
  }

  if (options.autocomplete) {
    inputProps.autoComplete = options.autocomplete;
  } // If multipleOf is defined, use this as the step value. This mainly improves
  // the experience for keyboard users (who can use the up/down KB arrows).


  if (schema.multipleOf) {
    inputProps.step = schema.multipleOf;
  }

  if (typeof schema.minimum !== "undefined") {
    inputProps.min = schema.minimum;
  }

  if (typeof schema.maximum !== "undefined") {
    inputProps.max = schema.maximum;
  }

  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return props.onChange(value === "" ? options.emptyValue : value);
  };

  return [React.createElement("input", _extends({
    key: inputProps.id,
    className: "form-control",
    readOnly: readonly,
    disabled: disabled,
    autoFocus: autofocus,
    value: value == null ? "" : value
  }, inputProps, {
    list: schema.examples ? "examples_".concat(inputProps.id) : null,
    onChange: _onChange,
    onBlur: onBlur && function (event) {
      return onBlur(inputProps.id, event.target.value);
    },
    onFocus: onFocus && function (event) {
      return onFocus(inputProps.id, event.target.value);
    }
  })), schema.examples ? React.createElement("datalist", {
    key: "datalist_".concat(inputProps.id),
    id: "examples_".concat(inputProps.id)
  }, _toConsumableArray(new Set(schema.examples.concat(schema["default"] ? [schema["default"]] : []))).map(function (example) {
    return React.createElement("option", {
      key: example,
      value: example
    });
  })) : null];
}

BaseInput.defaultProps = {
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  };
}

export default BaseInput;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQmFzZUlucHV0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQmFzZUlucHV0IiwicHJvcHMiLCJpZCIsImNvbnNvbGUiLCJsb2ciLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2YWx1ZSIsInJlYWRvbmx5IiwiZGlzYWJsZWQiLCJhdXRvZm9jdXMiLCJvbkJsdXIiLCJvbkZvY3VzIiwib3B0aW9ucyIsInNjaGVtYSIsInVpU2NoZW1hIiwiZm9ybUNvbnRleHQiLCJyZWdpc3RyeSIsInJhd0Vycm9ycyIsImlucHV0UHJvcHMiLCJpbnB1dFR5cGUiLCJ0eXBlIiwic3RlcCIsImF1dG9jb21wbGV0ZSIsImF1dG9Db21wbGV0ZSIsIm11bHRpcGxlT2YiLCJtaW5pbXVtIiwibWluIiwibWF4aW11bSIsIm1heCIsIl9vbkNoYW5nZSIsInRhcmdldCIsIm9uQ2hhbmdlIiwiZW1wdHlWYWx1ZSIsImV4YW1wbGVzIiwiZXZlbnQiLCJTZXQiLCJjb25jYXQiLCJtYXAiLCJleGFtcGxlIiwiZGVmYXVsdFByb3BzIiwicmVxdWlyZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwicGxhY2Vob2xkZXIiLCJhbnkiLCJib29sIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUN4QjtBQUNBO0FBQ0EsTUFBSSxDQUFDQSxLQUFLLENBQUNDLEVBQVgsRUFBZTtBQUNiQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCSCxLQUF6QjtBQUNBLFVBQU0sSUFBSUksS0FBSiwyQkFBNkJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixLQUFm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QixNQURXO0FBQUEsR0FKWixDQUhILENBREYsR0FZSSxJQTFCQyxDQUFQO0FBNEJEOztBQUVEeEMsU0FBUyxDQUFDeUMsWUFBVixHQUF5QjtBQUN2QkMsRUFBQUEsUUFBUSxFQUFFLEtBRGE7QUFFdkJoQyxFQUFBQSxRQUFRLEVBQUUsS0FGYTtBQUd2QkQsRUFBQUEsUUFBUSxFQUFFLEtBSGE7QUFJdkJFLEVBQUFBLFNBQVMsRUFBRTtBQUpZLENBQXpCOztBQU9BLElBQUlnQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QzdDLEVBQUFBLFNBQVMsQ0FBQzhDLFNBQVYsR0FBc0I7QUFDcEI1QyxJQUFBQSxFQUFFLEVBQUVILFNBQVMsQ0FBQ2dELE1BQVYsQ0FBaUJDLFVBREQ7QUFFcEJDLElBQUFBLFdBQVcsRUFBRWxELFNBQVMsQ0FBQ2dELE1BRkg7QUFHcEJ2QyxJQUFBQSxLQUFLLEVBQUVULFNBQVMsQ0FBQ21ELEdBSEc7QUFJcEJSLElBQUFBLFFBQVEsRUFBRTNDLFNBQVMsQ0FBQ29ELElBSkE7QUFLcEJ6QyxJQUFBQSxRQUFRLEVBQUVYLFNBQVMsQ0FBQ29ELElBTEE7QUFNcEIxQyxJQUFBQSxRQUFRLEVBQUVWLFNBQVMsQ0FBQ29ELElBTkE7QUFPcEJ4QyxJQUFBQSxTQUFTLEVBQUVaLFNBQVMsQ0FBQ29ELElBUEQ7QUFRcEJsQixJQUFBQSxRQUFRLEVBQUVsQyxTQUFTLENBQUNxRCxJQVJBO0FBU3BCeEMsSUFBQUEsTUFBTSxFQUFFYixTQUFTLENBQUNxRCxJQVRFO0FBVXBCdkMsSUFBQUEsT0FBTyxFQUFFZCxTQUFTLENBQUNxRDtBQVZDLEdBQXRCO0FBWUQ7O0FBRUQsZUFBZXBELFNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmZ1bmN0aW9uIEJhc2VJbnB1dChwcm9wcykge1xyXG4gIC8vIE5vdGU6IHNpbmNlIFJlYWN0IDE1LjIuMCB3ZSBjYW4ndCBmb3J3YXJkIHVua25vd24gZWxlbWVudCBhdHRyaWJ1dGVzLCBzbyB3ZVxyXG4gIC8vIGV4Y2x1ZGUgdGhlIFwib3B0aW9uc1wiIGFuZCBcInNjaGVtYVwiIG9uZXMgaGVyZS5cclxuICBpZiAoIXByb3BzLmlkKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5vIGlkIGZvclwiLCBwcm9wcyk7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIGlkIGZvciBwcm9wcyAke0pTT04uc3RyaW5naWZ5KHByb3BzKX1gKTtcclxuICB9XHJcbiAgY29uc3Qge1xyXG4gICAgdmFsdWUsXHJcbiAgICByZWFkb25seSxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgYXV0b2ZvY3VzLFxyXG4gICAgb25CbHVyLFxyXG4gICAgb25Gb2N1cyxcclxuICAgIG9wdGlvbnMsXHJcbiAgICBzY2hlbWEsXHJcbiAgICB1aVNjaGVtYSxcclxuICAgIGZvcm1Db250ZXh0LFxyXG4gICAgcmVnaXN0cnksXHJcbiAgICByYXdFcnJvcnMsXHJcbiAgICAuLi5pbnB1dFByb3BzXHJcbiAgfSA9IHByb3BzO1xyXG5cclxuICAvLyBJZiBvcHRpb25zLmlucHV0VHlwZSBpcyBzZXQgdXNlIHRoYXQgYXMgdGhlIGlucHV0IHR5cGVcclxuICBpZiAob3B0aW9ucy5pbnB1dFR5cGUpIHtcclxuICAgIGlucHV0UHJvcHMudHlwZSA9IG9wdGlvbnMuaW5wdXRUeXBlO1xyXG4gIH0gZWxzZSBpZiAoIWlucHV0UHJvcHMudHlwZSkge1xyXG4gICAgLy8gSWYgdGhlIHNjaGVtYSBpcyBvZiB0eXBlIG51bWJlciBvciBpbnRlZ2VyLCBzZXQgdGhlIGlucHV0IHR5cGUgdG8gbnVtYmVyXHJcbiAgICBpZiAoc2NoZW1hLnR5cGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgaW5wdXRQcm9wcy50eXBlID0gXCJudW1iZXJcIjtcclxuICAgICAgLy8gU2V0dGluZyBzdGVwIHRvICdhbnknIGZpeGVzIGEgYnVnIGluIFNhZmFyaSB3aGVyZSBkZWNpbWFscyBhcmUgbm90XHJcbiAgICAgIC8vIGFsbG93ZWQgaW4gbnVtYmVyIGlucHV0c1xyXG4gICAgICBpbnB1dFByb3BzLnN0ZXAgPSBcImFueVwiO1xyXG4gICAgfSBlbHNlIGlmIChzY2hlbWEudHlwZSA9PT0gXCJpbnRlZ2VyXCIpIHtcclxuICAgICAgaW5wdXRQcm9wcy50eXBlID0gXCJudW1iZXJcIjtcclxuICAgICAgLy8gU2luY2UgdGhpcyBpcyBpbnRlZ2VyLCB5b3UgYWx3YXlzIHdhbnQgdG8gc3RlcCB1cCBvciBkb3duIGluIG11bHRpcGxlc1xyXG4gICAgICAvLyBvZiAxXHJcbiAgICAgIGlucHV0UHJvcHMuc3RlcCA9IFwiMVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5wdXRQcm9wcy50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9ucy5hdXRvY29tcGxldGUpIHtcclxuICAgIGlucHV0UHJvcHMuYXV0b0NvbXBsZXRlID0gb3B0aW9ucy5hdXRvY29tcGxldGU7XHJcbiAgfVxyXG5cclxuICAvLyBJZiBtdWx0aXBsZU9mIGlzIGRlZmluZWQsIHVzZSB0aGlzIGFzIHRoZSBzdGVwIHZhbHVlLiBUaGlzIG1haW5seSBpbXByb3Zlc1xyXG4gIC8vIHRoZSBleHBlcmllbmNlIGZvciBrZXlib2FyZCB1c2VycyAod2hvIGNhbiB1c2UgdGhlIHVwL2Rvd24gS0IgYXJyb3dzKS5cclxuICBpZiAoc2NoZW1hLm11bHRpcGxlT2YpIHtcclxuICAgIGlucHV0UHJvcHMuc3RlcCA9IHNjaGVtYS5tdWx0aXBsZU9mO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBzY2hlbWEubWluaW11bSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgaW5wdXRQcm9wcy5taW4gPSBzY2hlbWEubWluaW11bTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1heGltdW0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGlucHV0UHJvcHMubWF4ID0gc2NoZW1hLm1heGltdW07XHJcbiAgfVxyXG5cclxuICBjb25zdCBfb25DaGFuZ2UgPSAoeyB0YXJnZXQ6IHsgdmFsdWUgfSB9KSA9PiB7XHJcbiAgICByZXR1cm4gcHJvcHMub25DaGFuZ2UodmFsdWUgPT09IFwiXCIgPyBvcHRpb25zLmVtcHR5VmFsdWUgOiB2YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIFtcclxuICAgIDxpbnB1dFxyXG4gICAgICBrZXk9e2lucHV0UHJvcHMuaWR9XHJcbiAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkb25seX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBhdXRvRm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgdmFsdWU9e3ZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWV9XHJcbiAgICAgIHsuLi5pbnB1dFByb3BzfVxyXG4gICAgICBsaXN0PXtzY2hlbWEuZXhhbXBsZXMgPyBgZXhhbXBsZXNfJHtpbnB1dFByb3BzLmlkfWAgOiBudWxsfVxyXG4gICAgICBvbkNoYW5nZT17X29uQ2hhbmdlfVxyXG4gICAgICBvbkJsdXI9e29uQmx1ciAmJiAoZXZlbnQgPT4gb25CbHVyKGlucHV0UHJvcHMuaWQsIGV2ZW50LnRhcmdldC52YWx1ZSkpfVxyXG4gICAgICBvbkZvY3VzPXtvbkZvY3VzICYmIChldmVudCA9PiBvbkZvY3VzKGlucHV0UHJvcHMuaWQsIGV2ZW50LnRhcmdldC52YWx1ZSkpfVxyXG4gICAgLz4sXHJcbiAgICBzY2hlbWEuZXhhbXBsZXMgPyAoXHJcbiAgICAgIDxkYXRhbGlzdFxyXG4gICAgICAgIGtleT17YGRhdGFsaXN0XyR7aW5wdXRQcm9wcy5pZH1gfVxyXG4gICAgICAgIGlkPXtgZXhhbXBsZXNfJHtpbnB1dFByb3BzLmlkfWB9PlxyXG4gICAgICAgIHtbXHJcbiAgICAgICAgICAuLi5uZXcgU2V0KFxyXG4gICAgICAgICAgICBzY2hlbWEuZXhhbXBsZXMuY29uY2F0KHNjaGVtYS5kZWZhdWx0ID8gW3NjaGVtYS5kZWZhdWx0XSA6IFtdKVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICBdLm1hcChleGFtcGxlID0+IChcclxuICAgICAgICAgIDxvcHRpb24ga2V5PXtleGFtcGxlfSB2YWx1ZT17ZXhhbXBsZX0gLz5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kYXRhbGlzdD5cclxuICAgICkgOiBudWxsLFxyXG4gIF07XHJcbn1cclxuXHJcbkJhc2VJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gIGRpc2FibGVkOiBmYWxzZSxcclxuICByZWFkb25seTogZmFsc2UsXHJcbiAgYXV0b2ZvY3VzOiBmYWxzZSxcclxufTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBCYXNlSW5wdXQucHJvcFR5cGVzID0ge1xyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5hbnksXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VJbnB1dDtcclxuIl19