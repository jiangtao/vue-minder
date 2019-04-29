# Vue Minder

本组件主要内聚百度脑图的能力，使脑图可以便于在Vue生态下进行扩展。
[DEMO地址](http://hexyun.github.io/vue-minder)

--- 

Vue Minder 基于百度脑图核心代码[kityminder-core](https://github.com/fex-team/kityminder-core)和[kityminder-editor](https://github.com/fex-team/kityminder-editor)做的二次开发，主要满足在Vue项目中开发和使用。感谢[FEX Team](https://github.com/fex-team)

## 安装

```
yarn add vue-minder
npm install vue-minder
```

## 使用

<!--Vue百度脑图控件-->

```vue
<minder
  :show-search-box="showSearchBox"
  :show-template="showTemplate" 
  :show-theme="showTheme"  
  :show-navigator="showNavigator" 
  :enable="enable" :style="style" 
  :import-data="importData" 
  v-ref:minder>
</minder>
```

### props说明

- show-search-box 是否显示搜索框
- show-template 是否显示模板
- show-theme 是否显示主题
- show-navigator 是否显示导航器
- enable 禁用或编辑模式
- import-data 导入的数据

具体开发可参考 [./examples]

## 与百度脑图不同之处

- text 改为 name
       
## 开发和贡献

目前主要用于vue1.0项目中，感兴趣可升级为2.0版本，甚至以后3.0版本

## 版本规范

### 分支规范 

- master 为 vue1.0版本
- 2.x 为 vue2.x版本
- 3.x 为 vue3.x版本

### npm包规范

- 2.x 为vue2.x版本

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
