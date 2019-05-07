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
  import Navigator from '../navigator/index';
  import Search from '../search/index';
  import TemplateList from '../template-list/index';
  import ThemeList from '../theme-list/index';
  import Breadcrumb from '../breadcrumb/index';

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
        default: true
      },
      showNavigator: {
        type: Boolean,
        default: true
      },
      importData: [String, Object],
      enable: {
        default: true,
        type: Boolean
      }
    },
    data() {
      return {
        editor: null,
        minder: null,
        lazy: false, // confirm the minder is loaded
        showTop: true,
        showSearch: this.showSearchBox
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
        editor.minder.importJson(importData);

        editor.minder.on('contentchange', function() {
          var json = editor.minder.exportJson();
          self.$emit('content-change', json);
        });
        window.minder = window.km = editor.minder;
        this.editor = editor;
        this.minder = minder;
        if(!this.enable) this.minder.disable();
        this.lazy = true;
      });
    },
    methods: {
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
