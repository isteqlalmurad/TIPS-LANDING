"use client";

import { motion } from "framer-motion";

const sampleScenarios = [
  { name: "Stable angina · 64F", specialty: "Cardiology", difficulty: "Year 3+" },
  { name: "Acute appendicitis · 19M", specialty: "Surgery", difficulty: "Year 2+" },
  { name: "New-onset T2DM · 47F", specialty: "Endocrinology", difficulty: "Year 3+" },
  { name: "Anxiety on review · 22F", specialty: "Mental Health", difficulty: "Year 2+" },
  { name: "Asthma exacerbation · 8M", specialty: "Paediatrics", difficulty: "Year 4+" },
  { name: "Breaking bad news · 71M", specialty: "Communication", difficulty: "Year 5+" },
];

const stats = [
  { value: "80+", label: "seed scenarios at launch" },
  { value: "5", label: "specialties" },
  { value: "3", label: "difficulty bands" },
  { value: "✓", label: "verified by clinicians" },
];

export function ScenarioStore() {
  return (
    <section className="v2-section" style={{ borderTop: "1px solid var(--v2-rule)", background: "var(--v2-paper-deep)" }}>
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            The Scenario Store
          </p>
          <h2
            style={{
              fontSize: "var(--v2-text-display-lg)",
              fontWeight: 400,
              margin: 0,
              marginBottom: 24,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            You don&rsquo;t start from zero.
          </h2>
          <p
            style={{
              fontSize: "var(--v2-text-body-lg)",
              color: "var(--v2-ink-muted)",
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 640,
            }}
          >
            Every new organisation gets the full SimPatient seed library out of the box.
            Scenarios authored by our clinical team and verified for educational fidelity.
            Institutions can publish their own scenarios into the Store for other programmes to
            import, with a one-click copy that becomes editable on the importing side.
          </p>
        </div>

        {/* Scenario cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 48,
          }}
          className="v2-store-grid"
        >
          {sampleScenarios.map((s, i) => (
            <div
              key={s.name}
              style={{
                background: "var(--v2-paper)",
                border: "1px solid var(--v2-rule)",
                borderRadius: 6,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: 10,
                  color: "var(--v2-cyan-deep)",
                  letterSpacing: "0.1em",
                  margin: 0,
                }}
              >
                SEED · {String(i + 1).padStart(2, "0")}
              </p>
              <h3 style={{ fontSize: 19, fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>
                {s.name}
              </h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 12,
                    padding: "4px 8px",
                    background: "var(--v2-cyan-wash)",
                    borderRadius: 3,
                    color: "var(--v2-cyan-deep)",
                    fontWeight: 500,
                  }}
                >
                  {s.specialty}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    padding: "4px 8px",
                    background: "var(--v2-paper-deep)",
                    borderRadius: 3,
                    color: "var(--v2-ink-muted)",
                    border: "1px solid var(--v2-rule)",
                  }}
                >
                  {s.difficulty}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Stat row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            padding: 24,
            background: "var(--v2-paper)",
            border: "1px solid var(--v2-rule)",
            borderRadius: 6,
          }}
          className="v2-store-stats"
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--v2-font-display)",
                  fontSize: 36,
                  letterSpacing: "-0.02em",
                  color: "var(--v2-ink)",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {s.value}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--v2-ink-muted)",
                  margin: 0,
                  letterSpacing: "0.02em",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-store-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .v2-store-stats {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 600px) {
          .v2-store-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
