import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agentic-ai-wiki.vercel.app',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [mdx(), sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh' } } })],
});
