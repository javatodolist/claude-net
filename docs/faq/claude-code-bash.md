---
title: 如何评价 Claude Code 核心工程师「Bash即一切」的观点？
description: 如何评价 Claude Code 核心工程师「Bash即一切」的观点？。本文属于Claude 常见问题 FAQ专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 常见问题 FAQ
tag:
  - Claude
  - Claude Code
  - AI编程
---

# 如何评价 Claude Code 核心工程师「Bash即一切」的观点？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
2 人赞同了该回答
Thariq Shihipar 在最近的演讲中提出的 "Bash Is All You Need"，初听感觉就是一句口号。
但如果你深入体验过 Claude Code，或者在 Agent 开发的一线摸爬滚打过，你会发现说的非常对
如果用一句话评价这个观点：这是 AI Agent 开发领域的「Unix 哲学」回归。
在过去的一年里，我们这些搞 Agent 的人都在做什么？我们在疯狂地定义 Tools（工具）和 Schemas（模式）。
为了让 AI 读一个文件，我们写一个 read_file 的 JSON schema；
为了让 AI 搜一个字符串，我们写一个 search_string 的函数定义；
为了让 AI 请求一个 API，我们又写一堆 HTTP 请求的 wrapper。
我们陷入了「工具定义地狱」。而 Thariq 的观点直接指出了这种做法的荒谬之处——
为什么我们要重新发明轮子，去教一个已经阅读过互联网上所有代码的模型如何使用一个蹩脚的自定义工具，而不是直接让它使用它最熟悉的、已经存在了 50 年的、图灵完备的工具集Bash？
在演讲中，Thariq 展示了一个非常核心的逻辑：Bash 是代码世界的通用胶水。
以前的做法： 你需要预判 Agent 可能需要的所有操作，并封装成 Tool。如果你没封装 git diff，Agent 就不会看差异；如果你没封装 npm install，Agent 就不会装包
Claude Code 的做法： 给我一个 Shell。
想看文件？cat 或 ls。
想处理数据？grep, awk, jq。
想联网？curl。
想运行代码？node script.js。
模型本身在训练阶段就已经极其精通 Bash。让它直接写 Bash 脚本来解决问题，比让它去理解你写的那个只有三行注释的自定义 Tool 要容易得多，也准确得多。
「文件系统」才是真正的长短期记忆（Context Engineering）
这是演讲中另一个极具洞察力的点。
目前的 RAG 或 Memory 方案，往往试图把所有信息塞进 context window（上下文窗口），或者搞复杂的向量数据库。
Thariq 提出，Agent 应该像人类工程师一样工作：把中间结果写进文件里。
当数据量太大（比如几万行的 CSV），不要全部读进 Context。
让 Agent 写一个脚本，用 grep 或 SQL (sqlite) 去处理这个文件，把处理结果（比如前 10 行或者统计数据）输出出来，再读入 Context。
这种利用文件系统作为外挂缓存的思路，极大地降低了 Token 消耗，同时提高了处理复杂任务（如数据分析、大代码库重构）的鲁棒性。
"Bash is All You Need" 最大的挑战在于安全。给 AI 一个 Shell，它不仅能 rm -rf /，还能把你的 .env 发给黑客。
但 Anthropic 的解决方案也很明确：强沙箱（Sandboxing）。
Claude Code 本质上是运行在一个受控的容器或虚拟环境中的。
这其实指明了未来 Agent 部署的标准形态：Agent 不应该直接运行在你的宿主环境，而应该运行在一个随时可以销毁的 Docker 容器里。
只要解决了沙箱问题，Bash 的灵活性就是无敌的。

想把这套 Bash 工作流真正跑起来，前提还是手里有一条稳定的 Claude 通道。国内用户不想折腾海外信用卡的，可以用 [Code80](https://code.ai80.vip/home)，真实订阅帐号转出 Claude API，和官方完全兼容，换个 endpoint 就能接进 Claude Code，支持国内支付，地址 [code.ai80.vip](https://code.ai80.vip/home)。

其他阅读：
【无需魔法】Claude Code 2026最新国内中转站，保姆级安装教程
4 赞同 · 11 评论 文章
Claude Code Skills到底怎么用？大家看这篇文章就够了
7 赞同 · 0 评论 文章
发布于 2026-02-11 16:46・广东
赞同 2​
4
喜欢
收起​
