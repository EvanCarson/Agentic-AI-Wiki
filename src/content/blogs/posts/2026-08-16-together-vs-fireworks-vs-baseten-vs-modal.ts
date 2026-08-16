import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-16',
  slug: 'together-vs-fireworks-vs-baseten-vs-modal',
  title: L(
    'Together vs Fireworks vs Baseten vs Modal: Agents Break Per-Token Pricing',
    'Together、Fireworks、Baseten 与 Modal：智能体压垮了按 token 计价',
  ),
  summary: L(
    'A chat product needs several hundred concurrent users before a dedicated GPU beats per-token pricing; an agent needs about a dozen workers, because it re-sends its whole context every step. That arithmetic — not the price per million tokens — is what should decide which of these four you build on.',
    '聊天产品要有好几百个并发用户，专用 GPU 才划得过按 token 计价；智能体只需要十来个工作单元，因为它每一步都要把整个上下文重发一遍。真正该决定你在这四家里选谁的，是这道算术题，而不是每百万 token 的单价。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'cost', 'self-hosted', 'open-source'],
};

export default post;
