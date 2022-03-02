function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { dataURItoBlob, shouldRender } from "../../utils";

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

  return /*#__PURE__*/React.createElement("ul", {
    className: "file-info"
  }, filesInfo.map(function (fileInfo, key) {
    var name = fileInfo.name,
        size = fileInfo.size,
        type = fileInfo.type;
    return /*#__PURE__*/React.createElement("li", {
      key: key
    }, /*#__PURE__*/React.createElement("strong", null, name), " (", type, ", ", size, " bytes)");
  }));
}

function extractFileInfo(dataURLs) {
  return dataURLs.filter(function (dataURL) {
    return typeof dataURL !== "undefined";
  }).map(function (dataURL) {
    var _dataURItoBlob = dataURItoBlob(dataURL),
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
      return shouldRender(this, nextProps, nextState);
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
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("input", {
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
      })), /*#__PURE__*/React.createElement(FilesInfo, {
        filesInfo: filesInfo
      }));
    }
  }]);

  return FileWidget;
}(Component);

FileWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  FileWidget.propTypes = {
    multiple: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    autofocus: PropTypes.bool
  };
}

export default FileWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRmlsZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImRhdGFVUkl0b0Jsb2IiLCJzaG91bGRSZW5kZXIiLCJhZGROYW1lVG9EYXRhVVJMIiwiZGF0YVVSTCIsIm5hbWUiLCJyZXBsYWNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicHJvY2Vzc0ZpbGUiLCJmaWxlIiwic2l6ZSIsInR5cGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlYWRlciIsIndpbmRvdyIsIkZpbGVSZWFkZXIiLCJvbmVycm9yIiwib25sb2FkIiwiZXZlbnQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwicHJvY2Vzc0ZpbGVzIiwiZmlsZXMiLCJhbGwiLCJtYXAiLCJjYWxsIiwiRmlsZXNJbmZvIiwicHJvcHMiLCJmaWxlc0luZm8iLCJsZW5ndGgiLCJmaWxlSW5mbyIsImtleSIsImV4dHJhY3RGaWxlSW5mbyIsImRhdGFVUkxzIiwiZmlsdGVyIiwiYmxvYiIsIkZpbGVXaWRnZXQiLCJtdWx0aXBsZSIsIm9uQ2hhbmdlIiwidGhlbiIsInN0YXRlIiwidmFsdWVzIiwic2V0U3RhdGUiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsImlkIiwicmVhZG9ubHkiLCJkaXNhYmxlZCIsImF1dG9mb2N1cyIsIm9wdGlvbnMiLCJyZWYiLCJpbnB1dFJlZiIsImFjY2VwdCIsImRlZmF1bHRQcm9wcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsImJvb2wiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJhcnJheU9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLFNBQVAsTUFB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QU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDdkIsRUFBQUEsVUFBVSxDQUFDd0IsU0FBWCxHQUF1QjtBQUNyQnZCLElBQUFBLFFBQVEsRUFBRXhDLFNBQVMsQ0FBQ2dFLElBREM7QUFFckJsQixJQUFBQSxLQUFLLEVBQUU5QyxTQUFTLENBQUNpRSxTQUFWLENBQW9CLENBQ3pCakUsU0FBUyxDQUFDa0UsTUFEZSxFQUV6QmxFLFNBQVMsQ0FBQ21FLE9BQVYsQ0FBa0JuRSxTQUFTLENBQUNrRSxNQUE1QixDQUZ5QixDQUFwQixDQUZjO0FBTXJCWixJQUFBQSxTQUFTLEVBQUV0RCxTQUFTLENBQUNnRTtBQU5BLEdBQXZCO0FBUUQ7O0FBRUQsZUFBZXpCLFVBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IGRhdGFVUkl0b0Jsb2IsIHNob3VsZFJlbmRlciB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuZnVuY3Rpb24gYWRkTmFtZVRvRGF0YVVSTChkYXRhVVJMLCBuYW1lKSB7XHJcbiAgcmV0dXJuIGRhdGFVUkwucmVwbGFjZShcIjtiYXNlNjRcIiwgYDtuYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfTtiYXNlNjRgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0ZpbGUoZmlsZSkge1xyXG4gIGNvbnN0IHsgbmFtZSwgc2l6ZSwgdHlwZSB9ID0gZmlsZTtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IHdpbmRvdy5GaWxlUmVhZGVyKCk7XHJcbiAgICByZWFkZXIub25lcnJvciA9IHJlamVjdDtcclxuICAgIHJlYWRlci5vbmxvYWQgPSBldmVudCA9PiB7XHJcbiAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgIGRhdGFVUkw6IGFkZE5hbWVUb0RhdGFVUkwoZXZlbnQudGFyZ2V0LnJlc3VsdCwgbmFtZSksXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzRmlsZXMoZmlsZXMpIHtcclxuICByZXR1cm4gUHJvbWlzZS5hbGwoW10ubWFwLmNhbGwoZmlsZXMsIHByb2Nlc3NGaWxlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZpbGVzSW5mbyhwcm9wcykge1xyXG4gIGNvbnN0IHsgZmlsZXNJbmZvIH0gPSBwcm9wcztcclxuICBpZiAoZmlsZXNJbmZvLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICA8dWwgY2xhc3NOYW1lPVwiZmlsZS1pbmZvXCI+XHJcbiAgICAgIHtmaWxlc0luZm8ubWFwKChmaWxlSW5mbywga2V5KSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBuYW1lLCBzaXplLCB0eXBlIH0gPSBmaWxlSW5mbztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGxpIGtleT17a2V5fT5cclxuICAgICAgICAgICAgPHN0cm9uZz57bmFtZX08L3N0cm9uZz4gKHt0eXBlfSwge3NpemV9IGJ5dGVzKVxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICApO1xyXG4gICAgICB9KX1cclxuICAgIDwvdWw+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXh0cmFjdEZpbGVJbmZvKGRhdGFVUkxzKSB7XHJcbiAgcmV0dXJuIGRhdGFVUkxzXHJcbiAgICAuZmlsdGVyKGRhdGFVUkwgPT4gdHlwZW9mIGRhdGFVUkwgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAubWFwKGRhdGFVUkwgPT4ge1xyXG4gICAgICBjb25zdCB7IGJsb2IsIG5hbWUgfSA9IGRhdGFVUkl0b0Jsb2IoZGF0YVVSTCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBzaXplOiBibG9iLnNpemUsXHJcbiAgICAgICAgdHlwZTogYmxvYi50eXBlLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNsYXNzIEZpbGVXaWRnZXQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgdmFsdWVzLCBmaWxlc0luZm86IGV4dHJhY3RGaWxlSW5mbyh2YWx1ZXMpIH07XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiBzaG91bGRSZW5kZXIodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UgPSBldmVudCA9PiB7XHJcbiAgICBjb25zdCB7IG11bHRpcGxlLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIHByb2Nlc3NGaWxlcyhldmVudC50YXJnZXQuZmlsZXMpLnRoZW4oZmlsZXNJbmZvID0+IHtcclxuICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgdmFsdWVzOiBmaWxlc0luZm8ubWFwKGZpbGVJbmZvID0+IGZpbGVJbmZvLmRhdGFVUkwpLFxyXG4gICAgICAgIGZpbGVzSW5mbyxcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICAgb25DaGFuZ2Uoc3RhdGUudmFsdWVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb25DaGFuZ2Uoc3RhdGUudmFsdWVzWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBtdWx0aXBsZSwgaWQsIHJlYWRvbmx5LCBkaXNhYmxlZCwgYXV0b2ZvY3VzLCBvcHRpb25zIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyBmaWxlc0luZm8gfSA9IHRoaXMuc3RhdGU7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIHJlZj17cmVmID0+ICh0aGlzLmlucHV0UmVmID0gcmVmKX1cclxuICAgICAgICAgICAgaWQ9e2lkfVxyXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkb25seSB8fCBkaXNhYmxlZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIlwiXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1cz17YXV0b2ZvY3VzfVxyXG4gICAgICAgICAgICBtdWx0aXBsZT17bXVsdGlwbGV9XHJcbiAgICAgICAgICAgIGFjY2VwdD17b3B0aW9ucy5hY2NlcHR9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8RmlsZXNJbmZvIGZpbGVzSW5mbz17ZmlsZXNJbmZvfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5GaWxlV2lkZ2V0LmRlZmF1bHRQcm9wcyA9IHtcclxuICBhdXRvZm9jdXM6IGZhbHNlLFxyXG59O1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIEZpbGVXaWRnZXQucHJvcFR5cGVzID0ge1xyXG4gICAgbXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcclxuICAgIF0pLFxyXG4gICAgYXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWxlV2lkZ2V0O1xyXG4iXX0=