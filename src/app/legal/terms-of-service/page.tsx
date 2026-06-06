// src/app/legal/terms-of-service/page.tsx
//
// Terms of Service route binding. Content lives in src/legal/content.ts
// (copied byte-for-byte from the SimPatient app); layout lives in
// src/components/legal/LegalDocPage.tsx.

import LegalDocPage from "@/components/legal/LegalDocPage";
import { getLegalDoc } from "@/legal/content";

export const metadata = {
  title: "Terms of Service",
  description:
    "The legal agreement between you and SimPatient when you use the platform.",
};

export default function TermsOfServicePage() {
  const doc = getLegalDoc("terms-of-service");

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#F0FDFA] flex items-center justify-center p-6">
        <p className="text-sm text-[#134E4A]/70">
          Terms of Service is unavailable.
        </p>
      </div>
    );
  }

  return <LegalDocPage doc={doc} />;
}
