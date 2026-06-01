---
title: 国内配置Claude Code的完整思路 安装环境变量和模型入口
description: 国内配置Claude Code的完整思路 安装环境变量和模型入口。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-25
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# 国内配置Claude Code的完整思路 安装环境变量和模型入口

Claude Code 是面向开发者的终端编程 Agent。它可以在项目目录里读文件、改代码、执行命令，并把模型能力嵌入真实开发流程。和网页聊天不同，Claude Code 更像一个能动手的工程助手。

国内用户配置 Claude Code 时，通常会遇到三类问题：安装环境、网络访问、模型接口。把这三件事分开处理，排查会简单很多。

## 一、先确认本地环境

Claude Code 需要 Node.js、npm、Git 和可用的终端环境。建议先检查版本：

```bash
node --version
npm --version
git --version
```

一般来说，macOS、Linux 和 Windows 都可以使用，但 Windows 用户最好准备好 Git Bash 或 WSL 环境。因为很多项目脚本默认使用类 Unix 命令，原生 PowerShell 可能会遇到兼容问题。

最低准备清单：

| 项目 | 建议 |
| --- | --- |
| Node.js | 使用 LTS 版本 |
| npm | 随 Node.js 安装即可 |
| Git | 建议 2.23+ |
| 终端 | macOS/Linux 终端、Git Bash 或 WSL |
| 磁盘空间 | 预留至少数百 MB |

## 二、安装 Claude Code

安装方式通常是 npm 全局安装：

```bash
npm install -g @anthropic-ai/claude-code
```

安装后验证：

```bash
claude --version
```

如果提示命令不存在，优先检查 npm global bin 是否在 PATH 中。Windows 下还要确认当前终端是否重启过，因为环境变量修改后通常需要重新打开终端才生效。

## 三、配置 API Key 或授权方式

Claude Code 可以通过官方账号授权，也可以通过环境变量读取 API Key。开发者更常用环境变量方式。

macOS / Linux 示例：

```bash
export ANTHROPIC_API_KEY="sk-xxxx"
```

如果要长期生效，可以写入 `~/.bashrc`、`~/.zshrc` 等 shell 配置文件。

Windows PowerShell 示例：

```powershell
setx ANTHROPIC_API_KEY "sk-xxxx"
```

注意：不要把真实 API Key 写进公开仓库，也不要截图发送给他人。项目内如果需要共享配置，使用 `.env.example` 写变量名，不要写真实值。

## 四、国内网络环境下的常见配置

如果使用官方 API，国内环境可能需要代理。Claude Code 支持通过项目或用户级配置注入环境变量。例如在 `.claude/settings.json` 中配置：

```json
{
  "env": {
    "HTTP_PROXY": "http://127.0.0.1:7890",
    "HTTPS_PROXY": "http://127.0.0.1:7890"
  }
}
```

这里的端口要替换成你自己的本地代理端口。配置后如果仍然失败，建议按顺序检查：

1. 代理客户端是否正在运行；
2. 端口是否写错；
3. 终端是否能访问目标 API；
4. API Key 是否有效；
5. 项目级配置是否被用户级配置覆盖。

## 五、通过兼容入口切换模型

Claude Code 的一个关键能力是可以通过环境变量指定 Base URL、模型名和鉴权 token。国内开发者如果需要接入兼容 Anthropic 协议的模型入口，通常会配置这些变量：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_api_key",
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip",
    "ANTHROPIC_MODEL": "your_model_name",
    "ANTHROPIC_SMALL_FAST_MODEL": "your_fast_model_name"
  }
}
```

这类配置适合统一管理 Claude、国产模型或其他兼容模型入口。使用 Code80（https://code.ai80.vip）这类国内可用入口时，建议同时核对模型名、上下文长度、价格、限流规则和错误码兼容性，避免只在“能启动”层面完成验证。

![Claude Code 配置示意](/assets/images/localized/segmentfault.com-59d2203c7d89.png)

## 六、Windows 用户要额外注意 Git Bash 路径

在 Windows 上使用 Claude Code 时，如果需要指定 Git Bash，可以设置：

```powershell
setx CLAUDE_CODE_GIT_BASH_PATH "D:\software\git\bin\bash.exe"
```

路径必须替换为本机实际安装位置。设置后重新打开终端，再运行：

```bash
claude
```

如果出现命令执行异常，优先确认 Git Bash 能否单独启动，以及项目里的 npm scripts 是否依赖 bash 特性。

## 七、项目级配置和用户级配置怎么分工

建议把配置分成两层：

| 配置位置 | 放什么 |
| --- | --- |
| 用户级配置 | 个人 API Key、代理端口、默认模型 |
| 项目级配置 | 项目权限、工具限制、团队共享规则 |

不要把个人密钥写入项目仓库。团队共享时，可以提交模板文件，例如：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip",
    "ANTHROPIC_MODEL": "your_model_name"
  }
}
```

真实 token 由每个成员在本机环境变量中配置。

## 八、常见问题排查

### 1. 安装失败

优先检查 Node.js 版本、npm 源、全局安装权限。如果是权限问题，不要盲目加 sudo，可以考虑使用 nvm 管理 Node.js。

### 2. claude 命令不存在

检查 npm 全局 bin 路径是否加入 PATH。Windows 用户修改环境变量后要重启终端。

### 3. API 连接失败

检查 Base URL、代理、API Key、网络连通性。不要只看 Claude Code 报错，最好用最小请求验证接口是否可用。

### 4. 模型名无效

兼容入口的模型名不一定和官方完全一致。以服务商控制台或接口文档为准。

### 5. 输出太短或上下文不足

检查模型上下文限制、max tokens 配置、工具返回内容是否过长。Claude Code 类工具在大型项目中尤其需要控制上下文噪音。

## FAQ

**Q：Claude Code 适合新手吗？**
适合有基本命令行经验的人。完全不熟悉终端的新手，建议先从只读分析、生成补丁、运行简单测试开始。

**Q：可以把 API Key 写进 settings.json 吗？**
个人本地可以，但不建议。更稳妥的方式是写入环境变量，并确保任何包含密钥的文件不进入 Git。

**Q：兼容入口能完全替代官方 Claude 吗？**
不一定。要看协议兼容度、模型能力、上下文长度、工具调用支持和稳定性。生产使用前必须做真实任务测试。

**Q：配置好以后如何验证？**
选择一个小型 Git 仓库，让 Claude Code 执行“读取项目结构并解释启动方式”这类低风险任务，再逐步尝试改测试、修小 Bug。

## 总结

国内配置 Claude Code，关键不是一次性复制某段配置，而是理解三层结构：本地运行环境、网络与鉴权、模型入口。先保证 Node.js、Git 和终端可用，再处理 API Key、代理和 Base URL，最后用小任务验证模型能力。

对团队来说，最佳实践是统一项目规则，个人密钥本地管理，模型入口集中评估。这样既能降低接入成本，也能避免把敏感信息散落在项目文件里。
