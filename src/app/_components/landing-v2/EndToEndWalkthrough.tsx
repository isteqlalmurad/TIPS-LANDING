"use client";

import { motion } from "framer-motion";

const stages = [
  {
    n: "01",
    title: "Briefing",
    body: "Presenting complaint: chest pain worsening over six weeks. Learning objectives: cardiovascular history, risk-factor assessment, ICE elicitation. Suggested resources: NICE chest-pain guidance.",
  },
  {
    n: "02",
    title: "Consultation",
    body: "Learner: “Can you describe the pain?”\nPatient: “It’s a heaviness, mostly when I climb the stairs at home. Goes away after a few minutes if I sit.”\nLearner: “Does anything else come on with it?”",
    mono: true,
  },
  {
    n: "03",
    title: "Reflection",
    body: "What went well: structured the history into a clear timeline.\nWhat I’d do differently: ask earlier about radiation and exertional pattern.\nDid I address the primary concern? Partially. Needed to acknowledge worry about heart attack.",
  },
  {
    n: "04",
    title: "Feedback",
    body: "Initiating: 4/5. Gathering: 3/5, missed associated symptoms. Closing: 4/5. Cited moment: “goes away after a few minutes”, well-followed-up. Overall band: Competent. Suggested next case: Stable angina, female 64.",
  },
];

export function EndToEndWalkthrough() {
  return (
    <section className="v2-section" style={{ borderTop: "1px solid var(--v2-rule)" }}>
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            A worked example
          </p>
          <h2
            style={{
              fontSize: "var(--v2-text-display-lg)",
              fontWeight: 400,
              margin: 0,
              marginBottom: 20,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            See it run, top to bottom.
          </h2>
          <p
            style={{
              fontFamily: "var(--v2-font-mono)",
              fontSize: 13,
              color: "var(--v2-ink-muted)",
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            PERSONA: 58-YEAR-OLD MAN, CHEST PAIN ON EXERTION &nbsp;·&nbsp; RUBRIC: CALGARY-CAMBRIDGE
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid var(--v2-rule)",
            borderRadius: 6,
            overflow: "hidden",
            background: "var(--v2-paper)",
          }}
          className="v2-stages-grid"
        >
          {stages.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                padding: 28,
                borderRight: i < stages.length - 1 ? "1px solid var(--v2-rule)" : "none",
                background: i % 2 === 0 ? "var(--v2-paper)" : "var(--v2-paper-deep)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "var(--v2-cyan-deep)",
                  margin: 0,
                  marginBottom: 6,
                }}
              >
                {s.n}
              </p>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  margin: 0,
                  marginBottom: 18,
                  letterSpacing: "-0.015em",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: "var(--v2-ink-muted)",
                  margin: 0,
                  whiteSpace: "pre-line",
                  fontFamily: s.mono ? "var(--v2-font-mono)" : "var(--v2-font-body)",
                }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-stages-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .v2-stages-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
