// Pages open with `<section class="phase">` and its first <h2>. On most pages
// that h2 is the title ("Finance agents."). On ~80 it is a thesis sentence of
// 200-320 characters, written as a hook, while the page's actual title lived
// only in a visually hidden <h1>. Set as a heading, a 300-character sentence
// became the largest thing on the page and the first entry in its contents.
//
// Rather than rewrite those fragments in two languages, the layout decides at
// build time: when the opening h2 is far longer than the entry's own title, the
// title is inserted as the visible <h1> and the sentence becomes a standfirst
// paragraph under it. Pages whose h2 already is the title are left untouched.

const OPENING_H2 = /(<section class="phase">[\s\S]*?)<h2([^>]*)>([\s\S]*?)<\/h2>/;

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** True when the opening heading reads as a sentence, not as this title. */
export function isStandfirst(h2Text: string, title: string): boolean {
  return h2Text.length > Math.max(110, title.length * 1.6);
}

export function withStandfirst(body: string, title: string): { body: string; standfirst: boolean } {
  const m = body.match(OPENING_H2);
  if (!m) return { body, standfirst: false };
  const text = m[3].replace(/<[^>]+>/g, '').trim();
  if (!isStandfirst(text, title)) return { body, standfirst: false };
  const swapped = `${m[1]}<h1 class="phase-title">${escapeHtml(title)}</h1><p class="standfirst">${m[3].trim()}</p>`;
  return { body: body.replace(m[0], swapped), standfirst: true };
}
