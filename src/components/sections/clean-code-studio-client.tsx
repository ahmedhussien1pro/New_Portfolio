"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Copy,
  Check,
  FileCode,
  Terminal,
  Shield,
  Layers,
  Cpu,
  Info,
} from "lucide-react";

export interface CodeSnippet {
  id: string;
  tabLabel: string;
  filename: string;
  language: string;
  highlightedHtml: string;
  rawCode: string;
  explanation: {
    title: string;
    summary: string;
    highlights: string[];
  };
}

interface CleanCodeStudioClientProps {
  snippets: CodeSnippet[];
}

export function CleanCodeStudioClient({ snippets }: CleanCodeStudioClientProps) {
  const [activeTabId, setActiveTabId] = useState<string>(snippets[0]?.id || "nextjs");
  const [copied, setCopied] = useState(false);

  const activeSnippet = snippets.find((s) => s.id === activeTabId) || snippets[0];

  const handleCopy = async () => {
    if (!activeSnippet) return;
    try {
      await navigator.clipboard.writeText(activeSnippet.rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* VS Code Window Container */}
      <div className="rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* VS Code Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80">
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-[11px] font-mono text-zinc-400 hidden sm:inline">
              Visual Studio Code &mdash; ahmed-hussien / production-systems
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/60 transition-colors cursor-pointer"
              title="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex items-center overflow-x-auto bg-zinc-950 border-b border-zinc-800/80 px-2 pt-2 scrollbar-none">
          {snippets.map((snippet) => {
            const isActive = snippet.id === activeTabId;
            return (
              <button
                key={snippet.id}
                onClick={() => setActiveTabId(snippet.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-mono border-t-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-zinc-900/90 border-emerald-400 text-zinc-100 font-semibold shadow-inner"
                    : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                }`}
              >
                <FileCode className={`h-3.5 w-3.5 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                <span>{snippet.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Editor Body + Side Explanation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
          {/* Code Viewer (8 cols) */}
          <div className="lg:col-span-8 p-4 sm:p-6 overflow-x-auto bg-zinc-950 font-mono text-xs sm:text-[13px] leading-relaxed selection:bg-emerald-500/30">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-900 text-[11px] text-zinc-500">
              <span className="text-zinc-400">{activeSnippet.filename}</span>
              <span className="uppercase text-[10px] text-emerald-400/80 font-bold">
                {activeSnippet.language}
              </span>
            </div>

            <div
              className="shiki-code-wrapper"
              dangerouslySetInnerHTML={{ __html: activeSnippet.highlightedHtml }}
            />
          </div>

          {/* Technical Dissection Sidebar (4 cols) */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-zinc-800/80 bg-zinc-900/30 p-5 sm:p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                <Info className="h-4 w-4" />
                <span>Architectural Analysis</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-zinc-100">
                  {activeSnippet.explanation.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {activeSnippet.explanation.summary}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
                  Engineering Highlights:
                </span>
                {activeSnippet.explanation.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 text-xs text-zinc-300 font-mono flex items-start gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status Footnote */}
            <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>Encoding: UTF-8</span>
              <span className="text-emerald-400">Production Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
