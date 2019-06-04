<template>
  <div class="dropdown template__list temp-panel">
    <div v-click-out-side="hide" id="template-list" class="dropdown-toggle current-temp-item"
         @click="toggle">
      <b :class="['temp-item', template]" :title="template"></b>
      <span class="caret"></span>
    </div>
    <ul v-show="show" class="dropdown-menu temp-list">
      <li v-for="(key, templateObj) in templateList" class="temp-item-wrap">
        <a @click="changeTemplate(key)" :class="['temp-item', key]" :class="{ 'temp-item-selected' : key == template }"
           title="{{ key }}"></a>
      </li>
    </ul>
  </div>
</template>
<style>
  .template__list .dropdown-menu {
    display: block;
  }
</style>
<script>
  import clickOutSide from '../../directives/clickoutside';

  export default {
    props: {
      kityminder: {
        type: Object
      }
    },
    data() {
      return {
        minder: this.kityminder,
        templateList: null,
        show: false,
        template: null
      };
    },
    directives: {
      clickOutSide
    },
    methods: {
      getTemplates() {
        if(window.kityminder.Minder) {
          return Object.keys(window.kityminder.Minder.getTemplateList())
        }
        return []
      },
      getTemplate() {
        return this.template
      },
      changeTemplate(key, minder) {
        if(minder) {
          this.minder = minder
        }
        if(this.minder) {
          this.minder.enable();
          this.minder.execCommand('template', key);
          this.template = this.minder.queryCommandValue('template');
          this.show = false;
          
          if(!this.$parent.enable) {
            this.minder.disable();
          }
        }
      },
      hide() {
        this.show = false;
      },
      toggle() {
        this.show = !this.show;
      }
    },
    watch: {
      kityminder(v, oldV) {
        if(v !== oldV) {
          this.minder = v
          if(this.minder) {
            const templateList = kityminder.Minder.getTemplateList();
            delete templateList.tianpan;
            this.templateList = templateList;
          }
        }
      }
    }
  };
</script>
