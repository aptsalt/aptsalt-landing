"use client";

import {
  ShieldCheck,
  Quote,
  Radio,
  Gauge,
  PackageX,
  FileCode,
} from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "beacon",
  name: "Beacon",
  tagline:
    "A 65 KB agentic RAG workspace — grounded, verifiable citations and human-approved actions, with zero runtime UI libraries. Built for air-gapped enterprise where every npm dependency is a liability.",
  accentClass: "accent-amber",
  accentColor: "#f59e0b",
  narrative: {
    hook: "In an air-gapped enterprise, every dependency you ship is a dependency someone has to audit.",
    problem:
      "Agentic copilots in regulated environments live or die on two things: can you trust what the model says, and can you trust what it does. A hallucinated citation is a compliance incident. An unapproved action is a breach. And the typical answer — pulling in a streaming library, a markdown renderer, a UI framework — is exactly the wrong move when the deployment target is air-gapped and every transitive package is a supply-chain question someone has to answer.",
    approach:
      "Beacon is a homage to Cohere's North — an agentic RAG workspace with grounded citations, human-in-the-loop action approval, and span-level feedback. The front end ships zero runtime UI, markdown, or streaming libraries. The SSE reader is hand-built over fetch, the citation renderer is bespoke, and there's a mini-markdown parser written from scratch. Cohere v2 (Command for generation, Embed for retrieval, Rerank for relevance) drives the backend over FastAPI, streaming ten typed event kinds to a React 19 client.",
    insight:
      "The interesting engineering isn't the model — it's treating the model's output as untrusted input. Citation spans arrive as raw character offsets; Beacon clamps them to valid ranges, snaps them to word boundaries, and drops overlaps before a single character is highlighted. Streamed tokens are batched with requestAnimationFrame so React commits once per frame instead of once per token. Hand-building these primitives wasn't nostalgia — it's what makes a 65 KB gzipped bundle, and an auditable one, possible.",
  },
  features: [
    {
      icon: <Quote size={20} />,
      title: "Grounded, Verifiable Citations",
      description:
        "Every claim traces back to a source span. The custom citation renderer ties generated text to retrieved evidence so answers are checkable, not just plausible.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Human-Approved Actions",
      description:
        "The agent proposes; the human disposes. Actions surface for explicit approval before execution — the human-in-the-loop gate that regulated workflows require.",
    },
    {
      icon: <Radio size={20} />,
      title: "Hand-Built SSE Reader",
      description:
        "Ten typed event kinds streamed over a fetch-based Server-Sent Events reader written from scratch — no streaming library, no hidden dependencies in the hot path.",
    },
    {
      icon: <PackageX size={20} />,
      title: "Untrusted Citation Spans",
      description:
        "Model-emitted span offsets are treated as hostile input: clamped to valid ranges, snapped to word boundaries, and de-overlapped before anything is rendered.",
    },
    {
      icon: <Gauge size={20} />,
      title: "One Commit Per Frame",
      description:
        "Streamed tokens are batched with requestAnimationFrame so React commits once per frame instead of once per token — smooth streaming without thrashing the DOM.",
    },
    {
      icon: <FileCode size={20} />,
      title: "Mini-Markdown From Scratch",
      description:
        "A bespoke mini-markdown parser and renderer replace a full markdown library, keeping the bundle tiny and every byte of parsing logic auditable.",
    },
  ],
  metrics: [
    { value: "65 KB", label: "Gzipped Bundle" },
    { value: "0", label: "Runtime UI Libs" },
    { value: "10", label: "Typed SSE Events" },
    { value: "3", label: "Cohere v2 Models" },
  ],
  techStack: [
    "React 19",
    "FastAPI",
    "Cohere v2",
    "Server-Sent Events",
    "Vite",
  ],
  githubUrl: "https://github.com/aptsalt/beacon",
};

export default function BeaconPage() {
  return <ProjectLayout project={project} />;
}
