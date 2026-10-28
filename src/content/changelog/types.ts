// Shared types & helpers for changelog entries.
//
// Each PR adds ONE new file under ./entries/<YYYY-MM-DD>-<slug>.ts exporting
// a `ChangelogEntry` as the default export. The aggregator in
// ../changelog.ts globs the directory at build time and sorts newest-first.
// This avoids the "everyone edits the top of one array" merge conflict that
// plagued the previous single-file approach.
import type { Localized } from '../../i18n/index';

export type { Localized };

/**
 * A section of the site, as a line on the Line Map (see DESIGN.md):
 * fg Field Guide, bk Books, co Concepts, dd Deep-Dives, pb Playbooks,
 * op Operations, bl AI Blog, hub site-wide / infrastructure.
 */
export type LineKey = 'hub' | 'fg' | 'bk' | 'co' | 'dd' | 'pb' | 'op' | 'bl';

export interface ChangelogEntry {
  /** ISO date the change merged to main, YYYY-MM-DD. */
  date: string;
  title: Localized;
  /** Bullet points describing what changed; each must be bilingual. */
  items: Localized[];
  /**
   * Which sections this change touched, as line keys. Drives the colour dots
   * and the "How the network grew" chart on /changelog/. Use 'hub' for
   * design, infrastructure and site-wide changes. When omitted, a keyword
   * classifier in src/lib/changelog-lines.ts guesses — set it explicitly.
   */
  lines?: LineKey[];
}

/** Bilingual literal helper — keeps entry files terse. */
export const L = (en: string, zh: string): Localized => ({ en, zh });
