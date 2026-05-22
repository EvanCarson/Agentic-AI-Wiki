# Privacy page for AI Menu iOS app — design

> Issue: [#59](https://github.com/EvanCarson/Agentic-AI-Wiki/issues/59) ·
> Tier P0 · Lens: `lens/content` · App Store submission blocker

## Problem

AI Menu (iOS, Expo) is preparing its first App Store submission. Apple
requires a public privacy policy URL referenced from App Store Connect
metadata, and the in-app Settings → Privacy → "Privacy Policy" row hard-codes
`https://menuagentic.com/privacy`. The page does not currently exist;
tapping the row in the shipping app would 404.

This blocks TestFlight external review, App Store submission, and the
"App Privacy" nutrition label being honest about declared data flows.

The wiki repo serves both `agentic-ai-wiki.vercel.app` and
`menuagentic.com` from the same Vercel project (`menuagentic.com` is
configured as a custom domain on this project), so a static page added to
this repo under `src/pages/privacy.astro` resolves at both hostnames.

## Goals

- Ship `GET https://menuagentic.com/privacy → 200` with the policy text
  from issue #59, verbatim, with placeholders substituted.
- Render under iOS `Linking.openURL` with no auth wall, no JS-required
  redirect, and a readable mobile layout.
- Use `BaseLayout` and the site's existing visual vocabulary
  (`.wrap`, `.kicker`, `h1`, `h2`, `.lede`) so the page looks of-a-piece
  with the rest of the site for anyone who does discover it.

## Non-goals

- **No nav link, no footer link, no changelog entry.** Per the issue
  author's follow-up comment: "this would be a privacy URL for the iOS
  app, not for the website. Don't show active link over website, we will
  create a different one for website later." This intentionally
  contradicts the issue's original acceptance criterion #4 ("Footer or
  sitemap surfaces a link to `/privacy`"), which the follow-up comment
  overrides.
- **No website-facing privacy page for the wiki itself.** That is a
  separate, deferred piece of work.
- **No custom-domain configuration.** `menuagentic.com` is already wired
  to this Vercel project; no DNS or Vercel changes in this PR.

### Brainstorming-time non-goal that was REVERSED during implementation

The original spec said "No `/zh/privacy` Chinese translation" on the
reasoning that `verify-chapters.mjs` only checks Field Guide content
fragments. That reasoning was incomplete: `npm run verify` also runs
`check-internal-links.mjs`, which scans every internal `href` in built
HTML. `BaseLayout` auto-emits `<link rel="alternate" hreflang="zh-Hans"
href="/zh/privacy/">` on every page, so an English-only privacy page
left a dangling internal link and broke the verify gate.

Three fixes were possible: (a) add the zh page, (b) make `BaseLayout`
conditionally skip the zh hreflang for English-only pages, or (c) add
a path exclusion to `check-internal-links.mjs`. We chose (a) — it
keeps the wiki's "every URL has a working locale alternate" invariant
intact and doesn't add complexity to `BaseLayout`. The zh page is
hidden by the same four mechanisms as the English page; the sitemap
filter regex `/\/privacy\/?$/` matches both `/privacy` and
`/zh/privacy`.

## Architecture

### Files touched

| File | Change |
|---|---|
| `src/pages/privacy.astro` | **New.** English page, inlined HTML using site CSS vocabulary. |
| `src/pages/zh/privacy.astro` | **New.** Chinese counterpart, added during implementation to satisfy `check-internal-links.mjs` (see §Non-goals deviation above). |
| `src/layouts/BaseLayout.astro` | **Edit.** Add `noindex?: boolean` prop; when true, emit `<meta name="robots" content="noindex, nofollow">` in `<head>`. |
| `astro.config.mjs` | **Edit.** Add `filter` to `sitemap()` integration to exclude `/privacy` (and `/zh/privacy`) from `sitemap-index.xml`. |

No changes to `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`,
`src/i18n/ui.ts`, or `src/content/changelog/entries/*`.
The page is intentionally orphaned from the wiki's information
architecture.

### Why inlined HTML, not data-driven through `i18n/ui.ts`

`AboutView.astro` reads section data from `src/i18n/ui.ts` because the
About page is bilingual; the i18n indirection exists to drive both
locales from one structure. The privacy page is English-only and is
not part of the wiki's reader-facing content, so the indirection costs
more than it pays. Inlining the prose directly in `privacy.astro` is
faster to read in a PR (no jumping between two files), easier for a
non-Astro reviewer (e.g., a legal reviewer) to scan, and contains the
hidden-page exception within a single file.

### `BaseLayout` `noindex` prop

`BaseLayout` builds the `<head>` and currently has no slot. Adding a
boolean prop is the smallest change that:

1. Keeps the meta tag at the page level (semantic correctness — the
   robots directive is a property of the page, not the layout).
2. Stays reusable. The next hidden page (e.g., a future
   App-Store-only "data deletion" URL, if Apple's policy expands) can
   pass `noindex` without re-litigating this design.

Sketch (in `BaseLayout.astro`, in the `Props` interface and `<head>`):

```diff
- export interface Props { title: string; description?: string; locale?: Locale }
- const { title, description = '...', locale = 'en' } = Astro.props;
+ export interface Props { title: string; description?: string; locale?: Locale; noindex?: boolean }
+ const { title, description = '...', locale = 'en', noindex = false } = Astro.props;
```

```diff
   <link rel="canonical" href={canonical} />
+  {noindex && <meta name="robots" content="noindex, nofollow" />}
   <link rel="alternate" hreflang="en" href={enHref} />
```

### Sitemap exclusion

`@astrojs/sitemap` accepts a `filter: (page: string) => boolean`
predicate that returns `false` for pages to omit. The integration
passes the full canonical URL.

```diff
   integrations: [
     mdx(),
-    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-Hans' } } }),
+    sitemap({
+      filter: (page) => !/\/privacy\/?$/.test(page),
+      i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-Hans' } },
+    }),
   ],
```

### `privacy.astro` shape

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

Each `h2` reuses the same inline style rule as `AboutView.astro`
(`font-family:'Fraunces',serif;font-weight:400;font-size:21px;margin:0 0 .4em;`)
to keep typography consistent.

## Substitutions

| Placeholder in issue body | Final value | Source |
|---|---|---|
| `<SUPPORT_EMAIL>` | `admin@menuagentic.com` | Issue #59 comment by EvanCarson (2026-05-19/20) |
| `Last updated: 2026-05-19` | `Last updated: 2026-05-21` | Issue acceptance criterion #3: must reflect actual publish date |

## Privacy-of-the-page itself

The page is hidden from wiki readers through four independent
mechanisms (defense in depth — any one of them sufficient, all four
together making it implausible to stumble onto):

1. **No internal link.** `SiteHeader` nav and `SiteFooter` are
   untouched; no other page links to `/privacy`.
2. **`<meta name="robots" content="noindex, nofollow">`.** Tells
   search engines not to index the page and not to follow its
   outbound links.
3. **Sitemap exclusion.** `/privacy` is filtered out of
   `sitemap-index.xml`, so crawlers consulting the sitemap won't see
   it.
4. **`data-pagefind-ignore`** on the page's outer `<section>`.
   In-site search (Pagefind) skips the page, so wiki readers typing
   "privacy" into the search box don't surface it.

The page remains fully discoverable to anyone with the URL — exactly
what the iOS app needs.

## Verification

### Build gates (must pass)

```
npm run build       # static build to dist/ — must complete with no new warnings
npm run verify      # bilingual completeness / no orphans (only checks content fragments)
npm test            # extraction unit tests
```

### Build-output assertions (one-off, run after first successful build)

```
ls dist/privacy/index.html                                 # page exists
grep -c 'robots.*noindex'      dist/privacy/index.html     # ≥ 1
grep -c '/privacy'             dist/sitemap-*.xml          # 0  — sitemap exclusion
grep -c 'href="[^"]*/privacy'  dist/index.html             # 0  — no nav/footer leak (matches an <a> href, not stray substring)
grep -c 'admin@menuagentic.com' dist/privacy/index.html    # ≥ 1 — email substitution
```

### Manual smoke (after Vercel deploy)

- `curl -sI https://agentic-ai-wiki.vercel.app/privacy` → `HTTP/2 200`
- `curl -sI https://menuagentic.com/privacy` → `HTTP/2 200`
- Open `https://menuagentic.com/privacy` in mobile Safari (simulates
  `Linking.openURL`): renders without auth wall, no JS-required
  redirect, legible on iPhone-width viewport, all external processor
  links work.
- Open `https://agentic-ai-wiki.vercel.app/sitemap-index.xml` and
  confirm `/privacy` is absent.

## Acceptance criteria mapping

| Issue #59 criterion | Status under this design |
|---|---|
| `GET https://menuagentic.com/privacy → 200` with rendered policy | Satisfied via static Astro build on the shared Vercel project. |
| `<SUPPORT_EMAIL>` replaced with working address | Satisfied: `admin@menuagentic.com`, rendered as `mailto:`. |
| `Last updated:` reflects actual publish date | Satisfied: `2026-05-21` (the planned merge day). If the PR slips, the value is bumped to the real merge day before merge. |
| Footer or sitemap surfaces a link to /privacy | **Intentionally not satisfied.** Overridden by the issue author's follow-up comment: "Don't show active link over website." |
| Works under `Linking.openURL` (no auth wall, no JS-required redirect) | Satisfied: static HTML, no auth on the site, content renders pre-JS. Verified manually post-deploy. |

## Workflow

1. Branch `privacy-page` in worktree `.worktrees/privacy-page` (already
   created).
2. One consolidated PR linking issue #59. Squash-merge to `main`.
3. After Vercel deploys: run the manual smoke checks; close issue #59.
4. Clean up: remove merged worktree and branch; sync local `main`.

## Open questions

None. All ambiguities in the issue (support email, bilingualism,
nav/footer linking, sitemap, search indexing, page authoring style)
are resolved above.
