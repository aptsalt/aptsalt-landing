"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type ClusterMeta = { label: string; name: string; accent: string };

/* ============================================================
   CoreShatter — a magnificent, engineered reactor (metallic
   rings, a turbine hub, radial struts, bolts and a sweeping
   energy arc, lit from the top-left) that slowly rotates while
   intact, then performs an exploded-view disassembly on scroll
   and disperses its debris into four labelled clusters (C1–C4).
   Pure 2D canvas, scroll-driven, reduced-motion + mobile aware.
   ============================================================ */

export function CoreShatter({
  clusters,
  children,
}: {
  clusters: ClusterMeta[];
  children?: ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    const STEEL_HI = "#d7dde6";
    const STEEL_MD = "#8b94a4";
    const STEEL_LO = "#2c3340";
    const ENERGY = "#5b8cff";

    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;

    // debris nodes that the reactor disassembles into
    type Pt = { ang: number; rad: number; cl: number; sx: number; sy: number; sz: number };
    let pts: Pt[] = [];

    const ringDefs = [0.2, 0.42, 0.62, 0.82, 1.0];

    const build = () => {
      pts = [];
      ringDefs.forEach((rf, ri) => {
        const n = 6 + ri * 9;
        for (let i = 0; i < n; i++) {
          const ang = (i / n) * Math.PI * 2 + ri * 0.22;
          const norm = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const cl = Math.min(3, Math.floor((norm / (Math.PI * 2)) * 4));
          pts.push({
            ang,
            rad: rf,
            cl,
            sx: Math.random() * 2 - 1,
            sy: Math.random() * 2 - 1,
            sz: 0.7 + Math.random() * 0.7,
          });
        }
      });
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
    const smooth = (a: number, b: number, x: number) => {
      const tt = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return tt * tt * (3 - 2 * tt);
    };

    const anchorsFor = () => {
      const ax = w < 760 ? 0.27 : 0.2;
      return [
        { x: w * ax, y: h * 0.32 },
        { x: w * (1 - ax), y: h * 0.32 },
        { x: w * ax, y: h * 0.72 },
        { x: w * (1 - ax), y: h * 0.72 },
      ];
    };

    /* ---- the magnificent intact reactor (drawn with alpha = 1-pp) ---- */
    const ringGrad = (cx: number, cy: number, R: number) => {
      const g = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      g.addColorStop(0, STEEL_HI);
      g.addColorStop(0.45, STEEL_MD);
      g.addColorStop(1, STEEL_LO);
      return g;
    };

    const drawReactor = (cx: number, cy: number, R: number, rot: number, alpha: number, explode: number) => {
      if (alpha <= 0.02) return;
      ctx.save();
      ctx.globalAlpha = alpha;

      // ambient core glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.25);
      glow.addColorStop(0, "rgba(91,140,255,0.12)");
      glow.addColorStop(1, "rgba(91,140,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // exploded radial offset per ring (outer rings push out further)
      const ex = (rf: number) => 1 + explode * rf * 0.55;

      // outer ring with gear teeth
      const rOut = R * ex(1.0);
      ctx.strokeStyle = ringGrad(cx, cy, rOut);
      ctx.lineWidth = Math.max(3, R * 0.05);
      ctx.beginPath();
      ctx.arc(cx, cy, rOut, 0, Math.PI * 2);
      ctx.stroke();
      // teeth
      ctx.lineWidth = Math.max(1.5, R * 0.018);
      const teeth = 64;
      for (let i = 0; i < teeth; i++) {
        const a = (i / teeth) * Math.PI * 2 + rot * 0.6;
        const r1 = rOut + R * 0.012;
        const r2 = rOut + R * 0.05;
        ctx.strokeStyle = i % 2 === 0 ? STEEL_MD : STEEL_LO;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        ctx.stroke();
      }

      // mid rings
      [0.82, 0.62, 0.42].forEach((rf) => {
        const rr = R * ex(rf);
        ctx.strokeStyle = ringGrad(cx, cy, rr);
        ctx.lineWidth = Math.max(2.5, R * (rf > 0.7 ? 0.045 : 0.03));
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.stroke();
        // bright rim on top-left quarter
        ctx.strokeStyle = "rgba(255,255,255,0.55)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, Math.PI * 1.05, Math.PI * 1.55);
        ctx.stroke();
      });

      // bolts on the 0.62 ring
      const rBolt = R * ex(0.62);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + rot * 0.6;
        const bx = cx + Math.cos(a) * rBolt;
        const by = cy + Math.sin(a) * rBolt;
        const bg = ctx.createRadialGradient(bx - 1.5, by - 1.5, 0, bx, by, R * 0.03);
        bg.addColorStop(0, STEEL_HI);
        bg.addColorStop(1, STEEL_LO);
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(bx, by, R * 0.026, 0, Math.PI * 2);
        ctx.fill();
      }

      // radial struts from hub to 0.82 ring
      const rHub = R * 0.2 * (1 + explode * 0.1);
      const rStrut = R * ex(0.82);
      ctx.lineWidth = Math.max(2, R * 0.02);
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2 + rot;
        ctx.strokeStyle = i % 2 === 0 ? STEEL_MD : STEEL_LO;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * rHub, cy + Math.sin(a) * rHub);
        ctx.lineTo(cx + Math.cos(a) * rStrut, cy + Math.sin(a) * rStrut);
        ctx.stroke();
      }

      // turbine hub
      const hg = ctx.createRadialGradient(cx - rHub * 0.4, cy - rHub * 0.4, 0, cx, cy, rHub);
      hg.addColorStop(0, STEEL_HI);
      hg.addColorStop(0.6, STEEL_MD);
      hg.addColorStop(1, STEEL_LO);
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(cx, cy, rHub, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, rHub, Math.PI * 1.0, Math.PI * 1.6);
      ctx.stroke();
      // hub bolts
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + rot * 1.4;
        ctx.fillStyle = STEEL_LO;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * rHub * 0.6, cy + Math.sin(a) * rHub * 0.6, rHub * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }
      // glowing core
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rHub * 0.5);
      cg.addColorStop(0, "rgba(140,180,255,0.95)");
      cg.addColorStop(1, "rgba(91,140,255,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, rHub * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // sweeping energy arc on the 0.42 ring
      const eR = R * ex(0.42);
      const start = rot * 2.2;
      ctx.strokeStyle = ENERGY;
      ctx.lineWidth = Math.max(2, R * 0.016);
      ctx.shadowColor = ENERGY;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(cx, cy, eR, start, start + Math.PI * 0.5);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    const draw = (progress: number) => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.33;
      const cx = w / 2;
      const cy = h * 0.58;
      const rot = reduce ? 0.4 : t * (progress < 0.25 ? 1 : 0.25);
      const pp = ease(smooth(0.14, 0.92, progress));
      const explode = smooth(0.06, 0.5, progress); // exploded-view spread before full disperse
      const anchors = anchorsFor();
      const S = Math.min(w, h) * 0.135;

      // intact, magnificent reactor — fades as it disperses
      drawReactor(cx, cy, R, rot, 1 - pp, explode);

      // debris — chips of metal flying to the four clusters, tinting to accent
      for (const p of pts) {
        const coreX = cx + Math.cos(p.ang + rot) * p.rad * R * (1 + explode * p.rad * 0.55);
        const coreY = cy + Math.sin(p.ang + rot) * p.rad * R * (1 + explode * p.rad * 0.55);
        const a = anchors[p.cl];
        const disX = a.x + p.sx * S;
        const disY = a.y + p.sy * S * 0.8;
        const x = coreX + (disX - coreX) * pp;
        const y = coreY + (disY - coreY) * pp;
        const acc = clusters[p.cl]?.accent ?? ENERGY;
        // motion streak as it disperses
        if (pp > 0.25 && pp < 0.98) {
          ctx.strokeStyle = `${acc}55`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - (disX - coreX) * 0.03, y - (disY - coreY) * 0.03);
          ctx.stroke();
        }
        ctx.fillStyle = pp > 0.22 ? acc : STEEL_MD;
        ctx.globalAlpha = pp > 0.22 ? 0.55 + 0.4 * pp : 0.85 * (1 - pp);
        const s = (pp > 0.5 ? 2.4 : 1.8) * p.sz;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // C1–C4 labels reveal on their anchors
      const labelOp = smooth(0.55, 0.85, progress);
      labelRefs.current.forEach((el, k) => {
        if (!el) return;
        const a = anchors[k];
        el.style.left = `${a.x}px`;
        el.style.top = `${a.y}px`;
        el.style.opacity = String(labelOp);
        el.style.transform = `translate(-50%, -50%) translateY(${(1 - labelOp) * 10}px)`;
      });

      if (titleRef.current) {
        const o = 1 - smooth(0.04, 0.24, progress);
        titleRef.current.style.opacity = String(o);
        titleRef.current.style.transform = `translateY(${-(1 - o) * 40}px)`;
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - smooth(0, 0.12, progress));
      if (hintRef.current) {
        hintRef.current.style.opacity = String(smooth(0.6, 0.85, progress) * (1 - smooth(0.97, 1, progress)));
      }
    };

    const progressNow = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return 0;
      return Math.max(0, Math.min(1, -rect.top / total));
    };

    const loop = () => {
      t += 0.0024;
      draw(progressNow());
      raf = requestAnimationFrame(loop);
    };

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
      <div className="core-sticky">
        <canvas ref={canvasRef} className="core-canvas" aria-hidden="true" />
        <div ref={titleRef} className="core-title">{children}</div>
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
          <span>Scroll to disassemble the core</span>
          <span className="core-cue-rail" />
        </div>
        <div ref={hintRef} className="core-hint">Four clusters. One engineer.</div>
      </div>
    </section>
  );
}
