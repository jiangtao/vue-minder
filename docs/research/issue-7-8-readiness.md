# Issue 7/8 调研：Vue 3 可交付现状、主页发布与分支切换

> 调研日期：2026-07-18<br>
> 调研范围：[Issue 7「Vue3: support Vue3」](https://github.com/jiangtao/vue-minder/issues/7)、[Issue 8「bug: homePage cannot visit」](https://github.com/jiangtao/vue-minder/issues/8)、[Wayfinder 调研票](https://github.com/jiangtao/vue-minder/issues/10)<br>
> 证据范围：本地 Git 历史与源码、GitHub REST API、Vue/Vite/Vercel/GitHub 官方文档。本文只作调查与决策建议，不含产品实现。

## 结论

本地 `3.x` 已完成“构建骨架和主要示例迁到 Vue 3”的工作，但尚不能据此关闭 Issue 7：构建成功并不等于浏览器可用，源码仍含会破坏 Vue 3 行为的 Vue 1 API，旧测试页也没有迁移，当前没有自动化运行时验收。

Issue 8 的根因不是单一域名故障。远端仍只发布 `master:/docs` 的 Vue 1 静态产物，而本地 `3.x` 的 `vite build` 被固定为 library mode，只生成库文件，不生成可由 Vercel 托管的 `index.html`。正确路径是把“npm 库构建”和“演示站点构建”拆成两个明确命令，让 Vercel 只执行站点构建并发布其独立输出目录。

`master` 无需改名或合并：保持它指向现有 1.x 历史，单独推送 `3.x`，先完成 Preview 验收，再显式把 Vercel Production Branch 与 GitHub default branch 都改为 `3.x`。Vercel 的 Production Branch 必须显式设置，不能假定它会跟随 GitHub default branch。

## 一手状态快照

### 远端 GitHub

GitHub REST API 在调研时返回：

| 项目 | 可验证状态 | 一手来源 |
| --- | --- | --- |
| 默认分支 | `master` | [Repository API](https://api.github.com/repos/jiangtao/vue-minder) |
| 远端分支 | 只有未保护的 `master`，SHA 为 `b4cbaec72624f0fe761f7cc5286cec193cb3a571` | [Branches API](https://api.github.com/repos/jiangtao/vue-minder/branches) |
| GitHub Pages | legacy build，来源为 `master:/docs`，未启用 HTTPS enforcement | [Pages API](https://api.github.com/repos/jiangtao/vue-minder/pages) |
| Repository homepage | `https://www.imjiangtao.com/vue-minder` | [Repository API](https://api.github.com/repos/jiangtao/vue-minder) |
| Issue 状态 | Issue 7、Issue 8 均为 open | [Issue 7 API](https://api.github.com/repos/jiangtao/vue-minder/issues/7)、[Issue 8 API](https://api.github.com/repos/jiangtao/vue-minder/issues/8) |

2026-07-18 的直接 HTTP 探测结果：旧 HTTPS 地址返回非正常 `444`，旧 HTTP 地址返回 `404`，`https://vue-minder.vercel.app/` 返回 `404`。这与 Issue 8 的用户报告一致，但域名响应会随外部状态变化，应在发布验收时重新探测。

### 本地分支关系

本地 `master...3.x` 的左右提交数为 `0 10`，即 `master` 是 `3.x` 的祖先，`3.x` 在其上顺序增加 10 个提交，没有从另一条历史反向分叉。关键节点：

- `master`：`b4cbaec72624f0fe761f7cc5286cec193cb3a571`
- `3.x` / 本地 `v3.0.0`：`dcbe6a693345914e0b5c3a8c842571b40e6c73ec`
- 迁移提交范围：`1d1093a` 至 `dcbe6a6`

复核命令：

```bash
git rev-list --left-right --count master...3.x
git log --reverse --oneline master..3.x
git diff --stat master...3.x
```

## `3.x` 已完成的迁移

1. **依赖与包版本已指向 Vue 3。** [package.json](../../package.json) 将版本设为 `3.0.0`，`vue` peer dependency 设为 `^3.0.0`，开发依赖使用 Vue 3、Vue Router 4、Vite 5 与 `@vitejs/plugin-vue`。
2. **主构建工具已由 Webpack 1 切为 Vite。** [Vite 配置](../../vite.config.ts) 能从组件入口生成 ES 与 UMD 库文件，并将 Vue externalize；旧 Webpack 配置已删除。
3. **主要编辑器组件已做第一轮 Vue 3 适配。** [编辑器组件](../../src/components/editor/index.vue) 已把 `ready` 改为 `mounted`、`v-ref`/`v-el` 改为标准 `ref`，并声明 `content-change` emit；相关导航、搜索、模板、主题与自定义指令也有迁移提交。
4. **示例应用已切到 Vue 3 启动方式。** [示例入口](../../examples/main.js) 使用 `createApp`、Vue Router 4 与 hash history，示例编辑器也使用 `beforeUnmount`。
5. **文档已声明 3.x 使用方式。** [README](../../README.md) 提供 Composition API 与 Options API 示例，并解释 1.x/2.x/3.x 维护线。
6. **库构建可以完成。** 在 Node `v26.3.1`、npm `11.16.0` 下，以无 lockfile 的全新安装执行 `npm run build` 成功，产出 `dist/minder.es.js`、`dist/minder.min.js` 和 `dist/style.css`。

这些事实说明迁移已有实质进展，但只证明“可编译”，没有证明公开组件行为和发布物完整。

## 尚未完成且可验证的差距

### P0：Vue 3 运行时兼容性尚未闭环

1. [语言 filter 模块](../../src/filter/lang.js) 仍在模块加载时调用 `Vue.filter(...)`，并被主编辑器无条件导入。Vue 官方明确说明 filters 在 Vue 3 已移除，应改为方法、计算属性或 app globalProperties；这不是风格问题，而是不存在的 API。[Vue 3 Migration Guide: Filters](https://v3-migration.vuejs.org/breaking-changes/filters)
2. [面包屑组件](../../src/components/breadcrumb/index.vue) 仍使用 Vue 1 的 `ready`、`beforeDestroy`，且数组 `v-for="(index, item) in list"` 保留 Vue 1 参数次序。Vue 官方 Vue 1→2 指南要求用 `mounted` 替代 `ready`；Vue 3 又将 `beforeDestroy` 改名为 `beforeUnmount`。[Vue 1→2 lifecycle migration](https://v2.vuejs.org/v2/guide/migration?redirect=true#Lifecycle-Hooks)、[Vue 3 breaking changes](https://v3-migration.vuejs.org/breaking-changes/)
3. [旧测试页](../../__test__/index.html) 仍加载 `vue@1.0.28`、使用 `new Vue`、`v-ref` 与 Vue 1 `ready`；[package.json](../../package.json) 已没有 `test`、`lint` 或 typecheck 脚本，仓库也没有 CI workflow。当前没有证据证明 Vue 3 挂载、数据导入、内容事件、搜索、主题、模板、导航、记忆与公开实例方法能工作。
4. 库构建存在 Rollup 警告：`kity` 和 `kityminder-core` 没有被识别为 default export，同时入口混用 named/default exports。虽未使本次构建失败，但应通过消费端 smoke test 判定真实 ESM/UMD 可用性，不能忽略警告后直接发布。

### P0：主页没有可部署的生产产物

1. [Vite 配置](../../vite.config.ts) 对所有非 dev 命令都启用 `build.lib`。Vite 官方说明 library mode 使用 JS library entry；常规站点则以 `index.html` 为应用入口。因此当前 `npm run build` 只生成库 bundle，不会把根 [index.html](../../index.html) 输出到 `dist`。[Vite production build / library mode](https://vite.dev/guide/build)、[Vite build.lib](https://vite.dev/config/build-options#build-lib)
2. 样式任务先生成 `dist/styles/minder.css`，随后 Vite 默认清空 `dist`。实测最终 `dist` 只有三个文件，完整的 `dist/styles/minder.css` 已消失；根 `index.html` 却仍请求 `/styles/minder.css`。dev server 对该请求返回 HTML fallback（`Content-Type: text/html`），不是 CSS。
3. [docs 目录](../../docs/index.html) 最后一次由 `1.0.0` 提交 `a66c1c2` 生成，仍是 Vue 1 Webpack 产物。GitHub Pages 正在发布它，因此即使旧域名恢复，也不会成为 Issue 7 所需的 Vue 3 主页。
4. 当前没有 `vercel.json`，远端也没有 `3.x`，`vue-minder.vercel.app` 返回 404；因此 Vercel 尚无可从远端构建的 Vue 3 生产来源。

### P1：发布可重复性与声明不一致

1. 仓库没有 npm lockfile；本次安装成功不能保证下一次解析到相同的 Git 与 npm 依赖。
2. `npm pack --dry-run` 包含旧 `docs`、旧 `__test__`、完整 examples/src 等大量非目标文件；3.x 删除了 master 的 `files: ["dist", "src"]` 白名单。需要重新决定 npm 包边界。
3. [README](../../README.md) 已宣称 `3.x` 是默认版本/默认分支，但 GitHub API 的事实仍是 `master`，且远端不存在 `3.x`。
4. 当前远端 `master` 未保护；在切换默认分支前后，都缺少防误删与防 force-push 的保护。

## 决策：正确的 Vite/Vercel 主页交付方式

### 1. 将库与站点分成两个构建目标

建议保留一个 Vite 配置，但按 mode 明确区分：

- `build:lib`：启用 `build.lib`，入口为公共 npm API，输出到 `dist`。
- `build:site`：**不设置** `build.lib`，让根 `index.html` 成为应用入口，输出到独立目录，例如 `dist-site`。
- `build` 可作为 CI 聚合命令依次执行测试、`build:lib` 与 `build:site`，但 Vercel 只执行 `build:site`。

Vite 将 HTML 作为应用模块图入口，并会处理其中引用的 JS/CSS；这是站点构建与 library mode 的官方边界。[Vite: index.html and project root](https://vite.dev/guide/#index-html-and-project-root)、[Vite: building for production](https://vite.dev/guide/build)

完整 LESS 必须进入可重复的构建图，不能继续依赖“先写进 `dist`、再由 Vite 清空”的顺序。可接受实现是由站点/库入口导入样式并让 Vite 提取，或让样式任务直接写入各自最终目录且不再被后续步骤清理。库还应为完整 CSS 提供稳定的 package export；Vite 官方 library-mode 示例也为 CSS 暴露独立 export。[Vite library mode](https://vite.dev/guide/build#library-mode)

### 2. 固化 Vercel 的构建与输出目录

在仓库提交 `vercel.json`（或设置完全等价的 Project Settings），至少固定：

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build:site",
  "outputDirectory": "dist-site"
}
```

Vercel 官方支持在项目配置中覆盖 output directory；显式配置可避免把 npm 库目录 `dist` 误当主页发布物。[Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json#outputdirectory)、[Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)

当前示例使用 hash history，因此 `/#!/editor` 或 `/#/editor` 的路由状态在 fragment 中，不需要 SPA fallback rewrite。主页应改用根相对 URL；目标域名是 `vue-minder.vercel.app`，不应再配置 GitHub Pages 子路径 `/vue-minder/` 的 Vite `base`。

### 3. 显式把 Vercel Production Branch 设为 `3.x`

Vercel 新项目选择 Production Branch 的优先级是 `main`、其次 `master`、最后才是仓库 default branch；本仓库保留 `master`，所以仅修改 GitHub default branch 并不足以保证 Vercel 发布 `3.x`。Vercel 支持在 Project Settings 中选择任意 production branch，必须显式填 `3.x`。[Vercel Git deployments: Production Branch](https://vercel.com/docs/git#production-branch)

## 决策：保留 `master` 为 1.x、推广 `3.x` 的安全顺序

1. **冻结基线。** 记录远端 `master=b4cbaec...` 与远端 `1.0` tag，禁止对 `master` 做 merge、rename、delete 或 force-push。本次不需要从 `3.x` 回合并到 `master`。
2. **在本地 `3.x` 完成 P0 修复与最高层验收。** 至少覆盖 Vue 3 应用挂载、mind-map 首屏渲染、导入/导出、`content-change`、公开 ref 方法、面包屑可选路径、库消费 smoke test、站点产物与完整 CSS。
3. **正常推送 `3.x` 为新远端分支。** 不改写 `master`。确认 GitHub Branches API 能看到两个分支且 SHA 符合预期。
4. **先做 Vercel Preview。** 将项目连接到该仓库，用 `build:site -> dist-site` 从 `3.x` 生成 Preview；验证页面、静态资源 MIME、浏览器 console、核心交互和刷新。Vercel 的非生产分支会生成 Preview deployment，可在切生产前验证。[Vercel Git deployments](https://vercel.com/docs/git)
5. **设置保护。** 为 `master` 与 `3.x` 禁止删除和 force-push；`3.x` 绑定构建/测试检查。保护规则可防止重要分支被强推或删除。[GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
6. **切 GitHub default branch 到 `3.x`，不重命名 `master`。** GitHub 明确允许在已有多个分支时选择默认分支；这会改变新 clone、PR 和 commit 的默认基线，但不会删除旧分支。[GitHub: Changing the default branch](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch)
7. **显式设置 Vercel Production Branch=`3.x` 并发布已验收提交。** 验证 `https://vue-minder.vercel.app/` 返回 200，HTML、JS、CSS 均为正确 MIME，`/#/editor` 可操作。
8. **最后切入口。** 将 GitHub repository homepage 更新为 Vercel URL；确认新站稳定后再停用旧 GitHub Pages/custom-domain 配置，避免两个发布源竞争或先下线后上线。
9. **发布 npm 3.x 另设闸门。** 仅在消费端 smoke test、包内容检查与版本/tag/远端分支一致后发布；此动作不应与“切默认分支”捆绑为不可回滚的一步。

该顺序的回滚面清晰：默认分支可切回，Vercel 可重新指向上一生产部署，而 `master` 始终保留原 SHA 和 1.x 内容。

## 建议验收清单

- `npm ci`（提交 lockfile 后）、自动测试、library build、site build 全部通过。
- `dist` 含约定的 ESM/UMD 与完整 CSS；干净消费项目可导入并挂载组件。
- `dist-site/index.html` 存在；所有 HTML/JS/CSS/图片请求返回 2xx 和正确 `Content-Type`。
- Vue 3 页面无 `Vue.filter`、失效 lifecycle、模板参数次序等 console error/warning。
- 核心编辑器行为和 README 公开 API 有浏览器级测试。
- GitHub 远端同时存在 `master` 与 `3.x`；默认分支为 `3.x`；`master` SHA 未改变。
- Vercel Production Branch 明确为 `3.x`；`vue-minder.vercel.app` 对已验收 SHA 提供生产页面。
- GitHub homepage 指向 Vercel；旧 Pages 仅在新站验证后退出。

## English summary

The local `3.x` branch contains a real first-pass Vue 3/Vite migration and can produce library bundles, but it is not release-ready: Vue 1 runtime APIs remain, automated Vue 3 behavior tests are absent, the legacy `docs` and `__test__` artifacts still target Vue 1, and the current Vite production configuration always builds a library rather than a deployable HTML site. Separate library and site builds, make CSS part of their reproducible build graph, deploy the site output to Vercel, preview it from the pushed `3.x` branch, then explicitly set both Vercel's Production Branch and GitHub's default branch to `3.x`. Keep `master` unchanged as the 1.x line throughout.
