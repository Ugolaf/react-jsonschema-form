function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";

function URLWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return /*#__PURE__*/React.createElement(BaseInput, _extends({
    type: "url"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  URLWidget.propTypes = {
    value: PropTypes.string
  };
}

export default URLWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvVVJMV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiVVJMV2lkZ2V0IiwicHJvcHMiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJ2YWx1ZSIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUN4QixNQUFRQyxTQUFSLEdBQXNCRCxLQUFLLENBQUNFLFFBQU4sQ0FBZUMsT0FBckMsQ0FBUUYsU0FBUjtBQUNBLHNCQUFPLG9CQUFDLFNBQUQ7QUFBVyxJQUFBLElBQUksRUFBQztBQUFoQixLQUEwQkQsS0FBMUIsRUFBUDtBQUNEOztBQUVELElBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDUCxFQUFBQSxTQUFTLENBQUNRLFNBQVYsR0FBc0I7QUFDcEJDLElBQUFBLEtBQUssRUFBRVYsU0FBUyxDQUFDVztBQURHLEdBQXRCO0FBR0Q7O0FBRUQsZUFBZVYsU0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZnVuY3Rpb24gVVJMV2lkZ2V0KHByb3BzKSB7XHJcbiAgY29uc3QgeyBCYXNlSW5wdXQgfSA9IHByb3BzLnJlZ2lzdHJ5LndpZGdldHM7XHJcbiAgcmV0dXJuIDxCYXNlSW5wdXQgdHlwZT1cInVybFwiIHsuLi5wcm9wc30gLz47XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBVUkxXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVVJMV2lkZ2V0O1xyXG4iXX0=