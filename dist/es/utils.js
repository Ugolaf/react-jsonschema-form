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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0SXMiLCJtZXJnZUFsbE9mIiwiZmlsbCIsInVuaW9uIiwianNvbnBvaW50ZXIiLCJmaWVsZHMiLCJ3aWRnZXRzIiwidmFsaWRhdGVGb3JtRGF0YSIsImlzVmFsaWQiLCJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJ3aWRnZXRNYXAiLCJjaGVja2JveCIsInJhZGlvIiwic2VsZWN0IiwiaGlkZGVuIiwic3RyaW5nIiwidGV4dCIsInBhc3N3b3JkIiwiZW1haWwiLCJob3N0bmFtZSIsImlwdjQiLCJpcHY2IiwidXJpIiwidGV4dGFyZWEiLCJkYXRlIiwiZGF0ZXRpbWUiLCJjb2xvciIsImZpbGUiLCJudW1iZXIiLCJ1cGRvd24iLCJyYW5nZSIsImludGVnZXIiLCJhcnJheSIsImNoZWNrYm94ZXMiLCJmaWxlcyIsImNhbkV4cGFuZCIsInNjaGVtYSIsInVpU2NoZW1hIiwiZm9ybURhdGEiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImdldFVpT3B0aW9ucyIsImV4cGFuZGFibGUiLCJtYXhQcm9wZXJ0aWVzIiwidW5kZWZpbmVkIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImdldERlZmF1bHRSZWdpc3RyeSIsImRlZmluaXRpb25zIiwicm9vdFNjaGVtYSIsImZvcm1Db250ZXh0IiwiZ2V0U2NoZW1hVHlwZSIsInR5cGUiLCJndWVzc1R5cGUiLCJwcm9wZXJ0aWVzIiwiQXJyYXkiLCJpbmNsdWRlcyIsImZpbmQiLCJnZXRXaWRnZXQiLCJ3aWRnZXQiLCJyZWdpc3RlcmVkV2lkZ2V0cyIsIm1lcmdlT3B0aW9ucyIsIldpZGdldCIsIk1lcmdlZFdpZGdldCIsImRlZmF1bHRPcHRpb25zIiwiZGVmYXVsdFByb3BzIiwib3B0aW9ucyIsInByb3BzIiwiaXNGb3J3YXJkUmVmIiwiY3JlYXRlRWxlbWVudCIsImlzTWVtbyIsIkVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJyZWdpc3RlcmVkV2lkZ2V0IiwiaGFzV2lkZ2V0IiwiZSIsIm1lc3NhZ2UiLCJzdGFydHNXaXRoIiwiY29tcHV0ZURlZmF1bHRzIiwiX3NjaGVtYSIsInBhcmVudERlZmF1bHRzIiwicmF3Rm9ybURhdGEiLCJpbmNsdWRlVW5kZWZpbmVkVmFsdWVzIiwiaXNPYmplY3QiLCJkZWZhdWx0cyIsIm1lcmdlT2JqZWN0cyIsInJlZlNjaGVtYSIsImZpbmRTY2hlbWFEZWZpbml0aW9uIiwiJHJlZiIsInJlc29sdmVkU2NoZW1hIiwicmVzb2x2ZURlcGVuZGVuY2llcyIsImlzRml4ZWRJdGVtcyIsIml0ZW1zIiwibWFwIiwiaXRlbVNjaGVtYSIsImlkeCIsImlzQXJyYXkiLCJvbmVPZiIsImdldE1hdGNoaW5nT3B0aW9uIiwiYW55T2YiLCJyZWR1Y2UiLCJhY2MiLCJrZXkiLCJjb21wdXRlZERlZmF1bHQiLCJpdGVtIiwiYWRkaXRpb25hbEl0ZW1zIiwibWluSXRlbXMiLCJpc011bHRpU2VsZWN0IiwiZGVmYXVsdHNMZW5ndGgiLCJkZWZhdWx0RW50cmllcyIsImZpbGxlclNjaGVtYSIsImZpbGxlckVudHJpZXMiLCJjb25jYXQiLCJnZXREZWZhdWx0Rm9ybVN0YXRlIiwicmV0cmlldmVTY2hlbWEiLCJtZXJnZURlZmF1bHRzV2l0aEZvcm1EYXRhIiwidmFsdWUiLCJhc3NpZ24iLCJmaWx0ZXIiLCJpbmRleE9mIiwiY29uc29sZSIsIndhcm4iLCJjb21wb25lbnQiLCJzdWJzdHJpbmciLCJnZXREaXNwbGF5TGFiZWwiLCJ1aU9wdGlvbnMiLCJsYWJlbCIsImRpc3BsYXlMYWJlbCIsInNjaGVtYVR5cGUiLCJpc0ZpbGVzQXJyYXkiLCJ0aGluZyIsIkZpbGUiLCJvYmoxIiwib2JqMiIsImNvbmNhdEFycmF5cyIsImxlZnQiLCJyaWdodCIsImFzTnVtYmVyIiwidGVzdCIsIm4iLCJOdW1iZXIiLCJ2YWxpZCIsImlzTmFOIiwib3JkZXJQcm9wZXJ0aWVzIiwib3JkZXIiLCJhcnJheVRvSGFzaCIsImFyciIsInByZXYiLCJjdXJyIiwiZXJyb3JQcm9wTGlzdCIsImpvaW4iLCJwcm9wZXJ0eUhhc2giLCJvcmRlckZpbHRlcmVkIiwicHJvcCIsIm9yZGVySGFzaCIsInJlc3QiLCJyZXN0SW5kZXgiLCJsYXN0SW5kZXhPZiIsImNvbXBsZXRlIiwic3BsaWNlIiwiaXNDb25zdGFudCIsInRvQ29uc3RhbnQiLCJpc1NlbGVjdCIsImFsdFNjaGVtYXMiLCJldmVyeSIsInVuaXF1ZUl0ZW1zIiwiaXRlbXNTY2hlbWEiLCJmb3JtYXQiLCJhbGxvd0FkZGl0aW9uYWxJdGVtcyIsIm9wdGlvbnNMaXN0IiwiaSIsImVudW1OYW1lcyIsIlN0cmluZyIsInRpdGxlIiwib3JpZ1JlZiIsImRlY29kZVVSSUNvbXBvbmVudCIsImN1cnJlbnQiLCJnZXQiLCJzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyIsImZvckVhY2giLCJyZXNvbHZlU2NoZW1hIiwicmVzb2x2ZVJlZmVyZW5jZSIsImFsbE9mIiwiYWxsT2ZTdWJzY2hlbWEiLCIkcmVmU2NoZW1hIiwibG9jYWxTY2hlbWEiLCJyZXNvbHZlZFNjaGVtYVdpdGhvdXRBbGxPZiIsImhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZGVwZW5kZW5jaWVzIiwicHJvY2Vzc0RlcGVuZGVuY2llcyIsImRlcGVuZGVuY3lLZXkiLCJkZXBlbmRlbmN5VmFsdWUiLCJyZW1haW5pbmdEZXBlbmRlbmNpZXMiLCJ3aXRoRGVwZW5kZW50UHJvcGVydGllcyIsIndpdGhEZXBlbmRlbnRTY2hlbWEiLCJhZGRpdGlvbmFsbHlSZXF1aXJlZCIsInJlcXVpcmVkIiwiZnJvbSIsIlNldCIsImRlcGVuZGVudFNjaGVtYSIsIm1lcmdlU2NoZW1hcyIsInJlc29sdmVkT25lT2YiLCJzdWJzY2hlbWEiLCJ3aXRoRXhhY3RseU9uZVN1YnNjaGVtYSIsInZhbGlkU3Vic2NoZW1hcyIsImNvbmRpdGlvblByb3BlcnR5U2NoZW1hIiwiY29uZGl0aW9uU2NoZW1hIiwiZXJyb3JzIiwiZGVwZW5kZW50U3Vic2NoZW1hIiwiaXNBcmd1bWVudHMiLCJvYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJkZWVwRXF1YWxzIiwiYSIsImIiLCJjYSIsImNiIiwiRGF0ZSIsImdldFRpbWUiLCJSZWdFeHAiLCJzb3VyY2UiLCJnbG9iYWwiLCJtdWx0aWxpbmUiLCJsYXN0SW5kZXgiLCJpZ25vcmVDYXNlIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsImthIiwia2IiLCJjYWwiLCJwdXNoIiwic29ydCIsImoiLCJrIiwicG9wIiwic2hvdWxkUmVuZGVyIiwiY29tcCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInN0YXRlIiwidG9JZFNjaGVtYSIsImlkIiwiaWRQcmVmaXgiLCJpZFNjaGVtYSIsIiRpZCIsIm5hbWUiLCJmaWVsZCIsImZpZWxkSWQiLCJ0b1BhdGhTY2hlbWEiLCJwYXRoU2NoZW1hIiwiJG5hbWUiLCJyZXBsYWNlIiwiX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZWxlbWVudCIsInByb3BlcnR5IiwicGFyc2VEYXRlU3RyaW5nIiwiZGF0ZVN0cmluZyIsImluY2x1ZGVUaW1lIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInRvRGF0ZVN0cmluZyIsInRpbWUiLCJ1dGNUaW1lIiwiVVRDIiwidG9KU09OIiwidXRjVG9Mb2NhbCIsImpzb25EYXRlIiwieXl5eSIsInBhZCIsImdldEZ1bGxZZWFyIiwiTU0iLCJnZXRNb250aCIsImRkIiwiZ2V0RGF0ZSIsImhoIiwiZ2V0SG91cnMiLCJtbSIsImdldE1pbnV0ZXMiLCJzcyIsImdldFNlY29uZHMiLCJTU1MiLCJnZXRNaWxsaXNlY29uZHMiLCJsb2NhbFRvVVRDIiwibnVtIiwic2l6ZSIsInMiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsInNwbGl0dGVkIiwic3BsaXQiLCJwYXJhbXMiLCJwYXJhbSIsImJpbmFyeSIsImF0b2IiLCJjaGFyQ29kZUF0IiwiYmxvYiIsIndpbmRvdyIsIkJsb2IiLCJVaW50OEFycmF5IiwicmFuZ2VTcGVjIiwic3BlYyIsIm11bHRpcGxlT2YiLCJzdGVwIiwibWluaW11bSIsIm1pbiIsIm1heGltdW0iLCJtYXgiLCJvcHRpb24iLCJyZXF1aXJlc0FueU9mIiwiYXVnbWVudGVkU2NoZW1hIiwic2hhbGxvd0Nsb25lIiwic2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUiLCJzb21lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBTyxLQUFLQyxPQUFaLE1BQXlCLFVBQXpCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix5QkFBdkI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLGtDQUFqQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsY0FBbEI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLGFBQXhCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixxQkFBbkI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLHNCQUFwQjtBQUNBLE9BQU9DLGdCQUFQLElBQTJCQyxPQUEzQixRQUEwQyxZQUExQztBQUVBLE9BQU8sSUFBTUMsd0JBQXdCLEdBQUcsdUJBQWpDO0FBRVAsSUFBTUMsU0FBUyxHQUFHO0FBQ2hCLGFBQVM7QUFDUEMsSUFBQUEsUUFBUSxFQUFFLGdCQURIO0FBRVBDLElBQUFBLEtBQUssRUFBRSxhQUZBO0FBR1BDLElBQUFBLE1BQU0sRUFBRSxjQUhEO0FBSVBDLElBQUFBLE1BQU0sRUFBRTtBQUpELEdBRE87QUFPaEJDLEVBQUFBLE1BQU0sRUFBRTtBQUNOQyxJQUFBQSxJQUFJLEVBQUUsWUFEQTtBQUVOQyxJQUFBQSxRQUFRLEVBQUUsZ0JBRko7QUFHTkMsSUFBQUEsS0FBSyxFQUFFLGFBSEQ7QUFJTkMsSUFBQUEsUUFBUSxFQUFFLFlBSko7QUFLTkMsSUFBQUEsSUFBSSxFQUFF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QUErQztBQUM3QyxXQUFPcVIsdUJBQXVCLENBQUMvUixNQUFNLENBQUMrRCxLQUFQLENBQWEsQ0FBYixDQUFELENBQTlCO0FBQ0QsR0FkNkMsQ0FnQjlDOzs7QUFDQSxNQUFJL0QsTUFBTSxDQUFDNkQsS0FBUCxJQUFnQjdELE1BQU0sQ0FBQzZELEtBQVAsQ0FBYW5ELE1BQWIsS0FBd0IsQ0FBNUMsRUFBK0M7QUFDN0MsV0FBT3FSLHVCQUF1QixDQUFDL1IsTUFBTSxDQUFDNkQsS0FBUCxDQUFhLENBQWIsQ0FBRCxDQUE5QjtBQUNELEdBbkI2QyxDQXFCOUM7QUFDQTs7O0FBQ0EsTUFBSTdELE1BQU0sQ0FBQ2tKLEtBQVgsRUFBa0I7QUFDaEIsV0FBT2xKLE1BQU0sQ0FBQ2tKLEtBQVAsQ0FBYThJLElBQWIsQ0FBa0JELHVCQUFsQixDQUFQO0FBQ0Q7O0FBRUQsU0FBTyxLQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0SXMgZnJvbSBcInJlYWN0LWlzXCI7XHJcbmltcG9ydCBtZXJnZUFsbE9mIGZyb20gXCJqc29uLXNjaGVtYS1tZXJnZS1hbGxvZlwiO1xyXG5pbXBvcnQgZmlsbCBmcm9tIFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL2FycmF5L2ZpbGxcIjtcclxuaW1wb3J0IHVuaW9uIGZyb20gXCJsb2Rhc2gvdW5pb25cIjtcclxuaW1wb3J0IGpzb25wb2ludGVyIGZyb20gXCJqc29ucG9pbnRlclwiO1xyXG5pbXBvcnQgZmllbGRzIGZyb20gXCIuL2NvbXBvbmVudHMvZmllbGRzXCI7XHJcbmltcG9ydCB3aWRnZXRzIGZyb20gXCIuL2NvbXBvbmVudHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgdmFsaWRhdGVGb3JtRGF0YSwgeyBpc1ZhbGlkIH0gZnJvbSBcIi4vdmFsaWRhdGVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBBRERJVElPTkFMX1BST1BFUlRZX0ZMQUcgPSBcIl9fYWRkaXRpb25hbF9wcm9wZXJ0eVwiO1xyXG5cclxuY29uc3Qgd2lkZ2V0TWFwID0ge1xyXG4gIGJvb2xlYW46IHtcclxuICAgIGNoZWNrYm94OiBcIkNoZWNrYm94V2lkZ2V0XCIsXHJcbiAgICByYWRpbzogXCJSYWRpb1dpZGdldFwiLFxyXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxyXG4gICAgaGlkZGVuOiBcIkhpZGRlbldpZGdldFwiLFxyXG4gIH0sXHJcbiAgc3RyaW5nOiB7XHJcbiAgICB0ZXh0OiBcIlRleHRXaWRnZXRcIixcclxuICAgIHBhc3N3b3JkOiBcIlBhc3N3b3JkV2lkZ2V0XCIsXHJcbiAgICBlbWFpbDogXCJFbWFpbFdpZGdldFwiLFxyXG4gICAgaG9zdG5hbWU6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgaXB2NDogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICBpcHY2OiBcIlRleHRXaWRnZXRcIixcclxuICAgIHVyaTogXCJVUkxXaWRnZXRcIixcclxuICAgIFwiZGF0YS11cmxcIjogXCJGaWxlV2lkZ2V0XCIsXHJcbiAgICByYWRpbzogXCJSYWRpb1dpZGdldFwiLFxyXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxyXG4gICAgdGV4dGFyZWE6IFwiVGV4dGFyZWFXaWRnZXRcIixcclxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcclxuICAgIGRhdGU6IFwiRGF0ZVdpZGdldFwiLFxyXG4gICAgZGF0ZXRpbWU6IFwiRGF0ZVRpbWVXaWRnZXRcIixcclxuICAgIFwiZGF0ZS10aW1lXCI6IFwiRGF0ZVRpbWVXaWRnZXRcIixcclxuICAgIFwiYWx0LWRhdGVcIjogXCJBbHREYXRlV2lkZ2V0XCIsXHJcbiAgICBcImFsdC1kYXRldGltZVwiOiBcIkFsdERhdGVUaW1lV2lkZ2V0XCIsXHJcbiAgICBjb2xvcjogXCJDb2xvcldpZGdldFwiLFxyXG4gICAgZmlsZTogXCJGaWxlV2lkZ2V0XCIsXHJcbiAgfSxcclxuICBudW1iZXI6IHtcclxuICAgIHRleHQ6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxyXG4gICAgdXBkb3duOiBcIlVwRG93bldpZGdldFwiLFxyXG4gICAgcmFuZ2U6IFwiUmFuZ2VXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxuICBpbnRlZ2VyOiB7XHJcbiAgICB0ZXh0OiBcIlRleHRXaWRnZXRcIixcclxuICAgIHNlbGVjdDogXCJTZWxlY3RXaWRnZXRcIixcclxuICAgIHVwZG93bjogXCJVcERvd25XaWRnZXRcIixcclxuICAgIHJhbmdlOiBcIlJhbmdlV2lkZ2V0XCIsXHJcbiAgICByYWRpbzogXCJSYWRpb1dpZGdldFwiLFxyXG4gICAgaGlkZGVuOiBcIkhpZGRlbldpZGdldFwiLFxyXG4gIH0sXHJcbiAgYXJyYXk6IHtcclxuICAgIHNlbGVjdDogXCJTZWxlY3RXaWRnZXRcIixcclxuICAgIGNoZWNrYm94ZXM6IFwiQ2hlY2tib3hlc1dpZGdldFwiLFxyXG4gICAgZmlsZXM6IFwiRmlsZVdpZGdldFwiLFxyXG4gICAgaGlkZGVuOiBcIkhpZGRlbldpZGdldFwiLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FuRXhwYW5kKHNjaGVtYSwgdWlTY2hlbWEsIGZvcm1EYXRhKSB7XHJcbiAgaWYgKCFzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgY29uc3QgeyBleHBhbmRhYmxlIH0gPSBnZXRVaU9wdGlvbnModWlTY2hlbWEpO1xyXG4gIGlmIChleHBhbmRhYmxlID09PSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIGV4cGFuZGFibGU7XHJcbiAgfVxyXG4gIC8vIGlmIHVpOm9wdGlvbnMuZXhwYW5kYWJsZSB3YXMgbm90IGV4cGxpY2l0bHkgc2V0IHRvIGZhbHNlLCB3ZSBjYW4gYWRkXHJcbiAgLy8gYW5vdGhlciBwcm9wZXJ0eSBpZiB3ZSBoYXZlIG5vdCBleGNlZWRlZCBtYXhQcm9wZXJ0aWVzIHlldFxyXG4gIGlmIChzY2hlbWEubWF4UHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9ybURhdGEpLmxlbmd0aCA8IHNjaGVtYS5tYXhQcm9wZXJ0aWVzO1xyXG4gIH1cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRSZWdpc3RyeSgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgZmllbGRzLFxyXG4gICAgd2lkZ2V0cyxcclxuICAgIGRlZmluaXRpb25zOiB7fSxcclxuICAgIHJvb3RTY2hlbWE6IHt9LFxyXG4gICAgZm9ybUNvbnRleHQ6IHt9LFxyXG4gIH07XHJcbn1cclxuXHJcbi8qIEdldHMgdGhlIHR5cGUgb2YgYSBnaXZlbiBzY2hlbWEuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2hlbWFUeXBlKHNjaGVtYSkge1xyXG4gIGxldCB7IHR5cGUgfSA9IHNjaGVtYTtcclxuXHJcbiAgaWYgKCF0eXBlICYmIHNjaGVtYS5jb25zdCkge1xyXG4gICAgcmV0dXJuIGd1ZXNzVHlwZShzY2hlbWEuY29uc3QpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCF0eXBlICYmIHNjaGVtYS5lbnVtKSB7XHJcbiAgICByZXR1cm4gXCJzdHJpbmdcIjtcclxuICB9XHJcblxyXG4gIGlmICghdHlwZSAmJiAoc2NoZW1hLnByb3BlcnRpZXMgfHwgc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSkge1xyXG4gICAgcmV0dXJuIFwib2JqZWN0XCI7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZSBpbnN0YW5jZW9mIEFycmF5ICYmIHR5cGUubGVuZ3RoID09PSAyICYmIHR5cGUuaW5jbHVkZXMoXCJudWxsXCIpKSB7XHJcbiAgICByZXR1cm4gdHlwZS5maW5kKHR5cGUgPT4gdHlwZSAhPT0gXCJudWxsXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzID0ge30pIHtcclxuICBjb25zdCB0eXBlID0gZ2V0U2NoZW1hVHlwZShzY2hlbWEpO1xyXG5cclxuICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMoV2lkZ2V0KSB7XHJcbiAgICAvLyBjYWNoZSByZXR1cm4gdmFsdWUgYXMgcHJvcGVydHkgb2Ygd2lkZ2V0IGZvciBwcm9wZXIgcmVhY3QgcmVjb25jaWxpYXRpb25cclxuICAgIGlmICghV2lkZ2V0Lk1lcmdlZFdpZGdldCkge1xyXG4gICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9XHJcbiAgICAgICAgKFdpZGdldC5kZWZhdWx0UHJvcHMgJiYgV2lkZ2V0LmRlZmF1bHRQcm9wcy5vcHRpb25zKSB8fCB7fTtcclxuICAgICAgV2lkZ2V0Lk1lcmdlZFdpZGdldCA9ICh7IG9wdGlvbnMgPSB7fSwgLi4ucHJvcHMgfSkgPT4gKFxyXG4gICAgICAgIDxXaWRnZXQgb3B0aW9ucz17eyAuLi5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9fSB7Li4ucHJvcHN9IC8+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gV2lkZ2V0Lk1lcmdlZFdpZGdldDtcclxuICB9XHJcblxyXG4gIGlmIChcclxuICAgIHR5cGVvZiB3aWRnZXQgPT09IFwiZnVuY3Rpb25cIiB8fFxyXG4gICAgUmVhY3RJcy5pc0ZvcndhcmRSZWYoUmVhY3QuY3JlYXRlRWxlbWVudCh3aWRnZXQpKSB8fFxyXG4gICAgUmVhY3RJcy5pc01lbW8od2lkZ2V0KVxyXG4gICkge1xyXG4gICAgcmV0dXJuIG1lcmdlT3B0aW9ucyh3aWRnZXQpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiB3aWRnZXQgIT09IFwic3RyaW5nXCIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgd2lkZ2V0IGRlZmluaXRpb246ICR7dHlwZW9mIHdpZGdldH1gKTtcclxuICB9XHJcblxyXG4gIGlmIChyZWdpc3RlcmVkV2lkZ2V0cy5oYXNPd25Qcm9wZXJ0eSh3aWRnZXQpKSB7XHJcbiAgICBjb25zdCByZWdpc3RlcmVkV2lkZ2V0ID0gcmVnaXN0ZXJlZFdpZGdldHNbd2lkZ2V0XTtcclxuICAgIHJldHVybiBnZXRXaWRnZXQoc2NoZW1hLCByZWdpc3RlcmVkV2lkZ2V0LCByZWdpc3RlcmVkV2lkZ2V0cyk7XHJcbiAgfVxyXG5cclxuICBpZiAoIXdpZGdldE1hcC5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyB3aWRnZXQgZm9yIHR5cGUgXCIke3R5cGV9XCJgKTtcclxuICB9XHJcblxyXG4gIGlmICh3aWRnZXRNYXBbdHlwZV0uaGFzT3duUHJvcGVydHkod2lkZ2V0KSkge1xyXG4gICAgY29uc3QgcmVnaXN0ZXJlZFdpZGdldCA9IHJlZ2lzdGVyZWRXaWRnZXRzW3dpZGdldE1hcFt0eXBlXVt3aWRnZXRdXTtcclxuICAgIHJldHVybiBnZXRXaWRnZXQoc2NoZW1hLCByZWdpc3RlcmVkV2lkZ2V0LCByZWdpc3RlcmVkV2lkZ2V0cyk7XHJcbiAgfVxyXG5cclxuICB0aHJvdyBuZXcgRXJyb3IoYE5vIHdpZGdldCBcIiR7d2lkZ2V0fVwiIGZvciB0eXBlIFwiJHt0eXBlfVwiYCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzID0ge30pIHtcclxuICB0cnkge1xyXG4gICAgZ2V0V2lkZ2V0KHNjaGVtYSwgd2lkZ2V0LCByZWdpc3RlcmVkV2lkZ2V0cyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGUubWVzc2FnZSAmJlxyXG4gICAgICAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCJObyB3aWRnZXRcIikgfHxcclxuICAgICAgICBlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIlVuc3VwcG9ydGVkIHdpZGdldFwiKSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZURlZmF1bHRzKFxyXG4gIF9zY2hlbWEsXHJcbiAgcGFyZW50RGVmYXVsdHMsXHJcbiAgcm9vdFNjaGVtYSxcclxuICByYXdGb3JtRGF0YSA9IHt9LFxyXG4gIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXMgPSBmYWxzZVxyXG4pIHtcclxuICBsZXQgc2NoZW1hID0gaXNPYmplY3QoX3NjaGVtYSkgPyBfc2NoZW1hIDoge307XHJcbiAgY29uc3QgZm9ybURhdGEgPSBpc09iamVjdChyYXdGb3JtRGF0YSkgPyByYXdGb3JtRGF0YSA6IHt9O1xyXG4gIC8vIENvbXB1dGUgdGhlIGRlZmF1bHRzIHJlY3Vyc2l2ZWx5OiBnaXZlIGhpZ2hlc3QgcHJpb3JpdHkgdG8gZGVlcGVzdCBub2Rlcy5cclxuICBsZXQgZGVmYXVsdHMgPSBwYXJlbnREZWZhdWx0cztcclxuICBpZiAoaXNPYmplY3QoZGVmYXVsdHMpICYmIGlzT2JqZWN0KHNjaGVtYS5kZWZhdWx0KSkge1xyXG4gICAgLy8gRm9yIG9iamVjdCBkZWZhdWx0cywgb25seSBvdmVycmlkZSBwYXJlbnQgZGVmYXVsdHMgdGhhdCBhcmUgZGVmaW5lZCBpblxyXG4gICAgLy8gc2NoZW1hLmRlZmF1bHQuXHJcbiAgICBkZWZhdWx0cyA9IG1lcmdlT2JqZWN0cyhkZWZhdWx0cywgc2NoZW1hLmRlZmF1bHQpO1xyXG4gIH0gZWxzZSBpZiAoXCJkZWZhdWx0XCIgaW4gc2NoZW1hKSB7XHJcbiAgICAvLyBVc2Ugc2NoZW1hIGRlZmF1bHRzIGZvciB0aGlzIG5vZGUuXHJcbiAgICBkZWZhdWx0cyA9IHNjaGVtYS5kZWZhdWx0O1xyXG4gIH0gZWxzZSBpZiAoXCIkcmVmXCIgaW4gc2NoZW1hKSB7XHJcbiAgICAvLyBVc2UgcmVmZXJlbmNlZCBzY2hlbWEgZGVmYXVsdHMgZm9yIHRoaXMgbm9kZS5cclxuICAgIGNvbnN0IHJlZlNjaGVtYSA9IGZpbmRTY2hlbWFEZWZpbml0aW9uKHNjaGVtYS4kcmVmLCByb290U2NoZW1hKTtcclxuICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXHJcbiAgICAgIHJlZlNjaGVtYSxcclxuICAgICAgZGVmYXVsdHMsXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAoXCJkZXBlbmRlbmNpZXNcIiBpbiBzY2hlbWEpIHtcclxuICAgIGNvbnN0IHJlc29sdmVkU2NoZW1hID0gcmVzb2x2ZURlcGVuZGVuY2llcyhzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICBkZWZhdWx0cyxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChpc0ZpeGVkSXRlbXMoc2NoZW1hKSkge1xyXG4gICAgZGVmYXVsdHMgPSBzY2hlbWEuaXRlbXMubWFwKChpdGVtU2NoZW1hLCBpZHgpID0+XHJcbiAgICAgIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgICBpdGVtU2NoZW1hLFxyXG4gICAgICAgIEFycmF5LmlzQXJyYXkocGFyZW50RGVmYXVsdHMpID8gcGFyZW50RGVmYXVsdHNbaWR4XSA6IHVuZGVmaW5lZCxcclxuICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKFwib25lT2ZcIiBpbiBzY2hlbWEpIHtcclxuICAgIHNjaGVtYSA9XHJcbiAgICAgIHNjaGVtYS5vbmVPZltnZXRNYXRjaGluZ09wdGlvbih1bmRlZmluZWQsIHNjaGVtYS5vbmVPZiwgcm9vdFNjaGVtYSldO1xyXG4gIH0gZWxzZSBpZiAoXCJhbnlPZlwiIGluIHNjaGVtYSkge1xyXG4gICAgc2NoZW1hID1cclxuICAgICAgc2NoZW1hLmFueU9mW2dldE1hdGNoaW5nT3B0aW9uKHVuZGVmaW5lZCwgc2NoZW1hLmFueU9mLCByb290U2NoZW1hKV07XHJcbiAgfVxyXG5cclxuICAvLyBOb3QgZGVmYXVsdHMgZGVmaW5lZCBmb3IgdGhpcyBub2RlLCBmYWxsYmFjayB0byBnZW5lcmljIHR5cGVkIG9uZXMuXHJcbiAgaWYgKHR5cGVvZiBkZWZhdWx0cyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZGVmYXVsdHMgPSBzY2hlbWEuZGVmYXVsdDtcclxuICB9XHJcblxyXG4gIHN3aXRjaCAoZ2V0U2NoZW1hVHlwZShzY2hlbWEpKSB7XHJcbiAgICAvLyBXZSBuZWVkIHRvIHJlY3VyIGZvciBvYmplY3Qgc2NoZW1hIGlubmVyIGRlZmF1bHQgdmFsdWVzLlxyXG4gICAgY2FzZSBcIm9iamVjdFwiOlxyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgICAgICAvLyBDb21wdXRlIHRoZSBkZWZhdWx0cyBmb3IgdGhpcyBub2RlLCB3aXRoIHRoZSBwYXJlbnQgZGVmYXVsdHMgd2UgbWlnaHRcclxuICAgICAgICAvLyBoYXZlIGZyb20gYSBwcmV2aW91cyBydW46IGRlZmF1bHRzW2tleV0uXHJcbiAgICAgICAgbGV0IGNvbXB1dGVkRGVmYXVsdCA9IGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzW2tleV0sXHJcbiAgICAgICAgICAoZGVmYXVsdHMgfHwge30pW2tleV0sXHJcbiAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgKGZvcm1EYXRhIHx8IHt9KVtrZXldLFxyXG4gICAgICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGluY2x1ZGVVbmRlZmluZWRWYWx1ZXMgfHwgY29tcHV0ZWREZWZhdWx0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGFjY1trZXldID0gY29tcHV0ZWREZWZhdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICB9LCB7fSk7XHJcblxyXG4gICAgY2FzZSBcImFycmF5XCI6XHJcbiAgICAgIC8vIEluamVjdCBkZWZhdWx0cyBpbnRvIGV4aXN0aW5nIGFycmF5IGRlZmF1bHRzXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRlZmF1bHRzKSkge1xyXG4gICAgICAgIGRlZmF1bHRzID0gZGVmYXVsdHMubWFwKChpdGVtLCBpZHgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXHJcbiAgICAgICAgICAgIHNjaGVtYS5pdGVtc1tpZHhdIHx8IHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMgfHwge30sXHJcbiAgICAgICAgICAgIGl0ZW0sXHJcbiAgICAgICAgICAgIHJvb3RTY2hlbWFcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIERlZXBseSBpbmplY3QgZGVmYXVsdHMgaW50byBhbHJlYWR5IGV4aXN0aW5nIGZvcm0gZGF0YVxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXdGb3JtRGF0YSkpIHtcclxuICAgICAgICBkZWZhdWx0cyA9IHJhd0Zvcm1EYXRhLm1hcCgoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICAgICAgICBzY2hlbWEuaXRlbXMsXHJcbiAgICAgICAgICAgIChkZWZhdWx0cyB8fCB7fSlbaWR4XSxcclxuICAgICAgICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgICAgICAgaXRlbVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc2NoZW1hLm1pbkl0ZW1zKSB7XHJcbiAgICAgICAgaWYgKCFpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSkpIHtcclxuICAgICAgICAgIGNvbnN0IGRlZmF1bHRzTGVuZ3RoID0gZGVmYXVsdHMgPyBkZWZhdWx0cy5sZW5ndGggOiAwO1xyXG4gICAgICAgICAgaWYgKHNjaGVtYS5taW5JdGVtcyA+IGRlZmF1bHRzTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRFbnRyaWVzID0gZGVmYXVsdHMgfHwgW107XHJcbiAgICAgICAgICAgIC8vIHBvcHVsYXRlIHRoZSBhcnJheSB3aXRoIHRoZSBkZWZhdWx0c1xyXG4gICAgICAgICAgICBjb25zdCBmaWxsZXJTY2hlbWEgPSBBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcylcclxuICAgICAgICAgICAgICA/IHNjaGVtYS5hZGRpdGlvbmFsSXRlbXNcclxuICAgICAgICAgICAgICA6IHNjaGVtYS5pdGVtcztcclxuICAgICAgICAgICAgY29uc3QgZmlsbGVyRW50cmllcyA9IGZpbGwoXHJcbiAgICAgICAgICAgICAgbmV3IEFycmF5KHNjaGVtYS5taW5JdGVtcyAtIGRlZmF1bHRzTGVuZ3RoKSxcclxuICAgICAgICAgICAgICBjb21wdXRlRGVmYXVsdHMoZmlsbGVyU2NoZW1hLCBmaWxsZXJTY2hlbWEuZGVmYXVsdHMsIHJvb3RTY2hlbWEpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIHRoZW4gZmlsbCB1cCB0aGUgcmVzdCB3aXRoIGVpdGhlciB0aGUgaXRlbSBkZWZhdWx0IG9yIGVtcHR5LCB1cCB0byBtaW5JdGVtc1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRFbnRyaWVzLmNvbmNhdChmaWxsZXJFbnRyaWVzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGRlZmF1bHRzID8gZGVmYXVsdHMgOiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGRlZmF1bHRzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdEZvcm1TdGF0ZShcclxuICBfc2NoZW1hLFxyXG4gIGZvcm1EYXRhLFxyXG4gIHJvb3RTY2hlbWEgPSB7fSxcclxuICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzID0gZmFsc2VcclxuKSB7XHJcbiAgaWYgKCFpc09iamVjdChfc2NoZW1hKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzY2hlbWE6IFwiICsgX3NjaGVtYSk7XHJcbiAgfVxyXG4gIGNvbnN0IHNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKF9zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICBjb25zdCBkZWZhdWx0cyA9IGNvbXB1dGVEZWZhdWx0cyhcclxuICAgIHNjaGVtYSxcclxuICAgIF9zY2hlbWEuZGVmYXVsdCxcclxuICAgIHJvb3RTY2hlbWEsXHJcbiAgICBmb3JtRGF0YSxcclxuICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcclxuICApO1xyXG4gIGlmICh0eXBlb2YgZm9ybURhdGEgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIC8vIE5vIGZvcm0gZGF0YT8gVXNlIHNjaGVtYSBkZWZhdWx0cy5cclxuICAgIHJldHVybiBkZWZhdWx0cztcclxuICB9XHJcbiAgaWYgKGlzT2JqZWN0KGZvcm1EYXRhKSB8fCBBcnJheS5pc0FycmF5KGZvcm1EYXRhKSkge1xyXG4gICAgcmV0dXJuIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHMsIGZvcm1EYXRhKTtcclxuICB9XHJcbiAgaWYgKGZvcm1EYXRhID09PSAwIHx8IGZvcm1EYXRhID09PSBmYWxzZSB8fCBmb3JtRGF0YSA9PT0gXCJcIikge1xyXG4gICAgcmV0dXJuIGZvcm1EYXRhO1xyXG4gIH1cclxuICByZXR1cm4gZm9ybURhdGEgfHwgZGVmYXVsdHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXaGVuIG1lcmdpbmcgZGVmYXVsdHMgYW5kIGZvcm0gZGF0YSwgd2Ugd2FudCB0byBtZXJnZSBpbiB0aGlzIHNwZWNpZmljIHdheTpcclxuICogLSBvYmplY3RzIGFyZSBkZWVwbHkgbWVyZ2VkXHJcbiAqIC0gYXJyYXlzIGFyZSBtZXJnZWQgaW4gc3VjaCBhIHdheSB0aGF0OlxyXG4gKiAgIC0gd2hlbiB0aGUgYXJyYXkgaXMgc2V0IGluIGZvcm0gZGF0YSwgb25seSBhcnJheSBlbnRyaWVzIHNldCBpbiBmb3JtIGRhdGFcclxuICogICAgIGFyZSBkZWVwbHkgbWVyZ2VkOyBhZGRpdGlvbmFsIGVudHJpZXMgZnJvbSB0aGUgZGVmYXVsdHMgYXJlIGlnbm9yZWRcclxuICogICAtIHdoZW4gdGhlIGFycmF5IGlzIG5vdCBzZXQgaW4gZm9ybSBkYXRhLCB0aGUgZGVmYXVsdCBpcyBjb3BpZWQgb3ZlclxyXG4gKiAtIHNjYWxhcnMgYXJlIG92ZXJ3cml0dGVuL3NldCBieSBmb3JtIGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZmF1bHRzV2l0aEZvcm1EYXRhKGRlZmF1bHRzLCBmb3JtRGF0YSkge1xyXG4gIGlmIChBcnJheS5pc0FycmF5KGZvcm1EYXRhKSkge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRlZmF1bHRzKSkge1xyXG4gICAgICBkZWZhdWx0cyA9IFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvcm1EYXRhLm1hcCgodmFsdWUsIGlkeCkgPT4ge1xyXG4gICAgICBpZiAoZGVmYXVsdHNbaWR4XSkge1xyXG4gICAgICAgIHJldHVybiBtZXJnZURlZmF1bHRzV2l0aEZvcm1EYXRhKGRlZmF1bHRzW2lkeF0sIHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9KTtcclxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGZvcm1EYXRhKSkge1xyXG4gICAgY29uc3QgYWNjID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMpOyAvLyBQcmV2ZW50IG11dGF0aW9uIG9mIHNvdXJjZSBvYmplY3QuXHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9ybURhdGEpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgICAgYWNjW2tleV0gPSBtZXJnZURlZmF1bHRzV2l0aEZvcm1EYXRhKFxyXG4gICAgICAgIGRlZmF1bHRzID8gZGVmYXVsdHNba2V5XSA6IHt9LFxyXG4gICAgICAgIGZvcm1EYXRhW2tleV1cclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIGFjYyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBmb3JtRGF0YTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVaU9wdGlvbnModWlTY2hlbWEpIHtcclxuICAvLyBnZXQgYWxsIHBhc3NlZCBvcHRpb25zIGZyb20gdWk6d2lkZ2V0LCB1aTpvcHRpb25zLCBhbmQgdWk6PG9wdGlvbk5hbWU+XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHVpU2NoZW1hKVxyXG4gICAgLmZpbHRlcihrZXkgPT4ga2V5LmluZGV4T2YoXCJ1aTpcIikgPT09IDApXHJcbiAgICAucmVkdWNlKChvcHRpb25zLCBrZXkpID0+IHtcclxuICAgICAgY29uc3QgdmFsdWUgPSB1aVNjaGVtYVtrZXldO1xyXG4gICAgICBpZiAoa2V5ID09PSBcInVpOndpZGdldFwiICYmIGlzT2JqZWN0KHZhbHVlKSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICAgIFwiU2V0dGluZyBvcHRpb25zIHZpYSB1aTp3aWRnZXQgb2JqZWN0IGlzIGRlcHJlY2F0ZWQsIHVzZSB1aTpvcHRpb25zIGluc3RlYWRcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgICAuLi4odmFsdWUub3B0aW9ucyB8fCB7fSksXHJcbiAgICAgICAgICB3aWRnZXQ6IHZhbHVlLmNvbXBvbmVudCxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChrZXkgPT09IFwidWk6b3B0aW9uc1wiICYmIGlzT2JqZWN0KHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiB7IC4uLm9wdGlvbnMsIC4uLnZhbHVlIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgLi4ub3B0aW9ucywgW2tleS5zdWJzdHJpbmcoMyldOiB2YWx1ZSB9O1xyXG4gICAgfSwge30pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzcGxheUxhYmVsKHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEpIHtcclxuICBjb25zdCB1aU9wdGlvbnMgPSBnZXRVaU9wdGlvbnModWlTY2hlbWEpO1xyXG4gIGxldCB7IGxhYmVsOiBkaXNwbGF5TGFiZWwgPSB0cnVlIH0gPSB1aU9wdGlvbnM7XHJcbiAgY29uc3Qgc2NoZW1hVHlwZSA9IGdldFNjaGVtYVR5cGUoc2NoZW1hKTtcclxuXHJcbiAgaWYgKHNjaGVtYVR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgZGlzcGxheUxhYmVsID1cclxuICAgICAgaXNNdWx0aVNlbGVjdChzY2hlbWEsIHJvb3RTY2hlbWEpIHx8XHJcbiAgICAgIGlzRmlsZXNBcnJheShzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hKTtcclxuICB9XHJcblxyXG4gIGlmIChzY2hlbWFUeXBlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPSBmYWxzZTtcclxuICB9XHJcbiAgaWYgKHNjaGVtYVR5cGUgPT09IFwiYm9vbGVhblwiICYmICF1aVNjaGVtYVtcInVpOndpZGdldFwiXSkge1xyXG4gICAgZGlzcGxheUxhYmVsID0gZmFsc2U7XHJcbiAgfVxyXG4gIGlmICh1aVNjaGVtYVtcInVpOmZpZWxkXCJdKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPSBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIGRpc3BsYXlMYWJlbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHRoaW5nKSB7XHJcbiAgaWYgKHR5cGVvZiBGaWxlICE9PSBcInVuZGVmaW5lZFwiICYmIHRoaW5nIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSBcIm9iamVjdFwiICYmIHRoaW5nICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHRoaW5nKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT2JqZWN0cyhvYmoxLCBvYmoyLCBjb25jYXRBcnJheXMgPSBmYWxzZSkge1xyXG4gIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIGRlZXBseSBuZXN0ZWQgb2JqZWN0cy5cclxuICB2YXIgYWNjID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqMSk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cclxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqMikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgY29uc3QgbGVmdCA9IG9iajEgPyBvYmoxW2tleV0gOiB7fSxcclxuICAgICAgcmlnaHQgPSBvYmoyW2tleV07XHJcbiAgICBpZiAob2JqMSAmJiBvYmoxLmhhc093blByb3BlcnR5KGtleSkgJiYgaXNPYmplY3QocmlnaHQpKSB7XHJcbiAgICAgIGFjY1trZXldID0gbWVyZ2VPYmplY3RzKGxlZnQsIHJpZ2h0LCBjb25jYXRBcnJheXMpO1xyXG4gICAgfSBlbHNlIGlmIChjb25jYXRBcnJheXMgJiYgQXJyYXkuaXNBcnJheShsZWZ0KSAmJiBBcnJheS5pc0FycmF5KHJpZ2h0KSkge1xyXG4gICAgICBhY2Nba2V5XSA9IGxlZnQuY29uY2F0KHJpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFjY1trZXldID0gcmlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIGFjYyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhc051bWJlcih2YWx1ZSkge1xyXG4gIGlmICh2YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgaWYgKC9cXC4kLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgLy8gXCIzLlwiIGNhbid0IHJlYWxseSBiZSBjb25zaWRlcmVkIGEgbnVtYmVyIGV2ZW4gaWYgaXQgcGFyc2VzIGluIGpzLiBUaGVcclxuICAgIC8vIHVzZXIgaXMgbW9zdCBsaWtlbHkgZW50ZXJpbmcgYSBmbG9hdC5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgaWYgKC9cXC4wJC8udGVzdCh2YWx1ZSkpIHtcclxuICAgIC8vIHdlIG5lZWQgdG8gcmV0dXJuIHRoaXMgYXMgYSBzdHJpbmcgaGVyZSwgdG8gYWxsb3cgZm9yIGlucHV0IGxpa2UgMy4wN1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICBjb25zdCBuID0gTnVtYmVyKHZhbHVlKTtcclxuICBjb25zdCB2YWxpZCA9IHR5cGVvZiBuID09PSBcIm51bWJlclwiICYmICFOdW1iZXIuaXNOYU4obik7XHJcblxyXG4gIGlmICgvXFwuXFxkKjAkLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgLy8gSXQncyBhIG51bWJlciwgdGhhdCdzIGNvb2wgLSBidXQgd2UgbmVlZCBpdCBhcyBhIHN0cmluZyBzbyBpdCBkb2Vzbid0IHNjcmV3XHJcbiAgICAvLyB3aXRoIHRoZSB1c2VyIHdoZW4gZW50ZXJpbmcgZG9sbGFyIGFtb3VudHMgb3Igb3RoZXIgdmFsdWVzIChzdWNoIGFzIHRob3NlIHdpdGhcclxuICAgIC8vIHNwZWNpZmljIHByZWNpc2lvbiBvciBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzKVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbGlkID8gbiA6IHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIG9yZGVyKSB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KG9yZGVyKSkge1xyXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhcnJheVRvSGFzaCA9IGFyciA9PlxyXG4gICAgYXJyLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xyXG4gICAgICBwcmV2W2N1cnJdID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICB9LCB7fSk7XHJcbiAgY29uc3QgZXJyb3JQcm9wTGlzdCA9IGFyciA9PlxyXG4gICAgYXJyLmxlbmd0aCA+IDFcclxuICAgICAgPyBgcHJvcGVydGllcyAnJHthcnIuam9pbihcIicsICdcIil9J2BcclxuICAgICAgOiBgcHJvcGVydHkgJyR7YXJyWzBdfSdgO1xyXG4gIGNvbnN0IHByb3BlcnR5SGFzaCA9IGFycmF5VG9IYXNoKHByb3BlcnRpZXMpO1xyXG4gIGNvbnN0IG9yZGVyRmlsdGVyZWQgPSBvcmRlci5maWx0ZXIoXHJcbiAgICBwcm9wID0+IHByb3AgPT09IFwiKlwiIHx8IHByb3BlcnR5SGFzaFtwcm9wXVxyXG4gICk7XHJcbiAgY29uc3Qgb3JkZXJIYXNoID0gYXJyYXlUb0hhc2gob3JkZXJGaWx0ZXJlZCk7XHJcblxyXG4gIGNvbnN0IHJlc3QgPSBwcm9wZXJ0aWVzLmZpbHRlcihwcm9wID0+ICFvcmRlckhhc2hbcHJvcF0pO1xyXG4gIGNvbnN0IHJlc3RJbmRleCA9IG9yZGVyRmlsdGVyZWQuaW5kZXhPZihcIipcIik7XHJcbiAgaWYgKHJlc3RJbmRleCA9PT0gLTEpIHtcclxuICAgIGlmIChyZXN0Lmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYHVpU2NoZW1hIG9yZGVyIGxpc3QgZG9lcyBub3QgY29udGFpbiAke2Vycm9yUHJvcExpc3QocmVzdCl9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9yZGVyRmlsdGVyZWQ7XHJcbiAgfVxyXG4gIGlmIChyZXN0SW5kZXggIT09IG9yZGVyRmlsdGVyZWQubGFzdEluZGV4T2YoXCIqXCIpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1aVNjaGVtYSBvcmRlciBsaXN0IGNvbnRhaW5zIG1vcmUgdGhhbiBvbmUgd2lsZGNhcmQgaXRlbVwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBsZXRlID0gWy4uLm9yZGVyRmlsdGVyZWRdO1xyXG4gIGNvbXBsZXRlLnNwbGljZShyZXN0SW5kZXgsIDEsIC4uLnJlc3QpO1xyXG4gIHJldHVybiBjb21wbGV0ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSBnaXZlbiBzY2hlbWEgbWF0Y2hlcyBhIHNpbmdsZVxyXG4gKiBjb25zdGFudCB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnN0YW50KHNjaGVtYSkge1xyXG4gIHJldHVybiAoXHJcbiAgICAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkgJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSB8fFxyXG4gICAgc2NoZW1hLmhhc093blByb3BlcnR5KFwiY29uc3RcIilcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9Db25zdGFudChzY2hlbWEpIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkgJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmVudW1bMF07XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJjb25zdFwiKSkge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5jb25zdDtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwic2NoZW1hIGNhbm5vdCBiZSBpbmZlcnJlZCBhcyBhIGNvbnN0YW50XCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VsZWN0KF9zY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSkge1xyXG4gIGNvbnN0IHNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKF9zY2hlbWEsIHJvb3RTY2hlbWEpO1xyXG4gIGNvbnN0IGFsdFNjaGVtYXMgPSBzY2hlbWEub25lT2YgfHwgc2NoZW1hLmFueU9mO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFsdFNjaGVtYXMpKSB7XHJcbiAgICByZXR1cm4gYWx0U2NoZW1hcy5ldmVyeShhbHRTY2hlbWFzID0+IGlzQ29uc3RhbnQoYWx0U2NoZW1hcykpO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSA9IHt9KSB7XHJcbiAgaWYgKCFzY2hlbWEudW5pcXVlSXRlbXMgfHwgIXNjaGVtYS5pdGVtcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gaXNTZWxlY3Qoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRmlsZXNBcnJheShzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hID0ge30pIHtcclxuICBpZiAodWlTY2hlbWFbXCJ1aTp3aWRnZXRcIl0gPT09IFwiZmlsZXNcIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaXRlbXMpIHtcclxuICAgIGNvbnN0IGl0ZW1zU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcclxuICAgIHJldHVybiBpdGVtc1NjaGVtYS50eXBlID09PSBcInN0cmluZ1wiICYmIGl0ZW1zU2NoZW1hLmZvcm1hdCA9PT0gXCJkYXRhLXVybFwiO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ZpeGVkSXRlbXMoc2NoZW1hKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSAmJlxyXG4gICAgc2NoZW1hLml0ZW1zLmxlbmd0aCA+IDAgJiZcclxuICAgIHNjaGVtYS5pdGVtcy5ldmVyeShpdGVtID0+IGlzT2JqZWN0KGl0ZW0pKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGxvd0FkZGl0aW9uYWxJdGVtcyhzY2hlbWEpIHtcclxuICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyA9PT0gdHJ1ZSkge1xyXG4gICAgY29uc29sZS53YXJuKFwiYWRkaXRpb25hbEl0ZW1zPXRydWUgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgfVxyXG4gIHJldHVybiBpc09iamVjdChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbnNMaXN0KHNjaGVtYSkge1xyXG4gIGlmIChzY2hlbWEuZW51bSkge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5lbnVtLm1hcCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgY29uc3QgbGFiZWwgPSAoc2NoZW1hLmVudW1OYW1lcyAmJiBzY2hlbWEuZW51bU5hbWVzW2ldKSB8fCBTdHJpbmcodmFsdWUpO1xyXG4gICAgICByZXR1cm4geyBsYWJlbCwgdmFsdWUgfTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBhbHRTY2hlbWFzID0gc2NoZW1hLm9uZU9mIHx8IHNjaGVtYS5hbnlPZjtcclxuICAgIHJldHVybiBhbHRTY2hlbWFzLm1hcCgoc2NoZW1hLCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdG9Db25zdGFudChzY2hlbWEpO1xyXG4gICAgICBjb25zdCBsYWJlbCA9IHNjaGVtYS50aXRsZSB8fCBTdHJpbmcodmFsdWUpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNjaGVtYSxcclxuICAgICAgICBsYWJlbCxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRTY2hlbWFEZWZpbml0aW9uKCRyZWYsIHJvb3RTY2hlbWEgPSB7fSkge1xyXG4gIGNvbnN0IG9yaWdSZWYgPSAkcmVmO1xyXG4gIGlmICgkcmVmLnN0YXJ0c1dpdGgoXCIjXCIpKSB7XHJcbiAgICAvLyBEZWNvZGUgVVJJIGZyYWdtZW50IHJlcHJlc2VudGF0aW9uLlxyXG4gICAgJHJlZiA9IGRlY29kZVVSSUNvbXBvbmVudCgkcmVmLnN1YnN0cmluZygxKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke29yaWdSZWZ9LmApO1xyXG4gIH1cclxuICBjb25zdCBjdXJyZW50ID0ganNvbnBvaW50ZXIuZ2V0KHJvb3RTY2hlbWEsICRyZWYpO1xyXG4gIGlmIChjdXJyZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke29yaWdSZWZ9LmApO1xyXG4gIH1cclxuICBpZiAoY3VycmVudC5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIikpIHtcclxuICAgIHJldHVybiBmaW5kU2NoZW1hRGVmaW5pdGlvbihjdXJyZW50LiRyZWYsIHJvb3RTY2hlbWEpO1xyXG4gIH1cclxuICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuLy8gSW4gdGhlIGNhc2Ugd2hlcmUgd2UgaGF2ZSB0byBpbXBsaWNpdGx5IGNyZWF0ZSBhIHNjaGVtYSwgaXQgaXMgdXNlZnVsIHRvIGtub3cgd2hhdCB0eXBlIHRvIHVzZVxyXG4vLyAgYmFzZWQgb24gdGhlIGRhdGEgd2UgYXJlIGRlZmluaW5nXHJcbmV4cG9ydCBjb25zdCBndWVzc1R5cGUgPSBmdW5jdGlvbiBndWVzc1R5cGUodmFsdWUpIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIHJldHVybiBcImFycmF5XCI7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiBcInN0cmluZ1wiO1xyXG4gIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIFwibnVsbFwiO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgcmV0dXJuIFwiYm9vbGVhblwiO1xyXG4gIH0gZWxzZSBpZiAoIWlzTmFOKHZhbHVlKSkge1xyXG4gICAgcmV0dXJuIFwibnVtYmVyXCI7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIHJldHVybiBcIm9iamVjdFwiO1xyXG4gIH1cclxuICAvLyBEZWZhdWx0IHRvIHN0cmluZyBpZiB3ZSBjYW4ndCBmaWd1cmUgaXQgb3V0XHJcbiAgcmV0dXJuIFwic3RyaW5nXCI7XHJcbn07XHJcblxyXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgY3JlYXRlIG5ldyBcInByb3BlcnRpZXNcIiBpdGVtcyBmb3IgZWFjaCBrZXkgaW4gb3VyIGZvcm1EYXRhXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyhcclxuICBzY2hlbWEsXHJcbiAgcm9vdFNjaGVtYSA9IHt9LFxyXG4gIGZvcm1EYXRhID0ge31cclxuKSB7XHJcbiAgLy8gQ2xvbmUgdGhlIHNjaGVtYSBzbyB3ZSBkb24ndCBydWluIHRoZSBjb25zdW1lcidzIG9yaWdpbmFsXHJcbiAgc2NoZW1hID0ge1xyXG4gICAgLi4uc2NoZW1hLFxyXG4gICAgcHJvcGVydGllczogeyAuLi5zY2hlbWEucHJvcGVydGllcyB9LFxyXG4gIH07XHJcblxyXG4gIE9iamVjdC5rZXlzKGZvcm1EYXRhKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBpZiAoc2NoZW1hLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAvLyBObyBuZWVkIHRvIHN0dWIsIG91ciBzY2hlbWEgYWxyZWFkeSBoYXMgdGhlIHByb3BlcnR5XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYWRkaXRpb25hbFByb3BlcnRpZXM7XHJcbiAgICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KFwiJHJlZlwiKSkge1xyXG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgIHsgJHJlZjogc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzW1wiJHJlZlwiXSB9LFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGFcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KFwidHlwZVwiKSkge1xyXG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHsgLi4uc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHsgdHlwZTogZ3Vlc3NUeXBlKGZvcm1EYXRhW2tleV0pIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlIHR5cGUgb2Ygb3VyIG5ldyBrZXkgc2hvdWxkIG1hdGNoIHRoZSBhZGRpdGlvbmFsUHJvcGVydGllcyB2YWx1ZTtcclxuICAgIHNjaGVtYS5wcm9wZXJ0aWVzW2tleV0gPSBhZGRpdGlvbmFsUHJvcGVydGllcztcclxuICAgIC8vIFNldCBvdXIgYWRkaXRpb25hbCBwcm9wZXJ0eSBmbGFnIHNvIHdlIGtub3cgaXQgd2FzIGR5bmFtaWNhbGx5IGFkZGVkXHJcbiAgICBzY2hlbWEucHJvcGVydGllc1trZXldW0FERElUSU9OQUxfUFJPUEVSVFlfRkxBR10gPSB0cnVlO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gc2NoZW1hO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSwgZm9ybURhdGEgPSB7fSkge1xyXG4gIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XHJcbiAgICByZXR1cm4gcmVzb2x2ZVJlZmVyZW5jZShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImRlcGVuZGVuY2llc1wiKSkge1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHJldHJpZXZlU2NoZW1hKHJlc29sdmVkU2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJhbGxPZlwiKSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uc2NoZW1hLFxyXG4gICAgICBhbGxPZjogc2NoZW1hLmFsbE9mLm1hcChhbGxPZlN1YnNjaGVtYSA9PlxyXG4gICAgICAgIHJldHJpZXZlU2NoZW1hKGFsbE9mU3Vic2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcclxuICAgICAgKSxcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIE5vICRyZWYgb3IgZGVwZW5kZW5jaWVzIGF0dHJpYnV0ZSBmb3VuZCwgcmV0dXJuaW5nIHRoZSBvcmlnaW5hbCBzY2hlbWEuXHJcbiAgICByZXR1cm4gc2NoZW1hO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzb2x2ZVJlZmVyZW5jZShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKSB7XHJcbiAgLy8gUmV0cmlldmUgdGhlIHJlZmVyZW5jZWQgc2NoZW1hIGRlZmluaXRpb24uXHJcbiAgY29uc3QgJHJlZlNjaGVtYSA9IGZpbmRTY2hlbWFEZWZpbml0aW9uKHNjaGVtYS4kcmVmLCByb290U2NoZW1hKTtcclxuICAvLyBEcm9wIHRoZSAkcmVmIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugc2NoZW1hLlxyXG4gIGNvbnN0IHsgJHJlZiwgLi4ubG9jYWxTY2hlbWEgfSA9IHNjaGVtYTtcclxuICAvLyBVcGRhdGUgcmVmZXJlbmNlZCBzY2hlbWEgZGVmaW5pdGlvbiB3aXRoIGxvY2FsIHNjaGVtYSBwcm9wZXJ0aWVzLlxyXG4gIHJldHVybiByZXRyaWV2ZVNjaGVtYShcclxuICAgIHsgLi4uJHJlZlNjaGVtYSwgLi4ubG9jYWxTY2hlbWEgfSxcclxuICAgIHJvb3RTY2hlbWEsXHJcbiAgICBmb3JtRGF0YVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSwgZm9ybURhdGEgPSB7fSkge1xyXG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSkge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuICBsZXQgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIGlmIChcImFsbE9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNvbHZlZFNjaGVtYSA9IG1lcmdlQWxsT2Yoe1xyXG4gICAgICAgIC4uLnJlc29sdmVkU2NoZW1hLFxyXG4gICAgICAgIGFsbE9mOiByZXNvbHZlZFNjaGVtYS5hbGxPZixcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcImNvdWxkIG5vdCBtZXJnZSBzdWJzY2hlbWFzIGluIGFsbE9mOlxcblwiICsgZSk7XHJcbiAgICAgIGNvbnN0IHsgYWxsT2YsIC4uLnJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mIH0gPSByZXNvbHZlZFNjaGVtYTtcclxuICAgICAgcmV0dXJuIHJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mO1xyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCBoYXNBZGRpdGlvbmFsUHJvcGVydGllcyA9XHJcbiAgICByZXNvbHZlZFNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpICYmXHJcbiAgICByZXNvbHZlZFNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyAhPT0gZmFsc2U7XHJcbiAgaWYgKGhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XHJcbiAgICByZXR1cm4gc3R1YkV4aXN0aW5nQWRkaXRpb25hbFByb3BlcnRpZXMoXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YVxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc29sdmVkU2NoZW1hO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpIHtcclxuICAvLyBEcm9wIHRoZSBkZXBlbmRlbmNpZXMgZnJvbSB0aGUgc291cmNlIHNjaGVtYS5cclxuICBsZXQgeyBkZXBlbmRlbmNpZXMgPSB7fSwgLi4ucmVzb2x2ZWRTY2hlbWEgfSA9IHNjaGVtYTtcclxuICBpZiAoXCJvbmVPZlwiIGluIHJlc29sdmVkU2NoZW1hKSB7XHJcbiAgICByZXNvbHZlZFNjaGVtYSA9XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLm9uZU9mW1xyXG4gICAgICAgIGdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCByZXNvbHZlZFNjaGVtYS5vbmVPZiwgcm9vdFNjaGVtYSlcclxuICAgICAgXTtcclxuICB9IGVsc2UgaWYgKFwiYW55T2ZcIiBpbiByZXNvbHZlZFNjaGVtYSkge1xyXG4gICAgcmVzb2x2ZWRTY2hlbWEgPVxyXG4gICAgICByZXNvbHZlZFNjaGVtYS5hbnlPZltcclxuICAgICAgICBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgcmVzb2x2ZWRTY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXHJcbiAgICAgIF07XHJcbiAgfVxyXG4gIHJldHVybiBwcm9jZXNzRGVwZW5kZW5jaWVzKFxyXG4gICAgZGVwZW5kZW5jaWVzLFxyXG4gICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGFcclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIHByb2Nlc3NEZXBlbmRlbmNpZXMoXHJcbiAgZGVwZW5kZW5jaWVzLFxyXG4gIHJlc29sdmVkU2NoZW1hLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGFcclxuKSB7XHJcbiAgLy8gUHJvY2VzcyBkZXBlbmRlbmNpZXMgdXBkYXRpbmcgdGhlIGxvY2FsIHNjaGVtYSBwcm9wZXJ0aWVzIGFzIGFwcHJvcHJpYXRlLlxyXG4gIGZvciAoY29uc3QgZGVwZW5kZW5jeUtleSBpbiBkZXBlbmRlbmNpZXMpIHtcclxuICAgIC8vIFNraXAgdGhpcyBkZXBlbmRlbmN5IGlmIGl0cyB0cmlnZ2VyIHByb3BlcnR5IGlzIG5vdCBwcmVzZW50LlxyXG4gICAgaWYgKGZvcm1EYXRhW2RlcGVuZGVuY3lLZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICAvLyBTa2lwIHRoaXMgZGVwZW5kZW5jeSBpZiBpdCBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIHNjaGVtYSAoc3VjaCBhcyB3aGVuIGRlcGVuZGVuY3lLZXkgaXMgaXRzZWxmIGEgaGlkZGVuIGRlcGVuZGVuY3kuKVxyXG4gICAgaWYgKFxyXG4gICAgICByZXNvbHZlZFNjaGVtYS5wcm9wZXJ0aWVzICYmXHJcbiAgICAgICEoZGVwZW5kZW5jeUtleSBpbiByZXNvbHZlZFNjaGVtYS5wcm9wZXJ0aWVzKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3Qge1xyXG4gICAgICBbZGVwZW5kZW5jeUtleV06IGRlcGVuZGVuY3lWYWx1ZSxcclxuICAgICAgLi4ucmVtYWluaW5nRGVwZW5kZW5jaWVzXHJcbiAgICB9ID0gZGVwZW5kZW5jaWVzO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwZW5kZW5jeVZhbHVlKSkge1xyXG4gICAgICByZXNvbHZlZFNjaGVtYSA9IHdpdGhEZXBlbmRlbnRQcm9wZXJ0aWVzKHJlc29sdmVkU2NoZW1hLCBkZXBlbmRlbmN5VmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmIChpc09iamVjdChkZXBlbmRlbmN5VmFsdWUpKSB7XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gd2l0aERlcGVuZGVudFNjaGVtYShcclxuICAgICAgICByZXNvbHZlZFNjaGVtYSxcclxuICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgIGRlcGVuZGVuY3lLZXksXHJcbiAgICAgICAgZGVwZW5kZW5jeVZhbHVlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJvY2Vzc0RlcGVuZGVuY2llcyhcclxuICAgICAgcmVtYWluaW5nRGVwZW5kZW5jaWVzLFxyXG4gICAgICByZXNvbHZlZFNjaGVtYSxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGFcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiByZXNvbHZlZFNjaGVtYTtcclxufVxyXG5cclxuZnVuY3Rpb24gd2l0aERlcGVuZGVudFByb3BlcnRpZXMoc2NoZW1hLCBhZGRpdGlvbmFsbHlSZXF1aXJlZCkge1xyXG4gIGlmICghYWRkaXRpb25hbGx5UmVxdWlyZWQpIHtcclxuICAgIHJldHVybiBzY2hlbWE7XHJcbiAgfVxyXG4gIGNvbnN0IHJlcXVpcmVkID0gQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpXHJcbiAgICA/IEFycmF5LmZyb20obmV3IFNldChbLi4uc2NoZW1hLnJlcXVpcmVkLCAuLi5hZGRpdGlvbmFsbHlSZXF1aXJlZF0pKVxyXG4gICAgOiBhZGRpdGlvbmFsbHlSZXF1aXJlZDtcclxuICByZXR1cm4geyAuLi5zY2hlbWEsIHJlcXVpcmVkOiByZXF1aXJlZCB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aXRoRGVwZW5kZW50U2NoZW1hKFxyXG4gIHNjaGVtYSxcclxuICByb290U2NoZW1hLFxyXG4gIGZvcm1EYXRhLFxyXG4gIGRlcGVuZGVuY3lLZXksXHJcbiAgZGVwZW5kZW5jeVZhbHVlXHJcbikge1xyXG4gIGxldCB7IG9uZU9mLCAuLi5kZXBlbmRlbnRTY2hlbWEgfSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgZGVwZW5kZW5jeVZhbHVlLFxyXG4gICAgcm9vdFNjaGVtYSxcclxuICAgIGZvcm1EYXRhXHJcbiAgKTtcclxuICBzY2hlbWEgPSBtZXJnZVNjaGVtYXMoc2NoZW1hLCBkZXBlbmRlbnRTY2hlbWEpO1xyXG4gIC8vIFNpbmNlIGl0IGRvZXMgbm90IGNvbnRhaW4gb25lT2YsIHdlIHJldHVybiB0aGUgb3JpZ2luYWwgc2NoZW1hLlxyXG4gIGlmIChvbmVPZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hO1xyXG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkob25lT2YpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQ6IGl0IGlzIHNvbWUgJHt0eXBlb2Ygb25lT2Z9IGluc3RlYWQgb2YgYW4gYXJyYXlgKTtcclxuICB9XHJcbiAgLy8gUmVzb2x2ZSAkcmVmcyBpbnNpZGUgb25lT2YuXHJcbiAgY29uc3QgcmVzb2x2ZWRPbmVPZiA9IG9uZU9mLm1hcChzdWJzY2hlbWEgPT5cclxuICAgIHN1YnNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIilcclxuICAgICAgPyByZXNvbHZlUmVmZXJlbmNlKHN1YnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgIDogc3Vic2NoZW1hXHJcbiAgKTtcclxuICByZXR1cm4gd2l0aEV4YWN0bHlPbmVTdWJzY2hlbWEoXHJcbiAgICBzY2hlbWEsXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGEsXHJcbiAgICBkZXBlbmRlbmN5S2V5LFxyXG4gICAgcmVzb2x2ZWRPbmVPZlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdpdGhFeGFjdGx5T25lU3Vic2NoZW1hKFxyXG4gIHNjaGVtYSxcclxuICByb290U2NoZW1hLFxyXG4gIGZvcm1EYXRhLFxyXG4gIGRlcGVuZGVuY3lLZXksXHJcbiAgb25lT2ZcclxuKSB7XHJcbiAgY29uc3QgdmFsaWRTdWJzY2hlbWFzID0gb25lT2YuZmlsdGVyKHN1YnNjaGVtYSA9PiB7XHJcbiAgICBpZiAoIXN1YnNjaGVtYS5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSB9ID0gc3Vic2NoZW1hLnByb3BlcnRpZXM7XHJcbiAgICBpZiAoY29uZGl0aW9uUHJvcGVydHlTY2hlbWEpIHtcclxuICAgICAgY29uc3QgY29uZGl0aW9uU2NoZW1hID0ge1xyXG4gICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCB7IGVycm9ycyB9ID0gdmFsaWRhdGVGb3JtRGF0YShmb3JtRGF0YSwgY29uZGl0aW9uU2NoZW1hKTtcclxuICAgICAgcmV0dXJuIGVycm9ycy5sZW5ndGggPT09IDA7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgaWYgKHZhbGlkU3Vic2NoZW1hcy5sZW5ndGggIT09IDEpIHtcclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgXCJpZ25vcmluZyBvbmVPZiBpbiBkZXBlbmRlbmNpZXMgYmVjYXVzZSB0aGVyZSBpc24ndCBleGFjdGx5IG9uZSBzdWJzY2hlbWEgdGhhdCBpcyB2YWxpZFwiXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHNjaGVtYTtcclxuICB9XHJcbiAgY29uc3Qgc3Vic2NoZW1hID0gdmFsaWRTdWJzY2hlbWFzWzBdO1xyXG4gIGNvbnN0IHtcclxuICAgIFtkZXBlbmRlbmN5S2V5XTogY29uZGl0aW9uUHJvcGVydHlTY2hlbWEsXHJcbiAgICAuLi5kZXBlbmRlbnRTdWJzY2hlbWFcclxuICB9ID0gc3Vic2NoZW1hLnByb3BlcnRpZXM7XHJcbiAgY29uc3QgZGVwZW5kZW50U2NoZW1hID0geyAuLi5zdWJzY2hlbWEsIHByb3BlcnRpZXM6IGRlcGVuZGVudFN1YnNjaGVtYSB9O1xyXG4gIHJldHVybiBtZXJnZVNjaGVtYXMoXHJcbiAgICBzY2hlbWEsXHJcbiAgICByZXRyaWV2ZVNjaGVtYShkZXBlbmRlbnRTY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFJlY3Vyc2l2ZWx5IG1lcmdlIGRlZXBseSBuZXN0ZWQgc2NoZW1hcy5cclxuLy8gVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBtZXJnZVNjaGVtYXMgYW5kIG1lcmdlT2JqZWN0c1xyXG4vLyBpcyB0aGF0IG1lcmdlU2NoZW1hcyBvbmx5IGNvbmNhdHMgYXJyYXlzIGZvclxyXG4vLyB2YWx1ZXMgdW5kZXIgdGhlIFwicmVxdWlyZWRcIiBrZXl3b3JkLCBhbmQgd2hlbiBpdCBkb2VzLFxyXG4vLyBpdCBkb2Vzbid0IGluY2x1ZGUgZHVwbGljYXRlIHZhbHVlcy5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU2NoZW1hcyhvYmoxLCBvYmoyKSB7XHJcbiAgdmFyIGFjYyA9IE9iamVjdC5hc3NpZ24oe30sIG9iajEpOyAvLyBQcmV2ZW50IG11dGF0aW9uIG9mIHNvdXJjZSBvYmplY3QuXHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iajIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgIGNvbnN0IGxlZnQgPSBvYmoxID8gb2JqMVtrZXldIDoge30sXHJcbiAgICAgIHJpZ2h0ID0gb2JqMltrZXldO1xyXG4gICAgaWYgKG9iajEgJiYgb2JqMS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGlzT2JqZWN0KHJpZ2h0KSkge1xyXG4gICAgICBhY2Nba2V5XSA9IG1lcmdlU2NoZW1hcyhsZWZ0LCByaWdodCk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBvYmoxICYmXHJcbiAgICAgIG9iajIgJiZcclxuICAgICAgKGdldFNjaGVtYVR5cGUob2JqMSkgPT09IFwib2JqZWN0XCIgfHwgZ2V0U2NoZW1hVHlwZShvYmoyKSA9PT0gXCJvYmplY3RcIikgJiZcclxuICAgICAga2V5ID09PSBcInJlcXVpcmVkXCIgJiZcclxuICAgICAgQXJyYXkuaXNBcnJheShsZWZ0KSAmJlxyXG4gICAgICBBcnJheS5pc0FycmF5KHJpZ2h0KVxyXG4gICAgKSB7XHJcbiAgICAgIC8vIERvbid0IGluY2x1ZGUgZHVwbGljYXRlIHZhbHVlcyB3aGVuIG1lcmdpbmdcclxuICAgICAgLy8gXCJyZXF1aXJlZFwiIGZpZWxkcy5cclxuICAgICAgYWNjW2tleV0gPSB1bmlvbihsZWZ0LCByaWdodCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhY2Nba2V5XSA9IHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCBhY2MpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyhvYmplY3QpIHtcclxuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWVwRXF1YWxzKGEsIGIsIGNhID0gW10sIGNiID0gW10pIHtcclxuICAvLyBQYXJ0aWFsbHkgZXh0cmFjdGVkIGZyb20gbm9kZS1kZWVwZXIgYW5kIGFkYXB0ZWQgdG8gZXhjbHVkZSBjb21wYXJpc29uXHJcbiAgLy8gY2hlY2tzIGZvciBmdW5jdGlvbnMuXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL290aGl5bTIzL25vZGUtZGVlcGVyXHJcbiAgaWYgKGEgPT09IGIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGEgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgYiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAvLyBBc3N1bWUgYWxsIGZ1bmN0aW9ucyBhcmUgZXF1aXZhbGVudFxyXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9yanNmLXRlYW0vcmVhY3QtanNvbnNjaGVtYS1mb3JtL2lzc3Vlcy8yNTVcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGEgIT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGIgIT09IFwib2JqZWN0XCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9IGVsc2UgaWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoYSBpbnN0YW5jZW9mIERhdGUgJiYgYiBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCk7XHJcbiAgfSBlbHNlIGlmIChhIGluc3RhbmNlb2YgUmVnRXhwICYmIGIgaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGEuc291cmNlID09PSBiLnNvdXJjZSAmJlxyXG4gICAgICBhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiZcclxuICAgICAgYS5tdWx0aWxpbmUgPT09IGIubXVsdGlsaW5lICYmXHJcbiAgICAgIGEubGFzdEluZGV4ID09PSBiLmxhc3RJbmRleCAmJlxyXG4gICAgICBhLmlnbm9yZUNhc2UgPT09IGIuaWdub3JlQ2FzZVxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKGlzQXJndW1lbnRzKGEpIHx8IGlzQXJndW1lbnRzKGIpKSB7XHJcbiAgICBpZiAoIShpc0FyZ3VtZW50cyhhKSAmJiBpc0FyZ3VtZW50cyhiKSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbGV0IHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xyXG4gICAgcmV0dXJuIGRlZXBFcXVhbHMoc2xpY2UuY2FsbChhKSwgc2xpY2UuY2FsbChiKSwgY2EsIGNiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGEuY29uc3RydWN0b3IgIT09IGIuY29uc3RydWN0b3IpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBrYSA9IE9iamVjdC5rZXlzKGEpO1xyXG4gICAgbGV0IGtiID0gT2JqZWN0LmtleXMoYik7XHJcbiAgICAvLyBkb24ndCBib3RoZXIgd2l0aCBzdGFjayBhY3JvYmF0aWNzIGlmIHRoZXJlJ3Mgbm90aGluZyB0aGVyZVxyXG4gICAgaWYgKGthLmxlbmd0aCA9PT0gMCAmJiBrYi5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoa2EubGVuZ3RoICE9PSBrYi5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjYWwgPSBjYS5sZW5ndGg7XHJcbiAgICB3aGlsZSAoY2FsLS0pIHtcclxuICAgICAgaWYgKGNhW2NhbF0gPT09IGEpIHtcclxuICAgICAgICByZXR1cm4gY2JbY2FsXSA9PT0gYjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2EucHVzaChhKTtcclxuICAgIGNiLnB1c2goYik7XHJcblxyXG4gICAga2Euc29ydCgpO1xyXG4gICAga2Iuc29ydCgpO1xyXG4gICAgZm9yICh2YXIgaiA9IGthLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgIGlmIChrYVtqXSAhPT0ga2Jbal0pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQga2V5O1xyXG4gICAgZm9yIChsZXQgayA9IGthLmxlbmd0aCAtIDE7IGsgPj0gMDsgay0tKSB7XHJcbiAgICAgIGtleSA9IGthW2tdO1xyXG4gICAgICBpZiAoIWRlZXBFcXVhbHMoYVtrZXldLCBiW2tleV0sIGNhLCBjYikpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYS5wb3AoKTtcclxuICAgIGNiLnBvcCgpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFJlbmRlcihjb21wLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gIGNvbnN0IHsgcHJvcHMsIHN0YXRlIH0gPSBjb21wO1xyXG4gIHJldHVybiAhZGVlcEVxdWFscyhwcm9wcywgbmV4dFByb3BzKSB8fCAhZGVlcEVxdWFscyhzdGF0ZSwgbmV4dFN0YXRlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvSWRTY2hlbWEoXHJcbiAgc2NoZW1hLFxyXG4gIGlkLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGEgPSB7fSxcclxuICBpZFByZWZpeCA9IFwicm9vdFwiXHJcbikge1xyXG4gIGNvbnN0IGlkU2NoZW1hID0ge1xyXG4gICAgJGlkOiBpZCB8fCBpZFByZWZpeCxcclxuICB9O1xyXG4gIGlmIChcIiRyZWZcIiBpbiBzY2hlbWEgfHwgXCJkZXBlbmRlbmNpZXNcIiBpbiBzY2hlbWEgfHwgXCJhbGxPZlwiIGluIHNjaGVtYSkge1xyXG4gICAgY29uc3QgX3NjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHRvSWRTY2hlbWEoX3NjaGVtYSwgaWQsIHJvb3RTY2hlbWEsIGZvcm1EYXRhLCBpZFByZWZpeCk7XHJcbiAgfVxyXG4gIGlmIChcIml0ZW1zXCIgaW4gc2NoZW1hICYmICFzY2hlbWEuaXRlbXMuJHJlZikge1xyXG4gICAgcmV0dXJuIHRvSWRTY2hlbWEoc2NoZW1hLml0ZW1zLCBpZCwgcm9vdFNjaGVtYSwgZm9ybURhdGEsIGlkUHJlZml4KTtcclxuICB9XHJcbiAgaWYgKHNjaGVtYS50eXBlICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gaWRTY2hlbWE7XHJcbiAgfVxyXG4gIGZvciAoY29uc3QgbmFtZSBpbiBzY2hlbWEucHJvcGVydGllcyB8fCB7fSkge1xyXG4gICAgY29uc3QgZmllbGQgPSBzY2hlbWEucHJvcGVydGllc1tuYW1lXTtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSBpZFNjaGVtYS4kaWQgKyBcIl9cIiArIG5hbWU7XHJcbiAgICBpZFNjaGVtYVtuYW1lXSA9IHRvSWRTY2hlbWEoXHJcbiAgICAgIGlzT2JqZWN0KGZpZWxkKSA/IGZpZWxkIDoge30sXHJcbiAgICAgIGZpZWxkSWQsXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCBmb3JtRGF0YSBpcyBub3QgYW4gb2JqZWN0IC0tIHRoaXMgY2FuIGhhcHBlbiBpZiBhblxyXG4gICAgICAvLyBhcnJheSBpdGVtIGhhcyBqdXN0IGJlZW4gYWRkZWQsIGJ1dCBub3QgcG9wdWxhdGVkIHdpdGggZGF0YSB5ZXRcclxuICAgICAgKGZvcm1EYXRhIHx8IHt9KVtuYW1lXSxcclxuICAgICAgaWRQcmVmaXhcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiBpZFNjaGVtYTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvUGF0aFNjaGVtYShzY2hlbWEsIG5hbWUgPSBcIlwiLCByb290U2NoZW1hLCBmb3JtRGF0YSA9IHt9KSB7XHJcbiAgY29uc3QgcGF0aFNjaGVtYSA9IHtcclxuICAgICRuYW1lOiBuYW1lLnJlcGxhY2UoL15cXC4vLCBcIlwiKSxcclxuICB9O1xyXG4gIGlmIChcIiRyZWZcIiBpbiBzY2hlbWEgfHwgXCJkZXBlbmRlbmNpZXNcIiBpbiBzY2hlbWEgfHwgXCJhbGxPZlwiIGluIHNjaGVtYSkge1xyXG4gICAgY29uc3QgX3NjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIHRvUGF0aFNjaGVtYShfc2NoZW1hLCBuYW1lLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgfVxyXG5cclxuICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIikpIHtcclxuICAgIHBhdGhTY2hlbWEuX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJpdGVtc1wiKSAmJiBBcnJheS5pc0FycmF5KGZvcm1EYXRhKSkge1xyXG4gICAgZm9ybURhdGEuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xyXG4gICAgICBwYXRoU2NoZW1hW2ldID0gdG9QYXRoU2NoZW1hKFxyXG4gICAgICAgIHNjaGVtYS5pdGVtcyxcclxuICAgICAgICBgJHtuYW1lfS4ke2l9YCxcclxuICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgIGVsZW1lbnRcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwicHJvcGVydGllc1wiKSkge1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBzY2hlbWEucHJvcGVydGllcykge1xyXG4gICAgICBwYXRoU2NoZW1hW3Byb3BlcnR5XSA9IHRvUGF0aFNjaGVtYShcclxuICAgICAgICBzY2hlbWEucHJvcGVydGllc1twcm9wZXJ0eV0sXHJcbiAgICAgICAgYCR7bmFtZX0uJHtwcm9wZXJ0eX1gLFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgLy8gSXQncyBwb3NzaWJsZSB0aGF0IGZvcm1EYXRhIGlzIG5vdCBhbiBvYmplY3QgLS0gdGhpcyBjYW4gaGFwcGVuIGlmIGFuXHJcbiAgICAgICAgLy8gYXJyYXkgaXRlbSBoYXMganVzdCBiZWVuIGFkZGVkLCBidXQgbm90IHBvcHVsYXRlZCB3aXRoIGRhdGEgeWV0XHJcbiAgICAgICAgKGZvcm1EYXRhIHx8IHt9KVtwcm9wZXJ0eV1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHBhdGhTY2hlbWE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGVTdHJpbmcoZGF0ZVN0cmluZywgaW5jbHVkZVRpbWUgPSB0cnVlKSB7XHJcbiAgaWYgKCFkYXRlU3RyaW5nKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB5ZWFyOiAtMSxcclxuICAgICAgbW9udGg6IC0xLFxyXG4gICAgICBkYXk6IC0xLFxyXG4gICAgICBob3VyOiBpbmNsdWRlVGltZSA/IC0xIDogMCxcclxuICAgICAgbWludXRlOiBpbmNsdWRlVGltZSA/IC0xIDogMCxcclxuICAgICAgc2Vjb25kOiBpbmNsdWRlVGltZSA/IC0xIDogMCxcclxuICAgIH07XHJcbiAgfVxyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcclxuICBpZiAoTnVtYmVyLmlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHBhcnNlIGRhdGUgXCIgKyBkYXRlU3RyaW5nKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IGRhdGUuZ2V0VVRDRnVsbFllYXIoKSxcclxuICAgIG1vbnRoOiBkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCAvLyBvaCB5b3UsIGphdmFzY3JpcHQuXHJcbiAgICBkYXk6IGRhdGUuZ2V0VVRDRGF0ZSgpLFxyXG4gICAgaG91cjogaW5jbHVkZVRpbWUgPyBkYXRlLmdldFVUQ0hvdXJzKCkgOiAwLFxyXG4gICAgbWludXRlOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDTWludXRlcygpIDogMCxcclxuICAgIHNlY29uZDogaW5jbHVkZVRpbWUgPyBkYXRlLmdldFVUQ1NlY29uZHMoKSA6IDAsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZVN0cmluZyhcclxuICB7IHllYXIsIG1vbnRoLCBkYXksIGhvdXIgPSAwLCBtaW51dGUgPSAwLCBzZWNvbmQgPSAwIH0sXHJcbiAgdGltZSA9IHRydWVcclxuKSB7XHJcbiAgY29uc3QgdXRjVGltZSA9IERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCk7XHJcbiAgY29uc3QgZGF0ZXRpbWUgPSBuZXcgRGF0ZSh1dGNUaW1lKS50b0pTT04oKTtcclxuICByZXR1cm4gdGltZSA/IGRhdGV0aW1lIDogZGF0ZXRpbWUuc2xpY2UoMCwgMTApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXRjVG9Mb2NhbChqc29uRGF0ZSkge1xyXG4gIGlmICghanNvbkRhdGUpIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVxdWlyZWQgZm9ybWF0IG9mIGBcInl5eXktTU0tZGRUaGg6bW1cIiBmb2xsb3dlZCBieSBvcHRpb25hbCBcIjpzc1wiIG9yIFwiOnNzLlNTU1wiXHJcbiAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5wdXQuaHRtbCNsb2NhbC1kYXRlLWFuZC10aW1lLXN0YXRlLSh0eXBlJTNEZGF0ZXRpbWUtbG9jYWwpXHJcbiAgLy8gPiBzaG91bGQgYmUgYSBfdmFsaWQgbG9jYWwgZGF0ZSBhbmQgdGltZSBzdHJpbmdfIChub3QgR01UKVxyXG5cclxuICAvLyBOb3RlIC0gZGF0ZSBjb25zdHJ1Y3RvciBwYXNzZWQgbG9jYWwgSVNPLTg2MDEgZG9lcyBub3QgY29ycmVjdGx5XHJcbiAgLy8gY2hhbmdlIHRpbWUgdG8gVVRDIGluIG5vZGUgcHJlLThcclxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoanNvbkRhdGUpO1xyXG5cclxuICBjb25zdCB5eXl5ID0gcGFkKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCk7XHJcbiAgY29uc3QgTU0gPSBwYWQoZGF0ZS5nZXRNb250aCgpICsgMSwgMik7XHJcbiAgY29uc3QgZGQgPSBwYWQoZGF0ZS5nZXREYXRlKCksIDIpO1xyXG4gIGNvbnN0IGhoID0gcGFkKGRhdGUuZ2V0SG91cnMoKSwgMik7XHJcbiAgY29uc3QgbW0gPSBwYWQoZGF0ZS5nZXRNaW51dGVzKCksIDIpO1xyXG4gIGNvbnN0IHNzID0gcGFkKGRhdGUuZ2V0U2Vjb25kcygpLCAyKTtcclxuICBjb25zdCBTU1MgPSBwYWQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMyk7XHJcblxyXG4gIHJldHVybiBgJHt5eXl5fS0ke01NfS0ke2RkfVQke2hofToke21tfToke3NzfS4ke1NTU31gO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9jYWxUb1VUQyhkYXRlU3RyaW5nKSB7XHJcbiAgaWYgKGRhdGVTdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlU3RyaW5nKS50b0pTT04oKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWQobnVtLCBzaXplKSB7XHJcbiAgbGV0IHMgPSBTdHJpbmcobnVtKTtcclxuICB3aGlsZSAocy5sZW5ndGggPCBzaXplKSB7XHJcbiAgICBzID0gXCIwXCIgKyBzO1xyXG4gIH1cclxuICByZXR1cm4gcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xyXG4gIC8vIFNwbGl0IG1ldGFkYXRhIGZyb20gZGF0YVxyXG4gIGNvbnN0IHNwbGl0dGVkID0gZGF0YVVSSS5zcGxpdChcIixcIik7XHJcbiAgLy8gU3BsaXQgcGFyYW1zXHJcbiAgY29uc3QgcGFyYW1zID0gc3BsaXR0ZWRbMF0uc3BsaXQoXCI7XCIpO1xyXG4gIC8vIEdldCBtaW1lLXR5cGUgZnJvbSBwYXJhbXNcclxuICBjb25zdCB0eXBlID0gcGFyYW1zWzBdLnJlcGxhY2UoXCJkYXRhOlwiLCBcIlwiKTtcclxuICAvLyBGaWx0ZXIgdGhlIG5hbWUgcHJvcGVydHkgZnJvbSBwYXJhbXNcclxuICBjb25zdCBwcm9wZXJ0aWVzID0gcGFyYW1zLmZpbHRlcihwYXJhbSA9PiB7XHJcbiAgICByZXR1cm4gcGFyYW0uc3BsaXQoXCI9XCIpWzBdID09PSBcIm5hbWVcIjtcclxuICB9KTtcclxuICAvLyBMb29rIGZvciB0aGUgbmFtZSBhbmQgdXNlIHVua25vd24gaWYgbm8gbmFtZSBwcm9wZXJ0eS5cclxuICBsZXQgbmFtZTtcclxuICBpZiAocHJvcGVydGllcy5sZW5ndGggIT09IDEpIHtcclxuICAgIG5hbWUgPSBcInVua25vd25cIjtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gQmVjYXVzZSB3ZSBmaWx0ZXJlZCBvdXQgdGhlIG90aGVyIHByb3BlcnR5LFxyXG4gICAgLy8gd2Ugb25seSBoYXZlIHRoZSBuYW1lIGNhc2UgaGVyZS5cclxuICAgIG5hbWUgPSBwcm9wZXJ0aWVzWzBdLnNwbGl0KFwiPVwiKVsxXTtcclxuICB9XHJcblxyXG4gIC8vIEJ1aWx0IHRoZSBVaW50OEFycmF5IEJsb2IgcGFyYW1ldGVyIGZyb20gdGhlIGJhc2U2NCBzdHJpbmcuXHJcbiAgY29uc3QgYmluYXJ5ID0gYXRvYihzcGxpdHRlZFsxXSk7XHJcbiAgY29uc3QgYXJyYXkgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmFyeS5sZW5ndGg7IGkrKykge1xyXG4gICAgYXJyYXkucHVzaChiaW5hcnkuY2hhckNvZGVBdChpKSk7XHJcbiAgfVxyXG4gIC8vIENyZWF0ZSB0aGUgYmxvYiBvYmplY3RcclxuICBjb25zdCBibG9iID0gbmV3IHdpbmRvdy5CbG9iKFtuZXcgVWludDhBcnJheShhcnJheSldLCB7IHR5cGUgfSk7XHJcblxyXG4gIHJldHVybiB7IGJsb2IsIG5hbWUgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlU3BlYyhzY2hlbWEpIHtcclxuICBjb25zdCBzcGVjID0ge307XHJcbiAgaWYgKHNjaGVtYS5tdWx0aXBsZU9mKSB7XHJcbiAgICBzcGVjLnN0ZXAgPSBzY2hlbWEubXVsdGlwbGVPZjtcclxuICB9XHJcbiAgaWYgKHNjaGVtYS5taW5pbXVtIHx8IHNjaGVtYS5taW5pbXVtID09PSAwKSB7XHJcbiAgICBzcGVjLm1pbiA9IHNjaGVtYS5taW5pbXVtO1xyXG4gIH1cclxuICBpZiAoc2NoZW1hLm1heGltdW0gfHwgc2NoZW1hLm1heGltdW0gPT09IDApIHtcclxuICAgIHNwZWMubWF4ID0gc2NoZW1hLm1heGltdW07XHJcbiAgfVxyXG4gIHJldHVybiBzcGVjO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIG9wdGlvbnMsIHJvb3RTY2hlbWEpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XHJcblxyXG4gICAgLy8gSWYgdGhlIHNjaGVtYSBkZXNjcmliZXMgYW4gb2JqZWN0IHRoZW4gd2UgbmVlZCB0byBhZGQgc2xpZ2h0bHkgbW9yZVxyXG4gICAgLy8gc3RyaWN0IG1hdGNoaW5nIHRvIHRoZSBzY2hlbWEsIGJlY2F1c2UgdW5sZXNzIHRoZSBzY2hlbWEgdXNlcyB0aGVcclxuICAgIC8vIFwicmVxdWlyZXNcIiBrZXl3b3JkLCBhbiBvYmplY3Qgd2lsbCBtYXRjaCB0aGUgc2NoZW1hIGFzIGxvbmcgYXMgaXRcclxuICAgIC8vIGRvZXNuJ3QgaGF2ZSBtYXRjaGluZyBrZXlzIHdpdGggYSBjb25mbGljdGluZyB0eXBlLiBUbyBkbyB0aGlzIHdlIHVzZSBhblxyXG4gICAgLy8gXCJhbnlPZlwiIHdpdGggYW4gYXJyYXkgb2YgcmVxdWlyZXMuIFRoaXMgYXVnbWVudGF0aW9uIGV4cHJlc3NlcyB0aGF0IHRoZVxyXG4gICAgLy8gc2NoZW1hIHNob3VsZCBtYXRjaCBpZiBhbnkgb2YgdGhlIGtleXMgaW4gdGhlIHNjaGVtYSBhcmUgcHJlc2VudCBvbiB0aGVcclxuICAgIC8vIG9iamVjdCBhbmQgcGFzcyB2YWxpZGF0aW9uLlxyXG4gICAgaWYgKG9wdGlvbi5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgIC8vIENyZWF0ZSBhbiBcImFueU9mXCIgc2NoZW1hIHRoYXQgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIG9mIHRoZSBrZXlzIGluIHRoZVxyXG4gICAgICAvLyBcInByb3BlcnRpZXNcIiBvYmplY3RcclxuICAgICAgY29uc3QgcmVxdWlyZXNBbnlPZiA9IHtcclxuICAgICAgICBhbnlPZjogT2JqZWN0LmtleXMob3B0aW9uLnByb3BlcnRpZXMpLm1hcChrZXkgPT4gKHtcclxuICAgICAgICAgIHJlcXVpcmVkOiBba2V5XSxcclxuICAgICAgICB9KSksXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgYXVnbWVudGVkU2NoZW1hO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIFwiYW55T2ZcIiBrZXl3b3JkIGFscmVhZHkgZXhpc3RzLCB3cmFwIHRoZSBhdWdtZW50YXRpb24gaW4gYW4gXCJhbGxPZlwiXHJcbiAgICAgIGlmIChvcHRpb24uYW55T2YpIHtcclxuICAgICAgICAvLyBDcmVhdGUgYSBzaGFsbG93IGNsb25lIG9mIHRoZSBvcHRpb25cclxuICAgICAgICBjb25zdCB7IC4uLnNoYWxsb3dDbG9uZSB9ID0gb3B0aW9uO1xyXG5cclxuICAgICAgICBpZiAoIXNoYWxsb3dDbG9uZS5hbGxPZikge1xyXG4gICAgICAgICAgc2hhbGxvd0Nsb25lLmFsbE9mID0gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIElmIFwiYWxsT2ZcIiBhbHJlYWR5IGV4aXN0cywgc2hhbGxvdyBjbG9uZSB0aGUgYXJyYXlcclxuICAgICAgICAgIHNoYWxsb3dDbG9uZS5hbGxPZiA9IHNoYWxsb3dDbG9uZS5hbGxPZi5zbGljZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hhbGxvd0Nsb25lLmFsbE9mLnB1c2gocmVxdWlyZXNBbnlPZik7XHJcblxyXG4gICAgICAgIGF1Z21lbnRlZFNjaGVtYSA9IHNoYWxsb3dDbG9uZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhdWdtZW50ZWRTY2hlbWEgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb24sIHJlcXVpcmVzQW55T2YpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZW1vdmUgdGhlIFwicmVxdWlyZWRcIiBmaWVsZCBhcyBpdCdzIGxpa2VseSB0aGF0IG5vdCBhbGwgZmllbGRzIGhhdmVcclxuICAgICAgLy8gYmVlbiBmaWxsZWQgaW4geWV0LCB3aGljaCB3aWxsIG1lYW4gdGhhdCB0aGUgc2NoZW1hIGlzIG5vdCB2YWxpZFxyXG4gICAgICBkZWxldGUgYXVnbWVudGVkU2NoZW1hLnJlcXVpcmVkO1xyXG5cclxuICAgICAgaWYgKGlzVmFsaWQoYXVnbWVudGVkU2NoZW1hLCBmb3JtRGF0YSwgcm9vdFNjaGVtYSkpIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChpc1ZhbGlkKG9wdGlvbiwgZm9ybURhdGEsIHJvb3RTY2hlbWEpKSB7XHJcbiAgICAgIHJldHVybiBpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gMDtcclxufVxyXG5cclxuLy8gQ2hlY2sgdG8gc2VlIGlmIGEgc2NoZW1hIHNwZWNpZmllcyB0aGF0IGEgdmFsdWUgbXVzdCBiZSB0cnVlXHJcbmV4cG9ydCBmdW5jdGlvbiBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZShzY2hlbWEpIHtcclxuICAvLyBDaGVjayBpZiBjb25zdCBpcyBhIHRydXRoeSB2YWx1ZVxyXG4gIGlmIChzY2hlbWEuY29uc3QpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgaWYgYW4gZW51bSBoYXMgYSBzaW5nbGUgdmFsdWUgb2YgdHJ1ZVxyXG4gIGlmIChzY2hlbWEuZW51bSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEgJiYgc2NoZW1hLmVudW1bMF0gPT09IHRydWUpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgYW55T2YgaGFzIGEgc2luZ2xlIHZhbHVlLCBldmFsdWF0ZSB0aGUgc3Vic2NoZW1hXHJcbiAgaWYgKHNjaGVtYS5hbnlPZiAmJiBzY2hlbWEuYW55T2YubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUoc2NoZW1hLmFueU9mWzBdKTtcclxuICB9XHJcblxyXG4gIC8vIElmIG9uZU9mIGhhcyBhIHNpbmdsZSB2YWx1ZSwgZXZhbHVhdGUgdGhlIHN1YnNjaGVtYVxyXG4gIGlmIChzY2hlbWEub25lT2YgJiYgc2NoZW1hLm9uZU9mLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYS5vbmVPZlswXSk7XHJcbiAgfVxyXG5cclxuICAvLyBFdmFsdWF0ZSBlYWNoIHN1YnNjaGVtYSBpbiBhbGxPZiwgdG8gc2VlIGlmIG9uZSBvZiB0aGVtIHJlcXVpcmVzIGEgdHJ1ZVxyXG4gIC8vIHZhbHVlXHJcbiAgaWYgKHNjaGVtYS5hbGxPZikge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5hbGxPZi5zb21lKHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG4iXX0=