import kity from 'kity';
import kityminder from 'kityminder-core';
import Editor from './components/editor';

const MindEditor = {
  Minder: Editor
};

const install = function(Vue, opts = {}) {
  Object.keys(MindEditor).forEach((key) => {
    Vue.component(key, MindEditor[key]);
  });
};

// auto install
if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = Object.assign(MindEditor, {install});   // eslint-disable-line no-undef
