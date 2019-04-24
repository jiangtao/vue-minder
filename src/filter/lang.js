import Vue from 'vue'
// minder lang 
Vue.filter('ml', function(value, key, lang = 'zh-CN') {
  const conf = require(`../locale/lang/minder/${lang}.js`)
  return conf[key][value]
})
