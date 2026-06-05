"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mic, Video } from "lucide-react";

const modes = [
  {
    icon: MessageCircle,
    title: "Text chat",
    poweredBy: "Powered by GPT",
    bestFor: "Large cohorts, written-communication drills, async practice, low-bandwidth settings.",
    behaviour: "Realistic typed responses with full clinical context.",
  },
  {
    icon: Mic,
    title: "Audio call",
    poweredBy: "Powered by ElevenLabs Conversational AI",
    bestFor: "Telephone-consultation prep, exam-style verbal stations, focused listening practice.",
    behaviour: "Natural turn-taking, silence detection, lifelike voice.",
  },
  {
    icon: Video,
    title: "Live video avatar",
    poweredBy: "Powered by Anam.ai",
    bestFor: "Full simulated consultations, rapport-building, body-language and non-verbal cues.",
    behaviour: "Photorealistic streaming avatar that lip-syncs and reacts in real time.",
  },
];

export function ThreeModes() {
  return (
    <section id="product" className="v2-section" style={{ borderTop: "1px solid var(--v2-rule)" }}>
      <div className="v2-container">
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            The signature insight
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
            One patient. Three modes.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
              The same clinical truth.
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
            An educator writes a system message once. SimPatient delivers that exact patient as a
            text consultation, an audio call, or a live-video avatar, without re-authoring a
            thing.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
          }}
          className="v2-modes-grid"
        >
          {modes.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                style={{
                  background: "var(--v2-paper-deep)",
                  border: "1px solid var(--v2-rule)",
                  borderRadius: 6,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 4,
                    background: "var(--v2-paper)",
                    border: "1px solid var(--v2-rule)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--v2-cyan-deep)",
                  }}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: 26,
                      fontWeight: 400,
                      margin: 0,
                      marginBottom: 8,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {mode.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--v2-font-mono)",
                      fontSize: 11,
                      color: "var(--v2-ink-muted)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    {mode.poweredBy}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid var(--v2-rule)", paddingTop: 16 }}>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--v2-ink-muted)",
                      margin: 0,
                      marginBottom: 6,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    Best for
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--v2-ink)",
                      lineHeight: 1.5,
                      margin: 0,
                      marginBottom: 16,
                    }}
                  >
                    {mode.bestFor}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--v2-ink-muted)",
                      margin: 0,
                      lineHeight: 1.5,
                      fontStyle: "italic",
                    }}
                  >
                    {mode.behaviour}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p
          style={{
            marginTop: 56,
            fontFamily: "var(--v2-font-display)",
            fontSize: 22,
            color: "var(--v2-ink)",
            fontStyle: "italic",
            letterSpacing: "-0.01em",
            textAlign: "center",
            margin: "56px auto 0",
            maxWidth: 760,
          }}
        >
          Authored once. Delivered three ways. Graded against the same rubric.
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-modes-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
