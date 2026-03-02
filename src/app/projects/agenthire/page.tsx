"use client";

import { Users, Bot, Workflow, MessageSquare, Briefcase, Brain } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "agenthire",
  name: "AgentHire",
  tagline: "Five AI agents. One pipeline. Your entire job search — from profile analysis to interview prep — automated by a local LLM swarm.",
  accentClass: "accent-red",
  accentColor: "#EF4444",
  heroImage: "/aptsalt-landing/images/agenthire-hero.jpg",
  architectureDiagram: "/aptsalt-landing/images/diagrams/agenthire.png",
  narrative: {
    hook: "Job searching is a pipeline problem. So I built a pipeline.",
    problem:
      "The job search is broken. You write one resume, blast it to 200 companies, and pray. No one analyzes their own strengths objectively. No one researches companies deeply enough. No one tailors their resume for each role. Not because they don't want to — because it takes 40 hours per company to do it right.",
    approach:
      "AgentHire deploys five specialized AI agents orchestrated by LangGraph: a Profile Analyst, Market Researcher, Match Scorer, Resume Tailor, and Interview Coach. Each agent has a focused role and returns structured JSON. The full pipeline runs in 20-25 seconds on a single GPU, powered entirely by local Ollama inference at zero API cost.",
    insight:
      "The key wasn't making one agent smarter — it was making five agents specialized. A Market Researcher that only finds jobs produces better results than a general-purpose agent asked to do everything. LangGraph coordinates the handoffs, Zustand manages the reactive state, and SSE streams every token to the UI in real-time. The swarm is greater than its parts.",
  },
  features: [
    {
      icon: <Users size={20} />,
      title: "5 Specialized Agents",
      description:
        "Profile Analyst, Market Researcher, Match Scorer, Resume Tailor, Interview Coach. Each returns structured JSON through MCP servers. Focused expertise, composable pipeline.",
    },
    {
      icon: <Workflow size={20} />,
      title: "LangGraph Orchestration",
      description:
        "Directed acyclic graph coordinates agent execution with conditional edges and state management. Pipeline runs end-to-end or agent-by-agent.",
    },
    {
      icon: <Bot size={20} />,
      title: "100% Local Inference",
      description:
        "qwen2.5-coder:14b on RTX 4090. 37-40 tok/s throughput. Full pipeline in 20-25 seconds. Zero cloud API costs — your job data never leaves your machine.",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Real-Time SSE Streaming",
      description:
        "Every token streams to the UI via Server-Sent Events. Chat system with session persistence, per-message telemetry showing model, duration, tokens, and tok/s.",
    },
    {
      icon: <Briefcase size={20} />,
      title: "AI Resume Parsing",
      description:
        "Upload a .txt resume and Ollama parses it into structured Profile JSON — skills with categories and levels, experience, education. Dynamic skill extraction.",
    },
    {
      icon: <Brain size={20} />,
      title: "4D Match Scoring",
      description:
        "Skills, experience, education, and culture fit — each scored independently. Not a single compatibility number, but a multi-dimensional breakdown of your fit.",
    },
  ],
  metrics: [
    { value: "5", label: "AI Agents" },
    { value: "~25s", label: "Full Pipeline" },
    { value: "37-40", label: "Tokens/sec" },
    { value: "$0", label: "API Costs" },
  ],
  techStack: [
    "Next.js 15",
    "React 19",
    "TypeScript 5.7",
    "Tailwind CSS 4",
    "Zustand 5",
    "React Flow 12",
    "LangGraph",
    "Ollama",
    "Supabase",
    "pgvector",
    "OpenTelemetry",
    "SSE Streaming",
    "Vitest",
    "Playwright",
  ],
  githubUrl: "https://github.com/aptsalt/agenthire",
};

export default function AgentHirePage() {
  return <ProjectLayout project={project} />;
}
