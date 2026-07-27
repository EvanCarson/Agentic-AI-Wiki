// Lead diagram for a blog post — the first hand-authored figure in the post
// body, resolved at build time.
//
// Why this exists: `public/blogs/**` holds 131 hand-authored, token-themed
// SVGs and until now not one of them appeared anywhere outside a post body.
// They are the most ownable visual asset the site has, and every index page
// was pure text.
//
// Why "first figure in the body" rather than a manifest field: the post
// already declares its own lead by putting a figure first, so a hand-typed
// `image:` on 22 posts would be a second source of truth that can disagree
// with the body. Nothing to keep in sync, nothing to forget on a new post.
//
// `logos/` is excluded deliberately — those are 24px vendor marks used inline
// in prose, not figures.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../..');

const FIRST_FIGURE = /<img[^>]*\bsrc="(\/blogs\/[^"]+\.svg)"/g;

/** Path of a post's lead diagram, e.g. "/blogs/<slug>/arch-foo.svg", or null. */
export function leadDiagramPath(slug: string): string | null {
  const fragment = resolve(ROOT, `src/content/blogs/en/${slug}.html`);
  if (!existsSync(fragment)) return null;
  const html = readFileSync(fragment, 'utf8');
  for (const m of html.matchAll(FIRST_FIGURE)) {
    const src = m[1];
    if (src.includes('/logos/')) continue;
    return src;
  }
  return null;
}

/**
 * Inline SVG markup for a post's lead diagram, or null.
 *
 * Inlined rather than referenced with <img> because every one of these SVGs
 * paints through CSS custom properties — `fill: var(--paper-2, #f0ede8)`,
 * `fill: var(--accent, #d4421e)`. An <img> is a separate document that cannot
 * see the page's tokens, so it would freeze on the light-theme fallbacks and
 * render a pale diagram on a near-black page in dark mode. Inline, it themes
 * for free. Same reasoning (and the same helper shape) as BlogLayout's
 * inlineSvgs().
 */
export function leadDiagramSvg(slug: string): string | null {
  const src = leadDiagramPath(slug);
  if (!src) return null;
  const file = resolve(ROOT, `public${src}`);
  if (!existsSync(file)) return null;
  const svg = readFileSync(file, 'utf8')
    .replace(/^\s*<\?xml[^>]*\?>\s*/i, '')
    .trim();
  if (!svg.startsWith('<svg')) return null;
  // The <title>/<desc> inside each SVG already carry the accessible name, and
  // the card's own heading repeats it — so the decorative copy on an index
  // page is hidden from assistive tech to avoid announcing it twice.
  return svg.replace(/<svg\b/, '<svg aria-hidden="true" focusable="false"');
}
