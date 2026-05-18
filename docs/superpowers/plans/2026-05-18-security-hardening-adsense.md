# Security Hardening + AdSense Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four non-CSP security response headers, integrate Google AdSense site-wide, add `ads.txt`, harden the JSON-LD serialization, and record the change per repo conventions.

**Architecture:** Static Astro site (`output: 'static'`), auto-deployed by Vercel on push to `main`. No SSR/server code. Headers are configured declaratively in `vercel.json`; the AdSense tag goes in the single shared `<head>` (`BaseLayout.astro`) so it covers en + zh + every section; `ads.txt` is a static file in `public/`. Verification is build + grep of `dist/` (no unit-test surface for headers/markup; the repo's `npm test` covers content extraction only).

**Tech Stack:** Astro 4, Vercel hosting, `vercel.json` headers, `@vercel/analytics`, Node test runner (existing).

---

## File Structure

- `vercel.json` — Modify: add a global `headers` block.
- `public/ads.txt` — Create: AdSense seller authorization.
- `src/layouts/BaseLayout.astro` — Modify: AdSense `<script>` in `<head>`.
- `src/layouts/SectionEntryLayout.astro:62` — Modify: escape `<` in JSON-LD `set:html`.
- `src/content/changelog.ts` — Modify: prepend a bilingual changelog entry.
- `CLAUDE.md` — Modify: add the accepted-security-trade-off note.

No source-code modules are added; no new test files (the changes have no unit-testable surface — each task verifies via build output / grep).

---

### Task 1: Security headers in `vercel.json`

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Add the `headers` block**

Replace the entire contents of `vercel.json` with:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "astro",
  "buildCommand": "npm run build && npm run verify",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

- [ ] **Step 2: Validate JSON parses**

Run: `node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "feat(security): add nosniff, frame-options, referrer & permissions headers"
```

Note: header presence on the live site can only be confirmed post-deploy (Task 7 covers the post-merge curl check); Vercel does not emit these in the local `astro preview`.

---

### Task 2: `public/ads.txt`

**Files:**
- Create: `public/ads.txt`

- [ ] **Step 1: Create the file**

Create `public/ads.txt` with exactly this single line (newline at end, no other content):

```
google.com, pub-1021868103456971, DIRECT, f08c47fec0942fa0
```

- [ ] **Step 2: Build and verify it lands at the site root**

Run: `npm run build && cat dist/ads.txt`
Expected output: `google.com, pub-1021868103456971, DIRECT, f08c47fec0942fa0`

- [ ] **Step 3: Commit**

```bash
git add public/ads.txt
git commit -m "feat(adsense): add ads.txt seller authorization"
```

---

### Task 3: AdSense script in `BaseLayout.astro`

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (the `<head>`, adjacent to the existing `<Analytics />` on line 39)

- [ ] **Step 1: Add the AdSense tag**

In `src/layouts/BaseLayout.astro`, find this line inside `<head>`:

```astro
  <Analytics />
```

Replace it with:

```astro
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1021868103456971" crossorigin="anonymous" is:inline></script>
  <Analytics />
```

`is:inline` tells Astro not to bundle/transform this third-party tag.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build completes with no new warnings.

- [ ] **Step 3: Verify the tag is in both locales' output**

Run: `grep -l 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1021868103456971' dist/index.html dist/zh/index.html`
Expected: both `dist/index.html` and `dist/zh/index.html` listed.

- [ ] **Step 4: Verify it is inside `<head>` (before `</head>`), not the body**

Run: `node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); const i=h.indexOf('adsbygoogle.js'); const e=h.indexOf('</head>'); console.log(i>-1 && i<e ? 'in-head' : 'NOT-in-head')"`
Expected: `in-head`

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat(adsense): load adsbygoogle.js site-wide in <head>"
```

---

### Task 4: Harden JSON-LD serialization (L6)

**Files:**
- Modify: `src/layouts/SectionEntryLayout.astro:62`

- [ ] **Step 1: Escape `<` in the serialized JSON-LD**

In `src/layouts/SectionEntryLayout.astro`, find this line:

```astro
  <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} is:inline />
```

Replace it with:

```astro
  <script type="application/ld+json" set:html={JSON.stringify(jsonLd).replace(/</g, '\\u003c')} is:inline />
```

This emits any `<` as the `<` JSON unicode escape: `JSON.parse` still reads it as `<`, but the HTML parser can never see a literal `</script>` and break out.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build completes, no new warnings.

- [ ] **Step 3: Verify a JSON-LD block still parses and contains no raw `<`**

Run:
```bash
node -e "const h=require('fs').readFileSync('dist/concepts/tokens-and-tokenization/index.html','utf8'); const m=h.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/); const j=JSON.parse(m[1]); console.log(j['@type'], '|', /[<]/.test(m[1]) ? 'RAW-LT-FOUND' : 'no-raw-lt')"
```
Expected: `TechArticle | no-raw-lt` (JSON parses; no unescaped `<` in the block).

If the path `dist/concepts/tokens-and-tokenization/index.html` does not exist, run `ls dist/concepts/*/index.html | head -1` and use that path instead.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/SectionEntryLayout.astro
git commit -m "fix(security): escape < in JSON-LD set:html to prevent script breakout"
```

---

### Task 5: Investigate L3 (Vercel Analytics debug script)

**Files:**
- None modified unless a clean config option exists.

- [ ] **Step 1: Check whether the production build emits the debug analytics script**

Run: `grep -o 'va.vercel-scripts.com/v1/script[^"]*' dist/index.html | head -1`
Expected: a path ending in either `script.js` (production) or `script.debug.js` (debug).

- [ ] **Step 2: If `script.debug.js`, check for a mode option on the Astro integration**

Run: `grep -rn "mode\|debug" node_modules/@vercel/analytics/dist/astro/* 2>/dev/null | head`
Decision rule:
- If the integration exposes a `mode="production"` / `debug={false}` prop or env-based switch, set it in `src/layouts/BaseLayout.astro` on the `<Analytics />` component and rebuild.
- If it auto-detects from the deploy environment (i.e. the local `astro build` simply lacks Vercel's production env), **make no code change** — the deployed site will serve `script.js`. Record this conclusion.

- [ ] **Step 3: Record the finding**

Note the conclusion (no-op vs. config change) in the Task 6 changelog reasoning / PR description. No commit if no code changed.

---

### Task 6: Changelog entry + CLAUDE.md governance note

**Files:**
- Modify: `src/content/changelog.ts` (prepend a new entry at the top of the `CHANGELOG` array)
- Modify: `CLAUDE.md`

- [ ] **Step 1: Prepend the changelog entry**

In `src/content/changelog.ts`, insert this object as the **first** element of the `CHANGELOG` array (immediately after `export const CHANGELOG: ChangelogEntry[] = [`):

```ts
  {
    date: '2026-05-18',
    title: L('Security hardening & AdSense', '安全加固与 AdSense 接入'),
    items: [
      L('Added security response headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy.',
        '新增安全响应头：X-Content-Type-Options、X-Frame-Options、Referrer-Policy 与 Permissions-Policy。'),
      L('Integrated Google AdSense site-wide and added ads.txt seller authorization.',
        '全站接入 Google AdSense，并添加 ads.txt 卖家授权文件。'),
      L('Hardened structured-data (JSON-LD) output against script-tag breakout.',
        '加固结构化数据（JSON-LD）输出，防止 script 标签逃逸。'),
    ],
  },
```

- [ ] **Step 2: Type-check the changelog module**

Run: `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -i changelog || echo "changelog ok"`
Expected: `changelog ok` (no type errors referencing changelog.ts).

- [ ] **Step 3: Add the governance note to `CLAUDE.md`**

In `CLAUDE.md`, immediately after the `## ALWAYS update the changelog` section (before `## Conventions`), insert:

```markdown
## Accepted security trade-off

`main` auto-deploys to production on every push, and content fragments are
rendered with `set:html` (unsanitized by design — content is build-time
author-controlled). Consequence: **a content PR is effectively a code PR** —
review content changes with the same scrutiny as code, including any inline
`<script>`/`on*=` handlers. CSP is intentionally not set (AdSense would
require weakening it to little value); the other security headers in
`vercel.json` carry the defense-in-depth.
```

- [ ] **Step 4: Commit**

```bash
git add src/content/changelog.ts CLAUDE.md
git commit -m "docs: changelog entry + accepted security trade-off note"
```

---

### Task 7: Full verification gate

**Files:** none (verification only)

- [ ] **Step 1: Run the full gate**

Run: `npm run build && npm run verify && npm test`
Expected: all three succeed; build has no new warnings; `verify` reports bilingual completeness / no orphans; tests pass.

- [ ] **Step 2: Final dist spot-checks**

Run:
```bash
test -f dist/ads.txt && echo "ads.txt OK"
grep -q 'adsbygoogle.js?client=ca-pub-1021868103456971' dist/index.html && echo "adsense en OK"
grep -q 'adsbygoogle.js?client=ca-pub-1021868103456971' dist/zh/index.html && echo "adsense zh OK"
```
Expected: `ads.txt OK`, `adsense en OK`, `adsense zh OK`.

- [ ] **Step 3: Open PR**

```bash
git push -u origin HEAD
gh pr create --title "Security hardening + AdSense integration" --body "$(cat <<'EOF'
Implements docs/superpowers/specs/2026-05-18-security-hardening-adsense-design.md.

- vercel.json: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- AdSense adsbygoogle.js site-wide in <head> (en + zh)
- public/ads.txt seller authorization
- JSON-LD set:html hardened against </script> breakout (L6)
- L3 analytics-debug investigation outcome: <fill from Task 5>
- Changelog + CLAUDE.md accepted-trade-off note

CSP intentionally excluded (AdSense conflict — owner decision).
Deferred: Astro major upgrade (M2, hygiene only).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 4: Post-merge live check**

After Vercel deploys `main`, run:
```bash
curl -sS -D - -o /dev/null https://agentic-ai-wiki.vercel.app/ | grep -iE 'x-content-type-options|x-frame-options|referrer-policy|permissions-policy'
curl -s -o /dev/null -w "%{http_code}\n" https://agentic-ai-wiki.vercel.app/ads.txt
```
Expected: the four headers present; `ads.txt` returns `200`.

---

## Notes for the executor

- **Worktree:** per `CLAUDE.md`, do this on a feature branch in an isolated worktree under `.worktrees/`, not the main checkout.
- **`<pre>` byte-identical rule** does not apply here (no content-fragment edits).
- **Deferred (do NOT do in this plan):** Astro 4 → current major upgrade (M2). Track as a separate issue.
