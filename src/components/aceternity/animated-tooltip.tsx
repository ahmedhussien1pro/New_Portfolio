"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    iconText?: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item) => (
        <div
          className="relative group"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 10, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-800 px-3 py-1.5 text-xs shadow-xl border border-zinc-700/80 pointer-events-none"
              >
                <div className="font-bold text-zinc-100 text-xs">{item.name}</div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  {item.designation}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-zinc-900 dark:bg-zinc-800 border-r border-b border-zinc-700/80" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-2xs backdrop-blur-sm transition-all duration-200 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              {item.name.charAt(0)}
            </span>
            <span>{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
