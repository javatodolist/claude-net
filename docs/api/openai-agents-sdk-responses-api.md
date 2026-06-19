---
title: 如何评价 OpenAI 新推出的 Agents SDK 和 Responses API？
description: 如何评价 OpenAI 新推出的 Agents SDK 和 Responses API？。本文属于Claude API 接入与开发专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude API 接入与开发
tag:
  - Claude
  - 国内使用
  - AI编程
---

# 如何评价 OpenAI 新推出的 Agents SDK 和 Responses API？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
就在刚刚，OpenAI 扔出了一枚重磅炸弹，发布了一系列全新的工具和API，旨在彻底简化AI Agent的开发流程，让无论是AI小白还是略懂AI的普通人，都能轻松构建强大、可靠的Agent！
过去一年，OpenAI 不断推出新的模型能力，如高级推理、多模态交互和安全技术，为构建能够处理复杂、多步骤任务的AI Agent奠定了基础。
但是，许多开发者反馈，将这些能力转化为生产级别的Agent应用仍然充满挑战，往往需要大量的提示词迭代和自定义的流程逻辑，而且缺乏足够的可视化和内置支持。
为了解决这些难题，OpenAI 推出了全新的 Responses API、三种内置工具以及以及一个开源的 Agents SDK。
省流版：
Responses API: 将 Chat Completions API 的简洁性与 Assistants API 的工具使用能力相结合的新型API接口。
网页搜索：让模型访问互联网获取最新信息的工具， 快速获取最新信息，并提供清晰、相关的引用来源。
文件搜索： 轻松从大量文档中检索相关信息，支持多种文件类型、查询优化、元数据过滤和自定义重排序。
计算机使用（Computer Use Tool）： 让AI Agent能够执行鼠标和键盘操作，实现计算机使用的自动化，像人一样使用电脑。
Agents SDK：基于 Swarm 框架升级，简化多 Agent 工作流程编排的开源框架，提供Agent配置、智能切换、安全防护、跟踪和可观测性等功能。
Responses API
还记得 OpenAI 之前推出的 Chat Completions API 和 Assistants API 吗？前者简单易用，后者功能强大。但如果要构建一个能干又聪明的 AI 智能体（Agent），你需要在两个 API 之间反复横跳，甚至还要对接各种外部工具。
而现在，OpenAI 推出了全新的 Responses API，将 Chat Completions 的简洁性和 Assistants 的强大功能完美融合，让你只需一次 API 调用，就能轻松构建各种 AI 智能体！
同时Responses API 集成了最新发布的内置工具，网页搜索、文件搜索、计算机使用，这能让大家的 AI 智能体不再是“纸上谈兵”，而是真正能够连接真实世界，获取信息、处理文档、以及操作电脑。
同时OpenAI明确表示使用Responses API, 你的数据默认不会被拿来训练OpenAI的模型，大家可以放心使用。
网页搜索
在内置工具方面，网页搜索工具可以快速获取网络上的最新信息，同时搜索结果附带清晰的引用链接，能追溯信息来源，确保准确性。
基于GPT-4o 和 GPT-4o-mini, 在SimpleQA测试中, 准确率高达90% 和 88%!
文件搜索
当面对一大堆文件手足无措的时候，这个工具或许能很好解决你的问题，文件搜索工具支持多种文件类型，如常见的PDF、Word 还是其他格式。
同时通过查询优化、元数据过滤等技术，快速找到你需要的信息，能做到快速匹配。
计算机使用
计算机使用工具则由与 Operator 相同的 Computer-Using Agent (CUA)模型提供支持，可捕获模型生成的鼠标和键盘操作，如在浏览器中自动执行各种任务，如网页测试、数据录入等。
同时OpenAI表示：即使是那些没有 API 的老旧系统，也能通过计算机使用工具实现自动化操作。
目前在 OSWorld、WebArena 和 WebVoyager 基准测试中分别取得 38.1%、58.1% 和 87% 的成绩。
Agents SDK
当有了强大的 AI 智能体（Agent）和厉害的工具，那么就还差一个“指挥官”，来协调它们之间的工作。而OpenAI 全新推出的开源 Agents SDK就是“指挥官”的角色。
它能根据用户需求，智能地将任务分配给最合适的 Agent，并确保 Agent 之间无缝交接，避免信息丢失或重复工作，还会对 Agent 的输入和输出进行安全检查，确保结果可靠，并能清晰地展示 Agent 的执行过程，方便你调试和优化。
相较于 Swarm框架⁠ 有了显著的改进。
它的应用场景也是相当的广泛，比如让多个 Agent 协同处理用户咨询、退款等问题，或者是多个 Agent 协同进行信息收集、分析、报告撰写等等
同时OpenAI还明确表示Agents SDK 可以与 Responses API 和 Chat Completions API 协同工作，还可以与提供类似 Chat Completions API 的其他模型提供商的模型一起使用。
目前支持 Python，Node.js 支持即将推出。
最后给大家附上这些工具的价格，不得不说，这价格着实有点贵，感兴趣的可以去试玩一下，
Web 搜索每千次查询分别为 GPT-4o 搜索 30 美元和 GPT-4o-mini 搜索 25 美元。
文件搜索每千次查询 2.5 美元，文件存储 0.1 美元/GB/天（首 GB 免费）。
计算机使用工具则按每输入百万 token/3 美元和每输出百万 token/12 美元计费。
如果你在使用OpenAI API途中遇到支付难题，可以参考一下往期的内容：
国内用户如何解决OpenAI API的支付难题
mp.weixin.qq.com/s/rjq9j4FO_qEtdgBS1QNKIg

文末也补一句：Agents SDK 本身就支持接别家的模型，如果你想在多 Agent 流程里换 Claude 试试，国内用户可以通过 [Code80](https://code.ai80.vip/home) 直接调 Claude API，真实订阅帐号转出来的接口，改个 endpoint 就能用，省掉海外卡和网络的麻烦，详见 [code.ai80.vip](https://code.ai80.vip/home)。

编辑于 2025-03-12 13:53・广东
赞同​
收藏
喜欢
收起​
