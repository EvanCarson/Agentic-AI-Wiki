# Privacy page implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a hidden `/privacy` page that satisfies Apple's App Store privacy URL requirement for AI Menu — discoverable to anyone with the URL (so `Linking.openURL` from the iOS app works at both `agentic-ai-wiki.vercel.app/privacy` and `menuagentic.com/privacy`), but invisible to wiki readers (no nav, no footer, no sitemap, no in-site search).

**Architecture:** Three small file changes. A single English-only static page at `src/pages/privacy.astro` with prose inlined (no `i18n/ui.ts` indirection, since the page is not bilingual). A reusable `noindex?: boolean` prop added to `BaseLayout.astro` that conditionally emits `<meta name="robots" content="noindex, nofollow">` in `<head>`. The `@astrojs/sitemap` integration in `astro.config.mjs` gets a `filter` predicate that drops `/privacy` from `sitemap-index.xml`. Defense-in-depth hiding: no inbound link + meta robots + sitemap exclusion + Pagefind `data-pagefind-ignore`.

**Tech Stack:** Astro 4 (static output), `@astrojs/sitemap`, `BaseLayout.astro`, Pagefind.

**Spec:** `docs/superpowers/specs/2026-05-21-privacy-page-design.md` (committed on this branch at HEAD).

**Branch / worktree:** `privacy-page` in `.worktrees/privacy-page` (already created from `main`).

---

## File map

| File | Action | Why |
|---|---|---|
| `src/layouts/BaseLayout.astro` | **Modify** | Add `noindex?: boolean` prop; emit `<meta name="robots" content="noindex, nofollow">` when truthy. |
| `src/pages/privacy.astro` | **Create** | The hidden English privacy page; uses `BaseLayout` with `noindex={true}` and `data-pagefind-ignore` on its content wrapper. |
| `src/pages/zh/privacy.astro` | **Create** | Chinese counterpart, added during implementation to satisfy `check-internal-links.mjs` (it caught BaseLayout's auto-emitted `hreflang="zh-Hans"` as a dangling link when only the English page existed). See spec §"Brainstorming-time non-goal that was REVERSED during implementation". |
| `astro.config.mjs` | **Modify** | Add `filter` to `sitemap()` integration. Regex `/\/privacy\/?$/` omits both `/privacy` and `/zh/privacy` from `sitemap-index.xml`. |

**Files intentionally NOT touched** (resist the urge):
- `src/components/SiteHeader.astro` — no nav link.
- `src/components/SiteFooter.astro` — no footer link.
- `src/i18n/ui.ts` — privacy page content is inlined per the spec, not data-driven.
- `src/content/changelog/entries/*` — **no changelog entry** (intentional deviation from CLAUDE.md, justified in spec §Non-goals; the page is hidden from wiki readers, so it does not belong in the reader-facing changelog).

---

## Pre-flight (do this once before Task 1)

- [ ] **Confirm you are in the worktree.**

```bash
pwd
```

Expected (or similar): `.../Agentic-AI-Wiki/.worktrees/privacy-page`

- [ ] **Confirm the branch.**

```bash
git rev-parse --abbrev-ref HEAD
```

Expected: `privacy-page`

- [ ] **Confirm the spec is at HEAD.**

```bash
git log --oneline -1
```

Expected: shows the spec commit `Add design spec for hidden /privacy page (issue #59)`.

- [ ] **Install dependencies if not already.**

```bash
npm ci
```

Expected: completes without errors. (Skip if `node_modules/` is already populated.)

---

## Task 1: Add `noindex` prop to `BaseLayout`

**Files:**
- Modify: `src/layouts/BaseLayout.astro:10-11, 24`

This task is structural plumbing. No page yet uses the prop, so the test is "the build still passes and no existing page accidentally got a `noindex` tag." The prop's behavior is exercised end-to-end in Task 2.

- [ ] **Step 1: Capture the pre-change baseline.** Build and snapshot the meta tags on a known page so we can assert no regression.

```bash
npm run build
grep -c 'name="robots"' dist/about/index.html
```

Expected baseline: `0` (no existing page uses `<meta name="robots">`).

- [ ] **Step 2: Edit `BaseLayout.astro` to add the prop.**

Open `src/layouts/BaseLayout.astro`. Replace lines 10–11:

```astro
export interface Props { title: string; description?: string; locale?: Locale }
const { title, description = 'A living knowledge base on building agentic AI.', locale = 'en' } = Astro.props;
```

with:

```astro
export interface Props { title: string; description?: string; locale?: Locale; noindex?: boolean }
const { title, description = 'A living knowledge base on building agentic AI.', locale = 'en', noindex = false } = Astro.props;
```

- [ ] **Step 3: Edit `BaseLayout.astro` to emit the meta tag conditionally.**

In the same file, find the existing `<link rel="canonical">` line (around line 24):

```astro
  <link rel="canonical" href={canonical} />
  <link rel="alternate" hreflang="en" href={enHref} />
```

Insert one new line between them so the block becomes:

```astro
  <link rel="canonical" href={canonical} />
  {noindex && <meta name="robots" content="noindex, nofollow" />}
  <link rel="alternate" hreflang="en" href={enHref} />
```

- [ ] **Step 4: Rebuild and assert no regression on existing pages.**

```bash
npm run build
grep -c 'name="robots"' dist/about/index.html
grep -c 'name="robots"' dist/index.html
grep -c 'name="robots"' dist/zh/index.html
```

Expected: `0`, `0`, `0` (none of the existing pages opted into `noindex`, so nothing should change in their output).

- [ ] **Step 5: Commit.**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "BaseLayout: add optional noindex prop"
```

---

## Task 2: Create `src/pages/privacy.astro`

**Files:**
- Create: `src/pages/privacy.astro`

This task creates the actual page. Verification grep checks 4 of the 5 build-output assertions from the spec (sitemap is handled in Task 3).

- [ ] **Step 1: Confirm the file does not yet exist (sanity check before creating).**

```bash
ls src/pages/privacy.astro 2>&1
ls dist/privacy/index.html 2>&1
```

Expected: both should say `No such file or directory` (the second one will exist if you ran Task 1's build but had no privacy.astro; in that case it still won't exist).

- [ ] **Step 2: Create the file with the exact content below.**

Create `src/pages/privacy.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Privacy Policy — AI Menu"
  description="Privacy policy for the AI Menu iOS app."
  locale="en"
  noindex={true}>
  <section class="wrap" data-pagefind-ignore style="padding:24px 20px;max-width:760px;">
    <div class="kicker">Privacy</div>
    <h1 style="font-family:'Fraunces',serif;font-weight:400;font-size:32px;margin:.2em 0 .4em;">Privacy Policy</h1>
    <p class="lede" style="margin:0 0 1.2em;"><strong>Last updated: 2026-05-21</strong></p>
    <p class="lede" style="margin:0 0 1.2em;">AI Menu ("the app") is built and operated by Menuagentic. This policy explains what data the app handles, who processes it, and how you control it.</p>

    <section style="margin:26px 0;">
      <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:21px;margin:0 0 .4em;">What data we handle</h2>
      <p class="lede"><strong>Menu photos.</strong> When you scan a menu, your photo is sent over a secure connection to <strong>OpenAI</strong> for text recognition and translation. AI Menu does not retain a copy of your photo on its servers. OpenAI processes the image according to OpenAI's API terms; OpenAI states that API content is not used to train their models.</p>
      <p class="lede"><strong>Anonymous user identifier.</strong> When you first launch AI Menu, the app generates an anonymous user ID via Supabase Auth. This ID is not linked to your name, email, phone number, or any contact information. It is used only to authorize read access to our shared dish catalog.</p>
      <p class="lede"><strong>Approximate location (when permitted).</strong> If you grant location permission, the app uses your approximate location (typically your city) to look up restaurants near you via the Yelp API. AI Menu does not store this location on its servers. Yelp processes the location request under Yelp's own privacy policy.</p>
      <p class="lede"><strong>Scan history.</strong> The translated menus you scan are stored on your device only. They are not transmitted to AI Menu's servers and are not accessible to anyone else.</p>
    </section>

    <section style="margin:26px 0;">
      <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:21px;margin:0 0 .4em;">What we do NOT do</h2>
      <ul class="lede">
        <li>We do not track you across apps or websites.</li>
        <li>We do not show ads.</li>
        <li>We do not sell or share your data for advertising.</li>
        <li>We do not use analytics SDKs that profile your identity.</li>
      </ul>
    </section>

    <section style="margin:26px 0;">
      <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:21px;margin:0 0 .4em;">Third-party processors</h2>
      <table>
        <thead><tr><th>Processor</th><th>Purpose</th><th>Their privacy policy</th></tr></thead>
        <tbody>
          <tr><td>OpenAI</td><td>Image text recognition and translation</td><td><a href="https://openai.com/policies/privacy-policy" rel="noopener">openai.com/policies/privacy-policy</a></td></tr>
          <tr><td>Supabase</td><td>Anonymous authentication, shared dish catalog</td><td><a href="https://supabase.com/privacy" rel="noopener">supabase.com/privacy</a></td></tr>
          <tr><td>Yelp</td><td>Restaurant lookup (when location is granted)</td><td><a href="https://www.yelp.com/tos/privacy_policy" rel="noopener">yelp.com/tos/privacy_policy</a></td></tr>
        </tbody>
      </table>
    </section>

    <section style="margin:26px 0;">
      <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:21px;margin:0 0 .4em;">Your rights and controls</h2>
      <ul class="lede">
        <li><strong>Clear all your data.</strong> Go to Settings → Privacy → "Clear All Data." This permanently removes every menu, cart entry, and preference from your device and ends your anonymous session.</li>
        <li><strong>Revoke location.</strong> Disable in iOS Settings → AI Menu → Location.</li>
        <li><strong>Contact us.</strong> Email <a href="mailto:admin@menuagentic.com">admin@menuagentic.com</a> with any privacy question.</li>
      </ul>
    </section>

    <section style="margin:26px 0;">
      <h2 style="font-family:'Fraunces',serif;font-weight:400;font-size:21px;margin:0 0 .4em;">Changes to this policy</h2>
      <p class="lede">Material changes will be reflected in the "Last updated" date above and announced in the app on next launch.</p>
    </section>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Build.**

```bash
npm run build
```

Expected: build completes with no new warnings. (Astro may print existing warnings — these are unchanged from before.)

- [ ] **Step 4: Assert the built page exists and content is correct.**

```bash
ls dist/privacy/index.html
grep -c 'robots.*noindex'        dist/privacy/index.html
grep -c 'admin@menuagentic.com'  dist/privacy/index.html
grep -c 'Last updated: 2026-05-21' dist/privacy/index.html
grep -c 'data-pagefind-ignore'   dist/privacy/index.html
```

Expected:
- `dist/privacy/index.html` exists.
- Each grep returns `≥ 1` (the meta robots tag, the support email, the publish date, and the pagefind-ignore attribute all appear in the built HTML).

- [ ] **Step 5: Assert no nav/footer leak.** No existing page should suddenly link to `/privacy`.

```bash
grep -c 'href="[^"]*/privacy' dist/index.html
grep -c 'href="[^"]*/privacy' dist/about/index.html
grep -c 'href="[^"]*/privacy' dist/zh/index.html
```

Expected: `0`, `0`, `0`.

- [ ] **Step 6: Commit.**

```bash
git add src/pages/privacy.astro
git commit -m "Add hidden /privacy page for AI Menu (issue #59)"
```

---

## Task 3: Exclude `/privacy` from the sitemap

**Files:**
- Modify: `astro.config.mjs:13`

After Task 2, the build automatically includes `/privacy` in `dist/sitemap-0.xml`. This task adds a filter to omit it.

- [ ] **Step 1: Confirm `/privacy` is currently in the sitemap (this proves the filter is needed and the test below is meaningful).**

```bash
grep -c '/privacy' dist/sitemap-*.xml
```

Expected: `≥ 1` (the page is currently included). If you see `0`, the build state is stale — re-run `npm run build` first.

- [ ] **Step 2: Edit `astro.config.mjs`.**

Open `astro.config.mjs`. Replace the `integrations:` line:

```js
  integrations: [mdx(), sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-Hans' } } })],
```

with:

```js
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !/\/privacy\/?$/.test(page),
      i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-Hans' } },
    }),
  ],
```

The `filter` predicate returns `false` for any URL that ends in `/privacy` or `/privacy/`, which excludes that page from the generated sitemap. All other pages return `true` and remain included.

- [ ] **Step 3: Rebuild.**

```bash
npm run build
```

- [ ] **Step 4: Assert `/privacy` is gone from the sitemap.**

```bash
grep -c '/privacy' dist/sitemap-*.xml
```

Expected: `0`.

- [ ] **Step 5: Assert other URLs are still present** (sanity check that the filter isn't over-aggressive).

```bash
grep -c '/about' dist/sitemap-*.xml
grep -c '/field-guide' dist/sitemap-*.xml
```

Expected: each returns `≥ 1`.

- [ ] **Step 6: Commit.**

```bash
git add astro.config.mjs
git commit -m "Exclude /privacy from sitemap"
```

---

## Task 4: Final verification gate

This task runs the full set of project verification gates plus the spec's complete 5-line build-output assertion block. It is the last gate before opening the PR.

- [ ] **Step 1: Run the three required gates from CLAUDE.md.**

```bash
npm run build
npm run verify
npm test
```

Expected:
- `npm run build` — completes with no new warnings.
- `npm run verify` — passes (only checks Field Guide content fragments, not top-level pages — `/privacy` is not in its scope, so adding it should not perturb the output).
- `npm test` — all existing tests pass.

- [ ] **Step 2: Run the full build-output assertion block from the spec.**

```bash
ls dist/privacy/index.html                                 # page exists
grep -c 'robots.*noindex'      dist/privacy/index.html     # ≥ 1
grep -c '/privacy'             dist/sitemap-*.xml          # 0  — sitemap exclusion
grep -c 'href="[^"]*/privacy'  dist/index.html             # 0  — no nav/footer leak
grep -c 'admin@menuagentic.com' dist/privacy/index.html    # ≥ 1 — email substitution
```

Expected (exactly): page exists; `≥ 1`; `0`; `0`; `≥ 1`.

- [ ] **Step 3: Read the built HTML to confirm visual structure** (one-time correctness check by a human).

```bash
wc -l dist/privacy/index.html
```

Expected: a few hundred lines (header/footer overhead plus body content).

Open the file in an editor or browser and spot-check:
- "Privacy Policy" h1 renders with Fraunces serif font.
- All five `<section>` blocks (data, NOT do, processors, controls, changes) appear in order.
- `admin@menuagentic.com` is a clickable `mailto:` link.
- OpenAI / Supabase / Yelp processor links open in the same tab (no `target="_blank"` was specified — fine for an iOS in-app browser context).

- [ ] **Step 4: Confirm the publish date matches the actual planned merge day.**

If today is no longer `2026-05-21`, update the date in `src/pages/privacy.astro` to today's date and rebuild. Per CLAUDE.md, "A stale [changelog] date is a defect" — same principle applies here.

```bash
date +%F
grep 'Last updated:' src/pages/privacy.astro
```

If the two dates differ: edit `src/pages/privacy.astro`, change the `Last updated:` line to today's date, re-run Task 4 Step 1 + Step 2, then commit as a new commit (do NOT amend Task 2):

```bash
git add src/pages/privacy.astro
git commit -m "Bump privacy page Last updated to actual merge day"
```

- [ ] **Step 5: Push the branch and open the PR.**

```bash
git push -u origin privacy-page
gh pr create --title "Add hidden /privacy page for AI Menu (issue #59)" --body "$(cat <<'EOF'
## Summary
- Adds `src/pages/privacy.astro` so `https://menuagentic.com/privacy` (and the wiki domain) return 200 — unblocks Apple App Store submission for AI Menu.
- Page is intentionally hidden from the wiki: no nav/footer link, `<meta name="robots" content="noindex, nofollow">`, excluded from `sitemap-index.xml`, and `data-pagefind-ignore` on the content wrapper.
- Adds a reusable `noindex?: boolean` prop to `BaseLayout`.

Per the issue author's follow-up comment, this PR intentionally does NOT satisfy issue acceptance criterion #4 ("Footer or sitemap surfaces a link to /privacy") — the page is for the iOS app, not for the wiki website. A separate wiki-website privacy page will follow later.

Closes #59.

## Test plan
- [ ] `npm run build && npm run verify && npm test` — all pass locally.
- [ ] After Vercel deploy: `curl -sI https://agentic-ai-wiki.vercel.app/privacy` → 200.
- [ ] After Vercel deploy: `curl -sI https://menuagentic.com/privacy` → 200.
- [ ] Mobile Safari open of `https://menuagentic.com/privacy` — page renders, no auth wall, no JS-required redirect.
- [ ] `https://agentic-ai-wiki.vercel.app/sitemap-index.xml` — `/privacy` absent.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 6: After merge, run post-deploy smoke checks** (manual).

Wait for Vercel to finish the production deploy (typically 1–3 minutes after squash-merge). Then:

```bash
curl -sI https://agentic-ai-wiki.vercel.app/privacy | head -1
curl -sI https://menuagentic.com/privacy           | head -1
curl -s  https://agentic-ai-wiki.vercel.app/sitemap-index.xml | grep -c '/privacy'
```

Expected: `HTTP/2 200`, `HTTP/2 200`, `0`.

Open `https://menuagentic.com/privacy` on an iPhone (or in mobile Safari emulation in Chrome DevTools). Confirm legibility, working mailto link, and working processor links.

- [ ] **Step 7: Clean up.**

```bash
# back in the main checkout, NOT the worktree
git -C /Users/cq/Git/ai-wiki/Agentic-AI-Wiki fetch --prune
git -C /Users/cq/Git/ai-wiki/Agentic-AI-Wiki switch main
git -C /Users/cq/Git/ai-wiki/Agentic-AI-Wiki pull --ff-only
git -C /Users/cq/Git/ai-wiki/Agentic-AI-Wiki worktree remove .worktrees/privacy-page
git -C /Users/cq/Git/ai-wiki/Agentic-AI-Wiki branch -d privacy-page
```

Close issue #59 with a link to the merged PR if `gh pr merge` did not auto-close it.

---

## Self-review (executor: skim before starting)

This section is the spec-coverage / placeholder-scan / type-consistency check performed when the plan was written. Issues found were fixed inline; the list below records the checks done.

**Spec coverage:**
- Spec §Goals (200 on both domains, `Linking.openURL`, BaseLayout visual vocabulary) → Tasks 2, 4 Step 6.
- Spec §Non-goals (no `/zh/privacy`, no nav/footer link, no changelog, no domain config) → File map "intentionally NOT touched" list.
- Spec §Files touched: BaseLayout, privacy.astro, astro.config.mjs → Tasks 1, 2, 3.
- Spec §Why inlined HTML → encoded in Task 2's content (no `i18n/ui.ts` edits).
- Spec §BaseLayout noindex prop → Task 1.
- Spec §Sitemap exclusion → Task 3.
- Spec §privacy.astro shape → Task 2 Step 2 (verbatim copy).
- Spec §Substitutions (email, date) → Task 2 Step 2 content; date freshness re-checked in Task 4 Step 4.
- Spec §Privacy-of-the-page itself (4 defenses) → all four implemented across Tasks 1–3 (meta robots, no nav, sitemap exclusion, pagefind-ignore).
- Spec §Verification: build gates → Task 4 Step 1; build-output assertions → Task 4 Step 2; manual smoke → Task 4 Step 6.
- Spec §Acceptance criteria mapping → all five rows trace to plan steps.
- Spec §Workflow → Task 4 Steps 5–7.

**Placeholder scan:** Plan contains no "TBD", "TODO", "fill in later", or "similar to Task N" shortcuts. Every code change shows the exact code. Every assertion shows the exact command and expected output.

**Type consistency:** Prop name `noindex` matches in BaseLayout interface (Task 1 Step 2), BaseLayout body (Task 1 Step 3), and privacy.astro usage (Task 2 Step 2). Meta tag string `noindex, nofollow` is identical in spec, Task 1, and Task 4's assertion. Filter regex `/\/privacy\/?$/` in Task 3 matches the spec's regex byte-for-byte.

**One known gotcha** for the executor: if `npm run build` is run with a stale `dist/`, the Task 3 Step 1 grep may pick up old output. The build is idempotent — if anything looks off, `rm -rf dist && npm run build` reproduces a clean state.
