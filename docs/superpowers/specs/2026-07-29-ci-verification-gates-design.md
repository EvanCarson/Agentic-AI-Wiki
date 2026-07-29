# CI: make the verification gates actually block a merge

**Date:** 2026-07-29
**Status:** approved, not yet implemented
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

Expected runtime ~4–5 minutes. The repository is public, so standard runners are free with no
minute cap.

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

## 8. Explicitly out of scope

- Self-hosting the webfonts (§4).
- Adding the other four gates to CI (§2).
- Notifying on failure — opening an issue automatically when a run fails. Considered and deferred;
  the routine's own report already surfaces a stall.
- Any change to `vercel.json`.
