// src/app/legal/data-processing-agreement/page.tsx
//
// Data Processing Agreement route binding. Content lives in
// src/legal/content.ts (copied byte-for-byte from the SimPatient app);
// layout lives in src/components/legal/LegalDocPage.tsx. The short
// /dpa URL (cited by the Terms) redirects here via next.config.ts.

import LegalDocPage from "@/components/legal/LegalDocPage";
import { getLegalDoc } from "@/legal/content";

export const metadata = {
  title: "Data Processing Agreement",
  description:
    "How SimPatient processes personal data on behalf of institutional customers.",
};

export default function DataProcessingAgreementPage() {
  const doc = getLegalDoc("data-processing-agreement");

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#F0FDFA] flex items-center justify-center p-6">
        <p className="text-sm text-[#134E4A]/70">
          Data Processing Agreement is unavailable.
        </p>
      </div>
    );
  }

  return <LegalDocPage doc={doc} />;
}
