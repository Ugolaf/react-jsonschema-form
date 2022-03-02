"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUIRED_FIELD_SYMBOL = "*";

function TitleField(props) {
  var id = props.id,
      title = props.title,
      required = props.required;
  return /*#__PURE__*/_react.default.createElement("legend", {
    id: id
  }, title, required && /*#__PURE__*/_react.default.createElement("span", {
    className: "required"
  }, REQUIRED_FIELD_SYMBOL));
}

if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    id: _propTypes.default.string,
    title: _propTypes.default.string,
    required: _propTypes.default.bool
  };
}

var _default = TitleField;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9UaXRsZUZpZWxkLmpzIl0sIm5hbWVzIjpbIlJFUVVJUkVEX0ZJRUxEX1NZTUJPTCIsIlRpdGxlRmllbGQiLCJwcm9wcyIsImlkIiwidGl0bGUiLCJyZXF1aXJlZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImJvb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQU1BLHFCQUFxQixHQUFHLEdBQTlCOztBQUVBLFNBQVNDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQ3pCLE1BQVFDLEVBQVIsR0FBZ0NELEtBQWhDLENBQVFDLEVBQVI7QUFBQSxNQUFZQyxLQUFaLEdBQWdDRixLQUFoQyxDQUFZRSxLQUFaO0FBQUEsTUFBbUJDLFFBQW5CLEdBQWdDSCxLQUFoQyxDQUFtQkcsUUFBbkI7QUFDQSxzQkFDRTtBQUFRLElBQUEsRUFBRSxFQUFFRjtBQUFaLEtBQ0dDLEtBREgsRUFFR0MsUUFBUSxpQkFBSTtBQUFNLElBQUEsU0FBUyxFQUFDO0FBQWhCLEtBQTRCTCxxQkFBNUIsQ0FGZixDQURGO0FBTUQ7O0FBRUQsSUFBSU0sT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNQLEVBQUFBLFVBQVUsQ0FBQ1EsU0FBWCxHQUF1QjtBQUNyQk4sSUFBQUEsRUFBRSxFQUFFTyxtQkFBVUMsTUFETztBQUVyQlAsSUFBQUEsS0FBSyxFQUFFTSxtQkFBVUMsTUFGSTtBQUdyQk4sSUFBQUEsUUFBUSxFQUFFSyxtQkFBVUU7QUFIQyxHQUF2QjtBQUtEOztlQUVjWCxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5jb25zdCBSRVFVSVJFRF9GSUVMRF9TWU1CT0wgPSBcIipcIjtcclxuXHJcbmZ1bmN0aW9uIFRpdGxlRmllbGQocHJvcHMpIHtcclxuICBjb25zdCB7IGlkLCB0aXRsZSwgcmVxdWlyZWQgfSA9IHByb3BzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8bGVnZW5kIGlkPXtpZH0+XHJcbiAgICAgIHt0aXRsZX1cclxuICAgICAge3JlcXVpcmVkICYmIDxzcGFuIGNsYXNzTmFtZT1cInJlcXVpcmVkXCI+e1JFUVVJUkVEX0ZJRUxEX1NZTUJPTH08L3NwYW4+fVxyXG4gICAgPC9sZWdlbmQ+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIFRpdGxlRmllbGQucHJvcFR5cGVzID0ge1xyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaXRsZUZpZWxkO1xyXG4iXX0=