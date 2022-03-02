"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function addNameToDataURL(dataURL, name) {
  return dataURL.replace(";base64", ";name=".concat(encodeURIComponent(name), ";base64"));
}

function processFile(file) {
  var name = file.name,
      size = file.size,
      type = file.type;
  return new Promise(function (resolve, reject) {
    var reader = new window.FileReader();
    reader.onerror = reject;

    reader.onload = function (event) {
      resolve({
        dataURL: addNameToDataURL(event.target.result, name),
        name: name,
        size: size,
        type: type
      });
    };

    reader.readAsDataURL(file);
  });
}

function processFiles(files) {
  return Promise.all([].map.call(files, processFile));
}

function FilesInfo(props) {
  var filesInfo = props.filesInfo;

  if (filesInfo.length === 0) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("ul", {
    className: "file-info"
  }, filesInfo.map(function (fileInfo, key) {
    var name = fileInfo.name,
        size = fileInfo.size,
        type = fileInfo.type;
    return /*#__PURE__*/_react.default.createElement("li", {
      key: key
    }, /*#__PURE__*/_react.default.createElement("strong", null, name), " (", type, ", ", size, " bytes)");
  }));
}

function extractFileInfo(dataURLs) {
  return dataURLs.filter(function (dataURL) {
    return typeof dataURL !== "undefined";
  }).map(function (dataURL) {
    var _dataURItoBlob = (0, _utils.dataURItoBlob)(dataURL),
        blob = _dataURItoBlob.blob,
        name = _dataURItoBlob.name;

    return {
      name: name,
      size: blob.size,
      type: blob.type
    };
  });
}

var FileWidget = /*#__PURE__*/function (_Component) {
  _inherits(FileWidget, _Component);

  var _super = _createSuper(FileWidget);

  function FileWidget(props) {
    var _this;

    _classCallCheck(this, FileWidget);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange;
      processFiles(event.target.files).then(function (filesInfo) {
        var state = {
          values: filesInfo.map(function (fileInfo) {
            return fileInfo.dataURL;
          }),
          filesInfo: filesInfo
        };

        _this.setState(state, function () {
          if (multiple) {
            onChange(state.values);
          } else {
            onChange(state.values[0]);
          }
        });
      });
    });

    var value = props.value;
    var values = Array.isArray(value) ? value : [value];
    _this.state = {
      values: values,
      filesInfo: extractFileInfo(values)
    };
    return _this;
  }

  _createClass(FileWidget, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          multiple = _this$props2.multiple,
          id = _this$props2.id,
          readonly = _this$props2.readonly,
          disabled = _this$props2.disabled,
          autofocus = _this$props2.autofocus,
          options = _this$props2.options;
      var filesInfo = this.state.filesInfo;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("input", {
        ref: function ref(_ref) {
          return _this2.inputRef = _ref;
        },
        id: id,
        type: "file",
        disabled: readonly || disabled,
        onChange: this.onChange,
        defaultValue: "",
        autoFocus: autofocus,
        multiple: multiple,
        accept: options.accept
      })), /*#__PURE__*/_react.default.createElement(FilesInfo, {
        filesInfo: filesInfo
      }));
    }
  }]);

  return FileWidget;
}(_react.Component);

FileWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  FileWidget.propTypes = {
    multiple: _propTypes.default.bool,
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
    autofocus: _propTypes.default.bool
  };
}

var _default = FileWidget;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRmlsZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJhZGROYW1lVG9EYXRhVVJMIiwiZGF0YVVSTCIsIm5hbWUiLCJyZXBsYWNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicHJvY2Vzc0ZpbGUiLCJmaWxlIiwic2l6ZSIsInR5cGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlYWRlciIsIndpbmRvdyIsIkZpbGVSZWFkZXIiLCJvbmVycm9yIiwib25sb2FkIiwiZXZlbnQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwicHJvY2Vzc0ZpbGVzIiwiZmlsZXMiLCJhbGwiLCJtYXAiLCJjYWxsIiwiRmlsZXNJbmZvIiwicHJvcHMiLCJmaWxlc0luZm8iLCJsZW5ndGgiLCJmaWxlSW5mbyIsImtleSIsImV4dHJhY3RGaWxlSW5mbyIsImRhdGFVUkxzIiwiZmlsdGVyIiwiYmxvYiIsIkZpbGVXaWRnZXQiLCJtdWx0aXBsZSIsIm9uQ2hhbmdlIiwidGhlbiIsInN0YXRlIiwidmFsdWVzIiwic2V0U3RhdGUiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsImlkIiwicmVhZG9ubHkiLCJkaXNhYmxlZCIsImF1dG9mb2N1cyIsIm9wdGlvbnMiLCJyZWYiLCJpbnB1dFJlZiIsImFjY2VwdCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImJvb2wiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJhcnJheU9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsZ0JBQVQsQ0FBMEJDLE9BQTFCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUN2QyxTQUFPRCxPQUFPLENB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QUEsS0FBSyxFQUFFbUIsbUJBQVVFLFNBQVYsQ0FBb0IsQ0FDekJGLG1CQUFVRyxNQURlLEVBRXpCSCxtQkFBVUksT0FBVixDQUFrQkosbUJBQVVHLE1BQTVCLENBRnlCLENBQXBCLENBRmM7QUFNckJkLElBQUFBLFNBQVMsRUFBRVcsbUJBQVVDO0FBTkEsR0FBdkI7QUFRRDs7ZUFFYzNCLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IGRhdGFVUkl0b0Jsb2IsIHNob3VsZFJlbmRlciB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gYWRkTmFtZVRvRGF0YVVSTChkYXRhVVJMLCBuYW1lKSB7XHJcbiAgcmV0dXJuIGRhdGFVUkwucmVwbGFjZShcIjtiYXNlNjRcIiwgYDtuYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfTtiYXNlNjRgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0ZpbGUoZmlsZSkge1xyXG4gIGNvbnN0IHsgbmFtZSwgc2l6ZSwgdHlwZSB9ID0gZmlsZTtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IHdpbmRvdy5GaWxlUmVhZGVyKCk7XHJcbiAgICByZWFkZXIub25lcnJvciA9IHJlamVjdDtcclxuICAgIHJlYWRlci5vbmxvYWQgPSBldmVudCA9PiB7XHJcbiAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgIGRhdGFVUkw6IGFkZE5hbWVUb0RhdGFVUkwoZXZlbnQudGFyZ2V0LnJlc3VsdCwgbmFtZSksXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzRmlsZXMoZmlsZXMpIHtcclxuICByZXR1cm4gUHJvbWlzZS5hbGwoW10ubWFwLmNhbGwoZmlsZXMsIHByb2Nlc3NGaWxlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZpbGVzSW5mbyhwcm9wcykge1xyXG4gIGNvbnN0IHsgZmlsZXNJbmZvIH0gPSBwcm9wcztcclxuICBpZiAoZmlsZXNJbmZvLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICA8dWwgY2xhc3NOYW1lPVwiZmlsZS1pbmZvXCI+XHJcbiAgICAgIHtmaWxlc0luZm8ubWFwKChmaWxlSW5mbywga2V5KSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBuYW1lLCBzaXplLCB0eXBlIH0gPSBmaWxlSW5mbztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGxpIGtleT17a2V5fT5cclxuICAgICAgICAgICAgPHN0cm9uZz57bmFtZX08L3N0cm9uZz4gKHt0eXBlfSwge3NpemV9IGJ5dGVzKVxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICApO1xyXG4gICAgICB9KX1cclxuICAgIDwvdWw+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXh0cmFjdEZpbGVJbmZvKGRhdGFVUkxzKSB7XHJcbiAgcmV0dXJuIGRhdGFVUkxzXHJcbiAgICAuZmlsdGVyKGRhdGFVUkwgPT4gdHlwZW9mIGRhdGFVUkwgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAubWFwKGRhdGFVUkwgPT4ge1xyXG4gICAgICBjb25zdCB7IGJsb2IsIG5hbWUgfSA9IGRhdGFVUkl0b0Jsb2IoZGF0YVVSTCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBzaXplOiBibG9iLnNpemUsXHJcbiAgICAgICAgdHlwZTogYmxvYi50eXBlLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNsYXNzIEZpbGVXaWRnZXQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgdmFsdWVzLCBmaWxlc0luZm86IGV4dHJhY3RGaWxlSW5mbyh2YWx1ZXMpIH07XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiBzaG91bGRSZW5kZXIodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UgPSBldmVudCA9PiB7XHJcbiAgICBjb25zdCB7IG11bHRpcGxlLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIHByb2Nlc3NGaWxlcyhldmVudC50YXJnZXQuZmlsZXMpLnRoZW4oZmlsZXNJbmZvID0+IHtcclxuICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgdmFsdWVzOiBmaWxlc0luZm8ubWFwKGZpbGVJbmZvID0+IGZpbGVJbmZvLmRhdGFVUkwpLFxyXG4gICAgICAgIGZpbGVzSW5mbyxcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICAgb25DaGFuZ2Uoc3RhdGUudmFsdWVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb25DaGFuZ2Uoc3RhdGUudmFsdWVzWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBtdWx0aXBsZSwgaWQsIHJlYWRvbmx5LCBkaXNhYmxlZCwgYXV0b2ZvY3VzLCBvcHRpb25zIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyBmaWxlc0luZm8gfSA9IHRoaXMuc3RhdGU7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIHJlZj17cmVmID0+ICh0aGlzLmlucHV0UmVmID0gcmVmKX1cclxuICAgICAgICAgICAgaWQ9e2lkfVxyXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkb25seSB8fCBkaXNhYmxlZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIlwiXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICAgICAgICBtdWx0aXBsZT17bXVsdGlwbGV9XHJcbiAgICAgICAgICAgIGFjY2VwdD17b3B0aW9ucy5hY2NlcHR9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8RmlsZXNJbmZvIGZpbGVzSW5mbz17ZmlsZXNJbmZvfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5GaWxlV2lkZ2V0LmRlZmF1bHRQcm9wcyA9IHtcclxuICBhdXRvZm9jdXM6IGZhbHNlLFxyXG59O1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIEZpbGVXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgbXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcclxuICAgIF0pLFxyXG4gICAgYXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWxlV2lkZ2V0O1xyXG4iXX0=