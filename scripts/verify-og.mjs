// scripts/verify-og.mjs
// Walks dist/ and asserts every page's og:image matches its route. Also
// asserts twitter:card upgrade and zero references to the old vercel.app URL.
// Hard-fails the build on any drift.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');

export function extractOgImage(html) {
  const m = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
  if (!m) return null;
  // Strip the absolute host so the rest of the logic deals in paths.
  try {
    return new URL(m[1]).pathname;
  } catch {
    return m[1];
  }
}

function hasMeta(html, fragment) {
  return html.includes(fragment);
}

// Maps a URL pathname to the OG PNG it should reference.
//
// Locale prefix: `/zh/...` → suffix `-zh`. Anything else → no suffix.
// Section prefix: matched by the first non-locale segment.
export function expectedOgFor(pathname) {
  const noTrailing = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const parts = noTrailing.split('/').filter(Boolean); // ['zh','concepts',...] or ['concepts',...]
  const isZh = parts[0] === 'zh';
  const suffix = isZh ? '-zh' : '';
  const section = isZh ? parts[1] : parts[0];

  const MAP = {
    'field-guide': 'field-guide',
    concepts: 'concepts',
    'deep-dives': 'deep-dives',
    playbooks: 'playbooks',
    operations: 'operations',
    blogs: 'blog',
    changelog: 'changelog',
  };
  const slug = MAP[section] ?? 'default';
  return `/og/og-${slug}${suffix}.png`;
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = resolve(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function main() {
  const errors = [];
  let pages = 0;

  for (const file of walk(DIST)) {
    if (!file.endsWith('.html')) continue;
    pages++;
    const html = readFileSync(file, 'utf8');
    const rel = '/' + relative(DIST, file).replace(/index\.html$/, '');
    const route = rel === '/' ? '/' : (rel.endsWith('/') ? rel : rel + '/');

    // a) og:image mapping
    const actual = extractOgImage(html);
    const expected = expectedOgFor(route);
    if (actual !== expected) {
      errors.push(`${route}: og:image is ${actual ?? '(missing)'} — expected ${expected}`);
    }

    // b) twitter:card upgrade
    if (!hasMeta(html, '<meta name="twitter:card" content="summary_large_image"')) {
      errors.push(`${route}: twitter:card is not summary_large_image`);
    }

    // c) image dimensions + alt + twitter:image are all present
    for (const f of [
      '<meta property="og:image:width" content="1200"',
      '<meta property="og:image:height" content="630"',
      '<meta property="og:image:alt"',
      '<meta name="twitter:image"',
    ]) {
      if (!hasMeta(html, f)) errors.push(`${route}: missing ${f.replace(/<meta\s+/, '').slice(0, 60)}…`);
    }

    // d) zero stale-domain references — except the changelog, which legitimately
    // documents the URL migration in its entry text.
    const isChangelog = route === '/changelog/' || route === '/zh/changelog/';
    if (!isChangelog && html.includes('agentic-ai-wiki.vercel.app')) {
      errors.push(`${route}: leftover "agentic-ai-wiki.vercel.app" reference`);
    }
  }

  // e) sitemap + hreflang use the new domain.
  for (const file of walk(DIST)) {
    if (!/sitemap.*\.xml$/.test(file)) continue;
    const xml = readFileSync(file, 'utf8');
    if (xml.includes('agentic-ai-wiki.vercel.app')) {
      errors.push(`${relative(DIST, file)}: contains old domain`);
    }
    if (!xml.includes('menuagentic.com')) {
      errors.push(`${relative(DIST, file)}: missing menuagentic.com URLs`);
    }
  }

  if (errors.length) {
    console.error(`[verify-og] ${errors.length} error(s) across ${pages} pages:`);
    for (const e of errors) console.error('  ✗ ' + e);
    process.exit(1);
  }
  console.log(`[verify-og] OK — ${pages} pages checked`);
}

// CLI entry: only run main() when invoked directly (not when imported by tests).
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
