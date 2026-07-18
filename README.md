# Vue Minder

[English documentation](./README.en.md)

## 1. 介绍

Vue Minder 将百度脑图的
[KityMinder Core](https://github.com/fex-team/kityminder-core) 封装为 Vue
组件，用于在 Vue 应用中编辑和展示思维导图。

本项目只提供以下两条版本线：

| Vue Minder | Vue | 状态 | 获取方式 |
| --- | --- | --- | --- |
| `3.0.0` | `>= 3.2.25 < 4` | 当前版本，持续维护 | `npm install vue-minder@^3` |
| `1.0.0` | `1.0.28` | 历史版本，不再维护 | [`vue-1.x-final` tag](https://github.com/jiangtao/vue-minder/tree/vue-1.x-final) |

## 2. 演示地址

- Vue Minder 3.0：[https://vue-minder.vercel.app](https://vue-minder.vercel.app)
- Vue Minder 1.x：代码固定保留在
  [`vue-1.x-final`](https://github.com/jiangtao/vue-minder/tree/vue-1.x-final)，
  不再维护线上演示。

## 3. 安装

### Vue Minder 3.0

Vue 3 是 peer dependency。已有 Vue 3 项目只需安装 Vue Minder：

```bash
npm install vue-minder@^3
```

新项目请同时确保 Vue 版本不低于 `3.2.25`：

```bash
npm install vue@^3.2.25 vue-minder@^3
```

### Vue Minder 1.x

历史项目可固定安装最后一个 1.x 包：

```bash
npm install vue-minder@1.0.0
```

如需查看或构建对应源码：

```bash
git clone https://github.com/jiangtao/vue-minder.git
cd vue-minder
git checkout vue-1.x-final
```

## 4. 说明

### Vue Minder 3.0：局部使用

必须显式导入样式。组件外层容器需要 `position: relative` 和明确高度；
`uniqueIndexFn` 必须为每个节点返回稳定且唯一的值。

```vue
<script setup>
import { ref } from 'vue'
import { Minder } from 'vue-minder'
import 'vue-minder/style.css'

const minderRef = ref(null)

const mindMap = {
  root: {
    data: { id: 1, name: '中心主题' },
    children: [
      {
        data: { id: 2, name: '分支主题' },
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

节点标题字段为 `data.name`，不是 KityMinder 原始数据中的 `data.text`。

### Vue Minder 3.0：全局注册

默认导出是 Vue 插件；具名导出 `Minder` 是组件。

```js
import { createApp } from 'vue'
import VueMinder from 'vue-minder'
import 'vue-minder/style.css'
import App from './App.vue'

createApp(App).use(VueMinder).mount('#app')
```

注册后可直接在模板中使用 `<Minder />`。

### Vue Minder 3.0：动态加载

可以使用异步组件按需加载完整的 Vue Minder JavaScript 和 CSS：

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

动态加载的边界是完整组件包。内部 `src/runtime/*` 模块会静态组装进产物，
不支持逐个运行时子模块动态加载。KityMinder 依赖浏览器 DOM 与 SVG；SSR 应用必须
在客户端边界内导入并渲染组件。

### Vue Minder 3.0：常用接口

| 接口 | 说明 |
| --- | --- |
| `importData` | 初始脑图对象或 JSON 字符串 |
| `enable` | 是否允许编辑 |
| `showSearchBox` | 是否显示搜索框 |
| `showTemplate` | 是否显示模板选择器 |
| `showTheme` | 是否显示主题选择器 |
| `showNavigator` | 是否显示导航控件 |
| `content-change` | 内容变化事件，参数为完整脑图 JSON |
| `getExportJson()` | 导出完整脑图 JSON |
| `getSelectedNode()` / `getSelectedNodes()` | 获取选中节点 |
| `setMemory()` / `getMemory(data)` | 保存或恢复主题、模板及节点状态 |

### Vue Minder 1.x：历史用法

1.x 使用 Vue 1 插件注册方式和 `v-ref` 语法：

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

完整的历史源码和示例以
[`vue-1.x-final`](https://github.com/jiangtao/vue-minder/tree/vue-1.x-final)
为准。

## 5. MIT

当前 Vue Minder 3.0 代码使用 [MIT License](./LICENSE) 发布。
`vue-1.x-final` 是不可变的历史快照，其授权以 tag 内保留的原始 `LICENSE` 为准。
