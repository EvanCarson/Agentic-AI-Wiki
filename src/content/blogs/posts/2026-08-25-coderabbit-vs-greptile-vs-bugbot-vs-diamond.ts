import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-25',
  slug: 'coderabbit-vs-greptile-vs-bugbot-vs-diamond',
  title: L(
    'CodeRabbit vs Greptile vs Bugbot vs Diamond: You Are Buying a Comment Budget',
    'CodeRabbit vs Greptile vs Bugbot vs Diamond：你买的是一份评论预算',
  ),
  summary: L(
    'Bugbot dropped its seat for per-review billing in June, Greptile bills a dollar past fifty reviews, CodeRabbit still sells a capped seat, and Diamond has no price at all because it arrives with Graphite — which Cursor now owns, alongside Bugbot. Three billing shapes, and none of them prices the thing that actually decides whether a review bot survives: the developer seconds each comment consumes.',
    '6 月，Bugbot 取消按席位收费改为按次计费；Greptile 在 50 次评审之后每次加收 1 美元；CodeRabbit 仍在卖带上限的席位；而 Diamond 干脆没有单独定价，因为它随 Graphite 一起来——如今 Graphite 和 Bugbot 都归 Cursor。三种计费形态，却没有一种给真正决定评审机器人生死的东西定价：每条评论所消耗的开发者秒数。',
  ),
  tags: ['agent-comparison', 'coding-agents', 'developer-tools', 'cost', 'evals'],
};

export default post;
