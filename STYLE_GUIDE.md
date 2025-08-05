# TIPS AI Style Guide

## Overview

This style guide defines the design standards, code conventions, and visual language for the TIPS AI landing page. It ensures consistency across all development work and maintains the integrity of the **Contextual Immersion Design** philosophy.

---

## Design Philosophy

### Core Principle: Contextual Immersion Design
> "Create a continuous narrative flow that progressively draws users deeper into the experience"

**Key Tenets:**
- Narrative flow over traditional sections
- Atmospheric progression over hard boundaries
- Contextual immersion over surface-level engagement
- Organic sectioning over rigid grid systems

---

## Color System

### Atmospheric Color Psychology
Our color system creates an emotional journey through progressive temperature shifts.

```css
/* Primary Atmospheric Progression */
--color-deep-space: #0a0a1a;        /* Darkest foundation */
--color-cosmic-navy: #1a1b3a;       /* Cool beginning */
--color-stellar-purple: #2d2f5f;    /* Warming transition */
--color-nebula-violet: #4a4d7c;     /* Mid-journey */
--color-aurora-lavender: #6b6f9d;   /* Approaching warmth */
--color-celestial-blue: #8b8fb5;    /* Light emergence */
--color-moonlight-silver: #c4c7e0;  /* Near-light */
--color-starlight-white: #ffffff;   /* Pure light */
```

### Accent Colors
```css
/* Organic Sphere Gradients */
--color-gradient-warm-start: #ff6b6b;   /* Coral */
--color-gradient-warm-mid: #4ecdc4;     /* Teal */
--color-gradient-warm-end: #45b7d1;     /* Sky blue */
--color-gradient-cool-start: #667eea;   /* Periwinkle */
--color-gradient-cool-end: #764ba2;     /* Purple */
```

### Usage Guidelines
- **Deep Space**: Primary background, foundational darkness
- **Cosmic Navy**: Hero section background
- **Stellar Purple**: Mid-section transitions
- **Nebula Violet**: Content backgrounds
- **Aurora Lavender**: Light content areas
- **Celestial Blue**: Secondary text color
- **Moonlight Silver**: Primary text color
- **Starlight White**: Headlines and CTAs

---

## Typography System

### Gravitational Typography Hierarchy
Creates extreme scale contrast to establish clear visual weight and importance.

#### Font Families
```css
/* Headlines - Serif for Authority */
font-family: Georgia, 'Times New Roman', serif;

/* Body Text - Sans-serif for Readability */  
font-family: var(--font-inter), system-ui, sans-serif;
```

#### Scale System
```css
--text-micro: 12px;   /* Fine print, captions */
--text-xs: 14px;      /* Small labels */
--text-sm: 16px;      /* Secondary text */
--text-base: 18px;    /* Primary body text */
--text-lg: 24px;      /* Large body text */
--text-xl: 32px;      /* Small headlines */
--text-2xl: 48px;     /* Medium headlines */
--text-3xl: 64px;     /* Large headlines */
--text-4xl: 80px;     /* Display headlines */
--text-5xl: 96px;     /* Hero headlines */
```

#### CSS Classes
```css
/* Primary Headlines */
.gravity-headline {
  font-size: clamp(var(--text-3xl), 8vw, var(--text-5xl));
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-family: Georgia, 'Times New Roman', serif;
}

/* Secondary Headlines */
.gravity-subheadline {
  font-size: clamp(var(--text-xl), 4vw, var(--text-2xl));
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.01em;
  font-family: Georgia, 'Times New Roman', serif;
}

/* Body Text */
.atmospheric-text {
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-moonlight-silver);
}

/* Large Body Text */
.atmospheric-text-large {
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-celestial-blue);
}
```

---

## Spacing System

### 8px Base Unit System
All spacing follows multiples of 8px for perfect pixel alignment and visual rhythm.

```css
--space-micro: 4px;    /* 0.25rem - Tight spacing */
--space-xs: 8px;       /* 0.5rem  - Minimal gap */
--space-sm: 16px;      /* 1rem    - Small spacing */
--space-md: 32px;      /* 2rem    - Medium spacing */
--space-lg: 64px;      /* 4rem    - Large spacing */
--space-xl: 96px;      /* 6rem    - XL spacing */
--space-2xl: 128px;    /* 8rem    - 2XL spacing */
--space-3xl: 160px;    /* 10rem   - 3XL spacing */
--space-4xl: 192px;    /* 12rem   - 4XL spacing */
```

### Usage Guidelines
- **micro/xs**: Icon spacing, small gaps
- **sm**: Card padding, button spacing  
- **md**: Content padding, form fields
- **lg**: Section spacing, component gaps
- **xl+**: Major section breaks, narrative transitions

---

## Layout System

### CSS Grid Foundation
```css
.page-canvas {
  display: grid;
  grid-template-columns: 
    [full-start] minmax(var(--space-xl), 1fr) 
    [content-start] minmax(0, 1200px) 
    [content-end] minmax(var(--space-xl), 1fr) 
    [full-end];
  gap: 0;
}

/* Grid Areas */
.full-width { grid-column: full; }
.content-width { 
  grid-column: content;
  padding-left: var(--space-md);
  padding-right: var(--space-md);
}
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
/* Base styles: 320px+ */

@media (max-width: 768px) {
  /* Tablet adjustments */
  :root {
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 64px;
  }
}

@media (min-width: 769px) {
  /* Desktop styles */
}

@media (min-width: 1200px) {
  /* Large desktop */
}
```

---

## Component Standards

### Organic Spheres
Decorative elements that add visual interest without disrupting content flow.

```tsx
const OrganicSphere = ({ size, position, gradient, delay = 0 }: {
  size: string;
  position: React.CSSProperties;
  gradient: string;
  delay?: number;
}) => (
  <motion.div
    className={`organic-sphere ${gradient} opacity-30`}
    style={{ width: size, height: size, ...position }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 0.6 }}
    transition={{ 
      duration: 2, 
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
  />
);
```

**Usage Guidelines:**
- Maximum 2-3 per section
- Vary sizes: 200px, 300px, 400px
- Use both warm and cool gradients
- Position off-screen edges for organic flow
- Stagger animation delays

### Screenshots & Media
```css
.screenshot-container {
  margin-left: var(--space-lg);
  margin-right: var(--space-lg);
}

/* Standard styling */
.screenshot-container .relative {
  border-radius: 24px; /* rounded-3xl */
  overflow: hidden;
  border: 1px solid #374151; /* border-gray-700 */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
}
```

### Buttons
```tsx
/* Primary CTA */
<Button
  size="lg"
  className="bg-white text-black hover:bg-gray-100 motion-natural px-8 py-6 rounded-full font-medium"
>
  Action Text
</Button>

/* Secondary/Ghost */
<Button
  size="lg"
  variant="ghost"
  className="text-white hover:bg-white/10 motion-natural px-8 py-6 rounded-full"
>
  Secondary Action
</Button>
```

---

## Animation Standards

### Motion Design Principles
- **Natural easing curves** over linear transitions
- **Staggered animations** for grouped elements
- **Viewport-triggered** animations with `once: true`
- **Performance-first** - prefer transforms over layout changes

### Easing Functions
```css
--ease-natural: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-entrance: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-exit: cubic-bezier(0.55, 0.055, 0.675, 0.19);
```

### Common Patterns
```tsx
/* Fade In Up */
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2 },
  viewport: { once: true }
};

/* Scale In */
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 1.2, delay: 0.4 },
  viewport: { once: true }
};

/* Stagger Children */
const stagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};
```

---

## Code Conventions

### File Organization
```
src/app/
├── globals.css          # Design system & global styles
├── page.tsx            # Main landing page
├── layout.tsx          # Root layout
├── providers.tsx       # Context providers
├── about/page.tsx      # About page
└── academic/page.tsx   # Academic page

public/
├── shots/              # Product screenshots
├── profiles/           # Team member photos
└── [other assets]
```

### Component Structure
```tsx
'use client';

// Imports
import { Component } from 'library';
import { motion } from 'framer-motion';

// Types (if needed)
interface ComponentProps {
  // props
}

// Component
export default function ComponentName({ props }: ComponentProps) {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  };

  return (
    <motion.div
      className="semantic-class-name"
      variants={fadeIn}
      initial="initial"
      animate="animate"
    >
      {/* Content */}
    </motion.div>
  );
}
```

### CSS Class Naming
- Use **semantic names** over visual descriptions
- Follow **atmospheric** theme: `atmospheric-text`, `gravity-headline`
- Use **BEM-like** structure for components: `component-element--modifier`
- Prefer **utility classes** for one-off styling

### TypeScript Standards
- Always use TypeScript for new components
- Define proper interfaces for props
- Use strict type checking
- Document complex types with comments

---

## Content Guidelines

### Writing Style
- **Concise and direct** - avoid marketing fluff
- **Professional medical tone** - appropriate for healthcare audience
- **Action-oriented** - focus on capabilities and outcomes
- **Evidence-based** - reference research and statistics

### Image Standards
- **High resolution** - minimum 1200px width for screenshots
- **Consistent aspect ratios** - 16:9 for videos, 4:3 for interfaces
- **Professional photography** - for team members
- **Optimized file sizes** - use Next.js Image optimization

### Content Hierarchy
1. **Hero message** - Core value proposition
2. **Video demonstration** - Show, don't tell
3. **Capability details** - How it works
4. **Authority signals** - Trust and credibility
5. **Personal connection** - Call to action

---

## Atmospheric Background System

### 5-Act Structure
```css
/* Act I: Intrigue */
.act-intrigue {
  background: linear-gradient(180deg, 
    var(--color-deep-space) 0%, 
    var(--color-cosmic-navy) 100%
  );
}

/* Act II: Demonstration */
.act-demonstration {
  background: linear-gradient(180deg, 
    var(--color-cosmic-navy) 0%, 
    var(--color-stellar-purple) 100%
  );
}

/* Act III: Understanding */
.act-understanding {
  background: linear-gradient(180deg, 
    var(--color-stellar-purple) 0%, 
    var(--color-nebula-violet) 100%
  );
}

/* Act IV: Authority */
.act-authority {
  background: linear-gradient(180deg, 
    var(--color-nebula-violet) 0%, 
    var(--color-aurora-lavender) 100%
  );
}

/* Act V: Intimacy */
.act-intimacy {
  background: linear-gradient(180deg, 
    var(--color-aurora-lavender) 0%, 
    var(--color-celestial-blue) 100%
  );
}
```

### Critical Rules
⚠️ **NEVER break the atmospheric progression**
- Each Act must flow seamlessly into the next
- No standalone sections that interrupt the gradient flow
- Test scroll behavior after any changes
- Maintain color continuity at all Act boundaries

---

## Performance Guidelines

### Optimization Standards
- **Next.js Image** for all images with proper sizing
- **Lazy loading** for below-fold content
- **CSS custom properties** over hardcoded values
- **Efficient animations** - prefer transforms over layout changes
- **Minimal bundle size** - tree-shake unused dependencies

### Loading Strategy
- **Priority loading** for hero images
- **Viewport-triggered** animations to reduce initial load
- **Progressive enhancement** - core content loads first
- **Responsive images** with multiple sizes

---

## Accessibility Standards

### Requirements
- **Semantic HTML** structure (h1 → h2 → h3)
- **Alt text** for all images and media
- **Keyboard navigation** support
- **Color contrast** compliance (WCAG AA)
- **Reduced motion** support via `prefers-reduced-motion`
- **Screen reader** compatibility

### Implementation
```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Testing Checklist

### Visual Testing
- [ ] All viewports (mobile, tablet, desktop)
- [ ] Background gradient continuity
- [ ] Animation timing and smoothness
- [ ] Image loading and optimization
- [ ] Typography scaling

### Functional Testing
- [ ] Navigation links work
- [ ] External links open in new tabs
- [ ] Video playback functions
- [ ] Form submissions (if any)
- [ ] Performance metrics

### Cross-browser Testing
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## Deployment Standards

### Build Process
```bash
npm run build    # Production build
npm run lint     # Code quality check
npm run test     # Run tests (if any)
```

### Environment Variables
```env
# Add any required environment variables
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### SEO Requirements
- Proper meta tags
- Open Graph images
- Structured data
- Sitemap generation

---

## Maintenance Notes

### Regular Tasks
- **Update dependencies** monthly
- **Performance monitoring** via Core Web Vitals
- **Content freshness** - update statistics and information
- **Image optimization** - compress new assets
- **Accessibility audits** quarterly

### Documentation Updates
- Update this style guide when patterns change
- Document new components in CLAUDE.md
- Version control design decisions
- Maintain component library documentation

---

## Quick Reference

### Most Used Classes
```css
.gravity-headline          /* Main headlines */
.gravity-subheadline       /* Secondary headlines */
.atmospheric-text          /* Body text */
.atmospheric-text-large    /* Large body text */
.motion-natural           /* Smooth transitions */
.screenshot-container     /* Media containers */
.narrative-section        /* Act sections */
```

### Common Spacing
```css
mb-8     /* 32px bottom margin */
mb-12    /* 48px bottom margin */
mb-16    /* 64px bottom margin */
mb-32    /* 128px bottom margin */
px-8     /* 32px horizontal padding */
py-6     /* 24px vertical padding */
```

### Animation Delays
- Hero elements: 1.0s, 1.2s, 1.8s
- Content blocks: 0.2s, 0.4s, 0.6s
- Staggered items: 0.2s increments

---

*Last updated: [Current Date]*
*Version: 1.0*