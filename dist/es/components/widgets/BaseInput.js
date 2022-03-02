var _excluded = ["value", "readonly", "disabled", "autofocus", "onBlur", "onFocus", "options", "schema", "uiSchema", "formContext", "registry", "rawErrors"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
      inputProps = _objectWithoutProperties(props, _excluded); // If options.inputType is set use that as the input type


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

  return [/*#__PURE__*/React.createElement("input", _extends({
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
  })), schema.examples ? /*#__PURE__*/React.createElement("datalist", {
    key: "datalist_".concat(inputProps.id),
    id: "examples_".concat(inputProps.id)
  }, _toConsumableArray(new Set(schema.examples.concat(schema.default ? [schema.default] : []))).map(function (example) {
    return /*#__PURE__*/React.createElement("option", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQmFzZUlucHV0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQmFzZUlucHV0IiwicHJvcHMiLCJpZCIsImNvbnNvbGUiLCJsb2ciLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2YWx1ZSIsInJlYWRvbmx5IiwiZGlzYWJsZWQiLCJhdXRvZm9jdXMiLCJvbkJsdXIiLCJvbkZvY3VzIiwib3B0aW9ucyIsInNjaGVtYSIsInVpU2NoZW1hIiwiZm9ybUNvbnRleHQiLCJyZWdpc3RyeSIsInJhd0Vycm9ycyIsImlucHV0UHJvcHMiLCJpbnB1dFR5cGUiLCJ0eXBlIiwic3RlcCIsImF1dG9jb21wbGV0ZSIsImF1dG9Db21wbGV0ZSIsIm11bHRpcGxlT2YiLCJtaW5pbXVtIiwibWluIiwibWF4aW11bSIsIm1heCIsIl9vbkNoYW5nZSIsInRhcmdldCIsIm9uQ2hhbmdlIiwiZW1wdHlWYWx1ZSIsImV4YW1wbGVzIiwiZXZlbnQiLCJTZXQiLCJjb25jYXQiLCJkZWZhdWx0IiwibWFwIiwiZXhhbXBsZSIsImRlZmF1bHRQcm9wcyIsInJlcXVpcmVkIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsInBsYWNlaG9sZGVyIiwiYW55IiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFDeEI7QUFDQTtBQUNBLE1BQUksQ0FBQ0EsS0FBSyxDQUFDQyxFQUFYLEVBQWU7QUFDYkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWixFQUF5QkgsS0FBekI7QUFDQSxVQUFNLElBQUlJLEtBQUosMkJBQTZCQyxJQUFJLENB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QUN2QkMsRUFBQUEsUUFBUSxFQUFFLEtBRGE7QUFFdkJqQyxFQUFBQSxRQUFRLEVBQUUsS0FGYTtBQUd2QkQsRUFBQUEsUUFBUSxFQUFFLEtBSGE7QUFJdkJFLEVBQUFBLFNBQVMsRUFBRTtBQUpZLENBQXpCOztBQU9BLElBQUlpQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QzlDLEVBQUFBLFNBQVMsQ0FBQytDLFNBQVYsR0FBc0I7QUFDcEI3QyxJQUFBQSxFQUFFLEVBQUVILFNBQVMsQ0FBQ2lELE1BQVYsQ0FBaUJDLFVBREQ7QUFFcEJDLElBQUFBLFdBQVcsRUFBRW5ELFNBQVMsQ0FBQ2lELE1BRkg7QUFHcEJ4QyxJQUFBQSxLQUFLLEVBQUVULFNBQVMsQ0FBQ29ELEdBSEc7QUFJcEJSLElBQUFBLFFBQVEsRUFBRTVDLFNBQVMsQ0FBQ3FELElBSkE7QUFLcEIxQyxJQUFBQSxRQUFRLEVBQUVYLFNBQVMsQ0FBQ3FELElBTEE7QUFNcEIzQyxJQUFBQSxRQUFRLEVBQUVWLFNBQVMsQ0FBQ3FELElBTkE7QUFPcEJ6QyxJQUFBQSxTQUFTLEVBQUVaLFNBQVMsQ0FBQ3FELElBUEQ7QUFRcEJuQixJQUFBQSxRQUFRLEVBQUVsQyxTQUFTLENBQUNzRCxJQVJBO0FBU3BCekMsSUFBQUEsTUFBTSxFQUFFYixTQUFTLENBQUNzRCxJQVRFO0FBVXBCeEMsSUFBQUEsT0FBTyxFQUFFZCxTQUFTLENBQUNzRDtBQVZDLEdBQXRCO0FBWUQ7O0FBRUQsZUFBZXJELFNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmZ1bmN0aW9uIEJhc2VJbnB1dChwcm9wcykge1xyXG4gIC8vIE5vdGU6IHNpbmNlIFJlYWN0IDE1LjIuMCB3ZSBjYW4ndCBmb3J3YXJkIHVua25vd24gZWxlbWVudCBhdHRyaWJ1dGVzLCBzbyB3ZVxyXG4gIC8vIGV4Y2x1ZGUgdGhlIFwib3B0aW9uc1wiIGFuZCBcInNjaGVtYVwiIG9uZXMgaGVyZS5cclxuICBpZiAoIXByb3BzLmlkKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5vIGlkIGZvclwiLCBwcm9wcyk7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIGlkIGZvciBwcm9wcyAke0pTT04uc3RyaW5naWZ5KHByb3BzKX1gKTtcclxuICB9XHJcbiAgY29uc3Qge1xyXG4gICAgdmFsdWUsXHJcbiAgICByZWFkb25seSxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgYXV0b2ZvY3VzLFxyXG4gICAgb25CbHVyLFxyXG4gICAgb25Gb2N1cyxcclxuICAgIG9wdGlvbnMsXHJcbiAgICBzY2hlbWEsXHJcbiAgICB1aVNjaGVtYSxcclxuICAgIGZvcm1Db250ZXh0LFxyXG4gICAgcmVnaXN0cnksXHJcbiAgICByYXdFcnJvcnMsXHJcbiAgICAuLi5pbnB1dFByb3BzXHJcbiAgfSA9IHByb3BzO1xyXG5cclxuICAvLyBJZiBvcHRpb25zLmlucHV0VHlwZSBpcyBzZXQgdXNlIHRoYXQgYXMgdGhlIGlucHV0IHR5cGVcclxuICBpZiAob3B0aW9ucy5pbnB1dFR5cGUpIHtcclxuICAgIGlucHV0UHJvcHMudHlwZSA9IG9wdGlvbnMuaW5wdXRUeXBlO1xyXG4gIH0gZWxzZSBpZiAoIWlucHV0UHJvcHMudHlwZSkge1xyXG4gICAgLy8gSWYgdGhlIHNjaGVtYSBpcyBvZiB0eXBlIG51bWJlciBvciBpbnRlZ2VyLCBzZXQgdGhlIGlucHV0IHR5cGUgdG8gbnVtYmVyXHJcbiAgICBpZiAoc2NoZW1hLnR5cGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgaW5wdXRQcm9wcy50eXBlID0gXCJudW1iZXJcIjtcclxuICAgICAgLy8gU2V0dGluZyBzdGVwIHRvICdhbnknIGZpeGVzIGEgYnVnIGluIFNhZmFyaSB3aGVyZSBkZWNpbWFscyBhcmUgbm90XHJcbiAgICAgIC8vIGFsbG93ZWQgaW4gbnVtYmVyIGlucHV0c1xyXG4gICAgICBpbnB1dFByb3BzLnN0ZXAgPSBcImFueVwiO1xyXG4gICAgfSBlbHNlIGlmIChzY2hlbWEudHlwZSA9PT0gXCJpbnRlZ2VyXCIpIHtcclxuICAgICAgaW5wdXRQcm9wcy50eXBlID0gXCJudW1iZXJcIjtcclxuICAgICAgLy8gU2luY2UgdGhpcyBpcyBpbnRlZ2VyLCB5b3UgYWx3YXlzIHdhbnQgdG8gc3RlcCB1cCBvciBkb3duIGluIG11bHRpcGxlc1xyXG4gICAgICAvLyBvZiAxXHJcbiAgICAgIGlucHV0UHJvcHMuc3RlcCA9IFwiMVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5wdXRQcm9wcy50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9ucy5hdXRvY29tcGxldGUpIHtcclxuICAgIGlucHV0UHJvcHMuYXV0b0NvbXBsZXRlID0gb3B0aW9ucy5hdXRvY29tcGxldGU7XHJcbiAgfVxyXG5cclxuICAvLyBJZiBtdWx0aXBsZU9mIGlzIGRlZmluZWQsIHVzZSB0aGlzIGFzIHRoZSBzdGVwIHZhbHVlLiBUaGlzIG1haW5seSBpbXByb3Zlc1xyXG4gIC8vIHRoZSBleHBlcmllbmNlIGZvciBrZXlib2FyZCB1c2VycyAod2hvIGNhbiB1c2UgdGhlIHVwL2Rvd24gS0IgYXJyb3dzKS5cclxuICBpZiAoc2NoZW1hLm11bHRpcGxlT2YpIHtcclxuICAgIGlucHV0UHJvcHMuc3RlcCA9IHNjaGVtYS5tdWx0aXBsZU9mO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBzY2hlbWEubWluaW11bSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgaW5wdXRQcm9wcy5taW4gPSBzY2hlbWEubWluaW11bTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1heGltdW0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGlucHV0UHJvcHMubWF4ID0gc2NoZW1hLm1heGltdW07XHJcbiAgfVxyXG5cclxuICBjb25zdCBfb25DaGFuZ2UgPSAoeyB0YXJnZXQ6IHsgdmFsdWUgfSB9KSA9PiB7XHJcbiAgICByZXR1cm4gcHJvcHMub25DaGFuZ2UodmFsdWUgPT09IFwiXCIgPyBvcHRpb25zLmVtcHR5VmFsdWUgOiB2YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIFtcclxuICAgIDxpbnB1dFxyXG4gICAgICBrZXk9e2lucHV0UHJvcHMuaWR9XHJcbiAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkb25seX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBhdXRvRm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgdmFsdWU9e3ZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWV9XHJcbiAgICAgIHsuLi5pbnB1dFByb3BzfVxyXG4gICAgICBsaXN0PXtzY2hlbWEuZXhhbXBsZXMgPyBgZXhhbXBsZXNfJHtpbnB1dFByb3BzLmlkfWAgOiBudWxsfVxyXG4gICAgICBvbkNoYW5nZT17X29uQ2hhbmdlfVxyXG4gICAgICBvbkJsdXI9e29uQmx1ciAmJiAoZXZlbnQgPT4gb25CbHVyKGlucHV0UHJvcHMuaWQsIGV2ZW50LnRhcmdldC52YWx1ZSkpfVxyXG4gICAgICBvbkZvY3VzPXtvbkZvY3VzICYmIChldmVudCA9PiBvbkZvY3VzKGlucHV0UHJvcHMuaWQsIGV2ZW50LnRhcmdldC52YWx1ZSkpfVxyXG4gICAgLz4sXHJcbiAgICBzY2hlbWEuZXhhbXBsZXMgPyAoXHJcbiAgICAgIDxkYXRhbGlzdFxyXG4gICAgICAgIGtleT17YGRhdGFsaXN0XyR7aW5wdXRQcm9wcy5pZH1gfVxyXG4gICAgICAgIGlkPXtgZXhhbXBsZXNfJHtpbnB1dFByb3BzLmlkfWB9PlxyXG4gICAgICAgIHtbXHJcbiAgICAgICAgICAuLi5uZXcgU2V0KFxyXG4gICAgICAgICAgICBzY2hlbWEuZXhhbXBsZXMuY29uY2F0KHNjaGVtYS5kZWZhdWx0ID8gW3NjaGVtYS5kZWZhdWx0XSA6IFtdKVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICBdLm1hcChleGFtcGxlID0+IChcclxuICAgICAgICAgIDxvcHRpb24ga2V5PXtleGFtcGxlfSB2YWx1ZT17ZXhhbXBsZX0gLz5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kYXRhbGlzdD5cclxuICAgICkgOiBudWxsLFxyXG4gIF07XHJcbn1cclxuXHJcbkJhc2VJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gIGRpc2FibGVkOiBmYWxzZSxcclxuICByZWFkb25seTogZmFsc2UsXHJcbiAgYXV0b2ZvY3VzOiBmYWxzZSxcclxufTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBCYXNlSW5wdXQucHJvcFR5cGVzID0ge1xyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5hbnksXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VJbnB1dDtcclxuIl19