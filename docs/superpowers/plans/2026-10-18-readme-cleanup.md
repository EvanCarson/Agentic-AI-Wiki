# README, Repo Metadata & Branch Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a reader-plus-contributor README, a current GitHub description/topics, and delete the 84 squash-merged remote branches.

**Architecture:** README + spec + plan land in one squash-merged PR from `.worktrees/readme-cleanup`. Metadata and branch deletion are `gh`/`git` operations on the remote, no files.

**Tech Stack:** Markdown, `gh` CLI, git.

## Global Constraints

- Repo: `/Users/cq/Git/ai-wiki/Agentic-AI-Wiki`; worktree `.worktrees/readme-cleanup`, branch `docs/readme-cleanup`. Shell is zsh — use absolute paths.
- One rounded size claim only: "700+ pages in each language". No per-section counts.
- Do NOT touch PR #132 / `content/batch-2026-07-30`, `research/site-enhancements-2026-05-19`, or untracked `d.ts` / `r.ts`.
- `gh pr merge --squash` WITHOUT `--delete-branch` (main is checked out in the primary worktree); clean up manually.
- CI `gates` must be green before merge.

---

### Task 1: README rewrite (PR)

**Files:**
- Modify: `README.md` (full replacement)

- [ ] **Step 1: Replace `README.md` with exactly:**

````markdown
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
- `npm run test:design` — build, then check the design system (tokens, layout, typography) against `dist/`
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
````

- [ ] **Step 2: Fact-check the claims before committing**

Run (from the worktree):
```bash
ls src/content/books/*/en >/dev/null && echo books-ok
grep -c '"test:search"\|"test:design"\|"indexnow"' package.json   # expect 3
grep -n 'npm run' .github/workflows/ci.yml                        # expect build, test, test:design
```
If the books layout is not `<book>/{en,zh}/`, fix the Books bullet to match what `ls` shows.

- [ ] **Step 3: Verify gates**

Run: `npm run verify` — expect pass (README is not part of the site, so this is a sanity check).

- [ ] **Step 4: Commit, push, open PR**

```bash
git add README.md docs/superpowers/plans/2026-10-18-readme-cleanup.md
git commit -m "docs: README for readers and contributors; add Books, missing scripts, CI gates"
git push -u origin docs/readme-cleanup
gh pr create --title "docs: refresh README (reader intro, Books, scripts, CI gates)" --body "<summary + attribution>"
```

- [ ] **Step 5: Wait for CI, merge, clean up**

```bash
gh pr checks <n> --watch --fail-fast
gh pr merge <n> --squash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki
git worktree remove .worktrees/readme-cleanup
git branch -D docs/readme-cleanup
git push origin --delete docs/readme-cleanup
git fetch --prune && git merge --ff-only origin/main
```

### Task 2: Repo description & topics

- [ ] **Step 1: Apply**

```bash
gh repo edit --description "Bilingual (EN/中文) field guide to building agentic AI systems — 700+ pages of concepts, deep-dives, playbooks, operations guides, books and an AI blog. Astro static site, partly written by a daily Claude Code routine." \
  --add-topic agentic-ai --add-topic ai-agents --add-topic llm --add-topic claude-code \
  --add-topic astro --add-topic knowledge-base --add-topic bilingual
```

- [ ] **Step 2: Verify**

Run: `gh repo view --json description,homepageUrl,repositoryTopics`
Expected: new description, homepage `https://menuagentic.com/`, 7 topics.

### Task 3: Delete merged remote branches

- [ ] **Step 1: Build the list (MERGED PR heads, minus any OPEN PR head, minus main)**

```bash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki && git fetch --prune -q
S=/private/tmp/claude-501/-Users-cq-Git-ai-wiki/0389b9dc-7cfe-45ac-9585-a8da4deee16a/scratchpad
gh pr list --state all --limit 1000 --json headRefName,state > $S/prs.json
jq -r '[.[]|select(.state=="OPEN")|.headRefName]' $S/prs.json > $S/open.json
git branch -r | sed 's#^ *origin/##' | grep -v -e '^HEAD' -e '^main$' > $S/remote.txt
jq -r --slurpfile open $S/open.json '.[]|select(.state=="MERGED")|.headRefName|select(. as $b|$open[0]|index($b)|not)' $S/prs.json | sort -u > $S/merged.txt
comm -12 $S/remote.txt $S/merged.txt > $S/delete.txt
wc -l < $S/delete.txt   # expect 84 (85 if docs/readme-cleanup still exists remotely)
grep -e 'content/batch-2026-07-30' -e '^research/' $S/delete.txt  # expect no output
```

- [ ] **Step 2: Delete in one push**

```bash
git push origin --delete $(cat $S/delete.txt)
git fetch --prune
```

- [ ] **Step 3: Verify**

Run: `git branch -r`
Expected exactly: `origin/HEAD -> origin/main`, `origin/content/batch-2026-07-30`, `origin/main`, `origin/research/site-enhancements-2026-05-19`.
