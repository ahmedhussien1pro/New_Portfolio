"use client";

import React, { useState } from "react";
import {
  Terminal,
  Cloud,
  Server,
  Database,
  Cpu,
  Shield,
  ArrowRight,
  Radio,
  Lock,
  Network,
  Layers,
  Sparkles,
  CheckCircle2,
  Play,
  Activity,
  CornerDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SystemNode {
  id: string;
  label: string;
  sublabel: string;
  type: "client" | "edge" | "gateway" | "service" | "compute" | "database";
  port?: string;
  protocol: string;
  zone: "Public Internet" | "Cloudflare Edge" | "Private VPC Subnet" | "Managed Cloud";
  details: string;
}

export interface SystemLink {
  from: string;
  to: string;
  protocol: string;
  security: string;
  direction?: "forward" | "bidirectional";
}

interface ArchitectureDiagramProps {
  projectId: string;
  title?: string;
}

const PROJECT_ARCHITECTURES: Record<
  string,
  {
    nodes: SystemNode[];
    links: SystemLink[];
    description: string;
  }
> = {
  cyberlabs: {
    description:
      "Exact data flow and network isolation topology for the CyberLabs Microservices Fleet across Cloudflare Edge and DigitalOcean Private VPC.",
    nodes: [
      {
        id: "admin-client",
        label: "Admin Client",
        sublabel: "Privileged Dashboard Browser",
        type: "client",
        protocol: "TLS 1.3 / HTTPS",
        port: "Port 443",
        zone: "Public Internet",
        details: "Authenticated administrative user initiating cluster operations and VM controls.",
      },
      {
        id: "cloudflare-edge",
        label: "Cloudflare Edge",
        sublabel: "WAF & Zero-Trust Ingress",
        type: "edge",
        protocol: "HTTP/3 & DDoS Filter",
        port: "Anycast Edge",
        zone: "Cloudflare Edge",
        details: "Shields internal droplet IPs, inspects headers for bot mitigation, and terminates SSL.",
      },
      {
        id: "nextjs-console",
        label: "Next.js 15 Console",
        sublabel: "cyberlabs-admin Web Gateway",
        type: "gateway",
        protocol: "Server Actions / HTTP/2",
        port: "Port 4001",
        zone: "Private VPC Subnet",
        details: "Renders server components and issues cryptographically signed JWT requests to NestJS.",
      },
      {
        id: "nestjs-api",
        label: "NestJS API Gateway",
        sublabel: "backend Core Controller",
        type: "service",
        protocol: "REST & ExecutionContext RBAC",
        port: "Port 4000",
        zone: "Private VPC Subnet",
        details: "Executes RolesGuard, validates token scopes, and routes compute commands to microservices.",
      },
      {
        id: "vm-service",
        label: "VM-Service Node",
        sublabel: "Compute Droplet Orchestrator",
        type: "compute",
        protocol: "Private VPC RPC",
        port: "Port 4002",
        zone: "Private VPC Subnet",
        details: "Directly provisions, starts, and monitors isolated cloud compute nodes on DigitalOcean.",
      },
      {
        id: "mongodb-atlas",
        label: "MongoDB Atlas",
        sublabel: "Multi-Region Sharded Replicas",
        type: "database",
        protocol: "mongodb+srv (TLS)",
        port: "Port 27017",
        zone: "Managed Cloud",
        details: "State persistence with replica read preferences and connection pooling via Mongoose.",
      },
    ],
    links: [
      {
        from: "Admin Client",
        to: "Cloudflare Edge",
        protocol: "HTTPS / TLS 1.3",
        security: "Zero-Trust Edge Tunnel",
      },
      {
        from: "Cloudflare Edge",
        to: "Next.js 15 Console",
        protocol: "Reverse Proxy HTTP/2",
        security: "Origin CA Verification",
      },
      {
        from: "Next.js 15 Console",
        to: "NestJS API Gateway",
        protocol: "JWT Bearer / mTLS",
        security: "Internal VPC 10.114.0.0/16",
      },
      {
        from: "NestJS API Gateway",
        to: "VM-Service Node",
        protocol: "Private VPC RPC",
        security: "Isolated IAM Node Access",
      },
      {
        from: "NestJS API Gateway",
        to: "MongoDB Atlas",
        protocol: "mongodb+srv Connection Pool",
        security: "IP Access List & TLS 1.3",
      },
    ],
  },
  eduko: {
    description:
      "Global edge content delivery and on-demand cache revalidation pipeline for the Eduko Learning Platform.",
    nodes: [
      {
        id: "learner-client",
        label: "Learner Client",
        sublabel: "Web & Mobile Browser",
        type: "client",
        protocol: "HTTP/3 / HTTPS",
        port: "Port 443",
        zone: "Public Internet",
        details: "Interacts with high-speed course catalogs and submits assessments.",
      },
      {
        id: "vercel-edge",
        label: "Vercel Global Edge",
        sublabel: "CDN & Serverless Ingress",
        type: "edge",
        protocol: "Global Anycast Edge",
        port: "Edge Network",
        zone: "Cloudflare Edge",
        details: "Caches static assets and routes dynamic requests to nearest edge region.",
      },
      {
        id: "nextjs-app",
        label: "Next.js 16 App Router",
        sublabel: "React 19 Server Components",
        type: "gateway",
        protocol: "RSC Streaming & Server Actions",
        port: "Edge Runtime",
        zone: "Private VPC Subnet",
        details: "Executes on-demand data fetching with revalidateTag('course-[id]') cache purging.",
      },
      {
        id: "api-backend",
        label: "REST API Backend",
        sublabel: "Node.js Enterprise Service",
        type: "service",
        protocol: "RESTful JSON API",
        port: "Port 5000",
        zone: "Private VPC Subnet",
        details: "Processes enrollments, student state, and auth session tokens.",
      },
      {
        id: "postgres-redis",
        label: "PostgreSQL & Redis",
        sublabel: "Persistence & Edge Cache",
        type: "database",
        protocol: "PostgreSQL Pool + Redis WSS",
        port: "Port 5432 / 6379",
        zone: "Managed Cloud",
        details: "Relational course curriculum schema managed with Prisma ORM.",
      },
    ],
    links: [
      { from: "Learner Client", to: "Vercel Global Edge", protocol: "HTTP/3 TLS", security: "Global Anycast" },
      { from: "Vercel Global Edge", to: "Next.js 16 App Router", protocol: "RSC Streaming", security: "Edge Serverless" },
      { from: "Next.js 16 App Router", to: "REST API Backend", protocol: "Internal Token Auth", security: "Private Subnet" },
      { from: "REST API Backend", to: "PostgreSQL & Redis", protocol: "Prisma Connection Pool", security: "SSL Encrypted" },
    ],
  },
  "streaming-dashboards": {
    description:
      "Low-latency RTSP ingestion pipeline streaming live binary video frames into HTML5 Canvas with automated Arabic TTS voiceover.",
    nodes: [
      {
        id: "rtsp-camera",
        label: "IP Video Streamer",
        sublabel: "Surveillance Camera Feed",
        type: "client",
        protocol: "RTSP / TCP",
        port: "Port 554",
        zone: "Public Internet",
        details: "Continuous raw H.264 video feed transmitting surveillance telemetry.",
      },
      {
        id: "media-gateway",
        label: "Edge Media Gateway",
        sublabel: "Dockerized Ingestion Proxy",
        type: "compute",
        protocol: "RTSP Demuxer",
        port: "Port 8554",
        zone: "Private VPC Subnet",
        details: "Repackages raw RTSP streams into binary JPEG / ArrayBuffer packets without slow HLS segmenting.",
      },
      {
        id: "websocket-server",
        label: "WebSocket Relay",
        sublabel: "Low-Latency Stream Gateway",
        type: "service",
        protocol: "WSS (Secure WebSocket)",
        port: "Port 8080",
        zone: "Private VPC Subnet",
        details: "Maintains active WebSocket socket sessions with client dashboards (<300ms latency).",
      },
      {
        id: "react-canvas",
        label: "React Canvas Client",
        sublabel: "Hardware-Accelerated Blitter",
        type: "gateway",
        protocol: "GPU Context (ctx.drawImage)",
        port: "Browser DOM",
        zone: "Public Internet",
        details: "Directly blits raw Uint8Array frames onto HTML5 Canvas at 60 FPS without DOM lag.",
      },
      {
        id: "arabic-tts",
        label: "Arabic TTS Voice API",
        sublabel: "Voice Synthesis Engine",
        type: "database",
        protocol: "Neural TTS REST API",
        port: "Port 443",
        zone: "Managed Cloud",
        details: "Synthesizes real-time Arabic spoken alerts for critical perimeter and operational breaches.",
      },
    ],
    links: [
      { from: "IP Video Streamer", to: "Edge Media Gateway", protocol: "RTSP / TCP", security: "Digest Authentication" },
      { from: "Edge Media Gateway", to: "WebSocket Relay", protocol: "Binary ArrayBuffer", security: "Internal Docker Network" },
      { from: "WebSocket Relay", to: "React Canvas Client", protocol: "Secure WSS Stream", security: "Signed Stream Tokens" },
      { from: "WebSocket Relay", to: "Arabic TTS Voice API", protocol: "REST Webhook", security: "API Secret Key" },
    ],
  },
};

export function ArchitectureDiagram({ projectId, title }: ArchitectureDiagramProps) {
  const data = PROJECT_ARCHITECTURES[projectId] || PROJECT_ARCHITECTURES.cyberlabs;
  const [selectedNode, setSelectedNode] = useState<SystemNode>(data.nodes[0]);
  const [hoveredLink, setHoveredLink] = useState<SystemLink | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number | null>(null);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const startSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimStep(0);
    setSelectedNode(data.nodes[0]);
    setSimLogs([`[0ms] 🚀 Initiating distributed request trace from ${data.nodes[0].label}...`]);

    data.nodes.forEach((node, idx) => {
      setTimeout(() => {
        setSimStep(idx);
        setSelectedNode(node);
        const elapsed = (idx + 1) * 7 + Math.floor(Math.random() * 4);
        setSimLogs((prev) => [
          ...prev,
          `[+${elapsed}ms] ⚡ Reached [${node.label}] (${node.zone}) &bull; ${node.protocol}`,
        ]);

        if (idx === data.nodes.length - 1) {
          setTimeout(() => {
            setSimLogs((prev) => [
              ...prev,
              `[COMPLETE] Full lifecycle latency: ${elapsed + 5}ms. Cluster response verified with HTTP 200 OK.`,
            ]);
            setSimulating(false);
          }, 700);
        }
      }, (idx + 1) * 650);
    });
  };

  const getNodeIcon = (type: SystemNode["type"]) => {
    switch (type) {
      case "client":
        return Terminal;
      case "edge":
        return Cloud;
      case "gateway":
        return Layers;
      case "service":
        return Server;
      case "compute":
        return Cpu;
      case "database":
        return Database;
      default:
        return Network;
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 p-6 sm:p-7 backdrop-blur-xl shadow-lg space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {title || "System Architecture & Network Flow"}
            </h3>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            {data.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="accent"
            size="sm"
            onClick={startSimulation}
            disabled={simulating}
            className="gap-1.5 text-xs font-mono font-semibold cursor-pointer shadow-sm"
          >
            <Play className={`h-3 w-3 ${simulating ? "animate-spin" : ""}`} />
            <span>{simulating ? "Tracing Request..." : "Simulate Live Trace"}</span>
          </Button>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 shrink-0">
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>VPC 10.114.0.0/16</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Architecture Schematic Canvas */}
      <div className="space-y-4">
        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
          <span>Click any node to inspect port, protocol, and isolation zone:</span>
          <span>Active: <strong className="text-emerald-500">{selectedNode.label}</strong></span>
        </div>

        {/* Responsive Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {data.nodes.map((node, idx) => {
            const IconComponent = getNodeIcon(node.type);
            const isSelected = selectedNode.id === node.id;
            const isSimActive = simStep === idx;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`rounded-xl border p-4 transition-all duration-300 cursor-pointer text-left relative group ${
                  isSimActive
                    ? "border-emerald-400 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400 scale-[1.02]"
                    : isSelected
                    ? "border-emerald-500 bg-emerald-500/[0.06] shadow-[0_0_20px_rgba(16,185,129,0.12)] ring-1 ring-emerald-500/50"
                    : "border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                {/* Node Step Index & Zone */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-mono font-bold ${
                      isSimActive
                        ? "bg-emerald-500 text-zinc-950 animate-bounce"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:text-emerald-500"
                    }`}>
                      0{idx + 1}
                    </span>
                    {isSimActive && (
                      <span className="rounded bg-emerald-500 px-1.5 py-0.2 text-[9px] font-mono font-bold text-zinc-950 animate-pulse">
                        PACKET INGRESS
                      </span>
                    )}
                  </div>
                  <span className="rounded bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[9px] font-mono text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                    {node.zone}
                  </span>
                </div>

                {/* Node Label & Sublabel */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {node.label}
                    </div>
                    <div className="text-[10px] text-zinc-500 truncate">
                      {node.sublabel}
                    </div>
                  </div>
                </div>

                {/* Protocol & Port Badge */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="truncate">{node.protocol}</span>
                  {node.port && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium shrink-0 ml-1">
                      {node.port}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Detailed Inspector */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.03] p-4 text-xs font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-2.5 mb-2.5">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span>Node Inspector: {selectedNode.label} ({selectedNode.sublabel})</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <span>Security Zone:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedNode.zone}</span>
            </div>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans text-xs">
            {selectedNode.details}
          </p>
        </div>
      </div>

      {/* Sequential Network Protocol Pipeline */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
          <Network className="h-3.5 w-3.5 text-emerald-500" />
          <span>Sequential Inter-Service Ingress & Egress</span>
        </div>

        <div className="space-y-2">
          {data.links.map((link, lIdx) => (
            <div
              key={lIdx}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/40 px-3.5 py-2.5 text-xs font-mono transition-colors hover:border-emerald-500/40"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {link.from}
                </span>
                <ArrowRight className="h-3 w-3 text-emerald-500 shrink-0" />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {link.to}
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto text-[11px]">
                <span className="rounded bg-zinc-200/70 dark:bg-zinc-800 px-2 py-0.5 text-zinc-700 dark:text-zinc-300">
                  {link.protocol}
                </span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {link.security}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Telemetry Simulation Output */}
      {simLogs.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              <span>Live Distributed Request Trace Stream</span>
            </div>
            <span>Protocol: Distributed IPC</span>
          </div>

          <div className="space-y-1 text-[11px] max-h-40 overflow-y-auto">
            {simLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CornerDownRight className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className={idx === simLogs.length - 1 ? "text-emerald-400 font-semibold" : "text-zinc-400"}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
