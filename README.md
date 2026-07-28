# Agentic AI Wiki

A static, bilingual (en/zh) Astro knowledge platform at **https://menuagentic.com**.
Flagship series: The Agentic AI Field Guide.

## Develop

- `npm install`
- `npm run dev` — local dev server
- `npm run og:build` — regenerate the 14 social-share OG card PNGs from the template
- `npm run build` — production build to `dist/` (runs `og:build` then `astro build`)
- `npm run verify` — assert bilingual completeness, no broken internal links, OG meta on every page
- `npm test` — unit tests (extraction, manifests, i18n, OG catalog, search index shape)
- `npm run search:index` — rebuild the Pagefind search index against `dist/`

## Content

- **Field Guide chapters** — `src/content/field-guide/{en,zh}/<page>.html`, ordered by `src/content/field-guide/manifest.ts`.
- **Concepts** — `src/content/concepts/{en,zh}/<slug>.html`, registered in `src/content/concepts/manifest.ts`.
- **Deep-Dives** — `src/content/deep-dives/{en,zh}/<slug>.html`, with one group file per topic under `src/content/deep-dives/groups/`.
- **Playbooks** — `src/content/playbooks/{en,zh}/<slug>.html`, grouped under `src/content/playbooks/groups/`.
- **Operations** — `src/content/operations/{en,zh}/<slug>.html`, grouped under `src/content/operations/groups/`.
- **AI Blog** — `src/content/blogs/{en,zh}/<slug>.html`, one post file per entry under `src/content/blogs/posts/<YYYY-MM-DD>-<slug>.ts`, diagrams in `public/blogs/<slug>/`. See `src/content/blogs/AUTHORING.md`.
- **Changelog** — one file per entry under `src/content/changelog/entries/<YYYY-MM-DD>-<slug>.ts`.

See `CLAUDE.md` for the full content + workflow conventions.

## Automation

Part of this site's content is written and shipped by a **scheduled cloud
agent** — a Claude Code routine that runs daily, picks its own topics by
reading the manifests and changelog for gaps, drafts the pages bilingually,
runs the verification gates, and opens a PR that squash-merges to `main`.

Its prompt is version-controlled in [`docs/routines/`](docs/routines/) rather
than living only in a web console, because a prompt that merges to production
unattended deserves the same review as code. That directory's README explains
the sync rule between the committed copy and the running routine, what the
daily batch is contracted to ship, and which repo facts the prompt depends on.

## Deploy

Auto-deploys on push to `main` via Vercel (framework: Astro, output: `dist/`).
The Vercel build runs `npm run build && npm run verify && npm run search:index && npm run test:search`.
