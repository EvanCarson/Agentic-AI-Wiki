// The pure half of the search-demand harvester: text matching, coverage
// status, GSC row classification, ranking and the output shape. Nothing here
// touches the network or the filesystem, so all of it is unit-tested
// (scripts/__tests__/search-demand.test.mjs). The I/O lives in ./harvest.mjs.
//
// Design: docs/superpowers/specs/2026-10-18-search-demand-queue-design.md

// ---------------------------------------------------------------------------
// Sources and their filters
// ---------------------------------------------------------------------------

/**
 * Stack Exchange tags to harvest, per site. Each was checked to exist with
 * `/2.3/tags/{tags}/info` on 2026-10-17; names that do not exist are silently
 * ignored by the API, so a typo here costs a request and returns nothing.
 * Not used, on purpose: SO `agent` (mostly user-agent / build-agent questions),
 * `prompt` (shell prompts), `transformer-model` (mostly training questions).
 * Absent on both sites at the time of checking: ai-agent(s), autogen,
 * anthropic-claude, prompt-engineering, function-calling, pydantic-ai.
 */
export const SE_TAGS = {
  stackoverflow: [
    'langchain', 'py-langchain', 'langchain-js', 'langgraph', 'langsmith',
    'model-context-protocol', 'mcp-server', 'crewai', 'ms-autogen',
    'openai-api', 'openai-agents', 'claude', 'claude-code', 'anthropic',
    'large-language-model', 'rag', 'retrieval-augmented-generation',
    'llama-index', 'semantic-kernel', 'tool-calling',
  ],
  ai: [
    'large-language-models', 'agentic-ai', 'intelligent-agent', 'claude',
    'rag', 'retrieval-augmented-generation', 'prompt-design',
  ],
};

/** Community questions are kept if they are at most this old and scored at least this. */
export const SE_WINDOW_DAYS = 90;
export const SE_MIN_SCORE = 1;

/** HN Algolia queries (search_by_date, tags=(story,ask_hn)). */
export const HN_QUERIES = [
  'ai agent', 'agentic', 'llm agent', 'mcp server', 'model context protocol',
  'retrieval augmented generation', 'multi-agent', 'coding agent', 'claude code', 'langgraph',
  'agent evals', 'prompt injection',
];
export const HN_WINDOW_DAYS = 90;
export const HN_MIN_POINTS = 10;
/** Demand discount for an HN story (a headline) relative to an Ask HN post. */
export const HN_STORY_WEIGHT = 0.5;

/** Show HN / Launch HN posts are product announcements, not demand: skipped. */
export function isHnAnnouncement(title) {
  return /^(show|launch) hn\b/i.test(String(title).trim());
}

/**
 * Algolia matches loosely (typo tolerance, prefix matching), so "ai agent"
 * also returns a personal-finance app. A story is kept only if its title
 * names one of these terms. Compared against normalized, stemmed tokens.
 */
export const AGENT_TOPIC_TERMS = [
  'agent', 'llm', 'mcp', 'rag', 'claude', 'gpt', 'openai', 'anthropic', 'gemini',
  'langchain', 'langgraph', 'crewai', 'autogen', 'prompt', 'copilot', 'cursor',
  'codex', 'embedding', 'vector', 'eval', 'inference', 'gpu', 'transformer',
];

// ---------------------------------------------------------------------------
// Text normalization
// ---------------------------------------------------------------------------

/**
 * Multi-word terms folded to one token before tokenizing, so "Model Context
 * Protocol" and "MCP" match each other and do not dilute the score as three
 * separate common words.
 */
const PHRASES = [
  [/\bmodel[\s-]+context[\s-]+protocol\b/g, ' mcp '],
  [/\bretrieval[\s-]+augmented[\s-]+generation\b/g, ' rag '],
  [/\blarge[\s-]+language[\s-]+models?\b/g, ' llm '],
  [/\bfunction[\s-]+call(?:ing|s)?\b/g, ' toolcall '],
  [/\btool[\s-]+(?:use|call(?:ing|s)?)\b/g, ' toolcall '],
  [/\bagent[\s-]?to[\s-]?agent\b/g, ' a2a '],
  [/\bmulti[\s-]+agents?\b/g, ' multiagent '],
  [/\bvector[\s-]+(?:db|database|store)s?\b/g, ' vectordb '],
  [/\bchat[\s-]?gpt\b/g, ' gpt '],
  [/\bgpt[\s-]?\d[\w.]*\b/g, ' gpt '],
  [/\bclaude[\s-]+code\b/g, ' claudecode '],
  [/\bcontext[\s-]+windows?\b/g, ' contextwindow '],
  [/\bprompt[\s-]+injections?\b/g, ' promptinjection '],
  [/\bfine[\s-]?tun(?:e|ed|ing)\b/g, ' finetune '],
  [/\bagentic\b/g, ' agent '],
  [/\bllms\b/g, ' llm '],
];

/** Words that carry no topic. Question scaffolding and generic dev verbs included. */
export const STOPWORDS = new Set(`
a about above after again against all am an and any are aren't as at be because been before
being below between both but by can can't cannot could couldn't did didn't do does doesn't doing
don't down during each few for from further had hadn't has hasn't have haven't having he her here
hers herself him himself his how i if in into is isn't it it's its itself just let me more most
my myself no nor not now of off on once only or other ought our ours ourselves out over own same
she should shouldn't so some such than that the their theirs them themselves then there these
they this those through to too under until up very was wasn't we were weren't what when where
which while who whom why will with won't would wouldn't you your yours yourself yourselves
vs via using use used uses get getting got make making way ways want need needs trying try tried
work works working one two also like still even really thing things anyone someone something
best better good new possible properly correctly instead without within across able way
ask hn show tell question help problem issue please doe
stop prevent avoid handle fix difference between example examples always never give
`.split(/\s+/).filter(Boolean));

/** Stems that mean the same thing on this site; applied after suffix stripping. */
const STEM_ALIASES = new Map([['eval', 'evaluat'], ['memori', 'memory'], ['agentic', 'agent'], ['llms', 'llm']]);

/**
 * Light suffix stripping: enough to fold plurals, -ing/-ed, -ation and a
 * trailing -e onto one stem (evaluate / evaluating / evaluation → evaluat),
 * never a real stemmer.
 */
export function stem(word) {
  let w = word;
  if (w.length <= 3) return STEM_ALIASES.get(w) ?? w;
  const undouble = x => (/(.)\1$/.test(x) && !/(ll|ss|zz)$/.test(x) ? x.slice(0, -1) : x); // running -> run
  if (w.endsWith('ies') && w.length > 4) w = w.slice(0, -3) + 'y';
  else if (w.endsWith('sses')) w = w.slice(0, -2);
  else if (w.endsWith('s') && !/(ss|us|is)$/.test(w)) w = w.slice(0, -1);
  if (w.endsWith('ing') && w.length > 5) w = undouble(w.slice(0, -3));
  else if (w.endsWith('ed') && w.length > 4) w = undouble(w.slice(0, -2));
  else if (w.endsWith('ation') && w.length > 7) w = w.slice(0, -3);
  else if (w.endsWith('e') && w.length > 4 && !w.endsWith('ee')) w = w.slice(0, -1);
  return STEM_ALIASES.get(w) ?? w;
}

/** Topic tokens of a text, in order, stemmed, stopwords removed, duplicates kept. */
export function tokenize(text) {
  let t = String(text ?? '').toLowerCase()
    .replace(/&amp;/g, '&').replace(/&#39;|&rsquo;|&lsquo;|[’‘]/g, "'").replace(/&[a-z]+;|&#\d+;/g, ' ');
  for (const [re, rep] of PHRASES) t = t.replace(re, rep);
  const out = [];
  for (const raw of t.split(/[^a-z0-9'+#.]+/)) {
    const w = raw.replace(/^[.'+]+|[.'+]+$/g, '').replace(/'s$/, '');
    if (!w || w.length < 2 || STOPWORDS.has(w) || /^\d+$/.test(w)) continue;
    const s = stem(w.replace(/'/g, ''));
    if (s.length < 2 || STOPWORDS.has(s)) continue;
    out.push(s);
  }
  return out;
}

/** True if a title is about agents / LLMs at all (used to filter HN's loose matches). */
export function isAgentTopic(text) {
  const toks = new Set(tokenize(text));
  return AGENT_TOPIC_TERMS.some(t => toks.has(stem(t)));
}

// ---------------------------------------------------------------------------
// Coverage index and matching
// ---------------------------------------------------------------------------

/** Strip tags and decode the handful of entities the fragments use. */
export function htmlText(html) {
  return String(html ?? '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

/** The searchable parts of a content fragment: its h2s, h3s and `p.goal`. */
export function fragmentParts(html) {
  const grab = re => [...String(html).matchAll(re)].map(m => htmlText(m[1]));
  return {
    h2: grab(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g),
    h3: grab(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g),
    goal: grab(/<p class="goal"[^>]*>([\s\S]*?)<\/p>/g)[0] ?? '',
  };
}

/**
 * A blog post's slug, English title and English summary, read from its
 * `posts/<date>-<slug>.ts` source by regex (the file is TypeScript; this runs in
 * plain node). Returns null if the shape is not recognized.
 */
export function parseBlogPost(src) {
  const slug = /slug:\s*'([^']+)'/.exec(src)?.[1];
  const date = /date:\s*'(\d{4}-\d{2}-\d{2})'/.exec(src)?.[1];
  // L('en', 'zh') — the first string literal after the key. Handles ' " and ` quotes.
  const lit = key => {
    const m = new RegExp(`${key}:\\s*L\\(\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*)\\1`).exec(src);
    return m ? m[2].replace(/\\(['"`\\])/g, '$1') : '';
  };
  if (!slug) return null;
  return { slug, date, title: lit('title'), summary: lit('summary') };
}

/**
 * One page of the coverage index.
 * `title` fields are matched at full weight, `body` fields at BODY_WEIGHT.
 */
export function makeDoc({ path, section, title, summary = '', goal = '', headings = [] }) {
  return {
    path, section, title,
    titleTokens: new Set(tokenize([title, headings[0] ?? ''].join(' '))),
    bodyTokens: new Set(tokenize([summary, goal, ...headings.slice(1)].join(' '))),
  };
}

/** How much a query term found only in a page's body counts, relative to its title. */
export const BODY_WEIGHT = 0.6;

/**
 * Status thresholds on the match score (0..1, see `scoreDoc`). Tuned on
 * 2026-10-17 against the live Stack Exchange / HN harvest and a handful of
 * hand-checked questions:
 *   "How do I build an MCP server in Python?"           → MCP pages, covered
 *   "LangGraph vs CrewAI for multi-agent orchestration" → partial (frameworks page, no head-to-head)
 *   "ChromaDB persist_directory not saving embeddings"  → gap (a library bug, not a topic)
 * A score of 0.55 means most of the question's informative words (by IDF)
 * appear on one page, at least some in its title.
 */
export const THRESHOLDS = { covered: 0.55, partial: 0.3 };

/** Inverse document frequency over the index; unseen terms get the maximum weight. */
export function buildIdf(docs) {
  const df = new Map();
  for (const d of docs) for (const t of new Set([...d.titleTokens, ...d.bodyTokens])) df.set(t, (df.get(t) ?? 0) + 1);
  const n = docs.length;
  const max = Math.log((n + 1) / 1) + 1;
  return { get: t => (df.has(t) ? Math.log((n + 1) / (df.get(t) + 1)) + 1 : max), n };
}

/**
 * Match score of a query against one page: the IDF-weighted share of the
 * query's distinct terms that the page contains (title hits count 1, body-only
 * hits BODY_WEIGHT). 0 = nothing in common, 1 = every term in the title.
 */
export function scoreDoc(queryTokens, doc, idf) {
  const terms = [...new Set(queryTokens)];
  if (terms.length === 0) return 0;
  let total = 0, hit = 0;
  for (const t of terms) {
    const w = idf.get(t);
    total += w;
    if (doc.titleTokens.has(t)) hit += w;
    else if (doc.bodyTokens.has(t)) hit += w * BODY_WEIGHT;
  }
  return total === 0 ? 0 : hit / total;
}

export function statusFor(score, thresholds = THRESHOLDS) {
  if (score >= thresholds.covered) return 'covered';
  if (score >= thresholds.partial) return 'partial';
  return 'gap';
}

/** Best page (and runners-up) for a question, with its status. */
export function matchQuestion(text, docs, idf, { thresholds = THRESHOLDS, alternates = 2 } = {}) {
  const q = tokenize(text);
  const scored = docs.map(d => ({ d, s: scoreDoc(q, d, idf) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s || a.d.path.localeCompare(b.d.path));
  const round = s => Math.round(s * 1000) / 1000;
  const best = scored[0];
  const score = best ? round(best.s) : 0;
  return {
    status: statusFor(score, thresholds),
    score,
    bestMatch: best ? { path: best.d.path, title: best.d.title, section: best.d.section, score } : null,
    alternates: scored.slice(1, 1 + alternates).map(x => ({ path: x.d.path, title: x.d.title, score: round(x.s) })),
  };
}

// ---------------------------------------------------------------------------
// Search-console rows → weakPages / lowClickPages
// ---------------------------------------------------------------------------

/** Positions in this band are page 1's bottom through page 3: close enough to move. */
export const WEAK_POSITION = { min: 8, max: 30 };
/** A (query, page) pair needs this many impressions to count toward a weak page. */
export const WEAK_MIN_IMPRESSIONS = 10;
/** A page needs this many impressions before its CTR is judged at all. */
export const LOWCTR_MIN_IMPRESSIONS = 100;
/** "Well under the median": CTR below this fraction of the site median. */
export const LOWCTR_FRACTION = 0.5;
/** Search queries need this many impressions to become a newQuestions candidate. */
export const QUERY_MIN_IMPRESSIONS = 5;

export const CAPS = { newQuestions: 40, weakPages: 20, lowClickPages: 20 };

/** Site-relative path of a URL (or the path itself), always with a trailing slash. */
export function pathOf(url) {
  let p;
  try { p = new URL(url).pathname; } catch { p = String(url); }
  return p.endsWith('/') || /\.[a-z0-9]+$/i.test(p) ? p : p + '/';
}

/** The English path for a zh path, so both locales look up the same index entry. */
export function enPath(path) {
  return path.startsWith('/zh/') ? path.slice(3) : path === '/zh' || path === '/zh/' ? '/' : path;
}

function median(xs) {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

const r3 = x => Math.round(x * 1000) / 1000;
const r1 = x => Math.round(x * 10) / 10;

/**
 * Normalized search rows: `{ query, page, clicks, impressions, position }`,
 * `page` a site path. GSC `rows[].keys` are `[query, page]` in the order the
 * request named the dimensions.
 */
export function normalizeGscRows(rows = []) {
  return rows.map(r => ({
    query: r.keys[0], page: pathOf(r.keys[1]),
    clicks: r.clicks ?? 0, impressions: r.impressions ?? 0, position: r.position ?? 0,
  }));
}

/** Pages with (query, page) pairs ranking 8–30 on real impressions: rebuild candidates. */
export function classifyWeakPages(rows, titleOf = () => null) {
  const byPage = new Map();
  for (const r of rows) {
    if (r.position < WEAK_POSITION.min || r.position > WEAK_POSITION.max) continue;
    if (r.impressions < WEAK_MIN_IMPRESSIONS) continue;
    if (!byPage.has(r.page)) byPage.set(r.page, []);
    byPage.get(r.page).push(r);
  }
  return [...byPage.entries()].map(([page, rs]) => {
    const impressions = rs.reduce((a, r) => a + r.impressions, 0);
    return {
      id: `weak:${page}`,
      page,
      title: titleOf(page),
      impressions,
      clicks: rs.reduce((a, r) => a + r.clicks, 0),
      avgPosition: r1(rs.reduce((a, r) => a + r.position * r.impressions, 0) / impressions),
      queries: rs.sort((a, b) => b.impressions - a.impressions).slice(0, 10)
        .map(r => ({ query: r.query, impressions: r.impressions, clicks: r.clicks, position: r1(r.position) })),
      demand: r3(Math.log1p(impressions)),
    };
  });
}

/**
 * Pages whose CTR is under LOWCTR_FRACTION of the site median, among pages
 * with LOWCTR_MIN_IMPRESSIONS: they are seen and skipped, so the title or
 * lede is the thing to fix. Ranked by clicks missed against the median.
 */
export function classifyLowClickPages(rows, titleOf = () => null) {
  const byPage = new Map();
  for (const r of rows) {
    const p = byPage.get(r.page) ?? { page: r.page, impressions: 0, clicks: 0, posSum: 0, rows: [] };
    p.impressions += r.impressions; p.clicks += r.clicks; p.posSum += r.position * r.impressions; p.rows.push(r);
    byPage.set(r.page, p);
  }
  const eligible = [...byPage.values()].filter(p => p.impressions >= LOWCTR_MIN_IMPRESSIONS);
  const siteMedianCtr = median(eligible.map(p => p.clicks / p.impressions));
  const cutoff = siteMedianCtr * LOWCTR_FRACTION;
  const pages = eligible
    .filter(p => p.clicks / p.impressions < cutoff)
    .map(p => {
      const ctr = p.clicks / p.impressions;
      const missed = (siteMedianCtr - ctr) * p.impressions;
      return {
        id: `lowctr:${p.page}`,
        page: p.page,
        title: titleOf(p.page),
        impressions: p.impressions,
        clicks: p.clicks,
        ctr: r3(ctr),
        siteMedianCtr: r3(siteMedianCtr),
        avgPosition: r1(p.posSum / p.impressions),
        missedClicks: r1(missed),
        topQueries: p.rows.sort((a, b) => b.impressions - a.impressions).slice(0, 5)
          .map(r => ({ query: r.query, impressions: r.impressions, clicks: r.clicks, position: r1(r.position) })),
        demand: r3(Math.log1p(missed)),
      };
    });
  return { pages, siteMedianCtr: r3(siteMedianCtr), eligiblePages: eligible.length };
}

/** Per-query totals across pages: candidates for newQuestions from search data. */
export function aggregateQueries(rows) {
  const byQ = new Map();
  for (const r of rows) {
    const q = byQ.get(r.query) ?? { query: r.query, impressions: 0, clicks: 0, posSum: 0 };
    q.impressions += r.impressions; q.clicks += r.clicks; q.posSum += r.position * r.impressions;
    byQ.set(r.query, q);
  }
  return [...byQ.values()]
    .filter(q => q.impressions >= QUERY_MIN_IMPRESSIONS)
    .map(q => ({ query: q.query, impressions: q.impressions, clicks: q.clicks, position: r1(q.posSum / q.impressions) }));
}

// ---------------------------------------------------------------------------
// Demand and ranking
// ---------------------------------------------------------------------------

/** URL-safe, stable fragment of free text, for ids built from search queries. */
export function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
}

/**
 * Demand signal of one question, comparable across sources (higher = more).
 * Search impressions are the strongest evidence that people ask this of a
 * search engine, so they weigh most; community votes and points are proxies.
 * Community items decay with age (half weight floor), search data is already
 * windowed to 28 days.
 */
export function demandScore(item, now = Date.now()) {
  const s = item.signal ?? {};
  let base;
  if (item.source === 'gsc' || item.source === 'bing') base = 1.5 * Math.log1p(s.impressions ?? 0) + Math.log1p(s.clicks ?? 0);
  else if (item.source === 'hn') {
    // A front-page headline is news, not a question someone typed; Ask HN is.
    // Without the discount, HN points swamp every Stack Exchange question.
    base = (0.8 * Math.log1p(s.points ?? 0) + 0.3 * Math.log1p(s.comments ?? 0)) * (item.kind === 'ask_hn' ? 1 : HN_STORY_WEIGHT);
  }
  else base = Math.log1p(s.score ?? 0) + 0.3 * Math.log1p(s.views ?? 0) + 0.2 * Math.log1p(s.answers ?? 0);
  if (item.createdAt) {
    const ageDays = Math.max(0, (now - Date.parse(item.createdAt)) / 86_400_000);
    base *= 0.5 + 0.5 * Math.exp(-ageDays / 45);
  }
  return r3(base);
}

/**
 * Rank a list by `demand` (desc), id as a deterministic tiebreak; cap it and
 * stamp 1-based `rank`.
 */
export function rank(items, cap) {
  return [...items]
    .sort((a, b) => b.demand - a.demand || String(a.id).localeCompare(String(b.id)))
    .slice(0, cap)
    .map((x, i) => ({ rank: i + 1, ...x }));
}

/** Drop repeats of the same id (the same HN story found by two queries), keeping the first. */
export function dedupeById(items) {
  const seen = new Set();
  return items.filter(x => (seen.has(x.id) ? false : (seen.add(x.id), true)));
}

/**
 * Turn raw questions into the newQuestions list: match each against the
 * index, keep gap + partial, rank by demand, cap. Returns the list plus
 * per-status counts over everything matched.
 */
export function buildNewQuestions(questions, docs, { now = Date.now(), cap = CAPS.newQuestions, thresholds = THRESHOLDS } = {}) {
  const idf = buildIdf(docs);
  const byStatus = { covered: 0, partial: 0, gap: 0 };
  const kept = [];
  for (const q of dedupeById(questions)) {
    const m = matchQuestion(q.question, docs, idf, { thresholds });
    byStatus[m.status]++;
    if (m.status === 'covered') continue;
    kept.push({ ...q, status: m.status, matchScore: m.score, bestMatch: m.bestMatch, alternates: m.alternates, demand: demandScore(q, now) });
  }
  return { items: rank(kept, cap), byStatus, matched: byStatus.covered + byStatus.partial + byStatus.gap };
}

/**
 * The search-queue.json document. `reason` explains each list that came out
 * empty, so the routine can tell "nothing to do" from "no data".
 */
export function buildQueue({ generatedAt, sources, newQuestions, byStatus, weakPages, lowClickPages, siteMedianCtr = null, hasSearchData }) {
  const reason = {};
  if (newQuestions.length === 0) reason.newQuestions = 'No gap or partial questions from any source that ran.';
  if (weakPages.length === 0) {
    reason.weakPages = hasSearchData
      ? `No (query, page) pair ranked ${WEAK_POSITION.min}–${WEAK_POSITION.max} with ≥${WEAK_MIN_IMPRESSIONS} impressions.`
      : 'No search data: Google Search Console and Bing Webmaster both skipped or failed (see sources).';
  }
  if (lowClickPages.length === 0) {
    reason.lowClickPages = hasSearchData
      ? `No page with ≥${LOWCTR_MIN_IMPRESSIONS} impressions has a CTR under ${LOWCTR_FRACTION}× the site median.`
      : 'No search data: Google Search Console and Bing Webmaster both skipped or failed (see sources).';
  }
  return {
    version: 1,
    generatedAt,
    sources,
    thresholds: {
      status: THRESHOLDS, bodyWeight: BODY_WEIGHT,
      weakPosition: WEAK_POSITION, weakMinImpressions: WEAK_MIN_IMPRESSIONS,
      lowCtrMinImpressions: LOWCTR_MIN_IMPRESSIONS, lowCtrFraction: LOWCTR_FRACTION,
      siteMedianCtr,
    },
    counts: {
      byStatus,
      newQuestions: newQuestions.length, weakPages: weakPages.length, lowClickPages: lowClickPages.length,
    },
    reason,
    newQuestions,
    weakPages,
    lowClickPages,
  };
}
