import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-03',
  slug: 'atlas-shutdown-three-surfaces',
  title: L(
    'Atlas Shuts Down on 9 August. Agentic Browsing Just Split Into Three.',
    'Atlas 将于 8 月 9 日关停：智能体浏览就此一分为三',
  ),
  summary: L(
    'OpenAI is retiring the ChatGPT Atlas browser nine months after launch and moving its capabilities into a Chrome extension, an in-app browser and a server-side cloud browser. That is not a retreat from agentic browsing — it is the admission that a browser agent never needed a browser. What it needed was proximity to an authenticated session, and the three replacement surfaces are three different answers to whose session it borrows.',
    'OpenAI 将在上线九个月后关停 ChatGPT Atlas 浏览器，把它的能力拆进一个 Chrome 扩展、一个应用内浏览器与一个服务端云浏览器。这不是从智能体浏览撤退——这是承认浏览器智能体从来不需要一个浏览器。它需要的是贴近一个已登录的会话，而这三个替代形态，正是"借用谁的会话"这个问题的三个不同答案。',
  ),
  tags: ['browser-agents', 'computer-use', 'ecosystem', 'prompt-injection'],
};

export default post;
