"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileDown,
  Server,
  Cloud,
  Database,
  GitBranch,
  Shield,
  Layers,
  Terminal,
  ExternalLink,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/aceternity/spotlight";
import { AHMED_PROFILE } from "@/lib/data";

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

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function HeroSection() {
  const architecturalLayers = [
    "NestJS Modular Architecture",
    "MongoDB Atlas Cluster Management",
    "DigitalOcean Droplet Orchestration",
    "Cloudflare Zero-Trust/DNS",
  ];

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-center items-center pt-8 pb-16 overflow-hidden">
      {/* Subtle precision Spotlight (damped emerald luminescence) */}
      <Spotlight fill="rgba(16, 185, 129, 0.12)" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Authentic Engineering Identity */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* System Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CyberLabs Infrastructure Fleet</span>
                <span className="text-zinc-400">&bull;</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
                Ahmed Hussien
              </h1>
              <div className="text-lg sm:text-xl font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                Full Stack Software Engineer & Founder at CyberLabs
              </div>
            </motion.div>

            {/* Grounded Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="text-base text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed"
            >
              Specializing in modular backend architectures with NestJS, production-grade Next.js frontends, and cloud
              infrastructure management across DigitalOcean and Cloudflare.
            </motion.p>

            {/* Concrete Architectural Layers (Replacing marketing badges) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="space-y-2 w-full max-w-xl text-left"
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Core Architectural Layers
              </div>
              <div className="flex flex-wrap gap-2">
                {architecturalLayers.map((layer) => (
                  <span
                    key={layer}
                    className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-100/70 dark:bg-zinc-900/80 px-2.5 py-1 text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {layer}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <Link href="/#projects">
                <Button
                  variant="accent"
                  size="default"
                  className="gap-2 text-xs font-semibold cursor-pointer"
                >
                  View Case Studies
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>

              <a href="/Ahmed_Hussien_CV.pdf" download="Ahmed_Hussien_CV.pdf">
                <Button
                  variant="outline"
                  size="default"
                  className="gap-2 text-xs border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md cursor-pointer hover:border-emerald-500/40"
                >
                  <FileDown className="h-3.5 w-3.5 text-emerald-500" />
                  Download CV
                </Button>
              </a>

              {/* Direct Profile Links */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href={AHMED_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={AHMED_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Linear-Style Precision Bento Grid */}
          <div className="lg:col-span-6 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {/* Bento Card 1: Microservices Fleet */}
              <div className="sm:col-span-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-4 sm:p-5 backdrop-blur-xl shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-700">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      CyberLabs Microservices Fleet
                    </span>
                  </div>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    VPC: 10.114.0.0/16
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-zinc-50 dark:bg-zinc-950/70 px-3 py-2 border border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-800 dark:text-zinc-200">cyberlabs-admin</span>
                    <span className="text-[11px] text-zinc-500">Port 4001 &bull; RBAC Guard</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-50 dark:bg-zinc-950/70 px-3 py-2 border border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-800 dark:text-zinc-200">backend</span>
                    <span className="text-[11px] text-zinc-500">Port 4000 &bull; REST Gateway</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-50 dark:bg-zinc-950/70 px-3 py-2 border border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-800 dark:text-zinc-200">vm-service</span>
                    <span className="text-[11px] text-zinc-500">Port 4002 &bull; Compute Node RPC</span>
                  </div>
                </div>
              </div>

              {/* Bento Card 2: Cloud Infrastructure & Edge */}
              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-4 backdrop-blur-xl shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-700">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 uppercase">
                    Cloud & Edge
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                  <div className="flex items-center justify-between">
                    <span>Provider</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">DigitalOcean</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Edge Security</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">Cloudflare WAF</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Containers</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">Docker / Compose</span>
                  </div>
                </div>
              </div>

              {/* Bento Card 3: Database & Cache */}
              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-4 backdrop-blur-xl shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-700">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 uppercase">
                    Data Persistence
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                  <div className="flex items-center justify-between">
                    <span>Primary Store</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">MongoDB Atlas</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>In-Memory</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">Redis Cache</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Replication</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">Multi-Region</span>
                  </div>
                </div>
              </div>

              {/* Bento Card 4: Enterprise Agile Delivery */}
              <div className="sm:col-span-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-3.5 px-4 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <GitBranch className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Jira Epics &bull; Bitbucket Branch Protection &bull; GitHub Actions CI/CD</span>
                </div>
                <span className="text-[11px] text-zinc-400">Strict Code Review Workflow</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
