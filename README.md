# aptsalt-landing

Personal portfolio site showcasing 12 AI/ML engineering projects with comprehensive architecture diagrams, narrative case studies, and live demos.

**Live:** [aptsalt.github.io/aptsalt-landing](https://aptsalt.github.io/aptsalt-landing/)

## Projects

| Project | Focus |
|---------|-------|
| Enterprise Playground | QLoRA fine-tuned AI UI generator on RTX 4090 |
| AgentHire | Multi-agent hiring platform with LangGraph |
| LLM Gateway | Multi-provider routing with budget control & circuit breakers |
| RAG Eval Engine | Hybrid retrieval (BM25 + dense) with 5-metric evaluation |
| ML Portfolio | From-scratch PyTorch: GPT, PPO, BPE tokenizer, RLHF |
| Nosce | Personal knowledge graph with NLP entity extraction |
| Tech Deep Dive | Interactive knowledge base — 54 deep-dive articles |
| Claude Dashboard | Real-time Claude Code observability with 3D canvas |
| Claude Pilot | Autonomous IDE agent with git safety checkpoints |
| Animated WebGL | 86+ GPU-accelerated visual scenes (Three.js + GLSL) |
| Mole World Dashboard | AI film production analytics with 3D globe |
| Context Engineering Academy | 6 interactive academy tracks with 70+ modules |

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS · Lucide Icons

## Architecture Diagrams

Each project page features a comprehensive Excalidraw architecture diagram with:
- Multi-zoom layout (summary bar → section boundaries → component detail)
- Evidence artifacts (dark code blocks with real configs, schemas, and metrics)
- 35-55 elements per diagram

Diagrams are generated via `scripts/generate-diagrams.py` and rendered to PNG with the Excalidraw renderer.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to /out
```

## Deploy

Static export deployed to GitHub Pages via the `gh-pages` branch. The `basePath` is set to `/aptsalt-landing`.
