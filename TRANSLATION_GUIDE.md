# 官方文档翻译指南

## 使用方法

每次新开一个 Claude Code 会话，粘贴下方的**翻译提示词模板**，替换 `{{文件名}}` 为当前要翻译的官方文档文件名。完成后在本文件标记 ✅，然后开新会话处理下一个。

> 为什么要开新会话？避免上下文过长导致质量下降，每篇文章独立处理效果最好。

---

## 翻译提示词模板

```
请帮我将官方文档翻译为中文教程文章。

## 源文件
docs/claude-code-official/{{文件名}}.md

## 任务要求

### 1. 阅读源文件
先完整阅读 docs/claude-code-official/{{文件名}}.md 的内容。

### 2. 学习写作风格
阅读以下文件，理解我站点的教程写作风格：
- docs/claude-code-guide/第1部分：基础入门/第1章：Claude Code 概述/1.1 Claude Code 是什么.md
- docs/claude-code-guide/第4部分：模型上下文协议 MCP/第12章：MCP 服务器配置与管理/12.1 添加 MCP 服务器.md

### 3. 确定放置位置
参考以下映射关系，决定文章放在 docs/claude-code-guide/ 的哪个目录下：

**现有目录结构（按主题分）：**
- 第1部分：基础入门 → overview, quickstart, desktop-quickstart, setup, how-claude-code-works, costs
- 第2部分：命令参考 → cli-reference, common-workflows
- 第3部分：交互模式与工具 → interactive-mode, keybindings, fast-mode, output-styles, statusline, terminal-config, checkpointing
- 第4部分：模型上下文协议 MCP → mcp
- 第5部分：技能 Skills → skills
- 第6部分：插件系统 → plugins, plugins-reference, discover-plugins, plugin-marketplaces
- 第7部分：利用 Claude Code 进行编程开发 → best-practices, sub-agents, agent-teams
- 第8部分：Claude Code 原理与技术 → （原理性内容）
- 第9部分：企业级Claude Code部署 → amazon-bedrock, google-vertex-ai, microsoft-foundry, llm-gateway, authentication, server-managed-settings, network-config, devcontainer, sandboxing, analytics, monitoring-usage, data-usage, zero-data-retention, third-party-integrations

**如果内容不适合放入现有章节，可以：**
- 在合适的"部分"下新建一个章节目录
- 或追加到最贴近的章节中作为新小节

### 4. 写作规范
- 翻译为中文，但不是逐句死板翻译，要像写教程一样自然
- 标题格式：`# XX.X 文章标题`，编号承接所在章节
- 小节格式：`## XX.X.X 小节标题`
- 代码块保留英文，但注释翻译为中文
- 专业术语首次出现时保留英文原文，如"内存管理（Memory）"
- 用 `>` 引用块强调关键提示
- 适当使用表格整理对比信息
- 不用 emoji 做列表标记
- 不要"在当今社会"、"众所周知"等套话开头
- 开篇直切主题，用一两句话说清楚这是什么

### 5. 更新侧边栏
在 docs/.vitepress/sidebar.ts 的 '/claude-code-guide/' 配置中，找到对应章节的 items 数组，添加新文章的配置项。格式参考现有条目。

### 6. 输出清单
完成后列出：
- 新建的文件路径
- sidebar.ts 中添加的配置行
- 如果新建了目录，列出新目录路径
```

---

## 翻译进度追踪

### 入门与概览
| 序号 | 官方文件名 | 中文标题 | 状态 |
|------|-----------|---------|------|
| 1 | overview.md | 概览 | ⬜ |
| 2 | quickstart.md | 快速入门 | ⬜ |
| 3 | desktop-quickstart.md | 桌面应用入门 | ⬜ |
| 4 | setup.md | 高级设置 | ⬜ |
| 5 | how-claude-code-works.md | Claude Code 如何工作 | ⬜ |
| 6 | best-practices.md | 最佳实践 | ⬜ |
| 7 | common-workflows.md | 常见工作流 | ⬜ |
| 8 | costs.md | 管理成本 | ⬜ |

### 使用环境
| 序号 | 官方文件名 | 中文标题 | 状态 |
|------|-----------|---------|------|
| 9 | interactive-mode.md | 交互模式 | ⬜ |
| 10 | vs-code.md | VS Code 集成 | ⬜ |
| 11 | jetbrains.md | JetBrains IDEs | ⬜ |
| 12 | desktop.md | Desktop 桌面应用 | ⬜ |
| 13 | chrome.md | Chrome 浏览器 | ⬜ |
| 14 | claude-code-on-the-web.md | Web 端使用 | ⬜ |
| 15 | slack.md | Slack 集成 | ⬜ |
| 16 | terminal-config.md | 终端设置优化 | ⬜ |

### 核心功能
| 序号 | 官方文件名 | 中文标题 | 状态 |
|------|-----------|---------|------|
| 17 | cli-reference.md | CLI 参考 | ⬜ |
| 18 | memory.md | 内存管理 | ⬜ |
| 19 | permissions.md | 权限配置 | ⬜ |
| 20 | settings.md | 设置 | ⬜ |
| 21 | keybindings.md | 键盘快捷方式 | ⬜ |
| 22 | output-styles.md | 输出样式 | ⬜ |
| 23 | statusline.md | 状态行定制 | ⬜ |
| 24 | fast-mode.md | 快速模式 | ⬜ |
| 25 | checkpointing.md | 检查点 | ⬜ |
| 26 | model-config.md | 模型配置 | ⬜ |

### 扩展功能
| 序号 | 官方文件名 | 中文标题 | 状态 |
|------|-----------|---------|------|
| 27 | features-overview.md | 扩展功能概览 | ⬜ |
| 28 | mcp.md | MCP 连接工具 | ⬜ |
| 29 | skills.md | Skills 技能 | ⬜ |
| 30 | sub-agents.md | 自定义子代理 | ⬜ |
| 31 | agent-teams.md | Agent 团队编排 | ⬜ |
| 32 | plugins.md | 创建插件 | ⬜ |
| 33 | plugins-reference.md | 插件参考 | ⬜ |
| 34 | discover-plugins.md | 发现和安装插件 | ⬜ |
| 35 | plugin-marketplaces.md | 插件市场 | ⬜ |
| 36 | hooks-guide.md | Hooks 钩子指南 | ⬜ |
| 37 | hooks.md | Hooks 钩子参考 | ⬜ |

### CI/CD 与自动化
| 序号 | 官方文件名 | 中文标题 | 状态 |
|------|-----------|---------|------|
| 38 | github-actions.md | GitHub Actions | ⬜ |
| 39 | gitlab-ci-cd.md | GitLab CI/CD | ⬜ |
| 40 | headless.md | Headless 编程运行 | ⬜ |
| 41 | remote-control.md | 远程控制 | ⬜ |

### 企业部署
| 序号 | 官方文件名 | 中文标题 | 状态 |
|------|-----------|---------|------|
| 42 | third-party-integrations.md | 企业部署概览 | ⬜ |
| 43 | amazon-bedrock.md | Amazon Bedrock | ⬜ |
| 44 | google-vertex-ai.md | Google Vertex AI | ⬜ |
| 45 | microsoft-foundry.md | Microsoft Foundry | ⬜ |
| 46 | llm-gateway.md | LLM 网关配置 | ⬜ |
| 47 | authentication.md | 身份验证 | ⬜ |
| 48 | server-managed-settings.md | 服务器管理设置 | ⬜ |
| 49 | network-config.md | 企业网络配置 | ⬜ |
| 50 | devcontainer.md | 开发容器 | ⬜ |
| 51 | sandboxing.md | 沙箱 | ⬜ |
| 52 | analytics.md | 使用分析 | ⬜ |
| 53 | monitoring-usage.md | 监控 | ⬜ |
| 54 | data-usage.md | 数据使用 | ⬜ |
| 55 | zero-data-retention.md | 零数据保留 | ⬜ |

### 安全与合规
| 序号 | 官方文件名 | 中文标题 | 状态 |
|------|-----------|---------|------|
| 56 | security.md | 安全 | ⬜ |
| 57 | legal-and-compliance.md | 法律和合规 | ⬜ |

### 参考与故障排除
| 序号 | 官方文件名 | 中文标题 | 状态 |
|------|-----------|---------|------|
| 58 | troubleshooting.md | 故障排除 | ⬜ |
| 59 | changelog.md | 变更日志 | ⬜ |

---

## 工作流程

1. **打开本文件**，找到下一个 ⬜ 状态的文档
2. **新开 Claude Code 会话**
3. **粘贴模板**，替换 `{{文件名}}` 为对应文件名（不含 .md 后缀）
4. **等待完成**，检查输出文件和侧边栏更新
5. **回到本文件**，将该行状态改为 ✅
6. **重复** 直到全部完成
