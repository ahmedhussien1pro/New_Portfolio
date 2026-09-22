import { getPortfolioStore } from "@/lib/store";
import { HeroSection } from "@/components/sections/hero";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ShowcaseScrollSection } from "@/components/sections/showcase-scroll";
import { FeaturedCaseStudies } from "@/components/sections/featured-case-studies";
import { CleanCodeStudio } from "@/components/sections/clean-code-studio";
import { AIVoicePlayground } from "@/components/sections/ai-voice-playground";
import { WorkflowTimeline } from "@/components/sections/workflow-timeline";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const store = getPortfolioStore();
  const activeProjects = store.projects.filter((p) => p.published !== false);

  return (
    <div className="w-full">
      {/* 1. Hero Area: Spotlight + 3D Tilt Card + Bento Stats */}
      <HeroSection />

      {/* 2. The Tech Ecosystem: Interactive Neural Node Map & Architectural Tiers */}
      <TechStackSection />

      {/* 3. 3D Macbook Container Scroll: Live Interactive Telemetry Console */}
      <ShowcaseScrollSection />

      {/* 4. Featured Case Studies: CyberLabs & Eduko Systems Deep Dive */}
      <FeaturedCaseStudies projects={activeProjects} />

      {/* 5. Clean Code Studio: Authentic VS Code IDE with Shiki Syntax Highlighting */}
      <CleanCodeStudio />

      {/* 6. AI Voice Playground: Staff Engineer Inference & Web Speech TTS */}
      <AIVoicePlayground />

      {/* 7. Enterprise Delivery Workflow: Pipeline with Aceternity Background Beams */}
      <WorkflowTimeline />
    </div>
  );
}
