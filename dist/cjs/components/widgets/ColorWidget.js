"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ColorWidget(props) {
  var disabled = props.disabled,
      readonly = props.readonly,
      BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/_react.default.createElement(BaseInput, _extends({
    type: "color"
  }, props, {
    disabled: disabled || readonly
  }));
}

if (process.env.NODE_ENV !== "production") {
  ColorWidget.propTypes = {
    schema: _propTypes.default.object.isRequired,
    id: _propTypes.default.string.isRequired,
    value: _propTypes.default.string,
    required: _propTypes.default.bool,
    disabled: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    autofocus: _propTypes.default.bool,
    onChange: _propTypes.default.func
  };
}

var _default = ColorWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQ29sb3JXaWRnZXQuanMiXSwibmFtZXMiOlsiQ29sb3JXaWRnZXQiLCJwcm9wcyIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzY2hlbWEiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiaWQiLCJzdHJpbmciLCJ2YWx1ZSIsInJlcXVpcmVkIiwiYm9vbCIsImF1dG9mb2N1cyIsIm9uQ2hhbmdlIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUMxQixNQUNFQyxRQURGLEdBTUlELEtBTkosQ0FDRUMsUUFERjtBQUFBLE1BRUVDLFFBRkYsR0FNSUYsS0FOSixDQUVFRSxRQUZGO0FBQUEsTUFJZUMsU0FKZixHQU1JSCxLQU5KLENBR0VJLFFBSEYsQ0FJSUMsT0FKSixDQUllRixTQUpmO0FBT0Esc0JBQU8sNkJBQUMsU0FBRDtBQUFXLElBQUEsSUFBSSxFQUFDO0FBQWhCLEtBQTRCSCxLQUE1QjtBQUFtQyxJQUFBLFFBQVEsRUFBRUMsUUFBUSxJQUFJQztBQUF6RCxLQUFQO0FBQ0Q7O0FBRUQsSUFBSUksT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNULEVBQUFBLFdBQVcsQ0FBQ1UsU0FBWixHQUF3QjtBQUN0QkMsSUFBQUEsTUFBTSxFQUFFQyxtQkFBVUMsTUFBVixDQUFpQkMsVUFESDtBQUV0QkMsSUFBQUEsRUFBRSxFQUFFSCxtQkFBVUksTUFBVixDQUFpQkYsVUFGQztBQUd0QkcsSUFBQUEsS0FBSyxFQUFFTCxtQkFBVUksTUFISztBQUl0QkUsSUFBQUEsUUFBUSxFQUFFTixtQkFBVU8sSUFKRTtBQUt0QmpCLElBQUFBLFFBQVEsRUFBRVUsbUJBQVVPLElBTEU7QUFNdEJoQixJQUFBQSxRQUFRLEVBQUVTLG1CQUFVTyxJQU5FO0FBT3RCQyxJQUFBQSxTQUFTLEVBQUVSLG1CQUFVTyxJQVBDO0FBUXRCRSxJQUFBQSxRQUFRLEVBQUVULG1CQUFVVTtBQVJFLEdBQXhCO0FBVUQ7O2VBRWN0QixXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5mdW5jdGlvbiBDb2xvcldpZGdldChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIGRpc2FibGVkLFxyXG4gICAgcmVhZG9ubHksXHJcbiAgICByZWdpc3RyeToge1xyXG4gICAgICB3aWRnZXRzOiB7IEJhc2VJbnB1dCB9LFxyXG4gICAgfSxcclxuICB9ID0gcHJvcHM7XHJcbiAgcmV0dXJuIDxCYXNlSW5wdXQgdHlwZT1cImNvbG9yXCIgey4uLnByb3BzfSBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgcmVhZG9ubHl9IC8+O1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQ29sb3JXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbG9yV2lkZ2V0O1xyXG4iXX0=