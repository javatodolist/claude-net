import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  { text: 'Claude 入门', link: '/guide/' },
  { text: 'Claude Code', link: '/claude-code/' },
  { text: 'Code80', link: '/code80/' },
  { text: 'API 开发', link: '/api/' },
  { text: '订阅与账号', link: '/billing/' },
  {
    text: '进阶专题',
    items: [
      { text: '提示词与工作流', link: '/prompt-engineering/' },
      { text: '对比评测', link: '/comparisons/' },
      { text: 'Agent 与行业趋势', link: '/industry/' },
    ],
  },
  { text: 'FAQ', link: '/faq/' },
]
