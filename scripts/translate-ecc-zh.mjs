#!/usr/bin/env node
/**
 * ECC 内容库中文翻译脚本
 *
 * 将 docs/claude-code-content/{agents,commands,skills} 翻译为中文，
 * 输出到 docs/claude-code-content-zh/ 保持相同目录结构。
 * 翻译完成后自动生成 sidebar-claude-code-content-zh.ts。
 *
 * 用法：
 *   node scripts/translate-ecc-zh.mjs                    # 翻译全部待翻译文件
 *   node scripts/translate-ecc-zh.mjs --dry-run           # 干跑，只打印计划
 *   node scripts/translate-ecc-zh.mjs --one               # 只翻译 1 篇
 *   node scripts/translate-ecc-zh.mjs --section agents    # 只翻译 agents
 *   node scripts/translate-ecc-zh.mjs --section commands  # 只翻译 commands
 *   node scripts/translate-ecc-zh.mjs --section skills    # 只翻译 skills
 *   node scripts/translate-ecc-zh.mjs --from architect    # 从指定文件名开始
 */

import { spawn } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const PROJECT_ROOT = path.resolve(import.meta.dirname, '..')
const SRC_ROOT = path.join(PROJECT_ROOT, 'docs/claude-code-content')
const DST_ROOT = path.join(PROJECT_ROOT, 'docs/claude-code-content-zh')
const SIDEBAR_OUT = path.join(PROJECT_ROOT, 'docs/.vitepress/sidebar-claude-code-content-zh.ts')
const PROGRESS_FILE = path.join(PROJECT_ROOT, 'scripts/translate-ecc-zh-progress.json')

// ── 命令行参数 ──────────────────────────────────────────────
const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const ONE_ONLY = args.includes('--one')
const SECTION = args.includes('--section') ? args[args.indexOf('--section') + 1] : null
const FROM = args.includes('--from') ? args[args.indexOf('--from') + 1] : null

// ── 进度管理 ────────────────────────────────────────────────
async function loadProgressAsync() {
  try { return JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8')) } catch { return { completed: [] } }
}

async function saveProgress(progress) {
  await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8')
}

// ── 文件扫描 ────────────────────────────────────────────────
async function collectFiles() {
  const entries = []

  // agents/*.md
  if (!SECTION || SECTION === 'agents') {
    const dir = path.join(SRC_ROOT, 'agents')
    const files = (await fs.readdir(dir)).filter(f => f.endsWith('.md')).sort()
    for (const f of files) {
      entries.push({
        section: 'agents',
        srcPath: path.join(dir, f),
        dstPath: path.join(DST_ROOT, 'agents', f),
        id: `agents/${f}`,
      })
    }
  }

  // commands/*.md
  if (!SECTION || SECTION === 'commands') {
    const dir = path.join(SRC_ROOT, 'commands')
    const files = (await fs.readdir(dir)).filter(f => f.endsWith('.md')).sort()
    for (const f of files) {
      entries.push({
        section: 'commands',
        srcPath: path.join(dir, f),
        dstPath: path.join(DST_ROOT, 'commands', f),
        id: `commands/${f}`,
      })
    }
  }

  // skills/*/SKILL.md
  if (!SECTION || SECTION === 'skills') {
    const dir = path.join(SRC_ROOT, 'skills')
    const subdirs = (await fs.readdir(dir, { withFileTypes: true }))
      .filter(e => e.isDirectory())
      .map(e => e.name)
      .sort()
    for (const sub of subdirs) {
      const src = path.join(dir, sub, 'SKILL.md')
      try {
        await fs.access(src)
        entries.push({
          section: 'skills',
          srcPath: src,
          dstPath: path.join(DST_ROOT, 'skills', sub, 'SKILL.md'),
          id: `skills/${sub}/SKILL.md`,
        })
      } catch {
        // no SKILL.md
      }
    }
  }

  return entries
}

// ── 翻译提示词 ──────────────────────────────────────────────
function buildPrompt(entry) {
  return `请将以下 Claude Code 配置文件翻译成中文，然后写入目标路径。

## 规则
- 保留 YAML frontmatter 结构，key 不变，description 等描述性 value 翻译为中文
- name/model/tools/origin 等技术性字段值保持英文
- 代码块（\`\`\`）内容完整保留，不翻译
- 行内代码（\`code\`）不翻译
- 标题、正文、注释翻译为中文
- 技术术语首次出现保留英文并加括号，如"工具使用（tool use）"
- 保留文件开头的 \`<!-- mirrored-from-upstream -->\` 注释行
- 风格简洁直接，不用"在当今社会""总而言之"等套话
- 不加额外说明，直接翻译

## 源文件路径
${entry.srcPath}

## 目标路径
${entry.dstPath}

## 步骤
1. 读取源文件：${entry.srcPath}
2. 翻译内容（遵循上述规则）
3. 创建目录（如不存在）
4. 写入翻译结果到：${entry.dstPath}

完成后只需确认文件已写入，不要输出文件内容。`
}

// ── 调用 claude -p ──────────────────────────────────────────
function runClaude(prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn('claude', [
      '-p', prompt,
      '--allowedTools', 'Read,Write,Bash',
      '--output-format', 'stream-json',
      '--max-turns', '10',
      '--model', 'haiku',
    ], {
      cwd: PROJECT_ROOT,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, FORCE_COLOR: '0' },
    })

    let lastText = ''

    child.stdout.on('data', data => {
      for (const line of data.toString().split('\n').filter(Boolean)) {
        try {
          const event = JSON.parse(line)
          if (event.type === 'assistant' && event.message?.content) {
            for (const block of event.message.content) {
              if (block.type === 'tool_use') {
                const fp = (block.input?.file_path || '').split('/').slice(-1)[0]
                process.stdout.write(`  [${block.name}${fp ? ':' + fp : ''}] `)
              } else if (block.type === 'text') {
                lastText = block.text
              }
            }
          } else if (event.type === 'result') {
            lastText = event.result?.text || lastText
          }
        } catch { /* non-JSON */ }
      }
    })

    child.stderr.on('data', data => {
      const t = data.toString().trim()
      if (t) process.stderr.write(`  ⚠ ${t}\n`)
    })

    child.on('close', code => {
      process.stdout.write('\n')
      if (code === 0) resolve(lastText)
      else reject(new Error(`claude exited ${code}`))
    })

    child.on('error', reject)
  })
}

// ── 验证 ────────────────────────────────────────────────────
async function verify(entry) {
  try {
    const content = await fs.readFile(entry.dstPath, 'utf8')
    return content.length > 200
  } catch {
    return false
  }
}

// ── 侧边栏生成 ──────────────────────────────────────────────
async function generateSidebar() {
  const base = '/claude-code-content-zh'

  async function listDirMdFiles(dir) {
    try {
      return (await fs.readdir(dir, { withFileTypes: true }))
        .filter(e => e.isFile() && e.name.endsWith('.md'))
        .map(e => e.name.replace(/\.md$/, ''))
        .sort((a, b) => a.localeCompare(b))
    } catch { return [] }
  }

  async function listSkillDirs(dir) {
    try {
      const result = []
      for (const e of await fs.readdir(dir, { withFileTypes: true })) {
        if (!e.isDirectory()) continue
        try { await fs.access(path.join(dir, e.name, 'SKILL.md')); result.push(e.name) } catch {}
      }
      return result.sort((a, b) => a.localeCompare(b))
    } catch { return [] }
  }

  const [agents, skills, commands] = await Promise.all([
    listDirMdFiles(path.join(DST_ROOT, 'agents')),
    listSkillDirs(path.join(DST_ROOT, 'skills')),
    listDirMdFiles(path.join(DST_ROOT, 'commands')),
  ])

  const si = (t, l) => `    { text: ${JSON.stringify(t)}, link: ${JSON.stringify(l)} },`
  const lines = []

  lines.push('// Auto-generated by scripts/translate-ecc-zh.mjs — do not edit by hand')
  lines.push("import type { DefaultTheme } from 'vitepress'")
  lines.push('')
  lines.push('export const claudeCodeContentZhSidebar: DefaultTheme.SidebarItem[] = [')

  lines.push('  {')
  lines.push("    text: 'Claude Code 配置库（中文）',")
  lines.push('    items: [')
  lines.push(si('目录首页', `${base}/`))
  lines.push('    ],')
  lines.push('  },')

  if (agents.length) {
    lines.push('  {')
    lines.push(`    text: 'Agents（${agents.length}）',`)
    lines.push('    collapsed: true,')
    lines.push('    items: [')
    for (const n of agents) lines.push(si(n, `${base}/agents/${n}`))
    lines.push('    ],')
    lines.push('  },')
  }

  if (skills.length) {
    lines.push('  {')
    lines.push(`    text: 'Skills（${skills.length}）',`)
    lines.push('    collapsed: true,')
    lines.push('    items: [')
    for (const n of skills) lines.push(si(n, `${base}/skills/${n}/SKILL`))
    lines.push('    ],')
    lines.push('  },')
  }

  if (commands.length) {
    lines.push('  {')
    lines.push(`    text: 'Commands（${commands.length}）',`)
    lines.push('    collapsed: true,')
    lines.push('    items: [')
    for (const n of commands) lines.push(si(n, `${base}/commands/${n}`))
    lines.push('    ],')
    lines.push('  },')
  }

  lines.push(']')
  lines.push('')

  await fs.writeFile(SIDEBAR_OUT, lines.join('\n'), 'utf8')
  console.log(`\nSidebar generated: ${SIDEBAR_OUT}`)
  console.log(`  agents: ${agents.length}, skills: ${skills.length}, commands: ${commands.length}`)
}

// ── index.md ────────────────────────────────────────────────
async function generateIndex(agents, skills, commands) {
  await fs.mkdir(DST_ROOT, { recursive: true })
  const lines = []
  lines.push('---')
  lines.push('title: Claude Code 配置库（中文译版）')
  lines.push('description: everything-claude-code 仓库 agents、skills、commands 的中文翻译，便于中文用户阅读和使用。')
  lines.push('---')
  lines.push('')
  lines.push('# Claude Code 配置库（中文译版）')
  lines.push('')
  lines.push('> 英文原版：[Claude Code 配置库全量内容](/claude-code-content/)  ')
  lines.push('> 翻译范围：agents · skills · commands')
  lines.push('')
  lines.push('## Agents')
  lines.push('')
  for (const n of agents) lines.push(`- [${n}](/claude-code-content-zh/agents/${n})`)
  lines.push('')
  lines.push('## Skills')
  lines.push('')
  for (const n of skills) lines.push(`- [${n}](/claude-code-content-zh/skills/${n}/SKILL)`)
  lines.push('')
  lines.push('## Commands')
  lines.push('')
  for (const n of commands) lines.push(`- [${n}](/claude-code-content-zh/commands/${n})`)
  lines.push('')
  await fs.writeFile(path.join(DST_ROOT, 'index.md'), lines.join('\n'), 'utf8')
}

// ── 主流程 ──────────────────────────────────────────────────
async function main() {
  const allEntries = await collectFiles()
  const progress = await loadProgressAsync()

  const pending = allEntries.filter(e => {
    if (progress.completed.includes(e.id)) return false
    return true
  })

  // respect --from
  let startIdx = 0
  if (FROM) {
    const idx = pending.findIndex(e => e.id.includes(FROM))
    if (idx > 0) startIdx = idx
  }
  const queue = pending.slice(startIdx, ONE_ONLY ? startIdx + 1 : undefined)

  console.log('─'.repeat(60))
  console.log('ECC 内容库中文翻译')
  console.log('─'.repeat(60))
  console.log(`总计文件：${allEntries.length}`)
  console.log(`已完成：${progress.completed.length}`)
  console.log(`本次队列：${queue.length}`)
  if (SECTION) console.log(`范围：${SECTION}`)
  if (DRY_RUN) console.log('模式：干跑（不执行）')
  console.log('─'.repeat(60))

  if (queue.length === 0) {
    console.log('所有文件已翻译完成！')
    await generateSidebar()
    return
  }

  let done = 0
  for (const entry of queue) {
    done++
    process.stdout.write(`[${done}/${queue.length}] ${entry.id} ... `)

    if (DRY_RUN) { console.log('(dry-run skip)'); continue }

    const t0 = Date.now()
    try {
      await runClaude(buildPrompt(entry))
      const ok = await verify(entry)
      const elapsed = Math.round((Date.now() - t0) / 1000)
      if (ok) {
        progress.completed.push(entry.id)
        await saveProgress(progress)
        console.log(`完成 (${elapsed}s)`)
      } else {
        console.log(`验证失败 (${elapsed}s)，继续下一个`)
      }
    } catch (err) {
      console.log(`\n  错误: ${err.message}`)
    }
  }

  // 生成侧边栏和 index
  await generateSidebar()

  // 收集已翻译文件用于 index
  async function listMd(dir) {
    try { return (await fs.readdir(dir)).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')).sort() } catch { return [] }
  }
  async function listSkillDirsLocal(dir) {
    try {
      const r = []
      for (const e of await fs.readdir(dir, { withFileTypes: true })) {
        if (!e.isDirectory()) continue
        try { await fs.access(path.join(dir, e.name, 'SKILL.md')); r.push(e.name) } catch {}
      }
      return r.sort()
    } catch { return [] }
  }

  const [agents, skills, commands] = await Promise.all([
    listMd(path.join(DST_ROOT, 'agents')),
    listSkillDirsLocal(path.join(DST_ROOT, 'skills')),
    listMd(path.join(DST_ROOT, 'commands')),
  ])
  await generateIndex(agents, skills, commands)

  console.log('\n─'.repeat(60))
  console.log(`翻译完成：${done} 篇`)
  console.log(`总进度：${progress.completed.length} / ${allEntries.length}`)
  console.log('─'.repeat(60))
}

main().catch(err => {
  console.error('脚本出错:', err.message)
  process.exit(1)
})
