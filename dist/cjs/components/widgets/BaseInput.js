"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

  return [_react["default"].createElement("input", _extends({
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
  })), schema.examples ? _react["default"].createElement("datalist", {
    key: "datalist_".concat(inputProps.id),
    id: "examples_".concat(inputProps.id)
  }, _toConsumableArray(new Set(schema.examples.concat(schema["default"] ? [schema["default"]] : []))).map(function (example) {
    return _react["default"].createElement("option", {
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
    id: _propTypes["default"].string.isRequired,
    placeholder: _propTypes["default"].string,
    value: _propTypes["default"].any,
    required: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    autofocus: _propTypes["default"].bool,
    onChange: _propTypes["default"].func,
    onBlur: _propTypes["default"].func,
    onFocus: _propTypes["default"].func
  };
}

var _default = BaseInput;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQmFzZUlucHV0LmpzIl0sIm5hbWVzIjpbIkJhc2VJbnB1dCIsInByb3BzIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwidmFsdWUiLCJyZWFkb25seSIsImRpc2FibGVkIiwiYXV0b2ZvY3VzIiwib25CbHVyIiwib25Gb2N1cyIsIm9wdGlvbnMiLCJzY2hlbWEiLCJ1aVNjaGVtYSIsImZvcm1Db250ZXh0IiwicmVnaXN0cnkiLCJyYXdFcnJvcnMiLCJpbnB1dFByb3BzIiwiaW5wdXRUeXBlIiwidHlwZSIsInN0ZXAiLCJhdXRvY29tcGxldGUiLCJhdXRvQ29tcGxldGUiLCJtdWx0aXBsZU9mIiwibWluaW11bSIsIm1pbiIsIm1heGltdW0iLCJtYXgiLCJfb25DaGFuZ2UiLCJ0YXJnZXQiLCJvbkNoYW5nZSIsImVtcHR5VmFsdWUiLCJleGFtcGxlcyIsImV2ZW50IiwiU2V0IiwiY29uY2F0IiwibWFwIiwiZXhhbXBsZSIsImRlZmF1bHRQcm9wcyIsInJlcXVpcmVkIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsInBsYWNlaG9sZGVyIiwiYW55IiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFDeEI7QUFDQTtBQUNBLE1BQUksQ0FBQ0EsS0FBSyxDQUFDQyxFQUFYLEVBQWU7QUFDYkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWixFQUF5QkgsS0FBekI7QUFDQSxVQUFNLElBQUlJLEtBQUosMkJBQTZCQyxJQUFJLENBQUNDLFNBQUwsQ0FBZU4sS0FBZixDQUE3QixFQUFOO0FBQ0Q7O0FBTnVCLE1BUXRCTyxLQVJzQixHQXFC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UDtBQTRCRDs7QUFFRHhDLFNBQVMsQ0FBQ3lDLFlBQVYsR0FBeUI7QUFDdkJDLEVBQUFBLFFBQVEsRUFBRSxLQURhO0FBRXZCaEMsRUFBQUEsUUFBUSxFQUFFLEtBRmE7QUFHdkJELEVBQUFBLFFBQVEsRUFBRSxLQUhhO0FBSXZCRSxFQUFBQSxTQUFTLEVBQUU7QUFKWSxDQUF6Qjs7QUFPQSxJQUFJZ0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekM3QyxFQUFBQSxTQUFTLENBQUM4QyxTQUFWLEdBQXNCO0FBQ3BCNUMsSUFBQUEsRUFBRSxFQUFFNkMsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBREQ7QUFFcEJDLElBQUFBLFdBQVcsRUFBRUgsc0JBQVVDLE1BRkg7QUFHcEJ4QyxJQUFBQSxLQUFLLEVBQUV1QyxzQkFBVUksR0FIRztBQUlwQlQsSUFBQUEsUUFBUSxFQUFFSyxzQkFBVUssSUFKQTtBQUtwQjFDLElBQUFBLFFBQVEsRUFBRXFDLHNCQUFVSyxJQUxBO0FBTXBCM0MsSUFBQUEsUUFBUSxFQUFFc0Msc0JBQVVLLElBTkE7QUFPcEJ6QyxJQUFBQSxTQUFTLEVBQUVvQyxzQkFBVUssSUFQRDtBQVFwQm5CLElBQUFBLFFBQVEsRUFBRWMsc0JBQVVNLElBUkE7QUFTcEJ6QyxJQUFBQSxNQUFNLEVBQUVtQyxzQkFBVU0sSUFURTtBQVVwQnhDLElBQUFBLE9BQU8sRUFBRWtDLHNCQUFVTTtBQVZDLEdBQXRCO0FBWUQ7O2VBRWNyRCxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5mdW5jdGlvbiBCYXNlSW5wdXQocHJvcHMpIHtcclxuICAvLyBOb3RlOiBzaW5jZSBSZWFjdCAxNS4yLjAgd2UgY2FuJ3QgZm9yd2FyZCB1bmtub3duIGVsZW1lbnQgYXR0cmlidXRlcywgc28gd2VcclxuICAvLyBleGNsdWRlIHRoZSBcIm9wdGlvbnNcIiBhbmQgXCJzY2hlbWFcIiBvbmVzIGhlcmUuXHJcbiAgaWYgKCFwcm9wcy5pZCkge1xyXG4gICAgY29uc29sZS5sb2coXCJObyBpZCBmb3JcIiwgcHJvcHMpO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBubyBpZCBmb3IgcHJvcHMgJHtKU09OLnN0cmluZ2lmeShwcm9wcyl9YCk7XHJcbiAgfVxyXG4gIGNvbnN0IHtcclxuICAgIHZhbHVlLFxyXG4gICAgcmVhZG9ubHksXHJcbiAgICBkaXNhYmxlZCxcclxuICAgIGF1dG9mb2N1cyxcclxuICAgIG9uQmx1cixcclxuICAgIG9uRm9jdXMsXHJcbiAgICBvcHRpb25zLFxyXG4gICAgc2NoZW1hLFxyXG4gICAgdWlTY2hlbWEsXHJcbiAgICBmb3JtQ29udGV4dCxcclxuICAgIHJlZ2lzdHJ5LFxyXG4gICAgcmF3RXJyb3JzLFxyXG4gICAgLi4uaW5wdXRQcm9wc1xyXG4gIH0gPSBwcm9wcztcclxuXHJcbiAgLy8gSWYgb3B0aW9ucy5pbnB1dFR5cGUgaXMgc2V0IHVzZSB0aGF0IGFzIHRoZSBpbnB1dCB0eXBlXHJcbiAgaWYgKG9wdGlvbnMuaW5wdXRUeXBlKSB7XHJcbiAgICBpbnB1dFByb3BzLnR5cGUgPSBvcHRpb25zLmlucHV0VHlwZTtcclxuICB9IGVsc2UgaWYgKCFpbnB1dFByb3BzLnR5cGUpIHtcclxuICAgIC8vIElmIHRoZSBzY2hlbWEgaXMgb2YgdHlwZSBudW1iZXIgb3IgaW50ZWdlciwgc2V0IHRoZSBpbnB1dCB0eXBlIHRvIG51bWJlclxyXG4gICAgaWYgKHNjaGVtYS50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIGlucHV0UHJvcHMudHlwZSA9IFwibnVtYmVyXCI7XHJcbiAgICAgIC8vIFNldHRpbmcgc3RlcCB0byAnYW55JyBmaXhlcyBhIGJ1ZyBpbiBTYWZhcmkgd2hlcmUgZGVjaW1hbHMgYXJlIG5vdFxyXG4gICAgICAvLyBhbGxvd2VkIGluIG51bWJlciBpbnB1dHNcclxuICAgICAgaW5wdXRQcm9wcy5zdGVwID0gXCJhbnlcIjtcclxuICAgIH0gZWxzZSBpZiAoc2NoZW1hLnR5cGUgPT09IFwiaW50ZWdlclwiKSB7XHJcbiAgICAgIGlucHV0UHJvcHMudHlwZSA9IFwibnVtYmVyXCI7XHJcbiAgICAgIC8vIFNpbmNlIHRoaXMgaXMgaW50ZWdlciwgeW91IGFsd2F5cyB3YW50IHRvIHN0ZXAgdXAgb3IgZG93biBpbiBtdWx0aXBsZXNcclxuICAgICAgLy8gb2YgMVxyXG4gICAgICBpbnB1dFByb3BzLnN0ZXAgPSBcIjFcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlucHV0UHJvcHMudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG9wdGlvbnMuYXV0b2NvbXBsZXRlKSB7XHJcbiAgICBpbnB1dFByb3BzLmF1dG9Db21wbGV0ZSA9IG9wdGlvbnMuYXV0b2NvbXBsZXRlO1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgbXVsdGlwbGVPZiBpcyBkZWZpbmVkLCB1c2UgdGhpcyBhcyB0aGUgc3RlcCB2YWx1ZS4gVGhpcyBtYWlubHkgaW1wcm92ZXNcclxuICAvLyB0aGUgZXhwZXJpZW5jZSBmb3Iga2V5Ym9hcmQgdXNlcnMgKHdobyBjYW4gdXNlIHRoZSB1cC9kb3duIEtCIGFycm93cykuXHJcbiAgaWYgKHNjaGVtYS5tdWx0aXBsZU9mKSB7XHJcbiAgICBpbnB1dFByb3BzLnN0ZXAgPSBzY2hlbWEubXVsdGlwbGVPZjtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1pbmltdW0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGlucHV0UHJvcHMubWluID0gc2NoZW1hLm1pbmltdW07XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHNjaGVtYS5tYXhpbXVtICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBpbnB1dFByb3BzLm1heCA9IHNjaGVtYS5tYXhpbXVtO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgX29uQ2hhbmdlID0gKHsgdGFyZ2V0OiB7IHZhbHVlIH0gfSkgPT4ge1xyXG4gICAgcmV0dXJuIHByb3BzLm9uQ2hhbmdlKHZhbHVlID09PSBcIlwiID8gb3B0aW9ucy5lbXB0eVZhbHVlIDogdmFsdWUpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBbXHJcbiAgICA8aW5wdXRcclxuICAgICAga2V5PXtpbnB1dFByb3BzLmlkfVxyXG4gICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICByZWFkT25seT17cmVhZG9ubHl9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgYXV0b0ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgIHZhbHVlPXt2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlfVxyXG4gICAgICB7Li4uaW5wdXRQcm9wc31cclxuICAgICAgbGlzdD17c2NoZW1hLmV4YW1wbGVzID8gYGV4YW1wbGVzXyR7aW5wdXRQcm9wcy5pZH1gIDogbnVsbH1cclxuICAgICAgb25DaGFuZ2U9e19vbkNoYW5nZX1cclxuICAgICAgb25CbHVyPXtvbkJsdXIgJiYgKGV2ZW50ID0+IG9uQmx1cihpbnB1dFByb3BzLmlkLCBldmVudC50YXJnZXQudmFsdWUpKX1cclxuICAgICAgb25Gb2N1cz17b25Gb2N1cyAmJiAoZXZlbnQgPT4gb25Gb2N1cyhpbnB1dFByb3BzLmlkLCBldmVudC50YXJnZXQudmFsdWUpKX1cclxuICAgIC8+LFxyXG4gICAgc2NoZW1hLmV4YW1wbGVzID8gKFxyXG4gICAgICA8ZGF0YWxpc3RcclxuICAgICAgICBrZXk9e2BkYXRhbGlzdF8ke2lucHV0UHJvcHMuaWR9YH1cclxuICAgICAgICBpZD17YGV4YW1wbGVzXyR7aW5wdXRQcm9wcy5pZH1gfT5cclxuICAgICAgICB7W1xyXG4gICAgICAgICAgLi4ubmV3IFNldChcclxuICAgICAgICAgICAgc2NoZW1hLmV4YW1wbGVzLmNvbmNhdChzY2hlbWEuZGVmYXVsdCA/IFtzY2hlbWEuZGVmYXVsdF0gOiBbXSlcclxuICAgICAgICAgICksXHJcbiAgICAgICAgXS5tYXAoZXhhbXBsZSA9PiAoXHJcbiAgICAgICAgICA8b3B0aW9uIGtleT17ZXhhbXBsZX0gdmFsdWU9e2V4YW1wbGV9IC8+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvZGF0YWxpc3Q+XHJcbiAgICApIDogbnVsbCxcclxuICBdO1xyXG59XHJcblxyXG5CYXNlSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG4gIHJlcXVpcmVkOiBmYWxzZSxcclxuICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gIGF1dG9mb2N1czogZmFsc2UsXHJcbn07XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQmFzZUlucHV0LnByb3BUeXBlcyA9IHtcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuYW55LFxyXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgcmVhZG9ubHk6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgYXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlSW5wdXQ7XHJcbiJdfQ==