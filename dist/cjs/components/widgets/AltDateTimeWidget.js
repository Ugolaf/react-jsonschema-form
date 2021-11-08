"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AltDateWidget = _interopRequireDefault(require("./AltDateWidget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AltDateTimeWidget(props) {
  var AltDateWidget = props.registry.widgets.AltDateWidget;
  return _react["default"].createElement(AltDateWidget, _extends({
    time: true
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  AltDateTimeWidget.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    id: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].string,
    required: _propTypes["default"].bool,
    onChange: _propTypes["default"].func,
    options: _propTypes["default"].object
  };
}

AltDateTimeWidget.defaultProps = _objectSpread({}, _AltDateWidget["default"].defaultProps, {
  time: true
});
var _default = AltDateTimeWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiQWx0RGF0ZVRpbWVXaWRnZXQiLCJwcm9wcyIsIkFsdERhdGVXaWRnZXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzY2hlbWEiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiaWQiLCJzdHJpbmciLCJ2YWx1ZSIsInJlcXVpcmVkIiwiYm9vbCIsIm9uQ2hhbmdlIiwiZnVuYyIsIm9wdGlvbnMiLCJkZWZhdWx0UHJvcHMiLCJ0aW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxpQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0M7QUFBQSxNQUN4QkMsYUFEd0IsR0FDTkQsS0FBSyxDQUFDRSxRQUFOLENBQWVDLE9BRFQsQ0FDeEJGLGFBRHdCO0FBRWhDLFNBQU8sZ0NBQUMsYUFBRDtBQUFlLElBQUEsSUFBSTtBQUFuQixLQUF3QkQsS0FBeEIsRUFBUDtBQUNEOztBQUVELElBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDUCxFQUFBQSxpQkFBaUIsQ0FBQ1EsU0FBbEIsR0FBOEI7QUFDNUJDLElBQUFBLE1BQU0sRUFBRUMsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBREc7QUFFNUJDLElBQUFBLEVBQUUsRUFBRUgsc0JBQVVJLE1BQVYsQ0FBaUJGLFVBRk87QUFHNUJHLElBQUFBLEtBQUssRUFBRUwsc0JBQVVJLE1BSFc7QUFJNUJFLElBQUFBLFFBQVEsRUFBRU4sc0JBQVVPLElBSlE7QUFLNUJDLElBQUFBLFFBQVEsRUFBRVIsc0JBQVVTLElBTFE7QUFNNUJDLElBQUFBLE9BQU8sRUFBRVYsc0JBQVVDO0FBTlMsR0FBOUI7QUFRRDs7QUFFRFgsaUJBQWlCLENBQUNxQixZQUFsQixxQkFDS25CLDBCQUFjbUIsWUFEbkI7QUFFRUMsRUFBQUEsSUFBSSxFQUFFO0FBRlI7ZUFLZXRCLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBBbHREYXRlV2lkZ2V0IGZyb20gXCIuL0FsdERhdGVXaWRnZXRcIjtcclxuXHJcbmZ1bmN0aW9uIEFsdERhdGVUaW1lV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3QgeyBBbHREYXRlV2lkZ2V0IH0gPSBwcm9wcy5yZWdpc3RyeS53aWRnZXRzO1xyXG4gIHJldHVybiA8QWx0RGF0ZVdpZGdldCB0aW1lIHsuLi5wcm9wc30gLz47XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBBbHREYXRlVGltZVdpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgfTtcclxufVxyXG5cclxuQWx0RGF0ZVRpbWVXaWRnZXQuZGVmYXVsdFByb3BzID0ge1xyXG4gIC4uLkFsdERhdGVXaWRnZXQuZGVmYXVsdFByb3BzLFxyXG4gIHRpbWU6IHRydWUsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbHREYXRlVGltZVdpZGdldDtcclxuIl19