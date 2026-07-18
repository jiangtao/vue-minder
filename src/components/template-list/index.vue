<template>
  <div class="dropdown template__list temp-panel">
    <div v-click-out-side="hide" id="template-list" class="dropdown-toggle current-temp-item"
         @click="toggle">
      <b :class="['temp-item', template]" :title="template"></b>
      <span class="caret"></span>
    </div>
    <ul v-show="show" class="dropdown-menu temp-list">
      <li v-for="key in templateKeys" :key="key" class="temp-item-wrap">
        <a @click="changeTemplate(key)" :class="['temp-item', key, { 'temp-item-selected': key == template }]"
           :title="key"></a>
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
      },
      enable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        minder: this.kityminder,
        templateKeys: [],
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
      syncTemplate(key) {
        this.template = key;
      },
      syncMinder(minder) {
        this.minder = minder;
        this.templateKeys = this.getTemplates().filter(key => key !== 'tianpan');
        if(this.minder) {
          this.template = this.minder.queryCommandValue('template');
        }
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

          if(!this.enable) {
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
          this.syncMinder(v);
        }
      }
    },
    mounted() {
      this.syncMinder(this.kityminder);
    }
  };
</script>
