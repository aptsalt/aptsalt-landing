"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type ClusterMeta = { label: string; name: string; accent: string };

/* ============================================================
   CoreShatter — a single complex "engineered core" (concentric
   rings + a lattice of struts) that slowly rotates while intact,
   then FRACTURES on scroll and disperses its fragments into four
   labelled clusters (C1–C4). Pure 2D canvas, scroll-driven,
   reduced-motion + mobile aware. The hero headline (children)
   fades out as the fracture begins.
   ============================================================ */

export function CoreShatter({
  clusters,
  children,
}: {
  clusters: ClusterMeta[];
  children?: ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;

    type Pt = { ang: number; rad: number; cl: number; sx: number; sy: number; sz: number };
    let pts: Pt[] = [];
    let pairs: Array<[number, number]> = [];

    const ringDefs = [
      { r: 0.0, n: 1 },
      { r: 0.14, n: 6 },
      { r: 0.24, n: 12 },
      { r: 0.34, n: 18 },
      { r: 0.44, n: 24 },
      { r: 0.54, n: 30 },
    ];

    const build = () => {
      pts = [];
      ringDefs.forEach((ring, ri) => {
        for (let i = 0; i < ring.n; i++) {
          const ang = (i / ring.n) * Math.PI * 2 + ri * 0.26;
          // cluster = angular quadrant -> 4 groups
          const norm = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const cl = Math.min(3, Math.floor((norm / (Math.PI * 2)) * 4));
          pts.push({
            ang,
            rad: ring.r,
            cl,
            sx: Math.random() * 2 - 1,
            sy: Math.random() * 2 - 1,
            sz: 0.7 + Math.random() * 0.6,
          });
        }
      });
      // strut pairs computed once from the intact (un-rotated) layout
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;
      const core = pts.map((p) => ({
        x: cx + Math.cos(p.ang) * p.rad * R,
        y: cy + Math.sin(p.ang) * p.rad * R,
      }));
      pairs = [];
      const thr = R * 0.2;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = core[i].x - core[j].x;
          const dy = core[i].y - core[j].y;
          if (Math.hypot(dx, dy) < thr) pairs.push([i, j]);
        }
      }
    }

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    const ease = (x: number) =>
      x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    const smooth = (a: number, b: number, x: number) => {
      const tt = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return tt * tt * (3 - 2 * tt);
    };

    const anchorsFor = () => {
      // four spread anchors (a wide diamond), responsive
      const ax = w < 760 ? 0.28 : 0.2;
      const ay1 = 0.32;
      const ay2 = 0.72;
      return [
        { x: w * ax, y: h * ay1 },
        { x: w * (1 - ax), y: h * ay1 },
        { x: w * ax, y: h * ay2 },
        { x: w * (1 - ax), y: h * ay2 },
      ];
    }

    const draw = (progress: number) => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;
      const rot = reduce ? 0 : t * (progress < 0.25 ? 1 : 0.25);
      const pp = ease(smooth(0.12, 0.92, progress));
      const anchors = anchorsFor();
      const S = Math.min(w, h) * 0.135;

      const pos = pts.map((p) => {
        const coreX = cx + Math.cos(p.ang + rot) * p.rad * R;
        const coreY = cy + Math.sin(p.ang + rot) * p.rad * R;
        const a = anchors[p.cl];
        const disX = a.x + p.sx * S;
        const disY = a.y + p.sy * S * 0.8;
        return {
          x: coreX + (disX - coreX) * pp,
          y: coreY + (disY - coreY) * pp,
          cl: p.cl,
          z: p.sz,
        };
      });

      // struts + rings while still cohering
      if (pp < 0.97) {
        ctx.lineWidth = 1;
        for (const [i, j] of pairs) {
          ctx.strokeStyle = `rgba(38,42,52,${0.18 * (1 - pp)})`;
          ctx.beginPath();
          ctx.moveTo(pos[i].x, pos[i].y);
          ctx.lineTo(pos[j].x, pos[j].y);
          ctx.stroke();
        }
        ctx.strokeStyle = `rgba(38,42,52,${0.1 * (1 - pp)})`;
        for (const ring of ringDefs) {
          if (ring.r === 0) continue;
          ctx.beginPath();
          ctx.arc(cx, cy, ring.r * R, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // nodes — charcoal while intact, tinting to the cluster accent as they disperse
      for (const pt of pos) {
        const acc = clusters[pt.cl]?.accent ?? "#4d9fff";
        ctx.fillStyle = pp > 0.18 ? acc : "rgba(33,37,46,0.9)";
        ctx.globalAlpha = pp > 0.18 ? 0.5 + 0.45 * pp : 0.9;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, (pp > 0.5 ? 2.4 : 1.7) * pt.z, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // position + reveal the C1–C4 labels at their anchors
      const labelOp = smooth(0.55, 0.85, progress);
      labelRefs.current.forEach((el, k) => {
        if (!el) return;
        const a = anchors[k];
        el.style.left = `${a.x}px`;
        el.style.top = `${a.y}px`;
        el.style.opacity = String(labelOp);
        el.style.transform = `translate(-50%, -50%) translateY(${(1 - labelOp) * 10}px)`;
      });

      // headline fades as the fracture starts
      if (titleRef.current) {
        const o = 1 - smooth(0.04, 0.26, progress);
        titleRef.current.style.opacity = String(o);
        titleRef.current.style.transform = `translateY(${-(1 - o) * 40}px)`;
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - smooth(0, 0.12, progress));
      if (hintRef.current) {
        hintRef.current.style.opacity = String(smooth(0.6, 0.85, progress) * (1 - smooth(0.97, 1, progress)));
      }
    }

    const progressNow = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return 0;
      return Math.max(0, Math.min(1, -rect.top / total));
    }

    const loop = () => {
      t += 0.0026;
      draw(progressNow());
      raf = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      const onScroll = () => draw(progressNow());
      draw(progressNow());
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
      };
    }

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [clusters]);

  return (
    <section ref={sectionRef} className="core-shatter">
      <div ref={stickyRef} className="core-sticky">
        <canvas ref={canvasRef} className="core-canvas" aria-hidden="true" />

        {/* hero headline overlay — fades out as the core fractures */}
        <div ref={titleRef} className="core-title">
          {children}
        </div>

        {/* cluster labels, positioned onto the dispersed anchors */}
        {clusters.map((c, i) => (
          <div
            key={c.label}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className="core-label"
            style={{ ["--c-accent" as string]: c.accent }}
          >
            <span className="core-label-tag">{c.label}</span>
            <span className="core-label-name">{c.name}</span>
          </div>
        ))}

        <div ref={cueRef} className="core-cue">
          <span>Scroll to fracture the core</span>
          <span className="core-cue-rail" />
        </div>
        <div ref={hintRef} className="core-hint">Four clusters. One engineer.</div>
      </div>
    </section>
  );
}
