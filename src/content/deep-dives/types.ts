// Shared types & helpers for Deep-Dive group files.
//
// Each Deep-Dive GROUP lives in its own file under ./groups/<key>.ts and
// `export default`s a `Group`. The aggregator in ../manifest.ts globs the
// directory at build time and orders groups by `order` (ascending), with
// `key` as a deterministic tiebreaker. This eliminates the merge conflict
// that plagued the previous single-array manifest.
import type { Locale, Localized } from '../../i18n/index';

export type { Locale, Localized };

/** A single Deep-Dive entry. The `group` field is INFLATED by the aggregator from the parent group's `name`; group files MUST NOT set it. */
export interface Entry {
  /** Fragment file basename, e.g. `react-pattern` → src/content/deep-dives/{en,zh}/react-pattern.html */
  page: string;
  /** Public URL segment, lowercase-kebab. Must equal `page`. */
  slug: string;
  /** Localized entry title. */
  title: Localized;
  /** Localized one-line summary shown on the index. */
  summary: Localized;
  /** Localized group label (set by the aggregator — do not specify in group files). */
  group?: Localized;
}

/** A Deep-Dive group: a curated cluster of entries with a localized display name. */
export interface Group {
  /** Stable, lowercase-kebab key. MUST equal the filename basename (the test enforces this). */
  key: string;
  /**
   * Display order, ascending. Lower groups appear first on the Deep-Dives index.
   * Existing groups use 10/20/.../80 — pick a number that places your new group
   * where you want it (use gaps so future groups can be inserted without
   * renumbering). Duplicates fall back to `key` ascending.
   */
  order: number;
  /** Bilingual display name (used as the section header on the index). */
  name: Localized;
  /** Entries in this group, in display order. */
  entries: Omit<Entry, 'group'>[];
}

/** Bilingual literal helper — keeps group files terse. */
export const L = (en: string, zh: string): Localized => ({ en, zh });
