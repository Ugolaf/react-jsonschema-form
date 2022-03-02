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

import React from "react";
import * as ReactIs from "react-is";
import mergeAllOf from "json-schema-merge-allof";
import fill from "core-js-pure/features/array/fill";
import union from "lodash/union";
import jsonpointer from "jsonpointer";
import fields from "./components/fields";
import widgets from "./components/widgets";
import validateFormData, { isValid } from "./validate";
export var ADDITIONAL_PROPERTY_FLAG = "__additional_property";
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
export function canExpand(schema, uiSchema, formData) {
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
export function getDefaultRegistry() {
  return {
    fields: fields,
    widgets: widgets,
    definitions: {},
    rootSchema: {},
    formContext: {}
  };
}
/* Gets the type of a given schema. */

export function getSchemaType(schema) {
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
export function getWidget(schema, widget) {
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

        return React.createElement(Widget, _extends({
          options: _objectSpread({}, defaultOptions, options)
        }, props));
      };
    }

    return Widget.MergedWidget;
  }

  if (typeof widget === "function" || ReactIs.isForwardRef(React.createElement(widget)) || ReactIs.isMemo(widget)) {
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
export function hasWidget(schema, widget) {
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
            var fillerEntries = fill(new Array(schema.minItems - defaultsLength), computeDefaults(fillerSchema, fillerSchema.defaults, rootSchema)); // then fill up the rest with either the item default or empty, up to minItems

            return defaultEntries.concat(fillerEntries);
          }
        } else {
          return defaults ? defaults : [];
        }
      }

  }

  return defaults;
}

export function getDefaultFormState(_schema, formData) {
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

export function mergeDefaultsWithFormData(defaults, formData) {
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
export function getUiOptions(uiSchema) {
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
export function getDisplayLabel(schema, uiSchema, rootSchema) {
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
export function isObject(thing) {
  if (typeof File !== "undefined" && thing instanceof File) {
    return false;
  }

  return _typeof(thing) === "object" && thing !== null && !Array.isArray(thing);
}
export function mergeObjects(obj1, obj2) {
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
export function asNumber(value) {
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
export function orderProperties(properties, order) {
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

export function isConstant(schema) {
  return Array.isArray(schema["enum"]) && schema["enum"].length === 1 || schema.hasOwnProperty("const");
}
export function toConstant(schema) {
  if (Array.isArray(schema["enum"]) && schema["enum"].length === 1) {
    return schema["enum"][0];
  } else if (schema.hasOwnProperty("const")) {
    return schema["const"];
  } else {
    throw new Error("schema cannot be inferred as a constant");
  }
}
export function isSelect(_schema) {
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
export function isMultiSelect(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!schema.uniqueItems || !schema.items) {
    return false;
  }

  return isSelect(schema.items, rootSchema);
}
export function isFilesArray(schema, uiSchema) {
  var rootSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (uiSchema["ui:widget"] === "files") {
    return true;
  } else if (schema.items) {
    var itemsSchema = retrieveSchema(schema.items, rootSchema);
    return itemsSchema.type === "string" && itemsSchema.format === "data-url";
  }

  return false;
}
export function isFixedItems(schema) {
  return Array.isArray(schema.items) && schema.items.length > 0 && schema.items.every(function (item) {
    return isObject(item);
  });
}
export function isCustomWidget(uiSchema) {
  return (// TODO: Remove the `&& uiSchema["ui:widget"] !== "hidden"` once we support hidden widgets for arrays.
    // https://react-jsonschema-form.readthedocs.io/en/latest/usage/widgets/#hidden-widgets
    "widget" in getUiOptions(uiSchema) && getUiOptions(uiSchema)["widget"] !== "hidden"
  );
}
export function allowAdditionalItems(schema) {
  if (schema.additionalItems === true) {
    console.warn("additionalItems=true is currently not supported");
  }

  return isObject(schema.additionalItems);
}
export function optionsList(schema) {
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
export function findSchemaDefinition($ref) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var origRef = $ref;

  if ($ref.startsWith("#")) {
    // Decode URI fragment representation.
    $ref = decodeURIComponent($ref.substring(1));
  } else {
    throw new Error("Could not find a definition for ".concat(origRef, "."));
  }

  var current = jsonpointer.get(rootSchema, $ref);

  if (current === undefined) {
    throw new Error("Could not find a definition for ".concat(origRef, "."));
  }

  if (current.hasOwnProperty("$ref")) {
    return findSchemaDefinition(current.$ref, rootSchema);
  }

  return current;
} // In the case where we have to implicitly create a schema, it is useful to know what type to use
//  based on the data we are defining

export var guessType = function guessType(value) {
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

export function stubExistingAdditionalProperties(schema) {
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

  var conditionalSchema = isValid(expression, formData, rootSchema) ? then : otherwise;

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


export function resolveSchema(schema) {
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

export function retrieveSchema(schema) {
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
      resolvedSchema = mergeAllOf(_objectSpread({}, resolvedSchema, {
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

      var _validateFormData = validateFormData(formData, conditionSchema),
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


export function mergeSchemas(obj1, obj2) {
  var acc = Object.assign({}, obj1); // Prevent mutation of source object.

  return Object.keys(obj2).reduce(function (acc, key) {
    var left = obj1 ? obj1[key] : {},
        right = obj2[key];

    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeSchemas(left, right);
    } else if (obj1 && obj2 && (getSchemaType(obj1) === "object" || getSchemaType(obj2) === "object") && key === "required" && Array.isArray(left) && Array.isArray(right)) {
      // Don't include duplicate values when merging
      // "required" fields.
      acc[key] = union(left, right);
    } else {
      acc[key] = right;
    }

    return acc;
  }, acc);
}

function isArguments(object) {
  return Object.prototype.toString.call(object) === "[object Arguments]";
}

export function deepEquals(a, b) {
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
export function shouldRender(comp, nextProps, nextState) {
  var props = comp.props,
      state = comp.state;
  return !deepEquals(props, nextProps) || !deepEquals(state, nextState);
}
export function toIdSchema(schema, id, rootSchema) {
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
export function toPathSchema(schema) {
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
export function parseDateString(dateString) {
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
export function toDateString(_ref2) {
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
export function utcToLocal(jsonDate) {
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
export function localToUTC(dateString) {
  if (dateString) {
    return new Date(dateString).toJSON();
  }
}
export function pad(num, size) {
  var s = String(num);

  while (s.length < size) {
    s = "0" + s;
  }

  return s;
}
export function dataURItoBlob(dataURI) {
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
export function rangeSpec(schema) {
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
export function getMatchingOption(formData, options, rootSchema) {
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

      if (isValid(augmentedSchema, formData, rootSchema)) {
        return _i2;
      }
    } else if (isValid(option, formData, rootSchema)) {
      return _i2;
    }
  }

  return 0;
} // Check to see if a schema specifies that a value must be true

export function schemaRequiresTrueValue(schema) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0SXMiLCJtZXJnZUFsbE9mIiwiZmlsbCIsInVuaW9uIiwianNvbnBvaW50ZXIiLCJmaWVsZHMiLCJ3aWRnZXRzIiwidmFsaWRhdGVGb3JtRGF0YSIsImlzVmFsaWQiLCJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJ3aWRnZXRNYXAiLCJjaGVja2JveCIsInJhZGlvIiwic2VsZWN0IiwiaGlkZGVuIiwic3RyaW5nIiwidGV4dCIsInBhc3N3b3JkIiwiZW1haWwiLCJob3N0bmFtZSIsImlwdjQiLCJpcHY2IiwidXJpIiwidGV4dGFyZWEiLCJkYXRlIiwiZGF0ZXRpbWUiLCJjb2xvciIsImZpbGUiLCJudW1iZXIiLCJ1cGRvd24iLCJyYW5nZSIsImludGVnZXIiLCJhcnJheSIsImNoZWNrYm94ZXMiLCJmaWxlcyIsImNhbkV4cGFuZCIsInNjaGVtYSIsInVpU2NoZW1hIiwiZm9ybURhdGEiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImdldFVpT3B0aW9ucyIsImV4cGFuZGFibGUiLCJtYXhQcm9wZXJ0aWVzIiwidW5kZWZpbmVkIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImdldERlZmF1bHRSZWdpc3RyeSIsImRlZmluaXRpb25zIiwicm9vdFNjaGVtYSIsImZvcm1Db250ZXh0IiwiZ2V0U2NoZW1hVHlwZSIsInR5cGUiLCJndWVzc1R5cGUiLCJwcm9wZXJ0aWVzIiwiQXJyYXkiLCJpbmNsdWRlcyIsImZpbmQiLCJnZXRXaWRnZXQiLCJ3aWRnZXQiLCJyZWdpc3RlcmVkV2lkZ2V0cyIsIm1lcmdlT3B0aW9ucyIsIldpZGdldCIsIk1lcmdlZFdpZGdldCIsImRlZmF1bHRPcHRpb25zIiwiZGVmYXVsdFByb3BzIiwib3B0aW9ucyIsInByb3BzIiwiaXNGb3J3YXJkUmVmIiwiY3JlYXRlRWxlbWVudCIsImlzTWVtbyIsIkVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJyZWdpc3RlcmVkV2lkZ2V0IiwiaGFzV2lkZ2V0IiwiZSIsIm1lc3NhZ2UiLCJzdGFydHNXaXRoIiwiY29tcHV0ZURlZmF1bHRzIiwiX3NjaGVtYSIsInBhcmVudERlZmF1bHRzIiwicmF3Rm9ybURhdGEiLCJpbmNsdWRlVW5kZWZpbmVkVmFsdWVzIiwiaXNPYmplY3QiLCJkZWZhdWx0cyIsIm1lcmdlT2JqZWN0cyIsInJlZlNjaGVtYSIsImZpbmRTY2hlbWFEZWZpbml0aW9uIiwiJHJlZiIsInJlc29sdmVkU2NoZW1hIiwicmVzb2x2ZURlcGVuZGVuY2llcyIsImlzRml4ZWRJdGVtcyIsIml0ZW1zIiwibWFwIiwiaXRlbVNjaGVtYSIsImlkeCIsImlzQXJyYXkiLCJvbmVPZiIsImdldE1hdGNoaW5nT3B0aW9uIiwiYW55T2YiLCJyZWR1Y2UiLCJhY2MiLCJrZXkiLCJjb21wdXRlZERlZmF1bHQiLCJpdGVtIiwiYWRkaXRpb25hbEl0ZW1zIiwibWluSXRlbXMiLCJpc011bHRpU2VsZWN0IiwiZGVmYXVsdHNMZW5ndGgiLCJkZWZhdWx0RW50cmllcyIsImZpbGxlclNjaGVtYSIsImZpbGxlckVudHJpZXMiLCJjb25jYXQiLCJnZXREZWZhdWx0Rm9ybVN0YXRlIiwicmV0cmlldmVTY2hlbWEiLCJtZXJnZURlZmF1bHRzV2l0aEZvcm1EYXRhIiwidmFsdWUiLCJhc3NpZ24iLCJmaWx0ZXIiLCJpbmRleE9mIiwiY29uc29sZSIsIndhcm4iLCJjb21wb25lbnQiLCJzdWJzdHJpbmciLCJnZXREaXNwbGF5TGFiZWwiLCJ1aU9wdGlvbnMiLCJsYWJlbCIsImRpc3BsYXlMYWJlbCIsInNjaGVtYVR5cGUiLCJpc0ZpbGVzQXJyYXkiLCJpc0N1c3RvbVdpZGdldCIsInRoaW5nIiwiRmlsZSIsIm9iajEiLCJvYmoyIiwiY29uY2F0QXJyYXlzIiwibGVmdCIsInJpZ2h0IiwiYXNOdW1iZXIiLCJ0ZXN0IiwibiIsIk51bWJlciIsInZhbGlkIiwiaXNOYU4iLCJvcmRlclByb3BlcnRpZXMiLCJvcmRlciIsImFycmF5VG9IYXNoIiwiYXJyIiwicHJldiIsImN1cnIiLCJlcnJvclByb3BMaXN0Iiwiam9pbiIsInByb3BlcnR5SGFzaCIsIm9yZGVyRmlsdGVyZWQiLCJwcm9wIiwib3JkZXJIYXNoIiwicmVzdCIsInJlc3RJbmRleCIsImxhc3RJbmRleE9mIiwiY29tcGxldGUiLCJzcGxpY2UiLCJpc0NvbnN0YW50IiwidG9Db25zdGFudCIsImlzU2VsZWN0IiwiYWx0U2NoZW1hcyIsImV2ZXJ5IiwidW5pcXVlSXRlbXMiLCJpdGVtc1NjaGVtYSIsImZvcm1hdCIsImFsbG93QWRkaXRpb25hbEl0ZW1zIiwib3B0aW9uc0xpc3QiLCJpIiwiZW51bU5hbWVzIiwiU3RyaW5nIiwidGl0bGUiLCJvcmlnUmVmIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiY3VycmVudCIsImdldCIsInN0dWJFeGlzdGluZ0FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZm9yRWFjaCIsInJlc29sdmVDb25kaXRpb24iLCJleHByZXNzaW9uIiwidGhlbiIsIm90aGVyd2lzZSIsInJlc29sdmVkU2NoZW1hTGVzc0NvbmRpdGlvbmFsIiwiY29uZGl0aW9uYWxTY2hlbWEiLCJtZXJnZVNjaGVtYXMiLCJyZXNvbHZlU2NoZW1hIiwicmVzb2x2ZVJlZmVyZW5jZSIsImFsbE9mIiwiYWxsT2ZTdWJzY2hlbWEiLCIkcmVmU2NoZW1hIiwibG9jYWxTY2hlbWEiLCJyZXNvbHZlZFNjaGVtYVdpdGhvdXRBbGxPZiIsImhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZGVwZW5kZW5jaWVzIiwicHJvY2Vzc0RlcGVuZGVuY2llcyIsImRlcGVuZGVuY3lLZXkiLCJkZXBlbmRlbmN5VmFsdWUiLCJyZW1haW5pbmdEZXBlbmRlbmNpZXMiLCJ3aXRoRGVwZW5kZW50UHJvcGVydGllcyIsIndpdGhEZXBlbmRlbnRTY2hlbWEiLCJhZGRpdGlvbmFsbHlSZXF1aXJlZCIsInJlcXVpcmVkIiwiZnJvbSIsIlNldCIsImRlcGVuZGVudFNjaGVtYSIsInJlc29sdmVkT25lT2YiLCJzdWJzY2hlbWEiLCJ3aXRoRXhhY3RseU9uZVN1YnNjaGVtYSIsInZhbGlkU3Vic2NoZW1hcyIsImNvbmRpdGlvblByb3BlcnR5U2NoZW1hIiwiY29uZGl0aW9uU2NoZW1hIiwiZXJyb3JzIiwiZGVwZW5kZW50U3Vic2NoZW1hIiwiaXNBcmd1bWVudHMiLCJvYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJkZWVwRXF1YWxzIiwiYSIsImIiLCJjYSIsImNiIiwiRGF0ZSIsImdldFRpbWUiLCJSZWdFeHAiLCJzb3VyY2UiLCJnbG9iYWwiLCJtdWx0aWxpbmUiLCJsYXN0SW5kZXgiLCJpZ25vcmVDYXNlIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsImthIiwia2IiLCJjYWwiLCJwdXNoIiwic29ydCIsImoiLCJrIiwicG9wIiwic2hvdWxkUmVuZGVyIiwiY29tcCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInN0YXRlIiwidG9JZFNjaGVtYSIsImlkIiwiaWRQcmVmaXgiLCJpZFNlcGFyYXRvciIsImlkU2NoZW1hIiwiJGlkIiwibmFtZSIsImZpZWxkIiwiZmllbGRJZCIsInRvUGF0aFNjaGVtYSIsInBhdGhTY2hlbWEiLCIkbmFtZSIsInJlcGxhY2UiLCJfX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMiLCJlbGVtZW50IiwicHJvcGVydHkiLCJwYXJzZURhdGVTdHJpbmciLCJkYXRlU3RyaW5nIiwiaW5jbHVkZVRpbWUiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImdldFVUQ0RhdGUiLCJnZXRVVENIb3VycyIsImdldFVUQ01pbnV0ZXMiLCJnZXRVVENTZWNvbmRzIiwidG9EYXRlU3RyaW5nIiwidGltZSIsInV0Y1RpbWUiLCJVVEMiLCJ0b0pTT04iLCJ1dGNUb0xvY2FsIiwianNvbkRhdGUiLCJ5eXl5IiwicGFkIiwiZ2V0RnVsbFllYXIiLCJNTSIsImdldE1vbnRoIiwiZGQiLCJnZXREYXRlIiwiaGgiLCJnZXRIb3VycyIsIm1tIiwiZ2V0TWludXRlcyIsInNzIiwiZ2V0U2Vjb25kcyIsIlNTUyIsImdldE1pbGxpc2Vjb25kcyIsImxvY2FsVG9VVEMiLCJudW0iLCJzaXplIiwicyIsImRhdGFVUkl0b0Jsb2IiLCJkYXRhVVJJIiwic3BsaXR0ZWQiLCJzcGxpdCIsInBhcmFtcyIsInBhcmFtIiwiYmluYXJ5IiwiYXRvYiIsImNoYXJDb2RlQXQiLCJibG9iIiwid2luZG93IiwiQmxvYiIsIlVpbnQ4QXJyYXkiLCJyYW5nZVNwZWMiLCJzcGVjIiwibXVsdGlwbGVPZiIsInN0ZXAiLCJtaW5pbXVtIiwibWluIiwibWF4aW11bSIsIm1heCIsIm9wdGlvbiIsInJlcXVpcmVzQW55T2YiLCJhdWdtZW50ZWRTY2hlbWEiLCJzaGFsbG93Q2xvbmUiLCJzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZSIsInNvbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPLEtBQUtDLE9BQVosTUFBeUIsVUFBekI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLHlCQUF2QjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsa0NBQWpCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixjQUFsQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsYUFBeEI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLHFCQUFuQjtBQUNBLE9BQU9DLE9BQVAsTUFBb0Isc0JBQXBCO0FBQ0EsT0FBT0MsZ0JBQVAsSUFBMkJDLE9BQTNCLFFBQTBDLFlBQTFDO0FBRUEsT0FBTyxJQUFNQyx3QkFBd0IsR0FBRyx1QkFBakM7QUFFUCxJQUFNQyxTQUFTLEdBQUc7QUFDaEIsYUFBUztBQUNQQyxJQUFBQSxRQUFRLEVBQUUsZ0JBREg7QUFFUEMsSUFBQUEsS0FBSyxFQUFFLGFBRkE7QUFHUEMsSUFBQUEsTUFBTSxFQUFFLGNBSEQ7QUFJUEMsSUFBQUEsTUFBTSxFQUFFO0FBSkQsR0FETztBQU9oQkMsRUFBQUEsTUFBTSxF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QUVEOztBQUNBLE9BQU8sU0FBU2dLLHVCQUFULENBQWlDdlMsTUFBakMsRUFBeUM7QUFDOUM7QUFDQSxNQUFJQSxNQUFNLFNBQVYsRUFBa0I7QUFDaEIsV0FBTyxJQUFQO0FBQ0QsR0FKNkMsQ0FNOUM7OztBQUNBLE1BQUlBLE1BQU0sUUFBTixJQUFlQSxNQUFNLFFBQU4sQ0FBWVUsTUFBWixLQUF1QixDQUF0QyxJQUEyQ1YsTUFBTSxRQUFOLENBQVksQ0FBWixNQUFtQixJQUFsRSxFQUF3RTtBQUN0RSxXQUFPLElBQVA7QUFDRCxHQVQ2QyxDQVc5Qzs7O0FBQ0EsTUFBSUEsTUFBTSxDQUFDK0QsS0FBUCxJQUFnQi9ELE1BQU0sQ0FBQytELEtBQVAsQ0FBYXJELE1BQWIsS0FBd0IsQ0FBNUMsRUFBK0M7QUFDN0MsV0FBTzZSLHVCQUF1QixDQUFDdlMsTUFBTSxDQUFDK0QsS0FBUCxDQUFhLENBQWIsQ0FBRCxDQUE5QjtBQUNELEdBZDZDLENBZ0I5Qzs7O0FBQ0EsTUFBSS9ELE1BQU0sQ0FBQzZELEtBQVAsSUFBZ0I3RCxNQUFNLENBQUM2RCxLQUFQLENBQWFuRCxNQUFiLEtBQXdCLENBQTVDLEVBQStDO0FBQzdDLFdBQU82Uix1QkFBdUIsQ0FBQ3ZTLE1BQU0sQ0FBQzZELEtBQVAsQ0FBYSxDQUFiLENBQUQsQ0FBOUI7QUFDRCxHQW5CNkMsQ0FxQjlDO0FBQ0E7OztBQUNBLE1BQUk3RCxNQUFNLENBQUMwSixLQUFYLEVBQWtCO0FBQ2hCLFdBQU8xSixNQUFNLENBQUMwSixLQUFQLENBQWE4SSxJQUFiLENBQWtCRCx1QkFBbEIsQ0FBUDtBQUNEOztBQUVELFNBQU8sS0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdElzIGZyb20gXCJyZWFjdC1pc1wiO1xyXG5pbXBvcnQgbWVyZ2VBbGxPZiBmcm9tIFwianNvbi1zY2hlbWEtbWVyZ2UtYWxsb2ZcIjtcclxuaW1wb3J0IGZpbGwgZnJvbSBcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9hcnJheS9maWxsXCI7XHJcbmltcG9ydCB1bmlvbiBmcm9tIFwibG9kYXNoL3VuaW9uXCI7XHJcbmltcG9ydCBqc29ucG9pbnRlciBmcm9tIFwianNvbnBvaW50ZXJcIjtcclxuaW1wb3J0IGZpZWxkcyBmcm9tIFwiLi9jb21wb25lbnRzL2ZpZWxkc1wiO1xyXG5pbXBvcnQgd2lkZ2V0cyBmcm9tIFwiLi9jb21wb25lbnRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHZhbGlkYXRlRm9ybURhdGEsIHsgaXNWYWxpZCB9IGZyb20gXCIuL3ZhbGlkYXRlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHID0gXCJfX2FkZGl0aW9uYWxfcHJvcGVydHlcIjtcclxuXHJcbmNvbnN0IHdpZGdldE1hcCA9IHtcclxuICBib29sZWFuOiB7XHJcbiAgICBjaGVja2JveDogXCJDaGVja2JveFdpZGdldFwiLFxyXG4gICAgcmFkaW86IFwiUmFkaW9XaWRnZXRcIixcclxuICAgIHNlbGVjdDogXCJTZWxlY3RXaWRnZXRcIixcclxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcclxuICB9LFxyXG4gIHN0cmluZzoge1xyXG4gICAgdGV4dDogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICBwYXNzd29yZDogXCJQYXNzd29yZFdpZGdldFwiLFxyXG4gICAgZW1haWw6IFwiRW1haWxXaWRnZXRcIixcclxuICAgIGhvc3RuYW1lOiBcIlRleHRXaWRnZXRcIixcclxuICAgIGlwdjQ6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgaXB2NjogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICB1cmk6IFwiVVJMV2lkZ2V0XCIsXHJcbiAgICBcImRhdGEtdXJsXCI6IFwiRmlsZVdpZGdldFwiLFxyXG4gICAgcmFkaW86IFwiUmFkaW9XaWRnZXRcIixcclxuICAgIHNlbGVjdDogXCJTZWxlY3RXaWRnZXRcIixcclxuICAgIHRleHRhcmVhOiBcIlRleHRhcmVhV2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgICBkYXRlOiBcIkRhdGVXaWRnZXRcIixcclxuICAgIGRhdGV0aW1lOiBcIkRhdGVUaW1lV2lkZ2V0XCIsXHJcbiAgICBcImRhdGUtdGltZVwiOiBcIkRhdGVUaW1lV2lkZ2V0XCIsXHJcbiAgICBcImFsdC1kYXRlXCI6IFwiQWx0RGF0ZVdpZGdldFwiLFxyXG4gICAgXCJhbHQtZGF0ZXRpbWVcIjogXCJBbHREYXRlVGltZVdpZGdldFwiLFxyXG4gICAgY29sb3I6IFwiQ29sb3JXaWRnZXRcIixcclxuICAgIGZpbGU6IFwiRmlsZVdpZGdldFwiLFxyXG4gIH0sXHJcbiAgbnVtYmVyOiB7XHJcbiAgICB0ZXh0OiBcIlRleHRXaWRnZXRcIixcclxuICAgIHNlbGVjdDogXCJTZWxlY3RXaWRnZXRcIixcclxuICAgIHVwZG93bjogXCJVcERvd25XaWRnZXRcIixcclxuICAgIHJhbmdlOiBcIlJhbmdlV2lkZ2V0XCIsXHJcbiAgICByYWRpbzogXCJSYWRpb1dpZGdldFwiLFxyXG4gICAgaGlkZGVuOiBcIkhpZGRlbldpZGdldFwiLFxyXG4gIH0sXHJcbiAgaW50ZWdlcjoge1xyXG4gICAgdGV4dDogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICB1cGRvd246IFwiVXBEb3duV2lkZ2V0XCIsXHJcbiAgICByYW5nZTogXCJSYW5nZVdpZGdldFwiLFxyXG4gICAgcmFkaW86IFwiUmFkaW9XaWRnZXRcIixcclxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcclxuICB9LFxyXG4gIGFycmF5OiB7XHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICBjaGVja2JveGVzOiBcIkNoZWNrYm94ZXNXaWRnZXRcIixcclxuICAgIGZpbGVzOiBcIkZpbGVXaWRnZXRcIixcclxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbkV4cGFuZChzY2hlbWEsIHVpU2NoZW1hLCBmb3JtRGF0YSkge1xyXG4gIGlmICghc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGNvbnN0IHsgZXhwYW5kYWJsZSB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICBpZiAoZXhwYW5kYWJsZSA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiBleHBhbmRhYmxlO1xyXG4gIH1cclxuICAvLyBpZiB1aTpvcHRpb25zLmV4cGFuZGFibGUgd2FzIG5vdCBleHBsaWNpdGx5IHNldCB0byBmYWxzZSwgd2UgY2FuIGFkZFxyXG4gIC8vIGFub3RoZXIgcHJvcGVydHkgaWYgd2UgaGF2ZSBub3QgZXhjZWVkZWQgbWF4UHJvcGVydGllcyB5ZXRcclxuICBpZiAoc2NoZW1hLm1heFByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvcm1EYXRhKS5sZW5ndGggPCBzY2hlbWEubWF4UHJvcGVydGllcztcclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0UmVnaXN0cnkoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGZpZWxkcyxcclxuICAgIHdpZGdldHMsXHJcbiAgICBkZWZpbml0aW9uczoge30sXHJcbiAgICByb290U2NoZW1hOiB7fSxcclxuICAgIGZvcm1Db250ZXh0OiB7fSxcclxuICB9O1xyXG59XHJcblxyXG4vKiBHZXRzIHRoZSB0eXBlIG9mIGEgZ2l2ZW4gc2NoZW1hLiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NoZW1hVHlwZShzY2hlbWEpIHtcclxuICBsZXQgeyB0eXBlIH0gPSBzY2hlbWE7XHJcblxyXG4gIGlmICghdHlwZSAmJiBzY2hlbWEuY29uc3QpIHtcclxuICAgIHJldHVybiBndWVzc1R5cGUoc2NoZW1hLmNvbnN0KTtcclxuICB9XHJcblxyXG4gIGlmICghdHlwZSAmJiBzY2hlbWEuZW51bSkge1xyXG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XHJcbiAgfVxyXG5cclxuICBpZiAoIXR5cGUgJiYgKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykpIHtcclxuICAgIHJldHVybiBcIm9iamVjdFwiO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGUgaW5zdGFuY2VvZiBBcnJheSAmJiB0eXBlLmxlbmd0aCA9PT0gMiAmJiB0eXBlLmluY2x1ZGVzKFwibnVsbFwiKSkge1xyXG4gICAgcmV0dXJuIHR5cGUuZmluZCh0eXBlID0+IHR5cGUgIT09IFwibnVsbFwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0eXBlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2lkZ2V0KHNjaGVtYSwgd2lkZ2V0LCByZWdpc3RlcmVkV2lkZ2V0cyA9IHt9KSB7XHJcbiAgY29uc3QgdHlwZSA9IGdldFNjaGVtYVR5cGUoc2NoZW1hKTtcclxuXHJcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKFdpZGdldCkge1xyXG4gICAgLy8gY2FjaGUgcmV0dXJuIHZhbHVlIGFzIHByb3BlcnR5IG9mIHdpZGdldCBmb3IgcHJvcGVyIHJlYWN0IHJlY29uY2lsaWF0aW9uXHJcbiAgICBpZiAoIVdpZGdldC5NZXJnZWRXaWRnZXQpIHtcclxuICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPVxyXG4gICAgICAgIChXaWRnZXQuZGVmYXVsdFByb3BzICYmIFdpZGdldC5kZWZhdWx0UHJvcHMub3B0aW9ucykgfHwge307XHJcbiAgICAgIFdpZGdldC5NZXJnZWRXaWRnZXQgPSAoeyBvcHRpb25zID0ge30sIC4uLnByb3BzIH0pID0+IChcclxuICAgICAgICA8V2lkZ2V0IG9wdGlvbnM9e3sgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfX0gey4uLnByb3BzfSAvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFdpZGdldC5NZXJnZWRXaWRnZXQ7XHJcbiAgfVxyXG5cclxuICBpZiAoXHJcbiAgICB0eXBlb2Ygd2lkZ2V0ID09PSBcImZ1bmN0aW9uXCIgfHxcclxuICAgIFJlYWN0SXMuaXNGb3J3YXJkUmVmKFJlYWN0LmNyZWF0ZUVsZW1lbnQod2lkZ2V0KSkgfHxcclxuICAgIFJlYWN0SXMuaXNNZW1vKHdpZGdldClcclxuICApIHtcclxuICAgIHJldHVybiBtZXJnZU9wdGlvbnMod2lkZ2V0KTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygd2lkZ2V0ICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIHdpZGdldCBkZWZpbml0aW9uOiAke3R5cGVvZiB3aWRnZXR9YCk7XHJcbiAgfVxyXG5cclxuICBpZiAocmVnaXN0ZXJlZFdpZGdldHMuaGFzT3duUHJvcGVydHkod2lkZ2V0KSkge1xyXG4gICAgY29uc3QgcmVnaXN0ZXJlZFdpZGdldCA9IHJlZ2lzdGVyZWRXaWRnZXRzW3dpZGdldF07XHJcbiAgICByZXR1cm4gZ2V0V2lkZ2V0KHNjaGVtYSwgcmVnaXN0ZXJlZFdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCF3aWRnZXRNYXAuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gd2lkZ2V0IGZvciB0eXBlIFwiJHt0eXBlfVwiYCk7XHJcbiAgfVxyXG5cclxuICBpZiAod2lkZ2V0TWFwW3R5cGVdLmhhc093blByb3BlcnR5KHdpZGdldCkpIHtcclxuICAgIGNvbnN0IHJlZ2lzdGVyZWRXaWRnZXQgPSByZWdpc3RlcmVkV2lkZ2V0c1t3aWRnZXRNYXBbdHlwZV1bd2lkZ2V0XV07XHJcbiAgICByZXR1cm4gZ2V0V2lkZ2V0KHNjaGVtYSwgcmVnaXN0ZXJlZFdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMpO1xyXG4gIH1cclxuXHJcbiAgdGhyb3cgbmV3IEVycm9yKGBObyB3aWRnZXQgXCIke3dpZGdldH1cIiBmb3IgdHlwZSBcIiR7dHlwZX1cImApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFzV2lkZ2V0KHNjaGVtYSwgd2lkZ2V0LCByZWdpc3RlcmVkV2lkZ2V0cyA9IHt9KSB7XHJcbiAgdHJ5IHtcclxuICAgIGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgaWYgKFxyXG4gICAgICBlLm1lc3NhZ2UgJiZcclxuICAgICAgKGUubWVzc2FnZS5zdGFydHNXaXRoKFwiTm8gd2lkZ2V0XCIpIHx8XHJcbiAgICAgICAgZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCJVbnN1cHBvcnRlZCB3aWRnZXRcIikpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVEZWZhdWx0cyhcclxuICBfc2NoZW1hLFxyXG4gIHBhcmVudERlZmF1bHRzLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgcmF3Rm9ybURhdGEgPSB7fSxcclxuICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzID0gZmFsc2VcclxuKSB7XHJcbiAgbGV0IHNjaGVtYSA9IGlzT2JqZWN0KF9zY2hlbWEpID8gX3NjaGVtYSA6IHt9O1xyXG4gIGNvbnN0IGZvcm1EYXRhID0gaXNPYmplY3QocmF3Rm9ybURhdGEpID8gcmF3Rm9ybURhdGEgOiB7fTtcclxuICAvLyBDb21wdXRlIHRoZSBkZWZhdWx0cyByZWN1cnNpdmVseTogZ2l2ZSBoaWdoZXN0IHByaW9yaXR5IHRvIGRlZXBlc3Qgbm9kZXMuXHJcbiAgbGV0IGRlZmF1bHRzID0gcGFyZW50RGVmYXVsdHM7XHJcbiAgaWYgKGlzT2JqZWN0KGRlZmF1bHRzKSAmJiBpc09iamVjdChzY2hlbWEuZGVmYXVsdCkpIHtcclxuICAgIC8vIEZvciBvYmplY3QgZGVmYXVsdHMsIG9ubHkgb3ZlcnJpZGUgcGFyZW50IGRlZmF1bHRzIHRoYXQgYXJlIGRlZmluZWQgaW5cclxuICAgIC8vIHNjaGVtYS5kZWZhdWx0LlxyXG4gICAgZGVmYXVsdHMgPSBtZXJnZU9iamVjdHMoZGVmYXVsdHMsIHNjaGVtYS5kZWZhdWx0KTtcclxuICB9IGVsc2UgaWYgKFwiZGVmYXVsdFwiIGluIHNjaGVtYSkge1xyXG4gICAgLy8gVXNlIHNjaGVtYSBkZWZhdWx0cyBmb3IgdGhpcyBub2RlLlxyXG4gICAgZGVmYXVsdHMgPSBzY2hlbWEuZGVmYXVsdDtcclxuICB9IGVsc2UgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSkge1xyXG4gICAgLy8gVXNlIHJlZmVyZW5jZWQgc2NoZW1hIGRlZmF1bHRzIGZvciB0aGlzIG5vZGUuXHJcbiAgICBjb25zdCByZWZTY2hlbWEgPSBmaW5kU2NoZW1hRGVmaW5pdGlvbihzY2hlbWEuJHJlZiwgcm9vdFNjaGVtYSk7XHJcbiAgICByZXR1cm4gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICByZWZTY2hlbWEsXHJcbiAgICAgIGRlZmF1bHRzLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKFwiZGVwZW5kZW5jaWVzXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBjb25zdCByZXNvbHZlZFNjaGVtYSA9IHJlc29sdmVEZXBlbmRlbmNpZXMoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICByZXNvbHZlZFNjaGVtYSxcclxuICAgICAgZGVmYXVsdHMsXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAoaXNGaXhlZEl0ZW1zKHNjaGVtYSkpIHtcclxuICAgIGRlZmF1bHRzID0gc2NoZW1hLml0ZW1zLm1hcCgoaXRlbVNjaGVtYSwgaWR4KSA9PlxyXG4gICAgICBjb21wdXRlRGVmYXVsdHMoXHJcbiAgICAgICAgaXRlbVNjaGVtYSxcclxuICAgICAgICBBcnJheS5pc0FycmF5KHBhcmVudERlZmF1bHRzKSA/IHBhcmVudERlZmF1bHRzW2lkeF0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgICBmb3JtRGF0YSxcclxuICAgICAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChcIm9uZU9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBzY2hlbWEgPVxyXG4gICAgICBzY2hlbWEub25lT2ZbZ2V0TWF0Y2hpbmdPcHRpb24odW5kZWZpbmVkLCBzY2hlbWEub25lT2YsIHJvb3RTY2hlbWEpXTtcclxuICB9IGVsc2UgaWYgKFwiYW55T2ZcIiBpbiBzY2hlbWEpIHtcclxuICAgIHNjaGVtYSA9XHJcbiAgICAgIHNjaGVtYS5hbnlPZltnZXRNYXRjaGluZ09wdGlvbih1bmRlZmluZWQsIHNjaGVtYS5hbnlPZiwgcm9vdFNjaGVtYSldO1xyXG4gIH1cclxuXHJcbiAgLy8gTm90IGRlZmF1bHRzIGRlZmluZWQgZm9yIHRoaXMgbm9kZSwgZmFsbGJhY2sgdG8gZ2VuZXJpYyB0eXBlZCBvbmVzLlxyXG4gIGlmICh0eXBlb2YgZGVmYXVsdHMgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGRlZmF1bHRzID0gc2NoZW1hLmRlZmF1bHQ7XHJcbiAgfVxyXG5cclxuICBzd2l0Y2ggKGdldFNjaGVtYVR5cGUoc2NoZW1hKSkge1xyXG4gICAgLy8gV2UgbmVlZCB0byByZWN1ciBmb3Igb2JqZWN0IHNjaGVtYSBpbm5lciBkZWZhdWx0IHZhbHVlcy5cclxuICAgIGNhc2UgXCJvYmplY3RcIjpcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgZGVmYXVsdHMgZm9yIHRoaXMgbm9kZSwgd2l0aCB0aGUgcGFyZW50IGRlZmF1bHRzIHdlIG1pZ2h0XHJcbiAgICAgICAgLy8gaGF2ZSBmcm9tIGEgcHJldmlvdXMgcnVuOiBkZWZhdWx0c1trZXldLlxyXG4gICAgICAgIGxldCBjb21wdXRlZERlZmF1bHQgPSBjb21wdXRlRGVmYXVsdHMoXHJcbiAgICAgICAgICBzY2hlbWEucHJvcGVydGllc1trZXldLFxyXG4gICAgICAgICAgKGRlZmF1bHRzIHx8IHt9KVtrZXldLFxyXG4gICAgICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgICAgIChmb3JtRGF0YSB8fCB7fSlba2V5XSxcclxuICAgICAgICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChpbmNsdWRlVW5kZWZpbmVkVmFsdWVzIHx8IGNvbXB1dGVkRGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBhY2Nba2V5XSA9IGNvbXB1dGVkRGVmYXVsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgfSwge30pO1xyXG5cclxuICAgIGNhc2UgXCJhcnJheVwiOlxyXG4gICAgICAvLyBJbmplY3QgZGVmYXVsdHMgaW50byBleGlzdGluZyBhcnJheSBkZWZhdWx0c1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkZWZhdWx0cykpIHtcclxuICAgICAgICBkZWZhdWx0cyA9IGRlZmF1bHRzLm1hcCgoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICAgICAgICBzY2hlbWEuaXRlbXNbaWR4XSB8fCBzY2hlbWEuYWRkaXRpb25hbEl0ZW1zIHx8IHt9LFxyXG4gICAgICAgICAgICBpdGVtLFxyXG4gICAgICAgICAgICByb290U2NoZW1hXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBEZWVwbHkgaW5qZWN0IGRlZmF1bHRzIGludG8gYWxyZWFkeSBleGlzdGluZyBmb3JtIGRhdGFcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmF3Rm9ybURhdGEpKSB7XHJcbiAgICAgICAgZGVmYXVsdHMgPSByYXdGb3JtRGF0YS5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgICAgICAgc2NoZW1hLml0ZW1zLFxyXG4gICAgICAgICAgICAoZGVmYXVsdHMgfHwge30pW2lkeF0sXHJcbiAgICAgICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgICAgIGl0ZW1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNjaGVtYS5taW5JdGVtcykge1xyXG4gICAgICAgIGlmICghaXNNdWx0aVNlbGVjdChzY2hlbWEsIHJvb3RTY2hlbWEpKSB7XHJcbiAgICAgICAgICBjb25zdCBkZWZhdWx0c0xlbmd0aCA9IGRlZmF1bHRzID8gZGVmYXVsdHMubGVuZ3RoIDogMDtcclxuICAgICAgICAgIGlmIChzY2hlbWEubWluSXRlbXMgPiBkZWZhdWx0c0xlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0RW50cmllcyA9IGRlZmF1bHRzIHx8IFtdO1xyXG4gICAgICAgICAgICAvLyBwb3B1bGF0ZSB0aGUgYXJyYXkgd2l0aCB0aGUgZGVmYXVsdHNcclxuICAgICAgICAgICAgY29uc3QgZmlsbGVyU2NoZW1hID0gQXJyYXkuaXNBcnJheShzY2hlbWEuaXRlbXMpXHJcbiAgICAgICAgICAgICAgPyBzY2hlbWEuYWRkaXRpb25hbEl0ZW1zXHJcbiAgICAgICAgICAgICAgOiBzY2hlbWEuaXRlbXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGxlckVudHJpZXMgPSBmaWxsKFxyXG4gICAgICAgICAgICAgIG5ldyBBcnJheShzY2hlbWEubWluSXRlbXMgLSBkZWZhdWx0c0xlbmd0aCksXHJcbiAgICAgICAgICAgICAgY29tcHV0ZURlZmF1bHRzKGZpbGxlclNjaGVtYSwgZmlsbGVyU2NoZW1hLmRlZmF1bHRzLCByb290U2NoZW1hKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyB0aGVuIGZpbGwgdXAgdGhlIHJlc3Qgd2l0aCBlaXRoZXIgdGhlIGl0ZW0gZGVmYXVsdCBvciBlbXB0eSwgdXAgdG8gbWluSXRlbXNcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RW50cmllcy5jb25jYXQoZmlsbGVyRW50cmllcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBkZWZhdWx0cyA/IGRlZmF1bHRzIDogW107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBkZWZhdWx0cztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRGb3JtU3RhdGUoXHJcbiAgX3NjaGVtYSxcclxuICBmb3JtRGF0YSxcclxuICByb290U2NoZW1hID0ge30sXHJcbiAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyA9IGZhbHNlXHJcbikge1xyXG4gIGlmICghaXNPYmplY3QoX3NjaGVtYSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2NoZW1hOiBcIiArIF9zY2hlbWEpO1xyXG4gIH1cclxuICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShfc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgY29uc3QgZGVmYXVsdHMgPSBjb21wdXRlRGVmYXVsdHMoXHJcbiAgICBzY2hlbWEsXHJcbiAgICBfc2NoZW1hLmRlZmF1bHQsXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGEsXHJcbiAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXHJcbiAgKTtcclxuICBpZiAodHlwZW9mIGZvcm1EYXRhID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAvLyBObyBmb3JtIGRhdGE/IFVzZSBzY2hlbWEgZGVmYXVsdHMuXHJcbiAgICByZXR1cm4gZGVmYXVsdHM7XHJcbiAgfVxyXG4gIGlmIChpc09iamVjdChmb3JtRGF0YSkgfHwgQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcclxuICAgIHJldHVybiBtZXJnZURlZmF1bHRzV2l0aEZvcm1EYXRhKGRlZmF1bHRzLCBmb3JtRGF0YSk7XHJcbiAgfVxyXG4gIGlmIChmb3JtRGF0YSA9PT0gMCB8fCBmb3JtRGF0YSA9PT0gZmFsc2UgfHwgZm9ybURhdGEgPT09IFwiXCIpIHtcclxuICAgIHJldHVybiBmb3JtRGF0YTtcclxuICB9XHJcbiAgcmV0dXJuIGZvcm1EYXRhIHx8IGRlZmF1bHRzO1xyXG59XHJcblxyXG4vKipcclxuICogV2hlbiBtZXJnaW5nIGRlZmF1bHRzIGFuZCBmb3JtIGRhdGEsIHdlIHdhbnQgdG8gbWVyZ2UgaW4gdGhpcyBzcGVjaWZpYyB3YXk6XHJcbiAqIC0gb2JqZWN0cyBhcmUgZGVlcGx5IG1lcmdlZFxyXG4gKiAtIGFycmF5cyBhcmUgbWVyZ2VkIGluIHN1Y2ggYSB3YXkgdGhhdDpcclxuICogICAtIHdoZW4gdGhlIGFycmF5IGlzIHNldCBpbiBmb3JtIGRhdGEsIG9ubHkgYXJyYXkgZW50cmllcyBzZXQgaW4gZm9ybSBkYXRhXHJcbiAqICAgICBhcmUgZGVlcGx5IG1lcmdlZDsgYWRkaXRpb25hbCBlbnRyaWVzIGZyb20gdGhlIGRlZmF1bHRzIGFyZSBpZ25vcmVkXHJcbiAqICAgLSB3aGVuIHRoZSBhcnJheSBpcyBub3Qgc2V0IGluIGZvcm0gZGF0YSwgdGhlIGRlZmF1bHQgaXMgY29waWVkIG92ZXJcclxuICogLSBzY2FsYXJzIGFyZSBvdmVyd3JpdHRlbi9zZXQgYnkgZm9ybSBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YShkZWZhdWx0cywgZm9ybURhdGEpIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShkZWZhdWx0cykpIHtcclxuICAgICAgZGVmYXVsdHMgPSBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtRGF0YS5tYXAoKHZhbHVlLCBpZHgpID0+IHtcclxuICAgICAgaWYgKGRlZmF1bHRzW2lkeF0pIHtcclxuICAgICAgICByZXR1cm4gbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YShkZWZhdWx0c1tpZHhdLCB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmIChpc09iamVjdChmb3JtRGF0YSkpIHtcclxuICAgIGNvbnN0IGFjYyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzKTsgLy8gUHJldmVudCBtdXRhdGlvbiBvZiBzb3VyY2Ugb2JqZWN0LlxyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvcm1EYXRhKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcbiAgICAgIGFjY1trZXldID0gbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YShcclxuICAgICAgICBkZWZhdWx0cyA/IGRlZmF1bHRzW2tleV0gOiB7fSxcclxuICAgICAgICBmb3JtRGF0YVtrZXldXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCBhY2MpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZm9ybURhdGE7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKSB7XHJcbiAgLy8gZ2V0IGFsbCBwYXNzZWQgb3B0aW9ucyBmcm9tIHVpOndpZGdldCwgdWk6b3B0aW9ucywgYW5kIHVpOjxvcHRpb25OYW1lPlxyXG4gIHJldHVybiBPYmplY3Qua2V5cyh1aVNjaGVtYSlcclxuICAgIC5maWx0ZXIoa2V5ID0+IGtleS5pbmRleE9mKFwidWk6XCIpID09PSAwKVxyXG4gICAgLnJlZHVjZSgob3B0aW9ucywga2V5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdWlTY2hlbWFba2V5XTtcclxuICAgICAgaWYgKGtleSA9PT0gXCJ1aTp3aWRnZXRcIiAmJiBpc09iamVjdCh2YWx1ZSkpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgICBcIlNldHRpbmcgb3B0aW9ucyB2aWEgdWk6d2lkZ2V0IG9iamVjdCBpcyBkZXByZWNhdGVkLCB1c2UgdWk6b3B0aW9ucyBpbnN0ZWFkXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgICAgLi4uKHZhbHVlLm9wdGlvbnMgfHwge30pLFxyXG4gICAgICAgICAgd2lkZ2V0OiB2YWx1ZS5jb21wb25lbnQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoa2V5ID09PSBcInVpOm9wdGlvbnNcIiAmJiBpc09iamVjdCh2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4geyAuLi5vcHRpb25zLCAuLi52YWx1ZSB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7IC4uLm9wdGlvbnMsIFtrZXkuc3Vic3RyaW5nKDMpXTogdmFsdWUgfTtcclxuICAgIH0sIHt9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlMYWJlbChzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hKSB7XHJcbiAgY29uc3QgdWlPcHRpb25zID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcclxuICBsZXQgeyBsYWJlbDogZGlzcGxheUxhYmVsID0gdHJ1ZSB9ID0gdWlPcHRpb25zO1xyXG4gIGNvbnN0IHNjaGVtYVR5cGUgPSBnZXRTY2hlbWFUeXBlKHNjaGVtYSk7XHJcblxyXG4gIGlmIChzY2hlbWFUeXBlID09PSBcImFycmF5XCIpIHtcclxuICAgIGRpc3BsYXlMYWJlbCA9XHJcbiAgICAgIGlzTXVsdGlTZWxlY3Qoc2NoZW1hLCByb290U2NoZW1hKSB8fFxyXG4gICAgICBpc0ZpbGVzQXJyYXkoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSkgfHxcclxuICAgICAgaXNDdXN0b21XaWRnZXQodWlTY2hlbWEpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNjaGVtYVR5cGUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIGRpc3BsYXlMYWJlbCA9IGZhbHNlO1xyXG4gIH1cclxuICBpZiAoc2NoZW1hVHlwZSA9PT0gXCJib29sZWFuXCIgJiYgIXVpU2NoZW1hW1widWk6d2lkZ2V0XCJdKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPSBmYWxzZTtcclxuICB9XHJcbiAgaWYgKHVpU2NoZW1hW1widWk6ZmllbGRcIl0pIHtcclxuICAgIGRpc3BsYXlMYWJlbCA9IGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gZGlzcGxheUxhYmVsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodGhpbmcpIHtcclxuICBpZiAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdGhpbmcgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IFwib2JqZWN0XCIgJiYgdGhpbmcgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkodGhpbmcpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmplY3RzKG9iajEsIG9iajIsIGNvbmNhdEFycmF5cyA9IGZhbHNlKSB7XHJcbiAgLy8gUmVjdXJzaXZlbHkgbWVyZ2UgZGVlcGx5IG5lc3RlZCBvYmplY3RzLlxyXG4gIHZhciBhY2MgPSBPYmplY3QuYXNzaWduKHt9LCBvYmoxKTsgLy8gUHJldmVudCBtdXRhdGlvbiBvZiBzb3VyY2Ugb2JqZWN0LlxyXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmoyKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcbiAgICBjb25zdCBsZWZ0ID0gb2JqMSA/IG9iajFba2V5XSA6IHt9LFxyXG4gICAgICByaWdodCA9IG9iajJba2V5XTtcclxuICAgIGlmIChvYmoxICYmIG9iajEuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpc09iamVjdChyaWdodCkpIHtcclxuICAgICAgYWNjW2tleV0gPSBtZXJnZU9iamVjdHMobGVmdCwgcmlnaHQsIGNvbmNhdEFycmF5cyk7XHJcbiAgICB9IGVsc2UgaWYgKGNvbmNhdEFycmF5cyAmJiBBcnJheS5pc0FycmF5KGxlZnQpICYmIEFycmF5LmlzQXJyYXkocmlnaHQpKSB7XHJcbiAgICAgIGFjY1trZXldID0gbGVmdC5jb25jYXQocmlnaHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWNjW2tleV0gPSByaWdodDtcclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwgYWNjKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFzTnVtYmVyKHZhbHVlKSB7XHJcbiAgaWYgKHZhbHVlID09PSBcIlwiKSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBpZiAoL1xcLiQvLnRlc3QodmFsdWUpKSB7XHJcbiAgICAvLyBcIjMuXCIgY2FuJ3QgcmVhbGx5IGJlIGNvbnNpZGVyZWQgYSBudW1iZXIgZXZlbiBpZiBpdCBwYXJzZXMgaW4ganMuIFRoZVxyXG4gICAgLy8gdXNlciBpcyBtb3N0IGxpa2VseSBlbnRlcmluZyBhIGZsb2F0LlxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICBpZiAoL1xcLjAkLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgLy8gd2UgbmVlZCB0byByZXR1cm4gdGhpcyBhcyBhIHN0cmluZyBoZXJlLCB0byBhbGxvdyBmb3IgaW5wdXQgbGlrZSAzLjA3XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIGNvbnN0IG4gPSBOdW1iZXIodmFsdWUpO1xyXG4gIGNvbnN0IHZhbGlkID0gdHlwZW9mIG4gPT09IFwibnVtYmVyXCIgJiYgIU51bWJlci5pc05hTihuKTtcclxuXHJcbiAgaWYgKC9cXC5cXGQqMCQvLnRlc3QodmFsdWUpKSB7XHJcbiAgICAvLyBJdCdzIGEgbnVtYmVyLCB0aGF0J3MgY29vbCAtIGJ1dCB3ZSBuZWVkIGl0IGFzIGEgc3RyaW5nIHNvIGl0IGRvZXNuJ3Qgc2NyZXdcclxuICAgIC8vIHdpdGggdGhlIHVzZXIgd2hlbiBlbnRlcmluZyBkb2xsYXIgYW1vdW50cyBvciBvdGhlciB2YWx1ZXMgKHN1Y2ggYXMgdGhvc2Ugd2l0aFxyXG4gICAgLy8gc3BlY2lmaWMgcHJlY2lzaW9uIG9yIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMpXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmFsaWQgPyBuIDogdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvcmRlclByb3BlcnRpZXMocHJvcGVydGllcywgb3JkZXIpIHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkob3JkZXIpKSB7XHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxuICB9XHJcblxyXG4gIGNvbnN0IGFycmF5VG9IYXNoID0gYXJyID0+XHJcbiAgICBhcnIucmVkdWNlKChwcmV2LCBjdXJyKSA9PiB7XHJcbiAgICAgIHByZXZbY3Vycl0gPSB0cnVlO1xyXG4gICAgICByZXR1cm4gcHJldjtcclxuICAgIH0sIHt9KTtcclxuICBjb25zdCBlcnJvclByb3BMaXN0ID0gYXJyID0+XHJcbiAgICBhcnIubGVuZ3RoID4gMVxyXG4gICAgICA/IGBwcm9wZXJ0aWVzICcke2Fyci5qb2luKFwiJywgJ1wiKX0nYFxyXG4gICAgICA6IGBwcm9wZXJ0eSAnJHthcnJbMF19J2A7XHJcbiAgY29uc3QgcHJvcGVydHlIYXNoID0gYXJyYXlUb0hhc2gocHJvcGVydGllcyk7XHJcbiAgY29uc3Qgb3JkZXJGaWx0ZXJlZCA9IG9yZGVyLmZpbHRlcihcclxuICAgIHByb3AgPT4gcHJvcCA9PT0gXCIqXCIgfHwgcHJvcGVydHlIYXNoW3Byb3BdXHJcbiAgKTtcclxuICBjb25zdCBvcmRlckhhc2ggPSBhcnJheVRvSGFzaChvcmRlckZpbHRlcmVkKTtcclxuXHJcbiAgY29uc3QgcmVzdCA9IHByb3BlcnRpZXMuZmlsdGVyKHByb3AgPT4gIW9yZGVySGFzaFtwcm9wXSk7XHJcbiAgY29uc3QgcmVzdEluZGV4ID0gb3JkZXJGaWx0ZXJlZC5pbmRleE9mKFwiKlwiKTtcclxuICBpZiAocmVzdEluZGV4ID09PSAtMSkge1xyXG4gICAgaWYgKHJlc3QubGVuZ3RoKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgdWlTY2hlbWEgb3JkZXIgbGlzdCBkb2VzIG5vdCBjb250YWluICR7ZXJyb3JQcm9wTGlzdChyZXN0KX1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3JkZXJGaWx0ZXJlZDtcclxuICB9XHJcbiAgaWYgKHJlc3RJbmRleCAhPT0gb3JkZXJGaWx0ZXJlZC5sYXN0SW5kZXhPZihcIipcIikpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInVpU2NoZW1hIG9yZGVyIGxpc3QgY29udGFpbnMgbW9yZSB0aGFuIG9uZSB3aWxkY2FyZCBpdGVtXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tcGxldGUgPSBbLi4ub3JkZXJGaWx0ZXJlZF07XHJcbiAgY29tcGxldGUuc3BsaWNlKHJlc3RJbmRleCwgMSwgLi4ucmVzdCk7XHJcbiAgcmV0dXJuIGNvbXBsZXRlO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIGdpdmVuIHNjaGVtYSBtYXRjaGVzIGEgc2luZ2xlXHJcbiAqIGNvbnN0YW50IHZhbHVlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29uc3RhbnQoc2NoZW1hKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEpIHx8XHJcbiAgICBzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJjb25zdFwiKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0NvbnN0YW50KHNjaGVtYSkge1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEpIHtcclxuICAgIHJldHVybiBzY2hlbWEuZW51bVswXTtcclxuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImNvbnN0XCIpKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmNvbnN0O1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJzY2hlbWEgY2Fubm90IGJlIGluZmVycmVkIGFzIGEgY29uc3RhbnRcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTZWxlY3QoX3NjaGVtYSwgcm9vdFNjaGVtYSA9IHt9KSB7XHJcbiAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSk7XHJcbiAgY29uc3QgYWx0U2NoZW1hcyA9IHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2Y7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmVudW0pKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYWx0U2NoZW1hcykpIHtcclxuICAgIHJldHVybiBhbHRTY2hlbWFzLmV2ZXJ5KGFsdFNjaGVtYXMgPT4gaXNDb25zdGFudChhbHRTY2hlbWFzKSk7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlTZWxlY3Qoc2NoZW1hLCByb290U2NoZW1hID0ge30pIHtcclxuICBpZiAoIXNjaGVtYS51bmlxdWVJdGVtcyB8fCAhc2NoZW1hLml0ZW1zKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiBpc1NlbGVjdChzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNGaWxlc0FycmF5KHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSkge1xyXG4gIGlmICh1aVNjaGVtYVtcInVpOndpZGdldFwiXSA9PT0gXCJmaWxlc1wiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHNjaGVtYS5pdGVtcykge1xyXG4gICAgY29uc3QgaXRlbXNTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEpO1xyXG4gICAgcmV0dXJuIGl0ZW1zU2NoZW1hLnR5cGUgPT09IFwic3RyaW5nXCIgJiYgaXRlbXNTY2hlbWEuZm9ybWF0ID09PSBcImRhdGEtdXJsXCI7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRml4ZWRJdGVtcyhzY2hlbWEpIHtcclxuICByZXR1cm4gKFxyXG4gICAgQXJyYXkuaXNBcnJheShzY2hlbWEuaXRlbXMpICYmXHJcbiAgICBzY2hlbWEuaXRlbXMubGVuZ3RoID4gMCAmJlxyXG4gICAgc2NoZW1hLml0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXNPYmplY3QoaXRlbSkpXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ3VzdG9tV2lkZ2V0KHVpU2NoZW1hKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIC8vIFRPRE86IFJlbW92ZSB0aGUgYCYmIHVpU2NoZW1hW1widWk6d2lkZ2V0XCJdICE9PSBcImhpZGRlblwiYCBvbmNlIHdlIHN1cHBvcnQgaGlkZGVuIHdpZGdldHMgZm9yIGFycmF5cy5cclxuICAgIC8vIGh0dHBzOi8vcmVhY3QtanNvbnNjaGVtYS1mb3JtLnJlYWR0aGVkb2NzLmlvL2VuL2xhdGVzdC91c2FnZS93aWRnZXRzLyNoaWRkZW4td2lkZ2V0c1xyXG4gICAgXCJ3aWRnZXRcIiBpbiBnZXRVaU9wdGlvbnModWlTY2hlbWEpICYmXHJcbiAgICBnZXRVaU9wdGlvbnModWlTY2hlbWEpW1wid2lkZ2V0XCJdICE9PSBcImhpZGRlblwiXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsbG93QWRkaXRpb25hbEl0ZW1zKHNjaGVtYSkge1xyXG4gIGlmIChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zID09PSB0cnVlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oXCJhZGRpdGlvbmFsSXRlbXM9dHJ1ZSBpcyBjdXJyZW50bHkgbm90IHN1cHBvcnRlZFwiKTtcclxuICB9XHJcbiAgcmV0dXJuIGlzT2JqZWN0KHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uc0xpc3Qoc2NoZW1hKSB7XHJcbiAgaWYgKHNjaGVtYS5lbnVtKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmVudW0ubWFwKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICBjb25zdCBsYWJlbCA9IChzY2hlbWEuZW51bU5hbWVzICYmIHNjaGVtYS5lbnVtTmFtZXNbaV0pIHx8IFN0cmluZyh2YWx1ZSk7XHJcbiAgICAgIHJldHVybiB7IGxhYmVsLCB2YWx1ZSB9O1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IGFsdFNjaGVtYXMgPSBzY2hlbWEub25lT2YgfHwgc2NoZW1hLmFueU9mO1xyXG4gICAgcmV0dXJuIGFsdFNjaGVtYXMubWFwKHNjaGVtYSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdG9Db25zdGFudChzY2hlbWEpO1xyXG4gICAgICBjb25zdCBsYWJlbCA9IHNjaGVtYS50aXRsZSB8fCBTdHJpbmcodmFsdWUpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNjaGVtYSxcclxuICAgICAgICBsYWJlbCxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRTY2hlbWFEZWZpbml0aW9uKCRyZWYsIHJvb3RTY2hlbWEgPSB7fSkge1xyXG4gIGNvbnN0IG9yaWdSZWYgPSAkcmVmO1xyXG4gIGlmICgkcmVmLnN0YXJ0c1dpdGgoXCIjXCIpKSB7XHJcbiAgICAvLyBEZWNvZGUgVVJJIGZyYWdtZW50IHJlcHJlc2VudGF0aW9uLlxyXG4gICAgJHJlZiA9IGRlY29kZVVSSUNvbXBvbmVudCgkcmVmLnN1YnN0cmluZygxKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke29yaWdSZWZ9LmApO1xyXG4gIH1cclxuICBjb25zdCBjdXJyZW50ID0ganNvbnBvaW50ZXIuZ2V0KHJvb3RTY2hlbWEsICRyZWYpO1xyXG4gIGlmIChjdXJyZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke29yaWdSZWZ9LmApO1xyXG4gIH1cclxuICBpZiAoY3VycmVudC5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIikpIHtcclxuICAgIHJldHVybiBmaW5kU2NoZW1hRGVmaW5pdGlvbihjdXJyZW50LiRyZWYsIHJvb3RTY2hlbWEpO1xyXG4gIH1cclxuICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuLy8gSW4gdGhlIGNhc2Ugd2hlcmUgd2UgaGF2ZSB0byBpbXBsaWNpdGx5IGNyZWF0ZSBhIHNjaGVtYSwgaXQgaXMgdXNlZnVsIHRvIGtub3cgd2hhdCB0eXBlIHRvIHVzZVxyXG4vLyAgYmFzZWQgb24gdGhlIGRhdGEgd2UgYXJlIGRlZmluaW5nXHJcbmV4cG9ydCBjb25zdCBndWVzc1R5cGUgPSBmdW5jdGlvbiBndWVzc1R5cGUodmFsdWUpIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIHJldHVybiBcImFycmF5XCI7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiBcInN0cmluZ1wiO1xyXG4gIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIFwibnVsbFwiO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgcmV0dXJuIFwiYm9vbGVhblwiO1xyXG4gIH0gZWxzZSBpZiAoIWlzTmFOKHZhbHVlKSkge1xyXG4gICAgcmV0dXJuIFwibnVtYmVyXCI7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIHJldHVybiBcIm9iamVjdFwiO1xyXG4gIH1cclxuICAvLyBEZWZhdWx0IHRvIHN0cmluZyBpZiB3ZSBjYW4ndCBmaWd1cmUgaXQgb3V0XHJcbiAgcmV0dXJuIFwic3RyaW5nXCI7XHJcbn07XHJcblxyXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgY3JlYXRlIG5ldyBcInByb3BlcnRpZXNcIiBpdGVtcyBmb3IgZWFjaCBrZXkgaW4gb3VyIGZvcm1EYXRhXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyhcclxuICBzY2hlbWEsXHJcbiAgcm9vdFNjaGVtYSA9IHt9LFxyXG4gIGZvcm1EYXRhID0ge31cclxuKSB7XHJcbiAgLy8gQ2xvbmUgdGhlIHNjaGVtYSBzbyB3ZSBkb24ndCBydWluIHRoZSBjb25zdW1lcidzIG9yaWdpbmFsXHJcbiAgc2NoZW1hID0ge1xyXG4gICAgLi4uc2NoZW1hLFxyXG4gICAgcHJvcGVydGllczogeyAuLi5zY2hlbWEucHJvcGVydGllcyB9LFxyXG4gIH07XHJcblxyXG4gIC8vIG1ha2Ugc3VyZSBmb3JtRGF0YSBpcyBhbiBvYmplY3RcclxuICBmb3JtRGF0YSA9IGlzT2JqZWN0KGZvcm1EYXRhKSA/IGZvcm1EYXRhIDoge307XHJcblxyXG4gIE9iamVjdC5rZXlzKGZvcm1EYXRhKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBpZiAoc2NoZW1hLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAvLyBObyBuZWVkIHRvIHN0dWIsIG91ciBzY2hlbWEgYWxyZWFkeSBoYXMgdGhlIHByb3BlcnR5XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYWRkaXRpb25hbFByb3BlcnRpZXM7XHJcbiAgICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KFwiJHJlZlwiKSkge1xyXG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgIHsgJHJlZjogc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzW1wiJHJlZlwiXSB9LFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGFcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KFwidHlwZVwiKSkge1xyXG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHsgLi4uc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHsgdHlwZTogZ3Vlc3NUeXBlKGZvcm1EYXRhW2tleV0pIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlIHR5cGUgb2Ygb3VyIG5ldyBrZXkgc2hvdWxkIG1hdGNoIHRoZSBhZGRpdGlvbmFsUHJvcGVydGllcyB2YWx1ZTtcclxuICAgIHNjaGVtYS5wcm9wZXJ0aWVzW2tleV0gPSBhZGRpdGlvbmFsUHJvcGVydGllcztcclxuICAgIC8vIFNldCBvdXIgYWRkaXRpb25hbCBwcm9wZXJ0eSBmbGFnIHNvIHdlIGtub3cgaXQgd2FzIGR5bmFtaWNhbGx5IGFkZGVkXHJcbiAgICBzY2hlbWEucHJvcGVydGllc1trZXldW0FERElUSU9OQUxfUFJPUEVSVFlfRkxBR10gPSB0cnVlO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gc2NoZW1hO1xyXG59XHJcblxyXG4vKipcclxuICogUmVzb2x2ZXMgYSBjb25kaXRpb25hbCBibG9jayAoaWYvZWxzZS90aGVuKSBieSByZW1vdmluZyB0aGUgY29uZGl0aW9uIGFuZCBtZXJnaW5nIHRoZSBhcHByb3ByaWF0ZSBjb25kaXRpb25hbCBicmFuY2ggd2l0aCB0aGUgcmVzdCBvZiB0aGUgc2NoZW1hXHJcbiAqL1xyXG5jb25zdCByZXNvbHZlQ29uZGl0aW9uID0gKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpID0+IHtcclxuICBsZXQge1xyXG4gICAgaWY6IGV4cHJlc3Npb24sXHJcbiAgICB0aGVuLFxyXG4gICAgZWxzZTogb3RoZXJ3aXNlLFxyXG4gICAgLi4ucmVzb2x2ZWRTY2hlbWFMZXNzQ29uZGl0aW9uYWxcclxuICB9ID0gc2NoZW1hO1xyXG5cclxuICBjb25zdCBjb25kaXRpb25hbFNjaGVtYSA9IGlzVmFsaWQoZXhwcmVzc2lvbiwgZm9ybURhdGEsIHJvb3RTY2hlbWEpXHJcbiAgICA/IHRoZW5cclxuICAgIDogb3RoZXJ3aXNlO1xyXG5cclxuICBpZiAoY29uZGl0aW9uYWxTY2hlbWEpIHtcclxuICAgIHJldHVybiByZXRyaWV2ZVNjaGVtYShcclxuICAgICAgbWVyZ2VTY2hlbWFzKFxyXG4gICAgICAgIHJlc29sdmVkU2NoZW1hTGVzc0NvbmRpdGlvbmFsLFxyXG4gICAgICAgIHJldHJpZXZlU2NoZW1hKGNvbmRpdGlvbmFsU2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcclxuICAgICAgKSxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGFcclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiByZXRyaWV2ZVNjaGVtYShyZXNvbHZlZFNjaGVtYUxlc3NDb25kaXRpb25hbCwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXNvbHZlcyByZWZlcmVuY2VzIGFuZCBkZXBlbmRlbmNpZXMgd2l0aGluIGEgc2NoZW1hIGFuZCBpdHMgJ2FsbE9mJyBjaGlsZHJlbi5cclxuICpcclxuICogQ2FsbGVkIGludGVybmFsbHkgYnkgcmV0cmlldmVTY2hlbWEuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSwgZm9ybURhdGEgPSB7fSkge1xyXG4gIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XHJcbiAgICByZXR1cm4gcmVzb2x2ZVJlZmVyZW5jZShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImRlcGVuZGVuY2llc1wiKSkge1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHJldHJpZXZlU2NoZW1hKHJlc29sdmVkU2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJhbGxPZlwiKSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uc2NoZW1hLFxyXG4gICAgICBhbGxPZjogc2NoZW1hLmFsbE9mLm1hcChhbGxPZlN1YnNjaGVtYSA9PlxyXG4gICAgICAgIHJldHJpZXZlU2NoZW1hKGFsbE9mU3Vic2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcclxuICAgICAgKSxcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIE5vICRyZWYgb3IgZGVwZW5kZW5jaWVzIGF0dHJpYnV0ZSBmb3VuZCwgcmV0dXJuaW5nIHRoZSBvcmlnaW5hbCBzY2hlbWEuXHJcbiAgICByZXR1cm4gc2NoZW1hO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzb2x2ZVJlZmVyZW5jZShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKSB7XHJcbiAgLy8gUmV0cmlldmUgdGhlIHJlZmVyZW5jZWQgc2NoZW1hIGRlZmluaXRpb24uXHJcbiAgY29uc3QgJHJlZlNjaGVtYSA9IGZpbmRTY2hlbWFEZWZpbml0aW9uKHNjaGVtYS4kcmVmLCByb290U2NoZW1hKTtcclxuICAvLyBEcm9wIHRoZSAkcmVmIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugc2NoZW1hLlxyXG4gIGNvbnN0IHsgJHJlZiwgLi4ubG9jYWxTY2hlbWEgfSA9IHNjaGVtYTtcclxuICAvLyBVcGRhdGUgcmVmZXJlbmNlZCBzY2hlbWEgZGVmaW5pdGlvbiB3aXRoIGxvY2FsIHNjaGVtYSBwcm9wZXJ0aWVzLlxyXG4gIHJldHVybiByZXRyaWV2ZVNjaGVtYShcclxuICAgIHsgLi4uJHJlZlNjaGVtYSwgLi4ubG9jYWxTY2hlbWEgfSxcclxuICAgIHJvb3RTY2hlbWEsXHJcbiAgICBmb3JtRGF0YVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSwgZm9ybURhdGEgPSB7fSkge1xyXG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSkge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuICBsZXQgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG5cclxuICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiaWZcIikpIHtcclxuICAgIHJldHVybiByZXNvbHZlQ29uZGl0aW9uKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIH1cclxuXHJcbiAgaWYgKFwiYWxsT2ZcIiBpbiBzY2hlbWEpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gbWVyZ2VBbGxPZih7XHJcbiAgICAgICAgLi4ucmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgICAgYWxsT2Y6IHJlc29sdmVkU2NoZW1hLmFsbE9mLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiY291bGQgbm90IG1lcmdlIHN1YnNjaGVtYXMgaW4gYWxsT2Y6XFxuXCIgKyBlKTtcclxuICAgICAgY29uc3QgeyBhbGxPZiwgLi4ucmVzb2x2ZWRTY2hlbWFXaXRob3V0QWxsT2YgfSA9IHJlc29sdmVkU2NoZW1hO1xyXG4gICAgICByZXR1cm4gcmVzb2x2ZWRTY2hlbWFXaXRob3V0QWxsT2Y7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IGhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzID1cclxuICAgIHJlc29sdmVkU2NoZW1hLmhhc093blByb3BlcnR5KFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIikgJiZcclxuICAgIHJlc29sdmVkU2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSBmYWxzZTtcclxuICBpZiAoaGFzQWRkaXRpb25hbFByb3BlcnRpZXMpIHtcclxuICAgIHJldHVybiBzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyhcclxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gcmVzb2x2ZWRTY2hlbWE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc29sdmVEZXBlbmRlbmNpZXMoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSkge1xyXG4gIC8vIERyb3AgdGhlIGRlcGVuZGVuY2llcyBmcm9tIHRoZSBzb3VyY2Ugc2NoZW1hLlxyXG4gIGxldCB7IGRlcGVuZGVuY2llcyA9IHt9LCAuLi5yZXNvbHZlZFNjaGVtYSB9ID0gc2NoZW1hO1xyXG4gIGlmIChcIm9uZU9mXCIgaW4gcmVzb2x2ZWRTY2hlbWEpIHtcclxuICAgIHJlc29sdmVkU2NoZW1hID1cclxuICAgICAgcmVzb2x2ZWRTY2hlbWEub25lT2ZbXHJcbiAgICAgICAgZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIHJlc29sdmVkU2NoZW1hLm9uZU9mLCByb290U2NoZW1hKVxyXG4gICAgICBdO1xyXG4gIH0gZWxzZSBpZiAoXCJhbnlPZlwiIGluIHJlc29sdmVkU2NoZW1hKSB7XHJcbiAgICByZXNvbHZlZFNjaGVtYSA9XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLmFueU9mW1xyXG4gICAgICAgIGdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCByZXNvbHZlZFNjaGVtYS5hbnlPZiwgcm9vdFNjaGVtYSlcclxuICAgICAgXTtcclxuICB9XHJcbiAgcmV0dXJuIHByb2Nlc3NEZXBlbmRlbmNpZXMoXHJcbiAgICBkZXBlbmRlbmNpZXMsXHJcbiAgICByZXNvbHZlZFNjaGVtYSxcclxuICAgIHJvb3RTY2hlbWEsXHJcbiAgICBmb3JtRGF0YVxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gcHJvY2Vzc0RlcGVuZGVuY2llcyhcclxuICBkZXBlbmRlbmNpZXMsXHJcbiAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgcm9vdFNjaGVtYSxcclxuICBmb3JtRGF0YVxyXG4pIHtcclxuICAvLyBQcm9jZXNzIGRlcGVuZGVuY2llcyB1cGRhdGluZyB0aGUgbG9jYWwgc2NoZW1hIHByb3BlcnRpZXMgYXMgYXBwcm9wcmlhdGUuXHJcbiAgZm9yIChjb25zdCBkZXBlbmRlbmN5S2V5IGluIGRlcGVuZGVuY2llcykge1xyXG4gICAgLy8gU2tpcCB0aGlzIGRlcGVuZGVuY3kgaWYgaXRzIHRyaWdnZXIgcHJvcGVydHkgaXMgbm90IHByZXNlbnQuXHJcbiAgICBpZiAoZm9ybURhdGFbZGVwZW5kZW5jeUtleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIC8vIFNraXAgdGhpcyBkZXBlbmRlbmN5IGlmIGl0IGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgc2NoZW1hIChzdWNoIGFzIHdoZW4gZGVwZW5kZW5jeUtleSBpcyBpdHNlbGYgYSBoaWRkZW4gZGVwZW5kZW5jeS4pXHJcbiAgICBpZiAoXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLnByb3BlcnRpZXMgJiZcclxuICAgICAgIShkZXBlbmRlbmN5S2V5IGluIHJlc29sdmVkU2NoZW1hLnByb3BlcnRpZXMpXHJcbiAgICApIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIFtkZXBlbmRlbmN5S2V5XTogZGVwZW5kZW5jeVZhbHVlLFxyXG4gICAgICAuLi5yZW1haW5pbmdEZXBlbmRlbmNpZXNcclxuICAgIH0gPSBkZXBlbmRlbmNpZXM7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkZXBlbmRlbmN5VmFsdWUpKSB7XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gd2l0aERlcGVuZGVudFByb3BlcnRpZXMocmVzb2x2ZWRTY2hlbWEsIGRlcGVuZGVuY3lWYWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGRlcGVuZGVuY3lWYWx1ZSkpIHtcclxuICAgICAgcmVzb2x2ZWRTY2hlbWEgPSB3aXRoRGVwZW5kZW50U2NoZW1hKFxyXG4gICAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGEsXHJcbiAgICAgICAgZGVwZW5kZW5jeUtleSxcclxuICAgICAgICBkZXBlbmRlbmN5VmFsdWVcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9jZXNzRGVwZW5kZW5jaWVzKFxyXG4gICAgICByZW1haW5pbmdEZXBlbmRlbmNpZXMsXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YVxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc29sdmVkU2NoZW1hO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aXRoRGVwZW5kZW50UHJvcGVydGllcyhzY2hlbWEsIGFkZGl0aW9uYWxseVJlcXVpcmVkKSB7XHJcbiAgaWYgKCFhZGRpdGlvbmFsbHlSZXF1aXJlZCkge1xyXG4gICAgcmV0dXJuIHNjaGVtYTtcclxuICB9XHJcbiAgY29uc3QgcmVxdWlyZWQgPSBBcnJheS5pc0FycmF5KHNjaGVtYS5yZXF1aXJlZClcclxuICAgID8gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5zY2hlbWEucmVxdWlyZWQsIC4uLmFkZGl0aW9uYWxseVJlcXVpcmVkXSkpXHJcbiAgICA6IGFkZGl0aW9uYWxseVJlcXVpcmVkO1xyXG4gIHJldHVybiB7IC4uLnNjaGVtYSwgcmVxdWlyZWQ6IHJlcXVpcmVkIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdpdGhEZXBlbmRlbnRTY2hlbWEoXHJcbiAgc2NoZW1hLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGEsXHJcbiAgZGVwZW5kZW5jeUtleSxcclxuICBkZXBlbmRlbmN5VmFsdWVcclxuKSB7XHJcbiAgbGV0IHsgb25lT2YsIC4uLmRlcGVuZGVudFNjaGVtYSB9ID0gcmV0cmlldmVTY2hlbWEoXHJcbiAgICBkZXBlbmRlbmN5VmFsdWUsXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGFcclxuICApO1xyXG4gIHNjaGVtYSA9IG1lcmdlU2NoZW1hcyhzY2hlbWEsIGRlcGVuZGVudFNjaGVtYSk7XHJcbiAgLy8gU2luY2UgaXQgZG9lcyBub3QgY29udGFpbiBvbmVPZiwgd2UgcmV0dXJuIHRoZSBvcmlnaW5hbCBzY2hlbWEuXHJcbiAgaWYgKG9uZU9mID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBzY2hlbWE7XHJcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShvbmVPZikpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZDogaXQgaXMgc29tZSAke3R5cGVvZiBvbmVPZn0gaW5zdGVhZCBvZiBhbiBhcnJheWApO1xyXG4gIH1cclxuICAvLyBSZXNvbHZlICRyZWZzIGluc2lkZSBvbmVPZi5cclxuICBjb25zdCByZXNvbHZlZE9uZU9mID0gb25lT2YubWFwKHN1YnNjaGVtYSA9PlxyXG4gICAgc3Vic2NoZW1hLmhhc093blByb3BlcnR5KFwiJHJlZlwiKVxyXG4gICAgICA/IHJlc29sdmVSZWZlcmVuY2Uoc3Vic2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcclxuICAgICAgOiBzdWJzY2hlbWFcclxuICApO1xyXG4gIHJldHVybiB3aXRoRXhhY3RseU9uZVN1YnNjaGVtYShcclxuICAgIHNjaGVtYSxcclxuICAgIHJvb3RTY2hlbWEsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIGRlcGVuZGVuY3lLZXksXHJcbiAgICByZXNvbHZlZE9uZU9mXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gd2l0aEV4YWN0bHlPbmVTdWJzY2hlbWEoXHJcbiAgc2NoZW1hLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGEsXHJcbiAgZGVwZW5kZW5jeUtleSxcclxuICBvbmVPZlxyXG4pIHtcclxuICBjb25zdCB2YWxpZFN1YnNjaGVtYXMgPSBvbmVPZi5maWx0ZXIoc3Vic2NoZW1hID0+IHtcclxuICAgIGlmICghc3Vic2NoZW1hLnByb3BlcnRpZXMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBbZGVwZW5kZW5jeUtleV06IGNvbmRpdGlvblByb3BlcnR5U2NoZW1hIH0gPSBzdWJzY2hlbWEucHJvcGVydGllcztcclxuICAgIGlmIChjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSkge1xyXG4gICAgICBjb25zdCBjb25kaXRpb25TY2hlbWEgPSB7XHJcbiAgICAgICAgdHlwZTogXCJvYmplY3RcIixcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICBbZGVwZW5kZW5jeUtleV06IGNvbmRpdGlvblByb3BlcnR5U2NoZW1hLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IHsgZXJyb3JzIH0gPSB2YWxpZGF0ZUZvcm1EYXRhKGZvcm1EYXRhLCBjb25kaXRpb25TY2hlbWEpO1xyXG4gICAgICByZXR1cm4gZXJyb3JzLmxlbmd0aCA9PT0gMDtcclxuICAgIH1cclxuICB9KTtcclxuICBpZiAodmFsaWRTdWJzY2hlbWFzLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgY29uc29sZS53YXJuKFxyXG4gICAgICBcImlnbm9yaW5nIG9uZU9mIGluIGRlcGVuZGVuY2llcyBiZWNhdXNlIHRoZXJlIGlzbid0IGV4YWN0bHkgb25lIHN1YnNjaGVtYSB0aGF0IGlzIHZhbGlkXCJcclxuICAgICk7XHJcbiAgICByZXR1cm4gc2NoZW1hO1xyXG4gIH1cclxuICBjb25zdCBzdWJzY2hlbWEgPSB2YWxpZFN1YnNjaGVtYXNbMF07XHJcbiAgY29uc3Qge1xyXG4gICAgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSxcclxuICAgIC4uLmRlcGVuZGVudFN1YnNjaGVtYVxyXG4gIH0gPSBzdWJzY2hlbWEucHJvcGVydGllcztcclxuICBjb25zdCBkZXBlbmRlbnRTY2hlbWEgPSB7IC4uLnN1YnNjaGVtYSwgcHJvcGVydGllczogZGVwZW5kZW50U3Vic2NoZW1hIH07XHJcbiAgcmV0dXJuIG1lcmdlU2NoZW1hcyhcclxuICAgIHNjaGVtYSxcclxuICAgIHJldHJpZXZlU2NoZW1hKGRlcGVuZGVudFNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgKTtcclxufVxyXG5cclxuLy8gUmVjdXJzaXZlbHkgbWVyZ2UgZGVlcGx5IG5lc3RlZCBzY2hlbWFzLlxyXG4vLyBUaGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG1lcmdlU2NoZW1hcyBhbmQgbWVyZ2VPYmplY3RzXHJcbi8vIGlzIHRoYXQgbWVyZ2VTY2hlbWFzIG9ubHkgY29uY2F0cyBhcnJheXMgZm9yXHJcbi8vIHZhbHVlcyB1bmRlciB0aGUgXCJyZXF1aXJlZFwiIGtleXdvcmQsIGFuZCB3aGVuIGl0IGRvZXMsXHJcbi8vIGl0IGRvZXNuJ3QgaW5jbHVkZSBkdXBsaWNhdGUgdmFsdWVzLlxyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VTY2hlbWFzKG9iajEsIG9iajIpIHtcclxuICB2YXIgYWNjID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqMSk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cclxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqMikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgY29uc3QgbGVmdCA9IG9iajEgPyBvYmoxW2tleV0gOiB7fSxcclxuICAgICAgcmlnaHQgPSBvYmoyW2tleV07XHJcbiAgICBpZiAob2JqMSAmJiBvYmoxLmhhc093blByb3BlcnR5KGtleSkgJiYgaXNPYmplY3QocmlnaHQpKSB7XHJcbiAgICAgIGFjY1trZXldID0gbWVyZ2VTY2hlbWFzKGxlZnQsIHJpZ2h0KTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIG9iajEgJiZcclxuICAgICAgb2JqMiAmJlxyXG4gICAgICAoZ2V0U2NoZW1hVHlwZShvYmoxKSA9PT0gXCJvYmplY3RcIiB8fCBnZXRTY2hlbWFUeXBlKG9iajIpID09PSBcIm9iamVjdFwiKSAmJlxyXG4gICAgICBrZXkgPT09IFwicmVxdWlyZWRcIiAmJlxyXG4gICAgICBBcnJheS5pc0FycmF5KGxlZnQpICYmXHJcbiAgICAgIEFycmF5LmlzQXJyYXkocmlnaHQpXHJcbiAgICApIHtcclxuICAgICAgLy8gRG9uJ3QgaW5jbHVkZSBkdXBsaWNhdGUgdmFsdWVzIHdoZW4gbWVyZ2luZ1xyXG4gICAgICAvLyBcInJlcXVpcmVkXCIgZmllbGRzLlxyXG4gICAgICBhY2Nba2V5XSA9IHVuaW9uKGxlZnQsIHJpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFjY1trZXldID0gcmlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIGFjYyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQXJndW1lbnRzKG9iamVjdCkge1xyXG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBFcXVhbHMoYSwgYiwgY2EgPSBbXSwgY2IgPSBbXSkge1xyXG4gIC8vIFBhcnRpYWxseSBleHRyYWN0ZWQgZnJvbSBub2RlLWRlZXBlciBhbmQgYWRhcHRlZCB0byBleGNsdWRlIGNvbXBhcmlzb25cclxuICAvLyBjaGVja3MgZm9yIGZ1bmN0aW9ucy5cclxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vb3RoaXltMjMvbm9kZS1kZWVwZXJcclxuICBpZiAoYSA9PT0gYikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgYSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBiID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIC8vIEFzc3VtZSBhbGwgZnVuY3Rpb25zIGFyZSBlcXVpdmFsZW50XHJcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Jqc2YtdGVhbS9yZWFjdC1qc29uc2NoZW1hLWZvcm0vaXNzdWVzLzI1NVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgYSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoYSA9PT0gbnVsbCB8fCBiID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSBlbHNlIGlmIChhIGluc3RhbmNlb2YgRGF0ZSAmJiBiIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKTtcclxuICB9IGVsc2UgaWYgKGEgaW5zdGFuY2VvZiBSZWdFeHAgJiYgYiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgYS5zb3VyY2UgPT09IGIuc291cmNlICYmXHJcbiAgICAgIGEuZ2xvYmFsID09PSBiLmdsb2JhbCAmJlxyXG4gICAgICBhLm11bHRpbGluZSA9PT0gYi5tdWx0aWxpbmUgJiZcclxuICAgICAgYS5sYXN0SW5kZXggPT09IGIubGFzdEluZGV4ICYmXHJcbiAgICAgIGEuaWdub3JlQ2FzZSA9PT0gYi5pZ25vcmVDYXNlXHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAoaXNBcmd1bWVudHMoYSkgfHwgaXNBcmd1bWVudHMoYikpIHtcclxuICAgIGlmICghKGlzQXJndW1lbnRzKGEpICYmIGlzQXJndW1lbnRzKGIpKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsZXQgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XHJcbiAgICByZXR1cm4gZGVlcEVxdWFscyhzbGljZS5jYWxsKGEpLCBzbGljZS5jYWxsKGIpLCBjYSwgY2IpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoYS5jb25zdHJ1Y3RvciAhPT0gYi5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGthID0gT2JqZWN0LmtleXMoYSk7XHJcbiAgICBsZXQga2IgPSBPYmplY3Qua2V5cyhiKTtcclxuICAgIC8vIGRvbid0IGJvdGhlciB3aXRoIHN0YWNrIGFjcm9iYXRpY3MgaWYgdGhlcmUncyBub3RoaW5nIHRoZXJlXHJcbiAgICBpZiAoa2EubGVuZ3RoID09PSAwICYmIGtiLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChrYS5sZW5ndGggIT09IGtiLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNhbCA9IGNhLmxlbmd0aDtcclxuICAgIHdoaWxlIChjYWwtLSkge1xyXG4gICAgICBpZiAoY2FbY2FsXSA9PT0gYSkge1xyXG4gICAgICAgIHJldHVybiBjYltjYWxdID09PSBiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjYS5wdXNoKGEpO1xyXG4gICAgY2IucHVzaChiKTtcclxuXHJcbiAgICBrYS5zb3J0KCk7XHJcbiAgICBrYi5zb3J0KCk7XHJcbiAgICBmb3IgKHZhciBqID0ga2EubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgaWYgKGthW2pdICE9PSBrYltqXSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBrZXk7XHJcbiAgICBmb3IgKGxldCBrID0ga2EubGVuZ3RoIC0gMTsgayA+PSAwOyBrLS0pIHtcclxuICAgICAga2V5ID0ga2Fba107XHJcbiAgICAgIGlmICghZGVlcEVxdWFscyhhW2tleV0sIGJba2V5XSwgY2EsIGNiKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhLnBvcCgpO1xyXG4gICAgY2IucG9wKCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkUmVuZGVyKGNvbXAsIG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgY29uc3QgeyBwcm9wcywgc3RhdGUgfSA9IGNvbXA7XHJcbiAgcmV0dXJuICFkZWVwRXF1YWxzKHByb3BzLCBuZXh0UHJvcHMpIHx8ICFkZWVwRXF1YWxzKHN0YXRlLCBuZXh0U3RhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9JZFNjaGVtYShcclxuICBzY2hlbWEsXHJcbiAgaWQsXHJcbiAgcm9vdFNjaGVtYSxcclxuICBmb3JtRGF0YSA9IHt9LFxyXG4gIGlkUHJlZml4ID0gXCJyb290XCIsXHJcbiAgaWRTZXBhcmF0b3IgPSBcIl9cIlxyXG4pIHtcclxuICBjb25zdCBpZFNjaGVtYSA9IHtcclxuICAgICRpZDogaWQgfHwgaWRQcmVmaXgsXHJcbiAgfTtcclxuICBpZiAoXCIkcmVmXCIgaW4gc2NoZW1hIHx8IFwiZGVwZW5kZW5jaWVzXCIgaW4gc2NoZW1hIHx8IFwiYWxsT2ZcIiBpbiBzY2hlbWEpIHtcclxuICAgIGNvbnN0IF9zY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIHJldHVybiB0b0lkU2NoZW1hKF9zY2hlbWEsIGlkLCByb290U2NoZW1hLCBmb3JtRGF0YSwgaWRQcmVmaXgsIGlkU2VwYXJhdG9yKTtcclxuICB9XHJcbiAgaWYgKFwiaXRlbXNcIiBpbiBzY2hlbWEgJiYgIXNjaGVtYS5pdGVtcy4kcmVmKSB7XHJcbiAgICByZXR1cm4gdG9JZFNjaGVtYShcclxuICAgICAgc2NoZW1hLml0ZW1zLFxyXG4gICAgICBpZCxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBpZFNlcGFyYXRvclxyXG4gICAgKTtcclxuICB9XHJcbiAgaWYgKHNjaGVtYS50eXBlICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gaWRTY2hlbWE7XHJcbiAgfVxyXG4gIGZvciAoY29uc3QgbmFtZSBpbiBzY2hlbWEucHJvcGVydGllcyB8fCB7fSkge1xyXG4gICAgY29uc3QgZmllbGQgPSBzY2hlbWEucHJvcGVydGllc1tuYW1lXTtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSBpZFNjaGVtYS4kaWQgKyBpZFNlcGFyYXRvciArIG5hbWU7XHJcbiAgICBpZFNjaGVtYVtuYW1lXSA9IHRvSWRTY2hlbWEoXHJcbiAgICAgIGlzT2JqZWN0KGZpZWxkKSA/IGZpZWxkIDoge30sXHJcbiAgICAgIGZpZWxkSWQsXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCBmb3JtRGF0YSBpcyBub3QgYW4gb2JqZWN0IC0tIHRoaXMgY2FuIGhhcHBlbiBpZiBhblxyXG4gICAgICAvLyBhcnJheSBpdGVtIGhhcyBqdXN0IGJlZW4gYWRkZWQsIGJ1dCBub3QgcG9wdWxhdGVkIHdpdGggZGF0YSB5ZXRcclxuICAgICAgKGZvcm1EYXRhIHx8IHt9KVtuYW1lXSxcclxuICAgICAgaWRQcmVmaXgsXHJcbiAgICAgIGlkU2VwYXJhdG9yXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gaWRTY2hlbWE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b1BhdGhTY2hlbWEoc2NoZW1hLCBuYW1lID0gXCJcIiwgcm9vdFNjaGVtYSwgZm9ybURhdGEgPSB7fSkge1xyXG4gIGNvbnN0IHBhdGhTY2hlbWEgPSB7XHJcbiAgICAkbmFtZTogbmFtZS5yZXBsYWNlKC9eXFwuLywgXCJcIiksXHJcbiAgfTtcclxuICBpZiAoXCIkcmVmXCIgaW4gc2NoZW1hIHx8IFwiZGVwZW5kZW5jaWVzXCIgaW4gc2NoZW1hIHx8IFwiYWxsT2ZcIiBpbiBzY2hlbWEpIHtcclxuICAgIGNvbnN0IF9zY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIHJldHVybiB0b1BhdGhTY2hlbWEoX3NjaGVtYSwgbmFtZSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpKSB7XHJcbiAgICBwYXRoU2NoZW1hLl9fcmpzZl9hZGRpdGlvbmFsUHJvcGVydGllcyA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiaXRlbXNcIikgJiYgQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcclxuICAgIGZvcm1EYXRhLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcclxuICAgICAgcGF0aFNjaGVtYVtpXSA9IHRvUGF0aFNjaGVtYShcclxuICAgICAgICBzY2hlbWEuaXRlbXMsXHJcbiAgICAgICAgYCR7bmFtZX0uJHtpfWAsXHJcbiAgICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgICBlbGVtZW50XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcInByb3BlcnRpZXNcIikpIHtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gc2NoZW1hLnByb3BlcnRpZXMpIHtcclxuICAgICAgcGF0aFNjaGVtYVtwcm9wZXJ0eV0gPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHldLFxyXG4gICAgICAgIGAke25hbWV9LiR7cHJvcGVydHl9YCxcclxuICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCBmb3JtRGF0YSBpcyBub3QgYW4gb2JqZWN0IC0tIHRoaXMgY2FuIGhhcHBlbiBpZiBhblxyXG4gICAgICAgIC8vIGFycmF5IGl0ZW0gaGFzIGp1c3QgYmVlbiBhZGRlZCwgYnV0IG5vdCBwb3B1bGF0ZWQgd2l0aCBkYXRhIHlldFxyXG4gICAgICAgIChmb3JtRGF0YSB8fCB7fSlbcHJvcGVydHldXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBwYXRoU2NoZW1hO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRlU3RyaW5nKGRhdGVTdHJpbmcsIGluY2x1ZGVUaW1lID0gdHJ1ZSkge1xyXG4gIGlmICghZGF0ZVN0cmluZykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeWVhcjogLTEsXHJcbiAgICAgIG1vbnRoOiAtMSxcclxuICAgICAgZGF5OiAtMSxcclxuICAgICAgaG91cjogaW5jbHVkZVRpbWUgPyAtMSA6IDAsXHJcbiAgICAgIG1pbnV0ZTogaW5jbHVkZVRpbWUgPyAtMSA6IDAsXHJcbiAgICAgIHNlY29uZDogaW5jbHVkZVRpbWUgPyAtMSA6IDAsXHJcbiAgICB9O1xyXG4gIH1cclxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XHJcbiAgaWYgKE51bWJlci5pc05hTihkYXRlLmdldFRpbWUoKSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBwYXJzZSBkYXRlIFwiICsgZGF0ZVN0cmluZyk7XHJcbiAgfVxyXG4gIHJldHVybiB7XHJcbiAgICB5ZWFyOiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksXHJcbiAgICBtb250aDogZGF0ZS5nZXRVVENNb250aCgpICsgMSwgLy8gb2ggeW91LCBqYXZhc2NyaXB0LlxyXG4gICAgZGF5OiBkYXRlLmdldFVUQ0RhdGUoKSxcclxuICAgIGhvdXI6IGluY2x1ZGVUaW1lID8gZGF0ZS5nZXRVVENIb3VycygpIDogMCxcclxuICAgIG1pbnV0ZTogaW5jbHVkZVRpbWUgPyBkYXRlLmdldFVUQ01pbnV0ZXMoKSA6IDAsXHJcbiAgICBzZWNvbmQ6IGluY2x1ZGVUaW1lID8gZGF0ZS5nZXRVVENTZWNvbmRzKCkgOiAwLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGVTdHJpbmcoXHJcbiAgeyB5ZWFyLCBtb250aCwgZGF5LCBob3VyID0gMCwgbWludXRlID0gMCwgc2Vjb25kID0gMCB9LFxyXG4gIHRpbWUgPSB0cnVlXHJcbikge1xyXG4gIGNvbnN0IHV0Y1RpbWUgPSBEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQpO1xyXG4gIGNvbnN0IGRhdGV0aW1lID0gbmV3IERhdGUodXRjVGltZSkudG9KU09OKCk7XHJcbiAgcmV0dXJuIHRpbWUgPyBkYXRldGltZSA6IGRhdGV0aW1lLnNsaWNlKDAsIDEwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHV0Y1RvTG9jYWwoanNvbkRhdGUpIHtcclxuICBpZiAoIWpzb25EYXRlKSB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcblxyXG4gIC8vIHJlcXVpcmVkIGZvcm1hdCBvZiBgXCJ5eXl5LU1NLWRkVGhoOm1tXCIgZm9sbG93ZWQgYnkgb3B0aW9uYWwgXCI6c3NcIiBvciBcIjpzcy5TU1NcIlxyXG4gIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2lucHV0Lmh0bWwjbG9jYWwtZGF0ZS1hbmQtdGltZS1zdGF0ZS0odHlwZSUzRGRhdGV0aW1lLWxvY2FsKVxyXG4gIC8vID4gc2hvdWxkIGJlIGEgX3ZhbGlkIGxvY2FsIGRhdGUgYW5kIHRpbWUgc3RyaW5nXyAobm90IEdNVClcclxuXHJcbiAgLy8gTm90ZSAtIGRhdGUgY29uc3RydWN0b3IgcGFzc2VkIGxvY2FsIElTTy04NjAxIGRvZXMgbm90IGNvcnJlY3RseVxyXG4gIC8vIGNoYW5nZSB0aW1lIHRvIFVUQyBpbiBub2RlIHByZS04XHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGpzb25EYXRlKTtcclxuXHJcbiAgY29uc3QgeXl5eSA9IHBhZChkYXRlLmdldEZ1bGxZZWFyKCksIDQpO1xyXG4gIGNvbnN0IE1NID0gcGFkKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpO1xyXG4gIGNvbnN0IGRkID0gcGFkKGRhdGUuZ2V0RGF0ZSgpLCAyKTtcclxuICBjb25zdCBoaCA9IHBhZChkYXRlLmdldEhvdXJzKCksIDIpO1xyXG4gIGNvbnN0IG1tID0gcGFkKGRhdGUuZ2V0TWludXRlcygpLCAyKTtcclxuICBjb25zdCBzcyA9IHBhZChkYXRlLmdldFNlY29uZHMoKSwgMik7XHJcbiAgY29uc3QgU1NTID0gcGFkKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCksIDMpO1xyXG5cclxuICByZXR1cm4gYCR7eXl5eX0tJHtNTX0tJHtkZH1UJHtoaH06JHttbX06JHtzc30uJHtTU1N9YDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvY2FsVG9VVEMoZGF0ZVN0cmluZykge1xyXG4gIGlmIChkYXRlU3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZVN0cmluZykudG9KU09OKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFkKG51bSwgc2l6ZSkge1xyXG4gIGxldCBzID0gU3RyaW5nKG51bSk7XHJcbiAgd2hpbGUgKHMubGVuZ3RoIDwgc2l6ZSkge1xyXG4gICAgcyA9IFwiMFwiICsgcztcclxuICB9XHJcbiAgcmV0dXJuIHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcclxuICAvLyBTcGxpdCBtZXRhZGF0YSBmcm9tIGRhdGFcclxuICBjb25zdCBzcGxpdHRlZCA9IGRhdGFVUkkuc3BsaXQoXCIsXCIpO1xyXG4gIC8vIFNwbGl0IHBhcmFtc1xyXG4gIGNvbnN0IHBhcmFtcyA9IHNwbGl0dGVkWzBdLnNwbGl0KFwiO1wiKTtcclxuICAvLyBHZXQgbWltZS10eXBlIGZyb20gcGFyYW1zXHJcbiAgY29uc3QgdHlwZSA9IHBhcmFtc1swXS5yZXBsYWNlKFwiZGF0YTpcIiwgXCJcIik7XHJcbiAgLy8gRmlsdGVyIHRoZSBuYW1lIHByb3BlcnR5IGZyb20gcGFyYW1zXHJcbiAgY29uc3QgcHJvcGVydGllcyA9IHBhcmFtcy5maWx0ZXIocGFyYW0gPT4ge1xyXG4gICAgcmV0dXJuIHBhcmFtLnNwbGl0KFwiPVwiKVswXSA9PT0gXCJuYW1lXCI7XHJcbiAgfSk7XHJcbiAgLy8gTG9vayBmb3IgdGhlIG5hbWUgYW5kIHVzZSB1bmtub3duIGlmIG5vIG5hbWUgcHJvcGVydHkuXHJcbiAgbGV0IG5hbWU7XHJcbiAgaWYgKHByb3BlcnRpZXMubGVuZ3RoICE9PSAxKSB7XHJcbiAgICBuYW1lID0gXCJ1bmtub3duXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEJlY2F1c2Ugd2UgZmlsdGVyZWQgb3V0IHRoZSBvdGhlciBwcm9wZXJ0eSxcclxuICAgIC8vIHdlIG9ubHkgaGF2ZSB0aGUgbmFtZSBjYXNlIGhlcmUuXHJcbiAgICBuYW1lID0gcHJvcGVydGllc1swXS5zcGxpdChcIj1cIilbMV07XHJcbiAgfVxyXG5cclxuICAvLyBCdWlsdCB0aGUgVWludDhBcnJheSBCbG9iIHBhcmFtZXRlciBmcm9tIHRoZSBiYXNlNjQgc3RyaW5nLlxyXG4gIGNvbnN0IGJpbmFyeSA9IGF0b2Ioc3BsaXR0ZWRbMV0pO1xyXG4gIGNvbnN0IGFycmF5ID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcclxuICAgIGFycmF5LnB1c2goYmluYXJ5LmNoYXJDb2RlQXQoaSkpO1xyXG4gIH1cclxuICAvLyBDcmVhdGUgdGhlIGJsb2Igb2JqZWN0XHJcbiAgY29uc3QgYmxvYiA9IG5ldyB3aW5kb3cuQmxvYihbbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXSwgeyB0eXBlIH0pO1xyXG5cclxuICByZXR1cm4geyBibG9iLCBuYW1lIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5nZVNwZWMoc2NoZW1hKSB7XHJcbiAgY29uc3Qgc3BlYyA9IHt9O1xyXG4gIGlmIChzY2hlbWEubXVsdGlwbGVPZikge1xyXG4gICAgc3BlYy5zdGVwID0gc2NoZW1hLm11bHRpcGxlT2Y7XHJcbiAgfVxyXG4gIGlmIChzY2hlbWEubWluaW11bSB8fCBzY2hlbWEubWluaW11bSA9PT0gMCkge1xyXG4gICAgc3BlYy5taW4gPSBzY2hlbWEubWluaW11bTtcclxuICB9XHJcbiAgaWYgKHNjaGVtYS5tYXhpbXVtIHx8IHNjaGVtYS5tYXhpbXVtID09PSAwKSB7XHJcbiAgICBzcGVjLm1heCA9IHNjaGVtYS5tYXhpbXVtO1xyXG4gIH1cclxuICByZXR1cm4gc3BlYztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCBvcHRpb25zLCByb290U2NoZW1hKSB7XHJcbiAgLy8gRm9yIHBlcmZvcm1hbmNlLCBza2lwIHZhbGlkYXRpbmcgc3Vic2NoZW1hcyBpZiBmb3JtRGF0YSBpcyB1bmRlZmluZWQuIFdlIGp1c3RcclxuICAvLyB3YW50IHRvIGdldCB0aGUgZmlyc3Qgb3B0aW9uIGluIHRoYXQgY2FzZS5cclxuICBpZiAoZm9ybURhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1tpXTtcclxuXHJcbiAgICAvLyBJZiB0aGUgc2NoZW1hIGRlc2NyaWJlcyBhbiBvYmplY3QgdGhlbiB3ZSBuZWVkIHRvIGFkZCBzbGlnaHRseSBtb3JlXHJcbiAgICAvLyBzdHJpY3QgbWF0Y2hpbmcgdG8gdGhlIHNjaGVtYSwgYmVjYXVzZSB1bmxlc3MgdGhlIHNjaGVtYSB1c2VzIHRoZVxyXG4gICAgLy8gXCJyZXF1aXJlc1wiIGtleXdvcmQsIGFuIG9iamVjdCB3aWxsIG1hdGNoIHRoZSBzY2hlbWEgYXMgbG9uZyBhcyBpdFxyXG4gICAgLy8gZG9lc24ndCBoYXZlIG1hdGNoaW5nIGtleXMgd2l0aCBhIGNvbmZsaWN0aW5nIHR5cGUuIFRvIGRvIHRoaXMgd2UgdXNlIGFuXHJcbiAgICAvLyBcImFueU9mXCIgd2l0aCBhbiBhcnJheSBvZiByZXF1aXJlcy4gVGhpcyBhdWdtZW50YXRpb24gZXhwcmVzc2VzIHRoYXQgdGhlXHJcbiAgICAvLyBzY2hlbWEgc2hvdWxkIG1hdGNoIGlmIGFueSBvZiB0aGUga2V5cyBpbiB0aGUgc2NoZW1hIGFyZSBwcmVzZW50IG9uIHRoZVxyXG4gICAgLy8gb2JqZWN0IGFuZCBwYXNzIHZhbGlkYXRpb24uXHJcbiAgICBpZiAob3B0aW9uLnByb3BlcnRpZXMpIHtcclxuICAgICAgLy8gQ3JlYXRlIGFuIFwiYW55T2ZcIiBzY2hlbWEgdGhhdCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgb2YgdGhlIGtleXMgaW4gdGhlXHJcbiAgICAgIC8vIFwicHJvcGVydGllc1wiIG9iamVjdFxyXG4gICAgICBjb25zdCByZXF1aXJlc0FueU9mID0ge1xyXG4gICAgICAgIGFueU9mOiBPYmplY3Qua2V5cyhvcHRpb24ucHJvcGVydGllcykubWFwKGtleSA9PiAoe1xyXG4gICAgICAgICAgcmVxdWlyZWQ6IFtrZXldLFxyXG4gICAgICAgIH0pKSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCBhdWdtZW50ZWRTY2hlbWE7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgXCJhbnlPZlwiIGtleXdvcmQgYWxyZWFkeSBleGlzdHMsIHdyYXAgdGhlIGF1Z21lbnRhdGlvbiBpbiBhbiBcImFsbE9mXCJcclxuICAgICAgaWYgKG9wdGlvbi5hbnlPZikge1xyXG4gICAgICAgIC8vIENyZWF0ZSBhIHNoYWxsb3cgY2xvbmUgb2YgdGhlIG9wdGlvblxyXG4gICAgICAgIGNvbnN0IHsgLi4uc2hhbGxvd0Nsb25lIH0gPSBvcHRpb247XHJcblxyXG4gICAgICAgIGlmICghc2hhbGxvd0Nsb25lLmFsbE9mKSB7XHJcbiAgICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YgPSBbXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gSWYgXCJhbGxPZlwiIGFscmVhZHkgZXhpc3RzLCBzaGFsbG93IGNsb25lIHRoZSBhcnJheVxyXG4gICAgICAgICAgc2hhbGxvd0Nsb25lLmFsbE9mID0gc2hhbGxvd0Nsb25lLmFsbE9mLnNsaWNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YucHVzaChyZXF1aXJlc0FueU9mKTtcclxuXHJcbiAgICAgICAgYXVnbWVudGVkU2NoZW1hID0gc2hhbGxvd0Nsb25lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1Z21lbnRlZFNjaGVtYSA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbiwgcmVxdWlyZXNBbnlPZik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSB0aGUgXCJyZXF1aXJlZFwiIGZpZWxkIGFzIGl0J3MgbGlrZWx5IHRoYXQgbm90IGFsbCBmaWVsZHMgaGF2ZVxyXG4gICAgICAvLyBiZWVuIGZpbGxlZCBpbiB5ZXQsIHdoaWNoIHdpbGwgbWVhbiB0aGF0IHRoZSBzY2hlbWEgaXMgbm90IHZhbGlkXHJcbiAgICAgIGRlbGV0ZSBhdWdtZW50ZWRTY2hlbWEucmVxdWlyZWQ7XHJcblxyXG4gICAgICBpZiAoaXNWYWxpZChhdWdtZW50ZWRTY2hlbWEsIGZvcm1EYXRhLCByb290U2NoZW1hKSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzVmFsaWQob3B0aW9uLCBmb3JtRGF0YSwgcm9vdFNjaGVtYSkpIHtcclxuICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAwO1xyXG59XHJcblxyXG4vLyBDaGVjayB0byBzZWUgaWYgYSBzY2hlbWEgc3BlY2lmaWVzIHRoYXQgYSB2YWx1ZSBtdXN0IGJlIHRydWVcclxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYSkge1xyXG4gIC8vIENoZWNrIGlmIGNvbnN0IGlzIGEgdHJ1dGh5IHZhbHVlXHJcbiAgaWYgKHNjaGVtYS5jb25zdCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBpZiBhbiBlbnVtIGhhcyBhIHNpbmdsZSB2YWx1ZSBvZiB0cnVlXHJcbiAgaWYgKHNjaGVtYS5lbnVtICYmIHNjaGVtYS5lbnVtLmxlbmd0aCA9PT0gMSAmJiBzY2hlbWEuZW51bVswXSA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBJZiBhbnlPZiBoYXMgYSBzaW5nbGUgdmFsdWUsIGV2YWx1YXRlIHRoZSBzdWJzY2hlbWFcclxuICBpZiAoc2NoZW1hLmFueU9mICYmIHNjaGVtYS5hbnlPZi5sZW5ndGggPT09IDEpIHtcclxuICAgIHJldHVybiBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZShzY2hlbWEuYW55T2ZbMF0pO1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgb25lT2YgaGFzIGEgc2luZ2xlIHZhbHVlLCBldmFsdWF0ZSB0aGUgc3Vic2NoZW1hXHJcbiAgaWYgKHNjaGVtYS5vbmVPZiAmJiBzY2hlbWEub25lT2YubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUoc2NoZW1hLm9uZU9mWzBdKTtcclxuICB9XHJcblxyXG4gIC8vIEV2YWx1YXRlIGVhY2ggc3Vic2NoZW1hIGluIGFsbE9mLCB0byBzZWUgaWYgb25lIG9mIHRoZW0gcmVxdWlyZXMgYSB0cnVlXHJcbiAgLy8gdmFsdWVcclxuICBpZiAoc2NoZW1hLmFsbE9mKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmFsbE9mLnNvbWUoc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbiJdfQ==