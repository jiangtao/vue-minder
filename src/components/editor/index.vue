<template>
  <div class="minder-editor-container">
    <div v-if="lazy && showTopTab && showTop" class="top-tab minder-top-tab minder__top-tab">
      <template-list v-if="lazy && showTemplate" class="template__list inline-directive"></template-list>
      <theme-list class="theme-list" v-if="lazy && showTheme"></theme-list>
      <search v-if="lazy" class="search__box"></search>
      <breadcrumb :unique-index-fn="uniqueIndexFn" v-if="lazy && showBreadcrumb && !enable"
                  class="breadcrumb__box"></breadcrumb>
    </div>
    <div v-el:editor class="minder-editor"></div>
    <navigator
      @open-top="openTop"
      v-if="lazy && showNavigator"
      class="navigator">
    </navigator>
  </div>
</template>
<style>
  .template__list,
  .theme__panel {
    float: left;
  }

  .minder__top-tab {
    position: relative;
    z-index: 3;
  }
</style>
<script>
  import '../../filter/lang';
  import Editor from '../../editor';
  import Navigator from '../navigator/index.vue';
  import Search from '../search/index.vue';
  import TemplateList from '../template-list/index.vue';
  import ThemeList from '../theme-list/index.vue';
  import Breadcrumb from '../breadcrumb/index.vue';
  import memory from '../../services/memory';

  const EXPAND_MEMORY = '__EXPAND_MEMORY__';
  const THEME_MEMORY = '__THEME_MEMORY__';
  const TEMPLATE_MEMORY = '__TEMPLATE_MEMORY__';
  const SELECTED_MEMORY = '__SELECTED_MEMORY__';

  export default {
    name: 'mind-editor',
    components: {
      Navigator,
      Search,
      TemplateList,
      ThemeList,
      Breadcrumb
    },
    props: {
      showSearchBox: {
        type: Boolean,
        default: false
      },
      uniqueIndexFn: {
        type: Function
      },
      showTemplate: {
        type: Boolean,
        default: true
      },
      showTheme: {
        type: Boolean,
        default: true
      },
      showNote: {
        type: Boolean,
        default: false
      },
      showHotBox: {
        type: Boolean,
        default: false
      },
      showBreadcrumb: {
        type: Boolean,
        default: false
      },
      showNavigator: {
        type: Boolean,
        default: true
      },
      remember: {
        type: Boolean,
        default: true
      },
      importData: [String, Object],
      enable: {
        default: true,
        type: Boolean
      },
      memorySuffix: {
        default: '',
        type: String
      }
    },
    data() {
      return {
        editor: null,
        minder: null,
        lazy: false, // confirm the minder is loaded
        showTop: true,
        showSearch: this.showSearchBox,
        memory: {},
        themeMemory: `${THEME_MEMORY}${this.memorySuffix}`,
        templateMemory: `${TEMPLATE_MEMORY}${this.memorySuffix}`,
        expandMemory: `${EXPAND_MEMORY}${this.memorySuffix}`,
        selectedMemory: `${SELECTED_MEMORY}${this.memorySuffix}`
      };
    },
    computed: {
      showTopTab() {
        return this.showSearch || this.showTheme || this.showTemplate || this.showBreadcrumb;
      }
    },
    watch: {
      enable(val, old) {
        if(val != old) {
          val ? this.minder.enable() : this.minder.disable();
        }
      },
    },
    ready() {
      var self = this;
      this.$nextTick(() => {
        var editor = window.editor = new Editor(this.$els.editor);
        var importData = this.importData;
        if(typeof importData === 'string') {
          try {
            importData = JSON.parse(importData);
          } catch(e) {
            importData = JSON.parse(window.localStorage.__dev_minder_content);
            console.warn('hex minder import data format error');
          }
        }
        
        editor.minder.importJson(this.getMemory(importData));
        editor.minder.on('contentchange', function() {
          var json = editor.minder.exportJson();
          self.$emit('content-change', json);
        });
        // editor.minder.on('import', () => this.selectNodes())
        window.minder = window.km = editor.minder;
        this.editor = editor;
        this.minder = minder;
        if(!this.enable) this.minder.disable();
        this.lazy = true;
      });
    },
    methods: {
      selectNodes() {
        let selectedNodes = [], id
        let selecteds = memory.get(this.selectedMemory)
        if(!selecteds.length) return
        this.minder.getRoot().traverse(node => {
          if(id = this.uniqueIndexFn(node)) {
            selecteds.indexOf(id) > -1 && selectedNodes.push(node)
          }
        })
        this.minder.select(selectedNodes, true)
        selecteds.length = 0
      },
      getMemory(data) {
        if(!data) return
        const expands = this.get();
        if(!expands || Object.keys(expands).length === 0) return data;
        const template =  memory.get(this.templateMemory)
        const theme =  memory.get(this.themeMemory)
        data.template = template
        data.theme = theme
        
        const walk = (node, expands, level = 0) => {
          if(node && node.data) {
            if(level === 0) {
              node.data.expandState = 'expand'
            } else {
              node.data.expandState =  expands[this.uniqueIndexFn(node)] ? 'expand' : 'collapse'
            }
          }
          if(Array.isArray(node.children)) node.children.forEach(n => walk(n, expands, level + 1))
        }
        walk(data.root, expands, 0);
        return data
      },
      setMemory() {
        memory.set(this.templateMemory, this.minder.getTemplate());
        memory.set(this.themeMemory, this.minder.getTheme());
        const selecteds = this.minder.getSelectedNodes().map(this.uniqueIndexFn)
        memory.set(this.selectedMemory, selecteds)
        this.minder.getRoot().traverse(n => {
          const k = this.uniqueIndexFn(n);
          // fix: confirm unique index always exists
          if(k) {
            if(n.isExpanded()) {
              this.set(k, n.isExpanded() ? 1 : 0)  
            } else {
              if(this.get(k)) this.delete(k)
            }
          }
        });
      },
      delete(k) {
        const data = memory.get(this.expandMemory) || {};
        delete data[k]
        memory.set(this.expandMemory, data);
      },
      set(k, v) {
        const data = memory.get(this.expandMemory) || {};
        data[k] = v;
        memory.set(this.expandMemory, data);
      },
      get(k) {
        const data = memory.get(this.expandMemory);
        if(!k) return data;
        return (data || {})[k] || false;
      },
      openTop(show) {
        this.showTop = show;
      },
      getExportJson() {
        return this.minder.exportJson();
      },
      getSelectedNode() {
        return this.minder.getSelectedNode();
      },
      getSelectedNodes() {
        return this.minder.getSelectedNode();
      }
    }
  };
</script>
