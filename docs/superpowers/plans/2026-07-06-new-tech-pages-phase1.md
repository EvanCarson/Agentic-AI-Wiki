# New Tech Pages — Phase 1 (Research + Slate) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce an approved slate of 20+ new pages for the AI Wiki, covering MCP building/testing, 2025-26 frontier model capabilities, agent engineering practice, and protocols/standards. The slate is the single artifact the user approves as a hard gate before Phase 2 drafting begins.

**Architecture:** Two working files under `docs/superpowers/specs/`. One consolidated research file accumulates inventory, landscape findings, and gap synthesis across all four topic areas. The slate file is written last, drawing from the gap synthesis. All work happens in the existing `.worktrees/plan-new-tech-pages/` worktree; each task commits.

**Tech Stack:** WebSearch, WebFetch, `mcp__claude_ai_Context7__query-docs` for library docs, Read tool for local manifests, Write/Edit for research + slate files, Bash+grep for slug uniqueness verification. Deferred tools loaded via ToolSearch as needed.

**Spec:** `docs/superpowers/specs/2026-07-06-new-tech-pages-design.md` (commit `f23db14`).

---

## File Structure

**Created by this plan:**

- `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` — consolidated research notes. Six sections: coverage inventory, MCP landscape, frontier capabilities, agent engineering, protocols & standards, gap synthesis. Holds URLs, quotes, findings. Persisted so future sessions and future phases can trace slate decisions back to sources.
- `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md` — the deliverable. Structure per §5 of the design spec: cut-line policy, landscape summary, three tracks (MCP / Deep-Dives / Field Guide), draft order.

**Read but not modified:**

- `src/content/concepts/manifest.ts`
- `src/content/deep-dives/manifest.ts` and `src/content/deep-dives/groups/*.ts`
- `src/content/field-guide/manifest.ts`
- `src/content/playbooks/**`, `src/content/operations/**`, `src/content/blogs/manifest.ts` (for adjacency awareness, not modification)

---

## Task 1: Scaffold the research file

**Files:**
- Create: `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md`

- [ ] **Step 1: Write the empty research file with section headers.**

Write this exact content to the file:

```markdown
# Research Notes — New Tech Pages (2026-07)

> Working notes for the slate at `2026-07-06-new-tech-pages-slate.md`.
> Not shipped to the site; kept in the repo so slate decisions are traceable.

## 1. Coverage inventory

(populated by Task 2)

## 2. MCP landscape

(populated by Task 3)

## 3. Frontier capabilities landscape

(populated by Task 4)

## 4. Agent engineering practice landscape

(populated by Task 5)

## 5. Protocols & standards landscape

(populated by Task 6)

## 6. Gap synthesis

(populated by Task 7)
```

- [ ] **Step 2: Commit.**

Run:
```bash
git add docs/superpowers/specs/2026-07-06-new-tech-pages-research.md
git commit -m "Research: scaffold notes file for new-tech-pages slate"
```

Expected: one file added, clean commit on `plan/new-tech-pages`.

---

## Task 2: Coverage inventory (populate §1 of research file)

**Files:**
- Modify: `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` (§1 only)
- Read: manifests listed in File Structure above

Goal: a compact per-group table so subsequent gap analysis can answer "is topic X already covered?" quickly.

- [ ] **Step 1: Read Concepts manifest.**

Read `src/content/concepts/manifest.ts` in full. Note every `slug:` and its `group:` label.

- [ ] **Step 2: Read every Deep-Dive group file.**

For each file under `src/content/deep-dives/groups/*.ts`, read it and note `key:`, `name:`, and every entry's `slug:`.

- [ ] **Step 3: Read Field Guide manifest.**

Read `src/content/field-guide/manifest.ts` in full. Note each Part's `key:` and each chapter's `page:` and `title:`.

- [ ] **Step 4: List Playbooks / Operations / Blogs contents.**

Run:
```bash
ls src/content/playbooks/ src/content/operations/ src/content/blogs/posts/
```

You only need entry names, not contents — adjacency awareness.

- [ ] **Step 5: Write §1 of the research file.**

Replace the `(populated by Task 2)` placeholder with a per-surface subsection. For each Deep-Dive group, one line: `<group name> (<N> entries): <2-line summary of what the group covers>`. For Concepts, one line per group. For Field Guide, list Parts with chapter counts. For Playbooks/Operations/Blogs, one line each with entry counts and a phrase describing the theme.

Do NOT list every slug — that duplicates the manifest. Do list slugs that will matter for gap analysis (e.g., existing MCP entry `mcp-architecture`).

- [ ] **Step 6: Commit.**

```bash
git add docs/superpowers/specs/2026-07-06-new-tech-pages-research.md
git commit -m "Research: coverage inventory across Concepts, Deep-Dives, Field Guide, and adjacent surfaces"
```

---

## Task 3: MCP landscape research (populate §2)

**Files:**
- Modify: `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` (§2 only)

Goal: enough understanding of the current MCP ecosystem to propose 6-10 essays beyond `mcp-architecture`. This is the heaviest research task.

- [ ] **Step 1: Load required deferred tools.**

Run:
```
ToolSearch query "select:WebSearch,WebFetch,mcp__claude_ai_Context7__query-docs,mcp__claude_ai_Context7__resolve-library-id" max_results:4
```

- [ ] **Step 2: Search for current MCP spec state.**

WebSearch: `"Model Context Protocol" specification 2026`
WebSearch: `MCP server implementation guide 2026`
WebSearch: `MCP testing best practices`

Note top 5-8 URLs across these searches — anything from modelcontextprotocol.io, Anthropic docs, or credible engineering blogs.

- [ ] **Step 3: Fetch the current spec.**

WebFetch `https://modelcontextprotocol.io/specification` (or the current stable version URL surfaced by search).

Extract into §2 of research file:
- Current stable spec version.
- Participant model (host / client / server) — is it the same as `mcp-architecture` describes, or has it evolved?
- Resource / tool / prompt object model.
- Transport(s) currently supported (stdio, HTTP/SSE, etc.).
- Versioning and capability-negotiation approach.
- Anything in the current spec that `mcp-architecture` (existing essay) does NOT cover.

- [ ] **Step 4: Fetch Anthropic's MCP documentation.**

WebFetch relevant pages from `https://docs.anthropic.com/en/docs/build-with-claude/mcp` and adjacent MCP pages. Extract server-building guidance, testing recommendations, common integration patterns.

- [ ] **Step 5: Query Context7 for the MCP SDK.**

Run:
```
mcp__claude_ai_Context7__resolve-library-id with query "@modelcontextprotocol/sdk"
```

Then query docs for the resolved library ID with topics: `server`, `testing`, `transport`, `tools`, `resources`.

Note: SDK surface area, testing helpers, notable sub-modules.

- [ ] **Step 6: Fetch 2-3 practitioner writeups.**

WebSearch: `built MCP server production` or `MCP server lessons learned`. Fetch 2-3 that are concrete engineering posts (not marketing).

Extract: pitfalls, patterns, anti-patterns, real bugs encountered.

- [ ] **Step 7: Write §2 of research file.**

Structure §2 as:
- Current spec state (2-3 sentences + version).
- Sub-topics worth an essay — list 8-12 candidates, each a one-liner. Aim wide; filter in Task 7.
- Open questions the site should address (things practitioners get wrong).
- Source URLs (bulleted, at least 6).

- [ ] **Step 8: Commit.**

```bash
git add docs/superpowers/specs/2026-07-06-new-tech-pages-research.md
git commit -m "Research: MCP landscape — spec state, SDK, patterns, practitioner sources"
```

---

## Task 4: Frontier capabilities landscape research (populate §3)

**Files:**
- Modify: `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` (§3 only)

Goal: identify what "frontier model capabilities" means in mid-2026 and where the site is stale.

- [ ] **Step 1: Search for current frontier capabilities.**

WebSearch each in sequence, capturing top 3-5 URLs:
- `long context 1M 2M context window models 2026`
- `computer use browser use agents 2026 production`
- `reasoning models test-time compute 2026`
- `open weights frontier models 2026 releases`

- [ ] **Step 2: Fetch official docs.**

WebFetch: Anthropic long-context/reasoning docs, OpenAI reasoning model docs, Google Gemini docs for context / thinking. Extract: current context window ceilings, reasoning-model API surface, computer-use/browser-use APIs.

- [ ] **Step 3: Fetch open-weights release notes.**

WebFetch 2-3 recent notable open-weights model release pages (e.g., latest Qwen, Llama, DeepSeek, Mistral). Note: parameter counts, capability claims, licensing shifts.

- [ ] **Step 4: Fetch 2-3 practitioner writeups on real-world use.**

WebSearch: `computer use agents production evaluation`. Fetch 2-3 substantive posts.

- [ ] **Step 5: Write §3 of research file.**

Structure:
- Landscape summary (3-5 sentences on what's shifted).
- Sub-topics worth an essay — 8-12 candidates as one-liners.
- Existing site slugs that are stale on this material (cite from Task 2 inventory).
- Source URLs.

- [ ] **Step 6: Commit.**

```bash
git add docs/superpowers/specs/2026-07-06-new-tech-pages-research.md
git commit -m "Research: frontier capabilities landscape — long context, reasoning, computer use, open weights"
```

---

## Task 5: Agent engineering practice landscape research (populate §4)

**Files:**
- Modify: `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` (§4 only)

- [ ] **Step 1: Search.**

WebSearch in sequence:
- `agent evals in production 2026`
- `SWE-bench GAIA agent leaderboard 2026`
- `agent memory architectures long-term 2026`
- `guardrails patterns LLM agents 2026`
- `agent orchestration patterns 2026`

- [ ] **Step 2: Fetch benchmark leaderboards.**

WebFetch current SWE-bench, GAIA, AgentBench (or successor) leaderboard pages. Note: top scores, notable methods, delta since mid-2025.

- [ ] **Step 3: Fetch practitioner blogs.**

WebFetch 3-5 posts from Anthropic engineering, DeepMind blog, LangChain blog, Braintrust/LangSmith/Phoenix engineering posts. Focus on production-eval, memory, and orchestration content.

- [ ] **Step 4: Query Context7 for major eval frameworks.**

```
mcp__claude_ai_Context7__resolve-library-id with "langsmith"
mcp__claude_ai_Context7__resolve-library-id with "braintrust"
mcp__claude_ai_Context7__resolve-library-id with "arize-phoenix"
```

Query docs for each with topic `evaluation` or `evals`. Note late-2025/2026 API surface changes not covered by the existing `langsmith-vs-braintrust-vs-helicone-vs-arize-phoenix` blog post.

- [ ] **Step 5: Write §4 of research file.**

Same structure as §2/§3: landscape summary, 8-12 sub-topic candidates, stale existing slugs, source URLs.

- [ ] **Step 6: Commit.**

```bash
git add docs/superpowers/specs/2026-07-06-new-tech-pages-research.md
git commit -m "Research: agent engineering practice — evals, benchmarks, memory, guardrails, orchestration"
```

---

## Task 6: Protocols & standards landscape research (populate §5)

**Files:**
- Modify: `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` (§5 only)

- [ ] **Step 1: Search.**

WebSearch:
- `A2A agent-to-agent protocol Google 2026`
- `ACP agent communication protocol 2026`
- `tool calling standard OpenAI Anthropic 2026`
- `structured outputs JSON Schema LLM 2026`

- [ ] **Step 2: Fetch official specs.**

WebFetch: A2A spec repository/docs (Google-published), any published ACP references, current OpenAI tool-calling docs, current Anthropic tool-use docs.

Extract: message model, versioning story, current status (draft / stable / adopted).

- [ ] **Step 3: Write §5 of research file.**

Structure as before. Additionally: for each candidate sub-topic, flag overlap with MCP research from §2 so we don't double-cover in the slate.

- [ ] **Step 4: Commit.**

```bash
git add docs/superpowers/specs/2026-07-06-new-tech-pages-research.md
git commit -m "Research: protocols & standards — A2A, ACP, tool-calling, structured outputs"
```

---

## Task 7: Gap synthesis (populate §6)

**Files:**
- Modify: `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` (§6 only)

Goal: turn raw landscape sub-topics into a filtered candidate list ready for slating.

- [ ] **Step 1: For every sub-topic in §§2-5, mark status.**

Format:
```
- <sub-topic>  |  covered | stale | missing  |  existing slug (if covered/stale)
```

Aim to end with 30-40 marked sub-topics across all four areas.

- [ ] **Step 2: Filter to candidates.**

Every `missing` and `stale` becomes a candidate for the slate. Every `covered` is dropped from further consideration.

- [ ] **Step 3: Assign each candidate to a target surface.**

For each candidate, pick one:
- New MCP Deep-Dive group entry.
- Deep-Dive addition to a specific existing group (name the group key).
- Field Guide chapter (name the target Part).

Some candidates fit multiple; pick the best fit and note the alternative in a parenthetical.

- [ ] **Step 4: Sanity-check counts per track.**

Target: Track 1 (MCP) 6-10, Track 2 (Deep-Dive additions) 8-12, Track 3 (Field Guide) 2-4. Total ≥ 20 must+should combined. If a track is over/under, revisit the sub-topic list.

- [ ] **Step 5: Write §6 of research file.**

A structured list per track. This is the input to Task 8.

- [ ] **Step 6: Commit.**

```bash
git add docs/superpowers/specs/2026-07-06-new-tech-pages-research.md
git commit -m "Research: gap synthesis — candidate page list per track"
```

---

## Task 8: Draft the slate

**Files:**
- Create: `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md`

Goal: the deliverable, per §5 of the design spec.

- [ ] **Step 1: Write header + cut-line policy.**

Start the slate with:

```markdown
# Slate: New Tech Pages (2026-07 batch)

**Status:** proposed — awaiting Checkpoint 1 approval
**Design spec:** `2026-07-06-new-tech-pages-design.md`
**Research:** `2026-07-06-new-tech-pages-research.md`

**Cut-line policy:** If time forces a cut, drop `stretch` first, then `should`;
never cut `must` without re-approval.
```

- [ ] **Step 2: Write the landscape summary.**

Three short paragraphs, one per scope area (Frontier / Agent Engineering / Protocols). Each paragraph names concrete 2025-26 developments (specific model families, benchmark shifts, spec versions). No vague "AI is advancing". Draw from §§3-5 of the research file.

- [ ] **Step 3: Write Track 1 (MCP Deep-Dive group).**

Structure:

```markdown
## Track 1 — MCP Deep-Dive group (new: groups/mcp.ts)

**Group blurb (en):** <one sentence>
**Group blurb (zh):** <one sentence, faithful not literal>
**Track budget:** 6-10 entries, ~<N>k words en + ~<N>k words zh

### Entries

- <slug>  |  mcp  |  S/M/L  |  must/should/stretch  |  <one-line summary>
  Gap: <one sentence>
  Links: <slug-a>, <slug-b>
  [⚠ spec-dep | ⚠ benchmark-dep if applicable]
- ...
```

Draw from §6 of research file for the entries. Word-count in track budget is sum-of-sizes (S=800, M=1400, L=2300 as rough averages).

- [ ] **Step 4: Write Track 2 (Deep-Dive additions in existing groups).**

Structure:

```markdown
## Track 2 — Deep-Dive additions in existing groups

**Track budget:** <N> entries, ~<N>k words en + ~<N>k words zh

### <group-key> (e.g., reasoning-and-test-time-compute)

- <slug>  |  <group-key>  |  S/M/L  |  must/should/stretch  |  <summary>
  Gap: ...
  Links: ...
```

Repeat per group receiving additions. Do not create subsections for groups with no additions.

- [ ] **Step 5: Write Track 3 (Field Guide chapters).**

Structure:

```markdown
## Track 3 — Field Guide chapters

**Track budget:** <N> chapters, ~<N>k words en + ~<N>k words zh

- <id (e.g., f5, x5)>  |  Part <roman/letter>  |  S/M/L  |  must/should/stretch  |  <summary>
  Gap: ...
  Links: ...
  Depends on Track 2 entry: <slug>  (only if applicable)
```

- [ ] **Step 6: Write §5.7 Draft order & batching.**

Restate the strict serial PR order and list any Field Guide chapters that depend on specific Track 2 entries (from Step 5's `Depends on` lines).

- [ ] **Step 7: Verify slug uniqueness against manifests.**

For every proposed slug across all three tracks, run:

```bash
grep -rn "slug: '<proposed-slug>'" src/content/
```

Expected: no matches. If any match, rename the proposed slug in the slate and re-check.

Also run once for slugs that share a suffix accidentally:

```bash
grep -rn "slug: '" src/content/deep-dives/groups/ src/content/concepts/manifest.ts src/content/field-guide/manifest.ts | wc -l
```

Sanity-check the total against your mental count of existing entries.

- [ ] **Step 8: Verify every proposed page has a Links seed.**

Scan the slate: any entry without `Links:` is an orphan candidate. Either add a link seed (from research §§2-5 or coverage inventory) or mark the entry for reconsideration and downgrade to `stretch`.

- [ ] **Step 9: Commit.**

```bash
git add docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md
git commit -m "Slate: draft new-tech-pages proposal — 3 tracks, 20+ pages"
```

---

## Task 9: Slate self-review

**Files:**
- Modify: `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md` (fix any issues inline)

Go through the slate with fresh eyes against the checks below. Fix inline.

- [ ] **Step 1: Cut-line policy visible at top.**

Confirm the cut-line policy sentence is present and priority tags exist on every entry line. If any entry lacks `must/should/stretch`, add.

- [ ] **Step 2: Line-shape compliance.**

Every proposed page has all seven fields: slug, target group/Part, size, priority, one-line summary, Gap, Links. Volatility flag optional. Fix omissions.

- [ ] **Step 3: Volatility flag audit.**

Only apply `⚠ spec-dep` to pages tied to a specific protocol version (e.g., MCP transport specifics). Only apply `⚠ benchmark-dep` to pages with leaderboard numbers in the body. Remove over-flags, add under-flags.

- [ ] **Step 4: Slug uniqueness re-verification.**

Re-run the grep from Task 8 Step 7 for any slugs that changed during self-review.

- [ ] **Step 5: Count check.**

Sum `must + should` across all three tracks (exclude `stretch`). Confirm ≥ 20. If short, promote a `stretch` to `should` OR add a candidate from research §6. If well over 20, mark excess as `stretch` (don't drop).

- [ ] **Step 6: Track 1 count within 6-10.**

Confirm Track 1 (MCP) has 6-10 total entries (must + should + stretch). If over 10, either drop weakest stretch entries or note to the user in the presentation message.

- [ ] **Step 7: Track budget presence.**

Every track has a `Track budget:` line with count and word estimate. Fix missing.

- [ ] **Step 8: Landscape summary readability.**

Read the landscape summary aloud. Passes if it (a) reads in ≤ 60 seconds, (b) names concrete 2025-26 developments, (c) does not use the banned openers ("In this…", "AI agents are everywhere…", "TL;DR"). Rewrite if it fails.

- [ ] **Step 9: Commit any fixes.**

```bash
git add docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md
git commit -m "Slate: self-review pass — line-shape, priorities, counts, volatility"
```

If nothing changed, skip this commit.

---

## Task 10: Present slate for Checkpoint 1 approval

- [ ] **Step 1: Verify branch state.**

Run:
```bash
git log --oneline -12
git status --short
```

Expected: clean working tree; last commits are the slate + self-review + all research commits from Tasks 1-7.

- [ ] **Step 2: Summarize for the user.**

Post a message to the user containing:
- Slate committed at `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md` on branch `plan/new-tech-pages`.
- Research file at `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md`.
- Total counts per track (must / should / stretch broken out).
- 3-5 highlighted `must` entries the user should sanity-check first (pick the ones where the gap is most novel, or where a wrong reading of the landscape would be most expensive).
- Ask for one of: approve, request-edits, reject.

- [ ] **Step 3: Wait for user response.**

Do not begin Phase 2 or invoke any drafting skill until an explicit approve.

- [ ] **Step 4a (if approved):** Mark Checkpoint 1 passed. Note that PR 1 (MCP group drafting) requires a fresh plan authored by invoking `superpowers:writing-plans` again, this time scoping to Track 1 of the approved slate.

- [ ] **Step 4b (if edits requested):** Incorporate edits into the slate. Re-run Task 9 self-review. Re-present at Task 10 Step 2.

- [ ] **Step 4c (if rejected):** Return to design spec; do not draft PR 1 plan. Coordinate with user on what changes to the design spec are required before re-drafting the slate.

---

## Notes for the executor

- The design spec at `docs/superpowers/specs/2026-07-06-new-tech-pages-design.md` is authoritative. If any step here conflicts with the spec, follow the spec and flag the plan for update.
- All work is in the `.worktrees/plan-new-tech-pages/` worktree. Do not `cd` back to the main checkout.
- Research file is a working artifact but IS committed — it documents the reasoning behind the slate so the user (or a future session) can trace decisions back.
- The slate does NOT contain source URLs; those live in the research file. This is intentional (design spec §5.8).
- Do NOT begin drafting fragment HTML in Phase 1. The hard gate at Checkpoint 1 forbids it.
