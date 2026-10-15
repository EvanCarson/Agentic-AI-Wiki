# Books section + *From SDLC to AI-Driven SDLC* — design

Date: 2026-10-14 · Status: approved in brainstorming, pending spec review

## Why

The one existing post on this topic (`/blogs/ai-native-sdlc-artifact-chain`) was the
site's #2 page in the 2026-09-01 analytics baseline. Readers want long-form guidance on
moving a software organisation to an AI-driven SDLC; the site has no format for it. A
book with a stable landing URL is also the shareable asset the growth audit said the
site lacks.

## Decisions (made with the owner)

| Question | Decision |
|---|---|
| Reader | Both layers: Part I for engineering leaders, Parts II–III for tech leads / staff engineers |
| Stance | A **maturity ladder per SDLC phase** — readers place themselves and choose how far to climb; the book does not prescribe one end state |
| Home | A new top-level **Books** section (`/books/…`), built to hold more books later |
| Shipping | **Serialised by part**, owner reviews each part before it ships |
| Language | Bilingual EN + ZH, like every page on the site |
| Evidence | Every case study is public and cited to a primary source. No composite or invented companies |
| Review depth | The owner reviews the book bible and each part, not the raw research briefs |

## 1. Book structure

Working title: **From SDLC to AI-Driven SDLC: A Migration Handbook**
(ZH: 《从 SDLC 到 AI 驱动的 SDLC：迁移手册》). Target 60–70k English words.

**Maturity model** (the backbone, defined in Ch 2, referenced everywhere):
five levels × eight phases.

- L0 Manual — no AI in the phase
- L1 Assisted — AI suggests, a human does the work
- L2 Delegated — AI does bounded tasks, a human reviews every output
- L3 Supervised-autonomous — AI runs the phase for routine work, humans review by exception
- L4 Autonomous — AI owns narrow, well-verified task types end to end

The eight phases are requirements, design, coding, review, testing, CI/CD, operations and
maintenance. The research phase may refine level names and boundaries. Any change is
settled in the bible before writing starts.

**Part I — The Case and the Map** (leaders)
- Preface — who it is for, how to read it, the model in one picture
- Ch 1 When code gets cheap, the bottleneck moves
- Ch 2 The AI-SDLC maturity model (+ self-assessment grid)
- Ch 3 Case studies — 6–10 public cases incl. failures/rollbacks, each mapped to the model
- Ch 4 Economics, risk and measurement

**Part II — Phase by Phase** (practitioners)
Ch 5 Requirements & specs · Ch 6 Design & architecture · Ch 7 Coding · Ch 8 Code review ·
Ch 9 Testing & verification · Ch 10 CI/CD & release · Ch 11 Operations & incidents ·
Ch 12 Maintenance & migrations.

Every Part II chapter uses the same template, in this order:
1. What changes
2. The ladder for this phase (L0→L4)
3. A case
4. Migration steps
5. Guardrails
6. Metrics
7. Anti-patterns

**Part III — The Migration** (both)
Ch 13 Assess your starting point · Ch 14 The 90-day pilot · Ch 15 Scaling: platform,
enablement, governance · Ch 16 People: roles, skills, juniors, hiring · Ch 17 Measuring
success and when to roll back.

**Appendices** — templates (agent instruction file, spec template, review checklist,
pilot scorecard), glossary, bibliography.

**Linking rules**
- Every chapter links back to Ch 2's row for its phase.
- Each Part II chapter links to the Part III steps that use it.
- Chapters link out to existing wiki pages where one covers the topic (e.g. Ch 8 →
  `code-review-agents`, Ch 9 → `evaluating-coding-agents`).
- Links use slugs, never chapter numbers.

## 2. Research and writing process

**Phase 1 — Research.** One Workflow (owner opted into multi-agent), ~7 parallel
research agents plus 1 aggregator, under the 10-agent guideline:

1. Bottleneck evidence (DORA, METR, productivity studies and critiques)
2. Existing maturity models
3. Large-company cases
4. Failures, rollbacks, AI-caused incidents
5. Phases: requirements → review
6. Phases: testing → maintenance
7. Org, people, governance, regulation

Each agent returns a brief: claims, each with a source URL, a date and a confidence
level, plus open questions. The aggregator dedupes the claims, flags contradictions,
and maps each claim to an outline slot.

**Phase 2 — Book bible** (owner checkpoint). It holds:
- the final table of contents
- the maturity grid filled with evidence
- each chapter's single argument
- the case-to-chapter assignment
- the cross-link map

**Phase 3 — Writing, per part.**
1. One writer agent per chapter, owning that chapter's EN + ZH files.
2. An orchestrator editing pass over all English for one voice and consistent terms.
3. One adversarial fact-check agent per part, re-checking every number and quote
   against its source.
4. Owner review.
5. One PR per part.

**Artefacts.** Briefs and the bible live in `docs/books/ai-driven-sdlc/`
(`research/<topic>.md`, `bible.md`). These are not published pages.

**Volatile facts** (products, prices, versions, adoption numbers) carry an
"as of <month year>" marker. A plausible but unsourced future or roadmap claim is cut,
not hedged.

## 3. Site implementation

**Routes** — each also exists under `/zh/`:
- `/books/` — shelf page
- `/books/ai-driven-sdlc/` — landing page: pitch, how to read it, full table of
  contents, planned chapters shown as "coming soon"
- `/books/ai-driven-sdlc/<slug>/` — chapter pages; only published chapters are built

**Content model**
- `src/content/books/ai-driven-sdlc/manifest.ts`
  - Book metadata.
  - An ordered array of chapters: `{ part, num, slug, page, title: Localized,
    summary: Localized, status: 'published' | 'planned' }`.
  - The `parts` list carries bilingual names and roman numerals.
  - Written so a second book is a second directory.
- `src/content/books/ai-driven-sdlc/{en,zh}/<page>.html` — body-only fragments in the
  existing `guide.css` vocabulary (`.phase/.step/.callout/<pre class="standalone">/.c-*`).
  Non-blog layouts have no `<table>` styling; use lists, `<pre>` or existing classes.

**Layout — `BookChapterLayout.astro`**, modelled on `ChapterLayout.astro`, with:
- a sidebar of parts and chapters (planned chapters greyed and unlinked)
- breadcrumb and reading time
- previous/next links that skip planned chapters
- an optional maturity-level strip on Part II chapters, driven by a manifest field, not
  by HTML
- an auto-generated "Referenced in" list, built at build time from the other chapters'
  links, the same way `src/lib/blog-backlinks.ts` builds blog backlinks

**Site integration**
- Add Books to the top nav and move Changelog to the footer (owner approved).
- `ui.ts` strings for both locales.
- Add a Books entry to RSS, `llms.txt` and the sitemap; the Pagefind filter and OG card
  follow existing patterns.
- The AI-native SDLC blog post and related wiki pages get a link into the book.

**Tests**
- New `books-manifest.test.mjs`:
  - slugs unique
  - numbering contiguous within each part
  - every `published` chapter has both EN and ZH fragments
  - no fragment exists for a `planned` chapter without a manifest entry
- Existing gates still apply: build, verify (bilingual + internal links), `npm test`,
  `test:design`, search.

**Ship order**

| PR | Contents |
|---|---|
| 1 | Books section, book landing page, layout, tests, nav change, spec. No chapters. Research runs in parallel. |
| 2 | Part I (Preface + Ch 1–4), after owner review |
| 3 | Part II (Ch 5–12) |
| 4 | Part III + appendices |

Each PR adds a changelog entry and is live-verified on both locales.

## Out of scope

- Print or PDF export
- Per-chapter comments
- Email capture (still blocked on the Buttondown username)
- A second book
- Changes to the daily routine. It should not write book chapters. The routine prompt is
  left as is: it lists sections it may write into, and Books is not among them.

## Risks

- **Scale vs. voice.** 17 chapters by parallel writers can drift in voice. This is
  mitigated by the bible, the fixed Part II template and the orchestrator editing pass.
- **Case-study verification.** Corporate AI claims are often marketing. Each case
  states what was measured and by whom. A case with no measurement is labelled as
  self-reported or dropped.
- **Staleness.** Tooling chapters will age. Volatile facts are dated, and the bible
  records the sources so a later refresh is mechanical.
