#!/usr/bin/env node

import { execFile as execFileCb } from 'node:child_process'
import { promisify } from 'node:util'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const execFile = promisify(execFileCb)

const DEFAULT_SOURCE = '/Volumes/SSD/Code/github/everything-claude-code'
const DEFAULT_DEST = 'docs/claude-code-content'
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5LhXQAAAAASUVORK5CYII=',
  'base64',
)
const TINY_GIF = Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64')
const TINY_JPG = Buffer.from(
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUQEA8PFhUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0fHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAAEAAQMBEQACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAABAgAD/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEh/9oADAMBAAIRAxEAPwCdAAH/2Q==',
  'base64',
)

function parseArgs(argv) {
  const args = {
    source: DEFAULT_SOURCE,
    dest: DEFAULT_DEST,
    sourceUrl: null,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token === '--source') {
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        throw new Error('Missing value for --source')
      }
      args.source = next
      i += 1
      continue
    }
    if (token === '--dest') {
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        throw new Error('Missing value for --dest')
      }
      args.dest = next
      i += 1
      continue
    }
    if (token === '--source-url') {
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        throw new Error('Missing value for --source-url')
      }
      args.sourceUrl = next
      i += 1
      continue
    }
    throw new Error(`Unknown argument: ${token}`)
  }

  return args
}

async function git(cwd, ...args) {
  const { stdout } = await execFile('git', args, { cwd })
  return stdout.trim()
}

function encodePathForMarkdownLink(relativePath) {
  return relativePath
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/')
}

function hasHiddenPathSegment(relativePath) {
  return relativePath.split('/').some(segment => segment.startsWith('.'))
}

function shouldSanitizeHtml(relativePath) {
  if (relativePath === 'README.zh-CN.md') {
    return false
  }
  return true
}

function normalizeReadmeZhCn(content) {
  let output = content
  output = output.replace(/<div align="center">\s*/g, '')
  output = output.replace(/\s*<\/div>/g, '')
  output = output.replace(
    /<table>[\s\S]*?<\/table>/m,
    [
      '| 指南 | 入口 |',
      '|---|---|',
      '| 精简指南 | [查看原帖](https://x.com/affaanmustafa/status/2012378465664745795) |',
      '| 详细指南 | [查看原帖](https://x.com/affaanmustafa/status/2014040193557471352) |',
      '| 安全指南 | [查看原帖](https://x.com/affaanmustafa/status/2033263813387223421) |',
      '',
      '![The Shorthand Guide to Everything Agentic Security](./assets/images/security/security-guide-header.png)',
    ].join('\n'),
  )
  output = output.replace(/<br\s*\/?>/g, '  \n')
  return output
}

async function copyFilePreserveTree(sourceRoot, destRoot, relativePath) {
  const sourcePath = path.join(sourceRoot, relativePath)
  const destPath = path.join(destRoot, relativePath)
  await fs.mkdir(path.dirname(destPath), { recursive: true })
  if (isMarkdownFile(relativePath)) {
    let content = await fs.readFile(sourcePath, 'utf8')
    if (relativePath === 'README.zh-CN.md') {
      content = normalizeReadmeZhCn(content)
    }
    if (shouldSanitizeHtml(relativePath)) {
      content = sanitizeHtmlOutsideCode(content)
    }
    content = disableVitePressFrontmatterParsing(content)
    await fs.writeFile(destPath, content, 'utf8')
    return
  }
  await fs.copyFile(sourcePath, destPath)
}

function isMarkdownFile(filePath) {
  return filePath.endsWith('.md') || filePath.endsWith('.mdx')
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

function parseLocalImageTargets(markdownContent) {
  const targets = []
  const imageRegex = /!\[[^\]]*]\(([^)]+)\)/g
  for (const match of markdownContent.matchAll(imageRegex)) {
    let raw = (match[1] || '').trim()
    if (!raw) continue
    if (raw.startsWith('<') && raw.endsWith('>')) raw = raw.slice(1, -1)
    const token = raw.split(/\s+/)[0]
    const target = token.split('#')[0].split('?')[0]
    if (!target || target.startsWith('http://') || target.startsWith('https://') || target.startsWith('/') || target.startsWith('#')) {
      continue
    }
    if (!/\.(png|jpg|jpeg|gif|webp|avif|svg)$/i.test(target)) continue
    targets.push(target)
  }
  return targets
}

async function ensurePlaceholderAsset(assetPath) {
  const lower = assetPath.toLowerCase()
  let content
  if (lower.endsWith('.svg')) {
    content = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>', 'utf8')
  } else if (lower.endsWith('.gif')) {
    content = TINY_GIF
  } else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
    content = TINY_JPG
  } else {
    content = TINY_PNG
  }
  await fs.mkdir(path.dirname(assetPath), { recursive: true })
  await fs.writeFile(assetPath, content)
}

async function backfillMissingImageAssets(destRoot, markdownPaths) {
  const missingAssets = new Set()

  for (const relativeMdPath of markdownPaths) {
    const mdAbsPath = path.join(destRoot, relativeMdPath)
    const content = await fs.readFile(mdAbsPath, 'utf8')
    const refs = parseLocalImageTargets(content)
    for (const ref of refs) {
      const targetAbsPath = path.resolve(path.dirname(mdAbsPath), ref)
      if (!targetAbsPath.startsWith(destRoot + path.sep)) continue
      const exists = await pathExists(targetAbsPath)
      if (!exists) {
        missingAssets.add(targetAbsPath)
      }
    }
  }

  for (const asset of missingAssets) {
    await ensurePlaceholderAsset(asset)
  }

  return missingAssets.size
}

function sanitizeHtmlOutsideCode(input) {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function disableVitePressFrontmatterParsing(input) {
  return `<!-- mirrored-from-upstream -->\n${input}`
}

function buildGroupedIndex(filePaths) {
  const groups = new Map()

  for (const filePath of filePaths) {
    const slash = filePath.indexOf('/')
    const group = slash === -1 ? '(root)' : filePath.slice(0, slash)
    const arr = groups.get(group) || []
    arr.push(filePath)
    groups.set(group, arr)
  }

  const sortedGroups = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))
  for (const [, files] of sortedGroups) {
    files.sort((a, b) => a.localeCompare(b))
  }

  return sortedGroups
}

async function writeIndexFile(options) {
  const {
    destRoot,
    sourceUrl,
    sourcePath,
    sourceCommit,
    filePaths,
  } = options

  const visiblePaths = filePaths.filter(filePath => !hasHiddenPathSegment(filePath))
  const grouped = buildGroupedIndex(visiblePaths)
  const lines = []

  lines.push('---')
  lines.push('title: Claude Code 配置库全量内容')
  lines.push('description: 收录 everything-claude-code 仓库中受 Git 管理的 Markdown 内容，便于在 ai80-net 内容站中检索与阅读。')
  lines.push('---')
  lines.push('')
  lines.push('# Claude Code 配置库全量内容')
  lines.push('')
  lines.push('- 上游仓库：`' + sourceUrl + '`')
  lines.push('- 本地源路径：`' + sourcePath + '`')
  lines.push('- 同步提交：`' + sourceCommit + '`')
  lines.push('- Markdown 文件总数：`' + filePaths.length + '`')
  lines.push('- 可直接访问文档数：`' + visiblePaths.length + '`')
  lines.push('')
  lines.push('## 快速入口')
  lines.push('')
  const quick = ['README.md', 'README.zh-CN.md', 'CHANGELOG.md', 'COMMANDS-QUICK-REF.md', 'AGENTS.md']
  for (const item of quick) {
    if (visiblePaths.includes(item)) {
      lines.push('- [' + item + '](' + encodePathForMarkdownLink(item) + ')')
    }
  }
  lines.push('')
  lines.push('## 全量目录')
  lines.push('')
  lines.push('不展示以 `.` 开头目录中的文档链接（这些路径在 VitePress 中不可直接路由，点击会 404）。')
  lines.push('')

  for (const [group, files] of grouped) {
    lines.push('### ' + group + '（' + files.length + '）')
    lines.push('')
    for (const file of files) {
      const display = group === '(root)' ? file : file.slice(group.length + 1)
      lines.push('- [' + display + '](' + encodePathForMarkdownLink(file) + ')')
    }
    lines.push('')
  }

  await fs.writeFile(path.join(destRoot, 'index.md'), lines.join('\n'), 'utf8')
}

async function cloneRepo(repoUrl) {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ecc-sync-'))
  await execFile('git', ['clone', '--depth=1', repoUrl, tmpDir])
  return tmpDir
}

async function listDirMdFiles(dirPath) {
  let entries
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true })
  } catch {
    return []
  }
  return entries
    .filter(e => e.isFile() && e.name.endsWith('.md'))
    .map(e => e.name.replace(/\.md$/, ''))
    .sort((a, b) => a.localeCompare(b))
}

async function listSkillDirs(skillsPath) {
  let entries
  try {
    entries = await fs.readdir(skillsPath, { withFileTypes: true })
  } catch {
    return []
  }
  const result = []
  for (const e of entries) {
    if (!e.isDirectory()) continue
    const skillFile = path.join(skillsPath, e.name, 'SKILL.md')
    try {
      await fs.access(skillFile)
      result.push(e.name)
    } catch {
      // no SKILL.md, skip
    }
  }
  return result.sort((a, b) => a.localeCompare(b))
}

async function listRulesGroups(rulesPath) {
  let entries
  try {
    entries = await fs.readdir(rulesPath, { withFileTypes: true })
  } catch {
    return []
  }
  const groups = []
  for (const e of entries) {
    if (!e.isDirectory()) continue
    const files = await listDirMdFiles(path.join(rulesPath, e.name))
    if (files.length > 0) {
      groups.push({ name: e.name, files })
    }
  }
  return groups.sort((a, b) => a.name.localeCompare(b.name))
}

function sidebarItem(text, link) {
  return `    { text: ${JSON.stringify(text)}, link: ${JSON.stringify(link)} },`
}

async function writeSidebarFile(destRoot, sidebarOutPath) {
  const base = '/claude-code-content'

  const [agents, skills, commands, rulesGroups] = await Promise.all([
    listDirMdFiles(path.join(destRoot, 'agents')),
    listSkillDirs(path.join(destRoot, 'skills')),
    listDirMdFiles(path.join(destRoot, 'commands')),
    listRulesGroups(path.join(destRoot, 'rules')),
  ])

  const lines = []
  lines.push('// Auto-generated by scripts/sync-ecc-upstream.mjs — do not edit by hand')
  lines.push("import type { DefaultTheme } from 'vitepress'")
  lines.push('')
  lines.push('export const claudeCodeContentSidebar: DefaultTheme.SidebarItem[] = [')

  // Quick links
  lines.push('  {')
  lines.push("    text: 'Claude Code 配置库',")
  lines.push('    items: [')
  lines.push(sidebarItem('目录首页', `${base}/`))
  lines.push(sidebarItem('README', `${base}/README`))
  lines.push(sidebarItem('README 中文', `${base}/README.zh-CN`))
  lines.push(sidebarItem('命令速查表', `${base}/COMMANDS-QUICK-REF`))
  lines.push(sidebarItem('故障排查', `${base}/TROUBLESHOOTING`))
  lines.push('    ],')
  lines.push('  },')

  // Agents
  lines.push('  {')
  lines.push(`    text: 'Agents（${agents.length}）',`)
  lines.push('    collapsed: true,')
  lines.push('    items: [')
  for (const name of agents) {
    lines.push(sidebarItem(name, `${base}/agents/${name}`))
  }
  lines.push('    ],')
  lines.push('  },')

  // Skills
  lines.push('  {')
  lines.push(`    text: 'Skills（${skills.length}）',`)
  lines.push('    collapsed: true,')
  lines.push('    items: [')
  for (const name of skills) {
    lines.push(sidebarItem(name, `${base}/skills/${name}/SKILL`))
  }
  lines.push('    ],')
  lines.push('  },')

  // Commands
  lines.push('  {')
  lines.push(`    text: 'Commands（${commands.length}）',`)
  lines.push('    collapsed: true,')
  lines.push('    items: [')
  for (const name of commands) {
    lines.push(sidebarItem(name, `${base}/commands/${name}`))
  }
  lines.push('    ],')
  lines.push('  },')

  // Rules (nested by language)
  lines.push('  {')
  lines.push(`    text: 'Rules（${rulesGroups.length} 语言）',`)
  lines.push('    collapsed: true,')
  lines.push('    items: [')
  for (const { name, files } of rulesGroups) {
    lines.push('    {')
    lines.push(`      text: ${JSON.stringify(name)},`)
    lines.push('      collapsed: true,')
    lines.push('      items: [')
    for (const file of files) {
      lines.push(`      ` + sidebarItem(file, `${base}/rules/${name}/${file}`))
    }
    lines.push('      ],')
    lines.push('    },')
  }
  lines.push('    ],')
  lines.push('  },')

  lines.push(']')
  lines.push('')

  await fs.writeFile(sidebarOutPath, lines.join('\n'), 'utf8')
  console.log('Generated sidebar:', sidebarOutPath)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const cwd = process.cwd()

  let clonedTmpDir = null
  if (args.sourceUrl) {
    console.log('Cloning from:', args.sourceUrl)
    clonedTmpDir = await cloneRepo(args.sourceUrl)
    args.source = clonedTmpDir
  }

  const sourceRoot = path.resolve(cwd, args.source)
  const destRoot = path.resolve(cwd, args.dest)

  const [sourceUrl, sourceCommit, trackedFilesRaw] = await Promise.all([
    git(sourceRoot, 'remote', 'get-url', 'origin'),
    git(sourceRoot, 'rev-parse', 'HEAD'),
    git(sourceRoot, 'ls-files'),
  ])

  const trackedFiles = trackedFilesRaw
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
  const markdownPaths = trackedFiles.filter(isMarkdownFile)

  await fs.rm(destRoot, { recursive: true, force: true })
  await fs.mkdir(destRoot, { recursive: true })

  for (const relativePath of trackedFiles) {
    await copyFilePreserveTree(sourceRoot, destRoot, relativePath)
  }
  const placeholderCount = await backfillMissingImageAssets(destRoot, markdownPaths)

  const sidebarOutPath = path.resolve(cwd, 'docs/.vitepress/sidebar-claude-code-content.ts')

  await Promise.all([
    writeIndexFile({
      destRoot,
      sourceUrl,
      sourcePath: sourceRoot,
      sourceCommit,
      filePaths: markdownPaths,
    }),
    writeSidebarFile(destRoot, sidebarOutPath),
  ])

  if (clonedTmpDir) {
    await fs.rm(clonedTmpDir, { recursive: true, force: true })
    console.log('Cleaned up temp clone:', clonedTmpDir)
  }

  console.log('Synced tracked files:', trackedFiles.length)
  console.log('Synced Markdown files:', markdownPaths.length)
  console.log('Placeholder assets created:', placeholderCount)
  console.log('Source commit:', sourceCommit)
  console.log('Destination:', destRoot)
}

main().catch(error => {
  console.error(error.message)
  process.exit(1)
})
