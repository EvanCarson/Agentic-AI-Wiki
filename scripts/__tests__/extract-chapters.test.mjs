import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractPages } from '../extract-chapters.mjs';

const SAMPLE = `<!DOCTYPE html><html><body>
<div class="page active" data-page="intro"><h1>Intro Body</h1></div>
<div class="page" data-page="f1"><section><h2>LLM</h2></section></div>
<div class="page" data-page="r1"><p>Frontier</p></div>
<script>const x=1;</script>
</body></html>`;

test('extracts one entry per data-page block', () => {
  const pages = extractPages(SAMPLE);
  assert.equal(pages.length, 3);
});

test('keys by data-page id and preserves inner HTML verbatim', () => {
  const pages = extractPages(SAMPLE);
  const f1 = pages.find(p => p.page === 'f1');
  assert.ok(f1);
  assert.equal(f1.html.trim(), '<section><h2>LLM</h2></section>');
});

test('does not include the trailing script block as a page', () => {
  const pages = extractPages(SAMPLE);
  assert.ok(!pages.some(p => p.html.includes('const x=1')));
});

test('strips the dead legacy .page-nav block from a page body', () => {
  const sample = `<div class="page" data-page="z1"><p>keep me</p><div class="page-nav"><button onclick="goPage('x')">dead</button></div></div>`;
  const pages = extractPages(sample);
  const z1 = pages.find(p => p.page === 'z1');
  assert.ok(z1);
  assert.ok(z1.html.includes('keep me'));
  assert.ok(!z1.html.includes('page-nav'));
  assert.ok(!z1.html.includes('goPage'));
});
