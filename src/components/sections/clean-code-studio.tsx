import React from "react";
import { codeToHtml } from "shiki";
import { Code2, Terminal, Layers } from "lucide-react";
import { CleanCodeStudioClient, CodeSnippet } from "./clean-code-studio-client";

const RAW_SNIPPETS = [
  {
    id: "nextjs",
    tabLabel: "Next.js 16 Server Component",
    filename: "app/dashboard/analytics/page.tsx",
    language: "typescript",
    rawCode: `import { Suspense } from "react";
import { revalidateTag, unstable_cache } from "next/cache";
import { authGuard } from "@/lib/auth/session";
import { FleetMetricsTable } from "@/components/metrics-table";

// Tagged memoized query with automated TTL eviction
const getTelemetryStream = unstable_cache(
  async (clusterId: string) => {
    const res = await fetch(\`http://internal-vpc.net:4002/clusters/\${clusterId}\`, {
      headers: { "X-Internal-Secret": process.env.VPC_SECRET! },
    });
    if (!res.ok) throw new Error("Cluster telemetry unreachable");
    return res.json();
  },
  ["cluster-telemetry"],
  { tags: ["telemetry"], revalidate: 60 }
);

// Server Action with instant cache bust
export async function purgeClusterCache(formData: FormData) {
  "use server";
  await authGuard(["ADMIN", "DEVOPS"]);
  const clusterId = formData.get("clusterId") as string;
  
  // Invalidate tagged edge cache across all edge replicas
  revalidateTag("telemetry");
  return { purged: true, timestamp: Date.now() };
}

export default async function AnalyticsDashboard({
  params,
}: {
  params: Promise<{ clusterId: string }>;
}) {
  const { clusterId } = await params;
  const metrics = await getTelemetryStream(clusterId);

  return (
    <section className="p-8 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-mono text-zinc-100">Cluster: {clusterId}</h1>
        <form action={purgeClusterCache}>
          <input type="hidden" name="clusterId" value={clusterId} />
          <button type="submit" className="px-3 py-1.5 rounded bg-emerald-600 font-mono text-xs">
            Purge Edge Cache
          </button>
        </form>
      </header>
      <Suspense fallback={<div className="animate-pulse font-mono">Streaming telemetry...</div>}>
        <FleetMetricsTable data={metrics} />
      </Suspense>
    </section>
  );
}`,
    explanation: {
      title: "Next.js 16 Hydration & Edge Cache",
      summary:
        "Leverages asynchronous params, tagged server cache via unstable_cache, and zero-bundle Server Actions that mutate state and purge edge tags on demand.",
      highlights: [
        "Promise-based params pattern required in Next.js 16",
        "Fine-grained cache invalidation with revalidateTag('telemetry')",
        "Strict server-side RBAC verification inside Server Action",
        "React 19 Suspense boundary streaming without blocking initial paint",
      ],
    },
  },
  {
    id: "nestjs",
    tabLabel: "NestJS Execution Guard",
    filename: "src/auth/guards/roles.guard.ts",
    language: "typescript",
    rawCode: `import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If endpoint has no role constraints, permit ingress
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing stateless bearer token");
    }

    const token = authHeader.split(" ")[1];
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload; // Attach decoded JWT claims to execution context

      const hasRole = requiredRoles.some((role) => payload.roles?.includes(role));
      if (!hasRole) {
        throw new ForbiddenException("Insufficient privileges for this RPC handler");
      }

      return true;
    } catch {
      throw new UnauthorizedException("Token signature expired or revoked in Redis");
    }
  }
}`,
    explanation: {
      title: "NestJS ExecutionContext & RBAC",
      summary:
        "Stateless token verification using metadata reflection across handlers and controllers. Decouples security logic from route handlers.",
      highlights: [
        "Metadata extraction via Reflector with cascading class/method overrides",
        "Protocol-agnostic ExecutionContext handling HTTP & Microservice RPC",
        "Strict error boundary throwing standard RFC 7807 HTTP exceptions",
        "Zero memory leakage through stateless JWT claims injection",
      ],
    },
  },
  {
    id: "devops",
    tabLabel: "Docker & Cloudflare Topology",
    filename: "deploy/docker-compose.prod.yml",
    language: "yaml",
    rawCode: `version: "3.8"

networks:
  vpc_internal:
    driver: bridge
    internal: true # Air-gapped network: no direct external ingress
  public_edge:
    driver: bridge

services:
  # Cloudflare Tunnel: Zero public ports exposed to internet
  cloudflared:
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=\${CLOUDFLARE_TUNNEL_TOKEN}
    networks:
      - public_edge
      - vpc_internal

  # NestJS Core Microservice
  backend_api:
    build:
      context: .
      dockerfile: Dockerfile.production
    restart: always
    environment:
      - NODE_ENV=production
      - PORT=4000
      - MONGO_URI=mongodb+srv://\${DB_USER}:\${DB_PASS}@fra1.cluster.mongodb.net/prod
      - REDIS_HOST=cache_redis
    networks:
      - vpc_internal
    depends_on:
      cache_redis:
        condition: service_healthy

  # Redis Distributed Cache
  cache_redis:
    image: redis:7.2-alpine
    command: ["redis-server", "--appendonly", "yes", "--requirepass", "\${REDIS_PASS}"]
    networks:
      - vpc_internal
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5`,
    explanation: {
      title: "Zero-Trust VPC & Edge Tunneling",
      summary:
        "Air-gapped production deployment where zero ports are opened to the public internet. External requests flow strictly through Cloudflare Tunnel daemon.",
      highlights: [
        "Internal air-gapped Docker bridge network (internal: true)",
        "Zero-Trust Cloudflare Tunnel eliminating open inbound firewall ports",
        "Healthcheck dependency chaining preventing race conditions on boot",
        "Isolated persistence layer protected from edge network inspection",
      ],
    },
  },
];

export async function CleanCodeStudio() {
  // Highlight all snippets on server side with Shiki
  const snippetsWithHtml: CodeSnippet[] = await Promise.all(
    RAW_SNIPPETS.map(async (snippet) => {
      const html = await codeToHtml(snippet.rawCode.trim(), {
        lang: snippet.language,
        theme: "github-dark-dimmed",
      });
      return {
        ...snippet,
        highlightedHtml: html,
      };
    })
  );

  return (
    <section
      id="clean-code-studio"
      className="relative w-full py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/50"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-2 mb-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3.5 py-1 text-xs font-mono text-zinc-400 backdrop-blur-md">
          <Code2 className="h-3.5 w-3.5 text-emerald-400" />
          <span>Live Code Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
          Production-Grade Clean Code
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Inspect authentic architecture patterns. Toggle between Next.js 16 caching, NestJS execution
          guards, and air-gapped VPC orchestration.
        </p>
      </div>

      {/* VS Code Simulator Interactive Client */}
      <CleanCodeStudioClient snippets={snippetsWithHtml} />
    </section>
  );
}
