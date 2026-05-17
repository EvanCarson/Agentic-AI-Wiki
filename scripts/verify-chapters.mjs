import { existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHAPTERS } from '../src/content/field-guide/manifest.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;

for (const ch of CHAPTERS) {
  const body = join(ROOT, 'src/content/field-guide', `${ch.page}.html`);
  const page = join(ROOT, 'dist/field-guide', ch.slug, 'index.html');
  if (!existsSync(body) || statSync(body).size === 0) { console.error(`MISSING body: ${ch.page}.html`); failed++; }
  if (!existsSync(page) || statSync(page).size === 0) { console.error(`MISSING built page: /field-guide/${ch.slug}`); failed++; }
}
if (existsSync(join(ROOT, 'src/content/field-guide/intro.html')) === false) { console.error('MISSING intro.html'); failed++; }

if (failed) { console.error(`\n${failed} check(s) failed`); process.exit(1); }
console.log(`OK — all ${CHAPTERS.length} chapters present + built, intro present`);
