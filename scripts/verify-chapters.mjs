import { existsSync, statSync, readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHAPTERS } from '../src/content/field-guide/manifest.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIN_BYTES = 200;
let failed = 0;
const fail = (m) => { console.error(m); failed++; };
const tooSmall = (p) => !existsSync(p) || statSync(p).size < MIN_BYTES;
const codeBlocks = (html) => (html.match(/<pre[\s\S]*?<\/pre>/g) || []);

if (CHAPTERS.length === 0) fail('MANIFEST regression: CHAPTERS is empty');

for (const ch of CHAPTERS) {
  if (tooSmall(join(ROOT, 'src/content/field-guide/en', `${ch.page}.html`)))
    fail(`MISSING/too small en body: ${ch.page}.html`);
}
if (tooSmall(join(ROOT, 'src/content/field-guide/en/intro.html'))) fail('MISSING en intro.html');

const distFg = (loc) => join(ROOT, loc === 'en' ? 'dist/field-guide' : `dist/${loc}/field-guide`);
for (const loc of ['en', 'zh']) {
  const dir = distFg(loc);
  if (!existsSync(dir)) { if (loc === 'en') fail('MISSING dist/field-guide (en)'); continue; }
  const slugs = new Set(CHAPTERS.map(c => c.slug));
  for (const ch of CHAPTERS)
    if (tooSmall(join(dir, ch.slug, 'index.html'))) fail(`MISSING built ${loc} page: ${ch.slug}`);
  for (const e of readdirSync(dir, { withFileTypes: true }))
    if (e.isDirectory() && !slugs.has(e.name)) fail(`ORPHAN ${loc} page: ${e.name}`);
}

const zhDir = join(ROOT, 'src/content/field-guide/zh');
const zhFiles = existsSync(zhDir) ? readdirSync(zhDir).filter(f => f.endsWith('.html')) : [];
const zhMode = zhFiles.length > 0;
if (zhMode) {
  const need = [...CHAPTERS.map(c => c.page), 'intro'];
  for (const page of need) {
    const en = join(ROOT, 'src/content/field-guide/en', `${page}.html`);
    const zh = join(zhDir, `${page}.html`);
    if (tooSmall(zh)) { fail(`MISSING/too small zh body: ${page}.html`); continue; }
    const enC = codeBlocks(readFileSync(en, 'utf8'));
    const zhC = codeBlocks(readFileSync(zh, 'utf8'));
    if (enC.length !== zhC.length || enC.some((b, i) => b !== zhC[i]))
      fail(`CODE-BLOCK MISMATCH en/zh in ${page}.html (en ${enC.length} vs zh ${zhC.length} blocks)`);
  }
  const complete = [...CHAPTERS.map(c => c.page), 'intro'].every(p => !tooSmall(join(zhDir, `${p}.html`)));
  if (failed === 0)
    console.log(complete
      ? `OK — bilingual complete: ${CHAPTERS.length} chapters + intro per locale, code blocks identical, no orphans`
      : `OK (infra mode) — en complete; zh in progress (${zhFiles.length}/${CHAPTERS.length + 1} bodies)`);
} else if (failed === 0) {
  console.log(`OK (infra mode) — en complete; zh not started`);
}

if (failed) { console.error(`\n${failed} check(s) failed`); process.exit(1); }
