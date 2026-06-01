---
title: Anthropic 官方 Harness 发布：全面解读 Managed Agents
description: Anthropic 官方 Harness 发布：全面解读 Managed Agents。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-10
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - 国内使用
  - AI编程
---

# Anthropic 官方 Harness 发布：全面解读 Managed Agents

![Claude Managed Agents 架构，来自官方产品博客](/assets/images/localized/api.ibos.cn-a53592176270.png)

## 写在前面

Anthropic 发布 Claude Managed Agents 的同时，配套发了一篇工程博客，标题叫「Scaling Managed Agents: Decoupling the brain from the hands」。

产品博客讲的是"你能用它做什么"，工程博客讲的是"为什么要这样设计"。两篇放在一起，才能看清楚这次发布真正在做的事。

表面上是一个 Agent 托管平台，本质上是 Anthropic 产品形态的一次质变：它不再只是卖模型的，开始卖跑 Agent 的基础设施了。从「模型提供商」到「Agent 基础设施提供商」，这个转变值得细说。

---

## 企业自己搭 Agent，这条路有多难走

在 Managed Agents 之前，如果一家企业想基于 Claude 做一个能真正在生产环境里用的 Agent，它需要自己解决一堆问题：

沙箱怎么隔离、容器怎么管、状态存在哪、上下文超了怎么办、Agent 中途崩了怎么恢复、多个工具并发调用怎么协调、权限怎么收敛……

这些基础设施工作，有时候比 Agent 本身的业务逻辑还要重。很多团队被卡在这里，从 demo 到真正上线，中间那段路上倒下的项目不计其数——不是模型不够好，是基础设施太难搭。

Managed Agents 要填的就是这个空。

---

## 技术架构：把大脑和手分开

这是这次发布中最值得细读的部分。

Anthropic 工程博客的核心观点可以用一句话概括：

&gt; **Harness 编码的是模型做不到什么的假设，这些假设会过时。**

具体什么意思？举个例子：Sonnet 4.5 在接近上下文限制时会提前收工，Anthropic 在 Harness 里加了上下文重置来应对，这个行为他们叫「context anxiety」。但换到 Opus 4.5 之后，这个焦虑消失了，之前加的重置逻辑反而变成了多余的负担。

这说明一个问题：如果 Harness 的实现跟某个模型的特定行为深度绑定，每次模型升级就得跟着改 Harness。所以他们的设计目标是：**为「尚未想到的程序」设计系统**，就像操作系统通过虚拟化硬件来支持还不存在的程序一样——接口比实现活得久。

### 三层虚拟化

Managed Agents 把 Agent 的运行拆成三个解耦的接口：

- **Session（会话）**：所有事件的追加写入日志，持久存储在 Harness 之外
- **Harness（编排循环）**：调用 Claude、把 Claude 的工具调用路由到对应基础设施的循环
- **Sandbox（执行环境）**：Claude 可以在里面跑代码和编辑文件的容器

三者互相独立，任何一个出故障或需要替换，都不影响其他两个。

![大脑与双手解耦的架构](/assets/images/localized/api.ibos.cn-f7513cbe84e4.png)

### 从宠物到牲畜

最早的设计把所有组件放在一个容器里，文件操作是直接系统调用，没有服务边界，看起来很省事。但坏处是：容器变成了一只「宠物」——宠物坏了你得救它，不能直接换。

![耦合 vs 解耦：从宠物到牲畜](/assets/images/localized/api.ibos.cn-78165d865de2.png)

解耦之后，容器变成了「牲畜」。Harness 通过统一接口 `execute(name, input) → string` 调用容器，就像调用其他工具一样。容器挂了，Harness 捕获错误传给 Claude，Claude 决定是否重试，重试起一个新容器就行。

Harness 本身也变成了牲畜。Session 日志存在 Harness 之外，Harness 崩溃什么都不丢。新的 Harness 实例通过 `wake(sessionId)` 启动，从上次停下的地方继续。

安全边界也因此变干净了。之前耦合设计里，Claude 生成的不可信代码跟凭证在同一个容器里。解耦后，凭证永远不进沙箱——Git 令牌在初始化时写入本地 remote，Agent 不经手；OAuth 令牌存在安全保管库，通过代理调用。

### Session 不是上下文窗口

长任务经常超出模型的上下文窗口，常规的做法是压缩、裁剪、总结——但这些都是不可逆操作，可能把后面用得上的信息丢掉。

![Session 与上下文窗口的关系](/assets/images/localized/api.ibos.cn-f38dabe1c996.png)

Managed Agents 的解法是：Session 作为一个独立的、持久化的上下文对象存在于上下文窗口之外。Harness 通过 `getEvents()` 按需取回事件流的切片，可以回到特定时刻之前重读上下文，不需要一次性全塞进去。

### 解耦带来的性能提升

解耦之前，Harness 在容器里，每个 Agent 会话都要等容器起好才能开始推理。解耦之后，推理可以在容器启动之前就开始。

结果是：**p50 首 token 时延（TTFT）下降约 60%，p95 下降超过 90%。**

![多大脑多双手](/assets/images/localized/api.ibos.cn-28d916a9870f.png)

因为「手」（工具调用）不绑定特定「大脑」，大脑之间可以互相传递手，多个 Agent 可以共享同一批工具接口。Anthropic 把这套架构叫 meta-harness：不对具体的 Harness 实现做假设，只对 Claude 需要的接口形状做假设。

---

## 谁在用，用出了什么结果

- **Rakuten**：五个部门接入，Agent 通过 Slack 和 Teams 接活，每个专项 Agent **一周内部署完成**
- **Sentry**：原有调试 Agent（Seer）负责分析根因，现在接上了后半段——Claude 写补丁、开 PR，整个集成**从零到上线只用了几周**，而非原预估的几个月
- **Notion**：数十个任务并行，工程师用它写代码，知识工作者用它生成网页和 PPT
- **Asana**：构建了 AI Teammates，在项目管理流程里跟人类并肩接任务
- **Atlassian**：把 Agent 接进了 Jira 工作流，用户可以在 Jira 中直接把任务分配给 Agent

Notion 产品经理 Eric Liu 的说法：
&gt; 「我们希望 Notion 成为团队与 Agent 协作、把事情做完的最佳场所。Claude Managed Agents 能处理长时间运行的 Session、管理记忆、持续输出高质量结果。」

---

## Managed Agents 是什么，怎么用，怎么收费

Claude Managed Agents 是一套可组合的 API，用于在云上构建和部署长时间运行的 AI Agent。它的核心不是模型本身，而是围绕模型的那套执行层——沙箱、状态管理、权限控制、错误恢复全部托管，你只需要定义 Agent 要干什么。

**能力清单：**

- 生产级沙箱：云容器预装 Python、Node.js、Go，支持网络访问规则配置和文件挂载
- 长时间 Session：Agent 自主运行几小时，断连自动恢复，进度持久化
- 内置 Harness：自动处理工具调用决策、上下文管理、错误恢复，内置 prompt caching 和 compaction 优化
- 治理工具：作用域权限、身份管理、执行追踪，Claude Console 内置 Session 分析，每一个工具调用和决策点都可查

**研究预览阶段（需单独申请）：**

- `outcomes`：定义成功标准，让 Agent 自我评估迭代。内部测试中结构化文件生成任务成功率比标准 prompting 提高最多 **10 个百分点**，在难题上提升最明显
- `multiagent`：一个 Agent 启动其他 Agent，分配子任务并行处理
- `memory`：跨 Session 的持久记忆

**定价：**

- 标准 Claude Platform token 费率
- 活跃 Session 运行时 **$0.08/小时**（按毫秒计量，等待用户输入或工具返回的空闲时间不计费）
- Web 搜索 **$10/千次**

接入时带上 beta header `managed-agents-2026-04-01`，官方 SDK 自动处理。同期上线的 `ant` CLI 提供命令行接入方式，支持 YAML 管理 API 资源版本。

不过对国内开发者来说，官方渠道需要海外信用卡，网络环境也要折腾。如果想省事，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能用，体验跟官方一样。详情：[code.ai80.vip](https://code.ai80.vip/home)

---

## 几个值得关注的信号

这次发布放在更大的时间线里看会更清晰。

4 月 4 日，Anthropic 收紧了第三方 Agent 的访问通道；4 月 7 日发布 Mythos，展示最强模型能力；4 月 8 日发布 Managed Agents。三天三个动作，商业闭环形成。

更根本的变化是收入模式。Token 收入跟模型使用量挂钩，session-hour 收入跟 Agent 运行时长挂钩——后者是一个更稳定、更可预测的收入流。**$0.08/session-hour 意味着 Anthropic 开始在 token 之外赚钱了。**

---

## 常见问题

**Q：Managed Agents 和自己用 Messages API 搭 Agent 有什么本质区别？**

A：Messages API 给你原始模型调用能力，基础设施完全自建；Managed Agents 是把执行层托管了——沙箱、Session 持久化、错误恢复、权限管理全由 Anthropic 的云处理。适合需要跑几十分钟甚至几小时的长时异步任务。

**Q：Harness 是什么，跟普通的 Agent 循环有什么不同？**

A：Harness 是 Anthropic 调优过的编排循环，自动处理工具调用决策、上下文管理和错误恢复，并随模型能力升级自动演进。普通 Agent 循环是你自己写的，Harness 升级带来的性能改善你直接受益，不用改代码。

**Q：Session 和上下文窗口是同一个东西吗？**

A：不是。上下文窗口是模型单次推理能看到的内容；Session 是存在上下文窗口之外的持久化事件日志。Harness 通过 `getEvents()` 按需从 Session 里取切片，解决了长任务超出上下文窗口的问题。

**Q：p50 TTFT 下降 60%、p95 下降 90% 是怎么来的？**

A：来自解耦架构的优化。之前 Harness 在容器里，必须等容器起好才能开始推理；解耦之后，推理在容器启动之前就可以开始，所以首 token 时延大幅降低，尤其在长尾（p95）上效果更明显。

**Q：国内开发者怎么接入 Claude API？**

A：官方渠道需要海外信用卡和稳定网络。国内用户可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。
