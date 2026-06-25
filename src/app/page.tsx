"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Brain,
  Route,
  Search,
  Users,
  Building2,
  Compass,
  Globe2,
  BookOpen,
  Activity,
  Sparkles,
  GraduationCap,
  BarChart3,
  Linkedin,
  Mail,
  Award,
  ShieldCheck,
  Landmark,
  GitPullRequest,
  Target,
  LineChart,
  Cpu,
  Gauge,
  Boxes,
  Mic,
  Video,
  Lightbulb,
  Workflow,
  Database,
  Network,
  Scale,
} from "lucide-react";
import { Navbar } from "./components/navbar";
import { Reveal } from "./components/reveal";
import { EraTimeline } from "./components/era-timeline";
import { ClusterFragment } from "./components/cluster-fragment";

const BASE = "/aptsalt-landing";

/* ============================================
   MOTION GUARD — prefers-reduced-motion
   ============================================ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ============================================
   MAGNETIC — pull an element toward the cursor
   ============================================ */
function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef<number>(0);
  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "";
  };
  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}

/* ============================================
   CLIP TEXT REVEAL — line-by-line masked wipe
   ============================================ */
function ClipReveal({
  children,
  className = "",
  delay = 0,
  as: As = "span",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "span" | "div" | "h1" | "h2" | "p";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <span ref={ref} className={`clip-reveal ${className}`}>
      <As>{children}</As>
    </span>
  );
}

/* ============================================
   DATA — every meaningful repo, in four clusters
   ============================================ */

type Project = {
  slug: string;
  name: string;
  tagline: string;
  accent: string;
  icon: ReactNode;
  tags: string[];
  github?: string;
  live?: string;
  noPage?: boolean; // no /projects detail page — card links out
  flagship?: boolean;
};

type Cluster = {
  id: string;
  label: string; // C1..C4
  name: string;
  accent: string;
  headline: string;
  blurb: string;
  projects: Project[];
};

const gh = (s: string) => `https://github.com/aptsalt/${s}`;

const clusters: Cluster[] = [
  {
    id: "foundations",
    label: "C1",
    name: "Foundations",
    accent: "#8B5CF6",
    headline: "I learned the model from the inside out.",
    blurb:
      "Before touching an API, I built the primitives by hand — pre-training, alignment, reinforcement learning, and inference at the memory level. This is the credibility floor everything else stands on.",
    projects: [
      {
        slug: "ml-portfolio",
        name: "ML Portfolio",
        tagline: "Three systems from scratch in raw PyTorch — a GPT with RLHF/DPO, a PPO game agent, and a feedback-learning RAG. No wrappers.",
        accent: "#8B5CF6",
        icon: <Brain size={20} />,
        tags: ["PyTorch", "RLHF / DPO", "PPO + GAE", "BM25 + FAISS"],
        github: gh("ml-portfolio"),
      },
      {
        slug: "parameter-golf",
        name: "Parameter Golf",
        tagline: "OpenAI's efficiency challenge — the best language model that fits in 16 MB and trains in 10 minutes on 8×H100. QAT, the Muon optimizer, scaling laws.",
        accent: "#a78bfa",
        icon: <Target size={20} />,
        tags: ["Quantization", "Muon", "Scaling Laws", "16 MB"],
        github: gh("parameter-golf"),
      },
      {
        slug: "acma",
        name: "ACMA",
        tagline: "Adaptive Context Memory Allocator — joint prompt-compression + mixed-precision KV-cache + token eviction as a knapsack under one GPU budget. Research-grade.",
        accent: "#7c6cf0",
        icon: <Cpu size={20} />,
        tags: ["KV-Cache", "FP16→INT2", "LLMLingua-2", "Knapsack"],
        github: gh("acma"),
      },
    ],
  },
  {
    id: "infrastructure",
    label: "C2",
    name: "Infrastructure",
    accent: "#3B82F6",
    headline: "The plumbing that makes AI production-grade.",
    blurb:
      "Models are the easy part; the system around them is the job. Cost-routed serving, RAG with continuous evaluation, multi-agent orchestration, on-prem fine-tuning, and AI woven into the developer workflow — all on consumer hardware.",
    projects: [
      {
        slug: "llm-gateway",
        name: "LLM Gateway",
        tagline: "One OpenAI-compatible API across five providers — cost-routing, semantic caching, and circuit-breaker failover with Prometheus/Grafana observability.",
        accent: "#3B82F6",
        icon: <Route size={20} />,
        tags: ["Hono", "Redis", "Semantic Cache", "5 Providers"],
        github: gh("llm-gateway"),
      },
      {
        slug: "rag-eval-engine",
        name: "RAG Eval Engine",
        tagline: "A RAG pipeline with evaluation baked in — hybrid BM25 + dense via RRF, adaptive retrieval, and a 5-metric LLM-as-judge so quality regressions show up instantly.",
        accent: "#10B981",
        icon: <BarChart3 size={20} />,
        tags: ["Qdrant", "RRF", "LLM-as-Judge", "68 Tests"],
        github: gh("rag-eval-engine"),
      },
      {
        slug: "agenthire",
        name: "AgentHire",
        tagline: "Five agents, one pipeline, zero API cost — each agent its own MCP server, coordinated with LangGraph and running 100% on local inference.",
        accent: "#EF4444",
        icon: <Users size={20} />,
        tags: ["LangGraph", "MCP", "Ollama", "Turborepo"],
        github: gh("agenthire"),
      },
      {
        slug: "enterprise-playground",
        name: "Enterprise Playground",
        tagline: "Trained a 14B local model on real enterprise UIs so PMs generate prototypes at $0/token — the full data → QLoRA fine-tune → serve loop on one GPU.",
        accent: "#EAB308",
        icon: <Building2 size={20} />,
        tags: ["QLoRA", "Dual-Model", "ChromaDB", "$0/token"],
        github: gh("enterprise-playground"),
      },
      {
        slug: "git-sentry",
        name: "Git Sentry",
        tagline: "An AI git guardian — four local agents block bad commits at $0, and CI escalates only complex files to Claude, cutting review spend ~75%.",
        accent: "#f43f5e",
        icon: <GitPullRequest size={20} />,
        tags: ["Ollama", "Dual-Phase Security", "GitHub Actions", "~75% Cut"],
        github: gh("git-sentry"),
      },
      {
        slug: "context-engineering-academy",
        name: "Context Engineering Academy",
        tagline: "Teaching the full AI-engineering stack through interactive, quality-scored playgrounds — context, evals, agents, MCP, and observability.",
        accent: "#14B8A6",
        icon: <GraduationCap size={20} />,
        tags: ["6 Academies", "70+ Modules", "Live Scoring"],
        github: gh("context-engineering-academy"),
        live: "https://aptsalt.github.io/context-engineering-academy/",
      },
      {
        slug: "harvest",
        name: "Harvest",
        tagline: "Batch AI tasks across free model quotas and local models — fan work out, recover from errors, pay nothing.",
        accent: "#0ea5e9",
        icon: <Database size={20} />,
        tags: ["Batch", "Multi-Quota", "Local LLM", "$0"],
        github: gh("harvest"),
        noPage: true,
      },
      {
        slug: "composio-hiring-pipeline",
        name: "Composio Hiring Pipeline",
        tagline: "An AI hiring pipeline + MCP bridge — multi-tool orchestration with error recovery, built as platform engineering.",
        accent: "#6366F1",
        icon: <Workflow size={20} />,
        tags: ["Composio", "MCP Bridge", "Orchestration"],
        github: gh("composio-hiring-pipeline"),
        noPage: true,
      },
      {
        slug: "claude-dashboard",
        name: "Claude Dashboard",
        tagline: "Real-time monitoring for the Claude Code ecosystem — see everything, miss nothing.",
        accent: "#84CC16",
        icon: <Activity size={20} />,
        tags: ["WebSocket", "Canvas 3D", "Real-time"],
        github: gh("claude-dashboard"),
      },
      {
        slug: "claude-pilot",
        name: "Claude Pilot",
        tagline: "Mission control for Claude Code — analytics, agent management, and MCP control in one command.",
        accent: "#F97316",
        icon: <Compass size={20} />,
        tags: ["MCP", "TypeScript", "npx"],
        github: gh("claude-pilot"),
      },
      {
        slug: "tech-deep-dive",
        name: "Tech Deep Dive",
        tagline: "Deep technical breakdowns of the projects and the technologies behind them — because understanding compounds.",
        accent: "#F59E0B",
        icon: <BookOpen size={20} />,
        tags: ["MDX", "54 Technologies", "Interactive"],
        github: gh("tech-deep-dive"),
      },
    ],
  },
  {
    id: "agentic",
    label: "C3",
    name: "Agentic Products",
    accent: "#34d399",
    headline: "Agents you can actually ship in a bank.",
    blurb:
      "Grounded RAG with verifiable citations, human-in-the-loop approval, and a tamper-evident audit trail. Governed copilots for regulated domains — the same architecture built as a Python backend and as a zoneless Angular frontend.",
    projects: [
      {
        slug: "meridian",
        name: "Meridian",
        tagline: "An Angular 21, fully zoneless, signals-first agentic banking-policy copilot — verifiable citations, human-in-the-loop, FAPI 2.0 / DPoP. The BMO Lumi pattern, in Angular.",
        accent: "#4d9fff",
        icon: <Landmark size={22} />,
        tags: ["Angular 21", "Signals", "Zoneless", "DPoP"],
        github: gh("meridian"),
        live: "https://aptsalt.github.io/meridian/",
        flagship: true,
      },
      {
        slug: "alpha-advisor",
        name: "ALPHA Advisor",
        tagline: "A LangGraph agentic-RAG wealth-advisory copilot — interrupt-driven human-in-the-loop, knowledge-graph retrieval, governance, and a hash-chained audit trail.",
        accent: "#34d399",
        icon: <LineChart size={22} />,
        tags: ["LangGraph", "GraphRAG", "HITL", "Azure OpenAI"],
        github: gh("alpha-advisor"),
        live: "https://aptsalt.github.io/alpha-advisor/",
        flagship: true,
      },
      {
        slug: "beacon",
        name: "Beacon",
        tagline: "A 65 KB, zero-dependency agentic workspace — grounded citations, human-approved actions, span feedback. Built for air-gapped enterprise.",
        accent: "#f59e0b",
        icon: <Search size={20} />,
        tags: ["React 19", "Cohere v2", "SSE", "65 KB"],
        github: gh("beacon"),
      },
      {
        slug: "nosce",
        name: "Nosce",
        tagline: "Know thyself — an AI that builds a knowledge graph of how you think, then reflects it back.",
        accent: "#06B6D4",
        icon: <Network size={20} />,
        tags: ["Knowledge Graph", "NLP", "Analytics"],
        github: gh("nosce"),
      },
      {
        slug: "sentinel-l4-trust-engine",
        name: "Sentinel L4 Trust Engine",
        tagline: "A trust-scoring engine for Stripe agentic commerce — the missing L3 → L4 layer that lets agents transact safely.",
        accent: "#22c55e",
        icon: <ShieldCheck size={20} />,
        tags: ["Agentic Commerce", "Trust Scoring", "Stripe"],
        github: gh("sentinel-l4-trust-engine"),
        noPage: true,
      },
      {
        slug: "brainrot-index",
        name: "BrainRot Index",
        tagline: "An AI that scores how cooked your thinking is — six cognitive dimensions, scored by Gemini.",
        accent: "#10b981",
        icon: <Gauge size={20} />,
        tags: ["Gemini", "6 Dimensions", "Scoring"],
        github: gh("brainrot-index"),
        noPage: true,
      },
    ],
  },
  {
    id: "market",
    label: "C4",
    name: "In Market & Craft",
    accent: "#F59E0B",
    headline: "Built, billed, shipped — and made beautiful.",
    blurb:
      "Not prototypes. Live products with auth, payments, custom domains and real users — plus the creative frontend craft that proves I think in pixels and shaders too, not just systems.",
    projects: [
      {
        slug: "naviklab",
        name: "NavikLab",
        tagline: "A live, monetized SaaS that scores how developers steer AI agents across six cognitive dimensions — auth, Stripe, a cognitive-API moat. YC S26 / a16z applied.",
        accent: "#06b6d4",
        icon: <Scale size={20} />,
        tags: ["Next.js", "Supabase", "Stripe", "Live $49/mo"],
        github: gh("naviklab"),
        live: "https://naviklab.com",
      },
      {
        slug: "discuria",
        name: "Discuria",
        tagline: "Daily critical-thinking training — real-world scenarios, neural TTS, ranked mode, and IQ-style scoring. Live and shipping.",
        accent: "#f59e0b",
        icon: <Lightbulb size={20} />,
        tags: ["Next.js", "Neural TTS", "Live"],
        live: "https://discuria.space",
        github: gh("discuria"),
        noPage: true,
      },
      {
        slug: "smarnh",
        name: "Smarnh",
        tagline: "AI-powered async group reaction videos — react together, remember forever. Shipped on a custom domain.",
        accent: "#ec4899",
        icon: <Video size={20} />,
        tags: ["React", "AI Director", "Live"],
        live: "https://smarnh.com",
        github: gh("smarnh"),
        noPage: true,
      },
      {
        slug: "thinkforge",
        name: "ThinkForge",
        tagline: "A GitHub for thinking — show HOW you think, not just what you know. A cognitive scoring platform.",
        accent: "#8b5cf6",
        icon: <Boxes size={20} />,
        tags: ["Next.js", "Cognitive", "Platform"],
        github: gh("thinkforge"),
        noPage: true,
      },
      {
        slug: "animated-webgl-library",
        name: "Animated WebGL Library",
        tagline: "86+ standalone WebGL/Canvas visualizations — zero dependencies, zero build tools. Pure browser craft.",
        accent: "#6366F1",
        icon: <Sparkles size={20} />,
        tags: ["WebGL", "GLSL", "Canvas", "Zero-Dep"],
        github: gh("animated-webgl-library"),
        live: "https://aptsalt.github.io/animated-webgl-library/",
      },
      {
        slug: "mole-world-dashboard",
        name: "Mole World Dashboard",
        tagline: "216 Claude sessions became a film-production studio — real-time pipeline monitoring, storyboard viewer, and a voice lab.",
        accent: "#EC4899",
        icon: <Globe2 size={20} />,
        tags: ["Three.js", "Supabase", "Real-time"],
        github: gh("mole-world-dashboard"),
      },
      {
        slug: "podcast-factory",
        name: "Podcast Factory",
        tagline: "A multi-brand podcast pipeline — script generation, TTS, video rendering, and publishing, end to end.",
        accent: "#f97316",
        icon: <Mic size={20} />,
        tags: ["TTS", "Rendering", "Pipeline"],
        github: gh("podcast-factory"),
        noPage: true,
      },
    ],
  },
];

const experience = [
  {
    role: "Senior Consultant — Frontend Lead",
    company: "FINRA",
    location: "Toronto / New York",
    period: "Dec 2021 — Present",
    active: true,
    bullets: [
      "Redesigned Angular + NgRx workflows that improved analyst productivity by 30% across the regulatory platform.",
      "Defined end-to-end testing strategy (Cypress, Playwright, Jasmine), enabling confident bi-weekly releases for a compliance-critical platform.",
      "Built AI tooling: coding agent for test generation, design-to-code tool, MCP-based automation for code reviews, PR workflows, and Jira analysis.",
      "Prototyped agent swarm for autonomous task execution and a classification model predicting review case complexity.",
    ],
  },
  {
    role: "Senior Frontend Developer",
    company: "Home Depot",
    location: "Toronto",
    period: "Oct 2019 — Nov 2021",
    active: false,
    bullets: [
      "Architected organization-wide Angular component library adopted across multiple customer-facing and internal apps — modular, tested, accessibility-compliant.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "CIBC",
    location: "Toronto",
    period: "May 2019 — Oct 2019",
    active: false,
    bullets: [
      "Built payment platform for international student fee disbursement — Angular 5, Node.js/Express, MongoDB.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "TD Bank",
    location: "Toronto",
    period: "May 2018 — Feb 2019",
    active: false,
    bullets: [
      "Built credit card application with instant approval flow — Angular 6, TypeScript, Java/Spring backend.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Nico Info Systems",
    location: "Hyderabad, India",
    period: "Aug 2012 — Jul 2016",
    active: false,
    bullets: [
      "Built enterprise web applications (Java, Spring Boot, Angular) — production-grade UIs with RESTful backends.",
    ],
  },
];

const skillCategories = [
  {
    label: "Frontend",
    skills: ["Angular", "React", "Next.js", "TypeScript", "NgRx/Redux/RxJS", "Zustand", "TanStack Query", "Tailwind v4", "shadcn/ui", "Three.js/WebGL", "Storybook"],
  },
  {
    label: "AI Engineering",
    skills: ["Ollama", "Multi-Provider Routing", "RAG Pipelines", "BM25 + Vector Search", "Semantic Caching", "QLoRA Fine-Tuning", "LLM-as-Judge Eval", "Multi-Agent Orchestration", "LangGraph", "MCP SDK"],
  },
  {
    label: "Backend & Data",
    skills: ["FastAPI", "Hono", "Node.js/Express", "Java/Spring", "PostgreSQL", "MongoDB", "Redis", "Qdrant", "ChromaDB", "Drizzle ORM", "Docker"],
  },
  {
    label: "Testing & DevOps",
    skills: ["Cypress", "Playwright", "Vitest", "Jest", "Jasmine", "GitHub Actions", "Jenkins", "Prometheus", "Grafana"],
  },
];

/* ============================================
   PROJECT CARD — clean, accent-driven, meaningful
   ============================================ */
function ProjectCard({ project, accent }: { project: Project; accent?: string }) {
  const acc = accent ?? project.accent;
  const accentVars = { ["--card-accent" as string]: acc };
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltFrame = useRef<number>(0);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(tiltFrame.current);
    tiltFrame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.transform = `translateY(-6px) perspective(1000px) rotateX(${(0.5 - py) * 2.5}deg) rotateY(${(px - 0.5) * 2.5}deg)`;
    });
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(tiltFrame.current);
    el.style.transform = "";
  };

  const Inner = (
    <div
      ref={cardRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group h-full ${project.flagship ? "flagship-card" : "project-card"}`}
      style={accentVars}
    >
      {/* poster — the project's own object, floating on an accent field */}
      <div className={`card-poster relative z-10 overflow-hidden ${project.flagship ? "h-48" : "h-40"}`} style={accentVars}>
        <span className="card-poster-glow" aria-hidden="true" />
        <span className="card-poster-grid" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="card-object" src={`${BASE}/gen/${project.slug}.webp`} alt={`${project.name} object`} loading="lazy" />
        <div
          className="absolute left-4 top-4 z-20 w-10 h-10 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          style={{
            color: acc,
            background: "color-mix(in srgb, var(--card-accent) 14%, white)",
            border: "1px solid color-mix(in srgb, var(--card-accent) 30%, transparent)",
          }}
        >
          {project.icon}
        </div>
        {project.flagship && (
          <span className="absolute top-4 right-4 z-20 flagship-ribbon"><Sparkles size={11} /> Flagship</span>
        )}
      </div>

      <div className={`relative z-10 ${project.flagship ? "p-6" : "p-5"}`}>
        <h3 className={`font-semibold mb-2 ${project.flagship ? "text-lg" : "text-base"}`}>{project.name}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4">{project.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[11px] font-mono border text-muted"
              style={{ borderColor: "color-mix(in srgb, var(--card-accent) 24%, var(--border))" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted group-hover:text-foreground transition-colors">
            {project.noPage ? "Open project" : "View details"}
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </span>
          {(project.github || project.live) && (
            <span className="flex items-center gap-2">
              {project.github && (
                <span
                  role="link"
                  tabIndex={0}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.github, "_blank", "noopener,noreferrer"); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); window.open(project.github, "_blank", "noopener,noreferrer"); } }}
                  className="repo-pill"
                  aria-label={`${project.name} on GitHub (opens in new tab)`}
                >
                  <Github size={12} /> Code
                </span>
              )}
              {project.live && (
                <span
                  role="link"
                  tabIndex={0}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.live, "_blank", "noopener,noreferrer"); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); window.open(project.live, "_blank", "noopener,noreferrer"); } }}
                  className="repo-pill"
                  style={{ color: acc, borderColor: "color-mix(in srgb, var(--card-accent) 45%, var(--border))" }}
                  aria-label={`${project.name} live site (opens in new tab)`}
                >
                  Live <ArrowUpRight size={12} />
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (project.noPage) {
    const href = project.live || project.github || "#";
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {Inner}
      </a>
    );
  }
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      {Inner}
    </Link>
  );
}

/* ============================================
   PAGE
   ============================================ */
export default function Home() {
  usePrefersReducedMotion();
  const totalProjects = clusters.reduce((n, c) => n + c.projects.length, 0);

  return (
    <div className="min-h-screen">
      <a href="#c1" className="skip-link">Skip to work</a>
      <Navbar />

      {/* ============================================
          HERO — From Silicon to Sentience: a scroll
          through the history that leads to the work
          ============================================ */}
      <header className="hero-silicon">
        <div className="hero-grid" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="eyebrow">Senior Frontend &amp; AI Engineer — Toronto</span>
          </div>
          <h1 className="whitespace-nowrap text-[clamp(1.9rem,6.4vw,5rem)] font-bold tracking-[-0.045em] leading-[0.95] mb-5">
            Deepak Singh Kandari
          </h1>
          <p className="text-[clamp(1.05rem,2.4vw,1.5rem)] text-muted max-w-2xl mx-auto leading-snug mb-8">
            I build <span className="font-medium text-foreground">agentic AI products</span> — and the frontend
            craft around them. One lineage of engineering, dispersed across {totalProjects} projects.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Magnetic strength={0.3}>
              <a href="#c1" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-foreground text-background transition-transform">
                View the work <ArrowRight size={15} />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href="mailto:deepchand89k@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-border hover:border-foreground/30 transition-colors">
                <Mail size={15} /> Get in touch
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="hero-era-head relative z-10">
          <span className="hero-era-kicker">The lineage</span>
          <h2 className="hero-era-title">From Silicon to Sentience</h2>
          <p className="hero-era-sub">
            Every project below stands on this history — the transistor to the autonomous agent.
          </p>
        </div>
        <EraTimeline />
        <p className="hero-converge relative z-10">
          Seventy years of engineering converge into four clusters of work.
        </p>
      </header>

      {/* ============================================
          THE FOUR CLUSTERS — C1 → C4
          ============================================ */}
      {clusters.map((cluster) => (
        <section
          key={cluster.id}
          id={cluster.label.toLowerCase()}
          className="cluster-section cv-auto"
          style={{ ["--c-accent" as string]: cluster.accent }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="cluster-head">
              <Reveal>
                <div className="max-w-2xl">
                  <div className="cluster-band">
                    <span className="dot" />
                    <span className="tag">{cluster.label}</span>
                    <span className="eyebrow">{cluster.name}</span>
                  </div>
                  <ClipReveal as="h2" className="cluster-headline">{cluster.headline}</ClipReveal>
                  <p className="text-muted text-lg leading-relaxed">{cluster.blurb}</p>
                  <p className="mt-4 text-xs font-mono text-muted/70 tracking-wider">
                    {cluster.projects.length} projects · disassembled from the core
                  </p>
                  <div className="cluster-rule" />
                </div>
              </Reveal>
              <div className="cluster-frag-wrap" aria-hidden="true">
                <ClusterFragment accent={cluster.accent} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cluster.projects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 70} direction="card">
                  <ProjectCard project={project} accent={cluster.accent} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* ============================================
          EXPERIENCE
          ============================================ */}
      <section id="experience" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <ClipReveal as="h2" className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-2">Experience</ClipReveal>
            <p className="text-muted mb-12">13+ years across financial services, retail, and AI platforms.</p>
          </Reveal>
          <div className="space-y-0">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 80}>
                <div className="relative pl-8 pb-10 last:pb-0">
                  {i < experience.length - 1 && <div className="timeline-line" />}
                  <div className={`timeline-dot ${job.active ? "active" : ""}`} />
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-base font-semibold">{job.role}</h3>
                      <p className="text-sm text-muted">{job.company} &middot; {job.location}</p>
                    </div>
                    <span className="text-xs font-mono text-muted shrink-0">{job.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {job.bullets.map((bullet, j) => (
                      <li key={j} className="text-sm text-muted leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* ============================================
          SKILLS
          ============================================ */}
      <section id="skills" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <ClipReveal as="h2" className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-2">Technical Skills</ClipReveal>
            <p className="text-muted mb-12">Across the full stack — from pixel-perfect UIs to GPU inference.</p>
          </Reveal>
          <div className="space-y-10">
            {skillCategories.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 100}>
                <div>
                  <h3 className="eyebrow mb-4">{cat.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* ============================================
          CERTIFICATIONS
          ============================================ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <ClipReveal as="h2" className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-12">Certifications</ClipReveal>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl p-8 category-sage">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Machine Learning Specialization</h3>
                  <p className="text-sm text-muted mb-4">Stanford University / DeepLearning.AI (Coursera)</p>
                  <div className="flex flex-wrap gap-2">
                    {["Supervised Learning", "Neural Networks", "Decision Trees", "Unsupervised Learning", "Recommenders", "Reinforcement Learning"].map((topic) => (
                      <span key={topic} className="px-3 py-1 rounded-full text-xs font-mono bg-white/50 text-foreground">{topic}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* ============================================
          CONTACT
          ============================================ */}
      <section id="contact" className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <ClipReveal as="h2" className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4">Let&apos;s build something.</ClipReveal>
            <p className="text-muted mb-10 max-w-lg mx-auto leading-relaxed">
              Looking for a senior engineer who can lead frontend architecture and build agentic AI product
              features end to end? Let&apos;s talk.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Magnetic strength={0.3}>
                <a href="mailto:deepchand89k@gmail.com" className="cta-solid inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-foreground text-background transition-transform">
                  <Mail size={16} /> deepchand89k@gmail.com
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a href="https://github.com/aptsalt?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-border hover:border-foreground/30 transition-colors">
                  <Github size={16} /> github.com/aptsalt
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm opacity-70">Deepak Singh Kandari</div>
            <div className="flex items-center gap-5">
              <a href="https://github.com/aptsalt" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity"><Github size={18} /></a>
              <a href="https://linkedin.com/in/deepaksinghkandari" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity"><Linkedin size={18} /></a>
              <a href="mailto:deepchand89k@gmail.com" className="opacity-50 hover:opacity-100 transition-opacity"><Mail size={18} /></a>
            </div>
            <div className="text-xs opacity-40">Built with Next.js &amp; Tailwind · {totalProjects} projects, one system</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
