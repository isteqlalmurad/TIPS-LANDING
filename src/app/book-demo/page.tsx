"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { NavBarV3 } from "@/app/_components/landing-v2/NavBarV3";
import { SiteFooter } from "@/app/_components/landing-v2/SiteFooter";

type Status = "idle" | "submitting" | "ok" | "error";

export default function BookDemoPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      institution: String(data.get("institution") || ""),
      role: String(data.get("role") || ""),
      programme: String(data.get("programme") || ""),
      timeline: String(data.get("timeline") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
    };

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/demo-inquiry", {
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

      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
      setErrorMsg(
        "We couldn't reach the server. Please email hello@simpatient.co.uk directly."
      );
    }
  }

  return (
    <main className="v2-page" style={{ background: "var(--v2-ink)", minHeight: "100vh" }}>
      <NavBarV3 />
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 120,
          paddingBottom: 80,
          paddingLeft: "clamp(24px, 4vw, 72px)",
          paddingRight: "clamp(24px, 4vw, 72px)",
          background:
            "radial-gradient(ellipse 900px 620px at 8% 0%, rgba(34, 211, 238, 0.1), transparent 70%), var(--v2-ink)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          <div style={{ marginBottom: 30 }}>
            <p
              style={{
                fontFamily: "var(--v2-font-body)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.7)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              Demo request
            </p>
            <h1
              style={{
                fontFamily: "var(--v2-font-display)",
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.05,
                color: "#fff",
              }}
            >
              See SimPatient with your{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "#22D3EE",
                }}
              >
                cohort in mind.
              </em>
            </h1>
            <p
              style={{
                marginTop: 22,
                marginBottom: 0,
                maxWidth: 620,
                fontSize: 17,
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.72)",
              }}
            >
              Tell us the essentials and we&rsquo;ll shape a focused walkthrough for
              your programme.
            </p>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 14,
              padding: "clamp(22px, 4vw, 36px)",
              boxShadow:
                "0 30px 80px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.08)",
            }}
          >
            {status === "ok" ? (
              <div
                style={{
                  minHeight: 420,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#134E4A",
                }}
              >
                <CheckCircle2 size={52} color="#0891B2" strokeWidth={1.6} />
                <h2
                  style={{
                    fontFamily: "var(--v2-font-display)",
                    fontSize: 34,
                    fontWeight: 400,
                    margin: "22px 0 10px",
                  }}
                >
                  Demo request received.
                </h2>
                <p
                  style={{
                    maxWidth: 440,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "rgba(19, 78, 74, 0.7)",
                    margin: 0,
                  }}
                >
                  Thanks. We&rsquo;ll review the details and come back with the best
                  next step for your institution.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 14,
                }}
                className="demo-request-form"
              >
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

                <Field label="Your name" name="name" placeholder="Dr Jane Smith" required autoComplete="name" />
                <Field label="Work email" name="email" type="email" placeholder="j.smith@university.ac.uk" required autoComplete="email" />
                <Field label="Institution" name="institution" placeholder="University of ..." required autoComplete="organization" />
                <Field label="Your role" name="role" placeholder="Programme director" required />
                <Field label="Programme or cohort" name="programme" placeholder="Year 3 GP block, OSCE prep..." />
                <Field label="Timeline" name="timeline" placeholder="This term, next semester..." />

                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#134E4A",
                      marginBottom: 6,
                    }}
                  >
                    What would you like to see?{" "}
                    <span style={{ color: "rgba(19, 78, 74, 0.5)", fontWeight: 400 }}>
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="e.g. authoring scenarios, assigning students, consultation playback, rubric feedback..."
                    style={inputStyle({ minHeight: 130, resize: "vertical" })}
                    className="demo-request-input"
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    style={{
                      gridColumn: "1 / -1",
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
                    gridColumn: "1 / -1",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    height: 50,
                    marginTop: 6,
                    padding: "0 22px",
                    borderRadius: 10,
                    background: status === "submitting" ? "#64748B" : "#0891B2",
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    border: "none",
                    cursor: status === "submitting" ? "not-allowed" : "pointer",
                    transition: "background 200ms ease",
                  }}
                  className="demo-request-submit"
                >
                  {status === "submitting" ? (
                    "Sending..."
                  ) : (
                    <>
                      Request demo <ArrowRight size={16} strokeWidth={2} />
                    </>
                  )}
                </button>

                <p
                  style={{
                    gridColumn: "1 / -1",
                    fontSize: 11,
                    color: "rgba(19, 78, 74, 0.5)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  We only use your information to respond to this request.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />

      <style jsx>{`
        :global(.demo-request-input:focus) {
          border-color: #0891B2 !important;
          box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.12) !important;
        }
        :global(.demo-request-submit:hover:not(:disabled)) {
          background: #0E7490 !important;
        }
        @media (max-width: 720px) {
          .demo-request-form {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
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
        }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        style={inputStyle()}
        className="demo-request-input"
      />
    </div>
  );
}

function inputStyle(extra: CSSProperties = {}): CSSProperties {
  return {
    width: "100%",
    padding: "12px 14px",
    fontFamily: "var(--v2-font-body)",
    fontSize: 14,
    lineHeight: 1.5,
    color: "#134E4A",
    background: "#FFFFFF",
    border: "1.5px solid #E0F2FE",
    borderRadius: 10,
    outline: "none",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
    ...extra,
  };
}
