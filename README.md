# Agentic AI Wiki

A bilingual (English / 中文) field guide to building agentic AI systems —
**https://menuagentic.com**

700+ pages in each language, written for working engineers: how agents are
built, the ecosystem they run on, and what it takes to ship them to production.

| Section | What's in it |
| --- | --- |
| [Field Guide](https://menuagentic.com/field-guide/) | The flagship series — build an agent loop from scratch, then take it to production |
| [Concepts](https://menuagentic.com/concepts/) | AI and agentic AI explained — a plain-language encyclopedia from foundations to the agent loop |
| [Deep-Dives](https://menuagentic.com/deep-dives/) | Engineering fundamentals — architectures, memory, RAG, protocols, tools, reasoning, training, multi-agent |
| [Playbooks](https://menuagentic.com/playbooks/) | Applied recipes for agents in specific domains and roles — coding, voice, customer support, research |
| [Operations](https://menuagentic.com/operations/) | How to run agents in production — evals, observability, cost, safety, governance |
| [Books](https://menuagentic.com/books/) | Book-length handbooks — *From SDLC to AI-Driven SDLC* and *Last Mile* |
| [AI Blog](https://menuagentic.com/blogs/) | Long-form posts, comparisons and field notes from the agentic frontier |

Every page exists in both languages; switch with the language toggle or the
`/zh/` prefix.

## Develop

- `npm install`
- `npm run dev` — local dev server
- `npm run og:build` — regenerate the social-share OG card PNGs from the template
- `npm run build` — production build to `dist/` (runs `og:build` then `astro build`)
- `npm run verify` — assert bilingual completeness, no broken internal links, OG meta on every page
- `npm test` — unit tests (extraction, manifests, i18n, OG catalog, search index shape)
- `npm run test:design` — build, then check the design system (tokens, layout, typography) against `dist/` (needs `npx playwright install chromium` once)
- `npm run search:index` — rebuild the Pagefind search index against `dist/`
- `npm run test:search` — assert the search index covers the built pages
- `npm run indexnow` — submit changed URLs to IndexNow (CI runs this on pushes to `main`)

## Content

- **Field Guide chapters** — `src/content/field-guide/{en,zh}/<page>.html`, ordered by `src/content/field-guide/manifest.ts`.
- **Concepts** — `src/content/concepts/{en,zh}/<slug>.html`, registered in `src/content/concepts/manifest.ts`.
- **Deep-Dives** — `src/content/deep-dives/{en,zh}/<slug>.html`, with one group file per topic under `src/content/deep-dives/groups/`.
- **Playbooks** — `src/content/playbooks/{en,zh}/<slug>.html`, grouped under `src/content/playbooks/groups/`.
- **Operations** — `src/content/operations/{en,zh}/<slug>.html`, grouped under `src/content/operations/groups/`.
- **Books** — `src/content/books/<book>/{en,zh}/<chapter>.html`, chapters listed in `src/content/books/<book>/manifest.ts`; shelf order in `src/content/books/index.ts`.
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

Every pull request must pass the required **`gates`** check in GitHub Actions
(`npm run build`, `npm test`, `npm run test:design`) before it can merge.

Auto-deploys on push to `main` via Vercel (framework: Astro, output: `dist/`).
The Vercel build runs `npm run build && npm run verify && npm run search:index && npm run test:search`.
