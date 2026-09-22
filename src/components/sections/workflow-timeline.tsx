"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  KanbanSquare,
  GitBranch,
  Rocket,
  Cloud,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { BackgroundBeams } from "@/components/aceternity/background-beams";

export function WorkflowTimeline() {
  const steps = [
    {
      step: "01",
      title: "Jira Software",
      phase: "Planning & Architecture",
      description:
        "Epics, architectural RFCs, sprint commitments, and ticket breakdowns tracked with enterprise engineering discipline.",
      icon: KanbanSquare,
      deliverables: ["Architecture RFCs", "Sprint Epics", "Story Point Estimation"],
    },
    {
      step: "02",
      title: "Bitbucket & GitHub",
      phase: "Protected Source Control",
      description:
        "Isolated monorepo and microservice codebases protected by branch policies, peer approvals, and mandatory PR reviews.",
      icon: GitBranch,
      deliverables: ["Protected Main Branches", "Mandatory Peer Reviews", "Pre-Commit Hooks"],
    },
    {
      step: "03",
      title: "CI/CD Pipeline",
      phase: "Automated Build & Verify",
      description:
        "GitHub Actions execute unit/integration test suites, type-checking, and generate isolated preview environments.",
      icon: Rocket,
      deliverables: ["Automated Test Matrix", "TypeScript Type Checks", "Ephemeral Staging Previews"],
    },
    {
      step: "04",
      title: "DigitalOcean & Cloudflare",
      phase: "Deploy & Shield",
      description:
        "Zero-downtime containerized deployment across private DigitalOcean VPC droplets shielded by Cloudflare Anycast WAF.",
      icon: Cloud,
      deliverables: ["VPC Subnet Isolation", "Zero-Trust Edge Rules", "Automated Health Probes"],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/50 overflow-hidden"
    >
      {/* Aceternity Background Beams */}
      <BackgroundBeams />

      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-2 mb-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3.5 py-1 text-xs font-mono text-zinc-400 backdrop-blur-md">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Engineering Lifecycle</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
          Enterprise Delivery Workflow
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Standardized end-to-end development lifecycle: from requirement specification and Jira epics to zero-downtime edge runtime deployment.
        </p>
      </div>

      {/* Desktop Animated Timeline Connecting Track */}
      <div className="relative mb-6 hidden lg:block">
        {/* Background Track Line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-zinc-800/80" />

        {/* Animated Glowing Progress Gradient */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ originX: 0 }}
          className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
        />

        {/* 4 Interactive Progress Nodes */}
        <div className="relative flex justify-between px-6 z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Node Outer Ring & Core */}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 border-2 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-transform group-hover:scale-125">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {step.step}
                </span>
                <span className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-pulse" />
              </div>
              <span className="mt-2 text-[10px] font-mono font-semibold text-zinc-400 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">
                Phase {step.step}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4-Phase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-6 backdrop-blur-md flex flex-col justify-between transition-all hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] group relative cursor-pointer"
            >
              <div className="space-y-4">
                {/* Step Header */}
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    PHASE {step.step}
                  </span>
                  <div className="p-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Role & Title */}
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    {step.phase}
                  </div>
                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="mt-6 pt-4 border-t border-zinc-800/60 space-y-1.5 font-mono text-[11px] text-zinc-300">
                {step.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-zinc-400">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400/80 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
