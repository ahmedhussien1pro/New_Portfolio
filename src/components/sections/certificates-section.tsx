"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ExternalLink,
  Maximize2,
  X,
  CheckCircle2,
  ShieldCheck,
  Building,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CERTIFICATES, CertificateItem } from "@/lib/data";

interface CertificatesSectionProps {
  initialCertificates?: CertificateItem[];
}

export function CertificatesSection({ initialCertificates = CERTIFICATES }: CertificatesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxCert, setLightboxCert] = useState<CertificateItem | null>(null);

  const categories = [
    "All",
    "Government / Ministry",
    "Google / Tech Community",
    "Academy / Institute",
  ];

  const filteredCerts = initialCertificates.filter((cert) => {
    if (cert.published === false) return false;
    if (activeCategory === "All") return true;
    return cert.issuerCategory === activeCategory;
  });

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60 dark:border-zinc-800/60">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-300 backdrop-blur-md">
          <Award className="h-3.5 w-3.5 text-emerald-500" />
          <span>Accreditations & Credentials</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Official Engineering Certifications
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Verified certifications and national competition honors across frontend web development, cybersecurity, and computer networking.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeCategory === category
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs"
                  : "border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-white/40 dark:bg-zinc-900/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="group rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 overflow-hidden backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.08)]"
          >
            {/* Visual Certificate Card */}
            <div>
              <div
                onClick={() => setLightboxCert(cert)}
                className="relative aspect-video w-full overflow-hidden border-b border-zinc-200/80 dark:border-white/10 bg-zinc-950 cursor-pointer"
              >
                <Image
                  src={cert.imagePath}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Issuer Category Tag */}
                <div className="absolute top-3 left-3">
                  <span className="rounded bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                    {cert.issuerCategory}
                  </span>
                </div>

                {/* Click to Zoom Pill */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 rounded bg-zinc-950/85 px-2 py-1 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10">
                    <Maximize2 className="h-3 w-3 text-emerald-400" />
                    <span>Enlarge</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <Building className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{cert.issuer}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {cert.description}
                </p>

                {/* Tech & Skill Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Row */}
            <div className="px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <Calendar className="h-3 w-3 text-emerald-500" />
                <span>{cert.issueDate}</span>
              </div>

              {cert.verificationUrl ? (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verify Credential</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Verified Entity</span>
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxCert && (
          <div
            onClick={() => setLightboxCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-emerald-400 uppercase">
                    {lightboxCert.issuerCategory}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100">
                    {lightboxCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setLightboxCert(null)}
                  className="rounded-lg p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* High-res Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                <Image
                  src={lightboxCert.imagePath}
                  alt={lightboxCert.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div>
                  <p className="text-xs text-zinc-400">
                    Issued by <strong className="text-zinc-200">{lightboxCert.issuer}</strong> ({lightboxCert.issueDate})
                  </p>
                  {lightboxCert.credentialId && (
                    <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                      Credential ID: {lightboxCert.credentialId}
                    </p>
                  )}
                </div>

                {lightboxCert.verificationUrl && (
                  <a
                    href={lightboxCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="accent" size="sm" className="gap-2 text-xs font-semibold">
                      <span>Open Official Verification URL</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
