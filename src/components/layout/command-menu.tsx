"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FileText,
  Home,
  Laptop,
  Moon,
  Sun,
  Layers,
  Sparkles,
  Search,
  ExternalLink,
  Activity,
  Send,
  Award,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const navItems = [
    {
      title: "Home",
      icon: Home,
      action: () => router.push("/"),
      category: "Navigation",
    },
    {
      title: "Selected Projects",
      icon: Layers,
      action: () => router.push("/#projects"),
      category: "Navigation",
    },
    {
      title: "Engineering Experience & Career",
      icon: Laptop,
      action: () => router.push("/experience"),
      category: "Navigation",
    },
    {
      title: "Verified Accreditations & Certificates",
      icon: Award,
      action: () => router.push("/certificates"),
      category: "Navigation",
    },
    {
      title: "Contact & Inquiries",
      icon: Send,
      action: () => router.push("/contact"),
      category: "Navigation",
    },
    {
      title: "Portfolio Admin & CMS Studio",
      icon: ShieldCheck,
      action: () => router.push("/admin"),
      category: "Administration",
    },
    {
      title: "Download CV (Ahmed Hussien)",
      icon: FileText,
      action: () => {
        const link = document.createElement("a");
        link.href = "/Ahmed_Hussien_CV.pdf";
        link.download = "Ahmed_Hussien_CV.pdf";
        link.click();
      },
      category: "Actions",
    },
    {
      title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      icon: theme === "dark" ? Sun : Moon,
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      category: "Appearance",
    },
    {
      title: "View API Operational Status",
      icon: Activity,
      action: () => window.open("/api/health", "_blank"),
      category: "System",
    },
  ];

  const filteredItems = navItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 shadow-2xl backdrop-blur-xl z-50"
            >
              {/* Search input header */}
              <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-4 py-3">
                <Search className="mr-3 h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                <input
                  autoFocus
                  placeholder="Type a command or search (e.g., CV, Projects, Theme)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none"
                />
                <kbd className="hidden sm:inline-block rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                  ESC
                </kbd>
              </div>

              {/* Items List */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredItems.length === 0 ? (
                  <div className="p-6 text-center text-sm text-zinc-500">
                    No results found for &ldquo;{search}&rdquo;.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => runCommand(item.action)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">
                              <Icon className="h-3.5 w-3.5 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500/70">
                            {item.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 px-4 py-2 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-emerald-500" />
                  Ahmed Hussien &bull; Senior Full Stack Software Engineer
                </span>
                <span>Press ↵ to select</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
