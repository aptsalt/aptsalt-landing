"use client";

import { Compass, Workflow, Terminal, Brain, Shield, Layers } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "claude-pilot",
  name: "Claude Pilot",
  tagline: "An autonomous development copilot that doesn't just suggest code — it orchestrates entire engineering workflows through Claude and MCP.",
  accentClass: "accent-orange",
  accentColor: "#F97316",
  heroImage: "/aptsalt-landing/images/claude-pilot-hero.jpg",
  architectureDiagram: "/aptsalt-landing/images/diagrams/claude-pilot.png",
  narrative: {
    hook: "What if your IDE didn't just autocomplete — what if it thought?",
    problem:
      "Copilots today are glorified autocomplete. They see one file, suggest one line, and move on. They don't understand your project architecture, your testing patterns, your deployment pipeline. They can't reason about the relationship between a failing test and a database migration three files away.",
    approach:
      "Claude Pilot connects Claude's reasoning capabilities with Model Context Protocol servers to build a copilot that understands your entire development context. It reads your codebase, understands your patterns, runs your tests, and orchestrates multi-step engineering tasks autonomously — from bug triage to feature implementation.",
    insight:
      "The breakthrough isn't smarter autocomplete — it's giving an LLM agency over your development tools. When Claude can read files, run tests, check git history, and query databases through MCP, it stops being a text generator and becomes an engineering partner. The protocol is the product.",
  },
  features: [
    {
      icon: <Compass size={20} />,
      title: "Autonomous Orchestration",
      description:
        "Multi-step task execution — Claude plans, executes, validates, and iterates. Not a chatbot. An autonomous engineering agent that drives workflows end-to-end.",
    },
    {
      icon: <Workflow size={20} />,
      title: "MCP Integration",
      description:
        "Deep Model Context Protocol integration gives Claude real tool access — file systems, git, databases, test runners, deployment pipelines. Context without copy-paste.",
    },
    {
      icon: <Terminal size={20} />,
      title: "Development Workflows",
      description:
        "Pre-built workflows for common tasks: bug investigation, feature scaffolding, code review, refactoring. Each one is a structured multi-agent pipeline.",
    },
    {
      icon: <Brain size={20} />,
      title: "Context-Aware Reasoning",
      description:
        "Understands your project structure, coding conventions, test patterns, and architectural decisions. Every suggestion is grounded in your actual codebase.",
    },
    {
      icon: <Shield size={20} />,
      title: "Safety-First Execution",
      description:
        "Every action is reversible. Git-backed checkpoints, dry-run mode, human-in-the-loop for destructive operations. Trust through transparency.",
    },
    {
      icon: <Layers size={20} />,
      title: "Extensible Architecture",
      description:
        "Plugin-based tool system. Add new MCP servers, custom workflows, and specialized agents. The framework adapts to your stack, not the other way around.",
    },
  ],
  metrics: [
    { value: "MCP", label: "Protocol-Native" },
    { value: "Multi", label: "Agent Pipeline" },
    { value: "100%", label: "Reversible Actions" },
    { value: "0", label: "Copy-Paste Context" },
  ],
  techStack: [
    "TypeScript",
    "Claude API",
    "Model Context Protocol",
    "Node.js",
    "Git Integration",
    "AST Parsing",
    "Streaming SSE",
    "Zod",
  ],
  githubUrl: "https://github.com/aptsalt/claude-pilot",
};

export default function ClaudePilotPage() {
  return <ProjectLayout project={project} />;
}
