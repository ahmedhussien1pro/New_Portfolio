import { HeroSection } from "@/components/sections/hero";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      {/* Anchor for projects section to be populated in Step 4 */}
      <div id="projects" className="scroll-mt-24" />
    </div>
  );
}
