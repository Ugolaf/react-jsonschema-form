"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function withTheme(themeProps) {
  return (0, _react.forwardRef)(function (_ref, ref) {
    var fields = _ref.fields,
        widgets = _ref.widgets,
        directProps = _objectWithoutProperties(_ref, ["fields", "widgets"]);

    fields = _objectSpread({}, themeProps.fields, fields);
    widgets = _objectSpread({}, themeProps.widgets, widgets);
    return _react["default"].createElement(_["default"], _extends({}, themeProps, directProps, {
      fields: fields,
      widgets: widgets,
      ref: ref
    }));
  });
}

withTheme.propTypes = {
  widgets: _propTypes["default"].object,
  fields: _propTypes["default"].object
};
var _default = withTheme;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93aXRoVGhlbWUuanMiXSwibmFtZXMiOlsid2l0aFRoZW1lIiwidGhlbWVQcm9wcyIsInJlZiIsImZpZWxkcyIsIndpZGdldHMiLCJkaXJlY3RQcm9wcyIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsU0FBVCxDQUFtQkMsVUFBbkIsRUFBK0I7QUFDN0IsU0FBTyx1QkFBVyxnQkFBc0NDLEdBQXRDLEVBQThDO0FBQUEsUUFBM0NDLE1BQTJDLFFBQTNDQSxNQUEyQztBQUFBLFFBQW5DQyxPQUFtQyxRQUFuQ0EsT0FBbUM7QUFBQSxRQUF2QkMsV0FBdUI7O0FBQzlERixJQUFBQSxNQUFNLHFCQUFRRixVQUFVLENBQUNFLE1BQW5CLEVBQThCQSxNQUE5QixDQUFOO0FBQ0FDLElBQUFBLE9BQU8scUJBQVFILFVBQVUsQ0FBQ0csT0FBbkIsRUFBK0JBLE9BQS9CLENBQVA7QUFFQSxXQUNFLGdDQUFDLFlBQUQsZUFDTUgsVUFETixFQUVNSSxXQUZOO0FBR0UsTUFBQSxNQUFNLEVBQUVGLE1BSFY7QUFJRSxNQUFBLE9BQU8sRUFBRUMsT0FKWDtBQUtFLE1BQUEsR0FBRyxFQUFFRjtBQUxQLE9BREY7QUFTRCxHQWJNLENBQVA7QUFjRDs7QUFFREYsU0FBUyxDQUFDTSxTQUFWLEdBQXNCO0FBQ3BCRixFQUFBQSxPQUFPLEVBQUVHLHNCQUFVQyxNQURDO0FBRXBCTCxFQUFBQSxNQUFNLEVBQUVJLHNCQUFVQztBQUZFLENBQXRCO2VBS2VSLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBGb3JtIGZyb20gXCIuL1wiO1xyXG5cclxuZnVuY3Rpb24gd2l0aFRoZW1lKHRoZW1lUHJvcHMpIHtcclxuICByZXR1cm4gZm9yd2FyZFJlZigoeyBmaWVsZHMsIHdpZGdldHMsIC4uLmRpcmVjdFByb3BzIH0sIHJlZikgPT4ge1xyXG4gICAgZmllbGRzID0geyAuLi50aGVtZVByb3BzLmZpZWxkcywgLi4uZmllbGRzIH07XHJcbiAgICB3aWRnZXRzID0geyAuLi50aGVtZVByb3BzLndpZGdldHMsIC4uLndpZGdldHMgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Rm9ybVxyXG4gICAgICAgIHsuLi50aGVtZVByb3BzfVxyXG4gICAgICAgIHsuLi5kaXJlY3RQcm9wc31cclxuICAgICAgICBmaWVsZHM9e2ZpZWxkc31cclxuICAgICAgICB3aWRnZXRzPXt3aWRnZXRzfVxyXG4gICAgICAgIHJlZj17cmVmfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9KTtcclxufVxyXG5cclxud2l0aFRoZW1lLnByb3BUeXBlcyA9IHtcclxuICB3aWRnZXRzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIGZpZWxkczogUHJvcFR5cGVzLm9iamVjdCxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZTtcclxuIl19