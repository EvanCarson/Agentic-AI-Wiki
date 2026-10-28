// The About page's departures board (src/lib/batches.ts). Pure helpers only:
// loadBatches() talks to GitHub, and these tests must never hit the network.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  lineForPath, stopsFromFiles, rebuiltFromTitle, batchesFromChangelog, selectBatchPulls, rowFromPull,
} from '../../src/lib/batches.ts';

test('lineForPath: section content maps to its line; tooling, changelog and i18n do not', () => {
  assert.equal(lineForPath('src/content/concepts/en/dry-run-and-preview.html'), 'co');
  assert.equal(lineForPath('src/content/deep-dives/groups/memory-and-context.ts'), 'dd');
  assert.equal(lineForPath('src/content/playbooks/zh/sandboxing-and-execution.html'), 'pb');
  assert.equal(lineForPath('src/content/operations/manifest.ts'), 'op');
  assert.equal(lineForPath('src/content/field-guide/en/llm-as-judge.html'), 'fg');
  assert.equal(lineForPath('src/content/books/last-mile/en/ch01.html'), 'bk');
  assert.equal(lineForPath('src/content/blogs/posts/2026-10-27-x.ts'), 'bl');
  assert.equal(lineForPath('public/blogs/x/arch.svg'), 'bl');
  assert.equal(lineForPath('src/content/changelog/entries/2026-10-27-x.ts'), null);
  assert.equal(lineForPath('src/i18n/ui.ts'), null);
  assert.equal(lineForPath('scripts/__tests__/blogs.test.mjs'), null);
});

// The real file list of PR #269, trimmed.
const PR_269 = [
  ['added', 'public/blogs/the-second-phase-is-the-benchmark/data-file-f1-scores.svg'],
  ['added', 'src/content/blogs/en/the-second-phase-is-the-benchmark.html'],
  ['added', 'src/content/blogs/posts/2026-10-27-the-second-phase-is-the-benchmark.ts'],
  ['added', 'src/content/blogs/posts/2026-10-27-the-write-was-the-cheapest-road-to-a-read.ts'],
  ['added', 'src/content/changelog/entries/2026-10-27-sandboxes-traces-and-true-negatives.ts'],
  ['added', 'src/content/concepts/en/dry-run-and-preview.html'],
  ['modified', 'src/content/concepts/manifest.ts'],
  ['added', 'src/content/deep-dives/en/training-on-your-own-traces.html'],
  ['modified', 'src/content/playbooks/en/sandboxing-and-execution.html'],
].map(([status, filename]) => ({ status, filename }));

test('stopsFromFiles: blog first with its post count, then nav order', () => {
  assert.deepEqual(stopsFromFiles(PR_269), [
    { line: 'bl', count: 2 }, { line: 'co' }, { line: 'dd' }, { line: 'pb' },
  ]);
});

test('stopsFromFiles: an edited post is a stop but not a new post', () => {
  assert.deepEqual(stopsFromFiles([{ status: 'modified', filename: 'src/content/blogs/posts/2026-10-01-x.ts' }]), [{ line: 'bl' }]);
  assert.deepEqual(stopsFromFiles([{ status: 'added', filename: 'src/i18n/ui.ts' }]), []);
});

test('rebuiltFromTitle: PR titles and changelog titles', () => {
  assert.equal(rebuiltFromTitle('Content batch 2026-10-26: two blog posts, two new pages, agent-ROI rebuilt'), 'Agent-ROI');
  assert.equal(rebuiltFromTitle('Content batch 2026-10-27: two blog posts, two new pages, sandboxing playbook rebuilt'), 'Sandboxing playbook');
  assert.equal(rebuiltFromTitle('Two AI Blog posts, two new pages, and the agent-ROI page rebuilt'), 'Agent-ROI');
  assert.equal(rebuiltFromTitle('Two AI Blog posts, two new pages, and the evals primer rebuilt'), 'Evals primer');
  assert.equal(rebuiltFromTitle('feat(content): two AI Blog posts on search APIs and gateways, plus four pages'), null);
});

test('selectBatchPulls / rowFromPull: merged batch branches only, newest first', () => {
  const pr = (number, ref, merged_at, title = 'x') => ({ number, ref, merged_at, title, html_url: `https://github.com/o/r/pull/${number}`, head: { ref } });
  const picked = selectBatchPulls([
    pr(1, 'content/batch-2026-10-25', '2026-10-25T08:52:13Z'),
    pr(2, 'design/redesign-poc', '2026-10-26T10:00:00Z'),
    pr(3, 'content/batch-2026-10-26', null),
    pr(4, 'content/batch-2026-10-27', '2026-10-27T09:03:24Z', 'Content batch 2026-10-27: two blog posts, two new pages, sandboxing playbook rebuilt'),
  ]);
  assert.deepEqual(picked.map((p) => p.number), [4, 1]);
  assert.deepEqual(rowFromPull(picked[0], PR_269), {
    date: '2026-10-27', time: '09:03',
    stops: [{ line: 'bl', count: 2 }, { line: 'co' }, { line: 'dd' }, { line: 'pb' }],
    rebuilt: 'Sandboxing playbook',
    pr: { number: 4, url: 'https://github.com/o/r/pull/4' },
  });
});

test('batchesFromChangelog: newest dates with a blog post plus another section', () => {
  const L = (en) => ({ en, zh: en });
  const e = (date, title, lines) => ({ date, title: L(title), items: [L('x')], lines });
  const entries = [
    e('2026-10-27', 'Site redesign', ['hub']),
    e('2026-10-27', 'Two AI Blog posts, two new pages, and the agent sandboxing playbook rebuilt', ['co', 'dd', 'pb', 'bl']),
    e('2026-10-26', 'Two AI Blog posts, two new pages, and the agent-ROI page rebuilt', ['dd', 'op', 'bl']),
    e('2026-10-25', 'New blog post: one only', ['bl']),
    e('2026-10-24', 'A playbook fix', ['pb']),
    e('2026-10-23', 'Large MCP results in code', ['dd', 'bl']),
  ];
  const b = batchesFromChangelog(entries, 7);
  assert.equal(b.source, 'changelog');
  assert.equal(b.total, null);
  assert.deepEqual(b.rows.map((r) => r.date), ['2026-10-27', '2026-10-26', '2026-10-23']);
  assert.deepEqual(b.rows[0], {
    date: '2026-10-27', time: null, pr: null, rebuilt: 'Agent sandboxing playbook',
    stops: [{ line: 'bl', count: 2 }, { line: 'co' }, { line: 'dd' }, { line: 'pb' }],
  });
  assert.deepEqual(b.rows[2].stops, [{ line: 'bl' }, { line: 'dd' }]);
  assert.equal(batchesFromChangelog(entries, 2).rows.length, 2);
});
