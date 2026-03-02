"use client";

import { Search, BarChart3, Zap, Database, Shield, Activity } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "rag-eval-engine",
  name: "RAG Eval Engine",
  tagline: "Most RAG systems guess if they're working. This one measures. Every query is scored for faithfulness, relevance, and hallucination rate.",
  accentClass: "accent-emerald",
  accentColor: "#10B981",
  heroImage: "/images/rag-eval-engine-hero.jpg",
  narrative: {
    hook: "If you can't measure retrieval quality, you don't have a RAG system — you have a hope system.",
    problem:
      "RAG is everywhere now. Every startup has a 'chat with your docs' feature. But almost none of them can answer a simple question: is the retrieval actually good? When your system hallucinates, how do you know? When relevance degrades after ingesting 10,000 more documents, who notices?",
    approach:
      "Every query runs through a full evaluation pipeline. Faithfulness, relevance, hallucination rate, context precision, and context recall are scored in real-time using LLM-as-judge and heuristic methods. The system doesn't just retrieve — it proves that its retrievals are trustworthy.",
    insight:
      "The FACT pattern — Fetch, Assess, Cache, Track — turns evaluation from an afterthought into infrastructure. Semantic caching with a 0.95 similarity threshold catches rephrased queries. Adaptive retrieval auto-tunes the BM25/vector alpha and top-k based on historical scores. The system literally gets better the more you use it.",
  },
  features: [
    {
      icon: <Search size={20} />,
      title: "Hybrid Retrieval",
      description:
        "BM25 sparse search + Qdrant vector search fused with Reciprocal Rank Fusion. Configurable alpha lets you dial between keyword precision and semantic recall.",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "5-Metric Evaluation",
      description:
        "Faithfulness, relevance, hallucination rate, context precision, and context recall — scored on every query. LLM-as-judge for nuance, heuristics for speed.",
    },
    {
      icon: <Zap size={20} />,
      title: "Semantic Query Cache",
      description:
        "Embedding-based similarity on Qdrant. Sub-100ms responses on cache hits. Catches semantically identical but differently-worded queries at 0.95 threshold.",
    },
    {
      icon: <Database size={20} />,
      title: "15+ Document Formats",
      description:
        "PDF, DOCX, TXT, Markdown, and 15+ code formats. Three chunking strategies — fixed-size, recursive, semantic. Token-aware sizing with drag-and-drop upload.",
    },
    {
      icon: <Shield size={20} />,
      title: "MCP Server Integration",
      description:
        "Expose RAG as MCP tools for Claude Code: rag_query, rag_retrieve, rag_ingest_text, rag_collections, rag_metrics. Your knowledge base becomes a tool.",
    },
    {
      icon: <Activity size={20} />,
      title: "Adaptive Retrieval",
      description:
        "Auto-tunes alpha and top-k based on historical evaluation scores. After 10 queries, the system recommends optimal retrieval parameters for your data.",
    },
  ],
  metrics: [
    { value: "68", label: "Tests Passing" },
    { value: "5", label: "Eval Metrics" },
    { value: "<100ms", label: "Cache Hit Latency" },
    { value: "6", label: "Dashboard Pages" },
  ],
  techStack: [
    "Python 3.12",
    "FastAPI",
    "Qdrant",
    "BM25",
    "Ollama",
    "OpenAI",
    "Anthropic",
    "SQLite (WAL)",
    "Next.js 14",
    "TypeScript",
    "Tailwind CSS",
    "Recharts",
    "Pydantic v2",
  ],
  githubUrl: "https://github.com/aptsalt/rag-eval-engine",
};

export default function RagEvalEnginePage() {
  return <ProjectLayout project={project} />;
}
