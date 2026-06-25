"use client";

import {
  Workflow,
  ShieldCheck,
  Quote,
  CheckCircle2,
  Gauge,
  Activity,
} from "lucide-react";
import { ProjectLayout } from "../../components/project-layout";
import type { ProjectData } from "../../components/project-layout";

const project: ProjectData = {
  slug: "meridian",
  name: "Meridian",
  tagline:
    "A fully zoneless, signals-first agentic banking-policy copilot in Angular 21 — the BMO “Lumi” pattern, rebuilt with verifiable citations, governed retrieval, and a hash-chained audit trail.",
  accentClass: "accent-blue",
  accentColor: "#4d9fff",
  narrative: {
    hook: "In regulated banking, a copilot that can't show its work is a liability, not an asset.",
    problem:
      "Banking copilots fail the moment they leave the demo. A confident answer with no provenance is unusable when compliance asks 'where did this come from?'. Retrieval runs unscoped across data the user was never permitted to see. Approvals happen in someone's head with no record, and there is no immutable trail to reconstruct what the system did or why. Layer on FAPI 2.0 token requirements and the bar for a production-grade financial assistant is far above 'wire up a chat box to an LLM'.",
    approach:
      "Meridian implements a disciplined agentic RAG loop in Angular 21 — plan, retrieve, grade, call MCP tools, stream, enforce guardrails, pause for human-in-the-loop approval, then commit to a hash-chained audit log. The entire app is zoneless and signals-first: change detection is driven by signal / computed / effect with no zone.js anywhere. Every claim carries verifiable citations — click a source and a drawer opens with the exact grounded span highlighted. Retrieval scope is permission-gated via toggles, rejections demand a reason that flows straight to the audit trail, and inline eval meters plus cost and latency transparency keep the operator in control. Security is functional and FAPI 2.0-grade: a DPoP HTTP interceptor binds sender-constrained tokens, with OAuth2 + PKCE + PAR behind a BFF and functional route and scope guards.",
    insight:
      "The hard part of an agentic copilot in finance isn't the model — it's the seam around it. By keeping every piece of state on a signal surface, the mock engine can be swapped for Azure OpenAI plus a vector store without touching a single component. Governance, provenance, and permission aren't features bolted on after the fact; they're the architecture. That's the difference between a chat demo and something a bank can actually run.",
  },
  features: [
    {
      icon: <Workflow size={20} />,
      title: "Agentic RAG Loop",
      description:
        "Plan → retrieve → grade → MCP tools → stream → guardrails → human approval → audit. A disciplined, inspectable pipeline rather than a single opaque call to a model.",
    },
    {
      icon: <Quote size={20} />,
      title: "Verifiable Citations",
      description:
        "Every grounded claim links to its source. Click a citation and a drawer opens with the exact span highlighted in context — provenance you can actually verify, not trust on faith.",
    },
    {
      icon: <CheckCircle2 size={20} />,
      title: "Human-in-the-Loop Approval",
      description:
        "The agent pauses for operator sign-off. Reject-with-reason captures the rationale and writes it straight to the hash-chained audit log, so every decision is reconstructable.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "FAPI 2.0 Security",
      description:
        "A functional DPoP HTTP interceptor binds sender-constrained tokens, with OAuth2 + PKCE + PAR behind a BFF and functional route and scope guards enforcing permission boundaries.",
    },
    {
      icon: <Gauge size={20} />,
      title: "Governed Retrieval Scope",
      description:
        "Permission-gated scope toggles ensure retrieval only ever touches data the user is allowed to see. Inline eval meters surface grounding quality before an answer is trusted.",
    },
    {
      icon: <Activity size={20} />,
      title: "Cost & Latency Transparency",
      description:
        "Live cost and latency readouts plus a BMO-themed light/dark interface keep the operator informed at every step — no hidden spend, no silent slowdowns.",
    },
  ],
  metrics: [
    { value: "Angular 21", label: "Framework" },
    { value: "0", label: "zone.js" },
    { value: "FAPI 2.0", label: "Security" },
    { value: "100%", label: "Signals-Driven" },
  ],
  techStack: [
    "Angular 21",
    "Signals (signal/computed/effect)",
    "Signal input()",
    "Zoneless Change Detection",
    "RxJS",
    "OnPush",
    "DPoP / FAPI 2.0",
    "OAuth2 + PKCE + PAR",
    "BFF",
    "MCP Tools",
    "SCSS",
  ],
  githubUrl: "https://github.com/aptsalt/meridian",
  liveUrl: "https://aptsalt.github.io/meridian/",
};

export default function MeridianPage() {
  return <ProjectLayout project={project} />;
}
