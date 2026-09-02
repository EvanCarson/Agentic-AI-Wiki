import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-02',
  slug: 'spring-ai-vs-langchain4j-vs-eino-vs-rig',
  title: L(
    'Spring AI vs LangChain4j vs Eino vs Rig',
    'Spring AI vs LangChain4j vs Eino vs Rig',
  ),
  summary: L(
    'All four build agents with tool calling, RAG and MCP, so features are not the decision. What separates them is what each one demands of the runtime you already operate — and for the JVM pair that demand is a Spring Boot major version.',
    '四个框架都能做出会调用工具、带 RAG、接 MCP 的智能体，所以功能不是那个决定。真正把它们区分开的，是每一个对你已经在跑的运行时提出了什么要求——而对这两个 JVM 框架来说，那个要求是一个 Spring Boot 大版本。',
  ),
  tags: ['agent-comparison', 'agent-frameworks', 'open-source', 'developer-tools', 'architecture'],
};

export default post;
