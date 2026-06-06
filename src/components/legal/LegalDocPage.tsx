// components/legal/LegalDocPage.tsx
//
// Shared layout for the three /legal/* documents (Privacy Policy,
// Terms of Service, Data Processing Agreement). The route file for
// each doc just resolves a slug and hands the matching content
// blob in as the `doc` prop. All visual styling, navigation,
// inline-link behaviour, and table rendering lives here.
//
// Why a shared component instead of inlining per page: keeps the
// three docs visually identical and lets us tweak typography in one
// place. Also lets us add per-page niceties (cross-doc nav at the
// bottom, jump-to-section TOC) without three-way drift.
//
// Layout: claymorphic outer card on the medical-clean tinted
// background, with a back link, doc title + tagline, content body,
// then a contact callout. Cross-doc footer offers the other two
// legal pages so a user reading one is one click from the others.

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";

import {
  LEGAL_DOCS,
  type LegalBlock,
  type LegalDoc,
} from "@/legal/content";

interface LegalDocPageProps {
  doc: LegalDoc;
}

export default function LegalDocPage({ doc }: LegalDocPageProps) {
  const router = useRouter();
  const otherDocs = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);

  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back button. Uses router.back() so users coming from the
            sidebar's "Legal" group, the privacy banner, or a deep
            link all return to where they came from. */}
        <button
          aria-label="Go back"
          className="inline-flex items-center gap-2 text-sm text-[#134E4A]/60 hover:text-[#0891B2] transition-colors mb-6"
          type="button"
          onClick={() => router.back()}
        >
          <LucideArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Main doc card. All three legal docs share this exact
            chrome so a user moving between them sees the same
            layout, only the content changes. */}
        <article className="bg-white rounded-[20px] border-3 border-[#E0F2FE] shadow-[6px_6px_12px_rgba(8,145,178,0.06),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] p-6 sm:p-10">
          <header className="mb-8 pb-6 border-b border-[#E0F2FE]">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#134E4A] leading-tight">
              {doc.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#134E4A]/70 leading-relaxed">
              {doc.tagline}
            </p>
            <p className="mt-3 text-xs sm:text-sm text-[#134E4A]/50 leading-relaxed">
              Effective {doc.effectiveDate} . Version {doc.version}
              {doc.applies ? ` . Applies to ${doc.applies}` : ""}
            </p>
            {doc.intro && (
              <p className="mt-5 text-sm sm:text-base text-[#134E4A]/80 leading-relaxed">
                {doc.intro}
              </p>
            )}
          </header>

          <div className="space-y-8">
            {doc.sections.map((section, idx) => (
              <section key={idx}>
                {section.heading && (
                  <h2
                    className={
                      section.level === 3
                        ? "text-base sm:text-lg font-semibold text-[#134E4A] mt-6 mb-3"
                        : "text-lg sm:text-xl font-bold text-[#134E4A] mb-4"
                    }
                  >
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-3">
                  {section.blocks.map((block, bIdx) => (
                    <BlockRenderer key={bIdx} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {doc.contactBlock && (
            <div className="mt-10 p-5 sm:p-6 rounded-[14px] bg-[#F0FDFA] border border-[#E0F2FE]">
              <h2 className="text-base font-semibold text-[#134E4A] mb-2">
                Contact
              </h2>
              <p className="text-sm text-[#134E4A]/80 leading-relaxed whitespace-pre-line">
                {doc.contactBlock}
              </p>
            </div>
          )}
        </article>

        {/* Cross-doc nav. A reader who landed on Privacy is one click
            from Terms and DPA, and vice versa. Stacked column on
            mobile so each card gets the full width to breathe. */}
        {otherDocs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#134E4A]/50 mb-3">
              Related documents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherDocs.map((other) => (
                <Link
                  key={other.slug}
                  className="group flex items-start justify-between gap-4 bg-white rounded-[14px] border-2 border-[#E0F2FE] p-4 sm:p-5 hover:border-[#0891B2]/40 hover:shadow-[6px_6px_12px_rgba(8,145,178,0.08)] transition-all duration-200"
                  href={`/legal/${other.slug}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#134E4A] group-hover:text-[#0891B2] transition-colors">
                      {other.shortTitle}
                    </p>
                    <p className="text-xs text-[#134E4A]/60 leading-relaxed mt-1 line-clamp-2">
                      {other.tagline}
                    </p>
                  </div>
                  <LucideArrowRight className="shrink-0 mt-1 w-4 h-4 text-[#134E4A]/30 group-hover:text-[#0891B2] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Render a single content block. Lives outside the page component
// so the JSX it returns isn't re-created on parent rerenders.
function BlockRenderer({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return (
      <p className="text-sm sm:text-base text-[#134E4A]/80 leading-relaxed">
        {renderInline(block.text)}
      </p>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-sm sm:text-base text-[#134E4A]/80 leading-relaxed marker:text-[#0891B2]/50">
        {block.items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "table") {
    return (
      <div className="overflow-x-auto rounded-[14px] border border-[#E0F2FE] my-2">
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#F0FDFA] text-[#134E4A]">
            <tr>
              {block.headers.map((h, i) => (
                <th
                  key={i}
                  className="px-3 sm:px-4 py-2.5 font-semibold border-b border-[#E0F2FE] whitespace-nowrap"
                  scope="col"
                >
                  {renderInline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="odd:bg-white even:bg-[#F0FDFA]/40 align-top"
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className="px-3 sm:px-4 py-2.5 border-b border-[#E0F2FE]/60 text-[#134E4A]/80 leading-relaxed"
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (block.type === "callout") {
    return (
      <div className="p-4 sm:p-5 rounded-[14px] bg-[#F0FDFA] border-l-4 border-[#0891B2]">
        <p className="text-sm sm:text-base text-[#134E4A]/90 leading-relaxed">
          {renderInline(block.text)}
        </p>
      </div>
    );
  }

  return null;
}

// ---------------------------------------------------------------------
// Inline rendering: **bold**, mailto-style emails, https:// URLs
// ---------------------------------------------------------------------

function renderInline(input: string): React.ReactNode {
  const pieces = splitTokens(input);

  return pieces.map((piece, i) => {
    if (piece.kind === "bold") {
      return (
        <strong key={i} className="font-semibold text-[#134E4A]">
          {piece.text}
        </strong>
      );
    }
    if (piece.kind === "email") {
      return (
        <a
          key={i}
          className="text-[#0891B2] hover:text-[#0E7490] underline-offset-2 hover:underline"
          href={`mailto:${piece.text}`}
        >
          {piece.text}
        </a>
      );
    }
    if (piece.kind === "url") {
      return (
        <a
          key={i}
          className="text-[#0891B2] hover:text-[#0E7490] underline-offset-2 hover:underline break-words"
          href={piece.text}
          rel="noopener noreferrer"
          target="_blank"
        >
          {piece.text}
        </a>
      );
    }

    return <span key={i}>{piece.text}</span>;
  });
}

interface InlinePiece {
  kind: "text" | "bold" | "email" | "url";
  text: string;
}

// Two-pass tokeniser. Peel off **bold** runs first, then linkify
// URLs and emails inside the remaining text. Keeps each regex
// narrow and the order deterministic.
function splitTokens(input: string): InlinePiece[] {
  const out: InlinePiece[] = [];
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldRegex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      pushLinkified(out, input.slice(lastIndex, match.index));
    }
    out.push({ kind: "bold", text: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < input.length) {
    pushLinkified(out, input.slice(lastIndex));
  }

  return out;
}

function pushLinkified(out: InlinePiece[], text: string): void {
  // URLs first: trailing punctuation (".", ")", ",", "]") is left
  // outside the captured URL so a sentence-ending period doesn't
  // get pulled into the href.
  const urlRe = /https?:\/\/[^\s)\],]+/g;
  const emailRe = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

  const urlPieces: InlinePiece[] = [];
  let cursor = 0;
  let m: RegExpExecArray | null;

  while ((m = urlRe.exec(text)) !== null) {
    if (m.index > cursor) {
      urlPieces.push({ kind: "text", text: text.slice(cursor, m.index) });
    }
    urlPieces.push({ kind: "url", text: m[0] });
    cursor = m.index + m[0].length;
  }
  if (cursor < text.length) {
    urlPieces.push({ kind: "text", text: text.slice(cursor) });
  }

  for (const piece of urlPieces) {
    if (piece.kind !== "text") {
      out.push(piece);
      continue;
    }
    let inner = 0;
    let em: RegExpExecArray | null;

    emailRe.lastIndex = 0;
    while ((em = emailRe.exec(piece.text)) !== null) {
      if (em.index > inner) {
        out.push({ kind: "text", text: piece.text.slice(inner, em.index) });
      }
      out.push({ kind: "email", text: em[0] });
      inner = em.index + em[0].length;
    }
    if (inner < piece.text.length) {
      out.push({ kind: "text", text: piece.text.slice(inner) });
    }
  }
}
