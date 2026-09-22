import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the AI assistant for Ahmed Hussien, an elite Full Stack Software Engineer and Founder of CyberLabs. You speak with a calm, highly professional tone. Ahmed specializes in pure software engineering, scalable cloud architecture (DigitalOcean, Cloudflare, Railway), and modern web frameworks (Next.js, React, Node.js, NestJS, MongoDB Atlas). He uses tools like Jira and Bitbucket for enterprise-grade workflows. Do NOT discuss hardware or embedded systems. Guide visitors to view his work on CyberLabs or Eduko.
`;

const QUICK_RESPONSES: Record<string, string> = {
  stack:
    "Ahmed specializes in pure software engineering across the stack: Next.js (15/16 App Router) and React on the frontend; NestJS and Node.js for microservices; MongoDB Atlas and Redis for distributed data; and DigitalOcean, Cloudflare, and Railway for cloud architecture. He employs Jira and Bitbucket for enterprise agile delivery.",
  cyberlabs:
    "CyberLabs is Ahmed's software engineering venture where he serves as Founder & System Administrator. He architected the cloud backbone across DigitalOcean and Cloudflare, managed backend microservices (including cyberlabs-admin and vm-service), and scaled multi-region MongoDB Atlas databases.",
  eduko:
    "At Eduko, Ahmed co-developed the platform frontend utilizing Next.js (15/16) and React, while managing automated CI/CD deployment pipelines via GitHub Actions and Vercel for continuous zero-downtime delivery.",
  streaming:
    "As an Integration Specialist, Ahmed engineered real-time RTSP video streaming directly into custom React dashboards (<300ms latency) and integrated state-of-the-art Text-to-Speech (TTS) AI APIs for automated Arabic voiceovers.",
  contact:
    "You can reach Ahmed through the Contact section on this portfolio, download his CV directly via the navigation bar or CMD+K menu, or inquire about software engineering leadership and cloud architecture contracts.",
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
                      text: `${SYSTEM_PROMPT}\n\nUser Question: ${message}\nAnswer with a calm, highly professional tone:`,
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
            "Ahmed specializes in pure software engineering and cloud architecture. How can I guide you through his work?";
          return NextResponse.json({ reply });
        }
      } catch (err) {
        console.error("Gemini API error, falling back to local brain:", err);
      }
    }

    // Contextual local fallback adhering strictly to the system prompt
    let reply =
      "Greetings. I am Ahmed Hussien's AI assistant. Ahmed is an elite Full Stack Software Engineer and Founder of CyberLabs, specializing in scalable cloud architecture, modern web frameworks, and enterprise software engineering. Would you like to explore his work on CyberLabs or Eduko?";

    if (
      lower.includes("tech") ||
      lower.includes("stack") ||
      lower.includes("skill") ||
      lower.includes("framework")
    ) {
      reply = QUICK_RESPONSES.stack;
    } else if (
      lower.includes("cyberlabs") ||
      lower.includes("founder") ||
      lower.includes("vm") ||
      lower.includes("admin")
    ) {
      reply = QUICK_RESPONSES.cyberlabs;
    } else if (
      lower.includes("eduko") ||
      lower.includes("education") ||
      lower.includes("learning")
    ) {
      reply = QUICK_RESPONSES.eduko;
    } else if (
      lower.includes("rtsp") ||
      lower.includes("stream") ||
      lower.includes("video") ||
      lower.includes("voice") ||
      lower.includes("tts") ||
      lower.includes("arabic")
    ) {
      reply = QUICK_RESPONSES.streaming;
    } else if (
      lower.includes("contact") ||
      lower.includes("hire") ||
      lower.includes("email") ||
      lower.includes("cv") ||
      lower.includes("resume")
    ) {
      reply = QUICK_RESPONSES.contact;
    } else if (
      lower.includes("hardware") ||
      lower.includes("iot") ||
      lower.includes("embedded") ||
      lower.includes("arduino")
    ) {
      reply =
        "Ahmed is strictly focused on pure software engineering, scalable cloud architecture, and modern web applications. His work centers exclusively on high-performance distributed software systems.";
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
