"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function HiddenWidget(_ref) {
  var id = _ref.id,
      value = _ref.value;
  return _react["default"].createElement("input", {
    type: "hidden",
    id: id,
    value: typeof value === "undefined" ? "" : value
  });
}

if (process.env.NODE_ENV !== "production") {
  HiddenWidget.propTypes = {
    id: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool])
  };
}

var _default = HiddenWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvSGlkZGVuV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIkhpZGRlbldpZGdldCIsImlkIiwidmFsdWUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwib25lT2ZUeXBlIiwibnVtYmVyIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsU0FBU0EsWUFBVCxPQUFxQztBQUFBLE1BQWJDLEVBQWEsUUFBYkEsRUFBYTtBQUFBLE1BQVRDLEtBQVMsUUFBVEEsS0FBUztBQUNuQyxTQUNFO0FBQ0UsSUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLElBQUEsRUFBRSxFQUFFRCxFQUZOO0FBR0UsSUFBQSxLQUFLLEVBQUUsT0FBT0MsS0FBUCxLQUFpQixXQUFqQixHQUErQixFQUEvQixHQUFvQ0E7QUFIN0MsSUFERjtBQU9EOztBQUVELElBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDTCxFQUFBQSxZQUFZLENBQUNNLFNBQWIsR0FBeUI7QUFDdkJMLElBQUFBLEVBQUUsRUFBRU0sc0JBQVVDLE1BQVYsQ0FBaUJDLFVBREU7QUFFdkJQLElBQUFBLEtBQUssRUFBRUssc0JBQVVHLFNBQVYsQ0FBb0IsQ0FDekJILHNCQUFVQyxNQURlLEVBRXpCRCxzQkFBVUksTUFGZSxFQUd6Qkosc0JBQVVLLElBSGUsQ0FBcEI7QUFGZ0IsR0FBekI7QUFRRDs7ZUFFY1osWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZnVuY3Rpb24gSGlkZGVuV2lkZ2V0KHsgaWQsIHZhbHVlIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGlucHV0XHJcbiAgICAgIHR5cGU9XCJoaWRkZW5cIlxyXG4gICAgICBpZD17aWR9XHJcbiAgICAgIHZhbHVlPXt0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogdmFsdWV9XHJcbiAgICAvPlxyXG4gICk7XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBIaWRkZW5XaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBdKSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaWRkZW5XaWRnZXQ7XHJcbiJdfQ==