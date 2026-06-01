---
title: OpenAI 正式发布 GPT 4o的图片生成功能API，2块钱一张张，到底贵不贵？
description: OpenAI 正式发布 GPT 4o的图片生成功能API，2块钱一张张，到底贵不贵？。本文属于Claude API 接入与开发专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude API 接入与开发
tag:
  - Claude
  - 国内使用
  - AI编程
---

# OpenAI 正式发布 GPT 4o的图片生成功能API，2块钱一张张，到底贵不贵？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
两块钱一张，是真的贵啊，虽然它目前把最好、做好玩的GPT-4o图片生成的功能的API开放出来了，对于普通人来说，还是在ChatGPT官网上使用吧。
不过有一点好，无需担心降智问题。
4o图像API支持两种不同的功能：
生成图片（Generations）：根据文本提示词从头开始生成图像，还可以设置n参数以在单个请求中一次生成多张图片（默认情况下，API 返回一张图片）。
编辑图片（Edits）：使用新的提示词修改现有图像，可以是部分修改或全部修改。
以及支持自定义图片的尺寸、质量（low、Medium、high）、格式、背景等。
再来看一下大家最关心的价格。
gpt-image-1（GPT-4o API的名字）按照Token计算，包含三大部分：输入文本和输入图像的Token以及输出图像Token，价格有所不一样。
输入文本token：$5.00/1M tokens；
输入图像token：$10.00/1M tokens；
输出图像token：$40.00/1M tokens；
同时价格根据图片的质量、尺寸也有所不同。
简单换算了一下，一张低质量的图片大概是0.02美金，也就是0.14元，一张高质量的图片大概得1.5元，具体得按照输入文本和图像以及输出图像来计算。
现在可以调用gpt-image-1来使用GPT-4o的图片生成功能了。
接下来，我将详细讲解如何在OpenAI平台申请API密钥(API keys)，帮助你在自己的程序或工作流中实现GPT-4o的图片生成功能。
在申请OpenAI API Key之前，你要先准备三个东西：
ChatGPT帐号
海外支付卡片
稳定的魔法
注意：因为ChatGPT不支持国内的支付卡，就算是国内的master卡和Visa卡都不行，得要海外的支付卡片才能充值，如果解决不了支付问题，可以去野卡平台搞定。
野卡官网：https://yeka.ai/i/AGENT
关于我选择野卡的原因，之前的文章有写，大家感兴趣的可以去看一下。
相关阅读：
野卡Wildcard和Bingocard哪个更好用？超详细对比评测
mp.weixin.qq.com/s?__biz=MzkwNTc1NjE3Nw==&mid=2247486864&idx=1&sn=b32a8271d24c0a58d1561a6df53791ad&scene=21#wechat_redirect
准备好之后，就可以去获取OpenAI API key了。
首先使用准备好的ChatGPT帐号登录 OpenAI platform，登录后，按照图片上的操作进到绑卡页面。
随后将卡片信息一一填写到对应的位置上，完成绑卡。
绑卡结束后，就可以往里面充值了，最好是卡片保留10美金，因为OpenA首次充值是会收取5美金的预扣款，后续是会退回的。
随后我们进入到 API key界面，创建我们的 API keys。
最后就可以获取到 Open AI 的API key了。
好了，今天的分享就到这里，最后，问大家一个问题，2块钱一张GPT-4o生成的图片到底贵吗？
发布于 2025-04-24 14:25・广东
赞同​
1
喜欢
收起​
