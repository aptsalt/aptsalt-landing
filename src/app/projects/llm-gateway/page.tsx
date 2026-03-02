"use client";

import { Route, Gauge, DollarSign, Zap, Shield, BarChart3 } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "llm-gateway",
  name: "LLM Gateway",
  tagline: "One API endpoint. Five providers. The gateway routes every prompt to the optimal model — balancing cost, quality, and latency in real-time.",
  accentClass: "accent-blue",
  accentColor: "#3B82F6",
  heroImage: "/images/llm-gateway-hero.jpg",
  narrative: {
    hook: "Why choose one LLM provider when you can have all of them — and pay less?",
    problem:
      "Every LLM provider has strengths. OpenAI is reliable but expensive. Groq is fast but limited. Ollama is free but local-only. Building on a single provider means accepting its weaknesses. Switching providers means rewriting every integration. The industry treats this as an either/or choice.",
    approach:
      "LLM Gateway presents a single OpenAI-compatible API that routes prompts to the optimal provider based on complexity, cost, and latency. Virtual model names like 'auto', 'fast', 'cheap', and 'quality' let you declare intent instead of picking models. Semantic caching catches rephrased queries. Circuit breakers handle failures gracefully.",
    insight:
      "The real innovation isn't routing — it's the scoring function. Each provider gets a composite score weighted by cost, quality, and latency, with weights configurable per routing strategy. The system prefers local Ollama if it scores within 70% of the best option — because free inference that's 'good enough' beats expensive inference that's marginally better.",
  },
  features: [
    {
      icon: <Route size={20} />,
      title: "Intelligent Routing",
      description:
        "Prompt complexity classifier routes to optimal provider. Four strategies — balanced, cost, quality, latency — with configurable weight sliders. Local-first preference.",
    },
    {
      icon: <Zap size={20} />,
      title: "Semantic Caching",
      description:
        "Redis cosine similarity at 0.95 threshold. Catches rephrased queries without exact match. 20-40% cache hit rates reduce costs and latency dramatically.",
    },
    {
      icon: <Shield size={20} />,
      title: "Circuit Breakers",
      description:
        "Per-provider state machine with automatic failover. When a provider goes down, traffic routes to alternatives with exponential backoff. Zero downtime routing.",
    },
    {
      icon: <DollarSign size={20} />,
      title: "Budget Control",
      description:
        "Per-key monthly token and USD limits. Global budget enforcement with per-request cost tracking. Never get a surprise bill again.",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "14-Task Benchmarking",
      description:
        "Standardized evaluation across Knowledge, Code, Summarization, Reasoning, and Instruction Following. Reflects real latency through your infrastructure.",
    },
    {
      icon: <Gauge size={20} />,
      title: "Full Observability",
      description:
        "Prometheus metrics + Grafana dashboards. 7-page dashboard with real-time latency charts, provider health, cache stats, and budget usage.",
    },
  ],
  metrics: [
    { value: "111", label: "Tests Passing" },
    { value: "5", label: "LLM Providers" },
    { value: "20-40%", label: "Cache Hit Rate" },
    { value: "7", label: "Dashboard Pages" },
  ],
  techStack: [
    "TypeScript 5.7",
    "Hono 4.6",
    "Redis 7",
    "PostgreSQL 16",
    "Drizzle ORM",
    "Prometheus",
    "Grafana",
    "Zod",
    "Ollama",
    "Groq",
    "Together AI",
    "OpenAI",
    "Anthropic",
  ],
  githubUrl: "https://github.com/aptsalt/llm-gateway",
};

export default function LlmGatewayPage() {
  return <ProjectLayout project={project} />;
}
