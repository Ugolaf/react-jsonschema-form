"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function URLWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, _extends({
    type: "url"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  URLWidget.propTypes = {
    value: _propTypes["default"].string
  };
}

var _default = URLWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvVVJMV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIlVSTFdpZGdldCIsInByb3BzIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidmFsdWUiLCJQcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFBQSxNQUNoQkMsU0FEZ0IsR0FDRkQsS0FBSyxDQUFDRSxRQUFOLENBQWVDLE9BRGIsQ0FDaEJGLFNBRGdCO0FBRXhCLFNBQU8sZ0NBQUMsU0FBRDtBQUFXLElBQUEsSUFBSSxFQUFDO0FBQWhCLEtBQTBCRCxLQUExQixFQUFQO0FBQ0Q7O0FBRUQsSUFBSUksT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNQLEVBQUFBLFNBQVMsQ0FBQ1EsU0FBVixHQUFzQjtBQUNwQkMsSUFBQUEsS0FBSyxFQUFFQyxzQkFBVUM7QUFERyxHQUF0QjtBQUdEOztlQUVjWCxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5mdW5jdGlvbiBVUkxXaWRnZXQocHJvcHMpIHtcclxuICBjb25zdCB7IEJhc2VJbnB1dCB9ID0gcHJvcHMucmVnaXN0cnkud2lkZ2V0cztcclxuICByZXR1cm4gPEJhc2VJbnB1dCB0eXBlPVwidXJsXCIgey4uLnByb3BzfSAvPjtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIFVSTFdpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVUkxXaWRnZXQ7XHJcbiJdfQ==