function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";

function PasswordWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/React.createElement(BaseInput, _extends({
    type: "password"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  PasswordWidget.propTypes = {
    value: PropTypes.string
  };
}

export default PasswordWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvUGFzc3dvcmRXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJQYXNzd29yZFdpZGdldCIsInByb3BzIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidmFsdWUiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0MsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7QUFDN0IsTUFBUUMsU0FBUixHQUFzQkQsS0FBSyxDQUFDRSxRQUFOLENBQWVDLE9BQXJDLENBQVFGLFNBQVI7QUFDQSxzQkFBTyxvQkFBQyxTQUFEO0FBQVcsSUFBQSxJQUFJLEVBQUM7QUFBaEIsS0FBK0JELEtBQS9CLEVBQVA7QUFDRDs7QUFFRCxJQUFJSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1AsRUFBQUEsY0FBYyxDQUFDUSxTQUFmLEdBQTJCO0FBQ3pCQyxJQUFBQSxLQUFLLEVBQUVWLFNBQVMsQ0FBQ1c7QUFEUSxHQUEzQjtBQUdEOztBQUVELGVBQWVWLGNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmZ1bmN0aW9uIFBhc3N3b3JkV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3QgeyBCYXNlSW5wdXQgfSA9IHByb3BzLnJlZ2lzdHJ5LndpZGdldHM7XHJcbiAgcmV0dXJuIDxCYXNlSW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgey4uLnByb3BzfSAvPjtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIFBhc3N3b3JkV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhc3N3b3JkV2lkZ2V0O1xyXG4iXX0=