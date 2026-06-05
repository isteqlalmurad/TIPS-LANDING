"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Activity, CalendarClock, Sparkles } from "lucide-react";
import Link from "next/link";

type Status = "idle" | "submitting" | "ok" | "error";

export function PricingInquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      institution: String(data.get("institution") || ""),
      role: String(data.get("role") || ""),
      cohortSize: String(data.get("cohortSize") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""), // honeypot
    };

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/pricing-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setErrorMsg(
        "We couldn't reach the server. Please email hello@simpatient.co.uk directly."
      );
    }
  }

  return (
    <section
      style={{
        position: "relative",
        background: "var(--v2-ink)",
        paddingTop: 140,
        paddingBottom: 120,
        overflow: "hidden",
      }}
    >
      {/* Subtle cyan glow top-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 800px 600px at 0% 0%, rgba(34, 211, 238, 0.08) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          paddingLeft: "clamp(24px, 4vw, 72px)",
          paddingRight: "clamp(24px, 4vw, 72px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
            gap: "clamp(48px, 10%, 124px)",
            width: "100%",
            alignItems: "stretch",
          }}
          className="v3-pricing-grid"
        >
          {/* LEFT — copy */}
          <div>
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
              Pricing
            </p>

            <h1
              style={{
                fontFamily: "var(--v2-font-display)",
                fontSize: "clamp(40px, 5.4vw, 72px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.05,
                color: "#fff",
              }}
            >
              Tailored to your{" "}
              <em
                style={{
                  fontFamily: "var(--v2-font-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#22D3EE",
                }}
              >
                cohort.
              </em>
            </h1>

            <p
              style={{
                marginTop: 24,
                marginBottom: 40,
                maxWidth: 520,
                fontSize: 17,
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.78)",
              }}
            >
              SimPatient is priced per institution, not per seat. Tell us about
              your programme: cohort size, timeline, what you&rsquo;re trying to
              solve. We&rsquo;ll come back within one working day with a costed
              proposal you can take to your faculty.
            </p>

            {/* What's included list */}
            <div
              style={{
                paddingTop: 28,
                borderTop: "1px solid rgba(255, 255, 255, 0.14)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.65)",
                  margin: 0,
                  marginBottom: 18,
                  fontWeight: 600,
                }}
              >
                Every plan includes
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: 24,
                  rowGap: 14,
                }}
                className="v3-pricing-includes"
              >
                {[
                  "Unlimited learners",
                  "Text, voice & video modes",
                  "Calgary-Cambridge & CRI-HT rubrics",
                  "Custom rubric authoring",
                  "Cohort isolation & SSO",
                  "Tutor-in-the-loop review",
                  "Seed scenario library",
                  "Educator analytics",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 14,
                      lineHeight: 1.45,
                      color: "rgba(255, 255, 255, 0.88)",
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={1.8}
                      style={{ color: "#22D3EE", flexShrink: 0, marginTop: 2 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing options */}
            <div
              style={{
                marginTop: 40,
                paddingTop: 28,
                borderTop: "1px solid rgba(255, 255, 255, 0.14)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.65)",
                  margin: 0,
                  marginBottom: 18,
                  fontWeight: 600,
                }}
              >
                How we price
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 14,
                }}
                className="v3-pricing-options"
              >
                {[
                  {
                    Icon: Activity,
                    title: "Session-based",
                    body:
                      "Users are charged based on the sessions they take, not seats. You only pay for what your cohort actually uses.",
                  },
                  {
                    Icon: CalendarClock,
                    title: "Yearly or multi-year",
                    body:
                      "Annual and multi-year subscriptions for predictable budgeting. Lock in lower per-session rates across your programme.",
                  },
                  {
                    Icon: Sparkles,
                    title: "Onboarding included",
                    body:
                      "Full integration, scenario authoring support, and staff onboarding are included with every plan.",
                  },
                ].map(({ Icon, title, body }) => (
                  <div
                    key={title}
                    style={{
                      padding: "18px 16px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "rgba(34, 211, 238, 0.12)",
                        border: "1px solid rgba(34, 211, 238, 0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} strokeWidth={1.8} color="#22D3EE" />
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--v2-font-display)",
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#FFFFFF",
                        margin: 0,
                        letterSpacing: "-0.005em",
                        lineHeight: 1.25,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "rgba(255, 255, 255, 0.72)",
                        margin: 0,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: 32,
                padding: "18px 22px",
                background: "rgba(34, 211, 238, 0.08)",
                border: "1px solid rgba(34, 211, 238, 0.28)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "rgba(255, 255, 255, 0.92)",
                  margin: 0,
                  flex: "1 1 auto",
                  minWidth: 220,
                }}
              >
                Want to contact us directly about anything? Send us an email at{" "}
                <Link
                  href="mailto:hello@simpatient.co.uk"
                  style={{
                    color: "#22D3EE",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                    fontWeight: 500,
                  }}
                >
                  hello@simpatient.co.uk
                </Link>
                , or contact our founder:{" "}
                <Link
                  href="mailto:aso2@st-andrews.ac.uk"
                  style={{
                    color: "#22D3EE",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                    fontWeight: 500,
                  }}
                >
                  aso2@st-andrews.ac.uk
                </Link>
                .
              </p>
            </div>
          </div>

          {/* RIGHT — form (stretched to match left column height) */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              padding: "44px 36px 44px",
              boxShadow:
                "0 20px 48px rgba(8, 145, 178, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {status === "ok" ? <ThankYou /> : (
              <>
                <h2
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 24,
                    fontWeight: 500,
                    color: "#134E4A",
                    margin: 0,
                    marginBottom: 6,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Request pricing
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(19, 78, 74, 0.65)",
                    margin: 0,
                    marginBottom: 24,
                  }}
                >
                  Six short fields. We reply within one working day.
                </p>

                <form
                  onSubmit={onSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    flex: "1 1 auto",
                    minHeight: 0,
                  }}
                >
                  {/* honeypot — visually hidden */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: 1,
                      height: 1,
                      opacity: 0,
                    }}
                    aria-hidden="true"
                  />

                  <Field
                    label="Your name"
                    name="name"
                    placeholder="Dr Jane Smith"
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    placeholder="j.smith@university.ac.uk"
                    required
                    autoComplete="email"
                  />
                  <Field
                    label="Institution"
                    name="institution"
                    placeholder="University of …"
                    required
                    autoComplete="organization"
                  />
                  <Field
                    label="Your role"
                    name="role"
                    placeholder="e.g. Programme director, Clinical educator"
                    required
                  />
                  <Field
                    label="Cohort size (students per year)"
                    name="cohortSize"
                    placeholder="e.g. 250"
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 1 auto",
                      minHeight: 0,
                    }}
                  >
                    <label
                      htmlFor="message"
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#134E4A",
                        marginBottom: 6,
                        letterSpacing: "0.01em",
                      }}
                    >
                      Tell us what you need{" "}
                      <span style={{ color: "rgba(19, 78, 74, 0.5)", fontWeight: 400 }}>
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="e.g. 'We're rolling out to our Year 3 cohort next September and need GP consultation scenarios…'"
                      style={{
                        width: "100%",
                        flex: "1 1 auto",
                        padding: "12px 14px",
                        fontFamily: "var(--v2-font-body)",
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "#134E4A",
                        background: "#FFFFFF",
                        border: "1.5px solid #E0F2FE",
                        borderRadius: 10,
                        resize: "vertical",
                        minHeight: 130,
                        outline: "none",
                        transition: "border-color 200ms ease, box-shadow 200ms ease",
                      }}
                      className="v3-pricing-input"
                    />
                  </div>

                  {status === "error" && (
                    <div
                      role="alert"
                      style={{
                        padding: "10px 12px",
                        background: "rgba(239, 68, 68, 0.08)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: 8,
                        fontSize: 13,
                        color: "#B91C1C",
                      }}
                    >
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      height: 48,
                      marginTop: 8,
                      padding: "0 22px",
                      borderRadius: 10,
                      background:
                        status === "submitting" ? "#64748B" : "#0891B2",
                      color: "#FFFFFF",
                      fontSize: 15,
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                      border: "none",
                      cursor:
                        status === "submitting" ? "not-allowed" : "pointer",
                      transition: "background 200ms ease",
                    }}
                    className="v3-pricing-submit"
                  >
                    {status === "submitting" ? (
                      "Sending…"
                    ) : (
                      <>
                        Request pricing <ArrowRight size={16} strokeWidth={2} />
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      fontSize: 11,
                      color: "rgba(19, 78, 74, 0.5)",
                      margin: 0,
                      marginTop: 4,
                      lineHeight: 1.5,
                    }}
                  >
                    We only use your information to respond to this inquiry. No
                    marketing, no third-party sharing.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.v3-pricing-input:focus) {
          border-color: #0891B2 !important;
          box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.12) !important;
        }
        :global(.v3-pricing-submit:hover:not(:disabled)) {
          background: #0E7490 !important;
        }
        @media (max-width: 900px) {
          .v3-pricing-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .v3-pricing-includes {
            grid-template-columns: 1fr !important;
          }
          .v3-pricing-options {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 901px) and (max-width: 1180px) {
          .v3-pricing-options {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────── */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 500,
          color: "#134E4A",
          marginBottom: 6,
          letterSpacing: "0.01em",
        }}
      >
        {label}
        {required && <span style={{ color: "#0891B2", marginLeft: 4 }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        style={{
          width: "100%",
          height: 44,
          padding: "0 14px",
          fontFamily: "var(--v2-font-body)",
          fontSize: 14,
          color: "#134E4A",
          background: "#FFFFFF",
          border: "1.5px solid #E0F2FE",
          borderRadius: 10,
          outline: "none",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        }}
        className="v3-pricing-input"
      />
    </div>
  );
}

function ThankYou() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "24px 8px 12px",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          margin: "0 auto 24px",
          borderRadius: 999,
          background: "linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 20px rgba(8, 145, 178, 0.3)",
        }}
      >
        <CheckCircle2 size={28} strokeWidth={2} color="#FFFFFF" />
      </div>
      <h2
        style={{
          fontFamily: "var(--v2-font-display)",
          fontSize: 26,
          fontWeight: 500,
          color: "#134E4A",
          margin: 0,
          marginBottom: 12,
          letterSpacing: "-0.01em",
        }}
      >
        Thanks, we&rsquo;ve got it.
      </h2>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "rgba(19, 78, 74, 0.75)",
          margin: 0,
          marginBottom: 24,
          maxWidth: 360,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        We&rsquo;ll come back within one working day with a costed proposal
        tailored to your cohort.
      </p>
      <p
        style={{
          fontSize: 13,
          color: "rgba(19, 78, 74, 0.55)",
          margin: 0,
        }}
      >
        In the meantime,{" "}
        <Link
          href="/research"
          style={{
            color: "#0891B2",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            fontWeight: 500,
          }}
        >
          read our research
        </Link>{" "}
        or{" "}
        <Link
          href="/"
          style={{
            color: "#0891B2",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            fontWeight: 500,
          }}
        >
          see SimPatient in action
        </Link>
        .
      </p>
    </div>
  );
}
