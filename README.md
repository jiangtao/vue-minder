# Vue Minder

Vue Minder 将百度脑图的 KityMinder Core 封装为 Vue 组件，用于在 Vue 应用中编辑和展示思维导图。

> 当前默认与维护方向为 Vue 3：`master` 和 `3.x` 均承载 Vue 3 代码。Vue 1
> 历史代码固定保留在 `vue-1.x-final` tag；Vue 2 停止支持。

## 中文使用说明

### 版本状态

| 分支 / 版本 | Vue 版本 | 状态 |
| --- | --- | --- |
| `master` | Vue 3.2.25–3.x | 默认分支与当前稳定代码 |
| `3.x` | Vue 3.2.25–3.x | Vue 3 发布与维护分支 |
| `2.x` | Vue 2 | 暂不支持，不建议使用 |
| `vue-1.x-final` tag | Vue 1 | 历史快照，不再维护 |

### 当前可用状态

`3.x` 已可用于 Vue `3.2.25` 至当前 Vue 3.x 的浏览器端应用，包的
`peerDependencies` 为 `vue: ^3.2.25`。当前已验证以下使用边界：

- 具名组件与默认插件导出可被消费项目正确解析；
- 通过 `import()` / `defineAsyncComponent()` 动态加载组件；
- 同时动态加载组件 JavaScript 与 `vue-minder/style.css`；
- 从本地 tarball 安装后，在最低支持版本 Vue `3.2.25` 的消费项目中完成 Vite 生产构建。

精确的 Vue `3.0.x` 不能使用当前产物：新版 Vue SFC 编译器生成的运行时辅助函数
在 Vue 3.0 中尚不存在。请先将宿主应用升级到 Vue `3.2.25` 或更高的 Vue 3.x 版本。

Vue 3 正式包发布为 `vue-minder@3.0.0`，`latest` 指向当前 Vue 3 稳定版本。

### 安装

直接从 npm 安装 Vue 3 版本：

```bash
npm install vue-minder@^3
```

如需从源码构建本地安装包：

```bash
git clone https://github.com/jiangtao/vue-minder.git
cd vue-minder
npm ci
npm run build:lib
npm pack
```

然后在你的 Vue 3 项目中安装生成的压缩包：

```bash
npm install /path/to/vue-minder/vue-minder-3.0.0.tgz
```

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

### 应用级运行时动态加载

可以使用 Vue 的异步组件在首次渲染时才加载编辑器。下面的写法会同时延迟加载
组件代码和样式，适合路由级按需加载：

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const Minder = defineAsyncComponent(async () => {
  await import('vue-minder/style.css')
  const module = await import('vue-minder')
  return module.Minder
})

const mindMap = {
  root: {
    data: { id: 1, name: '中心主题' },
    children: []
  },
  template: 'default',
  theme: 'fresh-blue'
}

const uniqueIndexFn = (node) => node.data.id
</script>

<template>
  <div class="minder-host">
    <Minder
      :import-data="mindMap"
      :unique-index-fn="uniqueIndexFn"
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

如果希望页面出现前就完成样式加载，可继续在应用入口静态导入
`vue-minder/style.css`，只对组件 JavaScript 使用动态导入。

KityMinder 运行时需要 `window`、`document` 和 SVG DOM。Vite SPA 可以直接使用上述
写法；Nuxt 等 SSR 应用应将组件放入客户端专用边界，并确保动态导入只在客户端执行。

这里的“动态加载”是指宿主应用按需加载完整的 Vue Minder JavaScript/CSS chunk。
编辑器内部的 `src/runtime/*` 模块仍会静态组装进产物，不支持逐个 runtime 子模块动态加载。

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

Vue Minder wraps Baidu's KityMinder Core as a Vue mind-map editor. Vue 3 is
the active line on both `master` and `3.x`. Vue 1 is preserved by the
`vue-1.x-final` tag, and Vue 2 is unsupported.

### Current status

The `3.x` line can be used in browser-based applications from Vue `3.2.25`
through the current Vue 3.x line. Its peer dependency is `vue: ^3.2.25`.
Named/default exports, JavaScript/CSS code splitting, and a production consumer
build using the minimum supported Vue `3.2.25` are covered by the build tests.

Vue `3.0.x` is not compatible with the current bundle because it does not
provide runtime helpers emitted by the modern Vue SFC compiler. Upgrade the
host application to Vue `3.2.25` or a newer Vue 3.x release.

The Vue 3 package is published as `vue-minder@3.0.0`, and `latest` points to
the current stable Vue 3 release.

### Installation

Install the Vue 3 package from npm:

```bash
npm install vue-minder@^3
```

To build a local package from source:

```bash
git clone https://github.com/jiangtao/vue-minder.git
cd vue-minder
npm ci
npm run build:lib
npm pack
```

Install the generated tarball in your Vue 3 application:

```bash
npm install /path/to/vue-minder/vue-minder-3.0.0.tgz
```

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

### Application-level runtime loading

Use an async component to load both the editor runtime and its stylesheet when
the component is rendered for the first time:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const Minder = defineAsyncComponent(async () => {
  await import('vue-minder/style.css')
  const module = await import('vue-minder')
  return module.Minder
})

const mindMap = {
  root: {
    data: { id: 1, name: 'Central topic' },
    children: []
  },
  template: 'default',
  theme: 'fresh-blue'
}

const uniqueIndexFn = (node) => node.data.id
</script>

<template>
  <div class="minder-host">
    <Minder
      :import-data="mindMap"
      :unique-index-fn="uniqueIndexFn"
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

For eager styling, import `vue-minder/style.css` in the application entry and
only load the component JavaScript dynamically. KityMinder requires browser
DOM APIs; SSR applications must place it behind a client-only boundary and run
the dynamic import on the client.

This loads the complete Vue Minder JavaScript/CSS chunks on demand. Internal
`src/runtime/*` modules remain statically assembled into the library bundle and
cannot be loaded individually.

## License

See [LICENSE](./LICENSE).
