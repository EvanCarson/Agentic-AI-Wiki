# CI: make the verification gates actually block a merge

**Date:** 2026-07-29
**Status:** implemented 2026-09-01 — see §9 for what changed between approval and implementation
**Scope:** `.github/workflows/ci.yml` (new), `scripts/__tests__/design/system.mjs`,
`docs/routines/daily-content-batch.prompt.md`, and the `Protect Main` repository ruleset

---

## 1. The problem, measured

`CLAUDE.md` §6 names four gates that "must pass before any PR/merge". Nothing enforces two of
them, and nothing prevents a red pull request from being merged at all.

| gate | enforced today | by what |
|---|---|---|
| `npm run build` | yes | Vercel `buildCommand` |
| `npm run verify` | yes | Vercel `buildCommand` |
| `npm run search:index` + `test:search` | yes | Vercel `buildCommand` |
| **`npm test`** (47 unit tests) | **no** | — |
| **`npm run test:design`** (56 assertions) | **no** | — |
| **anything blocking a red PR from merging** | **no** | — |

`vercel.json` sets `buildCommand` to
`npm run build && npm run verify && npm run search:index && npm run test:search`. The two test
suites are absent from it and from anywhere else automated.

There is no `.github/` directory in the repository.

The `Protect Main` ruleset (id `16621197`, enforcement `active`) carries three rules — `deletion`,
`non_fast_forward`, and `pull_request` with `required_approving_review_count: 0`. It has **no**
`required_status_checks` rule, so a pull request with a failing check merges without objection.
(Note: `main` has no *legacy* branch protection — `GET /branches/main/protection` returns 404. The
protection is a ruleset. Reaching for the branch-protection API will mislead.)

### 1.1 Why this matters more than it looks

`docs/routines/daily-content-batch.prompt.md` grants the autonomous daily content routine
"standing authorization from the owner to pick the topics and to merge without asking". The same
document also sanctions a bypass of the gate this design exists to enforce:

> if the browser binary cannot be installed in this environment, say so explicitly in your report
> and continue with the other gates — that specific infrastructure failure is acceptable for a
> content-only change

So the guard with the most reach is the one an unattended process is permitted to skip, in an
environment where it plausibly always fails to install a browser.

**Not a claim this design makes:** the colliding-SVG-label defect of 2026-07-29 was *not* caused by
this bypass. No SVG geometry assertion existed until that day. The bypass is a forward-looking
hole, not the cause of a past incident, and the spec should not be read as fixing history.

---

## 2. Decisions taken

- **CI blocks the merge.** A required status check, not an advisory signal. Content stalling is
  preferred to content shipping broken; a stall surfaces in the routine's own run report, which
  already lists each gate's result and the PR link.
- **CI runs the two gates Vercel misses** — `npm test` and `npm run test:design` — and not the
  other four. Vercel already runs those on every push and reports a visible check; duplicating
  them buys no new signal for ~2 minutes of runtime. `test:design` invokes `npm run build`
  internally, so the build is still exercised.
- **GitHub Actions, not Vercel's `buildCommand`.** Extending `buildCommand` was considered and
  rejected: Vercel's build image is an awkward place to install Chromium and its system
  dependencies, a test failure would then fail a *deploy*, and every preview build would slow
  down — including ones being waited on to look at a page.
- **The required check is non-strict** (branches need not be up to date with `main` before
  merging). Strict checks force a rebase whenever anything else lands, which is the standard cause
  of a stuck autonomous queue. With squash merges, one contributor and one routine, the risk a
  non-strict check accepts is small; the risk a strict check creates is a silently stalled daily
  batch.
- **No changelog entry.** `CLAUDE.md` requires one for changes to site content or structure. This
  changes neither. Precedent: PR #128 (`docs: version-control the daily content batch routine
  prompt`, commit `d0d5bcb`) touched only `README.md` and `docs/routines/**` and added no entry.

---

## 3. The workflow

`.github/workflows/ci.yml`, a single job:

```
name: CI
on:
  pull_request:  { branches: [main] }
  push:          { branches: [main] }
  workflow_dispatch:
concurrency: { group: ci-${{ github.ref }}, cancel-in-progress: true }

jobs:
  gates:                       # ← this job name is the required check's identity
    runs-on: ubuntu-latest
    steps:
      - checkout
      - setup-node             # node-version-file: .nvmrc  (currently 24), cache: npm
      - npm ci
      - cache ~/.cache/ms-playwright, keyed on the resolved playwright version
      - npx playwright install --with-deps chromium
      - npm test
      - npm run test:design
```

**The job name is an interface, not a label.** A required status check matches by name, so
renaming `gates` later silently stops enforcing anything while the ruleset still claims to require
a check that no longer reports. The workflow file must say so in a comment.

**Only Chromium is installed.** The design guard launches `chromium` explicitly
(`scripts/__tests__/design/system.mjs`); installing all three browser engines would roughly triple
the install step for nothing.

**`push: [main]` earns its place** by catching the one failure a `pull_request` trigger cannot: two
individually-green pull requests whose merged result is red. It cannot block anything after the
fact — it is the only thing that would report it.

### 3.1 Runtime, measured

Measured on an 18-core Mac: `npm run build` 4.4s, `npm test` 0.2s, the design suite 171s.
Estimated on `ubuntu-latest` (4 vCPU): **~6 minutes warm, ~8 minutes on a cold cache**, of which
roughly 4 minutes is the design suite and the rest is `npm ci` plus the Chromium install.

The suite has **no hotspot**. Its 56 assertions cost 1–11s each and the time is spread across
families:

| family | tests | time |
|---|---|---|
| geometry, SVG, i18n, coverage | 20 | 59.7s |
| prose measure (10 viewports) | 11 | 34.6s |
| contrast AA (2 themes × 3 viewports) | 6 | 27.0s |
| horizontal overflow (5 widths) | 5 | 23.4s |
| scroll affordance | 2 | 9.7s |
| emphasis surfaces | 2 | 9.0s |
| nav reachability | 10 | 7.7s |

The cost is roughly 400 page navigations at 200–400ms each, most of them re-walking the same
~15-page list — contrast alone is 6 × 15 = 90 loads, overflow another 75, measure 100.

**They run serially because the whole guard is one file.** `node --test` parallelises across
*files*, not within them, so the suite occupies a single process: one core of 18 locally, one of
four in CI.

Six minutes is accepted for this change. Nothing human waits on the run — the autonomous routine
pushes, CI runs, the routine merges — and the repository is public, so standard runners are free
with no minute cap. The fix is sequenced deliberately, see §8.1.

---

## 4. Font determinism — the flake this design has to prevent first

`src/layouts/BaseLayout.astro:57-59` loads Inter, Space Grotesk and JetBrains Mono from
**`fonts.googleapis.com`** with `display=swap`. The OG-image build is unaffected: it reads
vendored TTFs from `vendor/fonts/`.

The design guard navigates with `waitUntil: 'load'`, which does not guarantee that webfonts have
been applied. It measures character counts from `getComputedStyle` and canvas `measureText`, and
its pass window is 60–78 characters. Locally Inter always wins the race, which is why the suite is
stable. On a cold runner it may not, in which case the guard measures `system-ui` fallback metrics
— different advance widths, different character counts, an intermittent red that nobody can
reproduce.

**Fix:** await `document.fonts.ready` after navigation in the design guard, before any measurement.

This is a latent flake locally as well as in CI, so the change is correct independently of CI.

**Apply it through one helper, not by editing every call site.** `system.mjs` navigates in dozens of
places across the contrast, tap-target, overflow, measure, geometry and SVG assertions — all of
which read rendered boxes and all of which are exposed. Add a single `goto(page, path)` helper that
performs the navigation and then awaits `document.fonts.ready`, and route every existing
`page.goto(server.url + …)` through it. Editing call sites individually guarantees one gets missed,
and the one that gets missed is the one that flakes.

**Accepted residual risk:** CI now depends on `fonts.googleapis.com` being reachable. Self-hosting
the fonts would remove that dependency and speed up the live site, but it changes page rendering
and needs its own verification. Out of scope here; recorded in §7.

---

## 5. Making it block

Add a `required_status_checks` rule to ruleset `16621197` requiring the `gates` check, with
`strict_required_status_checks_policy: false`.

**The ruleset API replaces the rules array on write.** A careless `PUT` drops `deletion`,
`non_fast_forward` and `pull_request`, silently unprotecting `main` while appearing to strengthen
it. Therefore: read the ruleset, append the new rule to the existing three, write, then **read it
back and confirm all four are present**. The read-back is a required step, not a courtesy.

---

## 6. Closing the sanctioned bypass

In `docs/routines/daily-content-batch.prompt.md`, replace the passage quoted in §1.1. The
replacement instructs the routine that when it cannot run `test:design` locally, it should push the
branch, open the pull request, and let CI run the gate — and that it must not merge until the check
is green, because the check is required and the merge will be refused anyway.

A bypass becomes a handoff. The routine keeps its standing authorization to merge; it simply can no
longer merge past a red gate.

---

## 7. Verification

A workflow that has never failed is not known to work, and a required check that has never blocked
a merge is not known to be wired up. Both must be demonstrated, in this order:

1. Merge the workflow, and confirm a green run on a real pull request.
2. Add the required-status-check rule, and read the ruleset back to confirm four rules.
3. Open a throwaway pull request containing one deliberately broken assertion. Confirm: the `gates`
   check reports failure, **and** GitHub reports the pull request as blocked from merging. Record
   the observed `mergeStateStatus`.
4. Close the throwaway pull request without merging, and delete its branch.

Step 3 is the one that matters. Steps 1 and 2 can both appear to succeed while the check name and
the rule disagree, in which case nothing is enforced.

Local gates before opening the PR: `npm run build`, `npm run verify`, `npm test`,
`npm run test:design`.

---

## 8. Out of scope, and one sequenced follow-up

### 8.1 Splitting the design suite — next, not now

Splitting `system.mjs` into several files lets `node --test` run them concurrently. Projected:
171s → ~40s locally, ~250s → ~100s in CI, taking the whole run from ~6 minutes to ~3.5. Nothing
about what is asserted changes; the shared helpers move to a module and the assertions distribute.
`test:design`'s glob would widen to `scripts/__tests__/design/*.mjs`, and each file pays its own
Chromium launch and static server.

**It is deliberately a separate, later change.** Splitting a passing 56-assertion suite is exactly
the refactor where coverage vanishes quietly — a helper moved wrong, a derived marker list that
stops deriving, an assertion left matching nothing. This repository produced three separate
instances of that failure mode on 2026-07-28/29 alone. The refactor should happen with CI already
enforcing, not while the enforcement gap it would be judged by is still open.

Expect the parallel speedup to be capped by the runner: four vCPUs sustain roughly three
concurrent browsers, so the local 4× will not reproduce in CI.

### 8.2 Also out of scope

- Self-hosting the webfonts (§4).
- Adding the other four gates to CI (§2).
- Notifying on failure — opening an issue automatically when a run fails. Considered and deferred;
  the routine's own report already surfaces a stall.
- Any change to `vercel.json`.

---

## 9. Implementation notes (2026-09-01)

Implemented five weeks after approval. Four things differ from the text above, none from its
decisions:

- **CI runs `npm run build` before `npm test`.** Since July, `npm test` gained tests that read
  `dist/` and skip without a build (the llms.txt link-resolution test, the OG catalogue check).
  Running them skipped would make the check green without the guard they carry. `test:design`
  still rebuilds afterwards; the duplicate build costs ~20s on the runner.
- **§4's residual risk is gone.** The webfonts were self-hosted in PR #182 (2026-09-01), so CI no
  longer depends on `fonts.googleapis.com`. The `goto()` helper awaiting `document.fonts.ready`
  is still required — the `load` event does not wait for lazily-loaded font faces — and is
  guarded by `scripts/__tests__/design-guard-navigation.test.mjs`, which fails if any navigation
  bypasses the helper.
- **Renaming the job stalls merges; it does not silently unenforce.** §3 said a renamed `gates`
  job would leave the ruleset "claiming to require a check that no longer reports". GitHub's
  actual behaviour is the opposite failure: a required check that never reports shows as
  *Expected* and blocks every merge until someone notices. The workflow comment says so.
- **The routine waits for the check rather than merging past it.** `gh pr merge` is refused while
  a required check is pending, so the prompt now tells the routine to run
  `gh pr checks <n> --watch --fail-fast` and merge only when green. Repository auto-merge
  (`allow_auto_merge`) was left disabled; enabling it is a repository-setting change outside
  this design.
- **The first run found a Linux-only collision, and Linux is the platform that counts.** Locally
  (macOS, Inter loaded, fonts awaited) two labels in the pgvector architecture diagram sat 4.9px
  apart; on `ubuntu-latest` the same text rendered ~2.6% wider and they overlapped by 0.5px. The
  label was 118px of text centred in a 100px box, so the diagram was the defect, not the guard:
  the text was shortened to fit its box with margin. Rule for the future: the CI runner is the
  enforcement platform, so a collision that reproduces only there is real and is fixed in the
  diagram, not tolerated in the test. Expect text to measure a few percent wider on Linux.
- **A changelog entry was added after all**, reversing §2's decision. That decision held while the
  change touched only CI and docs; fixing the pgvector diagram made it a content change, and the
  two precedents for a diagram-only fix (PR #178, PR #170) both carry an entry. The entry covers
  the gate and the defect it caught.

### 9.1 What the first runs found: Linux renders the same webfont ~3–8% wider

The gate failed three times before it passed, each failure a real defect that no local run
would have shown. Worth recording, because it changes how diagrams should be authored here.

**The measurement is trustworthy — this was checked, not assumed.** A temporary diagnostic step
ran on the runner and reported: all 22 font files present in `dist/fonts`, every `.woff2`
fetched `200`, the label's computed family `Inter`, and a canvas probe distinguishing Inter
from `sans-serif` (`same: false`). So CI measures with the real webfont, exactly as a reader's
browser does. Yet the same string measures **139px on `ubuntu-latest` against 135.2px on macOS**
— identical font file, different text shaping (CoreText's subpixel advances against
FreeType/HarfBuzz). Across the five failures the spread was **3.8% to 7.7%**.

**Which platform is right? Neither — but Linux is closer to the audience.** Vercel Analytics for
the 30 days to 2026-09-01 puts visitors at **46% Windows, 25% Linux, 17% Mac**. A diagram tuned
until it just fits on the author's Mac overflows for most people who read it. The five labels the
gate rejected were genuinely clipped for roughly seven readers in ten, and had been for months.

**Consequences for authoring, which the routine prompt already implies but should be read here:**

- **Leave slack.** A label that fits its box exactly on macOS does not fit anywhere else. Treat
  the local measurement as the floor and assume 8% more.
- **Pin the edge that overflows.** Two of the five were fixed without touching the words: a
  right-hand note became `text-anchor: end` at a fixed x, and a rotated axis label became
  `text-anchor: middle` at the axis midpoint. Anchoring to the constrained edge makes width
  differences push into empty space instead of past the boundary, which is immune to the platform
  question entirely. Prefer this over shortening text where the geometry allows it.
- **Expect layers.** Fixing the collision revealed the viewBox escapes; the memory of this
  repository already records that the suite's assertions run in sequence and one failure hides the
  next. Budget for more than one round.

### 9.2 The gate caught a live production defect on its first day

While this branch was in review the daily routine merged PR #187 (2026-09-02 08:47 UTC) and
deployed it. Its `arch-what-the-licence-bought` diagram carried a closing caption running **41px
past the right edge of its viewBox**, clipped for every reader, and the routine's own report said
every gate passed — because the two gates that measure geometry were the ones nothing enforced.

CI on a `pull_request` tests the **merge result**, not the branch, so this branch's run picked
the defect up from `main` within minutes of it landing and refused to go green. That is the
whole design working before it was even required: the gap in §1 is not hypothetical, it was
shipping defects the same week. The caption is fixed here (centred, so the platform width
difference cannot reach an edge) because this branch cannot merge while the merge result is red.
