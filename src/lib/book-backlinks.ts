// Which chapters of a book cite a given chapter of the same book.
//
// A book is read in order, but its chapters lean on each other constantly —
// every Part II chapter refers back to the maturity model, Part III to the
// phase chapters — and a reader who lands mid-book from search needs to see
// that web, not just prev/next. Like ./blog-backlinks.ts, this inverts the
// links the chapters already make rather than maintaining a list by hand.

/** Chapter slugs of `book` linked from `html`, either locale, deduplicated. */
export function chapterLinksIn(html: string, book: string): string[] {
  const re = new RegExp(`href="(?:/zh)?/books/${book}/([a-z0-9-]+)/?(?:[#?][^"]*)?"`, 'g');
  const out = new Set<string>();
  for (const m of html.matchAll(re)) out.add(m[1]);
  return [...out];
}

/**
 * Invert `{ '<any>/<locale>/<chapter>.html': rawHtml }` into
 * `chapter -> chapters that link to it`. Both locales fold together so a
 * reader in either language sees the same set; a chapter's links to itself
 * are dropped.
 */
export function buildChapterBacklinks(fragments: Record<string, string>, book: string): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>();
  for (const [path, html] of Object.entries(fragments)) {
    const from = path.split('/').pop()?.replace(/\.html$/, '');
    if (!from) continue;
    for (const to of chapterLinksIn(html, book)) {
      if (to === from) continue;
      let bucket = index.get(to);
      if (!bucket) index.set(to, (bucket = new Set()));
      bucket.add(from);
    }
  }
  return index;
}
