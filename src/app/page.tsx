import { getPortfolioStore } from "@/lib/store";
import { HeroSection } from "@/components/sections/hero";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ProjectsTeaser } from "@/components/sections/projects-teaser";
import { WorkflowTimeline } from "@/components/sections/workflow-timeline";
import { CertificatesSection } from "@/components/sections/certificates-section";
import { InteractiveTerminal } from "@/components/sections/interactive-terminal";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const store = getPortfolioStore();
  const activeProjects = store.projects.filter((p) => p.published !== false);
  const activeCertificates = store.certificates.filter((c) => c.published !== false);

  return (
    <div className="w-full space-y-4">
      <HeroSection />
      <InteractiveTerminal />
      <TechStackSection />
      <div id="projects" className="scroll-mt-16">
        <ProjectsTeaser projects={activeProjects} />
      </div>
      <CertificatesSection initialCertificates={activeCertificates} />
      <WorkflowTimeline />
    </div>
  );
}
