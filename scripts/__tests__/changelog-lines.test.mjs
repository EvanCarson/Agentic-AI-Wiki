import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linesFor, classifyLines, LINE_ORDER } from '../../src/lib/changelog-lines.ts';

const L = (en) => ({ en, zh: en });
const entry = (title, items, lines) => ({ date: '2026-10-27', title: L(title), items: items.map(L), lines });

test('linesFor: an explicit field wins, ordered and deduped', () => {
  assert.deepEqual(linesFor(entry('Anything', ['AI Blog: x'], ['hub', 'bl', 'co', 'bl'])), ['co', 'bl', 'hub']);
});

test('linesFor: falls back to the classifier when the field is missing or empty', () => {
  const e = entry('Two AI Blog posts, two new pages, and the evals primer rebuilt', [
    'AI Blog: "The allowlist and the shell disagreed"',
    'New Concept, Auto-Approval & Command Allowlists (A47): text',
    'New Deep-Dive, Memory Scopes & Tenancy (M14): text',
  ]);
  assert.deepEqual(linesFor(e), ['co', 'dd', 'bl']);
  assert.deepEqual(linesFor({ ...e, lines: [] }), ['co', 'dd', 'bl']);
});

test('classifyLines: bullet labels and site paths', () => {
  assert.deepEqual(classifyLines(entry('Batch', [
    'New Operation (AgentOps) — *Model Deprecation*. text',
    'New Playbook (Domain Playbooks) — *Email Agents*. text',
    'Added `/field-guide/llm-as-judge` cross-links',
  ])), ['fg', 'pb', 'op']);
  assert.deepEqual(classifyLines(entry('Last Mile adds Part IV on the career', ['Ch 15, Where FDEs Work'])), ['bk']);
  assert.deepEqual(classifyLines(entry('A runbook for kill switches', ['text'])), ['op']);
});

test('classifyLines: a change that names no section is site-wide (hub)', () => {
  assert.deepEqual(classifyLines(entry('Fonts are served from this site', ['Every page used to open with two preconnect hints'])), ['hub']);
});

test('LINE_ORDER lists every line once, hub last', () => {
  assert.equal(new Set(LINE_ORDER).size, 8);
  assert.equal(LINE_ORDER[LINE_ORDER.length - 1], 'hub');
});
