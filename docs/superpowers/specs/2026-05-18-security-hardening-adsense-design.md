# Security Hardening + AdSense Integration — Design

Date: 2026-05-18
Status: Approved (pending spec review)

## Background

A read-only security audit was performed across four scopes: local
codebase/content, dependency supply chain, git history/PR provenance, and the
live deployed site (https://agentic-ai-wiki.vercel.app).

**No backdoor, no injected/exfiltration code, and no leaked secrets were
found.** The site is a clean static Astro build (`output: 'static'`, no SSR,
no middleware, no server islands, no server-side code, no user input).

### Audit findings (summary)

- **Critical/High: none.** No malicious code; no secrets in working tree or
  full git history (secret-scan hits were prose/code-example words); no
  exposed `.git`/`.env`/source maps/build artifacts on the live site (all
  sensitive paths 404).
- **M1 — Missing security response headers.** Strong HSTS present, but no
  `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy` (CSP intentionally excluded — see Decisions).
- **M2 — `npm audit` High/Moderate in `astro`/`@astrojs/*` are largely not
  exploitable here.** Every flagged advisory requires SSR / middleware /
  server islands / dev server / Cloudflare adapter — none of which this
  static deployment uses. Real risk: low. Deferred as hygiene.
- **L1 — Unsanitized `set:html={body}`** renders content fragments verbatim.
  Acceptable (build-time author-controlled), but means a content PR is
  effectively a code PR.
- **L2 — Auto-deploy + bot/PR write access, no commit signing.** `main`
  auto-deploys to production; Vercel bot/integration can land code. No
  malicious provenance found (the `EvanCarson` commits are the owner's own
  GitHub identity), but the bar between "code lands" and "code is live" is low.
- **L3 — Vercel Analytics loads `script.debug.js` in production.** Verbose
  console logging only; no security impact.
- **L4 — `access-control-allow-origin: *`** on HTML (Vercel default;
  negligible for public static content).
- **L5 — `legacy/agentic_ai_guide_1.html`** committed but not routed/deployed.
- **L6 — JSON-LD via `set:html={JSON.stringify(jsonLd)}`** from manifest
  strings; a literal `</script>` in a future title would break out.

## Goals

1. Close the practical hardening gap (M1, scoped to non-CSP headers).
2. Harden L6.
3. Integrate Google AdSense (account `ca-pub-1021868103456971`) site-wide.
4. Add `ads.txt` for monetization authorization.
5. Document the L1/L2 governance trade-off as an accepted constraint.

Non-goals: Astro major upgrade (M2 — deferred follow-up); fixing the
menuagentic.com AdSense review (different domain — see Caveats).

## Caveats

- **Domain mismatch:** the AdSense ownership-verification screenshot targets
  `menuagentic.com`. This codebase deploys to `agentic-ai-wiki.vercel.app`.
  The publisher ID is account-level so the script functions here, but placing
  it here does **not** verify or clear the `menuagentic.com` site review.
- **AdSense ⇄ CSP conflict:** AdSense dynamically injects scripts/iframes
  from many Google ad domains and uses inline script. Per owner decision, CSP
  is excluded entirely rather than weakened to accommodate ads.

## Decisions

- **CSP:** not added (would be heavily weakened by AdSense; the other four
  headers carry the defense-in-depth value without conflicting with ads).
- **ads.txt:** added.
- **AdSense placement:** `<head>` of `BaseLayout.astro` via `is:inline`, so it
  appears on every page in both locales and is not bundled/transformed by
  Astro's build.

## Design

### 1. `vercel.json` — security headers

Add a global `headers` block applying to all routes (`/(.*)`):

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` — we are never framed; does not affect AdSense's
  own child iframes (X-Frame-Options governs being framed, not framing).
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` —
  deliberately does **not** restrict ad-related features
  (`browsing-topics`, `attribution-reporting`) so AdSense personalization is
  not crippled.

HSTS is already emitted by Vercel and is left unchanged.

### 2. `src/layouts/BaseLayout.astro` — AdSense

Add inside `<head>` (near the existing `<Analytics />`):

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1021868103456971" crossorigin="anonymous"></script>
```

Use Astro `is:inline` to prevent bundling/transformation. All pages route
through `BaseLayout`, so this covers en + zh and every section.

### 3. `public/ads.txt`

```
google.com, pub-1021868103456971, DIRECT, f08c47fec0942fa0
```

Served at `https://agentic-ai-wiki.vercel.app/ads.txt`.

### 4. `src/layouts/SectionEntryLayout.astro` — L6 hardening

Replace the `<` character with its `\\u003c` JSON unicode escape in the JSON-LD serialization so a future manifest
title/summary containing `</script>` cannot break out:

```
set:html={JSON.stringify(jsonLd).replace(/</g, '\\u003c')}
```

### 5. L3 — Analytics debug mode

Inspect `@vercel/analytics/astro` for a mode/debug knob. The Astro
integration auto-detects environment; likely no code change is warranted.
Confirm and report findings; only adjust if a clean config option exists.

### 6. Repo conventions

- Add a newest-first bilingual entry to `src/content/changelog.ts` covering
  the security headers + AdSense + ads.txt + L6 fix.
- Add a short "Accepted security trade-off" note to `CLAUDE.md`: `main`
  auto-deploys and content is rendered unsanitized via `set:html`, so a
  content PR is effectively a code PR — review content PRs accordingly.

## Verification

Must pass before PR/merge:

```
npm run build     # static build, no new warnings
npm run verify    # bilingual completeness / no orphans
npm test          # extraction unit tests
```

Manual post-build checks in `dist/` / `astro preview`:

- AdSense `<script>` present in `<head>` of an en page and a zh page.
- `dist/ads.txt` present with exact expected content.
- Headers present on the live deploy after merge (re-curl `-D -`).

## Deferred follow-up

- **M2:** Astro 4 → current major upgrade. Hygiene only; low real risk on a
  static deploy. Track as a separate issue/PR.
