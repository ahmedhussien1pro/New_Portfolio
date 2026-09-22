"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Server,
  Layers,
  ExternalLink,
  Shield,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      {/* Back Button */}
      <div>
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Overview
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-300">
          <Server className="h-3.5 w-3.5 text-emerald-500" />
          <span>Case Studies Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Software Engineering Case Studies
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Architectural analyses of production systems designed by Ahmed Hussien across NestJS backend microservices,
          Next.js App Router frontends, and cloud orchestration.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASE_STUDIES.map((study, idx) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 p-6 backdrop-blur-xl flex flex-col justify-between transition-all hover:border-zinc-400 dark:hover:border-zinc-700 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  {study.category}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  Case Study #{study.id}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
                  {study.title}
                </h2>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {study.tagline}
                </p>
              </div>

              {/* Concrete Architecture Layers */}
              <div className="space-y-1.5 pt-2">
                {study.architectureLayers.slice(0, 3).map((layer) => (
                  <div
                    key={layer}
                    className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">{layer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Read Case Study Button */}
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/60 mt-6">
              <Link href={`/projects/${study.id}`} className="w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 text-xs font-mono group-hover:border-emerald-500/40 group-hover:bg-emerald-500/5 group-hover:text-emerald-500 transition-all cursor-pointer"
                >
                  <span>Read Architecture & Code</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
