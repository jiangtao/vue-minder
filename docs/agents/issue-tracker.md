# Issue Tracker：GitHub

项目 Issue、规格与 PRD 统一记录在 GitHub Issues，并使用 `gh` CLI 操作。

## 通用操作

- 创建：`gh issue create --title "..." --body "..."`
- 读取：`gh issue view <number> --comments`
- 列表：`gh issue list --state open --json number,title,body,labels,comments`
- 评论：`gh issue comment <number> --body "..."`
- 标签：`gh issue edit <number> --add-label "..."`
- 关闭：`gh issue close <number> --comment "..."`

仓库由当前 Git remote 推断。PR 不作为 triage 请求入口。

## 技能发布约定

当技能要求“发布到 Issue Tracker”时，创建一个 GitHub Issue；当技能要求获取相关票据时，读取对应 Issue 及其评论。

## Wayfinding 操作

- 地图：创建带 `wayfinder:map` 标签的 Issue。
- 子票：优先使用 GitHub Sub-issues API 关联地图；若仓库未启用，则在地图任务列表和子票正文中互相引用。
- 子票类型：使用 `wayfinder:research`、`wayfinder:prototype`、`wayfinder:grilling` 或 `wayfinder:task` 标签。
- 阻塞：优先使用 GitHub 原生 Issue dependencies；不可用时在正文写明 `Blocked by`。
- 领取：执行 `gh issue edit <number> --add-assignee @me`。
- 解决：先发布决策评论，再关闭子票，最后仅在地图的 “Decisions so far” 中追加决策摘要及链接。

## Pull requests as a triage surface

No. 外部 PR 不进入需求 triage 队列。
