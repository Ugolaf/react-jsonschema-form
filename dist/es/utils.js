var _excluded = ["options"],
    _excluded2 = ["if", "then", "else"],
    _excluded3 = ["$ref"],
    _excluded4 = ["allOf"],
    _excluded5 = ["dependencies"],
    _excluded6 = ["oneOf"];

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
  boolean: {
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

  if (!type && schema.const) {
    return guessType(schema.const);
  }

  if (!type && schema.enum) {
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
            props = _objectWithoutProperties(_ref, _excluded);

        return /*#__PURE__*/React.createElement(Widget, _extends({
          options: _objectSpread(_objectSpread({}, defaultOptions), options)
        }, props));
      };
    }

    return Widget.MergedWidget;
  }

  if (typeof widget === "function" || ReactIs.isForwardRef( /*#__PURE__*/React.createElement(widget)) || ReactIs.isMemo(widget)) {
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

  if (isObject(defaults) && isObject(schema.default)) {
    // For object defaults, only override parent defaults that are defined in
    // schema.default.
    defaults = mergeObjects(defaults, schema.default);
  } else if ("default" in schema) {
    // Use schema defaults for this node.
    defaults = schema.default;
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
    defaults = schema.default;
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
  var defaults = computeDefaults(schema, _schema.default, rootSchema, formData, includeUndefinedValues);

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
      return _objectSpread(_objectSpread(_objectSpread({}, options), value.options || {}), {}, {
        widget: value.component
      });
    }

    if (key === "ui:options" && isObject(value)) {
      return _objectSpread(_objectSpread({}, options), value);
    }

    return _objectSpread(_objectSpread({}, options), {}, _defineProperty({}, key.substring(3), value));
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
  return Array.isArray(schema.enum) && schema.enum.length === 1 || schema.hasOwnProperty("const");
}
export function toConstant(schema) {
  if (Array.isArray(schema.enum) && schema.enum.length === 1) {
    return schema.enum[0];
  } else if (schema.hasOwnProperty("const")) {
    return schema.const;
  } else {
    throw new Error("schema cannot be inferred as a constant");
  }
}
export function isSelect(_schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var schema = retrieveSchema(_schema, rootSchema);
  var altSchemas = schema.oneOf || schema.anyOf;

  if (Array.isArray(schema.enum)) {
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
  if (schema.enum) {
    return schema.enum.map(function (value, i) {
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
  schema = _objectSpread(_objectSpread({}, schema), {}, {
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
  var expression = schema.if,
      then = schema.then,
      otherwise = schema.else,
      resolvedSchemaLessConditional = _objectWithoutProperties(schema, _excluded2);

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
    return _objectSpread(_objectSpread({}, schema), {}, {
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
      localSchema = _objectWithoutProperties(schema, _excluded3); // Update referenced schema definition with local schema properties.


  return retrieveSchema(_objectSpread(_objectSpread({}, $refSchema), localSchema), rootSchema, formData);
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
      resolvedSchema = mergeAllOf(_objectSpread(_objectSpread({}, resolvedSchema), {}, {
        allOf: resolvedSchema.allOf
      }));
    } catch (e) {
      console.warn("could not merge subschemas in allOf:\n" + e);

      var _resolvedSchema = resolvedSchema,
          allOf = _resolvedSchema.allOf,
          resolvedSchemaWithoutAllOf = _objectWithoutProperties(_resolvedSchema, _excluded4);

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
      resolvedSchema = _objectWithoutProperties(schema, _excluded5);

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
  return _objectSpread(_objectSpread({}, schema), {}, {
    required: required
  });
}

function withDependentSchema(schema, rootSchema, formData, dependencyKey, dependencyValue) {
  var _retrieveSchema = retrieveSchema(dependencyValue, rootSchema, formData),
      oneOf = _retrieveSchema.oneOf,
      dependentSchema = _objectWithoutProperties(_retrieveSchema, _excluded6);

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

  var dependentSchema = _objectSpread(_objectSpread({}, subschema), {}, {
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

    var key;

    for (var k = ka.length - 1; k >= 0; k--) {
      key = ka[k];

      if (!deepEquals(a[key], b[key], ca, cb)) {
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

  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
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
  for (var i = 0; i < options.length; i++) {
    var option = options[i]; // If the schema describes an object then we need to add slightly more
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
        return i;
      }
    } else if (isValid(option, formData, rootSchema)) {
      return i;
    }
  }

  return 0;
} // Check to see if a schema specifies that a value must be true

export function schemaRequiresTrueValue(schema) {
  // Check if const is a truthy value
  if (schema.const) {
    return true;
  } // Check if an enum has a single value of true


  if (schema.enum && schema.enum.length === 1 && schema.enum[0] === true) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0SXMiLCJtZXJnZUFsbE9mIiwiZmlsbCIsInVuaW9uIiwianNvbnBvaW50ZXIiLCJmaWVsZHMiLCJ3aWRnZXRzIiwidmFsaWRhdGVGb3JtRGF0YSIsImlzVmFsaWQiLCJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJ3aWRnZXRNYXAiLCJib29sZWFuIiwiY2hlY2tib3giLCJyYWRpbyIsInNlbGVjdCIsImhpZGRlbiIsInN0cmluZyIsInRleHQiLCJwYXNzd29yZCIsImVtYWlsIiwiaG9zdG5hbWUiLCJpcHY0IiwiaXB2NiIsInVyaSIsInRleHRhcmVhIiwiZGF0ZSIsImRhdGV0aW1lIiwiY29sb3IiLCJmaWxlIiwibnVtYmVyIiwidXBkb3duIiwicmFuZ2UiLCJpbnRlZ2VyIiwiYXJyYXkiLCJjaGVja2JveGVzIiwiZmlsZXMiLCJjYW5FeHBhbmQiLCJzY2hlbWEiLCJ1aVNjaGVtYSIsImZvcm1EYXRhIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJnZXRVaU9wdGlvbnMiLCJleHBhbmRhYmxlIiwibWF4UHJvcGVydGllcyIsInVuZGVmaW5lZCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJnZXREZWZhdWx0UmVnaXN0cnkiLCJkZWZpbml0aW9ucyIsInJvb3RTY2hlbWEiLCJmb3JtQ29udGV4dCIsImdldFNjaGVtYVR5cGUiLCJ0eXBlIiwiY29uc3QiLCJndWVzc1R5cGUiLCJlbnVtIiwicHJvcGVydGllcyIsIkFycmF5IiwiaW5jbHVkZXMiLCJmaW5kIiwiZ2V0V2lkZ2V0Iiwid2lkZ2V0IiwicmVnaXN0ZXJlZFdpZGdldHMiLCJtZXJnZU9wdGlvbnMiLCJXaWRnZXQiLCJNZXJnZWRXaWRnZXQiLCJkZWZhdWx0T3B0aW9ucyIsImRlZmF1bHRQcm9wcyIsIm9wdGlvbnMiLCJwcm9wcyIsImlzRm9yd2FyZFJlZiIsImNyZWF0ZUVsZW1lbnQiLCJpc01lbW8iLCJFcnJvciIsImhhc093blByb3BlcnR5IiwicmVnaXN0ZXJlZFdpZGdldCIsImhhc1dpZGdldCIsImUiLCJtZXNzYWdlIiwic3RhcnRzV2l0aCIsImNvbXB1dGVEZWZhdWx0cyIsIl9zY2hlbWEiLCJwYXJlbnREZWZhdWx0cyIsInJhd0Zvcm1EYXRhIiwiaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyIsImlzT2JqZWN0IiwiZGVmYXVsdHMiLCJkZWZhdWx0IiwibWVyZ2VPYmplY3RzIiwicmVmU2NoZW1hIiwiZmluZFNjaGVtYURlZmluaXRpb24iLCIkcmVmIiwicmVzb2x2ZWRTY2hlbWEiLCJyZXNvbHZlRGVwZW5kZW5jaWVzIiwiaXNGaXhlZEl0ZW1zIiwiaXRlbXMiLCJtYXAiLCJpdGVtU2NoZW1hIiwiaWR4IiwiaXNBcnJheSIsIm9uZU9mIiwiZ2V0TWF0Y2hpbmdPcHRpb24iLCJhbnlPZiIsInJlZHVjZSIsImFjYyIsImtleSIsImNvbXB1dGVkRGVmYXVsdCIsIml0ZW0iLCJhZGRpdGlvbmFsSXRlbXMiLCJtaW5JdGVtcyIsImlzTXVsdGlTZWxlY3QiLCJkZWZhdWx0c0xlbmd0aCIsImRlZmF1bHRFbnRyaWVzIiwiZmlsbGVyU2NoZW1hIiwiZmlsbGVyRW50cmllcyIsImNvbmNhdCIsImdldERlZmF1bHRGb3JtU3RhdGUiLCJyZXRyaWV2ZVNjaGVtYSIsIm1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEiLCJ2YWx1ZSIsImFzc2lnbiIsImZpbHRlciIsImluZGV4T2YiLCJjb25zb2xlIiwid2FybiIsImNvbXBvbmVudCIsInN1YnN0cmluZyIsImdldERpc3BsYXlMYWJlbCIsInVpT3B0aW9ucyIsImxhYmVsIiwiZGlzcGxheUxhYmVsIiwic2NoZW1hVHlwZSIsImlzRmlsZXNBcnJheSIsImlzQ3VzdG9tV2lkZ2V0IiwidGhpbmciLCJGaWxlIiwib2JqMSIsIm9iajIiLCJjb25jYXRBcnJheXMiLCJsZWZ0IiwicmlnaHQiLCJhc051bWJlciIsInRlc3QiLCJuIiwiTnVtYmVyIiwidmFsaWQiLCJpc05hTiIsIm9yZGVyUHJvcGVydGllcyIsIm9yZGVyIiwiYXJyYXlUb0hhc2giLCJhcnIiLCJwcmV2IiwiY3VyciIsImVycm9yUHJvcExpc3QiLCJqb2luIiwicHJvcGVydHlIYXNoIiwib3JkZXJGaWx0ZXJlZCIsInByb3AiLCJvcmRlckhhc2giLCJyZXN0IiwicmVzdEluZGV4IiwibGFzdEluZGV4T2YiLCJjb21wbGV0ZSIsInNwbGljZSIsImlzQ29uc3RhbnQiLCJ0b0NvbnN0YW50IiwiaXNTZWxlY3QiLCJhbHRTY2hlbWFzIiwiZXZlcnkiLCJ1bmlxdWVJdGVtcyIsIml0ZW1zU2NoZW1hIiwiZm9ybWF0IiwiYWxsb3dBZGRpdGlvbmFsSXRlbXMiLCJvcHRpb25zTGlzdCIsImkiLCJlbnVtTmFtZXMiLCJTdHJpbmciLCJ0aXRsZSIsIm9yaWdSZWYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjdXJyZW50IiwiZ2V0Iiwic3R1YkV4aXN0aW5nQWRkaXRpb25hbFByb3BlcnRpZXMiLCJmb3JFYWNoIiwicmVzb2x2ZUNvbmRpdGlvbiIsImV4cHJlc3Npb24iLCJpZiIsInRoZW4iLCJvdGhlcndpc2UiLCJlbHNlIiwicmVzb2x2ZWRTY2hlbWFMZXNzQ29uZGl0aW9uYWwiLCJjb25kaXRpb25hbFNjaGVtYSIsIm1lcmdlU2NoZW1hcyIsInJlc29sdmVTY2hlbWEiLCJyZXNvbHZlUmVmZXJlbmNlIiwiYWxsT2YiLCJhbGxPZlN1YnNjaGVtYSIsIiRyZWZTY2hlbWEiLCJsb2NhbFNjaGVtYSIsInJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mIiwiaGFzQWRkaXRpb25hbFByb3BlcnRpZXMiLCJkZXBlbmRlbmNpZXMiLCJwcm9jZXNzRGVwZW5kZW5jaWVzIiwiZGVwZW5kZW5jeUtleSIsImRlcGVuZGVuY3lWYWx1ZSIsInJlbWFpbmluZ0RlcGVuZGVuY2llcyIsIndpdGhEZXBlbmRlbnRQcm9wZXJ0aWVzIiwid2l0aERlcGVuZGVudFNjaGVtYSIsImFkZGl0aW9uYWxseVJlcXVpcmVkIiwicmVxdWlyZWQiLCJmcm9tIiwiU2V0IiwiZGVwZW5kZW50U2NoZW1hIiwicmVzb2x2ZWRPbmVPZiIsInN1YnNjaGVtYSIsIndpdGhFeGFjdGx5T25lU3Vic2NoZW1hIiwidmFsaWRTdWJzY2hlbWFzIiwiY29uZGl0aW9uUHJvcGVydHlTY2hlbWEiLCJjb25kaXRpb25TY2hlbWEiLCJlcnJvcnMiLCJkZXBlbmRlbnRTdWJzY2hlbWEiLCJpc0FyZ3VtZW50cyIsIm9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImRlZXBFcXVhbHMiLCJhIiwiYiIsImNhIiwiY2IiLCJEYXRlIiwiZ2V0VGltZSIsIlJlZ0V4cCIsInNvdXJjZSIsImdsb2JhbCIsIm11bHRpbGluZSIsImxhc3RJbmRleCIsImlnbm9yZUNhc2UiLCJzbGljZSIsImNvbnN0cnVjdG9yIiwia2EiLCJrYiIsImNhbCIsInB1c2giLCJzb3J0IiwiaiIsImsiLCJwb3AiLCJzaG91bGRSZW5kZXIiLCJjb21wIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwic3RhdGUiLCJ0b0lkU2NoZW1hIiwiaWQiLCJpZFByZWZpeCIsImlkU2VwYXJhdG9yIiwiaWRTY2hlbWEiLCIkaWQiLCJuYW1lIiwiZmllbGQiLCJmaWVsZElkIiwidG9QYXRoU2NoZW1hIiwicGF0aFNjaGVtYSIsIiRuYW1lIiwicmVwbGFjZSIsIl9fcmpzZl9hZGRpdGlvbmFsUHJvcGVydGllcyIsImVsZW1lbnQiLCJwcm9wZXJ0eSIsInBhcnNlRGF0ZVN0cmluZyIsImRhdGVTdHJpbmciLCJpbmNsdWRlVGltZSIsInllYXIiLCJtb250aCIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJnZXRVVENGdWxsWWVhciIsImdldFVUQ01vbnRoIiwiZ2V0VVRDRGF0ZSIsImdldFVUQ0hvdXJzIiwiZ2V0VVRDTWludXRlcyIsImdldFVUQ1NlY29uZHMiLCJ0b0RhdGVTdHJpbmciLCJ0aW1lIiwidXRjVGltZSIsIlVUQyIsInRvSlNPTiIsInV0Y1RvTG9jYWwiLCJqc29uRGF0ZSIsInl5eXkiLCJwYWQiLCJnZXRGdWxsWWVhciIsIk1NIiwiZ2V0TW9udGgiLCJkZCIsImdldERhdGUiLCJoaCIsImdldEhvdXJzIiwibW0iLCJnZXRNaW51dGVzIiwic3MiLCJnZXRTZWNvbmRzIiwiU1NTIiwiZ2V0TWlsbGlzZWNvbmRzIiwibG9jYWxUb1VUQyIsIm51bSIsInNpemUiLCJzIiwiZGF0YVVSSXRvQmxvYiIsImRhdGFVUkkiLCJzcGxpdHRlZCIsInNwbGl0IiwicGFyYW1zIiwicGFyYW0iLCJiaW5hcnkiLCJhdG9iIiwiY2hhckNvZGVBdCIsImJsb2IiLCJ3aW5kb3ciLCJCbG9iIiwiVWludDhBcnJheSIsInJhbmdlU3BlYyIsInNwZWMiLCJtdWx0aXBsZU9mIiwic3RlcCIsIm1pbmltdW0iLCJtaW4iLCJtYXhpbXVtIiwibWF4Iiwib3B0aW9uIiwicmVxdWlyZXNBbnlPZiIsImF1Z21lbnRlZFNjaGVtYSIsInNoYWxsb3dDbG9uZSIsInNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlIiwic29tZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPLEtBQUtDLE9BQVosTUFBeUIsVUFBekI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLHlCQUF2QjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsa0NBQWpCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixjQUFsQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsYUFBeEI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLHFCQUFuQjtBQUNBLE9BQU9DLE9BQVAsTUFBb0Isc0JBQXBCO0FBQ0EsT0FBT0MsZ0JBQVAsSUFBMkJDLE9BQTNCLFFBQTBDLFlBQTFDO0FBRUEsT0FBTyxJQUFNQyx3QkFBd0IsR0FBRyx1QkFBakM7QUFFUCxJQUFNQyxTQUFTLEdBQUc7QUFDaEJDLEVBQUFBLE9BQU8sRUFBRTtBQUNQQyxJQUFBQSxRQUFRLEVBQUUsZ0JBREg7QUFFUEMsSUFBQUEsS0FBSyxFQUFFLGFBRkE7QUFHUEMs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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgUmVhY3RJcyBmcm9tIFwicmVhY3QtaXNcIjtcclxuaW1wb3J0IG1lcmdlQWxsT2YgZnJvbSBcImpzb24tc2NoZW1hLW1lcmdlLWFsbG9mXCI7XHJcbmltcG9ydCBmaWxsIGZyb20gXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvYXJyYXkvZmlsbFwiO1xyXG5pbXBvcnQgdW5pb24gZnJvbSBcImxvZGFzaC91bmlvblwiO1xyXG5pbXBvcnQganNvbnBvaW50ZXIgZnJvbSBcImpzb25wb2ludGVyXCI7XHJcbmltcG9ydCBmaWVsZHMgZnJvbSBcIi4vY29tcG9uZW50cy9maWVsZHNcIjtcclxuaW1wb3J0IHdpZGdldHMgZnJvbSBcIi4vY29tcG9uZW50cy93aWRnZXRzXCI7XHJcbmltcG9ydCB2YWxpZGF0ZUZvcm1EYXRhLCB7IGlzVmFsaWQgfSBmcm9tIFwiLi92YWxpZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyA9IFwiX19hZGRpdGlvbmFsX3Byb3BlcnR5XCI7XHJcblxyXG5jb25zdCB3aWRnZXRNYXAgPSB7XHJcbiAgYm9vbGVhbjoge1xyXG4gICAgY2hlY2tib3g6IFwiQ2hlY2tib3hXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxuICBzdHJpbmc6IHtcclxuICAgIHRleHQ6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiUGFzc3dvcmRXaWRnZXRcIixcclxuICAgIGVtYWlsOiBcIkVtYWlsV2lkZ2V0XCIsXHJcbiAgICBob3N0bmFtZTogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICBpcHY0OiBcIlRleHRXaWRnZXRcIixcclxuICAgIGlwdjY6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgdXJpOiBcIlVSTFdpZGdldFwiLFxyXG4gICAgXCJkYXRhLXVybFwiOiBcIkZpbGVXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICB0ZXh0YXJlYTogXCJUZXh0YXJlYVdpZGdldFwiLFxyXG4gICAgaGlkZGVuOiBcIkhpZGRlbldpZGdldFwiLFxyXG4gICAgZGF0ZTogXCJEYXRlV2lkZ2V0XCIsXHJcbiAgICBkYXRldGltZTogXCJEYXRlVGltZVdpZGdldFwiLFxyXG4gICAgXCJkYXRlLXRpbWVcIjogXCJEYXRlVGltZVdpZGdldFwiLFxyXG4gICAgXCJhbHQtZGF0ZVwiOiBcIkFsdERhdGVXaWRnZXRcIixcclxuICAgIFwiYWx0LWRhdGV0aW1lXCI6IFwiQWx0RGF0ZVRpbWVXaWRnZXRcIixcclxuICAgIGNvbG9yOiBcIkNvbG9yV2lkZ2V0XCIsXHJcbiAgICBmaWxlOiBcIkZpbGVXaWRnZXRcIixcclxuICB9LFxyXG4gIG51bWJlcjoge1xyXG4gICAgdGV4dDogXCJUZXh0V2lkZ2V0XCIsXHJcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXHJcbiAgICB1cGRvd246IFwiVXBEb3duV2lkZ2V0XCIsXHJcbiAgICByYW5nZTogXCJSYW5nZVdpZGdldFwiLFxyXG4gICAgcmFkaW86IFwiUmFkaW9XaWRnZXRcIixcclxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcclxuICB9LFxyXG4gIGludGVnZXI6IHtcclxuICAgIHRleHQ6IFwiVGV4dFdpZGdldFwiLFxyXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxyXG4gICAgdXBkb3duOiBcIlVwRG93bldpZGdldFwiLFxyXG4gICAgcmFuZ2U6IFwiUmFuZ2VXaWRnZXRcIixcclxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxuICBhcnJheToge1xyXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxyXG4gICAgY2hlY2tib3hlczogXCJDaGVja2JveGVzV2lkZ2V0XCIsXHJcbiAgICBmaWxlczogXCJGaWxlV2lkZ2V0XCIsXHJcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW5FeHBhbmQoc2NoZW1hLCB1aVNjaGVtYSwgZm9ybURhdGEpIHtcclxuICBpZiAoIXNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjb25zdCB7IGV4cGFuZGFibGUgfSA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgaWYgKGV4cGFuZGFibGUgPT09IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gZXhwYW5kYWJsZTtcclxuICB9XHJcbiAgLy8gaWYgdWk6b3B0aW9ucy5leHBhbmRhYmxlIHdhcyBub3QgZXhwbGljaXRseSBzZXQgdG8gZmFsc2UsIHdlIGNhbiBhZGRcclxuICAvLyBhbm90aGVyIHByb3BlcnR5IGlmIHdlIGhhdmUgbm90IGV4Y2VlZGVkIG1heFByb3BlcnRpZXMgeWV0XHJcbiAgaWYgKHNjaGVtYS5tYXhQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3JtRGF0YSkubGVuZ3RoIDwgc2NoZW1hLm1heFByb3BlcnRpZXM7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWVsZHMsXHJcbiAgICB3aWRnZXRzLFxyXG4gICAgZGVmaW5pdGlvbnM6IHt9LFxyXG4gICAgcm9vdFNjaGVtYToge30sXHJcbiAgICBmb3JtQ29udGV4dDoge30sXHJcbiAgfTtcclxufVxyXG5cclxuLyogR2V0cyB0aGUgdHlwZSBvZiBhIGdpdmVuIHNjaGVtYS4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjaGVtYVR5cGUoc2NoZW1hKSB7XHJcbiAgbGV0IHsgdHlwZSB9ID0gc2NoZW1hO1xyXG5cclxuICBpZiAoIXR5cGUgJiYgc2NoZW1hLmNvbnN0KSB7XHJcbiAgICByZXR1cm4gZ3Vlc3NUeXBlKHNjaGVtYS5jb25zdCk7XHJcbiAgfVxyXG5cclxuICBpZiAoIXR5cGUgJiYgc2NoZW1hLmVudW0pIHtcclxuICAgIHJldHVybiBcInN0cmluZ1wiO1xyXG4gIH1cclxuXHJcbiAgaWYgKCF0eXBlICYmIChzY2hlbWEucHJvcGVydGllcyB8fCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7XHJcbiAgICByZXR1cm4gXCJvYmplY3RcIjtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlIGluc3RhbmNlb2YgQXJyYXkgJiYgdHlwZS5sZW5ndGggPT09IDIgJiYgdHlwZS5pbmNsdWRlcyhcIm51bGxcIikpIHtcclxuICAgIHJldHVybiB0eXBlLmZpbmQodHlwZSA9PiB0eXBlICE9PSBcIm51bGxcIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMgPSB7fSkge1xyXG4gIGNvbnN0IHR5cGUgPSBnZXRTY2hlbWFUeXBlKHNjaGVtYSk7XHJcblxyXG4gIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhXaWRnZXQpIHtcclxuICAgIC8vIGNhY2hlIHJldHVybiB2YWx1ZSBhcyBwcm9wZXJ0eSBvZiB3aWRnZXQgZm9yIHByb3BlciByZWFjdCByZWNvbmNpbGlhdGlvblxyXG4gICAgaWYgKCFXaWRnZXQuTWVyZ2VkV2lkZ2V0KSB7XHJcbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID1cclxuICAgICAgICAoV2lkZ2V0LmRlZmF1bHRQcm9wcyAmJiBXaWRnZXQuZGVmYXVsdFByb3BzLm9wdGlvbnMpIHx8IHt9O1xyXG4gICAgICBXaWRnZXQuTWVyZ2VkV2lkZ2V0ID0gKHsgb3B0aW9ucyA9IHt9LCAuLi5wcm9wcyB9KSA9PiAoXHJcbiAgICAgICAgPFdpZGdldCBvcHRpb25zPXt7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH19IHsuLi5wcm9wc30gLz5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBXaWRnZXQuTWVyZ2VkV2lkZ2V0O1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgdHlwZW9mIHdpZGdldCA9PT0gXCJmdW5jdGlvblwiIHx8XHJcbiAgICBSZWFjdElzLmlzRm9yd2FyZFJlZihSZWFjdC5jcmVhdGVFbGVtZW50KHdpZGdldCkpIHx8XHJcbiAgICBSZWFjdElzLmlzTWVtbyh3aWRnZXQpXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbWVyZ2VPcHRpb25zKHdpZGdldCk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHdpZGdldCAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCB3aWRnZXQgZGVmaW5pdGlvbjogJHt0eXBlb2Ygd2lkZ2V0fWApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHJlZ2lzdGVyZWRXaWRnZXRzLmhhc093blByb3BlcnR5KHdpZGdldCkpIHtcclxuICAgIGNvbnN0IHJlZ2lzdGVyZWRXaWRnZXQgPSByZWdpc3RlcmVkV2lkZ2V0c1t3aWRnZXRdO1xyXG4gICAgcmV0dXJuIGdldFdpZGdldChzY2hlbWEsIHJlZ2lzdGVyZWRXaWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcclxuICB9XHJcblxyXG4gIGlmICghd2lkZ2V0TWFwLmhhc093blByb3BlcnR5KHR5cGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHdpZGdldCBmb3IgdHlwZSBcIiR7dHlwZX1cImApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHdpZGdldE1hcFt0eXBlXS5oYXNPd25Qcm9wZXJ0eSh3aWRnZXQpKSB7XHJcbiAgICBjb25zdCByZWdpc3RlcmVkV2lkZ2V0ID0gcmVnaXN0ZXJlZFdpZGdldHNbd2lkZ2V0TWFwW3R5cGVdW3dpZGdldF1dO1xyXG4gICAgcmV0dXJuIGdldFdpZGdldChzY2hlbWEsIHJlZ2lzdGVyZWRXaWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcihgTm8gd2lkZ2V0IFwiJHt3aWRnZXR9XCIgZm9yIHR5cGUgXCIke3R5cGV9XCJgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1dpZGdldChzY2hlbWEsIHdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMgPSB7fSkge1xyXG4gIHRyeSB7XHJcbiAgICBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGlmIChcclxuICAgICAgZS5tZXNzYWdlICYmXHJcbiAgICAgIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIk5vIHdpZGdldFwiKSB8fFxyXG4gICAgICAgIGUubWVzc2FnZS5zdGFydHNXaXRoKFwiVW5zdXBwb3J0ZWQgd2lkZ2V0XCIpKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlRGVmYXVsdHMoXHJcbiAgX3NjaGVtYSxcclxuICBwYXJlbnREZWZhdWx0cyxcclxuICByb290U2NoZW1hLFxyXG4gIHJhd0Zvcm1EYXRhID0ge30sXHJcbiAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyA9IGZhbHNlXHJcbikge1xyXG4gIGxldCBzY2hlbWEgPSBpc09iamVjdChfc2NoZW1hKSA/IF9zY2hlbWEgOiB7fTtcclxuICBjb25zdCBmb3JtRGF0YSA9IGlzT2JqZWN0KHJhd0Zvcm1EYXRhKSA/IHJhd0Zvcm1EYXRhIDoge307XHJcbiAgLy8gQ29tcHV0ZSB0aGUgZGVmYXVsdHMgcmVjdXJzaXZlbHk6IGdpdmUgaGlnaGVzdCBwcmlvcml0eSB0byBkZWVwZXN0IG5vZGVzLlxyXG4gIGxldCBkZWZhdWx0cyA9IHBhcmVudERlZmF1bHRzO1xyXG4gIGlmIChpc09iamVjdChkZWZhdWx0cykgJiYgaXNPYmplY3Qoc2NoZW1hLmRlZmF1bHQpKSB7XHJcbiAgICAvLyBGb3Igb2JqZWN0IGRlZmF1bHRzLCBvbmx5IG92ZXJyaWRlIHBhcmVudCBkZWZhdWx0cyB0aGF0IGFyZSBkZWZpbmVkIGluXHJcbiAgICAvLyBzY2hlbWEuZGVmYXVsdC5cclxuICAgIGRlZmF1bHRzID0gbWVyZ2VPYmplY3RzKGRlZmF1bHRzLCBzY2hlbWEuZGVmYXVsdCk7XHJcbiAgfSBlbHNlIGlmIChcImRlZmF1bHRcIiBpbiBzY2hlbWEpIHtcclxuICAgIC8vIFVzZSBzY2hlbWEgZGVmYXVsdHMgZm9yIHRoaXMgbm9kZS5cclxuICAgIGRlZmF1bHRzID0gc2NoZW1hLmRlZmF1bHQ7XHJcbiAgfSBlbHNlIGlmIChcIiRyZWZcIiBpbiBzY2hlbWEpIHtcclxuICAgIC8vIFVzZSByZWZlcmVuY2VkIHNjaGVtYSBkZWZhdWx0cyBmb3IgdGhpcyBub2RlLlxyXG4gICAgY29uc3QgcmVmU2NoZW1hID0gZmluZFNjaGVtYURlZmluaXRpb24oc2NoZW1hLiRyZWYsIHJvb3RTY2hlbWEpO1xyXG4gICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgcmVmU2NoZW1hLFxyXG4gICAgICBkZWZhdWx0cyxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGEsXHJcbiAgICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSkge1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgIGRlZmF1bHRzLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YSxcclxuICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKGlzRml4ZWRJdGVtcyhzY2hlbWEpKSB7XHJcbiAgICBkZWZhdWx0cyA9IHNjaGVtYS5pdGVtcy5tYXAoKGl0ZW1TY2hlbWEsIGlkeCkgPT5cclxuICAgICAgY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICAgIGl0ZW1TY2hlbWEsXHJcbiAgICAgICAgQXJyYXkuaXNBcnJheShwYXJlbnREZWZhdWx0cykgPyBwYXJlbnREZWZhdWx0c1tpZHhdIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZm9ybURhdGEsXHJcbiAgICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAoXCJvbmVPZlwiIGluIHNjaGVtYSkge1xyXG4gICAgc2NoZW1hID1cclxuICAgICAgc2NoZW1hLm9uZU9mW2dldE1hdGNoaW5nT3B0aW9uKHVuZGVmaW5lZCwgc2NoZW1hLm9uZU9mLCByb290U2NoZW1hKV07XHJcbiAgfSBlbHNlIGlmIChcImFueU9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBzY2hlbWEgPVxyXG4gICAgICBzY2hlbWEuYW55T2ZbZ2V0TWF0Y2hpbmdPcHRpb24odW5kZWZpbmVkLCBzY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXTtcclxuICB9XHJcblxyXG4gIC8vIE5vdCBkZWZhdWx0cyBkZWZpbmVkIGZvciB0aGlzIG5vZGUsIGZhbGxiYWNrIHRvIGdlbmVyaWMgdHlwZWQgb25lcy5cclxuICBpZiAodHlwZW9mIGRlZmF1bHRzID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBkZWZhdWx0cyA9IHNjaGVtYS5kZWZhdWx0O1xyXG4gIH1cclxuXHJcbiAgc3dpdGNoIChnZXRTY2hlbWFUeXBlKHNjaGVtYSkpIHtcclxuICAgIC8vIFdlIG5lZWQgdG8gcmVjdXIgZm9yIG9iamVjdCBzY2hlbWEgaW5uZXIgZGVmYXVsdCB2YWx1ZXMuXHJcbiAgICBjYXNlIFwib2JqZWN0XCI6XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcyB8fCB7fSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIGRlZmF1bHRzIGZvciB0aGlzIG5vZGUsIHdpdGggdGhlIHBhcmVudCBkZWZhdWx0cyB3ZSBtaWdodFxyXG4gICAgICAgIC8vIGhhdmUgZnJvbSBhIHByZXZpb3VzIHJ1bjogZGVmYXVsdHNba2V5XS5cclxuICAgICAgICBsZXQgY29tcHV0ZWREZWZhdWx0ID0gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNba2V5XSxcclxuICAgICAgICAgIChkZWZhdWx0cyB8fCB7fSlba2V5XSxcclxuICAgICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgICAoZm9ybURhdGEgfHwge30pW2tleV0sXHJcbiAgICAgICAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyB8fCBjb21wdXRlZERlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgYWNjW2tleV0gPSBjb21wdXRlZERlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgIH0sIHt9KTtcclxuXHJcbiAgICBjYXNlIFwiYXJyYXlcIjpcclxuICAgICAgLy8gSW5qZWN0IGRlZmF1bHRzIGludG8gZXhpc3RpbmcgYXJyYXkgZGVmYXVsdHNcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdHMpKSB7XHJcbiAgICAgICAgZGVmYXVsdHMgPSBkZWZhdWx0cy5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcclxuICAgICAgICAgICAgc2NoZW1hLml0ZW1zW2lkeF0gfHwgc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyB8fCB7fSxcclxuICAgICAgICAgICAgaXRlbSxcclxuICAgICAgICAgICAgcm9vdFNjaGVtYVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRGVlcGx5IGluamVjdCBkZWZhdWx0cyBpbnRvIGFscmVhZHkgZXhpc3RpbmcgZm9ybSBkYXRhXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhd0Zvcm1EYXRhKSkge1xyXG4gICAgICAgIGRlZmF1bHRzID0gcmF3Rm9ybURhdGEubWFwKChpdGVtLCBpZHgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXHJcbiAgICAgICAgICAgIHNjaGVtYS5pdGVtcyxcclxuICAgICAgICAgICAgKGRlZmF1bHRzIHx8IHt9KVtpZHhdLFxyXG4gICAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgICBpdGVtXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzY2hlbWEubWluSXRlbXMpIHtcclxuICAgICAgICBpZiAoIWlzTXVsdGlTZWxlY3Qoc2NoZW1hLCByb290U2NoZW1hKSkge1xyXG4gICAgICAgICAgY29uc3QgZGVmYXVsdHNMZW5ndGggPSBkZWZhdWx0cyA/IGRlZmF1bHRzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgICBpZiAoc2NoZW1hLm1pbkl0ZW1zID4gZGVmYXVsdHNMZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVudHJpZXMgPSBkZWZhdWx0cyB8fCBbXTtcclxuICAgICAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGFycmF5IHdpdGggdGhlIGRlZmF1bHRzXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGxlclNjaGVtYSA9IEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKVxyXG4gICAgICAgICAgICAgID8gc2NoZW1hLmFkZGl0aW9uYWxJdGVtc1xyXG4gICAgICAgICAgICAgIDogc2NoZW1hLml0ZW1zO1xyXG4gICAgICAgICAgICBjb25zdCBmaWxsZXJFbnRyaWVzID0gZmlsbChcclxuICAgICAgICAgICAgICBuZXcgQXJyYXkoc2NoZW1hLm1pbkl0ZW1zIC0gZGVmYXVsdHNMZW5ndGgpLFxyXG4gICAgICAgICAgICAgIGNvbXB1dGVEZWZhdWx0cyhmaWxsZXJTY2hlbWEsIGZpbGxlclNjaGVtYS5kZWZhdWx0cywgcm9vdFNjaGVtYSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy8gdGhlbiBmaWxsIHVwIHRoZSByZXN0IHdpdGggZWl0aGVyIHRoZSBpdGVtIGRlZmF1bHQgb3IgZW1wdHksIHVwIHRvIG1pbkl0ZW1zXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdEVudHJpZXMuY29uY2F0KGZpbGxlckVudHJpZXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gZGVmYXVsdHMgPyBkZWZhdWx0cyA6IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuICByZXR1cm4gZGVmYXVsdHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0Rm9ybVN0YXRlKFxyXG4gIF9zY2hlbWEsXHJcbiAgZm9ybURhdGEsXHJcbiAgcm9vdFNjaGVtYSA9IHt9LFxyXG4gIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXMgPSBmYWxzZVxyXG4pIHtcclxuICBpZiAoIWlzT2JqZWN0KF9zY2hlbWEpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNjaGVtYTogXCIgKyBfc2NoZW1hKTtcclxuICB9XHJcbiAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIGNvbnN0IGRlZmF1bHRzID0gY29tcHV0ZURlZmF1bHRzKFxyXG4gICAgc2NoZW1hLFxyXG4gICAgX3NjaGVtYS5kZWZhdWx0LFxyXG4gICAgcm9vdFNjaGVtYSxcclxuICAgIGZvcm1EYXRhLFxyXG4gICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xyXG4gICk7XHJcbiAgaWYgKHR5cGVvZiBmb3JtRGF0YSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgLy8gTm8gZm9ybSBkYXRhPyBVc2Ugc2NoZW1hIGRlZmF1bHRzLlxyXG4gICAgcmV0dXJuIGRlZmF1bHRzO1xyXG4gIH1cclxuICBpZiAoaXNPYmplY3QoZm9ybURhdGEpIHx8IEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICByZXR1cm4gbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YShkZWZhdWx0cywgZm9ybURhdGEpO1xyXG4gIH1cclxuICBpZiAoZm9ybURhdGEgPT09IDAgfHwgZm9ybURhdGEgPT09IGZhbHNlIHx8IGZvcm1EYXRhID09PSBcIlwiKSB7XHJcbiAgICByZXR1cm4gZm9ybURhdGE7XHJcbiAgfVxyXG4gIHJldHVybiBmb3JtRGF0YSB8fCBkZWZhdWx0cztcclxufVxyXG5cclxuLyoqXHJcbiAqIFdoZW4gbWVyZ2luZyBkZWZhdWx0cyBhbmQgZm9ybSBkYXRhLCB3ZSB3YW50IHRvIG1lcmdlIGluIHRoaXMgc3BlY2lmaWMgd2F5OlxyXG4gKiAtIG9iamVjdHMgYXJlIGRlZXBseSBtZXJnZWRcclxuICogLSBhcnJheXMgYXJlIG1lcmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQ6XHJcbiAqICAgLSB3aGVuIHRoZSBhcnJheSBpcyBzZXQgaW4gZm9ybSBkYXRhLCBvbmx5IGFycmF5IGVudHJpZXMgc2V0IGluIGZvcm0gZGF0YVxyXG4gKiAgICAgYXJlIGRlZXBseSBtZXJnZWQ7IGFkZGl0aW9uYWwgZW50cmllcyBmcm9tIHRoZSBkZWZhdWx0cyBhcmUgaWdub3JlZFxyXG4gKiAgIC0gd2hlbiB0aGUgYXJyYXkgaXMgbm90IHNldCBpbiBmb3JtIGRhdGEsIHRoZSBkZWZhdWx0IGlzIGNvcGllZCBvdmVyXHJcbiAqIC0gc2NhbGFycyBhcmUgb3ZlcndyaXR0ZW4vc2V0IGJ5IGZvcm0gZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHMsIGZvcm1EYXRhKSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGVmYXVsdHMpKSB7XHJcbiAgICAgIGRlZmF1bHRzID0gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybURhdGEubWFwKCh2YWx1ZSwgaWR4KSA9PiB7XHJcbiAgICAgIGlmIChkZWZhdWx0c1tpZHhdKSB7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHNbaWR4XSwgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoZm9ybURhdGEpKSB7XHJcbiAgICBjb25zdCBhY2MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cyk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3JtRGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICBhY2Nba2V5XSA9IG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoXHJcbiAgICAgICAgZGVmYXVsdHMgPyBkZWZhdWx0c1trZXldIDoge30sXHJcbiAgICAgICAgZm9ybURhdGFba2V5XVxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgYWNjKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZvcm1EYXRhO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVpT3B0aW9ucyh1aVNjaGVtYSkge1xyXG4gIC8vIGdldCBhbGwgcGFzc2VkIG9wdGlvbnMgZnJvbSB1aTp3aWRnZXQsIHVpOm9wdGlvbnMsIGFuZCB1aTo8b3B0aW9uTmFtZT5cclxuICByZXR1cm4gT2JqZWN0LmtleXModWlTY2hlbWEpXHJcbiAgICAuZmlsdGVyKGtleSA9PiBrZXkuaW5kZXhPZihcInVpOlwiKSA9PT0gMClcclxuICAgIC5yZWR1Y2UoKG9wdGlvbnMsIGtleSkgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHVpU2NoZW1hW2tleV07XHJcbiAgICAgIGlmIChrZXkgPT09IFwidWk6d2lkZ2V0XCIgJiYgaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgXCJTZXR0aW5nIG9wdGlvbnMgdmlhIHVpOndpZGdldCBvYmplY3QgaXMgZGVwcmVjYXRlZCwgdXNlIHVpOm9wdGlvbnMgaW5zdGVhZFwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICAgIC4uLih2YWx1ZS5vcHRpb25zIHx8IHt9KSxcclxuICAgICAgICAgIHdpZGdldDogdmFsdWUuY29tcG9uZW50LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGtleSA9PT0gXCJ1aTpvcHRpb25zXCIgJiYgaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4ub3B0aW9ucywgLi4udmFsdWUgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyAuLi5vcHRpb25zLCBba2V5LnN1YnN0cmluZygzKV06IHZhbHVlIH07XHJcbiAgICB9LCB7fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5TGFiZWwoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSkge1xyXG4gIGNvbnN0IHVpT3B0aW9ucyA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XHJcbiAgbGV0IHsgbGFiZWw6IGRpc3BsYXlMYWJlbCA9IHRydWUgfSA9IHVpT3B0aW9ucztcclxuICBjb25zdCBzY2hlbWFUeXBlID0gZ2V0U2NoZW1hVHlwZShzY2hlbWEpO1xyXG5cclxuICBpZiAoc2NoZW1hVHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPVxyXG4gICAgICBpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSkgfHxcclxuICAgICAgaXNGaWxlc0FycmF5KHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEpIHx8XHJcbiAgICAgIGlzQ3VzdG9tV2lkZ2V0KHVpU2NoZW1hKTtcclxuICB9XHJcblxyXG4gIGlmIChzY2hlbWFUeXBlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPSBmYWxzZTtcclxuICB9XHJcbiAgaWYgKHNjaGVtYVR5cGUgPT09IFwiYm9vbGVhblwiICYmICF1aVNjaGVtYVtcInVpOndpZGdldFwiXSkge1xyXG4gICAgZGlzcGxheUxhYmVsID0gZmFsc2U7XHJcbiAgfVxyXG4gIGlmICh1aVNjaGVtYVtcInVpOmZpZWxkXCJdKSB7XHJcbiAgICBkaXNwbGF5TGFiZWwgPSBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIGRpc3BsYXlMYWJlbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHRoaW5nKSB7XHJcbiAgaWYgKHR5cGVvZiBGaWxlICE9PSBcInVuZGVmaW5lZFwiICYmIHRoaW5nIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSBcIm9iamVjdFwiICYmIHRoaW5nICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHRoaW5nKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT2JqZWN0cyhvYmoxLCBvYmoyLCBjb25jYXRBcnJheXMgPSBmYWxzZSkge1xyXG4gIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIGRlZXBseSBuZXN0ZWQgb2JqZWN0cy5cclxuICB2YXIgYWNjID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqMSk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cclxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqMikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgY29uc3QgbGVmdCA9IG9iajEgPyBvYmoxW2tleV0gOiB7fSxcclxuICAgICAgcmlnaHQgPSBvYmoyW2tleV07XHJcbiAgICBpZiAob2JqMSAmJiBvYmoxLmhhc093blByb3BlcnR5KGtleSkgJiYgaXNPYmplY3QocmlnaHQpKSB7XHJcbiAgICAgIGFjY1trZXldID0gbWVyZ2VPYmplY3RzKGxlZnQsIHJpZ2h0LCBjb25jYXRBcnJheXMpO1xyXG4gICAgfSBlbHNlIGlmIChjb25jYXRBcnJheXMgJiYgQXJyYXkuaXNBcnJheShsZWZ0KSAmJiBBcnJheS5pc0FycmF5KHJpZ2h0KSkge1xyXG4gICAgICBhY2Nba2V5XSA9IGxlZnQuY29uY2F0KHJpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFjY1trZXldID0gcmlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIGFjYyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhc051bWJlcih2YWx1ZSkge1xyXG4gIGlmICh2YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgaWYgKC9cXC4kLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgLy8gXCIzLlwiIGNhbid0IHJlYWxseSBiZSBjb25zaWRlcmVkIGEgbnVtYmVyIGV2ZW4gaWYgaXQgcGFyc2VzIGluIGpzLiBUaGVcclxuICAgIC8vIHVzZXIgaXMgbW9zdCBsaWtlbHkgZW50ZXJpbmcgYSBmbG9hdC5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgaWYgKC9cXC4wJC8udGVzdCh2YWx1ZSkpIHtcclxuICAgIC8vIHdlIG5lZWQgdG8gcmV0dXJuIHRoaXMgYXMgYSBzdHJpbmcgaGVyZSwgdG8gYWxsb3cgZm9yIGlucHV0IGxpa2UgMy4wN1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICBjb25zdCBuID0gTnVtYmVyKHZhbHVlKTtcclxuICBjb25zdCB2YWxpZCA9IHR5cGVvZiBuID09PSBcIm51bWJlclwiICYmICFOdW1iZXIuaXNOYU4obik7XHJcblxyXG4gIGlmICgvXFwuXFxkKjAkLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgLy8gSXQncyBhIG51bWJlciwgdGhhdCdzIGNvb2wgLSBidXQgd2UgbmVlZCBpdCBhcyBhIHN0cmluZyBzbyBpdCBkb2Vzbid0IHNjcmV3XHJcbiAgICAvLyB3aXRoIHRoZSB1c2VyIHdoZW4gZW50ZXJpbmcgZG9sbGFyIGFtb3VudHMgb3Igb3RoZXIgdmFsdWVzIChzdWNoIGFzIHRob3NlIHdpdGhcclxuICAgIC8vIHNwZWNpZmljIHByZWNpc2lvbiBvciBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzKVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbGlkID8gbiA6IHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIG9yZGVyKSB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KG9yZGVyKSkge1xyXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhcnJheVRvSGFzaCA9IGFyciA9PlxyXG4gICAgYXJyLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xyXG4gICAgICBwcmV2W2N1cnJdID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICB9LCB7fSk7XHJcbiAgY29uc3QgZXJyb3JQcm9wTGlzdCA9IGFyciA9PlxyXG4gICAgYXJyLmxlbmd0aCA+IDFcclxuICAgICAgPyBgcHJvcGVydGllcyAnJHthcnIuam9pbihcIicsICdcIil9J2BcclxuICAgICAgOiBgcHJvcGVydHkgJyR7YXJyWzBdfSdgO1xyXG4gIGNvbnN0IHByb3BlcnR5SGFzaCA9IGFycmF5VG9IYXNoKHByb3BlcnRpZXMpO1xyXG4gIGNvbnN0IG9yZGVyRmlsdGVyZWQgPSBvcmRlci5maWx0ZXIoXHJcbiAgICBwcm9wID0+IHByb3AgPT09IFwiKlwiIHx8IHByb3BlcnR5SGFzaFtwcm9wXVxyXG4gICk7XHJcbiAgY29uc3Qgb3JkZXJIYXNoID0gYXJyYXlUb0hhc2gob3JkZXJGaWx0ZXJlZCk7XHJcblxyXG4gIGNvbnN0IHJlc3QgPSBwcm9wZXJ0aWVzLmZpbHRlcihwcm9wID0+ICFvcmRlckhhc2hbcHJvcF0pO1xyXG4gIGNvbnN0IHJlc3RJbmRleCA9IG9yZGVyRmlsdGVyZWQuaW5kZXhPZihcIipcIik7XHJcbiAgaWYgKHJlc3RJbmRleCA9PT0gLTEpIHtcclxuICAgIGlmIChyZXN0Lmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYHVpU2NoZW1hIG9yZGVyIGxpc3QgZG9lcyBub3QgY29udGFpbiAke2Vycm9yUHJvcExpc3QocmVzdCl9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9yZGVyRmlsdGVyZWQ7XHJcbiAgfVxyXG4gIGlmIChyZXN0SW5kZXggIT09IG9yZGVyRmlsdGVyZWQubGFzdEluZGV4T2YoXCIqXCIpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1aVNjaGVtYSBvcmRlciBsaXN0IGNvbnRhaW5zIG1vcmUgdGhhbiBvbmUgd2lsZGNhcmQgaXRlbVwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBsZXRlID0gWy4uLm9yZGVyRmlsdGVyZWRdO1xyXG4gIGNvbXBsZXRlLnNwbGljZShyZXN0SW5kZXgsIDEsIC4uLnJlc3QpO1xyXG4gIHJldHVybiBjb21wbGV0ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSBnaXZlbiBzY2hlbWEgbWF0Y2hlcyBhIHNpbmdsZVxyXG4gKiBjb25zdGFudCB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnN0YW50KHNjaGVtYSkge1xyXG4gIHJldHVybiAoXHJcbiAgICAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkgJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSB8fFxyXG4gICAgc2NoZW1hLmhhc093blByb3BlcnR5KFwiY29uc3RcIilcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9Db25zdGFudChzY2hlbWEpIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkgJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmVudW1bMF07XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJjb25zdFwiKSkge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5jb25zdDtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwic2NoZW1hIGNhbm5vdCBiZSBpbmZlcnJlZCBhcyBhIGNvbnN0YW50XCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VsZWN0KF9zY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSkge1xyXG4gIGNvbnN0IHNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKF9zY2hlbWEsIHJvb3RTY2hlbWEpO1xyXG4gIGNvbnN0IGFsdFNjaGVtYXMgPSBzY2hlbWEub25lT2YgfHwgc2NoZW1hLmFueU9mO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFsdFNjaGVtYXMpKSB7XHJcbiAgICByZXR1cm4gYWx0U2NoZW1hcy5ldmVyeShhbHRTY2hlbWFzID0+IGlzQ29uc3RhbnQoYWx0U2NoZW1hcykpO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSA9IHt9KSB7XHJcbiAgaWYgKCFzY2hlbWEudW5pcXVlSXRlbXMgfHwgIXNjaGVtYS5pdGVtcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gaXNTZWxlY3Qoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRmlsZXNBcnJheShzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hID0ge30pIHtcclxuICBpZiAodWlTY2hlbWFbXCJ1aTp3aWRnZXRcIl0gPT09IFwiZmlsZXNcIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaXRlbXMpIHtcclxuICAgIGNvbnN0IGl0ZW1zU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcclxuICAgIHJldHVybiBpdGVtc1NjaGVtYS50eXBlID09PSBcInN0cmluZ1wiICYmIGl0ZW1zU2NoZW1hLmZvcm1hdCA9PT0gXCJkYXRhLXVybFwiO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ZpeGVkSXRlbXMoc2NoZW1hKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSAmJlxyXG4gICAgc2NoZW1hLml0ZW1zLmxlbmd0aCA+IDAgJiZcclxuICAgIHNjaGVtYS5pdGVtcy5ldmVyeShpdGVtID0+IGlzT2JqZWN0KGl0ZW0pKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0N1c3RvbVdpZGdldCh1aVNjaGVtYSkge1xyXG4gIHJldHVybiAoXHJcbiAgICAvLyBUT0RPOiBSZW1vdmUgdGhlIGAmJiB1aVNjaGVtYVtcInVpOndpZGdldFwiXSAhPT0gXCJoaWRkZW5cImAgb25jZSB3ZSBzdXBwb3J0IGhpZGRlbiB3aWRnZXRzIGZvciBhcnJheXMuXHJcbiAgICAvLyBodHRwczovL3JlYWN0LWpzb25zY2hlbWEtZm9ybS5yZWFkdGhlZG9jcy5pby9lbi9sYXRlc3QvdXNhZ2Uvd2lkZ2V0cy8jaGlkZGVuLXdpZGdldHNcclxuICAgIFwid2lkZ2V0XCIgaW4gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKSAmJlxyXG4gICAgZ2V0VWlPcHRpb25zKHVpU2NoZW1hKVtcIndpZGdldFwiXSAhPT0gXCJoaWRkZW5cIlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGxvd0FkZGl0aW9uYWxJdGVtcyhzY2hlbWEpIHtcclxuICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyA9PT0gdHJ1ZSkge1xyXG4gICAgY29uc29sZS53YXJuKFwiYWRkaXRpb25hbEl0ZW1zPXRydWUgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgfVxyXG4gIHJldHVybiBpc09iamVjdChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbnNMaXN0KHNjaGVtYSkge1xyXG4gIGlmIChzY2hlbWEuZW51bSkge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5lbnVtLm1hcCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgY29uc3QgbGFiZWwgPSAoc2NoZW1hLmVudW1OYW1lcyAmJiBzY2hlbWEuZW51bU5hbWVzW2ldKSB8fCBTdHJpbmcodmFsdWUpO1xyXG4gICAgICByZXR1cm4geyBsYWJlbCwgdmFsdWUgfTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBhbHRTY2hlbWFzID0gc2NoZW1hLm9uZU9mIHx8IHNjaGVtYS5hbnlPZjtcclxuICAgIHJldHVybiBhbHRTY2hlbWFzLm1hcChzY2hlbWEgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHRvQ29uc3RhbnQoc2NoZW1hKTtcclxuICAgICAgY29uc3QgbGFiZWwgPSBzY2hlbWEudGl0bGUgfHwgU3RyaW5nKHZhbHVlKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzY2hlbWEsXHJcbiAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kU2NoZW1hRGVmaW5pdGlvbigkcmVmLCByb290U2NoZW1hID0ge30pIHtcclxuICBjb25zdCBvcmlnUmVmID0gJHJlZjtcclxuICBpZiAoJHJlZi5zdGFydHNXaXRoKFwiI1wiKSkge1xyXG4gICAgLy8gRGVjb2RlIFVSSSBmcmFnbWVudCByZXByZXNlbnRhdGlvbi5cclxuICAgICRyZWYgPSBkZWNvZGVVUklDb21wb25lbnQoJHJlZi5zdWJzdHJpbmcoMSkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgZGVmaW5pdGlvbiBmb3IgJHtvcmlnUmVmfS5gKTtcclxuICB9XHJcbiAgY29uc3QgY3VycmVudCA9IGpzb25wb2ludGVyLmdldChyb290U2NoZW1hLCAkcmVmKTtcclxuICBpZiAoY3VycmVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgZGVmaW5pdGlvbiBmb3IgJHtvcmlnUmVmfS5gKTtcclxuICB9XHJcbiAgaWYgKGN1cnJlbnQuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XHJcbiAgICByZXR1cm4gZmluZFNjaGVtYURlZmluaXRpb24oY3VycmVudC4kcmVmLCByb290U2NoZW1hKTtcclxuICB9XHJcbiAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcbi8vIEluIHRoZSBjYXNlIHdoZXJlIHdlIGhhdmUgdG8gaW1wbGljaXRseSBjcmVhdGUgYSBzY2hlbWEsIGl0IGlzIHVzZWZ1bCB0byBrbm93IHdoYXQgdHlwZSB0byB1c2VcclxuLy8gIGJhc2VkIG9uIHRoZSBkYXRhIHdlIGFyZSBkZWZpbmluZ1xyXG5leHBvcnQgY29uc3QgZ3Vlc3NUeXBlID0gZnVuY3Rpb24gZ3Vlc3NUeXBlKHZhbHVlKSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICByZXR1cm4gXCJhcnJheVwiO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICByZXR1cm4gXCJzdHJpbmdcIjtcclxuICB9IGVsc2UgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgIHJldHVybiBcIm51bGxcIjtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgIHJldHVybiBcImJvb2xlYW5cIjtcclxuICB9IGVsc2UgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgIHJldHVybiBcIm51bWJlclwiO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gXCJvYmplY3RcIjtcclxuICB9XHJcbiAgLy8gRGVmYXVsdCB0byBzdHJpbmcgaWYgd2UgY2FuJ3QgZmlndXJlIGl0IG91dFxyXG4gIHJldHVybiBcInN0cmluZ1wiO1xyXG59O1xyXG5cclxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGNyZWF0ZSBuZXcgXCJwcm9wZXJ0aWVzXCIgaXRlbXMgZm9yIGVhY2gga2V5IGluIG91ciBmb3JtRGF0YVxyXG5leHBvcnQgZnVuY3Rpb24gc3R1YkV4aXN0aW5nQWRkaXRpb25hbFByb3BlcnRpZXMoXHJcbiAgc2NoZW1hLFxyXG4gIHJvb3RTY2hlbWEgPSB7fSxcclxuICBmb3JtRGF0YSA9IHt9XHJcbikge1xyXG4gIC8vIENsb25lIHRoZSBzY2hlbWEgc28gd2UgZG9uJ3QgcnVpbiB0aGUgY29uc3VtZXIncyBvcmlnaW5hbFxyXG4gIHNjaGVtYSA9IHtcclxuICAgIC4uLnNjaGVtYSxcclxuICAgIHByb3BlcnRpZXM6IHsgLi4uc2NoZW1hLnByb3BlcnRpZXMgfSxcclxuICB9O1xyXG5cclxuICAvLyBtYWtlIHN1cmUgZm9ybURhdGEgaXMgYW4gb2JqZWN0XHJcbiAgZm9ybURhdGEgPSBpc09iamVjdChmb3JtRGF0YSkgPyBmb3JtRGF0YSA6IHt9O1xyXG5cclxuICBPYmplY3Qua2V5cyhmb3JtRGF0YSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgaWYgKHNjaGVtYS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgLy8gTm8gbmVlZCB0byBzdHViLCBvdXIgc2NoZW1hIGFscmVhZHkgaGFzIHRoZSBwcm9wZXJ0eVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzO1xyXG4gICAgaWYgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIikpIHtcclxuICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSByZXRyaWV2ZVNjaGVtYShcclxuICAgICAgICB7ICRyZWY6IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllc1tcIiRyZWZcIl0gfSxcclxuICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgIGZvcm1EYXRhXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShcInR5cGVcIikpIHtcclxuICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7IC4uLnNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7IHR5cGU6IGd1ZXNzVHlwZShmb3JtRGF0YVtrZXldKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZSB0eXBlIG9mIG91ciBuZXcga2V5IHNob3VsZCBtYXRjaCB0aGUgYWRkaXRpb25hbFByb3BlcnRpZXMgdmFsdWU7XHJcbiAgICBzY2hlbWEucHJvcGVydGllc1trZXldID0gYWRkaXRpb25hbFByb3BlcnRpZXM7XHJcbiAgICAvLyBTZXQgb3VyIGFkZGl0aW9uYWwgcHJvcGVydHkgZmxhZyBzbyB3ZSBrbm93IGl0IHdhcyBkeW5hbWljYWxseSBhZGRlZFxyXG4gICAgc2NoZW1hLnByb3BlcnRpZXNba2V5XVtBRERJVElPTkFMX1BST1BFUlRZX0ZMQUddID0gdHJ1ZTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHNjaGVtYTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlc29sdmVzIGEgY29uZGl0aW9uYWwgYmxvY2sgKGlmL2Vsc2UvdGhlbikgYnkgcmVtb3ZpbmcgdGhlIGNvbmRpdGlvbiBhbmQgbWVyZ2luZyB0aGUgYXBwcm9wcmlhdGUgY29uZGl0aW9uYWwgYnJhbmNoIHdpdGggdGhlIHJlc3Qgb2YgdGhlIHNjaGVtYVxyXG4gKi9cclxuY29uc3QgcmVzb2x2ZUNvbmRpdGlvbiA9IChzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKSA9PiB7XHJcbiAgbGV0IHtcclxuICAgIGlmOiBleHByZXNzaW9uLFxyXG4gICAgdGhlbixcclxuICAgIGVsc2U6IG90aGVyd2lzZSxcclxuICAgIC4uLnJlc29sdmVkU2NoZW1hTGVzc0NvbmRpdGlvbmFsXHJcbiAgfSA9IHNjaGVtYTtcclxuXHJcbiAgY29uc3QgY29uZGl0aW9uYWxTY2hlbWEgPSBpc1ZhbGlkKGV4cHJlc3Npb24sIGZvcm1EYXRhLCByb290U2NoZW1hKVxyXG4gICAgPyB0aGVuXHJcbiAgICA6IG90aGVyd2lzZTtcclxuXHJcbiAgaWYgKGNvbmRpdGlvbmFsU2NoZW1hKSB7XHJcbiAgICByZXR1cm4gcmV0cmlldmVTY2hlbWEoXHJcbiAgICAgIG1lcmdlU2NoZW1hcyhcclxuICAgICAgICByZXNvbHZlZFNjaGVtYUxlc3NDb25kaXRpb25hbCxcclxuICAgICAgICByZXRyaWV2ZVNjaGVtYShjb25kaXRpb25hbFNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICksXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhXHJcbiAgICApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gcmV0cmlldmVTY2hlbWEocmVzb2x2ZWRTY2hlbWFMZXNzQ29uZGl0aW9uYWwsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzb2x2ZXMgcmVmZXJlbmNlcyBhbmQgZGVwZW5kZW5jaWVzIHdpdGhpbiBhIHNjaGVtYSBhbmQgaXRzICdhbGxPZicgY2hpbGRyZW4uXHJcbiAqXHJcbiAqIENhbGxlZCBpbnRlcm5hbGx5IGJ5IHJldHJpZXZlU2NoZW1hLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hID0ge30sIGZvcm1EYXRhID0ge30pIHtcclxuICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiJHJlZlwiKSkge1xyXG4gICAgcmV0dXJuIHJlc29sdmVSZWZlcmVuY2Uoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJkZXBlbmRlbmNpZXNcIikpIHtcclxuICAgIGNvbnN0IHJlc29sdmVkU2NoZW1hID0gcmVzb2x2ZURlcGVuZGVuY2llcyhzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICAgIHJldHVybiByZXRyaWV2ZVNjaGVtYShyZXNvbHZlZFNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIH0gZWxzZSBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiYWxsT2ZcIikpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLnNjaGVtYSxcclxuICAgICAgYWxsT2Y6IHNjaGVtYS5hbGxPZi5tYXAoYWxsT2ZTdWJzY2hlbWEgPT5cclxuICAgICAgICByZXRyaWV2ZVNjaGVtYShhbGxPZlN1YnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgICksXHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBObyAkcmVmIG9yIGRlcGVuZGVuY2llcyBhdHRyaWJ1dGUgZm91bmQsIHJldHVybmluZyB0aGUgb3JpZ2luYWwgc2NoZW1hLlxyXG4gICAgcmV0dXJuIHNjaGVtYTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc29sdmVSZWZlcmVuY2Uoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSkge1xyXG4gIC8vIFJldHJpZXZlIHRoZSByZWZlcmVuY2VkIHNjaGVtYSBkZWZpbml0aW9uLlxyXG4gIGNvbnN0ICRyZWZTY2hlbWEgPSBmaW5kU2NoZW1hRGVmaW5pdGlvbihzY2hlbWEuJHJlZiwgcm9vdFNjaGVtYSk7XHJcbiAgLy8gRHJvcCB0aGUgJHJlZiBwcm9wZXJ0eSBvZiB0aGUgc291cmNlIHNjaGVtYS5cclxuICBjb25zdCB7ICRyZWYsIC4uLmxvY2FsU2NoZW1hIH0gPSBzY2hlbWE7XHJcbiAgLy8gVXBkYXRlIHJlZmVyZW5jZWQgc2NoZW1hIGRlZmluaXRpb24gd2l0aCBsb2NhbCBzY2hlbWEgcHJvcGVydGllcy5cclxuICByZXR1cm4gcmV0cmlldmVTY2hlbWEoXHJcbiAgICB7IC4uLiRyZWZTY2hlbWEsIC4uLmxvY2FsU2NoZW1hIH0sXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGFcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hID0ge30sIGZvcm1EYXRhID0ge30pIHtcclxuICBpZiAoIWlzT2JqZWN0KHNjaGVtYSkpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcbiAgbGV0IHJlc29sdmVkU2NoZW1hID0gcmVzb2x2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuXHJcbiAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImlmXCIpKSB7XHJcbiAgICByZXR1cm4gcmVzb2x2ZUNvbmRpdGlvbihzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9XHJcblxyXG4gIGlmIChcImFsbE9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNvbHZlZFNjaGVtYSA9IG1lcmdlQWxsT2Yoe1xyXG4gICAgICAgIC4uLnJlc29sdmVkU2NoZW1hLFxyXG4gICAgICAgIGFsbE9mOiByZXNvbHZlZFNjaGVtYS5hbGxPZixcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcImNvdWxkIG5vdCBtZXJnZSBzdWJzY2hlbWFzIGluIGFsbE9mOlxcblwiICsgZSk7XHJcbiAgICAgIGNvbnN0IHsgYWxsT2YsIC4uLnJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mIH0gPSByZXNvbHZlZFNjaGVtYTtcclxuICAgICAgcmV0dXJuIHJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mO1xyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCBoYXNBZGRpdGlvbmFsUHJvcGVydGllcyA9XHJcbiAgICByZXNvbHZlZFNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpICYmXHJcbiAgICByZXNvbHZlZFNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyAhPT0gZmFsc2U7XHJcbiAgaWYgKGhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XHJcbiAgICByZXR1cm4gc3R1YkV4aXN0aW5nQWRkaXRpb25hbFByb3BlcnRpZXMoXHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICBmb3JtRGF0YVxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc29sdmVkU2NoZW1hO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpIHtcclxuICAvLyBEcm9wIHRoZSBkZXBlbmRlbmNpZXMgZnJvbSB0aGUgc291cmNlIHNjaGVtYS5cclxuICBsZXQgeyBkZXBlbmRlbmNpZXMgPSB7fSwgLi4ucmVzb2x2ZWRTY2hlbWEgfSA9IHNjaGVtYTtcclxuICBpZiAoXCJvbmVPZlwiIGluIHJlc29sdmVkU2NoZW1hKSB7XHJcbiAgICByZXNvbHZlZFNjaGVtYSA9XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hLm9uZU9mW1xyXG4gICAgICAgIGdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCByZXNvbHZlZFNjaGVtYS5vbmVPZiwgcm9vdFNjaGVtYSlcclxuICAgICAgXTtcclxuICB9IGVsc2UgaWYgKFwiYW55T2ZcIiBpbiByZXNvbHZlZFNjaGVtYSkge1xyXG4gICAgcmVzb2x2ZWRTY2hlbWEgPVxyXG4gICAgICByZXNvbHZlZFNjaGVtYS5hbnlPZltcclxuICAgICAgICBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgcmVzb2x2ZWRTY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXHJcbiAgICAgIF07XHJcbiAgfVxyXG4gIHJldHVybiBwcm9jZXNzRGVwZW5kZW5jaWVzKFxyXG4gICAgZGVwZW5kZW5jaWVzLFxyXG4gICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGFcclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIHByb2Nlc3NEZXBlbmRlbmNpZXMoXHJcbiAgZGVwZW5kZW5jaWVzLFxyXG4gIHJlc29sdmVkU2NoZW1hLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGFcclxuKSB7XHJcbiAgLy8gUHJvY2VzcyBkZXBlbmRlbmNpZXMgdXBkYXRpbmcgdGhlIGxvY2FsIHNjaGVtYSBwcm9wZXJ0aWVzIGFzIGFwcHJvcHJpYXRlLlxyXG4gIGZvciAoY29uc3QgZGVwZW5kZW5jeUtleSBpbiBkZXBlbmRlbmNpZXMpIHtcclxuICAgIC8vIFNraXAgdGhpcyBkZXBlbmRlbmN5IGlmIGl0cyB0cmlnZ2VyIHByb3BlcnR5IGlzIG5vdCBwcmVzZW50LlxyXG4gICAgaWYgKGZvcm1EYXRhW2RlcGVuZGVuY3lLZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICAvLyBTa2lwIHRoaXMgZGVwZW5kZW5jeSBpZiBpdCBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIHNjaGVtYSAoc3VjaCBhcyB3aGVuIGRlcGVuZGVuY3lLZXkgaXMgaXRzZWxmIGEgaGlkZGVuIGRlcGVuZGVuY3kuKVxyXG4gICAgaWYgKFxyXG4gICAgICByZXNvbHZlZFNjaGVtYS5wcm9wZXJ0aWVzICYmXHJcbiAgICAgICEoZGVwZW5kZW5jeUtleSBpbiByZXNvbHZlZFNjaGVtYS5wcm9wZXJ0aWVzKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3Qge1xyXG4gICAgICBbZGVwZW5kZW5jeUtleV06IGRlcGVuZGVuY3lWYWx1ZSxcclxuICAgICAgLi4ucmVtYWluaW5nRGVwZW5kZW5jaWVzXHJcbiAgICB9ID0gZGVwZW5kZW5jaWVzO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwZW5kZW5jeVZhbHVlKSkge1xyXG4gICAgICByZXNvbHZlZFNjaGVtYSA9IHdpdGhEZXBlbmRlbnRQcm9wZXJ0aWVzKHJlc29sdmVkU2NoZW1hLCBkZXBlbmRlbmN5VmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmIChpc09iamVjdChkZXBlbmRlbmN5VmFsdWUpKSB7XHJcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gd2l0aERlcGVuZGVudFNjaGVtYShcclxuICAgICAgICByZXNvbHZlZFNjaGVtYSxcclxuICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgIGRlcGVuZGVuY3lLZXksXHJcbiAgICAgICAgZGVwZW5kZW5jeVZhbHVlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJvY2Vzc0RlcGVuZGVuY2llcyhcclxuICAgICAgcmVtYWluaW5nRGVwZW5kZW5jaWVzLFxyXG4gICAgICByZXNvbHZlZFNjaGVtYSxcclxuICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgZm9ybURhdGFcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiByZXNvbHZlZFNjaGVtYTtcclxufVxyXG5cclxuZnVuY3Rpb24gd2l0aERlcGVuZGVudFByb3BlcnRpZXMoc2NoZW1hLCBhZGRpdGlvbmFsbHlSZXF1aXJlZCkge1xyXG4gIGlmICghYWRkaXRpb25hbGx5UmVxdWlyZWQpIHtcclxuICAgIHJldHVybiBzY2hlbWE7XHJcbiAgfVxyXG4gIGNvbnN0IHJlcXVpcmVkID0gQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpXHJcbiAgICA/IEFycmF5LmZyb20obmV3IFNldChbLi4uc2NoZW1hLnJlcXVpcmVkLCAuLi5hZGRpdGlvbmFsbHlSZXF1aXJlZF0pKVxyXG4gICAgOiBhZGRpdGlvbmFsbHlSZXF1aXJlZDtcclxuICByZXR1cm4geyAuLi5zY2hlbWEsIHJlcXVpcmVkOiByZXF1aXJlZCB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aXRoRGVwZW5kZW50U2NoZW1hKFxyXG4gIHNjaGVtYSxcclxuICByb290U2NoZW1hLFxyXG4gIGZvcm1EYXRhLFxyXG4gIGRlcGVuZGVuY3lLZXksXHJcbiAgZGVwZW5kZW5jeVZhbHVlXHJcbikge1xyXG4gIGxldCB7IG9uZU9mLCAuLi5kZXBlbmRlbnRTY2hlbWEgfSA9IHJldHJpZXZlU2NoZW1hKFxyXG4gICAgZGVwZW5kZW5jeVZhbHVlLFxyXG4gICAgcm9vdFNjaGVtYSxcclxuICAgIGZvcm1EYXRhXHJcbiAgKTtcclxuICBzY2hlbWEgPSBtZXJnZVNjaGVtYXMoc2NoZW1hLCBkZXBlbmRlbnRTY2hlbWEpO1xyXG4gIC8vIFNpbmNlIGl0IGRvZXMgbm90IGNvbnRhaW4gb25lT2YsIHdlIHJldHVybiB0aGUgb3JpZ2luYWwgc2NoZW1hLlxyXG4gIGlmIChvbmVPZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hO1xyXG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkob25lT2YpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQ6IGl0IGlzIHNvbWUgJHt0eXBlb2Ygb25lT2Z9IGluc3RlYWQgb2YgYW4gYXJyYXlgKTtcclxuICB9XHJcbiAgLy8gUmVzb2x2ZSAkcmVmcyBpbnNpZGUgb25lT2YuXHJcbiAgY29uc3QgcmVzb2x2ZWRPbmVPZiA9IG9uZU9mLm1hcChzdWJzY2hlbWEgPT5cclxuICAgIHN1YnNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIilcclxuICAgICAgPyByZXNvbHZlUmVmZXJlbmNlKHN1YnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXHJcbiAgICAgIDogc3Vic2NoZW1hXHJcbiAgKTtcclxuICByZXR1cm4gd2l0aEV4YWN0bHlPbmVTdWJzY2hlbWEoXHJcbiAgICBzY2hlbWEsXHJcbiAgICByb290U2NoZW1hLFxyXG4gICAgZm9ybURhdGEsXHJcbiAgICBkZXBlbmRlbmN5S2V5LFxyXG4gICAgcmVzb2x2ZWRPbmVPZlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdpdGhFeGFjdGx5T25lU3Vic2NoZW1hKFxyXG4gIHNjaGVtYSxcclxuICByb290U2NoZW1hLFxyXG4gIGZvcm1EYXRhLFxyXG4gIGRlcGVuZGVuY3lLZXksXHJcbiAgb25lT2ZcclxuKSB7XHJcbiAgY29uc3QgdmFsaWRTdWJzY2hlbWFzID0gb25lT2YuZmlsdGVyKHN1YnNjaGVtYSA9PiB7XHJcbiAgICBpZiAoIXN1YnNjaGVtYS5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSB9ID0gc3Vic2NoZW1hLnByb3BlcnRpZXM7XHJcbiAgICBpZiAoY29uZGl0aW9uUHJvcGVydHlTY2hlbWEpIHtcclxuICAgICAgY29uc3QgY29uZGl0aW9uU2NoZW1hID0ge1xyXG4gICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCB7IGVycm9ycyB9ID0gdmFsaWRhdGVGb3JtRGF0YShmb3JtRGF0YSwgY29uZGl0aW9uU2NoZW1hKTtcclxuICAgICAgcmV0dXJuIGVycm9ycy5sZW5ndGggPT09IDA7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgaWYgKHZhbGlkU3Vic2NoZW1hcy5sZW5ndGggIT09IDEpIHtcclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgXCJpZ25vcmluZyBvbmVPZiBpbiBkZXBlbmRlbmNpZXMgYmVjYXVzZSB0aGVyZSBpc24ndCBleGFjdGx5IG9uZSBzdWJzY2hlbWEgdGhhdCBpcyB2YWxpZFwiXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHNjaGVtYTtcclxuICB9XHJcbiAgY29uc3Qgc3Vic2NoZW1hID0gdmFsaWRTdWJzY2hlbWFzWzBdO1xyXG4gIGNvbnN0IHtcclxuICAgIFtkZXBlbmRlbmN5S2V5XTogY29uZGl0aW9uUHJvcGVydHlTY2hlbWEsXHJcbiAgICAuLi5kZXBlbmRlbnRTdWJzY2hlbWFcclxuICB9ID0gc3Vic2NoZW1hLnByb3BlcnRpZXM7XHJcbiAgY29uc3QgZGVwZW5kZW50U2NoZW1hID0geyAuLi5zdWJzY2hlbWEsIHByb3BlcnRpZXM6IGRlcGVuZGVudFN1YnNjaGVtYSB9O1xyXG4gIHJldHVybiBtZXJnZVNjaGVtYXMoXHJcbiAgICBzY2hlbWEsXHJcbiAgICByZXRyaWV2ZVNjaGVtYShkZXBlbmRlbnRTY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFJlY3Vyc2l2ZWx5IG1lcmdlIGRlZXBseSBuZXN0ZWQgc2NoZW1hcy5cclxuLy8gVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBtZXJnZVNjaGVtYXMgYW5kIG1lcmdlT2JqZWN0c1xyXG4vLyBpcyB0aGF0IG1lcmdlU2NoZW1hcyBvbmx5IGNvbmNhdHMgYXJyYXlzIGZvclxyXG4vLyB2YWx1ZXMgdW5kZXIgdGhlIFwicmVxdWlyZWRcIiBrZXl3b3JkLCBhbmQgd2hlbiBpdCBkb2VzLFxyXG4vLyBpdCBkb2Vzbid0IGluY2x1ZGUgZHVwbGljYXRlIHZhbHVlcy5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU2NoZW1hcyhvYmoxLCBvYmoyKSB7XHJcbiAgdmFyIGFjYyA9IE9iamVjdC5hc3NpZ24oe30sIG9iajEpOyAvLyBQcmV2ZW50IG11dGF0aW9uIG9mIHNvdXJjZSBvYmplY3QuXHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iajIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgIGNvbnN0IGxlZnQgPSBvYmoxID8gb2JqMVtrZXldIDoge30sXHJcbiAgICAgIHJpZ2h0ID0gb2JqMltrZXldO1xyXG4gICAgaWYgKG9iajEgJiYgb2JqMS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGlzT2JqZWN0KHJpZ2h0KSkge1xyXG4gICAgICBhY2Nba2V5XSA9IG1lcmdlU2NoZW1hcyhsZWZ0LCByaWdodCk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBvYmoxICYmXHJcbiAgICAgIG9iajIgJiZcclxuICAgICAgKGdldFNjaGVtYVR5cGUob2JqMSkgPT09IFwib2JqZWN0XCIgfHwgZ2V0U2NoZW1hVHlwZShvYmoyKSA9PT0gXCJvYmplY3RcIikgJiZcclxuICAgICAga2V5ID09PSBcInJlcXVpcmVkXCIgJiZcclxuICAgICAgQXJyYXkuaXNBcnJheShsZWZ0KSAmJlxyXG4gICAgICBBcnJheS5pc0FycmF5KHJpZ2h0KVxyXG4gICAgKSB7XHJcbiAgICAgIC8vIERvbid0IGluY2x1ZGUgZHVwbGljYXRlIHZhbHVlcyB3aGVuIG1lcmdpbmdcclxuICAgICAgLy8gXCJyZXF1aXJlZFwiIGZpZWxkcy5cclxuICAgICAgYWNjW2tleV0gPSB1bmlvbihsZWZ0LCByaWdodCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhY2Nba2V5XSA9IHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCBhY2MpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyhvYmplY3QpIHtcclxuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWVwRXF1YWxzKGEsIGIsIGNhID0gW10sIGNiID0gW10pIHtcclxuICAvLyBQYXJ0aWFsbHkgZXh0cmFjdGVkIGZyb20gbm9kZS1kZWVwZXIgYW5kIGFkYXB0ZWQgdG8gZXhjbHVkZSBjb21wYXJpc29uXHJcbiAgLy8gY2hlY2tzIGZvciBmdW5jdGlvbnMuXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL290aGl5bTIzL25vZGUtZGVlcGVyXHJcbiAgaWYgKGEgPT09IGIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGEgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgYiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAvLyBBc3N1bWUgYWxsIGZ1bmN0aW9ucyBhcmUgZXF1aXZhbGVudFxyXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9yanNmLXRlYW0vcmVhY3QtanNvbnNjaGVtYS1mb3JtL2lzc3Vlcy8yNTVcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGEgIT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGIgIT09IFwib2JqZWN0XCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9IGVsc2UgaWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoYSBpbnN0YW5jZW9mIERhdGUgJiYgYiBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCk7XHJcbiAgfSBlbHNlIGlmIChhIGluc3RhbmNlb2YgUmVnRXhwICYmIGIgaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGEuc291cmNlID09PSBiLnNvdXJjZSAmJlxyXG4gICAgICBhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiZcclxuICAgICAgYS5tdWx0aWxpbmUgPT09IGIubXVsdGlsaW5lICYmXHJcbiAgICAgIGEubGFzdEluZGV4ID09PSBiLmxhc3RJbmRleCAmJlxyXG4gICAgICBhLmlnbm9yZUNhc2UgPT09IGIuaWdub3JlQ2FzZVxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKGlzQXJndW1lbnRzKGEpIHx8IGlzQXJndW1lbnRzKGIpKSB7XHJcbiAgICBpZiAoIShpc0FyZ3VtZW50cyhhKSAmJiBpc0FyZ3VtZW50cyhiKSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbGV0IHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xyXG4gICAgcmV0dXJuIGRlZXBFcXVhbHMoc2xpY2UuY2FsbChhKSwgc2xpY2UuY2FsbChiKSwgY2EsIGNiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGEuY29uc3RydWN0b3IgIT09IGIuY29uc3RydWN0b3IpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBrYSA9IE9iamVjdC5rZXlzKGEpO1xyXG4gICAgbGV0IGtiID0gT2JqZWN0LmtleXMoYik7XHJcbiAgICAvLyBkb24ndCBib3RoZXIgd2l0aCBzdGFjayBhY3JvYmF0aWNzIGlmIHRoZXJlJ3Mgbm90aGluZyB0aGVyZVxyXG4gICAgaWYgKGthLmxlbmd0aCA9PT0gMCAmJiBrYi5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoa2EubGVuZ3RoICE9PSBrYi5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjYWwgPSBjYS5sZW5ndGg7XHJcbiAgICB3aGlsZSAoY2FsLS0pIHtcclxuICAgICAgaWYgKGNhW2NhbF0gPT09IGEpIHtcclxuICAgICAgICByZXR1cm4gY2JbY2FsXSA9PT0gYjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2EucHVzaChhKTtcclxuICAgIGNiLnB1c2goYik7XHJcblxyXG4gICAga2Euc29ydCgpO1xyXG4gICAga2Iuc29ydCgpO1xyXG4gICAgZm9yICh2YXIgaiA9IGthLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgIGlmIChrYVtqXSAhPT0ga2Jbal0pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQga2V5O1xyXG4gICAgZm9yIChsZXQgayA9IGthLmxlbmd0aCAtIDE7IGsgPj0gMDsgay0tKSB7XHJcbiAgICAgIGtleSA9IGthW2tdO1xyXG4gICAgICBpZiAoIWRlZXBFcXVhbHMoYVtrZXldLCBiW2tleV0sIGNhLCBjYikpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYS5wb3AoKTtcclxuICAgIGNiLnBvcCgpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFJlbmRlcihjb21wLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gIGNvbnN0IHsgcHJvcHMsIHN0YXRlIH0gPSBjb21wO1xyXG4gIHJldHVybiAhZGVlcEVxdWFscyhwcm9wcywgbmV4dFByb3BzKSB8fCAhZGVlcEVxdWFscyhzdGF0ZSwgbmV4dFN0YXRlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvSWRTY2hlbWEoXHJcbiAgc2NoZW1hLFxyXG4gIGlkLFxyXG4gIHJvb3RTY2hlbWEsXHJcbiAgZm9ybURhdGEgPSB7fSxcclxuICBpZFByZWZpeCA9IFwicm9vdFwiLFxyXG4gIGlkU2VwYXJhdG9yID0gXCJfXCJcclxuKSB7XHJcbiAgY29uc3QgaWRTY2hlbWEgPSB7XHJcbiAgICAkaWQ6IGlkIHx8IGlkUHJlZml4LFxyXG4gIH07XHJcbiAgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSB8fCBcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSB8fCBcImFsbE9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBjb25zdCBfc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gdG9JZFNjaGVtYShfc2NoZW1hLCBpZCwgcm9vdFNjaGVtYSwgZm9ybURhdGEsIGlkUHJlZml4LCBpZFNlcGFyYXRvcik7XHJcbiAgfVxyXG4gIGlmIChcIml0ZW1zXCIgaW4gc2NoZW1hICYmICFzY2hlbWEuaXRlbXMuJHJlZikge1xyXG4gICAgcmV0dXJuIHRvSWRTY2hlbWEoXHJcbiAgICAgIHNjaGVtYS5pdGVtcyxcclxuICAgICAgaWQsXHJcbiAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgIGZvcm1EYXRhLFxyXG4gICAgICBpZFByZWZpeCxcclxuICAgICAgaWRTZXBhcmF0b3JcclxuICAgICk7XHJcbiAgfVxyXG4gIGlmIChzY2hlbWEudHlwZSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgcmV0dXJuIGlkU2NoZW1hO1xyXG4gIH1cclxuICBmb3IgKGNvbnN0IG5hbWUgaW4gc2NoZW1hLnByb3BlcnRpZXMgfHwge30pIHtcclxuICAgIGNvbnN0IGZpZWxkID0gc2NoZW1hLnByb3BlcnRpZXNbbmFtZV07XHJcbiAgICBjb25zdCBmaWVsZElkID0gaWRTY2hlbWEuJGlkICsgaWRTZXBhcmF0b3IgKyBuYW1lO1xyXG4gICAgaWRTY2hlbWFbbmFtZV0gPSB0b0lkU2NoZW1hKFxyXG4gICAgICBpc09iamVjdChmaWVsZCkgPyBmaWVsZCA6IHt9LFxyXG4gICAgICBmaWVsZElkLFxyXG4gICAgICByb290U2NoZW1hLFxyXG4gICAgICAvLyBJdCdzIHBvc3NpYmxlIHRoYXQgZm9ybURhdGEgaXMgbm90IGFuIG9iamVjdCAtLSB0aGlzIGNhbiBoYXBwZW4gaWYgYW5cclxuICAgICAgLy8gYXJyYXkgaXRlbSBoYXMganVzdCBiZWVuIGFkZGVkLCBidXQgbm90IHBvcHVsYXRlZCB3aXRoIGRhdGEgeWV0XHJcbiAgICAgIChmb3JtRGF0YSB8fCB7fSlbbmFtZV0sXHJcbiAgICAgIGlkUHJlZml4LFxyXG4gICAgICBpZFNlcGFyYXRvclxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIGlkU2NoZW1hO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9QYXRoU2NoZW1hKHNjaGVtYSwgbmFtZSA9IFwiXCIsIHJvb3RTY2hlbWEsIGZvcm1EYXRhID0ge30pIHtcclxuICBjb25zdCBwYXRoU2NoZW1hID0ge1xyXG4gICAgJG5hbWU6IG5hbWUucmVwbGFjZSgvXlxcLi8sIFwiXCIpLFxyXG4gIH07XHJcbiAgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSB8fCBcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSB8fCBcImFsbE9mXCIgaW4gc2NoZW1hKSB7XHJcbiAgICBjb25zdCBfc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgICByZXR1cm4gdG9QYXRoU2NoZW1hKF9zY2hlbWEsIG5hbWUsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9XHJcblxyXG4gIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiKSkge1xyXG4gICAgcGF0aFNjaGVtYS5fX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcIml0ZW1zXCIpICYmIEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICBmb3JtRGF0YS5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XHJcbiAgICAgIHBhdGhTY2hlbWFbaV0gPSB0b1BhdGhTY2hlbWEoXHJcbiAgICAgICAgc2NoZW1hLml0ZW1zLFxyXG4gICAgICAgIGAke25hbWV9LiR7aX1gLFxyXG4gICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgZWxlbWVudFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJwcm9wZXJ0aWVzXCIpKSB7XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHNjaGVtYS5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgIHBhdGhTY2hlbWFbcHJvcGVydHldID0gdG9QYXRoU2NoZW1hKFxyXG4gICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSxcclxuICAgICAgICBgJHtuYW1lfS4ke3Byb3BlcnR5fWAsXHJcbiAgICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgICAvLyBJdCdzIHBvc3NpYmxlIHRoYXQgZm9ybURhdGEgaXMgbm90IGFuIG9iamVjdCAtLSB0aGlzIGNhbiBoYXBwZW4gaWYgYW5cclxuICAgICAgICAvLyBhcnJheSBpdGVtIGhhcyBqdXN0IGJlZW4gYWRkZWQsIGJ1dCBub3QgcG9wdWxhdGVkIHdpdGggZGF0YSB5ZXRcclxuICAgICAgICAoZm9ybURhdGEgfHwge30pW3Byb3BlcnR5XVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcGF0aFNjaGVtYTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0ZVN0cmluZyhkYXRlU3RyaW5nLCBpbmNsdWRlVGltZSA9IHRydWUpIHtcclxuICBpZiAoIWRhdGVTdHJpbmcpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHllYXI6IC0xLFxyXG4gICAgICBtb250aDogLTEsXHJcbiAgICAgIGRheTogLTEsXHJcbiAgICAgIGhvdXI6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxyXG4gICAgICBtaW51dGU6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxyXG4gICAgICBzZWNvbmQ6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxyXG4gICAgfTtcclxuICB9XHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG4gIGlmIChOdW1iZXIuaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gcGFyc2UgZGF0ZSBcIiArIGRhdGVTdHJpbmcpO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgeWVhcjogZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxyXG4gICAgbW9udGg6IGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIC8vIG9oIHlvdSwgamF2YXNjcmlwdC5cclxuICAgIGRheTogZGF0ZS5nZXRVVENEYXRlKCksXHJcbiAgICBob3VyOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDSG91cnMoKSA6IDAsXHJcbiAgICBtaW51dGU6IGluY2x1ZGVUaW1lID8gZGF0ZS5nZXRVVENNaW51dGVzKCkgOiAwLFxyXG4gICAgc2Vjb25kOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDU2Vjb25kcygpIDogMCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlU3RyaW5nKFxyXG4gIHsgeWVhciwgbW9udGgsIGRheSwgaG91ciA9IDAsIG1pbnV0ZSA9IDAsIHNlY29uZCA9IDAgfSxcclxuICB0aW1lID0gdHJ1ZVxyXG4pIHtcclxuICBjb25zdCB1dGNUaW1lID0gRGF0ZS5VVEMoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kKTtcclxuICBjb25zdCBkYXRldGltZSA9IG5ldyBEYXRlKHV0Y1RpbWUpLnRvSlNPTigpO1xyXG4gIHJldHVybiB0aW1lID8gZGF0ZXRpbWUgOiBkYXRldGltZS5zbGljZSgwLCAxMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1dGNUb0xvY2FsKGpzb25EYXRlKSB7XHJcbiAgaWYgKCFqc29uRGF0ZSkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICAvLyByZXF1aXJlZCBmb3JtYXQgb2YgYFwieXl5eS1NTS1kZFRoaDptbVwiIGZvbGxvd2VkIGJ5IG9wdGlvbmFsIFwiOnNzXCIgb3IgXCI6c3MuU1NTXCJcclxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbnB1dC5odG1sI2xvY2FsLWRhdGUtYW5kLXRpbWUtc3RhdGUtKHR5cGUlM0RkYXRldGltZS1sb2NhbClcclxuICAvLyA+IHNob3VsZCBiZSBhIF92YWxpZCBsb2NhbCBkYXRlIGFuZCB0aW1lIHN0cmluZ18gKG5vdCBHTVQpXHJcblxyXG4gIC8vIE5vdGUgLSBkYXRlIGNvbnN0cnVjdG9yIHBhc3NlZCBsb2NhbCBJU08tODYwMSBkb2VzIG5vdCBjb3JyZWN0bHlcclxuICAvLyBjaGFuZ2UgdGltZSB0byBVVEMgaW4gbm9kZSBwcmUtOFxyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShqc29uRGF0ZSk7XHJcblxyXG4gIGNvbnN0IHl5eXkgPSBwYWQoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KTtcclxuICBjb25zdCBNTSA9IHBhZChkYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcclxuICBjb25zdCBkZCA9IHBhZChkYXRlLmdldERhdGUoKSwgMik7XHJcbiAgY29uc3QgaGggPSBwYWQoZGF0ZS5nZXRIb3VycygpLCAyKTtcclxuICBjb25zdCBtbSA9IHBhZChkYXRlLmdldE1pbnV0ZXMoKSwgMik7XHJcbiAgY29uc3Qgc3MgPSBwYWQoZGF0ZS5nZXRTZWNvbmRzKCksIDIpO1xyXG4gIGNvbnN0IFNTUyA9IHBhZChkYXRlLmdldE1pbGxpc2Vjb25kcygpLCAzKTtcclxuXHJcbiAgcmV0dXJuIGAke3l5eXl9LSR7TU19LSR7ZGR9VCR7aGh9OiR7bW19OiR7c3N9LiR7U1NTfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2NhbFRvVVRDKGRhdGVTdHJpbmcpIHtcclxuICBpZiAoZGF0ZVN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVTdHJpbmcpLnRvSlNPTigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZChudW0sIHNpemUpIHtcclxuICBsZXQgcyA9IFN0cmluZyhudW0pO1xyXG4gIHdoaWxlIChzLmxlbmd0aCA8IHNpemUpIHtcclxuICAgIHMgPSBcIjBcIiArIHM7XHJcbiAgfVxyXG4gIHJldHVybiBzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XHJcbiAgLy8gU3BsaXQgbWV0YWRhdGEgZnJvbSBkYXRhXHJcbiAgY29uc3Qgc3BsaXR0ZWQgPSBkYXRhVVJJLnNwbGl0KFwiLFwiKTtcclxuICAvLyBTcGxpdCBwYXJhbXNcclxuICBjb25zdCBwYXJhbXMgPSBzcGxpdHRlZFswXS5zcGxpdChcIjtcIik7XHJcbiAgLy8gR2V0IG1pbWUtdHlwZSBmcm9tIHBhcmFtc1xyXG4gIGNvbnN0IHR5cGUgPSBwYXJhbXNbMF0ucmVwbGFjZShcImRhdGE6XCIsIFwiXCIpO1xyXG4gIC8vIEZpbHRlciB0aGUgbmFtZSBwcm9wZXJ0eSBmcm9tIHBhcmFtc1xyXG4gIGNvbnN0IHByb3BlcnRpZXMgPSBwYXJhbXMuZmlsdGVyKHBhcmFtID0+IHtcclxuICAgIHJldHVybiBwYXJhbS5zcGxpdChcIj1cIilbMF0gPT09IFwibmFtZVwiO1xyXG4gIH0pO1xyXG4gIC8vIExvb2sgZm9yIHRoZSBuYW1lIGFuZCB1c2UgdW5rbm93biBpZiBubyBuYW1lIHByb3BlcnR5LlxyXG4gIGxldCBuYW1lO1xyXG4gIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgbmFtZSA9IFwidW5rbm93blwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBCZWNhdXNlIHdlIGZpbHRlcmVkIG91dCB0aGUgb3RoZXIgcHJvcGVydHksXHJcbiAgICAvLyB3ZSBvbmx5IGhhdmUgdGhlIG5hbWUgY2FzZSBoZXJlLlxyXG4gICAgbmFtZSA9IHByb3BlcnRpZXNbMF0uc3BsaXQoXCI9XCIpWzFdO1xyXG4gIH1cclxuXHJcbiAgLy8gQnVpbHQgdGhlIFVpbnQ4QXJyYXkgQmxvYiBwYXJhbWV0ZXIgZnJvbSB0aGUgYmFzZTY0IHN0cmluZy5cclxuICBjb25zdCBiaW5hcnkgPSBhdG9iKHNwbGl0dGVkWzFdKTtcclxuICBjb25zdCBhcnJheSA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBhcnJheS5wdXNoKGJpbmFyeS5jaGFyQ29kZUF0KGkpKTtcclxuICB9XHJcbiAgLy8gQ3JlYXRlIHRoZSBibG9iIG9iamVjdFxyXG4gIGNvbnN0IGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW25ldyBVaW50OEFycmF5KGFycmF5KV0sIHsgdHlwZSB9KTtcclxuXHJcbiAgcmV0dXJuIHsgYmxvYiwgbmFtZSB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VTcGVjKHNjaGVtYSkge1xyXG4gIGNvbnN0IHNwZWMgPSB7fTtcclxuICBpZiAoc2NoZW1hLm11bHRpcGxlT2YpIHtcclxuICAgIHNwZWMuc3RlcCA9IHNjaGVtYS5tdWx0aXBsZU9mO1xyXG4gIH1cclxuICBpZiAoc2NoZW1hLm1pbmltdW0gfHwgc2NoZW1hLm1pbmltdW0gPT09IDApIHtcclxuICAgIHNwZWMubWluID0gc2NoZW1hLm1pbmltdW07XHJcbiAgfVxyXG4gIGlmIChzY2hlbWEubWF4aW11bSB8fCBzY2hlbWEubWF4aW11bSA9PT0gMCkge1xyXG4gICAgc3BlYy5tYXggPSBzY2hlbWEubWF4aW11bTtcclxuICB9XHJcbiAgcmV0dXJuIHNwZWM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgb3B0aW9ucywgcm9vdFNjaGVtYSkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1tpXTtcclxuXHJcbiAgICAvLyBJZiB0aGUgc2NoZW1hIGRlc2NyaWJlcyBhbiBvYmplY3QgdGhlbiB3ZSBuZWVkIHRvIGFkZCBzbGlnaHRseSBtb3JlXHJcbiAgICAvLyBzdHJpY3QgbWF0Y2hpbmcgdG8gdGhlIHNjaGVtYSwgYmVjYXVzZSB1bmxlc3MgdGhlIHNjaGVtYSB1c2VzIHRoZVxyXG4gICAgLy8gXCJyZXF1aXJlc1wiIGtleXdvcmQsIGFuIG9iamVjdCB3aWxsIG1hdGNoIHRoZSBzY2hlbWEgYXMgbG9uZyBhcyBpdFxyXG4gICAgLy8gZG9lc24ndCBoYXZlIG1hdGNoaW5nIGtleXMgd2l0aCBhIGNvbmZsaWN0aW5nIHR5cGUuIFRvIGRvIHRoaXMgd2UgdXNlIGFuXHJcbiAgICAvLyBcImFueU9mXCIgd2l0aCBhbiBhcnJheSBvZiByZXF1aXJlcy4gVGhpcyBhdWdtZW50YXRpb24gZXhwcmVzc2VzIHRoYXQgdGhlXHJcbiAgICAvLyBzY2hlbWEgc2hvdWxkIG1hdGNoIGlmIGFueSBvZiB0aGUga2V5cyBpbiB0aGUgc2NoZW1hIGFyZSBwcmVzZW50IG9uIHRoZVxyXG4gICAgLy8gb2JqZWN0IGFuZCBwYXNzIHZhbGlkYXRpb24uXHJcbiAgICBpZiAob3B0aW9uLnByb3BlcnRpZXMpIHtcclxuICAgICAgLy8gQ3JlYXRlIGFuIFwiYW55T2ZcIiBzY2hlbWEgdGhhdCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgb2YgdGhlIGtleXMgaW4gdGhlXHJcbiAgICAgIC8vIFwicHJvcGVydGllc1wiIG9iamVjdFxyXG4gICAgICBjb25zdCByZXF1aXJlc0FueU9mID0ge1xyXG4gICAgICAgIGFueU9mOiBPYmplY3Qua2V5cyhvcHRpb24ucHJvcGVydGllcykubWFwKGtleSA9PiAoe1xyXG4gICAgICAgICAgcmVxdWlyZWQ6IFtrZXldLFxyXG4gICAgICAgIH0pKSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCBhdWdtZW50ZWRTY2hlbWE7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgXCJhbnlPZlwiIGtleXdvcmQgYWxyZWFkeSBleGlzdHMsIHdyYXAgdGhlIGF1Z21lbnRhdGlvbiBpbiBhbiBcImFsbE9mXCJcclxuICAgICAgaWYgKG9wdGlvbi5hbnlPZikge1xyXG4gICAgICAgIC8vIENyZWF0ZSBhIHNoYWxsb3cgY2xvbmUgb2YgdGhlIG9wdGlvblxyXG4gICAgICAgIGNvbnN0IHsgLi4uc2hhbGxvd0Nsb25lIH0gPSBvcHRpb247XHJcblxyXG4gICAgICAgIGlmICghc2hhbGxvd0Nsb25lLmFsbE9mKSB7XHJcbiAgICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YgPSBbXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gSWYgXCJhbGxPZlwiIGFscmVhZHkgZXhpc3RzLCBzaGFsbG93IGNsb25lIHRoZSBhcnJheVxyXG4gICAgICAgICAgc2hhbGxvd0Nsb25lLmFsbE9mID0gc2hhbGxvd0Nsb25lLmFsbE9mLnNsaWNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YucHVzaChyZXF1aXJlc0FueU9mKTtcclxuXHJcbiAgICAgICAgYXVnbWVudGVkU2NoZW1hID0gc2hhbGxvd0Nsb25lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1Z21lbnRlZFNjaGVtYSA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbiwgcmVxdWlyZXNBbnlPZik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSB0aGUgXCJyZXF1aXJlZFwiIGZpZWxkIGFzIGl0J3MgbGlrZWx5IHRoYXQgbm90IGFsbCBmaWVsZHMgaGF2ZVxyXG4gICAgICAvLyBiZWVuIGZpbGxlZCBpbiB5ZXQsIHdoaWNoIHdpbGwgbWVhbiB0aGF0IHRoZSBzY2hlbWEgaXMgbm90IHZhbGlkXHJcbiAgICAgIGRlbGV0ZSBhdWdtZW50ZWRTY2hlbWEucmVxdWlyZWQ7XHJcblxyXG4gICAgICBpZiAoaXNWYWxpZChhdWdtZW50ZWRTY2hlbWEsIGZvcm1EYXRhLCByb290U2NoZW1hKSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzVmFsaWQob3B0aW9uLCBmb3JtRGF0YSwgcm9vdFNjaGVtYSkpIHtcclxuICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAwO1xyXG59XHJcblxyXG4vLyBDaGVjayB0byBzZWUgaWYgYSBzY2hlbWEgc3BlY2lmaWVzIHRoYXQgYSB2YWx1ZSBtdXN0IGJlIHRydWVcclxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYSkge1xyXG4gIC8vIENoZWNrIGlmIGNvbnN0IGlzIGEgdHJ1dGh5IHZhbHVlXHJcbiAgaWYgKHNjaGVtYS5jb25zdCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBpZiBhbiBlbnVtIGhhcyBhIHNpbmdsZSB2YWx1ZSBvZiB0cnVlXHJcbiAgaWYgKHNjaGVtYS5lbnVtICYmIHNjaGVtYS5lbnVtLmxlbmd0aCA9PT0gMSAmJiBzY2hlbWEuZW51bVswXSA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBJZiBhbnlPZiBoYXMgYSBzaW5nbGUgdmFsdWUsIGV2YWx1YXRlIHRoZSBzdWJzY2hlbWFcclxuICBpZiAoc2NoZW1hLmFueU9mICYmIHNjaGVtYS5hbnlPZi5sZW5ndGggPT09IDEpIHtcclxuICAgIHJldHVybiBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZShzY2hlbWEuYW55T2ZbMF0pO1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgb25lT2YgaGFzIGEgc2luZ2xlIHZhbHVlLCBldmFsdWF0ZSB0aGUgc3Vic2NoZW1hXHJcbiAgaWYgKHNjaGVtYS5vbmVPZiAmJiBzY2hlbWEub25lT2YubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUoc2NoZW1hLm9uZU9mWzBdKTtcclxuICB9XHJcblxyXG4gIC8vIEV2YWx1YXRlIGVhY2ggc3Vic2NoZW1hIGluIGFsbE9mLCB0byBzZWUgaWYgb25lIG9mIHRoZW0gcmVxdWlyZXMgYSB0cnVlXHJcbiAgLy8gdmFsdWVcclxuICBpZiAoc2NoZW1hLmFsbE9mKSB7XHJcbiAgICByZXR1cm4gc2NoZW1hLmFsbE9mLnNvbWUoc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbiJdfQ==