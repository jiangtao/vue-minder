webpackJsonp([6],{

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(591)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] examples/routers/poptip.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(592)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-7746a8b4/poptip.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ }),

/***/ 591:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};

/***/ }),

/***/ 592:
/***/ (function(module, exports) {

	module.exports = "\n<div style=\"margin: 100px\">\n    <Poptip trigger=\"hover\" placement=\"bottom\" title=\"提示标题\" content=\"提示内容\">\n        <i-button>hover 激活</i-button>\n    </Poptip>\n    <Poptip title=\"提示标题\" placement=\"bottom\" content=\"提示内容\">\n        <i-button>click 激活</i-button>\n    </Poptip>\n    <Poptip trigger=\"focus\" title=\"提示标题\" content=\"提示内容\">\n        <i-input type=\"textarea\"></i-input>\n        <!--<i-button>focus 激活</i-button>-->\n    </Poptip>\n    <Poptip trigger=\"focus\" placement=\"bottom\" title=\"提示标题\" content=\"提示内容\">\n        <i-input></i-input>\n    </Poptip>\n</div>\n";

/***/ })

});