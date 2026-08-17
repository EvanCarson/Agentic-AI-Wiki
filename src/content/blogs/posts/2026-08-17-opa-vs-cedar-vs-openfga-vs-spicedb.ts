import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-17',
  slug: 'opa-vs-cedar-vs-openfga-vs-spicedb',
  title: L(
    'OPA vs Cedar vs OpenFGA vs SpiceDB: who is trusted to supply the facts',
    'OPA、Cedar、OpenFGA 与 SpiceDB：谁有资格提供那些事实',
  ),
  summary: L(
    'All four can express the policy. Only two of them answer without the caller supplying the facts — and when the caller is an agent reading attacker-controlled text, that is the entire security property. The second question is the check budget: an agent makes dozens of authorization calls per task, and filtering a retrieval set makes thousands.',
    '四者都能表达同一条策略。但只有其中两个不需要调用方提供事实就能作答——而当调用方是一个正在读攻击者可控文本的智能体时，这就是全部的安全性质所在。第二个问题是检查预算：智能体每个任务要发出几十次授权调用，而过滤一次检索结果要发出上千次。',
  ),
  tags: ['agent-comparison', 'open-source', 'safety', 'infrastructure'],
};

export default post;
