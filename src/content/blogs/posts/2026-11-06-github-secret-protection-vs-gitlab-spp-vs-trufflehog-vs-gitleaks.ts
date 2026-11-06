import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-06',
  slug: 'github-secret-protection-vs-gitlab-spp-vs-trufflehog-vs-gitleaks',
  title: L(
    'GitHub Secret Protection vs GitLab push protection vs TruffleHog vs Gitleaks',
    'GitHub Secret Protection、GitLab 推送保护、TruffleHog 与 Gitleaks 之辨',
  ),
  summary: L(
    'Only two of the four can refuse a push, and all four fail open — so the real choice is not which detector finds more, it is which failure you can see. GitLab publishes its skip thresholds as numbers (1 MiB, 3,150 paths, 350,000 lines), GitHub charges $19 per active committer for the paid half, TruffleHog is the only one that tells you whether a found secret is still live, and Gitleaks has stopped taking new rules.',
    '四者之中只有两个能拒绝一次推送，而四者都会失败放行——所以真正的选择不是哪个检测器找得更多，而是哪种失败你看得见。GitLab 把自己的跳过阈值写成了数字（1 MiB、3,150 个路径、350,000 行），GitHub 的付费那半按每位活跃提交者每月 19 美元收费，TruffleHog 是唯一会告诉你找到的密钥是否仍然有效的那个，而 Gitleaks 已经不再接收新规则。',
  ),
  tags: ['agent-comparison', 'safety', 'developer-tools', 'open-source'],
};

export default post;
