export interface ArchitectureNode {
  name: string;
  type: "client" | "edge" | "gateway" | "service" | "database";
  protocol: string;
  description: string;
}

export interface ScreenItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  imagePath: string;
  simulatedUrl: string;
}

export interface HighlightRepo {
  name: string;
  repoUrl: string;
  description: string;
  tech: string[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: "Backend Architecture" | "Frontend Engineering" | "Real-Time Systems" | "Full-Stack Platforms" | "Interactive & Web3" | string;
  architectureLayers: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlightRepos: HighlightRepo[];
  coverImage: string;
  overview: string;
  problem: string;
  architectureDetails: {
    frontend: string;
    backend: string;
    infrastructure: string;
    data: string;
  };
  architectureFlow: {
    from: string;
    to: string;
    protocol: string;
    label: string;
  }[];
  engineeringDecisions: {
    decision: string;
    rationale: string;
    tradeoff: string;
  }[];
  codeArtifact: {
    filename: string;
    language: string;
    description: string;
    code: string;
  };
  screens: ScreenItem[];
  published?: boolean;
}

export interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  logo: string;
  projectThumbnail: string;
  summary: string;
  responsibilities: string[];
  tools: string[];
  metrics: string[];
  repos: HighlightRepo[];
  published?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerCategory: "Government / Ministry" | "Google / Tech Community" | "Academy / Institute";
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  imagePath: string;
  tags: string[];
  description: string;
  published: boolean;
}

export const AHMED_PROFILE = {
  name: "Ahmed Hussien",
  title: "Full Stack Software Engineer & Founder at CyberLabs",
  email: "ahmedHussien1352@gmail.com",
  location: "Menofia, Egypt / Remote Worldwide",
  avatar: "/assets/myImage.png",
  logo: "/assets/logo.svg",
  cv: "/Ahmed_Hussien_CV.pdf",
  github: "https://github.com/Eng-Ahmed-Hussien",
  linkedin: "https://www.linkedin.com/in/ahmed-hussien-front-end-developer/",
  socials: {
    linkedin: "https://www.linkedin.com/in/ahmed-hussien-front-end-developer/",
    github: "https://github.com/Eng-Ahmed-Hussien",
    oldPortfolio: "https://ahmedhussienportfolio-gamma.vercel.app/",
  },
  highlightRepos: [
    {
      name: "cyberlabs-backend",
      repoUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-backend",
      description: "Modular NestJS microservice gateway with JWT authentication & MongoDB Atlas pools.",
      tech: ["NestJS", "TypeScript", "MongoDB Atlas", "Redis"],
    },
    {
      name: "cyberlabs-admin",
      repoUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-admin",
      description: "Secure administrative dashboard console with custom ExecutionContext role guards.",
      tech: ["Next.js 15", "Tailwind CSS", "RBAC", "TypeScript"],
    },
    {
      name: "cyberlabs-vm-service",
      repoUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-vm-service",
      description: "DigitalOcean droplet provisioning RPC node with capacity threshold checks.",
      tech: ["Node.js", "Docker", "DigitalOcean API", "Private VPC"],
    },
    {
      name: "ahmedhabiby/Eduko1",
      repoUrl: "https://github.com/ahmedhabiby/Eduko1",
      description: "Modern educational platform frontend built with Next.js App Router and automated CI/CD.",
      tech: ["Next.js 16", "React 19", "Vercel", "GitHub Actions"],
    },
  ],
  bio: "Specializing in modular backend architectures with NestJS, production-grade Next.js frontends, and cloud infrastructure management across DigitalOcean and Cloudflare. Dedicated to decoupled system design, strict type safety, and automated continuous delivery.",
  technologies: {
    backend: ["NestJS", "Node.js", "Express", "REST APIs", "Microservices", "JWT & RBAC"],
    frontend: ["Next.js 15/16", "React 19", "TypeScript", "Tailwind CSS", "HTML5 Canvas"],
    cloud: ["DigitalOcean Droplets", "Cloudflare (DNS, WAF, Edge)", "Docker", "Vercel", "Railway"],
    database: ["MongoDB Atlas", "PostgreSQL", "Redis Cache", "Mongoose", "Prisma"],
    workflows: ["Jira (Agile/Epics)", "Bitbucket", "GitHub Actions", "CI/CD Pipelines"],
  },
  metrics: [
    { label: "Core Microservices", value: "3 Services" },
    { label: "Architecture", value: "Decoupled" },
    { label: "Version Control", value: "Bitbucket & GitHub" },
    { label: "Cloud Providers", value: "DigitalOcean / Cloudflare" },
  ],
};

export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: "cyberlabs",
    title: "CyberLabs Microservices Fleet",
    subtitle: "Modular NestJS Architecture & Multi-Node Administration",
    tagline:
      "Orchestration of cyberlabs-admin, core backend APIs, and vm-service nodes with role-isolated permissions and MongoDB Atlas cluster management.",
    category: "Backend Architecture",
    architectureLayers: [
      "NestJS Modular Architecture",
      "MongoDB Atlas Cluster Management",
      "DigitalOcean Droplet Orchestration",
      "Cloudflare Zero-Trust/DNS",
    ],
    liveUrl: "https://admin-dashboard-v1-phi.vercel.app/",
    githubUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-admin",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    highlightRepos: [
      {
        name: "cyberlabs-admin",
        repoUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-admin",
        description: "Zero-Trust administrative console with custom NestJS RBAC guards.",
        tech: ["Next.js 15", "TypeScript", "Tailwind CSS"],
      },
      {
        name: "cyberlabs-backend",
        repoUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-backend",
        description: "Core transactional microservice API communicating over private VPC networking.",
        tech: ["NestJS", "MongoDB Atlas", "Redis"],
      },
      {
        name: "cyberlabs-vm-service",
        repoUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-vm-service",
        description: "Compute node provisioning daemon managing DigitalOcean droplet lifecycles.",
        tech: ["Node.js", "Docker", "Private RPC"],
      },
    ],
    overview:
      "CyberLabs operates as a decoupled microservices architecture designed to isolate administrative operations from public endpoints. The platform partitions workloads across three primary services: cyberlabs-admin for privileged cluster control, backend for transactional business logic, and vm-service for provisioning cloud compute nodes.",
    problem:
      "As infrastructure instances and administration complexity grew, running a monolithic codebase caused deployment coupling, risk of unauthorized access across administrative actions, and high database write contention.",
    architectureDetails: {
      frontend: "Next.js 15 App Router, TypeScript, Tailwind CSS, customized accessible dashboard panels.",
      backend: "NestJS microservices communicating via secure internal HTTP/gRPC interfaces, with JWT role-based guards and metadata reflection.",
      infrastructure: "DigitalOcean Droplets in a VPC private network, Cloudflare Zero-Trust edge access and SSL termination.",
      data: "MongoDB Atlas multi-region replica set with dedicated indexes and connection pooling via Mongoose.",
    },
    architectureFlow: [
      { from: "Client (Admin)", to: "Cloudflare Edge", protocol: "HTTPS / TLS 1.3", label: "Zero-Trust Edge Auth" },
      { from: "Cloudflare Edge", to: "Next.js Admin Console", protocol: "HTTP/2", label: "Edge Routing" },
      { from: "Next.js Admin Console", to: "NestJS API Gateway", protocol: "JWT Bearer / mTLS", label: "Signed Requests" },
      { from: "NestJS API Gateway", to: "vm-service Node", protocol: "Private VPC RPC", label: "Compute Node Allocation" },
      { from: "NestJS API Gateway", to: "MongoDB Atlas Cluster", protocol: "mongodb+srv", label: "Read/Write Sharded Replicas" },
    ],
    engineeringDecisions: [
      {
        decision: "Service Separation between cyberlabs-admin and vm-service",
        rationale: "Ensured compute-heavy VM provisioning scripts cannot degrade response latency for mission-critical administrative control panels.",
        tradeoff: "Introduced inter-service RPC communication overhead, mitigated by keep-alive HTTP agents on private VPC networks.",
      },
      {
        decision: "Custom Decorator & ExecutionContext Guard in NestJS",
        rationale: "Enforced compile-time role assignment (@Roles('SYSADMIN', 'OPERATOR')) with runtime validation against JWT claims before hitting business controllers.",
        tradeoff: "Required strict JWT payload versioning to avoid stale permissions after user tier demotions.",
      },
      {
        decision: "Index Strategy & Read Preferences on MongoDB Atlas",
        rationale: "Used secondary-preferred read preferences for read-heavy system telemetry queries while confining writes to the primary replica.",
        tradeoff: "Accepting brief eventual consistency (typically <100ms) on non-critical dashboard telemetry.",
      },
    ],
    codeArtifact: {
      filename: "roles.guard.ts (NestJS Custom RBAC Guard)",
      language: "typescript",
      description: "Production NestJS execution context guard validating role bitmasks and JWT identity.",
      code: `import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If route has no @Roles declaration, permit access (authenticated by JwtAuthGuard)
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.roles) {
      throw new ForbiddenException('Access denied: Missing role credentials');
    }

    const hasPermission = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasPermission) {
      throw new ForbiddenException(
        \`Insufficient privileges: Requires [\${requiredRoles.join(', ')}]\`
      );
    }

    return true;
  }
}`,
    },
    screens: [
      {
        id: "admin-console",
        title: "CyberLabs Admin Control Plane",
        tag: "RBAC Dashboard",
        description: "Zero-Trust administrative console managing VPC droplets, service health, and operator privileges.",
        imagePath: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        simulatedUrl: "https://console.cyberlabs.internal/admin",
      },
      {
        id: "vm-telemetry",
        title: "VM-Service Compute Orchestrator",
        tag: "Compute RPC",
        description: "Direct node provisioning telemetry, memory thresholds, and DigitalOcean private droplet states.",
        imagePath: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        simulatedUrl: "https://console.cyberlabs.internal/vms",
      },
      {
        id: "db-cluster",
        title: "MongoDB Atlas Cluster Metrics",
        tag: "Database Tier",
        description: "Multi-region sharded replica telemetry, connection pool saturation, and query latency monitoring.",
        imagePath: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
        simulatedUrl: "https://console.cyberlabs.internal/metrics/db",
      },
    ],
  },
  {
    id: "eduko",
    title: "Eduko Learning Platform",
    subtitle: "Next.js App Router Architecture & Automated Delivery",
    tagline:
      "Frontend engineering migration to Next.js App Router with Server Actions, tag-based cache revalidation, and automated CI/CD via GitHub Actions and Vercel.",
    category: "Frontend Engineering",
    architectureLayers: [
      "Next.js App Router & Server Actions",
      "Tag-Based Cache Revalidation",
      "Vercel Edge Deployment",
      "GitHub Actions CI/CD Pipeline",
    ],
    liveUrl: "https://simple-fresh-cart-ecommerce.vercel.app/",
    githubUrl: "https://github.com/ahmedhabiby/Eduko1",
    coverImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1600&q=80",
    highlightRepos: [
      {
        name: "ahmedhabiby/Eduko1",
        repoUrl: "https://github.com/ahmedhabiby/Eduko1",
        description: "Core Next.js platform repository delivering the modern educational interface.",
        tech: ["Next.js 16", "React 19", "Tailwind CSS", "Vercel"],
      },
    ],
    overview:
      "Eduko is an educational platform serving dynamic course material, interactive assessments, and high-concurrency learner traffic. Ahmed co-developed the frontend layer, transitioning complex UI state into Next.js App Router paradigms with React 19.",
    problem:
      "Legacy client-side data fetching caused sluggish initial page loads, layout shifts during course catalog rendering, and cumbersome manual deployments that delayed feature releases.",
    architectureDetails: {
      frontend: "Next.js 15/16 App Router, React 19 Server Components, Tailwind CSS, Framer Motion.",
      backend: "Node.js REST API with Redis caching layer.",
      infrastructure: "Vercel Global Edge Network with automated staging branch previews.",
      data: "PostgreSQL database accessed via optimized API endpoints and cached at edge.",
    },
    architectureFlow: [
      { from: "Learner Client", to: "Vercel Global Edge", protocol: "HTTP/3", label: "Edge Cached Static Pages" },
      { from: "Vercel Edge", to: "Next.js Server Component", protocol: "RSC Stream", label: "Server-Rendered Shell" },
      { from: "Next.js Server Action", to: "API Backend", protocol: "HTTPS / REST", label: "Mutation & Token Verify" },
      { from: "Next.js Revalidation", to: "Vercel Cache", protocol: "revalidateTag()", label: "Instant On-Demand Invalidation" },
    ],
    engineeringDecisions: [
      {
        decision: "Migration to React Server Components (RSC)",
        rationale: "Rendered course catalog and syllabus content on the server, eliminating client waterfall fetch requests and reducing JavaScript bundle size by over 40%.",
        tradeoff: "Required strict isolation between interactive client components ('use client') and server data-fetching modules.",
      },
      {
        decision: "Tag-Based On-Demand Revalidation",
        rationale: "Used Next.js revalidateTag('course-[id]') inside Server Actions upon course updates, keeping content static at the edge until an instructor edits it.",
        tradeoff: "Requires deliberate tag naming conventions across all mutations to prevent cache leaks.",
      },
      {
        decision: "Automated Pull Request Previews via GitHub Actions",
        rationale: "Every pull request triggered automated linting, type checks, and a live preview URL on Vercel, preventing regressions before merging into main.",
        tradeoff: "Added roughly 90 seconds to PR checks, heavily offset by catching syntax and styling defects early.",
      },
    ],
    codeArtifact: {
      filename: "course-actions.ts (Next.js Server Action with Cache Invalidation)",
      language: "typescript",
      description: "Type-safe Next.js Server Action with Zod input validation and on-demand cache revalidation.",
      code: `'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const UpdateCourseSchema = z.object({
  courseId: z.string().min(1),
  title: z.string().min(3).max(120),
  syllabusJson: z.string(),
  isPublished: z.boolean(),
});

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function updateCourseAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validated = UpdateCourseSchema.safeParse({
    courseId: formData.get('courseId'),
    title: formData.get('title'),
    syllabusJson: formData.get('syllabusJson'),
    isPublished: formData.get('isPublished') === 'true',
  });

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { courseId, title, syllabusJson, isPublished } = validated.data;

  const res = await fetch(\`\${process.env.API_GATEWAY_URL}/courses/\${courseId}\`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Internal-Secret': process.env.INTERNAL_SERVICE_SECRET || '',
    },
    body: JSON.stringify({ title, syllabusJson, isPublished }),
  });

  if (!res.ok) {
    return { success: false, message: 'Failed to update remote course record' };
  }

  // Atomically purge edge cache for this course and the catalog list
  revalidateTag(\`course-\${courseId}\`, 'default');
  revalidateTag('catalog-list', 'default');

  return { success: true, message: 'Course updated and edge cache purged.' };
}`,
    },
    screens: [
      {
        id: "course-catalog",
        title: "Course Catalog & Edge Shell",
        tag: "Next.js App Router",
        description: "Server-rendered lesson directory with zero cumulative layout shift and atomic cache tagging.",
        imagePath: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        simulatedUrl: "https://eduko.app/catalog",
      },
      {
        id: "assessment-engine",
        title: "Interactive Assessment Engine",
        tag: "React 19 State",
        description: "Real-time state validation, optimistic quiz submission, and automated score compiling.",
        imagePath: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        simulatedUrl: "https://eduko.app/assessments/module-4",
      },
      {
        id: "deployment-pipeline",
        title: "GitHub Actions Automated Pipeline",
        tag: "Vercel CD",
        description: "Automated linting, bundle size analysis, and zero-downtime edge previews on every PR.",
        imagePath: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
        simulatedUrl: "https://github.com/ahmedhabiby/Eduko1/actions",
      },
    ],
  },
  {
    id: "streaming-dashboards",
    title: "Real-Time RTSP Media Ingestion",
    subtitle: "Low-Latency WebSocket Streaming & Arabic Voice Synthesis",
    tagline:
      "Ingesting live RTSP video feeds over binary WebSockets into HTML5 Canvas with sub-300ms latency, paired with automated Arabic voiceover generation.",
    category: "Real-Time Systems",
    architectureLayers: [
      "WebSocket Binary Video Ingestion",
      "HTML5 Canvas 60 FPS Blitting",
      "Arabic Text-to-Speech (TTS) Pipeline",
      "Jitter Buffer & Stream Recovery",
    ],
    liveUrl: "https://vs-code-clone-three.vercel.app/",
    githubUrl: "https://github.com/Eng-Ahmed-Hussien/Vs_code_clone",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
    highlightRepos: [
      {
        name: "Vs_code_clone",
        repoUrl: "https://github.com/Eng-Ahmed-Hussien/Vs_code_clone",
        description: "High-performance web browser code environment with syntax tokenization.",
        tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      },
    ],
    overview:
      "An enterprise telemetry dashboard engineered for operations monitoring. Solved the limitation of modern web browsers being unable to render raw RTSP video streams by establishing a WebSocket binary relay and rendering frames directly into GPU-accelerated HTML5 Canvas contexts.",
    problem:
      "Direct RTSP playback is unsupported in standard web browsers. Transcoding to HLS introduced 6-12 seconds of latency, which was unacceptable for real-time security alerts. Additionally, critical incident alerts needed automated Arabic vocal notifications.",
    architectureDetails: {
      frontend: "React, TypeScript, HTML5 Canvas 2D context with hardware acceleration, Tailwind CSS.",
      backend: "Node.js WebSocket streaming gateway with backpressure handling.",
      infrastructure: "Dockerized transcoding gateway hosted on DigitalOcean compute droplets.",
      data: "Redis pub/sub for broadcast distribution and camera stream session tokens.",
    },
    architectureFlow: [
      { from: "IP Camera", to: "Edge Media Gateway", protocol: "RTSP / TCP", label: "Raw H.264 Video Stream" },
      { from: "Edge Media Gateway", to: "WebSocket Server", protocol: "Binary ArrayBuffer", label: "Demuxed Frame Packets" },
      { from: "WebSocket Server", to: "React Dashboard", protocol: "WSS (Secure WebSocket)", label: "Sub-300ms Frame Transfer" },
      { from: "React Dashboard", to: "HTML5 Canvas", protocol: "ctx.drawImage()", label: "60 FPS Hardware Render" },
      { from: "System Event Alert", to: "Arabic TTS API", protocol: "REST / Audio Stream", label: "Automated Voice Synthesis" },
    ],
    engineeringDecisions: [
      {
        decision: "WebSocket Binary Stream over HLS Transcoding",
        rationale: "Reduced video latency from ~8,000ms (HLS segmented chunks) to <300ms by streaming raw frame payloads directly over WebSockets.",
        tradeoff: "Required custom client-side frame buffer management to handle network jitter without frame tearing.",
      },
      {
        decision: "Direct Canvas Blitting over Video Element",
        rationale: "Enabled frame-accurate overlay of telemetry bounding boxes and diagnostic statistics without DOM reflow costs.",
        tradeoff: "Bypasses standard browser video controls (play, pause, scrub), which was acceptable for live surveillance feeds.",
      },
      {
        decision: "Pre-Buffered Arabic Voice Synthesis",
        rationale: "Sent alert strings to TTS engine upon threshold breach and played audio buffers through Web Audio API for zero-delay speech playback.",
        tradeoff: "Requires reliable network access to cloud TTS endpoint, with local audio chime fallbacks.",
      },
    ],
    codeArtifact: {
      filename: "useRtspWebSocket.ts (Binary Frame Ingestion Hook)",
      language: "typescript",
      description: "Custom React hook handling WebSocket binary packet stream and Canvas rendering loop.",
      code: `import { useEffect, useRef, useState, useCallback } from 'react';

interface StreamState {
  isConnected: boolean;
  frameRate: number;
  latencyMs: number;
  reconnectAttempts: number;
}

export function useRtspWebSocket(
  streamEndpoint: string,
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const [state, setState] = useState<StreamState>({
    isConnected: false,
    frameRate: 0,
    latencyMs: 0,
    reconnectAttempts: 0,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const frameCountRef = useRef(0);
  const lastTimestampRef = useRef(performance.now());

  const connect = useCallback(() => {
    const ws = new WebSocket(streamEndpoint);
    ws.binaryType = 'arraybuffer';
    wsRef.current = ws;

    ws.onopen = () => {
      setState((prev) => ({ ...prev, isConnected: true, reconnectAttempts: 0 }));
    };

    ws.onmessage = (event: MessageEvent<ArrayBuffer>) => {
      const packet = new Uint8Array(event.data);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      // Render frame buffer
      createImageBitmap(new Blob([packet], { type: 'image/jpeg' }))
        .then((bitmap) => {
          ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          bitmap.close();
        })
        .catch(() => {
          // Frame dropped due to decode jitter
        });

      // Track FPS telemetry
      frameCountRef.current++;
      const now = performance.now();
      if (now - lastTimestampRef.current >= 1000) {
        setState((prev) => ({
          ...prev,
          frameRate: frameCountRef.current,
          latencyMs: Math.round(now - event.timeStamp),
        }));
        frameCountRef.current = 0;
        lastTimestampRef.current = now;
      }
    };

    ws.onclose = () => {
      setState((prev) => ({
        ...prev,
        isConnected: false,
        reconnectAttempts: prev.reconnectAttempts + 1,
      }));
      // Exponential backoff reconnect
      setTimeout(connect, Math.min(1000 * 2 ** state.reconnectAttempts, 8000));
    };
  }, [streamEndpoint, canvasRef, state.reconnectAttempts]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return state;
}`,
    },
    screens: [
      {
        id: "rtsp-canvas-grid",
        title: "Multi-Channel RTSP Canvas Viewport",
        tag: "Binary WebSocket",
        description: "Hardware-accelerated HTML5 Canvas rendering raw frame buffers at 60 FPS with <300ms latency.",
        imagePath: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        simulatedUrl: "https://stream.ops.internal/live-grid",
      },
      {
        id: "arabic-tts-console",
        title: "Arabic Voiceover Telemetry Feed",
        tag: "Neural TTS API",
        description: "Real-time alert dispatch console triggering automated spoken Arabic warnings upon anomaly detection.",
        imagePath: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        simulatedUrl: "https://stream.ops.internal/telemetry-alerts",
      },
      {
        id: "stream-diagnostics",
        title: "Network Telemetry & Jitter Inspector",
        tag: "Stream Diagnostic",
        description: "Real-time packet loss, frame time variance, and connection backoff metrics.",
        imagePath: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
        simulatedUrl: "https://stream.ops.internal/diagnostics",
      },
    ],
  },
];

export const EXPERIENCES: ExperienceRole[] = [
  {
    id: "cyberlabs",
    role: "Founder & Full Stack Engineer",
    company: "CyberLabs",
    period: "2023 — Present (Current)",
    type: "Founder / Lead Architect",
    location: "Remote / Hybrid",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    projectThumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    summary:
      "Spearheading the engineering and systems administration for CyberLabs. Architecting decoupled backend microservices, high-scale database clusters, and cloud infrastructure across DigitalOcean and Cloudflare.",
    responsibilities: [
      "Orchestrated cloud infrastructure across DigitalOcean Droplets and Cloudflare (Zero-Trust edge access, DNS, WAF, and SSL).",
      "Managed agile delivery and engineering epics using Jira, standardizing strict development workflows.",
      "Maintained protected branch policies and centralized version control on Bitbucket.",
      "Developed modular microservices: cyberlabs-admin (Port 4001), backend core API (Port 4000), and vm-service (Port 4002).",
      "Configured multi-region MongoDB Atlas replica sets with connection pooling and Redis in-memory cache.",
    ],
    tools: ["NestJS", "Next.js 15", "DigitalOcean", "Cloudflare", "MongoDB Atlas", "Jira", "Bitbucket", "Docker", "TypeScript"],
    metrics: ["3 Core Microservices in Production", "Private VPC Subnets (10.114.0.0/16)", "Agile Delivery with Jira"],
    repos: [
      {
        name: "cyberlabs-backend",
        repoUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-backend",
        description: "Modular NestJS microservice gateway with JWT authentication & MongoDB Atlas pools.",
        tech: ["NestJS", "TypeScript", "MongoDB Atlas"],
      },
      {
        name: "cyberlabs-admin",
        repoUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-admin",
        description: "Zero-Trust administrative console with custom NestJS RBAC guards.",
        tech: ["Next.js 15", "Tailwind CSS", "RBAC"],
      },
      {
        name: "cyberlabs-vm-service",
        repoUrl: "https://github.com/Eng-Ahmed-Hussien/cyberlabs-vm-service",
        description: "DigitalOcean droplet provisioning RPC node with capacity threshold checks.",
        tech: ["Node.js", "Docker", "DigitalOcean API"],
      },
    ],
  },
  {
    id: "eduko",
    role: "Full Stack Developer (Collaborator)",
    company: "Eduko Platform",
    period: "2023 — 2024",
    type: "Contract / Full Stack Engineering",
    location: "Remote",
    logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=120&q=80",
    projectThumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    summary:
      "Co-developed the platform frontend utilizing Next.js (15/16 App Router) and React 19. Automated CI/CD deployment pipelines via GitHub Actions and Vercel for continuous zero-downtime delivery.",
    responsibilities: [
      "Co-developed platform frontend utilizing Next.js (15/16 App Router) and React 19 Server Components.",
      "Managed CI/CD deployment pipelines via GitHub Actions and Vercel, reducing build cycles to under 2 minutes.",
      "Implemented Server Actions and on-demand cache revalidation with revalidateTag('course-[id]').",
      "Engineered reusable, accessible UI component primitives with Tailwind CSS and Framer Motion.",
    ],
    tools: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "GitHub Actions", "Vercel", "Zod"],
    metrics: ["Sub-2m CI/CD Builds", "RSC Server Rendering", "100% Mobile Responsive UI"],
    repos: [
      {
        name: "ahmedhabiby/Eduko1",
        repoUrl: "https://github.com/ahmedhabiby/Eduko1",
        description: "Modern educational platform frontend built with Next.js App Router and automated CI/CD.",
        tech: ["Next.js 16", "React 19", "Vercel", "GitHub Actions"],
      },
    ],
  },
  {
    id: "integration-specialist",
    role: "Integration Specialist",
    company: "High-Scale Media & Web Systems",
    period: "2022 — 2023",
    type: "Specialized Integration",
    location: "Remote",
    logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&q=80",
    projectThumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    summary:
      "Engineered binary media ingestion pipelines streaming live RTSP feeds into custom React dashboards with sub-300ms latency, paired with neural Text-to-Speech (TTS) Arabic voice synthesis.",
    responsibilities: [
      "Bypassed browser RTSP playback constraints by streaming binary demuxed packets over WebSockets (<300ms latency).",
      "Rendered frames into GPU-accelerated HTML5 Canvas contexts at 60 FPS with zero DOM reflow overhead.",
      "Integrated neural Text-to-Speech (TTS) AI APIs for automated Arabic voice announcements on critical alarms.",
      "Engineered telemetry monitoring widgets for live stream jitter, packet loss, and connection backoff.",
    ],
    tools: ["React", "WebSockets", "HTML5 Canvas", "TTS AI APIs", "Node.js", "TypeScript", "Tailwind CSS"],
    metrics: ["<300ms Stream Latency", "60 FPS Canvas Blitting", "Automated Arabic TTS"],
    repos: [
      {
        name: "Vs_code_clone",
        repoUrl: "https://github.com/Eng-Ahmed-Hussien/Vs_code_clone",
        description: "Web-based code environment with syntax highlighting and file state management.",
        tech: ["React", "TypeScript", "Vite"],
      },
    ],
  },
];

export const PROJECTS = CASE_STUDIES;

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "iti-angular",
    title: "Front End Web Development using Angular (120 hrs)",
    issuer: "Information Technology Institute (ITI) — CREATIVA Menofia",
    issuerCategory: "Academy / Institute",
    issueDate: "August 2024",
    imagePath: "/certificates/iti-angular.jpeg",
    tags: ["Angular", "TypeScript", "ES.Next", "HTML5/CSS3", "Bootstrap"],
    description:
      "Comprehensive 120-hour intensive engineering track certified by ITI Chairman Dr. Heba Saleh and CREATIVA Menofia covering client-side architectures, modular Angular components, and reactive design patterns.",
    published: true,
  },
  {
    id: "digitopia-phase2",
    title: "DIGITOPIA National Innovation — Cybersecurity Track (Phase 2 Finisher)",
    issuer: "Ministry of Communications & Information Technology (MCIT Egypt)",
    issuerCategory: "Government / Ministry",
    issueDate: "2025 Edition",
    imagePath: "/certificates/digitopia-phase2.jpeg",
    tags: ["Cybersecurity", "Zero-Trust", "Infrastructure", "MCIT Egypt", "National Competition"],
    description:
      "Honored by the Egyptian Ministry of Communications and Information Technology (MCIT) for qualifying and advancing through Phase 2 in the national innovation competition DIGITOPIA in the Cybersecurity domain.",
    published: true,
  },
  {
    id: "digitopia-solutions",
    title: "DIGITOPIA Technology Solutions — Cybersecurity Domain",
    issuer: "Ministry of Communications & Information Technology (MCIT Egypt)",
    issuerCategory: "Government / Ministry",
    issueDate: "2025 Edition",
    imagePath: "/certificates/digitopia-solutions.jpeg",
    tags: ["Cybersecurity", "Network Hardening", "National Solutions", "MCIT"],
    description:
      "Certificate of Appreciation from MCIT in partnership with ITI, NTI, ITIDA, UNDP, Cisco, and Huawei for innovative software engineering in the technological solutions phase.",
    published: true,
  },
  {
    id: "gdsc-training",
    title: "Front End Engineering Track (2023-2024 Academic Year)",
    issuer: "Google Developer Student Clubs (GDSC MET)",
    issuerCategory: "Google / Tech Community",
    issueDate: "April 13, 2024",
    credentialId: "OG50-750B71H05U",
    verificationUrl: "https://gdsc-certificates.web.app/c/OG50-750B71H05U",
    imagePath: "/certificates/gdsc-training.png",
    tags: ["Google GDSC", "Frontend Engineering", "React", "Web Standards"],
    description:
      "Official Certificate of Appreciation for successfully graduating from the intensive year-long Front End track under Google Developer Student Clubs with verified online credential ID.",
    published: true,
  },
  {
    id: "gdsc-frontend",
    title: "Fundamentals of Frontend Development",
    issuer: "Google Developer Student Clubs (GDSC Menofia University)",
    issuerCategory: "Google / Tech Community",
    issueDate: "August 2023",
    imagePath: "/certificates/gdsc-frontend.png",
    tags: ["Google GDSC", "JavaScript", "DOM Architecture", "CSS3"],
    description:
      "Certificate of Appreciation awarded by GDSC Menofia University acknowledging high-distinction mastery of modern web frontend fundamentals.",
    published: true,
  },
  {
    id: "networking-basics",
    title: "Basics of Computer Networking & Protocols",
    issuer: "Great Learning Academy",
    issuerCategory: "Academy / Institute",
    issueDate: "April 2024",
    credentialId: "KJGYQSKM",
    verificationUrl: "https://verify.mygreatlearning.com/KJGYQSKM",
    imagePath: "/certificates/networking-basics.jpeg",
    tags: ["Networking", "TCP/IP", "DNS", "HTTP/HTTPS", "Subnetting"],
    description:
      "Accredited certification covering OSI reference model, TCP/IP protocol suite, socket topologies, and modern network security fundamentals.",
    published: true,
  },
];
