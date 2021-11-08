"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function rangeOptions(start, stop) {
  var options = [];

  for (var i = start; i <= stop; i++) {
    options.push({
      value: i,
      label: (0, _utils.pad)(i, 2)
    });
  }

  return options;
}

function readyForChange(state) {
  return Object.keys(state).every(function (key) {
    return state[key] !== -1;
  });
}

function DateElement(props) {
  var type = props.type,
      range = props.range,
      value = props.value,
      select = props.select,
      rootId = props.rootId,
      disabled = props.disabled,
      readonly = props.readonly,
      autofocus = props.autofocus,
      registry = props.registry,
      onBlur = props.onBlur;
  var id = rootId + "_" + type;
  var SelectWidget = registry.widgets.SelectWidget;
  return _react["default"].createElement(SelectWidget, {
    schema: {
      type: "integer"
    },
    id: id,
    className: "form-control",
    options: {
      enumOptions: rangeOptions(range[0], range[1])
    },
    placeholder: type,
    value: value,
    disabled: disabled,
    readonly: readonly,
    autofocus: autofocus,
    onChange: function onChange(value) {
      return select(type, value);
    },
    onBlur: onBlur
  });
}

var AltDateWidget =
/*#__PURE__*/
function (_Component) {
  _inherits(AltDateWidget, _Component);

  function AltDateWidget(props) {
    var _this;

    _classCallCheck(this, AltDateWidget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AltDateWidget).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (property, value) {
      _this.setState(_defineProperty({}, property, typeof value === "undefined" ? -1 : value), function () {
        // Only propagate to parent state if we have a complete date{time}
        if (readyForChange(_this.state)) {
          _this.props.onChange((0, _utils.toDateString)(_this.state, _this.props.time));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setNow", function (event) {
      event.preventDefault();
      var _this$props = _this.props,
          time = _this$props.time,
          disabled = _this$props.disabled,
          readonly = _this$props.readonly,
          onChange = _this$props.onChange;

      if (disabled || readonly) {
        return;
      }

      var nowDateObj = (0, _utils.parseDateString)(new Date().toJSON(), time);

      _this.setState(nowDateObj, function () {
        return onChange((0, _utils.toDateString)(_this.state, time));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function (event) {
      event.preventDefault();
      var _this$props2 = _this.props,
          time = _this$props2.time,
          disabled = _this$props2.disabled,
          readonly = _this$props2.readonly,
          onChange = _this$props2.onChange;

      if (disabled || readonly) {
        return;
      }

      _this.setState((0, _utils.parseDateString)("", time), function () {
        return onChange(undefined);
      });
    });

    _this.state = (0, _utils.parseDateString)(props.value, props.time);
    return _this;
  }

  _createClass(AltDateWidget, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.value && prevProps.value !== (0, _utils.parseDateString)(this.props.value, this.props.time)) {
        this.setState((0, _utils.parseDateString)(this.props.value, this.props.time));
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          id = _this$props3.id,
          disabled = _this$props3.disabled,
          readonly = _this$props3.readonly,
          autofocus = _this$props3.autofocus,
          registry = _this$props3.registry,
          onBlur = _this$props3.onBlur,
          options = _this$props3.options;
      return _react["default"].createElement("ul", {
        className: "list-inline"
      }, this.dateElementProps.map(function (elemProps, i) {
        return _react["default"].createElement("li", {
          key: i
        }, _react["default"].createElement(DateElement, _extends({
          rootId: id,
          select: _this2.onChange
        }, elemProps, {
          disabled: disabled,
          readonly: readonly,
          registry: registry,
          onBlur: onBlur,
          autofocus: autofocus && i === 0
        })));
      }), (options.hideNowButton !== "undefined" ? !options.hideNowButton : true) && _react["default"].createElement("li", null, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-info btn-now",
        onClick: this.setNow
      }, "Now")), (options.hideClearButton !== "undefined" ? !options.hideClearButton : true) && _react["default"].createElement("li", null, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-warning btn-clear",
        onClick: this.clear
      }, "Clear")));
    }
  }, {
    key: "dateElementProps",
    get: function get() {
      var _this$props4 = this.props,
          time = _this$props4.time,
          options = _this$props4.options;
      var _this$state = this.state,
          year = _this$state.year,
          month = _this$state.month,
          day = _this$state.day,
          hour = _this$state.hour,
          minute = _this$state.minute,
          second = _this$state.second;
      var data = [{
        type: "year",
        range: options.yearsRange,
        value: year
      }, {
        type: "month",
        range: [1, 12],
        value: month
      }, {
        type: "day",
        range: [1, 31],
        value: day
      }];

      if (time) {
        data.push({
          type: "hour",
          range: [0, 23],
          value: hour
        }, {
          type: "minute",
          range: [0, 59],
          value: minute
        }, {
          type: "second",
          range: [0, 59],
          value: second
        });
      }

      return data;
    }
  }]);

  return AltDateWidget;
}(_react.Component);

_defineProperty(AltDateWidget, "defaultProps", {
  time: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  options: {
    yearsRange: [1900, new Date().getFullYear() + 2]
  }
});

if (process.env.NODE_ENV !== "production") {
  AltDateWidget.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    id: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].string,
    required: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    autofocus: _propTypes["default"].bool,
    onChange: _propTypes["default"].func,
    onBlur: _propTypes["default"].func,
    time: _propTypes["default"].bool,
    options: _propTypes["default"].object
  };
}

var _default = AltDateWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJyYW5nZU9wdGlvbnMiLCJzdGFydCIsInN0b3AiLCJvcHRpb25zIiwiaSIsInB1c2giLCJ2YWx1ZSIsImxhYmVsIiwicmVhZHlGb3JDaGFuZ2UiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJldmVyeSIsImtleSIsIkRhdGVFbGVtZW50IiwicHJvcHMiLCJ0eXBlIiwicmFuZ2UiLCJzZWxlY3QiLCJyb290SWQiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiYXV0b2ZvY3VzIiwicmVnaXN0cnkiLCJvbkJsdXIiLCJpZCIsIlNlbGVjdFdpZGdldCIsIndpZGdldHMiLCJlbnVtT3B0aW9ucyIsIkFsdERhdGVXaWRnZXQiLCJwcm9wZXJ0eSIsInNldFN0YXRlIiwib25DaGFuZ2UiLCJ0aW1lIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm5vd0RhdGVPYmoiLCJEYXRlIiwidG9KU09OIiwidW5kZWZpbmVkIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiZGF0ZUVsZW1lbnRQcm9wcyIsIm1hcCIsImVsZW1Qcm9wcyIsImhpZGVOb3dCdXR0b24iLCJzZXROb3ciLCJoaWRlQ2xlYXJCdXR0b24iLCJjbGVhciIsInllYXIiLCJtb250aCIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJkYXRhIiwieWVhcnNSYW5nZSIsIkNvbXBvbmVudCIsImdldEZ1bGxZZWFyIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwic2NoZW1hIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInN0cmluZyIsInJlcXVpcmVkIiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFNB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Qm5CLEVBQUFBLE9BQU8sRUFBRTtBQUNQdUQsSUFBQUEsVUFBVSxFQUFFLENBQUMsSUFBRCxFQUFPLElBQUlyQixJQUFKLEdBQVd1QixXQUFYLEtBQTJCLENBQWxDO0FBREw7QUFMVyxDOztBQXFJeEIsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNsQyxFQUFBQSxhQUFhLENBQUNtQyxTQUFkLEdBQTBCO0FBQ3hCQyxJQUFBQSxNQUFNLEVBQUVDLHNCQUFVQyxNQUFWLENBQWlCQyxVQUREO0FBRXhCM0MsSUFBQUEsRUFBRSxFQUFFeUMsc0JBQVVHLE1BQVYsQ0FBaUJELFVBRkc7QUFHeEI5RCxJQUFBQSxLQUFLLEVBQUU0RCxzQkFBVUcsTUFITztBQUl4QkMsSUFBQUEsUUFBUSxFQUFFSixzQkFBVUssSUFKSTtBQUt4Qm5ELElBQUFBLFFBQVEsRUFBRThDLHNCQUFVSyxJQUxJO0FBTXhCbEQsSUFBQUEsUUFBUSxFQUFFNkMsc0JBQVVLLElBTkk7QUFPeEJqRCxJQUFBQSxTQUFTLEVBQUU0QyxzQkFBVUssSUFQRztBQVF4QnZDLElBQUFBLFFBQVEsRUFBRWtDLHNCQUFVTSxJQVJJO0FBU3hCaEQsSUFBQUEsTUFBTSxFQUFFMEMsc0JBQVVNLElBVE07QUFVeEJ2QyxJQUFBQSxJQUFJLEVBQUVpQyxzQkFBVUssSUFWUTtBQVd4QnBFLElBQUFBLE9BQU8sRUFBRStELHNCQUFVQztBQVhLLEdBQTFCO0FBYUQ7O2VBRWN0QyxhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5pbXBvcnQgeyBzaG91bGRSZW5kZXIsIHBhcnNlRGF0ZVN0cmluZywgdG9EYXRlU3RyaW5nLCBwYWQgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuXHJcbmZ1bmN0aW9uIHJhbmdlT3B0aW9ucyhzdGFydCwgc3RvcCkge1xyXG4gIGxldCBvcHRpb25zID0gW107XHJcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IHN0b3A7IGkrKykge1xyXG4gICAgb3B0aW9ucy5wdXNoKHsgdmFsdWU6IGksIGxhYmVsOiBwYWQoaSwgMikgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBvcHRpb25zO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkeUZvckNoYW5nZShzdGF0ZSkge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhzdGF0ZSkuZXZlcnkoa2V5ID0+IHN0YXRlW2tleV0gIT09IC0xKTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGF0ZUVsZW1lbnQocHJvcHMpIHtcclxuICBjb25zdCB7XHJcbiAgICB0eXBlLFxyXG4gICAgcmFuZ2UsXHJcbiAgICB2YWx1ZSxcclxuICAgIHNlbGVjdCxcclxuICAgIHJvb3RJZCxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgcmVhZG9ubHksXHJcbiAgICBhdXRvZm9jdXMsXHJcbiAgICByZWdpc3RyeSxcclxuICAgIG9uQmx1cixcclxuICB9ID0gcHJvcHM7XHJcbiAgY29uc3QgaWQgPSByb290SWQgKyBcIl9cIiArIHR5cGU7XHJcbiAgY29uc3QgeyBTZWxlY3RXaWRnZXQgfSA9IHJlZ2lzdHJ5LndpZGdldHM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxTZWxlY3RXaWRnZXRcclxuICAgICAgc2NoZW1hPXt7IHR5cGU6IFwiaW50ZWdlclwiIH19XHJcbiAgICAgIGlkPXtpZH1cclxuICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgb3B0aW9ucz17eyBlbnVtT3B0aW9uczogcmFuZ2VPcHRpb25zKHJhbmdlWzBdLCByYW5nZVsxXSkgfX1cclxuICAgICAgcGxhY2Vob2xkZXI9e3R5cGV9XHJcbiAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICBvbkNoYW5nZT17dmFsdWUgPT4gc2VsZWN0KHR5cGUsIHZhbHVlKX1cclxuICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAvPlxyXG4gICk7XHJcbn1cclxuXHJcbmNsYXNzIEFsdERhdGVXaWRnZXQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB0aW1lOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHJlYWRvbmx5OiBmYWxzZSxcclxuICAgIGF1dG9mb2N1czogZmFsc2UsXHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgIHllYXJzUmFuZ2U6IFsxOTAwLCBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAyXSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSBwYXJzZURhdGVTdHJpbmcocHJvcHMudmFsdWUsIHByb3BzLnRpbWUpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHByZXZQcm9wcy52YWx1ZSAmJlxyXG4gICAgICBwcmV2UHJvcHMudmFsdWUgIT09IHBhcnNlRGF0ZVN0cmluZyh0aGlzLnByb3BzLnZhbHVlLCB0aGlzLnByb3BzLnRpbWUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShwYXJzZURhdGVTdHJpbmcodGhpcy5wcm9wcy52YWx1ZSwgdGhpcy5wcm9wcy50aW1lKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiBzaG91bGRSZW5kZXIodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UgPSAocHJvcGVydHksIHZhbHVlKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICB7IFtwcm9wZXJ0eV06IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IC0xIDogdmFsdWUgfSxcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIC8vIE9ubHkgcHJvcGFnYXRlIHRvIHBhcmVudCBzdGF0ZSBpZiB3ZSBoYXZlIGEgY29tcGxldGUgZGF0ZXt0aW1lfVxyXG4gICAgICAgIGlmIChyZWFkeUZvckNoYW5nZSh0aGlzLnN0YXRlKSkge1xyXG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0b0RhdGVTdHJpbmcodGhpcy5zdGF0ZSwgdGhpcy5wcm9wcy50aW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHNldE5vdyA9IGV2ZW50ID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB7IHRpbWUsIGRpc2FibGVkLCByZWFkb25seSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBpZiAoZGlzYWJsZWQgfHwgcmVhZG9ubHkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgbm93RGF0ZU9iaiA9IHBhcnNlRGF0ZVN0cmluZyhuZXcgRGF0ZSgpLnRvSlNPTigpLCB0aW1lKTtcclxuICAgIHRoaXMuc2V0U3RhdGUobm93RGF0ZU9iaiwgKCkgPT4gb25DaGFuZ2UodG9EYXRlU3RyaW5nKHRoaXMuc3RhdGUsIHRpbWUpKSk7XHJcbiAgfTtcclxuXHJcbiAgY2xlYXIgPSBldmVudCA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgeyB0aW1lLCBkaXNhYmxlZCwgcmVhZG9ubHksIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKGRpc2FibGVkIHx8IHJlYWRvbmx5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUocGFyc2VEYXRlU3RyaW5nKFwiXCIsIHRpbWUpLCAoKSA9PiBvbkNoYW5nZSh1bmRlZmluZWQpKTtcclxuICB9O1xyXG5cclxuICBnZXQgZGF0ZUVsZW1lbnRQcm9wcygpIHtcclxuICAgIGNvbnN0IHsgdGltZSwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBkYXRhID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogXCJ5ZWFyXCIsXHJcbiAgICAgICAgcmFuZ2U6IG9wdGlvbnMueWVhcnNSYW5nZSxcclxuICAgICAgICB2YWx1ZTogeWVhcixcclxuICAgICAgfSxcclxuICAgICAgeyB0eXBlOiBcIm1vbnRoXCIsIHJhbmdlOiBbMSwgMTJdLCB2YWx1ZTogbW9udGggfSxcclxuICAgICAgeyB0eXBlOiBcImRheVwiLCByYW5nZTogWzEsIDMxXSwgdmFsdWU6IGRheSB9LFxyXG4gICAgXTtcclxuICAgIGlmICh0aW1lKSB7XHJcbiAgICAgIGRhdGEucHVzaChcclxuICAgICAgICB7IHR5cGU6IFwiaG91clwiLCByYW5nZTogWzAsIDIzXSwgdmFsdWU6IGhvdXIgfSxcclxuICAgICAgICB7IHR5cGU6IFwibWludXRlXCIsIHJhbmdlOiBbMCwgNTldLCB2YWx1ZTogbWludXRlIH0sXHJcbiAgICAgICAgeyB0eXBlOiBcInNlY29uZFwiLCByYW5nZTogWzAsIDU5XSwgdmFsdWU6IHNlY29uZCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICByZWdpc3RyeSxcclxuICAgICAgb25CbHVyLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1pbmxpbmVcIj5cclxuICAgICAgICB7dGhpcy5kYXRlRWxlbWVudFByb3BzLm1hcCgoZWxlbVByb3BzLCBpKSA9PiAoXHJcbiAgICAgICAgICA8bGkga2V5PXtpfT5cclxuICAgICAgICAgICAgPERhdGVFbGVtZW50XHJcbiAgICAgICAgICAgICAgcm9vdElkPXtpZH1cclxuICAgICAgICAgICAgICBzZWxlY3Q9e3RoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgey4uLmVsZW1Qcm9wc31cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICAgICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cclxuICAgICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1cyAmJiBpID09PSAwfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICApKX1cclxuICAgICAgICB7KG9wdGlvbnMuaGlkZU5vd0J1dHRvbiAhPT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgICAgPyAhb3B0aW9ucy5oaWRlTm93QnV0dG9uXHJcbiAgICAgICAgICA6IHRydWUpICYmIChcclxuICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gYnRuLW5vd1wiIG9uQ2xpY2s9e3RoaXMuc2V0Tm93fT5cclxuICAgICAgICAgICAgICBOb3dcclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICApfVxyXG4gICAgICAgIHsob3B0aW9ucy5oaWRlQ2xlYXJCdXR0b24gIT09IFwidW5kZWZpbmVkXCJcclxuICAgICAgICAgID8gIW9wdGlvbnMuaGlkZUNsZWFyQnV0dG9uXHJcbiAgICAgICAgICA6IHRydWUpICYmIChcclxuICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICBocmVmPVwiI1wiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi13YXJuaW5nIGJ0bi1jbGVhclwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jbGVhcn0+XHJcbiAgICAgICAgICAgICAgQ2xlYXJcclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICApfVxyXG4gICAgICA8L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBBbHREYXRlV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgcmVhZG9ubHk6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgYXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICB0aW1lOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWx0RGF0ZVdpZGdldDtcclxuIl19