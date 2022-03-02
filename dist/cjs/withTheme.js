"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = _interopRequireDefault(require("./"));

var _excluded = ["fields", "widgets"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function withTheme(themeProps) {
  return /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
    var fields = _ref.fields,
        widgets = _ref.widgets,
        directProps = _objectWithoutProperties(_ref, _excluded);

    fields = _objectSpread(_objectSpread({}, themeProps.fields), fields);
    widgets = _objectSpread(_objectSpread({}, themeProps.widgets), widgets);
    return /*#__PURE__*/_react.default.createElement(_.default, _extends({}, themeProps, directProps, {
      fields: fields,
      widgets: widgets,
      ref: ref
    }));
  });
}

withTheme.propTypes = {
  widgets: _propTypes.default.object,
  fields: _propTypes.default.object
};
var _default = withTheme;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93aXRoVGhlbWUuanMiXSwibmFtZXMiOlsid2l0aFRoZW1lIiwidGhlbWVQcm9wcyIsInJlZiIsImZpZWxkcyIsIndpZGdldHMiLCJkaXJlY3RQcm9wcyIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxTQUFULENBQW1CQyxVQUFuQixFQUErQjtBQUM3QixzQkFBTyx1QkFBVyxnQkFBc0NDLEdBQXRDLEVBQThDO0FBQUEsUUFBM0NDLE1BQTJDLFFBQTNDQSxNQUEyQztBQUFBLFFBQW5DQyxPQUFtQyxRQUFuQ0EsT0FBbUM7QUFBQSxRQUF2QkMsV0FBdUI7O0FBQzlERixJQUFBQSxNQUFNLG1DQUFRRixVQUFVLENBQUNFLE1BQW5CLEdBQThCQSxNQUE5QixDQUFOO0FBQ0FDLElBQUFBLE9BQU8sbUNBQVFILFVBQVUsQ0FBQ0csT0FBbkIsR0FBK0JBLE9BQS9CLENBQVA7QUFFQSx3QkFDRSw2QkFBQyxTQUFELGVBQ01ILFVBRE4sRUFFTUksV0FGTjtBQUdFLE1BQUEsTUFBTSxFQUFFRixNQUhWO0FBSUUsTUFBQSxPQUFPLEVBQUVDLE9BSlg7QUFLRSxNQUFBLEdBQUcsRUFBRUY7QUFMUCxPQURGO0FBU0QsR0FiTSxDQUFQO0FBY0Q7O0FBRURGLFNBQVMsQ0FBQ00sU0FBVixHQUFzQjtBQUNwQkYsRUFBQUEsT0FBTyxFQUFFRyxtQkFBVUMsTUFEQztBQUVwQkwsRUFBQUEsTUFBTSxFQUFFSSxtQkFBVUM7QUFGRSxDQUF0QjtlQUtlUixTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgRm9ybSBmcm9tIFwiLi9cIjtcclxuXHJcbmZ1bmN0aW9uIHdpdGhUaGVtZSh0aGVtZVByb3BzKSB7XHJcbiAgcmV0dXJuIGZvcndhcmRSZWYoKHsgZmllbGRzLCB3aWRnZXRzLCAuLi5kaXJlY3RQcm9wcyB9LCByZWYpID0+IHtcclxuICAgIGZpZWxkcyA9IHsgLi4udGhlbWVQcm9wcy5maWVsZHMsIC4uLmZpZWxkcyB9O1xyXG4gICAgd2lkZ2V0cyA9IHsgLi4udGhlbWVQcm9wcy53aWRnZXRzLCAuLi53aWRnZXRzIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZvcm1cclxuICAgICAgICB7Li4udGhlbWVQcm9wc31cclxuICAgICAgICB7Li4uZGlyZWN0UHJvcHN9XHJcbiAgICAgICAgZmllbGRzPXtmaWVsZHN9XHJcbiAgICAgICAgd2lkZ2V0cz17d2lkZ2V0c31cclxuICAgICAgICByZWY9e3JlZn1cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbndpdGhUaGVtZS5wcm9wVHlwZXMgPSB7XHJcbiAgd2lkZ2V0czogUHJvcFR5cGVzLm9iamVjdCxcclxuICBmaWVsZHM6IFByb3BUeXBlcy5vYmplY3QsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoVGhlbWU7XHJcbiJdfQ==