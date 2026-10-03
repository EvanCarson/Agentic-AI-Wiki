import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-03',
  slug: 'same-weights-different-refusals',
  title: L(
    'Same weights, different refusals: Argon ships its guardrails as an entitlement',
    '同样的权重，不同的拒答：Argon 把护栏做成了一项授权',
  ),
  searchTitle: {
    en: 'Same weights, different refusals',
  },
  summary: L(
    'Google released Gemini 4 Argon to vetted Fairwind defenders with the cyber guardrails switched off, enforced by org verification, phishing-resistant MFA, team-scoped access and per-employee usage records. That is the first version of capability gating that could actually hold — and it means a model identifier no longer names a behaviour.',
    '谷歌把 Gemini 4 Argon 交给 Fairwind 项目中通过审核的防御方，并关掉了网络安全护栏；约束靠的是组织资质核验、抗钓鱼多因素认证、按团队限定的访问范围，以及按员工留存的使用记录。这是能力门控第一次做成了可能真正守得住的样子——而它同时意味着：一个模型标识符不再指称一种行为。',
  ),
  tags: ['frontier-models', 'safety', 'evals', 'governance', 'cost'],
};

export default post;
