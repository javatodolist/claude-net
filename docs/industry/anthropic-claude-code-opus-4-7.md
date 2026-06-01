---
title: Anthropic 一边升级 Claude Code 一边开始查证件 这波更新真正可怕的不是 Opus 4 7
description: Anthropic 一边升级 Claude Code 一边开始查证件 这波更新真正可怕的不是 Opus 4 7。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-16
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Anthropic 一边升级 Claude Code 一边开始查证件 这波更新真正可怕的不是 Opus 4 7

![Banner](/assets/images/localized/inews.gtimg.com-5efd2a51cf8f.png)

## 写在前面
Anthropic 最近的更新速度，已经快到让人有点跟不上的程度。

一边是 Claude Opus 4.7 最快可能本周上线，还有一款类似 Lovable 的 AI 设计工具正在酝酿；另一边，Claude 又开始在部分使用场景里加入身份验证。新能力还在往外放，平台治理和使用门槛也在同步收紧。

把这些更新连起来看，更值得注意的已经不是某一个新模型，而是 Anthropic 正在同时推进三件事：继续推高能力上限、把 Claude Code 做成真正的任务工作台、以及用更严格的规则管理整个平台。

---

## 先收紧，再继续加速：Anthropic 开始把“谁在使用”放到台前
这波最先引发讨论的，不是桌面端改版，也不是 Routines，而是身份验证。

Anthropic 在帮助中心新增了身份验证说明，明确表示在某些能力调用、平台完整性检查，以及安全与合规要求相关的场景里，用户需要完成身份验证。已经有用户发现，在 Claude 内尝试订阅 Max 时，会直接触发这套流程。

![身份验证说明](/assets/images/localized/inews.gtimg.com-bff59efb8b84.png)

官方给出的理由也很直接：强大的技术要被负责任地使用，平台需要知道“谁在使用”。这件事带来的变化不只是多了一道验证步骤，而是说明 Claude 的治理逻辑正在变得更像一个正式平台，而不只是一个模型产品。

与此同时，The Information 的消息显示，Anthropic 还在准备下一个旗舰模型 Claude Opus 4.7，以及一款能用自然语言生成网站、演示文稿和落地页的 AI 设计工具。消息传出后，Adobe、Wix 和 Figma 的股价在几小时内跌超 2%。

放在一起看，Anthropic 这波动作已经很清楚：一边继续加速发新东西，一边开始把平台规则收紧。

---

## Claude Code 桌面端大改版，方向就是从工具走向工作台
身份验证之外，同一天更直接影响开发者的，是 Claude Code 桌面端的大改版。

Anthropic 重新设计了桌面版 Claude Code。新版不只是把界面重新摆了一遍，而是把原本散落在不同软件里的能力进一步收回到一个统一工作区里。

![Claude Code 桌面端改版](/assets/images/localized/inews.gtimg.com-a31e7d1d54cd.png)

这次新增和强化的能力包括：

- 一个窗口内并行运行多个 Claude 会话
- 左侧边栏统一管理会话
- 集成终端
- 文件编辑
- HTML / PDF 预览
- 更快的 diff 查看器
- 拖拽式布局

新版桌面端把 Chat、Cowork 和 Code 分类栏移到了左侧边栏顶部，多会话并排也统一交给左侧边栏管理。现在一个窗口里就能同时跑多个 Claude Code 对话，还能通过拖拽分屏或置顶不同任务。

![多会话与工作台化](/assets/images/localized/inews.gtimg.com-5479e2a66b49.png)

更关键的是，终端、文件编辑、HTML 和 PDF 预览都已经内置，原本需要在浏览器、编辑器和终端之间来回切换的操作，被尽量收进了同一个界面里。diff 视图也更接近 Git 的查看方式，开发者可以更快看到每次改动的具体差异。

再往前看一步，Claude Code 里被拖来拖去的也不再只是文件，而是一个个正在运行的任务和 Agent。桌面端这次改版的方向非常明确：它想做的不是传统意义上的 IDE 插件，而是一个围绕任务执行展开的 Agent 工作台。

---

## Routines 来了，电脑关掉之后，Claude Code 还能继续跑
桌面端之外，这次另一个关键更新是 Routines。

![Routines 功能示意](/assets/images/localized/inews.gtimg.com-676ec9d8e3a4.png)

Routines 本质上是一个保存在云端的 Claude Code 配置包，里面包括提示词、代码仓库、连接器和运行环境。重点不只是“定时执行”，而是这些任务可以直接跑在 Anthropic 的 Web 基础设施上，不依赖本地 Mac 在线。

换句话说，很多原本得守着电脑做、或者至少得让本机挂着的事情，现在都可以交给 Claude Code 在后台自己跑。电脑合上了，任务也不会停。

![Routines 触发方式](/assets/images/localized/inews.gtimg.com-c55434a8863f.jpg)

Routines 目前有三种触发方式：

1. **定时触发**：按小时、每天、工作日、每周，或者用 cron 自定义
2. **API 触发**：外部系统发一个 HTTP POST 就能拉起任务
3. **GitHub 触发**：PR、push、issue、workflow run 等事件发生时自动执行

![Routines 与网页端](/assets/images/localized/inews.gtimg.com-779ea8990d20.png)

这三种触发方式分别对应三类很实际的场景。定时触发适合每天夜里跑日志整理、给新 issue 贴标签、分配负责人，第二天早上把摘要发给团队；API 触发适合接进现有工具链里，比如监控系统发现错误率异常后，直接拉起 Routine，让 Claude 抓上下文并给出修复建议；GitHub 触发则更贴近代码协作流程，可以在 PR、push 或 workflow run 发生时自动执行审查和验证。

同一个 Routine 还可以叠加多种触发方式。也就是说，一个任务既能每天定时跑，也能在事件触发时跑，还能被脚本手动拉起。它对应的正是那类重复、规律、无人值守、结果相对明确的工作流。

这也是 Routines 最现实的价值所在。像代码审查、部署验证、文档修复、日志整理、issue 分拣这类事情，人工当然也能做，但通常枯燥、容易忘，而且不值得每次都让工程师手动盯着。Routines 做的就是把这些流程自动化。

---

## 次数限制和定价调整，说明 Agent 工作流的成本真的上来了
Routines 目前只对 Pro、Max、Team 和 Enterprise 用户开放，而且每天都有次数限制。

- Pro：每天最多运行 5 个 routines
- Max：每天最多运行 15 个
- Team / Enterprise：每天最多运行 25 个

![Routines 次数限制](/assets/images/localized/inews.gtimg.com-e4758e827710.png)

这个限制本身已经说明，Agent 型能力和普通聊天不是一个成本结构。只要任务开始持续访问代码仓库、调用工具、响应 GitHub 事件、处理更长链路的流程，算力消耗就会明显上升。

Anthropic 最近也调整了企业版的定价逻辑，不再主要按席位收费，而是在每月每用户 20 美元基础上，再按实际 AI 使用量收费。对 150 人以上、重度使用 Claude Code 和 Claude Cowork 的团队来说，部分客户成本可能翻倍，甚至涨到 3 倍。

Uber CTO Praveen Neppalli Naga 也透露，2026 年才过去几个月，Uber 就已经用完了一整年的 AI 预算，核心原因就是 AI 编程工具使用量飙升，尤其是 Claude Code。

![Anthropic 成本压力](/assets/images/localized/inews.gtimg.com-301d7e5ce1ec.png)

这几件事放在一起看，方向就更清楚了：Anthropic 还在继续推模型能力、开发者工作流和通用生产力工具，但同时也必须处理更现实的成本压力、配额限制和平台风控。能力扩张、治理收紧和商业化调整，几乎是在同一时间发生的。

---

## Claude Code 现在更像什么？更像一个以任务为中心的 Agent 工作台
如果现在还把 Claude Code 理解成“终端里能聊天的 Claude”，这个理解已经有点不够了。

更准确地说，它正在变成一个以任务为中心的自主编程 Agent 工作台。它不只是补全代码，也不只是回答问题，而是可以读仓库、搜文件、改代码、执行命令、查看 diff、管理多个会话，并把这些能力进一步延伸到定时执行、事件触发和后台运行。

从这次更新的组合来看，身份验证解决的是“谁在用”；桌面端改版解决的是“人在电脑前时，怎么把多条任务线收进同一个工作区”；Routines 解决的则是“人不在电脑前时，谁来继续把事情做下去”。

常见订阅里，Claude Pro 一般是 20 美元/月，Max 会更高，而更高档位通常也对应更多调用额度和更强使用上限。结合这次开放范围、次数限制和计费变化也能看出来，Anthropic 已经把 Claude Code 放在高频生产使用的开发工具位置上。

不过说实话，官方订阅对国内用户不太友好——需要海外信用卡，网络环境也得折腾。如果嫌麻烦想找个更省事的渠道，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

### 1. Anthropic 为什么开始加身份验证？
主要是出于平台完整性、安全与合规要求。在部分高敏感场景里，Anthropic 需要确认是谁在使用 Claude，这也是平台治理加强的一部分。

### 2. Claude Code 桌面端这次改版最核心的变化是什么？
不是某一个按钮的位置变了，而是整个产品继续从“工具”往“工作台”迁移。多会话并行、侧边栏统一管理、集成终端、文件编辑、HTML / PDF 预览、diff 视图和拖拽布局，本质上都在服务同一件事：让用户在一个界面里同时管理多条任务线。

### 3. Routines 和普通的 cron、CI 任务有什么区别？
cron 和 CI 更擅长执行预先写好的固定步骤，而 Routines 带着 Claude 的理解能力去跑任务。它不只是按顺序执行命令，还能结合代码仓库、提示词和上下文输出结果。

### 4. Routines 适合用来做哪些事？
典型场景主要集中在开发流程里，比如代码审查、部署验证、文档修复、日志整理、issue 分拣和负责人分配。凡是重复、规律、结果相对明确，又不值得每次手工盯着做的事情，都适合先交给它。

### 5. 这次传出的 Opus 4.7 和 AI 设计工具，意味着什么？
这说明 Anthropic 不只是在推进模型本身，也在同步扩展开发者工作流和通用生产力工具。市场看到的也不只是单个新功能，而是软件生产方式正在继续变化。

### 6. 国内开发者如果想更方便地用上 Claude Code 怎么办？
如果走官方订阅路线，通常要处理支付和网络环境这些现实问题。国内用户可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。
