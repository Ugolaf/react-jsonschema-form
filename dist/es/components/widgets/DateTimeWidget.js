function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";
import { utcToLocal, localToUTC } from "../../utils";

function DateTimeWidget(props) {
  var value = props.value,
      _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/React.createElement(BaseInput, _extends({
    type: "datetime-local"
  }, props, {
    value: utcToLocal(value),
    onChange: function onChange(value) {
      return _onChange(localToUTC(value));
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateTimeWidget.propTypes = {
    value: PropTypes.string
  };
}

export default DateTimeWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJ1dGNUb0xvY2FsIiwibG9jYWxUb1VUQyIsIkRhdGVUaW1lV2lkZ2V0IiwicHJvcHMiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsVUFBVCxFQUFxQkMsVUFBckIsUUFBdUMsYUFBdkM7O0FBRUEsU0FBU0MsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7QUFDN0IsTUFDRUMsS0FERixHQU1JRCxLQU5KLENBQ0VDLEtBREY7QUFBQSxNQUVFQyxTQUZGLEdBTUlGLEtBTkosQ0FFRUUsUUFGRjtBQUFBLE1BSWVDLFNBSmYsR0FNSUgsS0FOSixDQUdFSSxRQUhGLENBSUlDLE9BSkosQ0FJZUYsU0FKZjtBQU9BLHNCQUNFLG9CQUFDLFNBQUQ7QUFDRSxJQUFBLElBQUksRUFBQztBQURQLEtBRU1ILEtBRk47QUFHRSxJQUFBLEtBQUssRUFBRUgsVUFBVSxDQUFDSSxLQUFELENBSG5CO0FBSUUsSUFBQSxRQUFRLEVBQUUsa0JBQUFBLEtBQUs7QUFBQSxhQUFJQyxTQUFRLENBQUNKLFVBQVUsQ0FBQ0csS0FBRCxDQUFYLENBQVo7QUFBQTtBQUpqQixLQURGO0FBUUQ7O0FBRUQsSUFBSUssT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNULEVBQUFBLGNBQWMsQ0FBQ1UsU0FBZixHQUEyQjtBQUN6QlIsSUFBQUEsS0FBSyxFQUFFTCxTQUFTLENBQUNjO0FBRFEsR0FBM0I7QUFHRDs7QUFFRCxlQUFlWCxjQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCB7IHV0Y1RvTG9jYWwsIGxvY2FsVG9VVEMgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuXHJcbmZ1bmN0aW9uIERhdGVUaW1lV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgdmFsdWUsXHJcbiAgICBvbkNoYW5nZSxcclxuICAgIHJlZ2lzdHJ5OiB7XHJcbiAgICAgIHdpZGdldHM6IHsgQmFzZUlucHV0IH0sXHJcbiAgICB9LFxyXG4gIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPEJhc2VJbnB1dFxyXG4gICAgICB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIlxyXG4gICAgICB7Li4ucHJvcHN9XHJcbiAgICAgIHZhbHVlPXt1dGNUb0xvY2FsKHZhbHVlKX1cclxuICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IG9uQ2hhbmdlKGxvY2FsVG9VVEModmFsdWUpKX1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIERhdGVUaW1lV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhdGVUaW1lV2lkZ2V0O1xyXG4iXX0=