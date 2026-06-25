"use client";

import {
  Workflow,
  Network,
  ShieldCheck,
  UserCheck,
  Layers,
  Activity,
} from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "alpha-advisor",
  name: "ALPHA Advisor",
  tagline:
    "A LangGraph multi-agent wealth-advisory copilot that plans, retrieves, grades, and cites — then pauses for a human before any client-facing word ships.",
  accentClass: "accent-emerald",
  accentColor: "#34d399",
  narrative: {
    hook: "In wealth advisory, a confident wrong answer isn't a hallucination — it's a compliance incident.",
    problem:
      "Advisory copilots fail in two ways. They retrieve plausible-but-shallow context and miss the risk that actually matters, and they auto-generate client-facing language with no governance gate and no defensible trail. A vector store will happily surface the right-sounding paragraph while completely missing that a portfolio's true exposure is hidden three hops away across issuers and sectors. And when a regulator asks 'who approved this, and on what basis?', a black-box generation has no answer.",
    approach:
      "I built a stateful LangGraph loop: plan, then retrieve across both a vector store and a knowledge graph, grade the retrieval and rewrite-and-retry if it's thin, pull live market context, run a compliance pass, and draft with citations. Before anything finalizes, the graph hits a LangGraph interrupt() — a real human-in-the-loop gate — and resumes only on an explicit Command(resume) decision. Every node writes to a tamper-evident, hash-chained audit log. The graph is stateless over a pluggable checkpointer (InMemory or Postgres), so any replica can resume any paused run.",
    insight:
      "The knowledge graph earned its place by finding what vectors couldn't: traversing client → holding → issuer → sector surfaced 78% multi-hop issuer concentration that semantic search never connected. The deeper lesson is that the human gate isn't a bottleneck to optimize away — it's the product. Making the interrupt durable, the audit hash-chained, and the providers swappable (mock | ollama | azure) is what turns a clever demo into something a compliance officer would actually sign off on.",
  },
  features: [
    {
      icon: <Workflow size={20} />,
      title: "Stateful LangGraph Loop",
      description:
        "Plan → retrieve → grade → market tool → compliance → cited draft → human review → finalize. A grade node rewrites the query and retries when retrieval quality is too thin to draft from.",
    },
    {
      icon: <Network size={20} />,
      title: "GraphRAG Concentration Risk",
      description:
        "A networkx knowledge graph traverses client → holding → issuer → sector to surface multi-hop issuer concentration that pure vector retrieval structurally cannot see.",
    },
    {
      icon: <UserCheck size={20} />,
      title: "Human-in-the-Loop Governance",
      description:
        "LangGraph interrupt() pauses the run before any client-facing output. The graph resumes only on an explicit Command(resume) decision via a dedicated /decision endpoint.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Tamper-Evident Audit Trail",
      description:
        "Every node appends to a hash-chained audit log, so the full reasoning and approval path is reconstructable and any after-the-fact edit is detectable.",
    },
    {
      icon: <Layers size={20} />,
      title: "Provider-Portable & Resumable",
      description:
        "Swap providers (mock | ollama | azure) with no graph changes. A stateless graph over a pluggable checkpointer (InMemory | Postgres) lets any replica resume any paused run.",
    },
    {
      icon: <Activity size={20} />,
      title: "Observable by Design",
      description:
        "OpenTelemetry emits per-node spans across the whole loop, and task-based model routing sends each step to the right model — all streamed to the client over FastAPI SSE.",
    },
  ],
  metrics: [
    { value: "78%", label: "Hidden Concentration Found" },
    { value: "3", label: "Swappable Providers" },
    { value: "HITL", label: "Governance Gate" },
    { value: "Audit", label: "Tamper-Evident" },
  ],
  techStack: [
    "Python",
    "LangGraph",
    "Azure OpenAI",
    "networkx (GraphRAG)",
    "FastAPI",
    "Server-Sent Events",
    "OpenTelemetry",
    "Postgres Checkpointer",
    "Ollama",
  ],
  githubUrl: "https://github.com/aptsalt/alpha-advisor",
  liveUrl: "https://aptsalt.github.io/alpha-advisor/",
};

export default function AlphaAdvisorPage() {
  return <ProjectLayout project={project} />;
}
