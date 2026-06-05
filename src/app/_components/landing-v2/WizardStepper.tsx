"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Sparkles, Upload, FlaskConical } from "lucide-react";

const steps = [
  { n: 1, title: "Patient", desc: "Name, age, ethnicity, illness type, and the system message that defines how the AI patient behaves." },
  { n: 2, title: "Briefing", desc: "What the learner sees before the consult: presenting complaint, learning objectives, resources." },
  { n: 3, title: "Mode", desc: "Audio or video as the primary channel. Text is always available." },
  { n: 4, title: "Look", desc: "Educator-uploaded photo, AI-generated portrait, or pick from the Anam avatar library." },
  { n: 5, title: "Voice", desc: "Pick from the ElevenLabs or Anam voice libraries." },
  { n: 6, title: "Assess", desc: "Choose Calgary-Cambridge, CRI-HT, or upload your own rubric." },
  { n: 7, title: "Publish", desc: "Promote draft to live. Group restrictions controlled separately." },
];

const callouts = [
  { icon: Check, label: "Drafts are first-class: save mid-flow, resume days later." },
  { icon: Sparkles, label: "Surprise me: generate a complete persona from a one-line condition." },
  { icon: Upload, label: "Import scenario: extract a persona from an OSCE marking scheme or PDF." },
  { icon: FlaskConical, label: "Try consultation: talk to the in-flight draft. No credit spend. 24-hour auto-cleanup." },
];

export function WizardStepper() {
  const [active, setActive] = useState(0);

  return (
    <section className="v2-section" style={{ borderTop: "1px solid var(--v2-rule)" }}>
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 56 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            Authoring rigour
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
            A seven-step wizard,{" "}
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
              not a prompt box.
            </em>
          </h2>
          <p
            style={{
              fontSize: "var(--v2-text-body-lg)",
              color: "var(--v2-ink-muted)",
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 620,
            }}
          >
            Every SimPatient persona is authored through a guided flow that surfaces the choices
            clinical educators actually care about, and hides the ones they don&rsquo;t.
          </p>
        </div>

        {/* Stepper */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 0,
            border: "1px solid var(--v2-rule)",
            borderRadius: 6,
            overflow: "hidden",
            background: "var(--v2-paper-deep)",
          }}
          className="v2-stepper-grid"
        >
          {steps.map((step, i) => (
            <button
              key={step.n}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? "var(--v2-paper)" : "transparent",
                border: "none",
                borderRight: i < steps.length - 1 ? "1px solid var(--v2-rule)" : "none",
                padding: "24px 18px",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 200ms ease",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minHeight: 120,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: 11,
                  color: active === i ? "var(--v2-cyan-deep)" : "var(--v2-ink-muted)",
                  letterSpacing: "0.08em",
                }}
              >
                0{step.n}
              </span>
              <span
                style={{
                  fontFamily: "var(--v2-font-display)",
                  fontSize: 19,
                  color: "var(--v2-ink)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            marginTop: 24,
            padding: "28px 32px",
            background: "var(--v2-paper)",
            border: "1px solid var(--v2-rule)",
            borderRadius: 6,
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 40,
            alignItems: "center",
          }}
          className="v2-step-detail"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--v2-font-mono)",
                fontSize: 11,
                color: "var(--v2-cyan-deep)",
                letterSpacing: "0.08em",
                margin: 0,
                marginBottom: 6,
              }}
            >
              STEP 0{steps[active].n} OF 07
            </p>
            <h3
              style={{
                fontSize: 32,
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              {steps[active].title}
            </h3>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--v2-ink-muted)", margin: 0 }}>
            {steps[active].desc}
          </p>
        </motion.div>

        {/* Callouts */}
        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
          className="v2-callouts-grid"
        >
          {callouts.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                style={{
                  padding: 20,
                  background: "var(--v2-cyan-wash)",
                  border: "1px solid var(--v2-rule)",
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <Icon size={18} strokeWidth={1.6} color="var(--v2-cyan-deep)" />
                <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--v2-ink)", margin: 0 }}>
                  {c.label}
                </p>
              </div>
            );
          })}
        </div>

        <p
          style={{
            marginTop: 48,
            fontFamily: "var(--v2-font-display)",
            fontSize: 22,
            fontStyle: "italic",
            color: "var(--v2-ink)",
            lineHeight: 1.45,
            textAlign: "center",
            margin: "48px auto 0",
            maxWidth: 760,
          }}
        >
          We have yet to find another platform where an educator can sit down, write a patient in
          ten minutes, talk to that patient, refine it, and ship it, all before lunch.
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-stepper-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .v2-step-detail {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .v2-callouts-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
