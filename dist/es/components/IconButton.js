var _excluded = ["type", "icon", "className"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
export default function IconButton(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? "default" : _props$type,
      icon = props.icon,
      className = props.className,
      otherProps = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: "btn btn-".concat(type, " ").concat(className)
  }, otherProps), /*#__PURE__*/React.createElement("i", {
    className: "glyphicon glyphicon-".concat(icon)
  }));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0ljb25CdXR0b24uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJJY29uQnV0dG9uIiwicHJvcHMiLCJ0eXBlIiwiaWNvbiIsImNsYXNzTmFtZSIsIm90aGVyUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUVBLGVBQWUsU0FBU0MsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFDeEMsb0JBQTZEQSxLQUE3RCxDQUFRQyxJQUFSO0FBQUEsTUFBUUEsSUFBUiw0QkFBZSxTQUFmO0FBQUEsTUFBMEJDLElBQTFCLEdBQTZERixLQUE3RCxDQUEwQkUsSUFBMUI7QUFBQSxNQUFnQ0MsU0FBaEMsR0FBNkRILEtBQTdELENBQWdDRyxTQUFoQztBQUFBLE1BQThDQyxVQUE5Qyw0QkFBNkRKLEtBQTdEOztBQUNBLHNCQUNFO0FBQ0UsSUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLElBQUEsU0FBUyxvQkFBYUMsSUFBYixjQUFxQkUsU0FBckI7QUFGWCxLQUdNQyxVQUhOLGdCQUlFO0FBQUcsSUFBQSxTQUFTLGdDQUF5QkYsSUFBekI7QUFBWixJQUpGLENBREY7QUFRRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEljb25CdXR0b24ocHJvcHMpIHtcclxuICBjb25zdCB7IHR5cGUgPSBcImRlZmF1bHRcIiwgaWNvbiwgY2xhc3NOYW1lLCAuLi5vdGhlclByb3BzIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi0ke3R5cGV9ICR7Y2xhc3NOYW1lfWB9XHJcbiAgICAgIHsuLi5vdGhlclByb3BzfT5cclxuICAgICAgPGkgY2xhc3NOYW1lPXtgZ2x5cGhpY29uIGdseXBoaWNvbi0ke2ljb259YH0gLz5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn1cclxuIl19