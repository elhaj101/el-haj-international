# Source artwork

Full-resolution masters. **Nothing here is served** — it sits outside `public/`
so it never ends up in the Pages deploy.

`public/` carries the derived WebP that the site actually loads. Re-cut from
these, never from the WebP:

| master | shipped as | how |
|---|---|---|
| `logo-lockup.png` (1400x314) | `logo-lockup.webp` | `cwebp -resize 640 0 -q 90` |
| `logo-lockup-light.png` | `logo-lockup-light.webp` | `cwebp -resize 640 0 -q 90` |
| `logo-icon.png` (512x377) | `logo-icon.webp` | `cwebp -resize 256 0 -q 90` |
| `logo-icon-light.png` | `logo-icon-light.webp` | `cwebp -resize 256 0 -q 90` |
| `container.png` (1531x975, alpha) | `container.webp` | `cwebp -q 82 -alpha_q 90` |
| `container.png` | `container-900.webp` | `cwebp -resize 900 0 -q 80 -alpha_q 90` |
| `closing-port.jpg` (2400x1350) | `closing-port.webp` | `cwebp -resize 1800 0 -q 78` |
| `hero-ship-poster.jpg` (720x1280) | `hero-ship-poster.webp` | `cwebp -q 74` |

The logo resizes are not arbitrary: the lockup renders at most 178x40 CSS and
the icon at most 76x56, so 640px and 256px still leave headroom at dpr 3.

`hero-ship.mp4` has no master here — it was already re-encoded from Ali's
original supply (14.3MB -> 3.8MB, libx264 CRF 28 + faststart, audio dropped).
