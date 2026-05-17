import { existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHAPTERS } from '../src/content/field-guide/manifest.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIN_BYTES = 200; // guards against truncated/partial extractions, not just empty
let failed = 0;
const fail = (msg) => { console.error(msg); failed++; };

const tooSmall = (path) => !existsSync(path) || statSync(path).size < MIN_BYTES;

if (CHAPTERS.length === 0) fail('MANIFEST regression: CHAPTERS is empty');

for (const ch of CHAPTERS) {
  const body = join(ROOT, 'src/content/field-guide', `${ch.page}.html`);
  const page = join(ROOT, 'dist/field-guide', ch.slug, 'index.html');
  if (tooSmall(body)) fail(`MISSING or too small body: ${ch.page}.html`);
  if (tooSmall(page)) fail(`MISSING or too small built page: /field-guide/${ch.slug}`);
}

if (tooSmall(join(ROOT, 'src/content/field-guide/intro.html'))) fail('MISSING or too small intro.html');

// Inverse check: every built /field-guide/<dir>/ must map back to a manifest slug
// (catches stale pages from renamed/removed chapters in an un-cleaned dist).
const distFg = join(ROOT, 'dist/field-guide');
if (existsSync(distFg)) {
  const slugs = new Set(CHAPTERS.map(c => c.slug));
  for (const entry of readdirSync(distFg, { withFileTypes: true })) {
    if (entry.isDirectory() && !slugs.has(entry.name)) {
      fail(`ORPHAN built page not in manifest: /field-guide/${entry.name}`);
    }
  }
}

if (failed) { console.error(`\n${failed} check(s) failed`); process.exit(1); }
console.log(`OK — all ${CHAPTERS.length} chapters present + built, intro present, no orphans`);
