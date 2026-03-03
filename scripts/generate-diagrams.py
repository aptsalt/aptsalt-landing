"""
Generate comprehensive Excalidraw architecture diagrams for all 12 portfolio projects.
Each diagram includes:
  - Summary flow bar at top (compact pipeline overview)
  - Section boundaries (labeled regions grouping components)
  - Detail inside sections (real tech names, real metrics, data formats)
  - Evidence artifacts (dark code-block rectangles with actual configs/schemas)
  - 15-25+ elements per diagram
  - Larger canvas (~1600x800+)
"""

import json
import os

# Colors from the Excalidraw skill's color palette
C = {
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
    "section_stroke": "#cbd5e1",
    "section_fill": "#f8fafc",
}

_seed = 1000


def seed():
    global _seed
    _seed += 1
    return _seed


def rect(id, x, y, w, h, fill, stroke, text_id=None, roundness=3):
    bound = [{"id": text_id, "type": "text"}] if text_id else []
    return {
        "type": "rectangle", "id": id,
        "x": x, "y": y, "width": w, "height": h,
        "strokeColor": stroke, "backgroundColor": fill,
        "fillStyle": "solid", "strokeWidth": 2, "strokeStyle": "solid",
        "roughness": 0, "opacity": 100, "angle": 0,
        "seed": seed(), "version": 1, "versionNonce": seed(),
        "isDeleted": False, "groupIds": [], "boundElements": bound,
        "link": None, "locked": False,
        "roundness": {"type": roundness},
    }


def text(id, x, y, w, h, txt, font_size=14, color="#374151",
         container_id=None, align="center", valign="middle", font_family=3):
    return {
        "type": "text", "id": id,
        "x": x, "y": y, "width": w, "height": h,
        "text": txt, "originalText": txt,
        "fontSize": font_size, "fontFamily": font_family,
        "textAlign": align,
        "verticalAlign": valign if container_id else "top",
        "strokeColor": color, "backgroundColor": "transparent",
        "fillStyle": "solid", "strokeWidth": 1, "strokeStyle": "solid",
        "roughness": 0, "opacity": 100, "angle": 0,
        "seed": seed(), "version": 1, "versionNonce": seed(),
        "isDeleted": False, "groupIds": [], "boundElements": None,
        "link": None, "locked": False,
        "containerId": container_id, "lineHeight": 1.25,
    }


def arrow(id, x, y, points, stroke, start_id=None, end_id=None, dashed=False):
    return {
        "type": "arrow", "id": id,
        "x": x, "y": y,
        "width": abs(points[-1][0] - points[0][0]) if len(points) > 1 else 0,
        "height": abs(points[-1][1] - points[0][1]) if len(points) > 1 else 0,
        "strokeColor": stroke, "backgroundColor": "transparent",
        "fillStyle": "solid", "strokeWidth": 2,
        "strokeStyle": "dashed" if dashed else "solid",
        "roughness": 0, "opacity": 100, "angle": 0,
        "seed": seed(), "version": 1, "versionNonce": seed(),
        "isDeleted": False, "groupIds": [], "boundElements": None,
        "link": None, "locked": False,
        "points": points,
        "startBinding": {"elementId": start_id, "focus": 0, "gap": 4} if start_id else None,
        "endBinding": {"elementId": end_id, "focus": 0, "gap": 4} if end_id else None,
        "startArrowhead": None, "endArrowhead": "arrow",
    }


def diamond(id, x, y, w, h, fill, stroke, text_id=None):
    bound = [{"id": text_id, "type": "text"}] if text_id else []
    return {
        "type": "diamond", "id": id,
        "x": x, "y": y, "width": w, "height": h,
        "strokeColor": stroke, "backgroundColor": fill,
        "fillStyle": "solid", "strokeWidth": 2, "strokeStyle": "solid",
        "roughness": 0, "opacity": 100, "angle": 0,
        "seed": seed(), "version": 1, "versionNonce": seed(),
        "isDeleted": False, "groupIds": [], "boundElements": bound,
        "link": None, "locked": False,
    }


def section_boundary(id, x, y, w, h, label):
    """Dashed-border region with a label in the top-left corner."""
    tid = f"{id}_label"
    return [
        {
            "type": "rectangle", "id": id,
            "x": x, "y": y, "width": w, "height": h,
            "strokeColor": C["section_stroke"], "backgroundColor": C["section_fill"],
            "fillStyle": "solid", "strokeWidth": 1, "strokeStyle": "dashed",
            "roughness": 0, "opacity": 40, "angle": 0,
            "seed": seed(), "version": 1, "versionNonce": seed(),
            "isDeleted": False, "groupIds": [], "boundElements": [],
            "link": None, "locked": False,
            "roundness": {"type": 3},
        },
        text(tid, x + 10, y + 6, 200, 18, label, 11, C["body_color"], align="left"),
    ]


def code_block(id, x, y, w, h, code_text):
    """Dark rectangle with monospace green text — evidence artifact."""
    tid = f"{id}_code"
    return [
        rect(id, x, y, w, h, C["code_bg"], C["code_bg"], tid, roundness=3),
        text(tid, x + 8, y + 4, w - 16, h - 8, code_text, 10, C["code_text"],
             container_id=id, align="left", valign="middle", font_family=3),
    ]


def summary_bar(id, x, y, w, h, txt):
    """Compact summary flow bar at top of diagram."""
    tid = f"{id}_text"
    return [
        rect(id, x, y, w, h, "#eff6ff", "#93c5fd", tid),
        text(tid, x + 8, y + 2, w - 16, h - 4, txt, 12, C["primary_stroke"],
             container_id=id, align="center", valign="middle"),
    ]


def wrap(elements):
    return json.dumps({
        "type": "excalidraw",
        "version": 2,
        "source": "https://excalidraw.com",
        "elements": elements,
        "appState": {"viewBackgroundColor": "#ffffff", "gridSize": 20},
        "files": {},
    }, indent=2)


# ============ COMPREHENSIVE PROJECT DIAGRAMS ============


def enterprise_playground():
    """Assembly line with detail boxes: QLoRA config, router accuracy, VRAM breakdown."""
    els = []

    # Title
    els.append(text("title", 50, 15, 1500, 35, "Enterprise Playground — AI UI Generator Pipeline", 26, C["title_color"], align="left"))

    # Summary bar
    els += summary_bar("sum", 50, 55, 1500, 28, "Scrape Design System  →  QLoRA Fine-Tune (r=32)  →  Smart Router (95.8%)  →  RAG Retrieval  →  SSE Stream Code Gen  |  RTX 4090, $0/token")

    # Section: Data Ingestion
    els += section_boundary("sec_ingest", 40, 95, 340, 310, "DATA INGESTION")
    els.append(rect("scrape", 60, 125, 170, 55, C["start_fill"], C["start_stroke"], "scrape_t"))
    els.append(text("scrape_t", 70, 130, 150, 45, "Playwright\nScraper", 14, C["on_light"], "scrape"))
    els.append(rect("ds", 60, 200, 170, 55, C["start_fill"], C["start_stroke"], "ds_t"))
    els.append(text("ds_t", 70, 205, 150, 45, "Design System\nParser", 14, C["on_light"], "ds"))
    els += code_block("cb_scrape", 60, 270, 300, 55, "{ components: 847,\n  tokens: 12.4k,\n  variants: 3.2k }")
    els.append(arrow("a_scrape", 230, 152, [[0, 0], [160, 0]], C["start_stroke"], "scrape"))

    # Section: Fine-Tuning
    els += section_boundary("sec_ft", 395, 95, 300, 310, "FINE-TUNING")
    els.append(rect("qlora", 415, 125, 180, 60, C["ai_fill"], C["ai_stroke"], "qlora_t"))
    els.append(text("qlora_t", 425, 130, 160, 50, "QLoRA\nFine-Tune", 15, C["on_light"], "qlora"))
    els.append(rect("base", 415, 205, 180, 45, C["ai_fill"], C["ai_stroke"], "base_t"))
    els.append(text("base_t", 425, 210, 160, 35, "Qwen2.5-Coder\n3B / 14B", 12, C["on_light"], "base"))
    els += code_block("cb_qlora", 415, 265, 260, 65, "QLoRA Config:\n  r=32, alpha=64\n  lr=2e-4, epochs=3\n  VRAM: 8.2GB / 16GB")
    els.append(arrow("a_ft", 330, 152, [[0, 0], [85, 0]], C["ai_stroke"], None, "qlora"))

    # Section: Routing
    els += section_boundary("sec_route", 710, 95, 250, 310, "INTELLIGENT ROUTING")
    els.append(diamond("router", 755, 130, 120, 90, C["decision_fill"], C["decision_stroke"], "router_t"))
    els.append(text("router_t", 770, 155, 90, 40, "Smart\nRouter", 12, C["on_light"], "router"))
    els.append(rect("r3b", 730, 240, 100, 40, C["tertiary_fill"], C["tertiary_stroke"], "r3b_t"))
    els.append(text("r3b_t", 735, 243, 90, 34, "3B Fast", 11, C["on_light"], "r3b"))
    els.append(rect("r14b", 845, 240, 100, 40, C["primary_fill"], C["primary_stroke"], "r14b_t"))
    els.append(text("r14b_t", 850, 243, 90, 34, "14B Quality", 11, C["on_dark"], "r14b"))
    els += code_block("cb_route", 720, 300, 230, 45, "Accuracy: 95.8%\nLatency: 3B=1.2s 14B=4.8s")
    els.append(arrow("a_route_d", 595, 155, [[0, 0], [160, 0]], C["decision_stroke"], "qlora", "router"))
    els.append(arrow("a_r3b", 815, 220, [[0, 0], [-35, 20]], C["decision_stroke"], "router", "r3b"))
    els.append(arrow("a_r14b", 815, 220, [[0, 0], [80, 20]], C["decision_stroke"], "router", "r14b"))

    # Section: RAG + Generation
    els += section_boundary("sec_rag", 975, 95, 280, 310, "RAG + GENERATION")
    els.append(rect("chroma", 995, 125, 160, 50, C["primary_fill"], C["primary_stroke"], "chroma_t"))
    els.append(text("chroma_t", 1005, 130, 140, 40, "ChromaDB\nContext", 13, C["on_dark"], "chroma"))
    els.append(rect("compress", 995, 195, 160, 45, C["secondary_fill"], C["secondary_stroke"], "compress_t"))
    els.append(text("compress_t", 1005, 200, 140, 35, "Context\nCompression", 12, C["on_light"], "compress"))
    els += code_block("cb_rag", 995, 260, 240, 55, "Retrieval: top-k=5\nContext window: 8192\nCompression: 3.2x")
    els.append(arrow("a_rag1", 875, 175, [[0, 0], [120, -20]], C["primary_stroke"]))
    els.append(arrow("a_rag2", 1155, 150, [[0, 0], [0, 45]], C["primary_stroke"], "chroma", "compress"))

    # Section: Output
    els += section_boundary("sec_out", 1270, 95, 280, 310, "OUTPUT")
    els.append(rect("sse", 1290, 125, 160, 55, C["end_fill"], C["end_stroke"], "sse_t"))
    els.append(text("sse_t", 1300, 130, 140, 45, "SSE Stream\nCode Gen", 14, C["on_light"], "sse"))
    els.append(rect("ui", 1290, 200, 160, 50, C["end_fill"], C["end_stroke"], "ui_t"))
    els.append(text("ui_t", 1300, 205, 140, 40, "8-Tab React\nPlayground", 12, C["on_light"], "ui"))
    els += code_block("cb_out", 1290, 270, 240, 55, "Tabs: Preview | Code |\n  Console | Settings |\n  Versions | History...")
    els.append(arrow("a_out", 1155, 217, [[0, 0], [135, -50]], C["end_stroke"]))

    return els


def agenthire():
    """Fan-out with agent detail cards: LangGraph DAG config, SSE event format, Profile JSON schema."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "AgentHire — Multi-Agent AI Hiring Platform", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "User Input  →  LangGraph Orchestrator (DAG)  →  5 Specialist Agents  →  SSE Stream  →  React Dashboard  |  Qwen 14B, 37-40 tok/s")

    # Section: Input
    els += section_boundary("sec_in", 40, 95, 200, 240, "INPUT")
    els.append(rect("resume", 60, 125, 160, 45, C["start_fill"], C["start_stroke"], "resume_t"))
    els.append(text("resume_t", 70, 130, 140, 35, "Resume\nUpload", 13, C["on_light"], "resume"))
    els.append(rect("job", 60, 185, 160, 45, C["start_fill"], C["start_stroke"], "job_t"))
    els.append(text("job_t", 70, 190, 140, 35, "Job URL\nScraping", 13, C["on_light"], "job"))
    els += code_block("cb_in", 60, 245, 160, 55, "Profile JSON:\n  skills: string[]\n  experience: Year[]\n  education: Degree[]")

    # Section: Orchestrator
    els += section_boundary("sec_orch", 260, 95, 240, 240, "ORCHESTRATOR")
    els.append(rect("lang", 280, 130, 200, 65, C["ai_fill"], C["ai_stroke"], "lang_t"))
    els.append(text("lang_t", 290, 135, 180, 55, "LangGraph\nDAG Engine", 15, C["on_light"], "lang"))
    els += code_block("cb_dag", 280, 210, 200, 80, "DAG Config:\n  nodes: 5 agents\n  edges: conditional\n  state: TypedDict\n  checkpoints: sqlite")
    els.append(arrow("a_in_orch", 220, 147, [[0, 0], [60, 0]], C["ai_stroke"], "resume", "lang"))

    # Section: Agents (fan-out)
    els += section_boundary("sec_agents", 520, 95, 520, 340, "SPECIALIST AGENTS")
    agents = [
        ("Profile Analyst", "NLP + entity extraction", C["start_fill"], C["start_stroke"]),
        ("Market Researcher", "Job landscape trends", C["primary_fill"], C["primary_stroke"]),
        ("Match Scorer", "4D: Skill+Exp+Edu+Culture", C["decision_fill"], C["decision_stroke"]),
        ("Resume Tailor", "Per-job customization", C["secondary_fill"], C["secondary_stroke"]),
        ("Interview Coach", "Role-specific prep", C["ai_fill"], C["ai_stroke"]),
    ]
    for i, (name, detail, fill, stroke) in enumerate(agents):
        ay = 120 + i * 60
        rid = f"agent_{i}"
        tid = f"agent_t_{i}"
        did = f"agent_d_{i}"
        els.append(rect(rid, 545, ay, 180, 45, fill, stroke, tid))
        els.append(text(tid, 555, ay + 5, 160, 35, name, 12, C["on_light"], rid))
        els.append(text(did, 740, ay + 12, 180, 20, detail, 10, C["body_color"], align="left"))
        els.append(arrow(f"a_agent_{i}", 480, 162, [[0, 0], [65, ay - 120 + 22]], C["ai_stroke"], "lang", rid))

    els += code_block("cb_agent", 545, 425 - 90, 280, 55, "Match Score Output:\n  { skills: 0.85, experience: 0.72,\n    education: 0.91, culture: 0.67 }")

    # Section: Output
    els += section_boundary("sec_out", 1060, 95, 280, 340, "OUTPUT STREAM")
    els.append(rect("sse", 1080, 125, 180, 50, C["end_fill"], C["end_stroke"], "sse_t"))
    els.append(text("sse_t", 1090, 130, 160, 40, "SSE Event\nStream", 13, C["on_light"], "sse"))
    els.append(rect("dash", 1080, 195, 180, 50, C["end_fill"], C["end_stroke"], "dash_t"))
    els.append(text("dash_t", 1090, 200, 160, 40, "React\nDashboard", 13, C["on_light"], "dash"))
    els += code_block("cb_sse", 1080, 265, 240, 65, "SSE Event Format:\n  event: agent_update\n  data: { agent, status,\n    progress, result }")
    for i in range(5):
        ay = 120 + i * 60 + 22
        els.append(arrow(f"a_out_{i}", 725, ay, [[0, 0], [355, 150 - ay + 120]], C["end_stroke"], f"agent_{i}"))

    return els


def llm_gateway():
    """Router with provider detail cards: OpenAI-compat request, cache config, circuit breaker states."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "LLM Gateway — Multi-Provider Routing Engine", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "OpenAI-compat Request  →  Semantic Cache  →  Budget Check  →  Smart Router  →  5 Providers  →  Circuit Breaker  →  Response + Metrics")

    # Section: Ingress
    els += section_boundary("sec_in", 40, 95, 220, 280, "INGRESS")
    els.append(rect("req", 60, 125, 170, 50, C["start_fill"], C["start_stroke"], "req_t"))
    els.append(text("req_t", 70, 130, 150, 40, "API Request\nOpenAI-compat", 13, C["on_light"], "req"))
    els += code_block("cb_req", 60, 190, 185, 75, "POST /v1/chat/completions\n{ model: \"auto\",\n  messages: [...],\n  temperature: 0.7,\n  max_tokens: 2048 }")
    els.append(rect("cache", 60, 280, 170, 45, C["secondary_fill"], C["secondary_stroke"], "cache_t"))
    els.append(text("cache_t", 70, 285, 150, 35, "Semantic\nCache", 12, C["on_light"], "cache"))

    # Section: Control Plane
    els += section_boundary("sec_ctrl", 280, 95, 280, 280, "CONTROL PLANE")
    els.append(rect("budget", 300, 125, 150, 45, C["decision_fill"], C["decision_stroke"], "budget_t"))
    els.append(text("budget_t", 310, 130, 130, 35, "Budget\nController", 12, C["on_light"], "budget"))
    els.append(diamond("router", 320, 195, 130, 90, C["decision_fill"], C["decision_stroke"], "router_t"))
    els.append(text("router_t", 338, 218, 95, 40, "Smart\nRouter", 12, C["on_light"], "router"))
    els += code_block("cb_ctrl", 300, 300, 240, 50, "Routing: cost-opt | perf-opt\nBudget: $X/day per-model cap")
    els.append(arrow("a_in_budget", 230, 150, [[0, 0], [70, 0]], C["start_stroke"], "req", "budget"))
    els.append(arrow("a_budget_route", 375, 170, [[0, 0], [10, 25]], C["decision_stroke"], "budget", "router"))

    # Section: Providers
    els += section_boundary("sec_prov", 580, 95, 420, 280, "PROVIDERS")
    providers = [
        ("Ollama (local)", C["ai_fill"], C["ai_stroke"], "Qwen 14B, 37 tok/s"),
        ("Groq", C["primary_fill"], C["primary_stroke"], "Llama 3.1, 800 tok/s"),
        ("Together AI", C["secondary_fill"], C["secondary_stroke"], "Mixtral, pool"),
        ("OpenAI", C["tertiary_fill"], C["tertiary_stroke"], "GPT-4o, o1"),
        ("Anthropic", C["tertiary_fill"], C["tertiary_stroke"], "Claude 4, Haiku"),
    ]
    for i, (name, fill, stroke, detail) in enumerate(providers):
        py = 118 + i * 48
        pid = f"prov_{i}"
        ptid = f"prov_t_{i}"
        els.append(rect(pid, 600, py, 160, 38, fill, stroke, ptid))
        els.append(text(ptid, 610, py + 4, 140, 30, name, 11, C["on_light"] if i != 1 else C["on_dark"], pid))
        els.append(text(f"prov_d_{i}", 775, py + 9, 200, 20, detail, 10, C["body_color"], align="left"))
        els.append(arrow(f"a_prov_{i}", 450, 240, [[0, 0], [150, py + 19 - 240]], C["decision_stroke"], "router", pid))

    # Section: Resilience
    els += section_boundary("sec_res", 1020, 95, 280, 280, "RESILIENCE + OUTPUT")
    els.append(rect("cb_node", 1040, 125, 160, 45, C["error_fill"], C["error_stroke"], "cb_node_t"))
    els.append(text("cb_node_t", 1050, 130, 140, 35, "Circuit\nBreaker", 12, C["on_light"], "cb_node"))
    els.append(rect("resp", 1040, 195, 160, 50, C["end_fill"], C["end_stroke"], "resp_t"))
    els.append(text("resp_t", 1050, 200, 140, 40, "Response\n+ Metrics", 13, C["on_light"], "resp"))
    els += code_block("cb_res", 1040, 265, 240, 55, "Circuit Breaker States:\n  CLOSED → HALF_OPEN → OPEN\n  Threshold: 5 fails / 60s")
    for i in range(5):
        py = 118 + i * 48 + 19
        els.append(arrow(f"a_out_{i}", 760, py, [[0, 0], [280, 150 - py + 118]], C["end_stroke"], f"prov_{i}"))

    return els


def rag_eval_engine():
    """Pipeline with eval metrics: Hybrid retrieval formula, 5-metric scoring, chunk config."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "RAG Eval Engine — Hybrid Retrieval + 5-Metric Evaluation", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "15+ Doc Formats  →  Chunking + Embedding  →  BM25 + Qdrant Hybrid  →  LLM Generation  →  5-Metric Eval  →  Dashboard")

    # Section: Ingestion
    els += section_boundary("sec_ingest", 40, 95, 280, 310, "DOCUMENT INGESTION")
    els.append(rect("ingest", 60, 125, 160, 50, C["start_fill"], C["start_stroke"], "ingest_t"))
    els.append(text("ingest_t", 70, 130, 140, 40, "Document\nIngestion", 14, C["on_light"], "ingest"))
    els.append(rect("chunk", 60, 195, 160, 45, C["start_fill"], C["start_stroke"], "chunk_t"))
    els.append(text("chunk_t", 70, 200, 140, 35, "Semantic\nChunking", 12, C["on_light"], "chunk"))
    els += code_block("cb_ingest", 60, 255, 240, 65, "Formats: PDF, DOCX, MD,\n  HTML, CSV, JSON, code...\nChunk: 512 tokens, 50 overlap\nEmbedding: all-MiniLM-L6")
    els.append(arrow("a_ing_ch", 140, 175, [[0, 0], [0, 20]], C["start_stroke"], "ingest", "chunk"))

    # Section: Retrieval
    els += section_boundary("sec_ret", 340, 95, 280, 310, "HYBRID RETRIEVAL")
    els.append(rect("bm25", 360, 125, 130, 45, C["primary_fill"], C["primary_stroke"], "bm25_t"))
    els.append(text("bm25_t", 370, 130, 110, 35, "BM25\nSparse", 12, C["on_dark"], "bm25"))
    els.append(rect("qdrant", 505, 125, 130, 45, C["primary_fill"], C["primary_stroke"], "qdrant_t"))
    els.append(text("qdrant_t", 515, 130, 110, 35, "Qdrant\nDense", 12, C["on_dark"], "qdrant"))
    els.append(rect("rrf", 395, 195, 180, 50, C["secondary_fill"], C["secondary_stroke"], "rrf_t"))
    els.append(text("rrf_t", 405, 200, 160, 40, "RRF Fusion\nReranking", 13, C["on_light"], "rrf"))
    els += code_block("cb_ret", 360, 260, 250, 60, "score = a*BM25 + (1-a)*dense\nRRF: 1/(k+rank), k=60\nRerank: cross-encoder top-5")
    els.append(arrow("a_ch_bm", 220, 217, [[0, 0], [140, -72]], C["primary_stroke"], "chunk"))
    els.append(arrow("a_bm_rrf", 425, 170, [[0, 0], [60, 25]], C["primary_stroke"], "bm25", "rrf"))
    els.append(arrow("a_qd_rrf", 570, 170, [[0, 0], [-85, 25]], C["primary_stroke"], "qdrant", "rrf"))

    # Section: Generation
    els += section_boundary("sec_gen", 640, 95, 240, 310, "LLM GENERATION")
    els.append(rect("llm", 660, 130, 180, 55, C["ai_fill"], C["ai_stroke"], "llm_t"))
    els.append(text("llm_t", 670, 135, 160, 45, "Ollama / API\nGeneration", 14, C["on_light"], "llm"))
    els.append(rect("sem_cache", 660, 205, 180, 40, C["secondary_fill"], C["secondary_stroke"], "sc_t"))
    els.append(text("sc_t", 670, 210, 160, 30, "Semantic Cache", 11, C["on_light"], "sem_cache"))
    els += code_block("cb_gen", 660, 260, 200, 55, "Models: qwen2.5, llama3\nCache hit rate: ~34%\nAvg latency: 1.8s")
    els.append(arrow("a_rrf_llm", 575, 220, [[0, 0], [85, -55]], C["ai_stroke"], "rrf", "llm"))

    # Section: Evaluation
    els += section_boundary("sec_eval", 900, 95, 280, 310, "5-METRIC EVALUATION")
    metrics_list = ["Faithfulness", "Relevance", "Hallucination", "Context Precision", "Context Recall"]
    for i, m in enumerate(metrics_list):
        my = 120 + i * 38
        mid = f"met_{i}"
        mtid = f"met_t_{i}"
        fill = [C["end_fill"], C["end_fill"], C["error_fill"], C["decision_fill"], C["decision_fill"]][i]
        stroke = [C["end_stroke"], C["end_stroke"], C["error_stroke"], C["decision_stroke"], C["decision_stroke"]][i]
        els.append(rect(mid, 920, my, 160, 30, fill, stroke, mtid))
        els.append(text(mtid, 930, my + 3, 140, 24, m, 11, C["on_light"], mid))
    els += code_block("cb_eval", 920, 315, 240, 50, "Scoring: 0.0-1.0 per metric\nAggregate: weighted mean\nThreshold: 0.7 minimum")
    els.append(arrow("a_llm_eval", 840, 157, [[0, 0], [80, 0]], C["ai_stroke"], "llm"))

    # Section: Dashboard
    els += section_boundary("sec_dash", 1200, 95, 200, 310, "DASHBOARD")
    els.append(rect("dash", 1220, 130, 160, 55, C["end_fill"], C["end_stroke"], "dash_t"))
    els.append(text("dash_t", 1230, 135, 140, 45, "Next.js 14\nDashboard", 13, C["on_light"], "dash"))
    els.append(text("dash_d", 1220, 200, 160, 80, "6 pages:\nIngestion, Search,\nChat, Eval,\nSettings, History", 11, C["body_color"], align="left"))
    els.append(arrow("a_eval_dash", 1080, 170, [[0, 0], [140, -10]], C["end_stroke"]))

    return els


def ml_portfolio():
    """Fan-out with model detail cards: Transformer config, PPO hyperparams, BPE tokenizer."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "ML Portfolio — From-Scratch PyTorch Implementations", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "PyTorch Core (RTX 4090 / CUDA 12.1)  →  GPT Transformer  |  PPO RL Agent  |  RAG + DPO  |  BPE Tokenizer  →  Production-grade ML")

    # Section: Core
    els += section_boundary("sec_core", 40, 95, 250, 300, "CORE FRAMEWORK")
    els.append(rect("pytorch", 60, 125, 200, 60, C["ai_fill"], C["ai_stroke"], "pytorch_t"))
    els.append(text("pytorch_t", 70, 130, 180, 50, "PyTorch Core\nRTX 4090 / CUDA", 14, C["on_light"], "pytorch"))
    els += code_block("cb_core", 60, 205, 210, 75, "Hardware:\n  GPU: RTX 4090 16GB\n  CUDA: 12.1\n  cuDNN: 8.9\n  Mixed precision: FP16")

    # Section: GPT
    els += section_boundary("sec_gpt", 310, 95, 300, 300, "GPT TRANSFORMER")
    els.append(rect("gpt", 330, 125, 180, 55, C["ai_fill"], C["ai_stroke"], "gpt_t"))
    els.append(text("gpt_t", 340, 130, 160, 45, "GPT Transformer\n125M-350M params", 13, C["on_light"], "gpt"))
    els.append(rect("rlhf", 330, 195, 180, 40, C["secondary_fill"], C["secondary_stroke"], "rlhf_t"))
    els.append(text("rlhf_t", 340, 200, 160, 30, "RLHF + DPO", 11, C["on_light"], "rlhf"))
    els += code_block("cb_gpt", 330, 250, 260, 65, "Config: d_model=768,\n  n_heads=12, n_layers=12\n  vocab=50257 (BPE)\n  context: 1024 tokens")
    els.append(arrow("a_core_gpt", 260, 155, [[0, 0], [70, 0]], C["ai_stroke"], "pytorch", "gpt"))

    # Section: PPO
    els += section_boundary("sec_ppo", 630, 95, 300, 300, "PPO RL AGENT")
    els.append(rect("ppo", 650, 125, 180, 55, C["primary_fill"], C["primary_stroke"], "ppo_t"))
    els.append(text("ppo_t", 660, 130, 160, 45, "PPO Agent\nMiniGrid Env", 13, C["on_dark"], "ppo"))
    els.append(rect("gae", 650, 195, 180, 40, C["secondary_fill"], C["secondary_stroke"], "gae_t"))
    els.append(text("gae_t", 660, 200, 160, 30, "GAE + Language-cond", 11, C["on_light"], "gae"))
    els += code_block("cb_ppo", 650, 250, 260, 65, "PPO Hyperparams:\n  clip=0.2, gamma=0.99\n  GAE lambda=0.95\n  batch=64, epochs=4")
    els.append(arrow("a_core_ppo", 260, 155, [[0, 0], [70, 100], [390, 0]], C["primary_stroke"], "pytorch"))

    # Section: RAG + BPE
    els += section_boundary("sec_rag", 950, 95, 300, 300, "RAG + BPE")
    els.append(rect("rag", 970, 125, 170, 50, C["secondary_fill"], C["secondary_stroke"], "rag_t"))
    els.append(text("rag_t", 980, 130, 150, 40, "RAG + Feedback\nBM25 + Dense", 12, C["on_light"], "rag"))
    els.append(rect("bpe", 970, 195, 170, 45, C["tertiary_fill"], C["tertiary_stroke"], "bpe_t"))
    els.append(text("bpe_t", 980, 200, 150, 35, "Custom BPE\nTokenizer", 12, C["on_light"], "bpe"))
    els += code_block("cb_rag", 970, 260, 260, 65, "BPE Tokenizer:\n  From scratch, 50k vocab\n  Byte-level fallback\nDPO: pair generation pipeline")
    els.append(arrow("a_core_rag", 260, 155, [[0, 0], [70, 180], [710, 0]], C["secondary_stroke"], "pytorch"))

    return els


def nosce():
    """Convergence with entity detail: Knowledge graph schema, entity extraction, pattern types."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "Nosce — Personal Knowledge Graph Engine", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "Notes + Docs + Bookmarks + Conversations  →  NLP Entity Extraction  →  Graph Construction  →  Pattern Discovery  →  Insights")

    # Section: Sources
    els += section_boundary("sec_src", 40, 95, 250, 310, "DATA SOURCES")
    sources = [
        ("Notes & Docs", C["start_fill"], C["start_stroke"]),
        ("Bookmarks", C["start_fill"], C["start_stroke"]),
        ("Highlights", C["start_fill"], C["start_stroke"]),
        ("Conversations", C["start_fill"], C["start_stroke"]),
    ]
    for i, (name, fill, stroke) in enumerate(sources):
        sy = 125 + i * 55
        sid = f"src_{i}"
        stid = f"src_t_{i}"
        els.append(rect(sid, 60, sy, 160, 40, fill, stroke, stid))
        els.append(text(stid, 70, sy + 5, 140, 30, name, 12, C["on_light"], sid))
    els += code_block("cb_src", 60, 350, 210, 40, "Input: markdown, HTML,\nJSON, plain text")

    # Section: NLP
    els += section_boundary("sec_nlp", 310, 95, 280, 310, "NLP PROCESSING")
    els.append(rect("ner", 330, 130, 180, 55, C["ai_fill"], C["ai_stroke"], "ner_t"))
    els.append(text("ner_t", 340, 135, 160, 45, "Entity\nExtraction", 14, C["on_light"], "ner"))
    els.append(rect("rel", 330, 205, 180, 45, C["ai_fill"], C["ai_stroke"], "rel_t"))
    els.append(text("rel_t", 340, 210, 160, 35, "Relation\nMapping", 12, C["on_light"], "rel"))
    els += code_block("cb_nlp", 330, 265, 240, 65, "Entities: Person, Concept,\n  Tool, Project, Topic\nRelations: uses, related_to,\n  created_by, part_of")
    for i in range(4):
        sy = 125 + i * 55 + 20
        els.append(arrow(f"a_src_{i}", 220, sy, [[0, 0], [110, 157 - sy + 125]], C["ai_stroke"], f"src_{i}", "ner"))
    els.append(arrow("a_ner_rel", 420, 185, [[0, 0], [0, 20]], C["ai_stroke"], "ner", "rel"))

    # Section: Graph
    els += section_boundary("sec_graph", 610, 95, 280, 310, "KNOWLEDGE GRAPH")
    els.append(rect("kg", 630, 130, 180, 55, C["primary_fill"], C["primary_stroke"], "kg_t"))
    els.append(text("kg_t", 640, 135, 160, 45, "Graph\nConstruction", 14, C["on_dark"], "kg"))
    els.append(rect("store", 630, 205, 180, 45, C["primary_fill"], C["primary_stroke"], "store_t"))
    els.append(text("store_t", 640, 210, 160, 35, "Neo4j /\nGraph Store", 12, C["on_dark"], "store"))
    els += code_block("cb_graph", 630, 265, 240, 65, "Schema:\n  Node: {id, type, name,\n    embedding, metadata}\n  Edge: {type, weight, ctx}")
    els.append(arrow("a_rel_kg", 510, 227, [[0, 0], [120, -70]], C["primary_stroke"], "rel", "kg"))
    els.append(arrow("a_kg_store", 720, 185, [[0, 0], [0, 20]], C["primary_stroke"], "kg", "store"))

    # Section: Insights
    els += section_boundary("sec_ins", 910, 95, 280, 310, "PATTERN DISCOVERY")
    els.append(rect("pattern", 930, 130, 180, 55, C["end_fill"], C["end_stroke"], "pat_t"))
    els.append(text("pat_t", 940, 135, 160, 45, "Pattern\nDetection", 14, C["on_light"], "pattern"))
    els.append(rect("insights", 930, 205, 180, 50, C["end_fill"], C["end_stroke"], "ins_t"))
    els.append(text("ins_t", 940, 210, 160, 40, "Insights &\nConnections", 13, C["on_light"], "insights"))
    els += code_block("cb_ins", 930, 275, 240, 55, "Patterns: clusters,\n  bridges, recurring themes\nOutput: graph viz + timeline")
    els.append(arrow("a_store_pat", 810, 227, [[0, 0], [120, -70]], C["end_stroke"], "store", "pattern"))
    els.append(arrow("a_pat_ins", 1020, 185, [[0, 0], [0, 20]], C["end_stroke"], "pattern", "insights"))

    return els


def tech_deep_dive():
    """Tree with category breakdowns: MDX config, category counts, search config."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "Tech Deep Dive — Interactive Knowledge Base", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "MDX Content (54 articles)  →  Next.js 15 SSG  →  6 Category Trees  →  Prism.js Syntax  →  Full-Text Search  →  Interactive Playground")

    # Section: Content Engine
    els += section_boundary("sec_engine", 40, 95, 300, 300, "CONTENT ENGINE")
    els.append(rect("mdx", 60, 125, 180, 55, C["primary_fill"], C["primary_stroke"], "mdx_t"))
    els.append(text("mdx_t", 70, 130, 160, 45, "MDX Engine\nNext.js 15", 14, C["on_dark"], "mdx"))
    els.append(rect("prism", 60, 200, 180, 40, C["secondary_fill"], C["secondary_stroke"], "prism_t"))
    els.append(text("prism_t", 70, 205, 160, 30, "Prism.js Syntax", 12, C["on_light"], "prism"))
    els += code_block("cb_engine", 60, 255, 260, 65, "MDX Config:\n  rehypePlugins: [highlight]\n  remarkPlugins: [gfm, math]\n  Static paths: 54 articles\n  ISR: revalidate 3600")

    # Section: Categories (tree)
    els += section_boundary("sec_cat", 360, 95, 520, 300, "6 CATEGORIES — 54 DEEP-DIVES")
    categories = [
        ("Systems", "12 articles", C["primary_fill"], C["primary_stroke"]),
        ("ML / AI", "10 articles", C["ai_fill"], C["ai_stroke"]),
        ("Web", "9 articles", C["secondary_fill"], C["secondary_stroke"]),
        ("Data", "8 articles", C["tertiary_fill"], C["tertiary_stroke"]),
        ("Infrastructure", "8 articles", C["start_fill"], C["start_stroke"]),
        ("Security", "7 articles", C["error_fill"], C["error_stroke"]),
    ]
    for i, (name, count, fill, stroke) in enumerate(categories):
        col = i % 3
        row = i // 3
        cx = 385 + col * 165
        cy = 125 + row * 100
        cid = f"cat_{i}"
        ctid = f"cat_t_{i}"
        cdid = f"cat_d_{i}"
        els.append(rect(cid, cx, cy, 145, 40, fill, stroke, ctid))
        els.append(text(ctid, cx + 5, cy + 4, 135, 32, name, 12, C["on_light"] if i != 1 else C["on_light"], cid))
        els.append(text(cdid, cx, cy + 44, 145, 18, count, 10, C["body_color"], align="center"))
        els.append(arrow(f"a_cat_{i}", 240, 152, [[0, 0], [cx - 240, cy + 20 - 152]], C["primary_stroke"], "mdx"))

    els += code_block("cb_cat", 385, 345, 300, 35, "Topics: OS, networking, transformers, React, SQL, Docker, OWASP...")

    # Section: Search + Output
    els += section_boundary("sec_search", 900, 95, 280, 300, "SEARCH + INTERACTION")
    els.append(rect("search", 920, 125, 180, 50, C["end_fill"], C["end_stroke"], "search_t"))
    els.append(text("search_t", 930, 130, 160, 40, "Full-Text\nSearch", 13, C["on_light"], "search"))
    els.append(rect("play", 920, 195, 180, 50, C["end_fill"], C["end_stroke"], "play_t"))
    els.append(text("play_t", 930, 200, 160, 40, "Interactive\nPlayground", 13, C["on_light"], "play"))
    els += code_block("cb_search", 920, 265, 240, 55, "Search: Fuse.js client-side\nIndex: title + content + tags\nPlayground: sandpack embeds")

    return els


def claude_dashboard():
    """Event stream pipeline: WebSocket event schema, Canvas node types, hook API."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "Claude Dashboard — Real-Time Observability Platform", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "Claude Code Events  →  Hook System  →  WebSocket Stream  →  Event Processing  →  3D Canvas + Timeline  →  Cost Analytics")

    # Section: Source
    els += section_boundary("sec_src", 40, 95, 240, 310, "EVENT SOURCE")
    els.append(rect("claude", 60, 125, 180, 55, C["ai_fill"], C["ai_stroke"], "claude_t"))
    els.append(text("claude_t", 70, 130, 160, 45, "Claude Code\nProcess", 14, C["on_light"], "claude"))
    els.append(rect("hooks", 60, 200, 180, 45, C["ai_fill"], C["ai_stroke"], "hooks_t"))
    els.append(text("hooks_t", 70, 205, 160, 35, "Hook System\nExtensible", 12, C["on_light"], "hooks"))
    els += code_block("cb_src", 60, 260, 200, 65, "Hook API:\n  PreToolUse\n  PostToolUse\n  Notification\n  SessionStart/Stop")
    els.append(arrow("a_cl_hook", 150, 180, [[0, 0], [0, 20]], C["ai_stroke"], "claude", "hooks"))

    # Section: Transport
    els += section_boundary("sec_ws", 300, 95, 260, 310, "TRANSPORT")
    els.append(rect("ws", 320, 130, 180, 55, C["primary_fill"], C["primary_stroke"], "ws_t"))
    els.append(text("ws_t", 330, 135, 160, 45, "WebSocket\nBidirectional", 13, C["on_dark"], "ws"))
    els += code_block("cb_ws", 320, 205, 220, 80, "WebSocket Event:\n{ type: \"tool_use\",\n  tool: \"Edit\",\n  file: \"src/app.tsx\",\n  timestamp: 1709312400,\n  tokens: { in: 340, out: 89 }\n}")
    els.append(arrow("a_hook_ws", 240, 222, [[0, 0], [80, -60]], C["primary_stroke"], "hooks", "ws"))

    # Section: Processing
    els += section_boundary("sec_proc", 580, 95, 260, 310, "PROCESSING")
    els.append(rect("proc", 600, 130, 180, 50, C["secondary_fill"], C["secondary_stroke"], "proc_t"))
    els.append(text("proc_t", 610, 135, 160, 40, "Event\nProcessor", 13, C["on_light"], "proc"))
    els.append(rect("store", 600, 200, 180, 45, C["secondary_fill"], C["secondary_stroke"], "store_t"))
    els.append(text("store_t", 610, 205, 160, 35, "Session\nStore", 12, C["on_light"], "store"))
    els += code_block("cb_proc", 600, 260, 220, 60, "Tracks: tool calls,\n  file edits, token usage,\n  cost per session,\n  error rates")
    els.append(arrow("a_ws_proc", 500, 157, [[0, 0], [100, 0]], C["primary_stroke"], "ws", "proc"))
    els.append(arrow("a_proc_store", 690, 180, [[0, 0], [0, 20]], C["secondary_stroke"], "proc", "store"))

    # Section: Visualization
    els += section_boundary("sec_viz", 860, 95, 280, 310, "VISUALIZATION")
    els.append(rect("canvas", 880, 125, 170, 50, C["end_fill"], C["end_stroke"], "canvas_t"))
    els.append(text("canvas_t", 890, 130, 150, 40, "3D Canvas\nSession Graph", 13, C["on_light"], "canvas"))
    els.append(rect("timeline", 880, 195, 170, 45, C["end_fill"], C["end_stroke"], "timeline_t"))
    els.append(text("timeline_t", 890, 200, 150, 35, "Timeline +\nCost Tracking", 12, C["on_light"], "timeline"))
    els += code_block("cb_viz", 880, 260, 240, 65, "Canvas Nodes:\n  FileNode, ToolNode,\n  ErrorNode, SessionNode\nRendering: Three.js / React")
    els.append(arrow("a_store_viz", 780, 222, [[0, 0], [100, -70]], C["end_stroke"], "store", "canvas"))

    # Section: Analytics
    els += section_boundary("sec_analytics", 1160, 95, 200, 310, "ANALYTICS")
    els.append(rect("cost", 1180, 125, 160, 50, C["decision_fill"], C["decision_stroke"], "cost_t"))
    els.append(text("cost_t", 1190, 130, 140, 40, "Token &\nCost Analytics", 12, C["on_light"], "cost"))
    els.append(rect("export", 1180, 195, 160, 45, C["decision_fill"], C["decision_stroke"], "export_t"))
    els.append(text("export_t", 1190, 200, 140, 35, "Export &\nReports", 12, C["on_light"], "export"))
    els.append(arrow("a_viz_cost", 1050, 150, [[0, 0], [130, 0]], C["decision_stroke"], "canvas", "cost"))

    return els


def claude_pilot():
    """Cycle with safety checkpoints: MCP tool schema, git checkpoint format, workflow config."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "Claude Pilot — Autonomous IDE Agent with Safety Net", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "Task Input  →  Multi-Step Planning  →  MCP Tool Execution  →  Safety Checkpoints  →  Git Verify  →  100% Reversible Output")

    # Section: Planning
    els += section_boundary("sec_plan", 40, 95, 260, 310, "PLANNING")
    els.append(rect("task", 60, 125, 180, 50, C["start_fill"], C["start_stroke"], "task_t"))
    els.append(text("task_t", 70, 130, 160, 40, "Task Input\nMulti-Step", 13, C["on_light"], "task"))
    els.append(rect("plan", 60, 195, 180, 50, C["start_fill"], C["start_stroke"], "plan_t"))
    els.append(text("plan_t", 70, 200, 160, 40, "Plan\nDecomposition", 13, C["on_light"], "plan"))
    els += code_block("cb_plan", 60, 260, 220, 65, "Workflow Config:\n  max_steps: 20\n  checkpoint_interval: 3\n  dry_run_first: true\n  auto_rollback: true")
    els.append(arrow("a_task_plan", 150, 175, [[0, 0], [0, 20]], C["start_stroke"], "task", "plan"))

    # Section: MCP Tools
    els += section_boundary("sec_mcp", 320, 95, 320, 310, "MCP TOOL INTEGRATION")
    els.append(rect("mcp", 340, 130, 190, 55, C["ai_fill"], C["ai_stroke"], "mcp_t"))
    els.append(text("mcp_t", 350, 135, 170, 45, "MCP Server\nTool Router", 14, C["on_light"], "mcp"))
    tools = [
        ("File System", C["primary_fill"], C["primary_stroke"]),
        ("Git Operations", C["secondary_fill"], C["secondary_stroke"]),
        ("Database", C["tertiary_fill"], C["tertiary_stroke"]),
        ("Terminal", C["start_fill"], C["start_stroke"]),
    ]
    for i, (name, fill, stroke) in enumerate(tools):
        ty = 205 + i * 40
        tid_r = f"tool_{i}"
        tid_t = f"tool_t_{i}"
        els.append(rect(tid_r, 345, ty, 130, 30, fill, stroke, tid_t))
        els.append(text(tid_t, 355, ty + 3, 110, 24, name, 11, C["on_light"], tid_r))
    els += code_block("cb_mcp", 495, 205, 130, 100, "MCP Schema:\n  tool: string\n  input: JSON\n  timeout: 30s\n  sandbox: true")
    els.append(arrow("a_plan_mcp", 240, 220, [[0, 0], [100, -63]], C["ai_stroke"], "plan", "mcp"))
    els.append(arrow("a_mcp_tools", 435, 185, [[0, 0], [0, 20]], C["ai_stroke"], "mcp"))

    # Section: Safety
    els += section_boundary("sec_safe", 660, 95, 280, 310, "SAFETY LAYER")
    els.append(rect("dry", 680, 125, 170, 50, C["decision_fill"], C["decision_stroke"], "dry_t"))
    els.append(text("dry_t", 690, 130, 150, 40, "Dry-Run\nValidation", 13, C["on_light"], "dry"))
    els.append(rect("git_cp", 680, 195, 170, 50, C["decision_fill"], C["decision_stroke"], "git_cp_t"))
    els.append(text("git_cp_t", 690, 200, 150, 40, "Git\nCheckpoint", 13, C["on_light"], "git_cp"))
    els += code_block("cb_safe", 680, 265, 240, 60, "Checkpoint Format:\n  branch: pilot/cp-{n}\n  stash: auto-created\n  rollback: git reset --soft\n  verify: diff review")
    els.append(arrow("a_mcp_dry", 530, 157, [[0, 0], [150, 0]], C["ai_stroke"], "mcp", "dry"))
    els.append(arrow("a_dry_git", 765, 175, [[0, 0], [0, 20]], C["decision_stroke"], "dry", "git_cp"))

    # Section: Output
    els += section_boundary("sec_out", 960, 95, 260, 310, "VERIFIED OUTPUT")
    els.append(rect("verify", 980, 125, 180, 55, C["end_fill"], C["end_stroke"], "verify_t"))
    els.append(text("verify_t", 990, 130, 160, 45, "Verified\nOutput", 14, C["on_light"], "verify"))
    els.append(rect("report", 980, 200, 180, 45, C["end_fill"], C["end_stroke"], "report_t"))
    els.append(text("report_t", 990, 205, 160, 35, "Execution\nReport", 12, C["on_light"], "report"))
    els += code_block("cb_out", 980, 265, 220, 55, "Output:\n  100% reversible\n  Full audit trail\n  Diff summary + metrics")
    els.append(arrow("a_git_ver", 850, 220, [[0, 0], [130, -68]], C["end_stroke"], "git_cp", "verify"))
    els.append(arrow("a_ver_rep", 1070, 180, [[0, 0], [0, 20]], C["end_stroke"], "verify", "report"))

    return els


def animated_webgl():
    """Fan-out with shader detail: GLSL shader snippet, particle config, audio FFT."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "Animated WebGL Library — 86+ GPU Visual Scenes", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "Three.js Core + WebGL 2.0 + GLSL Shaders  →  Particles | Fractals | Audio-Reactive | Custom Shaders  →  60fps GPU-accelerated")

    # Section: Core
    els += section_boundary("sec_core", 40, 95, 280, 310, "RENDERING CORE")
    els.append(rect("three", 60, 125, 200, 60, C["primary_fill"], C["primary_stroke"], "three_t"))
    els.append(text("three_t", 70, 130, 180, 50, "Three.js Core\nWebGL 2.0", 14, C["on_dark"], "three"))
    els.append(rect("glsl", 60, 205, 200, 45, C["secondary_fill"], C["secondary_stroke"], "glsl_t"))
    els.append(text("glsl_t", 70, 210, 180, 35, "GLSL Pipeline\nVertex + Fragment", 12, C["on_light"], "glsl"))
    els += code_block("cb_core", 60, 265, 240, 65, "// Vertex shader\nuniform float uTime;\nvoid main() {\n  vec3 p = position;\n  p.y += sin(p.x + uTime);\n}")

    # Section: Particles
    els += section_boundary("sec_part", 340, 95, 280, 310, "PARTICLE SYSTEMS")
    els.append(rect("part", 360, 125, 180, 50, C["ai_fill"], C["ai_stroke"], "part_t"))
    els.append(text("part_t", 370, 130, 160, 40, "GPU Instanced\nParticles", 13, C["on_light"], "part"))
    els.append(rect("emit", 360, 195, 180, 40, C["ai_fill"], C["ai_stroke"], "emit_t"))
    els.append(text("emit_t", 370, 200, 160, 30, "Emitter System", 11, C["on_light"], "emit"))
    els += code_block("cb_part", 360, 250, 240, 65, "Particle Config:\n  count: 1M+ instances\n  update: GPU compute\n  render: instanced mesh\n  fps: 60 @ 1080p")
    els.append(arrow("a_core_part", 260, 155, [[0, 0], [100, 0]], C["primary_stroke"], "three", "part"))

    # Section: Fractals
    els += section_boundary("sec_frac", 640, 95, 260, 310, "FRACTAL GENERATORS")
    els.append(rect("mandel", 660, 125, 170, 50, C["decision_fill"], C["decision_stroke"], "mandel_t"))
    els.append(text("mandel_t", 670, 130, 150, 40, "Mandelbrot\n/ Julia", 13, C["on_light"], "mandel"))
    els.append(rect("zoom", 660, 195, 170, 40, C["decision_fill"], C["decision_stroke"], "zoom_t"))
    els.append(text("zoom_t", 670, 200, 150, 30, "Infinite Zoom", 11, C["on_light"], "zoom"))
    els += code_block("cb_frac", 660, 250, 220, 55, "z = z^2 + c\nIterations: 500-2000\nDouble precision emulation")
    els.append(arrow("a_core_frac", 260, 155, [[0, 0], [100, 60], [400, 0]], C["decision_stroke"], "three"))

    # Section: Audio
    els += section_boundary("sec_audio", 920, 95, 260, 310, "AUDIO-REACTIVE")
    els.append(rect("audio", 940, 125, 170, 50, C["secondary_fill"], C["secondary_stroke"], "audio_t"))
    els.append(text("audio_t", 950, 130, 150, 40, "Web Audio\nAPI", 13, C["on_light"], "audio"))
    els.append(rect("fft", 940, 195, 170, 40, C["secondary_fill"], C["secondary_stroke"], "fft_t"))
    els.append(text("fft_t", 950, 200, 150, 30, "FFT Analysis", 11, C["on_light"], "fft"))
    els += code_block("cb_audio", 940, 250, 220, 65, "Audio FFT Config:\n  fftSize: 2048\n  smoothing: 0.8\n  freq → uniform float\n  Bands: bass/mid/treble")
    els.append(arrow("a_core_audio", 260, 155, [[0, 0], [100, 120], [680, 0]], C["secondary_stroke"], "three"))

    # Section: Shaders
    els += section_boundary("sec_shaders", 1200, 95, 250, 310, "CUSTOM SHADERS")
    els.append(rect("noise", 1220, 125, 160, 40, C["tertiary_fill"], C["tertiary_stroke"], "noise_t"))
    els.append(text("noise_t", 1230, 128, 140, 34, "Noise & SDF", 12, C["on_light"], "noise"))
    els.append(rect("ray", 1220, 180, 160, 40, C["tertiary_fill"], C["tertiary_stroke"], "ray_t"))
    els.append(text("ray_t", 1230, 183, 140, 34, "Ray Marching", 12, C["on_light"], "ray"))
    els.append(rect("post", 1220, 235, 160, 40, C["tertiary_fill"], C["tertiary_stroke"], "post_t"))
    els.append(text("post_t", 1230, 238, 140, 34, "Post Processing", 12, C["on_light"], "post"))
    els += code_block("cb_shaders", 1220, 290, 210, 40, "Effects: bloom, DOF,\nchromatic aberration")

    return els


def mole_world():
    """Convergence to 3D viz: Supabase schema, Three.js scene config, pipeline stages."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "Mole World Dashboard — AI Film Production Analytics", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "216 Claude Sessions  →  12-Stage Film Pipeline  →  Supabase Realtime  →  Data Processing  →  3D Globe + Timeline  →  Analytics")

    # Section: Data Sources
    els += section_boundary("sec_src", 40, 95, 280, 310, "DATA SOURCES")
    els.append(rect("sessions", 60, 125, 180, 50, C["ai_fill"], C["ai_stroke"], "sess_t"))
    els.append(text("sess_t", 70, 130, 160, 40, "216 Claude\nSessions", 13, C["on_light"], "sessions"))
    els.append(rect("pipeline", 60, 195, 180, 45, C["primary_fill"], C["primary_stroke"], "pipe_t"))
    els.append(text("pipe_t", 70, 200, 160, 35, "Film Pipeline\n12 Stages", 12, C["on_dark"], "pipeline"))
    els.append(rect("assets", 60, 260, 180, 40, C["secondary_fill"], C["secondary_stroke"], "assets_t"))
    els.append(text("assets_t", 70, 265, 160, 30, "Asset Tracker", 11, C["on_light"], "assets"))
    els += code_block("cb_src", 60, 315, 240, 45, "Pipeline: concept → script →\n  storyboard → ... → final cut")

    # Section: Supabase
    els += section_boundary("sec_supa", 340, 95, 280, 310, "SUPABASE BACKEND")
    els.append(rect("supa", 360, 130, 190, 55, C["start_fill"], C["start_stroke"], "supa_t"))
    els.append(text("supa_t", 370, 135, 170, 45, "Supabase\nRealtime", 14, C["on_light"], "supa"))
    els.append(rect("rls", 360, 205, 190, 40, C["start_fill"], C["start_stroke"], "rls_t"))
    els.append(text("rls_t", 370, 210, 170, 30, "RLS + Auth", 11, C["on_light"], "rls"))
    els += code_block("cb_supa", 360, 260, 240, 70, "Supabase Schema:\n  sessions: {id, tokens,\n    cost, tools_used[]}\n  pipeline_stages: {id,\n    status, progress, assets}")
    for i in range(3):
        sy = [150, 217, 280][i]
        els.append(arrow(f"a_src_{i}", 240, sy, [[0, 0], [120, 157 - sy + 40]], C["start_stroke"]))

    # Section: Processing
    els += section_boundary("sec_proc", 640, 95, 260, 310, "DATA PROCESSING")
    els.append(rect("agg", 660, 130, 180, 50, C["secondary_fill"], C["secondary_stroke"], "agg_t"))
    els.append(text("agg_t", 670, 135, 160, 40, "Aggregation\nEngine", 13, C["on_light"], "agg"))
    els.append(rect("geo", 660, 200, 180, 45, C["secondary_fill"], C["secondary_stroke"], "geo_t"))
    els.append(text("geo_t", 670, 205, 160, 35, "Geo-mapping\nSession → Location", 11, C["on_light"], "geo"))
    els += code_block("cb_proc", 660, 265, 220, 55, "Aggregates: cost/session,\n  tokens/stage, completion%,\n  asset coverage")
    els.append(arrow("a_supa_agg", 550, 157, [[0, 0], [110, 0]], C["start_stroke"], "supa", "agg"))

    # Section: Visualization
    els += section_boundary("sec_viz", 920, 95, 280, 310, "3D VISUALIZATION")
    els.append(rect("globe", 940, 125, 180, 55, C["end_fill"], C["end_stroke"], "globe_t"))
    els.append(text("globe_t", 950, 130, 160, 45, "3D Globe\nThree.js", 14, C["on_light"], "globe"))
    els.append(rect("tl", 940, 200, 180, 45, C["end_fill"], C["end_stroke"], "tl_t"))
    els.append(text("tl_t", 950, 205, 160, 35, "Timeline\nVisualization", 12, C["on_light"], "tl"))
    els += code_block("cb_viz", 940, 265, 240, 60, "Three.js Scene Config:\n  globe: OrbitControls\n  points: InstancedMesh\n  connections: LineSegments\n  animation: requestAnimFrame")
    els.append(arrow("a_proc_viz", 840, 155, [[0, 0], [100, 0]], C["secondary_stroke"], "agg", "globe"))
    els.append(arrow("a_proc_tl", 840, 222, [[0, 0], [100, 0]], C["secondary_stroke"], "geo", "tl"))

    return els


def context_academy():
    """Tree with academy breakdown: Module schema, exercise types, progress tracking."""
    els = []

    els.append(text("title", 50, 15, 1500, 35, "Context Engineering Academy — 6 Interactive Academies", 26, C["title_color"], align="left"))
    els += summary_bar("sum", 50, 55, 1500, 28, "Next.js 15 + MDX + Sandpack  →  6 Academy Tracks  →  70+ Modules  →  Code Sandboxes  →  Progress Tracking  →  Supabase Auth")

    # Section: Platform
    els += section_boundary("sec_plat", 40, 95, 260, 310, "PLATFORM CORE")
    els.append(rect("next", 60, 125, 200, 55, C["primary_fill"], C["primary_stroke"], "next_t"))
    els.append(text("next_t", 70, 130, 180, 45, "Next.js 15\nApp Router", 14, C["on_dark"], "next"))
    els.append(rect("mdx", 60, 200, 200, 40, C["secondary_fill"], C["secondary_stroke"], "mdx_t"))
    els.append(text("mdx_t", 70, 205, 180, 30, "MDX + Sandpack", 12, C["on_light"], "mdx"))
    els += code_block("cb_plat", 60, 260, 220, 65, "Module Schema:\n  { id, title, track,\n    difficulty: 1-5,\n    exercises: Exercise[],\n    prerequisites: string[] }")

    # Section: Academies (tree — 2x3 grid)
    els += section_boundary("sec_acad", 320, 95, 520, 310, "6 ACADEMY TRACKS — 70+ MODULES")
    academies = [
        ("Foundation", "Core concepts", C["start_fill"], C["start_stroke"]),
        ("Retrieval", "RAG patterns", C["primary_fill"], C["primary_stroke"]),
        ("Memory", "Persistence", C["ai_fill"], C["ai_stroke"]),
        ("Tools", "Function calling", C["secondary_fill"], C["secondary_stroke"]),
        ("Orchestration", "Multi-agent", C["decision_fill"], C["decision_stroke"]),
        ("Evaluation", "Quality scoring", C["end_fill"], C["end_stroke"]),
    ]
    for i, (name, desc, fill, stroke) in enumerate(academies):
        col = i % 3
        row = i // 3
        ax = 345 + col * 165
        ay = 125 + row * 100
        aid = f"acad_{i}"
        atid = f"acad_t_{i}"
        adid = f"acad_d_{i}"
        els.append(rect(aid, ax, ay, 145, 40, fill, stroke, atid))
        els.append(text(atid, ax + 5, ay + 4, 135, 32, name, 12, C["on_light"], aid))
        els.append(text(adid, ax, ay + 44, 145, 18, desc, 10, C["body_color"], align="center"))
        els.append(arrow(f"a_acad_{i}", 260, 152, [[0, 0], [ax - 260, ay + 20 - 152]], C["primary_stroke"], "next"))

    els += code_block("cb_acad", 345, 340, 320, 45, "Exercise Types: code-sandbox, quiz, drag-drop, diagram-builder")

    # Section: Progress + Auth
    els += section_boundary("sec_prog", 860, 95, 280, 310, "PROGRESS + AUTH")
    els.append(rect("supa", 880, 125, 180, 50, C["end_fill"], C["end_stroke"], "supa_t"))
    els.append(text("supa_t", 890, 130, 160, 40, "Supabase\nAuth + DB", 13, C["on_light"], "supa"))
    els.append(rect("progress", 880, 195, 180, 50, C["end_fill"], C["end_stroke"], "prog_t"))
    els.append(text("prog_t", 890, 200, 160, 40, "Progress\nTracking", 13, C["on_light"], "progress"))
    els += code_block("cb_prog", 880, 265, 240, 55, "Progress:\n  { user, module, status,\n    score, completedAt,\n    exercises_passed: 12/15 }")
    els.append(arrow("a_supa_prog", 970, 175, [[0, 0], [0, 20]], C["end_stroke"], "supa", "progress"))

    return els


# ============ PROJECT REGISTRY ============

PROJECTS = {
    "enterprise-playground": enterprise_playground,
    "agenthire": agenthire,
    "llm-gateway": llm_gateway,
    "rag-eval-engine": rag_eval_engine,
    "ml-portfolio": ml_portfolio,
    "nosce": nosce,
    "tech-deep-dive": tech_deep_dive,
    "claude-dashboard": claude_dashboard,
    "claude-pilot": claude_pilot,
    "animated-webgl-library": animated_webgl,
    "mole-world-dashboard": mole_world,
    "context-engineering-academy": context_academy,
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
    count = len([e for e in elements if not isinstance(e, list)])
    print(f"Generated: {slug}.excalidraw ({count} elements)")

print(f"\nAll {len(PROJECTS)} diagrams generated in {output_dir}")
