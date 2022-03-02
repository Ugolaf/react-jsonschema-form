"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function PasswordWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, _extends({
    type: "password"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  PasswordWidget.propTypes = {
    value: _propTypes["default"].string
  };
}

var _default = PasswordWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvUGFzc3dvcmRXaWRnZXQuanMiXSwibmFtZXMiOlsiUGFzc3dvcmRXaWRnZXQiLCJwcm9wcyIsIkJhc2VJbnB1dCIsInJlZ2lzdHJ5Iiwid2lkZ2V0cyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsInZhbHVlIiwiUHJvcFR5cGVzIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLGNBQVQsQ0FBd0JDLEtBQXhCLEVBQStCO0FBQUEsTUFDckJDLFNBRHFCLEdBQ1BELEtBQUssQ0FBQ0UsUUFBTixDQUFlQyxPQURSLENBQ3JCRixTQURxQjtBQUU3QixTQUFPLGdDQUFDLFNBQUQ7QUFBVyxJQUFBLElBQUksRUFBQztBQUFoQixLQUErQkQsS0FBL0IsRUFBUDtBQUNEOztBQUVELElBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDUCxFQUFBQSxjQUFjLENBQUNRLFNBQWYsR0FBMkI7QUFDekJDLElBQUFBLEtBQUssRUFBRUMsc0JBQVVDO0FBRFEsR0FBM0I7QUFHRDs7ZUFFY1gsYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZnVuY3Rpb24gUGFzc3dvcmRXaWRnZXQocHJvcHMpIHtcclxuICBjb25zdCB7IEJhc2VJbnB1dCB9ID0gcHJvcHMucmVnaXN0cnkud2lkZ2V0cztcclxuICByZXR1cm4gPEJhc2VJbnB1dCB0eXBlPVwicGFzc3dvcmRcIiB7Li4ucHJvcHN9IC8+O1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgUGFzc3dvcmRXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFzc3dvcmRXaWRnZXQ7XHJcbiJdfQ==