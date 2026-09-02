#!/usr/bin/env node
// Tell the IndexNow engines which pages this push changed.
//
//   node scripts/indexnow-submit.mjs --base <sha> --head <sha>   # changed pages
//   node scripts/indexnow-submit.mjs --all                       # the whole sitemap
//   ... --dry-run                                                # print, submit nothing
//
// Runs after the build on pushes to main; see .github/workflows/ci.yml.
// The key is public by design — the protocol requires the file to be fetchable
// at the site root, which is what proves the submitter controls the host.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fieldGuidePageMap, sitemapUrls, urlsForChangedFiles } from './lib/indexnow.mjs';

const HOST = 'menuagentic.com';
const KEY = 'f9b0fb2466040cea7230050ff5d8dcfb';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000; // protocol limit per request

const argv = process.argv.slice(2);
const flag = name => argv.includes(`--${name}`);
const value = name => { const i = argv.indexOf(`--${name}`); return i === -1 ? null : argv[i + 1]; };

const urls = readdirSync('dist')
  .filter(f => /^sitemap.*\.xml$/.test(f) && f !== 'sitemap-index.xml')
  .flatMap(f => sitemapUrls(readFileSync(join('dist', f), 'utf8')));

if (urls.length === 0) {
  console.error('indexnow: no sitemap in dist/ — run `npm run build` first');
  process.exit(1);
}

let submit;
if (flag('all')) {
  submit = urls;
  console.log(`indexnow: submitting the whole sitemap (${submit.length} URLs)`);
} else {
  const base = value('base');
  const head = value('head') ?? 'HEAD';
  if (!base) {
    console.error('indexnow: pass --base <sha> [--head <sha>], or --all');
    process.exit(1);
  }
  let changed = [];
  try {
    changed = execFileSync('git', ['diff', '--name-only', `${base}..${head}`], { encoding: 'utf8' })
      .split('\n').map(s => s.trim()).filter(Boolean);
  } catch {
    // A force-push or a shallow clone can leave `base` unreachable. Publishing
    // nothing is the right failure here: the next content push submits anyway.
    console.log('indexnow: cannot diff that range (shallow clone or rewritten history); nothing submitted');
    process.exit(0);
  }
  const fgPages = fieldGuidePageMap(readFileSync('src/content/field-guide/manifest.ts', 'utf8'));
  submit = urlsForChangedFiles(changed, urls, fgPages);
  console.log(`indexnow: ${changed.length} changed files map to ${submit.length} URLs`);
}

if (submit.length === 0) {
  console.log('indexnow: no page content changed; nothing to submit');
  process.exit(0);
}
for (const u of submit.slice(0, 20)) console.log(`  ${u}`);
if (submit.length > 20) console.log(`  … and ${submit.length - 20} more`);

if (flag('dry-run')) {
  console.log('indexnow: --dry-run, nothing submitted');
  process.exit(0);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: submit.slice(0, MAX_URLS),
};

let res;
try {
  res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
} catch (err) {
  // Their outage is not our defect, and this runs after the merge anyway.
  console.log(`indexnow: submission failed to reach the endpoint (${err.message}); not treating as an error`);
  process.exit(0);
}

// 200 accepted, 202 accepted pending key validation. 429 is rate limiting —
// theirs to apply, ours to shrug at. 400/403/422 mean this script or the key
// file is wrong, which is a defect worth failing on.
if (res.status === 200 || res.status === 202) {
  console.log(`indexnow: ${res.status} — ${submit.length} URLs accepted`);
  process.exit(0);
}
if (res.status === 429) {
  console.log('indexnow: 429 rate limited; nothing to fix here');
  process.exit(0);
}
console.error(`indexnow: ${res.status} ${res.statusText} — ${(await res.text()).slice(0, 300)}`);
console.error('400 invalid format · 403 key not found at keyLocation · 422 URL/host mismatch');
process.exit(1);
