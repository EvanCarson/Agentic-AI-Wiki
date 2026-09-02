import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { slugForChangedFile, fieldGuidePageMap, sitemapUrls, urlsForChangedFiles } from '../lib/indexnow.mjs';

const URLS = [
  'https://menuagentic.com/concepts/agent-memory/',
  'https://menuagentic.com/zh/concepts/agent-memory/',
  'https://menuagentic.com/concepts/agent-memory-and-state/',
  'https://menuagentic.com/deep-dives/agent-security/red-teaming-agents/',
  'https://menuagentic.com/zh/deep-dives/agent-security/red-teaming-agents/',
  'https://menuagentic.com/blogs/some-post/',
  'https://menuagentic.com/zh/blogs/some-post/',
  'https://menuagentic.com/field-guide/llm-mental-model/',
  'https://menuagentic.com/zh/field-guide/llm-mental-model/',
  'https://menuagentic.com/concepts/',
];

test('a fragment, in either locale, maps to its slug', () => {
  assert.equal(slugForChangedFile('src/content/concepts/en/agent-memory.html'), 'agent-memory');
  assert.equal(slugForChangedFile('src/content/concepts/zh/agent-memory.html'), 'agent-memory');
  assert.equal(slugForChangedFile('src/content/deep-dives/en/red-teaming-agents.html'), 'red-teaming-agents');
});

test("a blog post's dated metadata file maps to the slug, without the date", () => {
  assert.equal(slugForChangedFile('src/content/blogs/posts/2026-09-02-some-post.ts'), 'some-post');
});

test('a Field Guide fragment is named by page id, so it resolves through the manifest', () => {
  const pages = fieldGuidePageMap("{ page: 'f1', slug: 'llm-mental-model', num: '01' },");
  assert.equal(slugForChangedFile('src/content/field-guide/en/f1.html', pages), 'llm-mental-model');
  // Without the map there is nothing to resolve, and guessing would submit a 404.
  assert.equal(slugForChangedFile('src/content/field-guide/en/f1.html'), null);
});

test('the real Field Guide manifest parses to a complete page map', () => {
  const pages = fieldGuidePageMap(readFileSync(new URL('../../src/content/field-guide/manifest.ts', import.meta.url), 'utf8'));
  assert.ok(pages.size >= 26, `expected every chapter, got ${pages.size}`);
  assert.equal(pages.get('f1'), 'llm-mental-model');
});

test('files that are not page content map to nothing', () => {
  for (const p of [
    'src/styles/site.css',
    'src/layouts/BlogLayout.astro',
    'src/content/changelog/entries/2026-09-02-x.ts',
    'public/blogs/some-post/diagram.svg',
    'README.md',
  ]) assert.equal(slugForChangedFile(p), null, p);
});

test('a changed fragment submits every locale that publishes it, and nothing else', () => {
  const got = urlsForChangedFiles(['src/content/concepts/en/agent-memory.html'], URLS);
  assert.deepEqual(got, [
    'https://menuagentic.com/concepts/agent-memory/',
    'https://menuagentic.com/zh/concepts/agent-memory/',
  ]);
});

test('a slug never matches a longer slug that merely starts with it', () => {
  const got = urlsForChangedFiles(['src/content/concepts/en/agent-memory.html'], URLS);
  assert.ok(!got.includes('https://menuagentic.com/concepts/agent-memory-and-state/'));
});

test('a grouped section keeps its group segment, which only the sitemap knows', () => {
  const got = urlsForChangedFiles(['src/content/deep-dives/zh/red-teaming-agents.html'], URLS);
  assert.deepEqual(got, [
    'https://menuagentic.com/deep-dives/agent-security/red-teaming-agents/',
    'https://menuagentic.com/zh/deep-dives/agent-security/red-teaming-agents/',
  ]);
});

test('a push that touches no page content submits nothing', () => {
  assert.deepEqual(urlsForChangedFiles(['src/styles/site.css', 'README.md'], URLS), []);
});

test('both locales of the same page collapse to one submission set', () => {
  const both = ['src/content/blogs/en/some-post.html', 'src/content/blogs/zh/some-post.html'];
  assert.deepEqual(urlsForChangedFiles(both, URLS), [
    'https://menuagentic.com/blogs/some-post/',
    'https://menuagentic.com/zh/blogs/some-post/',
  ]);
});

test('sitemapUrls reads every loc', () => {
  const xml = '<urlset><url><loc>https://a/</loc></url><url><loc>https://b/</loc></url></urlset>';
  assert.deepEqual(sitemapUrls(xml), ['https://a/', 'https://b/']);
});

test('the key file is present, and its contents are exactly the key the script sends', () => {
  const script = readFileSync(new URL('../indexnow-submit.mjs', import.meta.url), 'utf8');
  const key = /const KEY = '([^']+)'/.exec(script)[1];
  assert.match(key, /^[A-Za-z0-9-]{8,128}$/, 'protocol allows a-z A-Z 0-9 and dashes, 8-128 chars');
  const file = readFileSync(new URL(`../../public/${key}.txt`, import.meta.url), 'utf8');
  assert.equal(file.trim(), key, 'the hosted file must contain the key and nothing else');
});
