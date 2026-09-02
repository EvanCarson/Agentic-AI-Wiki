import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-02',
  title: L(
    'The new IndexNow announcement waits for the search engines to fetch its key, instead of reporting a failure',
    '新的 IndexNow 通知会等待搜索引擎来取密钥文件，而不再把这种等待报成失败',
  ),
  items: [
    L(
      'Announcing a changed page to Bing and Yandex requires proving control of the domain, which those engines do by fetching a key file from the site on their own schedule. Until they have, a perfectly correct submission is answered `SiteVerificationNotCompleted` — which is a wait, not a fault, and is exactly what the first announcement after today’s change ran into. The build treated it as a defect and would have gone red on the next publish for a problem that does not exist. It now recognises that specific answer, explains it, and carries on; a key file that is genuinely missing or wrong still fails loudly, because that one is real.',
      '要向 Bing 与 Yandex 通知页面更新，需要先证明本站归你所有，而这些引擎的做法是按它们自己的节奏来抓取站点上的一个密钥文件。在抓取完成之前，一次完全正确的提交也会得到 `SiteVerificationNotCompleted` 的回应——这是等待，不是故障，而今天这项改动之后的第一次通知遇到的正是它。此前构建会把它当成缺陷，于是下一次发布就会因为一个并不存在的问题而变红。现在它能识别这个特定回应、把原因说清楚，然后继续；而密钥文件确实缺失或有误时，仍然会明确报错，因为那才是真正的问题。',
    ),
  ],
};

export default entry;
