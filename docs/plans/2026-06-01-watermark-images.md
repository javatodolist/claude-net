# Watermark Images Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Embed a centered red `https://code.ai80.vip/` watermark into localized content images without changing image dimensions.

**Architecture:** Add `sharp` as the image processing dependency and create a focused Node script that backs up localized images, overlays centered SVG text onto supported raster formats, and verifies dimensions before and after processing. The script only touches `docs/public/assets/images/localized/` and skips unsupported formats.

**Tech Stack:** Node.js ESM scripts, Sharp, VitePress static assets.

---

### Task 1: Install image processing dependency

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Install sharp**

Run:

```bash
npm install -D sharp
```

Expected:

- `sharp` appears in `devDependencies`.
- `package-lock.json` updates.

**Step 2: Verify dependency loads**

Run:

```bash
node -e "import('sharp').then(() => console.log('sharp ok'))"
```

Expected:

```text
sharp ok
```

---

### Task 2: Add watermark script

**Files:**
- Create: `scripts/watermark_localized_images.mjs`

**Step 1: Create the script**

Implement `scripts/watermark_localized_images.mjs` with these rules:

- Input directory: `docs/public/assets/images/localized/`
- Backup directory: `docs/public/assets/images/localized-original/`
- Process extensions: `.png`, `.jpg`, `.jpeg`, `.webp`
- Skip extensions: `.gif`, `.svg`, and all unsupported formats
- Copy each original file to backup before overwriting, but do not overwrite an existing backup
- Read original metadata width and height
- Build an SVG overlay with:
  - text: `https://code.ai80.vip/`
  - fill: red
  - center position: `x="50%" y="50%"`
  - `text-anchor="middle"`
  - `dominant-baseline="middle"`
  - font size proportional to image width, with a sensible lower and upper bound
- Composite the SVG over the original using sharp
- Write to a temporary file first, then replace the original
- Re-read output metadata and throw if width or height changed
- Print processed, skipped, and failed counts

**Step 2: Run the script**

Run:

```bash
node scripts/watermark_localized_images.mjs
```

Expected:

- Supported raster images are overwritten with centered red watermark.
- Originals are preserved in `docs/public/assets/images/localized-original/`.
- GIF/SVG files are skipped.
- Script reports counts.

---

### Task 3: Validate site build

**Files:**
- Modify only if build reveals a real issue

**Step 1: Run build**

Run:

```bash
npm run build
```

Expected:

- Build completes successfully.

**Step 2: Review image asset changes**

Run:

```bash
git status --short docs/public/assets/images scripts package.json package-lock.json
```

Expected:

- Watermarked images are modified in `localized/`.
- Backups exist in `localized-original/`.
- Script exists.
- Package files include sharp.

---

### Task 4: Report result

**Files:**
- Review only

**Step 1: Summarize**

Report:

- Number of processed images
- Number of skipped images
- Number of failed images
- Build result
- Backup directory path
