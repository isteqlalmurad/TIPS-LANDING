"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react";

const VIDEO_SRC = "/videos/demo.mp4";

// Event other components (e.g. the hero "See in action" button) can dispatch to
// scroll this video into view and start it from the beginning with sound.
export const PLAY_FOUNDER_FILM_EVENT = "simpatient:play-founder-film";

export function FoundersFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  // Tracks whether the viewer has "engaged" (turned sound on at least once).
  // Until then, a click restarts the clip from the start with audio.
  const [engaged, setEngaged] = useState(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) setEngaged(true);
  }, []);

  // Restart the video from 0, unmuted, playing.
  const restartWithSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    setMuted(false);
    setEngaged(true);
    void v.play();
    setPlaying(true);
  }, []);

  // Click on the video itself: first interaction restarts with sound; after
  // that it behaves as a normal play/pause toggle.
  const handleVideoClick = useCallback(() => {
    if (!engaged) {
      restartWithSound();
    } else {
      togglePlay();
    }
  }, [engaged, restartWithSound, togglePlay]);

  // Scroll into view (centered) + restart with sound. Triggered by the event.
  const playFromStartCentered = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Wait for the smooth scroll to mostly settle before unmuting/playing so the
    // audio doesn't start while the section is still off-screen.
    window.setTimeout(() => restartWithSound(), 450);
  }, [restartWithSound]);

  useEffect(() => {
    const handler = () => playFromStartCentered();
    window.addEventListener(PLAY_FOUNDER_FILM_EVENT, handler);
    return () => window.removeEventListener(PLAY_FOUNDER_FILM_EVENT, handler);
  }, [playFromStartCentered]);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio * 100);
  }, []);

  const btnStyle: React.CSSProperties = {
    width: 38,
    height: 38,
    borderRadius: 999,
    background: "rgba(14, 26, 36, 0.85)",
    color: "var(--v2-paper)",
    border: "1px solid rgba(250, 248, 244, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    transition: "background 200ms ease",
  };

  const miniBtnStyle: React.CSSProperties = {
    width: 30,
    height: 30,
    borderRadius: 999,
    background: "rgba(14, 26, 36, 0.55)",
    color: "var(--v2-paper)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(6px)",
    transition: "background 200ms ease",
  };

  return (
    <section
      ref={sectionRef}
      id="tour"
      className="v2-section"
      style={{
        background: "var(--v2-paper-deep)",
        borderTop: "1px solid var(--v2-rule)",
        scrollMarginTop: 80,
      }}
    >
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            A note from founder
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
            Dr Andrew O&rsquo;Malley,{" "}
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
              founder of SimPatient.
            </em>
          </h2>
          <p
            style={{
              fontSize: "var(--v2-text-body-lg)",
              color: "var(--v2-ink-muted)",
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 640,
            }}
          >
            Andrew shares why SimPatient was built: realistic consultation
            practice for every student, assigned across cohorts, with feedback
            grounded in the rubrics educators already trust.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="v2-screenshot"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "transparent",
            border: "none",
            borderRadius: 0,
            padding: 0,
          }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: 0,
              cursor: "pointer",
            }}
            onClick={handleVideoClick}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={onTimeUpdate}
          />

          {/* MINIMAL strip (default): slim progress line + tiny controls + expander */}
          {!expanded && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "0 12px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                zIndex: 2,
                background:
                  "linear-gradient(to top, rgba(10, 18, 26, 0.55), transparent)",
              }}
            >
              {/* Progress line */}
              <div
                onClick={seek}
                role="slider"
                aria-label="Seek"
                aria-valuenow={Math.round(progress)}
                tabIndex={0}
                style={{
                  height: 4,
                  width: "100%",
                  background: "rgba(250, 248, 244, 0.25)",
                  borderRadius: 999,
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "var(--v2-cyan, #22D3EE)",
                    transition: "width 120ms linear",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} style={miniBtnStyle}>
                    {playing ? <Pause size={14} strokeWidth={1.8} /> : <Play size={14} strokeWidth={1.8} />}
                  </button>
                  <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} style={miniBtnStyle}>
                    {muted ? <VolumeX size={14} strokeWidth={1.8} /> : <Volume2 size={14} strokeWidth={1.8} />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  aria-label="Show full controls"
                  style={miniBtnStyle}
                >
                  <ChevronUp size={14} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          )}

          {/* FULL strip (expanded): the original labeled pill + round controls */}
          {expanded && (
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  background: "var(--v2-ink)",
                  color: "var(--v2-paper)",
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: 11,
                  padding: "6px 10px",
                  borderRadius: 3,
                  letterSpacing: "0.04em",
                }}
              >
                DR ANDREW O&rsquo;MALLEY &middot; FOUNDER NOTE
              </div>

              <div style={{ display: "flex", gap: 8, pointerEvents: "auto" }}>
                <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} style={btnStyle}>
                  {playing ? <Pause size={16} strokeWidth={1.8} /> : <Play size={16} strokeWidth={1.8} />}
                </button>
                <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} style={btnStyle}>
                  {muted ? <VolumeX size={16} strokeWidth={1.8} /> : <Volume2 size={16} strokeWidth={1.8} />}
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  aria-label="Minimise controls"
                  style={btnStyle}
                >
                  <ChevronDown size={16} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
