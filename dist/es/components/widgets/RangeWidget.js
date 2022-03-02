function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";
import { rangeSpec } from "../../utils";

function RangeWidget(props) {
  var schema = props.schema,
      value = props.value,
      BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/React.createElement("div", {
    className: "field-range-wrapper"
  }, /*#__PURE__*/React.createElement(BaseInput, _extends({
    type: "range"
  }, props, rangeSpec(schema))), /*#__PURE__*/React.createElement("span", {
    className: "range-view"
  }, value));
}

if (process.env.NODE_ENV !== "production") {
  RangeWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
}

export default RangeWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvUmFuZ2VXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJyYW5nZVNwZWMiLCJSYW5nZVdpZGdldCIsInByb3BzIiwic2NoZW1hIiwidmFsdWUiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFFQSxTQUFTQyxTQUFULFFBQTBCLGFBQTFCOztBQUVBLFNBQVNDLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQzFCLE1BQ0VDLE1BREYsR0FNSUQsS0FOSixDQUNFQyxNQURGO0FBQUEsTUFFRUMsS0FGRixHQU1JRixLQU5KLENBRUVFLEtBRkY7QUFBQSxNQUllQyxTQUpmLEdBTUlILEtBTkosQ0FHRUksUUFIRixDQUlJQyxPQUpKLENBSWVGLFNBSmY7QUFPQSxzQkFDRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsa0JBQ0Usb0JBQUMsU0FBRDtBQUFXLElBQUEsSUFBSSxFQUFDO0FBQWhCLEtBQTRCSCxLQUE1QixFQUF1Q0YsU0FBUyxDQUFDRyxNQUFELENBQWhELEVBREYsZUFFRTtBQUFNLElBQUEsU0FBUyxFQUFDO0FBQWhCLEtBQThCQyxLQUE5QixDQUZGLENBREY7QUFNRDs7QUFFRCxJQUFJSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1QsRUFBQUEsV0FBVyxDQUFDVSxTQUFaLEdBQXdCO0FBQ3RCUCxJQUFBQSxLQUFLLEVBQUVMLFNBQVMsQ0FBQ2EsU0FBVixDQUFvQixDQUFDYixTQUFTLENBQUNjLE1BQVgsRUFBbUJkLFNBQVMsQ0FBQ2UsTUFBN0IsQ0FBcEI7QUFEZSxHQUF4QjtBQUdEOztBQUVELGVBQWViLFdBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IHJhbmdlU3BlYyB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gUmFuZ2VXaWRnZXQocHJvcHMpIHtcclxuICBjb25zdCB7XHJcbiAgICBzY2hlbWEsXHJcbiAgICB2YWx1ZSxcclxuICAgIHJlZ2lzdHJ5OiB7XHJcbiAgICAgIHdpZGdldHM6IHsgQmFzZUlucHV0IH0sXHJcbiAgICB9LFxyXG4gIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZC1yYW5nZS13cmFwcGVyXCI+XHJcbiAgICAgIDxCYXNlSW5wdXQgdHlwZT1cInJhbmdlXCIgey4uLnByb3BzfSB7Li4ucmFuZ2VTcGVjKHNjaGVtYSl9IC8+XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJhbmdlLXZpZXdcIj57dmFsdWV9PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIFJhbmdlV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFuZ2VXaWRnZXQ7XHJcbiJdfQ==