<template>
  <div class="dropdown theme-panel theme__panel">
    <div v-click-out-side="hide" @click="show = !show" class="dropdown-toggle theme-item-selected">
      <a class="theme-item" :style="themeStyle" :title="value">{{ value | ml 'theme'}}</a>
      <span class="caret"></span>
    </div>
    <ul v-show="show" class="dropdown-menu theme-list">
      <li v-for="key in themeKeyList" class="theme-item-wrap">
        <a
          @click="changeTheme(key)"
          class="theme-item"
          :style="getThemeThumbStyle(key)"
          title="{{ key | ml 'theme' }}"
        >{{ key | ml 'theme'}}</a>
      </li>
    </ul>
  </div>
</template>
<style>
.theme__panel .dropdown-menu {
  display: block;
}
.theme__panel .theme-item-selected .caret {
  margin-left: 0;
}
</style>
<script>
import clickOutSide from "../../directives/clickoutside";

export default {
  props: {
    kityminder: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      themeKeyList: [
        "classic",
        "classic-compact",
        "fresh-blue",
        // 'fresh-blue-compat',
        "fresh-green",
        // 'fresh-green-compat',
        "fresh-pink",
        // 'fresh-pink-compat',
        "fresh-purple",
        // 'fresh-purple-compat',
        "fresh-red",
        // 'fresh-red-compat',
        "fresh-soil",
        // 'fresh-soil-compat',
        "snow",
        // 'snow-compact',
        // 'tianpan',
        // 'tianpan-compact',
        "fish"
      ],
      themeList: {},
      value: "fresh-blue"
    };
  },
  directives: {
    clickOutSide
  },
  computed: {
    themeStyle() {
      return this.getThemeThumbStyle(this.value);
    }
  },
  watch: {
    kityminder(v, oldV) {
      if(v !== oldV) {
        this.minder = v
        this.themeList = window.kityminder.Minder.getThemeList();
      }
    }
  },
  methods: {
    hide() {
      this.show = false;
    },
    getThemes() {
      if(window.kityminder.Minder) {
        return this.themeKeyList
      }
    },
    changeTheme(key, minder) {
      if(minder) {
        this.minder = minder
      }
      if (this.minder) {
        this.minder.enable();
        this.minder.execCommand("theme", key);
        this.value = this.minder.queryCommandValue("theme");
        if (!this.$parent.enable) {
          this.minder.disable();
        }
        this.show = false;
      }
    },
    getThemeThumbStyle(theme) {
      var themeObj = this.themeList[theme] || {};
      var style = {
        color: themeObj["root-color"],
        "border-radius": themeObj["root-radius"] / 2
      };

      if (themeObj["root-background"]) {
        style["background"] = themeObj["root-background"].toString();
      }
      return style;
    }
  }
};
</script>
