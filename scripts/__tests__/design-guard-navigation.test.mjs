import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The design guard measures rendered text (prose measure, contrast, label
// geometry), and those measurements are only stable once the webfonts have
// been applied — `load` does not wait for lazily-loaded font faces. Every
// navigation therefore goes through one goto() helper that awaits
// document.fonts.ready. This pins that: a page.goto() added anywhere else is
// the call site that flakes on a cold CI runner and nowhere locally.
//
// Comments are stripped before counting. The first version of this test
// counted a mention of page.goto() in a docblock as the helper's own call and
// went green while the helper was calling itself.
const stripComments = src => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

test('the design guard navigates only through its goto() helper, which awaits document.fonts.ready', () => {
  const src = stripComments(readFileSync(new URL('./design/system.mjs', import.meta.url), 'utf8'));
  const helper = /async function goto\(page, path\) \{[\s\S]*?\n\}/.exec(src)?.[0];
  assert.ok(helper, 'goto(page, path) helper is defined');
  assert.ok(helper.includes("page.goto(server.url + path, { waitUntil: 'load' })"), 'the helper performs the real navigation');
  assert.ok(helper.includes('document.fonts.ready'), 'the helper awaits the fonts');
  assert.ok(!/await goto\(/.test(helper), 'the helper does not call itself');
  const outside = src.replace(helper, '');
  assert.equal((outside.match(/page\.goto\(/g) || []).length, 0, 'no page.goto() outside the helper');
});
