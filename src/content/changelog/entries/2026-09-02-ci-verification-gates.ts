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
      'The new check found real defects on its first runs, which is the point of it — six labels across five diagrams, none of them visible to anyone reviewing on a Mac. The machine the checks run on renders the same webfont three to eight percent wider than macOS does, and by this site’s own traffic figures roughly seven readers in ten are on Windows or Linux. A caption tuned until it just fits on the author’s screen is therefore genuinely clipped for most people who see it, which is what had happened: a caption overlapping its neighbour in the pgvector architecture diagram, and five labels crossing the edge of their drawing, on the posts about rerankers, sandbox billing, an eval-harness disclosure timeline, generative UI, and eval frameworks. All six now sit inside their bounds with room to spare on either platform.',
      '这项检查在最初几次运行中就找出了真实缺陷，而这正是它的意义所在——五张示意图上的六处标签，在 Mac 上复核的人一处也看不见。运行检查的那台机器渲染同一款网页字体时，会比 macOS 宽出百分之三到八；而按本站自己的访问数据，大约每十位读者中有七位使用 Windows 或 Linux。因此一条被调到"刚好放得下"的说明文字，对大多数看到它的人其实是被裁切的——事实正是如此：pgvector 架构图里有一条说明压住了相邻的说明，另有五处标签越出了画面边界，分别在讲重排序模型、沙箱计费、评测平台漏洞披露时间线、生成式 UI 与评测框架的那几篇文章中。现在这六处在两个平台上都稳稳落在边界之内，且留有余量。',
    ),
  ],
};

export default entry;
