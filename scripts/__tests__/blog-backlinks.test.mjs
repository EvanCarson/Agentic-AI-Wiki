import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeWikiPath,
  wikiLinksIn,
  buildBacklinkIndex,
} from '../../src/lib/blog-backlinks.ts';

test('normalizeWikiPath strips the zh prefix and any trailing slash', () => {
  assert.equal(normalizeWikiPath('/zh/concepts/agent-memory'), '/concepts/agent-memory');
  assert.equal(normalizeWikiPath('/concepts/agent-memory/'), '/concepts/agent-memory');
  assert.equal(normalizeWikiPath('/zh/concepts/agent-memory/'), '/concepts/agent-memory');
  // A section that merely starts with "zh" must not be mangled.
  assert.equal(normalizeWikiPath('/concepts/zhipu-models'), '/concepts/zhipu-models');
});

test('wikiLinksIn finds every cited section and deduplicates', () => {
  const html = `
    <p>See <a href="/concepts/the-agent-loop">the loop</a> and
       <a href="/deep-dives/agent-security/sandbox-and-isolation-patterns">sandboxes</a>.</p>
    <p>Again: <a href="/concepts/the-agent-loop">the loop</a>.</p>
    <p><a href="/playbooks/domain-playbooks/x">p</a>
       <a href="/operations/agentops/y">o</a>
       <a href="/field-guide/intro">f</a></p>`;
  assert.deepEqual(wikiLinksIn(html).sort(), [
    '/concepts/the-agent-loop',
    '/deep-dives/agent-security/sandbox-and-isolation-patterns',
    '/field-guide/intro',
    '/operations/agentops/y',
    '/playbooks/domain-playbooks/x',
  ]);
});

test('blog-to-blog and external links are not treated as wiki citations', () => {
  const html = `<a href="/blogs/other-post">sibling</a>
                <a href="https://example.com/concepts/x">external</a>
                <a href="/about">about</a>`;
  assert.deepEqual(wikiLinksIn(html), []);
});

test('fragment anchors and query strings do not fork a page into two keys', () => {
  const html = `<a href="/concepts/agent-memory">a</a>
                <a href="/concepts/agent-memory#long-term">b</a>`;
  // The anchored href is skipped by the [^"#?]* class rather than producing a
  // second key — the module must not list the same post twice for one page.
  assert.deepEqual(wikiLinksIn(html), ['/concepts/agent-memory']);
});

test('buildBacklinkIndex inverts both locales onto one key', () => {
  const index = buildBacklinkIndex({
    '../content/blogs/en/post-a.html': '<a href="/concepts/agent-memory">x</a>',
    '../content/blogs/zh/post-a.html': '<a href="/zh/concepts/agent-memory">x</a>',
    '../content/blogs/en/post-b.html': '<a href="/concepts/agent-memory">y</a>',
    '../content/blogs/zh/post-b.html': '<a href="/zh/concepts/prompt-injection-101">z</a>',
  });
  assert.deepEqual([...index.get('/concepts/agent-memory')].sort(), ['post-a', 'post-b']);
  assert.deepEqual([...index.get('/concepts/prompt-injection-101')], ['post-b']);
  assert.equal(index.get('/concepts/never-cited'), undefined);
});

test('a page cited twice by one post appears once', () => {
  const index = buildBacklinkIndex({
    '../content/blogs/en/post-a.html':
      '<a href="/concepts/x">1</a> <a href="/concepts/x/">2</a>',
    '../content/blogs/zh/post-a.html': '<a href="/zh/concepts/x">3</a>',
  });
  assert.deepEqual([...index.get('/concepts/x')], ['post-a']);
});
