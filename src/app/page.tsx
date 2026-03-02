"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
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
  Twitter,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "./components/navbar";
import { Reveal } from "./components/reveal";
import { ParallaxLayer, FloatingObject, ScrollScale } from "./components/parallax";
import { VideoBackground } from "./components/video-background";
import type { ReactNode } from "react";

type Project = {
  num: string;
  slug: string;
  name: string;
  tagline: string;
  accent: string;
  icon: ReactNode;
  tags: string[];
  heroImage?: string;
};

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
        icon: <Brain size={22} />,
        tags: ["PyTorch", "RLHF", "DPO", "PPO"],
        heroImage: "/images/ml-portfolio-hero.jpg",
      },
      {
        num: "02",
        slug: "nosce",
        name: "Nosce",
        tagline: "Know thyself. An AI that builds a knowledge graph of you.",
        accent: "#06B6D4",
        icon: <Search size={22} />,
        tags: ["Knowledge Graph", "NLP", "Analytics"],
        heroImage: "/images/nosce-hero.jpg",
      },
      {
        num: "03",
        slug: "tech-deep-dive",
        name: "Tech Deep Dive",
        tagline: "54 deep-dives. Because understanding compounds.",
        accent: "#F59E0B",
        icon: <BookOpen size={22} />,
        tags: ["MDX", "54 Articles", "Interactive"],
        heroImage: "/images/tech-deep-dive-hero.jpg",
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
        icon: <BarChart3 size={22} />,
        tags: ["RAG", "Qdrant", "FastAPI", "MCP"],
        heroImage: "/images/rag-eval-engine-hero.jpg",
      },
      {
        num: "05",
        slug: "llm-gateway",
        name: "LLM Gateway",
        tagline: "One API. Five providers. Zero lock-in.",
        accent: "#3B82F6",
        icon: <Route size={22} />,
        tags: ["Hono", "Redis", "PostgreSQL", "5 Providers"],
        heroImage: "/images/llm-gateway-hero.jpg",
      },
      {
        num: "06",
        slug: "claude-dashboard",
        name: "Claude Dashboard",
        tagline: "See everything. Miss nothing.",
        accent: "#84CC16",
        icon: <Activity size={22} />,
        tags: ["WebSocket", "Canvas 3D", "Real-time"],
        heroImage: "/images/claude-dashboard-hero.jpg",
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
        icon: <Building2 size={22} />,
        tags: ["QLoRA", "Dual-Model", "ChromaDB", "Playwright"],
        heroImage: "/images/enterprise-playground-hero.jpg",
      },
      {
        num: "08",
        slug: "claude-pilot",
        name: "Claude Pilot",
        tagline: "What if your IDE thought?",
        accent: "#F97316",
        icon: <Compass size={22} />,
        tags: ["Claude", "MCP", "TypeScript", "Agents"],
        heroImage: "/images/claude-pilot-hero.jpg",
      },
      {
        num: "09",
        slug: "agenthire",
        name: "AgentHire",
        tagline: "Five agents. One pipeline. Zero API costs.",
        accent: "#EF4444",
        icon: <Users size={22} />,
        tags: ["LangGraph", "Ollama", "Next.js 15", "MCP"],
        heroImage: "/images/agenthire-hero.jpg",
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
        icon: <Sparkles size={22} />,
        tags: ["Three.js", "WebGL", "GLSL", "Audio"],
        heroImage: "/images/animated-webgl-library-hero.jpg",
      },
      {
        num: "11",
        slug: "mole-world-dashboard",
        name: "Mole World Dashboard",
        tagline: "216 Claude sessions made a film production studio.",
        accent: "#EC4899",
        icon: <Globe2 size={22} />,
        tags: ["Three.js", "Supabase", "Real-time"],
        heroImage: "/images/mole-world-dashboard-hero.jpg",
      },
      {
        num: "12",
        slug: "context-engineering-academy",
        name: "Context Engineering Academy",
        tagline: "6 academies. 70+ modules. Teaching what I learned.",
        accent: "#14B8A6",
        icon: <GraduationCap size={22} />,
        tags: ["MDX", "6 Academies", "Interactive"],
        heroImage: "/images/context-engineering-academy-hero.jpg",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ============================================
          PROLOGUE — Hero with parallax + floating objects
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <VideoBackground
          src="/videos/hero-prologue.mp4"
          poster="/images/ml-portfolio-hero.jpg"
          opacity={0.3}
        />
        <div className="absolute inset-0 grid-bg" />

        {/* Parallax atmospheric orbs */}
        <ParallaxLayer speed={0.3} className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb orb-amber w-[600px] h-[600px] top-[10%] left-[15%] animate-breathe" />
          <div className="orb orb-violet w-[500px] h-[500px] top-[25%] right-[10%] animate-breathe" style={{ animationDelay: "3s" }} />
          <div className="orb orb-emerald w-[400px] h-[400px] bottom-[15%] left-[35%] animate-breathe" style={{ animationDelay: "6s" }} />
        </ParallaxLayer>

        {/* Floating geometric objects */}
        <FloatingObject className="absolute top-[18%] left-[8%] geo-shape geo-ring w-24 h-24" amplitude={25} duration={8} />
        <FloatingObject className="absolute top-[65%] right-[12%] geo-shape geo-ring w-16 h-16" amplitude={15} duration={7} delay={2} />
        <FloatingObject className="absolute top-[35%] right-[25%] geo-shape geo-diamond w-12 h-12" amplitude={20} duration={9} delay={1} />
        <FloatingObject className="absolute bottom-[25%] left-[20%] geo-shape geo-diamond w-8 h-8" amplitude={12} duration={6} delay={3} />
        <FloatingObject className="absolute top-[50%] left-[5%] geo-shape geo-cross w-6 h-6" amplitude={18} duration={10} delay={4} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-up">
            {/* Greek inscription */}
            <div className="font-mono text-sm text-muted/50 mb-3 tracking-[0.3em]">
              γνῶθι σεαυτόν
            </div>
            <div className="text-xs text-muted/30 tracking-widest uppercase mb-12">
              Know Thyself
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold tracking-tight mb-8 whitespace-nowrap">
              Deepak Singh Kandari
            </h1>

            <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-4 leading-relaxed">
              I build production AI systems on a single GPU.
            </p>

            <p className="text-base text-muted/40 max-w-lg mx-auto mb-14">
              12 projects. One RTX 4090. Zero cloud costs.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="#act-1"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/10"
                style={{ backgroundColor: "#e8e4dc", color: "#0a0a08" }}
              >
                Begin the story
                <ArrowRight size={16} />
              </a>
              <a
                href="https://github.com/aptsalt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-sm border border-border hover:border-muted/50 transition-all hover:bg-surface"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/deepaksinghkandari"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-sm border border-border hover:border-muted/50 transition-all hover:bg-surface"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 rounded-full border-2 border-muted/25 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-muted/40 animate-scroll-hint" />
          </div>
        </div>
      </section>

      {/* ============================================
          DISCURIA — Featured Banner (Top Position)
          ============================================ */}
      <section className="py-20 relative overflow-hidden border-b border-border">
        <VideoBackground
          src="/videos/hero-discuria.mp4"
          opacity={0.2}
        />
        <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-rose w-[600px] h-[600px] top-[-20%] left-[40%] animate-breathe" style={{ opacity: 0.6 }} />
          <div className="orb orb-violet w-[400px] h-[400px] bottom-[-10%] right-[10%] animate-breathe" style={{ animationDelay: "4s", opacity: 0.4 }} />
        </ParallaxLayer>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase mb-8 border" style={{ color: "#EC4899", backgroundColor: "rgba(236, 72, 153, 0.08)", borderColor: "rgba(236, 72, 153, 0.2)" }}>
                Featured Project
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">DISCURIA</h2>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">
                A platform for structured discourse and collaborative reasoning.
                Where ideas are tested through rigorous dialogue, not echo chambers.
              </p>
              <a
                href="https://discuria.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-sm transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: "#EC4899", color: "#fff" }}
              >
                <ExternalLink size={16} />
                Visit discuria.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================
          MANIFESTO — Three Pillars with parallax
          ============================================ */}
      <section className="py-28 relative overflow-hidden">
        <VideoBackground
          src="/videos/hero-manifesto.mp4"
          opacity={0.18}
        />
        <div className="absolute inset-0 noise" />
        <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none">
          <FloatingObject className="absolute top-[10%] right-[5%] geo-shape geo-ring w-32 h-32" amplitude={15} duration={12} />
          <FloatingObject className="absolute bottom-[20%] left-[8%] geo-shape geo-diamond w-10 h-10" amplitude={10} duration={8} delay={2} />
        </ParallaxLayer>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-xs font-mono tracking-[0.3em] text-muted/50 uppercase mb-4">
                The Manifesto
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "LOCAL-FIRST",
                line1: "RTX 4090. One GPU.",
                line2: "$0 cloud costs.",
                icon: "🖥",
                direction: "left" as const,
                glow: "rgba(245, 158, 11, 0.08)",
              },
              {
                title: "SHIP TO PRODUCTION",
                line1: "Real systems. Real users.",
                line2: "Not toy demos.",
                icon: "🚀",
                direction: "up" as const,
                glow: "rgba(139, 92, 246, 0.08)",
              },
              {
                title: "MEASURE EVERYTHING",
                line1: "179+ tests. Real eval.",
                line2: "No hope systems.",
                icon: "📊",
                direction: "right" as const,
                glow: "rgba(16, 185, 129, 0.08)",
              },
            ].map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 200} direction={pillar.direction}>
                <div
                  className="project-card p-10 text-center"
                  style={{
                    ["--card-glow" as string]: pillar.glow,
                    ["--card-glow2" as string]: pillar.glow,
                  }}
                >
                  <div className="text-3xl mb-5">{pillar.icon}</div>
                  <h3 className="text-sm font-mono tracking-widest text-foreground/90 mb-5">
                    {pillar.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {pillar.line1}
                    <br />
                    {pillar.line2}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          STATS BAR — Animated with glow
          ============================================ */}
      <section className="py-20 border-y border-border relative">
        <VideoBackground
          src="/videos/hero-stats.mp4"
          opacity={0.18}
        />
        <ParallaxLayer speed={0.15} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-amber w-[300px] h-[300px] -top-[50px] left-[20%] animate-breathe" style={{ opacity: 0.5 }} />
          <div className="orb orb-violet w-[250px] h-[250px] -bottom-[30px] right-[25%] animate-breathe" style={{ opacity: 0.4, animationDelay: "3s" }} />
        </ParallaxLayer>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "12", label: "Production Projects", color: "#8B5CF6" },
              { value: "RTX 4090", label: "Single GPU", color: "#F59E0B" },
              { value: "$0", label: "Cloud Costs", color: "#10B981" },
              { value: "179+", label: "Tests Passing", color: "#3B82F6" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 120}>
                <div>
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2 stat-glow"
                    style={{ ["--stat-color" as string]: `${stat.color}40` }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted/70 font-mono tracking-wider">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FOUR ACTS — The Story with rich cards + parallax
          ============================================ */}
      {acts.map((act, actIndex) => (
        <div key={act.number}>
          <section
            id={`act-${actIndex + 1}`}
            className="py-32 relative overflow-hidden"
          >
            <VideoBackground
              src={`/videos/hero-act-${actIndex + 1}.mp4`}
              opacity={0.2}
            />
            {/* Background parallax layer per act */}
            <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="orb w-[500px] h-[500px] animate-breathe"
                style={{
                  background: `radial-gradient(circle, ${act.projects[0].accent}15, transparent 70%)`,
                  top: actIndex % 2 === 0 ? "10%" : "40%",
                  left: actIndex % 2 === 0 ? "-10%" : "auto",
                  right: actIndex % 2 === 0 ? "auto" : "-10%",
                }}
              />
              <FloatingObject
                className={`absolute geo-shape geo-ring w-20 h-20 ${actIndex % 2 === 0 ? "right-[8%] top-[20%]" : "left-[8%] top-[30%]"}`}
                amplitude={12}
                duration={9}
                delay={actIndex}
              />
            </ParallaxLayer>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
              {/* Act Header */}
              <Reveal>
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-mono tracking-[0.3em] text-muted/40 uppercase">
                      Act {act.number}
                    </span>
                    <div className="act-line flex-1" style={{ "--accent": act.projects[0].accent } as React.CSSProperties} />
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-4">{act.title}</h2>
                  <p className="text-lg text-muted max-w-xl">{act.subtitle}</p>
                </div>
              </Reveal>

              {/* Rich Project Cards */}
              <div className="grid md:grid-cols-3 gap-8">
                {act.projects.map((project, i) => (
                  <Reveal
                    key={project.slug}
                    delay={i * 150}
                    direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <div
                        className="group project-card h-full"
                        style={{
                          ["--card-glow" as string]: `${project.accent}10`,
                          ["--card-glow2" as string]: `${project.accent}08`,
                          ["--card-accent" as string]: `${project.accent}60`,
                          ["--mesh-x" as string]: `${30 + i * 25}%`,
                          ["--mesh-y" as string]: `${20 + i * 20}%`,
                        }}
                      >
                        {/* Hero image thumbnail */}
                        {project.heroImage && (
                          <div className="relative h-36 overflow-hidden">
                            <Image
                              src={project.heroImage}
                              alt={project.name}
                              fill
                              className="object-cover object-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
                            {/* Number badge overlay */}
                            <div className="absolute top-4 left-4">
                              <span
                                className="chapter-badge text-xs font-mono tracking-wider px-2.5 py-1 rounded-md backdrop-blur-md"
                                style={{
                                  color: project.accent,
                                  backgroundColor: `${project.accent}20`,
                                  border: `1px solid ${project.accent}30`,
                                }}
                              >
                                {project.num}
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="absolute top-4 right-4">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-md"
                                style={{ backgroundColor: `${project.accent}18`, border: `1px solid ${project.accent}25` }}
                              >
                                <div style={{ color: project.accent }}>{project.icon}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="p-6">
                          {/* Name + tagline */}
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-sm text-muted leading-relaxed mb-5">
                            {project.tagline}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono"
                                style={{
                                  color: `${project.accent}cc`,
                                  backgroundColor: `${project.accent}0a`,
                                  border: `1px solid ${project.accent}18`,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Arrow */}
                          <div className="flex items-center gap-2 text-xs text-muted group-hover:text-foreground transition-colors">
                            <span className="font-mono">Explore</span>
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1.5 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Connection Text between acts — with scroll scale effect */}
          {act.connection && (
            <div className="act-connection">
              <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <ScrollScale startScale={0.9} endScale={1}>
                  <p className="text-xl md:text-2xl text-muted/50 italic font-light leading-relaxed">
                    {act.connection}
                  </p>
                </ScrollScale>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ============================================
          PHILOSOPHY — About Section with parallax
          ============================================ */}
      <section id="about" className="py-32 border-t border-border relative overflow-hidden">
        <VideoBackground
          src="/videos/hero-epilogue.mp4"
          opacity={0.18}
        />
        <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-amber w-[400px] h-[400px] -top-[100px] right-[10%] animate-breathe" style={{ opacity: 0.5 }} />
          <FloatingObject className="absolute bottom-[20%] left-[5%] geo-shape geo-ring w-28 h-28" amplitude={10} duration={11} />
          <FloatingObject className="absolute top-[30%] right-[8%] geo-shape geo-diamond w-14 h-14" amplitude={15} duration={8} delay={3} />
        </ParallaxLayer>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-xs font-mono tracking-[0.3em] text-muted/50 uppercase mb-4">
                Epilogue
              </h2>
              <p className="text-4xl md:text-5xl font-bold">
                Built with obsession. Shared with intention.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16">
            <Reveal direction="left" delay={200}>
              <div>
                <h3 className="text-xl font-semibold mb-6">What I Bring</h3>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>
                    I don&apos;t just call APIs — I build the infrastructure behind them.
                    Multi-agent orchestration, RAG pipelines with real evaluation,
                    fine-tuned models deployed on local hardware. End to end.
                  </p>
                  <p>
                    Every project here solves a real problem with production-grade
                    architecture: comprehensive test suites, typed contracts,
                    observability, and honest metrics. No toy demos.
                  </p>
                  <p>
                    I work fast, think in systems, and ship code that other
                    engineers can read, extend, and trust.
                  </p>
                </div>

                <div
                  className="mt-8 p-6 rounded-xl project-card"
                  style={{
                    ["--card-glow" as string]: "rgba(245, 158, 11, 0.06)",
                    ["--card-glow2" as string]: "rgba(139, 92, 246, 0.04)",
                  }}
                >
                  <p className="text-sm text-muted/70 italic leading-relaxed">
                    &ldquo;Every project started with a problem I couldn&apos;t solve
                    by reading docs. So I built the solution — then made it production-ready.&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={300}>
              <div>
                <h3 className="text-xl font-semibold mb-6">Stack</h3>
                <div className="space-y-3">
                  {[
                    { label: "Languages", value: "TypeScript (strict), Python" },
                    { label: "Frontend", value: "Next.js 15, React 19, Tailwind" },
                    { label: "ML/AI", value: "PyTorch, HuggingFace, QLoRA" },
                    { label: "Inference", value: "Ollama (qwen2.5-coder:14b)" },
                    { label: "Data", value: "PostgreSQL, Qdrant, ChromaDB" },
                    { label: "Testing", value: "Vitest, Playwright, pytest" },
                    { label: "Hardware", value: "RTX 4090 16GB VRAM" },
                    { label: "AI Tools", value: "Claude Code, MCP, LangGraph" },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4 items-baseline">
                      <span className="text-xs font-mono text-muted/50 w-20 shrink-0 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-sm text-foreground/70">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-10 pt-8 border-t border-border">
                  <h4 className="text-xs font-mono tracking-widest text-muted/50 uppercase mb-4">Connect</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { href: "https://github.com/aptsalt", icon: <Github size={16} />, label: "GitHub" },
                      { href: "https://linkedin.com/in/deepaksinghkandari", icon: <Linkedin size={16} />, label: "LinkedIn" },
                      { href: "https://x.com/aptsalt", icon: <Twitter size={16} />, label: "X" },
                      { href: "mailto:deep@aptsalt.com", icon: <Mail size={16} />, label: "Email" },
                      { href: "https://discuria.com", icon: <ExternalLink size={16} />, label: "DISCURIA" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("mailto") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-muted hover:text-foreground border border-border hover:border-muted/50 transition-all hover:bg-surface"
                      >
                        {link.icon}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER — Warm atmospheric with social links
          ============================================ */}
      <footer className="relative py-16 border-t border-border overflow-hidden">
        <VideoBackground
          src="/videos/hero-footer.mp4"
          opacity={0.15}
        />
        <ParallaxLayer speed={0.1} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-violet w-[300px] h-[300px] bottom-0 left-1/3 animate-breathe" style={{ opacity: 0.3 }} />
        </ParallaxLayer>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="font-mono text-sm text-foreground/80">@aptsalt</span>
              <p className="text-xs text-muted/40 mt-1">Built with obsession</p>
            </div>

            <div className="flex items-center gap-5">
              <a href="https://github.com/aptsalt" target="_blank" rel="noopener noreferrer" className="text-muted/60 hover:text-foreground transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/deepaksinghkandari" target="_blank" rel="noopener noreferrer" className="text-muted/60 hover:text-foreground transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://x.com/aptsalt" target="_blank" rel="noopener noreferrer" className="text-muted/60 hover:text-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="mailto:deep@aptsalt.com" className="text-muted/60 hover:text-foreground transition-colors">
                <Mail size={18} />
              </a>
              <span className="text-border">|</span>
              <a href="https://discuria.com" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted/60 hover:text-foreground transition-colors">
                DISCURIA
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a href="#act-1" className="text-sm text-muted/50 hover:text-foreground transition-colors">Projects</a>
              <a href="#about" className="text-sm text-muted/50 hover:text-foreground transition-colors">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
