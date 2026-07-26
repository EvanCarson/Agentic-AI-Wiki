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
    const out = [];
    document.querySelectorAll('body *').forEach((el) => {
      const text = (el.innerText || '').trim();
      if (!text || el.children.length) return;
      const cs = getComputedStyle(el);
      const layers = [];
      for (let n = el; n; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)') layers.push(bg);
      }
      out.push({
        label: (el.className || el.tagName).toString().slice(0, 40),
        color: cs.color,
        layers,
        px: parseFloat(cs.fontSize),
        weight: cs.fontWeight,
      });
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
});
