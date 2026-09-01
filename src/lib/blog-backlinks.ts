// Which AI Blog posts cite a given wiki page.
//
// The link graph between the two halves of this site ran one way. Blog posts
// referenced the wiki heavily — 855 links in the English fragments, 940 in the
// Chinese — while the wiki linked back to the blog six times in total, so the
// newest and most topical writing on the site was the least reachable part of
// it, both for a reader following a thread and for a crawler distributing
// authority.
//
// Rather than guess at relatedness from tags — Concepts entries do not carry
// any — this inverts the links the posts already make. Every association here
// was written deliberately by whoever drafted the post, it needs no
// maintenance, and it extends itself every time the daily routine publishes.
import type { BlogPost } from '../content/blogs/types.ts';

/** Sections a blog post can cite. Blog-to-blog links are deliberately excluded. */
const SECTIONS = 'concepts|deep-dives|playbooks|operations|field-guide';
const LINK_RE = new RegExp(`href="((?:/zh)?/(?:${SECTIONS})/[^"#?]*)"`, 'g');

/**
 * Normalise a href to a locale-independent key: no `/zh` prefix, no trailing
 * slash. The two locales' fragments cite the same 228 pages, but the Chinese
 * ones write `/zh/concepts/x` where the English write `/concepts/x`, so
 * without this the index would come out empty for one of them.
 */
export function normalizeWikiPath(href: string): string {
  return href.replace(/^\/zh(?=\/)/, '').replace(/\/+$/, '');
}

/** Every wiki page cited by one fragment, normalised and deduplicated. */
export function wikiLinksIn(html: string): string[] {
  const out = new Set<string>();
  for (const m of html.matchAll(LINK_RE)) out.add(normalizeWikiPath(m[1]));
  return [...out];
}

/**
 * Invert `{ '<any>/blogs/<locale>/<slug>.html': rawHtml }` into
 * `wiki path -> post slugs`. Both locales are folded together so a reader in
 * either language sees the same set.
 */
export function buildBacklinkIndex(fragments: Record<string, string>): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>();
  for (const [path, html] of Object.entries(fragments)) {
    const slug = path.split('/').pop()?.replace(/\.html$/, '');
    if (!slug) continue;
    for (const target of wikiLinksIn(html)) {
      let bucket = index.get(target);
      if (!bucket) index.set(target, (bucket = new Set()));
      bucket.add(slug);
    }
  }
  return index;
}

/**
 * Most-cited pages draw up to fifteen posts. That is a link farm at the foot of
 * an article, not a reading suggestion, so the module shows the newest few.
 */
export const MAX_RELATED = 6;

let cached: Map<string, Set<string>> | null = null;

/**
 * Posts citing `pathname`, newest first, capped. `posts` must be the
 * newest-first `POSTS` array so the slice takes the most recent.
 *
 * The index is built once per build and memoised — every entry page calls this,
 * and re-scanning ~190 fragments per render would be the slowest thing in it.
 */
export function relatedPostsFor(
  pathname: string,
  fragments: Record<string, string>,
  posts: BlogPost[],
): BlogPost[] {
  cached ??= buildBacklinkIndex(fragments);
  const slugs = cached.get(normalizeWikiPath(pathname));
  if (!slugs) return [];
  // Filtering POSTS rather than mapping the slug set keeps newest-first order
  // and drops any slug whose post has since been removed.
  return posts.filter(p => slugs.has(p.slug)).slice(0, MAX_RELATED);
}
