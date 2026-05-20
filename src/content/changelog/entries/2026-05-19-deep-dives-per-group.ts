import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Internal: Deep-Dives manifest as one-file-per-group', '内部：「深度剖析」清单改为按分组一文件'),
  items: [
    L('Refactored the Deep-Dives manifest to one file per group under src/content/deep-dives/groups/, aggregated at build time. Concurrent PRs that add new groups no longer collide on this module, matching the changelog refactor.',
      '将「深度剖析」清单重构为 src/content/deep-dives/groups/ 下每个分组一份文件，构建时聚合。同时新增分组的并发 PR 不再在该模块产生冲突，与「更新日志」的重构保持一致。'),
    L('No user-facing change — the Deep-Dives index renders the same groups and entries in the same order; the public manifest API (ENTRIES, entryBySlug, entryTitle, groupedEntries) is preserved.',
      '无用户可见变化——「深度剖析」索引以相同顺序渲染相同的分组与词条；清单的公开 API（ENTRIES、entryBySlug、entryTitle、groupedEntries）保持不变。'),
  ],
};
export default entry;
