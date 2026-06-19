---
title: 程序员如何用好 Cursor 工具？
description: 程序员如何用好 Cursor 工具？。本文属于Claude 对比评测专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 对比评测
tag:
  - Claude
  - 国内使用
  - AI编程
---

# 程序员如何用好 Cursor 工具？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
​最近在推特（X）上刮起了Cursor+Claude 3.7的风，很多用户反馈在Cursor里面用上Claude3.7简直效率加倍。
不仅编程能力提高了一个台阶，而且生成的的质量变得更好了。
就比如博主@花生使用Claude3.7+Cursor的组合生成了一套精美的产品原型图。
Claude3.7+Cursor的编程能力更不用说了，很多大佬都快玩疯了，零代码操作让普通人都能使用Cursor+Claude 3.7的组合构建了一个3D角色扮演游戏，效果好到爆。
不过不建议零基础的小白尝试，毕竟报错了，也不知道咋改.......
甚至还有博主@糖串sensei.分享了他使用Cursor+Claude3.7的进行写作，分分钟就能生成一篇高质量的文章。
最近如何利用AI工具提升编程效率成为了许多开发者关注的焦点。
随着Claude 3.7模型的爆火出圈，一套高效的AI辅助编程组合逐渐形成：Cursor编+Claude 3.7 Sonnet大模型。
今天这篇文章将详细介绍如何在Cursor中接入Claude 3.7API，实现无限制使用，让你的开发效率翻倍。
如果大家觉得Claude 3.7太贵了，在文章的后面还介绍了如何在Cursor中接入DeepSeek（DeepSeek的编程能力也是十分抗打的）。
一、接入Claude API
Claude 3.7 Sonnet作为Anthropic公司最新推出的大模型，其编程能力再一次得到巨大的飞跃，下面是详细的接入步骤：
注册Anthropic账号
1.打开Anthropic官网点击「Start building」按钮。
2.使用海外邮箱进行注册（推荐Gmail或Proton Mail）,随后点击"创建账号"。
帐号创建后，就来到了下一步，申请API Key。
获取API密钥
1.进入页面，我们就可以看到「Get API Keys」，
随后点击"Create key"按钮，并选择默认工作区，设置好API密钥名称，最后点击"Add"生成密钥
最后复制并保存好生成的「API Keys」，不要泄漏出去。
到了这里还不能直接使用「API Keys」，因为我们还没有添加支付方式。
在这里，可能对个别人来说稍微有点难，因为没有海外支付卡，无法绑定Claude。
如果没有的话，你可以去野卡或其他平台申请一张海外支付卡片用于Claude API的绑定。
这里就不过多阐述了，如果没有支付方式的小伙伴，可以看这篇文章：野卡是什么？如何使用野卡？
设置支付信息
1.首先找到"Billing"按钮并点击，然后再点击"Get started"按钮。
2.将卡片的信息填写到Claude API的绑卡页面（注意关掉网页翻译再提交，避免报错）。
因为我没有海外支付卡片，这里我是使用的野卡提供的卡片信息进行填写的。
完成后，就可以进行最后一步，将获取的「API key」填写到Cursor页面中去。
在Cursor中配置Claude
1.打开Cursor编辑器，点击设置，最后选择"Models"选项。
2.随后将获取的「API Key」填写到配置页面。
完成以上操作，再到第一个页面选择一个Claude的模型即可。
很多人会觉得获取Claude API有点麻烦，确实也是如此，大家可以去一些API中转站获取，方法会更加简单的，就比如下面这两个平台，应该基本上都能满足大家的需求。
OpenRouter：海外大型的AI模型聚合平台，基本上市面上所有的AI模型的API都有接，不过这个是海外平台，大家得用魔法。
相关阅读：国内用户如何使用OpenRouter
2233.ai：这个是国内知名的API中转平台，不需要魔法，但是模型比较少，只支持OpenAI家族、Claude家族以及Deepseek。
https://2233.ai/i/AGENT
如果大家觉得Claude比较贵，那国产之光Deepseek或许会是一个不错的选择，毕竟Deepseek R1模型的编程能力可是备受好评。
下面是详细的操作过程。
二、接入DeepSeek API
获取DeepSeek API密钥
1.进入DeepSeek官网，点击右上角的"API开放平台"，然后在侧边栏找到"API keys"选项并点击。
2.点击"创建"按钮，随后设置密钥名称。
3.最后不要忘记充值。
在Cursor中配置DeepSeek
1.打开Cursor编辑器，点击设置，然后选择"Models"选项，最后将DeepSeek密钥填入OpenAI配置栏中。
配置服务地址
1.返回DeepSeek平台并找到"接口文档"，获取服务地址。
​2.将服务地址复制到Cursor相应位置。
​注意：由于DeepSeek近期非常火爆，官方API可能会出现拥堵。如遇此情况，可以考虑使用第三方平台提供的API服务。
好了，今天的教程就分享到这里，大家感兴趣的话可以去尝试一下，自己使用下来，感觉还是非常爽的～～

如果你在 Cursor 里更想用 Claude，又嫌官方订阅麻烦，国内可以接 [Code80](https://code.ai80.vip/home)：真实 Claude 订阅帐号转 API，和官方接口完全兼容，把 base url 和 Key 填进去就能用，支持国内支付，配置方式和上面接 DeepSeek 差不多。地址：[code.ai80.vip](https://code.ai80.vip/home)。

发布于 2025-03-20 19:45・广东
赞同​
1
喜欢
收起​
