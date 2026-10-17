// The shelf. Add a book by creating src/content/books/<slug>/manifest.ts and
// listing it here; order here is shelf order.
import type { Book, BookChapter, BookPart } from './types';
import aiDrivenSdlc from './ai-driven-sdlc/manifest';
import lastMile from './last-mile/manifest';

export const BOOKS: Book[] = [aiDrivenSdlc, lastMile];

export function bookBySlug(slug: string): Book | undefined {
  return BOOKS.find(b => b.slug === slug);
}

/** Every chapter in reading order, each carrying its part. */
export function bookChapters(book: Book): (BookChapter & { part: BookPart })[] {
  return book.parts.flatMap(part => part.chapters.map(c => ({ ...c, part })));
}

export function publishedCount(book: Book): number {
  return bookChapters(book).filter(c => c.status === 'published').length;
}
