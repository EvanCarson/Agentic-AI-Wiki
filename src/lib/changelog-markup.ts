// Inline markup for changelog bullets.
//
// Entries have always been authored with a small markdown dialect — `code`
// spans for paths and identifiers, *emphasis* for page titles — but the view
// rendered them as a plain text node, so readers saw the punctuation instead
// of the formatting: literal backticks and asterisks, 481 spans of them.
//
// The bigger cost was the paths. `/blogs/some-post` names a real page, appears
// 38 times across the entries, and was inert text on what analytics say is the
// site's fourth most-visited page. A changelog whose whole job is announcing
// new pages linked to none of them.
//
// This is deliberately not a markdown library. It supports exactly the two
// constructs the entries actually use; anything else stays literal, which is
// the safe direction for text rendered with set:html.
// Extension-ful specifier: this is the first lib here to import a *value*
// rather than only types from i18n, and node --test resolves ESM strictly
// where Vite does not. `src/content/blogs/manifest.ts` uses the same form.
import type { Locale } from '../i18n/index.ts';
import { localizeHref } from '../i18n/index.ts';

const SECTION = 'blogs|concepts|deep-dives|playbooks|operations|field-guide';
/** A code span that names a page on this site, and so should also be a link. */
const SITE_PATH = new RegExp(`^/(?:${SECTION})/[A-Za-z0-9][A-Za-z0-9/_-]*$`);

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * `*text*` -> `<em>text</em>`.
 *
 * The guards keep it off `2 * 3 * 4` and off the middle of an identifier. Runs
 * only on non-code segments, so an asterisk inside a code span is never touched.
 */
function emphasise(escaped: string): string {
  return escaped.replace(/(?<![\w*])\*([^*\n]{1,200}?)\*(?![\w*])/g, '<em>$1</em>');
}

/**
 * Render one bullet to HTML.
 *
 * Input is escaped first and every tag is added afterwards, so an entry can
 * never inject markup — worth stating explicitly because the result is handed
 * to `set:html`, and because entries are written unattended by the daily
 * routine.
 */
export function renderChangelogItem(text: string, locale: Locale): string {
  // Odd indices are the insides of backtick pairs. An unmatched trailing
  // backtick leaves an even-length array; that last segment is literal text,
  // and its backtick has to come back.
  const parts = text.split('`');
  const unmatched = parts.length % 2 === 0;
  return parts
    .map((part, i) => {
      const escaped = escapeHtml(part);
      // Only the dangling final segment gets its backtick back. A normal
      // segment sitting after a *closed* code span must not.
      if (unmatched && i === parts.length - 1) return emphasise(`\`${escaped}`);
      if (i % 2 === 0) return emphasise(escaped);
      if (SITE_PATH.test(part)) {
        const href = escapeHtml(localizeHref(part, locale));
        return `<a href="${href}"><code>${escaped}</code></a>`;
      }
      return `<code>${escaped}</code>`;
    })
    .join('');
}
