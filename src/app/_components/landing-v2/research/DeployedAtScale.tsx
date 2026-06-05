"use client";

import Image from "next/image";

/**
 * Deployed-at-scale section — names the institutions, the cohort size, and
 * frames the early signal honestly. No invented outcome numbers.
 */
export function DeployedAtScale() {
  return (
    <section
      id="deployed"
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
        {/* Header */}
        <div style={{ maxWidth: 760, marginBottom: 56 }}>
          <p
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--v2-ink-muted)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            Deployed at scale
          </p>
          <h2
            style={{
              fontFamily: "var(--v2-font-display)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: 0,
              lineHeight: 1.1,
              color: "var(--v2-ink)",
              marginBottom: 20,
            }}
          >
            Already in use across two flagship Scottish medical programmes.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--v2-ink-muted)",
              margin: 0,
            }}
          >
            SimPatient is being rolled out across the University of St Andrews
            School of Medicine and the Scottish Graduate-Entry Medicine (ScotGEM)
            programme. Early data shows strong learner engagement.
          </p>
        </div>

        {/* Two-card deployment grid */}
        <div
          className="v3-deploy-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 48,
          }}
        >
          {/* St Andrews card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--v2-rule)",
              borderRadius: 14,
              padding: 36,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: "var(--v2-cyan-wash)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  flexShrink: 0,
                  border: "1px solid var(--v2-rule)",
                }}
              >
                <Image
                  src="/shots/st anderws uni.png"
                  alt="University of St Andrews"
                  width={64}
                  height={64}
                  style={{ width: 40, height: 40, objectFit: "contain" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--v2-font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--v2-cyan-deep)",
                    margin: 0,
                    marginBottom: 4,
                    fontWeight: 600,
                  }}
                >
                  Primary deployment
                </p>
                <p
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "var(--v2-ink)",
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  University of St Andrews
                  <br />
                  School of Medicine
                </p>
              </div>
            </div>

            <div
              style={{
                paddingTop: 20,
                borderTop: "1px solid var(--v2-rule)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 40,
                    fontWeight: 400,
                    color: "var(--v2-ink)",
                    lineHeight: 1,
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                >
                  500+
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--v2-ink-muted)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Medical students
                  <br />
                  active on the platform
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 40,
                    fontWeight: 400,
                    color: "var(--v2-ink)",
                    lineHeight: 1,
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                >
                  AY 25/26
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--v2-ink-muted)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Live in the curriculum
                  <br />
                  this academic year
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--v2-ink-muted)",
                margin: 0,
              }}
            >
              SimPatient is integrated into the medical-school curriculum at
              St Andrews. The School of Medicine&rsquo;s Education Division is
              co-evaluating learning gain through the academic year.
            </p>
          </div>

          {/* ScotGEM card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--v2-rule)",
              borderRadius: 14,
              padding: 36,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: "var(--v2-cyan-wash)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  flexShrink: 0,
                  border: "1px solid var(--v2-rule)",
                }}
              >
                <Image
                  src="/logo/scotgem.jpg"
                  alt="ScotGEM"
                  width={64}
                  height={64}
                  style={{ width: 40, height: 40, objectFit: "contain" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--v2-font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--v2-cyan-deep)",
                    margin: 0,
                    marginBottom: 4,
                    fontWeight: 600,
                  }}
                >
                  Programme partner
                </p>
                <p
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "var(--v2-ink)",
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  ScotGEM
                  <br />
                  Scottish Graduate-Entry Medicine
                </p>
              </div>
            </div>

            <div
              style={{
                paddingTop: 20,
                borderTop: "1px solid var(--v2-rule)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 40,
                    fontWeight: 400,
                    color: "var(--v2-ink)",
                    lineHeight: 1,
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Rural
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--v2-ink-muted)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Trains doctors for remote
                  <br />
                  and rural Scotland
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 40,
                    fontWeight: 400,
                    color: "var(--v2-ink)",
                    lineHeight: 1,
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                >
                  GMC-aligned
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--v2-ink-muted)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Scenarios mapped to the
                  <br />
                  Medical Licensing Assessment
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--v2-ink-muted)",
                margin: 0,
              }}
            >
              The St Andrews lead of the ScotGEM programme (Dr Andrew
              O&rsquo;Malley, Senior Lecturer in the School of Medicine) is
              using SimPatient to scale consultation practice for students
              training to serve rural and remote communities across Scotland.
            </p>
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v3-deploy-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
