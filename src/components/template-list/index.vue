<template>
  <div class="dropdown template__list temp-panel">
    <div v-click-out-side="hide" id="template-list" class="dropdown-toggle current-temp-item"
        @click="toggle">
      <b :class="['temp-item', template]"  title="{{template}}"></b>
      <span class="caret"></span>
    </div>
    <ul v-show="show" class="dropdown-menu temp-list">
      <li v-for="(key, templateObj) in templateList" class="temp-item-wrap">
        <a @click="change(key)" :class="['temp-item', key]" :class="{ 'temp-item-selected' : key == template }" title="{{ key }}"></a>
      </li>
    </ul>
  </div>
</template>
<style>
  .template__list .dropdown-menu{
    display: block; 
  }
</style>
<script>
  import clickOutSide from '../../directives/clickoutside'
  export default  {
    props: {},
    data() {
      return {
        minder: null,
        templateList: null,
        show: false,
        template: null
      }
    },
    directives: {
      clickOutSide
    },
    methods: {
      change(key){
        if(this.minder) {
          this.minder.enable()
          this.minder.execCommand('template', key)
          this.template = this.minder.queryCommandValue('template')
          this.show = false
          if(!this.$parent.enable) {
            this.minder.disable()
          }
        }
      },
      hide() {
        this.show = false
      },
      toggle() {
        this.show = !this.show
      }
    },
    ready() {
      this.$nextTick(() => {
        this.minder = window.minder
        const templateList = kityminder.Minder.getTemplateList()
        delete templateList.tianpan
        this.templateList = templateList
        this.template = this.minder.queryCommandValue('template')
      })
    }
  }
</script>
