"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function UpDownWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/_react.default.createElement(BaseInput, _extends({
    type: "number"
  }, props, (0, _utils.rangeSpec)(props.schema)));
}

if (process.env.NODE_ENV !== "production") {
  UpDownWidget.propTypes = {
    value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
  };
}

var _default = UpDownWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvVXBEb3duV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIlVwRG93bldpZGdldCIsInByb3BzIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwic2NoZW1hIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidmFsdWUiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUEsU0FBU0EsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFDM0IsTUFFZUMsU0FGZixHQUlJRCxLQUpKLENBQ0VFLFFBREYsQ0FFSUMsT0FGSixDQUVlRixTQUZmO0FBS0Esc0JBQU8sNkJBQUMsU0FBRDtBQUFXLElBQUEsSUFBSSxFQUFDO0FBQWhCLEtBQTZCRCxLQUE3QixFQUF3QyxzQkFBVUEsS0FBSyxDQUFDSSxNQUFoQixDQUF4QyxFQUFQO0FBQ0Q7O0FBRUQsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNSLEVBQUFBLFlBQVksQ0FBQ1MsU0FBYixHQUF5QjtBQUN2QkMsSUFBQUEsS0FBSyxFQUFFQyxtQkFBVUMsU0FBVixDQUFvQixDQUFDRCxtQkFBVUUsTUFBWCxFQUFtQkYsbUJBQVVHLE1BQTdCLENBQXBCO0FBRGdCLEdBQXpCO0FBR0Q7O2VBRWNkLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IHJhbmdlU3BlYyB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gVXBEb3duV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgcmVnaXN0cnk6IHtcclxuICAgICAgd2lkZ2V0czogeyBCYXNlSW5wdXQgfSxcclxuICAgIH0sXHJcbiAgfSA9IHByb3BzO1xyXG4gIHJldHVybiA8QmFzZUlucHV0IHR5cGU9XCJudW1iZXJcIiB7Li4ucHJvcHN9IHsuLi5yYW5nZVNwZWMocHJvcHMuc2NoZW1hKX0gLz47XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBVcERvd25XaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVcERvd25XaWRnZXQ7XHJcbiJdfQ==