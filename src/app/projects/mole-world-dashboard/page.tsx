"use client";

import { Globe2, BarChart3, Film, Lock, Radio, MapPin } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "mole-world-dashboard",
  name: "Mole World Dashboard",
  tagline: "216 Claude sessions orchestrated into a film production studio — 3D globe, real-time analytics, and AI pipeline management.",
  accentClass: "accent-pink",
  accentColor: "#EC4899",
  heroImage: "/aptsalt-landing/images/mole-world-dashboard-hero.jpg",
  architectureDiagram: "/aptsalt-landing/images/diagrams/mole-world-dashboard.png",
  narrative: {
    hook: "216 Claude sessions made a film production studio.",
    problem:
      "Producing an animated film with AI means coordinating hundreds of Claude sessions — characters, scenes, dialogue, music, art direction. Without a dashboard, you're flying blind through a creative tornado. Sessions overlap, context gets lost, and no one knows which pipeline stage each asset is in.",
    approach:
      "Built a full production dashboard: a 3D globe visualizing session activity worldwide, real-time analytics on token usage and costs, a 12-stage film pipeline tracker, and Supabase-backed auth with role-based access. Every session is tracked, every asset is categorized, and the entire production state is visible at a glance.",
    insight:
      "The magic wasn't the 3D globe or the analytics — it was making the invisible visible. When you can see 216 sessions mapped across a timeline, patterns emerge: which creative decisions clustered together, where bottlenecks formed, and how the story evolved through iteration. The dashboard became the production's memory.",
  },
  features: [
    {
      icon: <Globe2 size={20} />,
      title: "3D Globe Visualization",
      description:
        "Three.js-powered globe showing session activity with real-time data points, orbital controls, and animated connections between related sessions.",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Session Analytics",
      description:
        "Token usage, cost tracking, session duration heatmaps, and trend analysis across all 216 Claude sessions with filterable views.",
    },
    {
      icon: <Film size={20} />,
      title: "Film Pipeline Tracker",
      description:
        "12-stage pipeline from concept to final render. Each asset tracked through storyboard, dialogue, animation, music, and post-production stages.",
    },
    {
      icon: <Lock size={20} />,
      title: "Auth & Role-Based Access",
      description:
        "Supabase auth with admin, editor, and viewer roles. Row-level security ensures each team member sees only what they need.",
    },
    {
      icon: <Radio size={20} />,
      title: "Real-Time Updates",
      description:
        "Supabase Realtime subscriptions push session updates, pipeline changes, and analytics refreshes to all connected clients instantly.",
    },
    {
      icon: <MapPin size={20} />,
      title: "Asset Tracker",
      description:
        "Every character, scene, and audio asset cataloged with metadata, version history, and pipeline stage. Nothing gets lost in production.",
    },
  ],
  metrics: [
    { value: "216", label: "Claude Sessions" },
    { value: "3D", label: "Globe Visualization" },
    { value: "Real-time", label: "Live Updates" },
    { value: "12", label: "Pipeline Stages" },
  ],
  techStack: [
    "Next.js 15",
    "Three.js",
    "React Three Fiber",
    "Supabase",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "Supabase Realtime",
  ],
  githubUrl: "https://github.com/aptsalt/mole-world-dashboard",
};

export default function MoleWorldDashboardPage() {
  return <ProjectLayout project={project} />;
}
