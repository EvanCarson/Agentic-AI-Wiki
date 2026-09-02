// Which public URLs a set of changed repository files affects.
//
// IndexNow tells Bing, Yandex and the other participating engines that a URL
// changed, instead of waiting for them to come back on their own schedule. The
// site publishes five pages a day and Bing is already its second-largest
// referrer, so the wait is the expensive part. (Google does not participate;
// Search Console is the route there.)
//
// The mapping problem: a content fragment's path does not contain its public
// URL. Deep-Dives, Playbooks and Operations carry a group segment that lives in
// a manifest, and Field Guide fragments are named by an internal page id (`f1`)
// rather than by their slug. Rather than re-derive routing here — a second
// source of truth that would drift from the real one — this takes the slug from
// the filename and finds the URLs the *built sitemap* already published for it.
// The sitemap is generated from the same manifests the site renders from, so it
// cannot disagree with production, and both locales fall out for free.

/** Content files whose basename is the slug. Field Guide is handled separately. */
const SLUG_SECTIONS = ['blogs', 'concepts', 'deep-dives', 'playbooks', 'operations'];

/**
 * Slug for one changed path, or null if the file does not map to a page.
 * `fieldGuidePages` maps a Field Guide page id to its slug.
 */
export function slugForChangedFile(path, fieldGuidePages = new Map()) {
  // A blog post's metadata file: src/content/blogs/posts/<YYYY-MM-DD>-<slug>.ts
  const post = /^src\/content\/blogs\/posts\/\d{4}-\d{2}-\d{2}-(.+)\.ts$/.exec(path);
  if (post) return post[1];

  // A bilingual fragment: src/content/<section>/<locale>/<basename>.html
  const frag = /^src\/content\/([a-z-]+)\/(?:en|zh)\/(.+)\.html$/.exec(path);
  if (!frag) return null;
  const [, section, basename] = frag;
  if (section === 'field-guide') return fieldGuidePages.get(basename) ?? null;
  return SLUG_SECTIONS.includes(section) ? basename : null;
}

/**
 * Parse `page`/`slug` pairs out of the Field Guide manifest source.
 * Read as text, not imported: the manifest is TypeScript and this runs in plain
 * node inside CI.
 */
export function fieldGuidePageMap(manifestSource) {
  const map = new Map();
  for (const m of manifestSource.matchAll(/page:\s*'([^']+)'\s*,\s*slug:\s*'([^']+)'/g)) {
    map.set(m[1], m[2]);
  }
  return map;
}

/** Every `<loc>` in a sitemap document. */
export function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
}

/**
 * The sitemap URLs affected by `changedFiles`, deduplicated and sorted.
 *
 * A slug matches a URL only as a whole final path segment, so `agent-memory`
 * never matches `.../agent-memory-and-state/`. Every locale that publishes the
 * slug is returned.
 */
export function urlsForChangedFiles(changedFiles, urls, fieldGuidePages = new Map()) {
  const slugs = new Set();
  for (const f of changedFiles) {
    const slug = slugForChangedFile(f, fieldGuidePages);
    if (slug) slugs.add(slug);
  }
  if (slugs.size === 0) return [];
  const hit = new Set();
  for (const url of urls) {
    const path = new URL(url).pathname;
    const seg = path.replace(/\/+$/, '').split('/').pop();
    if (seg && slugs.has(seg)) hit.add(url);
  }
  return [...hit].sort();
}
