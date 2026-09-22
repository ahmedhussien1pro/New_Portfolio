"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Play, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
  time: string;
}

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "cyberlabs --version",
      output: (
        <div className="space-y-1 text-emerald-400">
          <div>CyberLabs Core Engine v2.4.0 [x86_64-linux]</div>
          <div className="text-zinc-400">Founder & Lead Engineer: Ahmed Hussien</div>
          <div className="text-zinc-500">Type <span className="text-emerald-400">help</span> for available commands.</div>
        </div>
      ),
      time: "11:00:01",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    const timeStr = new Date().toTimeString().split(" ")[0];

    let outputNode: React.ReactNode;

    switch (trimmed) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-zinc-300">
            <div className="text-xs font-bold text-emerald-400">Available Interactive Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-mono">
              <div><span className="text-emerald-400 font-bold">whoami</span> — Profile & founder summary</div>
              <div><span className="text-emerald-400 font-bold">skills</span> — Categorized engineering tech stack</div>
              <div><span className="text-emerald-400 font-bold">projects</span> — Shipped case studies & repos</div>
              <div><span className="text-emerald-400 font-bold">experience</span> — Career timeline & mentorship</div>
              <div><span className="text-emerald-400 font-bold">certs</span> — List verified credentials & authorities</div>
              <div><span className="text-emerald-400 font-bold">fleet</span> — CyberLabs microservices topology</div>
              <div><span className="text-emerald-400 font-bold">ping</span> — Probe live network latency</div>
              <div><span className="text-emerald-400 font-bold">clear</span> — Reset terminal history</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="space-y-1 text-zinc-300">
            <div className="font-bold text-zinc-100">Ahmed Hussien</div>
            <div className="text-emerald-400 text-xs">Full Stack Software Engineer & Founder at CyberLabs</div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Specialized in modular NestJS architectures, production Next.js App Router frontends, and cloud orchestration across DigitalOcean and Cloudflare. 15+ shipped client platforms, 140+ mentees.
            </p>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
            <div className="text-emerald-400 font-bold">Active Shipped Systems & Case Studies:</div>
            <div className="space-y-1 text-[11px] pl-2 border-l border-zinc-800">
              <div>[01] <strong className="text-zinc-100">CyberLabs Fleet:</strong> NestJS Microservices + DigitalOcean VPC</div>
              <div>[02] <strong className="text-zinc-100">Admin Dashboard V1:</strong> React, Chart.js, Tailwind CSS (Live on Vercel)</div>
              <div>[03] <strong className="text-zinc-100">Fresh Cart E-commerce:</strong> Full-Stack Storefront with Auth & Cart</div>
              <div>[04] <strong className="text-zinc-100">VS Code Clone:</strong> Monaco Editor in browser (React + Vite + TS)</div>
              <div>[05] <strong className="text-zinc-100">Eduko Platform:</strong> Next.js 16 + React 19 Frontend with CI/CD</div>
              <div>[06] <strong className="text-zinc-100">Gigaland NFT & Web3:</strong> Decentralized marketplace UI</div>
            </div>
            <div className="text-[10px] text-zinc-500 pt-1">Explore all 21 systems at /projects</div>
          </div>
        );
        break;

      case "experience":
        outputNode = (
          <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
            <div className="text-emerald-400 font-bold">Professional Career Timeline:</div>
            <div className="space-y-1 text-[11px] pl-2 border-l border-zinc-800">
              <div>&bull; <strong className="text-zinc-100">CyberLabs:</strong> Founder & System Administrator (2024–Present)</div>
              <div>&bull; <strong className="text-zinc-100">Self Employed:</strong> Freelance Engineer (15+ Client Projects Shipped)</div>
              <div>&bull; <strong className="text-zinc-100">IEEE MSB:</strong> Lead Front-End Instructor (80+ Students Mentored)</div>
              <div>&bull; <strong className="text-zinc-100">IEEE Delta Academy:</strong> Front-End Instructor (60+ Students)</div>
              <div>&bull; <strong className="text-zinc-100">ITI Menoufia:</strong> Front-End Developer Angular Track (120 hrs)</div>
            </div>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <div><strong className="text-emerald-400">Backend:</strong> NestJS, Node.js, Express, Microservices, JWT/RBAC, REST</div>
            <div><strong className="text-cyan-400">Frontend:</strong> Next.js 15/16, React 19, TypeScript, Tailwind CSS, Canvas</div>
            <div><strong className="text-indigo-400">Cloud & Ops:</strong> DigitalOcean Droplets, Cloudflare Edge/WAF, Docker, Vercel</div>
            <div><strong className="text-amber-400">Databases:</strong> MongoDB Atlas, PostgreSQL, Redis Cache</div>
          </div>
        );
        break;

      case "certs":
        outputNode = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Verified Accreditations:</span>
            </div>
            <div className="space-y-0.5 text-[11px] font-mono text-zinc-300 pl-4 border-l border-zinc-800">
              <div>&bull; ITI (CREATIVA): Front End Web Development using Angular (120 hrs)</div>
              <div>&bull; MCIT DIGITOPIA: Cybersecurity Track — Phase 2 Finisher & Solutions</div>
              <div>&bull; Google GDSC MET: Front End Engineering Track (ID: OG50-750B71H05U)</div>
              <div>&bull; Great Learning: Basics of Computer Networking (ID: KJGYQSKM)</div>
            </div>
          </div>
        );
        break;

      case "fleet":
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <div className="text-emerald-400 font-bold">CyberLabs Distributed Fleet Nodes:</div>
            <div className="text-[11px] space-y-0.5">
              <div>[01] cyberlabs-admin &rarr; Port 4001 (Zero-Trust RBAC Console)</div>
              <div>[02] cyberlabs-backend &rarr; Port 4000 (Gateway API + MongoDB Pool)</div>
              <div>[03] cyberlabs-vm-service &rarr; Port 4002 (DigitalOcean RPC Worker)</div>
              <div>[VPC] Subnet 10.114.0.0/16 &bull; Region: FRA1 (DigitalOcean)</div>
            </div>
          </div>
        );
        break;

      case "ping":
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <div className="text-emerald-400">PING cluster.cyberlabs.internal (10.114.0.12): 56 data bytes</div>
            <div>64 bytes from 10.114.0.12: icmp_seq=1 ttl=64 time=14.2 ms</div>
            <div>64 bytes from 10.114.0.12: icmp_seq=2 ttl=64 time=13.8 ms</div>
            <div>64 bytes from 10.114.0.12: icmp_seq=3 ttl=64 time=14.0 ms</div>
            <div className="text-emerald-400">--- 3 packets transmitted, 0% packet loss, min/avg/max = 13.8/14.0/14.2 ms ---</div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        outputNode = (
          <div className="text-xs text-red-400 font-mono">
            zsh: command not found: {trimmed}. Type <span className="text-emerald-400 underline cursor-pointer" onClick={() => runCommand("help")}>help</span> to see supported commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmdText,
        output: outputNode,
        time: timeStr,
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    runCommand(inputVal);
    setInputVal("");
  };

  const presetPills = ["whoami", "skills", "certs", "fleet", "ping", "clear"];

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Terminal Window Chrome */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-950/90 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Titlebar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/80 px-4 py-2.5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-zinc-400 text-[11px] font-semibold flex items-center gap-1.5">
              <TerminalIcon className="h-3.5 w-3.5 text-emerald-400" />
              <span>ahmed@cyberlabs-host: ~ (zsh)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 hidden sm:inline">Interactive REPL</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Preset Quick Actions */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-800/60 bg-zinc-900/40 px-4 py-2 text-[11px] font-mono">
          <span className="text-zinc-500 text-[10px] uppercase tracking-wider mr-1">Quick Run:</span>
          {presetPills.map((pill) => (
            <button
              key={pill}
              onClick={() => runCommand(pill)}
              className="rounded bg-zinc-800/80 hover:bg-emerald-500/20 hover:text-emerald-400 px-2 py-0.5 text-zinc-300 transition-colors cursor-pointer"
            >
              ${pill}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[380px] overflow-y-auto font-mono text-xs">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">&rarr;</span>
                <span className="text-zinc-500">[{item.time}]</span>
                <span className="text-zinc-200 font-semibold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Prompt */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-zinc-800/80 bg-zinc-900/60 px-4 py-3 font-mono text-xs"
        >
          <span className="text-emerald-400 font-bold">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'skills', 'certs', 'fleet', or 'ping'..."
            className="w-full bg-transparent text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
          />
          <button
            type="submit"
            className="text-zinc-500 hover:text-emerald-400 transition-colors p-1"
            title="Execute"
          >
            <CornerDownLeft className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
