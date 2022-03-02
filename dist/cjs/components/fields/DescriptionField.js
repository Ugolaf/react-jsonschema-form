"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DescriptionField(props) {
  var id = props.id,
      description = props.description;

  if (!description) {
    return null;
  }

  if (typeof description === "string") {
    return /*#__PURE__*/_react.default.createElement("p", {
      id: id,
      className: "field-description"
    }, description);
  } else {
    return /*#__PURE__*/_react.default.createElement("div", {
      id: id,
      className: "field-description"
    }, description);
  }
}

if (process.env.NODE_ENV !== "production") {
  DescriptionField.propTypes = {
    id: _propTypes.default.string,
    description: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element])
  };
}

var _default = DescriptionField;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9EZXNjcmlwdGlvbkZpZWxkLmpzIl0sIm5hbWVzIjpbIkRlc2NyaXB0aW9uRmllbGQiLCJwcm9wcyIsImlkIiwiZGVzY3JpcHRpb24iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJvbmVPZlR5cGUiLCJlbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxnQkFBVCxDQUEwQkMsS0FBMUIsRUFBaUM7QUFDL0IsTUFBUUMsRUFBUixHQUE0QkQsS0FBNUIsQ0FBUUMsRUFBUjtBQUFBLE1BQVlDLFdBQVosR0FBNEJGLEtBQTVCLENBQVlFLFdBQVo7O0FBQ0EsTUFBSSxDQUFDQSxXQUFMLEVBQWtCO0FBQ2hCLFdBQU8sSUFBUDtBQUNEOztBQUNELE1BQUksT0FBT0EsV0FBUCxLQUF1QixRQUEzQixFQUFxQztBQUNuQyx3QkFDRTtBQUFHLE1BQUEsRUFBRSxFQUFFRCxFQUFQO0FBQVcsTUFBQSxTQUFTLEVBQUM7QUFBckIsT0FDR0MsV0FESCxDQURGO0FBS0QsR0FORCxNQU1PO0FBQ0wsd0JBQ0U7QUFBSyxNQUFBLEVBQUUsRUFBRUQsRUFBVDtBQUFhLE1BQUEsU0FBUyxFQUFDO0FBQXZCLE9BQ0dDLFdBREgsQ0FERjtBQUtEO0FBQ0Y7O0FBRUQsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNOLEVBQUFBLGdCQUFnQixDQUFDTyxTQUFqQixHQUE2QjtBQUMzQkwsSUFBQUEsRUFBRSxFQUFFTSxtQkFBVUMsTUFEYTtBQUUzQk4sSUFBQUEsV0FBVyxFQUFFSyxtQkFBVUUsU0FBVixDQUFvQixDQUFDRixtQkFBVUMsTUFBWCxFQUFtQkQsbUJBQVVHLE9BQTdCLENBQXBCO0FBRmMsR0FBN0I7QUFJRDs7ZUFFY1gsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmZ1bmN0aW9uIERlc2NyaXB0aW9uRmllbGQocHJvcHMpIHtcclxuICBjb25zdCB7IGlkLCBkZXNjcmlwdGlvbiB9ID0gcHJvcHM7XHJcbiAgaWYgKCFkZXNjcmlwdGlvbikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgZGVzY3JpcHRpb24gPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxwIGlkPXtpZH0gY2xhc3NOYW1lPVwiZmllbGQtZGVzY3JpcHRpb25cIj5cclxuICAgICAgICB7ZGVzY3JpcHRpb259XHJcbiAgICAgIDwvcD5cclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgaWQ9e2lkfSBjbGFzc05hbWU9XCJmaWVsZC1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgIHtkZXNjcmlwdGlvbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIERlc2NyaXB0aW9uRmllbGQucHJvcFR5cGVzID0ge1xyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXNjcmlwdGlvbkZpZWxkO1xyXG4iXX0=