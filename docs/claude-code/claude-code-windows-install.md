---
title: Claude Code Windows 安装教程：Node、Git Bash 与命令检查
description: Claude Code Windows 安装教程：Node、Git Bash 与命令检查。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Claude Code Windows 安装教程：Node、Git Bash 与命令检查

## 写在前面

很多人第一次在 Windows 上装 Claude Code，问题不是出在 Claude Code 本身，而是前面的运行环境没理顺。

最常见的情况是：Node 装了，但版本没确认；npm 能用，但全局命令没生效；终端能打开，但命令环境不顺手。最后你会感觉“明明步骤都照着做了，为什么还是跑不起来”。

所以这篇文章不讲虚的，只讲一条最稳的 Windows 安装主线：先把 Node.js 装好，再把 Git Bash 这类命令环境补齐，然后正式安装 Claude Code，最后做一次完整检查。你照着走，基本就能把第一步跑通。

---

## 先搞清楚：Windows 上安装 Claude Code，重点不是电脑性能

Claude Code 的核心能力在云端，本地机器主要负责：

- 提供项目文件
- 提供终端执行环境
- 和模型服务通信

所以对 Windows 用户来说，真正重要的不是“电脑够不够强”，而是下面这几项有没有准备好：

1. Node.js 是否正常安装
2. 命令行环境是否顺手可用
3. npm 全局安装是否能正确生效
4. `claude` 命令能不能被系统识别

这也是为什么很多安装问题，最后都不是 Claude Code 本身的问题，而是运行环境的问题。

---

## 第一步：先安装 Node.js

Claude Code 本质上是一个 Node.js 工具，所以第一步必须先安装 Node.js。

Node.js 官网：

https://nodejs.org/en/download/

先看这张图，确认自己已经进入 Node.js 官方下载页。对大多数第一次安装的 Windows 用户来说，直接安装稳定版本就够了。

![Node.js 下载页面](/assets/images/localized/mmbiz.qpic.cn-cade20abbfc0.png)

这一步结束后，先回终端执行一次 `node -v`，确认版本号已经能返回，再继续下一步。
对大多数 Windows 用户来说，直接安装稳定版本就够了，不用一开始就纠结太多版本管理问题。

装完之后，第一件事不是继续下一步，而是先在终端里执行：

```bash
node -v
```

如果能正常返回版本号，说明 Node.js 已经进入可用状态了。

---

## 第二步：为什么建议 Windows 用户装 Git for Windows

如果你在 Windows 上用 Claude Code，建议把 Git for Windows 一起装上。

Git for Windows 下载页面：

https://git-scm.com/install/windows

这张图对应的是 Git Bash 环境准备步骤。你只要确认自己进入的是 Git for Windows 官方下载页，准备把后面更顺手的命令行环境补齐即可。

![Git for Windows 下载页面](/assets/images/localized/mmbiz.qpic.cn-467f4dbd1c8a.png)

对 Windows 用户来说，这一步虽然不是绝对强制，但装好之后后面的 npm 安装和命令检查通常会顺很多。
原因很简单：Claude Code 的很多自动化操作，在类 Unix 命令环境里会更顺手，而 Git for Windows 会把 Git Bash 一起带上。

这一步不一定是硬性要求，但对大多数 Windows 用户来说，装上之后后续体验通常更稳定。

---

## 第三步：正式安装 Claude Code

Node 和基础命令环境准备好之后，就可以正式安装 Claude Code。

执行下面这条命令：

```bash
npm install -g @anthropic-ai/claude-code
```

这张图对应的动作就是在终端里执行 Claude Code 的安装命令，等待安装过程完成。

![安装 Claude Code](/assets/images/localized/mmbiz.qpic.cn-ddf952fbe743.png)

这里最容易踩的坑是把“安装过程跑完”误以为“已经安装成功”，所以下一步一定要继续查命令。
如果安装过程没有报错，下一步不要急着直接启动，而是先检查命令是否真的装进系统了。

---

## 第四步：安装完先查命令，不要直接默认成功

安装结束后，执行：

```bash
claude --version
```

这张图对应的是安装后的关键验证动作。你重点要看的不是界面过程，而是终端里是否已经能正常识别 `claude` 命令并返回版本号。

![检查安装结果](/assets/images/localized/mmbiz.qpic.cn-a85ea63c9569.png)

如果能返回版本号，说明最关键的一步已经通了。

很多新手最大的问题，就是看到 npm 安装命令执行完了，就默认“安装成功”。其实真正算成功的标准，不是 npm 跑完，而是 `claude` 命令已经能正常识别。

---

## 第五步：Windows 上安装失败，优先按这个顺序排查

如果你已经执行了安装命令，但最后还是用不了，建议按下面这个顺序检查。

### 1. 先查 Node.js 是否真的装好了

先执行：

```bash
node -v
```

如果这里都不正常，那后面的 Claude Code 安装自然也不会稳定。

### 2. 再查 npm 是否可用

执行：

```bash
npm -v
```

如果 npm 本身不可用，那说明问题还在更前面的运行环境。

### 3. 最后查 `claude` 命令是否进了环境

执行：

```bash
claude --version
```

如果前两步正常、这一步不正常，那才更像是全局安装或命令路径问题。

把顺序分开查，通常比一上来就重装高效得多。

---

## 第六步：第一次启动前，再确认这几件小事

在第一次真正启动 Claude Code 之前，再顺手确认下面几件事：

- 你正在用的终端是否就是你安装命令时用的环境
- Node 和 npm 命令都能正常返回版本号
- `claude --version` 已经可用
- 你准备在一个真实项目目录里启动，而不是空目录里乱试

这几件事看起来都很小，但很多人第一次启动不顺，问题恰恰就出在这些细节上。

---

## 第七步：进入项目目录再启动，会比在空目录里顺很多

本地环境装好之后，建议你直接进入一个具体项目目录，再启动 Claude Code。

这样它一开始就能感知项目结构、文件上下文和当前工作范围，用起来会更自然。

也就是说，第一次成功安装之后，别只停留在“版本号终于出来了”，而是要顺着往下完成真正的第一步使用。

---

## 如果后面要长期用，再考虑套餐和接入方式

安装和账号不是一回事，安装完成也不等于后续使用路径已经选定。

如果你只是想先体验，先把本地跑通就够了；如果你后面准备高频使用，再去看 Claude 的套餐体系、网页端、CLI、API 这些路径会更合理。

如果你更看重省心和统一接入，也可以看看 [Code80](https://code.ai80.vip/home)，通过兼容 endpoint 的方式接入会更直接。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q：Windows 上使用 Claude Code，一定要装 Git for Windows 吗？**

A：不是绝对强制，但很建议装。因为它会提供 Git Bash，这对很多命令行场景更友好。

**Q：为什么 npm 安装成功了，`claude` 命令还是不能用？**

A：这通常说明问题不在“有没有安装”，而在“命令有没有正确进入可用环境”。所以要重点检查 Node、npm 和命令识别这三步。

**Q：第一次安装时，最重要的验证动作是什么？**

A：不是看安装过程有没有滚完，而是执行 `claude --version`，确认系统已经真正识别这个命令。

**Q：Windows 上第一次启动 Claude Code，有什么建议？**

A：建议直接在真实项目目录里启动，不要只在空目录里试命令。这样更容易建立正确的使用感。

**Q：电脑配置一般，会影响 Claude Code 安装吗？**

A：大多数情况下不会。真正影响成功率的，更多还是 Node、npm 和终端环境是否理顺。

**Q：如果我后续不想自己处理太多接入细节怎么办？**

A：如果你更看重省心和统一接入，国内用户也可以通过 [Code80](https://code.ai80.vip/home) 这类兼容服务更方便地使用。
