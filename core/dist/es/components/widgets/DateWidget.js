function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";

function DateWidget(props) {
  var _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return React.createElement(BaseInput, _extends({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkRhdGVXaWRnZXQiLCJwcm9wcyIsIm9uQ2hhbmdlIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0MsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFBQSxNQUV2QkMsU0FGdUIsR0FNckJELEtBTnFCLENBRXZCQyxRQUZ1QjtBQUFBLE1BSVZDLFNBSlUsR0FNckJGLEtBTnFCLENBR3ZCRyxRQUh1QixDQUlyQkMsT0FKcUIsQ0FJVkYsU0FKVTtBQU96QixTQUNFLG9CQUFDLFNBQUQ7QUFDRSxJQUFBLElBQUksRUFBQztBQURQLEtBRU1GLEtBRk47QUFHRSxJQUFBLFFBQVEsRUFBRSxrQkFBQUssS0FBSztBQUFBLGFBQUlKLFNBQVEsQ0FBQ0ksS0FBSyxJQUFJQyxTQUFWLENBQVo7QUFBQTtBQUhqQixLQURGO0FBT0Q7O0FBRUQsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNWLEVBQUFBLFVBQVUsQ0FBQ1csU0FBWCxHQUF1QjtBQUNyQkwsSUFBQUEsS0FBSyxFQUFFUCxTQUFTLENBQUNhO0FBREksR0FBdkI7QUFHRDs7QUFFRCxlQUFlWixVQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5mdW5jdGlvbiBEYXRlV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgb25DaGFuZ2UsXHJcbiAgICByZWdpc3RyeToge1xyXG4gICAgICB3aWRnZXRzOiB7IEJhc2VJbnB1dCB9LFxyXG4gICAgfSxcclxuICB9ID0gcHJvcHM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxCYXNlSW5wdXRcclxuICAgICAgdHlwZT1cImRhdGVcIlxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiBvbkNoYW5nZSh2YWx1ZSB8fCB1bmRlZmluZWQpfVxyXG4gICAgLz5cclxuICApO1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgRGF0ZVdpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXRlV2lkZ2V0O1xyXG4iXX0=