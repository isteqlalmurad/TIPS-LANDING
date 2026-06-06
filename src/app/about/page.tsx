import Image from "next/image";
import { NavBarV3 } from "@/app/_components/landing-v2/NavBarV3";
import { ClosingSections } from "@/app/_components/landing-v2/ClosingSections";

const people = [
  {
    name: "Dr Andrew O'Malley",
    photo: "/profiles/Dr Andrew O'Malley.jpeg",
    thread:
      "Medical education, simulated-patient teaching, assessment, and the research questions that started the work.",
    link: {
      href: "https://andrewomalley.substack.com/",
      label: "Read his Substack",
    },
  },
  {
    name: "Mr Sayed Murad",
    photo: "/profiles/Mr Sayed Murad.png",
    thread:
      "AI engineering, product design, language equity, and the practical work of building usable tools.",
    link: {
      href: "https://www.linkedin.com/in/sayed-murad",
      label: "Connect on LinkedIn",
    },
  },
  {
    name: "Dr Sandhya Duggal",
    photo: "/profiles/Dr Sandhya Duggal.jpeg",
    thread:
      "Clinical communication, medical sociology, health research, and the social context around patient conversations.",
    link: {
      href: "https://www.linkedin.com/in/dr-sandhya-duggal-775a32238/",
      label: "Connect on LinkedIn",
    },
  },
  {
    name: "Dr Xining Wang",
    photo: "/profiles/Dr Xining Wang.webp",
    thread:
      "Human-computer interaction, technology-enhanced learning, evaluation, and evidence that the platform is doing useful work.",
    link: {
      href: "https://www.linkedin.com/in/xi-ning-wang-phd-999aa4139/",
      label: "Connect on LinkedIn",
    },
  },
];

export const metadata = {
  title: "Our story · SimPatient",
  description:
    "The multidisciplinary team behind SimPatient, from research curiosity to AI-simulated communication training.",
};

export default function AboutPage() {
  return (
    <main className="v2-page" style={{ background: "var(--v2-ink)" }}>
      <NavBarV3 />

      <section
        style={{
          minHeight: "72vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "140px clamp(24px, 4vw, 72px) 72px",
          background:
            "radial-gradient(ellipse 900px 620px at 8% 0%, rgba(34, 211, 238, 0.12), transparent 70%), var(--v2-ink)",
        }}
      >
        <div style={{ maxWidth: 940 }}>
          <p
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.7)",
              margin: 0,
              marginBottom: 28,
            }}
          >
            Our story
          </p>
          <h1
            style={{
              fontFamily: "var(--v2-font-display)",
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 0.98,
              color: "#fff",
              margin: 0,
            }}
          >
            What started as a research curiosity{" "}
            <em style={{ fontStyle: "italic", color: "#22D3EE" }}>
              became a shared build.
            </em>
          </h1>
        </div>
      </section>

      <section
        className="v2-section"
        style={{
          background: "var(--v2-paper)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: "100%",
            paddingLeft: "clamp(24px, 4vw, 72px)",
            paddingRight: "clamp(24px, 4vw, 72px)",
          }}
        >
          <div
            className="about-story-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
              gap: "clamp(44px, 8vw, 120px)",
              alignItems: "start",
              marginBottom: 80,
            }}
          >
            <div>
              <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
                Three years in
              </p>
              <h2
                style={{
                  fontSize: "var(--v2-text-display-lg)",
                  fontWeight: 400,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.08,
                  color: "var(--v2-ink)",
                }}
              >
                We began with a question,{" "}
                <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
                  not a pitch deck.
                </em>
              </h2>
            </div>
            <div
              style={{
                fontSize: 19,
                lineHeight: 1.7,
                color: "var(--v2-ink-muted)",
              }}
            >
              <p style={{ marginTop: 0 }}>
                SimPatient started three years ago as a research curiosity
                inside medical education: could AI-simulated patients give
                students more safe, structured, repeatable practice before they
                met real patients?
              </p>
              <p>
                Answering that question needed more than one discipline. It
                brought together people who understand clinical teaching,
                communication skills, AI systems, learning research, assessment,
                language, and product design.
              </p>
              <p style={{ marginBottom: 0 }}>
                The platform is the result of that mixture: research-led, built
                close to educators, and still shaped by the practical realities
                of cohorts, rubrics, feedback, and time.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 44, maxWidth: 760 }}>
            <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
              The people behind it
            </p>
            <h2
              style={{
                fontSize: "var(--v2-text-display-lg)",
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: "var(--v2-ink)",
              }}
            >
              A multidisciplinary group,{" "}
              <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
                working from the same question.
              </em>
            </h2>
          </div>

          <div
            className="about-people-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 24,
            }}
          >
            {people.map((person) => (
              <article key={person.name}>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    borderRadius: 6,
                    overflow: "hidden",
                    background: "var(--v2-paper-deep)",
                    border: "1px solid var(--v2-rule)",
                    filter: "grayscale(1) contrast(0.96)",
                    marginBottom: 16,
                  }}
                >
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(max-width: 900px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 24,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                    color: "var(--v2-ink)",
                    margin: 0,
                    marginBottom: 10,
                  }}
                >
                  {person.name}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--v2-ink-muted)",
                    margin: 0,
                  }}
                >
                  {person.thread}
                </p>
                {person.link && (
                  <a
                    href={person.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: 10,
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--v2-cyan-deep)",
                      textDecoration: "none",
                    }}
                  >
                    {person.link.label} &rarr;
                  </a>
                )}
              </article>
            ))}
          </div>

          <div
            style={{
              marginTop: 72,
              paddingTop: 30,
              borderTop: "1px solid var(--v2-rule)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--v2-font-display)",
                fontSize: 24,
                lineHeight: 1.45,
                fontStyle: "italic",
                color: "var(--v2-ink)",
                margin: 0,
                maxWidth: 700,
              }}
            >
              We are still close to the original curiosity: make the practice
              richer, make the feedback useful, and make access less dependent
              on who has spare time in the timetable.
            </p>
          </div>
        </div>
      </section>
      <ClosingSections showResearch={false} showTestimonials={false} />
    </main>
  );
}
