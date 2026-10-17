# *Last Mile: The Forward Deployed Engineer's Handbook for Shipping AI* — design

Date: 2026-10-17 · Status: approved in brainstorming, pending spec review

## Why

The owner wants a second book, positioned as "the FDE bible": a reference that people who
want the Forward Deployed Engineer job, or already do it, read and come back to. In 2025–26
the FDE role became the main way AI vendors get models and agents into production at
customers. Hiring for it rose sharply, and the questions practitioners ask about it have
few evidence-backed answers.

**The shelf is no longer empty.** An editorial review found the following already
exists:
- an O'Reilly listing titled *The Forward Deployed Engineer*, with a Part II-like scope
  (its publication date is unverified);
- two career guides, a Leanpub playbook and a gated 93-page playbook;
- an open-source Chinese *FDE Guidance Book* claiming 100+ company cases, plus a Chinese
  GitBook guide;
- Pragmatic Engineer coverage, including OpenAI's acquisition of the 150-FDE consultancy
  Tomoro and the role's drift toward consulting;
- interview-prep guides (Exponent, Dataford).

**The gap this book owns:** it is **evidence-graded, artifact-first, free, bilingual
and visibly maintained**. Everything listed above is opinion, career advice or vendor
marketing. None of it grades its claims, and none of it ships templates a reader can use.

## Decisions (made with the owner)

| Question | Decision |
|---|---|
| Reader | Aspiring and practicing FDEs. Leaders are served by one chapter (17), not by a Part. |
| Scope | The AI-era FDE: deploying LLMs and agents at customers. Palantir appears as the origin, in one chapter. |
| Backbone | The engagement lifecycle (Part II), plus a skill map with L1–L4 levels (Ch 3) |
| Evidence | Verified public cases graded T1–T4, **plus** clearly labelled composite scenarios, including one running composite engagement through Part II |
| Structure | The 18-chapter revision from the editorial review, with the owner's pushbacks applied |
| Title | ***Last Mile: The Forward Deployed Engineer's Handbook for Shipping AI*** · ZH 《最后一公里：FDE 落地手册》 |
| Language | Bilingual EN + ZH |
| Shipping | Serialised, with **Part II first**. The owner reviews each PR on the Vercel preview before merge. |
| Disclosure | Site-level only (`/about`), as for the first book |
| Practitioner reviewers | Not recruited. The owner's time is setup-only. Credibility comes from graded evidence and the published method. |

## 1. Book structure

Book slug: `last-mile`. Target: 70–85k English words.

**Front matter** (sits as the first entry of Part I, num `''`, the same way the first book's
preface does; the `Book` type has no separate front-matter slot)
- `how-to-use` — How to use this book. It covers three reading paths
  (aspiring / practicing / leading), the evidence tiers, the composite convention, and
  the **situation → page index**.

**Part I — The Role**
1. `what-an-fde-is` — What an FDE is, and isn't. Compares the role with solutions,
   sales and applied-AI engineers and with consultants, and answers "isn't it just
   consulting?" directly.
2. `origins-and-economics` — Palantir's model, what changed when the product became a
   model, and why vendors pay engineers to sit with customers.
3. `the-skill-map` — Four domains (technical, customer, product, judgment) × L1–L4.
   It includes a self-assessment rubric written as observable behaviours, which
   Ch 16–18 reuse.

**Part II — The Engagement** (the running composite starts in Ch 4)

4. `before-the-engagement` — Pilots, SOWs, who pays, the account team, and the
   proof-of-concept trap.
5. `discovery` — Finding the real problem behind the stated one.
6. `scoping-and-the-first-win` — A one-page scope with an agreed success metric. Its
   first demo should land in 2–4 weeks.
7. `data-access-and-integration` — Permissions, ugly data, and the integration path.
8. `security-governance-and-model-risk` — Prompt injection, data residency, audit, and
   getting through review.
9. `evals` — Baseline, harness, and numbers the customer trusts. Evals are placed
   **before** the build on purpose.
10. `building-in-their-environment` — Agents, retrieval and tools on someone else's
    infrastructure.
11. `production-and-handoff` — Reliability, ownership, the runbook, and leaving
    cleanly.
12. `feeding-the-product` — Turning one customer's hack into everyone's feature.
13. `when-engagements-fail` — Failure patterns, rescue, and walking away.

**Part III — The Craft**

14. `judgment-under-pressure` — Saying no, scope creep, politics, bad news, and
    ethics. Communication tactics also live in the phase chapters (demos in 6, bad news
    in 9, executives in 11).

**Part IV — The Career**

15. `where-fdes-work` — AI lab vs. startup vs. outsourced FDE consultancy, and how each
    changes the job, the upside and the exits.
16. `getting-hired` — Interview loops, take-homes, decomposition rounds, and a
    portfolio project shaped like an engagement.
17. `leading-fdes` — Running several accounts, hiring, team design, and metrics.
18. `levels-burnout-and-what-comes-next` — Growth paths, burnout, and the exits to
    founder or PM.

**Appendices**
- A `case-file` — every case, graded T1–T4
- B `templates` — all templates, blank and filled
- C `failure-modes` — symptom → cause → fix, cross-linked to cases
- D `state-of-the-role` — the dated "last verified" snapshot of hiring, pay, employers
  and org changes
- E `glossary`
- F `sources`

### Reference features (the "bible" test)

- **Outcome lede.** Every chapter's `p.goal` follows the document-openers rule *and*
  says what the reader can do after reading it.
- **Phase checklist.** Every Part II chapter ends with a "ready to move on" checklist.
- **Templates.** Every Part II chapter produces one template, shown blank and filled
  from the running composite:

  | Ch | Template |
  |---|---|
  | 4 | engagement brief / pilot terms checklist |
  | 5 | discovery interview guide |
  | 6 | one-page scope with success metric |
  | 7 | data-access request |
  | 8 | security questionnaire answers |
  | 9 | eval plan |
  | 10 | architecture decision record |
  | 11 | runbook + handoff doc |
  | 12 | product-feedback brief |
  | 13 | engagement post-mortem |

  Each template sits in a `<pre class="standalone">` block, byte-identical in EN and
  ZH. Labels inside a template are left in English on purpose, because they are meant
  to be copied into a working document.
- **Situation index.** The situation → page index lives on the `how-to-use` page.
  Every entry links to a published chapter section.
- **Failure catalogue.** Appendix C is linked from Ch 13 and from each case it cites.

### Evidence rules

- **Tiers.** T1–T4 are as defined in the first book's bible:
  - T1: measured, primary, independent
  - T2: measured, primary, vendor- or self-reported
  - T3: secondary reporting
  - T4: anecdote, job post or opinion

  Job postings are T4 for claims about *practice*, but primary evidence for claims
  about *what employers ask for*.
- **Composites.**
  - **Marked.** They always sit in a dedicated "Composite" box and are never presented
    as a named company.
  - **No invented figures.** They use ranges, never point figures, and never put an
    invented number beside a real one.
  - **Grounded.** Each beat of the running composite cites the verified pattern it
    dramatises.
- **Perishable facts.** Pay, tooling, model names and company org changes go in a
  "Verified YYYY-MM" box, kept out of the durable argument. Core chapters name no
  model versions.
- **Unsourced claims.** A plausible but unsourced roadmap or market claim is cut, not
  hedged. Distrust any third-party figure that exactly equals a vendor's own number.

### Linking rules

- **To the wiki.** Chapters link to existing wiki pages wherever one goes deeper (evals,
  MCP, agent security, retrieval, observability), so the book does not repeat them.
- **Between the books.** The SDLC book and *Last Mile* link to each other where they
  overlap (evals, security review, measuring success). Those links are added to the
  SDLC book only when the matching *Last Mile* chapter publishes.
- **Within the book.** Links go only to published chapters; planned ones are named in
  prose. Links use slugs, never numbers. Every `<a>` carries `class="xref"`.

## 2. Research and writing process

**Phase 1: Research.** One Workflow with five research agents and one aggregator:
1. **Role and market:** FDE job posts from about 20 employers (labs, AI startups,
   consultancies), levels, published pay, and interview loops.
2. **Cases:** public deployments with FDE involvement, talks, podcasts and engineering
   blogs. Each case is graded.
3. **Engagement practice:** discovery, scoping, evals-first work and security review
   in enterprise AI.
4. **Failure:** public data on pilots that never reach production, and post-mortems.
5. **Competition:** a close read of the existing books and guides, including the
   Chinese 100-case book, plus the Chinese term used for FDE in tech media. The goal is
   to add, not duplicate.

Each brief lists claims with source URL, date, tier and confidence. The aggregator
dedupes the claims and maps them to chapter slots. Briefs go to
`docs/books/last-mile/research/`.

**Phase 2: Bible** (owner checkpoint). It covers:
- each chapter's single argument;
- case → chapter assignments;
- the running composite's arc across Ch 4–13 (customer type, problem, each beat);
- the skill-map rubric;
- the template list;
- the situation index seed;
- the glossary;
- the cross-link map.

It is saved to `docs/books/last-mile/bible.md`, with outlines in `outlines/`.

**Phase 3: Writing, per PR.** The pipeline runs in this order:
1. Writer agents work per chapter.
2. Adversarial fact-checkers check each chapter. They also report errors in other
   chapters with an `OTHER:` prefix.
3. I do an edit pass so the whole book has one English voice.
4. Writers produce the ZH text against the final EN.
5. All gates run.
6. The owner reviews on the preview.
7. Merge, then live verification in both locales.

**Spend control.** The last book hit the monthly spend limit mid-run, so each PR is a
separate workflow run and can be resumed (`resumeFromRunId`). The expected total is
about 1.2× the first book: ~25 entries, ~25 writers + ~25 checkers + 6 research agents.

## 3. Site implementation

The book infrastructure already supports several books (`src/content/books/index.ts`):
- **Content.** Add `src/content/books/last-mile/manifest.ts` and list it in `BOOKS`
  after `ai-driven-sdlc`. Fragments go in `src/content/books/last-mile/{en,zh}/<slug>.html`.
- **Pages.** The shelf, landing, chapter layout, sidebar, prev/next, in-book backlinks,
  `llms.txt` and sitemap pick it up with no code change.
- **New CSS (PR 1 only), two annotation variants:**
  - `.callout.composite`: a shaded box labelled "Composite" / "合成案例".
  - `.callout.verified`: a dated box labelled "Verified YYYY-MM" / "核实于 YYYY-MM".

  The label comes from a `data-label` attribute so it is translated in the fragment.
  Both variants must pass `test:design` contrast checks in light and dark mode. A
  chapter page from this book is added to the design suite's CURATED list.
- **Test.** `books-manifest.test.mjs` already iterates `BOOKS`. Confirm it covers the
  second book, and add a case if it hardcodes `ai-driven-sdlc`.
- **OG card.** The shelf card already exists. Keep the per-book card the same as the
  first book's (check whether it is shared or per-book in PR 1).

### Ship order

| PR | Contents |
|---|---|
| 1 | Manifest (all entries `planned` except those shipping), landing page, the two callout variants, `how-to-use`, Part II Ch 4–6, research + bible committed, this spec |
| 2 | Part II Ch 7–13 |
| 3 | Part I (Ch 1–3) + Part III (Ch 14) |
| 4 | Part IV (Ch 15–18) + Appendices A–F |

Every PR adds a changelog entry (title ≤110 / ≤60 chars), passes all gates, is checked
at 390 px phone width, and is verified live in both locales.

**Ordering consequence.** Ch 4–6 publish before Ch 3, which defines the skill map.
They therefore name the skill map in prose without a link. PR 3 adds those links,
following the first book's "prose mentions become links" pass.

## Out of scope

- Practitioner interviews or reviewer recruitment
- Print/PDF export
- Changes to the daily routine (Books stays out of its scope)
- The paused search-data plan. Its state is recorded in memory and resumes separately.

## Risks

- **Evidence scarcity.** Public FDE cases are mostly vendor marketing and job posts,
  and T1 will be rare. The book says so in `how-to-use`, leans on primary sources, and
  grades everything visibly.
- **Composites eroding trust.** Mitigated by the dedicated box, ranges only, and a
  cited pattern for every beat.
- **Datedness.** The role is being restructured right now. Perishable facts go in
  Verified boxes and Appendix D; core chapters stay durable.
- **Competition.** The Phase 1 competition track decides what we must *not* repeat.
  The bible records a one-line differentiator per Part.
- **Voice drift across ~25 writers.** Mitigated by the bible, a fixed Part II chapter
  template (what this phase is for → the composite beat → the playbook → the template →
  failure signals → ready-to-move-on checklist), and a single English edit pass.
