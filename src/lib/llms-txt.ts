// A generated llms.txt (https://llmstxt.org) for each locale.
//
// AI assistants already send this site readers — gemini.google.com and
// claude.ai are both in the referrer list — and a model deciding which of
// ~490 pages to fetch for a question had nothing to decide with: the sitemap is
// bare URLs and the HTML is heavy. The manifests hold exactly what that decision
// needs, a title and a one-line summary per page in both languages, so this
// module lays them out in the convention such tools read. Generated at build
// time, it extends itself every time the daily routine publishes.
//
// Format: H1, a blockquote summary, a couple of plain paragraphs, then one `##`
// section per content *group* (not per section — the group is the only cluster
// signal the file carries, and it lets a reader skip a cluster whole), each a
// list of `- [title](url): note`. The closing `## Optional` heading is a keyword
// with defined meaning in the convention ("skip when context is short"), so it
// stays in English in both editions.
//
// The bilingual strings live here rather than in `src/i18n/ui.ts`: that module
// imports without file extensions and cannot load under `node --test`, and the
// blurb is specific to this file anyway. The section names are copied from the
// nav strings — keep them equal.
//
// Routes: `src/pages/llms.txt.ts` (en) and `src/pages/zh/llms.txt.ts` (zh),
// fed by `src/lib/llms-sources.ts`. The manifests are passed in rather than
// imported so this stays a pure function testable over fixtures — they are
// Vite `import.meta.glob` modules and only exist inside a build.
import type { Locale, Localized } from '../i18n/index.ts';
import { localizeHref } from '../i18n/index.ts';
import type { BlogPost } from '../content/blogs/types.ts';

/** A manifest entry as Concepts and the grouped sections carry it. */
export interface CatalogEntry { slug: string; title: Localized; summary: Localized; group?: Localized }
/** A Deep-Dives / Playbooks / Operations group: URL key, display name, entries. */
export interface CatalogGroup { key: string; name: Localized; entries: CatalogEntry[] }
/** A Field Guide part and its numbered chapters. */
export interface CatalogPart { name: Localized; chapters: { slug: string; num: string; title: Localized }[] }

/** Everything the file is built from. `posts` must be newest-first. */
export interface Sources {
  concepts: CatalogEntry[];
  deepDives: CatalogGroup[];
  playbooks: CatalogGroup[];
  operations: CatalogGroup[];
  fieldGuide: CatalogPart[];
  posts: BlogPost[];
}

/** One `- [title](url): note` line. `path` is site-relative or an absolute URL. */
export interface LlmsLink { title: string; path: string; note?: string }
export interface LlmsSection { heading: string; links: LlmsLink[] }
export interface LlmsDoc {
  title: string;
  summary: string;
  details: string[];
  sections: LlmsSection[];
  optional: LlmsLink[];
}

const REPO_URL = 'https://github.com/EvanCarson/Agentic-AI-Wiki';

interface Strings {
  title: string;
  sections: { concepts: string; deepDives: string; playbooks: string; operations: string; fieldGuide: string; blog: string };
  /** Between a section name and its group name in a heading. */
  sep: string;
  summary: (pages: number) => string;
  details: string[];
  /** A blog note: the summary plus the post's date. */
  dated: (summary: string, date: string) => string;
  optional: {
    edition: { title: string; note: string };
    feed: string;
    changelog: { title: string; note: string };
    about: { title: string; note: string };
    source: string;
  };
}

const STRINGS: Record<Locale, Strings> = {
  en: {
    title: 'Agentic AI Wiki',
    sections: { concepts: 'Concepts', deepDives: 'Deep-Dives', playbooks: 'Playbooks', operations: 'Operations', fieldGuide: 'Field Guide', blog: 'AI Blog' },
    sep: ': ',
    summary: n => `An open, bilingual (English / 简体中文) knowledge base on building agentic AI: a plain-language Concepts encyclopedia, engineering Deep-Dives, applied Playbooks, production Operations, a numbered Field Guide, and a long-form AI Blog. ${n} pages in each language, updated daily.`,
    details: [
      'Every page listed here also exists in Simplified Chinese at the same path under /zh/; the Chinese edition of this file is linked under Optional. Pages are plain HTML articles, and the URL with a trailing slash is the canonical form.',
      'A scheduled AI agent drafts part of this site. The About page says how, and every batch it publishes is itemised in the changelog.',
    ],
    dated: (s, d) => `${s} (${d})`,
    optional: {
      edition: { title: 'Chinese edition (简体中文)', note: 'the same index with Chinese titles and summaries, pointing at the /zh/ pages' },
      feed: 'AI Blog RSS feed',
      changelog: { title: 'Changelog', note: 'what changed, newest first' },
      about: { title: 'About', note: 'what the site covers, who maintains it, and how it is written' },
      source: 'Source on GitHub',
    },
  },
  zh: {
    title: 'Agentic AI Wiki',
    sections: { concepts: '概念', deepDives: '深度剖析', playbooks: '实战手册', operations: '运维', fieldGuide: '实战指南', blog: 'AI 博客' },
    sep: '：',
    summary: n => `一个开放的双语（English / 简体中文）知识库，专注于如何把智能体 AI 构建好：白话的概念百科、工程向的深度剖析、应用向的实战手册、面向生产环境的运维、按序编排的实战指南，以及长文形式的 AI 博客。每种语言各 ${n} 个页面，每日更新。`,
    details: [
      '这里列出的每个页面都有英文版，位于去掉 /zh/ 前缀的相同路径；本文件的英文版链接在 Optional 一节。页面为普通 HTML 文章，带末尾斜杠的 URL 是规范形式。',
      '本站有一部分内容由一个定时运行的 AI 智能体起草。"关于"页说明了它如何工作，它发布的每一批内容都逐条记录在更新日志中。',
    ],
    dated: (s, d) => `${s}（${d}）`,
    optional: {
      edition: { title: 'English edition', note: '同一份索引的英文版：英文标题与摘要，指向不带 /zh/ 前缀的页面' },
      feed: 'AI 博客 RSS 订阅',
      changelog: { title: '更新日志', note: '本站的变更记录，按时间倒序' },
      about: { title: '关于', note: '本站涵盖什么、由谁维护，以及如何写成' },
      source: 'GitHub 源码仓库',
    },
  },
};

/** Lay the manifests out as sections, in reading order, for one locale. */
export function catalogFor(locale: Locale, s: Sources): LlmsDoc {
  const t = STRINGS[locale];
  const href = (path: string) => localizeHref(path, locale);
  const heading = (section: string, group: string) => (group ? `${section}${t.sep}${group}` : section);
  const sections: LlmsSection[] = [];

  // Concepts: bucket by the exact group string in order of first appearance —
  // the same merge semantic as the index's groupedEntries(). A mislabelled
  // group forks a heading here exactly as it does there, which is a second
  // place to notice it, not something to smooth over.
  const buckets = new Map<string, LlmsLink[]>();
  for (const e of s.concepts) {
    const group = e.group?.[locale] ?? '';
    let bucket = buckets.get(group);
    if (!bucket) buckets.set(group, (bucket = []));
    bucket.push({ title: e.title[locale], path: href(`/concepts/${e.slug}/`), note: e.summary[locale] });
  }
  for (const [group, links] of buckets) sections.push({ heading: heading(t.sections.concepts, group), links });

  // Deep-Dives, Playbooks, Operations: URLs carry the group key as a segment.
  const grouped = (label: string, section: string, groups: CatalogGroup[]) => {
    for (const g of groups) {
      sections.push({
        heading: heading(label, g.name[locale]),
        links: g.entries.map(e => ({ title: e.title[locale], path: href(`/${section}/${g.key}/${e.slug}/`), note: e.summary[locale] })),
      });
    }
  };
  grouped(t.sections.deepDives, 'deep-dives', s.deepDives);
  grouped(t.sections.playbooks, 'playbooks', s.playbooks);
  grouped(t.sections.operations, 'operations', s.operations);

  // Field Guide: a numbered curriculum with no per-chapter summary.
  for (const p of s.fieldGuide) {
    sections.push({
      heading: heading(t.sections.fieldGuide, p.name[locale]),
      links: p.chapters.map(c => ({ title: `${c.num} · ${c.title[locale]}`, path: href(`/field-guide/${c.slug}/`) })),
    });
  }

  // AI Blog: newest first, dated — a post is a dated argument and the date is
  // the one fact its summary omits.
  sections.push({
    heading: t.sections.blog,
    links: s.posts.map(p => ({ title: p.title[locale], path: href(`/blogs/${p.slug}/`), note: t.dated(p.summary[locale], p.date) })),
  });

  const other: Locale = locale === 'en' ? 'zh' : 'en';
  const optional: LlmsLink[] = [
    { title: t.optional.edition.title, path: localizeHref('/llms.txt', other), note: t.optional.edition.note },
    { title: t.optional.feed, path: href('/rss.xml') },
    { title: t.optional.changelog.title, path: href('/changelog/'), note: t.optional.changelog.note },
    { title: t.optional.about.title, path: href('/about/'), note: t.optional.about.note },
    { title: t.optional.source, path: REPO_URL },
  ];

  const pages = sections.reduce((n, sec) => n + sec.links.length, 0);
  return { title: t.title, summary: t.summary(pages), details: t.details, sections, optional };
}

/** Collapse any whitespace run (a summary may wrap in its manifest) to one space. */
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();
/** A `]` in a link title would end the link early; escape both brackets. */
const escapeTitle = (s: string) => oneLine(s).replace(/[[\]]/g, m => `\\${m}`);

function linkLine(l: LlmsLink, site: URL): string {
  const url = new URL(l.path, site).toString();
  return `- [${escapeTitle(l.title)}](${url})${l.note ? `: ${oneLine(l.note)}` : ''}`;
}

/** Render the document model as llms.txt Markdown, with a trailing newline. */
export function renderLlmsTxt(doc: LlmsDoc, site: URL): string {
  const out: string[] = [`# ${doc.title}`, '', `> ${oneLine(doc.summary)}`, ''];
  for (const d of doc.details) out.push(oneLine(d), '');
  for (const s of doc.sections) out.push(`## ${s.heading}`, '', ...s.links.map(l => linkLine(l, site)), '');
  out.push('## Optional', '', ...doc.optional.map(l => linkLine(l, site)), '');
  return out.join('\n');
}

export function buildLlmsTxt(locale: Locale, site: URL, sources: Sources): string {
  return renderLlmsTxt(catalogFor(locale, sources), site);
}

/**
 * Applies under `astro dev` only; a static build discards endpoint headers.
 * In production Vercel serves `.txt` as `text/plain; charset=utf-8` on its
 * own (verified against /robots.txt), so unlike the feeds this needs no
 * `vercel.json` rule.
 */
export const LLMS_HEADERS = { 'Content-Type': 'text/plain; charset=utf-8' };
