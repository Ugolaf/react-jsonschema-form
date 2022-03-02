function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { shouldRender, parseDateString, toDateString, pad } from "../../utils";

function rangeOptions(start, stop) {
  var options = [];

  for (var i = start; i <= stop; i++) {
    options.push({
      value: i,
      label: pad(i, 2)
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
  return /*#__PURE__*/React.createElement(SelectWidget, {
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
          _this.props.onChange(toDateString(_this.state, _this.props.time));
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

      var nowDateObj = parseDateString(new Date().toJSON(), time);

      _this.setState(nowDateObj, function () {
        return onChange(toDateString(_this.state, time));
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

      _this.setState(parseDateString("", time), function () {
        return onChange(undefined);
      });
    });

    _this.state = parseDateString(props.value, props.time);
    return _this;
  }

  _createClass(AltDateWidget, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.value && prevProps.value !== parseDateString(this.props.value, this.props.time)) {
        this.setState(parseDateString(this.props.value, this.props.time));
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shouldRender(this, nextProps, nextState);
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
      return /*#__PURE__*/React.createElement("ul", {
        className: "list-inline"
      }, this.dateElementProps.map(function (elemProps, i) {
        return /*#__PURE__*/React.createElement("li", {
          key: i
        }, /*#__PURE__*/React.createElement(DateElement, _extends({
          rootId: id,
          select: _this2.onChange
        }, elemProps, {
          disabled: disabled,
          readonly: readonly,
          registry: registry,
          onBlur: onBlur,
          autofocus: autofocus && i === 0
        })));
      }), (options.hideNowButton !== "undefined" ? !options.hideNowButton : true) && /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "#",
        className: "btn btn-info btn-now",
        onClick: this.setNow
      }, "Now")), (options.hideClearButton !== "undefined" ? !options.hideClearButton : true) && /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "#",
        className: "btn btn-warning btn-clear",
        onClick: this.clear
      }, "Clear")));
    }
  }]);

  return AltDateWidget;
}(Component);

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
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    time: PropTypes.bool,
    options: PropTypes.object
  };
}

export default AltDateWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsInNob3VsZFJlbmRlciIsInBhcnNlRGF0ZVN0cmluZyIsInRvRGF0ZVN0cmluZyIsInBhZCIsInJhbmdlT3B0aW9ucyIsInN0YXJ0Iiwic3RvcCIsIm9wdGlvbnMiLCJpIiwicHVzaCIsInZhbHVlIiwibGFiZWwiLCJyZWFkeUZvckNoYW5nZSIsInN0YXRlIiwiT2JqZWN0Iiwia2V5cyIsImV2ZXJ5Iiwia2V5IiwiRGF0ZUVsZW1lbnQiLCJwcm9wcyIsInR5cGUiLCJyYW5nZSIsInNlbGVjdCIsInJvb3RJZCIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJhdXRvZm9jdXMiLCJyZWdpc3RyeSIsIm9uQmx1ciIsImlkIiwiU2VsZWN0V2lkZ2V0Iiwid2lkZ2V0cyIsImVudW1PcHRpb25zIiwiQWx0RGF0ZVdpZGdldCIsInByb3BlcnR5Iiwic2V0U3RhdGUiLCJvbkNoYW5nZSIsInRpbWUiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwibm93RGF0ZU9iaiIsIkRhdGUiLCJ0b0pTT04iLCJ1bmRlZmluZWQiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwiZGF0YSIsInllYXJzUmFuZ2UiLCJkYXRlRWxlbWVudFByb3BzIiwibWFwIiwiZWxlbVByb3BzIiwiaGlkZU5vd0J1dHRvbiIsInNldE5vdyIsImhpZGVDbGVhckJ1dHRvbiIsImNsZWFyIiwiZ2V0RnVsbFllYXIiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzY2hlbWEiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwic3RyaW5nIiwicmVxdWlyZWQiLCJib29sIiwiZnVuYyJdLCJtYXBwaW5n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O0FBWEssR0FBMUI7QUFhRDs7QUFFRCxlQUFlcEMsYUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuaW1wb3J0IHsgc2hvdWxkUmVuZGVyLCBwYXJzZURhdGVTdHJpbmcsIHRvRGF0ZVN0cmluZywgcGFkIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5mdW5jdGlvbiByYW5nZU9wdGlvbnMoc3RhcnQsIHN0b3ApIHtcclxuICBsZXQgb3B0aW9ucyA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBzdG9wOyBpKyspIHtcclxuICAgIG9wdGlvbnMucHVzaCh7IHZhbHVlOiBpLCBsYWJlbDogcGFkKGksIDIpIH0pO1xyXG4gIH1cclxuICByZXR1cm4gb3B0aW9ucztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZHlGb3JDaGFuZ2Uoc3RhdGUpIHtcclxuICByZXR1cm4gT2JqZWN0LmtleXMoc3RhdGUpLmV2ZXJ5KGtleSA9PiBzdGF0ZVtrZXldICE9PSAtMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIERhdGVFbGVtZW50KHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgdHlwZSxcclxuICAgIHJhbmdlLFxyXG4gICAgdmFsdWUsXHJcbiAgICBzZWxlY3QsXHJcbiAgICByb290SWQsXHJcbiAgICBkaXNhYmxlZCxcclxuICAgIHJlYWRvbmx5LFxyXG4gICAgYXV0b2ZvY3VzLFxyXG4gICAgcmVnaXN0cnksXHJcbiAgICBvbkJsdXIsXHJcbiAgfSA9IHByb3BzO1xyXG4gIGNvbnN0IGlkID0gcm9vdElkICsgXCJfXCIgKyB0eXBlO1xyXG4gIGNvbnN0IHsgU2VsZWN0V2lkZ2V0IH0gPSByZWdpc3RyeS53aWRnZXRzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8U2VsZWN0V2lkZ2V0XHJcbiAgICAgIHNjaGVtYT17eyB0eXBlOiBcImludGVnZXJcIiB9fVxyXG4gICAgICBpZD17aWR9XHJcbiAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgIG9wdGlvbnM9e3sgZW51bU9wdGlvbnM6IHJhbmdlT3B0aW9ucyhyYW5nZVswXSwgcmFuZ2VbMV0pIH19XHJcbiAgICAgIHBsYWNlaG9sZGVyPXt0eXBlfVxyXG4gICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHNlbGVjdCh0eXBlLCB2YWx1ZSl9XHJcbiAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgLz5cclxuICApO1xyXG59XHJcblxyXG5jbGFzcyBBbHREYXRlV2lkZ2V0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdGltZTogZmFsc2UsXHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICByZWFkb25seTogZmFsc2UsXHJcbiAgICBhdXRvZm9jdXM6IGZhbHNlLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICB5ZWFyc1JhbmdlOiBbMTkwMCwgbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICsgMl0sXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0gcGFyc2VEYXRlU3RyaW5nKHByb3BzLnZhbHVlLCBwcm9wcy50aW1lKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xyXG4gICAgaWYgKFxyXG4gICAgICBwcmV2UHJvcHMudmFsdWUgJiZcclxuICAgICAgcHJldlByb3BzLnZhbHVlICE9PSBwYXJzZURhdGVTdHJpbmcodGhpcy5wcm9wcy52YWx1ZSwgdGhpcy5wcm9wcy50aW1lKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUocGFyc2VEYXRlU3RyaW5nKHRoaXMucHJvcHMudmFsdWUsIHRoaXMucHJvcHMudGltZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICByZXR1cm4gc2hvdWxkUmVuZGVyKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlID0gKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgeyBbcHJvcGVydHldOiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgPyAtMSA6IHZhbHVlIH0sXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICAvLyBPbmx5IHByb3BhZ2F0ZSB0byBwYXJlbnQgc3RhdGUgaWYgd2UgaGF2ZSBhIGNvbXBsZXRlIGRhdGV7dGltZX1cclxuICAgICAgICBpZiAocmVhZHlGb3JDaGFuZ2UodGhpcy5zdGF0ZSkpIHtcclxuICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodG9EYXRlU3RyaW5nKHRoaXMuc3RhdGUsIHRoaXMucHJvcHMudGltZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBzZXROb3cgPSBldmVudCA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgeyB0aW1lLCBkaXNhYmxlZCwgcmVhZG9ubHksIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKGRpc2FibGVkIHx8IHJlYWRvbmx5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IG5vd0RhdGVPYmogPSBwYXJzZURhdGVTdHJpbmcobmV3IERhdGUoKS50b0pTT04oKSwgdGltZSk7XHJcbiAgICB0aGlzLnNldFN0YXRlKG5vd0RhdGVPYmosICgpID0+IG9uQ2hhbmdlKHRvRGF0ZVN0cmluZyh0aGlzLnN0YXRlLCB0aW1lKSkpO1xyXG4gIH07XHJcblxyXG4gIGNsZWFyID0gZXZlbnQgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHsgdGltZSwgZGlzYWJsZWQsIHJlYWRvbmx5LCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmIChkaXNhYmxlZCB8fCByZWFkb25seSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHBhcnNlRGF0ZVN0cmluZyhcIlwiLCB0aW1lKSwgKCkgPT4gb25DaGFuZ2UodW5kZWZpbmVkKSk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0IGRhdGVFbGVtZW50UHJvcHMoKSB7XHJcbiAgICBjb25zdCB7IHRpbWUsIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgZGF0YSA9IFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IFwieWVhclwiLFxyXG4gICAgICAgIHJhbmdlOiBvcHRpb25zLnllYXJzUmFuZ2UsXHJcbiAgICAgICAgdmFsdWU6IHllYXIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgdHlwZTogXCJtb250aFwiLCByYW5nZTogWzEsIDEyXSwgdmFsdWU6IG1vbnRoIH0sXHJcbiAgICAgIHsgdHlwZTogXCJkYXlcIiwgcmFuZ2U6IFsxLCAzMV0sIHZhbHVlOiBkYXkgfSxcclxuICAgIF07XHJcbiAgICBpZiAodGltZSkge1xyXG4gICAgICBkYXRhLnB1c2goXHJcbiAgICAgICAgeyB0eXBlOiBcImhvdXJcIiwgcmFuZ2U6IFswLCAyM10sIHZhbHVlOiBob3VyIH0sXHJcbiAgICAgICAgeyB0eXBlOiBcIm1pbnV0ZVwiLCByYW5nZTogWzAsIDU5XSwgdmFsdWU6IG1pbnV0ZSB9LFxyXG4gICAgICAgIHsgdHlwZTogXCJzZWNvbmRcIiwgcmFuZ2U6IFswLCA1OV0sIHZhbHVlOiBzZWNvbmQgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIGF1dG9mb2N1cyxcclxuICAgICAgcmVnaXN0cnksXHJcbiAgICAgIG9uQmx1cixcclxuICAgICAgb3B0aW9ucyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtaW5saW5lXCI+XHJcbiAgICAgICAge3RoaXMuZGF0ZUVsZW1lbnRQcm9wcy5tYXAoKGVsZW1Qcm9wcywgaSkgPT4gKFxyXG4gICAgICAgICAgPGxpIGtleT17aX0+XHJcbiAgICAgICAgICAgIDxEYXRlRWxlbWVudFxyXG4gICAgICAgICAgICAgIHJvb3RJZD17aWR9XHJcbiAgICAgICAgICAgICAgc2VsZWN0PXt0aGlzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIHsuLi5lbGVtUHJvcHN9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXMgJiYgaSA9PT0gMH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgICAgeyhvcHRpb25zLmhpZGVOb3dCdXR0b24gIT09IFwidW5kZWZpbmVkXCJcclxuICAgICAgICAgID8gIW9wdGlvbnMuaGlkZU5vd0J1dHRvblxyXG4gICAgICAgICAgOiB0cnVlKSAmJiAoXHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGJ0bi1ub3dcIiBvbkNsaWNrPXt0aGlzLnNldE5vd30+XHJcbiAgICAgICAgICAgICAgTm93XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7KG9wdGlvbnMuaGlkZUNsZWFyQnV0dG9uICE9PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgICA/ICFvcHRpb25zLmhpZGVDbGVhckJ1dHRvblxyXG4gICAgICAgICAgOiB0cnVlKSAmJiAoXHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgaHJlZj1cIiNcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4td2FybmluZyBidG4tY2xlYXJcIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xlYXJ9PlxyXG4gICAgICAgICAgICAgIENsZWFyXHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC91bD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQWx0RGF0ZVdpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGF1dG9mb2N1czogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdGltZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFsdERhdGVXaWRnZXQ7XHJcbiJdfQ==