# README, repo metadata & branch cleanup — design

Date: 2026-10-18

## Problem

- The README (last touched 2026-07-28) is contributor-only, omits the Books section and the
  `test:design` / `test:search` / `indexnow` scripts, hard-codes "14" OG cards, and says
  nothing to a visitor about what the site is.
- The GitHub description still reads "walks you through writing an agent loop from scratch in
  4 chapters" — the site is now ~720 pages per language across seven sections. No topics set.
- 87 remote branches. Squash-merging means `git branch -r --merged` reports none of them.

## Decisions

### 1. README — readers first, then contributors

Top block (new):
- Title, one-line pitch, live-site link (https://menuagentic.com).
- A table of the seven sections — Field Guide, Concepts, Deep-Dives, Playbooks, Operations,
  Books, AI Blog — each with a one-phrase summary and its site URL.
- One rounded size claim ("700+ pages in each language"). No per-section counts: the daily
  batch would make them stale within a day.

Contributor sections (kept, corrected):
- **Develop** — add `test:design`, `test:search`, `indexnow`; drop the "14" from the OG line.
- **Content** — add Books: `src/content/books/<book>/{en,zh}/`, chapter list in
  `<book>/manifest.ts`, shelf order in `src/content/books/index.ts`.
- **Automation** — unchanged.
- **Deploy** — add the required GitHub Actions `gates` check (build + test + test:design)
  alongside the existing Vercel build line.

### 2. Repo metadata (`gh repo edit`)

- Description: "Bilingual (EN/中文) field guide to building agentic AI systems — 700+ pages of
  concepts, deep-dives, playbooks, operations guides, books and an AI blog. Astro static site,
  partly written by a daily Claude Code routine."
- Homepage unchanged: https://menuagentic.com/
- Topics: `agentic-ai`, `ai-agents`, `llm`, `claude-code`, `astro`, `knowledge-base`, `bilingual`.

### 3. Branch cleanup — merged only

- Delete every remote branch whose PR state is `MERGED`, sourced from
  `gh pr list --state all`, not from git ancestry. 84 branches as of 2026-10-18.
- Guard: skip any branch that is also the head of an OPEN PR.
- Then `git fetch --prune`.
- Explicitly **out of scope**: PR #132 / `content/batch-2026-07-30` (open),
  `research/site-enhancements-2026-05-19` (no PR, unmerged work, local + remote), and the
  untracked `d.ts` / `r.ts` in the repo root. All left untouched.

## Delivery & verification

- README + this spec in one PR from `.worktrees/readme-cleanup` (branch `docs/readme-cleanup`).
- `npm run verify` locally; CI `gates` green before squash-merge; then remove the worktree and
  branch manually (see the `--delete-branch` gotcha).
- Metadata: confirm with `gh repo view --json description,repositoryTopics`.
- Branches: `git branch -r` afterwards should list only `main`, `content/batch-2026-07-30`,
  `research/site-enhancements-2026-05-19`.
