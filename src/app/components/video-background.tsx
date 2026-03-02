"use client";

import { useEffect, useRef, useState } from "react";

/**
 * VideoBackground — lazy-loaded background video with IntersectionObserver.
 * Only loads/plays when the section is in viewport. Respects prefers-reduced-motion.
 */
export function VideoBackground({
  src,
  poster,
  className = "",
  opacity = 0.25,
  gradientFrom = "from-background/40",
  gradientVia = "via-background/55",
  gradientTo = "to-background/80",
}: {
  src: string;
  poster?: string;
  className?: string;
  opacity?: number;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible && !prefersReduced) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {isVisible && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          className="w-full h-full object-cover"
          style={{ opacity }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientFrom} ${gradientVia} ${gradientTo}`} />
    </div>
  );
}
