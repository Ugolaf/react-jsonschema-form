function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import AddButton from "../AddButton";
import IconButton from "../IconButton";
import React, { Component } from "react";
import includes from "core-js-pure/es/array/includes";
import * as types from "../../types";
import { getWidget, getDefaultFormState, getUiOptions, isMultiSelect, isFilesArray, isFixedItems, allowAdditionalItems, optionsList, retrieveSchema, toIdSchema, getDefaultRegistry } from "../../utils";
import { nanoid } from "nanoid";

function ArrayFieldTitle(_ref) {
  var TitleField = _ref.TitleField,
      idSchema = _ref.idSchema,
      title = _ref.title,
      required = _ref.required;

  if (!title) {
    return null;
  }

  var id = "".concat(idSchema.$id, "__title");
  return React.createElement(TitleField, {
    id: id,
    title: title,
    required: required
  });
}

function ArrayFieldDescription(_ref2) {
  var DescriptionField = _ref2.DescriptionField,
      idSchema = _ref2.idSchema,
      description = _ref2.description;

  if (!description) {
    return null;
  }

  var id = "".concat(idSchema.$id, "__description");
  return React.createElement(DescriptionField, {
    id: id,
    description: description
  });
} // Used in the two templates


function DefaultArrayItem(props) {
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return React.createElement("div", {
    key: props.key,
    className: props.className
  }, React.createElement("div", {
    className: props.hasToolbar ? "col-xs-9" : "col-xs-12"
  }, props.children), props.hasToolbar && React.createElement("div", {
    className: "col-xs-3 array-item-toolbox"
  }, React.createElement("div", {
    className: "btn-group",
    style: {
      display: "flex",
      justifyContent: "space-around"
    }
  }, (props.hasMoveUp || props.hasMoveDown) && React.createElement(IconButton, {
    icon: "arrow-up",
    "aria-label": "Move up",
    className: "array-item-move-up",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveUp,
    onClick: props.onReorderClick(props.index, props.index - 1)
  }), (props.hasMoveUp || props.hasMoveDown) && React.createElement(IconButton, {
    icon: "arrow-down",
    className: "array-item-move-down",
    "aria-label": "Move down",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveDown,
    onClick: props.onReorderClick(props.index, props.index + 1)
  }), props.hasRemove && React.createElement(IconButton, {
    type: "danger",
    icon: "remove",
    "aria-label": "Remove",
    className: "array-item-remove",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly,
    onClick: props.onDropIndexClick(props.index)
  }))));
}

function DefaultFixedArrayFieldTemplate(props) {
  return React.createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, React.createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && React.createElement("div", {
    className: "field-description",
    key: "field-description-".concat(props.idSchema.$id)
  }, props.uiSchema["ui:description"] || props.schema.description), React.createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && props.items.map(DefaultArrayItem)), props.canAdd && React.createElement(AddButton, {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
}

function DefaultNormalArrayFieldTemplate(props) {
  return React.createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, React.createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && React.createElement(ArrayFieldDescription, {
    key: "array-field-description-".concat(props.idSchema.$id),
    DescriptionField: props.DescriptionField,
    idSchema: props.idSchema,
    description: props.uiSchema["ui:description"] || props.schema.description
  }), React.createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && props.items.map(function (p) {
    return DefaultArrayItem(p);
  })), props.canAdd && React.createElement(AddButton, {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
}

function generateRowId() {
  return nanoid();
}

function generateKeyedFormData(formData) {
  return !Array.isArray(formData) ? [] : formData.map(function (item) {
    return {
      key: generateRowId(),
      item: item
    };
  });
}

function keyedToPlainFormData(keyedFormData) {
  return keyedFormData.map(function (keyedItem) {
    return keyedItem.item;
  });
}

var ArrayField =
/*#__PURE__*/
function (_Component) {
  _inherits(ArrayField, _Component);

  function ArrayField(props) {
    var _this;

    _classCallCheck(this, ArrayField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArrayField).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_getNewFormDataRow", function () {
      var _this$props = _this.props,
          schema = _this$props.schema,
          _this$props$registry = _this$props.registry,
          registry = _this$props$registry === void 0 ? getDefaultRegistry() : _this$props$registry;
      var rootSchema = registry.rootSchema;
      var itemSchema = schema.items;

      if (isFixedItems(schema) && allowAdditionalItems(schema)) {
        itemSchema = schema.additionalItems;
      }

      return getDefaultFormState(itemSchema, undefined, rootSchema);
    });

    _defineProperty(_assertThisInitialized(_this), "onAddClick", function (event) {
      if (event) {
        event.preventDefault();
      }

      var onChange = _this.props.onChange;
      var newKeyedFormDataRow = {
        key: generateRowId(),
        item: _this._getNewFormDataRow()
      };
      var newKeyedFormData = [].concat(_toConsumableArray(_this.state.keyedFormData), [newKeyedFormDataRow]);

      _this.setState({
        keyedFormData: newKeyedFormData,
        updatedKeyedFormData: true
      }, function () {
        return onChange(keyedToPlainFormData(newKeyedFormData));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddIndexClick", function (index) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        var onChange = _this.props.onChange;
        var newKeyedFormDataRow = {
          key: generateRowId(),
          item: _this._getNewFormDataRow()
        };

        var newKeyedFormData = _toConsumableArray(_this.state.keyedFormData);

        newKeyedFormData.splice(index, 0, newKeyedFormDataRow);

        _this.setState({
          keyedFormData: newKeyedFormData,
          updatedKeyedFormData: true
        }, function () {
          return onChange(keyedToPlainFormData(newKeyedFormData));
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onDropIndexClick", function (index) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        var onChange = _this.props.onChange;
        var keyedFormData = _this.state.keyedFormData; // refs #195: revalidate to ensure properly reindexing errors

        var newErrorSchema;

        if (_this.props.errorSchema) {
          newErrorSchema = {};
          var errorSchema = _this.props.errorSchema;

          for (var i in errorSchema) {
            i = parseInt(i);

            if (i < index) {
              newErrorSchema[i] = errorSchema[i];
            } else if (i > index) {
              newErrorSchema[i - 1] = errorSchema[i];
            }
          }
        }

        var newKeyedFormData = keyedFormData.filter(function (_, i) {
          return i !== index;
        });

        _this.setState({
          keyedFormData: newKeyedFormData,
          updatedKeyedFormData: true
        }, function () {
          return onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema);
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onReorderClick", function (index, newIndex) {
      return function (event) {
        if (event) {
          event.preventDefault();
          event.target.blur();
        }

        var onChange = _this.props.onChange;
        var newErrorSchema;

        if (_this.props.errorSchema) {
          newErrorSchema = {};
          var errorSchema = _this.props.errorSchema;

          for (var i in errorSchema) {
            if (i == index) {
              newErrorSchema[newIndex] = errorSchema[index];
            } else if (i == newIndex) {
              newErrorSchema[index] = errorSchema[newIndex];
            } else {
              newErrorSchema[i] = errorSchema[i];
            }
          }
        }

        var keyedFormData = _this.state.keyedFormData;

        function reOrderArray() {
          // Copy item
          var _newKeyedFormData = keyedFormData.slice(); // Moves item from index to newIndex


          _newKeyedFormData.splice(index, 1);

          _newKeyedFormData.splice(newIndex, 0, keyedFormData[index]);

          return _newKeyedFormData;
        }

        var newKeyedFormData = reOrderArray();

        _this.setState({
          keyedFormData: newKeyedFormData
        }, function () {
          return onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema);
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeForIndex", function (index) {
      return function (value, errorSchema) {
        var _this$props2 = _this.props,
            formData = _this$props2.formData,
            onChange = _this$props2.onChange;
        var newFormData = formData.map(function (item, i) {
          // We need to treat undefined items as nulls to have validation.
          // See https://github.com/tdegrunt/jsonschema/issues/206
          var jsonValue = typeof value === "undefined" ? null : value;
          return index === i ? jsonValue : item;
        });
        onChange(newFormData, errorSchema && _this.props.errorSchema && _objectSpread({}, _this.props.errorSchema, _defineProperty({}, index, errorSchema)));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectChange", function (value) {
      _this.props.onChange(value);
    });

    var _formData = props.formData;

    var _keyedFormData = generateKeyedFormData(_formData);

    _this.state = {
      keyedFormData: _keyedFormData,
      updatedKeyedFormData: false
    };
    return _this;
  }

  _createClass(ArrayField, [{
    key: "isItemRequired",
    value: function isItemRequired(itemSchema) {
      if (Array.isArray(itemSchema.type)) {
        // While we don't yet support composite/nullable jsonschema types, it's
        // future-proof to check for requirement against these.
        return !includes(itemSchema.type, "null");
      } // All non-null array item types are inherently required by design


      return itemSchema.type !== "null";
    }
  }, {
    key: "canAddItem",
    value: function canAddItem(formItems) {
      var _this$props3 = this.props,
          schema = _this$props3.schema,
          uiSchema = _this$props3.uiSchema;

      var _getUiOptions = getUiOptions(uiSchema),
          addable = _getUiOptions.addable;

      if (addable !== false) {
        // if ui:options.addable was not explicitly set to false, we can add
        // another item if we have not exceeded maxItems yet
        if (schema.maxItems !== undefined) {
          addable = formItems.length < schema.maxItems;
        } else {
          addable = true;
        }
      }

      return addable;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          schema = _this$props4.schema,
          uiSchema = _this$props4.uiSchema,
          idSchema = _this$props4.idSchema,
          _this$props4$registry = _this$props4.registry,
          registry = _this$props4$registry === void 0 ? getDefaultRegistry() : _this$props4$registry;
      var rootSchema = registry.rootSchema;

      if (!schema.hasOwnProperty("items")) {
        var fields = registry.fields;
        var UnsupportedField = fields.UnsupportedField;
        return React.createElement(UnsupportedField, {
          schema: schema,
          idSchema: idSchema,
          reason: "Missing items definition"
        });
      }

      if (isFixedItems(schema)) {
        return this.renderFixedArray();
      }

      if (isFilesArray(schema, uiSchema, rootSchema)) {
        return this.renderFiles();
      }

      if (isMultiSelect(schema, rootSchema)) {
        return this.renderMultiSelect();
      }

      return this.renderNormalArray();
    }
  }, {
    key: "renderNormalArray",
    value: function renderNormalArray() {
      var _this2 = this;

      var _this$props5 = this.props,
          schema = _this$props5.schema,
          uiSchema = _this$props5.uiSchema,
          errorSchema = _this$props5.errorSchema,
          idSchema = _this$props5.idSchema,
          name = _this$props5.name,
          required = _this$props5.required,
          disabled = _this$props5.disabled,
          readonly = _this$props5.readonly,
          autofocus = _this$props5.autofocus,
          _this$props5$registry = _this$props5.registry,
          registry = _this$props5$registry === void 0 ? getDefaultRegistry() : _this$props5$registry,
          onBlur = _this$props5.onBlur,
          onFocus = _this$props5.onFocus,
          idPrefix = _this$props5.idPrefix,
          rawErrors = _this$props5.rawErrors;
      var title = schema.title === undefined ? name : schema.title;
      var ArrayFieldTemplate = registry.ArrayFieldTemplate,
          rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;
      var itemsSchema = retrieveSchema(schema.items, rootSchema);
      var formData = keyedToPlainFormData(this.state.keyedFormData);
      var arrayProps = {
        canAdd: this.canAddItem(formData),
        items: this.state.keyedFormData.map(function (keyedItem, index) {
          var key = keyedItem.key,
              item = keyedItem.item;
          var itemSchema = retrieveSchema(schema.items, rootSchema, item);
          var itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
          var itemIdPrefix = idSchema.$id + "_" + index;
          var itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, rootSchema, item, idPrefix);
          return _this2.renderArrayFieldItem({
            key: key,
            index: index,
            canMoveUp: index > 0,
            canMoveDown: index < formData.length - 1,
            itemSchema: itemSchema,
            itemIdSchema: itemIdSchema,
            itemErrorSchema: itemErrorSchema,
            itemData: item,
            itemUiSchema: uiSchema.items,
            autofocus: autofocus && index === 0,
            onBlur: onBlur,
            onFocus: onFocus
          });
        }),
        className: "field field-array field-array-of-".concat(itemsSchema.type),
        DescriptionField: DescriptionField,
        disabled: disabled,
        idSchema: idSchema,
        uiSchema: uiSchema,
        onAddClick: this.onAddClick,
        readonly: readonly,
        required: required,
        schema: schema,
        title: title,
        TitleField: TitleField,
        formContext: formContext,
        formData: formData,
        rawErrors: rawErrors,
        registry: registry
      }; // Check if a custom render function was passed in

      var Component = uiSchema["ui:ArrayFieldTemplate"] || ArrayFieldTemplate || DefaultNormalArrayFieldTemplate;
      return React.createElement(Component, arrayProps);
    }
  }, {
    key: "renderMultiSelect",
    value: function renderMultiSelect() {
      var _this$props6 = this.props,
          schema = _this$props6.schema,
          idSchema = _this$props6.idSchema,
          uiSchema = _this$props6.uiSchema,
          formData = _this$props6.formData,
          disabled = _this$props6.disabled,
          readonly = _this$props6.readonly,
          required = _this$props6.required,
          placeholder = _this$props6.placeholder,
          autofocus = _this$props6.autofocus,
          onBlur = _this$props6.onBlur,
          onFocus = _this$props6.onFocus,
          _this$props6$registry = _this$props6.registry,
          registry = _this$props6$registry === void 0 ? getDefaultRegistry() : _this$props6$registry,
          rawErrors = _this$props6.rawErrors,
          name = _this$props6.name;
      var items = this.props.formData;
      var widgets = registry.widgets,
          rootSchema = registry.rootSchema,
          formContext = registry.formContext;
      var itemsSchema = retrieveSchema(schema.items, rootSchema, formData);
      var title = schema.title || name;
      var enumOptions = optionsList(itemsSchema);

      var _getUiOptions$enumOpt = _objectSpread({}, getUiOptions(uiSchema), {
        enumOptions: enumOptions
      }),
          _getUiOptions$enumOpt2 = _getUiOptions$enumOpt.widget,
          widget = _getUiOptions$enumOpt2 === void 0 ? "select" : _getUiOptions$enumOpt2,
          options = _objectWithoutProperties(_getUiOptions$enumOpt, ["widget"]);

      var Widget = getWidget(schema, widget, widgets);
      return React.createElement(Widget, {
        id: idSchema && idSchema.$id,
        multiple: true,
        onChange: this.onSelectChange,
        onBlur: onBlur,
        onFocus: onFocus,
        options: options,
        schema: schema,
        registry: registry,
        value: items,
        disabled: disabled,
        readonly: readonly,
        required: required,
        label: title,
        placeholder: placeholder,
        formContext: formContext,
        autofocus: autofocus,
        rawErrors: rawErrors
      });
    }
  }, {
    key: "renderFiles",
    value: function renderFiles() {
      var _this$props7 = this.props,
          schema = _this$props7.schema,
          uiSchema = _this$props7.uiSchema,
          idSchema = _this$props7.idSchema,
          name = _this$props7.name,
          disabled = _this$props7.disabled,
          readonly = _this$props7.readonly,
          autofocus = _this$props7.autofocus,
          onBlur = _this$props7.onBlur,
          onFocus = _this$props7.onFocus,
          _this$props7$registry = _this$props7.registry,
          registry = _this$props7$registry === void 0 ? getDefaultRegistry() : _this$props7$registry,
          rawErrors = _this$props7.rawErrors;
      var title = schema.title || name;
      var items = this.props.formData;
      var widgets = registry.widgets,
          formContext = registry.formContext;

      var _getUiOptions2 = getUiOptions(uiSchema),
          _getUiOptions2$widget = _getUiOptions2.widget,
          widget = _getUiOptions2$widget === void 0 ? "files" : _getUiOptions2$widget,
          options = _objectWithoutProperties(_getUiOptions2, ["widget"]);

      var Widget = getWidget(schema, widget, widgets);
      return React.createElement(Widget, {
        options: options,
        id: idSchema && idSchema.$id,
        multiple: true,
        onChange: this.onSelectChange,
        onBlur: onBlur,
        onFocus: onFocus,
        schema: schema,
        title: title,
        value: items,
        disabled: disabled,
        readonly: readonly,
        formContext: formContext,
        autofocus: autofocus,
        rawErrors: rawErrors
      });
    }
  }, {
    key: "renderFixedArray",
    value: function renderFixedArray() {
      var _this3 = this;

      var _this$props8 = this.props,
          schema = _this$props8.schema,
          uiSchema = _this$props8.uiSchema,
          formData = _this$props8.formData,
          errorSchema = _this$props8.errorSchema,
          idPrefix = _this$props8.idPrefix,
          idSchema = _this$props8.idSchema,
          name = _this$props8.name,
          required = _this$props8.required,
          disabled = _this$props8.disabled,
          readonly = _this$props8.readonly,
          autofocus = _this$props8.autofocus,
          _this$props8$registry = _this$props8.registry,
          registry = _this$props8$registry === void 0 ? getDefaultRegistry() : _this$props8$registry,
          onBlur = _this$props8.onBlur,
          onFocus = _this$props8.onFocus,
          rawErrors = _this$props8.rawErrors;
      var title = schema.title || name;
      var items = this.props.formData;
      var ArrayFieldTemplate = registry.ArrayFieldTemplate,
          rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var TitleField = fields.TitleField;
      var itemSchemas = schema.items.map(function (item, index) {
        return retrieveSchema(item, rootSchema, formData[index]);
      });
      var additionalSchema = allowAdditionalItems(schema) ? retrieveSchema(schema.additionalItems, rootSchema, formData) : null;

      if (!items || items.length < itemSchemas.length) {
        // to make sure at least all fixed items are generated
        items = items || [];
        items = items.concat(new Array(itemSchemas.length - items.length));
      } // These are the props passed into the render function


      var arrayProps = {
        canAdd: this.canAddItem(items) && additionalSchema,
        className: "field field-array field-array-fixed-items",
        disabled: disabled,
        idSchema: idSchema,
        formData: formData,
        items: this.state.keyedFormData.map(function (keyedItem, index) {
          var key = keyedItem.key,
              item = keyedItem.item;
          var additional = index >= itemSchemas.length;
          var itemSchema = additional ? retrieveSchema(schema.additionalItems, rootSchema, item) : itemSchemas[index];
          var itemIdPrefix = idSchema.$id + "_" + index;
          var itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, rootSchema, item, idPrefix);
          var itemUiSchema = additional ? uiSchema.additionalItems || {} : Array.isArray(uiSchema.items) ? uiSchema.items[index] : uiSchema.items || {};
          var itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
          return _this3.renderArrayFieldItem({
            key: key,
            index: index,
            canRemove: additional,
            canMoveUp: index >= itemSchemas.length + 1,
            canMoveDown: additional && index < items.length - 1,
            itemSchema: itemSchema,
            itemData: item,
            itemUiSchema: itemUiSchema,
            itemIdSchema: itemIdSchema,
            itemErrorSchema: itemErrorSchema,
            autofocus: autofocus && index === 0,
            onBlur: onBlur,
            onFocus: onFocus
          });
        }),
        onAddClick: this.onAddClick,
        readonly: readonly,
        required: required,
        schema: schema,
        uiSchema: uiSchema,
        title: title,
        TitleField: TitleField,
        formContext: formContext,
        rawErrors: rawErrors
      }; // Check if a custom template template was passed in

      var Template = uiSchema["ui:ArrayFieldTemplate"] || ArrayFieldTemplate || DefaultFixedArrayFieldTemplate;
      return React.createElement(Template, arrayProps);
    }
  }, {
    key: "renderArrayFieldItem",
    value: function renderArrayFieldItem(props) {
      var key = props.key,
          index = props.index,
          _props$canRemove = props.canRemove,
          canRemove = _props$canRemove === void 0 ? true : _props$canRemove,
          _props$canMoveUp = props.canMoveUp,
          canMoveUp = _props$canMoveUp === void 0 ? true : _props$canMoveUp,
          _props$canMoveDown = props.canMoveDown,
          canMoveDown = _props$canMoveDown === void 0 ? true : _props$canMoveDown,
          itemSchema = props.itemSchema,
          itemData = props.itemData,
          itemUiSchema = props.itemUiSchema,
          itemIdSchema = props.itemIdSchema,
          itemErrorSchema = props.itemErrorSchema,
          autofocus = props.autofocus,
          onBlur = props.onBlur,
          onFocus = props.onFocus,
          rawErrors = props.rawErrors;
      var _this$props9 = this.props,
          disabled = _this$props9.disabled,
          readonly = _this$props9.readonly,
          uiSchema = _this$props9.uiSchema,
          _this$props9$registry = _this$props9.registry,
          registry = _this$props9$registry === void 0 ? getDefaultRegistry() : _this$props9$registry;
      var SchemaField = registry.fields.SchemaField;

      var _orderable$removable$ = _objectSpread({
        orderable: true,
        removable: true
      }, uiSchema["ui:options"]),
          orderable = _orderable$removable$.orderable,
          removable = _orderable$removable$.removable;

      var has = {
        moveUp: orderable && canMoveUp,
        moveDown: orderable && canMoveDown,
        remove: removable && canRemove
      };
      has.toolbar = Object.keys(has).some(function (key) {
        return has[key];
      });
      return {
        children: React.createElement(SchemaField, {
          index: index,
          schema: itemSchema,
          uiSchema: itemUiSchema,
          formData: itemData,
          errorSchema: itemErrorSchema,
          idSchema: itemIdSchema,
          required: this.isItemRequired(itemSchema),
          onChange: this.onChangeForIndex(index),
          onBlur: onBlur,
          onFocus: onFocus,
          registry: this.props.registry,
          disabled: this.props.disabled,
          readonly: this.props.readonly,
          autofocus: autofocus,
          rawErrors: rawErrors
        }),
        className: "array-item",
        disabled: disabled,
        hasToolbar: has.toolbar,
        hasMoveUp: has.moveUp,
        hasMoveDown: has.moveDown,
        hasRemove: has.remove,
        index: index,
        key: key,
        onAddIndexClick: this.onAddIndexClick,
        onDropIndexClick: this.onDropIndexClick,
        onReorderClick: this.onReorderClick,
        readonly: readonly
      };
    }
  }, {
    key: "itemTitle",
    get: function get() {
      var schema = this.props.schema;
      return schema.items.title || schema.items.description || "Item";
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // Don't call getDerivedStateFromProps if keyed formdata was just updated.
      if (prevState.updatedKeyedFormData) {
        return {
          updatedKeyedFormData: false
        };
      }

      var nextFormData = nextProps.formData || [];
      var previousKeyedFormData = prevState.keyedFormData || [];
      var newKeyedFormData = nextFormData.length === previousKeyedFormData.length ? previousKeyedFormData.map(function (previousKeyedFormDatum, index) {
        return {
          key: previousKeyedFormDatum.key,
          item: nextFormData[index]
        };
      }) : generateKeyedFormData(nextFormData);
      return {
        keyedFormData: newKeyedFormData
      };
    }
  }]);

  return ArrayField;
}(Component);

_defineProperty(ArrayField, "defaultProps", {
  uiSchema: {},
  formData: [],
  idSchema: {},
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
});

if (process.env.NODE_ENV !== "production") {
  ArrayField.propTypes = types.fieldProps;
}

export default ArrayField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9BcnJheUZpZWxkLmpzIl0sIm5hbWVzIjpbIkFkZEJ1dHRvbiIsIkljb25CdXR0b24iLCJSZWFjdCIsIkNvbXBvbmVudCIsImluY2x1ZGVzIiwidHlwZXMiLCJnZXRXaWRnZXQiLCJnZXREZWZhdWx0Rm9ybVN0YXRlIiwiZ2V0VWlPcHRpb25zIiwiaXNNdWx0aVNlbGVjdCIsImlzRmlsZXNBcnJheSIsImlzRml4ZWRJdGVtcyIsImFsbG93QWRkaXRpb25hbEl0ZW1zIiwib3B0aW9uc0xpc3QiLCJyZXRyaWV2ZVNjaGVtYSIsInRvSWRTY2hlbWEiLCJnZXREZWZhdWx0UmVnaXN0cnkiLCJuYW5vaWQiLCJBcnJheUZpZWxkVGl0bGUiLCJUaXRsZUZpZWxkIiwiaWRTY2hlbWEiLCJ0aXRsZSIsInJlcXVpcmVkIiwiaWQiLCIkaWQiLCJBcnJheUZpZWxkRGVzY3JpcHRpb24iLCJEZXNjcmlwdGlvbkZpZWxkIiwiZGVzY3JpcHRpb24iLCJEZWZhdWx0QXJyYXlJdGVtIiwicHJvcHMiLCJidG5TdHlsZSIsImZsZXgiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImZvbnRXZWlnaHQiLCJrZXkiLCJjbGFzc05hbWUiLCJoYXNUb29sYmFyIiwiY2hpbGRyZW4iLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJoYXNNb3ZlVXAiLCJoYXNNb3ZlRG93biIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJvblJlb3JkZXJDbGljayIsImluZGV4IiwiaGFzUmVtb3ZlIiwib25Ecm9wSW5kZXhDbGljayIsIkRlZmF1bHRGaXhlZEFycmF5RmllbGRUZW1wbGF0ZSIsInVpU2NoZW1hIiwic2NoZW1hIiwiaXRlbXMiLCJtYXAiLCJjYW5BZGQiLCJvbkFkZENsaWNrIiwiRGVmYXVsdE5vcm1hbEFycmF5RmllbGRUZW1wbGF0ZSIsInAiLCJnZW5lcmF0ZVJvd0lkIiwiZ2VuZXJhdGVLZXllZEZvcm1EYXRhIiwiZm9ybURhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtIiwia2V5ZWRUb1BsYWluRm9ybURhdGEiLCJrZXllZEZvcm1EYXRhIiwia2V5ZWRJdGVtIiwiQXJyYXlGaWVsZCIsInJlZ2lzdHJ5Iiwicm9vdFNjaGVtYSIsIml0ZW1TY2hlbWEiLCJhZGRpdGlvbmFsSXRlbXMiLCJ1bmRlZmluZWQiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwib25DaGFuZ2UiLCJuZXdLZXllZEZvcm1EYXRhUm93IiwiX2dldE5ld0Zvcm1EYXRhUm93IiwibmV3S2V5ZWRGb3JtRGF0YSIsInN0YXRlIiwic2V0U3RhdGUiLCJ1cGRhdGVkS2V5ZWRGb3JtRGF0YSIsInNwbGljZSIsIm5ld0Vycm9yU2NoZW1hIiwiZXJyb3JTY2hlbWEiLCJpIiwicGFyc2VJbnQiLCJmaWx0ZXIiLCJfIiwibmV3SW5kZXgiLCJ0YXJnZXQiLCJibHVyIiwicmVPcmRlckFycmF5IiwiX25ld0tleWVkRm9ybURhdGEiLCJzbGljZSIsInZhbHVlIiwibmV3Rm9ybURhdGEiLCJqc29uVmFsdWUiLCJ0eXBlIiwiZm9ybUl0ZW1zIiwiYWRkYWJsZSIsIm1heEl0ZW1zIiwibGVuZ3RoIiwiaGFzT3duUHJvcGVydHkiLCJmaWVsZHMiLCJVbnN1cHBvcnRlZEZpZWxkIiwicmVuZGVyRml4ZWRBcnJheSIsInJlbmRlckZpbGVzIiwicmVuZGVyTXVsdGlTZWxlY3QiLCJyZW5kZXJOb3JtYWxBcnJheSIsIm5hbWUiLCJhdXRvZm9jdXMiLCJvbkJsdXIiLCJvbkZvY3VzIiwiaWRQcmVmaXgiLCJyYXdFcnJvcnMiLCJBcnJheUZpZWxkVGVtcGxhdGUiLCJmb3JtQ29udGV4dCIsIml0ZW1zU2NoZW1hIiwiYXJyYXlQcm9wcyIsImNhbkFkZEl0ZW0iLCJpdGVtRXJyb3JTY2hlbWEiLCJpdGVtSWRQcmVmaXgiLCJpdGVtSWRTY2hlbWEiLCJyZW5kZXJBcnJheUZpZWxkSXRlbSIsImNhbk1vdmVVcCIsImNhbk1vdmVEb3duIiwiaXRlbURhdGEiLCJpdGVtVWlTY2hlbWEiLCJwbGFjZWhvbGRlciIsIndpZGdldHMiLCJlbnVtT3B0aW9ucyIsIndpZGdldCIsIm9wdGlvbnMiLCJXaWRnZXQiLCJvblNlbGVjdENoYW5nZSIsIml0ZW1TY2hlbWFzIiwiYWRkaXRpb25hbFNjaGVtYSIsImNvbmNhdCIsImFkZGl0aW9uYWwiLCJjYW5SZW1vdmUiLCJUZW1wbGF0ZSIsIlNjaGVtYUZpZWxkIiwib3JkZXJhYmxlIiwicmVtb3ZhYmxlIiwiaGFzIiwibW92ZVVwIiwibW92ZURvd24iLCJyZW1vdmUiLCJ0b29sYmFyIiwiT2JqZWN0Iiwia2V5cyIsInNvbWUiLCJpc0l0ZW1SZXF1aXJlZCIsIm9uQ2hhbmdlRm9ySW5kZXgiLCJvbkFkZEluZGV4Q2xpY2siLCJuZXh0UHJvcHMiLCJwcmV2U3RhdGUiLCJuZXh0Rm9ybURhdGEiLCJwcmV2aW91c0tleWVkRm9ybURhdGEiLCJwcmV2aW91c0tleWVkRm9ybURhdHVtIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiZmllbGRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGVBQXZCO0FBQ0EsT0FBT0MsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLGdDQUFyQjtBQUNBLE9BQU8sS0FBS0MsS0FBWixNQUF1QixhQUF2QjtBQUVBLFNBQ0VDLFNBREYsRUFFRUMsbUJBRkYsRUFHRUMsWUFIRixFQUlFQyxhQUpGLEVBS0VDLFlBTEYsRUFNRUMsWUFORixFQU9FQyxvQkFQRixFQVFFQyxXQVJGLEVBU0VDLGNBVEYsRUFVRUMsVUFWRixFQVdFQyxrQkFYRixRQVlPLGFBWlA7QUFhQSxTQUFTQyxNQUFULFFBQXVCLFFBQXZCOztBQUVBLFNBQVNDLGVBQVQsT0FBb0U7QUFBQSxNQUF6Q0MsVUFBeUMsUUFBekNBLFVBQXlDO0FBQUEsTUFBN0JDLFFB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VUFBTWEsZ0JBQWdCLEdBQ3BCZ0YsWUFBWSxDQUFDeEQsTUFBYixLQUF3QnlELHFCQUFxQixDQUFDekQsTUFBOUMsR0FDSXlELHFCQUFxQixDQUFDMUcsR0FBdEIsQ0FBMEIsVUFBQzJHLHNCQUFELEVBQXlCbEgsS0FBekIsRUFBbUM7QUFDM0QsZUFBTztBQUNMWCxVQUFBQSxHQUFHLEVBQUU2SCxzQkFBc0IsQ0FBQzdILEdBRHZCO0FBRUw0QixVQUFBQSxJQUFJLEVBQUUrRixZQUFZLENBQUNoSCxLQUFEO0FBRmIsU0FBUDtBQUlELE9BTEQsQ0FESixHQU9JYSxxQkFBcUIsQ0FBQ21HLFlBQUQsQ0FSM0I7QUFTQSxhQUFPO0FBQ0w3RixRQUFBQSxhQUFhLEVBQUVhO0FBRFYsT0FBUDtBQUdEOzs7O0VBMUNzQjNFLFM7O2dCQUFuQmdFLFUsa0JBQ2tCO0FBQ3BCakIsRUFBQUEsUUFBUSxFQUFFLEVBRFU7QUFFcEJVLEVBQUFBLFFBQVEsRUFBRSxFQUZVO0FBR3BCeEMsRUFBQUEsUUFBUSxFQUFFLEVBSFU7QUFJcEJFLEVBQUFBLFFBQVEsRUFBRSxLQUpVO0FBS3BCcUIsRUFBQUEsUUFBUSxFQUFFLEtBTFU7QUFNcEJDLEVBQUFBLFFBQVEsRUFBRSxLQU5VO0FBT3BCbUUsRUFBQUEsU0FBUyxFQUFFO0FBUFMsQzs7QUFrbEJ4QixJQUFJa0QsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNoRyxFQUFBQSxVQUFVLENBQUNpRyxTQUFYLEdBQXVCL0osS0FBSyxDQUFDZ0ssVUFBN0I7QUFDRDs7QUFFRCxlQUFlbEcsVUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZGRCdXR0b24gZnJvbSBcIi4uL0FkZEJ1dHRvblwiO1xyXG5pbXBvcnQgSWNvbkJ1dHRvbiBmcm9tIFwiLi4vSWNvbkJ1dHRvblwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBpbmNsdWRlcyBmcm9tIFwiY29yZS1qcy1wdXJlL2VzL2FycmF5L2luY2x1ZGVzXCI7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICBnZXRXaWRnZXQsXHJcbiAgZ2V0RGVmYXVsdEZvcm1TdGF0ZSxcclxuICBnZXRVaU9wdGlvbnMsXHJcbiAgaXNNdWx0aVNlbGVjdCxcclxuICBpc0ZpbGVzQXJyYXksXHJcbiAgaXNGaXhlZEl0ZW1zLFxyXG4gIGFsbG93QWRkaXRpb25hbEl0ZW1zLFxyXG4gIG9wdGlvbnNMaXN0LFxyXG4gIHJldHJpZXZlU2NoZW1hLFxyXG4gIHRvSWRTY2hlbWEsXHJcbiAgZ2V0RGVmYXVsdFJlZ2lzdHJ5LFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBuYW5vaWQgfSBmcm9tIFwibmFub2lkXCI7XHJcblxyXG5mdW5jdGlvbiBBcnJheUZpZWxkVGl0bGUoeyBUaXRsZUZpZWxkLCBpZFNjaGVtYSwgdGl0bGUsIHJlcXVpcmVkIH0pIHtcclxuICBpZiAoIXRpdGxlKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgY29uc3QgaWQgPSBgJHtpZFNjaGVtYS4kaWR9X190aXRsZWA7XHJcbiAgcmV0dXJuIDxUaXRsZUZpZWxkIGlkPXtpZH0gdGl0bGU9e3RpdGxlfSByZXF1aXJlZD17cmVxdWlyZWR9IC8+O1xyXG59XHJcblxyXG5mdW5jdGlvbiBBcnJheUZpZWxkRGVzY3JpcHRpb24oeyBEZXNjcmlwdGlvbkZpZWxkLCBpZFNjaGVtYSwgZGVzY3JpcHRpb24gfSkge1xyXG4gIGlmICghZGVzY3JpcHRpb24pIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBjb25zdCBpZCA9IGAke2lkU2NoZW1hLiRpZH1fX2Rlc2NyaXB0aW9uYDtcclxuICByZXR1cm4gPERlc2NyaXB0aW9uRmllbGQgaWQ9e2lkfSBkZXNjcmlwdGlvbj17ZGVzY3JpcHRpb259IC8+O1xyXG59XHJcblxyXG4vLyBVc2VkIGluIHRoZSB0d28gdGVtcGxhdGVzXHJcbmZ1bmN0aW9uIERlZmF1bHRBcnJheUl0ZW0ocHJvcHMpIHtcclxuICBjb25zdCBidG5TdHlsZSA9IHtcclxuICAgIGZsZXg6IDEsXHJcbiAgICBwYWRkaW5nTGVmdDogNixcclxuICAgIHBhZGRpbmdSaWdodDogNixcclxuICAgIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxyXG4gIH07XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYga2V5PXtwcm9wcy5rZXl9IGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3Byb3BzLmhhc1Rvb2xiYXIgPyBcImNvbC14cy05XCIgOiBcImNvbC14cy0xMlwifT5cclxuICAgICAgICB7cHJvcHMuY2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge3Byb3BzLmhhc1Rvb2xiYXIgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTMgYXJyYXktaXRlbS10b29sYm94XCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYXJvdW5kXCIsXHJcbiAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICB7KHByb3BzLmhhc01vdmVVcCB8fCBwcm9wcy5oYXNNb3ZlRG93bikgJiYgKFxyXG4gICAgICAgICAgICAgIDxJY29uQnV0dG9uXHJcbiAgICAgICAgICAgICAgICBpY29uPVwiYXJyb3ctdXBcIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk1vdmUgdXBcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXJyYXktaXRlbS1tb3ZlLXVwXCJcclxuICAgICAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e2J0blN0eWxlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkIHx8IHByb3BzLnJlYWRvbmx5IHx8ICFwcm9wcy5oYXNNb3ZlVXB9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vblJlb3JkZXJDbGljayhwcm9wcy5pbmRleCwgcHJvcHMuaW5kZXggLSAxKX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgeyhwcm9wcy5oYXNNb3ZlVXAgfHwgcHJvcHMuaGFzTW92ZURvd24pICYmIChcclxuICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxyXG4gICAgICAgICAgICAgICAgaWNvbj1cImFycm93LWRvd25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXJyYXktaXRlbS1tb3ZlLWRvd25cIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk1vdmUgZG93blwiXHJcbiAgICAgICAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcclxuICAgICAgICAgICAgICAgIHN0eWxlPXtidG5TdHlsZX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtcclxuICAgICAgICAgICAgICAgICAgcHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHkgfHwgIXByb3BzLmhhc01vdmVEb3duXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vblJlb3JkZXJDbGljayhwcm9wcy5pbmRleCwgcHJvcHMuaW5kZXggKyAxKX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAge3Byb3BzLmhhc1JlbW92ZSAmJiAoXHJcbiAgICAgICAgICAgICAgPEljb25CdXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJkYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgaWNvbj1cInJlbW92ZVwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiUmVtb3ZlXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tcmVtb3ZlXCJcclxuICAgICAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e2J0blN0eWxlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkIHx8IHByb3BzLnJlYWRvbmx5fVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17cHJvcHMub25Ecm9wSW5kZXhDbGljayhwcm9wcy5pbmRleCl9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGVmYXVsdEZpeGVkQXJyYXlGaWVsZFRlbXBsYXRlKHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxmaWVsZHNldCBjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX0gaWQ9e3Byb3BzLmlkU2NoZW1hLiRpZH0+XHJcbiAgICAgIDxBcnJheUZpZWxkVGl0bGVcclxuICAgICAgICBrZXk9e2BhcnJheS1maWVsZC10aXRsZS0ke3Byb3BzLmlkU2NoZW1hLiRpZH1gfVxyXG4gICAgICAgIFRpdGxlRmllbGQ9e3Byb3BzLlRpdGxlRmllbGR9XHJcbiAgICAgICAgaWRTY2hlbWE9e3Byb3BzLmlkU2NoZW1hfVxyXG4gICAgICAgIHRpdGxlPXtwcm9wcy51aVNjaGVtYVtcInVpOnRpdGxlXCJdIHx8IHByb3BzLnRpdGxlfVxyXG4gICAgICAgIHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHsocHJvcHMudWlTY2hlbWFbXCJ1aTpkZXNjcmlwdGlvblwiXSB8fCBwcm9wcy5zY2hlbWEuZGVzY3JpcHRpb24pICYmIChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmaWVsZC1kZXNjcmlwdGlvblwiXHJcbiAgICAgICAgICBrZXk9e2BmaWVsZC1kZXNjcmlwdGlvbi0ke3Byb3BzLmlkU2NoZW1hLiRpZH1gfT5cclxuICAgICAgICAgIHtwcm9wcy51aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8IHByb3BzLnNjaGVtYS5kZXNjcmlwdGlvbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJyb3cgYXJyYXktaXRlbS1saXN0XCJcclxuICAgICAgICBrZXk9e2BhcnJheS1pdGVtLWxpc3QtJHtwcm9wcy5pZFNjaGVtYS4kaWR9YH0+XHJcbiAgICAgICAge3Byb3BzLml0ZW1zICYmIHByb3BzLml0ZW1zLm1hcChEZWZhdWx0QXJyYXlJdGVtKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7cHJvcHMuY2FuQWRkICYmIChcclxuICAgICAgICA8QWRkQnV0dG9uXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJhcnJheS1pdGVtLWFkZFwiXHJcbiAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkFkZENsaWNrfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkIHx8IHByb3BzLnJlYWRvbmx5fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIERlZmF1bHROb3JtYWxBcnJheUZpZWxkVGVtcGxhdGUocHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGZpZWxkc2V0IGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfSBpZD17cHJvcHMuaWRTY2hlbWEuJGlkfT5cclxuICAgICAgPEFycmF5RmllbGRUaXRsZVxyXG4gICAgICAgIGtleT17YGFycmF5LWZpZWxkLXRpdGxlLSR7cHJvcHMuaWRTY2hlbWEuJGlkfWB9XHJcbiAgICAgICAgVGl0bGVGaWVsZD17cHJvcHMuVGl0bGVGaWVsZH1cclxuICAgICAgICBpZFNjaGVtYT17cHJvcHMuaWRTY2hlbWF9XHJcbiAgICAgICAgdGl0bGU9e3Byb3BzLnVpU2NoZW1hW1widWk6dGl0bGVcIl0gfHwgcHJvcHMudGl0bGV9XHJcbiAgICAgICAgcmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgeyhwcm9wcy51aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8IHByb3BzLnNjaGVtYS5kZXNjcmlwdGlvbikgJiYgKFxyXG4gICAgICAgIDxBcnJheUZpZWxkRGVzY3JpcHRpb25cclxuICAgICAgICAgIGtleT17YGFycmF5LWZpZWxkLWRlc2NyaXB0aW9uLSR7cHJvcHMuaWRTY2hlbWEuJGlkfWB9XHJcbiAgICAgICAgICBEZXNjcmlwdGlvbkZpZWxkPXtwcm9wcy5EZXNjcmlwdGlvbkZpZWxkfVxyXG4gICAgICAgICAgaWRTY2hlbWE9e3Byb3BzLmlkU2NoZW1hfVxyXG4gICAgICAgICAgZGVzY3JpcHRpb249e1xyXG4gICAgICAgICAgICBwcm9wcy51aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8IHByb3BzLnNjaGVtYS5kZXNjcmlwdGlvblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicm93IGFycmF5LWl0ZW0tbGlzdFwiXHJcbiAgICAgICAga2V5PXtgYXJyYXktaXRlbS1saXN0LSR7cHJvcHMuaWRTY2hlbWEuJGlkfWB9PlxyXG4gICAgICAgIHtwcm9wcy5pdGVtcyAmJiBwcm9wcy5pdGVtcy5tYXAocCA9PiBEZWZhdWx0QXJyYXlJdGVtKHApKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7cHJvcHMuY2FuQWRkICYmIChcclxuICAgICAgICA8QWRkQnV0dG9uXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJhcnJheS1pdGVtLWFkZFwiXHJcbiAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkFkZENsaWNrfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkIHx8IHByb3BzLnJlYWRvbmx5fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlUm93SWQoKSB7XHJcbiAgcmV0dXJuIG5hbm9pZCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUtleWVkRm9ybURhdGEoZm9ybURhdGEpIHtcclxuICByZXR1cm4gIUFycmF5LmlzQXJyYXkoZm9ybURhdGEpXHJcbiAgICA/IFtdXHJcbiAgICA6IGZvcm1EYXRhLm1hcChpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAga2V5OiBnZW5lcmF0ZVJvd0lkKCksXHJcbiAgICAgICAgICBpdGVtLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBrZXllZFRvUGxhaW5Gb3JtRGF0YShrZXllZEZvcm1EYXRhKSB7XHJcbiAgcmV0dXJuIGtleWVkRm9ybURhdGEubWFwKGtleWVkSXRlbSA9PiBrZXllZEl0ZW0uaXRlbSk7XHJcbn1cclxuXHJcbmNsYXNzIEFycmF5RmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB1aVNjaGVtYToge30sXHJcbiAgICBmb3JtRGF0YTogW10sXHJcbiAgICBpZFNjaGVtYToge30sXHJcbiAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICByZWFkb25seTogZmFsc2UsXHJcbiAgICBhdXRvZm9jdXM6IGZhbHNlLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICBjb25zdCB7IGZvcm1EYXRhIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGtleWVkRm9ybURhdGEgPSBnZW5lcmF0ZUtleWVkRm9ybURhdGEoZm9ybURhdGEpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAga2V5ZWRGb3JtRGF0YSxcclxuICAgICAgdXBkYXRlZEtleWVkRm9ybURhdGE6IGZhbHNlLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcclxuICAgIC8vIERvbid0IGNhbGwgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIGlmIGtleWVkIGZvcm1kYXRhIHdhcyBqdXN0IHVwZGF0ZWQuXHJcbiAgICBpZiAocHJldlN0YXRlLnVwZGF0ZWRLZXllZEZvcm1EYXRhKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdXBkYXRlZEtleWVkRm9ybURhdGE6IGZhbHNlLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgbmV4dEZvcm1EYXRhID0gbmV4dFByb3BzLmZvcm1EYXRhIHx8IFtdO1xyXG4gICAgY29uc3QgcHJldmlvdXNLZXllZEZvcm1EYXRhID0gcHJldlN0YXRlLmtleWVkRm9ybURhdGEgfHwgW107XHJcbiAgICBjb25zdCBuZXdLZXllZEZvcm1EYXRhID1cclxuICAgICAgbmV4dEZvcm1EYXRhLmxlbmd0aCA9PT0gcHJldmlvdXNLZXllZEZvcm1EYXRhLmxlbmd0aFxyXG4gICAgICAgID8gcHJldmlvdXNLZXllZEZvcm1EYXRhLm1hcCgocHJldmlvdXNLZXllZEZvcm1EYXR1bSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICBrZXk6IHByZXZpb3VzS2V5ZWRGb3JtRGF0dW0ua2V5LFxyXG4gICAgICAgICAgICAgIGl0ZW06IG5leHRGb3JtRGF0YVtpbmRleF0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIDogZ2VuZXJhdGVLZXllZEZvcm1EYXRhKG5leHRGb3JtRGF0YSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBrZXllZEZvcm1EYXRhOiBuZXdLZXllZEZvcm1EYXRhLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldCBpdGVtVGl0bGUoKSB7XHJcbiAgICBjb25zdCB7IHNjaGVtYSB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiBzY2hlbWEuaXRlbXMudGl0bGUgfHwgc2NoZW1hLml0ZW1zLmRlc2NyaXB0aW9uIHx8IFwiSXRlbVwiO1xyXG4gIH1cclxuXHJcbiAgaXNJdGVtUmVxdWlyZWQoaXRlbVNjaGVtYSkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbVNjaGVtYS50eXBlKSkge1xyXG4gICAgICAvLyBXaGlsZSB3ZSBkb24ndCB5ZXQgc3VwcG9ydCBjb21wb3NpdGUvbnVsbGFibGUganNvbnNjaGVtYSB0eXBlcywgaXQnc1xyXG4gICAgICAvLyBmdXR1cmUtcHJvb2YgdG8gY2hlY2sgZm9yIHJlcXVpcmVtZW50IGFnYWluc3QgdGhlc2UuXHJcbiAgICAgIHJldHVybiAhaW5jbHVkZXMoaXRlbVNjaGVtYS50eXBlLCBcIm51bGxcIik7XHJcbiAgICB9XHJcbiAgICAvLyBBbGwgbm9uLW51bGwgYXJyYXkgaXRlbSB0eXBlcyBhcmUgaW5oZXJlbnRseSByZXF1aXJlZCBieSBkZXNpZ25cclxuICAgIHJldHVybiBpdGVtU2NoZW1hLnR5cGUgIT09IFwibnVsbFwiO1xyXG4gIH1cclxuXHJcbiAgY2FuQWRkSXRlbShmb3JtSXRlbXMpIHtcclxuICAgIGNvbnN0IHsgc2NoZW1hLCB1aVNjaGVtYSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGxldCB7IGFkZGFibGUgfSA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgICBpZiAoYWRkYWJsZSAhPT0gZmFsc2UpIHtcclxuICAgICAgLy8gaWYgdWk6b3B0aW9ucy5hZGRhYmxlIHdhcyBub3QgZXhwbGljaXRseSBzZXQgdG8gZmFsc2UsIHdlIGNhbiBhZGRcclxuICAgICAgLy8gYW5vdGhlciBpdGVtIGlmIHdlIGhhdmUgbm90IGV4Y2VlZGVkIG1heEl0ZW1zIHlldFxyXG4gICAgICBpZiAoc2NoZW1hLm1heEl0ZW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBhZGRhYmxlID0gZm9ybUl0ZW1zLmxlbmd0aCA8IHNjaGVtYS5tYXhJdGVtcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhZGRhYmxlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFkZGFibGU7XHJcbiAgfVxyXG5cclxuICBfZ2V0TmV3Rm9ybURhdGFSb3cgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IHNjaGVtYSwgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgcm9vdFNjaGVtYSB9ID0gcmVnaXN0cnk7XHJcbiAgICBsZXQgaXRlbVNjaGVtYSA9IHNjaGVtYS5pdGVtcztcclxuICAgIGlmIChpc0ZpeGVkSXRlbXMoc2NoZW1hKSAmJiBhbGxvd0FkZGl0aW9uYWxJdGVtcyhzY2hlbWEpKSB7XHJcbiAgICAgIGl0ZW1TY2hlbWEgPSBzY2hlbWEuYWRkaXRpb25hbEl0ZW1zO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdldERlZmF1bHRGb3JtU3RhdGUoaXRlbVNjaGVtYSwgdW5kZWZpbmVkLCByb290U2NoZW1hKTtcclxuICB9O1xyXG5cclxuICBvbkFkZENsaWNrID0gZXZlbnQgPT4ge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IG5ld0tleWVkRm9ybURhdGFSb3cgPSB7XHJcbiAgICAgIGtleTogZ2VuZXJhdGVSb3dJZCgpLFxyXG4gICAgICBpdGVtOiB0aGlzLl9nZXROZXdGb3JtRGF0YVJvdygpLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG5ld0tleWVkRm9ybURhdGEgPSBbLi4udGhpcy5zdGF0ZS5rZXllZEZvcm1EYXRhLCBuZXdLZXllZEZvcm1EYXRhUm93XTtcclxuICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgIHtcclxuICAgICAgICBrZXllZEZvcm1EYXRhOiBuZXdLZXllZEZvcm1EYXRhLFxyXG4gICAgICAgIHVwZGF0ZWRLZXllZEZvcm1EYXRhOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiBvbkNoYW5nZShrZXllZFRvUGxhaW5Gb3JtRGF0YShuZXdLZXllZEZvcm1EYXRhKSlcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgb25BZGRJbmRleENsaWNrID0gaW5kZXggPT4ge1xyXG4gICAgcmV0dXJuIGV2ZW50ID0+IHtcclxuICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICBjb25zdCBuZXdLZXllZEZvcm1EYXRhUm93ID0ge1xyXG4gICAgICAgIGtleTogZ2VuZXJhdGVSb3dJZCgpLFxyXG4gICAgICAgIGl0ZW06IHRoaXMuX2dldE5ld0Zvcm1EYXRhUm93KCksXHJcbiAgICAgIH07XHJcbiAgICAgIGxldCBuZXdLZXllZEZvcm1EYXRhID0gWy4uLnRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YV07XHJcbiAgICAgIG5ld0tleWVkRm9ybURhdGEuc3BsaWNlKGluZGV4LCAwLCBuZXdLZXllZEZvcm1EYXRhUm93KTtcclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAga2V5ZWRGb3JtRGF0YTogbmV3S2V5ZWRGb3JtRGF0YSxcclxuICAgICAgICAgIHVwZGF0ZWRLZXllZEZvcm1EYXRhOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4gb25DaGFuZ2Uoa2V5ZWRUb1BsYWluRm9ybURhdGEobmV3S2V5ZWRGb3JtRGF0YSkpXHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIG9uRHJvcEluZGV4Q2xpY2sgPSBpbmRleCA9PiB7XHJcbiAgICByZXR1cm4gZXZlbnQgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIGNvbnN0IHsga2V5ZWRGb3JtRGF0YSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgLy8gcmVmcyAjMTk1OiByZXZhbGlkYXRlIHRvIGVuc3VyZSBwcm9wZXJseSByZWluZGV4aW5nIGVycm9yc1xyXG4gICAgICBsZXQgbmV3RXJyb3JTY2hlbWE7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLmVycm9yU2NoZW1hKSB7XHJcbiAgICAgICAgbmV3RXJyb3JTY2hlbWEgPSB7fTtcclxuICAgICAgICBjb25zdCBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXJyb3JTY2hlbWE7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBlcnJvclNjaGVtYSkge1xyXG4gICAgICAgICAgaSA9IHBhcnNlSW50KGkpO1xyXG4gICAgICAgICAgaWYgKGkgPCBpbmRleCkge1xyXG4gICAgICAgICAgICBuZXdFcnJvclNjaGVtYVtpXSA9IGVycm9yU2NoZW1hW2ldO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpID4gaW5kZXgpIHtcclxuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWFbaSAtIDFdID0gZXJyb3JTY2hlbWFbaV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG5ld0tleWVkRm9ybURhdGEgPSBrZXllZEZvcm1EYXRhLmZpbHRlcigoXywgaSkgPT4gaSAhPT0gaW5kZXgpO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGtleWVkRm9ybURhdGE6IG5ld0tleWVkRm9ybURhdGEsXHJcbiAgICAgICAgICB1cGRhdGVkS2V5ZWRGb3JtRGF0YTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IG9uQ2hhbmdlKGtleWVkVG9QbGFpbkZvcm1EYXRhKG5ld0tleWVkRm9ybURhdGEpLCBuZXdFcnJvclNjaGVtYSlcclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgb25SZW9yZGVyQ2xpY2sgPSAoaW5kZXgsIG5ld0luZGV4KSA9PiB7XHJcbiAgICByZXR1cm4gZXZlbnQgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnRhcmdldC5ibHVyKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgbGV0IG5ld0Vycm9yU2NoZW1hO1xyXG4gICAgICBpZiAodGhpcy5wcm9wcy5lcnJvclNjaGVtYSkge1xyXG4gICAgICAgIG5ld0Vycm9yU2NoZW1hID0ge307XHJcbiAgICAgICAgY29uc3QgZXJyb3JTY2hlbWEgPSB0aGlzLnByb3BzLmVycm9yU2NoZW1hO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gZXJyb3JTY2hlbWEpIHtcclxuICAgICAgICAgIGlmIChpID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgIG5ld0Vycm9yU2NoZW1hW25ld0luZGV4XSA9IGVycm9yU2NoZW1hW2luZGV4XTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSBuZXdJbmRleCkge1xyXG4gICAgICAgICAgICBuZXdFcnJvclNjaGVtYVtpbmRleF0gPSBlcnJvclNjaGVtYVtuZXdJbmRleF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdFcnJvclNjaGVtYVtpXSA9IGVycm9yU2NoZW1hW2ldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgeyBrZXllZEZvcm1EYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICBmdW5jdGlvbiByZU9yZGVyQXJyYXkoKSB7XHJcbiAgICAgICAgLy8gQ29weSBpdGVtXHJcbiAgICAgICAgbGV0IF9uZXdLZXllZEZvcm1EYXRhID0ga2V5ZWRGb3JtRGF0YS5zbGljZSgpO1xyXG5cclxuICAgICAgICAvLyBNb3ZlcyBpdGVtIGZyb20gaW5kZXggdG8gbmV3SW5kZXhcclxuICAgICAgICBfbmV3S2V5ZWRGb3JtRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIF9uZXdLZXllZEZvcm1EYXRhLnNwbGljZShuZXdJbmRleCwgMCwga2V5ZWRGb3JtRGF0YVtpbmRleF0pO1xyXG5cclxuICAgICAgICByZXR1cm4gX25ld0tleWVkRm9ybURhdGE7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV3S2V5ZWRGb3JtRGF0YSA9IHJlT3JkZXJBcnJheSgpO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGtleWVkRm9ybURhdGE6IG5ld0tleWVkRm9ybURhdGEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiBvbkNoYW5nZShrZXllZFRvUGxhaW5Gb3JtRGF0YShuZXdLZXllZEZvcm1EYXRhKSwgbmV3RXJyb3JTY2hlbWEpXHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIG9uQ2hhbmdlRm9ySW5kZXggPSBpbmRleCA9PiB7XHJcbiAgICByZXR1cm4gKHZhbHVlLCBlcnJvclNjaGVtYSkgPT4ge1xyXG4gICAgICBjb25zdCB7IGZvcm1EYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgY29uc3QgbmV3Rm9ybURhdGEgPSBmb3JtRGF0YS5tYXAoKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIHRyZWF0IHVuZGVmaW5lZCBpdGVtcyBhcyBudWxscyB0byBoYXZlIHZhbGlkYXRpb24uXHJcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90ZGVncnVudC9qc29uc2NoZW1hL2lzc3Vlcy8yMDZcclxuICAgICAgICBjb25zdCBqc29uVmFsdWUgPSB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSBpID8ganNvblZhbHVlIDogaXRlbTtcclxuICAgICAgfSk7XHJcbiAgICAgIG9uQ2hhbmdlKFxyXG4gICAgICAgIG5ld0Zvcm1EYXRhLFxyXG4gICAgICAgIGVycm9yU2NoZW1hICYmXHJcbiAgICAgICAgICB0aGlzLnByb3BzLmVycm9yU2NoZW1hICYmIHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5lcnJvclNjaGVtYSxcclxuICAgICAgICAgICAgW2luZGV4XTogZXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIG9uU2VsZWN0Q2hhbmdlID0gdmFsdWUgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyByb290U2NoZW1hIH0gPSByZWdpc3RyeTtcclxuICAgIGlmICghc2NoZW1hLmhhc093blByb3BlcnR5KFwiaXRlbXNcIikpIHtcclxuICAgICAgY29uc3QgeyBmaWVsZHMgfSA9IHJlZ2lzdHJ5O1xyXG4gICAgICBjb25zdCB7IFVuc3VwcG9ydGVkRmllbGQgfSA9IGZpZWxkcztcclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFVuc3VwcG9ydGVkRmllbGRcclxuICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxyXG4gICAgICAgICAgcmVhc29uPVwiTWlzc2luZyBpdGVtcyBkZWZpbml0aW9uXCJcclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzRml4ZWRJdGVtcyhzY2hlbWEpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlckZpeGVkQXJyYXkoKTtcclxuICAgIH1cclxuICAgIGlmIChpc0ZpbGVzQXJyYXkoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRmlsZXMoKTtcclxuICAgIH1cclxuICAgIGlmIChpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTXVsdGlTZWxlY3QoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJlbmRlck5vcm1hbEFycmF5KCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJOb3JtYWxBcnJheSgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBuYW1lLFxyXG4gICAgICByZXF1aXJlZCxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICBhdXRvZm9jdXMsXHJcbiAgICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXHJcbiAgICAgIG9uQmx1cixcclxuICAgICAgb25Gb2N1cyxcclxuICAgICAgaWRQcmVmaXgsXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgPT09IHVuZGVmaW5lZCA/IG5hbWUgOiBzY2hlbWEudGl0bGU7XHJcbiAgICBjb25zdCB7IEFycmF5RmllbGRUZW1wbGF0ZSwgcm9vdFNjaGVtYSwgZmllbGRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IFRpdGxlRmllbGQsIERlc2NyaXB0aW9uRmllbGQgfSA9IGZpZWxkcztcclxuICAgIGNvbnN0IGl0ZW1zU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0ga2V5ZWRUb1BsYWluRm9ybURhdGEodGhpcy5zdGF0ZS5rZXllZEZvcm1EYXRhKTtcclxuICAgIGNvbnN0IGFycmF5UHJvcHMgPSB7XHJcbiAgICAgIGNhbkFkZDogdGhpcy5jYW5BZGRJdGVtKGZvcm1EYXRhKSxcclxuICAgICAgaXRlbXM6IHRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YS5tYXAoKGtleWVkSXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGtleSwgaXRlbSB9ID0ga2V5ZWRJdGVtO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1TY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEsIGl0ZW0pO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hID8gZXJyb3JTY2hlbWFbaW5kZXhdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JZFByZWZpeCA9IGlkU2NoZW1hLiRpZCArIFwiX1wiICsgaW5kZXg7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkU2NoZW1hID0gdG9JZFNjaGVtYShcclxuICAgICAgICAgIGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgICBpdGVtSWRQcmVmaXgsXHJcbiAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgaXRlbSxcclxuICAgICAgICAgIGlkUHJlZml4XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBcnJheUZpZWxkSXRlbSh7XHJcbiAgICAgICAgICBrZXksXHJcbiAgICAgICAgICBpbmRleCxcclxuICAgICAgICAgIGNhbk1vdmVVcDogaW5kZXggPiAwLFxyXG4gICAgICAgICAgY2FuTW92ZURvd246IGluZGV4IDwgZm9ybURhdGEubGVuZ3RoIC0gMSxcclxuICAgICAgICAgIGl0ZW1TY2hlbWE6IGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgICBpdGVtSWRTY2hlbWEsXHJcbiAgICAgICAgICBpdGVtRXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICBpdGVtRGF0YTogaXRlbSxcclxuICAgICAgICAgIGl0ZW1VaVNjaGVtYTogdWlTY2hlbWEuaXRlbXMsXHJcbiAgICAgICAgICBhdXRvZm9jdXM6IGF1dG9mb2N1cyAmJiBpbmRleCA9PT0gMCxcclxuICAgICAgICAgIG9uQmx1cixcclxuICAgICAgICAgIG9uRm9jdXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBjbGFzc05hbWU6IGBmaWVsZCBmaWVsZC1hcnJheSBmaWVsZC1hcnJheS1vZi0ke2l0ZW1zU2NoZW1hLnR5cGV9YCxcclxuICAgICAgRGVzY3JpcHRpb25GaWVsZCxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgb25BZGRDbGljazogdGhpcy5vbkFkZENsaWNrLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgcmVxdWlyZWQsXHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIFRpdGxlRmllbGQsXHJcbiAgICAgIGZvcm1Db250ZXh0LFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgcmF3RXJyb3JzLFxyXG4gICAgICByZWdpc3RyeSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgYSBjdXN0b20gcmVuZGVyIGZ1bmN0aW9uIHdhcyBwYXNzZWQgaW5cclxuICAgIGNvbnN0IENvbXBvbmVudCA9XHJcbiAgICAgIHVpU2NoZW1hW1widWk6QXJyYXlGaWVsZFRlbXBsYXRlXCJdIHx8XHJcbiAgICAgIEFycmF5RmllbGRUZW1wbGF0ZSB8fFxyXG4gICAgICBEZWZhdWx0Tm9ybWFsQXJyYXlGaWVsZFRlbXBsYXRlO1xyXG4gICAgcmV0dXJuIDxDb21wb25lbnQgey4uLmFycmF5UHJvcHN9IC8+O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyTXVsdGlTZWxlY3QoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICByZXF1aXJlZCxcclxuICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgIGF1dG9mb2N1cyxcclxuICAgICAgb25CbHVyLFxyXG4gICAgICBvbkZvY3VzLFxyXG4gICAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgICByYXdFcnJvcnMsXHJcbiAgICAgIG5hbWUsXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5wcm9wcy5mb3JtRGF0YTtcclxuICAgIGNvbnN0IHsgd2lkZ2V0cywgcm9vdFNjaGVtYSwgZm9ybUNvbnRleHQgfSA9IHJlZ2lzdHJ5O1xyXG4gICAgY29uc3QgaXRlbXNTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIGNvbnN0IHRpdGxlID0gc2NoZW1hLnRpdGxlIHx8IG5hbWU7XHJcbiAgICBjb25zdCBlbnVtT3B0aW9ucyA9IG9wdGlvbnNMaXN0KGl0ZW1zU2NoZW1hKTtcclxuICAgIGNvbnN0IHsgd2lkZ2V0ID0gXCJzZWxlY3RcIiwgLi4ub3B0aW9ucyB9ID0ge1xyXG4gICAgICAuLi5nZXRVaU9wdGlvbnModWlTY2hlbWEpLFxyXG4gICAgICBlbnVtT3B0aW9ucyxcclxuICAgIH07XHJcbiAgICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFdpZGdldFxyXG4gICAgICAgIGlkPXtpZFNjaGVtYSAmJiBpZFNjaGVtYS4kaWR9XHJcbiAgICAgICAgbXVsdGlwbGVcclxuICAgICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cclxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbiAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgIHZhbHVlPXtpdGVtc31cclxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgICBsYWJlbD17dGl0bGV9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgICByYXdFcnJvcnM9e3Jhd0Vycm9yc31cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJGaWxlcygpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgfHwgbmFtZTtcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5wcm9wcy5mb3JtRGF0YTtcclxuICAgIGNvbnN0IHsgd2lkZ2V0cywgZm9ybUNvbnRleHQgfSA9IHJlZ2lzdHJ5O1xyXG4gICAgY29uc3QgeyB3aWRnZXQgPSBcImZpbGVzXCIsIC4uLm9wdGlvbnMgfSA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFdpZGdldFxyXG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbiAgICAgICAgaWQ9e2lkU2NoZW1hICYmIGlkU2NoZW1hLiRpZH1cclxuICAgICAgICBtdWx0aXBsZVxyXG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxyXG4gICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgIHZhbHVlPXtpdGVtc31cclxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgICByYXdFcnJvcnM9e3Jhd0Vycm9yc31cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJGaXhlZEFycmF5KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgZXJyb3JTY2hlbWEsXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgbmFtZSxcclxuICAgICAgcmVxdWlyZWQsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgfHwgbmFtZTtcclxuICAgIGxldCBpdGVtcyA9IHRoaXMucHJvcHMuZm9ybURhdGE7XHJcbiAgICBjb25zdCB7IEFycmF5RmllbGRUZW1wbGF0ZSwgcm9vdFNjaGVtYSwgZmllbGRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IFRpdGxlRmllbGQgfSA9IGZpZWxkcztcclxuICAgIGNvbnN0IGl0ZW1TY2hlbWFzID0gc2NoZW1hLml0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+XHJcbiAgICAgIHJldHJpZXZlU2NoZW1hKGl0ZW0sIHJvb3RTY2hlbWEsIGZvcm1EYXRhW2luZGV4XSlcclxuICAgICk7XHJcbiAgICBjb25zdCBhZGRpdGlvbmFsU2NoZW1hID0gYWxsb3dBZGRpdGlvbmFsSXRlbXMoc2NoZW1hKVxyXG4gICAgICA/IHJldHJpZXZlU2NoZW1hKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxyXG4gICAgICA6IG51bGw7XHJcblxyXG4gICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPCBpdGVtU2NoZW1hcy5sZW5ndGgpIHtcclxuICAgICAgLy8gdG8gbWFrZSBzdXJlIGF0IGxlYXN0IGFsbCBmaXhlZCBpdGVtcyBhcmUgZ2VuZXJhdGVkXHJcbiAgICAgIGl0ZW1zID0gaXRlbXMgfHwgW107XHJcbiAgICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KG5ldyBBcnJheShpdGVtU2NoZW1hcy5sZW5ndGggLSBpdGVtcy5sZW5ndGgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGVzZSBhcmUgdGhlIHByb3BzIHBhc3NlZCBpbnRvIHRoZSByZW5kZXIgZnVuY3Rpb25cclxuICAgIGNvbnN0IGFycmF5UHJvcHMgPSB7XHJcbiAgICAgIGNhbkFkZDogdGhpcy5jYW5BZGRJdGVtKGl0ZW1zKSAmJiBhZGRpdGlvbmFsU2NoZW1hLFxyXG4gICAgICBjbGFzc05hbWU6IFwiZmllbGQgZmllbGQtYXJyYXkgZmllbGQtYXJyYXktZml4ZWQtaXRlbXNcIixcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgaXRlbXM6IHRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YS5tYXAoKGtleWVkSXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGtleSwgaXRlbSB9ID0ga2V5ZWRJdGVtO1xyXG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWwgPSBpbmRleCA+PSBpdGVtU2NoZW1hcy5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgaXRlbVNjaGVtYSA9IGFkZGl0aW9uYWxcclxuICAgICAgICAgID8gcmV0cmlldmVTY2hlbWEoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcywgcm9vdFNjaGVtYSwgaXRlbSlcclxuICAgICAgICAgIDogaXRlbVNjaGVtYXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JZFByZWZpeCA9IGlkU2NoZW1hLiRpZCArIFwiX1wiICsgaW5kZXg7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkU2NoZW1hID0gdG9JZFNjaGVtYShcclxuICAgICAgICAgIGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgICBpdGVtSWRQcmVmaXgsXHJcbiAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgaXRlbSxcclxuICAgICAgICAgIGlkUHJlZml4XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBpdGVtVWlTY2hlbWEgPSBhZGRpdGlvbmFsXHJcbiAgICAgICAgICA/IHVpU2NoZW1hLmFkZGl0aW9uYWxJdGVtcyB8fCB7fVxyXG4gICAgICAgICAgOiBBcnJheS5pc0FycmF5KHVpU2NoZW1hLml0ZW1zKVxyXG4gICAgICAgICAgPyB1aVNjaGVtYS5pdGVtc1tpbmRleF1cclxuICAgICAgICAgIDogdWlTY2hlbWEuaXRlbXMgfHwge307XHJcbiAgICAgICAgY29uc3QgaXRlbUVycm9yU2NoZW1hID0gZXJyb3JTY2hlbWEgPyBlcnJvclNjaGVtYVtpbmRleF0gOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFycmF5RmllbGRJdGVtKHtcclxuICAgICAgICAgIGtleSxcclxuICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgY2FuUmVtb3ZlOiBhZGRpdGlvbmFsLFxyXG4gICAgICAgICAgY2FuTW92ZVVwOiBpbmRleCA+PSBpdGVtU2NoZW1hcy5sZW5ndGggKyAxLFxyXG4gICAgICAgICAgY2FuTW92ZURvd246IGFkZGl0aW9uYWwgJiYgaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgaXRlbVNjaGVtYSxcclxuICAgICAgICAgIGl0ZW1EYXRhOiBpdGVtLFxyXG4gICAgICAgICAgaXRlbVVpU2NoZW1hLFxyXG4gICAgICAgICAgaXRlbUlkU2NoZW1hLFxyXG4gICAgICAgICAgaXRlbUVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgYXV0b2ZvY3VzOiBhdXRvZm9jdXMgJiYgaW5kZXggPT09IDAsXHJcbiAgICAgICAgICBvbkJsdXIsXHJcbiAgICAgICAgICBvbkZvY3VzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KSxcclxuICAgICAgb25BZGRDbGljazogdGhpcy5vbkFkZENsaWNrLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgcmVxdWlyZWQsXHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBUaXRsZUZpZWxkLFxyXG4gICAgICBmb3JtQ29udGV4dCxcclxuICAgICAgcmF3RXJyb3JzLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBhIGN1c3RvbSB0ZW1wbGF0ZSB0ZW1wbGF0ZSB3YXMgcGFzc2VkIGluXHJcbiAgICBjb25zdCBUZW1wbGF0ZSA9XHJcbiAgICAgIHVpU2NoZW1hW1widWk6QXJyYXlGaWVsZFRlbXBsYXRlXCJdIHx8XHJcbiAgICAgIEFycmF5RmllbGRUZW1wbGF0ZSB8fFxyXG4gICAgICBEZWZhdWx0Rml4ZWRBcnJheUZpZWxkVGVtcGxhdGU7XHJcbiAgICByZXR1cm4gPFRlbXBsYXRlIHsuLi5hcnJheVByb3BzfSAvPjtcclxuICB9XHJcblxyXG4gIHJlbmRlckFycmF5RmllbGRJdGVtKHByb3BzKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGtleSxcclxuICAgICAgaW5kZXgsXHJcbiAgICAgIGNhblJlbW92ZSA9IHRydWUsXHJcbiAgICAgIGNhbk1vdmVVcCA9IHRydWUsXHJcbiAgICAgIGNhbk1vdmVEb3duID0gdHJ1ZSxcclxuICAgICAgaXRlbVNjaGVtYSxcclxuICAgICAgaXRlbURhdGEsXHJcbiAgICAgIGl0ZW1VaVNjaGVtYSxcclxuICAgICAgaXRlbUlkU2NoZW1hLFxyXG4gICAgICBpdGVtRXJyb3JTY2hlbWEsXHJcbiAgICAgIGF1dG9mb2N1cyxcclxuICAgICAgb25CbHVyLFxyXG4gICAgICBvbkZvY3VzLFxyXG4gICAgICByYXdFcnJvcnMsXHJcbiAgICB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHtcclxuICAgICAgZmllbGRzOiB7IFNjaGVtYUZpZWxkIH0sXHJcbiAgICB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IG9yZGVyYWJsZSwgcmVtb3ZhYmxlIH0gPSB7XHJcbiAgICAgIG9yZGVyYWJsZTogdHJ1ZSxcclxuICAgICAgcmVtb3ZhYmxlOiB0cnVlLFxyXG4gICAgICAuLi51aVNjaGVtYVtcInVpOm9wdGlvbnNcIl0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgaGFzID0ge1xyXG4gICAgICBtb3ZlVXA6IG9yZGVyYWJsZSAmJiBjYW5Nb3ZlVXAsXHJcbiAgICAgIG1vdmVEb3duOiBvcmRlcmFibGUgJiYgY2FuTW92ZURvd24sXHJcbiAgICAgIHJlbW92ZTogcmVtb3ZhYmxlICYmIGNhblJlbW92ZSxcclxuICAgIH07XHJcbiAgICBoYXMudG9vbGJhciA9IE9iamVjdC5rZXlzKGhhcykuc29tZShrZXkgPT4gaGFzW2tleV0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNoaWxkcmVuOiAoXHJcbiAgICAgICAgPFNjaGVtYUZpZWxkXHJcbiAgICAgICAgICBpbmRleD17aW5kZXh9XHJcbiAgICAgICAgICBzY2hlbWE9e2l0ZW1TY2hlbWF9XHJcbiAgICAgICAgICB1aVNjaGVtYT17aXRlbVVpU2NoZW1hfVxyXG4gICAgICAgICAgZm9ybURhdGE9e2l0ZW1EYXRhfVxyXG4gICAgICAgICAgZXJyb3JTY2hlbWE9e2l0ZW1FcnJvclNjaGVtYX1cclxuICAgICAgICAgIGlkU2NoZW1hPXtpdGVtSWRTY2hlbWF9XHJcbiAgICAgICAgICByZXF1aXJlZD17dGhpcy5pc0l0ZW1SZXF1aXJlZChpdGVtU2NoZW1hKX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlRm9ySW5kZXgoaW5kZXgpfVxyXG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgICAgcmVnaXN0cnk9e3RoaXMucHJvcHMucmVnaXN0cnl9XHJcbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgIHJlYWRvbmx5PXt0aGlzLnByb3BzLnJlYWRvbmx5fVxyXG4gICAgICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgICAgICByYXdFcnJvcnM9e3Jhd0Vycm9yc31cclxuICAgICAgICAvPlxyXG4gICAgICApLFxyXG4gICAgICBjbGFzc05hbWU6IFwiYXJyYXktaXRlbVwiLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgaGFzVG9vbGJhcjogaGFzLnRvb2xiYXIsXHJcbiAgICAgIGhhc01vdmVVcDogaGFzLm1vdmVVcCxcclxuICAgICAgaGFzTW92ZURvd246IGhhcy5tb3ZlRG93bixcclxuICAgICAgaGFzUmVtb3ZlOiBoYXMucmVtb3ZlLFxyXG4gICAgICBpbmRleCxcclxuICAgICAga2V5LFxyXG4gICAgICBvbkFkZEluZGV4Q2xpY2s6IHRoaXMub25BZGRJbmRleENsaWNrLFxyXG4gICAgICBvbkRyb3BJbmRleENsaWNrOiB0aGlzLm9uRHJvcEluZGV4Q2xpY2ssXHJcbiAgICAgIG9uUmVvcmRlckNsaWNrOiB0aGlzLm9uUmVvcmRlckNsaWNrLFxyXG4gICAgICByZWFkb25seSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgQXJyYXlGaWVsZC5wcm9wVHlwZXMgPSB0eXBlcy5maWVsZFByb3BzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcnJheUZpZWxkO1xyXG4iXX0=