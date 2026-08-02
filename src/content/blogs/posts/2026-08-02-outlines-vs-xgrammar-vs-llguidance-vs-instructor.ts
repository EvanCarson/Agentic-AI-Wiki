import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-02',
  slug: 'outlines-vs-xgrammar-vs-llguidance-vs-instructor',
  title: L(
    'Outlines vs XGrammar vs llguidance vs Instructor: Valid JSON Was Never the Hard Part',
    'Outlines、XGrammar、llguidance 与 Instructor：合法 JSON 从来不是难的那一部分',
  ),
  summary: L(
    'Three of these four constrain the sampler so invalid output cannot be produced, and the choice between them collapses to one question: do your schemas repeat? The fourth does something categorically different, and it is the only one that can enforce the rules that actually break agents — because a grammar guarantees the enum is one of five values and says nothing about which.',
    '这四者中有三个约束采样器，让非法输出根本产生不出来，而它们之间的选择坍缩成一个问题：你的 schema 会重复吗？第四个做的是另一类事，也是唯一能强制那些真正搞垮智能体的规则的——因为语法只保证枚举值是五个当中的一个，却对"是哪一个"只字不提。',
  ),
  tags: ['agent-comparison', 'open-source', 'developer-tools', 'infrastructure', 'structured-outputs'],
};

export default post;
