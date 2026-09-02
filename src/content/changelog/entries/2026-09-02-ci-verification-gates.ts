import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-02',
  title: L(
    'Every change now has to pass the browser-rendered design checks before it can reach the site',
    '任何改动都必须先通过在真实浏览器中渲染的设计检查，才能进入线上站点',
  ),
  items: [
    L(
      'Two of the checks this site is supposed to pass before anything merges — the unit tests and `test:design`, which renders every blog post’s diagrams in a real browser and measures label geometry, colour contrast and line length — ran only on whoever happened to be working. The production build ran the other four. That gap is how a clipped legend caption reached the site with everything green in August. Both now run automatically on every pull request as a required check, and the site’s main branch refuses a merge until they pass, including for the scheduled agent that publishes the daily batch. Its instructions previously allowed it to skip the design check when it could not install a browser; now it hands that check to the automation and waits for the result.',
      '本站规定"合并前必须通过"的检查里，有两项此前只在有人手动跑时才会跑：单元测试，以及 `test:design`——它会在真实浏览器里渲染每篇博客的示意图，测量标签几何、颜色对比度与行宽。生产构建只跑了另外四项。八月那次图例说明被裁切却一路绿灯上线，正是这个缺口造成的。现在这两项会在每个 pull request 上自动运行并成为必需检查，主分支在它们通过之前拒绝合并——对每天发布内容的定时智能体同样适用。它此前的指令允许它在装不上浏览器时跳过设计检查，现在则改为交给自动化运行并等待结果。',
    ),
    L(
      'The new check found a real defect on its first run, which is the point of it: in the pgvector architecture diagram on `/blogs/pgvector-vs-pinecone-vs-weaviate-vs-qdrant`, the `SQL columns` box carried a caption wider than the box itself, and on the Linux machine the checks run on it overlapped the neighbouring caption by half a pixel. On a Mac the same text rendered just clear of it, so the fault was invisible to anyone reviewing locally. The caption is now short enough to sit inside its box on either platform.',
      '这项检查在第一次运行时就找出了一个真实缺陷，而这正是它的意义所在：在 `/blogs/pgvector-vs-pinecone-vs-weaviate-vs-qdrant` 的 pgvector 架构图中，`SQL columns` 方框里的说明文字比方框本身还宽，在运行检查的 Linux 机器上与相邻说明重叠了半个像素。而在 Mac 上同样的文字恰好擦身而过，因此在本地复核的人根本看不出问题。现在这条说明已经缩短到在两个平台上都能落在方框之内。',
    ),
  ],
};

export default entry;
