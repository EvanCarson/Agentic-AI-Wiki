# Site Enhancement Research Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run five parallel research agents over the Agentic AI Wiki, synthesise their output into 20 ranked enhancement ideas (P0/P1/P2), generate HTML+PNG mockups for each, and file 20 per-idea issues + 1 umbrella issue on GitHub.

**Architecture:** Pure orchestration on a research branch (no site code changes). Five `Agent` subagents dispatched in one parallel block, each producing a strict-JSON idea report. The orchestrator merges/dedupes/tiers, generates mockups, runs Playwright screenshots (reusing the existing `scripts/screenshot.mjs` `capture()` export), and files issues via `gh`. All artifacts live under `docs/research/` on `research/site-enhancements-2026-05-19`; branch is pushed but not PR'd.

**Tech Stack:** Node 20 (`--experimental-strip-types`), Playwright 1.60 (existing devDep), `gh` CLI (already authed as repo admin), Astro 4 (not invoked — we don't touch the build). All scripts in `node:test` + `assert/strict` style matching the existing `scripts/__tests__/` suite.

---

## File structure

**Created:**
- `scripts/research/issue-body.mjs` — pure: compose issue markdown from an idea card. Easy to unit-test.
- `scripts/research/screenshot-mockups.mjs` — thin wrapper around `scripts/screenshot.mjs#capture()` that points at `docs/research/mockups/*.html` via `file://` URLs.
- `scripts/research/create-labels.mjs` — idempotent label create via `gh label`.
- `scripts/research/file-issues.mjs` — reads `docs/research/ideas-final.json`, files 20 issues + 1 umbrella, prints URLs.
- `scripts/__tests__/issue-body.test.mjs` — unit tests for `issue-body.mjs`.
- `docs/research/raw/<lens>.json` — raw output from each of the 5 agents (5 files).
- `docs/research/ideas-final.json` — synthesised, deduped, ranked array of 20 ideas.
- `docs/research/mockups/<NN>-<slug>.html` — 20 self-contained HTML mockups.
- `docs/research/mockups/screenshots/<NN>-<slug>.{desktop,mobile}.png` — 40 PNGs.
- `docs/research/REPORT.md` — human-readable index / mirror of the umbrella issue body.

**Not touched:** `src/`, `astro.config.mjs`, `vercel.json`, `manifest.ts` files, `src/content/changelog/entries/`, `src/i18n/ui.ts`. This is research output — no site behaviour changes.

**File responsibilities, one-liner each:**
- `issue-body.mjs` — `composeIssueBody(idea, branch, repo)` → markdown string. Pure.
- `screenshot-mockups.mjs` — main: iterate all `.html` under `docs/research/mockups/`, screenshot each via reusable `capture()`.
- `create-labels.mjs` — main: idempotently ensure 9 labels exist (`gh label create … || gh label edit …`).
- `file-issues.mjs` — main: load `ideas-final.json`, for each idea call `composeIssueBody`, run `gh issue create`, collect issue numbers; finally file umbrella with all numbers.

---

## Task 1: Bootstrap research directories

**Files:**
- Create: `docs/research/.gitkeep`
- Create: `docs/research/raw/.gitkeep`
- Create: `docs/research/mockups/.gitkeep`
- Create: `docs/research/mockups/screenshots/.gitkeep`
- Create: `scripts/research/.gitkeep`

- [ ] **Step 1: Create the directory skeleton**

```bash
mkdir -p docs/research/raw \
         docs/research/mockups/screenshots \
         scripts/research
touch docs/research/.gitkeep \
      docs/research/raw/.gitkeep \
      docs/research/mockups/.gitkeep \
      docs/research/mockups/screenshots/.gitkeep \
      scripts/research/.gitkeep
```

- [ ] **Step 2: Verify**

```bash
find docs/research scripts/research -type f
```
Expected output: 5 `.gitkeep` files.

- [ ] **Step 3: Commit**

```bash
git add docs/research scripts/research
git commit -m "research: scaffold output directories"
```

---

## Task 2: Write the issue-body composer + tests (TDD)

**Files:**
- Create: `scripts/research/issue-body.mjs`
- Create: `scripts/__tests__/issue-body.test.mjs`

This is the only pure-function piece — worth TDD'ing because its output is hard to eyeball-verify across 20 issues.

- [ ] **Step 1: Write the failing test**

```javascript
// scripts/__tests__/issue-body.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { composeIssueBody, composeUmbrellaBody, composeTitle } from '../research/issue-body.mjs';

const BRANCH = 'research/site-enhancements-2026-05-19';
const REPO = 'EvanCarson/Agentic-AI-Wiki';

const sampleIdea = {
  rank: 3,
  slug: 'prev-next-on-detail-pages',
  title: 'Add prev/next navigation on detail pages',
  tier: 'P0',
  lenses: ['ux-ia', 'engagement'],
  problem: 'Field Guide chapters and Concepts have ordered manifests but no in-page prev/next; readers must return to the index.',
  proposal: 'Render prev/next buttons in the detail-page footer using the existing manifest order.',
  evidence: 'NAVIGATION-PLAN.md P3 calls this out. Lilian Weng and Anthropic agent guide both have it.',
  impact: 'H',
  effort: 'S',
  risk: 'L',
  competitor_examples: ['https://lilianweng.github.io/', 'https://www.anthropic.com/research/building-effective-agents'],
  affected_pages: ['src/pages/field-guide/[chapter].astro', 'src/components/SectionDetailView.astro'],
  open_questions: ['Wrap-around at the section boundary, or stop?'],
};

test('composeTitle prefixes with tier', () => {
  assert.equal(composeTitle(sampleIdea), '[P0] Add prev/next navigation on detail pages');
});

test('composeIssueBody includes all required sections', () => {
  const body = composeIssueBody(sampleIdea, BRANCH, REPO);
  for (const heading of ['## Problem', '## Proposal', '## Mockup', '## Evidence', '## Impact', '## Affected pages', '## Open questions']) {
    assert.ok(body.includes(heading), `missing section: ${heading}`);
  }
});

test('composeIssueBody embeds both desktop and mobile screenshot URLs against the branch', () => {
  const body = composeIssueBody(sampleIdea, BRANCH, REPO);
  // Hyphen-separated to match scripts/screenshot.mjs `${name}-${label}.png` naming.
  const desktop = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/docs/research/mockups/screenshots/03-prev-next-on-detail-pages-desktop.png`;
  const mobile  = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/docs/research/mockups/screenshots/03-prev-next-on-detail-pages-mobile.png`;
  assert.ok(body.includes(desktop), 'missing desktop screenshot URL');
  assert.ok(body.includes(mobile),  'missing mobile screenshot URL');
});

test('composeIssueBody links to the HTML mockup via blob URL on branch', () => {
  const body = composeIssueBody(sampleIdea, BRANCH, REPO);
  const blob = `https://github.com/${REPO}/blob/${BRANCH}/docs/research/mockups/03-prev-next-on-detail-pages.html`;
  assert.ok(body.includes(blob), 'missing HTML mockup blob URL');
});

test('composeIssueBody renders the I/E/R triple', () => {
  const body = composeIssueBody(sampleIdea, BRANCH, REPO);
  assert.match(body, /Impact:\s*\*\*H\*\*/);
  assert.match(body, /Effort:\s*\*\*S\*\*/);
  assert.match(body, /Risk:\s*\*\*L\*\*/);
});

test('composeUmbrellaBody groups ideas by tier with cross-refs', () => {
  const ideas = [
    { ...sampleIdea, rank: 1, tier: 'P0', issueNumber: 101 },
    { ...sampleIdea, rank: 2, tier: 'P1', issueNumber: 102, title: 'B', slug: 'b' },
    { ...sampleIdea, rank: 3, tier: 'P2', issueNumber: 103, title: 'C', slug: 'c' },
  ];
  const body = composeUmbrellaBody(ideas, BRANCH, REPO);
  assert.ok(body.includes('## P0'), 'missing P0 heading');
  assert.ok(body.includes('## P1'), 'missing P1 heading');
  assert.ok(body.includes('## P2'), 'missing P2 heading');
  assert.ok(body.includes('#101'), 'missing P0 issue ref');
  assert.ok(body.includes('#102'), 'missing P1 issue ref');
  assert.ok(body.includes('#103'), 'missing P2 issue ref');
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
node --test --experimental-strip-types 'scripts/__tests__/issue-body.test.mjs'
```
Expected: All 6 tests fail with `Cannot find module ../research/issue-body.mjs`.

- [ ] **Step 3: Implement `issue-body.mjs`**

```javascript
// scripts/research/issue-body.mjs
// Pure functions: build markdown for per-idea + umbrella research issues.
// No I/O, no `gh` calls — easy to unit-test.

/**
 * Slug must be already kebab-cased and unique across all 20 ideas.
 * `rank` is 1..20; padded to 2 digits in filenames.
 */
function pad2(n) { return String(n).padStart(2, '0'); }

function mockupPaths(idea) {
  // Hyphen suffix matches scripts/screenshot.mjs `${name}-${label}.png`.
  const stem = `${pad2(idea.rank)}-${idea.slug}`;
  return {
    html: `docs/research/mockups/${stem}.html`,
    desktopPng: `docs/research/mockups/screenshots/${stem}-desktop.png`,
    mobilePng:  `docs/research/mockups/screenshots/${stem}-mobile.png`,
  };
}

function rawUrl(repo, branch, path) {
  return `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
}

function blobUrl(repo, branch, path) {
  return `https://github.com/${repo}/blob/${branch}/${path}`;
}

export function composeTitle(idea) {
  return `[${idea.tier}] ${idea.title}`;
}

export function composeIssueBody(idea, branch, repo) {
  const paths = mockupPaths(idea);
  const lenses = idea.lenses.map(l => `\`lens/${l}\``).join(', ');
  const competitors = (idea.competitor_examples ?? []).length
    ? idea.competitor_examples.map(c => `- ${c.startsWith('http') ? `<${c}>` : c}`).join('\n')
    : '_None cited._';
  const affected = (idea.affected_pages ?? []).length
    ? idea.affected_pages.map(p => `- \`${p}\``).join('\n')
    : '_TBD during scoping._';
  const questions = (idea.open_questions ?? []).length
    ? idea.open_questions.map(q => `- ${q}`).join('\n')
    : '_None._';

  return `> Research idea ${pad2(idea.rank)}/20 · Tier **${idea.tier}** · Lenses: ${lenses}

## Problem

${idea.problem}

## Proposal

${idea.proposal}

## Mockup

Desktop:

![desktop mockup](${rawUrl(repo, branch, paths.desktopPng)})

Mobile:

![mobile mockup](${rawUrl(repo, branch, paths.mobilePng)})

Live preview (HTML, branch-pinned): ${blobUrl(repo, branch, paths.html)}

## Evidence & competitor refs

${idea.evidence}

${competitors}

## Impact / Effort / Risk

- Impact: **${idea.impact}**
- Effort: **${idea.effort}**
- Risk: **${idea.risk}**

## Affected pages

${affected}

## Open questions

${questions}

---

_Filed by the 2026-05-19 multi-lens research pass. See umbrella issue for the full ranked list._
`;
}

export function composeUmbrellaBody(ideas, branch, repo) {
  const byTier = { P0: [], P1: [], P2: [] };
  for (const i of ideas) byTier[i.tier].push(i);

  const line = (i) => `- #${i.issueNumber} — **${i.title}** — ${i.problem.split('. ')[0].slice(0, 120)}.`;
  const block = (tier, label) => {
    if (byTier[tier].length === 0) return `## ${tier} — ${label}\n\n_None._\n`;
    return `## ${tier} — ${label}\n\n${byTier[tier].map(line).join('\n')}\n`;
  };

  return `# Site enhancement research — 20 ideas, ranked

Methodology: five parallel research agents (UX/IA, content, competitor scan, SEO/perf/a11y, engagement) each produced 5–7 idea cards; output was deduped, scored, and tiered into P0/P1/P2.

Artifacts on branch \`${branch}\`:

- Spec: ${blobUrl(repo, branch, 'docs/superpowers/specs/2026-05-19-site-enhancement-research-design.md')}
- Plan: ${blobUrl(repo, branch, 'docs/superpowers/plans/2026-05-19-site-enhancement-research.md')}
- Mockups: ${blobUrl(repo, branch, 'docs/research/mockups')}
- Raw agent reports: ${blobUrl(repo, branch, 'docs/research/raw')}

${block('P0', 'Must-have')}
${block('P1', 'High value')}
${block('P2', 'Nice-to-have')}
---

_This umbrella issue is the entry point. Each P-tagged issue links its mockups directly; close issues individually as they ship or as \`wontfix\`._
`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
node --test --experimental-strip-types 'scripts/__tests__/issue-body.test.mjs'
```
Expected: All 6 tests pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/research/issue-body.mjs scripts/__tests__/issue-body.test.mjs
git commit -m "research: add issue-body composer with TDD coverage"
```

---

## Task 3: Write the screenshot-mockups script

**Files:**
- Create: `scripts/research/screenshot-mockups.mjs`

Reuses the `capture()` export from `scripts/screenshot.mjs`. Targets are all `.html` files under `docs/research/mockups/` rendered via `file://` URLs.

- [ ] **Step 1: Write the script**

```javascript
// scripts/research/screenshot-mockups.mjs
// Render every docs/research/mockups/*.html at 1280x800 (desktop) and
// 390x844 (mobile), via the reusable `capture()` from scripts/screenshot.mjs.
//
// Usage: node scripts/research/screenshot-mockups.mjs
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { capture } from '../screenshot.mjs';

// fileURLToPath normalises Windows drive paths; new URL(...).pathname does not.
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../');
const mockupsDir = path.join(repoRoot, 'docs/research/mockups');
const outDir = path.join(mockupsDir, 'screenshots');

const htmlFiles = readdirSync(mockupsDir)
  .filter(f => f.endsWith('.html'))
  .sort();

if (htmlFiles.length === 0) {
  console.error(`No .html files in ${mockupsDir}`);
  process.exit(1);
}

const targets = htmlFiles.map(f => ({
  url: pathToFileURL(path.join(mockupsDir, f)).toString(),
  name: f.replace(/\.html$/, ''),
}));

// capture() resolves `target.url` against `base` via `new URL(...)`. Because
// our urls are already absolute file:// URLs, base is unused but required.
await capture({ base: 'file:///', outDir, targets });
console.log(`done: ${htmlFiles.length * 2} screenshots`);
```

- [ ] **Step 2: Smoke-test with a placeholder mockup**

Create a one-off placeholder so the script can run end-to-end before the real mockups land.

```bash
cat > docs/research/mockups/00-smoke.html <<'EOF'
<!doctype html><html><head><meta charset="utf-8"><title>smoke</title>
<style>body{font:14px system-ui;padding:2rem;background:#0a0a0a;color:#eee}</style>
</head><body><h1>screenshot smoke test</h1><p>If this renders, Playwright is wired up.</p></body></html>
EOF

node scripts/research/screenshot-mockups.mjs
```

Expected output: `saved …/00-smoke-desktop.png`, `saved …/00-smoke-mobile.png`, `done: 2 screenshots`.

- [ ] **Step 3: Verify PNGs exist and are non-trivial**

```bash
ls -la docs/research/mockups/screenshots/
file docs/research/mockups/screenshots/00-smoke-desktop.png
```
Expected: both PNGs present, `PNG image data, … 8-bit/color RGB`.

- [ ] **Step 4: Remove the smoke placeholder (we'll regenerate from real mockups in Task 8)**

```bash
rm docs/research/mockups/00-smoke.html \
   docs/research/mockups/screenshots/00-smoke-desktop.png \
   docs/research/mockups/screenshots/00-smoke-mobile.png
```

- [ ] **Step 5: Commit**

```bash
git add scripts/research/screenshot-mockups.mjs
git commit -m "research: add screenshot-mockups runner (reuses capture())"
```

---

## Task 4: Write the label-creation script

**Files:**
- Create: `scripts/research/create-labels.mjs`

- [ ] **Step 1: Write the script**

```javascript
// scripts/research/create-labels.mjs
// Idempotently create the 9 research labels. Each label is created if
// missing and edited if present, so running twice is safe.
//
// Usage: node scripts/research/create-labels.mjs
import { spawnSync } from 'node:child_process';

const LABELS = [
  { name: 'research',         color: 'cccccc', description: 'Discovery output, not yet committed work' },
  { name: 'tier/P0',          color: 'd73a4a', description: 'Must-have / next sprint' },
  { name: 'tier/P1',          color: 'fb8500', description: 'High value, scope first' },
  { name: 'tier/P2',          color: 'fde047', description: 'Backlog candidate' },
  { name: 'lens/ux-ia',       color: '1f77b4', description: 'Surfaced by IA/UX audit' },
  { name: 'lens/content',     color: '2ca02c', description: 'Surfaced by content audit' },
  { name: 'lens/competitor',  color: '9467bd', description: 'Borrowed from a peer site' },
  { name: 'lens/seo-perf',    color: '17becf', description: 'SEO / perf / a11y win' },
  { name: 'lens/engagement',  color: 'e377c2', description: 'Retention / engagement' },
];

function gh(args) {
  const r = spawnSync('gh', args, { encoding: 'utf8' });
  return { ok: r.status === 0, stdout: r.stdout, stderr: r.stderr };
}

for (const l of LABELS) {
  const create = gh(['label', 'create', l.name, '--color', l.color, '--description', l.description]);
  if (create.ok) {
    console.log(`created ${l.name}`);
    continue;
  }
  // Likely "already exists" — try edit.
  const edit = gh(['label', 'edit', l.name, '--color', l.color, '--description', l.description]);
  if (edit.ok) {
    console.log(`updated ${l.name}`);
  } else {
    console.error(`FAILED ${l.name}: ${create.stderr.trim()} / ${edit.stderr.trim()}`);
    process.exit(1);
  }
}
console.log(`done: ${LABELS.length} labels`);
```

- [ ] **Step 2: Run it (idempotent)**

```bash
node scripts/research/create-labels.mjs
```
Expected: 9 lines of `created` or `updated`, then `done: 9 labels`. Exit 0.

- [ ] **Step 3: Run it again to confirm idempotency**

```bash
node scripts/research/create-labels.mjs
```
Expected: this time all 9 lines say `updated`. Exit 0.

- [ ] **Step 4: Verify with gh**

```bash
gh label list --json name -q '.[].name' | grep -E '^(research|tier/|lens/)' | sort
```
Expected: 9 lines matching the 9 label names.

- [ ] **Step 5: Commit**

```bash
git add scripts/research/create-labels.mjs
git commit -m "research: add idempotent label-creation script"
```

---

## Task 5: Write the issue-filing orchestrator

**Files:**
- Create: `scripts/research/file-issues.mjs`

- [ ] **Step 1: Write the script**

```javascript
// scripts/research/file-issues.mjs
// Load docs/research/ideas-final.json, file 20 per-idea issues, then
// one umbrella issue referencing all 20.
//
// Pre-requisites: labels exist (run create-labels.mjs first), research
// branch is pushed (so raw-content URLs resolve in issue bodies).
//
// Usage: node scripts/research/file-issues.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { composeTitle, composeIssueBody, composeUmbrellaBody } from './issue-body.mjs';

const REPO = 'EvanCarson/Agentic-AI-Wiki';
const BRANCH = 'research/site-enhancements-2026-05-19';
const ideas = JSON.parse(readFileSync('docs/research/ideas-final.json', 'utf8'));

if (!Array.isArray(ideas) || ideas.length !== 20) {
  console.error(`expected 20 ideas, got ${ideas?.length}`);
  process.exit(1);
}

function ghCreate(title, body, labels) {
  const args = ['issue', 'create', '--repo', REPO, '--title', title, '--body', body];
  for (const l of labels) { args.push('--label', l); }
  const r = spawnSync('gh', args, { encoding: 'utf8' });
  if (r.status !== 0) {
    console.error(`gh issue create failed: ${r.stderr}`);
    process.exit(1);
  }
  // gh prints the issue URL as the last line of stdout.
  const url = r.stdout.trim().split('\n').pop();
  const num = Number(url.split('/').pop());
  return { url, num };
}

// Stable order: by rank ascending.
ideas.sort((a, b) => a.rank - b.rank);

for (const idea of ideas) {
  const labels = ['research', `tier/${idea.tier}`, ...idea.lenses.map(l => `lens/${l}`)];
  const { url, num } = ghCreate(composeTitle(idea), composeIssueBody(idea, BRANCH, REPO), labels);
  idea.issueNumber = num;
  idea.issueUrl = url;
  console.log(`#${num} — ${idea.title}`);
}

// Persist updated ideas (now with issueNumber) so the umbrella body can ref them.
writeFileSync('docs/research/ideas-final.json', JSON.stringify(ideas, null, 2) + '\n');

const umbrella = ghCreate(
  `Site enhancement research — 20 ideas, ranked (2026-05-19)`,
  composeUmbrellaBody(ideas, BRANCH, REPO),
  ['research'],
);
console.log(`umbrella: ${umbrella.url}`);

// Also write a local report mirroring the umbrella body.
writeFileSync('docs/research/REPORT.md', composeUmbrellaBody(ideas, BRANCH, REPO));
console.log('wrote docs/research/REPORT.md');
```

- [ ] **Step 2: Commit (will run in Task 11; just landing the script now)**

```bash
git add scripts/research/file-issues.mjs
git commit -m "research: add issue-filing orchestrator (per-idea + umbrella)"
```

---

## Task 6: Dispatch the five research agents in parallel

**Files:**
- Create: `docs/research/raw/ux-ia.json`
- Create: `docs/research/raw/content.json`
- Create: `docs/research/raw/competitor.json`
- Create: `docs/research/raw/seo-perf.json`
- Create: `docs/research/raw/engagement.json`

This is the longest-running task. All five agents run in a single tool-call block.

- [ ] **Step 1: Dispatch all 5 agents in one parallel `Agent` block**

Make ONE assistant message that contains five `Agent` tool calls. Each agent gets the boilerplate below plus its lens-specific brief.

**Shared boilerplate (prepend to every agent prompt):**

```
You are one of five research agents auditing the Agentic AI Wiki
(https://agentic-ai-wiki.vercel.app, repo: EvanCarson/Agentic-AI-Wiki,
local checkout at /Users/cq/Git/ai-wiki/Agentic-AI-Wiki/.worktrees/research-site-enhancements).

Repo context (read these BEFORE proposing anything):
- CLAUDE.md — project conventions (bilingual en/zh, manifest-driven content)
- NAVIGATION-PLAN.md — existing IA audit; do NOT re-propose what's already shipped
- src/content/{field-guide,concepts,deep-dives}/manifest.ts (deep-dives now per-group under groups/<key>.ts)
- src/styles/{site,guide}.css — class vocabulary

You MUST return ONE JSON object (no prose around it, no markdown fences)
matching this schema EXACTLY:

{
  "lens": "<your lens key>",
  "ideas": [
    {
      "id": "<lens>-NN",
      "title": "<short title>",
      "problem": "<1–3 sentences>",
      "proposal": "<1–3 sentences>",
      "evidence": "<why this matters, with file refs / metric refs / competitor refs>",
      "impact": "H" | "M" | "L",
      "effort": "S" | "M" | "L",
      "risk":   "L" | "M" | "H",
      "competitor_examples": ["<url-or-name>", ...],
      "affected_pages": ["<path or route>", ...],
      "open_questions": ["<question>", ...],
      "mockup_hint": "<one paragraph telling a mockup author what to draw>"
    }
  ],
  "notes": "<freeform — overlaps you spotted, ideas you considered but dropped>"
}

Constraints:
- Return between 5 and 7 ideas. Quality over quantity.
- Don't re-propose anything already shipped per NAVIGATION-PLAN.md section 4.
- Don't propose changes that would break bilingual parity.
- Cite file paths or URLs in `evidence`.

When done, write your JSON to docs/research/raw/<lens>.json AND echo it
back as your final message so the orchestrator can parse it.
```

**Agent 1 — UX / IA — lens key `ux-ia`. Brief appended after boilerplate:**

```
Lens: UX / Information Architecture.
Mission: navigation, breadcrumbs, prev/next, mobile sidebar behavior,
scent of information, cross-surface lateral movement, locale switcher,
anchor-link scent on long pages, "start here" affordances.

Look for:
- Detail pages without prev/next within a section's manifest order
- Mobile: where the sticky sidebar disappears entirely (Deep-Dives /
  Concepts detail pages on phones — only a "back to index" link)
- Cross-surface links (Field Guide chapter → relevant Concept / Deep-Dive)
- Breadcrumb completeness (Home › Section › Group › Entry)
- Long Deep-Dive index — group jump-nav, prerequisite badges
- Locale switcher discoverability and behaviour (does it preserve route?)

Walk the live site at https://agentic-ai-wiki.vercel.app. Try /, /field-guide,
/concepts, /deep-dives, /about, /changelog and a representative detail page
in each section. Do the same on a mobile viewport (DevTools).

Write to docs/research/raw/ux-ia.json.
```

**Agent 2 — Content — lens key `content`:**

```
Lens: Content quality & gaps.
Mission: spot missing topics, stale sections, inconsistent tone en↔zh,
weak intros, jargon walls, uneven depth, missing TL;DRs.

Look for:
- Concept↔Deep-Dive pairs that don't yet exist but should (e.g. a Concept
  with no graduate-to essay)
- Field Guide chapters where the next-step essay is missing
- zh translations that read machine-literal (CLAUDE.md flags this as a defect)
- Code blocks without language tags
- Long entries that lack a TL;DR / key-takeaways pattern
- Consistency: do all Deep-Dive entries open with "Deep Dive · <Group>"?
- Topic gaps relative to the agentic-AI landscape circa 2026: e.g. coverage
  of agent UX/HCI, evaluation, AgentOps maturity. Don't restate what exists —
  propose specific missing entries by title.

Cross-check: src/content/{concepts,deep-dives}/manifest.ts and the per-group
files under deep-dives/groups/.

Write to docs/research/raw/content.json.
```

**Agent 3 — Competitor scan — lens key `competitor`:**

```
Lens: Competitor scan.
Mission: survey peer sites; identify patterns we lack.

Required sources (visit each; cite URLs in evidence):
- https://lilianweng.github.io/
- https://www.anthropic.com/research/building-effective-agents
- https://huggingface.co/learn/agents-course
- https://www.eugeneyan.com/
- https://huyenchip.com/
- https://simonwillison.net/
- https://www.deepmind.com/blog
- https://github.com/openai/openai-cookbook
- https://www.promptingguide.ai/

Things to look for AT PEER SITES:
- Estimated reading time
- "Cite this page" snippet / citation conventions
- Footnote / sidenote patterns (Tufte-style)
- Code-block copy buttons + language badges
- Scroll-spy table of contents
- "What changed" / last-updated badges per entry
- Public roadmap / "what's next"
- Newsletter / RSS / Atom
- Dark-mode polish and toggle
- "Related reading" patterns

Cite the source URL in EVERY idea's `evidence`. Don't propose a feature
without showing where you saw it work.

Use WebFetch and WebSearch as needed. Write to docs/research/raw/competitor.json.
```

**Agent 4 — SEO / Perf / a11y — lens key `seo-perf`:**

```
Lens: SEO / Performance / Accessibility.
Mission: concrete shippable wins.

To do BEFORE proposing:
- Run `npm run build` to produce dist/ if not present.
- Read astro.config.mjs, vercel.json, src/layouts/*.astro.
- Inspect a built page (e.g. dist/concepts/what-is-an-agent/index.html) for
  <head> tags, OG cards, JSON-LD, hreflang, canonical, lang attr.
- Inspect src/styles/site.css for focus-ring patterns, prefers-reduced-motion
  respect, color-contrast in dark mode (if any).
- Check sitemap.xml output.

Look for:
- Missing OG / Twitter card image, missing default OG fallback
- Missing JSON-LD (Article on detail pages, BreadcrumbList on detail, ItemList
  on index pages)
- <img> without loading="lazy" or width/height
- Missing skip-to-content link
- Focus rings on interactive elements (chapter sidebar, locale switcher)
- Color contrast issues
- Pagefind: tunable filters (by section/group)? Index excludes nav chrome?
- hreflang completeness for en↔zh
- `lang="zh"` (vs `zh-Hans`) on zh pages — astro.config sets zh-Hans in
  sitemap but pages may render `lang="zh"`

Write to docs/research/raw/seo-perf.json.
```

**Agent 5 — Engagement — lens key `engagement`:**

```
Lens: Engagement / Retention.
Mission: mechanics that bring readers back or deepen a single visit.

Look for:
- RSS / Atom feed for the changelog (Astro has a built-in `@astrojs/rss`)
- Newsletter signup (consider a low-cost option like Buttondown or a static
  mailto: with a future upgrade path; avoid CMP-heavy services)
- "Save for later" via localStorage (no auth, no backend)
- Copy-code-block button (vanilla JS, ~30 lines)
- "Cite this page" snippet block (BibTeX + plain)
- Share affordances with pre-selected anchor
- "What others read next" within a section (manifest-driven, no analytics)
- End-of-article CTA (next chapter / related deep-dives)
- "New since you last visited" via localStorage timestamp vs changelog feed
- In-page feedback ("was this useful?" thumbs — store anon counts where?)
- Search prominence — Pagefind is wired; is it discoverable from every page?

Walk the live site. Each proposal must say where the new affordance lives
and how it stays bilingual without a backend.

Write to docs/research/raw/engagement.json.
```

Dispatch all 5 in one tool-call block. Each can run up to ~15 min; expect 5–12 min wall time.

- [ ] **Step 2: Verify all 5 JSONs are valid and non-empty**

```bash
for f in docs/research/raw/*.json; do
  echo "=== $f ==="
  node -e "const x=JSON.parse(require('fs').readFileSync('$f','utf8')); console.log('lens='+x.lens, 'ideas='+x.ideas.length)"
done
```
Expected: 5 lines, each `lens=… ideas=5..7`.

- [ ] **Step 3: Commit raw reports**

```bash
git add docs/research/raw
git commit -m "research: capture raw output from 5 lenses"
```

---

## Task 7: Synthesise — dedupe, score, tier, trim to 20

**Files:**
- Create: `docs/research/ideas-final.json`

This is judgment work. The orchestrator (or executing subagent) reads all 5 JSON files and produces a single ranked array per the rules in the spec.

- [ ] **Step 1: Load and pool**

Read `docs/research/raw/{ux-ia,content,competitor,seo-perf,engagement}.json`. Flatten into one array of `{lens, ...idea}` objects.

- [ ] **Step 2: Dedupe**

Two ideas are duplicates if their `proposal` solves the same problem on the same surface. When merging:
- Keep the clearest framing of `problem` + `proposal`.
- Union `competitor_examples` and `affected_pages`.
- Set `lenses` = array of contributing lens keys.
- Set `evidence` = best evidence from contributors (concatenate if complementary).

Expected: 25–35 raw → 22–26 after dedupe.

- [ ] **Step 3: Score & assign tier**

Apply tier rules from the spec:
- **P0** (target 4–6): `impact=H` AND `effort ∈ {S,M}` AND `risk=L`
- **P1** (target 7–9): (`impact=H` AND `effort=L`) OR (`impact=M` AND `effort ∈ {S,M}`)
- **P2** (target 5–8): everything else of value

If a tier overflows its cap, demote the weakest member. If P0 underflows, promote the strongest P1.

- [ ] **Step 4: Trim to exactly 20**

If >20 survivors, cut weakest P2s. Record cut ideas in a `dropped: [{title, reason}]` array we'll surface in the umbrella issue body.

- [ ] **Step 5: Lens-balance sanity check**

No single lens may contribute more than 2 P0 ideas. If one does, demote the lowest-impact P0 from that lens to P1.

- [ ] **Step 6: Assign final `rank` 1..20 and slugs**

Sort by tier (P0, P1, P2) then by impact desc, then by effort asc. Assign `rank: 1..20`. Generate a kebab-case `slug` per idea, unique across the 20.

- [ ] **Step 7: Write `docs/research/ideas-final.json`**

Shape:
```json
[
  {
    "rank": 1,
    "slug": "...",
    "tier": "P0",
    "lenses": ["ux-ia", "engagement"],
    "title": "...",
    "problem": "...",
    "proposal": "...",
    "evidence": "...",
    "impact": "H", "effort": "S", "risk": "L",
    "competitor_examples": [...],
    "affected_pages": [...],
    "open_questions": [...],
    "mockup_hint": "..."
  },
  …19 more
]
```

Plus optionally write `docs/research/dropped.json` for the umbrella appendix.

- [ ] **Step 8: Sanity-verify**

```bash
node -e '
const a = JSON.parse(require("fs").readFileSync("docs/research/ideas-final.json","utf8"));
if (a.length !== 20) { console.error("expected 20, got " + a.length); process.exit(1); }
const tiers = a.reduce((m,i)=>{m[i.tier]=(m[i.tier]||0)+1;return m},{});
console.log("tier distribution:", tiers);
const slugs = new Set(a.map(i=>i.slug));
if (slugs.size !== 20) { console.error("slug collision"); process.exit(1); }
const ranks = new Set(a.map(i=>i.rank));
if (ranks.size !== 20) { console.error("rank collision"); process.exit(1); }
console.log("ok: 20 ideas, unique slugs, unique ranks");
'
```
Expected: `tier distribution: { P0: 4..6, P1: 7..9, P2: 5..8 }` and `ok: 20 ideas, unique slugs, unique ranks`.

- [ ] **Step 9: Commit**

```bash
git add docs/research/ideas-final.json
git commit -m "research: synthesise 20 ranked ideas from 5 lenses"
```

---

## Task 8: Generate the 20 HTML mockups

**Files:**
- Create: `docs/research/mockups/<NN>-<slug>.html` × 20

For each idea (rank 1..20), produce a self-contained HTML file. Each mockup:
- Imports the site's CSS via relative paths: `../../../src/styles/site.css`, `../../../src/styles/guide.css`.
- Uses existing class vocabulary (`.phase`, `.step`, `.callout`, `.c-*`).
- Shows the **after** state of the change.
- For IA / nav changes, includes a "before" block above the "after" with a visual separator.
- Title says `Mockup: <idea title>` and adds a one-paragraph caption explaining what's being shown.

- [ ] **Step 1: Author a shared mockup template helper inline**

The mockups themselves are static HTML — no build step. Use this skeleton (substitute per idea):

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Mockup: <IDEA TITLE></title>
  <link rel="stylesheet" href="../../../src/styles/site.css">
  <link rel="stylesheet" href="../../../src/styles/guide.css">
  <style>
    body { max-width: 1100px; margin: 2rem auto; padding: 0 1.5rem; }
    .mockup-frame { border: 1px solid var(--c-border, #2a2a2a); border-radius: 12px;
                    padding: 1.5rem; margin: 1.5rem 0; background: var(--c-bg, #0a0a0a); }
    .mockup-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;
                    color: var(--c-muted, #888); margin-bottom: 0.75rem; }
    .mockup-caption { color: var(--c-muted, #888); font-size: 0.9rem; margin-top: 0.5rem; }
    .mockup-divider { height: 1px; background: var(--c-border, #2a2a2a); margin: 2rem 0; }
  </style>
</head>
<body>
  <h1>Mockup: <IDEA TITLE></h1>
  <p class="mockup-caption">Rank #NN · Tier P? · Lens(es): … . <CAPTION></p>

  <!-- "BEFORE" block (only for IA / nav changes — drop entirely for net-new features) -->
  <div class="mockup-frame">
    <div class="mockup-label">Before</div>
    <!-- screenshot or HTML snippet of current state -->
  </div>

  <div class="mockup-divider"></div>

  <!-- "AFTER" block -->
  <div class="mockup-frame">
    <div class="mockup-label">After</div>
    <!-- the proposed change, using existing class vocabulary -->
  </div>
</body>
</html>
```

- [ ] **Step 2: For each idea (1..20), author its mockup**

For each idea, read its `mockup_hint`, look at the actual page(s) it affects (under `src/content/` or `src/pages/`), and produce a faithful mockup. Save as `docs/research/mockups/<NN>-<slug>.html` where `NN` is zero-padded rank.

This is the most time-consuming creative step — budget ~3–5 min per mockup. **Do not skip any.** If an idea's mockup is uninformative (e.g. a pure CSS perf win has no visual), write a brief explanation page with the relevant code snippet block instead — every idea still needs an HTML file so the screenshot pipeline is uniform.

- [ ] **Step 3: Verify all 20 files exist**

```bash
ls docs/research/mockups/*.html | wc -l
```
Expected: `20`.

- [ ] **Step 4: Open one in a browser to spot-check styling**

Verify the CSS imports resolve (check DevTools network panel for 404s on `site.css`/`guide.css`).

- [ ] **Step 5: Commit**

```bash
git add docs/research/mockups
git commit -m "research: HTML mockups for 20 ideas"
```

---

## Task 9: Generate 40 screenshots

**Files:**
- Create: `docs/research/mockups/screenshots/<NN>-<slug>.{desktop,mobile}.png` × 20 pairs

- [ ] **Step 1: Run the screenshot script**

```bash
node scripts/research/screenshot-mockups.mjs
```
Expected: `done: 40 screenshots`. Wall time ~1–2 min.

- [ ] **Step 2: Verify count and basic sanity**

```bash
ls docs/research/mockups/screenshots/*-desktop.png | wc -l   # → 20
ls docs/research/mockups/screenshots/*-mobile.png  | wc -l   # → 20
file docs/research/mockups/screenshots/*-desktop.png | head -3   # confirm PNG
```

- [ ] **Step 3: Spot-check three random screenshots open**

Pick three at random; verify they look like the corresponding HTML (no blank pages, no missing-asset boxes).

- [ ] **Step 4: Commit**

```bash
git add docs/research/mockups/screenshots
git commit -m "research: render 40 mockup screenshots"
```

---

## Task 10: Push the research branch

**Files:** none (git only)

Issue bodies embed images via `raw.githubusercontent.com` URLs that resolve against the branch — so the branch must exist on the remote BEFORE we file issues.

- [ ] **Step 1: Push**

```bash
git push -u origin research/site-enhancements-2026-05-19
```
Expected: branch created on remote.

- [ ] **Step 2: Verify a raw URL resolves**

Pick one screenshot and curl its raw URL:

```bash
FIRST=$(ls docs/research/mockups/screenshots/01-*-desktop.png | head -1 | xargs basename)
curl -sI "https://raw.githubusercontent.com/EvanCarson/Agentic-AI-Wiki/research/site-enhancements-2026-05-19/docs/research/mockups/screenshots/${FIRST}" | head -1
```
Expected: `HTTP/2 200`. (If 404, wait 5–10 seconds for GH to propagate.)

---

## Task 11: Create labels (run the script from Task 4)

- [ ] **Step 1: Run create-labels.mjs**

```bash
node scripts/research/create-labels.mjs
```
Expected: 9 labels created or updated, exit 0.

- [ ] **Step 2: Confirm**

```bash
gh label list --json name -q '.[].name' | grep -E '^(research|tier/|lens/)' | wc -l
```
Expected: `9`.

---

## Task 12: File the 20 per-idea issues + 1 umbrella

- [ ] **Step 1: Run the issue-filing orchestrator**

```bash
node scripts/research/file-issues.mjs
```
Expected: 20 lines of `#NNN — <title>`, then `umbrella: <url>`, then `wrote docs/research/REPORT.md`.

- [ ] **Step 2: Verify on GitHub**

```bash
gh issue list --repo EvanCarson/Agentic-AI-Wiki --label research --limit 30 --json number,title,labels | \
  node -e 'const x=JSON.parse(require("fs").readFileSync(0,"utf8")); console.log(x.length+" issues with the research label"); x.slice(0,3).forEach(i=>console.log(i.number, i.title))'
```
Expected: `21 issues with the research label` plus first three issues printed.

- [ ] **Step 3: Spot-check three issue bodies in a browser**

```bash
gh issue view <issue-num> --repo EvanCarson/Agentic-AI-Wiki --web
```
Verify: both mockup images render inline, "live preview" link resolves, label badges show tier + lens(es).

- [ ] **Step 4: Pin the umbrella issue**

```bash
gh issue pin <umbrella-issue-num> --repo EvanCarson/Agentic-AI-Wiki
```
Expected: confirmation.

- [ ] **Step 5: Commit the updated `ideas-final.json` (now contains `issueNumber` per idea) and the REPORT.md**

```bash
git add docs/research/ideas-final.json docs/research/REPORT.md
git commit -m "research: record issue numbers + local report"
git push
```

---

## Task 13: Validation against the spec checklist

- [ ] **Step 1: Run the full spec validation checklist**

```bash
echo "=== branch pushed? ==="
git ls-remote --heads origin research/site-enhancements-2026-05-19

echo "=== issue count (expect 21) ==="
gh issue list --repo EvanCarson/Agentic-AI-Wiki --label research --limit 30 --json number -q 'length'

echo "=== tier distribution ==="
node -e '
const a=JSON.parse(require("fs").readFileSync("docs/research/ideas-final.json","utf8"));
const t=a.reduce((m,i)=>{m[i.tier]=(m[i.tier]||0)+1;return m},{});
console.log(t);
const ok = (t.P0>=4&&t.P0<=6) && (t.P1>=7&&t.P1<=9) && (t.P2>=5&&t.P2<=8);
console.log(ok ? "tier distribution OK" : "tier distribution OUT OF RANGE (±1 acceptable)");
'

echo "=== lens cap (≤ 2 P0 per lens) ==="
node -e '
const a=JSON.parse(require("fs").readFileSync("docs/research/ideas-final.json","utf8"));
const counts = {};
for (const i of a.filter(x=>x.tier==="P0")) for (const l of i.lenses) counts[l]=(counts[l]||0)+1;
console.log(counts);
console.log(Object.values(counts).every(c=>c<=2) ? "lens cap OK" : "LENS CAP EXCEEDED");
'
```

Each line should print either "OK" or a number/object that visually matches the spec target.

- [ ] **Step 2: Mark task done in the local task list and summarise to the user**

Report:
- Branch pushed: `research/site-enhancements-2026-05-19`
- Umbrella issue URL (clickable)
- Top 5 P0 issue URLs
- Tier distribution counts
- Any deviations from the spec validation checklist

---

## Self-review (orchestrator's checklist)

- [x] Spec sections covered: orchestration (T6), agent briefs (T6 step 1), synthesis (T7), mockup pipeline (T8+T9), label set (T11), per-idea issue shape (T2+T5), umbrella issue shape (T2+T5), validation (T13).
- [x] No placeholders, "TBD", "TODO", or "fill in details" anywhere in steps.
- [x] Each code step shows actual code, not a description.
- [x] Type / signature consistency: `composeIssueBody(idea, branch, repo)`, `composeUmbrellaBody(ideas, branch, repo)`, `composeTitle(idea)` — referenced consistently in T2, T5, T12.
- [x] Path consistency: `docs/research/mockups/<NN>-<slug>.html` and `docs/research/mockups/screenshots/<NN>-<slug>.{desktop,mobile}.png` — match the URLs the composer builds in T2.
- [x] Branch name `research/site-enhancements-2026-05-19` — match between T2, T5, T10, T12.
- [x] Idempotency: Task 4 explicitly runs the label-creation script twice; Task 11 can rerun safely.
- [x] Ordering: branch push (T10) precedes issue filing (T12), so image raw URLs resolve.
