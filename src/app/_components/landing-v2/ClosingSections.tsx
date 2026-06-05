import { PathIn } from "@/app/_components/landing-v2/PathIn";
import { ResearchBlock } from "@/app/_components/landing-v2/ResearchBlock";
import { SiteFooter } from "@/app/_components/landing-v2/SiteFooter";
import { Testimonials } from "@/app/_components/landing-v2/Testimonials";

type ClosingSectionsProps = {
  showResearch?: boolean;
  showTestimonials?: boolean;
};

export function ClosingSections({
  showResearch = true,
  showTestimonials = true,
}: ClosingSectionsProps) {
  return (
    <>
      {showResearch ? <ResearchBlock /> : null}
      {showTestimonials ? <Testimonials /> : null}
      <PathIn />
      <SiteFooter />
    </>
  );
}
