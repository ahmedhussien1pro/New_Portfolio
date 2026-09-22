"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, Mail, FileDown, ShieldCheck } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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

interface HealthData {
  status: string;
  system: string;
  latencyMs: number;
  uptime: string;
}

export function Footer() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("/api/health");
        if (res.ok) {
          const data = await res.json();
          setHealth(data);
        }
      } catch (err) {
        console.error("Health check error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: Branding & Tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-sm">
                Ahmed Hussien
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
              <span className="text-xs text-zinc-500 font-medium">
                Founder at CyberLabs
              </span>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Architecting high-scale web platforms & distributed cloud systems.
            </p>
          </div>

          {/* Middle: API Health Indicator */}
          <div className="flex items-center gap-2.5 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/80 px-3.5 py-1.5 shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              Systems Operational
              {health && (
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  {health.latencyMs}ms
                </span>
              )}
            </span>
          </div>

          {/* Right: Social & Quick Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Eng-Ahmed-Hussien"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-hussien-front-end-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="rounded-lg p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Contact"
            >
              <Mail className="h-4 w-4" />
            </Link>
            <a
              href="/Ahmed_Hussien_CV.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <FileDown className="h-3.5 w-3.5" />
              CV
            </a>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} Ahmed Hussien. All rights reserved.
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>Next.js 16 (App Router)</span>
            <span>&bull;</span>
            <span>NestJS API</span>
            <span>&bull;</span>
            <span>Pure Software Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
