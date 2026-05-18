// Ordered structure for the Deep-Dives advanced essays.
// `page` is the fragment file basename; `slug` is the public URL segment.
// Bilingual data (title/summary/group) lives here, NOT in the HTML fragments.
//
// Content agents (C5–C8) ONLY add HTML fragment pairs under
// src/content/deep-dives/{en,zh}/<page>.html — they NEVER edit this file.
// Phase 3 (I1) registers entries here. Keep ENTRIES empty until then.
import type { Locale, Localized } from '../../i18n/index';

export interface Entry {
  /** Fragment file basename, e.g. `agent-architectures` → src/content/deep-dives/{en,zh}/agent-architectures.html */
  page: string;
  /** Public URL segment, lowercase-kebab. Usually equal to `page`. */
  slug: string;
  /** Localized entry title. */
  title: Localized;
  /** Localized one-line summary shown on the index. */
  summary: Localized;
  /** Optional localized group/section label for grouping on the index. */
  group?: Localized;
}

const L = (en: string, zh: string): Localized => ({ en, zh });
// `L` is intentionally exported so manifest entries (added in Phase 3) can use it.
export { L };

// Phase 3 (I1) registers content-agent entries here. Starts EMPTY by contract.
export const entries: Entry[] = [];

/** Flat, ordered list of all entries (mirrors field-guide CHAPTERS). */
export const ENTRIES = entries;

export type FlatEntry = (typeof ENTRIES)[number];

export function entryBySlug(slug: string): Entry | undefined {
  return ENTRIES.find(e => e.slug === slug);
}

/** Localized entry title. */
export function entryTitle(e: { title: Localized }, locale: Locale): string {
  return e.title[locale];
}

/**
 * Entries grouped by their optional `group` label, preserving manifest order.
 * Entries without a `group` are collected under a single null-keyed bucket
 * (rendered ungrouped by the index view).
 */
export function groupedEntries(locale: Locale): { group: string | null; items: Entry[] }[] {
  const out: { group: string | null; items: Entry[] }[] = [];
  for (const e of ENTRIES) {
    const key = e.group ? e.group[locale] : null;
    let bucket = out.find(b => b.group === key);
    if (!bucket) { bucket = { group: key, items: [] }; out.push(bucket); }
    bucket.items.push(e);
  }
  return out;
}
