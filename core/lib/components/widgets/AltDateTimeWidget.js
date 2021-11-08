function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";
import AltDateWidget from "./AltDateWidget";

function AltDateTimeWidget(props) {
  var AltDateWidget = props.registry.widgets.AltDateWidget;
  return React.createElement(AltDateWidget, _extends({
    time: true
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  AltDateTimeWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.object
  };
}

AltDateTimeWidget.defaultProps = _objectSpread({}, AltDateWidget.defaultProps, {
  time: true
});
export default AltDateTimeWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJBbHREYXRlV2lkZ2V0IiwiQWx0RGF0ZVRpbWVXaWRnZXQiLCJwcm9wcyIsInJlZ2lzdHJ5Iiwid2lkZ2V0cyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsInNjaGVtYSIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJpZCIsInN0cmluZyIsInZhbHVlIiwicmVxdWlyZWQiLCJib29sIiwib25DaGFuZ2UiLCJmdW5jIiwib3B0aW9ucyIsImRlZmF1bHRQcm9wcyIsInRpbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixpQkFBMUI7O0FBRUEsU0FBU0MsaUJBQVQsQ0FBMkJDLEtBQTNCLEVBQWtDO0FBQUEsTUFDeEJGLGFBRHdCLEdBQ05FLEtBQUssQ0FBQ0MsUUFBTixDQUFlQyxPQURULENBQ3hCSixhQUR3QjtBQUVoQyxTQUFPLG9CQUFDLGFBQUQ7QUFBZSxJQUFBLElBQUk7QUFBbkIsS0FBd0JFLEtBQXhCLEVBQVA7QUFDRDs7QUFFRCxJQUFJRyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q04sRUFBQUEsaUJBQWlCLENBQUNPLFNBQWxCLEdBQThCO0FBQzVCQyxJQUFBQSxNQUFNLEVBQUVWLFNBQVMsQ0FBQ1csTUFBVixDQUFpQkMsVUFERztBQUU1QkMsSUFBQUEsRUFBRSxFQUFFYixTQUFTLENBQUNjLE1BQVYsQ0FBaUJGLFVBRk87QUFHNUJHLElBQUFBLEtBQUssRUFBRWYsU0FBUyxDQUFDYyxNQUhXO0FBSTVCRSxJQUFBQSxRQUFRLEVBQUVoQixTQUFTLENBQUNpQixJQUpRO0FBSzVCQyxJQUFBQSxRQUFRLEVBQUVsQixTQUFTLENBQUNtQixJQUxRO0FBTTVCQyxJQUFBQSxPQUFPLEVBQUVwQixTQUFTLENBQUNXO0FBTlMsR0FBOUI7QUFRRDs7QUFFRFQsaUJBQWlCLENBQUNtQixZQUFsQixxQkFDS3BCLGFBQWEsQ0FBQ29CLFlBRG5CO0FBRUVDLEVBQUFBLElBQUksRUFBRTtBQUZSO0FBS0EsZUFBZXBCLGlCQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBBbHREYXRlV2lkZ2V0IGZyb20gXCIuL0FsdERhdGVXaWRnZXRcIjtcclxuXHJcbmZ1bmN0aW9uIEFsdERhdGVUaW1lV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3QgeyBBbHREYXRlV2lkZ2V0IH0gPSBwcm9wcy5yZWdpc3RyeS53aWRnZXRzO1xyXG4gIHJldHVybiA8QWx0RGF0ZVdpZGdldCB0aW1lIHsuLi5wcm9wc30gLz47XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBBbHREYXRlVGltZVdpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgfTtcclxufVxyXG5cclxuQWx0RGF0ZVRpbWVXaWRnZXQuZGVmYXVsdFByb3BzID0ge1xyXG4gIC4uLkFsdERhdGVXaWRnZXQuZGVmYXVsdFByb3BzLFxyXG4gIHRpbWU6IHRydWUsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbHREYXRlVGltZVdpZGdldDtcclxuIl19