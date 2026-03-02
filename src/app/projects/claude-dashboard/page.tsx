"use client";

import { Activity, Box, Webhook, Clock, Coins, Eye } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "claude-dashboard",
  name: "Claude Dashboard",
  tagline: "Real-time Claude Code monitoring — WebSocket events, 3D canvas visualization, hook system, and full token observability.",
  accentClass: "accent-lime",
  accentColor: "#84CC16",
  heroImage: "/aptsalt-landing/images/claude-dashboard-hero.jpg",
  narrative: {
    hook: "See everything. Miss nothing.",
    problem:
      "Claude Code is powerful but opaque. When you're running autonomous coding sessions, you need to see what's happening — which files are being read, what tools are called, how many tokens are consumed, and when things go sideways. Without observability, you're trusting a black box with your codebase.",
    approach:
      "Built a real-time monitoring dashboard that hooks into Claude Code via WebSocket events. A 3D canvas visualization shows the session graph — files as nodes, tool calls as edges, time flowing left to right. A hook system intercepts events for custom processing. Token tracking shows cost-per-session with trend analysis.",
    insight:
      "The 3D visualization wasn't eye candy — it was the debugging tool that changed everything. When you can see the spatial pattern of a Claude session, you spot anomalies instantly: loops where the agent revisits the same files, dead ends where it reads without acting, and breakthroughs where edits cascade across the codebase. Observability is the feature.",
  },
  features: [
    {
      icon: <Webhook size={20} />,
      title: "WebSocket Event Stream",
      description:
        "Real-time bidirectional connection captures every Claude Code event — tool calls, file reads, edits, completions, errors — as they happen.",
    },
    {
      icon: <Box size={20} />,
      title: "3D Canvas Visualization",
      description:
        "Session graph rendered on Canvas with file nodes, tool-call edges, and temporal flow. Zoom, pan, and inspect any node for full event details.",
    },
    {
      icon: <Activity size={20} />,
      title: "Hook System",
      description:
        "Extensible hook architecture intercepts events for custom processing — logging, alerts, cost limits, auto-approval rules, and pipeline triggers.",
    },
    {
      icon: <Clock size={20} />,
      title: "Session Timeline",
      description:
        "Chronological event timeline with filtering by event type, file path, and severity. Replay sessions to understand how decisions unfolded.",
    },
    {
      icon: <Coins size={20} />,
      title: "Token & Cost Tracking",
      description:
        "Per-session and cumulative token usage with cost calculation. Track input vs output tokens, cache hits, and cost trends over time.",
    },
    {
      icon: <Eye size={20} />,
      title: "Full Observability",
      description:
        "Every interaction logged with timestamps, duration, token counts, and result status. Export sessions for analysis or share with team members.",
    },
  ],
  metrics: [
    { value: "Real-time", label: "Event Streaming" },
    { value: "3D", label: "Canvas Visualization" },
    { value: "WebSocket", label: "Bidirectional" },
    { value: "Full", label: "Observability" },
  ],
  techStack: [
    "Next.js 15",
    "Canvas API",
    "WebSocket",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "React 19",
  ],
  githubUrl: "https://github.com/aptsalt/claude-dashboard",
  liveUrl: "http://localhost:3457",
};

export default function ClaudeDashboardPage() {
  return <ProjectLayout project={project} />;
}
