// RSS 2.0 feed builder for the AI Blog, one feed per locale.
//
// Hand-rolled rather than pulling in `@astrojs/rss`, matching how the OG cards
// and the reading-time estimate are built here: the whole feed is ~40 lines of
// string assembly and a dependency that renders XML is a dependency to keep
// current for no benefit.
//
// Routes: `src/pages/rss.xml.ts` (en) and `src/pages/zh/rss.xml.ts` (zh).
// Autodiscovery `<link rel="alternate">` tags live in `BaseLayout.astro`.
import { POSTS } from '../content/blogs/manifest';
import type { Locale } from '../i18n/index';
import { localizeHref } from '../i18n/index';
import { ui } from '../i18n/ui';

/** Escape the five XML predefined entities. Applied to every interpolated value. */
function xml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * RFC-822 date for a `YYYY-MM-DD` post date.
 * Posts carry a day, not an instant; anchor at midnight UTC so the feed is
 * byte-stable across rebuilds and across the machine's timezone.
 */
function pubDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

/** Build the complete RSS 2.0 document for one locale. */
export function buildFeed(locale: Locale, site: URL): string {
  const t = ui[locale];
  const abs = (path: string) => new URL(localizeHref(path, locale), site).toString();
  const feedUrl = abs('/rss.xml');

  const items = POSTS.map(post => {
    // Trailing slash on purpose: that is the form the canonical tag and the
    // sitemap use, and a guid that disagrees with the canonical splits the
    // post across two identities for anything that reads both.
    const url = abs(`/blogs/${post.slug}/`);
    return [
      '    <item>',
      `      <title>${xml(post.title[locale])}</title>`,
      `      <link>${xml(url)}</link>`,
      `      <guid isPermaLink="true">${xml(url)}</guid>`,
      `      <pubDate>${pubDate(post.date)}</pubDate>`,
      `      <description>${xml(post.summary[locale])}</description>`,
      ...post.tags.map(tag => `      <category>${xml(tag)}</category>`),
      '    </item>',
    ].join('\n');
  }).join('\n');

  // POSTS is sorted newest-first by the manifest, so [0] is the latest post.
  const latest = POSTS[0];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${xml(t.blog.metaTitle)}</title>`,
    `    <link>${xml(abs('/blogs/'))}</link>`,
    `    <description>${xml(t.blog.metaDesc)}</description>`,
    `    <language>${locale === 'zh' ? 'zh-Hans' : 'en'}</language>`,
    ...(latest ? [`    <lastBuildDate>${pubDate(latest.date)}</lastBuildDate>`] : []),
    `    <atom:link href="${xml(feedUrl)}" rel="self" type="application/rss+xml"/>`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

/**
 * Response headers shared by both feed routes.
 *
 * These apply under `astro dev` only. In a static build the endpoint's Response
 * is written to `dist/rss.xml` and its headers are discarded, so production
 * served whatever the host maps `.xml` to — Vercel's default is
 * `application/xml`. Readers accept that, but the charset is then implicit,
 * which is the wrong thing to leave to chance on a feed that is half Chinese.
 * The production value is pinned by the matching `Content-Type` rule in
 * `vercel.json`; keep the two in step.
 */
export const FEED_HEADERS = { 'Content-Type': 'application/rss+xml; charset=utf-8' };
