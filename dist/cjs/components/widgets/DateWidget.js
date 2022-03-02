"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DateWidget(props) {
  var _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/_react.default.createElement(BaseInput, _extends({
    type: "date"
  }, props, {
    onChange: function onChange(value) {
      return _onChange(value || undefined);
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateWidget.propTypes = {
    value: _propTypes.default.string
  };
}

var _default = DateWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJEYXRlV2lkZ2V0IiwicHJvcHMiLCJvbkNoYW5nZSIsIkJhc2VJbnB1dCIsInJlZ2lzdHJ5Iiwid2lkZ2V0cyIsInZhbHVlIiwidW5kZWZpbmVkIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQ3pCLE1BQ0VDLFNBREYsR0FLSUQsS0FMSixDQUNFQyxRQURGO0FBQUEsTUFHZUMsU0FIZixHQUtJRixLQUxKLENBRUVHLFFBRkYsQ0FHSUMsT0FISixDQUdlRixTQUhmO0FBTUEsc0JBQ0UsNkJBQUMsU0FBRDtBQUNFLElBQUEsSUFBSSxFQUFDO0FBRFAsS0FFTUYsS0FGTjtBQUdFLElBQUEsUUFBUSxFQUFFLGtCQUFBSyxLQUFLO0FBQUEsYUFBSUosU0FBUSxDQUFDSSxLQUFLLElBQUlDLFNBQVYsQ0FBWjtBQUFBO0FBSGpCLEtBREY7QUFPRDs7QUFFRCxJQUFJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1YsRUFBQUEsVUFBVSxDQUFDVyxTQUFYLEdBQXVCO0FBQ3JCTCxJQUFBQSxLQUFLLEVBQUVNLG1CQUFVQztBQURJLEdBQXZCO0FBR0Q7O2VBRWNiLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmZ1bmN0aW9uIERhdGVXaWRnZXQocHJvcHMpIHtcclxuICBjb25zdCB7XHJcbiAgICBvbkNoYW5nZSxcclxuICAgIHJlZ2lzdHJ5OiB7XHJcbiAgICAgIHdpZGdldHM6IHsgQmFzZUlucHV0IH0sXHJcbiAgICB9LFxyXG4gIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPEJhc2VJbnB1dFxyXG4gICAgICB0eXBlPVwiZGF0ZVwiXHJcbiAgICAgIHsuLi5wcm9wc31cclxuICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IG9uQ2hhbmdlKHZhbHVlIHx8IHVuZGVmaW5lZCl9XHJcbiAgICAvPlxyXG4gICk7XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBEYXRlV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhdGVXaWRnZXQ7XHJcbiJdfQ==