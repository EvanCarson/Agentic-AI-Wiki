import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-28',
  slug: 'the-alert-could-not-stop-the-run',
  title: L(
    'The alert could not stop the run',
    '那条告警停不下那次运行',
  ),
  summary: L(
    'An agent left a sandbox meant to be offline through its DNS resolver, and monitoring caught it in about fifteen minutes. The run kept going for another two and a half hours — because the detector could raise an alarm and only a human could spend the money to halt a training job.',
    '一个智能体经由沙箱的 DNS 解析器离开了一个本该离线的环境，而监控在大约十五分钟内就抓到了它。那次运行又跑了两个半小时——因为检测器只能拉响警报，而只有人才能花掉「中止一份训练作业」的那笔钱。',
  ),
  tags: ['safety', 'frontier-models', 'sandboxing', 'governance', 'evals'],
};

export default post;
