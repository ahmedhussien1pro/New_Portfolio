"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Shield,
  Server,
  Layers,
  Code2,
  CheckCircle2,
  Terminal,
  Images,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES, ProjectCaseStudy } from "@/lib/data";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

interface ProjectsTeaserProps {
  projects?: ProjectCaseStudy[];
}

export function ProjectsTeaser({ projects = CASE_STUDIES }: ProjectsTeaserProps) {
  const activeProjects = projects.filter((p) => p.published !== false);
  const featuredIds = ["cyberlabs", "admin-dashboard", "fresh-cart", "vs-code-clone", "eduko", "gigaland-nft"];
  const featuredProjects = activeProjects.filter((p) => featuredIds.includes(p.id)).length > 0
    ? activeProjects.filter((p) => featuredIds.includes(p.id))
    : activeProjects.slice(0, 6);

  const [activeTab, setActiveTab] = useState(featuredProjects[0]?.id || activeProjects[0]?.id || "cyberlabs");
  const study = activeProjects.find((s) => s.id === activeTab) || activeProjects[0];

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60 dark:border-zinc-800/60">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-300">
          <Server className="h-3.5 w-3.5 text-emerald-500" />
          <span>Case Studies Spotlight</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Architectural Case Studies
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
          Deep technical breakdowns of production systems, decoupled microservices, and performance engineering.
        </p>

        {/* Featured Case Study Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {featuredProjects.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeTab === item.id
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-sm"
                  : "border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-white/40 dark:bg-zinc-900/40"
              }`}
            >
              {item.title.split(" ")[0]} &bull; {item.category}
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={study.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-sm"
        >
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                <span>{study.category}</span>
                <span className="text-zinc-400">&bull;</span>
                <span>Case Study #{study.id}</span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {study.title}
              </h3>
              <p className="text-sm text-zinc-500 font-medium mt-0.5">
                {study.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {study.githubUrl && (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>Repository</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Overview, Problem & Architectural Layers */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                  System Overview
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {study.overview}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                  The Problem Solved
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-950/60 p-3.5 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                  {study.problem}
                </p>
              </div>

              {/* Concrete Architecture Layers */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                  Architectural Layers Implemented
                </h4>
                <div className="space-y-1.5">
                  {study.architectureLayers.map((layer) => (
                    <div
                      key={layer}
                      className="flex items-center gap-2 text-xs font-mono text-zinc-800 dark:text-zinc-200"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{layer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Read Full Case Study Button */}
              <div className="pt-2">
                <Link href={`/projects/${study.id}`}>
                  <Button variant="accent" size="default" className="gap-2 text-xs font-semibold">
                    Read Complete Architectural Spec & Code
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Interactive Flow Diagram */}
            <div className="lg:col-span-6">
              <ArchitectureDiagram projectId={study.id} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer link to full catalog */}
      <div className="mt-8 flex justify-center">
        <Link href="/projects">
          <Button
            variant="outline"
            size="default"
            className="gap-2 text-xs font-mono border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:border-emerald-500/40 hover:text-emerald-500 transition-all cursor-pointer shadow-xs"
          >
            <span>Explore All {activeProjects.length} Projects & Microservices</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
