"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ErrorList;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ErrorList(props) {
  var errors = props.errors;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "panel panel-danger errors"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "panel-title"
  }, "Errors")), /*#__PURE__*/_react.default.createElement("ul", {
    className: "list-group"
  }, errors.map(function (error, i) {
    return /*#__PURE__*/_react.default.createElement("li", {
      key: i,
      className: "list-group-item text-danger"
    }, error.stack);
  })));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Vycm9yTGlzdC5qcyJdLCJuYW1lcyI6WyJFcnJvckxpc3QiLCJwcm9wcyIsImVycm9ycyIsIm1hcCIsImVycm9yIiwiaSIsInN0YWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFZSxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUN2QyxNQUFRQyxNQUFSLEdBQW1CRCxLQUFuQixDQUFRQyxNQUFSO0FBQ0Esc0JBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLGtCQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixrQkFDRTtBQUFJLElBQUEsU0FBUyxFQUFDO0FBQWQsY0FERixDQURGLGVBSUU7QUFBSSxJQUFBLFNBQVMsRUFBQztBQUFkLEtBQ0dBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXLFVBQUNDLEtBQUQsRUFBUUMsQ0FBUixFQUFjO0FBQ3hCLHdCQUNFO0FBQUksTUFBQSxHQUFHLEVBQUVBLENBQVQ7QUFBWSxNQUFBLFNBQVMsRUFBQztBQUF0QixPQUNHRCxLQUFLLENBQUNFLEtBRFQsQ0FERjtBQUtELEdBTkEsQ0FESCxDQUpGLENBREY7QUFnQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFcnJvckxpc3QocHJvcHMpIHtcclxuICBjb25zdCB7IGVycm9ycyB9ID0gcHJvcHM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGFuZ2VyIGVycm9yc1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cclxuICAgICAgICA8aDMgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5FcnJvcnM8L2gzPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cclxuICAgICAgICB7ZXJyb3JzLm1hcCgoZXJyb3IsIGkpID0+IHtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsaSBrZXk9e2l9IGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSB0ZXh0LWRhbmdlclwiPlxyXG4gICAgICAgICAgICAgIHtlcnJvci5zdGFja31cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSl9XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdfQ==