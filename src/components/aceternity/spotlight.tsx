"use client";

import React, { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({
  className,
  fill = "rgba(16, 185, 129, 0.18)",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid movement
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Track mouse position relative to container
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden z-0",
        className
      )}
    >
      {/* Primary dynamic mouse-following spotlight */}
      <motion.div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[100px] transition-opacity duration-500"
        style={{
          x: springX,
          y: springY,
          background: `radial-gradient(circle, ${fill} 0%, rgba(16, 185, 129, 0.05) 50%, transparent 75%)`,
        }}
      />

      {/* Subtle fixed overhead ambient beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-[90%] max-w-4xl bg-gradient-to-b from-emerald-500/10 via-emerald-500/[0.02] to-transparent blur-3xl opacity-75"
        aria-hidden="true"
      />
    </div>
  );
}
