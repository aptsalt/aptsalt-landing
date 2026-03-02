"use client";

import { GraduationCap, BookOpen, Dumbbell, TrendingUp, Terminal, Award } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "context-engineering-academy",
  name: "Context Engineering Academy",
  tagline: "6 academies. 70+ modules. The discipline of shaping AI context — taught through interactive exercises and real-world patterns.",
  accentClass: "accent-teal",
  accentColor: "#14B8A6",
  heroImage: "/aptsalt-landing/images/context-engineering-academy-hero.jpg",
  narrative: {
    hook: "6 academies. 70+ modules. Teaching what I learned.",
    problem:
      "Prompt engineering is a buzzword. Context engineering is a discipline. Most AI education teaches you to write clever prompts — but production AI systems fail because of bad context management, not bad prompts. Missing retrieval, overloaded windows, lost instructions, hallucinated tool calls — these are context problems, not prompt problems.",
    approach:
      "Built 6 structured academies covering the full context engineering stack: Foundation (how context windows work), Retrieval (RAG and search), Memory (conversation and knowledge management), Tools (function calling and MCP), Orchestration (multi-agent systems), and Evaluation (measuring what matters). 70+ interactive modules with exercises, sandboxes, and real-world case studies.",
    insight:
      "The best teaching tool turned out to be failure. Each module includes a 'context failure' exercise where you deliberately break an AI system by mismanaging its context — then fix it. When you see a $50 API call fail because the context window overflowed, you learn context budgeting faster than any lecture could teach.",
  },
  features: [
    {
      icon: <GraduationCap size={20} />,
      title: "6 Structured Academies",
      description:
        "Foundation, Retrieval, Memory, Tools, Orchestration, Evaluation. Each academy builds on the previous, creating a complete learning path from basics to advanced.",
    },
    {
      icon: <BookOpen size={20} />,
      title: "70+ Interactive Modules",
      description:
        "Each module combines theory, code examples, interactive exercises, and real-world case studies. No passive reading — every concept has a hands-on component.",
    },
    {
      icon: <Dumbbell size={20} />,
      title: "Hands-On Exercises",
      description:
        "Context failure exercises, prompt debugging challenges, retrieval optimization tasks, and multi-agent coordination problems. Learn by breaking, then fixing.",
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Progress Tracking",
      description:
        "Per-module completion, quiz scores, exercise results, and streak tracking. Visual progress across all 6 academies with suggested review schedules.",
    },
    {
      icon: <Terminal size={20} />,
      title: "Code Sandboxes",
      description:
        "In-browser environments for experimenting with context patterns. Test RAG configurations, prompt templates, and tool schemas without local setup.",
    },
    {
      icon: <Award size={20} />,
      title: "Completion Certificates",
      description:
        "Shareable certificates for each completed academy. Verified through exercise completion and quiz performance, not just reading time.",
    },
  ],
  metrics: [
    { value: "6", label: "Academies" },
    { value: "70+", label: "Modules" },
    { value: "Interactive", label: "Exercises" },
    { value: "Open Source", label: "Free Forever" },
  ],
  techStack: [
    "Next.js 15",
    "MDX",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "React 19",
    "Sandpack",
  ],
  githubUrl: "https://github.com/aptsalt/context-engineering-academy",
};

export default function ContextEngineeringAcademyPage() {
  return <ProjectLayout project={project} />;
}
