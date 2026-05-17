# Agentic AI Wiki

A static Astro knowledge platform. Flagship series: The Agentic AI Field Guide.

## Develop
- `npm install`
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run verify` — assert all chapters present and built
- `npm test` — extraction unit tests

## Content
- Field Guide chapters: `src/content/field-guide/*.html` (extracted verbatim
  from `legacy/`); order/slugs in `src/content/field-guide/manifest.ts`.
- Standalone posts: MDX in `src/content/posts/`.

## Deploy
Auto-deploys on push via Vercel (framework: Astro, output: `dist/`).
