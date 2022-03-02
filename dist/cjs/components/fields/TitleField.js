"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var REQUIRED_FIELD_SYMBOL = "*";

function TitleField(props) {
  var id = props.id,
      title = props.title,
      required = props.required;
  return _react["default"].createElement("legend", {
    id: id
  }, title, required && _react["default"].createElement("span", {
    className: "required"
  }, REQUIRED_FIELD_SYMBOL));
}

if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    id: _propTypes["default"].string,
    title: _propTypes["default"].string,
    required: _propTypes["default"].bool
  };
}

var _default = TitleField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9UaXRsZUZpZWxkLmpzIl0sIm5hbWVzIjpbIlJFUVVJUkVEX0ZJRUxEX1NZTUJPTCIsIlRpdGxlRmllbGQiLCJwcm9wcyIsImlkIiwidGl0bGUiLCJyZXF1aXJlZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImJvb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQU1BLHFCQUFxQixHQUFHLEdBQTlCOztBQUVBLFNBQVNDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQUEsTUFDakJDLEVBRGlCLEdBQ09ELEtBRFAsQ0FDakJDLEVBRGlCO0FBQUEsTUFDYkMsS0FEYSxHQUNPRixLQURQLENBQ2JFLEtBRGE7QUFBQSxNQUNOQyxRQURNLEdBQ09ILEtBRFAsQ0FDTkcsUUFETTtBQUV6QixTQUNFO0FBQVEsSUFBQSxFQUFFLEVBQUVGO0FBQVosS0FDR0MsS0FESCxFQUVHQyxRQUFRLElBQUk7QUFBTSxJQUFBLFNBQVMsRUFBQztBQUFoQixLQUE0QkwscUJBQTVCLENBRmYsQ0FERjtBQU1EOztBQUVELElBQUlNLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDUCxFQUFBQSxVQUFVLENBQUNRLFNBQVgsR0FBdUI7QUFDckJOLElBQUFBLEVBQUUsRUFBRU8sc0JBQVVDLE1BRE87QUFFckJQLElBQUFBLEtBQUssRUFBRU0sc0JBQVVDLE1BRkk7QUFHckJOLElBQUFBLFFBQVEsRUFBRUssc0JBQVVFO0FBSEMsR0FBdkI7QUFLRDs7ZUFFY1gsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuY29uc3QgUkVRVUlSRURfRklFTERfU1lNQk9MID0gXCIqXCI7XHJcblxyXG5mdW5jdGlvbiBUaXRsZUZpZWxkKHByb3BzKSB7XHJcbiAgY29uc3QgeyBpZCwgdGl0bGUsIHJlcXVpcmVkIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPGxlZ2VuZCBpZD17aWR9PlxyXG4gICAgICB7dGl0bGV9XHJcbiAgICAgIHtyZXF1aXJlZCAmJiA8c3BhbiBjbGFzc05hbWU9XCJyZXF1aXJlZFwiPntSRVFVSVJFRF9GSUVMRF9TWU1CT0x9PC9zcGFuPn1cclxuICAgIDwvbGVnZW5kPlxyXG4gICk7XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBUaXRsZUZpZWxkLnByb3BUeXBlcyA9IHtcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGl0bGVGaWVsZDtcclxuIl19