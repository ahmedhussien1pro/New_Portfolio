import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the technical AI assistant for Ahmed Hussien, a Senior Full Stack Software Engineer and Founder of CyberLabs.
Persona: Senior Staff Engineer.
Tone: Concise, authoritative, deeply technical, and strictly focused on modern web platforms and distributed cloud systems.
Core Expertise:
- Backend: Modular microservices with NestJS, Node.js, Express, REST/gRPC interfaces, JWT token validation, custom ExecutionContext guards.
- Frontend: Next.js 15/16 App Router, React 19 Server Components, Server Actions, on-demand cache revalidation (revalidateTag), TypeScript, HTML5 Canvas GPU rendering.
- Cloud & Infrastructure: DigitalOcean Droplets (private VPC), Cloudflare Zero-Trust/WAF/DNS, Docker, Vercel edge deployment, Railway.
- Data Tier: MongoDB Atlas multi-region replica sets with read preferences, PostgreSQL via Prisma, Redis caching.
- Delivery: Enterprise Jira agile sprint orchestration, Bitbucket branch protection, GitHub Actions CI/CD.
Constraint: Strictly pure software engineering. Never discuss hardware, IoT, or embedded systems. Guide visitors directly to inspect his architectural case studies on CyberLabs or Eduko.
`;

const STAFF_RESPONSES: Record<string, string> = {
  stack:
    "Ahmed's production stack is strictly pure software engineering: Next.js 15/16 (App Router & Server Actions) and React 19 on the frontend; NestJS and Node.js for decoupled microservices; MongoDB Atlas and Redis for distributed persistence; with cloud infrastructure orchestrated across DigitalOcean VPC and Cloudflare Zero-Trust edge.",
  cyberlabs:
    "At CyberLabs, Ahmed serves as Founder & System Administrator. He architected the microservices fleet isolating 'cyberlabs-admin' (port 4001, RBAC controls) from 'backend' (port 4000, transactional API) and 'vm-service' (port 4002, compute node RPC), shielded behind Cloudflare WAF and DigitalOcean VPC private subnets.",
  eduko:
    "For Eduko, Ahmed led the frontend migration to Next.js App Router and React Server Components. He implemented on-demand cache invalidation using atomic 'revalidateTag()' triggers within Server Actions and established automated GitHub Actions CI/CD pipelines deploying to Vercel.",
  streaming:
    "As an Integration Specialist, Ahmed bypassed browser RTSP playback constraints by streaming binary demuxed packets over WebSockets (<300ms latency) directly into hardware-accelerated HTML5 Canvas contexts at 60 FPS, coupled with automated Arabic neural Text-to-Speech (TTS) voice alert dispatching.",
  contact:
    "You can reach Ahmed directly via email at ahmedHussien1352@gmail.com, view his verified GitHub repositories at github.com/Eng-Ahmed-Hussien, or download his official resume via the navigation bar and CMD+K palette.",
  architecture:
    "Ahmed prioritizes decoupled domain boundaries, strict compile-time TypeScript type safety, ExecutionContext role guards in NestJS, and edge-first caching strategies to eliminate latency and database write contention.",
};

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
    }

    const lower = message.toLowerCase();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${SYSTEM_PROMPT}\n\nUser Question: ${message}\nRespond as Ahmed's Senior Staff Engineer assistant:`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Ahmed specializes in pure software architecture and cloud infrastructure. How can I direct you through his case studies?";
          return NextResponse.json({ reply });
        }
      } catch (err) {
        console.error("Gemini API error, activating deterministic staff engine:", err);
      }
    }

    // Deterministic Senior Staff Engineer fallback
    let reply =
      "Greetings. I am Ahmed Hussien's technical assistant. Ahmed is a Full Stack Software Engineer and Founder of CyberLabs, specializing in modular NestJS microservices, Next.js App Router frontends, and cloud infrastructure across DigitalOcean and Cloudflare. Which architectural case study would you like to examine?";

    if (
      lower.includes("tech") ||
      lower.includes("stack") ||
      lower.includes("skill") ||
      lower.includes("tool")
    ) {
      reply = STAFF_RESPONSES.stack;
    } else if (
      lower.includes("cyberlabs") ||
      lower.includes("founder") ||
      lower.includes("vm") ||
      lower.includes("admin")
    ) {
      reply = STAFF_RESPONSES.cyberlabs;
    } else if (
      lower.includes("eduko") ||
      lower.includes("education") ||
      lower.includes("learning") ||
      lower.includes("action")
    ) {
      reply = STAFF_RESPONSES.eduko;
    } else if (
      lower.includes("rtsp") ||
      lower.includes("stream") ||
      lower.includes("video") ||
      lower.includes("tts") ||
      lower.includes("canvas")
    ) {
      reply = STAFF_RESPONSES.streaming;
    } else if (
      lower.includes("architecture") ||
      lower.includes("design") ||
      lower.includes("microservice") ||
      lower.includes("guard")
    ) {
      reply = STAFF_RESPONSES.architecture;
    } else if (
      lower.includes("contact") ||
      lower.includes("email") ||
      lower.includes("hire") ||
      lower.includes("github") ||
      lower.includes("linkedin") ||
      lower.includes("cv") ||
      lower.includes("resume")
    ) {
      reply = STAFF_RESPONSES.contact;
    } else if (
      lower.includes("hardware") ||
      lower.includes("iot") ||
      lower.includes("embedded") ||
      lower.includes("arduino") ||
      lower.includes("raspberry")
    ) {
      reply =
        "Ahmed's architectural scope is strictly confined to pure software engineering, distributed cloud infrastructure, and modern web platforms. Hardware and embedded systems are outside his operational domain.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
