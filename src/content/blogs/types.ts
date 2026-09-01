// Type definitions for the AI Blog section. Posts are one-file-per-entry under
// posts/<YYYY-MM-DD>-<slug>.ts; bilingual body fragments live at en/<slug>.html
// and zh/<slug>.html. Aggregator: ./manifest.ts.
import type { Locale, Localized } from '../../i18n/index';

export type { Locale, Localized } from '../../i18n/index';

export interface BlogPost {
  /** ISO date — must equal the filename prefix. Used for sort + JSON-LD datePublished. */
  date: string;
  /** kebab-case, unique across posts. Must equal the filename slug. */
  slug: string;
  /** Bilingual post title. Rendered as the on-page <h1> exactly as written. */
  title: Localized;
  /**
   * Optional per-locale override for the `<title>` tag only — never the <h1>.
   *
   * Set this when the headline is too long for a result list and has no
   * usable pre-colon head for `metaTitleFor()` to promote: headline-only posts
   * ("Stripe bought the meter, not the router") and posts whose head is a
   * cryptic fragment. Omit the locale that does not need one — Chinese
   * headlines are usually already inside the width budget.
   */
  searchTitle?: { en?: string; zh?: string };
  /** Bilingual 1–2-sentence summary. Used on cards and as <meta description>. */
  summary: Localized;
  /** Tag strings (lowercase kebab-case). Non-empty. */
  tags: string[];
  /** Optional bilingual author override; defaults to ui[locale].blog.defaultAuthor. */
  author?: Localized;
  /** Optional absolute OG image path. Defaults to /og/og-blog[-zh].png. */
  ogImage?: string;
  /** Optional reading-time override (minutes). Auto-computed if absent. */
  readingTimeMin?: number;
}

/** Bilingual helper — mirrors L() used by changelog and deep-dives. */
export const L = (en: string, zh: string): Localized => ({ en, zh });
