webpackJsonp([1],{

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(574)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] examples/routers/button.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(575)
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
	  var id = "_v-e8cea3a4/button.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ }),

/***/ 574:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {},
	    data: function data() {
	        return {
	            loading: false,
	            loading2: false,
	            model6: '',
	            cityList: [{
	                value: 'beijing',
	                label: '北京市'
	            }, {
	                value: 'shanghai',
	                label: '上海市'
	            }, {
	                value: 'shenzhen',
	                label: '深圳市'
	            }, {
	                value: 'hangzhou',
	                label: '杭州市'
	            }, {
	                value: 'nanjing',
	                label: '南京市'
	            }, {
	                value: 'chongqing',
	                label: '重庆市'
	            }],
	            model1: ''
	        };
	    },

	    methods: {
	        toLoading: function toLoading() {
	            this.loading = true;
	        },
	        toLoading2: function toLoading2() {
	            this.loading2 = true;
	        }
	    }
	};

/***/ }),

/***/ 575:
/***/ (function(module, exports) {

	module.exports = "\n<h4>基本</h4>\n<br><br>\n<div style=\"background: #f60\">\n    <input-number></input-number>\n    <Date-picker type=\"date\" placeholder=\"选择日期\" style=\"width: 100px;display: inline-block\"></Date-picker>\n    <i-input style=\"width: 100px\"></i-input>\n    <i-input type=\"text\" placeholder=\"Username\" style=\"width: 100px\">\n        <Icon type=\"ios-person-outline\" slot=\"prepend\"></Icon>\n    </i-input>\n    <i-button type=\"primary\">按钮</i-button>\n    <i-select :model.sync=\"model1\" style=\"width:200px\">\n        <i-option v-for=\"item in cityList\" :value=\"item.value\">{{ item.label }}</i-option>\n    </i-select>\n</div>\n<br><br>\n<i-button type=\"success\">按钮</i-button>\n<i-button type=\"warning\">按钮</i-button>\n<i-button type=\"error\">按钮</i-button>\n<i-button type=\"info\">按钮</i-button>\n<i-button icon=\"ios-search\" type=\"success\"></i-button>\n<br><br>\n<div style=\"width:400px\">\n    <i-button type=\"error\" long size=\"small\">按钮</i-button>\n</div>\n<br><br>\n<Button-group>\n    <i-button>取消</i-button>\n    <i-button type=\"primary\">确定</i-button>\n</Button-group>\n<Button-group>\n    <i-button disabled>昨日</i-button>\n    <i-button disabled>今日</i-button>\n    <i-button disabled>明日</i-button>\n</Button-group>\n<Button-group>\n    <i-button type=\"primary\">L</i-button>\n    <i-button>M</i-button>\n    <i-button type=\"ghost\">M</i-button>\n    <i-button type=\"dashed\">R</i-button>\n</Button-group>\n<br><br>\n<h4>配合图标</h4>\n<br><br>\n<Button-group>\n    <i-button type=\"primary\">\n        <Icon type=\"chevron-left\"></Icon>\n        前进\n    </i-button>\n    <i-button type=\"primary\">\n        后退\n        <Icon type=\"chevron-right\"></Icon>\n    </i-button>\n</Button-group>\n<Button-group>\n    <i-button type=\"primary\" icon=\"ios-skipbackward\"></i-button>\n    <i-button type=\"primary\" icon=\"ios-skipforward\"></i-button>\n</Button-group>\n<Button-group>\n    <i-button type=\"ghost\" icon=\"ios-color-wand-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-sunny-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-crop\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-color-filter-outline\"></i-button>\n</Button-group>\n<br><br>\n<h4>圆角</h4>\n<br><br>\n<Button-group shape=\"circle\">\n    <i-button type=\"primary\">\n        <Icon type=\"chevron-left\"></Icon>\n        前进\n    </i-button>\n    <i-button type=\"primary\">\n        后退\n        <Icon type=\"chevron-right\"></Icon>\n    </i-button>\n</Button-group>\n<Button-group shape=\"circle\">\n    <i-button type=\"primary\" icon=\"ios-skipbackward\"></i-button>\n    <i-button type=\"primary\" icon=\"ios-skipforward\"></i-button>\n</Button-group>\n<Button-group shape=\"circle\">\n    <i-button type=\"ghost\" icon=\"ios-color-wand-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-sunny-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-crop\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-color-filter-outline\"></i-button>\n</Button-group>\n<Button-group shape=\"circle\" size=\"large\">\n    <i-button type=\"primary\" icon=\"ios-skipbackward\"></i-button>\n    <i-button type=\"primary\" icon=\"ios-skipforward\"></i-button>\n</Button-group>\n<Button-group shape=\"circle\" size=\"large\">\n    <i-button type=\"ghost\" icon=\"ios-color-wand-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-sunny-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-crop\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-color-filter-outline\"></i-button>\n</Button-group>\n<Button-group shape=\"circle\" size=\"small\">\n    <i-button type=\"primary\" icon=\"ios-skipbackward\"></i-button>\n    <i-button type=\"primary\" icon=\"ios-skipforward\"></i-button>\n</Button-group>\n<Button-group shape=\"circle\" size=\"small\">\n    <i-button type=\"ghost\" icon=\"ios-color-wand-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-sunny-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-crop\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-color-filter-outline\"></i-button>\n</Button-group>\n\n<br><br>\n<h4>Vertical</h4>\n<br><br>\n\n<Button-group vertical>\n    <i-button>取消</i-button>\n    <i-button type=\"primary\">确定</i-button>\n</Button-group>\n<Button-group vertical>\n    <i-button>取消</i-button>\n    <i-button type=\"primary\">确定</i-button>\n</Button-group>\n<Button-group vertical>\n    <i-button disabled>昨日</i-button>\n    <i-button disabled>今日</i-button>\n    <i-button disabled>明日</i-button>\n</Button-group>\n<Button-group vertical>\n    <i-button type=\"primary\">L</i-button>\n    <i-button>M</i-button>\n    <i-button type=\"ghost\">M</i-button>\n    <i-button type=\"dashed\">R</i-button>\n</Button-group>\n<Button-group vertical>\n    <i-button type=\"primary\">\n        <Icon type=\"chevron-left\"></Icon>\n        前进\n    </i-button>\n    <i-button type=\"primary\">\n        后退\n        <Icon type=\"chevron-right\"></Icon>\n    </i-button>\n</Button-group>\n<Button-group vertical>\n    <i-button type=\"primary\" icon=\"ios-skipbackward\"></i-button>\n    <i-button type=\"primary\" icon=\"ios-skipforward\"></i-button>\n</Button-group>\n<Button-group vertical>\n    <i-button type=\"ghost\" icon=\"ios-color-wand-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-sunny-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-crop\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-color-filter-outline\"></i-button>\n</Button-group>\n<Button-group vertical size=\"large\">\n    <i-button type=\"primary\" icon=\"ios-skipbackward\"></i-button>\n    <i-button type=\"primary\" icon=\"ios-skipforward\"></i-button>\n</Button-group>\n<Button-group shape=\"circle\" vertical size=\"large\">\n    <i-button type=\"ghost\" icon=\"ios-color-wand-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-sunny-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-crop\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-color-filter-outline\"></i-button>\n</Button-group>\n<Button-group shape=\"circle\" vertical size=\"small\">\n    <i-button type=\"primary\" icon=\"ios-skipbackward\"></i-button>\n    <i-button type=\"primary\" icon=\"ios-skipforward\"></i-button>\n</Button-group>\n<Button-group shape=\"circle\" vertical size=\"small\">\n    <i-button type=\"ghost\" icon=\"ios-color-wand-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-sunny-outline\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-crop\"></i-button>\n    <i-button type=\"ghost\" icon=\"ios-color-filter-outline\"></i-button>\n</Button-group>\n\n<br><br>\n<i-button type=\"primary\" icon=\"ios-search\" shape=\"circle\" size=\"small\"></i-button>\n<i-button type=\"primary\" icon=\"ios-search\" shape=\"circle\"></i-button>\n<i-button type=\"primary\" icon=\"ios-search\" shape=\"circle\" size=\"large\"></i-button>\n<i-button type=\"primary\" icon=\"ios-search\" shape=\"circle\" size=\"small\">搜索</i-button>\n<i-button type=\"primary\" icon=\"ios-search\" shape=\"circle\">搜索</i-button>\n<i-button type=\"primary\" icon=\"ios-search\" shape=\"circle\" size=\"large\">搜索</i-button>\n<br><br>\n<i-button>Default</i-button>\n<i-button type=\"primary\">Primary</i-button>\n<i-button type=\"ghost\">Ghost</i-button>\n<i-button type=\"dashed\">Dashed</i-button>\n<i-button type=\"text\">文字按钮</i-button>\n<i-button type=\"text\" disabled>文字按钮</i-button>\n<br><br>\n<i-button type=\"primary\" size=\"large\">Large</i-button>\n<i-button type=\"primary\">Default</i-button>\n<i-button type=\"primary\" size=\"small\">Small</i-button>\n<br><br>\n<i-button>Default</i-button>\n<i-button disabled>Default(Disabled)</i-button>\n<br><br>\n<i-button type=\"primary\">Primary</i-button>\n<i-button type=\"primary\" disabled>Primary(Disabled)</i-button>\n<br><br>\n<i-button type=\"ghost\">Ghost</i-button>\n<i-button type=\"ghost\" disabled>Ghost(Disabled)</i-button>\n<br><br>\n<i-button type=\"dashed\">dashed</i-button>\n<i-button type=\"dashed\" disabled>dashed(Disabled)</i-button>\n<br><br>\n<i-button type=\"primary\" shape=\"circle\" icon=\"ios-search\"></i-button>\n<i-button type=\"primary\" icon=\"ios-search\">搜索</i-button>\n<br><br>\n<i-button type=\"ghost\" shape=\"circle\">\n    <Icon type=\"search\"></Icon>\n</i-button>\n<i-button type=\"ghost\">\n    <Icon type=\"search\"></Icon>\n    搜索\n</i-button>\n<i-button type=\"ghost\" shape=\"circle\" size=\"large\">\n    <Icon type=\"search\"></Icon>\n</i-button>\n<i-button type=\"ghost\" shape=\"circle\" size=\"small\">\n    <Icon type=\"search\"></Icon>\n</i-button>\n<br><br><br>\n<i-button type=\"primary\" loading>Loading...</i-button>\n<i-button type=\"primary\" loading size=\"large\">Loading...</i-button>\n<i-button type=\"primary\" loading size=\"small\">Loading...</i-button>\n<i-button type=\"primary\" :loading=\"loading\" @click=\"toLoading\">\n    <span v-if=\"!loading\">Click me!</span>\n    <span v-else>Loading...</span>\n</i-button>\n<i-button type=\"primary\" :loading=\"loading2\" icon=\"checkmark-round\" @click=\"toLoading2\">\n    <span v-if=\"!loading2\">Click me!</span>\n    <span v-else>Loading...</span>\n</i-button>\n<h4>基本</h4>\n<Button-group size=\"large\">\n    <i-button>取消</i-button>\n    <i-button type=\"primary\">确定</i-button>\n</Button-group>\n<Button-group>\n    <i-button type=\"primary\">L</i-button>\n    <i-button>M</i-button>\n    <i-button type=\"ghost\">R</i-button>\n    <i-button type=\"dashed\">R</i-button>\n</Button-group>\n<h4>配合图标</h4>\n<Button-group>\n    <i-button type=\"primary\">\n        <Icon type=\"chevron-left\"></Icon>\n        前进\n    </i-button>\n    <i-button type=\"primary\">\n        后退\n        <Icon type=\"chevron-right\"></Icon>\n    </i-button>\n</Button-group>\n<Button-group>\n    <i-button type=\"primary\" icon=\"cloud\"></i-button>\n    <i-button type=\"primary\" icon=\"upload\"></i-button>\n</Button-group>\n";

/***/ })

});