// app/sub-processors/page.tsx
//
// Standalone, publicly reachable sub-processor list. This is the page
// the Privacy Policy (section 7.1) and the DPA (Annex 3) both point to
// when they say "an up-to-date list is maintained at
// simpatient.co.uk/sub-processors".
//
// DELIBERATELY NOT a LegalDoc: it is not registered in
// app/legal/content.ts, so it does NOT appear in the sidebar's Legal
// group nor in the "Related documents" cross-nav on the /legal/* pages.
// It is reachable only by direct URL or by the inline links inside the
// Privacy Policy and DPA. That matches the product decision to surface
// it by reference, not as a navigable tab.
//
// The table renders from app/legal/sub-processors.ts, the single
// source of truth shared with the two legal documents, so the three
// can never drift apart.

import Link from "next/link";

import {
  SUB_PROCESSORS,
  SUB_PROCESSOR_NOTICE_DAYS,
} from "@/legal/sub-processors";

export const metadata = {
  title: "Sub-processors",
  description:
    "The third-party sub-processors SimPatient engages to deliver the Service, the data they process, and the regions they operate in.",
};

export default function SubProcessorsPage() {
  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link. Plain anchor (this page is a server component and
            has no router); browser-back is the natural return path for
            someone who clicked through from a legal doc. */}
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
              The third-party providers SimPatient engages to deliver the
              Service. Each is bound by a written Data Processing Agreement and
              processes personal data exclusively on EU/UK infrastructure.
            </p>
          </header>

          {/* Table on md+; scroll wrapper keeps it usable on small
              screens. Below md it collapses to a stack of cards so no
              column is clipped at narrow viewports. */}
          <div className="hidden md:block overflow-x-auto rounded-[14px] border border-[#E0F2FE]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F0FDFA] text-[#134E4A]">
                <tr>
                  <th
                    className="px-4 py-2.5 font-semibold border-b border-[#E0F2FE] whitespace-nowrap"
                    scope="col"
                  >
                    Provider
                  </th>
                  <th
                    className="px-4 py-2.5 font-semibold border-b border-[#E0F2FE]"
                    scope="col"
                  >
                    Role
                  </th>
                  <th
                    className="px-4 py-2.5 font-semibold border-b border-[#E0F2FE]"
                    scope="col"
                  >
                    Data
                  </th>
                  <th
                    className="px-4 py-2.5 font-semibold border-b border-[#E0F2FE] whitespace-nowrap"
                    scope="col"
                  >
                    Region
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUB_PROCESSORS.map((sp) => (
                  <tr
                    key={sp.name}
                    className="odd:bg-white even:bg-[#F0FDFA]/40 align-top"
                  >
                    <td className="px-4 py-2.5 border-b border-[#E0F2FE]/60 font-semibold text-[#134E4A]">
                      {sp.name}
                    </td>
                    <td className="px-4 py-2.5 border-b border-[#E0F2FE]/60 text-[#134E4A]/80 leading-relaxed">
                      {sp.role}
                    </td>
                    <td className="px-4 py-2.5 border-b border-[#E0F2FE]/60 text-[#134E4A]/80 leading-relaxed">
                      {sp.data}
                    </td>
                    <td className="px-4 py-2.5 border-b border-[#E0F2FE]/60 text-[#134E4A]/80 leading-relaxed whitespace-nowrap">
                      {sp.region}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card collapse below md. */}
          <div className="md:hidden space-y-3">
            {SUB_PROCESSORS.map((sp) => (
              <div
                key={sp.name}
                className="rounded-[14px] border border-[#E0F2FE] bg-white p-4"
              >
                <p className="text-sm font-semibold text-[#134E4A]">{sp.name}</p>
                <dl className="mt-2 space-y-1.5 text-xs text-[#134E4A]/80 leading-relaxed">
                  <div className="flex gap-2">
                    <dt className="font-semibold text-[#134E4A]/60 shrink-0 w-16">
                      Role
                    </dt>
                    <dd>{sp.role}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold text-[#134E4A]/60 shrink-0 w-16">
                      Data
                    </dt>
                    <dd>{sp.data}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold text-[#134E4A]/60 shrink-0 w-16">
                      Region
                    </dt>
                    <dd>{sp.region}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-sm sm:text-base text-[#134E4A]/80 leading-relaxed">
              Each sub-processor is bound by a written Data Processing Agreement
              that commits it to processing personal data only in the EU/UK
              region, prohibits using personal data to train AI models, requires
              appropriate security measures, and flows down assistance with data
              subject rights.
            </p>
            <p className="text-sm sm:text-base text-[#134E4A]/80 leading-relaxed">
              We will notify institutional customers at least{" "}
              {SUB_PROCESSOR_NOTICE_DAYS} days before adding or replacing a
              sub-processor that handles personal data. Customers may object in
              accordance with their Data Processing Agreement.
            </p>
          </div>

          <div className="mt-10 p-5 sm:p-6 rounded-[14px] bg-[#F0FDFA] border border-[#E0F2FE]">
            <h2 className="text-base font-semibold text-[#134E4A] mb-2">
              Related documents
            </h2>
            <p className="text-sm text-[#134E4A]/80 leading-relaxed">
              This list supports section 7 of our{" "}
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
