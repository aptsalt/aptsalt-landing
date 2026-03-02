"use client";

import { Sparkles, Waves, Hexagon, Music, Code2, Gauge } from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "animated-webgl-library",
  name: "Animated WebGL Library",
  tagline: "86+ visual experiments in light and math — particles, fractals, audio-reactive shaders, and GPU-accelerated beauty.",
  accentClass: "accent-indigo",
  accentColor: "#6366F1",
  heroImage: "/aptsalt-landing/images/animated-webgl-library-hero.jpg",
  narrative: {
    hook: "86+ visual experiments in light and math.",
    problem:
      "Creative coding is often dismissed as 'not real engineering.' But the math behind particle systems, fractal geometry, and real-time audio analysis is some of the most demanding programming there is. GPU programming requires thinking in parallel. Shader math requires thinking in gradients. And making it all run at 60fps requires thinking in constraints.",
    approach:
      "Built a library of 86+ WebGL/Three.js visualizations spanning particles, fractals, audio-reactive scenes, fluid dynamics, and geometric art. Each experiment is a self-contained scene with configurable parameters. Custom GLSL shaders handle the heavy math on the GPU. Web Audio API drives the audio-reactive pieces.",
    insight:
      "The constraint of real-time rendering forces elegant solutions. When you have 16.6ms per frame, you can't brute-force anything. Every visualization taught a different optimization lesson: spatial hashing for particles, LOD for fractals, texture ping-pong for fluid simulation. The beauty is a byproduct of the engineering.",
  },
  features: [
    {
      icon: <Sparkles size={20} />,
      title: "86+ Visual Scenes",
      description:
        "From simple particle fountains to complex fractal landscapes. Each scene is a standalone experiment with tunable parameters and full source code.",
    },
    {
      icon: <Waves size={20} />,
      title: "Particle Systems",
      description:
        "GPU-instanced particles with forces, attractors, and field effects. Spatial hashing for collision detection. Millions of particles at 60fps.",
    },
    {
      icon: <Hexagon size={20} />,
      title: "Fractal Generators",
      description:
        "Mandelbrot, Julia sets, L-systems, and procedural terrain. Infinite zoom with progressive refinement and smooth color mapping.",
    },
    {
      icon: <Music size={20} />,
      title: "Audio-Reactive",
      description:
        "Web Audio API analysis feeds frequency and amplitude data into shaders. Visualizations pulse, morph, and evolve with the music in real-time.",
    },
    {
      icon: <Code2 size={20} />,
      title: "Custom GLSL Shaders",
      description:
        "Hand-written vertex and fragment shaders for each scene. Noise functions, ray marching, signed distance fields, and post-processing effects.",
    },
    {
      icon: <Gauge size={20} />,
      title: "60fps Optimized",
      description:
        "GPU instancing, texture atlases, LOD systems, and draw-call batching. Performance profiling baked into every scene for consistent frame times.",
    },
  ],
  metrics: [
    { value: "86+", label: "Visual Scenes" },
    { value: "WebGL 2.0", label: "GPU Rendered" },
    { value: "60fps", label: "Target Framerate" },
    { value: "GPU", label: "Accelerated" },
  ],
  techStack: [
    "Three.js",
    "WebGL 2.0",
    "GLSL",
    "TypeScript",
    "Canvas API",
    "Web Audio API",
    "React",
  ],
  githubUrl: "https://github.com/aptsalt/animated-webgl-library",
};

export default function AnimatedWebGLLibraryPage() {
  return <ProjectLayout project={project} />;
}
