"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, ArrowRight } from "lucide-react";
import { Navbar } from "./navbar";
import { Reveal } from "./reveal";
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
  architectureDiagram?: string;
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
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            All Projects
          </Link>

          <div className="animate-fade-up">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider mb-6 border"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}30`,
                backgroundColor: `${project.accentColor}10`,
              }}
            >
              {project.slug.toUpperCase().replace(/-/g, " ")}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
              {project.name}
            </h1>

            <p className="text-xl text-muted max-w-2xl mb-8 leading-relaxed">
              {project.tagline}
            </p>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                <Github size={15} />
                View Source
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border hover:border-foreground/30 transition-colors"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      {project.architectureDiagram && (
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <h2 className="text-xl font-bold mb-6">Architecture</h2>
              <div className="rounded-xl overflow-hidden border border-border bg-white">
                <Image
                  src={project.architectureDiagram}
                  alt={`${project.name} architecture diagram`}
                  width={1920}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Narrative */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p
              className="text-2xl md:text-3xl font-light leading-relaxed mb-14"
              style={{ color: project.accentColor }}
            >
              &ldquo;{project.narrative.hook}&rdquo;
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12">
            <Reveal delay={200} direction="left">
              <div>
                <h3 className="text-xs font-mono tracking-widest text-muted mb-3 uppercase">
                  The Problem
                </h3>
                <p className="text-base text-muted leading-relaxed">
                  {project.narrative.problem}
                </p>
              </div>
            </Reveal>
            <Reveal delay={300} direction="right">
              <div>
                <h3 className="text-xs font-mono tracking-widest text-muted mb-3 uppercase">
                  The Approach
                </h3>
                <p className="text-base text-muted leading-relaxed">
                  {project.narrative.approach}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <div className="mt-12 p-6 rounded-xl bg-card border border-border">
              <h3 className="text-xs font-mono tracking-widest text-muted mb-3 uppercase">
                Key Insight
              </h3>
              <p className="text-lg leading-relaxed">
                {project.narrative.insight}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Screenshots Gallery */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <h2 className="text-xl font-bold mb-6">Screenshots</h2>
            </Reveal>
            <div className="flex gap-5 overflow-x-auto snap-scroll pb-4">
              {project.screenshots.map((src, i) => (
                <Reveal key={src} delay={i * 100} direction="scale">
                  <div className="browser-chrome shrink-0 w-[600px] md:w-[800px]">
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
                        className="object-cover object-top"
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
      <section className="py-16 border-y border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.metrics.map((metric, i) => (
              <Reveal key={metric.label} delay={i * 100}>
                <div className="text-center">
                  <div
                    className="text-3xl md:text-4xl font-bold mb-1"
                    style={{ color: project.accentColor }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted font-mono">
                    {metric.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              How it works
            </h2>
            <p className="text-muted mb-12 max-w-xl">
              The architecture behind the system.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 100}>
                <div className="p-5 rounded-xl border border-border hover:border-foreground/15 transition-colors h-full">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${project.accentColor}12` }}
                  >
                    <div style={{ color: project.accentColor }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5">
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
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-xl font-bold mb-6">Built with</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="skill-tag">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hero Image */}
      {project.heroImage && (
        <section className="py-16 border-t border-border">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border">
                <Image
                  src={project.heroImage}
                  alt={project.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See the code
            </h2>
            <p className="text-muted mb-8">
              Full source code available. See exactly how it&apos;s built.
            </p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              <Github size={16} />
              View on GitHub
              <ArrowRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm">
          <span className="opacity-70">Deepak Singh Kandari</span>
          <span className="opacity-40">Built with Next.js & Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
