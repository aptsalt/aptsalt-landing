"use client";

import { Search, Network, BarChart3, Lightbulb, BookOpen, Sparkles } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "nosce",
  name: "Nosce",
  tagline: "γνῶθι σεαυτόν — Know thyself. An AI system that builds a knowledge graph of you, surfacing patterns you can't see alone.",
  accentClass: "accent-cyan",
  accentColor: "#06B6D4",
  heroImage: "/aptsalt-landing/images/nosce-hero.jpg",
  narrative: {
    hook: "The ancient Greeks carved it above the Oracle at Delphi. Two thousand years later, we still don't have good tools for it.",
    problem:
      "We generate terabytes of digital exhaust — notes, conversations, decisions, projects — but none of it connects. Your journal doesn't talk to your bookmarks. Your meeting notes don't link to your research. The patterns in your thinking are invisible to you because no tool models you as a graph.",
    approach:
      "Nosce ingests your digital footprint and builds a living knowledge graph. It identifies recurring themes, maps conceptual connections, tracks how your thinking evolves over time, and surfaces blind spots. It's not a note-taking app — it's a mirror that shows you your own cognitive patterns.",
    insight:
      "Self-knowledge isn't about storing more information — it's about seeing the connections between what you already know. When your ideas, interests, and decisions are modeled as a graph, emergent patterns become visible: which topics you avoid, which assumptions you never question, which threads of thought keep appearing across years of unrelated work.",
  },
  features: [
    {
      icon: <Network size={20} />,
      title: "Personal Knowledge Graph",
      description:
        "Entities, relationships, and observations modeled as a living graph. Your ideas aren't files — they're nodes in a network of meaning that grows with you.",
    },
    {
      icon: <Search size={20} />,
      title: "Pattern Discovery",
      description:
        "AI-powered analysis surfaces recurring themes, conceptual clusters, and evolution of thought across time. See what your conscious mind misses.",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Cognitive Analytics",
      description:
        "Track how your interests shift, which ideas persist, and where your thinking has gaps. Quantified self-reflection backed by graph metrics.",
    },
    {
      icon: <Lightbulb size={20} />,
      title: "Insight Generation",
      description:
        "Semantic similarity and graph traversal connect ideas across domains. Yesterday's research note links to a conversation from three months ago.",
    },
    {
      icon: <BookOpen size={20} />,
      title: "Multi-Source Ingestion",
      description:
        "Notes, bookmarks, highlights, conversations, journal entries. Nosce meets your data where it lives and unifies it into one coherent model.",
    },
    {
      icon: <Sparkles size={20} />,
      title: "Temporal Awareness",
      description:
        "Your knowledge graph isn't static. Nosce tracks when ideas emerge, evolve, and fade — giving you a timeline of your own intellectual development.",
    },
  ],
  metrics: [
    { value: "∞", label: "Graph Depth" },
    { value: "NLP", label: "Entity Extraction" },
    { value: "Live", label: "Pattern Detection" },
    { value: "Yours", label: "Data Ownership" },
  ],
  techStack: [
    "Knowledge Graphs",
    "NLP",
    "Entity Extraction",
    "Semantic Similarity",
    "Graph Analytics",
    "Vector Embeddings",
    "Temporal Modeling",
    "Python",
  ],
  githubUrl: "https://github.com/aptsalt/nosce",
};

export default function NoscePage() {
  return <ProjectLayout project={project} />;
}
