"use client";

import Link from "next/link";
import Image from "next/image";
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
  MapPin,
  Briefcase,
  Award,
  ExternalLink,
  ShieldCheck,
  Landmark,
  GitPullRequest,
  Target,
  LineChart,
} from "lucide-react";
import { Navbar } from "./components/navbar";
import { Reveal } from "./components/reveal";
import { ParallaxLayer, useHeroParallax, CountUp } from "./components/parallax";
import { VideoBackground } from "./components/video-background";

const BASE = "/aptsalt-landing";

/* ============================================
   MOTION GUARD — single source of truth for
   prefers-reduced-motion, SSR-safe + live updates
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
   MAGNETIC — pull an element toward the cursor.
   Pointer-fine devices only; no-op under reduced motion.
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
    if (!el) return;
    if (e.pointerType !== "mouse") return;
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
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`magnetic ${className}`}
    >
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
  const ref = useRef<HTMLDivElement>(null);

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
   MASK LINE — a single oversized headline line that
   wipes up from behind a clip mask. Staggered by delay.
   ============================================ */

function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`mask-line ${className}`}>
      <span style={{ ["--mask-delay" as string]: `${delay}ms` }}>{children}</span>
    </span>
  );
}

/* ============================================
   RAIL REVEAL — wrapper with a vertical accent rail
   that draws itself in when the block enters view
   ============================================ */

function RailReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`section-rail ${className}`}>
      {children}
    </div>
  );
}

/* ============================================
   DATA
   ============================================ */

type Project = {
  num: string;
  slug: string;
  name: string;
  tagline: string;
  accent: string;
  icon: ReactNode;
  tags: string[];
  heroImage?: string;
  github?: string;
  live?: string;
};

type Cluster = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  projects: Project[];
};

/* — Flagship cluster: the new headline work — */
const flagships: Project[] = [
  {
    num: "★",
    slug: "meridian",
    name: "Meridian",
    tagline:
      "An Angular 21 zoneless/signals agentic banking-policy copilot — governed retrieval, human-in-the-loop, citation-grade answers.",
    accent: "#4d9fff",
    icon: <Landmark size={22} />,
    tags: ["Angular 21", "Signals", "Agentic RAG", "HITL"],
    github: "https://github.com/aptsalt/meridian",
    live: "https://aptsalt.github.io/meridian/",
  },
  {
    num: "★",
    slug: "alpha-advisor",
    name: "ALPHA Advisor",
    tagline:
      "A LangGraph agentic-RAG wealth-advisory copilot — interrupt-driven HITL, governance, knowledge graph, and a hash-chained audit trail.",
    accent: "#34d399",
    icon: <LineChart size={22} />,
    tags: ["LangGraph", "Agentic RAG", "Governance", "Audit Trail"],
    github: "https://github.com/aptsalt/alpha-advisor",
    live: "https://aptsalt.github.io/alpha-advisor/",
  },
];

/* — New supporting flagships, grouped into the narrative clusters below — */
const beacon: Project = {
  num: "F3",
  slug: "beacon",
  name: "Beacon",
  tagline: "FastAPI agentic RAG with a React/TS streaming chat surface and inline, click-through citations.",
  accent: "#f59e0b",
  icon: <Search size={20} />,
  tags: ["FastAPI", "Agentic RAG", "Streaming", "Citations"],
  github: "https://github.com/aptsalt/beacon",
};

const gitSentry: Project = {
  num: "F4",
  slug: "git-sentry",
  name: "Git Sentry",
  tagline: "An AI git guardian — four agents review every diff locally before it ever reaches CI.",
  accent: "#ef4444",
  icon: <GitPullRequest size={20} />,
  tags: ["4 Agents", "Ollama", "CI Guard", "Next.js"],
  github: "https://github.com/aptsalt/git-sentry",
};

const acma: Project = {
  num: "F5",
  slug: "acma",
  name: "ACMA",
  tagline: "Agentic code-modernization assistant — reads legacy, plans the migration, ships the refactor.",
  accent: "#a78bfa",
  icon: <ShieldCheck size={20} />,
  tags: ["Agents", "Modernization", "Refactor", "Planning"],
  github: "https://github.com/aptsalt/acma",
};

const parameterGolf: Project = {
  num: "F6",
  slug: "parameter-golf",
  name: "Parameter Golf",
  tagline: "Win the most with the fewest parameters — a from-scratch experiment in lean model configuration.",
  accent: "#ec4899",
  icon: <Target size={20} />,
  tags: ["From-Scratch", "Optimization", "Eval", "Lean"],
  github: "https://github.com/aptsalt/parameter-golf",
};

const naviklab: Project = {
  num: "F7",
  slug: "naviklab",
  name: "NavikLab",
  tagline: "A live SaaS that scores Claude Code sessions in real time — auth, Stripe, and a cognitive API moat.",
  accent: "#06b6d4",
  icon: <Activity size={20} />,
  tags: ["Live SaaS", "Stripe", "Cognitive API", "Next.js"],
  github: "https://github.com/aptsalt/naviklab",
  live: "https://naviklab.com",
};

/* — Narrative clusters: the new flagships, woven into a coherent story — */
const clusters: Cluster[] = [
  {
    id: "agentic-products",
    index: "C1",
    title: "Agentic Products",
    blurb: "Beyond the two flagships above — more end-to-end agentic copilots for regulated domains, with governed retrieval and answers you can audit.",
    projects: [beacon],
  },
  {
    id: "ai-infrastructure",
    index: "C2",
    title: "AI Infrastructure",
    blurb: "The guardrails and pipes around the models — agents that review code, modernize systems, and run on consumer hardware.",
    projects: [gitSentry, acma],
  },
  {
    id: "from-scratch-ml",
    index: "C3",
    title: "From-Scratch ML",
    blurb: "Not wrappers. Building and tuning the model itself, from first principles.",
    projects: [parameterGolf],
  },
  {
    id: "live-products",
    index: "C4",
    title: "Live Products",
    blurb: "Shipped, paid, and in production — real users, real revenue, real uptime.",
    projects: [naviklab],
  },
];

/* — Original four acts (the foundational body of work) — */
const acts: {
  number: string;
  title: string;
  subtitle: string;
  connection?: string;
  projects: Project[];
}[] = [
  {
    number: "I",
    title: "Understanding",
    subtitle: "Learning the fundamentals — from first principles, not wrappers.",
    connection: "Understanding built the foundation. Now build the infrastructure.",
    projects: [
      {
        num: "01",
        slug: "ml-portfolio",
        name: "ML Portfolio",
        tagline: "Everyone fine-tunes. Very few build from the ground up.",
        accent: "#8B5CF6",
        icon: <Brain size={20} />,
        tags: ["PyTorch", "RLHF", "DPO", "PPO"],
        heroImage: `${BASE}/images/ml-portfolio-hero.jpg`,
      },
      {
        num: "02",
        slug: "nosce",
        name: "Nosce",
        tagline: "Know thyself. An AI that builds a knowledge graph of you.",
        accent: "#06B6D4",
        icon: <Search size={20} />,
        tags: ["Knowledge Graph", "NLP", "Analytics"],
        heroImage: `${BASE}/images/nosce-hero.jpg`,
      },
      {
        num: "03",
        slug: "tech-deep-dive",
        name: "Tech Deep Dive",
        tagline: "54 deep-dives. Because understanding compounds.",
        accent: "#F59E0B",
        icon: <BookOpen size={20} />,
        tags: ["MDX", "54 Articles", "Interactive"],
        heroImage: `${BASE}/images/tech-deep-dive-hero.jpg`,
      },
    ],
  },
  {
    number: "II",
    title: "Infrastructure",
    subtitle: "Building the pipes — reliable systems that scale on consumer hardware.",
    connection: "The pipes are laid. Now give the AI autonomy.",
    projects: [
      {
        num: "04",
        slug: "rag-eval-engine",
        name: "RAG Eval Engine",
        tagline: "If you can't measure it, you don't have it.",
        accent: "#10B981",
        icon: <BarChart3 size={20} />,
        tags: ["RAG", "Qdrant", "FastAPI", "MCP"],
        heroImage: `${BASE}/images/rag-eval-engine-hero.jpg`,
      },
      {
        num: "05",
        slug: "llm-gateway",
        name: "LLM Gateway",
        tagline: "One API. Five providers. Zero lock-in.",
        accent: "#3B82F6",
        icon: <Route size={20} />,
        tags: ["Hono", "Redis", "PostgreSQL", "5 Providers"],
        heroImage: `${BASE}/images/llm-gateway-hero.jpg`,
      },
      {
        num: "06",
        slug: "claude-dashboard",
        name: "Claude Dashboard",
        tagline: "See everything. Miss nothing.",
        accent: "#84CC16",
        icon: <Activity size={20} />,
        tags: ["WebSocket", "Canvas 3D", "Real-time"],
        heroImage: `${BASE}/images/claude-dashboard-hero.jpg`,
      },
    ],
  },
  {
    number: "III",
    title: "Agency",
    subtitle: "Giving AI autonomy — agents that think, coordinate, and ship.",
    connection: "Autonomy created the tools. Now express what they taught you.",
    projects: [
      {
        num: "07",
        slug: "enterprise-playground",
        name: "Enterprise Playground",
        tagline: "AI that knows your design system.",
        accent: "#EAB308",
        icon: <Building2 size={20} />,
        tags: ["QLoRA", "Dual-Model", "ChromaDB", "Playwright"],
        heroImage: `${BASE}/images/enterprise-playground-hero.jpg`,
      },
      {
        num: "08",
        slug: "claude-pilot",
        name: "Claude Pilot",
        tagline: "What if your IDE thought?",
        accent: "#F97316",
        icon: <Compass size={20} />,
        tags: ["Claude", "MCP", "TypeScript", "Agents"],
        heroImage: `${BASE}/images/claude-pilot-hero.jpg`,
      },
      {
        num: "09",
        slug: "agenthire",
        name: "AgentHire",
        tagline: "Five agents. One pipeline. Zero API costs.",
        accent: "#EF4444",
        icon: <Users size={20} />,
        tags: ["LangGraph", "Ollama", "Next.js 15", "MCP"],
        heroImage: `${BASE}/images/agenthire-hero.jpg`,
      },
    ],
  },
  {
    number: "IV",
    title: "Expression",
    subtitle: "Creating and teaching — turning knowledge into art and curriculum.",
    projects: [
      {
        num: "10",
        slug: "animated-webgl-library",
        name: "Animated WebGL Library",
        tagline: "86+ visual experiments in light and math.",
        accent: "#6366F1",
        icon: <Sparkles size={20} />,
        tags: ["Three.js", "WebGL", "GLSL", "Audio"],
        heroImage: `${BASE}/images/animated-webgl-library-hero.jpg`,
      },
      {
        num: "11",
        slug: "mole-world-dashboard",
        name: "Mole World Dashboard",
        tagline: "216 Claude sessions made a film production studio.",
        accent: "#EC4899",
        icon: <Globe2 size={20} />,
        tags: ["Three.js", "Supabase", "Real-time"],
        heroImage: `${BASE}/images/mole-world-dashboard-hero.jpg`,
      },
      {
        num: "12",
        slug: "context-engineering-academy",
        name: "Context Engineering Academy",
        tagline: "6 academies. 70+ modules. Teaching what I learned.",
        accent: "#14B8A6",
        icon: <GraduationCap size={20} />,
        tags: ["MDX", "6 Academies", "Interactive"],
        heroImage: `${BASE}/images/context-engineering-academy-hero.jpg`,
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
    skills: ["Angular", "React", "Next.js", "TypeScript", "NgRx/Redux/RxJS", "Zustand", "TanStack Query", "Tailwind v4", "shadcn/ui", "Radix UI", "Framer Motion", "Three.js/WebGL", "Storybook"],
  },
  {
    label: "AI Engineering",
    skills: ["Ollama", "Multi-Provider Routing", "RAG Pipelines", "BM25 + Vector Search", "Semantic Caching", "QLoRA Fine-Tuning", "LLM-as-Judge Eval", "Multi-Agent Orchestration", "LangGraph", "MCP SDK"],
  },
  {
    label: "Backend & Data",
    skills: ["FastAPI", "Hono", "Node.js/Express", "Java/Spring", "PostgreSQL", "MongoDB", "Redis", "Qdrant", "ChromaDB", "Drizzle ORM", "Docker Compose"],
  },
  {
    label: "Testing & DevOps",
    skills: ["Cypress", "Playwright", "Vitest", "Jest", "Jasmine", "GitHub Actions", "Jenkins", "Prometheus", "Grafana"],
  },
];

/* ============================================
   PROJECT CARD — image OR elegant accent poster
   ============================================ */

function ProjectCard({ project, flagship = false }: { project: Project; flagship?: boolean }) {
  const accentVars = { ["--card-accent" as string]: project.accent };
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltFrame = useRef<number>(0);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const tilt = flagship ? 4 : 2.5;
    cancelAnimationFrame(tiltFrame.current);
    tiltFrame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.transform = `translateY(${flagship ? -8 : -6}px) perspective(1000px) rotateX(${(0.5 - py) * tilt}deg) rotateY(${(px - 0.5) * tilt}deg)`;
    });
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(tiltFrame.current);
    el.style.transform = "";
  };

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`group h-full ${flagship ? "flagship-card" : "project-card"}`}
        style={accentVars}
      >
        {/* Poster — real image if available, otherwise an accent gradient treatment */}
        <div className={`relative z-10 overflow-hidden ${flagship ? "h-52" : "h-40"}`}>
          {project.heroImage ? (
            <>
              <Image
                src={project.heroImage}
                alt={project.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
            </>
          ) : (
            <div className="poster-fallback absolute inset-0" style={accentVars}>
              <span className="poster-glyph" aria-hidden="true">{project.num}</span>
              <div
                className="absolute left-5 top-5 w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  color: project.accent,
                  background: "color-mix(in srgb, var(--card-accent) 12%, white)",
                  border: "1px solid color-mix(in srgb, var(--card-accent) 30%, transparent)",
                }}
              >
                {project.icon}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />
            </div>
          )}

          <div className="absolute top-3 left-3 flex items-center gap-2">
            {flagship && (
              <span className="flagship-ribbon">
                <Sparkles size={11} /> Flagship
              </span>
            )}
            {project.heroImage && (
              <span
                className="text-[11px] font-mono tracking-wider px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm"
                style={{ color: project.accent }}
              >
                {project.num}
              </span>
            )}
          </div>
        </div>

        <div className={`relative z-10 ${flagship ? "p-6 md:p-7" : "p-5"}`}>
          <div className="flex items-center gap-2 mb-2">
            <div style={{ color: project.accent }}>{project.icon}</div>
            <h3 className={`font-semibold ${flagship ? "text-lg" : "text-base"}`}>{project.name}</h3>
          </div>
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
              View details
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </span>

            {(project.github || project.live) && (
              <span className="flex items-center gap-2">
                {project.github && (
                  <span
                    role="link"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.github, "_blank", "noopener,noreferrer");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(project.github, "_blank", "noopener,noreferrer");
                      }
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.live, "_blank", "noopener,noreferrer");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(project.live, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="repo-pill"
                    style={{
                      color: project.accent,
                      borderColor: "color-mix(in srgb, var(--card-accent) 45%, var(--border))",
                    }}
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
    </Link>
  );
}

/* ============================================
   PAGE
   ============================================ */

export default function Home() {
  const scrollY = useHeroParallax();
  const reducedMotion = usePrefersReducedMotion();
  const [vh, setVh] = useState(900);
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const heroProgress = reducedMotion ? 0 : Math.min(scrollY / (vh * 0.7), 1);

  // Mount-driven entrance for the cinematic hero (next-frame to ensure transition).
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen">
      <a href="#projects" className="skip-link">Skip to projects</a>
      <Navbar />

      {/* ============================================
          HERO — cinematic Higgsfield film + oversized
          editorial type with masked line reveals
          ============================================ */}
      <section className={`hero-cinematic ${heroIn ? "hero-in" : ""}`}>
        {/* The film — Higgsfield prologue, full-bleed, slow parallax drift */}
        <video
          className="hero-film"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          poster={`${BASE}/videos/start-hero-prologue.png`}
          style={{
            transform: `scale(${1.08 + heroProgress * 0.06})`,
            willChange: heroProgress < 1 ? "transform" : "auto",
          }}
        >
          <source src={`${BASE}/videos/hero-prologue.mp4`} type="video/mp4" />
        </video>

        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-frame" aria-hidden="true" />

        {/* Content — drifts up + fades as you scroll past the first screen */}
        <div
          className="hero-content"
          style={{
            opacity: 1 - heroProgress,
            transform: `translateY(${heroProgress * -60}px)`,
            willChange: "transform, opacity",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
            {/* Eyebrow */}
            <div
              className="hero-rise inline-flex items-center gap-2.5 mb-8"
              style={{ ["--rise-delay" as string]: "100ms" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hero-eyebrow">Senior Frontend &amp; AI Engineer — Toronto</span>
            </div>

            {/* Oversized editorial display type, masked line-by-line */}
            <h1 className="display-line text-[clamp(3.4rem,11vw,9.5rem)] mb-7">
              <MaskLine delay={120}>Deepak Singh</MaskLine>
              <MaskLine delay={240} className="-mt-[0.04em]">
                <span className="sig-underline">Kandari</span>
              </MaskLine>
            </h1>

            {/* Sub-headline — a second editorial register */}
            <div className="text-[clamp(1.35rem,3.4vw,2.6rem)] font-light leading-[1.04] tracking-[-0.02em] text-[#f7f4ee] mb-9 max-w-3xl">
              <MaskLine delay={420}>
                I build <span className="display-italic">agentic AI products</span>
              </MaskLine>
              <MaskLine delay={520}>and the frontend craft around them.</MaskLine>
            </div>

            <p
              className="hero-rise hero-lede text-base md:text-lg max-w-xl mb-10 leading-relaxed"
              style={{ ["--rise-delay" as string]: "720ms" }}
            >
              From Angular-21 banking copilots to LangGraph advisory systems — shipped
              end to end across FINRA, Home Depot, CIBC, and TD Bank.
            </p>

            <div
              className="hero-rise flex items-center gap-5 text-sm hero-meta mb-9"
              style={{ ["--rise-delay" as string]: "820ms" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                Toronto, Canada
              </span>
              <span className="w-px h-3.5 bg-white/20" />
              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={14} />
                Open to opportunities
              </span>
            </div>

            <div
              className="hero-rise flex items-center gap-3 flex-wrap"
              style={{ ["--rise-delay" as string]: "900ms" }}
            >
              <Magnetic strength={0.3}>
                <a
                  href="#projects"
                  className="hero-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors"
                >
                  View the work
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="mailto:deepchand89k@gmail.com"
                  className="hero-btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors"
                >
                  <Mail size={15} aria-hidden="true" />
                  Get in touch
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="https://github.com/AptSalt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors"
                >
                  <Github size={15} aria-hidden="true" />
                  GitHub
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="hero-scroll-cue"
          style={{ opacity: 1 - heroProgress * 2 }}
        >
          <span className="cue-label">Scroll</span>
          <span className="cue-rail" />
        </div>
      </section>

      {/* ============================================
          FLAGSHIPS — headline pieces (Meridian + ALPHA)
          ============================================ */}
      <section id="projects" className="py-24 relative overflow-hidden">
        <VideoBackground src={`${BASE}/videos/hero-manifesto.mp4`} opacity={0.28} />

        <ParallaxLayer speed={0.4} clamp className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="orb w-[460px] h-[460px] top-[6%] left-[-6%] animate-breathe"
            style={{ background: "radial-gradient(circle, #4d9fff14, transparent 70%)" }}
          />
          <div
            className="orb w-[420px] h-[420px] bottom-[4%] right-[-5%] animate-breathe"
            style={{ background: "radial-gradient(circle, #34d39914, transparent 70%)", animationDelay: "2.5s" }}
          />
        </ParallaxLayer>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal>
            <RailReveal className="mb-14 pl-6">
              <div className="flex items-center gap-4 mb-5">
                <span className="chapter-kicker">Chapter 01</span>
                <span className="eyebrow">Flagship Work</span>
              </div>
              <ClipReveal as="h2" className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.02] mb-5">
                Agentic systems, built like products.
              </ClipReveal>
              <p className="text-muted max-w-2xl text-lg leading-relaxed">
                Two headline copilots for regulated finance — one in Angular 21, one in
                LangGraph — each with governed retrieval, human-in-the-loop control, and
                answers you can audit line by line.
              </p>
            </RailReveal>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {flagships.map((project, i) => (
              <Reveal key={project.slug} delay={i * 160} direction="card">
                <ParallaxLayer speed={i === 0 ? 0.18 : 0.34} clamp>
                  <ProjectCard project={project} flagship />
                </ParallaxLayer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          NARRATIVE CLUSTERS — the new repos, grouped
          with a sticky chapter header per cluster
          ============================================ */}
      <section className="py-12 relative overflow-hidden">
        <ParallaxLayer speed={0.3} clamp className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="orb w-[520px] h-[520px] top-[12%] right-[-8%] animate-breathe"
            style={{ background: "radial-gradient(circle, #a78bfa12, transparent 70%)", animationDelay: "1.5s" }}
          />
        </ParallaxLayer>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal>
            <RailReveal className="mb-16 pl-6">
              <div className="flex items-center gap-4 mb-5">
                <span className="chapter-kicker">Chapter 02</span>
                <span className="eyebrow">The Body of New Work</span>
              </div>
              <ClipReveal as="h2" className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.04] mb-4">
                Five clusters. One trajectory.
              </ClipReveal>
              <p className="text-muted max-w-2xl text-lg leading-relaxed">
                From agentic products to live revenue — each cluster is a deliberate step
                up the stack, not a pile of repos.
              </p>
            </RailReveal>
          </Reveal>

          {clusters.map((cluster, ci) => (
            <div key={cluster.id}>
              {ci > 0 && <div className="cluster-tie" />}
              <div className="cluster-grid">
                <Reveal direction="left">
                  <div className="cluster-aside">
                    <div className="cluster-numeral mb-4">{cluster.index}</div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="eyebrow">{cluster.title}</span>
                    </div>
                    <p className="text-muted leading-relaxed">{cluster.blurb}</p>
                    <div className="mt-5 h-px w-16 bg-border" />
                    <p className="mt-3 text-xs font-mono text-muted/70 tracking-wider">
                      {cluster.projects.length} project{cluster.projects.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </Reveal>

                <div className={`grid gap-5 ${cluster.projects.length === 1 ? "sm:grid-cols-1 max-w-md" : "sm:grid-cols-2"}`}>
                  {cluster.projects.map((project, i) => (
                    <Reveal key={`${cluster.id}-${project.slug}`} delay={i * 120} direction="card">
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          DISCURIA — Featured Live Product
          ============================================ */}
      <section className="py-16 relative overflow-hidden">
        <VideoBackground src={`${BASE}/videos/hero-discuria.mp4`} opacity={0.3} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal>
            <a
              href="https://discuria.space"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-8 md:p-12 category-oat hover:shadow-lg transition-shadow group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="eyebrow mb-3">Featured — Live Product</div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 group-hover:underline underline-offset-4 decoration-2">
                    Discuria
                  </h2>
                  <p className="text-muted max-w-xl leading-relaxed">
                    Daily critical thinking platform. 5 real-world scenarios with 60-second
                    evidence-based decisions. Built with Next.js, Supabase, and local LLM inference.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-foreground text-background">
                    Visit discuria.space
                    <ExternalLink size={14} />
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============================================
          EXPERIENCE TIMELINE
          ============================================ */}
      <section id="experience" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <ClipReveal as="h2" className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-2">
              Experience
            </ClipReveal>
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

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* ============================================
          STATS BAR — with video background
          ============================================ */}
      <section className="py-16 relative overflow-hidden">
        <VideoBackground src={`${BASE}/videos/hero-stats.mp4`} opacity={0.35} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { target: 26, suffix: "+", label: "Production Projects", color: "#4d9fff" },
              { text: "RTX 4090", label: "Single GPU", color: "#F59E0B" },
              { text: "$0", label: "Cloud Costs", color: "#34d399" },
              { target: 179, suffix: "+", label: "Tests Passing", color: "#3B82F6" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: stat.color }}>
                    {"target" in stat && stat.target !== undefined ? (
                      <CountUp target={stat.target} suffix={stat.suffix ?? ""} style={{ color: stat.color }} />
                    ) : (
                      stat.text
                    )}
                  </div>
                  <div className="text-xs text-muted font-mono tracking-wider">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* ============================================
          FOUR ACTS — Foundational body of work
          ============================================ */}
      <section className="pt-24 pb-4 relative">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <RailReveal className="pl-6">
              <div className="flex items-center gap-4 mb-5">
                <span className="chapter-kicker">Chapter 03</span>
                <span className="eyebrow">The Foundation — Four Acts</span>
              </div>
              <ClipReveal as="h2" className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.02] mb-4">
                From understanding to expression.
              </ClipReveal>
              <p className="text-muted max-w-2xl text-lg leading-relaxed">
                A portfolio that taught me the stack from the inside out — learning the
                fundamentals, building the infrastructure, giving AI agency, and turning it
                all into art and curriculum.
              </p>
            </RailReveal>
          </Reveal>
        </div>
      </section>

      {acts.map((act, actIndex) => (
        <div key={act.number} className="cv-auto">
          <section className="py-24 relative overflow-hidden">
            <VideoBackground src={`${BASE}/videos/hero-act-${actIndex + 1}.mp4`} opacity={0.35} />

            <ParallaxLayer speed={0.4} clamp className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="orb w-[400px] h-[400px] animate-breathe"
                style={{
                  background: `radial-gradient(circle, ${act.projects[0].accent}10, transparent 70%)`,
                  top: actIndex % 2 === 0 ? "10%" : "40%",
                  left: actIndex % 2 === 0 ? "-5%" : "auto",
                  right: actIndex % 2 === 0 ? "auto" : "-5%",
                }}
              />
            </ParallaxLayer>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
              {/* Act Header */}
              <Reveal>
                <div className="mb-16">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="eyebrow tracking-[0.3em]">Act {act.number}</span>
                    <div className="act-line flex-1" />
                  </div>
                  <ClipReveal as="h2" className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-3">
                    {act.title}
                  </ClipReveal>
                  <p className="text-muted max-w-xl">{act.subtitle}</p>
                </div>
              </Reveal>

              {/* Project Cards */}
              <div className="grid md:grid-cols-3 gap-5">
                {act.projects.map((project, i) => (
                  <Reveal key={project.slug} delay={i * 120} direction="card">
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Connection Text between acts */}
          {act.connection && (
            <div className="act-connection">
              <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                <p className="text-lg md:text-xl text-muted/50 italic font-light leading-relaxed">
                  {act.connection}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* ============================================
          SKILLS
          ============================================ */}
      <section id="skills" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <ClipReveal as="h2" className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-2">
              Technical Skills
            </ClipReveal>
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

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* ============================================
          CERTIFICATIONS
          ============================================ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <ClipReveal as="h2" className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-12">
              Certifications
            </ClipReveal>
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
                      <span key={topic} className="px-3 py-1 rounded-full text-xs font-mono bg-white/50 text-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* ============================================
          CONTACT — with video background
          ============================================ */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <VideoBackground src={`${BASE}/videos/hero-epilogue.mp4`} opacity={0.3} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <ClipReveal as="h2" className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4">
              Let&apos;s build something.
            </ClipReveal>
            <p className="text-muted mb-10 max-w-lg mx-auto leading-relaxed">
              Looking for a senior engineer who can lead frontend architecture and build
              agentic AI product features end to end? Let&apos;s talk.
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Magnetic strength={0.3}>
                <a
                  href="mailto:deepchand89k@gmail.com"
                  className="cta-solid inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-foreground text-background transition-transform"
                >
                  <Mail size={16} aria-hidden="true" />
                  deepchand89k@gmail.com
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="tel:+17789277935"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-border hover:border-foreground/30 transition-colors bg-background/60 backdrop-blur-sm"
                >
                  778-927-7935
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
              <a href="https://github.com/AptSalt" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity"><Github size={18} /></a>
              <a href="https://linkedin.com/in/deepaksinghkandari" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity"><Linkedin size={18} /></a>
              <a href="mailto:deepchand89k@gmail.com" className="opacity-50 hover:opacity-100 transition-opacity"><Mail size={18} /></a>
            </div>
            <div className="text-xs opacity-40">Built with Next.js &amp; Tailwind</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
