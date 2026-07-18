# Vue Minder

Vue Minder 将百度脑图的 KityMinder Core 封装为 Vue 组件，用于在 Vue 应用中编辑和展示思维导图。

> 当前维护方向为 Vue 3。由于前端技术栈迭代较快，Vue 2 版本暂不支持，也没有可安装的 2.x 正式版本；旧版 `master` 仅作为 Vue 1 历史代码保留。

## 中文使用说明

### 版本状态

| 分支 / 版本 | Vue 版本 | 状态 |
| --- | --- | --- |
| `3.x` | Vue 3 | 当前开发与维护版本 |
| `2.x` | Vue 2 | 暂不支持，不建议使用 |
| `master` / 1.x | Vue 1 | 历史版本，不再维护 |

### 安装

3.x 尚未发布到 npm。请先从源码构建本地安装包：

```bash
git clone --branch 3.x --single-branch https://github.com/jiangtao/vue-minder.git
cd vue-minder
npm install
npm run build:lib
npm pack
```

然后在你的 Vue 3 项目中安装生成的压缩包：

```bash
npm install /path/to/vue-minder/vue-minder-3.0.0.tgz
```

3.x 正式发布后可改用：

```bash
npm install vue-minder@^3
```

在 3.x 发布前，请不要使用 `vue-minder@latest` 安装 Vue 3 版本；npm 上当前的 latest 仍可能指向历史版本。

### 局部注册组件（推荐）

```vue
<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { Minder } from 'vue-minder'
import 'vue-minder/style.css'

const minderRef = ref(null)
const editable = ref(true)

const mindMap = {
  root: {
    data: {
      id: 1,
      name: '中心主题'
    },
    children: [
      {
        data: {
          id: 2,
          name: '分支主题'
        },
        children: []
      }
    ]
  },
  template: 'default',
  theme: 'fresh-blue'
}

// 必须为每个节点返回稳定且唯一的值。
const uniqueIndexFn = (node) => node.data.id

const handleChange = (json) => {
  console.log('脑图内容已更新：', json)
}

const exportJson = () => minderRef.value?.getExportJson()
const getSelectedNodes = () => minderRef.value?.getSelectedNodes() ?? []

onBeforeUnmount(() => {
  // 需要持久化展开状态、主题和模板时主动保存。
  minderRef.value?.setMemory()
})
</script>

<template>
  <div class="minder-host">
    <Minder
      ref="minderRef"
      :import-data="mindMap"
      :unique-index-fn="uniqueIndexFn"
      :enable="editable"
      :show-search-box="true"
      memory-suffix="demo"
      @content-change="handleChange"
    />
  </div>
</template>

<style scoped>
.minder-host {
  position: relative;
  width: 100%;
  height: 600px;
}
</style>
```

组件内部采用绝对定位，因此外层容器需要设置 `position: relative` 和明确高度。

### 全局注册插件

默认导出是 Vue 插件，不是组件本身：

```js
import { createApp } from 'vue'
import VueMinder from 'vue-minder'
import 'vue-minder/style.css'
import App from './App.vue'

createApp(App)
  .use(VueMinder)
  .mount('#app')
```

注册后可在模板中直接使用 `<Minder />`。

### 数据格式

节点标题使用 `data.name`。每个节点由 `data` 和 `children` 组成，其他业务字段会随 JSON 一起保留：

```js
const data = {
  root: {
    data: {
      id: 1,
      name: '中心主题',
      expandState: 'expand'
    },
    children: []
  },
  template: 'default',
  theme: 'fresh-blue'
}
```

`importData` 在组件挂载时读取。组件挂载后如需重新导入，可通过底层实例调用：

```js
minderRef.value.minder.importJson(nextData)
```

### 常用 Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `uniqueIndexFn` | `Function` | 必填 | 返回节点稳定且唯一的标识，用于展开和选择状态记忆 |
| `importData` | `Object \| String` | - | 初始脑图数据；字符串必须是合法 JSON |
| `enable` | `Boolean` | `true` | 是否允许编辑 |
| `showSearchBox` | `Boolean` | `false` | 是否显示搜索框 |
| `showTemplate` | `Boolean` | `true` | 是否显示模板选择器 |
| `showTheme` | `Boolean` | `true` | 是否显示主题选择器 |
| `showNavigator` | `Boolean` | `true` | 是否显示缩放和导航控件 |
| `showBreadcrumb` | `Boolean` | `false` | 只读模式下是否显示面包屑 |
| `memorySuffix` | `String` | `''` | 多实例使用 localStorage 时的键名后缀 |

`remember`、`showNote` 和 `showHotBox` 为兼容旧 API 保留。当前版本如需保存状态，请显式调用 `setMemory()`。

### 事件和组件方法

内容变化时组件触发 `content-change`，参数为当前完整 JSON。

通过模板 ref 可调用：

| 方法 / 属性 | 说明 |
| --- | --- |
| `getExportJson()` | 导出当前完整脑图 JSON |
| `getSelectedNode()` | 获取当前选中的单个节点 |
| `getSelectedNodes()` | 获取当前选中的节点数组 |
| `setMemory()` | 保存主题、模板、展开状态和选中状态 |
| `getMemory(data)` | 将已保存的状态合并到数据中 |
| `minder` | 底层 KityMinder 实例，供高级命令和事件使用 |

### 开发与验证

```bash
npm run dev          # 启动 Vue 3 演示站点
npm test             # 验证 library 与 site 构建契约
npm run build:lib    # 输出 dist/minder.es.js、dist/minder.min.js 和 CSS
npm run build:site   # 输出可部署站点到 dist-site
npm run preview:site # 本地预览生产站点
```

## English Usage Guide

Vue Minder wraps Baidu's KityMinder Core as a Vue mind-map editor. Vue 3 is the active development line. Vue 2 is currently unsupported, and `master` is retained only as the historical Vue 1 line.

### Installation

Version 3 has not been published to npm yet. Build a local package from the `3.x` branch:

```bash
git clone --branch 3.x --single-branch https://github.com/jiangtao/vue-minder.git
cd vue-minder
npm install
npm run build:lib
npm pack
```

Install the generated tarball in your Vue 3 application:

```bash
npm install /path/to/vue-minder/vue-minder-3.0.0.tgz
```

After the official release, use `npm install vue-minder@^3`. Until then, do not assume that `vue-minder@latest` provides Vue 3.

### Local component registration

```vue
<script setup>
import { ref } from 'vue'
import { Minder } from 'vue-minder'
import 'vue-minder/style.css'

const minderRef = ref(null)
const mindMap = {
  root: {
    data: { id: 1, name: 'Central topic' },
    children: []
  },
  template: 'default',
  theme: 'fresh-blue'
}

const uniqueIndexFn = (node) => node.data.id
const handleChange = (json) => console.log(json)
</script>

<template>
  <div class="minder-host">
    <Minder
      ref="minderRef"
      :import-data="mindMap"
      :unique-index-fn="uniqueIndexFn"
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

Import `vue-minder/style.css` explicitly. Node labels use `data.name`, and `uniqueIndexFn` must return a stable unique value for every node.

### Global plugin registration

The default export is the Vue plugin; the named `Minder` export is the component:

```js
import { createApp } from 'vue'
import VueMinder from 'vue-minder'
import 'vue-minder/style.css'
import App from './App.vue'

createApp(App).use(VueMinder).mount('#app')
```

The component emits `content-change` with the complete JSON document. Its public ref exposes `getExportJson()`, `getSelectedNode()`, `getSelectedNodes()`, `setMemory()`, `getMemory(data)`, and the low-level `minder` instance.

## License

See [LICENSE](./LICENSE).
