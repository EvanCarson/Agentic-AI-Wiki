import { existsSync, statSync, readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CHAPTERS } from '../src/content/field-guide/manifest.ts';
// Note: blog posts are loaded via readdirSync + dynamic import below — the
// blog manifest uses Vite's `import.meta.glob` which isn't available in plain
// Node. Same workaround the per-section test files (playbooks, operations, blogs)
// already use.

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

// --- Blog: bilingual completeness + content-vs-dist parity ---
const blogPostsDir = join(ROOT, 'src/content/blogs/posts');
const blogEnDir    = join(ROOT, 'src/content/blogs/en');
const blogZhDir    = join(ROOT, 'src/content/blogs/zh');
const blogPostFiles = existsSync(blogPostsDir)
  ? readdirSync(blogPostsDir).filter(f => f.endsWith('.ts') && !f.startsWith('.'))
  : [];
const BLOG_POSTS = [];
for (const f of blogPostFiles) {
  const m = await import(pathToFileURL(join(blogPostsDir, f)).href);
  if (m.default) BLOG_POSTS.push(m.default);
}
for (const p of BLOG_POSTS) {
  if (tooSmall(join(blogEnDir, `${p.slug}.html`))) fail(`MISSING/too small blog en body: ${p.slug}.html`);
  if (tooSmall(join(blogZhDir, `${p.slug}.html`))) fail(`MISSING/too small blog zh body: ${p.slug}.html`);
}
for (const loc of ['en', 'zh']) {
  const base = join(ROOT, loc === 'en' ? 'dist/blogs' : `dist/${loc}/blogs`);
  if (!existsSync(base)) { if (loc === 'en') fail(`MISSING dist/blogs (${loc})`); continue; }
  for (const p of BLOG_POSTS) {
    if (tooSmall(join(base, p.slug, 'index.html'))) fail(`MISSING built ${loc} blog page: ${p.slug}`);
  }
}

if (failed) { console.error(`\n${failed} check(s) failed`); process.exit(1); }
