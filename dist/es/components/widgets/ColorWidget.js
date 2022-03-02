function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";

function ColorWidget(props) {
  var disabled = props.disabled,
      readonly = props.readonly,
      BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/React.createElement(BaseInput, _extends({
    type: "color"
  }, props, {
    disabled: disabled || readonly
  }));
}

if (process.env.NODE_ENV !== "production") {
  ColorWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func
  };
}

export default ColorWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQ29sb3JXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJDb2xvcldpZGdldCIsInByb3BzIiwiZGlzYWJsZWQiLCJyZWFkb25seSIsIkJhc2VJbnB1dCIsInJlZ2lzdHJ5Iiwid2lkZ2V0cyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsInNjaGVtYSIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJpZCIsInN0cmluZyIsInZhbHVlIiwicmVxdWlyZWQiLCJib29sIiwiYXV0b2ZvY3VzIiwib25DaGFuZ2UiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztBQUVBLFNBQVNDLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQzFCLE1BQ0VDLFFBREYsR0FNSUQsS0FOSixDQUNFQyxRQURGO0FBQUEsTUFFRUMsUUFGRixHQU1JRixLQU5KLENBRUVFLFFBRkY7QUFBQSxNQUllQyxTQUpmLEdBTUlILEtBTkosQ0FHRUksUUFIRixDQUlJQyxPQUpKLENBSWVGLFNBSmY7QUFPQSxzQkFBTyxvQkFBQyxTQUFEO0FBQVcsSUFBQSxJQUFJLEVBQUM7QUFBaEIsS0FBNEJILEtBQTVCO0FBQW1DLElBQUEsUUFBUSxFQUFFQyxRQUFRLElBQUlDO0FBQXpELEtBQVA7QUFDRDs7QUFFRCxJQUFJSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1QsRUFBQUEsV0FBVyxDQUFDVSxTQUFaLEdBQXdCO0FBQ3RCQyxJQUFBQSxNQUFNLEVBQUVaLFNBQVMsQ0FBQ2EsTUFBVixDQUFpQkMsVUFESDtBQUV0QkMsSUFBQUEsRUFBRSxFQUFFZixTQUFTLENBQUNnQixNQUFWLENBQWlCRixVQUZDO0FBR3RCRyxJQUFBQSxLQUFLLEVBQUVqQixTQUFTLENBQUNnQixNQUhLO0FBSXRCRSxJQUFBQSxRQUFRLEVBQUVsQixTQUFTLENBQUNtQixJQUpFO0FBS3RCaEIsSUFBQUEsUUFBUSxFQUFFSCxTQUFTLENBQUNtQixJQUxFO0FBTXRCZixJQUFBQSxRQUFRLEVBQUVKLFNBQVMsQ0FBQ21CLElBTkU7QUFPdEJDLElBQUFBLFNBQVMsRUFBRXBCLFNBQVMsQ0FBQ21CLElBUEM7QUFRdEJFLElBQUFBLFFBQVEsRUFBRXJCLFNBQVMsQ0FBQ3NCO0FBUkUsR0FBeEI7QUFVRDs7QUFFRCxlQUFlckIsV0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZnVuY3Rpb24gQ29sb3JXaWRnZXQocHJvcHMpIHtcclxuICBjb25zdCB7XHJcbiAgICBkaXNhYmxlZCxcclxuICAgIHJlYWRvbmx5LFxyXG4gICAgcmVnaXN0cnk6IHtcclxuICAgICAgd2lkZ2V0czogeyBCYXNlSW5wdXQgfSxcclxuICAgIH0sXHJcbiAgfSA9IHByb3BzO1xyXG4gIHJldHVybiA8QmFzZUlucHV0IHR5cGU9XCJjb2xvclwiIHsuLi5wcm9wc30gZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHJlYWRvbmx5fSAvPjtcclxufVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIENvbG9yV2lkZ2V0LnByb3BUeXBlcyA9IHtcclxuICAgIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgcmVhZG9ubHk6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgYXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2xvcldpZGdldDtcclxuIl19