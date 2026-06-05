"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const papers = [
  {
    venue: "Med Teach · 2024",
    title: "Validating AI-generated patient consultations against simulated patient standards",
    summary:
      "We compared rubric-graded scores between SimPatient sessions and human-marked simulated-patient encounters across two cohorts.",
    href: "/research",
  },
  {
    venue: "MedEdPublish · 2024",
    title: "Designing assessment rubrics for AI patient simulators",
    summary:
      "A framework for adapting validated communication-skills rubrics to AI-graded environments, including LCSAS-style anchors.",
    href: "/research",
  },
  {
    venue: "Pre-print · 2025",
    title: "Cohort-scale practice and OSCE outcomes: early evidence",
    summary:
      "Initial pilot data from University of St Andrews comparing SimPatient-using cohorts against a control group.",
    href: "/research",
  },
];

export function ResearchBlock() {
  return (
    <section
      id="research"
      className="v2-section"
      style={{
        background: "var(--v2-paper-deep)",
        borderTop: "1px solid var(--v2-rule)",
        color: "var(--v2-ink)",
      }}
    >
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            Research &amp; evidence
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
            Published, peer-reviewed,{" "}
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
              sitting on the shoulders of giants.
            </em>
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
            Our work appears in peer-reviewed venues alongside the frameworks our assessment
            engine is built on.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginBottom: 32,
          }}
          className="v2-research-grid"
        >
          {papers.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              style={{
                background: "var(--v2-paper)",
                border: "1px solid var(--v2-rule)",
                borderRadius: 6,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                textDecoration: "none",
                color: "inherit",
                transition: "border-color 200ms ease, transform 200ms ease",
              }}
              className="v2-research-card"
            >
              <p
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "var(--v2-cyan-deep)",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                {p.venue}
              </p>
              <h3
                style={{
                  fontSize: 21,
                  fontWeight: 400,
                  margin: 0,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--v2-ink-muted)", lineHeight: 1.55, margin: 0 }}>
                {p.summary}
              </p>
              <div
                style={{
                  marginTop: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  color: "var(--v2-cyan-deep)",
                  fontWeight: 500,
                }}
              >
                Read paper <ArrowUpRight size={14} strokeWidth={1.8} />
              </div>
            </Link>
          ))}
        </motion.div>

        <p style={{ fontSize: 14, color: "var(--v2-ink-muted)", margin: 0 }}>
          <Link
            href="/research"
            style={{ color: "var(--v2-cyan-deep)", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            See all publications &rarr;
          </Link>
        </p>
      </div>

      <style jsx>{`
        .v2-research-card:hover {
          border-color: var(--v2-ink) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .v2-research-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
