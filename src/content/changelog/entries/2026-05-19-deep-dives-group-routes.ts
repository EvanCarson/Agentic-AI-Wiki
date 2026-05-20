import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Deep-Dives reorganized into group URLs', '「深度剖析」按分组重组 URL'),
  items: [
    L('Every Deep-Dive essay now lives at /deep-dives/<group>/<slug> (e.g. /deep-dives/architectures-and-patterns/react-pattern) instead of the previous flat /deep-dives/<slug> path.',
      '每篇「深度剖析」文章现在位于 /deep-dives/<分组>/<slug>（例如 /deep-dives/architectures-and-patterns/react-pattern），不再使用原来的扁平 /deep-dives/<slug> 路径。'),
    L('Added group landing pages at /deep-dives/<group>/ that show the group thesis and its essays in reading order.',
      '新增分组首页 /deep-dives/<分组>/，展示该分组的主旨与按阅读顺序排列的文章列表。'),
    L('The /deep-dives/ section index now lists the eight groups as cards (name, summary, essay count) instead of a flat list of essays.',
      '/deep-dives/ 首页现在以卡片形式列出八个分组（名称、简介、文章数），不再是扁平的文章列表。'),
  ],
};
export default entry;
