// Asserts every internal <a href> in built dist/ resolves to a real file.
// Internal = href starts with "/" and does not start with "//". Ignores
// hash-only links, javascript:, mailto:, tel:, and absolute http(s).
//
// Wired into `npm run verify` so URL drift cannot ship.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const DIST = resolve('dist');
if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first');
  process.exit(2);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (name.endsWith('.html')) yield p;
  }
}

function targetExists(href) {
  const clean = href.replace(/[?#].*$/, '');
  if (!clean.startsWith('/') || clean.startsWith('//')) return true;
  const base = join(DIST, clean.replace(/^\/+/, ''));
  if (existsSync(base) && statSync(base).isFile()) return true;
  if (existsSync(base + '.html')) return true;
  if (existsSync(join(base, 'index.html'))) return true;
  return false;
}

const broken = [];
let scanned = 0;
for (const f of walk(DIST)) {
  const html = readFileSync(f, 'utf8');
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const h of hrefs) {
    if (/^(mailto:|tel:|javascript:|https?:|#)/i.test(h)) continue;
    scanned++;
    if (!targetExists(h)) broken.push({ file: relative(process.cwd(), f), href: h });
  }
}
if (broken.length) {
  console.error(`Broken internal links (${broken.length} of ${scanned} scanned):`);
  for (const b of broken) console.error(`  ${b.file}  →  ${b.href}`);
  process.exit(1);
}
console.log(`OK — ${scanned} internal links resolve.`);
