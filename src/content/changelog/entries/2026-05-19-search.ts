import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Full-text site search', '全站全文搜索'),
  items: [
    L('Added fast client-side search across the whole wiki, powered by a build-time Pagefind index over the published pages — no server, instant results.',
      '新增覆盖全站的快速客户端搜索，由构建时生成的 Pagefind 索引驱动，直接检索已发布页面——无需服务器，结果即时返回。'),
    L('Open it from the new search control in the header, or with the "/" key (Cmd/Ctrl-K also works); press Esc to close. The search box and assets load only on first use to keep pages light.',
      '可通过页眉新增的搜索入口打开，或按「/」键（Cmd/Ctrl-K 同样可用），按 Esc 关闭。搜索框与相关资源仅在首次使用时加载，保持页面轻量。'),
    L('Search is locale-aware: English pages search English content and Chinese pages search Chinese content, and the search UI is fully bilingual.',
      '搜索按语言区分：英文页面检索英文内容，中文页面检索中文内容，搜索界面也完全双语。'),
    L('Mobile polish: the close control is now a comfortable thumb-sized target, and tapping outside the panel dismisses search just like on desktop.',
      '移动端优化：关闭按钮现已是适合拇指点按的尺寸，点击面板以外区域即可关闭搜索，与桌面端体验一致。'),
  ],
};
export default entry;
