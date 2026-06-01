---
title: 2026最新Claude Code国内上手教程 从安装到第一次跑通完整流程一次讲清
description: 2026最新Claude Code国内上手教程 从安装到第一次跑通完整流程一次讲清。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# 2026最新Claude Code国内上手教程 从安装到第一次跑通完整流程一次讲清

![Banner](/assets/images/localized/mmbiz.qpic.cn-27fdeb70107a.png)

## 写在前面

很多人第一次接触 Claude Code，最容易误会它只是“把 Claude 放进终端里”。真上手之后你会发现，它和普通聊天工具、也和常见的代码补全插件不是一回事。

它真正厉害的地方，不是帮你补一小段代码，而是能直接进入项目目录，理解文件结构，读取上下文，按你的要求修改文件、执行命令、推进任务。你不再只是“问它怎么做”，而是可以开始“让它去做”。

但也正因为它更像一个会动手的 AI 编程 Agent，新手第一次上手最容易卡住的地方，反而不是提问技巧，而是更前面的三件事：本地环境怎么装、账号怎么准备、第一次到底拿什么任务试手最合适。这篇文章就按这个顺序，一步一步带你走通。

---

## 先搞清楚：Claude Code 不是普通的 AI 编程插件

如果你之前用过 Cursor、Copilot 或网页里的 Claude，对 Claude Code 的第一印象很可能会偏差。

Claude Code 不是单纯的代码补全工具，也不是把对话框塞进 IDE。它更准确的定位，是 **Anthropic 推出的终端侧 AI 编程 Agent**。

你可以把它理解成这样：

- 普通聊天工具：你问一句，它答一句
- 普通编程插件：你在写代码，它在旁边辅助
- Claude Code：你给它一个任务，它会去读项目、改文件、跑命令、反馈结果

这也是为什么很多开发者第一次真正跑通之后，会明显感受到工作流发生变化。它带来的不只是“写得更快”，而是“从理解问题到执行任务的链路更完整了”。

---

## 电脑配置不是重点，运行环境才是

很多新手会先担心一件事：自己电脑配置一般，能不能跑 Claude Code？

大多数情况下，答案是可以。

Claude Code 的核心智能在云端，本地机器主要负责三件事：

- 提供项目文件
- 提供命令执行环境
- 负责和云端服务通讯

所以真正影响上手体验的，通常不是显卡、内存，而是这些基础条件有没有理顺：

1. Node.js 是否安装正常
2. 终端环境是否可用
3. Windows 上是否具备类 Unix 命令环境
4. Claude 账号和套餐是否准备妥当
5. 你的第一次任务是不是选对了

也就是说，新手真正该优先处理的不是“升级电脑”，而是“把环境配顺”。

---

## 第一步：先把 Claude Code 装到本地

### 1. 安装 Node.js

Claude Code 本质上是一个 Node.js 工具，所以本地必须先安装 Node.js。

Node.js 下载页面：

https://nodejs.org/en/download/

先看这张图，确认自己打开的是 Node.js 官方下载页。第一次安装直接选择稳定版本即可，不用一开始就纠结版本管理工具或多环境切换。

![Node.js 下载页面](/assets/images/localized/mmbiz.qpic.cn-cade20abbfc0.png)

这一步做完后，不要急着继续装 Claude Code，先回到终端执行 `node -v`，确认版本号已经能正常返回。
如果你只是第一次上手，直接安装稳定版本即可。装好之后先执行一次：

```bash
node -v
```

能正常返回版本号，说明运行环境已经就位。

### 2. Windows 用户建议安装 Git for Windows

如果你在 Windows 上使用 Claude Code，建议把 Git for Windows 一起装上。原因不是“为了 Git 本身”，而是它会带来 Git Bash 这套更顺手的命令行环境。

Git for Windows 下载页面：

https://git-scm.com/install/windows

如果你是 Windows 用户，这张图对应的就是第二步：进入 Git for Windows 官方下载页，准备补齐 Git Bash 这套命令行环境。你重点只要确认自己进的是官方下载入口即可。

![Git for Windows 下载页面](/assets/images/localized/mmbiz.qpic.cn-467f4dbd1c8a.png)

装好之后，后面再执行 npm 安装和命令检查时，整体终端体验通常会顺很多。
这一步不是绝对强制，但对 Windows 用户来说，后面很多操作会顺很多。

### 3. 安装 Claude Code

环境准备好之后，就可以正式安装 Claude Code 了：

```bash
npm install -g @anthropic-ai/claude-code
```

这张图对应的动作很直接：在本地终端里执行全局安装命令，等待安装过程完成。

![安装 Claude Code](/assets/images/localized/mmbiz.qpic.cn-ddf952fbe743.png)

看到安装界面跑完，不代表已经万事大吉，下一步一定要继续查命令有没有真正生效。
装完之后，再执行一次版本检查：

```bash
claude --version
```

这张图对应的是安装后的关键验证动作。你要看的不是界面好不好看，而是终端里有没有正常返回 Claude Code 的版本号。

![检查安装结果](/assets/images/localized/mmbiz.qpic.cn-a85ea63c9569.png)

只有这一步通过，才算本地安装真正完成。
能看到版本号，本地安装这一步就算完成了。

---

## 第二步：账号准备要和安装分开看

很多人装好本地环境之后，会以为自己已经可以直接开用了。其实不一定。

因为 Claude Code 最终调用的是 Anthropic 的服务，所以在正式使用前，你还需要先确认几件事：

- 自己当前能否正常使用 Claude 官方服务
- 是否已经准备好可用邮箱
- 当前账号是否能完成登录或注册
- 如果后续需要更高频使用，是否已经想清楚套餐选择

这里最重要的一点，不是到处找零散说法，而是先把顺序捋顺：

1. 先确认账号可用
2. 再判断要不要付费
3. 最后再决定是走网页端、CLI 还是 API 方式

把这三件事分开，第一次上手会轻松很多。

---

## 第三步：先理解套餐，再决定怎么用

Claude Code 本身不是单独售卖的软件，它依赖的是 Claude 的账户体系和模型访问能力。

你可以先粗略这样理解：

| 类型 | 更适合谁 |
|------|----------|
| 免费版 | 轻度体验、新手熟悉界面 |
| Claude Pro | 个人高频使用 Claude |
| Claude Max | 更高频率使用、Claude Code 用量更重 |
| Claude Team | 团队统一协作 |
| API | 开发接入、自定义工作流 |

如果你只是第一次体验，免费版已经够你感受基础流程；如果你准备把 Claude Code 真正接进日常开发，再去看 Pro、Max 或 API 会更合理。

不过说实话，官方账号和订阅路径对一部分国内用户来说，上手门槛确实不低。如果你更看重省心和统一接入，也可以看看 [Code80](https://code.ai80.vip/home)，通过兼容 endpoint 的方式接入会更直接。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 第四步：第一次别急着拿大项目，先跑一个小任务

新手第一次用 Claude Code，最容易犯的错误，就是一上来就把一个很大的老项目丢给它。

问题不是它不能处理，而是第一次使用时，你自己还没建立起正确预期：

- 不知道任务该怎么描述
- 不知道上下文应该给到什么程度
- 不知道结果该怎么验证

更稳妥的方式，是先从一个边界清晰的小任务试手，比如：

- 生成一个简单 Demo
- 写一个小功能
- 修一个能稳定复现的小 Bug
- 解释一个你暂时看不懂的模块
- 给现有功能补一段测试

第一篇文章里演示过一个很典型的例子：在本地创建一个测试项目目录，然后让 Claude Code 帮你生成一个小游戏。

先看第一张图，重点不是目录名字本身，而是你已经进入了一个专门拿来试手的小项目目录。第一次使用时，这种边界清晰的测试目录比直接拿大项目开刀更稳。

![创建测试项目目录](/assets/images/localized/mmbiz.qpic.cn-86fca96f8a8e.png)

第二张图对应的动作，就是把任务明确交给 Claude Code。第一次试手时，像“帮我生成一个小游戏”这种目标清楚、结果直观的任务最容易建立感觉。

![让 Claude Code 生成小游戏](/assets/images/localized/mmbiz.qpic.cn-4bbbeb1f55d2.png)

第三张图要看的，是 Claude Code 已经把文件和项目结构实际生成出来了。也就是说，它不是只回答思路，而是真的把任务往前推进了一步。

![生成完成的项目](/assets/images/localized/mmbiz.qpic.cn-0d550f63dae5.png)

最后这张图对应的是验收动作：把生成结果真正跑起来，看它是不是能工作。第一次使用时，这一步很关键，因为它能帮你建立“任务完成”和“结果可验证”之间的联系。

![运行生成的小游戏](/assets/images/localized/mmbiz.qpic.cn-c22a0490f9c0.png)

这类任务最大的价值，不是项目本身有多复杂，而是它能帮你快速建立一个感觉：Claude Code 最擅长的，不是补一小行，而是接住一个完整任务并往前推进。

---

## 第五步：不习惯纯终端，也可以接进 VS Code

很多人对 Claude Code 有兴趣，但看到命令行就先退一步：能不能还是在 IDE 里用？

可以，而且这其实是很多开发者最后最稳定的工作流。

### 1. 先安装 VS Code

下载地址：

https://code.visualstudio.com/

这张图对应的是 IDE 准备步骤：先把 VS Code 装好。你不用在这一步想太多，重点只是把后面要承载 Claude Code 的工作界面准备出来。

![VS Code 下载页面](/assets/images/localized/mmbiz.qpic.cn-187197db866d.png)

### 2. 安装 Claude Code 插件

打开扩展市场，搜索 Claude Code，安装对应插件。

这张图对应的是插件搜索动作。你只要在扩展市场里搜到 Claude Code，并确认安装的是对应插件即可。

![搜索 Claude Code 插件](/assets/images/localized/mmbiz.qpic.cn-e6fa6884fac4.png)

安装后，界面右上角会出现入口。

这张图对应的判断点很简单：安装完成后，VS Code 里已经出现 Claude Code 的打开入口，说明它已经被接进你的日常编辑界面了。

![在 VS Code 中打开 Claude Code](/assets/images/localized/mmbiz.qpic.cn-c78673c387bc.png)

这套组合很适合大多数人：

- VS Code 负责浏览项目和可视化编辑
- Claude Code 负责执行任务和推进链路

两者并不冲突，反而是互补关系。

---

## 第六步：第一次真正跑通，记住这 3 个原则

第一次上手时，你只要先记住下面三件事，体验通常不会差：

### 原则 1：任务越具体，结果越稳定

不要只说“帮我优化一下”，而要说清楚：

- 你想改哪个模块
- 目标是什么
- 有没有边界约束

### 原则 2：先做小任务，再做大任务

第一次就拿大型遗留项目试手，往往不是最好的体验方式。先建立节奏感，再逐步放大范围，会更稳。

### 原则 3：让它做事，也要学会验证结果

Claude Code 很强，但它不是不用检查。最好的用法不是全盘托管，而是让它推进任务，你负责判断方向和验收结果。

---

## 常见问题

**Q：Claude Code 和 Cursor，到底先用哪个？**

A：如果你更习惯可视化界面、希望在编辑器里边写边改，那 Cursor 会更容易上手；如果你更想把一个完整任务交给 AI，让它自己读项目、改文件、跑命令，Claude Code 会更适合。对大多数新手来说，先理解两者的分工，比急着站队更重要。

**Q：Claude Code 本身需要单独买吗？**

A：不用把它理解成一个单独售卖的软件。Claude Code 本质上是 Anthropic 提供的终端编程工具，你真正需要关注的是 Claude 账号、可用套餐，以及自己准备走网页端、API 还是团队统一接入。

**Q：电脑配置一般，真的能跑 Claude Code 吗？**

A：大多数情况下可以。Claude Code 的核心智能在云端，本地主要负责运行环境、文件访问和命令执行，所以对本地硬件要求没有很多人想象中那么高。

**Q：Windows 用户为什么最好装 Git for Windows？**

A：因为 Claude Code 的很多自动化操作更适合在类 Unix 命令环境里完成，而 Git for Windows 自带的 Git Bash，正好能把这部分补齐。

**Q：第一次上手 Claude Code，最适合拿什么任务试手？**

A：最适合的是边界清晰、结果容易验证的小任务，比如做个简单 Demo、补一个小功能、解释一段旧代码，或者修一个确定能复现的 Bug。

**Q：如果我不想自己处理太多接入细节怎么办？**

A：如果你更看重省心和统一接入，国内用户也可以通过 [Code80](https://code.ai80.vip/home) 这类兼容服务更方便地使用。
