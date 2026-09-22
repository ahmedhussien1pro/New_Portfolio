"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Layout, Cloud, GitBranch, Layers } from "lucide-react";
import { AHMED_PROFILE } from "@/lib/data";

export function TechStackSection() {
  const categories = [
    {
      title: "Backend Architecture",
      icon: Server,
      description: "Modular microservices with NestJS, secure REST APIs, role-based guards, and token authentication.",
      items: AHMED_PROFILE.technologies.backend,
    },
    {
      title: "Frontend Engineering",
      icon: Layout,
      description: "Next.js 15/16 App Router, React 19 Server Components, Server Actions, and strict TypeScript.",
      items: AHMED_PROFILE.technologies.frontend,
    },
    {
      title: "Cloud & Infrastructure",
      icon: Cloud,
      description: "DigitalOcean droplets in private VPC, Cloudflare Edge DNS/WAF, and Docker containerization.",
      items: AHMED_PROFILE.technologies.cloud,
    },
    {
      title: "Enterprise Workflows",
      icon: GitBranch,
      description: "Sprint planning with Jira, monorepo branch protection on Bitbucket, and automated CI/CD.",
      items: AHMED_PROFILE.technologies.workflows,
    },
  ];

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-300">
          <Layers className="h-3.5 w-3.5 text-emerald-500" />
          <span>Technical Competencies</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Engineering Stack & Tooling
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
          Architectural domains Ahmed actively engineers in production environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 p-5 backdrop-blur-xl flex flex-col justify-between transition-all hover:border-zinc-400 dark:hover:border-zinc-700"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded bg-zinc-50 dark:bg-zinc-800/80 px-2 py-0.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
