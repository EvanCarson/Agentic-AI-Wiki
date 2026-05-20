// Aggregator for the Playbooks advanced essays.
//
// Each Playbook GROUP lives in its own file under `./groups/<key>.ts` — one
// file per group — so concurrent PRs that add new groups never collide on
// this module. Vite's `import.meta.glob` resolves all group files at build
// time; groups are sorted by `order` ascending (with `key` as a deterministic
// tiebreaker), and each group's entries are concatenated in their declared
// order to form the flat ENTRIES list.
//
// To add a new group: create `src/content/playbooks/groups/<short-key>.ts`
// that `export default`s a `Group`. See any existing file for the shape.
// To add an essay to an existing group: append it to that group file's
// `entries` array.
import type { Locale, Localized } from '../../i18n/index';
import type { Entry, Group } from './types.ts';

export type { Entry, Group, Locale, Localized } from './types.ts';
export { L } from './types.ts';

interface GroupModule { default: Group }
const modules = import.meta.glob<GroupModule>('./groups/*.ts', { eager: true });

/** Groups sorted by `.order` asc, with `.key` as a deterministic tiebreaker. */
const GROUPS: Group[] = Object.values(modules)
  .map(m => m.default)
  .sort((a, b) => a.order - b.order || a.key.localeCompare(b.key));

/**
 * Flat, ordered list of all entries (group order, then within-group order).
 * The aggregator inflates each entry's `group` field from the parent group's
 * `name`, so consumers can treat ENTRIES exactly as they did before the refactor.
 */
export const ENTRIES: Entry[] = GROUPS.flatMap(g =>
  g.entries.map(e => ({ ...e, group: g.name })),
);

/** Back-compat alias for the previous export name. */
export const entries: Entry[] = ENTRIES;

export type FlatEntry = (typeof ENTRIES)[number];

export function entryBySlug(slug: string): Entry | undefined {
  return ENTRIES.find(e => e.slug === slug);
}

/** Localized entry title. */
export function entryTitle(e: { title: Localized }, locale: Locale): string {
  return e.title[locale];
}

/**
 * Entries bucketed by their group's localized name, preserving manifest order.
 * Same shape (and ordering semantics) as before the per-group refactor.
 */
export function groupedEntries(locale: Locale): { group: string | null; items: Entry[] }[] {
  return GROUPS.map(g => ({
    group: g.name[locale],
    items: g.entries.map(e => ({ ...e, group: g.name })),
  }));
}
