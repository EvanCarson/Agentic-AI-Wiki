import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLlmsTxt } from '../../src/lib/llms-txt.ts';

const L = (en, zh) => ({ en, zh });
const SITE = new URL('https://menuagentic.com');

// Nine pages. Concepts has two groups, with 'AI Foundations' recurring after
// 'Agentic AI' so bucketing (not adjacency) is what the test exercises; one
// title carries a `]` and one summary carries a line break.
const SOURCES = {
  concepts: [
    { slug: 'what-is-ai', title: L('What is AI?', '什么是 AI？'), summary: L('Nested circles.', '同心圆。'), group: L('AI Foundations', 'AI 基础') },
    { slug: 'the-agent-loop', title: L('The Agent Loop', '智能体循环'), summary: L('Reason, act, observe.', '推理、行动、观察。'), group: L('Agentic AI', '智能体 AI') },
    { slug: 'embeddings', title: L('Embeddings [vectors]', '嵌入'), summary: L('Meaning as\n    geometry.', '意义即几何。'), group: L('AI Foundations', 'AI 基础') },
  ],
  deepDives: [{ key: 'agent-security', name: L('Agent Security', '智能体安全'), entries: [
    { slug: 'red-teaming-agents', title: L('Red-Teaming Agents', '对智能体做红队'), summary: L('MCPTox.', 'MCPTox。') },
  ] }],
  playbooks: [{ key: 'domain-playbooks', name: L('Domain Playbooks', '领域手册'), entries: [
    { slug: 'coding-agents', title: L('Coding Agents', '编码智能体'), summary: L('Ship code.', '交付代码。') },
  ] }],
  operations: [{ key: 'agentops', name: L('AgentOps', '智能体运维'), entries: [
    { slug: 'tracing', title: L('Tracing', '追踪'), summary: L('See the run.', '看见运行。') },
  ] }],
  fieldGuide: [{ name: L('Build', '构建'), chapters: [
    { slug: 'the-loop', num: '01', title: L('The Loop', '主循环') },
  ] }],
  posts: [
    { date: '2026-09-01', slug: 'newest', title: L('Newest post', '最新文章'), summary: L('Today.', '今天。'), tags: ['x'] },
    { date: '2026-08-01', slug: 'older', title: L('Older post', '较早文章'), summary: L('Last month.', '上个月。'), tags: ['x'] },
  ],
};
const PAGES = 9;
const OPTIONAL_LINKS = 5;

const en = buildLlmsTxt('en', SITE, SOURCES);
const zh = buildLlmsTxt('zh', SITE, SOURCES);
const lines = s => s.split('\n');
const headings = s => lines(s).filter(l => l.startsWith('## '));
const linkLines = s => lines(s).filter(l => l.startsWith('- ['));
const urls = s => [...s.matchAll(/\]\((\S+?)\)/g)].map(m => m[1]);

test('the file opens with the H1, then a blockquote that states the page count', () => {
  assert.equal(lines(en)[0], '# Agentic AI Wiki');
  assert.equal(lines(en)[1], '');
  assert.ok(lines(en)[2].startsWith('> '), 'second block is the blockquote');
  assert.match(lines(en)[2], new RegExp(`\\b${PAGES} pages\\b`));
  assert.match(lines(zh)[2], new RegExp(`${PAGES} 个页面`));
  assert.ok(en.endsWith('\n'), 'ends with a newline');
});

test('headings follow section order, one per group, and a recurring Concepts group merges into its first heading', () => {
  assert.deepEqual(headings(en), [
    '## Concepts: AI Foundations',
    '## Concepts: Agentic AI',
    '## Deep-Dives: Agent Security',
    '## Playbooks: Domain Playbooks',
    '## Operations: AgentOps',
    '## Field Guide: Build',
    '## AI Blog',
    '## Optional',
  ]);
  const foundations = en.slice(en.indexOf('## Concepts: AI Foundations'), en.indexOf('## Concepts: Agentic AI'));
  assert.ok(foundations.includes('/concepts/what-is-ai/'), 'first Foundations entry');
  assert.ok(foundations.includes('/concepts/embeddings/'), 'non-adjacent Foundations entry joins the same section');
  assert.deepEqual(headings(zh), [
    '## 概念：AI 基础',
    '## 概念：智能体 AI',
    '## 深度剖析：智能体安全',
    '## 实战手册：领域手册',
    '## 运维：智能体运维',
    '## 实战指南：构建',
    '## AI 博客',
    '## Optional',
  ]);
});

test('English URLs are absolute on the site, carry no locale, end in a slash, and grouped sections carry the group segment', () => {
  const pageUrls = urls(en).filter(u => u.startsWith(SITE.origin) && !u.endsWith('.xml') && !u.endsWith('.txt'));
  assert.equal(pageUrls.length, PAGES + 2, 'nine pages plus the changelog and about links');
  for (const u of pageUrls) {
    assert.ok(!u.includes('/zh/'), `${u} is locale-free`);
    assert.ok(u.endsWith('/'), `${u} ends in a slash`);
  }
  for (const expected of [
    'https://menuagentic.com/concepts/what-is-ai/',
    'https://menuagentic.com/deep-dives/agent-security/red-teaming-agents/',
    'https://menuagentic.com/playbooks/domain-playbooks/coding-agents/',
    'https://menuagentic.com/operations/agentops/tracing/',
    'https://menuagentic.com/field-guide/the-loop/',
    'https://menuagentic.com/blogs/newest/',
  ]) assert.ok(pageUrls.includes(expected), expected);
});

test('the Chinese file prefixes every page URL with /zh/ and uses the Chinese titles and summaries', () => {
  const pageUrls = urls(zh).filter(u => u.startsWith(SITE.origin) && !u.endsWith('.xml') && !u.endsWith('.txt'));
  assert.equal(pageUrls.length, PAGES + 2);
  for (const u of pageUrls) assert.ok(u.startsWith('https://menuagentic.com/zh/'), u);
  assert.ok(zh.includes('- [什么是 AI？](https://menuagentic.com/zh/concepts/what-is-ai/): 同心圆。'));
});

test('blog entries stay newest-first and carry their date; Field Guide chapters carry their number and no note', () => {
  const newest = '- [Newest post](https://menuagentic.com/blogs/newest/): Today. (2026-09-01)';
  assert.ok(en.includes(newest), newest);
  assert.ok(en.indexOf('/blogs/newest/') < en.indexOf('/blogs/older/'));
  assert.ok(zh.includes('- [最新文章](https://menuagentic.com/zh/blogs/newest/): 今天。（2026-09-01）'));
  assert.ok(en.includes('- [01 · The Loop](https://menuagentic.com/field-guide/the-loop/)\n'));
});

test("each edition's Optional section links the other edition, the feed, the changelog, About and the repo", () => {
  const enOptional = en.slice(en.indexOf('## Optional'));
  const zhOptional = zh.slice(zh.indexOf('## Optional'));
  assert.ok(enOptional.includes('](https://menuagentic.com/zh/llms.txt)'), 'en → zh edition');
  assert.ok(zhOptional.includes('](https://menuagentic.com/llms.txt)'), 'zh → en edition');
  assert.ok(enOptional.includes('](https://menuagentic.com/rss.xml)'));
  assert.ok(zhOptional.includes('](https://menuagentic.com/zh/rss.xml)'));
  assert.ok(enOptional.includes('](https://menuagentic.com/changelog/)'));
  assert.ok(zhOptional.includes('](https://menuagentic.com/zh/about/)'));
  assert.ok(enOptional.includes('](https://github.com/EvanCarson/Agentic-AI-Wiki)'));
  assert.equal(linkLines(enOptional).length, OPTIONAL_LINKS);
});

test('square brackets in a title are escaped and a multi-line summary is flattened to one line', () => {
  const expected = '- [Embeddings \\[vectors\\]](https://menuagentic.com/concepts/embeddings/): Meaning as geometry.';
  assert.ok(en.includes(expected + '\n'), expected);
});

test('the link-line count is the page count plus the Optional links', () => {
  assert.equal(linkLines(en).length, PAGES + OPTIONAL_LINKS);
  assert.equal(linkLines(zh).length, PAGES + OPTIONAL_LINKS);
});

// Integration: the built files against the built site. Skipped, not failed,
// without a build so `npm test` passes in a fresh worktree (the same pattern
// as search-index.test.mjs). This is what guards the group segment in
// Deep-Dives / Playbooks / Operations URLs — a wrong segment is a 404 that
// every other gate is blind to.
const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));
const built = existsSync(join(DIST, 'llms.txt'));

test('every same-origin URL in the built files resolves to a built page, and both editions list the same number of links', { skip: !built && 'dist/llms.txt not built — run `npm run build` first' }, () => {
  const counts = [];
  for (const file of ['llms.txt', 'zh/llms.txt']) {
    const text = readFileSync(join(DIST, file), 'utf8');
    const missing = urls(text)
      .filter(u => u.startsWith(SITE.origin))
      .map(u => new URL(u).pathname)
      .filter(p => {
        const base = join(DIST, p.replace(/^\/+/, ''));
        return !(p.endsWith('/') ? existsSync(join(base, 'index.html')) : existsSync(base));
      });
    assert.deepEqual(missing, [], `${file}: unresolved paths`);
    counts.push(linkLines(text).length);
  }
  assert.equal(counts[0], counts[1], 'en and zh list the same number of links');
});
