import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localizeHref, switchLocalePath, tr, DEFAULT_LOCALE, LOCALES } from '../../src/i18n/index.ts';

test('LOCALES and default', () => {
  assert.deepEqual([...LOCALES], ['en', 'zh']);
  assert.equal(DEFAULT_LOCALE, 'en');
});

test('localizeHref: en is identity, zh is prefixed', () => {
  assert.equal(localizeHref('/field-guide/the-loop', 'en'), '/field-guide/the-loop');
  assert.equal(localizeHref('/field-guide/the-loop', 'zh'), '/zh/field-guide/the-loop');
  assert.equal(localizeHref('/', 'en'), '/');
  assert.equal(localizeHref('/', 'zh'), '/zh');
});

test('switchLocalePath round-trips both directions', () => {
  assert.equal(switchLocalePath('/field-guide/prompts', 'zh'), '/zh/field-guide/prompts');
  assert.equal(switchLocalePath('/zh/field-guide/prompts', 'en'), '/field-guide/prompts');
  assert.equal(switchLocalePath('/', 'zh'), '/zh');
  assert.equal(switchLocalePath('/zh', 'en'), '/');
  assert.equal(switchLocalePath('/field-guide/zheng', 'zh'), '/zh/field-guide/zheng');
});

test('tr resolves a localized record', () => {
  assert.equal(tr({ en: 'Build', zh: '构建' }, 'en'), 'Build');
  assert.equal(tr({ en: 'Build', zh: '构建' }, 'zh'), '构建');
});
