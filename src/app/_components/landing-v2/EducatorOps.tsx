"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const callouts = [
  { n: "01", title: "KPI tiles", body: "Total students, total consultations, completion rate, average duration." },
  { n: "02", title: "Mode-usage chart", body: "30-day audio / video / chat split per day. Spot where your cohort is actually practising." },
  { n: "03", title: "Top-5 scenarios", body: "Which patients are getting the most reps. Useful signal for scenario-library curation." },
  { n: "04", title: "Reviews queue", body: "For scenarios in tutor-review mode, tutors edit AI feedback drafts before learners see them." },
];

export function EducatorOps() {
  return (
    <section id="educators" className="v2-section" style={{ borderTop: "1px solid var(--v2-rule)" }}>
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            Educator operations
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
            A proper operations layer.
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
            KPIs across your cohort. Mode-usage trends. Per-student drill-in with full
            consultation history. CSV export for offline reporting. A reviews queue for tutors
            editing AI feedback drafts before publication. Programme directors run their cohorts
            from a single page.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: 56,
            alignItems: "start",
          }}
          className="v2-ops-grid"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="v2-screenshot"
          >
            <Image
              src="/shots/main_display.png"
              alt="SimPatient educator dashboard with KPI tiles, mode-usage chart, top-5 scenarios, and reviews queue"
              width={1400}
              height={900}
              style={{ width: "100%", height: "auto" }}
            />
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {callouts.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: 16,
                  alignItems: "start",
                  paddingBottom: 24,
                  borderBottom: i < callouts.length - 1 ? "1px solid var(--v2-rule)" : "none",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 4,
                    background: "var(--v2-cyan-wash)",
                    border: "1px solid var(--v2-rule)",
                    color: "var(--v2-cyan-deep)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--v2-font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                  }}
                >
                  {c.n}
                </div>
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 500, margin: 0, marginBottom: 6 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--v2-ink-muted)", margin: 0 }}>
                    {c.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-ops-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
