"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function UnsupportedField(_ref) {
  var schema = _ref.schema,
      idSchema = _ref.idSchema,
      reason = _ref.reason;
  return _react["default"].createElement("div", {
    className: "unsupported-field"
  }, _react["default"].createElement("p", null, "Unsupported field schema", idSchema && idSchema.$id && _react["default"].createElement("span", null, " for", " field ", _react["default"].createElement("code", null, idSchema.$id)), reason && _react["default"].createElement("em", null, ": ", reason), "."), schema && _react["default"].createElement("pre", null, JSON.stringify(schema, null, 2)));
}

if (process.env.NODE_ENV !== "production") {
  UnsupportedField.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    idSchema: _propTypes["default"].object,
    reason: _propTypes["default"].string
  };
}

var _default = UnsupportedField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9VbnN1cHBvcnRlZEZpZWxkLmpzIl0sIm5hbWVzIjpbIlVuc3VwcG9ydGVkRmllbGQiLCJzY2hlbWEiLCJpZFNjaGVtYSIsInJlYXNvbiIsIiRpZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxnQkFBVCxPQUF3RDtBQUFBLE1BQTVCQyxNQUE0QixRQUE1QkEsTUFBNEI7QUFBQSxNQUFwQkMsUUFBb0IsUUFBcEJBLFFBQW9CO0FBQUEsTUFBVkMsTUFBVSxRQUFWQSxNQUFVO0FBQ3RELFNBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0UsdUVBRUdELFFBQVEsSUFBSUEsUUFBUSxDQUFDRSxHQUFyQixJQUNDLDhDQUNHLE1BREgsYUFDaUIsOENBQU9GLFFBQVEsQ0FBQ0UsR0FBaEIsQ0FEakIsQ0FISixFQU9HRCxNQUFNLElBQUksa0RBQU9BLE1BQVAsQ0FQYixNQURGLEVBVUdGLE1BQU0sSUFBSSw2Q0FBTUksSUFBSSxDQUFDQyxTQUFMLENBQWVMLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FBTixDQVZiLENBREY7QUFjRDs7QUFFRCxJQUFJTSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1QsRUFBQUEsZ0JBQWdCLENBQUNVLFNBQWpCLEdBQTZCO0FBQzNCVCxJQUFBQSxNQUFNLEVBQUVVLHNCQUFVQyxNQUFWLENBQWlCQyxVQURFO0FBRTNCWCxJQUFBQSxRQUFRLEVBQUVTLHNCQUFVQyxNQUZPO0FBRzNCVCxJQUFBQSxNQUFNLEVBQUVRLHNCQUFVRztBQUhTLEdBQTdCO0FBS0Q7O2VBRWNkLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5mdW5jdGlvbiBVbnN1cHBvcnRlZEZpZWxkKHsgc2NoZW1hLCBpZFNjaGVtYSwgcmVhc29uIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ1bnN1cHBvcnRlZC1maWVsZFwiPlxyXG4gICAgICA8cD5cclxuICAgICAgICBVbnN1cHBvcnRlZCBmaWVsZCBzY2hlbWFcclxuICAgICAgICB7aWRTY2hlbWEgJiYgaWRTY2hlbWEuJGlkICYmIChcclxuICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICB7XCIgZm9yXCJ9IGZpZWxkIDxjb2RlPntpZFNjaGVtYS4kaWR9PC9jb2RlPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICl9XHJcbiAgICAgICAge3JlYXNvbiAmJiA8ZW0+OiB7cmVhc29ufTwvZW0+fS5cclxuICAgICAgPC9wPlxyXG4gICAgICB7c2NoZW1hICYmIDxwcmU+e0pTT04uc3RyaW5naWZ5KHNjaGVtYSwgbnVsbCwgMil9PC9wcmU+fVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIFVuc3VwcG9ydGVkRmllbGQucHJvcFR5cGVzID0ge1xyXG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBpZFNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIHJlYXNvbjogUHJvcFR5cGVzLnN0cmluZyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVbnN1cHBvcnRlZEZpZWxkO1xyXG4iXX0=