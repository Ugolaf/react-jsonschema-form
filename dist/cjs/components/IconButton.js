"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconButton;

var _react = _interopRequireDefault(require("react"));

var _excluded = ["type", "icon", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function IconButton(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? "default" : _props$type,
      icon = props.icon,
      className = props.className,
      otherProps = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/_react.default.createElement("button", _extends({
    type: "button",
    className: "btn btn-".concat(type, " ").concat(className)
  }, otherProps), /*#__PURE__*/_react.default.createElement("i", {
    className: "glyphicon glyphicon-".concat(icon)
  }));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0ljb25CdXR0b24uanMiXSwibmFtZXMiOlsiSWNvbkJ1dHRvbiIsInByb3BzIiwidHlwZSIsImljb24iLCJjbGFzc05hbWUiLCJvdGhlclByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVlLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQ3hDLG9CQUE2REEsS0FBN0QsQ0FBUUMsSUFBUjtBQUFBLE1BQVFBLElBQVIsNEJBQWUsU0FBZjtBQUFBLE1BQTBCQyxJQUExQixHQUE2REYsS0FBN0QsQ0FBMEJFLElBQTFCO0FBQUEsTUFBZ0NDLFNBQWhDLEdBQTZESCxLQUE3RCxDQUFnQ0csU0FBaEM7QUFBQSxNQUE4Q0MsVUFBOUMsNEJBQTZESixLQUE3RDs7QUFDQSxzQkFDRTtBQUNFLElBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxJQUFBLFNBQVMsb0JBQWFDLElBQWIsY0FBcUJFLFNBQXJCO0FBRlgsS0FHTUMsVUFITixnQkFJRTtBQUFHLElBQUEsU0FBUyxnQ0FBeUJGLElBQXpCO0FBQVosSUFKRixDQURGO0FBUUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJY29uQnV0dG9uKHByb3BzKSB7XHJcbiAgY29uc3QgeyB0eXBlID0gXCJkZWZhdWx0XCIsIGljb24sIGNsYXNzTmFtZSwgLi4ub3RoZXJQcm9wcyB9ID0gcHJvcHM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tJHt0eXBlfSAke2NsYXNzTmFtZX1gfVxyXG4gICAgICB7Li4ub3RoZXJQcm9wc30+XHJcbiAgICAgIDxpIGNsYXNzTmFtZT17YGdseXBoaWNvbiBnbHlwaGljb24tJHtpY29ufWB9IC8+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59XHJcbiJdfQ==