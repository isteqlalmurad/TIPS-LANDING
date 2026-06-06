// src/app/legal/privacy-policy/page.tsx
//
// Privacy Policy route binding. Content lives in src/legal/content.ts
// (copied byte-for-byte from the SimPatient app so the wording is
// identical across both sites); layout lives in
// src/components/legal/LegalDocPage.tsx.

import LegalDocPage from "@/components/legal/LegalDocPage";
import { getLegalDoc } from "@/legal/content";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How SimPatient collects, uses, and protects personal information across the platform.",
};

export default function PrivacyPolicyPage() {
  const doc = getLegalDoc("privacy-policy");

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#F0FDFA] flex items-center justify-center p-6">
        <p className="text-sm text-[#134E4A]/70">
          Privacy Policy is unavailable.
        </p>
      </div>
    );
  }

  return <LegalDocPage doc={doc} />;
}
