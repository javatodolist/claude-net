---
title: JetBrains十年老用户出走 AI编程时代IDE格局正在重写
description: JetBrains十年老用户出走 AI编程时代IDE格局正在重写。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - 国内使用
  - AI编程
---

# JetBrains十年老用户出走 AI编程时代IDE格局正在重写

## 写在前面

如果你在程序员社区待过，最近应该注意到一个现象：越来越多的 JetBrains 忠实用户开始转向 VS Code + Claude Code 的组合。

这些不是尝鲜的新手，而是用了十年 IntelliJ IDEA 或 PyCharm 的老用户。他们清楚 JetBrains 的技术有多强，但还是选择了离开。

这件事的背后，不是某个产品比另一个好或差的问题——而是**整个编程工作流的范式正在发生转变**，而 JetBrains 虽然技术领先，还没有完全适应这个新范式。

---

## 先承认事实：JetBrains 的 PSI 引擎确实是最强的

JetBrains 的 **PSI（Program Structure Interface）** 引擎是迄今为止业界最精妙的代码语义系统。

它能做到的事情，LSP 系统只能望其项背：

- **跨项目安全重命名**：改一个符号名，所有引用点自动更新，零遗漏
- **精确函数提取**：选中一段代码，一键抽成函数，参数和返回值自动推断
- **签名修改联动**：改了方法签名，所有调用处自动调整

JetBrains 花了十多年打造这套系统。在"人手写代码"的工作流下，PSI 就是终极武器。

**但这恰恰就是问题所在——PSI 是为人的工作流设计的，而不是为 AI Agent 的工作流设计的。**

---

## LSP 看起来弱，但对 AI Agent 是质变

Claude Code 通过 LSP 拿到的能力其实很基础：

- `goToDefinition`：定位符号定义
- `findReferences`：查找所有使用点
- `hover`：获取类型信息和文档
- 上下文补全

这些操作对人来说稀松平常。但对 AI Agent 而言，这是从"猜测"到"确定"的质变。

以前 Claude Code 是怎么工作的？读取整个代码库，用正则或字符串搜索找相关代码，然后基于"可能的模式"进行推理和修改——本质上在猜。

现在呢？通过 LSP 精确查询：这个符号定义在哪、在哪些地方被使用、精确的类型信息和函数签名。**Agent 的决策基于确定的信息，而非推测。**

PSI 的重构能力确实更强。但 AI Agent 根本不需要那么强——它只需要足够准确的信息来完成代码修改就够了。

---

## 用户离开 JetBrains 的真实原因

### 1. 工作流范式变了

传统工作流：**人在 IDE 里写代码**，频繁使用重构工具，PSI 是核心能力。

AI 时代的工作流：**轻量编辑器 + 自然语言指令 → Agent 生成代码 → 人来 Review**。

在新工作流里，PSI 的优势变得不再关键——因为 Agent 倾向于"一次性生成较大的代码块"，而不是"小范围精确重构"。你不需要 Extract Method 这种精细操作，因为 Claude Code 直接帮你把整个模块写好了。

### 2. 从"选一个 IDE"变成"选一套工具组合"

现在开发者的桌面上不是一个 IDE，而是一套工具组合：

- VS Code 做编辑器
- Claude Code 做自主编程 Agent
- 搜索/调试工具按需接入
- MCP 连接各种外部数据源

JetBrains 的强项是"一体化"，但 AI 编程时代的趋势是"可组合"。VS Code 的开放生态和社区驱动模式，在这个维度上有天然优势。

### 3. 成本结构不同

JetBrains 的订阅费用不低。如果你已经在为 Claude Code 的 API 付费，再叠加一个 JetBrains 订阅，总成本开始让人犹豫——尤其当你发现 VS Code + Claude Code 已经能覆盖 90% 的日常开发需求。

---

## 长期趋势："最强语义引擎 + 弱 AI" vs "够用的 LSP + 强 AI"

**后者会赢。**

原因很简单：

1. **Claude、GPT、Gemini 这些模型还在进化**。它们对 LSP 信息的利用效率在持续提升——你给 AI 越精准的信息，生成质量就越好。某个阶段，LSP + 强 AI 的组合在产出质量上能逼近甚至超过 JetBrains 的体验。

2. **VS Code 已经成为事实标准**。围绕它的工具生态在爆炸式增长。JetBrains 技术再强，在规模和定价上做不了"all-in-one 平台"。

3. **开发者的核心活动从"写代码"变成了"指挥 AI + 审查代码"**。当你 80% 的时间在跟 Agent 对话、剩下 20% 在看 diff，IDE 的代码编辑能力不再是决定性因素。

---

## 但 JetBrains 不会消亡

需要精细化重构能力的大型遗留项目、深度定制需求的企业用户、已经是公司标准配置的大团队——JetBrains 在这些场景下仍然是首选。

这不是"谁淘汰谁"，而是**市场在分化**。

JetBrains 的 PSI 依然是最强的代码语义系统。但"最强"不等于"必需"。在 AI 编程这个新场景下，"够用的 LSP + 足够强的 AI Agent"这个组合，以更轻量、灵活、低成本的方式，满足了大多数程序员的需求。

**十年老用户的出走，本质反映的是：工作流范式在转变。**

---

## Claude Code 到底在这个转变中扮演了什么角色？

Claude Code 是目前最成熟的自主编程 Agent。它能：

- 读懂整个代码库的结构和依赖
- 自主创建、修改、删除文件
- 执行 Shell 命令（构建、测试、部署）
- 自主调试（写代码 → 跑测试 → 修 bug → 再跑测试）
- 通过 MCP 协议连接外部工具和数据源

背后的 Claude 模型支持最高 200K token 上下文窗口，加上 Extended Thinking 能力，让它在处理大型重构和跨模块修改时表现尤为突出。

**官方订阅**：Claude Max $100/月起，也支持 API 按量付费。

不过说实话，官方订阅对国内用户不太友好——海外信用卡和网络环境都得折腾。如果嫌麻烦，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q：我正在用 JetBrains，有必要切换吗？**

A：取决于你的工作流。如果你大量使用 JetBrains 的重构功能（Extract Method、Rename Symbol 等），且 AI 在你工作中的占比还不高，可以继续用。但如果你已经开始依赖 AI Agent 完成大部分代码工作，切换到 VS Code + Claude Code 会更顺畅。

**Q：VS Code 的代码智能真的够用吗？**

A：对人来说，VS Code 的 LSP 确实不如 JetBrains 的 PSI 精细。但对 AI Agent 来说够用了——Agent 需要的是准确的符号定位和类型信息，不需要 IDE 级别的重构引擎。

**Q：Claude Code 能替代 JetBrains 的哪些功能？**

A：跨文件重构、批量重命名、代码生成、测试编写、依赖管理、Git 操作。这些 Claude Code 都能自主完成，而且是通过自然语言驱动的——你描述需求，它来执行。

**Q：国内用 Claude Code 方便吗？**

A：官方渠道需要海外支付和稳定网络。可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用，体验与官方一致。

---

&gt; 参考来源：[知乎 - PSI引擎吊打LSP，JetBrains为何在AI编程时代被Claude Code反超？](https://www.zhihu.com/question/1988592484482316108/answer/1992204496999323557)（作者：AI工具导航站）
