import { HeroSection } from "@/components/sections/hero";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ProjectsTeaser } from "@/components/sections/projects-teaser";
import { WorkflowTimeline } from "@/components/sections/workflow-timeline";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <TechStackSection />
      <div id="projects" className="scroll-mt-16">
        <ProjectsTeaser />
      </div>
      <WorkflowTimeline />
    </div>
  );
}
