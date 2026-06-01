# Localize external images and clean advanced topics design

## Scope

This change affects VitePress content under `docs/`.

Image localization applies to Markdown content across `docs/**/*.md`. Advanced-topic cleanup is limited to the three sections listed under the top navigation item `进阶专题`:

- `docs/prompt-engineering/`
- `docs/comparisons/`
- `docs/industry/`

## Image localization

Scan Markdown files for external image references, including Markdown image syntax, HTML `<img>` tags, and bare image URLs when they use `http://` or `https://`.

Download external images into:

```text
docs/.vitepress/public/assets/images/localized/
```

Use deterministic filenames based on source host and URL hash to avoid collisions. Replace content references with root-relative VitePress public paths:

```text
/assets/images/localized/<filename>
```

If an image cannot be downloaded, leave the original URL unchanged and report it in a failure list.

## Advanced-topic cleanup

Only evaluate Markdown articles in:

- `docs/prompt-engineering/`
- `docs/comparisons/`
- `docs/industry/`

Keep an article when its path, frontmatter title/description, headings, or early body clearly references Claude, Anthropic, or Claude Code. Also keep explicit comparison articles where Claude is part of the comparison.

Delete articles that are clearly unrelated to Claude after checking those signals. After deletion, remove stale links from section indexes and sidebar/navigation files when present.

## Validation

After implementation:

1. Check remaining external image references in Markdown.
2. Check for links pointing to deleted articles.
3. Run `npm run build`.

## Safety

Do not delete files outside the three advanced-topic directories. Do not modify generated upstream content unless it is directly referenced by the site navigation and necessary to remove stale links.
