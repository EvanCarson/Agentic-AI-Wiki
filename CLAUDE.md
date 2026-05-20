# CLAUDE.md

Guidance for AI agents working in this repository.

## Project

Agentic AI Wiki — a static **Astro** site, **bilingual (en/zh)**, auto-deployed to
production by **Vercel on every push to `main`**. Content sections:

- **Field Guide** — `src/content/field-guide/{en,zh}/<page>.html` raw HTML
  fragments, ordered by `src/content/field-guide/manifest.ts`.
- **Concepts** — `src/content/concepts/{en,zh}/<slug>.html` fragments,
  registered as a single ordered array in `src/content/concepts/manifest.ts`
  (`Entry` with `page, slug, title, summary, group` — all `Localized {en, zh}`).
- **Deep-Dives** — `src/content/deep-dives/{en,zh}/<slug>.html` fragments;
  registered **one file per group** under `src/content/deep-dives/groups/<key>.ts`
  (each `export default`s a `Group` of entries). `src/content/deep-dives/manifest.ts`
  is a thin aggregator that globs the directory at build time, sorts groups by
  `order`, and exports the same flat `ENTRIES` API as before. To add a group:
  create a new file under `groups/`. To add an essay to an existing group:
  append to that group file's `entries` array. The
  `deep-dives-manifest.test.mjs` test enforces shape, uniqueness, and that
  every registered slug has bilingual `<slug>.html` fragments.
- **Changelog** — one file per entry under
  `src/content/changelog/entries/<YYYY-MM-DD>-<slug>.ts` (each `export default`s
  a `ChangelogEntry`). `src/content/changelog.ts` is a thin aggregator that
  globs the directory at build time. Single page, no per-entry routes.
- About/Home/nav copy lives in `src/i18n/ui.ts` (typed `UIStrings`, full `en`
  and `zh`); routes are thin `src/pages/<r>.astro` + `src/pages/zh/<r>.astro`.

## ALWAYS update the changelog

**Whenever you change site content or structure, add ONE new entry file in
the same PR** at `src/content/changelog/entries/<YYYY-MM-DD>-<short-slug>.ts`,
exporting a `ChangelogEntry` as the default export. Concurrent PRs each add
their own file, so changelog edits **never collide**. This is required, not
optional. New section/entries, content edits worth noting, nav/IA changes,
notable accessibility/SEO/design changes — all get an entry file.

- Each file `export default`s `{ date: 'YYYY-MM-DD', title: Localized, items: Localized[] }`.
  Import the shape + the `L(en, zh)` helper from `../types.ts`. Copy any
  existing file under `entries/` as a template.
- The filename **date prefix MUST equal** the entry's `date` field — the
  `changelog.test.mjs` test enforces this; the aggregator sorts by filename
  descending (newest date first, alphabetical slug tiebreaker within a day).
- `date` is the day the change **actually merges to `main`** (the deploy
  date) — not the day you started drafting. Verify it right before merge:
  if the task spanned midnight or sat in review, rename the file and bump
  the `date` field to the real merge day. A stale changelog date is a
  defect, fix it like any other.
- Every `title` and every `items[]` bullet must be **bilingual** (`L(en, zh)`),
  with a faithful, fluent Chinese translation — never machine-literal.
- Group related work into one entry file; keep bullets concrete and user-facing.
- If you forget and only notice later, add the file as a follow-up before merge.

## Accepted security trade-off

`main` auto-deploys to production on every push, and content fragments are
rendered with `set:html` (unsanitized by design — content is build-time
author-controlled). Consequence: **a content PR is effectively a code PR** —
review content changes with the same scrutiny as code, including any inline
`<script>`/`on*=` handlers. CSP is intentionally not set (AdSense would
require weakening it to little value); the other security headers in
`vercel.json` carry the defense-in-depth.

## Conventions

- Every content entry exists in **both** `en/` and `zh/` with the same
  basename; localized title/summary/group live in `manifest.ts`, not the HTML.
- Fragments are body-only HTML (no doctype/head/script/style/frontmatter) and
  use the existing `src/styles/guide.css` class vocabulary
  (`.phase/.step/.callout/<pre class="standalone">/.c-*`, etc.). Match an
  existing sibling file rather than inventing markup.
- `<pre>` code blocks must be **byte-identical** between the en and zh copies
  (translate prose only, never code/comments).
- Deep-Dive in-page header line: en `Deep Dive · <Group>`, zh `深入解析 · <Group>`.

## Verification gates (must pass before any PR/merge)

```
npm run build     # static build to dist/ — must complete with no new warnings
npm run verify    # bilingual completeness / no orphans
npm test          # extraction unit tests
```

## Workflow

- Work on a feature branch in an isolated git worktree under `.worktrees/`
  (git-ignored); never edit the main checkout directly.
- One consolidated PR per unit of work; squash-merge to `main`.
- Track non-trivial work with a GitHub issue and link/close it from the PR.
- After merge: sync local `main` to `origin/main`, remove the merged worktree
  and branch, and confirm the live site (https://agentic-ai-wiki.vercel.app).
