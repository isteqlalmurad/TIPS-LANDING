// components/legal/LegalDocPage.tsx
//
// Shared layout for the /legal/* documents (Privacy Policy, Terms of
// Service, Cookie Policy, Data Processing Agreement). The route file
// for each doc resolves a slug and hands the matching content blob in
// as the `doc` prop. All visual styling, navigation, inline-link
// behaviour, and table rendering lives here.
//
// Styled to match the landing site's design system (warm paper
// background, Source Serif display headings, thin hairline rules,
// the v2 cyan accent) and wrapped in the shared NavBar + Footer so a
// legal page feels like part of the same site, not the app.

"use client";

import Link from "next/link";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";

import { NavBarV3 } from "@/app/_components/landing-v2/NavBarV3";
import { SiteFooter } from "@/app/_components/landing-v2/SiteFooter";
import {
  LEGAL_DOCS,
  type LegalBlock,
  type LegalDoc,
} from "@/legal/content";

interface LegalDocPageProps {
  doc: LegalDoc;
}

export default function LegalDocPage({ doc }: LegalDocPageProps) {
  const otherDocs = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);

  return (
    <main className="v2-page" style={{ background: "var(--v2-ink)" }}>
      <NavBarV3 />

      <section
        className="v2-section"
        style={{
          background: "var(--v2-paper)",
          color: "var(--v2-ink)",
          // Clear the absolute-positioned nav.
          paddingTop: 128,
        }}
      >
        <div className="v2-container" style={{ maxWidth: 860 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "var(--v2-ink-muted)",
              textDecoration: "none",
              marginBottom: 40,
            }}
          >
            <LucideArrowLeft size={15} strokeWidth={1.8} />
            <span>Back to home</span>
          </Link>

          {/* Header */}
          <header
            style={{
              marginBottom: 48,
              paddingBottom: 32,
              borderBottom: "1px solid var(--v2-rule)",
            }}
          >
            <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
              Legal
            </p>
            <h1
              style={{
                fontSize: "var(--v2-text-display-lg)",
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
              }}
            >
              {doc.title}
            </h1>
            {doc.tagline && (
              <p
                style={{
                  marginTop: 20,
                  marginBottom: 0,
                  fontSize: "var(--v2-text-body-lg)",
                  color: "var(--v2-ink-muted)",
                  lineHeight: 1.6,
                  maxWidth: 640,
                }}
              >
                {doc.tagline}
              </p>
            )}
            <p
              style={{
                marginTop: 16,
                marginBottom: 0,
                fontFamily: "var(--v2-font-mono)",
                fontSize: 12,
                letterSpacing: "0.04em",
                color: "var(--v2-ink-faint)",
              }}
            >
              Effective {doc.effectiveDate} &middot; Version {doc.version}
              {doc.applies ? ` · Applies to ${doc.applies}` : ""}
            </p>
            {doc.intro && (
              <p
                style={{
                  marginTop: 24,
                  marginBottom: 0,
                  fontSize: 16,
                  color: "var(--v2-ink)",
                  lineHeight: 1.7,
                }}
              >
                {doc.intro}
              </p>
            )}
          </header>

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {doc.sections.map((section, idx) => (
              <section key={idx}>
                {section.heading && (
                  <h2
                    style={
                      section.level === 3
                        ? {
                            fontFamily: "var(--v2-font-display)",
                            fontSize: 19,
                            fontWeight: 400,
                            color: "var(--v2-ink)",
                            margin: "8px 0 12px",
                            letterSpacing: "-0.01em",
                          }
                        : {
                            fontFamily: "var(--v2-font-display)",
                            fontSize: 26,
                            fontWeight: 400,
                            color: "var(--v2-ink)",
                            margin: "0 0 16px",
                            letterSpacing: "-0.015em",
                            lineHeight: 1.2,
                          }
                    }
                  >
                    {section.heading}
                  </h2>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {section.blocks.map((block, bIdx) => (
                    <BlockRenderer key={bIdx} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact callout */}
          {doc.contactBlock && (
            <div
              style={{
                marginTop: 48,
                padding: 28,
                borderRadius: 6,
                background: "var(--v2-paper-deep)",
                border: "1px solid var(--v2-rule)",
              }}
            >
              <p className="v2-eyebrow" style={{ marginBottom: 12 }}>
                Contact
              </p>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--v2-ink)",
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {doc.contactBlock}
              </p>
            </div>
          )}

          {/* Cross-doc nav */}
          {otherDocs.length > 0 && (
            <div style={{ marginTop: 56 }}>
              <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
                Related documents
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                  gap: 16,
                }}
              >
                {otherDocs.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/legal/${other.slug}`}
                    className="legal-related-card"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 16,
                      background: "var(--v2-paper-deep)",
                      border: "1px solid var(--v2-rule)",
                      borderRadius: 6,
                      padding: 20,
                      textDecoration: "none",
                      transition: "border-color 200ms ease, transform 200ms ease",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "var(--v2-font-display)",
                          fontSize: 17,
                          fontWeight: 400,
                          color: "var(--v2-ink)",
                          margin: 0,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {other.shortTitle}
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--v2-ink-muted)",
                          lineHeight: 1.5,
                          margin: "6px 0 0",
                        }}
                      >
                        {other.tagline}
                      </p>
                    </div>
                    <LucideArrowRight
                      size={16}
                      strokeWidth={1.8}
                      style={{ flexShrink: 0, marginTop: 2, color: "var(--v2-cyan-deep)" }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />

      <style jsx>{`
        .legal-related-card:hover {
          border-color: var(--v2-ink) !important;
          transform: translateY(-2px);
        }
        :global(.legal-ul li) {
          padding-left: 4px;
        }
        :global(.legal-ul) {
          list-style: disc;
        }
        :global(.legal-ul li::marker) {
          color: var(--v2-cyan-deep);
        }
      `}</style>
    </main>
  );
}

// Render a single content block.
function BlockRenderer({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return (
      <p
        style={{
          fontSize: 16,
          color: "var(--v2-ink)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {renderInline(block.text)}
      </p>
    );
  }
  if (block.type === "ul") {
    return (
      <ul
        style={{
          margin: 0,
          paddingLeft: 22,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: 16,
          color: "var(--v2-ink)",
          lineHeight: 1.7,
        }}
        className="legal-ul"
      >
        {block.items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "table") {
    return (
      <div
        style={{
          overflowX: "auto",
          borderRadius: 6,
          border: "1px solid var(--v2-rule)",
          margin: "4px 0",
        }}
      >
        <table
          style={{
            minWidth: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: 14,
          }}
        >
          <thead style={{ background: "var(--v2-paper-deep)" }}>
            <tr>
              {block.headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "var(--v2-ink)",
                    borderBottom: "1px solid var(--v2-rule)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {renderInline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rIdx) => (
              <tr key={rIdx} style={{ verticalAlign: "top" }}>
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid var(--v2-rule-soft)",
                      color: "var(--v2-ink-muted)",
                      lineHeight: 1.6,
                    }}
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
      <div
        style={{
          padding: "16px 20px",
          borderRadius: 6,
          background: "var(--v2-cyan-wash)",
          borderLeft: "3px solid var(--v2-cyan)",
        }}
      >
        <p
          style={{
            fontSize: 15,
            color: "var(--v2-ink)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
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
        <strong key={i} style={{ fontWeight: 600, color: "var(--v2-ink)" }}>
          {piece.text}
        </strong>
      );
    }
    if (piece.kind === "email") {
      return (
        <a
          key={i}
          style={{ color: "var(--v2-cyan-deep)", textUnderlineOffset: 2 }}
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
          style={{ color: "var(--v2-cyan-deep)", textUnderlineOffset: 2, wordBreak: "break-word" }}
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
// URLs and emails inside the remaining text.
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
