"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode, type CSSProperties } from "react";

/** Hook: returns 0->1 as element scrolls through viewport */
export function useScrollProgress(offset = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - (rect.top - vh * offset) / (vh + rect.height);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [offset]);

  return { ref, progress };
}

/** Hook: returns current scrollY via rAF — used for hero parallax fade-out */
export function useHeroParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollY;
}

/** Parallax layer — moves at a different speed */
export function ParallaxLayer({
  children,
  speed = 0.5,
  clamp = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  clamp?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const vh = window.innerHeight;
      let offset = (center - vh / 2) * speed * -0.3;

      if (clamp) {
        const maxOffset = rect.height * 0.3;
        offset = Math.max(-maxOffset, Math.min(maxOffset, offset));
      }

      el.style.transform = `translate3d(0, ${offset}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed, clamp]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/** CountUp — animates a number from 0 to target on scroll entry */
export function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1200,
  className = "",
  style,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(el);

          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{value}{suffix}
    </span>
  );
}

/** Floating object — bobs and rotates gently */
export function FloatingObject({
  children,
  className = "",
  amplitude = 20,
  duration = 6,
  delay = 0,
}: {
  children?: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        animation: `floating-obj ${duration}s ease-in-out ${delay}s infinite`,
        willChange: "transform",
        ["--float-amp" as string]: `${amplitude}px`,
      }}
    >
      {children}
    </div>
  );
}

/** Scroll-driven scale+opacity element (Apple-style zoom in/out) */
export function ScrollScale({
  children,
  className = "",
  startScale = 0.8,
  endScale = 1,
}: {
  children: ReactNode;
  className?: string;
  startScale?: number;
  endScale?: number;
}) {
  const { ref, progress } = useScrollProgress(0.2);
  const scale = startScale + (endScale - startScale) * Math.min(progress * 1.5, 1);
  const opacity = Math.min(progress * 2, 1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `scale(${scale})`,
        opacity,
        willChange: "transform, opacity",
        transition: "transform 0.1s linear, opacity 0.1s linear",
      }}
    >
      {children}
    </div>
  );
}

/** Horizontal scroll section driven by vertical scroll */
export function HorizontalScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    let ticking = false;
    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollableWidth = inner.scrollWidth - container.clientWidth;
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - vh)));
      inner.style.transform = `translate3d(${-progress * scrollableWidth}px, 0, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div ref={innerRef} className="flex gap-8 px-6" style={{ willChange: "transform" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Sticky text reveal — text stays pinned while content scrolls */
export function StickyReveal({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="sticky top-32 self-start">
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}
