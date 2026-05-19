// Search-index integration test for the Pagefind site search.
//
// The default `npm test` runs BEFORE the Pagefind index is generated
// (the gate order is build -> verify -> test, and `npm run build` is just
// `astro build`). So when the index is absent these tests SKIP rather than
// fail — keeping the existing gate green and unaffected. They run for real
// via `npm run test:search`, after `npm run build:search`/`search:index`
// has produced `dist/pagefind/` (this is wired into the prod build in
// vercel.json, so a search regression fails the production build).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const pfDir = `${root}dist/pagefind`;
const entryPath = `${pfDir}/pagefind-entry.json`;
const indexBuilt = existsSync(entryPath);
const skip = indexBuilt ? false : 'search index not built — run `npm run build:search` first';

test('Pagefind index exists with both locales indexed', { skip }, () => {
  const entry = JSON.parse(readFileSync(entryPath, 'utf8'));
  const langs = entry.languages ?? {};
  // en and zh must each have their own index so a query on a page returns
  // same-locale results (regression guard for the bilingual setup).
  assert.ok(langs.en, 'expected an "en" language index');
  assert.ok(langs['zh-hans'], 'expected a "zh-hans" language index');
});

test('both locales index a sane, equal number of pages', { skip }, () => {
  const { languages } = JSON.parse(readFileSync(entryPath, 'utf8'));
  const en = languages.en.page_count;
  const zh = languages['zh-hans'].page_count;
  // Floor catches the realistic regression: `data-pagefind-body` removed or
  // the body tag broken collapses the count toward zero.
  assert.ok(en > 100, `en page_count too low (${en}) — is data-pagefind-body set on <main>?`);
  assert.ok(zh > 100, `zh-hans page_count too low (${zh})`);
  // The site mirrors every page in both locales; the index must too.
  assert.equal(en, zh, `bilingual index parity broken: en=${en} vs zh-hans=${zh}`);
});

test('Pagefind runtime + UI assets the header lazy-loads are emitted', { skip }, () => {
  for (const f of ['pagefind.js', 'pagefind-ui.js', 'pagefind-ui.css']) {
    assert.ok(existsSync(`${pfDir}/${f}`), `missing dist/pagefind/${f} — SiteSearch.astro loads it on demand`);
  }
  // Per-page fragments are what a query resolves to; an empty dir means
  // nothing is searchable even though the entry file exists.
  const fragments = readdirSync(`${pfDir}/fragment`);
  assert.ok(fragments.length > 100, `too few indexed fragments (${fragments.length})`);
});
