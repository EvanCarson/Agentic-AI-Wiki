import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-23',
  slug: 'the-pipeline-was-real-the-fork-was-not',
  title: L(
    'The pipeline was real, the fork was not',
    '流水线是真的，那个 fork 不是',
  ),
  summary: L(
    "LiteLLM's malicious 1.107.0 was built by LiteLLM's own release workflow, run against a fork whose name differs by one hyphen. Build provenance attests the pipeline that ran, not the source it read, so the control most teams adopted this year would have signed this artefact. Only a digest you already hold refuses bytes you have never reviewed.",
    'LiteLLM 那个恶意的 1.107.0，是由 LiteLLM 自己的发布工作流构建的——只不过它读的是一个名字只差一个连字符的 fork。构建来源证明（provenance）证明的是「哪条流水线跑过」，而不是「它读了哪份源码」，所以今年多数团队采纳的那道控制，会给这件制品签上名。只有一个你手里已经有的摘要，才会拒绝你从未审阅过的字节。',
  ),
  tags: ['safety', 'infrastructure', 'open-source', 'ecosystem', 'agentic-ai'],
};

export default post;
