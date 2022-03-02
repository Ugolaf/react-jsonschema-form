"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HiddenWidget(_ref) {
  var id = _ref.id,
      value = _ref.value;
  return /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    id: id,
    value: typeof value === "undefined" ? "" : value
  });
}

if (process.env.NODE_ENV !== "production") {
  HiddenWidget.propTypes = {
    id: _propTypes.default.string.isRequired,
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool])
  };
}

var _default = HiddenWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvSGlkZGVuV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIkhpZGRlbldpZGdldCIsImlkIiwidmFsdWUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwib25lT2ZUeXBlIiwibnVtYmVyIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsU0FBU0EsWUFBVCxPQUFxQztBQUFBLE1BQWJDLEVBQWEsUUFBYkEsRUFBYTtBQUFBLE1BQVRDLEtBQVMsUUFBVEEsS0FBUztBQUNuQyxzQkFDRTtBQUNFLElBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxJQUFBLEVBQUUsRUFBRUQsRUFGTjtBQUdFLElBQUEsS0FBSyxFQUFFLE9BQU9DLEtBQVAsS0FBaUIsV0FBakIsR0FBK0IsRUFBL0IsR0FBb0NBO0FBSDdDLElBREY7QUFPRDs7QUFFRCxJQUFJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q0wsRUFBQUEsWUFBWSxDQUFDTSxTQUFiLEdBQXlCO0FBQ3ZCTCxJQUFBQSxFQUFFLEVBQUVNLG1CQUFVQyxNQUFWLENBQWlCQyxVQURFO0FBRXZCUCxJQUFBQSxLQUFLLEVBQUVLLG1CQUFVRyxTQUFWLENBQW9CLENBQ3pCSCxtQkFBVUMsTUFEZSxFQUV6QkQsbUJBQVVJLE1BRmUsRUFHekJKLG1CQUFVSyxJQUhlLENBQXBCO0FBRmdCLEdBQXpCO0FBUUQ7O2VBRWNaLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmZ1bmN0aW9uIEhpZGRlbldpZGdldCh7IGlkLCB2YWx1ZSB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxpbnB1dFxyXG4gICAgICB0eXBlPVwiaGlkZGVuXCJcclxuICAgICAgaWQ9e2lkfVxyXG4gICAgICB2YWx1ZT17dHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiID8gXCJcIiA6IHZhbHVlfVxyXG4gICAgLz5cclxuICApO1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgSGlkZGVuV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgIFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgIFByb3BUeXBlcy5ib29sLFxyXG4gICAgXSksXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGlkZGVuV2lkZ2V0O1xyXG4iXX0=