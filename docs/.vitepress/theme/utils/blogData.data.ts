import { createContentLoader } from 'vitepress'
import { execSync } from 'node:child_process'

interface ArticleData {
  title: string
  url: string
  category: string
  categoryLabel: string
  tag: string
  excerpt: string
  date: number
  cover?: string
}

// 一次性拉取所有文件的最新提交时间，key 为 "docs/blog/xxx.md"
function buildGitTimestampMap(): Map<string, number> {
  const map = new Map<string, number>()
  try {
    const output = execSync(
      'git -c core.quotePath=false log --diff-filter=ACMR --name-only --pretty=format:"%ct" -- docs/',
      { encoding: 'utf8' }
    )
    let ts = 0
    for (const line of output.split('\n')) {
      const t = line.trim()
      if (!t) continue
      if (/^\d{9,11}$/.test(t)) {
        ts = parseInt(t, 10) * 1000
      } else if (t.endsWith('.md') && !map.has(t)) {
        map.set(t, ts)
      }
    }
  } catch {}
  return map
}

const gitTimestamps = buildGitTimestampMap()

// frontmatter date 可能是 YAML 解析出的 Date、ISO 字符串等，统一转毫秒；无法解析返回 null
function toTime(value: unknown): number | null {
  if (!value) return null
  const t = new Date(value as string | number | Date).getTime()
  return Number.isNaN(t) ? null : t
}

const categoryMap: Record<string, string> = {
  'claude-code-guide': 'Claude Code 深度教程',
  'ai-programming-tools': 'AI编程工具指南',
  'ai-tool-guides': 'AI工具使用指南',
  'vibe-coding-tips': 'Vibe Coding 经验技巧',
  'vibe-coding-practice': 'Vibe Coding 项目实战',
  'ai-product-monetization': 'AI产品变现指南',
  'codex-cli': 'Codex CLI',
  'blog': '易安说AI',
}

// blog 工具页，不作为文章列表条目
const BLOG_EXCLUDED_SLUGS = new Set(['index', 'categories', 'tags', 'timeline'])


export default createContentLoader('{claude-code-guide,ai-programming-tools,ai-tool-guides,vibe-coding-tips,vibe-coding-practice,ai-product-monetization,codex-cli,blog}/**/*.md', {
  excerpt: true,
  includeSrc: true,
  transform(rawData): ArticleData[] {
    return rawData
      .map((page) => {
        const url = page.url
        // Extract category from path: /<category>/...
        const parts = url.split('/')
        const categoryKey = parts[1] || ''
        const categoryLabel = categoryMap[categoryKey] || categoryKey

        // Extract tag from sub-directory name
        let tag = ''
        if (parts.length > 3) {
          // Has sub-directory
          const subDir = decodeURIComponent(parts[2] || '')
          // Remove part numbering like "第1部分：" or "第1章："
          tag = subDir.replace(/^第\d+部分[：:]\s*/, '').replace(/^第\d+章[：:]\s*/, '')
        }

        // Extract title from filename
        const filename = decodeURIComponent(parts[parts.length - 1] || '')
          .replace(/\.html$/, '')
          .replace(/\.md$/, '')
          .replace(/^README$/, categoryLabel)
          .replace(/^\d+(\.\d+)?\s*/, '') // Remove numbering prefix

        const title = (page.frontmatter?.title as string) || filename || 'Untitled'

        // Extract cover: frontmatter first, then first image in content
        let cover = page.frontmatter?.cover as string | undefined
        if (!cover && page.src) {
          const imgMatch = page.src.match(/!\[[^\]]*\]\(([^)]+)\)/)
          if (imgMatch) cover = imgMatch[1]
        }

        // Get excerpt - strip HTML tags from createContentLoader's HTML output
        const excerpt = (page.excerpt || '').replace(/<[^>]+>/g, '').trim().slice(0, 200)

        // 发布时间优先取 frontmatter date（真实发布日），缺失时回退 git 最后提交时间。
        // 注意：claude-code-guide 等用 rewrites 改写过 URL，由 URL 反推的 .md 路径不存在，
        // 故不能只依赖 git 时间戳；且批量编辑会刷新 git 时间，用 frontmatter date 更稳定。
        const fmTime = toTime(page.frontmatter?.date)
        // 从 URL 反推 git 文件路径：/blog/foo.html -> docs/blog/foo.md
        const gitPath = 'docs' + decodeURIComponent(url).replace(/\.html$/, '') + '.md'
        const date = fmTime ?? gitTimestamps.get(gitPath) ?? 0

        return {
          title,
          url,
          category: categoryKey,
          categoryLabel,
          tag,
          excerpt,
          date,
          cover,
        }
      })
      .filter((a) => {
        if (!a.url || !a.category) return false
        // 过滤 blog/ 下的工具页（index、categories、tags、timeline）
        if (a.category === 'blog') {
          const slug = decodeURIComponent(a.url.split('/').filter(Boolean).pop() || '').replace(/\.html$/, '')
          if (BLOG_EXCLUDED_SLUGS.has(slug)) return false
        }
        return true
      })
      .sort((a, b) => b.date - a.date)
  },
})

export type { ArticleData }
