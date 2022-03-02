import React from "react";
export default function ErrorList(props) {
  var errors = props.errors;
  return /*#__PURE__*/React.createElement("div", {
    className: "panel panel-danger errors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "panel-title"
  }, "Errors")), /*#__PURE__*/React.createElement("ul", {
    className: "list-group"
  }, errors.map(function (error, i) {
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "list-group-item text-danger"
    }, error.stack);
  })));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Vycm9yTGlzdC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkVycm9yTGlzdCIsInByb3BzIiwiZXJyb3JzIiwibWFwIiwiZXJyb3IiLCJpIiwic3RhY2siXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFFQSxlQUFlLFNBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQ3ZDLE1BQVFDLE1BQVIsR0FBbUJELEtBQW5CLENBQVFDLE1BQVI7QUFDQSxzQkFDRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsa0JBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLGtCQUNFO0FBQUksSUFBQSxTQUFTLEVBQUM7QUFBZCxjQURGLENBREYsZUFJRTtBQUFJLElBQUEsU0FBUyxFQUFDO0FBQWQsS0FDR0EsTUFBTSxDQUFDQyxHQUFQLENBQVcsVUFBQ0MsS0FBRCxFQUFRQyxDQUFSLEVBQWM7QUFDeEIsd0JBQ0U7QUFBSSxNQUFBLEdBQUcsRUFBRUEsQ0FBVDtBQUFZLE1BQUEsU0FBUyxFQUFDO0FBQXRCLE9BQ0dELEtBQUssQ0FBQ0UsS0FEVCxDQURGO0FBS0QsR0FOQSxDQURILENBSkYsQ0FERjtBQWdCRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVycm9yTGlzdChwcm9wcykge1xyXG4gIGNvbnN0IHsgZXJyb3JzIH0gPSBwcm9wcztcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kYW5nZXIgZXJyb3JzXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPkVycm9yczwvaDM+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgIHtlcnJvcnMubWFwKChlcnJvciwgaSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxpIGtleT17aX0gY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIHRleHQtZGFuZ2VyXCI+XHJcbiAgICAgICAgICAgICAge2Vycm9yLnN0YWNrfVxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KX1cclxuICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl19