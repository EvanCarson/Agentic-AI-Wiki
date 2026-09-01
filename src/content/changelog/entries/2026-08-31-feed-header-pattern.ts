import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-31',
  title: L(
    'The English feed was not actually getting the content type the previous entry claimed',
    '英文订阅源其实并没有拿到上一条更新所说的那个内容类型',
  ),
  items: [
    L(
      'The `Content-Type` rule added minutes earlier used one `source` pattern, `/(zh/)?rss.xml`, meaning to cover both feeds. Vercel matched it against `/zh/rss.xml` and **not** against `/rss.xml`, so the Chinese feed got `application/rss+xml; charset=utf-8` and the English one silently kept the default `application/xml` — the half-fixed state is worse than the unfixed one, because the header on one feed makes it look done. Now one literal `source` per feed, with a note in the feed builder against re-folding them. Nothing was broken for readers either way; both feeds parse and always did.',
      '几分钟前加上的 `Content-Type` 规则只用了一个 `source` 模式 `/(zh/)?rss.xml`，本意是覆盖两个订阅源。Vercel 拿它匹配上了 `/zh/rss.xml`，却**没有**匹配 `/rss.xml`，于是中文源拿到了 `application/rss+xml; charset=utf-8`，英文源则悄悄沿用默认的 `application/xml`——这种修了一半的状态比没修更糟，因为其中一个源上的响应头会让人以为已经完事了。现在改为每个订阅源一条字面量 `source`，并在订阅源构建代码里留了注释，提醒不要再把它们合并回去。无论哪种情况，对读者都没有造成影响：两个订阅源都能正常解析，此前也一直可以。',
    ),
  ],
};

export default entry;
