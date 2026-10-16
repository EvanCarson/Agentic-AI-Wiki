import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chapterLinksIn, buildChapterBacklinks } from '../../src/lib/book-backlinks.ts';

test('chapterLinksIn: finds same-book chapter links in either locale, deduplicated', () => {
  const html = `<a href="/books/b/one/">x</a> <a href="/zh/books/b/two">y</a> <a href="/books/b/one/#s">z</a>`;
  assert.deepEqual(chapterLinksIn(html, 'b').sort(), ['one', 'two']);
});

test('chapterLinksIn: ignores other books, the landing page, and non-book links', () => {
  const html = `<a href="/books/other/one/">x</a> <a href="/books/b/">land</a> <a href="/concepts/x/">c</a>`;
  assert.deepEqual(chapterLinksIn(html, 'b'), []);
});

test('buildChapterBacklinks: inverts links, folds locales, drops self-links', () => {
  const idx = buildChapterBacklinks({
    '../content/books/b/en/one.html': '<a href="/books/b/two/">t</a><a href="/books/b/one/">self</a>',
    '../content/books/b/zh/one.html': '<a href="/zh/books/b/two/">t</a>',
    '../content/books/b/en/three.html': '<a href="/books/b/two/">t</a>',
  }, 'b');
  assert.deepEqual([...(idx.get('two') ?? [])].sort(), ['one', 'three']);
  assert.equal(idx.get('one'), undefined);
});
