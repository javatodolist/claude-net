/**
 * 查看翻译进度
 * 用法：npm run status
 */

import fs from 'node:fs'
import path from 'node:path'
import { DOCS_MAP } from './docs-map.mjs'

const PROJECT_ROOT = '/Volumes/SSD/ssd-code/github/ai80-net'
const GUIDE_DIR = path.join(PROJECT_ROOT, 'docs/claude-code-guide')
const PROGRESS_FILE = path.join(PROJECT_ROOT, 'scripts/translate/progress.json')

let progress = { completed: [], failed: [] }
try {
  progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'))
} catch {}

const groups = {
  '入门与概览': [],
  '使用环境': [],
  '核心功能': [],
  '扩展功能': [],
  'CI/CD': [],
  '企业部署': [],
  '安全合规': [],
  '参考': [],
}

for (const doc of DOCS_MAP) {
  const targetPath = path.join(GUIDE_DIR, doc.target + '.md')
  const done = progress.completed.includes(doc.source) || fs.existsSync(targetPath)
  const status = done ? '✅' : `⬜ [P${doc.priority}]`

  const t = doc.target
  let group = '参考'
  if (t.includes('第1部分')) group = '入门与概览'
  else if (t.includes('第2部分') || t.includes('第8章')) group = t.includes('CI') || t.includes('GitHub') || t.includes('GitLab') || t.includes('Headless') || t.includes('远程') ? 'CI/CD' : '核心功能'
  else if (t.includes('第3部分')) group = '核心功能'
  else if (t.includes('第4部分')) group = '扩展功能'
  else if (t.includes('第5部分')) group = '扩展功能'
  else if (t.includes('第6部分')) group = '扩展功能'
  else if (t.includes('第7部分')) group = '核心功能'
  else if (t.includes('第9部分')) group = '企业部署'

  groups[group].push({ ...doc, status, done })
}

let totalDone = 0
let totalPending = 0

console.log('='.repeat(60))
console.log('📊 文档翻译进度')
console.log('='.repeat(60))

for (const [groupName, docs] of Object.entries(groups)) {
  if (docs.length === 0) continue
  const done = docs.filter(d => d.done).length
  totalDone += done
  totalPending += docs.length - done

  console.log(`\n### ${groupName} (${done}/${docs.length})`)
  for (const doc of docs) {
    console.log(`  ${doc.status} ${doc.source} → ${doc.sidebarText}`)
  }
}

console.log('\n' + '='.repeat(60))
const pct = Math.round((totalDone / DOCS_MAP.length) * 100)
const bar = '█'.repeat(Math.round(pct / 2)) + '░'.repeat(50 - Math.round(pct / 2))
console.log(`进度: [${bar}] ${pct}%`)
console.log(`完成: ${totalDone} / ${DOCS_MAP.length}  |  待翻译: ${totalPending}`)
console.log('='.repeat(60))
