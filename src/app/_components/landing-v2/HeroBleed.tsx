"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PLAY_FOUNDER_FILM_EVENT } from "@/app/_components/landing-v2/FoundersFilm";

/**
 * Archangels-style bleed hero with white type floating top-left.
 * The bleed is either the animated MP4 or the static photo, depending on USE_ANIMATED_BLEED.
 * A SimPatient transcript-styled chat bubble overlay narrates the patient's line.
 */
const USE_ANIMATED_BLEED = true;
const BLEED_PHOTO = "/photos/hero-consultation.jpg";

// 3-scene slideshow. Each scene plays once, then cross-fades to the next.
// No zoom or pan — each scene holds its frame steady for the full clip.
// Each scene carries its own contextual bubble (label + speaker + quote)
// so the hero narrates a different point on every beat:
//   1. Patient experience  →  2. Educator authoring  →  3. Cohort delivery
type Scene = {
  src: string;
  /** Bottom-right caption pill */
  caption: string;
  /** Object-position for the bleed crop on this scene */
  objectPosition: string;
  /** Eyebrow inside the bubble header */
  bubbleEyebrow: string;
  /** Speaker label below the eyebrow */
  bubbleSpeaker: string;
  /** The quote / line that types out in the bubble body */
  bubbleQuote: string;
};
const SCENES: Scene[] = [
  {
    src: "/videos/hero-scene-1.mp4",
    caption: "SimPatient · Live session",
    objectPosition: "65% center",
    bubbleEyebrow: "FOR STUDENTS · PRACTICE ANYWHERE, ANY TIME",
    bubbleSpeaker: "Margaret · 31 · Patient",
    bubbleQuote:
      "Hi Doctor, thanks for seeing me. I've been having pain in my lower abdomen.",
  },
  {
    src: "/videos/hero-scene-2.mp4",
    caption: "School of Medicine · St Andrews",
    objectPosition: "55% center",
    bubbleEyebrow: "FOR EDUCATORS · AUTHOR & CONTROL YOUR RUBRIC",
    bubbleSpeaker: "Dr Sandhya · Clinical Educator",
    bubbleQuote:
      "This makes creating and testing patient scenarios much easier, and I love that it accepts my custom rubric.",
  },
  {
    src: "/videos/hero-scene-3.mp4",
    caption: "Clinical-skills lab · cohort practice",
    objectPosition: "60% center",
    bubbleEyebrow: "FOR PROGRAMMES · CONTROL YOUR COHORTS AND OSCE CIRCUITS",
    bubbleSpeaker: "Dr Predrag · Clinical Educator",
    bubbleQuote:
      "We can now simulate any type of patient we want, and train our class on the specific cases that are hard to mimic with manikins.",
  },
];
const CROSSFADE_MS = 1200;

// How long the typewriter takes to fully reveal a quote (ms).
// Tuned so it completes well before the scene cross-fades to the next.
const TYPE_DURATION_MS = 3600;

export function HeroBleed() {
  // Slideshow state: which scene is currently active (0, 1, or 2).
  const [activeScene, setActiveScene] = useState(0);
  const advanceScene = () => setActiveScene((s) => (s + 1) % SCENES.length);

  // When the active scene changes: play the new one from the start, rewind the others
  // so they're ready to play cleanly when their turn comes.
  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>(".v3-bleed-video");
    videos.forEach((v, i) => {
      if (i === activeScene) {
        v.currentTime = 0;
        v.play().catch(() => {/* autoplay may be blocked; muted videos should pass */});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [activeScene]);

  // The "displayed" scene lags behind activeScene by the fade-out window —
  // this guarantees the old bubble fades fully out before the new one fades in,
  // so they never visually overlap.
  const BUBBLE_FADE_MS = 450;
  const [displayedScene, setDisplayedScene] = useState(activeScene);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  useEffect(() => {
    if (activeScene === displayedScene) return;
    // Step 1: paint the fade-out frame with the OLD content visible (opacity → 0)
    setBubbleVisible(false);
    // Step 2: wait for the fade-out to complete, then swap content + fade back in
    const swap = setTimeout(() => {
      setDisplayedScene(activeScene);
      // Need a double rAF before flipping bubbleVisible back to true so the
      // browser paints the "opacity 0 + new content" state first; otherwise
      // React batches and we never actually see the fade-out frame.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setBubbleVisible(true));
      });
    }, BUBBLE_FADE_MS);
    return () => clearTimeout(swap);
  }, [activeScene, displayedScene]);

  // Per-scene typewriter. The displayed scene's quote types out word-by-word.
  // Tied to displayedScene (not activeScene) so the typing only starts after
  // the bubble has faded back in with the new content.
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const quote = SCENES[displayedScene].bubbleQuote;
    setTyped("");
    const words = quote.split(/(\s+)/);
    const perToken = TYPE_DURATION_MS / words.length;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    words.forEach((tok, j) => {
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setTyped((prev) => prev + tok);
        }, j * perToken)
      );
    });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [displayedScene]);

  // Bubble reads from displayedScene so its content swaps in lockstep with the fade.
  const scene = SCENES[displayedScene];

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 640,
        overflow: "hidden",
        background: "var(--v2-ink)",
      }}
    >
      {/* The bleed: 3-scene slideshow.
          Each scene plays once, then cross-fades to the next. No zoom or pan —
          stillness with motion of its own (the video's own content moving). */}
      {USE_ANIMATED_BLEED ? (
        SCENES.map((scene, i) => {
          const isActive = i === activeScene;
          return (
            <video
              key={`scene-${i}`}
              src={scene.src}
              poster={BLEED_PHOTO}
              autoPlay={isActive}
              muted
              playsInline
              preload="auto"
              className="v3-bleed-video"
              onEnded={() => isActive && advanceScene()}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: scene.objectPosition,
                filter: "saturate(0.85) contrast(1.05) brightness(0.78)",
                opacity: isActive ? 1 : 0,
                transition: `opacity ${CROSSFADE_MS}ms ease`,
              }}
            />
          );
        })
      ) : (
        <Image
          src={BLEED_PHOTO}
          alt="A medical student practising a consultation with an AI patient in a SimPatient session"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "65% center",
            filter: "saturate(0.85) contrast(1.05) brightness(0.78)",
            transform: "scaleX(-1)",
          }}
        />
      )}

      {/* Dark gradient overlay — left half stays dark even at wide screens so type always has a contrast zone */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(14, 26, 36, 0.85) 0%, rgba(14, 26, 36, 0.72) 30%, rgba(14, 26, 36, 0.45) 55%, rgba(14, 26, 36, 0.12) 80%, rgba(14, 26, 36, 0) 100%)",
        }}
      />

      {/* Vertical gradient on top + bottom for nav & captions */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(14, 26, 36, 0.4) 0%, rgba(14, 26, 36, 0) 18%, rgba(14, 26, 36, 0) 75%, rgba(14, 26, 36, 0.45) 100%)",
        }}
      />

      {/* Content — full-bleed, anchored to the LEFT edge of the viewport (not centered).
          On a wide screen this keeps the copy near the left wall instead of drifting middle. */}
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          paddingLeft: "clamp(24px, 6vw, 96px)",
          paddingRight: "clamp(24px, 6vw, 96px)",
          paddingBottom: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div
          className="v2-fade-in"
          style={{
            color: "rgba(255, 255, 255, 0.96)",
            minWidth: 0,
            maxWidth: 640,
          }}
        >
          {/* Eyebrow */}
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
            For Universities, Medical Schools &amp; Training Bodies
          </p>

          {/* Headline — tight 6-word version, italic-cyan emphasis on "at scale" */}
          <h1
            style={{
              fontFamily: "var(--v2-font-display)",
              fontSize: "clamp(40px, 5.4vw, 76px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: 0,
              lineHeight: 1.06,
              color: "#fff",
              overflowWrap: "break-word",
            }}
          >
            AI-simulated communication training,{" "}
            <em
              style={{
                fontFamily: "var(--v2-font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#22D3EE",
              }}
            >
              at scale.
            </em>
          </h1>

          {/* Subhead — concrete scenario types + founder credential + linked research hook */}
          <p
            style={{
              marginTop: 24,
              marginBottom: 32,
              maxWidth: 520,
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(255, 255, 255, 0.78)",
              overflowWrap: "break-word",
            }}
          >
            Author realistic scenarios. GP consultations, interviews, difficult conversations. Grade every interaction against your own rubric. Built by educators, for educators.{" "}
            <Link
              href="/research"
              className="v3-research-link"
              style={{
                color: "rgba(255, 255, 255, 0.92)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                textDecorationColor: "rgba(34, 211, 238, 0.5)",
                textDecorationThickness: "1px",
                transition: "color 200ms ease, text-decoration-color 200ms ease",
              }}
            >
              Grounded in real research.
            </Link>
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/book-demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 48,
                padding: "0 22px",
                borderRadius: 4,
                background: "#fff",
                color: "var(--v2-ink)",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "background 200ms ease",
              }}
            >
              Book a demo
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new Event(PLAY_FOUNDER_FILM_EVENT));
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 48,
                padding: "0 22px",
                borderRadius: 4,
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                letterSpacing: "0.01em",
                fontFamily: "inherit",
              }}
            >
              See in action
            </button>
          </div>

          {/* Trust logos under the CTAs — ported from v2, treated for dark hero.
              Both logos sit on a soft white pill so they read clean on the bleed
              video. Labels in muted white. */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/shots/st anderws uni.png"
                  alt="University of St Andrews"
                  width={64}
                  height={64}
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  lineHeight: 1.35,
                  color: "rgba(255, 255, 255, 0.82)",
                }}
              >
                Backed by University
                <br />
                of St Andrews
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo/NES_logo.jpg"
                  alt="NHS Education for Scotland"
                  width={64}
                  height={64}
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  lineHeight: 1.35,
                  color: "rgba(255, 255, 255, 0.82)",
                }}
              >
                Trained on NHS
                <br />
                Education for Scotland
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scene-contextual bubble — transparent + white text so it reads as a quiet
          overlay element of the hero, not a popped-out card. Soft local radial
          darken behind it (no visible card edges) keeps text legible over busy
          underlying video content. Opacity tied to bubbleVisible so the bubble
          fades out fully before the new scene's content swaps in.
          Hidden on mobile (<768px) — at narrow widths it competes with the headline. */}
      <div
        className="v3-scene-bubble"
        style={{
          position: "absolute",
          right: "clamp(24px, 6vw, 96px)",
          bottom: 110,
          width: "min(440px, 34vw)",
          padding: "24px 28px",
          fontFamily: "var(--v2-font-body)",
          color: "#134E4A",
          opacity: bubbleVisible ? 1 : 0,
          transform: bubbleVisible ? "translateY(0)" : "translateY(6px)",
          transition: `opacity ${BUBBLE_FADE_MS}ms ease, transform ${BUBBLE_FADE_MS}ms ease`,
          pointerEvents: bubbleVisible ? "auto" : "none",
          // Inverted: soft local LIGHTEN behind the text. Stronger white presence
          // (about +10% over the previous version) so the eyebrow reads cleanly
          // and the area feels more like soft paper.
          background:
            "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.88) 45%, rgba(255, 255, 255, 0.48) 78%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
        {/* Header row: SimPatient brand glyph + eyebrow tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <Image
            src="/logo/SimP_Black.png"
            alt=""
            width={48}
            height={48}
            style={{
              width: 22,
              height: 22,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--v2-font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0F172A",
              fontWeight: 700,
              lineHeight: 1.35,
            }}
          >
            {scene.bubbleEyebrow}
          </span>
        </div>

        {/* Speaker line */}
        <div
          style={{
            paddingBottom: 10,
            marginBottom: 12,
            borderBottom: "1px solid rgba(14, 78, 74, 0.18)",
            fontFamily: "var(--v2-font-mono)",
            fontSize: 11,
            color: "rgba(14, 78, 74, 0.65)",
            letterSpacing: "0.02em",
          }}
        >
          {scene.bubbleSpeaker}
        </div>

        {/* The typed quote */}
        <p
          style={{
            margin: 0,
            fontSize: 17,
            lineHeight: 1.5,
            color: "#0F172A",
            minHeight: 90,
            fontFamily: "var(--v2-font-display)",
            fontStyle: "italic",
            letterSpacing: "-0.005em",
          }}
        >
          &ldquo;{typed}
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 7,
              height: 16,
              marginLeft: 2,
              verticalAlign: "-2px",
              background: "#0891B2",
              animation: "v2-caret-blink 900ms steps(1) infinite",
            }}
          />
          {typed.length === scene.bubbleQuote.length ? "”" : ""}
        </p>
      </div>

      <style jsx>{`
        @keyframes v2-caret-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes v3-bubble-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* No bleed-video animation — scenes hold steady, motion comes only from
           the video content itself. */

        /* Research link inside subhead — subtle cyan underline by default,
           brighter on hover to make the click affordance clear. */
        :global(.v3-research-link:hover) {
          color: #FFFFFF !important;
          text-decoration-color: #22D3EE !important;
        }


        /* Responsive: hide the floating bubble on mobile where it competes with
           the headline for width. Slide-dots also hide — there's no value in
           manual scene navigation at phone size. */
        @media (max-width: 768px) {
          :global(.v3-scene-bubble) {
            display: none !important;
          }
        }
      `}</style>

      {/* Slide indicator dots — driven by activeScene; clickable to jump scenes */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: "clamp(24px, 6vw, 96px)",
          display: "flex",
          gap: 8,
        }}
      >
        {SCENES.map((_, i) => (
          <button
            key={`dot-${i}`}
            type="button"
            aria-label={`Show scene ${i + 1}`}
            onClick={() => setActiveScene(i)}
            style={{
              ...dot(i === activeScene),
              padding: 0,
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Scenario tag bottom-right — reflects the displayed scene's caption */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: "clamp(24px, 6vw, 96px)",
          fontFamily: "var(--v2-font-mono)",
          fontSize: 10,
          letterSpacing: "0.08em",
          color: "rgba(255, 255, 255, 0.55)",
          textTransform: "uppercase",
          opacity: bubbleVisible ? 1 : 0,
          transition: `opacity ${BUBBLE_FADE_MS}ms ease`,
        }}
      >
        {SCENES[displayedScene].caption}
      </div>
    </section>
  );
}

function dot(active: boolean): React.CSSProperties {
  return {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: active ? "#fff" : "rgba(255, 255, 255, 0.4)",
    display: "inline-block",
  };
}
