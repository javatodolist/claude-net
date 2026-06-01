---
title: Claude App Builder截图流出 Lovable们该慌了
description: Claude App Builder截图流出 Lovable们该慌了。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-14
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - 国内使用
  - AI编程
---

# Claude App Builder截图流出 Lovable们该慌了

![Banner](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137595&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy9aS3FWTGlhSXB6Rm0yUmF2QTlpYjB0ZnI4bUFlV1JnbzR5Q2ljWTJ3aEdSQmlhWFZMaWJxbEkyWlI2UlRQeXFCMkRuU1doa1U0SHF3T2lhb0NpYWVTQVh6amJaYUwwWWljbmdybmZRemdraWE4WEJpYk1pYURjLzY0MD9mcm9tPWFwcG1zZw==)

## 写在前面

一张截图，让整个 vibe coding 圈子都安静了一下。

网友 Tensor 发出了一组泄露图，清晰展示了 Anthropic 正在开发的新功能：App Builder。界面左侧是项目配置区，用户描述自己想做什么，Claude 开始构建，前端、后端、数据库、登录、安全，全套搞定——和 Lovable、Bolt.new 做的事情，一模一样。只不过这次做这件事的，是 Anthropic 自己。

这件事有几个问题值得仔细想想：
- App Builder 真的要来了吗？Anthropic 为什么现在出手？
- OpenAI 的 GPT Store 已经败了，Anthropic 的胜算在哪？
- Lovable、Cursor 这些工具，真的要被釜底抽薪了吗？

---

## 模型厂商下场做应用，这一天早就注定了

Anthropic 一直在走一条路：从工具变成平台。

2025 年中，Claude 上线了 Artifacts，让用户在对话里直接生成可交互的小应用。这个功能迄今已经创作了超过 500 亿次——不是 500 亿条消息，是 500 亿个 Artifact。

同年，Claude Code 发布，六个月做到年化营收 10 亿美元，成为 Anthropic 增长最快的产品线。

今年年初，Anthropic 又打通了与 Slack、Figma、Canva 等 11 款主流工作软件的连接。

![Anthropic 垂直整合之路，从基础模型一步步走向 App Builder](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137595&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9aS3FWTGlhSXB6Rm5ORlE3SDllaWJpYmlheGNCaWFlNXd1eFVhUjRTRElNaWI2Zm9USk5yWU9OdzF4aGNKYnR4aWI2eEFVMDNwVFJJbURGaWN1Y3FKUUdVVkdMaDFFV0Y2VVJ4ckxjUTExeU5EekdhZUZFLzY0MD9mcm9tPWFwcG1zZw==)

现在回头看，这条路的逻辑非常清晰：先让用户用 Claude 做东西（Artifacts），再让开发者用 Claude 写代码（Claude Code），最后让所有人用 Claude 直接构建应用（App Builder）。每一步，都在往应用层再推进一步。

---

## 截图里的 App Builder，到底是什么样的

从流出的四张截图来看，App Builder 的定位非常直接：你在 Claude 里描述想做什么，Claude 就把应用建出来。

![App Builder 界面：项目创建面板](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137595&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy9aS3FWTGlhSXB6Rm0yUmF2QTlpYjB0ZnI4bUFlV1JnbzR5Q2ljWTJ3aEdSQmlhWFZMaWJxbEkyWlI2UlRQeXFCMkRuU1doa1U0SHF3T2lhb0NpYWVTQVh6amJaYUwwWWljbmdybmZRemdraWE4WEJpYk1pYURjLzY0MD9mcm9tPWFwcG1zZw==)

界面左侧是项目配置区，用户输入需求，Claude 接着构建，屏幕上显示"YOUR APP WILL BE READY SHORTLY"。

![App Builder 界面：代码生成视图](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137595&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9aS3FWTGlhSXB6RmxEeTFQSXNWRE4zSk1MY2xhUWRtWVlrQ29wWmZEZmFLVDRmTm91Qko1ZGVpYllZR21naWJDWlY2VEh6OElzbnRIM3dpYjBGMzVXS2dqSE40M1pWejc3eksyRWVzaWF2MzM0ZVFJLzY0MD93eF9mbXQ9anBlZyZhbXA=;from=appmsg)

它生成的不是单页组件，而是完整的全栈应用：前端、设计、后端、数据库、登录、安全一条龙。截图里还能看到应用的实时预览界面。

![App Builder 界面：应用实时预览](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137595&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9aS3FWTGlhSXB6RmtmMlc2aDYzTUhNaGtWUGliUXBDVzdlbUQ3ZmFtbFFvS1p6dWFpYjBFc2VBbWxlNVZXdjF1VFBEMm55NlBXN2hhSDBrWHU1Z2ljRWNpYkduUkhlTjRjcmJXOU5XaWFUc1VWb2dacy82NDA/d3hfZm10PWpwZWcmYW1w;from=appmsg)

最后还有发布界面——应用做完，直接发布上线，整个流程一气呵成。

![App Builder 界面：应用发布界面](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137595&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X2pwZy9aS3FWTGlhSXB6Rm04dmlicVVqSjhhb21ldnZuVEZ3THZURGNvc1NuVko1Q2x4Y1dVd2s1OHlBYWY1MFZmMExhZ0NpY3Z4T0hia3dwbHhETTdEbGVCSHRQWHJpYmEySGI3eEV3amV0NlZpYUpCTkNJLzY0MD93eF9mbXQ9anBlZyZhbXA=;from=appmsg)

跟 Lovable 和 Bolt.new 的核心体验几乎完全重叠。唯一不同的是——这次做这件事的是模型本身的厂商。

值得一提的是，Claude Code 源码的 roadmap 里已经藏着 KAIROS（后台自主调度）等功能，Agent Swarms（多智能体协作）也已上线。App Builder 和这些东西拼在一起，越来越像一个完整的应用层图谋。

---

## OpenAI 已经败过一次，Anthropic 的胜算在哪

说到模型厂商做应用层，OpenAI 认真试过一次了。

2023 年 3 月，ChatGPT Plugins 开放；2024 年 1 月，GPT Store 正式上线。发布当天非常热闹，300 多万个自定义 GPT 被创建出来，很多人在炫耀自己的 GPT 被用了多少次。

结果：Plugins 几个月后悄悄关掉了，GPT Store 里大多数 GPT 无人问津，承诺的开发者分成也一直没有兑现。

![Apple App Store vs GPT Store 对比](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137595&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy9aS3FWTGlhSXB6Rm10Sm9pYWdoMkxSQVdvbjdocExuRGtnc2V3c1NTUHpMS2lhSU5QaFBLOVBERWNwV2ttWjhoOUJsSktoeDFwdjJXOFo2dXJnWkxid0R4WFU2bUFGQTJ6ZXh1VHhrRlJMTm5pY1EvNjQwP2Zyb209YXBwbXNn)

GPT Store 的逻辑是想复刻 Apple App Store——苹果用封闭的分发渠道，把手机变成了应用平台。问题是，OpenAI 没有苹果的硬件入口，流量无法锁定，开发者投入了时间却拿不到用户。

Anthropic 的 App Builder 走的是另一条路：**不是"在平台上卖应用"，而是"让用户自己造应用"**。这一步绕开了平台经济中最难解决的流量分发问题，和 GPT Store 的逻辑有本质区别。

---

## Lovable 们：高速增长，但地基在抖

对 vibe coding 赛道来说，这个消息的含义很直接。

Lovable 截至今年已经做到年化营收 4 亿美元，估值 66 亿美元，增速相当惊人。但整个赛道有个结构性的脆弱：它们买的是模型厂商的算力，却在和模型厂商争用户。

Cursor 的处境最典型——它以零售价从 Anthropic 和 OpenAI 购买模型能力，而模型厂商自己以批发价使用，利润空间被严重压缩。有创始人形容这个行业的利润率"惨不忍睹"，真的一点都不夸张。

![Lovable、Cursor 等工具的结构困境：以零售价进货，却和供货商争用户](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137595&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy9aS3FWTGlhSXB6Rm1ETlRIdnNxTVBoODFZN1lmMnpKNlRFNXZxUEhpYVBzaWMwaHRmbVhQdEtLUmJsUDdrb2tkRHZNZWd0M1d2Vk9vamdzcDJ0QThJWEZ6aWF1ZlVpYTFxSnhYSERoazkxSXhpYk9YWS82NDA/ZnJvbT1hcHBtc2c=)

从结构上看，应用层是模型厂商在垂直整合路上，离自己最近的那块地，也是最自然会先下手的地方。

---

## 谁来做 AI 时代的 App Store

背后的问题是：苹果的 App Store 是 2008 年那代互联网的入口生意，谁控制了入口，谁就收三成。那么 AI 时代的"入口"，到底该是谁的？

![三方争夺 App Store 王座：苹果已在奖台、OpenAI 摔倒、Anthropic 正在冲刺](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137595&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9aS3FWTGlhSXB6Rm1MVGNCb3VRQ21pYXFtaWJLWmlhZFkxSDR2d2ZWV3JYWmliU0xoRHVZbnVvMmNScVBManVzamw2SVRaZmhEVkRZU2RpYndXQm1BZ2ljaDcwZDdseXczVzFraEtFa0l0cWVqVURSQlUvNjQwP3d4X2ZtdD1qcGVn)

苹果已经在奖台上了；OpenAI 的 GPT Store 摔了一跤；Anthropic 现在正在冲刺。

Artifacts 的 500 亿次使用是一次预跑。如果 App Builder 成功上线，让普通用户都能在 Claude 里造出自己的应用，Claude 自己就成了那个新的应用分发入口。这一步，Anthropic 看起来胸有成竹。

---

## Claude Code 是什么？能做什么？

顺带介绍一下 Claude Code——Anthropic 旗下的 AI 编程 Agent，也是目前工程化落地中最主流的 Agent 形态之一。

跟 Copilot 式代码补全不同，Claude Code 更接近一个能独立干活的开发搭档：

- 读写项目文件，跨文件理解和修改代码
- 执行 shell 命令、运行测试、查 git 状态
- 自主调试，出了问题自己找原因再修
- 通过 Skills 和 hooks 集成进你的工作流

官方订阅走 Claude.ai：Pro 计划 20 美元/月，Max 计划 100 美元/月（含更多 Claude Code 额度）。

不过说实话，官方订阅对国内用户不太友好——需要海外信用卡，网络环境也得折腾。如果嫌麻烦想找个更省事的渠道，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q1：App Builder 是已经上线了吗？**

A：目前还没有正式上线，是通过泄露截图和社区爆料确认的，Anthropic 官方尚未正式宣布发布时间。

---

**Q2：App Builder 和 Lovable / Bolt.new 有什么区别？**

A：定位几乎相同，都是让用户描述需求、自动生成完整的全栈应用。核心差异在于：App Builder 是模型厂商亲自做，有算力和模型上的天然成本优势；Lovable 等工具是从 Anthropic/OpenAI 买算力的，结构上处于劣势。

---

**Q3：Anthropic 为什么要做应用层？**

A：从 Artifacts → Claude Code → App Builder 这条线来看，Anthropic 一直在往用户侧推进。控制了应用层入口，就控制了流量和留存。这是一个平台级的商业逻辑，而不只是功能扩展。

---

**Q4：GPT Store 失败了，App Builder 能成功吗？**

A：两者的模式不同。GPT Store 是"让开发者在平台上卖应用"，需要解决流量分发问题，这点 OpenAI 做不到。App Builder 是"让用户自己造应用"，需要解决的是体验和上限问题，这点 Claude 的模型能力是优势。胜负还要等正式上线后的实测来验证。

---

**Q5：国内怎么用上 Claude Code？**

A：国内用户可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。
