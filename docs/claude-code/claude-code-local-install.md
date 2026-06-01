---
title: Claude Code 本地跑起来：从安装到第一次对话
description: Claude Code 本地跑起来：从安装到第一次对话。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-10
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Claude Code 本地跑起来：从安装到第一次对话

![Claude Code安装教程](/assets/images/localized/v5site.com-e950463f48f9.png)

## 写在前面

很多开发者知道Claude Code好用，但一直停留在"网页上聊"的阶段，没有真正把Claude Code集成进日常开发工作流。

网页聊天和本地跑起来，体验差别很大。

本地运行Claude Code意味着：它可以直接读取你的项目文件、在终端里执行命令、分析整个代码库的结构，而不是你来回粘贴代码片段。这才是Claude Code真正设计的使用方式。

这篇文章把从安装到第一次在本地项目里使用Claude Code的完整流程走一遍。

---

## 前置条件：你需要什么

**必须有的：**
- Node.js 18+ 环境
- Claude Pro账号（或有效的Claude API密钥）
- 终端/命令行工具

**检查Node.js版本：**
```bash
node --version  # 需要 &gt;= 18.0.0
```

如果没有安装Node.js，从 [nodejs.org](https://nodejs.org/) 下载最新LTS版本。

---

## 第一步：注册Claude账号并获取权限

Claude Code需要Claude Pro权限。如果还没有Claude账号，先完成注册。

核心流程：海外邮箱 + 海外手机号（接码平台可以解决）+ 干净代理节点。

![Claude官网注册入口](/assets/images/localized/i-blog.csdnimg.cn-c638d75c9e07.png)

完成注册并登录后，确认邮件验证已通过：

![邮件验证步骤](/assets/images/localized/i-blog.csdnimg.cn-dbd6eba9c6f7.png)

手机号验证是门槛最高的一步，用接码平台获取一个临时号码即可：

![手机号验证界面](/assets/images/localized/i-blog.csdnimg.cn-eaea2d1e9c08.png)

注册完成后，升级Claude Pro（$20/月）解锁Claude Code完整功能：

![升级Claude Pro](/assets/images/localized/i-blog.csdnimg.cn-63f11350800c.png)

---

## 第二步：安装Claude Code CLI

Claude Code通过npm全局安装：

```bash
npm install -g @anthropic-ai/claude-code
```

安装完成后验证：

```bash
claude --version
```

---

## 第三步：配置认证

**方式一：使用Claude账号登录（推荐）**

```bash
claude auth login
```

浏览器会自动打开Claude登录页，完成授权后返回终端。

**方式二：使用API密钥**

如果你有API密钥（官方或Code80提供的），可以直接配置：

```bash
export ANTHROPIC_API_KEY="your-api-key"
# 或者配置自定义endpoint（如使用Code80）
export ANTHROPIC_BASE_URL="https://code.ai80.vip"
export ANTHROPIC_API_KEY="your-code80-key"
```

---

## 第四步：在项目里启动Claude Code

进入你的项目目录，启动Claude Code：

```bash
cd /your/project/directory
claude
```

Claude Code会自动扫描当前目录的文件结构，准备好之后你就可以开始对话了。

---

## 第一次对话：让Claude了解你的项目

启动后，先给Claude一个项目概述的任务，让它建立对整个代码库的认知：

```
你好，请先扫描这个项目的目录结构，告诉我：
1. 这个项目的主要功能是什么？
2. 核心模块有哪些？
3. 代码架构是怎样的？
```

Claude Code会读取你的项目文件，给出一个完整的项目概览。这一步做好了，后续的具体任务对话质量会高很多。

---

## 几个上手就能用的实用命令

**让Claude修改代码：**
```
帮我重构 src/utils/helper.js 里的 parseDate 函数，
要求：1) 支持更多日期格式 2) 加上错误处理 3) 补充单元测试
```

**让Claude找Bug：**
```
我的 /api/users 接口偶尔返回500，报错是 "Cannot read property 'id' of undefined"，
帮我分析可能的原因，相关代码在 src/controllers/users.js
```

**让Claude写文档：**
```
为 src/api/README.md 生成完整的API文档，包括所有接口的参数说明和使用示例
```

---

## 使用Cursor作为替代入门（更低门槛）

如果暂时没有Claude Pro账号，可以先用Cursor体验Claude的编程能力。

打开 [cursor.com/cn](https://cursor.com/cn)，顶部选「资源」&gt;「文档」：

![Cursor网站导航](/assets/images/localized/i-blog.csdnimg.cn-d0175048af23.png)

在展开的对话栏选择Claude Sonnet，就能在浏览器里免费体验：

![Cursor中使用Claude](/assets/images/localized/i-blog.csdnimg.cn-b60bccc14e98.png)

注意这是Cursor文档站的附带功能，上下文有限制，不等同于完整的Claude Code体验。但作为感受Claude能力的零成本方式，够用。

---

## 国内开发者的API配置方案

如果你希望在生产环境使用Claude Code，或者把Claude 4.6集成进团队工具，API接入是更稳定的方式。

对国内开发者来说，官方API有海外支付和网络两道门槛。[Code80](https://code.ai80.vip/home) 提供国内可接入的方式——真实订阅账号转API，配置好endpoint即可，与官方API完全兼容，支持Claude 4.6全系列模型。详情：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q：Claude Code和Cursor有什么区别？**
A：Cursor是一个完整的IDE（基于VS Code），把AI助手深度集成到编辑器里；Claude Code是一个命令行工具，可以在任何终端环境使用，也可以集成进你已有的编辑器。两者各有适用场景，不是替代关系。

**Q：Claude Code读取本地文件会有安全风险吗？**
A：Claude Code在你明确授权的情况下读取文件，不会自动上传你的代码到服务器。注意不要把包含敏感信息（密码、密钥）的文件纳入上下文，在`.claudeignore`里排除敏感文件。

**Q：在Windows上安装Claude Code和Mac/Linux有区别吗？**
A：基本流程一样，都通过npm安装。Windows用户建议用Windows Terminal + PowerShell或WSL，体验更好。

**Q：Claude Code支持哪些编程语言？**
A：理论上支持任何编程语言，因为它本质上是理解和生成文本。Python、JavaScript/TypeScript、Java、Go、Rust、C++等主流语言都有很好的支持。
