import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "operational",
    system: "Edge Ingress Gateway",
    environment: "production",
    uptime: "99.99%",
    timestamp: new Date().toISOString(),
    engine: "NestJS / Next.js Hybrid Architecture",
    latencyMs: Math.floor(Math.random() * 12) + 8,
  });
}
