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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9NdWx0aVNjaGVtYUZpZWxkLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwidHlwZXMiLCJnZXRVaU9wdGlvbnMiLCJnZXRXaWRnZXQiLCJndWVzc1R5cGUiLCJyZXRyaWV2ZVNjaGVtYSIsImdldERlZmF1bHRGb3JtU3RhdGUiLCJnZXRNYXRjaGluZ09wdGlvbiIsImRlZXBFcXVhbHMiLCJBbnlPZkZpZWxkIiwicHJvcHMiLCJvcHRpb24iLCJzZWxlY3RlZE9wdGlvbiIsInBhcnNlSW50IiwiZm9ybURhdGEiLCJvbkNoYW5nZSIsIm9wdGlvbnMiLCJyZWdpc3RyeSIsInJvb3RTY2hlbWEiLCJuZXdPcHRpb24iLCJuZXdGb3JtRGF0YSIsInVuZGVmaW5lZCIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwib3B0aW9uc1RvRGlzY2FyZCIsInNsaWNlIiwic3BsaWNlIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJzZXRTdGF0ZSIsInN0YXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiaWRTY2hlbWEiLCIkaWQiLCJtYXRjaGluZ09wdGlvbiIsImJhc2VUeXBlIiwiZGlzYWJsZWQiLCJlcnJvclNjaGVtYSIsImlkUHJlZml4Iiwib25CbHVyIiwib25Gb2N1cyIsInVpU2NoZW1hIiwic2NoZW1hIiwiX1NjaGVtYUZpZWxkIiwiZmllbGRzIiwiU2NoZW1hRmllbGQiLCJ3aWRnZXRzIiwid2lkZ2V0IiwidWlPcHRpb25zIiwiV2lkZ2V0Iiwib3B0aW9uU2NoZW1hIiwiZW51bU9wdGlvbnMiLCJtYXAiLCJpbmRleCIsImxhYmVsIiwidGl0bGUiLCJ2YWx1ZSIsIm9uZU9mIiwib25PcHRpb25DaGFuZ2UiLCJkZWZhdWx0UHJvcHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwib2JqZWN0IiwiaXNS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a0NEOzs7O0VBL0pzQnhDLFM7O0FBa0t6QlUsVUFBVSxDQUFDcUQsWUFBWCxHQUEwQjtBQUN4QnZCLEVBQUFBLFFBQVEsRUFBRSxLQURjO0FBRXhCQyxFQUFBQSxXQUFXLEVBQUUsRUFGVztBQUd4QkwsRUFBQUEsUUFBUSxFQUFFLEVBSGM7QUFJeEJTLEVBQUFBLFFBQVEsRUFBRTtBQUpjLENBQTFCOztBQU9BLElBQUltQixPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q3hELEVBQUFBLFVBQVUsQ0FBQ3lELFNBQVgsR0FBdUI7QUFDckJsRCxJQUFBQSxPQUFPLEVBQUVoQixTQUFTLENBQUNtRSxPQUFWLENBQWtCbkUsU0FBUyxDQUFDb0UsTUFBNUIsRUFBb0NDLFVBRHhCO0FBRXJCL0IsSUFBQUEsUUFBUSxFQUFFdEMsU0FBUyxDQUFDc0UsTUFGQztBQUdyQjFCLElBQUFBLFFBQVEsRUFBRTVDLFNBQVMsQ0FBQ29FLE1BSEM7QUFJckJqQyxJQUFBQSxRQUFRLEVBQUVuQyxTQUFTLENBQUNvRSxNQUpDO0FBS3JCdEQsSUFBQUEsUUFBUSxFQUFFZCxTQUFTLENBQUN1RSxHQUxDO0FBTXJCL0IsSUFBQUEsV0FBVyxFQUFFeEMsU0FBUyxDQUFDb0UsTUFORjtBQU9yQm5ELElBQUFBLFFBQVEsRUFBRWhCLEtBQUssQ0FBQ2dCLFFBQU4sQ0FBZW9EO0FBUEosR0FBdkI7QUFTRDs7QUFFRCxlQUFlNUQsVUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRVaU9wdGlvbnMsXHJcbiAgZ2V0V2lkZ2V0LFxyXG4gIGd1ZXNzVHlwZSxcclxuICByZXRyaWV2ZVNjaGVtYSxcclxuICBnZXREZWZhdWx0Rm9ybVN0YXRlLFxyXG4gIGdldE1hdGNoaW5nT3B0aW9uLFxyXG4gIGRlZXBFcXVhbHMsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5jbGFzcyBBbnlPZkZpZWxkIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IHsgZm9ybURhdGEsIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2VsZWN0ZWRPcHRpb246IHRoaXMuZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIG9wdGlvbnMpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xyXG4gICAgaWYgKFxyXG4gICAgICAhZGVlcEVxdWFscyh0aGlzLnByb3BzLmZvcm1EYXRhLCBwcmV2UHJvcHMuZm9ybURhdGEpICYmXHJcbiAgICAgIHRoaXMucHJvcHMuaWRTY2hlbWEuJGlkID09PSBwcmV2UHJvcHMuaWRTY2hlbWEuJGlkXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgbWF0Y2hpbmdPcHRpb24gPSB0aGlzLmdldE1hdGNoaW5nT3B0aW9uKFxyXG4gICAgICAgIHRoaXMucHJvcHMuZm9ybURhdGEsXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoIXByZXZTdGF0ZSB8fCBtYXRjaGluZ09wdGlvbiA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZE9wdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgc2VsZWN0ZWRPcHRpb246IG1hdGNoaW5nT3B0aW9uLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHRoaXMucHJvcHMucmVnaXN0cnk7XHJcblxyXG4gICAgbGV0IG9wdGlvbiA9IGdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCBvcHRpb25zLCByb290U2NoZW1hKTtcclxuICAgIGlmIChvcHRpb24gIT09IDApIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbjtcclxuICAgIH1cclxuICAgIC8vIElmIHRoZSBmb3JtIGRhdGEgbWF0Y2hlcyBub25lIG9mIHRoZSBvcHRpb25zLCB1c2UgdGhlIGN1cnJlbnRseSBzZWxlY3RlZFxyXG4gICAgLy8gb3B0aW9uLCBhc3N1bWluZyBpdCdzIGF2YWlsYWJsZTsgb3RoZXJ3aXNlIHVzZSB0aGUgZmlyc3Qgb3B0aW9uXHJcbiAgICByZXR1cm4gdGhpcyAmJiB0aGlzLnN0YXRlID8gdGhpcy5zdGF0ZS5zZWxlY3RlZE9wdGlvbiA6IDA7XHJcbiAgfVxyXG5cclxuICBvbk9wdGlvbkNoYW5nZSA9IG9wdGlvbiA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHBhcnNlSW50KG9wdGlvbiwgMTApO1xyXG4gICAgY29uc3QgeyBmb3JtRGF0YSwgb25DaGFuZ2UsIG9wdGlvbnMsIHJlZ2lzdHJ5IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyByb290U2NoZW1hIH0gPSByZWdpc3RyeTtcclxuICAgIGNvbnN0IG5ld09wdGlvbiA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICBvcHRpb25zW3NlbGVjdGVkT3B0aW9uXSxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGFcclxuICAgICk7XHJcblxyXG4gICAgLy8gSWYgdGhlIG5ldyBvcHRpb24gaXMgb2YgdHlwZSBvYmplY3QgYW5kIHRoZSBjdXJyZW50IGRhdGEgaXMgYW4gb2JqZWN0LFxyXG4gICAgLy8gZGlzY2FyZCBwcm9wZXJ0aWVzIGFkZGVkIHVzaW5nIHRoZSBvbGQgb3B0aW9uLlxyXG4gICAgbGV0IG5ld0Zvcm1EYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgaWYgKFxyXG4gICAgICBndWVzc1R5cGUoZm9ybURhdGEpID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgIChuZXdPcHRpb24udHlwZSA9PT0gXCJvYmplY3RcIiB8fCBuZXdPcHRpb24ucHJvcGVydGllcylcclxuICAgICkge1xyXG4gICAgICBuZXdGb3JtRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGZvcm1EYXRhKTtcclxuXHJcbiAgICAgIGNvbnN0IG9wdGlvbnNUb0Rpc2NhcmQgPSBvcHRpb25zLnNsaWNlKCk7XHJcbiAgICAgIG9wdGlvbnNUb0Rpc2NhcmQuc3BsaWNlKHNlbGVjdGVkT3B0aW9uLCAxKTtcclxuXHJcbiAgICAgIC8vIERpc2NhcmQgYW55IGRhdGEgYWRkZWQgdXNpbmcgb3RoZXIgb3B0aW9uc1xyXG4gICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBvcHRpb25zVG9EaXNjYXJkKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbi5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb24ucHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBpZiAobmV3Rm9ybURhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBuZXdGb3JtRGF0YVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBDYWxsIGdldERlZmF1bHRGb3JtU3RhdGUgdG8gbWFrZSBzdXJlIGRlZmF1bHRzIGFyZSBwb3B1bGF0ZWQgb24gY2hhbmdlLlxyXG4gICAgb25DaGFuZ2UoXHJcbiAgICAgIGdldERlZmF1bHRGb3JtU3RhdGUob3B0aW9uc1tzZWxlY3RlZE9wdGlvbl0sIG5ld0Zvcm1EYXRhLCByb290U2NoZW1hKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgc2VsZWN0ZWRPcHRpb246IHBhcnNlSW50KG9wdGlvbiwgMTApLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBiYXNlVHlwZSxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIGVycm9yU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgaWRQcmVmaXgsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uQ2hhbmdlLFxyXG4gICAgICBvbkZvY3VzLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICByZWdpc3RyeSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIHNjaGVtYSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IF9TY2hlbWFGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5TY2hlbWFGaWVsZDtcclxuICAgIGNvbnN0IHsgd2lkZ2V0cyB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IHNlbGVjdGVkT3B0aW9uIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgeyB3aWRnZXQgPSBcInNlbGVjdFwiLCAuLi51aU9wdGlvbnMgfSA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoeyB0eXBlOiBcIm51bWJlclwiIH0sIHdpZGdldCwgd2lkZ2V0cyk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1tzZWxlY3RlZE9wdGlvbl0gfHwgbnVsbDtcclxuICAgIGxldCBvcHRpb25TY2hlbWE7XHJcblxyXG4gICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAvLyBJZiB0aGUgc3Vic2NoZW1hIGRvZXNuJ3QgZGVjbGFyZSBhIHR5cGUsIGluZmVyIHRoZSB0eXBlIGZyb20gdGhlXHJcbiAgICAgIC8vIHBhcmVudCBzY2hlbWFcclxuICAgICAgb3B0aW9uU2NoZW1hID0gb3B0aW9uLnR5cGVcclxuICAgICAgICA/IG9wdGlvblxyXG4gICAgICAgIDogT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9uLCB7IHR5cGU6IGJhc2VUeXBlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVudW1PcHRpb25zID0gb3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+ICh7XHJcbiAgICAgIGxhYmVsOiBvcHRpb24udGl0bGUgfHwgYE9wdGlvbiAke2luZGV4ICsgMX1gLFxyXG4gICAgICB2YWx1ZTogaW5kZXgsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0IHBhbmVsLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxXaWRnZXRcclxuICAgICAgICAgICAgaWQ9e2Ake2lkU2NoZW1hLiRpZH0ke1xyXG4gICAgICAgICAgICAgIHNjaGVtYS5vbmVPZiA/IFwiX19vbmVvZl9zZWxlY3RcIiA6IFwiX19hbnlvZl9zZWxlY3RcIlxyXG4gICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgc2NoZW1hPXt7IHR5cGU6IFwibnVtYmVyXCIsIGRlZmF1bHQ6IDAgfX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25PcHRpb25DaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb259XHJcbiAgICAgICAgICAgIG9wdGlvbnM9e3sgZW51bU9wdGlvbnMgfX1cclxuICAgICAgICAgICAgey4uLnVpT3B0aW9uc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtvcHRpb24gIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgPF9TY2hlbWFGaWVsZFxyXG4gICAgICAgICAgICBzY2hlbWE9e29wdGlvblNjaGVtYX1cclxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxyXG4gICAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWF9XHJcbiAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cclxuICAgICAgICAgICAgaWRQcmVmaXg9e2lkUHJlZml4fVxyXG4gICAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5BbnlPZkZpZWxkLmRlZmF1bHRQcm9wcyA9IHtcclxuICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgZXJyb3JTY2hlbWE6IHt9LFxyXG4gIGlkU2NoZW1hOiB7fSxcclxuICB1aVNjaGVtYToge30sXHJcbn07XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQW55T2ZGaWVsZC5wcm9wVHlwZXMgPSB7XHJcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxyXG4gICAgYmFzZVR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB1aVNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGlkU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgZm9ybURhdGE6IFByb3BUeXBlcy5hbnksXHJcbiAgICBlcnJvclNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIHJlZ2lzdHJ5OiB0eXBlcy5yZWdpc3RyeS5pc1JlcXVpcmVkLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFueU9mRmllbGQ7XHJcbiJdfQ==