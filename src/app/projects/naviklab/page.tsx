"use client";

import {
  Gauge,
  Brain,
  ShieldCheck,
  CreditCard,
  LineChart,
  Rocket,
} from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "naviklab",
  name: "NavikLab",
  tagline:
    "A live, monetized SaaS that scores how developers steer AI agents — six cognitive dimensions, a real $49/mo tier, and a payments pipeline that runs in production.",
  accentClass: "accent-cyan",
  accentColor: "#06b6d4",
  narrative: {
    hook: "The skill that matters now isn't writing code — it's directing the thing that writes it.",
    problem:
      "Every developer is suddenly an agent operator, but nobody can tell you how good they are at it. There's no scoreboard for prompting, decomposition, verification, or knowing when to override the model. Teams adopt AI tooling and simply hope the steering improves. Hope is not a metric, and 'vibes' don't survive a performance review or a hiring loop.",
    approach:
      "NavikLab turns agent steering into a measurable signal across six cognitive dimensions. I shipped it as a real product, not a demo: Supabase handles auth and Postgres, Stripe runs billing with webhook-driven entitlement, and a $49/mo tier gates the deeper analysis. It's deployed on Vercel behind a custom domain — money moves through it, and it's in front of YC S26 and a16z.",
    insight:
      "Building the scoring model was the easy half. The hard, real engineering was the boundary work — making sure a Stripe webhook is the single source of truth for who can access what, that auth state and billing state never disagree, and that a failed payment degrades gracefully instead of leaking a paid feature. A monetized SaaS isn't the model; it's the seams between auth, payments, and product that you have to get exactly right.",
  },
  features: [
    {
      icon: <Gauge size={20} />,
      title: "Six-Dimension Cognitive Score",
      description:
        "Agent-steering ability is evaluated across six cognitive dimensions, turning a fuzzy soft skill into a structured, comparable signal developers can actually track over time.",
    },
    {
      icon: <Brain size={20} />,
      title: "Steering Evaluation Engine",
      description:
        "The core of the product reads how a developer directs an AI agent and translates that behavior into per-dimension scores — the moat that everything else wraps around.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Supabase Auth + Postgres",
      description:
        "Authentication and persistence run on Supabase. User identity, sessions, and scoring data live in Postgres, keeping the source of truth close to the data that powers every view.",
    },
    {
      icon: <CreditCard size={20} />,
      title: "Stripe Billing + Webhooks",
      description:
        "A real $49/mo tier backed by Stripe checkout and webhook-driven entitlement. Payment events — not the client — decide access, so billing state and product access never drift apart.",
    },
    {
      icon: <LineChart size={20} />,
      title: "shadcn/ui Product Surface",
      description:
        "A polished Next.js App Router front end built on Tailwind and shadcn/ui, designed so the cognitive scores read as a product people pay for, not a research notebook.",
    },
    {
      icon: <Rocket size={20} />,
      title: "Live on Vercel + Custom Domain",
      description:
        "Deployed to production on Vercel behind naviklab.com, monetized today and submitted to YC S26 and a16z — a shipped company, not a side project sitting in a branch.",
    },
  ],
  metrics: [
    { value: "6", label: "Cognitive Dimensions" },
    { value: "$49/mo", label: "Live Paid Tier" },
    { value: "YC S26", label: "Applicant" },
    { value: "Live", label: "On naviklab.com" },
  ],
  techStack: [
    "Next.js",
    "App Router",
    "Supabase",
    "PostgreSQL",
    "Stripe",
    "Stripe Webhooks",
    "Tailwind CSS",
    "shadcn/ui",
    "Vercel",
  ],
  githubUrl: "https://github.com/aptsalt/naviklab",
  liveUrl: "https://naviklab.com",
};

export default function NavikLabPage() {
  return <ProjectLayout project={project} />;
}
