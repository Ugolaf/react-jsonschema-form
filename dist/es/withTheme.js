var _excluded = ["fields", "widgets"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Form from "./";

function withTheme(themeProps) {
  return /*#__PURE__*/forwardRef(function (_ref, ref) {
    var fields = _ref.fields,
        widgets = _ref.widgets,
        directProps = _objectWithoutProperties(_ref, _excluded);

    fields = _objectSpread(_objectSpread({}, themeProps.fields), fields);
    widgets = _objectSpread(_objectSpread({}, themeProps.widgets), widgets);
    return /*#__PURE__*/React.createElement(Form, _extends({}, themeProps, directProps, {
      fields: fields,
      widgets: widgets,
      ref: ref
    }));
  });
}

withTheme.propTypes = {
  widgets: PropTypes.object,
  fields: PropTypes.object
};
export default withTheme;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93aXRoVGhlbWUuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJmb3J3YXJkUmVmIiwiUHJvcFR5cGVzIiwiRm9ybSIsIndpdGhUaGVtZSIsInRoZW1lUHJvcHMiLCJyZWYiLCJmaWVsZHMiLCJ3aWRnZXRzIiwiZGlyZWN0UHJvcHMiLCJwcm9wVHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsVUFBaEIsUUFBa0MsT0FBbEM7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixJQUFqQjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxVQUFuQixFQUErQjtBQUM3QixzQkFBT0osVUFBVSxDQUFDLGdCQUFzQ0ssR0FBdEMsRUFBOEM7QUFBQSxRQUEzQ0MsTUFBMkMsUUFBM0NBLE1BQTJDO0FBQUEsUUFBbkNDLE9BQW1DLFFBQW5DQSxPQUFtQztBQUFBLFFBQXZCQyxXQUF1Qjs7QUFDOURGLElBQUFBLE1BQU0sbUNBQVFGLFVBQVUsQ0FBQ0UsTUFBbkIsR0FBOEJBLE1BQTlCLENBQU47QUFDQUMsSUFBQUEsT0FBTyxtQ0FBUUgsVUFBVSxDQUFDRyxPQUFuQixHQUErQkEsT0FBL0IsQ0FBUDtBQUVBLHdCQUNFLG9CQUFDLElBQUQsZUFDTUgsVUFETixFQUVNSSxXQUZOO0FBR0UsTUFBQSxNQUFNLEVBQUVGLE1BSFY7QUFJRSxNQUFBLE9BQU8sRUFBRUMsT0FKWDtBQUtFLE1BQUEsR0FBRyxFQUFFRjtBQUxQLE9BREY7QUFTRCxHQWJnQixDQUFqQjtBQWNEOztBQUVERixTQUFTLENBQUNNLFNBQVYsR0FBc0I7QUFDcEJGLEVBQUFBLE9BQU8sRUFBRU4sU0FBUyxDQUFDUyxNQURDO0FBRXBCSixFQUFBQSxNQUFNLEVBQUVMLFNBQVMsQ0FBQ1M7QUFGRSxDQUF0QjtBQUtBLGVBQWVQLFNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBGb3JtIGZyb20gXCIuL1wiO1xyXG5cclxuZnVuY3Rpb24gd2l0aFRoZW1lKHRoZW1lUHJvcHMpIHtcclxuICByZXR1cm4gZm9yd2FyZFJlZigoeyBmaWVsZHMsIHdpZGdldHMsIC4uLmRpcmVjdFByb3BzIH0sIHJlZikgPT4ge1xyXG4gICAgZmllbGRzID0geyAuLi50aGVtZVByb3BzLmZpZWxkcywgLi4uZmllbGRzIH07XHJcbiAgICB3aWRnZXRzID0geyAuLi50aGVtZVByb3BzLndpZGdldHMsIC4uLndpZGdldHMgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Rm9ybVxyXG4gICAgICAgIHsuLi50aGVtZVByb3BzfVxyXG4gICAgICAgIHsuLi5kaXJlY3RQcm9wc31cclxuICAgICAgICBmaWVsZHM9e2ZpZWxkc31cclxuICAgICAgICB3aWRnZXRzPXt3aWRnZXRzfVxyXG4gICAgICAgIHJlZj17cmVmfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9KTtcclxufVxyXG5cclxud2l0aFRoZW1lLnByb3BUeXBlcyA9IHtcclxuICB3aWRnZXRzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIGZpZWxkczogUHJvcFR5cGVzLm9iamVjdCxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZTtcclxuIl19