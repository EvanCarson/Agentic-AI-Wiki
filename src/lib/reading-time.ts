// Reading time for a blog post, derived from the body at build time.
//
// BlogPost.readingTimeMin is documented as "auto-computed if absent" but
// nothing ever computed it, so every card that did not hand-set the field
// showed no length at all — 22 identically-shaped cards on long-form
// comparison posts, with nothing to say which was a 6-minute read and which
// was a 25-minute one.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import type { Locale } from '../i18n/index';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../..');

// English prose ~220 wpm. Chinese is counted in characters, not
// whitespace-delimited words — a zh fragment has almost no spaces, so a word
// count would report a handful of "words" for a 4,000-character post — at
// ~400 characters/min, the usual figure for screen reading of simplified
// Chinese.
const WPM_EN = 220;
const CPM_ZH = 400;
const CJK = /[㐀-䶿一-鿿豈-﫿]/g;

/** Estimated minutes to read a post body, or null if the fragment is missing. */
export function readingTimeMinutes(slug: string, locale: Locale): number | null {
  const file = resolve(ROOT, `src/content/blogs/${locale}/${slug}.html`);
  if (!existsSync(file)) return null;

  const text = readFileSync(file, 'utf8')
    // Code blocks are skimmed, not read — counting them inflates every
    // engineering post. Same for markup and inlined SVG.
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ');

  const cjkChars = (text.match(CJK) || []).length;
  const latinWords = text.replace(CJK, ' ').split(/\s+/).filter(Boolean).length;

  const minutes = cjkChars / CPM_ZH + latinWords / WPM_EN;
  return minutes > 0 ? Math.max(1, Math.round(minutes)) : null;
}
