"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  RefreshCw,
  Terminal,
  Play,
  Cpu,
  Shield,
  Zap,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  "How do you decouple microservices in NestJS?",
  "Explain your Next.js caching and revalidation strategy.",
  "How do you implement Zero-Trust VPC on DigitalOcean?",
  "How did you achieve <300ms video streaming on Canvas?",
];

export function AIVoicePlayground() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Greetings. I am Ahmed Hussien's technical assistant. You can test my architectural reasoning on microservices, caching pipelines, or cloud VPC design. You can also click the voice button below to hear any response spoken aloud.",
      timestamp: "Live",
    },
  ]);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleSpeak = (text: string) => {
    if (!synthRef.current) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    if (isPlayingVoice) {
      synthRef.current.cancel();
      setIsPlayingVoice(false);
      return;
    }

    synthRef.current.cancel(); // Stop any active speech

    // Clean markdown asterisks and backticks for smoother speech
    const cleanText = text.replace(/[*`_#]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Pick best English voice if available
    const voices = synthRef.current.getVoices();
    const preferredVoice =
      voices.find((v) => v.name.includes("Google") && v.lang.startsWith("en")) ||
      voices.find((v) => v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingVoice(true);
    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);

    synthRef.current.speak(utterance);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend.trim() }),
      });

      if (!res.ok) throw new Error("Failed to contact assistant");
      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Encountered a gateway communication timeout. Please try another query.",
          timestamp: "Error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      id="ai-playground"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/50"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-2 mb-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3.5 py-1 text-xs font-mono text-zinc-400 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>AI & Voice Synthesis Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
          The Architectural AI Playground
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Query Ahmed&apos;s Staff Engineer assistant. Integrated with browser Web Speech API (TTS) to
          synthesize and vocalize responses in real time.
        </p>
      </div>

      {/* Preset Questions Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-4xl mx-auto">
        {PRESET_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl text-xs font-mono border border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-zinc-900/50 transition-all cursor-pointer text-left"
          >
            &ldquo;{q}&rdquo;
          </button>
        ))}
      </div>

      {/* Interactive AI Terminal Console */}
      <div className="max-w-4xl mx-auto rounded-3xl border border-zinc-800/80 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-zinc-400 ml-2">
              assistant.ai &bull; Staff Engineer Inference
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Web Speech TTS Active
            </span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[420px] overflow-y-auto">
          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={i}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-zinc-500">
                    {isUser ? "You" : "Ahmed's Staff Assistant"} &bull; {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl max-w-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-zinc-800 text-zinc-100 font-mono border border-zinc-700"
                      : "bg-zinc-900/80 text-zinc-200 border border-zinc-800 font-sans"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* If assistant message, show Text-To-Speech Button */}
                  {!isUser && (
                    <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handleSpeak(msg.content)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          isPlayingVoice
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-700/60"
                        }`}
                      >
                        {isPlayingVoice ? (
                          <>
                            <VolumeX className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Stop Voice</span>
                            {/* Audio Wave Visualizer */}
                            <span className="flex items-center gap-0.5 ml-1">
                              <span className="h-2.5 w-0.5 bg-emerald-400 animate-pulse" />
                              <span className="h-4 w-0.5 bg-emerald-400 animate-pulse delay-75" />
                              <span className="h-2 w-0.5 bg-emerald-400 animate-pulse delay-150" />
                            </span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Listen to Voice (TTS)</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                        Web Speech API Engine
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 w-fit">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
              <span>Synthesizing architectural response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-zinc-900/50 border-t border-zinc-800/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask an architectural question (e.g., Explain the NestJS guard or VPC network)..."
              disabled={isLoading}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/80 transition-colors font-mono"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Dispatch</span>
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
