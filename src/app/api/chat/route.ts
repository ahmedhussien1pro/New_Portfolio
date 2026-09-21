import { NextResponse } from "next/server";

const AHMED_KNOWLEDGE_BASE = `
You are the AI Assistant for Ahmed Hussien's Elite Developer Portfolio.
Key Information:
- Role: Full Stack Software Engineer & Founder at CyberLabs.
- Core Specialization: Pure software engineering, high-scale web applications, and distributed cloud architecture.
- Technologies:
  - Frontend: Next.js (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Shiki.
  - Backend: NestJS, Node.js, Express, Microservices architecture, REST & GraphQL APIs.
  - Databases: MongoDB Atlas, PostgreSQL, Redis for caching.
  - Cloud / DevOps: DigitalOcean, Cloudflare (Edge Workers, CDN, DNS), Docker, CI/CD pipelines (GitHub Actions).
- Philosophy: "Maximum Professionalism with a Wow Factor." Clean, decoupled architecture, resilient APIs, zero hardware/IoT clutter.
- Selected Projects:
  - CyberLabs: High-performance software engineering ecosystem & platform.
  - Eduko: Advanced modern learning & assessment management system.
- Contact: Open to enterprise contract engineering, cloud architecture consulting, and high-impact leadership roles.
`;

const QUICK_ANSWERS: Record<string, string> = {
  skills: "Ahmed specializes in Next.js, NestJS, TypeScript, MongoDB Atlas, Docker, and Cloudflare. His focus is 100% on pure software engineering, advanced web applications, and distributed cloud architecture.",
  experience: "Ahmed is the Founder & Lead Full Stack Software Engineer at CyberLabs, architecting resilient backend microservices with NestJS and high-performance frontends with Next.js.",
  projects: "Ahmed's flagship platforms include CyberLabs (enterprise software solutions and developer tooling) and Eduko (modern scalable learning management system).",
  contact: "You can reach out to Ahmed via the Contact page or directly download his CV using the CMD+K command menu or the navigation bar.",
};

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
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
                      text: `${AHMED_KNOWLEDGE_BASE}\n\nUser Question: ${message}\nAnswer concisely and professionally as Ahmed's portfolio assistant:`,
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
            "I am Ahmed's AI Assistant. How can I assist you with his architecture or portfolio?";
          return NextResponse.json({ reply });
        }
      } catch (err) {
        console.error("Gemini API call failed, falling back to local brain:", err);
      }
    }

    // Intelligent local fallback matching
    let reply =
      "Hello! I am Ahmed Hussien's AI assistant. Ahmed is a Full Stack Software Engineer & Founder at CyberLabs, specializing in Next.js, NestJS, and Cloud Architecture. Feel free to ask about his skills, projects, or experience!";

    if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) {
      reply = QUICK_ANSWERS.skills;
    } else if (lower.includes("experience") || lower.includes("role") || lower.includes("cyberlabs")) {
      reply = QUICK_ANSWERS.experience;
    } else if (lower.includes("project") || lower.includes("work") || lower.includes("portfolio")) {
      reply = QUICK_ANSWERS.projects;
    } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("cv")) {
      reply = QUICK_ANSWERS.contact;
    } else if (lower.includes("nest") || lower.includes("backend")) {
      reply = "Ahmed has extensive experience with NestJS, building modular enterprise architectures, robust REST APIs, authentication guards, and microservices integrated with MongoDB Atlas and Redis.";
    } else if (lower.includes("next") || lower.includes("react") || lower.includes("frontend")) {
      reply = "Ahmed architects modern Next.js App Router applications with React 19, TypeScript, Tailwind CSS, and Framer Motion, delivering optimal performance, clean UX, and accessible interfaces.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
