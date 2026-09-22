"use client";

import React from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCES } from "@/lib/data";

export default function ExperiencePage() {
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

      {/* Vertical Animated Timeline */}
      <div className="mt-16 relative">
        {/* Continuous vertical timeline guide line */}
        <div
          className="absolute left-4 sm:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-500/30 to-transparent"
          aria-hidden="true"
        />

        <div className="space-y-12">
          {EXPERIENCES.map((item, index) => (
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
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
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

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-1 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300">
                      <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.summary}
                </p>

                {/* Core Responsibilities */}
                <div className="mt-5 space-y-2.5">
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
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {item.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/60 p-3 text-center"
                    >
                      <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        {metric}
                      </div>
                    </div>
                  ))}
                </div>

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
