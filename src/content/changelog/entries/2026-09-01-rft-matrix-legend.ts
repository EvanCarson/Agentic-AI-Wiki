import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-01',
  title: L(
    'A clipped caption in the RL-platform feature matrix, and the gate that would have caught it',
    '强化学习平台特性矩阵里被裁掉的一句说明，以及本该拦下它的那道关卡',
  ),
  items: [
    L(
      'The legend caption in the feature matrix on `/blogs/prime-intellect-vs-hud-vs-art-vs-openai-rft` shared a line with the Strong/Medium/Weak swatches, starting at x=340 and running 570px wide inside a 900px viewBox — so the last few words were clipped off the right edge at every screen size. It now sits on its own line at the left margin, with the full sentence visible. The wording is unchanged.',
      '`/blogs/prime-intellect-vs-hud-vs-art-vs-openai-rft` 特性矩阵中的图例说明，原本与「强/中/弱」三个色块挤在同一行，从 x=340 起、宽 570px，而 viewBox 只有 900px——于是最后几个词在任何屏幕尺寸下都被右边缘裁掉。现在它独占一行、从左边距起排，整句话完整可见。文字本身没有改动。',
    ),
    L(
      'Why it shipped at all: the production build runs `build`, `verify`, `search:index` and `test:search`, but **not** `test:design` — the suite that measures exactly this class of defect. So a diagram whose labels collide, escape their viewBox, or sit on a filled box can reach production with entirely green CI, which is what happened here. Worth closing, since the daily content batch merges unattended.',
      '它为什么能发出去：生产构建跑的是 `build`、`verify`、`search:index` 与 `test:search`，唯独**没有** `test:design`——而后者正是专门测量这一类缺陷的套件。于是一张标签互相碰撞、跑出 viewBox 或压在填充色块上的图，可以在 CI 全绿的情况下进入生产环境，这次就是如此。考虑到每日内容批次是无人值守合并的，这个缺口值得补上。',
    ),
  ],
};

export default entry;
