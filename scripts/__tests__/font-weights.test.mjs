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
// Source-level on purpose. This is about the CSS agreeing with the faces that
// are actually loaded; the rendered result is already covered by the design
// guard.
//
// The source of truth moved when fonts were self-hosted: it used to parse the
// Google Fonts <link> in BaseLayout, and now parses the @font-face blocks in
// src/styles/fonts.css. Same assertion, same failure it is guarding against —
// a weight declared in CSS with no matching face loaded, which the font-matching
// algorithm silently paints in the nearest available weight instead.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), 'utf8');

const FONTS_CSS = read('../../src/styles/fonts.css');
const SOURCES = [
  ['src/styles/guide.css', read('../../src/styles/guide.css')],
  ['src/styles/site.css', read('../../src/styles/site.css')],
  ['src/layouts/BlogLayout.astro', read('../../src/layouts/BlogLayout.astro')],
  ['src/components/BlogCard.astro', read('../../src/components/BlogCard.astro')],
];

/** Parse the self-hosted @font-face blocks into { family -> Set(weights) }. */
function loadedWeights(css) {
  const out = {};
  const faces = css.match(/@font-face\s*\{[^}]*\}/g) || [];
  assert.ok(faces.length, 'no @font-face blocks found in src/styles/fonts.css');
  for (const face of faces) {
    const name = (face.match(/font-family:\s*'([^']+)'/) || [])[1];
    const weight = Number((face.match(/font-weight:\s*(\d+)/) || [])[1]);
    if (!name || !Number.isFinite(weight)) continue;
    (out[name] ??= new Set()).add(weight);
  }
  return out;
}

/** Every face must resolve to a file that exists under public/. */
function facesResolve(css) {
  const missing = [];
  for (const m of css.matchAll(/url\('([^']+)'\)/g)) {
    const rel = m[1].replace(/^\//, '');
    if (!existsSync(fileURLToPath(new URL('../../public/' + rel, import.meta.url)))) missing.push(m[1]);
  }
  return missing;
}

/** Map the CSS custom property back to the family it resolves to. */
const TOKEN_FAMILY = {
  '--font-display': 'Space Grotesk',
  '--font-body': 'Inter',
  '--font-mono': 'JetBrains Mono',
};

test('every declared font-weight is loaded for its family', () => {
  const loaded = loadedWeights(FONTS_CSS);
  for (const family of Object.values(TOKEN_FAMILY)) {
    assert.ok(loaded[family], `${family} has no @font-face block at all`);
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

test('every @font-face points at a file that exists', () => {
  assert.deepEqual(facesResolve(FONTS_CSS), [],
    'these @font-face src files are missing from public/');
});

test('no stylesheet or font is fetched from a third-party font host', () => {
  const layout = read('../../src/layouts/BaseLayout.astro');
  // Matches the host only inside an attribute value. A bare mention in prose
  // is not a request, and the comment above the preloads names both hosts to
  // explain what was removed — a check that cannot tell a link from a comment
  // fails on its own documentation.
  const referenced = [...layout.matchAll(/(?:href|src)="https:\/\/fonts\.(googleapis|gstatic)\.com[^"]*"/g)]
    .map(m => m[0]);
  assert.deepEqual(referenced, [],
    'BaseLayout fetches from a Google font host — was self-hosting reverted?');
});
