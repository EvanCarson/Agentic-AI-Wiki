# CI Verification Gates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `npm test` and `npm run test:design` run on every pull request as a required status check named `gates`, so `main` refuses a merge while either is red.

**Architecture:** One GitHub Actions workflow (`.github/workflows/ci.yml`, job `gates`) on `pull_request` and `push` to `main`; a `required_status_checks` rule appended to the existing `Protect Main` ruleset; the design guard gains a single `goto()` helper that awaits `document.fonts.ready` so measurements are deterministic on a cold runner; the routine prompt's browser-install bypass becomes a handoff to CI.

**Tech Stack:** GitHub Actions (`actions/checkout@v4`, `actions/setup-node@v4`, `actions/cache@v4`), Playwright 1.60 Chromium, `node --test`, GitHub rulesets REST API via `gh api`.

Spec: `docs/superpowers/specs/2026-07-29-ci-verification-gates-design.md` (approved 2026-07-29). Deviations from it are recorded in the spec's §9.

## Global Constraints

- The job name `gates` is the required check's identity; the workflow file says so in a comment.
- CI runs `npm run build`, `npm test`, `npm run test:design` — the build first because the dist-backed unit tests (llms.txt, OG) skip without one.
- Required check is non-strict (`strict_required_status_checks_policy: false`).
- The ruleset write is read-modify-write, and the read-back must show four rules: `deletion`, `non_fast_forward`, `pull_request`, `required_status_checks`.
- No changelog entry (spec §2, precedent PR #128) and no `vercel.json` change.

---

### Task 1: `goto()` helper in the design guard

**Files:**
- Modify: `scripts/__tests__/design/system.mjs` (26 `page.goto(server.url + …, { waitUntil: 'load' })` call sites)
- Test: `scripts/__tests__/design-guard-navigation.test.mjs`

- [ ] **Step 1:** Write the test: read `system.mjs` as text; assert exactly one `page.goto(` occurrence, an `async function goto(` definition, and `document.fonts.ready`.
- [ ] **Step 2:** Run it — expected: fails with 26 occurrences.
- [ ] **Step 3:** Add after the `before`/`after` hooks:
  ```js
  async function goto(page, path) {
    await page.goto(server.url + path, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
  }
  ```
  and replace every `await page.goto(server.url + X, { waitUntil: 'load' })` with `await goto(page, X)`.
- [ ] **Step 4:** Run the new test (passes) and `npm run test:design` (56 / 0).
- [ ] **Step 5:** Commit `test(design): navigate through one goto() that awaits document.fonts.ready`.

### Task 2: The workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1:** Write the workflow per spec §3 plus the build step; `timeout-minutes: 20`; Playwright browser cache keyed on the resolved package version; only Chromium, `--with-deps`.
- [ ] **Step 2:** `npx --yes yaml-lint` is not in the repo — validate by `node -e` YAML parse via `js-yaml` if present, else rely on the first run.
- [ ] **Step 3:** Commit `ci: run npm test and the design guard on every pull request`.

### Task 3: Prompt and guidance

**Files:**
- Modify: `docs/routines/daily-content-batch.prompt.md` (§6 note, §7 new bullet), `CLAUDE.md` (gates section)

- [ ] **Step 1:** Replace the §6 bypass sentence with the handoff wording; add the §7 bullet: wait with `gh pr checks <n> --watch --fail-fast`, merge only when green.
- [ ] **Step 2:** Add one paragraph under CLAUDE.md "Verification gates" naming the `gates` check and the wait.
- [ ] **Step 3:** Commit `docs(routine): hand the design guard to CI instead of bypassing it`.

### Task 4: Ship the workflow

- [ ] **Step 1:** Spec status → implemented; add §9 implementation notes.
- [ ] **Step 2:** Local gates: `npm run build`, `npm run verify`, `npm test`, `npm run test:design`.
- [ ] **Step 3:** Push, open the PR (closes nothing — the spec is its own record), wait for the first real `gates` run: `gh pr checks <n> --watch`. Green is spec §7 step 1.
- [ ] **Step 4:** Squash-merge; sync `main`; remove worktree and branch.

### Task 5: Make it block

- [ ] **Step 1:** `gh api repos/EvanCarson/Agentic-AI-Wiki/rulesets/16621197` → save JSON; append `{ type: required_status_checks, parameters: { strict_required_status_checks_policy: false, do_not_enforce_on_create: false, required_status_checks: [{ context: 'gates' }] } }` to `.rules`; `PUT` name/target/enforcement/conditions/bypass_actors/rules.
- [ ] **Step 2:** Read back; assert four rule types present.

### Task 6: Prove the block (spec §7 step 3)

- [ ] **Step 1:** Branch `ci/prove-block` from `main` with one deliberately failing assertion in a unit test; push; open a PR titled as a throwaway.
- [ ] **Step 2:** Wait for `gates` to fail; record `gh pr view --json mergeStateStatus` (expect `BLOCKED`) and `gh pr merge --squash` refused.
- [ ] **Step 3:** Close the PR without merging; delete the branch locally and on origin.

### Task 7: Memory

- [ ] Record in the workflow memory: merges now wait on `gates` (~6–8 min); `gh pr merge` is refused while pending; the throwaway PR number and observed `mergeStateStatus`.
