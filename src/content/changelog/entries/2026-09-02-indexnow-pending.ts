import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-02',
  title: L(
    'Two fixes to the new search-engine announcement, both found by watching it actually run',
    '新上线的搜索引擎通知功能的两处修正，都来自真正跑起来之后的观察',
  ),
  items: [
    L(
      'Announcing a changed page to Bing and Yandex requires proving control of the domain, which those engines do by fetching a key file from the site on their own schedule. Until they have, a perfectly correct submission is answered `SiteVerificationNotCompleted` — which is a wait, not a fault, and is exactly what the first announcement after today’s change ran into. The build treated it as a defect and would have gone red on the next publish for a problem that does not exist. It now recognises that specific answer, explains it, and carries on; a key file that is genuinely missing or wrong still fails loudly, because that one is real.',
      '要向 Bing 与 Yandex 通知页面更新，需要先证明本站归你所有，而这些引擎的做法是按它们自己的节奏来抓取站点上的一个密钥文件。在抓取完成之前，一次完全正确的提交也会得到 `SiteVerificationNotCompleted` 的回应——这是等待，不是故障，而今天这项改动之后的第一次通知遇到的正是它。此前构建会把它当成缺陷，于是下一次发布就会因为一个并不存在的问题而变红。现在它能识别这个特定回应、把原因说清楚，然后继续；而密钥文件确实缺失或有误时，仍然会明确报错，因为那才是真正的问题。',
    ),
    L(
      'The announcement was also, on its first real run, doing nothing at all — and saying so in a way that read like success. The step compares a push against the one before it to work out which pages changed, but the build checks out only the single newest commit, so that comparison had nothing to compare against. It gave up quietly and reported no work to do, which is indistinguishable from a push that genuinely changed no pages. The build now checks out the full history, and a comparison that cannot be made is treated as a fault and stops the run, because the alternative is a feature that silently never fires.',
      '这项通知功能在第一次真正运行时其实什么也没做——而且它"报告"的方式看起来还像是成功。该步骤会把本次推送与上一次作比较，从而算出哪些页面发生了变化；但构建时只检出了最新的那一个提交，于是这个比较根本无从比起。它安静地放弃了，并报告"无事可做"，而这与"本次推送确实没有改动任何页面"看起来一模一样。现在构建会检出完整历史，并且把"无法完成比较"当作故障、直接中断运行——因为另一种选择，是一个永远悄悄不触发的功能。',
    ),
  ],
};

export default entry;
