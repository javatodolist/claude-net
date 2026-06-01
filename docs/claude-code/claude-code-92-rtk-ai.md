---
title: Claude Code成本爆降92 RTK把命令输出先压缩再交给AI
description: Claude Code成本爆降92 RTK把命令输出先压缩再交给AI。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-25
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Claude Code成本爆降92 RTK把命令输出先压缩再交给AI

![Banner](/assets/images/localized/segmentfault.com-56736e14384a.png)

## 写在前面

Claude Code、Codex、OpenCode 这类终端 AI 编程工具越强，开发者越容易遇到同一个问题：Token 烧得太快。

正经拿 Claude Code 写项目，20 美元的 Pro 套餐往往不够用。更高一档的 Max 5x 是 100 美元，Max 20x 是 200 美元。换算下来，一个月的高档订阅费用，差不多已经顶上一年 IntelliJ IDEA 的年费。

![Claude Code 订阅](/assets/images/localized/segmentfault.com-bb7b4f61c0bb.png)

更麻烦的是，AI 编程工具真正消耗 Token 的地方，很多时候不是你写的需求，而是命令输出。一个 `git status`、一次 `tree`、一段测试日志，如果原样塞进模型上下文，几千上万 Token 很快就没了。

RTK 解决的就是这个问题：在命令输出进入 LLM 上下文之前，先做过滤和压缩，只把模型真正需要的信息交给它。

---

## AI 编程真正贵的地方，是无效上下文太多

Claude 官方已经推出过 Skills，用来替代一部分 MCP 场景。它的思路是：只有需要的时候才加载对应 Skill，避免一上来把所有工具说明都塞进上下文。

但 Skills 只能减少“加载成本”，真正执行复杂任务时，命令输出还是会不断进入模型上下文。

比如 AI Agent 在项目里工作，经常会执行这些命令：

- `ls` / `tree` 看目录结构；
- `cat` / `read` 读取文件；
- `grep` / `rg` 搜索代码；
- `git status` / `git diff` / `git log` 理解改动；
- `npm test` / `pytest` / `go test` / `cargo test` 看测试结果；
- `docker ps`、lint、build 等辅助命令。

这些输出里有大量噪声：重复日志、无关路径、空白行、样板代码、完整函数体、过长 diff。人类开发者会扫一眼重点，但模型默认会把它们都当成上下文成本。

这就是 RTK 的价值：不是让模型少干活，而是让模型少看废话。

---

## RTK 是什么：给 AI 编程工具加一层 Token 过滤器

RTK 是一个 CLI 代理工具，可以在常见开发命令中将 LLM 的 Token 消耗减少 60% 到 90%。它的实现很克制：单一 Rust 二进制文件，零依赖，额外开销小于 10ms。

它的工作位置在 shell 命令和模型上下文之间。

```text
Without rtk:                                    With rtk:

Claude  --git status--&gt;  shell  --&gt;  git         Claude  --git status--&gt;  RTK  --&gt;  git
  ^                                   |            ^                      |          |
  |        ~2,000 tokens (raw)        |            |   ~200 tokens        | filter   |
  +-----------------------------------+            +------- (filtered) ---+----------+
```

一条普通 `git status`，原始输出可能接近 2000 tokens；经过 RTK 过滤后，模型只看到约 200 tokens 的必要信息。

RTK 通过自动注册钩子实现透明拦截。它会在 Bash 命令执行前，把命令重写成 RTK 等效命令。Claude Code 看不到重写过程，只会收到压缩后的输出。

需要注意的是，钩子只在 Bash 工具调用时运行。Claude Code 内置的 Read、Grep、Glob 这类工具不会经过 Bash 钩子，所以不会被自动重写。

---

## 30 分钟能省多少 Token

RTK 给出的 30 分钟 Claude Code Token 节省示例很直观：

| Operation | Frequency | Standard | rtk | Savings |
| --- | ---: | ---: | ---: | ---: |
| `ls` / `tree` | 10x | 2,000 | 400 | -80% |
| `cat` / `read` | 20x | 40,000 | 12,000 | -70% |
| `grep` / `rg` | 8x | 16,000 | 3,200 | -80% |
| `git status` | 10x | 3,000 | 600 | -80% |
| `git diff` | 5x | 10,000 | 2,500 | -75% |
| `git log` | 5x | 2,500 | 500 | -80% |
| `git add/commit/push` | 8x | 1,600 | 120 | -92% |
| `cargo test` / `npm test` | 5x | 25,000 | 2,500 | -90% |
| `ruff check` | 3x | 3,000 | 600 | -80% |
| `pytest` | 4x | 8,000 | 800 | -90% |
| `go test` | 3x | 6,000 | 600 | -90% |
| `docker ps` | 3x | 900 | 180 | -80% |
| **Total** |  | **~118,000** | **~23,900** | **-80%** |

最高场景下，成本可以爆降 92%。对高频使用 Claude Code、Codex、OpenCode 的开发者来说，这不是小优化，而是直接影响“一个套餐能不能撑到月底”。

---

## RTK 怎么安装

### Mac / Linux

一键安装命令：

```bash
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh
```

### Windows

Windows 用户可以到 GitHub Releases 下载压缩包：

```text
https://github.com/rtk-ai/rtk/releases
```

解压 ZIP 后，把 `rtk.exe` 放到 PATH 目录里。之后通过命令提示符、PowerShell 或 Windows Terminal 运行即可，不要双击 `.exe`。

### 验证安装

```bash
rtk --version
```

示例输出：

```text
rtk 0.37.2
```

安装后，可以用 `rtk gain` 查看 Token 节省情况。

---

## 怎么接入 Claude Code、Codex、Cursor 等工具

RTK 默认可以安装到 Claude Code / Copilot，也支持指定不同 AI 编程工具。

| 编程工具 | 安装命令 |
| --- | --- |
| Claude Code | `rtk init -g` |
| GitHub Copilot (VS Code) | `rtk init -g --copilot` |
| GitHub Copilot CLI | `rtk init -g --copilot` |
| Cursor | `rtk init -g --agent cursor` |
| Gemini CLI | `rtk init -g --gemini` |
| Codex | `rtk init -g --codex` |
| Windsurf | `rtk init --agent windsurf` |
| Cline / Roo Code | `rtk init --agent cline` |
| OpenCode | `rtk init -g --opencode` |
| OpenClaw | `openclaw plugins install ./openclaw` |
| Kilo Code | `rtk init --agent kilocode` |
| Google Antigravity | `rtk init --agent antigravity` |

![安装到 Codex](/assets/images/localized/segmentfault.com-beafbb21bafc.png)

这类工具最大的好处是“透明”。你不需要改变原来的 Claude Code 或 Codex 工作方式，RTK 会在命令输出层面做压缩。

---

## 支持哪些命令

RTK 支持 Files、Git、GitHub CLI、Test Runners、Build & Lint 等常见开发命令。

| 命令 | 说明 |
| --- | --- |
| `rtk ls .` | Token 优化的目录树 |
| `rtk read file.rs` | 智能读取文件 |
| `rtk read file.rs -l aggressive` | 仅显示签名，去除函数体 |
| `rtk smart file.rs` | 生成 2 行启发式代码摘要 |
| `rtk find "*.rs" .` | 紧凑显示查找结果 |
| `rtk grep "pattern" .` | 分组显示搜索结果 |
| `rtk diff file1 file2` | 精简显示差异 |

它主要用了四类策略：

| 策略 | 作用 |
| --- | --- |
| Smart Filtering | 智能过滤注释、空白、样板代码等噪声 |
| Grouping | 把相似项目归类，比如按目录归文件、按类型归错误 |
| Truncation | 截断冗余内容，保留相关上下文 |
| Deduplication | 合并重复日志行并保留计数 |

核心目标只有一个：让 Agent 看到足够完成任务的信息，而不是看到全部原始输出。

---

## 怎么查看实际节省情况

用过一段时间后，可以通过 `rtk gain` 查看节省效果。

![RTK 节省统计](/assets/images/localized/segmentfault.com-ee49b2dd2d52.png)

一次统计中执行了 6 条命令：

- 原始输出大约会消耗 944 个 token；
- 实际输出只用了 55 个 token；
- 一共节省 889 个 token；
- 节省比例达到 94.2%。

其中 `rtk ls -la` 只执行 1 次，就节省了 841 个 token，平均节省率 99.8%。

这类节省在短任务里看起来只是几百几千 Token，但放到全天 AI 编程里，就会变成非常明显的额度差距。

---

## Claude Code 到底是什么？为什么它特别需要 Token 优化

Claude Code 是一个运行在终端里的 AI 编程 Agent。它不是简单的代码补全，而是能进入项目目录，读取文件、理解代码结构、执行命令、修改文件、跑测试，再根据报错继续修复。

它适合处理：

- 跨文件重构；
- 复杂 Bug 排查；
- 代码库理解；
- 自动化测试修复；
- 长上下文需求实现；
- 多步骤 Agent 编程任务。

问题也正出在这里。Agent 越自主，执行命令越多；命令越多，进入上下文的输出越多；输出越多，Token 成本就越高。所以 RTK 这种“命令输出压缩层”，对 Claude Code 这类工具尤其有价值。

官方订阅一般包括 Pro、Max 等方案，Pro 适合轻中度个人使用，Max 面向更高频和更大额度需求；API 则按量计费，适合接入自己的开发工具链。具体价格和额度会随官方策略变化，正式使用前最好以官方页面为准。

不过说实话，官方订阅对国内用户不太友好——支付、网络和账号稳定性都要折腾。如果只是想更省事地接入 Claude，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

### 1. RTK 会不会影响 Claude Code 正常执行命令？

它的定位是命令输出过滤器，不是替代 Claude Code。它通过 Bash 钩子透明拦截常见命令，再把压缩后的输出交给模型。正常情况下，你仍然按原来的方式使用 AI 编程工具。

### 2. RTK 会不会把关键信息过滤掉？

它会做智能过滤、分组、截断和去重，目标是保留对模型有用的信息。复杂排错时，如果你担心信息不够，可以手动运行更完整的命令输出，再让模型分析。

### 3. 哪些工具最适合配 RTK？

Claude Code、Codex、OpenCode、Cursor、Gemini CLI、Cline、Roo Code 这类会频繁调用 shell 命令的 AI 编程工具，都适合配 RTK。命令输出越多，节省越明显。

### 4. RTK 能替代 Skills 或 MCP 吗？

不能。Skills 和 MCP 解决的是工具能力加载和调用问题，RTK 解决的是命令输出进入上下文前的 Token 压缩问题。它们可以叠加使用。

### 5. 国内用户怎么更方便地使用 Claude Code？

能稳定访问官方并完成支付，可以直接走官方订阅或 API；如果不想折腾支付和网络，国内用户也可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。
