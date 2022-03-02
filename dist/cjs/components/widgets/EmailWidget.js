"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function EmailWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/_react.default.createElement(BaseInput, _extends({
    type: "email"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  EmailWidget.propTypes = {
    value: _propTypes.default.string
  };
}

var _default = EmailWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRW1haWxXaWRnZXQuanMiXSwibmFtZXMiOlsiRW1haWxXaWRnZXQiLCJwcm9wcyIsIkJhc2VJbnB1dCIsInJlZ2lzdHJ5Iiwid2lkZ2V0cyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsInZhbHVlIiwiUHJvcFR5cGVzIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQzFCLE1BQVFDLFNBQVIsR0FBc0JELEtBQUssQ0FBQ0UsUUFBTixDQUFlQyxPQUFyQyxDQUFRRixTQUFSO0FBQ0Esc0JBQU8sNkJBQUMsU0FBRDtBQUFXLElBQUEsSUFBSSxFQUFDO0FBQWhCLEtBQTRCRCxLQUE1QixFQUFQO0FBQ0Q7O0FBRUQsSUFBSUksT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNQLEVBQUFBLFdBQVcsQ0FBQ1EsU0FBWixHQUF3QjtBQUN0QkMsSUFBQUEsS0FBSyxFQUFFQyxtQkFBVUM7QUFESyxHQUF4QjtBQUdEOztlQUVjWCxXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5mdW5jdGlvbiBFbWFpbFdpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHsgQmFzZUlucHV0IH0gPSBwcm9wcy5yZWdpc3RyeS53aWRnZXRzO1xyXG4gIHJldHVybiA8QmFzZUlucHV0IHR5cGU9XCJlbWFpbFwiIHsuLi5wcm9wc30gLz47XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBFbWFpbFdpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbWFpbFdpZGdldDtcclxuIl19