import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-24',
  slug: 'spire-vs-teleport-vs-iam-roles-anywhere-vs-vault',
  title: L(
    'SPIRE vs Teleport vs IAM Roles Anywhere vs Vault',
    'SPIRE、Teleport、IAM Roles Anywhere 与 Vault 对比',
  ),
  searchTitle: {
    en: 'Workload identity for agents',
  },
  summary: L(
    'All four delete the long-lived key in your agent’s environment variable, and the choice between them comes down to where the trust anchor lives and whether humans and machines need one policy plane. None of them answers the question 2026’s agent incidents are actually about: an SVID proves which process is calling, never which user the turn serves or who wrote the instruction now in the context. Buy the floor, then go buy the second thing.',
    '这四者都能删掉你智能体环境变量里那把长期密钥，而它们之间的取舍归结为：信任锚放在哪儿，以及人与机器是否需要同一个策略平面。它们谁也回答不了 2026 年智能体事故真正在问的那个问题：SVID 证明的是哪个进程在调用，从不证明这一轮在服务哪位用户，也不证明上下文里那条指令是谁写的。先买下这层地板，然后再去买第二样东西。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'safety', 'open-source'],
};

export default post;
