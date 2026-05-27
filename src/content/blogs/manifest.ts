// Aggregator for the AI Blog posts.
//
// Each POST lives in its own file under `./posts/<YYYY-MM-DD>-<slug>.ts` —
// one file per post — so concurrent PRs adding posts never collide. Vite's
// `import.meta.glob` resolves all post files at build time; posts are sorted
// by filename (which is date-prefixed) DESCENDING so the newest post is first.
import type { BlogPost } from './types.ts';

export type { BlogPost, Locale, Localized } from './types.ts';
export { L } from './types.ts';

interface PostModule { default: BlogPost }
const modules = import.meta.glob<PostModule>('./posts/*.ts', { eager: true });

/** Posts sorted newest-first by filename (date prefix), slug as tiebreaker within a day. */
export const POSTS: BlogPost[] = Object.entries(modules)
  .map(([path, m]) => ({ post: m.default, file: path.split('/').pop()! }))
  .sort((a, b) => (a.file < b.file ? 1 : a.file > b.file ? -1 : 0))
  .map(({ post }) => post);

/** Lookup a post by its slug. */
export function postBySlug(slug: string): BlogPost | undefined {
  return POSTS.find(p => p.slug === slug);
}

/** Posts that include the given tag (case-sensitive on lowercase kebab-case tags). */
export function postsByTag(tag: string): BlogPost[] {
  return POSTS.filter(p => p.tags.includes(tag));
}

/** Sorted, deduplicated list of all tags across all posts. */
export function allTags(): string[] {
  const s = new Set<string>();
  for (const p of POSTS) for (const t of p.tags) s.add(t);
  return [...s].sort();
}
