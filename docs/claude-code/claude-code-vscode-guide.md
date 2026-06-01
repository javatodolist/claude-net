---
title: Claude Code 在 VS Code 里怎么用：插件、项目打开和第一次任务
description: Claude Code 在 VS Code 里怎么用：插件、项目打开和第一次任务。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Claude Code 在 VS Code 里怎么用：插件、项目打开和第一次任务

## 写在前面

很多人对 Claude Code 感兴趣，但一看到终端就先退了一步。不是不想用，而是更习惯在 IDE 里看项目、改代码、切文件。

这其实很正常。对大多数开发者来说，编辑器本来就是最熟悉的工作区。也正因为如此，Claude Code 真正更适合多数人的用法，往往不是“纯命令行硬上”，而是把它接进 VS Code：你继续在熟悉的界面里看项目、浏览代码、检查结果，让 Claude Code 去负责读上下文、推进任务、执行链路。

这篇文章就只解决一件事：如果你不想一上来就全程待在终端里，怎么把 Claude Code 在 VS Code 里顺手用起来。

---

## 先搞清楚：VS Code 不是替代 Claude Code，而是它更顺手的入口

很多新手会有一个误解：既然已经在 VS Code 里用了，是不是就不算在用 Claude Code 了？

不是。

更准确的理解是：

- **VS Code** 负责项目浏览、文件查看、可视化编辑
- **Claude Code** 负责理解任务、读写文件、执行命令、推进工作流

也就是说，VS Code 更像是你熟悉的驾驶舱，而 Claude Code 是那个真正能接任务、往前干活的 AI 编程 Agent。

对不喜欢纯命令行的新手来说，这种组合反而更容易建立正确预期。

---

## 第一步：先把本地基础环境装好

在 VS Code 里使用 Claude Code 之前，前提还是一样：本地命令行环境要先可用。

至少先确认下面几件事：

1. Node.js 已经安装
2. Windows 用户最好已经安装 Git for Windows
3. Claude Code 已经通过 npm 正常安装
4. `claude --version` 能返回版本号

如果这些还没处理好，就先不要急着进 VS Code 折腾插件，因为后面的体验还是会卡在最底层环境上。

Claude Code 安装命令：

```bash
npm install -g @anthropic-ai/claude-code
```

---

## 第二步：先装 VS Code

如果你本地还没有 VS Code，可以先从官网下载安装。

下载地址：

https://code.visualstudio.com/

这张图对应的是 VS Code 的准备步骤。第一次操作时，你只需要确认自己已经进入官方下载页，先把后面要用的 IDE 环境准备好。

![VS Code 下载页面](/assets/images/localized/mmbiz.qpic.cn-187197db866d.png)

对大多数开发者来说，这一步没什么门槛，重点是后面要在你真正会打开项目、查看代码的环境里，把 Claude Code 一起接进去。

---

## 第三步：在扩展市场里安装 Claude Code 插件

打开 VS Code 之后，进入左侧扩展市场，搜索 Claude Code，安装对应插件。

这张图对应的是插件搜索动作。你重点只要确认两件事：已经在扩展市场搜到 Claude Code，以及准备安装的是对应插件。

![搜索 Claude Code 插件](/assets/images/localized/mmbiz.qpic.cn-e6fa6884fac4.png)

安装完成后，界面右上角通常会出现 Claude Code 的入口。

这张图对应的判断点很明确：安装完成后，VS Code 界面里已经能看到 Claude Code 的入口，说明它已经真正接进编辑器了。

![在 VS Code 中打开 Claude Code](/assets/images/localized/mmbiz.qpic.cn-c78673c387bc.png)

到这一步，你就已经把 Claude Code 从“命令行工具”接进了“日常工作界面”。

---

## 第四步：打开真实项目，不要在空窗口里试手感

这一步非常关键。

很多人装完插件之后，会先在一个空窗口里随便点两下，然后觉得“也没什么特别”。问题不在工具，而在上下文。

Claude Code 最适合处理的是具体项目里的具体任务，所以第一次最好直接打开一个真实项目，哪怕只是一个很小的测试目录也可以。

这样做的好处很明显：

- Claude Code 能直接感知当前目录结构
- 你能看到它围绕哪些文件在工作
- 结果更容易验证
- 你更容易建立“它到底擅长干什么”的感觉

换句话说，Claude Code 在 VS Code 里真正的价值，不是陪你闲聊，而是围绕项目做事。

---

## 第五步：第一次最适合拿什么任务试手

第一次在 VS Code 里用 Claude Code，最好的方式不是拿大型旧项目开刀，而是先拿边界清晰的小任务建立手感。

比如这几类都很合适：

- 让它解释一个模块是怎么工作的
- 补一个小功能
- 修一个已经能稳定复现的小 Bug
- 写一个小 Demo
- 给已有逻辑补一段测试

第一篇文章里其实演示过一个很典型的场景：新建一个测试目录，让 Claude Code 帮你生成一个小游戏。

第一张图对应的是测试项目准备动作。重点不是目录有多复杂，而是你已经给 Claude Code 提供了一个边界清晰、方便试手的真实目录。

![创建测试项目目录](/assets/images/localized/mmbiz.qpic.cn-86fca96f8a8e.png)

第二张图对应的动作，就是把一个具体任务交给 Claude Code。第一次试手时，这类目标清楚、结果直观的小任务最容易让你看懂它的工作方式。

![让 Claude Code 生成小游戏](/assets/images/localized/mmbiz.qpic.cn-4bbbeb1f55d2.png)

第三张图要看的，是 Claude Code 已经把结果落成了具体项目文件。也就是说，它不是只给建议，而是真的把任务推进到了可检查的状态。

![生成完成的项目](/assets/images/localized/mmbiz.qpic.cn-0d550f63dae5.png)

这种任务最大的好处，不是它多复杂，而是结果够直观、够容易验证。

---

## 第六步：第一次提任务，尽量把目标说具体

在 VS Code 里用 Claude Code 时，一个常见误区是：界面看起来更轻松了，任务描述就变得更随意。

比如你只说：

- “帮我优化一下”
- “看下这段代码”
- “帮我整理一下项目”

这种表达都太空。

更好的方式是直接说清楚：

- 要看哪个文件或模块
- 你想达到什么结果
- 不希望动哪些东西
- 最后希望它输出什么

Claude Code 在 VS Code 里依然是任务执行者，不是读心助手。任务越具体，结果越稳定。

---

## 第七步：把 VS Code 和 Claude Code 分工用顺

真正稳定的工作流，通常不是“全靠 Claude Code”，也不是“只把它当插件点一下”。而是把分工理顺。

比较实用的一种方式是：

### 你自己负责
- 看项目结构
- 检查文件改动
- 判断方向对不对
- 最后验收结果

### Claude Code 负责
- 理解上下文
- 执行具体任务
- 改文件
- 跑命令
- 给出反馈

这样一来，VS Code 继续是你熟悉的主工作台，而 Claude Code 成为真正的执行搭子。

---

## 第八步：如果后面想长期用，再考虑更适合自己的接入方式

当你已经在 VS Code 里把 Claude Code 用顺之后，后面才需要考虑更长期的问题：

- 是继续以网页端和插件为主
- 还是更多转到终端工作流
- 是否需要更高套餐
- 是否要接 API

如果你更在意统一接入和省心配置，也可以看看 [Code80](https://code.ai80.vip/home)，通过兼容 endpoint 的方式接入会更直接。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q：我不喜欢纯终端，还适合用 Claude Code 吗？**

A：适合。对很多人来说，VS Code + Claude Code 本来就是更自然的组合，不需要强迫自己全程待在命令行里。

**Q：在 VS Code 里用 Claude Code，和直接在终端里用有什么差别？**

A：核心能力没变，差别主要在使用体验。VS Code 更适合可视化浏览和检查结果，终端更适合纯任务推进。很多人最后会两边配合用。

**Q：第一次最适合拿什么项目试手？**

A：最适合边界清晰、结果容易验证的小项目或测试目录，不建议第一次就拿大型旧项目开刀。

**Q：为什么我装好插件之后，还是感觉没什么特别？**

A：通常是因为你还没把它放进真实项目和真实任务里。Claude Code 的价值不是开着界面，而是接住具体任务。

**Q：VS Code 里最值得先让 Claude Code 做什么？**

A：先从代码解释、小功能、Bug 修复、补测试这类小任务开始，最容易建立正反馈。

**Q：如果我不想自己处理太多接入细节怎么办？**

A：如果你更看重省心和统一接入，国内用户也可以通过 [Code80](https://code.ai80.vip/home) 这类兼容服务更方便地使用。
