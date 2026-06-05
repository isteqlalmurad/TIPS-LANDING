import { NavBarV3 } from "@/app/_components/landing-v2/NavBarV3";
import { HeroBleed } from "@/app/_components/landing-v2/HeroBleed";
import { TrustStripV3 } from "@/app/_components/landing-v2/TrustStripV3";
import { PremiseSection } from "@/app/_components/landing-v2/PremiseSection";
import { FoundersFilm } from "@/app/_components/landing-v2/FoundersFilm";
import { DiversityEngineV3 } from "@/app/_components/landing-v2/DiversityEngineV3";
import { HowItWorks } from "@/app/_components/landing-v2/HowItWorks";
import { OurStory } from "@/app/_components/landing-v2/OurStory";
import { ClosingSections } from "@/app/_components/landing-v2/ClosingSections";

export default function HomePage() {
  return (
    <main className="v2-page" style={{ background: "var(--v2-ink)" }}>
      <NavBarV3 />
      <HeroBleed />
      <TrustStripV3 />
      <PremiseSection />
      <FoundersFilm />
      <DiversityEngineV3 />
      <HowItWorks />
      <OurStory />
      <ClosingSections />
    </main>
  );
}
