---
title: Claude Code Channels：把本地 Agent 变成远程同事
description: Claude Code Channels：把本地 Agent 变成远程同事。本文属于Claude 行业趋势与 Agent 场景专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 行业趋势与 Agent 场景
tag:
  - Claude
  - Claude Code
  - AI编程
---

# Claude Code Channels：把本地 Agent 变成远程同事

![Claude Code Channels](/assets/images/localized/upload.chinaz.com-8deccf15ed7f.png)

## 写在前面
你应该也遇到过这种场景：本地在跑测试、构建、迁移脚本，进度卡在终端里，你人却已经离开电脑。最难受的不是任务慢，而是你必须“守着它”。

Anthropic 这次放出的 Channels（研究预览）把这个痛点戳得很准：Claude Code 继续在本地会话里工作，你在手机 Telegram 上发一句话，就能问进度、下指令、拿结果。

问题也随之变成了三个：它到底是“远程通知器”，还是“真能协作”的异步 Agent？配置复杂吗？安全边界清不清晰？这篇就把两篇资料里的关键细节合在一起，讲透。

---

## 别再把 AI 编程当“前台聊天”：异步执行正在成为新分水岭
这次变化的重点，不是“手机也能聊天”，而是 Claude Code 的工作形态在变。

过去很多人把 AI 编程停留在“我问一句，它答一句”；现在 Channels 把外部消息系统接进正在运行的 Claude Code 会话，让它从“交互式助手”变成“可远程寻址的执行体”。

具体看两个信号就够了：

1. **交互从同步转异步**：你不用盯着终端，任务在后台跑，消息端随时收状态。
2. **协作从单端转多端**：本地 CLI 负责执行，Telegram/Discord 负责控制与反馈。

这意味着，效率差距不再只来自“会不会写 Prompt”，而来自“你能不能把任务流拆成异步协作”。同样是写代码，有人还在等终端返回，有人已经在路上推进下一步决策。

---

## Claude Code Channels + Telegram 插件，到底能做什么

### 1) 工作原理：MCP 把消息平台接进本地会话
Channels 基于 MCP 插件机制，把 Telegram、Discord 这类外部平台接入正在运行的 Claude Code session，实现双向实时通信。

在 Telegram 官方插件里，核心是三个 MCP 工具：

| 工具 | 作用 |
|---|---|
| `reply` | 给指定聊天发送消息，可附带文件、可按消息 ID 线程回复 |
| `react` | 给消息加表情反应（受 Telegram 固定白名单约束） |
| `edit_message` | 编辑机器人之前发出的消息，适合“处理中 -&gt; 已完成”进度更新 |

对应体验上，你发给 Bot 的内容会被转发到当前 Claude Code 会话，Claude 的回复再被回传到 Telegram。输入、执行、反馈这条链路是完整闭环。

### 2) 前置条件：先满足这三个依赖

| 条件 | 说明 |
|---|---|
| Bun | Telegram MCP 服务端依赖 Bun 运行时 |
| Telegram 账号 | 用于创建和管理 Bot |
| Claude Code 活跃会话 | 需从会话内安装并启动带 channels 参数 |

另外，Channels 当前是研究预览能力，Team/Enterprise 还需要管理员在后台开启 `channelsEnabled`。

### 3) 六步配置：从创建 Bot 到安全上线

#### Step 1：在 BotFather 创建机器人
和 `@BotFather` 对话，执行：

```bash
/newbot
```

拿到 Bot Token（形如 `123456789:AA...`），完整保存。

#### Step 2：在 Claude Code 会话内安装插件

```bash
/plugin install telegram@claude-plugins-official
/reload-plugins
```

若 `/telegram:configure` 不能自动补全，退出重进一次会话。

#### Step 3：配置 Token

```bash
/telegram:configure &lt;YOUR_BOT_TOKEN&gt;
```

该命令会把 `TELEGRAM_BOT_TOKEN` 写入：

```bash
~/.claude/channels/telegram/.env
```

#### Step 4：带 channels 参数重启 Claude Code

```bash
claude --channels plugin:telegram@claude-plugins-official
```

不带这个参数，插件不会接入当前会话。

#### Step 5：完成配对
先私聊 Bot，拿到 6 位配对码，再在 Claude Code 中执行：

```bash
/telegram:access pair &lt;code&gt;
```

#### Step 6：切到白名单策略
配对只是引导阶段，正式使用建议立刻锁权限：

```bash
/telegram:access policy allowlist
```

### 4) 权限策略怎么选：pairing / allowlist / open

| 策略 | 行为 | 建议 |
|---|---|---|
| `pairing` | 用户通过 6 位码完成配对（默认） | 仅用于初始接入 |
| `allowlist` | 仅允许预授权用户 ID 访问 | 生产使用首选 |
| `open` | 任何人可与 Bot 交互 | 不建议使用 |

如果你要多人协作，还要配合 `access.json` 做更细权限控制。

### 5) 文件与消息能力边界
两篇资料合起来看，边界很清楚：

- Telegram 侧单文件上限 50MB；
- Discord 侧支持最多 10 个文件、每个 25MB；
- Telegram 机器人看不到历史消息，也不能检索历史；
- 它是典型 push 模式：只处理“新到达”的消息。

这几点直接影响你的工作流设计：关键上下文要在当前消息里补齐，不要假设 Bot 能回头翻聊天记录。

### 6) 运行时注意事项（容易踩坑）
- Claude Code 会话必须持续运行（本地常驻、云主机或后台进程都行）；
- 如果会话卡在权限确认，流程会暂停；
- `--dangerously-skip-permissions` 仅建议在完全可信环境使用；
- 插件处于研究预览期，接口和行为后续仍可能调整。

### 7) Telegram vs Discord：该先上哪个

| 维度 | Telegram 插件 | Discord 插件 |
|---|---|---|
| 接入复杂度 | 更简单，直接私聊 Bot | 步骤更多，通常要处理服务器邀请链路 |
| 文件约束 | 单文件 50MB | 最多 10 个文件，每个 25MB |
| 历史消息能力 | 无历史检索 | 同样受限 |
| 适合场景 | 个人异步开发、移动端控制 | 团队频道协作 |

如果你是单人开发者，Telegram 通常更快起步。

---

## Claude Code 到底是什么，为什么 Channels 能把它拉开一档
很多人还把 Claude Code 理解成“终端里问答式助手”，其实定位已经不是这个层级了。

它本质是一个**自主编程 Agent**：你给目标，它会读写项目文件、执行命令、跨文件修改、跑测试并迭代修复。Channels 只是把这个执行体的控制面从“键盘前”扩展到“移动端和外部平台”。

官方使用上，通常是订阅 Claude Pro / Max 后以账号登录使用 Claude Code（而不是 API Key 直连）。常见公开订阅档位是：Pro（$20/月）、Max 5x（$100/月）、Max 20x（$200/月）。

不过说实话，官方订阅对国内用户不太友好——需要海外信用卡，网络环境也得折腾。如果嫌麻烦想找个更省事的渠道，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

### Q1：Telegram 插件能替代本地终端吗？
A：不能。它是远程控制和异步沟通层，不是执行环境替代。真正执行仍在你启动的 Claude Code 会话里。

### Q2：为什么我配好后，Telegram 发消息没反应？
A：优先检查三件事：是否用了 `--channels` 参数启动；会话是否仍在运行；是否完成了 `/telegram:access pair` 且策略已正确设置。

### Q3：机器人为什么看不到我之前的聊天记录？
A：这是 Telegram Bot API 的限制。插件只接收新消息，不能回溯历史，所以关键上下文要在当前轮次补充。

### Q4：多人共用一个 Bot 是否可行？
A：可以，但要配置 `access.json` 和访问策略，至少切到 `allowlist`，避免陌生账号直接触达你的开发会话。

### Q5：国内开发者想稳定用上这套能力，怎么省事一点？
A：关键是减少账号和网络层面的折腾；国内用户可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。
