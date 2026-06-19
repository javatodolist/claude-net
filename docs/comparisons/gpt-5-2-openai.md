---
title: GPT 5.2 正式发布，OpenAI 称其为「最强专业知识工作大模型」，有哪些技术亮点？
description: GPT 5.2 正式发布，OpenAI 称其为「最强专业知识工作大模型」，有哪些技术亮点？。本文属于Claude 对比评测专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 对比评测
tag:
  - Claude
  - 国内使用
  - AI编程
---

# GPT 5.2 正式发布，OpenAI 称其为「最强专业知识工作大模型」，有哪些技术亮点？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
上周，OpenAI CEO奥特曼刚宣布完公司进入“红色警戒”（Code Red）状态，要求团队将工作重心转移到提高ChatGPT的性能和用户体验上后。
就在今天，OpenAI发布了最新的顶级模型 GPT-5.2系列。
先说一个可怕的事实，免费用户无法使用GPT-5.2.
如果你想要使用GPT-5.2，只能花钱。
感兴趣的，可以看我之前写的一篇文章
2025全新ChatGPT Plus订阅的六种方法，实测有效！
GPT-5.2 将向 ChatGPT 付费用户开放，并通过 API 提供给开发者，一共分为三个系列：
GPT‑5.2 Instant（即时版）
GPT‑5.2 Thinking（思考版）
GPT‑5.2 Pro（专业版）
在OpenAI官方公布的基准测试中，它几乎对Gemini 3 Pro、Claude Opus 4.5实现了全方位碾压。
值得注意的是， GPT‑5.2 Thinking在AIME 2025（数学）的分数达到了满分，Gemini 3 Pro 的分数是 95%。
OpenAI应用CEO Fidji Simo曾说过，GPT-5.2 的设计目标就是为人们创造更多经济价值。
那么如何创造呢？
那就不得不提到GPT-5.2的拿手好戏：制作电子表格、构建演示文稿、编写代码、理解图像、处理超长上下文、使用工具，以及执行复杂的多步骤项目等等。
空口无凭，让我们先来看看数据。
在OpenAI新出的基准测试GDPval（覆盖 44 个职业、针对明确知识工作任务的评估体系）中，GPT-5.2 Thinking 在70.9%的任务上胜过或打平行业专家，GPT-5.2 Pro更高，为74.1%。
主要测试内容为制作演示文稿、电子表格以及其他专业产出物。
官方还放出了对比图，GPT-5.2 做的表格比GPT-5.1确实精细很多。
一个评审员对此的评价是：“看起来像是一个有员工的专业公司做的，布局和建议都很专业，虽然还有一些小错误需要修正。”
另外，GPT-5.2 Thinking生成输出的速度也超过人类专家11 倍以上，成本不到人类专家的1%。
OpenAI 声称这是AI模型首次达到了“人类专家水平”。
在ARC-AGI放出的测试中，此前o3 (High) 在ARC-AGI-1测试得分为88%，平均每项任务成本为4500美元。
而GPT-5.2 Pro (X-High) 最新SOTA得分为90.5%，是第一个突破90%的模型，它的平均任务成本仅为11.64美元，在一年内效率提高了约390倍。
ARC-AGI-2（抽象推理）的分数是 52.9%，相较此前翻了三倍，对比Gemini 3 Pro是 31.1 %。
GPT-5.2 Thinking的代码能力也同样刷新了纪录：
在SWE-bench Verified上，得分达到80%。
在SWE-Bench Pro上，得分达到55.6%。
SWE-Bench Pro是新的代码基准测试，比SWE-bench Verified更难，涵盖四种编程语言，不只是Python，更接近真实软件工程。
早期测试者特别提到，GPT-5.2在前端的能力也明显提升了，尤其是3D和复杂UI。
官方也放出了由单prompt生成的demo：
同时，GPT-5.2 Thinking在长文档处理方面的表现也很亮眼。
在OpenAI自制的MRCRv2（长文档中多个信息点的整合能力）评测中，GPT-5.2 Thinking成为首个在256k 上下文长的4-needle上达到接近100%准确率的模型。
不过，更难的8 needle版还是有明显下降。
GPT-5.2 Thinking的视觉能力也明显提升，错误率基本减半。
在CharXiv Reasoning测试中，GPT-5.2 Thinking得分达到88.7%，GPT-5.1是80.3%。
在ScreenSpot-Pro测试中，GPT-5.2 Thinking得分达到86.3%。GPT-5.1 是 64.2%。
在官方放出的示例中，OpenAI 要求模型识别输入图像中的组件，并返回带有大致边界框的标签。
即使在低质量图像上，GPT-5.2 也能识别出主要区域，并放置有时能与每个组件真实位置相匹配的框；而 GPT-5.1 仅标记了少数几个部分，且对其空间排列的理解要弱得多。
而且，GPT-5.2 Thinking 的幻觉比GPT-5.1 Thinking更少了。
在一组去标识化的ChatGPT查询中，前者包含错误的回答相对减少了30%。
最后，我们来聊聊价格，GPT-5.2的价格一如既往的贵到离谱。
GPT-5.2的定价为1.75美元/百万输入Token，14美元/百万输出Token，缓存输入有90%的折扣，比GPT-5.1贵40%。
ChatGPT订阅价格不变。
但是！
在多个智能体评估中，尽管GPT-5.2的每Token成本更高，但GPT-5.2由于更高的Token效率，性价比反而更高。
ChatGPT 将于今日开始逐步推出 GPT-5.2（包括 Instant、Thinking 和 Pro 版本），首先面向付费用户（Plus、Pro、Go、Business 和 Enterprise 版本）提供。
为确保 ChatGPT 的流畅性和稳定性，GPT-5.2 将分阶段部署，在 ChatGPT 中，付费用户仍可在三个月内继续使用 GPT-5.1（旧版模式），之后 GPT-5.1 将逐步下线。

GPT-5.2 的 API 价格看着是真不便宜。如果你更习惯用 Claude 干活，国内想直接调 Claude API 又不想折腾海外卡和网络，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅账号转 API，和官方完全兼容，换个 endpoint 就能用，支持国内支付。地址 [code.ai80.vip](https://code.ai80.vip/home)。

发布于 2025-12-12 17:08・广东
赞同​
收藏
喜欢
收起​
