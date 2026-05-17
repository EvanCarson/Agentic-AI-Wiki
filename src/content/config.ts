import { defineCollection, z } from 'astro:content';

// Only `posts` is a managed collection. Field-guide bodies are raw HTML
// imported by glob and driven by manifest.ts (not a content collection).
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
