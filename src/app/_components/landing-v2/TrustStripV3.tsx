"use client";

import Image from "next/image";

type Logo = {
  /** Real image asset path */
  src?: string;
  /** Or an inline SVG node (used for OpenAI which we already have as SVG) */
  svg?: React.ReactNode;
  /** Fallback display label — also used as alt text */
  label: string;
};

// Drop logo files at /public/logo/ and swap the `label` slot for a real `src`.
// Placeholders render as quiet text labels so the layout always reads as
// a 6-slot trust strip even when assets are missing.
const LOGOS: Logo[] = [
  {
    src: "/shots/st anderws uni.png",
    label: "University of St Andrews",
  },
  {
    src: "/logo/NES_logo.jpg",
    label: "NHS Education for Scotland",
  },
  {
    // OpenAI knot mark — inline SVG so it scales/recolours cleanly.
    svg: <OpenAIMark />,
    label: "OpenAI Academy",
  },
  {
    src: "/logo/scotgem.jpg",
    label: "ScotGEM, Scottish Graduate Entry Medicine",
  },
  {
    src: "/logo/st-andrews-innovation.webp",
    label: "St Andrews Innovation",
  },
  {
    src: "/logo/converge.svg",
    label: "Converge Awards",
  },
];

export function TrustStripV3() {
  return (
    <section
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        background: "var(--v2-paper-deep)",
        position: "relative",
        // Hard cut from dark hero — borderTop deliberately omitted so the
        // section change reads as a chapter break, not a continuation.
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: "clamp(24px, 6vw, 96px)",
          paddingRight: "clamp(24px, 6vw, 96px)",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--v2-font-body)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--v2-ink-muted)",
            margin: 0,
            marginBottom: 40,
          }}
        >
          Our trust partners
        </p>

        {/* Logo wall */}
        <div
          className="v3-trust-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 40,
            alignItems: "center",
            justifyItems: "center",
            marginBottom: 48,
          }}
        >
          {LOGOS.map((logo, i) => (
            <div
              key={i}
              style={{
                height: 96,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                // Grayscale + reduced opacity gives the logo wall a unified
                // editorial register — no logo dominates with its own brand colour.
                filter: logo.src ? "grayscale(1) contrast(0.9)" : "none",
                opacity: logo.src || logo.svg ? 0.78 : 0.45,
                transition: "opacity 200ms ease, filter 200ms ease",
              }}
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.label}
                  width={220}
                  height={96}
                  style={{
                    maxHeight: 80,
                    maxWidth: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              ) : logo.svg ? (
                <div
                  aria-label={logo.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--v2-ink)",
                  }}
                >
                  {logo.svg}
                  <span
                    style={{
                      fontFamily: "var(--v2-font-body)",
                      fontSize: 20,
                      fontWeight: 500,
                      color: "var(--v2-ink)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.1,
                    }}
                  >
                    OpenAI Academy
                  </span>
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 18,
                    color: "var(--v2-ink-muted)",
                    letterSpacing: "-0.01em",
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {logo.label}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v3-trust-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 540px) {
          .v3-trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

/** OpenAI knot mark — reused from the hero badge */
function OpenAIMark() {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}
