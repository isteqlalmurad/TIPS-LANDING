import { NavBarV3 } from "@/app/_components/landing-v2/NavBarV3";
import { ResearchHero } from "@/app/_components/landing-v2/research/ResearchHero";
import { DiversityEngine } from "@/app/_components/landing-v2/research/DiversityEngine";
import { OurResearch } from "@/app/_components/landing-v2/research/OurResearch";
import { DeployedAtScale } from "@/app/_components/landing-v2/research/DeployedAtScale";
import { Frameworks } from "@/app/_components/landing-v2/research/Frameworks";
import { ClosingSections } from "@/app/_components/landing-v2/ClosingSections";

export const metadata = {
  title: "Research · SimPatient",
  description:
    "Six peer-reviewed papers. The Diversity Engine. Deployed at the University of St Andrews and ScotGEM. SimPatient is built on real, published research in AI and medical education.",
};

export default function ResearchPage() {
  return (
    <main className="v2-page" style={{ background: "var(--v2-ink)" }}>
      <NavBarV3 />
      <ResearchHero />
      <DiversityEngine />
      <OurResearch />
      <DeployedAtScale />
      <Frameworks />
      <ClosingSections showResearch={false} showTestimonials={false} />
    </main>
  );
}
