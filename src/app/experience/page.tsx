import React from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar, Building, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            <ArrowLeft className="h-4 w-4" /> Back to Overview
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Sparkles className="h-3 w-3" /> Founder & Full Stack Engineer
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Engineering Leadership & Experience
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
          A track record of building production web platforms, high-scale microservices, and leading software engineering at CyberLabs.
        </p>
      </div>

      {/* CyberLabs Featured Card */}
      <div className="mt-12 relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all hover:border-emerald-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              Founder & Lead Full Stack Software Engineer
            </h2>
            <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <Building className="h-3.5 w-3.5" /> CyberLabs
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Present
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Founded and spearheaded software development for CyberLabs, designing decoupled cloud architectures, resilient NestJS backends, and responsive Next.js frontend applications for mission-critical client solutions.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Next.js", "NestJS", "TypeScript", "MongoDB Atlas", "Docker", "Cloudflare", "Tailwind CSS"].map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/70 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
