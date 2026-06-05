"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Volume2, VolumeX, X } from "lucide-react";

/**
 * DiversityEngineV3 — flagship "what makes us different" moment on /v3.
 *
 * Two-row layout:
 *  1. Editorial copy + citation card up top, hero-anchored to the left wall.
 *  2. Horizontal carousel of 8 patient portraits below — the visual proof of
 *     the Diversity Engine claim. Hover-to-play, click for fullscreen audio
 *     (videos arrive later; for now each tile is a static portrait).
 *
 * Behaviour for each tile:
 *  - Idle:   static poster image.
 *  - Hover:  if a video src is provided, autoplay muted + loop.
 *            (When portraits are images-only, hover just adds a subtle lift.)
 *  - Click:  opens a fullscreen lightbox version with audio + native controls.
 *
 * To activate a tile's video, set its `videoSrc` in the PATIENTS array below.
 * The tile gracefully falls back to a static portrait if no video is provided.
 */

type Patient = {
  /** kebab-case id, also used as the React key */
  id: string;
  /** display name shown on the caption strip */
  name: string;
  /** age + presenting complaint */
  age: number;
  complaint: string;
  /** Census-style ethnicity label, shown as a chip to make diversity legible */
  ethnicity: string;
  /** how the persona reads demographically (used for accessibility alt-text) */
  demographic: string;
  /** static portrait JPG/PNG path under /public */
  poster: string;
  /** optional MP4 path; when set, hover plays it muted and click goes audio-on */
  videoSrc?: string;
};

const PATIENTS: Patient[] = [
  {
    id: "fatima",
    name: "Fatima Ahmed",
    age: 26,
    complaint: "Recurrent chest pain · GP",
    ethnicity: "Pakistani",
    demographic: "Young South Asian woman, hijab",
    poster: "/videos/patients/fatima-poster.jpg",
    videoSrc: "/videos/patients/fatima.mp4",
  },
  {
    id: "dmitri",
    name: "Dmitri Volkov",
    age: 72,
    complaint: "Shortness of breath · Geriatrics",
    ethnicity: "White Eastern European",
    demographic: "Older white man, ~70s",
    poster: "/videos/patients/dmitri-poster.jpg",
    videoSrc: "/videos/patients/dmitri.mp4",
  },
  {
    id: "carlos",
    name: "Carlos Mendes",
    age: 24,
    complaint: "Acute distress · A&E",
    ethnicity: "White / Latino",
    demographic: "Young man, mid-20s",
    poster: "/videos/patients/carlos-poster.jpg",
    videoSrc: "/videos/patients/carlos.mp4",
  },
  {
    id: "maria",
    name: "Maria Singh",
    age: 68,
    complaint: "Persistent fatigue · GP",
    ethnicity: "Indian",
    demographic: "Older South Asian woman",
    poster: "/videos/patients/maria-poster.jpg",
    videoSrc: "/videos/patients/maria.mp4",
  },
  {
    id: "ahmed",
    name: "Ahmed Khan",
    age: 52,
    complaint: "Type 2 diabetes review · GP",
    ethnicity: "Middle Eastern",
    demographic: "Middle-aged Middle Eastern man, glasses",
    poster: "/videos/patients/ahmed-poster.jpg",
    videoSrc: "/videos/patients/ahmed.mp4",
  },
  {
    id: "kasia",
    name: "Kasia Nowak",
    age: 28,
    complaint: "Mood and sleep · GP",
    ethnicity: "White Polish",
    demographic: "Young white woman, late 20s",
    poster: "/videos/patients/kasia-poster.jpg",
    videoSrc: "/videos/patients/kasia.mp4",
  },
  {
    id: "elena",
    name: "Elena Ricci",
    age: 46,
    complaint: "Headaches and vision change · Neurology",
    ethnicity: "White Italian",
    demographic: "Middle-aged white woman",
    poster: "/videos/patients/elena-poster.jpg",
    videoSrc: "/videos/patients/elena.mp4",
  },
  {
    id: "sarah",
    name: "Sarah O'Connor",
    age: 24,
    complaint: "Abdominal pain · A&E",
    ethnicity: "White Irish",
    demographic: "Young white woman, clinical room",
    poster: "/videos/patients/sarah-poster.jpg",
    videoSrc: "/videos/patients/sarah.mp4",
  },
  {
    id: "mei",
    name: "Mei Chen",
    age: 42,
    complaint: "Sudden facial weakness · Neurology",
    ethnicity: "East Asian",
    demographic: "Middle-aged East Asian woman, facial asymmetry",
    poster: "/videos/patients/mei-poster.jpg",
    videoSrc: "/videos/patients/mei.mp4",
  },
  {
    id: "tom",
    name: "Tom Bradley",
    age: 48,
    complaint: "Head injury after fall · A&E",
    ethnicity: "White British",
    demographic: "Middle-aged white man, facial trauma",
    poster: "/videos/patients/tom-poster.jpg",
    videoSrc: "/videos/patients/tom.mp4",
  },
];

export function DiversityEngineV3() {
  const [focused, setFocused] = useState<Patient | null>(null);

  return (
    <section
      id="diversity-engine"
      className="v2-section"
      style={{
        background: "var(--v2-paper)",
        borderTop: "1px solid var(--v2-rule)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "none",
          margin: 0,
          paddingLeft: "clamp(24px, 4vw, 72px)",
          paddingRight: "clamp(24px, 4vw, 72px)",
        }}
      >
        {/* ─── Row 1: editorial copy + citation card ─────────────────── */}
        <div
          className="v3-de-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "end",
            marginBottom: 56,
          }}
        >
          {/* Headline + body */}
          <div>
            <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
              Flagship &middot; The Diversity Engine
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
              Most AI-patient platforms have a diversity problem.{" "}
              <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
                We have the fix.
              </em>
            </h2>
            <p
              style={{
                fontSize: "var(--v2-text-body-lg)",
                color: "var(--v2-ink-muted)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 600,
              }}
            >
              Our published research found that standard generative models
              significantly under-represent darker skin tones in medical
              imagery (P&nbsp;&lt;&nbsp;.001). So we built the Diversity
              Engine: a custom model that injects real demographic
              distributions into the generation pipeline. The gap dropped to{" "}
              <strong style={{ color: "var(--v2-ink)" }}>
                P&nbsp;=&nbsp;.04
              </strong>
              , near-representative output. It now sits inside every
              SimPatient deployment.
            </p>
          </div>

          {/* Citation card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--v2-rule)",
              borderRadius: 12,
              padding: "20px 22px",
              boxShadow: "0 4px 14px rgba(14, 26, 36, 0.04)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--v2-font-mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--v2-ink-muted)",
                margin: 0,
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              Peer-reviewed
            </p>
            <p
              style={{
                fontFamily: "var(--v2-font-display)",
                fontSize: 17,
                lineHeight: 1.4,
                color: "var(--v2-ink)",
                margin: 0,
                marginBottom: 10,
                letterSpacing: "-0.005em",
              }}
            >
              Ensuring appropriate representation in AI-generated medical
              imagery
            </p>
            <p
              style={{
                fontSize: 13,
                color: "var(--v2-ink-muted)",
                margin: 0,
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              O&rsquo;Malley AS, Veenhuizen MA, Ahmed A. &middot;{" "}
              <em>JMIR AI</em> 2024;3:e58275
            </p>
            <Link
              href="https://doi.org/10.2196/58275"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 13,
                color: "var(--v2-cyan-deep)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Read on JMIR AI <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* ─── Row 2: patient marquee ──────────────────────────────────── */}
        <div>
          <p
            style={{
              fontFamily: "var(--v2-font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--v2-ink-muted)",
              margin: 0,
              marginBottom: 18,
              fontWeight: 600,
            }}
          >
            The Diversity Engine in production &middot; hover any tile to
            pause
          </p>
        </div>

        {/* Infinite-loop marquee. The tile list is rendered twice so the
            translateX(-50%) animation can wrap seamlessly. Bleeds past the
            section padding so the loop edge happens off-screen. Pauses on
            hover so any individual tile can be inspected. */}
        <div
          className="v3-de-marquee"
          style={{
            position: "relative",
            marginLeft: "calc(clamp(24px, 4vw, 72px) * -1)",
            marginRight: "calc(clamp(24px, 4vw, 72px) * -1)",
            overflow: "hidden",
            maskImage:
              "linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%)",
            paddingTop: 4,
            paddingBottom: 12,
          }}
        >
          <div className="v3-de-marquee-track">
            {/* First copy of the tiles */}
            {PATIENTS.map((p) => (
              <PatientTile
                key={`a-${p.id}`}
                patient={p}
                onOpen={() => setFocused(p)}
              />
            ))}
            {/* Second copy (aria-hidden so screen readers don't repeat) */}
            <div aria-hidden style={{ display: "contents" }}>
              {PATIENTS.map((p) => (
                <PatientTile
                  key={`b-${p.id}`}
                  patient={p}
                  onOpen={() => setFocused(p)}
                />
              ))}
            </div>
          </div>
        </div>

        <p
          style={{
            marginTop: 24,
            fontSize: 13,
            color: "var(--v2-ink-muted)",
            margin: "24px 0 0",
            fontStyle: "italic",
            maxWidth: 720,
          }}
        >
          Personas generated by SimPatient against US Census and Scotland 2022
          Census distributions. Not real patients.
        </p>
      </div>

      {/* ─── Fullscreen lightbox for click-to-focus ───────────────────── */}
      {focused && (
        <PatientLightbox
          patient={focused}
          onClose={() => setFocused(null)}
        />
      )}

      <style jsx>{`
        /* Marquee track — infinite linear scroll. We render the tile list
           twice; translating to -50% of the *doubled* track returns us to
           the same visual frame, so the loop is seamless.

           Pause on hover/focus so a visitor can read a tile.
           Honour prefers-reduced-motion by stopping the animation entirely
           and falling back to natural horizontal overflow. */
        .v3-de-marquee-track {
          display: flex;
          flex-wrap: nowrap;
          gap: 16px;
          width: max-content;
          padding: 0 clamp(24px, 4vw, 72px);
          animation: v3-de-marquee-scroll 60s linear infinite;
          will-change: transform;
        }
        .v3-de-marquee:hover .v3-de-marquee-track,
        .v3-de-marquee:focus-within .v3-de-marquee-track {
          animation-play-state: paused;
        }
        @keyframes v3-de-marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            /* -50% returns us to the first copy of the duplicated tile list,
               so the visible content is identical and the loop is seamless. */
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-de-marquee {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .v3-de-marquee-track {
            animation: none;
            width: max-content;
          }
        }

        @media (max-width: 900px) {
          .v3-de-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            align-items: start !important;
          }
          /* Faster scroll on mobile so the loop is noticeable in a smaller
             viewport. */
          .v3-de-marquee-track {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Single patient tile ────────────────────────────────────────────── */

function PatientTile({
  patient,
  onOpen,
}: {
  patient: Patient;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);

  function handleEnter() {
    setHovered(true);
    const v = videoRef.current;
    if (v && patient.videoSrc) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }
  function handleLeave() {
    setHovered(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }

  return (
    <button
      type="button"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onClick={onOpen}
      aria-label={`${patient.name}, ${patient.age}, ${patient.complaint}`}
      className="v3-de-tile"
      style={{
        flexShrink: 0,
        width: "clamp(220px, 22vw, 280px)",
        aspectRatio: "4 / 5",
        position: "relative",
        scrollSnapAlign: "start",
        background: "var(--v2-ink)",
        border: "1px solid var(--v2-rule)",
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
        boxShadow: hovered
          ? "0 18px 36px rgba(14, 26, 36, 0.22), 0 6px 14px rgba(14, 26, 36, 0.1)"
          : "0 4px 12px rgba(14, 26, 36, 0.08)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 240ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 240ms ease",
      }}
    >
      {/* Static portrait */}
      <Image
        src={patient.poster}
        alt={`${patient.name} — ${patient.demographic}`}
        fill
        sizes="(max-width: 900px) 80vw, 280px"
        style={{
          objectFit: "cover",
          objectPosition: "center top",
          opacity: hovered && patient.videoSrc ? 0 : 1,
          transition: "opacity 320ms ease",
        }}
      />

      {/* Optional video — only mounts if we have a src */}
      {patient.videoSrc && (
        <video
          ref={videoRef}
          src={patient.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: hovered ? 1 : 0,
            transition: "opacity 320ms ease",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Bottom caption gradient + text */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "55%",
          background:
            "linear-gradient(180deg, rgba(14, 26, 36, 0) 0%, rgba(14, 26, 36, 0.85) 90%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 14,
        }}
      >
        <p
          style={{
            fontFamily: "var(--v2-font-display)",
            fontSize: 16,
            fontWeight: 500,
            color: "var(--v2-paper)",
            margin: 0,
            letterSpacing: "-0.005em",
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.55)",
            lineHeight: 1.2,
          }}
        >
          {patient.name}
          <span
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: 13,
              fontWeight: 400,
              color: "rgba(250, 248, 244, 0.78)",
              marginLeft: 8,
            }}
          >
            · {patient.age} · {patient.ethnicity}
          </span>
        </p>
        <p
          style={{
            fontFamily: "var(--v2-font-body)",
            fontSize: 12,
            color: "rgba(250, 248, 244, 0.82)",
            margin: 0,
            marginTop: 4,
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.55)",
            letterSpacing: "0.01em",
          }}
        >
          {patient.complaint}
        </p>
      </div>
    </button>
  );
}

/* ─── Fullscreen lightbox ─────────────────────────────────────────────── */

function PatientLightbox({
  patient,
  onClose,
}: {
  patient: Patient;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${patient.name} consultation`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(14, 26, 36, 0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 48px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 720,
          aspectRatio: "4 / 5",
          borderRadius: 14,
          overflow: "hidden",
          background: "#000",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
        }}
      >
        {patient.videoSrc ? (
          <video
            ref={videoRef}
            src={patient.videoSrc}
            autoPlay
            muted={muted}
            loop
            playsInline
            controls={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Image
            src={patient.poster}
            alt={`${patient.name} — ${patient.demographic}`}
            fill
            sizes="(max-width: 900px) 100vw, 720px"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        )}

        {/* Bottom info bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "20px 24px",
            background:
              "linear-gradient(180deg, rgba(14, 26, 36, 0) 0%, rgba(14, 26, 36, 0.9) 100%)",
            color: "var(--v2-paper)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontFamily: "var(--v2-font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--v2-paper)",
              background: "rgba(8, 145, 178, 0.92)",
              padding: "4px 9px",
              borderRadius: 6,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            {patient.ethnicity}
          </div>
          <p
            style={{
              fontFamily: "var(--v2-font-display)",
              fontSize: 22,
              fontWeight: 500,
              margin: 0,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            {patient.name},{" "}
            <span style={{ opacity: 0.78, fontWeight: 400 }}>
              {patient.age}
            </span>
          </p>
          <p
            style={{
              fontSize: 14,
              color: "rgba(250, 248, 244, 0.86)",
              margin: 0,
              marginTop: 4,
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            {patient.complaint}
          </p>
        </div>

        {/* Top-right close + mute */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 8,
          }}
        >
          {patient.videoSrc && (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute" : "Mute"}
              style={iconBtnStyle}
            >
              {muted ? (
                <VolumeX size={16} strokeWidth={1.8} />
              ) : (
                <Volume2 size={16} strokeWidth={1.8} />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={iconBtnStyle}
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}

const iconBtnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 999,
  background: "rgba(14, 26, 36, 0.85)",
  color: "var(--v2-paper)",
  border: "1px solid rgba(250, 248, 244, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backdropFilter: "blur(8px)",
};
