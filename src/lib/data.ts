export interface ArchitectureNode {
  name: string;
  type: "client" | "edge" | "gateway" | "service" | "database";
  protocol: string;
  description: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: "Backend Architecture" | "Frontend Engineering" | "Real-Time Systems";
  architectureLayers: string[];
  liveUrl?: string;
  githubUrl?: string;
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
}

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
    githubUrl: "https://github.com/Eng-Ahmed-Hussien/Admin_Dashboard-v1",
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
    githubUrl: "https://github.com/Eng-Ahmed-Hussien/Simple-Fresh-Cart-Ecommerce",
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
      success: !1,
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
  },
];

export const AHMED_PROFILE = {
  name: "Ahmed Hussien",
  title: "Full Stack Software Engineer & Founder at CyberLabs",
  email: "ahmedHussien1352@gmail.com",
  location: "Menofia, Egypt / Remote Worldwide",
  github: "https://github.com/Eng-Ahmed-Hussien",
  linkedin: "https://www.linkedin.com/in/ahmed-hussien-front-end-developer/",
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

export interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  tools: string[];
  metrics: string[];
}

export const EXPERIENCES: ExperienceRole[] = [
  {
    id: "cyberlabs",
    role: "Founder & System Administrator",
    company: "CyberLabs",
    period: "2023 — Present",
    type: "Founder / Lead Architect",
    location: "Remote / Hybrid",
    summary:
      "Directing systems administration, cloud scalability, and continuous integration workflows for CyberLabs. Orchestrating decoupled microservices across DigitalOcean droplets and Cloudflare.",
    responsibilities: [
      "Managed cloud infrastructure via DigitalOcean droplets and Cloudflare Edge (DNS, WAF, SSL termination, and caching).",
      "Orchestrated agile workflows and engineering epics using Jira, standardizing delivery cadences.",
      "Managed backend version control and protected branch policies via Bitbucket.",
      "Developed modular microservices including cyberlabs-admin, core backend API, and vm-service nodes.",
      "Managed MongoDB Atlas replica set scaling, connection pools, and database index strategies.",
    ],
    tools: ["NestJS", "Next.js", "DigitalOcean", "Cloudflare", "MongoDB Atlas", "Jira", "Bitbucket", "Docker", "TypeScript"],
    metrics: ["3 Core Microservices", "VPC Private Networking", "Automated Sprint Delivery"],
  },
  {
    id: "eduko",
    role: "Full Stack Collaborator",
    company: "Eduko Platform",
    period: "2023 — 2024",
    type: "Full Stack Engineering",
    location: "Remote",
    summary:
      "Co-developed the platform frontend utilizing Next.js (15/16) and React. Managed continuous deployment pipelines via GitHub Actions and Vercel.",
    responsibilities: [
      "Co-developed the platform frontend utilizing Next.js (15/16 App Router) and React 19.",
      "Managed automated CI/CD pipelines via GitHub Actions and Vercel for zero-downtime deployments.",
      "Engineered reusable, accessible UI component primitives with Tailwind CSS and Framer Motion.",
      "Implemented Server Actions and on-demand cache revalidation for course catalogs.",
    ],
    tools: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "GitHub Actions", "Vercel", "Zod"],
    metrics: ["Sub-2m CI/CD Builds", "RSC Server Rendering", "100% Type-Safe API"],
  },
  {
    id: "integration-specialist",
    role: "Integration Specialist",
    company: "High-Scale Media & Web Systems",
    period: "2022 — 2023",
    type: "Specialized Integration",
    location: "Remote",
    summary:
      "Handled low-latency Real-Time RTSP video streaming into custom React dashboards and integrated automated Arabic voiceover synthesis pipelines.",
    responsibilities: [
      "Handled Real-Time RTSP video streaming into custom React dashboards over binary WebSockets with sub-300ms latency.",
      "Integrated Text-to-Speech (TTS) AI APIs for automated Arabic voiceovers and alert broadcasts.",
      "Rendered video frames into hardware-accelerated HTML5 Canvas contexts with custom backpressure buffer management.",
      "Built telemetry dashboards displaying real-time FPS, jitter, and stream connection health.",
    ],
    tools: ["React", "WebSockets", "HTML5 Canvas", "TTS AI APIs", "Node.js", "TypeScript", "Tailwind CSS"],
    metrics: ["<300ms Stream Latency", "60 FPS Canvas Blitting", "Automated Arabic TTS"],
  },
];

export const PROJECTS = CASE_STUDIES;

