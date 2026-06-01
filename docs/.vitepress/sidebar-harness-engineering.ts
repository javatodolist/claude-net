import type { DefaultTheme } from 'vitepress'

export const harnessEngineeringSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Harness Engineering：Claude Code 设计指南',
  },
  {
    text: '正文',
    collapsed: false,
    items: [
      { text: '导读', link: '/harness-engineering/' },
      { text: '序言 Harness、终端与工程约束', link: '/harness-engineering/preface' },
      { text: '第 1 章 为什么需要 Harness Engineering', link: '/harness-engineering/chapter-01-why-harness-engineering' },
      { text: '第 2 章 Prompt 不是人格，Prompt 是控制平面', link: '/harness-engineering/chapter-02-prompt-is-control-plane' },
      { text: '第 3 章 Query Loop：代理系统的心跳', link: '/harness-engineering/chapter-03-query-loop-heartbeat' },
      { text: '第 4 章 工具、权限与中断：为什么代理不能直接碰世界', link: '/harness-engineering/chapter-04-tools-permissions-interrupts' },
      { text: '第 5 章 上下文治理：Memory、CLAUDE.md 与 Compact 是预算制度', link: '/harness-engineering/chapter-05-context-memory-compact' },
      { text: '第 6 章 错误与恢复：出错后仍能继续工作的代理系统', link: '/harness-engineering/chapter-06-errors-and-recovery' },
      { text: '第 7 章 多代理与验证：用分工和验证管理不稳定性', link: '/harness-engineering/chapter-07-multi-agent-and-verification' },
      { text: '第 8 章 团队落地：把一个聪明工具变成可复用制度', link: '/harness-engineering/chapter-08-team-landing-practices' },
      { text: '第 9 章 Harness Engineering 十条原则', link: '/harness-engineering/chapter-09-ten-principles' },
      { text: '附录 A 检查清单：把原则落成能执行的约束', link: '/harness-engineering/appendix-a-checklists' },
      { text: '附录 B 图示：把运行时骨架画出来', link: '/harness-engineering/appendix-b-diagram-notes' },
      { text: '附录 C 源码地图：本书各章主要依据哪些文件', link: '/harness-engineering/appendix-c-source-map' },
    ],
  },
]
