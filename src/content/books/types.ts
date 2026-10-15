// Shape of a long-form book on the site. One directory per book under
// src/content/books/<slug>/, holding manifest.ts and {en,zh}/<chapter>.html.
// A chapter is listed from the day the book is announced; `status` decides
// whether it has a page yet.
import type { Localized } from '../../i18n/index';

export type ChapterStatus = 'published' | 'planned';

export interface BookChapter {
  /** URL segment, never a number — renumbering must not break links. */
  slug: string;
  /** Display number: '1'..'N' for numbered chapters (contiguous, enforced by test); '' for a preface; 'A','B'… for appendices. */
  num: string;
  title: Localized;
  /** One sentence: the argument the chapter makes. Shown on the landing TOC. */
  summary: Localized;
  status: ChapterStatus;
}

export interface BookPart {
  key: string;
  roman: string;
  name: Localized;
  /** Who the part is for, e.g. "For engineering leaders". */
  audience: Localized;
  chapters: BookChapter[];
}

export interface Book {
  slug: string;
  title: Localized;
  subtitle: Localized;
  /** Landing-page lede: stakes first, takeaway second (CLAUDE.md document-openers rule). */
  pitch: Localized;
  /** "How to read this book" — one item per reader path. */
  howToRead: Localized[];
  parts: BookPart[];
}
