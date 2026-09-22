"use client";

import React from "react";
import { motion } from "framer-motion";

export function BackgroundBeams({ className }: { className?: string }) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-300 -100C-300 -100 -200 300 250 420C700 540 760 920 760 920",
    "M-200 -50C-200 -50 -100 350 350 480C800 610 840 980 840 980",
    "M-100 0C-100 0 0 400 450 540C900 680 920 1040 920 1040",
    "M0 50C0 50 100 450 550 600C1000 750 1000 1100 1000 1100",
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ""}`}
    >
      <svg
        className="absolute w-full h-full opacity-40"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beamEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beamCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>

          <filter id="beamGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((path, idx) => (
          <motion.path
            key={idx}
            d={path}
            stroke={idx % 2 === 0 ? "url(#beamEmerald)" : "url(#beamCyan)"}
            strokeWidth={idx % 2 === 0 ? "2" : "1.5"}
            strokeDasharray="120 400"
            filter="url(#beamGlow)"
            initial={{ strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: -1000 }}
            transition={{
              repeat: Infinity,
              duration: 8 + idx * 2.5,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
