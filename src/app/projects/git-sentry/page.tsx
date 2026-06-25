"use client";

import {
  ShieldAlert,
  Cpu,
  ScanLine,
  Workflow,
  Gauge,
  Activity,
} from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "git-sentry",
  name: "Git Sentry",
  tagline:
    "An AI git guardian that reviews every commit for free locally, then spends premium API tokens only where the diff actually demands them.",
  accentClass: "accent-red",
  accentColor: "#ef4444",
  narrative: {
    hook: "The cheapest code review is the one that never reaches a paid API.",
    problem:
      "Sending every diff to a frontier model for review is slow and expensive, and the bill scales linearly with how often you commit. But skipping review is worse: a leaked API key, an unguarded eval(), or a SQL injection sails straight into main. Most teams pick one failure mode or the other — either they pay on every push, or they trust the author and hope.",
    approach:
      "Git Sentry splits review into two cost layers. Layer 1 runs four local Ollama agents in parallel on every git add and git push — zero API cost, instant feedback at the keyboard. Layer 2 lives in GitHub Actions CI and calls Claude Sonnet only on the files Layer 1 flagged as complex (roughly 25% of a typical diff), so the expensive model touches a quarter of the code and skips the boilerplate.",
    insight:
      "Treating model spend as an architectural decision instead of a config value changed the economics entirely: routing only complex files to the API cut review tokens by about 75% while the security bar went up, not down. The local pass also gives the dual-phase scanner a free first look — instant regex catches the obvious leaks before a single token is spent, and the LLM phase reserves its budget for the OWASP and auth reasoning that regex can't do.",
  },
  features: [
    {
      icon: <Cpu size={20} />,
      title: "Four Parallel Local Agents",
      description:
        "Every git add and git push triggers four Ollama agents (qwen2.5-coder:14b) running in parallel — fully local, $0 in API cost, with feedback fast enough to live in the commit loop.",
    },
    {
      icon: <Workflow size={20} />,
      title: "Two-Layer Cost Architecture",
      description:
        "Layer 1 reviews everything for free locally; Layer 2 in GitHub Actions invokes Claude Sonnet only on files marked complex — about 25% of the diff — for a measured ~75% reduction in API tokens.",
    },
    {
      icon: <ScanLine size={20} />,
      title: "Dual-Phase Security Scanner",
      description:
        "Phase 1 is instant regex for API keys, eval(), and SQL/command injection. Phase 2 is an LLM deep pass covering OWASP categories and authentication logic that pattern matching can't reason about.",
    },
    {
      icon: <Gauge size={20} />,
      title: "Deduction-Based Scoring",
      description:
        "Each finding subtracts from the score, producing a single legible health number per change instead of an unranked wall of warnings to triage by hand.",
    },
    {
      icon: <ShieldAlert size={20} />,
      title: "Zero-Tolerance Push Block",
      description:
        "Any critical-severity finding blocks the push outright. The dangerous classes — leaked secrets, injection, broken auth — never reach the remote, no override by default.",
    },
    {
      icon: <Activity size={20} />,
      title: "Live WebSocket Dashboard",
      description:
        "Review results stream from SQLite over a WebSocket into a Next.js dashboard, so findings, scores, and blocked pushes surface in real time as the hooks and CI run.",
    },
  ],
  metrics: [
    { value: "~75%", label: "API Token Cut" },
    { value: "4", label: "Local Agents" },
    { value: "$0", label: "Local Review Cost" },
    { value: "2", label: "Scanner Phases" },
  ],
  techStack: [
    "TypeScript",
    "Next.js 15",
    "Ollama",
    "qwen2.5-coder:14b",
    "Claude Sonnet API",
    "GitHub Actions",
    "SQLite",
    "WebSocket",
  ],
  githubUrl: "https://github.com/aptsalt/git-sentry",
};

export default function GitSentryPage() {
  return <ProjectLayout project={project} />;
}
