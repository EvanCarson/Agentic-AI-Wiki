import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-01',
  title: L(
    'Fonts, diagrams and social cards are cached properly instead of being re-checked on every page you open',
    '字体、图表与社交卡片现在会被正确缓存，而不是每打开一个页面就重新校验一次',
  ),
  items: [
    L(
      'Everything served from `public/` was going out with `max-age=0, must-revalidate` — the platform default — so a browser re-checked all of it on every single navigation. That is 22 font files, 16 social cards and 460 diagrams whose contents never change between deploys, each costing a round trip to be told "unchanged". Only the build\'s hashed CSS and JS were cached, because those get the header automatically.',
      '此前从 `public/` 提供的所有文件都带着 `max-age=0, must-revalidate`——这是平台默认值——于是浏览器在每一次页面跳转时都会把它们统统重新校验一遍。那是 22 个字体文件、16 张社交卡片和 460 张图表，它们的内容在两次部署之间根本不会变，却每次都要花一个往返只为被告知「没有变化」。此前只有构建产物中带哈希的 CSS 与 JS 被缓存，因为它们会自动获得该响应头。',
    ),
    L(
      'Fonts are now cached for a year and marked immutable, which is safe because a font file\'s name states exactly what is inside it — family, weight, style and character subset — so a different font is always a different filename. This is what makes self-hosting them actually pay: the first visit fetches them, and every page after that uses what is already on the machine.',
      '字体现在缓存一年并标记为 immutable，这样做是安全的，因为字体文件的名字已经完整说明了它的内容——字体家族、字重、字形与字符子集——所以只要字体不同，文件名必定不同。这正是自托管字体真正开始产生收益的地方：首次访问把它们取回来，此后每一个页面都直接用机器上已有的副本。',
    ),
    L(
      'Diagrams and social cards get an hour of freshness and may then be served from cache while a new copy is fetched in the background. A shorter window than the fonts on purpose: a diagram can be corrected — one was, earlier today — and an hour bounds how long anyone sees the old one. Pages themselves are untouched and still revalidate every time, which is what a site that publishes daily needs.',
      '图表与社交卡片则获得一小时的新鲜期，此后可以先从缓存提供，同时在后台取回新副本。这个窗口刻意比字体短得多：图表是会被修正的——今天早些时候就修了一张——一小时限定了任何人看到旧版本的最长时间。页面本身没有改动，仍然每次都重新校验，这正是一个每天更新的站点所需要的。',
    ),
  ],
};

export default entry;
