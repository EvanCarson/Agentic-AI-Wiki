// scripts/__tests__/copy-button.smoke.test.mjs
//
// Source-string smoke test for the code-block copy button (issue #35).
// We do not run the script in a DOM here (deferred per spec); we assert
// the inline script + CSS contain the load-bearing hooks so future edits
// can't silently strip the feature.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const baseLayout = readFileSync(
  fileURLToPath(new URL('../../src/layouts/BaseLayout.astro', import.meta.url)),
  'utf8',
);
const guideCss = readFileSync(
  fileURLToPath(new URL('../../src/styles/guide.css', import.meta.url)),
  'utf8',
);

test('BaseLayout: code-copy script is present and uses is:inline', () => {
  assert.match(baseLayout, /<script is:inline>[\s\S]*pre\.standalone[\s\S]*<\/script>/,
    'inline copy-button script is missing or no longer is:inline');
});

test('BaseLayout: code-copy script wires navigator.clipboard.writeText', () => {
  assert.match(baseLayout, /navigator\.clipboard\.writeText/,
    'expected navigator.clipboard.writeText call in BaseLayout script');
});

test('BaseLayout: code-copy script reads document.documentElement.lang', () => {
  assert.match(baseLayout, /document\.documentElement\.lang/,
    'expected bilingual lang lookup in BaseLayout script');
});

test('BaseLayout: code-copy script guards re-runs via data-copy-ready', () => {
  assert.match(baseLayout, /data-copy-ready|dataset\.copyReady/,
    'expected idempotency guard via data-copy-ready');
});

test('guide.css: code-copy CSS rules are present', () => {
  for (const sel of ['.pre-wrap', '.copy-btn', '.copy-btn:hover', '.copy-btn.copied', '.lang-badge']) {
    assert.ok(guideCss.includes(sel), `guide.css is missing selector ${sel}`);
  }
});

test('guide.css: prefers-reduced-motion override is present', () => {
  assert.match(guideCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.copy-btn[\s\S]*transition:\s*none/,
    'expected prefers-reduced-motion override disabling .copy-btn transition');
});
