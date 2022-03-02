"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

var _excluded = ["formData"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Matches a string that ends in a . character, optionally followed by a sequence of
// digits followed by any number of 0 characters up until the end of the line.
// Ensuring that there is at least one prefixed character is important so that
// you don't incorrectly match against "0".
var trailingCharMatcherWithPrefix = /\.([0-9]*0)*$/; // This is used for trimming the trailing 0 and . characters without affecting
// the rest of the string. Its possible to use one RegEx with groups for this
// functionality, but it is fairly complex compared to simply defining two
// different matchers.

var trailingCharMatcher = /[0.]0*$/;
/**
 * The NumberField class has some special handling for dealing with trailing
 * decimal points and/or zeroes. This logic is designed to allow trailing values
 * to be visible in the input element, but not be represented in the
 * corresponding form data.
 *
 * The algorithm is as follows:
 *
 * 1. When the input value changes the value is cached in the component state
 *
 * 2. The value is then normalized, removing trailing decimal points and zeros,
 *    then passed to the "onChange" callback
 *
 * 3. When the component is rendered, the formData value is checked against the
 *    value cached in the state. If it matches the cached value, the cached
 *    value is passed to the input instead of the formData value
 */

var NumberField = /*#__PURE__*/function (_React$Component) {
  _inherits(NumberField, _React$Component);

  var _super = _createSuper(NumberField);

  function NumberField(props) {
    var _this;

    _classCallCheck(this, NumberField);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (value) {
      // Cache the original value in component state
      _this.setState({
        lastValue: value
      }); // Normalize decimals that don't start with a zero character in advance so
      // that the rest of the normalization logic is simpler


      if ("".concat(value).charAt(0) === ".") {
        value = "0".concat(value);
      } // Check that the value is a string (this can happen if the widget used is a
      // <select>, due to an enum declaration etc) then, if the value ends in a
      // trailing decimal point or multiple zeroes, strip the trailing values


      var processed = typeof value === "string" && value.match(trailingCharMatcherWithPrefix) ? (0, _utils.asNumber)(value.replace(trailingCharMatcher, "")) : (0, _utils.asNumber)(value);

      _this.props.onChange(processed);
    });

    _this.state = {
      lastValue: props.value
    };
    return _this;
  }

  _createClass(NumberField, [{
    key: "render",
    value: function render() {
      var StringField = this.props.registry.fields.StringField;

      var _this$props = this.props,
          formData = _this$props.formData,
          props = _objectWithoutProperties(_this$props, _excluded);

      var lastValue = this.state.lastValue;
      var value = formData;

      if (typeof lastValue === "string" && typeof value === "number") {
        // Construct a regular expression that checks for a string that consists
        // of the formData value suffixed with zero or one '.' characters and zero
        // or more '0' characters
        var re = new RegExp("".concat(value).replace(".", "\\.") + "\\.?0*$"); // If the cached "lastValue" is a match, use that instead of the formData
        // value to prevent the input value from changing in the UI

        if (lastValue.match(re)) {
          value = lastValue;
        }
      }

      return /*#__PURE__*/_react.default.createElement(StringField, _extends({}, props, {
        formData: value,
        onChange: this.handleChange
      }));
    }
  }]);

  return NumberField;
}(_react.default.Component);

if (process.env.NODE_ENV !== "production") {
  NumberField.propTypes = types.fieldProps;
}

NumberField.defaultProps = {
  uiSchema: {}
};
var _default = NumberField;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9OdW1iZXJGaWVsZC5qcyJdLCJuYW1lcyI6WyJ0cmFpbGluZ0NoYXJNYXRjaGVyV2l0aFByZWZpeCIsInRyYWlsaW5nQ2hhck1hdGNoZXIiLCJOdW1iZXJGaWVsZCIsInByb3BzIiwidmFsdWUiLCJzZXRTdGF0ZSIsImxhc3RWYWx1ZSIsImNoYXJBdCIsInByb2Nlc3NlZCIsIm1hdGNoIiwicmVwbGFjZSIsIm9uQ2hhbmdlIiwic3RhdGUiLCJTdHJpbmdGaWVsZCIsInJlZ2lzdHJ5IiwiZmllbGRzIiwiZm9ybURhdGEiLCJyZSIsIlJlZ0V4cCIsImhhbmRsZUNoYW5nZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidHlwZXMiLCJmaWVsZFByb3BzIiwiZGVmYXVsdFByb3BzIiwidWlTY2hlbWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsNkJBQTZCLEdBQUcsZUFBdEMsQyxDQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQU1DLG1CQUFtQixHQUFHLFNBQTVCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFDTUMsVzs7Ozs7QUFDSix1QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw4QkFBTUEsS0FBTjs7QUFEaUIsbUVBUUosVUFBQUMsS0FBSyxFQUFJO0FBQ3RCO0FBQ0EsWUFBS0MsUUFBTCxDQUFjO0FBQUVDLFFBQUFBLFNBQVMsRUFBRUY7QUFBYixPQUFkLEVBRnNCLENBSXRCO0FBQ0E7OztBQUNBLFVBQUksVUFBR0EsS0FBSCxFQUFXRyxNQUFYLENBQWtCLENBQWxCLE1BQXlCLEdBQTdCLEVBQWtDO0FBQ2hDSCxRQUFBQSxLQUFLLGNBQU9BLEtBQVAsQ0FBTDtBQUNELE9BUnFCLENBVXRCO0FBQ0E7QUFDQTs7O0FBQ0EsVUFBSUksU0FBUyxHQUNYLE9BQU9KLEtBQVAsS0FBaUIsUUFBakIsSUFBNkJBLEtBQUssQ0FBQ0ssS0FBTixDQUFZVCw2QkFBWixDQUE3QixHQUNJLHFCQUFTSSxLQUFLLENBQUNNLE9BQU4sQ0FBY1QsbUJBQWQsRUFBbUMsRUFBbkMsQ0FBVCxDQURKLEdBRUkscUJBQVNHLEtBQVQsQ0FITjs7QUFLQSxZQUFLRCxLQUFMLENBQVdRLFFBQVgsQ0FBb0JILFNBQXBCO0FBQ0QsS0EzQmtCOztBQUdqQixVQUFLSSxLQUFMLEdBQWE7QUFDWE4sTUFBQUEsU0FBUyxFQUFFSCxLQUFLLENBQUNDO0FBRE4sS0FBYjtBQUhpQjtBQU1sQjs7OztXQXVCRCxrQkFBUztBQUNQLFVBQVFTLFdBQVIsR0FBd0IsS0FBS1YsS0FBTCxDQUFXVyxRQUFYLENBQW9CQyxNQUE1QyxDQUFRRixXQUFSOztBQUNBLHdCQUErQixLQUFLVixLQUFwQztBQUFBLFVBQVFhLFFBQVIsZUFBUUEsUUFBUjtBQUFBLFVBQXFCYixLQUFyQjs7QUFDQSxVQUFRRyxTQUFSLEdBQXNCLEtBQUtNLEtBQTNCLENBQVFOLFNBQVI7QUFFQSxVQUFJRixLQUFLLEdBQUdZLFFBQVo7O0FBRUEsVUFBSSxPQUFPVixTQUFQLEtBQXFCLFFBQXJCLElBQWlDLE9BQU9GLEtBQVAsS0FBaUIsUUFBdEQsRUFBZ0U7QUFDOUQ7QUFDQTtBQUNBO0FBQ0EsWUFBTWEsRUFBRSxHQUFHLElBQUlDLE1BQUosQ0FBVyxVQUFHZCxLQUFILEVBQVdNLE9BQVgsQ0FBbUIsR0FBbkIsRUFBd0IsS0FBeEIsSUFBaUMsU0FBNUMsQ0FBWCxDQUo4RCxDQU05RDtBQUNBOztBQUNBLFlBQUlKLFNBQVMsQ0FBQ0csS0FBVixDQUFnQlEsRUFBaEIsQ0FBSixFQUF5QjtBQUN2QmIsVUFBQUEsS0FBSyxHQUFHRSxTQUFSO0FBQ0Q7QUFDRjs7QUFFRCwwQkFDRSw2QkFBQyxXQUFELGVBQWlCSCxLQUFqQjtBQUF3QixRQUFBLFFBQVEsRUFBRUMsS0FBbEM7QUFBeUMsUUFBQSxRQUFRLEVBQUUsS0FBS2U7QUFBeEQsU0FERjtBQUdEOzs7O0VBckR1QkMsZUFBTUMsUzs7QUF3RGhDLElBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDdEIsRUFBQUEsV0FBVyxDQUFDdUIsU0FBWixHQUF3QkMsS0FBSyxDQUFDQyxVQUE5QjtBQUNEOztBQUVEekIsV0FBVyxDQUFDMEIsWUFBWixHQUEyQjtBQUN6QkMsRUFBQUEsUUFBUSxFQUFFO0FBRGUsQ0FBM0I7ZUFJZTNCLFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgYXNOdW1iZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuXHJcbi8vIE1hdGNoZXMgYSBzdHJpbmcgdGhhdCBlbmRzIGluIGEgLiBjaGFyYWN0ZXIsIG9wdGlvbmFsbHkgZm9sbG93ZWQgYnkgYSBzZXF1ZW5jZSBvZlxyXG4vLyBkaWdpdHMgZm9sbG93ZWQgYnkgYW55IG51bWJlciBvZiAwIGNoYXJhY3RlcnMgdXAgdW50aWwgdGhlIGVuZCBvZiB0aGUgbGluZS5cclxuLy8gRW5zdXJpbmcgdGhhdCB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgcHJlZml4ZWQgY2hhcmFjdGVyIGlzIGltcG9ydGFudCBzbyB0aGF0XHJcbi8vIHlvdSBkb24ndCBpbmNvcnJlY3RseSBtYXRjaCBhZ2FpbnN0IFwiMFwiLlxyXG5jb25zdCB0cmFpbGluZ0NoYXJNYXRjaGVyV2l0aFByZWZpeCA9IC9cXC4oWzAtOV0qMCkqJC87XHJcblxyXG4vLyBUaGlzIGlzIHVzZWQgZm9yIHRyaW1taW5nIHRoZSB0cmFpbGluZyAwIGFuZCAuIGNoYXJhY3RlcnMgd2l0aG91dCBhZmZlY3RpbmdcclxuLy8gdGhlIHJlc3Qgb2YgdGhlIHN0cmluZy4gSXRzIHBvc3NpYmxlIHRvIHVzZSBvbmUgUmVnRXggd2l0aCBncm91cHMgZm9yIHRoaXNcclxuLy8gZnVuY3Rpb25hbGl0eSwgYnV0IGl0IGlzIGZhaXJseSBjb21wbGV4IGNvbXBhcmVkIHRvIHNpbXBseSBkZWZpbmluZyB0d29cclxuLy8gZGlmZmVyZW50IG1hdGNoZXJzLlxyXG5jb25zdCB0cmFpbGluZ0NoYXJNYXRjaGVyID0gL1swLl0wKiQvO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBOdW1iZXJGaWVsZCBjbGFzcyBoYXMgc29tZSBzcGVjaWFsIGhhbmRsaW5nIGZvciBkZWFsaW5nIHdpdGggdHJhaWxpbmdcclxuICogZGVjaW1hbCBwb2ludHMgYW5kL29yIHplcm9lcy4gVGhpcyBsb2dpYyBpcyBkZXNpZ25lZCB0byBhbGxvdyB0cmFpbGluZyB2YWx1ZXNcclxuICogdG8gYmUgdmlzaWJsZSBpbiB0aGUgaW5wdXQgZWxlbWVudCwgYnV0IG5vdCBiZSByZXByZXNlbnRlZCBpbiB0aGVcclxuICogY29ycmVzcG9uZGluZyBmb3JtIGRhdGEuXHJcbiAqXHJcbiAqIFRoZSBhbGdvcml0aG0gaXMgYXMgZm9sbG93czpcclxuICpcclxuICogMS4gV2hlbiB0aGUgaW5wdXQgdmFsdWUgY2hhbmdlcyB0aGUgdmFsdWUgaXMgY2FjaGVkIGluIHRoZSBjb21wb25lbnQgc3RhdGVcclxuICpcclxuICogMi4gVGhlIHZhbHVlIGlzIHRoZW4gbm9ybWFsaXplZCwgcmVtb3ZpbmcgdHJhaWxpbmcgZGVjaW1hbCBwb2ludHMgYW5kIHplcm9zLFxyXG4gKiAgICB0aGVuIHBhc3NlZCB0byB0aGUgXCJvbkNoYW5nZVwiIGNhbGxiYWNrXHJcbiAqXHJcbiAqIDMuIFdoZW4gdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZCwgdGhlIGZvcm1EYXRhIHZhbHVlIGlzIGNoZWNrZWQgYWdhaW5zdCB0aGVcclxuICogICAgdmFsdWUgY2FjaGVkIGluIHRoZSBzdGF0ZS4gSWYgaXQgbWF0Y2hlcyB0aGUgY2FjaGVkIHZhbHVlLCB0aGUgY2FjaGVkXHJcbiAqICAgIHZhbHVlIGlzIHBhc3NlZCB0byB0aGUgaW5wdXQgaW5zdGVhZCBvZiB0aGUgZm9ybURhdGEgdmFsdWVcclxuICovXHJcbmNsYXNzIE51bWJlckZpZWxkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGxhc3RWYWx1ZTogcHJvcHMudmFsdWUsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2hhbmdlID0gdmFsdWUgPT4ge1xyXG4gICAgLy8gQ2FjaGUgdGhlIG9yaWdpbmFsIHZhbHVlIGluIGNvbXBvbmVudCBzdGF0ZVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxhc3RWYWx1ZTogdmFsdWUgfSk7XHJcblxyXG4gICAgLy8gTm9ybWFsaXplIGRlY2ltYWxzIHRoYXQgZG9uJ3Qgc3RhcnQgd2l0aCBhIHplcm8gY2hhcmFjdGVyIGluIGFkdmFuY2Ugc29cclxuICAgIC8vIHRoYXQgdGhlIHJlc3Qgb2YgdGhlIG5vcm1hbGl6YXRpb24gbG9naWMgaXMgc2ltcGxlclxyXG4gICAgaWYgKGAke3ZhbHVlfWAuY2hhckF0KDApID09PSBcIi5cIikge1xyXG4gICAgICB2YWx1ZSA9IGAwJHt2YWx1ZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIHRoYXQgdGhlIHZhbHVlIGlzIGEgc3RyaW5nICh0aGlzIGNhbiBoYXBwZW4gaWYgdGhlIHdpZGdldCB1c2VkIGlzIGFcclxuICAgIC8vIDxzZWxlY3Q+LCBkdWUgdG8gYW4gZW51bSBkZWNsYXJhdGlvbiBldGMpIHRoZW4sIGlmIHRoZSB2YWx1ZSBlbmRzIGluIGFcclxuICAgIC8vIHRyYWlsaW5nIGRlY2ltYWwgcG9pbnQgb3IgbXVsdGlwbGUgemVyb2VzLCBzdHJpcCB0aGUgdHJhaWxpbmcgdmFsdWVzXHJcbiAgICBsZXQgcHJvY2Vzc2VkID1cclxuICAgICAgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLm1hdGNoKHRyYWlsaW5nQ2hhck1hdGNoZXJXaXRoUHJlZml4KVxyXG4gICAgICAgID8gYXNOdW1iZXIodmFsdWUucmVwbGFjZSh0cmFpbGluZ0NoYXJNYXRjaGVyLCBcIlwiKSlcclxuICAgICAgICA6IGFzTnVtYmVyKHZhbHVlKTtcclxuXHJcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHByb2Nlc3NlZCk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBTdHJpbmdGaWVsZCB9ID0gdGhpcy5wcm9wcy5yZWdpc3RyeS5maWVsZHM7XHJcbiAgICBjb25zdCB7IGZvcm1EYXRhLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgbGFzdFZhbHVlIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIGxldCB2YWx1ZSA9IGZvcm1EYXRhO1xyXG5cclxuICAgIGlmICh0eXBlb2YgbGFzdFZhbHVlID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAvLyBDb25zdHJ1Y3QgYSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCBjaGVja3MgZm9yIGEgc3RyaW5nIHRoYXQgY29uc2lzdHNcclxuICAgICAgLy8gb2YgdGhlIGZvcm1EYXRhIHZhbHVlIHN1ZmZpeGVkIHdpdGggemVybyBvciBvbmUgJy4nIGNoYXJhY3RlcnMgYW5kIHplcm9cclxuICAgICAgLy8gb3IgbW9yZSAnMCcgY2hhcmFjdGVyc1xyXG4gICAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAoYCR7dmFsdWV9YC5yZXBsYWNlKFwiLlwiLCBcIlxcXFwuXCIpICsgXCJcXFxcLj8wKiRcIik7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgY2FjaGVkIFwibGFzdFZhbHVlXCIgaXMgYSBtYXRjaCwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgZm9ybURhdGFcclxuICAgICAgLy8gdmFsdWUgdG8gcHJldmVudCB0aGUgaW5wdXQgdmFsdWUgZnJvbSBjaGFuZ2luZyBpbiB0aGUgVUlcclxuICAgICAgaWYgKGxhc3RWYWx1ZS5tYXRjaChyZSkpIHtcclxuICAgICAgICB2YWx1ZSA9IGxhc3RWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxTdHJpbmdGaWVsZCB7Li4ucHJvcHN9IGZvcm1EYXRhPXt2YWx1ZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBOdW1iZXJGaWVsZC5wcm9wVHlwZXMgPSB0eXBlcy5maWVsZFByb3BzO1xyXG59XHJcblxyXG5OdW1iZXJGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgdWlTY2hlbWE6IHt9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyRmllbGQ7XHJcbiJdfQ==