'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@rjsf/core');
var React = require('react');
var React__default = _interopDefault(React);
var Box$2 = _interopDefault(require('@material-ui/core/Box'));
var Button$2 = _interopDefault(require('@material-ui/core/Button'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/** This context is used to encapsulate the usage of `@material-ui` or `@mui` away from the field, widgets and helpers.
 * It can be created using either an instance of `MaterialUIContextProps` or `Mui5ContextProps`.
 */

var MuiComponentContext = /*#__PURE__*/React__default.createContext(null);

function useMuiComponent() {
  var muiComponents = React.useContext(MuiComponentContext);

  if (!muiComponents) {
    throw new Error('Either v4 or v5 of material-ui components and icons must be installed as dependencies');
  }

  return muiComponents;
}

var AddButton = function AddButton(props) {
  var _useMuiComponent = useMuiComponent(),
      AddIcon = _useMuiComponent.AddIcon,
      Button = _useMuiComponent.Button;

  return /*#__PURE__*/React__default.createElement(Button, Object.assign({}, props, {
    color: "secondary"
  }), /*#__PURE__*/React__default.createElement(AddIcon, null), " Add Item");
};

var isMultiSelect = core.utils.isMultiSelect,
    getDefaultRegistry = core.utils.getDefaultRegistry;

var ArrayFieldTemplate = function ArrayFieldTemplate(props) {
  var schema = props.schema,
      _props$registry = props.registry,
      registry = _props$registry === void 0 ? getDefaultRegistry() : _props$registry;

  if (isMultiSelect(schema, registry.rootSchema)) {
    return /*#__PURE__*/React__default.createElement(DefaultFixedArrayFieldTemplate, Object.assign({}, props));
  } else {
    return /*#__PURE__*/React__default.createElement(DefaultNormalArrayFieldTemplate, Object.assign({}, props));
  }
};

var ArrayFieldTitle = function ArrayFieldTitle(_ref) {
  var TitleField = _ref.TitleField,
      idSchema = _ref.idSchema,
      title = _ref.title,
      required = _ref.required;

  if (!title) {
    return null;
  }

  var id = idSchema.$id + "__title";
  return /*#__PURE__*/React__default.createElement(TitleField, {
    id: id,
    title: title,
    required: required
  });
};

var ArrayFieldDescription = function ArrayFieldDescription(_ref2) {
  var DescriptionField = _ref2.DescriptionField,
      idSchema = _ref2.idSchema,
      description = _ref2.description;

  if (!description) {
    return null;
  }

  var id = idSchema.$id + "__description";
  return /*#__PURE__*/React__default.createElement(DescriptionField, {
    id: id,
    description: description
  });
}; // Used in the two templates


var DefaultArrayItem = function DefaultArrayItem(props) {
  var _useMuiComponent = useMuiComponent(),
      ArrowDownwardIcon = _useMuiComponent.ArrowDownwardIcon,
      ArrowUpwardIcon = _useMuiComponent.ArrowUpwardIcon,
      Box = _useMuiComponent.Box,
      Grid = _useMuiComponent.Grid,
      IconButton = _useMuiComponent.IconButton,
      Paper = _useMuiComponent.Paper,
      RemoveIcon = _useMuiComponent.RemoveIcon;

  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold',
    minWidth: 0
  };
  return /*#__PURE__*/React__default.createElement(Grid, {
    container: true,
    key: props.key,
    alignItems: "center"
  }, /*#__PURE__*/React__default.createElement(Grid, {
    item: true,
    xs: true,
    style: {
      overflow: 'auto'
    }
  }, /*#__PURE__*/React__default.createElement(Box, {
    mb: 2
  }, /*#__PURE__*/React__default.createElement(Paper, {
    elevation: 2
  }, /*#__PURE__*/React__default.createElement(Box, {
    p: 2
  }, props.children)))), props.hasToolbar && /*#__PURE__*/React__default.createElement(Grid, {
    item: true
  }, (props.hasMoveUp || props.hasMoveDown) && /*#__PURE__*/React__default.createElement(IconButton, {
    size: "small",
    className: "array-item-move-up",
    tabIndex: -1,
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveUp,
    onClick: props.onReorderClick(props.index, props.index - 1)
  }, /*#__PURE__*/React__default.createElement(ArrowUpwardIcon, {
    fontSize: "small"
  })), (props.hasMoveUp || props.hasMoveDown) && /*#__PURE__*/React__default.createElement(IconButton, {
    size: "small",
    tabIndex: -1,
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveDown,
    onClick: props.onReorderClick(props.index, props.index + 1)
  }, /*#__PURE__*/React__default.createElement(ArrowDownwardIcon, {
    fontSize: "small"
  })), props.hasRemove && /*#__PURE__*/React__default.createElement(IconButton, {
    size: "small",
    tabIndex: -1,
    style: btnStyle,
    disabled: props.disabled || props.readonly,
    onClick: props.onDropIndexClick(props.index)
  }, /*#__PURE__*/React__default.createElement(RemoveIcon, {
    fontSize: "small"
  }))));
};

var DefaultFixedArrayFieldTemplate = function DefaultFixedArrayFieldTemplate(props) {
  return /*#__PURE__*/React__default.createElement("fieldset", {
    className: props.className
  }, /*#__PURE__*/React__default.createElement(ArrayFieldTitle, {
    key: "array-field-title-" + props.idSchema.$id,
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema['ui:title'] || props.title,
    required: props.required
  }), (props.uiSchema['ui:description'] || props.schema.description) && /*#__PURE__*/React__default.createElement("div", {
    className: "field-description",
    key: "field-description-" + props.idSchema.$id
  }, props.uiSchema['ui:description'] || props.schema.description), /*#__PURE__*/React__default.createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-" + props.idSchema.$id
  }, props.items && props.items.map(DefaultArrayItem)), props.canAdd && /*#__PURE__*/React__default.createElement(AddButton, {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
};

var DefaultNormalArrayFieldTemplate = function DefaultNormalArrayFieldTemplate(props) {
  var _useMuiComponent2 = useMuiComponent(),
      Box = _useMuiComponent2.Box,
      Grid = _useMuiComponent2.Grid,
      Paper = _useMuiComponent2.Paper;

  return /*#__PURE__*/React__default.createElement(Paper, {
    elevation: 2
  }, /*#__PURE__*/React__default.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React__default.createElement(ArrayFieldTitle, {
    key: "array-field-title-" + props.idSchema.$id,
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema['ui:title'] || props.title,
    required: props.required
  }), (props.uiSchema['ui:description'] || props.schema.description) && /*#__PURE__*/React__default.createElement(ArrayFieldDescription, {
    key: "array-field-description-" + props.idSchema.$id,
    DescriptionField: props.DescriptionField,
    idSchema: props.idSchema,
    description: props.uiSchema['ui:description'] || props.schema.description
  }), /*#__PURE__*/React__default.createElement(Grid, {
    container: true,
    key: "array-item-list-" + props.idSchema.$id
  }, props.items && props.items.map(function (p) {
    return DefaultArrayItem(p);
  }), props.canAdd && /*#__PURE__*/React__default.createElement(Grid, {
    container: true,
    justifyContent: "flex-end"
  }, /*#__PURE__*/React__default.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(Box, {
    mt: 2
  }, /*#__PURE__*/React__default.createElement(AddButton, {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  })))))));
};

var ErrorList = function ErrorList(_ref) {
  var errors = _ref.errors;

  var _useMuiComponent = useMuiComponent(),
      Box = _useMuiComponent.Box,
      Typography = _useMuiComponent.Typography,
      List = _useMuiComponent.List,
      ListItem = _useMuiComponent.ListItem,
      ListItemIcon = _useMuiComponent.ListItemIcon,
      ListItemText = _useMuiComponent.ListItemText,
      Paper = _useMuiComponent.Paper,
      ErrorIcon = _useMuiComponent.ErrorIcon;

  return /*#__PURE__*/React__default.createElement(Paper, {
    elevation: 2
  }, /*#__PURE__*/React__default.createElement(Box, {
    mb: 2,
    p: 2
  }, /*#__PURE__*/React__default.createElement(Typography, {
    variant: "h6"
  }, "Errors"), /*#__PURE__*/React__default.createElement(List, {
    dense: true
  }, errors.map(function (error, i) {
    return /*#__PURE__*/React__default.createElement(ListItem, {
      key: i
    }, /*#__PURE__*/React__default.createElement(ListItemIcon, null, /*#__PURE__*/React__default.createElement(ErrorIcon, {
      color: "error"
    })), /*#__PURE__*/React__default.createElement(ListItemText, {
      primary: error.stack
    }));
  }))));
};

var DescriptionField = function DescriptionField(_ref) {
  var description = _ref.description;

  var _useMuiComponent = useMuiComponent(),
      Typography = _useMuiComponent.Typography;

  if (description) {
    return /*#__PURE__*/React__default.createElement(Typography, {
      variant: "subtitle2",
      style: {
        marginTop: '5px'
      }
    }, description);
  }

  return null;
};

var TitleField = function TitleField(_ref) {
  var title = _ref.title;

  var _useMuiComponent = useMuiComponent(),
      Box = _useMuiComponent.Box,
      Divider = _useMuiComponent.Divider,
      Typography = _useMuiComponent.Typography;

  return /*#__PURE__*/React__default.createElement(Box, {
    mb: 1,
    mt: 1
  }, /*#__PURE__*/React__default.createElement(Typography, {
    variant: "h5"
  }, title), /*#__PURE__*/React__default.createElement(Divider, null));
};

var Fields = {
  DescriptionField: DescriptionField,
  TitleField: TitleField
};

var ADDITIONAL_PROPERTY_FLAG = core.utils.ADDITIONAL_PROPERTY_FLAG;

var WrapIfAdditional = function WrapIfAdditional(_ref) {
  var children = _ref.children,
      classNames = _ref.classNames,
      disabled = _ref.disabled,
      id = _ref.id,
      label = _ref.label,
      onDropPropertyClick = _ref.onDropPropertyClick,
      onKeyChange = _ref.onKeyChange,
      readonly = _ref.readonly,
      required = _ref.required,
      schema = _ref.schema;

  var _useMuiComponent = useMuiComponent(),
      Grid = _useMuiComponent.Grid,
      FormControl = _useMuiComponent.FormControl,
      IconButton = _useMuiComponent.IconButton,
      InputLabel = _useMuiComponent.InputLabel,
      Input = _useMuiComponent.Input,
      RemoveIcon = _useMuiComponent.RemoveIcon;

  var keyLabel = label + " Key"; // i18n ?

  var additional = schema.hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold'
  };

  if (!additional) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, children);
  }

  var handleBlur = function handleBlur(_ref2) {
    var target = _ref2.target;
    return onKeyChange(target.value);
  };

  return /*#__PURE__*/React__default.createElement(Grid, {
    className: classNames,
    container: true,
    key: id + "-key",
    alignItems: "center",
    spacing: 2
  }, /*#__PURE__*/React__default.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React__default.createElement(FormControl, {
    fullWidth: true,
    required: required
  }, /*#__PURE__*/React__default.createElement(InputLabel, null, keyLabel), /*#__PURE__*/React__default.createElement(Input, {
    defaultValue: label,
    disabled: disabled || readonly,
    id: id + "-key",
    name: id + "-key",
    onBlur: !readonly ? handleBlur : undefined,
    type: "text"
  }))), /*#__PURE__*/React__default.createElement(Grid, {
    item: true,
    xs: true
  }, children), /*#__PURE__*/React__default.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(IconButton, {
    size: "small",
    tabIndex: -1,
    style: btnStyle,
    disabled: disabled || readonly,
    onClick: onDropPropertyClick(label)
  }, /*#__PURE__*/React__default.createElement(RemoveIcon, null))));
};

var FieldTemplate = function FieldTemplate(_ref) {
  var id = _ref.id,
      children = _ref.children,
      classNames = _ref.classNames,
      disabled = _ref.disabled,
      displayLabel = _ref.displayLabel,
      hidden = _ref.hidden,
      label = _ref.label,
      onDropPropertyClick = _ref.onDropPropertyClick,
      onKeyChange = _ref.onKeyChange,
      readonly = _ref.readonly,
      required = _ref.required,
      _ref$rawErrors = _ref.rawErrors,
      rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors,
      rawHelp = _ref.rawHelp,
      rawDescription = _ref.rawDescription,
      schema = _ref.schema;

  if (hidden) {
    return children;
  }

  var _useMuiComponent = useMuiComponent(),
      FormControl = _useMuiComponent.FormControl,
      FormHelperText = _useMuiComponent.FormHelperText,
      List = _useMuiComponent.List,
      ListItem = _useMuiComponent.ListItem,
      Typography = _useMuiComponent.Typography;

  return /*#__PURE__*/React__default.createElement(WrapIfAdditional, {
    classNames: classNames,
    disabled: disabled,
    id: id,
    label: label,
    onDropPropertyClick: onDropPropertyClick,
    onKeyChange: onKeyChange,
    readonly: readonly,
    required: required,
    schema: schema
  }, /*#__PURE__*/React__default.createElement(FormControl, {
    fullWidth: true,
    error: rawErrors.length ? true : false,
    required: required
  }, children, displayLabel && rawDescription ? /*#__PURE__*/React__default.createElement(Typography, {
    variant: "caption",
    color: "textSecondary"
  }, rawDescription) : null, rawErrors.length > 0 && /*#__PURE__*/React__default.createElement(List, {
    dense: true,
    disablePadding: true
  }, rawErrors.map(function (error, i) {
    return /*#__PURE__*/React__default.createElement(ListItem, {
      key: i,
      disableGutters: true
    }, /*#__PURE__*/React__default.createElement(FormHelperText, {
      id: id
    }, error));
  })), rawHelp && /*#__PURE__*/React__default.createElement(FormHelperText, {
    id: id
  }, rawHelp)));
};

var canExpand = core.utils.canExpand;

var ObjectFieldTemplate = function ObjectFieldTemplate(_ref) {
  var DescriptionField = _ref.DescriptionField,
      description = _ref.description,
      TitleField = _ref.TitleField,
      title = _ref.title,
      properties = _ref.properties,
      required = _ref.required,
      disabled = _ref.disabled,
      readonly = _ref.readonly,
      uiSchema = _ref.uiSchema,
      idSchema = _ref.idSchema,
      schema = _ref.schema,
      formData = _ref.formData,
      onAddClick = _ref.onAddClick;

  var _useMuiComponent = useMuiComponent(),
      Grid = _useMuiComponent.Grid;

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, (uiSchema['ui:title'] || title) && /*#__PURE__*/React__default.createElement(TitleField, {
    id: idSchema.$id + "-title",
    title: title,
    required: required
  }), description && /*#__PURE__*/React__default.createElement(DescriptionField, {
    id: idSchema.$id + "-description",
    description: description
  }), /*#__PURE__*/React__default.createElement(Grid, {
    container: true,
    spacing: 2,
    style: {
      marginTop: '10px'
    }
  }, properties.map(function (element, index) {
    return (// Remove the <Grid> if the inner element is hidden as the <Grid>
      // itself would otherwise still take up space.
      element.hidden ? element.content : /*#__PURE__*/React__default.createElement(Grid, {
        item: true,
        xs: 12,
        key: index,
        style: {
          marginBottom: '10px'
        }
      }, element.content)
    );
  }), canExpand(schema, uiSchema, formData) && /*#__PURE__*/React__default.createElement(Grid, {
    container: true,
    justifyContent: "flex-end"
  }, /*#__PURE__*/React__default.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React__default.createElement(AddButton, {
    className: "object-property-expand",
    onClick: onAddClick(schema),
    disabled: disabled || readonly
  })))));
};

var schemaRequiresTrueValue = core.utils.schemaRequiresTrueValue;

var CheckboxWidget = function CheckboxWidget(props) {
  var schema = props.schema,
      id = props.id,
      value = props.value,
      disabled = props.disabled,
      readonly = props.readonly,
      label = props.label,
      autofocus = props.autofocus,
      onChange = props.onChange,
      onBlur = props.onBlur,
      onFocus = props.onFocus;

  var _useMuiComponent = useMuiComponent(),
      Checkbox = _useMuiComponent.Checkbox,
      FormControlLabel = _useMuiComponent.FormControlLabel; // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords


  var required = schemaRequiresTrueValue(schema);

  var _onChange = function _onChange(_ref, checked) {
    _objectDestructuringEmpty(_ref);

    return onChange(checked);
  };

  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, value);
  };

  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, value);
  };

  return /*#__PURE__*/React__default.createElement(FormControlLabel, {
    control: /*#__PURE__*/React__default.createElement(Checkbox, {
      id: id,
      checked: typeof value === 'undefined' ? false : Boolean(value),
      required: required,
      disabled: disabled || readonly,
      autoFocus: autofocus,
      onChange: _onChange,
      onBlur: _onBlur,
      onFocus: _onFocus
    }),
    label: label || ''
  });
};

var selectValue = function selectValue(value, selected, all) {
  var at = all.indexOf(value);
  var updated = selected.slice(0, at).concat(value, selected.slice(at)); // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order

  return updated.sort(function (a, b) {
    return all.indexOf(a) > all.indexOf(b);
  });
};

var deselectValue = function deselectValue(value, selected) {
  return selected.filter(function (v) {
    return v !== value;
  });
};

var CheckboxesWidget = function CheckboxesWidget(_ref) {
  var schema = _ref.schema,
      label = _ref.label,
      id = _ref.id,
      disabled = _ref.disabled,
      options = _ref.options,
      value = _ref.value,
      autofocus = _ref.autofocus,
      readonly = _ref.readonly,
      required = _ref.required,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;

  var _useMuiComponent = useMuiComponent(),
      FormLabel = _useMuiComponent.FormLabel,
      FormGroup = _useMuiComponent.FormGroup,
      FormControlLabel = _useMuiComponent.FormControlLabel,
      Checkbox = _useMuiComponent.Checkbox;

  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled,
      inline = options.inline;

  var _onChange = function _onChange(option) {
    return function (_ref2) {
      var checked = _ref2.target.checked;
      var all = enumOptions.map(function (_ref3) {
        var value = _ref3.value;
        return value;
      });

      if (checked) {
        onChange(selectValue(option.value, value, all));
      } else {
        onChange(deselectValue(option.value, value));
      }
    };
  };

  var _onBlur = function _onBlur(_ref4) {
    var value = _ref4.target.value;
    return onBlur(id, value);
  };

  var _onFocus = function _onFocus(_ref5) {
    var value = _ref5.target.value;
    return onFocus(id, value);
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(FormLabel, {
    required: required,
    htmlFor: id
  }, label || schema.title), /*#__PURE__*/React__default.createElement(FormGroup, {
    row: !!inline
  }, enumOptions.map(function (option, index) {
    var checked = value.indexOf(option.value) !== -1;
    var itemDisabled = enumDisabled && enumDisabled.indexOf(option.value) != -1;
    var checkbox = /*#__PURE__*/React__default.createElement(Checkbox, {
      id: id + "_" + index,
      checked: checked,
      disabled: disabled || itemDisabled || readonly,
      autoFocus: autofocus && index === 0,
      onChange: _onChange(option),
      onBlur: _onBlur,
      onFocus: _onFocus
    });
    return /*#__PURE__*/React__default.createElement(FormControlLabel, {
      control: checkbox,
      key: index,
      label: option.label
    });
  })));
};

var ColorWidget = function ColorWidget(props) {
  var registry = props.registry;
  var TextWidget = registry.widgets.TextWidget;
  return /*#__PURE__*/React__default.createElement(TextWidget, Object.assign({
    type: "color"
  }, props));
};

var DateWidget = function DateWidget(props) {
  var registry = props.registry;
  var TextWidget = registry.widgets.TextWidget;
  return /*#__PURE__*/React__default.createElement(TextWidget, Object.assign({
    type: "date",
    InputLabelProps: {
      shrink: true
    }
  }, props));
};

var localToUTC = core.utils.localToUTC,
    utcToLocal = core.utils.utcToLocal;

var DateTimeWidget = function DateTimeWidget(props) {
  var registry = props.registry;
  var TextWidget = registry.widgets.TextWidget;
  var value = utcToLocal(props.value);

  var onChange = function onChange(value) {
    props.onChange(localToUTC(value));
  };

  return /*#__PURE__*/React__default.createElement(TextWidget, Object.assign({
    type: "datetime-local",
    InputLabelProps: {
      shrink: true
    }
  }, props, {
    value: value,
    onChange: onChange
  }));
};

var EmailWidget = function EmailWidget(props) {
  var registry = props.registry;
  var TextWidget = registry.widgets.TextWidget;
  return /*#__PURE__*/React__default.createElement(TextWidget, Object.assign({
    type: "email"
  }, props));
};

var PasswordWidget = function PasswordWidget(props) {
  var registry = props.registry;
  var TextWidget = registry.widgets.TextWidget;
  return /*#__PURE__*/React__default.createElement(TextWidget, Object.assign({
    type: "password"
  }, props));
};

var RadioWidget = function RadioWidget(_ref) {
  var id = _ref.id,
      schema = _ref.schema,
      options = _ref.options,
      value = _ref.value,
      required = _ref.required,
      disabled = _ref.disabled,
      readonly = _ref.readonly,
      label = _ref.label,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;

  var _useMuiComponent = useMuiComponent(),
      FormControlLabel = _useMuiComponent.FormControlLabel,
      FormLabel = _useMuiComponent.FormLabel,
      Radio = _useMuiComponent.Radio,
      RadioGroup = _useMuiComponent.RadioGroup;

  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled;

  var _onChange = function _onChange(_ref2, value) {
    _objectDestructuringEmpty(_ref2);

    return onChange(schema.type == 'boolean' ? value !== 'false' : value);
  };

  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, value);
  };

  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, value);
  };

  var row = options ? options.inline : false;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(FormLabel, {
    required: required,
    htmlFor: id
  }, label || schema.title), /*#__PURE__*/React__default.createElement(RadioGroup, {
    value: "" + value,
    row: row,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus
  }, enumOptions.map(function (option, i) {
    var itemDisabled = enumDisabled && enumDisabled.indexOf(option.value) != -1;
    var radio = /*#__PURE__*/React__default.createElement(FormControlLabel, {
      control: /*#__PURE__*/React__default.createElement(Radio, {
        name: id + "-" + i,
        color: "primary",
        key: i
      }),
      label: "" + option.label,
      value: "" + option.value,
      key: i,
      disabled: disabled || itemDisabled || readonly
    });
    return radio;
  })));
};

var rangeSpec = core.utils.rangeSpec;

var RangeWidget = function RangeWidget(_ref) {
  var value = _ref.value,
      readonly = _ref.readonly,
      disabled = _ref.disabled,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      options = _ref.options,
      schema = _ref.schema,
      onChange = _ref.onChange,
      required = _ref.required,
      label = _ref.label,
      id = _ref.id;

  var _useMuiComponent = useMuiComponent(),
      FormLabel = _useMuiComponent.FormLabel,
      Slider = _useMuiComponent.Slider;

  var sliderProps = _extends({
    value: value,
    label: label,
    id: id
  }, rangeSpec(schema));

  var _onChange = function _onChange(_, value) {
    onChange(value ? options.emptyValue : value);
  };

  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, value);
  };

  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, value);
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(FormLabel, {
    required: required,
    id: id
  }, label), /*#__PURE__*/React__default.createElement(Slider, Object.assign({
    disabled: disabled || readonly,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    valueLabelDisplay: "auto"
  }, sliderProps)));
};

var asNumber = core.utils.asNumber,
    guessType = core.utils.guessType;
var nums = /*#__PURE__*/new Set(['number', 'integer']);
/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */

var processValue = function processValue(schema, value) {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  var type = schema.type,
      items = schema.items;

  if (value === '') {
    return undefined;
  } else if (type === 'array' && items && nums.has(items.type)) {
    return value.map(asNumber);
  } else if (type === 'boolean') {
    return value === 'true';
  } else if (type === 'number') {
    return asNumber(value);
  } // If type is undefined, but an enum is present, try and infer the type from
  // the enum values


  if (schema.enum) {
    if (schema.enum.every(function (x) {
      return guessType(x) === 'number';
    })) {
      return asNumber(value);
    } else if (schema.enum.every(function (x) {
      return guessType(x) === 'boolean';
    })) {
      return value === 'true';
    }
  }

  return value;
};

var SelectWidget = function SelectWidget(_ref) {
  var schema = _ref.schema,
      id = _ref.id,
      options = _ref.options,
      label = _ref.label,
      required = _ref.required,
      disabled = _ref.disabled,
      readonly = _ref.readonly,
      value = _ref.value,
      multiple = _ref.multiple,
      autofocus = _ref.autofocus,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      _ref$rawErrors = _ref.rawErrors,
      rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors;

  var _useMuiComponent = useMuiComponent(),
      TextField = _useMuiComponent.TextField,
      MenuItem = _useMuiComponent.MenuItem;

  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled;
  var emptyValue = multiple ? [] : '';

  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;
    return onChange(processValue(schema, value));
  };

  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, processValue(schema, value));
  };

  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, processValue(schema, value));
  };

  return /*#__PURE__*/React__default.createElement(TextField, {
    id: id,
    label: label || schema.title,
    select: true,
    value: typeof value === 'undefined' ? emptyValue : value,
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    error: rawErrors.length > 0,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    InputLabelProps: {
      shrink: true
    },
    SelectProps: {
      multiple: typeof multiple === 'undefined' ? false : multiple
    }
  }, enumOptions.map(function (_ref5, i) {
    var value = _ref5.value,
        label = _ref5.label;
    var disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
    return /*#__PURE__*/React__default.createElement(MenuItem, {
      key: i,
      value: value,
      disabled: disabled
    }, label);
  }));
};

var TextareaWidget = function TextareaWidget(_ref) {
  var id = _ref.id,
      placeholder = _ref.placeholder,
      value = _ref.value,
      required = _ref.required,
      disabled = _ref.disabled,
      autofocus = _ref.autofocus,
      label = _ref.label,
      readonly = _ref.readonly,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      onChange = _ref.onChange,
      options = _ref.options,
      schema = _ref.schema,
      _ref$rawErrors = _ref.rawErrors,
      rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors;

  var _useMuiComponent = useMuiComponent(),
      TextField = _useMuiComponent.TextField;

  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;
    return onChange(value === '' ? options.emptyValue : value);
  };

  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, value);
  };

  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, value);
  };

  var rows = 5;

  if (typeof options.rows === 'string' || typeof options.rows === 'number') {
    rows = options.rows;
  }

  return /*#__PURE__*/React__default.createElement(TextField, {
    id: id,
    label: label || schema.title,
    placeholder: placeholder,
    disabled: disabled || readonly,
    value: value,
    required: required,
    autoFocus: autofocus,
    multiline: true,
    rows: rows,
    error: rawErrors.length > 0,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus
  });
};

var _excluded = ["id", "placeholder", "required", "readonly", "disabled", "type", "label", "value", "onChange", "onBlur", "onFocus", "autofocus", "options", "schema", "uiSchema", "rawErrors", "formContext", "registry"];
var getDisplayLabel = core.utils.getDisplayLabel;

var TextWidget = function TextWidget(_ref) {
  var id = _ref.id,
      placeholder = _ref.placeholder,
      required = _ref.required,
      readonly = _ref.readonly,
      disabled = _ref.disabled,
      type = _ref.type,
      label = _ref.label,
      value = _ref.value,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      autofocus = _ref.autofocus,
      options = _ref.options,
      schema = _ref.schema,
      uiSchema = _ref.uiSchema,
      _ref$rawErrors = _ref.rawErrors,
      rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors,
      registry = _ref.registry,
      textFieldProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useMuiComponent = useMuiComponent(),
      TextField = _useMuiComponent.TextField;

  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;
    return onChange(value === '' ? options.emptyValue : value);
  };

  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, value);
  };

  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, value);
  };

  var rootSchema = registry.rootSchema;
  var displayLabel = getDisplayLabel(schema, uiSchema, rootSchema);
  var inputType = (type || schema.type) === 'string' ? 'text' : "" + (type || schema.type);
  return /*#__PURE__*/React__default.createElement(TextField, Object.assign({
    id: id,
    placeholder: placeholder,
    label: displayLabel ? label || schema.title : false,
    autoFocus: autofocus,
    required: required,
    disabled: disabled || readonly,
    type: inputType,
    value: value || value === 0 ? value : '',
    error: rawErrors.length > 0,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus
  }, textFieldProps));
};

var UpDownWidget = function UpDownWidget(_ref) {
  var id = _ref.id,
      required = _ref.required,
      readonly = _ref.readonly,
      disabled = _ref.disabled,
      label = _ref.label,
      value = _ref.value,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      autofocus = _ref.autofocus;

  var _useMuiComponent = useMuiComponent(),
      FormControl = _useMuiComponent.FormControl,
      InputLabel = _useMuiComponent.InputLabel,
      Input = _useMuiComponent.Input;

  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;
    return onChange(value);
  };

  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, value);
  };

  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, value);
  };

  return /*#__PURE__*/React__default.createElement(FormControl, {
    fullWidth: true,
    required: required
  }, /*#__PURE__*/React__default.createElement(InputLabel, null, label), /*#__PURE__*/React__default.createElement(Input, {
    id: id,
    autoFocus: autofocus,
    required: required,
    type: "number",
    disabled: disabled || readonly,
    value: value || value === 0 ? value : '',
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus
  }));
};

var URLWidget = function URLWidget(props) {
  var registry = props.registry;
  var TextWidget = registry.widgets.TextWidget;
  return /*#__PURE__*/React__default.createElement(TextWidget, Object.assign({
    type: "url"
  }, props));
};

var getSubmitButtonOptions = core.utils.getSubmitButtonOptions;

var SubmitButton = function SubmitButton(props) {
  var _getSubmitButtonOptio = getSubmitButtonOptions(props.uiSchema),
      submitText = _getSubmitButtonOptio.submitText,
      norender = _getSubmitButtonOptio.norender,
      submitButtonProps = _getSubmitButtonOptio.props;

  if (norender) return null;
  return /*#__PURE__*/React__default.createElement(Box$2, {
    marginTop: 3
  }, /*#__PURE__*/React__default.createElement(Button$2, Object.assign({
    type: "submit",
    variant: "contained",
    color: "primary"
  }, submitButtonProps), submitText));
};

var Widgets = {
  CheckboxWidget: CheckboxWidget,
  CheckboxesWidget: CheckboxesWidget,
  ColorWidget: ColorWidget,
  DateWidget: DateWidget,
  DateTimeWidget: DateTimeWidget,
  EmailWidget: EmailWidget,
  PasswordWidget: PasswordWidget,
  RadioWidget: RadioWidget,
  RangeWidget: RangeWidget,
  SelectWidget: SelectWidget,
  TextareaWidget: TextareaWidget,
  TextWidget: TextWidget,
  UpDownWidget: UpDownWidget,
  URLWidget: URLWidget,
  SubmitButton: SubmitButton
};

var getDefaultRegistry$1 = core.utils.getDefaultRegistry;

var _getDefaultRegistry = /*#__PURE__*/getDefaultRegistry$1(),
    fields = _getDefaultRegistry.fields,
    widgets = _getDefaultRegistry.widgets;

var ThemeCommon = {
  ArrayFieldTemplate: ArrayFieldTemplate,
  fields: /*#__PURE__*/_extends({}, fields, Fields),
  FieldTemplate: FieldTemplate,
  ObjectFieldTemplate: ObjectFieldTemplate,
  widgets: /*#__PURE__*/_extends({}, widgets, Widgets),
  ErrorList: ErrorList
};

/** Use require for loading these libraries in case they are not available in order to perform a useful fallback */
// core

var Box;
var Button;
var Checkbox;
var Divider;
var FormControl;
var FormControlLabel;
var FormGroup;
var FormHelperText;
var FormLabel;
var Grid;
var IconButton;
var Input;
var InputLabel;
var List;
var ListItem;
var ListItemIcon;
var ListItemText;
var MenuItem;
var Paper;
var Radio;
var RadioGroup;
var Slider;
var TextField;
var Typography; // icons

var AddIcon;
var ArrowDownwardIcon;
var ArrowUpwardIcon;
var ErrorIcon;
var RemoveIcon;

try {
  // core
  Box = /*#__PURE__*/require('@material-ui/core/Box').default;
  Button = /*#__PURE__*/require('@material-ui/core/Button').default;
  Checkbox = /*#__PURE__*/require('@material-ui/core/Checkbox').default;
  Divider = /*#__PURE__*/require('@material-ui/core/Divider').default;
  FormControl = /*#__PURE__*/require('@material-ui/core/FormControl').default;
  FormControlLabel = /*#__PURE__*/require('@material-ui/core/FormControlLabel').default;
  FormGroup = /*#__PURE__*/require('@material-ui/core/FormGroup').default;
  FormHelperText = /*#__PURE__*/require('@material-ui/core/FormHelperText').default;
  FormLabel = /*#__PURE__*/require('@material-ui/core/FormLabel').default;
  Grid = /*#__PURE__*/require('@material-ui/core/Grid').default;
  IconButton = /*#__PURE__*/require('@material-ui/core/IconButton').default;
  Input = /*#__PURE__*/require('@material-ui/core/Input').default;
  InputLabel = /*#__PURE__*/require('@material-ui/core/InputLabel').default;
  List = /*#__PURE__*/require('@material-ui/core/List').default;
  ListItem = /*#__PURE__*/require('@material-ui/core/ListItem').default;
  ListItemIcon = /*#__PURE__*/require('@material-ui/core/ListItemIcon').default;
  ListItemText = /*#__PURE__*/require('@material-ui/core/ListItemText').default;
  MenuItem = /*#__PURE__*/require('@material-ui/core/MenuItem').default;
  Paper = /*#__PURE__*/require('@material-ui/core/Paper').default;
  Radio = /*#__PURE__*/require('@material-ui/core/Radio').default;
  RadioGroup = /*#__PURE__*/require('@material-ui/core/RadioGroup').default;
  Slider = /*#__PURE__*/require('@material-ui/core/Slider').default;
  TextField = /*#__PURE__*/require('@material-ui/core/TextField').default;
  Typography = /*#__PURE__*/require('@material-ui/core/Typography').default; // icons

  AddIcon = /*#__PURE__*/require('@material-ui/icons/Add').default;
  ArrowDownwardIcon = /*#__PURE__*/require('@material-ui/icons/ArrowDownward').default;
  ArrowUpwardIcon = /*#__PURE__*/require('@material-ui/icons/ArrowUpward').default;
  ErrorIcon = /*#__PURE__*/require('@material-ui/icons/Error').default;
  RemoveIcon = /*#__PURE__*/require('@material-ui/icons/Remove').default;
} catch (_unused) {// no-op
}

var MaterialUIContext;

if (Box && AddIcon) {
  MaterialUIContext = {
    // core
    Box: Box,
    Button: Button,
    Checkbox: Checkbox,
    Divider: Divider,
    FormControl: FormControl,
    FormControlLabel: FormControlLabel,
    FormGroup: FormGroup,
    FormHelperText: FormHelperText,
    FormLabel: FormLabel,
    Grid: Grid,
    IconButton: IconButton,
    Input: Input,
    InputLabel: InputLabel,
    List: List,
    ListItem: ListItem,
    ListItemIcon: ListItemIcon,
    ListItemText: ListItemText,
    MenuItem: MenuItem,
    Paper: Paper,
    Radio: Radio,
    RadioGroup: RadioGroup,
    Slider: Slider,
    TextField: TextField,
    Typography: Typography,
    // icons
    AddIcon: AddIcon,
    ArrowDownwardIcon: ArrowDownwardIcon,
    ArrowUpwardIcon: ArrowUpwardIcon,
    ErrorIcon: ErrorIcon,
    RemoveIcon: RemoveIcon
  };
}

var DefaultChildren = function DefaultChildren() {
  if (MaterialUIContext.Box && MaterialUIContext.Button && MaterialUIContext.AddIcon) {
    return /*#__PURE__*/React__default.createElement(MaterialUIContext.Box, {
      marginTop: 3
    }, /*#__PURE__*/React__default.createElement(MaterialUIContext.Button, {
      type: "submit",
      variant: "contained",
      color: "primary"
    }, "Submit"));
  }

  return /*#__PURE__*/React__default.createElement("div", null, "@material-ui not available");
};

var _excluded$1 = ["children", "as"];
/** Create a component that will wrap a ref-able HTML "form" with a `MuiComponentContext.Provider` so that all of the
 * `@material-ui` fields, widgets and helpers will be rendered using the Material UI version 4 components. If the
 * `MaterialUIContext` does not exist, then the form will contain a simple warning that `@material-ui` is not available.
 * If the `as` prop is passed in then use that as the `FormTag` for the ref otherwise `form`.
 */

var Mui4FormWrapper = /*#__PURE__*/React__default.forwardRef(function Mui4TagName(props, ref) {
  var children = props.children,
      _props$as = props.as,
      FormTag = _props$as === void 0 ? 'form' : _props$as,
      rest = _objectWithoutPropertiesLoose(props, _excluded$1);

  return /*#__PURE__*/React__default.createElement(MuiComponentContext.Provider, {
    value: MaterialUIContext || {}
  }, /*#__PURE__*/React__default.createElement(FormTag, Object.assign({
    ref: ref
  }, rest), MaterialUIContext ? children : /*#__PURE__*/React__default.createElement("div", null, "WARNING: @material-ui/core or @material-ui/icons is not available")));
});
/** The Material UI 4 theme, with the `Mui4FormWrapper` and `DefaultChildren`
 */

var Theme = /*#__PURE__*/_extends({
  _internalFormWrapper: Mui4FormWrapper,
  children: /*#__PURE__*/React__default.createElement(DefaultChildren, null)
}, ThemeCommon);

var MuiForm = /*#__PURE__*/core.withTheme(Theme);

/** Use require for loading these libraries in case they are not available in order to perform a useful fallback */
// core

var Box$1;
var Button$1;
var Checkbox$1;
var Divider$1;
var FormControl$1;
var FormControlLabel$1;
var FormGroup$1;
var FormHelperText$1;
var FormLabel$1;
var Grid$1;
var IconButton$1;
var Input$1;
var InputLabel$1;
var List$1;
var ListItem$1;
var ListItemIcon$1;
var ListItemText$1;
var MenuItem$1;
var Paper$1;
var Radio$1;
var RadioGroup$1;
var Slider$1;
var TextField$1;
var Typography$1; // icons

var AddIcon$1;
var ArrowDownwardIcon$1;
var ArrowUpwardIcon$1;
var ErrorIcon$1;
var RemoveIcon$1;

try {
  // core
  Box$1 = /*#__PURE__*/require('@mui/material/Box').default;
  Button$1 = /*#__PURE__*/require('@mui/material/Button').default;
  Checkbox$1 = /*#__PURE__*/require('@mui/material/Checkbox').default;
  Divider$1 = /*#__PURE__*/require('@mui/material/Divider').default;
  FormControl$1 = /*#__PURE__*/require('@mui/material/FormControl').default;
  FormControlLabel$1 = /*#__PURE__*/require('@mui/material/FormControlLabel').default;
  FormGroup$1 = /*#__PURE__*/require('@mui/material/FormGroup').default;
  FormHelperText$1 = /*#__PURE__*/require('@mui/material/FormHelperText').default;
  FormLabel$1 = /*#__PURE__*/require('@mui/material/FormLabel').default;
  Grid$1 = /*#__PURE__*/require('@mui/material/Grid').default;
  IconButton$1 = /*#__PURE__*/require('@mui/material/IconButton').default;
  Input$1 = /*#__PURE__*/require('@mui/material/OutlinedInput').default;
  InputLabel$1 = /*#__PURE__*/require('@mui/material/InputLabel').default;
  List$1 = /*#__PURE__*/require('@mui/material/List').default;
  ListItem$1 = /*#__PURE__*/require('@mui/material/ListItem').default;
  ListItemIcon$1 = /*#__PURE__*/require('@mui/material/ListItemIcon').default;
  ListItemText$1 = /*#__PURE__*/require('@mui/material/ListItemText').default;
  MenuItem$1 = /*#__PURE__*/require('@mui/material/MenuItem').default;
  Paper$1 = /*#__PURE__*/require('@mui/material/Paper').default;
  Radio$1 = /*#__PURE__*/require('@mui/material/Radio').default;
  RadioGroup$1 = /*#__PURE__*/require('@mui/material/RadioGroup').default;
  Slider$1 = /*#__PURE__*/require('@mui/material/Slider').default;
  TextField$1 = /*#__PURE__*/require('@mui/material/TextField').default;
  Typography$1 = /*#__PURE__*/require('@mui/material/Typography').default; // icons

  AddIcon$1 = /*#__PURE__*/require('@mui/icons-material/Add').default;
  ArrowDownwardIcon$1 = /*#__PURE__*/require('@mui/icons-material/ArrowDownward').default;
  ArrowUpwardIcon$1 = /*#__PURE__*/require('@mui/icons-material/ArrowUpward').default;
  ErrorIcon$1 = /*#__PURE__*/require('@mui/icons-material/Error').default;
  RemoveIcon$1 = /*#__PURE__*/require('@mui/icons-material/Remove').default;
} catch (_unused) {// no-op
}

var Mui5Context;

if (Box$1 && AddIcon$1) {
  Mui5Context = {
    // core
    Box: Box$1,
    Button: Button$1,
    Checkbox: Checkbox$1,
    Divider: Divider$1,
    FormControl: FormControl$1,
    FormControlLabel: FormControlLabel$1,
    FormGroup: FormGroup$1,
    FormHelperText: FormHelperText$1,
    FormLabel: FormLabel$1,
    Grid: Grid$1,
    IconButton: IconButton$1,
    Input: Input$1,
    InputLabel: InputLabel$1,
    List: List$1,
    ListItem: ListItem$1,
    ListItemIcon: ListItemIcon$1,
    ListItemText: ListItemText$1,
    MenuItem: MenuItem$1,
    Paper: Paper$1,
    Radio: Radio$1,
    RadioGroup: RadioGroup$1,
    Slider: Slider$1,
    TextField: TextField$1,
    Typography: Typography$1,
    // icons
    AddIcon: AddIcon$1,
    ArrowDownwardIcon: ArrowDownwardIcon$1,
    ArrowUpwardIcon: ArrowUpwardIcon$1,
    ErrorIcon: ErrorIcon$1,
    RemoveIcon: RemoveIcon$1
  };
}

var DefaultChildren$1 = function DefaultChildren() {
  if (Mui5Context.Box && Mui5Context.Button && Mui5Context.AddIcon) {
    return /*#__PURE__*/React__default.createElement(Mui5Context.Box, {
      marginTop: 3
    }, /*#__PURE__*/React__default.createElement(Mui5Context.Button, {
      type: "submit",
      variant: "contained",
      color: "primary"
    }, "Submit"));
  }

  return /*#__PURE__*/React__default.createElement("div", null, "@mui not available");
};

var _excluded$2 = ["children", "as"];
/** Create a component that will wrap a ref-able HTML "form" with a `MuiComponentContext.Provider` so that all of the
 * `@mui` fields, widgets and helpers will be rendered using the Material UI version 5 components. If the `Mui5Context`
 * does not exist, then the form will contain a simple warning that `@mui` is not available. If the `as` prop is passed
 * in then use that as the `FormTag` for the ref otherwise `form`.
 */

var Mui5FormWrapper = /*#__PURE__*/React__default.forwardRef(function Mui5TagName(props, ref) {
  var children = props.children,
      _props$as = props.as,
      FormTag = _props$as === void 0 ? 'form' : _props$as,
      rest = _objectWithoutPropertiesLoose(props, _excluded$2);

  return /*#__PURE__*/React__default.createElement(MuiComponentContext.Provider, {
    value: Mui5Context || {}
  }, /*#__PURE__*/React__default.createElement(FormTag, Object.assign({
    ref: ref
  }, rest), Mui5Context ? children : /*#__PURE__*/React__default.createElement("div", null, "WARNING: @mui/material or @mui/icons-material is not available")));
});
/** The Material UI 5 theme, with the `Mui5FormWrapper` and `DefaultChildren`
 */

var Theme5 = /*#__PURE__*/_extends({
  _internalFormWrapper: Mui5FormWrapper,
  children: /*#__PURE__*/React__default.createElement(DefaultChildren$1, null)
}, ThemeCommon);

var MuiForm5 = /*#__PURE__*/core.withTheme(Theme5);

exports.ArrayFieldTemplate = ArrayFieldTemplate;
exports.FieldTemplate = FieldTemplate;
exports.Fields = Fields;
exports.MuiComponentContext = MuiComponentContext;
exports.MuiForm = MuiForm;
exports.MuiForm4 = MuiForm;
exports.MuiForm5 = MuiForm5;
exports.ObjectFieldTemplate = ObjectFieldTemplate;
exports.Theme = Theme;
exports.Theme4 = Theme;
exports.Theme5 = Theme5;
exports.Widgets = Widgets;
exports.default = MuiForm;
//# sourceMappingURL=material-ui.cjs.development.js.map
