---
title: CLI配置教程
shortTitle: CLI 教程
description: 介绍如何在 Code80 中完成「CLI配置教程」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# CLI配置教程

## 环境检查(通用步骤)

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

在windows或MacOS终端输入以下命令，若出现图示内容，或出现选项让你选择，则Claude code安装成功

```bash
claude
```

![步骤截图](/images/code80/Cli/003.webp)

::: warning 重要
**第二步十分重要，请你务必跳转链接后运行命令进行配置**
:::

2. 点击 [claude code 无法连接到 Anthropic 服务](/code80/faq/CC) 跳转，务必根据教程运行命令，然后再继续阅读之后单独CLI的配置教程

## Claude Code配置

### Windows

1. 键盘按下“Win+R”键，输入以下内容后回车，打开Claude Code配置目录

```bash
%userprofile%\.claude
```

![步骤截图](/images/code80/Cli/013.webp)

2. 目录内容如图所示，如果目录中没有 `settings.json`，你需要手动创建后打开

* **settings.json** ：Claude 主要的配置文件，用来配置中转站地址、ApiKey，以及 hooks、plugins 等

![步骤截图](/images/code80/Cli/014.webp)

3. 将以下内容写入 `settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1",
    "CLAUDE_CODE_NEW_INIT": "1",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "DISABLE_AUTOUPDATER": "1",
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "ENABLE_TOOL_SEARCH": "false",
    "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1",
    "CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS": "1"
  },
  "includeCoAuthoredBy": false,
  "language": "Chinese-simplified"
}
```

![步骤截图](/images/code80/Cli/015.webp)

4. 回顾 [创建API令牌](/code80/register/4-token)，在 Code80 中创建 **CC** 分组的令牌，替换上方 `xxx`部分

![步骤截图](/images/code80/Cli/025.webp)

5. 在windows终端运行 `claude`，出现对话界面后进行对话测试，能收到回复即表示配置成功

![步骤截图](/images/code80/Cli/016.webp)

### MacOS

1. 在访达界面按下 “Command+Shift+G”，输入以下路径后回车，打开配置目录

```bash
~/.claude
```

![步骤截图](/images/code80/Cli/017.webp)

2. 若目录不存在 `settings.json`，需要你手动进行创建

* **settings.json** ：Claude 主要的配置文件，用来配置中转站地址、ApiKey，以及 hooks、plugins 等

![步骤截图](/images/code80/Cli/018.webp)

3. 将以下内容写入 `settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1",
    "CLAUDE_CODE_NEW_INIT": "1",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "DISABLE_AUTOUPDATER": "1",
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "ENABLE_TOOL_SEARCH": "false",
    "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1",
    "CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS": "1"
  },
  "includeCoAuthoredBy": false,
  "language": "Chinese-simplified"
}
```

![步骤截图](/images/code80/Cli/015.webp)

4. 回顾 [创建API令牌](/code80/register/4-token)，在 Code80 中创建 **CC** 分组的令牌，替换上方 `xxx`

![步骤截图](/images/code80/Cli/025.webp)

5. 在终端运行 `claude`，看到对话界面并能正常回复即表示配置完成

![步骤截图](/images/code80/Cli/016.webp)

更多环境变量含义与可选配置，见 [Claude Code配置](/code80/cli/2-claude)。

::: warning 重要
**注意，如果配置完仍然有报错问题，提示你需要登录，请看如下链接解决**
[claude-code-无法连接到-anthropic-服务](/code80/faq/CC)
:::


## Claude Code 缓存优化代理

如果希望降低 Claude Code 的额度消耗、提高缓存命中率，可以继续阅读 [Claude Code 缓存优化代理](/code80/cli/5-cache-fix)。
