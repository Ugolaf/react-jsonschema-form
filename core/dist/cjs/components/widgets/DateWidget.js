"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DateWidget(props) {
  var _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, _extends({
    type: "date"
  }, props, {
    onChange: function onChange(value) {
      return _onChange(value || undefined);
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateWidget.propTypes = {
    value: _propTypes["default"].string
  };
}

var _default = DateWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJEYXRlV2lkZ2V0IiwicHJvcHMiLCJvbkNoYW5nZSIsIkJhc2VJbnB1dCIsInJlZ2lzdHJ5Iiwid2lkZ2V0cyIsInZhbHVlIiwidW5kZWZpbmVkIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQUEsTUFFdkJDLFNBRnVCLEdBTXJCRCxLQU5xQixDQUV2QkMsUUFGdUI7QUFBQSxNQUlWQyxTQUpVLEdBTXJCRixLQU5xQixDQUd2QkcsUUFIdUIsQ0FJckJDLE9BSnFCLENBSVZGLFNBSlU7QUFPekIsU0FDRSxnQ0FBQyxTQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUM7QUFEUCxLQUVNRixLQUZOO0FBR0UsSUFBQSxRQUFRLEVBQUUsa0JBQUFLLEtBQUs7QUFBQSxhQUFJSixTQUFRLENBQUNJLEtBQUssSUFBSUMsU0FBVixDQUFaO0FBQUE7QUFIakIsS0FERjtBQU9EOztBQUVELElBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDVixFQUFBQSxVQUFVLENBQUNXLFNBQVgsR0FBdUI7QUFDckJMLElBQUFBLEtBQUssRUFBRU0sc0JBQVVDO0FBREksR0FBdkI7QUFHRDs7ZUFFY2IsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZnVuY3Rpb24gRGF0ZVdpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIG9uQ2hhbmdlLFxyXG4gICAgcmVnaXN0cnk6IHtcclxuICAgICAgd2lkZ2V0czogeyBCYXNlSW5wdXQgfSxcclxuICAgIH0sXHJcbiAgfSA9IHByb3BzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8QmFzZUlucHV0XHJcbiAgICAgIHR5cGU9XCJkYXRlXCJcclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgICBvbkNoYW5nZT17dmFsdWUgPT4gb25DaGFuZ2UodmFsdWUgfHwgdW5kZWZpbmVkKX1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIERhdGVXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGF0ZVdpZGdldDtcclxuIl19