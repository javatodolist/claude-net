/**
 * 官方文档 → 中文教程的映射配置
 *
 * 每个条目定义：
 * - source: 官方文档文件名（不含 .md）
 * - target: 目标文件路径（相对于 docs/claude-code-guide/）
 * - sidebarSection: 侧边栏中所属的章节 text 值
 * - sidebarText: 侧边栏中显示的文本
 * - priority: 翻译优先级（1=最高）
 */

export const DOCS_MAP = [
  // ============ 第1部分：基础入门 ============
  // 第1章已有内容，以下是新增补充
  {
    source: 'overview',
    target: '第1部分：基础入门/第1章：Claude Code 概述/1.5 官方概览',
    sidebarSection: '第1章：Claude Code 概述',
    sidebarText: '1.5 官方概览',
    priority: 1,
  },
  {
    source: 'quickstart',
    target: '第1部分：基础入门/第2章：安装与配置/2.9 快速入门指南',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.9 快速入门指南',
    priority: 1,
  },
  {
    source: 'desktop-quickstart',
    target: '第1部分：基础入门/第2章：安装与配置/2.10 桌面应用快速入门',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.10 桌面应用快速入门',
    priority: 1,
  },
  {
    source: 'setup',
    target: '第1部分：基础入门/第2章：安装与配置/2.11 高级设置',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.11 高级设置',
    priority: 2,
  },
  {
    source: 'how-claude-code-works',
    target: '第1部分：基础入门/第1章：Claude Code 概述/1.6 Claude Code 工作原理',
    sidebarSection: '第1章：Claude Code 概述',
    sidebarText: '1.6 Claude Code 工作原理',
    priority: 1,
  },
  {
    source: 'costs',
    target: '第1部分：基础入门/第3章：基础使用指南/3.7 成本管理',
    sidebarSection: '第3章：基础使用指南',
    sidebarText: '3.7 成本管理',
    priority: 2,
  },

  // ============ 第2部分：命令参考 ============
  {
    source: 'cli-reference',
    target: '第2部分：命令参考/第5章：CLI 命令详解/5.10 CLI 完整参考',
    sidebarSection: '第5章：CLI 命令详解',
    sidebarText: '5.10 CLI 完整参考',
    priority: 2,
  },
  {
    source: 'common-workflows',
    target: '第2部分：命令参考/第8章：命令组合与集成自动化/8.4 常见工作流',
    sidebarSection: '第8章：命令组合与集成自动化',
    sidebarText: '8.4 常见工作流',
    priority: 1,
  },

  // ============ 第3部分：交互模式与工具 ============
  {
    source: 'interactive-mode',
    target: '第3部分：交互模式与工具/第9章：交互模式/9.6 交互模式完整指南',
    sidebarSection: '第9章：交互模式',
    sidebarText: '9.6 交互模式完整指南',
    priority: 2,
  },
  {
    source: 'keybindings',
    target: '第3部分：交互模式与工具/第9章：交互模式/9.7 键盘快捷键参考',
    sidebarSection: '第9章：交互模式',
    sidebarText: '9.7 键盘快捷键参考',
    priority: 3,
  },
  {
    source: 'fast-mode',
    target: '第3部分：交互模式与工具/第9章：交互模式/9.8 快速模式',
    sidebarSection: '第9章：交互模式',
    sidebarText: '9.8 快速模式',
    priority: 3,
  },
  {
    source: 'output-styles',
    target: '第3部分：交互模式与工具/第9章：交互模式/9.9 输出样式配置',
    sidebarSection: '第9章：交互模式',
    sidebarText: '9.9 输出样式配置',
    priority: 3,
  },
  {
    source: 'statusline',
    target: '第3部分：交互模式与工具/第9章：交互模式/9.10 状态行定制',
    sidebarSection: '第9章：交互模式',
    sidebarText: '9.10 状态行定制',
    priority: 3,
  },
  {
    source: 'terminal-config',
    target: '第3部分：交互模式与工具/第9章：交互模式/9.11 终端配置优化',
    sidebarSection: '第9章：交互模式',
    sidebarText: '9.11 终端配置优化',
    priority: 3,
  },
  {
    source: 'checkpointing',
    target: '第3部分：交互模式与工具/第10章：工具调用与集成/10.6 检查点功能',
    sidebarSection: '第10章：工具调用与集成',
    sidebarText: '10.6 检查点功能',
    priority: 3,
  },

  // ============ 第4部分：MCP ============
  {
    source: 'mcp',
    target: '第4部分：模型上下文协议 MCP/第11章：模型上下文协议 MCP 概述/11.5 MCP 官方配置指南',
    sidebarSection: '第11章：MCP 概述',
    sidebarText: '11.5 MCP 官方配置指南',
    priority: 2,
  },

  // ============ 第5部分：技能 Skills ============
  {
    source: 'skills',
    target: '第5部分：技能 Skills/第14章：技能功能概述/14.5 Skills 官方指南',
    sidebarSection: '第14章：技能功能概述',
    sidebarText: '14.5 Skills 官方指南',
    priority: 2,
  },

  // ============ 第6部分：插件系统 ============
  {
    source: 'plugins',
    target: '第6部分：插件系统/第20章：插件系统概述/20.6 创建插件官方指南',
    sidebarSection: '第20章：插件系统概述',
    sidebarText: '20.6 创建插件官方指南',
    priority: 2,
  },
  {
    source: 'plugins-reference',
    target: '第6部分：插件系统/第21章：插件开发基础/21.6 插件 API 参考',
    sidebarSection: '第21章：插件开发基础',
    sidebarText: '21.6 插件 API 参考',
    priority: 3,
  },
  {
    source: 'discover-plugins',
    target: '第6部分：插件系统/第20章：插件系统概述/20.7 发现和安装插件',
    sidebarSection: '第20章：插件系统概述',
    sidebarText: '20.7 发现和安装插件',
    priority: 3,
  },
  {
    source: 'plugin-marketplaces',
    target: '第6部分：插件系统/第20章：插件系统概述/20.8 插件市场',
    sidebarSection: '第20章：插件系统概述',
    sidebarText: '20.8 插件市场',
    priority: 3,
  },

  // ============ 第7部分：编程开发 ============
  {
    source: 'best-practices',
    target: '第7部分：利用 Claude Code 进行编程开发/第23章：代码生成与补全/23.4 最佳实践',
    sidebarSection: '第23章：代码生成与补全',
    sidebarText: '23.4 最佳实践',
    priority: 1,
  },
  {
    source: 'sub-agents',
    target: '第7部分：利用 Claude Code 进行编程开发/第26章：高级Agent功能/26.7 自定义子代理',
    sidebarSection: '第26章：高级Agent功能',
    sidebarText: '26.7 自定义子代理',
    priority: 2,
  },
  {
    source: 'agent-teams',
    target: '第7部分：利用 Claude Code 进行编程开发/第26章：高级Agent功能/26.8 Agent 团队编排',
    sidebarSection: '第26章：高级Agent功能',
    sidebarText: '26.8 Agent 团队编排',
    priority: 2,
  },
  {
    source: 'hooks-guide',
    target: '第7部分：利用 Claude Code 进行编程开发/第25章：智能开发工作流/25.7 Hooks 钩子使用指南',
    sidebarSection: '第25章：智能开发工作流',
    sidebarText: '25.7 Hooks 钩子使用指南',
    priority: 2,
  },
  {
    source: 'hooks',
    target: '第7部分：利用 Claude Code 进行编程开发/第25章：智能开发工作流/25.8 Hooks 钩子参考',
    sidebarSection: '第25章：智能开发工作流',
    sidebarText: '25.8 Hooks 钩子参考',
    priority: 3,
  },
  {
    source: 'features-overview',
    target: '第7部分：利用 Claude Code 进行编程开发/第23章：代码生成与补全/23.5 扩展功能概览',
    sidebarSection: '第23章：代码生成与补全',
    sidebarText: '23.5 扩展功能概览',
    priority: 2,
  },
  {
    source: 'memory',
    target: '第3部分：交互模式与工具/第10章：工具调用与集成/10.7 内存管理',
    sidebarSection: '第10章：工具调用与集成',
    sidebarText: '10.7 内存管理',
    priority: 2,
  },
  {
    source: 'permissions',
    target: '第3部分：交互模式与工具/第10章：工具调用与集成/10.8 权限配置',
    sidebarSection: '第10章：工具调用与集成',
    sidebarText: '10.8 权限配置',
    priority: 2,
  },
  {
    source: 'settings',
    target: '第1部分：基础入门/第2章：安装与配置/2.12 设置详解',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.12 设置详解',
    priority: 2,
  },
  {
    source: 'model-config',
    target: '第1部分：基础入门/第2章：安装与配置/2.13 模型配置',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.13 模型配置',
    priority: 2,
  },

  // ============ CI/CD 与自动化 ============
  {
    source: 'github-actions',
    target: '第2部分：命令参考/第8章：命令组合与集成自动化/8.5 GitHub Actions 集成',
    sidebarSection: '第8章：命令组合与集成自动化',
    sidebarText: '8.5 GitHub Actions 集成',
    priority: 2,
  },
  {
    source: 'gitlab-ci-cd',
    target: '第2部分：命令参考/第8章：命令组合与集成自动化/8.6 GitLab CI/CD 集成',
    sidebarSection: '第8章：命令组合与集成自动化',
    sidebarText: '8.6 GitLab CI/CD 集成',
    priority: 3,
  },
  {
    source: 'headless',
    target: '第2部分：命令参考/第8章：命令组合与集成自动化/8.7 Headless 无头模式',
    sidebarSection: '第8章：命令组合与集成自动化',
    sidebarText: '8.7 Headless 无头模式',
    priority: 2,
  },
  {
    source: 'remote-control',
    target: '第2部分：命令参考/第8章：命令组合与集成自动化/8.8 远程控制',
    sidebarSection: '第8章：命令组合与集成自动化',
    sidebarText: '8.8 远程控制',
    priority: 3,
  },

  // ============ 使用环境（IDE 集成） ============
  {
    source: 'vs-code',
    target: '第1部分：基础入门/第2章：安装与配置/2.14 VS Code 集成指南',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.14 VS Code 集成指南',
    priority: 2,
  },
  {
    source: 'jetbrains',
    target: '第1部分：基础入门/第2章：安装与配置/2.15 JetBrains IDE 集成',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.15 JetBrains IDE 集成',
    priority: 2,
  },
  {
    source: 'desktop',
    target: '第1部分：基础入门/第2章：安装与配置/2.16 桌面应用使用指南',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.16 桌面应用使用指南',
    priority: 2,
  },
  {
    source: 'chrome',
    target: '第1部分：基础入门/第2章：安装与配置/2.17 Chrome 浏览器集成',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.17 Chrome 浏览器集成',
    priority: 3,
  },
  {
    source: 'claude-code-on-the-web',
    target: '第1部分：基础入门/第2章：安装与配置/2.18 Web 端使用',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.18 Web 端使用',
    priority: 3,
  },
  {
    source: 'slack',
    target: '第1部分：基础入门/第2章：安装与配置/2.19 Slack 集成',
    sidebarSection: '第2章：安装与配置',
    sidebarText: '2.19 Slack 集成',
    priority: 3,
  },

  // ============ 第9部分：企业级部署 ============
  {
    source: 'third-party-integrations',
    target: '第9部分：企业级Claude Code部署/第30章：部署架构/30.5 第三方集成概览',
    sidebarSection: '第30章：部署架构',
    sidebarText: '30.5 第三方集成概览',
    priority: 2,
  },
  {
    source: 'amazon-bedrock',
    target: '第9部分：企业级Claude Code部署/第31章：云提供商集成/31.3 Amazon Bedrock 官方指南',
    sidebarSection: '第31章：云提供商集成',
    sidebarText: '31.3 Amazon Bedrock 官方指南',
    priority: 2,
  },
  {
    source: 'google-vertex-ai',
    target: '第9部分：企业级Claude Code部署/第31章：云提供商集成/31.4 Google Vertex AI 官方指南',
    sidebarSection: '第31章：云提供商集成',
    sidebarText: '31.4 Google Vertex AI 官方指南',
    priority: 2,
  },
  {
    source: 'microsoft-foundry',
    target: '第9部分：企业级Claude Code部署/第31章：云提供商集成/31.5 Microsoft Foundry 集成',
    sidebarSection: '第31章：云提供商集成',
    sidebarText: '31.5 Microsoft Foundry 集成',
    priority: 3,
  },
  {
    source: 'llm-gateway',
    target: '第9部分：企业级Claude Code部署/第33章：LLM网关部署/33.3 LLM 网关官方配置',
    sidebarSection: '第33章：LLM网关部署',
    sidebarText: '33.3 LLM 网关官方配置',
    priority: 2,
  },
  {
    source: 'authentication',
    target: '第9部分：企业级Claude Code部署/第32章：企业网络与安全/32.3 身份验证配置',
    sidebarSection: '第32章：企业网络与安全',
    sidebarText: '32.3 身份验证配置',
    priority: 2,
  },
  {
    source: 'server-managed-settings',
    target: '第9部分：企业级Claude Code部署/第34章：企业级功能配置/34.4 服务器管理设置',
    sidebarSection: '第34章：企业级功能配置',
    sidebarText: '34.4 服务器管理设置',
    priority: 3,
  },
  {
    source: 'network-config',
    target: '第9部分：企业级Claude Code部署/第32章：企业网络与安全/32.4 网络配置详解',
    sidebarSection: '第32章：企业网络与安全',
    sidebarText: '32.4 网络配置详解',
    priority: 3,
  },
  {
    source: 'devcontainer',
    target: '第9部分：企业级Claude Code部署/第34章：企业级功能配置/34.5 开发容器官方指南',
    sidebarSection: '第34章：企业级功能配置',
    sidebarText: '34.5 开发容器官方指南',
    priority: 3,
  },
  {
    source: 'sandboxing',
    target: '第9部分：企业级Claude Code部署/第34章：企业级功能配置/34.6 沙箱隔离官方指南',
    sidebarSection: '第34章：企业级功能配置',
    sidebarText: '34.6 沙箱隔离官方指南',
    priority: 3,
  },
  {
    source: 'analytics',
    target: '第9部分：企业级Claude Code部署/第34章：企业级功能配置/34.7 使用分析',
    sidebarSection: '第34章：企业级功能配置',
    sidebarText: '34.7 使用分析',
    priority: 3,
  },
  {
    source: 'monitoring-usage',
    target: '第9部分：企业级Claude Code部署/第34章：企业级功能配置/34.8 使用监控',
    sidebarSection: '第34章：企业级功能配置',
    sidebarText: '34.8 使用监控',
    priority: 3,
  },
  {
    source: 'data-usage',
    target: '第9部分：企业级Claude Code部署/第34章：企业级功能配置/34.9 数据使用策略',
    sidebarSection: '第34章：企业级功能配置',
    sidebarText: '34.9 数据使用策略',
    priority: 3,
  },
  {
    source: 'zero-data-retention',
    target: '第9部分：企业级Claude Code部署/第34章：企业级功能配置/34.10 零数据保留',
    sidebarSection: '第34章：企业级功能配置',
    sidebarText: '34.10 零数据保留',
    priority: 3,
  },

  // ============ 安全与合规 ============
  {
    source: 'security',
    target: '第9部分：企业级Claude Code部署/第32章：企业网络与安全/32.5 安全指南',
    sidebarSection: '第32章：企业网络与安全',
    sidebarText: '32.5 安全指南',
    priority: 2,
  },
  {
    source: 'legal-and-compliance',
    target: '第9部分：企业级Claude Code部署/第32章：企业网络与安全/32.6 法律与合规',
    sidebarSection: '第32章：企业网络与安全',
    sidebarText: '32.6 法律与合规',
    priority: 3,
  },

  // ============ 参考 ============
  {
    source: 'troubleshooting',
    target: '第1部分：基础入门/第3章：基础使用指南/3.8 故障排除',
    sidebarSection: '第3章：基础使用指南',
    sidebarText: '3.8 故障排除',
    priority: 2,
  },
  {
    source: 'changelog',
    target: '第1部分：基础入门/第1章：Claude Code 概述/1.7 更新日志',
    sidebarSection: '第1章：Claude Code 概述',
    sidebarText: '1.7 更新日志',
    priority: 3,
  },
]

/**
 * 按优先级排序返回
 */
export function getDocsByPriority() {
  return [...DOCS_MAP].sort((a, b) => a.priority - b.priority)
}

/**
 * 获取总数
 */
export function getTotalCount() {
  return DOCS_MAP.length
}
