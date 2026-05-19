# Navigation & Information-Architecture Plan

Audience: a human reviewer deciding what to approve. Opinionated by design.
Scope of THIS PR is deliberately narrow (cross-links + CSS + this plan); the
structural recommendations below are proposals for follow-up PRs unless marked
otherwise.

---

## 1. Current IA — assessment

The site has four content surfaces:

- **Field Guide** — a linear, ordered course: 6 Parts (Foundations → Build →
  Ship → Evaluate → Specialize → Frontier), 22 chapters, driven by
  `field-guide/manifest.ts` (`PARTS`/`CHAPTERS`). Rendered with a sticky
  `ChapterSidebar` grouped by Part. This surface has the strongest IA: clear
  progression, numbered chapters, part labels.
- **Concepts** — 33 encyclopedia entries in 4 groups (AI Foundations, Agentic
  AI, Building Blocks, AI Ecosystem), `concepts/manifest.ts`. Rendered by
  `SectionIndexView` (grouped list) + `SectionSidebar` on detail pages.
- **Deep-Dives** — 51 advanced essays in (now) ~8 groups (Architectures &
  Patterns, Protocols & Interop, Memory & Context, Retrieval & RAG, Safety &
  Security, Evaluation & Observability, AgentOps, Training). Same renderer as
  Concepts.
- **Changelog / About / Home** — single pages.

### Navigation pain points

1. **No lateral movement between surfaces.** Concepts, Deep-Dives and Field
   Guide are silos. A reader on the `what-is-rag` concept has no in-content
   path to `advanced-rag-architectures` / `graph-rag` / `rag-security`, or to
   the Field Guide `retrieval` chapter, even though they are the obvious next
   step. Until this PR, **zero** content fragments contained any inline link.
   This is the single biggest gap and the one the user explicitly called out.
2. **No "start here".** A newcomer landing on the Concepts index sees 33
   flat-grouped entries with no recommended path. The Field Guide *is* the
   guided path but nothing routes a confused reader to it from Concepts/Deep-
   Dives.
3. **Concepts ↔ Deep-Dives relationship is implicit.** Many Concepts have a
   natural "graduate to" Deep-Dive (RAG → Advanced RAG; agent loop → ReAct;
   tool calling → tool-calling-standards; risks-intro → agentic-threat-model).
   This mapping exists only in the authors' heads.
4. **Breadcrumbs are minimal.** `.breadcrumb` styling exists but detail pages
   rely on the sidebar for "where am I"; there is no section→entry trail and
   no prev/next within a section (Field Guide has order; Concepts/Deep-Dives
   render order but expose no in-page prev/next).
5. **Deep-Dives index is long and getting longer** (51 entries, 8 groups,
   one screen of dense list). Grouping helps but there is no group-level
   overview / jump nav and no sense of difficulty or prerequisites.
6. **Sidebar on Deep-Dives detail pages lists all 51 entries** across all
   groups — heavy, and on mobile the sticky sidebar is hidden entirely
   (replaced by a single "back to index" link, so on phones there is *no*
   sibling navigation at all).

---

## 2. Recommendations (prioritized)

Legend — Impact / Effort / Risk are L/M/H. "This PR" = shipped here.

### P0 — Inline cross-reference links — **This PR**
- **What:** the first natural mention of a strong concept on a page links to
  that page (locale-correct), styled `.xref`.
- **Impact:** H — directly fixes pain point #1, the user's ask.
- **Effort:** M (done). **Risk:** L — additive, content-only, no IA change,
  verified against manifests, en/zh parity checked.
- Scope shipped is intentionally a curated ~24-pair set (quality over
  quantity). See section 4.

### P1 — "Start here" / reading-path callout — *follow-up*
- **What:** a small, dismissible-not-needed banner or lede link on the
  Concepts and Deep-Dives **index** pages: "New here? Follow the guided path
  → Field Guide" and "Concepts explain the *what*; Deep-Dives the *how/why* —
  start with Concepts." Optionally a 3–5 entry "core path" within Concepts
  (what-is-an-llm → what-is-an-agent → the-agent-loop → tool-calling →
  what-is-rag).
- **Impact:** H (fixes #2). **Effort:** L (i18n string + index view tweak).
  **Risk:** L. Strong recommend.

### P2 — "Related pages" block on detail pages — *follow-up*
- **What:** a curated, hand-authored related-links footer per entry (or a
  lightweight `related: slug[]` field added to the manifest `Entry` — note:
  manifest edits are explicitly out of scope for *this* PR). Surfaces the
  Concepts↔Deep-Dives mapping (#3) systematically rather than only where a
  word happens to appear in prose.
- **Impact:** H. **Effort:** M (manifest schema + view + curation).
  **Risk:** M (manifest change touches every section renderer; needs the
  verify script extended).

### P3 — Section breadcrumb + in-section prev/next — *follow-up*
- **What:** `Home › Concepts › <Group> › <Entry>` trail; prev/next within the
  manifest order at the foot of detail pages (Field Guide especially benefits
  — it is a linear course with no next-chapter button).
- **Impact:** M-H. **Effort:** M. **Risk:** L (additive, uses existing
  ordered manifests + existing `.breadcrumb` CSS).

### P4 — Deep-Dives index group jump-nav / overview — *follow-up*
- **What:** sticky in-page anchor list of the 8 groups at the top of the
  Deep-Dives index; optional one-line group blurbs. Possibly collapse the
  detail-page sidebar to the *current group* with a "show all" toggle (fixes
  #5/#6).
- **Impact:** M (scales with the section's growth). **Effort:** M.
  **Risk:** L-M (sidebar behavior change needs mobile QA).

### P5 — Concepts↔Deep-Dives map page — *follow-up*
- **What:** a single curated page (or a section on About) that draws the
  "learn the concept → go deeper" graph. Cheap, high orientation value.
- **Impact:** M. **Effort:** L-M. **Risk:** L.

### Not recommended now
- Full tagging/taxonomy or search. High effort, the corpus is small enough
  that curated links + a reading path beat a search box; revisit only if the
  corpus doubles again.
- Re-ordering existing manifest groups. Out of scope and risky; the current
  grouping is sound.

---

## 3. Sequencing

1. This PR: P0 links + `.xref` style + this plan.
2. Next: P1 (cheap, high value) + P3 (breadcrumb/prev-next).
3. Then: P2 (related-pages, the structural one — needs manifest schema work
   and an extended verify gate) and P4 (Deep-Dives scale).
4. Optional: P5 map page.

---

## 4. Cross-links shipped in this PR

Rules followed: first natural prose mention only; never self-link; never
inside `<pre>`, headings, or `<code>`; locale-correct (`/zh/...` inside `zh/`
fragments); both locales edited at the corresponding prose position; every
target slug verified present in the manifests; en/zh link counts balanced.

Targets and where they are linked from:

- `what-is-rag` ← chunking-and-vector-search, embeddings, context-windows
  (concepts); advanced-rag-architectures, graph-rag, rag-security (deep-dives)
- `embeddings` ← chunking-and-vector-search
- `chunking-and-vector-search` ← what-is-rag
- `what-is-an-agent` ← the-agent-loop, agents-vs-chatbots-workflows,
  when-to-use-an-agent, tools-actions-environments, planning-and-termination
  (concepts); agentic-threat-model (deep-dive)
- `the-agent-loop` ← autonomy-levels (concept); react-pattern (deep-dive)
- `what-is-an-llm` ← what-is-an-agent, tool-calling-explained
- `tool-calling-explained` ← tool-calling-standards (deep-dive)
- `system-vs-user-prompts` ← context-windows
- `prompt-injection` (deep-dive) ← what-is-rag (concept), rag-security
- `agentic-threat-model` (deep-dive) ← agentic-risks-intro (concept)
- `react-pattern` (deep-dive) ← pattern-landscape

24 link pairs (en+zh), 22 fragment files touched, plus one `.xref` rule in
`src/styles/site.css` and one changelog entry.

### Deferred / ambiguous (intentionally not linked)
- **New Deep-Dive groups from the parallel PR** (Evaluation & Observability,
  AgentOps, Training — branched after origin/main) are intentionally **not**
  cross-linked here, since this branch is based on origin/main and only links
  pages that exist now. **Fast follow-up:** once that PR merges, do a second
  link pass connecting e.g. `why-agent-eval-is-hard` ↔ Field Guide eval
  chapters, `eval-driven-agent-development` ↔ `reading-agent-benchmarks`, and
  the Training group ↔ `prompt-finetune-or-rl`.
- **Field Guide ↔ Concepts/Deep-Dives links** were not added: Field Guide
  fragments use a different chapter idiom and the highest-value lateral links
  there are better delivered via the P2 "related pages" mechanism than via
  scattered prose anchors. Deferred deliberately.
- Generic words ("agent", "model", "prompt") appearing as the *first* mention
  on pages whose whole subject *is* that term were left unlinked to avoid
  self-referential or low-value links.
