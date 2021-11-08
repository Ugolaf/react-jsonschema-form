"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AddButton;

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("./IconButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function AddButton(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      disabled = _ref.disabled;
  return _react["default"].createElement("div", {
    className: "row"
  }, _react["default"].createElement("p", {
    className: "col-xs-3 col-xs-offset-9 text-right ".concat(className)
  }, _react["default"].createElement(_IconButton["default"], {
    type: "info",
    icon: "plus",
    className: "btn-add col-xs-12",
    "aria-label": "Add",
    tabIndex: "0",
    onClick: onClick,
    disabled: disabled
  })));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FkZEJ1dHRvbi5qcyJdLCJuYW1lcyI6WyJBZGRCdXR0b24iLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwiZGlzYWJsZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVlLFNBQVNBLFNBQVQsT0FBcUQ7QUFBQSxNQUFoQ0MsU0FBZ0MsUUFBaENBLFNBQWdDO0FBQUEsTUFBckJDLE9BQXFCLFFBQXJCQSxPQUFxQjtBQUFBLE1BQVpDLFFBQVksUUFBWkEsUUFBWTtBQUNsRSxTQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFO0FBQUcsSUFBQSxTQUFTLGdEQUF5Q0YsU0FBekM7QUFBWixLQUNFLGdDQUFDLHNCQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUMsTUFEUDtBQUVFLElBQUEsSUFBSSxFQUFDLE1BRlA7QUFHRSxJQUFBLFNBQVMsRUFBQyxtQkFIWjtBQUlFLGtCQUFXLEtBSmI7QUFLRSxJQUFBLFFBQVEsRUFBQyxHQUxYO0FBTUUsSUFBQSxPQUFPLEVBQUVDLE9BTlg7QUFPRSxJQUFBLFFBQVEsRUFBRUM7QUFQWixJQURGLENBREYsQ0FERjtBQWVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgSWNvbkJ1dHRvbiBmcm9tIFwiLi9JY29uQnV0dG9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBZGRCdXR0b24oeyBjbGFzc05hbWUsIG9uQ2xpY2ssIGRpc2FibGVkIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgPHAgY2xhc3NOYW1lPXtgY29sLXhzLTMgY29sLXhzLW9mZnNldC05IHRleHQtcmlnaHQgJHtjbGFzc05hbWV9YH0+XHJcbiAgICAgICAgPEljb25CdXR0b25cclxuICAgICAgICAgIHR5cGU9XCJpbmZvXCJcclxuICAgICAgICAgIGljb249XCJwbHVzXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1hZGQgY29sLXhzLTEyXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJBZGRcIlxyXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XHJcbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXX0=