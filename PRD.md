# Product Requirements Document (PRD)
**Project Name:** Elite Full Stack Developer Portfolio
**Developer:** Ahmed Hussien
**Role:** Full Stack Software Engineer & Founder at CyberLabs

## 1. Overview & Core Philosophy
Build a highly interactive, premium, multi-page portfolio. The core philosophy is "Maximum Professionalism with a Wow Factor." 
- **Strict Constraint:** DO NOT mention or include any hardware, IoT, or embedded systems. Focus 100% on pure software engineering, advanced web applications, and cloud architecture.
- **Content Strategy:** Avoid clutter. Use a minimalist approach on the Home page with "Read More" routing to dedicated detail pages.

## 2. Tech Stack
- **Frontend Framework:** Next.js (App Router), React.
- **Styling:** Tailwind CSS.
- **UI Components:** Shadcn UI (for clean, accessible components).
- **Animations & Effects:** Framer Motion (page transitions) + Aceternity UI (for complex 3D and scroll effects).
- **Backend & AI Integration:** NestJS (API handling), Google Gemini Pro API (for the AI Assistant).
- **Code Highlighting:** Shiki (for VS Code-like snippet rendering).

## 3. Design System & Theme
- **Theme Support:** Full Dark / Light mode toggle.
- **Background Texture (CRITICAL):** NO solid, flat backgrounds. Use a subtle CSS pattern (Dot Matrix or Grid). 
  - *Dark Mode:* `bg-zinc-950` with faint `zinc-800` dots.
  - *Light Mode:* `bg-slate-50` with faint `slate-200` dots.
- **Accent Color:** Use ONE consistent accent color: Emerald Green (`#10b981`) OR Calm Purple (`#8b5cf6`). Use this sparingly for active states, hover borders, primary buttons, and the Spotlight effect. NO heavy gradients.
- **Typography:** Clean, modern Sans-serif (Inter or Geist).

## 4. Global Features (Available on all pages)
- **Floating AI Assistant:** A floating widget at the bottom right. Opens a clean Shadcn Chat UI connected to the NestJS backend to answer questions about Ahmed's skills and experience.
- **Command Palette (CMD+K / Ctrl+K):** A hidden search bar to navigate pages, toggle themes, or download the CV.
- **API Health Indicator:** A tiny pulsing green dot in the footer stating "Systems Operational" (mocking a real connection to the NestJS backend).
- **Page Transitions:** Smooth fade-in or slide-up using Framer Motion when routing between pages.

## 5. Site Architecture & Page Specifications

### A. Home Page (`/`) - The Teaser
- **Hero Section:**
  - *Effect:* Aceternity UI "Spotlight" tracking the mouse.
  - *Content:* "Ahmed Hussien" -> "Full Stack Software Engineer & Founder at CyberLabs".
  - *Interactive Element:* Aceternity 3D Glassmorphism Card that tilts with mouse movement, showing brief impressive stats (e.g., "Cloud Architecture | Advanced APIs").
- **Tech Stack Teaser:** 
  - Categorized (Frontend, Backend, Cloud/DevOps).
  - Use Animated Tooltips (Shadcn/Aceternity) for technologies like Next.js, NestJS, MongoDB Atlas, DigitalOcean, Cloudflare.
- **Selected Projects (The "Wow" Factor):**
  - Use Aceternity "Macbook Scroll" or "Container Scroll" effect.
  - Show top 2 projects (e.g., CyberLabs, Eduko).
  - Include a subtle "Read More ->" button with a hover spring animation.
- **Workflow / DevOps Timeline:**
  - Animated timeline showing: Jira -> GitHub/Bitbucket -> Vercel/Railway -> DigitalOcean/Cloudflare.

### B. Project Details Page (`/projects/[id]`) - Strict Layout
When a user clicks "Read More" on a project, route them here. The layout MUST follow this exact vertical flow:
1. **Live View:** Hero section with the project title, brief, and a prominent button/link to the live site.
2. **Architecture / Code Overview:** A high-level explanation of how the frontend connects to the backend (e.g., Next.js to NestJS).
3. **More Screens:** A masonry grid or carousel of UI screenshots.
4. **Description:** Detailed text explaining the technical challenges solved.
5. **Code Snippets:** Beautifully formatted code blocks using `Shiki` showing a specific clever implementation (e.g., an API controller or a complex React hook).

### C. Experience & Contact (`/experience`, `/contact`)
- **Experience:** A detailed vertical timeline highlighting the role as Founder of CyberLabs and full-stack capabilities.
- **Contact:** Clean Shadcn Form with Zod validation (Name, Email, Message). 

## 6. Implementation Instructions for AI Assistant (Antigravity)
- **Step 1:** Scaffold the Next.js App Router project with Tailwind, Shadcn, and Framer Motion.
- **Step 2:** Setup the global layout, Background Dot pattern, Accent color variables, and the Theme Provider.
- **Step 3:** Build the Navbar and the Hero Section (with Spotlight and 3D Card).
- **Step 4:** Pause for user review before implementing the complex Aceternity scroll effects.
- **Rule:** Keep components highly modular. Extract repetitive UI elements into `components/ui/`.