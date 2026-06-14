# SimPatient — Design System & Brand Guidelines

> **Single source of truth** for all SimPatient visual design: the landing site, future pages, slide decks, PowerPoints, email templates, PDFs, social assets, and any other branded material.
>
> When in doubt, match the **landing page** (`simpatient.co.uk`). It is the canonical expression of the brand. The values below are extracted directly from the live site's design tokens (`src/app/globals.css`, the `.v2-page` system).

---

## 1. Design Philosophy

SimPatient is **AI-simulated clinical communication training, built inside a medical school**. The design must feel:

- **Editorial & institutional** — like a serious academic publication or a research-led institution, not a flashy SaaS startup. Think *university press meets modern product*.
- **Calm and confident** — generous whitespace, restrained colour, no visual noise. The credibility comes from the research; the design should get out of the way and let it speak.
- **Warm, not clinical** — a warm off-white "paper" background instead of stark white or cold blues. Approachable and human.
- **Precise** — hairline rules, tight letter-spacing on headlines, monospaced captions for data/citations. Details signal rigour.

### Core principles

1. **Paper, ink, and one accent.** The palette is essentially a warm paper background, near-black ink, and a single cyan accent. Resist adding more colours.
2. **Serif for gravitas, sans for clarity.** Display headlines are serif (authority); body and UI are sans-serif (readability); captions/data are monospace (precision).
3. **Hairlines over boxes.** Separate content with thin 1px rules and whitespace rhythm, not heavy borders or drop-shadowed cards.
4. **Whitespace is a feature.** Sections breathe with large vertical padding. Never crowd.
5. **Restraint with motion.** Subtle, natural easing. Content fades/rises gently into view; nothing bounces or spins.

---

## 2. Colour Palette

### 2.1 Primary palette (light / "paper" surfaces) — DEFAULT

This is the dominant scheme for almost everything.

| Token | Hex | Role |
|---|---|---|
| `--v2-paper` | `#FAF8F4` | **Primary background.** Warm off-white. The default canvas. |
| `--v2-paper-deep` | `#F3F0E8` | Secondary/alternate section background. Slightly deeper warm tone for visual rhythm between sections. |
| `--v2-ink` | `#0E1A24` | **Primary text & near-black.** Headlines, body, primary buttons. Almost-black with a cool undertone. |
| `--v2-ink-muted` | `#4A5664` | Secondary text, captions, sub-labels, supporting copy. |
| `--v2-ink-faint` | `#8A93A0` | Tertiary text, metadata, the faintest labels. |
| `--v2-rule` | `#E5E1D8` | Hairline borders, dividers, table lines. |
| `--v2-rule-soft` | `#EFEBE2` | Even softer divider (e.g. alternating table rows). |

### 2.2 Accent — cyan

| Token | Hex | Role |
|---|---|---|
| `--v2-cyan` | `#0891B2` | Accent on light surfaces — progress bars, callout left-borders, interactive highlights. |
| `--v2-cyan-deep` | `#075A75` | **Primary accent for text/links** on light backgrounds (italic emphasis in headlines, links, "Read in…" CTAs). Higher contrast = accessible. |
| `--v2-cyan-wash` | `#EDF8FB` | Very light cyan tint — callout backgrounds, screenshot plates. |
| `#22D3EE` | `#22D3EE` | **Bright cyan accent for DARK backgrounds only** (e.g. the dark hero). Do not use on light surfaces — too low-contrast. |

### 2.3 Highlight

| Token | Hex | Role |
|---|---|---|
| `--v2-marker` | `#F5C518` | Highlighter yellow. Use *very sparingly* for a "marker pen" emphasis. Not a general accent. |

### 2.4 Dark surfaces (hero, footers-on-ink)

When a surface is dark, the background is `--v2-ink` (`#0E1A24`). On it:
- Text: white at varying opacity — `rgba(255,255,255,0.92)` (primary), `0.7` (secondary), `0.5` (faint).
- Accent: bright cyan `#22D3EE`.
- Borders: `rgba(255,255,255,0.12–0.35)`.

---

## 3. Typography

### 3.1 Type families

| Role | Font | Fallback stack | Notes |
|---|---|---|---|
| **Display / headings** | **Source Serif 4** | `Georgia, serif` | Serif. Conveys authority and editorial gravitas. Weight **400** (regular) even at large sizes — never bold the serif. |
| **Body / UI** | **Inter** | `system-ui, sans-serif` | Clean, neutral, highly legible. The workhorse. |
| **Captions / data / citations** | **JetBrains Mono** | `ui-monospace, monospace` | Monospace. Used for eyebrows of data, DOIs, timestamps, "FOUNDER NOTE"-style labels, stats sub-text. Signals precision. |
| Arabic (geo-personalised) | Noto Sans Arabic | — | Only for Arabic-localised content. |

> For decks/PowerPoint/email where Source Serif or Inter aren't installed: substitute **Georgia** (serif headings) and **Arial / Helvetica / system sans** (body). Email already uses `Georgia` for headings and an `Inter, -apple-system, …` stack for body.

### 3.2 Type scale (fluid, from the site)

| Token | Size | Use |
|---|---|---|
| `--v2-text-display-xl` | `clamp(48px, 7vw, 88px)` | Hero headline |
| `--v2-text-display-lg` | `clamp(36px, 5vw, 60px)` | Section headlines (h2) |
| `--v2-text-display-md` | `clamp(26px, 3vw, 36px)` | Sub-headlines (h3) |
| `--v2-text-body-lg` | `20px` | Lead paragraphs, intros |
| `--v2-text-body` | `17px` | Default body |
| `--v2-text-small` | `14px` | Small print, secondary UI |
| `--v2-text-caption` | `12px` | Eyebrows, captions, mono labels |

### 3.3 Typographic rules

- **Headlines:** serif, weight 400, `letter-spacing: -0.02em`, `line-height: ~1.08–1.15`. Tight and elegant.
- **Italic accent in headlines:** a common signature move — set a clause in *italic* and colour it `--v2-cyan-deep`. e.g. "AI-simulated communication training, *at scale.*"
- **Body:** Inter, `line-height: 1.55–1.7`, colour `--v2-ink`; secondary copy `--v2-ink-muted`.
- **Eyebrow label** (the small uppercase label above headings): Inter, `12px`, weight 500, `letter-spacing: 0.18em`, `text-transform: uppercase`, colour `--v2-ink-muted`. Example: `THE PREMISE`, `OUR STORY`, `RESEARCH & EVIDENCE`.
- **Captions/data:** JetBrains Mono, `12px`, `letter-spacing: 0.02–0.06em`, often uppercased for labels.
- Enable ligatures/kerning where possible (`font-feature-settings: "kern", "ss01", "cv11"`).
- **No em dashes (—) in customer-facing copy.** House style: use full stops, commas, or colons instead. (Applies to web copy, emails, decks.)

---

## 4. Spacing & Layout

### 4.1 Spacing tokens

| Token | Value | Use |
|---|---|---|
| `--v2-space-section` | `clamp(96px, 12vw, 160px)` | Vertical padding between major sections. Generous. |
| `--v2-space-block` | `clamp(48px, 6vw, 80px)` | Tighter block spacing within a section. |
| `--v2-content-max` | `1200px` | Max width of the content container. |
| `--v2-prose-max` | `680px` | Max width for readable prose columns. |

Common inline spacing values seen in components: `8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56` px. Stick to this rhythm.

### 4.2 Layout patterns

- **Container:** centered, `max-width: 1200px`, horizontal padding `24px` (mobile) → `40px` (≥768px).
- **Prose:** constrain long text to ~`680px` for readability.
- **Section structure:** `eyebrow label` → `serif headline` (often with italic cyan accent) → `lead paragraph` → content.
- **Grids:** use `repeat(auto-fit, minmax(min(100%, 260px), 1fr))` for card grids so they collapse responsively (1 col mobile → 2 → 3+). Avoid fixed `repeat(N, 1fr)` without a mobile fallback.
- **Alternate section backgrounds** between `--v2-paper` and `--v2-paper-deep` for rhythm; separate with a top `1px solid var(--v2-rule)`.

### 4.3 Responsive

- Mobile-first; primary breakpoints at **768px** and **900–980px**.
- Multi-column grids collapse to 1–2 columns on mobile.
- Always prevent horizontal overflow (test at 375px width).

---

## 5. Components & Patterns

### 5.1 Buttons

| Variant | Style |
|---|---|
| **Primary** | Background `--v2-ink`, text `--v2-paper`. Hover → background `--v2-cyan-deep`. |
| **Secondary** | Transparent background, text `--v2-ink`, `1px` border `--v2-rule`. Hover → border `--v2-ink`. |
| Shared | Height `48px`, padding `0 22px`, `border-radius: 4px` (small, crisp — not pill), Inter 15px weight 500, `letter-spacing: 0.01em`. |
| On dark hero | Primary = solid white bg / dark text; secondary = transparent with `1px solid rgba(255,255,255,0.35)` border, white text. |

Transition: `all 200ms cubic-bezier(0.2, 0.7, 0.2, 1)`.

### 5.2 Cards

- **Flat and editorial.** Background `--v2-paper` (or `--v2-paper-deep`), `1px solid var(--v2-rule)`, `border-radius: 6px`.
- Hover (where interactive): border → `--v2-ink`, subtle `translateY(-2px)`.
- Keep cards crisp: small radii (`6px`) and hairline borders. Avoid heavy drop shadows and large rounded corners.

### 5.3 Hairline rules

Thin `1px solid var(--v2-rule)` dividers. The primary way to separate content. Use top-borders on sections and under headers.

### 5.4 Screenshot / media plates

For embedded screenshots: `--v2-cyan-wash` background, `1px solid var(--v2-rule)` border, `6px` radius, `12px` padding, inner media `3px` radius. (Exception: full-bleed hero/founder video is intentionally borderless for an expansive feel.)

### 5.5 Eyebrow + headline block

The signature section opener:
```
EYEBROW LABEL              (mono/Inter, 12px, uppercase, 0.18em tracking, ink-muted)
Serif headline, with an    (Source Serif, 400, tight tracking)
  italic cyan accent.       (italic, --v2-cyan-deep)
Lead paragraph in muted ink. (Inter, 20px, ink-muted)
```

### 5.6 Stats / data tiles

Large serif number (`~40px`, often `#22D3EE` on dark or `--v2-ink` on light) + bold label (Inter 14px) + mono/muted sub-line.

### 5.7 Imagery

- **Photography:** desaturated / grayscale with slight contrast reduction (`filter: grayscale(1) contrast(0.95)`), often presented in rounded-square (`6px`) frames. Keeps team/portrait imagery cohesive and serious.
- **Avatars:** circular, e.g. 48–56px.

---

## 6. Motion

- **Easing:** `cubic-bezier(0.2, 0.7, 0.2, 1)` (custom natural) or simple `ease`. Duration `200ms` for UI, `~700ms` for content reveals.
- **Reveal pattern:** content fades in + rises slightly (`opacity 0→1`, `y: 12–16px → 0`), triggered when entering the viewport, **once** (no re-trigger on scroll back).
- Stagger sibling items by ~`0.1s`.
- Keep it subtle. No bounce, no spin, no parallax gimmicks.

---

## 7. Voice & Tone (copy)

- **Confident, plain, evidence-led.** Let the research and numbers carry weight; avoid hype adjectives.
- **British English** spelling (e.g. "personalise", "programme", "behaviour").
- **Personal where it counts** — e.g. transactional emails are signed personally by the founder, in first person ("I will get back to you…").
- **No em dashes** in customer-facing copy (house style).
- Cite specifics: DOIs, P-values, institution names, real figures. Specificity = credibility.

---

## 8. Application Guides

### 8.1 Email templates

- Background `#FAF8F4` (paper), text `#0E1A24` (ink), muted `#4A5664`.
- Heading in `Georgia` serif; body in `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.
- Use **table-based layouts** for any side-by-side elements (logo lockups, avatar + signature) — flexbox fails in Outlook.
- Images need **absolute `https://` URLs** (e.g. Firebase Storage) — relative paths and Next's image optimizer don't work in email. Always include `alt` text and design so the email reads fine with images blocked.
- Prefer **PNG/JPG** over WebP for images (Outlook desktop doesn't render WebP).
- Logo lockup: small icon (~40px) + "SimPatient" wordmark (Inter, ~22px, weight 600), 12px gap.

### 8.2 Slides / PowerPoint / Keynote

- Background: `#FAF8F4` paper (or `#0E1A24` ink for dramatic dark slides).
- Title font: Georgia/serif, regular weight, tight tracking. Body: Arial/Inter.
- One cyan accent (`#075A75` on light, `#22D3EE` on dark). Near-black text.
- Lots of whitespace; one idea per slide; hairline rules to divide.
- Mono font for data callouts/stats and citations.

### 8.3 New web pages

- Wrap in the `.v2-page` system (inherit all tokens). Use `.v2-container`, `.v2-section`, `.v2-eyebrow`, `.v2-btn-*` helpers from `globals.css`.
- Include the shared `NavBarV3` and `SiteFooter` so the page feels part of the site.
- Match section rhythm: eyebrow → serif headline → lead → content, alternating paper / paper-deep backgrounds.

---

## 9. Quick Reference (copy-paste tokens)

```css
/* Colour */
--paper:        #FAF8F4;   /* primary background */
--paper-deep:   #F3F0E8;   /* alt section background */
--ink:          #0E1A24;   /* primary text / near-black */
--ink-muted:    #4A5664;   /* secondary text */
--ink-faint:    #8A93A0;   /* tertiary text */
--rule:         #E5E1D8;   /* hairline borders */
--rule-soft:    #EFEBE2;   /* softer divider */
--cyan:         #0891B2;   /* accent (light bg) */
--cyan-deep:    #075A75;   /* link/emphasis text (light bg) */
--cyan-wash:    #EDF8FB;   /* tint */
--cyan-bright:  #22D3EE;   /* accent on DARK bg only */
--marker:       #F5C518;   /* sparing highlight */

/* Type */
display:  "Source Serif 4", Georgia, serif;      /* weight 400 */
body:     "Inter", system-ui, sans-serif;
mono:     "JetBrains Mono", ui-monospace, monospace;

/* Radius */
button / media-inner: 3–4px
cards / plates:       6px

/* Motion */
ease:     cubic-bezier(0.2, 0.7, 0.2, 1);
ui:       200ms;   reveal: ~700ms;
```

---

*Source of truth in code: `src/app/globals.css` (`.v2-page` block) and `src/app/layout.tsx` (font definitions). If this document and the code ever diverge, the code wins — and this file should be updated to match.*
