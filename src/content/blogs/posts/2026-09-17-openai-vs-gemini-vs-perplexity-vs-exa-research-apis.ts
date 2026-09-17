import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-17',
  slug: 'openai-vs-gemini-vs-perplexity-vs-exa-research-apis',
  title: L(
    'OpenAI vs Gemini vs Perplexity vs Exa: the research API sells you the loop',
    'OpenAI、Gemini、Perplexity 与 Exa：研究 API 卖给你的是那个循环',
  ),
  summary: L(
    'A search API returns documents and leaves the agent loop in your process. A research API takes the loop, and that is the trade — you stop paying to orchestrate and you stop being able to instrument. The axis nobody tables is what a citation is: three of these four hand back a bibliography the model assembled, and one binds grounding to a field in a schema you defined, with a confidence. Pick on that, not on report quality.',
    '搜索 API 返回的是文档，把智能体循环留在你的进程里。研究 API 把那个循环拿走了——这就是那笔交换：你不必再为编排付钱，也不再能给它插桩。没人列进表格的那根轴是「引用到底是什么」：这四家里有三家交还的是模型自己攒起来的一份参考文献，而有一家把依据绑到了你自己定义的 schema 里的某个字段上，还附了置信度。按这个挑，别按报告好不好读挑。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'rag', 'cost'],
};

export default post;
