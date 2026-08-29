import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-29',
  slug: 'claudeforce-runs-in-two-directions',
  title: L(
    'Claudeforce runs in two directions, and only one keeps the record inside Salesforce',
    'Claudeforce 是双向的，而只有一个方向把记录留在 Salesforce 里',
  ),
  summary: L(
    'Salesforce and Anthropic announced one partnership on 26 August 2026 containing two integrations with opposite governance properties. Claude moving into Agentforce keeps the model inside a boundary that already has row-level permissions and an audit log; Salesforce moving into Claude as a plugin moves the session outside it, where the deliberation that produced a write is no longer in the system of record. Both are reasonable products. Buying them as one thing is how a company discovers the difference during its first e-discovery request.',
    '2026 年 8 月 26 日，Salesforce 与 Anthropic 宣布了一项合作，而它内含的两个集成在治理属性上恰好相反。Claude 进入 Agentforce，把模型留在一个已经具备行级权限与审计日志的边界之内；而 Salesforce 以插件形态进入 Claude，则把会话搬到了那个边界之外——在那里，导致一次写入的推敲过程不再位于记录系统之中。两个都是合理的产品。把它们当成一件东西来买，就是一家公司在第一次电子取证请求时才发现两者区别的方式。',
  ),
  tags: ['agentic-ai', 'ecosystem', 'governance'],
};

export default post;
