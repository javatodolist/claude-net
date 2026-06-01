# Localize Images And Clean Advanced Topics Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace external image references with local static assets and remove Claude-unrelated articles from advanced topic sections.

**Architecture:** Add a small one-off Node script that scans Markdown content, downloads external images into VitePress public assets, rewrites references, and reports failures. Then use a deterministic content-audit script to identify unrelated advanced-topic Markdown files, delete only confirmed unrelated files, and remove stale links from indexes/sidebar files.

**Tech Stack:** VitePress, Node.js ESM scripts, Markdown files under `docs/`, Git for review.

---

### Task 1: Add external image localization script

**Files:**
- Create: `scripts/localize_external_images.mjs`
- Modify: none

**Step 1: Create the script**

Create `scripts/localize_external_images.mjs` with these responsibilities:

- Recursively scan `docs/**/*.md`.
- Match:
  - Markdown images: `![alt](https://...)`
  - HTML image attributes: `<img src="https://...">`
  - Bare image URLs ending in `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`.
- Skip URLs already under local paths like `/assets/`.
- Download each unique external URL.
- Save files to `docs/.vitepress/public/assets/images/localized/`.
- Generate filenames as `<host>-<sha256-12><ext>`.
- Replace successful URLs with `/assets/images/localized/<filename>`.
- Print summary counts and failed URLs.

**Step 2: Run the script**

Run:

```bash
node scripts/localize_external_images.mjs
```

Expected:

- Creates localized images under `docs/.vitepress/public/assets/images/localized/`.
- Updates Markdown files containing successful external image downloads.
- Prints failures without aborting the whole run.

**Step 3: Inspect changed files**

Run:

```bash
git diff -- docs scripts/localize_external_images.mjs
```

Expected:

- Markdown image URLs are replaced with `/assets/images/localized/...`.
- No unrelated text changes.

---

### Task 2: Audit advanced-topic articles for Claude relevance

**Files:**
- Create: `scripts/audit_advanced_topics.mjs`
- Modify: none

**Step 1: Create the audit script**

Create `scripts/audit_advanced_topics.mjs` to scan only:

- `docs/prompt-engineering/**/*.md`
- `docs/comparisons/**/*.md`
- `docs/industry/**/*.md`

For each Markdown file except `index.md`, read:

- Path
- Frontmatter title/description if present
- First 120 lines of body

Mark as keep if the scanned text contains any case-insensitive keyword:

- `claude`
- `anthropic`
- `claude code`

Mark as candidate-delete otherwise.

Print two lists:

- `KEEP`
- `DELETE_CANDIDATE`

**Step 2: Run audit**

Run:

```bash
node scripts/audit_advanced_topics.mjs
```

Expected:

- Output lists candidate files.
- No files are modified.

**Step 3: Review candidates manually**

Inspect candidate-delete paths before deletion. Keep comparison files where Claude is clearly part of the topic even if the keyword appears later than the first 120 lines.

---

### Task 3: Delete unrelated advanced-topic article files

**Files:**
- Delete: candidate Markdown files from Task 2 only after review
- Modify: none initially

**Step 1: Delete confirmed unrelated files**

Use file deletion only for confirmed unrelated Markdown files in:

- `docs/prompt-engineering/`
- `docs/comparisons/`
- `docs/industry/`

Do not delete:

- `index.md`
- Files outside those directories
- Claude comparison articles
- Anthropic/Claude Code/Agent articles

**Step 2: Check deletion diff**

Run:

```bash
git status --short
```

Expected:

- Deleted files are only in the three allowed directories.

---

### Task 4: Remove stale links from indexes and sidebars

**Files:**
- Modify: `docs/prompt-engineering/index.md` if it links deleted files
- Modify: `docs/comparisons/index.md` if it links deleted files
- Modify: `docs/industry/index.md` if it links deleted files
- Modify: `docs/.vitepress/sidebar.ts` if it links deleted files
- Modify: `docs/.vitepress/nav.ts` only if a whole section becomes empty

**Step 1: Search deleted slugs**

For each deleted file slug, search references in:

- `docs/**/*.md`
- `docs/.vitepress/*.ts`

**Step 2: Remove stale list entries**

Remove only the link/list item referencing the deleted file. Do not rewrite unrelated content.

**Step 3: Verify no stale references remain**

Run a content search for deleted slugs.

Expected:

- No references to deleted article paths remain.

---

### Task 5: Validate image localization and build

**Files:**
- Modify: only if validation finds broken references

**Step 1: Search remaining external image references**

Search Markdown for image references using external URLs.

Expected:

- No external image URLs remain except those previously reported as download failures.

**Step 2: Run build**

Run:

```bash
npm run build
```

Expected:

- Build completes successfully.

**Step 3: Fix build errors if any**

If VitePress reports broken links or missing files, update the exact source file and rerun build.

---

### Task 6: Final review

**Files:**
- Review all changed files

**Step 1: Review diff**

Run:

```bash
git diff --stat
git diff -- docs scripts
```

Expected:

- Changes match the request: localized images, deleted unrelated advanced-topic articles, removed stale references, added scripts.

**Step 2: Report summary**

Report:

- Number of image URLs localized
- Number of download failures
- Number of article files deleted
- Build result
