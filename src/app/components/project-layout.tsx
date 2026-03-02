"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, ArrowRight } from "lucide-react";
import { Navbar } from "./navbar";
import { Reveal } from "./reveal";
import { VideoBackground } from "./video-background";
import type { ReactNode } from "react";

export type ProjectFeature = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectData = {
  slug: string;
  name: string;
  tagline: string;
  accentClass: string;
  accentColor: string;
  heroImage?: string;
  screenshots?: string[];
  narrative: {
    hook: string;
    problem: string;
    approach: string;
    insight: string;
  };
  features: ProjectFeature[];
  metrics: ProjectMetric[];
  techStack: string[];
  architecture?: string;
  githubUrl: string;
  liveUrl?: string;
};

export function ProjectLayout({ project }: { project: ProjectData }) {
  return (
    <div className={`min-h-screen ${project.accentClass}`}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <VideoBackground
          src={`/videos/project-${project.slug}.mp4`}
          poster={project.heroImage}
          opacity={0.25}
        />
        <div className="absolute inset-0 opacity-15">
          <div
            className="orb w-[500px] h-[500px] top-1/4 left-1/3 animate-breathe"
            style={{ background: `radial-gradient(circle, ${project.accentColor}40, transparent 70%)` }}
          />
          <div
            className="orb w-[400px] h-[400px] bottom-1/4 right-1/4 animate-breathe"
            style={{ background: `radial-gradient(circle, ${project.accentColor}25, transparent 70%)`, animationDelay: "4s" }}
          />
        </div>
        <div className="absolute inset-0 grid-bg" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            All Projects
          </Link>

          <div className="animate-fade-up">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider mb-8 border"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}30`,
                backgroundColor: `${project.accentColor}10`,
              }}
            >
              {project.slug.toUpperCase().replace(/-/g, " ")}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {project.name}
            </h1>

            <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              {project.tagline}
            </p>

            <div className="flex items-center justify-center gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:scale-105"
                style={{
                  backgroundColor: project.accentColor,
                  color: "#0a0a08",
                }}
              >
                <Github size={16} />
                View Source
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border border-border hover:border-muted transition-all"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {project.heroImage && (
          <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden opacity-30">
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 rounded-full border-2 border-muted/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-muted/60 animate-scroll-hint" />
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p
              className="text-3xl md:text-4xl font-light leading-relaxed mb-16"
              style={{ color: project.accentColor }}
            >
              &ldquo;{project.narrative.hook}&rdquo;
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16">
            <Reveal delay={200} direction="left">
              <div>
                <h3 className="text-xs font-mono tracking-widest text-muted mb-4 uppercase">
                  The Problem
                </h3>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {project.narrative.problem}
                </p>
              </div>
            </Reveal>
            <Reveal delay={300} direction="right">
              <div>
                <h3 className="text-xs font-mono tracking-widest text-muted mb-4 uppercase">
                  The Approach
                </h3>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {project.narrative.approach}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <div className="mt-16 p-8 rounded-2xl glass-warm">
              <h3 className="text-xs font-mono tracking-widest text-muted mb-4 uppercase">
                The Key Insight
              </h3>
              <p className="text-xl leading-relaxed text-foreground/90">
                {project.narrative.insight}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Screenshots Gallery */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <h2 className="text-2xl font-bold mb-8">Screenshots</h2>
            </Reveal>
            <div className="flex gap-6 overflow-x-auto snap-scroll pb-4">
              {project.screenshots.map((src, i) => (
                <Reveal key={src} delay={i * 100} direction="scale">
                  <div className="browser-chrome shrink-0 w-[600px] md:w-[800px] card-hover">
                    <div className="browser-chrome-bar">
                      <div className="browser-chrome-dot" />
                      <div className="browser-chrome-dot" />
                      <div className="browser-chrome-dot" />
                      <span className="ml-4 text-xs text-muted font-mono truncate">
                        {project.name}
                      </span>
                    </div>
                    <div className="relative aspect-video">
                      <Image
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        fill
                        className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Metrics */}
      <section className="py-24 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.metrics.map((metric, i) => (
              <Reveal key={metric.label} delay={i * 100}>
                <div className="text-center">
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: project.accentColor }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted font-mono">
                    {metric.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-muted text-lg mb-16 max-w-2xl">
              The architecture behind the system.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="group p-6 rounded-2xl glass hover:bg-card-hover transition-all duration-300 h-full card-hover">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${project.accentColor}15` }}
                  >
                    <div style={{ color: project.accentColor }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-2xl font-bold mb-8">Built with</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, i) => (
                <Reveal key={tech} delay={i * 50} direction="scale">
                  <span className="px-4 py-2 rounded-full text-sm font-mono glass hover:bg-card-hover transition-colors">
                    {tech}
                  </span>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${project.accentColor}40, transparent 70%)`,
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal direction="scale">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See the code
            </h2>
            <p className="text-lg text-muted mb-10">
              Full source code available. See exactly how it&apos;s built.
            </p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: project.accentColor,
                color: "#0a0a08",
              }}
            >
              <Github size={18} />
              View on GitHub
              <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-muted">
          <span className="font-mono">@aptsalt</span>
          <span>Built with obsession</span>
        </div>
      </footer>
    </div>
  );
}
