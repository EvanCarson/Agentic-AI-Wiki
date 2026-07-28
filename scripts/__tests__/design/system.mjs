// scripts/__tests__/design/system.mjs
// Permanent guard for the visual system. Runs against BUILT HTML in a real
// browser, because two near-misses on 2026-07-25 were invisible in CSS
// source: a rule declaring 28px that computed to 17px, and a colour set by
// an inline style attribute that no stylesheet could override.
//
// Requires `npm run build` first — `npm run test:design` does that for you.
// dist/ absent is a hard failure, not a skip: this script is only ever invoked
// explicitly, so a missing build means the caller made a mistake worth hearing
// about rather than a green run that checked nothing.
import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startStaticServer } from '../../lib/static-server.mjs';
import { parseColor, composite, contrastRatio, requiredRatio } from '../../lib/contrast.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const DIST = resolve(ROOT, 'dist');
if (!existsSync(DIST)) throw new Error('dist/ not found — run `npm run build` (or use `npm run test:design`)');

/** One page per section, hand-picked — the routing/layout coverage. */
const CURATED = [
  '/', '/concepts/', '/field-guide/',
  // A real chapter, not just the index: .deliverable and .page-nav-btn only
  // exist here, and they are two of the five emphasis surfaces.
  '/field-guide/prompts/',
  '/concepts/prompt-caching/',
  '/deep-dives/mcp/mcp-building-servers-in-practice/',
  '/operations/agentops/kill-switches/',
  '/playbooks/coding-and-computer-use-agents/coding-agent-architecture/',
  '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/',
  '/changelog/',
  '/zh/concepts/prompt-caching/',
];

/**
 * Components that must be audited somewhere, identified by a marker that
 * appears in the built HTML.
 *
 * A hand-picked page list audits the pages someone thought of. Three separate
 * defects this cycle hid in components that no listed page happened to carry
 * — most recently `.code-tab.active[data-api="anthropic"]` at 4.20:1 against
 * a 4.5:1 floor, live on 20 pages, while the suite ran green. Worse, the list
 * *looked* like it covered it: /field-guide/prompts/ matches a grep for
 * "code-tab" because the inline switchTab() script mentions the class, but it
 * renders no tab buttons at all.
 *
 * So the list is derived instead: for each marker below, find a real page in
 * dist/ that actually contains it and audit that page. A component cannot be
 * added to the site without landing in the audit, and a marker that stops
 * matching anything is a hard failure rather than silent under-coverage.
 */
const COMPONENT_MARKERS = [
  'class="code-tab',        // API tab strip — the 2026-07-27 miss
  'class="deliverable"',    // emphasis surface, end of chapter
  'class="callout start"',  // reading-path box
  'class="threat-row',      // threat table, inverse header row
  'class="qa"',             // Q&A block (--q-ink)
  'class="diagram"',        // ASCII figure, scroll affordance
  'class="blog-card"',      // post preview
  'changelog-detail',       // collapsible changelog entry
  'home-feature-figure',    // inlined lead diagram
  'class="page-meta"',      // reading time
  // 'shell-banner' was listed here and matched nothing: the stub-chapter
  // banner is no longer rendered anywhere. Removed rather than left to rot —
  // a marker that matches nothing is under-coverage pretending to be coverage,
  // which is what the new assertion below exists to surface.
];

/** Walk dist/ once and map each marker to a page that really contains it. */
function pagesForComponents() {
  const pages = [];
  const missing = [];
  const files = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = resolve(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'index.html') files.push(p);
    }
  };
  walk(DIST);
  files.sort();

  for (const marker of COMPONENT_MARKERS) {
    const hit = files.find((f) => readFileSync(f, 'utf8').includes(marker));
    if (!hit) { missing.push(marker); continue; }
    const route = hit.slice(DIST.length).replace(/index\.html$/, '') || '/';
    if (!pages.includes(route)) pages.push(route);
  }
  return { pages, missing };
}

const { pages: COMPONENT_PAGES, missing: MISSING_MARKERS } = pagesForComponents();
const PAGES = [...new Set([...CURATED, ...COMPONENT_PAGES])];
const VIEWPORTS = [{ w: 390, h: 844 }, { w: 768, h: 1024 }, { w: 1280, h: 900 }];
const THEMES = ['light', 'dark'];

let server, browser;

before(async () => {
  server = await startStaticServer(DIST);
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
  await server?.close();
});

/**
 * Collect every element painted with the emphasis surface (--surface-inverse),
 * along with what it sits on and what edge it draws.
 *
 * Resolves the token through a probe element rather than string-matching
 * getPropertyValue('--surface-inverse'): the custom property returns the
 * AUTHORED text ('#24261F') while backgroundColor returns used values
 * ('rgb(36, 38, 31)'), so a direct comparison silently matches nothing and
 * the test goes vacuously green — the exact failure mode the syntax-class
 * test hit once already.
 */
async function collectEmphasisSurfaces(page) {
  return page.evaluate(() => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = 'var(--surface-inverse)';
    document.body.appendChild(probe);
    const target = getComputedStyle(probe).backgroundColor;
    probe.remove();

    function bgLayers(el) {
      const layers = [];
      for (let n = el; n; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)') layers.push(bg);
      }
      return layers;
    }

    const out = [];
    document.querySelectorAll('body *').forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.backgroundColor !== target) return;
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const under = el.parentElement ? bgLayers(el.parentElement) : [];
      // A nested element repainting the same surface has no edge to check —
      // it is not a panel boundary, it is the inside of one.
      if (!under.length || under[0] === target) return;
      out.push({
        label: (el.className || el.tagName).toString().slice(0, 40),
        ownBg: cs.backgroundColor,
        under,
        borders: ['Top', 'Right', 'Bottom', 'Left']
          .map((side) => ({
            width: parseFloat(cs[`border${side}Width`]) || 0,
            color: cs[`border${side}Color`],
          }))
          .filter((b) => b.width > 0),
      });
    });
    return out;
  });
}

/** Collect every text-bearing leaf with its computed colour + composited bg. */
async function auditPage(page) {
  return page.evaluate(() => {
    // Shared by both the real-text walk and the pseudo-element walk below —
    // walks up from `el` collecting every ancestor's own background-color
    // (skipping fully transparent ones) so contrast.mjs's composite() can
    // flatten them in paint order.
    function bgLayers(el) {
      const layers = [];
      for (let n = el; n; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)') layers.push(bg);
      }
      return layers;
    }
    const out = [];
    document.querySelectorAll('body *').forEach((el) => {
      const text = (el.innerText || '').trim();
      if (!text || el.children.length) return;
      const cs = getComputedStyle(el);
      out.push({
        label: (el.className || el.tagName).toString().slice(0, 40),
        color: cs.color,
        layers: bgLayers(el),
        px: parseFloat(cs.fontSize),
        weight: cs.fontWeight,
      });
    });
    // ::before / ::after content never enters the DOM, so the walk above
    // never sees it — and getComputedStyle(el) with no second argument
    // never returns pseudo-element styles either. This is precisely how
    // three real AA failures on .callout badge labels (::before content)
    // shipped invisibly behind "12/12 green, zero contrast failures":
    // Lighthouse skips pseudo content the same way. Check every element's
    // ::before/::after explicitly, the same way, with the same helpers.
    document.querySelectorAll('body *').forEach((el) => {
      for (const pseudo of ['::before', '::after']) {
        const cs = getComputedStyle(el, pseudo);
        const content = cs.content;
        if (!content || content === 'none' || content === '""' || content === "''") continue;
        out.push({
          label: `${(el.className || el.tagName).toString().slice(0, 30)}${pseudo}`,
          color: cs.color,
          // The pseudo has its OWN box with its own background-color (e.g.
          // `.callout.tip::before { background: var(--badge-tip-bg) }`) —
          // that is the nearest layer, painted on top of `el`'s own
          // background, then el's ancestors. `bgLayers(el)` already starts
          // its walk at `el` itself, so prepending the pseudo's own bg is
          // the only change needed vs. the real-text case above.
          layers: [cs.backgroundColor, ...bgLayers(el)].filter(
            (bg) => bg && bg !== 'rgba(0, 0, 0, 0)'
          ),
          px: parseFloat(cs.fontSize),
          weight: cs.fontWeight,
        });
      }
    });
    return out;
  });
}

describe('design system', () => {
  // Under-coverage must be loud. If a marker stops matching, the component was
  // renamed or dropped and the audit silently shrank — which is exactly how
  // the .code-tab failure survived.
  test('every audited component still exists in the build', () => {
    assert.deepEqual(MISSING_MARKERS, [],
      `component markers matched no page in dist/ — rename them or drop them:\n${MISSING_MARKERS.join('\n')}`);
  });

  for (const theme of THEMES) {
    for (const vp of VIEWPORTS) {
      test(`contrast AA — ${theme} @ ${vp.w}px`, async () => {
        const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme });
        const page = await ctx.newPage();
        const failures = [];
        for (const path of PAGES) {
          await page.goto(server.url + path, { waitUntil: 'load' });
          for (const el of await auditPage(page)) {
            const ratio = contrastRatio(parseColor(el.color).slice(0, 3), composite(el.layers));
            const need = requiredRatio(el.px, el.weight);
            if (ratio < need) failures.push(`${path} ${el.label} ${el.px}px ${ratio}<${need}`);
          }
        }
        await ctx.close();
        assert.deepEqual(failures, [], `contrast failures:\n${failures.join('\n')}`);
      });
    }
  }

  // 375px added when the nav became a panel: the header lost its shrink
  // absorber (the scroller), so "fits at 390" stopped implying "fits on an
  // iPhone SE". 390 alone would have shipped a 15px overflow there.
  test('no horizontal overflow at 375px', async () => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    const bad = [];
    for (const path of PAGES) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const over = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      if (over) bad.push(path);
    }
    await ctx.close();
    assert.deepEqual(bad, [], `pages scroll horizontally: ${bad.join(', ')}`);
  });

  test('no horizontal overflow at 390px', async () => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    const bad = [];
    for (const path of PAGES) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (over) bad.push(path);
    }
    await ctx.close();
    assert.deepEqual(bad, [], `pages scroll horizontally: ${bad.join(', ')}`);
  });

  // 768px sits inside the >640px "desktop" band the header CSS used to leave
  // unguarded: nav's overflow-x only applied ≤640px, so between ~641-1063px
  // the un-shrunk nav forced the whole page to scroll horizontally (a real
  // regression measured on this exact viewport during Task 6 review).
  test('no horizontal overflow at 768px', async () => {
    const ctx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const page = await ctx.newPage();
    const bad = [];
    for (const path of PAGES) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (over) bad.push(path);
    }
    await ctx.close();
    assert.deepEqual(bad, [], `pages scroll horizontally: ${bad.join(', ')}`);
  });

  test('mobile header is a single row', async () => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(server.url + '/concepts/prompt-caching/', { waitUntil: 'load' });
    const h = await page.evaluate(() => {
      const el = document.querySelector('.site-header');
      // Count rows only among links that are IN the header's flow. The
      // disclosure panel is position:absolute — it is stacked by design and
      // costs the header no height, so counting its 8 links as 8 header rows
      // measures the wrong thing. What this test exists to catch is the
      // header BOX growing (the 155px wrapped nav of 2026-07-25), and the
      // height assertion below plus the in-flow row count still catch it.
      // Reachability of the panel's links is asserted separately, at five
      // widths, by "every primary nav link is reachable".
      const inFlow = [...el.querySelectorAll('nav a')].filter(
        (a) => getComputedStyle(a.closest('nav')).position !== 'absolute'
      );
      const rows = new Set(inFlow.map((a) => Math.round(a.getBoundingClientRect().top)));
      return {
        height: Math.round(el.getBoundingClientRect().height),
        rows: rows.size,
        inFlow: inFlow.length,
      };
    });
    await ctx.close();
    assert.ok(h.height <= 60, `header is ${h.height}px, expected <= 60`);
    // At 390px the primary nav is a panel, so the only in-flow nav links are
    // the language switcher's. Zero would mean the selector stopped matching.
    assert.ok(h.inFlow > 0, 'no in-flow header nav links found — selector is wrong, not the design');
    assert.equal(h.rows, 1, `header nav wraps to ${h.rows} rows, expected 1`);
  });

  test('tap targets are at least 44px on mobile', async () => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(server.url + '/concepts/prompt-caching/', { waitUntil: 'load' });
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('.site-header a, .site-header button')]
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { t: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 24), h: Math.round(r.height), w: Math.round(r.width) };
        })
        // height-only checking let a control pass with a squeezed width (an
        // icon-only flex item can be tall enough but shrink to ~18px wide) —
        // check both dimensions.
        .filter((x) => x.h > 0 && (x.h < 44 || x.w < 44)));
    await ctx.close();
    assert.deepEqual(small, [], `header controls under 44px: ${JSON.stringify(small)}`);
  });

  test('header labels are not squeezed onto multiple lines', async () => {
    // The header height and single-row checks both pass while individual
    // items compress: flex children default to `flex-shrink: 1`, so under
    // `flex-wrap: nowrap` the nav links shrank to min-content and wrapped
    // their own labels internally instead of keeping natural width and
    // letting the nav scroll. Nothing about the header's outer box changes,
    // which is exactly why this needs its own assertion.
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(server.url + '/concepts/prompt-caching/', { waitUntil: 'load' });
    const squeezed = await page.evaluate(() => {
      const measure = document.createElement('canvas').getContext('2d');
      return [...document.querySelectorAll('.site-header .brand, .site-header nav a, .lang-switch a')]
        // A control that is not rendered cannot be squeezed. innerText falls
        // back to textContent for display:none, so without this the hidden
        // language link reports "needed 40, actual 0" and fails on an element
        // nobody can see. getClientRects() is the check that distinguishes
        // "not displayed" from "displayed at zero width" — the latter is a
        // real squeeze and still fails.
        .filter((el) => el.getClientRects().length > 0)
        .map((el) => {
          const cs = getComputedStyle(el);
          measure.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
          const text = (el.innerText || '').trim();
          // Canvas ignores letter-spacing; add it back or every spaced label
          // looks like it fits when it does not.
          const tracking = (parseFloat(cs.letterSpacing) || 0) * text.length;
          const needed = measure.measureText(text).width + tracking
            + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
          const actual = el.getBoundingClientRect().width;
          return { t: text.slice(0, 20), needed: Math.round(needed), actual: Math.round(actual) };
        })
        // 2px tolerance for sub-pixel rounding and canvas-vs-layout drift.
        .filter((x) => x.actual < x.needed - 2);
    });
    await ctx.close();
    assert.deepEqual(squeezed, [],
      `header labels compressed below their text width: ${JSON.stringify(squeezed)}`);
  });

  // The shipped guard ran at ONE viewport (1280px) against THREE article
  // pages, which is why three separate measure defects shipped green: 30
  // characters at 901px (both rails switching on with no width to hold them),
  // 80 characters at 768px, and 97-108 characters on every index page, none
  // of which has ever had a max-width.
  //
  // The window is 60-78 at >=768px. Below 700px it is 35-78: 60 characters at
  // 16px needs 510px of column, which does not exist in a 390px viewport, so
  // asserting 60 there would demand a font size no phone should use.
  const MEASURE_WIDTHS = [390, 430, 768, 901, 1024, 1152, 1280, 1360, 1440, 1728];
  const MEASURE_PAGES = [
    '/field-guide/llm-mental-model/',
    '/concepts/prompt-caching/',
    '/deep-dives/mcp/mcp-building-servers-in-practice/',
    '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/',
    '/',
    '/concepts/',
    '/changelog/',
    '/blogs/',
    '/about/',
    '/zh/concepts/prompt-caching/',
  ];

  /**
   * Width in characters of every substantial run of text on the page, using
   * the average advance of the lowercase alphabet plus space in each block's
   * own computed font. Returns {max, worst} plus `seen` so a selector that
   * stops matching cannot pass vacuously.
   */
  const measureChars = () => {
    const c = document.createElement('canvas').getContext('2d');
    const ab = 'abcdefghijklmnopqrstuvwxyz ';
    const visible = (el) => {
      const b = el.getBoundingClientRect();
      if (b.width < 1 || b.height < 1) return false;
      const cs = getComputedStyle(el);
      return cs.visibility !== 'hidden' && cs.display !== 'none';
    };
    // A block carries a line of text only if it has no block-level child.
    // Length-based rules are not enough: li.changelog-entry wraps <time> and
    // <details>, and BOTH ways of having no long child defeat them — below
    // 900px Chromium reports empty innerText for content inside a closed
    // <details>, and above it an entry whose bullets are each under the
    // threshold produces no qualifying child either. Either way the wrapper
    // survives as a "leaf" and its column width is read as a line length,
    // reporting a failure no CSS change could fix.
    const BLOCK_CHILD = 'p, li, ul, ol, div, section, table, pre, details, summary, figure, blockquote, h1, h2, h3, h4, h5, h6, time, nav, aside';
    const cands = [...document.querySelectorAll('main p, main li, .lede, .toc-desc, .entry-summary')]
      .filter((el) => el.innerText.trim().length >= 120 && visible(el) && !el.querySelector(BLOCK_CHILD));
    const leaves = cands.filter((el) => !cands.some((o) => o !== el && el.contains(o)));
    let max = 0, worst = null, seen = 0;
    for (const el of leaves) {
      seen++;
      const cs = getComputedStyle(el);
      c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const chars = Math.round(el.getBoundingClientRect().width / (c.measureText(ab).width / ab.length));
      if (chars > max) {
        max = chars;
        worst = `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} ${Math.round(el.getBoundingClientRect().width)}px @${cs.fontSize}`;
      }
    }
    return { max, worst, seen };
  };

  for (const w of MEASURE_WIDTHS) {
    test(`prose measure is 60-78 characters (35-78 below 700px) @ ${w}px`, async () => {
      const [floor, ceiling] = w < 700 ? [35, 78] : [60, 78];
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      const bad = [];
      let total = 0;
      for (const path of MEASURE_PAGES) {
        await page.goto(server.url + path, { waitUntil: 'load' });
        const { max, worst, seen } = await page.evaluate(measureChars);
        total += seen;
        // A page with no multi-line prose at this width is not a failure —
        // /changelog/ below 900px is entirely inside a collapsed <details>
        // and its hero lede is 74 characters, so nothing on it can wrap.
        // Coverage is enforced across widths by the assertion below instead,
        // so a page cannot silently drop out of the audit.
        if (seen === 0) continue;
        if (max < floor || max > ceiling) bad.push(`${path} = ${max} chars (${worst})`);
      }
      await ctx.close();
      assert.ok(total > 0, 'measured nothing on any page — the selector list is stale');
      assert.deepEqual(bad, [], `measure outside ${floor}-${ceiling} @ ${w}px:\n${bad.join('\n')}`);
    });
  }

  // Per-width vacuity is legitimate; permanent vacuity is not. Every page in
  // the audit must yield a real measurement at at least one width, or it is
  // being listed as covered while contributing nothing — the "coverage
  // pretending to be coverage" failure this suite already guards elsewhere.
  test('every audited page is measured at some width', async () => {
    const uncovered = [];
    for (const path of MEASURE_PAGES) {
      let covered = false;
      for (const w of MEASURE_WIDTHS) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(server.url + path, { waitUntil: 'load' });
        const { seen } = await page.evaluate(measureChars);
        await ctx.close();
        if (seen > 0) { covered = true; break; }
      }
      if (!covered) uncovered.push(path);
    }
    assert.deepEqual(uncovered, [], `measured at no width — listed as covered, contributes nothing:\n${uncovered.join('\n')}`);
  });

  // The blog cap lives in BlogLayout's scoped <style is:global> block rather
  // than site.css, because Astro appends a scope class to every selector
  // there and a global rule of the same shape would lose. That reasoning is
  // only correct if the computed value says so.
  test('blog prose is capped by --w-measure', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(server.url + '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/', { waitUntil: 'load' });
    const got = await page.evaluate(() => {
      const p = [...document.querySelectorAll('.blog-article p')].find((x) => x.innerText.trim().length > 250);
      return p ? { maxW: getComputedStyle(p).maxWidth, w: Math.round(p.getBoundingClientRect().width) } : null;
    });
    await ctx.close();
    assert.ok(got, 'found no .blog-article p over 250 chars — the selector is stale');
    assert.notEqual(got.maxW, 'none', 'blog prose has no max-width — the scoped cap did not apply');
    assert.ok(got.w <= 700, `blog prose is ${got.w}px, want <=700px`);
  });

  // Keep this list in sync with the `.c-*` rules in guide.css — every
  // syntax class styled there belongs here too, or a future syntax colour
  // can regress below AA with this test still reporting green (exactly how
  // .c-err's 4.43:1 shipped unguarded before this list covered it).
  const SYNTAX_CLASSES = ['c-kw', 'c-st', 'c-fn', 'c-cm', 'c-out', 'c-err', 'c-atk'];
  // No single page's first <pre> carries all seven, so this can't just add
  // classes to the original single-page/first-<pre> check: the MCP page
  // has c-cm/c-kw/c-st/c-out but no c-fn, c-err, or c-atk anywhere in it;
  // field-guide's "the-loop" and "safety" pages between them carry the
  // rest. Scans every <pre> on every listed page (not just the first) and
  // fails loudly if any of the seven is never found at all — a class
  // silently absent from every checked page would mean this test verified
  // nothing for it, the same failure mode that let .c-err ship unguarded.
  const SYNTAX_PAGES = [
    '/deep-dives/mcp/mcp-building-servers-in-practice/',
    '/field-guide/the-loop/',
    '/field-guide/safety/',
  ];
  test('syntax colours meet AA against the code background', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const found = new Map(); // class name -> [{ color, bg }]
    for (const path of SYNTAX_PAGES) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const rows = await page.evaluate((classes) => {
        const out = [];
        document.querySelectorAll('pre').forEach((pre) => {
          const bg = getComputedStyle(pre).backgroundColor;
          out.push({ name: 'pre', color: getComputedStyle(pre).color, bg });
          for (const cls of classes) {
            pre.querySelectorAll('.' + cls).forEach((el) => {
              out.push({ name: cls, color: getComputedStyle(el).color, bg });
            });
          }
        });
        return out;
      }, SYNTAX_CLASSES);
      for (const r of rows) {
        if (!found.has(r.name)) found.set(r.name, []);
        found.get(r.name).push(r);
      }
    }
    await ctx.close();
    if (found.size === 0) return; // none of the pages built with a code block

    const missing = SYNTAX_CLASSES.filter((cls) => !found.has(cls));
    assert.deepEqual(missing, [], `syntax classes never found on any checked page — test verified nothing for: ${missing.join(', ')}`);

    const bad = [];
    for (const [name, rows] of found) {
      for (const r of rows) {
        const ratio = contrastRatio(parseColor(r.color).slice(0, 3), parseColor(r.bg).slice(0, 3));
        if (ratio < 4.5) bad.push(`${name} ${ratio}`);
      }
    }
    assert.deepEqual(bad, [], `syntax tokens below 4.5:1: ${bad.join(', ')}`);
  });

  // Permanent regression test for the ::before/::after extension to
  // auditPage() (added 2026-07-26 after three real AA failures on
  // .callout badge labels shipped invisibly behind "12/12 green" — see the
  // header comment). Deliberately independent of real site content: a
  // synthetic fixture with a known-failing and a known-passing pseudo
  // exercises the exact same auditPage() + contrast.mjs helpers the six
  // "contrast AA" tests above use, so this can't itself go vacuously green
  // the way the syntax-class test above once did. The one-time proof that
  // the REAL suite actually catches a REAL reverted badge (temporarily
  // un-fixing .callout.tip::before, confirming the named failure, then
  // restoring it) was performed manually and is reported in
  // final-fix-report.md, not encoded here — a permanently-reverted badge
  // can't ship.
  test('pseudo-element content is included in the contrast audit', async () => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.setContent(`<!doctype html><html><body style="background:#fff">
      <style>
        .good::before { content: 'OK'; color: #000000; background: #ffffff; font-size: 14px; }
        .bad::before  { content: 'BAD'; color: #ffffff; background: #ffffff; font-size: 14px; }
        .empty::before { content: ''; }
        .suppressed::before { content: none; }
      </style>
      <div class="good">real text</div>
      <div class="bad">real text</div>
      <div class="empty">real text</div>
      <div class="suppressed">real text</div>
    </body></html>`);
    const rows = await auditPage(page);
    await ctx.close();

    const good = rows.find((r) => r.label === 'good::before');
    const bad = rows.find((r) => r.label === 'bad::before');
    assert.ok(good, 'pseudo audit did not find the passing ::before fixture at all');
    assert.ok(bad, 'pseudo audit did not find the failing ::before fixture at all');
    assert.ok(
      !rows.some((r) => r.label === 'empty::before' || r.label === 'suppressed::before'),
      `pseudo audit should skip empty/none content, found: ${rows.map((r) => r.label).join(', ')}`
    );

    // Same helpers, same rules as every other test in this file — this is
    // what "reuse the existing helpers, do not fork the contrast logic" means.
    const goodRatio = contrastRatio(parseColor(good.color).slice(0, 3), composite(good.layers));
    const badRatio = contrastRatio(parseColor(bad.color).slice(0, 3), composite(bad.layers));
    assert.ok(goodRatio >= requiredRatio(good.px, good.weight), `expected black-on-white fixture to pass AA, got ${goodRatio}`);
    assert.ok(badRatio < requiredRatio(bad.px, bad.weight), `expected white-on-white fixture to fail AA, got ${badRatio}`);
  });

  // ---- Non-text contrast: the emphasis surface -------------------------
  //
  // Everything above this line audits TEXT. That limit is what let a real
  // defect ship on 2026-07-26: dark --surface-inverse was #08090A against a
  // #101110 --paper — 1.05:1 — so .deliverable (777px tall, on all 26
  // chapters) and .callout.start had no visible extent in dark mode. Every
  // text-contrast assertion passed the whole time, because the TEXT on those
  // blocks was fine; it was the block that was gone.
  //
  // guide.css distinguishes the four annotation types by surface, and the
  // two emphasis blocks deliberately carry no left rule, so for them the
  // separation IS the component. Hence WCAG 1.4.11's 3:1 non-text threshold,
  // satisfied by fill or by edge — dark separates on the edge because a
  // raised dark fill tops out around 1.24:1 before it stops reading as a
  // surface. Ordinary card borders (--border-soft) are deliberately NOT held
  // to this: a light-mode card outline at 3:1 would be ~#949790, which reads
  // as a boxed-in table rather than the site's hairline vocabulary.
  const NON_TEXT_MIN = 3;

  /** Best separation an element achieves from what it sits on: fill or any edge. */
  function separation(row) {
    const under = composite(row.under);
    const fill = contrastRatio(composite([row.ownBg, ...row.under]), under);
    // A border paints over the element's own background, at the boundary
    // with the parent — so it composites on top of both, and is compared
    // against the parent alone.
    const edges = row.borders.map((b) =>
      contrastRatio(composite([b.color, row.ownBg, ...row.under]), under)
    );
    return Math.max(fill, ...edges, 0);
  }

  for (const theme of THEMES) {
    test(`emphasis surfaces separate from the page — ${theme}`, async () => {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: theme });
      const page = await ctx.newPage();
      const failures = [];
      let seen = 0;
      for (const path of PAGES) {
        await page.goto(server.url + path, { waitUntil: 'load' });
        for (const row of await collectEmphasisSurfaces(page)) {
          seen++;
          const sep = separation(row);
          if (sep < NON_TEXT_MIN) failures.push(`${path} ${row.label} ${sep}<${NON_TEXT_MIN}`);
        }
      }
      await ctx.close();
      // Without this, a renamed token or a broken probe reports success while
      // checking nothing — the failure mode the syntax-class test hit once.
      assert.ok(seen > 0, 'found no element painted with --surface-inverse: the probe or the token name is wrong, not the design');
      assert.deepEqual(failures, [], `emphasis surfaces that vanish into the page:\n${failures.join('\n')}`);
    });
  }

  // ---- Primary nav reachability -----------------------------------------
  //
  // The gap that let a broken nav ship green. "mobile header is a single
  // row", "header height <= 60px" and "tap targets >= 44px" were all
  // satisfied by making .site-header nav an unconditional overflow-x
  // scroller — while nav content is 747px wide (525px zh) and only fully
  // visible at >=1180px. At 390px, 40px of nav was on screen: the letters
  // "FIEL". Not one assertion asked whether a link could be reached.
  //
  // Asserts the behaviour, not the mechanism: either every link is fully
  // inside the nav's box, or a toggle exists that puts them there. A future
  // redesign is free to change the pattern and stays honest.
  for (const w of [390, 768, 1024, 1280, 1440]) {
    for (const path of ['/concepts/prompt-caching/', '/zh/concepts/prompt-caching/']) {
      test(`every primary nav link is reachable @ ${w}px ${path.startsWith('/zh') ? 'zh' : 'en'}`, async () => {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(server.url + path, { waitUntil: 'load' });

        const collapsed = await page.evaluate(() => {
          const b = document.getElementById('nav-toggle');
          return !!b && getComputedStyle(b).display !== 'none';
        });

        // Closed disclosure must actually conceal its links, or the "panel"
        // is just an unstyled list sitting over the page.
        if (collapsed) {
          const leaking = await page.evaluate(() =>
            [...document.querySelectorAll('#site-nav a')]
              .filter((a) => getComputedStyle(a).visibility !== 'hidden').length
          );
          assert.equal(leaking, 0, `${w}px: ${leaking} nav links visible while the menu is closed`);
          await page.click('#nav-toggle');
        }

        const unreachable = await page.evaluate((vw) => {
          const nav = document.getElementById('site-nav');
          const box = nav.getBoundingClientRect();
          const out = [];
          nav.querySelectorAll('a').forEach((a) => {
            const r = a.getBoundingClientRect();
            const cs = getComputedStyle(a);
            const clipped = r.left < box.left - 0.5 || r.right > box.right + 0.5;
            const offscreen = r.left < -0.5 || r.right > vw + 0.5;
            if (cs.visibility === 'hidden' || r.width < 1 || clipped || offscreen) {
              out.push(`${a.textContent.trim()} [${Math.round(r.left)}..${Math.round(r.right)}] in nav [${Math.round(box.left)}..${Math.round(box.right)}]`);
            }
          });
          return out;
        }, w);

        await ctx.close();
        assert.deepEqual(unreachable, [],
          `nav links not reachable at ${w}px (collapsed=${collapsed}):\n${unreachable.join('\n')}`);
      });
    }
  }

  // ---- Horizontally scrollable content advertises itself ----------------
  //
  // "No horizontal overflow" (above) proves the PAGE never scrolls sideways.
  // It says nothing about the containers that are supposed to: on
  // /field-guide/deployment/, 9 of 25 <pre> overflowed at 1440px and 23 of
  // 25 at 390px, worst by 355px, with no edge treatment at all. macOS and
  // iOS paint no scrollbar until you are already scrolling, so a line cut
  // mid-word reads as a typo rather than as more content.
  //
  // Checks the rendered result, not a class list, so a new scrollable
  // component is held to the same rule. background-image is the proxy for
  // "has an affordance" because every one of them — .site-header nav,
  // .blog-article table, pre, .diagram — uses the same local/scroll
  // gradient technique.
  for (const vp of [{ w: 390 }, { w: 1280 }]) {
    test(`horizontally scrollable containers show a scroll affordance @ ${vp.w}px`, async () => {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: 900 } });
      const page = await ctx.newPage();
      const failures = [];
      let seen = 0;
      for (const path of PAGES) {
        await page.goto(server.url + path, { waitUntil: 'load' });
        const rows = await page.evaluate(() => {
          const out = [];
          document.querySelectorAll('body *').forEach((el) => {
            if (el.scrollWidth <= el.clientWidth + 1) return;
            const cs = getComputedStyle(el);
            if (!/auto|scroll/.test(cs.overflowX)) return;
            out.push({
              label: (el.className || el.tagName).toString().slice(0, 40),
              over: el.scrollWidth - el.clientWidth,
              bgImage: cs.backgroundImage === 'none' ? 'none' : 'present',
            });
          });
          return out;
        });
        for (const r of rows) {
          seen++;
          if (r.bgImage === 'none') failures.push(`${path} ${r.label} overflows by ${r.over}px with no affordance`);
        }
      }
      await ctx.close();
      assert.ok(seen > 0, `found no horizontally scrollable container at ${vp.w}px — the walk is wrong, not the design`);
      assert.deepEqual(failures, [], `content scrolls sideways with nothing to say so:\n${failures.join('\n')}`);
    });
  }

  // ---- Chinese typography: no synthesised oblique -----------------------
  //
  // No CJK face has an italic cut — the style does not exist in Chinese
  // typography — so `font-style: italic` on Chinese text makes the browser
  // shear the glyphs off the fixed em grid they are drawn on. It reads as a
  // rendering fault rather than as emphasis, and it was live on every zh
  // lede, callout, blockquote, figcaption and <em> until 2026-07-26.
  //
  // tokens.css already reasoned exactly this way for Space Grotesk and
  // JetBrains Mono ("has no italic"), and guide.css for .c-cm; it was never
  // extended to --font-cjk. Guarding the *rendered result* rather than the
  // rule means a new fragment, a new layout, or an inline style attribute
  // all get caught the same way.
  const ZH_PAGES = [
    '/zh/', '/zh/concepts/prompt-caching/', '/zh/field-guide/prompts/',
    '/zh/deep-dives/mcp/mcp-building-servers-in-practice/',
  ];
  const CJK = /[㐀-䶿一-鿿豈-﫿]/;

  test('Chinese text is never rendered in a synthesised oblique', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const failures = [];
    let seen = 0;
    for (const path of ZH_PAGES) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const rows = await page.evaluate((cjkSource) => {
        const cjk = new RegExp(cjkSource);
        const out = [];
        document.querySelectorAll('body *').forEach((el) => {
          if (el.children.length) return;
          const text = (el.innerText || '').trim();
          if (!text || !cjk.test(text)) return;
          const cs = getComputedStyle(el);
          out.push({
            label: (el.className || el.tagName).toString().slice(0, 40),
            style: cs.fontStyle,
            sample: text.slice(0, 18),
          });
        });
        return out;
      }, CJK.source);
      for (const r of rows) {
        seen++;
        if (r.style !== 'normal') failures.push(`${path} ${r.label} font-style:${r.style} "${r.sample}"`);
      }
    }
    await ctx.close();
    assert.ok(seen > 0, 'found no CJK text on the zh pages — the pages or the CJK range are wrong, not the design');
    assert.deepEqual(failures, [], `Chinese text set in a synthesised oblique:\n${failures.join('\n')}`);
  });

  // Chinese is drawn on a fixed em grid: the space between characters is
  // already part of the glyph, so the positive tracking that opens up Latin
  // caps prises CJK characters apart instead. Measured 1.32px between every
  // character of 实战指南 at 11px — 12% of the em — across the whole mono
  // label register (nav, brand, kickers, meta lines).
  //
  // Expressed in em, not px, so it holds at every font size. 0.04em is the
  // ceiling: --track-mul leaves the labels at ~0.018em on zh, and the
  // pre-fix values were 0.08-0.2em.
  const MAX_CJK_TRACKING_EM = 0.04;

  test('Chinese text is not tracked out like Latin caps', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const failures = [];
    let seen = 0;
    for (const path of ZH_PAGES) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const rows = await page.evaluate((cjkSource) => {
        const cjk = new RegExp(cjkSource);
        const out = [];
        document.querySelectorAll('body *').forEach((el) => {
          if (el.children.length) return;
          const text = (el.innerText || '').trim();
          if (!text || !cjk.test(text)) return;
          const cs = getComputedStyle(el);
          const px = parseFloat(cs.fontSize) || 16;
          const ls = parseFloat(cs.letterSpacing);
          out.push({
            label: (el.className || el.tagName).toString().slice(0, 34),
            em: Number.isFinite(ls) ? +(ls / px).toFixed(4) : 0,
            sample: text.slice(0, 14),
          });
        });
        return out;
      }, CJK.source);
      for (const r of rows) {
        seen++;
        if (r.em > MAX_CJK_TRACKING_EM) {
          failures.push(`${path} ${r.label} ${r.em}em "${r.sample}"`);
        }
      }
    }
    await ctx.close();
    assert.ok(seen > 0, 'found no CJK text on the zh pages — the pages or the CJK range are wrong, not the design');
    assert.deepEqual(failures, [], `Chinese tracked out beyond ${MAX_CJK_TRACKING_EM}em:\n${failures.join('\n')}`);
  });

  // Proves the check above can actually fail, using the exact colour pair
  // that shipped, so it cannot go vacuously green if a selector drifts.
  test('the emphasis-surface check catches a panel that vanishes into the page', async () => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.setContent(`<!doctype html><html><head><style>
        :root { --surface-inverse: #08090A; }
        body { background: #101110; margin: 0; }
        .panel { background: var(--surface-inverse); width: 300px; height: 100px; }
        .edged { border: 1px solid #666961; }
      </style></head><body>
      <div class="panel vanishes"></div>
      <div class="panel edged"></div>
    </body></html>`);
    const rows = await collectEmphasisSurfaces(page);
    await ctx.close();

    const vanishes = rows.find((r) => r.label.includes('vanishes'));
    const edged = rows.find((r) => r.label.includes('edged'));
    assert.ok(vanishes && edged, `fixture panels not collected, got: ${rows.map((r) => r.label).join(', ') || '(none)'}`);
    assert.ok(
      separation(vanishes) < NON_TEXT_MIN,
      `expected the borderless #08090A-on-#101110 panel to be flagged, scored ${separation(vanishes)}`
    );
    assert.ok(
      separation(edged) >= NON_TEXT_MIN,
      `expected the edged panel to pass, scored ${separation(edged)}`
    );
  });
});
