"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileDown,
  Server,
  Cloud,
  Cpu,
  GitBranch,
  Shield,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/aceternity/spotlight";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/card-3d";
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
  const focusAreas = [
    {
      title: "Cloud Infrastructure",
      tagline: "DigitalOcean VPC & Cloudflare Edge",
      description: "Private network isolation, automated Docker orchestration, and Zero-Trust WAF packet filtering.",
      icon: Cloud,
      stat: "FRA1 VPC",
    },
    {
      title: "Microservices Architecture",
      tagline: "Decoupled NestJS Fleet",
      description: "Role-isolated administration, REST gateway, and compute daemon with strict type contracts.",
      icon: Server,
      stat: "3 Services",
    },
    {
      title: "CI/CD Automation",
      tagline: "GitHub Actions & Ephemeral Previews",
      description: "Automated test suites, linting validation, and instant branch deployments to edge runtime.",
      icon: GitBranch,
      stat: "Zero Downtime",
    },
    {
      title: "Platform Reliability",
      tagline: "High Availability & Telemetry",
      description: "Sub-300ms stream latency, MongoDB Atlas replica pools, and real-time distributed tracing.",
      icon: Activity,
      stat: "99.9% SLA",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 flex flex-col justify-center items-center overflow-hidden">
      {/* Precision Mouse-tracking Spotlight Effect */}
      <Spotlight fill="rgba(16, 185, 129, 0.16)" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Split Hero Grid: Text & 3D Tilt Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Focused Identity & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3.5 py-1 text-xs font-mono text-zinc-400 backdrop-blur-md shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CyberLabs Core Infrastructure</span>
                <span className="text-zinc-600">&bull;</span>
                <span className="text-emerald-400 font-medium">Operational</span>
              </div>
            </motion.div>

            {/* Headline & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.08]">
                Ahmed Hussien
              </h1>
              <div className="text-lg sm:text-xl lg:text-2xl font-mono font-medium text-emerald-400">
                Full Stack Software Engineer & Founder at CyberLabs
              </div>
            </motion.div>

            {/* Minimal Engineering Bio */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed font-normal"
            >
              Specializing in modular backend architectures with NestJS, production-grade Next.js App Router platforms,
              and cloud infrastructure orchestration across DigitalOcean and Cloudflare.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <Link href="#case-studies">
                <Button
                  variant="accent"
                  size="default"
                  className="gap-2 text-xs font-semibold cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                >
                  <span>View Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>

              <a href="/Ahmed_Hussien_CV.pdf" download="Ahmed_Hussien_CV.pdf">
                <Button
                  variant="outline"
                  size="default"
                  className="gap-2 text-xs font-mono border-zinc-800/80 bg-zinc-950/60 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 backdrop-blur-md cursor-pointer"
                >
                  <FileDown className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Download CV</span>
                </Button>
              </a>

              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="default"
                  className="text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 cursor-pointer"
                >
                  Contact
                </Button>
              </Link>

              <div className="flex items-center gap-1 pl-2 border-l border-zinc-800/60">
                <a
                  href={AHMED_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={AHMED_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Aceternity 3D Tilt Glassmorphism Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <CardContainer className="inter-var w-full max-w-md">
              <CardBody className="bg-zinc-950/60 relative group/card border border-zinc-800/80 w-full rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-2xl transition-all hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                {/* Header item */}
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4 mb-5">
                  <CardItem
                    translateZ={30}
                    className="flex items-center gap-2 text-xs font-mono text-zinc-400"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>CyberLabs System Lead</span>
                  </CardItem>
                  <CardItem
                    translateZ={30}
                    className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20"
                  >
                    VPC: 10.114.0.0/16
                  </CardItem>
                </div>

                {/* Portrait with Glowing Frame */}
                <CardItem
                  translateZ={60}
                  className="w-full flex justify-center my-3"
                >
                  <div className="relative h-44 w-44 sm:h-48 sm:w-48 rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-b from-zinc-800/80 via-zinc-900 to-zinc-950 p-1.5 shadow-xl group-hover/card:border-emerald-500/60 transition-colors">
                    <Image
                      src="/assets/myImage.png"
                      alt="Ahmed Hussien"
                      fill
                      priority
                      sizes="(max-width: 640px) 176px, 192px"
                      className="object-contain object-bottom grayscale transition-all duration-500 hover:grayscale-0 group-hover/card:grayscale-0"
                    />
                  </div>
                </CardItem>

                {/* Persona Title & Role */}
                <div className="text-center space-y-1 mt-4">
                  <CardItem
                    translateZ={50}
                    className="text-lg font-bold text-zinc-100 w-full"
                  >
                    Ahmed Hussien
                  </CardItem>
                  <CardItem
                    translateZ={40}
                    className="text-xs font-mono text-emerald-400 w-full"
                  >
                    Founder & System Administrator @ CyberLabs
                  </CardItem>
                </div>

                {/* Floating Tech Chips */}
                <CardItem
                  translateZ={35}
                  className="flex flex-wrap items-center justify-center gap-1.5 pt-4 mt-4 border-t border-zinc-800/60"
                >
                  {["NestJS 10", "Next.js 16", "Cloudflare WAF", "Docker VPC"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-zinc-800/80 bg-zinc-900/60 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </CardItem>

                {/* Quick Impact Stats */}
                <CardItem
                  translateZ={25}
                  className="grid grid-cols-3 gap-2 pt-4 text-center font-mono text-[10px]"
                >
                  <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-1.5">
                    <div className="font-bold text-zinc-100 text-xs">15+</div>
                    <div className="text-zinc-500">Shipped</div>
                  </div>
                  <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-1.5">
                    <div className="font-bold text-zinc-100 text-xs">140+</div>
                    <div className="text-zinc-500">Mentees</div>
                  </div>
                  <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-1.5">
                    <div className="font-bold text-emerald-400 text-xs">99.9%</div>
                    <div className="text-zinc-500">Uptime</div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>

        {/* Bento Grid: 4 Premium Stats with Framer Motion Hover Scale */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {focusAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 backdrop-blur-md transition-all hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 rounded bg-zinc-900/80 px-2 py-0.5 border border-zinc-800/60">
                      {area.stat}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      {area.title}
                    </h3>
                    <div className="text-[11px] font-mono text-emerald-500/80 mt-0.5">
                      {area.tagline}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
