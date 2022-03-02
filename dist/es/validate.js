function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

    var _iterator = _createForOfIteratorHelper(path.slice(0)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var segment = _step.value;

        if (!(segment in parent)) {
          parent[segment] = {};
        }

        parent = parent[segment];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, createErrorHandler(formData[key])));
    }, handler);
  }

  if (Array.isArray(formData)) {
    return formData.reduce(function (acc, value, key) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, createErrorHandler(value)));
    }, handler);
  }

  return handler;
}

function unwrapErrorHandler(errorHandler) {
  return Object.keys(errorHandler).reduce(function (acc, key) {
    if (key === "addError") {
      return acc;
    } else if (key === "__errors") {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, errorHandler[key]));
    }

    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, unwrapErrorHandler(errorHandler[key])));
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
    errorSchema = _objectSpread(_objectSpread({}, errorSchema), {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWxpZGF0ZS5qcyJdLCJuYW1lcyI6WyJ0b1BhdGgiLCJBanYiLCJhanYiLCJjcmVhdGVBanZJbnN0YW5jZSIsImRlZXBFcXVhbHMiLCJnZXREZWZhdWx0Rm9ybVN0YXRlIiwiZm9ybWVyQ3VzdG9tRm9ybWF0cyIsImZvcm1lck1ldGFTY2hlbWEiLCJST09UX1NDSEVNQV9QUkVGSVgiLCJpc09iamVjdCIsIm1lcmdlT2JqZWN0cyIsImVycm9yRGF0YVBhdGgiLCJhbGxFcnJvcnMiLCJtdWx0aXBsZU9mUHJlY2lzaW9uIiwic2NoZW1hSWQiLCJ1bmtub3duRm9ybWF0cyIsImFkZEZvcm1hdCIsInRvRXJyb3JTY2hlbWEiLCJlcnJvcnMiLCJsZW5ndGgiLCJyZWR1Y2UiLCJlcnJvclNjaGVtYSIsImVycm9yIiwicHJvcGVydHkiLCJtZXNzYWdlIiwicGF0aCIsInBhcmVudCIsInNwbGljZSIsInNsaWNlIiwic2VnbWVudCIsIkFycmF5IiwiaXNBcnJheSIsIl9fZXJyb3JzIiwiY29uY2F0IiwidG9FcnJvckxpc3QiLCJmaWVsZE5hbWUiLCJlcnJvckxpc3QiLCJtYXAiLCJzdGFjayIsIk9iamVjdCIsImtleXMiLCJhY2MiLCJrZXkiLCJjcmVhdGVFcnJvckhhbmRsZXIiLCJmb3JtRGF0YSIsImhhbmRsZXIiLCJhZGRFcnJvciIsInB1c2giLCJ2YWx1ZSIsInVud3JhcEVycm9ySGFuZGxlciIsImVycm9ySGFuZGxlciIsInRyYW5zZm9ybUFqdkVycm9ycyIsImUiLCJkYXRhUGF0aCIsImtleXdvcmQiLCJwYXJhbXMiLCJzY2hlbWFQYXRoIiwibmFtZSIsInRyaW0iLCJ2YWxpZGF0ZUZvcm1EYXRhIiwic2NoZW1hIiwiY3VzdG9tVmFsaWRhdGUiLCJ0cmFuc2Zvcm1FcnJvcnMiLCJhZGRpdGlvbmFsTWV0YVNjaGVtYXMiLCJjdXN0b21Gb3JtYXRzIiwibG9jYWxpemVFcnJvcnMiLCJyb290U2NoZW1hIiwibmV3TWV0YVNjaGVtYXMiLCJuZXdGb3JtYXRzIiwiYWRkTWV0YVNjaGVtYSIsImZvckVhY2giLCJmb3JtYXROYW1lIiwidmFsaWRhdGlvbkVycm9yIiwidmFsaWRhdGUiLCJlcnIiLCJub1Byb3Blck1ldGFTY2hlbWEiLCJpbmNsdWRlcyIsIiRzY2hlbWEiLCJ1c2VyRXJyb3JTY2hlbWEiLCJuZXdFcnJvclNjaGVtYSIsIm5ld0Vycm9ycyIsIndpdGhJZFJlZlByZWZpeCIsInNjaGVtYU5vZGUiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInN0YXJ0c1dpdGgiLCJpIiwiaXNWYWxpZCIsImRhdGEiLCJhZGRTY2hlbWEiLCJyZW1vdmVTY2hlbWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsTUFBUCxNQUFtQixlQUFuQjtBQUNBLE9BQU9DLEdBQVAsTUFBZ0IsS0FBaEI7QUFDQSxJQUFJQyxHQUFHLEdBQUdDLGlCQUFpQixFQUEzQjtBQUNBLFNBQVNDLFVBQVQsRUFBcUJDLG1CQUFyQixRQUFnRCxTQUFoRDtBQUVBLElBQUlDLG1CQUFtQixHQUFHLElBQTFCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsSUFBdkI7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxtQkFBM0I7QUFFQSxTQUFTQyxRQUFULEVBQW1CQyxZQUFuQixRQUF1QyxTQUF2Qzs7QUFFQSxTQUFTUCxpQkFBVCxHQUE2QjtBQUMzQixNQUFNRCxHQUFHLEdBQUcsSUFBSUQsR0FBSixDQUFRO0FBQ2xCVSxJQUFBQSxhQUFhLEVBQUUsVUFERztBQUVsQkMsSUFBQUEsU0FBUyxFQUFFLElBRk87QUFHbEJDLElBQUFBLG1CQUFtQixFQUFFLENBSEg7QUFJbEJDLElBQUFBLFFBQVEsRUFBRSxNQUpRO0FBS2xCQyxJQUFBQSxjQUFjLEVBQUU7QUFMRSxHQUFSLENBQVosQ0FEMkIsQ0FTM0I7O0FBQ0FiLEVBQUFBLEdBQUcsQ0FBQ2MsU0FBSixDQUNFLFVBREYsRUFFRSwyREFGRjtBQUlBZCxFQUFBQSxHQUFHLENBQUNjLFNBQUosQ0FDRSxPQURGLEVBRUUsNFlB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LENBQUN6QyxHQUFELENBQUgsR0FBV3VDLGVBQWUsQ0FBQ2pDLEtBQUQsQ0FBMUI7QUFDRDtBQUNGO0FBQ0YsR0FkRCxNQWNPLElBQUlsQixLQUFLLENBQUNDLE9BQU4sQ0FBY21ELFVBQWQsQ0FBSixFQUErQjtBQUNwQ0MsSUFBQUEsR0FBRyxzQkFBT0QsVUFBUCxDQUFIOztBQUNBLFNBQUssSUFBSUksQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsR0FBRyxDQUFDaEUsTUFBeEIsRUFBZ0NtRSxDQUFDLEVBQWpDLEVBQXFDO0FBQ25DSCxNQUFBQSxHQUFHLENBQUNHLENBQUQsQ0FBSCxHQUFTTCxlQUFlLENBQUNFLEdBQUcsQ0FBQ0csQ0FBRCxDQUFKLENBQXhCO0FBQ0Q7QUFDRjs7QUFDRCxTQUFPSCxHQUFQO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLE9BQU8sU0FBU0ksT0FBVCxDQUFpQjNCLE1BQWpCLEVBQXlCNEIsSUFBekIsRUFBK0J0QixVQUEvQixFQUEyQztBQUNoRCxNQUFJO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFPaEUsR0FBRyxDQUNQdUYsU0FESSxDQUNNdkIsVUFETixFQUNrQjFELGtCQURsQixFQUVKaUUsUUFGSSxDQUVLUSxlQUFlLENBQUNyQixNQUFELENBRnBCLEVBRThCNEIsSUFGOUIsQ0FBUDtBQUdELEdBUkQsQ0FRRSxPQUFPcEMsQ0FBUCxFQUFVO0FBQ1YsV0FBTyxLQUFQO0FBQ0QsR0FWRCxTQVVVO0FBQ1I7QUFDQWxELElBQUFBLEdBQUcsQ0FBQ3dGLFlBQUosQ0FBaUJsRixrQkFBakI7QUFDRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRvUGF0aCBmcm9tIFwibG9kYXNoL3RvUGF0aFwiO1xyXG5pbXBvcnQgQWp2IGZyb20gXCJhanZcIjtcclxubGV0IGFqdiA9IGNyZWF0ZUFqdkluc3RhbmNlKCk7XHJcbmltcG9ydCB7IGRlZXBFcXVhbHMsIGdldERlZmF1bHRGb3JtU3RhdGUgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxubGV0IGZvcm1lckN1c3RvbUZvcm1hdHMgPSBudWxsO1xyXG5sZXQgZm9ybWVyTWV0YVNjaGVtYSA9IG51bGw7XHJcbmNvbnN0IFJPT1RfU0NIRU1BX1BSRUZJWCA9IFwiX19yanNmX3Jvb3RTY2hlbWFcIjtcclxuXHJcbmltcG9ydCB7IGlzT2JqZWN0LCBtZXJnZU9iamVjdHMgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQWp2SW5zdGFuY2UoKSB7XHJcbiAgY29uc3QgYWp2ID0gbmV3IEFqdih7XHJcbiAgICBlcnJvckRhdGFQYXRoOiBcInByb3BlcnR5XCIsXHJcbiAgICBhbGxFcnJvcnM6IHRydWUsXHJcbiAgICBtdWx0aXBsZU9mUHJlY2lzaW9uOiA4LFxyXG4gICAgc2NoZW1hSWQ6IFwiYXV0b1wiLFxyXG4gICAgdW5rbm93bkZvcm1hdHM6IFwiaWdub3JlXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIGFkZCBjdXN0b20gZm9ybWF0c1xyXG4gIGFqdi5hZGRGb3JtYXQoXHJcbiAgICBcImRhdGEtdXJsXCIsXHJcbiAgICAvXmRhdGE6KFthLXpdK1xcL1thLXowLTktKy5dKyk/Oyg/Om5hbWU9KC4qKTspP2Jhc2U2NCwoLiopJC9cclxuICApO1xyXG4gIGFqdi5hZGRGb3JtYXQoXHJcbiAgICBcImNvbG9yXCIsXHJcbiAgICAvXigjPyhbMC05QS1GYS1mXXszfSl7MSwyfVxcYnxhcXVhfGJsYWNrfGJsdWV8ZnVjaHNpYXxncmF5fGdyZWVufGxpbWV8bWFyb29ufG5hdnl8b2xpdmV8b3JhbmdlfHB1cnBsZXxyZWR8c2lsdmVyfHRlYWx8d2hpdGV8eWVsbG93fChyZ2JcXChcXHMqXFxiKFswLTldfFsxLTldWzAtOV18MVswLTldWzAtOV18MlswLTRdWzAtOV18MjVbMC01XSlcXGJcXHMqLFxccypcXGIoWzAtOV18WzEtOV1bMC05XXwxWzAtOV1bMC05XXwyWzAtNF1bMC05XXwyNVswLTVdKVxcYlxccyosXFxzKlxcYihbMC05XXxbMS05XVswLTldfDFbMC05XVswLTldfDJbMC00XVswLTldfDI1WzAtNV0pXFxiXFxzKlxcKSl8KHJnYlxcKFxccyooXFxkP1xcZCV8MTAwJSkrXFxzKixcXHMqKFxcZD9cXGQlfDEwMCUpK1xccyosXFxzKihcXGQ/XFxkJXwxMDAlKStcXHMqXFwpKSkkL1xyXG4gICk7XHJcbiAgcmV0dXJuIGFqdjtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9FcnJvclNjaGVtYShlcnJvcnMpIHtcclxuICAvLyBUcmFuc2Zvcm1zIGEgYWp2IHZhbGlkYXRpb24gZXJyb3JzIGxpc3Q6XHJcbiAgLy8gW1xyXG4gIC8vICAge3Byb3BlcnR5OiBcIi5sZXZlbDEubGV2ZWwyWzJdLmxldmVsM1wiLCBtZXNzYWdlOiBcImVyciBhXCJ9LFxyXG4gIC8vICAge3Byb3BlcnR5OiBcIi5sZXZlbDEubGV2ZWwyWzJdLmxldmVsM1wiLCBtZXNzYWdlOiBcImVyciBiXCJ9LFxyXG4gIC8vICAge3Byb3BlcnR5OiBcIi5sZXZlbDEubGV2ZWwyWzRdLmxldmVsM1wiLCBtZXNzYWdlOiBcImVyciBiXCJ9LFxyXG4gIC8vIF1cclxuICAvLyBJbnRvIGFuIGVycm9yIHRyZWU6XHJcbiAgLy8ge1xyXG4gIC8vICAgbGV2ZWwxOiB7XHJcbiAgLy8gICAgIGxldmVsMjoge1xyXG4gIC8vICAgICAgIDI6IHtsZXZlbDM6IHtlcnJvcnM6IFtcImVyciBhXCIsIFwiZXJyIGJcIl19fSxcclxuICAvLyAgICAgICA0OiB7bGV2ZWwzOiB7ZXJyb3JzOiBbXCJlcnIgYlwiXX19LFxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gfTtcclxuICBpZiAoIWVycm9ycy5sZW5ndGgpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcbiAgcmV0dXJuIGVycm9ycy5yZWR1Y2UoKGVycm9yU2NoZW1hLCBlcnJvcikgPT4ge1xyXG4gICAgY29uc3QgeyBwcm9wZXJ0eSwgbWVzc2FnZSB9ID0gZXJyb3I7XHJcbiAgICBjb25zdCBwYXRoID0gdG9QYXRoKHByb3BlcnR5KTtcclxuICAgIGxldCBwYXJlbnQgPSBlcnJvclNjaGVtYTtcclxuXHJcbiAgICAvLyBJZiB0aGUgcHJvcGVydHkgaXMgYXQgdGhlIHJvb3QgKC5sZXZlbDEpIHRoZW4gdG9QYXRoIGNyZWF0ZXNcclxuICAgIC8vIGFuIGVtcHR5IGFycmF5IGVsZW1lbnQgYXQgdGhlIGZpcnN0IGluZGV4LiBSZW1vdmUgaXQuXHJcbiAgICBpZiAocGF0aC5sZW5ndGggPiAwICYmIHBhdGhbMF0gPT09IFwiXCIpIHtcclxuICAgICAgcGF0aC5zcGxpY2UoMCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHBhdGguc2xpY2UoMCkpIHtcclxuICAgICAgaWYgKCEoc2VnbWVudCBpbiBwYXJlbnQpKSB7XHJcbiAgICAgICAgcGFyZW50W3NlZ21lbnRdID0ge307XHJcbiAgICAgIH1cclxuICAgICAgcGFyZW50ID0gcGFyZW50W3NlZ21lbnRdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudC5fX2Vycm9ycykpIHtcclxuICAgICAgLy8gV2Ugc3RvcmUgdGhlIGxpc3Qgb2YgZXJyb3JzIGZvciB0aGlzIG5vZGUgaW4gYSBwcm9wZXJ0eSBuYW1lZCBfX2Vycm9yc1xyXG4gICAgICAvLyB0byBhdm9pZCBuYW1lIGNvbGxpc2lvbiB3aXRoIGEgcG9zc2libGUgc3ViIHNjaGVtYSBmaWVsZCBuYW1lZFxyXG4gICAgICAvLyBcImVycm9yc1wiIChzZWUgYHZhbGlkYXRlLmNyZWF0ZUVycm9ySGFuZGxlcmApLlxyXG4gICAgICBwYXJlbnQuX19lcnJvcnMgPSBwYXJlbnQuX19lcnJvcnMuY29uY2F0KG1lc3NhZ2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKG1lc3NhZ2UpIHtcclxuICAgICAgICBwYXJlbnQuX19lcnJvcnMgPSBbbWVzc2FnZV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvclNjaGVtYTtcclxuICB9LCB7fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSwgZmllbGROYW1lID0gXCJyb290XCIpIHtcclxuICAvLyBYWFg6IFdlIHNob3VsZCB0cmFuc2Zvcm0gZmllbGROYW1lIGFzIGEgZnVsbCBmaWVsZCBwYXRoIHN0cmluZy5cclxuICBsZXQgZXJyb3JMaXN0ID0gW107XHJcbiAgaWYgKFwiX19lcnJvcnNcIiBpbiBlcnJvclNjaGVtYSkge1xyXG4gICAgZXJyb3JMaXN0ID0gZXJyb3JMaXN0LmNvbmNhdChcclxuICAgICAgZXJyb3JTY2hlbWEuX19lcnJvcnMubWFwKHN0YWNrID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgc3RhY2s6IGAke2ZpZWxkTmFtZX06ICR7c3RhY2t9YCxcclxuICAgICAgICB9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGVycm9yU2NoZW1hKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcbiAgICBpZiAoa2V5ICE9PSBcIl9fZXJyb3JzXCIpIHtcclxuICAgICAgYWNjID0gYWNjLmNvbmNhdCh0b0Vycm9yTGlzdChlcnJvclNjaGVtYVtrZXldLCBrZXkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwgZXJyb3JMaXN0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRXJyb3JIYW5kbGVyKGZvcm1EYXRhKSB7XHJcbiAgY29uc3QgaGFuZGxlciA9IHtcclxuICAgIC8vIFdlIHN0b3JlIHRoZSBsaXN0IG9mIGVycm9ycyBmb3IgdGhpcyBub2RlIGluIGEgcHJvcGVydHkgbmFtZWQgX19lcnJvcnNcclxuICAgIC8vIHRvIGF2b2lkIG5hbWUgY29sbGlzaW9uIHdpdGggYSBwb3NzaWJsZSBzdWIgc2NoZW1hIGZpZWxkIG5hbWVkXHJcbiAgICAvLyBcImVycm9yc1wiIChzZWUgYHV0aWxzLnRvRXJyb3JTY2hlbWFgKS5cclxuICAgIF9fZXJyb3JzOiBbXSxcclxuICAgIGFkZEVycm9yKG1lc3NhZ2UpIHtcclxuICAgICAgdGhpcy5fX2Vycm9ycy5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgfSxcclxuICB9O1xyXG4gIGlmIChpc09iamVjdChmb3JtRGF0YSkpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3JtRGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICByZXR1cm4geyAuLi5hY2MsIFtrZXldOiBjcmVhdGVFcnJvckhhbmRsZXIoZm9ybURhdGFba2V5XSkgfTtcclxuICAgIH0sIGhhbmRsZXIpO1xyXG4gIH1cclxuICBpZiAoQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcclxuICAgIHJldHVybiBmb3JtRGF0YS5yZWR1Y2UoKGFjYywgdmFsdWUsIGtleSkgPT4ge1xyXG4gICAgICByZXR1cm4geyAuLi5hY2MsIFtrZXldOiBjcmVhdGVFcnJvckhhbmRsZXIodmFsdWUpIH07XHJcbiAgICB9LCBoYW5kbGVyKTtcclxuICB9XHJcbiAgcmV0dXJuIGhhbmRsZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVud3JhcEVycm9ySGFuZGxlcihlcnJvckhhbmRsZXIpIHtcclxuICByZXR1cm4gT2JqZWN0LmtleXMoZXJyb3JIYW5kbGVyKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcbiAgICBpZiAoa2V5ID09PSBcImFkZEVycm9yXCIpIHtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fZXJyb3JzXCIpIHtcclxuICAgICAgcmV0dXJuIHsgLi4uYWNjLCBba2V5XTogZXJyb3JIYW5kbGVyW2tleV0gfTtcclxuICAgIH1cclxuICAgIHJldHVybiB7IC4uLmFjYywgW2tleV06IHVud3JhcEVycm9ySGFuZGxlcihlcnJvckhhbmRsZXJba2V5XSkgfTtcclxuICB9LCB7fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmFuc2Zvcm1pbmcgdGhlIGVycm9yIG91dHB1dCBmcm9tIGFqdiB0byBmb3JtYXQgdXNlZCBieSBqc29uc2NoZW1hLlxyXG4gKiBBdCBzb21lIHBvaW50LCBjb21wb25lbnRzIHNob3VsZCBiZSB1cGRhdGVkIHRvIHN1cHBvcnQgYWp2LlxyXG4gKi9cclxuZnVuY3Rpb24gdHJhbnNmb3JtQWp2RXJyb3JzKGVycm9ycyA9IFtdKSB7XHJcbiAgaWYgKGVycm9ycyA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVycm9ycy5tYXAoZSA9PiB7XHJcbiAgICBjb25zdCB7IGRhdGFQYXRoLCBrZXl3b3JkLCBtZXNzYWdlLCBwYXJhbXMsIHNjaGVtYVBhdGggfSA9IGU7XHJcbiAgICBsZXQgcHJvcGVydHkgPSBgJHtkYXRhUGF0aH1gO1xyXG5cclxuICAgIC8vIHB1dCBkYXRhIGluIGV4cGVjdGVkIGZvcm1hdFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZToga2V5d29yZCxcclxuICAgICAgcHJvcGVydHksXHJcbiAgICAgIG1lc3NhZ2UsXHJcbiAgICAgIHBhcmFtcywgLy8gc3BlY2lmaWMgdG8gYWp2XHJcbiAgICAgIHN0YWNrOiBgJHtwcm9wZXJ0eX0gJHttZXNzYWdlfWAudHJpbSgpLFxyXG4gICAgICBzY2hlbWFQYXRoLFxyXG4gICAgfTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gcHJvY2Vzc2VzIHRoZSBmb3JtRGF0YSB3aXRoIGEgdXNlciBgdmFsaWRhdGVgIGNvbnRyaWJ1dGVkXHJcbiAqIGZ1bmN0aW9uLCB3aGljaCByZWNlaXZlcyB0aGUgZm9ybSBkYXRhIGFuZCBhbiBgZXJyb3JIYW5kbGVyYCBvYmplY3QgdGhhdFxyXG4gKiB3aWxsIGJlIHVzZWQgdG8gYWRkIGN1c3RvbSB2YWxpZGF0aW9uIGVycm9ycyBmb3IgZWFjaCBmaWVsZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybURhdGEoXHJcbiAgZm9ybURhdGEsXHJcbiAgc2NoZW1hLFxyXG4gIGN1c3RvbVZhbGlkYXRlLFxyXG4gIHRyYW5zZm9ybUVycm9ycyxcclxuICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMgPSBbXSxcclxuICBjdXN0b21Gb3JtYXRzID0ge30sXHJcbiAgbG9jYWxpemVFcnJvcnMgPSBudWxsXHJcbikge1xyXG4gIC8vIEluY2x1ZGUgZm9ybSBkYXRhIHdpdGggdW5kZWZpbmVkIHZhbHVlcywgd2hpY2ggaXMgcmVxdWlyZWQgZm9yIHZhbGlkYXRpb24uXHJcbiAgY29uc3Qgcm9vdFNjaGVtYSA9IHNjaGVtYTtcclxuICBmb3JtRGF0YSA9IGdldERlZmF1bHRGb3JtU3RhdGUoc2NoZW1hLCBmb3JtRGF0YSwgcm9vdFNjaGVtYSwgdHJ1ZSk7XHJcblxyXG4gIGNvbnN0IG5ld01ldGFTY2hlbWFzID0gIWRlZXBFcXVhbHMoZm9ybWVyTWV0YVNjaGVtYSwgYWRkaXRpb25hbE1ldGFTY2hlbWFzKTtcclxuICBjb25zdCBuZXdGb3JtYXRzID0gIWRlZXBFcXVhbHMoZm9ybWVyQ3VzdG9tRm9ybWF0cywgY3VzdG9tRm9ybWF0cyk7XHJcblxyXG4gIGlmIChuZXdNZXRhU2NoZW1hcyB8fCBuZXdGb3JtYXRzKSB7XHJcbiAgICBhanYgPSBjcmVhdGVBanZJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gYWRkIG1vcmUgc2NoZW1hcyB0byB2YWxpZGF0ZSBhZ2FpbnN0XHJcbiAgaWYgKFxyXG4gICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzICYmXHJcbiAgICBuZXdNZXRhU2NoZW1hcyAmJlxyXG4gICAgQXJyYXkuaXNBcnJheShhZGRpdGlvbmFsTWV0YVNjaGVtYXMpXHJcbiAgKSB7XHJcbiAgICBhanYuYWRkTWV0YVNjaGVtYShhZGRpdGlvbmFsTWV0YVNjaGVtYXMpO1xyXG4gICAgZm9ybWVyTWV0YVNjaGVtYSA9IGFkZGl0aW9uYWxNZXRhU2NoZW1hcztcclxuICB9XHJcblxyXG4gIC8vIGFkZCBtb3JlIGN1c3RvbSBmb3JtYXRzIHRvIHZhbGlkYXRlIGFnYWluc3RcclxuICBpZiAoY3VzdG9tRm9ybWF0cyAmJiBuZXdGb3JtYXRzICYmIGlzT2JqZWN0KGN1c3RvbUZvcm1hdHMpKSB7XHJcbiAgICBPYmplY3Qua2V5cyhjdXN0b21Gb3JtYXRzKS5mb3JFYWNoKGZvcm1hdE5hbWUgPT4ge1xyXG4gICAgICBhanYuYWRkRm9ybWF0KGZvcm1hdE5hbWUsIGN1c3RvbUZvcm1hdHNbZm9ybWF0TmFtZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9ybWVyQ3VzdG9tRm9ybWF0cyA9IGN1c3RvbUZvcm1hdHM7XHJcbiAgfVxyXG5cclxuICBsZXQgdmFsaWRhdGlvbkVycm9yID0gbnVsbDtcclxuICB0cnkge1xyXG4gICAgYWp2LnZhbGlkYXRlKHNjaGVtYSwgZm9ybURhdGEpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgdmFsaWRhdGlvbkVycm9yID0gZXJyO1xyXG4gIH1cclxuXHJcbiAgbG9jYWxpemVFcnJvcnMgJiZcclxuICAgIHR5cGVvZiBsb2NhbGl6ZUVycm9ycyA9PSBcImZ1bmN0aW9uXCIgJiZcclxuICAgIGxvY2FsaXplRXJyb3JzKGFqdi5lcnJvcnMpO1xyXG5cclxuICBsZXQgZXJyb3JzID0gdHJhbnNmb3JtQWp2RXJyb3JzKGFqdi5lcnJvcnMpO1xyXG4gIC8vIENsZWFyIGVycm9ycyB0byBwcmV2ZW50IHBlcnNpc3RlbnQgZXJyb3JzLCBzZWUgIzExMDRcclxuXHJcbiAgYWp2LmVycm9ycyA9IG51bGw7XHJcblxyXG4gIGNvbnN0IG5vUHJvcGVyTWV0YVNjaGVtYSA9XHJcbiAgICB2YWxpZGF0aW9uRXJyb3IgJiZcclxuICAgIHZhbGlkYXRpb25FcnJvci5tZXNzYWdlICYmXHJcbiAgICB0eXBlb2YgdmFsaWRhdGlvbkVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIgJiZcclxuICAgIHZhbGlkYXRpb25FcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwibm8gc2NoZW1hIHdpdGgga2V5IG9yIHJlZiBcIik7XHJcblxyXG4gIGlmIChub1Byb3Blck1ldGFTY2hlbWEpIHtcclxuICAgIGVycm9ycyA9IFtcclxuICAgICAgLi4uZXJyb3JzLFxyXG4gICAgICB7XHJcbiAgICAgICAgc3RhY2s6IHZhbGlkYXRpb25FcnJvci5tZXNzYWdlLFxyXG4gICAgICB9LFxyXG4gICAgXTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiB0cmFuc2Zvcm1FcnJvcnMgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgZXJyb3JzID0gdHJhbnNmb3JtRXJyb3JzKGVycm9ycyk7XHJcbiAgfVxyXG5cclxuICBsZXQgZXJyb3JTY2hlbWEgPSB0b0Vycm9yU2NoZW1hKGVycm9ycyk7XHJcblxyXG4gIGlmIChub1Byb3Blck1ldGFTY2hlbWEpIHtcclxuICAgIGVycm9yU2NoZW1hID0ge1xyXG4gICAgICAuLi5lcnJvclNjaGVtYSxcclxuICAgICAgLi4ue1xyXG4gICAgICAgICRzY2hlbWE6IHtcclxuICAgICAgICAgIF9fZXJyb3JzOiBbdmFsaWRhdGlvbkVycm9yLm1lc3NhZ2VdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBjdXN0b21WYWxpZGF0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4geyBlcnJvcnMsIGVycm9yU2NoZW1hIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBlcnJvckhhbmRsZXIgPSBjdXN0b21WYWxpZGF0ZShmb3JtRGF0YSwgY3JlYXRlRXJyb3JIYW5kbGVyKGZvcm1EYXRhKSk7XHJcbiAgY29uc3QgdXNlckVycm9yU2NoZW1hID0gdW53cmFwRXJyb3JIYW5kbGVyKGVycm9ySGFuZGxlcik7XHJcbiAgY29uc3QgbmV3RXJyb3JTY2hlbWEgPSBtZXJnZU9iamVjdHMoZXJyb3JTY2hlbWEsIHVzZXJFcnJvclNjaGVtYSwgdHJ1ZSk7XHJcbiAgLy8gWFhYOiBUaGUgZXJyb3JzIGxpc3QgcHJvZHVjZWQgaXMgbm90IGZ1bGx5IGNvbXBsaWFudCB3aXRoIHRoZSBmb3JtYXRcclxuICAvLyBleHBvc2VkIGJ5IHRoZSBqc29uc2NoZW1hIGxpYiwgd2hpY2ggY29udGFpbnMgZnVsbCBmaWVsZCBwYXRocyBhbmQgb3RoZXJcclxuICAvLyBwcm9wZXJ0aWVzLlxyXG4gIGNvbnN0IG5ld0Vycm9ycyA9IHRvRXJyb3JMaXN0KG5ld0Vycm9yU2NoZW1hKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGVycm9yczogbmV3RXJyb3JzLFxyXG4gICAgZXJyb3JTY2hlbWE6IG5ld0Vycm9yU2NoZW1hLFxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWN1cnNpdmVseSBwcmVmaXhlcyBhbGwgJHJlZidzIGluIGEgc2NoZW1hIHdpdGggYFJPT1RfU0NIRU1BX1BSRUZJWGBcclxuICogVGhpcyBpcyB1c2VkIGluIGlzVmFsaWQgdG8gbWFrZSByZWZlcmVuY2VzIHRvIHRoZSByb290U2NoZW1hXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd2l0aElkUmVmUHJlZml4KHNjaGVtYU5vZGUpIHtcclxuICBsZXQgb2JqID0gc2NoZW1hTm9kZTtcclxuICBpZiAoc2NoZW1hTm9kZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XHJcbiAgICBvYmogPSB7IC4uLnNjaGVtYU5vZGUgfTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXldO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAga2V5ID09PSBcIiRyZWZcIiAmJlxyXG4gICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxyXG4gICAgICAgIHZhbHVlLnN0YXJ0c1dpdGgoXCIjXCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIG9ialtrZXldID0gUk9PVF9TQ0hFTUFfUFJFRklYICsgdmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2JqW2tleV0gPSB3aXRoSWRSZWZQcmVmaXgodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYU5vZGUpKSB7XHJcbiAgICBvYmogPSBbLi4uc2NoZW1hTm9kZV07XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICBvYmpbaV0gPSB3aXRoSWRSZWZQcmVmaXgob2JqW2ldKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlcyBkYXRhIGFnYWluc3QgYSBzY2hlbWEsIHJldHVybmluZyB0cnVlIGlmIHRoZSBkYXRhIGlzIHZhbGlkLCBvclxyXG4gKiBmYWxzZSBvdGhlcndpc2UuIElmIHRoZSBzY2hlbWEgaXMgaW52YWxpZCwgdGhlbiB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuXHJcbiAqIGZhbHNlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoc2NoZW1hLCBkYXRhLCByb290U2NoZW1hKSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIGFkZCB0aGUgcm9vdFNjaGVtYSBST09UX1NDSEVNQV9QUkVGSVggYXMgaWQuXHJcbiAgICAvLyB0aGVuIHJld3JpdGUgdGhlIHNjaGVtYSByZWYncyB0byBwb2ludCB0byB0aGUgcm9vdFNjaGVtYVxyXG4gICAgLy8gdGhpcyBhY2NvdW50cyBmb3IgdGhlIGNhc2Ugd2hlcmUgc2NoZW1hIGhhdmUgcmVmZXJlbmNlcyB0byBtb2RlbHNcclxuICAgIC8vIHRoYXQgbGl2ZXMgaW4gdGhlIHJvb3RTY2hlbWEgYnV0IG5vdCBpbiB0aGUgc2NoZW1hIGluIHF1ZXN0aW9uLlxyXG4gICAgcmV0dXJuIGFqdlxyXG4gICAgICAuYWRkU2NoZW1hKHJvb3RTY2hlbWEsIFJPT1RfU0NIRU1BX1BSRUZJWClcclxuICAgICAgLnZhbGlkYXRlKHdpdGhJZFJlZlByZWZpeChzY2hlbWEpLCBkYXRhKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIC8vIG1ha2Ugc3VyZSB3ZSByZW1vdmUgdGhlIHJvb3RTY2hlbWEgZnJvbSB0aGUgZ2xvYmFsIGFqdiBpbnN0YW5jZVxyXG4gICAgYWp2LnJlbW92ZVNjaGVtYShST09UX1NDSEVNQV9QUkVGSVgpO1xyXG4gIH1cclxufVxyXG4iXX0=