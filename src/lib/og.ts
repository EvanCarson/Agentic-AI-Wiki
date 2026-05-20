import type { Locale } from '../i18n/index';
import type { OgSectionKey } from '../content/og';

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
