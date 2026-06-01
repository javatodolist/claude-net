---
title: Anthropic 推出的 Claude Code Agent 有哪些亮点值得关注？
description: Anthropic 推出的 Claude Code Agent 有哪些亮点值得关注？。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Anthropic 推出的 Claude Code Agent 有哪些亮点值得关注？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
5 人赞同了该回答
终于，Claude Code开始下放给Claude Pro用户使用了！
当所有的模型厂家在卷性价比的时候，Anthropic的Claude Code却是个异类，此前Claude Code仅限Claude Max（100美金）和API调用，且价格高的离谱。
有用户吐槽："总共3个需求，Claude Code就烧掉了4.21美金，一个月下来，轻轻松松花费上百刀"。 还有用户更是直言不讳地指出：“Claude Code 的能力比 Cursor 更强。我还在用 Cursor 的唯一原因，就是 Claude Code 实在太贵了。”
而现在，被大家吐槽能力强却收费贵的Claude Code终于下放给Pro用户了。
很多刚刚接触AI的小伙伴可能还不太了解Claude Code，这里给大家简单介绍一下。
一、Claude Code是什么？
Claude Code 是Anthropic 推出的一款Agent编码工具，支持在终端运行，理解代码库，并通过自然语言命令帮助用户更快的编写代码，功能和Cursor类似。
主要的功能如图所示：
不过很多人可能不习惯使用Claude Code，因为它是一个基于命令行的AI工具，没有一个漂亮的UI页面，所以编程小白慎用。
二、Claude Code强在哪？
Claude Code 可直接在终端运行：它会自动收集并理解项目上下文，再按需遍历整个代码库，无须手动将文件加入上下文。
更令人惊喜的是，Claude Code在处理跨文件编辑方面的能力几乎无人能敌。
它可以同时理解多个文件之间的关联关系，在修改一个模块时自动更新相关的测试文件、文档和配置文件。
这种全局视角的编程能力，是其他AI编程助手难以比拟的。
同时在Git操作方面，Claude Code也展现出了强大的自动化能力。
它不仅能帮你提交代码，还能智能地生成提交信息，创建Pull Request，甚至解决复杂的合并冲突。
值得一提的是，虽然Claude Code强，但我们使用它有一点麻烦，首先Claude的注册和订阅就是一个老大难的问题，不仅需要海外号码验证，而且在海外邮箱和号码的选择方面要额外小心。
详细订阅Claude Pro我之前写过，感兴趣的可以看看。 相关阅读：国内用户如何注册订阅Claude 会员
三、Claude Code安装与配置指南
想要开始使用Claude Code，首先需要确保你的开发环境满足基本要求（仅在特定地区使用）。
系统方面，Claude Code支持macOS 10.15+、Ubuntu 20.04+/Debian 10+，或者通过WSL运行的Windows。
硬件要求不高，至少4GB内存即可。
软件依赖方面，你需要安装Node.js 18+，这是Claude Code运行的基础环境。
如果你计划使用Git相关功能，建议安装git 2.23+以及GitHub或GitLab的CLI工具。另外，安装ripgrep工具可以增强文件搜索功能，虽然是可选的，但强烈推荐。
安装过程非常简单。打开终端，运行npm install -g @anthropic-ai/claude-code即可完成安装。安装完成后，进入你的项目目录，执行claude命令启动Claude Code。
这里需要注意的是，如果你之前通过Anthropic Console按量付费登录过Claude Code，需要在Claude Code中运行/login命令切换到你的Pro或Max订阅套餐。
Claude code详细介绍传送门：https://docs.anthropic.com/en/docs/claude-code/getting-started
目前Pro套餐用户每5小时可以向Claude Code发送约10-40个提示（运行1～2小时），这个额度对于处理小型代码库（通常少于1000行代码）的轻量工作来说是完全够用的。
对比之前的价格体系，这次的调整可以说是诚意满满。而Max套餐则可以使用更多。
好了，今天的分享就到这里，欢迎大家在评论区分享自己的使用心得。
发布于 2025-06-09 19:38・广东
赞同 5​
2
喜欢
收起​
