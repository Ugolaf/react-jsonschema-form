"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DateTimeWidget(props) {
  var value = props.value,
      _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, _extends({
    type: "datetime-local"
  }, props, {
    value: (0, _utils.utcToLocal)(value),
    onChange: function onChange(value) {
      return _onChange((0, _utils.localToUTC)(value));
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateTimeWidget.propTypes = {
    value: _propTypes["default"].string
  };
}

var _default = DateTimeWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiRGF0ZVRpbWVXaWRnZXQiLCJwcm9wcyIsInZhbHVlIiwib25DaGFuZ2UiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7QUFBQSxNQUUzQkMsS0FGMkIsR0FPekJELEtBUHlCLENBRTNCQyxLQUYyQjtBQUFBLE1BRzNCQyxTQUgyQixHQU96QkYsS0FQeUIsQ0FHM0JFLFFBSDJCO0FBQUEsTUFLZEMsU0FMYyxHQU96QkgsS0FQeUIsQ0FJM0JJLFFBSjJCLENBS3pCQyxPQUx5QixDQUtkRixTQUxjO0FBUTdCLFNBQ0UsZ0NBQUMsU0FBRDtBQUNFLElBQUEsSUFBSSxFQUFDO0FBRFAsS0FFTUgsS0FGTjtBQUdFLElBQUEsS0FBSyxFQUFFLHVCQUFXQyxLQUFYLENBSFQ7QUFJRSxJQUFBLFFBQVEsRUFBRSxrQkFBQUEsS0FBSztBQUFBLGFBQUlDLFNBQVEsQ0FBQyx1QkFBV0QsS0FBWCxDQUFELENBQVo7QUFBQTtBQUpqQixLQURGO0FBUUQ7O0FBRUQsSUFBSUssT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNULEVBQUFBLGNBQWMsQ0FBQ1UsU0FBZixHQUEyQjtBQUN6QlIsSUFBQUEsS0FBSyxFQUFFUyxzQkFBVUM7QUFEUSxHQUEzQjtBQUdEOztlQUVjWixjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCB7IHV0Y1RvTG9jYWwsIGxvY2FsVG9VVEMgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuXHJcbmZ1bmN0aW9uIERhdGVUaW1lV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgdmFsdWUsXHJcbiAgICBvbkNoYW5nZSxcclxuICAgIHJlZ2lzdHJ5OiB7XHJcbiAgICAgIHdpZGdldHM6IHsgQmFzZUlucHV0IH0sXHJcbiAgICB9LFxyXG4gIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPEJhc2VJbnB1dFxyXG4gICAgICB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIlxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICAgIHZhbHVlPXt1dGNUb0xvY2FsKHZhbHVlKX1cclxuICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IG9uQ2hhbmdlKGxvY2FsVG9VVEModmFsdWUpKX1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIERhdGVUaW1lV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhdGVUaW1lV2lkZ2V0O1xyXG4iXX0=