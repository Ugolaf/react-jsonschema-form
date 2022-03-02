"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DateTimeWidget(props) {
  var value = props.value,
      _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/_react.default.createElement(BaseInput, _extends({
    type: "datetime-local"
  }, props, {
    value: (0, _utils.utcToLocal)(value),
    onChange: function onChange(value) {
      return _onChange((0, _utils.localToUTC)(value));
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateTimeWidget.propTypes = {
    value: _propTypes.default.string
  };
}

var _default = DateTimeWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiRGF0ZVRpbWVXaWRnZXQiLCJwcm9wcyIsInZhbHVlIiwib25DaGFuZ2UiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7QUFDN0IsTUFDRUMsS0FERixHQU1JRCxLQU5KLENBQ0VDLEtBREY7QUFBQSxNQUVFQyxTQUZGLEdBTUlGLEtBTkosQ0FFRUUsUUFGRjtBQUFBLE1BSWVDLFNBSmYsR0FNSUgsS0FOSixDQUdFSSxRQUhGLENBSUlDLE9BSkosQ0FJZUYsU0FKZjtBQU9BLHNCQUNFLDZCQUFDLFNBQUQ7QUFDRSxJQUFBLElBQUksRUFBQztBQURQLEtBRU1ILEtBRk47QUFHRSxJQUFBLEtBQUssRUFBRSx1QkFBV0MsS0FBWCxDQUhUO0FBSUUsSUFBQSxRQUFRLEVBQUUsa0JBQUFBLEtBQUs7QUFBQSxhQUFJQyxTQUFRLENBQUMsdUJBQVdELEtBQVgsQ0FBRCxDQUFaO0FBQUE7QUFKakIsS0FERjtBQVFEOztBQUVELElBQUlLLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDVCxFQUFBQSxjQUFjLENBQUNVLFNBQWYsR0FBMkI7QUFDekJSLElBQUFBLEtBQUssRUFBRVMsbUJBQVVDO0FBRFEsR0FBM0I7QUFHRDs7ZUFFY1osYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgeyB1dGNUb0xvY2FsLCBsb2NhbFRvVVRDIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5mdW5jdGlvbiBEYXRlVGltZVdpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIHZhbHVlLFxyXG4gICAgb25DaGFuZ2UsXHJcbiAgICByZWdpc3RyeToge1xyXG4gICAgICB3aWRnZXRzOiB7IEJhc2VJbnB1dCB9LFxyXG4gICAgfSxcclxuICB9ID0gcHJvcHM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxCYXNlSW5wdXRcclxuICAgICAgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCJcclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgICB2YWx1ZT17dXRjVG9Mb2NhbCh2YWx1ZSl9XHJcbiAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiBvbkNoYW5nZShsb2NhbFRvVVRDKHZhbHVlKSl9XHJcbiAgICAvPlxyXG4gICk7XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBEYXRlVGltZVdpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXRlVGltZVdpZGdldDtcclxuIl19