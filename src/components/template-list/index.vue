<template>
  <div class="dropdown template__list temp-panel">
    <div id="template-list" class="dropdown-toggle current-temp-item"
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
      toggle() {
        this.show = !this.show
        console.log(this.show)
      }
    },
    ready() {
      this.$nextTick(() => {
        this.minder = window.minder
        this.templateList = kityminder.Minder.getTemplateList()
        this.template = this.minder.queryCommandValue('template')
      })
    }
  }
</script>
