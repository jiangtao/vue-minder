# Vue Minder

[中文文档](./README.md)

## 1. Introduction

Vue Minder wraps Baidu's
[KityMinder Core](https://github.com/fex-team/kityminder-core) as a Vue
component for editing and displaying mind maps in Vue applications.

The project provides only these two release lines:

| Vue Minder | Vue | Status | Installation |
| --- | --- | --- | --- |
| `3.0.0` | `>= 3.2.25 < 4` | Current and maintained | `npm install vue-minder@^3` |
| `1.0.0` | `1.0.28` | Historical and unmaintained | [`vue-1.x-final` tag](https://github.com/jiangtao/vue-minder/tree/vue-1.x-final) |

## 2. Demo

- Vue Minder 3.0: [https://vue-minder.vercel.app](https://vue-minder.vercel.app)
- Vue Minder 1.x: the source is preserved at
  [`vue-1.x-final`](https://github.com/jiangtao/vue-minder/tree/vue-1.x-final),
  but its online demo is no longer maintained.

## 3. Installation

### Vue Minder 3.0

Vue 3 is a peer dependency. Install Vue Minder in an existing Vue 3 project:

```bash
npm install vue-minder@^3
```

For a new project, make sure Vue is at least `3.2.25`:

```bash
npm install vue@^3.2.25 vue-minder@^3
```

### Vue Minder 1.x

Pin the final 1.x package in a historical application:

```bash
npm install vue-minder@1.0.0
```

To inspect or build the matching source:

```bash
git clone https://github.com/jiangtao/vue-minder.git
cd vue-minder
git checkout vue-1.x-final
```

## 4. Usage

### Vue Minder 3.0: local component

Import the stylesheet explicitly. The component container needs
`position: relative` and an explicit height. `uniqueIndexFn` must return a
stable, unique value for every node.

```vue
<script setup>
import { ref } from 'vue'
import { Minder } from 'vue-minder'
import 'vue-minder/style.css'

const minderRef = ref(null)

const mindMap = {
  root: {
    data: { id: 1, name: 'Central topic' },
    children: [
      {
        data: { id: 2, name: 'Branch topic' },
        children: []
      }
    ]
  },
  template: 'default',
  theme: 'fresh-blue'
}

const uniqueIndexFn = (node) => node.data.id
const handleChange = (json) => console.log(json)
const exportJson = () => minderRef.value?.getExportJson()
</script>

<template>
  <div class="minder-host">
    <Minder
      ref="minderRef"
      :import-data="mindMap"
      :unique-index-fn="uniqueIndexFn"
      :enable="true"
      @content-change="handleChange"
    />
  </div>
</template>

<style scoped>
.minder-host {
  position: relative;
  height: 600px;
}
</style>
```

Node labels use `data.name`, not KityMinder's original `data.text` field.

### Vue Minder 3.0: global plugin

The default export is the Vue plugin. The named `Minder` export is the
component.

```js
import { createApp } from 'vue'
import VueMinder from 'vue-minder'
import 'vue-minder/style.css'
import App from './App.vue'

createApp(App).use(VueMinder).mount('#app')
```

After registration, use `<Minder />` directly in templates.

### Vue Minder 3.0: dynamic loading

Use an async component to load the complete Vue Minder JavaScript and CSS on
demand:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const Minder = defineAsyncComponent(async () => {
  await import('vue-minder/style.css')
  const module = await import('vue-minder')
  return module.Minder
})
</script>
```

The lazy-loading boundary is the complete component package. Internal
`src/runtime/*` modules are statically assembled into the bundle and cannot be
loaded independently. KityMinder requires browser DOM and SVG APIs; SSR
applications must import and render it inside a client-only boundary.

### Vue Minder 3.0: common APIs

| API | Description |
| --- | --- |
| `importData` | Initial mind-map object or JSON string |
| `enable` | Enables or disables editing |
| `showSearchBox` | Shows the search box |
| `showTemplate` | Shows the template selector |
| `showTheme` | Shows the theme selector |
| `showNavigator` | Shows navigation controls |
| `content-change` | Emits the complete mind-map JSON after a content change |
| `getExportJson()` | Exports the complete mind-map JSON |
| `getSelectedNode()` / `getSelectedNodes()` | Returns selected nodes |
| `setMemory()` / `getMemory(data)` | Saves or restores theme, template, and node state |

### Vue Minder 1.x: historical usage

Version 1.x uses Vue 1 plugin registration and `v-ref` syntax:

```js
import Vue from 'vue'
import VueMinder from 'vue-minder'

Vue.use(VueMinder)
```

```vue
<minder
  :import-data="mindMap"
  :unique-index-fn="generateIndex"
  :enable="true"
  v-ref:minder>
</minder>
```

Use the source and examples at
[`vue-1.x-final`](https://github.com/jiangtao/vue-minder/tree/vue-1.x-final)
as the authoritative historical reference.

## 5. MIT

The current Vue Minder 3.0 source is released under the
[MIT License](./LICENSE). `vue-1.x-final` is an immutable historical snapshot;
refer to the original `LICENSE` preserved in that tag for its licensing terms.
