function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";
import AltDateWidget from "./AltDateWidget";

function AltDateTimeWidget(props) {
  var AltDateWidget = props.registry.widgets.AltDateWidget;
  return /*#__PURE__*/React.createElement(AltDateWidget, _extends({
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

AltDateTimeWidget.defaultProps = _objectSpread(_objectSpread({}, AltDateWidget.defaultProps), {}, {
  time: true
});
export default AltDateTimeWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJBbHREYXRlV2lkZ2V0IiwiQWx0RGF0ZVRpbWVXaWRnZXQiLCJwcm9wcyIsInJlZ2lzdHJ5Iiwid2lkZ2V0cyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsInNjaGVtYSIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJpZCIsInN0cmluZyIsInZhbHVlIiwicmVxdWlyZWQiLCJib29sIiwib25DaGFuZ2UiLCJmdW5jIiwib3B0aW9ucyIsImRlZmF1bHRQcm9wcyIsInRpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLGlCQUExQjs7QUFFQSxTQUFTQyxpQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0M7QUFDaEMsTUFBUUYsYUFBUixHQUEwQkUsS0FBSyxDQUFDQyxRQUFOLENBQWVDLE9BQXpDLENBQVFKLGFBQVI7QUFDQSxzQkFBTyxvQkFBQyxhQUFEO0FBQWUsSUFBQSxJQUFJO0FBQW5CLEtBQXdCRSxLQUF4QixFQUFQO0FBQ0Q7O0FBRUQsSUFBSUcsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNOLEVBQUFBLGlCQUFpQixDQUFDTyxTQUFsQixHQUE4QjtBQUM1QkMsSUFBQUEsTUFBTSxFQUFFVixTQUFTLENBQUNXLE1BQVYsQ0FBaUJDLFVBREc7QUFFNUJDLElBQUFBLEVBQUUsRUFBRWIsU0FBUyxDQUFDYyxNQUFWLENBQWlCRixVQUZPO0FBRzVCRyxJQUFBQSxLQUFLLEVBQUVmLFNBQVMsQ0FBQ2MsTUFIVztBQUk1QkUsSUFBQUEsUUFBUSxFQUFFaEIsU0FBUyxDQUFDaUIsSUFKUTtBQUs1QkMsSUFBQUEsUUFBUSxFQUFFbEIsU0FBUyxDQUFDbUIsSUFMUTtBQU01QkMsSUFBQUEsT0FBTyxFQUFFcEIsU0FBUyxDQUFDVztBQU5TLEdBQTlCO0FBUUQ7O0FBRURULGlCQUFpQixDQUFDbUIsWUFBbEIsbUNBQ0twQixhQUFhLENBQUNvQixZQURuQjtBQUVFQyxFQUFBQSxJQUFJLEVBQUU7QUFGUjtBQUtBLGVBQWVwQixpQkFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgQWx0RGF0ZVdpZGdldCBmcm9tIFwiLi9BbHREYXRlV2lkZ2V0XCI7XHJcblxyXG5mdW5jdGlvbiBBbHREYXRlVGltZVdpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHsgQWx0RGF0ZVdpZGdldCB9ID0gcHJvcHMucmVnaXN0cnkud2lkZ2V0cztcclxuICByZXR1cm4gPEFsdERhdGVXaWRnZXQgdGltZSB7Li4ucHJvcHN9IC8+O1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQWx0RGF0ZVRpbWVXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIH07XHJcbn1cclxuXHJcbkFsdERhdGVUaW1lV2lkZ2V0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAuLi5BbHREYXRlV2lkZ2V0LmRlZmF1bHRQcm9wcyxcclxuICB0aW1lOiB0cnVlLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWx0RGF0ZVRpbWVXaWRnZXQ7XHJcbiJdfQ==