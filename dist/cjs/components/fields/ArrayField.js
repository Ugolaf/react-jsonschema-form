"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AddButton = _interopRequireDefault(require("../AddButton"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _react = _interopRequireWildcard(require("react"));

var _includes = _interopRequireDefault(require("core-js-pure/es/array/includes"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

var _nanoid = require("nanoid");

var _excluded = ["widget"],
    _excluded2 = ["widget"],
    _excluded3 = ["widget"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

function ArrayFieldTitle(_ref) {
  var TitleField = _ref.TitleField,
      idSchema = _ref.idSchema,
      title = _ref.title,
      required = _ref.required;

  if (!title) {
    return null;
  }

  var id = "".concat(idSchema.$id, "__title");
  return /*#__PURE__*/_react.default.createElement(TitleField, {
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
  return /*#__PURE__*/_react.default.createElement(DescriptionField, {
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
  return /*#__PURE__*/_react.default.createElement("div", {
    key: props.key,
    className: props.className
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: props.hasToolbar ? "col-xs-9" : "col-xs-12"
  }, props.children), props.hasToolbar && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-xs-3 array-item-toolbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "btn-group",
    style: {
      display: "flex",
      justifyContent: "space-around"
    }
  }, (props.hasMoveUp || props.hasMoveDown) && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    icon: "arrow-up",
    "aria-label": "Move up",
    className: "array-item-move-up",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveUp,
    onClick: props.onReorderClick(props.index, props.index - 1)
  }), (props.hasMoveUp || props.hasMoveDown) && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    icon: "arrow-down",
    className: "array-item-move-down",
    "aria-label": "Move down",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveDown,
    onClick: props.onReorderClick(props.index, props.index + 1)
  }), props.hasRemove && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
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
  return /*#__PURE__*/_react.default.createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, /*#__PURE__*/_react.default.createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && /*#__PURE__*/_react.default.createElement("div", {
    className: "field-description",
    key: "field-description-".concat(props.idSchema.$id)
  }, props.uiSchema["ui:description"] || props.schema.description), /*#__PURE__*/_react.default.createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && props.items.map(DefaultArrayItem)), props.canAdd && /*#__PURE__*/_react.default.createElement(_AddButton.default, {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
}

function DefaultNormalArrayFieldTemplate(props) {
  return /*#__PURE__*/_react.default.createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, /*#__PURE__*/_react.default.createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && /*#__PURE__*/_react.default.createElement(ArrayFieldDescription, {
    key: "array-field-description-".concat(props.idSchema.$id),
    DescriptionField: props.DescriptionField,
    idSchema: props.idSchema,
    description: props.uiSchema["ui:description"] || props.schema.description
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && props.items.map(function (p) {
    return DefaultArrayItem(p);
  })), props.canAdd && /*#__PURE__*/_react.default.createElement(_AddButton.default, {
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

var ArrayField = /*#__PURE__*/function (_Component) {
  _inherits(ArrayField, _Component);

  var _super = _createSuper(ArrayField);

  function ArrayField(props) {
    var _this;

    _classCallCheck(this, ArrayField);

    _this = _super.call(this, props);

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
        onChange(newFormData, errorSchema && _this.props.errorSchema && _objectSpread(_objectSpread({}, _this.props.errorSchema), {}, _defineProperty({}, index, errorSchema)));
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
    key: "itemTitle",
    get: function get() {
      var schema = this.props.schema;
      return schema.items.title || schema.items.description || "Item";
    }
  }, {
    key: "isItemRequired",
    value: function isItemRequired(itemSchema) {
      if (Array.isArray(itemSchema.type)) {
        // While we don't yet support composite/nullable jsonschema types, it's
        // future-proof to check for requirement against these.
        return !(0, _includes.default)(itemSchema.type, "null");
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
        return /*#__PURE__*/_react.default.createElement(UnsupportedField, {
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
      return /*#__PURE__*/_react.default.createElement(Component, arrayProps);
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
          options = _objectWithoutProperties(_getUiOptions2, _excluded);

      var Widget = (0, _utils.getWidget)(schema, widget, widgets);
      return /*#__PURE__*/_react.default.createElement(Widget, {
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

      var _getUiOptions$enumOpt = _objectSpread(_objectSpread({}, (0, _utils.getUiOptions)(uiSchema)), {}, {
        enumOptions: enumOptions
      }),
          _getUiOptions$enumOpt2 = _getUiOptions$enumOpt.widget,
          widget = _getUiOptions$enumOpt2 === void 0 ? "select" : _getUiOptions$enumOpt2,
          options = _objectWithoutProperties(_getUiOptions$enumOpt, _excluded2);

      var Widget = (0, _utils.getWidget)(schema, widget, widgets);
      return /*#__PURE__*/_react.default.createElement(Widget, {
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
          options = _objectWithoutProperties(_getUiOptions3, _excluded3);

      var Widget = (0, _utils.getWidget)(schema, widget, widgets);
      return /*#__PURE__*/_react.default.createElement(Widget, {
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
      return /*#__PURE__*/_react.default.createElement(Template, arrayProps);
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
        children: /*#__PURE__*/_react.default.createElement(SchemaField, {
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
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9BcnJheUZpZWxkLmpzIl0sIm5hbWVzIjpbIkFycmF5RmllbGRUaXRsZSIsIlRpdGxlRmllbGQiLCJpZFNjaGVtYSIsInRpdGxlIiwicmVxdWlyZWQiLCJpZCIsIiRpZCIsIkFycmF5RmllbGREZXNjcmlwdGlvbiIsIkRlc2NyaXB0aW9uRmllbGQiLCJkZXNjcmlwdGlvbiIsIkRlZmF1bHRBcnJheUl0ZW0iLCJwcm9wcyIsImJ0blN0eWxlIiwiZmxleCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiZm9udFdlaWdodCIsImtleSIsImNsYXNzTmFtZSIsImhhc1Rvb2xiYXIiLCJjaGlsZHJlbiIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImhhc01vdmVVcCIsImhhc01vdmVEb3duIiwiZGlzYWJsZWQiLCJyZWFkb25seSIsIm9uUmVvcmRlckNsaWNrIiwiaW5kZXgiLCJoYXNSZW1vdmUiLCJvbkRyb3BJbmRleENsaWNrIiwiRGVmYXVsdEZpeGVkQXJyYXlGaWVsZFRlbXBsYXRlIiwidWlTY2hlbWEiLCJzY2hlbWEiLCJpdGVtcyIsIm1hcCIsImNhbkFkZCIsIm9uQWRkQ2xpY2siLCJEZWZhdWx0Tm9ybWFsQXJyYXlGaWVsZFRlbXBsYXRlIiwicCIsImdlbmVyYXRlUm93SWQiLCJnZW5lcmF0ZUtleWVkRm9ybURhdGEiLCJmb3JtRGF0YSIsIkFycmF5IiwiaXNBcnJheSIsIml0ZW0iLCJrZXllZFRvUGxhaW5Gb3JtRGF0YSIsImtleWVkRm9ybURhdGEiLCJrZXllZEl0ZW0iLCJBcnJheUZpZWxkIiwicmVnaXN0cnkiLCJyb290U2NoZW1hIiwiaXRlbVNjaGVtYSIsImFkZGl0aW9uYWxJdGVtcyIsInVuZGVmaW5lZCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJvbkNoYW5nZSIsIm5ld0tleWVkRm9ybURhdGFSb3ciLCJfZ2V0TmV3Rm9ybURhdGFSb3ciLCJuZXdLZXllZEZvcm1EYXRhIiwic3RhdGUiLCJzZXRTdGF0ZSIsInVwZGF0ZWRLZXllZEZvcm1EYXRhIiwic3BsaWNlIiwibmV3RXJyb3JTY2hlbWEiLCJlcnJvclNjaGVtYSIsImkiLCJwYXJzZUludCIsImZpbHRlciIsIl8iLCJuZXdJbmRleCIsInRhcmdldCIsImJsdXIiLCJyZU9yZGVyQXJyYXkiLCJfbmV3S2V5ZWRGb3JtRGF0YSIsInNsaWNlIiwidmFsdWUiLCJuZXdGb3JtRGF0YSIsImpzb25WYWx1ZSIsInR5cGUiLCJmb3JtSXRlbXMiLCJhZGRhYmxlIiwibWF4SXRlbXMiLCJsZW5ndGgiLCJoYXNPd25Qcm9wZXJ0eSIsImZpZWxkcyIsIlVuc3VwcG9ydGVkRmllbGQiLCJyZW5kZXJNdWx0aVNlbGVjdCIsInJlbmRlckN1c3RvbVdpZGdldCIsInJlbmRlckZpeGVkQXJyYXkiLCJyZW5kZXJGaWxlcyIsInJlbmRlck5vcm1hbEFycmF5IiwibmFtZSIsImF1dG9mb2N1cyIsIm9uQmx1ciIsIm9uRm9jdXMiLCJpZFByZWZpeCIsImlkU2VwYXJhdG9yIiwicmF3RXJyb3JzIiwiQXJyYXlGaWVsZFRlbXBsYXRlIiwiZm9ybUNvbnRleHQiLCJpdGVtc1NjaGVtYSIsImFycmF5UHJvcHMiLCJjYW5BZGRJdGVtIiwiaXRlbUVycm9yU2NoZW1hIiwiaXRlbUlkUHJlZml4IiwiaXRlbUlkU2NoZW1hIiwicmVuZGVyQXJyYXlGaWVsZEl0ZW0iLCJjYW5Nb3ZlVXAiLCJjYW5Nb3ZlRG93biIsIml0ZW1EYXRhIiwiaXRlbVVpU2NoZW1hIiwiQ29tcG9uZW50IiwicGxhY2Vob2xkZXIiLCJ3aWRnZXRzIiwid2lkZ2V0Iiwib3B0aW9ucyIsIldpZGdldCIsIm9uU2VsZWN0Q2hhbmdlIiwiZW51bU9wdGlvbnMiLCJpdGVtU2NoZW1hcyIsImFkZGl0aW9uYWxTY2hlbWEiLCJjb25jYXQiLCJhZGRpdGlvbmFsIiwiY2FuUmVtb3ZlIiwiVGVtcGxhdGUiLCJTY2hlbWFGaWVsZCIsIm9yZGVyYWJsZSIsInJlbW92YWJsZSIsImhhcyIsIm1vdmVVcCIsIm1vdmVEb3duIiwicmVtb3ZlIiwidG9vbGJhciIsIk9iamVjdCIsImtleXMiLCJzb21lIiwiaXNJdGVtUmVxdWlyZWQiLCJvbkNoYW5nZUZvckluZGV4Iiwib25BZGRJbmRleENsaWNrIiwibmV4dFByb3BzIiwicHJldlN0YXRlIiwibmV4dEZvcm1EYXRhIiwicHJldmlvdXNLZXllZEZvcm1EYXRhIiwicHJldmlvdXNLZXllZEZvcm1EYXR1bSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsInR5cGVzIiwiZmllbGRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBY0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFNBQVNBLGVBQVQsT0FBb0U7QUFBQSxNQUF6Q0MsVUFBeUMsUUFBekNBLFVBQXlDO0FBQUEsTUFBN0JDLFFBQTZCLFFBQTdCQSxRQUE2QjtBQUFBLE1BQW5CQyxLQUFtQixRQUFuQkEsS0FBbUI7QUFBQSxNQUFaQyxRQUFZLFFBQVpBLFFBQVk7O0FBQ2xFLE1BQUksQ0FBQ0QsS0FBTCxFQUFZO0FBQ1YsV0FBTyxJQUFQO0FBQ0Q7O0FBQ0QsTUFBTUUsRUFBRSxhQUFNSCxRQUFRLENBQUNJLEdBQWYsWUFBUjtBQUNBLHNCQUFPLDZCQUFDLFVBQUQ7QUFBWSxJQUFBLEVBQUUsRUFBRUQsRUFBaEI7QUFBb0IsSUFBQSxLQUFLLEVBQUVGLEtBQTNCO0FBQWtDLElBQUEsUUFBUSxFQUFFQztBQUE1QyxJQUFQO0FBQ0Q7O0FBRUQsU0FBU0cscUJBQVQsUUFBNEU7QUFBQSxNQUEzQ0MsZ0JBQTJDLFNBQTNDQSxnQkFBMkM7QUFBQSxNQUF6Qk4sUUFBeUIsU0FBekJBLFFBQXlCO0FBQUEsTUFBZk8sV0FBZSxTQUFmQSxXQUFlOztBQUMxRSxNQUFJLENBQUNBLFdBQUwsRUFBa0I7QUFDaEIsV0FBTyxJQUFQO0FBQ0Q7O0FBQ0QsTUFB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UUFBUSxFQUFFLEVBSFU7QUFJcEJFLEVBQUFBLFFBQVEsRUFBRSxLQUpVO0FBS3BCcUIsRUFBQUEsUUFBUSxFQUFFLEtBTFU7QUFNcEJDLEVBQUFBLFFBQVEsRUFBRSxLQU5VO0FBT3BCb0UsRUFBQUEsU0FBUyxFQUFFO0FBUFMsQzs7QUF5b0J4QixJQUFJb0QsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNuRyxFQUFBQSxVQUFVLENBQUNvRyxTQUFYLEdBQXVCQyxLQUFLLENBQUNDLFVBQTdCO0FBQ0Q7O2VBRWN0RyxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkZEJ1dHRvbiBmcm9tIFwiLi4vQWRkQnV0dG9uXCI7XHJcbmltcG9ydCBJY29uQnV0dG9uIGZyb20gXCIuLi9JY29uQnV0dG9uXCI7XHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IGluY2x1ZGVzIGZyb20gXCJjb3JlLWpzLXB1cmUvZXMvYXJyYXkvaW5jbHVkZXNcIjtcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gIGdldFdpZGdldCxcclxuICBnZXREZWZhdWx0Rm9ybVN0YXRlLFxyXG4gIGdldFVpT3B0aW9ucyxcclxuICBpc011bHRpU2VsZWN0LFxyXG4gIGlzRmlsZXNBcnJheSxcclxuICBpc0ZpeGVkSXRlbXMsXHJcbiAgYWxsb3dBZGRpdGlvbmFsSXRlbXMsXHJcbiAgaXNDdXN0b21XaWRnZXQsXHJcbiAgb3B0aW9uc0xpc3QsXHJcbiAgcmV0cmlldmVTY2hlbWEsXHJcbiAgdG9JZFNjaGVtYSxcclxuICBnZXREZWZhdWx0UmVnaXN0cnksXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IG5hbm9pZCB9IGZyb20gXCJuYW5vaWRcIjtcclxuXHJcbmZ1bmN0aW9uIEFycmF5RmllbGRUaXRsZSh7IFRpdGxlRmllbGQsIGlkU2NoZW1hLCB0aXRsZSwgcmVxdWlyZWQgfSkge1xyXG4gIGlmICghdGl0bGUpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBjb25zdCBpZCA9IGAke2lkU2NoZW1hLiRpZH1fX3RpdGxlYDtcclxuICByZXR1cm4gPFRpdGxlRmllbGQgaWQ9e2lkfSB0aXRsZT17dGl0bGV9IHJlcXVpcmVkPXtyZXF1aXJlZH0gLz47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFycmF5RmllbGREZXNjcmlwdGlvbih7IERlc2NyaXB0aW9uRmllbGQsIGlkU2NoZW1hLCBkZXNjcmlwdGlvbiB9KSB7XHJcbiAgaWYgKCFkZXNjcmlwdGlvbikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGNvbnN0IGlkID0gYCR7aWRTY2hlbWEuJGlkfV9fZGVzY3JpcHRpb25gO1xyXG4gIHJldHVybiA8RGVzY3JpcHRpb25GaWVsZCBpZD17aWR9IGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbn0gLz47XHJcbn1cclxuXHJcbi8vIFVzZWQgaW4gdGhlIHR3byB0ZW1wbGF0ZXNcclxuZnVuY3Rpb24gRGVmYXVsdEFycmF5SXRlbShwcm9wcykge1xyXG4gIGNvbnN0IGJ0blN0eWxlID0ge1xyXG4gICAgZmxleDogMSxcclxuICAgIHBhZGRpbmdMZWZ0OiA2LFxyXG4gICAgcGFkZGluZ1JpZ2h0OiA2LFxyXG4gICAgZm9udFdlaWdodDogXCJib2xkXCIsXHJcbiAgfTtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBrZXk9e3Byb3BzLmtleX0gY2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cHJvcHMuaGFzVG9vbGJhciA/IFwiY29sLXhzLTlcIiA6IFwiY29sLXhzLTEyXCJ9PlxyXG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7cHJvcHMuaGFzVG9vbGJhciAmJiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMyBhcnJheS1pdGVtLXRvb2xib3hcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcclxuICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1hcm91bmRcIixcclxuICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIHsocHJvcHMuaGFzTW92ZVVwIHx8IHByb3BzLmhhc01vdmVEb3duKSAmJiAoXHJcbiAgICAgICAgICAgICAgPEljb25CdXR0b25cclxuICAgICAgICAgICAgICAgIGljb249XCJhcnJvdy11cFwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiTW92ZSB1cFwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhcnJheS1pdGVtLW1vdmUtdXBcIlxyXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17YnRuU3R5bGV9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHkgfHwgIXByb3BzLmhhc01vdmVVcH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uUmVvcmRlckNsaWNrKHByb3BzLmluZGV4LCBwcm9wcy5pbmRleCAtIDEpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7KHByb3BzLmhhc01vdmVVcCB8fCBwcm9wcy5oYXNNb3ZlRG93bikgJiYgKFxyXG4gICAgICAgICAgICAgIDxJY29uQnV0dG9uXHJcbiAgICAgICAgICAgICAgICBpY29uPVwiYXJyb3ctZG93blwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhcnJheS1pdGVtLW1vdmUtZG93blwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiTW92ZSBkb3duXCJcclxuICAgICAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e2J0blN0eWxlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e1xyXG4gICAgICAgICAgICAgICAgICBwcm9wcy5kaXNhYmxlZCB8fCBwcm9wcy5yZWFkb25seSB8fCAhcHJvcHMuaGFzTW92ZURvd25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uUmVvcmRlckNsaWNrKHByb3BzLmluZGV4LCBwcm9wcy5pbmRleCArIDEpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7cHJvcHMuaGFzUmVtb3ZlICYmIChcclxuICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICBpY29uPVwicmVtb3ZlXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJSZW1vdmVcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXJyYXktaXRlbS1yZW1vdmVcIlxyXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17YnRuU3R5bGV9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkRyb3BJbmRleENsaWNrKHByb3BzLmluZGV4KX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBEZWZhdWx0Rml4ZWRBcnJheUZpZWxkVGVtcGxhdGUocHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGZpZWxkc2V0IGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfSBpZD17cHJvcHMuaWRTY2hlbWEuJGlkfT5cclxuICAgICAgPEFycmF5RmllbGRUaXRsZVxyXG4gICAgICAgIGtleT17YGFycmF5LWZpZWxkLXRpdGxlLSR7cHJvcHMuaWRTY2hlbWEuJGlkfWB9XHJcbiAgICAgICAgVGl0bGVGaWVsZD17cHJvcHMuVGl0bGVGaWVsZH1cclxuICAgICAgICBpZFNjaGVtYT17cHJvcHMuaWRTY2hlbWF9XHJcbiAgICAgICAgdGl0bGU9e3Byb3BzLnVpU2NoZW1hW1widWk6dGl0bGVcIl0gfHwgcHJvcHMudGl0bGV9XHJcbiAgICAgICAgcmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgeyhwcm9wcy51aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8IHByb3BzLnNjaGVtYS5kZXNjcmlwdGlvbikgJiYgKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImZpZWxkLWRlc2NyaXB0aW9uXCJcclxuICAgICAgICAgIGtleT17YGZpZWxkLWRlc2NyaXB0aW9uLSR7cHJvcHMuaWRTY2hlbWEuJGlkfWB9PlxyXG4gICAgICAgICAge3Byb3BzLnVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHwgcHJvcHMuc2NoZW1hLmRlc2NyaXB0aW9ufVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cInJvdyBhcnJheS1pdGVtLWxpc3RcIlxyXG4gICAgICAgIGtleT17YGFycmF5LWl0ZW0tbGlzdC0ke3Byb3BzLmlkU2NoZW1hLiRpZH1gfT5cclxuICAgICAgICB7cHJvcHMuaXRlbXMgJiYgcHJvcHMuaXRlbXMubWFwKERlZmF1bHRBcnJheUl0ZW0pfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtwcm9wcy5jYW5BZGQgJiYgKFxyXG4gICAgICAgIDxBZGRCdXR0b25cclxuICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tYWRkXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQWRkQ2xpY2t9XHJcbiAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGVmYXVsdE5vcm1hbEFycmF5RmllbGRUZW1wbGF0ZShwcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9IGlkPXtwcm9wcy5pZFNjaGVtYS4kaWR9PlxyXG4gICAgICA8QXJyYXlGaWVsZFRpdGxlXHJcbiAgICAgICAga2V5PXtgYXJyYXktZmllbGQtdGl0bGUtJHtwcm9wcy5pZFNjaGVtYS4kaWR9YH1cclxuICAgICAgICBUaXRsZUZpZWxkPXtwcm9wcy5UaXRsZUZpZWxkfVxyXG4gICAgICAgIGlkU2NoZW1hPXtwcm9wcy5pZFNjaGVtYX1cclxuICAgICAgICB0aXRsZT17cHJvcHMudWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCBwcm9wcy50aXRsZX1cclxuICAgICAgICByZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7KHByb3BzLnVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHwgcHJvcHMuc2NoZW1hLmRlc2NyaXB0aW9uKSAmJiAoXHJcbiAgICAgICAgPEFycmF5RmllbGREZXNjcmlwdGlvblxyXG4gICAgICAgICAga2V5PXtgYXJyYXktZmllbGQtZGVzY3JpcHRpb24tJHtwcm9wcy5pZFNjaGVtYS4kaWR9YH1cclxuICAgICAgICAgIERlc2NyaXB0aW9uRmllbGQ9e3Byb3BzLkRlc2NyaXB0aW9uRmllbGR9XHJcbiAgICAgICAgICBpZFNjaGVtYT17cHJvcHMuaWRTY2hlbWF9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbj17XHJcbiAgICAgICAgICAgIHByb3BzLnVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHwgcHJvcHMuc2NoZW1hLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJyb3cgYXJyYXktaXRlbS1saXN0XCJcclxuICAgICAgICBrZXk9e2BhcnJheS1pdGVtLWxpc3QtJHtwcm9wcy5pZFNjaGVtYS4kaWR9YH0+XHJcbiAgICAgICAge3Byb3BzLml0ZW1zICYmIHByb3BzLml0ZW1zLm1hcChwID0+IERlZmF1bHRBcnJheUl0ZW0ocCkpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtwcm9wcy5jYW5BZGQgJiYgKFxyXG4gICAgICAgIDxBZGRCdXR0b25cclxuICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tYWRkXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQWRkQ2xpY2t9XHJcbiAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVSb3dJZCgpIHtcclxuICByZXR1cm4gbmFub2lkKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlS2V5ZWRGb3JtRGF0YShmb3JtRGF0YSkge1xyXG4gIHJldHVybiAhQXJyYXkuaXNBcnJheShmb3JtRGF0YSlcclxuICAgID8gW11cclxuICAgIDogZm9ybURhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBrZXk6IGdlbmVyYXRlUm93SWQoKSxcclxuICAgICAgICAgIGl0ZW0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGtleWVkVG9QbGFpbkZvcm1EYXRhKGtleWVkRm9ybURhdGEpIHtcclxuICByZXR1cm4ga2V5ZWRGb3JtRGF0YS5tYXAoa2V5ZWRJdGVtID0+IGtleWVkSXRlbS5pdGVtKTtcclxufVxyXG5cclxuY2xhc3MgQXJyYXlGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHVpU2NoZW1hOiB7fSxcclxuICAgIGZvcm1EYXRhOiBbXSxcclxuICAgIGlkU2NoZW1hOiB7fSxcclxuICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHJlYWRvbmx5OiBmYWxzZSxcclxuICAgIGF1dG9mb2N1czogZmFsc2UsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIGNvbnN0IHsgZm9ybURhdGEgfSA9IHByb3BzO1xyXG4gICAgY29uc3Qga2V5ZWRGb3JtRGF0YSA9IGdlbmVyYXRlS2V5ZWRGb3JtRGF0YShmb3JtRGF0YSk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBrZXllZEZvcm1EYXRhLFxyXG4gICAgICB1cGRhdGVkS2V5ZWRGb3JtRGF0YTogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xyXG4gICAgLy8gRG9uJ3QgY2FsbCBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgaWYga2V5ZWQgZm9ybWRhdGEgd2FzIGp1c3QgdXBkYXRlZC5cclxuICAgIGlmIChwcmV2U3RhdGUudXBkYXRlZEtleWVkRm9ybURhdGEpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cGRhdGVkS2V5ZWRGb3JtRGF0YTogZmFsc2UsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXh0Rm9ybURhdGEgPSBuZXh0UHJvcHMuZm9ybURhdGEgfHwgW107XHJcbiAgICBjb25zdCBwcmV2aW91c0tleWVkRm9ybURhdGEgPSBwcmV2U3RhdGUua2V5ZWRGb3JtRGF0YSB8fCBbXTtcclxuICAgIGNvbnN0IG5ld0tleWVkRm9ybURhdGEgPVxyXG4gICAgICBuZXh0Rm9ybURhdGEubGVuZ3RoID09PSBwcmV2aW91c0tleWVkRm9ybURhdGEubGVuZ3RoXHJcbiAgICAgICAgPyBwcmV2aW91c0tleWVkRm9ybURhdGEubWFwKChwcmV2aW91c0tleWVkRm9ybURhdHVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIGtleTogcHJldmlvdXNLZXllZEZvcm1EYXR1bS5rZXksXHJcbiAgICAgICAgICAgICAgaXRlbTogbmV4dEZvcm1EYXRhW2luZGV4XSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgOiBnZW5lcmF0ZUtleWVkRm9ybURhdGEobmV4dEZvcm1EYXRhKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGtleWVkRm9ybURhdGE6IG5ld0tleWVkRm9ybURhdGEsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGl0ZW1UaXRsZSgpIHtcclxuICAgIGNvbnN0IHsgc2NoZW1hIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIHNjaGVtYS5pdGVtcy50aXRsZSB8fCBzY2hlbWEuaXRlbXMuZGVzY3JpcHRpb24gfHwgXCJJdGVtXCI7XHJcbiAgfVxyXG5cclxuICBpc0l0ZW1SZXF1aXJlZChpdGVtU2NoZW1hKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtU2NoZW1hLnR5cGUpKSB7XHJcbiAgICAgIC8vIFdoaWxlIHdlIGRvbid0IHlldCBzdXBwb3J0IGNvbXBvc2l0ZS9udWxsYWJsZSBqc29uc2NoZW1hIHR5cGVzLCBpdCdzXHJcbiAgICAgIC8vIGZ1dHVyZS1wcm9vZiB0byBjaGVjayBmb3IgcmVxdWlyZW1lbnQgYWdhaW5zdCB0aGVzZS5cclxuICAgICAgcmV0dXJuICFpbmNsdWRlcyhpdGVtU2NoZW1hLnR5cGUsIFwibnVsbFwiKTtcclxuICAgIH1cclxuICAgIC8vIEFsbCBub24tbnVsbCBhcnJheSBpdGVtIHR5cGVzIGFyZSBpbmhlcmVudGx5IHJlcXVpcmVkIGJ5IGRlc2lnblxyXG4gICAgcmV0dXJuIGl0ZW1TY2hlbWEudHlwZSAhPT0gXCJudWxsXCI7XHJcbiAgfVxyXG5cclxuICBjYW5BZGRJdGVtKGZvcm1JdGVtcykge1xyXG4gICAgY29uc3QgeyBzY2hlbWEsIHVpU2NoZW1hIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgbGV0IHsgYWRkYWJsZSB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICAgIGlmIChhZGRhYmxlICE9PSBmYWxzZSkge1xyXG4gICAgICAvLyBpZiB1aTpvcHRpb25zLmFkZGFibGUgd2FzIG5vdCBleHBsaWNpdGx5IHNldCB0byBmYWxzZSwgd2UgY2FuIGFkZFxyXG4gICAgICAvLyBhbm90aGVyIGl0ZW0gaWYgd2UgaGF2ZSBub3QgZXhjZWVkZWQgbWF4SXRlbXMgeWV0XHJcbiAgICAgIGlmIChzY2hlbWEubWF4SXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGFkZGFibGUgPSBmb3JtSXRlbXMubGVuZ3RoIDwgc2NoZW1hLm1heEl0ZW1zO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFkZGFibGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWRkYWJsZTtcclxuICB9XHJcblxyXG4gIF9nZXROZXdGb3JtRGF0YVJvdyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgc2NoZW1hLCByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyByb290U2NoZW1hIH0gPSByZWdpc3RyeTtcclxuICAgIGxldCBpdGVtU2NoZW1hID0gc2NoZW1hLml0ZW1zO1xyXG4gICAgaWYgKGlzRml4ZWRJdGVtcyhzY2hlbWEpICYmIGFsbG93QWRkaXRpb25hbEl0ZW1zKHNjaGVtYSkpIHtcclxuICAgICAgaXRlbVNjaGVtYSA9IHNjaGVtYS5hZGRpdGlvbmFsSXRlbXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0RGVmYXVsdEZvcm1TdGF0ZShpdGVtU2NoZW1hLCB1bmRlZmluZWQsIHJvb3RTY2hlbWEpO1xyXG4gIH07XHJcblxyXG4gIG9uQWRkQ2xpY2sgPSBldmVudCA9PiB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgbmV3S2V5ZWRGb3JtRGF0YVJvdyA9IHtcclxuICAgICAga2V5OiBnZW5lcmF0ZVJvd0lkKCksXHJcbiAgICAgIGl0ZW06IHRoaXMuX2dldE5ld0Zvcm1EYXRhUm93KCksXHJcbiAgICB9O1xyXG4gICAgY29uc3QgbmV3S2V5ZWRGb3JtRGF0YSA9IFsuLi50aGlzLnN0YXRlLmtleWVkRm9ybURhdGEsIG5ld0tleWVkRm9ybURhdGFSb3ddO1xyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAge1xyXG4gICAgICAgIGtleWVkRm9ybURhdGE6IG5ld0tleWVkRm9ybURhdGEsXHJcbiAgICAgICAgdXBkYXRlZEtleWVkRm9ybURhdGE6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgICgpID0+IG9uQ2hhbmdlKGtleWVkVG9QbGFpbkZvcm1EYXRhKG5ld0tleWVkRm9ybURhdGEpKVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBvbkFkZEluZGV4Q2xpY2sgPSBpbmRleCA9PiB7XHJcbiAgICByZXR1cm4gZXZlbnQgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIGNvbnN0IG5ld0tleWVkRm9ybURhdGFSb3cgPSB7XHJcbiAgICAgICAga2V5OiBnZW5lcmF0ZVJvd0lkKCksXHJcbiAgICAgICAgaXRlbTogdGhpcy5fZ2V0TmV3Rm9ybURhdGFSb3coKSxcclxuICAgICAgfTtcclxuICAgICAgbGV0IG5ld0tleWVkRm9ybURhdGEgPSBbLi4udGhpcy5zdGF0ZS5rZXllZEZvcm1EYXRhXTtcclxuICAgICAgbmV3S2V5ZWRGb3JtRGF0YS5zcGxpY2UoaW5kZXgsIDAsIG5ld0tleWVkRm9ybURhdGFSb3cpO1xyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBrZXllZEZvcm1EYXRhOiBuZXdLZXllZEZvcm1EYXRhLFxyXG4gICAgICAgICAgdXBkYXRlZEtleWVkRm9ybURhdGE6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiBvbkNoYW5nZShrZXllZFRvUGxhaW5Gb3JtRGF0YShuZXdLZXllZEZvcm1EYXRhKSlcclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgb25Ecm9wSW5kZXhDbGljayA9IGluZGV4ID0+IHtcclxuICAgIHJldHVybiBldmVudCA9PiB7XHJcbiAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgY29uc3QgeyBrZXllZEZvcm1EYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAvLyByZWZzICMxOTU6IHJldmFsaWRhdGUgdG8gZW5zdXJlIHByb3Blcmx5IHJlaW5kZXhpbmcgZXJyb3JzXHJcbiAgICAgIGxldCBuZXdFcnJvclNjaGVtYTtcclxuICAgICAgaWYgKHRoaXMucHJvcHMuZXJyb3JTY2hlbWEpIHtcclxuICAgICAgICBuZXdFcnJvclNjaGVtYSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGVycm9yU2NoZW1hID0gdGhpcy5wcm9wcy5lcnJvclNjaGVtYTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGVycm9yU2NoZW1hKSB7XHJcbiAgICAgICAgICBpID0gcGFyc2VJbnQoaSk7XHJcbiAgICAgICAgICBpZiAoaSA8IGluZGV4KSB7XHJcbiAgICAgICAgICAgIG5ld0Vycm9yU2NoZW1hW2ldID0gZXJyb3JTY2hlbWFbaV07XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgPiBpbmRleCkge1xyXG4gICAgICAgICAgICBuZXdFcnJvclNjaGVtYVtpIC0gMV0gPSBlcnJvclNjaGVtYVtpXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV3S2V5ZWRGb3JtRGF0YSA9IGtleWVkRm9ybURhdGEuZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpbmRleCk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAga2V5ZWRGb3JtRGF0YTogbmV3S2V5ZWRGb3JtRGF0YSxcclxuICAgICAgICAgIHVwZGF0ZWRLZXllZEZvcm1EYXRhOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4gb25DaGFuZ2Uoa2V5ZWRUb1BsYWluRm9ybURhdGEobmV3S2V5ZWRGb3JtRGF0YSksIG5ld0Vycm9yU2NoZW1hKVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBvblJlb3JkZXJDbGljayA9IChpbmRleCwgbmV3SW5kZXgpID0+IHtcclxuICAgIHJldHVybiBldmVudCA9PiB7XHJcbiAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0LmJsdXIoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICBsZXQgbmV3RXJyb3JTY2hlbWE7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLmVycm9yU2NoZW1hKSB7XHJcbiAgICAgICAgbmV3RXJyb3JTY2hlbWEgPSB7fTtcclxuICAgICAgICBjb25zdCBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXJyb3JTY2hlbWE7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBlcnJvclNjaGVtYSkge1xyXG4gICAgICAgICAgaWYgKGkgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWFbbmV3SW5kZXhdID0gZXJyb3JTY2hlbWFbaW5kZXhdO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpID09IG5ld0luZGV4KSB7XHJcbiAgICAgICAgICAgIG5ld0Vycm9yU2NoZW1hW2luZGV4XSA9IGVycm9yU2NoZW1hW25ld0luZGV4XTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0Vycm9yU2NoZW1hW2ldID0gZXJyb3JTY2hlbWFbaV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB7IGtleWVkRm9ybURhdGEgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgIGZ1bmN0aW9uIHJlT3JkZXJBcnJheSgpIHtcclxuICAgICAgICAvLyBDb3B5IGl0ZW1cclxuICAgICAgICBsZXQgX25ld0tleWVkRm9ybURhdGEgPSBrZXllZEZvcm1EYXRhLnNsaWNlKCk7XHJcblxyXG4gICAgICAgIC8vIE1vdmVzIGl0ZW0gZnJvbSBpbmRleCB0byBuZXdJbmRleFxyXG4gICAgICAgIF9uZXdLZXllZEZvcm1EYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgX25ld0tleWVkRm9ybURhdGEuc3BsaWNlKG5ld0luZGV4LCAwLCBrZXllZEZvcm1EYXRhW2luZGV4XSk7XHJcblxyXG4gICAgICAgIHJldHVybiBfbmV3S2V5ZWRGb3JtRGF0YTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBuZXdLZXllZEZvcm1EYXRhID0gcmVPcmRlckFycmF5KCk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAga2V5ZWRGb3JtRGF0YTogbmV3S2V5ZWRGb3JtRGF0YSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IG9uQ2hhbmdlKGtleWVkVG9QbGFpbkZvcm1EYXRhKG5ld0tleWVkRm9ybURhdGEpLCBuZXdFcnJvclNjaGVtYSlcclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgb25DaGFuZ2VGb3JJbmRleCA9IGluZGV4ID0+IHtcclxuICAgIHJldHVybiAodmFsdWUsIGVycm9yU2NoZW1hKSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgZm9ybURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICBjb25zdCBuZXdGb3JtRGF0YSA9IGZvcm1EYXRhLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gdHJlYXQgdW5kZWZpbmVkIGl0ZW1zIGFzIG51bGxzIHRvIGhhdmUgdmFsaWRhdGlvbi5cclxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3RkZWdydW50L2pzb25zY2hlbWEvaXNzdWVzLzIwNlxyXG4gICAgICAgIGNvbnN0IGpzb25WYWx1ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gaW5kZXggPT09IGkgPyBqc29uVmFsdWUgOiBpdGVtO1xyXG4gICAgICB9KTtcclxuICAgICAgb25DaGFuZ2UoXHJcbiAgICAgICAgbmV3Rm9ybURhdGEsXHJcbiAgICAgICAgZXJyb3JTY2hlbWEgJiZcclxuICAgICAgICAgIHRoaXMucHJvcHMuZXJyb3JTY2hlbWEgJiYge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmVycm9yU2NoZW1hLFxyXG4gICAgICAgICAgICBbaW5kZXhdOiBlcnJvclNjaGVtYSxcclxuICAgICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgb25TZWxlY3RDaGFuZ2UgPSB2YWx1ZSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHJlZ2lzdHJ5O1xyXG4gICAgaWYgKCFzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJpdGVtc1wiKSkge1xyXG4gICAgICBjb25zdCB7IGZpZWxkcyB9ID0gcmVnaXN0cnk7XHJcbiAgICAgIGNvbnN0IHsgVW5zdXBwb3J0ZWRGaWVsZCB9ID0gZmllbGRzO1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VW5zdXBwb3J0ZWRGaWVsZFxyXG4gICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgICBpZFNjaGVtYT17aWRTY2hlbWF9XHJcbiAgICAgICAgICByZWFzb249XCJNaXNzaW5nIGl0ZW1zIGRlZmluaXRpb25cIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNNdWx0aVNlbGVjdChzY2hlbWEsIHJvb3RTY2hlbWEpKSB7XHJcbiAgICAgIC8vIElmIGFycmF5IGhhcyBlbnVtIG9yIHVuaXF1ZUl0ZW1zIHNldCB0byB0cnVlLCBjYWxsIHJlbmRlck11bHRpU2VsZWN0KCkgdG8gcmVuZGVyIHRoZSBkZWZhdWx0IG11bHRpc2VsZWN0IHdpZGdldCBvciBhIGN1c3RvbSB3aWRnZXQsIGlmIHNwZWNpZmllZC5cclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTXVsdGlTZWxlY3QoKTtcclxuICAgIH1cclxuICAgIGlmIChpc0N1c3RvbVdpZGdldCh1aVNjaGVtYSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ3VzdG9tV2lkZ2V0KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNGaXhlZEl0ZW1zKHNjaGVtYSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRml4ZWRBcnJheSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzRmlsZXNBcnJheShzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJGaWxlcygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyTm9ybWFsQXJyYXkoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlck5vcm1hbEFycmF5KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIGF1dG9mb2N1cyxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgICAgb25CbHVyLFxyXG4gICAgICBvbkZvY3VzLFxyXG4gICAgICBpZFByZWZpeCxcclxuICAgICAgaWRTZXBhcmF0b3IsXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgPT09IHVuZGVmaW5lZCA/IG5hbWUgOiBzY2hlbWEudGl0bGU7XHJcbiAgICBjb25zdCB7IEFycmF5RmllbGRUZW1wbGF0ZSwgcm9vdFNjaGVtYSwgZmllbGRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IFRpdGxlRmllbGQsIERlc2NyaXB0aW9uRmllbGQgfSA9IGZpZWxkcztcclxuICAgIGNvbnN0IGl0ZW1zU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0ga2V5ZWRUb1BsYWluRm9ybURhdGEodGhpcy5zdGF0ZS5rZXllZEZvcm1EYXRhKTtcclxuICAgIGNvbnN0IGFycmF5UHJvcHMgPSB7XHJcbiAgICAgIGNhbkFkZDogdGhpcy5jYW5BZGRJdGVtKGZvcm1EYXRhKSxcclxuICAgICAgaXRlbXM6IHRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YS5tYXAoKGtleWVkSXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGtleSwgaXRlbSB9ID0ga2V5ZWRJdGVtO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1TY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEsIGl0ZW0pO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hID8gZXJyb3JTY2hlbWFbaW5kZXhdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JZFByZWZpeCA9IGlkU2NoZW1hLiRpZCArIFwiX1wiICsgaW5kZXg7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkU2NoZW1hID0gdG9JZFNjaGVtYShcclxuICAgICAgICAgIGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgICBpdGVtSWRQcmVmaXgsXHJcbiAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgaXRlbSxcclxuICAgICAgICAgIGlkUHJlZml4LFxyXG4gICAgICAgICAgaWRTZXBhcmF0b3JcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFycmF5RmllbGRJdGVtKHtcclxuICAgICAgICAgIGtleSxcclxuICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgY2FuTW92ZVVwOiBpbmRleCA+IDAsXHJcbiAgICAgICAgICBjYW5Nb3ZlRG93bjogaW5kZXggPCBmb3JtRGF0YS5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgaXRlbVNjaGVtYTogaXRlbVNjaGVtYSxcclxuICAgICAgICAgIGl0ZW1JZFNjaGVtYSxcclxuICAgICAgICAgIGl0ZW1FcnJvclNjaGVtYSxcclxuICAgICAgICAgIGl0ZW1EYXRhOiBpdGVtLFxyXG4gICAgICAgICAgaXRlbVVpU2NoZW1hOiB1aVNjaGVtYS5pdGVtcyxcclxuICAgICAgICAgIGF1dG9mb2N1czogYXV0b2ZvY3VzICYmIGluZGV4ID09PSAwLFxyXG4gICAgICAgICAgb25CbHVyLFxyXG4gICAgICAgICAgb25Gb2N1cyxcclxuICAgICAgICB9KTtcclxuICAgICAgfSksXHJcbiAgICAgIGNsYXNzTmFtZTogYGZpZWxkIGZpZWxkLWFycmF5IGZpZWxkLWFycmF5LW9mLSR7aXRlbXNTY2hlbWEudHlwZX1gLFxyXG4gICAgICBEZXNjcmlwdGlvbkZpZWxkLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBvbkFkZENsaWNrOiB0aGlzLm9uQWRkQ2xpY2ssXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICByZXF1aXJlZCxcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICB0aXRsZSxcclxuICAgICAgVGl0bGVGaWVsZCxcclxuICAgICAgZm9ybUNvbnRleHQsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICByYXdFcnJvcnMsXHJcbiAgICAgIHJlZ2lzdHJ5LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBhIGN1c3RvbSByZW5kZXIgZnVuY3Rpb24gd2FzIHBhc3NlZCBpblxyXG4gICAgY29uc3QgQ29tcG9uZW50ID1cclxuICAgICAgdWlTY2hlbWFbXCJ1aTpBcnJheUZpZWxkVGVtcGxhdGVcIl0gfHxcclxuICAgICAgQXJyYXlGaWVsZFRlbXBsYXRlIHx8XHJcbiAgICAgIERlZmF1bHROb3JtYWxBcnJheUZpZWxkVGVtcGxhdGU7XHJcbiAgICByZXR1cm4gPENvbXBvbmVudCB7Li4uYXJyYXlQcm9wc30gLz47XHJcbiAgfVxyXG5cclxuICByZW5kZXJDdXN0b21XaWRnZXQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgaWRTY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBwbGFjZWhvbGRlcixcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIGZvcm1EYXRhOiBpdGVtcyxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgICAgcmF3RXJyb3JzLFxyXG4gICAgICBuYW1lLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IHdpZGdldHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcclxuICAgIGNvbnN0IHRpdGxlID0gc2NoZW1hLnRpdGxlIHx8IG5hbWU7XHJcblxyXG4gICAgY29uc3QgeyB3aWRnZXQsIC4uLm9wdGlvbnMgfSA9IHtcclxuICAgICAgLi4uZ2V0VWlPcHRpb25zKHVpU2NoZW1hKSxcclxuICAgIH07XHJcbiAgICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFdpZGdldFxyXG4gICAgICAgIGlkPXtpZFNjaGVtYSAmJiBpZFNjaGVtYS4kaWR9XHJcbiAgICAgICAgbXVsdGlwbGVcclxuICAgICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cclxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxyXG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbiAgICAgICAgc2NoZW1hPXtzY2hlbWF9XHJcbiAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxyXG4gICAgICAgIHZhbHVlPXtpdGVtc31cclxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxyXG4gICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgICBsYWJlbD17dGl0bGV9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cclxuICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgICByYXdFcnJvcnM9e3Jhd0Vycm9yc31cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJNdWx0aVNlbGVjdCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHksXHJcbiAgICAgIHJlcXVpcmVkLFxyXG4gICAgICBwbGFjZWhvbGRlcixcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgICAgbmFtZSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnByb3BzLmZvcm1EYXRhO1xyXG4gICAgY29uc3QgeyB3aWRnZXRzLCByb290U2NoZW1hLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCBpdGVtc1NjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYS5pdGVtcywgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgfHwgbmFtZTtcclxuICAgIGNvbnN0IGVudW1PcHRpb25zID0gb3B0aW9uc0xpc3QoaXRlbXNTY2hlbWEpO1xyXG4gICAgY29uc3QgeyB3aWRnZXQgPSBcInNlbGVjdFwiLCAuLi5vcHRpb25zIH0gPSB7XHJcbiAgICAgIC4uLmdldFVpT3B0aW9ucyh1aVNjaGVtYSksXHJcbiAgICAgIGVudW1PcHRpb25zLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IFdpZGdldCA9IGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgd2lkZ2V0cyk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8V2lkZ2V0XHJcbiAgICAgICAgaWQ9e2lkU2NoZW1hICYmIGlkU2NoZW1hLiRpZH1cclxuICAgICAgICBtdWx0aXBsZVxyXG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxyXG4gICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cclxuICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XHJcbiAgICAgICAgdmFsdWU9e2l0ZW1zfVxyXG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxyXG4gICAgICAgIGxhYmVsPXt0aXRsZX1cclxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICAgIHJhd0Vycm9ycz17cmF3RXJyb3JzfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckZpbGVzKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzY2hlbWEsXHJcbiAgICAgIHVpU2NoZW1hLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgbmFtZSxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICBhdXRvZm9jdXMsXHJcbiAgICAgIG9uQmx1cixcclxuICAgICAgb25Gb2N1cyxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgICAgcmF3RXJyb3JzLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB0aXRsZSA9IHNjaGVtYS50aXRsZSB8fCBuYW1lO1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnByb3BzLmZvcm1EYXRhO1xyXG4gICAgY29uc3QgeyB3aWRnZXRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IHdpZGdldCA9IFwiZmlsZXNcIiwgLi4ub3B0aW9ucyB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICAgIGNvbnN0IFdpZGdldCA9IGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgd2lkZ2V0cyk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8V2lkZ2V0XHJcbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cclxuICAgICAgICBpZD17aWRTY2hlbWEgJiYgaWRTY2hlbWEuJGlkfVxyXG4gICAgICAgIG11bHRpcGxlXHJcbiAgICAgICAgb25DaGFuZ2U9e3RoaXMub25TZWxlY3RDaGFuZ2V9XHJcbiAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cclxuICAgICAgICBzY2hlbWE9e3NjaGVtYX1cclxuICAgICAgICB0aXRsZT17dGl0bGV9XHJcbiAgICAgICAgdmFsdWU9e2l0ZW1zfVxyXG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICByZWFkb25seT17cmVhZG9ubHl9XHJcbiAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxyXG4gICAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICAgIHJhd0Vycm9ycz17cmF3RXJyb3JzfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckZpeGVkQXJyYXkoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNjaGVtYSxcclxuICAgICAgdWlTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBlcnJvclNjaGVtYSxcclxuICAgICAgaWRQcmVmaXgsXHJcbiAgICAgIGlkU2VwYXJhdG9yLFxyXG4gICAgICBpZFNjaGVtYSxcclxuICAgICAgbmFtZSxcclxuICAgICAgcmVxdWlyZWQsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICByZWFkb25seSxcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgfHwgbmFtZTtcclxuICAgIGxldCBpdGVtcyA9IHRoaXMucHJvcHMuZm9ybURhdGE7XHJcbiAgICBjb25zdCB7IEFycmF5RmllbGRUZW1wbGF0ZSwgcm9vdFNjaGVtYSwgZmllbGRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XHJcbiAgICBjb25zdCB7IFRpdGxlRmllbGQgfSA9IGZpZWxkcztcclxuICAgIGNvbnN0IGl0ZW1TY2hlbWFzID0gc2NoZW1hLml0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+XHJcbiAgICAgIHJldHJpZXZlU2NoZW1hKGl0ZW0sIHJvb3RTY2hlbWEsIGZvcm1EYXRhW2luZGV4XSlcclxuICAgICk7XHJcbiAgICBjb25zdCBhZGRpdGlvbmFsU2NoZW1hID0gYWxsb3dBZGRpdGlvbmFsSXRlbXMoc2NoZW1hKVxyXG4gICAgICA/IHJldHJpZXZlU2NoZW1hKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxyXG4gICAgICA6IG51bGw7XHJcblxyXG4gICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPCBpdGVtU2NoZW1hcy5sZW5ndGgpIHtcclxuICAgICAgLy8gdG8gbWFrZSBzdXJlIGF0IGxlYXN0IGFsbCBmaXhlZCBpdGVtcyBhcmUgZ2VuZXJhdGVkXHJcbiAgICAgIGl0ZW1zID0gaXRlbXMgfHwgW107XHJcbiAgICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KG5ldyBBcnJheShpdGVtU2NoZW1hcy5sZW5ndGggLSBpdGVtcy5sZW5ndGgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGVzZSBhcmUgdGhlIHByb3BzIHBhc3NlZCBpbnRvIHRoZSByZW5kZXIgZnVuY3Rpb25cclxuICAgIGNvbnN0IGFycmF5UHJvcHMgPSB7XHJcbiAgICAgIGNhbkFkZDogdGhpcy5jYW5BZGRJdGVtKGl0ZW1zKSAmJiBhZGRpdGlvbmFsU2NoZW1hLFxyXG4gICAgICBjbGFzc05hbWU6IFwiZmllbGQgZmllbGQtYXJyYXkgZmllbGQtYXJyYXktZml4ZWQtaXRlbXNcIixcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIGlkU2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgaXRlbXM6IHRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YS5tYXAoKGtleWVkSXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGtleSwgaXRlbSB9ID0ga2V5ZWRJdGVtO1xyXG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWwgPSBpbmRleCA+PSBpdGVtU2NoZW1hcy5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgaXRlbVNjaGVtYSA9IGFkZGl0aW9uYWxcclxuICAgICAgICAgID8gcmV0cmlldmVTY2hlbWEoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcywgcm9vdFNjaGVtYSwgaXRlbSlcclxuICAgICAgICAgIDogaXRlbVNjaGVtYXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JZFByZWZpeCA9IGlkU2NoZW1hLiRpZCArIFwiX1wiICsgaW5kZXg7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkU2NoZW1hID0gdG9JZFNjaGVtYShcclxuICAgICAgICAgIGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgICBpdGVtSWRQcmVmaXgsXHJcbiAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgaXRlbSxcclxuICAgICAgICAgIGlkUHJlZml4LFxyXG4gICAgICAgICAgaWRTZXBhcmF0b3JcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1VaVNjaGVtYSA9IGFkZGl0aW9uYWxcclxuICAgICAgICAgID8gdWlTY2hlbWEuYWRkaXRpb25hbEl0ZW1zIHx8IHt9XHJcbiAgICAgICAgICA6IEFycmF5LmlzQXJyYXkodWlTY2hlbWEuaXRlbXMpXHJcbiAgICAgICAgICA/IHVpU2NoZW1hLml0ZW1zW2luZGV4XVxyXG4gICAgICAgICAgOiB1aVNjaGVtYS5pdGVtcyB8fCB7fTtcclxuICAgICAgICBjb25zdCBpdGVtRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYSA/IGVycm9yU2NoZW1hW2luZGV4XSA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQXJyYXlGaWVsZEl0ZW0oe1xyXG4gICAgICAgICAga2V5LFxyXG4gICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICBjYW5SZW1vdmU6IGFkZGl0aW9uYWwsXHJcbiAgICAgICAgICBjYW5Nb3ZlVXA6IGluZGV4ID49IGl0ZW1TY2hlbWFzLmxlbmd0aCArIDEsXHJcbiAgICAgICAgICBjYW5Nb3ZlRG93bjogYWRkaXRpb25hbCAmJiBpbmRleCA8IGl0ZW1zLmxlbmd0aCAtIDEsXHJcbiAgICAgICAgICBpdGVtU2NoZW1hLFxyXG4gICAgICAgICAgaXRlbURhdGE6IGl0ZW0sXHJcbiAgICAgICAgICBpdGVtVWlTY2hlbWEsXHJcbiAgICAgICAgICBpdGVtSWRTY2hlbWEsXHJcbiAgICAgICAgICBpdGVtRXJyb3JTY2hlbWEsXHJcbiAgICAgICAgICBhdXRvZm9jdXM6IGF1dG9mb2N1cyAmJiBpbmRleCA9PT0gMCxcclxuICAgICAgICAgIG9uQmx1cixcclxuICAgICAgICAgIG9uRm9jdXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBvbkFkZENsaWNrOiB0aGlzLm9uQWRkQ2xpY2ssXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICByZXF1aXJlZCxcclxuICAgICAgc2NoZW1hLFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIFRpdGxlRmllbGQsXHJcbiAgICAgIGZvcm1Db250ZXh0LFxyXG4gICAgICByYXdFcnJvcnMsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGEgY3VzdG9tIHRlbXBsYXRlIHRlbXBsYXRlIHdhcyBwYXNzZWQgaW5cclxuICAgIGNvbnN0IFRlbXBsYXRlID1cclxuICAgICAgdWlTY2hlbWFbXCJ1aTpBcnJheUZpZWxkVGVtcGxhdGVcIl0gfHxcclxuICAgICAgQXJyYXlGaWVsZFRlbXBsYXRlIHx8XHJcbiAgICAgIERlZmF1bHRGaXhlZEFycmF5RmllbGRUZW1wbGF0ZTtcclxuICAgIHJldHVybiA8VGVtcGxhdGUgey4uLmFycmF5UHJvcHN9IC8+O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQXJyYXlGaWVsZEl0ZW0ocHJvcHMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAga2V5LFxyXG4gICAgICBpbmRleCxcclxuICAgICAgY2FuUmVtb3ZlID0gdHJ1ZSxcclxuICAgICAgY2FuTW92ZVVwID0gdHJ1ZSxcclxuICAgICAgY2FuTW92ZURvd24gPSB0cnVlLFxyXG4gICAgICBpdGVtU2NoZW1hLFxyXG4gICAgICBpdGVtRGF0YSxcclxuICAgICAgaXRlbVVpU2NoZW1hLFxyXG4gICAgICBpdGVtSWRTY2hlbWEsXHJcbiAgICAgIGl0ZW1FcnJvclNjaGVtYSxcclxuICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICBvbkJsdXIsXHJcbiAgICAgIG9uRm9jdXMsXHJcbiAgICAgIHJhd0Vycm9ycyxcclxuICAgIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IHtcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgICB1aVNjaGVtYSxcclxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBmaWVsZHM6IHsgU2NoZW1hRmllbGQgfSxcclxuICAgIH0gPSByZWdpc3RyeTtcclxuICAgIGNvbnN0IHsgb3JkZXJhYmxlLCByZW1vdmFibGUgfSA9IHtcclxuICAgICAgb3JkZXJhYmxlOiB0cnVlLFxyXG4gICAgICByZW1vdmFibGU6IHRydWUsXHJcbiAgICAgIC4uLnVpU2NoZW1hW1widWk6b3B0aW9uc1wiXSxcclxuICAgIH07XHJcbiAgICBjb25zdCBoYXMgPSB7XHJcbiAgICAgIG1vdmVVcDogb3JkZXJhYmxlICYmIGNhbk1vdmVVcCxcclxuICAgICAgbW92ZURvd246IG9yZGVyYWJsZSAmJiBjYW5Nb3ZlRG93bixcclxuICAgICAgcmVtb3ZlOiByZW1vdmFibGUgJiYgY2FuUmVtb3ZlLFxyXG4gICAgfTtcclxuICAgIGhhcy50b29sYmFyID0gT2JqZWN0LmtleXMoaGFzKS5zb21lKGtleSA9PiBoYXNba2V5XSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2hpbGRyZW46IChcclxuICAgICAgICA8U2NoZW1hRmllbGRcclxuICAgICAgICAgIGluZGV4PXtpbmRleH1cclxuICAgICAgICAgIHNjaGVtYT17aXRlbVNjaGVtYX1cclxuICAgICAgICAgIHVpU2NoZW1hPXtpdGVtVWlTY2hlbWF9XHJcbiAgICAgICAgICBmb3JtRGF0YT17aXRlbURhdGF9XHJcbiAgICAgICAgICBlcnJvclNjaGVtYT17aXRlbUVycm9yU2NoZW1hfVxyXG4gICAgICAgICAgaWRTY2hlbWE9e2l0ZW1JZFNjaGVtYX1cclxuICAgICAgICAgIHJlcXVpcmVkPXt0aGlzLmlzSXRlbVJlcXVpcmVkKGl0ZW1TY2hlbWEpfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VGb3JJbmRleChpbmRleCl9XHJcbiAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XHJcbiAgICAgICAgICByZWdpc3RyeT17dGhpcy5wcm9wcy5yZWdpc3RyeX1cclxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgICAgcmVhZG9ubHk9e3RoaXMucHJvcHMucmVhZG9ubHl9XHJcbiAgICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgICAgIHJhd0Vycm9ycz17cmF3RXJyb3JzfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICksXHJcbiAgICAgIGNsYXNzTmFtZTogXCJhcnJheS1pdGVtXCIsXHJcbiAgICAgIGRpc2FibGVkLFxyXG4gICAgICBoYXNUb29sYmFyOiBoYXMudG9vbGJhcixcclxuICAgICAgaGFzTW92ZVVwOiBoYXMubW92ZVVwLFxyXG4gICAgICBoYXNNb3ZlRG93bjogaGFzLm1vdmVEb3duLFxyXG4gICAgICBoYXNSZW1vdmU6IGhhcy5yZW1vdmUsXHJcbiAgICAgIGluZGV4LFxyXG4gICAgICBrZXksXHJcbiAgICAgIG9uQWRkSW5kZXhDbGljazogdGhpcy5vbkFkZEluZGV4Q2xpY2ssXHJcbiAgICAgIG9uRHJvcEluZGV4Q2xpY2s6IHRoaXMub25Ecm9wSW5kZXhDbGljayxcclxuICAgICAgb25SZW9yZGVyQ2xpY2s6IHRoaXMub25SZW9yZGVyQ2xpY2ssXHJcbiAgICAgIHJlYWRvbmx5LFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBBcnJheUZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFycmF5RmllbGQ7XHJcbiJdfQ==