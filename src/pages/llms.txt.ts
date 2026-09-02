import type { APIContext } from 'astro';
import { buildLlmsTxt, LLMS_HEADERS } from '../lib/llms-txt';
import { SOURCES } from '../lib/llms-sources';

export function GET({ site }: APIContext): Response {
  return new Response(buildLlmsTxt('en', site!, SOURCES), { headers: LLMS_HEADERS });
}
