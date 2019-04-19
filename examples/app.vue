<style lang="less">
  @import "~hotbox/less/hotbox.less";
</style>
<style scoped>
  nav {
    margin-bottom: 40px;
  }

  li {
    display: inline-block;
  }

  li + li {
    border-left: solid 1px #bbb;
    padding-left: 5px;
    margin-left: 5px;
  }

  .v-link-active {
    color: #bbb;
  }
</style>
<template>
  <router-view></router-view>
</template>
<script>
  export default {
    data: function() {
      return {};
    },
    ready: function() {

    },
    beforeDestroy: function() {

    },
    methods: {}
  };
</script>
