"use client";

import { Brain, Cpu, Zap, Target, GitBranch, BarChart3 } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "ml-portfolio",
  name: "ML Portfolio",
  tagline: "Three production-grade ML systems built from scratch in PyTorch — because understanding comes from building, not importing.",
  accentClass: "accent-violet",
  accentColor: "#8B5CF6",
  heroImage: "/aptsalt-landing/images/ml-portfolio-hero.jpg",
  architectureDiagram: "/aptsalt-landing/images/diagrams/ml-portfolio.png",
  narrative: {
    hook: "Everyone fine-tunes. Very few build from the ground up.",
    problem:
      "The ML ecosystem is drowning in wrappers. Engineers pip-install their way to a demo, call it a project, and move on. But when something breaks in production — when the loss curve plateaus, when the reward signal is sparse, when retrieval quality degrades — you need to understand every layer of the stack.",
    approach:
      "I built three complete ML systems from scratch in PyTorch: a GPT transformer with full RLHF alignment pipeline, a PPO game agent that learns from language instructions, and a RAG system that improves through user feedback. No HuggingFace Trainer. No LangChain. Raw tensors, manual backprop, custom training loops.",
    insight:
      "The gap between a tutorial and production is understanding why each architectural decision exists. BPE tokenization isn't just an algorithm — it's the interface between human language and tensor math. DPO isn't just an alternative to PPO — it removes the reward model bottleneck entirely. These aren't abstractions to learn; they're engineering tradeoffs to internalize.",
  },
  features: [
    {
      icon: <Brain size={20} />,
      title: "GPT Transformer + RLHF",
      description:
        "125M-350M parameter decoder-only transformer with BPE tokenizer from scratch, pre-training, SFT, and DPO alignment. Cosine LR schedule, gradient checkpointing, mixed precision.",
    },
    {
      icon: <Target size={20} />,
      title: "PPO Game Agent",
      description:
        "Proximal Policy Optimization with GAE and clipped surrogate for MiniGrid. CNN observation encoder + GRU instruction encoder for language-conditioned policies.",
    },
    {
      icon: <GitBranch size={20} />,
      title: "RAG with Feedback Learning",
      description:
        "Hybrid retriever combining BM25 + dense vectors with Reciprocal Rank Fusion. Feedback collection system generates DPO pairs for continuous improvement.",
    },
    {
      icon: <Cpu size={20} />,
      title: "Custom BPE Tokenizer",
      description:
        "Byte-Pair Encoding built from first principles — merge rules, vocabulary building, special tokens. The foundation that makes everything else possible.",
    },
    {
      icon: <Zap size={20} />,
      title: "Mixed Precision Training",
      description:
        "FP16 training with gradient checkpointing to fit larger models in GPU memory. Careful numerical stability for transformer attention and loss computation.",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "DPO Alignment",
      description:
        "Direct Preference Optimization eliminates the reward model from RLHF. Simpler, more stable, and theoretically grounded preference learning.",
    },
  ],
  metrics: [
    { value: "350M", label: "Max Parameters" },
    { value: "3", label: "Complete Systems" },
    { value: "40min", label: "DoorKey Solve Time" },
    { value: "0", label: "External ML Libraries" },
  ],
  techStack: [
    "Python",
    "PyTorch",
    "CUDA",
    "BPE Tokenizer",
    "GPT Architecture",
    "RLHF / DPO",
    "PPO + GAE",
    "FAISS",
    "BM25",
    "MiniGrid",
  ],
  githubUrl: "https://github.com/aptsalt/ml-portfolio",
};

export default function MLPortfolioPage() {
  return <ProjectLayout project={project} />;
}
