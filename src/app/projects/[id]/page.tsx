import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Server,
  Cloud,
  Database,
  Layers,
  CheckCircle2,
  Code2,
  Shield,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES } from "@/lib/data";
import { CodeBlock } from "@/components/code-block";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    id: study.id,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const study = CASE_STUDIES.find((s) => s.id === id);

  if (!study) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-14">
      {/* Top Back Navigation */}
      <div>
        <Link href="/projects">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Case Studies
          </Button>
        </Link>
      </div>

      {/* =========================================================================
          SECTION 1: CASE STUDY HEADER & OVERVIEW
          ========================================================================= */}
      <section className="space-y-6 pb-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {study.category}
          </span>
          <span className="text-xs font-mono text-zinc-400">
            Case Study ID: {study.id}
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {study.title}
          </h1>
          <p className="text-lg sm:text-xl font-mono text-emerald-600 dark:text-emerald-400">
            {study.subtitle}
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
            {study.tagline}
          </p>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {study.liveUrl && (
            <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="default" className="gap-2 text-xs font-semibold cursor-pointer">
                <span>View Live Deployment</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          )}
          {study.githubUrl && (
            <a href={study.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="default" className="gap-2 text-xs font-mono border-zinc-300 dark:border-zinc-700">
                <span>View Repository</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          )}
        </div>

        {/* Concrete Architecture Layers */}
        <div className="pt-4">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Implemented Architectural Layers
          </div>
          <div className="flex flex-wrap gap-2">
            {study.architectureLayers.map((layer) => (
              <span
                key={layer}
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-xs font-mono text-zinc-800 dark:text-zinc-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {layer}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PROBLEM & SYSTEM OVERVIEW
          ========================================================================= */}
      <section className="space-y-4">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          01. Problem & Architecture Context
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Context & Engineering Challenge
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 p-5 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              System Context
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {study.overview}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-950/70 p-5 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              The Engineering Challenge
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {study.problem}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE SYSTEM TOPOLOGY & DATA FLOW
          ========================================================================= */}
      <section className="space-y-4">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          02. System Topology & Protocol Flow
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Pipeline Flow Architecture
        </h2>
        <ArchitectureDiagram flow={study.architectureFlow} />
      </section>

      {/* =========================================================================
          SECTION 4: KEY ENGINEERING DECISIONS & TRADEOFFS
          ========================================================================= */}
      <section className="space-y-4">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          03. Architectural Decisions & Tradeoffs
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Engineering Tradeoffs
        </h2>

        <div className="space-y-3">
          {study.engineeringDecisions.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 p-5 space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {item.decision}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Rationale
                  </span>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {item.rationale}
                  </p>
                </div>

                <div className="space-y-1 sm:border-l sm:border-zinc-200 sm:dark:border-zinc-800 sm:pl-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Engineered Tradeoff
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.tradeoff}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PRODUCTION CODE ARTIFACT (Rendered via Shiki)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          04. Implementation Artifact
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Production Code Implementation
          </h2>
          <p className="text-xs font-mono text-zinc-500">
            {study.codeArtifact.description}
          </p>
        </div>

        <CodeBlock
          code={study.codeArtifact.code}
          language={study.codeArtifact.language}
          filename={study.codeArtifact.filename}
        />
      </section>

      {/* Bottom Footer Actions */}
      <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="gap-2 text-xs font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> All Case Studies
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="accent" size="default" className="text-xs font-semibold">
            Contact Ahmed for Technical Inquiries &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}
