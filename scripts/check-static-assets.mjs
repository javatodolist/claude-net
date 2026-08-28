#!/usr/bin/env node
/**
 * 检查 VitePress 构建会加载的本地图片：
 * Vite 会 decodeURIComponent 后再读盘，磁盘上的 "%20" 文件名对不上。
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const IMAGE_RE = /!\[[^\]]*]\(([^)]+)\)/g

export function stripFencedCode(markdown) {
  return markdown.replace(/^```[\s\S]*?^```/gm, '')
}

export function collectLocalImageUrls(markdown) {
  const urls = []
  const body = stripFencedCode(markdown)
  for (const match of body.matchAll(IMAGE_RE)) {
    const raw = match[1].trim().split(/\s+/)[0]
    if (!raw) continue
    if (/^(https?:|data:|mailto:)/i.test(raw)) continue
    urls.push(raw.split('#')[0].split('?')[0])
  }
  return urls
}

export function walkFiles(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue
    const full = join(dir, name)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      walkFiles(full, acc)
    } else {
      acc.push(full)
    }
  }
  return acc
}

export function validateEncodedFilenames(filePaths) {
  const errors = []
  for (const filePath of filePaths) {
    const base = filePath.split(/[\\/]/).pop()
    if (base.includes('%')) {
      errors.push(
        `URL-encoded filename will not match Vite's decoded lookup: ${filePath}`,
      )
    }
  }
  return errors
}

export function validateMarkdownImages({ markdown, sourcePath, publicDir, existsFn }) {
  const errors = []
  for (const url of collectLocalImageUrls(markdown)) {
    if (!url.startsWith('/')) continue
    const decoded = decodeURIComponent(url)
    const fsPath = join(publicDir, decoded.replace(/^\//, ''))
    if (!existsFn(fsPath)) {
      errors.push(`${sourcePath}: missing image ${url} -> ${fsPath}`)
    }
  }
  return errors
}

export function checkStaticAssets(rootDir) {
  const docsDir = join(rootDir, 'docs')
  const publicDir = join(docsDir, 'public')
  const errors = []
  const publicFiles = walkFiles(publicDir)
  errors.push(...validateEncodedFilenames(publicFiles))

  const existsFn = (filePath) => {
    try {
      return statSync(filePath).isFile()
    } catch {
      return false
    }
  }

  for (const filePath of walkFiles(docsDir)) {
    if (!filePath.endsWith('.md')) continue
    const markdown = readFileSync(filePath, 'utf8')
    errors.push(
      ...validateMarkdownImages({
        markdown,
        sourcePath: filePath,
        publicDir,
        existsFn,
      }),
    )
  }
  return errors
}

const invokedDirectly =
  Boolean(process.argv[1]) && pathToFileURL(process.argv[1]).href === import.meta.url

if (invokedDirectly) {
  const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
  const errors = checkStaticAssets(rootDir)
  if (errors.length > 0) {
    console.error('静态资源检查失败（vitepress build 会在 decodeURI 后找不到文件）：')
    for (const error of errors) {
      console.error(` - ${error}`)
    }
    process.exit(1)
  }
}
