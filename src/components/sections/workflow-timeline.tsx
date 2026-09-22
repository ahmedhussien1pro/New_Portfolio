"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  KanbanSquare,
  GitBranch,
  Rocket,
  Cloud,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function WorkflowTimeline() {
  const steps = [
    {
      step: "01",
      title: "Jira Sprints & Epics",
      role: "Agile Specifications",
      description: "Architecture roadmaps, ticket breakdown, and sprint commitments managed with enterprise engineering rigor.",
      icon: KanbanSquare,
      tool: "Jira Software",
    },
    {
      step: "02",
      title: "Bitbucket & GitHub",
      role: "Protected Monorepo",
      description: "Strict branch protections, mandatory peer reviews, and automated linting/testing before merge approvals.",
      icon: GitBranch,
      tool: "Bitbucket / GitHub",
    },
    {
      step: "03",
      title: "Vercel & Staging Previews",
      role: "Automated Continuous Delivery",
      description: "Ephemeral staging deployments generated on every pull request for isolated QA and regression validation.",
      icon: Rocket,
      tool: "GitHub Actions + Vercel",
    },
    {
      step: "04",
      title: "DigitalOcean & Cloudflare",
      role: "VPC & Edge Ingress",
      description: "Production microservices orchestrated on private DigitalOcean droplets shielded by Cloudflare Zero-Trust WAF.",
      icon: Cloud,
      tool: "DigitalOcean + Cloudflare",
    },
  ];

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="flex flex-col items-center text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-300">
          <GitBranch className="h-3.5 w-3.5 text-emerald-500" />
          <span>Delivery Pipeline</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Enterprise Delivery Workflow
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
          Standardized software engineering lifecycle from requirement specification to edge deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 p-5 backdrop-blur-xl flex flex-col justify-between transition-all hover:border-zinc-400 dark:hover:border-zinc-700"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    PHASE {step.step}
                  </span>
                  <div className="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-zinc-400">
                    {step.role}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-2.5 text-xs text-zinc-500 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{step.tool}</span>
                {!isLast && <ArrowRight className="hidden md:block h-3.5 w-3.5 text-zinc-400" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
