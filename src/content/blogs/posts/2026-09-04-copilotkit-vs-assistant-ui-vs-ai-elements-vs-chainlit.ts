import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-04',
  slug: 'copilotkit-vs-assistant-ui-vs-ai-elements-vs-chainlit',
  title: L(
    'CopilotKit vs assistant-ui vs AI Elements vs Chainlit: you are picking a coupling, not a chat box',
    'CopilotKit、assistant-ui、AI Elements 与 Chainlit：你挑的是一种耦合，不是一个聊天框',
  ),
  searchTitle: { en: 'CopilotKit vs assistant-ui vs AI Elements vs Chainlit' },
  summary: L(
    'All four render a streaming message list, and the demo looks the same in each. What differs is the layer you cannot swap later — a wire protocol, an npm dependency, a source tree copied into your repo, or a whole Python server whose front end you never wrote — and after a year in which one canvas archived itself and another changed hands, "what do I still own if this goes quiet" is the axis worth deciding on.',
    '四者渲染的都是一条流式消息列表，demo 看上去也都差不多。真正不同的是那一层你日后换不掉的东西——一套线上协议、一个 npm 依赖、一份被拷进你仓库的源码，还是一整台你从没写过其前端的 Python 服务器。而在这样一年之后——一块画布把自己归档了，另一块换了东家——「如果它哪天安静下来，我手上还剩什么」才是值得据以决策的那条轴。',
  ),
  tags: ['agent-comparison', 'agent-ux', 'open-source', 'developer-tools', 'protocols'],
};

export default post;
