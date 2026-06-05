"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AssessmentLayer() {
  return (
    <section className="v2-section" style={{ borderTop: "1px solid var(--v2-rule)", background: "var(--v2-paper-deep)" }}>
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 64 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            The pedagogy
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
            Rigorous, transparent,{" "}
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>rubric-bound.</em>
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
            Every consultation ends with a structured grading pass against the rubric the educator
            selected. Not &ldquo;good job&rdquo;, but a section-by-section score, each justified
            with a quoted moment from the transcript.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
          className="v2-assess-grid"
        >
          {/* Left: screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="v2-screenshot"
            style={{ position: "sticky", top: 96 }}
          >
            <Image
              src="/shots/analytics.png"
              alt="Graded consultation with per-section scores and transcript citations"
              width={1400}
              height={900}
              style={{ width: "100%", height: "auto" }}
            />
          </motion.div>

          {/* Right: pedagogy blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {/* Built-in frameworks */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 500, margin: 0, marginBottom: 16, color: "var(--v2-ink)" }}>
                Built-in frameworks
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                <li>
                  <p style={{ margin: 0, color: "var(--v2-ink)", lineHeight: 1.55 }}>
                    <strong>Calgary&#8209;Cambridge</strong>
                    <sup style={{ color: "var(--v2-cyan-deep)", fontFamily: "var(--v2-font-mono)", fontSize: 10 }}>
                      [1]
                    </sup>
                    : the five-stage clinical communication model; 20 sub-skills covering
                    initiating, gathering, examining, explaining, and closing.
                  </p>
                </li>
                <li>
                  <p style={{ margin: 0, color: "var(--v2-ink)", lineHeight: 1.55 }}>
                    <strong>CRI&#8209;HT</strong>
                    <sup style={{ color: "var(--v2-cyan-deep)", fontFamily: "var(--v2-font-mono)", fontSize: 10 }}>
                      [2]
                    </sup>
                    : Clinical Reasoning Indicators for History Taking; eight indicators
                    rated 1&ndash;5.
                  </p>
                </li>
              </ul>
            </motion.div>

            {/* Custom rubrics */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 500, margin: 0, marginBottom: 16 }}>
                Custom rubrics{" "}
                <span style={{ fontSize: 13, color: "var(--v2-cyan-deep)", fontFamily: "var(--v2-font-mono)", letterSpacing: "0.06em" }}>
                  · THE DIFFERENTIATOR
                </span>
              </h3>
              <ul style={{ paddingLeft: 18, margin: 0, color: "var(--v2-ink)", lineHeight: 1.7 }}>
                <li>Upload a PDF, paste your marking scheme, or describe a rubric in a sentence.</li>
                <li>The AI authors a full structured rubric: sections, weights summing to 100%, scale labels, behavioural anchors.</li>
                <li>Tune in a visual editor with weight sliders before publishing.</li>
                <li>
                  Liverpool LCSAS
                  <sup style={{ color: "var(--v2-cyan-deep)", fontFamily: "var(--v2-font-mono)", fontSize: 10 }}>
                    [3]
                  </sup>
                  {" "}-style anchors are first-class for programmes running validated, calibrated rubrics.
                </li>
              </ul>
            </motion.div>

            {/* Tutor-in-the-loop */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 500, margin: 0, marginBottom: 16 }}>
                Tutor-in-the-loop, when it matters
              </h3>
              <p style={{ margin: 0, color: "var(--v2-ink)", lineHeight: 1.6 }}>
                Auto-publish is the default: feedback appears the moment the consultation
                ends. Switch a scenario to <em>tutor-review</em> and AI grading lands in a queue as
                a draft; a tutor edits and publishes it before the learner sees anything. Use it
                for summative work.
              </p>
            </motion.div>

            {/* Reflection */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 500, margin: 0, marginBottom: 16 }}>
                The reflection step
              </h3>
              <p style={{ margin: 0, color: "var(--v2-ink)", lineHeight: 1.6 }}>
                Between the consultation and the feedback, learners answer three short prompts:
                what went well, what they would do differently, and whether they addressed the
                patient&rsquo;s primary concern. The reflection feeds the AI grading, which
                assesses self-awareness alongside performance.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Citations */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid var(--v2-rule)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <p className="v2-caption" style={{ margin: 0 }}>
            [1] Kurtz SM, Silverman J, Draper J. <em>Teaching and Learning Communication Skills in Medicine</em> (2nd ed.). Radcliffe, 2005.
          </p>
          <p className="v2-caption" style={{ margin: 0 }}>
            [2] F&uuml;rstenberg S, et al. <em>Med Teach.</em> 2020;42(8):914&ndash;921.
          </p>
          <p className="v2-caption" style={{ margin: 0 }}>
            [3] University of Liverpool Communication Skills Assessment Scale (LCSAS).
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-assess-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
