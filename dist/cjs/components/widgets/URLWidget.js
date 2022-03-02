"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function URLWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/_react.default.createElement(BaseInput, _extends({
    type: "url"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  URLWidget.propTypes = {
    value: _propTypes.default.string
  };
}

var _default = URLWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvVVJMV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIlVSTFdpZGdldCIsInByb3BzIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidmFsdWUiLCJQcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFDeEIsTUFBUUMsU0FBUixHQUFzQkQsS0FBSyxDQUFDRSxRQUFOLENBQWVDLE9BQXJDLENBQVFGLFNBQVI7QUFDQSxzQkFBTyw2QkFBQyxTQUFEO0FBQVcsSUFBQSxJQUFJLEVBQUM7QUFBaEIsS0FBMEJELEtBQTFCLEVBQVA7QUFDRDs7QUFFRCxJQUFJSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1AsRUFBQUEsU0FBUyxDQUFDUSxTQUFWLEdBQXNCO0FBQ3BCQyxJQUFBQSxLQUFLLEVBQUVDLG1CQUFVQztBQURHLEdBQXRCO0FBR0Q7O2VBRWNYLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmZ1bmN0aW9uIFVSTFdpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHsgQmFzZUlucHV0IH0gPSBwcm9wcy5yZWdpc3RyeS53aWRnZXRzO1xyXG4gIHJldHVybiA8QmFzZUlucHV0IHR5cGU9XCJ1cmxcIiB7Li4ucHJvcHN9IC8+O1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgVVJMV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVSTFdpZGdldDtcclxuIl19