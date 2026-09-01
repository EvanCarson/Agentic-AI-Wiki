import type { APIContext } from 'astro';
import { buildFeed, FEED_HEADERS } from '../../lib/rss';

export function GET({ site }: APIContext): Response {
  return new Response(buildFeed('zh', site!), { headers: FEED_HEADERS });
}
