"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 128 }}>
      <div className="v2-container">
        {/* 12-column invisible grid — every element below locks to it */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            columnGap: 24,
            rowGap: 32,
            alignItems: "start",
          }}
          className="v2-hero-grid"
        >
          {/* Copy block: cols 1–5 */}
          <div
            className="v2-fade-in v2-hero-copy"
            style={{
              gridColumn: "1 / span 5",
              minWidth: 0,
            }}
          >
            <h1
              style={{
                fontSize: "clamp(32px, 3.6vw, 52px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.06,
                overflowWrap: "break-word",
                wordBreak: "normal",
                hyphens: "auto",
              }}
            >
              Deliver communication-skills training through AI simulation.{" "}
              <em style={{ fontFamily: "var(--v2-font-display)", fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
                Across every cohort.
              </em>
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--v2-ink-muted)",
                marginTop: 20,
                marginBottom: 28,
                overflowWrap: "break-word",
              }}
            >
              Author realistic scenarios. Train through video, audio, and text. Graded by your rubric. Grounded in real research.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/book-demo" className="v2-btn v2-btn-primary">
                Book a demo
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <a href="#tour" className="v2-btn v2-btn-secondary">
                <Play size={14} strokeWidth={2} />
                See in action
              </a>
            </div>

            {/* Trust logos under CTAs — small institutional anchors */}
            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Image
                  src="/shots/st anderws uni.png"
                  alt="University of St Andrews"
                  width={64}
                  height={64}
                  style={{ width: 32, height: 32, objectFit: "contain" }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    lineHeight: 1.35,
                    color: "var(--v2-ink-muted)",
                  }}
                >
                  Backed by University
                  <br />
                  of St Andrews
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Image
                  src="/logo/NES_logo.jpg"
                  alt="NHS Education for Scotland"
                  width={64}
                  height={64}
                  style={{ width: 32, height: 32, objectFit: "contain" }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    lineHeight: 1.35,
                    color: "var(--v2-ink-muted)",
                  }}
                >
                  Trained on NHS
                  <br />
                  Education for Scotland
                </p>
              </div>
            </div>
          </div>

          {/* Photo block: cols 6–12 */}
          <div
            className="v2-screenshot v2-hero-photo v2-fade-in v2-hero-photo-block"
            style={{
              gridColumn: "6 / span 7",
              position: "relative",
              minWidth: 0,
            }}
          >
            <Image
              src="/photos/hero-consultation.jpg"
              alt="A medical student in a teaching space, looking at her laptop where an AI patient consultation is in progress in the SimPatient platform"
              width={2000}
              height={1333}
              priority
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 3,
                display: "block",
                aspectRatio: "3 / 2",
                objectFit: "cover",
                transform: "scaleX(-1)",
              }}
            />

            {/* Bottom-right caption pill (image is flipped, so this sits over the laptop) */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                background: "var(--v2-ink)",
                color: "var(--v2-paper)",
                fontFamily: "var(--v2-font-mono)",
                fontSize: 11,
                padding: "6px 10px",
                borderRadius: 3,
                letterSpacing: "0.04em",
              }}
            >
              SIMPATIENT · VIDEO CONSULTATION
            </div>

            {/* Top-left scenario tag (over the open couch area on the left of the flipped image) */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                background: "rgba(250, 248, 244, 0.92)",
                backdropFilter: "blur(8px)",
                color: "var(--v2-ink)",
                fontFamily: "var(--v2-font-mono)",
                fontSize: 10,
                padding: "6px 10px",
                borderRadius: 3,
                letterSpacing: "0.06em",
                border: "1px solid var(--v2-rule)",
              }}
            >
              ANDREWS, 40 · CHEST PAIN ON EXERTION
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Restack to a single column on narrow viewports — never let the text crash into the photo */
        @media (max-width: 900px) {
          .v2-hero-grid :global(.v2-hero-copy),
          .v2-hero-grid :global(.v2-hero-photo-block) {
            grid-column: 1 / -1 !important;
          }
        }
        /* Subtle editorial tone on the hero photo */
        :global(.v2-hero-photo img) {
          filter: saturate(0.94) contrast(1.02);
        }
      `}</style>
    </section>
  );
}
