# Vue Minder

本组件主要内聚百度脑图的能力，使脑图可以便于在Vue生态下进行扩展。
[DEMO地址](https://www.imjiangtao.com/vue-minder/#!/editor)

---

Vue Minder 基于百度脑图核心代码[kityminder-core](https://github.com/fex-team/kityminder-core)，主要满足在Vue项目中开发和使用。感谢[FEX Team](https://github.com/fex-team)

## 版本说明

- **3.x** - Vue 3.x 版本 (当前分支)
- **2.x** - Vue 2.x 版本
- **master** - Vue 1.x 版本 (历史版本)

## 安装 (Vue 3)

```bash
npm install vue-minder@latest
# 或
yarn add vue-minder@latest
```

## 使用 (Vue 3)

### Composition API 写法

```vue
<template>
  <minder
    ref="minderRef"
    :show-search-box="showSearchBox"
    :show-template="showTemplate"
    :show-theme="showTheme"
    :show-navigator="showNavigator"
    :enable="enable"
    :style="style"
    :import-data="importData"
    :unique-index-fn="uniqueIndexFn"
    @content-change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import Minder from 'vue-minder'

const showSearchBox = ref(false)
const enable = ref(true)
const style = ref({ width: '1000px', height: '600px' })

const uniqueIndexFn = (node) => `_${node.data.id || node.data._id}`

const handleChange = (json) => {
  console.log('Content changed:', json)
}
</script>
```

### Options API 写法

```vue
<template>
  <minder
    ref="minder"
    :show-search-box="showSearchBox"
    :show-template="showTemplate"
    :show-theme="showTheme"
    :show-navigator="showNavigator"
    :enable="enable"
    :style="style"
    :import-data="importData"
    :unique-index-fn="uniqueIndexFn"
    @content-change="handleChange"
  />
</template>

<script>
import Minder from 'vue-minder'

export default {
  components: {
    Minder
  },
  data() {
    return {
      showSearchBox: false,
      enable: true,
      style: { width: '1000px', height: '600px' }
    }
  },
  methods: {
    uniqueIndexFn(node) {
      return `_${node.data.id || node.data._id}`
    },
    handleChange(json) {
      console.log('Content changed:', json)
    }
  }
}
</script>
```

### props说明

- show-search-box 是否显示搜索框
- show-template 是否显示模板
- show-theme 是否显示主题
- show-navigator 是否显示导航器
- enable 禁用或编辑模式
- import-data 导入的数据

[具体使用可参考](./examples)

## 与百度脑图不同之处

- 数据中的字段 text 改为 name
       
## 开发和贡献

Vue Minder 现已支持 Vue 3.x 版本，欢迎提交 Issue 和 Pull Request。

## 版本规范

### 分支规范

- **3.x** - Vue 3.x 版本 (当前默认版本)
- **2.x** - Vue 2.x 版本
- **master** - Vue 1.x 版本 (历史版本，不再维护)

### npm包规范

- **3.x** 版本为 Vue 3.x 最新版本
- 如需使用 Vue 2.x 版本，请使用 `vue-minder@2.x`

## 文件说明

```
├── __test__  测试dist包运行
├── assets 资源文件
├── build build脚本
├── dist 生产环境目录
├── docs 预览demo目录
├── examples 预览demo源码，便于本地开发
├── src 核心源代码
```
## 更新日志

### v3.0.0
- 升级到 Vue 3.x
- 使用 Vite 替代 Webpack 构建工具
- 支持 Composition API 和 Options API
- 更新依赖项到最新版本

## TODO
- [x] 升级到 Vue 3.x
- [ ] 支持更多主题和模板
- [ ] 优化性能和用户体验
