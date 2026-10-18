// The search-demand harvester's pure half (scripts/search-demand/lib.mjs):
// matching and status, ranking, GSC row classification and the queue shape.
// No network. The last test reads the real repo to build the coverage index —
// a filesystem read, no build needed.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  tokenize, stem, isAgentTopic, isHnAnnouncement, fragmentParts, parseBlogPost, makeDoc,
  buildIdf, scoreDoc, statusFor, matchQuestion, THRESHOLDS,
  normalizeGscRows, classifyWeakPages, classifyLowClickPages, aggregateQueries,
  demandScore, rank, dedupeById, buildNewQuestions, buildQueue, CAPS, pathOf, enPath,
} from '../search-demand/lib.mjs';
import { loadCoverageIndex } from '../search-demand/harvest.mjs';

const DOCS = [
  makeDoc({ path: '/concepts/what-is-mcp/', section: 'concepts', title: 'What Is the Model Context Protocol?', summary: 'MCP is a standard way for agents to reach tools and data.' }),
  makeDoc({ path: '/deep-dives/mcp/mcp-building-servers-in-practice/', section: 'deep-dives', title: 'Building MCP Servers in Practice', summary: 'Python and TypeScript SDKs, transports, and testing a server.' }),
  makeDoc({ path: '/concepts/what-is-rag/', section: 'concepts', title: 'What Is RAG?', summary: 'Retrieval-augmented generation grounds answers in retrieved documents.' }),
  makeDoc({ path: '/concepts/agent-memory/', section: 'concepts', title: 'Agent Memory', summary: 'How agents remember across sessions: short-term context and long-term stores.' }),
  makeDoc({ path: '/blogs/langgraph-vs-crewai/', section: 'blogs', title: 'LangGraph vs CrewAI', summary: 'Two orchestration frameworks compared.' }),
  makeDoc({ path: '/concepts/temperature-and-sampling/', section: 'concepts', title: 'Generation & Sampling: Temperature', summary: 'Temperature reshapes the distribution.' }),
];
const IDF = buildIdf(DOCS);

// --- tokenizing ------------------------------------------------------------

test('tokenize folds phrases, drops stopwords and stems plurals and -ing', () => {
  assert.deepEqual(tokenize('How do I build an MCP server?'), ['build', 'mcp', 'server']);
  assert.deepEqual(tokenize('Model Context Protocol servers'), ['mcp', 'server']);
  assert.deepEqual(tokenize('Retrieval-Augmented Generation'), ['rag']);
  assert.equal(stem('evaluating'), stem('evaluation'));
  assert.equal(stem('evaluate'), stem('evals'));
  assert.equal(stem('memories'), 'memory');
  assert.equal(stem('running'), 'run');
});

test('isAgentTopic keeps agent titles and drops the loose Algolia matches', () => {
  assert.ok(isAgentTopic('Ask HN: How do you evaluate your LLM agents?'));
  assert.ok(isAgentTopic('New MCP roadmap'));
  assert.ok(!isAgentTopic('Solar surpasses nuclear power globally'));
  assert.ok(isHnAnnouncement('Show HN: my agent thing'));
  assert.ok(!isHnAnnouncement('Ask HN: is anyone shipping agents?'));
});

test('fragmentParts and parseBlogPost read the repo formats', () => {
  const parts = fragmentParts('<section class="phase"><h2>MCP <em>servers</em></h2><p class="goal">Ship &amp; test.</p><h3 id="x">Transports</h3></section>');
  assert.deepEqual(parts, { h2: ['MCP servers'], h3: ['Transports'], goal: 'Ship &amp; test.' });
  const post = parseBlogPost(`const post = { date: '2026-10-17', slug: 'x-vs-y',
    title: L(\n 'X vs Y: what\\'s different',\n '中文'),\n summary: L("A \\"quoted\\" summary.", '中文'), tags: [] };`);
  assert.deepEqual(post, { slug: 'x-vs-y', date: '2026-10-17', title: "X vs Y: what's different", summary: 'A "quoted" summary.' });
});

// --- scoring and status ----------------------------------------------------

test('scoreDoc: title hits beat body hits; no overlap scores 0', () => {
  const q = tokenize('MCP server');
  const title = scoreDoc(q, DOCS[1], IDF);
  assert.equal(title, 1);
  assert.ok(scoreDoc(tokenize('python sdk'), DOCS[1], IDF) < 1, 'body-only hits are discounted');
  assert.equal(scoreDoc(tokenize('kubernetes autoscaling'), DOCS[1], IDF), 0);
  assert.equal(scoreDoc([], DOCS[1], IDF), 0);
});

test('statusFor applies the documented thresholds', () => {
  assert.equal(statusFor(THRESHOLDS.covered), 'covered');
  assert.equal(statusFor(THRESHOLDS.covered - 0.01), 'partial');
  assert.equal(statusFor(THRESHOLDS.partial), 'partial');
  assert.equal(statusFor(THRESHOLDS.partial - 0.01), 'gap');
  assert.equal(statusFor(0), 'gap');
});

test('matchQuestion picks the right page and status', () => {
  const mcp = matchQuestion('How do I build an MCP server in Python?', DOCS, IDF);
  assert.equal(mcp.status, 'covered');
  assert.equal(mcp.bestMatch.path, '/deep-dives/mcp/mcp-building-servers-in-practice/');

  const half = matchQuestion('LangGraph checkpointer', DOCS, IDF);
  assert.equal(half.status, 'partial');
  assert.equal(half.bestMatch.path, '/blogs/langgraph-vs-crewai/');

  const none = matchQuestion('ChromaDB persist_directory not saving', DOCS, IDF);
  assert.equal(none.status, 'gap');
});

// --- search rows -------------------------------------------------------------

const ROWS = normalizeGscRows([
  // agent-memory: position 12 on two real queries, one too small, one too high-ranked.
  { keys: ['agent memory', 'https://menuagentic.com/concepts/agent-memory/'], clicks: 2, impressions: 400, ctr: 0.005, position: 12.4 },
  { keys: ['llm long term memory', 'https://menuagentic.com/concepts/agent-memory/'], clicks: 1, impressions: 120, ctr: 0.008, position: 21 },
  { keys: ['memory for agents tiny', 'https://menuagentic.com/concepts/agent-memory/'], clicks: 0, impressions: 4, ctr: 0, position: 15 },
  { keys: ['what is agent memory', 'https://menuagentic.com/concepts/agent-memory/'], clicks: 0, impressions: 50, ctr: 0, position: 3 },
  // what-is-rag: ranks well and gets clicked.
  { keys: ['what is rag', 'https://menuagentic.com/concepts/what-is-rag/'], clicks: 40, impressions: 500, ctr: 0.08, position: 4 },
  // what-is-mcp: page 4 — out of the weak band.
  { keys: ['mcp', 'https://menuagentic.com/zh/concepts/what-is-mcp/'], clicks: 10, impressions: 300, ctr: 0.033, position: 35 },
  // temperature: decent CTR.
  { keys: ['llm temperature', 'https://menuagentic.com/concepts/temperature-and-sampling/'], clicks: 12, impressions: 200, ctr: 0.06, position: 6 },
]);
const titleOf = p => DOCS.find(d => d.path === enPath(p))?.title ?? null;

test('normalizeGscRows maps keys to query + site path', () => {
  assert.deepEqual(ROWS[5], { query: 'mcp', page: '/zh/concepts/what-is-mcp/', clicks: 10, impressions: 300, position: 35 });
  assert.equal(pathOf('https://menuagentic.com/concepts/x'), '/concepts/x/');
  assert.equal(enPath('/zh/concepts/what-is-mcp/'), '/concepts/what-is-mcp/');
});

test('weakPages: only positions 8–30 with enough impressions, grouped by page', () => {
  const weak = classifyWeakPages(ROWS, titleOf);
  assert.equal(weak.length, 1);
  const [p] = weak;
  assert.equal(p.id, 'weak:/concepts/agent-memory/');
  assert.equal(p.title, 'Agent Memory');
  assert.equal(p.impressions, 520);
  assert.deepEqual(p.queries.map(q => q.query), ['agent memory', 'llm long term memory']);
  assert.equal(p.avgPosition, Math.round(((12.4 * 400 + 21 * 120) / 520) * 10) / 10);
});

test('lowClickPages: high impressions with CTR well under the site median', () => {
  const { pages, siteMedianCtr, eligiblePages } = classifyLowClickPages(ROWS, titleOf);
  // Eligible (≥100 impressions): agent-memory 3/574, what-is-rag 40/500, what-is-mcp 10/300, temperature 12/200.
  assert.equal(eligiblePages, 4);
  assert.equal(siteMedianCtr, Math.round(((10 / 300 + 12 / 200) / 2) * 1000) / 1000);
  assert.deepEqual(pages.map(p => p.page), ['/concepts/agent-memory/']);
  assert.equal(pages[0].id, 'lowctr:/concepts/agent-memory/');
  assert.ok(pages[0].ctr < pages[0].siteMedianCtr / 2);
  assert.ok(pages[0].missedClicks > 0);
});

test('lowClickPages: a site with no clicks anywhere flags nothing', () => {
  const rows = ROWS.map(r => ({ ...r, clicks: 0 }));
  assert.equal(classifyLowClickPages(rows).pages.length, 0);
});

test('aggregateQueries sums a query across pages and drops tiny ones', () => {
  const qs = aggregateQueries([...ROWS, { query: 'agent memory', page: '/blogs/x/', clicks: 0, impressions: 100, position: 40 }]);
  const am = qs.find(q => q.query === 'agent memory');
  assert.equal(am.impressions, 500);
  assert.ok(!qs.some(q => q.query === 'memory for agents tiny'));
});

// --- ranking ---------------------------------------------------------------

const NOW = Date.parse('2026-10-17T00:00:00Z');

test('demandScore: more votes, more impressions and newer all rank higher', () => {
  const se = (score, createdAt) => ({ source: 'stackexchange', createdAt, signal: { score, views: 100, answers: 1 } });
  assert.ok(demandScore(se(10, '2026-10-10T00:00:00Z'), NOW) > demandScore(se(2, '2026-10-10T00:00:00Z'), NOW));
  assert.ok(demandScore(se(5, '2026-10-15T00:00:00Z'), NOW) > demandScore(se(5, '2026-07-20T00:00:00Z'), NOW));
  const g = imp => ({ source: 'gsc', signal: { impressions: imp, clicks: 0 } });
  assert.ok(demandScore(g(1000), NOW) > demandScore(g(10), NOW));
  const hn = kind => ({ source: 'hn', kind, createdAt: '2026-10-10T00:00:00Z', signal: { points: 100, comments: 50 } });
  assert.ok(demandScore(hn('ask_hn'), NOW) > demandScore(hn('story'), NOW), 'a headline is discounted against an Ask HN');
});

test('rank orders by demand, breaks ties by id, caps and numbers from 1', () => {
  const out = rank([{ id: 'b', demand: 1 }, { id: 'a', demand: 1 }, { id: 'c', demand: 5 }, { id: 'd', demand: 0 }], 3);
  assert.deepEqual(out.map(x => [x.rank, x.id]), [[1, 'c'], [2, 'a'], [3, 'b']]);
  assert.deepEqual(dedupeById([{ id: 'x', n: 1 }, { id: 'x', n: 2 }]), [{ id: 'x', n: 1 }]);
});

test('buildNewQuestions keeps gap + partial, counts all three, ranks and caps', () => {
  const q = (id, question, score) => ({ id, source: 'stackexchange', question, createdAt: '2026-10-01T00:00:00Z', signal: { score, views: 50, answers: 0 } });
  const input = [
    q('se:so:1', 'How do I build an MCP server in Python?', 50),        // covered — dropped from the list
    q('se:so:2', 'LangGraph checkpointer', 3),        // partial
    q('se:so:3', 'ChromaDB persist_directory not saving', 9),            // gap
    q('se:so:3', 'ChromaDB persist_directory not saving', 9),            // duplicate id
  ];
  const { items, byStatus, matched } = buildNewQuestions(input, DOCS, { now: NOW });
  assert.deepEqual(byStatus, { covered: 1, partial: 1, gap: 1 });
  assert.equal(matched, 3);
  assert.deepEqual(items.map(i => [i.rank, i.id, i.status]), [[1, 'se:so:3', 'gap'], [2, 'se:so:2', 'partial']]);
  assert.equal(items[1].bestMatch.path, '/blogs/langgraph-vs-crewai/');
  assert.equal(buildNewQuestions(input, DOCS, { now: NOW, cap: 1 }).items.length, 1);
});

// --- output shape ------------------------------------------------------------

test('buildQueue: the documented shape, with a reason for every empty list', () => {
  const { items, byStatus } = buildNewQuestions([], DOCS, { now: NOW });
  const queue = buildQueue({
    generatedAt: '2026-10-17T06:00:00.000Z',
    sources: { gsc: { status: 'skipped', reason: 'not set' } },
    newQuestions: items, byStatus, weakPages: [], lowClickPages: [], hasSearchData: false,
  });
  assert.deepEqual(Object.keys(queue), ['version', 'generatedAt', 'sources', 'thresholds', 'counts', 'reason', 'newQuestions', 'weakPages', 'lowClickPages']);
  assert.equal(queue.version, 1);
  assert.deepEqual(queue.counts, { byStatus: { covered: 0, partial: 0, gap: 0 }, newQuestions: 0, weakPages: 0, lowClickPages: 0 });
  assert.deepEqual(Object.keys(queue.reason).sort(), ['lowClickPages', 'newQuestions', 'weakPages']);
  assert.match(queue.reason.weakPages, /No search data/);
  assert.deepEqual(CAPS, { newQuestions: 40, weakPages: 20, lowClickPages: 20 });
  JSON.parse(JSON.stringify(queue)); // serializable
});

test('buildQueue: lists with data carry no reason; search-data reasons differ from no-data ones', () => {
  const weak = rank(classifyWeakPages(ROWS, titleOf), CAPS.weakPages);
  const queue = buildQueue({
    generatedAt: 'x', sources: {}, newQuestions: [{ id: 'q', rank: 1 }], byStatus: { covered: 0, partial: 1, gap: 0 },
    weakPages: weak, lowClickPages: [], hasSearchData: true,
  });
  assert.deepEqual(Object.keys(queue.reason), ['lowClickPages']);
  assert.doesNotMatch(queue.reason.lowClickPages, /No search data/);
  assert.equal(queue.weakPages[0].rank, 1);
});

// --- the real coverage index -------------------------------------------------

test('coverage index: every section is present, paths are public URL shapes', async () => {
  const docs = await loadCoverageIndex();
  const sections = new Set(docs.map(d => d.section));
  for (const s of ['concepts', 'deep-dives', 'playbooks', 'operations', 'field-guide', 'blogs', 'books']) assert.ok(sections.has(s), `missing ${s}`);
  assert.equal(new Set(docs.map(d => d.path)).size, docs.length, 'paths are unique');
  for (const d of docs) {
    assert.match(d.path, /^\/(concepts|field-guide|blogs)\/[a-z0-9-]+\/$|^\/(deep-dives|playbooks|operations|books)\/[a-z0-9-]+\/[a-z0-9-]+\/$/, d.path);
    assert.ok(d.title, `${d.path} has no title`);
    assert.ok(d.titleTokens.size + d.bodyTokens.size > 0, `${d.path} has no text`);
  }
  const m = matchQuestion('How do I build an MCP server?', docs, buildIdf(docs));
  assert.equal(m.status, 'covered');
  assert.match(m.bestMatch.path, /mcp/);
});
