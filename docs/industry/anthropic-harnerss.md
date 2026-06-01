---
title: 重磅 Anthropic官方Harnerss发布了
description: 重磅 Anthropic官方Harnerss发布了。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-12
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - 国内使用
  - AI编程
---

# 重磅 Anthropic官方Harnerss发布了

![Claude Managed Agents 架构](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137496&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy96VzZTOXZ0MGNTaWNvSUp6a0s4bnVwWGxjakhaR2Z0N1lUalBhWWcwUHBnaWF5WjVpY2FpYjhQdzNTSTNUUHJId1FONzFVU05La3N5QjFSYmhRbzYybGdMaHJPQ2liWHhYZ3N3emxBZEp4RTJZR01NLzY0MD93eF9mbXQ9anBlZyZhbXA=;from=appmsg)

## 写在前面

你可能也有这种感觉：Agent 的 demo 越来越容易做了，但真正上生产还是很难。难点不在模型本身，而在那一整套“没人愿意做但必须有人做”的基础设施：沙箱、权限、状态恢复、追踪、审计、会话持久化。

Anthropic 这次发布 Claude Managed Agents，最关键的不是又多了一个 API，而是把 Harness 从“工程理念”做成了“可直接用的托管产品”。

如果说过去很多团队在做 Agent 时，80% 时间花在平台层、20% 花在业务逻辑，那这次发布的核心价值就是把这个比例反过来。

---

## 从概念到产品：Harness 终于下场



&gt; Agent = Model + Harness

模型负责智能，Harness 负责让智能在现实系统里跑起来。后者包含了系统提示词、工具调用、文件系统、沙箱、编排逻辑、检查机制等整套运行控制层。

问题是，自己搭这层非常重：

- 你要准备安全的代码执行环境
- 你要设计检查点和断点续跑机制
- 你要接身份与凭证管理
- 你要做作用域权限控制
- 你要做全链路追踪和审计

这些工作常常做几个月，用户侧却看不到一个新按钮。

Claude Managed Agents 的做法很直接：你定义任务、工具和护栏，Anthropic 托管运行，编排 harness 自动处理“何时调用工具、如何管理上下文、如何从错误恢复”。

---

## Managed Agents 的四个核心能力

### 1）生产级 Agent 运行环境

安全沙箱、身份认证、工具执行都由平台侧处理。开发者不再从零构建底层基础设施。

### 2）长运行会话

Agent 可以连续运行数小时，输出和进度持久化。就算连接断开，会话状态也不丢。

### 3）多 Agent 协调

主 Agent 可派生子 Agent 并行处理子任务，再汇总结果。这让复杂任务从“串行慢跑”变成“并行执行”。

### 4）可信治理

作用域权限、身份管理、执行追踪内置。对企业最敏感的越权风险、不可审计风险，都有系统性兜底。

在 Anthropic 的内部测试中，结构化文件生成任务相较标准提示循环，成功率最高提升 **10 个百分点**，且在高难任务上提升更明显。

---

## 这套 Harness 的方法论：三种模式

### 模式一：优先使用模型已经擅长的通用工具

Claude 在 SWE-bench Verified 上曾达到 **49%**（当时 SOTA），背后核心工具并不复杂，主要是 Bash 和文本编辑器。

![SWE-bench Verified 基准测试成绩](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137496&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X2pwZy96VzZTOXZ0MGNTOXhwaEtCMGdZWDZmMFJPVGFUYmptdDlpYUFCS0ZiUzNRdWhMaWNQY0Z0MThJZDVvcERUOW9UdUQzMTZLMnBWbjFNQ3RLMGdQOGs2NHc3ZzFrbVJkUmhnNUNIUWZyeGxKcFNrLzY0MD93eF9mbXQ9anBlZyZhbXA=;from=appmsg)

这意味着一个设计取向：

- 少做“任务定制工具”
- 多提供模型已熟悉的通用工具
- 让模型自己组合工作流

Agent Skills、程序式工具调用、内存机制，本质上都可以由通用工具叠出来。

### 模式二：把编排决策交还给模型

传统 harness 常假设“每个工具结果都必须进上下文窗口再决策下一步”。这会带来 token 浪费、延迟升高，以及大量不必要的数据通过上下文。

Managed Agents 倾向让 Claude 写代码去编排工具调用逻辑：

- 需要的结果保留
- 不需要的结果过滤
- 能直接管道传递的结果不进上下文
- 最终产出再进入模型上下文

![代码编排工具调用](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137496&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy96VzZTOXZ0MGNTaWJPU2ljOEZYZDhrWjJLMk5iOGlhdkowTjZIVWpkUU1kNXVBZ3ByVXJVRFR0QjhpYXJEVXZtcjlMbmVZWllmY2JOQ1htZFdMZUI4Vm9pYUI3UnQ1cVdpYjFVbzVPaWMzSnVqeWx1SXcvNjQwP3d4X2ZtdD1qcGVnJmFtcA==;from=appmsg)

在 BrowseComp 这类网页浏览 Agent 任务里，给 Opus 4.6 加上过滤工具输出能力后，准确率从 **45.3% 提到 61.6%**。

### 模式三：边界要有，但不要硬编码到僵化

Harness 需要承担安全、成本、体验边界。例如：

- 高风险不可逆操作前加确认
- 文件写入做过期检查（避免覆盖已变更内容）
- 关键调用具备拦截与审计能力

![专用工具的边界控制](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=137496&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy96VzZTOXZ0MGNTaWIxZzlLVWxXaWNGaWNFRDdHUERnZWRmWmtmY3JZY0xRakdPQTJNQm9uWUhVazlYRjdveDZDWVRidVdsRVQ5c3FUNU5pY2lhQmtCMFdrRzk0YURuNkIzVEM2SFdxOUJ3QzVHbG1JLzY0MD93eF9mbXQ9anBlZyZhbXA=;from=appmsg)

但这套边界不是一劳永逸。模型能力进化后，很多过去合理的“保护性假设”会变成负担，需要持续重评。

---

## 真实落地案例：为什么它会被企业买单



- **Notion**：把 Claude 放进工作空间，支持并行任务，工程和知识工作都能协作处理输出
- **Sentry**：调试 Agent 负责定位问题，Claude Agent 接写补丁并开 PR，从“发现问题”直达“可审查修复”
- **Asana**：AI Teammates 在项目流中协同起草交付物
- **Rakuten**：跨产品、销售、营销、财务部署，部分专业 Agent 一周内上线
- **Vibecode**：在接入 Managed Agents 后，相关基础设施启动速度至少提升 **10 倍**

这些案例的共同点很明显：不是“模型突然更聪明了”，而是“上线摩擦被砍掉了”。

---

## 产品科普：它和普通 API 有什么区别

你可以把 Claude Managed Agents 理解成“Agent 运行时 + 编排层”的托管云服务。

和只拿模型 API 相比，它把你最耗时间的那层基础设施打包成了服务：

- 运行：安全沙箱
- 编排：Harness 自动循环
- 持久化：会话状态托管
- 治理：权限、身份、追踪内置

计费也体现了这个定位变化：除了 token 费用外，按活跃会话时长收费，文中给出的数字是 **$0.08/小时**。

不过说实话，官方方案对国内团队在支付和网络环境上仍有门槛。如果你只想先把模型能力稳定接起来，不想先啃这些接入问题，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换 endpoint 就能直接用，体验跟官方一致。详情见：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q1：Managed Agents 最核心解决了什么？**
A：解决“从 demo 到生产”这段最痛的基础设施鸿沟，把沙箱、状态、权限、追踪、恢复这些脏活重活托管掉。

**Q2：为什么说 Harness 比“多写几个 prompt”更关键？**
A：因为 prompt 只影响单次推理质量，Harness 决定系统在真实环境下能否稳定、可控、可审计地长期运行。

**Q3：文中提到的 10 个百分点提升是指什么？**
A：在 Anthropic 内部的结构化文件生成任务上，Managed Agents 相对标准提示循环的任务成功率提升，最高可到 10 个百分点。

**Q4：它适合哪些团队优先上？**
A：有长流程、跨工具、多步骤自动化需求的团队最适合，比如研发协同、文档生产、运营流程自动化。

**Q5：国内团队怎么更省事地接入？**
A：如果不想折腾海外支付和网络，可通过 [Code80](https://code.ai80.vip/home) 这类渠道先接入，再逐步完善自己的 Agent 体系。
