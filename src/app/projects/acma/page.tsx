"use client";

import {
  Layers,
  Scale,
  Gauge,
  Scissors,
  Boxes,
  Cpu,
} from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "acma",
  name: "ACMA",
  tagline:
    "Adaptive Context Memory Allocator — the first system to jointly optimize prompt compression, KV-cache quantization, and token eviction under a single GPU memory budget.",
  accentClass: "accent-violet",
  accentColor: "#a78bfa",
  narrative: {
    hook: "Long-context inference isn't a memory problem. It's an allocation problem.",
    problem:
      "Every long-context LLM eventually slams into the same wall: the KV cache won't fit. The field responded with three separate escape hatches — compress the prompt (LLMLingua), quantize the cache (KIVI), or evict tokens (H2O) — each invented in isolation, each tuned against its own baseline. In practice you're forced to pick one lever, apply it uniformly, and eat the accuracy cost. Nobody was asking the obvious question: under a fixed memory budget, which lever should you pull for which token?",
    approach:
      "ACMA reframes the whole thing as a knapsack. Each token gets a value score from its attention entropy, then a single optimizer jointly decides its fate: compress it with LLMLingua-2, assign it a KV precision tier (FP16, INT8, INT4, or INT2), or evict it entirely — all packed against one GPU memory budget. Precision is allocated per token rather than uniformly across the cache, so high-value tokens keep their bits while filler degrades or disappears. Built on Llama-3.1-8B-Instruct with a CUDA-backed mixed-precision KV path.",
    insight:
      "The three levers aren't competitors — they're a single design space, and treating them separately leaves accuracy on the table at every budget. A token that's cheap to compress shouldn't also be paying for FP16 cache, and a token worth keeping at full precision shouldn't be a candidate for eviction. Once you score tokens by attention entropy and let one allocator trade compression against precision against eviction, the budget stops being a cliff and becomes a dial.",
  },
  features: [
    {
      icon: <Boxes size={20} />,
      title: "Joint Knapsack Formulation",
      description:
        "Casts long-context inference as a single constrained allocation: every token competes for the same GPU memory budget across compression, precision, and eviction — instead of three disconnected heuristics.",
    },
    {
      icon: <Gauge size={20} />,
      title: "Attention-Entropy Scoring",
      description:
        "Each token earns a value from its attention entropy, identifying which context actually carries signal so the allocator knows what to protect and what to sacrifice.",
    },
    {
      icon: <Scale size={20} />,
      title: "Per-Token Precision Tiers",
      description:
        "Mixed-precision KV cache spanning FP16 / INT8 / INT4 / INT2, assigned per token rather than uniformly — high-value tokens keep their bits while filler is pushed to INT2.",
    },
    {
      icon: <Layers size={20} />,
      title: "LLMLingua-2 Compression",
      description:
        "Prompt compression is one lever in the joint objective, not a separate preprocessing step, so the optimizer can trade compression against precision token by token.",
    },
    {
      icon: <Scissors size={20} />,
      title: "Budget-Aware Eviction",
      description:
        "Low-value tokens are dropped only when keeping them costs more than they're worth under the budget — eviction becomes a decision, not a fixed cache-size cutoff.",
    },
    {
      icon: <Cpu size={20} />,
      title: "CUDA Mixed-Precision KV Path",
      description:
        "A custom CUDA-backed KV-cache path on Llama-3.1-8B-Instruct executes the per-token precision tiers, validated on the Needle-in-a-Haystack retrieval benchmark.",
    },
  ],
  metrics: [
    { value: "3", label: "Joint Levers" },
    { value: "FP16→INT2", label: "Per-Token Range" },
    { value: "1", label: "Unified Budget" },
    { value: "NIAH", label: "Benchmark" },
  ],
  techStack: [
    "Python",
    "PyTorch",
    "Llama-3.1-8B-Instruct",
    "LLMLingua-2",
    "CUDA",
    "Mixed-Precision KV Cache",
    "Attention Entropy",
    "Knapsack Optimization",
  ],
  githubUrl: "https://github.com/aptsalt/acma",
};

export default function AcmaPage() {
  return <ProjectLayout project={project} />;
}
