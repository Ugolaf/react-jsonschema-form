"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DescriptionField(props) {
  var id = props.id,
      description = props.description;

  if (!description) {
    return null;
  }

  if (typeof description === "string") {
    return _react["default"].createElement("p", {
      id: id,
      className: "field-description"
    }, description);
  } else {
    return _react["default"].createElement("div", {
      id: id,
      className: "field-description"
    }, description);
  }
}

if (process.env.NODE_ENV !== "production") {
  DescriptionField.propTypes = {
    id: _propTypes["default"].string,
    description: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element])
  };
}

var _default = DescriptionField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9EZXNjcmlwdGlvbkZpZWxkLmpzIl0sIm5hbWVzIjpbIkRlc2NyaXB0aW9uRmllbGQiLCJwcm9wcyIsImlkIiwiZGVzY3JpcHRpb24iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJvbmVPZlR5cGUiLCJlbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxnQkFBVCxDQUEwQkMsS0FBMUIsRUFBaUM7QUFBQSxNQUN2QkMsRUFEdUIsR0FDSEQsS0FERyxDQUN2QkMsRUFEdUI7QUFBQSxNQUNuQkMsV0FEbUIsR0FDSEYsS0FERyxDQUNuQkUsV0FEbUI7O0FBRS9CLE1BQUksQ0FBQ0EsV0FBTCxFQUFrQjtBQUNoQixXQUFPLElBQVA7QUFDRDs7QUFDRCxNQUFJLE9BQU9BLFdBQVAsS0FBdUIsUUFBM0IsRUFBcUM7QUFDbkMsV0FDRTtBQUFHLE1BQUEsRUFBRSxFQUFFRCxFQUFQO0FBQVcsTUFBQSxTQUFTLEVBQUM7QUFBckIsT0FDR0MsV0FESCxDQURGO0FBS0QsR0FORCxNQU1PO0FBQ0wsV0FDRTtBQUFLLE1BQUEsRUFBRSxFQUFFRCxFQUFUO0FBQWEsTUFBQSxTQUFTLEVBQUM7QUFBdkIsT0FDR0MsV0FESCxDQURGO0FBS0Q7QUFDRjs7QUFFRCxJQUFJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q04sRUFBQUEsZ0JBQWdCLENBQUNPLFNBQWpCLEdBQTZCO0FBQzNCTCxJQUFBQSxFQUFFLEVBQUVNLHNCQUFVQyxNQURhO0FBRTNCTixJQUFBQSxXQUFXLEVBQUVLLHNCQUFVRSxTQUFWLENBQW9CLENBQUNGLHNCQUFVQyxNQUFYLEVBQW1CRCxzQkFBVUcsT0FBN0IsQ0FBcEI7QUFGYyxHQUE3QjtBQUlEOztlQUVjWCxnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZnVuY3Rpb24gRGVzY3JpcHRpb25GaWVsZChwcm9wcykge1xyXG4gIGNvbnN0IHsgaWQsIGRlc2NyaXB0aW9uIH0gPSBwcm9wcztcclxuICBpZiAoIWRlc2NyaXB0aW9uKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiBkZXNjcmlwdGlvbiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHAgaWQ9e2lkfSBjbGFzc05hbWU9XCJmaWVsZC1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgIHtkZXNjcmlwdGlvbn1cclxuICAgICAgPC9wPlxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBpZD17aWR9IGNsYXNzTmFtZT1cImZpZWxkLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAge2Rlc2NyaXB0aW9ufVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgRGVzY3JpcHRpb25GaWVsZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlc2NyaXB0aW9uRmllbGQ7XHJcbiJdfQ==