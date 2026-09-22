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
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES } from "@/lib/data";
import { getPortfolioStore } from "@/lib/store";
import { CodeBlock } from "@/components/code-block";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ImageGallery } from "@/components/image-gallery";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const store = getPortfolioStore();
  return store.projects.map((study) => ({
    id: study.id,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const store = getPortfolioStore();
  const study = store.projects.find((s) => s.id === id) || CASE_STUDIES.find((s) => s.id === id);

  if (!study || study.published === false) {
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
          SECTION 3: INTERACTIVE SYSTEM TOPOLOGY & PROTOCOL FLOW
          ========================================================================= */}
      <section className="space-y-4">
        <ArchitectureDiagram projectId={study.id} />
      </section>

      {/* =========================================================================
          SECTION 3.5: REPOSITORY & CODEBASE ARCHITECTURE
          ========================================================================= */}
      {study.highlightRepos && study.highlightRepos.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <GitBranch className="h-4 w-4" />
            <span>Target Repositories & Microservice Fleet</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Decoupled Codebases & Repositories
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Each microservice and client application is engineered in an isolated repository adhering to strict type safety, modular boundaries, and independent CI/CD build cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {study.highlightRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-500 transition-colors">
                        <GithubIcon className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap gap-1.5">
                  {repo.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 4: OPERATIONAL INTERFACES & PRODUCTION GALLERY
          ========================================================================= */}
      <section className="space-y-4">
        <ImageGallery screens={study.screens} title="Operational Interfaces & Production Dashboards" />
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
