// scripts/__tests__/design-tokens.test.mjs
//
// Motion, radius and elevation must come from tokens.
//
// The 2026-07-26 redesign collapsed 24 ad-hoc font sizes to a 10-step scale
// and 29 spacing values to another, then stopped. Motion, radius and
// elevation were left un-tokenised, and drifted exactly the way type and
// spacing had: 28 hand-written transitions at two durations with
// inconsistent easing, two of them `transition: all`; eight distinct radii
// (0 / 2 / 3 / 4 / 6 / 50% / 999px) in a vocabulary otherwise built from
// hard 1px rules. Nothing rendered wrong, which is why it survived — it just
// meant "polish" was decided per-rule instead of once.
//
// Source-level on purpose, like font-weights.test.mjs: this is about the CSS
// agreeing with the token layer. The rendered result is the design guard's
// job. Comment text is skipped — an earlier pass at this rewrote the
// prefers-reduced-motion block because its own comment says
// "Not `transition: none`".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');

const SOURCES = [
  ['src/styles/guide.css', read('../../src/styles/guide.css')],
  ['src/styles/site.css', read('../../src/styles/site.css')],
  ['src/layouts/BlogLayout.astro', read('../../src/layouts/BlogLayout.astro')],
  ['src/components/BlogCard.astro', read('../../src/components/BlogCard.astro')],
  ['src/components/pages/BlogsView.astro', read('../../src/components/pages/BlogsView.astro')],
  ['src/components/pages/SectionIndexView.astro', read('../../src/components/pages/SectionIndexView.astro')],
];

/** Declaration-bearing lines only, with /* … *\/ blocks removed. */
function codeLines(src) {
  const out = [];
  let inComment = false;
  for (const [i, raw] of src.split('\n').entries()) {
    const opens = raw.split('/*').length - 1;
    const closes = raw.split('*/').length - 1;
    const wasIn = inComment;
    if (opens > closes) inComment = true;
    else if (closes > opens) inComment = false;
    const s = raw.trim();
    if (wasIn || s.startsWith('*') || s.startsWith('/*') || s.startsWith('//')) continue;
    out.push([i + 1, raw]);
  }
  return out;
}

test('transition durations come from --dur-* tokens', () => {
  const bad = [];
  for (const [file, src] of SOURCES) {
    for (const [n, line] of codeLines(src)) {
      const m = line.match(/(?<![-\w])transition:([^;}]*)/);
      if (!m || m[1].trim() === 'none') continue;
      if (/(?<![\w.])\d*\.?\d+m?s(?![\w])/.test(m[1])) {
        bad.push(`${file}:${n} ${m[0].trim()}`);
      }
    }
  }
  assert.deepEqual(bad, [], `literal transition durations — use var(--dur-fast) / var(--dur-base):\n${bad.join('\n')}`);
});

test('no `transition: all`', () => {
  // It animates every animatable property, so a later padding or width
  // change on the same element silently becomes an animation.
  const bad = [];
  for (const [file, src] of SOURCES) {
    for (const [n, line] of codeLines(src)) {
      if (/(?<![-\w])transition:\s*all\b/.test(line)) bad.push(`${file}:${n}`);
    }
  }
  assert.deepEqual(bad, [], `name the properties instead of \`all\`:\n${bad.join('\n')}`);
});

test('border-radius comes from --radius-* tokens', () => {
  const bad = [];
  for (const [file, src] of SOURCES) {
    for (const [n, line] of codeLines(src)) {
      const m = line.match(/border-radius:\s*([^;}]+)/);
      if (!m) continue;
      const v = m[1].trim();
      // 0 needs no token — it is the absence of a radius, not a step.
      if (v === '0' || v === '0px' || v.includes('var(--radius-')) continue;
      bad.push(`${file}:${n} border-radius: ${v}`);
    }
  }
  assert.deepEqual(bad, [], `literal radii — use var(--radius-sm|md|pill|round):\n${bad.join('\n')}`);
});

test('box-shadow is either a focus ring or the one overlay token', () => {
  // This design separates surfaces with hairlines and inverse fills, not
  // shadows. The distinguishing property is BLUR, not inset and not offset:
  // a zero-blur box-shadow draws a hard edge — the focus rings (`0 0 0 2px`)
  // and the "you are here" underline on nav and language links
  // (`inset 0 -2px 0`) are both drawn this way, and neither casts light.
  // Only a blurred shadow is elevation, and there is exactly one of those.
  // Two narrower rules were tried first and both over-fired: `inset` alone
  // flagged the copy button's ring, and zero-offset flagged the underline.
  const blurOf = (v) => {
    const lens = v.replace(/^inset\s+/, '').match(/-?[\d.]+(px|rem|em)?/g) || [];
    return lens.length >= 3 ? parseFloat(lens[2]) : 0;
  };
  const RING = (v) => blurOf(v) === 0;
  const bad = [];
  for (const [file, src] of SOURCES) {
    for (const [n, line] of codeLines(src)) {
      const m = line.match(/box-shadow:\s*([^;}]+)/);
      if (!m) continue;
      const v = m[1].trim();
      if (RING(v) || v.includes('var(--shadow-') || v === 'none') continue;
      bad.push(`${file}:${n} box-shadow: ${v}`);
    }
  }
  assert.deepEqual(bad, [], `ad-hoc elevation — reuse var(--shadow-overlay), or use a hairline:\n${bad.join('\n')}`);
});

test('the token layer actually defines what the rules reference', () => {
  // Guards against the tests above passing because a token name was renamed
  // and every call site now resolves to nothing.
  const tokens = read('../../src/styles/tokens.css');
  for (const name of ['--dur-fast', '--dur-base', '--ease', '--radius-sm',
                      '--radius-md', '--radius-pill', '--radius-round', '--shadow-overlay']) {
    assert.ok(
      new RegExp(`^\\s*${name}\\s*:`, 'm').test(tokens),
      `${name} is referenced by the rules but not defined in tokens.css`
    );
  }
});

// The layout widths added 2026-07-28. Source-level, like the rules above:
// this asserts the token layer exists and is declared once, in tokens.css.
// Whether the rendered page honours it is the design guard's job.
test('layout width tokens are declared in tokens.css', () => {
  const src = read('../../src/styles/tokens.css');
  const required = ['--w-shell', '--w-wrap', '--w-rail-nav', '--w-rail-toc', '--w-measure', '--t-prose'];
  const missing = required.filter((t) => !new RegExp(`^\\s*${t}\\s*:`, 'm').test(src));
  assert.deepEqual(missing, [], `width tokens missing from tokens.css: ${missing.join(', ')}`);
});

// --t-prose is the whole point of the 2026-07-28 layout change: 16px until
// the column is wide enough to carry 18px, which is 1360px. Without the
// step, the widened column measures 82 characters and breaks the guard's
// own 78 ceiling. Asserted here so a future edit cannot quietly drop the
// media query and leave a token that never changes.
test('--t-prose steps up at the 1360px breakpoint', () => {
  const src = read('../../src/styles/tokens.css');
  const step = src.match(/@media\s*\(min-width:\s*1360px\)\s*\{[^}]*:root\s*\{[^}]*--t-prose\s*:\s*([^;]+);/);
  assert.ok(step, '--t-prose has no @media (min-width: 1360px) override in tokens.css');
  assert.match(step[1].trim(), /var\(--t-md\)/, `--t-prose must step to var(--t-md), got ${step[1].trim()}`);
});

// A vw-based clamp on the rails was designed and rejected: the shell caps at
// 1440px while vw keeps growing, so vw rails widen past the cap and the
// article column SHRINKS as the screen widens — measured 851px at 1440 down
// to 765px at 1728, pushing the measure to 79 characters. Guarded because
// clamp() is the intuitive thing to reach for here and it is wrong.
test('rail widths do not depend on the viewport', () => {
  const src = read('../../src/styles/tokens.css');
  for (const t of ['--w-rail-nav', '--w-rail-toc']) {
    const decl = src.match(new RegExp(`^\\s*${t}\\s*:\\s*([^;]+);`, 'm'));
    assert.ok(decl, `${t} not declared`);
    assert.doesNotMatch(decl[1], /vw|vmin|vmax|%/,
      `${t} must be a fixed length, not viewport-relative — got ${decl[1].trim()}`);
  }
});
