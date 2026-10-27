# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Working software engineers who build, or are about to build, agentic AI systems. They usually arrive cold from a Google search on one specific question, read one long technical page on a desktop (about 90% of visits), and need either to understand a concept or to implement something. About 28% of visitors are in China or Singapore, so the Chinese edition is used by real readers, not kept for completeness.

## Product Purpose
Agentic AI Wiki (menuagentic.com) is a bilingual (English / 中文) field guide to building agentic AI: how agents are built, the ecosystem they run on, and what it takes to ship them to production. Success is a reader who lands on one page, gets their answer, and trusts the site enough to read a second page.

## Positioning
Pages are written for engineers and backed by working evidence: measured before/after code, real model runs, and dated sources. Every page exists in both languages with identical code blocks. Sibling pages on one topic take distinct angles instead of repeating each other.

## Operating Context
- About 770 entries per language across seven sections: Field Guide (flagship series, 6 parts / 26 chapters), Concepts (glossary), Deep-Dives, Playbooks, Operations, Books (book-length handbooks) and AI Blog. A Changelog records every change.
- Long pages: blog posts run about 3,000 words, with tables, SVG diagrams, code blocks, FAQ sections and source lists.
- Part of the content is drafted and shipped daily by a scheduled agent; the About page discloses this.
- Readers mostly use Windows (46%) and Linux (25%), so fonts render through FreeType as often as CoreText.

## Capabilities and Constraints
- Astro static site on Vercel; content is HTML fragments rendered into layouts.
- Every page has an English and a Chinese version (`/zh/` prefix). Chinese uses the system CJK font stack; a CJK webfont was measured and declined (0.6–2.2 MB per page).
- Light and dark themes, with a manual toggle.
- Pagefind site search; RSS; llms.txt.
- `npm run test:design` (Playwright on the built site) guards contrast, reading measure, tap targets, overflow and nav reachability, and is a required CI check.
- AdSense space is not a design constraint.

## Brand Commitments
- The name "Agentic AI Wiki" stays.
- The EN / 中文 toggle stays, and every design must work for Chinese text.
- Light and dark themes both stay.

## Evidence on Hand
Real content only: the pages themselves, their diagrams under `public/blogs/`, and Vercel Analytics readings recorded by the maintainer. There are no testimonials, customer logos or press, and none may be invented.

## Product Principles
1. The reader's question comes first: the opening of each page answers or frames it.
2. Show the evidence: code, measurements and sources sit in the page, not behind claims.
3. One language never gets the lesser design.
4. Wayfinding for a cold arrival: a reader dropped onto page 400 knows where they are and where to go next.
5. Long reading stays comfortable: real measure, real contrast, nothing performing behind the text.

## Accessibility & Inclusion
WCAG AA contrast in both themes, enforced by the design test suite; tap targets sized in both dimensions; no horizontal overflow from 375px up.
