"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundDotsProps {
  children?: React.ReactNode;
  className?: string;
}

export function BackgroundDots({ children, className }: BackgroundDotsProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full bg-slate-50 dark:bg-zinc-950 transition-colors duration-300",
        className
      )}
    >
      {/* Background Dot Matrix Pattern with Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern vignette-mask"
        aria-hidden="true"
      />

      {/* Top subtle ambient glow (Emerald tint) */}
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 z-0 h-[450px] w-[700px] rounded-full bg-emerald-500/10 blur-[130px] dark:bg-emerald-500/[0.08]"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
}
