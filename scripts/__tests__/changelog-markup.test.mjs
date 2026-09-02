import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderChangelogItem } from '../../src/lib/changelog-markup.ts';

const en = s => renderChangelogItem(s, 'en');
const zh = s => renderChangelogItem(s, 'zh');

test('a code span naming a site page becomes a link', () => {
  assert.equal(
    en('New post `/blogs/afk-coding` today.'),
    'New post <a href="/blogs/afk-coding"><code>/blogs/afk-coding</code></a> today.',
  );
});

test('links are localized', () => {
  assert.equal(
    zh('新增 `/concepts/agent-memory`。'),
    '新增 <a href="/zh/concepts/agent-memory"><code>/concepts/agent-memory</code></a>。',
  );
});

test('a code span that is not a site page stays plain code', () => {
  assert.equal(en('Call `fs/read_text_file` first.'), 'Call <code>fs/read_text_file</code> first.');
  assert.equal(en('Set `npm run build`.'), 'Set <code>npm run build</code>.');
  // A path outside the content sections is not a page, so not a link.
  assert.equal(en('See `/about`.'), 'See <code>/about</code>.');
});

test('emphasis renders, and does not run into code spans', () => {
  assert.equal(en('New post — *The Meter Is the Product*.'), 'New post — <em>The Meter Is the Product</em>.');
  assert.equal(en('Glob `a*b*c` untouched.'), 'Glob <code>a*b*c</code> untouched.');
});

test('text after a closed code span is not given a stray backtick', () => {
  assert.equal(en('a `b` c'), 'a <code>b</code> c');
  assert.equal(en('`x` then `y` end'), '<code>x</code> then <code>y</code> end');
});

test('an unmatched backtick stays literal', () => {
  assert.equal(en('a `b'), 'a `b');
  assert.equal(en('50` of pipe'), '50` of pipe');
});

test('markup in the source cannot inject HTML', () => {
  assert.equal(
    en('<script>alert(1)</script> & "quotes"'),
    '&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;quotes&quot;',
  );
  // Even inside a code span, and even in the href position.
  assert.equal(en('`<img src=x onerror=y>`'), '<code>&lt;img src=x onerror=y&gt;</code>');
});

test('a path with a traversal or query is not treated as a page link', () => {
  assert.equal(en('`/blogs/../etc`'), '<code>/blogs/../etc</code>');
  assert.equal(en('`/blogs/x?a=1`'), '<code>/blogs/x?a=1</code>');
});

test('plain text passes through unchanged', () => {
  const s = 'Nothing special here, just prose about agents.';
  assert.equal(en(s), s);
});
