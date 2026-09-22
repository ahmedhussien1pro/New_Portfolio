import React from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export async function CodeBlock({
  code,
  language = "typescript",
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang: language,
    theme: "github-dark-dimmed",
  });

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-2xl text-xs font-mono">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700 inline-block" />
            <span className="text-[11px] font-medium text-zinc-300">{filename}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
            {language}
          </span>
        </div>
      )}
      <div
        className="p-4 overflow-x-auto selection:bg-emerald-500/30 leading-relaxed text-[13px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
