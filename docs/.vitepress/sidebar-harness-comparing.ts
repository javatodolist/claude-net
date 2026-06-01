import type { DefaultTheme } from 'vitepress'

export const harnessComparingSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Claude Code 和 Codex 的 Harness 设计哲学',
  },
  {
    text: '正文',
    collapsed: false,
    items: [
      { text: '导读', link: '/harness-comparing/' },
      { text: '阅读地图：如何理解第一本书与这本比较书', link: '/harness-comparing/chapter-00-reading-map' },
      { text: '序言 两套 Harness，不必假装是同一匹马的附件', link: '/harness-comparing/preface' },
      { text: '第 1 章 为什么要把 Claude Code 和 Codex 放在一起看', link: '/harness-comparing/chapter-01-why-this-comparison' },
      { text: '第 2 章 两种控制面：Prompt 拼装与 Instruction Fragment', link: '/harness-comparing/chapter-02-two-control-planes' },
      { text: '第 3 章 心跳放在哪：Query Loop 对照 Thread、Rollout 与 State', link: '/harness-comparing/chapter-03-loop-thread-and-rollout' },
      { text: '第 4 章 工具、沙箱与策略语言：谁来阻止模型动手太快', link: '/harness-comparing/chapter-04-tools-sandbox-and-exec-policy' },
      { text: '第 5 章 技能、Hook 与本地规则：系统如何学会守乡约', link: '/harness-comparing/chapter-05-skills-hooks-and-local-governance' },
      { text: '第 6 章 委派、验证与持久状态：谁来防止系统自己给自己打高分', link: '/harness-comparing/chapter-06-delegation-verification-and-state' },
      { text: '第 7 章 殊途同归，还是各表一枝', link: '/harness-comparing/chapter-07-convergence-and-divergence' },
      { text: '第 8 章 如果你要自己做：该向谁学，先学什么', link: '/harness-comparing/chapter-08-how-to-choose-or-build' },
      { text: '附录 A 源码地图：这套比较主要依据哪些文件', link: '/harness-comparing/appendix-a-source-map' },
      { text: '附录 B 检查清单：如何判断你的 Harness 更像 Claude Code、Codex，还是半成品', link: '/harness-comparing/appendix-b-checklists' },
    ],
  },
]
