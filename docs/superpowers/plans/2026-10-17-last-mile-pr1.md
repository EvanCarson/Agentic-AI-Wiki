# *Last Mile* PR 1 Implementation Plan (research, bible, landing page, Ch 4–6)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the second book's landing page, its "How to use this book" front matter, and
Part II Chapters 4–6 in English and Chinese. The research briefs and bible that every later PR
builds on are committed in the same PR.

**Architecture:** The book infrastructure is already multi-book. This plan adds:
- a manifest at `src/content/books/last-mile/manifest.ts`, listed in `BOOKS`;
- body-only fragments under `src/content/books/last-mile/{en,zh}/`;
- two new callout variants in `guide.css`.

The content comes from a five-track multi-agent research Workflow, a bible the owner signs off,
and then a writer → adversarial fact-checker Workflow per chapter. An orchestrator does the
English edit pass and writes the Chinese.

**Tech Stack:**
- Astro 4 static site
- TypeScript manifests
- `node:test` unit tests
- Playwright design suite (`npm run test:design`)
- Claude Code Workflow tool for research and writing
- `gh` for the PR

**Spec:** `docs/superpowers/specs/2026-10-17-last-mile-fde-book-design.md`

## Global Constraints

**Where to work**
- Work only in the worktree `/Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/fde-book`, on
  branch `content/fde-book`. Use absolute paths. The shell is zsh.

**Book identity**
- Book slug: `last-mile`.
- Title: *Last Mile*. Subtitle: *The Forward Deployed Engineer's Handbook for Shipping AI*.
- Chinese title 《最后一公里》, Chinese subtitle 《FDE 落地手册》.

**Fragment format**
- Fragments are body-only HTML using the `.phase` skeleton. `phase-num` is the chapter number
  (`H` for how-to-use). The `.week` line is the part name, e.g. `Part II · The Engagement` /
  `第 II 部分 · 一次交付` (the first book's ZH format).
- `<table>` is not allowed in book fragments. Grids use `.threat-grid` / `.threat-row`, and
  header cells are plain unclassed `<div>`s.
- Every `<a>` carries `class="xref"`.
- `<pre>` blocks are byte-identical in EN and ZH. Templates live in `<pre class="standalone">`
  with English labels.
- The `p.goal` lede follows CLAUDE.md's document-openers rule, and its first sentence is ≤30
  words.

**Links**
- Link only to chapters whose status is `published`. Name planned chapters in prose without
  a link.
- Volatile facts go in `<div class="callout verified" data-badge="Verified 2026-10">` (ZH:
  `data-badge="核实于 2026-10"`).
- Composites go in `<div class="callout composite" data-badge="Composite">` (ZH:
  `data-badge="合成案例"`). They use ranges only and are never a named company.

**Evidence**
- Every case carries an evidence tier T1–T4.
- Cut any unsourced roadmap or market claim. Distrust any third-party figure that equals a
  vendor's own number.

**Changelog**
- One entry, dated by `date -u +%F` on the **merge day**. The title is ≤110 characters (EN) /
  ≤60 (ZH).

**Gates**
- `npm run build`, `npm run verify`, `npm test`, `npm run test:design`, and
  `npm run search:index && npm run test:search`.
- Never weaken, skip or delete a test.

**Process rules**
- **Owner checkpoints are hard stops:** after the bible (Task 2) and before merge (Task 8).
  Do not proceed past either without the owner's explicit go.
- **Commit trailers:** every commit message ends with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and
  `Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF`.
- **PR body:** the PR body ends with
  `🤖 Generated with [Claude Code](https://claude.com/claude-code)` followed by
  `https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF`.

---

## File structure

| Path | Responsibility |
|---|---|
| `docs/books/last-mile/research/{role-and-market,cases,engagement-practice,failure,competition}.md` | One research brief per track. Each claim carries a URL, date, tier and confidence. |
| `docs/books/last-mile/research/aggregate.md` | Deduped claims mapped to chapter slugs, plus contradictions and gaps |
| `docs/books/last-mile/bible.md` | Single source of truth: chapter arguments, case assignments, composite arc, skill rubric, template list, situation-index seed, glossary, link map |
| `docs/books/last-mile/outlines/{how-to-use,before-the-engagement,discovery,scoping-and-the-first-win}.md` | Per-chapter outlines for PR 1 |
| `src/styles/guide.css` | Adds `.callout.composite` and `.callout.verified` |
| `src/content/books/last-mile/manifest.ts` | Book metadata and all 25 entries, with status |
| `src/content/books/index.ts` | Adds `lastMile` to `BOOKS` |
| `src/content/books/last-mile/{en,zh}/{how-to-use,before-the-engagement,discovery,scoping-and-the-first-win}.html` | The four published fragments |
| `scripts/__tests__/design/system.mjs` | Adds `last-mile` pages to `CURATED` |
| `src/content/changelog/entries/<merge-date>-last-mile-book.ts` | Changelog entry |

---

### Task 1: Research Workflow (five tracks + aggregator)

**Files:**
- Create: `docs/books/last-mile/research/role-and-market.md`, `cases.md`,
  `engagement-practice.md`, `failure.md`, `competition.md`, `aggregate.md`

**Interfaces:**
- Produces: briefs in a fixed format that Task 2 reads. Each claim is one line:
  `- [T1|T2|T3|T4] <claim> — <source title> <URL> (<YYYY-MM-DD>) · confidence: high|medium|low`
  and is grouped under `## <chapter-slug>` headings. Chapter slugs are taken from the manifest
  in Task 4.

- [ ] **Step 1: Run the research Workflow.** The owner opted into multi-agent work for books,
  so call the Workflow tool with this script:

```js
export const meta = {
  name: 'last-mile-research',
  description: 'Five-track research for the Last Mile FDE book, then aggregate',
  phases: [{ title: 'Research' }, { title: 'Aggregate' }],
}
const SLUGS = 'how-to-use, what-an-fde-is, origins-and-economics, the-skill-map, before-the-engagement, discovery, scoping-and-the-first-win, data-access-and-integration, security-governance-and-model-risk, evals, building-in-their-environment, production-and-handoff, feeding-the-product, when-engagements-fail, judgment-under-pressure, where-fdes-work, getting-hired, leading-fdes, levels-burnout-and-what-comes-next, case-file, templates, failure-modes, state-of-the-role'
const FORMAT = `Return a markdown brief. Group claims under "## <chapter-slug>" using ONLY these slugs: ${SLUGS}. One claim per line:
- [T1|T2|T3|T4] <claim> — <source title> <URL> (<YYYY-MM-DD>) · confidence: high|medium|low
Tiers: T1 measured+primary+independent; T2 measured+primary but vendor/self-reported; T3 secondary reporting; T4 anecdote/opinion/job post (job posts are primary evidence of what employers ASK FOR).
Rules: fetch every source you cite (WebFetch) — never cite from a search snippet alone; no claim from memory; flag any third-party figure equal to a vendor's own number as "possible echo". End with "## open-questions" and "## leads-not-verified". 2,500–4,000 words.`
const TRACKS = [
  { key: 'role-and-market', prompt: 'Research the Forward Deployed Engineer (FDE) role in the AI era. Read 20+ CURRENT FDE / "forward deployed" / "applied AI engineer (customer-facing)" job posts across AI labs (OpenAI, Anthropic, Google DeepMind), AI startups (e.g. Sierra, Decagon, Harvey, Glean, Scale AI, Cohere, Mistral, ElevenLabs) and Palantir; extract responsibilities, required skills, levels, published pay ranges, travel. Find documented interview loops (decomposition rounds, take-homes, customer role-play). Find hiring-trend data with its primary source.' },
  { key: 'cases', prompt: 'Find public cases of AI deployments at customers where forward deployed / embedded vendor engineers were involved: vendor case studies, customer engineering blogs, conference talks, podcasts and interviews with named FDEs (e.g. OpenAI x Morgan Stanley/Klarna/others, Anthropic applied AI, Palantir AIP bootcamps, Scale, Sierra). For each: customer, problem, what the FDE team actually did, timeline, measured outcome and who measured it. Grade each T1–T4. Aim for 15–25 cases, including at least 3 that went badly or were rolled back.' },
  { key: 'engagement-practice', prompt: 'Research how practitioners actually run enterprise AI engagements, phase by phase: commercial wrapper (pilots, paid POCs, SOWs, success criteria in contracts), discovery techniques, scoping a 2–4 week first win, data access and integration in enterprises, security/governance/model-risk review (questionnaires, data residency, prompt-injection, audit), evals-first delivery (baselines, golden sets, customer-trusted metrics), production handoff and ownership, and how field learnings feed the vendor product. Prefer first-hand accounts by practitioners (blogs, talks, podcasts), Palantir/OpenAI/Anthropic material, and Pragmatic Engineer.' },
  { key: 'failure', prompt: 'Research why enterprise AI pilots fail to reach production and what rescue looks like: primary studies with methodology (e.g. MIT NANDA "GenAI Divide" 2025, Gartner/IDC/RAND/BCG figures — trace each to its primary and note sample/method), public post-mortems, rolled-back deployments, and practitioner accounts of killing or rescuing an engagement. Also burnout and attrition in FDE/customer-embedded roles.' },
  { key: 'competition', prompt: 'Audit existing books and long-form guides on the FDE role, to decide what a new free, evidence-graded, bilingual handbook must NOT duplicate and what it can add. Cover: the O\'Reilly-listed "The Forward Deployed Engineer" (confirm author, status and publication date), Jason Mann "How to Be a Forward Deployed Engineer", Leanpub "Shipping Enterprise AI: The FDE\'s Playbook", FourWeekMBA FDE playbook, roadmap.sh FDE roadmap, Pragmatic Engineer FDE coverage, Exponent/Dataford interview guides, and the Chinese open-source "FDE Guidance Book" and yeasy GitBook guide. For each: scope, structure, evidence quality, gaps. Also determine the Chinese term(s) Chinese tech media use for "Forward Deployed Engineer" with examples. Put per-book findings under the most relevant chapter slug and add "## differentiators" at the end.' },
]
phase('Research')
const briefs = await parallel(TRACKS.map(t => () =>
  agent(`${t.prompt}\n\n${FORMAT}`, { label: `research:${t.key}`, phase: 'Research' })
    .then(text => ({ key: t.key, text }))))
phase('Aggregate')
const ok = briefs.filter(Boolean)
const aggregate = await agent(
  `You are the aggregator for a book's research. Below are ${ok.length} briefs. Produce aggregate.md: for each chapter slug (${SLUGS}) list the strongest claims (keep tier, URL, date), merge duplicates, flag contradictions between briefs, list chapters with thin evidence (fewer than 5 T1–T3 claims), and list the 10 best cases with proposed chapter homes. Do not add claims that are not in the briefs.\n\n` +
  ok.map(b => `===== BRIEF: ${b.key} =====\n${b.text}`).join('\n\n'),
  { label: 'aggregate', phase: 'Aggregate' })
return { briefs: ok, aggregate, missing: TRACKS.map(t => t.key).filter(k => !ok.find(b => b.key === k)) }
```

- [ ] **Step 2: Handle partial failure.** If `missing` is non-empty (a spend limit or agent
  death), re-run with `resumeFromRunId`. Finished agents replay from cache, so only the missing
  ones run again.

- [ ] **Step 3: Write the briefs to disk.** Write each `briefs[i].text` to
  `docs/books/last-mile/research/<key>.md` and `aggregate` to `research/aggregate.md`.

- [ ] **Step 4: Verify the briefs have the required shape.**

Run:
```bash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/fde-book/docs/books/last-mile/research
for f in role-and-market cases engagement-practice failure competition; do
  printf "%s claims=%s urls=%s\n" $f "$(grep -c '^- \[T[1-4]\]' $f.md)" "$(grep -o 'https\?://[^ )]*' $f.md | sort -u | wc -l)"; done
```
Expected: every brief has ≥30 claims and ≥15 unique URLs. If one falls short, re-run that
track alone with its prompt plus "Your previous brief was thin; go deeper on: <gaps from
aggregate.md>".

- [ ] **Step 5: Commit.**

```bash
git add docs/books/last-mile/research && git commit -m "docs(books): Last Mile research briefs and aggregate

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 2: Bible and PR 1 outlines (hard stop for owner review)

**Files:**
- Create: `docs/books/last-mile/bible.md`
- Create: `docs/books/last-mile/outlines/how-to-use.md`, `before-the-engagement.md`,
  `discovery.md`, `scoping-and-the-first-win.md`

**Interfaces:**
- Consumes: `research/*.md` from Task 1.
- Produces: the bible sections listed below, which Tasks 5 and 6 quote verbatim into writer
  prompts.

- [ ] **Step 1: Write `bible.md` by hand (the orchestrator, not an agent).** Use exactly these
  sections:
  1. **Thesis**: one paragraph. The FDE owns the last mile between a capable model and a
     customer outcome.
  2. **Terms**: the glossary seed. Include the Chinese term for FDE chosen from
     `competition.md`.
  3. **Evidence rules**: the T1–T4 tiers, the composite rules, and the Verified-box rule,
     copied from the spec.
  4. **Per-chapter table**, one row per manifest slug, with four columns:
     - the single argument, in one sentence;
     - the 2–4 assigned cases, with tier;
     - the template it produces;
     - links out to wiki pages (paths verified to exist).
  5. **The running composite**: the customer type, size range, starting problem, and one beat
     per chapter for Ch 4–13. Each beat names the verified pattern it dramatises, with a
     source.
  6. **Skill map rubric**: 4 domains × L1–L4, written as observable behaviours.
  7. **Situation index seed**: ≥25 situations, each mapped to a chapter slug and section.
  8. **Differentiators**: what this book adds versus each competitor, from
     `competition.md`.
  9. **Part II chapter template**, in this order:
     - what this phase is for;
     - the composite beat;
     - the playbook (STEPs);
     - the template (blank and filled);
     - failure signals;
     - the "ready to move on" checklist.

  Verify each wiki link path with
  `ls src/content/{concepts,deep-dives,playbooks,operations}/en/<slug>.html`.

- [ ] **Step 2: Write the four outlines.** Each outline lists: the `p.goal` draft (first
  sentence ≤30 words), the STEP headings with 2–4 bullets each, the cases with their brief
  line references, the composite beat, the template (blank), the checklist items, and the
  links.

- [ ] **Step 3: Commit, push the branch, and STOP.**

```bash
git add docs/books/last-mile && git commit -m "docs(books): Last Mile bible and PR 1 outlines

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF" && git push -u origin content/fde-book
```

  Send the owner a plain-language summary of the bible. Cover the thesis, the composite
  customer, the Ch 4–6 arguments, the Chinese FDE term, and anything the research overturned
  from the spec. **Wait for an explicit go.** Apply requested changes to `bible.md` and
  re-commit before Task 3.

---

### Task 3: Callout variants `.callout.composite` and `.callout.verified`

**Files:**
- Modify: `src/styles/guide.css`. Insert the block directly after the
  `.callout.danger::before` rule, before the `"Start here" variant` comment.

**Interfaces:**
- Produces: `<div class="callout composite" data-badge="Composite">` and
  `<div class="callout verified" data-badge="Verified 2026-10">`. The badge text is taken
  from `data-badge`, so fragments localise it.

- [ ] **Step 1: Add the CSS.**

```css
/* Book annotation variants (Last Mile). Badge text comes from data-badge so
   each locale's fragment supplies its own label ("Composite"/"合成案例",
   "Verified 2026-10"/"核实于 2026-10"). Badge colours reuse the fixed warm
   badge hues with the theme-invariant --badge-ink, the same contrast fix as
   the three badges above.
     .composite → --q-bg surface, dashed left rule: an invented-but-grounded
                  scenario must never read like a real case.
     .verified  → --surface, left rule in --border-emphasis: a dated fact that
                  will go stale, kept out of the durable argument. */
.callout.composite { background: var(--q-bg); border-left: 3px dashed var(--q-border); }
.callout.composite::before { content: attr(data-badge); background: var(--badge-warn-bg); color: var(--badge-ink); }
.callout.verified { border-left-color: var(--border-emphasis); }
.callout.verified::before { content: attr(data-badge); background: var(--badge-tip-bg); color: var(--badge-ink); }
```

- [ ] **Step 2: Build.** Run `npm run build 2>&1 | tail -5`.
  Expected: the build completes with no new warnings. Contrast is verified in Task 7, once a
  page uses both classes.

- [ ] **Step 3: Commit.**

```bash
git add src/styles/guide.css && git commit -m "feat(books): composite and verified callout variants

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 4: Manifest and shelf registration

**Files:**
- Create: `src/content/books/last-mile/manifest.ts`
- Modify: `src/content/books/index.ts`
- Test: `scripts/__tests__/books-manifest.test.mjs`. This file is unchanged: it already
  iterates every directory under `src/content/books/`.

**Interfaces:**
- Consumes: `Book` and `Localized` from `src/content/books/types.ts` and
  `src/i18n/index`.
- Produces: `export default book` with `slug: 'last-mile'`. Chapter slugs are exactly
  those listed in Task 1's `SLUGS` plus `glossary` and `sources`.

- [ ] **Step 1: Create the directory without a manifest, and run the test to see it
  fail.**

```bash
mkdir -p src/content/books/last-mile && node --experimental-strip-types --test scripts/__tests__/books-manifest.test.mjs 2>&1 | grep -E "^# (pass|fail)|last-mile: missing"
```
  Expected: FAIL with `last-mile: missing manifest.ts`.

- [ ] **Step 2: Write `manifest.ts`.** All entries start as `planned`. Task 6 flips the four
  PR 1 entries to `published`. Summaries are the planned arguments; the bible may sharpen
  them in Task 6.

```ts
// Last Mile: The Forward Deployed Engineer's Handbook for Shipping AI.
// Design: docs/superpowers/specs/2026-10-17-last-mile-fde-book-design.md
// Research + bible: docs/books/last-mile/
// Ships Part II first (PR 1 = how-to-use + Ch 4–6). A chapter is `planned`
// until its PR adds both fragments and flips it to `published`.
import type { Localized } from '../../../i18n/index';
import type { Book } from '../types';

const L = (en: string, zh: string): Localized => ({ en, zh });

const book: Book = {
  slug: 'last-mile',
  title: L('Last Mile', '最后一公里'),
  subtitle: L("The Forward Deployed Engineer's Handbook for Shipping AI", 'FDE 落地手册'),
  pitch: L(
    'A capable model is not a working deployment: between the demo and the customer outcome sit discovery, data access, security review, evals and a handoff, and the Forward Deployed Engineer is the person who owns that distance. This handbook walks one engagement from the first call to the handoff, with a template and a checklist for every phase, public cases graded by how well they are evidenced, and a skill map you can place yourself on.',
    '一个能干的模型不等于一次能用的落地：从演示到客户真正拿到结果，中间隔着需求挖掘、数据接入、安全评审、评测与交接，而前线部署工程师（FDE）就是对这段距离负责的人。这本手册把一次交付从第一通电话走到交接，每个阶段配一份模板和一张检查清单，公开案例按证据强弱分级，再给出一张你可以对照定位自己的技能地图。',
  ),
  howToRead: [
    L('Want the job: read Part I to decide whether the role fits, place yourself on the skill map, then read Part IV on getting hired.',
      '想做这份工作：先读第一部分判断这个角色是否适合你，在技能地图上找到自己的位置，再读第四部分如何拿到录用。'),
    L('Doing the job: go straight to Part II and use the chapter for the phase you are in; each ends with a template and a ready-to-move-on checklist.',
      '正在做这份工作：直接进入第二部分，翻到你所处阶段的那一章；每章结尾都有一份模板和一张"可以进入下一阶段"检查清单。'),
    L('Something has gone wrong: start from the situation index in How to Use This Book, or from When Engagements Fail.',
      '事情出了岔子：从《如何使用本书》里的情境索引入手，或直接读《当交付失败时》。'),
  ],
  parts: [
    {
      key: 'the-role', roman: 'I',
      name: L('The Role', '这个角色'),
      audience: L('For anyone deciding whether to do this job', '写给正在考虑是否做这份工作的人'),
      chapters: [
        { slug: 'how-to-use', num: '', status: 'planned',
          title: L('How to Use This Book', '如何使用本书'),
          summary: L('Three reading paths, how evidence is graded, how composites are marked, and an index from the situation you are in to the page that helps.',
                     '三条阅读路径、证据如何分级、合成案例如何标注，以及一份从你所处情境直达对应页面的索引。') },
        { slug: 'what-an-fde-is', num: '1', status: 'planned',
          title: L('What an FDE Is, and Isn\'t', 'FDE 是什么，不是什么'),
          summary: L('How the role differs from solutions engineering, sales engineering and consulting, and an honest answer to "isn\'t this just consulting?"',
                     '这个角色与解决方案工程、售前工程和咨询有何不同，以及对"这不就是咨询吗？"的坦诚回答。') },
        { slug: 'origins-and-economics', num: '2', status: 'planned',
          title: L('Origins and Economics', '起源与经济账'),
          summary: L('What carried over from Palantir\'s model, what changed when the product became a model, and why vendors pay engineers to sit with customers.',
                     '从 Palantir 的模式里沿袭了什么，当产品变成模型后又变了什么，以及厂商为何愿意花钱让工程师驻扎在客户身边。') },
        { slug: 'the-skill-map', num: '3', status: 'planned',
          title: L('The Skill Map', '技能地图'),
          summary: L('Four domains, four levels, written as behaviours you can observe — the rubric the rest of the book refers back to.',
                     '四个领域、四个级别，全部写成可观察的行为——本书其余部分反复回指的那份评估标准。') },
      ],
    },
    {
      key: 'the-engagement', roman: 'II',
      name: L('The Engagement', '一次交付'),
      audience: L('For practicing FDEs, phase by phase', '写给在岗 FDE，按阶段展开'),
      chapters: [
        { slug: 'before-the-engagement', num: '4', status: 'planned',
          title: L('Before the Engagement', '交付开始之前'),
          summary: L('Pilots, statements of work, who pays and who decides — and how to spot a proof of concept that was never meant to reach production.',
                     '试点、工作说明书、谁付钱、谁拍板——以及如何识别一个从一开始就不打算上线的概念验证。') },
        { slug: 'discovery', num: '5', status: 'planned',
          title: L('Discovery', '需求挖掘'),
          summary: L('The problem the customer names is rarely the one worth solving; how to find the real one in the first two weeks.',
                     '客户说出口的问题，很少是最值得解决的那个；如何在头两周找到真正的问题。') },
        { slug: 'scoping-and-the-first-win', num: '6', status: 'planned',
          title: L('Scoping and the First Win', '划定范围与首个成果'),
          summary: L('Agree the success metric before you build, then ship something the customer can use within weeks, not a slide.',
                     '动手之前先约定成功指标，然后在几周内交付客户能用的东西，而不是一页幻灯片。') },
        { slug: 'data-access-and-integration', num: '7', status: 'planned',
          title: L('Data Access and Integration', '数据接入与集成'),
          summary: L('Permissions, ugly data and the integration path usually take longer than the AI work, so plan for them first.',
                     '权限、脏数据与集成路径，往往比 AI 本身更耗时，所以要最先为它们做打算。') },
        { slug: 'security-governance-and-model-risk', num: '8', status: 'planned',
          title: L('Security, Governance and Model Risk', '安全、治理与模型风险'),
          summary: L('Getting through the customer\'s review: prompt injection, data residency, audit trails and the questionnaire.',
                     '通过客户的评审：提示注入、数据驻留、审计留痕，以及那份安全问卷。') },
        { slug: 'evals', num: '9', status: 'planned',
          title: L('Evals: Proving It Works', '评测：证明它真的有效'),
          summary: L('Build the baseline and the harness before the agent, so "it seems good" becomes a number the customer trusts.',
                     '先建好基线与评测框架再造智能体，让"看起来不错"变成客户信得过的数字。') },
        { slug: 'building-in-their-environment', num: '10', status: 'planned',
          title: L('Building in Their Environment', '在客户的环境里构建'),
          summary: L('Agents, retrieval and tools on infrastructure you do not own, under constraints you did not choose.',
                     '在不属于你的基础设施上、在不由你选择的约束下，构建智能体、检索与工具。') },
        { slug: 'production-and-handoff', num: '11', status: 'planned',
          title: L('Production and Handoff', '上线与交接'),
          summary: L('Reliability, ownership and a runbook, so the system keeps working after you leave.',
                     '可靠性、归属与运行手册，让系统在你离开之后依然正常运转。') },
        { slug: 'feeding-the-product', num: '12', status: 'planned',
          title: L('Feeding the Product', '反哺产品'),
          summary: L('How one customer\'s workaround becomes everyone\'s feature, and why that loop is what justifies the role.',
                     '一个客户的变通做法如何变成所有人的功能，以及为什么正是这个闭环让这个角色值得存在。') },
        { slug: 'when-engagements-fail', num: '13', status: 'planned',
          title: L('When Engagements Fail', '当交付失败时'),
          summary: L('The failure patterns, the signals that arrive early, how to rescue an engagement and when to walk away.',
                     '失败的几种模式、那些早早出现的信号、如何挽救一次交付，以及何时该果断退出。') },
      ],
    },
    {
      key: 'the-craft', roman: 'III',
      name: L('The Craft', '手艺'),
      audience: L('For practicing FDEs', '写给在岗 FDE'),
      chapters: [
        { slug: 'judgment-under-pressure', num: '14', status: 'planned',
          title: L('Judgment Under Pressure', '压力下的判断'),
          summary: L('Saying no, containing scope creep, delivering bad news and handling the ethics nobody briefed you on.',
                     '学会说不、遏制范围蔓延、传达坏消息，以及处理没人提前跟你讲过的伦理问题。') },
      ],
    },
    {
      key: 'the-career', roman: 'IV',
      name: L('The Career', '职业'),
      audience: L('For aspiring and growing FDEs', '写给想入行与正在成长的 FDE'),
      chapters: [
        { slug: 'where-fdes-work', num: '15', status: 'planned',
          title: L('Where FDEs Work', 'FDE 在哪里工作'),
          summary: L('AI lab, startup or outsourced FDE consultancy: how the employer changes the job, the upside and the exits.',
                     'AI 实验室、创业公司还是外包的 FDE 咨询公司：雇主如何改变工作内容、上升空间与退路。') },
        { slug: 'getting-hired', num: '16', status: 'planned',
          title: L('Getting Hired', '拿到录用'),
          summary: L('The interview loops, the decomposition round, the take-home, and a portfolio project shaped like an engagement.',
                     '面试流程、拆解题环节、带回家的作业，以及一个按交付形态打造的作品集项目。') },
        { slug: 'leading-fdes', num: '17', status: 'planned',
          title: L('Leading FDEs', '带领 FDE 团队'),
          summary: L('Running several accounts at once, hiring, team design and the metrics that tell you the team is working.',
                     '同时照看多个客户、招聘、团队设计，以及判断团队是否运转良好的指标。') },
        { slug: 'levels-burnout-and-what-comes-next', num: '18', status: 'planned',
          title: L('Levels, Burnout and What Comes Next', '职级、倦怠与下一步'),
          summary: L('How FDEs grow, why the role burns people out, and where they go next — founder, product, engineering lead.',
                     'FDE 如何成长、这个角色为何让人倦怠，以及他们之后去了哪里——创业、产品还是工程负责人。') },
      ],
    },
    {
      key: 'appendices', roman: '—',
      name: L('Appendices', '附录'),
      audience: L('Reference', '参考资料'),
      chapters: [
        { slug: 'case-file', num: 'A', status: 'planned',
          title: L('Case File', '案例档案'),
          summary: L('Every case in the book, graded by how well it is evidenced.', '书中全部案例，按证据强弱分级。') },
        { slug: 'templates', num: 'B', status: 'planned',
          title: L('Templates', '模板'),
          summary: L('Every template from Part II, blank and filled in.', '第二部分的全部模板，空白版与填写示例。') },
        { slug: 'failure-modes', num: 'C', status: 'planned',
          title: L('Failure Modes', '失败模式'),
          summary: L('Symptom, cause and fix for the ways engagements go wrong.', '交付出错的各种方式：症状、成因与对策。') },
        { slug: 'state-of-the-role', num: 'D', status: 'planned',
          title: L('State of the Role', '这个角色的现状'),
          summary: L('A dated snapshot of who hires FDEs, what they pay and how the role is changing.',
                     '一份注明日期的快照：谁在招 FDE、薪酬多少、这个角色正如何变化。') },
        { slug: 'glossary', num: 'E', status: 'planned',
          title: L('Glossary', '术语表'),
          summary: L('The terms the book uses, defined once.', '书中用到的术语，统一定义一次。') },
        { slug: 'sources', num: 'F', status: 'planned',
          title: L('Sources', '参考来源'),
          summary: L('Every source cited, with its evidence tier.', '全部引用来源及其证据等级。') },
      ],
    },
  ],
};

export default book;
```

- [ ] **Step 3: Register the book on the shelf.** In `src/content/books/index.ts`, make two
  changes:
  - Add `import lastMile from './last-mile/manifest';` after the `aiDrivenSdlc` import.
  - Change the export to `export const BOOKS: Book[] = [aiDrivenSdlc, lastMile];`.

- [ ] **Step 4: Run the test and the build.**

```bash
node --experimental-strip-types --test scripts/__tests__/books-manifest.test.mjs 2>&1 | grep -E "^# (pass|fail)"
npm run build 2>&1 | tail -3 && ls dist/books/last-mile/index.html dist/zh/books/last-mile/index.html
```
  Expected: `# fail 0`. Both landing pages exist, and no chapter pages are built.

- [ ] **Step 5: Commit.**

```bash
git add src/content/books && git commit -m "feat(books): Last Mile manifest and shelf entry

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 5: Write Ch 4–6 (writer → adversarial fact-checker Workflow)

**Files:**
- Create: `src/content/books/last-mile/en/{before-the-engagement,discovery,scoping-and-the-first-win}.html`.
  English only; Task 6 writes the Chinese.

**Interfaces:**
- Consumes: `bible.md` and `outlines/<slug>.md` from Task 2. Fragment format per the Global
  Constraints.
- Produces: English fragments ready for the edit pass, and a list of corrections tagged
  `OTHER:` for chapters outside the batch.

- [ ] **Step 1: Run the Workflow.**

```js
export const meta = {
  name: 'last-mile-pr1-write',
  description: 'Write Last Mile Ch 4–6 (EN) and adversarially fact-check each',
  phases: [{ title: 'Write' }, { title: 'Check' }],
}
const WT = '/Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/fde-book'
const CH = [
  { slug: 'before-the-engagement', num: '4' },
  { slug: 'discovery', num: '5' },
  { slug: 'scoping-and-the-first-win', num: '6' },
]
const RULES = `Read ${WT}/CLAUDE.md, ${WT}/docs/books/last-mile/bible.md (binding) and ${WT}/docs/books/last-mile/outlines/<slug>.md. Match the markup of ${WT}/src/content/books/ai-driven-sdlc/en/code-review.html exactly: <section class="phase">, <div class="phase-num">N</div>, <div class="week">Part II · The Engagement</div>, <h2>, <p class="goal"> (first sentence ≤30 words, stakes + takeaway), STEPs as <div class="step"><div class="step-num">N.k</div><h3 id="kebab-id">. No <table>; grids use .threat-grid/.threat-row with unclassed header <div>s. Every <a> has class="xref"; link only to published book chapters or existing wiki pages listed in the bible; name planned chapters in prose without links. Composites: <div class="callout composite" data-badge="Composite"> — ranges only, never a named company, cite the pattern each beat dramatises. Volatile facts: <div class="callout verified" data-badge="Verified 2026-10">. The template goes in <pre class="standalone"> twice (blank, then filled from the composite). End with the "ready to move on" checklist as a <ul>, then a closing <div class="callout tip">. Every case states its tier (T1–T4) in prose. Never write a fact from memory: re-fetch the source from the brief. 3,500–4,500 words.`
const results = await pipeline(CH,
  c => agent(`Write Chapter ${c.num} (${c.slug}) of the book "Last Mile" in English to ${WT}/src/content/books/last-mile/en/${c.slug}.html. ${RULES.replace('<slug>', c.slug)} Return: word count, cases used with tiers, any bible instruction you could not satisfy.`,
    { label: `write:${c.slug}`, phase: 'Write' }),
  (w, c) => agent(`You are an adversarial fact-checker. Check ${WT}/src/content/books/last-mile/en/${c.slug}.html. For EVERY factual claim (numbers, quotes, dates, company/product facts, attributions, tier labels): open the cited/brief source with WebFetch and confirm it says exactly that. Fix errors directly in the file (minimal edits; keep markup). Check composites contain no point figures and no named company. Check every href exists (book chapters must be published: only how-to-use, before-the-engagement, discovery, scoping-and-the-first-win; wiki paths via ls ${WT}/src/content/**/en/<slug>.html). Return: claims checked, fixes made (before → after, with source), anything unverifiable that you cut, and errors you noticed in OTHER chapters/briefs prefixed "OTHER:".`,
    { label: `check:${c.slug}`, phase: 'Check' }).then(r => ({ slug: c.slug, writer: w, checker: r })))
return results
```

- [ ] **Step 2: If the Workflow returns nulls, resume it.** Use `resumeFromRunId`.

- [ ] **Step 3: Structural checks.**

```bash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/fde-book/src/content/books/last-mile/en
for f in before-the-engagement discovery scoping-and-the-first-win; do
  printf "%s words=%s table=%s bare_a=%s composite=%s pre=%s\n" $f \
    "$(sed 's/<[^>]*>//g' $f.html | wc -w | tr -d ' ')" "$(grep -c '<table' $f.html)" \
    "$(grep -o '<a [^>]*>' $f.html | grep -vc 'class="xref"')" \
    "$(grep -c 'callout composite' $f.html)" "$(grep -c '<pre class="standalone">' $f.html)"; done
```
  Expected for every file: words 3500–4500, `table=0`, `bare_a=0`, `composite≥1`, `pre≥2`.

- [ ] **Step 4: Commit.** Keep the checker reports' `OTHER:` lines in the PR description
  notes.

```bash
git add src/content/books/last-mile/en && git commit -m "content(books): Last Mile Ch 4–6 drafts, fact-checked (EN)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 6: How-to-use page, English edit pass, Chinese, publish flags

**Files:**
- Create: `src/content/books/last-mile/en/how-to-use.html`
- Create: `src/content/books/last-mile/zh/{how-to-use,before-the-engagement,discovery,scoping-and-the-first-win}.html`
- Modify: `src/content/books/last-mile/en/{before-the-engagement,discovery,scoping-and-the-first-win}.html`
  (the edit pass)
- Modify: `src/content/books/last-mile/manifest.ts`. Set `status: 'published'` for these four
  slugs, and sharpen their summaries from the bible.

**Interfaces:**
- Consumes: the Task 5 English fragments, `bible.md` §7 (situation index seed) and
  `outlines/how-to-use.md`.

- [ ] **Step 1: The orchestrator writes `how-to-use.html` by hand.** Use `phase-num` `H` and
  `.week` `Part I · The Role`. It contains these STEPs:
  - **H.1** Who this book is for: three reading paths.
  - **H.2** How evidence is graded: T1–T4, with one example each.
  - **H.3** Composites, and how to recognise them. Include a live
    `.callout.composite` example.
  - **H.4** Verified boxes. Include a live `.callout.verified` example.
  - **H.5** The situation index. ≥25 rows in a `.threat-grid` with three columns: situation /
    go to / why. **Only link entries whose chapter is published**; the rest name the chapter
    in prose.

  Run the same structural check as Task 5, Step 3. Expected: `table=0`, `bare_a=0`.

- [ ] **Step 2: Edit pass by the orchestrator.** Read all three chapters in order and fix four
  things:
  - voice drift;
  - terms that don't match the bible's glossary;
  - repetition across chapters;
  - ledes whose first sentence runs over 30 words.

  Do not let an agent do this pass.

- [ ] **Step 3: The orchestrator writes the Chinese.** It writes all four ZH fragments against
  the final English:
  - Use the `.week` line `第 II 部分 · 一次交付`, or `第 I 部分 · 这个角色` for how-to-use.
  - Badges are `data-badge="合成案例"` / `data-badge="核实于 2026-10"`.
  - Internal hrefs get the `/zh/` prefix.
  - `<pre>` blocks are copied byte-for-byte.
  - Use the bible's Chinese FDE term consistently.

  Verify the `<pre>` blocks are identical:

```bash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/fde-book/src/content/books/last-mile
for f in how-to-use before-the-engagement discovery scoping-and-the-first-win; do
  diff <(perl -0ne 'print join("\n=====\n", /<pre[^>]*>.*?<\/pre>/sg)' en/$f.html) \
       <(perl -0ne 'print join("\n=====\n", /<pre[^>]*>.*?<\/pre>/sg)' zh/$f.html) >/dev/null && echo "$f pre OK" || echo "$f pre DIFF"; done
grep -o 'href="/[^"]*"' zh/*.html | grep -v 'href="/zh/' || echo "zh hrefs OK"
```
  Expected: four `pre OK` lines and `zh hrefs OK`.

- [ ] **Step 4: Flip the statuses and run the manifest test.**

```bash
node --experimental-strip-types --test scripts/__tests__/books-manifest.test.mjs 2>&1 | grep -E "^# (pass|fail)"
```
  Expected: `# fail 0`. This test fails if a published chapter is missing a fragment, or if a
  fragment has no published entry.

- [ ] **Step 5: Commit.**

```bash
git add src/content/books/last-mile && git commit -m "content(books): Last Mile how-to-use + Ch 4–6 edited, ZH, published

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 7: Design coverage, gates, phone check

**Files:**
- Modify: `scripts/__tests__/design/system.mjs`, the `CURATED` array around lines 36–39.

- [ ] **Step 1: Add the book pages to `CURATED`.** Append this after the existing
  `ai-driven-sdlc` lines:

```js
  '/books/last-mile/', '/zh/books/last-mile/',
  '/books/last-mile/how-to-use/', '/zh/books/last-mile/discovery/',
  '/books/last-mile/scoping-and-the-first-win/',
```
  `how-to-use` contains live examples of both new callout variants, so the contrast checks
  in light and dark mode cover their badges.

- [ ] **Step 2: Run all gates.**

```bash
npm run build && npm run verify && npm test && npm run test:design && npm run search:index && npm run test:search
```
  Expected: all pass. Fix any genuine failure in the content or CSS. If a badge fails
  contrast, change only that badge's background token, never the test.

- [ ] **Step 3: Phone check at 390 px.** Take Playwright `iPhone 13` screenshots of
  `/books/last-mile/how-to-use/` (the situation grid) and `/books/last-mile/discovery/` (a
  composite box and a template `<pre>`), served from `dist/`. Look for overflow or unreadable
  grids. A `<pre>` wider than the screen must scroll inside its own box, not the page.

- [ ] **Step 4: Commit.**

```bash
git add scripts/__tests__/design/system.mjs && git commit -m "test(design): cover Last Mile pages

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 8: Changelog, PR, owner review (hard stop), merge, live check

**Files:**
- Create: `src/content/changelog/entries/<YYYY-MM-DD>-last-mile-book.ts`. Use
  `date -u +%F`, then re-check on the merge day.

- [ ] **Step 1: Write the changelog entry.** Copy an existing entry for its import lines.

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: 'YYYY-MM-DD',
  title: L('A second book: Last Mile, the Forward Deployed Engineer\'s handbook, opens with Part II',
           '第二本书《最后一公里：FDE 落地手册》上线，先发第二部分'),
  items: [
    L('<one bullet per published page: how-to-use, Ch 4, Ch 5, Ch 6 — each with its argument>', '<对应中文>'),
    L('New annotation boxes mark composite scenarios and dated facts, so invented examples never read like real cases.',
      '新增两种标注框，分别标出合成案例与注明日期的事实，让虚构示例永远不会被误读为真实案例。'),
  ],
};
export default entry;
```
  Replace the first `items` line with four real bullets written from the final chapters. It
  is shown here as a shape, not as content to ship. Then run
  `node --experimental-strip-types --test scripts/__tests__/changelog.test.mjs 2>&1 | grep -E "^# (pass|fail)"`.
  Expected: `# fail 0`. The test enforces the title cap and that the date matches the
  filename.

- [ ] **Step 2: Commit, push, and open the PR.**

```bash
git add src/content/changelog/entries && git commit -m "changelog: Last Mile book, Part II opening

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
git push && gh pr create --title "Books: Last Mile — the FDE handbook (How to Use + Ch 4–6)" --body-file /tmp/pr-body.md
gh pr checks <n> --watch
```
  The PR body lists what shipped, word counts, the fact-check totals, the `OTHER:` notes and
  the gates. It ends with the attribution lines from the Global Constraints.

- [ ] **Step 3: STOP for owner review on the Vercel preview.** Send the preview links for the
  landing page and Ch 5, plus phone screenshots. Wait for an explicit go.

- [ ] **Step 4: Merge, then verify live.** On go:
  1. If the merge day differs from the entry's date, rename the changelog file and bump its
     `date`.
  2. Run `gh pr merge <n> --squash`.
  3. Delete the remote branch.
  4. Remove the worktree.
  5. Fast-forward `main`.
  6. After 90 s, check both locales of the landing page and all four chapters on
     `https://agentic-ai-wiki.vercel.app` (poll at ≥20 s).

```bash
for p in books/last-mile books/last-mile/how-to-use books/last-mile/before-the-engagement books/last-mile/discovery books/last-mile/scoping-and-the-first-win; do
  for l in "" "zh/"; do curl -s -o /dev/null -w "%{http_code} /$l$p/\n" "https://agentic-ai-wiki.vercel.app/$l$p/"; done; done
```
  Expected: ten `200` lines.

- [ ] **Step 5: Update memory.** In `wiki-ai-sdlc-book.md`, record that PR 1 shipped, the
  checker lessons learned, and that PR 2 (Ch 7–13) comes next.
