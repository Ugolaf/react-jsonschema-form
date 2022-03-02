"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AltDateWidget = _interopRequireDefault(require("./AltDateWidget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AltDateTimeWidget(props) {
  var AltDateWidget = props.registry.widgets.AltDateWidget;
  return /*#__PURE__*/_react.default.createElement(AltDateWidget, _extends({
    time: true
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  AltDateTimeWidget.propTypes = {
    schema: _propTypes.default.object.isRequired,
    id: _propTypes.default.string.isRequired,
    value: _propTypes.default.string,
    required: _propTypes.default.bool,
    onChange: _propTypes.default.func,
    options: _propTypes.default.object
  };
}

AltDateTimeWidget.defaultProps = _objectSpread(_objectSpread({}, _AltDateWidget.default.defaultProps), {}, {
  time: true
});
var _default = AltDateTimeWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiQWx0RGF0ZVRpbWVXaWRnZXQiLCJwcm9wcyIsIkFsdERhdGVXaWRnZXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzY2hlbWEiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiaWQiLCJzdHJpbmciLCJ2YWx1ZSIsInJlcXVpcmVkIiwiYm9vbCIsIm9uQ2hhbmdlIiwiZnVuYyIsIm9wdGlvbnMiLCJkZWZhdWx0UHJvcHMiLCJ0aW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLFNBQVNBLGlCQUFULENBQTJCQyxLQUEzQixFQUFrQztBQUNoQyxNQUFRQyxhQUFSLEdBQTBCRCxLQUFLLENBQUNFLFFBQU4sQ0FBZUMsT0FBekMsQ0FBUUYsYUFBUjtBQUNBLHNCQUFPLDZCQUFDLGFBQUQ7QUFBZSxJQUFBLElBQUk7QUFBbkIsS0FBd0JELEtBQXhCLEVBQVA7QUFDRDs7QUFFRCxJQUFJSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1AsRUFBQUEsaUJBQWlCLENBQUNRLFNBQWxCLEdBQThCO0FBQzVCQyxJQUFBQSxNQUFNLEVBQUVDLG1CQUFVQyxNQUFWLENBQWlCQyxVQURHO0FBRTVCQyxJQUFBQSxFQUFFLEVBQUVILG1CQUFVSSxNQUFWLENBQWlCRixVQUZPO0FBRzVCRyxJQUFBQSxLQUFLLEVBQUVMLG1CQUFVSSxNQUhXO0FBSTVCRSxJQUFBQSxRQUFRLEVBQUVOLG1CQUFVTyxJQUpRO0FBSzVCQyxJQUFBQSxRQUFRLEVBQUVSLG1CQUFVUyxJQUxRO0FBTTVCQyxJQUFBQSxPQUFPLEVBQUVWLG1CQUFVQztBQU5TLEdBQTlCO0FBUUQ7O0FBRURYLGlCQUFpQixDQUFDcUIsWUFBbEIsbUNBQ0tuQix1QkFBY21CLFlBRG5CO0FBRUVDLEVBQUFBLElBQUksRUFBRTtBQUZSO2VBS2V0QixpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgQWx0RGF0ZVdpZGdldCBmcm9tIFwiLi9BbHREYXRlV2lkZ2V0XCI7XHJcblxyXG5mdW5jdGlvbiBBbHREYXRlVGltZVdpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHsgQWx0RGF0ZVdpZGdldCB9ID0gcHJvcHMucmVnaXN0cnkud2lkZ2V0cztcclxuICByZXR1cm4gPEFsdERhdGVXaWRnZXQgdGltZSB7Li4ucHJvcHN9IC8+O1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQWx0RGF0ZVRpbWVXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIH07XHJcbn1cclxuXHJcbkFsdERhdGVUaW1lV2lkZ2V0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAuLi5BbHREYXRlV2lkZ2V0LmRlZmF1bHRQcm9wcyxcclxuICB0aW1lOiB0cnVlLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWx0RGF0ZVRpbWVXaWRnZXQ7XHJcbiJdfQ==