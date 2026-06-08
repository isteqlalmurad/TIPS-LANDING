"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Paper = {
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi: string;
  finding: string;
  category: string;
  openAccess?: boolean;
};

const PAPERS: Paper[] = [
  {
    title:
      "Quality assurance and validity of AI-generated single best answer questions",
    authors: "Ahmed A, Kerr E, O'Malley AS",
    journal: "BMC Medical Education",
    year: "2025",
    doi: "10.1186/s12909-025-06881-w",
    finding:
      "Quality-assured AI-authored exam questions performed no differently from human-authored questions when tested on 142 St Andrews students.",
    category: "AI in assessment",
    openAccess: true,
  },
  {
    title:
      "Enhancing diagnostic accuracy of ophthalmological conditions with complex prompts in GPT-4",
    authors: "M'gadzah S, O'Malley AS",
    journal: "JMIR Formative Research",
    year: "2025",
    doi: "10.2196/64986",
    finding:
      "Complex prompting raised GPT-4 diagnostic accuracy from 60.4% to 90.1% (p < .001), with the largest gains on conditions prevalent in low- and middle-income countries.",
    category: "Responsible AI",
    openAccess: true,
  },
  {
    title:
      "Ensuring appropriate representation in AI-generated medical imagery: addressing skin tone bias",
    authors: "O'Malley AS, Veenhuizen MA, Ahmed A",
    journal: "JMIR AI",
    year: "2024",
    doi: "10.2196/58275",
    finding:
      "Standard generative models under-represented darker skin tones (P < .001 vs US demographics). A custom model reduced the gap to P = .04. Foundation of the Diversity Engine.",
    category: "Responsible AI",
    openAccess: true,
  },
  {
    title:
      "Medical students' and educators' opinions of teleconsultation in practice and undergraduate education: a UK-based mixed-methods study",
    authors: "Wetzlmair-Kephart LC, O'Malley A, O'Carroll V",
    journal: "PLOS ONE",
    year: "2025",
    doi: "10.1371/journal.pone.0302088",
    finding:
      "248 questionnaire participants and 23 interviews across UK medical schools revealed a clear gap in teleconsultation training and an appetite to close it.",
    category: "Teleconsultation",
    openAccess: true,
  },
  {
    title:
      "Teleconsultation in health and social care professions education: a systematic review",
    authors: "Wetzlmair L, O'Carroll V, O'Malley AS, Murray SW",
    journal: "The Clinical Teacher",
    year: "2022",
    doi: "10.1111/tct.13519",
    finding:
      "Systematic review of 14 studies (JBI methodology). Teleconsultation education increases student knowledge, confidence and satisfaction; further high-quality research and educator guidance is warranted.",
    category: "Teleconsultation",
    openAccess: true,
  },
  {
    title:
      "Investigating and combating gender bias in generative large language models",
    authors: "Veenhuizen MA, O'Malley AS",
    journal: "Medicine & Health (AIMEC 2024 proceedings)",
    year: "2024",
    doi: "10.17576/MH.2024.s1909",
    finding:
      "Conference paper at the 1st International Conference on AI in Medical Education (AIMEC 2024). Extended the diversity work to gender representation in clinical LLMs.",
    category: "Responsible AI",
  },
  {
    title:
      "Demographic biases in AI-generated simulated patient cohorts: a comparative analysis against census benchmarks",
    authors: "Veenhuizen MA, O'Malley AS",
    journal: "Advances in Simulation",
    year: "2025",
    doi: "10.1186/S41077-025-00385-9",
    finding:
      "Compared AI-generated simulated patient cohorts against census benchmarks, extending the representation work from imagery to whole patient populations.",
    category: "Responsible AI",
    openAccess: true,
  },
  {
    title:
      "Plan-Do-Study-Act (PDSA) prompting: a structured approach to prompt engineering in medical education",
    authors: "O'Malley A, Veenhuizen M",
    journal: "Journal of the Academy of Medical Educators",
    year: "2026",
    doi: "10.18573/jaome.11",
    finding:
      "Introduces a structured PDSA cycle for prompt engineering, giving educators a repeatable method for building reliable AI teaching tools.",
    category: "AI in assessment",
    openAccess: true,
  },
  {
    title:
      "Reflections on confronting a capacity challenge with an AI-powered patient simulator (SimPatient)",
    authors: "O'Malley A",
    journal: "Simulation in Healthcare",
    year: "2026",
    doi: "10.1097/SIH.0000000000000890",
    finding:
      "A reflective account of deploying SimPatient to meet a real teaching-capacity challenge in undergraduate medical education.",
    category: "AI in assessment",
  },
];

const CONFERENCE_PAPERS = [
  {
    title:
      "Solving educational capacity challenges with an AI-powered patient simulator",
    authors: "O'Malley AS, Duggal S, Gordon I, Murad S, Wang X",
    venue: "SESAM 2025 · Society for Simulation in Europe, Valencia",
  },
  {
    title:
      "Enhancing undergraduate clinical communication teaching and learning through AI simulation",
    authors:
      "Duggal S, Hughes A, O'Malley AS, Wang X, Murad S, Zachariou M, Gordon I",
    venue: "UKCCC 2025 · UK Council of Clinical Communications",
  },
];

const UNDER_REVIEW = [
  {
    title:
      "Large language models display human-like social desirability biases in health screening questionnaires",
    authors: "O'Malley AS",
    venue: "Under review at Computers in Medicine",
  },
];

export function OurResearch() {
  return (
    <section
      id="publications"
      style={{
        background: "var(--v2-paper-deep)",
        paddingTop: 96,
        paddingBottom: 96,
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
        {/* Section header */}
        <div style={{ marginBottom: 48, maxWidth: 720 }}>
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
            Our research
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
            The only AI simulation software{" "}
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
              underpinned by scientific research.
            </em>
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--v2-ink-muted)",
              margin: 0,
            }}
          >
            Authored by the St Andrews team. Published in <em>BMC Medical Education</em>,
            the JMIR family, <em>PLOS ONE</em>, <em>Advances in Simulation</em>,{" "}
            <em>Simulation in Healthcare</em> and more.
          </p>
        </div>

        {/* Publications grid */}
        <div
          className="v3-papers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginBottom: 64,
          }}
        >
          {PAPERS.map((paper) => (
            <article
              key={paper.doi}
              style={{
                background: "#FFFFFF",
                border: "1px solid var(--v2-rule)",
                borderRadius: 14,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "transform 200ms ease, box-shadow 200ms ease",
              }}
              className="v3-paper-card"
            >
              {/* Category + OA chips */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--v2-font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--v2-cyan-deep)",
                    padding: "4px 10px",
                    background: "var(--v2-cyan-wash)",
                    borderRadius: 999,
                    fontWeight: 600,
                  }}
                >
                  {paper.category}
                </span>
                {paper.openAccess && (
                  <span
                    style={{
                      fontFamily: "var(--v2-font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--v2-ink-muted)",
                      padding: "4px 10px",
                      background: "transparent",
                      border: "1px solid var(--v2-rule)",
                      borderRadius: 999,
                      fontWeight: 500,
                    }}
                  >
                    Open access
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--v2-font-display)",
                  fontSize: 20,
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: "var(--v2-ink)",
                  margin: 0,
                  letterSpacing: "-0.005em",
                }}
              >
                {paper.title}
              </h3>

              {/* Authors + venue */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--v2-font-body)",
                    fontSize: 13,
                    color: "var(--v2-ink)",
                    margin: 0,
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  {paper.authors}
                </p>
                <p
                  style={{
                    fontFamily: "var(--v2-font-body)",
                    fontSize: 13,
                    color: "var(--v2-ink-muted)",
                    margin: 0,
                  }}
                >
                  <em>{paper.journal}</em> · {paper.year}
                </p>
              </div>

              {/* Finding */}
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: "var(--v2-ink)",
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {paper.finding}
              </p>

              {/* DOI link */}
              <Link
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--v2-cyan-deep)",
                  textDecoration: "none",
                  marginTop: "auto",
                }}
              >
                Read in {paper.journal} <ArrowUpRight size={14} strokeWidth={2} />
              </Link>
            </article>
          ))}
        </div>

        {/* Conference papers + under review */}
        <div
          className="v3-research-extras"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            paddingTop: 48,
            borderTop: "1px solid var(--v2-rule)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--v2-font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--v2-ink-muted)",
                margin: 0,
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              Conference papers · 2025
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {CONFERENCE_PAPERS.map((p) => (
                <li
                  key={p.title}
                  style={{
                    marginBottom: 18,
                    paddingBottom: 18,
                    borderBottom: "1px solid var(--v2-rule)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--v2-font-display)",
                      fontSize: 16,
                      lineHeight: 1.35,
                      color: "var(--v2-ink)",
                      margin: 0,
                      marginBottom: 6,
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--v2-ink-muted)",
                      margin: 0,
                      marginBottom: 4,
                    }}
                  >
                    {p.authors}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--v2-ink-muted)",
                      margin: 0,
                      fontStyle: "italic",
                    }}
                  >
                    {p.venue}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--v2-font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--v2-ink-muted)",
                margin: 0,
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              Currently under review
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {UNDER_REVIEW.map((p) => (
                <li
                  key={p.title}
                  style={{
                    marginBottom: 18,
                    paddingBottom: 18,
                    borderBottom: "1px solid var(--v2-rule)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--v2-font-display)",
                      fontSize: 15,
                      lineHeight: 1.4,
                      color: "var(--v2-ink)",
                      margin: 0,
                      marginBottom: 6,
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--v2-ink-muted)",
                      margin: 0,
                      marginBottom: 4,
                    }}
                  >
                    {p.authors}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--v2-ink-muted)",
                      margin: 0,
                      fontStyle: "italic",
                    }}
                  >
                    {p.venue}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.v3-paper-card:hover) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(8, 145, 178, 0.08);
        }
        @media (max-width: 900px) {
          .v3-papers-grid,
          .v3-research-extras {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
