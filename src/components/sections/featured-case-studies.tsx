"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  GitBranch,
  Terminal,
  CheckCircle2,
  Images,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { InteractiveTerminal } from "@/components/sections/interactive-terminal";
import { ProjectCaseStudy } from "@/lib/data";

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

interface FeaturedCaseStudiesProps {
  projects?: ProjectCaseStudy[];
}

export function FeaturedCaseStudies({ projects }: FeaturedCaseStudiesProps) {
  const [activeTab, setActiveTab] = useState<"cyberlabs" | "eduko">("cyberlabs");

  return (
    <motion.section
      id="case-studies"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/50"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/60 bg-zinc-950/40 px-3.5 py-1 text-xs font-mono text-zinc-400 backdrop-blur-md">
          <Server className="h-3.5 w-3.5 text-zinc-400" />
          <span>Interactive Architectural Case Studies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
          Featured Production Architectures
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          In-depth technical dissections of production systems engineered for microservice decoupling, low-latency streaming, and high concurrency.
        </p>

        {/* 2-Project Tab Switcher */}
        <div className="flex items-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab("cyberlabs")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === "cyberlabs"
                ? "bg-zinc-100 text-zinc-950 font-bold shadow-xs"
                : "border border-zinc-800/60 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            01 &bull; CyberLabs Microservices Fleet
          </button>
          <button
            onClick={() => setActiveTab("eduko")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === "eduko"
                ? "bg-zinc-100 text-zinc-950 font-bold shadow-xs"
                : "border border-zinc-800/60 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            02 &bull; Eduko Educational Platform
          </button>
        </div>
      </div>

      {/* Case Study Container */}
      <AnimatePresence mode="wait">
        {activeTab === "cyberlabs" && (
          <motion.div
            key="cyberlabs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {/* Top Showcase: Details + Live Architecture Flow */}
            <div className="rounded-2xl border border-zinc-800/50 bg-zinc-950/40 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/50 pb-5 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                    <span>Backend Architecture</span>
                    <span className="text-zinc-600">&bull;</span>
                    <span>Multi-Node VPC</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    CyberLabs Microservices Fleet
                  </h3>
                  <p className="text-sm text-zinc-400 font-mono mt-1">
                    Modular NestJS Architecture & Multi-Node Administration
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/Eng-Ahmed-Hussien/cyberlabs-admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>Repositories</span>
                  </a>
                  <Link href="/projects/cyberlabs">
                    <Button variant="accent" size="sm" className="text-xs font-semibold gap-1.5">
                      <span>Full Spec</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Grid: Context & Interactive Diagram */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                      System Topology & Problem
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      CyberLabs isolates administrative cluster operations from public endpoints by partitioning workloads across three distinct nodes:
                      <code className="text-emerald-400 font-mono text-xs mx-1">cyberlabs-admin</code> for privileged control,
                      <code className="text-emerald-400 font-mono text-xs mx-1">backend</code> for business logic, and
                      <code className="text-emerald-400 font-mono text-xs mx-1">vm-service</code> for compute provisioning.
                    </p>
                  </div>

                  {/* Production Interface with Grayscale to Color Rule */}
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                      Admin Console Interface
                    </h4>
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-800/60 bg-zinc-950 group/img">
                      <Image
                        src="/assets/projects/AdminDashboardV1.jpeg"
                        alt="CyberLabs Admin Interface"
                        fill
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className="rounded bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-zinc-300 border border-zinc-700">
                          Hover to view live color
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Concrete Layers */}
                  <div className="space-y-1.5 font-mono text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Zero-Trust Cloudflare Anycast Ingress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>NestJS ExecutionContext Role Guards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Isolated VPC Subnet (10.114.0.0/16)</span>
                    </div>
                  </div>
                </div>

                {/* Right: Interactive Architecture Diagram with Packet Simulation */}
                <div className="lg:col-span-7">
                  <ArchitectureDiagram projectId="cyberlabs" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "eduko" && (
          <motion.div
            key="eduko"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            <div className="rounded-2xl border border-zinc-800/50 bg-zinc-950/40 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/50 pb-5 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                    <span>Frontend Engineering</span>
                    <span className="text-zinc-600">&bull;</span>
                    <span>Edge Delivery</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    Eduko Educational Platform
                  </h3>
                  <p className="text-sm text-zinc-400 font-mono mt-1">
                    Next.js 16 App Router & Automated GitHub Actions Delivery
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/ahmedhabiby/Eduko1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>ahmedhabiby/Eduko1</span>
                  </a>
                  <Link href="/projects/eduko">
                    <Button variant="accent" size="sm" className="text-xs font-semibold gap-1.5">
                      <span>Full Spec</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Grid: Context & Screenshot */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                      Platform Engineering
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Co-developed high-performance user interfaces utilizing Next.js 16 and React 19 Server Components. Integrated continuous integration workflows via GitHub Actions targeting Vercel edge deployment with automated preview environments for every pull request.
                    </p>
                  </div>

                  <div className="space-y-2 font-mono text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Next.js 16 App Router with Server Actions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Zero-Downtime GitHub Actions Deployment Pipeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Optimistic UI updates with React 19 useTransition</span>
                    </div>
                  </div>
                </div>

                {/* Production Interface Screenshot with Grayscale to Color Rule */}
                <div className="lg:col-span-6">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-800/60 bg-zinc-950 group/img">
                    <Image
                      src="/assets/projects/FreshCartEcommerce.jpeg"
                      alt="Eduko Production Platform"
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="rounded bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-zinc-300 border border-zinc-700">
                        Hover to view live color
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Relocated Interactive Terminal Block: Code Execution & Diagnostics */}
      <div className="mt-16 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Operational Diagnostics & Execution
            </div>
            <h3 className="text-lg font-bold text-zinc-100">
              Interactive System Terminal
            </h3>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            Type <code className="text-emerald-400">help</code> for commands
          </span>
        </div>

        <InteractiveTerminal />
      </div>

      {/* Explore Full Catalog Link */}
      <div className="mt-16 flex justify-center">
        <Link href="/projects">
          <Button
            variant="outline"
            size="default"
            className="gap-2 text-xs font-mono border-zinc-800/60 bg-zinc-950/40 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 backdrop-blur-md cursor-pointer"
          >
            <span>Explore All 21 Engineering Case Studies & Repositories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}
