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
  Mail,
  MapPin,
  Briefcase,
  Award,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "./components/navbar";
import { Reveal } from "./components/reveal";
import { ParallaxLayer } from "./components/parallax";
import { VideoBackground } from "./components/video-background";
import type { ReactNode } from "react";

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
        icon: <Brain size={20} />,
        tags: ["PyTorch", "RLHF", "DPO", "PPO"],
        heroImage: "/images/ml-portfolio-hero.jpg",
      },
      {
        num: "02",
        slug: "nosce",
        name: "Nosce",
        tagline: "Know thyself. An AI that builds a knowledge graph of you.",
        accent: "#06B6D4",
        icon: <Search size={20} />,
        tags: ["Knowledge Graph", "NLP", "Analytics"],
        heroImage: "/images/nosce-hero.jpg",
      },
      {
        num: "03",
        slug: "tech-deep-dive",
        name: "Tech Deep Dive",
        tagline: "54 deep-dives. Because understanding compounds.",
        accent: "#F59E0B",
        icon: <BookOpen size={20} />,
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
        icon: <BarChart3 size={20} />,
        tags: ["RAG", "Qdrant", "FastAPI", "MCP"],
        heroImage: "/images/rag-eval-engine-hero.jpg",
      },
      {
        num: "05",
        slug: "llm-gateway",
        name: "LLM Gateway",
        tagline: "One API. Five providers. Zero lock-in.",
        accent: "#3B82F6",
        icon: <Route size={20} />,
        tags: ["Hono", "Redis", "PostgreSQL", "5 Providers"],
        heroImage: "/images/llm-gateway-hero.jpg",
      },
      {
        num: "06",
        slug: "claude-dashboard",
        name: "Claude Dashboard",
        tagline: "See everything. Miss nothing.",
        accent: "#84CC16",
        icon: <Activity size={20} />,
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
        icon: <Building2 size={20} />,
        tags: ["QLoRA", "Dual-Model", "ChromaDB", "Playwright"],
        heroImage: "/images/enterprise-playground-hero.jpg",
      },
      {
        num: "08",
        slug: "claude-pilot",
        name: "Claude Pilot",
        tagline: "What if your IDE thought?",
        accent: "#F97316",
        icon: <Compass size={20} />,
        tags: ["Claude", "MCP", "TypeScript", "Agents"],
        heroImage: "/images/claude-pilot-hero.jpg",
      },
      {
        num: "09",
        slug: "agenthire",
        name: "AgentHire",
        tagline: "Five agents. One pipeline. Zero API costs.",
        accent: "#EF4444",
        icon: <Users size={20} />,
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
        icon: <Sparkles size={20} />,
        tags: ["Three.js", "WebGL", "GLSL", "Audio"],
        heroImage: "/images/animated-webgl-library-hero.jpg",
      },
      {
        num: "11",
        slug: "mole-world-dashboard",
        name: "Mole World Dashboard",
        tagline: "216 Claude sessions made a film production studio.",
        accent: "#EC4899",
        icon: <Globe2 size={20} />,
        tags: ["Three.js", "Supabase", "Real-time"],
        heroImage: "/images/mole-world-dashboard-hero.jpg",
      },
      {
        num: "12",
        slug: "context-engineering-academy",
        name: "Context Engineering Academy",
        tagline: "6 academies. 70+ modules. Teaching what I learned.",
        accent: "#14B8A6",
        icon: <GraduationCap size={20} />,
        tags: ["MDX", "6 Academies", "Interactive"],
        heroImage: "/images/context-engineering-academy-hero.jpg",
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
   PAGE
   ============================================ */

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ============================================
          HERO — with video background
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <VideoBackground
          src="/videos/hero-prologue.mp4"
          poster="/images/ml-portfolio-hero.jpg"
          opacity={0.12}
        />
        <div className="absolute inset-0 grid-bg" />

        <ParallaxLayer speed={0.3} className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb orb-amber w-[500px] h-[500px] top-[10%] left-[15%] animate-breathe" />
          <div className="orb orb-violet w-[400px] h-[400px] top-[30%] right-[10%] animate-breathe" style={{ animationDelay: "3s" }} />
        </ParallaxLayer>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1]">
              Deepak Singh Kandari
            </h1>

            <p className="text-xl md:text-2xl text-muted mb-3">
              Senior Frontend & AI Engineer
            </p>

            <p className="text-base text-muted/70 max-w-xl mx-auto mb-6 leading-relaxed">
              13+ years building enterprise applications and AI-first interfaces
              across FINRA, Home Depot, CIBC, and TD Bank.
            </p>

            <div className="flex items-center justify-center gap-3 text-sm text-muted mb-8">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                Toronto, Canada
              </span>
              <span className="text-border">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={14} />
                Open to opportunities
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="mailto:deepchand89k@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                <Mail size={15} />
                Get in touch
              </a>
              <a
                href="https://linkedin.com/in/deepaksinghkandari"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border hover:border-foreground/30 transition-colors bg-background/60 backdrop-blur-sm"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
              <a
                href="https://github.com/AptSalt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border hover:border-foreground/30 transition-colors bg-background/60 backdrop-blur-sm"
              >
                <Github size={15} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-muted/40 animate-scroll-hint" />
          </div>
        </div>
      </section>

      {/* ============================================
          DISCURIA — Featured Project
          ============================================ */}
      <section className="py-16 relative overflow-hidden">
        <VideoBackground
          src="/videos/hero-discuria.mp4"
          opacity={0.08}
        />
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
                  <div className="text-xs font-mono tracking-widest uppercase text-muted mb-3">
                    Featured — Live Product
                  </div>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Experience</h2>
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
        <VideoBackground
          src="/videos/hero-stats.mp4"
          opacity={0.1}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "12", label: "Production Projects", color: "#8B5CF6" },
              { value: "RTX 4090", label: "Single GPU", color: "#F59E0B" },
              { value: "$0", label: "Cloud Costs", color: "#10B981" },
              { value: "179+", label: "Tests Passing", color: "#3B82F6" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
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
          FOUR ACTS — Narrative with video backgrounds
          ============================================ */}
      {acts.map((act, actIndex) => (
        <div key={act.number}>
          <section
            id={actIndex === 0 ? "projects" : undefined}
            className="py-24 relative overflow-hidden"
          >
            <VideoBackground
              src={`/videos/hero-act-${actIndex + 1}.mp4`}
              opacity={0.1}
            />

            <ParallaxLayer speed={0.15} className="absolute inset-0 pointer-events-none overflow-hidden">
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
                    <span className="text-xs font-mono tracking-[0.3em] text-muted/50 uppercase">
                      Act {act.number}
                    </span>
                    <div className="act-line flex-1" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-3">{act.title}</h2>
                  <p className="text-muted max-w-xl">{act.subtitle}</p>
                </div>
              </Reveal>

              {/* Project Cards */}
              <div className="grid md:grid-cols-3 gap-5">
                {act.projects.map((project, i) => (
                  <Reveal key={project.slug} delay={i * 120}>
                    <Link href={`/projects/${project.slug}`}>
                      <div className="group project-card h-full">
                        {project.heroImage && (
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={project.heroImage}
                              alt={project.name}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                            <div className="absolute top-3 left-3">
                              <span
                                className="text-[11px] font-mono tracking-wider px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm"
                                style={{ color: project.accent }}
                              >
                                {project.num}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <div style={{ color: project.accent }}>{project.icon}</div>
                            <h3 className="text-base font-semibold">{project.name}</h3>
                          </div>
                          <p className="text-sm text-muted leading-relaxed mb-4">
                            {project.tagline}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full text-[11px] font-mono border border-border text-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-medium text-muted group-hover:text-foreground transition-colors">
                            View details
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>
                      </div>
                    </Link>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Technical Skills</h2>
            <p className="text-muted mb-12">Across the full stack — from pixel-perfect UIs to GPU inference.</p>
          </Reveal>

          <div className="space-y-10">
            {skillCategories.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 100}>
                <div>
                  <h3 className="text-xs font-mono tracking-widest uppercase text-muted mb-4">{cat.label}</h3>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Certifications</h2>
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
        <VideoBackground
          src="/videos/hero-epilogue.mp4"
          opacity={0.08}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-muted mb-10 max-w-lg mx-auto leading-relaxed">
              Looking for a senior engineer who can lead frontend architecture and build
              AI-powered product features end to end? Let&apos;s talk.
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="mailto:deepchand89k@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                <Mail size={16} />
                deepchand89k@gmail.com
              </a>
              <a
                href="tel:+17789277935"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-border hover:border-foreground/30 transition-colors bg-background/60 backdrop-blur-sm"
              >
                778-927-7935
              </a>
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
            <div className="text-xs opacity-40">Built with Next.js & Tailwind</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
