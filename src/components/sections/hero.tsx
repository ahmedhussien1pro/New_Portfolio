"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileDown,
  Sparkles,
  Server,
  Cloud,
  Code2,
  Database,
  Cpu,
  Layers,
  Terminal as TerminalIcon,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/aceternity/spotlight";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/card-3d";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full flex flex-col justify-center items-center pt-10 pb-20 overflow-hidden">
      {/* Dynamic Aceternity Mouse Spotlight */}
      <Spotlight fill="rgba(16, 185, 129, 0.18)" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Open for High-Impact Software Engineering & Architecture</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
                Ahmed Hussien
              </h1>
              <div className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span>Full Stack Software Engineer</span>
                <span className="text-zinc-400 dark:text-zinc-600 font-normal">|</span>
                <span className="text-zinc-800 dark:text-zinc-200">Founder at CyberLabs</span>
              </div>
            </motion.div>

            {/* Pitch & Philosophy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
            >
              Architecting high-concurrency web applications, modular microservices, and resilient cloud
              infrastructure with Next.js, NestJS, and modern distributed systems. Dedicated 100% to pure software
              engineering, advanced algorithms, and cloud scale.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link href="/#projects">
                <Button
                  variant="accent"
                  size="lg"
                  className="gap-2 text-sm font-semibold group cursor-pointer"
                >
                  Explore Architecture
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <a
                href="/Ahmed_Hussien_CV.pdf"
                download="Ahmed_Hussien_CV.pdf"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md cursor-pointer hover:border-emerald-500/40"
                >
                  <FileDown className="h-4 w-4 text-emerald-500" />
                  Download Resume
                </Button>
              </a>

              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Get in Touch &rarr;
                </Button>
              </Link>
            </motion.div>

            {/* Quick Keyboard shortcut highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2 flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500"
            >
              <kbd className="rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/60 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
                ⌘K / Ctrl+K
              </kbd>
              <span>Instant Command Navigation & AI Copilot</span>
            </motion.div>
          </div>

          {/* Right Column: Aceternity 3D Glassmorphism Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-[420px]"
            >
              <CardContainer className="inter-var">
                <CardBody className="relative group/card w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-6 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]">
                  {/* Top Bar (Terminal style macOS buttons & Tag) */}
                  <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <CardItem
                      translateZ={25}
                      className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5"
                    >
                      <TerminalIcon className="h-3.5 w-3.5 text-emerald-500" />
                      cyberlabs-core // v4.2
                    </CardItem>
                  </div>

                  {/* Card Title & Role */}
                  <div className="mt-5 space-y-1">
                    <CardItem
                      translateZ={40}
                      className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"
                    >
                      <span>Founder @ CyberLabs</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                    </CardItem>
                    <CardItem
                      translateZ={30}
                      className="text-xs text-emerald-600 dark:text-emerald-400 font-medium"
                    >
                      Full-Stack Cloud Architecture & Distributed APIs
                    </CardItem>
                  </div>

                  {/* Stats Grid */}
                  <CardItem translateZ={50} className="w-full mt-6">
                    <div className="grid grid-cols-3 gap-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-950/60 p-3 text-center">
                      <div className="space-y-0.5">
                        <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                          99.99%
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                          Uptime SLA
                        </div>
                      </div>
                      <div className="space-y-0.5 border-x border-zinc-200 dark:border-zinc-800">
                        <div className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                          &lt;15ms
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                          Edge Latency
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                          Zero
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                          IoT Clutter
                        </div>
                      </div>
                    </div>
                  </CardItem>

                  {/* Architecture Pillars List */}
                  <div className="mt-5 space-y-2">
                    <CardItem
                      translateZ={35}
                      className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <Zap className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>Next.js 16 App Router & Server Actions</span>
                    </CardItem>
                    <CardItem
                      translateZ={35}
                      className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <Server className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>NestJS Microservices & REST/GraphQL APIs</span>
                    </CardItem>
                    <CardItem
                      translateZ={35}
                      className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <Cloud className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>DigitalOcean, Docker Containers & Cloudflare Edge</span>
                    </CardItem>
                  </div>

                  {/* Tech Badges Row */}
                  <CardItem translateZ={45} className="mt-6 flex flex-wrap gap-1.5">
                    {["Next.js", "NestJS", "TypeScript", "MongoDB Atlas", "Docker", "Cloudflare"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-800/80 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </CardItem>

                  {/* Bottom Verification Footer */}
                  <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                    <CardItem
                      translateZ={20}
                      className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Verified Architecture</span>
                    </CardItem>
                    <CardItem translateZ={20} className="font-mono text-[10px]">
                      pure-software.env
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
