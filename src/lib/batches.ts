// The About page's departures board: the daily content batch, read from
// GitHub at build time so nobody keeps it up to date by hand.
//
// Primary source is the GitHub REST API (merged PRs whose branch starts
// `content/batch-`, each PR's changed files mapped to the sections it
// touched). Any failure — offline build, timeout, rate limit — falls back to
// the changelog, which knows the dates and sections but not the merge times
// or PR numbers. The build never fails because of the network.
//
// Everything except loadBatches() is pure and exported for the unit tests,
// which must not touch the network.
import type { ChangelogEntry, LineKey } from '../content/changelog/types.ts';
import { linesFor } from './changelog-lines.ts';

export const REPO = 'EvanCarson/Agentic-AI-Wiki';
const API = 'https://api.github.com';
const BRANCH_PREFIX = 'content/batch-';
const ROWS = 7;
const TIMEOUT_MS = 8000;

export interface BatchStop {
  line: LineKey;
  /** Posts added, shown as "2 AI Blog"; only set for the blog line. */
  count?: number;
}

export interface BatchRow {
  /** YYYY-MM-DD, the merge day (UTC). */
  date: string;
  /** HH:MM UTC, or null when the source does not know it. */
  time: string | null;
  stops: BatchStop[];
  /** The page the batch rebuilt, as named in the PR or changelog title. */
  rebuilt: string | null;
  pr: { number: number; url: string } | null;
}

export interface Batches {
  rows: BatchRow[];
  /** Total batches merged, and the first one's date; null on the fallback. */
  total: number | null;
  since: string | null;
  source: 'github' | 'changelog';
}

/** Board order: the blog first (every batch carries it), then nav order. */
const STOP_ORDER: readonly LineKey[] = ['bl', 'fg', 'bk', 'co', 'dd', 'pb', 'op'];

const PATHS: [RegExp, LineKey][] = [
  [/^src\/content\/field-guide\//, 'fg'],
  [/^src\/content\/books\//, 'bk'],
  [/^src\/content\/concepts\//, 'co'],
  [/^src\/content\/deep-dives\//, 'dd'],
  [/^src\/content\/playbooks\//, 'pb'],
  [/^src\/content\/operations\//, 'op'],
  [/^src\/content\/blogs\//, 'bl'],
  [/^public\/blogs\//, 'bl'],
];

/** The section a changed file belongs to, or null for changelog, i18n, tests, tooling. */
export function lineForPath(path: string): LineKey | null {
  for (const [re, k] of PATHS) if (re.test(path)) return k;
  return null;
}

/** Sections a PR touched, from its changed files, with the blog-post count. */
export function stopsFromFiles(files: { filename: string; status: string }[]): BatchStop[] {
  const found = new Set<LineKey>();
  let posts = 0;
  for (const f of files) {
    const k = lineForPath(f.filename);
    if (k) found.add(k);
    if (f.status === 'added' && /^src\/content\/blogs\/posts\/[^/]+\.ts$/.test(f.filename)) posts++;
  }
  return STOP_ORDER.filter((k) => found.has(k)).map((line) =>
    line === 'bl' && posts > 0 ? { line, count: posts } : { line });
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * The rebuilt page from a title such as "Content batch 2026-10-26: two blog
 * posts, two new pages, agent-ROI rebuilt" or the changelog's "…, and the
 * agent-ROI page rebuilt". Null when the title names no rebuild.
 */
export function rebuiltFromTitle(title: string): string | null {
  const m = title.trim().match(/,\s*([^,]+?)\s+rebuilt\.?$/i);
  if (!m) return null;
  const name = m[1].replace(/^and\s+/i, '').replace(/^the\s+/i, '').replace(/\s+page$/i, '').trim();
  return name ? cap(name) : null;
}

/** Changelog fallback: the newest dates that carry a blog post and another section. */
export function batchesFromChangelog(entries: ChangelogEntry[], rows = ROWS): Batches {
  const byDate = new Map<string, ChangelogEntry[]>();
  for (const e of entries) {
    const list = byDate.get(e.date) ?? [];
    list.push(e);
    byDate.set(e.date, list);
  }
  const out: BatchRow[] = [];
  for (const date of [...byDate.keys()].sort().reverse()) {
    const day = byDate.get(date)!;
    const batch = day.filter((e) => {
      const ls = linesFor(e);
      return ls.includes('bl') && ls.some((k) => k !== 'bl' && k !== 'hub');
    });
    if (!batch.length) continue;
    const found = new Set<LineKey>(batch.flatMap((e) => linesFor(e)));
    const posts = batch.some((e) => /\btwo (?:AI )?blog posts\b/i.test(e.title.en)) ? 2 : 0;
    const stops = STOP_ORDER.filter((k) => found.has(k)).map((line) =>
      line === 'bl' && posts ? { line, count: posts } : { line });
    const rebuilt = batch.map((e) => rebuiltFromTitle(e.title.en)).find(Boolean) ?? null;
    out.push({ date, time: null, stops, rebuilt, pr: null });
    if (out.length >= rows) break;
  }
  return { rows: out, total: null, since: null, source: 'changelog' };
}

interface PullSummary {
  number: number;
  title: string;
  html_url: string;
  merged_at: string | null;
  head: { ref: string };
}

/** Merged batch PRs, newest merge first. */
export function selectBatchPulls(pulls: PullSummary[]): PullSummary[] {
  return pulls
    .filter((p) => p.merged_at && p.head?.ref?.startsWith(BRANCH_PREFIX))
    .sort((a, b) => (a.merged_at! < b.merged_at! ? 1 : -1));
}

/** One board row from a PR and its changed files. */
export function rowFromPull(p: PullSummary, files: { filename: string; status: string }[]): BatchRow {
  const at = p.merged_at!; // ISO, UTC
  return {
    date: at.slice(0, 10),
    time: at.slice(11, 16),
    stops: stopsFromFiles(files),
    rebuilt: rebuiltFromTitle(p.title),
    pr: { number: p.number, url: p.html_url },
  };
}

async function getJSON<T>(url: string): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'agentic-ai-wiki-build',
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const res = await fetch(url, { headers, signal: ctrl.signal });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

async function fromGitHub(): Promise<Batches> {
  const pulls: PullSummary[] = [];
  for (let page = 1; page <= 3; page++) {
    const batch = await getJSON<PullSummary[]>(
      `${API}/repos/${REPO}/pulls?state=closed&per_page=100&sort=updated&direction=desc&page=${page}`);
    pulls.push(...batch);
    if (selectBatchPulls(pulls).length >= ROWS || batch.length < 100) break;
  }
  const newest = selectBatchPulls(pulls).slice(0, ROWS);
  if (!newest.length) throw new Error('no merged batch PRs found');
  const rows = await Promise.all(newest.map(async (p) =>
    rowFromPull(p, await getJSON(`${API}/repos/${REPO}/pulls/${p.number}/files?per_page=100`))));

  // Total and first date from the search API (one request: oldest first).
  // If it fails, the board still shows the rows; the footer drops the count.
  let total: number | null = null;
  let since: string | null = null;
  try {
    const q = encodeURIComponent(`repo:${REPO} is:pr is:merged head:${BRANCH_PREFIX}`);
    const s = await getJSON<{ total_count: number; items: { pull_request?: { merged_at?: string } }[] }>(
      `${API}/search/issues?q=${q}&sort=created&order=asc&per_page=1`);
    const first = s.items?.[0]?.pull_request?.merged_at;
    if (s.total_count > 0 && first) { total = s.total_count; since = first.slice(0, 10); }
  } catch { /* footer without the count */ }
  return { rows, total, since, source: 'github' };
}

let memo: Promise<Batches> | null = null;

/**
 * The board's data, fetched once per build and shared by /about/ and
 * /zh/about/. BATCHES_OFFLINE=1 forces the changelog fallback.
 */
export function loadBatches(changelog: ChangelogEntry[]): Promise<Batches> {
  if (!memo) {
    memo = (process.env.BATCHES_OFFLINE ? Promise.reject(new Error('BATCHES_OFFLINE')) : fromGitHub())
      .catch((err) => {
        console.warn(`[batches] GitHub unavailable (${err?.message ?? err}); using the changelog`);
        return batchesFromChangelog(changelog);
      });
  }
  return memo;
}
