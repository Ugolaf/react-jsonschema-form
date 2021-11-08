function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";

function PasswordWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return React.createElement(BaseInput, _extends({
    type: "password"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  PasswordWidget.propTypes = {
    value: PropTypes.string
  };
}

export default PasswordWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvUGFzc3dvcmRXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJQYXNzd29yZFdpZGdldCIsInByb3BzIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidmFsdWUiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0MsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7QUFBQSxNQUNyQkMsU0FEcUIsR0FDUEQsS0FBSyxDQUFDRSxRQUFOLENBQWVDLE9BRFIsQ0FDckJGLFNBRHFCO0FBRTdCLFNBQU8sb0JBQUMsU0FBRDtBQUFXLElBQUEsSUFBSSxFQUFDO0FBQWhCLEtBQStCRCxLQUEvQixFQUFQO0FBQ0Q7O0FBRUQsSUFBSUksT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNQLEVBQUFBLGNBQWMsQ0FBQ1EsU0FBZixHQUEyQjtBQUN6QkMsSUFBQUEsS0FBSyxFQUFFVixTQUFTLENBQUNXO0FBRFEsR0FBM0I7QUFHRDs7QUFFRCxlQUFlVixjQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5mdW5jdGlvbiBQYXNzd29yZFdpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHsgQmFzZUlucHV0IH0gPSBwcm9wcy5yZWdpc3RyeS53aWRnZXRzO1xyXG4gIHJldHVybiA8QmFzZUlucHV0IHR5cGU9XCJwYXNzd29yZFwiIHsuLi5wcm9wc30gLz47XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBQYXNzd29yZFdpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXNzd29yZFdpZGdldDtcclxuIl19