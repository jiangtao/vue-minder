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
  props: {},
  data() {
    return {
      show: false,
      minder: null,
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
      themeList: null,
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
  ready() {
    this.$nextTick(() => {
      this.minder = window.minder;
      this.themeList = window.kityminder.Minder.getThemeList();
    });
  },
  methods: {
    hide() {
      this.show = false;
    },
    changeTheme(key) {
      if (this.minder) {
        this.minder.enable();
        this.minder.execCommand("theme", key);
        this.value = minder.queryCommandValue("theme");
        if (!this.$parent.enable) {
          this.minder.disable();
        }
        this.show = false;
      }
    },
    getThemeThumbStyle(theme) {
      if (!this.minder) return {};
      var themeObj = this.themeList[theme];
      if (!themeObj) {
        return {};
      }
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
