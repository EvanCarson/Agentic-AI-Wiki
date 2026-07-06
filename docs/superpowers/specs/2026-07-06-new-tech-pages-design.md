# Design: New Tech Pages — 2026-07 Batch

**Status:** design (pre-slate)
**Date:** 2026-07-06
**Author-of-record:** collaborative session; drafting owned by AI agent

## 1. Problem

The site's content was last extended significantly in early June 2026 (Playbooks,
Operations, RL/trading blog cluster, vector-DB and observability comparisons).
The 2025-2026 landscape has moved on. Three areas in particular now have material
that the site either does not cover or covers at a stale altitude:

- **Frontier model capabilities** — long-context (1M+), reasoning models,
  computer use / browser use, agentic training paradigms, new open-weights
  releases.
- **Agent engineering practice** — evals-in-production, agent benchmarks,
  guardrail patterns, cost/quality/latency at scale, memory architectures,
  new orchestration patterns.
- **Protocols & standards** — MCP maturity, A2A protocol, ACP, new
  tool-calling conventions, structured-output specs.

Additionally, the site has a single MCP essay (`mcp-architecture`) but nothing
on **building good MCP servers, testing them, or MCP patterns/anti-patterns**.
The user has explicitly asked for a dedicated body of MCP content.

## 2. Goal

Produce a slate of **20+ new pages** across three content tracks, then draft and
ship them in three sequential PRs. Research and gap-analysis happen up front;
drafting begins only after a slate is approved.

## 3. Non-goals

- No new Concepts entries (out of scope).
- No changes to Playbooks / Operations / AI Blog surfaces.
- No manifest schema changes (e.g., no new `related: slug[]` field — that's
  P2 in `NAVIGATION-PLAN.md`, a separate project).
- No search / tagging / taxonomy work.
- No visual/design changes beyond what a normal content PR touches.

## 4. Approach

Approach A ("one research pass → single slate → phased drafting"), chosen over
per-surface splits and two-phase gap-map approaches because it matches the
user's stated preference, gives one big scope decision, and keeps drafting
momentum. Risk of a wrong slate is mitigated by the hard approval gate.

### 4.1 Phase 1 — Research & gap analysis

Done in a single research pass. No user gate.

- **Coverage inventory.** Read every entry title/summary in the current
  Concepts, Deep-Dives, and Field Guide manifests. Build a map of what is
  covered vs. glossed vs. missing.
- **Landscape scan (2025-2026)** across the three scope areas, using:
  - Official vendor docs and specs (Anthropic, OpenAI, Google, modelcontextprotocol.io, spec repos).
  - Industry engineering blogs and post-mortems.
  - Context7 for library-specific documentation coverage.
- **MCP deep dive.** Read the current MCP spec + Anthropic MCP docs + several
  notable server implementations to identify what a proper MCP-building /
  testing / patterns curriculum requires beyond `mcp-architecture`.
- **Gap synthesis.** For each landscape topic, decide: covered, stale, missing?
  Missing/stale becomes a candidate page.

### 4.2 Checkpoint 1 — Slate approval (hard gate)

The slate is the single artifact the user approves before any drafting begins.
Structure and content specified in §5. No fragment authoring happens until
this gate is passed.

### 4.3 Phase 2 — Drafting, in three PRs (strictly serial)

- **PR 1 — MCP Deep-Dive group.** Creates `src/content/deep-dives/groups/mcp.ts`
  with the full slate for Track A (6-10 essays). Bilingual fragments for every
  essay. One changelog entry file. All verification gates green.
- **PR 2 — Deep-Dive additions in existing groups.** All new entries appended
  to their target `groups/*.ts` files. Depends on PR 1 merged so xref targets
  into MCP are alive.
- **PR 3 — Field Guide chapters.** New chapter files + `field-guide/manifest.ts`
  update. Depends on PRs 1 & 2 merged so all Deep-Dive link targets exist.

Ordering rationale: PR 3 waits on PR 1 & 2 because Field Guide chapters use
inline `.xref` links into Deep-Dives, and dead references between merges are
disallowed. PR 2 waits on PR 1 for the same reason (MCP xref targets).

Each PR is drafted on a feature branch in an isolated worktree under
`.worktrees/` per the `CLAUDE.md` Workflow section. The main checkout is
never edited directly. After merge: sync local `main` to `origin/main`,
remove the merged worktree and branch, and confirm the live site at
menuagentic.com.

### 4.4 Checkpoint 2 — Per-PR review

Standard code review before merge, per PR. The user reviews content drafts
inline; the per-PR checklist (§7) is expected to pass.

## 5. Slate document

Path: `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md`
Produced at the end of Phase 1; the artifact for Checkpoint 1 approval.

### 5.1 Top matter

- **Cut-line policy** — one sentence: "If time forces a cut, drop `stretch`
  first, then `should`; never cut `must` without re-approval." Priority tags
  are load-bearing, not decorative.

### 5.2 Landscape summary (~½ page)

Three short paragraphs, one per scope area (Frontier capabilities / Agent
engineering / Protocols & standards), naming what "new" means in mid-2026 and
what shifted since existing pages were written. This is the frame the slate
rests on.

### 5.3 Track 1 — MCP Deep-Dive group (new: `groups/mcp.ts`)

- Group blurb (en + zh, one sentence each).
- Track budget: 6-10 entries, ~12k words en + ~12k zh (rough).
- Entries listed per §5.6 line shape.

### 5.4 Track 2 — Deep-Dive additions in existing groups

Per-group subsections (only groups receiving additions). Each subsection lists
proposed entries per §5.6 line shape.

### 5.5 Track 3 — Field Guide chapters

Per new chapter: chapter id, target Part, per §5.6 line shape. Any chapter
whose links depend on a specific Track 2 entry is explicitly noted.

### 5.6 Per-page line shape

```
- <slug>  |  <target group / Part>  |  S/M/L  |  must/should/stretch  |  <one-line summary>
  Gap: <one sentence — either names the existing page that doesn't cover it,
       or names the specific 2026 development that made this topic real>
  Links: <slug-a>, <slug-b>          # 1-2 existing pages this will link to/from
  [⚠ spec-dep | ⚠ benchmark-dep]     # only when applicable
```

Rules for each line:

- **slug** — kebab-case, unique, verified against current manifests to avoid
  collisions.
- **target group / Part** — must be an existing group key (or the new `mcp`
  key), or an existing Field Guide Part.
- **size** — `S` (~600-1000 words) / `M` (~1000-1800) / `L` (~1800-2800). Any
  page that wants to be larger than L is really a subgroup pretending to be one
  entry; split it.
- **priority** — `must` / `should` / `stretch`. See cut-line policy above.
- **links** — if no natural link seed exists, the page is proposed as an
  orphan; that's a signal to question the proposal, not paper over it.
- **volatility** — `⚠ spec-dep` (tied to a specific protocol version) or
  `⚠ benchmark-dep` (leaderboard numbers in body). These pages get a dated
  footer at draft time and are on a shorter re-review cycle.

### 5.7 Draft order & batching

- Explicit ordering: PR 1 (MCP) → PR 2 (Deep-Dives) → PR 3 (Field Guide).
- Any Field Guide chapter whose links depend on a specific Track 2 entry is
  explicitly noted so the dependency is unambiguous at merge time.

### 5.8 What the slate does NOT include

- No page bodies, no HTML fragments.
- No outlines beyond the one-line summary.
- No source URLs (I'll cite specific URLs inside PRs where relevant).
- No i18n copy for group blurbs beyond the one-sentence blurb (full en/zh
  copy is drafted together at implementation).
- No cross-link map beyond the per-line `Links:` seeds; the xref back-pass
  happens at draft time.

## 6. Drafting rules per surface

Baseline: `CLAUDE.md` and `src/content/blogs/AUTHORING.md` govern voice,
structure, `<pre>` handling, `is:global` scoping, FAQ JSON-LD parsing, hook
ledes, and typography. This section only names the surface-specific rules.

### 6.1 Batch A — new MCP Deep-Dive group

- Create `src/content/deep-dives/groups/mcp.ts` — one file, `export default`
  a `Group` with `key: 'mcp'`, an `order`, a bilingual title/blurb, and the
  `entries` array. The aggregator `manifest.ts` picks it up automatically at
  build via glob.
- For each entry: bilingual `<slug>.html` in both `src/content/deep-dives/en/`
  and `.../zh/`. Body-only HTML, existing `guide.css` class vocabulary, hook
  lede per `CLAUDE.md`.
- In-page header line: en `Deep Dive · MCP`, zh `深入解析 · MCP`.
- `<pre>` blocks byte-identical en↔zh (translate prose only). MCP essays will
  lean on code / JSON examples heavily — this rule bites more here than
  average.
- Cross-link back-pass after essays exist: add `.xref` links from curated
  existing pages that should point into MCP (e.g., `mcp-architecture`,
  `tool-calling-standards`, `capability-discovery`, `interop-problem`). One
  link pair per target, per P0 rules in `NAVIGATION-PLAN.md`.

### 6.2 Batch B — Deep-Dive additions in existing groups

- Append entries to the existing `groups/<key>.ts` file (don't create new
  groups except MCP). Preserve existing entry order; new entries go at the
  end unless a specific reading-order argues otherwise (flag in slate).
- Same bilingual + hook-lede rules. `<pre>` byte-identical.
- Volatility-flagged pages get a small dated footer line in both locales
  (en: "*As of July 2026*", zh: "*截至 2026 年 7 月*") — cheap way to signal
  freshness without inventing a "last-reviewed" mechanism.

### 6.3 Batch C — Field Guide chapters

- New file(s) `src/content/field-guide/{en,zh}/<id>.html`. The id follows
  the existing `p/f/e/s/x/r + N` scheme (Part-letter + number within Part).
- Register in `src/content/field-guide/manifest.ts` (`PARTS` + `CHAPTERS`).
  Placement within a Part shifts what appears in the sticky `ChapterSidebar`.
- Field Guide chapters use the `.phase` / `.step` / numbered sub-sections
  idiom — match the closest existing chapter file rather than inventing
  markup.
- Field Guide chapter drafts land LAST because they reference the new
  Deep-Dives via inline `.xref` links; those need to be alive at merge time.

### 6.4 Changelog

- One entry file per PR at
  `src/content/changelog/entries/<merge-date>-<slug>.ts`. `date` = actual
  merge date, verified right before merge (the `CLAUDE.md` rule). Bilingual
  `title` + `items[]`.
- One entry per PR, not per page. A batch of MCP essays lands as one
  changelog file with N bullets, not N files.

## 7. Verification

### 7.1 Automated gates (per PR)

```
npm run build     # static build to dist/ — no new warnings
npm run verify    # bilingual completeness / no orphans
npm test          # extraction + deep-dives-manifest + changelog tests
```

Run locally in the worktree before pushing; Vercel's build gate is the second
net (main auto-deploys on merge, so a green build in review is the last
chance to catch anything).

### 7.2 Self-audit (per PR)

- **Hook lede audit** — every new fragment's first paragraph passes the
  `CLAUDE.md` self-test ("which sentence is doing the eye-catching work?").
  No "TL;DR", no "In this post we'll…".
- **`<pre>` byte-identical audit** — diff each en/zh `<pre>` block
  character-by-character; translate prose only.
- **Xref sanity** — every `.xref` link resolves to a slug in the current
  manifests (locale-correct `/zh/…` inside zh fragments).
- **No dead references** — no essay references a Deep-Dive slug that lands
  in a later PR (would break for a reader between merges).

### 7.3 Per-PR checklist

```
[ ] Bilingual fragments for every new/changed slug
[ ] Manifest updated (group file or field-guide/manifest.ts)
[ ] Hook lede present in both locales, no header labels
[ ] <pre> blocks byte-identical en↔zh
[ ] Changelog entry file at entries/<merge-date>-<slug>.ts, bilingual
[ ] Changelog date == actual merge date (verify at merge time)
[ ] npm run build clean
[ ] npm run verify clean
[ ] npm test clean
[ ] xref back-pass considered (link from existing pages into new ones)
```

## 8. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Slate is wrong — a "gap" is already covered. | Hard gate on slate before drafting. Reject/edit; re-research the specific slot. Cost = 1 session, not 20+ pages of rework. |
| MCP spec drifts between draft and merge. | `⚠ spec-dep` volatility flag + dated footer. Short blurb updated if spec bumps materially before merge. |
| Chinese translations feel machine-literal. | Draft en first, then zh from scratch (not token-by-token). Re-read each zh fragment before commit. |
| Big PR gets a systemic-tone review comment late. | Ship the first 2-3 MCP essays as a "sample" for review inline before drafting the remaining 4-7. Same PR; early tone signal. |
| Field Guide chapter placement wrong — misfits its Part. | Slate names the target Part per chapter; user flags at slate approval, not after drafting. |
| `groups/mcp.ts` merge conflict with parallel content PR. | Track order is strictly serial; no other MCP-touching PR runs in parallel. Track B PR is queued behind PR 1 merging. |

## 9. Rollback

- Every unit is a squash-merged PR with a bilingual changelog entry. Revert
  = `git revert` the PR commit. Content-only, no schema/migration risk.
- Vercel deploys per-push; a revert PR re-deploys within minutes.
- The one non-trivial revert case: PR 1's `groups/mcp.ts` scaffold. Reverting
  PR 1 also erases MCP xref targets that PR 2/3 depend on — if PR 1 needs a
  full revert, PR 2/3 must also be reverted (or the xrefs into MCP stripped).

## 10. Timeline shape (effort-only, calendar-neutral)

- Slate approval — 1 session (research + slate write + user review).
- PR 1 (MCP group) — 1 PR, largest; draft + review + merge.
- PR 2 (Deep-Dive additions) — 1 PR; smaller per-essay effort than MCP but
  spans more groups.
- PR 3 (Field Guide chapters) — 1 PR; small in essay count but requires
  manifest changes and xref back-pass to Track 2 entries.

Strictly serial: PR 1 → PR 2 → PR 3.

## 11. Next step

Invoke the `writing-plans` skill to produce the implementation plan. Plan
scope: Phase 1 (research + slate authoring). PR 1/2/3 drafting is deferred
to plans authored after slate approval, because their concrete task lists
depend on which pages the slate proposes.
