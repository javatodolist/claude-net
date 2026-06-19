---
title: Claude上线了「导入记忆」功能，仅需复制粘贴就能迁移ChatGPT的数据，这意味着什么？
description: Claude上线了「导入记忆」功能，仅需复制粘贴就能迁移ChatGPT的数据，这意味着什么？。本文属于Claude 对比评测专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 对比评测
tag:
  - Claude
  - 国内使用
  - AI编程
---

# Claude上线了「导入记忆」功能，仅需复制粘贴就能迁移ChatGPT的数据，这意味着什么？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
3 人赞同了该回答
目录
这个功能到底是什么？
稳定性怎么样？能正常用吗？
对ChatGPT来说，这是一场抢人的宣战
这是 Anthropic 目前打出的最聪明的一张牌。
这个功能到底是什么？
不复杂，三步搞定：
第一步，把下面这段 Prompt 粘贴进 ChatGPT：
I'm moving to another service and need to export my data. List every memory you have stored about me, as well as any context you've learned about me from past conversations. Output everything in a single code block so I can easily copy it. Format each entry as: [date saved, if available] - memory content. Make sure to cover all of the following — preserve my words verbatim where possible: Instructions I've given you about how to respond (tone, format, style, 'always do X', 'never do Y'). Personal details: name, location, job, family, interests. Projects, goals, and recurring topics. Tools, languages, and frameworks I use. Preferences and corrections I've made to your behavior. Any other stored context not covered above. Do not summarize, group, or omit any entries. After the code block, confirm whether that is the complete set or if any remain.
第二步，ChatGPT 会吐出一个代码块，里面是它对你的所有记忆——你的职业、偏好、写作风格、惯用语气、项目背景……
第三步，把这个代码块复制，粘贴进 Claude 的记忆设置里，完成。
就这样，Claude 直接「继承」了 ChatGPT 对你的了解，不用从零开始介绍自己。
不过在实测的过程中，发现OpenAI似乎已经意识到了问题。
能够导出的记忆基本是None。（当然和每个人账户的聊天多少也有很大的关系）
如果你实在是想要完整导出记忆功能，就需要使用OpenAI自己的个人数据下载功能。
也就是说OpenAI让Cladue轻松就能获取最宝贵的信息。
同样地提示词在Gemini中，就可以获得基础信息。
稳定性怎么样？能正常用吗？
直说：功能本身没问题，但时机有点微妙。
这个功能是 3 月 2 日正式上线的，但就在同一天，Claude 出现了长达数小时的大规模宕机——Chat、API、Claude Code 全部受影响。
原因很简单：过去一周 Claude 的注册量暴涨，Anthropic 官方自己说，日注册量是 1 月份的 4 倍，免费用户增长超过 60%，服务器直接爆了。
所以这个「导入记忆」功能刚上线就碰上了稳定性问题，不是功能本身的 bug，是流量太猛基础设施没跟上。
目前（3 月 3 日）服务基本恢复正常，功能可以正常使用。
另外有一点要注意：这个记忆导入是手动的，不是自动同步。 ChatGPT 记住的东西越多，导出的内容质量越高；如果你之前用 ChatGPT 很浅，导出来的也就是几条基本信息，没什么用。
并且我看有的回答说，这次记忆迁移的比较浅，大家可以自己去试试。
如果你还不会注册和订阅Claude，可以看我之前的文章，这个方法是封号会退款的，可以去试试。
相关阅读：
告别封号！2025最新Claude注册及Pro付费教程，100%成功
21 赞同 · 0 评论 文章
对ChatGPT来说，这是一场抢人的宣战
OpenAI 靠记忆功能积累用户粘性，本质上是在构建「数据护城河」，你用得越久，迁移成本越高，越难离开。
Claude 这个「导入记忆」功能，直接把这个护城河给撬开了一个口子。
并且，这个操作本身是单向的。ChatGPT 目前没有对等的「从 Claude 导入」工具，这意味着 Anthropic 在主动破坏竞争对手的锁定效应，而自己却在积累新用户。
而且Anthropic 真的太会抓机会了。
过去一周发生了什么？
特朗普下令封杀 Claude，美军却还在用 Claude 打伊朗
OpenAI 宣布与五角大楼合作，引发大量用户反弹
Claude 冲上 App Store 免费榜第一，超过了长期霸榜的 ChatGPT
Anthropic 宣布拒绝大规模监控和自主武器的红线，赢得了一波口碑
就在这波流量最高峰的时候，Anthropic 推出了「零门槛迁移」工具。
时间节点卡得非常准，你刚因为价值观问题对 Claude 产生好感，想试试，发现门槛几乎为零，还能把之前的数据带过来。
你说你迁不迁？ChatGPT这波都只能受着。
再加上，年前的CC和 Claude cowrok，本身就对用户有着致命的吸引力。

被这波 Claude 安利、想真正上手的话，注册和订阅那一关国内还是有点门槛。如果只是想用上 Claude API（比如玩 Claude Code），可以直接走 [Code80](https://code.ai80.vip/home)，真实订阅账号转 API，换个 endpoint 就能接，跟官方一致，也支持国内支付，省去海外账号和绑卡。见 [code.ai80.vip](https://code.ai80.vip/home)。

发布于 2026-03-03 10:54・广东
继续追问
由知乎直答提供
这个功能对其他AI助手有效吗？
这个功能如何保护用户隐私？
迁移后的记忆如何影响对话质量？
赞同 3​
1
喜欢
收起​
