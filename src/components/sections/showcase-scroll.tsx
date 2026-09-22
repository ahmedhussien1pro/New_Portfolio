"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Activity,
  Cpu,
  Database,
  Shield,
  Zap,
  Globe,
  RefreshCw,
  Layers,
  Terminal,
  ArrowUpRight,
  Sparkles,
  Play,
  CheckCircle,
} from "lucide-react";
import { ContainerScroll } from "@/components/aceternity/container-scroll-animation";

interface ServiceStatus {
  name: string;
  runtime: string;
  port: string;
  status: "healthy" | "warning" | "scaling";
  latency: string;
  requests: string;
}

export function ShowcaseScrollSection() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "services" | "logs">("telemetry");
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
  const [reqCount, setReqCount] = useState(1420);
  const [logEntries, setLogEntries] = useState<string[]>([
    "[08:42:01.102] INGRESS: POST /api/v1/auth/verify - 200 OK (11ms)",
    "[08:42:01.144] REDIS: Cache HIT key:session_8fa931b (0.6ms)",
    "[08:42:01.201] TELEMETRY: InfluxDB batch flushed 450 data points (4ms)",
    "[08:42:01.260] WAF: Cloudflare challenge passed for IP 194.26.29.1",
  ]);

  const triggerLoadSimulation = () => {
    if (isSimulatingLoad) return;
    setIsSimulatingLoad(true);
    const target = reqCount + 850;
    setReqCount(target);
    const newLog = `[08:42:02.${Math.floor(Math.random() * 900 + 100)}] LOAD_TEST: 500 virtual threads spawned via K6 engine -> 0 errors`;
    setLogEntries((prev) => [newLog, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setIsSimulatingLoad(false);
      setReqCount(1420);
    }, 3500);
  };

  const services: ServiceStatus[] = [
    {
      name: "auth-gateway",
      runtime: "NestJS 10 + JWT Guard",
      port: ":4001",
      status: "healthy",
      latency: "8.2ms",
      requests: "482/s",
    },
    {
      name: "telemetry-stream",
      runtime: "Node.js + WebSockets",
      port: ":4002",
      status: "healthy",
      latency: "4.1ms",
      requests: "640/s",
    },
    {
      name: "cache-invalidation",
      runtime: "Redis 7.2 Cluster",
      port: ":6379",
      status: "healthy",
      latency: "0.8ms",
      requests: "1,120/s",
    },
    {
      name: "primary-db-replica",
      runtime: "MongoDB Atlas FRA1",
      port: ":27017",
      status: "healthy",
      latency: "14.6ms",
      requests: "310/s",
    },
  ];

  return (
    <section className="relative w-full border-t border-zinc-800/50 bg-black/40 overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/80 px-4 py-1.5 text-xs font-mono text-zinc-400 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Showcase &bull; The Beast Mode Experience</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-100">
              CyberLabs Fleet Telemetry
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Scroll down to unfold the perspective 3D viewport. Interact directly with live production
              metrics, switch telemetry clusters, and simulate server load.
            </p>
          </div>
        }
      >
        {/* Interactive MacBook Inside Screen Simulation */}
        <div className="w-full h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans select-none overflow-hidden rounded-xl border border-zinc-800/80 shadow-2xl">
          {/* OS Window Chrome Bar */}
          <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 bg-zinc-900/90 border-b border-zinc-800/80">
            {/* Window Traffic Lights */}
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Browser URL Bar */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800/80 text-[11px] font-mono text-zinc-400 w-80 max-w-xs justify-center">
              <Shield className="h-3 w-3 text-emerald-400" />
              <span className="text-zinc-500">https://</span>
              <span className="text-zinc-200">fleet.cyberlabs.cloud/telemetry</span>
            </div>

            {/* Live Server Ping & Region */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                14ms
              </span>
              <span className="hidden sm:inline text-zinc-500 border-l border-zinc-800 pl-2">
                FRA1-VPC
              </span>
            </div>
          </div>

          {/* Interior App Header & Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 bg-zinc-900/40 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Cpu className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight">CyberLabs Ops Console</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                v3.4.2-prod
              </span>
            </div>

            {/* Tab Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab("telemetry")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === "telemetry"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                Telemetry
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === "services"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                Fleet Nodes
              </button>
              <button
                onClick={() => setActiveTab("logs")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === "logs"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                Live Streams
              </button>

              {/* Action Button: Dispatch Load */}
              <button
                onClick={triggerLoadSimulation}
                disabled={isSimulatingLoad}
                className={`ml-2 px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSimulatingLoad
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                }`}
                title="Click to simulate 500 virtual users load"
              >
                {isSimulatingLoad ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin text-amber-400" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 text-emerald-400" />
                    <span className="hidden sm:inline">Dispatch Load</span>
                    <span className="sm:hidden">Test</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Screen Body Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Throughput</span>
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div className="mt-1 text-lg sm:text-2xl font-bold font-mono text-zinc-100">
                  {reqCount.toLocaleString()} <span className="text-xs font-normal text-zinc-500">req/s</span>
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5">
                  {isSimulatingLoad ? "+60% load spike" : "+12.4% vs peak"}
                </div>
              </div>

              <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Avg Latency</span>
                  <Zap className="h-3.5 w-3.5 text-cyan-400" />
                </div>
                <div className="mt-1 text-lg sm:text-2xl font-bold font-mono text-zinc-100">
                  14.2 <span className="text-xs font-normal text-zinc-500">ms</span>
                </div>
                <div className="text-[10px] text-cyan-400 mt-0.5">P99 &lt; 28.5ms</div>
              </div>

              <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>SLA Uptime</span>
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div className="mt-1 text-lg sm:text-2xl font-bold font-mono text-zinc-100">99.99%</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">0 incidents (365d)</div>
              </div>

              <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>VPC Memory</span>
                  <Server className="h-3.5 w-3.5 text-purple-400" />
                </div>
                <div className="mt-1 text-lg sm:text-2xl font-bold font-mono text-zinc-100">
                  {isSimulatingLoad ? "68.4%" : "42.8%"}
                </div>
                <div className="text-[10px] text-purple-400 mt-0.5">4.1 GB / 8 GB</div>
              </div>
            </div>

            {/* Active Tab View */}
            <AnimatePresence mode="wait">
              {activeTab === "telemetry" && (
                <motion.div
                  key="tab-telemetry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {/* Realtime Traffic Visualization Bars */}
                  <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                      <span className="flex items-center gap-1.5 text-zinc-200">
                        <Activity className="h-3.5 w-3.5 text-emerald-400" />
                        Cluster Ingress Load Distribution
                      </span>
                      <span className="text-[10px] text-emerald-400">Stream: Active</span>
                    </div>

                    {/* CSS Animated Activity Bars */}
                    <div className="flex items-end gap-1.5 h-20 pt-2">
                      {[
                        35, 48, 62, 40, 75, 55, 68, 82, 45, 90, 60, 48, 70, 85, 95, 52, 64, 78, 88, 42,
                        65, 74, 82, 58, 69, 84, 91, 56, 72, 85, 96, 60,
                      ].map((val, i) => {
                        const boostedVal = isSimulatingLoad ? Math.min(100, val + 25) : val;
                        return (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-emerald-500/30 hover:bg-emerald-400 transition-all duration-300 relative group"
                            style={{ height: `${boostedVal}%` }}
                          >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 px-1 py-0.5 rounded text-[8px] font-mono text-zinc-300 pointer-events-none">
                              {boostedVal}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Architecture Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                    <div className="p-2.5 rounded-lg border border-zinc-800/70 bg-zinc-900/30 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-zinc-200 font-bold">Zero-Trust WAF</div>
                        <div className="text-zinc-500 text-[10px]">Cloudflare TLS 1.3 Strict</div>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-zinc-800/70 bg-zinc-900/30 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-zinc-200 font-bold">Microservice Mesh</div>
                        <div className="text-zinc-500 text-[10px]">NestJS + Docker Bridge</div>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-zinc-800/70 bg-zinc-900/30 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-zinc-200 font-bold">Stateless Auth</div>
                        <div className="text-zinc-500 text-[10px]">JWT + Redis Revocation</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "services" && (
                <motion.div
                  key="tab-services"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-zinc-800/80 overflow-hidden bg-zinc-900/30"
                >
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-zinc-900/80 border-b border-zinc-800 text-[10px] text-zinc-400 uppercase">
                      <tr>
                        <th className="px-3 py-2">Service</th>
                        <th className="px-3 py-2 hidden sm:table-cell">Stack</th>
                        <th className="px-3 py-2">Port</th>
                        <th className="px-3 py-2">Latency</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      {services.map((svc) => (
                        <tr key={svc.name} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-3 py-2.5 font-bold text-zinc-100 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            {svc.name}
                          </td>
                          <td className="px-3 py-2.5 text-zinc-400 hidden sm:table-cell">{svc.runtime}</td>
                          <td className="px-3 py-2.5 text-emerald-400/80">{svc.port}</td>
                          <td className="px-3 py-2.5">{svc.latency}</td>
                          <td className="px-3 py-2.5">
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              ONLINE
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {activeTab === "logs" && (
                <motion.div
                  key="tab-logs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-950 font-mono text-[11px] space-y-1.5 text-zinc-400"
                >
                  <div className="flex items-center justify-between text-zinc-500 text-[10px] pb-1 border-b border-zinc-900">
                    <span>Cluster Live Log Stream (stdout)</span>
                    <span className="text-emerald-400">Connected</span>
                  </div>
                  {logEntries.map((log, idx) => (
                    <div key={idx} className="leading-snug truncate hover:text-zinc-200">
                      {log}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
