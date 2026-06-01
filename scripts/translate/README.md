# 文档翻译自动化 (Ralph Loop)

将 `docs/claude-code-official/` 下的 59 篇官方英文文档，自动翻译为中文教程并放入 `docs/claude-code-guide/` 对应位置。

## 架构

```
Ralph Loop 外层循环
  │
  ├─ 第1轮: getTaskInfo → 读源文件 → 翻译 → 写入 → 更新侧边栏 → markComplete
  ├─ 第2轮: getTaskInfo → 读源文件 → 翻译 → 写入 → 更新侧边栏 → markComplete
  ├─ ...
  └─ verifyCompletion: 剩余 0 篇 → complete!
```

## 安装

```bash
cd scripts/translate
npm install
```

需要设置 Anthropic API Key：

```bash
export ANTHROPIC_API_KEY=sk-ant-xxx
```

## 使用

```bash
# 查看翻译进度
npm run status

# 开始翻译（自动循环直到全部完成）
npm run translate

# 干跑模式（不写文件，只打印计划）
npm run dry-run

# 只翻译优先级=1 的文档（共8篇核心文档）
PRIORITY=1 npm run translate

# 从第N个未翻译文档开始
START_FROM=3 npm run translate
```

## 安全限制

- 最大迭代次数 = 待翻译数 + 5
- 最大花费 $50
- 每轮翻译前自动备份 sidebar.ts

## 进度管理

翻译进度保存在 `progress.json`，记录已完成的文档。
如需重新翻译某篇，从 progress.json 的 completed 数组中删除对应文件名即可。

## 文件说明

```
scripts/translate/
├── README.md          # 本文件
├── package.json       # 依赖配置
├── docs-map.mjs       # 文档映射关系（源文件 → 目标路径 → 侧边栏位置）
├── translate.mjs      # 主翻译脚本（Ralph Loop）
├── status.mjs         # 进度查看脚本
└── progress.json      # 翻译进度（自动生成）
```

## 映射配置

每篇文档的映射在 `docs-map.mjs` 中定义：

```js
{
  source: 'overview',                    // 官方文件名
  target: '第1部分：.../1.5 官方概览',     // 目标路径
  sidebarSection: '第1章：Claude Code 概述', // 侧边栏章节
  sidebarText: '1.5 官方概览',            // 侧边栏显示文本
  priority: 1,                           // 翻译优先级
}
```

如需调整文档的放置位置，修改 `docs-map.mjs` 中对应条目即可。
