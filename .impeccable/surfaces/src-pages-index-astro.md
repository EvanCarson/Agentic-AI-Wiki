---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/layouts/DeepDiveLayout.astro","src/layouts/BlogLayout.astro"]
---

## Scope and mode
Site-wide redesign of Agentic AI Wiki, starting with the home page and the article layouts (Deep-Dives, Playbooks, Operations, Concepts, Field Guide, Books, AI Blog). Visitor mode: Read. The home page is a docs index, so it is Read too.

## Audience and job
Working engineers arriving cold from search onto one long page; desktop 90%; 28% China and Singapore. They need the answer, then a reason to read a second page.

## Constraints
Name, EN / 中文 toggle, light and dark themes stay. Chinese uses the system CJK stack. test:design stays a required gate. User chose direction A (Line Map) and asked to keep C's sizing idea: section size drawn from real entry counts.

## Direction contract
THESIS: The wiki is a transit system. Sections are lines, pages are stations with codes (D15), and wayfinding is the design. It refuses the category default of a docs site with boxed cards, tracked uppercase eyebrows and one accent.
OWN-WORLD: White ground, near-black ink, seven line colours (Field Guide red, Books brown, Concepts green, Deep-Dives blue, Playbooks orange, Operations purple, AI Blog teal) used only as line marks, station rings, code pills and a 5px band; never behind running text. Atkinson Hyperlegible Next for everything, its Mono for code and dates. Rounded station rings, 4px line strokes, pill codes. No cards, no eyebrows, no hairline boxes.
STORY: A reader sees which line they are on, which station, what comes before and after, and which stations they have visited; then reads a calm 68ch column; then transfers to a related line.
FIRST VIEWPORT: Home: headline and large search at left; at right the system map, a hub "You are here" with seven lines whose lengths are proportional to entry counts (C's sizing), each ending at its terminus label with name and count. Article: header with line ticks under nav, 5px band in the section colour, breadcrumb, left rail as the group's vertical line diagram (current ringed, visited filled), code pill + title + lede in the column, On this page at right.
FORM: Transit wayfinding system (MTR / SBB), candidate 5 of 7 on my list; raised with C's data-sized planes as line lengths. seed:6b3255c5281e51cd
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
