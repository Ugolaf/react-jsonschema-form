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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

var NumberField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NumberField, _React$Component);

  function NumberField(props) {
    var _this;

    _classCallCheck(this, NumberField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberField).call(this, props));

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
          props = _objectWithoutProperties(_this$props, ["formData"]);

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

      return _react["default"].createElement(StringField, _extends({}, props, {
        formData: value,
        onChange: this.handleChange
      }));
    }
  }]);

  return NumberField;
}(_react["default"].Component);

if (process.env.NODE_ENV !== "production") {
  NumberField.propTypes = types.fieldProps;
}

NumberField.defaultProps = {
  uiSchema: {}
};
var _default = NumberField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9OdW1iZXJGaWVsZC5qcyJdLCJuYW1lcyI6WyJ0cmFpbGluZ0NoYXJNYXRjaGVyV2l0aFByZWZpeCIsInRyYWlsaW5nQ2hhck1hdGNoZXIiLCJOdW1iZXJGaWVsZCIsInByb3BzIiwidmFsdWUiLCJzZXRTdGF0ZSIsImxhc3RWYWx1ZSIsImNoYXJBdCIsInByb2Nlc3NlZCIsIm1hdGNoIiwicmVwbGFjZSIsIm9uQ2hhbmdlIiwic3RhdGUiLCJTdHJpbmdGaWVsZCIsInJlZ2lzdHJ5IiwiZmllbGRzIiwiZm9ybURhdGEiLCJyZSIsIlJlZ0V4cCIsImhhbmRsZUNoYW5nZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidHlwZXMiLCJmaWVsZFByb3BzIiwiZGVmYXVsdFByb3BzIiwidWlTY2hlbWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLDZCQUE2QixHQUFHLGVBQXRDLEMsQ0FFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxTQUE1QjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQk1DLFc7Ozs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIscUZBQU1BLEtBQU47O0FBRGlCLG1FQVFKLFVBQUFDLEtBQUssRUFBSTtBQUN0QjtBQUNBLFlBQUtDLFFBQUwsQ0FBYztBQUFFQyxRQUFBQSxTQUFTLEVBQUVGO0FBQWIsT0FBZCxFQUZzQixDQUl0QjtBQUNBOzs7QUFDQSxVQUFJLFVBQUdBLEtBQUgsRUFBV0csTUFBWCxDQUFrQixDQUFsQixNQUF5QixHQUE3QixFQUFrQztBQUNoQ0gsUUFBQUEsS0FBSyxjQUFPQSxLQUFQLENBQUw7QUFDRCxPQVJxQixDQVV0QjtBQUNBO0FBQ0E7OztBQUNBLFVBQUlJLFNBQVMsR0FDWCxPQUFPSixLQUFQLEtBQWlCLFFBQWpCLElBQTZCQSxLQUFLLENBQUNLLEtBQU4sQ0FBWVQsNkJBQVosQ0FBN0IsR0FDSSxxQkFBU0ksS0FBSyxDQUFDTSxPQUFOLENBQWNULG1CQUFkLEVBQW1DLEVBQW5DLENBQVQsQ0FESixHQUVJLHFCQUFTRyxLQUFULENBSE47O0FBS0EsWUFBS0QsS0FBTCxDQUFXUSxRQUFYLENBQW9CSCxTQUFwQjtBQUNELEtBM0JrQjs7QUFHakIsVUFBS0ksS0FBTCxHQUFhO0FBQ1hOLE1BQUFBLFNBQVMsRUFBRUgsS0FBSyxDQUFDQztBQUROLEtBQWI7QUFIaUI7QUFNbEI7Ozs7NkJBdUJRO0FBQUEsVUFDQ1MsV0FERCxHQUNpQixLQUFLVixLQUFMLENBQVdXLFFBQVgsQ0FBb0JDLE1BRHJDLENBQ0NGLFdBREQ7O0FBQUEsd0JBRXdCLEtBQUtWLEtBRjdCO0FBQUEsVUFFQ2EsUUFGRCxlQUVDQSxRQUZEO0FBQUEsVUFFY2IsS0FGZDs7QUFBQSxVQUdDRyxTQUhELEdBR2UsS0FBS00sS0FIcEIsQ0FHQ04sU0FIRDtBQUtQLFVBQUlGLEtBQUssR0FBR1ksUUFBWjs7QUFFQSxVQUFJLE9BQU9WLFNBQVAsS0FBcUIsUUFBckIsSUFBaUMsT0FBT0YsS0FBUCxLQUFpQixRQUF0RCxFQUFnRTtBQUM5RDtBQUNBO0FBQ0E7QUFDQSxZQUFNYSxFQUFFLEdBQUcsSUFBSUMsTUFBSixDQUFXLFVBQUdkLEtBQUgsRUFBV00sT0FBWCxDQUFtQixHQUFuQixFQUF3QixLQUF4QixJQUFpQyxTQUE1QyxDQUFYLENBSjhELENBTTlEO0FBQ0E7O0FBQ0EsWUFBSUosU0FBUyxDQUFDRyxLQUFWLENBQWdCUSxFQUFoQixDQUFKLEVBQXlCO0FBQ3ZCYixVQUFBQSxLQUFLLEdBQUdFLFNBQVI7QUFDRDtBQUNGOztBQUVELGFBQ0UsZ0NBQUMsV0FBRCxlQUFpQkgsS0FBakI7QUFBd0IsUUFBQSxRQUFRLEVBQUVDLEtBQWxDO0FBQXlDLFFBQUEsUUFBUSxFQUFFLEtBQUtlO0FBQXhELFNBREY7QUFHRDs7OztFQXJEdUJDLGtCQUFNQyxTOztBQXdEaEMsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekN0QixFQUFBQSxXQUFXLENBQUN1QixTQUFaLEdBQXdCQyxLQUFLLENBQUNDLFVBQTlCO0FBQ0Q7O0FBRUR6QixXQUFXLENBQUMwQixZQUFaLEdBQTJCO0FBQ3pCQyxFQUFBQSxRQUFRLEVBQUU7QUFEZSxDQUEzQjtlQUllM0IsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBhc051bWJlciB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuLy8gTWF0Y2hlcyBhIHN0cmluZyB0aGF0IGVuZHMgaW4gYSAuIGNoYXJhY3Rlciwgb3B0aW9uYWxseSBmb2xsb3dlZCBieSBhIHNlcXVlbmNlIG9mXHJcbi8vIGRpZ2l0cyBmb2xsb3dlZCBieSBhbnkgbnVtYmVyIG9mIDAgY2hhcmFjdGVycyB1cCB1bnRpbCB0aGUgZW5kIG9mIHRoZSBsaW5lLlxyXG4vLyBFbnN1cmluZyB0aGF0IHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBwcmVmaXhlZCBjaGFyYWN0ZXIgaXMgaW1wb3J0YW50IHNvIHRoYXRcclxuLy8geW91IGRvbid0IGluY29ycmVjdGx5IG1hdGNoIGFnYWluc3QgXCIwXCIuXHJcbmNvbnN0IHRyYWlsaW5nQ2hhck1hdGNoZXJXaXRoUHJlZml4ID0gL1xcLihbMC05XSowKSokLztcclxuXHJcbi8vIFRoaXMgaXMgdXNlZCBmb3IgdHJpbW1pbmcgdGhlIHRyYWlsaW5nIDAgYW5kIC4gY2hhcmFjdGVycyB3aXRob3V0IGFmZmVjdGluZ1xyXG4vLyB0aGUgcmVzdCBvZiB0aGUgc3RyaW5nLiBJdHMgcG9zc2libGUgdG8gdXNlIG9uZSBSZWdFeCB3aXRoIGdyb3VwcyBmb3IgdGhpc1xyXG4vLyBmdW5jdGlvbmFsaXR5LCBidXQgaXQgaXMgZmFpcmx5IGNvbXBsZXggY29tcGFyZWQgdG8gc2ltcGx5IGRlZmluaW5nIHR3b1xyXG4vLyBkaWZmZXJlbnQgbWF0Y2hlcnMuXHJcbmNvbnN0IHRyYWlsaW5nQ2hhck1hdGNoZXIgPSAvWzAuXTAqJC87XHJcblxyXG4vKipcclxuICogVGhlIE51bWJlckZpZWxkIGNsYXNzIGhhcyBzb21lIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGRlYWxpbmcgd2l0aCB0cmFpbGluZ1xyXG4gKiBkZWNpbWFsIHBvaW50cyBhbmQvb3IgemVyb2VzLiBUaGlzIGxvZ2ljIGlzIGRlc2lnbmVkIHRvIGFsbG93IHRyYWlsaW5nIHZhbHVlc1xyXG4gKiB0byBiZSB2aXNpYmxlIGluIHRoZSBpbnB1dCBlbGVtZW50LCBidXQgbm90IGJlIHJlcHJlc2VudGVkIGluIHRoZVxyXG4gKiBjb3JyZXNwb25kaW5nIGZvcm0gZGF0YS5cclxuICpcclxuICogVGhlIGFsZ29yaXRobSBpcyBhcyBmb2xsb3dzOlxyXG4gKlxyXG4gKiAxLiBXaGVuIHRoZSBpbnB1dCB2YWx1ZSBjaGFuZ2VzIHRoZSB2YWx1ZSBpcyBjYWNoZWQgaW4gdGhlIGNvbXBvbmVudCBzdGF0ZVxyXG4gKlxyXG4gKiAyLiBUaGUgdmFsdWUgaXMgdGhlbiBub3JtYWxpemVkLCByZW1vdmluZyB0cmFpbGluZyBkZWNpbWFsIHBvaW50cyBhbmQgemVyb3MsXHJcbiAqICAgIHRoZW4gcGFzc2VkIHRvIHRoZSBcIm9uQ2hhbmdlXCIgY2FsbGJhY2tcclxuICpcclxuICogMy4gV2hlbiB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkLCB0aGUgZm9ybURhdGEgdmFsdWUgaXMgY2hlY2tlZCBhZ2FpbnN0IHRoZVxyXG4gKiAgICB2YWx1ZSBjYWNoZWQgaW4gdGhlIHN0YXRlLiBJZiBpdCBtYXRjaGVzIHRoZSBjYWNoZWQgdmFsdWUsIHRoZSBjYWNoZWRcclxuICogICAgdmFsdWUgaXMgcGFzc2VkIHRvIHRoZSBpbnB1dCBpbnN0ZWFkIG9mIHRoZSBmb3JtRGF0YSB2YWx1ZVxyXG4gKi9cclxuY2xhc3MgTnVtYmVyRmllbGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgbGFzdFZhbHVlOiBwcm9wcy52YWx1ZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDaGFuZ2UgPSB2YWx1ZSA9PiB7XHJcbiAgICAvLyBDYWNoZSB0aGUgb3JpZ2luYWwgdmFsdWUgaW4gY29tcG9uZW50IHN0YXRlXHJcbiAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFZhbHVlOiB2YWx1ZSB9KTtcclxuXHJcbiAgICAvLyBOb3JtYWxpemUgZGVjaW1hbHMgdGhhdCBkb24ndCBzdGFydCB3aXRoIGEgemVybyBjaGFyYWN0ZXIgaW4gYWR2YW5jZSBzb1xyXG4gICAgLy8gdGhhdCB0aGUgcmVzdCBvZiB0aGUgbm9ybWFsaXphdGlvbiBsb2dpYyBpcyBzaW1wbGVyXHJcbiAgICBpZiAoYCR7dmFsdWV9YC5jaGFyQXQoMCkgPT09IFwiLlwiKSB7XHJcbiAgICAgIHZhbHVlID0gYDAke3ZhbHVlfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgKHRoaXMgY2FuIGhhcHBlbiBpZiB0aGUgd2lkZ2V0IHVzZWQgaXMgYVxyXG4gICAgLy8gPHNlbGVjdD4sIGR1ZSB0byBhbiBlbnVtIGRlY2xhcmF0aW9uIGV0YykgdGhlbiwgaWYgdGhlIHZhbHVlIGVuZHMgaW4gYVxyXG4gICAgLy8gdHJhaWxpbmcgZGVjaW1hbCBwb2ludCBvciBtdWx0aXBsZSB6ZXJvZXMsIHN0cmlwIHRoZSB0cmFpbGluZyB2YWx1ZXNcclxuICAgIGxldCBwcm9jZXNzZWQgPVxyXG4gICAgICB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUubWF0Y2godHJhaWxpbmdDaGFyTWF0Y2hlcldpdGhQcmVmaXgpXHJcbiAgICAgICAgPyBhc051bWJlcih2YWx1ZS5yZXBsYWNlKHRyYWlsaW5nQ2hhck1hdGNoZXIsIFwiXCIpKVxyXG4gICAgICAgIDogYXNOdW1iZXIodmFsdWUpO1xyXG5cclxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UocHJvY2Vzc2VkKTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IFN0cmluZ0ZpZWxkIH0gPSB0aGlzLnByb3BzLnJlZ2lzdHJ5LmZpZWxkcztcclxuICAgIGNvbnN0IHsgZm9ybURhdGEsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyBsYXN0VmFsdWUgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgbGV0IHZhbHVlID0gZm9ybURhdGE7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBsYXN0VmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIC8vIENvbnN0cnVjdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0aGF0IGNoZWNrcyBmb3IgYSBzdHJpbmcgdGhhdCBjb25zaXN0c1xyXG4gICAgICAvLyBvZiB0aGUgZm9ybURhdGEgdmFsdWUgc3VmZml4ZWQgd2l0aCB6ZXJvIG9yIG9uZSAnLicgY2hhcmFjdGVycyBhbmQgemVyb1xyXG4gICAgICAvLyBvciBtb3JlICcwJyBjaGFyYWN0ZXJzXHJcbiAgICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChgJHt2YWx1ZX1gLnJlcGxhY2UoXCIuXCIsIFwiXFxcXC5cIikgKyBcIlxcXFwuPzAqJFwiKTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSBjYWNoZWQgXCJsYXN0VmFsdWVcIiBpcyBhIG1hdGNoLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBmb3JtRGF0YVxyXG4gICAgICAvLyB2YWx1ZSB0byBwcmV2ZW50IHRoZSBpbnB1dCB2YWx1ZSBmcm9tIGNoYW5naW5nIGluIHRoZSBVSVxyXG4gICAgICBpZiAobGFzdFZhbHVlLm1hdGNoKHJlKSkge1xyXG4gICAgICAgIHZhbHVlID0gbGFzdFZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFN0cmluZ0ZpZWxkIHsuLi5wcm9wc30gZm9ybURhdGE9e3ZhbHVlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIE51bWJlckZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XHJcbn1cclxuXHJcbk51bWJlckZpZWxkLmRlZmF1bHRQcm9wcyA9IHtcclxuICB1aVNjaGVtYToge30sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJGaWVsZDtcclxuIl19