import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-19',
  slug: 'the-ad-brought-its-own-agent',
  title: L(
    'The ad brought its own agent — OpenAI split the conversation instead of the ranking',
    '广告自带了一个智能体——OpenAI 分的是对话，不是排序',
  ),
  searchTitle: { en: 'OpenAI Sponsored Agents in ChatGPT explained' },
  summary: L(
    'Everyone predicted a bought ranking; OpenAI bought the conversation instead, and that is the better design — for exactly as long as the two conversations stay apart. Sponsored Agents put an advertiser-operated agent behind a labelled ad slot and keep it out of the assistant\'s answer. But the separation is a property of the session, and what actually moves between the two lanes is claims, carried by the person, with no field anywhere saying a paid party said it first.',
    '所有人都预言会是一个被买下的排序；OpenAI 买下的却是那场对话——而在两场对话还分得开的前提下，这是更好的设计。Sponsored Agents 把一个由广告主运营的智能体放在带标注的广告位后面，并让它待在助手的答案之外。但那份分隔是会话的属性，而真正在两条通道之间移动的是论断：由人带过去，而任何地方都没有一个字段会说「这话是一个付费方先说出来的」。',
  ),
  tags: ['agentic-ai', 'governance', 'ecosystem', 'agent-ux'],
};

export default post;
