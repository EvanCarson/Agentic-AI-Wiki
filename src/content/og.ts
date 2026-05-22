import type { Locale } from '../i18n/index';

export type OgSectionKey =
  | 'default'
  | 'fieldGuide'
  | 'concepts'
  | 'deepDives'
  | 'playbooks'
  | 'operations'
  | 'changelog';

export interface OgSection {
  key: OgSectionKey;
  /**
   * Only set on `default` — its card name has no nav entry, so it lives here.
   * For every other section, name is sourced from `ui[locale].nav[key]`.
   */
  name?: Record<Locale, string>;
}

export const OG_SECTIONS: readonly OgSection[] = [
  { key: 'default', name: { en: 'Agentic AI', zh: '智能体 AI' } },
  { key: 'fieldGuide' },
  { key: 'concepts' },
  { key: 'deepDives' },
  { key: 'playbooks' },
  { key: 'operations' },
  { key: 'changelog' },
] as const;
