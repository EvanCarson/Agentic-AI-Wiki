# Content IA Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the site's top-level IA — add Playbooks and Operations sections, move 9 of the 17 Deep-Dive groups (≈52 essays) into them, introduce a `/<section>/<group>/<slug>` URL pattern, add section/group landing pages, and gate against internal 404s.

**Architecture:** Each of Deep-Dives / Playbooks / Operations gets the same shape — `src/content/<section>/{manifest.ts, types.ts, groups/, en/, zh/}` plus `src/pages/[zh/]<section>/{index, [group]/index, [group]/[slug]}.astro`. Page templates (`SectionIndexView`, new `GroupIndexView`, `SectionEntryLayout`) are parameterized by section. URL move is deliberate: no redirects; an internal-link sweep + a `check-internal-links.mjs` gate prevent in-site 404s.

**Tech Stack:** Astro 4 (static), Node test runner with `--experimental-strip-types`, Pagefind (lazy-loaded search), `@astrojs/sitemap`, Vercel static deploy.

**Source spec:** `docs/superpowers/specs/2026-05-19-content-ia-expansion-design.md`

---

## Conventions for every task

- Work from worktree root: `/Users/cq/Git/agentic-ai-wiki/.worktrees/ia-playbooks-operations`
- Branch: `feature/ia-playbooks-operations` (already pushed; draft PR #56 open)
- After every commit, the working tree MUST be clean — no stray files.
- Commit messages: imperative subject; `Refs #55` in body. Include the Claude `Co-Authored-By` trailer.
- Never bypass hooks. If `npm test` fails, fix the underlying issue.

---

## Phase A — Manifest scaffolding for two new sections

### Task A1: Add `groupSummary` field to `Group` type + extend existing test to require it

**Files:**
- Modify: `src/content/deep-dives/types.ts`
- Modify: `scripts/__tests__/deep-dives-manifest.test.mjs`

- [ ] **Step 1: Read the current types file**

Run: `cat src/content/deep-dives/types.ts`

Expected: defines `Localized`, `Entry`, `Group` (`key`, `order`, `name`, `entries`) and the `L(en, zh)` helper.

- [ ] **Step 2: Add `groupSummary` (required, bilingual) and `related` (optional) to types**

Add to `Group`:
```ts
export interface Group {
  key: string;
  order: number;
  name: Localized;
  /** One-to-two-sentence localized group thesis. Used on section + group landings. */
  groupSummary: Localized;
  entries: Entry[];
}
```
Add to `Entry`:
```ts
export interface Related {
  concepts?: string[];
  fieldGuide?: string[];
  deepDives?: string[];
  playbooks?: string[];
  operations?: string[];
}
export interface Entry {
  page: string;
  slug: string;
  title: Localized;
  summary: Localized;
  group?: Localized;
  /** Optional cross-links surfaced on the group landing's "Related" block. */
  related?: Related;
}
```

- [ ] **Step 3: Extend the manifest test to require `groupSummary` bilingual**

In `scripts/__tests__/deep-dives-manifest.test.mjs`, in the "well-shaped" test, after the `g.name?.en?.trim()` assertion, add:
```js
    assert.ok(g.groupSummary?.en?.trim() && g.groupSummary?.zh?.trim(), `${f}: groupSummary must be bilingual non-empty`);
```

- [ ] **Step 4: Run tests and verify failure**

Run: `npm test 2>&1 | tail -10`
Expected: 17 deep-dive group tests fail with "groupSummary must be bilingual non-empty" (because no group has it yet).

- [ ] **Step 5: Don't commit yet — A2 adds the field to all groups; commit then.**

---

### Task A2: Backfill `groupSummary` on all 17 existing deep-dive groups

**Files:** Modify each of `src/content/deep-dives/groups/*.ts` (17 files).

Use these exact strings (bilingual, drafted from the existing group `name` and entries):

| File | EN groupSummary | ZH groupSummary |
|---|---|---|
| `agent-ux-and-human-interaction.ts` | `How agents present themselves, ask for input, and earn trust — UX patterns for human-in-the-loop systems.` | `智能体如何呈现自己、请求输入并赢得信任——人在回路系统的交互模式。` |
| `agentops.ts` | `Running agents in production: rollout, versioning, scaling, idempotent retries, cost control, incident response.` | `在生产中运行智能体：灰度、版本化、扩缩、幂等重试、成本控制与事故响应。` |
| `architectures-and-patterns.ts` | `Reusable agent architectures — ReAct, plan-and-execute, supervisor-worker, router, reflection — and when each fits.` | `可复用的智能体架构——ReAct、Plan-and-Execute、Supervisor-Worker、Router、Reflection——以及何时该用哪一种。` |
| `coding-and-computer-use-agents.ts` | `Agents that read code, write code, run tools, and drive a computer — patterns, harnesses, and pitfalls.` | `能读代码、写代码、运行工具并驱动计算机的智能体——模式、外壳与陷阱。` |
| `domain-playbooks.ts` | `Domain-specific playbooks — customer support, research, sales, data analysis, DevOps — what to build, what to skip.` | `按领域的实战手册——客服、研究、销售、数据分析、DevOps——该建什么，可以省什么。` |
| `economics-roi.ts` | `The unit economics of agents — pricing, cost attribution, ROI measurement, build-vs-buy, failure modes.` | `智能体的单位经济性——定价、成本归因、ROI 度量、自建对外购、失败模式。` |
| `evaluation-and-observability.ts` | `Measuring agents that don't have a single right answer — outcome vs trajectory evals, LLM-as-judge, traces, benchmarks.` | `度量没有唯一正确答案的智能体——结果与轨迹评测、LLM 作裁判、追踪与基准。` |
| `governance-compliance.ts` | `Accountability, audit, policy enforcement and the regulatory landscape — making agent decisions defensible.` | `问责、审计、策略执行与监管版图——让智能体的决策可被解释与辩护。` |
| `memory-and-context.ts` | `Context windows, memory stores, compaction, retrieval-augmented memory — keeping the right things on the prompt.` | `上下文窗口、记忆存储、压缩、检索增强记忆——把对的东西留在提示上。` |
| `multi-agent-systems.ts` | `When multiple agents pay off, when one beats many, and the topologies, failure modes and debate patterns in between.` | `多个智能体何时划算、何时一个胜过一群，以及之间的拓扑、失败模式与辩论模式。` |
| `protocols-and-interop.ts` | `The protocol layer of the agent stack — MCP, A2A, tool-calling standards, capability discovery — and how systems plug together.` | `智能体栈的协议层——MCP、A2A、工具调用标准、能力发现——以及系统如何互联。` |
| `reasoning-and-test-time-compute.ts` | `Chain of thought, self-consistency, tree/graph of thought, and the inference-time-scaling laws that govern them.` | `思维链、自我一致性、思维树/图，以及支配它们的推理期扩展规律。` |
| `retrieval-and-rag.ts` | `Retrieval-augmented generation past the basics — advanced architectures, graph RAG, retrieval as an agent tool, RAG security.` | `检索增强生成的进阶——高级架构、图 RAG、把检索作为智能体工具、RAG 安全。` |
| `safety-and-security.ts` | `Prompt injection, sandboxing, exfiltration, red-teaming, deployment safety — the threat model an agent's environment creates.` | `提示注入、沙箱、数据外泄、红队、部署安全——智能体环境制造的威胁模型。` |
| `tool-capability-design.ts` | `Designing tools an agent can actually use — granularity, schemas, error messages, recovery, antipatterns.` | `设计智能体真正能用的工具——粒度、Schema、错误消息、恢复与反模式。` |
| `training-agentic-models.ts` | `Post-training for agentic ability — SFT, rejection sampling, distillation, RLHF/RLAIF, RL for tool use, reward design.` | `面向智能体能力的后训练——SFT、拒绝采样、蒸馏、RLHF/RLAIF、面向工具调用的 RL、奖励设计。` |
| `voice-realtime-agents.ts` | `Realtime voice agents — speech stack, turn-taking, barge-in, latency budgets, voice-specific tooling and state.` | `实时语音智能体——语音栈、轮替、打断、延迟预算、语音特有的工具与状态。` |

- [ ] **Step 1: For each of the 17 files, add the `groupSummary` line**

Place it between `name:` and `entries:`. Use the `L(...)` helper (already imported). Example:
```ts
const group: Group = {
  key: 'agentops',
  order: 70,
  name: L('AgentOps: Deploy & Operate', '智能体运维：部署与运营'),
  groupSummary: L('Running agents in production: rollout, versioning, scaling, idempotent retries, cost control, incident response.', '在生产中运行智能体：灰度、版本化、扩缩、幂等重试、成本控制与事故响应。'),
  entries: [ … ],
};
```

- [ ] **Step 2: Run tests and verify pass**

Run: `npm test 2>&1 | tail -10`
Expected: all 18 tests pass (the deep-dive shape test now includes the new field).

- [ ] **Step 3: Run build to confirm Astro compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: build completes; no new warnings.

- [ ] **Step 4: Commit**

```bash
git add src/content/deep-dives/types.ts src/content/deep-dives/groups/ scripts/__tests__/deep-dives-manifest.test.mjs
git commit -m "$(cat <<'EOF'
Add groupSummary + related to Group/Entry types

Backfills groupSummary on all 17 existing deep-dive groups and extends
the manifest test to require it. Introduces an optional `related` field
on Entry for cross-links surfaced on group landings (populated later).

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task A3: Scaffold Playbooks section (empty content)

**Files:**
- Create: `src/content/playbooks/types.ts`
- Create: `src/content/playbooks/manifest.ts`
- Create: `src/content/playbooks/groups/.keep`
- Create: `src/content/playbooks/en/.keep`
- Create: `src/content/playbooks/zh/.keep`
- Create: `scripts/__tests__/playbooks-manifest.test.mjs`

- [ ] **Step 1: Create `types.ts` as a re-export of the deep-dives shape**

Path: `src/content/playbooks/types.ts`. Content:
```ts
// Playbooks share the same Entry/Group/Related/Localized shape as Deep-Dives.
// One source of truth lives under deep-dives/types.ts; re-export here so this
// section's group files can import from `../types.ts` like deep-dives does.
export type { Localized, Entry, Group, Related } from '../deep-dives/types.ts';
export { L } from '../deep-dives/types.ts';
```

- [ ] **Step 2: Create `manifest.ts` mirroring deep-dives/manifest.ts**

Path: `src/content/playbooks/manifest.ts`. Content: exact copy of `src/content/deep-dives/manifest.ts`, then replace every `./groups/*.ts` and every doc-comment "Deep-Dive" with "Playbook".

- [ ] **Step 3: Create the `.keep` placeholder files**

So empty dirs survive git:
```bash
mkdir -p src/content/playbooks/groups src/content/playbooks/en src/content/playbooks/zh
touch src/content/playbooks/groups/.keep src/content/playbooks/en/.keep src/content/playbooks/zh/.keep
```

- [ ] **Step 4: Create the manifest test as a copy of the deep-dives one**

Path: `scripts/__tests__/playbooks-manifest.test.mjs`. Copy `deep-dives-manifest.test.mjs` and replace every occurrence of `deep-dives` (in paths and test titles) with `playbooks`. Also delete the `at least one group file exists` test (we'll have zero until A5) — or keep it but flip the assertion to allow zero temporarily and tighten in A5. **Simpler:** delete the file in this task and re-add at A5. So in this Step 4: skip creating the test file.

- [ ] **Step 5: Run build to confirm no breakage**

Run: `npm run build 2>&1 | tail -10`
Expected: build still passes (no routes wired yet; empty playbooks manifest is a dead import).

- [ ] **Step 6: Commit**

```bash
git add src/content/playbooks/
git commit -m "$(cat <<'EOF'
Scaffold Playbooks section directory

Empty manifest infra mirroring deep-dives/. Group files and content
move in next.

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task A4: Scaffold Operations section (empty content)

**Files:** Same shape as A3, under `src/content/operations/`.

- [ ] **Step 1: Repeat A3 steps for `operations`** — `types.ts`, `manifest.ts`, `.keep` files, no test yet.

In `manifest.ts` doc comments, "Deep-Dive" → "Operation".

- [ ] **Step 2: Build**

Run: `npm run build 2>&1 | tail -10`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/content/operations/
git commit -m "$(cat <<'EOF'
Scaffold Operations section directory

Empty manifest infra mirroring deep-dives/. Group files and content
move in next.

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Phase B — Move content into the new sections

Each move task: relocates group file + relocates the essays it owns + updates kicker line in each essay's HTML. After each task, both manifest tests for the affected sections must pass, and `npm run build` must succeed.

### Task B1: Move Playbooks group files (4 groups)

**Files moved (group definitions):**
- `src/content/deep-dives/groups/agent-ux-and-human-interaction.ts` → `src/content/playbooks/groups/agent-ux-and-human-interaction.ts`
- `src/content/deep-dives/groups/coding-and-computer-use-agents.ts` → `src/content/playbooks/groups/coding-and-computer-use-agents.ts`
- `src/content/deep-dives/groups/domain-playbooks.ts` → `src/content/playbooks/groups/domain-playbooks.ts`
- `src/content/deep-dives/groups/voice-realtime-agents.ts` → `src/content/playbooks/groups/voice-realtime-agents.ts`

**Files moved (essays — EN + ZH for each entry; determine the exact slug list by reading each group file's `entries[].slug`):**
- For each of the 4 group files above, every slug listed in `entries[]` gets `src/content/deep-dives/en/<slug>.html` → `src/content/playbooks/en/<slug>.html` and same for `zh/`.

- [ ] **Step 1: Move the 4 group files**

```bash
git mv src/content/deep-dives/groups/agent-ux-and-human-interaction.ts src/content/playbooks/groups/
git mv src/content/deep-dives/groups/coding-and-computer-use-agents.ts src/content/playbooks/groups/
git mv src/content/deep-dives/groups/domain-playbooks.ts src/content/playbooks/groups/
git mv src/content/deep-dives/groups/voice-realtime-agents.ts src/content/playbooks/groups/
```

- [ ] **Step 2: For each moved group, move its EN + ZH essay fragments**

For each moved group file `src/content/playbooks/groups/<key>.ts`, run a small one-off shell loop. Example for `agent-ux-and-human-interaction.ts`:
```bash
SLUGS=$(node --experimental-strip-types -e "import('./src/content/playbooks/groups/agent-ux-and-human-interaction.ts').then(m => console.log(m.default.entries.map(e => e.slug).join('\n')))")
for s in $SLUGS; do
  git mv "src/content/deep-dives/en/${s}.html" "src/content/playbooks/en/${s}.html"
  git mv "src/content/deep-dives/zh/${s}.html" "src/content/playbooks/zh/${s}.html"
done
```
Run the same loop for the other 3 group keys.

- [ ] **Step 3: Update kicker line in every moved essay**

```bash
# EN: "Deep Dive · ..." → "Playbook · ..."
find src/content/playbooks/en -name '*.html' -exec sed -i '' 's/<div class="week">Deep Dive · /<div class="week">Playbook · /g' {} +
# ZH: "深入解析 · ..." → "实战手册 · ..."
find src/content/playbooks/zh -name '*.html' -exec sed -i '' 's/<div class="week">深入解析 · /<div class="week">实战手册 · /g' {} +
```

Verify a sample:
```bash
grep "week" src/content/playbooks/en/coding-agent-architecture.html | head -1
```
Expected: `<div class="week">Playbook · Coding & Computer-Use Agents</div>`

- [ ] **Step 4: Drop the `.keep` placeholders now that real files live there**

```bash
git rm src/content/playbooks/groups/.keep src/content/playbooks/en/.keep src/content/playbooks/zh/.keep
```

- [ ] **Step 5: Add the playbooks manifest test (now there ARE groups)**

Path: `scripts/__tests__/playbooks-manifest.test.mjs`. Copy `scripts/__tests__/deep-dives-manifest.test.mjs` byte-for-byte, then replace every occurrence of the literal `deep-dives` with `playbooks` (paths and test titles).

- [ ] **Step 6: Run tests**

Run: `npm test 2>&1 | tail -20`
Expected: all tests pass. The deep-dives test now sees 13 group files (down from 17); the playbooks test sees 4.

- [ ] **Step 7: Run build**

Run: `npm run build 2>&1 | tail -10`
Expected: passes. (Old `/deep-dives/<slug>` routes for moved essays will 404 — that's expected; we restructure routes in Phase C. For now build still works because nothing references the moved slugs.)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Move 4 groups (≈22 essays) from Deep-Dives to Playbooks

Relocates agent-ux-and-human-interaction, coding-and-computer-use-agents,
domain-playbooks, voice-realtime-agents — group files + bilingual HTML
fragments. Kicker line updated en/zh.

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task B2: Move Operations group files (5 groups)

**Files moved (group definitions):**
- `agentops.ts`, `economics-roi.ts`, `evaluation-and-observability.ts`, `governance-compliance.ts`, `safety-and-security.ts`
— all moved from `src/content/deep-dives/groups/` to `src/content/operations/groups/`.

- [ ] **Step 1: Move the 5 group files**

```bash
for f in agentops economics-roi evaluation-and-observability governance-compliance safety-and-security; do
  git mv "src/content/deep-dives/groups/${f}.ts" "src/content/operations/groups/${f}.ts"
done
```

- [ ] **Step 2: For each moved group, move its EN + ZH essay fragments**

Same shell pattern as B1 step 2 but pointing at `src/content/operations/groups/`.

- [ ] **Step 3: Update kicker line in every moved essay**

```bash
# EN: "Deep Dive · ..." → "Operation · ..."
find src/content/operations/en -name '*.html' -exec sed -i '' 's/<div class="week">Deep Dive · /<div class="week">Operation · /g' {} +
# ZH: "深入解析 · ..." → "运维 · ..."
find src/content/operations/zh -name '*.html' -exec sed -i '' 's/<div class="week">深入解析 · /<div class="week">运维 · /g' {} +
```

Verify a sample:
```bash
grep "week" src/content/operations/en/incident-response-for-agents.html | head -1
```
Expected: `<div class="week">Operation · AgentOps: Deploy & Operate</div>`

- [ ] **Step 4: Drop `.keep` placeholders**

```bash
git rm src/content/operations/groups/.keep src/content/operations/en/.keep src/content/operations/zh/.keep
```

- [ ] **Step 5: Add operations manifest test**

Path: `scripts/__tests__/operations-manifest.test.mjs`. Same as B1 step 5 but replace `deep-dives` → `operations`.

- [ ] **Step 6: Run tests**

Run: `npm test 2>&1 | tail -20`
Expected: all tests pass. Deep-dives: 8 groups. Playbooks: 4 groups. Operations: 5 groups.

- [ ] **Step 7: Run build**

Run: `npm run build 2>&1 | tail -10`
Expected: passes.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Move 5 groups (≈30 essays) from Deep-Dives to Operations

Relocates agentops, economics-roi, evaluation-and-observability,
governance-compliance, safety-and-security — group files + bilingual
HTML fragments. Kicker line updated en/zh.

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Phase C — URL restructure and routes

### Task C1: Restructure `/deep-dives/` routes to `/<section>/<group>/<slug>` shape

**Files:**
- Modify: `src/components/pages/DeepDivesView.astro` (used by section landing)
- Delete: `src/pages/deep-dives/[slug].astro`
- Create: `src/pages/deep-dives/[group]/[slug].astro`
- Create: `src/pages/deep-dives/[group]/index.astro` (group landing)
- Modify: `src/layouts/DeepDiveLayout.astro` (now needs group in URLs it generates)
- Modify: `src/components/SectionSidebar.astro` (URLs)
- Modify: `src/layouts/SectionEntryLayout.astro` (URLs)
- Mirror everything under `src/pages/zh/deep-dives/`

This task overlaps Concepts at the layout level — `SectionEntryLayout` is shared. Concepts must keep `/concepts/<slug>` shape (no group in URL). Solution: layout takes a `linkFor(entry) => string` callback so each section controls URL shape; deep-dives passes one that injects `<group>`, concepts passes one that doesn't.

- [ ] **Step 1: Generalize `SectionEntryLayout.astro` — add optional `linkFor` prop**

Add to Props:
```ts
  /** How to construct an href for an entry. Defaults to `${base}/${entry.slug}`. */
  linkFor?: (e: SectionEntry) => string;
```
In the body, replace `${base}/${prev.slug}` and `${base}/${next.slug}` with `linkFor ? linkFor(prev) : \`${base}/${prev.slug}\`` (same for next).

- [ ] **Step 2: Generalize `SectionSidebar.astro` the same way**

Read `src/components/SectionSidebar.astro`. Add the same optional `linkFor` prop and use it wherever entry links are built. (If SectionSidebar accepts `groups: { items: Entry[] }[]` and builds links via `${base}/${item.slug}`, switch to the callback.)

- [ ] **Step 3: Create `src/pages/deep-dives/[group]/[slug].astro`**

```astro
---
import DeepDiveLayout from '../../../layouts/DeepDiveLayout.astro';
import deepDivesManifest from '../../../content/deep-dives/manifest';
const { ENTRIES, GROUPS } = deepDivesManifest as any;
export function getStaticPaths() {
  // ENTRIES are flat with group inflated; we need group.key per entry.
  // We rebuild by iterating GROUPS.
  // (The manifest doesn't currently export GROUPS — we'll add it in Step 4.)
  const out: { params: { group: string; slug: string } }[] = [];
  // Filled in after manifest exports GROUPS — see Step 4.
  return out;
}
const { group, slug } = Astro.params;
---
<DeepDiveLayout slug={slug as string} groupKey={group as string} locale="en" />
```

(Don't run yet — depends on Step 4.)

- [ ] **Step 4: Export `GROUPS` from `src/content/deep-dives/manifest.ts`**

Add to the manifest:
```ts
/** Groups in sorted order (key + name + groupSummary + entries). */
export { GROUPS };
```
Wait — `GROUPS` is currently a `const` inside the module. Change to `export const GROUPS: Group[] = …`.

- [ ] **Step 5: Fill in `getStaticPaths` in `[group]/[slug].astro`**

```astro
import { GROUPS } from '../../../content/deep-dives/manifest';
export function getStaticPaths() {
  return GROUPS.flatMap(g =>
    g.entries.map(e => ({ params: { group: g.key, slug: e.slug } })),
  );
}
```

- [ ] **Step 6: Update `DeepDiveLayout.astro` to take `groupKey` and build URLs with it**

```astro
import { GROUPS, entryBySlug } from '../content/deep-dives/manifest';
export interface Props { slug: string; groupKey: string; locale?: Locale }
const { slug, groupKey, locale = 'en' } = Astro.props;
…
const linkFor = (e) => {
  const g = GROUPS.find(g => g.entries.some(x => x.slug === e.slug));
  return `/deep-dives/${g!.key}/${e.slug}`;
};
```
Pass `linkFor` through to `SectionEntryLayout`.

- [ ] **Step 7: Delete `src/pages/deep-dives/[slug].astro`**

```bash
git rm src/pages/deep-dives/[slug].astro
```

- [ ] **Step 8: Create the group-landing page `src/pages/deep-dives/[group]/index.astro`**

```astro
---
import GroupIndexView from '../../../components/pages/GroupIndexView.astro';
import { GROUPS } from '../../../content/deep-dives/manifest';
export function getStaticPaths() {
  return GROUPS.map(g => ({ params: { group: g.key } }));
}
const { group } = Astro.params;
---
<GroupIndexView locale="en" sectionBase="/deep-dives" sectionKind="deep-dive" groupKey={group as string} />
```

- [ ] **Step 9: Create `src/components/pages/GroupIndexView.astro`**

Loads the right manifest by `sectionKind`, finds the group by key, renders: breadcrumb (`<Section> / <Group>`), H1, `groupSummary` lede, reading-order list, and a "Related" block if any entry has `related` set. Use the existing `BaseLayout` + page chrome.

Skeleton (full file):
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import type { Locale } from '../../i18n/index';
import { localizeHref } from '../../i18n/index';
import { ui } from '../../i18n/ui';
import * as deepDivesM from '../../content/deep-dives/manifest';
import * as playbooksM from '../../content/playbooks/manifest';
import * as operationsM from '../../content/operations/manifest';

type Kind = 'deep-dive' | 'playbook' | 'operation';
export interface Props { locale: Locale; sectionBase: string; sectionKind: Kind; groupKey: string }
const { locale, sectionBase, sectionKind, groupKey } = Astro.props;
const t = ui[locale];

const manifest = sectionKind === 'deep-dive' ? deepDivesM : sectionKind === 'playbook' ? playbooksM : operationsM;
const sectionH1 = sectionKind === 'deep-dive' ? t.deepDives.h1 : sectionKind === 'playbook' ? t.playbooks.h1 : t.operations.h1;
const group = manifest.GROUPS.find((g: any) => g.key === groupKey);
if (!group) throw new Error(`Unknown ${sectionKind} group key: ${groupKey}`);

const title = `${group.name[locale]} — ${sectionH1}`;

// Related union across this group's entries.
function uniq<T>(xs: T[]) { return Array.from(new Set(xs)); }
const related = {
  concepts:    uniq(group.entries.flatMap((e: any) => e.related?.concepts    ?? [])),
  fieldGuide:  uniq(group.entries.flatMap((e: any) => e.related?.fieldGuide  ?? [])),
  deepDives:   uniq(group.entries.flatMap((e: any) => e.related?.deepDives   ?? [])),
  playbooks:   uniq(group.entries.flatMap((e: any) => e.related?.playbooks   ?? [])),
  operations:  uniq(group.entries.flatMap((e: any) => e.related?.operations  ?? [])),
};
const hasRelated = Object.values(related).some(v => v.length > 0);
---
<BaseLayout title={title} description={group.groupSummary[locale]} locale={locale}>
  <section class="hero">
    <div class="kicker"><a href={localizeHref(sectionBase, locale)}>{sectionH1}</a> / {group.name[locale]}</div>
    <h1>{group.name[locale]}</h1>
    <p class="lede">{group.groupSummary[locale]}</p>
  </section>
  <section class="wrap" style="padding:28px 20px;">
    <ol class="toc-list" style="list-style:decimal;padding-left:1.5rem;margin:0;">
      {group.entries.map((e: any) => (
        <li style="padding:14px 0;border-bottom:1px solid rgba(0,0,0,0.15);">
          <a class="entry-link" href={localizeHref(`${sectionBase}/${groupKey}/${e.slug}`, locale)} style="text-decoration:none;color:var(--ink);display:block;">
            <div style="font-family:'Fraunces',serif;font-size:19px;">{e.title[locale]}</div>
            <div style="color:var(--muted);font-size:14px;line-height:1.45;margin-top:4px;">{e.summary[locale]}</div>
          </a>
        </li>
      ))}
    </ol>
    {hasRelated && (
      <aside class="callout" style="margin-top:32px;">
        <h2 style="font-size:18px;margin:0 0 8px;">{locale === 'zh' ? '相关' : 'Related'}</h2>
        <!-- Render simple bullet lists per category; each item links to its canonical URL. -->
        <!-- Build URLs using the appropriate base for each related kind.   -->
      </aside>
    )}
  </section>
</BaseLayout>
```

(Related-block URL construction is deferred to Phase D Task D2 since it requires the new i18n strings; for now leave the related block hidden — `hasRelated` is `false` until any entry declares `related`.)

- [ ] **Step 10: Modify `src/components/pages/DeepDivesView.astro` to render group cards (link to group landings)**

Replace its body so the section index lists groups (each as a card linking to `/deep-dives/<key>/`) instead of a flat list of entries. Reuse a new shared component `SectionLandingView.astro` (create alongside) — but for this task, a minimal inline implementation in the DeepDivesView is fine.

Replace `DeepDivesView.astro` body with:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import type { Locale } from '../../i18n/index';
import { localizeHref } from '../../i18n/index';
import { ui } from '../../i18n/ui';
import { GROUPS } from '../../content/deep-dives/manifest';
export interface Props { locale?: Locale }
const { locale = 'en' } = Astro.props;
const t = ui[locale];
---
<BaseLayout title={t.deepDives.metaTitle} description={t.deepDives.metaDesc} locale={locale}>
  <section class="hero">
    <div class="kicker">{t.deepDives.h1}</div>
    <h1>{t.deepDives.h1}</h1>
    <p class="lede">{t.deepDives.tagline}</p>
  </section>
  <section class="wrap" style="padding:28px 20px;">
    <div class="toc-list" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;">
      {GROUPS.map(g => (
        <a class="entry-link" href={localizeHref(`/deep-dives/${g.key}`, locale)}
           style="text-decoration:none;color:var(--ink);display:block;padding:14px;border:1px solid rgba(0,0,0,0.15);border-radius:8px;">
          <div style="font-family:'Fraunces',serif;font-size:19px;">{g.name[locale]}</div>
          <div style="color:var(--muted);font-size:14px;line-height:1.45;margin-top:4px;">{g.groupSummary[locale]}</div>
          <div style="color:var(--muted);font-size:13px;margin-top:8px;">{g.entries.length} {locale === 'zh' ? '篇' : g.entries.length === 1 ? 'essay' : 'essays'}</div>
        </a>
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 11: Mirror EN under ZH**

For every new/changed file under `src/pages/deep-dives/`, mirror under `src/pages/zh/deep-dives/`:
- `src/pages/zh/deep-dives/[group]/[slug].astro` (locale="zh")
- `src/pages/zh/deep-dives/[group]/index.astro` (locale="zh")
- Delete `src/pages/zh/deep-dives/[slug].astro`
- The existing `src/pages/zh/deep-dives/index.astro` already wraps `DeepDivesView` with locale="zh" — no change needed.

- [ ] **Step 12: Build**

Run: `npm run build 2>&1 | tail -20`
Expected: passes. Every deep-dive essay now lives at `/deep-dives/<group>/<slug>` and the group landing exists at `/deep-dives/<group>/`. Old `/deep-dives/<slug>` URLs are gone.

- [ ] **Step 13: Smoke check route count**

```bash
ls dist/deep-dives/ && ls dist/deep-dives/architectures-and-patterns/ | head
```
Expected: directories per group key; essays under each.

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Restructure Deep-Dives routes to /deep-dives/<group>/<slug>

Adds group landing pages (/deep-dives/<group>/), moves entries under
their group, refactors SectionEntryLayout + SectionSidebar to take a
linkFor callback so Concepts keeps its flat URL while Deep-Dives gets
group in the URL. Section index now renders group cards.

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task C2: Wire Playbooks routes

**Files:** Create
- `src/pages/playbooks/index.astro`
- `src/pages/playbooks/[group]/index.astro`
- `src/pages/playbooks/[group]/[slug].astro`
- `src/pages/zh/playbooks/index.astro`
- `src/pages/zh/playbooks/[group]/index.astro`
- `src/pages/zh/playbooks/[group]/[slug].astro`
- `src/components/pages/PlaybooksView.astro`
- `src/layouts/PlaybookLayout.astro`

- [ ] **Step 1: Create `src/components/pages/PlaybooksView.astro`**

Copy `DeepDivesView.astro` (post-C1) byte-for-byte; replace:
- `from '../../content/deep-dives/manifest'` → `from '../../content/playbooks/manifest'`
- `t.deepDives.*` → `t.playbooks.*`
- `/deep-dives/` → `/playbooks/`

(Note: `t.playbooks.*` doesn't exist yet — added in D1. The build will fail TypeScript checks until D1, which is fine — these two tasks land in adjacent commits.)

- [ ] **Step 2: Create `src/layouts/PlaybookLayout.astro`**

Copy `src/layouts/DeepDiveLayout.astro`; replace `/deep-dives/` → `/playbooks/`, `deep-dives/manifest` → `playbooks/manifest`, `t.deepDives.*` → `t.playbooks.*`, glob path `../content/deep-dives/*/*.html` → `../content/playbooks/*/*.html`, `bodyDir="../content/deep-dives"` → `bodyDir="../content/playbooks"`.

- [ ] **Step 3: Create the 6 route files**

EN (`src/pages/playbooks/`):
- `index.astro`: `<PlaybooksView locale="en" />` (one-line wrapper)
- `[group]/index.astro`: copy from `src/pages/deep-dives/[group]/index.astro`, swap `deep-dives` → `playbooks`, `'deep-dive'` → `'playbook'`
- `[group]/[slug].astro`: same swap pattern as `deep-dives`'s analogue, but importing from `playbooks/manifest` and using `PlaybookLayout`

ZH (`src/pages/zh/playbooks/`): same three files, with `locale="zh"`.

- [ ] **Step 4: Build (expected to fail on `t.playbooks` — that's fine; defer to D1)**

Run: `npm run build 2>&1 | tail -20`
Expected: build errors about `t.playbooks` undefined. **Don't commit yet** — D1 fixes this, then C2 commits together with D1 in the D1 commit. Mark C2 as in-progress until D1 lands.

- [ ] **Step 5: Hold — commit after D1**

Continue to C3 and D1; commit the bundle after D1.

---

### Task C3: Wire Operations routes

**Files:** Same pattern as C2 under `src/pages/[zh/]operations/`, with a new `OperationsView.astro` and `OperationLayout.astro`. Same hold-then-commit rule.

- [ ] **Step 1–3:** Mirror C2 steps with `operations` everywhere.

- [ ] **Step 4: Hold — commit after D1.**

---

## Phase D — i18n, header nav, related-block plumbing

### Task D1: Add `playbooks` and `operations` UI strings; update `deepDives.tagline`; update SiteHeader

**Files:**
- Modify: `src/i18n/ui.ts`
- Modify: `src/components/SiteHeader.astro`

- [ ] **Step 1: Extend the `UIStrings` interface**

In `src/i18n/ui.ts`, add to the `UIStrings` interface:
```ts
  nav: { fieldGuide: string; concepts: string; deepDives: string; playbooks: string; operations: string; changelog: string; about: string };
  playbooks: { metaTitle: string; metaDesc: string; h1: string; tagline: string; emptyHtml: string };
  operations: { metaTitle: string; metaDesc: string; h1: string; tagline: string; emptyHtml: string };
```

- [ ] **Step 2: Add EN strings**

In `ui.en`:
```ts
  nav: { fieldGuide: 'Field Guide', concepts: 'Concepts', deepDives: 'Deep-Dives', playbooks: 'Playbooks', operations: 'Operations', changelog: 'Changelog', about: 'About' },
  …
  deepDives: {
    metaTitle: 'Deep-Dives — Agentic AI Wiki',
    metaDesc: 'Engineering fundamentals — architectures, memory, RAG, protocols, tools, reasoning, training, multi-agent.',
    h1: 'Deep-Dives',
    tagline: 'Engineering fundamentals — architectures, memory, RAG, protocols, tools, reasoning, training, multi-agent.',
    emptyHtml: 'Deep-dive essays are coming soon — in the meantime, dive into the <a href="%FG%" style="color:var(--accent);">Field Guide</a>.',
  },
  playbooks: {
    metaTitle: 'Playbooks — Agentic AI Wiki',
    metaDesc: 'Applied recipes for building agents in specific domains and roles — coding, voice, customer support, research, and more.',
    h1: 'Playbooks',
    tagline: 'Applied recipes for building agents in specific domains and roles.',
    emptyHtml: 'Playbook essays are coming soon — in the meantime, dive into the <a href="%FG%" style="color:var(--accent);">Field Guide</a>.',
  },
  operations: {
    metaTitle: 'Operations — Agentic AI Wiki',
    metaDesc: 'How to run agents in production — evals, observability, cost, safety, governance.',
    h1: 'Operations',
    tagline: 'How to run agents in production — evals, observability, cost, safety, governance.',
    emptyHtml: 'Operations essays are coming soon — in the meantime, dive into the <a href="%FG%" style="color:var(--accent);">Field Guide</a>.',
  },
```

- [ ] **Step 3: Add ZH strings**

In `ui.zh`:
```ts
  nav: { fieldGuide: '实战指南', concepts: '概念', deepDives: '深度剖析', playbooks: '实战手册', operations: '运维', changelog: '更新日志', about: '关于' },
  …
  deepDives: {
    metaTitle: '深度剖析 — Agentic AI 维基',
    metaDesc: '工程基础 —— 架构、记忆、RAG、协议、工具、推理、训练、多智能体。',
    h1: '深度剖析',
    tagline: '工程基础 —— 架构、记忆、RAG、协议、工具、推理、训练、多智能体。',
    emptyHtml: '深度剖析文章即将上线 — 在此之前，先深入阅读 <a href="%FG%" style="color:var(--accent);">实战指南</a>。',
  },
  playbooks: {
    metaTitle: '实战手册 — Agentic AI 维基',
    metaDesc: '在具体领域与角色中构建智能体的应用蓝本——编码、语音、客服、研究等。',
    h1: '实战手册',
    tagline: '在具体领域与角色中构建智能体的应用蓝本。',
    emptyHtml: '实战手册文章即将上线 — 在此之前，先深入阅读 <a href="%FG%" style="color:var(--accent);">实战指南</a>。',
  },
  operations: {
    metaTitle: '运维 — Agentic AI 维基',
    metaDesc: '在生产环境中运行智能体——评测、可观测性、成本、安全与治理。',
    h1: '运维',
    tagline: '在生产环境中运行智能体——评测、可观测性、成本、安全与治理。',
    emptyHtml: '运维文章即将上线 — 在此之前，先深入阅读 <a href="%FG%" style="color:var(--accent);">实战指南</a>。',
  },
```

- [ ] **Step 4: Add Playbooks + Operations to SiteHeader nav**

In `src/components/SiteHeader.astro`, between the `deepDives` and `changelog` entries of `links`:
```ts
  { href: '/playbooks', label: t.nav.playbooks },
  { href: '/operations', label: t.nav.operations },
```

- [ ] **Step 5: Run build**

Run: `npm run build 2>&1 | tail -20`
Expected: passes (C2 and C3 files now resolve since `t.playbooks` and `t.operations` exist).

- [ ] **Step 6: Visual smoke check**

Run: `npm run preview &` then open `http://localhost:4321/` and `http://localhost:4321/zh/`. Verify the header shows 7 nav items, none wrap awkwardly. Kill the preview server afterward.

- [ ] **Step 7: Commit (this bundles C2 + C3 + D1)**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Wire Playbooks & Operations routes; add i18n strings; expand nav

Adds /playbooks/, /playbooks/<group>/, /playbooks/<group>/<slug>
and /operations/* mirror routes (en + zh), with PlaybooksView,
OperationsView, PlaybookLayout, OperationLayout. Adds nav.playbooks,
nav.operations and matching section UI strings. Updates deepDives
tagline for narrower scope. Header now shows 7 nav items.

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task D2: Internal cross-link sweep

**Files:** Any `src/content/**/*.html` referencing `/deep-dives/<slug>` for an essay that moved.

The slugs that moved are exactly the union of all `entries[].slug` across the files now under `src/content/playbooks/groups/` and `src/content/operations/groups/`.

- [ ] **Step 1: Enumerate moved slugs**

```bash
PLAYBOOK_SLUGS=$(node --experimental-strip-types -e "
  const fs = require('node:fs');
  const files = fs.readdirSync('src/content/playbooks/groups').filter(f=>f.endsWith('.ts'));
  Promise.all(files.map(f => import('./src/content/playbooks/groups/'+f))).then(ms => {
    console.log(ms.flatMap(m => m.default.entries.map(e => e.slug)).join('\n'));
  });
")
OPERATIONS_SLUGS=$(node --experimental-strip-types -e "
  const fs = require('node:fs');
  const files = fs.readdirSync('src/content/operations/groups').filter(f=>f.endsWith('.ts'));
  Promise.all(files.map(f => import('./src/content/operations/groups/'+f))).then(ms => {
    console.log(ms.flatMap(m => m.default.entries.map(e => e.slug)).join('\n'));
  });
")
```

- [ ] **Step 2: Build a slug → (new-section, new-group) lookup**

```bash
node --experimental-strip-types -e "
  const fs = require('node:fs');
  function dump(dir, section) {
    const files = fs.readdirSync(dir).filter(f=>f.endsWith('.ts'));
    return Promise.all(files.map(f => import('./'+dir+'/'+f).then(m =>
      m.default.entries.map(e => ({slug: e.slug, section, group: m.default.key})))));
  }
  Promise.all([
    dump('src/content/playbooks/groups', 'playbooks'),
    dump('src/content/operations/groups', 'operations'),
    dump('src/content/deep-dives/groups', 'deep-dives'),
  ]).then(arrs => {
    const map = {};
    for (const arr of arrs.flat()) for (const x of arr) map[x.slug] = { section: x.section, group: x.group };
    fs.writeFileSync('/tmp/slug-map.json', JSON.stringify(map, null, 2));
    console.log('wrote', Object.keys(map).length, 'entries to /tmp/slug-map.json');
  });
"
```

- [ ] **Step 3: Find every internal reference to old `/deep-dives/<slug>` shape**

```bash
rg -n "/deep-dives/[a-z][a-z0-9-]+" src/ public/ vercel.json 2>/dev/null | tee /tmp/dd-refs.txt | head -40
wc -l /tmp/dd-refs.txt
```

- [ ] **Step 4: Rewrite each reference using the slug map**

Write a one-off rewriter `scripts/rewrite-deep-dive-links.mjs`:
```js
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const map = JSON.parse(readFileSync('/tmp/slug-map.json', 'utf8'));
const files = execSync(`rg -l "/deep-dives/[a-z]" src public vercel.json 2>/dev/null || true`, { encoding: 'utf8' })
  .split('\n').filter(Boolean);
const re = /\/deep-dives\/([a-z][a-z0-9-]+)(?![a-z0-9-])/g;
let changed = 0;
for (const f of files) {
  const s = readFileSync(f, 'utf8');
  const out = s.replace(re, (m, slug) => {
    const x = map[slug];
    if (!x) return m;                                  // not a moved essay (or unknown slug)
    return `/${x.section}/${x.group}/${slug}`;
  });
  if (out !== s) { writeFileSync(f, out); changed++; console.log('rewrote', f); }
}
console.log('changed', changed, 'files');
```
Run:
```bash
node scripts/rewrite-deep-dive-links.mjs
```

- [ ] **Step 5: Spot-check rewrites**

```bash
rg -n "/deep-dives/[a-z]" src/ public/ vercel.json 2>/dev/null | grep -v "^src/content/deep-dives/" | head -20
```
Expected: empty, OR only references to essays that stayed in deep-dives (rewriter prepends group: `/deep-dives/<group>/<slug>`). If you see any old `/deep-dives/<slug>` (no group) outside of the rewriter script itself, investigate.

- [ ] **Step 6: Build and verify**

Run: `npm run build && npm run verify && npm test 2>&1 | tail -30`
Expected: all green.

- [ ] **Step 7: Remove the throwaway rewriter (we don't ship one-off scripts)**

```bash
rm scripts/rewrite-deep-dive-links.mjs
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Rewrite internal links to new /<section>/<group>/<slug> URLs

Sweeps all HTML fragments + page templates for legacy /deep-dives/<slug>
references and updates them to the new /<section>/<group>/<slug> shape.
Essays that stayed in deep-dives also get the group segment injected.

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Phase E — Verification gate + changelog

### Task E1: Add `scripts/check-internal-links.mjs` + wire into `npm run verify`

**Files:**
- Create: `scripts/check-internal-links.mjs`
- Modify: `package.json` (verify script chain)

- [ ] **Step 1: Create the checker**

Path: `scripts/check-internal-links.mjs`. Content:
```js
// Asserts every internal <a href> in built dist/ resolves to a real file.
// Internal = href starts with "/" and does not start with "//". Ignores
// hash-only links and explicit external rel.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const DIST = resolve('dist');
if (!existsSync(DIST)) { console.error('dist/ not found — run `npm run build` first'); process.exit(2); }

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (name.endsWith('.html')) yield p;
  }
}

function targetExists(href) {
  // Strip query/hash
  const clean = href.replace(/[?#].*$/, '');
  if (!clean.startsWith('/') || clean.startsWith('//')) return true; // not internal
  // Map "/foo" → dist/foo/index.html OR dist/foo.html
  const base = join(DIST, clean.replace(/^\/+/, ''));
  if (existsSync(base) && statSync(base).isFile()) return true;
  if (existsSync(base + '.html')) return true;
  if (existsSync(join(base, 'index.html'))) return true;
  return false;
}

const broken = [];
let scanned = 0;
for (const f of walk(DIST)) {
  const html = readFileSync(f, 'utf8');
  // Match href="...". Skip mailto:, tel:, javascript:.
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const h of hrefs) {
    if (/^(mailto:|tel:|javascript:|https?:|#)/i.test(h)) continue;
    scanned++;
    if (!targetExists(h)) broken.push({ file: relative(process.cwd(), f), href: h });
  }
}
if (broken.length) {
  console.error(`Broken internal links (${broken.length} of ${scanned} scanned):`);
  for (const b of broken) console.error(`  ${b.file}  →  ${b.href}`);
  process.exit(1);
}
console.log(`OK — ${scanned} internal links resolve.`);
```

- [ ] **Step 2: Update `package.json` `verify` script**

Change:
```json
"verify": "node --experimental-strip-types scripts/verify-chapters.mjs"
```
To:
```json
"verify": "npm run build && node --experimental-strip-types scripts/verify-chapters.mjs && node scripts/check-internal-links.mjs"
```

- [ ] **Step 3: Run verify and confirm clean**

Run: `npm run verify 2>&1 | tail -10`
Expected: `OK — N internal links resolve.` and no failures.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-internal-links.mjs package.json
git commit -m "$(cat <<'EOF'
Add internal-link checker as a verify gate

Walks built dist/ and asserts every internal <a href> resolves to a
real file. Wired into npm run verify so URL drift cannot ship.

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task E2: Add the changelog entry

**Files:** Create `src/content/changelog/entries/2026-05-19-ia-restructure-playbooks-operations.ts`.
(If merge slips to a later day, rename file + bump `date` per CLAUDE.md.)

- [ ] **Step 1: Copy an existing entry as a template**

```bash
cp src/content/changelog/entries/$(ls -t src/content/changelog/entries/ | grep -v '^_' | head -1) src/content/changelog/entries/2026-05-19-ia-restructure-playbooks-operations.ts
```

- [ ] **Step 2: Edit the new file**

Replace the contents with:
```ts
import { L, type ChangelogEntry } from '../types';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L(
    'Restructured site IA — added Playbooks and Operations sections',
    '调整站点信息架构 —— 新增"实战手册"与"运维"板块',
  ),
  items: [
    L(
      'Top nav grows to 7 items: Field Guide / Concepts / Deep-Dives / Playbooks / Operations / Changelog / About.',
      '顶部导航增至 7 项：实战指南 / 概念 / 深度剖析 / 实战手册 / 运维 / 更新日志 / 关于。',
    ),
    L(
      'Deep-Dive essays moved to /<section>/<group>/<slug> URLs (group is now in the URL); old /deep-dives/<slug> links no longer resolve.',
      '深度剖析文章迁移至 /<section>/<group>/<slug> URL（分组进入 URL）；旧的 /deep-dives/<slug> 链接不再可用。',
    ),
    L(
      'Each section + group has a dedicated landing page with a thesis line and reading order.',
      '每个板块与分组都有专属落地页，包含主旨说明与阅读顺序。',
    ),
  ],
};
export default entry;
```

- [ ] **Step 3: Run changelog tests**

Run: `npm test -- --test-name-pattern changelog 2>&1 | tail -10`
Expected: pass; bilingual shape + filename-date match enforced.

- [ ] **Step 4: Commit**

```bash
git add src/content/changelog/entries/2026-05-19-ia-restructure-playbooks-operations.ts
git commit -m "$(cat <<'EOF'
Changelog: IA restructure entry (Playbooks + Operations)

Refs #55

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task E3: Final verification + push + flip PR out of draft

- [ ] **Step 1: Clean rebuild from scratch**

```bash
rm -rf dist
npm run build 2>&1 | tail -20
```
Expected: clean build, no warnings new vs. baseline.

- [ ] **Step 2: Verify gate**

```bash
npm run verify 2>&1 | tail -10
```
Expected: `OK — N internal links resolve.`

- [ ] **Step 3: All tests**

```bash
npm test 2>&1 | tail -20
```
Expected: all pass (deep-dives + playbooks + operations + changelog + i18n + extract tests).

- [ ] **Step 4: Build search index and run search tests**

```bash
npm run build:search 2>&1 | tail -10
npm run test:search 2>&1 | tail -10
```
Expected: search index built with both locales; the previously-skipped Pagefind tests now pass.

- [ ] **Step 5: Visual smoke (manual)**

```bash
npm run preview &
```
Open in browser and confirm:
- `/` and `/zh/` headers show 7 nav items
- `/deep-dives/`, `/playbooks/`, `/operations/` (and `/zh/...` mirrors) render group cards
- `/deep-dives/architectures-and-patterns/` shows reading order
- `/deep-dives/architectures-and-patterns/react-pattern` renders the essay with kicker "Deep Dive · Architectures & Patterns"
- `/playbooks/coding-and-computer-use-agents/coding-agent-architecture` renders with kicker "Playbook · Coding & Computer-Use Agents"
- `/operations/agentops/incident-response-for-agents` renders with kicker "Operation · AgentOps: Deploy & Operate"
- Search still surfaces results; section facet (if implemented) shows new sections

Kill the preview server when done: `pkill -f "astro preview"`.

- [ ] **Step 6: Push**

```bash
git push 2>&1 | tail -5
```

- [ ] **Step 7: Flip PR out of draft**

```bash
gh pr ready 56
```

- [ ] **Step 8: Final PR comment summarizing the diff**

```bash
gh pr comment 56 --body "$(cat <<'EOF'
Implementation complete.

- 7-slot top nav (Field Guide / Concepts / Deep-Dives / Playbooks / Operations / Changelog / About)
- 17 Deep-Dive groups reshuffled into 8 / 4 / 5 (Deep-Dives / Playbooks / Operations)
- URL pattern: `/<section>/<group>/<slug>`
- New section + group landing pages
- `groupSummary` (required) + `related` (optional) on the Group/Entry types
- `scripts/check-internal-links.mjs` wired into `npm run verify`
- Concise changelog entry

All gates green: `npm run build`, `npm run verify`, `npm test`, `npm run test:search`.
EOF
)"
```

---

## Self-review (run after writing)

**1. Spec coverage:**
- §2 IA + nav: A1–A2 (groupSummary), C1/C2/C3 (routes), D1 (nav + i18n) ✓
- §3 URL structure + file layout: A3/A4 + B1/B2 + C1/C2/C3 ✓
- §4 page templates: C1 step 9 (GroupIndexView), C1 step 10 (section landing rewrite) ✓
- §5 manifest additions: A1 (types) + A2 (backfill) ✓
- §6.1 i18n strings: D1 ✓
- §6.2 Header/footer: D1 step 4 (SiteFooter is not used for section links — confirmed by inspection; skipped) ✓
- §6.3 Breadcrumbs: already wired in `SectionEntryLayout`; group is in URL so `entry.group` resolves from the manifest's inflated `group` field — verified by C1 step 1 generalization
- §6.4 Search: Pagefind auto-indexes new pages; **section facet not implemented** — explicit deferral noted below
- §6.5 Sitemap: `@astrojs/sitemap` auto-discovers static pages; new routes are picked up automatically — verified at build
- §6.6 RSS: no feed exists; skipped
- §6.7 robots.txt: unchanged
- §7 Internal link sweep: D2 ✓
- §8 Tests: A1 (extend deep-dives), B1 step 5 (playbooks), B2 step 5 (operations); `related` resolution test deferred to follow-up since `related` is empty initially
- §9 Changelog: E2 ✓
- §11 Risks: covered by E1 (link checker) + E3 (manual visual smoke)

**Explicit deferrals (acceptable for this PR; tracked for follow-up):**
- Search section facet UI (Pagefind auto-indexes the content; the chip labels are a UI polish)
- `related` data — types are in, no entry uses it yet; populated in follow-up content PRs
- "Related" block render on group landings — `hasRelated` is `false` until any entry declares `related`, so the block is a no-op for now

**2. Placeholder scan:**
- No TBD/TODO/"fill in details" — every code block is complete.
- "Add appropriate error handling" — not used.
- Step C1.6 references `entryBySlug` which exists in current manifest; verified.

**3. Type consistency:**
- `linkFor: (e: SectionEntry) => string` — same signature in `SectionEntryLayout` and `SectionSidebar`.
- `GROUPS` exported from all three section manifests in symmetric form.
- `Related` interface declared once in `deep-dives/types.ts`, re-exported by the other two sections.
- Section UI strings shape (`metaTitle / metaDesc / h1 / tagline / emptyHtml`) matches between `deepDives`, `playbooks`, `operations` in `ui.ts`.

---

## Execution choice

Plan complete and saved to `docs/superpowers/plans/2026-05-19-content-ia-expansion-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** — Fresh subagent per task, review between tasks. Better for a refactor with many mechanical steps; isolates failures; protects this session's context from the heavy file moves.

**2. Inline Execution** — Execute tasks here using `superpowers:executing-plans`, batch with checkpoints. Faster if you want to react in real time but eats this session's context.

Which approach?
