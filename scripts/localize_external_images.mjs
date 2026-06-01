#!/usr/bin/env node

import { promises as fs } from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..')
const DOCS_DIR = path.join(REPO_ROOT, 'docs')
const OUTPUT_DIR = path.join(DOCS_DIR, 'public', 'assets', 'images', 'localized')

const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)]*)\)/g
const HTML_IMAGE_RE = /<img\b[^>]*\bsrc\s*=\s*(['"])(.*?)\1/gi
const BARE_IMAGE_RE = /https?:\/\/[^\s<>'"`]+?\.(?:png|jpe?g|gif|webp|svg)(?:\?[^\s<>'"`)]*)?(?:#[^\s<>'"`)]*)?/gi
const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'])

function sanitizeHost(hostname) {
  return hostname
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '') || 'image'
}

function sha256Short(input) {
  return crypto.createHash('sha256').update(input).digest('hex').slice(0, 12)
}

function isHttpUrl(value) {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function normalizeBareUrl(value) {
  return value.replace(/[.,;:!?]+$/g, '')
}

function parseMarkdownDestination(rawDestination) {
  const trimmed = rawDestination.trim()
  if (!trimmed) return null

  if (trimmed.startsWith('<')) {
    const end = trimmed.indexOf('>')
    if (end === -1) return null
    return {
      url: trimmed.slice(1, end).trim(),
      suffix: trimmed.slice(end + 1),
    }
  }

  let index = 0
  while (index < trimmed.length && !/\s/.test(trimmed[index])) {
    index += 1
  }

  return {
    url: trimmed.slice(0, index).trim(),
    suffix: trimmed.slice(index),
  }
}

function extractImageCandidates(content) {
  const candidates = []
  const seen = new Set()

  for (const match of content.matchAll(MARKDOWN_IMAGE_RE)) {
    const parsed = parseMarkdownDestination(match[2] || '')
    if (!parsed) continue
    const url = parsed.url
    if (!isHttpUrl(url)) continue
    if (!seen.has(url)) {
      seen.add(url)
      candidates.push(url)
    }
  }

  for (const match of content.matchAll(HTML_IMAGE_RE)) {
    const url = (match[2] || '').trim()
    if (!isHttpUrl(url)) continue
    if (!seen.has(url)) {
      seen.add(url)
      candidates.push(url)
    }
  }

  for (const match of content.matchAll(BARE_IMAGE_RE)) {
    const url = normalizeBareUrl(match[0])
    if (!isHttpUrl(url)) continue
    if (!seen.has(url)) {
      seen.add(url)
      candidates.push(url)
    }
  }

  return candidates
}

async function walkMarkdownFiles(dir) {
  const results = []
  const stack = [dir]

  while (stack.length > 0) {
    const current = stack.pop()
    const entries = await fs.readdir(current, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(fullPath)
        continue
      }
      if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(fullPath)
      }
    }
  }

  results.sort((a, b) => a.localeCompare(b))
  return results
}

function extensionFromUrlPath(urlString) {
  try {
    const parsed = new URL(urlString)
    const ext = path.extname(parsed.pathname).toLowerCase()
    return ALLOWED_EXTENSIONS.has(ext) ? ext : null
  } catch {
    return null
  }
}

function extensionFromContentType(contentType) {
  if (!contentType) return null
  const normalized = contentType.toLowerCase().split(';')[0].trim()
  if (normalized === 'image/png') return '.png'
  if (normalized === 'image/jpeg') return '.jpg'
  if (normalized === 'image/jpg') return '.jpg'
  if (normalized === 'image/gif') return '.gif'
  if (normalized === 'image/webp') return '.webp'
  if (normalized === 'image/svg+xml') return '.svg'
  return null
}

async function downloadLocalizedAsset(urlString) {
  const parsedUrl = new URL(urlString)
  const hostPart = sanitizeHost(parsedUrl.hostname)
  const hashPart = sha256Short(urlString)

  const response = await fetch(urlString, {
    redirect: 'follow',
    headers: {
      'user-agent': 'claude-net-localize-external-images/1.0',
      accept: 'image/*,*/*;q=0.8',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const body = Buffer.from(await response.arrayBuffer())
  const contentType = response.headers.get('content-type')

  const ext = extensionFromUrlPath(urlString)
    ?? extensionFromUrlPath(response.url)
    ?? extensionFromContentType(contentType)

  if (!ext) {
    throw new Error('Unable to determine file extension')
  }

  const filename = `${hostPart}-${hashPart}${ext}`
  const outputPath = path.join(OUTPUT_DIR, filename)

  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  await fs.writeFile(outputPath, body)

  return {
    filename,
    outputPath,
  }
}

function rewriteMarkdown(content, urlMap) {
  let next = content

  next = next.replace(MARKDOWN_IMAGE_RE, (fullMatch, altText, rawDestination) => {
    const parsed = parseMarkdownDestination(rawDestination || '')
    if (!parsed) return fullMatch
    const localized = urlMap.get(parsed.url)
    if (!localized) return fullMatch
    return `![${altText}](${localized}${parsed.suffix})`
  })

  next = next.replace(HTML_IMAGE_RE, (fullMatch, quote, src) => {
    const localized = urlMap.get((src || '').trim())
    if (!localized) return fullMatch
    return fullMatch.replace(src, localized)
  })

  next = next.replace(BARE_IMAGE_RE, match => {
    const normalized = normalizeBareUrl(match)
    const localized = urlMap.get(normalized)
    return localized || match
  })

  return next
}

async function main() {
  const files = await walkMarkdownFiles(DOCS_DIR)
  const allUrls = new Set()
  const perFileCandidates = new Map()

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    const candidates = extractImageCandidates(content)
    perFileCandidates.set(file, candidates)
    for (const candidate of candidates) {
      allUrls.add(candidate)
    }
  }

  const localizedMap = new Map()
  const failures = []

  for (const urlString of [...allUrls].sort((a, b) => a.localeCompare(b))) {
    try {
      const result = await downloadLocalizedAsset(urlString)
      localizedMap.set(urlString, `/assets/images/localized/${result.filename}`)
    } catch (error) {
      failures.push({ url: urlString, error: error?.message || String(error) })
      console.error(`FAILED ${urlString} — ${error?.message || String(error)}`)
    }
  }

  const changedFiles = []

  for (const file of files) {
    const original = await fs.readFile(file, 'utf8')
    const rewritten = rewriteMarkdown(original, localizedMap)
    if (rewritten !== original) {
      await fs.writeFile(file, rewritten, 'utf8')
      changedFiles.push(path.relative(REPO_ROOT, file))
    }
  }

  console.log(`Files scanned: ${files.length}`)
  console.log(`Unique external image URLs: ${allUrls.size}`)
  console.log(`Localized count: ${localizedMap.size}`)
  console.log(`Failure count: ${failures.length}`)

  if (changedFiles.length > 0) {
    console.log('Changed files:')
    for (const file of changedFiles) {
      console.log(`- ${file}`)
    }
  } else {
    console.log('Changed files: none')
  }
}

main().catch(error => {
  console.error(error?.message || String(error))
  process.exit(1)
})
