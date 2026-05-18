export const LOCALES = ['en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export type Localized<T = string> = Record<Locale, T>;

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

/** Resolve a localized value for a locale. */
export function tr<T>(val: Localized<T>, locale: Locale): T {
  return val[locale];
}

/** Prefix an internal absolute href for a locale. en is identity; zh gets a /zh prefix. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return href;
  return href === '/' ? '/zh' : `/zh${href}`;
}

/** Map a current pathname to its equivalent in another locale. */
export function switchLocalePath(path: string, to: Locale): string {
  const stripped = path.replace(/^\/zh(?=\/|$)/, '') || '/';
  return localizeHref(stripped, to);
}
