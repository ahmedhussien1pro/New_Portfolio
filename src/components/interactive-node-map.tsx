"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Layout,
  Cloud,
  Database,
  Shield,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

interface Node {
  id: string;
  name: string;
  category: "frontend" | "backend" | "devops" | "core";
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  role: string;
  spec: string;
  latency: string;
  icon: React.ElementType;
}

interface Edge {
  from: string;
  to: string;
  category: "frontend" | "backend" | "devops" | "core";
}

const NODES: Node[] = [
  // Central Core Hub
  {
    id: "core",
    name: "Central Ingress Gateway",
    category: "core",
    x: 50,
    y: 50,
    role: "Unified Edge Ingress & Telemetry Orchestrator",
    spec: "Dual-Stack VPC Router • Port 4000",
    latency: "< 5ms",
    icon: Cpu,
  },

  // Frontend Cluster (Left & Upper-Left)
  {
    id: "nextjs",
    name: "Next.js 16 App Router",
    category: "frontend",
    x: 24,
    y: 32,
    role: "Hybrid Server Components & Server Actions",
    spec: "React 19 • on-demand cache revalidation",
    latency: "< 18ms",
    icon: Layout,
  },
  {
    id: "react",
    name: "React 19 Server Components",
    category: "frontend",
    x: 12,
    y: 48,
    role: "Declarative UI & useTransition State",
    spec: "Zero client-bundle overhead for static trees",
    latency: "< 12ms",
    icon: Layout,
  },
  {
    id: "typescript",
    name: "TypeScript 5.x",
    category: "frontend",
    x: 18,
    y: 68,
    role: "End-to-End Compile-Time Type Invariance",
    spec: "Strict null checks • Shared API contracts",
    latency: "0ms (Static)",
    icon: Code2Icon,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS & Radix",
    category: "frontend",
    x: 34,
    y: 78,
    role: "Design Token Constraint System",
    spec: "WAI-ARIA accessibility • Zero runtime CSS",
    latency: "0ms (Static)",
    icon: Layers,
  },
  {
    id: "canvas",
    name: "HTML5 Canvas & Motion",
    category: "frontend",
    x: 32,
    y: 18,
    role: "GPU-Accelerated 60 FPS Visualizations",
    spec: "Direct frame blitting • Particle physics",
    latency: "16.6ms (60fps)",
    icon: Zap,
  },

  // Backend Cluster (Right & Lower-Right)
  {
    id: "nestjs",
    name: "NestJS Microservices",
    category: "backend",
    x: 76,
    y: 34,
    role: "Modular Architecture & ExecutionContext Guards",
    spec: "Dependency Injection • Custom RBAC",
    latency: "< 15ms",
    icon: Server,
  },
  {
    id: "mongodb",
    name: "MongoDB Atlas Cluster",
    category: "backend",
    x: 88,
    y: 52,
    role: "Multi-Region Distributed Replica Set",
    spec: "Mongoose connection pools • Read preference secondary",
    latency: "< 24ms",
    icon: Database,
  },
  {
    id: "redis",
    name: "Redis Cache Layer",
    category: "backend",
    x: 74,
    y: 68,
    role: "In-Memory Session & Cache Tier",
    spec: "Atomic increments • Sub-millisecond TTL cache",
    latency: "< 2ms",
    icon: Zap,
  },
  {
    id: "node",
    name: "Node.js Asynchronous Engine",
    category: "backend",
    x: 64,
    y: 82,
    role: "Event-Loop Non-Blocking I/O",
    spec: "Worker threads • Cluster node scheduling",
    latency: "< 8ms",
    icon: Server,
  },

  // DevOps & Cloud Cluster (Top & Bottom Edge)
  {
    id: "cloudflare",
    name: "Cloudflare Zero-Trust WAF",
    category: "devops",
    x: 50,
    y: 14,
    role: "Anycast Edge Routing & DDoS Mitigation",
    spec: "TLS 1.3 termination • Managed challenge rules",
    latency: "< 10ms",
    icon: Shield,
  },
  {
    id: "digitalocean",
    name: "DigitalOcean Droplets",
    category: "devops",
    x: 82,
    y: 18,
    role: "Dedicated VPC Compute Nodes",
    spec: "Subnet 10.114.0.0/16 • Ubuntu LTS • FRA1",
    latency: "< 14ms",
    icon: Cloud,
  },
  {
    id: "docker",
    name: "Docker Containerization",
    category: "devops",
    x: 50,
    y: 86,
    role: "Hermetic Application Packaging",
    spec: "Multi-stage builds • Non-root execution",
    latency: "< 4ms",
    icon: Layers,
  },
  {
    id: "github",
    name: "GitHub Actions CI/CD",
    category: "devops",
    x: 18,
    y: 14,
    role: "Automated Build & Preview Deployments",
    spec: "Matrix test runners • Ephemeral environments",
    latency: "Async",
    icon: Activity,
  },
];

const EDGES: Edge[] = [
  // Core connections
  { from: "core", to: "nextjs", category: "frontend" },
  { from: "core", to: "nestjs", category: "backend" },
  { from: "core", to: "cloudflare", category: "devops" },
  { from: "core", to: "docker", category: "devops" },
  { from: "core", to: "redis", category: "backend" },

  // Frontend connections
  { from: "nextjs", to: "react", category: "frontend" },
  { from: "nextjs", to: "canvas", category: "frontend" },
  { from: "react", to: "typescript", category: "frontend" },
  { from: "typescript", to: "tailwind", category: "frontend" },
  { from: "github", to: "nextjs", category: "frontend" },

  // Backend connections
  { from: "nestjs", to: "mongodb", category: "backend" },
  { from: "nestjs", to: "redis", category: "backend" },
  { from: "nestjs", to: "node", category: "backend" },
  { from: "digitalocean", to: "nestjs", category: "backend" },

  // Cloud/Devops connections
  { from: "cloudflare", to: "digitalocean", category: "devops" },
  { from: "docker", to: "digitalocean", category: "devops" },
  { from: "docker", to: "node", category: "devops" },
  { from: "github", to: "cloudflare", category: "devops" },
];

function Code2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}

export function InteractiveNodeMap() {
  const [activeFilter, setActiveFilter] = useState<"all" | "frontend" | "backend" | "devops">("all");
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  const isHighlighted = (node: Node) => {
    if (activeFilter === "all") return true;
    if (node.category === "core") return true;
    if (activeFilter === "frontend") return node.category === "frontend";
    if (activeFilter === "backend") return node.category === "backend" || node.category === "devops";
    if (activeFilter === "devops") return node.category === "devops" || node.category === "backend";
    return true;
  };

  const isEdgeHighlighted = (edge: Edge) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "frontend") return edge.category === "frontend";
    if (activeFilter === "backend") return edge.category === "backend" || edge.category === "devops";
    if (activeFilter === "devops") return edge.category === "devops" || edge.category === "backend";
    return true;
  };

  return (
    <div className="relative w-full space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
            activeFilter === "all"
              ? "bg-zinc-100 text-zinc-950 font-bold shadow-xs"
              : "border border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          All Neural Nodes (14 Systems)
        </button>

        <button
          onClick={() => setActiveFilter("frontend")}
          onMouseEnter={() => setActiveFilter("frontend")}
          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
            activeFilter === "frontend"
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              : "border border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:text-cyan-400"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          Frontend Tier (Next.js & React)
        </button>

        <button
          onClick={() => setActiveFilter("backend")}
          onMouseEnter={() => setActiveFilter("backend")}
          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
            activeFilter === "backend"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              : "border border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:text-emerald-400"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Backend & DevOps (NestJS, VPC, WAF)
        </button>
      </div>

      {/* Interactive Canvas / SVG Node Graph Container */}
      <div className="relative w-full h-[440px] sm:h-[480px] rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-4 overflow-hidden backdrop-blur-xl shadow-2xl">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Ambient radial glow in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

        {/* SVG Synapsing Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="edgeGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="edgeGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {EDGES.map((edge, idx) => {
            const fromNode = NODES.find((n) => n.id === edge.from);
            const toNode = NODES.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const isEdgeActive = isEdgeHighlighted(edge);
            const isFrontend = edge.category === "frontend";

            return (
              <g key={idx}>
                {/* Background edge path */}
                <line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={
                    isEdgeActive
                      ? isFrontend
                        ? "url(#edgeGradCyan)"
                        : "url(#edgeGradEmerald)"
                      : "rgba(63, 63, 70, 0.25)"
                  }
                  strokeWidth={isEdgeActive ? 2 : 1}
                  filter={isEdgeActive ? "url(#glow)" : undefined}
                  className="transition-all duration-500"
                />

                {/* Animated data packet traveling on active lines */}
                {isEdgeActive && (
                  <circle r={2.5} fill={isFrontend ? "#38bdf8" : "#34d399"}>
                    <animateMotion
                      path={`M ${(fromNode.x * 10).toFixed(1)},${(fromNode.y * 5).toFixed(1)} L ${(toNode.x * 10).toFixed(1)},${(toNode.y * 5).toFixed(1)}`}
                      dur={`${2 + (idx % 3)}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Render Interactive Nodes */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const active = isHighlighted(node);
          const isCore = node.category === "core";
          const isFrontend = node.category === "frontend";
          const isHovered = hoveredNode?.id === node.id;

          return (
            <div
              key={node.id}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute z-10"
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Node Button */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                animate={{
                  scale: active ? (isCore ? [1, 1.05, 1] : 1) : 0.85,
                  opacity: active ? 1 : 0.25,
                }}
                transition={{
                  scale: isCore ? { repeat: Infinity, duration: 3 } : { duration: 0.2 },
                }}
                className={`relative flex items-center justify-center rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isCore
                    ? "h-14 w-14 sm:h-16 sm:w-16 bg-emerald-500/20 border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.5)]"
                    : active
                    ? isFrontend
                      ? "h-10 w-10 sm:h-12 sm:w-12 bg-zinc-950/90 border-cyan-400/80 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                      : "h-10 w-10 sm:h-12 sm:w-12 bg-zinc-950/90 border-emerald-400/80 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                    : "h-10 w-10 bg-zinc-950/40 border-zinc-800 text-zinc-600"
                }`}
              >
                <Icon className={isCore ? "h-6 w-6 text-emerald-400" : "h-4 w-4 sm:h-5 sm:w-5"} />

                {/* Pulse beacon for core */}
                {isCore && (
                  <span className="absolute -inset-1 rounded-2xl border border-emerald-400/40 animate-ping pointer-events-none" />
                )}
              </motion.button>

              {/* Node Title Label */}
              <div
                className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-[11px] font-mono font-bold transition-all duration-300 pointer-events-none ${
                  active
                    ? isCore
                      ? "text-emerald-400"
                      : isFrontend
                      ? "text-cyan-300"
                      : "text-zinc-200"
                    : "text-zinc-600 opacity-40"
                }`}
              >
                {node.name.split(" ")[0]}
              </div>
            </div>
          );
        })}

        {/* Hovered Node Floating Intelligence Card (Shadcn Style) */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              style={{
                left: `${Math.min(Math.max(hoveredNode.x, 22), 78)}%`,
                top: `${hoveredNode.y > 60 ? hoveredNode.y - 20 : hoveredNode.y + 12}%`,
                transform: "translate(-50%, 0)",
              }}
              className="absolute z-30 w-72 rounded-2xl border border-zinc-700/80 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-2xl pointer-events-none font-mono"
            >
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-xs text-zinc-100">{hoveredNode.name}</span>
                </div>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] text-emerald-400 border border-emerald-500/20">
                  {hoveredNode.latency}
                </span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="text-zinc-300 font-medium">{hoveredNode.role}</div>
                <div className="text-zinc-500 text-[10px] leading-relaxed">{hoveredNode.spec}</div>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[9px] text-zinc-400">
                <span>Cluster: {hoveredNode.category.toUpperCase()}</span>
                <span className="text-emerald-400">Status: OPERATIONAL</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas Bottom Legend */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-cyan-400" /> Frontend Ingress
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Backend VPC & Storage
            </span>
          </div>
          <span className="hidden sm:inline">Telemetry Trace Active &bull; 100% Uptime</span>
        </div>
      </div>
    </div>
  );
}
