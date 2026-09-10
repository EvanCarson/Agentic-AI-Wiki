import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-10',
  slug: 'discovery-is-not-an-inventory',
  title: L(
    'Discovery is not an inventory',
    '发现不等于清单',
  ),
  searchTitle: {
    en: 'CrowdStrike, AIR and Tenable all shipped agent discovery — none of it is a register',
  },
  summary: L(
    'In four days three vendors shipped the same admission: nobody knows what agents are running. CrowdStrike put discovery in the endpoint sensor, AIR raised $50M for an inline firewall at the context boundary, and Tenable and OpenAI put a review in front of a registry. Each answer is complete about one place and silent everywhere else — and every governance regime you are being audited against assumes an authoritative register, not an estimate. The number to start tracking is the gap between the two.',
    '四天之内，三家厂商发出了同一份自认：没人知道有哪些智能体正在运行。CrowdStrike 把发现能力放进了端点传感器，AIR 拿了 5000 万美元做一道位于上下文边界的内联防火墙，Tenable 与 OpenAI 则在一个登记册前面加了一道审查。每一份答案都只对一个位置是完整的，在其余各处则一言不发——而正在拿来审计你的每一套治理体系，假定的都是一份权威登记册，不是一个估计值。该开始跟踪的那个数字，是这两者之间的差。',
  ),
  tags: ['safety', 'governance', 'ecosystem', 'agentic-ai'],
};

export default post;
