// Which sections (Line Map lines) a changelog entry touched.
//
// Every entry file carries an explicit `lines` array; this module is the
// fallback for one that forgets, and the tool the backfill was generated
// with. The classifier reads each bullet's opening label ("AI Blog —",
// "New Operations page", "Rebuilt Deep-Dive"), any site path a bullet names,
// and a few title keywords. It is a guess: the explicit field always wins.
import type { ChangelogEntry, LineKey } from '../content/changelog/types.ts';

/** Display order: the seven lines in nav order, then the hub. */
export const LINE_ORDER: readonly LineKey[] = ['fg', 'bk', 'co', 'dd', 'pb', 'op', 'bl', 'hub'];

const PATHS: [RegExp, LineKey][] = [
  [/\/field-guide\//, 'fg'],
  [/\/books\//, 'bk'],
  [/\/concepts\//, 'co'],
  [/\/deep-dives\//, 'dd'],
  [/\/playbooks\//, 'pb'],
  [/\/operations\//, 'op'],
  [/\/blogs\//, 'bl'],
];

// Matched against the opening of a bullet (its label) and against the title.
const LABELS: [RegExp, LineKey][] = [
  [/\bBlog\b|\bblog posts?\b|\bblog pair\b/i, 'bl'],
  [/\bOperations?\b|\brunbooks?\b/, 'op'],
  [/\bPlaybooks?\b|\bplaybooks?\b/, 'pb'],
  [/\bDeep[- ]Dives?\b|\bdeep[- ]dives?\b/, 'dd'],
  [/\bConcepts?\b|\bconcepts?\b/, 'co'],
  [/\bField Guide\b|\bFrontier chapters?\b/, 'fg'],
  [/\bBooks?\b|\bLast Mile\b|\bbook\b/, 'bk'],
];

function sortLines(keys: Iterable<LineKey>): LineKey[] {
  const set = new Set(keys);
  return LINE_ORDER.filter((k) => set.has(k));
}

/** Keyword classifier over the English title and bullets. */
export function classifyLines(entry: Pick<ChangelogEntry, 'title' | 'items'>): LineKey[] {
  const found = new Set<LineKey>();
  const scan = (text: string) => {
    for (const [re, k] of LABELS) if (re.test(text)) found.add(k);
  };
  scan(entry.title.en);
  for (const it of entry.items) {
    const text = it.en;
    // The label is the bullet's opening, before the first colon or dash.
    scan(text.slice(0, 60).split(/[:—]/)[0]);
    for (const [re, k] of PATHS) if (re.test(text)) found.add(k);
  }
  return found.size ? sortLines(found) : ['hub'];
}

/** The entry's lines: the explicit field when set, else the classifier. */
export function linesFor(entry: Pick<ChangelogEntry, 'title' | 'items' | 'lines'>): LineKey[] {
  if (entry.lines && entry.lines.length) return sortLines(entry.lines);
  return classifyLines(entry);
}
