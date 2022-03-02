function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";

function EmailWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/React.createElement(BaseInput, _extends({
    type: "email"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  EmailWidget.propTypes = {
    value: PropTypes.string
  };
}

export default EmailWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRW1haWxXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJFbWFpbFdpZGdldCIsInByb3BzIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidmFsdWUiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0MsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFDMUIsTUFBUUMsU0FBUixHQUFzQkQsS0FBSyxDQUFDRSxRQUFOLENBQWVDLE9BQXJDLENBQVFGLFNBQVI7QUFDQSxzQkFBTyxvQkFBQyxTQUFEO0FBQVcsSUFBQSxJQUFJLEVBQUM7QUFBaEIsS0FBNEJELEtBQTVCLEVBQVA7QUFDRDs7QUFFRCxJQUFJSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1AsRUFBQUEsV0FBVyxDQUFDUSxTQUFaLEdBQXdCO0FBQ3RCQyxJQUFBQSxLQUFLLEVBQUVWLFNBQVMsQ0FBQ1c7QUFESyxHQUF4QjtBQUdEOztBQUVELGVBQWVWLFdBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmZ1bmN0aW9uIEVtYWlsV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3QgeyBCYXNlSW5wdXQgfSA9IHByb3BzLnJlZ2lzdHJ5LndpZGdldHM7XHJcbiAgcmV0dXJuIDxCYXNlSW5wdXQgdHlwZT1cImVtYWlsXCIgey4uLnByb3BzfSAvPjtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIEVtYWlsV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVtYWlsV2lkZ2V0O1xyXG4iXX0=