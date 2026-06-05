"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function VideoTour() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
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
  }, []);

  return (
    <section
      id="tour"
      className="v2-section"
      style={{ borderTop: "1px solid var(--v2-rule)" }}
    >
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            A 90-second tour
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
            Watch a full consultation,{" "}
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>
              briefing to feedback.
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
            A learner opens a scenario, talks to the AI patient, completes the reflection step,
            and reads the rubric-graded feedback. Recorded straight from the product. No
            mock-ups.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="v2-screenshot"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <video
            ref={videoRef}
            src="/videos/demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: 3,
              cursor: "pointer",
            }}
            onClick={togglePlay}
          />

          {/* Controls */}
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
              SIMPATIENT &middot; PRODUCT TOUR
            </div>

            <div style={{ display: "flex", gap: 8, pointerEvents: "auto" }}>
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                style={{
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
                }}
              >
                {playing ? <Pause size={16} strokeWidth={1.8} /> : <Play size={16} strokeWidth={1.8} />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                style={{
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
                }}
              >
                {muted ? <VolumeX size={16} strokeWidth={1.8} /> : <Volume2 size={16} strokeWidth={1.8} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
