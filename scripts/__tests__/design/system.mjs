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
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startStaticServer } from '../../lib/static-server.mjs';
import { parseColor, composite, contrastRatio, requiredRatio } from '../../lib/contrast.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const DIST = resolve(ROOT, 'dist');
if (!existsSync(DIST)) throw new Error('dist/ not found — run `npm run build` (or use `npm run test:design`)');

const PAGES = [
  '/', '/concepts/', '/field-guide/',
  '/concepts/prompt-caching/',
  '/deep-dives/mcp/mcp-building-servers-in-practice/',
  '/operations/agentops/kill-switches/',
  '/playbooks/coding-and-computer-use-agents/coding-agent-architecture/',
  '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/',
  '/changelog/',
  '/zh/concepts/prompt-caching/',
];
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
      const rows = new Set([...el.querySelectorAll('nav a')].map((a) => Math.round(a.getBoundingClientRect().top)));
      return { height: Math.round(el.getBoundingClientRect().height), rows: rows.size };
    });
    await ctx.close();
    assert.ok(h.height <= 60, `header is ${h.height}px, expected <= 60`);
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

  test('prose measure is 60-75 characters', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const bad = [];
    for (const path of ['/concepts/prompt-caching/', '/deep-dives/mcp/mcp-building-servers-in-practice/', '/blogs/nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard/']) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      const chars = await page.evaluate(() => {
        const p = [...document.querySelectorAll('main p')].find((x) => x.innerText.trim().length > 250);
        if (!p) return null;
        const cs = getComputedStyle(p);
        const c = document.createElement('canvas').getContext('2d');
        c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const ab = 'abcdefghijklmnopqrstuvwxyz ';
        return Math.round(p.getBoundingClientRect().width / (c.measureText(ab).width / ab.length));
      });
      if (chars !== null && (chars < 60 || chars > 78)) bad.push(`${path} = ${chars} chars`);
    }
    await ctx.close();
    assert.deepEqual(bad, [], `measure out of range:\n${bad.join('\n')}`);
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
});
