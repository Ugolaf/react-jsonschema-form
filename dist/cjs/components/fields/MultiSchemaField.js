"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

var _excluded = ["widget"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var AnyOfField = /*#__PURE__*/function (_Component) {
  _inherits(AnyOfField, _Component);

  var _super = _createSuper(AnyOfField);

  function AnyOfField(props) {
    var _this;

    _classCallCheck(this, AnyOfField);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onOptionChange", function (option) {
      var selectedOption = parseInt(option, 10);
      var _this$props = _this.props,
          formData = _this$props.formData,
          onChange = _this$props.onChange,
          options = _this$props.options,
          registry = _this$props.registry;
      var rootSchema = registry.rootSchema;
      var newOption = (0, _utils.retrieveSchema)(options[selectedOption], rootSchema, formData); // If the new option is of type object and the current data is an object,
      // discard properties added using the old option.

      var newFormData = undefined;

      if ((0, _utils.guessType)(formData) === "object" && (newOption.type === "object" || newOption.properties)) {
        newFormData = Object.assign({}, formData);
        var optionsToDiscard = options.slice();
        optionsToDiscard.splice(selectedOption, 1); // Discard any data added using other options

        var _iterator = _createForOfIteratorHelper(optionsToDiscard),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _option = _step.value;

            if (_option.properties) {
              for (var key in _option.properties) {
                if (newFormData.hasOwnProperty(key)) {
                  delete newFormData[key];
                }
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } // Call getDefaultFormState to make sure defaults are populated on change.


      onChange((0, _utils.getDefaultFormState)(options[selectedOption], newFormData, rootSchema));

      _this.setState({
        selectedOption: parseInt(option, 10)
      });
    });

    var _this$props2 = _this.props,
        _formData = _this$props2.formData,
        _options = _this$props2.options;
    _this.state = {
      selectedOption: _this.getMatchingOption(_formData, _options)
    };
    return _this;
  }

  _createClass(AnyOfField, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!(0, _utils.deepEquals)(this.props.formData, prevProps.formData) && this.props.idSchema.$id === prevProps.idSchema.$id) {
        var matchingOption = this.getMatchingOption(this.props.formData, this.props.options);

        if (!prevState || matchingOption === this.state.selectedOption) {
          return;
        }

        this.setState({
          selectedOption: matchingOption
        });
      }
    }
  }, {
    key: "getMatchingOption",
    value: function getMatchingOption(formData, options) {
      var rootSchema = this.props.registry.rootSchema;
      var option = (0, _utils.getMatchingOption)(formData, options, rootSchema);

      if (option !== 0) {
        return option;
      } // If the form data matches none of the options, use the currently selected
      // option, assuming it's available; otherwise use the first option


      return this && this.state ? this.state.selectedOption : 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          baseType = _this$props3.baseType,
          disabled = _this$props3.disabled,
          errorSchema = _this$props3.errorSchema,
          formData = _this$props3.formData,
          idPrefix = _this$props3.idPrefix,
          idSeparator = _this$props3.idSeparator,
          idSchema = _this$props3.idSchema,
          onBlur = _this$props3.onBlur,
          onChange = _this$props3.onChange,
          onFocus = _this$props3.onFocus,
          options = _this$props3.options,
          registry = _this$props3.registry,
          uiSchema = _this$props3.uiSchema,
          schema = _this$props3.schema;
      var _SchemaField = registry.fields.SchemaField;
      var widgets = registry.widgets;
      var selectedOption = this.state.selectedOption;

      var _getUiOptions = (0, _utils.getUiOptions)(uiSchema),
          _getUiOptions$widget = _getUiOptions.widget,
          widget = _getUiOptions$widget === void 0 ? "select" : _getUiOptions$widget,
          uiOptions = _objectWithoutProperties(_getUiOptions, _excluded);

      var Widget = (0, _utils.getWidget)({
        type: "number"
      }, widget, widgets);
      var option = options[selectedOption] || null;
      var optionSchema;

      if (option) {
        // If the subschema doesn't declare a type, infer the type from the
        // parent schema
        optionSchema = option.type ? option : Object.assign({}, option, {
          type: baseType
        });
      }

      var enumOptions = options.map(function (option, index) {
        return {
          label: option.title || "Option ".concat(index + 1),
          value: index
        };
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "panel panel-default panel-body"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(Widget, _extends({
        id: "".concat(idSchema.$id).concat(schema.oneOf ? "__oneof_select" : "__anyof_select"),
        schema: {
          type: "number",
          default: 0
        },
        onChange: this.onOptionChange,
        onBlur: onBlur,
        onFocus: onFocus,
        value: selectedOption,
        options: {
          enumOptions: enumOptions
        }
      }, uiOptions))), option !== null && /*#__PURE__*/_react.default.createElement(_SchemaField, {
        schema: optionSchema,
        uiSchema: uiSchema,
        errorSchema: errorSchema,
        idSchema: idSchema,
        idPrefix: idPrefix,
        idSeparator: idSeparator,
        formData: formData,
        onChange: onChange,
        onBlur: onBlur,
        onFocus: onFocus,
        registry: registry,
        disabled: disabled
      }));
    }
  }]);

  return AnyOfField;
}(_react.Component);

AnyOfField.defaultProps = {
  disabled: false,
  errorSchema: {},
  idSchema: {},
  uiSchema: {}
};

if (process.env.NODE_ENV !== "production") {
  AnyOfField.propTypes = {
    options: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
    baseType: _propTypes.default.string,
    uiSchema: _propTypes.default.object,
    idSchema: _propTypes.default.object,
    formData: _propTypes.default.any,
    errorSchema: _propTypes.default.object,
    registry: types.registry.isRequired
  };
}

var _default = AnyOfField;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9NdWx0aVNjaGVtYUZpZWxkLmpzIl0sIm5hbWVzIjpbIkFueU9mRmllbGQiLCJwcm9wcyIsIm9wdGlvbiIsInNlbGVjdGVkT3B0aW9uIiwicGFyc2VJbnQiLCJmb3JtRGF0YSIsIm9uQ2hhbmdlIiwib3B0aW9ucyIsInJlZ2lzdHJ5Iiwicm9vdFNjaGVtYSIsIm5ld09wdGlvbiIsIm5ld0Zvcm1EYXRhIiwidW5kZWZpbmVkIiwidHlwZSIsInByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJvcHRpb25zVG9EaXNjYXJkIiwic2xpY2UiLCJzcGxpY2UiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInNldFN0YXRlIiwic3RhdGUiLCJnZXRNYXRjaGluZ09wdGlvbiIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImlkU2NoZW1hIiwiJGlkIiwibWF0Y2hpbmdPcHRpb24iLCJiYXNlVHlwZSIsImRpc2FibGVkIiwiZXJyb3JTY2hlbWEiLCJpZFByZWZpeCIsImlkU2VwYXJhdG9yIiwib25CbHVyIiwib25Gb2N1cyIsInVpU2NoZW1hIiwic2NoZW1hIiwiX1NjaGVtYUZpZWxkIiwiZmllbGRzIiwiU2NoZW1hRmllbGQiLCJ3aWRnZXRzIiwid2lkZ2V0IiwidWlPcHRpb25zIiwiV2lkZ2V0Iiwib3B0aW9uU2NoZW1hIiwiZW51bU9wdGlvbnMiLCJtYXAiLCJpbmRleCIsImxhYmVsIiwidGl0bGUiLCJ2YWx1ZSIsIm9uZU9mIiwiZGVmYXVsdCIsIm9uT3B0aW9uQ2hhbmdlIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYXJyYXlPZiIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJhbnkiLCJ0eXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7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RUFBQUEsVUFBVSxDQUFDNkQsU0FBWCxHQUF1QjtBQUNyQnRELElBQUFBLE9BQU8sRUFBRXVELG1CQUFVQyxPQUFWLENBQWtCRCxtQkFBVUUsTUFBNUIsRUFBb0NDLFVBRHhCO0FBRXJCbkMsSUFBQUEsUUFBUSxFQUFFZ0MsbUJBQVVJLE1BRkM7QUFHckI3QixJQUFBQSxRQUFRLEVBQUV5QixtQkFBVUUsTUFIQztBQUlyQnJDLElBQUFBLFFBQVEsRUFBRW1DLG1CQUFVRSxNQUpDO0FBS3JCM0QsSUFBQUEsUUFBUSxFQUFFeUQsbUJBQVVLLEdBTEM7QUFNckJuQyxJQUFBQSxXQUFXLEVBQUU4QixtQkFBVUUsTUFORjtBQU9yQnhELElBQUFBLFFBQVEsRUFBRTRELEtBQUssQ0FBQzVELFFBQU4sQ0FBZXlEO0FBUEosR0FBdkI7QUFTRDs7ZUFFY2pFLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0VWlPcHRpb25zLFxyXG4gIGdldFdpZGdldCxcclxuICBndWVzc1R5cGUsXHJcbiAgcmV0cmlldmVTY2hlbWEsXHJcbiAgZ2V0RGVmYXVsdEZvcm1TdGF0ZSxcclxuICBnZXRNYXRjaGluZ09wdGlvbixcclxuICBkZWVwRXF1YWxzLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuY2xhc3MgQW55T2ZGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICBjb25zdCB7IGZvcm1EYXRhLCBvcHRpb25zIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNlbGVjdGVkT3B0aW9uOiB0aGlzLmdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCBvcHRpb25zKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuICAgIGlmIChcclxuICAgICAgIWRlZXBFcXVhbHModGhpcy5wcm9wcy5mb3JtRGF0YSwgcHJldlByb3BzLmZvcm1EYXRhKSAmJlxyXG4gICAgICB0aGlzLnByb3BzLmlkU2NoZW1hLiRpZCA9PT0gcHJldlByb3BzLmlkU2NoZW1hLiRpZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IG1hdGNoaW5nT3B0aW9uID0gdGhpcy5nZXRNYXRjaGluZ09wdGlvbihcclxuICAgICAgICB0aGlzLnByb3BzLmZvcm1EYXRhLFxyXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9uc1xyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCFwcmV2U3RhdGUgfHwgbWF0Y2hpbmdPcHRpb24gPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRPcHRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHNlbGVjdGVkT3B0aW9uOiBtYXRjaGluZ09wdGlvbixcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgb3B0aW9ucykge1xyXG4gICAgY29uc3QgeyByb290U2NoZW1hIH0gPSB0aGlzLnByb3BzLnJlZ2lzdHJ5O1xyXG5cclxuICAgIGxldCBvcHRpb24gPSBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgb3B0aW9ucywgcm9vdFNjaGVtYSk7XHJcbiAgICBpZiAob3B0aW9uICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICB9XHJcbiAgICAvLyBJZiB0aGUgZm9ybSBkYXRhIG1hdGNoZXMgbm9uZSBvZiB0aGUgb3B0aW9ucywgdXNlIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWRcclxuICAgIC8vIG9wdGlvbiwgYXNzdW1pbmcgaXQncyBhdmFpbGFibGU7IG90aGVyd2lzZSB1c2UgdGhlIGZpcnN0IG9wdGlvblxyXG4gICAgcmV0dXJuIHRoaXMgJiYgdGhpcy5zdGF0ZSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWRPcHRpb24gOiAwO1xyXG4gIH1cclxuXHJcbiAgb25PcHRpb25DaGFuZ2UgPSBvcHRpb24gPT4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBwYXJzZUludChvcHRpb24sIDEwKTtcclxuICAgIGNvbnN0IHsgZm9ybURhdGEsIG9uQ2hhbmdlLCBvcHRpb25zLCByZWdpc3RyeSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgcm9vdFNjaGVtYSB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCBuZXdPcHRpb24gPSByZXRyaWV2ZVNjaGVtYShcclxuICAgICAgb3B0aW9uc1tzZWxlY3RlZE9wdGlvbl0sXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhXHJcbiAgICApO1xyXG5cclxuICAgIC8vIElmIHRoZSBuZXcgb3B0aW9uIGlzIG9mIHR5cGUgb2JqZWN0IGFuZCB0aGUgY3VycmVudCBkYXRhIGlzIGFuIG9iamVjdCxcclxuICAgIC8vIGRpc2NhcmQgcHJvcGVydGllcyBhZGRlZCB1c2luZyB0aGUgb2xkIG9wdGlvbi5cclxuICAgIGxldCBuZXdGb3JtRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgIGlmIChcclxuICAgICAgZ3Vlc3NUeXBlKGZvcm1EYXRhKSA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAobmV3T3B0aW9uLnR5cGUgPT09IFwib2JqZWN0XCIgfHwgbmV3T3B0aW9uLnByb3BlcnRpZXMpXHJcbiAgICApIHtcclxuICAgICAgbmV3Rm9ybURhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBmb3JtRGF0YSk7XHJcblxyXG4gICAgICBjb25zdCBvcHRpb25zVG9EaXNjYXJkID0gb3B0aW9ucy5zbGljZSgpO1xyXG4gICAgICBvcHRpb25zVG9EaXNjYXJkLnNwbGljZShzZWxlY3RlZE9wdGlvbiwgMSk7XHJcblxyXG4gICAgICAvLyBEaXNjYXJkIGFueSBkYXRhIGFkZGVkIHVzaW5nIG90aGVyIG9wdGlvbnNcclxuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2Ygb3B0aW9uc1RvRGlzY2FyZCkge1xyXG4gICAgICAgIGlmIChvcHRpb24ucHJvcGVydGllcykge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9uLnByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKG5ld0Zvcm1EYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICBkZWxldGUgbmV3Rm9ybURhdGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ2FsbCBnZXREZWZhdWx0Rm9ybVN0YXRlIHRvIG1ha2Ugc3VyZSBkZWZhdWx0cyBhcmUgcG9wdWxhdGVkIG9uIGNoYW5nZS5cclxuICAgIG9uQ2hhbmdlKFxyXG4gICAgICBnZXREZWZhdWx0Rm9ybVN0YXRlKG9wdGlvbnNbc2VsZWN0ZWRPcHRpb25dLCBuZXdGb3JtRGF0YSwgcm9vdFNjaGVtYSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHNlbGVjdGVkT3B0aW9uOiBwYXJzZUludChvcHRpb24sIDEwKSxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgYmFzZVR5cGUsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBpZFNlcGFyYXRvcixcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIG9uQmx1cixcclxuICAgICAgb25DaGFuZ2UsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICAgIHJlZ2lzdHJ5LFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgc2NoZW1hLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgX1NjaGVtYUZpZWxkID0gcmVnaXN0cnkuZmllbGRzLlNjaGVtYUZpZWxkO1xyXG4gICAgY29uc3QgeyB3aWRnZXRzIH0gPSByZWdpc3RyeTtcclxuICAgIGNvbnN0IHsgc2VsZWN0ZWRPcHRpb24gfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCB7IHdpZGdldCA9IFwic2VsZWN0XCIsIC4uLnVpT3B0aW9ucyB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICAgIGNvbnN0IFdpZGdldCA9IGdldFdpZGdldCh7IHR5cGU6IFwibnVtYmVyXCIgfSwgd2lkZ2V0LCB3aWRnZXRzKTtcclxuXHJcbiAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zW3NlbGVjdGVkT3B0aW9uXSB8fCBudWxsO1xyXG4gICAgbGV0IG9wdGlvblNjaGVtYTtcclxuXHJcbiAgICBpZiAob3B0aW9uKSB7XHJcbiAgICAgIC8vIElmIHRoZSBzdWJzY2hlbWEgZG9lc24ndCBkZWNsYXJlIGEgdHlwZSwgaW5mZXIgdGhlIHR5cGUgZnJvbSB0aGVcclxuICAgICAgLy8gcGFyZW50IHNjaGVtYVxyXG4gICAgICBvcHRpb25TY2hlbWEgPSBvcHRpb24udHlwZVxyXG4gICAgICAgID8gb3B0aW9uXHJcbiAgICAgICAgOiBPYmplY3QuYXNzaWduKHt9LCBvcHRpb24sIHsgdHlwZTogYmFzZVR5cGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW51bU9wdGlvbnMgPSBvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKHtcclxuICAgICAgbGFiZWw6IG9wdGlvbi50aXRsZSB8fCBgT3B0aW9uICR7aW5kZXggKyAxfWAsXHJcbiAgICAgIHZhbHVlOiBpbmRleCxcclxuICAgIH0pKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHQgcGFuZWwtYm9keVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPFdpZGdldFxyXG4gICAgICAgICAgICBpZD17YCR7aWRTY2hlbWEuJGlkfSR7XHJcbiAgICAgICAgICAgICAgc2NoZW1hLm9uZU9mID8gXCJfX29uZW9mX3NlbGVjdFwiIDogXCJfX2FueW9mX3NlbGVjdFwiXHJcbiAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICBzY2hlbWE9e3sgdHlwZTogXCJudW1iZXJcIiwgZGVmYXVsdDogMCB9fVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbk9wdGlvbkNoYW5nZX1cclxuICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICAgICAgb3B0aW9ucz17eyBlbnVtT3B0aW9ucyB9fVxyXG4gICAgICAgICAgICB7Li4udWlPcHRpb25zfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAge29wdGlvbiAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICA8X1NjaGVtYUZpZWxkXHJcbiAgICAgICAgICAgIHNjaGVtYT17b3B0aW9uU2NoZW1hfVxyXG4gICAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgIGlkU2VwYXJhdG9yPXtpZFNlcGFyYXRvcn1cclxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuQW55T2ZGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gIGVycm9yU2NoZW1hOiB7fSxcclxuICBpZFNjaGVtYToge30sXHJcbiAgdWlTY2hlbWE6IHt9LFxyXG59O1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIEFueU9mRmllbGQucHJvcFR5cGVzID0ge1xyXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcclxuICAgIGJhc2VUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBpZFNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGZvcm1EYXRhOiBQcm9wVHlwZXMuYW55LFxyXG4gICAgZXJyb3JTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICByZWdpc3RyeTogdHlwZXMucmVnaXN0cnkuaXNSZXF1aXJlZCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbnlPZkZpZWxkO1xyXG4iXX0=