import Image from "next/image";
import Link from "next/link";

const people = [
  {
    name: "Dr Andrew O'Malley",
    line: "Senior Lecturer in the School of Medicine, Head of the Education Research Division, and Deputy Programme Director of ScotGEM.",
    photo: "/profiles/Dr Andrew O'Malley.jpeg",
  },
  {
    name: "Mr Sayed Murad",
    line: "AI engineering, product design, language equity, and the practical work of building usable tools.",
    photo: "/profiles/Mr Sayed Murad.png",
  },
  {
    name: "Dr Sandhya Duggal",
    line: "Clinical communication, medical sociology, health research, and the context around patient conversations.",
    photo: "/profiles/Dr Sandhya Duggal.jpeg",
  },
  {
    name: "Dr Xining Wang",
    line: "Human-computer interaction, technology-enhanced learning, evaluation, and evidence-led design.",
    photo: "/profiles/Dr Xining Wang.webp",
  },
];

export function OurStory() {
  return (
    <section
      className="v2-section"
      style={{
        background: "var(--v2-paper)",
        borderTop: "1px solid var(--v2-rule)",
      }}
    >
      <div className="v2-container">
        <div style={{ maxWidth: 840, marginBottom: 48 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            Our story
          </p>
          <h2
            style={{
              fontSize: "var(--v2-text-display-lg)",
              fontWeight: 400,
              margin: 0,
              marginBottom: 24,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--v2-ink)",
            }}
          >
            Started as a research curiosity,{" "}
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
              built by many disciplines.
            </em>
          </h2>
          <p
            style={{
              fontSize: "var(--v2-text-body-lg)",
              color: "var(--v2-ink-muted)",
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 720,
            }}
          >
            Three years ago, SimPatient began as a question inside medical
            education: could AI-simulated patients help learners practise safer,
            more repeatable conversations before they met real patients?
          </p>
        </div>

        <div
          className="v3-story-team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginBottom: 56,
          }}
        >
          {people.map((person) => (
            <article
              key={person.name}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
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
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width: 900px) 50vw, 300px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 24,
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "var(--v2-ink)",
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  {person.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--v2-ink-muted)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {person.line}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className="v3-story-footer"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 40,
            alignItems: "end",
            paddingTop: 32,
            borderTop: "1px solid var(--v2-rule)",
          }}
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
              maxWidth: 760,
            }}
          >
            What began as a research curiosity brought together educators,
            clinicians, researchers, engineers, and language specialists. The
            platform is still shaped by that mix: close to teaching, close to
            assessment, and grounded in the reality of how students practise.
          </p>
          <Link
            href="/about"
            className="v2-btn v2-btn-secondary"
            style={{ whiteSpace: "nowrap" }}
          >
            Meet our team &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
