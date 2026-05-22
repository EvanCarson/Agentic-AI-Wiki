// scripts/__tests__/verify-og.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractOgImage, expectedOgFor } from '../verify-og.mjs';

test('extractOgImage parses the og:image content from a head string', () => {
  const html = `<html><head><meta property="og:image" content="https://menuagentic.com/og/og-concepts.png"></head></html>`;
  assert.equal(extractOgImage(html), '/og/og-concepts.png');
});

test('expectedOgFor maps every section route → its PNG', () => {
  assert.equal(expectedOgFor('/field-guide/chapter-1/'),         '/og/og-field-guide.png');
  assert.equal(expectedOgFor('/zh/field-guide/chapter-1/'),      '/og/og-field-guide-zh.png');
  assert.equal(expectedOgFor('/concepts/'),                      '/og/og-concepts.png');
  assert.equal(expectedOgFor('/concepts/what-is-an-agent/'),     '/og/og-concepts.png');
  assert.equal(expectedOgFor('/zh/concepts/what-is-an-agent/'),  '/og/og-concepts-zh.png');
  assert.equal(expectedOgFor('/deep-dives/'),                    '/og/og-deep-dives.png');
  assert.equal(expectedOgFor('/deep-dives/memory/'),             '/og/og-deep-dives.png');
  assert.equal(expectedOgFor('/deep-dives/memory/episodic/'),    '/og/og-deep-dives.png');
  assert.equal(expectedOgFor('/playbooks/coding/'),              '/og/og-playbooks.png');
  assert.equal(expectedOgFor('/operations/observability/'),      '/og/og-operations.png');
  assert.equal(expectedOgFor('/changelog/'),                     '/og/og-changelog.png');
  assert.equal(expectedOgFor('/zh/changelog/'),                  '/og/og-changelog-zh.png');
  assert.equal(expectedOgFor('/'),                               '/og/og-default.png');
  assert.equal(expectedOgFor('/about/'),                         '/og/og-default.png');
  assert.equal(expectedOgFor('/zh/'),                            '/og/og-default-zh.png');
  assert.equal(expectedOgFor('/zh/about/'),                      '/og/og-default-zh.png');
  assert.equal(expectedOgFor('/404.html'),                       '/og/og-default.png');
});
