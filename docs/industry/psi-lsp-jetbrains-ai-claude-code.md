---
title: PSI引擎吊打LSP，JetBrains为何在AI编程时代被Claude Code反超？
description: PSI引擎吊打LSP，JetBrains为何在AI编程时代被Claude Code反超？。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - Claude Code
  - AI编程
---

# PSI引擎吊打LSP，JetBrains为何在AI编程时代被Claude Code反超？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
5 人赞同了该回答
先承认事实：JetBrains的PSI（Program Structure Interface）引擎是迄今为止业界最精妙的代码语义系统。
它能做到的重构能力，安全地重命名跨项目的符号、精确提取函数、修改方法签名并自动调整调用处，这些在人工编辑的场景下，LSP系统简直是小学生。
JetBrains花了十多年打造这套系统。但这正是问题所在——PSI被设计来支撑人的工作流，而不是Agent的工作流。
LSP看起来弱，但对AI Agent是质变
Claude Code通过LSP拿到的能力很基础：goToDefinition定位符号，findReferences找使用点，hover获取类型和文档，加上上下文补全。
这些操作对人来说早就习以为常。但对于一个AI Agent，这好像从猜测，滑向了更确定的那头。
以前Claude Code（以及其他Agent）是这样工作的：读取整个代码库，用regex或substring search去找相关代码，然后基于"可能的模式"进行推理和修改。
现在变了。通过LSP问这个符号定义在哪、在哪些地方被使用、精确的类型信息和函数签名，Agent的决策基于确定的信息而非推测。
虽然PSI的重构能力仍然更强，但AI Agent根本不需要那么强。它只需要足够准确的信息来进行代码修改和查询就够了。
用户离开JetBrains的真实原因，远不止是LSP
1. 工作流范式的改变
人的工作流是IDE写代码，频繁用重构工具。AI Agent的工作流不同：轻量级编辑器接自然语言指令，Agent生成大量代码，人来Review。
JetBrains的PSI优势在第二种工作流里变得不关键，因为Agent倾向于"一次性生成较大的代码块"而不是"小范围精确重构"。
2. 工具链爆炸
现在不再是"选一个IDE"，而是"选择工具组合"：VS Code加Claude Code、Cursor，再搭个搜索工具。
因为本身这样使用的效率是最高的，虽然有点费钱！
如果你还还不会使用，可以去0011.ai中去使用，0011.ai因为是采用积分制的，可以使用Claude code和Codex两个。
0011.ai门：https://0011.ai/i/AIG
长期来看："最强语义引擎 + 弱AI" vs "够用的LSP + 强AI"
后者会赢。
工作流从"人写代码"变成"人写需求 + AI生成 + 人review"，对IDE的要求集中在速度、轻量、多工具兼容。
JetBrains的重构能力优先级下降了。
Claude、GPT、Gemini这些模型在进化，对LSP信息的利用效率也在提升。你给AI越精准的信息，生成质量就越好。
某个阶段，LSP + 强AI的组合在产出质量上能逼近JetBrains的体验。
VS Code已经成为事实标准。围绕它的工具生态在爆炸式增长。JetBrains虽然技术强，但规模和定价决定了它做不了"all-in-one平台"——VS Code的社区驱动模式有天然优势。
但不意味着JetBrains会消亡
它没死。也许短期会因市场心理有所下滑，但对于需要精细化重构能力、深度定制需求、或已经是企业标准的大公司，JetBrains仍然首选。
这是市场分化，而不是绝对胜负。
总结
JetBrains没被淘汰，市场需求分布在改变。PSI仍是最强的代码语义系统，但"最强"不等于"必需"。
在AI编程这个新场景，"够用的LSP + 足够强的AI Agent"这个组合，以更轻量、灵活、成本更低的方式，满足了大多数程序员的需求。这不是技术胜负，而是市场适应的信号。
十年JetBrains用户的出走，本质反映的是：工作流范式在转变，而JetBrains虽然技术先进，但还没完全适应这个新范式。
发布于 2026-01-07 12:02・广东
赞同 5​
8
喜欢
收起​
