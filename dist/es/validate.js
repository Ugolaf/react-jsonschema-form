function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import toPath from "lodash/toPath";
import Ajv from "ajv";
var ajv = createAjvInstance();
import { deepEquals, getDefaultFormState } from "./utils";
var formerCustomFormats = null;
var formerMetaSchema = null;
var ROOT_SCHEMA_PREFIX = "__rjsf_rootSchema";
import { isObject, mergeObjects } from "./utils";

function createAjvInstance() {
  var ajv = new Ajv({
    errorDataPath: "property",
    allErrors: true,
    multipleOfPrecision: 8,
    schemaId: "auto",
    unknownFormats: "ignore"
  }); // add custom formats

  ajv.addFormat("data-url", /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/);
  ajv.addFormat("color", /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/);
  return ajv;
}

function toErrorSchema(errors) {
  // Transforms a ajv validation errors list:
  // [
  //   {property: ".level1.level2[2].level3", message: "err a"},
  //   {property: ".level1.level2[2].level3", message: "err b"},
  //   {property: ".level1.level2[4].level3", message: "err b"},
  // ]
  // Into an error tree:
  // {
  //   level1: {
  //     level2: {
  //       2: {level3: {errors: ["err a", "err b"]}},
  //       4: {level3: {errors: ["err b"]}},
  //     }
  //   }
  // };
  if (!errors.length) {
    return {};
  }

  return errors.reduce(function (errorSchema, error) {
    var property = error.property,
        message = error.message;
    var path = toPath(property);
    var parent = errorSchema; // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.

    if (path.length > 0 && path[0] === "") {
      path.splice(0, 1);
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = path.slice(0)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var segment = _step.value;

        if (!(segment in parent)) {
          parent[segment] = {};
        }

        parent = parent[segment];
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

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message);
    } else {
      if (message) {
        parent.__errors = [message];
      }
    }

    return errorSchema;
  }, {});
}

export function toErrorList(errorSchema) {
  var fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "root";
  // XXX: We should transform fieldName as a full field path string.
  var errorList = [];

  if ("__errors" in errorSchema) {
    errorList = errorList.concat(errorSchema.__errors.map(function (stack) {
      return {
        stack: "".concat(fieldName, ": ").concat(stack)
      };
    }));
  }

  return Object.keys(errorSchema).reduce(function (acc, key) {
    if (key !== "__errors") {
      acc = acc.concat(toErrorList(errorSchema[key], key));
    }

    return acc;
  }, errorList);
}

function createErrorHandler(formData) {
  var handler = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // "errors" (see `utils.toErrorSchema`).
    __errors: [],
    addError: function addError(message) {
      this.__errors.push(message);
    }
  };

  if (isObject(formData)) {
    return Object.keys(formData).reduce(function (acc, key) {
      return _objectSpread({}, acc, _defineProperty({}, key, createErrorHandler(formData[key])));
    }, handler);
  }

  if (Array.isArray(formData)) {
    return formData.reduce(function (acc, value, key) {
      return _objectSpread({}, acc, _defineProperty({}, key, createErrorHandler(value)));
    }, handler);
  }

  return handler;
}

function unwrapErrorHandler(errorHandler) {
  return Object.keys(errorHandler).reduce(function (acc, key) {
    if (key === "addError") {
      return acc;
    } else if (key === "__errors") {
      return _objectSpread({}, acc, _defineProperty({}, key, errorHandler[key]));
    }

    return _objectSpread({}, acc, _defineProperty({}, key, unwrapErrorHandler(errorHandler[key])));
  }, {});
}
/**
 * Transforming the error output from ajv to format used by jsonschema.
 * At some point, components should be updated to support ajv.
 */


function transformAjvErrors() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (errors === null) {
    return [];
  }

  return errors.map(function (e) {
    var dataPath = e.dataPath,
        keyword = e.keyword,
        message = e.message,
        params = e.params,
        schemaPath = e.schemaPath;
    var property = "".concat(dataPath); // put data in expected format

    return {
      name: keyword,
      property: property,
      message: message,
      params: params,
      // specific to ajv
      stack: "".concat(property, " ").concat(message).trim(),
      schemaPath: schemaPath
    };
  });
}
/**
 * This function processes the formData with a user `validate` contributed
 * function, which receives the form data and an `errorHandler` object that
 * will be used to add custom validation errors for each field.
 */


export default function validateFormData(formData, schema, customValidate, transformErrors) {
  var additionalMetaSchemas = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var customFormats = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var localizeErrors = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  // Include form data with undefined values, which is required for validation.
  var rootSchema = schema;
  formData = getDefaultFormState(schema, formData, rootSchema, true);
  var newMetaSchemas = !deepEquals(formerMetaSchema, additionalMetaSchemas);
  var newFormats = !deepEquals(formerCustomFormats, customFormats);

  if (newMetaSchemas || newFormats) {
    ajv = createAjvInstance();
  } // add more schemas to validate against


  if (additionalMetaSchemas && newMetaSchemas && Array.isArray(additionalMetaSchemas)) {
    ajv.addMetaSchema(additionalMetaSchemas);
    formerMetaSchema = additionalMetaSchemas;
  } // add more custom formats to validate against


  if (customFormats && newFormats && isObject(customFormats)) {
    Object.keys(customFormats).forEach(function (formatName) {
      ajv.addFormat(formatName, customFormats[formatName]);
    });
    formerCustomFormats = customFormats;
  }

  var validationError = null;

  try {
    ajv.validate(schema, formData);
  } catch (err) {
    validationError = err;
  }

  localizeErrors && typeof localizeErrors == "function" && localizeErrors(ajv.errors);
  var errors = transformAjvErrors(ajv.errors); // Clear errors to prevent persistent errors, see #1104

  ajv.errors = null;
  var noProperMetaSchema = validationError && validationError.message && typeof validationError.message === "string" && validationError.message.includes("no schema with key or ref ");

  if (noProperMetaSchema) {
    errors = [].concat(_toConsumableArray(errors), [{
      stack: validationError.message
    }]);
  }

  if (typeof transformErrors === "function") {
    errors = transformErrors(errors);
  }

  var errorSchema = toErrorSchema(errors);

  if (noProperMetaSchema) {
    errorSchema = _objectSpread({}, errorSchema, {
      $schema: {
        __errors: [validationError.message]
      }
    });
  }

  if (typeof customValidate !== "function") {
    return {
      errors: errors,
      errorSchema: errorSchema
    };
  }

  var errorHandler = customValidate(formData, createErrorHandler(formData));
  var userErrorSchema = unwrapErrorHandler(errorHandler);
  var newErrorSchema = mergeObjects(errorSchema, userErrorSchema, true); // XXX: The errors list produced is not fully compliant with the format
  // exposed by the jsonschema lib, which contains full field paths and other
  // properties.

  var newErrors = toErrorList(newErrorSchema);
  return {
    errors: newErrors,
    errorSchema: newErrorSchema
  };
}
/**
 * Recursively prefixes all $ref's in a schema with `ROOT_SCHEMA_PREFIX`
 * This is used in isValid to make references to the rootSchema
 */

export function withIdRefPrefix(schemaNode) {
  var obj = schemaNode;

  if (schemaNode.constructor === Object) {
    obj = _objectSpread({}, schemaNode);

    for (var key in obj) {
      var value = obj[key];

      if (key === "$ref" && typeof value === "string" && value.startsWith("#")) {
        obj[key] = ROOT_SCHEMA_PREFIX + value;
      } else {
        obj[key] = withIdRefPrefix(value);
      }
    }
  } else if (Array.isArray(schemaNode)) {
    obj = _toConsumableArray(schemaNode);

    for (var i = 0; i < obj.length; i++) {
      obj[i] = withIdRefPrefix(obj[i]);
    }
  }

  return obj;
}
/**
 * Validates data against a schema, returning true if the data is valid, or
 * false otherwise. If the schema is invalid, then this function will return
 * false.
 */

export function isValid(schema, data, rootSchema) {
  try {
    // add the rootSchema ROOT_SCHEMA_PREFIX as id.
    // then rewrite the schema ref's to point to the rootSchema
    // this accounts for the case where schema have references to models
    // that lives in the rootSchema but not in the schema in question.
    return ajv.addSchema(rootSchema, ROOT_SCHEMA_PREFIX).validate(withIdRefPrefix(schema), data);
  } catch (e) {
    return false;
  } finally {
    // make sure we remove the rootSchema from the global ajv instance
    ajv.removeSchema(ROOT_SCHEMA_PREFIX);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWxpZGF0ZS5qcyJdLCJuYW1lcyI6WyJ0b1BhdGgiLCJBanYiLCJhanYiLCJjcmVhdGVBanZJbnN0YW5jZSIsImRlZXBFcXVhbHMiLCJnZXREZWZhdWx0Rm9ybVN0YXRlIiwiZm9ybWVyQ3VzdG9tRm9ybWF0cyIsImZvcm1lck1ldGFTY2hlbWEiLCJST09UX1NDSEVNQV9QUkVGSVgiLCJpc09iamVjdCIsIm1lcmdlT2JqZWN0cyIsImVycm9yRGF0YVBhdGgiLCJhbGxFcnJvcnMiLCJtdWx0aXBsZU9mUHJlY2lzaW9uIiwic2NoZW1hSWQiLCJ1bmtub3duRm9ybWF0cyIsImFkZEZvcm1hdCIsInRvRXJyb3JTY2hlbWEiLCJlcnJvcnMiLCJsZW5ndGgiLCJyZWR1Y2UiLCJlcnJvclNjaGVtYSIsImVycm9yIiwicHJvcGVydHkiLCJtZXNzYWdlIiwicGF0aCIsInBhcmVudCIsInNwbGljZSIsInNsaWNlIiwic2VnbWVudCIsIkFycmF5IiwiaXNBcnJheSIsIl9fZXJyb3JzIiwiY29uY2F0IiwidG9FcnJvckxpc3QiLCJmaWVsZE5hbWUiLCJlcnJvckxpc3QiLCJtYXAiLCJzdGFjayIsIk9iamVjdCIsImtleXMiLCJhY2MiLCJrZXkiLCJjcmVhdGVFcnJvckhhbmRsZXIiLCJmb3JtRGF0YSIsImhhbmRsZXIiLCJhZGRFcnJvciIsInB1c2giLCJ2YWx1ZSIsInVud3JhcEVycm9ySGFuZGxlciIsImVycm9ySGFuZGxlciIsInRyYW5zZm9ybUFqdkVycm9ycyIsImUiLCJkYXRhUGF0aCIsImtleXdvcmQiLCJwYXJhbXMiLCJzY2hlbWFQYXRoIiwibmFtZSIsInRyaW0iLCJ2YWxpZGF0ZUZvcm1EYXRhIiwic2NoZW1hIiwiY3VzdG9tVmFsaWRhdGUiLCJ0cmFuc2Zvcm1FcnJvcnMiLCJhZGRpdGlvbmFsTWV0YVNjaGVtYXMiLCJjdXN0b21Gb3JtYXRzIiwibG9jYWxpemVFcnJvcnMiLCJyb290U2NoZW1hIiwibmV3TWV0YVNjaGVtYXMiLCJuZXdGb3JtYXRzIiwiYWRkTWV0YVNjaGVtYSIsImZvckVhY2giLCJmb3JtYXROYW1lIiwidmFsaWRhdGlvbkVycm9yIiwidmFsaWRhdGUiLCJlcnIiLCJub1Byb3Blck1ldGFTY2hlbWEiLCJpbmNsdWRlcyIsIiRzY2hlbWEiLCJ1c2VyRXJyb3JTY2hlbWEiLCJuZXdFcnJvclNjaGVtYSIsIm5ld0Vycm9ycyIsIndpdGhJZFJlZlByZWZpeCIsInNjaGVtYU5vZGUiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInN0YXJ0c1dpdGgiLCJpIiwiaXNWYWxpZCIsImRhdGEiLCJhZGRTY2hlbWEiLCJyZW1vdmVTY2hlbWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLE1BQVAsTUFBbUIsZUFBbkI7QUFDQSxPQUFPQyxHQUFQLE1BQWdCLEtBQWhCO0FBQ0EsSUFBSUMsR0FBRyxHQUFHQyxpQkFBaUIsRUFBM0I7QUFDQSxTQUFTQyxVQUFULEVBQXFCQyxtQkFBckIsUUFBZ0QsU0FBaEQ7QUFFQSxJQUFJQyxtQkFBbUIsR0FBRyxJQUExQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLElBQXZCO0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsbUJBQTNCO0FBRUEsU0FBU0MsUUFBVCxFQUFtQkMsWUFBbkIsUUFBdUMsU0FBdkM7O0FBRUEsU0FBU1AsaUJBQVQsR0FBNkI7QUFDM0IsTUFBTUQsR0FBRyxHQUFHLElBQUlELEdBQUosQ0FBUTtBQUNsQlUsSUFBQUEsYUFBYSxFQUFFLFVBREc7QUFFbEJDLElBQUFBLFNBQVMsRUFBRSxJQUZPO0FBR2xCQyxJQUFBQSxtQkFBbUIsRUFBRSxDQUhIO0FBSWxCQyxJQUFBQSxRQUFRLEVBQUUsTUFKUTtBQUtsQkMsSUFBQUEsY0FBYyxFQUFFO0FBTEUsR0FBUixDQUFaLENBRDJCLENBUzNCOztBQUNBYixFQUFBQSxHQUFHLENBQUNjLFNBQUosQ0FDRSxVQURGLEVBRUUsMkRBRkY7QUFJQWQsRUFBQUEsR0FBRyxDQUFDYyxTQUFKLENBQ0UsT0FERixFQUVFLDRZQUZGO0FBSUEs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QUQsQ0FBSCxHQUFXdUMsZUFBZSxDQUFDakMsS0FBRCxDQUExQjtBQUNEO0FBQ0Y7QUFDRixHQWRELE1BY08sSUFBSWxCLEtBQUssQ0FBQ0MsT0FBTixDQUFjbUQsVUFBZCxDQUFKLEVBQStCO0FBQ3BDQyxJQUFBQSxHQUFHLHNCQUFPRCxVQUFQLENBQUg7O0FBQ0EsU0FBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCxHQUFHLENBQUNoRSxNQUF4QixFQUFnQ21FLENBQUMsRUFBakMsRUFBcUM7QUFDbkNILE1BQUFBLEdBQUcsQ0FBQ0csQ0FBRCxDQUFILEdBQVNMLGVBQWUsQ0FBQ0UsR0FBRyxDQUFDRyxDQUFELENBQUosQ0FBeEI7QUFDRDtBQUNGOztBQUNELFNBQU9ILEdBQVA7QUFDRDtBQUVEOzs7Ozs7QUFLQSxPQUFPLFNBQVNJLE9BQVQsQ0FBaUIzQixNQUFqQixFQUF5QjRCLElBQXpCLEVBQStCdEIsVUFBL0IsRUFBMkM7QUFDaEQsTUFBSTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBT2hFLEdBQUcsQ0FDUHVGLFNBREksQ0FDTXZCLFVBRE4sRUFDa0IxRCxrQkFEbEIsRUFFSmlFLFFBRkksQ0FFS1EsZUFBZSxDQUFDckIsTUFBRCxDQUZwQixFQUU4QjRCLElBRjlCLENBQVA7QUFHRCxHQVJELENBUUUsT0FBT3BDLENBQVAsRUFBVTtBQUNWLFdBQU8sS0FBUDtBQUNELEdBVkQsU0FVVTtBQUNSO0FBQ0FsRCxJQUFBQSxHQUFHLENBQUN3RixZQUFKLENBQWlCbEYsa0JBQWpCO0FBQ0Q7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0b1BhdGggZnJvbSBcImxvZGFzaC90b1BhdGhcIjtcclxuaW1wb3J0IEFqdiBmcm9tIFwiYWp2XCI7XHJcbmxldCBhanYgPSBjcmVhdGVBanZJbnN0YW5jZSgpO1xyXG5pbXBvcnQgeyBkZWVwRXF1YWxzLCBnZXREZWZhdWx0Rm9ybVN0YXRlIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbmxldCBmb3JtZXJDdXN0b21Gb3JtYXRzID0gbnVsbDtcclxubGV0IGZvcm1lck1ldGFTY2hlbWEgPSBudWxsO1xyXG5jb25zdCBST09UX1NDSEVNQV9QUkVGSVggPSBcIl9fcmpzZl9yb290U2NoZW1hXCI7XHJcblxyXG5pbXBvcnQgeyBpc09iamVjdCwgbWVyZ2VPYmplY3RzIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUFqdkluc3RhbmNlKCkge1xyXG4gIGNvbnN0IGFqdiA9IG5ldyBBanYoe1xyXG4gICAgZXJyb3JEYXRhUGF0aDogXCJwcm9wZXJ0eVwiLFxyXG4gICAgYWxsRXJyb3JzOiB0cnVlLFxyXG4gICAgbXVsdGlwbGVPZlByZWNpc2lvbjogOCxcclxuICAgIHNjaGVtYUlkOiBcImF1dG9cIixcclxuICAgIHVua25vd25Gb3JtYXRzOiBcImlnbm9yZVwiLFxyXG4gIH0pO1xyXG5cclxuICAvLyBhZGQgY3VzdG9tIGZvcm1hdHNcclxuICBhanYuYWRkRm9ybWF0KFxyXG4gICAgXCJkYXRhLXVybFwiLFxyXG4gICAgL15kYXRhOihbYS16XStcXC9bYS16MC05LSsuXSspPzsoPzpuYW1lPSguKik7KT9iYXNlNjQsKC4qKSQvXHJcbiAgKTtcclxuICBhanYuYWRkRm9ybWF0KFxyXG4gICAgXCJjb2xvclwiLFxyXG4gICAgL14oIz8oWzAtOUEtRmEtZl17M30pezEsMn1cXGJ8YXF1YXxibGFja3xibHVlfGZ1Y2hzaWF8Z3JheXxncmVlbnxsaW1lfG1hcm9vbnxuYXZ5fG9saXZlfG9yYW5nZXxwdXJwbGV8cmVkfHNpbHZlcnx0ZWFsfHdoaXRlfHllbGxvd3wocmdiXFwoXFxzKlxcYihbMC05XXxbMS05XVswLTldfDFbMC05XVswLTldfDJbMC00XVswLTldfDI1WzAtNV0pXFxiXFxzKixcXHMqXFxiKFswLTldfFsxLTldWzAtOV18MVswLTldWzAtOV18MlswLTRdWzAtOV18MjVbMC01XSlcXGJcXHMqLFxccypcXGIoWzAtOV18WzEtOV1bMC05XXwxWzAtOV1bMC05XXwyWzAtNF1bMC05XXwyNVswLTVdKVxcYlxccypcXCkpfChyZ2JcXChcXHMqKFxcZD9cXGQlfDEwMCUpK1xccyosXFxzKihcXGQ/XFxkJXwxMDAlKStcXHMqLFxccyooXFxkP1xcZCV8MTAwJSkrXFxzKlxcKSkpJC9cclxuICApO1xyXG4gIHJldHVybiBhanY7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvRXJyb3JTY2hlbWEoZXJyb3JzKSB7XHJcbiAgLy8gVHJhbnNmb3JtcyBhIGFqdiB2YWxpZGF0aW9uIGVycm9ycyBsaXN0OlxyXG4gIC8vIFtcclxuICAvLyAgIHtwcm9wZXJ0eTogXCIubGV2ZWwxLmxldmVsMlsyXS5sZXZlbDNcIiwgbWVzc2FnZTogXCJlcnIgYVwifSxcclxuICAvLyAgIHtwcm9wZXJ0eTogXCIubGV2ZWwxLmxldmVsMlsyXS5sZXZlbDNcIiwgbWVzc2FnZTogXCJlcnIgYlwifSxcclxuICAvLyAgIHtwcm9wZXJ0eTogXCIubGV2ZWwxLmxldmVsMls0XS5sZXZlbDNcIiwgbWVzc2FnZTogXCJlcnIgYlwifSxcclxuICAvLyBdXHJcbiAgLy8gSW50byBhbiBlcnJvciB0cmVlOlxyXG4gIC8vIHtcclxuICAvLyAgIGxldmVsMToge1xyXG4gIC8vICAgICBsZXZlbDI6IHtcclxuICAvLyAgICAgICAyOiB7bGV2ZWwzOiB7ZXJyb3JzOiBbXCJlcnIgYVwiLCBcImVyciBiXCJdfX0sXHJcbiAgLy8gICAgICAgNDoge2xldmVsMzoge2Vycm9yczogW1wiZXJyIGJcIl19fSxcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG4gIC8vIH07XHJcbiAgaWYgKCFlcnJvcnMubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG4gIHJldHVybiBlcnJvcnMucmVkdWNlKChlcnJvclNjaGVtYSwgZXJyb3IpID0+IHtcclxuICAgIGNvbnN0IHsgcHJvcGVydHksIG1lc3NhZ2UgfSA9IGVycm9yO1xyXG4gICAgY29uc3QgcGF0aCA9IHRvUGF0aChwcm9wZXJ0eSk7XHJcbiAgICBsZXQgcGFyZW50ID0gZXJyb3JTY2hlbWE7XHJcblxyXG4gICAgLy8gSWYgdGhlIHByb3BlcnR5IGlzIGF0IHRoZSByb290ICgubGV2ZWwxKSB0aGVuIHRvUGF0aCBjcmVhdGVzXHJcbiAgICAvLyBhbiBlbXB0eSBhcnJheSBlbGVtZW50IGF0IHRoZSBmaXJzdCBpbmRleC4gUmVtb3ZlIGl0LlxyXG4gICAgaWYgKHBhdGgubGVuZ3RoID4gMCAmJiBwYXRoWzBdID09PSBcIlwiKSB7XHJcbiAgICAgIHBhdGguc3BsaWNlKDAsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBwYXRoLnNsaWNlKDApKSB7XHJcbiAgICAgIGlmICghKHNlZ21lbnQgaW4gcGFyZW50KSkge1xyXG4gICAgICAgIHBhcmVudFtzZWdtZW50XSA9IHt9O1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmVudCA9IHBhcmVudFtzZWdtZW50XTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJlbnQuX19lcnJvcnMpKSB7XHJcbiAgICAgIC8vIFdlIHN0b3JlIHRoZSBsaXN0IG9mIGVycm9ycyBmb3IgdGhpcyBub2RlIGluIGEgcHJvcGVydHkgbmFtZWQgX19lcnJvcnNcclxuICAgICAgLy8gdG8gYXZvaWQgbmFtZSBjb2xsaXNpb24gd2l0aCBhIHBvc3NpYmxlIHN1YiBzY2hlbWEgZmllbGQgbmFtZWRcclxuICAgICAgLy8gXCJlcnJvcnNcIiAoc2VlIGB2YWxpZGF0ZS5jcmVhdGVFcnJvckhhbmRsZXJgKS5cclxuICAgICAgcGFyZW50Ll9fZXJyb3JzID0gcGFyZW50Ll9fZXJyb3JzLmNvbmNhdChtZXNzYWdlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChtZXNzYWdlKSB7XHJcbiAgICAgICAgcGFyZW50Ll9fZXJyb3JzID0gW21lc3NhZ2VdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3JTY2hlbWE7XHJcbiAgfSwge30pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9FcnJvckxpc3QoZXJyb3JTY2hlbWEsIGZpZWxkTmFtZSA9IFwicm9vdFwiKSB7XHJcbiAgLy8gWFhYOiBXZSBzaG91bGQgdHJhbnNmb3JtIGZpZWxkTmFtZSBhcyBhIGZ1bGwgZmllbGQgcGF0aCBzdHJpbmcuXHJcbiAgbGV0IGVycm9yTGlzdCA9IFtdO1xyXG4gIGlmIChcIl9fZXJyb3JzXCIgaW4gZXJyb3JTY2hlbWEpIHtcclxuICAgIGVycm9yTGlzdCA9IGVycm9yTGlzdC5jb25jYXQoXHJcbiAgICAgIGVycm9yU2NoZW1hLl9fZXJyb3JzLm1hcChzdGFjayA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHN0YWNrOiBgJHtmaWVsZE5hbWV9OiAke3N0YWNrfWAsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiBPYmplY3Qua2V5cyhlcnJvclNjaGVtYSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgaWYgKGtleSAhPT0gXCJfX2Vycm9yc1wiKSB7XHJcbiAgICAgIGFjYyA9IGFjYy5jb25jYXQodG9FcnJvckxpc3QoZXJyb3JTY2hlbWFba2V5XSwga2V5KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIGVycm9yTGlzdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVycm9ySGFuZGxlcihmb3JtRGF0YSkge1xyXG4gIGNvbnN0IGhhbmRsZXIgPSB7XHJcbiAgICAvLyBXZSBzdG9yZSB0aGUgbGlzdCBvZiBlcnJvcnMgZm9yIHRoaXMgbm9kZSBpbiBhIHByb3BlcnR5IG5hbWVkIF9fZXJyb3JzXHJcbiAgICAvLyB0byBhdm9pZCBuYW1lIGNvbGxpc2lvbiB3aXRoIGEgcG9zc2libGUgc3ViIHNjaGVtYSBmaWVsZCBuYW1lZFxyXG4gICAgLy8gXCJlcnJvcnNcIiAoc2VlIGB1dGlscy50b0Vycm9yU2NoZW1hYCkuXHJcbiAgICBfX2Vycm9yczogW10sXHJcbiAgICBhZGRFcnJvcihtZXNzYWdlKSB7XHJcbiAgICAgIHRoaXMuX19lcnJvcnMucHVzaChtZXNzYWdlKTtcclxuICAgIH0sXHJcbiAgfTtcclxuICBpZiAoaXNPYmplY3QoZm9ybURhdGEpKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9ybURhdGEpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgICAgcmV0dXJuIHsgLi4uYWNjLCBba2V5XTogY3JlYXRlRXJyb3JIYW5kbGVyKGZvcm1EYXRhW2tleV0pIH07XHJcbiAgICB9LCBoYW5kbGVyKTtcclxuICB9XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XHJcbiAgICByZXR1cm4gZm9ybURhdGEucmVkdWNlKChhY2MsIHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgcmV0dXJuIHsgLi4uYWNjLCBba2V5XTogY3JlYXRlRXJyb3JIYW5kbGVyKHZhbHVlKSB9O1xyXG4gICAgfSwgaGFuZGxlcik7XHJcbiAgfVxyXG4gIHJldHVybiBoYW5kbGVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bndyYXBFcnJvckhhbmRsZXIoZXJyb3JIYW5kbGVyKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGVycm9ySGFuZGxlcikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgaWYgKGtleSA9PT0gXCJhZGRFcnJvclwiKSB7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJfX2Vycm9yc1wiKSB7XHJcbiAgICAgIHJldHVybiB7IC4uLmFjYywgW2tleV06IGVycm9ySGFuZGxlcltrZXldIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyAuLi5hY2MsIFtrZXldOiB1bndyYXBFcnJvckhhbmRsZXIoZXJyb3JIYW5kbGVyW2tleV0pIH07XHJcbiAgfSwge30pO1xyXG59XHJcblxyXG4vKipcclxuICogVHJhbnNmb3JtaW5nIHRoZSBlcnJvciBvdXRwdXQgZnJvbSBhanYgdG8gZm9ybWF0IHVzZWQgYnkganNvbnNjaGVtYS5cclxuICogQXQgc29tZSBwb2ludCwgY29tcG9uZW50cyBzaG91bGQgYmUgdXBkYXRlZCB0byBzdXBwb3J0IGFqdi5cclxuICovXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybUFqdkVycm9ycyhlcnJvcnMgPSBbXSkge1xyXG4gIGlmIChlcnJvcnMgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIHJldHVybiBlcnJvcnMubWFwKGUgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhUGF0aCwga2V5d29yZCwgbWVzc2FnZSwgcGFyYW1zLCBzY2hlbWFQYXRoIH0gPSBlO1xyXG4gICAgbGV0IHByb3BlcnR5ID0gYCR7ZGF0YVBhdGh9YDtcclxuXHJcbiAgICAvLyBwdXQgZGF0YSBpbiBleHBlY3RlZCBmb3JtYXRcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IGtleXdvcmQsXHJcbiAgICAgIHByb3BlcnR5LFxyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICBwYXJhbXMsIC8vIHNwZWNpZmljIHRvIGFqdlxyXG4gICAgICBzdGFjazogYCR7cHJvcGVydHl9ICR7bWVzc2FnZX1gLnRyaW0oKSxcclxuICAgICAgc2NoZW1hUGF0aCxcclxuICAgIH07XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIHByb2Nlc3NlcyB0aGUgZm9ybURhdGEgd2l0aCBhIHVzZXIgYHZhbGlkYXRlYCBjb250cmlidXRlZFxyXG4gKiBmdW5jdGlvbiwgd2hpY2ggcmVjZWl2ZXMgdGhlIGZvcm0gZGF0YSBhbmQgYW4gYGVycm9ySGFuZGxlcmAgb2JqZWN0IHRoYXRcclxuICogd2lsbCBiZSB1c2VkIHRvIGFkZCBjdXN0b20gdmFsaWRhdGlvbiBlcnJvcnMgZm9yIGVhY2ggZmllbGQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1EYXRhKFxyXG4gIGZvcm1EYXRhLFxyXG4gIHNjaGVtYSxcclxuICBjdXN0b21WYWxpZGF0ZSxcclxuICB0cmFuc2Zvcm1FcnJvcnMsXHJcbiAgYWRkaXRpb25hbE1ldGFTY2hlbWFzID0gW10sXHJcbiAgY3VzdG9tRm9ybWF0cyA9IHt9LFxyXG4gIGxvY2FsaXplRXJyb3JzID0gbnVsbFxyXG4pIHtcclxuICAvLyBJbmNsdWRlIGZvcm0gZGF0YSB3aXRoIHVuZGVmaW5lZCB2YWx1ZXMsIHdoaWNoIGlzIHJlcXVpcmVkIGZvciB2YWxpZGF0aW9uLlxyXG4gIGNvbnN0IHJvb3RTY2hlbWEgPSBzY2hlbWE7XHJcbiAgZm9ybURhdGEgPSBnZXREZWZhdWx0Rm9ybVN0YXRlKHNjaGVtYSwgZm9ybURhdGEsIHJvb3RTY2hlbWEsIHRydWUpO1xyXG5cclxuICBjb25zdCBuZXdNZXRhU2NoZW1hcyA9ICFkZWVwRXF1YWxzKGZvcm1lck1ldGFTY2hlbWEsIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyk7XHJcbiAgY29uc3QgbmV3Rm9ybWF0cyA9ICFkZWVwRXF1YWxzKGZvcm1lckN1c3RvbUZvcm1hdHMsIGN1c3RvbUZvcm1hdHMpO1xyXG5cclxuICBpZiAobmV3TWV0YVNjaGVtYXMgfHwgbmV3Rm9ybWF0cykge1xyXG4gICAgYWp2ID0gY3JlYXRlQWp2SW5zdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIC8vIGFkZCBtb3JlIHNjaGVtYXMgdG8gdmFsaWRhdGUgYWdhaW5zdFxyXG4gIGlmIChcclxuICAgIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyAmJlxyXG4gICAgbmV3TWV0YVNjaGVtYXMgJiZcclxuICAgIEFycmF5LmlzQXJyYXkoYWRkaXRpb25hbE1ldGFTY2hlbWFzKVxyXG4gICkge1xyXG4gICAgYWp2LmFkZE1ldGFTY2hlbWEoYWRkaXRpb25hbE1ldGFTY2hlbWFzKTtcclxuICAgIGZvcm1lck1ldGFTY2hlbWEgPSBhZGRpdGlvbmFsTWV0YVNjaGVtYXM7XHJcbiAgfVxyXG5cclxuICAvLyBhZGQgbW9yZSBjdXN0b20gZm9ybWF0cyB0byB2YWxpZGF0ZSBhZ2FpbnN0XHJcbiAgaWYgKGN1c3RvbUZvcm1hdHMgJiYgbmV3Rm9ybWF0cyAmJiBpc09iamVjdChjdXN0b21Gb3JtYXRzKSkge1xyXG4gICAgT2JqZWN0LmtleXMoY3VzdG9tRm9ybWF0cykuZm9yRWFjaChmb3JtYXROYW1lID0+IHtcclxuICAgICAgYWp2LmFkZEZvcm1hdChmb3JtYXROYW1lLCBjdXN0b21Gb3JtYXRzW2Zvcm1hdE5hbWVdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvcm1lckN1c3RvbUZvcm1hdHMgPSBjdXN0b21Gb3JtYXRzO1xyXG4gIH1cclxuXHJcbiAgbGV0IHZhbGlkYXRpb25FcnJvciA9IG51bGw7XHJcbiAgdHJ5IHtcclxuICAgIGFqdi52YWxpZGF0ZShzY2hlbWEsIGZvcm1EYXRhKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHZhbGlkYXRpb25FcnJvciA9IGVycjtcclxuICB9XHJcblxyXG4gIGxvY2FsaXplRXJyb3JzICYmXHJcbiAgICB0eXBlb2YgbG9jYWxpemVFcnJvcnMgPT0gXCJmdW5jdGlvblwiICYmXHJcbiAgICBsb2NhbGl6ZUVycm9ycyhhanYuZXJyb3JzKTtcclxuXHJcbiAgbGV0IGVycm9ycyA9IHRyYW5zZm9ybUFqdkVycm9ycyhhanYuZXJyb3JzKTtcclxuICAvLyBDbGVhciBlcnJvcnMgdG8gcHJldmVudCBwZXJzaXN0ZW50IGVycm9ycywgc2VlICMxMTA0XHJcblxyXG4gIGFqdi5lcnJvcnMgPSBudWxsO1xyXG5cclxuICBjb25zdCBub1Byb3Blck1ldGFTY2hlbWEgPVxyXG4gICAgdmFsaWRhdGlvbkVycm9yICYmXHJcbiAgICB2YWxpZGF0aW9uRXJyb3IubWVzc2FnZSAmJlxyXG4gICAgdHlwZW9mIHZhbGlkYXRpb25FcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiICYmXHJcbiAgICB2YWxpZGF0aW9uRXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIm5vIHNjaGVtYSB3aXRoIGtleSBvciByZWYgXCIpO1xyXG5cclxuICBpZiAobm9Qcm9wZXJNZXRhU2NoZW1hKSB7XHJcbiAgICBlcnJvcnMgPSBbXHJcbiAgICAgIC4uLmVycm9ycyxcclxuICAgICAge1xyXG4gICAgICAgIHN0YWNrOiB2YWxpZGF0aW9uRXJyb3IubWVzc2FnZSxcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgdHJhbnNmb3JtRXJyb3JzID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGVycm9ycyA9IHRyYW5zZm9ybUVycm9ycyhlcnJvcnMpO1xyXG4gIH1cclxuXHJcbiAgbGV0IGVycm9yU2NoZW1hID0gdG9FcnJvclNjaGVtYShlcnJvcnMpO1xyXG5cclxuICBpZiAobm9Qcm9wZXJNZXRhU2NoZW1hKSB7XHJcbiAgICBlcnJvclNjaGVtYSA9IHtcclxuICAgICAgLi4uZXJyb3JTY2hlbWEsXHJcbiAgICAgIC4uLntcclxuICAgICAgICAkc2NoZW1hOiB7XHJcbiAgICAgICAgICBfX2Vycm9yczogW3ZhbGlkYXRpb25FcnJvci5tZXNzYWdlXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgY3VzdG9tVmFsaWRhdGUgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmV0dXJuIHsgZXJyb3JzLCBlcnJvclNjaGVtYSB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZXJyb3JIYW5kbGVyID0gY3VzdG9tVmFsaWRhdGUoZm9ybURhdGEsIGNyZWF0ZUVycm9ySGFuZGxlcihmb3JtRGF0YSkpO1xyXG4gIGNvbnN0IHVzZXJFcnJvclNjaGVtYSA9IHVud3JhcEVycm9ySGFuZGxlcihlcnJvckhhbmRsZXIpO1xyXG4gIGNvbnN0IG5ld0Vycm9yU2NoZW1hID0gbWVyZ2VPYmplY3RzKGVycm9yU2NoZW1hLCB1c2VyRXJyb3JTY2hlbWEsIHRydWUpO1xyXG4gIC8vIFhYWDogVGhlIGVycm9ycyBsaXN0IHByb2R1Y2VkIGlzIG5vdCBmdWxseSBjb21wbGlhbnQgd2l0aCB0aGUgZm9ybWF0XHJcbiAgLy8gZXhwb3NlZCBieSB0aGUganNvbnNjaGVtYSBsaWIsIHdoaWNoIGNvbnRhaW5zIGZ1bGwgZmllbGQgcGF0aHMgYW5kIG90aGVyXHJcbiAgLy8gcHJvcGVydGllcy5cclxuICBjb25zdCBuZXdFcnJvcnMgPSB0b0Vycm9yTGlzdChuZXdFcnJvclNjaGVtYSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBlcnJvcnM6IG5ld0Vycm9ycyxcclxuICAgIGVycm9yU2NoZW1hOiBuZXdFcnJvclNjaGVtYSxcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogUmVjdXJzaXZlbHkgcHJlZml4ZXMgYWxsICRyZWYncyBpbiBhIHNjaGVtYSB3aXRoIGBST09UX1NDSEVNQV9QUkVGSVhgXHJcbiAqIFRoaXMgaXMgdXNlZCBpbiBpc1ZhbGlkIHRvIG1ha2UgcmVmZXJlbmNlcyB0byB0aGUgcm9vdFNjaGVtYVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhJZFJlZlByZWZpeChzY2hlbWFOb2RlKSB7XHJcbiAgbGV0IG9iaiA9IHNjaGVtYU5vZGU7XHJcbiAgaWYgKHNjaGVtYU5vZGUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG4gICAgb2JqID0geyAuLi5zY2hlbWFOb2RlIH07XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBvYmpba2V5XTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGtleSA9PT0gXCIkcmVmXCIgJiZcclxuICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiZcclxuICAgICAgICB2YWx1ZS5zdGFydHNXaXRoKFwiI1wiKVxyXG4gICAgICApIHtcclxuICAgICAgICBvYmpba2V5XSA9IFJPT1RfU0NIRU1BX1BSRUZJWCArIHZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9ialtrZXldID0gd2l0aElkUmVmUHJlZml4KHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWFOb2RlKSkge1xyXG4gICAgb2JqID0gWy4uLnNjaGVtYU5vZGVdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcclxuICAgICAgb2JqW2ldID0gd2l0aElkUmVmUHJlZml4KG9ialtpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBWYWxpZGF0ZXMgZGF0YSBhZ2FpbnN0IGEgc2NoZW1hLCByZXR1cm5pbmcgdHJ1ZSBpZiB0aGUgZGF0YSBpcyB2YWxpZCwgb3JcclxuICogZmFsc2Ugb3RoZXJ3aXNlLiBJZiB0aGUgc2NoZW1hIGlzIGludmFsaWQsIHRoZW4gdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVyblxyXG4gKiBmYWxzZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkKHNjaGVtYSwgZGF0YSwgcm9vdFNjaGVtYSkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBhZGQgdGhlIHJvb3RTY2hlbWEgUk9PVF9TQ0hFTUFfUFJFRklYIGFzIGlkLlxyXG4gICAgLy8gdGhlbiByZXdyaXRlIHRoZSBzY2hlbWEgcmVmJ3MgdG8gcG9pbnQgdG8gdGhlIHJvb3RTY2hlbWFcclxuICAgIC8vIHRoaXMgYWNjb3VudHMgZm9yIHRoZSBjYXNlIHdoZXJlIHNjaGVtYSBoYXZlIHJlZmVyZW5jZXMgdG8gbW9kZWxzXHJcbiAgICAvLyB0aGF0IGxpdmVzIGluIHRoZSByb290U2NoZW1hIGJ1dCBub3QgaW4gdGhlIHNjaGVtYSBpbiBxdWVzdGlvbi5cclxuICAgIHJldHVybiBhanZcclxuICAgICAgLmFkZFNjaGVtYShyb290U2NoZW1hLCBST09UX1NDSEVNQV9QUkVGSVgpXHJcbiAgICAgIC52YWxpZGF0ZSh3aXRoSWRSZWZQcmVmaXgoc2NoZW1hKSwgZGF0YSk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICAvLyBtYWtlIHN1cmUgd2UgcmVtb3ZlIHRoZSByb290U2NoZW1hIGZyb20gdGhlIGdsb2JhbCBhanYgaW5zdGFuY2VcclxuICAgIGFqdi5yZW1vdmVTY2hlbWEoUk9PVF9TQ0hFTUFfUFJFRklYKTtcclxuICB9XHJcbn1cclxuIl19