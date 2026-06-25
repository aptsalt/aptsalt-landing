"use client";

import { useEffect, useRef } from "react";

const BASE = "/aptsalt-landing";

type Era = {
  key: string;
  year: string;
  title: string;
  caption: string;
  accent: string;
};

const ERAS: Era[] = [
  { key: "era1_transistor", year: "1947", title: "The Transistor", caption: "Silicon switches a current. Computing begins.", accent: "#8B5CF6" },
  { key: "era2_microchip", year: "1971", title: "The Microchip", caption: "Thousands of switches on a fingernail of silicon.", accent: "#7c6cf0" },
  { key: "era3_gpu", year: "1999", title: "The GPU", caption: "Parallel math — the engine that would train minds.", accent: "#3B82F6" },
  { key: "era4_neuralnet", year: "2012", title: "Neural Nets", caption: "AlexNet. Machines start to see.", accent: "#10B981" },
  { key: "era5_transformer", year: "2017", title: "Transformers", caption: "Attention is all you need. Language unlocks.", accent: "#34d399" },
  { key: "era6_agent", year: "2023", title: "Agents", caption: "Models that act — reason, call tools, ship work.", accent: "#F59E0B" },
];

export function EraTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".era-node"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="era-timeline" ref={rootRef} aria-label="From Silicon to Sentience timeline">
      <div className="era-rail" aria-hidden="true" />
      <div className="era-track">
        {ERAS.map((era, i) => (
          <div
            className="era-node"
            key={era.key}
            style={{
              ["--era-accent" as string]: era.accent,
              ["--era-delay" as string]: `${i * 90}ms`,
              ["--era-float" as string]: `${4 + (i % 3)}s`,
            }}
          >
            <div className="era-stage">
              <span className="era-glow" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="era-object" src={`${BASE}/gen/${era.key}.png`} alt={era.title} loading={i < 2 ? "eager" : "lazy"} />
            </div>
            <span className="era-dot" aria-hidden="true" />
            <div className="era-meta">
              <span className="era-year">{era.year}</span>
              <span className="era-title">{era.title}</span>
              <span className="era-caption">{era.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
