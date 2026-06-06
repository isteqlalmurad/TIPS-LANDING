// app/legal/cookies.ts
//
// Single source of truth for the cookies and similar technologies the
// SimPatient app uses. Referenced in two places that must stay in
// sync:
//
//   1. Privacy Policy section 11   (app/legal/content.ts)
//   2. The standalone /cookies page (app/cookies/page.tsx)
//
// Both render their table from COOKIES via the helper below.
//
// CLASSIFICATION (2026-06): the app uses essential cookies only. The
// in-app Userback feedback widget is treated as a functional support
// tool, not an analytics/marketing tracker: it loads only for
// authenticated staff/learners, sets no advertising cookies, and is
// part of how we provide and support the Service. There is no
// analytics or ad tracking anywhere in the app, so no consent banner
// is required under PECR today.
//
// WHEN THAT CHANGES: if the marketing site (simpatient.co.uk) or the
// app later adds analytics or ad cookies (Google Analytics, GTM, a
// pixel, etc.), those are non-essential and DO require a consent
// banner with a "Reject" control of equal prominence to "Accept",
// plus a "Consent preferences" cookie to remember the choice. Add
// those rows here, flip their `essential` flag to false, and build the
// banner at that point.

export interface CookieEntry {
  // Cookie name (or family). The renderer bolds this column.
  name: string;
  // Plain-language purpose.
  purpose: string;
  // True = strictly necessary (set without consent under PECR).
  essential: boolean;
  // How long it persists.
  lifespan: string;
}

export const COOKIES: CookieEntry[] = [
  {
    name: "next-auth.session-token (prod: __Secure-next-auth.session-token)",
    purpose: "Keeps you signed in across pages",
    essential: true,
    lifespan: "Up to 30 days",
  },
  {
    name: "superadmin_token",
    purpose: "Authenticates super administrators",
    essential: true,
    lifespan: "Session",
  },
  {
    name: "pendingInviteToken",
    purpose:
      "Carries an invitation through single sign-on so the right role and organisation are applied when you redeem it",
    essential: true,
    lifespan: "Short-lived (cleared once the invite is applied)",
  },
  {
    name: "Userback session",
    purpose:
      "Runs the in-app feedback and bug-report tool for signed-in users (functional support tool, not analytics or advertising)",
    essential: true,
    lifespan: "Session",
  },
];

// Render the cookie list as LegalBlock-compatible table rows for
// embedding in the Privacy Policy. Name is wrapped in ** so the legal
// renderer bolds it, matching the surrounding tables.
export function cookieTableRows(): string[][] {
  return COOKIES.map((c) => [
    `**${c.name}**`,
    c.purpose,
    c.essential ? "Essential" : "Non-essential (consent)",
    c.lifespan,
  ]);
}
