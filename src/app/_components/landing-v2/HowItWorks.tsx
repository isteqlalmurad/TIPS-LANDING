"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HowItWorks — sticky scrollytelling of the SimPatient lifecycle.
 *
 * The section is tall (STAGES.length viewport-heights). As the user scrolls
 * through it, a left sticky panel cross-fades between four stages while a
 * vertical wiggly SVG line on the right "draws itself" down to the active
 * node. Completed nodes stay filled cyan; upcoming ones are muted.
 *
 * Stages: Generate -> Deploy -> Capture -> Evaluate.
 *
 * Scroll mechanic: we measure how far the section's top has scrolled past the
 * top of the viewport and map that 0..1 progress to a stage index. A small
 * easing dead-zone at the start/end keeps the first/last stage readable.
 */

type Stage = {
  n: string;
  key: string;
  title: string;
  lead: string;
  bullets: string[];
  /** optional product clip shown only when this stage is active */
  videoSrc?: string;
  poster?: string;
};

const STAGES: Stage[] = [
  {
    n: "1",
    key: "generate",
    title: "Generate",
    lead: "Build a simulated scenario in a few guided steps, or generate a complete patient from a single line. Set the demographics, the presenting complaint, and how the patient behaves, and the Diversity Engine fills in the rest with a representative persona.",
    bullets: [],
    videoSrc: "/videos/persona-generation.mp4",
    poster: "/videos/persona-generation-poster.jpg",
  },
  {
    n: "2",
    key: "deploy",
    title: "Deploy",
    lead: "Publish the scenario across your organisation, assign it to the right student cohort, and decide exactly who practises what. Group access lets you target a Year 3 GP block, a finals OSCE-prep set, or a single tutor group, while drafts stay private until you promote them live so faculty can review everything before learners ever see it.",
    bullets: [],
    videoSrc: "/videos/deploy-section.mp4",
    poster: "/videos/deploy-section-poster.jpg",
  },
  {
    n: "3",
    key: "capture",
    title: "Capture",
    lead: "The learner consults the patient by text, voice, or live video avatar, and every moment is recorded. Each turn is transcribed in full alongside the reflection the learner completes afterwards, and the timing, flow, and self-assessment are all captured ready for the grading pass.",
    bullets: [],
    videoSrc: "/videos/capture-section.mp4",
    poster: "/videos/capture-section-poster.jpg",
  },
  {
    n: "4",
    key: "evaluate",
    title: "Evaluate",
    lead: "Diagnostic reasoning and communication are graded against the rubric the educator chose. Calgary-Cambridge and CRI-HT are built in, or tutors can publish and grade against their own, and every section score comes with transcript-cited justification, with tutor-in-the-loop review available for summative work.",
    bullets: [],
    videoSrc: "/videos/evaluate-section.mp4",
    poster: "/videos/evaluate-section-poster.jpg",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrollable = el.offsetHeight - vh;
        if (scrollable <= 0) {
          setActive(0);
          return;
        }
        const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
        const p = scrolled / scrollable; // 0..1 through the section

        // Each stage owns an equal band of 1/N. We flip to the next stage at
        // the CENTRE of each band rather than the edge, so a stage stays put
        // while you scroll through most of its band and snaps cleanly to the
        // next one. This removes the "half-drawn between stages" feeling.
        const band = 1 / STAGES.length;
        const idx = Math.min(
          STAGES.length - 1,
          Math.max(0, Math.floor((p - band / 2) / band) + 1)
        );
        setActive(idx);
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        position: "relative",
        background: "var(--v2-paper-deep)",
        borderTop: "1px solid var(--v2-rule)",
        // Each stage owns ~70vh of scroll distance (a short, single-ish scroll
        // advances a stage) plus the final sticky viewport. Keeping this
        // modest fixes the "many scrolls per stage" feel.
        height: `${STAGES.length * 70 + 100}vh`,
      }}
    >
      {/* Sticky viewport-height stage. Title is pinned near the top (always
          visible, never spills off-screen) and the stage detail fills the
          space below it. */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "clamp(56px, 8vh, 96px)",
          paddingBottom: "clamp(24px, 4vh, 48px)",
        }}
      >
        <div
          style={{
            width: "100%",
            paddingLeft: "clamp(24px, 4vw, 72px)",
            paddingRight: "clamp(24px, 4vw, 72px)",
          }}
        >
          {/* Eyebrow + section title — matches the sibling sections'
              eyebrow + display-lg headline so the page reads uniform. */}
          <div style={{ marginBottom: "clamp(20px, 3vh, 40px)", maxWidth: 820 }}>
            <p className="v2-eyebrow" style={{ marginBottom: 16 }}>
              How SimPatient works
            </p>
            <h2
              style={{
                fontSize: "var(--v2-text-display-lg)",
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: "var(--v2-ink)",
              }}
            >
              Scenario{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--v2-cyan-deep)",
                  whiteSpace: "nowrap",
                }}
              >
                lifecycle.
              </em>
            </h2>
          </div>

          {/* Left detail panel. The timeline is no longer part of this flow —
              it is positioned independently (vertically centred in the sticky
              viewport) so the text/video can sit right under the title without
              fighting the timeline's height. Width is capped so it doesn't run
              under the absolutely-positioned timeline on the right. */}
          <div
            className="v3-hiw-detail"
            style={{
              maxWidth: "min(720px, 58%)",
              marginTop: "clamp(20px, 3vh, 40px)",
            }}
          >
            {/* LEFT — active stage detail (cross-faded) */}
            <div style={{ position: "relative", minHeight: 280 }}>
              {STAGES.map((s, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={s.key}
                    aria-hidden={!isActive}
                    style={{
                      position: i === 0 ? "relative" : "absolute",
                      inset: i === 0 ? undefined : 0,
                      top: 0,
                      left: 0,
                      right: 0,
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateY(0)"
                        : "translateY(12px)",
                      transition:
                        "opacity 420ms cubic-bezier(0.2,0.7,0.2,1), transform 420ms cubic-bezier(0.2,0.7,0.2,1)",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Two invisible boxes side by side: LEFT = ball over the
                        title; RIGHT = the description body. */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "clamp(20px, 3vw, 40px)",
                        marginBottom: 24,
                      }}
                    >
                      {/* LEFT box — ball centred above the title */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 14,
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 999,
                            background: "var(--v2-cyan-deep)",
                            color: "var(--v2-paper)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--v2-font-mono)",
                            fontSize: 22,
                            fontWeight: 700,
                          }}
                        >
                          {s.n}
                        </span>
                        <h3
                          style={{
                            fontFamily: "var(--v2-font-display)",
                            fontSize: "clamp(28px, 3vw, 40px)",
                            fontWeight: 400,
                            margin: 0,
                            letterSpacing: "-0.015em",
                            lineHeight: 1.1,
                            color: "var(--v2-ink)",
                          }}
                        >
                          {s.title}
                        </h3>
                      </div>

                      {/* RIGHT box — description body, fills remaining width */}
                      <p
                        style={{
                          fontSize: 18,
                          lineHeight: 1.6,
                          color: "var(--v2-ink)",
                          margin: 0,
                          flex: 1,
                        }}
                      >
                        {s.lead}
                      </p>
                    </div>

                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        maxWidth: 520,
                      }}
                    >
                      {s.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          style={{
                            display: "flex",
                            gap: 12,
                            fontSize: 15,
                            lineHeight: 1.55,
                            color: "var(--v2-ink-muted)",
                          }}
                        >
                          <span
                            aria-hidden
                            style={{
                              flexShrink: 0,
                              width: 6,
                              height: 6,
                              borderRadius: 999,
                              background: "var(--v2-cyan)",
                              marginTop: 8,
                            }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Optional product clip for this stage. Full width of the
                        detail column so it sits in the same proportion as the
                        text body above it; the aspect-ratio drives the height.
                        Capped in vh so it still can't overflow a short screen. */}
                    {s.videoSrc && (
                      <div
                        style={{
                          marginTop: "clamp(16px, 2.5vh, 28px)",
                          width: "100%",
                          maxHeight: "42vh",
                          borderRadius: 10,
                          overflow: "hidden",
                          border: "1px solid var(--v2-rule)",
                          boxShadow:
                            "0 16px 40px rgba(14, 26, 36, 0.14), 0 4px 12px rgba(14, 26, 36, 0.06)",
                          background: "#fff",
                          aspectRatio: "16 / 9",
                        }}
                      >
                        {/* Only mount + autoplay the video while its stage is
                            active, so off-screen stages don't decode video. */}
                        {isActive && (
                          <video
                            src={s.videoSrc}
                            poster={s.poster}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "block",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wiggly timeline — positioned independently, vertically centred in
            the sticky viewport and pinned to the right. Decoupled from the
            title/text flow so it never crops and stays balanced. Hidden on
            mobile via CSS. */}
        <div
          className="v3-hiw-timeline"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "clamp(24px, 6vw, 120px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Timeline active={active} />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          /* Drop the wiggly line entirely on small screens — the stepper
             reads fine as plain stacked stages without it. */
          .v3-hiw-timeline {
            display: none !important;
          }
          .v3-hiw-detail {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Wiggly self-drawing timeline ───────────────────────────────────── */

function Timeline({ active }: { active: number }) {
  // SVG viewBox is 200 wide x 560 tall. The path snakes left/right between
  // four node anchors. Node Y positions are evenly spaced.
  const W = 200;
  const H = 560;
  const nodeYs = [60, 220, 360, 500];
  const nodeXs = [150, 60, 150, 60]; // alternating left/right for the wiggle

  // Build a smooth wiggly path through the nodes with cubic curves. We also
  // build each segment's own sub-path so we can measure the exact arc length
  // up to each node — that lets the cyan line SNAP precisely to the active
  // node instead of tracking raw scroll (which looked half-drawn).
  const segs: string[] = [];
  const fullPath = (() => {
    let d = `M ${nodeXs[0]} ${nodeYs[0]}`;
    for (let i = 1; i < nodeYs.length; i++) {
      const x0 = nodeXs[i - 1];
      const y0 = nodeYs[i - 1];
      const x1 = nodeXs[i];
      const y1 = nodeYs[i];
      const midY = (y0 + y1) / 2;
      const c = ` C ${x0} ${midY}, ${x1} ${midY}, ${x1} ${y1}`;
      d += c;
      segs.push(`M ${x0} ${y0}${c}`);
    }
    return d;
  })();

  const pathRef = useRef<SVGPathElement | null>(null);
  const [len, setLen] = useState(0);
  // Cumulative arc length up to each node index (node 0 = 0).
  const [nodeLens, setNodeLens] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (!pathRef.current) return;
    setLen(pathRef.current.getTotalLength());

    // Measure each segment by creating a throwaway path element.
    if (typeof document !== "undefined") {
      const svgNS = "http://www.w3.org/2000/svg";
      const cum: number[] = [0];
      let acc = 0;
      for (const seg of segs) {
        const p = document.createElementNS(svgNS, "path");
        p.setAttribute("d", seg);
        acc += p.getTotalLength();
        cum.push(acc);
      }
      setNodeLens(cum);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Snap the drawn length to the ACTIVE node's position on the path.
  const drawn = nodeLens[Math.min(active, nodeLens.length - 1)] || 0;
  const path = fullPath;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Size the timeline by HEIGHT, capped to the available viewport so all
          four nodes always fit. The viewBox keeps everything proportional, so
          width follows the aspect ratio and the line never crops. */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          display: "block",
          overflow: "visible",
          // Prefer the full 650px, scaling down on shorter viewports so all
          // four nodes always stay visible (never cropped).
          height: "min(650px, 78vh)",
          width: "auto",
          maxWidth: "100%",
        }}
        aria-hidden
      >
        {/* Base muted track */}
        <path
          d={path}
          fill="none"
          stroke="var(--v2-rule)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* Cyan drawn-in progress */}
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="var(--v2-cyan-deep)"
          strokeWidth={3}
          strokeLinecap="round"
          style={{
            strokeDasharray: len,
            strokeDashoffset: len - drawn,
            // Eased so the line glides node-to-node when the stage snaps.
            transition: "stroke-dashoffset 550ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Nodes */}
        {nodeYs.map((y, i) => {
          const reached = i <= active;
          return (
            <g key={i}>
              <circle
                cx={nodeXs[i]}
                cy={y}
                r={reached ? 16 : 13}
                fill={reached ? "var(--v2-cyan-deep)" : "var(--v2-paper)"}
                stroke={reached ? "var(--v2-cyan-deep)" : "var(--v2-rule)"}
                strokeWidth={reached ? 0 : 2}
                style={{ transition: "all 300ms cubic-bezier(0.2,0.7,0.2,1)" }}
              />
              <text
                x={nodeXs[i]}
                y={y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--v2-font-mono)"
                fontSize={12}
                fontWeight={700}
                fill={reached ? "var(--v2-paper)" : "var(--v2-ink-muted)"}
              >
                {STAGES[i].n}
              </text>
              {/* Stage label beside the node — styled like the big serif
                  title on the left so the changing stage is obvious on scroll.
                  The currently-active stage is enlarged + cyan; passed stages
                  are ink; upcoming stages are muted. */}
              <text
                x={nodeXs[i] === 150 ? nodeXs[i] - 30 : nodeXs[i] + 30}
                y={y + 1}
                textAnchor={nodeXs[i] === 150 ? "end" : "start"}
                dominantBaseline="central"
                fontFamily="var(--v2-font-display)"
                fontWeight={400}
                fill={
                  i === active
                    ? "var(--v2-cyan-deep)"
                    : reached
                    ? "var(--v2-ink)"
                    : "var(--v2-ink-muted)"
                }
                style={{
                  fontSize: i === active ? 34 : 26,
                  fontStyle: i === active ? "italic" : "normal",
                  letterSpacing: "-0.015em",
                  transition:
                    "fill 320ms ease, font-size 320ms cubic-bezier(0.2,0.7,0.2,1)",
                }}
              >
                {STAGES[i].title}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
