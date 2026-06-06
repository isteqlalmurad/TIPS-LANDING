// app/legal/sub-processors.ts
//
// Single source of truth for the list of sub-processors SimPatient
// engages. This list is referenced in three places that must never
// drift apart:
//
//   1. Privacy Policy section 7.1   (app/legal/content.ts)
//   2. DPA Annex 3                   (app/legal/content.ts)
//   3. The standalone /sub-processors page (app/sub-processors/page.tsx)
//
// The two legal documents render their table rows from SUB_PROCESSORS
// via helpers below, and the standalone page renders the same data
// directly. Add or replace a provider here and all three update
// together, which is exactly what the docs promise ("an up-to-date
// list is maintained at simpatient.co.uk/sub-processors").
//
// NOTE ON VISIBILITY: the /sub-processors page is intentionally a
// standalone route, NOT a LegalDoc entry. That keeps it out of the
// sidebar's Legal group and out of the "Related documents" cross-nav
// on the /legal/* pages. It is reachable only by direct URL or by the
// inline links inside the Privacy Policy and DPA text.

export interface SubProcessor {
  // Provider name as it should appear in the table.
  name: string;
  // What they do for us.
  role: string;
  // The categories of personal data they touch.
  data: string;
  // Processing region.
  region: string;
}

// The notice period (in days) we commit to before adding or replacing
// a sub-processor that handles personal data. Cited in both the
// Privacy Policy and the DPA, so it lives here to stay consistent.
export const SUB_PROCESSOR_NOTICE_DAYS = 90;

export const SUB_PROCESSORS: SubProcessor[] = [
  {
    name: "Google LLC / Google Cloud (Firebase / Firestore)",
    role: "Primary database, authentication, file storage",
    data: "All personal data",
    region: "europe-west2 (London, UK)",
  },
  {
    name: "OpenAI",
    role: "Large language model responses, speech-to-text (Whisper)",
    data: "Chat transcripts, audio transcripts",
    region: "EU region",
  },
  {
    name: "ElevenLabs",
    role: "Text-to-speech, conversational AI agent for audio mode",
    data: "Audio data, conversation identifiers",
    region: "EU region",
  },
  {
    name: "Anam.ai",
    role: "Real-time video avatar rendering",
    data: "Persona IDs, video session data",
    region: "EU region",
  },
  {
    name: "Resend",
    role: "Transactional email delivery",
    data: "Name, email address, email content",
    region: "EU region",
  },
  {
    name: "Userback",
    role: "Optional in-app feedback widget (consent-based)",
    data: "User metadata, screenshots you submit",
    region: "EU region",
  },
  {
    name: "Vercel",
    role: "Application hosting and edge network",
    data: "Data in transit",
    region: "EU region",
  },
];

// Render the sub-processor list as a LegalBlock-compatible table
// (headers + rows of bold-name first column) for embedding inside the
// Privacy Policy and DPA. The provider name is wrapped in ** so the
// legal renderer bolds it, matching the surrounding tables.
export function subProcessorTableRows(): string[][] {
  return SUB_PROCESSORS.map((sp) => [
    `**${sp.name}**`,
    sp.role,
    sp.data,
    sp.region,
  ]);
}
