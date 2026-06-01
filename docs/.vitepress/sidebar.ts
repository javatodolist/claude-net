import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: 'Claude 入门与国内使用',
      items: [
        { text: '专题首页', link: '/guide/' },
        { text: 'Claude 国内使用完全手册', link: '/guide/claude-domestic-complete-guide' },
        { text: 'Claude 国内注册全流程', link: '/guide/claude-register-pro-guide' },
        { text: '不翻墙怎么用 Claude', link: '/guide/claude-domestic-three-ways' },
        { text: '国内使用 Claude 的几种路线', link: '/guide/claude-domestic-routes' },
        { text: 'Claude 国内怎么用最省事', link: '/guide/claude-domestic-easiest-way' },
      ],
    },
  ],
  '/claude-code/': [
    {
      text: 'Claude Code 国内安装与工作流',
      items: [
        { text: '专题首页', link: '/claude-code/' },
        { text: '本地安装到第一次对话', link: '/claude-code/claude-code-local-install' },
        { text: '国内安装使用完整教程', link: '/claude-code/claude-code-domestic-install' },
        { text: '国内使用方案技术拆解', link: '/claude-code/claude-code-domestic-solutions' },
        { text: '新手上手指南', link: '/claude-code/claude-code-beginner-guide' },
        { text: '16 个高阶技巧', link: '/claude-code/claude-code-advanced-tips' },
        { text: 'VS Code 使用教程', link: '/claude-code/claude-code-vscode-guide' },
        { text: 'Windows 安装教程', link: '/claude-code/claude-code-windows-install' },
        { text: '常见报错处理', link: '/claude-code/claude-code-errors' },
      ],
    },
  ],
  '/api/': [
    {
      text: 'Claude API 接入与开发',
      items: [
        { text: '专题首页', link: '/api/' },
        { text: 'API 接入开发者指南', link: '/api/claude-api-developer-guide' },
        { text: '自动生成 API 文档', link: '/api/claude-api-docs' },
        { text: '接入飞书与企业微信', link: '/api/claude-feishu-wecom' },
        { text: 'DevOps 实战', link: '/api/claude-devops' },
      ],
    },
  ],
  '/billing/': [
    {
      text: 'Claude 订阅、付款与账号风控',
      items: [
        { text: '专题首页', link: '/billing/' },
        { text: '封号和付款全攻略', link: '/billing/claude-ban-payment-guide' },
        { text: '套餐怎么选', link: '/billing/claude-plan-choose' },
        { text: '四档套餐解析', link: '/billing/claude-pricing-analysis' },
        { text: '账号封禁避坑', link: '/billing/claude-account-ban-avoid' },
        { text: '封号生存法则', link: '/billing/claude-ban-survival' },
        { text: 'Claude Pro 付款对比', link: '/billing/claude-pro-payment-comparison' },
      ],
    },
  ],
  '/prompt-engineering/': [
    {
      text: 'Claude 提示词与 AI 编程工作流',
      items: [
        { text: '专题首页', link: '/prompt-engineering/' },
        { text: 'Prompt 工程完全指南', link: '/prompt-engineering/claude-prompt-engineering' },
        { text: 'System Prompt 设计', link: '/prompt-engineering/claude-system-prompt' },
        { text: 'TDD 实战', link: '/prompt-engineering/claude-tdd' },
        { text: '代码 Review 实战', link: '/prompt-engineering/claude-code-review' },
        { text: '前端开发实战', link: '/prompt-engineering/claude-frontend' },
        { text: '后端开发实战', link: '/prompt-engineering/claude-backend' },
      ],
    },
  ],
  '/comparisons/': [
    {
      text: 'Claude 对比评测',
      items: [
        { text: '专题首页', link: '/comparisons/' },
        { text: 'Claude vs GPT-4o', link: '/comparisons/claude-vs-gpt4o' },
        { text: 'Claude vs GitHub Copilot', link: '/comparisons/claude-vs-copilot' },
        { text: 'Claude Code vs Codex', link: '/comparisons/claude-code-vs-codex-workflow' },
        { text: '终端 AI Agent 对比', link: '/comparisons/terminal-ai-agent-comparison' },
        { text: 'Claude Opus 评测', link: '/comparisons/claude-opus-review' },
      ],
    },
  ],
  '/industry/': [
    {
      text: 'Claude 行业趋势与 Agent 场景',
      items: [
        { text: '专题首页', link: '/industry/' },
        { text: 'Managed Agents 发布', link: '/industry/claude-managed-agents' },
        { text: 'Anthropic Harness 解读', link: '/industry/anthropic-harness-managed-agents' },
        { text: '多智能体框架拆解', link: '/industry/claude-multi-agent-framework' },
        { text: '行动型 Agent', link: '/industry/claude-action-agent' },
        { text: 'Claude Code Channels', link: '/industry/claude-code-channels' },
      ],
    },
  ],
  '/faq/': [
    {
      text: 'Claude 常见问题 FAQ',
      items: [
        { text: '专题首页', link: '/faq/' },
        { text: '初学者如何入门 Claude Code', link: '/faq/beginner-learn-claude-code' },
        { text: '国内如何使用 Claude Code', link: '/faq/domestic-use-claude-code' },
        { text: '配额不够和省 Token 技巧', link: '/faq/claude-code-token-saving' },
        { text: 'claude.md 怎么写', link: '/faq/claude-md-best-practice' },
        { text: '如何避免 Claude 封号', link: '/faq/avoid-claude-ban' },
        { text: 'Claude Code vs Cursor', link: '/faq/claude-code-vs-cursor' },
      ],
    },
  ],
}
