import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-24',
  slug: 'neo4j-vs-memgraph-vs-falkordb-vs-ladybugdb',
  title: L(
    'Neo4j vs Memgraph vs FalkorDB vs LadybugDB: Picking a Graph Store for Agent Memory',
    'Neo4j vs Memgraph vs FalkorDB vs LadybugDB：为智能体记忆挑一个图存储',
  ),
  summary: L(
    'Every performance number published about these four engines was written by one of the vendors, and none of them measures the concurrent-write workload agent memory actually generates. What is checkable — licence, write-path concurrency, and whether your memory framework already ships a driver — points somewhere counter-intuitive.',
    '关于这四个引擎发布过的每一个性能数字，都由某家厂商自己撰写，而它们没有一个测量了智能体记忆真正产生的并发写入负载。真正可核验的三件事——许可证、写入路径的并发模型、你的记忆框架有没有现成驱动——指向一个反直觉的结论。',
  ),
  tags: ['agent-comparison', 'memory', 'rag', 'infrastructure', 'open-source', 'vector-databases'],
};

export default post;
