function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

import { Component } from "react";
import * as types from "../../types";

var NullField = /*#__PURE__*/function (_Component) {
  _inherits(NullField, _Component);

  var _super = _createSuper(NullField);

  function NullField() {
    _classCallCheck(this, NullField);

    return _super.apply(this, arguments);
  }

  _createClass(NullField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.formData === undefined) {
        this.props.onChange(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return NullField;
}(Component);

if (process.env.NODE_ENV !== "production") {
  NullField.propTypes = types.fieldProps;
}

export default NullField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9OdWxsRmllbGQuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwidHlwZXMiLCJOdWxsRmllbGQiLCJwcm9wcyIsImZvcm1EYXRhIiwidW5kZWZpbmVkIiwib25DaGFuZ2UiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJmaWVsZFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsU0FBVCxRQUEwQixPQUExQjtBQUNBLE9BQU8sS0FBS0MsS0FBWixNQUF1QixhQUF2Qjs7SUFFTUMsUzs7Ozs7Ozs7Ozs7OztXQUNKLDZCQUFvQjtBQUNsQixVQUFJLEtBQUtDLEtBQUwsQ0FBV0MsUUFBWCxLQUF3QkMsU0FBNUIsRUFBdUM7QUFDckMsYUFBS0YsS0FBTCxDQUFXRyxRQUFYLENBQW9CLElBQXBCO0FBQ0Q7QUFDRjs7O1dBRUQsa0JBQVM7QUFDUCxhQUFPLElBQVA7QUFDRDs7OztFQVRxQk4sUzs7QUFZeEIsSUFBSU8sT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNQLEVBQUFBLFNBQVMsQ0FBQ1EsU0FBVixHQUFzQlQsS0FBSyxDQUFDVSxVQUE1QjtBQUNEOztBQUVELGVBQWVULFNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XHJcblxyXG5jbGFzcyBOdWxsRmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybURhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG51bGwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgTnVsbEZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bGxGaWVsZDtcclxuIl19