import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { describe, test } from 'node:test'
import {
  checkStaticAssets,
  collectLocalImageUrls,
  validateEncodedFilenames,
  validateMarkdownImages,
} from './check-static-assets.mjs'

const ROOT = join(import.meta.dirname, '..')

describe('collectLocalImageUrls', () => {
  test('keeps local images and ignores remote plus fenced examples', () => {
    const markdown = `
![ok](/images/foo.webp)
![remote](https://example.com/a.png)
\`\`\`md
![Claude官网注册页](待补充URL)
\`\`\`
`
    assert.deepEqual(collectLocalImageUrls(markdown), ['/images/foo.webp'])
  })
})

describe('validateEncodedFilenames', () => {
  test('rejects public files whose names still contain %20', () => {
    const errors = validateEncodedFilenames([
      '/docs/public/images/aionui-banner-1%20copy.webp',
      '/docs/public/images/ok.webp',
    ])
    assert.equal(errors.length, 1)
    assert.match(errors[0], /aionui-banner-1%20copy\.webp/)
  })
})

describe('validateMarkdownImages', () => {
  test('decodes %20 like Vite, then looks up the file on disk', () => {
    const exists = new Set([
      '/pub/images/code80/Advanced/AionUI/aionui-banner-1 copy.webp',
    ])
    const missing = validateMarkdownImages({
      markdown: '![x](/images/code80/Advanced/AionUI/aionui-banner-1%20copy.webp)',
      sourcePath: 'docs/code80/advanced/AionUI.md',
      publicDir: '/pub',
      existsFn: (filePath) => exists.has(filePath),
    })
    // Vite looks for a space; a literal "%20" filename would miss this lookup.
    assert.deepEqual(missing, [])

    const encodedOnDisk = validateMarkdownImages({
      markdown: '![x](/images/code80/Advanced/AionUI/aionui-banner-1%20copy.webp)',
      sourcePath: 'docs/code80/advanced/AionUI.md',
      publicDir: '/pub',
      existsFn: (filePath) =>
        filePath === '/pub/images/code80/Advanced/AionUI/aionui-banner-1%20copy.webp',
    })
    assert.equal(encodedOnDisk.length, 1)
    assert.match(encodedOnDisk[0], /missing image/)
  })
})

describe('shipped docs assets', () => {
  test('checkStaticAssets accepts the repository docs/public images', () => {
    assert.deepEqual(checkStaticAssets(ROOT), [])
  })

  test('detects the AionUI encoded-filename failure on a fixture tree', () => {
    const fixture = join(tmpdir(), `claude-net-assets-${Date.now()}`)
    mkdirSync(join(fixture, 'docs/public/images/code80/Advanced/AionUI'), { recursive: true })
    mkdirSync(join(fixture, 'docs/code80/advanced'), { recursive: true })
    writeFileSync(
      join(fixture, 'docs/public/images/code80/Advanced/AionUI/aionui-banner-1%20copy.webp'),
      'x',
    )
    writeFileSync(
      join(fixture, 'docs/code80/advanced/AionUI.md'),
      '![x](/images/code80/Advanced/AionUI/aionui-banner-1%20copy.webp)\n',
    )
    const errors = checkStaticAssets(fixture)
    assert.ok(errors.some((error) => error.includes('%20copy.webp')))
    assert.ok(errors.some((error) => error.includes('missing image')))
  })
})
