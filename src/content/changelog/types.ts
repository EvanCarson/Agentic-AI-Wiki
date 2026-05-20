// Shared types & helpers for changelog entries.
//
// Each PR adds ONE new file under ./entries/<YYYY-MM-DD>-<slug>.ts exporting
// a `ChangelogEntry` as the default export. The aggregator in
// ../changelog.ts globs the directory at build time and sorts newest-first.
// This avoids the "everyone edits the top of one array" merge conflict that
// plagued the previous single-file approach.
import type { Localized } from '../../i18n/index';

export type { Localized };

export interface ChangelogEntry {
  /** ISO date the change merged to main, YYYY-MM-DD. */
  date: string;
  title: Localized;
  /** Bullet points describing what changed; each must be bilingual. */
  items: Localized[];
}

/** Bilingual literal helper — keeps entry files terse. */
export const L = (en: string, zh: string): Localized => ({ en, zh });
