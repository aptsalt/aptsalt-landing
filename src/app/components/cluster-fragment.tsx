"use client";

import { useEffect, useRef } from "react";

/* ============================================================
   ClusterFragment — a broken piece of the reactor for each
   cluster: a partial toothed ring + struts that slowly rotate
   while shedding debris particles (disintegrating further),
   tinted entirely in that cluster's accent. Runs only while
   on-screen; static under reduced motion.
   ============================================================ */

export function ClusterFragment({ accent }: { accent: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let inView = true;

    type Deb = { a: number; r: number; va: number; vr: number; life: number; sz: number };
    let debris: Deb[] = [];

    const spawn = (): Deb => ({
      a: Math.random() * Math.PI * 2,
      r: 0.42 + Math.random() * 0.2,
      va: (Math.random() - 0.5) * 0.01,
      vr: 0.0015 + Math.random() * 0.004,
      life: 0,
      sz: 0.6 + Math.random() * 1.4,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    debris = Array.from({ length: 26 }, spawn).map((d) => ({ ...d, life: Math.random() }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.34;
      const rot = reduce ? 0.3 : t * 0.4;

      ctx.save();

      // soft accent glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6);
      glow.addColorStop(0, `${accent}22`);
      glow.addColorStop(1, `${accent}00`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // partial toothed ring (the broken arc) — ~230°
      const a0 = rot;
      const a1 = rot + Math.PI * 1.3;
      ctx.strokeStyle = accent;
      ctx.lineWidth = Math.max(2.5, R * 0.05);
      ctx.beginPath();
      ctx.arc(cx, cy, R, a0, a1);
      ctx.stroke();
      // teeth along the arc
      ctx.lineWidth = 1.4;
      const teeth = 34;
      for (let i = 0; i <= teeth; i++) {
        const a = a0 + (a1 - a0) * (i / teeth);
        ctx.strokeStyle = i % 2 === 0 ? accent : `${accent}88`;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * (R + 1), cy + Math.sin(a) * (R + 1));
        ctx.lineTo(cx + Math.cos(a) * (R + R * 0.07), cy + Math.sin(a) * (R + R * 0.07));
        ctx.stroke();
      }

      // an inner broken arc + struts
      ctx.strokeStyle = `${accent}aa`;
      ctx.lineWidth = Math.max(1.5, R * 0.03);
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.6, a0 + 0.6, a0 + Math.PI);
      ctx.stroke();
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 6; i++) {
        const a = a0 + 0.6 + (i / 6) * (Math.PI - 0.6);
        ctx.strokeStyle = `${accent}66`;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * R * 0.6, cy + Math.sin(a) * R * 0.6);
        ctx.lineTo(cx + Math.cos(a) * R * 0.92, cy + Math.sin(a) * R * 0.92);
        ctx.stroke();
      }

      // hub bolt cluster
      ctx.fillStyle = accent;
      for (let i = 0; i < 5; i++) {
        const a = rot * 1.6 + (i / 5) * Math.PI * 2;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * R * 0.22, cy + Math.sin(a) * R * 0.22, R * 0.04, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // disintegrating debris drifting outward
      for (const d of debris) {
        if (!reduce) {
          d.a += d.va;
          d.r += d.vr;
          d.life += 0.006;
        }
        if (d.r > 0.95 || d.life > 1) Object.assign(d, spawn());
        const x = cx + Math.cos(d.a + rot) * R * (d.r / 0.34) * 0.34 * 2.4;
        const y = cy + Math.sin(d.a + rot) * R * (d.r / 0.34) * 0.34 * 2.4;
        ctx.fillStyle = accent;
        ctx.globalAlpha = Math.max(0, 0.7 * (1 - d.life));
        ctx.beginPath();
        ctx.arc(x, y, d.sz, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const loop = () => {
      t += 0.01;
      if (inView) draw();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [accent]);

  return <canvas ref={ref} className="cluster-fragment" aria-hidden="true" />;
}
