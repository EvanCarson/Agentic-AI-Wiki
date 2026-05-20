import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-18',
  title: L('About page & Changelog', '关于页面与更新日志'),
  items: [
    L('Expanded About into a multi-section bilingual page: mission, what\'s covered, who maintains it, and contributing & contact.',
      '将「关于」扩展为多板块双语页面：使命、涵盖内容、维护者，以及贡献与联系方式。'),
    L('Introduced this Changelog, replacing the unused Posts section; the home page now links the latest entries.',
      '引入本「更新日志」，替换未使用的「文章」板块；首页现在链接到最新条目。'),
  ],
};
export default entry;
