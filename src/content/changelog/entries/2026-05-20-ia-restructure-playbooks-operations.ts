import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-20',
  title: L(
    'Restructured site IA — added Playbooks and Operations sections',
    '调整站点信息架构 —— 新增"实战手册"与"运维"板块',
  ),
  items: [
    L(
      'Top nav grows to 7 items: Field Guide / Concepts / Deep-Dives / Playbooks / Operations / Changelog / About.',
      '顶部导航增至 7 项：实战指南 / 概念 / 深度剖析 / 实战手册 / 运维 / 更新日志 / 关于。',
    ),
    L(
      'Deep-Dive essays moved to /<section>/<group>/<slug> URLs (group is now in the URL); old /deep-dives/<slug> links no longer resolve.',
      '深度剖析文章迁移至 /<section>/<group>/<slug> URL（分组进入 URL）；旧的 /deep-dives/<slug> 链接不再可用。',
    ),
    L(
      'Each section and group now has a dedicated landing page with a thesis line and reading order.',
      '每个板块与分组都有专属落地页，包含主旨说明与阅读顺序。',
    ),
  ],
};
export default entry;
