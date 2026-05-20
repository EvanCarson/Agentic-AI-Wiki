# Vendored fonts (build-time only)

These font files are used by `scripts/build-og.mjs` to render the social-share
OG cards under `public/og/`. They are NOT served to site visitors — only the
PNG output is. Sourced from Google Fonts; license terms live with each font.

| file | family | weight | source |
|---|---|---|---|
| Fraunces-Light.ttf | Fraunces | 300 | https://fonts.google.com/specimen/Fraunces |
| Inter-Regular.otf | Inter | 400 | https://fonts.google.com/specimen/Inter |
| JetBrainsMono-Medium.ttf | JetBrains Mono | 500 | https://fonts.google.com/specimen/JetBrains+Mono |
| NotoSansSC-Regular.otf | Noto Sans SC | 400 | https://fonts.google.com/noto/specimen/Noto+Sans+SC |

## Re-vendoring sources

If you need to update these fonts, use the URLs and paths below:

- **Fraunces-Light.ttf**: `https://github.com/undercasetype/Fraunces/raw/main/fonts/ttf/Fraunces144pt-Light.ttf` (the 144pt optical-size cut; rename to `Fraunces-Light.ttf`)
- **Inter-Regular.otf**: `https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip` (release zip; extract `extras/otf/Inter-Regular.otf`)
- **JetBrainsMono-Medium.ttf**: `https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Medium.ttf`
- **NotoSansSC-Regular.otf**: `https://github.com/notofonts/noto-cjk/raw/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf` (rename to `NotoSansSC-Regular.otf`)

## Important constraints

- Filenames must match exactly — they are hardcoded in `scripts/build-og.mjs`.
- All four files must be present or the build fails.
- These are build-time only; the files themselves are never shipped to visitors.
