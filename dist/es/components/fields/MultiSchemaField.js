function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
import * as types from "../../types";
import { getUiOptions, getWidget, guessType, retrieveSchema, getDefaultFormState, getMatchingOption as _getMatchingOption, deepEquals } from "../../utils";

var AnyOfField =
/*#__PURE__*/
function (_Component) {
  _inherits(AnyOfField, _Component);

  function AnyOfField(props) {
    var _this;

    _classCallCheck(this, AnyOfField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnyOfField).call(this, props));

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

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = optionsToDiscard[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
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
          uiOptions = _objectWithoutProperties(_getUiOptions, ["widget"]);

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
      return React.createElement("div", {
        className: "panel panel-default panel-body"
      }, React.createElement("div", {
        className: "form-group"
      }, React.createElement(Widget, _extends({
        id: "".concat(idSchema.$id).concat(schema.oneOf ? "__oneof_select" : "__anyof_select"),
        schema: {
          type: "number",
          "default": 0
        },
        onChange: this.onOptionChange,
        onBlur: onBlur,
        onFocus: onFocus,
        value: selectedOption,
        options: {
          enumOptions: enumOptions
        }
      }, uiOptions))), option !== null && React.createElement(_SchemaField, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9NdWx0aVNjaGVtYUZpZWxkLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwidHlwZXMiLCJnZXRVaU9wdGlvbnMiLCJnZXRXaWRnZXQiLCJndWVzc1R5cGUiLCJyZXRyaWV2ZVNjaGVtYSIsImdldERlZmF1bHRGb3JtU3RhdGUiLCJnZXRNYXRjaGluZ09wdGlvbiIsImRlZXBFcXVhbHMiLCJBbnlPZkZpZWxkIiwicHJvcHMiLCJvcHRpb24iLCJzZWxlY3RlZE9wdGlvbiIsInBhcnNlSW50IiwiZm9ybURhdGEiLCJvbkNoYW5nZSIsIm9wdGlvbnMiLCJyZWdpc3RyeSIsInJvb3RTY2hlbWEiLCJuZXdPcHRpb24iLCJuZXdGb3JtRGF0YSIsInVuZGVmaW5lZCIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwib3B0aW9uc1RvRGlzY2FyZCIsInNsaWNlIiwic3BsaWNlIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJzZXRTdGF0ZSIsInN0YXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiaWRTY2hlbWEiLCIkaWQiLCJtYXRjaGluZ09wdGlvbiIsImJhc2VUeXBlIiwiZGlzYWJsZWQiLCJlcnJvclNjaGVtYSIsImlkUHJlZml4IiwiaWRTZXBhcmF0b3IiLCJvbkJsdXIiLCJvbkZvY3VzIiwidWlTY2hlbWEiLCJzY2hlbWEiLCJfU2NoZW1hRmllbGQiLCJmaWVsZHMiLCJTY2hlbWFGaWVsZCIsIndpZGdldHMiLCJ3aWRnZXQiLCJ1aU9wdGlvbnMiLCJXaWRnZXQiLCJvcHRpb25TY2hlbWEiLCJlbnVtT3B0aW9ucyIsIm1hcCIsImluZGV4IiwibGFiZWwiLCJ0aXRsZSIsInZhbHVlIiwib25lT2YiLCJvbk9wdGlvbkNoYW5nZSIsImRlZmF1bHRQcm9wcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsImFycmF5T2Yi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Vlg7QUFXRSxRQUFBLFFBQVEsRUFBRTNCLFFBWFo7QUFZRSxRQUFBLFFBQVEsRUFBRXNCO0FBWlosUUFqQkosQ0FERjtBQW1DRDs7OztFQWpLc0J4QyxTOztBQW9LekJVLFVBQVUsQ0FBQ3NELFlBQVgsR0FBMEI7QUFDeEJ4QixFQUFBQSxRQUFRLEVBQUUsS0FEYztBQUV4QkMsRUFBQUEsV0FBVyxFQUFFLEVBRlc7QUFHeEJMLEVBQUFBLFFBQVEsRUFBRSxFQUhjO0FBSXhCVSxFQUFBQSxRQUFRLEVBQUU7QUFKYyxDQUExQjs7QUFPQSxJQUFJbUIsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekN6RCxFQUFBQSxVQUFVLENBQUMwRCxTQUFYLEdBQXVCO0FBQ3JCbkQsSUFBQUEsT0FBTyxFQUFFaEIsU0FBUyxDQUFDb0UsT0FBVixDQUFrQnBFLFNBQVMsQ0FBQ3FFLE1BQTVCLEVBQW9DQyxVQUR4QjtBQUVyQmhDLElBQUFBLFFBQVEsRUFBRXRDLFNBQVMsQ0FBQ3VFLE1BRkM7QUFHckIxQixJQUFBQSxRQUFRLEVBQUU3QyxTQUFTLENBQUNxRSxNQUhDO0FBSXJCbEMsSUFBQUEsUUFBUSxFQUFFbkMsU0FBUyxDQUFDcUUsTUFKQztBQUtyQnZELElBQUFBLFFBQVEsRUFBRWQsU0FBUyxDQUFDd0UsR0FMQztBQU1yQmhDLElBQUFBLFdBQVcsRUFBRXhDLFNBQVMsQ0FBQ3FFLE1BTkY7QUFPckJwRCxJQUFBQSxRQUFRLEVBQUVoQixLQUFLLENBQUNnQixRQUFOLENBQWVxRDtBQVBKLEdBQXZCO0FBU0Q7O0FBRUQsZUFBZTdELFVBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0VWlPcHRpb25zLFxyXG4gIGdldFdpZGdldCxcclxuICBndWVzc1R5cGUsXHJcbiAgcmV0cmlldmVTY2hlbWEsXHJcbiAgZ2V0RGVmYXVsdEZvcm1TdGF0ZSxcclxuICBnZXRNYXRjaGluZ09wdGlvbixcclxuICBkZWVwRXF1YWxzLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuY2xhc3MgQW55T2ZGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICBjb25zdCB7IGZvcm1EYXRhLCBvcHRpb25zIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNlbGVjdGVkT3B0aW9uOiB0aGlzLmdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCBvcHRpb25zKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuICAgIGlmIChcclxuICAgICAgIWRlZXBFcXVhbHModGhpcy5wcm9wcy5mb3JtRGF0YSwgcHJldlByb3BzLmZvcm1EYXRhKSAmJlxyXG4gICAgICB0aGlzLnByb3BzLmlkU2NoZW1hLiRpZCA9PT0gcHJldlByb3BzLmlkU2NoZW1hLiRpZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IG1hdGNoaW5nT3B0aW9uID0gdGhpcy5nZXRNYXRjaGluZ09wdGlvbihcclxuICAgICAgICB0aGlzLnByb3BzLmZvcm1EYXRhLFxyXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9uc1xyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCFwcmV2U3RhdGUgfHwgbWF0Y2hpbmdPcHRpb24gPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRPcHRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHNlbGVjdGVkT3B0aW9uOiBtYXRjaGluZ09wdGlvbixcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgb3B0aW9ucykge1xyXG4gICAgY29uc3QgeyByb290U2NoZW1hIH0gPSB0aGlzLnByb3BzLnJlZ2lzdHJ5O1xyXG5cclxuICAgIGxldCBvcHRpb24gPSBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgb3B0aW9ucywgcm9vdFNjaGVtYSk7XHJcbiAgICBpZiAob3B0aW9uICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICB9XHJcbiAgICAvLyBJZiB0aGUgZm9ybSBkYXRhIG1hdGNoZXMgbm9uZSBvZiB0aGUgb3B0aW9ucywgdXNlIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWRcclxuICAgIC8vIG9wdGlvbiwgYXNzdW1pbmcgaXQncyBhdmFpbGFibGU7IG90aGVyd2lzZSB1c2UgdGhlIGZpcnN0IG9wdGlvblxyXG4gICAgcmV0dXJuIHRoaXMgJiYgdGhpcy5zdGF0ZSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWRPcHRpb24gOiAwO1xyXG4gIH1cclxuXHJcbiAgb25PcHRpb25DaGFuZ2UgPSBvcHRpb24gPT4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBwYXJzZUludChvcHRpb24sIDEwKTtcclxuICAgIGNvbnN0IHsgZm9ybURhdGEsIG9uQ2hhbmdlLCBvcHRpb25zLCByZWdpc3RyeSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgcm9vdFNjaGVtYSB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCBuZXdPcHRpb24gPSByZXRyaWV2ZVNjaGVtYShcclxuICAgICAgb3B0aW9uc1tzZWxlY3RlZE9wdGlvbl0sXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhXHJcbiAgICApO1xyXG5cclxuICAgIC8vIElmIHRoZSBuZXcgb3B0aW9uIGlzIG9mIHR5cGUgb2JqZWN0IGFuZCB0aGUgY3VycmVudCBkYXRhIGlzIGFuIG9iamVjdCxcclxuICAgIC8vIGRpc2NhcmQgcHJvcGVydGllcyBhZGRlZCB1c2luZyB0aGUgb2xkIG9wdGlvbi5cclxuICAgIGxldCBuZXdGb3JtRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgIGlmIChcclxuICAgICAgZ3Vlc3NUeXBlKGZvcm1EYXRhKSA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAobmV3T3B0aW9uLnR5cGUgPT09IFwib2JqZWN0XCIgfHwgbmV3T3B0aW9uLnByb3BlcnRpZXMpXHJcbiAgICApIHtcclxuICAgICAgbmV3Rm9ybURhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBmb3JtRGF0YSk7XHJcblxyXG4gICAgICBjb25zdCBvcHRpb25zVG9EaXNjYXJkID0gb3B0aW9ucy5zbGljZSgpO1xyXG4gICAgICBvcHRpb25zVG9EaXNjYXJkLnNwbGljZShzZWxlY3RlZE9wdGlvbiwgMSk7XHJcblxyXG4gICAgICAvLyBEaXNjYXJkIGFueSBkYXRhIGFkZGVkIHVzaW5nIG90aGVyIG9wdGlvbnNcclxuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2Ygb3B0aW9uc1RvRGlzY2FyZCkge1xyXG4gICAgICAgIGlmIChvcHRpb24ucHJvcGVydGllcykge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9uLnByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKG5ld0Zvcm1EYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICBkZWxldGUgbmV3Rm9ybURhdGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ2FsbCBnZXREZWZhdWx0Rm9ybVN0YXRlIHRvIG1ha2Ugc3VyZSBkZWZhdWx0cyBhcmUgcG9wdWxhdGVkIG9uIGNoYW5nZS5cclxuICAgIG9uQ2hhbmdlKFxyXG4gICAgICBnZXREZWZhdWx0Rm9ybVN0YXRlKG9wdGlvbnNbc2VsZWN0ZWRPcHRpb25dLCBuZXdGb3JtRGF0YSwgcm9vdFNjaGVtYSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHNlbGVjdGVkT3B0aW9uOiBwYXJzZUludChvcHRpb24sIDEwKSxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgYmFzZVR5cGUsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBpZFNlcGFyYXRvcixcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIG9uQmx1cixcclxuICAgICAgb25DaGFuZ2UsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICAgIHJlZ2lzdHJ5LFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgc2NoZW1hLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgX1NjaGVtYUZpZWxkID0gcmVnaXN0cnkuZmllbGRzLlNjaGVtYUZpZWxkO1xyXG4gICAgY29uc3QgeyB3aWRnZXRzIH0gPSByZWdpc3RyeTtcclxuICAgIGNvbnN0IHsgc2VsZWN0ZWRPcHRpb24gfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCB7IHdpZGdldCA9IFwic2VsZWN0XCIsIC4uLnVpT3B0aW9ucyB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICAgIGNvbnN0IFdpZGdldCA9IGdldFdpZGdldCh7IHR5cGU6IFwibnVtYmVyXCIgfSwgd2lkZ2V0LCB3aWRnZXRzKTtcclxuXHJcbiAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zW3NlbGVjdGVkT3B0aW9uXSB8fCBudWxsO1xyXG4gICAgbGV0IG9wdGlvblNjaGVtYTtcclxuXHJcbiAgICBpZiAob3B0aW9uKSB7XHJcbiAgICAgIC8vIElmIHRoZSBzdWJzY2hlbWEgZG9lc24ndCBkZWNsYXJlIGEgdHlwZSwgaW5mZXIgdGhlIHR5cGUgZnJvbSB0aGVcclxuICAgICAgLy8gcGFyZW50IHNjaGVtYVxyXG4gICAgICBvcHRpb25TY2hlbWEgPSBvcHRpb24udHlwZVxyXG4gICAgICAgID8gb3B0aW9uXHJcbiAgICAgICAgOiBPYmplY3QuYXNzaWduKHt9LCBvcHRpb24sIHsgdHlwZTogYmFzZVR5cGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW51bU9wdGlvbnMgPSBvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKHtcclxuICAgICAgbGFiZWw6IG9wdGlvbi50aXRsZSB8fCBgT3B0aW9uICR7aW5kZXggKyAxfWAsXHJcbiAgICAgIHZhbHVlOiBpbmRleCxcclxuICAgIH0pKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHQgcGFuZWwtYm9keVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPFdpZGdldFxyXG4gICAgICAgICAgICBpZD17YCR7aWRTY2hlbWEuJGlkfSR7XHJcbiAgICAgICAgICAgICAgc2NoZW1hLm9uZU9mID8gXCJfX29uZW9mX3NlbGVjdFwiIDogXCJfX2FueW9mX3NlbGVjdFwiXHJcbiAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICBzY2hlbWE9e3sgdHlwZTogXCJudW1iZXJcIiwgZGVmYXVsdDogMCB9fVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbk9wdGlvbkNoYW5nZX1cclxuICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cclxuICAgICAgICAgICAgb3B0aW9ucz17eyBlbnVtT3B0aW9ucyB9fVxyXG4gICAgICAgICAgICB7Li4udWlPcHRpb25zfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAge29wdGlvbiAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICA8X1NjaGVtYUZpZWxkXHJcbiAgICAgICAgICAgIHNjaGVtYT17b3B0aW9uU2NoZW1hfVxyXG4gICAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XHJcbiAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cclxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XHJcbiAgICAgICAgICAgIGlkU2VwYXJhdG9yPXtpZFNlcGFyYXRvcn1cclxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuQW55T2ZGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gIGVycm9yU2NoZW1hOiB7fSxcclxuICBpZFNjaGVtYToge30sXHJcbiAgdWlTY2hlbWE6IHt9LFxyXG59O1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIEFueU9mRmllbGQucHJvcFR5cGVzID0ge1xyXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcclxuICAgIGJhc2VUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBpZFNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGZvcm1EYXRhOiBQcm9wVHlwZXMuYW55LFxyXG4gICAgZXJyb3JTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICByZWdpc3RyeTogdHlwZXMucmVnaXN0cnkuaXNSZXF1aXJlZCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbnlPZkZpZWxkO1xyXG4iXX0=