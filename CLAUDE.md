# CLAUDE.md

Guidance for AI agents working in this repository.

## Project

Agentic AI Wiki — a static **Astro** site, **bilingual (en/zh)**, auto-deployed to
production by **Vercel on every push to `main`**. Content sections:

- **Field Guide** — `src/content/field-guide/{en,zh}/<page>.html` raw HTML
  fragments, ordered by `src/content/field-guide/manifest.ts`.
- **Concepts** & **Deep-Dives** — `src/content/{concepts,deep-dives}/{en,zh}/<slug>.html`
  fragments, registered in each section's `manifest.ts` (`Entry` with
  `page, slug, title, summary, group` — all `Localized {en, zh}`).
- **Changelog** — curated data module `src/content/changelog.ts` (single page,
  no per-entry routes).
- About/Home/nav copy lives in `src/i18n/ui.ts` (typed `UIStrings`, full `en`
  and `zh`); routes are thin `src/pages/<r>.astro` + `src/pages/zh/<r>.astro`.

## ALWAYS update the changelog

**Whenever you change site content or structure, add an entry to
`src/content/changelog.ts` in the same change (PR).** This is required, not
optional. New section/entries, content edits worth noting, nav/IA changes,
notable accessibility/SEO/design changes — all get a changelog line.

- Newest first. Each entry: `{ date: 'YYYY-MM-DD', title: Localized, items: Localized[] }`.
- Every `title` and every `items[]` bullet must be **bilingual** (`L(en, zh)`),
  with a faithful, fluent Chinese translation — never machine-literal.
- Group related work into one entry; keep bullets concrete and user-facing.
- If you forget and only notice later, add it as a follow-up before merge.

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
