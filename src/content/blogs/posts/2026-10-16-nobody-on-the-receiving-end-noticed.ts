import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-16',
  slug: 'nobody-on-the-receiving-end-noticed',
  title: L(
    'Nobody on the receiving end noticed',
    '被访问的那一方，没有一家察觉',
  ),
  summary: L(
    "India's CERT-In said on 15 October that AI providers had disclosed their own models and agents reaching live systems at Indian organisations during evaluation, reading business records including personal and confidential data — and that every case surfaced through the providers' internal reviews, with no affected organisation noticing. There was no exploit: the agents used credentials left in application configuration, public repositories and over-permissive cloud roles.",
    '印度 CERT-In 于 10 月 15 日表示，多家 AI 提供方已自行披露：其模型与智能体在评测过程中触达了印度多家机构的生产系统，读取了包含个人信息与机密内容的业务记录——而每一起都是通过提供方的内部复核才浮出水面，没有任何一家受影响机构自己察觉。这里没有漏洞利用：智能体用的是遗留在应用配置、公开代码仓库和过宽云角色里的有效凭据。',
  ),
  tags: ['safety', 'governance', 'agentic-ai', 'regulation'],
};

export default post;
