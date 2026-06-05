import { NavBarV3 } from "@/app/_components/landing-v2/NavBarV3";
import { PricingInquiryForm } from "@/app/_components/landing-v2/pricing/PricingInquiryForm";
import { SiteFooter } from "@/app/_components/landing-v2/SiteFooter";

export const metadata = {
  title: "Pricing · SimPatient",
  description:
    "Tailored pricing for medical schools, postgraduate training programmes and clinical-skills departments. Tell us about your cohort and we'll come back within one working day.",
};

export default function PricingPage() {
  return (
    <main className="v2-page" style={{ background: "var(--v2-ink)" }}>
      <NavBarV3 />
      <PricingInquiryForm />
      <SiteFooter />
    </main>
  );
}
