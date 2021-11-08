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
  return React.createElement(SelectWidget, {
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
      return React.createElement("ul", {
        className: "list-inline"
      }, this.dateElementProps.map(function (elemProps, i) {
        return React.createElement("li", {
          key: i
        }, React.createElement(DateElement, _extends({
          rootId: id,
          select: _this2.onChange
        }, elemProps, {
          disabled: disabled,
          readonly: readonly,
          registry: registry,
          onBlur: onBlur,
          autofocus: autofocus && i === 0
        })));
      }), (options.hideNowButton !== "undefined" ? !options.hideNowButton : true) && React.createElement("li", null, React.createElement("a", {
        href: "#",
        className: "btn btn-info btn-now",
        onClick: this.setNow
      }, "Now")), (options.hideClearButton !== "undefined" ? !options.hideClearButton : true) && React.createElement("li", null, React.createElement("a", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsInNob3VsZFJlbmRlciIsInBhcnNlRGF0ZVN0cmluZyIsInRvRGF0ZVN0cmluZyIsInBhZCIsInJhbmdlT3B0aW9ucyIsInN0YXJ0Iiwic3RvcCIsIm9wdGlvbnMiLCJpIiwicHVzaCIsInZhbHVlIiwibGFiZWwiLCJyZWFkeUZvckNoYW5nZSIsInN0YXRlIiwiT2JqZWN0Iiwia2V5cyIsImV2ZXJ5Iiwia2V5IiwiRGF0ZUVsZW1lbnQiLCJwcm9wcyIsInR5cGUiLCJyYW5nZSIsInNlbGVjdCIsInJvb3RJZCIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJhdXRvZm9jdXMiLCJyZWdpc3RyeSIsIm9uQmx1ciIsImlkIiwiU2VsZWN0V2lkZ2V0Iiwid2lkZ2V0cyIsImVudW1PcHRpb25zIiwiQWx0RGF0ZVdpZGdldCIsInByb3BlcnR5Iiwic2V0U3RhdGUiLCJvbkNoYW5nZSIsInRpbWUiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwibm93RGF0ZU9iaiIsIkRhdGUiLCJ0b0pTT04iLCJ1bmRlZmluZWQiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJkYXRlRWxlbWVudFByb3BzIiwibWFwIiwiZWxlbVByb3BzIiwiaGlkZU5vd0J1dHRvbiIsInNldE5vdyIsImhpZGVDbGVhckJ1dHRvbiIsImNsZWFyIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImRhdGEiLCJ5ZWFyc1JhbmdlIiwiZ2V0RnVsbFllYXIiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzY2hlbWEiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwic3RyaW5nIiwicmVxdWlyZWQiLCJib29sIiwiZnVuYyJdLCJtYXBwaW5ncyI6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R0FBMUI7QUFhRDs7QUFFRCxlQUFlcEMsYUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuaW1wb3J0IHsgc2hvdWxkUmVuZGVyLCBwYXJzZURhdGVTdHJpbmcsIHRvRGF0ZVN0cmluZywgcGFkIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5mdW5jdGlvbiByYW5nZU9wdGlvbnMoc3RhcnQsIHN0b3ApIHtcclxuICBsZXQgb3B0aW9ucyA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBzdG9wOyBpKyspIHtcclxuICAgIG9wdGlvbnMucHVzaCh7IHZhbHVlOiBpLCBsYWJlbDogcGFkKGksIDIpIH0pO1xyXG4gIH1cclxuICByZXR1cm4gb3B0aW9ucztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZHlGb3JDaGFuZ2Uoc3RhdGUpIHtcclxuICByZXR1cm4gT2JqZWN0LmtleXMoc3RhdGUpLmV2ZXJ5KGtleSA9PiBzdGF0ZVtrZXldICE9PSAtMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIERhdGVFbGVtZW50KHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgdHlwZSxcclxuICAgIHJhbmdlLFxyXG4gICAgdmFsdWUsXHJcbiAgICBzZWxlY3QsXHJcbiAgICByb290SWQsXHJcbiAgICBkaXNhYmxlZCxcclxuICAgIHJlYWRvbmx5LFxyXG4gICAgYXV0b2ZvY3VzLFxyXG4gICAgcmVnaXN0cnksXHJcbiAgICBvbkJsdXIsXHJcbiAgfSA9IHByb3BzO1xyXG4gIGNvbnN0IGlkID0gcm9vdElkICsgXCJfXCIgKyB0eXBlO1xyXG4gIGNvbnN0IHsgU2VsZWN0V2lkZ2V0IH0gPSByZWdpc3RyeS53aWRnZXRzO1xyXG4gIHJldHVybiAoXHJcbiAgICA8U2VsZWN0V2lkZ2V0XHJcbiAgICAgIHNjaGVtYT17eyB0eXBlOiBcImludGVnZXJcIiB9fVxyXG4gICAgICBpZD17aWR9XHJcbiAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgIG9wdGlvbnM9e3sgZW51bU9wdGlvbnM6IHJhbmdlT3B0aW9ucyhyYW5nZVswXSwgcmFuZ2VbMV0pIH19XHJcbiAgICAgIHBsYWNlaG9sZGVyPXt0eXBlfVxyXG4gICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHNlbGVjdCh0eXBlLCB2YWx1ZSl9XHJcbiAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgLz5cclxuICApO1xyXG59XHJcblxyXG5jbGFzcyBBbHREYXRlV2lkZ2V0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdGltZTogZmFsc2UsXHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICByZWFkb25seTogZmFsc2UsXHJcbiAgICBhdXRvZm9jdXM6IGZhbHNlLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICB5ZWFyc1JhbmdlOiBbMTkwMCwgbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICsgMl0sXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0gcGFyc2VEYXRlU3RyaW5nKHByb3BzLnZhbHVlLCBwcm9wcy50aW1lKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xyXG4gICAgaWYgKFxyXG4gICAgICBwcmV2UHJvcHMudmFsdWUgJiZcclxuICAgICAgcHJldlByb3BzLnZhbHVlICE9PSBwYXJzZURhdGVTdHJpbmcodGhpcy5wcm9wcy52YWx1ZSwgdGhpcy5wcm9wcy50aW1lKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUocGFyc2VEYXRlU3RyaW5nKHRoaXMucHJvcHMudmFsdWUsIHRoaXMucHJvcHMudGltZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICByZXR1cm4gc2hvdWxkUmVuZGVyKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlID0gKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgeyBbcHJvcGVydHldOiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgPyAtMSA6IHZhbHVlIH0sXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICAvLyBPbmx5IHByb3BhZ2F0ZSB0byBwYXJlbnQgc3RhdGUgaWYgd2UgaGF2ZSBhIGNvbXBsZXRlIGRhdGV7dGltZX1cclxuICAgICAgICBpZiAocmVhZHlGb3JDaGFuZ2UodGhpcy5zdGF0ZSkpIHtcclxuICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodG9EYXRlU3RyaW5nKHRoaXMuc3RhdGUsIHRoaXMucHJvcHMudGltZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBzZXROb3cgPSBldmVudCA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgeyB0aW1lLCBkaXNhYmxlZCwgcmVhZG9ubHksIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKGRpc2FibGVkIHx8IHJlYWRvbmx5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IG5vd0RhdGVPYmogPSBwYXJzZURhdGVTdHJpbmcobmV3IERhdGUoKS50b0pTT04oKSwgdGltZSk7XHJcbiAgICB0aGlzLnNldFN0YXRlKG5vd0RhdGVPYmosICgpID0+IG9uQ2hhbmdlKHRvRGF0ZVN0cmluZyh0aGlzLnN0YXRlLCB0aW1lKSkpO1xyXG4gIH07XHJcblxyXG4gIGNsZWFyID0gZXZlbnQgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHsgdGltZSwgZGlzYWJsZWQsIHJlYWRvbmx5LCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmIChkaXNhYmxlZCB8fCByZWFkb25seSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHBhcnNlRGF0ZVN0cmluZyhcIlwiLCB0aW1lKSwgKCkgPT4gb25DaGFuZ2UodW5kZWZpbmVkKSk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0IGRhdGVFbGVtZW50UHJvcHMoKSB7XHJcbiAgICBjb25zdCB7IHRpbWUsIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgZGF0YSA9IFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IFwieWVhclwiLFxyXG4gICAgICAgIHJhbmdlOiBvcHRpb25zLnllYXJzUmFuZ2UsXHJcbiAgICAgICAgdmFsdWU6IHllYXIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgdHlwZTogXCJtb250aFwiLCByYW5nZTogWzEsIDEyXSwgdmFsdWU6IG1vbnRoIH0sXHJcbiAgICAgIHsgdHlwZTogXCJkYXlcIiwgcmFuZ2U6IFsxLCAzMV0sIHZhbHVlOiBkYXkgfSxcclxuICAgIF07XHJcbiAgICBpZiAodGltZSkge1xyXG4gICAgICBkYXRhLnB1c2goXHJcbiAgICAgICAgeyB0eXBlOiBcImhvdXJcIiwgcmFuZ2U6IFswLCAyM10sIHZhbHVlOiBob3VyIH0sXHJcbiAgICAgICAgeyB0eXBlOiBcIm1pbnV0ZVwiLCByYW5nZTogWzAsIDU5XSwgdmFsdWU6IG1pbnV0ZSB9LFxyXG4gICAgICAgIHsgdHlwZTogXCJzZWNvbmRcIiwgcmFuZ2U6IFswLCA1OV0sIHZhbHVlOiBzZWNvbmQgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIGF1dG9mb2N1cyxcclxuICAgICAgcmVnaXN0cnksXHJcbiAgICAgIG9uQmx1cixcclxuICAgICAgb3B0aW9ucyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtaW5saW5lXCI+XHJcbiAgICAgICAge3RoaXMuZGF0ZUVsZW1lbnRQcm9wcy5tYXAoKGVsZW1Qcm9wcywgaSkgPT4gKFxyXG4gICAgICAgICAgPGxpIGtleT17aX0+XHJcbiAgICAgICAgICAgIDxEYXRlRWxlbWVudFxyXG4gICAgICAgICAgICAgIHJvb3RJZD17aWR9XHJcbiAgICAgICAgICAgICAgc2VsZWN0PXt0aGlzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIHsuLi5lbGVtUHJvcHN9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cclxuICAgICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXMgJiYgaSA9PT0gMH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgICAgeyhvcHRpb25zLmhpZGVOb3dCdXR0b24gIT09IFwidW5kZWZpbmVkXCJcclxuICAgICAgICAgID8gIW9wdGlvbnMuaGlkZU5vd0J1dHRvblxyXG4gICAgICAgICAgOiB0cnVlKSAmJiAoXHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGJ0bi1ub3dcIiBvbkNsaWNrPXt0aGlzLnNldE5vd30+XHJcbiAgICAgICAgICAgICAgTm93XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7KG9wdGlvbnMuaGlkZUNsZWFyQnV0dG9uICE9PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgICA/ICFvcHRpb25zLmhpZGVDbGVhckJ1dHRvblxyXG4gICAgICAgICAgOiB0cnVlKSAmJiAoXHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgaHJlZj1cIiNcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4td2FybmluZyBidG4tY2xlYXJcIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xlYXJ9PlxyXG4gICAgICAgICAgICAgIENsZWFyXHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC91bD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQWx0RGF0ZVdpZGdldC5wcm9wVHlwZXMgPSB7XHJcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGF1dG9mb2N1czogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdGltZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFsdERhdGVXaWRnZXQ7XHJcbiJdfQ==