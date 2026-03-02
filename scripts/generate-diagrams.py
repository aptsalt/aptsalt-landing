"""
Generate Excalidraw architecture diagrams for all 12 portfolio projects.
Each diagram shows the core data flow / architecture pattern.
"""

import json
import os
import random

# Colors from the skill's color palette
COLORS = {
    "primary_fill": "#3b82f6",
    "primary_stroke": "#1e3a5f",
    "secondary_fill": "#60a5fa",
    "secondary_stroke": "#1e3a5f",
    "tertiary_fill": "#93c5fd",
    "tertiary_stroke": "#1e3a5f",
    "start_fill": "#fed7aa",
    "start_stroke": "#c2410c",
    "end_fill": "#a7f3d0",
    "end_stroke": "#047857",
    "decision_fill": "#fef3c7",
    "decision_stroke": "#b45309",
    "ai_fill": "#ddd6fe",
    "ai_stroke": "#6d28d9",
    "error_fill": "#fecaca",
    "error_stroke": "#b91c1c",
    "code_bg": "#1e293b",
    "code_text": "#22c55e",
    "title_color": "#1e40af",
    "subtitle_color": "#3b82f6",
    "body_color": "#64748b",
    "on_light": "#374151",
    "on_dark": "#ffffff",
    "line_color": "#64748b",
    "dot_fill": "#3b82f6",
}

seed_counter = 1000


def seed():
    global seed_counter
    seed_counter += 1
    return seed_counter


def make_rect(id, x, y, w, h, fill, stroke, text_id=None):
    bound = [{"id": text_id, "type": "text"}] if text_id else []
    return {
        "type": "rectangle",
        "id": id,
        "x": x, "y": y, "width": w, "height": h,
        "strokeColor": stroke,
        "backgroundColor": fill,
        "fillStyle": "solid",
        "strokeWidth": 2,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "angle": 0,
        "seed": seed(),
        "version": 1,
        "versionNonce": seed(),
        "isDeleted": False,
        "groupIds": [],
        "boundElements": bound,
        "link": None,
        "locked": False,
        "roundness": {"type": 3},
    }


def make_text(id, x, y, w, h, text, font_size=16, color="#374151", container_id=None, align="center", valign="middle"):
    return {
        "type": "text",
        "id": id,
        "x": x, "y": y, "width": w, "height": h,
        "text": text,
        "originalText": text,
        "fontSize": font_size,
        "fontFamily": 3,
        "textAlign": align,
        "verticalAlign": valign if container_id else "top",
        "strokeColor": color,
        "backgroundColor": "transparent",
        "fillStyle": "solid",
        "strokeWidth": 1,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "angle": 0,
        "seed": seed(),
        "version": 1,
        "versionNonce": seed(),
        "isDeleted": False,
        "groupIds": [],
        "boundElements": None,
        "link": None,
        "locked": False,
        "containerId": container_id,
        "lineHeight": 1.25,
    }


def make_arrow(id, x, y, points, stroke, start_id=None, end_id=None):
    return {
        "type": "arrow",
        "id": id,
        "x": x, "y": y,
        "width": abs(points[-1][0] - points[0][0]),
        "height": abs(points[-1][1] - points[0][1]),
        "strokeColor": stroke,
        "backgroundColor": "transparent",
        "fillStyle": "solid",
        "strokeWidth": 2,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "angle": 0,
        "seed": seed(),
        "version": 1,
        "versionNonce": seed(),
        "isDeleted": False,
        "groupIds": [],
        "boundElements": None,
        "link": None,
        "locked": False,
        "points": points,
        "startBinding": {"elementId": start_id, "focus": 0, "gap": 4} if start_id else None,
        "endBinding": {"elementId": end_id, "focus": 0, "gap": 4} if end_id else None,
        "startArrowhead": None,
        "endArrowhead": "arrow",
    }


def make_ellipse(id, x, y, w, h, fill, stroke):
    return {
        "type": "ellipse",
        "id": id,
        "x": x, "y": y, "width": w, "height": h,
        "strokeColor": stroke,
        "backgroundColor": fill,
        "fillStyle": "solid",
        "strokeWidth": 2,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "angle": 0,
        "seed": seed(),
        "version": 1,
        "versionNonce": seed(),
        "isDeleted": False,
        "groupIds": [],
        "boundElements": [],
        "link": None,
        "locked": False,
    }


def make_diamond(id, x, y, w, h, fill, stroke, text_id=None):
    bound = [{"id": text_id, "type": "text"}] if text_id else []
    return {
        "type": "diamond",
        "id": id,
        "x": x, "y": y, "width": w, "height": h,
        "strokeColor": stroke,
        "backgroundColor": fill,
        "fillStyle": "solid",
        "strokeWidth": 2,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "angle": 0,
        "seed": seed(),
        "version": 1,
        "versionNonce": seed(),
        "isDeleted": False,
        "groupIds": [],
        "boundElements": bound,
        "link": None,
        "locked": False,
    }


def wrap(elements):
    return json.dumps({
        "type": "excalidraw",
        "version": 2,
        "source": "https://excalidraw.com",
        "elements": elements,
        "appState": {"viewBackgroundColor": "#ffffff", "gridSize": 20},
        "files": {},
    }, indent=2)


def assembly_line(title, stages, subtitle=""):
    """Create a left-to-right assembly line diagram with labeled boxes."""
    elements = []

    # Title
    elements.append(make_text("title", 50, 20, 800, 35, title, 28, COLORS["title_color"]))
    if subtitle:
        elements.append(make_text("subtitle", 50, 60, 800, 25, subtitle, 16, COLORS["body_color"]))

    start_y = 120 if subtitle else 90
    box_w = 180
    box_h = 70
    gap = 60
    x = 50

    for i, (label, fill_key, stroke_key, detail) in enumerate(stages):
        fill = COLORS.get(fill_key, fill_key)
        stroke = COLORS.get(stroke_key, stroke_key)
        rid = f"rect_{i}"
        tid = f"text_{i}"
        did = f"detail_{i}"

        elements.append(make_rect(rid, x, start_y, box_w, box_h, fill, stroke, tid))
        elements.append(make_text(tid, x + 10, start_y + 10, box_w - 20, box_h - 20, label, 15, COLORS["on_light"], rid))

        # Detail text below box
        if detail:
            elements.append(make_text(did, x, start_y + box_h + 8, box_w, 20, detail, 11, COLORS["body_color"], align="center"))

        # Arrow to next
        if i < len(stages) - 1:
            ax = x + box_w
            ay = start_y + box_h // 2
            elements.append(make_arrow(f"arrow_{i}", ax, ay, [[0, 0], [gap, 0]], stroke, rid, f"rect_{i+1}"))

        x += box_w + gap

    return elements


def fan_out(title, center_label, branches, subtitle=""):
    """Create a hub-and-spoke diagram with center node branching to multiple targets."""
    elements = []

    # Title
    elements.append(make_text("title", 50, 20, 800, 35, title, 28, COLORS["title_color"]))
    if subtitle:
        elements.append(make_text("subtitle", 50, 60, 800, 25, subtitle, 16, COLORS["body_color"]))

    start_y = 120 if subtitle else 90

    # Center node
    cx, cy = 100, start_y + 120
    cw, ch = 200, 80
    elements.append(make_rect("center", cx, cy, cw, ch, COLORS["ai_fill"], COLORS["ai_stroke"], "center_text"))
    elements.append(make_text("center_text", cx + 10, cy + 10, cw - 20, ch - 20, center_label, 16, COLORS["on_light"], "center"))

    # Branches
    bx_start = 420
    n = len(branches)
    total_h = n * 70 + (n - 1) * 20
    by_start = cy + ch // 2 - total_h // 2

    for i, (label, fill_key, stroke_key, detail) in enumerate(branches):
        fill = COLORS.get(fill_key, fill_key)
        stroke = COLORS.get(stroke_key, stroke_key)
        bw, bh = 220, 55
        by = by_start + i * 90
        bid = f"branch_{i}"
        btid = f"branch_text_{i}"

        elements.append(make_rect(bid, bx_start, by, bw, bh, fill, stroke, btid))
        elements.append(make_text(btid, bx_start + 10, by + 8, bw - 20, bh - 16, label, 13, COLORS["on_light"], bid))

        if detail:
            elements.append(make_text(f"branch_detail_{i}", bx_start + bw + 12, by + 15, 200, 20, detail, 11, COLORS["body_color"], align="left"))

        # Arrow from center to branch
        arrow_start_x = cx + cw
        arrow_start_y = cy + ch // 2
        arrow_end_x = bx_start
        arrow_end_y = by + bh // 2
        dx = arrow_end_x - arrow_start_x
        dy = arrow_end_y - arrow_start_y
        elements.append(make_arrow(f"arrow_{i}", arrow_start_x, arrow_start_y, [[0, 0], [dx, dy]], COLORS["ai_stroke"], "center", bid))

    return elements


def convergence_flow(title, inputs, processor, output, subtitle=""):
    """Multiple inputs converge into a processor, which produces output."""
    elements = []

    # Title
    elements.append(make_text("title", 50, 20, 800, 35, title, 28, COLORS["title_color"]))
    if subtitle:
        elements.append(make_text("subtitle", 50, 60, 800, 25, subtitle, 16, COLORS["body_color"]))

    start_y = 120 if subtitle else 90

    # Input nodes
    n = len(inputs)
    total_h = n * 55 + (n - 1) * 15
    iy_start = start_y + 80 - total_h // 2

    for i, (label, fill_key, stroke_key) in enumerate(inputs):
        fill = COLORS.get(fill_key, fill_key)
        stroke = COLORS.get(stroke_key, stroke_key)
        iw, ih = 160, 45
        iy = iy_start + i * 70
        iid = f"input_{i}"
        itid = f"input_text_{i}"

        elements.append(make_rect(iid, 50, iy, iw, ih, fill, stroke, itid))
        elements.append(make_text(itid, 60, iy + 5, iw - 20, ih - 10, label, 13, COLORS["on_light"], iid))

    # Processor (center)
    plabel, pfill_key, pstroke_key = processor
    pfill = COLORS.get(pfill_key, pfill_key)
    pstroke = COLORS.get(pstroke_key, pstroke_key)
    px, py = 330, start_y + 50
    pw, ph = 200, 80
    elements.append(make_rect("proc", px, py, pw, ph, pfill, pstroke, "proc_text"))
    elements.append(make_text("proc_text", px + 10, py + 10, pw - 20, ph - 20, plabel, 15, COLORS["on_light"], "proc"))

    # Arrows from inputs to processor
    for i in range(n):
        iy = iy_start + i * 70 + 22
        ax = 210
        ay = iy
        dx = px - ax
        dy = (py + ph // 2) - ay
        elements.append(make_arrow(f"in_arrow_{i}", ax, ay, [[0, 0], [dx, dy]], COLORS["primary_stroke"], f"input_{i}", "proc"))

    # Output node
    olabel, ofill_key, ostroke_key = output
    ofill = COLORS.get(ofill_key, ofill_key)
    ostroke = COLORS.get(ostroke_key, ostroke_key)
    ox, oy = 650, start_y + 55
    ow, oh = 180, 70
    elements.append(make_rect("output", ox, oy, ow, oh, ofill, ostroke, "output_text"))
    elements.append(make_text("output_text", ox + 10, oy + 10, ow - 20, oh - 20, olabel, 14, COLORS["on_light"], "output"))

    # Arrow from processor to output
    elements.append(make_arrow("out_arrow", px + pw, py + ph // 2, [[0, 0], [ox - px - pw, 0]], pstroke, "proc", "output"))

    return elements


def pipeline_with_router(title, trigger, router_label, routes, output_label, subtitle=""):
    """Trigger → Router (diamond) → Multiple routes → Output."""
    elements = []

    elements.append(make_text("title", 50, 20, 900, 35, title, 28, COLORS["title_color"]))
    if subtitle:
        elements.append(make_text("subtitle", 50, 60, 900, 25, subtitle, 16, COLORS["body_color"]))

    start_y = 120 if subtitle else 90
    cy = start_y + 100

    # Trigger
    tw, th = 160, 60
    elements.append(make_rect("trigger", 50, cy, tw, th, COLORS["start_fill"], COLORS["start_stroke"], "trigger_text"))
    elements.append(make_text("trigger_text", 60, cy + 10, tw - 20, th - 20, trigger, 14, COLORS["on_light"], "trigger"))

    # Router diamond
    dw, dh = 120, 100
    dx = 300
    dy = cy - 10
    elements.append(make_diamond("router", dx, dy, dw, dh, COLORS["decision_fill"], COLORS["decision_stroke"], "router_text"))
    elements.append(make_text("router_text", dx + 15, dy + 25, dw - 30, dh - 50, router_label, 12, COLORS["on_light"], "router"))

    # Arrow trigger → router
    elements.append(make_arrow("arr_tr", 50 + tw, cy + th // 2, [[0, 0], [dx - 50 - tw, 0]], COLORS["start_stroke"], "trigger", "router"))

    # Routes
    n = len(routes)
    rx = 520
    total_h = n * 55 + (n - 1) * 15
    ry_start = cy + th // 2 - total_h // 2

    for i, (label, fill_key, stroke_key) in enumerate(routes):
        fill = COLORS.get(fill_key, fill_key)
        stroke = COLORS.get(stroke_key, stroke_key)
        rw, rh = 180, 50
        ry = ry_start + i * 70
        rid = f"route_{i}"
        rtid = f"route_text_{i}"

        elements.append(make_rect(rid, rx, ry, rw, rh, fill, stroke, rtid))
        elements.append(make_text(rtid, rx + 10, ry + 8, rw - 20, rh - 16, label, 12, COLORS["on_light"], rid))

        # Arrow from router to route
        rdx = rx - (dx + dw)
        rdy = (ry + rh // 2) - (dy + dh // 2)
        elements.append(make_arrow(f"arr_route_{i}", dx + dw, dy + dh // 2, [[0, 0], [rdx, rdy]], COLORS["decision_stroke"], "router", rid))

    # Output
    ow, oh = 160, 60
    ox = 800
    oy = cy
    elements.append(make_rect("output", ox, oy, ow, oh, COLORS["end_fill"], COLORS["end_stroke"], "output_text"))
    elements.append(make_text("output_text", ox + 10, oy + 10, ow - 20, oh - 20, output_label, 14, COLORS["on_light"], "output"))

    # Arrows from routes to output
    for i in range(n):
        ry = ry_start + i * 70 + 25
        rdx = ox - (rx + 180)
        rdy = (oy + oh // 2) - ry
        elements.append(make_arrow(f"arr_out_{i}", rx + 180, ry, [[0, 0], [rdx, rdy]], COLORS["end_stroke"], f"route_{i}", "output"))

    return elements


# ============ PROJECT DIAGRAMS ============

PROJECTS = {
    "ml-portfolio": lambda: fan_out(
        "ML Portfolio — Architecture",
        "PyTorch Core\nRTX 4090\nCUDA",
        [
            ("GPT Transformer\n125M-350M params", "ai_fill", "ai_stroke", "BPE + RLHF + DPO"),
            ("PPO Game Agent\nMiniGrid", "primary_fill", "primary_stroke", "GAE + Language-conditioned"),
            ("RAG + Feedback\nBM25 + Dense", "secondary_fill", "secondary_stroke", "DPO pair generation"),
            ("Custom BPE\nTokenizer", "tertiary_fill", "tertiary_stroke", "From scratch"),
        ],
        "3 production ML systems from scratch"
    ),

    "nosce": lambda: convergence_flow(
        "Nosce — Personal Knowledge Graph",
        [
            ("Notes & Docs", "start_fill", "start_stroke"),
            ("Bookmarks", "start_fill", "start_stroke"),
            ("Highlights", "start_fill", "start_stroke"),
            ("Conversations", "start_fill", "start_stroke"),
        ],
        ("NLP + Entity\nExtraction", "ai_fill", "ai_stroke"),
        ("Knowledge Graph\nPatterns & Insights", "end_fill", "end_stroke"),
        "Multi-source ingestion → semantic analysis → living knowledge graph"
    ),

    "tech-deep-dive": lambda: fan_out(
        "Tech Deep Dive — Interactive Knowledge Base",
        "MDX Engine\nNext.js 15\nPrism.js",
        [
            ("Systems", "primary_fill", "primary_stroke", "OS, networking, distributed"),
            ("ML / AI", "ai_fill", "ai_stroke", "Neural nets, transformers"),
            ("Web", "secondary_fill", "secondary_stroke", "React, APIs, performance"),
            ("Data", "tertiary_fill", "tertiary_stroke", "SQL, NoSQL, pipelines"),
            ("Infrastructure", "start_fill", "start_stroke", "Docker, K8s, CI/CD"),
            ("Security", "error_fill", "error_stroke", "OWASP, crypto, auth"),
        ],
        "54 deep-dives across 6 categories"
    ),

    "rag-eval-engine": lambda: assembly_line(
        "RAG Eval Engine — Architecture",
        [
            ("Document\nIngestion\n15+ formats", "start_fill", "start_stroke", "PDF, DOCX, code..."),
            ("Hybrid Retrieval\nBM25 + Qdrant", "primary_fill", "primary_stroke", "RRF fusion"),
            ("LLM Generation\nOllama / API", "ai_fill", "ai_stroke", "Semantic cache"),
            ("5-Metric Eval\nScoring", "decision_fill", "decision_stroke", "F/R/H/CP/CR"),
            ("Dashboard\nNext.js 14", "end_fill", "end_stroke", "6 pages"),
        ],
        "Hybrid RAG with 5-metric evaluation pipeline"
    ),

    "llm-gateway": lambda: pipeline_with_router(
        "LLM Gateway — Multi-Provider Routing",
        "API Request\nOpenAI-compat",
        "Smart\nRouter",
        [
            ("Ollama (local)", "ai_fill", "ai_stroke"),
            ("Groq", "primary_fill", "primary_stroke"),
            ("Together AI", "secondary_fill", "secondary_stroke"),
            ("OpenAI", "tertiary_fill", "tertiary_stroke"),
            ("Anthropic", "tertiary_fill", "tertiary_stroke"),
        ],
        "Response\n+ Metrics",
        "Semantic cache → circuit breaker → budget control → 5 providers"
    ),

    "claude-dashboard": lambda: assembly_line(
        "Claude Dashboard — Real-Time Observability",
        [
            ("Claude Code\nEvents", "start_fill", "start_stroke", "Tool calls, edits..."),
            ("WebSocket\nStream", "primary_fill", "primary_stroke", "Bidirectional"),
            ("Hook System\nProcessing", "ai_fill", "ai_stroke", "Extensible plugins"),
            ("3D Canvas\nVisualization", "secondary_fill", "secondary_stroke", "Session graph"),
            ("Timeline +\nCost Tracking", "end_fill", "end_stroke", "Token analytics"),
        ],
        "Real-time Claude Code event streaming → 3D visualization"
    ),

    "enterprise-playground": lambda: assembly_line(
        "Enterprise Playground — AI UI Generator",
        [
            ("Design System\nScraping", "start_fill", "start_stroke", "Playwright"),
            ("QLoRA\nFine-Tuning", "ai_fill", "ai_stroke", "r=32, 85% loss↓"),
            ("Smart Router\n95.8% acc", "decision_fill", "decision_stroke", "3B vs 14B"),
            ("RAG + Context\nCompression", "primary_fill", "primary_stroke", "ChromaDB"),
            ("SSE Stream\nCode Gen", "end_fill", "end_stroke", "8-tab UI"),
        ],
        "Scrape → Fine-tune → Route → RAG → Generate  |  RTX 4090, $0/token"
    ),

    "claude-pilot": lambda: assembly_line(
        "Claude Pilot — Autonomous IDE Agent",
        [
            ("Task Input\nPlanning", "start_fill", "start_stroke", "Multi-step"),
            ("MCP\nIntegration", "ai_fill", "ai_stroke", "Files, Git, DB"),
            ("Autonomous\nExecution", "primary_fill", "primary_stroke", "Pipelines"),
            ("Safety Layer\nCheckpoints", "decision_fill", "decision_stroke", "Git + dry-run"),
            ("Verified\nOutput", "end_fill", "end_stroke", "100% reversible"),
        ],
        "Plan → MCP tools → execute → validate → checkpoint"
    ),

    "agenthire": lambda: fan_out(
        "AgentHire — Multi-Agent AI Platform",
        "LangGraph\nOrchestrator\nDAG",
        [
            ("Profile Analyst\nResume → JSON", "start_fill", "start_stroke", "NLP parsing"),
            ("Market Researcher\nJob landscape", "primary_fill", "primary_stroke", "Trend analysis"),
            ("Match Scorer\n4D scoring", "decision_fill", "decision_stroke", "Skills+Exp+Edu+Culture"),
            ("Resume Tailor\nCustom output", "secondary_fill", "secondary_stroke", "Per-job optimization"),
            ("Interview Coach\nPrep & practice", "ai_fill", "ai_stroke", "Role-specific"),
        ],
        "5 agents, qwen2.5-coder:14b, 37-40 tok/s, $0 API costs"
    ),

    "animated-webgl-library": lambda: fan_out(
        "Animated WebGL Library — 86+ Scenes",
        "Three.js Core\nWebGL 2.0\nGLSL",
        [
            ("Particle Systems\nGPU instanced", "primary_fill", "primary_stroke", "Millions at 60fps"),
            ("Fractal Generators\nMandelbrot/Julia", "ai_fill", "ai_stroke", "Infinite zoom"),
            ("Audio-Reactive\nWeb Audio API", "secondary_fill", "secondary_stroke", "Freq → shaders"),
            ("Custom Shaders\nVertex/Fragment", "tertiary_fill", "tertiary_stroke", "Noise, ray march, SDF"),
        ],
        "GPU-accelerated visual experiments in light and math"
    ),

    "mole-world-dashboard": lambda: convergence_flow(
        "Mole World Dashboard — AI Film Production",
        [
            ("216 Claude\nSessions", "ai_fill", "ai_stroke"),
            ("Film Pipeline\n12 stages", "primary_fill", "primary_stroke"),
            ("Asset Tracker\nCharacters/Scenes", "secondary_fill", "secondary_stroke"),
        ],
        ("Supabase\nRealtime", "start_fill", "start_stroke"),
        ("3D Globe\nThree.js", "end_fill", "end_stroke"),
        "216 sessions → real-time analytics → 3D visualization"
    ),

    "context-engineering-academy": lambda: fan_out(
        "Context Engineering Academy — 6 Academies",
        "Next.js 15\nMDX + Sandpack\nSupabase",
        [
            ("Foundation\nCore concepts", "start_fill", "start_stroke", "Basics & theory"),
            ("Retrieval\nRAG patterns", "primary_fill", "primary_stroke", "Search + embed"),
            ("Memory\nPersistence", "ai_fill", "ai_stroke", "State management"),
            ("Tools\nFunction calling", "secondary_fill", "secondary_stroke", "MCP + plugins"),
            ("Orchestration\nAgents", "decision_fill", "decision_stroke", "Multi-agent flows"),
            ("Evaluation\nMetrics", "end_fill", "end_stroke", "Quality scoring"),
        ],
        "70+ interactive modules with code sandboxes"
    ),
}

# Generate all diagrams
output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "images", "diagrams")
os.makedirs(output_dir, exist_ok=True)

for slug, gen_fn in PROJECTS.items():
    elements = gen_fn()
    excalidraw_json = wrap(elements)
    filepath = os.path.join(output_dir, f"{slug}.excalidraw")
    with open(filepath, "w") as f:
        f.write(excalidraw_json)
    print(f"Generated: {slug}.excalidraw")

print(f"\nAll {len(PROJECTS)} diagrams generated in {output_dir}")
