"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "SimPatient is an impressive example of technology that helps students practise complex professional skills before they enter high-stakes clinical settings. It offers a practical way to support authentic learning, formative feedback, and applied assessment in medical education.",
    name: "Assoc. Prof. Mike Perkins, SFHEA, PhD",
    role: "Head of the Centre for Research & Innovation",
    inst: "British University of Vietnam",
    img: "/profiles/Mike Perkins.jpeg",
  },
  {
    quote:
      "The SimPatient platform has been superbly built, with numerous flexible settings the student can modify to explore a particular issue and test their capabilities. The automatic feedback tool, personally styled on the individual student's performance, is a huge plus. I can see students wanting to access it to strengthen their understanding and improve confidence.",
    name: "Emeritus Professor Gerry Humphris",
    role: "Clinical Academic Health Psychologist",
    inst: "University of St Andrews",
    img: "/profiles/Gerry Humphris.jpeg",
  },
  {
    quote:
      "SimPatient gave me a consistent, reliable, and realistic platform for practising clinical communication, letting me standardise the learning environment so all learners were assessed against the same clinical cues. Students reported greater engagement and increased confidence with unfamiliar cases. I would certainly recommend it to colleagues seeking a scalable, evidence-informed tool.",
    name: "Predrag Bjelogrlic",
    role: "Senior Lecturer",
    inst: "School of Medicine",
    img: "/profiles/Predrag Bjelogrlic.jpeg",
  },
  {
    quote:
      "With SimPatient, we gave students an AI patient they could interact with, asking questions and learning the main condition, past medical history, drug history, and social life as part of a full history. It made the whole skills session far more realistic and meaningful.",
    name: "Iris Cezayirli",
    role: "Associate Lecturer",
    inst: "School of Medicine",
    img: "/profiles/Iris Cezayirli.jpeg",
  },
];

export function Testimonials() {
  return (
    <section
      className="v2-section"
      style={{
        background: "var(--v2-paper)",
        borderTop: "1px solid var(--v2-rule)",
        color: "var(--v2-ink)",
      }}
    >
      <div className="v2-container">
        <p className="v2-eyebrow" style={{ marginBottom: 32 }}>
          From our community
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
          }}
          className="v2-test-grid"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                margin: 0,
                paddingTop: 24,
                borderTop: "1px solid var(--v2-rule)",
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: "var(--v2-font-display)",
                  fontSize: 22,
                  lineHeight: 1.45,
                  color: "var(--v2-ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption
                style={{
                  marginTop: 24,
                  fontSize: 13,
                  color: "var(--v2-ink-muted)",
                  lineHeight: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <img
                  src={t.img}
                  alt={t.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                    border: "1px solid var(--v2-rule)",
                  }}
                />
                <span>
                  <strong style={{ color: "var(--v2-ink)", fontWeight: 500 }}>{t.name}</strong>
                  <br />
                  {t.role} &bull; {t.inst}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-test-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
