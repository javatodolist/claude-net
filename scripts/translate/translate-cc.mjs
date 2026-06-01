#!/usr/bin/env node
/**
 * Claude Code 驱动的文档翻译自动化
 *
 * 用 `claude -p` 替代 API 调用，复用你现有的 Claude Code 订阅。
 * 保留 Ralph Loop 的核心思想：外层循环 + 完成验证 + 进度追踪。
 *
 * 用法：
 *   node translate-cc.mjs                    # 翻译全部
 *   node translate-cc.mjs --priority 1       # 只翻译 P1
 *   node translate-cc.mjs --dry-run          # 干跑，只打印提示词
 *   node translate-cc.mjs --one              # 只翻译 1 篇就停
 *   node translate-cc.mjs --from overview    # 从指定文档开始
 */

import { execSync, spawn } from 'node:child_process'
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

// 写作风格参考
const STYLE_REF = path.join(
  GUIDE_DIR,
  '第1部分：基础入门/第1章：Claude Code 概述/1.1 Claude Code 是什么.md'
)

// ============ 解析命令行参数 ============
const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const ONE_ONLY = args.includes('--one')
const PRIORITY = args.includes('--priority')
  ? parseInt(args[args.indexOf('--priority') + 1])
  : null
const FROM = args.includes('--from')
  ? args[args.indexOf('--from') + 1]
  : null

// ============ 进度管理 ============
function loadProgress() {
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'))
  } catch {
    return { completed: [], failed: [], history: [] }
  }
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2))
}

function getPendingDocs(progress) {
  let docs = getDocsByPriority()

  if (PRIORITY) {
    docs = docs.filter(d => d.priority === PRIORITY)
  }

  const pending = docs.filter(d => {
    const targetPath = path.join(GUIDE_DIR, d.target + '.md')
    return !progress.completed.includes(d.source) && !fs.existsSync(targetPath)
  })

  if (FROM) {
    const idx = pending.findIndex(d => d.source === FROM)
    if (idx > 0) return pending.slice(idx)
  }

  return pending
}

// ============ 生成翻译提示词 ============
function buildPrompt(doc) {
  const sourceFile = path.join(OFFICIAL_DIR, doc.source + '.md')
  const targetFile = path.join(GUIDE_DIR, doc.target + '.md')
  const targetDir = path.dirname(targetFile)

  return `请将官方文档翻译为中文教程文章，完成后直接写入文件。

## 你需要做的事

### 第1步：读取源文件
读取这个官方文档：
${sourceFile}

### 第2步：学习写作风格
读取这个参考文章，了解站点的教程写作风格：
${STYLE_REF}

### 第3步：翻译并写入
将官方文档翻译为中文教程，写入到：
${targetFile}

如果目录不存在，先创建目录：${targetDir}

### 第4步：更新侧边栏
读取 ${SIDEBAR_PATH}，在 '/claude-code-guide/' 配置中找到「${doc.sidebarSection}」章节的 items 数组，在末尾添加：
{ text: '${doc.sidebarText}', link: '/claude-code-guide/${doc.target}' }

注意：link 路径不含 .md 后缀。

## 写作规范
- 标题格式：# ${doc.sidebarText.split(' ').slice(0, 1).join(' ')} 文章标题
- 小节格式：## XX.X.X 小节标题
- 不是逐句死板翻译，要像写教程一样自然
- 代码块保留英文，注释翻译为中文
- 专业术语首次出现时保留英文，如"内存管理（Memory）"
- 用 > 引用块强调关键提示
- 适当使用表格
- 不用 emoji 做列表标记
- 不用"在当今社会""众所周知"等套话
- 开篇直切主题，不要"本文将介绍..."
- 结尾不要重复前面的内容

## 完成后
确认两件事都做了：
1. 翻译文件已写入 ${targetFile}
2. sidebar.ts 已更新`
}

// ============ 调用 Claude Code ============
function runClaudeCode(prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn('claude', [
      '-p', prompt,
      '--allowedTools', 'Read,Write,Edit,Glob,Grep,Bash',
      '--output-format', 'stream-json',
      '--max-turns', '30',
      '--model', 'sonnet',
    ], {
      cwd: PROJECT_ROOT,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, FORCE_COLOR: '0', CLAUDECODE: '' },
    })

    let stdout = ''
    let stderr = ''
    let lastText = ''

    child.stdout.on('data', (data) => {
      const text = data.toString()
      stdout += text

      // 解析 stream-json 格式，显示实时进度
      for (const line of text.split('\n').filter(Boolean)) {
        try {
          const event = JSON.parse(line)
          if (event.type === 'assistant' && event.message?.content) {
            for (const block of event.message.content) {
              if (block.type === 'tool_use') {
                process.stdout.write(`  🔧 ${block.name}`)
                if (block.name === 'Read' || block.name === 'Write') {
                  const input = block.input || {}
                  const filePath = input.file_path || input.filePath || ''
                  const short = filePath.split('/').slice(-2).join('/')
                  process.stdout.write(`: ${short}`)
                }
                process.stdout.write('\n')
              } else if (block.type === 'text') {
                lastText = block.text
              }
            }
          } else if (event.type === 'result') {
            lastText = event.result?.text || lastText
          }
        } catch {
          // 非 JSON 行，忽略
        }
      }
    })

    child.stderr.on('data', (data) => {
      const text = data.toString()
      stderr += text
      // 实时输出 stderr 方便调试
      if (text.trim()) process.stderr.write(`  ⚠ ${text}`)
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve(lastText || stdout)
      } else {
        reject(new Error(`claude exited with code ${code}\n${stderr}`))
      }
    })

    child.on('error', (err) => {
      reject(err)
    })
  })
}

// ============ 验证翻译结果 ============
function verifyTranslation(doc) {
  const targetPath = path.join(GUIDE_DIR, doc.target + '.md')
  const checks = {
    fileExists: fs.existsSync(targetPath),
    hasContent: false,
    sidebarUpdated: false,
  }

  if (checks.fileExists) {
    const content = fs.readFileSync(targetPath, 'utf-8')
    checks.hasContent = content.length > 500 // 至少 500 字符
  }

  // 检查侧边栏是否包含新条目
  const sidebar = fs.readFileSync(SIDEBAR_PATH, 'utf-8')
  checks.sidebarUpdated = sidebar.includes(doc.sidebarText)

  return checks
}

// ============ 主循环 ============
async function main() {
  const progress = loadProgress()
  const pending = getPendingDocs(progress)

  console.log('='.repeat(60))
  console.log('Claude Code 驱动的文档翻译')
  console.log('='.repeat(60))
  console.log(`总计: ${DOCS_MAP.length} 篇`)
  console.log(`已完成: ${progress.completed.length} 篇`)
  console.log(`待翻译: ${pending.length} 篇`)
  if (PRIORITY) console.log(`优先级: P${PRIORITY}`)
  if (ONE_ONLY) console.log(`模式: 仅翻译 1 篇`)
  if (DRY_RUN) console.log(`模式: 干跑（不执行）`)
  console.log('='.repeat(60))

  if (pending.length === 0) {
    console.log('所有文档已翻译完成！')
    return
  }

  let iteration = 0
  const maxIterations = ONE_ONLY ? 1 : pending.length

  for (const doc of pending.slice(0, maxIterations)) {
    iteration++
    const total = Math.min(maxIterations, pending.length)

    console.log(`\n${'─'.repeat(60)}`)
    console.log(`[${iteration}/${total}] 翻译: ${doc.source} → ${doc.sidebarText}`)
    console.log(`优先级: P${doc.priority}`)
    console.log(`目标: docs/claude-code-guide/${doc.target}.md`)
    console.log(`${'─'.repeat(60)}\n`)

    const prompt = buildPrompt(doc)

    // 干跑模式：只打印提示词
    if (DRY_RUN) {
      console.log('--- 提示词预览 ---')
      console.log(prompt.slice(0, 500) + '\n...(截断)')
      console.log('--- 跳过执行 ---\n')
      continue
    }

    // 执行翻译
    const startTime = Date.now()
    try {
      await runClaudeCode(prompt)
      const duration = Math.round((Date.now() - startTime) / 1000)

      // 验证结果
      const checks = verifyTranslation(doc)
      console.log(`\n\n验证结果:`)
      console.log(`  文件已创建: ${checks.fileExists ? '通过' : '失败'}`)
      console.log(`  内容充实: ${checks.hasContent ? '通过' : '失败'}`)
      console.log(`  侧边栏已更新: ${checks.sidebarUpdated ? '通过' : '失败'}`)
      console.log(`  耗时: ${duration}s`)

      if (checks.fileExists && checks.hasContent) {
        // 标记完成
        progress.completed.push(doc.source)
        progress.history.push({
          source: doc.source,
          target: doc.target,
          timestamp: new Date().toISOString(),
          duration,
          checks,
        })
        saveProgress(progress)
        console.log(`\n[${iteration}/${total}] 完成 ✓\n`)
      } else {
        // 标记失败
        progress.failed.push({
          source: doc.source,
          timestamp: new Date().toISOString(),
          checks,
        })
        saveProgress(progress)
        console.log(`\n[${iteration}/${total}] 验证未通过，已记录，继续下一篇\n`)
      }
    } catch (err) {
      const duration = Math.round((Date.now() - startTime) / 1000)
      console.error(`\n翻译失败 (${duration}s): ${err.message}`)
      progress.failed.push({
        source: doc.source,
        timestamp: new Date().toISOString(),
        error: err.message,
      })
      saveProgress(progress)
      console.log('继续下一篇...\n')
    }
  }

  // 最终报告
  const finalProgress = loadProgress()
  const remaining = getPendingDocs(finalProgress).length

  console.log('\n' + '='.repeat(60))
  console.log('翻译批次完成')
  console.log(`本次完成: ${iteration} 篇`)
  console.log(`总进度: ${finalProgress.completed.length}/${DOCS_MAP.length}`)
  console.log(`剩余: ${remaining} 篇`)
  console.log('='.repeat(60))
}

main().catch(err => {
  console.error('脚本出错:', err)
  process.exit(1)
})
