"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Building,
  Sparkles,
  CheckCircle2,
  FileDown,
  Server,
  Cloud,
  Layers,
  Terminal,
  Cpu,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCES, ExperienceRole } from "@/lib/data";

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

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceRole[]>(EXPERIENCES);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data?.experiences) {
          setExperiences(data.experiences.filter((e: any) => e.published !== false));
        }
      })
      .catch((err) => console.error("Could not sync experiences", err));
  }, []);
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Top Navigation */}
      <div className="mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Overview
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Career Milestones</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Engineering Experience
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A comprehensive chronicle of founder leadership, full-stack platform engineering, and high-concurrency cloud systems.
          </p>
        </div>

        <a href="/Ahmed_Hussien_CV.pdf" download="Ahmed_Hussien_CV.pdf">
          <Button variant="accent" size="default" className="gap-2 shrink-0">
            <FileDown className="h-4 w-4" /> Download Official Resume
          </Button>
        </a>
      </div>

      {/* Impact Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 p-4 text-center backdrop-blur-md">
          <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">15+</div>
          <div className="text-xs text-zinc-500 font-mono mt-0.5">Shipped Platforms</div>
        </div>
        <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 p-4 text-center backdrop-blur-md">
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">140+</div>
          <div className="text-xs text-zinc-500 font-mono mt-0.5">Students Mentored</div>
        </div>
        <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 p-4 text-center backdrop-blur-md">
          <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">120 hrs</div>
          <div className="text-xs text-zinc-500 font-mono mt-0.5">ITI Angular Certified</div>
        </div>
        <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 p-4 text-center backdrop-blur-md">
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">100%</div>
          <div className="text-xs text-zinc-500 font-mono mt-0.5">Client Satisfaction</div>
        </div>
      </div>

      {/* Vertical Animated Timeline */}
      <div className="mt-16 relative">
        {/* Continuous vertical timeline guide line */}
        <div
          className="absolute left-4 sm:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-500/30 to-transparent"
          aria-hidden="true"
        />

        <div className="space-y-12">
          {experiences.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-10 sm:pl-20 group"
            >
              {/* Timeline Pin Indicator */}
              <div className="absolute left-2 sm:left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 ring-4 ring-slate-50 dark:ring-zinc-950">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-lg transition-all hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.08)]">
                {/* Header Row with Company Avatar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                  <div className="flex items-center gap-3.5">
                    {item.logo && (
                      <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-200/80 dark:border-white/10 shadow-xs bg-zinc-100 dark:bg-zinc-800">
                        <Image
                          src={item.logo}
                          alt={item.company}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                        {item.type}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                        {item.role}
                      </h2>
                      <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        <Building className="h-4 w-4 text-emerald-500" />
                        <span>{item.company}</span>
                        <span className="text-zinc-400">&bull;</span>
                        <span className="text-xs text-zinc-500 font-normal">{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3.5 py-1.5 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300">
                      <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.summary}
                </p>

                {/* Main Content Grid: Responsibilities + Project Visual Showcase */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Responsibilities & Metrics */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Key Architectural Responsibilities
                      </h3>
                      <ul className="space-y-2">
                        {item.responsibilities.map((resp, rIdx) => (
                          <li
                            key={rIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                      {item.metrics.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/60 p-3 text-center"
                        >
                          <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                            {metric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Production Screenshot Mockup */}
                  {item.projectThumbnail && (
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                          Production Interface Preview
                        </div>
                        <div className="overflow-hidden rounded-xl border border-zinc-200/90 dark:border-white/10 bg-zinc-950/40 shadow-md group/thumb">
                          {/* Mini Window Chrome */}
                          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-900/80 px-3 py-1.5 text-xs font-mono">
                            <div className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-red-500/70 inline-block" />
                              <span className="h-2 w-2 rounded-full bg-yellow-500/70 inline-block" />
                              <span className="h-2 w-2 rounded-full bg-emerald-500/70 inline-block" />
                            </div>
                            <span className="text-[10px] text-zinc-400 truncate max-w-[150px]">
                              {item.company} &bull; live-system
                            </span>
                          </div>

                          {/* 16:9 Image */}
                          <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                            <Image
                              src={item.projectThumbnail}
                              alt={`${item.company} System Preview`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 400px"
                              className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Targeted Repositories Section */}
                {item.repos && item.repos.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      <GitBranch className="h-3.5 w-3.5" />
                      <span>Associated Public Repositories</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.repos.map((repo) => (
                        <a
                          key={repo.name}
                          href={repo.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/repo flex flex-col justify-between rounded-xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-950/50 p-3.5 transition-all hover:border-emerald-500/40 hover:bg-white dark:hover:bg-zinc-900 shadow-xs cursor-pointer"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <GithubIcon className="h-3.5 w-3.5 text-zinc-500 group-hover/repo:text-emerald-500 transition-colors" />
                                <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover/repo:text-emerald-500 transition-colors truncate max-w-[180px]">
                                  {repo.name}
                                </span>
                              </div>
                              <ExternalLink className="h-3 w-3 text-zinc-400 group-hover/repo:text-emerald-500 transition-colors shrink-0" />
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                              {repo.description}
                            </p>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-1">
                            {repo.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded bg-zinc-200/60 dark:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-mono text-zinc-600 dark:text-zinc-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools & Tech Badges */}
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-1.5">
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
