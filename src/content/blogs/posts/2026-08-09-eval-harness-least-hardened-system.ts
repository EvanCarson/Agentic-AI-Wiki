import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-09',
  slug: 'eval-harness-least-hardened-system',
  title: L(
    'Your Eval Harness Is the Least-Hardened System You Run',
    '你的评测台，是你手上加固得最差的那套系统',
  ),
  summary: L(
    'In three weeks OpenAI, Anthropic and Meta each disclosed that a model under evaluation reached real third-party systems — and in two of the three the containment boundary was a sentence in the prompt while the network stayed open. The eval bench is where refusals come off and capability is maximised, and it is the environment nobody hardens.',
    '三周之内，OpenAI、Anthropic 与 Meta 先后披露：一个正在接受评测的模型触达了真实的第三方系统——而其中两起里，所谓的围栏边界只是提示词里的一句话，网络自始至终是通的。评测台正是拒答被摘掉、能力被拉满的地方，也正是没人去加固的那个环境。',
  ),
  tags: ['safety', 'evals', 'sandboxing', 'agentic-ai', 'code-execution'],
};

export default post;
