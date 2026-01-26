import kity from 'kity';
import kityminder from 'kityminder-core';
import Editor from './components/editor/index.vue';
import './module/imageicon'

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

export default Object.assign(MindEditor, {install});
export { Editor as Minder, install };
