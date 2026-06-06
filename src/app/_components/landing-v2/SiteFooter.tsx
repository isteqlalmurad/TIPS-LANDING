"use client";

import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--v2-rule)",
        background: "var(--v2-paper)",
        padding: "56px 0 32px",
      }}
    >
      <div className="v2-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="v2-footer-grid"
        >
          <div>
            <Image
              src="/logo/SimLogo-dark.png"
              alt="SimPatient"
              width={120}
              height={28}
              style={{ height: 22, width: "auto", marginBottom: 16 }}
            />
            <p style={{ fontSize: 13, color: "var(--v2-ink-muted)", lineHeight: 1.55, margin: 0, maxWidth: 320 }}>
              Rigorous, research-backed AI patient simulation, built inside a medical school.
            </p>
          </div>

          <div>
            <p className="v2-eyebrow" style={{ marginBottom: 14 }}>
              Product
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>
                <Link href="/" style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}>
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/pricing" style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/book-demo" style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}>
                  Book a demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="v2-eyebrow" style={{ marginBottom: 14 }}>
              Company
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>
                <Link href="/research" style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}>
                  Research
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}>
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://andrewomalley.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}
                >
                  AI x MedEd (Our Blog)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="v2-eyebrow" style={{ marginBottom: 14 }}>
              Legal
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>
                <Link href="/legal/privacy-policy" style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-of-service" style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy" style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/data-processing-agreement" style={{ fontSize: 13, color: "var(--v2-ink)", textDecoration: "none" }}>
                  Data Processing Agreement
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="v2-eyebrow" style={{ marginBottom: 14 }}>
              Contact
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={{ fontSize: 13, color: "var(--v2-ink-muted)", lineHeight: 1.5 }}>
                <a href="mailto:hello@simpatient.co.uk" style={{ color: "var(--v2-ink)", textDecoration: "none" }}>
                  hello@simpatient.co.uk
                </a>
              </li>
              <li style={{ fontSize: 13, color: "var(--v2-ink-muted)", lineHeight: 1.5 }}>
                School of Medicine
                <br />
                University of St Andrews
                <br />
                KY16 9TF
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid var(--v2-rule)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: "var(--v2-ink-muted)", margin: 0 }}>
            &copy; 2026 SimPatient. All rights reserved.
          </p>
          <p
            style={{
              fontSize: 12,
              color: "var(--v2-ink-muted)",
              margin: 0,
              lineHeight: 1.5,
              maxWidth: 640,
            }}
          >
            SimPatient is a trading name of St Andrews Medical Innovations
            Limited, a company registered in Scotland (company number SC705314).
            Registered office: Walter Bower House, Main Street, Guardbridge, St
            Andrews, Fife, KY16 0US.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
