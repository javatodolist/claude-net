---
title: Claude Code 国内使用完整教程 从 API Key 到三端安装这次一次配明白
description: Claude Code 国内使用完整教程 从 API Key 到三端安装这次一次配明白。本文属于Claude API 接入与开发专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-14
category: Claude API 接入与开发
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Claude Code 国内使用完整教程 从 API Key 到三端安装这次一次配明白

![Banner](https://p6-volc-community-sign.byteimg.com/tos-cn-i-tlddhu82om/954a90fc2bba407f99f013cf01e6ac48~tplv-tlddhu82om-image.image?=&rk3s=8031ce6d&x-expires=1778776184&x-signature=Om%2FHxgQ5r2dppBPxOl35yZazmlI%3D)

## 写在前面

很多人不是不会用 Claude Code，而是根本卡在第一步：API Key 从哪来、配置文件写哪、Windows 和 macOS 到底有什么区别、装完为什么 `claude` 还跑不起来。

真正影响开发效率的，往往不是模型本身够不够强，而是你能不能把它稳定接进自己的终端工作流。只要前面的环境、密钥和 endpoint 配明白，Claude Code 才能从“听说很强”变成“每天真在用”。

这篇就按实操顺序来讲：先说它是什么，再讲支持哪些模型，然后把 Windows、macOS、Linux 三个平台的安装和配置一步步配通，最后再把一键脚本和常见问题收尾。文中的接入地址统一替换成 `https://code.ai80.vip/`，你照着配就行。

---

## Claude Code 到底是什么，为什么它和普通代码补全不是一回事

Claude Code 是 Anthropic 官方推出的命令行 AI 编程助手，直接跑在终端里。它和传统那类“在编辑器里补几行代码”的工具不太一样，重点不是补全，而是把整个工程任务接过去。

你可以直接在项目目录里和它对话，让它：

- 读取项目结构和多个文件
- 修改代码、修 bug、补功能
- 解释一段逻辑为什么这样写
- 执行命令、跑测试、继续根据报错修正
- 在一个会话里持续理解上下文

对开发者来说，最有价值的地方就在这儿：不用频繁切网页、复制代码、粘回本地，也不用来回解释项目背景。它就在你的终端里工作。

原始教程把门槛点得很直接：国内使用 Claude Code，主要卡的不是 CLI 本身，而是 API 访问和配置。只要把认证信息和请求地址配置好，后面的使用流程其实很顺。

---

## 先看模型：默认用哪个，重任务该切哪个

这套教程里给出的主流模型一共 3 个，基本覆盖了不同强度的开发场景：

| 模型 | 模型 ID | 适用场景 |
| --- | --- | --- |
| Claude Opus 4.6（最强） | `claude-opus-4-6` | 复杂任务、深度推理 |
| Claude Sonnet 4.6（默认） | `claude-sonnet-4-6` | 日常编程首选，速度与质量均衡 |
| Claude Haiku 4.5（最快） | `claude-haiku-4-5-20251001` | 轻量任务、快速响应 |

大多数情况下，直接用 Sonnet 4.6 就够了。如果你在做架构设计、跨文件重构、复杂调试，切到 Opus 4.6 会更稳；如果只是跑一些轻量命令、快速问答或者简单改动，Haiku 4.5 的响应会更快。

---

## 第一步：先拿到可用的 API Key

先把最关键的一步做完：拿到自己的密钥。

操作顺序很简单：

1. 注册并登录你要使用的平台控制台
2. 进入“令牌管理”或类似入口
3. 新建令牌
4. 复制生成的密钥，通常是 `sk-` 开头

![获取 API Key](https://p6-volc-community-sign.byteimg.com/tos-cn-i-tlddhu82om/d81ae06e4af44f578a9d316b3538c22e~tplv-tlddhu82om-image.image?=&rk3s=8031ce6d&x-expires=1778776184&x-signature=RlD7opttMUt6ZCdUQA8aAmxUd9Y%3D)

后面所有配置，核心就是把这串密钥写进 Claude Code 的 `settings.json`，再把请求地址指向：

```text
https://code.ai80.vip/
```

---

## Windows 安装教程：从 Node 到首次启动一遍走通

### 1）先装 Node.js

Windows 上最省事的方式，还是直接安装 LTS 版本的 Node.js。你可以去 Node.js 官网下载 `.msi` 安装包，一路下一步装完。

如果你更习惯命令行，也可以用：

```bash
winget install OpenJS.NodeJS.LTS
```

装完以后，重新打开一个新的 CMD 或 PowerShell 窗口，再验证：

```bash
node --version
npm --version
```

两个命令都能正常返回版本号，就说明 Node 环境已经好了。

### 2）安装 Claude Code CLI

然后以管理员身份打开终端，执行：

```bash
npm install -g @anthropic-ai/claude-code
```

装好后再跑一遍：

```bash
claude --version
```

如果这里已经能看到版本号，说明 CLI 本体没问题。

### 3）配置认证信息和请求地址

Windows 下要找的是这个配置文件：

```text
%USERPROFILE%\.claude\settings.json
```

如果没有，就手动创建。然后写入下面这段内容：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的 API 密钥（sk-开头）",
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip/"
  }
}
```

这里最容易出错的就两件事：

- `ANTHROPIC_AUTH_TOKEN` 不能留占位符，必须是你自己的真实密钥
- `ANTHROPIC_BASE_URL` 要按上面写成 `https://code.ai80.vip/`

### 4）进入项目目录启动

接着打开终端，进入你的项目目录：

```bash
cd 你的项目目录
claude
```

首次启动一般会有初始化提示，跟着走就行。后面你每次只要进入项目目录，再敲一次 `claude`，就能直接开始对话。

### 5）按任务强度切模型

如果你想在启动时直接指定模型，可以这样写：

```bash
claude --model claude-opus-4-6
claude --model claude-haiku-4-5-20251001
```

已经进会话之后，也可以直接切：

```bash
/model claude-opus-4-6
```

---

## macOS 安装教程：Homebrew 路线最顺手

![macOS 教程配图](https://p6-volc-community-sign.byteimg.com/tos-cn-i-tlddhu82om/e12276afb84d4429a91e980e52c8e665~tplv-tlddhu82om-image.image?=&rk3s=8031ce6d&x-expires=1778776184&x-signature=tJNNXLBypbyKRdpfZn55L7QZeuI%3D)

### 1）安装 Node.js

macOS 更推荐用 Homebrew 管理：

```bash
# 没装 Homebrew 先安装
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Node.js
brew install node
```

然后检查：

```bash
node --version
npm --version
```

### 2）安装 Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
```

### 3）写入配置文件

macOS 下配置文件位置在：

```text
~/.claude/settings.json
```

填入：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的 API 密钥",
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip/"
  }
}
```

### 4）启动

```bash
cd 你的项目目录
claude
```

macOS 这一套其实和 Windows 的差别不大，核心还是 Node、CLI、本地配置文件这三步。

---

## Linux 安装教程：以 Ubuntu / Debian 为例

### 1）安装 Node.js

Ubuntu 或 Debian 可以直接这样装：

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

装完先查版本：

```bash
node --version
npm --version
```

### 2）安装 Claude Code CLI

```bash
sudo npm install -g @anthropic-ai/claude-code
```

### 3）配置 `settings.json`

Linux 和 macOS 一样，直接编辑：

```text
~/.claude/settings.json
```

内容同样是：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的 API 密钥",
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip/"
  }
}
```

### 4）进入项目启动

```bash
cd 你的项目目录
claude
```

如果你本来就习惯在 Linux 下做开发，这套配置几乎没有额外理解成本。

---

## 不想手动改配置？直接用一键脚本

原教程里还给了两套一键脚本，本质就是自动帮你生成 `settings.json`。如果你不想手动创建文件，直接运行脚本也行。

### Windows 一键配置脚本

新建一个 `.bat` 文件，比如 `claude-code-windows.bat`，内容可以写成：

```bat
@echo off
chcp 65001 &gt;nul
setlocal enabledelayedexpansion

set "CLAUDE_PATH=%USERPROFILE%\.claude"

if not exist "%CLAUDE_PATH%" (
    mkdir "%CLAUDE_PATH%"
)

set /p API_KEY="请输入 API 密钥（sk-开头）: "

(
  echo {
  echo   "env": {
  echo     "ANTHROPIC_AUTH_TOKEN": "%API_KEY%",
  echo     "ANTHROPIC_BASE_URL": "https://code.ai80.vip/"
  echo   }
  echo }
) &gt; "%CLAUDE_PATH%\settings.json"

pause
```

双击运行，输入你的密钥，就会自动把配置写进去。

### macOS / Linux 一键配置脚本

新建一个 `.sh` 文件，比如 `claude-code-maclinux.sh`：

```bash
#!/bin/bash

CLAUDE_PATH="$HOME/.claude"
mkdir -p "$CLAUDE_PATH"

read -p "请输入 API 密钥（sk-开头）: " API_KEY

cat &gt; "$CLAUDE_PATH/settings.json" &lt;&lt; EOF
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "$API_KEY",
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip/"
  }
}
EOF
```

然后执行：

```bash
bash claude-code-maclinux.sh
```

如果你只是想快速把环境搭起来，这种方式确实比手改更省心。

---

## Claude Code 到底能做什么，为什么很多人装上就回不去

如果你之前还没认真用过 Claude Code，可以把它理解成一个真正面向工程任务的命令行 Agent，而不是网页聊天助手。

它典型能干的事情包括：

- 读项目代码，理解上下文
- 在多个文件之间做一致性修改
- 直接执行构建、测试、脚本命令
- 根据报错继续调试和修复
- 在会话中持续保留任务背景

所以它不是“给你一段建议代码”，而是“你描述目标，它开始推进任务”。这也是为什么很多开发者一旦把本地环境配通，后面就会越来越依赖它。

官方常见的使用路径，一类是走订阅方案，另一类是走 API 接入。通常 Pro 是 20 美元/月起，Max 档位更高，适合高强度使用；如果你本来就更习惯 API 工作流，直接按 endpoint 接进 CLI、脚本或自己的工具链会更灵活。

不过对国内用户来说，官方订阅和支付链路还是有门槛。如果你只是想少折腾一点，直接把 Claude Code 配进自己的日常开发流，可以看看 [Code80](https://code.ai80.vip/)。它的思路很简单：把真实订阅账号转成 API 入口，你只需要把请求地址换成 `https://code.ai80.vip/`，剩下的使用方式基本不变。

---

## 常见问题

### 1. 运行 `claude` 提示找不到命令怎么办？

最常见的原因是环境变量还没刷新。把当前终端关掉，重新开一个新窗口再试。如果还是不行，再回头确认 Node 和全局 npm 安装是否成功。

### 2. 提示 API 密钥无效或者请求失败怎么办？

优先检查 `settings.json`：

- 密钥是不是完整粘贴了
- 前后有没有多余空格
- `ANTHROPIC_BASE_URL` 是不是写成了 `https://code.ai80.vip/`

### 3. Windows 上脚本乱码怎么办？

可以先确认脚本开头有没有：

```bat
chcp 65001
```

这一步是把终端切到 UTF-8。如果还有乱码，再去系统终端设置里确认默认编码。

### 4. 默认该选 Sonnet 还是 Opus？

日常开发、改 bug、补功能，先用 Sonnet 4.6 就够了。只有在复杂重构、架构调整、长链路推理任务里，再切 Opus 4.6 更划算。

### 5. 配置文件到底放哪？

- Windows：`%USERPROFILE%\.claude\settings.json`
- macOS：`~/.claude/settings.json`
- Linux：`~/.claude/settings.json`

### 6. 国内怎么更方便地把 Claude Code 接进自己的工作流？

如果你本来就更习惯 API 方式，国内用户直接通过 [Code80](https://code.ai80.vip/) 这类入口来配 Claude Code，通常会比自己折腾支付、网络和接入链路更省事。
