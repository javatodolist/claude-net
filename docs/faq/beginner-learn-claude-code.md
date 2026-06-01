---
title: 初学者如何快速入门 Claude Code
description: 初学者如何快速入门 Claude Code。本文属于Claude 常见问题 FAQ专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 常见问题 FAQ
tag:
  - Claude
  - Claude Code
  - AI编程
---

# 初学者如何快速入门 Claude Code

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
2 人赞同了该回答
目录
学习路径：不要从文档开始，要从任务开始
CLAUDE.md 是什么，它重要到什么程度
Cursor还是Claude code？
如何控制成本
其实Claude code的门槛没你想的那么高
很多人觉得要先把 Linux 命令学完再说。
其实不用。
Claude Code 本质上是"可以自己动手的 Claude"，有问题直接丢给他是最好的。
一个跑在终端里的 AI Agent，可以读写文件、执行命令，但它并不要求你自己掌握这些命令。 绝大多数操作你只需要用自然语言告诉它你想要什么，它来执行。
真正需要你提前了解的 CLI 知识，只有三件事：
怎么打开终端（Windows 是 PowerShell 或 Terminal，Mac 直接搜 Terminal）
cd 命令：进入项目目录（cd /你的项目路径）
npm install -g @anthropic-ai/claude-code 这条安装命令，照抄就行
Claude Code 需要 Node.js 18 以上版本，安装整个过程不到 5 分钟。
装完之后，进项目目录，输入 claude，登录账号，就可以开始用了。
如果没有Claude账号，可以自己去订阅，现在有专门的订阅平台，不需要海外卡也可以订阅，因为Claude的封号很严重，所以有些平台也开始推出封号退款的方案。
告别封号！2025最新Claude注册及Pro付费教程，100%成功
21 赞同 · 0 评论 文章
第一次进去你会看到欢迎界面，输入 /help 查看命令列表，这就够了。
如果你在 Windows 上装了遇到各种奇怪的依赖报错，把报错直接粘给 Claude 本身，让它帮你排查，这是最省力的方式，苹果电脑的安装稍微要简单很多。
学习路径：不要从文档开始，要从任务开始
我自己觉得使用Claude code最好的教程就是直接给它一个任务，当然官网也有详细的教程，感兴趣的可以去看看。
官方文档在这里：https://code.claude.com/docs/en/quickstart
另外还有几个常用的官方页面：
快速入门：https://code.claude.com/docs/en/quickstart
最佳实践：https://code.claude.com/docs/en/best-practices
CLI 命令参考：https://code.claude.com/docs/en/cli-reference
完整文档索引：https://docs.anthropic.com/en/docs/claude-code/overview
我个人觉得跟着官网学稍微有点困难，可以去看B站或者油管大神。
如果安装好了，然后想要使用，第一周，可以试着把一个你已经熟悉的小项目扔给它。
进入项目目录，启动 Claude Code，可以自己做一些小项目，比如一个博客、满足自己需求的小游戏，让自己乐在其中，觉得Claude code好强，然后你就有动力学进去了。
CLAUDE.md 是什么，它重要到什么程度
这是所有高级用法里最值得初学者提前知道的东西。
CLAUDE.md 是一个 Claude 在每次对话开始时都会自动读取的特殊文件，用来放置 Bash 命令、代码风格要求和工作流规则，为 Claude 提供它无法从代码本身推断出来的持久性上下文。
举个具体例子，如果你的项目用的是 ES modules 不是 CommonJS，你不写进去，它可能每次都生成 require() 的代码。
如果你希望它每次改完代码都运行一次 lint，你不写进去，它就不会主动做。
写法很简单，就是普通 Markdown，内容大概是这样：
这里有一个坑，就是CLAUDE.md 写太长反而会让 Claude 忽略你的指令，我的经验是控制在 60-80 行以内。
自定义斜杠命令和 MCP 协议集成这些高级用法可以迟点血。
Cursor还是Claude code？
关于是选Cursor还是Claude，其实我自己的想法很简单，如果是编程小白，就直接冲Cursor就行，如果是对自己代码能力比较自信，可以担任代码审查程序员，就用CC或者Codex吧，我自己觉得Codex写的代码其实质量更好（GPT 5.3-Codex-Hight模型）
如何控制成本
最便宜的，就是去申请deepseek、kimi的API，然后把它们加到Claude code中，可以去试试kimi和智谱的最新模型。
第二，就是使用Claude code的中转，这种办法就是稍微有些贵，但是比官网要低，且不需要特殊网络，又没有封号风险，这也是国内很多人的选题，我自己使用的是0011，优点稳定，缺点就是比其他的贵
相关阅读：【无需魔法】Claude Code 2026最新国内中转站，保姆级安装教程
随后就是第三种方法，自己去订阅Claude账号，我之前有说，就不说了，我是在wildAI上进行的订阅。
用顺了基础操作之后，下一步是给 Claude Code 装上更多能力。这里有几个质量最高的免费资源站。
Skills 方面，obra/superpowers（27.9k ⭐）是社区公认天花板，涵盖 TDD、调试、代码审查等软件工程全流程，
想要更全的可以看 VoltAgent/awesome-agent-skills，收录了 Anthropic、Google Labs、Vercel、Stripe、Cloudflare 等官方团队发布的 500+ skills。
MCP 的话，mcp.so 是目前最大的第三方市场，收录超过 18000 个 MCP Server；
mcpservers.org 则是官方推荐的 Web 目录，按分类浏览，质量更有保证。
如果你懒得一个个找，直接去 awesomeclaude.ai 和 hesreallyhim/awesome-claude-code（21.6k ⭐），这两个是综合导航站，skills、MCP、CLAUDE.md 模板、slash commands 全在里面，按需取用。
发布于 2026-03-05 17:55・广东
继续追问
由知乎直答提供
新手入门应该从哪里开始学习？
Claude Code 的登录步骤是什么？
Claude Code 安装需要哪些前提条件？
赞同 2​
4
喜欢
收起​
