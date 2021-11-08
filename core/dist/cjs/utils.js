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
    displayLabel = isMultiSelect(schema, rootSchema) || isFilesArray(schema, uiSchema, rootSchema);
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
    return altSchemas.map(function (schema, i) {
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
  });
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
  var idSchema = {
    $id: id || idPrefix
  };

  if ("$ref" in schema || "dependencies" in schema || "allOf" in schema) {
    var _schema = retrieveSchema(schema, rootSchema, formData);

    return toIdSchema(_schema, id, rootSchema, formData, idPrefix);
  }

  if ("items" in schema && !schema.items.$ref) {
    return toIdSchema(schema.items, id, rootSchema, formData, idPrefix);
  }

  if (schema.type !== "object") {
    return idSchema;
  }

  for (var name in schema.properties || {}) {
    var field = schema.properties[name];
    var fieldId = idSchema.$id + "_" + name;
    idSchema[name] = toIdSchema(isObject(field) ? field : {}, fieldId, rootSchema, // It's possible that formData is not an object -- this can happen if an
    // array item has just been added, but not populated with data yet
    (formData || {})[name], idPrefix);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJ3aWRnZXRNYXAiLCJjaGVja2JveCIsInJhZGlvIiwic2VsZWN0IiwiaGlkZGVuIiwic3RyaW5nIiwidGV4dCIsInBhc3N3b3JkIiwiZW1haWwiLCJob3N0bmFtZSIsImlwdjQiLCJpcHY2IiwidXJpIiwidGV4dGFyZWEiLCJkYXRlIiwiZGF0ZXRpbWUiLCJjb2xvciIsImZpbGUiLCJudW1iZXIiLCJ1cGRvd24iLCJyYW5nZSIsImludGVnZXIiLCJhcnJheSIsImNoZWNrYm94ZXMiLCJmaWxlcyIsImNhbkV4cGFuZCIsInNjaGVtYSIsInVpU2NoZW1hIiwiZm9ybURhdGEiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImdldFVpT3B0aW9ucyIsImV4cGFuZGFibGUiLCJtYXhQcm9wZXJ0aWVzIiwidW5kZWZpbmVkIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImdldERlZmF1bHRSZWdpc3RyeSIsImZpZWxkcyIsIndpZGdldHMiLCJkZWZpbml0aW9ucyIsInJvb3RTY2hlbWEiLCJmb3JtQ29udGV4dCIsImdldFNjaGVtYVR5cGUiLCJ0eXBlIiwiZ3Vlc3NUeXBlIiwicHJvcGVydGllcyIsIkFycmF5IiwiaW5jbHVkZXMiLCJmaW5kIiwiZ2V0V2lkZ2V0Iiwid2lkZ2V0IiwicmVnaXN0ZXJlZFdpZGdldHMiLCJtZXJnZU9wdGlvbnMiLCJXaWRnZXQiLCJNZXJnZWRXaWRnZXQiLCJkZWZhdWx0T3B0aW9ucyIsImRlZmF1bHRQcm9wcyIsIm9wdGlvbnMiLCJwcm9wcyIsIlJlYWN0SXMiLCJpc0ZvcndhcmRSZWYiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJpc01lbW8iLCJFcnJvciIsImhhc093blByb3BlcnR5IiwicmVnaXN0ZXJlZFdpZGdldCIsImhhc1dpZGdldCIsImUiLCJtZXNzYWdlIiwic3RhcnRzV2l0aCIsImNvbXB1dGVEZWZhdWx0cyIsIl9zY2hlbWEiLCJwYXJlbnREZWZhdWx0cyIsInJhd0Zvcm1EYXRhIiwiaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyIsImlzT2JqZWN0IiwiZGVmYXVsdHMiLCJtZXJnZU9iamVjdHMiLCJyZWZTY2hlbWEiLCJmaW5kU2NoZW1hRGVmaW5pdGlvbiIsIiRyZWYiLCJyZXNvbHZlZFNjaGVtYSIsInJlc29sdmVEZXBlbmRlbmNpZXMiLCJpc0ZpeGVkSXRlbXMiLCJpdGVtcyIsIm1hcCIsIml0ZW1TY2hlbWEiLCJpZHgiLCJpc0FycmF5Iiwib25lT2YiLCJnZXRNYXRjaGluZ09wdGlvbiIsImFueU9mIiwicmVkdWNlIiwiYWNjIiwia2V5IiwiY29tcHV0ZWREZWZhdWx0IiwiaXRlbSIsImFkZGl0aW9uYWxJdGVtcyIsIm1pbkl0ZW1zIiwiaXNNdWx0aVNlbGVjdCIsImRlZmF1bHRzTGVuZ3RoIiwiZGVmYXVsdEVudHJpZXMiLCJmaWxsZXJTY2hlbWEiLCJmaWxsZXJFbnRyaWVzIiwiY29uY2F0IiwiZ2V0RGVmYXVsdEZvcm1TdGF0ZSIsInJldHJpZXZlU2NoZW1hIiwibWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YSIsInZhbHVlIiwiYXNzaWduIiwiZmlsdGVyIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJ3YXJuIiwiY29tcG9uZW50Iiwic3Vic3RyaW5nIiwiZ2V0RGlzcGxheUxhYmVsIiwidWlPcHRpb25zIiwibGFiZWwiLCJkaXNwbGF5TGFiZWwiLCJzY2hlbWFUeXBlIiwiaXNGaWxlc0FycmF5IiwidGhpbmciLCJGaWxlIiwib2JqMSIsIm9iajIiLCJjb25jYXRBcnJheXMiLCJsZWZ0IiwicmlnaHQiLCJhc051bWJlciIsInRlc3QiLCJuIiwiTnVtYmVyIiwidmFsaWQiLCJpc05hTiIsIm9yZGVyUHJvcGVydGllcyIsIm9yZGVyIiwiYXJyYXlUb0hhc2giLCJhcnIiLCJwcmV2IiwiY3VyciIsImVycm9yUHJvcExpc3QiLCJqb2luIiwicHJvcGVydHlIYXNoIiwib3JkZXJGaWx0ZXJlZCIsInByb3AiLCJvcmRlckhhc2giLCJyZXN0IiwicmVzdEluZGV4IiwibGFzdEluZGV4T2YiLCJjb21wbGV0ZSIsInNwbGljZSIsImlzQ29uc3RhbnQiLCJ0b0NvbnN0YW50IiwiaXNTZWxlY3QiLCJhbHRTY2hlbWFzIiwiZXZlcnkiLCJ1bmlxdWVJdGVtcyIsIml0ZW1zU2NoZW1hIiwiZm9ybWF0IiwiYWxsb3dBZGRpdGlvbmFsSXRlbXMiLCJvcHRpb25zTGlzdCIsImkiLCJlbnVtTmFtZXMiLCJTdHJpbmciLCJ0aXRsZSIsIm9yaWdSZWYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjdXJyZW50IiwianNvbnBvaW50ZXIiLCJnZXQiLCJzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyIsImZvckVhY2giLCJyZXNvbHZlU2NoZW1hIiwicmVzb2x2ZVJlZmVyZW5jZSIsImFsbE9mIiwiYWxsT2ZTdWJzY2hlbWEiLCIkcmVmU2NoZW1hIiwibG9jYWxTY2hlbWEiLCJyZXNvbHZlZFNjaGVtYVdpdGhvdXRBbGxPZiIsImhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZGVwZW5kZW5jaWVzIiwicHJvY2Vzc0RlcGVuZGVuY2llcyIsImRlcGVuZGVuY3lLZXkiLCJkZXBlbmRlbmN5VmFsdWUiLCJyZW1haW5pbmdEZXBlbmRlbmNpZXMiLCJ3aXRoRGVwZW5kZW50UHJvcGVydGllcyIsIndpdGhEZXBlbmRlbnRTY2hlbWEiLCJhZGRpdGlvbmFsbHlSZXF1aXJlZCIsInJlcXVpcmVkIiwiZnJvbSIsIlNldCIsImRlcGVuZGVudFNjaGVtYSIsIm1lcmdlU2NoZW1hcyIsInJlc29sdmVkT25lT2YiLCJzdWJzY2hlbWEiLCJ3aXRoRXhhY3RseU9uZVN1YnNjaGVtYSIsInZhbGlkU3Vic2NoZW1hcyIsImNvbmRpdGlvblByb3BlcnR5U2NoZW1hIiwiY29uZGl0aW9uU2NoZW1hIiwiZXJyb3JzIiwiZGVwZW5kZW50U3Vic2NoZW1hIiwiaXNBcmd1bWVudHMiLCJvYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJkZWVwRXF1YWxzIiwiYSIsImIiLCJjYSIsImNiIiwiRGF0ZSIsImdldFRpbWUiLCJSZWdFeHAiLCJzb3VyY2UiLCJnbG9iYWwiLCJtdWx0aWxpbmUiLCJsYXN0SW5kZXgiLCJpZ25vcmVDYXNlIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsImthIiwia2IiLCJjYWwiLCJwdXNoIiwic29ydCIsImoiLCJrIiwicG9wIiwic2hvdWxkUmVuZGVyIiwiY29tcCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInN0YXRlIiwidG9JZFNjaGVtYSIsImlkIiwiaWRQcmVmaXgiLCJpZFNjaGVtYSIsIiRpZCIsIm5hbWUiLCJmaWVsZCIsImZpZWxkSWQiLCJ0b1BhdGhTY2hlbWEiLCJwYXRoU2NoZW1hIiwiJG5hbWUiLCJyZXBsYWNlIiwiX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZWxlbWVudCIsInByb3BlcnR5IiwicGFyc2VEYXRlU3RyaW5nIiwiZGF0ZVN0cmluZyIsImluY2x1ZGVUaW1lIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInRvRGF0ZVN0cmluZyIsInRpbWUiLCJ1dGNUaW1lIiwiVVRDIiwidG9KU09OIiwidXRjVG9Mb2NhbCIsImpzb25EYXRlIiwieXl5eSIsInBhZCIsImdldEZ1bGxZZWFyIiwiTU0iLCJnZXRNb250aCIsImRkIiwiZ2V0RGF0ZSIsImhoIiwiZ2V0SG91cnMiLCJtbSIsImdldE1pbnV0ZXMiLCJzcyIsImdldFNlY29uZHMiLCJTU1MiLCJnZXRNaWxsaXNlY29uZHMiLCJsb2NhbFRvVVRDIiwibnVtIiwic2l6ZSIsInMiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsInNwbGl0dGVkIiwic3BsaXQiLCJwYXJhbXMiLCJwYXJhbSIsImJpbmFyeSIsImF0b2IiLCJjaGFyQ29kZUF0IiwiYmxvYiIsIndpbmRvdyIsIkJsb2IiLCJVaW50OEFycmF5IiwicmFuZ2VTcGVjIiwic3BlYyIsIm11bHRpcGxlT2YiLCJzdGVwIiwibWluaW11bSIsIm1pbiIsIm1heGltdW0iLCJtYXgiLCJvcHRpb24iLCJyZXF1aXJlc0FueU9mIiwiYXVnbWVudGVkU2NoZW1hIiwic2hhbGxvd0Nsb25lIiwic2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUiLCJzb21lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLHdCQUF3QixHQUFHLHVCQUFqQzs7QUFFUCxJQUFNQyxTQUFTLEdBQUc7QUFDaEIsYUFBUztBQUNQQyxJQUFBQSxRQUFRLEVBQUUsZ0JBREg7QUFFUEMsSUFBQUEsS0FBSyxFQUFFLGFBRkE7QUFHUEMsSUFBQUEsTUFBTSxFQUFFLGNBSEQ7QUFJUEMsSUFBQUEsTUFBTSxFQUFFO0FBSkQsR0FETztBQU9oQkMsRUFBQUEsTUFBTSxFQUFFO0FBQ05DLElBQUFBLElBQUksRUFBRSxZQURBO0FBRU5DLElBQUFBLFFBQVEsRUFBRSxnQkFGSjtBQUdOQyxJQUFBQSxLQUFLLEVBQUUsYUFIRDtBQUlOQyxJQUFBQSxRQUFRLEVBQUUsWUFKSjtBQUtOQyxJQUFBQSxJQUFJLEVBQUUsWUFMQTtBQU1OQyxJQUFBQSxJQUFJLEVBQUUsWUFOQTtBQU9OQyxJQUFBQSxHQUFHLEVBQUUsV0FQQztBQVFOLGdCQUFZLFlBUk47QUFTTlYsSUFBQUEsS0FBSyxFQUFFLGFBVEQ7QUFVTkMsSUFBQUEsTUFBTSxFQUFFLGNBVkY7QUFXTlUsSUFBQUEsUUFBUSxFQUFFLGdCQVhKO0FBWU5ULElBQUFBLE1BQU0sRUFBRSxjQVpGO0FBYU5VLElBQUFBLElBQUksRUFBRSxZQWJBO0FBY05DLElBQUFBLFFBQVEsRUFB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aW1wb3J0ICogYXMgUmVhY3RJcyBmcm9tIFwicmVhY3QtaXNcIjtcclxuaW1wb3J0IG1lcmdlQWxsT2YgZnJvbSBcImpzb24tc2NoZW1hLW1lcmdlLWFsbG9mXCI7XHJcbmltcG9ydCBmaWxsIGZyb20gXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvYXJyYXkvZmlsbFwiO1xyXG5pbXBvcnQgdW5pb24gZnJvbSBcImxvZGFzaC91bmlvblwiO1xyXG5pbXBvcnQganNvbnBvaW50ZXIgZnJvbSBcImpzb25wb2ludGVyXCI7XHJcbmltcG9ydCBmaWVsZHMgZnJvbSBcIi4vY29tcG9uZW50cy9maWVsZHNcIjtcclxuaW1wb3J0IHdpZGdldHMgZnJvbSBcIi4vY29tcG9uZW50cy93aWRnZXRzXCI7XHJcbmltcG9ydCB2YWxpZGF0ZUZvcm1EYXRhLCB7IGlzVmFsaWQgfSBmcm9tIFwiLi92YWxpZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyA9IFwiX19hZGRpdGlvbmFsX3Byb3BlcnR5XCI7XHJcblxyXG5jb25zdCB3aWRnZXRNYXAgPSB7XHJcbiAgYm9vbGVhbjoge1xyXG4gICAgY2hlY2tib3g6IFwiQ2hlY2tib3hXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxuICBzdHJpbmc6IHtcclxuICAgIHRleHQ6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiUGFzc3dvcmRXaWRnZXRcIixcclxuICAgIGVtYWlsOiBcIkVtYWlsV2lkZ2V0XCIsXHJcbiAgICBob3N0bmFtZTogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICBpcHY0OiBcIlRleHRXaWRnZXRcIixcclxuICAgIGlwdjY6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgdXJpOiBcIlVSTFdpZGdldFwiLFxyXG4gICAgXCJkYXRhLXVybFwiOiBcIkZpbGVXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICB0ZXh0YXJlYTogXCJUZXh0YXJlYVdpZGdldFwiLFxyXG4gICAgaGlkZGVuOiBcIkhpZGRlbldpZGdldFwiLFxyXG4gICAgZGF0ZTogXCJEYXRlV2lkZ2V0XCIsXHJcbiAgICBkYXRldGltZTogXCJEYXRlVGltZVdpZGdldFwiLFxyXG4gICAgXCJkYXRlLXRpbWVcIjogXCJEYXRlVGltZVdpZGdldFwiLFxyXG4gICAgXCJhbHQtZGF0ZVwiOiBcIkFsdERhdGVXaWRnZXRcIixcclxuICAgIFwiYWx0LWRhdGV0aW1lXCI6IFwiQWx0RGF0ZVRpbWVXaWRnZXRcIixcclxuICAgIGNvbG9yOiBcIkNvbG9yV2lkZ2V0XCIsXHJcbiAgICBmaWxlOiBcIkZpbGVXaWRnZXRcIixcclxuICB9LFxyXG4gIG51bWJlcjoge1xyXG4gICAgdGV4dDogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICB1cGRvd246IFwiVXBEb3duV2lkZ2V0XCIsXHJcbiAgICByYW5nZTogXCJSYW5nZVdpZGdldFwiLFxyXG4gICAgcmFkaW86IFwiUmFkaW9XaWRnZXRcIixcclxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcclxuICB9LFxyXG4gIGludGVnZXI6IHtcclxuICAgIHRleHQ6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxyXG4gICAgdXBkb3duOiBcIlVwRG93bldpZGdldFwiLFxyXG4gICAgcmFuZ2U6IFwiUmFuZ2VXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxuICBhcnJheToge1xyXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxyXG4gICAgY2hlY2tib3hlczogXCJDaGVja2JveGVzV2lkZ2V0XCIsXHJcbiAgICBmaWxlczogXCJGaWxlV2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW5FeHBhbmQoc2NoZW1hLCB1aVNjaGVtYSwgZm9ybURhdGEpIHtcclxuICBpZiAoIXNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjb25zdCB7IGV4cGFuZGFibGUgfSA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgaWYgKGV4cGFuZGFibGUgPT09IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gZXhwYW5kYWJsZTtcclxuICB9XHJcbiAgLy8gaWYgdWk6b3B0aW9ucy5leHBhbmRhYmxlIHdhcyBub3QgZXhwbGljaXRseSBzZXQgdG8gZmFsc2UsIHdlIGNhbiBhZGRcclxuICAvLyBhbm90aGVyIHByb3BlcnR5IGlmIHdlIGhhdmUgbm90IGV4Y2VlZGVkIG1heFByb3BlcnRpZXMgeWV0XHJcbiAgaWYgKHNjaGVtYS5tYXhQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3JtRGF0YSkubGVuZ3RoIDwgc2NoZW1hLm1heFByb3BlcnRpZXM7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWVsZHMsXHJcbiAgICB3aWRnZXRzLFxyXG4gICAgZGVmaW5pdGlvbnM6IHt9LFxyXG4gICAgcm9vdFNjaGVtYToge30sXHJcbiAgICBmb3JtQ29udGV4dDoge30sXHJcbiAgfTtcclxufVxyXG5cclxuLyogR2V0cyB0aGUgdHlwZSBvZiBhIGdpdmVuIHNjaGVtYS4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjaGVtYVR5cGUoc2NoZW1hKSB7XHJcbiAgbGV0IHsgdHlwZSB9ID0gc2NoZW1hO1xyXG5cclxuICBpZiAoIXR5cGUgJiYgc2NoZW1hLmNvbnN0KSB7XHJcbiAgICByZXR1cm4gZ3Vlc3NUeXBlKHNjaGVtYS5jb25zdCk7XHJcbiAgfVxyXG5cclxuICBpZiAoIXR5cGUgJiYgc2NoZW1hLmVudW0pIHtcclxuICAgIHJldHVybiBcInN0cmluZ1wiO1xyXG4gIH1cclxuXHJcbiAgaWYgKCF0eXBlICYmIChzY2hlbWEucHJvcGVydGllcyB8fCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7XHJcbiAgICByZXR1cm4gXCJvYmplY3RcIjtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlIGluc3RhbmNlb2YgQXJyYXkgJiYgdHlwZS5sZW5ndGggPT09IDIgJiYgdHlwZS5pbmNsdWRlcyhcIm51bGxcIikpIHtcclxuICAgIHJldHVybiB0eXBlLmZpbmQodHlwZSA9PiB0eXBlICE9PSBcIm51bGxcIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMgPSB7fSkge1xyXG4gIGNvbnN0IHR5cGUgPSBnZXRTY2hlbWFUeXBlKHNjaGVtYSk7XHJcblxyXG4gIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhXaWRnZXQpIHtcclxuICAgIC8vIGNhY2hlIHJldHVybiB2YWx1ZSBhcyBwcm9wZXJ0eSBvZiB3aWRnZXQgZm9yIHByb3BlciByZWFjdCByZWNvbmNpbGlhdGlvblxyXG4gICAgaWYgKCFXaWRnZXQuTWVyZ2VkV2lkZ2V0KSB7XHJcbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID1cclxuICAgICAgICAoV2lkZ2V0LmRlZmF1bHRQcm9wcyAmJiBXaWRnZXQuZGVmYXVsdFByb3BzLm9wdGlvbnMpIHx8IHt9O1xyXG4gICAgICBXaWRnZXQuTWVyZ2VkV2lkZ2V0ID0gKHsgb3B0aW9ucyA9IHt9LCAuLi5wcm9wcyB9KSA9PiAoXHJcbiAgICAgICAgPFdpZGdldCBvcHRpb25zPXt7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH19IHsuLi5wcm9wc30gLz5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBXaWRnZXQuTWVyZ2VkV2lkZ2V0O1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgdHlwZW9mIHdpZGdldCA9PT0gXCJmdW5jdGlvblwiIHx8XHJcbiAgICBSZWFjdElzLmlzRm9yd2FyZFJlZihSZWFjdC5jcmVhdGVFbGVtZW50KHdpZGdldCkpIHx8XHJcbiAgICBSZWFjdElzLmlzTWVtbyh3aWRnZXQpXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbWVyZ2VPcHRpb25zKHdpZGdldCk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHdpZGdldCAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCB3aWRnZXQgZGVmaW5pdGlvbjogJHt0eXBlb2Ygd2lkZ2V0fWApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHJlZ2lzdGVyZWRXaWRnZXRzLmhhc093blByb3BlcnR5KHdpZGdldCkpIHtcclxuICAgIGNvbnN0IHJlZ2lzdGVyZWRXaWRnZXQgPSByZWdpc3RlcmVkV2lkZ2V0c1t3aWRnZXRdO1xyXG4gICAgcmV0dXJuIGdldFdpZGdldChzY2hlbWEsIHJlZ2lzdGVyZWRXaWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcclxuICB9XHJcblxyXG4gIGlmICghd2lkZ2V0TWFwLmhhc093blByb3BlcnR5KHR5cGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHdpZGdldCBmb3IgdHlwZSBcIiR7dHlwZX1cImApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHdpZGdldE1hcFt0eXBlXS5oYXNPd25Qcm9wZXJ0eSh3aWRnZXQpKSB7XHJcbiAgICBjb25zdCByZWdpc3RlcmVkV2lkZ2V0ID0gcmVnaXN0ZXJlZFdpZGdldHNbd2lkZ2V0TWFwW3R5cGVdW3dpZGdldF1dO1xyXG4gICAgcmV0dXJuIGdldFdpZGdldChzY2hlbWEsIHJlZ2lzdGVyZWRXaWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcihgTm8gd2lkZ2V0IFwiJHt3aWRnZXR9XCIgZm9yIHR5cGUgXCIke3R5cGV9XCJgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1dpZGdldChzY2hlbWEsIHdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMgPSB7fSkge1xyXG4gIHRyeSB7XHJcbiAgICBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGlmIChcclxuICAgICAgZS5tZXNzYWdlICYmXHJcbiAgICAgIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIk5vIHdpZGdldFwiKSB8fFxyXG4gICAgICAgIGUubWVzc2FnZS5zdGFydHNXaXRoKFwiVW5zdXBwb3J0ZWQgd2lkZ2V0XCIpKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlRGVmYXVsdHMoXHJcbiAgX3NjaGVtYSxcclxuICBwYXJlbnREZWZhdWx0cyxcclxuICByb290U2NoZW1hLFxyXG4gIHJhd0Zvcm1EYXRhID0ge30sXHJcbiAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyA9IGZhbHNlXHJcbikge1xyXG4gIGxldCBzY2hlbWEgPSBpc09iamVjdChfc2NoZW1hKSA/IF9zY2hlbWEgOiB7fTtcclxuICBjb25zdCBmb3JtRGF0YSA9IGlzT2JqZWN0KHJhd0Zvcm1EYXRhKSA/IHJhd0Zvcm1EYXRhIDoge307XHJcbiAgLy8gQ29tcHV0ZSB0aGUgZGVmYXVsdHMgcmVjdXJzaXZlbHk6IGdpdmUgaGlnaGVzdCBwcmlvcml0eSB0byBkZWVwZXN0IG5vZGVzLlxyXG4gIGxldCBkZWZhdWx0cyA9IHBhcmVudERlZmF1bHRzO1xyXG4gIGlmIChpc09iamVjdChkZWZhdWx0cykgJiYgaXNPYmplY3Qoc2NoZW1hLmRlZmF1bHQpKSB7XHJcbiAgICAvLyBGb3Igb2JqZWN0IGRlZmF1bHRzLCBvbmx5IG92ZXJyaWRlIHBhcmVudCBkZWZhdWx0cyB0aGF0IGFyZSBkZWZpbmVkIGluXHJcbiAgICAvLyBzY2hlbWEuZGVmYXVsdC5cclxuICAgIGRlZmF1bHRzID0gbWVyZ2VPYmplY3RzKGRlZmF1bHRzLCBzY2hlbWEuZGVmYXVsdCk7XHJcbiAgfSBlbHNlIGlmIChcImRlZmF1bHRcIiBpbiBzY2hlbWEpIHtcclxuICAgIC8vIFVzZSBzY2hlbWEgZGVmYXVsdHMgZm9yIHRoaXMgbm9kZS5cclxuICAgIGRlZmF1bHRzID0gc2NoZW1hLmRlZmF1bHQ7XHJcbiAgfSBlbHNlIGlmIChcIiRyZWZcIiBpbiBzY2hlbWEpIHtcclxuICAgIC8vIFVzZSByZWZlcmVuY2VkIHNjaGVtYSBkZWZhdWx0cyBmb3IgdGhpcyBub2RlLlxyXG4gICAgY29uc3QgcmVmU2NoZW1hID0gZmluZFNjaGVtYURlZmluaXRpb24oc2NoZW1hLiRyZWYsIHJvb3RTY2hlbWEpO1xyXG4gICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgcmVmU2NoZW1hLFxyXG4gICAgICBkZWZhdWx0cyxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSkge1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgIGRlZmF1bHRzLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKGlzRml4ZWRJdGVtcyhzY2hlbWEpKSB7XHJcbiAgICBkZWZhdWx0cyA9IHNjaGVtYS5pdGVtcy5tYXAoKGl0ZW1TY2hlbWEsIGlkeCkgPT5cclxuICAgICAgY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICAgIGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgQXJyYXkuaXNBcnJheShwYXJlbnREZWZhdWx0cykgPyBwYXJlbnREZWZhdWx0c1tpZHhdIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGEsXHJcbiAgICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAoXCJvbmVPZlwiIGluIHNjaGVtYSkge1xyXG4gICAgc2NoZW1hID1cclxuICAgICAgc2NoZW1hLm9uZU9mW2dldE1hdGNoaW5nT3B0aW9uKHVuZGVmaW5lZCwgc2NoZW1hLm9uZU9mLCByb290U2NoZW1hKV07XHJcbiAgfSBlbHNlIGlmIChcImFueU9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBzY2hlbWEgPVxyXG4gICAgICBzY2hlbWEuYW55T2ZbZ2V0TWF0Y2hpbmdPcHRpb24odW5kZWZpbmVkLCBzY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXTtcclxuICB9XHJcblxyXG4gIC8vIE5vdCBkZWZhdWx0cyBkZWZpbmVkIGZvciB0aGlzIG5vZGUsIGZhbGxiYWNrIHRvIGdlbmVyaWMgdHlwZWQgb25lcy5cclxuICBpZiAodHlwZW9mIGRlZmF1bHRzID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBkZWZhdWx0cyA9IHNjaGVtYS5kZWZhdWx0O1xyXG4gIH1cclxuXHJcbiAgc3dpdGNoIChnZXRTY2hlbWFUeXBlKHNjaGVtYSkpIHtcclxuICAgIC8vIFdlIG5lZWQgdG8gcmVjdXIgZm9yIG9iamVjdCBzY2hlbWEgaW5uZXIgZGVmYXVsdCB2YWx1ZXMuXHJcbiAgICBjYXNlIFwib2JqZWN0XCI6XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcyB8fCB7fSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIGRlZmF1bHRzIGZvciB0aGlzIG5vZGUsIHdpdGggdGhlIHBhcmVudCBkZWZhdWx0cyB3ZSBtaWdodFxyXG4gICAgICAgIC8vIGhhdmUgZnJvbSBhIHByZXZpb3VzIHJ1bjogZGVmYXVsdHNba2V5XS5cclxuICAgICAgICBsZXQgY29tcHV0ZWREZWZhdWx0ID0gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNba2V5XSxcclxuICAgICAgICAgIChkZWZhdWx0cyB8fCB7fSlba2V5XSxcclxuICAgICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgICAoZm9ybURhdGEgfHwge30pW2tleV0sXHJcbiAgICAgICAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyB8fCBjb21wdXRlZERlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgYWNjW2tleV0gPSBjb21wdXRlZERlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgIH0sIHt9KTtcclxuXHJcbiAgICBjYXNlIFwiYXJyYXlcIjpcclxuICAgICAgLy8gSW5qZWN0IGRlZmF1bHRzIGludG8gZXhpc3RpbmcgYXJyYXkgZGVmYXVsdHNcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdHMpKSB7XHJcbiAgICAgICAgZGVmYXVsdHMgPSBkZWZhdWx0cy5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgICAgICAgc2NoZW1hLml0ZW1zW2lkeF0gfHwgc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyB8fCB7fSxcclxuICAgICAgICAgICAgaXRlbSxcclxuICAgICAgICAgICAgcm9vdFNjaGVtYVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRGVlcGx5IGluamVjdCBkZWZhdWx0cyBpbnRvIGFscmVhZHkgZXhpc3RpbmcgZm9ybSBkYXRhXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhd0Zvcm1EYXRhKSkge1xyXG4gICAgICAgIGRlZmF1bHRzID0gcmF3Rm9ybURhdGEubWFwKChpdGVtLCBpZHgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXHJcbiAgICAgICAgICAgIHNjaGVtYS5pdGVtcyxcclxuICAgICAgICAgICAgKGRlZmF1bHRzIHx8IHt9KVtpZHhdLFxyXG4gICAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgICBpdGVtXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzY2hlbWEubWluSXRlbXMpIHtcclxuICAgICAgICBpZiAoIWlzTXVsdGlTZWxlY3Qoc2NoZW1hLCByb290U2NoZW1hKSkge1xyXG4gICAgICAgICAgY29uc3QgZGVmYXVsdHNMZW5ndGggPSBkZWZhdWx0cyA/IGRlZmF1bHRzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgICBpZiAoc2NoZW1hLm1pbkl0ZW1zID4gZGVmYXVsdHNMZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVudHJpZXMgPSBkZWZhdWx0cyB8fCBbXTtcclxuICAgICAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGFycmF5IHdpdGggdGhlIGRlZmF1bHRzXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGxlclNjaGVtYSA9IEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKVxyXG4gICAgICAgICAgICAgID8gc2NoZW1hLmFkZGl0aW9uYWxJdGVtc1xyXG4gICAgICAgICAgICAgIDogc2NoZW1hLml0ZW1zO1xyXG4gICAgICAgICAgICBjb25zdCBmaWxsZXJFbnRyaWVzID0gZmlsbChcclxuICAgICAgICAgICAgICBuZXcgQXJyYXkoc2NoZW1hLm1pbkl0ZW1zIC0gZGVmYXVsdHNMZW5ndGgpLFxyXG4gICAgICAgICAgICAgIGNvbXB1dGVEZWZhdWx0cyhmaWxsZXJTY2hlbWEsIGZpbGxlclNjaGVtYS5kZWZhdWx0cywgcm9vdFNjaGVtYSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy8gdGhlbiBmaWxsIHVwIHRoZSByZXN0IHdpdGggZWl0aGVyIHRoZSBpdGVtIGRlZmF1bHQgb3IgZW1wdHksIHVwIHRvIG1pbkl0ZW1zXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdEVudHJpZXMuY29uY2F0KGZpbGxlckVudHJpZXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gZGVmYXVsdHMgPyBkZWZhdWx0cyA6IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuICByZXR1cm4gZGVmYXVsdHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0Rm9ybVN0YXRlKFxyXG4gIF9zY2hlbWEsXHJcbiAgZm9ybURhdGEsXHJcbiAgcm9vdFNjaGVtYSA9IHt9LFxyXG4gIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXMgPSBmYWxzZVxyXG4pIHtcclxuICBpZiAoIWlzT2JqZWN0KF9zY2hlbWEpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNjaGVtYTogXCIgKyBfc2NoZW1hKTtcclxuICB9XHJcbiAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIGNvbnN0IGRlZmF1bHRzID0gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgc2NoZW1hLFxyXG4gICAgX3NjaGVtYS5kZWZhdWx0LFxyXG4gICAgcm9vdFNjaGVtYSxcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICk7XHJcbiAgaWYgKHR5cGVvZiBmb3JtRGF0YSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgLy8gTm8gZm9ybSBkYXRhPyBVc2Ugc2NoZW1hIGRlZmF1bHRzLlxyXG4gICAgcmV0dXJuIGRlZmF1bHRzO1xyXG4gIH1cclxuICBpZiAoaXNPYmplY3QoZm9ybURhdGEpIHx8IEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICByZXR1cm4gbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YShkZWZhdWx0cywgZm9ybURhdGEpO1xyXG4gIH1cclxuICBpZiAoZm9ybURhdGEgPT09IDAgfHwgZm9ybURhdGEgPT09IGZhbHNlIHx8IGZvcm1EYXRhID09PSBcIlwiKSB7XHJcbiAgICByZXR1cm4gZm9ybURhdGE7XHJcbiAgfVxyXG4gIHJldHVybiBmb3JtRGF0YSB8fCBkZWZhdWx0cztcclxufVxyXG5cclxuLyoqXHJcbiAqIFdoZW4gbWVyZ2luZyBkZWZhdWx0cyBhbmQgZm9ybSBkYXRhLCB3ZSB3YW50IHRvIG1lcmdlIGluIHRoaXMgc3BlY2lmaWMgd2F5OlxyXG4gKiAtIG9iamVjdHMgYXJlIGRlZXBseSBtZXJnZWRcclxuICogLSBhcnJheXMgYXJlIG1lcmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQ6XHJcbiAqICAgLSB3aGVuIHRoZSBhcnJheSBpcyBzZXQgaW4gZm9ybSBkYXRhLCBvbmx5IGFycmF5IGVudHJpZXMgc2V0IGluIGZvcm0gZGF0YVxyXG4gKiAgICAgYXJlIGRlZXBseSBtZXJnZWQ7IGFkZGl0aW9uYWwgZW50cmllcyBmcm9tIHRoZSBkZWZhdWx0cyBhcmUgaWdub3JlZFxyXG4gKiAgIC0gd2hlbiB0aGUgYXJyYXkgaXMgbm90IHNldCBpbiBmb3JtIGRhdGEsIHRoZSBkZWZhdWx0IGlzIGNvcGllZCBvdmVyXHJcbiAqIC0gc2NhbGFycyBhcmUgb3ZlcndyaXR0ZW4vc2V0IGJ5IGZvcm0gZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHMsIGZvcm1EYXRhKSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGVmYXVsdHMpKSB7XHJcbiAgICAgIGRlZmF1bHRzID0gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybURhdGEubWFwKCh2YWx1ZSwgaWR4KSA9PiB7XHJcbiAgICAgIGlmIChkZWZhdWx0c1tpZHhdKSB7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHNbaWR4XSwgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoZm9ybURhdGEpKSB7XHJcbiAgICBjb25zdCBhY2MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cyk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3JtRGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICBhY2Nba2V5XSA9IG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoXHJcbiAgICAgICAgZGVmYXVsdHMgPyBkZWZhdWx0c1trZXldIDoge30sXHJcbiAgICAgICAgZm9ybURhdGFba2V5XVxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgYWNjKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZvcm1EYXRhO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVpT3B0aW9ucyh1aVNjaGVtYSkge1xyXG4gIC8vIGdldCBhbGwgcGFzc2VkIG9wdGlvbnMgZnJvbSB1aTp3aWRnZXQsIHVpOm9wdGlvbnMsIGFuZCB1aTo8b3B0aW9uTmFtZT5cclxuICByZXR1cm4gT2JqZWN0LmtleXModWlTY2hlbWEpXHJcbiAgICAuZmlsdGVyKGtleSA9PiBrZXkuaW5kZXhPZihcInVpOlwiKSA9PT0gMClcclxuICAgIC5yZWR1Y2UoKG9wdGlvbnMsIGtleSkgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHVpU2NoZW1hW2tleV07XHJcbiAgICAgIGlmIChrZXkgPT09IFwidWk6d2lkZ2V0XCIgJiYgaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgXCJTZXR0aW5nIG9wdGlvbnMgdmlhIHVpOndpZGdldCBvYmplY3QgaXMgZGVwcmVjYXRlZCwgdXNlIHVpOm9wdGlvbnMgaW5zdGVhZFwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICAgIC4uLih2YWx1ZS5vcHRpb25zIHx8IHt9KSxcclxuICAgICAgICAgIHdpZGdldDogdmFsdWUuY29tcG9uZW50LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGtleSA9PT0gXCJ1aTpvcHRpb25zXCIgJiYgaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4ub3B0aW9ucywgLi4udmFsdWUgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyAuLi5vcHRpb25zLCBba2V5LnN1YnN0cmluZygzKV06IHZhbHVlIH07XHJcbiAgICB9LCB7fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5TGFiZWwoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSkge1xyXG4gIGNvbnN0IHVpT3B0aW9ucyA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgbGV0IHsgbGFiZWw6IGRpc3BsYXlMYWJlbCA9IHRydWUgfSA9IHVpT3B0aW9ucztcclxuICBjb25zdCBzY2hlbWFUeXBlID0gZ2V0U2NoZW1hVHlwZShzY2hlbWEpO1xyXG5cclxuICBpZiAoc2NoZW1hVHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPVxyXG4gICAgICBpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSkgfHxcclxuICAgICAgaXNGaWxlc0FycmF5KHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNjaGVtYVR5cGUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIGRpc3BsYXlMYWJlbCA9IGZhbHNlO1xyXG4gIH1cclxuICBpZiAoc2NoZW1hVHlwZSA9PT0gXCJib29sZWFuXCIgJiYgIXVpU2NoZW1hW1widWk6d2lkZ2V0XCJdKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPSBmYWxzZTtcclxuICB9XHJcbiAgaWYgKHVpU2NoZW1hW1widWk6ZmllbGRcIl0pIHtcclxuICAgIGRpc3BsYXlMYWJlbCA9IGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gZGlzcGxheUxhYmVsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodGhpbmcpIHtcclxuICBpZiAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdGhpbmcgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IFwib2JqZWN0XCIgJiYgdGhpbmcgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkodGhpbmcpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmplY3RzKG9iajEsIG9iajIsIGNvbmNhdEFycmF5cyA9IGZhbHNlKSB7XHJcbiAgLy8gUmVjdXJzaXZlbHkgbWVyZ2UgZGVlcGx5IG5lc3RlZCBvYmplY3RzLlxyXG4gIHZhciBhY2MgPSBPYmplY3QuYXNzaWduKHt9LCBvYmoxKTsgLy8gUHJldmVudCBtdXRhdGlvbiBvZiBzb3VyY2Ugb2JqZWN0LlxyXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmoyKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcbiAgICBjb25zdCBsZWZ0ID0gb2JqMSA/IG9iajFba2V5XSA6IHt9LFxyXG4gICAgICByaWdodCA9IG9iajJba2V5XTtcclxuICAgIGlmIChvYmoxICYmIG9iajEuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpc09iamVjdChyaWdodCkpIHtcclxuICAgICAgYWNjW2tleV0gPSBtZXJnZU9iamVjdHMobGVmdCwgcmlnaHQsIGNvbmNhdEFycmF5cyk7XHJcbiAgICB9IGVsc2UgaWYgKGNvbmNhdEFycmF5cyAmJiBBcnJheS5pc0FycmF5KGxlZnQpICYmIEFycmF5LmlzQXJyYXkocmlnaHQpKSB7XHJcbiAgICAgIGFjY1trZXldID0gbGVmdC5jb25jYXQocmlnaHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWNjW2tleV0gPSByaWdodDtcclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwgYWNjKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFzTnVtYmVyKHZhbHVlKSB7XHJcbiAgaWYgKHZhbHVlID09PSBcIlwiKSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBpZiAoL1xcLiQvLnRlc3QodmFsdWUpKSB7XHJcbiAgICAvLyBcIjMuXCIgY2FuJ3QgcmVhbGx5IGJlIGNvbnNpZGVyZWQgYSBudW1iZXIgZXZlbiBpZiBpdCBwYXJzZXMgaW4ganMuIFRoZVxyXG4gICAgLy8gdXNlciBpcyBtb3N0IGxpa2VseSBlbnRlcmluZyBhIGZsb2F0LlxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICBpZiAoL1xcLjAkLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgLy8gd2UgbmVlZCB0byByZXR1cm4gdGhpcyBhcyBhIHN0cmluZyBoZXJlLCB0byBhbGxvdyBmb3IgaW5wdXQgbGlrZSAzLjA3XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIGNvbnN0IG4gPSBOdW1iZXIodmFsdWUpO1xyXG4gIGNvbnN0IHZhbGlkID0gdHlwZW9mIG4gPT09IFwibnVtYmVyXCIgJiYgIU51bWJlci5pc05hTihuKTtcclxuXHJcbiAgaWYgKC9cXC5cXGQqMCQvLnRlc3QodmFsdWUpKSB7XHJcbiAgICAvLyBJdCdzIGEgbnVtYmVyLCB0aGF0J3MgY29vbCAtIGJ1dCB3ZSBuZWVkIGl0IGFzIGEgc3RyaW5nIHNvIGl0IGRvZXNuJ3Qgc2NyZXdcclxuICAgIC8vIHdpdGggdGhlIHVzZXIgd2hlbiBlbnRlcmluZyBkb2xsYXIgYW1vdW50cyBvciBvdGhlciB2YWx1ZXMgKHN1Y2ggYXMgdGhvc2Ugd2l0aFxyXG4gICAgLy8gc3BlY2lmaWMgcHJlY2lzaW9uIG9yIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMpXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmFsaWQgPyBuIDogdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvcmRlclByb3BlcnRpZXMocHJvcGVydGllcywgb3JkZXIpIHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkob3JkZXIpKSB7XHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxuICB9XHJcblxyXG4gIGNvbnN0IGFycmF5VG9IYXNoID0gYXJyID0+XHJcbiAgICBhcnIucmVkdWNlKChwcmV2LCBjdXJyKSA9PiB7XHJcbiAgICAgIHByZXZbY3Vycl0gPSB0cnVlO1xyXG4gICAgICByZXR1cm4gcHJldjtcclxuICAgIH0sIHt9KTtcclxuICBjb25zdCBlcnJvclByb3BMaXN0ID0gYXJyID0+XHJcbiAgICBhcnIubGVuZ3RoID4gMVxyXG4gICAgICA/IGBwcm9wZXJ0aWVzICcke2Fyci5qb2luKFwiJywgJ1wiKX0nYFxyXG4gICAgICA6IGBwcm9wZXJ0eSAnJHthcnJbMF19J2A7XHJcbiAgY29uc3QgcHJvcGVydHlIYXNoID0gYXJyYXlUb0hhc2gocHJvcGVydGllcyk7XHJcbiAgY29uc3Qgb3JkZXJGaWx0ZXJlZCA9IG9yZGVyLmZpbHRlcihcclxuICAgIHByb3AgPT4gcHJvcCA9PT0gXCIqXCIgfHwgcHJvcGVydHlIYXNoW3Byb3BdXHJcbiAgKTtcclxuICBjb25zdCBvcmRlckhhc2ggPSBhcnJheVRvSGFzaChvcmRlckZpbHRlcmVkKTtcclxuXHJcbiAgY29uc3QgcmVzdCA9IHByb3BlcnRpZXMuZmlsdGVyKHByb3AgPT4gIW9yZGVySGFzaFtwcm9wXSk7XHJcbiAgY29uc3QgcmVzdEluZGV4ID0gb3JkZXJGaWx0ZXJlZC5pbmRleE9mKFwiKlwiKTtcclxuICBpZiAocmVzdEluZGV4ID09PSAtMSkge1xyXG4gICAgaWYgKHJlc3QubGVuZ3RoKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgdWlTY2hlbWEgb3JkZXIgbGlzdCBkb2VzIG5vdCBjb250YWluICR7ZXJyb3JQcm9wTGlzdChyZXN0KX1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3JkZXJGaWx0ZXJlZDtcclxuICB9XHJcbiAgaWYgKHJlc3RJbmRleCAhPT0gb3JkZXJGaWx0ZXJlZC5sYXN0SW5kZXhPZihcIipcIikpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInVpU2NoZW1hIG9yZGVyIGxpc3QgY29udGFpbnMgbW9yZSB0aGFuIG9uZSB3aWxkY2FyZCBpdGVtXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tcGxldGUgPSBbLi4ub3JkZXJGaWx0ZXJlZF07XHJcbiAgY29tcGxldGUuc3BsaWNlKHJlc3RJbmRleCwgMSwgLi4ucmVzdCk7XHJcbiAgcmV0dXJuIGNvbXBsZXRlO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIGdpdmVuIHNjaGVtYSBtYXRjaGVzIGEgc2luZ2xlXHJcbiAqIGNvbnN0YW50IHZhbHVlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29uc3RhbnQoc2NoZW1hKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEpIHx8XHJcbiAgICBzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJjb25zdFwiKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0NvbnN0YW50KHNjaGVtYSkge1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEpIHtcclxuICAgIHJldHVybiBzY2hlbWEuZW51bVswXTtcclxuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImNvbnN0XCIpKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmNvbnN0O1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJzY2hlbWEgY2Fubm90IGJlIGluZmVycmVkIGFzIGEgY29uc3RhbnRcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTZWxlY3QoX3NjaGVtYSwgcm9vdFNjaGVtYSA9IHt9KSB7XHJcbiAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSk7XHJcbiAgY29uc3QgYWx0U2NoZW1hcyA9IHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2Y7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmVudW0pKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYWx0U2NoZW1hcykpIHtcclxuICAgIHJldHVybiBhbHRTY2hlbWFzLmV2ZXJ5KGFsdFNjaGVtYXMgPT4gaXNDb25zdGFudChhbHRTY2hlbWFzKSk7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlTZWxlY3Qoc2NoZW1hLCByb290U2NoZW1hID0ge30pIHtcclxuICBpZiAoIXNjaGVtYS51bmlxdWVJdGVtcyB8fCAhc2NoZW1hLml0ZW1zKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiBpc1NlbGVjdChzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNGaWxlc0FycmF5KHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSkge1xyXG4gIGlmICh1aVNjaGVtYVtcInVpOndpZGdldFwiXSA9PT0gXCJmaWxlc1wiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHNjaGVtYS5pdGVtcykge1xyXG4gICAgY29uc3QgaXRlbXNTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEpO1xyXG4gICAgcmV0dXJuIGl0ZW1zU2NoZW1hLnR5cGUgPT09IFwic3RyaW5nXCIgJiYgaXRlbXNTY2hlbWEuZm9ybWF0ID09PSBcImRhdGEtdXJsXCI7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRml4ZWRJdGVtcyhzY2hlbWEpIHtcclxuICByZXR1cm4gKFxyXG4gICAgQXJyYXkuaXNBcnJheShzY2hlbWEuaXRlbXMpICYmXHJcbiAgICBzY2hlbWEuaXRlbXMubGVuZ3RoID4gMCAmJlxyXG4gICAgc2NoZW1hLml0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXNPYmplY3QoaXRlbSkpXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsbG93QWRkaXRpb25hbEl0ZW1zKHNjaGVtYSkge1xyXG4gIGlmIChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zID09PSB0cnVlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oXCJhZGRpdGlvbmFsSXRlbXM9dHJ1ZSBpcyBjdXJyZW50bHkgbm90IHN1cHBvcnRlZFwiKTtcclxuICB9XHJcbiAgcmV0dXJuIGlzT2JqZWN0KHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uc0xpc3Qoc2NoZW1hKSB7XHJcbiAgaWYgKHNjaGVtYS5lbnVtKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmVudW0ubWFwKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICBjb25zdCBsYWJlbCA9IChzY2hlbWEuZW51bU5hbWVzICYmIHNjaGVtYS5lbnVtTmFtZXNbaV0pIHx8IFN0cmluZyh2YWx1ZSk7XHJcbiAgICAgIHJldHVybiB7IGxhYmVsLCB2YWx1ZSB9O1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IGFsdFNjaGVtYXMgPSBzY2hlbWEub25lT2YgfHwgc2NoZW1hLmFueU9mO1xyXG4gICAgcmV0dXJuIGFsdFNjaGVtYXMubWFwKChzY2hlbWEsIGkpID0+IHtcclxuICAgICAgY29uc3QgdmFsdWUgPSB0b0NvbnN0YW50KHNjaGVtYSk7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gc2NoZW1hLnRpdGxlIHx8IFN0cmluZyh2YWx1ZSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2NoZW1hLFxyXG4gICAgICAgIGxhYmVsLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZFNjaGVtYURlZmluaXRpb24oJHJlZiwgcm9vdFNjaGVtYSA9IHt9KSB7XHJcbiAgY29uc3Qgb3JpZ1JlZiA9ICRyZWY7XHJcbiAgaWYgKCRyZWYuc3RhcnRzV2l0aChcIiNcIikpIHtcclxuICAgIC8vIERlY29kZSBVUkkgZnJhZ21lbnQgcmVwcmVzZW50YXRpb24uXHJcbiAgICAkcmVmID0gZGVjb2RlVVJJQ29tcG9uZW50KCRyZWYuc3Vic3RyaW5nKDEpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhIGRlZmluaXRpb24gZm9yICR7b3JpZ1JlZn0uYCk7XHJcbiAgfVxyXG4gIGNvbnN0IGN1cnJlbnQgPSBqc29ucG9pbnRlci5nZXQocm9vdFNjaGVtYSwgJHJlZik7XHJcbiAgaWYgKGN1cnJlbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhIGRlZmluaXRpb24gZm9yICR7b3JpZ1JlZn0uYCk7XHJcbiAgfVxyXG4gIGlmIChjdXJyZW50Lmhhc093blByb3BlcnR5KFwiJHJlZlwiKSkge1xyXG4gICAgcmV0dXJuIGZpbmRTY2hlbWFEZWZpbml0aW9uKGN1cnJlbnQuJHJlZiwgcm9vdFNjaGVtYSk7XHJcbiAgfVxyXG4gIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG4vLyBJbiB0aGUgY2FzZSB3aGVyZSB3ZSBoYXZlIHRvIGltcGxpY2l0bHkgY3JlYXRlIGEgc2NoZW1hLCBpdCBpcyB1c2VmdWwgdG8ga25vdyB3aGF0IHR5cGUgdG8gdXNlXHJcbi8vICBiYXNlZCBvbiB0aGUgZGF0YSB3ZSBhcmUgZGVmaW5pbmdcclxuZXhwb3J0IGNvbnN0IGd1ZXNzVHlwZSA9IGZ1bmN0aW9uIGd1ZXNzVHlwZSh2YWx1ZSkge1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgcmV0dXJuIFwiYXJyYXlcIjtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICByZXR1cm4gXCJudWxsXCI7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICByZXR1cm4gXCJib29sZWFuXCI7XHJcbiAgfSBlbHNlIGlmICghaXNOYU4odmFsdWUpKSB7XHJcbiAgICByZXR1cm4gXCJudW1iZXJcIjtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgcmV0dXJuIFwib2JqZWN0XCI7XHJcbiAgfVxyXG4gIC8vIERlZmF1bHQgdG8gc3RyaW5nIGlmIHdlIGNhbid0IGZpZ3VyZSBpdCBvdXRcclxuICByZXR1cm4gXCJzdHJpbmdcIjtcclxufTtcclxuXHJcbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBjcmVhdGUgbmV3IFwicHJvcGVydGllc1wiIGl0ZW1zIGZvciBlYWNoIGtleSBpbiBvdXIgZm9ybURhdGFcclxuZXhwb3J0IGZ1bmN0aW9uIHN0dWJFeGlzdGluZ0FkZGl0aW9uYWxQcm9wZXJ0aWVzKFxyXG4gIHNjaGVtYSxcclxuICByb290U2NoZW1hID0ge30sXHJcbiAgZm9ybURhdGEgPSB7fVxyXG4pIHtcclxuICAvLyBDbG9uZSB0aGUgc2NoZW1hIHNvIHdlIGRvbid0IHJ1aW4gdGhlIGNvbnN1bWVyJ3Mgb3JpZ2luYWxcclxuICBzY2hlbWEgPSB7XHJcbiAgICAuLi5zY2hlbWEsXHJcbiAgICBwcm9wZXJ0aWVzOiB7IC4uLnNjaGVtYS5wcm9wZXJ0aWVzIH0sXHJcbiAgfTtcclxuXHJcbiAgT2JqZWN0LmtleXMoZm9ybURhdGEpLmZvckVhY2goa2V5ID0+IHtcclxuICAgIGlmIChzY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgIC8vIE5vIG5lZWQgdG8gc3R1Yiwgb3VyIHNjaGVtYSBhbHJlYWR5IGhhcyB0aGUgcHJvcGVydHlcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhZGRpdGlvbmFsUHJvcGVydGllcztcclxuICAgIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XHJcbiAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgICAgeyAkcmVmOiBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXNbXCIkcmVmXCJdIH0sXHJcbiAgICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgICBmb3JtRGF0YVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoXCJ0eXBlXCIpKSB7XHJcbiAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0geyAuLi5zY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0geyB0eXBlOiBndWVzc1R5cGUoZm9ybURhdGFba2V5XSkgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGUgdHlwZSBvZiBvdXIgbmV3IGtleSBzaG91bGQgbWF0Y2ggdGhlIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIHZhbHVlO1xyXG4gICAgc2NoZW1hLnByb3BlcnRpZXNba2V5XSA9IGFkZGl0aW9uYWxQcm9wZXJ0aWVzO1xyXG4gICAgLy8gU2V0IG91ciBhZGRpdGlvbmFsIHByb3BlcnR5IGZsYWcgc28gd2Uga25vdyBpdCB3YXMgZHluYW1pY2FsbHkgYWRkZWRcclxuICAgIHNjaGVtYS5wcm9wZXJ0aWVzW2tleV1bQURESVRJT05BTF9QUk9QRVJUWV9GTEFHXSA9IHRydWU7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBzY2hlbWE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSA9IHt9LCBmb3JtRGF0YSA9IHt9KSB7XHJcbiAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIikpIHtcclxuICAgIHJldHVybiByZXNvbHZlUmVmZXJlbmNlKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIH0gZWxzZSBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiZGVwZW5kZW5jaWVzXCIpKSB7XHJcbiAgICBjb25zdCByZXNvbHZlZFNjaGVtYSA9IHJlc29sdmVEZXBlbmRlbmNpZXMoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gcmV0cmlldmVTY2hlbWEocmVzb2x2ZWRTY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImFsbE9mXCIpKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5zY2hlbWEsXHJcbiAgICAgIGFsbE9mOiBzY2hlbWEuYWxsT2YubWFwKGFsbE9mU3Vic2NoZW1hID0+XHJcbiAgICAgICAgcmV0cmlldmVTY2hlbWEoYWxsT2ZTdWJzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxyXG4gICAgICApLFxyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gTm8gJHJlZiBvciBkZXBlbmRlbmNpZXMgYXR0cmlidXRlIGZvdW5kLCByZXR1cm5pbmcgdGhlIG9yaWdpbmFsIHNjaGVtYS5cclxuICAgIHJldHVybiBzY2hlbWE7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNvbHZlUmVmZXJlbmNlKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpIHtcclxuICAvLyBSZXRyaWV2ZSB0aGUgcmVmZXJlbmNlZCBzY2hlbWEgZGVmaW5pdGlvbi5cclxuICBjb25zdCAkcmVmU2NoZW1hID0gZmluZFNjaGVtYURlZmluaXRpb24oc2NoZW1hLiRyZWYsIHJvb3RTY2hlbWEpO1xyXG4gIC8vIERyb3AgdGhlICRyZWYgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBzY2hlbWEuXHJcbiAgY29uc3QgeyAkcmVmLCAuLi5sb2NhbFNjaGVtYSB9ID0gc2NoZW1hO1xyXG4gIC8vIFVwZGF0ZSByZWZlcmVuY2VkIHNjaGVtYSBkZWZpbml0aW9uIHdpdGggbG9jYWwgc2NoZW1hIHByb3BlcnRpZXMuXHJcbiAgcmV0dXJuIHJldHJpZXZlU2NoZW1hKFxyXG4gICAgeyAuLi4kcmVmU2NoZW1hLCAuLi5sb2NhbFNjaGVtYSB9LFxyXG4gICAgcm9vdFNjaGVtYSxcclxuICAgIGZvcm1EYXRhXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSA9IHt9LCBmb3JtRGF0YSA9IHt9KSB7XHJcbiAgaWYgKCFpc09iamVjdChzY2hlbWEpKSB7XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG4gIGxldCByZXNvbHZlZFNjaGVtYSA9IHJlc29sdmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgaWYgKFwiYWxsT2ZcIiBpbiBzY2hlbWEpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gbWVyZ2VBbGxPZih7XHJcbiAgICAgICAgLi4ucmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgICAgYWxsT2Y6IHJlc29sdmVkU2NoZW1hLmFsbE9mLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiY291bGQgbm90IG1lcmdlIHN1YnNjaGVtYXMgaW4gYWxsT2Y6XFxuXCIgKyBlKTtcclxuICAgICAgY29uc3QgeyBhbGxPZiwgLi4ucmVzb2x2ZWRTY2hlbWFXaXRob3V0QWxsT2YgfSA9IHJlc29sdmVkU2NoZW1hO1xyXG4gICAgICByZXR1cm4gcmVzb2x2ZWRTY2hlbWFXaXRob3V0QWxsT2Y7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IGhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzID1cclxuICAgIHJlc29sdmVkU2NoZW1hLmhhc093blByb3BlcnR5KFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIikgJiZcclxuICAgIHJlc29sdmVkU2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSBmYWxzZTtcclxuICBpZiAoaGFzQWRkaXRpb25hbFByb3BlcnRpZXMpIHtcclxuICAgIHJldHVybiBzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyhcclxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gcmVzb2x2ZWRTY2hlbWE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc29sdmVEZXBlbmRlbmNpZXMoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSkge1xyXG4gIC8vIERyb3AgdGhlIGRlcGVuZGVuY2llcyBmcm9tIHRoZSBzb3VyY2Ugc2NoZW1hLlxyXG4gIGxldCB7IGRlcGVuZGVuY2llcyA9IHt9LCAuLi5yZXNvbHZlZFNjaGVtYSB9ID0gc2NoZW1hO1xyXG4gIGlmIChcIm9uZU9mXCIgaW4gcmVzb2x2ZWRTY2hlbWEpIHtcclxuICAgIHJlc29sdmVkU2NoZW1hID1cclxuICAgICAgcmVzb2x2ZWRTY2hlbWEub25lT2ZbXHJcbiAgICAgICAgZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIHJlc29sdmVkU2NoZW1hLm9uZU9mLCByb290U2NoZW1hKVxyXG4gICAgICBdO1xyXG4gIH0gZWxzZSBpZiAoXCJhbnlPZlwiIGluIHJlc29sdmVkU2NoZW1hKSB7XHJcbiAgICByZXNvbHZlZFNjaGVtYSA9XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLmFueU9mW1xyXG4gICAgICAgIGdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCByZXNvbHZlZFNjaGVtYS5hbnlPZiwgcm9vdFNjaGVtYSlcclxuICAgICAgXTtcclxuICB9XHJcbiAgcmV0dXJuIHByb2Nlc3NEZXBlbmRlbmNpZXMoXHJcbiAgICBkZXBlbmRlbmNpZXMsXHJcbiAgICByZXNvbHZlZFNjaGVtYSxcclxuICAgIHJvb3RTY2hlbWEsXHJcbiAgICBmb3JtRGF0YVxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gcHJvY2Vzc0RlcGVuZGVuY2llcyhcclxuICBkZXBlbmRlbmNpZXMsXHJcbiAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgcm9vdFNjaGVtYSxcclxuICBmb3JtRGF0YVxyXG4pIHtcclxuICAvLyBQcm9jZXNzIGRlcGVuZGVuY2llcyB1cGRhdGluZyB0aGUgbG9jYWwgc2NoZW1hIHByb3BlcnRpZXMgYXMgYXBwcm9wcmlhdGUuXHJcbiAgZm9yIChjb25zdCBkZXBlbmRlbmN5S2V5IGluIGRlcGVuZGVuY2llcykge1xyXG4gICAgLy8gU2tpcCB0aGlzIGRlcGVuZGVuY3kgaWYgaXRzIHRyaWdnZXIgcHJvcGVydHkgaXMgbm90IHByZXNlbnQuXHJcbiAgICBpZiAoZm9ybURhdGFbZGVwZW5kZW5jeUtleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIC8vIFNraXAgdGhpcyBkZXBlbmRlbmN5IGlmIGl0IGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgc2NoZW1hIChzdWNoIGFzIHdoZW4gZGVwZW5kZW5jeUtleSBpcyBpdHNlbGYgYSBoaWRkZW4gZGVwZW5kZW5jeS4pXHJcbiAgICBpZiAoXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLnByb3BlcnRpZXMgJiZcclxuICAgICAgIShkZXBlbmRlbmN5S2V5IGluIHJlc29sdmVkU2NoZW1hLnByb3BlcnRpZXMpXHJcbiAgICApIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIFtkZXBlbmRlbmN5S2V5XTogZGVwZW5kZW5jeVZhbHVlLFxyXG4gICAgICAuLi5yZW1haW5pbmdEZXBlbmRlbmNpZXNcclxuICAgIH0gPSBkZXBlbmRlbmNpZXM7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkZXBlbmRlbmN5VmFsdWUpKSB7XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gd2l0aERlcGVuZGVudFByb3BlcnRpZXMocmVzb2x2ZWRTY2hlbWEsIGRlcGVuZGVuY3lWYWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGRlcGVuZGVuY3lWYWx1ZSkpIHtcclxuICAgICAgcmVzb2x2ZWRTY2hlbWEgPSB3aXRoRGVwZW5kZW50U2NoZW1hKFxyXG4gICAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGEsXHJcbiAgICAgICAgZGVwZW5kZW5jeUtleSxcclxuICAgICAgICBkZXBlbmRlbmN5VmFsdWVcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9jZXNzRGVwZW5kZW5jaWVzKFxyXG4gICAgICByZW1haW5pbmdEZXBlbmRlbmNpZXMsXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YVxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc29sdmVkU2NoZW1hO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aXRoRGVwZW5kZW50UHJvcGVydGllcyhzY2hlbWEsIGFkZGl0aW9uYWxseVJlcXVpcmVkKSB7XHJcbiAgaWYgKCFhZGRpdGlvbmFsbHlSZXF1aXJlZCkge1xyXG4gICAgcmV0dXJuIHNjaGVtYTtcclxuICB9XHJcbiAgY29uc3QgcmVxdWlyZWQgPSBBcnJheS5pc0FycmF5KHNjaGVtYS5yZXF1aXJlZClcclxuICAgID8gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5zY2hlbWEucmVxdWlyZWQsIC4uLmFkZGl0aW9uYWxseVJlcXVpcmVkXSkpXHJcbiAgICA6IGFkZGl0aW9uYWxseVJlcXVpcmVkO1xyXG4gIHJldHVybiB7IC4uLnNjaGVtYSwgcmVxdWlyZWQ6IHJlcXVpcmVkIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdpdGhEZXBlbmRlbnRTY2hlbWEoXHJcbiAgc2NoZW1hLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGEsXHJcbiAgZGVwZW5kZW5jeUtleSxcclxuICBkZXBlbmRlbmN5VmFsdWVcclxuKSB7XHJcbiAgbGV0IHsgb25lT2YsIC4uLmRlcGVuZGVudFNjaGVtYSB9ID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICBkZXBlbmRlbmN5VmFsdWUsXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGFcclxuICApO1xyXG4gIHNjaGVtYSA9IG1lcmdlU2NoZW1hcyhzY2hlbWEsIGRlcGVuZGVudFNjaGVtYSk7XHJcbiAgLy8gU2luY2UgaXQgZG9lcyBub3QgY29udGFpbiBvbmVPZiwgd2UgcmV0dXJuIHRoZSBvcmlnaW5hbCBzY2hlbWEuXHJcbiAgaWYgKG9uZU9mID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBzY2hlbWE7XHJcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShvbmVPZikpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZDogaXQgaXMgc29tZSAke3R5cGVvZiBvbmVPZn0gaW5zdGVhZCBvZiBhbiBhcnJheWApO1xyXG4gIH1cclxuICAvLyBSZXNvbHZlICRyZWZzIGluc2lkZSBvbmVPZi5cclxuICBjb25zdCByZXNvbHZlZE9uZU9mID0gb25lT2YubWFwKHN1YnNjaGVtYSA9PlxyXG4gICAgc3Vic2NoZW1hLmhhc093blByb3BlcnR5KFwiJHJlZlwiKVxyXG4gICAgICA/IHJlc29sdmVSZWZlcmVuY2Uoc3Vic2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcclxuICAgICAgOiBzdWJzY2hlbWFcclxuICApO1xyXG4gIHJldHVybiB3aXRoRXhhY3RseU9uZVN1YnNjaGVtYShcclxuICAgIHNjaGVtYSxcclxuICAgIHJvb3RTY2hlbWEsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIGRlcGVuZGVuY3lLZXksXHJcbiAgICByZXNvbHZlZE9uZU9mXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gd2l0aEV4YWN0bHlPbmVTdWJzY2hlbWEoXHJcbiAgc2NoZW1hLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGEsXHJcbiAgZGVwZW5kZW5jeUtleSxcclxuICBvbmVPZlxyXG4pIHtcclxuICBjb25zdCB2YWxpZFN1YnNjaGVtYXMgPSBvbmVPZi5maWx0ZXIoc3Vic2NoZW1hID0+IHtcclxuICAgIGlmICghc3Vic2NoZW1hLnByb3BlcnRpZXMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBbZGVwZW5kZW5jeUtleV06IGNvbmRpdGlvblByb3BlcnR5U2NoZW1hIH0gPSBzdWJzY2hlbWEucHJvcGVydGllcztcclxuICAgIGlmIChjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSkge1xyXG4gICAgICBjb25zdCBjb25kaXRpb25TY2hlbWEgPSB7XHJcbiAgICAgICAgdHlwZTogXCJvYmplY3RcIixcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICBbZGVwZW5kZW5jeUtleV06IGNvbmRpdGlvblByb3BlcnR5U2NoZW1hLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IHsgZXJyb3JzIH0gPSB2YWxpZGF0ZUZvcm1EYXRhKGZvcm1EYXRhLCBjb25kaXRpb25TY2hlbWEpO1xyXG4gICAgICByZXR1cm4gZXJyb3JzLmxlbmd0aCA9PT0gMDtcclxuICAgIH1cclxuICB9KTtcclxuICBpZiAodmFsaWRTdWJzY2hlbWFzLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgY29uc29sZS53YXJuKFxyXG4gICAgICBcImlnbm9yaW5nIG9uZU9mIGluIGRlcGVuZGVuY2llcyBiZWNhdXNlIHRoZXJlIGlzbid0IGV4YWN0bHkgb25lIHN1YnNjaGVtYSB0aGF0IGlzIHZhbGlkXCJcclxuICAgICk7XHJcbiAgICByZXR1cm4gc2NoZW1hO1xyXG4gIH1cclxuICBjb25zdCBzdWJzY2hlbWEgPSB2YWxpZFN1YnNjaGVtYXNbMF07XHJcbiAgY29uc3Qge1xyXG4gICAgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSxcclxuICAgIC4uLmRlcGVuZGVudFN1YnNjaGVtYVxyXG4gIH0gPSBzdWJzY2hlbWEucHJvcGVydGllcztcclxuICBjb25zdCBkZXBlbmRlbnRTY2hlbWEgPSB7IC4uLnN1YnNjaGVtYSwgcHJvcGVydGllczogZGVwZW5kZW50U3Vic2NoZW1hIH07XHJcbiAgcmV0dXJuIG1lcmdlU2NoZW1hcyhcclxuICAgIHNjaGVtYSxcclxuICAgIHJldHJpZXZlU2NoZW1hKGRlcGVuZGVudFNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgKTtcclxufVxyXG5cclxuLy8gUmVjdXJzaXZlbHkgbWVyZ2UgZGVlcGx5IG5lc3RlZCBzY2hlbWFzLlxyXG4vLyBUaGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG1lcmdlU2NoZW1hcyBhbmQgbWVyZ2VPYmplY3RzXHJcbi8vIGlzIHRoYXQgbWVyZ2VTY2hlbWFzIG9ubHkgY29uY2F0cyBhcnJheXMgZm9yXHJcbi8vIHZhbHVlcyB1bmRlciB0aGUgXCJyZXF1aXJlZFwiIGtleXdvcmQsIGFuZCB3aGVuIGl0IGRvZXMsXHJcbi8vIGl0IGRvZXNuJ3QgaW5jbHVkZSBkdXBsaWNhdGUgdmFsdWVzLlxyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VTY2hlbWFzKG9iajEsIG9iajIpIHtcclxuICB2YXIgYWNjID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqMSk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cclxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqMikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgY29uc3QgbGVmdCA9IG9iajEgPyBvYmoxW2tleV0gOiB7fSxcclxuICAgICAgcmlnaHQgPSBvYmoyW2tleV07XHJcbiAgICBpZiAob2JqMSAmJiBvYmoxLmhhc093blByb3BlcnR5KGtleSkgJiYgaXNPYmplY3QocmlnaHQpKSB7XHJcbiAgICAgIGFjY1trZXldID0gbWVyZ2VTY2hlbWFzKGxlZnQsIHJpZ2h0KTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIG9iajEgJiZcclxuICAgICAgb2JqMiAmJlxyXG4gICAgICAoZ2V0U2NoZW1hVHlwZShvYmoxKSA9PT0gXCJvYmplY3RcIiB8fCBnZXRTY2hlbWFUeXBlKG9iajIpID09PSBcIm9iamVjdFwiKSAmJlxyXG4gICAgICBrZXkgPT09IFwicmVxdWlyZWRcIiAmJlxyXG4gICAgICBBcnJheS5pc0FycmF5KGxlZnQpICYmXHJcbiAgICAgIEFycmF5LmlzQXJyYXkocmlnaHQpXHJcbiAgICApIHtcclxuICAgICAgLy8gRG9uJ3QgaW5jbHVkZSBkdXBsaWNhdGUgdmFsdWVzIHdoZW4gbWVyZ2luZ1xyXG4gICAgICAvLyBcInJlcXVpcmVkXCIgZmllbGRzLlxyXG4gICAgICBhY2Nba2V5XSA9IHVuaW9uKGxlZnQsIHJpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFjY1trZXldID0gcmlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIGFjYyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQXJndW1lbnRzKG9iamVjdCkge1xyXG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBFcXVhbHMoYSwgYiwgY2EgPSBbXSwgY2IgPSBbXSkge1xyXG4gIC8vIFBhcnRpYWxseSBleHRyYWN0ZWQgZnJvbSBub2RlLWRlZXBlciBhbmQgYWRhcHRlZCB0byBleGNsdWRlIGNvbXBhcmlzb25cclxuICAvLyBjaGVja3MgZm9yIGZ1bmN0aW9ucy5cclxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vb3RoaXltMjMvbm9kZS1kZWVwZXJcclxuICBpZiAoYSA9PT0gYikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgYSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBiID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIC8vIEFzc3VtZSBhbGwgZnVuY3Rpb25zIGFyZSBlcXVpdmFsZW50XHJcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Jqc2YtdGVhbS9yZWFjdC1qc29uc2NoZW1hLWZvcm0vaXNzdWVzLzI1NVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgYSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoYSA9PT0gbnVsbCB8fCBiID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSBlbHNlIGlmIChhIGluc3RhbmNlb2YgRGF0ZSAmJiBiIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKTtcclxuICB9IGVsc2UgaWYgKGEgaW5zdGFuY2VvZiBSZWdFeHAgJiYgYiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgYS5zb3VyY2UgPT09IGIuc291cmNlICYmXHJcbiAgICAgIGEuZ2xvYmFsID09PSBiLmdsb2JhbCAmJlxyXG4gICAgICBhLm11bHRpbGluZSA9PT0gYi5tdWx0aWxpbmUgJiZcclxuICAgICAgYS5sYXN0SW5kZXggPT09IGIubGFzdEluZGV4ICYmXHJcbiAgICAgIGEuaWdub3JlQ2FzZSA9PT0gYi5pZ25vcmVDYXNlXHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAoaXNBcmd1bWVudHMoYSkgfHwgaXNBcmd1bWVudHMoYikpIHtcclxuICAgIGlmICghKGlzQXJndW1lbnRzKGEpICYmIGlzQXJndW1lbnRzKGIpKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsZXQgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XHJcbiAgICByZXR1cm4gZGVlcEVxdWFscyhzbGljZS5jYWxsKGEpLCBzbGljZS5jYWxsKGIpLCBjYSwgY2IpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoYS5jb25zdHJ1Y3RvciAhPT0gYi5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGthID0gT2JqZWN0LmtleXMoYSk7XHJcbiAgICBsZXQga2IgPSBPYmplY3Qua2V5cyhiKTtcclxuICAgIC8vIGRvbid0IGJvdGhlciB3aXRoIHN0YWNrIGFjcm9iYXRpY3MgaWYgdGhlcmUncyBub3RoaW5nIHRoZXJlXHJcbiAgICBpZiAoa2EubGVuZ3RoID09PSAwICYmIGtiLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChrYS5sZW5ndGggIT09IGtiLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNhbCA9IGNhLmxlbmd0aDtcclxuICAgIHdoaWxlIChjYWwtLSkge1xyXG4gICAgICBpZiAoY2FbY2FsXSA9PT0gYSkge1xyXG4gICAgICAgIHJldHVybiBjYltjYWxdID09PSBiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjYS5wdXNoKGEpO1xyXG4gICAgY2IucHVzaChiKTtcclxuXHJcbiAgICBrYS5zb3J0KCk7XHJcbiAgICBrYi5zb3J0KCk7XHJcbiAgICBmb3IgKHZhciBqID0ga2EubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgaWYgKGthW2pdICE9PSBrYltqXSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBrZXk7XHJcbiAgICBmb3IgKGxldCBrID0ga2EubGVuZ3RoIC0gMTsgayA+PSAwOyBrLS0pIHtcclxuICAgICAga2V5ID0ga2Fba107XHJcbiAgICAgIGlmICghZGVlcEVxdWFscyhhW2tleV0sIGJba2V5XSwgY2EsIGNiKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhLnBvcCgpO1xyXG4gICAgY2IucG9wKCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkUmVuZGVyKGNvbXAsIG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgY29uc3QgeyBwcm9wcywgc3RhdGUgfSA9IGNvbXA7XHJcbiAgcmV0dXJuICFkZWVwRXF1YWxzKHByb3BzLCBuZXh0UHJvcHMpIHx8ICFkZWVwRXF1YWxzKHN0YXRlLCBuZXh0U3RhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9JZFNjaGVtYShcclxuICBzY2hlbWEsXHJcbiAgaWQsXHJcbiAgcm9vdFNjaGVtYSxcclxuICBmb3JtRGF0YSA9IHt9LFxyXG4gIGlkUHJlZml4ID0gXCJyb290XCJcclxuKSB7XHJcbiAgY29uc3QgaWRTY2hlbWEgPSB7XHJcbiAgICAkaWQ6IGlkIHx8IGlkUHJlZml4LFxyXG4gIH07XHJcbiAgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSB8fCBcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSB8fCBcImFsbE9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBjb25zdCBfc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gdG9JZFNjaGVtYShfc2NoZW1hLCBpZCwgcm9vdFNjaGVtYSwgZm9ybURhdGEsIGlkUHJlZml4KTtcclxuICB9XHJcbiAgaWYgKFwiaXRlbXNcIiBpbiBzY2hlbWEgJiYgIXNjaGVtYS5pdGVtcy4kcmVmKSB7XHJcbiAgICByZXR1cm4gdG9JZFNjaGVtYShzY2hlbWEuaXRlbXMsIGlkLCByb290U2NoZW1hLCBmb3JtRGF0YSwgaWRQcmVmaXgpO1xyXG4gIH1cclxuICBpZiAoc2NoZW1hLnR5cGUgIT09IFwib2JqZWN0XCIpIHtcclxuICAgIHJldHVybiBpZFNjaGVtYTtcclxuICB9XHJcbiAgZm9yIChjb25zdCBuYW1lIGluIHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KSB7XHJcbiAgICBjb25zdCBmaWVsZCA9IHNjaGVtYS5wcm9wZXJ0aWVzW25hbWVdO1xyXG4gICAgY29uc3QgZmllbGRJZCA9IGlkU2NoZW1hLiRpZCArIFwiX1wiICsgbmFtZTtcclxuICAgIGlkU2NoZW1hW25hbWVdID0gdG9JZFNjaGVtYShcclxuICAgICAgaXNPYmplY3QoZmllbGQpID8gZmllbGQgOiB7fSxcclxuICAgICAgZmllbGRJZCxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgLy8gSXQncyBwb3NzaWJsZSB0aGF0IGZvcm1EYXRhIGlzIG5vdCBhbiBvYmplY3QgLS0gdGhpcyBjYW4gaGFwcGVuIGlmIGFuXHJcbiAgICAgIC8vIGFycmF5IGl0ZW0gaGFzIGp1c3QgYmVlbiBhZGRlZCwgYnV0IG5vdCBwb3B1bGF0ZWQgd2l0aCBkYXRhIHlldFxyXG4gICAgICAoZm9ybURhdGEgfHwge30pW25hbWVdLFxyXG4gICAgICBpZFByZWZpeFxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIGlkU2NoZW1hO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9QYXRoU2NoZW1hKHNjaGVtYSwgbmFtZSA9IFwiXCIsIHJvb3RTY2hlbWEsIGZvcm1EYXRhID0ge30pIHtcclxuICBjb25zdCBwYXRoU2NoZW1hID0ge1xyXG4gICAgJG5hbWU6IG5hbWUucmVwbGFjZSgvXlxcLi8sIFwiXCIpLFxyXG4gIH07XHJcbiAgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSB8fCBcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSB8fCBcImFsbE9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBjb25zdCBfc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gdG9QYXRoU2NoZW1hKF9zY2hlbWEsIG5hbWUsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9XHJcblxyXG4gIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiKSkge1xyXG4gICAgcGF0aFNjaGVtYS5fX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcIml0ZW1zXCIpICYmIEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICBmb3JtRGF0YS5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XHJcbiAgICAgIHBhdGhTY2hlbWFbaV0gPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgc2NoZW1hLml0ZW1zLFxyXG4gICAgICAgIGAke25hbWV9LiR7aX1gLFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZWxlbWVudFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJwcm9wZXJ0aWVzXCIpKSB7XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHNjaGVtYS5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgIHBhdGhTY2hlbWFbcHJvcGVydHldID0gdG9QYXRoU2NoZW1hKFxyXG4gICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSxcclxuICAgICAgICBgJHtuYW1lfS4ke3Byb3BlcnR5fWAsXHJcbiAgICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgICAvLyBJdCdzIHBvc3NpYmxlIHRoYXQgZm9ybURhdGEgaXMgbm90IGFuIG9iamVjdCAtLSB0aGlzIGNhbiBoYXBwZW4gaWYgYW5cclxuICAgICAgICAvLyBhcnJheSBpdGVtIGhhcyBqdXN0IGJlZW4gYWRkZWQsIGJ1dCBub3QgcG9wdWxhdGVkIHdpdGggZGF0YSB5ZXRcclxuICAgICAgICAoZm9ybURhdGEgfHwge30pW3Byb3BlcnR5XVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcGF0aFNjaGVtYTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0ZVN0cmluZyhkYXRlU3RyaW5nLCBpbmNsdWRlVGltZSA9IHRydWUpIHtcclxuICBpZiAoIWRhdGVTdHJpbmcpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHllYXI6IC0xLFxyXG4gICAgICBtb250aDogLTEsXHJcbiAgICAgIGRheTogLTEsXHJcbiAgICAgIGhvdXI6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxyXG4gICAgICBtaW51dGU6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxyXG4gICAgICBzZWNvbmQ6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxyXG4gICAgfTtcclxuICB9XHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG4gIGlmIChOdW1iZXIuaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gcGFyc2UgZGF0ZSBcIiArIGRhdGVTdHJpbmcpO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgeWVhcjogZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxyXG4gICAgbW9udGg6IGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIC8vIG9oIHlvdSwgamF2YXNjcmlwdC5cclxuICAgIGRheTogZGF0ZS5nZXRVVENEYXRlKCksXHJcbiAgICBob3VyOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDSG91cnMoKSA6IDAsXHJcbiAgICBtaW51dGU6IGluY2x1ZGVUaW1lID8gZGF0ZS5nZXRVVENNaW51dGVzKCkgOiAwLFxyXG4gICAgc2Vjb25kOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDU2Vjb25kcygpIDogMCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlU3RyaW5nKFxyXG4gIHsgeWVhciwgbW9udGgsIGRheSwgaG91ciA9IDAsIG1pbnV0ZSA9IDAsIHNlY29uZCA9IDAgfSxcclxuICB0aW1lID0gdHJ1ZVxyXG4pIHtcclxuICBjb25zdCB1dGNUaW1lID0gRGF0ZS5VVEMoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kKTtcclxuICBjb25zdCBkYXRldGltZSA9IG5ldyBEYXRlKHV0Y1RpbWUpLnRvSlNPTigpO1xyXG4gIHJldHVybiB0aW1lID8gZGF0ZXRpbWUgOiBkYXRldGltZS5zbGljZSgwLCAxMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1dGNUb0xvY2FsKGpzb25EYXRlKSB7XHJcbiAgaWYgKCFqc29uRGF0ZSkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICAvLyByZXF1aXJlZCBmb3JtYXQgb2YgYFwieXl5eS1NTS1kZFRoaDptbVwiIGZvbGxvd2VkIGJ5IG9wdGlvbmFsIFwiOnNzXCIgb3IgXCI6c3MuU1NTXCJcclxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbnB1dC5odG1sI2xvY2FsLWRhdGUtYW5kLXRpbWUtc3RhdGUtKHR5cGUlM0RkYXRldGltZS1sb2NhbClcclxuICAvLyA+IHNob3VsZCBiZSBhIF92YWxpZCBsb2NhbCBkYXRlIGFuZCB0aW1lIHN0cmluZ18gKG5vdCBHTVQpXHJcblxyXG4gIC8vIE5vdGUgLSBkYXRlIGNvbnN0cnVjdG9yIHBhc3NlZCBsb2NhbCBJU08tODYwMSBkb2VzIG5vdCBjb3JyZWN0bHlcclxuICAvLyBjaGFuZ2UgdGltZSB0byBVVEMgaW4gbm9kZSBwcmUtOFxyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShqc29uRGF0ZSk7XHJcblxyXG4gIGNvbnN0IHl5eXkgPSBwYWQoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KTtcclxuICBjb25zdCBNTSA9IHBhZChkYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcclxuICBjb25zdCBkZCA9IHBhZChkYXRlLmdldERhdGUoKSwgMik7XHJcbiAgY29uc3QgaGggPSBwYWQoZGF0ZS5nZXRIb3VycygpLCAyKTtcclxuICBjb25zdCBtbSA9IHBhZChkYXRlLmdldE1pbnV0ZXMoKSwgMik7XHJcbiAgY29uc3Qgc3MgPSBwYWQoZGF0ZS5nZXRTZWNvbmRzKCksIDIpO1xyXG4gIGNvbnN0IFNTUyA9IHBhZChkYXRlLmdldE1pbGxpc2Vjb25kcygpLCAzKTtcclxuXHJcbiAgcmV0dXJuIGAke3l5eXl9LSR7TU19LSR7ZGR9VCR7aGh9OiR7bW19OiR7c3N9LiR7U1NTfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2NhbFRvVVRDKGRhdGVTdHJpbmcpIHtcclxuICBpZiAoZGF0ZVN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVTdHJpbmcpLnRvSlNPTigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZChudW0sIHNpemUpIHtcclxuICBsZXQgcyA9IFN0cmluZyhudW0pO1xyXG4gIHdoaWxlIChzLmxlbmd0aCA8IHNpemUpIHtcclxuICAgIHMgPSBcIjBcIiArIHM7XHJcbiAgfVxyXG4gIHJldHVybiBzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XHJcbiAgLy8gU3BsaXQgbWV0YWRhdGEgZnJvbSBkYXRhXHJcbiAgY29uc3Qgc3BsaXR0ZWQgPSBkYXRhVVJJLnNwbGl0KFwiLFwiKTtcclxuICAvLyBTcGxpdCBwYXJhbXNcclxuICBjb25zdCBwYXJhbXMgPSBzcGxpdHRlZFswXS5zcGxpdChcIjtcIik7XHJcbiAgLy8gR2V0IG1pbWUtdHlwZSBmcm9tIHBhcmFtc1xyXG4gIGNvbnN0IHR5cGUgPSBwYXJhbXNbMF0ucmVwbGFjZShcImRhdGE6XCIsIFwiXCIpO1xyXG4gIC8vIEZpbHRlciB0aGUgbmFtZSBwcm9wZXJ0eSBmcm9tIHBhcmFtc1xyXG4gIGNvbnN0IHByb3BlcnRpZXMgPSBwYXJhbXMuZmlsdGVyKHBhcmFtID0+IHtcclxuICAgIHJldHVybiBwYXJhbS5zcGxpdChcIj1cIilbMF0gPT09IFwibmFtZVwiO1xyXG4gIH0pO1xyXG4gIC8vIExvb2sgZm9yIHRoZSBuYW1lIGFuZCB1c2UgdW5rbm93biBpZiBubyBuYW1lIHByb3BlcnR5LlxyXG4gIGxldCBuYW1lO1xyXG4gIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgbmFtZSA9IFwidW5rbm93blwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBCZWNhdXNlIHdlIGZpbHRlcmVkIG91dCB0aGUgb3RoZXIgcHJvcGVydHksXHJcbiAgICAvLyB3ZSBvbmx5IGhhdmUgdGhlIG5hbWUgY2FzZSBoZXJlLlxyXG4gICAgbmFtZSA9IHByb3BlcnRpZXNbMF0uc3BsaXQoXCI9XCIpWzFdO1xyXG4gIH1cclxuXHJcbiAgLy8gQnVpbHQgdGhlIFVpbnQ4QXJyYXkgQmxvYiBwYXJhbWV0ZXIgZnJvbSB0aGUgYmFzZTY0IHN0cmluZy5cclxuICBjb25zdCBiaW5hcnkgPSBhdG9iKHNwbGl0dGVkWzFdKTtcclxuICBjb25zdCBhcnJheSA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBhcnJheS5wdXNoKGJpbmFyeS5jaGFyQ29kZUF0KGkpKTtcclxuICB9XHJcbiAgLy8gQ3JlYXRlIHRoZSBibG9iIG9iamVjdFxyXG4gIGNvbnN0IGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW25ldyBVaW50OEFycmF5KGFycmF5KV0sIHsgdHlwZSB9KTtcclxuXHJcbiAgcmV0dXJuIHsgYmxvYiwgbmFtZSB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VTcGVjKHNjaGVtYSkge1xyXG4gIGNvbnN0IHNwZWMgPSB7fTtcclxuICBpZiAoc2NoZW1hLm11bHRpcGxlT2YpIHtcclxuICAgIHNwZWMuc3RlcCA9IHNjaGVtYS5tdWx0aXBsZU9mO1xyXG4gIH1cclxuICBpZiAoc2NoZW1hLm1pbmltdW0gfHwgc2NoZW1hLm1pbmltdW0gPT09IDApIHtcclxuICAgIHNwZWMubWluID0gc2NoZW1hLm1pbmltdW07XHJcbiAgfVxyXG4gIGlmIChzY2hlbWEubWF4aW11bSB8fCBzY2hlbWEubWF4aW11bSA9PT0gMCkge1xyXG4gICAgc3BlYy5tYXggPSBzY2hlbWEubWF4aW11bTtcclxuICB9XHJcbiAgcmV0dXJuIHNwZWM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgb3B0aW9ucywgcm9vdFNjaGVtYSkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1tpXTtcclxuXHJcbiAgICAvLyBJZiB0aGUgc2NoZW1hIGRlc2NyaWJlcyBhbiBvYmplY3QgdGhlbiB3ZSBuZWVkIHRvIGFkZCBzbGlnaHRseSBtb3JlXHJcbiAgICAvLyBzdHJpY3QgbWF0Y2hpbmcgdG8gdGhlIHNjaGVtYSwgYmVjYXVzZSB1bmxlc3MgdGhlIHNjaGVtYSB1c2VzIHRoZVxyXG4gICAgLy8gXCJyZXF1aXJlc1wiIGtleXdvcmQsIGFuIG9iamVjdCB3aWxsIG1hdGNoIHRoZSBzY2hlbWEgYXMgbG9uZyBhcyBpdFxyXG4gICAgLy8gZG9lc24ndCBoYXZlIG1hdGNoaW5nIGtleXMgd2l0aCBhIGNvbmZsaWN0aW5nIHR5cGUuIFRvIGRvIHRoaXMgd2UgdXNlIGFuXHJcbiAgICAvLyBcImFueU9mXCIgd2l0aCBhbiBhcnJheSBvZiByZXF1aXJlcy4gVGhpcyBhdWdtZW50YXRpb24gZXhwcmVzc2VzIHRoYXQgdGhlXHJcbiAgICAvLyBzY2hlbWEgc2hvdWxkIG1hdGNoIGlmIGFueSBvZiB0aGUga2V5cyBpbiB0aGUgc2NoZW1hIGFyZSBwcmVzZW50IG9uIHRoZVxyXG4gICAgLy8gb2JqZWN0IGFuZCBwYXNzIHZhbGlkYXRpb24uXHJcbiAgICBpZiAob3B0aW9uLnByb3BlcnRpZXMpIHtcclxuICAgICAgLy8gQ3JlYXRlIGFuIFwiYW55T2ZcIiBzY2hlbWEgdGhhdCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgb2YgdGhlIGtleXMgaW4gdGhlXHJcbiAgICAgIC8vIFwicHJvcGVydGllc1wiIG9iamVjdFxyXG4gICAgICBjb25zdCByZXF1aXJlc0FueU9mID0ge1xyXG4gICAgICAgIGFueU9mOiBPYmplY3Qua2V5cyhvcHRpb24ucHJvcGVydGllcykubWFwKGtleSA9PiAoe1xyXG4gICAgICAgICAgcmVxdWlyZWQ6IFtrZXldLFxyXG4gICAgICAgIH0pKSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCBhdWdtZW50ZWRTY2hlbWE7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgXCJhbnlPZlwiIGtleXdvcmQgYWxyZWFkeSBleGlzdHMsIHdyYXAgdGhlIGF1Z21lbnRhdGlvbiBpbiBhbiBcImFsbE9mXCJcclxuICAgICAgaWYgKG9wdGlvbi5hbnlPZikge1xyXG4gICAgICAgIC8vIENyZWF0ZSBhIHNoYWxsb3cgY2xvbmUgb2YgdGhlIG9wdGlvblxyXG4gICAgICAgIGNvbnN0IHsgLi4uc2hhbGxvd0Nsb25lIH0gPSBvcHRpb247XHJcblxyXG4gICAgICAgIGlmICghc2hhbGxvd0Nsb25lLmFsbE9mKSB7XHJcbiAgICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YgPSBbXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gSWYgXCJhbGxPZlwiIGFscmVhZHkgZXhpc3RzLCBzaGFsbG93IGNsb25lIHRoZSBhcnJheVxyXG4gICAgICAgICAgc2hhbGxvd0Nsb25lLmFsbE9mID0gc2hhbGxvd0Nsb25lLmFsbE9mLnNsaWNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YucHVzaChyZXF1aXJlc0FueU9mKTtcclxuXHJcbiAgICAgICAgYXVnbWVudGVkU2NoZW1hID0gc2hhbGxvd0Nsb25lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1Z21lbnRlZFNjaGVtYSA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbiwgcmVxdWlyZXNBbnlPZik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSB0aGUgXCJyZXF1aXJlZFwiIGZpZWxkIGFzIGl0J3MgbGlrZWx5IHRoYXQgbm90IGFsbCBmaWVsZHMgaGF2ZVxyXG4gICAgICAvLyBiZWVuIGZpbGxlZCBpbiB5ZXQsIHdoaWNoIHdpbGwgbWVhbiB0aGF0IHRoZSBzY2hlbWEgaXMgbm90IHZhbGlkXHJcbiAgICAgIGRlbGV0ZSBhdWdtZW50ZWRTY2hlbWEucmVxdWlyZWQ7XHJcblxyXG4gICAgICBpZiAoaXNWYWxpZChhdWdtZW50ZWRTY2hlbWEsIGZvcm1EYXRhLCByb290U2NoZW1hKSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzVmFsaWQob3B0aW9uLCBmb3JtRGF0YSwgcm9vdFNjaGVtYSkpIHtcclxuICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAwO1xyXG59XHJcblxyXG4vLyBDaGVjayB0byBzZWUgaWYgYSBzY2hlbWEgc3BlY2lmaWVzIHRoYXQgYSB2YWx1ZSBtdXN0IGJlIHRydWVcclxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYSkge1xyXG4gIC8vIENoZWNrIGlmIGNvbnN0IGlzIGEgdHJ1dGh5IHZhbHVlXHJcbiAgaWYgKHNjaGVtYS5jb25zdCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBpZiBhbiBlbnVtIGhhcyBhIHNpbmdsZSB2YWx1ZSBvZiB0cnVlXHJcbiAgaWYgKHNjaGVtYS5lbnVtICYmIHNjaGVtYS5lbnVtLmxlbmd0aCA9PT0gMSAmJiBzY2hlbWEuZW51bVswXSA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBJZiBhbnlPZiBoYXMgYSBzaW5nbGUgdmFsdWUsIGV2YWx1YXRlIHRoZSBzdWJzY2hlbWFcclxuICBpZiAoc2NoZW1hLmFueU9mICYmIHNjaGVtYS5hbnlPZi5sZW5ndGggPT09IDEpIHtcclxuICAgIHJldHVybiBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZShzY2hlbWEuYW55T2ZbMF0pO1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgb25lT2YgaGFzIGEgc2luZ2xlIHZhbHVlLCBldmFsdWF0ZSB0aGUgc3Vic2NoZW1hXHJcbiAgaWYgKHNjaGVtYS5vbmVPZiAmJiBzY2hlbWEub25lT2YubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUoc2NoZW1hLm9uZU9mWzBdKTtcclxuICB9XHJcblxyXG4gIC8vIEV2YWx1YXRlIGVhY2ggc3Vic2NoZW1hIGluIGFsbE9mLCB0byBzZWUgaWYgb25lIG9mIHRoZW0gcmVxdWlyZXMgYSB0cnVlXHJcbiAgLy8gdmFsdWVcclxuICBpZiAoc2NoZW1hLmFsbE9mKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmFsbE9mLnNvbWUoc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbiJdfQ==