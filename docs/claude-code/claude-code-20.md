---
title: 用了半年 Claude Code 你可能只用了它 20% 的功能
description: 用了半年 Claude Code 你可能只用了它 20% 的功能。本文属于Claude Code 国内安装与工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-09
category: Claude Code 国内安装与工作流
tag:
  - Claude
  - Claude Code
  - AI编程
---

# 用了半年 Claude Code 你可能只用了它 20% 的功能

## 写在前面
很多开发者对 Claude Code 的使用方式，基本停留在“提需求 → 等代码 → 手动收尾”。

这当然有价值，但如果你只这么用，确实只吃到了很小一部分能力。Claude Code 真正拉开差距的，不是“回答得更聪明”，而是它有一整套可以长期运行、自动协作、可回滚可调度的工程机制。

这篇就按实战顺序，把最容易被忽视、但一旦用上就很难回去的 10 组能力一次讲透。

---

## 先别急着写代码：你和别人的差距，可能在工作流
当你还在把 Claude Code 当“终端问答机器人”时，另一批团队已经在这样用：

- 用记忆系统让上下文长期稳定
- 用 hooks 把检查和守卫自动化
- 用 `/loop`、`/schedule` 做持续任务
- 用 `/batch` + worktree 并行处理重构
- 用 `/compact` 管理长会话质量

这不是“会不会写 prompt”的区别，而是有没有把它接入真实工程流水线。

---

## 1) CLAUDE.md + Auto Memory：把“重复解释”变成一次性投入
Claude Code 的记忆机制是双轨：

- **CLAUDE.md**：你定义的项目规则（架构、规范、命令）
- **Auto Memory**：Claude 在交互中自动沉淀的偏好与模式

建议先跑一次：

```bash
/init
```

它会基于当前仓库生成初版 CLAUDE.md，再由你补充关键规则。

一个常见的 CLAUDE.md 结构：

```md
## 技术栈
- 前端：Next.js 14 + TypeScript
- 后端：Node.js + Express
- 数据库：PostgreSQL + Prisma

## 常用命令
- `npm run dev`
- `npm test`

## 代码规范
- 2 空格缩进
- API handler 放在 src/api/handlers/
- 提交前先跑测试
```

Auto Memory（v2.1.59+）会写入：

`~/.claude/projects/&lt;project&gt;/memory/MEMORY.md`

并在会话启动时自动加载前 200 行。查看和编辑可以直接用：

```bash
/memory
```

实战建议：CLAUDE.md 主文件尽量控制在 200 行以内，拆分规则用 `@路径` 引入，减少噪音。

---

## 2) Hooks：让 Claude Code 从“助手”变成“流水线节点”
Hooks 是很多人错过的王牌能力。你可以在生命周期节点自动触发命令或检查。

典型配置（文件改动后自动 lint）：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint"
          }
        ]
      }
    ]
  }
}
```

常用事件：

- `PreToolUse`：工具前（拦截危险操作）
- `PostToolUse`：工具后（跑 lint/test）
- `SessionStart`：会话开始（注入上下文）
- `Stop`：响应结束（发通知）
- `PreCompact`：压缩前（做快照）

比如拦截危险命令：

```bash
#!/bin/bash
COMMAND=$(jq -r '.tool_input.command')

if echo "$COMMAND" | grep -q 'rm -rf'; then
  echo "危险命令已拦截" &gt;&2
  exit 2
fi

exit 0
```

再在 settings.json 注册到 `PreToolUse` + `Bash` matcher 即可。

---

## 3) Checkpoints + `/rewind`：改崩了不用慌
Claude Code 在每次编辑前会做快照。回滚直接用：

```bash
/rewind
```

别名：

```bash
/checkpoint
```

它支持恢复代码、恢复对话或两者同时恢复。

要点：这个机制主要覆盖 Claude 的 Edit/Write 改动；你手动 Bash 执行的 `rm/mv/cp` 不在同一套回滚保护里。复杂改造前，先确认风险边界。

---

## 4) `/loop` + `/schedule`：让任务持续跑起来
`/loop` 适合会话内循环任务：

```bash
/loop 5m 检查 PR 是否有新评论并总结
```

`/schedule` 适合云端定时任务（异步、不依赖你一直在线）：

```bash
/schedule
```

你可以把例行工作（日报、巡检、文档同步）从“临时记得做”改成“系统自动做”。

---

## 5) `/remote-control`（`/rc`）：离开工位也能继续推进
开启后你可以在网页端或手机端接管当前终端会话：

```bash
/remote-control
```

或：

```bash
/rc
```

这对长任务很关键：你不需要守着电脑，也能审批权限、看进度、补指令。

---

## 6) Plan Mode：先出方案，再动代码
很多人忽略这个模式，结果是“改得很快，返工更快”。

Plan Mode 会先只读分析、产出计划，等你确认后再执行。可用：

```bash
claude --permission-mode plan
```

或在会话里：

```bash
/plan 把认证系统迁移到 OAuth2，列出详细计划
```

它特别适合跨模块改造、陌生仓库维护和高风险重构。

---

## 7) Git Worktrees + `/batch`：并行才是倍速器
你可以手动建 worktree 并行开多个会话：

```bash
git worktree add ../feature-auth feature/auth
cd ../feature-auth && claude
```

也可以直接用：

```bash
/batch 把 src/ 目录的所有 API 调用从 axios 迁移到 fetch
```

`/batch` 会拆分子任务、并行执行、独立验证，特别适合大规模迁移。

---

## 8) Skills：把高频动作变成可复用能力
在 `.claude/skills/` 下定义 `SKILL.md`，就能让 Claude 自动按场景加载，或手动用斜杠命令触发。

典型用途：

- 安全审查模板
- PR 规范化流程
- 文档生成流水线
- 特定语言/框架迁移脚本

记住这个边界：

- **CLAUDE.md**：常驻背景规则
- **Skills**：按需激活的专项能力

---

## 9) `/btw`：临时提问，不污染主上下文
执行主任务时临时查一个点，用：

```bash
/btw 这个项目用的是 CommonJS 还是 ESM？
```

回答会返回，但不会把这条支线问题塞进主历史，对长会话很友好。

---

## 10) `/context` + `/compact`：把长会话质量稳住
先看上下文占用：

```bash
/context
```

再按目标压缩：

```bash
/compact 重点保留 API 改动相关内容
```

更稳妥的做法是在 CLAUDE.md 里写 `Compact Instructions`，明确哪些信息压缩时必须保留（未完成任务、关键决策、改动文件等）。

---

## Claude Code 到底是什么：为什么它已经不是“终端聊天工具”
如果你把这些能力串起来看，会发现 Claude Code 的定位已经非常清晰：它不是只会“生成答案”，而是在逐步成为一个可调度、可回滚、可扩展、可并行的工程 Agent。

你可以让它读项目、改代码、跑命令、接管例行任务、执行计划化流程，再通过远程控制把进度接回手机端。

官方订阅常见档位一般是 Pro（约 20 美元/月）、Max 5x（约 100 美元/月）、Max 20x（约 200 美元/月）。不过说实话，官方订阅对国内用户不太友好——需要海外信用卡，网络环境也得折腾。如果嫌麻烦想找个更省事的渠道，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

### Q1：这些功能必须一次性全开吗？
A：不用。最推荐先从 CLAUDE.md + Auto Memory 开始，再加一个 hooks 自动 lint，立刻就能感受到收益。

### Q2：Hooks 会不会把流程搞得太重？
A：关键是只挂“高价值、低成本”的钩子，比如改后 lint、提交前测试、危险命令拦截，不要一上来堆太多动作。

### Q3：`/loop` 和 `/schedule` 怎么选？
A：会话内持续观察用 `/loop`；希望完全异步、按时间触发的后台任务用 `/schedule`。

### Q4：Plan Mode 会拖慢效率吗？
A：对小改动没必要，但对跨模块、影响面不清晰的任务，先计划几乎总比返工便宜。

### Q5：国内开发者想低门槛用 Claude Code，有没有更省事的方式？
A：在合规前提下，国内用户可以通过 [Code80](https://code.ai80.vip/home) 这类渠道更方便接入。
