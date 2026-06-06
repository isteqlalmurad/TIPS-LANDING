// src/app/legal/cookie-policy/page.tsx
//
// Cookie Policy route binding. Content lives in src/legal/content.ts
// (cookie table sourced from src/legal/cookies.ts); layout lives in
// src/components/legal/LegalDocPage.tsx. The short /cookies URL (cited
// by the Privacy Policy) redirects here via next.config.ts.

import LegalDocPage from "@/components/legal/LegalDocPage";
import { getLegalDoc } from "@/legal/content";

export const metadata = {
  title: "Cookie Policy",
  description:
    "The cookies and similar technologies SimPatient uses, why we use them, and how long they last.",
};

export default function CookiePolicyPage() {
  const doc = getLegalDoc("cookie-policy");

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#F0FDFA] flex items-center justify-center p-6">
        <p className="text-sm text-[#134E4A]/70">
          Cookie Policy is unavailable.
        </p>
      </div>
    );
  }

  return <LegalDocPage doc={doc} />;
}
