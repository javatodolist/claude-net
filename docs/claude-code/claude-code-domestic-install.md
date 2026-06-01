---
title: Claude Code 国内安装使用完整教程
description: Claude Code 国内安装使用完整教程。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-02
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Claude Code 国内安装使用完整教程

## 写在前面

很多人第一次接触 Claude Code，卡住的不是“不会用”，而是“根本装不上”。

问题通常都出在几个老地方：Node.js 版本没选对、npm 全局目录和缓存目录没配好、环境变量没改干净、国内网络拉包慢，最后命令明明敲了，终端却还是一堆报错。

所以这篇文章不聊虚的，就按一条最实用的主线来：**先把 Node.js 装好，再把 npm 和环境变量整理顺，再安装 Claude Code，最后确认命令能不能正常跑起来。** 如果你正准备在 Windows 机器上把这套环境落地，照着往下走就行。

---

## 先搞清楚：Claude Code 到底是什么

Claude Code 是 Anthropic 做的命令行 AI 编程工具。它不是普通的聊天窗口，而是能直接在本地开发环境里工作的 Agent：

- 能理解你的代码库结构
- 能执行命令
- 能读写项目文件
- 能辅助你管理 Git 仓库
- 能接入 MCP 等外部能力
- 还能把一些原本很碎、很重的开发工作自动化

说白了，它更像一个待在终端里的 AI 编程搭子。你给它目标，它不只是回答问题，还会尽量把事情往前推进。

从官方订阅方式看，Claude Code 目前主要有几种用法：

- **Claude Pro**：`$17/月`（按年订阅）或 `$20/月`（按月）
- **Claude Max 5x**：`$100/人/月`
- **Claude Max 20x**：`$200/人/月`
- **API 模式**：按 Anthropic 官方 API 计费

不过说实话，官方订阅对国内用户不太友好——需要海外信用卡，网络环境也得折腾。如果嫌麻烦想找个更省事的渠道，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 安装思路先说清楚：这篇教程走 npm 方案

这篇教程我会分成两种安装方式来看：

- **方式一：npm 安装**
- **方式二：官网下载脚本安装**

这篇文章我主讲 **npm 方案**。原因也很简单：对大多数 Windows 用户来说，先把 Node.js 和 npm 环境整理好，后面不管你装 Claude Code 还是别的前端/Node 工具，都会顺很多。

---

## 第一步：安装 Node.js

我建议先装 Node.js，并优先用 nvm 管理版本。如果你平时就会切换 Node 版本，这个做法确实挺合理；但如果你现在的目标只是先把 Claude Code 跑起来，直接安装一个稳定的 LTS 版本也完全可以。

&gt; 推荐参考教程：
&gt; https://blog.csdn.net/sjp991012/article/details/134426007

### 下载安装包

Node.js 官网：&lt;https://nodejs.org/&gt;

![Node.js 官网页面](/assets/images/localized/i-blog.csdnimg.cn-6ea7be12adda.png)

![Node.js 下载入口](/assets/images/localized/i-blog.csdnimg.cn-d76aacd332c0.png)

我这里给出的选择步骤是这样的，基本可以直接照着来：

1. 选择版本 **`v22.14.0 (LTS)`**，原则上优先选最新的 LTS，也就是长期支持版本。
2. 下载安装包时，选择 **prebuilt（预制）版**。
3. 操作系统选择 **Windows**。
4. 架构类型选择 **x64**。
5. 点击 **Windows 安装程序（.msi）** 开始下载。
6. 下载完成后，文件名类似 **`node-v24.11.1-x64.msi`**。

### 安装程序

接下来就是标准的 Windows 安装流程。

1. 双击安装包 `node-v22.14.0-x64.msi`，开始安装。

![开始安装 Node.js](/assets/images/localized/i-blog.csdnimg.cn-10807d376c7f.png)

2. 直接点击 **Next**，进入协议确认窗口。

![协议确认窗口](/assets/images/localized/i-blog.csdnimg.cn-66b7ffab464f.png)

3. 修改安装路径后，点击 **Next**。

![修改安装路径](/assets/images/localized/i-blog.csdnimg.cn-db5c90d75303.png)

4. 继续点击 **Next**。

![功能选择页面](/assets/images/localized/i-blog.csdnimg.cn-5f85676c6543.png)

这个页面里各选项的意思，我也列得很清楚：

- **Node.js runtime**：Node.js 运行环境
- **npm package manager**：npm 包管理器
- **Online documentation shortcuts**：在线文档快捷方式
- **Add to PATH**：把 Node.js 加到环境变量里

5. 不用额外勾选内容，继续点击 **Next**，会进入 **Tools for Native Modules** 窗口。

![Tools for Native Modules 窗口](/assets/images/localized/i-blog.csdnimg.cn-5205c5dc95f6.png)

6. 点击 **Install** 开始正式安装。

![点击 Install](/assets/images/localized/i-blog.csdnimg.cn-44fdaf0a07de.png)

7. 等待安装完成。

![安装进行中](/assets/images/localized/i-blog.csdnimg.cn-b18f5595eab3.png)

8. 安装结束。

![安装完成页面](/assets/images/localized/i-blog.csdnimg.cn-263c5cd26c85.png)

9. 最后做一次验证。按 `WIN + R`，输入 `CMD` 回车，在命令行里执行：

```bash
node -v
```

能看到 Node.js 版本号，就说明安装成功了。

![在运行窗口打开 CMD](/assets/images/localized/i-blog.csdnimg.cn-13d777b14a7c.png)

![查看 Node.js 版本](/assets/images/localized/i-blog.csdnimg.cn-59f5be4df2e7.png)

---

## 第二步：配置 npm 路径和环境变量

这一步很关键。很多人装完 Node.js 就急着执行安装命令，结果后面不是全局包路径乱掉，就是缓存目录不好管，要么就是 PATH 配得不干净，命令行为莫名其妙地出问题。

这一步我会拆成两块：

1. **npm 的 prefix 和 cache 配置**
2. **系统环境变量配置**

### 2.1 配置 npm 的 prefix 和 cache

我建议在 Node.js 安装目录下单独准备两个文件夹，一个放全局依赖，一个放缓存。这个思路很好，后面你要排查问题、清缓存、看全局包位置都会方便不少。

先在安装目录里新建两个文件夹。假设你的 Node.js 安装路径是：

```text
D:\Tools\nodejs
```

那么需要再建：

- `node_global`：放全局依赖
- `node_cache`：放全局缓存

![创建 node_global 和 node_cache](/assets/images/localized/i-blog.csdnimg.cn-79b6d862f36d.png)

然后以**管理员身份**打开命令行窗口。

![以管理员身份打开命令行](/assets/images/localized/i-blog.csdnimg.cn-04cfacce0814.png)

在终端里执行下面几条命令，把 npm 的全局目录和缓存目录改过去：

```powershell
npm config set prefix "D:\Tools\nodejs\node_global"
npm config set cache "D:\Tools\nodejs\node_cache"
npm config get prefix
npm config get cache
```

这几条命令分别做了什么：

- 第 1 条：把 npm 的全局安装目录设为 `node_global`
- 第 2 条：把 npm 的缓存目录设为 `node_cache`
- 第 3、4 条：检查刚才的配置是不是已经生效

![设置 npm prefix 和 cache](/assets/images/localized/i-blog.csdnimg.cn-ddaa0c7c8426.png)

### 2.2 配置系统环境变量

这里要强调的是，需要分别处理 **用户变量** 和 **系统变量**。如果你之前没单独整理过 npm 路径，这一步一定别省。

#### 打开环境变量设置

先进入：

- 设置
- 系统
- 系统信息
- 高级系统设置

![打开高级系统设置](/assets/images/localized/i-blog.csdnimg.cn-c15461f75c04.png)

然后点 **高级 → 环境变量**。

![进入环境变量页面](/assets/images/localized/i-blog.csdnimg.cn-388d5cc5c2e8.png)

#### 修改用户变量里的 npm 路径

在“用户变量”的 `Path` 里，你通常会看到默认 npm 路径，类似：

```text
C:\Users\（你的用户名）\AppData\Roaming\npm
```

![默认 npm Path 配置](/assets/images/localized/i-blog.csdnimg.cn-da7aa4c960f6.png)

我建议把它改成你刚才创建的 `node_global` 路径，也就是：

```text
D:\Tools\nodejs\node_global
```

![修改用户变量 Path](/assets/images/localized/i-blog.csdnimg.cn-a5797106abb9.png)

改完后点“确定”保存。

#### 修改系统变量

接着看系统变量。这里要做两件事：

1. 新增变量 `NODE_PATH`，变量值设为 Node.js 安装路径：

```text
D:\Tools\nodejs
```

2. 在系统变量 `Path` 里再增加一条：

```text
%NODE_PATH%\node_modules
```

也就是说，最终系统变量部分至少会涉及：

- `NODE_PATH = D:\Tools\nodejs`
- `Path += %NODE_PATH%\node_modules`

![新增 NODE_PATH](/assets/images/localized/i-blog.csdnimg.cn-0fbc26477454.png)

![在系统 Path 中追加 node_modules](/assets/images/localized/i-blog.csdnimg.cn-d06c05929727.png)

确认之后，环境变量这部分就算完成了。

### 2.3 装个包验证一下全局环境

这里我用 `express` 做测试，这个思路很实用，因为它能帮你确认：

- npm 全局安装是不是正常
- 目录是不是确实装到了 `node_global`
- 权限和路径配置有没有问题

以管理员身份打开 CMD，然后执行：

```bash
npm install express -g
```

![全局安装 express 测试](/assets/images/localized/i-blog.csdnimg.cn-814778595803.png)

这里顺手再解释一下 `-g`：

- `-g` 等同于 `--global`
- 带 `-g` 是**全局安装**
- 不带 `-g` 则默认装到当前目录

这里还特别提醒一点：使用 `-g` 之后，Node.js 会自动在 `node_global` 目录下创建 `node_modules` 子目录，所以最终包会出现在：

```text
【Node.js安装路径】\node_global\node_modules
```

安装完成后，你应该能在这个路径里看到新增的 `express` 目录。

![查看 express 安装结果](/assets/images/localized/i-blog.csdnimg.cn-fac03adf2ce4.png)

### 2.4 配置淘宝镜像 / npm 镜像源

如果你在国内环境里拉包，经常慢、偶尔还会失败，那把 registry 切到镜像源会省心很多。我这里给出的命令是：

```powershell
npm config set registry https://registry.npmmirror.com
npm config get registry
```

第一条是设置镜像源，第二条是确认当前 registry 是否已经切换成功。

![切换 npm 镜像源](/assets/images/localized/i-blog.csdnimg.cn-392329e3b1a4.png)

---

## 第三步：安装 Claude Code

到这里，Node.js、npm 路径、环境变量、镜像源都处理得差不多了，才轮到真正安装 Claude Code。

### 安装前先确认版本要求

这里先提醒一句：**确保已经安装 Node.js，并且版本至少是 18.0 或更高。**

如果你前面装的是 LTS 版本，一般不会有问题。保险一点的话，可以先执行：

```bash
node -v
```

确认一下版本号。

### 用 npm 安装 Claude Code

这里展示的是通过 npm 执行安装命令，并结合镜像源完成安装。文中给出的命令是：

```bash
npm install -g https://gaccode.com/claudecode/install --registry=https://registry.npmmirror.com
```

对应的代码块写法是：

```powershell
# 安装Claude code
npm install -g https://gaccode.com/claudecode
```

### 安装完成后查看版本

安装结束后，可以直接执行：

```bash
claude --version
```

如果终端能正确返回版本信息，就说明 Claude Code 已经进入可用状态了。

---

## 第四步：把 Claude Code 真正跑起来

前面把环境装好，只能算完成了一半。想让 Claude Code 在国内环境里真正开始干活，还得把 **CLI 工具、API 配置和首次启动流程** 这三步走通。走到这里，你才算是从“装上了”进入“能用了”。

### 1. 先安装 CLI 工具

如果你准备通过 Code80 平台来使用 Claude Code，第一步先把官方 CLI 装上：

```bash
npm install -g @anthropic-ai/claude-code
```

这一步做完之后，终端里才会有后面真正要用到的 `claude` 命令。

### 2. 配置 `~/.claude/settings.json`

接下来要做的是把 API 信息配进 Claude Code 的配置文件。直接编辑 `~/.claude/settings.json`，写成下面这样：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your-api-key",
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip"
  }
}
```

这里有两个关键参数：

- `ANTHROPIC_AUTH_TOKEN`：替换成你在 Code80 平台获取到的 API Key
- `ANTHROPIC_BASE_URL`：设置为 `https://code.ai80.vip`

这一步的意义其实很明确：Claude Code 默认要知道“拿什么令牌访问”和“请求发到哪里去”。这两个值配对了，后面启动时才不会卡在连接和鉴权这一步。

### 3. 进入项目目录并启动 Claude Code

配置完成后，进入你的项目目录，然后直接执行：

```bash
cd your-project
claude
```

如果前面的安装和配置都没问题，这时候 Claude Code 就会真正启动起来。也建议你尽量在**具体项目目录**里执行，而不是随便停在某个空目录里就开跑。这样它一上来就能感知当前代码库和上下文，用起来会顺很多。

### 第一次启动会经历什么

第一次启动时，通常会依次经历这样一个初始化流程：

1. 选择主题
2. 确认安全须知
3. 配置终端
4. 信任当前工作目录
5. 开始编程

你可以把这一步理解成首次引导。只要顺着走完，后面再进入项目继续用，整个体验就会自然很多。

说到底，这一节补的就是最容易被忽略的最后一公里：**安装成功不代表立刻可用，真正要跑起来，关键是把 CLI、API 和项目目录启动这三步打通。**

---

## 一口气回顾整个安装流程

如果你想快速复盘，整个过程可以概括成下面这条线：

1. 安装 Node.js，优先选稳定的 LTS 版本。
2. 验证 `node -v`，确认 Node 已经装好。
3. 在 Node.js 安装目录下创建 `node_global` 和 `node_cache`。
4. 用 `npm config set prefix` 和 `npm config set cache` 把全局目录、缓存目录改过去。
5. 检查用户变量和系统变量，重点处理 `Path` 和 `NODE_PATH`。
6. 通过 `npm install express -g` 验证全局安装路径是否正常。
7. 把 npm registry 切到 `https://registry.npmmirror.com`。
8. 执行 Claude Code 安装命令。
9. 用 `claude --version` 检查最终结果。

这套流程看着步骤不少，但真按顺序来，其实比“哪一步报错就搜哪一步”高效得多。

---

## Claude Code 真正适合谁

如果你只是偶尔问问代码问题，那网页聊天窗口可能就够了。但如果你平时就在本地开发、需要频繁改项目、跑命令、读文件、查 Git 状态，那 Claude Code 的体验会明显更顺。

它比较适合下面这几类人：

- 要经常在本地项目里做修改的开发者
- 需要在命令行里处理任务的后端、前端、全栈工程师
- 想把“查问题 → 改代码 → 执行命令 → 验证结果”串成一条工作流的人
- 想接 MCP、做更自动化开发流程的团队

说白了，Claude Code 的价值不只是“回答问题”，而是让 AI 真正在你的开发环境里干活。

---

## 常见问题

**Q1：为什么文章里要花这么多篇幅讲 Node.js，而不是直接安装 Claude Code？**

A：因为 Claude Code 的 npm 安装依赖 Node.js 环境。如果 Node 版本不对、全局目录没配好、环境变量混乱，后面的安装和运行都容易出问题。先把基础环境整理顺，成功率会高很多。

---

**Q2：Node.js 一定要装最新版本吗？**

A：不用死磕最新，但建议优先选 **LTS（长期支持）版本**。我给出的思路也是这个：稳定、兼容性更好、踩坑更少。

---

**Q3：为什么还要单独设置 npm 的 prefix 和 cache？**

A：主要是为了让全局依赖和缓存目录更清晰、更可控。默认路径有时候分散在用户目录下，不利于排查问题；统一到你指定的目录后，管理会方便很多。

---

**Q4：环境变量最容易改错的是哪一块？**

A：通常是两处：一处是用户变量里的 `Path` 没替换成新的全局 npm 路径；另一处是系统变量里没有补上 `NODE_PATH` 或 `%NODE_PATH%\node_modules`。这两个地方漏一个，后面都有可能出问题。

---

**Q5：为什么还专门演示安装 `express`？**

A：这是一个很直接的验证动作。只要 `npm install express -g` 能正常完成，并且你在目标目录里看到了 `express`，就基本说明 npm 的全局安装链路是通的。

---

**Q6：国内用户如果想更方便地用上 Claude Code，有没有省事一点的办法？**

A：如果你不想折腾海外支付、网络环境这些问题，国内用户可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。
