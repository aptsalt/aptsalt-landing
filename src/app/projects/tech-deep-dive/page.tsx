"use client";

import { BookOpen, Layers, BarChart3, Search, FileText, Code2 } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "tech-deep-dive",
  name: "Tech Deep Dive",
  tagline: "54 deep-dives across 6 categories — because understanding compounds and surface-level knowledge decays.",
  accentClass: "accent-amber",
  accentColor: "#F59E0B",
  heroImage: "/aptsalt-landing/images/tech-deep-dive-hero.jpg",
  architectureDiagram: "/aptsalt-landing/images/diagrams/tech-deep-dive.png",
  narrative: {
    hook: "54 deep-dives. Because understanding compounds.",
    problem:
      "The tech industry has a depth problem. Developers know the API but not the protocol. They use the framework but can't explain the runtime. Blog posts skim the surface, tutorials copy-paste solutions, and Stack Overflow answers solve symptoms. Real understanding requires going deep — repeatedly.",
    approach:
      "Built an interactive knowledge base with 54 deep-dives organized across 6 categories: Systems, ML/AI, Web, Data, Infrastructure, and Security. Each article is a full technical exploration — not a tutorial, but an investigation. MDX-powered with live code playgrounds, progress tracking, and spaced-repetition cues.",
    insight:
      "Knowledge compounds, but only if you revisit it. The progress tracking isn't a gamification trick — it's the core feature. When you can see which deep-dives you've completed and which need review, learning becomes systematic instead of scattered. 54 articles is a curriculum, not a blog.",
  },
  features: [
    {
      icon: <BookOpen size={20} />,
      title: "6 Knowledge Categories",
      description:
        "Systems, ML/AI, Web, Data, Infrastructure, Security. Each category is a learning path with ordered deep-dives building on previous concepts.",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Progress Tracking",
      description:
        "Track completion across all 54 articles with visual progress bars, last-visited timestamps, and spaced-repetition review reminders.",
    },
    {
      icon: <Layers size={20} />,
      title: "Interactive Visualizations",
      description:
        "Complex concepts explained with interactive diagrams — data flow visualizations, architecture diagrams, and algorithm step-throughs.",
    },
    {
      icon: <Search size={20} />,
      title: "Full-Text Search",
      description:
        "Search across all 54 articles instantly. Fuzzy matching, tag filtering, and category scoping help you find exactly what you need.",
    },
    {
      icon: <FileText size={20} />,
      title: "MDX Content Engine",
      description:
        "Rich content with embedded React components, syntax-highlighted code blocks, and custom callouts. Technical writing that breathes.",
    },
    {
      icon: <Code2 size={20} />,
      title: "Code Playground",
      description:
        "Live code execution for JavaScript, TypeScript, and Python examples. Edit, run, and experiment without leaving the article.",
    },
  ],
  metrics: [
    { value: "54", label: "Deep-Dives" },
    { value: "6", label: "Categories" },
    { value: "Interactive", label: "Visualizations" },
    { value: "Searchable", label: "Full Corpus" },
  ],
  techStack: [
    "Next.js 15",
    "MDX",
    "TypeScript",
    "Tailwind CSS",
    "Prism.js",
    "React",
    "Fuse.js",
  ],
  githubUrl: "https://github.com/aptsalt/tech-deep-dive",
};

export default function TechDeepDivePage() {
  return <ProjectLayout project={project} />;
}
