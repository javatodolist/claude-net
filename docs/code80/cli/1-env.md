---
title: 环境检查(通用步骤)
shortTitle: CLI 环境
description: 介绍如何在 Code80 中完成「环境检查(通用步骤)」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# 环境检查(通用步骤)

::: tip 本站范围
本站仅提供 Claude Code 的安装与配置教程。
:::

### （1）确认Nodejs环境已安装

1. 在windows或MacOS终端输入以下命令

```bash
npm list -g --depth-0
```

正常情况应该是如下图所示（没有任何内容也没关系），如果提示“命令未找到”，则说明你没有安装Nodejs，你需要按 [此教程](https://www.runoob.com/nodejs/nodejs-install-setup.html) 来安装运行 Claude Code 所需的环境

![步骤截图](/images/code80/Cli/001.webp)

2. 如果你发现自己没有安装Nodejs，并且跟着教程目前已经安装完毕，请你重新执行上述提到的命令，如果不再提示“命令未找到”，则说明安装成功

### （2）安装CLI

1. 在windows或MacOS终端输入以下命令，安装 Claude Code

```bash
npm i -g @anthropic-ai/claude-code@latest
```

![步骤截图](/images/code80/Cli/002.webp)

### （3）测试安装成功

::: warning 重要
**这一步很重要，请你务必运行命令进行测试，因为这一步运行命令后，你的用户目录下才会生成各CLI的配置目录，方便后续操作！**
:::

### Claude Code

1. 在windows或MacOS终端输入以下命令，若出现图示内容，或出现选项让你选择，则Claude code安装成功

```bash
claude
```

![步骤截图](/images/code80/Cli/003.webp)

::: warning 重要
**第二步十分重要，请你务必跳转链接后运行命令进行配置**
:::

2. 点击 [claude code 无法连接到 Anthropic 服务](/code80/faq/CC) 跳转，务必根据教程运行命令，然后再继续阅读之后单独CLI的配置教程

