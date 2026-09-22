"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Shield, Server, Database, Cloud, Terminal } from "lucide-react";

interface FlowStep {
  from: string;
  to: string;
  protocol: string;
  label: string;
}

interface ArchitectureDiagramProps {
  flow: FlowStep[];
  title?: string;
}

export function ArchitectureDiagram({ flow, title = "System Topology & Data Pipeline" }: ArchitectureDiagramProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const getNodeIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("client") || lower.includes("learner") || lower.includes("admin")) return Terminal;
    if (lower.includes("cloudflare") || lower.includes("edge") || lower.includes("vercel")) return Cloud;
    if (lower.includes("database") || lower.includes("atlas") || lower.includes("mongo") || lower.includes("postgres") || lower.includes("cache")) return Database;
    if (lower.includes("guard") || lower.includes("auth") || lower.includes("security")) return Shield;
    return Server;
  };

  return (
    <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/60 p-5 sm:p-6 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            {title}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">
          Interactive Architecture Flow
        </span>
      </div>

      {/* Sequential Pipeline Stages */}
      <div className="space-y-3">
        {flow.map((step, idx) => {
          const FromIcon = getNodeIcon(step.from);
          const ToIcon = getNodeIcon(step.to);
          const isHovered = activeStep === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveStep(idx)}
              onMouseLeave={() => setActiveStep(null)}
              className={`rounded-lg border p-3.5 transition-all duration-200 cursor-pointer ${
                isHovered
                  ? "border-emerald-500/50 bg-emerald-500/[0.04] shadow-sm"
                  : "border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 hover:border-zinc-400 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                {/* Node Flow Indicator */}
                <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
                  <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
                    <FromIcon className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{step.from}</span>
                  </div>

                  <ArrowRight className="h-3 w-3 text-emerald-500 shrink-0" />

                  <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
                    <ToIcon className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{step.to}</span>
                  </div>
                </div>

                {/* Protocol Badge */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    {step.protocol}
                  </span>
                </div>
              </div>

              {/* Step Description */}
              <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>{step.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
