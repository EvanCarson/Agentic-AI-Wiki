import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-03',
  slug: 'the-safety-disclosure-is-the-knowledge-element',
  title: L(
    'The safety disclosure is the knowledge element',
    '那份安全披露，就是「明知」要件',
  ),
  searchTitle: {
    en: 'The safety disclosure is the knowledge element',
  },
  summary: L(
    'A bill announced on 1 October would make an agent operator criminally liable under the CFAA, and a developer liable for shipping without reasonable safeguards when it knew the agent could hack. OpenAI published exactly that knowledge on 1 September. The frontier safety frameworks were written to earn trust; as drafted, they also date-stamp the mental state.',
    '10 月 1 日宣布的一项法案，将让智能体的运营方按《计算机欺诈与滥用法》承担刑事责任，并让开发方在「明知该智能体具备入侵能力却未采取合理防护措施」时担责。而 OpenAI 在 9 月 1 日恰好把那份「明知」公开写了下来。前沿安全框架本是为换取信任而写的；就目前的措辞，它们同时给主观状态盖上了日期章。',
  ),
  tags: ['regulation', 'governance', 'safety', 'frontier-models', 'agentic-ai'],
};

export default post;
