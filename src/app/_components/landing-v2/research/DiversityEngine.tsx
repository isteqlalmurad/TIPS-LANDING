"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Diversity Engine — flagship section explaining how our research on AI bias
 * shipped as a product feature. Cream-paper background so it reads as a magazine
 * spread breaking from the dark hero above.
 */
export function DiversityEngine() {
  return (
    <section
      id="diversity-engine"
      style={{
        background: "var(--v2-paper)",
        paddingTop: 96,
        paddingBottom: 96,
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
            fontFamily: "var(--v2-font-body)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--v2-ink-muted)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          Flagship · The Diversity Engine
        </p>

        {/* Two-column hero of the section */}
        <div
          className="v3-de-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          {/* Left: headline + body */}
          <div>
            <h2
              style={{
                fontFamily: "var(--v2-font-display)",
                fontSize: "clamp(34px, 4.4vw, 60px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.08,
                color: "var(--v2-ink)",
                marginBottom: 24,
              }}
            >
              We discovered AI's diversity problem.{" "}
              <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
                Then we built the fix.
              </em>
            </h2>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "var(--v2-ink)",
                marginTop: 0,
                marginBottom: 20,
                maxWidth: 560,
              }}
            >
              In a study published in <em>JMIR AI</em> (2024), our team found that
              DALL-E and Midjourney significantly under-represent darker skin tones
              when generating medical imagery. The bias was statistically large
              (P&nbsp;&lt;&nbsp;.001) and held across hundreds of generated images.
            </p>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "var(--v2-ink)",
                margin: 0,
                marginBottom: 32,
                maxWidth: 560,
              }}
            >
              So we built a custom model that injects real demographic distributions
              into the generation pipeline. The same test against US Census demographics
              brought the gap from <strong>P&nbsp;&lt;&nbsp;.001</strong> down to{" "}
              <strong>P&nbsp;=&nbsp;.04</strong>, near-representative output.
              That model is now the Diversity Engine inside SimPatient.
            </p>

            {/* Citation card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid var(--v2-rule)",
                borderRadius: 12,
                padding: "18px 22px",
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--v2-ink-muted)",
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Source paper
              </p>
              <p
                style={{
                  fontFamily: "var(--v2-font-display)",
                  fontSize: 17,
                  lineHeight: 1.4,
                  color: "var(--v2-ink)",
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Ensuring appropriate representation in AI-generated medical imagery:
                a methodological approach to address skin tone bias
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--v2-ink-muted)",
                  margin: 0,
                  marginBottom: 10,
                }}
              >
                O&rsquo;Malley AS, Veenhuizen MA, Ahmed A. &middot;{" "}
                <em>JMIR AI</em> 2024;3:e58275
              </p>
              <Link
                href="https://doi.org/10.2196/58275"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  color: "var(--v2-cyan-deep)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Read on JMIR AI <ArrowUpRight size={14} strokeWidth={2} />
              </Link>
            </div>

            <p
              style={{
                fontSize: 13,
                color: "var(--v2-ink-muted)",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              The Diversity Engine has since been extended to gender, age, and
              ethnicity dimensions, and is calibrated against Scotland 2022 Census
              benchmarks in addition to US demographic data.
            </p>
          </div>

          {/* Right: stat block */}
          <div
            style={{
              background: "var(--v2-ink)",
              color: "#FFFFFF",
              padding: 40,
              borderRadius: 12,
              position: "sticky",
              top: 96,
            }}
          >
            <p
              style={{
                fontFamily: "var(--v2-font-mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.65)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              Headline finding
            </p>

            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontFamily: "var(--v2-font-display)",
                  fontSize: 56,
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "#22D3EE",
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                P &lt; .001 → P = .04
              </div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "rgba(255, 255, 255, 0.85)",
                  margin: 0,
                }}
              >
                The Diversity Engine reduced the demographic bias of standard
                generative models from statistically large to near-representative.
              </p>
            </div>

            <div
              style={{
                paddingTop: 24,
                borderTop: "1px solid rgba(255, 255, 255, 0.16)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 32,
                    fontWeight: 400,
                    color: "#FFFFFF",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  300
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.65)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  AI-generated medical images analysed
                </p>
              </div>
              <Link
                href="https://scholar.google.com/scholar?q=Ensuring+appropriate+representation+in+AI-generated+medical+imagery+skin+tone+bias+O%27Malley"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}
                className="v3-de-scholar"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <Image
                    src="/logo/google-scholar.png"
                    alt=""
                    width={48}
                    height={48}
                    style={{
                      width: 22,
                      height: 22,
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--v2-font-display)",
                      fontSize: 32,
                      fontWeight: 400,
                      color: "#FFFFFF",
                      lineHeight: 1,
                    }}
                  >
                    13
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.65)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Citations on Google Scholar
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v3-de-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        :global(.v3-de-scholar:hover) {
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
}
