"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
  return /*#__PURE__*/_react.default.createElement(SelectWidget, {
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

var AltDateWidget = /*#__PURE__*/function (_Component) {
  _inherits(AltDateWidget, _Component);

  var _super = _createSuper(AltDateWidget);

  function AltDateWidget(props) {
    var _this;

    _classCallCheck(this, AltDateWidget);

    _this = _super.call(this, props);

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
    key: "dateElementProps",
    get: function get() {
      var _this$props3 = this.props,
          time = _this$props3.time,
          options = _this$props3.options;
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
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          id = _this$props4.id,
          disabled = _this$props4.disabled,
          readonly = _this$props4.readonly,
          autofocus = _this$props4.autofocus,
          registry = _this$props4.registry,
          onBlur = _this$props4.onBlur,
          options = _this$props4.options;
      return /*#__PURE__*/_react.default.createElement("ul", {
        className: "list-inline"
      }, this.dateElementProps.map(function (elemProps, i) {
        return /*#__PURE__*/_react.default.createElement("li", {
          key: i
        }, /*#__PURE__*/_react.default.createElement(DateElement, _extends({
          rootId: id,
          select: _this2.onChange
        }, elemProps, {
          disabled: disabled,
          readonly: readonly,
          registry: registry,
          onBlur: onBlur,
          autofocus: autofocus && i === 0
        })));
      }), (options.hideNowButton !== "undefined" ? !options.hideNowButton : true) && /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("a", {
        href: "#",
        className: "btn btn-info btn-now",
        onClick: this.setNow
      }, "Now")), (options.hideClearButton !== "undefined" ? !options.hideClearButton : true) && /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("a", {
        href: "#",
        className: "btn btn-warning btn-clear",
        onClick: this.clear
      }, "Clear")));
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
    schema: _propTypes.default.object.isRequired,
    id: _propTypes.default.string.isRequired,
    value: _propTypes.default.string,
    required: _propTypes.default.bool,
    disabled: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    autofocus: _propTypes.default.bool,
    onChange: _propTypes.default.func,
    onBlur: _propTypes.default.func,
    time: _propTypes.default.bool,
    options: _propTypes.default.object
  };
}

var _default = AltDateWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJyYW5nZU9wdGlvbnMiLCJzdGFydCIsInN0b3AiLCJvcHRpb25zIiwiaSIsInB1c2giLCJ2YWx1ZSIsImxhYmVsIiwicmVhZHlGb3JDaGFuZ2UiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJldmVyeSIsImtleSIsIkRhdGVFbGVtZW50IiwicHJvcHMiLCJ0eXBlIiwicmFuZ2UiLCJzZWxlY3QiLCJyb290SWQiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiYXV0b2ZvY3VzIiwicmVnaXN0cnkiLCJvbkJsdXIiLCJpZCIsIlNlbGVjdFdpZGdldCIsIndpZGdldHMiLCJlbnVtT3B0aW9ucyIsIkFsdERhdGVXaWRnZXQiLCJwcm9wZXJ0eSIsInNldFN0YXRlIiwib25DaGFuZ2UiLCJ0aW1lIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm5vd0RhdGVPYmoiLCJEYXRlIiwidG9KU09OIiwidW5kZWZpbmVkIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImRhdGEiLCJ5ZWFyc1JhbmdlIiwiZGF0ZUVsZW1lbnRQcm9wcyIsIm1hcCIsImVsZW1Qcm9wcyIsImhpZGVOb3dCdXR0b24iLCJzZXROb3ciLCJoaWRlQ2xlYXJCdXR0b24iLCJjbGVhciIsIkNvbXBvbmVudCIsImdldEZ1bGxZZWFyIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwic2NoZW1hIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInN0cmluZyIsInJlcXVpcmVkIiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztB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UztBQUtwQm5CLEVBQUFBLE9BQU8sRUFBRTtBQUNQZ0QsSUFBQUEsVUFBVSxFQUFFLENBQUMsSUFBRCxFQUFPLElBQUlkLElBQUosR0FBV3VCLFdBQVgsS0FBMkIsQ0FBbEM7QUFETDtBQUxXLEM7O0FBcUl4QixJQUFJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q2xDLEVBQUFBLGFBQWEsQ0FBQ21DLFNBQWQsR0FBMEI7QUFDeEJDLElBQUFBLE1BQU0sRUFBRUMsbUJBQVVDLE1BQVYsQ0FBaUJDLFVBREQ7QUFFeEIzQyxJQUFBQSxFQUFFLEVBQUV5QyxtQkFBVUcsTUFBVixDQUFpQkQsVUFGRztBQUd4QjlELElBQUFBLEtBQUssRUFBRTRELG1CQUFVRyxNQUhPO0FBSXhCQyxJQUFBQSxRQUFRLEVBQUVKLG1CQUFVSyxJQUpJO0FBS3hCbkQsSUFBQUEsUUFBUSxFQUFFOEMsbUJBQVVLLElBTEk7QUFNeEJsRCxJQUFBQSxRQUFRLEVBQUU2QyxtQkFBVUssSUFOSTtBQU94QmpELElBQUFBLFNBQVMsRUFBRTRDLG1CQUFVSyxJQVBHO0FBUXhCdkMsSUFBQUEsUUFBUSxFQUFFa0MsbUJBQVVNLElBUkk7QUFTeEJoRCxJQUFBQSxNQUFNLEVBQUUwQyxtQkFBVU0sSUFUTTtBQVV4QnZDLElBQUFBLElBQUksRUFBRWlDLG1CQUFVSyxJQVZRO0FBV3hCcEUsSUFBQUEsT0FBTyxFQUFFK0QsbUJBQVVDO0FBWEssR0FBMUI7QUFhRDs7ZUFFY3RDLGEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IHNob3VsZFJlbmRlciwgcGFyc2VEYXRlU3RyaW5nLCB0b0RhdGVTdHJpbmcsIHBhZCB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gcmFuZ2VPcHRpb25zKHN0YXJ0LCBzdG9wKSB7XHJcbiAgbGV0IG9wdGlvbnMgPSBbXTtcclxuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gc3RvcDsgaSsrKSB7XHJcbiAgICBvcHRpb25zLnB1c2goeyB2YWx1ZTogaSwgbGFiZWw6IHBhZChpLCAyKSB9KTtcclxuICB9XHJcbiAgcmV0dXJuIG9wdGlvbnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWR5Rm9yQ2hhbmdlKHN0YXRlKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHN0YXRlKS5ldmVyeShrZXkgPT4gc3RhdGVba2V5XSAhPT0gLTEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBEYXRlRWxlbWVudChwcm9wcykge1xyXG4gIGNvbnN0IHtcclxuICAgIHR5cGUsXHJcbiAgICByYW5nZSxcclxuICAgIHZhbHVlLFxyXG4gICAgc2VsZWN0LFxyXG4gICAgcm9vdElkLFxyXG4gICAgZGlzYWJsZWQsXHJcbiAgICByZWFkb25seSxcclxuICAgIGF1dG9mb2N1cyxcclxuICAgIHJlZ2lzdHJ5LFxyXG4gICAgb25CbHVyLFxyXG4gIH0gPSBwcm9wcztcclxuICBjb25zdCBpZCA9IHJvb3RJZCArIFwiX1wiICsgdHlwZTtcclxuICBjb25zdCB7IFNlbGVjdFdpZGdldCB9ID0gcmVnaXN0cnkud2lkZ2V0cztcclxuICByZXR1cm4gKFxyXG4gICAgPFNlbGVjdFdpZGdldFxyXG4gICAgICBzY2hlbWE9e3sgdHlwZTogXCJpbnRlZ2VyXCIgfX1cclxuICAgICAgaWQ9e2lkfVxyXG4gICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICBvcHRpb25zPXt7IGVudW1PcHRpb25zOiByYW5nZU9wdGlvbnMocmFuZ2VbMF0sIHJhbmdlWzFdKSB9fVxyXG4gICAgICBwbGFjZWhvbGRlcj17dHlwZX1cclxuICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiBzZWxlY3QodHlwZSwgdmFsdWUpfVxyXG4gICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuY2xhc3MgQWx0RGF0ZVdpZGdldCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHRpbWU6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gICAgYXV0b2ZvY3VzOiBmYWxzZSxcclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgeWVhcnNSYW5nZTogWzE5MDAsIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArIDJdLFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhwcm9wcy52YWx1ZSwgcHJvcHMudGltZSk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuICAgIGlmIChcclxuICAgICAgcHJldlByb3BzLnZhbHVlICYmXHJcbiAgICAgIHByZXZQcm9wcy52YWx1ZSAhPT0gcGFyc2VEYXRlU3RyaW5nKHRoaXMucHJvcHMudmFsdWUsIHRoaXMucHJvcHMudGltZSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHBhcnNlRGF0ZVN0cmluZyh0aGlzLnByb3BzLnZhbHVlLCB0aGlzLnByb3BzLnRpbWUpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgcmV0dXJuIHNob3VsZFJlbmRlcih0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZSA9IChwcm9wZXJ0eSwgdmFsdWUpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgIHsgW3Byb3BlcnR5XTogdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiID8gLTEgOiB2YWx1ZSB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgLy8gT25seSBwcm9wYWdhdGUgdG8gcGFyZW50IHN0YXRlIGlmIHdlIGhhdmUgYSBjb21wbGV0ZSBkYXRle3RpbWV9XHJcbiAgICAgICAgaWYgKHJlYWR5Rm9yQ2hhbmdlKHRoaXMuc3RhdGUpKSB7XHJcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRvRGF0ZVN0cmluZyh0aGlzLnN0YXRlLCB0aGlzLnByb3BzLnRpbWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgc2V0Tm93ID0gZXZlbnQgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHsgdGltZSwgZGlzYWJsZWQsIHJlYWRvbmx5LCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmIChkaXNhYmxlZCB8fCByZWFkb25seSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBub3dEYXRlT2JqID0gcGFyc2VEYXRlU3RyaW5nKG5ldyBEYXRlKCkudG9KU09OKCksIHRpbWUpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZShub3dEYXRlT2JqLCAoKSA9PiBvbkNoYW5nZSh0b0RhdGVTdHJpbmcodGhpcy5zdGF0ZSwgdGltZSkpKTtcclxuICB9O1xyXG5cclxuICBjbGVhciA9IGV2ZW50ID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB7IHRpbWUsIGRpc2FibGVkLCByZWFkb25seSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBpZiAoZGlzYWJsZWQgfHwgcmVhZG9ubHkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZShwYXJzZURhdGVTdHJpbmcoXCJcIiwgdGltZSksICgpID0+IG9uQ2hhbmdlKHVuZGVmaW5lZCkpO1xyXG4gIH07XHJcblxyXG4gIGdldCBkYXRlRWxlbWVudFByb3BzKCkge1xyXG4gICAgY29uc3QgeyB0aW1lLCBvcHRpb25zIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyB5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IGRhdGEgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBcInllYXJcIixcclxuICAgICAgICByYW5nZTogb3B0aW9ucy55ZWFyc1JhbmdlLFxyXG4gICAgICAgIHZhbHVlOiB5ZWFyLFxyXG4gICAgICB9LFxyXG4gICAgICB7IHR5cGU6IFwibW9udGhcIiwgcmFuZ2U6IFsxLCAxMl0sIHZhbHVlOiBtb250aCB9LFxyXG4gICAgICB7IHR5cGU6IFwiZGF5XCIsIHJhbmdlOiBbMSwgMzFdLCB2YWx1ZTogZGF5IH0sXHJcbiAgICBdO1xyXG4gICAgaWYgKHRpbWUpIHtcclxuICAgICAgZGF0YS5wdXNoKFxyXG4gICAgICAgIHsgdHlwZTogXCJob3VyXCIsIHJhbmdlOiBbMCwgMjNdLCB2YWx1ZTogaG91ciB9LFxyXG4gICAgICAgIHsgdHlwZTogXCJtaW51dGVcIiwgcmFuZ2U6IFswLCA1OV0sIHZhbHVlOiBtaW51dGUgfSxcclxuICAgICAgICB7IHR5cGU6IFwic2Vjb25kXCIsIHJhbmdlOiBbMCwgNTldLCB2YWx1ZTogc2Vjb25kIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICBhdXRvZm9jdXMsXHJcbiAgICAgIHJlZ2lzdHJ5LFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWlubGluZVwiPlxyXG4gICAgICAgIHt0aGlzLmRhdGVFbGVtZW50UHJvcHMubWFwKChlbGVtUHJvcHMsIGkpID0+IChcclxuICAgICAgICAgIDxsaSBrZXk9e2l9PlxyXG4gICAgICAgICAgICA8RGF0ZUVsZW1lbnRcclxuICAgICAgICAgICAgICByb290SWQ9e2lkfVxyXG4gICAgICAgICAgICAgIHNlbGVjdD17dGhpcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgICB7Li4uZWxlbVByb3BzfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgICAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzICYmIGkgPT09IDB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICkpfVxyXG4gICAgICAgIHsob3B0aW9ucy5oaWRlTm93QnV0dG9uICE9PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgICA/ICFvcHRpb25zLmhpZGVOb3dCdXR0b25cclxuICAgICAgICAgIDogdHJ1ZSkgJiYgKFxyXG4gICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyBidG4tbm93XCIgb25DbGljaz17dGhpcy5zZXROb3d9PlxyXG4gICAgICAgICAgICAgIE5vd1xyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgeyhvcHRpb25zLmhpZGVDbGVhckJ1dHRvbiAhPT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgICAgPyAhb3B0aW9ucy5oaWRlQ2xlYXJCdXR0b25cclxuICAgICAgICAgIDogdHJ1ZSkgJiYgKFxyXG4gICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgIGhyZWY9XCIjXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXdhcm5pbmcgYnRuLWNsZWFyXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsZWFyfT5cclxuICAgICAgICAgICAgICBDbGVhclxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvdWw+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIEFsdERhdGVXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHRpbWU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbHREYXRlV2lkZ2V0O1xyXG4iXX0=