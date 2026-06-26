"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PathIn() {
  return (
    <section
      className="v2-section"
      style={{
        borderTop: "1px solid var(--v2-rule)",
        background: "var(--v2-ink)",
        color: "var(--v2-paper)",
      }}
    >
      <div className="v2-container" style={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p
            className="v2-eyebrow"
            style={{ color: "rgba(250, 248, 244, 0.55)", marginBottom: 24 }}
          >
            The path in
          </p>
          <h2
            style={{
              fontSize: "var(--v2-text-display-lg)",
              fontWeight: 400,
              margin: 0,
              marginBottom: 56,
              color: "var(--v2-paper)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            Bring SimPatient into your programme.
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            maxWidth: 960,
            margin: "0 auto",
            textAlign: "left",
          }}
          className="v2-path-grid"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              padding: 36,
              background: "rgba(250, 248, 244, 0.06)",
              border: "1px solid rgba(250, 248, 244, 0.14)",
              borderRadius: 6,
            }}
          >
            <p
              className="v2-eyebrow"
              style={{ color: "var(--v2-cyan)", marginBottom: 16 }}
            >
              Primary
            </p>
            <h3 style={{ fontSize: 26, fontWeight: 400, margin: 0, marginBottom: 16, color: "var(--v2-paper)" }}>
              Book a demo
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(250, 248, 244, 0.75)", margin: 0, marginBottom: 28 }}>
              A 30-minute call with a clinician on our team. We&rsquo;ll show the wizard, run a
              live consultation in your preferred mode, and walk through how rubric grading would
              map to your existing curriculum.
            </p>
            <Link
              href="/book-demo"
              className="v2-btn"
              style={{ background: "var(--v2-paper)", color: "var(--v2-ink)" }}
            >
              Book a demo
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              padding: 36,
              background: "rgba(250, 248, 244, 0.02)",
              border: "1px solid rgba(250, 248, 244, 0.14)",
              borderRadius: 6,
            }}
          >
            <p
              className="v2-eyebrow"
              style={{ color: "rgba(250, 248, 244, 0.55)", marginBottom: 16 }}
            >
              Lower-stakes
            </p>
            <h3 style={{ fontSize: 26, fontWeight: 400, margin: 0, marginBottom: 16, color: "var(--v2-paper)" }}>
              Pilot programme
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(250, 248, 244, 0.75)", margin: 0, marginBottom: 28 }}>
              Run a 4-week pilot with a single cohort. We&rsquo;ll help you set up your org,
              import your existing marking scheme, and share a written report at the end measuring
              usage, learner sentiment, and rubric performance.
            </p>
            <Link
              href="/request-pilot"
              className="v2-btn"
              style={{ background: "transparent", color: "var(--v2-paper)", border: "1px solid rgba(250, 248, 244, 0.3)" }}
            >
              Request a pilot
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>

        <p
          style={{
            marginTop: 32,
            fontSize: 12,
            color: "rgba(250, 248, 244, 0.5)",
          }}
        >
          All pricing is per-organisation and includes unlimited learners. Get tailored pricing on the call.
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-path-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
