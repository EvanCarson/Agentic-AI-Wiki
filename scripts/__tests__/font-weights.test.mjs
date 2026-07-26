// scripts/__tests__/font-weights.test.mjs
//
// Every declared font-weight must actually be loaded for the family it is
// declared against.
//
// This drifted silently once already: the weights were inherited from
// Fraunces (loaded at 300/400/600) and survived the swap to Space Grotesk
// (500/600/700), because the typography conversion mapped font-size,
// line-height and font-family but never font-weight. Seventeen rules ended
// up asking for a face that does not exist. Nothing broke visually — the
// CSS font-matching algorithm silently substitutes the nearest available
// weight — which is exactly why it went unnoticed, and exactly why it is
// fragile: dropping a weight from the font link would shift headings
// site-wide with no error anywhere.
//
// Source-level on purpose. This is about the CSS agreeing with the font
// link; the rendered result is already covered by the design guard.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');

const BASE_LAYOUT = read('../../src/layouts/BaseLayout.astro');
const SOURCES = [
  ['src/styles/guide.css', read('../../src/styles/guide.css')],
  ['src/styles/site.css', read('../../src/styles/site.css')],
  ['src/layouts/BlogLayout.astro', read('../../src/layouts/BlogLayout.astro')],
  ['src/components/BlogCard.astro', read('../../src/components/BlogCard.astro')],
];

/** Parse the Google Fonts link into { family -> Set(weights) }. */
function loadedWeights(html) {
  const href = (html.match(/href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"/) || [])[1];
  assert.ok(href, 'could not find the Google Fonts <link> in BaseLayout.astro');
  const out = {};
  // Split on [?&], not '&' — the first family= rides on the query start
  // (…/css2?family=Space+Grotesk…), so splitting on '&' alone silently
  // drops it and the whole check passes while ignoring that family.
  for (const fam of href.split(/[?&]/).filter((p) => p.startsWith('family='))) {
    const [name, spec = ''] = decodeURIComponent(fam.slice('family='.length).replace(/\+/g, ' ')).split(':');
    const weights = new Set();
    // `wght@400;500` or the italic tuple form `ital,wght@0,400;1,400`
    for (const tuple of (spec.split('@')[1] || '').split(';')) {
      const n = Number(tuple.split(',').pop());
      if (Number.isFinite(n) && n >= 100) weights.add(n);
    }
    if (weights.size) out[name] = weights;
  }
  return out;
}

/** Map the CSS custom property back to the family it resolves to. */
const TOKEN_FAMILY = {
  '--font-display': 'Space Grotesk',
  '--font-body': 'Inter',
  '--font-mono': 'JetBrains Mono',
};

test('every declared font-weight is loaded for its family', () => {
  const loaded = loadedWeights(BASE_LAYOUT);
  for (const family of Object.values(TOKEN_FAMILY)) {
    assert.ok(loaded[family], `${family} is not requested in the font link at all`);
  }

  const offenders = [];
  for (const [path, src] of SOURCES) {
    // Walk declaration blocks; only blocks that set BOTH family and weight
    // can be checked statically — an inherited family is not knowable here.
    for (const m of src.matchAll(/\{([^{}]*?)\}/g)) {
      const body = m.group ? m.group(1) : m[1];
      const fam = (body.match(/font-family:\s*var\((--font-[a-z]+)\)/) || [])[1];
      const wRaw = (body.match(/font-weight:\s*(\d+)/) || [])[1];
      if (!fam || !wRaw) continue;
      const family = TOKEN_FAMILY[fam];
      if (!family) continue;
      const weight = Number(wRaw);
      if (!loaded[family].has(weight)) {
        offenders.push(
          `${path}: ${fam} (${family}) declared at ${weight}, ` +
          `loaded: ${[...loaded[family]].sort((a, b) => a - b).join('/')}`,
        );
      }
    }
  }

  assert.deepEqual(offenders, [],
    `declared weights with no matching loaded face:\n  ${offenders.join('\n  ')}`);
});
