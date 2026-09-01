import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Blog post publication dates, read straight off the `<YYYY-MM-DD>-<slug>.ts`
// filenames under src/content/blogs/posts/ — the same convention the changelog
// test enforces, and the only content date on this site that is machine-readable
// without importing TypeScript into the Astro config.
//
// These become <lastmod> on the blog URLs. Nothing else gets one: Google
// discounts lastmod site-wide once it catches you stamping a build timestamp on
// pages that did not change, so a partial-but-true set beats a complete-but-invented
// one. If the other sections ever carry real per-entry dates, add them here.
const POST_DATES = new Map(
  readdirSync(new URL('./src/content/blogs/posts/', import.meta.url))
    .map(f => /^(\d{4}-\d{2}-\d{2})-(.+)\.ts$/.exec(f))
    .filter(m => m !== null)
    .map(m => [m[2], m[1]]),
);

export default defineConfig({
  site: 'https://menuagentic.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !/\/privacy\/?$/.test(page),
      i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-Hans' } },
      serialize(item) {
        // Matches /blogs/<slug>/ and /zh/blogs/<slug>/, but not /blogs/ or
        // /blogs/tag/<tag>/ — <slug> is a single path segment.
        const slug = /\/blogs\/([a-z0-9-]+)\/?$/.exec(new URL(item.url).pathname)?.[1];
        const date = slug && POST_DATES.get(slug);
        if (date) item.lastmod = new Date(`${date}T00:00:00Z`).toISOString();
        return item;
      },
    }),
  ],
});
