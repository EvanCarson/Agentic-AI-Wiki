import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-16',
  slug: 'target-selection-just-became-free',
  title: L(
    'Target selection just became free — 395 organisations, 48 countries, one operator',
    '挑目标这件事刚刚变成了免费的——395 家组织、48 个国家、一名操作者',
  ),
  summary: L(
    'GreyNoise published a PaperCut campaign that ran hundreds of AI agents in parallel and reached 440 servers at 395 organisations in 48 countries, 11 of them inside the first 26 seconds. The speed is not the finding. The finding is that choosing who to attack now costs the same as choosing one — which deletes the obscurity discount every mid-size security programme has been quietly spending, and puts the least-resourced sector, education, at the front of the list with 204 victims.',
    'GreyNoise 公布了一起针对 PaperCut 的行动：数百个 AI 智能体并行运行，触及 48 个国家、395 家组织的 440 台服务器，其中 11 家是在头 26 秒内被拿下的。速度不是这里的发现。真正的发现是：如今「挑谁下手」的成本，和只挑一个是一样的——这抹掉了每一个中型安全项目一直在悄悄花用的那笔「无人问津折扣」，并把资源最少的那个部门——教育——顶到了名单最前面：204 家受害者。',
  ),
  tags: ['safety', 'agentic-ai', 'governance', 'ecosystem'],
};

export default post;
