---
title: 26年IDE老厂押注Agent编排 JetBrains的转型恰恰证明了Claude的统治力
description: 26年IDE老厂押注Agent编排 JetBrains的转型恰恰证明了Claude的统治力。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - 国内使用
  - AI编程
---

# 26年IDE老厂押注Agent编排 JetBrains的转型恰恰证明了Claude的统治力

![Banner](/assets/images/localized/static001.geekbang.org-5865e0ba961c.png)

## 写在前面

JetBrains 做了一个让很多人意外的决定：**发布了一个全新的 IDE，叫 Air。**

不是给 IntelliJ 加个插件，不是在 WebStorm 里塞个聊天窗口——而是从零做了一个新产品。

更有意思的是，这个新 IDE 的定位不是"更好的代码编辑器"，而是一个 **Agent 调度与编排平台**。翻译成大白话就是：JetBrains 觉得，未来写代码的主力不再是人，而是 AI Agent。IDE 的角色，应该从"帮人写代码的工具"变成"帮人管理 Agent 的调度中心"。

而 Air 第一批接入的 Agent 名单里，赫然就有 **Claude**。

一个统治开发者工具市场 26 年的公司，主动把自己变成 Agent 的"服务平台"——这件事本身就说明了很多问题。

---

## JetBrains 为什么要做这个东西？

先说背景。

JetBrains 这家公司不需要多介绍。IntelliJ IDEA、WebStorm、PyCharm、GoLand……Java、前端、Python、Go 开发者几乎人人用过它家的产品。它的 PSI 引擎（Program Structure Interface）是业界公认最强的代码语义系统——重构能力、代码分析精度、跨项目符号理解，这些方面它吊打 VS Code 的 LSP 不止一个量级。

但问题来了：**PSI 是为人设计的。**

它的所有能力——安全重命名、精确提取函数、修改方法签名并自动调整调用处——都是围绕"人在 IDE 里一步步操作"这个工作流设计的。

而现在，开发者的工作流正在发生根本性的转变。

越来越多的人不再是"打开 IDE → 手写代码 → 用重构工具优化"，而是"用自然语言描述需求 → AI Agent 生成大量代码 → 人来 Review"。在这个新工作流里，JetBrains 花了十几年打磨的精密重构能力，优先级突然降低了。

JetBrains 自己显然也意识到了这一点。

&gt; "如今 Agent 已经具备写代码的能力，这一点基本已不再是争议。正如 IDE 曾重新定义人类编写代码的方式一样，现在也到了为 Agentic 工作流提供一套真正面向开发环境的时候。"

这是 JetBrains 官方的原话。26 年来第一次，他们承认：**写代码这件事的主角，正在从人换成 Agent。**

---

## Air 到底是个什么东西？

Air 的核心设计围绕一个概念：**Task（任务）**。

开发者在真实代码上下文中定义一个任务，Air 把这个任务交给 AI Agent 去执行。任务可以跑在本地 workspace、Git worktree、Docker 容器里，未来还会支持云端容器。

![Air 界面](/assets/images/localized/static001.geekbang.org-32a84ace38ec.jpeg)

关键在于：**Air 不绑定某一个 Agent。** 它支持同时接入多个 AI Agent：

- **Anthropic Claude Agent**（Claude Code）
- OpenAI Codex
- Google Gemini CLI
- JetBrains 自家的 Junie

你可以在 Air 里给不同的任务分配不同的 Agent，在不同任务之间切换，对 Agent 生成的结果进行审查和批准。

![Air 架构](/assets/images/localized/static001.geekbang.org-a6e697af9556.png)

架构上，Air 还支持一个叫 **ACP（Agent Client Protocol）** 的协议——由 Zed 和 JetBrains 共同推动，是一种面向 Agent 与编辑器通信的厂商中立协议。意思是：未来任何兼容 ACP 的 Agent，都可以直接接入 Air。

另外，JetBrains 还同步发布了 **Junie CLI**（命令行版本），让它从 IDE 插件变成了一个可以独立运行的 Agent 工具。Junie 支持 OpenAI、Anthropic、Google 和 Grok 的模型，个人用户 $10/月起，企业版 $60/月。

目前 Air 已进入公开预览，不过现阶段只有 macOS 版本，Windows 和 Linux 还要等。

---

## 这件事对 Claude 意味着什么？

JetBrains 发布 Air 这件事，表面上看是 JetBrains 在转型，但往深一层看，**它实际上是在给 Claude 的统治地位盖章。**

为什么这么说？

### 1. Claude 被列为第一梯队接入的 Agent

Air 首批支持的四个 Agent——Claude、Codex、Gemini CLI、Junie——Claude 排在 Anthropic Claude Agent 的位置，这不是随意的排列。在 AI 编程领域，Claude Code 目前在 SWE-bench（真实 GitHub issue 修复测试）上一直领先，在开发者社区的口碑也是最好的。JetBrains 把它放进第一批名单，本质上是在承认：**Claude 是目前最强的编程 Agent，不接入它说不过去。**

### 2. JetBrains 的转型逻辑本身就在证明 Agent 模式的胜利

JetBrains 26 年来的核心竞争力是"帮人更好地写代码"。现在它主动转型做"Agent 编排平台"，说明一件事：**连 JetBrains 自己都认为，未来写代码的主力是 Agent，不是人。** 而在这个 Agent 驱动的新世界里，谁的 Agent 能力最强，谁就占据生态位的核心。

Claude Code 目前能做到什么？

- **读懂整个项目**：不是当前文件，是整个代码库，理解模块关系、依赖结构、命名约定
- **自己写代码**：创建、修改、删除文件，跨文件批量重构
- **自己跑命令**：安装依赖、执行测试、查看日志
- **自己调试**：测试没通过就分析错误、定位问题、修改代码、重新测试，循环到通过
- **自己管理 Git**：创建分支、提交、写 commit message、处理 merge conflict

这些能力组合在一起，Claude Code 不是"帮你补代码"，而是"替你干完一整件事"。JetBrains 做 Air，本质上就是给这种 Agent 提供一个更好的运行环境。

### 3. Claude Max 的限制反而说明了需求的真实

Air 发布后，社区有一个热门追问：**为什么 Claude Code 能用 Claude Max 订阅，Air 却不行？**

JetBrains 的回应很直白：Air 支持自带 API Key（BYOK），但 Claude Max 不能作为 BYOK 接入，因为这会违反 Anthropic 的服务条款。

这个限制反而从侧面证明了一件事：**大量开发者想在 Air 里用 Claude，需求是真实的。** 只是受限于 Anthropic 的订阅模式，目前只能走 API 计费。

---

## 开发者的工作流正在被重新定义

把 JetBrains Air 这件事放到更大的背景里看，趋势已经非常清晰了：

**开发者的工作流正在从"人写代码"变成"人写需求 + Agent 生成 + 人 Review"。**

在这个新范式下：

- IDE 的角色从"代码编辑器"变成"Agent 调度中心"
- 开发者的核心能力从"写代码"变成"描述需求 + 审查代码"
- 工具选择的标准从"哪个 IDE 重构功能强"变成"哪个 Agent 能力强"

JetBrains 做 Air 是在适应这个变化。而 Claude Code，凭借 200K 上下文窗口、Extended Thinking 深度推理、MCP 协议打通工具链、三层记忆架构积累项目理解——它在"Agent 能力"这个新维度上，目前确实走在最前面。

前段时间 Anthropic 用 16 个 Claude Opus 4.6 Agent 协同开发了一个完整的 C 编译器，十万行代码，GCC 测试通过率超 99%，全程零人工。这种工业级的自主编程能力，目前还没有其他模型能复刻。

---

## Claude Code 怎么用？

Claude Code 是 Anthropic 官方的终端 AI 编程 Agent，通过 `npm install -g @anthropic-ai/claude-code` 安装，在项目目录运行 `claude` 启动。支持 VS Code、JetBrains IDE 集成，也支持 Headless 模式用于 CI/CD。

**官方订阅价格：**

- Claude Pro：$20/月（日常使用 claude.ai，不含 Claude Code）
- Claude Max（5x）：$100/月（Claude Code 中度用户）
- Claude Max（20x）：$200/月（Claude Code 重度用户）
- API 按量计费（开发团队）

不过说实话，官方订阅对国内用户不太友好——需要海外信用卡，网络环境也得折腾，而且 Anthropic 风控出了名的严格。如果嫌麻烦想找个更省事的渠道，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q：JetBrains Air 和 VS Code / Cursor 有什么区别？**

A：VS Code 和 Cursor 的 AI 能力主要集中在"单 Agent 辅助编码"——一个 AI 帮你补全、生成、对话。Air 的定位不同，它是一个 Agent 编排平台，可以同时管理多个 Agent 并行处理不同任务，更接近"项目管理者"的角色。当然，Air 目前还在公开预览阶段，成熟度还需要观察。

**Q：Air 里用 Claude 需要额外付费吗？**

A：需要。Air 本身免费且支持 BYOK（自带 API Key），但 Claude Max 订阅不能直接接入（违反 Anthropic 服务条款）。你需要通过 Anthropic API 按量计费来使用 Claude Agent。

**Q：JetBrains 传统 IDE（IntelliJ、WebStorm）会被 Air 取代吗？**

A：短期不会。Air 的定位是面向 Agentic 工作流的新产品线，传统 IDE 在需要精细化重构、深度定制、企业标准化的场景中依然有不可替代的优势。两者更可能是并行关系，服务不同的工作流。

**Q：Claude Code 跟 JetBrains Junie 相比怎么样？**

A：两者定位有重叠但能力梯度不同。Claude Code 基于 Opus 4.6 模型，200K 上下文窗口，支持 Extended Thinking 深度推理，在 SWE-bench 上长期领先。Junie 的优势在于跟 JetBrains IDE 的深度集成和 PSI 引擎的语义支持。对于大型自主编程任务，Claude Code 目前更强；对于在 JetBrains 生态内精细操作，Junie 更方便。

**Q：国内开发者怎么用上 Claude Code？**

A：官方渠道需要海外支付和网络环境，门槛较高。国内用户可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用，体验与官方一致。

---

&gt; 原文来源：InfoQ 中国 —《26 年 IDE 老厂押注 Agent 编排：JetBrains 公开预览 AI IDE Air》
