// The <title> for a blog post, which is not the same string as its headline.
//
// The blog's house style is an editorial headline: a searchable subject, a
// colon, and a clause carrying the argument — "LangSmith vs Braintrust vs
// Helicone vs Arize Phoenix: Four Loops the Eval/Observability Stack Was Built
// to Close". That reads well on the page and badly in a result list, where a
// search engine shows roughly 60 characters and the clause pushes the product
// names out of view. Some posts are headline-only with no searchable subject
// at all ("Stripe bought the meter, not the router").
//
// So the <title> tag is derived from the headline rather than equal to it. The
// on-page <h1> is untouched — a reader sees exactly what was written; only the
// browser tab and the result list see this. Where the derivation cannot do
// better than the headline, a post can set `searchTitle` per locale and that
// wins outright.
import type { Locale } from '../i18n/index';

/**
 * Display width in "columns": CJK ideographs and fullwidth punctuation occupy
 * two, everything else one. Search engines truncate on rendered width, not on
 * code points, so a 30-character Chinese title is as wide as a 60-character
 * English one and the two need the same budget.
 */
export function displayWidth(s: string): number {
  let w = 0;
  for (const ch of s) {
    const c = ch.codePointAt(0)!;
    // CJK Unified Ideographs + Extension A, Hiragana/Katakana, Hangul,
    // CJK symbols & punctuation, and the fullwidth forms block.
    const wide =
      (c >= 0x1100 && c <= 0x115f) ||
      (c >= 0x2e80 && c <= 0xa4cf) ||
      (c >= 0xac00 && c <= 0xd7a3) ||
      (c >= 0xf900 && c <= 0xfaff) ||
      (c >= 0xfe30 && c <= 0xfe6f) ||
      (c >= 0xff00 && c <= 0xff60) ||
      (c >= 0xffe0 && c <= 0xffe6) ||
      (c >= 0x20000 && c <= 0x3fffd);
    w += wide ? 2 : 1;
  }
  return w;
}

/** Roughly what a result list shows before truncating. */
const MAX_WIDTH = 60;
/**
 * Below this, a head is a fragment rather than a title — "MCP 2026-07-28",
 * "65% Once, 25% Twenty Times". Keeping the full headline beats promoting a
 * cryptic stub, and posts in that bucket are the ones worth an explicit
 * `searchTitle`.
 */
const MIN_HEAD_WIDTH = 25;

/** The part of a headline before its first colon, in either script. */
function headBeforeColon(title: string): string | null {
  for (const sep of ['：', ': ']) {
    const i = title.indexOf(sep);
    if (i > 0) return title.slice(0, i).trim();
  }
  return null;
}

/**
 * Resolve the <title> for one locale.
 *
 * 1. An explicit `searchTitle` for this locale wins.
 * 2. A headline that already fits is used unchanged.
 * 3. Otherwise the pre-colon head, if it is substantial and actually shorter.
 * 4. Otherwise the headline, truncation and all — there is nothing better to
 *    say without a human writing one.
 */
export function metaTitleFor(
  title: string,
  searchTitle: string | undefined,
  _locale?: Locale,
): string {
  if (searchTitle) return searchTitle;
  if (displayWidth(title) <= MAX_WIDTH) return title;
  const head = headBeforeColon(title);
  if (head && displayWidth(head) >= MIN_HEAD_WIDTH && displayWidth(head) < displayWidth(title)) {
    return head;
  }
  return title;
}
