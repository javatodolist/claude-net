# Watermark content images design

## Scope

Add embedded text watermarks to localized content images only:

```text
docs/public/assets/images/localized/
```

Do not process site icons, logos, avatars, QR codes, or images outside this directory.

## Watermark behavior

Watermark text:

```text
https://code.ai80.vip/
```

The watermark is written into the image file itself. Image dimensions must not change. The original image content must not be resized, cropped, rotated, or otherwise adjusted. The only intended visual change is a centered red text overlay.

## Supported formats

Process:

- PNG
- JPG / JPEG
- WebP

Skip:

- GIF, to avoid breaking animation
- SVG, to avoid XML/rendering compatibility issues
- Any unsupported image type

## Safety

Before overwriting images, copy the original localized images into:

```text
docs/public/assets/images/localized-original/
```

The watermark script should skip files that are already backed up and can be rerun without overwriting backups.

## Validation

After watermarking:

1. Confirm processed image dimensions are unchanged.
2. Report processed and skipped counts.
3. Run `npm run build`.
