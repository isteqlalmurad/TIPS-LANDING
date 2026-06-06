"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";

/**
 * /research hero — lab identity.
 * Dark bleed, restrained. No video; the page is a reading page, not a marketing
 * stage. Frames SimPatient as an AI research lab inside a medical school.
 */
export function ResearchHero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "var(--v2-ink)",
        paddingTop: 140,
        paddingBottom: 96,
      }}
    >
      {/* Subtle cyan glow on the left so the hero doesn't read as flat */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 800px 600px at 0% 30%, rgba(34, 211, 238, 0.08) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          paddingLeft: "clamp(24px, 6vw, 96px)",
          paddingRight: "clamp(24px, 6vw, 96px)",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--v2-font-body)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          Research
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--v2-font-display)",
            fontSize: "clamp(40px, 5.4vw, 76px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.06,
            color: "#fff",
            maxWidth: 880,
          }}
        >
          A research lab in medical AI,{" "}
          <em
            style={{
              fontFamily: "var(--v2-font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#22D3EE",
            }}
          >
            built inside a medical school.
          </em>
        </h1>

        {/* Subhead */}
        <p
          style={{
            marginTop: 24,
            marginBottom: 36,
            maxWidth: 640,
            fontSize: 18,
            lineHeight: 1.55,
            color: "rgba(255, 255, 255, 0.78)",
          }}
        >
          Our team at the University of St Andrews has published peer-reviewed research on
          AI assessment validity, responsible generation of clinical content, demographic
          representation in AI imagery, and the future of teleconsultation training.
          Every claim on this site is grounded in work you can read.
        </p>

        {/* Inline anchor links to each section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 56,
          }}
        >
          {[
            { href: "#diversity-engine", label: "The Diversity Engine" },
            { href: "#publications", label: "Our published research" },
            { href: "#deployed", label: "Deployed at scale" },
            { href: "#frameworks", label: "Frameworks we ship against" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "rgba(255, 255, 255, 0.85)",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                letterSpacing: "0.01em",
                transition: "background 200ms ease, border-color 200ms ease",
              }}
              className="v3-research-jump"
            >
              <ArrowDown size={12} strokeWidth={2} />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Stat strip — 4 cards with verifiable numbers */}
        <div
          className="v3-research-stat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 6,
            overflow: "hidden",
            maxWidth: 1000,
          }}
        >
          {[
            {
              n: "6",
              label: "Peer-reviewed papers",
              sub: "published in BMC, JMIR, PLOS ONE & The Clinical Teacher",
            },
            {
              n: "5",
              label: "Open access",
              sub: "every link on this page is a verifiable DOI",
            },
            {
              n: "700+",
              label: "Medical students",
              sub: "active at the University of St Andrews and ScotGEM",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--v2-ink)",
                padding: "24px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--v2-font-display)",
                  fontSize: 40,
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "#22D3EE",
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {stat.n}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  marginBottom: 4,
                  lineHeight: 1.3,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.45,
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        :global(.v3-research-jump:hover) {
          background: rgba(255, 255, 255, 0.12) !important;
          border-color: rgba(255, 255, 255, 0.32) !important;
        }
        @media (max-width: 900px) {
          .v3-research-stat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .v3-research-stat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
