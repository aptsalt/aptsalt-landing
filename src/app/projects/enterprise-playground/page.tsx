"use client";

import { Building2, Cpu, Palette, Layers, BarChart3, Microscope } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "enterprise-playground",
  name: "Enterprise Playground",
  tagline: "Scrape a design system. Fine-tune a model. Generate production UI code. All on one GPU, at $0/token.",
  accentClass: "accent-gold",
  accentColor: "#EAB308",
  heroImage: "/aptsalt-landing/images/enterprise-playground-hero.jpg",
  narrative: {
    hook: "What if your AI didn't just know how to write code — what if it knew your design system?",
    problem:
      "Enterprise UI development is paradoxically both the most standardized and most tedious work in software. Every company has a design system. Every developer rebuilds the same patterns — data tables, form layouts, dashboard grids — against that system. LLMs can generate generic UI code, but they don't know your specific design tokens, component APIs, or layout conventions.",
    approach:
      "Enterprise Playground closes the loop: Playwright scrapes real banking UIs to build training data, QLoRA fine-tunes a local 14B model on your design system, and the generation engine produces domain-specific UI code using RAG-enhanced context. Two models run simultaneously — a 14B coder for HTML/CSS/JS generation and a 3B model for routing, chat, and context compression.",
    insight:
      "The dual-model architecture is the secret. The 3B model compresses RAG context by 30-50% before feeding it to the 14B generator — reducing input tokens without losing domain knowledge. Smart routing sends text tasks to the fast 3B model and code generation to the capable 14B model. Total VRAM: 10.5 GB out of 16 GB. One consumer GPU runs the entire pipeline.",
  },
  features: [
    {
      icon: <Palette size={20} />,
      title: "Design System Scraping",
      description:
        "Playwright captures real enterprise UIs — full-page screenshots, structured JSON workflow extraction. Builds training datasets from production design systems.",
    },
    {
      icon: <Cpu size={20} />,
      title: "Dual-Model Inference",
      description:
        "qwen2.5-coder:14b for code generation (8.5 GB VRAM) + qwen2.5:3b for routing and compression (2 GB VRAM). Both run simultaneously on a single RTX 4090.",
    },
    {
      icon: <Layers size={20} />,
      title: "QLoRA Fine-Tuning",
      description:
        "LoRA r=32 fine-tuning on scraped design system data. Training loss: 2.85 → 0.42 (85% reduction over 3 epochs). Adapter deploys directly to Ollama.",
    },
    {
      icon: <Building2 size={20} />,
      title: "RAG-Enhanced Generation",
      description:
        "ChromaDB + nomic-embed-text retrieves relevant design patterns. 3B compression reduces context tokens by 30-50%. Domain-accurate code without hallucinated APIs.",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Smart Routing (95.8%)",
      description:
        "Keyword + LLM classifier routes queries to the optimal model. 95.8% routing accuracy. Text questions go fast (3B), code generation goes capable (14B).",
    },
    {
      icon: <Microscope size={20} />,
      title: "8-Tab Observatory",
      description:
        "Generate, Gallery, Pipeline, Data & RAG, ML Metrics, Observatory, Agent traces, Embeddings & Storage. Full visibility into every layer of the system.",
    },
  ],
  metrics: [
    { value: "95.8%", label: "Router Accuracy" },
    { value: "85%", label: "Loss Reduction" },
    { value: "10.5GB", label: "Total VRAM" },
    { value: "~35%", label: "Cache Hit Rate" },
  ],
  techStack: [
    "Python 3.11",
    "FastAPI",
    "Next.js 15",
    "TypeScript",
    "Tailwind + shadcn/ui",
    "Zustand",
    "TanStack Query",
    "PyTorch",
    "HuggingFace PEFT",
    "QLoRA",
    "ChromaDB",
    "Ollama",
    "Playwright",
    "UMAP",
    "Plotly.js",
  ],
  githubUrl: "https://github.com/aptsalt/enterprise-playground",
};

export default function EnterprisePlaygroundPage() {
  return <ProjectLayout project={project} />;
}
