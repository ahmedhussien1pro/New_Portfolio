"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Film,
  ExternalLink,
} from "lucide-react";
import { ScreenItem } from "@/lib/data";

interface ImageGalleryProps {
  screens: ScreenItem[];
  title?: string;
}

export function ImageGallery({ screens, title = "Production Interface Gallery" }: ImageGalleryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveCarouselIdx((prev) => (prev + 1) % screens.length);
  };

  const prevSlide = () => {
    setActiveCarouselIdx((prev) => (prev - 1 + screens.length) % screens.length);
  };

  return (
    <div className="space-y-6">
      {/* Header with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200/80 dark:border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Monitor className="h-4 w-4" />
            <span>Operational Interfaces & Dashboards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
            {title}
          </h2>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 p-1 text-xs font-mono">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Grid View</span>
          </button>
          <button
            onClick={() => setViewMode("carousel")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === "carousel"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <Film className="h-3.5 w-3.5" />
            <span>Carousel View</span>
          </button>
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screens.map((screen, idx) => (
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 overflow-hidden backdrop-blur-xl shadow-md transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 flex flex-col justify-between"
            >
              {/* Browser Window Chrome */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 bg-zinc-100/70 dark:bg-zinc-950/70 px-3.5 py-2 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  <span className="ml-2 text-[11px] text-zinc-400 truncate max-w-[170px] hidden sm:inline">
                    {screen.simulatedUrl}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400">
                    {screen.tag}
                  </span>
                  <button
                    onClick={() => setLightboxIndex(idx)}
                    className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors p-1 cursor-pointer"
                    aria-label="Expand image"
                  >
                    <Maximize2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* 16:9 Aspect Ratio with next/image */}
              <div
                onClick={() => setLightboxIndex(idx)}
                className="relative aspect-video w-full overflow-hidden bg-zinc-950 cursor-pointer"
              >
                <Image
                  src={screen.imagePath}
                  alt={screen.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={idx === 0}
                />
              </div>

              {/* Caption */}
              <div className="p-4 border-t border-zinc-100 dark:border-white/10">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {screen.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {screen.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Carousel Mode */}
      {viewMode === "carousel" && (
        <div className="relative rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 overflow-hidden backdrop-blur-xl shadow-lg p-4 sm:p-6">
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3 mb-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-zinc-400 hidden sm:inline">
                {screens[activeCarouselIdx].simulatedUrl}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                {screens[activeCarouselIdx].tag}
              </span>
              <span className="text-zinc-400">
                {activeCarouselIdx + 1} of {screens.length}
              </span>
            </div>
          </div>

          {/* Main Slide Image */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-950 group">
            <Image
              src={screens[activeCarouselIdx].imagePath}
              alt={screens[activeCarouselIdx].title}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Caption & Thumbnail Picker */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {screens[activeCarouselIdx].title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {screens[activeCarouselIdx].description}
              </p>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2">
              {screens.map((s, sIdx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveCarouselIdx(sIdx)}
                  className={`relative h-12 w-20 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    activeCarouselIdx === sIdx
                      ? "border-emerald-500 ring-2 ring-emerald-500/40"
                      : "border-zinc-300 dark:border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={s.imagePath} alt={s.title} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="space-y-0.5 font-mono">
                  <div className="text-xs text-emerald-400 font-bold">
                    {screens[lightboxIndex].tag} &bull; {screens[lightboxIndex].title}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {screens[lightboxIndex].simulatedUrl}
                  </div>
                </div>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                <Image
                  src={screens[lightboxIndex].imagePath}
                  alt={screens[lightboxIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
                {screens[lightboxIndex].description}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
