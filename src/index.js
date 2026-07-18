import 'kity';
import 'kityminder-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import Editor from './components/editor/index.vue';
import './module/imageicon'
import './styles/editor.less'

const MindEditor = {
  Minder: Editor
};

const install = function(app) {
  Object.keys(MindEditor).forEach((key) => {
    app.component(key, MindEditor[key]);
  });
};

export default Object.assign(MindEditor, {install});
export { Editor as Minder, install };
