---
title: Claude Opus 4 7 发布了 代码 视觉和长任务一起升级 Claude Code 也顺手补齐了关键一刀
description: Claude Opus 4 7 发布了 代码 视觉和长任务一起升级 Claude Code 也顺手补齐了关键一刀。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-16
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Claude Opus 4 7 发布了 代码 视觉和长任务一起升级 Claude Code 也顺手补齐了关键一刀

![Banner](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137842&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9qWFNHdXdKdnBkZ1dUUGxUNnE1RVJSN3c5QkFHV3JSUThJYllzRU5jenNoTGJ6ZThaYTFIdXlaWXdDbmN6OVZDOG8xbjVWaWJMQVZiVkNCQmZnUWpJbElzNXFNakFicXJ6NTAwSHNQZHRZYkUvNjQwP2Zyb209YXBwbXNn)

## 写在前面
刚刚，Anthropic 发布了 Claude Opus 4.7。

这次升级最值得看的，不只是“又发了个新模型”，而是它把几条真正影响生产使用的能力一起往前推了：高难度编程、长任务稳定性、视觉分辨率、专业文档处理，以及更细的推理强度控制。

更关键的是，价格没变。输入每百万 token 5 美元，输出 25 美元，和 Opus 4.6 保持一致。对已经在用 Claude 的团队来说，这种升级最有吸引力的地方就在这里：迁移门槛不高，但能力上限被重新抬了一次。

---

## 先看最扎眼的一组信号
这次最直接的感觉，不是某个 benchmark 又涨了几个点，而是 Opus 4.7 明显更像一个能把复杂任务往前跑完的模型。

它已经在 Claude 产品、Anthropic API、Amazon Bedrock、Google Cloud Vertex AI 和 Microsoft Foundry 上全面可用，模型 id 是 `claude-opus-4-7`。而且它还是 Project Glasswing 之后，第一个拿来试验新网络安全护栏的对外模型。

定价依旧是每百万输入 token 5 美元、输出 token 25 美元。相比 Mythos Preview 的 25/125 美元，Opus 4.7 便宜了 5 倍，但在公开可用模型里，已经把一整套关键能力往上顶了一截。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137842&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy9qWFNHdXdKdnBkakxSRzRuRExCcTY2dTdDWkVTQ0RLU3U1dXZNM1pNWktycUJiRExReThKUm5HelI2TTZ1N1M0anRqQ2libVJFeU5uWlFKUkRHVW5iNUVxVnZzRmtnTGgxbWJBMXRXbUdWZncvNjQwP2Zyb209YXBwbXNn)

如果把 Anthropic 给出的整体对比图和一线客户反馈放在一起看，结论其实很直接：4.7 不是补某一项短板，而是在真实工作流里最常碰到的几块一起升级了。

---

## 编程是这次最核心的升级点
Opus 4.7 最显眼的变化，还是高难度软件工程任务。

这次用户反馈里反复出现两个词：长程、自主。意思很明确——过去必须盯着改、盯着补、盯着修的那类代码活，现在可以更放心地把更多步骤直接交给模型去跑。

几个代表性数据很有说服力。GitHub 的 93 个任务编程基准里，Opus 4.7 比 Opus 4.6 高 13%，其中还有 4 个任务是 Opus 4.6 和 Sonnet 4.6 都做不出来的。CursorBench 上，4.7 达到 70%，4.6 是 58%。Rakuten 的生产任务测试里，4.7 解决的问题数达到了 4.6 的 3 倍。Notion 那边则给出了一组更接近真实流程的数据：准确率提升 14%，token 用得更少，工具调用错误降到原来的三分之一，而且第一次通过了“隐含需求”测试。

这里面最重要的，不只是“更会写代码”，而是更会把任务一路推进到底。公告里一个很关键的观察是：Opus 4.7 会减少那种没有意义的包装函数和兜底脚手架，写着写着就能自己发现问题、自己修一轮。Cognition 的反馈也很直白：它可以连贯工作几个小时，不会轻易卡在难题上放弃。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137842&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy9qWFNHdXdKdnBkZ2JXQ2NKdW5lWW9nNVIwaWEzNFJYYnA4c1dseloyWUZFdXBjN3ZrUmliU3IxWFVuUHZyTHNpYmRBQlhhdHl3WW5IeVNIeWZKVjJKZzhLTDVmNkdrT05WQWdTMmg0NGRWVHZyWS82NDA/ZnJvbT1hcHBtc2c=)

更极端的例子来自 Imbue。Opus 4.7 被拿去从零构建一个完整的 Rust TTS 引擎，里面不仅有神经网络模型、SIMD 内核和浏览器 demo，还会反过来用语音识别器验证自己的输出是不是匹配 Python 参考实现。这类案例真正说明的，不是它能生成多长代码，而是它开始具备了更强的自我校验意识。

如果你经常把模型用在复杂仓库、多步修复、长链路开发任务里，这次 4.7 的变化会比单纯的“补全变聪明”更容易感知到。

---

## 视觉能力这次不是陪跑，而是第二大升级点
这次另一个很容易被低估的变化，是视觉能力。

Opus 4.7 支持的图像长边提高到了 2576 像素，约 375 万像素，是此前 Claude 模型的三倍多。这个变化没有单独的 API 开关，直接送高分辨率图片就能用。

这件事的重要性，不只是“能看更清楚一点”。很多真实任务本来就依赖图片、截图、图表和图文混排文档。像 computer-use、密集截图读取、复杂图表抽取、需要像素级对照的界面操作，这些能力以前常常不是“不会推理”，而是“看不清”。

XBOW 的数据最夸张：它的视觉敏锐度基准上，Opus 4.6 是 54.5%，Opus 4.7 直接到了 98.5%。对于做自动化渗透测试、看界面、读报错、识别细节按钮这类场景，这种提升比单纯的文字 benchmark 更容易在实际使用里被感知到。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137842&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9qWFNHdXdKdnBkakFnQ1RVSHc5U0pQd1JYa2pMYk0wcHI1QXZoV0M4V3lCOFZ0U3F4ZGFSdDk5Mmp2TnNpY1RaTFZwVmJXUnVBZFNvOTdvSHFoaWFGaWJDQlBBSjIzek10d1MyWkIyUUREMjRIZy82NDA/ZnJvbT1hcHBtc2c=)

Anthropic 这次还顺手把 Vision 的一些实际使用边界讲清楚了：图片可以走 base64 或 URL；API 单次请求最多 600 张，claude.ai 最多 20 张；过大的图会先被服务端 down-sample；粗略计价公式是 `tokens ≈ (width × height) / 750`，1 兆像素大约等于 1334 tokens。

换句话说，视觉升级这次不是锦上添花，而是在给更多多模态开发任务补地基。

---

## 安全侧的动作，说明 Anthropic 现在不只是在拼能力
这次发布还有一条很值得注意的主线：安全策略。

要理解 Opus 4.7 这次的安全动作，得和 Project Glasswing 一起看。Anthropic 上周联合 AWS、苹果、博通、思科、CrowdStrike、Google、摩根大通、Linux 基金会、微软、NVIDIA、Palo Alto Networks 推出了这个项目，背后的原因并不轻。因为内部的 Claude Mythos Preview，在漏洞发现这件事上已经强到了接近顶级安全专家的水平。

公开提到的几个例子都很扎眼：OpenBSD 里活了 27 年的漏洞、FFmpeg 里藏了 16 年的老洞、Linux 内核里能一路把普通权限链到完全控制的问题。这类能力一旦无约束地下放，风险就不是“模型更会写代码”这么简单了。

所以 Opus 4.7 这次扮演的角色很特殊：它是第一个对外发布、同时带着新网络安全护栏一起试运行的模型。训练阶段有意削弱了一部分网络安全能力，发布时再配上自动检测和拦截高风险网络安全用途请求的护栏。合法用途的研究员、漏洞研究、红队和渗透测试人员，可以去申请 Cyber Verification Program。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137842&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9qWFNHdXdKdnBkaWFUVEZ6R2ZPcEhVV2JpYkhDZXQ1WXBDZkhuT2ljV0VHOVZnVGlicnIzekcwT3lXSWQxN1ZndE9HbUtJcGRsTk9YS0xMYjNvRjJSclJXN0taaWNpY3NvbU1jc0p0bDB6czZiNzljSS82NDA/ZnJvbT1hcHBtc2c=)

这意味着 Anthropic 现在的更新逻辑，已经不是“单纯把能力往上堆”了，而是一边放能力，一边给高风险能力补闸门。能力扩张和平台治理，开始变成同一套系统里的两条主线。

---

## 新功能不算特别多，但都贴着实际工作流在补
模型本体之外，这次还有几项对开发者很实用的更新。

第一项是新的 `xhigh` effort 档位，放在 `high` 和 `max` 之间。它控制的是 Claude 在响应、工具调用和 extended thinking 里愿意花多少 token 去思考。Claude Code 现在默认就把 effort 拉到了 `xhigh`，官方也建议编程和 agentic 场景至少从 `high` 或 `xhigh` 起步。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137842&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy9qWFNHdXdKdnBkaFU5MUVMbkhDS3hpYWFFWm05Wnc3RURTRTRHc1c1NjJRdFBRSExUdE01R3BKOFRwUDhKY1U0M0g5SklTYVFUT2ZvWTA2bDBPTGVrdXg4b3R3TDZ2SFFmdHJUa0JqN0RtMXcvNjQwP2Zyb209YXBwbXNn)

第二项是 task budgets 公测。它允许开发者直接给 Claude 设 token 预算，让模型自己在长任务里分配精力和优先级。对于要做长链路自动化、又得控制成本的团队来说，这比单纯追求最强效果更实用。

第三项是 Claude Code 的 `/ultrareview`。它会拉起一个独立 review 会话，把改动从头到尾过一遍，专门找 bug 和设计问题。Pro 和 Max 用户有 3 次免费额度。

第四项是 Auto mode 进一步下放到 Max 用户。它本质上是在“每一步都问你”和“完全跳过权限检查”之间，补上了一个更实用的中间档：安全的操作直接放行，高风险动作拦下来让 Claude 换方案。对于长任务和连续操作来说，这一步的意义很大。

把这些更新连起来看，Claude Code 的方向已经越来越明确：它不只是一个在终端里补全代码的助手，而是在往能自主推进任务的开发工作台靠。

---

## 迁移门槛不高，但 token 行为会变
对已经在用 Opus 4.6 的团队来说，这次升级动作本身不重，基本就是直接替换模型名；但实际迁移时有两个地方最好提前盯住。

第一，是 tokenizer 换了。新 tokenizer 让文本处理更完整，但代价是同样的输入内容，在新版本里的 token 数量可能变成旧版的 1.0 到 1.35 倍，具体看内容类型。

第二，是高 effort 档下，Opus 4.7 会想得更多，尤其在 agentic 场景的后半程。好处是硬题可靠性更高，代价是输出 token 可能更多。

Anthropic 给出的建议很简单：调 effort、配合 task budgets、提示模型更简洁。另外还有一个很现实的点——指令跟随明显变强了。以前一些写给老模型的 prompt，到了 4.7 这边可能会因为执行得更“字面”而出现行为偏移，所以升级时最好把 prompt 和 harness 一起过一遍。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137842&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy9qWFNHdXdKdnBkZzFtMHAzU09wQlJWR2liNkJBa1VuSEREa2Y5ZnFFeGNzSGxEdlFXRWliQTVhM3NPNXVxRUFYMnRmRVlGTDlaNkVEMVVxT2liU0JGN3VUREdBRG9CSkRGV09ZTGMySER6ZFJrby82NDA/ZnJvbT1hcHBtc2c=)

这类变化不算“坏消息”，但确实意味着：价格虽然没变，实际成本结构和行为风格还是值得重新量一遍。

---

## 真实工作里，它补的可能不只是代码
除了软件工程，这次 Opus 4.7 在知识工作和长任务上的信号也很强。

Anthropic 自己的内部测试里，它在金融分析师任务上比 Opus 4.6 更有效，表现出来的是分析和建模更严谨、演示更专业、任务之间衔接更紧。第三方评估 GDPval-AA 上，Opus 4.7 也拿到了 state-of-the-art。这类评估考的不是单轮答题，而是文档、幻灯片、图表、电子表格这些更像真实工作成果的交付物。

同时，它在文件系统式记忆上的利用也更好了。对于跨多轮、跨 session 的长任务，能更稳地记住前面的关键笔记，开新任务时对前置上下文的依赖会少一点。这种能力放到超长项目、复杂代码库和持续工作流里，价值会比单个回答的漂亮程度更大。

后面补充的办公任务、文档推理、长上下文推理、生物和长程一致性基准，也都在说明同一件事：Anthropic 这次不是只想把“编程能力”打高分，而是在给更长、更复杂、更接近真实工作的使用场景一起打底。

---

## Claude Code 到底该怎么理解
如果现在还把 Claude Code 理解成“终端里一个会聊天的 Claude”，这个理解已经有点落后了。

更准确地说，它正在变成一个围绕任务执行展开的自主编程 Agent。它不只是补全代码、解释报错，还能读仓库、搜文件、改代码、执行命令、做代码审查，并继续往自动模式、长任务执行和更少人工确认的方向扩展。

常见订阅里，Claude Pro 一般是 20 美元/月，Max 会更高；而 Opus 4.7 的 API 定价，这次仍然维持在每百万 token 输入 5 美元、输出 25 美元。

不过说实话，官方订阅对国内用户不太友好——需要海外信用卡，网络环境也得折腾。如果嫌麻烦想找个更省事的渠道，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

### 1. Claude Opus 4.7 这次最核心的升级是什么？
最核心的是它不只是代码能力更强，而是在长任务稳定性、自我校验、视觉理解和工具调用上一起提升，更像能把复杂任务一路推进到底。

### 2. 这次为什么很多人特别强调“长程”和“自主”？
因为高难度开发任务最怕中途跑偏。Opus 4.7 在连续工作、自我修正和工具调用稳定性上的进步，让人工盯流程的压力变小了很多。

### 3. 视觉升级为什么对开发者也重要？
因为很多真实任务都不是纯文本。看截图、读 IDE 报错、抽取图表数据、理解图文混排文档，本质上都依赖模型先把细节看清楚。

### 4. `xhigh` effort 有什么用？
它补上了 `high` 和 `max` 之间的空档，让开发者可以更细地平衡推理深度、响应速度和 token 消耗。

### 5. `/ultrareview` 更像什么？
更像 Claude Code 里的一轮深入代码审查。它不是浅浅扫一眼 diff，而是尽量把 reviewer 级别会挑出来的 bug 和设计问题提前找出来。

### 6. 国内开发者如果想更方便地使用 Claude 怎么办？
如果走官方路线，通常要处理支付、账号和网络环境这些现实问题。国内用户可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。
