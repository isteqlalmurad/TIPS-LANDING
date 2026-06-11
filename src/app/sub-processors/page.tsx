// app/sub-processors/page.tsx
//
// Sub-processors landing page. Reachable by direct URL and from the
// inline references in the Privacy Policy (section 7.1) and DPA
// (Annex 3). It is NOT a LegalDoc (not in app/legal/content.ts), so it
// never appears in the sidebar Legal group or the legal cross-nav.
//
// Product decision (2026-06): we no longer publish the itemised
// sub-processor list (specific provider names) on a public page. The
// list is provided to customers and prospective customers ON REQUEST.
// This page therefore describes the CATEGORIES of sub-processors and
// the on-request route, which keeps the cited URL resolving and remains
// UK GDPR Art. 28 compliant (controllers can obtain the list promptly)
// without publishing a vendor inventory.

import Link from "next/link";

export const metadata = {
  title: "Sub-processors",
  description:
    "The categories of sub-processors SimPatient engages, and how to request the current itemised list.",
};

const CATEGORIES: { label: string; detail: string }[] = [
  {
    label: "Cloud hosting & edge delivery",
    detail: "Runs the application and serves it securely.",
  },
  {
    label: "Database, authentication & file storage",
    detail: "Stores account data and content on EU/UK infrastructure.",
  },
  {
    label: "AI model inference",
    detail: "Large language model responses and speech-to-text.",
  },
  {
    label: "Voice & avatar generation",
    detail: "Synthetic voices and real-time video avatars.",
  },
  {
    label: "Transactional email",
    detail: "Invitations, password resets, and service notices.",
  },
  {
    label: "In-app feedback & support",
    detail: "Optional feedback and bug-reporting tool.",
  },
];

export default function SubProcessorsPage() {
  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          aria-label="Back to Privacy Policy"
          className="inline-flex items-center gap-2 text-sm text-[#134E4A]/60 hover:text-[#0891B2] transition-colors mb-6"
          href="/legal/privacy-policy"
        >
          <span aria-hidden>&larr;</span>
          <span>Back to Privacy Policy</span>
        </Link>

        <article className="bg-white rounded-[20px] border-3 border-[#E0F2FE] shadow-[6px_6px_12px_rgba(8,145,178,0.06),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] p-6 sm:p-10">
          <header className="mb-8 pb-6 border-b border-[#E0F2FE]">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#134E4A] leading-tight">
              Sub-processors
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#134E4A]/70 leading-relaxed">
              The third-party providers we engage to deliver the Service. Each
              is bound by a written Data Processing Agreement, processes personal
              data exclusively on EU/UK infrastructure, and is contractually
              prohibited from using your data to train AI models.
            </p>
          </header>

          <div className="space-y-3 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-[#134E4A]">
              Categories of sub-processor
            </h2>
            <p className="text-sm sm:text-base text-[#134E4A]/80 leading-relaxed">
              We use a small number of sub-processors across the following
              categories:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORIES.map((c) => (
              <div
                key={c.label}
                className="rounded-[14px] border border-[#E0F2FE] bg-white p-4"
              >
                <p className="text-sm font-semibold text-[#134E4A]">{c.label}</p>
                <p className="text-xs text-[#134E4A]/60 leading-relaxed mt-1">
                  {c.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 sm:p-6 rounded-[14px] bg-[#F0FDFA] border-l-4 border-[#0891B2]">
            <h2 className="text-base font-semibold text-[#134E4A] mb-2">
              Requesting the full list
            </h2>
            <p className="text-sm sm:text-base text-[#134E4A]/80 leading-relaxed">
              A current, itemised list of our sub-processors (including the
              specific providers, their role, the data they process, and their
              processing region) is available to customers and prospective
              customers on request. Email{" "}
              <a
                className="text-[#0891B2] hover:text-[#0E7490] underline-offset-2 hover:underline"
                href="mailto:hello@simpatient.co.uk"
              >
                hello@simpatient.co.uk
              </a>{" "}
              and we will provide it promptly. Customers are notified before we
              add or replace any sub-processor that handles personal data.
            </p>
          </div>

          <div className="mt-6 p-5 sm:p-6 rounded-[14px] bg-[#F0FDFA] border border-[#E0F2FE]">
            <h2 className="text-base font-semibold text-[#134E4A] mb-2">
              Related documents
            </h2>
            <p className="text-sm text-[#134E4A]/80 leading-relaxed">
              This supports section 7 of our{" "}
              <Link
                className="text-[#0891B2] hover:text-[#0E7490] underline-offset-2 hover:underline"
                href="/legal/privacy-policy"
              >
                Privacy Policy
              </Link>{" "}
              and Annex 3 of our{" "}
              <Link
                className="text-[#0891B2] hover:text-[#0E7490] underline-offset-2 hover:underline"
                href="/legal/data-processing-agreement"
              >
                Data Processing Agreement
              </Link>
              .
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
