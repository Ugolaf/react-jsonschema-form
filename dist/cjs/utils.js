"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canExpand = canExpand;
exports.getDefaultRegistry = getDefaultRegistry;
exports.getSchemaType = getSchemaType;
exports.getWidget = getWidget;
exports.hasWidget = hasWidget;
exports.getDefaultFormState = getDefaultFormState;
exports.mergeDefaultsWithFormData = mergeDefaultsWithFormData;
exports.getUiOptions = getUiOptions;
exports.getDisplayLabel = getDisplayLabel;
exports.isObject = isObject;
exports.mergeObjects = mergeObjects;
exports.asNumber = asNumber;
exports.orderProperties = orderProperties;
exports.isConstant = isConstant;
exports.toConstant = toConstant;
exports.isSelect = isSelect;
exports.isMultiSelect = isMultiSelect;
exports.isFilesArray = isFilesArray;
exports.isFixedItems = isFixedItems;
exports.isCustomWidget = isCustomWidget;
exports.allowAdditionalItems = allowAdditionalItems;
exports.optionsList = optionsList;
exports.findSchemaDefinition = findSchemaDefinition;
exports.stubExistingAdditionalProperties = stubExistingAdditionalProperties;
exports.resolveSchema = resolveSchema;
exports.retrieveSchema = retrieveSchema;
exports.mergeSchemas = mergeSchemas;
exports.deepEquals = deepEquals;
exports.shouldRender = shouldRender;
exports.toIdSchema = toIdSchema;
exports.toPathSchema = toPathSchema;
exports.parseDateString = parseDateString;
exports.toDateString = toDateString;
exports.utcToLocal = utcToLocal;
exports.localToUTC = localToUTC;
exports.pad = pad;
exports.dataURItoBlob = dataURItoBlob;
exports.rangeSpec = rangeSpec;
exports.getMatchingOption = getMatchingOption;
exports.schemaRequiresTrueValue = schemaRequiresTrueValue;
exports.guessType = exports.ADDITIONAL_PROPERTY_FLAG = void 0;

var _react = _interopRequireDefault(require("react"));

var ReactIs = _interopRequireWildcard(require("react-is"));

var _jsonSchemaMergeAllof = _interopRequireDefault(require("json-schema-merge-allof"));

var _fill = _interopRequireDefault(require("core-js-pure/features/array/fill"));

var _union = _interopRequireDefault(require("lodash/union"));

var _jsonpointer = _interopRequireDefault(require("jsonpointer"));

var _fields = _interopRequireDefault(require("./components/fields"));

var _widgets = _interopRequireDefault(require("./components/widgets"));

var _validate = _interopRequireWildcard(require("./validate"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ADDITIONAL_PROPERTY_FLAG = "__additional_property";
exports.ADDITIONAL_PROPERTY_FLAG = ADDITIONAL_PROPERTY_FLAG;
var widgetMap = {
  "boolean": {
    checkbox: "CheckboxWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    hidden: "HiddenWidget"
  },
  string: {
    text: "TextWidget",
    password: "PasswordWidget",
    email: "EmailWidget",
    hostname: "TextWidget",
    ipv4: "TextWidget",
    ipv6: "TextWidget",
    uri: "URLWidget",
    "data-url": "FileWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    textarea: "TextareaWidget",
    hidden: "HiddenWidget",
    date: "DateWidget",
    datetime: "DateTimeWidget",
    "date-time": "DateTimeWidget",
    "alt-date": "AltDateWidget",
    "alt-datetime": "AltDateTimeWidget",
    color: "ColorWidget",
    file: "FileWidget"
  },
  number: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  integer: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  array: {
    select: "SelectWidget",
    checkboxes: "CheckboxesWidget",
    files: "FileWidget",
    hidden: "HiddenWidget"
  }
};

function canExpand(schema, uiSchema, formData) {
  if (!schema.additionalProperties) {
    return false;
  }

  var _getUiOptions = getUiOptions(uiSchema),
      expandable = _getUiOptions.expandable;

  if (expandable === false) {
    return expandable;
  } // if ui:options.expandable was not explicitly set to false, we can add
  // another property if we have not exceeded maxProperties yet


  if (schema.maxProperties !== undefined) {
    return Object.keys(formData).length < schema.maxProperties;
  }

  return true;
}

function getDefaultRegistry() {
  return {
    fields: _fields["default"],
    widgets: _widgets["default"],
    definitions: {},
    rootSchema: {},
    formContext: {}
  };
}
/* Gets the type of a given schema. */


function getSchemaType(schema) {
  var type = schema.type;

  if (!type && schema["const"]) {
    return guessType(schema["const"]);
  }

  if (!type && schema["enum"]) {
    return "string";
  }

  if (!type && (schema.properties || schema.additionalProperties)) {
    return "object";
  }

  if (type instanceof Array && type.length === 2 && type.includes("null")) {
    return type.find(function (type) {
      return type !== "null";
    });
  }

  return type;
}

function getWidget(schema, widget) {
  var registeredWidgets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var type = getSchemaType(schema);

  function mergeOptions(Widget) {
    // cache return value as property of widget for proper react reconciliation
    if (!Widget.MergedWidget) {
      var defaultOptions = Widget.defaultProps && Widget.defaultProps.options || {};

      Widget.MergedWidget = function (_ref) {
        var _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            props = _objectWithoutProperties(_ref, ["options"]);

        return _react["default"].createElement(Widget, _extends({
          options: _objectSpread({}, defaultOptions, options)
        }, props));
      };
    }

    return Widget.MergedWidget;
  }

  if (typeof widget === "function" || ReactIs.isForwardRef(_react["default"].createElement(widget)) || ReactIs.isMemo(widget)) {
    return mergeOptions(widget);
  }

  if (typeof widget !== "string") {
    throw new Error("Unsupported widget definition: ".concat(_typeof(widget)));
  }

  if (registeredWidgets.hasOwnProperty(widget)) {
    var registeredWidget = registeredWidgets[widget];
    return getWidget(schema, registeredWidget, registeredWidgets);
  }

  if (!widgetMap.hasOwnProperty(type)) {
    throw new Error("No widget for type \"".concat(type, "\""));
  }

  if (widgetMap[type].hasOwnProperty(widget)) {
    var _registeredWidget = registeredWidgets[widgetMap[type][widget]];
    return getWidget(schema, _registeredWidget, registeredWidgets);
  }

  throw new Error("No widget \"".concat(widget, "\" for type \"").concat(type, "\""));
}

function hasWidget(schema, widget) {
  var registeredWidgets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  try {
    getWidget(schema, widget, registeredWidgets);
    return true;
  } catch (e) {
    if (e.message && (e.message.startsWith("No widget") || e.message.startsWith("Unsupported widget"))) {
      return false;
    }

    throw e;
  }
}

function computeDefaults(_schema, parentDefaults, rootSchema) {
  var rawFormData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var includeUndefinedValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var schema = isObject(_schema) ? _schema : {};
  var formData = isObject(rawFormData) ? rawFormData : {}; // Compute the defaults recursively: give highest priority to deepest nodes.

  var defaults = parentDefaults;

  if (isObject(defaults) && isObject(schema["default"])) {
    // For object defaults, only override parent defaults that are defined in
    // schema.default.
    defaults = mergeObjects(defaults, schema["default"]);
  } else if ("default" in schema) {
    // Use schema defaults for this node.
    defaults = schema["default"];
  } else if ("$ref" in schema) {
    // Use referenced schema defaults for this node.
    var refSchema = findSchemaDefinition(schema.$ref, rootSchema);
    return computeDefaults(refSchema, defaults, rootSchema, formData, includeUndefinedValues);
  } else if ("dependencies" in schema) {
    var resolvedSchema = resolveDependencies(schema, rootSchema, formData);
    return computeDefaults(resolvedSchema, defaults, rootSchema, formData, includeUndefinedValues);
  } else if (isFixedItems(schema)) {
    defaults = schema.items.map(function (itemSchema, idx) {
      return computeDefaults(itemSchema, Array.isArray(parentDefaults) ? parentDefaults[idx] : undefined, rootSchema, formData, includeUndefinedValues);
    });
  } else if ("oneOf" in schema) {
    schema = schema.oneOf[getMatchingOption(undefined, schema.oneOf, rootSchema)];
  } else if ("anyOf" in schema) {
    schema = schema.anyOf[getMatchingOption(undefined, schema.anyOf, rootSchema)];
  } // Not defaults defined for this node, fallback to generic typed ones.


  if (typeof defaults === "undefined") {
    defaults = schema["default"];
  }

  switch (getSchemaType(schema)) {
    // We need to recur for object schema inner default values.
    case "object":
      return Object.keys(schema.properties || {}).reduce(function (acc, key) {
        // Compute the defaults for this node, with the parent defaults we might
        // have from a previous run: defaults[key].
        var computedDefault = computeDefaults(schema.properties[key], (defaults || {})[key], rootSchema, (formData || {})[key], includeUndefinedValues);

        if (includeUndefinedValues || computedDefault !== undefined) {
          acc[key] = computedDefault;
        }

        return acc;
      }, {});

    case "array":
      // Inject defaults into existing array defaults
      if (Array.isArray(defaults)) {
        defaults = defaults.map(function (item, idx) {
          return computeDefaults(schema.items[idx] || schema.additionalItems || {}, item, rootSchema);
        });
      } // Deeply inject defaults into already existing form data


      if (Array.isArray(rawFormData)) {
        defaults = rawFormData.map(function (item, idx) {
          return computeDefaults(schema.items, (defaults || {})[idx], rootSchema, item);
        });
      }

      if (schema.minItems) {
        if (!isMultiSelect(schema, rootSchema)) {
          var defaultsLength = defaults ? defaults.length : 0;

          if (schema.minItems > defaultsLength) {
            var defaultEntries = defaults || []; // populate the array with the defaults

            var fillerSchema = Array.isArray(schema.items) ? schema.additionalItems : schema.items;
            var fillerEntries = (0, _fill["default"])(new Array(schema.minItems - defaultsLength), computeDefaults(fillerSchema, fillerSchema.defaults, rootSchema)); // then fill up the rest with either the item default or empty, up to minItems

            return defaultEntries.concat(fillerEntries);
          }
        } else {
          return defaults ? defaults : [];
        }
      }

  }

  return defaults;
}

function getDefaultFormState(_schema, formData) {
  var rootSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var includeUndefinedValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!isObject(_schema)) {
    throw new Error("Invalid schema: " + _schema);
  }

  var schema = retrieveSchema(_schema, rootSchema, formData);
  var defaults = computeDefaults(schema, _schema["default"], rootSchema, formData, includeUndefinedValues);

  if (typeof formData === "undefined") {
    // No form data? Use schema defaults.
    return defaults;
  }

  if (isObject(formData) || Array.isArray(formData)) {
    return mergeDefaultsWithFormData(defaults, formData);
  }

  if (formData === 0 || formData === false || formData === "") {
    return formData;
  }

  return formData || defaults;
}
/**
 * When merging defaults and form data, we want to merge in this specific way:
 * - objects are deeply merged
 * - arrays are merged in such a way that:
 *   - when the array is set in form data, only array entries set in form data
 *     are deeply merged; additional entries from the defaults are ignored
 *   - when the array is not set in form data, the default is copied over
 * - scalars are overwritten/set by form data
 */


function mergeDefaultsWithFormData(defaults, formData) {
  if (Array.isArray(formData)) {
    if (!Array.isArray(defaults)) {
      defaults = [];
    }

    return formData.map(function (value, idx) {
      if (defaults[idx]) {
        return mergeDefaultsWithFormData(defaults[idx], value);
      }

      return value;
    });
  } else if (isObject(formData)) {
    var acc = Object.assign({}, defaults); // Prevent mutation of source object.

    return Object.keys(formData).reduce(function (acc, key) {
      acc[key] = mergeDefaultsWithFormData(defaults ? defaults[key] : {}, formData[key]);
      return acc;
    }, acc);
  } else {
    return formData;
  }
}

function getUiOptions(uiSchema) {
  // get all passed options from ui:widget, ui:options, and ui:<optionName>
  return Object.keys(uiSchema).filter(function (key) {
    return key.indexOf("ui:") === 0;
  }).reduce(function (options, key) {
    var value = uiSchema[key];

    if (key === "ui:widget" && isObject(value)) {
      console.warn("Setting options via ui:widget object is deprecated, use ui:options instead");
      return _objectSpread({}, options, value.options || {}, {
        widget: value.component
      });
    }

    if (key === "ui:options" && isObject(value)) {
      return _objectSpread({}, options, value);
    }

    return _objectSpread({}, options, _defineProperty({}, key.substring(3), value));
  }, {});
}

function getDisplayLabel(schema, uiSchema, rootSchema) {
  var uiOptions = getUiOptions(uiSchema);
  var _uiOptions$label = uiOptions.label,
      displayLabel = _uiOptions$label === void 0 ? true : _uiOptions$label;
  var schemaType = getSchemaType(schema);

  if (schemaType === "array") {
    displayLabel = isMultiSelect(schema, rootSchema) || isFilesArray(schema, uiSchema, rootSchema) || isCustomWidget(uiSchema);
  }

  if (schemaType === "object") {
    displayLabel = false;
  }

  if (schemaType === "boolean" && !uiSchema["ui:widget"]) {
    displayLabel = false;
  }

  if (uiSchema["ui:field"]) {
    displayLabel = false;
  }

  return displayLabel;
}

function isObject(thing) {
  if (typeof File !== "undefined" && thing instanceof File) {
    return false;
  }

  return _typeof(thing) === "object" && thing !== null && !Array.isArray(thing);
}

function mergeObjects(obj1, obj2) {
  var concatArrays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // Recursively merge deeply nested objects.
  var acc = Object.assign({}, obj1); // Prevent mutation of source object.

  return Object.keys(obj2).reduce(function (acc, key) {
    var left = obj1 ? obj1[key] : {},
        right = obj2[key];

    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays);
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right);
    } else {
      acc[key] = right;
    }

    return acc;
  }, acc);
}

function asNumber(value) {
  if (value === "") {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (/\.$/.test(value)) {
    // "3." can't really be considered a number even if it parses in js. The
    // user is most likely entering a float.
    return value;
  }

  if (/\.0$/.test(value)) {
    // we need to return this as a string here, to allow for input like 3.07
    return value;
  }

  var n = Number(value);
  var valid = typeof n === "number" && !Number.isNaN(n);

  if (/\.\d*0$/.test(value)) {
    // It's a number, that's cool - but we need it as a string so it doesn't screw
    // with the user when entering dollar amounts or other values (such as those with
    // specific precision or number of significant digits)
    return value;
  }

  return valid ? n : value;
}

function orderProperties(properties, order) {
  if (!Array.isArray(order)) {
    return properties;
  }

  var arrayToHash = function arrayToHash(arr) {
    return arr.reduce(function (prev, curr) {
      prev[curr] = true;
      return prev;
    }, {});
  };

  var errorPropList = function errorPropList(arr) {
    return arr.length > 1 ? "properties '".concat(arr.join("', '"), "'") : "property '".concat(arr[0], "'");
  };

  var propertyHash = arrayToHash(properties);
  var orderFiltered = order.filter(function (prop) {
    return prop === "*" || propertyHash[prop];
  });
  var orderHash = arrayToHash(orderFiltered);
  var rest = properties.filter(function (prop) {
    return !orderHash[prop];
  });
  var restIndex = orderFiltered.indexOf("*");

  if (restIndex === -1) {
    if (rest.length) {
      throw new Error("uiSchema order list does not contain ".concat(errorPropList(rest)));
    }

    return orderFiltered;
  }

  if (restIndex !== orderFiltered.lastIndexOf("*")) {
    throw new Error("uiSchema order list contains more than one wildcard item");
  }

  var complete = _toConsumableArray(orderFiltered);

  complete.splice.apply(complete, [restIndex, 1].concat(_toConsumableArray(rest)));
  return complete;
}
/**
 * This function checks if the given schema matches a single
 * constant value.
 */


function isConstant(schema) {
  return Array.isArray(schema["enum"]) && schema["enum"].length === 1 || schema.hasOwnProperty("const");
}

function toConstant(schema) {
  if (Array.isArray(schema["enum"]) && schema["enum"].length === 1) {
    return schema["enum"][0];
  } else if (schema.hasOwnProperty("const")) {
    return schema["const"];
  } else {
    throw new Error("schema cannot be inferred as a constant");
  }
}

function isSelect(_schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var schema = retrieveSchema(_schema, rootSchema);
  var altSchemas = schema.oneOf || schema.anyOf;

  if (Array.isArray(schema["enum"])) {
    return true;
  } else if (Array.isArray(altSchemas)) {
    return altSchemas.every(function (altSchemas) {
      return isConstant(altSchemas);
    });
  }

  return false;
}

function isMultiSelect(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!schema.uniqueItems || !schema.items) {
    return false;
  }

  return isSelect(schema.items, rootSchema);
}

function isFilesArray(schema, uiSchema) {
  var rootSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (uiSchema["ui:widget"] === "files") {
    return true;
  } else if (schema.items) {
    var itemsSchema = retrieveSchema(schema.items, rootSchema);
    return itemsSchema.type === "string" && itemsSchema.format === "data-url";
  }

  return false;
}

function isFixedItems(schema) {
  return Array.isArray(schema.items) && schema.items.length > 0 && schema.items.every(function (item) {
    return isObject(item);
  });
}

function isCustomWidget(uiSchema) {
  return (// TODO: Remove the `&& uiSchema["ui:widget"] !== "hidden"` once we support hidden widgets for arrays.
    // https://react-jsonschema-form.readthedocs.io/en/latest/usage/widgets/#hidden-widgets
    "widget" in getUiOptions(uiSchema) && getUiOptions(uiSchema)["widget"] !== "hidden"
  );
}

function allowAdditionalItems(schema) {
  if (schema.additionalItems === true) {
    console.warn("additionalItems=true is currently not supported");
  }

  return isObject(schema.additionalItems);
}

function optionsList(schema) {
  if (schema["enum"]) {
    return schema["enum"].map(function (value, i) {
      var label = schema.enumNames && schema.enumNames[i] || String(value);
      return {
        label: label,
        value: value
      };
    });
  } else {
    var altSchemas = schema.oneOf || schema.anyOf;
    return altSchemas.map(function (schema) {
      var value = toConstant(schema);
      var label = schema.title || String(value);
      return {
        schema: schema,
        label: label,
        value: value
      };
    });
  }
}

function findSchemaDefinition($ref) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var origRef = $ref;

  if ($ref.startsWith("#")) {
    // Decode URI fragment representation.
    $ref = decodeURIComponent($ref.substring(1));
  } else {
    throw new Error("Could not find a definition for ".concat(origRef, "."));
  }

  var current = _jsonpointer["default"].get(rootSchema, $ref);

  if (current === undefined) {
    throw new Error("Could not find a definition for ".concat(origRef, "."));
  }

  if (current.hasOwnProperty("$ref")) {
    return findSchemaDefinition(current.$ref, rootSchema);
  }

  return current;
} // In the case where we have to implicitly create a schema, it is useful to know what type to use
//  based on the data we are defining


var guessType = function guessType(value) {
  if (Array.isArray(value)) {
    return "array";
  } else if (typeof value === "string") {
    return "string";
  } else if (value == null) {
    return "null";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else if (!isNaN(value)) {
    return "number";
  } else if (_typeof(value) === "object") {
    return "object";
  } // Default to string if we can't figure it out


  return "string";
}; // This function will create new "properties" items for each key in our formData


exports.guessType = guessType;

function stubExistingAdditionalProperties(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Clone the schema so we don't ruin the consumer's original
  schema = _objectSpread({}, schema, {
    properties: _objectSpread({}, schema.properties)
  }); // make sure formData is an object

  formData = isObject(formData) ? formData : {};
  Object.keys(formData).forEach(function (key) {
    if (schema.properties.hasOwnProperty(key)) {
      // No need to stub, our schema already has the property
      return;
    }

    var additionalProperties;

    if (schema.additionalProperties.hasOwnProperty("$ref")) {
      additionalProperties = retrieveSchema({
        $ref: schema.additionalProperties["$ref"]
      }, rootSchema, formData);
    } else if (schema.additionalProperties.hasOwnProperty("type")) {
      additionalProperties = _objectSpread({}, schema.additionalProperties);
    } else {
      additionalProperties = {
        type: guessType(formData[key])
      };
    } // The type of our new key should match the additionalProperties value;


    schema.properties[key] = additionalProperties; // Set our additional property flag so we know it was dynamically added

    schema.properties[key][ADDITIONAL_PROPERTY_FLAG] = true;
  });
  return schema;
}
/**
 * Resolves a conditional block (if/else/then) by removing the condition and merging the appropriate conditional branch with the rest of the schema
 */


var resolveCondition = function resolveCondition(schema, rootSchema, formData) {
  var expression = schema["if"],
      then = schema.then,
      otherwise = schema["else"],
      resolvedSchemaLessConditional = _objectWithoutProperties(schema, ["if", "then", "else"]);

  var conditionalSchema = (0, _validate.isValid)(expression, formData, rootSchema) ? then : otherwise;

  if (conditionalSchema) {
    return retrieveSchema(mergeSchemas(resolvedSchemaLessConditional, retrieveSchema(conditionalSchema, rootSchema, formData)), rootSchema, formData);
  } else {
    return retrieveSchema(resolvedSchemaLessConditional, rootSchema, formData);
  }
};
/**
 * Resolves references and dependencies within a schema and its 'allOf' children.
 *
 * Called internally by retrieveSchema.
 */


function resolveSchema(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (schema.hasOwnProperty("$ref")) {
    return resolveReference(schema, rootSchema, formData);
  } else if (schema.hasOwnProperty("dependencies")) {
    var resolvedSchema = resolveDependencies(schema, rootSchema, formData);
    return retrieveSchema(resolvedSchema, rootSchema, formData);
  } else if (schema.hasOwnProperty("allOf")) {
    return _objectSpread({}, schema, {
      allOf: schema.allOf.map(function (allOfSubschema) {
        return retrieveSchema(allOfSubschema, rootSchema, formData);
      })
    });
  } else {
    // No $ref or dependencies attribute found, returning the original schema.
    return schema;
  }
}

function resolveReference(schema, rootSchema, formData) {
  // Retrieve the referenced schema definition.
  var $refSchema = findSchemaDefinition(schema.$ref, rootSchema); // Drop the $ref property of the source schema.

  var $ref = schema.$ref,
      localSchema = _objectWithoutProperties(schema, ["$ref"]); // Update referenced schema definition with local schema properties.


  return retrieveSchema(_objectSpread({}, $refSchema, localSchema), rootSchema, formData);
}

function retrieveSchema(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!isObject(schema)) {
    return {};
  }

  var resolvedSchema = resolveSchema(schema, rootSchema, formData);

  if (schema.hasOwnProperty("if")) {
    return resolveCondition(schema, rootSchema, formData);
  }

  if ("allOf" in schema) {
    try {
      resolvedSchema = (0, _jsonSchemaMergeAllof["default"])(_objectSpread({}, resolvedSchema, {
        allOf: resolvedSchema.allOf
      }));
    } catch (e) {
      console.warn("could not merge subschemas in allOf:\n" + e);

      var _resolvedSchema = resolvedSchema,
          allOf = _resolvedSchema.allOf,
          resolvedSchemaWithoutAllOf = _objectWithoutProperties(_resolvedSchema, ["allOf"]);

      return resolvedSchemaWithoutAllOf;
    }
  }

  var hasAdditionalProperties = resolvedSchema.hasOwnProperty("additionalProperties") && resolvedSchema.additionalProperties !== false;

  if (hasAdditionalProperties) {
    return stubExistingAdditionalProperties(resolvedSchema, rootSchema, formData);
  }

  return resolvedSchema;
}

function resolveDependencies(schema, rootSchema, formData) {
  // Drop the dependencies from the source schema.
  var _schema$dependencies = schema.dependencies,
      dependencies = _schema$dependencies === void 0 ? {} : _schema$dependencies,
      resolvedSchema = _objectWithoutProperties(schema, ["dependencies"]);

  if ("oneOf" in resolvedSchema) {
    resolvedSchema = resolvedSchema.oneOf[getMatchingOption(formData, resolvedSchema.oneOf, rootSchema)];
  } else if ("anyOf" in resolvedSchema) {
    resolvedSchema = resolvedSchema.anyOf[getMatchingOption(formData, resolvedSchema.anyOf, rootSchema)];
  }

  return processDependencies(dependencies, resolvedSchema, rootSchema, formData);
}

function processDependencies(dependencies, resolvedSchema, rootSchema, formData) {
  // Process dependencies updating the local schema properties as appropriate.
  for (var dependencyKey in dependencies) {
    // Skip this dependency if its trigger property is not present.
    if (formData[dependencyKey] === undefined) {
      continue;
    } // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)


    if (resolvedSchema.properties && !(dependencyKey in resolvedSchema.properties)) {
      continue;
    }

    var dependencyValue = dependencies[dependencyKey],
        remainingDependencies = _objectWithoutProperties(dependencies, [dependencyKey].map(_toPropertyKey));

    if (Array.isArray(dependencyValue)) {
      resolvedSchema = withDependentProperties(resolvedSchema, dependencyValue);
    } else if (isObject(dependencyValue)) {
      resolvedSchema = withDependentSchema(resolvedSchema, rootSchema, formData, dependencyKey, dependencyValue);
    }

    return processDependencies(remainingDependencies, resolvedSchema, rootSchema, formData);
  }

  return resolvedSchema;
}

function withDependentProperties(schema, additionallyRequired) {
  if (!additionallyRequired) {
    return schema;
  }

  var required = Array.isArray(schema.required) ? Array.from(new Set([].concat(_toConsumableArray(schema.required), _toConsumableArray(additionallyRequired)))) : additionallyRequired;
  return _objectSpread({}, schema, {
    required: required
  });
}

function withDependentSchema(schema, rootSchema, formData, dependencyKey, dependencyValue) {
  var _retrieveSchema = retrieveSchema(dependencyValue, rootSchema, formData),
      oneOf = _retrieveSchema.oneOf,
      dependentSchema = _objectWithoutProperties(_retrieveSchema, ["oneOf"]);

  schema = mergeSchemas(schema, dependentSchema); // Since it does not contain oneOf, we return the original schema.

  if (oneOf === undefined) {
    return schema;
  } else if (!Array.isArray(oneOf)) {
    throw new Error("invalid: it is some ".concat(_typeof(oneOf), " instead of an array"));
  } // Resolve $refs inside oneOf.


  var resolvedOneOf = oneOf.map(function (subschema) {
    return subschema.hasOwnProperty("$ref") ? resolveReference(subschema, rootSchema, formData) : subschema;
  });
  return withExactlyOneSubschema(schema, rootSchema, formData, dependencyKey, resolvedOneOf);
}

function withExactlyOneSubschema(schema, rootSchema, formData, dependencyKey, oneOf) {
  var validSubschemas = oneOf.filter(function (subschema) {
    if (!subschema.properties) {
      return false;
    }

    var conditionPropertySchema = subschema.properties[dependencyKey];

    if (conditionPropertySchema) {
      var conditionSchema = {
        type: "object",
        properties: _defineProperty({}, dependencyKey, conditionPropertySchema)
      };

      var _validateFormData = (0, _validate["default"])(formData, conditionSchema),
          errors = _validateFormData.errors;

      return errors.length === 0;
    }
  });

  if (validSubschemas.length !== 1) {
    console.warn("ignoring oneOf in dependencies because there isn't exactly one subschema that is valid");
    return schema;
  }

  var subschema = validSubschemas[0];

  var _subschema$properties = subschema.properties,
      conditionPropertySchema = _subschema$properties[dependencyKey],
      dependentSubschema = _objectWithoutProperties(_subschema$properties, [dependencyKey].map(_toPropertyKey));

  var dependentSchema = _objectSpread({}, subschema, {
    properties: dependentSubschema
  });

  return mergeSchemas(schema, retrieveSchema(dependentSchema, rootSchema, formData));
} // Recursively merge deeply nested schemas.
// The difference between mergeSchemas and mergeObjects
// is that mergeSchemas only concats arrays for
// values under the "required" keyword, and when it does,
// it doesn't include duplicate values.


function mergeSchemas(obj1, obj2) {
  var acc = Object.assign({}, obj1); // Prevent mutation of source object.

  return Object.keys(obj2).reduce(function (acc, key) {
    var left = obj1 ? obj1[key] : {},
        right = obj2[key];

    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeSchemas(left, right);
    } else if (obj1 && obj2 && (getSchemaType(obj1) === "object" || getSchemaType(obj2) === "object") && key === "required" && Array.isArray(left) && Array.isArray(right)) {
      // Don't include duplicate values when merging
      // "required" fields.
      acc[key] = (0, _union["default"])(left, right);
    } else {
      acc[key] = right;
    }

    return acc;
  }, acc);
}

function isArguments(object) {
  return Object.prototype.toString.call(object) === "[object Arguments]";
}

function deepEquals(a, b) {
  var ca = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  // Partially extracted from node-deeper and adapted to exclude comparison
  // checks for functions.
  // https://github.com/othiym23/node-deeper
  if (a === b) {
    return true;
  } else if (typeof a === "function" || typeof b === "function") {
    // Assume all functions are equivalent
    // see https://github.com/rjsf-team/react-jsonschema-form/issues/255
    return true;
  } else if (_typeof(a) !== "object" || _typeof(b) !== "object") {
    return false;
  } else if (a === null || b === null) {
    return false;
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  } else if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.lastIndex === b.lastIndex && a.ignoreCase === b.ignoreCase;
  } else if (isArguments(a) || isArguments(b)) {
    if (!(isArguments(a) && isArguments(b))) {
      return false;
    }

    var slice = Array.prototype.slice;
    return deepEquals(slice.call(a), slice.call(b), ca, cb);
  } else {
    if (a.constructor !== b.constructor) {
      return false;
    }

    var ka = Object.keys(a);
    var kb = Object.keys(b); // don't bother with stack acrobatics if there's nothing there

    if (ka.length === 0 && kb.length === 0) {
      return true;
    }

    if (ka.length !== kb.length) {
      return false;
    }

    var cal = ca.length;

    while (cal--) {
      if (ca[cal] === a) {
        return cb[cal] === b;
      }
    }

    ca.push(a);
    cb.push(b);
    ka.sort();
    kb.sort();

    for (var j = ka.length - 1; j >= 0; j--) {
      if (ka[j] !== kb[j]) {
        return false;
      }
    }

    var _key;

    for (var k = ka.length - 1; k >= 0; k--) {
      _key = ka[k];

      if (!deepEquals(a[_key], b[_key], ca, cb)) {
        return false;
      }
    }

    ca.pop();
    cb.pop();
    return true;
  }
}

function shouldRender(comp, nextProps, nextState) {
  var props = comp.props,
      state = comp.state;
  return !deepEquals(props, nextProps) || !deepEquals(state, nextState);
}

function toIdSchema(schema, id, rootSchema) {
  var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var idPrefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "root";
  var idSeparator = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "_";
  var idSchema = {
    $id: id || idPrefix
  };

  if ("$ref" in schema || "dependencies" in schema || "allOf" in schema) {
    var _schema = retrieveSchema(schema, rootSchema, formData);

    return toIdSchema(_schema, id, rootSchema, formData, idPrefix, idSeparator);
  }

  if ("items" in schema && !schema.items.$ref) {
    return toIdSchema(schema.items, id, rootSchema, formData, idPrefix, idSeparator);
  }

  if (schema.type !== "object") {
    return idSchema;
  }

  for (var name in schema.properties || {}) {
    var field = schema.properties[name];
    var fieldId = idSchema.$id + idSeparator + name;
    idSchema[name] = toIdSchema(isObject(field) ? field : {}, fieldId, rootSchema, // It's possible that formData is not an object -- this can happen if an
    // array item has just been added, but not populated with data yet
    (formData || {})[name], idPrefix, idSeparator);
  }

  return idSchema;
}

function toPathSchema(schema) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var rootSchema = arguments.length > 2 ? arguments[2] : undefined;
  var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var pathSchema = {
    $name: name.replace(/^\./, "")
  };

  if ("$ref" in schema || "dependencies" in schema || "allOf" in schema) {
    var _schema = retrieveSchema(schema, rootSchema, formData);

    return toPathSchema(_schema, name, rootSchema, formData);
  }

  if (schema.hasOwnProperty("additionalProperties")) {
    pathSchema.__rjsf_additionalProperties = true;
  }

  if (schema.hasOwnProperty("items") && Array.isArray(formData)) {
    formData.forEach(function (element, i) {
      pathSchema[i] = toPathSchema(schema.items, "".concat(name, ".").concat(i), rootSchema, element);
    });
  } else if (schema.hasOwnProperty("properties")) {
    for (var property in schema.properties) {
      pathSchema[property] = toPathSchema(schema.properties[property], "".concat(name, ".").concat(property), rootSchema, // It's possible that formData is not an object -- this can happen if an
      // array item has just been added, but not populated with data yet
      (formData || {})[property]);
    }
  }

  return pathSchema;
}

function parseDateString(dateString) {
  var includeTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (!dateString) {
    return {
      year: -1,
      month: -1,
      day: -1,
      hour: includeTime ? -1 : 0,
      minute: includeTime ? -1 : 0,
      second: includeTime ? -1 : 0
    };
  }

  var date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Unable to parse date " + dateString);
  }

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    // oh you, javascript.
    day: date.getUTCDate(),
    hour: includeTime ? date.getUTCHours() : 0,
    minute: includeTime ? date.getUTCMinutes() : 0,
    second: includeTime ? date.getUTCSeconds() : 0
  };
}

function toDateString(_ref2) {
  var year = _ref2.year,
      month = _ref2.month,
      day = _ref2.day,
      _ref2$hour = _ref2.hour,
      hour = _ref2$hour === void 0 ? 0 : _ref2$hour,
      _ref2$minute = _ref2.minute,
      minute = _ref2$minute === void 0 ? 0 : _ref2$minute,
      _ref2$second = _ref2.second,
      second = _ref2$second === void 0 ? 0 : _ref2$second;
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var utcTime = Date.UTC(year, month - 1, day, hour, minute, second);
  var datetime = new Date(utcTime).toJSON();
  return time ? datetime : datetime.slice(0, 10);
}

function utcToLocal(jsonDate) {
  if (!jsonDate) {
    return "";
  } // required format of `"yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"
  // https://html.spec.whatwg.org/multipage/input.html#local-date-and-time-state-(type%3Ddatetime-local)
  // > should be a _valid local date and time string_ (not GMT)
  // Note - date constructor passed local ISO-8601 does not correctly
  // change time to UTC in node pre-8


  var date = new Date(jsonDate);
  var yyyy = pad(date.getFullYear(), 4);
  var MM = pad(date.getMonth() + 1, 2);
  var dd = pad(date.getDate(), 2);
  var hh = pad(date.getHours(), 2);
  var mm = pad(date.getMinutes(), 2);
  var ss = pad(date.getSeconds(), 2);
  var SSS = pad(date.getMilliseconds(), 3);
  return "".concat(yyyy, "-").concat(MM, "-").concat(dd, "T").concat(hh, ":").concat(mm, ":").concat(ss, ".").concat(SSS);
}

function localToUTC(dateString) {
  if (dateString) {
    return new Date(dateString).toJSON();
  }
}

function pad(num, size) {
  var s = String(num);

  while (s.length < size) {
    s = "0" + s;
  }

  return s;
}

function dataURItoBlob(dataURI) {
  // Split metadata from data
  var splitted = dataURI.split(","); // Split params

  var params = splitted[0].split(";"); // Get mime-type from params

  var type = params[0].replace("data:", ""); // Filter the name property from params

  var properties = params.filter(function (param) {
    return param.split("=")[0] === "name";
  }); // Look for the name and use unknown if no name property.

  var name;

  if (properties.length !== 1) {
    name = "unknown";
  } else {
    // Because we filtered out the other property,
    // we only have the name case here.
    name = properties[0].split("=")[1];
  } // Built the Uint8Array Blob parameter from the base64 string.


  var binary = atob(splitted[1]);
  var array = [];

  for (var _i = 0; _i < binary.length; _i++) {
    array.push(binary.charCodeAt(_i));
  } // Create the blob object


  var blob = new window.Blob([new Uint8Array(array)], {
    type: type
  });
  return {
    blob: blob,
    name: name
  };
}

function rangeSpec(schema) {
  var spec = {};

  if (schema.multipleOf) {
    spec.step = schema.multipleOf;
  }

  if (schema.minimum || schema.minimum === 0) {
    spec.min = schema.minimum;
  }

  if (schema.maximum || schema.maximum === 0) {
    spec.max = schema.maximum;
  }

  return spec;
}

function getMatchingOption(formData, options, rootSchema) {
  // For performance, skip validating subschemas if formData is undefined. We just
  // want to get the first option in that case.
  if (formData === undefined) {
    return 0;
  }

  for (var _i2 = 0; _i2 < options.length; _i2++) {
    var option = options[_i2]; // If the schema describes an object then we need to add slightly more
    // strict matching to the schema, because unless the schema uses the
    // "requires" keyword, an object will match the schema as long as it
    // doesn't have matching keys with a conflicting type. To do this we use an
    // "anyOf" with an array of requires. This augmentation expresses that the
    // schema should match if any of the keys in the schema are present on the
    // object and pass validation.

    if (option.properties) {
      // Create an "anyOf" schema that requires at least one of the keys in the
      // "properties" object
      var requiresAnyOf = {
        anyOf: Object.keys(option.properties).map(function (key) {
          return {
            required: [key]
          };
        })
      };
      var augmentedSchema = void 0; // If the "anyOf" keyword already exists, wrap the augmentation in an "allOf"

      if (option.anyOf) {
        // Create a shallow clone of the option
        var shallowClone = _extends({}, option);

        if (!shallowClone.allOf) {
          shallowClone.allOf = [];
        } else {
          // If "allOf" already exists, shallow clone the array
          shallowClone.allOf = shallowClone.allOf.slice();
        }

        shallowClone.allOf.push(requiresAnyOf);
        augmentedSchema = shallowClone;
      } else {
        augmentedSchema = Object.assign({}, option, requiresAnyOf);
      } // Remove the "required" field as it's likely that not all fields have
      // been filled in yet, which will mean that the schema is not valid


      delete augmentedSchema.required;

      if ((0, _validate.isValid)(augmentedSchema, formData, rootSchema)) {
        return _i2;
      }
    } else if ((0, _validate.isValid)(option, formData, rootSchema)) {
      return _i2;
    }
  }

  return 0;
} // Check to see if a schema specifies that a value must be true


function schemaRequiresTrueValue(schema) {
  // Check if const is a truthy value
  if (schema["const"]) {
    return true;
  } // Check if an enum has a single value of true


  if (schema["enum"] && schema["enum"].length === 1 && schema["enum"][0] === true) {
    return true;
  } // If anyOf has a single value, evaluate the subschema


  if (schema.anyOf && schema.anyOf.length === 1) {
    return schemaRequiresTrueValue(schema.anyOf[0]);
  } // If oneOf has a single value, evaluate the subschema


  if (schema.oneOf && schema.oneOf.length === 1) {
    return schemaRequiresTrueValue(schema.oneOf[0]);
  } // Evaluate each subschema in allOf, to see if one of them requires a true
  // value


  if (schema.allOf) {
    return schema.allOf.some(schemaRequiresTrueValue);
  }

  return false;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJ3aWRnZXRNYXAiLCJjaGVja2JveCIsInJhZGlvIiwic2VsZWN0IiwiaGlkZGVuIiwic3RyaW5nIiwidGV4dCIsInBhc3N3b3JkIiwiZW1haWwiLCJob3N0bmFtZSIsImlwdjQiLCJpcHY2IiwidXJpIiwidGV4dGFyZWEiLCJkYXRlIiwiZGF0ZXRpbWUiLCJjb2xvciIsImZpbGUiLCJudW1iZXIiLCJ1cGRvd24iLCJyYW5nZSIsImludGVnZXIiLCJhcnJheSIsImNoZWNrYm94ZXMiLCJmaWxlcyIsImNhbkV4cGFuZCIsInNjaGVtYSIsInVpU2NoZW1hIiwiZm9ybURhdGEiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImdldFVpT3B0aW9ucyIsImV4cGFuZGFibGUiLCJtYXhQcm9wZXJ0aWVzIiwidW5kZWZpbmVkIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImdldERlZmF1bHRSZWdpc3RyeSIsImZpZWxkcyIsIndpZGdldHMiLCJkZWZpbml0aW9ucyIsInJvb3RTY2hlbWEiLCJmb3JtQ29udGV4dCIsImdldFNjaGVtYVR5cGUiLCJ0eXBlIiwiZ3Vlc3NUeXBlIiwicHJvcGVydGllcyIsIkFycmF5IiwiaW5jbHVkZXMiLCJmaW5kIiwiZ2V0V2lkZ2V0Iiwid2lkZ2V0IiwicmVnaXN0ZXJlZFdpZGdldHMiLCJtZXJnZU9wdGlvbnMiLCJXaWRnZXQiLCJNZXJnZWRXaWRnZXQiLCJkZWZhdWx0T3B0aW9ucyIsImRlZmF1bHRQcm9wcyIsIm9wdGlvbnMiLCJwcm9wcyIsIlJlYWN0SXMiLCJpc0ZvcndhcmRSZWYiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJpc01lbW8iLCJFcnJvciIsImhhc093blByb3BlcnR5IiwicmVnaXN0ZXJlZFdpZGdldCIsImhhc1dpZGdldCIsImUiLCJtZXNzYWdlIiwic3RhcnRzV2l0aCIsImNvbXB1dGVEZWZhdWx0cyIsIl9zY2hlbWEiLCJwYXJlbnREZWZhdWx0cyIsInJhd0Zvcm1EYXRhIiwiaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyIsImlzT2JqZWN0IiwiZGVmYXVsdHMiLCJtZXJnZU9iamVjdHMiLCJyZWZTY2hlbWEiLCJmaW5kU2NoZW1hRGVmaW5pdGlvbiIsIiRyZWYiLCJyZXNvbHZlZFNjaGVtYSIsInJlc29sdmVEZXBlbmRlbmNpZXMiLCJpc0ZpeGVkSXRlbXMiLCJpdGVtcyIsIm1hcCIsIml0ZW1TY2hlbWEiLCJpZHgiLCJpc0FycmF5Iiwib25lT2YiLCJnZXRNYXRjaGluZ09wdGlvbiIsImFueU9mIiwicmVkdWNlIiwiYWNjIiwia2V5IiwiY29tcHV0ZWREZWZhdWx0IiwiaXRlbSIsImFkZGl0aW9uYWxJdGVtcyIsIm1pbkl0ZW1zIiwiaXNNdWx0aVNlbGVjdCIsImRlZmF1bHRzTGVuZ3RoIiwiZGVmYXVsdEVudHJpZXMiLCJmaWxsZXJTY2hlbWEiLCJmaWxsZXJFbnRyaWVzIiwiY29uY2F0IiwiZ2V0RGVmYXVsdEZvcm1TdGF0ZSIsInJldHJpZXZlU2NoZW1hIiwibWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YSIsInZhbHVlIiwiYXNzaWduIiwiZmlsdGVyIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJ3YXJuIiwiY29tcG9uZW50Iiwic3Vic3RyaW5nIiwiZ2V0RGlzcGxheUxhYmVsIiwidWlPcHRpb25zIiwibGFiZWwiLCJkaXNwbGF5TGFiZWwiLCJzY2hlbWFUeXBlIiwiaXNGaWxlc0FycmF5IiwiaXNDdXN0b21XaWRnZXQiLCJ0aGluZyIsIkZpbGUiLCJvYmoxIiwib2JqMiIsImNvbmNhdEFycmF5cyIsImxlZnQiLCJyaWdodCIsImFzTnVtYmVyIiwidGVzdCIsIm4iLCJOdW1iZXIiLCJ2YWxpZCIsImlzTmFOIiwib3JkZXJQcm9wZXJ0aWVzIiwib3JkZXIiLCJhcnJheVRvSGFzaCIsImFyciIsInByZXYiLCJjdXJyIiwiZXJyb3JQcm9wTGlzdCIsImpvaW4iLCJwcm9wZXJ0eUhhc2giLCJvcmRlckZpbHRlcmVkIiwicHJvcCIsIm9yZGVySGFzaCIsInJlc3QiLCJyZXN0SW5kZXgiLCJsYXN0SW5kZXhPZiIsImNvbXBsZXRlIiwic3BsaWNlIiwiaXNDb25zdGFudCIsInRvQ29uc3RhbnQiLCJpc1NlbGVjdCIsImFsdFNjaGVtYXMiLCJldmVyeSIsInVuaXF1ZUl0ZW1zIiwiaXRlbXNTY2hlbWEiLCJmb3JtYXQiLCJhbGxvd0FkZGl0aW9uYWxJdGVtcyIsIm9wdGlvbnNMaXN0IiwiaSIsImVudW1OYW1lcyIsIlN0cmluZyIsInRpdGxlIiwib3JpZ1JlZiIsImRlY29kZVVSSUNvbXBvbmVudCIsImN1cnJlbnQiLCJqc29ucG9pbnRlciIsImdldCIsInN0dWJFeGlzdGluZ0FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZm9yRWFjaCIsInJlc29sdmVDb25kaXRpb24iLCJleHByZXNzaW9uIiwidGhlbiIsIm90aGVyd2lzZSIsInJlc29sdmVkU2NoZW1hTGVzc0NvbmRpdGlvbmFsIiwiY29uZGl0aW9uYWxTY2hlbWEiLCJtZXJnZVNjaGVtYXMiLCJyZXNvbHZlU2NoZW1hIiwicmVzb2x2ZVJlZmVyZW5jZSIsImFsbE9mIiwiYWxsT2ZTdWJzY2hlbWEiLCIkcmVmU2NoZW1hIiwibG9jYWxTY2hlbWEiLCJyZXNvbHZlZFNjaGVtYVdpdGhvdXRBbGxPZiIsImhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZGVwZW5kZW5jaWVzIiwicHJvY2Vzc0RlcGVuZGVuY2llcyIsImRlcGVuZGVuY3lLZXkiLCJkZXBlbmRlbmN5VmFsdWUiLCJyZW1haW5pbmdEZXBlbmRlbmNpZXMiLCJ3aXRoRGVwZW5kZW50UHJvcGVydGllcyIsIndpdGhEZXBlbmRlbnRTY2hlbWEiLCJhZGRpdGlvbmFsbHlSZXF1aXJlZCIsInJlcXVpcmVkIiwiZnJvbSIsIlNldCIsImRlcGVuZGVudFNjaGVtYSIsInJlc29sdmVkT25lT2YiLCJzdWJzY2hlbWEiLCJ3aXRoRXhhY3RseU9uZVN1YnNjaGVtYSIsInZhbGlkU3Vic2NoZW1hcyIsImNvbmRpdGlvblByb3BlcnR5U2NoZW1hIiwiY29uZGl0aW9uU2NoZW1hIiwiZXJyb3JzIiwiZGVwZW5kZW50U3Vic2NoZW1hIiwiaXNBcmd1bWVudHMiLCJvYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJkZWVwRXF1YWxzIiwiYSIsImIiLCJjYSIsImNiIiwiRGF0ZSIsImdldFRpbWUiLCJSZWdFeHAiLCJzb3VyY2UiLCJnbG9iYWwiLCJtdWx0aWxpbmUiLCJsYXN0SW5kZXgiLCJpZ25vcmVDYXNlIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsImthIiwia2IiLCJjYWwiLCJwdXNoIiwic29ydCIsImoiLCJrIiwicG9wIiwic2hvdWxkUmVuZGVyIiwiY29tcCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInN0YXRlIiwidG9JZFNjaGVtYSIsImlkIiwiaWRQcmVmaXgiLCJpZFNlcGFyYXRvciIsImlkU2NoZW1hIiwiJGlkIiwibmFtZSIsImZpZWxkIiwiZmllbGRJZCIsInRvUGF0aFNjaGVtYSIsInBhdGhTY2hlbWEiLCIkbmFtZSIsInJlcGxhY2UiLCJfX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMiLCJlbGVtZW50IiwicHJvcGVydHkiLCJwYXJzZURhdGVTdHJpbmciLCJkYXRlU3RyaW5nIiwiaW5jbHVkZVRpbWUiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImdldFVUQ0RhdGUiLCJnZXRVVENIb3VycyIsImdldFVUQ01pbnV0ZXMiLCJnZXRVVENTZWNvbmRzIiwidG9EYXRlU3RyaW5nIiwidGltZSIsInV0Y1RpbWUiLCJVVEMiLCJ0b0pTT04iLCJ1dGNUb0xvY2FsIiwianNvbkRhdGUiLCJ5eXl5IiwicGFkIiwiZ2V0RnVsbFllYXIiLCJNTSIsImdldE1vbnRoIiwiZGQiLCJnZXREYXRlIiwiaGgiLCJnZXRIb3VycyIsIm1tIiwiZ2V0TWludXRlcyIsInNzIiwiZ2V0U2Vjb25kcyIsIlNTUyIsImdldE1pbGxpc2Vjb25kcyIsImxvY2FsVG9VVEMiLCJudW0iLCJzaXplIiwicyIsImRhdGFVUkl0b0Jsb2IiLCJkYXRhVVJJIiwic3BsaXR0ZWQiLCJzcGxpdCIsInBhcmFtcyIsInBhcmFtIiwiYmluYXJ5IiwiYXRvYiIsImNoYXJDb2RlQXQiLCJibG9iIiwid2luZG93IiwiQmxvYiIsIlVpbnQ4QXJyYXkiLCJyYW5nZVNwZWMiLCJzcGVjIiwibXVsdGlwbGVPZiIsInN0ZXAiLCJtaW5pbXVtIiwibWluIiwibWF4aW11bSIsIm1heCIsIm9wdGlvbiIsInJlcXVpcmVzQW55T2YiLCJhdWdtZW50ZWRTY2hlbWEiLCJzaGFsbG93Q2xvbmUiLCJzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZSIsInNvbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLHdCQUF3QixHQUFHLHVCQUFqQzs7QUFFUCxJQUFNQyxTQUFTLEdBQUc7QUFDaEIsYUFBUztBQUNQQyxJQUFBQSxRQUFRLEVBQUUsZ0JBREg7QUFFUEMsSUFBQUEsS0FBSyxFQUFFLGFBRkE7QUFHUEMsSUFBQUEsTUFBTSxFQUFFLGNBSEQ7QUFJUEMsSUFBQUEsTUFBTSxFQUFFO0FBSkQsR0FETztBQU9oQkMsRUFBQUEsTUFBTSxFQUFFO0FBQ05DLElBQUFBLElBQUksRUFBRSxZQURBO0FBRU5DLElBQUFBLFFBQVEsRUFBRSxnQkFGSjtBQUdOQyxJQUFBQSxLQUFLLEVBQUUsYUFIRDtBQUlOQyxJQUFBQSxRQUFRLEVBQUUsWUFKSjtBQUtOQyxJQUFBQSxJQUFJLEVBQUUsWUFMQTtBQU1OQyxJQUFBQSxJQUFJLEVBQUUsWUFOQTtBQU9OQyxJQUFBQSxHQUFHLEVBQUUsV0FQQztBQVFOLGdCQUFZLFlBUk47QUFTTlYsSUFBQUEsS0FBSyxFQUFF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LElBQWdCakUsTUFBTSxDQUFDaUUsS0FBUCxDQUFhdkQsTUFBYixLQUF3QixDQUE1QyxFQUErQztBQUM3QyxXQUFPa1MsdUJBQXVCLENBQUM1UyxNQUFNLENBQUNpRSxLQUFQLENBQWEsQ0FBYixDQUFELENBQTlCO0FBQ0QsR0FuQjZDLENBcUI5QztBQUNBOzs7QUFDQSxNQUFJakUsTUFBTSxDQUFDK0osS0FBWCxFQUFrQjtBQUNoQixXQUFPL0osTUFBTSxDQUFDK0osS0FBUCxDQUFhOEksSUFBYixDQUFrQkQsdUJBQWxCLENBQVA7QUFDRDs7QUFFRCxTQUFPLEtBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgUmVhY3RJcyBmcm9tIFwicmVhY3QtaXNcIjtcclxuaW1wb3J0IG1lcmdlQWxsT2YgZnJvbSBcImpzb24tc2NoZW1hLW1lcmdlLWFsbG9mXCI7XHJcbmltcG9ydCBmaWxsIGZyb20gXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvYXJyYXkvZmlsbFwiO1xyXG5pbXBvcnQgdW5pb24gZnJvbSBcImxvZGFzaC91bmlvblwiO1xyXG5pbXBvcnQganNvbnBvaW50ZXIgZnJvbSBcImpzb25wb2ludGVyXCI7XHJcbmltcG9ydCBmaWVsZHMgZnJvbSBcIi4vY29tcG9uZW50cy9maWVsZHNcIjtcclxuaW1wb3J0IHdpZGdldHMgZnJvbSBcIi4vY29tcG9uZW50cy93aWRnZXRzXCI7XHJcbmltcG9ydCB2YWxpZGF0ZUZvcm1EYXRhLCB7IGlzVmFsaWQgfSBmcm9tIFwiLi92YWxpZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyA9IFwiX19hZGRpdGlvbmFsX3Byb3BlcnR5XCI7XHJcblxyXG5jb25zdCB3aWRnZXRNYXAgPSB7XHJcbiAgYm9vbGVhbjoge1xyXG4gICAgY2hlY2tib3g6IFwiQ2hlY2tib3hXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxuICBzdHJpbmc6IHtcclxuICAgIHRleHQ6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiUGFzc3dvcmRXaWRnZXRcIixcclxuICAgIGVtYWlsOiBcIkVtYWlsV2lkZ2V0XCIsXHJcbiAgICBob3N0bmFtZTogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICBpcHY0OiBcIlRleHRXaWRnZXRcIixcclxuICAgIGlwdjY6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgdXJpOiBcIlVSTFdpZGdldFwiLFxyXG4gICAgXCJkYXRhLXVybFwiOiBcIkZpbGVXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICB0ZXh0YXJlYTogXCJUZXh0YXJlYVdpZGdldFwiLFxyXG4gICAgaGlkZGVuOiBcIkhpZGRlbldpZGdldFwiLFxyXG4gICAgZGF0ZTogXCJEYXRlV2lkZ2V0XCIsXHJcbiAgICBkYXRldGltZTogXCJEYXRlVGltZVdpZGdldFwiLFxyXG4gICAgXCJkYXRlLXRpbWVcIjogXCJEYXRlVGltZVdpZGdldFwiLFxyXG4gICAgXCJhbHQtZGF0ZVwiOiBcIkFsdERhdGVXaWRnZXRcIixcclxuICAgIFwiYWx0LWRhdGV0aW1lXCI6IFwiQWx0RGF0ZVRpbWVXaWRnZXRcIixcclxuICAgIGNvbG9yOiBcIkNvbG9yV2lkZ2V0XCIsXHJcbiAgICBmaWxlOiBcIkZpbGVXaWRnZXRcIixcclxuICB9LFxyXG4gIG51bWJlcjoge1xyXG4gICAgdGV4dDogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICB1cGRvd246IFwiVXBEb3duV2lkZ2V0XCIsXHJcbiAgICByYW5nZTogXCJSYW5nZVdpZGdldFwiLFxyXG4gICAgcmFkaW86IFwiUmFkaW9XaWRnZXRcIixcclxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcclxuICB9LFxyXG4gIGludGVnZXI6IHtcclxuICAgIHRleHQ6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxyXG4gICAgdXBkb3duOiBcIlVwRG93bldpZGdldFwiLFxyXG4gICAgcmFuZ2U6IFwiUmFuZ2VXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxuICBhcnJheToge1xyXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxyXG4gICAgY2hlY2tib3hlczogXCJDaGVja2JveGVzV2lkZ2V0XCIsXHJcbiAgICBmaWxlczogXCJGaWxlV2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW5FeHBhbmQoc2NoZW1hLCB1aVNjaGVtYSwgZm9ybURhdGEpIHtcclxuICBpZiAoIXNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjb25zdCB7IGV4cGFuZGFibGUgfSA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgaWYgKGV4cGFuZGFibGUgPT09IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gZXhwYW5kYWJsZTtcclxuICB9XHJcbiAgLy8gaWYgdWk6b3B0aW9ucy5leHBhbmRhYmxlIHdhcyBub3QgZXhwbGljaXRseSBzZXQgdG8gZmFsc2UsIHdlIGNhbiBhZGRcclxuICAvLyBhbm90aGVyIHByb3BlcnR5IGlmIHdlIGhhdmUgbm90IGV4Y2VlZGVkIG1heFByb3BlcnRpZXMgeWV0XHJcbiAgaWYgKHNjaGVtYS5tYXhQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3JtRGF0YSkubGVuZ3RoIDwgc2NoZW1hLm1heFByb3BlcnRpZXM7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWVsZHMsXHJcbiAgICB3aWRnZXRzLFxyXG4gICAgZGVmaW5pdGlvbnM6IHt9LFxyXG4gICAgcm9vdFNjaGVtYToge30sXHJcbiAgICBmb3JtQ29udGV4dDoge30sXHJcbiAgfTtcclxufVxyXG5cclxuLyogR2V0cyB0aGUgdHlwZSBvZiBhIGdpdmVuIHNjaGVtYS4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjaGVtYVR5cGUoc2NoZW1hKSB7XHJcbiAgbGV0IHsgdHlwZSB9ID0gc2NoZW1hO1xyXG5cclxuICBpZiAoIXR5cGUgJiYgc2NoZW1hLmNvbnN0KSB7XHJcbiAgICByZXR1cm4gZ3Vlc3NUeXBlKHNjaGVtYS5jb25zdCk7XHJcbiAgfVxyXG5cclxuICBpZiAoIXR5cGUgJiYgc2NoZW1hLmVudW0pIHtcclxuICAgIHJldHVybiBcInN0cmluZ1wiO1xyXG4gIH1cclxuXHJcbiAgaWYgKCF0eXBlICYmIChzY2hlbWEucHJvcGVydGllcyB8fCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7XHJcbiAgICByZXR1cm4gXCJvYmplY3RcIjtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlIGluc3RhbmNlb2YgQXJyYXkgJiYgdHlwZS5sZW5ndGggPT09IDIgJiYgdHlwZS5pbmNsdWRlcyhcIm51bGxcIikpIHtcclxuICAgIHJldHVybiB0eXBlLmZpbmQodHlwZSA9PiB0eXBlICE9PSBcIm51bGxcIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMgPSB7fSkge1xyXG4gIGNvbnN0IHR5cGUgPSBnZXRTY2hlbWFUeXBlKHNjaGVtYSk7XHJcblxyXG4gIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhXaWRnZXQpIHtcclxuICAgIC8vIGNhY2hlIHJldHVybiB2YWx1ZSBhcyBwcm9wZXJ0eSBvZiB3aWRnZXQgZm9yIHByb3BlciByZWFjdCByZWNvbmNpbGlhdGlvblxyXG4gICAgaWYgKCFXaWRnZXQuTWVyZ2VkV2lkZ2V0KSB7XHJcbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID1cclxuICAgICAgICAoV2lkZ2V0LmRlZmF1bHRQcm9wcyAmJiBXaWRnZXQuZGVmYXVsdFByb3BzLm9wdGlvbnMpIHx8IHt9O1xyXG4gICAgICBXaWRnZXQuTWVyZ2VkV2lkZ2V0ID0gKHsgb3B0aW9ucyA9IHt9LCAuLi5wcm9wcyB9KSA9PiAoXHJcbiAgICAgICAgPFdpZGdldCBvcHRpb25zPXt7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH19IHsuLi5wcm9wc30gLz5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBXaWRnZXQuTWVyZ2VkV2lkZ2V0O1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgdHlwZW9mIHdpZGdldCA9PT0gXCJmdW5jdGlvblwiIHx8XHJcbiAgICBSZWFjdElzLmlzRm9yd2FyZFJlZihSZWFjdC5jcmVhdGVFbGVtZW50KHdpZGdldCkpIHx8XHJcbiAgICBSZWFjdElzLmlzTWVtbyh3aWRnZXQpXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbWVyZ2VPcHRpb25zKHdpZGdldCk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHdpZGdldCAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCB3aWRnZXQgZGVmaW5pdGlvbjogJHt0eXBlb2Ygd2lkZ2V0fWApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHJlZ2lzdGVyZWRXaWRnZXRzLmhhc093blByb3BlcnR5KHdpZGdldCkpIHtcclxuICAgIGNvbnN0IHJlZ2lzdGVyZWRXaWRnZXQgPSByZWdpc3RlcmVkV2lkZ2V0c1t3aWRnZXRdO1xyXG4gICAgcmV0dXJuIGdldFdpZGdldChzY2hlbWEsIHJlZ2lzdGVyZWRXaWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcclxuICB9XHJcblxyXG4gIGlmICghd2lkZ2V0TWFwLmhhc093blByb3BlcnR5KHR5cGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHdpZGdldCBmb3IgdHlwZSBcIiR7dHlwZX1cImApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHdpZGdldE1hcFt0eXBlXS5oYXNPd25Qcm9wZXJ0eSh3aWRnZXQpKSB7XHJcbiAgICBjb25zdCByZWdpc3RlcmVkV2lkZ2V0ID0gcmVnaXN0ZXJlZFdpZGdldHNbd2lkZ2V0TWFwW3R5cGVdW3dpZGdldF1dO1xyXG4gICAgcmV0dXJuIGdldFdpZGdldChzY2hlbWEsIHJlZ2lzdGVyZWRXaWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcihgTm8gd2lkZ2V0IFwiJHt3aWRnZXR9XCIgZm9yIHR5cGUgXCIke3R5cGV9XCJgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1dpZGdldChzY2hlbWEsIHdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMgPSB7fSkge1xyXG4gIHRyeSB7XHJcbiAgICBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGlmIChcclxuICAgICAgZS5tZXNzYWdlICYmXHJcbiAgICAgIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIk5vIHdpZGdldFwiKSB8fFxyXG4gICAgICAgIGUubWVzc2FnZS5zdGFydHNXaXRoKFwiVW5zdXBwb3J0ZWQgd2lkZ2V0XCIpKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlRGVmYXVsdHMoXHJcbiAgX3NjaGVtYSxcclxuICBwYXJlbnREZWZhdWx0cyxcclxuICByb290U2NoZW1hLFxyXG4gIHJhd0Zvcm1EYXRhID0ge30sXHJcbiAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyA9IGZhbHNlXHJcbikge1xyXG4gIGxldCBzY2hlbWEgPSBpc09iamVjdChfc2NoZW1hKSA/IF9zY2hlbWEgOiB7fTtcclxuICBjb25zdCBmb3JtRGF0YSA9IGlzT2JqZWN0KHJhd0Zvcm1EYXRhKSA/IHJhd0Zvcm1EYXRhIDoge307XHJcbiAgLy8gQ29tcHV0ZSB0aGUgZGVmYXVsdHMgcmVjdXJzaXZlbHk6IGdpdmUgaGlnaGVzdCBwcmlvcml0eSB0byBkZWVwZXN0IG5vZGVzLlxyXG4gIGxldCBkZWZhdWx0cyA9IHBhcmVudERlZmF1bHRzO1xyXG4gIGlmIChpc09iamVjdChkZWZhdWx0cykgJiYgaXNPYmplY3Qoc2NoZW1hLmRlZmF1bHQpKSB7XHJcbiAgICAvLyBGb3Igb2JqZWN0IGRlZmF1bHRzLCBvbmx5IG92ZXJyaWRlIHBhcmVudCBkZWZhdWx0cyB0aGF0IGFyZSBkZWZpbmVkIGluXHJcbiAgICAvLyBzY2hlbWEuZGVmYXVsdC5cclxuICAgIGRlZmF1bHRzID0gbWVyZ2VPYmplY3RzKGRlZmF1bHRzLCBzY2hlbWEuZGVmYXVsdCk7XHJcbiAgfSBlbHNlIGlmIChcImRlZmF1bHRcIiBpbiBzY2hlbWEpIHtcclxuICAgIC8vIFVzZSBzY2hlbWEgZGVmYXVsdHMgZm9yIHRoaXMgbm9kZS5cclxuICAgIGRlZmF1bHRzID0gc2NoZW1hLmRlZmF1bHQ7XHJcbiAgfSBlbHNlIGlmIChcIiRyZWZcIiBpbiBzY2hlbWEpIHtcclxuICAgIC8vIFVzZSByZWZlcmVuY2VkIHNjaGVtYSBkZWZhdWx0cyBmb3IgdGhpcyBub2RlLlxyXG4gICAgY29uc3QgcmVmU2NoZW1hID0gZmluZFNjaGVtYURlZmluaXRpb24oc2NoZW1hLiRyZWYsIHJvb3RTY2hlbWEpO1xyXG4gICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgcmVmU2NoZW1hLFxyXG4gICAgICBkZWZhdWx0cyxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSkge1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgIGRlZmF1bHRzLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKGlzRml4ZWRJdGVtcyhzY2hlbWEpKSB7XHJcbiAgICBkZWZhdWx0cyA9IHNjaGVtYS5pdGVtcy5tYXAoKGl0ZW1TY2hlbWEsIGlkeCkgPT5cclxuICAgICAgY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICAgIGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgQXJyYXkuaXNBcnJheShwYXJlbnREZWZhdWx0cykgPyBwYXJlbnREZWZhdWx0c1tpZHhdIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGEsXHJcbiAgICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAoXCJvbmVPZlwiIGluIHNjaGVtYSkge1xyXG4gICAgc2NoZW1hID1cclxuICAgICAgc2NoZW1hLm9uZU9mW2dldE1hdGNoaW5nT3B0aW9uKHVuZGVmaW5lZCwgc2NoZW1hLm9uZU9mLCByb290U2NoZW1hKV07XHJcbiAgfSBlbHNlIGlmIChcImFueU9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBzY2hlbWEgPVxyXG4gICAgICBzY2hlbWEuYW55T2ZbZ2V0TWF0Y2hpbmdPcHRpb24odW5kZWZpbmVkLCBzY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXTtcclxuICB9XHJcblxyXG4gIC8vIE5vdCBkZWZhdWx0cyBkZWZpbmVkIGZvciB0aGlzIG5vZGUsIGZhbGxiYWNrIHRvIGdlbmVyaWMgdHlwZWQgb25lcy5cclxuICBpZiAodHlwZW9mIGRlZmF1bHRzID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBkZWZhdWx0cyA9IHNjaGVtYS5kZWZhdWx0O1xyXG4gIH1cclxuXHJcbiAgc3dpdGNoIChnZXRTY2hlbWFUeXBlKHNjaGVtYSkpIHtcclxuICAgIC8vIFdlIG5lZWQgdG8gcmVjdXIgZm9yIG9iamVjdCBzY2hlbWEgaW5uZXIgZGVmYXVsdCB2YWx1ZXMuXHJcbiAgICBjYXNlIFwib2JqZWN0XCI6XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcyB8fCB7fSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIGRlZmF1bHRzIGZvciB0aGlzIG5vZGUsIHdpdGggdGhlIHBhcmVudCBkZWZhdWx0cyB3ZSBtaWdodFxyXG4gICAgICAgIC8vIGhhdmUgZnJvbSBhIHByZXZpb3VzIHJ1bjogZGVmYXVsdHNba2V5XS5cclxuICAgICAgICBsZXQgY29tcHV0ZWREZWZhdWx0ID0gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNba2V5XSxcclxuICAgICAgICAgIChkZWZhdWx0cyB8fCB7fSlba2V5XSxcclxuICAgICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgICAoZm9ybURhdGEgfHwge30pW2tleV0sXHJcbiAgICAgICAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyB8fCBjb21wdXRlZERlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgYWNjW2tleV0gPSBjb21wdXRlZERlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgIH0sIHt9KTtcclxuXHJcbiAgICBjYXNlIFwiYXJyYXlcIjpcclxuICAgICAgLy8gSW5qZWN0IGRlZmF1bHRzIGludG8gZXhpc3RpbmcgYXJyYXkgZGVmYXVsdHNcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdHMpKSB7XHJcbiAgICAgICAgZGVmYXVsdHMgPSBkZWZhdWx0cy5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgICAgICAgc2NoZW1hLml0ZW1zW2lkeF0gfHwgc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyB8fCB7fSxcclxuICAgICAgICAgICAgaXRlbSxcclxuICAgICAgICAgICAgcm9vdFNjaGVtYVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRGVlcGx5IGluamVjdCBkZWZhdWx0cyBpbnRvIGFscmVhZHkgZXhpc3RpbmcgZm9ybSBkYXRhXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhd0Zvcm1EYXRhKSkge1xyXG4gICAgICAgIGRlZmF1bHRzID0gcmF3Rm9ybURhdGEubWFwKChpdGVtLCBpZHgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXHJcbiAgICAgICAgICAgIHNjaGVtYS5pdGVtcyxcclxuICAgICAgICAgICAgKGRlZmF1bHRzIHx8IHt9KVtpZHhdLFxyXG4gICAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgICBpdGVtXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzY2hlbWEubWluSXRlbXMpIHtcclxuICAgICAgICBpZiAoIWlzTXVsdGlTZWxlY3Qoc2NoZW1hLCByb290U2NoZW1hKSkge1xyXG4gICAgICAgICAgY29uc3QgZGVmYXVsdHNMZW5ndGggPSBkZWZhdWx0cyA/IGRlZmF1bHRzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgICBpZiAoc2NoZW1hLm1pbkl0ZW1zID4gZGVmYXVsdHNMZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVudHJpZXMgPSBkZWZhdWx0cyB8fCBbXTtcclxuICAgICAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGFycmF5IHdpdGggdGhlIGRlZmF1bHRzXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGxlclNjaGVtYSA9IEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKVxyXG4gICAgICAgICAgICAgID8gc2NoZW1hLmFkZGl0aW9uYWxJdGVtc1xyXG4gICAgICAgICAgICAgIDogc2NoZW1hLml0ZW1zO1xyXG4gICAgICAgICAgICBjb25zdCBmaWxsZXJFbnRyaWVzID0gZmlsbChcclxuICAgICAgICAgICAgICBuZXcgQXJyYXkoc2NoZW1hLm1pbkl0ZW1zIC0gZGVmYXVsdHNMZW5ndGgpLFxyXG4gICAgICAgICAgICAgIGNvbXB1dGVEZWZhdWx0cyhmaWxsZXJTY2hlbWEsIGZpbGxlclNjaGVtYS5kZWZhdWx0cywgcm9vdFNjaGVtYSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy8gdGhlbiBmaWxsIHVwIHRoZSByZXN0IHdpdGggZWl0aGVyIHRoZSBpdGVtIGRlZmF1bHQgb3IgZW1wdHksIHVwIHRvIG1pbkl0ZW1zXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdEVudHJpZXMuY29uY2F0KGZpbGxlckVudHJpZXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gZGVmYXVsdHMgPyBkZWZhdWx0cyA6IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuICByZXR1cm4gZGVmYXVsdHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0Rm9ybVN0YXRlKFxyXG4gIF9zY2hlbWEsXHJcbiAgZm9ybURhdGEsXHJcbiAgcm9vdFNjaGVtYSA9IHt9LFxyXG4gIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXMgPSBmYWxzZVxyXG4pIHtcclxuICBpZiAoIWlzT2JqZWN0KF9zY2hlbWEpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNjaGVtYTogXCIgKyBfc2NoZW1hKTtcclxuICB9XHJcbiAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIGNvbnN0IGRlZmF1bHRzID0gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgc2NoZW1hLFxyXG4gICAgX3NjaGVtYS5kZWZhdWx0LFxyXG4gICAgcm9vdFNjaGVtYSxcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICk7XHJcbiAgaWYgKHR5cGVvZiBmb3JtRGF0YSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgLy8gTm8gZm9ybSBkYXRhPyBVc2Ugc2NoZW1hIGRlZmF1bHRzLlxyXG4gICAgcmV0dXJuIGRlZmF1bHRzO1xyXG4gIH1cclxuICBpZiAoaXNPYmplY3QoZm9ybURhdGEpIHx8IEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICByZXR1cm4gbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YShkZWZhdWx0cywgZm9ybURhdGEpO1xyXG4gIH1cclxuICBpZiAoZm9ybURhdGEgPT09IDAgfHwgZm9ybURhdGEgPT09IGZhbHNlIHx8IGZvcm1EYXRhID09PSBcIlwiKSB7XHJcbiAgICByZXR1cm4gZm9ybURhdGE7XHJcbiAgfVxyXG4gIHJldHVybiBmb3JtRGF0YSB8fCBkZWZhdWx0cztcclxufVxyXG5cclxuLyoqXHJcbiAqIFdoZW4gbWVyZ2luZyBkZWZhdWx0cyBhbmQgZm9ybSBkYXRhLCB3ZSB3YW50IHRvIG1lcmdlIGluIHRoaXMgc3BlY2lmaWMgd2F5OlxyXG4gKiAtIG9iamVjdHMgYXJlIGRlZXBseSBtZXJnZWRcclxuICogLSBhcnJheXMgYXJlIG1lcmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQ6XHJcbiAqICAgLSB3aGVuIHRoZSBhcnJheSBpcyBzZXQgaW4gZm9ybSBkYXRhLCBvbmx5IGFycmF5IGVudHJpZXMgc2V0IGluIGZvcm0gZGF0YVxyXG4gKiAgICAgYXJlIGRlZXBseSBtZXJnZWQ7IGFkZGl0aW9uYWwgZW50cmllcyBmcm9tIHRoZSBkZWZhdWx0cyBhcmUgaWdub3JlZFxyXG4gKiAgIC0gd2hlbiB0aGUgYXJyYXkgaXMgbm90IHNldCBpbiBmb3JtIGRhdGEsIHRoZSBkZWZhdWx0IGlzIGNvcGllZCBvdmVyXHJcbiAqIC0gc2NhbGFycyBhcmUgb3ZlcndyaXR0ZW4vc2V0IGJ5IGZvcm0gZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHMsIGZvcm1EYXRhKSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGVmYXVsdHMpKSB7XHJcbiAgICAgIGRlZmF1bHRzID0gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybURhdGEubWFwKCh2YWx1ZSwgaWR4KSA9PiB7XHJcbiAgICAgIGlmIChkZWZhdWx0c1tpZHhdKSB7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHNbaWR4XSwgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoZm9ybURhdGEpKSB7XHJcbiAgICBjb25zdCBhY2MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cyk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3JtRGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICBhY2Nba2V5XSA9IG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoXHJcbiAgICAgICAgZGVmYXVsdHMgPyBkZWZhdWx0c1trZXldIDoge30sXHJcbiAgICAgICAgZm9ybURhdGFba2V5XVxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgYWNjKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZvcm1EYXRhO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVpT3B0aW9ucyh1aVNjaGVtYSkge1xyXG4gIC8vIGdldCBhbGwgcGFzc2VkIG9wdGlvbnMgZnJvbSB1aTp3aWRnZXQsIHVpOm9wdGlvbnMsIGFuZCB1aTo8b3B0aW9uTmFtZT5cclxuICByZXR1cm4gT2JqZWN0LmtleXModWlTY2hlbWEpXHJcbiAgICAuZmlsdGVyKGtleSA9PiBrZXkuaW5kZXhPZihcInVpOlwiKSA9PT0gMClcclxuICAgIC5yZWR1Y2UoKG9wdGlvbnMsIGtleSkgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHVpU2NoZW1hW2tleV07XHJcbiAgICAgIGlmIChrZXkgPT09IFwidWk6d2lkZ2V0XCIgJiYgaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgXCJTZXR0aW5nIG9wdGlvbnMgdmlhIHVpOndpZGdldCBvYmplY3QgaXMgZGVwcmVjYXRlZCwgdXNlIHVpOm9wdGlvbnMgaW5zdGVhZFwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICAgIC4uLih2YWx1ZS5vcHRpb25zIHx8IHt9KSxcclxuICAgICAgICAgIHdpZGdldDogdmFsdWUuY29tcG9uZW50LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGtleSA9PT0gXCJ1aTpvcHRpb25zXCIgJiYgaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4ub3B0aW9ucywgLi4udmFsdWUgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyAuLi5vcHRpb25zLCBba2V5LnN1YnN0cmluZygzKV06IHZhbHVlIH07XHJcbiAgICB9LCB7fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5TGFiZWwoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSkge1xyXG4gIGNvbnN0IHVpT3B0aW9ucyA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgbGV0IHsgbGFiZWw6IGRpc3BsYXlMYWJlbCA9IHRydWUgfSA9IHVpT3B0aW9ucztcclxuICBjb25zdCBzY2hlbWFUeXBlID0gZ2V0U2NoZW1hVHlwZShzY2hlbWEpO1xyXG5cclxuICBpZiAoc2NoZW1hVHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPVxyXG4gICAgICBpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSkgfHxcclxuICAgICAgaXNGaWxlc0FycmF5KHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEpIHx8XHJcbiAgICAgIGlzQ3VzdG9tV2lkZ2V0KHVpU2NoZW1hKTtcclxuICB9XHJcblxyXG4gIGlmIChzY2hlbWFUeXBlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPSBmYWxzZTtcclxuICB9XHJcbiAgaWYgKHNjaGVtYVR5cGUgPT09IFwiYm9vbGVhblwiICYmICF1aVNjaGVtYVtcInVpOndpZGdldFwiXSkge1xyXG4gICAgZGlzcGxheUxhYmVsID0gZmFsc2U7XHJcbiAgfVxyXG4gIGlmICh1aVNjaGVtYVtcInVpOmZpZWxkXCJdKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPSBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIGRpc3BsYXlMYWJlbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHRoaW5nKSB7XHJcbiAgaWYgKHR5cGVvZiBGaWxlICE9PSBcInVuZGVmaW5lZFwiICYmIHRoaW5nIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSBcIm9iamVjdFwiICYmIHRoaW5nICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHRoaW5nKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT2JqZWN0cyhvYmoxLCBvYmoyLCBjb25jYXRBcnJheXMgPSBmYWxzZSkge1xyXG4gIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIGRlZXBseSBuZXN0ZWQgb2JqZWN0cy5cclxuICB2YXIgYWNjID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqMSk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cclxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqMikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgY29uc3QgbGVmdCA9IG9iajEgPyBvYmoxW2tleV0gOiB7fSxcclxuICAgICAgcmlnaHQgPSBvYmoyW2tleV07XHJcbiAgICBpZiAob2JqMSAmJiBvYmoxLmhhc093blByb3BlcnR5KGtleSkgJiYgaXNPYmplY3QocmlnaHQpKSB7XHJcbiAgICAgIGFjY1trZXldID0gbWVyZ2VPYmplY3RzKGxlZnQsIHJpZ2h0LCBjb25jYXRBcnJheXMpO1xyXG4gICAgfSBlbHNlIGlmIChjb25jYXRBcnJheXMgJiYgQXJyYXkuaXNBcnJheShsZWZ0KSAmJiBBcnJheS5pc0FycmF5KHJpZ2h0KSkge1xyXG4gICAgICBhY2Nba2V5XSA9IGxlZnQuY29uY2F0KHJpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFjY1trZXldID0gcmlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIGFjYyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhc051bWJlcih2YWx1ZSkge1xyXG4gIGlmICh2YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgaWYgKC9cXC4kLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgLy8gXCIzLlwiIGNhbid0IHJlYWxseSBiZSBjb25zaWRlcmVkIGEgbnVtYmVyIGV2ZW4gaWYgaXQgcGFyc2VzIGluIGpzLiBUaGVcclxuICAgIC8vIHVzZXIgaXMgbW9zdCBsaWtlbHkgZW50ZXJpbmcgYSBmbG9hdC5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgaWYgKC9cXC4wJC8udGVzdCh2YWx1ZSkpIHtcclxuICAgIC8vIHdlIG5lZWQgdG8gcmV0dXJuIHRoaXMgYXMgYSBzdHJpbmcgaGVyZSwgdG8gYWxsb3cgZm9yIGlucHV0IGxpa2UgMy4wN1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICBjb25zdCBuID0gTnVtYmVyKHZhbHVlKTtcclxuICBjb25zdCB2YWxpZCA9IHR5cGVvZiBuID09PSBcIm51bWJlclwiICYmICFOdW1iZXIuaXNOYU4obik7XHJcblxyXG4gIGlmICgvXFwuXFxkKjAkLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgLy8gSXQncyBhIG51bWJlciwgdGhhdCdzIGNvb2wgLSBidXQgd2UgbmVlZCBpdCBhcyBhIHN0cmluZyBzbyBpdCBkb2Vzbid0IHNjcmV3XHJcbiAgICAvLyB3aXRoIHRoZSB1c2VyIHdoZW4gZW50ZXJpbmcgZG9sbGFyIGFtb3VudHMgb3Igb3RoZXIgdmFsdWVzIChzdWNoIGFzIHRob3NlIHdpdGhcclxuICAgIC8vIHNwZWNpZmljIHByZWNpc2lvbiBvciBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzKVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbGlkID8gbiA6IHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIG9yZGVyKSB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KG9yZGVyKSkge1xyXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhcnJheVRvSGFzaCA9IGFyciA9PlxyXG4gICAgYXJyLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xyXG4gICAgICBwcmV2W2N1cnJdID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICB9LCB7fSk7XHJcbiAgY29uc3QgZXJyb3JQcm9wTGlzdCA9IGFyciA9PlxyXG4gICAgYXJyLmxlbmd0aCA+IDFcclxuICAgICAgPyBgcHJvcGVydGllcyAnJHthcnIuam9pbihcIicsICdcIil9J2BcclxuICAgICAgOiBgcHJvcGVydHkgJyR7YXJyWzBdfSdgO1xyXG4gIGNvbnN0IHByb3BlcnR5SGFzaCA9IGFycmF5VG9IYXNoKHByb3BlcnRpZXMpO1xyXG4gIGNvbnN0IG9yZGVyRmlsdGVyZWQgPSBvcmRlci5maWx0ZXIoXHJcbiAgICBwcm9wID0+IHByb3AgPT09IFwiKlwiIHx8IHByb3BlcnR5SGFzaFtwcm9wXVxyXG4gICk7XHJcbiAgY29uc3Qgb3JkZXJIYXNoID0gYXJyYXlUb0hhc2gob3JkZXJGaWx0ZXJlZCk7XHJcblxyXG4gIGNvbnN0IHJlc3QgPSBwcm9wZXJ0aWVzLmZpbHRlcihwcm9wID0+ICFvcmRlckhhc2hbcHJvcF0pO1xyXG4gIGNvbnN0IHJlc3RJbmRleCA9IG9yZGVyRmlsdGVyZWQuaW5kZXhPZihcIipcIik7XHJcbiAgaWYgKHJlc3RJbmRleCA9PT0gLTEpIHtcclxuICAgIGlmIChyZXN0Lmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYHVpU2NoZW1hIG9yZGVyIGxpc3QgZG9lcyBub3QgY29udGFpbiAke2Vycm9yUHJvcExpc3QocmVzdCl9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9yZGVyRmlsdGVyZWQ7XHJcbiAgfVxyXG4gIGlmIChyZXN0SW5kZXggIT09IG9yZGVyRmlsdGVyZWQubGFzdEluZGV4T2YoXCIqXCIpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1aVNjaGVtYSBvcmRlciBsaXN0IGNvbnRhaW5zIG1vcmUgdGhhbiBvbmUgd2lsZGNhcmQgaXRlbVwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBsZXRlID0gWy4uLm9yZGVyRmlsdGVyZWRdO1xyXG4gIGNvbXBsZXRlLnNwbGljZShyZXN0SW5kZXgsIDEsIC4uLnJlc3QpO1xyXG4gIHJldHVybiBjb21wbGV0ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSBnaXZlbiBzY2hlbWEgbWF0Y2hlcyBhIHNpbmdsZVxyXG4gKiBjb25zdGFudCB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnN0YW50KHNjaGVtYSkge1xyXG4gIHJldHVybiAoXHJcbiAgICAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkgJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSB8fFxyXG4gICAgc2NoZW1hLmhhc093blByb3BlcnR5KFwiY29uc3RcIilcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9Db25zdGFudChzY2hlbWEpIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkgJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmVudW1bMF07XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJjb25zdFwiKSkge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5jb25zdDtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwic2NoZW1hIGNhbm5vdCBiZSBpbmZlcnJlZCBhcyBhIGNvbnN0YW50XCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VsZWN0KF9zY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSkge1xyXG4gIGNvbnN0IHNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKF9zY2hlbWEsIHJvb3RTY2hlbWEpO1xyXG4gIGNvbnN0IGFsdFNjaGVtYXMgPSBzY2hlbWEub25lT2YgfHwgc2NoZW1hLmFueU9mO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFsdFNjaGVtYXMpKSB7XHJcbiAgICByZXR1cm4gYWx0U2NoZW1hcy5ldmVyeShhbHRTY2hlbWFzID0+IGlzQ29uc3RhbnQoYWx0U2NoZW1hcykpO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSA9IHt9KSB7XHJcbiAgaWYgKCFzY2hlbWEudW5pcXVlSXRlbXMgfHwgIXNjaGVtYS5pdGVtcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gaXNTZWxlY3Qoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRmlsZXNBcnJheShzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hID0ge30pIHtcclxuICBpZiAodWlTY2hlbWFbXCJ1aTp3aWRnZXRcIl0gPT09IFwiZmlsZXNcIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaXRlbXMpIHtcclxuICAgIGNvbnN0IGl0ZW1zU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcclxuICAgIHJldHVybiBpdGVtc1NjaGVtYS50eXBlID09PSBcInN0cmluZ1wiICYmIGl0ZW1zU2NoZW1hLmZvcm1hdCA9PT0gXCJkYXRhLXVybFwiO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ZpeGVkSXRlbXMoc2NoZW1hKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSAmJlxyXG4gICAgc2NoZW1hLml0ZW1zLmxlbmd0aCA+IDAgJiZcclxuICAgIHNjaGVtYS5pdGVtcy5ldmVyeShpdGVtID0+IGlzT2JqZWN0KGl0ZW0pKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0N1c3RvbVdpZGdldCh1aVNjaGVtYSkge1xyXG4gIHJldHVybiAoXHJcbiAgICAvLyBUT0RPOiBSZW1vdmUgdGhlIGAmJiB1aVNjaGVtYVtcInVpOndpZGdldFwiXSAhPT0gXCJoaWRkZW5cImAgb25jZSB3ZSBzdXBwb3J0IGhpZGRlbiB3aWRnZXRzIGZvciBhcnJheXMuXHJcbiAgICAvLyBodHRwczovL3JlYWN0LWpzb25zY2hlbWEtZm9ybS5yZWFkdGhlZG9jcy5pby9lbi9sYXRlc3QvdXNhZ2Uvd2lkZ2V0cy8jaGlkZGVuLXdpZGdldHNcclxuICAgIFwid2lkZ2V0XCIgaW4gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKSAmJlxyXG4gICAgZ2V0VWlPcHRpb25zKHVpU2NoZW1hKVtcIndpZGdldFwiXSAhPT0gXCJoaWRkZW5cIlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGxvd0FkZGl0aW9uYWxJdGVtcyhzY2hlbWEpIHtcclxuICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyA9PT0gdHJ1ZSkge1xyXG4gICAgY29uc29sZS53YXJuKFwiYWRkaXRpb25hbEl0ZW1zPXRydWUgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgfVxyXG4gIHJldHVybiBpc09iamVjdChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbnNMaXN0KHNjaGVtYSkge1xyXG4gIGlmIChzY2hlbWEuZW51bSkge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5lbnVtLm1hcCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgY29uc3QgbGFiZWwgPSAoc2NoZW1hLmVudW1OYW1lcyAmJiBzY2hlbWEuZW51bU5hbWVzW2ldKSB8fCBTdHJpbmcodmFsdWUpO1xyXG4gICAgICByZXR1cm4geyBsYWJlbCwgdmFsdWUgfTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBhbHRTY2hlbWFzID0gc2NoZW1hLm9uZU9mIHx8IHNjaGVtYS5hbnlPZjtcclxuICAgIHJldHVybiBhbHRTY2hlbWFzLm1hcChzY2hlbWEgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHRvQ29uc3RhbnQoc2NoZW1hKTtcclxuICAgICAgY29uc3QgbGFiZWwgPSBzY2hlbWEudGl0bGUgfHwgU3RyaW5nKHZhbHVlKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzY2hlbWEsXHJcbiAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kU2NoZW1hRGVmaW5pdGlvbigkcmVmLCByb290U2NoZW1hID0ge30pIHtcclxuICBjb25zdCBvcmlnUmVmID0gJHJlZjtcclxuICBpZiAoJHJlZi5zdGFydHNXaXRoKFwiI1wiKSkge1xyXG4gICAgLy8gRGVjb2RlIFVSSSBmcmFnbWVudCByZXByZXNlbnRhdGlvbi5cclxuICAgICRyZWYgPSBkZWNvZGVVUklDb21wb25lbnQoJHJlZi5zdWJzdHJpbmcoMSkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgZGVmaW5pdGlvbiBmb3IgJHtvcmlnUmVmfS5gKTtcclxuICB9XHJcbiAgY29uc3QgY3VycmVudCA9IGpzb25wb2ludGVyLmdldChyb290U2NoZW1hLCAkcmVmKTtcclxuICBpZiAoY3VycmVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgZGVmaW5pdGlvbiBmb3IgJHtvcmlnUmVmfS5gKTtcclxuICB9XHJcbiAgaWYgKGN1cnJlbnQuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XHJcbiAgICByZXR1cm4gZmluZFNjaGVtYURlZmluaXRpb24oY3VycmVudC4kcmVmLCByb290U2NoZW1hKTtcclxuICB9XHJcbiAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcbi8vIEluIHRoZSBjYXNlIHdoZXJlIHdlIGhhdmUgdG8gaW1wbGljaXRseSBjcmVhdGUgYSBzY2hlbWEsIGl0IGlzIHVzZWZ1bCB0byBrbm93IHdoYXQgdHlwZSB0byB1c2VcclxuLy8gIGJhc2VkIG9uIHRoZSBkYXRhIHdlIGFyZSBkZWZpbmluZ1xyXG5leHBvcnQgY29uc3QgZ3Vlc3NUeXBlID0gZnVuY3Rpb24gZ3Vlc3NUeXBlKHZhbHVlKSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICByZXR1cm4gXCJhcnJheVwiO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICByZXR1cm4gXCJzdHJpbmdcIjtcclxuICB9IGVsc2UgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgIHJldHVybiBcIm51bGxcIjtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgIHJldHVybiBcImJvb2xlYW5cIjtcclxuICB9IGVsc2UgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgIHJldHVybiBcIm51bWJlclwiO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gXCJvYmplY3RcIjtcclxuICB9XHJcbiAgLy8gRGVmYXVsdCB0byBzdHJpbmcgaWYgd2UgY2FuJ3QgZmlndXJlIGl0IG91dFxyXG4gIHJldHVybiBcInN0cmluZ1wiO1xyXG59O1xyXG5cclxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGNyZWF0ZSBuZXcgXCJwcm9wZXJ0aWVzXCIgaXRlbXMgZm9yIGVhY2gga2V5IGluIG91ciBmb3JtRGF0YVxyXG5leHBvcnQgZnVuY3Rpb24gc3R1YkV4aXN0aW5nQWRkaXRpb25hbFByb3BlcnRpZXMoXHJcbiAgc2NoZW1hLFxyXG4gIHJvb3RTY2hlbWEgPSB7fSxcclxuICBmb3JtRGF0YSA9IHt9XHJcbikge1xyXG4gIC8vIENsb25lIHRoZSBzY2hlbWEgc28gd2UgZG9uJ3QgcnVpbiB0aGUgY29uc3VtZXIncyBvcmlnaW5hbFxyXG4gIHNjaGVtYSA9IHtcclxuICAgIC4uLnNjaGVtYSxcclxuICAgIHByb3BlcnRpZXM6IHsgLi4uc2NoZW1hLnByb3BlcnRpZXMgfSxcclxuICB9O1xyXG5cclxuICAvLyBtYWtlIHN1cmUgZm9ybURhdGEgaXMgYW4gb2JqZWN0XHJcbiAgZm9ybURhdGEgPSBpc09iamVjdChmb3JtRGF0YSkgPyBmb3JtRGF0YSA6IHt9O1xyXG5cclxuICBPYmplY3Qua2V5cyhmb3JtRGF0YSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgaWYgKHNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgLy8gTm8gbmVlZCB0byBzdHViLCBvdXIgc2NoZW1hIGFscmVhZHkgaGFzIHRoZSBwcm9wZXJ0eVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzO1xyXG4gICAgaWYgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIikpIHtcclxuICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSByZXRyaWV2ZVNjaGVtYShcclxuICAgICAgICB7ICRyZWY6IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllc1tcIiRyZWZcIl0gfSxcclxuICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgIGZvcm1EYXRhXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShcInR5cGVcIikpIHtcclxuICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7IC4uLnNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7IHR5cGU6IGd1ZXNzVHlwZShmb3JtRGF0YVtrZXldKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZSB0eXBlIG9mIG91ciBuZXcga2V5IHNob3VsZCBtYXRjaCB0aGUgYWRkaXRpb25hbFByb3BlcnRpZXMgdmFsdWU7XHJcbiAgICBzY2hlbWEucHJvcGVydGllc1trZXldID0gYWRkaXRpb25hbFByb3BlcnRpZXM7XHJcbiAgICAvLyBTZXQgb3VyIGFkZGl0aW9uYWwgcHJvcGVydHkgZmxhZyBzbyB3ZSBrbm93IGl0IHdhcyBkeW5hbWljYWxseSBhZGRlZFxyXG4gICAgc2NoZW1hLnByb3BlcnRpZXNba2V5XVtBRERJVElPTkFMX1BST1BFUlRZX0ZMQUddID0gdHJ1ZTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHNjaGVtYTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlc29sdmVzIGEgY29uZGl0aW9uYWwgYmxvY2sgKGlmL2Vsc2UvdGhlbikgYnkgcmVtb3ZpbmcgdGhlIGNvbmRpdGlvbiBhbmQgbWVyZ2luZyB0aGUgYXBwcm9wcmlhdGUgY29uZGl0aW9uYWwgYnJhbmNoIHdpdGggdGhlIHJlc3Qgb2YgdGhlIHNjaGVtYVxyXG4gKi9cclxuY29uc3QgcmVzb2x2ZUNvbmRpdGlvbiA9IChzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKSA9PiB7XHJcbiAgbGV0IHtcclxuICAgIGlmOiBleHByZXNzaW9uLFxyXG4gICAgdGhlbixcclxuICAgIGVsc2U6IG90aGVyd2lzZSxcclxuICAgIC4uLnJlc29sdmVkU2NoZW1hTGVzc0NvbmRpdGlvbmFsXHJcbiAgfSA9IHNjaGVtYTtcclxuXHJcbiAgY29uc3QgY29uZGl0aW9uYWxTY2hlbWEgPSBpc1ZhbGlkKGV4cHJlc3Npb24sIGZvcm1EYXRhLCByb290U2NoZW1hKVxyXG4gICAgPyB0aGVuXHJcbiAgICA6IG90aGVyd2lzZTtcclxuXHJcbiAgaWYgKGNvbmRpdGlvbmFsU2NoZW1hKSB7XHJcbiAgICByZXR1cm4gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgIG1lcmdlU2NoZW1hcyhcclxuICAgICAgICByZXNvbHZlZFNjaGVtYUxlc3NDb25kaXRpb25hbCxcclxuICAgICAgICByZXRyaWV2ZVNjaGVtYShjb25kaXRpb25hbFNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICksXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhXHJcbiAgICApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gcmV0cmlldmVTY2hlbWEocmVzb2x2ZWRTY2hlbWFMZXNzQ29uZGl0aW9uYWwsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzb2x2ZXMgcmVmZXJlbmNlcyBhbmQgZGVwZW5kZW5jaWVzIHdpdGhpbiBhIHNjaGVtYSBhbmQgaXRzICdhbGxPZicgY2hpbGRyZW4uXHJcbiAqXHJcbiAqIENhbGxlZCBpbnRlcm5hbGx5IGJ5IHJldHJpZXZlU2NoZW1hLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hID0ge30sIGZvcm1EYXRhID0ge30pIHtcclxuICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiJHJlZlwiKSkge1xyXG4gICAgcmV0dXJuIHJlc29sdmVSZWZlcmVuY2Uoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJkZXBlbmRlbmNpZXNcIikpIHtcclxuICAgIGNvbnN0IHJlc29sdmVkU2NoZW1hID0gcmVzb2x2ZURlcGVuZGVuY2llcyhzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIHJldHVybiByZXRyaWV2ZVNjaGVtYShyZXNvbHZlZFNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIH0gZWxzZSBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiYWxsT2ZcIikpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLnNjaGVtYSxcclxuICAgICAgYWxsT2Y6IHNjaGVtYS5hbGxPZi5tYXAoYWxsT2ZTdWJzY2hlbWEgPT5cclxuICAgICAgICByZXRyaWV2ZVNjaGVtYShhbGxPZlN1YnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICksXHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBObyAkcmVmIG9yIGRlcGVuZGVuY2llcyBhdHRyaWJ1dGUgZm91bmQsIHJldHVybmluZyB0aGUgb3JpZ2luYWwgc2NoZW1hLlxyXG4gICAgcmV0dXJuIHNjaGVtYTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc29sdmVSZWZlcmVuY2Uoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSkge1xyXG4gIC8vIFJldHJpZXZlIHRoZSByZWZlcmVuY2VkIHNjaGVtYSBkZWZpbml0aW9uLlxyXG4gIGNvbnN0ICRyZWZTY2hlbWEgPSBmaW5kU2NoZW1hRGVmaW5pdGlvbihzY2hlbWEuJHJlZiwgcm9vdFNjaGVtYSk7XHJcbiAgLy8gRHJvcCB0aGUgJHJlZiBwcm9wZXJ0eSBvZiB0aGUgc291cmNlIHNjaGVtYS5cclxuICBjb25zdCB7ICRyZWYsIC4uLmxvY2FsU2NoZW1hIH0gPSBzY2hlbWE7XHJcbiAgLy8gVXBkYXRlIHJlZmVyZW5jZWQgc2NoZW1hIGRlZmluaXRpb24gd2l0aCBsb2NhbCBzY2hlbWEgcHJvcGVydGllcy5cclxuICByZXR1cm4gcmV0cmlldmVTY2hlbWEoXHJcbiAgICB7IC4uLiRyZWZTY2hlbWEsIC4uLmxvY2FsU2NoZW1hIH0sXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGFcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hID0ge30sIGZvcm1EYXRhID0ge30pIHtcclxuICBpZiAoIWlzT2JqZWN0KHNjaGVtYSkpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcbiAgbGV0IHJlc29sdmVkU2NoZW1hID0gcmVzb2x2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuXHJcbiAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImlmXCIpKSB7XHJcbiAgICByZXR1cm4gcmVzb2x2ZUNvbmRpdGlvbihzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9XHJcblxyXG4gIGlmIChcImFsbE9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNvbHZlZFNjaGVtYSA9IG1lcmdlQWxsT2Yoe1xyXG4gICAgICAgIC4uLnJlc29sdmVkU2NoZW1hLFxyXG4gICAgICAgIGFsbE9mOiByZXNvbHZlZFNjaGVtYS5hbGxPZixcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcImNvdWxkIG5vdCBtZXJnZSBzdWJzY2hlbWFzIGluIGFsbE9mOlxcblwiICsgZSk7XHJcbiAgICAgIGNvbnN0IHsgYWxsT2YsIC4uLnJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mIH0gPSByZXNvbHZlZFNjaGVtYTtcclxuICAgICAgcmV0dXJuIHJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mO1xyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCBoYXNBZGRpdGlvbmFsUHJvcGVydGllcyA9XHJcbiAgICByZXNvbHZlZFNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpICYmXHJcbiAgICByZXNvbHZlZFNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyAhPT0gZmFsc2U7XHJcbiAgaWYgKGhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XHJcbiAgICByZXR1cm4gc3R1YkV4aXN0aW5nQWRkaXRpb25hbFByb3BlcnRpZXMoXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YVxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc29sdmVkU2NoZW1hO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpIHtcclxuICAvLyBEcm9wIHRoZSBkZXBlbmRlbmNpZXMgZnJvbSB0aGUgc291cmNlIHNjaGVtYS5cclxuICBsZXQgeyBkZXBlbmRlbmNpZXMgPSB7fSwgLi4ucmVzb2x2ZWRTY2hlbWEgfSA9IHNjaGVtYTtcclxuICBpZiAoXCJvbmVPZlwiIGluIHJlc29sdmVkU2NoZW1hKSB7XHJcbiAgICByZXNvbHZlZFNjaGVtYSA9XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLm9uZU9mW1xyXG4gICAgICAgIGdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCByZXNvbHZlZFNjaGVtYS5vbmVPZiwgcm9vdFNjaGVtYSlcclxuICAgICAgXTtcclxuICB9IGVsc2UgaWYgKFwiYW55T2ZcIiBpbiByZXNvbHZlZFNjaGVtYSkge1xyXG4gICAgcmVzb2x2ZWRTY2hlbWEgPVxyXG4gICAgICByZXNvbHZlZFNjaGVtYS5hbnlPZltcclxuICAgICAgICBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgcmVzb2x2ZWRTY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXHJcbiAgICAgIF07XHJcbiAgfVxyXG4gIHJldHVybiBwcm9jZXNzRGVwZW5kZW5jaWVzKFxyXG4gICAgZGVwZW5kZW5jaWVzLFxyXG4gICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGFcclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIHByb2Nlc3NEZXBlbmRlbmNpZXMoXHJcbiAgZGVwZW5kZW5jaWVzLFxyXG4gIHJlc29sdmVkU2NoZW1hLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGFcclxuKSB7XHJcbiAgLy8gUHJvY2VzcyBkZXBlbmRlbmNpZXMgdXBkYXRpbmcgdGhlIGxvY2FsIHNjaGVtYSBwcm9wZXJ0aWVzIGFzIGFwcHJvcHJpYXRlLlxyXG4gIGZvciAoY29uc3QgZGVwZW5kZW5jeUtleSBpbiBkZXBlbmRlbmNpZXMpIHtcclxuICAgIC8vIFNraXAgdGhpcyBkZXBlbmRlbmN5IGlmIGl0cyB0cmlnZ2VyIHByb3BlcnR5IGlzIG5vdCBwcmVzZW50LlxyXG4gICAgaWYgKGZvcm1EYXRhW2RlcGVuZGVuY3lLZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICAvLyBTa2lwIHRoaXMgZGVwZW5kZW5jeSBpZiBpdCBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIHNjaGVtYSAoc3VjaCBhcyB3aGVuIGRlcGVuZGVuY3lLZXkgaXMgaXRzZWxmIGEgaGlkZGVuIGRlcGVuZGVuY3kuKVxyXG4gICAgaWYgKFxyXG4gICAgICByZXNvbHZlZFNjaGVtYS5wcm9wZXJ0aWVzICYmXHJcbiAgICAgICEoZGVwZW5kZW5jeUtleSBpbiByZXNvbHZlZFNjaGVtYS5wcm9wZXJ0aWVzKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3Qge1xyXG4gICAgICBbZGVwZW5kZW5jeUtleV06IGRlcGVuZGVuY3lWYWx1ZSxcclxuICAgICAgLi4ucmVtYWluaW5nRGVwZW5kZW5jaWVzXHJcbiAgICB9ID0gZGVwZW5kZW5jaWVzO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwZW5kZW5jeVZhbHVlKSkge1xyXG4gICAgICByZXNvbHZlZFNjaGVtYSA9IHdpdGhEZXBlbmRlbnRQcm9wZXJ0aWVzKHJlc29sdmVkU2NoZW1hLCBkZXBlbmRlbmN5VmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmIChpc09iamVjdChkZXBlbmRlbmN5VmFsdWUpKSB7XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gd2l0aERlcGVuZGVudFNjaGVtYShcclxuICAgICAgICByZXNvbHZlZFNjaGVtYSxcclxuICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgIGRlcGVuZGVuY3lLZXksXHJcbiAgICAgICAgZGVwZW5kZW5jeVZhbHVlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJvY2Vzc0RlcGVuZGVuY2llcyhcclxuICAgICAgcmVtYWluaW5nRGVwZW5kZW5jaWVzLFxyXG4gICAgICByZXNvbHZlZFNjaGVtYSxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGFcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiByZXNvbHZlZFNjaGVtYTtcclxufVxyXG5cclxuZnVuY3Rpb24gd2l0aERlcGVuZGVudFByb3BlcnRpZXMoc2NoZW1hLCBhZGRpdGlvbmFsbHlSZXF1aXJlZCkge1xyXG4gIGlmICghYWRkaXRpb25hbGx5UmVxdWlyZWQpIHtcclxuICAgIHJldHVybiBzY2hlbWE7XHJcbiAgfVxyXG4gIGNvbnN0IHJlcXVpcmVkID0gQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpXHJcbiAgICA/IEFycmF5LmZyb20obmV3IFNldChbLi4uc2NoZW1hLnJlcXVpcmVkLCAuLi5hZGRpdGlvbmFsbHlSZXF1aXJlZF0pKVxyXG4gICAgOiBhZGRpdGlvbmFsbHlSZXF1aXJlZDtcclxuICByZXR1cm4geyAuLi5zY2hlbWEsIHJlcXVpcmVkOiByZXF1aXJlZCB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aXRoRGVwZW5kZW50U2NoZW1hKFxyXG4gIHNjaGVtYSxcclxuICByb290U2NoZW1hLFxyXG4gIGZvcm1EYXRhLFxyXG4gIGRlcGVuZGVuY3lLZXksXHJcbiAgZGVwZW5kZW5jeVZhbHVlXHJcbikge1xyXG4gIGxldCB7IG9uZU9mLCAuLi5kZXBlbmRlbnRTY2hlbWEgfSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgZGVwZW5kZW5jeVZhbHVlLFxyXG4gICAgcm9vdFNjaGVtYSxcclxuICAgIGZvcm1EYXRhXHJcbiAgKTtcclxuICBzY2hlbWEgPSBtZXJnZVNjaGVtYXMoc2NoZW1hLCBkZXBlbmRlbnRTY2hlbWEpO1xyXG4gIC8vIFNpbmNlIGl0IGRvZXMgbm90IGNvbnRhaW4gb25lT2YsIHdlIHJldHVybiB0aGUgb3JpZ2luYWwgc2NoZW1hLlxyXG4gIGlmIChvbmVPZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hO1xyXG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkob25lT2YpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQ6IGl0IGlzIHNvbWUgJHt0eXBlb2Ygb25lT2Z9IGluc3RlYWQgb2YgYW4gYXJyYXlgKTtcclxuICB9XHJcbiAgLy8gUmVzb2x2ZSAkcmVmcyBpbnNpZGUgb25lT2YuXHJcbiAgY29uc3QgcmVzb2x2ZWRPbmVPZiA9IG9uZU9mLm1hcChzdWJzY2hlbWEgPT5cclxuICAgIHN1YnNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIilcclxuICAgICAgPyByZXNvbHZlUmVmZXJlbmNlKHN1YnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgIDogc3Vic2NoZW1hXHJcbiAgKTtcclxuICByZXR1cm4gd2l0aEV4YWN0bHlPbmVTdWJzY2hlbWEoXHJcbiAgICBzY2hlbWEsXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGEsXHJcbiAgICBkZXBlbmRlbmN5S2V5LFxyXG4gICAgcmVzb2x2ZWRPbmVPZlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdpdGhFeGFjdGx5T25lU3Vic2NoZW1hKFxyXG4gIHNjaGVtYSxcclxuICByb290U2NoZW1hLFxyXG4gIGZvcm1EYXRhLFxyXG4gIGRlcGVuZGVuY3lLZXksXHJcbiAgb25lT2ZcclxuKSB7XHJcbiAgY29uc3QgdmFsaWRTdWJzY2hlbWFzID0gb25lT2YuZmlsdGVyKHN1YnNjaGVtYSA9PiB7XHJcbiAgICBpZiAoIXN1YnNjaGVtYS5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSB9ID0gc3Vic2NoZW1hLnByb3BlcnRpZXM7XHJcbiAgICBpZiAoY29uZGl0aW9uUHJvcGVydHlTY2hlbWEpIHtcclxuICAgICAgY29uc3QgY29uZGl0aW9uU2NoZW1hID0ge1xyXG4gICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCB7IGVycm9ycyB9ID0gdmFsaWRhdGVGb3JtRGF0YShmb3JtRGF0YSwgY29uZGl0aW9uU2NoZW1hKTtcclxuICAgICAgcmV0dXJuIGVycm9ycy5sZW5ndGggPT09IDA7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgaWYgKHZhbGlkU3Vic2NoZW1hcy5sZW5ndGggIT09IDEpIHtcclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgXCJpZ25vcmluZyBvbmVPZiBpbiBkZXBlbmRlbmNpZXMgYmVjYXVzZSB0aGVyZSBpc24ndCBleGFjdGx5IG9uZSBzdWJzY2hlbWEgdGhhdCBpcyB2YWxpZFwiXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHNjaGVtYTtcclxuICB9XHJcbiAgY29uc3Qgc3Vic2NoZW1hID0gdmFsaWRTdWJzY2hlbWFzWzBdO1xyXG4gIGNvbnN0IHtcclxuICAgIFtkZXBlbmRlbmN5S2V5XTogY29uZGl0aW9uUHJvcGVydHlTY2hlbWEsXHJcbiAgICAuLi5kZXBlbmRlbnRTdWJzY2hlbWFcclxuICB9ID0gc3Vic2NoZW1hLnByb3BlcnRpZXM7XHJcbiAgY29uc3QgZGVwZW5kZW50U2NoZW1hID0geyAuLi5zdWJzY2hlbWEsIHByb3BlcnRpZXM6IGRlcGVuZGVudFN1YnNjaGVtYSB9O1xyXG4gIHJldHVybiBtZXJnZVNjaGVtYXMoXHJcbiAgICBzY2hlbWEsXHJcbiAgICByZXRyaWV2ZVNjaGVtYShkZXBlbmRlbnRTY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFJlY3Vyc2l2ZWx5IG1lcmdlIGRlZXBseSBuZXN0ZWQgc2NoZW1hcy5cclxuLy8gVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBtZXJnZVNjaGVtYXMgYW5kIG1lcmdlT2JqZWN0c1xyXG4vLyBpcyB0aGF0IG1lcmdlU2NoZW1hcyBvbmx5IGNvbmNhdHMgYXJyYXlzIGZvclxyXG4vLyB2YWx1ZXMgdW5kZXIgdGhlIFwicmVxdWlyZWRcIiBrZXl3b3JkLCBhbmQgd2hlbiBpdCBkb2VzLFxyXG4vLyBpdCBkb2Vzbid0IGluY2x1ZGUgZHVwbGljYXRlIHZhbHVlcy5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU2NoZW1hcyhvYmoxLCBvYmoyKSB7XHJcbiAgdmFyIGFjYyA9IE9iamVjdC5hc3NpZ24oe30sIG9iajEpOyAvLyBQcmV2ZW50IG11dGF0aW9uIG9mIHNvdXJjZSBvYmplY3QuXHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iajIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgIGNvbnN0IGxlZnQgPSBvYmoxID8gb2JqMVtrZXldIDoge30sXHJcbiAgICAgIHJpZ2h0ID0gb2JqMltrZXldO1xyXG4gICAgaWYgKG9iajEgJiYgb2JqMS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGlzT2JqZWN0KHJpZ2h0KSkge1xyXG4gICAgICBhY2Nba2V5XSA9IG1lcmdlU2NoZW1hcyhsZWZ0LCByaWdodCk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBvYmoxICYmXHJcbiAgICAgIG9iajIgJiZcclxuICAgICAgKGdldFNjaGVtYVR5cGUob2JqMSkgPT09IFwib2JqZWN0XCIgfHwgZ2V0U2NoZW1hVHlwZShvYmoyKSA9PT0gXCJvYmplY3RcIikgJiZcclxuICAgICAga2V5ID09PSBcInJlcXVpcmVkXCIgJiZcclxuICAgICAgQXJyYXkuaXNBcnJheShsZWZ0KSAmJlxyXG4gICAgICBBcnJheS5pc0FycmF5KHJpZ2h0KVxyXG4gICAgKSB7XHJcbiAgICAgIC8vIERvbid0IGluY2x1ZGUgZHVwbGljYXRlIHZhbHVlcyB3aGVuIG1lcmdpbmdcclxuICAgICAgLy8gXCJyZXF1aXJlZFwiIGZpZWxkcy5cclxuICAgICAgYWNjW2tleV0gPSB1bmlvbihsZWZ0LCByaWdodCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhY2Nba2V5XSA9IHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCBhY2MpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyhvYmplY3QpIHtcclxuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWVwRXF1YWxzKGEsIGIsIGNhID0gW10sIGNiID0gW10pIHtcclxuICAvLyBQYXJ0aWFsbHkgZXh0cmFjdGVkIGZyb20gbm9kZS1kZWVwZXIgYW5kIGFkYXB0ZWQgdG8gZXhjbHVkZSBjb21wYXJpc29uXHJcbiAgLy8gY2hlY2tzIGZvciBmdW5jdGlvbnMuXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL290aGl5bTIzL25vZGUtZGVlcGVyXHJcbiAgaWYgKGEgPT09IGIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGEgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgYiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAvLyBBc3N1bWUgYWxsIGZ1bmN0aW9ucyBhcmUgZXF1aXZhbGVudFxyXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9yanNmLXRlYW0vcmVhY3QtanNvbnNjaGVtYS1mb3JtL2lzc3Vlcy8yNTVcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGEgIT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGIgIT09IFwib2JqZWN0XCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9IGVsc2UgaWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoYSBpbnN0YW5jZW9mIERhdGUgJiYgYiBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCk7XHJcbiAgfSBlbHNlIGlmIChhIGluc3RhbmNlb2YgUmVnRXhwICYmIGIgaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGEuc291cmNlID09PSBiLnNvdXJjZSAmJlxyXG4gICAgICBhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiZcclxuICAgICAgYS5tdWx0aWxpbmUgPT09IGIubXVsdGlsaW5lICYmXHJcbiAgICAgIGEubGFzdEluZGV4ID09PSBiLmxhc3RJbmRleCAmJlxyXG4gICAgICBhLmlnbm9yZUNhc2UgPT09IGIuaWdub3JlQ2FzZVxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKGlzQXJndW1lbnRzKGEpIHx8IGlzQXJndW1lbnRzKGIpKSB7XHJcbiAgICBpZiAoIShpc0FyZ3VtZW50cyhhKSAmJiBpc0FyZ3VtZW50cyhiKSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbGV0IHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xyXG4gICAgcmV0dXJuIGRlZXBFcXVhbHMoc2xpY2UuY2FsbChhKSwgc2xpY2UuY2FsbChiKSwgY2EsIGNiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGEuY29uc3RydWN0b3IgIT09IGIuY29uc3RydWN0b3IpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBrYSA9IE9iamVjdC5rZXlzKGEpO1xyXG4gICAgbGV0IGtiID0gT2JqZWN0LmtleXMoYik7XHJcbiAgICAvLyBkb24ndCBib3RoZXIgd2l0aCBzdGFjayBhY3JvYmF0aWNzIGlmIHRoZXJlJ3Mgbm90aGluZyB0aGVyZVxyXG4gICAgaWYgKGthLmxlbmd0aCA9PT0gMCAmJiBrYi5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoa2EubGVuZ3RoICE9PSBrYi5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjYWwgPSBjYS5sZW5ndGg7XHJcbiAgICB3aGlsZSAoY2FsLS0pIHtcclxuICAgICAgaWYgKGNhW2NhbF0gPT09IGEpIHtcclxuICAgICAgICByZXR1cm4gY2JbY2FsXSA9PT0gYjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2EucHVzaChhKTtcclxuICAgIGNiLnB1c2goYik7XHJcblxyXG4gICAga2Euc29ydCgpO1xyXG4gICAga2Iuc29ydCgpO1xyXG4gICAgZm9yICh2YXIgaiA9IGthLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgIGlmIChrYVtqXSAhPT0ga2Jbal0pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQga2V5O1xyXG4gICAgZm9yIChsZXQgayA9IGthLmxlbmd0aCAtIDE7IGsgPj0gMDsgay0tKSB7XHJcbiAgICAgIGtleSA9IGthW2tdO1xyXG4gICAgICBpZiAoIWRlZXBFcXVhbHMoYVtrZXldLCBiW2tleV0sIGNhLCBjYikpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYS5wb3AoKTtcclxuICAgIGNiLnBvcCgpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFJlbmRlcihjb21wLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gIGNvbnN0IHsgcHJvcHMsIHN0YXRlIH0gPSBjb21wO1xyXG4gIHJldHVybiAhZGVlcEVxdWFscyhwcm9wcywgbmV4dFByb3BzKSB8fCAhZGVlcEVxdWFscyhzdGF0ZSwgbmV4dFN0YXRlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvSWRTY2hlbWEoXHJcbiAgc2NoZW1hLFxyXG4gIGlkLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGEgPSB7fSxcclxuICBpZFByZWZpeCA9IFwicm9vdFwiLFxyXG4gIGlkU2VwYXJhdG9yID0gXCJfXCJcclxuKSB7XHJcbiAgY29uc3QgaWRTY2hlbWEgPSB7XHJcbiAgICAkaWQ6IGlkIHx8IGlkUHJlZml4LFxyXG4gIH07XHJcbiAgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSB8fCBcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSB8fCBcImFsbE9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBjb25zdCBfc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gdG9JZFNjaGVtYShfc2NoZW1hLCBpZCwgcm9vdFNjaGVtYSwgZm9ybURhdGEsIGlkUHJlZml4LCBpZFNlcGFyYXRvcik7XHJcbiAgfVxyXG4gIGlmIChcIml0ZW1zXCIgaW4gc2NoZW1hICYmICFzY2hlbWEuaXRlbXMuJHJlZikge1xyXG4gICAgcmV0dXJuIHRvSWRTY2hlbWEoXHJcbiAgICAgIHNjaGVtYS5pdGVtcyxcclxuICAgICAgaWQsXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBpZFByZWZpeCxcclxuICAgICAgaWRTZXBhcmF0b3JcclxuICAgICk7XHJcbiAgfVxyXG4gIGlmIChzY2hlbWEudHlwZSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgcmV0dXJuIGlkU2NoZW1hO1xyXG4gIH1cclxuICBmb3IgKGNvbnN0IG5hbWUgaW4gc2NoZW1hLnByb3BlcnRpZXMgfHwge30pIHtcclxuICAgIGNvbnN0IGZpZWxkID0gc2NoZW1hLnByb3BlcnRpZXNbbmFtZV07XHJcbiAgICBjb25zdCBmaWVsZElkID0gaWRTY2hlbWEuJGlkICsgaWRTZXBhcmF0b3IgKyBuYW1lO1xyXG4gICAgaWRTY2hlbWFbbmFtZV0gPSB0b0lkU2NoZW1hKFxyXG4gICAgICBpc09iamVjdChmaWVsZCkgPyBmaWVsZCA6IHt9LFxyXG4gICAgICBmaWVsZElkLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICAvLyBJdCdzIHBvc3NpYmxlIHRoYXQgZm9ybURhdGEgaXMgbm90IGFuIG9iamVjdCAtLSB0aGlzIGNhbiBoYXBwZW4gaWYgYW5cclxuICAgICAgLy8gYXJyYXkgaXRlbSBoYXMganVzdCBiZWVuIGFkZGVkLCBidXQgbm90IHBvcHVsYXRlZCB3aXRoIGRhdGEgeWV0XHJcbiAgICAgIChmb3JtRGF0YSB8fCB7fSlbbmFtZV0sXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBpZFNlcGFyYXRvclxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIGlkU2NoZW1hO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9QYXRoU2NoZW1hKHNjaGVtYSwgbmFtZSA9IFwiXCIsIHJvb3RTY2hlbWEsIGZvcm1EYXRhID0ge30pIHtcclxuICBjb25zdCBwYXRoU2NoZW1hID0ge1xyXG4gICAgJG5hbWU6IG5hbWUucmVwbGFjZSgvXlxcLi8sIFwiXCIpLFxyXG4gIH07XHJcbiAgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSB8fCBcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSB8fCBcImFsbE9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBjb25zdCBfc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gdG9QYXRoU2NoZW1hKF9zY2hlbWEsIG5hbWUsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9XHJcblxyXG4gIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiKSkge1xyXG4gICAgcGF0aFNjaGVtYS5fX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcIml0ZW1zXCIpICYmIEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICBmb3JtRGF0YS5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XHJcbiAgICAgIHBhdGhTY2hlbWFbaV0gPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgc2NoZW1hLml0ZW1zLFxyXG4gICAgICAgIGAke25hbWV9LiR7aX1gLFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZWxlbWVudFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJwcm9wZXJ0aWVzXCIpKSB7XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHNjaGVtYS5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgIHBhdGhTY2hlbWFbcHJvcGVydHldID0gdG9QYXRoU2NoZW1hKFxyXG4gICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSxcclxuICAgICAgICBgJHtuYW1lfS4ke3Byb3BlcnR5fWAsXHJcbiAgICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgICAvLyBJdCdzIHBvc3NpYmxlIHRoYXQgZm9ybURhdGEgaXMgbm90IGFuIG9iamVjdCAtLSB0aGlzIGNhbiBoYXBwZW4gaWYgYW5cclxuICAgICAgICAvLyBhcnJheSBpdGVtIGhhcyBqdXN0IGJlZW4gYWRkZWQsIGJ1dCBub3QgcG9wdWxhdGVkIHdpdGggZGF0YSB5ZXRcclxuICAgICAgICAoZm9ybURhdGEgfHwge30pW3Byb3BlcnR5XVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcGF0aFNjaGVtYTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0ZVN0cmluZyhkYXRlU3RyaW5nLCBpbmNsdWRlVGltZSA9IHRydWUpIHtcclxuICBpZiAoIWRhdGVTdHJpbmcpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHllYXI6IC0xLFxyXG4gICAgICBtb250aDogLTEsXHJcbiAgICAgIGRheTogLTEsXHJcbiAgICAgIGhvdXI6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxyXG4gICAgICBtaW51dGU6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxyXG4gICAgICBzZWNvbmQ6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxyXG4gICAgfTtcclxuICB9XHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG4gIGlmIChOdW1iZXIuaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gcGFyc2UgZGF0ZSBcIiArIGRhdGVTdHJpbmcpO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgeWVhcjogZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxyXG4gICAgbW9udGg6IGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIC8vIG9oIHlvdSwgamF2YXNjcmlwdC5cclxuICAgIGRheTogZGF0ZS5nZXRVVENEYXRlKCksXHJcbiAgICBob3VyOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDSG91cnMoKSA6IDAsXHJcbiAgICBtaW51dGU6IGluY2x1ZGVUaW1lID8gZGF0ZS5nZXRVVENNaW51dGVzKCkgOiAwLFxyXG4gICAgc2Vjb25kOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDU2Vjb25kcygpIDogMCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlU3RyaW5nKFxyXG4gIHsgeWVhciwgbW9udGgsIGRheSwgaG91ciA9IDAsIG1pbnV0ZSA9IDAsIHNlY29uZCA9IDAgfSxcclxuICB0aW1lID0gdHJ1ZVxyXG4pIHtcclxuICBjb25zdCB1dGNUaW1lID0gRGF0ZS5VVEMoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kKTtcclxuICBjb25zdCBkYXRldGltZSA9IG5ldyBEYXRlKHV0Y1RpbWUpLnRvSlNPTigpO1xyXG4gIHJldHVybiB0aW1lID8gZGF0ZXRpbWUgOiBkYXRldGltZS5zbGljZSgwLCAxMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1dGNUb0xvY2FsKGpzb25EYXRlKSB7XHJcbiAgaWYgKCFqc29uRGF0ZSkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICAvLyByZXF1aXJlZCBmb3JtYXQgb2YgYFwieXl5eS1NTS1kZFRoaDptbVwiIGZvbGxvd2VkIGJ5IG9wdGlvbmFsIFwiOnNzXCIgb3IgXCI6c3MuU1NTXCJcclxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbnB1dC5odG1sI2xvY2FsLWRhdGUtYW5kLXRpbWUtc3RhdGUtKHR5cGUlM0RkYXRldGltZS1sb2NhbClcclxuICAvLyA+IHNob3VsZCBiZSBhIF92YWxpZCBsb2NhbCBkYXRlIGFuZCB0aW1lIHN0cmluZ18gKG5vdCBHTVQpXHJcblxyXG4gIC8vIE5vdGUgLSBkYXRlIGNvbnN0cnVjdG9yIHBhc3NlZCBsb2NhbCBJU08tODYwMSBkb2VzIG5vdCBjb3JyZWN0bHlcclxuICAvLyBjaGFuZ2UgdGltZSB0byBVVEMgaW4gbm9kZSBwcmUtOFxyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShqc29uRGF0ZSk7XHJcblxyXG4gIGNvbnN0IHl5eXkgPSBwYWQoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KTtcclxuICBjb25zdCBNTSA9IHBhZChkYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcclxuICBjb25zdCBkZCA9IHBhZChkYXRlLmdldERhdGUoKSwgMik7XHJcbiAgY29uc3QgaGggPSBwYWQoZGF0ZS5nZXRIb3VycygpLCAyKTtcclxuICBjb25zdCBtbSA9IHBhZChkYXRlLmdldE1pbnV0ZXMoKSwgMik7XHJcbiAgY29uc3Qgc3MgPSBwYWQoZGF0ZS5nZXRTZWNvbmRzKCksIDIpO1xyXG4gIGNvbnN0IFNTUyA9IHBhZChkYXRlLmdldE1pbGxpc2Vjb25kcygpLCAzKTtcclxuXHJcbiAgcmV0dXJuIGAke3l5eXl9LSR7TU19LSR7ZGR9VCR7aGh9OiR7bW19OiR7c3N9LiR7U1NTfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2NhbFRvVVRDKGRhdGVTdHJpbmcpIHtcclxuICBpZiAoZGF0ZVN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVTdHJpbmcpLnRvSlNPTigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZChudW0sIHNpemUpIHtcclxuICBsZXQgcyA9IFN0cmluZyhudW0pO1xyXG4gIHdoaWxlIChzLmxlbmd0aCA8IHNpemUpIHtcclxuICAgIHMgPSBcIjBcIiArIHM7XHJcbiAgfVxyXG4gIHJldHVybiBzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XHJcbiAgLy8gU3BsaXQgbWV0YWRhdGEgZnJvbSBkYXRhXHJcbiAgY29uc3Qgc3BsaXR0ZWQgPSBkYXRhVVJJLnNwbGl0KFwiLFwiKTtcclxuICAvLyBTcGxpdCBwYXJhbXNcclxuICBjb25zdCBwYXJhbXMgPSBzcGxpdHRlZFswXS5zcGxpdChcIjtcIik7XHJcbiAgLy8gR2V0IG1pbWUtdHlwZSBmcm9tIHBhcmFtc1xyXG4gIGNvbnN0IHR5cGUgPSBwYXJhbXNbMF0ucmVwbGFjZShcImRhdGE6XCIsIFwiXCIpO1xyXG4gIC8vIEZpbHRlciB0aGUgbmFtZSBwcm9wZXJ0eSBmcm9tIHBhcmFtc1xyXG4gIGNvbnN0IHByb3BlcnRpZXMgPSBwYXJhbXMuZmlsdGVyKHBhcmFtID0+IHtcclxuICAgIHJldHVybiBwYXJhbS5zcGxpdChcIj1cIilbMF0gPT09IFwibmFtZVwiO1xyXG4gIH0pO1xyXG4gIC8vIExvb2sgZm9yIHRoZSBuYW1lIGFuZCB1c2UgdW5rbm93biBpZiBubyBuYW1lIHByb3BlcnR5LlxyXG4gIGxldCBuYW1lO1xyXG4gIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgbmFtZSA9IFwidW5rbm93blwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBCZWNhdXNlIHdlIGZpbHRlcmVkIG91dCB0aGUgb3RoZXIgcHJvcGVydHksXHJcbiAgICAvLyB3ZSBvbmx5IGhhdmUgdGhlIG5hbWUgY2FzZSBoZXJlLlxyXG4gICAgbmFtZSA9IHByb3BlcnRpZXNbMF0uc3BsaXQoXCI9XCIpWzFdO1xyXG4gIH1cclxuXHJcbiAgLy8gQnVpbHQgdGhlIFVpbnQ4QXJyYXkgQmxvYiBwYXJhbWV0ZXIgZnJvbSB0aGUgYmFzZTY0IHN0cmluZy5cclxuICBjb25zdCBiaW5hcnkgPSBhdG9iKHNwbGl0dGVkWzFdKTtcclxuICBjb25zdCBhcnJheSA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBhcnJheS5wdXNoKGJpbmFyeS5jaGFyQ29kZUF0KGkpKTtcclxuICB9XHJcbiAgLy8gQ3JlYXRlIHRoZSBibG9iIG9iamVjdFxyXG4gIGNvbnN0IGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW25ldyBVaW50OEFycmF5KGFycmF5KV0sIHsgdHlwZSB9KTtcclxuXHJcbiAgcmV0dXJuIHsgYmxvYiwgbmFtZSB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VTcGVjKHNjaGVtYSkge1xyXG4gIGNvbnN0IHNwZWMgPSB7fTtcclxuICBpZiAoc2NoZW1hLm11bHRpcGxlT2YpIHtcclxuICAgIHNwZWMuc3RlcCA9IHNjaGVtYS5tdWx0aXBsZU9mO1xyXG4gIH1cclxuICBpZiAoc2NoZW1hLm1pbmltdW0gfHwgc2NoZW1hLm1pbmltdW0gPT09IDApIHtcclxuICAgIHNwZWMubWluID0gc2NoZW1hLm1pbmltdW07XHJcbiAgfVxyXG4gIGlmIChzY2hlbWEubWF4aW11bSB8fCBzY2hlbWEubWF4aW11bSA9PT0gMCkge1xyXG4gICAgc3BlYy5tYXggPSBzY2hlbWEubWF4aW11bTtcclxuICB9XHJcbiAgcmV0dXJuIHNwZWM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgb3B0aW9ucywgcm9vdFNjaGVtYSkge1xyXG4gIC8vIEZvciBwZXJmb3JtYW5jZSwgc2tpcCB2YWxpZGF0aW5nIHN1YnNjaGVtYXMgaWYgZm9ybURhdGEgaXMgdW5kZWZpbmVkLiBXZSBqdXN0XHJcbiAgLy8gd2FudCB0byBnZXQgdGhlIGZpcnN0IG9wdGlvbiBpbiB0aGF0IGNhc2UuXHJcbiAgaWYgKGZvcm1EYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XHJcblxyXG4gICAgLy8gSWYgdGhlIHNjaGVtYSBkZXNjcmliZXMgYW4gb2JqZWN0IHRoZW4gd2UgbmVlZCB0byBhZGQgc2xpZ2h0bHkgbW9yZVxyXG4gICAgLy8gc3RyaWN0IG1hdGNoaW5nIHRvIHRoZSBzY2hlbWEsIGJlY2F1c2UgdW5sZXNzIHRoZSBzY2hlbWEgdXNlcyB0aGVcclxuICAgIC8vIFwicmVxdWlyZXNcIiBrZXl3b3JkLCBhbiBvYmplY3Qgd2lsbCBtYXRjaCB0aGUgc2NoZW1hIGFzIGxvbmcgYXMgaXRcclxuICAgIC8vIGRvZXNuJ3QgaGF2ZSBtYXRjaGluZyBrZXlzIHdpdGggYSBjb25mbGljdGluZyB0eXBlLiBUbyBkbyB0aGlzIHdlIHVzZSBhblxyXG4gICAgLy8gXCJhbnlPZlwiIHdpdGggYW4gYXJyYXkgb2YgcmVxdWlyZXMuIFRoaXMgYXVnbWVudGF0aW9uIGV4cHJlc3NlcyB0aGF0IHRoZVxyXG4gICAgLy8gc2NoZW1hIHNob3VsZCBtYXRjaCBpZiBhbnkgb2YgdGhlIGtleXMgaW4gdGhlIHNjaGVtYSBhcmUgcHJlc2VudCBvbiB0aGVcclxuICAgIC8vIG9iamVjdCBhbmQgcGFzcyB2YWxpZGF0aW9uLlxyXG4gICAgaWYgKG9wdGlvbi5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgIC8vIENyZWF0ZSBhbiBcImFueU9mXCIgc2NoZW1hIHRoYXQgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIG9mIHRoZSBrZXlzIGluIHRoZVxyXG4gICAgICAvLyBcInByb3BlcnRpZXNcIiBvYmplY3RcclxuICAgICAgY29uc3QgcmVxdWlyZXNBbnlPZiA9IHtcclxuICAgICAgICBhbnlPZjogT2JqZWN0LmtleXMob3B0aW9uLnByb3BlcnRpZXMpLm1hcChrZXkgPT4gKHtcclxuICAgICAgICAgIHJlcXVpcmVkOiBba2V5XSxcclxuICAgICAgICB9KSksXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgYXVnbWVudGVkU2NoZW1hO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIFwiYW55T2ZcIiBrZXl3b3JkIGFscmVhZHkgZXhpc3RzLCB3cmFwIHRoZSBhdWdtZW50YXRpb24gaW4gYW4gXCJhbGxPZlwiXHJcbiAgICAgIGlmIChvcHRpb24uYW55T2YpIHtcclxuICAgICAgICAvLyBDcmVhdGUgYSBzaGFsbG93IGNsb25lIG9mIHRoZSBvcHRpb25cclxuICAgICAgICBjb25zdCB7IC4uLnNoYWxsb3dDbG9uZSB9ID0gb3B0aW9uO1xyXG5cclxuICAgICAgICBpZiAoIXNoYWxsb3dDbG9uZS5hbGxPZikge1xyXG4gICAgICAgICAgc2hhbGxvd0Nsb25lLmFsbE9mID0gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIElmIFwiYWxsT2ZcIiBhbHJlYWR5IGV4aXN0cywgc2hhbGxvdyBjbG9uZSB0aGUgYXJyYXlcclxuICAgICAgICAgIHNoYWxsb3dDbG9uZS5hbGxPZiA9IHNoYWxsb3dDbG9uZS5hbGxPZi5zbGljZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hhbGxvd0Nsb25lLmFsbE9mLnB1c2gocmVxdWlyZXNBbnlPZik7XHJcblxyXG4gICAgICAgIGF1Z21lbnRlZFNjaGVtYSA9IHNoYWxsb3dDbG9uZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhdWdtZW50ZWRTY2hlbWEgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb24sIHJlcXVpcmVzQW55T2YpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZW1vdmUgdGhlIFwicmVxdWlyZWRcIiBmaWVsZCBhcyBpdCdzIGxpa2VseSB0aGF0IG5vdCBhbGwgZmllbGRzIGhhdmVcclxuICAgICAgLy8gYmVlbiBmaWxsZWQgaW4geWV0LCB3aGljaCB3aWxsIG1lYW4gdGhhdCB0aGUgc2NoZW1hIGlzIG5vdCB2YWxpZFxyXG4gICAgICBkZWxldGUgYXVnbWVudGVkU2NoZW1hLnJlcXVpcmVkO1xyXG5cclxuICAgICAgaWYgKGlzVmFsaWQoYXVnbWVudGVkU2NoZW1hLCBmb3JtRGF0YSwgcm9vdFNjaGVtYSkpIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChpc1ZhbGlkKG9wdGlvbiwgZm9ybURhdGEsIHJvb3RTY2hlbWEpKSB7XHJcbiAgICAgIHJldHVybiBpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gMDtcclxufVxyXG5cclxuLy8gQ2hlY2sgdG8gc2VlIGlmIGEgc2NoZW1hIHNwZWNpZmllcyB0aGF0IGEgdmFsdWUgbXVzdCBiZSB0cnVlXHJcbmV4cG9ydCBmdW5jdGlvbiBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZShzY2hlbWEpIHtcclxuICAvLyBDaGVjayBpZiBjb25zdCBpcyBhIHRydXRoeSB2YWx1ZVxyXG4gIGlmIChzY2hlbWEuY29uc3QpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgaWYgYW4gZW51bSBoYXMgYSBzaW5nbGUgdmFsdWUgb2YgdHJ1ZVxyXG4gIGlmIChzY2hlbWEuZW51bSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEgJiYgc2NoZW1hLmVudW1bMF0gPT09IHRydWUpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgYW55T2YgaGFzIGEgc2luZ2xlIHZhbHVlLCBldmFsdWF0ZSB0aGUgc3Vic2NoZW1hXHJcbiAgaWYgKHNjaGVtYS5hbnlPZiAmJiBzY2hlbWEuYW55T2YubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUoc2NoZW1hLmFueU9mWzBdKTtcclxuICB9XHJcblxyXG4gIC8vIElmIG9uZU9mIGhhcyBhIHNpbmdsZSB2YWx1ZSwgZXZhbHVhdGUgdGhlIHN1YnNjaGVtYVxyXG4gIGlmIChzY2hlbWEub25lT2YgJiYgc2NoZW1hLm9uZU9mLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYS5vbmVPZlswXSk7XHJcbiAgfVxyXG5cclxuICAvLyBFdmFsdWF0ZSBlYWNoIHN1YnNjaGVtYSBpbiBhbGxPZiwgdG8gc2VlIGlmIG9uZSBvZiB0aGVtIHJlcXVpcmVzIGEgdHJ1ZVxyXG4gIC8vIHZhbHVlXHJcbiAgaWYgKHNjaGVtYS5hbGxPZikge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5hbGxPZi5zb21lKHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG4iXX0=