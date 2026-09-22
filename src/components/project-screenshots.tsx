"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Monitor,
  Maximize2,
  X,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ProjectScreenItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  imagePath: string; // e.g. "/images/projects/cyberlabs/admin-console.png"
  simulatedUrl: string;
}

interface ProjectScreenshotsProps {
  projectId: string;
  screens: ProjectScreenItem[];
}

export function ProjectScreenshots({
  projectId,
  screens,
}: ProjectScreenshotsProps) {
  const [selectedScreen, setSelectedScreen] = useState<ProjectScreenItem | null>(
    null
  );
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (screenId: string) => {
    setFailedImages((prev) => ({ ...prev, [screenId]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div className="space-y-0.5">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Monitor className="h-4 w-4" />
            <span>03. Interface Gallery & Telemetry Dashboards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Screens & Operational Controls
          </h2>
        </div>

        <span className="text-xs font-mono text-zinc-400">
          Desktop View &bull; 16:9 UHD Display
        </span>
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {screens.map((screen, idx) => {
          const hasImageFailed = failedImages[screen.id];

          return (
            <div
              key={screen.id}
              className="group rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 overflow-hidden backdrop-blur-xl shadow-md transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-700 flex flex-col justify-between"
            >
              {/* Browser Window Chrome Top Bar */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/70 px-4 py-2.5 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  <span className="ml-2 text-[11px] text-zinc-400 truncate max-w-[200px] hidden sm:inline">
                    {screen.simulatedUrl}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400">
                    {screen.tag}
                  </span>
                  <button
                    onClick={() => setSelectedScreen(screen)}
                    className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors p-1"
                    aria-label="Expand image"
                  >
                    <Maximize2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* 16:9 Aspect Ratio Container */}
              <div
                onClick={() => setSelectedScreen(screen)}
                className="relative aspect-video w-full overflow-hidden bg-zinc-950 cursor-pointer"
              >
                {!hasImageFailed ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={screen.imagePath}
                    alt={screen.title}
                    onError={() => handleImageError(screen.id)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : null}

                {/* Blueprint Placeholder if image is missing or loading */}
                {hasImageFailed && (
                  <div className="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 font-mono text-xs">
                    <div className="flex items-center justify-between text-zinc-500">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <ImageIcon className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Visual Asset Placeholder</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                        16:9 Ready
                      </span>
                    </div>

                    {/* Schematic Wireframe Layout Mock */}
                    <div className="grid grid-cols-12 gap-3 h-28 my-auto opacity-75">
                      {/* Sidebar */}
                      <div className="col-span-3 rounded-lg border border-zinc-800 bg-zinc-900/60 p-2 space-y-1.5">
                        <div className="h-2 w-12 bg-emerald-500/40 rounded animate-pulse" />
                        <div className="h-1.5 w-full bg-zinc-800 rounded" />
                        <div className="h-1.5 w-3/4 bg-zinc-800 rounded" />
                        <div className="h-1.5 w-5/6 bg-zinc-800 rounded" />
                      </div>

                      {/* Main panel */}
                      <div className="col-span-9 rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 flex flex-col justify-between">
                        <div className="flex gap-2">
                          <div className="h-4 flex-1 bg-zinc-800 rounded animate-pulse" />
                          <div className="h-4 flex-1 bg-emerald-500/20 rounded" />
                          <div className="h-4 flex-1 bg-zinc-800 rounded" />
                        </div>
                        <div className="space-y-1 my-2">
                          <div className="h-1.5 w-full bg-zinc-800/80 rounded" />
                          <div className="h-1.5 w-4/5 bg-zinc-800/80 rounded" />
                        </div>
                        <div className="h-6 w-full rounded bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center text-[10px] text-zinc-400">
                          Interactive Telemetry Viewport
                        </div>
                      </div>
                    </div>

                    {/* File Drop Path Indicator */}
                    <div className="rounded border border-zinc-800 bg-zinc-900/90 px-2.5 py-1 text-[10px] text-zinc-400 truncate flex items-center justify-between">
                      <span>Drop screenshot at:</span>
                      <code className="text-emerald-400 font-semibold">{screen.imagePath}</code>
                    </div>
                  </div>
                )}
              </div>

              {/* Caption Footer */}
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {screen.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {screen.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedScreen(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="space-y-0.5 font-mono">
                <div className="text-xs text-emerald-400 font-bold">
                  {selectedScreen.tag} &bull; {selectedScreen.title}
                </div>
                <div className="text-[10px] text-zinc-500">
                  {selectedScreen.simulatedUrl}
                </div>
              </div>
              <button
                onClick={() => setSelectedScreen(null)}
                className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedScreen.imagePath}
                alt={selectedScreen.title}
                onError={() => handleImageError(selectedScreen.id)}
                className="h-full w-full object-contain"
              />
            </div>

            <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
              {selectedScreen.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
