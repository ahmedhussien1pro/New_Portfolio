"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layout,
  Server,
  Cloud,
  Layers,
  Sparkles,
  Code2,
  Database,
  Cpu,
  Shield,
  Zap,
} from "lucide-react";

import { InteractiveNodeMap } from "@/components/interactive-node-map";

interface TechItem {
  name: string;
  designation: string;
  tag: string;
}

interface Tier {
  tier: string;
  name: string;
  icon: React.ElementType;
  description: string;
  focus: string;
  items: TechItem[];
}

export function TechStackSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const tiers: Tier[] = [
    {
      tier: "Tier 01",
      name: "Frontend Architecture",
      icon: Layout,
      description:
        "High-performance client and server-rendered web applications built with strict type constraints and optimal Core Web Vitals.",
      focus: "Hydration optimization, server actions, and sub-second interaction speeds.",
      items: [
        { name: "Next.js 16", designation: "App Router & React 19 Server Components", tag: "Framework" },
        { name: "TypeScript", designation: "Strict Type Safety & Zero Any Standards", tag: "Language" },
        { name: "Tailwind CSS", designation: "Constrained Design Tokens & Zero Runtime", tag: "Styling" },
        { name: "Framer Motion", designation: "Hardware-Accelerated Physics Animations", tag: "Animation" },
        { name: "HTML5 Canvas", designation: "Direct Frame Blitting & Data Visualization", tag: "Graphics" },
        { name: "Radix Primitives", designation: "WAI-ARIA Compliant Unstyled Components", tag: "A11y" },
      ],
    },
    {
      tier: "Tier 02",
      name: "Backend & Persistence",
      icon: Server,
      description:
        "Decoupled microservice architectures and transactional API gateways designed for concurrency, isolation, and data durability.",
      focus: "Role-based execution contexts, connection pooling, and resilient REST gateways.",
      items: [
        { name: "NestJS 10", designation: "Modular Architecture & Execution Guards", tag: "Framework" },
        { name: "Node.js", designation: "Event-Driven Asynchronous Server Runtime", tag: "Runtime" },
        { name: "MongoDB Atlas", designation: "Multi-Region Distributed Replica Sets", tag: "Database" },
        { name: "Redis Cache", designation: "In-Memory Sub-Millisecond Key/Value Store", tag: "Cache" },
        { name: "JWT & RBAC", designation: "Stateless Auth & ExecutionContext Guards", tag: "Security" },
        { name: "Mongoose ODM", designation: "Strict Schema Constraints & Pool Lifecycle", tag: "Data" },
      ],
    },
    {
      tier: "Tier 03",
      name: "Cloud, Edge & DevOps",
      icon: Cloud,
      description:
        "Zero-Trust infrastructure orchestration across private VPC networks and Anycast edge networks with automated delivery pipelines.",
      focus: "Private subnet isolation, automated preview deployments, and TLS 1.3 termination.",
      items: [
        { name: "DigitalOcean", designation: "Private VPC Droplets & Managed Daemons", tag: "Cloud" },
        { name: "Cloudflare WAF", designation: "Anycast Edge Routing & DDoS Mitigation", tag: "Security" },
        { name: "Docker Compose", designation: "Isolated Containerized Microservices", tag: "Containers" },
        { name: "GitHub Actions", designation: "Automated Lint, Test & Preview Pipelines", tag: "CI/CD" },
        { name: "Vercel Edge", designation: "Global Edge Network & Sub-Second Previews", tag: "Deploy" },
        { name: "Bitbucket", designation: "Protected Repositories & Mandatory PR Gates", tag: "VCS" },
      ],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/50"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-2 mb-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3.5 py-1 text-xs font-mono text-zinc-400 backdrop-blur-md">
          <Layers className="h-3.5 w-3.5 text-emerald-400" />
          <span>The Tech Ecosystem</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
          Interactive Neural Systems Map
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Explore the decoupled infrastructure topology. Hover over cluster paths to trace live synapsing data packets and system specifications.
        </p>
      </div>

      {/* Interactive Neural Node Map */}
      <div className="mb-10">
        <InteractiveNodeMap />
      </div>

      {/* 3 Architectural Tier Breakdown Heading */}
      <div className="flex flex-col items-center text-center space-y-1.5 mb-6 max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
          Architectural Topology
        </span>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-200">
          Three-Tier Production Pipeline
        </h3>
      </div>

      {/* 3 Architectural Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, idx) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-6 sm:p-7 backdrop-blur-md flex flex-col justify-between transition-all hover:border-zinc-700 hover:bg-zinc-900/40 group shadow-xl"
            >
              <div className="space-y-6">
                {/* Card Top Header */}
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    {tier.tier}
                  </span>
                  <div className="p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                    {tier.description}
                  </p>
                </div>

                {/* Interactive Grid of Technology Cards with Tooltips */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                    <span>Interactive Tooling</span>
                    <span className="text-emerald-500/70 text-[9px]">Hover for spec</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {tier.items.map((tech) => {
                      const isHovered = hoveredTech === tech.name;
                      return (
                        <div
                          key={tech.name}
                          className="relative"
                          onMouseEnter={() => setHoveredTech(tech.name)}
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          {/* Animated Tooltip */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.92 }}
                                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                                className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 w-48 rounded-xl bg-zinc-900/95 border border-zinc-700/80 p-2.5 text-center shadow-2xl backdrop-blur-md pointer-events-none"
                              >
                                <div className="text-[11px] font-bold text-zinc-100">{tech.name}</div>
                                <div className="text-[10px] text-zinc-400 mt-0.5 leading-snug">
                                  {tech.designation}
                                </div>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-zinc-900 border-r border-b border-zinc-700/80" />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Tech Item Card */}
                          <motion.div
                            whileHover={{ scale: 1.04, y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`flex flex-col justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                              isHovered
                                ? "border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.18)] text-emerald-300"
                                : "border-zinc-800/80 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-semibold truncate">
                                {tech.name}
                              </span>
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
                            </div>
                            <span className="text-[9px] font-mono text-zinc-500 mt-1">
                              {tech.tag}
                            </span>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Architectural Focus Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800/60">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Architectural Focus
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed font-mono">
                  {tier.focus}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
