# Books Section (PR 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a top-level **Books** section to the Agentic AI Wiki that contains:
- a shelf page at `/books/`;
- a landing page for *From SDLC to AI-Driven SDLC* at `/books/ai-driven-sdlc/`, with a full table of contents in which every chapter is marked "coming soon".

Both pages exist in EN and ZH. Books goes into the top nav and Changelog leaves it.

**Architecture:**
- Each book is a typed manifest: `src/content/books/<book>/manifest.ts` default-exports a `Book`.
- `src/content/books/index.ts` lists the books.
- Two thin views render the shelf and the landing page from manifests only. They reuse the Field Guide's existing TOC classes, so no new CSS is needed.
- Routes are thin `.astro` files per locale, the same pattern as every other section.

**Tech Stack:** Astro 4 static build, TypeScript manifests, `node --test` with `--experimental-strip-types`, Playwright design suite.

**Deviation from spec, deliberate:** the spec puts `BookChapterLayout`, "Referenced in" backlinks, RSS and `llms.txt` entries in PR 1. All four only do anything once at least one chapter is published, and none can be exercised by the build or the design suite with zero chapters. They move to **PR 2 (Part I)**, which publishes the first chapters. Task 5 amends the spec's ship-order table to say so.

## Global Constraints

- Repo worktree: `/Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/books-section`, branch `feat/books-section`. Use absolute paths; the shell is zsh.
- Every page exists in both locales. ZH routes are the same path under `/zh/`.
- Every user-visible string is bilingual, with fluent Chinese, never machine-literal.
- **No new CSS.** Reuse the existing classes: `.hero .kicker .lede .toc .toc-part .toc-part-label .roman .name .meta .toc-item .toc-item-top .toc-num .toc-label .time .toc-desc .wrap`.
- **No `<table>`** in non-blog layouts.
- Files that `node --test` imports must use only `import type` for extensionless imports, because Node can't resolve extensionless value imports. Define the `L()` helper locally in each manifest.
- The nav line in `src/i18n/ui.ts` must still **start** with `nav: { fieldGuide: '`; `scripts/__tests__/llms-txt.test.mjs` parses it by that prefix.
- Changelog entry: one file `src/content/changelog/entries/<merge-date>-books-section.ts`. Its date must equal the actual merge day (`date -u +%F`).
- Gates before PR: `npm run build`, `npm run verify`, `npm test`, `npm run test:design`. The required CI check is `gates`.
- Commit trailer on every commit:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF
  ```

---

### Task 1: Book types, the SDLC book manifest, and the manifest test

**Files:**
- Create: `src/content/books/types.ts`
- Create: `src/content/books/ai-driven-sdlc/manifest.ts`
- Create: `src/content/books/index.ts`
- Create: `src/content/books/ai-driven-sdlc/en/.gitkeep`
- Create: `src/content/books/ai-driven-sdlc/zh/.gitkeep`
- Test: `scripts/__tests__/books-manifest.test.mjs`

**Interfaces:**
- Produces:
  - `type ChapterStatus = 'published' | 'planned'`
  - `interface BookChapter { slug: string; num: string; title: Localized; summary: Localized; status: ChapterStatus }`
  - `interface BookPart { key: string; roman: string; name: Localized; audience: Localized; chapters: BookChapter[] }`
  - `interface Book { slug: string; title: Localized; subtitle: Localized; pitch: Localized; howToRead: Localized[]; parts: BookPart[] }`
  - `BOOKS: Book[]` from `src/content/books/index.ts`
  - `bookChapters(book: Book): (BookChapter & { part: BookPart })[]` (flat, in reading order) and `publishedCount(book: Book): number`, also from `index.ts`

- [ ] **Step 1: Write the failing test** at `scripts/__tests__/books-manifest.test.mjs`

```js
// Validates every book manifest under src/content/books/<book>/manifest.ts.
// Pure Node: imports the manifest .ts directly (type-only imports are erased
// by --experimental-strip-types), so it does not exercise index.ts, which is
// covered by `npm run build`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const booksDir = fileURLToPath(new URL('../../src/content/books/', import.meta.url));
const KEBAB = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const bookDirs = readdirSync(booksDir, { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name).sort();

const bilingual = (v) => typeof v?.en === 'string' && v.en.trim() && typeof v?.zh === 'string' && v.zh.trim();

test('books: at least one book directory with a manifest', () => {
  assert.ok(bookDirs.length > 0, 'no book directories');
  for (const d of bookDirs) assert.ok(existsSync(`${booksDir}${d}/manifest.ts`), `${d}: missing manifest.ts`);
});

for (const dir of bookDirs) {
  test(`books/${dir}: manifest is well-shaped`, async () => {
    const book = (await import(pathToFileURL(`${booksDir}${dir}/manifest.ts`).href)).default;
    assert.ok(book, `${dir}: missing default export`);
    assert.equal(book.slug, dir, `${dir}: slug must equal its directory name`);
    assert.match(book.slug, KEBAB);
    for (const k of ['title', 'subtitle', 'pitch']) assert.ok(bilingual(book[k]), `${dir}: ${k} not bilingual`);
    assert.ok(Array.isArray(book.howToRead) && book.howToRead.length > 0, `${dir}: howToRead empty`);
    book.howToRead.forEach((h, i) => assert.ok(bilingual(h), `${dir}: howToRead[${i}] not bilingual`));
    assert.ok(Array.isArray(book.parts) && book.parts.length > 0, `${dir}: no parts`);

    const partKeys = new Set();
    const slugs = new Set();
    const numeric = [];
    for (const p of book.parts) {
      assert.match(p.key, KEBAB, `${dir}: bad part key ${p.key}`);
      assert.ok(!partKeys.has(p.key), `${dir}: duplicate part key ${p.key}`);
      partKeys.add(p.key);
      assert.ok(p.roman?.trim(), `${dir}/${p.key}: roman empty`);
      assert.ok(bilingual(p.name) && bilingual(p.audience), `${dir}/${p.key}: name/audience not bilingual`);
      assert.ok(p.chapters.length > 0, `${dir}/${p.key}: no chapters`);
      for (const c of p.chapters) {
        assert.match(c.slug, KEBAB, `${dir}: bad chapter slug ${c.slug}`);
        assert.ok(!slugs.has(c.slug), `${dir}: duplicate chapter slug ${c.slug}`);
        slugs.add(c.slug);
        assert.ok(bilingual(c.title) && bilingual(c.summary), `${dir}/${c.slug}: title/summary not bilingual`);
        assert.ok(['published', 'planned'].includes(c.status), `${dir}/${c.slug}: bad status ${c.status}`);
        if (/^\d+$/.test(c.num)) numeric.push(Number(c.num));
      }
    }
    // Numbered chapters run 1..N in reading order, across parts.
    assert.deepEqual(numeric, numeric.map((_, i) => i + 1), `${dir}: chapter numbers must be 1..N in order, got ${numeric.join(',')}`);
  });

  test(`books/${dir}: published chapters have both fragments; fragments have a published chapter`, async () => {
    const book = (await import(pathToFileURL(`${booksDir}${dir}/manifest.ts`).href)).default;
    const chapters = book.parts.flatMap(p => p.chapters);
    const published = new Set(chapters.filter(c => c.status === 'published').map(c => c.slug));
    for (const loc of ['en', 'zh']) {
      const fragDir = `${booksDir}${dir}/${loc}/`;
      for (const slug of published) {
        const f = `${fragDir}${slug}.html`;
        assert.ok(existsSync(f) && statSync(f).size >= 200, `${dir}: published chapter ${slug} missing ${loc} fragment`);
      }
      const files = existsSync(fragDir) ? readdirSync(fragDir).filter(f => f.endsWith('.html')) : [];
      for (const f of files) {
        assert.ok(published.has(f.slice(0, -5)), `${dir}/${loc}/${f}: fragment has no published chapter in the manifest`);
      }
    }
  });
}
```

- [ ] **Step 2: Run it and verify that it fails**

Run: `cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/books-section && node --test --experimental-strip-types scripts/__tests__/books-manifest.test.mjs`
Expected: FAIL. `readdirSync` throws ENOENT because `src/content/books/` does not exist.

- [ ] **Step 3: Create `src/content/books/types.ts`**

```ts
// Shape of a long-form book on the site. One directory per book under
// src/content/books/<slug>/, holding manifest.ts and {en,zh}/<chapter>.html.
// A chapter is listed from the day the book is announced; `status` decides
// whether it has a page yet.
import type { Localized } from '../../i18n/index';

export type ChapterStatus = 'published' | 'planned';

export interface BookChapter {
  /** URL segment, never a number — renumbering must not break links. */
  slug: string;
  /** Display number: '1'..'N' for numbered chapters (contiguous, enforced by test); '' for a preface; 'A','B'… for appendices. */
  num: string;
  title: Localized;
  /** One sentence: the argument the chapter makes. Shown on the landing TOC. */
  summary: Localized;
  status: ChapterStatus;
}

export interface BookPart {
  key: string;
  roman: string;
  name: Localized;
  /** Who the part is for, e.g. "For engineering leaders". */
  audience: Localized;
  chapters: BookChapter[];
}

export interface Book {
  slug: string;
  title: Localized;
  subtitle: Localized;
  /** Landing-page lede: stakes first, takeaway second (CLAUDE.md document-openers rule). */
  pitch: Localized;
  /** "How to read this book" — one item per reader path. */
  howToRead: Localized[];
  parts: BookPart[];
}
```

- [ ] **Step 4: Create `src/content/books/ai-driven-sdlc/manifest.ts`**

```ts
// From SDLC to AI-Driven SDLC: A Migration Handbook.
// Design: docs/superpowers/specs/2026-10-14-ai-driven-sdlc-book-design.md
// Research + bible: docs/books/ai-driven-sdlc/
// All chapters start `planned`; each part's PR flips its chapters to
// `published` and adds the en/zh fragments. Summaries here are the planned
// argument and are rewritten from the bible when the chapter ships.
import type { Localized } from '../../../i18n/index';
import type { Book } from '../types';

const L = (en: string, zh: string): Localized => ({ en, zh });

const book: Book = {
  slug: 'ai-driven-sdlc',
  title: L('From SDLC to AI-Driven SDLC', '从 SDLC 到 AI 驱动的 SDLC'),
  subtitle: L('A Migration Handbook', '一本迁移手册'),
  pitch: L(
    'Adding a coding assistant to an unchanged process mostly moves the queue: code arrives faster, and the work piles up at specification, review and verification instead. This book is a map for changing the process itself — a maturity ladder for each of the eight phases of software delivery, public cases with what was actually measured, and a phase-by-phase migration plan with the guardrails and metrics that tell you whether to climb, hold or roll back.',
    '给一套没有改变的流程加上编码助手，多半只是把队伍挪了个位置：代码来得更快了，活儿却堆到了需求规格、代码评审与验证上。这本书是一张改造流程本身的地图——为软件交付的八个阶段各给出一条成熟度阶梯，列出公开案例及其真正测量过的结果，并给出逐阶段的迁移计划，以及告诉你该继续攀升、原地停留还是回退的护栏与指标。',
  ),
  howToRead: [
    L('Engineering leaders: read Part I in order — it makes the case, defines the maturity model every later chapter uses, and shows what other organisations measured.',
      '工程负责人：按顺序读第一部分——它讲清为什么要改、定义后续每一章都会用到的成熟度模型，并展示其他组织实际测量到了什么。'),
    L('Tech leads and staff engineers: read Chapter 2, then jump to the Part II chapter for the phase you own; each one has the same shape, from the ladder to the migration steps.',
      '技术负责人与资深工程师：先读第 2 章，再直接跳到你负责的那个阶段在第二部分里对应的章节；每一章结构相同，从阶梯一路讲到迁移步骤。'),
    L('Running a migration: Part III is the plan — assess where you are, run a 90-day pilot, scale it, and know in advance what would make you roll back.',
      '正在推动一次迁移：第三部分就是计划——评估你的起点、跑一个 90 天的试点、把它推广开，并事先想清楚什么情况会让你回退。'),
  ],
  parts: [
    {
      key: 'case-and-map', roman: 'I',
      name: L('The Case and the Map', '理由与地图'),
      audience: L('For engineering leaders', '写给工程负责人'),
      chapters: [
        { slug: 'preface', num: '', status: 'planned',
          title: L('Preface: How to Read This Book', '前言：如何阅读本书'),
          summary: L('Who the book is for, the three reading paths, and the maturity model in one picture.',
                     '本书写给谁、三条阅读路径，以及一张图看懂成熟度模型。') },
        { slug: 'the-bottleneck-moves', num: '1', status: 'planned',
          title: L('When Code Gets Cheap, the Bottleneck Moves', '当代码变便宜，瓶颈就会转移'),
          summary: L('Why bolting AI onto the old process disappoints, and where the constraint goes once generation is nearly free.',
                     '为什么把 AI 硬接到旧流程上会令人失望，以及当生成几乎免费之后，约束会转移到哪里。') },
        { slug: 'the-maturity-model', num: '2', status: 'planned',
          title: L('The AI-SDLC Maturity Model', 'AI-SDLC 成熟度模型'),
          summary: L('Five levels across eight phases, with observable criteria for each cell and a self-assessment grid.',
                     '八个阶段、五个级别，每个格子都有可观察的判据，外加一张自评表。') },
        { slug: 'case-studies', num: '3', status: 'planned',
          title: L('Case Studies: Who Did It and What They Measured', '案例研究：谁做到了，测量了什么'),
          summary: L('Public migrations, mandates and rollbacks, each mapped onto the model and rated by how independent its evidence is.',
                     '公开的迁移、强制推行与回退案例，各自对应到模型上，并按证据的独立程度评级。') },
        { slug: 'economics-risk-and-measurement', num: '4', status: 'planned',
          title: L('Economics, Risk and Measurement', '经济性、风险与度量'),
          summary: L('What an AI-driven SDLC costs, what it breaks, and which metrics still mean something once agents write the code.',
                     'AI 驱动的 SDLC 要花多少钱、会弄坏什么，以及当代码由智能体来写之后，哪些指标依然有意义。') },
      ],
    },
    {
      key: 'phase-by-phase', roman: 'II',
      name: L('Phase by Phase', '逐个阶段'),
      audience: L('For tech leads and staff engineers', '写给技术负责人与资深工程师'),
      chapters: [
        { slug: 'requirements-and-specs', num: '5', status: 'planned',
          title: L('Requirements & Specs', '需求与规格'),
          summary: L('When an agent implements whatever the spec says, the spec becomes the product — how intent and specification change at each level.',
                     '当智能体会照着规格把任何东西都实现出来，规格本身就成了产品——意图与规格在每个级别上如何改变。') },
        { slug: 'design-and-architecture', num: '6', status: 'planned',
          title: L('Design & Architecture', '设计与架构'),
          summary: L('Which design decisions can be delegated, which must stay human, and how architecture records keep agents consistent.',
                     '哪些设计决策可以委托出去、哪些必须留在人手里，以及架构决策记录如何让智能体保持一致。') },
        { slug: 'coding', num: '7', status: 'planned',
          title: L('Coding', '编码'),
          summary: L('From autocomplete to background agents: task sizing, instruction files and the repository changes that make delegation safe.',
                     '从自动补全到后台智能体：任务切分、指令文件，以及让委托变得安全的那些代码库改造。') },
        { slug: 'code-review', num: '8', status: 'planned',
          title: L('Code Review', '代码评审'),
          summary: L('Review is where AI-written code queues up; how to keep humans reviewing what matters and machines reviewing the rest.',
                     'AI 写出的代码会在评审处排起长队；如何让人去评审真正要紧的部分，让机器评审其余部分。') },
        { slug: 'testing-and-verification', num: '9', status: 'planned',
          title: L('Testing & Verification', '测试与验证'),
          summary: L('A green suite proves less when the same model wrote the code and the tests — building oracles that agents cannot game.',
                     '当代码和测试出自同一个模型，全绿的测试证明的东西就少了——构建智能体钻不了空子的判据。') },
        { slug: 'ci-cd-and-release', num: '10', status: 'planned',
          title: L('CI/CD & Release', 'CI/CD 与发布'),
          summary: L('Pipelines that fix their own failures, gate on evals and roll out progressively — and where an automated release must stop for a human.',
                     '能自行修复失败、以评测为门禁、渐进式发布的流水线——以及自动化发布必须停下来等人的那些地方。') },
        { slug: 'operations-and-incidents', num: '11', status: 'planned',
          title: L('Operations & Incidents', '运维与故障处理'),
          summary: L('AI in on-call: triage, diagnosis and remediation, with the evidence on what it does to time-to-resolve.',
                     'AI 加入值班：分诊、诊断与修复，以及它对故障解决时长影响的证据。') },
        { slug: 'maintenance-and-migrations', num: '12', status: 'planned',
          title: L('Maintenance & Migrations', '维护与迁移'),
          summary: L('Upgrades, migrations and tech debt — the phase where agents already deliver the clearest measured wins.',
                     '升级、迁移与技术债——这是智能体已经交出最清晰、可测量成果的阶段。') },
      ],
    },
    {
      key: 'the-migration', roman: 'III',
      name: L('The Migration', '迁移'),
      audience: L('For leaders and practitioners together', '写给负责人与实践者共同阅读'),
      chapters: [
        { slug: 'assess-your-starting-point', num: '13', status: 'planned',
          title: L('Assess Your Starting Point', '评估你的起点'),
          summary: L('Place each team and phase on the ladder, and find the prerequisites — tests, observability, review capacity — that cap how far you can climb.',
                     '把每个团队、每个阶段放到阶梯上，并找出限制你能爬多高的那些前提条件——测试、可观测性、评审产能。') },
        { slug: 'the-90-day-pilot', num: '14', status: 'planned',
          title: L('The 90-Day Pilot', '90 天试点'),
          summary: L('Choosing the team, the phase and the baseline, and what a pilot must measure to justify — or stop — the next step.',
                     '如何选团队、选阶段、定基线，以及一次试点必须测量什么，才能为下一步提供依据——或叫停它。') },
        { slug: 'scaling-across-teams', num: '15', status: 'planned',
          title: L('Scaling Across Teams', '向更多团队推广'),
          summary: L('Platform, enablement and governance: what has to be centralised for a migration to survive its second hundred engineers.',
                     '平台、赋能与治理：一次迁移要撑过第二个一百名工程师，哪些东西必须集中起来。') },
        { slug: 'people-and-roles', num: '16', status: 'planned',
          title: L('People: Roles, Skills and the Junior Pipeline', '人：角色、技能与初级工程师培养'),
          summary: L('How roles change, how engineers learn when agents do the first draft, and what happens to hiring.',
                     '角色如何改变、当初稿由智能体完成时工程师如何成长，以及招聘会发生什么。') },
        { slug: 'measuring-success-and-rolling-back', num: '17', status: 'planned',
          title: L('Measuring Success and When to Roll Back', '衡量成效，以及何时回退'),
          summary: L('The scorecard that tells you a level is paying off, and the tripwires that say step back down.',
                     '告诉你某个级别是否值得的计分卡，以及提示你该退回一级的那些警戒线。') },
      ],
    },
    {
      key: 'appendices', roman: '—',
      name: L('Appendices', '附录'),
      audience: L('Reference', '参考资料'),
      chapters: [
        { slug: 'templates', num: 'A', status: 'planned',
          title: L('Templates', '模板'),
          summary: L('Agent instruction file, spec template, review checklist and pilot scorecard, ready to copy.',
                     '智能体指令文件、规格模板、评审清单与试点计分卡，可直接复制使用。') },
        { slug: 'glossary', num: 'B', status: 'planned',
          title: L('Glossary', '术语表'),
          summary: L('The terms this book uses, defined once.',
                     '本书用到的术语，一次讲清。') },
        { slug: 'bibliography', num: 'C', status: 'planned',
          title: L('Bibliography', '参考文献'),
          summary: L('Every source the book cites, with dates.',
                     '本书引用的全部来源，附日期。') },
      ],
    },
  ],
};

export default book;
```

- [ ] **Step 5: Create `src/content/books/index.ts`**

```ts
// The shelf. Add a book by creating src/content/books/<slug>/manifest.ts and
// listing it here; order here is shelf order.
import type { Book, BookChapter, BookPart } from './types';
import aiDrivenSdlc from './ai-driven-sdlc/manifest';

export const BOOKS: Book[] = [aiDrivenSdlc];

export function bookBySlug(slug: string): Book | undefined {
  return BOOKS.find(b => b.slug === slug);
}

/** Every chapter in reading order, each carrying its part. */
export function bookChapters(book: Book): (BookChapter & { part: BookPart })[] {
  return book.parts.flatMap(part => part.chapters.map(c => ({ ...c, part })));
}

export function publishedCount(book: Book): number {
  return bookChapters(book).filter(c => c.status === 'published').length;
}
```

- [ ] **Step 6: Create the empty fragment directories**

Run: `cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/books-section && mkdir -p src/content/books/ai-driven-sdlc/en src/content/books/ai-driven-sdlc/zh && touch src/content/books/ai-driven-sdlc/en/.gitkeep src/content/books/ai-driven-sdlc/zh/.gitkeep`

- [ ] **Step 7: Run the test and verify that it passes**

Run: `node --test --experimental-strip-types scripts/__tests__/books-manifest.test.mjs`
Expected: PASS, 3 tests (one directory test plus two per book). Then run `npm test`; expected: all suites pass, and the books test is picked up by the `scripts/__tests__/*.mjs` glob.

- [ ] **Step 8: Commit**

```bash
git add src/content/books scripts/__tests__/books-manifest.test.mjs
git commit -m "feat(books): book manifest types and the AI-driven SDLC outline

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 2: UI strings for Books

**Files:**
- Modify: `src/i18n/ui.ts`:
  - the `UIStrings` interface (`nav:` line ~6, plus a new `books` block)
  - the `en` object (`nav:` line ~87)
  - the `zh` object (`nav:` line ~224)

**Interfaces:**
- Produces:
  - `ui[locale].nav.books: string` ('Books' / '书籍')
  - `ui[locale].books: { metaTitle, metaDesc, shelfKicker, shelfHeading, shelfLede, howToRead, contents, comingSoon, chaptersPublished: (published: number, total: number) => string, startReading, backToShelf }`

- [ ] **Step 1: Extend the interface.** In `UIStrings`, change the `nav:` type to add `books: string;` right after `blog: string;`. After the `fg: {...}` member, add:

```ts
  books: {
    metaTitle: string; metaDesc: string;
    shelfKicker: string; shelfHeading: string; shelfLede: string;
    howToRead: string; contents: string; comingSoon: string;
    chaptersPublished: (published: number, total: number) => string;
    startReading: string; backToShelf: string;
  };
```

- [ ] **Step 2: Add the `en` values.** On the `en` nav line, insert `books: 'Books', ` immediately after `blog: 'AI Blog', `. The line must still start with `nav: { fieldGuide: '`. After the `en` `fg: {...}` value, add:

```ts
    books: {
      metaTitle: 'Books — Agentic AI Wiki',
      metaDesc: 'Long-form, book-length guides on adopting agentic AI, in English and Chinese.',
      shelfKicker: 'Books',
      shelfHeading: 'Long-form guides, read in order.',
      shelfLede: 'The rest of this wiki is built to be dipped into. A book is built to be read through: each one argues a single case across many chapters, every claim sourced, published part by part as it is written.',
      howToRead: 'How to read this book',
      contents: 'Contents',
      comingSoon: 'Coming soon',
      chaptersPublished: (p, t) => (p === 0 ? `${t} chapters planned · first part in progress` : `${p} of ${t} chapters published`),
      startReading: 'Start reading',
      backToShelf: 'All books',
    },
```

- [ ] **Step 3: Add the `zh` values.** On the `zh` nav line, insert `books: '书籍', ` immediately after `blog: 'AI 博客', `. After the `zh` `fg: {...}` value, add:

```ts
    books: {
      metaTitle: '书籍 — Agentic AI Wiki',
      metaDesc: '关于落地智能体 AI 的长篇、成书规模的指南，中英双语。',
      shelfKicker: '书籍',
      shelfHeading: '长篇指南，按顺序读。',
      shelfLede: '这个维基的其他部分是供你随手翻查的；一本书则是供你从头读到尾的：每一本都用许多章节论证同一件事，每个论断都有出处，并随写作进度一部分一部分地发布。',
      howToRead: '如何阅读本书',
      contents: '目录',
      comingSoon: '即将推出',
      chaptersPublished: (p, t) => (p === 0 ? `共规划 ${t} 章 · 第一部分撰写中` : `已发布 ${p} / ${t} 章`),
      startReading: '开始阅读',
      backToShelf: '全部书籍',
    },
```

- [ ] **Step 4: Verify the strings type-check and the nav-parsing test still passes**

Run: `cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/books-section && npx tsc --noEmit -p . 2>&1 | grep -i "ui.ts" ; node --test --experimental-strip-types scripts/__tests__/llms-txt.test.mjs`
Expected:
- no `ui.ts` errors;
- the llms-txt tests PASS. The section-names test compares only six named keys, so the extra `books` key doesn't affect it.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/ui.ts
git commit -m "feat(books): bilingual UI strings for the Books section

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 3: Shelf and landing views, routes in both locales, OG card and search filter

**Files:**
- Create: `src/components/pages/BooksShelfView.astro`
- Create: `src/components/pages/BookLandingView.astro`
- Create: `src/pages/books/index.astro`, `src/pages/books/[book]/index.astro`
- Create: `src/pages/zh/books/index.astro`, `src/pages/zh/books/[book]/index.astro`
- Modify: `src/content/og.ts` (add `'books'` to `OgSectionKey` and `OG_SECTIONS`)
- Modify: `src/lib/og.ts` (`SLUG`: add `books: 'books'`)
- Modify: `scripts/verify-og.mjs` (`MAP`: add `books: 'books'`)
- Modify: `scripts/build-og.mjs`, only the header comment's card count (14 → 16)
- Generated + commit: `public/og/og-books.png`, `public/og/og-books-zh.png`

**Interfaces:**
- Consumes:
  - `BOOKS`, `bookBySlug`, `bookChapters`, `publishedCount` (Task 1)
  - `ui[locale].books.*` and `ui[locale].nav.books` (Task 2)
  - `ogImageFor(key, locale)` and `pagefindFilterFor(key, locale)` from `src/lib/og.ts`
- Produces:
  - routes `/books/`, `/books/ai-driven-sdlc/`, `/zh/books/`, `/zh/books/ai-driven-sdlc/`
  - OG key `'books'`

- [ ] **Step 1: Register the OG section.** In `src/content/og.ts`, add `| 'books'` to the `OgSectionKey` union after `'blog'`, and add `{ key: 'books' },` to `OG_SECTIONS` after `{ key: 'blog' },`. In `src/lib/og.ts`, add `books: 'books',` to `SLUG` after `blog: 'blog',`. In `scripts/verify-og.mjs`, add `books: 'books',` to `MAP` after `blogs: 'blog',`. In the first line of `scripts/build-og.mjs`, change `14 social-share OG cards (7 sections × en/zh)` to `16 social-share OG cards (8 sections × en/zh)`.

`pagefindFilterFor('books', locale)` now resolves to `section:Books` / `section:书籍` through `ui[locale].nav.books`, with no further change.

- [ ] **Step 2: Run the OG tests to confirm the registry is consistent**

Run: `node --test --experimental-strip-types scripts/__tests__/og.test.mjs scripts/__tests__/verify-og.test.mjs`
Expected: PASS. If a test asserts a hard-coded section count, update that literal from 7 to 8 (or 14 to 16), because the test pins the registry and the registry grew by one.

- [ ] **Step 3: Create `src/components/pages/BooksShelfView.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import type { Locale } from '../../i18n/index';
import { localizeHref } from '../../i18n/index';
import { ui } from '../../i18n/ui';
import { ogImageFor, pagefindFilterFor } from '../../lib/og';
import { BOOKS, bookChapters, publishedCount } from '../../content/books/index';
export interface Props { locale?: Locale }
const { locale = 'en' } = Astro.props;
const t = ui[locale];
---
<BaseLayout title={t.books.metaTitle} description={t.books.metaDesc} locale={locale} image={ogImageFor('books', locale)} pagefindFilter={pagefindFilterFor('books', locale)}>
  <div class="wrap">
    <section class="hero">
      <div class="kicker">{t.books.shelfKicker}</div>
      <h1>{t.books.shelfHeading}</h1>
      <p class="lede">{t.books.shelfLede}</p>
    </section>
    <nav class="toc" aria-label={t.books.shelfKicker}>
      {BOOKS.map(book => (
        <div class="toc-part">
          <a class="toc-item" href={localizeHref(`/books/${book.slug}/`, locale)}>
            <div class="toc-item-top">
              <span class="toc-label">{book.title[locale]}: {book.subtitle[locale]}
                <span class="time">{t.books.chaptersPublished(publishedCount(book), bookChapters(book).length)}</span>
              </span>
            </div>
            <div class="toc-desc">{book.pitch[locale]}</div>
          </a>
        </div>
      ))}
    </nav>
  </div>
</BaseLayout>
```

- [ ] **Step 4: Create `src/components/pages/BookLandingView.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import type { Locale } from '../../i18n/index';
import { localizeHref } from '../../i18n/index';
import { ui } from '../../i18n/ui';
import { ogImageFor, pagefindFilterFor } from '../../lib/og';
import { bookBySlug, bookChapters, publishedCount } from '../../content/books/index';
export interface Props { slug: string; locale?: Locale }
const { slug, locale = 'en' } = Astro.props;
const t = ui[locale];
const book = bookBySlug(slug);
if (!book) throw new Error(`Unknown book slug: ${slug}`);
const all = bookChapters(book);
const first = all.find(c => c.status === 'published');
const chapterHref = (s: string) => localizeHref(`/books/${book.slug}/${s}/`, locale);
---
<BaseLayout title={`${book.title[locale]}: ${book.subtitle[locale]}`} description={book.pitch[locale]} locale={locale} image={ogImageFor('books', locale)} pagefindFilter={pagefindFilterFor('books', locale)}>
  <div class="wrap">
    <div class="breadcrumb" data-pagefind-ignore>
      <a href={localizeHref('/books/', locale)}>{t.books.backToShelf}</a> / {book.title[locale]}
    </div>
    <section class="hero">
      <div class="kicker">{t.nav.books} · {t.books.chaptersPublished(publishedCount(book), all.length)}</div>
      <h1>{book.title[locale]}: <em>{book.subtitle[locale]}</em></h1>
      <p class="lede">{book.pitch[locale]}</p>
      {first && <p><a class="toc-see-all" href={chapterHref(first.slug)}>{t.books.startReading} →</a></p>}
    </section>

    <section>
      <h2>{t.books.howToRead}</h2>
      <ul>{book.howToRead.map(h => <li>{h[locale]}</li>)}</ul>
    </section>

    <nav class="toc" aria-label={t.books.contents}>
      <h2>{t.books.contents}</h2>
      {book.parts.map(part => (
        <div class="toc-part">
          <div class="toc-part-label">
            <span class="roman">{part.roman}</span>
            <span class="name">{part.name[locale]}</span>
            <span class="meta">{part.audience[locale]}</span>
          </div>
          {part.chapters.map(ch => ch.status === 'published' ? (
            <a class="toc-item" href={chapterHref(ch.slug)}>
              <div class="toc-item-top"><span class="toc-num">{ch.num}</span><span class="toc-label">{ch.title[locale]}</span></div>
              <div class="toc-desc">{ch.summary[locale]}</div>
            </a>
          ) : (
            <div class="toc-item" aria-disabled="true">
              <div class="toc-item-top"><span class="toc-num">{ch.num}</span><span class="toc-label">{ch.title[locale]} <span class="time">{t.books.comingSoon}</span></span></div>
              <div class="toc-desc">{ch.summary[locale]}</div>
            </div>
          ))}
        </div>
      ))}
    </nav>
  </div>
</BaseLayout>
```

- [ ] **Step 5: Create the four routes**

`src/pages/books/index.astro`:
```astro
---
import BooksShelfView from '../../components/pages/BooksShelfView.astro';
---
<BooksShelfView locale="en" />
```

`src/pages/zh/books/index.astro`:
```astro
---
import BooksShelfView from '../../../components/pages/BooksShelfView.astro';
---
<BooksShelfView locale="zh" />
```

`src/pages/books/[book]/index.astro`:
```astro
---
import BookLandingView from '../../../components/pages/BookLandingView.astro';
import { BOOKS } from '../../../content/books/index';
export function getStaticPaths() {
  return BOOKS.map(b => ({ params: { book: b.slug } }));
}
const { book } = Astro.params;
---
<BookLandingView slug={book as string} locale="en" />
```

`src/pages/zh/books/[book]/index.astro`:
```astro
---
import BookLandingView from '../../../../components/pages/BookLandingView.astro';
import { BOOKS } from '../../../../content/books/index';
export function getStaticPaths() {
  return BOOKS.map(b => ({ params: { book: b.slug } }));
}
const { book } = Astro.params;
---
<BookLandingView slug={book as string} locale="zh" />
```

- [ ] **Step 6: Build and check the four pages exist with the right OG image**

Run:
```bash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/books-section && npm run build > /tmp/books-build.log 2>&1; echo build=$?
for p in books books/ai-driven-sdlc zh/books zh/books/ai-driven-sdlc; do f=dist/$p/index.html; echo "$p $(test -s $f && echo ok) $(grep -o 'og-books[-a-z]*\.png' $f | head -1) $(grep -c 'Coming soon\|即将推出' $f)"; done
ls public/og/og-books*.png
```
Expected:
- `build=0`;
- each page shows `ok`;
- the EN pages show `og-books.png` and the ZH pages show `og-books-zh.png`;
- the two landing pages show a coming-soon count ≥ 1 (`grep -c` counts lines, not occurrences; all 21 entries are planned);
- both PNG files exist.

Compare warnings with `main`: the trailing `✘ [ERROR] The build was canceled` after `[og] done` is known noise from esbuild, not a new warning.

- [ ] **Step 7: Commit**

```bash
git add src/components/pages/BooksShelfView.astro src/components/pages/BookLandingView.astro src/pages/books src/pages/zh/books src/content/og.ts src/lib/og.ts scripts/verify-og.mjs scripts/build-og.mjs public/og/og-books.png public/og/og-books-zh.png scripts/__tests__/og.test.mjs scripts/__tests__/verify-og.test.mjs
git commit -m "feat(books): shelf and book landing pages in both locales

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 4: Navigation, footer, and design-suite coverage

**Files:**
- Modify: `src/components/SiteHeader.astro` (links array, lines ~11–18)
- Modify: `src/components/SiteFooter.astro` (`sections` array)
- Modify: `scripts/__tests__/design/system.mjs` (`CURATED` array, lines ~25–36)

**Interfaces:**
- Consumes: `t.nav.books` (Task 2) and the routes from Task 3

- [ ] **Step 1: Add the new pages to the design-suite coverage first**, so the next step's nav change is measured. In `CURATED`, add `'/books/', '/books/ai-driven-sdlc/', '/zh/books/ai-driven-sdlc/',` after `'/changelog/',`.

- [ ] **Step 2: Change the header nav.** In `SiteHeader.astro`, remove the `{ href: '/changelog', label: t.nav.changelog },` entry and add `{ href: '/books', label: t.nav.books },` immediately after the `/field-guide` entry. The final order is Field Guide, Books, Concepts, Deep-Dives, Playbooks, Operations, AI Blog, About.

  Books sits next to the Field Guide because both are read-in-order formats. Changelog stays reachable from the footer's Project column, which already lists it.

- [ ] **Step 3: Add Books to the footer's Sections column.** In `SiteFooter.astro`, add `{ href: '/books', label: t.nav.books },` immediately after the `/field-guide` entry in `sections`.

- [ ] **Step 4: Build, then run the design suite**

Run: `cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/books-section && pkill -f "astro preview" ; npm run test:design 2>&1 | tail -15`
Expected: all tests pass, 0 fail. Kill any stray `npm run preview` before believing a failure; a competing server yields a spurious 52/4.

If the nav now overflows at a breakpoint, the suite's label-geometry assertions will say so. The fix is the existing `--nav-fits` breakpoint behaviour, not new CSS. Report the failure rather than adding styles.

- [ ] **Step 5: Check the header markup in the built HTML**

Run: `grep -o 'href="/books"[^>]*>[^<]*' dist/index.html | head -2; grep -c 'href="/changelog"' dist/index.html`
Expected:
- the first command prints the Books link;
- the changelog count is 1, the footer only (the home page may link the changelog in its body too; any count ≥ 1 is fine as long as the header no longer has it).

Confirm with `grep -o '<nav id="site-nav".*</nav>' dist/index.html | grep -c changelog`; expected `0`.

- [ ] **Step 6: Commit**

```bash
git add src/components/SiteHeader.astro src/components/SiteFooter.astro scripts/__tests__/design/system.mjs
git commit -m "feat(books): Books in the top nav and footer; Changelog moves to the footer only

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 5: Inbound link from the SDLC blog post, changelog entry, spec amendment

**Files:**
- Modify: `src/content/blogs/en/ai-native-sdlc-artifact-chain.html` (insert after the `<p class="lede">` on line 1)
- Modify: `src/content/blogs/zh/ai-native-sdlc-artifact-chain.html` (insert after its `<p class="lede">`)
- Create: `src/content/changelog/entries/<YYYY-MM-DD>-books-section.ts`, with the date from `date -u +%F` at merge time
- Modify: `docs/superpowers/specs/2026-10-14-ai-driven-sdlc-book-design.md` (the "Ship order" table)

- [ ] **Step 1: Add the inbound link to the EN post.** Insert this on a new line directly after the `<p class="lede">…</p>` line:

```html
<div class="callout tip"><p>This post is now the starting point for a book: <a href="/books/ai-driven-sdlc/"><em>From SDLC to AI-Driven SDLC: A Migration Handbook</em></a> — a maturity ladder for each phase of delivery, public cases with what was measured, and a phase-by-phase migration plan, published part by part.</p></div>
```

- [ ] **Step 2: Add the inbound link to the ZH post**, in the same position:

```html
<div class="callout tip"><p>这篇文章如今是一本书的起点：<a href="/zh/books/ai-driven-sdlc/">《从 SDLC 到 AI 驱动的 SDLC：一本迁移手册》</a>——为交付的每个阶段给出一条成熟度阶梯、列出公开案例及其实际测量结果，并给出逐阶段的迁移计划，按部分陆续发布。</p></div>
```

- [ ] **Step 3: Write the changelog entry.** Get the date with `date -u +%F` and create `src/content/changelog/entries/<that-date>-books-section.ts`:

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '<that-date>',
  title: L(
    'A new Books section, opening with the plan for “From SDLC to AI-Driven SDLC” — and Books replaces Changelog in the top navigation',
    '新增「书籍」板块，首本是《从 SDLC 到 AI 驱动的 SDLC》的写作计划——顶部导航中「书籍」取代了「更新日志」',
  ),
  items: [
    L(
      'Books — a shelf at /books/ for long-form guides that are meant to be read in order, each one arguing a single case across many chapters and published part by part.',
      '书籍——位于 /books/ 的书架，收录需要按顺序阅读的长篇指南：每一本用许多章节论证同一件事，并逐部分发布。',
    ),
    L(
      'From SDLC to AI-Driven SDLC: A Migration Handbook — the landing page and full table of contents: Part I makes the case and defines a five-level maturity model across eight delivery phases, Part II takes the phases one at a time, Part III is the migration plan. Every chapter is marked coming soon; Part I is in research now.',
      '《从 SDLC 到 AI 驱动的 SDLC：一本迁移手册》——书的首页与完整目录：第一部分讲清理由，并定义一个横跨八个交付阶段的五级成熟度模型；第二部分逐个阶段展开；第三部分是迁移计划。所有章节目前都标为「即将推出」；第一部分正在调研中。',
    ),
    L(
      'Navigation — Books joins the top bar next to the Field Guide, and the Changelog moves to the footer, where it was already listed.',
      '导航——「书籍」加入顶部导航栏，紧挨实战指南；「更新日志」移到页脚（页脚中原本就有它）。',
    ),
  ],
};

export default entry;
```

- [ ] **Step 4: Amend the spec's ship order.** In `docs/superpowers/specs/2026-10-14-ai-driven-sdlc-book-design.md`, replace the table row for PR 1:

`| 1 | Books section, book landing page, layout, tests, nav change, spec. No chapters. Research runs in parallel. |`

with:

`| 1 | Books section: shelf, book landing page with planned TOC, manifest + test, nav change, spec. No chapters. Research runs in parallel. |`

Replace the row for PR 2:

`| 2 | Part I (Preface + Ch 1–4), after owner review |`

with:

`| 2 | Part I (Preface + Ch 1–4), after owner review — plus \`BookChapterLayout\`, "Referenced in" backlinks, and the RSS and \`llms.txt\` entries, which need published chapters to exist and to be tested |`

- [ ] **Step 5: Run the full gates**

Run:
```bash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/books-section && pkill -f "astro preview"; npm run verify > /tmp/v.log 2>&1; echo verify=$?; npm test > /tmp/t.log 2>&1; echo test=$?; node --test --experimental-strip-types scripts/__tests__/design/system.mjs > /tmp/d.log 2>&1; echo design=$?; npm run search:index > /dev/null && npm run test:search > /tmp/s.log 2>&1; echo search=$?
```
Expected: all four print `=0`. `verify` checks that the new blog-post links (`/books/ai-driven-sdlc/` and `/zh/books/ai-driven-sdlc/`) resolve against `dist/`.

- [ ] **Step 6: Commit**

```bash
git add src/content/blogs/en/ai-native-sdlc-artifact-chain.html src/content/blogs/zh/ai-native-sdlc-artifact-chain.html src/content/changelog/entries docs/superpowers/specs/2026-10-14-ai-driven-sdlc-book-design.md docs/superpowers/plans/2026-10-15-books-section.md
git commit -m "content(books): link the SDLC post to the book; changelog; spec ship order

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

---

### Task 6: PR, CI, merge, live verification

**Files:** none. Do not commit `docs/books/` (the research output) in this PR; it ships with PR 2. If it exists in the worktree, leave it untracked. Use `git status` to confirm it isn't staged.

- [ ] **Step 1: Push and open the PR**

```bash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/books-section && git push -u origin feat/books-section
gh pr create --title "feat: Books section, opening with the AI-driven SDLC handbook's landing page" --body "<summary of tasks 1–5; spec + plan paths; gates run>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_0128KoXK1YJihLZTZtGvYtiF"
```

- [ ] **Step 2: Wait for CI**

Run: `gh pr checks <n> --watch --fail-fast`
Expected: `gates` passes (~4 min warm, ~11 min cold on a fresh branch), and the Vercel check passes.

- [ ] **Step 3: Confirm the changelog date equals today's UTC date**, then merge without `--delete-branch` (it fails because `main` is checked out in the primary worktree):

```bash
gh pr merge <n> --squash
cd /Users/cq/Git/ai-wiki/Agentic-AI-Wiki && git worktree remove --force .worktrees/books-section && git branch -D feat/books-section && git push origin --delete feat/books-section && git fetch -q && git merge --ff-only origin/main
```

Hold off on the cleanup line if research output still lives only in the worktree's `docs/books/`. Move it first:

```bash
cp -R .worktrees/books-section/docs/books /private/tmp/claude-501/-Users-cq-Git-ai-wiki/9df03f1f-3839-4131-85fb-8e829dfd0853/scratchpad/
```

- [ ] **Step 4: Live-verify** against the `.vercel.app` host (same deployment; don't poll faster than every 20 s), about 90 s after merge:

```bash
for p in books books/ai-driven-sdlc zh/books zh/books/ai-driven-sdlc blogs/ai-native-sdlc-artifact-chain; do echo "$(curl -s -o /dev/null -w '%{http_code}' https://agentic-ai-wiki.vercel.app/$p/) $p"; sleep 3; done
```
Expected: `200` for all five.
