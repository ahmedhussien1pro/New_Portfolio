"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Award, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificatesSection } from "@/components/sections/certificates-section";

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Overview
          </Button>
        </Link>

        <a href="/Ahmed_Hussien_CV.pdf" download="Ahmed_Hussien_CV.pdf">
          <Button variant="outline" size="sm" className="gap-2 text-xs font-mono border-zinc-800">
            <FileDown className="h-3.5 w-3.5 text-emerald-500" />
            <span>Download Official CV</span>
          </Button>
        </a>
      </div>

      {/* Main Showcase Section */}
      <CertificatesSection />
    </div>
  );
}
