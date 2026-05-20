// Aggregator for the bilingual site changelog.
//
// Each entry lives in its OWN file under `./changelog/entries/<YYYY-MM-DD>-<slug>.ts`
// — one file per PR — so concurrent PRs never collide on this module. Vite's
// `import.meta.glob` resolves all entry files at build time; we sort newest
// date first, with same-date entries falling back to alphabetical filename.
//
// To add a new entry: create `src/content/changelog/entries/<YYYY-MM-DD>-<short-slug>.ts`
// that `export default`s a `ChangelogEntry`. See any existing file for the shape.
import type { ChangelogEntry } from './changelog/types.ts';
export type { ChangelogEntry, Localized } from './changelog/types.ts';

interface EntryModule { default: ChangelogEntry }
const modules = import.meta.glob<EntryModule>('./changelog/entries/*.ts', { eager: true });

export const CHANGELOG: ChangelogEntry[] = Object.entries(modules)
  // Sort by filename desc → newest date first, alphabetical fallback within a day.
  .sort(([a], [b]) => (a < b ? 1 : a > b ? -1 : 0))
  .map(([, m]) => m.default);
