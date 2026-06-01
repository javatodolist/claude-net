/**
 * Ralph Loop 文档翻译自动化脚本
 *
 * 工作原理：
 * 1. 读取 docs-map.mjs 中的映射配置
 * 2. 扫描已完成的翻译（目标文件已存在）
 * 3. Ralph Loop 每轮迭代翻译一篇文档
 * 4. verifyCompletion 检查是否全部完成
 *
 * 用法：
 *   npm run translate           # 开始翻译
 *   DRY_RUN=1 npm run translate # 干跑模式，只打印计划不执行
 *   PRIORITY=1 npm run translate # 只翻译优先级=1的文档
 *   START_FROM=5 npm run translate # 从第5个未翻译的文档开始
 */

import { RalphLoopAgent, iterationCountIs, costIs } from 'ralph-loop-agent'
import { anthropic } from '@ai-sdk/anthropic'
import { tool } from 'ai'
import { z } from 'zod'
import fs from 'node:fs'
import path from 'node:path'
import { DOCS_MAP, getDocsByPriority } from './docs-map.mjs'

// ============ 配置 ============
const PROJECT_ROOT = '/Volumes/SSD/ssd-code/github/ai80-net'
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs')
const OFFICIAL_DIR = path.join(DOCS_DIR, 'claude-code-official')
const GUIDE_DIR = path.join(DOCS_DIR, 'claude-code-guide')
const SIDEBAR_PATH = path.join(DOCS_DIR, '.vitepress/sidebar.ts')
const PROGRESS_FILE = path.join(PROJECT_ROOT, 'scripts/translate/progress.json')

// 写作风格参考文件
const STYLE_REFS = [
  path.join(GUIDE_DIR, '第1部分：基础入门/第1章：Claude Code 概述/1.1 Claude Code 是什么.md'),
  path.join(GUIDE_DIR, '第4部分：模型上下文协议 MCP/第12章：MCP 服务器配置与管理/12.1 添加 MCP 服务器.md'),
]

const DRY_RUN = process.env.DRY_RUN === '1'
const PRIORITY_FILTER = process.env.PRIORITY ? parseInt(process.env.PRIORITY) : null
const START_FROM = process.env.START_FROM ? parseInt(process.env.START_FROM) : 0

// ============ 进度管理 ============
function loadProgress() {
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'))
  } catch {
    return { completed: [], failed: [] }
  }
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2))
}

function getNextDoc(progress) {
  let docs = getDocsByPriority()

  if (PRIORITY_FILTER) {
    docs = docs.filter(d => d.priority === PRIORITY_FILTER)
  }

  const pending = docs.filter(d => {
    const targetPath = path.join(GUIDE_DIR, d.target + '.md')
    const alreadyDone = progress.completed.includes(d.source)
    const fileExists = fs.existsSync(targetPath)
    return !alreadyDone && !fileExists
  })

  return pending.length > 0 ? pending[START_FROM] || pending[0] : null
}

function getPendingCount(progress) {
  let docs = PRIORITY_FILTER
    ? DOCS_MAP.filter(d => d.priority === PRIORITY_FILTER)
    : DOCS_MAP

  return docs.filter(d => {
    const targetPath = path.join(GUIDE_DIR, d.target + '.md')
    return !progress.completed.includes(d.source) && !fs.existsSync(targetPath)
  }).length
}

// ============ 工具定义 ============
const readFile = tool({
  description: '读取文件内容。可以读取源文档、参考文章、侧边栏配置等。',
  parameters: z.object({
    filePath: z.string().describe('文件的绝对路径'),
  }),
  execute: async ({ filePath }) => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      return { success: true, content, length: content.length }
    } catch (err) {
      return { success: false, error: err.message }
    }
  },
})

const writeFile = tool({
  description: '写入文件内容。用于创建翻译后的中文文档。会自动创建父目录。',
  parameters: z.object({
    filePath: z.string().describe('文件的绝对路径'),
    content: z.string().describe('文件内容'),
  }),
  execute: async ({ filePath, content }) => {
    if (DRY_RUN) {
      console.log(`[DRY RUN] 将写入: ${filePath} (${content.length} 字符)`)
      return { success: true, dryRun: true }
    }
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, content, 'utf-8')
      return { success: true, bytesWritten: content.length }
    } catch (err) {
      return { success: false, error: err.message }
    }
  },
})

const readSidebar = tool({
  description: '读取当前的侧边栏配置文件',
  parameters: z.object({}),
  execute: async () => {
    try {
      const content = fs.readFileSync(SIDEBAR_PATH, 'utf-8')
      return { success: true, content }
    } catch (err) {
      return { success: false, error: err.message }
    }
  },
})

const updateSidebar = tool({
  description: '更新侧边栏配置文件。传入完整的新内容来替换。',
  parameters: z.object({
    content: z.string().describe('完整的 sidebar.ts 文件内容'),
  }),
  execute: async ({ content }) => {
    if (DRY_RUN) {
      console.log(`[DRY RUN] 将更新侧边栏`)
      return { success: true, dryRun: true }
    }
    try {
      // 备份
      const backup = SIDEBAR_PATH + '.bak'
      fs.copyFileSync(SIDEBAR_PATH, backup)
      fs.writeFileSync(SIDEBAR_PATH, content, 'utf-8')
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  },
})

const markComplete = tool({
  description: '标记一篇文档翻译完成',
  parameters: z.object({
    source: z.string().describe('官方文档文件名（不含 .md）'),
    targetPath: z.string().describe('生成的中文文档路径'),
  }),
  execute: async ({ source, targetPath }) => {
    const progress = loadProgress()
    if (!progress.completed.includes(source)) {
      progress.completed.push(source)
    }
    saveProgress(progress)
    const remaining = getPendingCount(progress)
    return { success: true, completed: progress.completed.length, remaining }
  },
})

const getTaskInfo = tool({
  description: '获取当前需要翻译的文档信息',
  parameters: z.object({}),
  execute: async () => {
    const progress = loadProgress()
    const nextDoc = getNextDoc(progress)
    if (!nextDoc) {
      return { allDone: true, completed: progress.completed.length, total: DOCS_MAP.length }
    }
    const sourceContent = fs.readFileSync(
      path.join(OFFICIAL_DIR, nextDoc.source + '.md'),
      'utf-8'
    )
    return {
      allDone: false,
      doc: nextDoc,
      sourceFilePath: path.join(OFFICIAL_DIR, nextDoc.source + '.md'),
      targetFilePath: path.join(GUIDE_DIR, nextDoc.target + '.md'),
      sourceContent,
      completed: progress.completed.length,
      remaining: getPendingCount(progress),
      total: DOCS_MAP.length,
    }
  },
})

// ============ 主流程 ============
async function main() {
  const progress = loadProgress()
  const pending = getPendingCount(progress)

  console.log('='.repeat(60))
  console.log('📖 Claude Code 官方文档翻译 - Ralph Loop 自动化')
  console.log('='.repeat(60))
  console.log(`总计: ${DOCS_MAP.length} 篇`)
  console.log(`已完成: ${progress.completed.length} 篇`)
  console.log(`待翻译: ${pending} 篇`)
  if (PRIORITY_FILTER) console.log(`优先级筛选: ${PRIORITY_FILTER}`)
  if (DRY_RUN) console.log('⚠️  干跑模式，不会写入文件')
  console.log('='.repeat(60))

  if (pending === 0) {
    console.log('🎉 所有文档已翻译完成！')
    return
  }

  // 读取参考文件用于 system prompt
  const styleRef1 = fs.existsSync(STYLE_REFS[0]) ? fs.readFileSync(STYLE_REFS[0], 'utf-8').slice(0, 2000) : ''
  const styleRef2 = fs.existsSync(STYLE_REFS[1]) ? fs.readFileSync(STYLE_REFS[1], 'utf-8').slice(0, 2000) : ''

  const systemPrompt = `你是一个专业的技术文档翻译专家，负责将 Claude Code 官方英文文档翻译为高质量的中文教程。

## 工作流程
每轮迭代：
1. 调用 getTaskInfo 获取当前待翻译的文档信息
2. 如果 allDone=true，回复 "ALL_DONE"
3. 阅读源文档内容（已包含在 getTaskInfo 返回中）
4. 如需要，用 readFile 读取参考文章了解风格
5. 用 writeFile 写入翻译后的中文文档
6. 用 readSidebar 读取当前侧边栏配置
7. 用 updateSidebar 更新侧边栏，在对应章节 items 中添加新条目
8. 用 markComplete 标记完成
9. 回复翻译摘要

## 写作风格参考

以下是站点现有文章的写作风格（截取前2000字符）：

### 参考文章1：
${styleRef1}

### 参考文章2：
${styleRef2}

## 写作规范
- 翻译为中文，不是逐句死板翻译，要像写教程一样自然流畅
- 标题格式：# XX.X 文章标题（编号从 getTaskInfo 返回的 doc.sidebarText 获取）
- 小节格式：## XX.X.X 小节标题
- 代码块保留英文，注释翻译为中文
- 专业术语首次出现时保留英文原文，如"内存管理（Memory）"
- 用 > 引用块强调关键提示
- 适当使用表格整理对比信息
- 不用 emoji 做列表标记
- 不要"在当今社会"、"众所周知"等套话
- 开篇直切主题，不要"本文将介绍..."
- 结尾不要重复前面说过的话

## 侧边栏更新规则
在 sidebar.ts 的 '/claude-code-guide/' 配置中，找到 doc.sidebarSection 对应的 items 数组，
在末尾添加：{ text: 'XX.X 标题', link: '/claude-code-guide/路径' }
link 路径不含 .md 后缀。`

  const agent = new RalphLoopAgent({
    model: anthropic('claude-sonnet-4-20250514'),
    instructions: systemPrompt,
    tools: { readFile, writeFile, readSidebar, updateSidebar, markComplete, getTaskInfo },

    // 安全限制
    stopWhen: [
      iterationCountIs(pending + 5), // 留余量
      costIs(50.00),                 // 最多 $50
    ],

    verifyCompletion: async ({ result, iteration }) => {
      const progress = loadProgress()
      const remaining = getPendingCount(progress)

      console.log(`\n--- 第 ${iteration} 轮完成 ---`)
      console.log(`已翻译: ${progress.completed.length}/${DOCS_MAP.length}`)
      console.log(`剩余: ${remaining} 篇`)

      if (remaining === 0 || result.text?.includes('ALL_DONE')) {
        return { complete: true, reason: '所有文档翻译完成' }
      }

      return {
        complete: false,
        reason: `还有 ${remaining} 篇待翻译。请调用 getTaskInfo 获取下一篇，继续翻译。`,
      }
    },

    onIterationStart: ({ iteration }) => {
      console.log(`\n🔄 开始第 ${iteration} 轮翻译...`)
    },
    onIterationEnd: ({ iteration, duration }) => {
      console.log(`⏱  第 ${iteration} 轮耗时: ${Math.round(duration / 1000)}s`)
    },
  })

  console.log('\n🚀 开始翻译循环...\n')

  const result = await agent.loop({
    prompt: '请调用 getTaskInfo 获取下一篇待翻译的文档，然后按照规范进行翻译。',
  })

  console.log('\n' + '='.repeat(60))
  console.log('翻译结束')
  console.log(`总迭代: ${result.iterations} 轮`)
  console.log(`结束原因: ${result.completionReason}`)
  console.log(`Token 用量: ${JSON.stringify(result.totalUsage)}`)
  console.log('='.repeat(60))
}

main().catch(err => {
  console.error('翻译出错:', err)
  process.exit(1)
})
