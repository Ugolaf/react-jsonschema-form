"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ColorWidget(props) {
  var disabled = props.disabled,
      readonly = props.readonly,
      BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, _extends({
    type: "color"
  }, props, {
    disabled: disabled || readonly
  }));
}

if (process.env.NODE_ENV !== "production") {
  ColorWidget.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    id: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].string,
    required: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    autofocus: _propTypes["default"].bool,
    onChange: _propTypes["default"].func
  };
}

var _default = ColorWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQ29sb3JXaWRnZXQuanMiXSwibmFtZXMiOlsiQ29sb3JXaWRnZXQiLCJwcm9wcyIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzY2hlbWEiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiaWQiLCJzdHJpbmciLCJ2YWx1ZSIsInJlcXVpcmVkIiwiYm9vbCIsImF1dG9mb2N1cyIsIm9uQ2hhbmdlIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUFBLE1BRXhCQyxRQUZ3QixHQU90QkQsS0FQc0IsQ0FFeEJDLFFBRndCO0FBQUEsTUFHeEJDLFFBSHdCLEdBT3RCRixLQVBzQixDQUd4QkUsUUFId0I7QUFBQSxNQUtYQyxTQUxXLEdBT3RCSCxLQVBzQixDQUl4QkksUUFKd0IsQ0FLdEJDLE9BTHNCLENBS1hGLFNBTFc7QUFRMUIsU0FBTyxnQ0FBQyxTQUFEO0FBQVcsSUFBQSxJQUFJLEVBQUM7QUFBaEIsS0FBNEJILEtBQTVCO0FBQW1DLElBQUEsUUFBUSxFQUFFQyxRQUFRLElBQUlDO0FBQXpELEtBQVA7QUFDRDs7QUFFRCxJQUFJSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1QsRUFBQUEsV0FBVyxDQUFDVSxTQUFaLEdBQXdCO0FBQ3RCQyxJQUFBQSxNQUFNLEVBQUVDLHNCQUFVQyxNQUFWLENBQWlCQyxVQURIO0FBRXRCQyxJQUFBQSxFQUFFLEVBQUVILHNCQUFVSSxNQUFWLENBQWlCRixVQUZDO0FBR3RCRyxJQUFBQSxLQUFLLEVBQUVMLHNCQUFVSSxNQUhLO0FBSXRCRSxJQUFBQSxRQUFRLEVBQUVOLHNCQUFVTyxJQUpFO0FBS3RCakIsSUFBQUEsUUFBUSxFQUFFVSxzQkFBVU8sSUFMRTtBQU10QmhCLElBQUFBLFFBQVEsRUFBRVMsc0JBQVVPLElBTkU7QUFPdEJDLElBQUFBLFNBQVMsRUFBRVIsc0JBQVVPLElBUEM7QUFRdEJFLElBQUFBLFFBQVEsRUFBRVQsc0JBQVVVO0FBUkUsR0FBeEI7QUFVRDs7ZUFFY3RCLFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmZ1bmN0aW9uIENvbG9yV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgZGlzYWJsZWQsXHJcbiAgICByZWFkb25seSxcclxuICAgIHJlZ2lzdHJ5OiB7XHJcbiAgICAgIHdpZGdldHM6IHsgQmFzZUlucHV0IH0sXHJcbiAgICB9LFxyXG4gIH0gPSBwcm9wcztcclxuICByZXR1cm4gPEJhc2VJbnB1dCB0eXBlPVwiY29sb3JcIiB7Li4ucHJvcHN9IGRpc2FibGVkPXtkaXNhYmxlZCB8fCByZWFkb25seX0gLz47XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBDb2xvcldpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGF1dG9mb2N1czogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29sb3JXaWRnZXQ7XHJcbiJdfQ==