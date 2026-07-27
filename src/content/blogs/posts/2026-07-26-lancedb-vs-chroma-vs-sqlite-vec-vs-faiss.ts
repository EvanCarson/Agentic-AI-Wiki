import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-26',
  slug: 'lancedb-vs-chroma-vs-sqlite-vec-vs-faiss',
  title: L(
    'LanceDB vs Chroma vs sqlite-vec vs FAISS: Four Shapes for a Local Agent Knowledge Base',
    'LanceDB、Chroma、sqlite-vec 与 FAISS：本地智能体知识库的四种形状',
  ),
  summary: L(
    'Before you pick a local vector store, notice that Claude Code, Cursor and Codex deleted theirs — the leading coding agents retrieve with grep, not embeddings. If your corpus still needs an index, these four are not competing products but four different architectures: a search library with no storage, a SQLite extension, an embedded engine with a write-ahead log, and a columnar format on disk.',
    '在挑本地向量存储之前，先注意一件事：Claude Code、Cursor 与 Codex 都把自己的删掉了——领先的编程智能体用 grep 检索，而不是嵌入。如果你的语料仍然需要索引，那么这四者并非互相竞争的产品，而是四种不同的架构：一个不带存储的搜索库、一个 SQLite 扩展、一个带预写日志的嵌入式引擎，以及一种落在磁盘上的列式格式。',
  ),
  tags: ['agent-comparison', 'rag', 'vector-databases', 'self-hosted', 'open-source'],
};

export default post;
