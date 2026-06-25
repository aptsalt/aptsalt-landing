"use client";

import {
  Minimize2,
  Binary,
  Gauge,
  Layers,
  TrendingUp,
  Hash,
} from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "parameter-golf",
  name: "Parameter Golf",
  tagline:
    "OpenAI's official efficiency challenge: train the best language model that fits in 16 MB and trains in under 10 minutes on 8xH100. My run hit 1.1194 bits/byte — beating the baseline by stacking every quantization and optimizer trick that actually moves the needle.",
  accentClass: "accent-pink",
  accentColor: "#ec4899",
  narrative: {
    hook: "When the budget is fixed at 16 megabytes, every bit you spend has to earn its place.",
    problem:
      "Most language-model work assumes scale is free — more parameters, more compute, more data. The Parameter Golf challenge inverts that. You get a hard 16 MB artifact cap and a 10-minute training window on 8xH100, then you race to the lowest bits/byte on held-out FineWeb. There's nowhere to hide: a single wasted layer, a sloppy quantization scheme, or an optimizer that converges slowly blows the entire budget. The baseline sat at 1.2244 bpb, and closing that gap meant questioning every default the field takes for granted.",
    approach:
      "I treated the model as a compression problem under constraint. Quantization-Aware Training in mixed int5/int6/int8 precision let me trade precision for parameters where the loss curve allowed it, dropping to 1-bit and ternary weights in the layers that tolerated it. BigramHash embeddings collapsed the vocabulary footprint; partial RoPE and cross-layer attention recovered representational capacity the quantization gave up. A LeakyReLU-squared activation plus LoRA test-time training squeezed out the final gains, and Parallel Muon kept the optimizer converging fast enough to land inside the 10-minute wall. EMA/SWA weight averaging stabilized the endgame.",
    insight:
      "The leaderboard rewards engineering judgment, not raw scale. The winning configuration — LeakyReLU squared, test-time training, and Parallel Muon — landed at 1.1194 bpb because each technique targeted a specific bottleneck the scaling laws predicted: the Muon optimizer for fast convergence inside the time wall, QAT for the size wall, and test-time adaptation for the distribution shift at eval. Efficiency isn't a smaller version of scale; it's a different optimization problem with its own frontier.",
  },
  features: [
    {
      icon: <Binary size={20} />,
      title: "Quantization-Aware Training",
      description:
        "Mixed int5/int6/int8 precision trained end-to-end so the model learns to live inside its quantized weights, with 1-bit and ternary quantization in the layers that tolerate it. The core lever for staying under 16 MB.",
    },
    {
      icon: <Gauge size={20} />,
      title: "Parallel Muon Optimizer",
      description:
        "The Muon optimizer, parallelized to converge fast enough to land inside the 10-minute training wall on 8xH100. Faster descent per step means more effective training inside a fixed compute budget.",
    },
    {
      icon: <Hash size={20} />,
      title: "BigramHash Embeddings",
      description:
        "Hash-based bigram embeddings collapse the vocabulary footprint without an explicit embedding table — reclaiming megabytes that would otherwise be spent on parameters that barely move the loss.",
    },
    {
      icon: <Layers size={20} />,
      title: "Partial RoPE + Cross-Layer Attention",
      description:
        "Partial rotary position encoding and cross-layer attention recover representational capacity surrendered to aggressive quantization, keeping accuracy high while the parameter count stays tiny.",
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Test-Time Training",
      description:
        "LoRA-based test-time training plus a LeakyReLU-squared activation adapt the model at evaluation, closing distribution shift on held-out FineWeb. Part of the 1.1194 bpb winning configuration.",
    },
    {
      icon: <Minimize2 size={20} />,
      title: "EMA / SWA Averaging",
      description:
        "Exponential moving average and stochastic weight averaging stabilize the final weights so the endgame converges smoothly — turning a noisy 10-minute run into a reproducible leaderboard score.",
    },
  ],
  metrics: [
    { value: "16 MB", label: "Artifact Budget" },
    { value: "1.1194", label: "Bits / Byte" },
    { value: "8xH100", label: "Training Hardware" },
    { value: "< 10min", label: "Train Time Limit" },
  ],
  techStack: [
    "PyTorch",
    "MLX",
    "Quantization-Aware Training",
    "Muon Optimizer",
    "Neural Scaling Laws",
    "LoRA Test-Time Training",
    "FineWeb",
    "Partial RoPE",
    "Cross-Layer Attention",
    "EMA / SWA",
  ],
  githubUrl: "https://github.com/aptsalt/parameter-golf",
};

export default function ParameterGolfPage() {
  return <ProjectLayout project={project} />;
}
