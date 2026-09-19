import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-19',
  slug: 'four-reads-and-one-write',
  title: L(
    'Four reads and one write — Google Home MCP gated the half nobody was worried about',
    '四个读与一个写——Google Home MCP 设闸的，是没人担心的那一半',
  ),
  searchTitle: { en: 'Google Home MCP tools and risks explained' },
  summary: L(
    'Google blocked the thing everyone asked about: an agent connected through Home MCP cannot unlock your door. But four of the five tools are reads, and list_home_history hands a third-party agent a queryable record of motion, presence and door events over any window — with no equivalent gate, because nobody has written down what a sensitive read is. Actuation is bounded, legible and reversible. The read side is none of those.',
    '大家追问的那件事，Google 挡住了：通过 Home MCP 接进来的智能体开不了你家的门锁。可五个工具里有四个是读，而 list_home_history 会把一份可查询的记录交到第三方智能体手上——动静、有没有人在家、门什么时候开过，时间窗任它开口；那里没有对应的闸门，因为没人写下过「敏感的读」是什么。执行是有界、可读、可撤销的。读的那一侧，一条都不占。',
  ),
  tags: ['mcp', 'safety', 'ecosystem', 'agentic-ai'],
};

export default post;
