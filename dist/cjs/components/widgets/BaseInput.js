"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["value", "readonly", "disabled", "autofocus", "onBlur", "onFocus", "options", "schema", "uiSchema", "formContext", "registry", "rawErrors"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

  return [/*#__PURE__*/_react.default.createElement("input", _extends({
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
  })), schema.examples ? /*#__PURE__*/_react.default.createElement("datalist", {
    key: "datalist_".concat(inputProps.id),
    id: "examples_".concat(inputProps.id)
  }, _toConsumableArray(new Set(schema.examples.concat(schema.default ? [schema.default] : []))).map(function (example) {
    return /*#__PURE__*/_react.default.createElement("option", {
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
    id: _propTypes.default.string.isRequired,
    placeholder: _propTypes.default.string,
    value: _propTypes.default.any,
    required: _propTypes.default.bool,
    disabled: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    autofocus: _propTypes.default.bool,
    onChange: _propTypes.default.func,
    onBlur: _propTypes.default.func,
    onFocus: _propTypes.default.func
  };
}

var _default = BaseInput;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQmFzZUlucHV0LmpzIl0sIm5hbWVzIjpbIkJhc2VJbnB1dCIsInByb3BzIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwidmFsdWUiLCJyZWFkb25seSIsImRpc2FibGVkIiwiYXV0b2ZvY3VzIiwib25CbHVyIiwib25Gb2N1cyIsIm9wdGlvbnMiLCJzY2hlbWEiLCJ1aVNjaGVtYSIsImZvcm1Db250ZXh0IiwicmVnaXN0cnkiLCJyYXdFcnJvcnMiLCJpbnB1dFByb3BzIiwiaW5wdXRUeXBlIiwidHlwZSIsInN0ZXAiLCJhdXRvY29tcGxldGUiLCJhdXRvQ29tcGxldGUiLCJtdWx0aXBsZU9mIiwibWluaW11bSIsIm1pbiIsIm1heGltdW0iLCJtYXgiLCJfb25DaGFuZ2UiLCJ0YXJnZXQiLCJvbkNoYW5nZSIsImVtcHR5VmFsdWUiLCJleGFtcGxlcyIsImV2ZW50IiwiU2V0IiwiY29uY2F0IiwiZGVmYXVsdCIsIm1hcCIsImV4YW1wbGUiLCJkZWZhdWx0UHJvcHMiLCJyZXF1aXJlZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJwbGFjZWhvbGRlciIsImFueSIsImJvb2wiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFNBQVNBLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQ3hCO0FBQ0E7QUFDQSxNQUFJLENBQUNBLEtBQUssQ0FBQ0MsRUFBWCxFQUFlO0FBQ2JDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVosRUFBeUJILEtBQXpCO0FBQ0EsVUFBTSxJQUFJSSxLQUFKLDJCQUE2QkMsSUFBSSxDQUFDQyxTQUFMLENBQWVOLEtBQWYsQ0FBN0IsRUFBTjtBQUNEOztBQUNELE1B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USxFQUFFLEtBRmE7QUFHdkJELEVBQUFBLFFBQVEsRUFBRSxLQUhhO0FBSXZCRSxFQUFBQSxTQUFTLEVBQUU7QUFKWSxDQUF6Qjs7QUFPQSxJQUFJaUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekM5QyxFQUFBQSxTQUFTLENBQUMrQyxTQUFWLEdBQXNCO0FBQ3BCN0MsSUFBQUEsRUFBRSxFQUFFOEMsbUJBQVVDLE1BQVYsQ0FBaUJDLFVBREQ7QUFFcEJDLElBQUFBLFdBQVcsRUFBRUgsbUJBQVVDLE1BRkg7QUFHcEJ6QyxJQUFBQSxLQUFLLEVBQUV3QyxtQkFBVUksR0FIRztBQUlwQlQsSUFBQUEsUUFBUSxFQUFFSyxtQkFBVUssSUFKQTtBQUtwQjNDLElBQUFBLFFBQVEsRUFBRXNDLG1CQUFVSyxJQUxBO0FBTXBCNUMsSUFBQUEsUUFBUSxFQUFFdUMsbUJBQVVLLElBTkE7QUFPcEIxQyxJQUFBQSxTQUFTLEVBQUVxQyxtQkFBVUssSUFQRDtBQVFwQnBCLElBQUFBLFFBQVEsRUFBRWUsbUJBQVVNLElBUkE7QUFTcEIxQyxJQUFBQSxNQUFNLEVBQUVvQyxtQkFBVU0sSUFURTtBQVVwQnpDLElBQUFBLE9BQU8sRUFBRW1DLG1CQUFVTTtBQVZDLEdBQXRCO0FBWUQ7O2VBRWN0RCxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5mdW5jdGlvbiBCYXNlSW5wdXQocHJvcHMpIHtcclxuICAvLyBOb3RlOiBzaW5jZSBSZWFjdCAxNS4yLjAgd2UgY2FuJ3QgZm9yd2FyZCB1bmtub3duIGVsZW1lbnQgYXR0cmlidXRlcywgc28gd2VcclxuICAvLyBleGNsdWRlIHRoZSBcIm9wdGlvbnNcIiBhbmQgXCJzY2hlbWFcIiBvbmVzIGhlcmUuXHJcbiAgaWYgKCFwcm9wcy5pZCkge1xyXG4gICAgY29uc29sZS5sb2coXCJObyBpZCBmb3JcIiwgcHJvcHMpO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBubyBpZCBmb3IgcHJvcHMgJHtKU09OLnN0cmluZ2lmeShwcm9wcyl9YCk7XHJcbiAgfVxyXG4gIGNvbnN0IHtcclxuICAgIHZhbHVlLFxyXG4gICAgcmVhZG9ubHksXHJcbiAgICBkaXNhYmxlZCxcclxuICAgIGF1dG9mb2N1cyxcclxuICAgIG9uQmx1cixcclxuICAgIG9uRm9jdXMsXHJcbiAgICBvcHRpb25zLFxyXG4gICAgc2NoZW1hLFxyXG4gICAgdWlTY2hlbWEsXHJcbiAgICBmb3JtQ29udGV4dCxcclxuICAgIHJlZ2lzdHJ5LFxyXG4gICAgcmF3RXJyb3JzLFxyXG4gICAgLi4uaW5wdXRQcm9wc1xyXG4gIH0gPSBwcm9wcztcclxuXHJcbiAgLy8gSWYgb3B0aW9ucy5pbnB1dFR5cGUgaXMgc2V0IHVzZSB0aGF0IGFzIHRoZSBpbnB1dCB0eXBlXHJcbiAgaWYgKG9wdGlvbnMuaW5wdXRUeXBlKSB7XHJcbiAgICBpbnB1dFByb3BzLnR5cGUgPSBvcHRpb25zLmlucHV0VHlwZTtcclxuICB9IGVsc2UgaWYgKCFpbnB1dFByb3BzLnR5cGUpIHtcclxuICAgIC8vIElmIHRoZSBzY2hlbWEgaXMgb2YgdHlwZSBudW1iZXIgb3IgaW50ZWdlciwgc2V0IHRoZSBpbnB1dCB0eXBlIHRvIG51bWJlclxyXG4gICAgaWYgKHNjaGVtYS50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIGlucHV0UHJvcHMudHlwZSA9IFwibnVtYmVyXCI7XHJcbiAgICAgIC8vIFNldHRpbmcgc3RlcCB0byAnYW55JyBmaXhlcyBhIGJ1ZyBpbiBTYWZhcmkgd2hlcmUgZGVjaW1hbHMgYXJlIG5vdFxyXG4gICAgICAvLyBhbGxvd2VkIGluIG51bWJlciBpbnB1dHNcclxuICAgICAgaW5wdXRQcm9wcy5zdGVwID0gXCJhbnlcIjtcclxuICAgIH0gZWxzZSBpZiAoc2NoZW1hLnR5cGUgPT09IFwiaW50ZWdlclwiKSB7XHJcbiAgICAgIGlucHV0UHJvcHMudHlwZSA9IFwibnVtYmVyXCI7XHJcbiAgICAgIC8vIFNpbmNlIHRoaXMgaXMgaW50ZWdlciwgeW91IGFsd2F5cyB3YW50IHRvIHN0ZXAgdXAgb3IgZG93biBpbiBtdWx0aXBsZXNcclxuICAgICAgLy8gb2YgMVxyXG4gICAgICBpbnB1dFByb3BzLnN0ZXAgPSBcIjFcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlucHV0UHJvcHMudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG9wdGlvbnMuYXV0b2NvbXBsZXRlKSB7XHJcbiAgICBpbnB1dFByb3BzLmF1dG9Db21wbGV0ZSA9IG9wdGlvbnMuYXV0b2NvbXBsZXRlO1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgbXVsdGlwbGVPZiBpcyBkZWZpbmVkLCB1c2UgdGhpcyBhcyB0aGUgc3RlcCB2YWx1ZS4gVGhpcyBtYWlubHkgaW1wcm92ZXNcclxuICAvLyB0aGUgZXhwZXJpZW5jZSBmb3Iga2V5Ym9hcmQgdXNlcnMgKHdobyBjYW4gdXNlIHRoZSB1cC9kb3duIEtCIGFycm93cykuXHJcbiAgaWYgKHNjaGVtYS5tdWx0aXBsZU9mKSB7XHJcbiAgICBpbnB1dFByb3BzLnN0ZXAgPSBzY2hlbWEubXVsdGlwbGVPZjtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1pbmltdW0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGlucHV0UHJvcHMubWluID0gc2NoZW1hLm1pbmltdW07XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHNjaGVtYS5tYXhpbXVtICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBpbnB1dFByb3BzLm1heCA9IHNjaGVtYS5tYXhpbXVtO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgX29uQ2hhbmdlID0gKHsgdGFyZ2V0OiB7IHZhbHVlIH0gfSkgPT4ge1xyXG4gICAgcmV0dXJuIHByb3BzLm9uQ2hhbmdlKHZhbHVlID09PSBcIlwiID8gb3B0aW9ucy5lbXB0eVZhbHVlIDogdmFsdWUpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBbXHJcbiAgICA8aW5wdXRcclxuICAgICAga2V5PXtpbnB1dFByb3BzLmlkfVxyXG4gICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICByZWFkT25seT17cmVhZG9ubHl9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgYXV0b0ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgIHZhbHVlPXt2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlfVxyXG4gICAgICB7Li4uaW5wdXRQcm9wc31cclxuICAgICAgbGlzdD17c2NoZW1hLmV4YW1wbGVzID8gYGV4YW1wbGVzXyR7aW5wdXRQcm9wcy5pZH1gIDogbnVsbH1cclxuICAgICAgb25DaGFuZ2U9e19vbkNoYW5nZX1cclxuICAgICAgb25CbHVyPXtvbkJsdXIgJiYgKGV2ZW50ID0+IG9uQmx1cihpbnB1dFByb3BzLmlkLCBldmVudC50YXJnZXQudmFsdWUpKX1cclxuICAgICAgb25Gb2N1cz17b25Gb2N1cyAmJiAoZXZlbnQgPT4gb25Gb2N1cyhpbnB1dFByb3BzLmlkLCBldmVudC50YXJnZXQudmFsdWUpKX1cclxuICAgIC8+LFxyXG4gICAgc2NoZW1hLmV4YW1wbGVzID8gKFxyXG4gICAgICA8ZGF0YWxpc3RcclxuICAgICAgICBrZXk9e2BkYXRhbGlzdF8ke2lucHV0UHJvcHMuaWR9YH1cclxuICAgICAgICBpZD17YGV4YW1wbGVzXyR7aW5wdXRQcm9wcy5pZH1gfT5cclxuICAgICAgICB7W1xyXG4gICAgICAgICAgLi4ubmV3IFNldChcclxuICAgICAgICAgICAgc2NoZW1hLmV4YW1wbGVzLmNvbmNhdChzY2hlbWEuZGVmYXVsdCA/IFtzY2hlbWEuZGVmYXVsdF0gOiBbXSlcclxuICAgICAgICAgICksXHJcbiAgICAgICAgXS5tYXAoZXhhbXBsZSA9PiAoXHJcbiAgICAgICAgICA8b3B0aW9uIGtleT17ZXhhbXBsZX0gdmFsdWU9e2V4YW1wbGV9IC8+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvZGF0YWxpc3Q+XHJcbiAgICApIDogbnVsbCxcclxuICBdO1xyXG59XHJcblxyXG5CYXNlSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG4gIHJlcXVpcmVkOiBmYWxzZSxcclxuICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gIGF1dG9mb2N1czogZmFsc2UsXHJcbn07XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQmFzZUlucHV0LnByb3BUeXBlcyA9IHtcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuYW55LFxyXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgcmVhZG9ubHk6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgYXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlSW5wdXQ7XHJcbiJdfQ==