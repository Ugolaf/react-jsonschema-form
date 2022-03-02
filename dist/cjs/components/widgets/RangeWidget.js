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

function RangeWidget(props) {
  var schema = props.schema,
      value = props.value,
      BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "field-range-wrapper"
  }, /*#__PURE__*/_react.default.createElement(BaseInput, _extends({
    type: "range"
  }, props, (0, _utils.rangeSpec)(schema))), /*#__PURE__*/_react.default.createElement("span", {
    className: "range-view"
  }, value));
}

if (process.env.NODE_ENV !== "production") {
  RangeWidget.propTypes = {
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
  };
}

var _default = RangeWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvUmFuZ2VXaWRnZXQuanMiXSwibmFtZXMiOlsiUmFuZ2VXaWRnZXQiLCJwcm9wcyIsInNjaGVtYSIsInZhbHVlIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwic3RyaW5nIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBLFNBQVNBLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQzFCLE1BQ0VDLE1BREYsR0FNSUQsS0FOSixDQUNFQyxNQURGO0FBQUEsTUFFRUMsS0FGRixHQU1JRixLQU5KLENBRUVFLEtBRkY7QUFBQSxNQUllQyxTQUpmLEdBTUlILEtBTkosQ0FHRUksUUFIRixDQUlJQyxPQUpKLENBSWVGLFNBSmY7QUFPQSxzQkFDRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsa0JBQ0UsNkJBQUMsU0FBRDtBQUFXLElBQUEsSUFBSSxFQUFDO0FBQWhCLEtBQTRCSCxLQUE1QixFQUF1QyxzQkFBVUMsTUFBVixDQUF2QyxFQURGLGVBRUU7QUFBTSxJQUFBLFNBQVMsRUFBQztBQUFoQixLQUE4QkMsS0FBOUIsQ0FGRixDQURGO0FBTUQ7O0FBRUQsSUFBSUksT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNULEVBQUFBLFdBQVcsQ0FBQ1UsU0FBWixHQUF3QjtBQUN0QlAsSUFBQUEsS0FBSyxFQUFFUSxtQkFBVUMsU0FBVixDQUFvQixDQUFDRCxtQkFBVUUsTUFBWCxFQUFtQkYsbUJBQVVHLE1BQTdCLENBQXBCO0FBRGUsR0FBeEI7QUFHRDs7ZUFFY2QsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuaW1wb3J0IHsgcmFuZ2VTcGVjIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5mdW5jdGlvbiBSYW5nZVdpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIHNjaGVtYSxcclxuICAgIHZhbHVlLFxyXG4gICAgcmVnaXN0cnk6IHtcclxuICAgICAgd2lkZ2V0czogeyBCYXNlSW5wdXQgfSxcclxuICAgIH0sXHJcbiAgfSA9IHByb3BzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkLXJhbmdlLXdyYXBwZXJcIj5cclxuICAgICAgPEJhc2VJbnB1dCB0eXBlPVwicmFuZ2VcIiB7Li4ucHJvcHN9IHsuLi5yYW5nZVNwZWMoc2NoZW1hKX0gLz5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmFuZ2Utdmlld1wiPnt2YWx1ZX08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgUmFuZ2VXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYW5nZVdpZGdldDtcclxuIl19