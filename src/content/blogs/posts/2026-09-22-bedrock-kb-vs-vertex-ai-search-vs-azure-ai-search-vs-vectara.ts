import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-22',
  slug: 'bedrock-kb-vs-vertex-ai-search-vs-azure-ai-search-vs-vectara',
  title: L(
    'Bedrock Knowledge Bases vs Vertex AI Search vs Azure AI Search vs Vectara',
    'Bedrock Knowledge Bases、Vertex AI Search、Azure AI Search 与 Vectara 对比',
  ),
  searchTitle: {
    en: 'Four managed knowledge bases compared',
  },
  summary: L(
    'You are not buying retrieval quality from a managed knowledge base — you are buying the connector that copies SharePoint\'s permissions along with its files, and the query path that enforces them per user. Azure\'s Agents SDK search tool still cannot forward that token, and permission lock-in is the layer that actually holds you.',
    '你从一套托管知识库买到的不是检索质量——你买的是那个把 SharePoint 的权限连同文件一起搬过来的连接器，以及那条按用户强制执行权限的查询路径。Azure 的 Agents SDK 搜索工具至今仍无法转发那个令牌，而权限层面的锁定才是真正拴住你的那一层。',
  ),
  tags: ['agent-comparison', 'rag', 'infrastructure', 'governance'],
};

export default post;
