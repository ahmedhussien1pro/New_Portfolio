"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  ShieldCheck,
  Layers,
  Award,
  Briefcase,
  Wrench,
  User,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Download,
  Upload,
  Save,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioStoreData } from "@/lib/store";
import { ProjectCaseStudy, ExperienceRole, CertificateItem } from "@/lib/data";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "certificates" | "experiences" | "skills" | "profile"
  >("overview");

  const [data, setData] = useState<PortfolioStoreData | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit / Modal States
  const [editingProject, setEditingProject] = useState<ProjectCaseStudy | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<CertificateItem | null>(null);
  const [editingExperience, setEditingExperience] = useState<ExperienceRole | null>(null);

  // Auto-login from localStorage if available
  useEffect(() => {
    const savedToken = localStorage.getItem("cyberlabs_admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchPortfolioData(savedToken);
    }
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      showToast("Uploading asset...", "success");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        callback(data.url);
        showToast("Image uploaded successfully!", "success");
      } else {
        showToast("Upload failed", "error");
      }
    } catch {
      showToast("Upload network error", "error");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const resData = await res.json();
      if (res.ok && resData.token) {
        setToken(resData.token);
        localStorage.setItem("cyberlabs_admin_token", resData.token);
        fetchPortfolioData(resData.token);
      } else {
        setAuthError(resData.message || "Invalid administrative passcode");
      }
    } catch {
      setAuthError("Failed to connect to authentication gateway");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("cyberlabs_admin_token");
  };

  const fetchPortfolioData = async (authToken: string) => {
    try {
      const res = await fetch("/api/portfolio?all=true", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const store = await res.json();
        setData(store);
      }
    } catch (err) {
      console.error("Failed to load portfolio data", err);
    }
  };

  const saveStoreChanges = async (updatedData: PortfolioStoreData, toastText = "Changes saved and live across portfolio") => {
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setData(updatedData);
        showToast(toastText, "success");
      } else {
        showToast("Failed to save changes", "error");
      }
    } catch {
      showToast("Error updating database", "error");
    } finally {
      setSaving(false);
    }
  };

  // -------------------------------------------------------------
  // PROJECT ACTIONS (Add, Edit, Delete, Toggle Publish)
  // -------------------------------------------------------------
  const toggleProjectPublish = (projectId: string) => {
    if (!data) return;
    const updatedProjects = data.projects.map((p) => {
      if (p.id === projectId) {
        const newStatus = p.published === false ? true : false;
        return { ...p, published: newStatus };
      }
      return p;
    });

    const updatedData = { ...data, projects: updatedProjects };
    saveStoreChanges(updatedData, "Project status updated");
  };

  const handleDeleteProject = (projectId: string) => {
    if (!data) return;
    if (!confirm(`Are you sure you want to delete project: ${projectId}?`)) return;
    const updatedProjects = data.projects.filter((p) => p.id !== projectId);
    const updatedData = { ...data, projects: updatedProjects };
    saveStoreChanges(updatedData, "Project removed");
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !editingProject) return;

    const existingIndex = data.projects.findIndex((p) => p.id === editingProject.id);
    let updatedProjects: ProjectCaseStudy[];

    if (existingIndex >= 0) {
      updatedProjects = [...data.projects];
      updatedProjects[existingIndex] = editingProject;
    } else {
      updatedProjects = [editingProject, ...data.projects];
    }

    const updatedData = { ...data, projects: updatedProjects };
    saveStoreChanges(updatedData, `Project "${editingProject.title}" saved!`);
    setEditingProject(null);
  };

  // -------------------------------------------------------------
  // CERTIFICATE ACTIONS (Add, Edit, Delete, Toggle Publish)
  // -------------------------------------------------------------
  const toggleCertificatePublish = (certId: string) => {
    if (!data) return;
    const updatedCerts = data.certificates.map((c) => {
      if (c.id === certId) {
        return { ...c, published: !c.published };
      }
      return c;
    });
    const updatedData = { ...data, certificates: updatedCerts };
    saveStoreChanges(updatedData, "Certificate visibility updated");
  };

  const handleDeleteCertificate = (certId: string) => {
    if (!data) return;
    if (!confirm(`Delete certificate: ${certId}?`)) return;
    const updatedCerts = data.certificates.filter((c) => c.id !== certId);
    const updatedData = { ...data, certificates: updatedCerts };
    saveStoreChanges(updatedData, "Certificate removed");
  };

  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !editingCertificate) return;

    const existingIndex = data.certificates.findIndex((c) => c.id === editingCertificate.id);
    let updatedCerts: CertificateItem[];

    if (existingIndex >= 0) {
      updatedCerts = [...data.certificates];
      updatedCerts[existingIndex] = editingCertificate;
    } else {
      updatedCerts = [editingCertificate, ...data.certificates];
    }

    const updatedData = { ...data, certificates: updatedCerts };
    saveStoreChanges(updatedData, `Certificate "${editingCertificate.title}" saved!`);
    setEditingCertificate(null);
  };

  // -------------------------------------------------------------
  // BACKUP EXPORT
  // -------------------------------------------------------------
  const exportBackupJson = () => {
    if (!data) return;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cyberlabs-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup exported successfully", "success");
  };

  // =========================================================================
  // VIEW: AUTHENTICATION BARRIER
  // =========================================================================
  if (!token) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-2xl shadow-2xl space-y-6"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-inner">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
              CyberLabs Admin Studio
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Restricted management gateway for Ahmed Hussien
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300">Administrative Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter master passcode..."
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="accent"
              className="w-full py-2.5 text-xs font-semibold cursor-pointer"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Unlock Studio Console &rarr;"}
            </Button>

            <div className="pt-2 text-center">
              <span className="text-[11px] font-mono text-zinc-500">
                Default Local Passcode: <code className="text-emerald-400">cyberlabs2026</code>
              </span>
            </div>
          </form>

          <div className="pt-2 border-t border-zinc-800 text-center">
            <Link href="/" className="text-xs font-mono text-zinc-500 hover:text-zinc-300">
              &larr; Return to Public Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: MAIN ADMIN STUDIO
  // =========================================================================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-xs font-mono shadow-2xl backdrop-blur-xl ${
              statusMessage.type === "success"
                ? "border-emerald-500/40 bg-zinc-900/90 text-emerald-400"
                : "border-red-500/40 bg-zinc-900/90 text-red-400"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{statusMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Studio Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-zinc-100 text-sm sm:text-base">
                  CyberLabs Studio
                </span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                  Dynamic CMS
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Connected: Ahmed Hussien Master Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={exportBackupJson}
              className="gap-1.5 text-xs font-mono border-zinc-800 bg-zinc-900 hover:border-zinc-700"
            >
              <Download className="h-3.5 w-3.5 text-zinc-400" />
              <span>Backup JSON</span>
            </Button>

            <Link href="/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs font-mono border-zinc-800 bg-zinc-900 hover:border-zinc-700"
              >
                <span>Live Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-zinc-800 pb-4 mb-8">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "projects", label: `Projects (${data?.projects.length || 0})`, icon: FolderGit2Icon },
            { id: "certificates", label: `Certificates (${data?.certificates.length || 0})`, icon: Award },
            { id: "experiences", label: `Experience (${data?.experiences.length || 0})`, icon: Briefcase },
            { id: "skills", label: "Skills & Tech", icon: Wrench },
            { id: "profile", label: "Profile & Bio", icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-zinc-100 text-zinc-950 font-bold shadow-xs"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: OVERVIEW
            ========================================================================= */}
        {activeTab === "overview" && data && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 space-y-1 backdrop-blur-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  Total Case Studies
                </span>
                <div className="text-3xl font-bold text-zinc-100">{data.projects.length}</div>
                <div className="text-[11px] font-mono text-emerald-400">
                  {data.projects.filter((p) => p.published !== false).length} Live on Website
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 space-y-1 backdrop-blur-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  Official Certificates
                </span>
                <div className="text-3xl font-bold text-zinc-100">{data.certificates.length}</div>
                <div className="text-[11px] font-mono text-emerald-400">
                  {data.certificates.filter((c) => c.published).length} Published Credentials
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 space-y-1 backdrop-blur-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  Experience Milestones
                </span>
                <div className="text-3xl font-bold text-zinc-100">{data.experiences.length}</div>
                <div className="text-[11px] font-mono text-zinc-400">Chronological Roles</div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 space-y-1 backdrop-blur-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  System Status
                </span>
                <div className="text-xl font-bold text-emerald-400 capitalize">
                  {data.profile.availabilityStatus || "Available"}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 truncate">
                  {data.profile.statusText || "Open to roles"}
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 font-mono">
                Quick Production Shortcuts
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => {
                    setEditingProject({
                      id: `project-${Date.now().toString().slice(-4)}`,
                      title: "New Production Service",
                      subtitle: "Microservice / Frontend Application",
                      tagline: "High-scale decoupled platform with strict typing.",
                      category: "Backend Architecture",
                      architectureLayers: ["NestJS", "Cloudflare", "MongoDB Atlas"],
                      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                      overview: "Overview of system architecture.",
                      problem: "Performance and scalability challenge solved.",
                      architectureDetails: { frontend: "", backend: "", infrastructure: "", data: "" },
                      architectureFlow: [],
                      engineeringDecisions: [],
                      codeArtifact: { filename: "service.ts", language: "typescript", description: "Implementation", code: "// Production code" },
                      highlightRepos: [],
                      screens: [],
                      published: true,
                    });
                    setActiveTab("projects");
                  }}
                  className="gap-2 text-xs font-semibold"
                >
                  <Plus className="h-4 w-4" /> Add New Project
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingCertificate({
                      id: `cert-${Date.now().toString().slice(-4)}`,
                      title: "Accredited Technical Certification",
                      issuer: "Accrediting Body",
                      issuerCategory: "Academy / Institute",
                      issueDate: "2025",
                      imagePath: "/certificates/iti-angular.jpeg",
                      tags: ["Full Stack", "Engineering"],
                      description: "Engineering accreditation details.",
                      published: true,
                    });
                    setActiveTab("certificates");
                  }}
                  className="gap-2 text-xs font-mono border-zinc-800"
                >
                  <Plus className="h-4 w-4" /> Add Certificate
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: PROJECTS MANAGER (Add, Edit, Delete, Toggle Publish/Draft)
            ========================================================================= */}
        {activeTab === "projects" && data && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">Project Case Studies</h2>
                <p className="text-xs font-mono text-zinc-400">
                  Control which case studies are published live or drafted (مهمش).
                </p>
              </div>

              <Button
                variant="accent"
                size="sm"
                onClick={() =>
                  setEditingProject({
                    id: `project-${Date.now().toString().slice(-4)}`,
                    title: "",
                    subtitle: "",
                    tagline: "",
                    category: "Backend Architecture",
                    architectureLayers: ["NestJS", "TypeScript"],
                    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                    overview: "",
                    problem: "",
                    architectureDetails: { frontend: "", backend: "", infrastructure: "", data: "" },
                    architectureFlow: [],
                    engineeringDecisions: [],
                    codeArtifact: { filename: "service.ts", language: "typescript", description: "Implementation", code: "// code" },
                    highlightRepos: [],
                    screens: [],
                    published: true,
                  })
                }
                className="gap-1.5 text-xs font-semibold self-start"
              >
                <Plus className="h-4 w-4" /> Add Project
              </Button>
            </div>

            {/* Projects Table / Cards */}
            <div className="space-y-4">
              {data.projects.map((project) => {
                const isPublished = project.published !== false;
                return (
                  <div
                    key={project.id}
                    className={`rounded-xl border p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isPublished
                        ? "border-zinc-800/80 bg-zinc-900/60"
                        : "border-zinc-800/40 bg-zinc-950/80 opacity-70"
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      {project.coverImage && (
                        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-zinc-100">
                            {project.title}
                          </span>
                          <span className="text-xs font-mono text-zinc-500">
                            ID: {project.id}
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-mono ${
                              isPublished
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {isPublished ? "Live / Published" : "Draft / مهمش"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1 max-w-xl">
                          {project.tagline || project.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleProjectPublish(project.id)}
                        className={`gap-1 text-xs font-mono border-zinc-800 ${
                          isPublished
                            ? "text-amber-400 hover:text-amber-300"
                            : "text-emerald-400 hover:text-emerald-300"
                        }`}
                      >
                        {isPublished ? (
                          <>
                            <EyeOff className="h-3.5 w-3.5" />
                            <span>تأجيل/Draft</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-3.5 w-3.5" />
                            <span>نشر/Publish</span>
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProject(project)}
                        className="gap-1 text-xs font-mono border-zinc-800 text-zinc-300 hover:text-zinc-100"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal for Editing / Creating Project */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
                <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <h3 className="text-lg font-bold text-zinc-100">
                      {data.projects.some((p) => p.id === editingProject.id)
                        ? `Edit Project: ${editingProject.title}`
                        : "Create New Project"}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingProject(null)}
                      className="text-zinc-400 hover:text-zinc-100"
                    >
                      Close
                    </Button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">Project ID (slug)</label>
                        <input
                          type="text"
                          value={editingProject.id}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, id: e.target.value })
                          }
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-100"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">Category</label>
                        <select
                          value={editingProject.category}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              category: e.target.value as any,
                            })
                          }
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-100"
                        >
                          <option value="Backend Architecture">Backend Architecture</option>
                          <option value="Frontend Engineering">Frontend Engineering</option>
                          <option value="Real-Time Systems">Real-Time Systems</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Project Title</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 font-semibold"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Subtitle</label>
                      <input
                        type="text"
                        value={editingProject.subtitle}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, subtitle: e.target.value })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-emerald-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Tagline</label>
                      <textarea
                        value={editingProject.tagline}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, tagline: e.target.value })
                        }
                        rows={2}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">Live URL</label>
                        <input
                          type="url"
                          value={editingProject.liveUrl || ""}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, liveUrl: e.target.value })
                          }
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">GitHub URL</label>
                        <input
                          type="url"
                          value={editingProject.githubUrl || ""}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, githubUrl: e.target.value })
                          }
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-zinc-400">Cover Image URL</label>
                        <label className="cursor-pointer text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1">
                          <Upload className="h-3 w-3" />
                          <span>Upload Local Asset</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (url) =>
                                setEditingProject({ ...editingProject, coverImage: url })
                              )
                            }
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={editingProject.coverImage}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, coverImage: e.target.value })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Architecture Layers (comma-separated)</label>
                      <input
                        type="text"
                        value={editingProject.architectureLayers.join(", ")}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            architectureLayers: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProject(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="accent"
                        size="sm"
                        className="gap-1.5"
                        disabled={saving}
                      >
                        <Save className="h-4 w-4" />
                        <span>{saving ? "Saving..." : "Save Project"}</span>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3: CERTIFICATES MANAGER
            ========================================================================= */}
        {activeTab === "certificates" && data && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">Certificates & Accreditations</h2>
                <p className="text-xs font-mono text-zinc-400">
                  Manage official credentials, issuing bodies, verification links, and visibility.
                </p>
              </div>

              <Button
                variant="accent"
                size="sm"
                onClick={() =>
                  setEditingCertificate({
                    id: `cert-${Date.now().toString().slice(-4)}`,
                    title: "",
                    issuer: "",
                    issuerCategory: "Academy / Institute",
                    issueDate: "",
                    imagePath: "/certificates/iti-angular.jpeg",
                    tags: ["Engineering"],
                    description: "",
                    published: true,
                  })
                }
                className="gap-1.5 text-xs font-semibold self-start"
              >
                <Plus className="h-4 w-4" /> Add Certificate
              </Button>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.certificates.map((cert) => {
                const isPublished = cert.published !== false;
                return (
                  <div
                    key={cert.id}
                    className={`rounded-xl border p-4 backdrop-blur-xl flex flex-col justify-between transition-all ${
                      isPublished
                        ? "border-zinc-800/80 bg-zinc-900/60"
                        : "border-zinc-800/40 bg-zinc-950/80 opacity-65"
                    }`}
                  >
                    <div className="space-y-3">
                      {cert.imagePath && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                          <Image
                            src={cert.imagePath}
                            alt={cert.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase">
                          {cert.issuerCategory}
                        </span>
                        <h3 className="font-bold text-sm text-zinc-100 line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5">{cert.issuer}</p>
                        <p className="text-[11px] font-mono text-zinc-500">{cert.issueDate}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCertificatePublish(cert.id)}
                        className={`gap-1 text-xs font-mono border-zinc-800 ${
                          isPublished
                            ? "text-amber-400 hover:text-amber-300"
                            : "text-emerald-400 hover:text-emerald-300"
                        }`}
                      >
                        {isPublished ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        <span>{isPublished ? "Draft" : "Publish"}</span>
                      </Button>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingCertificate(cert)}
                          className="p-2 text-zinc-400 hover:text-zinc-100"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className="p-2 text-zinc-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal for Editing Certificate */}
            {editingCertificate && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
                <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <h3 className="text-base font-bold text-zinc-100">
                      {data.certificates.some((c) => c.id === editingCertificate.id)
                        ? "Edit Certificate"
                        : "Add Certificate"}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingCertificate(null)}
                    >
                      Close
                    </Button>
                  </div>

                  <form onSubmit={handleSaveCertificate} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Title</label>
                      <input
                        type="text"
                        value={editingCertificate.title}
                        onChange={(e) =>
                          setEditingCertificate({ ...editingCertificate, title: e.target.value })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">Issuer Body</label>
                        <input
                          type="text"
                          value={editingCertificate.issuer}
                          onChange={(e) =>
                            setEditingCertificate({ ...editingCertificate, issuer: e.target.value })
                          }
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">Category</label>
                        <select
                          value={editingCertificate.issuerCategory}
                          onChange={(e) =>
                            setEditingCertificate({
                              ...editingCertificate,
                              issuerCategory: e.target.value as any,
                            })
                          }
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100"
                        >
                          <option value="Government / Ministry">Government / Ministry</option>
                          <option value="Google / Tech Community">Google / Tech Community</option>
                          <option value="Academy / Institute">Academy / Institute</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">Issue Date</label>
                        <input
                          type="text"
                          value={editingCertificate.issueDate}
                          onChange={(e) =>
                            setEditingCertificate({ ...editingCertificate, issueDate: e.target.value })
                          }
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-mono text-zinc-400">Image Path</label>
                          <label className="cursor-pointer text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1">
                            <Upload className="h-3 w-3" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (url) =>
                                  setEditingCertificate({ ...editingCertificate, imagePath: url })
                                )
                              }
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={editingCertificate.imagePath}
                          onChange={(e) =>
                            setEditingCertificate({ ...editingCertificate, imagePath: e.target.value })
                          }
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Verification URL (Optional)</label>
                      <input
                        type="url"
                        value={editingCertificate.verificationUrl || ""}
                        onChange={(e) =>
                          setEditingCertificate({ ...editingCertificate, verificationUrl: e.target.value })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Description</label>
                      <textarea
                        value={editingCertificate.description}
                        onChange={(e) =>
                          setEditingCertificate({ ...editingCertificate, description: e.target.value })
                        }
                        rows={2}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingCertificate(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="accent"
                        size="sm"
                        className="gap-1.5"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Certificate</span>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 4: EXPERIENCES MANAGER
            ========================================================================= */}
        {activeTab === "experiences" && data && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-100">Experience Timeline</h2>
              <p className="text-xs font-mono text-zinc-400">
                Manage roles, systems architected, and key responsibilities.
              </p>
            </div>

            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div>
                      <span className="text-xs font-mono text-emerald-400">{exp.type}</span>
                      <h3 className="font-bold text-base text-zinc-100">{exp.role}</h3>
                      <p className="text-xs text-zinc-400">{exp.company} &bull; {exp.period}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                        {exp.published !== false ? "Live" : "Draft"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">{exp.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: SKILLS & TECH STACK
            ========================================================================= */}
        {activeTab === "skills" && data && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-100">Skills & Tech Stack</h2>
              <p className="text-xs font-mono text-zinc-400">
                Organized categorized technology stacks displayed across the portfolio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(data.skills).map(([category, items]) => (
                <div
                  key={category}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-3"
                >
                  <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs font-mono text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: PROFILE & AVAILABILITY SETTINGS
            ========================================================================= */}
        {activeTab === "profile" && data && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-100">Profile & Bio Settings</h2>
              <p className="text-xs font-mono text-zinc-400">
                Update availability status, bio, and direct contacts.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveStoreChanges(data, "Profile and availability settings updated!");
              }}
              className="space-y-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-6"
            >
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Availability Status</label>
                <select
                  value={data.profile.availabilityStatus || "available"}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: {
                        ...data.profile,
                        availabilityStatus: e.target.value as any,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-100"
                >
                  <option value="available">Available (Open for Senior Roles & Architecture)</option>
                  <option value="contract_only">Contract / Consulting Only</option>
                  <option value="busy">Busy / Currently Committed</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Status Headline</label>
                <input
                  type="text"
                  value={data.profile.statusText || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: {
                        ...data.profile,
                        statusText: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Professional Bio</label>
                <textarea
                  value={data.profile.bio}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: {
                        ...data.profile,
                        bio: e.target.value,
                      },
                    })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  variant="accent"
                  size="sm"
                  className="gap-1.5"
                  disabled={saving}
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? "Saving..." : "Save Profile Settings"}</span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function FolderGit2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}
