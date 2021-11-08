"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toErrorList = toErrorList;
exports["default"] = validateFormData;
exports.withIdRefPrefix = withIdRefPrefix;
exports.isValid = isValid;

var _toPath = _interopRequireDefault(require("lodash/toPath"));

var _ajv = _interopRequireDefault(require("ajv"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ajv = createAjvInstance();
var formerCustomFormats = null;
var formerMetaSchema = null;
var ROOT_SCHEMA_PREFIX = "__rjsf_rootSchema";

function createAjvInstance() {
  var ajv = new _ajv["default"]({
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
    var path = (0, _toPath["default"])(property);
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

function toErrorList(errorSchema) {
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

  if ((0, _utils.isObject)(formData)) {
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


function validateFormData(formData, schema, customValidate, transformErrors) {
  var additionalMetaSchemas = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var customFormats = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var localizeErrors = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  // Include form data with undefined values, which is required for validation.
  var rootSchema = schema;
  formData = (0, _utils.getDefaultFormState)(schema, formData, rootSchema, true);
  var newMetaSchemas = !(0, _utils.deepEquals)(formerMetaSchema, additionalMetaSchemas);
  var newFormats = !(0, _utils.deepEquals)(formerCustomFormats, customFormats);

  if (newMetaSchemas || newFormats) {
    ajv = createAjvInstance();
  } // add more schemas to validate against


  if (additionalMetaSchemas && newMetaSchemas && Array.isArray(additionalMetaSchemas)) {
    ajv.addMetaSchema(additionalMetaSchemas);
    formerMetaSchema = additionalMetaSchemas;
  } // add more custom formats to validate against


  if (customFormats && newFormats && (0, _utils.isObject)(customFormats)) {
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
  var newErrorSchema = (0, _utils.mergeObjects)(errorSchema, userErrorSchema, true); // XXX: The errors list produced is not fully compliant with the format
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


function withIdRefPrefix(schemaNode) {
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


function isValid(schema, data, rootSchema) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWxpZGF0ZS5qcyJdLCJuYW1lcyI6WyJhanYiLCJjcmVhdGVBanZJbnN0YW5jZSIsImZvcm1lckN1c3RvbUZvcm1hdHMiLCJmb3JtZXJNZXRhU2NoZW1hIiwiUk9PVF9TQ0hFTUFfUFJFRklYIiwiQWp2IiwiZXJyb3JEYXRhUGF0aCIsImFsbEVycm9ycyIsIm11bHRpcGxlT2ZQcmVjaXNpb24iLCJzY2hlbWFJZCIsInVua25vd25Gb3JtYXRzIiwiYWRkRm9ybWF0IiwidG9FcnJvclNjaGVtYSIsImVycm9ycyIsImxlbmd0aCIsInJlZHVjZSIsImVycm9yU2NoZW1hIiwiZXJyb3IiLCJwcm9wZXJ0eSIsIm1lc3NhZ2UiLCJwYXRoIiwicGFyZW50Iiwic3BsaWNlIiwic2xpY2UiLCJzZWdtZW50IiwiQXJyYXkiLCJpc0FycmF5IiwiX19lcnJvcnMiLCJjb25jYXQiLCJ0b0Vycm9yTGlzdCIsImZpZWxkTmFtZSIsImVycm9yTGlzdCIsIm1hcCIsInN0YWNrIiwiT2JqZWN0Iiwia2V5cyIsImFjYyIsImtleSIsImNyZWF0ZUVycm9ySGFuZGxlciIsImZvcm1EYXRhIiwiaGFuZGxlciIsImFkZEVycm9yIiwicHVzaCIsInZhbHVlIiwidW53cmFwRXJyb3JIYW5kbGVyIiwiZXJyb3JIYW5kbGVyIiwidHJhbnNmb3JtQWp2RXJyb3JzIiwiZSIsImRhdGFQYXRoIiwia2V5d29yZCIsInBhcmFtcyIsInNjaGVtYVBhdGgiLCJuYW1lIiwidHJpbSIsInZhbGlkYXRlRm9ybURhdGEiLCJzY2hlbWEiLCJjdXN0b21WYWxpZGF0ZSIsInRyYW5zZm9ybUVycm9ycyIsImFkZGl0aW9uYWxNZXRhU2NoZW1hcyIsImN1c3RvbUZvcm1hdHMiLCJsb2NhbGl6ZUVycm9ycyIsInJvb3RTY2hlbWEiLCJuZXdNZXRhU2NoZW1hcyIsIm5ld0Zvcm1hdHMiLCJhZGRNZXRhU2NoZW1hIiwiZm9yRWFjaCIsImZvcm1hdE5hbWUiLCJ2YWxpZGF0aW9uRXJyb3IiLCJ2YWxpZGF0ZSIsImVyciIsIm5vUHJvcGVyTWV0YVNjaGVtYSIsImluY2x1ZGVzIiwiJHNjaGVtYSIsInVzZXJFcnJvclNjaGVtYSIsIm5ld0Vycm9yU2NoZW1hIiwibmV3RXJyb3JzIiwid2l0aElkUmVmUHJlZml4Iiwic2NoZW1hTm9kZSIsIm9iaiIsImNvbnN0cnVjdG9yIiwic3RhcnRzV2l0aCIsImkiLCJpc1ZhbGlkIiwiZGF0YSIsImFkZFNjaGVtYSIsInJlbW92ZVNjaGVtYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBREEsSUFBSUEsR0FBRyxHQUFHQyxpQkFBaUIsRUFBM0I7QUFHQSxJQUFJQyxtQkFBbUIsR0FBRyxJQUExQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLElBQXZCO0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsbUJBQTNCOztBQUlBLFNBQVNILGlCQUFULEdBQTZCO0FBQzNCLE1BQU1ELEdBQUcsR0FBRyxJQUFJSyxlQUFKLENBQVE7QUFDbEJDLElBQUFBLGFBQWEsRUFBRSxVQURHO0FBRWxCQyxJQUFBQSxTQUFTLEVBQUUsSUFGTztBQUdsQkMsSUFBQUEsbUJBQW1CLEVBQUUsQ0FISDtBQUlsQkMsSUFBQUEsUUFBUSxFQUFFLE1BSlE7QUFLbEJDLElBQUFBLGNBQWMsRUFBRTtBQUxFLEdBQVIsQ0FBWixDQUQyQixDQVMzQjs7QUFDQVYsRUFBQUEsR0FBRyxDQUFDVyxTQUFKLENBQ0UsVUFERixFQUVFLDJEQUZGO0FBSUFYLEVBQUFBLEdBQUcsQ0FBQ1csU0FBSixDQUNFLE9BREYsRUFFRSw0WUFGRjtBQUlBLFNBQU9YLEdBQVA7QUFDRDs7QUFFRCxTQUFTWSxhQUFULENBQXVCQyxNQUF2QixFQUErQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFJLENBQUNBLE1BQU0sQ0FBQ0MsTUFBWixFQUFvQjtBQUNsQixXQUFPLEVB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QztBQUNuQ0gsTUFBQUEsR0FBRyxDQUFDRyxDQUFELENBQUgsR0FBU0wsZUFBZSxDQUFDRSxHQUFHLENBQUNHLENBQUQsQ0FBSixDQUF4QjtBQUNEO0FBQ0Y7O0FBQ0QsU0FBT0gsR0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLTyxTQUFTSSxPQUFULENBQWlCM0IsTUFBakIsRUFBeUI0QixJQUF6QixFQUErQnRCLFVBQS9CLEVBQTJDO0FBQ2hELE1BQUk7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQU83RCxHQUFHLENBQ1BvRixTQURJLENBQ012QixVQUROLEVBQ2tCekQsa0JBRGxCLEVBRUpnRSxRQUZJLENBRUtRLGVBQWUsQ0FBQ3JCLE1BQUQsQ0FGcEIsRUFFOEI0QixJQUY5QixDQUFQO0FBR0QsR0FSRCxDQVFFLE9BQU9wQyxDQUFQLEVBQVU7QUFDVixXQUFPLEtBQVA7QUFDRCxHQVZELFNBVVU7QUFDUjtBQUNBL0MsSUFBQUEsR0FBRyxDQUFDcUYsWUFBSixDQUFpQmpGLGtCQUFqQjtBQUNEO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdG9QYXRoIGZyb20gXCJsb2Rhc2gvdG9QYXRoXCI7XHJcbmltcG9ydCBBanYgZnJvbSBcImFqdlwiO1xyXG5sZXQgYWp2ID0gY3JlYXRlQWp2SW5zdGFuY2UoKTtcclxuaW1wb3J0IHsgZGVlcEVxdWFscywgZ2V0RGVmYXVsdEZvcm1TdGF0ZSB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5sZXQgZm9ybWVyQ3VzdG9tRm9ybWF0cyA9IG51bGw7XHJcbmxldCBmb3JtZXJNZXRhU2NoZW1hID0gbnVsbDtcclxuY29uc3QgUk9PVF9TQ0hFTUFfUFJFRklYID0gXCJfX3Jqc2Zfcm9vdFNjaGVtYVwiO1xyXG5cclxuaW1wb3J0IHsgaXNPYmplY3QsIG1lcmdlT2JqZWN0cyB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVBanZJbnN0YW5jZSgpIHtcclxuICBjb25zdCBhanYgPSBuZXcgQWp2KHtcclxuICAgIGVycm9yRGF0YVBhdGg6IFwicHJvcGVydHlcIixcclxuICAgIGFsbEVycm9yczogdHJ1ZSxcclxuICAgIG11bHRpcGxlT2ZQcmVjaXNpb246IDgsXHJcbiAgICBzY2hlbWFJZDogXCJhdXRvXCIsXHJcbiAgICB1bmtub3duRm9ybWF0czogXCJpZ25vcmVcIixcclxuICB9KTtcclxuXHJcbiAgLy8gYWRkIGN1c3RvbSBmb3JtYXRzXHJcbiAgYWp2LmFkZEZvcm1hdChcclxuICAgIFwiZGF0YS11cmxcIixcclxuICAgIC9eZGF0YTooW2Etel0rXFwvW2EtejAtOS0rLl0rKT87KD86bmFtZT0oLiopOyk/YmFzZTY0LCguKikkL1xyXG4gICk7XHJcbiAgYWp2LmFkZEZvcm1hdChcclxuICAgIFwiY29sb3JcIixcclxuICAgIC9eKCM/KFswLTlBLUZhLWZdezN9KXsxLDJ9XFxifGFxdWF8YmxhY2t8Ymx1ZXxmdWNoc2lhfGdyYXl8Z3JlZW58bGltZXxtYXJvb258bmF2eXxvbGl2ZXxvcmFuZ2V8cHVycGxlfHJlZHxzaWx2ZXJ8dGVhbHx3aGl0ZXx5ZWxsb3d8KHJnYlxcKFxccypcXGIoWzAtOV18WzEtOV1bMC05XXwxWzAtOV1bMC05XXwyWzAtNF1bMC05XXwyNVswLTVdKVxcYlxccyosXFxzKlxcYihbMC05XXxbMS05XVswLTldfDFbMC05XVswLTldfDJbMC00XVswLTldfDI1WzAtNV0pXFxiXFxzKixcXHMqXFxiKFswLTldfFsxLTldWzAtOV18MVswLTldWzAtOV18MlswLTRdWzAtOV18MjVbMC01XSlcXGJcXHMqXFwpKXwocmdiXFwoXFxzKihcXGQ/XFxkJXwxMDAlKStcXHMqLFxccyooXFxkP1xcZCV8MTAwJSkrXFxzKixcXHMqKFxcZD9cXGQlfDEwMCUpK1xccypcXCkpKSQvXHJcbiAgKTtcclxuICByZXR1cm4gYWp2O1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b0Vycm9yU2NoZW1hKGVycm9ycykge1xyXG4gIC8vIFRyYW5zZm9ybXMgYSBhanYgdmFsaWRhdGlvbiBlcnJvcnMgbGlzdDpcclxuICAvLyBbXHJcbiAgLy8gICB7cHJvcGVydHk6IFwiLmxldmVsMS5sZXZlbDJbMl0ubGV2ZWwzXCIsIG1lc3NhZ2U6IFwiZXJyIGFcIn0sXHJcbiAgLy8gICB7cHJvcGVydHk6IFwiLmxldmVsMS5sZXZlbDJbMl0ubGV2ZWwzXCIsIG1lc3NhZ2U6IFwiZXJyIGJcIn0sXHJcbiAgLy8gICB7cHJvcGVydHk6IFwiLmxldmVsMS5sZXZlbDJbNF0ubGV2ZWwzXCIsIG1lc3NhZ2U6IFwiZXJyIGJcIn0sXHJcbiAgLy8gXVxyXG4gIC8vIEludG8gYW4gZXJyb3IgdHJlZTpcclxuICAvLyB7XHJcbiAgLy8gICBsZXZlbDE6IHtcclxuICAvLyAgICAgbGV2ZWwyOiB7XHJcbiAgLy8gICAgICAgMjoge2xldmVsMzoge2Vycm9yczogW1wiZXJyIGFcIiwgXCJlcnIgYlwiXX19LFxyXG4gIC8vICAgICAgIDQ6IHtsZXZlbDM6IHtlcnJvcnM6IFtcImVyciBiXCJdfX0sXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuICAvLyB9O1xyXG4gIGlmICghZXJyb3JzLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuICByZXR1cm4gZXJyb3JzLnJlZHVjZSgoZXJyb3JTY2hlbWEsIGVycm9yKSA9PiB7XHJcbiAgICBjb25zdCB7IHByb3BlcnR5LCBtZXNzYWdlIH0gPSBlcnJvcjtcclxuICAgIGNvbnN0IHBhdGggPSB0b1BhdGgocHJvcGVydHkpO1xyXG4gICAgbGV0IHBhcmVudCA9IGVycm9yU2NoZW1hO1xyXG5cclxuICAgIC8vIElmIHRoZSBwcm9wZXJ0eSBpcyBhdCB0aGUgcm9vdCAoLmxldmVsMSkgdGhlbiB0b1BhdGggY3JlYXRlc1xyXG4gICAgLy8gYW4gZW1wdHkgYXJyYXkgZWxlbWVudCBhdCB0aGUgZmlyc3QgaW5kZXguIFJlbW92ZSBpdC5cclxuICAgIGlmIChwYXRoLmxlbmd0aCA+IDAgJiYgcGF0aFswXSA9PT0gXCJcIikge1xyXG4gICAgICBwYXRoLnNwbGljZSgwLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgcGF0aC5zbGljZSgwKSkge1xyXG4gICAgICBpZiAoIShzZWdtZW50IGluIHBhcmVudCkpIHtcclxuICAgICAgICBwYXJlbnRbc2VnbWVudF0gPSB7fTtcclxuICAgICAgfVxyXG4gICAgICBwYXJlbnQgPSBwYXJlbnRbc2VnbWVudF07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGFyZW50Ll9fZXJyb3JzKSkge1xyXG4gICAgICAvLyBXZSBzdG9yZSB0aGUgbGlzdCBvZiBlcnJvcnMgZm9yIHRoaXMgbm9kZSBpbiBhIHByb3BlcnR5IG5hbWVkIF9fZXJyb3JzXHJcbiAgICAgIC8vIHRvIGF2b2lkIG5hbWUgY29sbGlzaW9uIHdpdGggYSBwb3NzaWJsZSBzdWIgc2NoZW1hIGZpZWxkIG5hbWVkXHJcbiAgICAgIC8vIFwiZXJyb3JzXCIgKHNlZSBgdmFsaWRhdGUuY3JlYXRlRXJyb3JIYW5kbGVyYCkuXHJcbiAgICAgIHBhcmVudC5fX2Vycm9ycyA9IHBhcmVudC5fX2Vycm9ycy5jb25jYXQobWVzc2FnZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobWVzc2FnZSkge1xyXG4gICAgICAgIHBhcmVudC5fX2Vycm9ycyA9IFttZXNzYWdlXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVycm9yU2NoZW1hO1xyXG4gIH0sIHt9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvRXJyb3JMaXN0KGVycm9yU2NoZW1hLCBmaWVsZE5hbWUgPSBcInJvb3RcIikge1xyXG4gIC8vIFhYWDogV2Ugc2hvdWxkIHRyYW5zZm9ybSBmaWVsZE5hbWUgYXMgYSBmdWxsIGZpZWxkIHBhdGggc3RyaW5nLlxyXG4gIGxldCBlcnJvckxpc3QgPSBbXTtcclxuICBpZiAoXCJfX2Vycm9yc1wiIGluIGVycm9yU2NoZW1hKSB7XHJcbiAgICBlcnJvckxpc3QgPSBlcnJvckxpc3QuY29uY2F0KFxyXG4gICAgICBlcnJvclNjaGVtYS5fX2Vycm9ycy5tYXAoc3RhY2sgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBzdGFjazogYCR7ZmllbGROYW1lfTogJHtzdGFja31gLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gT2JqZWN0LmtleXMoZXJyb3JTY2hlbWEpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgIGlmIChrZXkgIT09IFwiX19lcnJvcnNcIikge1xyXG4gICAgICBhY2MgPSBhY2MuY29uY2F0KHRvRXJyb3JMaXN0KGVycm9yU2NoZW1hW2tleV0sIGtleSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCBlcnJvckxpc3QpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFcnJvckhhbmRsZXIoZm9ybURhdGEpIHtcclxuICBjb25zdCBoYW5kbGVyID0ge1xyXG4gICAgLy8gV2Ugc3RvcmUgdGhlIGxpc3Qgb2YgZXJyb3JzIGZvciB0aGlzIG5vZGUgaW4gYSBwcm9wZXJ0eSBuYW1lZCBfX2Vycm9yc1xyXG4gICAgLy8gdG8gYXZvaWQgbmFtZSBjb2xsaXNpb24gd2l0aCBhIHBvc3NpYmxlIHN1YiBzY2hlbWEgZmllbGQgbmFtZWRcclxuICAgIC8vIFwiZXJyb3JzXCIgKHNlZSBgdXRpbHMudG9FcnJvclNjaGVtYWApLlxyXG4gICAgX19lcnJvcnM6IFtdLFxyXG4gICAgYWRkRXJyb3IobWVzc2FnZSkge1xyXG4gICAgICB0aGlzLl9fZXJyb3JzLnB1c2gobWVzc2FnZSk7XHJcbiAgICB9LFxyXG4gIH07XHJcbiAgaWYgKGlzT2JqZWN0KGZvcm1EYXRhKSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvcm1EYXRhKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcbiAgICAgIHJldHVybiB7IC4uLmFjYywgW2tleV06IGNyZWF0ZUVycm9ySGFuZGxlcihmb3JtRGF0YVtrZXldKSB9O1xyXG4gICAgfSwgaGFuZGxlcik7XHJcbiAgfVxyXG4gIGlmIChBcnJheS5pc0FycmF5KGZvcm1EYXRhKSkge1xyXG4gICAgcmV0dXJuIGZvcm1EYXRhLnJlZHVjZSgoYWNjLCB2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgIHJldHVybiB7IC4uLmFjYywgW2tleV06IGNyZWF0ZUVycm9ySGFuZGxlcih2YWx1ZSkgfTtcclxuICAgIH0sIGhhbmRsZXIpO1xyXG4gIH1cclxuICByZXR1cm4gaGFuZGxlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gdW53cmFwRXJyb3JIYW5kbGVyKGVycm9ySGFuZGxlcikge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhlcnJvckhhbmRsZXIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgIGlmIChrZXkgPT09IFwiYWRkRXJyb3JcIikge1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiX19lcnJvcnNcIikge1xyXG4gICAgICByZXR1cm4geyAuLi5hY2MsIFtrZXldOiBlcnJvckhhbmRsZXJba2V5XSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgLi4uYWNjLCBba2V5XTogdW53cmFwRXJyb3JIYW5kbGVyKGVycm9ySGFuZGxlcltrZXldKSB9O1xyXG4gIH0sIHt9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyYW5zZm9ybWluZyB0aGUgZXJyb3Igb3V0cHV0IGZyb20gYWp2IHRvIGZvcm1hdCB1c2VkIGJ5IGpzb25zY2hlbWEuXHJcbiAqIEF0IHNvbWUgcG9pbnQsIGNvbXBvbmVudHMgc2hvdWxkIGJlIHVwZGF0ZWQgdG8gc3VwcG9ydCBhanYuXHJcbiAqL1xyXG5mdW5jdGlvbiB0cmFuc2Zvcm1BanZFcnJvcnMoZXJyb3JzID0gW10pIHtcclxuICBpZiAoZXJyb3JzID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXJyb3JzLm1hcChlID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YVBhdGgsIGtleXdvcmQsIG1lc3NhZ2UsIHBhcmFtcywgc2NoZW1hUGF0aCB9ID0gZTtcclxuICAgIGxldCBwcm9wZXJ0eSA9IGAke2RhdGFQYXRofWA7XHJcblxyXG4gICAgLy8gcHV0IGRhdGEgaW4gZXhwZWN0ZWQgZm9ybWF0XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBrZXl3b3JkLFxyXG4gICAgICBwcm9wZXJ0eSxcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgcGFyYW1zLCAvLyBzcGVjaWZpYyB0byBhanZcclxuICAgICAgc3RhY2s6IGAke3Byb3BlcnR5fSAke21lc3NhZ2V9YC50cmltKCksXHJcbiAgICAgIHNjaGVtYVBhdGgsXHJcbiAgICB9O1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBmdW5jdGlvbiBwcm9jZXNzZXMgdGhlIGZvcm1EYXRhIHdpdGggYSB1c2VyIGB2YWxpZGF0ZWAgY29udHJpYnV0ZWRcclxuICogZnVuY3Rpb24sIHdoaWNoIHJlY2VpdmVzIHRoZSBmb3JtIGRhdGEgYW5kIGFuIGBlcnJvckhhbmRsZXJgIG9iamVjdCB0aGF0XHJcbiAqIHdpbGwgYmUgdXNlZCB0byBhZGQgY3VzdG9tIHZhbGlkYXRpb24gZXJyb3JzIGZvciBlYWNoIGZpZWxkLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmFsaWRhdGVGb3JtRGF0YShcclxuICBmb3JtRGF0YSxcclxuICBzY2hlbWEsXHJcbiAgY3VzdG9tVmFsaWRhdGUsXHJcbiAgdHJhbnNmb3JtRXJyb3JzLFxyXG4gIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyA9IFtdLFxyXG4gIGN1c3RvbUZvcm1hdHMgPSB7fSxcclxuICBsb2NhbGl6ZUVycm9ycyA9IG51bGxcclxuKSB7XHJcbiAgLy8gSW5jbHVkZSBmb3JtIGRhdGEgd2l0aCB1bmRlZmluZWQgdmFsdWVzLCB3aGljaCBpcyByZXF1aXJlZCBmb3IgdmFsaWRhdGlvbi5cclxuICBjb25zdCByb290U2NoZW1hID0gc2NoZW1hO1xyXG4gIGZvcm1EYXRhID0gZ2V0RGVmYXVsdEZvcm1TdGF0ZShzY2hlbWEsIGZvcm1EYXRhLCByb290U2NoZW1hLCB0cnVlKTtcclxuXHJcbiAgY29uc3QgbmV3TWV0YVNjaGVtYXMgPSAhZGVlcEVxdWFscyhmb3JtZXJNZXRhU2NoZW1hLCBhZGRpdGlvbmFsTWV0YVNjaGVtYXMpO1xyXG4gIGNvbnN0IG5ld0Zvcm1hdHMgPSAhZGVlcEVxdWFscyhmb3JtZXJDdXN0b21Gb3JtYXRzLCBjdXN0b21Gb3JtYXRzKTtcclxuXHJcbiAgaWYgKG5ld01ldGFTY2hlbWFzIHx8IG5ld0Zvcm1hdHMpIHtcclxuICAgIGFqdiA9IGNyZWF0ZUFqdkluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvLyBhZGQgbW9yZSBzY2hlbWFzIHRvIHZhbGlkYXRlIGFnYWluc3RcclxuICBpZiAoXHJcbiAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMgJiZcclxuICAgIG5ld01ldGFTY2hlbWFzICYmXHJcbiAgICBBcnJheS5pc0FycmF5KGFkZGl0aW9uYWxNZXRhU2NoZW1hcylcclxuICApIHtcclxuICAgIGFqdi5hZGRNZXRhU2NoZW1hKGFkZGl0aW9uYWxNZXRhU2NoZW1hcyk7XHJcbiAgICBmb3JtZXJNZXRhU2NoZW1hID0gYWRkaXRpb25hbE1ldGFTY2hlbWFzO1xyXG4gIH1cclxuXHJcbiAgLy8gYWRkIG1vcmUgY3VzdG9tIGZvcm1hdHMgdG8gdmFsaWRhdGUgYWdhaW5zdFxyXG4gIGlmIChjdXN0b21Gb3JtYXRzICYmIG5ld0Zvcm1hdHMgJiYgaXNPYmplY3QoY3VzdG9tRm9ybWF0cykpIHtcclxuICAgIE9iamVjdC5rZXlzKGN1c3RvbUZvcm1hdHMpLmZvckVhY2goZm9ybWF0TmFtZSA9PiB7XHJcbiAgICAgIGFqdi5hZGRGb3JtYXQoZm9ybWF0TmFtZSwgY3VzdG9tRm9ybWF0c1tmb3JtYXROYW1lXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3JtZXJDdXN0b21Gb3JtYXRzID0gY3VzdG9tRm9ybWF0cztcclxuICB9XHJcblxyXG4gIGxldCB2YWxpZGF0aW9uRXJyb3IgPSBudWxsO1xyXG4gIHRyeSB7XHJcbiAgICBhanYudmFsaWRhdGUoc2NoZW1hLCBmb3JtRGF0YSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICB2YWxpZGF0aW9uRXJyb3IgPSBlcnI7XHJcbiAgfVxyXG5cclxuICBsb2NhbGl6ZUVycm9ycyAmJlxyXG4gICAgdHlwZW9mIGxvY2FsaXplRXJyb3JzID09IFwiZnVuY3Rpb25cIiAmJlxyXG4gICAgbG9jYWxpemVFcnJvcnMoYWp2LmVycm9ycyk7XHJcblxyXG4gIGxldCBlcnJvcnMgPSB0cmFuc2Zvcm1BanZFcnJvcnMoYWp2LmVycm9ycyk7XHJcbiAgLy8gQ2xlYXIgZXJyb3JzIHRvIHByZXZlbnQgcGVyc2lzdGVudCBlcnJvcnMsIHNlZSAjMTEwNFxyXG5cclxuICBhanYuZXJyb3JzID0gbnVsbDtcclxuXHJcbiAgY29uc3Qgbm9Qcm9wZXJNZXRhU2NoZW1hID1cclxuICAgIHZhbGlkYXRpb25FcnJvciAmJlxyXG4gICAgdmFsaWRhdGlvbkVycm9yLm1lc3NhZ2UgJiZcclxuICAgIHR5cGVvZiB2YWxpZGF0aW9uRXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIiAmJlxyXG4gICAgdmFsaWRhdGlvbkVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJubyBzY2hlbWEgd2l0aCBrZXkgb3IgcmVmIFwiKTtcclxuXHJcbiAgaWYgKG5vUHJvcGVyTWV0YVNjaGVtYSkge1xyXG4gICAgZXJyb3JzID0gW1xyXG4gICAgICAuLi5lcnJvcnMsXHJcbiAgICAgIHtcclxuICAgICAgICBzdGFjazogdmFsaWRhdGlvbkVycm9yLm1lc3NhZ2UsXHJcbiAgICAgIH0sXHJcbiAgICBdO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHRyYW5zZm9ybUVycm9ycyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBlcnJvcnMgPSB0cmFuc2Zvcm1FcnJvcnMoZXJyb3JzKTtcclxuICB9XHJcblxyXG4gIGxldCBlcnJvclNjaGVtYSA9IHRvRXJyb3JTY2hlbWEoZXJyb3JzKTtcclxuXHJcbiAgaWYgKG5vUHJvcGVyTWV0YVNjaGVtYSkge1xyXG4gICAgZXJyb3JTY2hlbWEgPSB7XHJcbiAgICAgIC4uLmVycm9yU2NoZW1hLFxyXG4gICAgICAuLi57XHJcbiAgICAgICAgJHNjaGVtYToge1xyXG4gICAgICAgICAgX19lcnJvcnM6IFt2YWxpZGF0aW9uRXJyb3IubWVzc2FnZV0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIGN1c3RvbVZhbGlkYXRlICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHJldHVybiB7IGVycm9ycywgZXJyb3JTY2hlbWEgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGVycm9ySGFuZGxlciA9IGN1c3RvbVZhbGlkYXRlKGZvcm1EYXRhLCBjcmVhdGVFcnJvckhhbmRsZXIoZm9ybURhdGEpKTtcclxuICBjb25zdCB1c2VyRXJyb3JTY2hlbWEgPSB1bndyYXBFcnJvckhhbmRsZXIoZXJyb3JIYW5kbGVyKTtcclxuICBjb25zdCBuZXdFcnJvclNjaGVtYSA9IG1lcmdlT2JqZWN0cyhlcnJvclNjaGVtYSwgdXNlckVycm9yU2NoZW1hLCB0cnVlKTtcclxuICAvLyBYWFg6IFRoZSBlcnJvcnMgbGlzdCBwcm9kdWNlZCBpcyBub3QgZnVsbHkgY29tcGxpYW50IHdpdGggdGhlIGZvcm1hdFxyXG4gIC8vIGV4cG9zZWQgYnkgdGhlIGpzb25zY2hlbWEgbGliLCB3aGljaCBjb250YWlucyBmdWxsIGZpZWxkIHBhdGhzIGFuZCBvdGhlclxyXG4gIC8vIHByb3BlcnRpZXMuXHJcbiAgY29uc3QgbmV3RXJyb3JzID0gdG9FcnJvckxpc3QobmV3RXJyb3JTY2hlbWEpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZXJyb3JzOiBuZXdFcnJvcnMsXHJcbiAgICBlcnJvclNjaGVtYTogbmV3RXJyb3JTY2hlbWEsXHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlY3Vyc2l2ZWx5IHByZWZpeGVzIGFsbCAkcmVmJ3MgaW4gYSBzY2hlbWEgd2l0aCBgUk9PVF9TQ0hFTUFfUFJFRklYYFxyXG4gKiBUaGlzIGlzIHVzZWQgaW4gaXNWYWxpZCB0byBtYWtlIHJlZmVyZW5jZXMgdG8gdGhlIHJvb3RTY2hlbWFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB3aXRoSWRSZWZQcmVmaXgoc2NoZW1hTm9kZSkge1xyXG4gIGxldCBvYmogPSBzY2hlbWFOb2RlO1xyXG4gIGlmIChzY2hlbWFOb2RlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcclxuICAgIG9iaiA9IHsgLi4uc2NoZW1hTm9kZSB9O1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XHJcbiAgICAgIGlmIChcclxuICAgICAgICBrZXkgPT09IFwiJHJlZlwiICYmXHJcbiAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmXHJcbiAgICAgICAgdmFsdWUuc3RhcnRzV2l0aChcIiNcIilcclxuICAgICAgKSB7XHJcbiAgICAgICAgb2JqW2tleV0gPSBST09UX1NDSEVNQV9QUkVGSVggKyB2YWx1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvYmpba2V5XSA9IHdpdGhJZFJlZlByZWZpeCh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hTm9kZSkpIHtcclxuICAgIG9iaiA9IFsuLi5zY2hlbWFOb2RlXTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG9ialtpXSA9IHdpdGhJZFJlZlByZWZpeChvYmpbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogVmFsaWRhdGVzIGRhdGEgYWdhaW5zdCBhIHNjaGVtYSwgcmV0dXJuaW5nIHRydWUgaWYgdGhlIGRhdGEgaXMgdmFsaWQsIG9yXHJcbiAqIGZhbHNlIG90aGVyd2lzZS4gSWYgdGhlIHNjaGVtYSBpcyBpbnZhbGlkLCB0aGVuIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm5cclxuICogZmFsc2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChzY2hlbWEsIGRhdGEsIHJvb3RTY2hlbWEpIHtcclxuICB0cnkge1xyXG4gICAgLy8gYWRkIHRoZSByb290U2NoZW1hIFJPT1RfU0NIRU1BX1BSRUZJWCBhcyBpZC5cclxuICAgIC8vIHRoZW4gcmV3cml0ZSB0aGUgc2NoZW1hIHJlZidzIHRvIHBvaW50IHRvIHRoZSByb290U2NoZW1hXHJcbiAgICAvLyB0aGlzIGFjY291bnRzIGZvciB0aGUgY2FzZSB3aGVyZSBzY2hlbWEgaGF2ZSByZWZlcmVuY2VzIHRvIG1vZGVsc1xyXG4gICAgLy8gdGhhdCBsaXZlcyBpbiB0aGUgcm9vdFNjaGVtYSBidXQgbm90IGluIHRoZSBzY2hlbWEgaW4gcXVlc3Rpb24uXHJcbiAgICByZXR1cm4gYWp2XHJcbiAgICAgIC5hZGRTY2hlbWEocm9vdFNjaGVtYSwgUk9PVF9TQ0hFTUFfUFJFRklYKVxyXG4gICAgICAudmFsaWRhdGUod2l0aElkUmVmUHJlZml4KHNjaGVtYSksIGRhdGEpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgLy8gbWFrZSBzdXJlIHdlIHJlbW92ZSB0aGUgcm9vdFNjaGVtYSBmcm9tIHRoZSBnbG9iYWwgYWp2IGluc3RhbmNlXHJcbiAgICBhanYucmVtb3ZlU2NoZW1hKFJPT1RfU0NIRU1BX1BSRUZJWCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==