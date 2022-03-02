function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";

function DateWidget(props) {
  var _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/React.createElement(BaseInput, _extends({
    type: "date"
  }, props, {
    onChange: function onChange(value) {
      return _onChange(value || undefined);
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateWidget.propTypes = {
    value: PropTypes.string
  };
}

export default DateWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkRhdGVXaWRnZXQiLCJwcm9wcyIsIm9uQ2hhbmdlIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0MsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFDekIsTUFDRUMsU0FERixHQUtJRCxLQUxKLENBQ0VDLFFBREY7QUFBQSxNQUdlQyxTQUhmLEdBS0lGLEtBTEosQ0FFRUcsUUFGRixDQUdJQyxPQUhKLENBR2VGLFNBSGY7QUFNQSxzQkFDRSxvQkFBQyxTQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUM7QUFEUCxLQUVNRixLQUZOO0FBR0UsSUFBQSxRQUFRLEVBQUUsa0JBQUFLLEtBQUs7QUFBQSxhQUFJSixTQUFRLENBQUNJLEtBQUssSUFBSUMsU0FBVixDQUFaO0FBQUE7QUFIakIsS0FERjtBQU9EOztBQUVELElBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDVixFQUFBQSxVQUFVLENBQUNXLFNBQVgsR0FBdUI7QUFDckJMLElBQUFBLEtBQUssRUFBRVAsU0FBUyxDQUFDYTtBQURJLEdBQXZCO0FBR0Q7O0FBRUQsZUFBZVosVUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZnVuY3Rpb24gRGF0ZVdpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIG9uQ2hhbmdlLFxyXG4gICAgcmVnaXN0cnk6IHtcclxuICAgICAgd2lkZ2V0czogeyBCYXNlSW5wdXQgfSxcclxuICAgIH0sXHJcbiAgfSA9IHByb3BzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8QmFzZUlucHV0XHJcbiAgICAgIHR5cGU9XCJkYXRlXCJcclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgICBvbkNoYW5nZT17dmFsdWUgPT4gb25DaGFuZ2UodmFsdWUgfHwgdW5kZWZpbmVkKX1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIERhdGVXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGF0ZVdpZGdldDtcclxuIl19