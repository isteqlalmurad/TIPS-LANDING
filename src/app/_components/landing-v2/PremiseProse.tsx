"use client";

import { motion } from "framer-motion";

export function PremiseProse() {
  return (
    <section className="v2-section">
      <div className="v2-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 280px",
            gap: 80,
            alignItems: "start",
          }}
          className="v2-prose-grid"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="v2-prose"
          >
            <p className="v2-eyebrow" style={{ marginBottom: 24 }}>
              The premise
            </p>
            <h2
              style={{
                fontSize: "var(--v2-text-display-lg)",
                fontWeight: 400,
                margin: 0,
                marginBottom: 32,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
              }}
            >
              Communication skills have always been hard to teach at scale.
            </h2>

            <p style={{ fontSize: "var(--v2-text-body-lg)", lineHeight: 1.65, marginBottom: 24, color: "var(--v2-ink)" }}>
              A medical student needs hundreds of patient encounters to become competent at
              history-taking. A simulated-patient programme can offer them ten, maybe twenty.
              Standardised patients are expensive, hard to schedule, and impossible to calibrate
              across an entire cohort. OSCE stations measure performance once a year and tell you
              very little about the practice that produced it.
            </p>

            <p style={{ fontSize: "var(--v2-text-body-lg)", lineHeight: 1.65, color: "var(--v2-ink)", margin: 0 }}>
              SimPatient was built inside a medical school, by clinicians who teach, to close that
              gap. Not by replacing simulated patients (they remain the gold standard for
              high-stakes assessment) but by giving every learner an unlimited supply of
              structured, rubric-graded practice in the weeks and months between them.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              borderLeft: "1px solid var(--v2-rule)",
              paddingLeft: 32,
              marginTop: 80,
            }}
          >
            <p
              style={{
                fontFamily: "var(--v2-font-display)",
                fontStyle: "italic",
                fontSize: 22,
                lineHeight: 1.4,
                color: "var(--v2-ink)",
                margin: 0,
                marginBottom: 20,
                letterSpacing: "-0.01em",
              }}
            >
              &ldquo;The bottleneck has never been the AI. It has always been the rubric.&rdquo;
            </p>
            <p
              style={{
                fontSize: 13,
                color: "var(--v2-ink-muted)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: "var(--v2-ink)" }}>Dr Andrew O&rsquo;Malley</strong>
              <br />
              Senior Lecturer, University of St Andrews
              <br />
              School of Medicine
            </p>
          </motion.aside>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-prose-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
