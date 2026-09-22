"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Server,
  Layers,
  ExternalLink,
  Shield,
  FileCode,
  Search,
  SlidersHorizontal,
  Images,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES, ProjectCaseStudy } from "@/lib/data";

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectCaseStudy[]>(CASE_STUDIES);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data?.projects) {
          setProjects(data.projects.filter((p: any) => p.published !== false));
        }
      })
      .catch((err) => console.error("Could not sync projects", err));
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.architectureLayers.some((layer) => layer.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-10">
      {/* Top Back Navigation */}
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-300">
            <Server className="h-3.5 w-3.5 text-emerald-500" />
            <span>Case Studies Catalog &bull; {projects.length} Systems</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Engineered Systems & Case Studies
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A comprehensive catalog of decoupled backend microservices, full-stack production platforms, and interactive client applications engineered by Ahmed Hussien.
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-xs font-mono placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-xs"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                isSelected
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs"
                  : "border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {cat}
              <span className="ml-1.5 opacity-60 text-[10px]">
                (
                {cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length}
                )
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center text-zinc-500 font-mono text-sm">
          No engineering projects match your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((study, idx) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 overflow-hidden backdrop-blur-xl flex flex-col justify-between transition-all hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.08)] group"
              >
                {/* Visual Cover Thumbnail */}
                {study.coverImage && (
                  <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-200/80 dark:border-white/10 bg-zinc-950">
                    <Image
                      src={study.coverImage}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Category Pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="rounded-md bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                        {study.category}
                      </span>
                    </div>

                    {/* Screenshot Count Badge */}
                    {study.screens && study.screens.length > 0 && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="inline-flex items-center gap-1 rounded-md bg-zinc-950/80 backdrop-blur-md px-2 py-1 text-[10px] font-mono text-zinc-300 border border-zinc-700">
                          <Images className="h-3 w-3 text-emerald-400" />
                          {study.screens.length} Views
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-[10px] font-mono text-zinc-400">
                      ID: {study.id}
                    </span>
                    <div className="flex items-center gap-2">
                      {study.liveUrl && (
                        <a
                          href={study.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          <span>Demo</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                      {study.githubUrl && (
                        <a
                          href={study.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                          <GithubIcon className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors line-clamp-1">
                      {study.title}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed line-clamp-2">
                      {study.tagline}
                    </p>
                  </div>

                  {/* Concrete Architecture Layers */}
                  <div className="space-y-1.5 pt-1">
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
                <div className="p-5 pt-0">
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
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
