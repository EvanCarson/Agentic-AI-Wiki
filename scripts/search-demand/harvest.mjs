#!/usr/bin/env node
// Harvest what people ask about agents, check it against what the site
// already says, and write the ranked work queue the daily content routine reads.
//
//   node scripts/search-demand/harvest.mjs [--out search-queue.json]
//
// Sources, each optional — a source that is not configured is skipped, one
// that fails is logged and recorded under `sources`, and neither fails the run:
//   Google Search Console  GSC_SA_KEY (service-account JSON), GSC_SITE (sc-domain:menuagentic.com)
//   Bing Webmaster         BING_API_KEY, BING_SITE (https://menuagentic.com/)
//   Stack Exchange         anonymous (300 requests/day per IP)
//   Hacker News (Algolia)  anonymous
// The process exits non-zero only on a defect in this script.
//
// Runs weekly in .github/workflows/search-demand.yml. The matching, ranking and
// output shape are in ./lib.mjs. Design:
//   docs/superpowers/specs/2026-10-18-search-demand-queue-design.md
import { createSign } from 'node:crypto';
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  SE_TAGS, SE_WINDOW_DAYS, SE_MIN_SCORE, HN_QUERIES, HN_WINDOW_DAYS, HN_MIN_POINTS,
  CAPS, isAgentTopic, isHnAnnouncement, fragmentParts, parseBlogPost, makeDoc, pathOf, enPath, slugify,
  normalizeGscRows, classifyWeakPages, classifyLowClickPages, aggregateQueries,
  buildNewQuestions, buildQueue, rank, htmlText,
} from './lib.mjs';

const REPO = fileURLToPath(new URL('../../', import.meta.url));
const SEARCH_WINDOW_DAYS = 28;
const DAY = 86_400_000;

// ---------------------------------------------------------------------------
// Coverage index: every English page, read straight from the repo
// ---------------------------------------------------------------------------

const read = p => (existsSync(p) ? readFileSync(p, 'utf8') : '');
const importTs = p => import(pathToFileURL(p).href).then(m => m.default ?? m);

/**
 * One doc per published English page, keyed to its public path. URLs follow
 * the same rules as src/lib/llms-txt.ts: Concepts and Field Guide are flat,
 * Deep-Dives / Playbooks / Operations carry the group key, books carry the
 * book slug. Manifests are imported as TypeScript (Node 24 strips types); the
 * section aggregators use Vite's import.meta.glob, so their group files and
 * blog posts are read directly instead.
 */
export async function loadCoverageIndex(root = REPO) {
  const c = p => join(root, 'src/content', p);
  const docs = [];
  const frag = (section, page) => fragmentParts(read(c(`${section}/en/${page}.html`)));
  const add = (path, section, title, summary, parts) =>
    docs.push(makeDoc({ path, section, title, summary, goal: parts.goal, headings: [...parts.h2, ...parts.h3] }));

  const { entries: concepts } = await import(pathToFileURL(c('concepts/manifest.ts')).href);
  for (const e of concepts) add(`/concepts/${e.slug}/`, 'concepts', e.title.en, e.summary.en, frag('concepts', e.page));

  for (const section of ['deep-dives', 'playbooks', 'operations']) {
    for (const f of readdirSync(c(`${section}/groups`)).filter(f => f.endsWith('.ts')).sort()) {
      const g = await importTs(c(`${section}/groups/${f}`));
      for (const e of g.entries) add(`/${section}/${g.key}/${e.slug}/`, section, e.title.en, e.summary.en, frag(section, e.page ?? e.slug));
    }
  }

  const { PARTS } = await import(pathToFileURL(c('field-guide/manifest.ts')).href);
  for (const p of PARTS) for (const ch of p.chapters) {
    add(`/field-guide/${ch.slug}/`, 'field-guide', ch.title.en, '', frag('field-guide', ch.page));
  }

  for (const f of readdirSync(c('blogs/posts')).filter(f => f.endsWith('.ts')).sort()) {
    const post = parseBlogPost(read(c(`blogs/posts/${f}`)));
    if (post) docs.push(makeDoc({ path: `/blogs/${post.slug}/`, section: 'blogs', title: post.title, summary: post.summary }));
  }

  for (const book of readdirSync(c('books'), { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()) {
    const manifest = c(`books/${book}/manifest.ts`);
    if (!existsSync(manifest)) continue;
    const b = await importTs(manifest);
    for (const part of b.parts) for (const ch of part.chapters) {
      if (ch.status !== 'published') continue;
      add(`/books/${b.slug}/${ch.slug}/`, 'books', `${ch.title.en} (${b.title.en})`, ch.summary.en, frag(`books/${b.slug}`, ch.slug));
    }
  }
  return docs;
}

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

/** A source's own failure (network, HTTP status, bad JSON) — logged, never fatal. */
class SourceError extends Error {}

async function getJson(url, init = {}) {
  let res;
  try {
    res = await fetch(url, { ...init, signal: AbortSignal.timeout(30_000) });
  } catch (err) {
    throw new SourceError(`${new URL(url).host}: ${err.cause?.message ?? err.message}`);
  }
  const text = await res.text();
  if (!res.ok) throw new SourceError(`${new URL(url).host}: HTTP ${res.status} ${text.slice(0, 200)}`);
  try { return JSON.parse(text); } catch { throw new SourceError(`${new URL(url).host}: response is not JSON`); }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const isoDay = t => new Date(t).toISOString().slice(0, 10);
const decode = s => htmlText(String(s ?? ''))
  .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

// ---------------------------------------------------------------------------
// Google Search Console
// ---------------------------------------------------------------------------

const b64url = buf => Buffer.from(buf).toString('base64url');

/** Service-account JWT (RS256) exchanged for an OAuth access token. */
async function gscToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const aud = key.token_uri ?? 'https://oauth2.googleapis.com/token';
  const unsigned = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(JSON.stringify({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud, iat: now, exp: now + 3600,
  }))}`;
  const sig = createSign('RSA-SHA256').update(unsigned).sign(key.private_key);
  const tok = await getJson(aud, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${b64url(sig)}` }),
  });
  if (!tok.access_token) throw new SourceError('oauth2: no access_token in response');
  return tok.access_token;
}

async function harvestGsc(env) {
  let key;
  try { key = JSON.parse(env.GSC_SA_KEY); } catch { throw new SourceError('GSC_SA_KEY is not valid JSON'); }
  if (!key.client_email || !key.private_key) throw new SourceError('GSC_SA_KEY lacks client_email / private_key');
  const token = await gscToken(key);
  // Yesterday back 28 days; dataState 'all' includes the not-yet-final recent days.
  const end = Date.now() - DAY;
  const body = {
    startDate: isoDay(end - (SEARCH_WINDOW_DAYS - 1) * DAY), endDate: isoDay(end),
    dimensions: ['query', 'page'], rowLimit: 5000, dataState: 'all',
  };
  const data = await getJson(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(env.GSC_SITE)}/searchAnalytics/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { rows: normalizeGscRows(data.rows ?? []), window: { start: body.startDate, end: body.endDate } };
}

// ---------------------------------------------------------------------------
// Bing Webmaster (JSON API: https://ssl.bing.com/webmaster/api.svc/json/<Method>)
// GetQueryStats / GetPageStats / GetPageQueryStats, documented at
// learn.microsoft.com/dotnet/api/microsoft.bing.webmaster.api.interfaces.iwebmasterapi
// Rows are weekly buckets with a WCF date ("/Date(1316156400000-0700)/").
// ---------------------------------------------------------------------------

const BING = 'https://ssl.bing.com/webmaster/api.svc/json';
const BING_TOP_PAGES = 25;
const wcfDate = s => Number(/\/Date\((-?\d+)/.exec(String(s))?.[1] ?? NaN);

/** Sum Bing's weekly rows inside the window into one total per key. */
function bingTotals(rows, keyOf, since) {
  const m = new Map();
  for (const r of rows) {
    const t = wcfDate(r.Date);
    if (Number.isFinite(t) && t < since) continue;
    const k = keyOf(r);
    const a = m.get(k) ?? { key: k, impressions: 0, clicks: 0, posSum: 0 };
    a.impressions += r.Impressions ?? 0; a.clicks += r.Clicks ?? 0;
    a.posSum += (r.AvgImpressionPosition ?? 0) * (r.Impressions ?? 0);
    m.set(k, a);
  }
  return [...m.values()].map(a => ({ ...a, position: a.impressions ? a.posSum / a.impressions : 0 }));
}

async function harvestBing(env) {
  const q = (method, extra = '') =>
    getJson(`${BING}/${method}?siteUrl=${encodeURIComponent(env.BING_SITE)}${extra}&apikey=${encodeURIComponent(env.BING_API_KEY)}`)
      .then(d => d.d ?? []);
  const since = Date.now() - SEARCH_WINDOW_DAYS * DAY;
  const queries = bingTotals(await q('GetQueryStats'), r => r.Query, since)
    .map(a => ({ query: a.key, impressions: a.impressions, clicks: a.clicks, position: a.position }));
  // Page × query rows, for weakPages / lowClickPages: the top pages by impressions.
  const pages = bingTotals(await q('GetPageStats'), r => r.Query, since)
    .sort((a, b) => b.impressions - a.impressions).slice(0, BING_TOP_PAGES);
  const rows = [];
  for (const p of pages) {
    // The API wants the page as a JSON string literal with escaped slashes.
    const pageArg = encodeURIComponent(JSON.stringify(p.key).replace(/\//g, '\\/'));
    for (const a of bingTotals(await q('GetPageQueryStats', `&page=${pageArg}`), r => r.Query, since)) {
      rows.push({ query: a.key, page: pathOf(p.key), clicks: a.clicks, impressions: a.impressions, position: a.position });
    }
  }
  return { rows, queries };
}

// ---------------------------------------------------------------------------
// Stack Exchange
// ---------------------------------------------------------------------------

async function harvestStackExchange() {
  const fromdate = Math.floor((Date.now() - SE_WINDOW_DAYS * DAY) / 1000);
  const out = [];
  const errors = [];
  let requests = 0, quotaRemaining = null;
  for (const [site, tags] of Object.entries(SE_TAGS)) {
    for (const tag of tags) {
      if (quotaRemaining !== null && quotaRemaining < 5) { errors.push('quota nearly exhausted; stopped early'); return { out, errors, requests, quotaRemaining }; }
      const url = `https://api.stackexchange.com/2.3/questions?site=${site}&tagged=${encodeURIComponent(tag)}`
        + `&fromdate=${fromdate}&sort=votes&order=desc&min=${SE_MIN_SCORE}&pagesize=50`;
      let data;
      try {
        requests++;
        data = await getJson(url);
      } catch (err) {
        if (!(err instanceof SourceError)) throw err;
        errors.push(`${site}/${tag}: ${err.message}`);
        // 400 throttle_violation / 502 means stop asking for a while, not retry.
        if (/HTTP (400|429|502)/.test(err.message)) return { out, errors, requests, quotaRemaining };
        continue;
      }
      quotaRemaining = data.quota_remaining ?? quotaRemaining;
      for (const it of data.items ?? []) {
        if ((it.score ?? 0) < SE_MIN_SCORE) continue;
        out.push({
          id: `se:${site}:${it.question_id}`,
          source: 'stackexchange',
          site,
          question: decode(it.title),
          url: it.link,
          createdAt: new Date(it.creation_date * 1000).toISOString(),
          tags: it.tags,
          signal: { score: it.score, views: it.view_count, answers: it.answer_count, answered: it.is_answered },
        });
      }
      // The API sets `backoff` (seconds) when it wants this method left alone; obey it.
      await sleep(data.backoff ? data.backoff * 1000 : 150);
    }
  }
  return { out, errors, requests, quotaRemaining };
}

// ---------------------------------------------------------------------------
// Hacker News (Algolia)
// ---------------------------------------------------------------------------

async function harvestHn() {
  const since = Math.floor((Date.now() - HN_WINDOW_DAYS * DAY) / 1000);
  const out = [];
  const errors = [];
  let dropped = 0;
  for (const query of HN_QUERIES) {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}`
      + `&tags=(story,ask_hn)&numericFilters=${encodeURIComponent(`created_at_i>${since},points>=${HN_MIN_POINTS}`)}&hitsPerPage=100`;
    let data;
    try { data = await getJson(url); } catch (err) {
      if (!(err instanceof SourceError)) throw err;
      errors.push(`${query}: ${err.message}`);
      continue;
    }
    for (const h of data.hits ?? []) {
      if (!h.title || isHnAnnouncement(h.title) || !isAgentTopic(h.title)) { dropped++; continue; }
      out.push({
        id: `hn:${h.objectID}`,
        source: 'hn',
        kind: h._tags?.includes('ask_hn') ? 'ask_hn' : 'story',
        question: decode(h.title),
        url: `https://news.ycombinator.com/item?id=${h.objectID}`,
        createdAt: h.created_at,
        signal: { points: h.points, comments: h.num_comments ?? 0 },
      });
    }
  }
  return { out, errors, dropped };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

/** Run one source; a SourceError becomes a recorded failure, anything else is a bug and propagates. */
async function runSource(name, sources, fn) {
  try {
    return await fn();
  } catch (err) {
    if (!(err instanceof SourceError)) throw err;
    console.error(`search-demand: ${name} failed — ${err.message}`);
    sources[name] = { status: 'error', error: err.message };
    return null;
  }
}

export async function main(argv = process.argv.slice(2), env = process.env) {
  const i = argv.indexOf('--out');
  const out = resolve(i === -1 ? 'search-queue.json' : argv[i + 1]);
  const sources = {};
  const searchRows = [];
  const questions = [];
  const searchQueryItems = (source, qs) => qs.map(q => ({
    id: `${source}:${slugify(q.query)}`, source, question: q.query,
    signal: { impressions: q.impressions, clicks: q.clicks, position: Math.round(q.position * 10) / 10 },
  }));

  const docs = await loadCoverageIndex();
  sources.coverage = { status: 'ok', pages: docs.length };
  console.log(`search-demand: coverage index has ${docs.length} English pages`);

  if (env.GSC_SA_KEY && env.GSC_SITE) {
    const r = await runSource('gsc', sources, () => harvestGsc(env));
    if (r) {
      searchRows.push(...r.rows);
      questions.push(...searchQueryItems('gsc', aggregateQueries(r.rows)));
      sources.gsc = { status: 'ok', rows: r.rows.length, window: r.window };
    }
  } else sources.gsc = { status: 'skipped', reason: 'GSC_SA_KEY / GSC_SITE not set' };

  if (env.BING_API_KEY && env.BING_SITE) {
    const r = await runSource('bing', sources, () => harvestBing(env));
    if (r) {
      searchRows.push(...r.rows);
      questions.push(...searchQueryItems('bing', r.queries.filter(q => q.impressions >= 5)));
      sources.bing = { status: 'ok', queries: r.queries.length, pageQueryRows: r.rows.length };
    }
  } else sources.bing = { status: 'skipped', reason: 'BING_API_KEY / BING_SITE not set' };

  const se = await runSource('stackexchange', sources, harvestStackExchange);
  if (se) {
    questions.push(...se.out);
    sources.stackexchange = {
      status: se.out.length || !se.errors.length ? 'ok' : 'error',
      questions: se.out.length, requests: se.requests, quotaRemaining: se.quotaRemaining,
      ...(se.errors.length && { errors: se.errors.slice(0, 10) }),
    };
  }

  const hn = await runSource('hn', sources, harvestHn);
  if (hn) {
    questions.push(...hn.out);
    sources.hn = {
      status: hn.out.length || !hn.errors.length ? 'ok' : 'error',
      stories: hn.out.length, dropped: hn.dropped,
      ...(hn.errors.length && { errors: hn.errors.slice(0, 10) }),
    };
  }

  const byPath = new Map(docs.map(d => [d.path, d.title]));
  const titleOf = p => byPath.get(enPath(p)) ?? null;
  const nq = buildNewQuestions(questions, docs);
  const weak = rank(classifyWeakPages(searchRows, titleOf), CAPS.weakPages);
  const low = classifyLowClickPages(searchRows, titleOf);

  const queue = buildQueue({
    generatedAt: new Date().toISOString(),
    sources,
    newQuestions: nq.items,
    byStatus: nq.byStatus,
    weakPages: weak,
    lowClickPages: rank(low.pages, CAPS.lowClickPages),
    siteMedianCtr: searchRows.length ? low.siteMedianCtr : null,
    hasSearchData: searchRows.length > 0,
  });
  writeFileSync(out, JSON.stringify(queue, null, 2) + '\n');

  for (const [name, s] of Object.entries(sources)) console.log(`  ${name.padEnd(14)} ${s.status}${s.reason ? ` (${s.reason})` : ''}${s.error ? ` (${s.error})` : ''}`);
  console.log(`  matched ${nq.matched}: ${nq.byStatus.covered} covered, ${nq.byStatus.partial} partial, ${nq.byStatus.gap} gap`);
  console.log(`search-demand: wrote ${out} — ${queue.counts.newQuestions} newQuestions, ${queue.counts.weakPages} weakPages, ${queue.counts.lowClickPages} lowClickPages`);
  return queue;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error('search-demand: defect in the harvester —', err);
    process.exit(1);
  });
}
