function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _excluded = ["widget"];

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

import React, { Component } from "react";
import PropTypes from "prop-types";
import * as types from "../../types";
import { getUiOptions, getWidget, guessType, retrieveSchema, getDefaultFormState, getMatchingOption as _getMatchingOption, deepEquals } from "../../utils";

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
      var newOption = retrieveSchema(options[selectedOption], rootSchema, formData); // If the new option is of type object and the current data is an object,
      // discard properties added using the old option.

      var newFormData = undefined;

      if (guessType(formData) === "object" && (newOption.type === "object" || newOption.properties)) {
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


      onChange(getDefaultFormState(options[selectedOption], newFormData, rootSchema));

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
      if (!deepEquals(this.props.formData, prevProps.formData) && this.props.idSchema.$id === prevProps.idSchema.$id) {
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

      var option = _getMatchingOption(formData, options, rootSchema);

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

      var _getUiOptions = getUiOptions(uiSchema),
          _getUiOptions$widget = _getUiOptions.widget,
          widget = _getUiOptions$widget === void 0 ? "select" : _getUiOptions$widget,
          uiOptions = _objectWithoutProperties(_getUiOptions, _excluded);

      var Widget = getWidget({
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
      return /*#__PURE__*/React.createElement("div", {
        className: "panel panel-default panel-body"
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement(Widget, _extends({
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
      }, uiOptions))), option !== null && /*#__PURE__*/React.createElement(_SchemaField, {
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
}(Component);

AnyOfField.defaultProps = {
  disabled: false,
  errorSchema: {},
  idSchema: {},
  uiSchema: {}
};

if (process.env.NODE_ENV !== "production") {
  AnyOfField.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    baseType: PropTypes.string,
    uiSchema: PropTypes.object,
    idSchema: PropTypes.object,
    formData: PropTypes.any,
    errorSchema: PropTypes.object,
    registry: types.registry.isRequired
  };
}

export default AnyOfField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9NdWx0aVNjaGVtYUZpZWxkLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwidHlwZXMiLCJnZXRVaU9wdGlvbnMiLCJnZXRXaWRnZXQiLCJndWVzc1R5cGUiLCJyZXRyaWV2ZVNjaGVtYSIsImdldERlZmF1bHRGb3JtU3RhdGUiLCJnZXRNYXRjaGluZ09wdGlvbiIsImRlZXBFcXVhbHMiLCJBbnlPZkZpZWxkIiwicHJvcHMiLCJvcHRpb24iLCJzZWxlY3RlZE9wdGlvbiIsInBhcnNlSW50IiwiZm9ybURhdGEiLCJvbkNoYW5nZSIsIm9wdGlvbnMiLCJyZWdpc3RyeSIsInJvb3RTY2hlbWEiLCJuZXdPcHRpb24iLCJuZXdGb3JtRGF0YSIsInVuZGVmaW5lZCIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwib3B0aW9uc1RvRGlzY2FyZCIsInNsaWNlIiwic3BsaWNlIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJzZXRTdGF0ZSIsInN0YXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiaWRTY2hlbWEiLCIkaWQiLCJtYXRjaGluZ09wdGlvbiIsImJhc2VUeXBlIiwiZGlzYWJsZWQiLCJlcnJvclNjaGVtYSIsImlkUHJlZml4IiwiaWRTZXBhcmF0b3IiLCJvbkJsdXIiLCJvbkZvY3VzIiwidWlTY2hlbWEiLCJzY2hlbWEiLCJfU2NoZW1hRmllbGQiLCJmaWVsZHMiLCJTY2hlbWFGaWVsZCIsIndpZGdldHMiLCJ3aWRnZXQiLCJ1aU9wdGlvbnMiLCJXaWRnZXQiLCJvcHRpb25TY2hlbWEiLCJlbnVtT3B0aW9ucyIsIm1hcCIsImluZGV4IiwibGFiZWwiLCJ0aXRsZSIsInZhbHVlIiwib25lT2YiLCJkZWZhdWx0Iiwib25PcHRpb25DaGFuZ2UiLCJkZWZhdWx0UHJvcHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMi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QUFFQyxPQVZYO0FBV0UsUUFBQSxRQUFRLEVBQUUzQixRQVhaO0FBWUUsUUFBQSxRQUFRLEVBQUVzQjtBQVpaLFFBakJKLENBREY7QUFtQ0Q7Ozs7RUFqS3NCeEMsUzs7QUFvS3pCVSxVQUFVLENBQUN1RCxZQUFYLEdBQTBCO0FBQ3hCekIsRUFBQUEsUUFBUSxFQUFFLEtBRGM7QUFFeEJDLEVBQUFBLFdBQVcsRUFBRSxFQUZXO0FBR3hCTCxFQUFBQSxRQUFRLEVBQUUsRUFIYztBQUl4QlUsRUFBQUEsUUFBUSxFQUFFO0FBSmMsQ0FBMUI7O0FBT0EsSUFBSW9CLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDMUQsRUFBQUEsVUFBVSxDQUFDMkQsU0FBWCxHQUF1QjtBQUNyQnBELElBQUFBLE9BQU8sRUFBRWhCLFNBQVMsQ0FBQ3FFLE9BQVYsQ0FBa0JyRSxTQUFTLENBQUNzRSxNQUE1QixFQUFvQ0MsVUFEeEI7QUFFckJqQyxJQUFBQSxRQUFRLEVBQUV0QyxTQUFTLENBQUN3RSxNQUZDO0FBR3JCM0IsSUFBQUEsUUFBUSxFQUFFN0MsU0FBUyxDQUFDc0UsTUFIQztBQUlyQm5DLElBQUFBLFFBQVEsRUFBRW5DLFNBQVMsQ0FBQ3NFLE1BSkM7QUFLckJ4RCxJQUFBQSxRQUFRLEVBQUVkLFNBQVMsQ0FBQ3lFLEdBTEM7QUFNckJqQyxJQUFBQSxXQUFXLEVBQUV4QyxTQUFTLENBQUNzRSxNQU5GO0FBT3JCckQsSUFBQUEsUUFBUSxFQUFFaEIsS0FBSyxDQUFDZ0IsUUFBTixDQUFlc0Q7QUFQSixHQUF2QjtBQVNEOztBQUVELGVBQWU5RCxVQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldFVpT3B0aW9ucyxcclxuICBnZXRXaWRnZXQsXHJcbiAgZ3Vlc3NUeXBlLFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIGdldERlZmF1bHRGb3JtU3RhdGUsXHJcbiAgZ2V0TWF0Y2hpbmdPcHRpb24sXHJcbiAgZGVlcEVxdWFscyxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuXHJcbmNsYXNzIEFueU9mRmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgeyBmb3JtRGF0YSwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzZWxlY3RlZE9wdGlvbjogdGhpcy5nZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgb3B0aW9ucyksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICFkZWVwRXF1YWxzKHRoaXMucHJvcHMuZm9ybURhdGEsIHByZXZQcm9wcy5mb3JtRGF0YSkgJiZcclxuICAgICAgdGhpcy5wcm9wcy5pZFNjaGVtYS4kaWQgPT09IHByZXZQcm9wcy5pZFNjaGVtYS4kaWRcclxuICAgICkge1xyXG4gICAgICBjb25zdCBtYXRjaGluZ09wdGlvbiA9IHRoaXMuZ2V0TWF0Y2hpbmdPcHRpb24oXHJcbiAgICAgICAgdGhpcy5wcm9wcy5mb3JtRGF0YSxcclxuICAgICAgICB0aGlzLnByb3BzLm9wdGlvbnNcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmICghcHJldlN0YXRlIHx8IG1hdGNoaW5nT3B0aW9uID09PSB0aGlzLnN0YXRlLnNlbGVjdGVkT3B0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBzZWxlY3RlZE9wdGlvbjogbWF0Y2hpbmdPcHRpb24sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHsgcm9vdFNjaGVtYSB9ID0gdGhpcy5wcm9wcy5yZWdpc3RyeTtcclxuXHJcbiAgICBsZXQgb3B0aW9uID0gZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIG9wdGlvbnMsIHJvb3RTY2hlbWEpO1xyXG4gICAgaWYgKG9wdGlvbiAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgdGhlIGZvcm0gZGF0YSBtYXRjaGVzIG5vbmUgb2YgdGhlIG9wdGlvbnMsIHVzZSB0aGUgY3VycmVudGx5IHNlbGVjdGVkXHJcbiAgICAvLyBvcHRpb24sIGFzc3VtaW5nIGl0J3MgYXZhaWxhYmxlOyBvdGhlcndpc2UgdXNlIHRoZSBmaXJzdCBvcHRpb25cclxuICAgIHJldHVybiB0aGlzICYmIHRoaXMuc3RhdGUgPyB0aGlzLnN0YXRlLnNlbGVjdGVkT3B0aW9uIDogMDtcclxuICB9XHJcblxyXG4gIG9uT3B0aW9uQ2hhbmdlID0gb3B0aW9uID0+IHtcclxuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gcGFyc2VJbnQob3B0aW9uLCAxMCk7XHJcbiAgICBjb25zdCB7IGZvcm1EYXRhLCBvbkNoYW5nZSwgb3B0aW9ucywgcmVnaXN0cnkgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHJlZ2lzdHJ5O1xyXG4gICAgY29uc3QgbmV3T3B0aW9uID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgIG9wdGlvbnNbc2VsZWN0ZWRPcHRpb25dLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgbmV3IG9wdGlvbiBpcyBvZiB0eXBlIG9iamVjdCBhbmQgdGhlIGN1cnJlbnQgZGF0YSBpcyBhbiBvYmplY3QsXHJcbiAgICAvLyBkaXNjYXJkIHByb3BlcnRpZXMgYWRkZWQgdXNpbmcgdGhlIG9sZCBvcHRpb24uXHJcbiAgICBsZXQgbmV3Rm9ybURhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICBpZiAoXHJcbiAgICAgIGd1ZXNzVHlwZShmb3JtRGF0YSkgPT09IFwib2JqZWN0XCIgJiZcclxuICAgICAgKG5ld09wdGlvbi50eXBlID09PSBcIm9iamVjdFwiIHx8IG5ld09wdGlvbi5wcm9wZXJ0aWVzKVxyXG4gICAgKSB7XHJcbiAgICAgIG5ld0Zvcm1EYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZm9ybURhdGEpO1xyXG5cclxuICAgICAgY29uc3Qgb3B0aW9uc1RvRGlzY2FyZCA9IG9wdGlvbnMuc2xpY2UoKTtcclxuICAgICAgb3B0aW9uc1RvRGlzY2FyZC5zcGxpY2Uoc2VsZWN0ZWRPcHRpb24sIDEpO1xyXG5cclxuICAgICAgLy8gRGlzY2FyZCBhbnkgZGF0YSBhZGRlZCB1c2luZyBvdGhlciBvcHRpb25zXHJcbiAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIG9wdGlvbnNUb0Rpc2NhcmQpIHtcclxuICAgICAgICBpZiAob3B0aW9uLnByb3BlcnRpZXMpIHtcclxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbi5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdGb3JtRGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIG5ld0Zvcm1EYXRhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIENhbGwgZ2V0RGVmYXVsdEZvcm1TdGF0ZSB0byBtYWtlIHN1cmUgZGVmYXVsdHMgYXJlIHBvcHVsYXRlZCBvbiBjaGFuZ2UuXHJcbiAgICBvbkNoYW5nZShcclxuICAgICAgZ2V0RGVmYXVsdEZvcm1TdGF0ZShvcHRpb25zW3NlbGVjdGVkT3B0aW9uXSwgbmV3Rm9ybURhdGEsIHJvb3RTY2hlbWEpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzZWxlY3RlZE9wdGlvbjogcGFyc2VJbnQob3B0aW9uLCAxMCksXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGJhc2VUeXBlLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBpZFByZWZpeCxcclxuICAgICAgaWRTZXBhcmF0b3IsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uQ2hhbmdlLFxyXG4gICAgICBvbkZvY3VzLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICByZWdpc3RyeSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIHNjaGVtYSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IF9TY2hlbWFGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5TY2hlbWFGaWVsZDtcclxuICAgIGNvbnN0IHsgd2lkZ2V0cyB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IHNlbGVjdGVkT3B0aW9uIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgeyB3aWRnZXQgPSBcInNlbGVjdFwiLCAuLi51aU9wdGlvbnMgfSA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoeyB0eXBlOiBcIm51bWJlclwiIH0sIHdpZGdldCwgd2lkZ2V0cyk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1tzZWxlY3RlZE9wdGlvbl0gfHwgbnVsbDtcclxuICAgIGxldCBvcHRpb25TY2hlbWE7XHJcblxyXG4gICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAvLyBJZiB0aGUgc3Vic2NoZW1hIGRvZXNuJ3QgZGVjbGFyZSBhIHR5cGUsIGluZmVyIHRoZSB0eXBlIGZyb20gdGhlXHJcbiAgICAgIC8vIHBhcmVudCBzY2hlbWFcclxuICAgICAgb3B0aW9uU2NoZW1hID0gb3B0aW9uLnR5cGVcclxuICAgICAgICA/IG9wdGlvblxyXG4gICAgICAgIDogT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9uLCB7IHR5cGU6IGJhc2VUeXBlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVudW1PcHRpb25zID0gb3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+ICh7XHJcbiAgICAgIGxhYmVsOiBvcHRpb24udGl0bGUgfHwgYE9wdGlvbiAke2luZGV4ICsgMX1gLFxyXG4gICAgICB2YWx1ZTogaW5kZXgsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0IHBhbmVsLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxXaWRnZXRcclxuICAgICAgICAgICAgaWQ9e2Ake2lkU2NoZW1hLiRpZH0ke1xyXG4gICAgICAgICAgICAgIHNjaGVtYS5vbmVPZiA/IFwiX19vbmVvZl9zZWxlY3RcIiA6IFwiX19hbnlvZl9zZWxlY3RcIlxyXG4gICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgc2NoZW1hPXt7IHR5cGU6IFwibnVtYmVyXCIsIGRlZmF1bHQ6IDAgfX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25PcHRpb25DaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XHJcbiAgICAgICAgICAgIG9wdGlvbnM9e3sgZW51bU9wdGlvbnMgfX1cclxuICAgICAgICAgICAgey4uLnVpT3B0aW9uc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtvcHRpb24gIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgPF9TY2hlbWFGaWVsZFxyXG4gICAgICAgICAgICBzY2hlbWE9e29wdGlvblNjaGVtYX1cclxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWF9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgaWRQcmVmaXg9e2lkUHJlZml4fVxyXG4gICAgICAgICAgICBpZFNlcGFyYXRvcj17aWRTZXBhcmF0b3J9XHJcbiAgICAgICAgICAgIGZvcm1EYXRhPXtmb3JtRGF0YX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cclxuICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkFueU9mRmllbGQuZGVmYXVsdFByb3BzID0ge1xyXG4gIGRpc2FibGVkOiBmYWxzZSxcclxuICBlcnJvclNjaGVtYToge30sXHJcbiAgaWRTY2hlbWE6IHt9LFxyXG4gIHVpU2NoZW1hOiB7fSxcclxufTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBBbnlPZkZpZWxkLnByb3BUeXBlcyA9IHtcclxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLmlzUmVxdWlyZWQsXHJcbiAgICBiYXNlVHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHVpU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgaWRTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBmb3JtRGF0YTogUHJvcFR5cGVzLmFueSxcclxuICAgIGVycm9yU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgcmVnaXN0cnk6IHR5cGVzLnJlZ2lzdHJ5LmlzUmVxdWlyZWQsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW55T2ZGaWVsZDtcclxuIl19