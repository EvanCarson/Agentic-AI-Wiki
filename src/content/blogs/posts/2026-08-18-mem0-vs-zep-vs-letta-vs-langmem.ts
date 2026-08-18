import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-18',
  slug: 'mem0-vs-zep-vs-letta-vs-langmem',
  title: L(
    'Mem0 vs Zep vs Letta vs LangMem: the memory benchmark is not the buying decision',
    'Mem0、Zep、Letta 与 LangMem：记忆基准分不是那个采购决策',
  ),
  summary: L(
    'The same product has been reported at 49.0% and at 94.4% on a benchmark with the same name, depending on who ran it and when. Scores cannot arbitrate this category. What actually differs between the four — and what you cannot change after adoption — is who decides what gets remembered, who invalidates it, and whether you can get it back out.',
    '同一个产品，在名字相同的基准上被报出过 49.0% 和 94.4%，取决于谁跑的、什么时候跑的。分数无法为这个品类做裁决。这四者之间真正不同、而且在你采用之后就改不了的，是谁决定什么被记住、谁让它失效，以及你还能不能把它取出来。',
  ),
  tags: ['agent-comparison', 'memory', 'open-source'],
};

export default post;
