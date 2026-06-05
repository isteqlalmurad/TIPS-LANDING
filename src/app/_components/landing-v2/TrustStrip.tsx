"use client";

import Image from "next/image";

type Logo = {
  src?: string;
  label: string;
  alt: string;
};

// Real logos we have, plus reserved placeholder slots designed for the
// 30-day proof sprint. The placeholders render as quiet text labels.
const logos: Logo[] = [
  { src: "/shots/st anderws uni.png", alt: "University of St Andrews", label: "St Andrews" },
  { src: "/logo/NES_logo.jpg", alt: "NHS Education for Scotland", label: "NHS Education for Scotland" },
  { label: "OpenAI Academy 2025", alt: "OpenAI Academy 2025" },
  { label: "Converge Awards", alt: "Converge Awards" },
  { label: "+ partner institution", alt: "Partner institution" },
  { label: "+ partner institution", alt: "Partner institution" },
];

export function TrustStrip() {
  return (
    <section
      style={{
        paddingTop: "var(--v2-space-block)",
        paddingBottom: "var(--v2-space-block)",
        borderTop: "1px solid var(--v2-rule)",
        borderBottom: "1px solid var(--v2-rule)",
        background: "var(--v2-paper-deep)",
      }}
    >
      <div className="v2-container">
        <p
          className="v2-eyebrow"
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          Used and trusted by clinical educators at
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 32,
            alignItems: "center",
            justifyItems: "center",
            marginBottom: 28,
          }}
          className="v2-logo-grid"
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              style={{
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: logo.src ? "grayscale(1) contrast(0.9)" : "none",
                opacity: logo.src ? 0.78 : 0.55,
                width: "100%",
              }}
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={48}
                  style={{ maxHeight: 44, width: "auto", objectFit: "contain" }}
                />
              ) : (
                <span
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 16,
                    color: "var(--v2-ink-muted)",
                    letterSpacing: "-0.01em",
                    textAlign: "center",
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
          .v2-logo-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
