"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const founders = [
  {
    name: "Dr Andrew O'Malley",
    role: "Senior Lecturer, School of Medicine",
    line: "University of St Andrews",
    photo: "/profiles/Dr Andrew O'Malley.jpeg",
  },
  {
    name: "Mr Sayed Murad",
    role: "Co-Founder & CEO",
    line: "Product, growth, and the educator experience",
    photo: "/profiles/Mr Sayed Murad.png",
  },
  {
    name: "Dr Sandhya Duggal",
    role: "Chief Medical Officer & Clinical Lead",
    line: "NHS-practising clinician",
    photo: "/profiles/Dr Sandhya Duggal.jpeg",
  },
  {
    name: "Dr Xining Wang",
    role: "Head of AI Research",
    line: "PhD, AI in Medical Education",
    photo: "/profiles/Dr Xining Wang.webp",
  },
];

export function FoundersBlock() {
  return (
    <section className="v2-section" style={{ borderTop: "1px solid var(--v2-rule)", background: "var(--v2-paper-deep)" }}>
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            The team
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
            Built by educators,{" "}
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>for educators.</em>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginBottom: 56,
          }}
          className="v2-founders-grid"
        >
          {founders.map((f) => (
            <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "var(--v2-paper)",
                  border: "1px solid var(--v2-rule)",
                  filter: "grayscale(1) contrast(0.95)",
                }}
              >
                <Image
                  src={f.photo}
                  alt={f.name}
                  fill
                  sizes="(max-width: 900px) 50vw, 300px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <h3 style={{ fontSize: 19, fontWeight: 500, margin: 0, marginBottom: 2 }}>{f.name}</h3>
                <p style={{ fontSize: 13, color: "var(--v2-cyan-deep)", margin: 0, marginBottom: 6, fontWeight: 500 }}>
                  {f.role}
                </p>
                <p style={{ fontSize: 13, color: "var(--v2-ink-muted)", margin: 0, lineHeight: 1.5 }}>
                  {f.line}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 40,
            alignItems: "end",
            paddingTop: 32,
            borderTop: "1px solid var(--v2-rule)",
          }}
          className="v2-founders-footer"
        >
          <p
            style={{
              fontFamily: "var(--v2-font-display)",
              fontSize: 22,
              lineHeight: 1.5,
              fontStyle: "italic",
              color: "var(--v2-ink)",
              margin: 0,
              letterSpacing: "-0.01em",
              maxWidth: 720,
            }}
          >
            SimPatient was started inside a medical school. Three of our four founders teach,
            examine, or practise clinically. Every framework on the platform was chosen because we
            have used it on real students. Every assessment behaviour was tuned because we have
            marked the work it produces.
          </p>
          <Link
            href="/about"
            className="v2-btn v2-btn-secondary"
            style={{ whiteSpace: "nowrap" }}
          >
            Meet the team &rarr;
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-founders-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .v2-founders-footer {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
