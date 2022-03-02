"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AddButton = _interopRequireDefault(require("../AddButton"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _react = _interopRequireWildcard(require("react"));

var _includes = _interopRequireDefault(require("core-js-pure/es/array/includes"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

var _nanoid = require("nanoid");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function ArrayFieldTitle(_ref) {
  var TitleField = _ref.TitleField,
      idSchema = _ref.idSchema,
      title = _ref.title,
      required = _ref.required;

  if (!title) {
    return null;
  }

  var id = "".concat(idSchema.$id, "__title");
  return _react["default"].createElement(TitleField, {
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
  return _react["default"].createElement(DescriptionField, {
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
  return _react["default"].createElement("div", {
    key: props.key,
    className: props.className
  }, _react["default"].createElement("div", {
    className: props.hasToolbar ? "col-xs-9" : "col-xs-12"
  }, props.children), props.hasToolbar && _react["default"].createElement("div", {
    className: "col-xs-3 array-item-toolbox"
  }, _react["default"].createElement("div", {
    className: "btn-group",
    style: {
      display: "flex",
      justifyContent: "space-around"
    }
  }, (props.hasMoveUp || props.hasMoveDown) && _react["default"].createElement(_IconButton["default"], {
    icon: "arrow-up",
    "aria-label": "Move up",
    className: "array-item-move-up",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveUp,
    onClick: props.onReorderClick(props.index, props.index - 1)
  }), (props.hasMoveUp || props.hasMoveDown) && _react["default"].createElement(_IconButton["default"], {
    icon: "arrow-down",
    className: "array-item-move-down",
    "aria-label": "Move down",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveDown,
    onClick: props.onReorderClick(props.index, props.index + 1)
  }), props.hasRemove && _react["default"].createElement(_IconButton["default"], {
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
  return _react["default"].createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, _react["default"].createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && _react["default"].createElement("div", {
    className: "field-description",
    key: "field-description-".concat(props.idSchema.$id)
  }, props.uiSchema["ui:description"] || props.schema.description), _react["default"].createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && props.items.map(DefaultArrayItem)), props.canAdd && _react["default"].createElement(_AddButton["default"], {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
}

function DefaultNormalArrayFieldTemplate(props) {
  return _react["default"].createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, _react["default"].createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && _react["default"].createElement(ArrayFieldDescription, {
    key: "array-field-description-".concat(props.idSchema.$id),
    DescriptionField: props.DescriptionField,
    idSchema: props.idSchema,
    description: props.uiSchema["ui:description"] || props.schema.description
  }), _react["default"].createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && props.items.map(function (p) {
    return DefaultArrayItem(p);
  })), props.canAdd && _react["default"].createElement(_AddButton["default"], {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
}

function generateRowId() {
  return (0, _nanoid.nanoid)();
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
          registry = _this$props$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props$registry;
      var rootSchema = registry.rootSchema;
      var itemSchema = schema.items;

      if ((0, _utils.isFixedItems)(schema) && (0, _utils.allowAdditionalItems)(schema)) {
        itemSchema = schema.additionalItems;
      }

      return (0, _utils.getDefaultFormState)(itemSchema, undefined, rootSchema);
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
        return !(0, _includes["default"])(itemSchema.type, "null");
      } // All non-null array item types are inherently required by design


      return itemSchema.type !== "null";
    }
  }, {
    key: "canAddItem",
    value: function canAddItem(formItems) {
      var _this$props3 = this.props,
          schema = _this$props3.schema,
          uiSchema = _this$props3.uiSchema;

      var _getUiOptions = (0, _utils.getUiOptions)(uiSchema),
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
          registry = _this$props4$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props4$registry;
      var rootSchema = registry.rootSchema;

      if (!schema.hasOwnProperty("items")) {
        var fields = registry.fields;
        var UnsupportedField = fields.UnsupportedField;
        return _react["default"].createElement(UnsupportedField, {
          schema: schema,
          idSchema: idSchema,
          reason: "Missing items definition"
        });
      }

      if ((0, _utils.isMultiSelect)(schema, rootSchema)) {
        // If array has enum or uniqueItems set to true, call renderMultiSelect() to render the default multiselect widget or a custom widget, if specified.
        return this.renderMultiSelect();
      }

      if ((0, _utils.isCustomWidget)(uiSchema)) {
        return this.renderCustomWidget();
      }

      if ((0, _utils.isFixedItems)(schema)) {
        return this.renderFixedArray();
      }

      if ((0, _utils.isFilesArray)(schema, uiSchema, rootSchema)) {
        return this.renderFiles();
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
          registry = _this$props5$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props5$registry,
          onBlur = _this$props5.onBlur,
          onFocus = _this$props5.onFocus,
          idPrefix = _this$props5.idPrefix,
          idSeparator = _this$props5.idSeparator,
          rawErrors = _this$props5.rawErrors;
      var title = schema.title === undefined ? name : schema.title;
      var ArrayFieldTemplate = registry.ArrayFieldTemplate,
          rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;
      var itemsSchema = (0, _utils.retrieveSchema)(schema.items, rootSchema);
      var formData = keyedToPlainFormData(this.state.keyedFormData);
      var arrayProps = {
        canAdd: this.canAddItem(formData),
        items: this.state.keyedFormData.map(function (keyedItem, index) {
          var key = keyedItem.key,
              item = keyedItem.item;
          var itemSchema = (0, _utils.retrieveSchema)(schema.items, rootSchema, item);
          var itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
          var itemIdPrefix = idSchema.$id + "_" + index;
          var itemIdSchema = (0, _utils.toIdSchema)(itemSchema, itemIdPrefix, rootSchema, item, idPrefix, idSeparator);
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
      return _react["default"].createElement(Component, arrayProps);
    }
  }, {
    key: "renderCustomWidget",
    value: function renderCustomWidget() {
      var _this$props6 = this.props,
          schema = _this$props6.schema,
          idSchema = _this$props6.idSchema,
          uiSchema = _this$props6.uiSchema,
          disabled = _this$props6.disabled,
          readonly = _this$props6.readonly,
          required = _this$props6.required,
          placeholder = _this$props6.placeholder,
          autofocus = _this$props6.autofocus,
          onBlur = _this$props6.onBlur,
          onFocus = _this$props6.onFocus,
          items = _this$props6.formData,
          _this$props6$registry = _this$props6.registry,
          registry = _this$props6$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props6$registry,
          rawErrors = _this$props6.rawErrors,
          name = _this$props6.name;
      var widgets = registry.widgets,
          formContext = registry.formContext;
      var title = schema.title || name;

      var _getUiOptions2 = _objectSpread({}, (0, _utils.getUiOptions)(uiSchema)),
          widget = _getUiOptions2.widget,
          options = _objectWithoutProperties(_getUiOptions2, ["widget"]);

      var Widget = (0, _utils.getWidget)(schema, widget, widgets);
      return _react["default"].createElement(Widget, {
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
    key: "renderMultiSelect",
    value: function renderMultiSelect() {
      var _this$props7 = this.props,
          schema = _this$props7.schema,
          idSchema = _this$props7.idSchema,
          uiSchema = _this$props7.uiSchema,
          formData = _this$props7.formData,
          disabled = _this$props7.disabled,
          readonly = _this$props7.readonly,
          required = _this$props7.required,
          placeholder = _this$props7.placeholder,
          autofocus = _this$props7.autofocus,
          onBlur = _this$props7.onBlur,
          onFocus = _this$props7.onFocus,
          _this$props7$registry = _this$props7.registry,
          registry = _this$props7$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props7$registry,
          rawErrors = _this$props7.rawErrors,
          name = _this$props7.name;
      var items = this.props.formData;
      var widgets = registry.widgets,
          rootSchema = registry.rootSchema,
          formContext = registry.formContext;
      var itemsSchema = (0, _utils.retrieveSchema)(schema.items, rootSchema, formData);
      var title = schema.title || name;
      var enumOptions = (0, _utils.optionsList)(itemsSchema);

      var _getUiOptions$enumOpt = _objectSpread({}, (0, _utils.getUiOptions)(uiSchema), {
        enumOptions: enumOptions
      }),
          _getUiOptions$enumOpt2 = _getUiOptions$enumOpt.widget,
          widget = _getUiOptions$enumOpt2 === void 0 ? "select" : _getUiOptions$enumOpt2,
          options = _objectWithoutProperties(_getUiOptions$enumOpt, ["widget"]);

      var Widget = (0, _utils.getWidget)(schema, widget, widgets);
      return _react["default"].createElement(Widget, {
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
      var _this$props8 = this.props,
          schema = _this$props8.schema,
          uiSchema = _this$props8.uiSchema,
          idSchema = _this$props8.idSchema,
          name = _this$props8.name,
          disabled = _this$props8.disabled,
          readonly = _this$props8.readonly,
          autofocus = _this$props8.autofocus,
          onBlur = _this$props8.onBlur,
          onFocus = _this$props8.onFocus,
          _this$props8$registry = _this$props8.registry,
          registry = _this$props8$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props8$registry,
          rawErrors = _this$props8.rawErrors;
      var title = schema.title || name;
      var items = this.props.formData;
      var widgets = registry.widgets,
          formContext = registry.formContext;

      var _getUiOptions3 = (0, _utils.getUiOptions)(uiSchema),
          _getUiOptions3$widget = _getUiOptions3.widget,
          widget = _getUiOptions3$widget === void 0 ? "files" : _getUiOptions3$widget,
          options = _objectWithoutProperties(_getUiOptions3, ["widget"]);

      var Widget = (0, _utils.getWidget)(schema, widget, widgets);
      return _react["default"].createElement(Widget, {
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

      var _this$props9 = this.props,
          schema = _this$props9.schema,
          uiSchema = _this$props9.uiSchema,
          formData = _this$props9.formData,
          errorSchema = _this$props9.errorSchema,
          idPrefix = _this$props9.idPrefix,
          idSeparator = _this$props9.idSeparator,
          idSchema = _this$props9.idSchema,
          name = _this$props9.name,
          required = _this$props9.required,
          disabled = _this$props9.disabled,
          readonly = _this$props9.readonly,
          autofocus = _this$props9.autofocus,
          _this$props9$registry = _this$props9.registry,
          registry = _this$props9$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props9$registry,
          onBlur = _this$props9.onBlur,
          onFocus = _this$props9.onFocus,
          rawErrors = _this$props9.rawErrors;
      var title = schema.title || name;
      var items = this.props.formData;
      var ArrayFieldTemplate = registry.ArrayFieldTemplate,
          rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var TitleField = fields.TitleField;
      var itemSchemas = schema.items.map(function (item, index) {
        return (0, _utils.retrieveSchema)(item, rootSchema, formData[index]);
      });
      var additionalSchema = (0, _utils.allowAdditionalItems)(schema) ? (0, _utils.retrieveSchema)(schema.additionalItems, rootSchema, formData) : null;

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
          var itemSchema = additional ? (0, _utils.retrieveSchema)(schema.additionalItems, rootSchema, item) : itemSchemas[index];
          var itemIdPrefix = idSchema.$id + "_" + index;
          var itemIdSchema = (0, _utils.toIdSchema)(itemSchema, itemIdPrefix, rootSchema, item, idPrefix, idSeparator);
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
      return _react["default"].createElement(Template, arrayProps);
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
      var _this$props10 = this.props,
          disabled = _this$props10.disabled,
          readonly = _this$props10.readonly,
          uiSchema = _this$props10.uiSchema,
          _this$props10$registr = _this$props10.registry,
          registry = _this$props10$registr === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props10$registr;
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
        children: _react["default"].createElement(SchemaField, {
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
}(_react.Component);

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

var _default = ArrayField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9BcnJheUZpZWxkLmpzIl0sIm5hbWVzIjpbIkFycmF5RmllbGRUaXRsZSIsIlRpdGxlRmllbGQiLCJpZFNjaGVtYSIsInRpdGxlIiwicmVxdWlyZWQiLCJpZCIsIiRpZCIsIkFycmF5RmllbGREZXNjcmlwdGlvbiIsIkRlc2NyaXB0aW9uRmllbGQiLCJkZXNjcmlwdGlvbiIsIkRlZmF1bHRBcnJheUl0ZW0iLCJwcm9wcyIsImJ0blN0eWxlIiwiZmxleCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiZm9udFdlaWdodCIsImtleSIsImNsYXNzTmFtZSIsImhhc1Rvb2xiYXIiLCJjaGlsZHJlbiIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImhhc01vdmVVcCIsImhhc01vdmVEb3duIiwiZGlzYWJsZWQiLCJyZWFkb25seSIsIm9uUmVvcmRlckNsaWNrIiwiaW5kZXgiLCJoYXNSZW1vdmUiLCJvbkRyb3BJbmRleENsaWNrIiwiRGVmYXVsdEZpeGVkQXJyYXlGaWVsZFRlbXBsYXRlIiwidWlTY2hlbWEiLCJzY2hlbWEiLCJpdGVtcyIsIm1hcCIsImNhbkFkZCIsIm9uQWRkQ2xpY2siLCJEZWZhdWx0Tm9ybWFsQXJyYXlGaWVsZFRlbXBsYXRlIiwicCIsImdlbmVyYXRlUm93SWQiLCJnZW5lcmF0ZUtleWVkRm9ybURhdGEiLCJmb3JtRGF0YSIsIkFycmF5IiwiaXNBcnJheSIsIml0ZW0iLCJrZXllZFRvUGxhaW5Gb3JtRGF0YSIsImtleWVkRm9ybURhdGEiLCJrZXllZEl0ZW0iLCJBcnJheUZpZWxkIiwicmVnaXN0cnkiLCJyb290U2NoZW1hIiwiaXRlbVNjaGVtYSIsImFkZGl0aW9uYWxJdGVtcyIsInVuZGVmaW5lZCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJvbkNoYW5nZSIsIm5ld0tleWVkRm9ybURhdGFSb3ciLCJfZ2V0TmV3Rm9ybURhdGFSb3ciLCJuZXdLZXllZEZvcm1EYXRhIiwic3RhdGUiLCJzZXRTdGF0ZSIsInVwZGF0ZWRLZXllZEZvcm1EYXRhIiwic3BsaWNlIiwibmV3RXJyb3JTY2hlbWEiLCJlcnJvclNjaGVtYSIsImkiLCJwYXJzZUludCIsImZpbHRlciIsIl8iLCJuZXdJbmRleCIsInRhcmdldCIsImJsdXIiLCJyZU9yZGVyQXJyYXkiLCJfbmV3S2V5ZWRGb3JtRGF0YSIsInNsaWNlIiwidmFsdWUiLCJuZXdGb3JtRGF0YSIsImpzb25WYWx1ZSIsInR5cGUiLCJmb3JtSXRlbXMiLCJhZGRhYmxlIiwibWF4SXRlbXMiLCJsZW5ndGgiLCJoYXNPd25Qcm9wZXJ0eSIsImZpZWxkcyIsIlVuc3VwcG9ydGVkRmllbGQiLCJyZW5kZXJNdWx0aVNlbGVjdCIsInJlbmRlckN1c3RvbVdpZGdldCIsInJlbmRlckZpeGVkQXJyYXkiLCJyZW5kZXJGaWxlcyIsInJlbmRlck5vcm1hbEFycmF5IiwibmFtZSIsImF1dG9mb2N1cyIsIm9uQmx1ciIsIm9uRm9jdXMiLCJpZFByZWZpeCIsImlkU2VwYXJhdG9yIiwicmF3RXJyb3JzIiwiQXJyYXlGaWVsZFRlbXBsYXRlIiwiZm9ybUNvbnRleHQiLCJpdGVtc1NjaGVtYSIsImFycmF5UHJvcHMiLCJjYW5BZGRJdGVtIiwiaXRlbUVycm9yU2NoZW1hIiwiaXRlbUlkUHJlZml4IiwiaXRlbUlkU2NoZW1hIiwicmVuZGVyQXJyYXlGaWVsZEl0ZW0iLCJjYW5Nb3ZlVXAiLCJjYW5Nb3ZlRG93biIsIml0ZW1EYXRhIiwiaXRlbVVpU2NoZW1hIiwiQ29tcG9uZW50IiwicGxhY2Vob2xkZXIiLCJ3aWRnZXRzIiwid2lkZ2V0Iiwib3B0aW9ucyIsIldpZGdldCIsIm9uU2VsZWN0Q2hhbmdlIiwiZW51bU9wdGlvbnMiLCJpdGVtU2NoZW1hcyIsImFkZGl0aW9uYWxTY2hlbWEiLCJjb25jYXQiLCJhZGRpdGlvbmFsIiwiY2FuUmVtb3ZlIiwiVGVtcGxhdGUiLCJTY2hlbWFGaWVsZCIsIm9yZGVyYWJsZSIsInJlbW92YWJsZSIsImhhcyIsIm1vdmVVcCIsIm1vdmVEb3duIiwicmVtb3ZlIiwidG9vbGJhciIsIk9iamVjdCIsImtleXMiLCJzb21lIiwiaXNJdGVtUmVxdWlyZWQiLCJvbkNoYW5nZUZvckluZGV4Iiwib25BZGRJbmRleENsaWNrIiwibmV4dFByb3BzIiwicHJldlN0YXRlIiwibmV4dEZvcm1EYXRhIiwicHJldmlvdXNLZXllZEZvcm1EYXRhIiwicHJldmlvdXNLZXllZEZvcm1EYXR1bSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsInR5cGVzIiwiZmllbGRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQWNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsZUFBVCxPQUFvRTtBQUFBLE1BQXpDQyxVQUF5QyxRQUF6Q0EsVUFBeUM7QUFBQSxNQUE3QkMsUUFBNkIsUUFBN0JBLFFBQTZCO0FBQUEsTUFBbkJDLEtBQW1CLFFBQW5CQSxLQUFtQjtBQUFBLE1BQVpDLFFBQVksUUFBWkEsUUFBWTs7QUFDbEUsTUFBSSxDQUFDRCxLQUFMLEVBQVk7QUFDVixXQUFPLElBQVA7QUFDRDs7QUFDRCxNQUFNRSxFQUFFLGFBQU1ILFFBQVEsQ0FBQ0ksR0FBZixZQUFSO0FBQ0EsU0FBTyxnQ0FBQyxVQUFEO0FBQVksSUFBQSxFQUFFLEVBQUVELEVBQWhCO0FBQW9CLElBQUEsS0FBSyxFQUFFRixLQUEzQjtBQUFrQyxJQUFBLFFBQVEsRUFBRUM7QUFBNUMsSUFBUDtBQUNEOztBQUVELFNBQVNHLHFCQUFULFFBQTRFO0FBQUEsTUFBM0NDLGdCQUEyQyxTQUEzQ0EsZ0JBQTJDO0FBQUEsTUFBekJOLFFBQXlCLFNBQXpCQSxRQUF5QjtBQUFBLE1BQWZPLFdBQWUsU0FBZkEsV0FBZTs7QUFDMUUsTUFBSSxDQUFDQSxXQUFMLEVBQWtCO0FBQ2hCLFdBQU8sSUFBUDtBQUNEOztBQUNELE1BQU1KLEVBQUUsYUFBTUgsUUFB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QXFCLENBQUM3RyxHQUF0QixDQUEwQixVQUFDOEcsc0JBQUQsRUFBeUJySCxLQUF6QixFQUFtQztBQUMzRCxlQUFPO0FBQ0xYLFVBQUFBLEdBQUcsRUFBRWdJLHNCQUFzQixDQUFDaEksR0FEdkI7QUFFTDRCLFVBQUFBLElBQUksRUFBRWtHLFlBQVksQ0FBQ25ILEtBQUQ7QUFGYixTQUFQO0FBSUQsT0FMRCxDQURKLEdBT0lhLHFCQUFxQixDQUFDc0csWUFBRCxDQVIzQjtBQVNBLGFBQU87QUFDTGhHLFFBQUFBLGFBQWEsRUFBRWE7QUFEVixPQUFQO0FBR0Q7Ozs7RUExQ3NCcUQsZ0I7O2dCQUFuQmhFLFUsa0JBQ2tCO0FBQ3BCakIsRUFBQUEsUUFBUSxFQUFFLEVBRFU7QUFFcEJVLEVBQUFBLFFBQVEsRUFBRSxFQUZVO0FBR3BCeEMsRUFBQUEsUUFBUSxFQUFFLEVBSFU7QUFJcEJFLEVBQUFBLFFBQVEsRUFBRSxLQUpVO0FBS3BCcUIsRUFBQUEsUUFBUSxFQUFFLEtBTFU7QUFNcEJDLEVBQUFBLFFBQVEsRUFBRSxLQU5VO0FBT3BCb0UsRUFBQUEsU0FBUyxFQUFFO0FBUFMsQzs7QUF5b0J4QixJQUFJb0QsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNuRyxFQUFBQSxVQUFVLENBQUNvRyxTQUFYLEdBQXVCQyxLQUFLLENBQUNDLFVBQTdCO0FBQ0Q7O2VBRWN0RyxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkZEJ1dHRvbiBmcm9tIFwiLi4vQWRkQnV0dG9uXCI7XHJcbmltcG9ydCBJY29uQnV0dG9uIGZyb20gXCIuLi9JY29uQnV0dG9uXCI7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IGluY2x1ZGVzIGZyb20gXCJjb3JlLWpzLXB1cmUvZXMvYXJyYXkvaW5jbHVkZXNcIjtcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gIGdldFdpZGdldCxcclxuICBnZXREZWZhdWx0Rm9ybVN0YXRlLFxyXG4gIGdldFVpT3B0aW9ucyxcclxuICBpc011bHRpU2VsZWN0LFxyXG4gIGlzRmlsZXNBcnJheSxcclxuICBpc0ZpeGVkSXRlbXMsXHJcbiAgYWxsb3dBZGRpdGlvbmFsSXRlbXMsXHJcbiAgaXNDdXN0b21XaWRnZXQsXHJcbiAgb3B0aW9uc0xpc3QsXHJcbiAgcmV0cmlldmVTY2hlbWEsXHJcbiAgdG9JZFNjaGVtYSxcclxuICBnZXREZWZhdWx0UmVnaXN0cnksXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IG5hbm9pZCB9IGZyb20gXCJuYW5vaWRcIjtcclxuXHJcbmZ1bmN0aW9uIEFycmF5RmllbGRUaXRsZSh7IFRpdGxlRmllbGQsIGlkU2NoZW1hLCB0aXRsZSwgcmVxdWlyZWQgfSkge1xyXG4gIGlmICghdGl0bGUpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBjb25zdCBpZCA9IGAke2lkU2NoZW1hLiRpZH1fX3RpdGxlYDtcclxuICByZXR1cm4gPFRpdGxlRmllbGQgaWQ9e2lkfSB0aXRsZT17dGl0bGV9IHJlcXVpcmVkPXtyZXF1aXJlZH0gLz47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFycmF5RmllbGREZXNjcmlwdGlvbih7IERlc2NyaXB0aW9uRmllbGQsIGlkU2NoZW1hLCBkZXNjcmlwdGlvbiB9KSB7XHJcbiAgaWYgKCFkZXNjcmlwdGlvbikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGNvbnN0IGlkID0gYCR7aWRTY2hlbWEuJGlkfV9fZGVzY3JpcHRpb25gO1xyXG4gIHJldHVybiA8RGVzY3JpcHRpb25GaWVsZCBpZD17aWR9IGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbn0gLz47XHJcbn1cclxuXHJcbi8vIFVzZWQgaW4gdGhlIHR3byB0ZW1wbGF0ZXNcclxuZnVuY3Rpb24gRGVmYXVsdEFycmF5SXRlbShwcm9wcykge1xyXG4gIGNvbnN0IGJ0blN0eWxlID0ge1xyXG4gICAgZmxleDogMSxcclxuICAgIHBhZGRpbmdMZWZ0OiA2LFxyXG4gICAgcGFkZGluZ1JpZ2h0OiA2LFxyXG4gICAgZm9udFdlaWdodDogXCJib2xkXCIsXHJcbiAgfTtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBrZXk9e3Byb3BzLmtleX0gY2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cHJvcHMuaGFzVG9vbGJhciA/IFwiY29sLXhzLTlcIiA6IFwiY29sLXhzLTEyXCJ9PlxyXG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7cHJvcHMuaGFzVG9vbGJhciAmJiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMyBhcnJheS1pdGVtLXRvb2xib3hcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcclxuICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1hcm91bmRcIixcclxuICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIHsocHJvcHMuaGFzTW92ZVVwIHx8IHByb3BzLmhhc01vdmVEb3duKSAmJiAoXHJcbiAgICAgICAgICAgICAgPEljb25CdXR0b25cclxuICAgICAgICAgICAgICAgIGljb249XCJhcnJvdy11cFwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiTW92ZSB1cFwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhcnJheS1pdGVtLW1vdmUtdXBcIlxyXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17YnRuU3R5bGV9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHkgfHwgIXByb3BzLmhhc01vdmVVcH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uUmVvcmRlckNsaWNrKHByb3BzLmluZGV4LCBwcm9wcy5pbmRleCAtIDEpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7KHByb3BzLmhhc01vdmVVcCB8fCBwcm9wcy5oYXNNb3ZlRG93bikgJiYgKFxyXG4gICAgICAgICAgICAgIDxJY29uQnV0dG9uXHJcbiAgICAgICAgICAgICAgICBpY29uPVwiYXJyb3ctZG93blwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhcnJheS1pdGVtLW1vdmUtZG93blwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiTW92ZSBkb3duXCJcclxuICAgICAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e2J0blN0eWxlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e1xyXG4gICAgICAgICAgICAgICAgICBwcm9wcy5kaXNhYmxlZCB8fCBwcm9wcy5yZWFkb25seSB8fCAhcHJvcHMuaGFzTW92ZURvd25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uUmVvcmRlckNsaWNrKHByb3BzLmluZGV4LCBwcm9wcy5pbmRleCArIDEpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7cHJvcHMuaGFzUmVtb3ZlICYmIChcclxuICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICBpY29uPVwicmVtb3ZlXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJSZW1vdmVcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXJyYXktaXRlbS1yZW1vdmVcIlxyXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17YnRuU3R5bGV9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkRyb3BJbmRleENsaWNrKHByb3BzLmluZGV4KX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBEZWZhdWx0Rml4ZWRBcnJheUZpZWxkVGVtcGxhdGUocHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGZpZWxkc2V0IGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfSBpZD17cHJvcHMuaWRTY2hlbWEuJGlkfT5cclxuICAgICAgPEFycmF5RmllbGRUaXRsZVxyXG4gICAgICAgIGtleT17YGFycmF5LWZpZWxkLXRpdGxlLSR7cHJvcHMuaWRTY2hlbWEuJGlkfWB9XHJcbiAgICAgICAgVGl0bGVGaWVsZD17cHJvcHMuVGl0bGVGaWVsZH1cclxuICAgICAgICBpZFNjaGVtYT17cHJvcHMuaWRTY2hlbWF9XHJcbiAgICAgICAgdGl0bGU9e3Byb3BzLnVpU2NoZW1hW1widWk6dGl0bGVcIl0gfHwgcHJvcHMudGl0bGV9XHJcbiAgICAgICAgcmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgeyhwcm9wcy51aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8IHByb3BzLnNjaGVtYS5kZXNjcmlwdGlvbikgJiYgKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImZpZWxkLWRlc2NyaXB0aW9uXCJcclxuICAgICAgICAgIGtleT17YGZpZWxkLWRlc2NyaXB0aW9uLSR7cHJvcHMuaWRTY2hlbWEuJGlkfWB9PlxyXG4gICAgICAgICAge3Byb3BzLnVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHwgcHJvcHMuc2NoZW1hLmRlc2NyaXB0aW9ufVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cInJvdyBhcnJheS1pdGVtLWxpc3RcIlxyXG4gICAgICAgIGtleT17YGFycmF5LWl0ZW0tbGlzdC0ke3Byb3BzLmlkU2NoZW1hLiRpZH1gfT5cclxuICAgICAgICB7cHJvcHMuaXRlbXMgJiYgcHJvcHMuaXRlbXMubWFwKERlZmF1bHRBcnJheUl0ZW0pfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtwcm9wcy5jYW5BZGQgJiYgKFxyXG4gICAgICAgIDxBZGRCdXR0b25cclxuICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tYWRkXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQWRkQ2xpY2t9XHJcbiAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGVmYXVsdE5vcm1hbEFycmF5RmllbGRUZW1wbGF0ZShwcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9IGlkPXtwcm9wcy5pZFNjaGVtYS4kaWR9PlxyXG4gICAgICA8QXJyYXlGaWVsZFRpdGxlXHJcbiAgICAgICAga2V5PXtgYXJyYXktZmllbGQtdGl0bGUtJHtwcm9wcy5pZFNjaGVtYS4kaWR9YH1cclxuICAgICAgICBUaXRsZUZpZWxkPXtwcm9wcy5UaXRsZUZpZWxkfVxyXG4gICAgICAgIGlkU2NoZW1hPXtwcm9wcy5pZFNjaGVtYX1cclxuICAgICAgICB0aXRsZT17cHJvcHMudWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCBwcm9wcy50aXRsZX1cclxuICAgICAgICByZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7KHByb3BzLnVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHwgcHJvcHMuc2NoZW1hLmRlc2NyaXB0aW9uKSAmJiAoXHJcbiAgICAgICAgPEFycmF5RmllbGREZXNjcmlwdGlvblxyXG4gICAgICAgICAga2V5PXtgYXJyYXktZmllbGQtZGVzY3JpcHRpb24tJHtwcm9wcy5pZFNjaGVtYS4kaWR9YH1cclxuICAgICAgICAgIERlc2NyaXB0aW9uRmllbGQ9e3Byb3BzLkRlc2NyaXB0aW9uRmllbGR9XHJcbiAgICAgICAgICBpZFNjaGVtYT17cHJvcHMuaWRTY2hlbWF9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbj17XHJcbiAgICAgICAgICAgIHByb3BzLnVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHwgcHJvcHMuc2NoZW1hLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJyb3cgYXJyYXktaXRlbS1saXN0XCJcclxuICAgICAgICBrZXk9e2BhcnJheS1pdGVtLWxpc3QtJHtwcm9wcy5pZFNjaGVtYS4kaWR9YH0+XHJcbiAgICAgICAge3Byb3BzLml0ZW1zICYmIHByb3BzLml0ZW1zLm1hcChwID0+IERlZmF1bHRBcnJheUl0ZW0ocCkpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtwcm9wcy5jYW5BZGQgJiYgKFxyXG4gICAgICAgIDxBZGRCdXR0b25cclxuICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tYWRkXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQWRkQ2xpY2t9XHJcbiAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVSb3dJZCgpIHtcclxuICByZXR1cm4gbmFub2lkKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlS2V5ZWRGb3JtRGF0YShmb3JtRGF0YSkge1xyXG4gIHJldHVybiAhQXJyYXkuaXNBcnJheShmb3JtRGF0YSlcclxuICAgID8gW11cclxuICAgIDogZm9ybURhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBrZXk6IGdlbmVyYXRlUm93SWQoKSxcclxuICAgICAgICAgIGl0ZW0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGtleWVkVG9QbGFpbkZvcm1EYXRhKGtleWVkRm9ybURhdGEpIHtcclxuICByZXR1cm4ga2V5ZWRGb3JtRGF0YS5tYXAoa2V5ZWRJdGVtID0+IGtleWVkSXRlbS5pdGVtKTtcclxufVxyXG5cclxuY2xhc3MgQXJyYXlGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHVpU2NoZW1hOiB7fSxcclxuICAgIGZvcm1EYXRhOiBbXSxcclxuICAgIGlkU2NoZW1hOiB7fSxcclxuICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHJlYWRvbmx5OiBmYWxzZSxcclxuICAgIGF1dG9mb2N1czogZmFsc2UsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIGNvbnN0IHsgZm9ybURhdGEgfSA9IHByb3BzO1xyXG4gICAgY29uc3Qga2V5ZWRGb3JtRGF0YSA9IGdlbmVyYXRlS2V5ZWRGb3JtRGF0YShmb3JtRGF0YSk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBrZXllZEZvcm1EYXRhLFxyXG4gICAgICB1cGRhdGVkS2V5ZWRGb3JtRGF0YTogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xyXG4gICAgLy8gRG9uJ3QgY2FsbCBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgaWYga2V5ZWQgZm9ybWRhdGEgd2FzIGp1c3QgdXBkYXRlZC5cclxuICAgIGlmIChwcmV2U3RhdGUudXBkYXRlZEtleWVkRm9ybURhdGEpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cGRhdGVkS2V5ZWRGb3JtRGF0YTogZmFsc2UsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXh0Rm9ybURhdGEgPSBuZXh0UHJvcHMuZm9ybURhdGEgfHwgW107XHJcbiAgICBjb25zdCBwcmV2aW91c0tleWVkRm9ybURhdGEgPSBwcmV2U3RhdGUua2V5ZWRGb3JtRGF0YSB8fCBbXTtcclxuICAgIGNvbnN0IG5ld0tleWVkRm9ybURhdGEgPVxyXG4gICAgICBuZXh0Rm9ybURhdGEubGVuZ3RoID09PSBwcmV2aW91c0tleWVkRm9ybURhdGEubGVuZ3RoXHJcbiAgICAgICAgPyBwcmV2aW91c0tleWVkRm9ybURhdGEubWFwKChwcmV2aW91c0tleWVkRm9ybURhdHVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIGtleTogcHJldmlvdXNLZXllZEZvcm1EYXR1bS5rZXksXHJcbiAgICAgICAgICAgICAgaXRlbTogbmV4dEZvcm1EYXRhW2luZGV4XSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgOiBnZW5lcmF0ZUtleWVkRm9ybURhdGEobmV4dEZvcm1EYXRhKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGtleWVkRm9ybURhdGE6IG5ld0tleWVkRm9ybURhdGEsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGl0ZW1UaXRsZSgpIHtcclxuICAgIGNvbnN0IHsgc2NoZW1hIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIHNjaGVtYS5pdGVtcy50aXRsZSB8fCBzY2hlbWEuaXRlbXMuZGVzY3JpcHRpb24gfHwgXCJJdGVtXCI7XHJcbiAgfVxyXG5cclxuICBpc0l0ZW1SZXF1aXJlZChpdGVtU2NoZW1hKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtU2NoZW1hLnR5cGUpKSB7XHJcbiAgICAgIC8vIFdoaWxlIHdlIGRvbid0IHlldCBzdXBwb3J0IGNvbXBvc2l0ZS9udWxsYWJsZSBqc29uc2NoZW1hIHR5cGVzLCBpdCdzXHJcbiAgICAgIC8vIGZ1dHVyZS1wcm9vZiB0byBjaGVjayBmb3IgcmVxdWlyZW1lbnQgYWdhaW5zdCB0aGVzZS5cclxuICAgICAgcmV0dXJuICFpbmNsdWRlcyhpdGVtU2NoZW1hLnR5cGUsIFwibnVsbFwiKTtcclxuICAgIH1cclxuICAgIC8vIEFsbCBub24tbnVsbCBhcnJheSBpdGVtIHR5cGVzIGFyZSBpbmhlcmVudGx5IHJlcXVpcmVkIGJ5IGRlc2lnblxyXG4gICAgcmV0dXJuIGl0ZW1TY2hlbWEudHlwZSAhPT0gXCJudWxsXCI7XHJcbiAgfVxyXG5cclxuICBjYW5BZGRJdGVtKGZvcm1JdGVtcykge1xyXG4gICAgY29uc3QgeyBzY2hlbWEsIHVpU2NoZW1hIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgbGV0IHsgYWRkYWJsZSB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICAgIGlmIChhZGRhYmxlICE9PSBmYWxzZSkge1xyXG4gICAgICAvLyBpZiB1aTpvcHRpb25zLmFkZGFibGUgd2FzIG5vdCBleHBsaWNpdGx5IHNldCB0byBmYWxzZSwgd2UgY2FuIGFkZFxyXG4gICAgICAvLyBhbm90aGVyIGl0ZW0gaWYgd2UgaGF2ZSBub3QgZXhjZWVkZWQgbWF4SXRlbXMgeWV0XHJcbiAgICAgIGlmIChzY2hlbWEubWF4SXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGFkZGFibGUgPSBmb3JtSXRlbXMubGVuZ3RoIDwgc2NoZW1hLm1heEl0ZW1zO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFkZGFibGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWRkYWJsZTtcclxuICB9XHJcblxyXG4gIF9nZXROZXdGb3JtRGF0YVJvdyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgc2NoZW1hLCByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyByb290U2NoZW1hIH0gPSByZWdpc3RyeTtcclxuICAgIGxldCBpdGVtU2NoZW1hID0gc2NoZW1hLml0ZW1zO1xyXG4gICAgaWYgKGlzRml4ZWRJdGVtcyhzY2hlbWEpICYmIGFsbG93QWRkaXRpb25hbEl0ZW1zKHNjaGVtYSkpIHtcclxuICAgICAgaXRlbVNjaGVtYSA9IHNjaGVtYS5hZGRpdGlvbmFsSXRlbXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0RGVmYXVsdEZvcm1TdGF0ZShpdGVtU2NoZW1hLCB1bmRlZmluZWQsIHJvb3RTY2hlbWEpO1xyXG4gIH07XHJcblxyXG4gIG9uQWRkQ2xpY2sgPSBldmVudCA9PiB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgbmV3S2V5ZWRGb3JtRGF0YVJvdyA9IHtcclxuICAgICAga2V5OiBnZW5lcmF0ZVJvd0lkKCksXHJcbiAgICAgIGl0ZW06IHRoaXMuX2dldE5ld0Zvcm1EYXRhUm93KCksXHJcbiAgICB9O1xyXG4gICAgY29uc3QgbmV3S2V5ZWRGb3JtRGF0YSA9IFsuLi50aGlzLnN0YXRlLmtleWVkRm9ybURhdGEsIG5ld0tleWVkRm9ybURhdGFSb3ddO1xyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAge1xyXG4gICAgICAgIGtleWVkRm9ybURhdGE6IG5ld0tleWVkRm9ybURhdGEsXHJcbiAgICAgICAgdXBkYXRlZEtleWVkRm9ybURhdGE6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgICgpID0+IG9uQ2hhbmdlKGtleWVkVG9QbGFpbkZvcm1EYXRhKG5ld0tleWVkRm9ybURhdGEpKVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBvbkFkZEluZGV4Q2xpY2sgPSBpbmRleCA9PiB7XHJcbiAgICByZXR1cm4gZXZlbnQgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIGNvbnN0IG5ld0tleWVkRm9ybURhdGFSb3cgPSB7XHJcbiAgICAgICAga2V5OiBnZW5lcmF0ZVJvd0lkKCksXHJcbiAgICAgICAgaXRlbTogdGhpcy5fZ2V0TmV3Rm9ybURhdGFSb3coKSxcclxuICAgICAgfTtcclxuICAgICAgbGV0IG5ld0tleWVkRm9ybURhdGEgPSBbLi4udGhpcy5zdGF0ZS5rZXllZEZvcm1EYXRhXTtcclxuICAgICAgbmV3S2V5ZWRGb3JtRGF0YS5zcGxpY2UoaW5kZXgsIDAsIG5ld0tleWVkRm9ybURhdGFSb3cpO1xyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBrZXllZEZvcm1EYXRhOiBuZXdLZXllZEZvcm1EYXRhLFxyXG4gICAgICAgICAgdXBkYXRlZEtleWVkRm9ybURhdGE6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiBvbkNoYW5nZShrZXllZFRvUGxhaW5Gb3JtRGF0YShuZXdLZXllZEZvcm1EYXRhKSlcclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgb25Ecm9wSW5kZXhDbGljayA9IGluZGV4ID0+IHtcclxuICAgIHJldHVybiBldmVudCA9PiB7XHJcbiAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgY29uc3QgeyBrZXllZEZvcm1EYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAvLyByZWZzICMxOTU6IHJldmFsaWRhdGUgdG8gZW5zdXJlIHByb3Blcmx5IHJlaW5kZXhpbmcgZXJyb3JzXHJcbiAgICAgIGxldCBuZXdFcnJvclNjaGVtYTtcclxuICAgICAgaWYgKHRoaXMucHJvcHMuZXJyb3JTY2hlbWEpIHtcclxuICAgICAgICBuZXdFcnJvclNjaGVtYSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGVycm9yU2NoZW1hID0gdGhpcy5wcm9wcy5lcnJvclNjaGVtYTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGVycm9yU2NoZW1hKSB7XHJcbiAgICAgICAgICBpID0gcGFyc2VJbnQoaSk7XHJcbiAgICAgICAgICBpZiAoaSA8IGluZGV4KSB7XHJcbiAgICAgICAgICAgIG5ld0Vycm9yU2NoZW1hW2ldID0gZXJyb3JTY2hlbWFbaV07XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgPiBpbmRleCkge1xyXG4gICAgICAgICAgICBuZXdFcnJvclNjaGVtYVtpIC0gMV0gPSBlcnJvclNjaGVtYVtpXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV3S2V5ZWRGb3JtRGF0YSA9IGtleWVkRm9ybURhdGEuZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpbmRleCk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAga2V5ZWRGb3JtRGF0YTogbmV3S2V5ZWRGb3JtRGF0YSxcclxuICAgICAgICAgIHVwZGF0ZWRLZXllZEZvcm1EYXRhOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4gb25DaGFuZ2Uoa2V5ZWRUb1BsYWluRm9ybURhdGEobmV3S2V5ZWRGb3JtRGF0YSksIG5ld0Vycm9yU2NoZW1hKVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBvblJlb3JkZXJDbGljayA9IChpbmRleCwgbmV3SW5kZXgpID0+IHtcclxuICAgIHJldHVybiBldmVudCA9PiB7XHJcbiAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0LmJsdXIoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICBsZXQgbmV3RXJyb3JTY2hlbWE7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLmVycm9yU2NoZW1hKSB7XHJcbiAgICAgICAgbmV3RXJyb3JTY2hlbWEgPSB7fTtcclxuICAgICAgICBjb25zdCBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXJyb3JTY2hlbWE7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBlcnJvclNjaGVtYSkge1xyXG4gICAgICAgICAgaWYgKGkgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWFbbmV3SW5kZXhdID0gZXJyb3JTY2hlbWFbaW5kZXhdO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpID09IG5ld0luZGV4KSB7XHJcbiAgICAgICAgICAgIG5ld0Vycm9yU2NoZW1hW2luZGV4XSA9IGVycm9yU2NoZW1hW25ld0luZGV4XTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0Vycm9yU2NoZW1hW2ldID0gZXJyb3JTY2hlbWFbaV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB7IGtleWVkRm9ybURhdGEgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgIGZ1bmN0aW9uIHJlT3JkZXJBcnJheSgpIHtcclxuICAgICAgICAvLyBDb3B5IGl0ZW1cclxuICAgICAgICBsZXQgX25ld0tleWVkRm9ybURhdGEgPSBrZXllZEZvcm1EYXRhLnNsaWNlKCk7XHJcblxyXG4gICAgICAgIC8vIE1vdmVzIGl0ZW0gZnJvbSBpbmRleCB0byBuZXdJbmRleFxyXG4gICAgICAgIF9uZXdLZXllZEZvcm1EYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgX25ld0tleWVkRm9ybURhdGEuc3BsaWNlKG5ld0luZGV4LCAwLCBrZXllZEZvcm1EYXRhW2luZGV4XSk7XHJcblxyXG4gICAgICAgIHJldHVybiBfbmV3S2V5ZWRGb3JtRGF0YTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBuZXdLZXllZEZvcm1EYXRhID0gcmVPcmRlckFycmF5KCk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAga2V5ZWRGb3JtRGF0YTogbmV3S2V5ZWRGb3JtRGF0YSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IG9uQ2hhbmdlKGtleWVkVG9QbGFpbkZvcm1EYXRhKG5ld0tleWVkRm9ybURhdGEpLCBuZXdFcnJvclNjaGVtYSlcclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgb25DaGFuZ2VGb3JJbmRleCA9IGluZGV4ID0+IHtcclxuICAgIHJldHVybiAodmFsdWUsIGVycm9yU2NoZW1hKSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgZm9ybURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICBjb25zdCBuZXdGb3JtRGF0YSA9IGZvcm1EYXRhLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gdHJlYXQgdW5kZWZpbmVkIGl0ZW1zIGFzIG51bGxzIHRvIGhhdmUgdmFsaWRhdGlvbi5cclxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3RkZWdydW50L2pzb25zY2hlbWEvaXNzdWVzLzIwNlxyXG4gICAgICAgIGNvbnN0IGpzb25WYWx1ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gaW5kZXggPT09IGkgPyBqc29uVmFsdWUgOiBpdGVtO1xyXG4gICAgICB9KTtcclxuICAgICAgb25DaGFuZ2UoXHJcbiAgICAgICAgbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JTY2hlbWEgJiZcclxuICAgICAgICAgIHRoaXMucHJvcHMuZXJyb3JTY2hlbWEgJiYge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgICBbaW5kZXhdOiBlcnJvclNjaGVtYSxcclxuICAgICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgb25TZWxlY3RDaGFuZ2UgPSB2YWx1ZSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHJlZ2lzdHJ5O1xyXG4gICAgaWYgKCFzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJpdGVtc1wiKSkge1xyXG4gICAgICBjb25zdCB7IGZpZWxkcyB9ID0gcmVnaXN0cnk7XHJcbiAgICAgIGNvbnN0IHsgVW5zdXBwb3J0ZWRGaWVsZCB9ID0gZmllbGRzO1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VW5zdXBwb3J0ZWRGaWVsZFxyXG4gICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgICBpZFNjaGVtYT17aWRTY2hlbWF9XHJcbiAgICAgICAgICByZWFzb249XCJNaXNzaW5nIGl0ZW1zIGRlZmluaXRpb25cIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNNdWx0aVNlbGVjdChzY2hlbWEsIHJvb3RTY2hlbWEpKSB7XHJcbiAgICAgIC8vIElmIGFycmF5IGhhcyBlbnVtIG9yIHVuaXF1ZUl0ZW1zIHNldCB0byB0cnVlLCBjYWxsIHJlbmRlck11bHRpU2VsZWN0KCkgdG8gcmVuZGVyIHRoZSBkZWZhdWx0IG11bHRpc2VsZWN0IHdpZGdldCBvciBhIGN1c3RvbSB3aWRnZXQsIGlmIHNwZWNpZmllZC5cclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTXVsdGlTZWxlY3QoKTtcclxuICAgIH1cclxuICAgIGlmIChpc0N1c3RvbVdpZGdldCh1aVNjaGVtYSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ3VzdG9tV2lkZ2V0KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNGaXhlZEl0ZW1zKHNjaGVtYSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRml4ZWRBcnJheSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzRmlsZXNBcnJheShzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJGaWxlcygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyTm9ybWFsQXJyYXkoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlck5vcm1hbEFycmF5KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIGF1dG9mb2N1cyxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgICAgb25CbHVyLFxyXG4gICAgICBvbkZvY3VzLFxyXG4gICAgICBpZFByZWZpeCxcclxuICAgICAgaWRTZXBhcmF0b3IsXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgPT09IHVuZGVmaW5lZCA/IG5hbWUgOiBzY2hlbWEudGl0bGU7XHJcbiAgICBjb25zdCB7IEFycmF5RmllbGRUZW1wbGF0ZSwgcm9vdFNjaGVtYSwgZmllbGRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IFRpdGxlRmllbGQsIERlc2NyaXB0aW9uRmllbGQgfSA9IGZpZWxkcztcclxuICAgIGNvbnN0IGl0ZW1zU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0ga2V5ZWRUb1BsYWluRm9ybURhdGEodGhpcy5zdGF0ZS5rZXllZEZvcm1EYXRhKTtcclxuICAgIGNvbnN0IGFycmF5UHJvcHMgPSB7XHJcbiAgICAgIGNhbkFkZDogdGhpcy5jYW5BZGRJdGVtKGZvcm1EYXRhKSxcclxuICAgICAgaXRlbXM6IHRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YS5tYXAoKGtleWVkSXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGtleSwgaXRlbSB9ID0ga2V5ZWRJdGVtO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1TY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEsIGl0ZW0pO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hID8gZXJyb3JTY2hlbWFbaW5kZXhdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JZFByZWZpeCA9IGlkU2NoZW1hLiRpZCArIFwiX1wiICsgaW5kZXg7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkU2NoZW1hID0gdG9JZFNjaGVtYShcclxuICAgICAgICAgIGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgICBpdGVtSWRQcmVmaXgsXHJcbiAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgaXRlbSxcclxuICAgICAgICAgIGlkUHJlZml4LFxyXG4gICAgICAgICAgaWRTZXBhcmF0b3JcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFycmF5RmllbGRJdGVtKHtcclxuICAgICAgICAgIGtleSxcclxuICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgY2FuTW92ZVVwOiBpbmRleCA+IDAsXHJcbiAgICAgICAgICBjYW5Nb3ZlRG93bjogaW5kZXggPCBmb3JtRGF0YS5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgaXRlbVNjaGVtYTogaXRlbVNjaGVtYSxcclxuICAgICAgICAgIGl0ZW1JZFNjaGVtYSxcclxuICAgICAgICAgIGl0ZW1FcnJvclNjaGVtYSxcclxuICAgICAgICAgIGl0ZW1EYXRhOiBpdGVtLFxyXG4gICAgICAgICAgaXRlbVVpU2NoZW1hOiB1aVNjaGVtYS5pdGVtcyxcclxuICAgICAgICAgIGF1dG9mb2N1czogYXV0b2ZvY3VzICYmIGluZGV4ID09PSAwLFxyXG4gICAgICAgICAgb25CbHVyLFxyXG4gICAgICAgICAgb25Gb2N1cyxcclxuICAgICAgICB9KTtcclxuICAgICAgfSksXHJcbiAgICAgIGNsYXNzTmFtZTogYGZpZWxkIGZpZWxkLWFycmF5IGZpZWxkLWFycmF5LW9mLSR7aXRlbXNTY2hlbWEudHlwZX1gLFxyXG4gICAgICBEZXNjcmlwdGlvbkZpZWxkLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBvbkFkZENsaWNrOiB0aGlzLm9uQWRkQ2xpY2ssXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICByZXF1aXJlZCxcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICB0aXRsZSxcclxuICAgICAgVGl0bGVGaWVsZCxcclxuICAgICAgZm9ybUNvbnRleHQsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICByYXdFcnJvcnMsXHJcbiAgICAgIHJlZ2lzdHJ5LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBhIGN1c3RvbSByZW5kZXIgZnVuY3Rpb24gd2FzIHBhc3NlZCBpblxyXG4gICAgY29uc3QgQ29tcG9uZW50ID1cclxuICAgICAgdWlTY2hlbWFbXCJ1aTpBcnJheUZpZWxkVGVtcGxhdGVcIl0gfHxcclxuICAgICAgQXJyYXlGaWVsZFRlbXBsYXRlIHx8XHJcbiAgICAgIERlZmF1bHROb3JtYWxBcnJheUZpZWxkVGVtcGxhdGU7XHJcbiAgICByZXR1cm4gPENvbXBvbmVudCB7Li4uYXJyYXlQcm9wc30gLz47XHJcbiAgfVxyXG5cclxuICByZW5kZXJDdXN0b21XaWRnZXQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBwbGFjZWhvbGRlcixcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIGZvcm1EYXRhOiBpdGVtcyxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgICAgcmF3RXJyb3JzLFxyXG4gICAgICBuYW1lLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHdpZGdldHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcclxuICAgIGNvbnN0IHRpdGxlID0gc2NoZW1hLnRpdGxlIHx8IG5hbWU7XHJcblxyXG4gICAgY29uc3QgeyB3aWRnZXQsIC4uLm9wdGlvbnMgfSA9IHtcclxuICAgICAgLi4uZ2V0VWlPcHRpb25zKHVpU2NoZW1hKSxcclxuICAgIH07XHJcbiAgICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFdpZGdldFxyXG4gICAgICAgIGlkPXtpZFNjaGVtYSAmJiBpZFNjaGVtYS4kaWR9XHJcbiAgICAgICAgbXVsdGlwbGVcclxuICAgICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cclxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbiAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgIHZhbHVlPXtpdGVtc31cclxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgICBsYWJlbD17dGl0bGV9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgICByYXdFcnJvcnM9e3Jhd0Vycm9yc31cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJNdWx0aVNlbGVjdCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBwbGFjZWhvbGRlcixcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgICAgbmFtZSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnByb3BzLmZvcm1EYXRhO1xyXG4gICAgY29uc3QgeyB3aWRnZXRzLCByb290U2NoZW1hLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCBpdGVtc1NjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYS5pdGVtcywgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgfHwgbmFtZTtcclxuICAgIGNvbnN0IGVudW1PcHRpb25zID0gb3B0aW9uc0xpc3QoaXRlbXNTY2hlbWEpO1xyXG4gICAgY29uc3QgeyB3aWRnZXQgPSBcInNlbGVjdFwiLCAuLi5vcHRpb25zIH0gPSB7XHJcbiAgICAgIC4uLmdldFVpT3B0aW9ucyh1aVNjaGVtYSksXHJcbiAgICAgIGVudW1PcHRpb25zLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IFdpZGdldCA9IGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgd2lkZ2V0cyk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8V2lkZ2V0XHJcbiAgICAgICAgaWQ9e2lkU2NoZW1hICYmIGlkU2NoZW1hLiRpZH1cclxuICAgICAgICBtdWx0aXBsZVxyXG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxyXG4gICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cclxuICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgdmFsdWU9e2l0ZW1zfVxyXG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxyXG4gICAgICAgIGxhYmVsPXt0aXRsZX1cclxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICAgIHJhd0Vycm9ycz17cmF3RXJyb3JzfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckZpbGVzKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgbmFtZSxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICBhdXRvZm9jdXMsXHJcbiAgICAgIG9uQmx1cixcclxuICAgICAgb25Gb2N1cyxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgICAgcmF3RXJyb3JzLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB0aXRsZSA9IHNjaGVtYS50aXRsZSB8fCBuYW1lO1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnByb3BzLmZvcm1EYXRhO1xyXG4gICAgY29uc3QgeyB3aWRnZXRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IHdpZGdldCA9IFwiZmlsZXNcIiwgLi4ub3B0aW9ucyB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICAgIGNvbnN0IFdpZGdldCA9IGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgd2lkZ2V0cyk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8V2lkZ2V0XHJcbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cclxuICAgICAgICBpZD17aWRTY2hlbWEgJiYgaWRTY2hlbWEuJGlkfVxyXG4gICAgICAgIG11bHRpcGxlXHJcbiAgICAgICAgb25DaGFuZ2U9e3RoaXMub25TZWxlY3RDaGFuZ2V9XHJcbiAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cclxuICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICB0aXRsZT17dGl0bGV9XHJcbiAgICAgICAgdmFsdWU9e2l0ZW1zfVxyXG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICAgIHJhd0Vycm9ycz17cmF3RXJyb3JzfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckZpeGVkQXJyYXkoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgaWRQcmVmaXgsXHJcbiAgICAgIGlkU2VwYXJhdG9yLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgbmFtZSxcclxuICAgICAgcmVxdWlyZWQsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgfHwgbmFtZTtcclxuICAgIGxldCBpdGVtcyA9IHRoaXMucHJvcHMuZm9ybURhdGE7XHJcbiAgICBjb25zdCB7IEFycmF5RmllbGRUZW1wbGF0ZSwgcm9vdFNjaGVtYSwgZmllbGRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IFRpdGxlRmllbGQgfSA9IGZpZWxkcztcclxuICAgIGNvbnN0IGl0ZW1TY2hlbWFzID0gc2NoZW1hLml0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+XHJcbiAgICAgIHJldHJpZXZlU2NoZW1hKGl0ZW0sIHJvb3RTY2hlbWEsIGZvcm1EYXRhW2luZGV4XSlcclxuICAgICk7XHJcbiAgICBjb25zdCBhZGRpdGlvbmFsU2NoZW1hID0gYWxsb3dBZGRpdGlvbmFsSXRlbXMoc2NoZW1hKVxyXG4gICAgICA/IHJldHJpZXZlU2NoZW1hKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxyXG4gICAgICA6IG51bGw7XHJcblxyXG4gICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPCBpdGVtU2NoZW1hcy5sZW5ndGgpIHtcclxuICAgICAgLy8gdG8gbWFrZSBzdXJlIGF0IGxlYXN0IGFsbCBmaXhlZCBpdGVtcyBhcmUgZ2VuZXJhdGVkXHJcbiAgICAgIGl0ZW1zID0gaXRlbXMgfHwgW107XHJcbiAgICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KG5ldyBBcnJheShpdGVtU2NoZW1hcy5sZW5ndGggLSBpdGVtcy5sZW5ndGgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGVzZSBhcmUgdGhlIHByb3BzIHBhc3NlZCBpbnRvIHRoZSByZW5kZXIgZnVuY3Rpb25cclxuICAgIGNvbnN0IGFycmF5UHJvcHMgPSB7XHJcbiAgICAgIGNhbkFkZDogdGhpcy5jYW5BZGRJdGVtKGl0ZW1zKSAmJiBhZGRpdGlvbmFsU2NoZW1hLFxyXG4gICAgICBjbGFzc05hbWU6IFwiZmllbGQgZmllbGQtYXJyYXkgZmllbGQtYXJyYXktZml4ZWQtaXRlbXNcIixcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgaXRlbXM6IHRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YS5tYXAoKGtleWVkSXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGtleSwgaXRlbSB9ID0ga2V5ZWRJdGVtO1xyXG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWwgPSBpbmRleCA+PSBpdGVtU2NoZW1hcy5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgaXRlbVNjaGVtYSA9IGFkZGl0aW9uYWxcclxuICAgICAgICAgID8gcmV0cmlldmVTY2hlbWEoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcywgcm9vdFNjaGVtYSwgaXRlbSlcclxuICAgICAgICAgIDogaXRlbVNjaGVtYXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JZFByZWZpeCA9IGlkU2NoZW1hLiRpZCArIFwiX1wiICsgaW5kZXg7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkU2NoZW1hID0gdG9JZFNjaGVtYShcclxuICAgICAgICAgIGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgICBpdGVtSWRQcmVmaXgsXHJcbiAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgaXRlbSxcclxuICAgICAgICAgIGlkUHJlZml4LFxyXG4gICAgICAgICAgaWRTZXBhcmF0b3JcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1VaVNjaGVtYSA9IGFkZGl0aW9uYWxcclxuICAgICAgICAgID8gdWlTY2hlbWEuYWRkaXRpb25hbEl0ZW1zIHx8IHt9XHJcbiAgICAgICAgICA6IEFycmF5LmlzQXJyYXkodWlTY2hlbWEuaXRlbXMpXHJcbiAgICAgICAgICA/IHVpU2NoZW1hLml0ZW1zW2luZGV4XVxyXG4gICAgICAgICAgOiB1aVNjaGVtYS5pdGVtcyB8fCB7fTtcclxuICAgICAgICBjb25zdCBpdGVtRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYSA/IGVycm9yU2NoZW1hW2luZGV4XSA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQXJyYXlGaWVsZEl0ZW0oe1xyXG4gICAgICAgICAga2V5LFxyXG4gICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICBjYW5SZW1vdmU6IGFkZGl0aW9uYWwsXHJcbiAgICAgICAgICBjYW5Nb3ZlVXA6IGluZGV4ID49IGl0ZW1TY2hlbWFzLmxlbmd0aCArIDEsXHJcbiAgICAgICAgICBjYW5Nb3ZlRG93bjogYWRkaXRpb25hbCAmJiBpbmRleCA8IGl0ZW1zLmxlbmd0aCAtIDEsXHJcbiAgICAgICAgICBpdGVtU2NoZW1hLFxyXG4gICAgICAgICAgaXRlbURhdGE6IGl0ZW0sXHJcbiAgICAgICAgICBpdGVtVWlTY2hlbWEsXHJcbiAgICAgICAgICBpdGVtSWRTY2hlbWEsXHJcbiAgICAgICAgICBpdGVtRXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICBhdXRvZm9jdXM6IGF1dG9mb2N1cyAmJiBpbmRleCA9PT0gMCxcclxuICAgICAgICAgIG9uQmx1cixcclxuICAgICAgICAgIG9uRm9jdXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBvbkFkZENsaWNrOiB0aGlzLm9uQWRkQ2xpY2ssXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICByZXF1aXJlZCxcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIFRpdGxlRmllbGQsXHJcbiAgICAgIGZvcm1Db250ZXh0LFxyXG4gICAgICByYXdFcnJvcnMsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGEgY3VzdG9tIHRlbXBsYXRlIHRlbXBsYXRlIHdhcyBwYXNzZWQgaW5cclxuICAgIGNvbnN0IFRlbXBsYXRlID1cclxuICAgICAgdWlTY2hlbWFbXCJ1aTpBcnJheUZpZWxkVGVtcGxhdGVcIl0gfHxcclxuICAgICAgQXJyYXlGaWVsZFRlbXBsYXRlIHx8XHJcbiAgICAgIERlZmF1bHRGaXhlZEFycmF5RmllbGRUZW1wbGF0ZTtcclxuICAgIHJldHVybiA8VGVtcGxhdGUgey4uLmFycmF5UHJvcHN9IC8+O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQXJyYXlGaWVsZEl0ZW0ocHJvcHMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAga2V5LFxyXG4gICAgICBpbmRleCxcclxuICAgICAgY2FuUmVtb3ZlID0gdHJ1ZSxcclxuICAgICAgY2FuTW92ZVVwID0gdHJ1ZSxcclxuICAgICAgY2FuTW92ZURvd24gPSB0cnVlLFxyXG4gICAgICBpdGVtU2NoZW1hLFxyXG4gICAgICBpdGVtRGF0YSxcclxuICAgICAgaXRlbVVpU2NoZW1hLFxyXG4gICAgICBpdGVtSWRTY2hlbWEsXHJcbiAgICAgIGl0ZW1FcnJvclNjaGVtYSxcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IHtcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBmaWVsZHM6IHsgU2NoZW1hRmllbGQgfSxcclxuICAgIH0gPSByZWdpc3RyeTtcclxuICAgIGNvbnN0IHsgb3JkZXJhYmxlLCByZW1vdmFibGUgfSA9IHtcclxuICAgICAgb3JkZXJhYmxlOiB0cnVlLFxyXG4gICAgICByZW1vdmFibGU6IHRydWUsXHJcbiAgICAgIC4uLnVpU2NoZW1hW1widWk6b3B0aW9uc1wiXSxcclxuICAgIH07XHJcbiAgICBjb25zdCBoYXMgPSB7XHJcbiAgICAgIG1vdmVVcDogb3JkZXJhYmxlICYmIGNhbk1vdmVVcCxcclxuICAgICAgbW92ZURvd246IG9yZGVyYWJsZSAmJiBjYW5Nb3ZlRG93bixcclxuICAgICAgcmVtb3ZlOiByZW1vdmFibGUgJiYgY2FuUmVtb3ZlLFxyXG4gICAgfTtcclxuICAgIGhhcy50b29sYmFyID0gT2JqZWN0LmtleXMoaGFzKS5zb21lKGtleSA9PiBoYXNba2V5XSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2hpbGRyZW46IChcclxuICAgICAgICA8U2NoZW1hRmllbGRcclxuICAgICAgICAgIGluZGV4PXtpbmRleH1cclxuICAgICAgICAgIHNjaGVtYT17aXRlbVNjaGVtYX1cclxuICAgICAgICAgIHVpU2NoZW1hPXtpdGVtVWlTY2hlbWF9XHJcbiAgICAgICAgICBmb3JtRGF0YT17aXRlbURhdGF9XHJcbiAgICAgICAgICBlcnJvclNjaGVtYT17aXRlbUVycm9yU2NoZW1hfVxyXG4gICAgICAgICAgaWRTY2hlbWE9e2l0ZW1JZFNjaGVtYX1cclxuICAgICAgICAgIHJlcXVpcmVkPXt0aGlzLmlzSXRlbVJlcXVpcmVkKGl0ZW1TY2hlbWEpfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VGb3JJbmRleChpbmRleCl9XHJcbiAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgICAgICByZWdpc3RyeT17dGhpcy5wcm9wcy5yZWdpc3RyeX1cclxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgICAgcmVhZG9ubHk9e3RoaXMucHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgICAgIHJhd0Vycm9ycz17cmF3RXJyb3JzfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICksXHJcbiAgICAgIGNsYXNzTmFtZTogXCJhcnJheS1pdGVtXCIsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICBoYXNUb29sYmFyOiBoYXMudG9vbGJhcixcclxuICAgICAgaGFzTW92ZVVwOiBoYXMubW92ZVVwLFxyXG4gICAgICBoYXNNb3ZlRG93bjogaGFzLm1vdmVEb3duLFxyXG4gICAgICBoYXNSZW1vdmU6IGhhcy5yZW1vdmUsXHJcbiAgICAgIGluZGV4LFxyXG4gICAgICBrZXksXHJcbiAgICAgIG9uQWRkSW5kZXhDbGljazogdGhpcy5vbkFkZEluZGV4Q2xpY2ssXHJcbiAgICAgIG9uRHJvcEluZGV4Q2xpY2s6IHRoaXMub25Ecm9wSW5kZXhDbGljayxcclxuICAgICAgb25SZW9yZGVyQ2xpY2s6IHRoaXMub25SZW9yZGVyQ2xpY2ssXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBBcnJheUZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFycmF5RmllbGQ7XHJcbiJdfQ==