---
title: 先把方案摊在你面前再动手 Claude Code ultraplan 上线
description: 先把方案摊在你面前再动手 Claude Code ultraplan 上线。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-13
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# 先把方案摊在你面前再动手 Claude Code ultraplan 上线

![Banner](/assets/images/localized/inews.gtimg.com-aed13d707897.jpg)

## 写在前面

用 AI 写过复杂项目的人，大概都踩过同一个坑。

你随口说了一句「帮我把认证系统迁移到 OAuth」，Claude 二话不说就开始改。改到一半发现理解跑偏了，回滚重来。改了三个文件之后发现漏了个依赖，再回滚。来来回回几轮下来，token 花了一大堆，时间搭进去好几小时，最后这事儿可能还不如没开始。

问题出在哪？不是 Claude 不够聪明，是根本没人逼它先想清楚再动手。

Claude Code 刚上线了一个新命令 `/ultraplan`，专门解决这个问题：**在动手改代码之前，先在网页上给你出一份完整的实施方案，你看过、改过、确认没问题，点了批准，才开始执行。**

你可能会好奇：
- `/ultraplan` 和已有的 `/plan` 有什么本质区别？
- 方案能改到什么程度？改了方案 Claude 真的会照着做吗？
- Anthropic 最近功能一个接一个，背后到底是什么逻辑？

---

## 还在让 AI 盲目动手？这是 AI 编程最常见的失败模式

说起来有点扎心：AI 编程最常见的失败，不是模型不够强，而是「还没搞清楚要做什么，就开始动手了」。

你给 Claude 一个模糊的需求，它会立刻进入执行模式。它会读代码、猜意图、找路径，然后开始改。这个过程里，它对你想要什么、改到哪个边界、怎么验证算完成，其实没有一个明确的共识。

所以 Anthropic 工程师 Thariq 的解释是：**规划和执行，本质上是两件不同性质的事情。**

规划阶段，Claude 需要读代码、理解意图、生成方案——这些纯粹是阅读和推理，完全可以在云端完成，不依赖本地环境，也不会动任何文件。

执行阶段才真正涉及本地文件系统、编译运行、环境配置。而且当 Claude 手里拿着一份经过你确认的方案时，它知道该做什么、做到什么程度、怎么验证——这和闭眼冲完全不是一回事。

这个拆分，是 `/ultraplan` 的核心逻辑。

![规划与执行拆分的示意](/assets/images/localized/inews.gtimg.com-9d5d0ea68f9b.png)

---

## /ultraplan 实际怎么用：完整 demo 拆解

### 第一步：在终端发起任务

在 Claude Code 终端输入：

```
ultraplan migrate auth to OAuth
```

意思是：帮我把认证系统迁移到 OAuth。

发出去之后，Claude 开始在云端分析你的代码库。

![在终端输入 ultraplan 命令并等待方案生成](/assets/images/localized/inews.gtimg.com-13a56bef5697.gif)

### 第二步：网页自动打开，方案铺在你面前

几秒后，终端提示 `ultraplan ready · ↓ to view`，按回车，浏览器自动打开 `claude.ai/code`。

![网页自动打开并展示完整实施方案](/assets/images/localized/inews.gtimg.com-0ec0e9ea2fe4.gif)

页面标题是「Review Claude's plan」，左侧是导航目录，右侧是方案正文。结构分三个板块：

**Context（上下文）**：Claude 列出它对项目的理解，相当于告诉你「我是这么读你需求的」，让你第一时间确认方向没偏。

**Implementation（实施步骤）**：列出具体要改哪些文件、怎么改。这个 demo 里是三步：替换 `middleware/auth.ts` 中的 `SessionStore` 为 OAuth 客户端，添加 `/auth/callback` 的 PKCE 流程，修改 `db/users` 表的 `session_id` 字段。每一步都附了对应的代码片段。

**Verification（验证）**：怎么确认改完没出事。给出了测试命令（`npm test -- auth`）和预期结果（14 个测试用例通过，callback 返回 302 并设置 `oauth_sub` cookie）。

![方案中的验证步骤和测试命令](/assets/images/localized/inews.gtimg.com-b0975eb51966.jpg)

### 第三步：在方案里留评论、直接编辑

这里有个关键细节：**方案里的内容是可以直接编辑的。**

你觉得哪一步有问题，选中那段文字，就能给 Claude 留评论。Claude 会根据反馈修改方案，然后你再看。这是一个审阅+修改的循环，而不是一次性的输出。

### 第四步：批准方案，选择执行方式

方案底部有两个按钮：「Run on web」（在云端执行）和「Approve & teleport to terminal」（批准并传回终端执行）。

点了「Approve」之后，回到终端，Claude 会问你怎么执行：

![批准方案后回到终端选择执行方式](/assets/images/localized/inews.gtimg.com-f0cfbf49ab3d.gif)

- **Implement here**：把方案注入当前对话，就地开干
- **Start new session**：清掉当前上下文，只带着方案开一个新会话
- **Cancel**：先不执行，方案存着回头再说

选了 Implement here 之后，Claude 就按方案一步一步改代码了。

---

## /plan 有了，为什么还需要 /ultraplan？

Claude Code 之前已经有 `/plan` 了。区别在哪？

![/plan vs /ultraplan 对比](/assets/images/localized/inews.gtimg.com-f1c1a942aedc.png)

核心差距就一条：**/plan 的方案在终端里看，/ultraplan 的方案在网页上看。**

终端里看方案，文本是线性的，只能上下滚动。方案涉及五六个文件、十几个步骤时，阅读体验其实挺难受的，更别说在上面做标注。

网页端就不同了：有侧边栏导航，可以跳转任意章节；有代码高亮和结构化步骤列表；最关键的是能选中文本留评论，形成真正的审阅循环。

另外，ultraplan 支持「在云端直接执行」（Run on web），也支持传回本地终端。这意味着你在手机上审阅完方案，批准之后能传回电脑上的终端去跑——Remote Control 那篇讲过的移动端工作流，在这里得到了延伸。

Token 消耗方面，Thariq 提到 ultraplan 和 plan 消耗的 token 数量差不多，订阅额度限制也一样。

目前 /ultraplan 处于预览阶段，所有开启了 Claude Code 网页端的用户都可以用。

![方案的评论与协作编辑界面](/assets/images/localized/inews.gtimg.com-de351d647c3e.png)

---

## 顺带一提：Claude for Word 也来了

同一天，Anthropic 还发布了 Claude for Word，正式进入微软 Office 套件。目前是 Beta 阶段，Team 和 Enterprise 用户可用。

Claude 以侧边栏形式出现在 Word 里，可以直接对话，帮你起草、编辑、修改文档，所有改动以 Word 的「修订模式」（Track Changes）呈现，可以逐条接受或拒绝。

![Claude for Word 侧边栏界面](/assets/images/localized/inews.gtimg.com-60829faf9989.png)

更值得注意的是：**Claude for Word 和 Claude for Excel、Claude for PowerPoint 共享上下文。** 你可以在一个对话里同时操作多个打开的文档。比如让 Claude「把 Excel 表里的 Q1 销售数据整理一下，生成 Word 格式的季度报告，再做一组 PPT 演示页」——三个应用之间的数据流通，全靠 Claude 串联。

这和微软自家的 Copilot 形成了直接竞争。微软居然允许一个非 Copilot 的 AI 进入 Word，还挺让人意外的。

---

## Anthropic 为什么能迭代这么快？

这一两天时间，Anthropic 发布了：/ultraplan（网页端规划功能）、Monitor 工具（事件驱动后台监控）、Claude for Word（Office 套件集成）。

如果把时间线拉长到最近两个月，还有：/loop、/schedule、Skills、hooks、background agents、Computer Use、Dispatch、Claude Code Desktop……

这个速度，说「极其疯狂」不算夸张。

背后的原因，可能就是 Anthropic 在实践一套「AI 驱动的产品迭代飞轮」：**让 AI 读用户使用日志 → 分析模式、识别需求 → 生成方案 → 直接写代码实现 → 人类审阅上线 → 收集反馈，再循环。**

![AI 驱动的产品迭代飞轮](/assets/images/localized/inews.gtimg.com-e485c7017422.png)

这不是瞎猜。它知道用户在终端里花太多时间滚动方案（所以做了 ultraplan 搬到网页）；它知道 Agent 在轮询上浪费了多少 token（所以做了 Monitor）；它知道用户手动设定定时任务（所以做了 /loop 和 /schedule）。这些需求洞察，以前需要产品经理做用户访谈、发问卷、分析数据——现在让 AI 直接读数据，找模式，提建议，然后直接写代码。

还有另一层原因。前不久 Anthropic 发布了 **Mythos**，Claude 产品线中最高层级的模型，在软件工程、网络安全、科学推理等能力上全方位超越了 Opus 4.6。

![Anthropic Mythos 模型发布信息](/assets/images/localized/inews.gtimg.com-432440bac68f.png)

但这次不同的是，**Mythos 是 Claude 有史以来第一个不公开发布的旗舰模型**。没有开放 API，没有更新 claude.ai 的模型选项，也没有发 benchmark 排行榜——它只面向 AWS、Apple、Google 等十几家核心合作方开放。原因是它在网络攻防上的能力，强到 Anthropic 认为不适合所有人用。

但 Anthropic 内部，当然在用。自 2 月 24 日起，Anthropic 工程师们就拥有了 Mythos。

当你的内部工具比公开版还强一个级别，Claude Code 迭代如此之快，也就不难理解了。

---

## Claude Code 是什么？能做什么？

如果你刚接触这个工具，简单说一下它是什么。

Claude Code 是 Anthropic 出的 AI 编程 Agent，在命令行里运行。它不是 Copilot 那种代码补全工具，更接近一个能独立干活的开发搭档：

- 读写项目文件，跨文件理解和修改
- 执行 shell 命令、运行测试、查 git 状态
- 自主调试，出了问题自己找原因再修
- 通过 Skills 和 hooks 集成进你的工作流

官方订阅走 Claude.ai：Pro 计划 $20/月，Max 计划 $100/月（含更多 Claude Code 额度）。

不过说实话，官方订阅对国内用户不太友好——需要海外信用卡，网络环境也得折腾。如果嫌麻烦想找个更省事的渠道，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q：/ultraplan 是所有 Claude Code 用户都能用吗？**

A：目前处于预览阶段，开启了 Claude Code 网页端（claude.ai/code）的用户都可以使用。

---

**Q：在网页上修改方案之后，Claude 一定会按修改后的方案执行吗？**

A：是的，你在方案里留的评论和改动，Claude 会吸收进最终方案再开始执行。批准的流程就是确认这个共识。

---

**Q：ultraplan 和 plan 消耗的 token 一样多吗？**

A：Anthropic 工程师 Thariq 确认两者 token 消耗差不多，订阅额度限制也一样。

---

**Q：日常写个小功能、改个 bug，也需要用 ultraplan 吗？**

A：不需要。ultraplan 更适合复杂的大型重构或全新模块开发——需求涉及多个文件、步骤多、边界情况复杂的场景。日常小改动直接在终端里搞定更快，用 ultraplan 反而多绕了一圈。

---

**Q：Claude for Word 现在就能用吗？**

A：目前是 Beta 阶段，面向 Team 和 Enterprise 用户开放，个人用户暂时还不行。

---

**Q：国内怎么用上 Claude Code？**

A：国内用户可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。
