<template>
    <svg>{{getIcon(name)}}</svg>
</template>
<script>
  import icons from './icons';

  export default {
    name: 'icon',
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        icons: icons
      };
    },
    methods: {
      addIcon(name, svg) {
        if(!this.icons[name]) {
          this.icons[name] = {name, svg};
        } else {
          console.warn(`svg ${name} icon is exists`)
        }
      },
      getIcon(name) {
        return this.icons[name]
      }
    }
  };
</script>
