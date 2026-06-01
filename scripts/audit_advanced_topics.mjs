#!/usr/bin/env node

import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(process.cwd(), 'docs')
const TARGET_DIRS = ['prompt-engineering', 'comparisons', 'industry']
const EXCLUDED_NAME = 'index.md'
const MAX_BODY_LINES = 80
const SCAN_LIMIT = 200
const CLAUDE_KEYWORDS = ['claude code', 'anthropic', 'claude']
const COMPARISON_MARKERS = ['vs', '对比', '比较']
const OTHER_VENDOR_KEYWORDS = [
  'copilot',
  'cursor',
  'codex',
  'gpt',
  'chatgpt',
  'gemini',
  'windsurf',
  'openai',
  'manus',
  'deepseek',
  'qwen',
  'trae',
  'cline',
  'jetbrains',
  'bolt',
  'lovable',
  'notebooklm',
  'grok',
  'o3',
  'o4',
]

async function walkMarkdownFiles(rootDir, relativeDir) {
  const files = []
  const startDir = path.join(rootDir, relativeDir)
  const stack = [startDir]

  while (stack.length > 0) {
    const current = stack.pop()
    const entries = await fs.readdir(current, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(fullPath)
        continue
      }
      if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== EXCLUDED_NAME) {
        files.push(fullPath)
      }
    }
  }

  return files
}

function readFirstLines(text, maxLines) {
  return text.split(/\r?\n/).slice(0, maxLines)
}

function extractFrontmatter(lines) {
  if (lines.length === 0 || lines[0].trim() !== '---') {
    return { title: null, description: null, endIndex: -1 }
  }

  let title = null
  let description = null
  let endIndex = -1

  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i]
    if (line.trim() === '---') {
      endIndex = i
      break
    }

    const titleMatch = line.match(/^title:\s*(.*)$/i)
    if (titleMatch && title === null) {
      title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '')
      continue
    }

    const descriptionMatch = line.match(/^description:\s*(.*)$/i)
    if (descriptionMatch && description === null) {
      description = descriptionMatch[1].trim().replace(/^['"]|['"]$/g, '')
    }
  }

  return { title, description, endIndex }
}

function extractBody(lines) {
  const body = []
  let seenNonBlank = false

  for (const line of lines) {
    if (!seenNonBlank && line.trim().length === 0) {
      continue
    }
    seenNonBlank = true
    body.push(line)
  }

  return body.filter(line => !line.includes('本文属于'))
}

function extractHeadings(lines) {
  const headings = []
  for (const line of lines) {
    const match = line.match(/^#{1,6}\s+(.*)$/)
    if (match) {
      headings.push(match[1].trim())
    }
  }
  return headings
}

function normalizeForScan(parts) {
  return parts.filter(Boolean).join('\n').toLowerCase()
}

function getSlug(filePath) {
  return path
    .relative(ROOT, filePath)
    .replace(/\\/g, '/')
    .replace(/\.md$/i, '')
    .toLowerCase()
}

function isClearClaudeComparison(scanText, slug) {
  const hasComparisonMarker = COMPARISON_MARKERS.some(marker => scanText.includes(marker))
  const hasClaudeReference = CLAUDE_KEYWORDS.some(keyword => scanText.includes(keyword))
  const hasOtherVendor = OTHER_VENDOR_KEYWORDS.some(keyword => scanText.includes(keyword))
  const slugLooksLikeComparison = /(^|\/)(.*(vs|compare|comparison|对比|比较).*)$/i.test(slug)
  return hasClaudeReference && hasComparisonMarker && (hasOtherVendor || slugLooksLikeComparison)
}

async function analyzeFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf8')
  const firstLines = readFirstLines(raw, SCAN_LIMIT)
  const { title, description, endIndex } = extractFrontmatter(firstLines)

  const contentLines = endIndex >= 0 ? firstLines.slice(endIndex + 1) : firstLines
  const bodyLines = extractBody(contentLines).slice(0, MAX_BODY_LINES)
  const headings = extractHeadings(contentLines)
  const slug = getSlug(filePath)
  const scanText = normalizeForScan([
    slug,
    title,
    headings.join('\n'),
    bodyLines.join('\n'),
    description && !description.includes('本文属于') ? description : null,
  ])

  const referencesClaude = CLAUDE_KEYWORDS.some(keyword => scanText.includes(keyword))
  const clearClaudeComparison = isClearClaudeComparison(scanText, slug)
  const keep = referencesClaude || clearClaudeComparison
  const focusedOnOtherTopics = OTHER_VENDOR_KEYWORDS.some(keyword => scanText.includes(keyword)) && !referencesClaude && !clearClaudeComparison

  return {
    filePath,
    keep,
    deleteCandidate: !keep && focusedOnOtherTopics,
    title,
    description,
    headings,
    slug,
    referencesClaude,
    clearClaudeComparison,
    bodyPreview: bodyLines.slice(0, 8),
  }
}

async function main() {
  const allFiles = []
  for (const dir of TARGET_DIRS) {
    const files = await walkMarkdownFiles(ROOT, dir)
    allFiles.push(...files)
  }

  allFiles.sort((a, b) => a.localeCompare(b))

  const keep = []
  const deleteCandidates = []
  const ambiguousKeep = []

  for (const filePath of allFiles) {
    const result = await analyzeFile(filePath)
    if (result.keep) {
      keep.push(result)
      if (!result.referencesClaude && result.clearClaudeComparison) {
        ambiguousKeep.push(result)
      }
    } else if (result.deleteCandidate) {
      deleteCandidates.push(result)
    }
  }

  console.log('KEEP')
  for (const item of keep) {
    console.log(item.filePath)
  }

  console.log('\nDELETE_CANDIDATE')
  for (const item of deleteCandidates) {
    console.log(item.filePath)
  }

  console.log(`\nKEEP_COUNT ${keep.length}`)
  console.log(`DELETE_CANDIDATE_COUNT ${deleteCandidates.length}`)

  if (ambiguousKeep.length > 0) {
    console.log('\nAMBIGUOUS_KEEP')
    for (const item of ambiguousKeep) {
      console.log(item.filePath)
    }
    console.log(`AMBIGUOUS_KEEP_COUNT ${ambiguousKeep.length}`)
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
