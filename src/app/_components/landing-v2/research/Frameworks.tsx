"use client";

type Framework = {
  name: string;
  shortName: string;
  category: string;
  description: string;
  citation: string;
  useInProduct: string;
};

const FRAMEWORKS: Framework[] = [
  {
    name: "Calgary-Cambridge model",
    shortName: "Calgary-Cambridge",
    category: "Clinical communication",
    description:
      "The five-stage clinical-communication model: initiating, gathering information, physical examination, explanation & planning, and closing. Twenty named sub-skills across the consultation.",
    citation:
      "Kurtz SM, Silverman J, Draper J. Teaching and Learning Communication Skills in Medicine (2nd ed.). Radcliffe, 2005.",
    useInProduct:
      "Built-in rubric in SimPatient. Every consultation can be graded against the 20 sub-skills with section scores and transcript citations.",
  },
  {
    name: "Clinical Reasoning Indicators for History Taking (CRI-HT)",
    shortName: "CRI-HT",
    category: "Clinical reasoning",
    description:
      "Eight indicators rated 1–5 covering lead-taking, recognising relevant information, symptom specification, pathophysiological thinking, logical questioning, checking with the patient, summarising, and overall data quality.",
    citation:
      "Fürstenberg S, et al. Med Teach. 2020;42(8):914–921.",
    useInProduct:
      "Built-in rubric in SimPatient. Used by programmes that grade clinical reasoning explicitly alongside communication.",
  },
  {
    name: "Liverpool Communication Skills Assessment Scale (LCSAS)",
    shortName: "LCSAS",
    category: "Validated assessment",
    description:
      "A validated assessment scale developed at the University of Liverpool, with calibrated rating-scale labels and per-anchor descriptors for high-stakes communication-skills assessment.",
    citation:
      "University of Liverpool Communication Skills Assessment Scale.",
    useInProduct:
      "LCSAS-style anchors are first-class in SimPatient's custom-rubric editor, for programmes running validated, calibrated rubrics.",
  },
  {
    name: "GMC Medical Licensing Assessment",
    shortName: "GMC MLA",
    category: "UK regulatory",
    description:
      "The General Medical Council's Medical Licensing Assessment content map. The regulatory framework all UK medical schools must align to from 2024–25 onward.",
    citation: "General Medical Council, UK.",
    useInProduct:
      "Every SimPatient scenario maps to GMC MLA categories. Twelve curriculum categories aligned at launch.",
  },
  {
    name: "Scottish Doctor learning outcomes",
    shortName: "Scottish Doctor",
    category: "Scottish curriculum",
    description:
      "The agreed Scottish-medical-schools curriculum framework defining learning outcomes for undergraduate medical education in Scotland.",
    citation: "Scottish Deans' Medical Curriculum Group.",
    useInProduct:
      "AI-generated feedback maps performance to Scottish Doctor outcomes, alongside GMC MLA.",
  },
];

export function Frameworks() {
  return (
    <section
      id="frameworks"
      style={{
        background: "var(--v2-paper-deep)",
        paddingTop: 96,
        paddingBottom: 120,
        borderTop: "1px solid var(--v2-rule)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: "clamp(24px, 6vw, 96px)",
          paddingRight: "clamp(24px, 6vw, 96px)",
        }}
      >
        {/* Header */}
        <div style={{ maxWidth: 760, marginBottom: 56 }}>
          <p
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--v2-ink-muted)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            The frameworks we ship against
          </p>
          <h2
            style={{
              fontFamily: "var(--v2-font-display)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: 0,
              lineHeight: 1.1,
              color: "var(--v2-ink)",
              marginBottom: 20,
            }}
          >
            Built on the frameworks your faculty already trust.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--v2-ink-muted)",
              margin: 0,
            }}
          >
            SimPatient&rsquo;s rubric system isn&rsquo;t invented in-house. It implements
            the published frameworks medical schools and GMC accreditation already use,
            with citations on every page.
          </p>
        </div>

        {/* Frameworks list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {FRAMEWORKS.map((fw, i) => (
            <div
              key={fw.shortName}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 48,
                padding: "32px 0",
                borderTop: i === 0 ? "1px solid var(--v2-rule)" : "none",
                borderBottom: "1px solid var(--v2-rule)",
              }}
              className="v3-fw-row"
            >
              {/* Left rail: short name + category */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "var(--v2-ink)",
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    marginBottom: 8,
                  }}
                >
                  {fw.shortName}
                </p>
                <p
                  style={{
                    fontFamily: "var(--v2-font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--v2-cyan-deep)",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {fw.category}
                </p>
              </div>

              {/* Right: full name, description, citation, use */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 16,
                    fontStyle: "italic",
                    color: "var(--v2-ink-muted)",
                    margin: 0,
                    marginBottom: 12,
                  }}
                >
                  {fw.name}
                </p>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--v2-ink)",
                    margin: 0,
                    marginBottom: 16,
                  }}
                >
                  {fw.description}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "var(--v2-ink-muted)",
                    margin: 0,
                    marginBottom: 12,
                    fontStyle: "italic",
                  }}
                >
                  {fw.citation}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "var(--v2-ink)",
                    margin: 0,
                    paddingLeft: 14,
                    borderLeft: "2px solid var(--v2-cyan)",
                  }}
                >
                  <strong style={{ fontWeight: 600 }}>In product:</strong>{" "}
                  {fw.useInProduct}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 740px) {
          .v3-fw-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
