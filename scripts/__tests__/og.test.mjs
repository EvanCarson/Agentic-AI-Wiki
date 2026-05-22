// scripts/__tests__/og.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { OG_SECTIONS } from '../../src/content/og.ts';
import { ogImageFor, ogImageBasename } from '../../src/lib/og.ts';
import { ui } from '../../src/i18n/ui.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const LOCALES = /** @type {const} */ (['en', 'zh']);

test('every non-default section has matching ui.nav entries in en+zh', () => {
  for (const s of OG_SECTIONS) {
    if (s.key === 'default') continue;
    for (const locale of LOCALES) {
      const name = /** @type {any} */ (ui)[locale].nav[s.key];
      assert.ok(
        typeof name === 'string' && name.length > 0,
        `ui.${locale}.nav.${s.key} must be a non-empty string`,
      );
    }
  }
});

test('default section has bilingual name in the catalog itself', () => {
  const def = OG_SECTIONS.find((s) => s.key === 'default');
  assert.ok(def?.name?.en && def?.name?.zh, 'default needs name.en and name.zh');
});

test('ogImageFor returns /og/og-<slug>(-zh).png for every (section, locale) pair', () => {
  for (const s of OG_SECTIONS) {
    for (const locale of LOCALES) {
      const path = ogImageFor(s.key, locale);
      assert.match(path, /^\/og\/og-[a-z-]+(-zh)?\.png$/);
      assert.equal(path.endsWith('-zh.png'), locale === 'zh');
    }
  }
});

test('ui.<locale>.og.tagline is a non-empty string', () => {
  for (const locale of LOCALES) {
    const t = /** @type {any} */ (ui)[locale].og?.tagline;
    assert.ok(typeof t === 'string' && t.length > 0,
      `ui.${locale}.og.tagline must exist and be non-empty`);
  }
});

test('every (key, locale) pair has a committed PNG under public/og/', () => {
  const ogDir = resolve(ROOT, 'public', 'og');
  if (!existsSync(ogDir)) {
    // Bootstrapping: the directory hasn't been generated yet. Skip gracefully
    // so this test can be written before the PNGs exist; the verify-og step
    // (separate test) covers the deployed assertion.
    return;
  }
  for (const s of OG_SECTIONS) {
    for (const locale of LOCALES) {
      const file = resolve(ogDir, ogImageBasename(s.key, locale));
      assert.ok(existsSync(file), `expected ${file} to exist`);
    }
  }
});

test('no orphan PNGs under public/og/', () => {
  const ogDir = resolve(ROOT, 'public', 'og');
  if (!existsSync(ogDir)) return;
  const expected = new Set(
    OG_SECTIONS.flatMap((s) => LOCALES.map((l) => ogImageBasename(s.key, l))),
  );
  for (const f of readdirSync(ogDir)) {
    if (f === '.DS_Store') continue;
    assert.ok(expected.has(f), `orphan PNG: public/og/${f}`);
  }
});
