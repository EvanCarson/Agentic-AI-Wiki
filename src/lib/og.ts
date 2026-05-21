import type { Locale } from '../i18n/index';
import type { OgSectionKey } from '../content/og';
import { ui } from '../i18n/ui.ts';

const SLUG: Record<OgSectionKey, string> = {
  default: 'default',
  fieldGuide: 'field-guide',
  concepts: 'concepts',
  deepDives: 'deep-dives',
  playbooks: 'playbooks',
  operations: 'operations',
  changelog: 'changelog',
};

/** Public path to the section's PNG for a given locale (e.g. "/og/og-concepts-zh.png"). */
export function ogImageFor(key: OgSectionKey, locale: Locale): string {
  const suffix = locale === 'zh' ? '-zh' : '';
  return `/og/og-${SLUG[key]}${suffix}.png`;
}

/** Build-time helper: derives the PNG file basename. Used by scripts/build-og.mjs. */
export function ogImageBasename(key: OgSectionKey, locale: Locale): string {
  const suffix = locale === 'zh' ? '-zh' : '';
  return `og-${SLUG[key]}${suffix}.png`;
}

/**
 * Returns the Pagefind filter value for the given section + locale,
 * e.g. "section:Field Guide" for ('fieldGuide', 'en')
 *      "section:实战指南"     for ('fieldGuide', 'zh')
 *
 * Returns undefined for the `default` key (home/about/404 have no section).
 */
export function pagefindFilterFor(key: OgSectionKey, locale: Locale): string | undefined {
  if (key === 'default') return undefined;
  return `section:${ui[locale].nav[key]}`;
}
