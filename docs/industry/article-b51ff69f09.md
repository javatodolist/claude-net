---
title: 如何评价美团新开源的全球首个「重思考」AI模型，该模型与其他思考模型有什么区别？
description: 如何评价美团新开源的全球首个「重思考」AI模型，该模型与其他思考模型有什么区别？。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - 国内使用
  - AI编程
---

# 如何评价美团新开源的全球首个「重思考」AI模型，该模型与其他思考模型有什么区别？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
1 人赞同了该回答
近日，美团重磅更新并开源自家模型LongCat-Flash-Thinking-2601。
据介绍，此次发布的模型是LongCat-Flash-Thinking模型的升级版，拥有 5600 亿个参数，并基于的 MoE 架构构建。
LongCat-Flash-Thinking-2601 最大的不同，就在于它引入了重思考模式（Heavy Thinking Mode）。
简单来说，这个模式让模型能同时启动 8 个大脑思考，从不同角度和深度推理同一个问题，最后总结出一个更全面、更可靠的结论。
给大家看一个简单的例子就明白了。
提示词：1+1为什么不等于2
可以看到，重思考模式相当于使用了8个模型同时进行推理工作，最后的给出的8个答案在进行反复验证，最终会得到一个最终解。
除此之外，LongCat团队在新模型中加入了额外的强化学习环节，针对性打磨模型的总结归纳能力，从而让LongCat-Flash-Thinking-2601实现“想清楚再行动”的结果。
不过在体验的时候，由于相当8款模型同时在推理，所以它的上下文非常容易耗光，会经常返回“当前对话上下文过长，建议精简输入后重试”。
那这款模型表现到底如何？我们先来看LongCat-Flash-Thinking-2601的纸面实力。
首先是大家最关注的编程能力上，LCB 评测拿到 82.8 分，OIBench EN 评测获 47.7 分，这些成绩处于同类模型第一梯队。
数学推理方面，开启重思考模式后更猛。
AIME-25 评测中取得 100.0 分（满分），IMO-AnswerBench 中以 86.8 分 达到当前 SOTA。
智能体工具调用上，τ²-Bench 评测 88.2 分，VitaBench 评测 29.3 分，均为开源 SOTA 水平。
智能体搜索方面，BrowseComp 任务 73.1 分（全模型最优），RW Search 评测 79.5 分。
最关键的是什么？在工具调用的泛化能力上，LongCat-Flash-Thinking-2601 超越了 Claude-Opus-4.5-Thinking。
目前该模型已经上线，感兴趣的用户可以去体验一下。
体验链接：https://longcat.ai
模型地址：https://huggingface.co/meituan-longcat/LongCat-Flash-Thinking-2601
GitHub：https://github.com/meituan-longcat/LongCat-Flash-Thinking-2601
Claude Opus 4.5 国内使用完全指南｜实测6种方式，最稳的方法居然是这几个！
2025全新ChatGPT Plus订阅的六种方法，实测有效！
发布于 2026-01-21 16:05・广东
赞同 1​
3
喜欢
收起​
