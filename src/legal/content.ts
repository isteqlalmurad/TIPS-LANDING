// app/legal/content.ts
//
// Typed structure for the three legal documents shown under
// /legal/privacy-policy, /legal/terms-of-service, and
// /legal/data-processing-agreement.
//
// The originals are Word documents (see /Users/murad/Downloads/
// SimPatient_*.docx). Their full content has been transcribed here
// so the docs are first-class Next.js routes, not opaque file
// downloads. This means the docs are searchable, deep-linkable,
// indexable, and accessible to screen readers — and crucially we
// don't ship a docx parser to the browser just to render plain
// legal text.
//
// Tables in the originals are encoded as `table` blocks; everything
// else is `p` (paragraph) or `ul` (bulleted list). Inline emphasis
// uses **bold** markers and inline emails / https URLs are
// auto-linkified by the renderer in components/legal/LegalRenderer.
//
// To update copy: edit the strings here, NOT the renderer. The
// renderer is layout-only.

import {
  subProcessorTableRows,
  SUB_PROCESSOR_NOTICE_DAYS,
} from "./sub-processors";
import { cookieTableRows } from "./cookies";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; text: string };

export interface LegalSection {
  // Optional heading for the section. Use level 2 for the numbered
  // top-level headings (e.g. "1. Introduction"), level 3 for the
  // x.y sub-headings (e.g. "4.1 Data you provide directly"). A
  // section without a heading is a continuation of the doc body
  // (used for the intro paragraphs that sit between numbered
  // sections).
  heading?: string;
  level?: 2 | 3;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  // Slug used in the route segment under /legal/[slug].
  slug:
    | "privacy-policy"
    | "terms-of-service"
    | "data-processing-agreement"
    | "cookie-policy";
  // Short label for the sidebar sub-link.
  shortTitle: string;
  // Full title displayed at the top of the doc page.
  title: string;
  // 1-line tagline shown in the sidebar / page subhead.
  tagline: string;
  effectiveDate: string;
  version: string;
  applies?: string;
  // Optional intro paragraph rendered above the first section,
  // outside the numbered structure.
  intro?: string;
  sections: LegalSection[];
  // A free-form contact block rendered inside a tinted callout at
  // the bottom of the doc. Newlines are preserved.
  contactBlock?: string;
}

// ---------------------------------------------------------------------
// Privacy Policy
// ---------------------------------------------------------------------

const privacyPolicy: LegalDoc = {
  slug: "privacy-policy",
  shortTitle: "Privacy Policy",
  title: "Privacy Policy",
  tagline:
    "How we collect, use, and protect your personal information on SimPatient.",
  effectiveDate: "5 June 2026",
  version: "2.1",
  applies: "simpatient.co.uk and app.simpatient.co.uk",
  sections: [
    {
      heading: "1. Introduction",
      level: 2,
      blocks: [
        {
          type: "p",
          text: 'SimPatient ("SimPatient", "we", "us", "our") provides an AI-powered medical training simulation platform that enables learners to practise clinical communication with virtual patients in text, audio, and video modes.',
        },
        {
          type: "p",
          text: "This Privacy Policy explains what personal data we collect, how we use it, who we share it with, how long we keep it, and the rights you have under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
        },
        { type: "p", text: "This policy applies to:" },
        {
          type: "ul",
          items: [
            "Visitors to our marketing website at simpatient.co.uk",
            "Users of our application at app.simpatient.co.uk",
            "Prospective customers, learners (students), organisation administrators, and super administrators",
          ],
        },
        {
          type: "p",
          text: "If you are using SimPatient as part of a university, NHS organisation, or other institution, that institution is the Controller of your personal data for the purposes of the simulation service, and SimPatient acts as a Processor on its behalf. Where you have signed up directly as an individual, SimPatient is the Controller.",
        },
      ],
    },
    {
      heading: "2. Who we are",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "SimPatient is operated by St Andrews Medical Innovations Limited (trading as SimPatient), a company registered in Scotland (SC705314).",
        },
        {
          type: "ul",
          items: [
            "**Registered address:** Walter Bower House, Main Street, Guardbridge, St Andrews, Fife, KY16 0US",
            "**Company number:** SC705314",
            "**ICO registration number:** ZB284261",
            "**Data Protection Officer:** Mr Christopher Milne, Head of Information Assurance and Governance (dataprot@st-andrews.ac.uk)",
            "**Contact:** hello@simpatient.co.uk",
          ],
        },
      ],
    },
    {
      heading: "3. Scope and summary",
      level: 2,
      blocks: [
        { type: "p", text: "At a glance:" },
        {
          type: "ul",
          items: [
            "We store all customer personal data on servers located in the European Union / United Kingdom.",
            "We do not transfer your personal data outside the EU/UK in identifiable form.",
            "Your conversation transcripts and any derived data are never used to train third-party AI models.",
            "SimPatient is designed for simulated clinical scenarios. You must not enter real patient data into the platform.",
            "You can request access, correction, deletion, export, or restriction of your personal data at any time by emailing hello@simpatient.co.uk.",
          ],
        },
      ],
    },
    {
      heading: "4. Personal data we collect",
      level: 2,
      blocks: [],
    },
    {
      heading: "4.1 Data you provide directly",
      level: 3,
      blocks: [
        {
          type: "table",
          headers: ["Category", "Examples", "When collected"],
          rows: [
            [
              "**Account data**",
              "Full name, email address, password (hashed), profile image, user role, organisation membership",
              "Sign-up, profile updates, institutional invitations",
            ],
            [
              "**Authentication data**",
              "Session tokens, multi-factor one-time codes",
              "Login flow",
            ],
            [
              "**Consultation data**",
              "Chat transcripts, audio recordings (where audio mode is used), video session data (where video mode is used)",
              "Your use of the simulation",
            ],
            [
              "**Reflection data**",
              "Free-text reflection answers after each consultation",
              "Reflection step of the case flow",
            ],
            [
              "**Feedback data**",
              "AI-generated feedback on your consultation (strengths, improvements)",
              "Generated by our AI layer",
            ],
            [
              "**Support data**",
              "In-app feedback, bug reports, screenshots you choose to attach",
              "Optional feedback widget",
            ],
            [
              "**Correspondence**",
              "Emails you send us, and our replies",
              "Direct communication",
            ],
          ],
        },
      ],
    },
    {
      heading: "4.2 Data collected automatically",
      level: 3,
      blocks: [
        {
          type: "table",
          headers: ["Category", "Examples", "Notes"],
          rows: [
            [
              "**Device and log data**",
              "IP address, user agent, browser type, timestamps",
              "Cookies and similar technologies",
            ],
            ["See section 11 below", "", ""],
            [
              "**Usage data**",
              "Which cases you open, session duration, credit consumption",
              "",
            ],
            [
              "**Consent records**",
              "Policy version you accepted, timestamp, IP address, user agent (kept as an audit trail)",
              "",
            ],
          ],
        },
      ],
    },
    {
      heading: "4.3 Data we do not collect",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "We do not knowingly collect real patient medical data.",
            "We do not collect payment card data directly. Any future billing will be processed by a PCI-DSS-compliant payment processor.",
            "We do not purchase personal data from data brokers.",
          ],
        },
      ],
    },
    {
      heading: "5. Special category data (Article 9)",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "SimPatient generates synthetic clinical scenarios. Simulated patient personas and the medical content within them are fictional and are not the personal data of any real person.",
        },
        {
          type: "p",
          text: 'Your use of the platform may produce content that resembles health data (because you are practising clinical consultations). Because this content relates to a simulated patient and reflects your own educational performance, we do not treat it as Article 9 "special category" data about a real data subject.',
        },
        {
          type: "callout",
          text: "You are contractually prohibited from entering real patient information, real clinical records, or any identifiable third-party health data into the platform. If you do so inadvertently, contact us immediately at hello@simpatient.co.uk and we will delete it.",
        },
        {
          type: "p",
          text: "We do not rely on the contractual prohibition alone. To reduce the foreseeable risk of real patient data being entered, we apply technical and organisational guardrails, including in-product warnings at the point of input, detection and redaction measures where feasible, and data-protection training for administrators. We assess this risk in our Data Protection Impact Assessment and keep these measures under review.",
        },
      ],
    },
    {
      heading: "6. Why we use your personal data and our legal bases",
      level: 2,
      blocks: [
        {
          type: "table",
          headers: ["Purpose", "Legal basis"],
          rows: [
            [
              "Creating and managing your account; authenticating you; delivering the simulation service",
              "Contract . Art. 6(1)(b)",
            ],
            [
              "Routing consultations through our AI providers to generate responses, voices, and avatars",
              "Contract . Art. 6(1)(b)",
            ],
            [
              "Storing transcripts and feedback so you can review your progress",
              "Contract . Art. 6(1)(b)",
            ],
            [
              "Keeping the platform secure, preventing abuse, enforcing acceptable use",
              "Legitimate interests . Art. 6(1)(f)",
            ],
            [
              "Producing anonymised, aggregated analytics for service improvement",
              "Legitimate interests . Art. 6(1)(f)",
            ],
            [
              "Recording your acceptance of this policy and other consents",
              "Legal obligation . Art. 6(1)(c) / Legitimate interests . Art. 6(1)(f)",
            ],
            [
              "Sending transactional emails (invitations, password resets, verification codes)",
              "Contract . Art. 6(1)(b)",
            ],
            [
              "Sending marketing communications (if you opt in)",
              "Consent . Art. 6(1)(a)",
            ],
            [
              "Non-essential cookies and in-app feedback widgets",
              "Consent . Art. 6(1)(a)",
            ],
            [
              "Complying with legal, regulatory, and tax obligations",
              "Legal obligation . Art. 6(1)(c)",
            ],
            [
              "Establishing, exercising, or defending legal claims",
              "Legitimate interests . Art. 6(1)(f)",
            ],
          ],
        },
        {
          type: "p",
          text: "You can withdraw any consent you have given at any time by emailing hello@simpatient.co.uk or updating your preferences in the app. Withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal.",
        },
      ],
    },
    {
      heading: "7. Who we share your personal data with",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "We share your personal data only with the sub-processors listed below, all of which are contractually bound by Data Processing Agreements and process your data exclusively on EU/UK infrastructure.",
        },
      ],
    },
    {
      heading: "7.1 Sub-processors",
      level: 3,
      blocks: [
        {
          // Rows sourced from app/legal/sub-processors.ts so this
          // table, DPA Annex 3, and the /sub-processors page can never
          // drift apart.
          type: "table",
          headers: ["Provider", "Role", "Data", "Region"],
          rows: subProcessorTableRows(),
        },
        {
          type: "p",
          text: `An up-to-date list of sub-processors is maintained at simpatient.co.uk/sub-processors. We will notify customers at least ${SUB_PROCESSOR_NOTICE_DAYS} days before adding or replacing a sub-processor where they handle personal data. Institutional customers may object in accordance with their Data Processing Agreement.`,
        },
      ],
    },
    {
      heading: "7.2 Other recipients",
      level: 3,
      blocks: [
        { type: "p", text: "We may also share your personal data with:" },
        {
          type: "ul",
          items: [
            "**Professional advisers:** lawyers, accountants, auditors, bound by confidentiality",
            "**Regulators and law enforcement:** where we are legally required to do so",
            "**A successor entity:** in the event of a merger, acquisition, or sale of assets, subject to the same privacy protections",
          ],
        },
        {
          type: "p",
          text: "We do not sell your personal data, and we do not share it with advertising networks.",
        },
      ],
    },
    {
      heading: "8. International transfers",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "All sub-processors listed above have committed to processing SimPatient customer personal data on infrastructure located within the European Union or the United Kingdom.",
        },
        {
          type: "p",
          text: "Where a sub-processor is a US-headquartered company (for example, OpenAI, ElevenLabs, Resend, Userback, Vercel, or Google Cloud), your personal data is nevertheless processed exclusively in an EU or UK region under a Data Processing Agreement that restricts the transfer of personal data outside those regions in identifiable form.",
        },
        {
          type: "p",
          text: "In the limited circumstances where a transfer outside the UK/EU becomes necessary (for example, support engineering access), we rely on:",
        },
        {
          type: "ul",
          items: [
            "The UK International Data Transfer Addendum to the EU Standard Contractual Clauses; or",
            "The UK International Data Transfer Agreement (IDTA),",
          ],
        },
        {
          type: "p",
          text: "together with supplementary technical measures including encryption in transit (TLS 1.2+), encryption at rest, and role-based access controls. A copy of the transfer mechanism in use for any particular sub-processor is available on request.",
        },
      ],
    },
    {
      heading: "9. How long we keep your personal data",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "We keep your personal data only for as long as necessary for the purposes described in this policy.",
        },
        {
          type: "table",
          headers: ["Category", "Retention period"],
          rows: [
            [
              "Account data (name, email, role, organisation)",
              "For the life of your account, plus 90 days after deletion",
            ],
            [
              "Consultation transcripts and messages",
              "24 months from creation, or the term of your institution's contract, whichever is longer",
            ],
            [
              "Audio recordings (held on ElevenLabs)",
              "24 months, subject to sub-processor retention policy",
            ],
            ["Reflection and feedback data", "24 months from creation"],
            [
              "Consent records (audit trail)",
              "6 years after the consent was given or withdrawn",
            ],
            ["Invitation records", "3 months, or until accepted/revoked"],
            [
              "One-time codes (MFA)",
              "Up to 5 minutes, then automatically deleted",
            ],
            [
              "Activity / session tracking",
              "Deleted automatically when a user is inactive beyond the platform threshold",
            ],
            [
              "Anonymised, aggregated analytics",
              "Indefinitely (no longer personal data once anonymised)",
            ],
            ["Support correspondence", "3 years from last contact"],
          ],
        },
        {
          type: "p",
          text: "When you request account deletion, we delete or irreversibly anonymise your personal data within 30 days, subject to any legal obligation that requires us to retain specific data for longer (for example, financial records).",
        },
      ],
    },
    {
      heading: "10. Your rights under UK GDPR",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "You have the following rights in relation to your personal data:",
        },
        {
          type: "ul",
          items: [
            "**Right of access (Art. 15):** obtain a copy of the personal data we hold about you.",
            "**Right to rectification (Art. 16):** ask us to correct inaccurate or incomplete data.",
            '**Right to erasure (Art. 17):** ask us to delete your personal data ("right to be forgotten").',
            "**Right to restriction (Art. 18):** ask us to limit how we process your data.",
            "**Right to data portability (Art. 20):** receive your data in a structured, commonly used, machine-readable format.",
            "**Right to object (Art. 21):** object to processing based on legitimate interests, including profiling and direct marketing.",
            "**Right to withdraw consent:** where processing is based on consent, you can withdraw it at any time.",
            "**Right not to be subject to solely automated decision-making (Art. 22):** we do not make legally significant decisions about you through automated means.",
          ],
        },
        {
          type: "p",
          text: "To exercise any of these rights, email hello@simpatient.co.uk. We will respond within the applicable time period under the UK GDPR. That period runs from the latest of: the date we receive your request, the date we have verified your identity (where we reasonably need to do so), and the date we receive any fee we are permitted to charge. It is normally one month, extendable by up to two further months for complex or numerous requests (we will tell you if an extension applies).",
        },
        {
          type: "p",
          text: "We may need to verify your identity before acting on a request. This is to protect your data from unauthorised disclosure.",
        },
        {
          type: "p",
          text: "**Complaining to us first.** If you are unhappy with how we have handled your personal data, we ask that you raise it with us first by emailing hello@simpatient.co.uk, so we have the opportunity to put things right. We will acknowledge your complaint within 30 days of receiving it, keep you informed of our progress, and aim to provide a substantive response within three months. We provide this complaints route in accordance with section 164A of the Data Protection Act 2018.",
        },
        {
          type: "p",
          text: "Complaining to us does not remove your right to complain to the UK's supervisory authority. You may complain to us, to the Information Commissioner's Office, or both:",
        },
        {
          type: "ul",
          items: [
            "**Information Commissioner's Office (ICO)**",
            "Website: https://ico.org.uk/",
            "Helpline: 0303 123 1113",
          ],
        },
      ],
    },
    {
      heading: "11. Cookies and similar technologies",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "We use a small number of cookies and similar technologies:",
        },
        {
          // Rows sourced from app/legal/cookies.ts so this table and
          // the /cookies page can never drift apart.
          type: "table",
          headers: ["Cookie", "Purpose", "Type", "Lifespan"],
          rows: cookieTableRows(),
        },
        {
          type: "p",
          text: "All of the cookies we currently use are essential: they are strictly necessary to sign you in, keep you signed in, authenticate administrators, apply invitations, and run the in-app feedback and support tool. Under the Privacy and Electronic Communications Regulations (PECR) these may be set without consent. We do not use analytics, advertising, or third-party tracking cookies in the app.",
        },
        {
          type: "p",
          text: "If in future we introduce any non-essential cookies (for example, analytics), we will not set them until you have given explicit consent through a cookie banner that lets you accept or reject them with equal prominence, and you will be able to change your choice at any time.",
        },
        {
          type: "p",
          text: "Full details are available in our separate Cookie Policy at simpatient.co.uk/cookies.",
        },
      ],
    },
    {
      heading: "12. Security",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "We take the security of your personal data seriously. Our measures include:",
        },
        {
          type: "ul",
          items: [
            "Encryption in transit via TLS 1.2 or higher",
            "Encryption at rest for all database and file storage",
            "Password hashing with bcrypt (salted, 10 rounds)",
            "Role-based access control enforced on every server-side route",
            "Server-side-only database access (no direct client-to-database writes)",
            "JWT-based session tokens with HttpOnly and Secure flags",
            "Multi-factor authentication for privileged administrator accounts",
            "Audit logging of administrator access to learner data",
            "Backups and disaster recovery via Google Cloud's resilient infrastructure",
            "Regular security reviews of our codebase and dependencies",
          ],
        },
        {
          type: "p",
          text: "No system is 100% secure. If we become aware of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the ICO within 72 hours and, where required, notify you without undue delay.",
        },
      ],
    },
    {
      heading: "13. Children and age",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "SimPatient is designed for adult medical learners (age 18+) using the platform in an educational context, either through an institution or as an individual learner.",
        },
        {
          type: "p",
          text: "You must be at least 18 years old to create an account as an individual. Where a learner under 18 uses the platform under institutional supervision (for example, a university or NHS trust), the institution is responsible for obtaining any necessary parental or guardian consent before inviting the learner.",
        },
        {
          type: "p",
          text: "Where any user of the platform is under 18, we treat their personal data as meriting higher protection. We have regard to the heightened protections for children's data under the Data (Use and Access) Act 2025 and to the ICO's Age Appropriate Design Code (the Children's Code), and we assess the processing of any under-18 user's data in our Data Protection Impact Assessment. The UK age at which a child can consent to information society services on their own behalf is 13; we do not rely on a child's own consent as a lawful basis for the simulation service, which is instead provided to institutional learners under the institution's lawful basis.",
        },
        {
          type: "p",
          text: "If you believe a child has provided us with personal data outside an institutional arrangement, contact hello@simpatient.co.uk and we will delete it.",
        },
      ],
    },
    {
      heading: "14. Automated decision-making and profiling",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "We do not make decisions about you that produce legal or similarly significant effects using solely automated means (Art. 22 UK GDPR).",
        },
        {
          type: "p",
          text: "Our platform uses AI models to generate simulated patient responses and educational feedback. These outputs are educational in nature and are not decisions about you that have legal effect. A human (you, and where applicable your tutor) remains in control of any educational evaluation.",
        },
        {
          type: "p",
          text: "The AI-generated feedback is a formative learning aid. It is not designed or intended to be used as an automated assessment, grading, or examination tool, and it must not be used as the sole basis for any academic or professional decision about a learner. Any summative assessment remains the responsibility of the learner's institution and its human assessors.",
        },
      ],
    },
    {
      heading: "15. Marketing",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Where you have opted in, we may send you occasional emails about new features, product updates, or SimPatient-related educational content.",
        },
        {
          type: "p",
          text: "You can unsubscribe at any time via the link in every marketing email, or by emailing hello@simpatient.co.uk. Unsubscribing from marketing does not affect transactional emails (such as invitations, password resets, and service notices), which you cannot opt out of while you hold an account.",
        },
      ],
    },
    {
      heading: "16. Changes to this policy",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "We may update this Privacy Policy from time to time. When we make material changes, we will:",
        },
        {
          type: "ul",
          items: [
            "Publish the updated policy at simpatient.co.uk/privacy and app.simpatient.co.uk/privacy",
            'Increment the version number and update the "Effective date"',
            "Notify registered users by email and/or in-app notification where the change materially affects how your data is processed",
          ],
        },
        { type: "p", text: "Previous versions are available on request." },
      ],
    },
    {
      heading: "17. Contact us",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "If you have any questions about this Privacy Policy or how we handle your personal data, please contact us using the details below.",
        },
      ],
    },
  ],
  contactBlock:
    "St Andrews Medical Innovations Limited (trading as SimPatient)\nData Protection Officer: Mr Christopher Milne, Head of Information Assurance and Governance\nDPO email: dataprot@st-andrews.ac.uk\nGeneral email: hello@simpatient.co.uk\nPost: Walter Bower House, Main Street, Guardbridge, St Andrews, Fife, KY16 0US\n\nThis Privacy Policy is governed by the laws of Scotland.",
};

// ---------------------------------------------------------------------
// Terms of Service
// ---------------------------------------------------------------------

const termsOfService: LegalDoc = {
  slug: "terms-of-service",
  shortTitle: "Terms of Service",
  title: "Terms of Service",
  tagline:
    "The legal agreement between you and SimPatient when you use the platform.",
  effectiveDate: "5 June 2026",
  version: "2.1",
  applies: "simpatient.co.uk and app.simpatient.co.uk",
  sections: [
    {
      heading: "1. About these terms",
      level: 2,
      blocks: [
        {
          type: "p",
          text: 'These Terms of Service ("Terms") are a legal agreement between you and St Andrews Medical Innovations Limited (trading as SimPatient), a company registered in Scotland (SC705314) ("SimPatient", "we", "us", "our"), and govern your use of:',
        },
        {
          type: "ul",
          items: [
            "The SimPatient marketing website at simpatient.co.uk",
            "The SimPatient application at app.simpatient.co.uk",
            'Any associated services, APIs, documentation, and communications (together, the "Service")',
          ],
        },
        {
          type: "p",
          text: "By creating an account, accepting an invitation, or otherwise using the Service, you agree to these Terms. If you do not agree, you must not use the Service.",
        },
        {
          type: "p",
          text: 'If you are using the Service on behalf of an organisation (such as a university, NHS trust, medical school, or other institution), you confirm that you have authority to bind that organisation to these Terms, and "you" includes that organisation.',
        },
      ],
    },
    { heading: "2. The Service", level: 2, blocks: [] },
    {
      heading: "2.1 What SimPatient does",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "SimPatient provides an AI-powered medical training simulation platform. Learners practise clinical communication skills with virtual patients across three modes:",
        },
        {
          type: "ul",
          items: [
            "**Chat mode:** text-based conversations",
            "**Audio mode:** voice conversations with text-to-speech responses",
            "**Video mode:** real-time conversations with streaming avatars",
          ],
        },
        {
          type: "p",
          text: "The Service also provides reflection prompts, AI-generated feedback, progress tracking, and organisation-level administration tools.",
        },
      ],
    },
    {
      heading: "2.2 Educational purpose only",
      level: 3,
      blocks: [
        {
          type: "callout",
          text: "The Service is provided for educational and training purposes only. It is not a medical device. It is not intended to be used for real patient diagnosis, real patient treatment, real clinical decision-making, or any real clinical workflow.",
        },
        {
          type: "p",
          text: "AI-generated outputs are simulations. They are produced by large language models and associated technologies, may contain errors or omissions, and must not be relied upon for clinical care. No doctor-patient relationship is created by your use of the Service.",
        },
      ],
    },
    {
      heading: "2.3 AI disclosure",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "All patient personas on the Service are simulated. You are at all times interacting with artificial intelligence, not a real patient, tutor, or clinician. Avatars, voices, and personas are synthetic.",
        },
      ],
    },
    {
      heading: "2.4 Prohibition on real patient data",
      level: 3,
      blocks: [
        {
          type: "callout",
          text: "You must not enter, upload, paste, dictate, or otherwise introduce any real patient data, real clinical records, real identifiable health information, or any other personal data of a third party into the Service. This is a fundamental condition of use. Violating this condition may result in immediate suspension or termination of your account and, where required, notification of your institution and the Information Commissioner's Office.",
        },
      ],
    },
    { heading: "3. Your account", level: 2, blocks: [] },
    {
      heading: "3.1 Eligibility",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "To use the Service as an individual, you must be at least 18 years old. Where a younger learner uses the Service under institutional supervision, the institution is responsible for ensuring any necessary parental or guardian consent is in place.",
        },
      ],
    },
    {
      heading: "3.2 Account creation",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "You must provide accurate, current, and complete information when creating an account, and keep that information up to date. You are responsible for safeguarding your password and for any activity that occurs under your account. You must notify us immediately at hello@simpatient.co.uk if you suspect your account has been compromised.",
        },
      ],
    },
    {
      heading: "3.3 Account roles",
      level: 3,
      blocks: [
        { type: "p", text: "The Service supports three user roles:" },
        {
          type: "ul",
          items: [
            "**Learner (user):** practises with simulated patients",
            "**Organisation administrator (org_admin):** manages learners, invitations, and credits within their organisation",
            "**Super administrator (super_admin):** SimPatient personnel with elevated access for support and operations",
          ],
        },
        {
          type: "p",
          text: "Access rights differ by role. You agree not to attempt to access functions or data beyond your assigned role.",
        },
      ],
    },
    {
      heading: "3.4 Institutional accounts",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "Where your account was created through an institutional invitation, your institution may have additional rights in relation to your account, including the right to:",
        },
        {
          type: "ul",
          items: [
            "View your simulation history and feedback for educational purposes",
            "Reassign, suspend, or remove your access",
            "Apply credit limits or usage policies",
          ],
        },
        {
          type: "p",
          text: "The relationship between you and your institution is governed separately by your institution's own policies.",
        },
      ],
    },
    {
      heading: "4. Acceptable use",
      level: 2,
      blocks: [
        { type: "p", text: "You agree that you will not:" },
        {
          type: "ul",
          items: [
            "Use the Service in any way that breaches applicable law (including UK GDPR, the Data Protection Act 2018, and the Computer Misuse Act 1990).",
            "Enter real patient data or any third party's personal data into the Service.",
            "Use the Service for real clinical decision-making, diagnosis, triage, or treatment of real patients.",
            "Attempt to reverse-engineer, decompile, or extract model weights, prompts, or other proprietary components of the Service.",
            "Attempt to circumvent any security, authentication, rate-limit, or credit-enforcement mechanism.",
            "Use automated means (bots, scrapers) to access the Service, except as expressly permitted by an API agreement with us.",
            "Upload or submit malicious code, malware, or content designed to disrupt the Service or any other user.",
            "Use the Service to generate content that is unlawful, defamatory, obscene, discriminatory, or intended to harass any person.",
            "Use the Service to generate exam answers, academic coursework, or any output represented to an educational institution as your own work, where that would breach your institution's academic integrity policy.",
            "Use the Service to train, benchmark, or otherwise improve a competing AI product.",
            "Resell, sublicense, or commercially redistribute the Service without our prior written consent.",
            "Use the Service to impersonate another person, organisation, or SimPatient itself.",
          ],
        },
        {
          type: "p",
          text: "We may suspend or terminate your access immediately if we reasonably believe you have breached any of the above.",
        },
      ],
    },
    { heading: "5. Content and intellectual property", level: 2, blocks: [] },
    {
      heading: "5.1 Our IP",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "The Service, including its software, design, branding, patient personas, system prompts, scoring rubrics, documentation, and all underlying intellectual property, is owned by St Andrews Medical Innovations Limited (trading as SimPatient) or our licensors and is protected by copyright, trade mark, and other intellectual property laws.",
        },
        {
          type: "p",
          text: "We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Service for its intended educational purpose, subject to these Terms.",
        },
      ],
    },
    {
      heading: "5.2 Your content",
      level: 3,
      blocks: [
        {
          type: "p",
          text: '"Your Content" means the inputs you submit to the Service (typed messages, voice input, reflections) and the outputs generated in response to those inputs that are specific to your session.',
        },
        {
          type: "p",
          text: "You retain all rights you have in Your Content. You grant us a non-exclusive, worldwide, royalty-free licence to host, store, transmit, display, and process Your Content solely for the purpose of:",
        },
        {
          type: "ul",
          items: [
            "Operating and providing the Service to you",
            "Maintaining security and preventing abuse",
            "Complying with legal obligations",
            "Producing anonymised, aggregated analytics that do not identify you",
          ],
        },
      ],
    },
    {
      heading: "5.3 No AI training on Your Content",
      level: 3,
      blocks: [
        {
          type: "callout",
          text: "We will not use Your Content to train, fine-tune, or otherwise improve any third-party AI model. Our Data Processing Agreements with OpenAI, ElevenLabs, Anam.ai, and all other AI sub-processors contractually prohibit the use of your data for model training.",
        },
      ],
    },
    {
      heading: "5.4 Feedback",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "If you send us ideas, suggestions, or feedback about the Service (separately from Your Content), you grant us a perpetual, irrevocable, royalty-free licence to use them without restriction or compensation.",
        },
      ],
    },
    {
      heading: "5.5 Avatars, voices, and personas",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "Patient avatars, voices, and personas presented on the Service are synthetic and licensed to SimPatient from our sub-processors. You have no ownership or likeness rights in any avatar, voice, or persona and may not extract, copy, or reuse them outside the Service.",
        },
      ],
    },
    { heading: "6. AI outputs", level: 2, blocks: [] },
    {
      heading: "6.1 Nature of outputs",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "The Service uses third-party AI models to generate simulated patient responses, voices, video, and educational feedback. AI outputs:",
        },
        {
          type: "ul",
          items: [
            "May be inaccurate, inconsistent, biased, or incomplete",
            "May not be unique to you (similar inputs can produce similar outputs for different users)",
            "Are not clinical advice and must not be used as such",
            'Are provided "as is"',
          ],
        },
      ],
    },
    {
      heading: "6.2 Right to change AI providers",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "We may change, add, or replace the underlying AI providers or models used to deliver the Service at any time, with or without notice. We are not obliged to maintain any particular model, voice, or avatar.",
        },
      ],
    },
    {
      heading: "6.3 Your responsibility",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "You are responsible for critically evaluating any AI output before acting on it, and for complying with the acceptable use policies of any AI sub-processor whose outputs you receive through the Service (including OpenAI, ElevenLabs, and Anam.ai).",
        },
      ],
    },
    { heading: "7. Credits and paid services", level: 2, blocks: [] },
    {
      heading: "7.1 Credit system",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "Use of the Service consumes credits. Credits may be:",
        },
        {
          type: "ul",
          items: [
            "Held by an individual user",
            "Held in an organisational pool managed by an organisation administrator",
            "Subject to individual or organisational limits",
          ],
        },
        {
          type: "p",
          text: "The credit system, balances, transactions, and limits are recorded in the Service and are the authoritative record.",
        },
      ],
    },
    {
      heading: "7.2 No cash value",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "Credits have no cash value, are not refundable except as required by law or expressly stated in a separate commercial agreement, and cannot be transferred or exchanged outside the Service.",
        },
      ],
    },
    {
      heading: "7.3 Billing",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "Where a separate commercial agreement is in place between SimPatient and your institution, billing terms are governed by that agreement. Where you purchase credits as an individual, the purchase terms presented at checkout apply.",
        },
      ],
    },
    {
      heading: "7.4 Consumer cancellation rights",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "If you are a consumer purchasing as an individual (and not on behalf of an organisation), you normally have the right under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 to cancel within 14 days of purchase and receive a refund.",
        },
        {
          type: "p",
          text: "Because the Service is digital content and online services that we make available immediately, we ask you at checkout to expressly consent to immediate performance and to acknowledge that, to the extent you use the Service during the 14-day period, you lose the right to cancel for the part performed. Where you have given that consent and begun using the Service, your right to cancel ends; where you have not yet used the Service, you may still cancel within 14 days for a full refund. Nothing in these Terms removes any cancellation or refund right you have that cannot be excluded by law.",
        },
      ],
    },
    {
      heading: "8. Privacy and data protection",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Our collection and use of personal data is described in our Privacy Policy, available at simpatient.co.uk/privacy. By using the Service, you acknowledge that you have read the Privacy Policy.",
        },
        {
          type: "p",
          text: "Where SimPatient acts as a Processor of personal data on behalf of an institution, the Data Processing Agreement between SimPatient and that institution applies. A standard-form Data Processing Agreement is available at simpatient.co.uk/dpa.",
        },
        {
          type: "p",
          text: "All customer personal data is processed on EU / UK infrastructure. We do not transfer your personal data outside the EU/UK in identifiable form.",
        },
      ],
    },
    {
      heading: "9. Availability and changes to the Service",
      level: 2,
      blocks: [],
    },
    {
      heading: "9.1 Availability",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "We will use reasonable efforts to keep the Service available, but we do not guarantee uninterrupted access. The Service may be unavailable for:",
        },
        {
          type: "ul",
          items: [
            "Scheduled maintenance",
            "Emergency repairs",
            "Issues with third-party providers outside our control",
            "Force majeure events",
          ],
        },
      ],
    },
    {
      heading: "9.2 Changes",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "We may modify, add, or remove features at any time. Where a change materially reduces the functionality of a paid service, we will notify institutional customers in accordance with their agreement.",
        },
      ],
    },
    { heading: "10. Suspension and termination", level: 2, blocks: [] },
    {
      heading: "10.1 By you",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "You may stop using the Service and delete your account at any time by emailing hello@simpatient.co.uk or using the in-app deletion function (where available).",
        },
      ],
    },
    {
      heading: "10.2 By us",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "We may suspend or terminate your account immediately, without notice, if:",
        },
        {
          type: "ul",
          items: [
            "You breach these Terms, including the acceptable use provisions in clause 4",
            "Your institution instructs us to do so",
            "We are required to do so by law, court order, or regulator",
            "Continued provision of the Service to you poses a security or legal risk to us or other users",
          ],
        },
      ],
    },
    {
      heading: "10.3 Effect of termination",
      level: 3,
      blocks: [
        { type: "p", text: "On termination:" },
        {
          type: "ul",
          items: [
            "Your right to access the Service ends",
            "We will delete or return your personal data in accordance with the Privacy Policy and any applicable Data Processing Agreement",
            "Clauses that by their nature should survive termination will survive (including IP, liability, indemnity, and governing law)",
          ],
        },
      ],
    },
    {
      heading: "11. Warranties and disclaimers",
      level: 2,
      blocks: [
        { type: "p", text: "To the maximum extent permitted by law:" },
        {
          type: "ul",
          items: [
            'The Service is provided "as is" and "as available", without warranties of any kind, whether express, implied, or statutory.',
            "We do not warrant that the Service will be uninterrupted, error-free, secure, or free from viruses or harmful components.",
            "We do not warrant that AI outputs will be accurate, complete, reliable, fit for any particular purpose, or non-infringing.",
            "We do not warrant that use of the Service will meet your educational, accreditation, or professional requirements.",
          ],
        },
        {
          type: "p",
          text: "Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by Scots law.",
        },
      ],
    },
    {
      heading: "12. Limitation of liability",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Subject to clause 11, and (where you are a consumer) subject to the paragraph at the end of this clause:",
        },
        {
          type: "ul",
          items: [
            "We are not liable for any indirect, incidental, consequential, special, punitive, or exemplary damages, or for any loss of profits, revenue, business, goodwill, data, or anticipated savings, even if we have been advised of the possibility of such damages.",
            "Our total aggregate liability to you arising out of or in connection with these Terms, the Service, or any related matter, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, is limited to the greater of:",
            "The total fees paid by you to SimPatient in the twelve (12) months immediately preceding the event giving rise to the claim; or",
            "£100, where no fees have been paid.",
          ],
        },
        {
          type: "p",
          text: "The exclusions and the cap in this clause apply primarily to business customers and, between us and a business customer, you agree they are reasonable given the nature of the Service and its educational purpose.",
        },
        {
          type: "p",
          text: "If you are a consumer, nothing in these Terms excludes or limits our liability where it would be unfair to do so under the Consumer Rights Act 2015, or otherwise excludes or limits any liability that cannot lawfully be excluded or limited against a consumer. In particular, we remain responsible for loss or damage you suffer that is a foreseeable result of our breach of these Terms or our failure to use reasonable care and skill, and your statutory rights as a consumer (including in relation to digital content and services) are not affected.",
        },
      ],
    },
    {
      heading: "13. Indemnity",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "You agree to indemnify and hold harmless SimPatient, its officers, employees, and sub-processors from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or in connection with:",
        },
        {
          type: "ul",
          items: [
            "Your breach of these Terms",
            "Your introduction of real patient data or any third party's personal data into the Service",
            "Your misuse of AI outputs (including any clinical use)",
            "Your infringement of any third-party right",
          ],
        },
      ],
    },
    {
      heading: "14. Third-party services",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "The Service integrates with third-party providers (including Google Cloud, OpenAI, ElevenLabs, Anam.ai, Resend, Userback, and Vercel). Your use of the Service is also subject to the acceptable use policies of those providers where they flow through to end-users. We are not responsible for third-party services we do not operate.",
        },
      ],
    },
    {
      heading: "15. Confidentiality",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Where you receive non-public information from us marked or reasonably understood to be confidential (including pricing, product roadmap, and security architecture details), you must keep it confidential and use it only for the purposes of these Terms, for as long as it remains non-public.",
        },
      ],
    },
    {
      heading: "16. Changes to these Terms",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "We may update these Terms from time to time. When we make material changes, we will:",
        },
        {
          type: "ul",
          items: [
            "Publish the updated Terms at simpatient.co.uk/terms and app.simpatient.co.uk/terms",
            'Update the "Effective date" and version number',
            "Notify registered users by email or in-app notification",
          ],
        },
        {
          type: "p",
          text: "Your continued use of the Service after the effective date of updated Terms constitutes acceptance of those Terms.",
        },
      ],
    },
    {
      heading: "17. Governing law and jurisdiction",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "These Terms, and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with them, are governed by the laws of Scotland.",
        },
        {
          type: "p",
          text: "You and we agree that the courts of Scotland have exclusive jurisdiction to settle any such dispute or claim.",
        },
        {
          type: "p",
          text: "If you are a consumer resident in the UK or the EEA, you retain the benefit of any mandatory consumer-protection laws of your country of residence.",
        },
      ],
    },
    {
      heading: "18. General",
      level: 2,
      blocks: [
        {
          type: "ul",
          items: [
            "**Entire agreement:** These Terms, together with the Privacy Policy and any applicable Data Processing Agreement or commercial order form, constitute the entire agreement between you and us in relation to the Service.",
            "**Severability:** If any provision is held invalid or unenforceable, the remaining provisions will continue in full force.",
            "**No waiver:** A failure by us to enforce any right or provision is not a waiver of that right or provision.",
            "**Assignment:** You may not assign or transfer these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.",
            "**No third-party rights:** No one other than you and us has any right to enforce any term of these Terms under the Contracts (Rights of Third Parties) Act 1999.",
            "**Notices:** Notices to us must be sent to hello@simpatient.co.uk. Notices to you may be sent by email or via the Service.",
          ],
        },
      ],
    },
    {
      heading: "19. Contact",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Questions about these Terms can be sent to us using the details below.",
        },
      ],
    },
  ],
  contactBlock:
    "St Andrews Medical Innovations Limited (trading as SimPatient)\nEmail: hello@simpatient.co.uk\nPost: Walter Bower House, Main Street, Guardbridge, St Andrews, Fife, KY16 0US\nCompany number: SC705314",
};

// ---------------------------------------------------------------------
// Data Processing Agreement
// ---------------------------------------------------------------------

const dpa: LegalDoc = {
  slug: "data-processing-agreement",
  shortTitle: "Data Processing Agreement",
  title: "Data Processing Agreement",
  tagline:
    "How SimPatient processes personal data on behalf of institutional customers.",
  effectiveDate: "5 June 2026",
  version: "2.1",
  intro:
    'This Data Processing Agreement ("DPA") forms part of the agreement between the customer identified in the relevant order form or service agreement (the "Customer", acting as Controller) and St Andrews Medical Innovations Limited (trading as SimPatient), a company registered in Scotland (SC705314) (the "Processor", "SimPatient", "we", "us"), for the provision of the SimPatient medical training simulation platform (the "Service"). This DPA governs the processing of Personal Data by SimPatient on behalf of the Customer in connection with the Service and is entered into pursuant to Article 28 of the UK GDPR.',
  sections: [
    {
      heading: "1. Definitions",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Unless otherwise defined in the main agreement, the following terms have the meanings set out below:",
        },
        {
          type: "ul",
          items: [
            '**"UK GDPR"** : the UK General Data Protection Regulation as it forms part of UK law under the European Union (Withdrawal) Act 2018, and the Data Protection Act 2018.',
            '**"EU GDPR"** : Regulation (EU) 2016/679.',
            '**"Applicable Data Protection Laws"** : the UK GDPR, the EU GDPR (where it applies to the Customer), the Data Protection Act 2018, the Privacy and Electronic Communications Regulations 2003, and any other data-protection laws applicable to the processing.',
            '**"Personal Data", "Controller", "Processor", "Processing", "Data Subject", "Supervisory Authority", and "Personal Data Breach"** have the meanings given in the UK GDPR.',
            '**"Sub-processor"** : any third party engaged by SimPatient to process Personal Data on behalf of the Customer.',
            '**"Customer Personal Data"** : Personal Data processed by SimPatient on behalf of the Customer under the main agreement and this DPA, as described in Annex 1.',
            '**"UK IDTA"** : the UK International Data Transfer Agreement issued by the Information Commissioner.',
            '**"UK Addendum"** : the UK International Data Transfer Addendum to the EU Standard Contractual Clauses.',
            '**"Standard Contractual Clauses" / "SCCs"** : the standard contractual clauses approved by the European Commission under Decision (EU) 2021/914.',
          ],
        },
      ],
    },
    { heading: "2. Subject matter and roles", level: 2, blocks: [] },
    {
      heading: "2.1 Subject matter",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "This DPA sets out the terms on which SimPatient processes Customer Personal Data in order to provide the Service to the Customer.",
        },
      ],
    },
    {
      heading: "2.2 Roles",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "The Customer is the Controller of the Customer Personal Data.",
            "SimPatient is the Processor of the Customer Personal Data.",
          ],
        },
        {
          type: "p",
          text: "Where the Customer is itself processing Personal Data on behalf of a third party (for example, where a university processes student data under its own legal basis), the Customer remains responsible for its own role under Applicable Data Protection Laws.",
        },
      ],
    },
    {
      heading: "2.3 Details of processing",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "The subject matter, duration, nature and purpose of processing, types of Personal Data, and categories of Data Subjects are set out in Annex 1.",
        },
      ],
    },
    {
      heading: "3. Compliance with laws",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Each party will comply with its obligations under Applicable Data Protection Laws in relation to the Customer Personal Data.",
        },
        { type: "p", text: "The Customer is responsible for:" },
        {
          type: "ul",
          items: [
            "Ensuring it has a lawful basis for the processing instructed by it under this DPA",
            "Providing any notices required to Data Subjects",
            "Ensuring that its instructions to SimPatient comply with Applicable Data Protection Laws",
          ],
        },
        {
          type: "p",
          text: "SimPatient is responsible for processing Customer Personal Data only in accordance with this DPA, the main agreement, and the Customer's documented instructions, unless required to do otherwise by law (in which case SimPatient will inform the Customer before processing, unless the law prohibits such notification).",
        },
      ],
    },
    { heading: "4. Processing instructions", level: 2, blocks: [] },
    {
      heading: "4.1 Documented instructions",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "The Customer instructs SimPatient to process Customer Personal Data:",
        },
        {
          type: "ul",
          items: [
            "To provide, maintain, secure, and improve the Service in accordance with the main agreement",
            "To enable the specific features the Customer or its users configure or use",
            "To comply with the Customer's reasonable written instructions that are consistent with the main agreement",
            "To comply with law",
          ],
        },
      ],
    },
    {
      heading: "4.2 Notification of unlawful instructions",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "If SimPatient considers that an instruction from the Customer infringes Applicable Data Protection Laws, SimPatient will promptly inform the Customer and may suspend the relevant processing until the instruction is withdrawn or amended.",
        },
      ],
    },
    {
      heading: "5. Confidentiality",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "SimPatient will ensure that all personnel authorised to process Customer Personal Data:",
        },
        {
          type: "ul",
          items: [
            "Are subject to binding obligations of confidentiality (contractual or statutory)",
            "Receive appropriate training on data protection and information security",
            "Access Customer Personal Data only on a need-to-know basis",
          ],
        },
      ],
    },
    {
      heading: "6. Security measures",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "SimPatient will implement and maintain appropriate technical and organisational measures to ensure a level of security appropriate to the risk, taking into account the nature, scope, context, and purposes of processing.",
        },
        {
          type: "p",
          text: "The security measures in place as of the effective date of this DPA are described in Annex 2 (Technical and Organisational Measures).",
        },
        {
          type: "p",
          text: "SimPatient may update those measures from time to time, provided that the overall level of security is not materially reduced.",
        },
      ],
    },
    { heading: "7. Sub-processing", level: 2, blocks: [] },
    {
      heading: "7.1 General authorisation",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "The Customer grants SimPatient general authorisation to engage Sub-processors to assist in the provision of the Service, subject to this clause 7. The list of authorised Sub-processors as of the effective date is set out in Annex 3.",
        },
      ],
    },
    {
      heading: "7.2 Flow-down obligations",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "SimPatient will impose on each Sub-processor, by written contract, data-protection obligations that are no less protective than those set out in this DPA, including in particular:",
        },
        {
          type: "ul",
          items: [
            "A prohibition on processing Customer Personal Data for any purpose other than the provision of services to SimPatient",
            "A prohibition on using Customer Personal Data to train AI models",
            "Appropriate security measures",
            "Sub-processor transparency",
            "Flow-down of Data Subject rights assistance",
          ],
        },
        {
          type: "p",
          text: "SimPatient remains responsible to the Customer for the performance of each Sub-processor's obligations.",
        },
      ],
    },
    {
      heading: "7.3 Notification and objection",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "SimPatient will notify the Customer (by email or in-product notice) at least ninety (90) days before adding or replacing a Sub-processor that processes Customer Personal Data.",
        },
        {
          type: "p",
          text: "The Customer may object to the new Sub-processor on reasonable data-protection grounds within 14 days of notification. If the parties cannot agree on a resolution, the Customer may terminate the affected portion of the Service with a pro-rata refund of prepaid fees.",
        },
      ],
    },
    { heading: "8. International transfers", level: 2, blocks: [] },
    {
      heading: "8.1 Primary commitment: EU/UK processing",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "SimPatient processes Customer Personal Data exclusively on infrastructure located within the European Union or the United Kingdom. All Sub-processors listed in Annex 3 have contractually committed to restricting processing of Customer Personal Data to EU/UK regions.",
        },
      ],
    },
    {
      heading: "8.2 Transfer mechanism",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "In the limited circumstances where a transfer of Customer Personal Data outside the UK/EU becomes necessary (for example, for engineering support access), the transfer will be made pursuant to:",
        },
        {
          type: "ul",
          items: [
            "The UK IDTA or the UK Addendum to the SCCs, as appropriate to the Customer's location and the Sub-processor concerned",
            "Supplementary technical measures including encryption in transit (TLS 1.2+), encryption at rest, pseudonymisation where feasible, and access controls",
          ],
        },
      ],
    },
    {
      heading: "8.3 Transfer impact assessments",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "SimPatient has performed transfer impact assessments in respect of each Sub-processor that has a parent entity outside the UK/EU, and maintains written records of those assessments. Copies are available to the Customer on reasonable written request, subject to confidentiality.",
        },
      ],
    },
    { heading: "9. Data Subject rights", level: 2, blocks: [] },
    {
      heading: "9.1 Assistance",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "Taking into account the nature of the processing, SimPatient will assist the Customer by appropriate technical and organisational measures, insofar as possible, to respond to requests from Data Subjects exercising their rights under Applicable Data Protection Laws, including the rights of access, rectification, erasure, restriction, portability, objection, and not to be subject to automated decision-making.",
        },
      ],
    },
    {
      heading: "9.2 Direct requests",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "If SimPatient receives a request directly from a Data Subject relating to Customer Personal Data, SimPatient will (unless legally prohibited) promptly forward that request to the Customer and will not respond to the Data Subject except as instructed by the Customer or required by law.",
        },
      ],
    },
    {
      heading: "9.3 Built-in capabilities",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "The Service provides self-service capabilities for authenticated users to:",
        },
        {
          type: "ul",
          items: [
            "Access their own personal data",
            "Rectify inaccurate data",
            "Export their data in a structured, machine-readable format",
            "Request deletion of their account and associated data",
          ],
        },
      ],
    },
    { heading: "10. Personal Data Breach", level: 2, blocks: [] },
    {
      heading: "10.1 Notification",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "SimPatient will notify the Customer without undue delay, and in any event within seventy-two (72) hours of becoming aware of a Personal Data Breach affecting Customer Personal Data.",
        },
      ],
    },
    {
      heading: "10.2 Contents of notification",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "The notification will include, to the extent known and as soon as it becomes available:",
        },
        {
          type: "ul",
          items: [
            "A description of the nature of the Personal Data Breach, including the categories and approximate number of Data Subjects and records concerned",
            "The name and contact details of the SimPatient contact point from whom more information can be obtained",
            "A description of the likely consequences",
            "A description of the measures taken or proposed to address the breach and mitigate its adverse effects",
          ],
        },
      ],
    },
    {
      heading: "10.3 Assistance",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "SimPatient will cooperate with the Customer and provide reasonable assistance to enable the Customer to meet its obligations under Articles 33 and 34 of the UK GDPR.",
        },
      ],
    },
    {
      heading: "11. Data Protection Impact Assessments",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "SimPatient will, taking into account the nature of the processing and the information available to SimPatient, provide reasonable assistance to the Customer with any Data Protection Impact Assessment and any prior consultation with a Supervisory Authority required under Articles 35 and 36 of the UK GDPR.",
        },
      ],
    },
    { heading: "12. Audits", level: 2, blocks: [] },
    {
      heading: "12.1 Information rights",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "SimPatient will make available to the Customer all information reasonably necessary to demonstrate compliance with this DPA.",
        },
      ],
    },
    {
      heading: "12.2 Audit rights",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "The Customer (or an independent third-party auditor acting on its behalf, bound by confidentiality and not a competitor of SimPatient) may audit SimPatient's compliance with this DPA not more than once in any twelve-month period, on at least 30 days' written notice, during normal business hours, at the Customer's cost, and subject to reasonable confidentiality undertakings.",
        },
      ],
    },
    {
      heading: "12.3 Third-party audit reports",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "In lieu of an on-site audit, SimPatient may satisfy the Customer's audit right by providing its most recent independent third-party audit reports or certifications (such as SOC 2, ISO 27001, Cyber Essentials, or NHS DSPT), where relevant.",
        },
      ],
    },
    {
      heading: "12.4 Regulator access",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "This clause does not limit any audit or inspection right of a Supervisory Authority.",
        },
      ],
    },
    {
      heading: "13. Deletion or return of Customer Personal Data",
      level: 2,
      blocks: [],
    },
    {
      heading: "13.1 End of services",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "On expiry or termination of the main agreement, SimPatient will, at the Customer's election:",
        },
        {
          type: "ul",
          items: [
            "Return all Customer Personal Data to the Customer in a structured, machine-readable format; or",
            "Delete all Customer Personal Data,",
          ],
        },
        {
          type: "p",
          text: "within 90 days, unless storage is required by applicable law.",
        },
      ],
    },
    {
      heading: "13.2 Default",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "If the Customer provides no instruction within 90 days after termination, SimPatient will delete all Customer Personal Data.",
        },
      ],
    },
    {
      heading: "13.3 Anonymised data",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "Nothing in this clause prevents SimPatient from retaining data that has been irreversibly anonymised in such a way that it no longer constitutes Personal Data.",
        },
      ],
    },
    {
      heading: "13.4 Backups",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "Data in routine backup media will be deleted in accordance with SimPatient's backup rotation schedule, and will remain subject to the security measures in Annex 2 until overwritten.",
        },
      ],
    },
    {
      heading: "14. Liability",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "The liability of each party under or in connection with this DPA is subject to the limitations and exclusions of liability set out in the main agreement. This DPA does not increase either party's liability beyond the caps set out in the main agreement.",
        },
      ],
    },
    { heading: "15. Term, conflict, and general", level: 2, blocks: [] },
    {
      heading: "15.1 Term",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "This DPA takes effect on the effective date and continues for the term of the main agreement and for so long as SimPatient processes Customer Personal Data.",
        },
      ],
    },
    {
      heading: "15.2 Conflict",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "If there is a conflict between this DPA and any other part of the main agreement, this DPA prevails in relation to data-protection matters.",
        },
      ],
    },
    {
      heading: "15.3 Severability",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "If any provision is held invalid or unenforceable, the remaining provisions continue in full force.",
        },
      ],
    },
    {
      heading: "15.4 Governing law and jurisdiction",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "This DPA is governed by the laws of Scotland, and the parties submit to the exclusive jurisdiction of the courts of Scotland.",
        },
      ],
    },
    { heading: "Annex 1: Details of Processing", level: 2, blocks: [] },
    {
      heading: "A. Subject matter",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "Processing of Personal Data by SimPatient as necessary to provide the Service to the Customer under the main agreement.",
        },
      ],
    },
    {
      heading: "B. Duration",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "For the term of the main agreement plus any post-termination retention or deletion period set out in clause 13.",
        },
      ],
    },
    {
      heading: "C. Nature and purpose of processing",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Provision of an AI-powered medical training simulation platform, including text, audio, and video consultation modes.",
            "Storage, retrieval, and display of transcripts, reflections, and feedback.",
            "Routing of content through AI sub-processors to generate simulated patient responses, voices, avatars, and feedback.",
            "Authentication, authorisation, billing (credits), and organisation administration.",
            "Security monitoring, abuse prevention, support, and service improvement (on an anonymised or aggregated basis).",
          ],
        },
      ],
    },
    {
      heading: "D. Types of Personal Data",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "**Identity and contact data:** name, email address, profile image",
            "**Account and access data:** user role, organisation ID, hashed password, session tokens, MFA codes",
            "**Consultation data:** text transcripts, audio recordings, video session metadata, reflection answers, AI-generated feedback",
            "**Technical data:** IP address, user agent, timestamps, log data",
            "**Consent and audit data:** policy version, consent timestamps, administrator access logs",
            "**Usage and billing data:** credit balances, credit transactions, usage tracking records",
          ],
        },
      ],
    },
    {
      heading: "E. Categories of Data Subjects",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Learners (students / medical trainees)",
            "Organisation administrators",
            "Invited users (prospective learners)",
            "Customer personnel with administrative access to the Service",
          ],
        },
      ],
    },
    {
      heading: "F. Special category data",
      level: 3,
      blocks: [
        {
          type: "p",
          text: "The Service is not designed to process special category data as defined in Article 9 UK GDPR. The Customer is responsible for ensuring that its users do not enter real patient data or other third-party health information into the Service.",
        },
        {
          type: "p",
          text: "Where the Service processes a learner's audio or facial video, it does so only to convert speech to text and to render the simulation (for example, real-time avatar interaction). It does not process audio or facial imagery for the purpose of uniquely identifying an individual, and therefore does not process biometric data within the meaning of Article 9 UK GDPR. SimPatient will not introduce voice or facial authentication or any other identification feature without first reassessing this position and updating this DPA.",
        },
      ],
    },
    {
      heading: "Annex 2: Technical and Organisational Measures",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "SimPatient implements and maintains the following technical and organisational measures:",
        },
      ],
    },
    {
      heading: "1. Access control",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Role-based access control enforced server-side on every API route",
            "JWT-based authentication with HttpOnly, Secure session cookies",
            "Multi-factor authentication for privileged (super administrator) accounts",
            "Principle of least privilege for personnel access to production systems",
            "Regular review of access rights",
          ],
        },
      ],
    },
    {
      heading: "2. Encryption",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "**In transit:** TLS 1.2 or higher for all connections between clients, the application, and sub-processors",
            "**At rest:** Encryption of the primary database (Google Cloud Firestore) and file storage using provider-managed keys",
            "Password hashing with bcrypt (salted, 10 rounds)",
          ],
        },
      ],
    },
    {
      heading: "3. Application security",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Server-side-only database access (no direct client-to-database writes)",
            "Firestore security rules deny all client-side read/write access",
            "Input validation and output encoding to mitigate injection and XSS",
            "Dependency scanning and regular patching",
            "Secrets management via environment variables on the hosting platform",
          ],
        },
      ],
    },
    {
      heading: "4. Logging and monitoring",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Application and audit logs retained for operational and security purposes",
            "Audit logging of super administrator access to Customer Personal Data",
            "Error monitoring and anomaly detection",
          ],
        },
      ],
    },
    {
      heading: "5. Backups and resilience",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Automated backups through the hosting provider's resilient infrastructure",
            "Geographic redundancy within the EU/UK region",
            "Documented incident response and business continuity procedures",
          ],
        },
      ],
    },
    {
      heading: "6. Personnel",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Confidentiality obligations for all personnel with access to Customer Personal Data",
            "Data-protection and security training at onboarding and periodically thereafter",
            "Background checks where required by law or by the Customer's agreement",
          ],
        },
      ],
    },
    {
      heading: "7. Incident response",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Documented Personal Data Breach response plan",
            "72-hour notification commitment to Controllers (clause 10 above)",
            "Root-cause analysis and remediation tracking",
          ],
        },
      ],
    },
    {
      heading: "8. Data minimisation and retention",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Role-scoped data access (users see only what their role permits)",
            "Documented retention periods published in the Privacy Policy",
            "Deletion on request and on account closure",
          ],
        },
      ],
    },
    {
      heading: "9. Sub-processor management",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Written Data Processing Agreement with each Sub-processor",
            "Contractual restriction to EU/UK processing regions",
            "Contractual prohibition on using Customer Personal Data to train AI models",
            "Periodic review of Sub-processors",
          ],
        },
      ],
    },
    {
      heading: "10. Physical and environmental security",
      level: 3,
      blocks: [
        {
          type: "ul",
          items: [
            "Reliance on the physical security of certified cloud providers (Google Cloud, Vercel)",
            "No SimPatient-operated physical data centres",
          ],
        },
      ],
    },
    {
      heading: "Annex 3: Authorised Sub-processors",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "As of the effective date of this DPA, SimPatient engages the following Sub-processors:",
        },
        {
          // Rows sourced from app/legal/sub-processors.ts (single
          // source of truth shared with Privacy Policy section 7.1 and
          // the /sub-processors page).
          type: "table",
          headers: ["Sub-processor", "Role", "Data", "Region"],
          rows: subProcessorTableRows(),
        },
        {
          type: "p",
          text: "Each Sub-processor is bound by a written Data Processing Agreement that includes:",
        },
        {
          type: "ul",
          items: [
            "A commitment to process Customer Personal Data only in the EU/UK region",
            "A prohibition on using Customer Personal Data to train AI models",
            "Appropriate technical and organisational security measures",
            "Flow-down of Data Subject rights assistance",
            "Sub-processor transparency",
          ],
        },
        {
          type: "p",
          text: "An up-to-date list of Sub-processors is maintained at simpatient.co.uk/sub-processors.",
        },
      ],
    },
    {
      heading: "Signatures",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "This DPA is incorporated by reference into the main agreement between the Customer and SimPatient and does not require separate signature. Where the Customer requires a signed version, please contact hello@simpatient.co.uk.",
        },
      ],
    },
  ],
  contactBlock:
    "St Andrews Medical Innovations Limited (trading as SimPatient)\nEmail: hello@simpatient.co.uk\nPost: Walter Bower House, Main Street, Guardbridge, St Andrews, Fife, KY16 0US\nCompany number: SC705314",
};

// ---------------------------------------------------------------------
// Cookie Policy
// ---------------------------------------------------------------------
//
// A full LegalDoc (sidebar tab + cross-nav + markdown mirror). The
// cookie table rows are sourced from app/legal/cookies.ts so this doc
// stays in lockstep with Privacy Policy section 11. Reachable at
// /legal/cookie-policy and, via the next.config.js redirect, at the
// short /cookies URL the Privacy Policy cites.

const cookiePolicy: LegalDoc = {
  slug: "cookie-policy",
  shortTitle: "Cookie Policy",
  title: "Cookie Policy",
  tagline:
    "The cookies and similar technologies we use, why we use them, and how long they last.",
  effectiveDate: "5 June 2026",
  version: "1.0",
  applies: "simpatient.co.uk and app.simpatient.co.uk",
  sections: [
    {
      heading: "1. What cookies are",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "A cookie is a small file a website stores in your browser so it can remember things between page loads, such as whether you are signed in. Some cookies are strictly necessary for a service to work (essential), and others are not (non-essential, for example analytics or advertising). Non-essential cookies may only be set with your consent.",
        },
      ],
    },
    {
      heading: "2. Cookies we use",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "We use only a small number of cookies, listed below.",
        },
        {
          // Rows sourced from app/legal/cookies.ts (single source of
          // truth shared with Privacy Policy section 11).
          type: "table",
          headers: ["Cookie", "Purpose", "Type", "Lifespan"],
          rows: cookieTableRows(),
        },
        {
          type: "p",
          text: "Every cookie we currently use is essential: it is strictly necessary to sign you in, keep you signed in, authenticate administrators, apply invitations, and run the in-app feedback and support tool. Under the Privacy and Electronic Communications Regulations (PECR) these may be set without consent. We do not use analytics, advertising, or third-party tracking cookies.",
        },
      ],
    },
    {
      heading: "3. Managing cookies",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "Because the cookies we use are essential, the app will not work correctly without them. You can still block or delete cookies through your browser settings, but if you block our essential cookies you may not be able to sign in or use the Service.",
        },
      ],
    },
    {
      heading: "4. If this changes",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "If in future we introduce any non-essential cookies (for example, analytics), we will not set them until you have given explicit consent through a cookie banner that lets you accept or reject them with equal prominence, and you will be able to change your choice at any time. We will update this policy before any such cookies are used.",
        },
      ],
    },
    {
      heading: "5. More information",
      level: 2,
      blocks: [
        {
          type: "p",
          text: "This Cookie Policy supports section 11 of our Privacy Policy, available at simpatient.co.uk/privacy. If you have questions about how we use cookies, contact us at hello@simpatient.co.uk.",
        },
      ],
    },
  ],
  contactBlock:
    "Questions about our use of cookies?\nEmail: hello@simpatient.co.uk",
};

// ---------------------------------------------------------------------
// Public exports
// ---------------------------------------------------------------------

export const LEGAL_DOCS: LegalDoc[] = [
  privacyPolicy,
  termsOfService,
  dpa,
  cookiePolicy,
];

export function getLegalDoc(slug: LegalDoc["slug"]): LegalDoc | undefined {
  return LEGAL_DOCS.find((doc) => doc.slug === slug);
}
