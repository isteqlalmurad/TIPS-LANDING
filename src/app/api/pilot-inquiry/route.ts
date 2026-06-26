import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { syncLeadToHubspot } from "@/lib/hubspot";
import { resolveRecipients } from "@/lib/recipients";

const FROM =
  process.env.PILOT_INQUIRY_FROM ||
  process.env.DEMO_INQUIRY_FROM ||
  process.env.PRICING_INQUIRY_FROM ||
  "SimPatient Pilot Requests <hello@simpatient.co.uk>";
const TO = resolveRecipients(
  process.env.PILOT_INQUIRY_TO_EMAIL ||
    process.env.DEMO_INQUIRY_TO_EMAIL ||
    process.env.PRICING_INQUIRY_TO_EMAIL ||
    "hello@simpatient.co.uk"
);

// Public https:// image URLs for the confirmation email. Email clients cannot
// use relative paths or Next's image optimizer, so these must be fully-qualified
// (e.g. Firebase Storage download URLs). Leave blank to omit the image entirely —
// the email still reads correctly via the text fallbacks.
const EMAIL_LOGO_URL =
  process.env.EMAIL_LOGO_URL ||
  "https://firebasestorage.googleapis.com/v0/b/tips-db-48de3.firebasestorage.app/o/profile-images%2FSimP_Black.png?alt=media&token=04a1dcc4-f21b-435b-87e2-661182fcfdbb";
const EMAIL_FOUNDER_PHOTO_URL =
  process.env.EMAIL_FOUNDER_PHOTO_URL ||
  "https://firebasestorage.googleapis.com/v0/b/tips-db-48de3.firebasestorage.app/o/profile-images%2FAndrew%20Omalley.png?alt=media&token=65bac3a7-db68-4128-b7f0-f0acbec37a2f";

const MAX_LEN = {
  name: 120,
  email: 200,
  institution: 200,
  role: 120,
  cohortSize: 40,
  courseBlock: 200,
  startDate: 120,
  signOffContact: 200,
  message: 2000,
};

type Payload = {
  name?: string;
  email?: string;
  institution?: string;
  role?: string;
  cohortSize?: string;
  courseBlock?: string;
  startDate?: string;
  signOffContact?: string;
  message?: string;
  website?: string; // honeypot
};

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isLikelyEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: Payload;

  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  // Honeypot — silently succeed so bots don't iterate
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX_LEN.name);
  const email = clean(body.email, MAX_LEN.email).toLowerCase();
  const institution = clean(body.institution, MAX_LEN.institution);
  const role = clean(body.role, MAX_LEN.role);
  const cohortSize = clean(body.cohortSize, MAX_LEN.cohortSize);
  const courseBlock = clean(body.courseBlock, MAX_LEN.courseBlock);
  const startDate = clean(body.startDate, MAX_LEN.startDate);
  const signOffContact = clean(body.signOffContact, MAX_LEN.signOffContact);
  const message = clean(body.message, MAX_LEN.message);

  if (!name || !email || !institution || !role) {
    return NextResponse.json(
      { ok: false, error: "Please fill in name, email, institution, and role." },
      { status: 400 }
    );
  }

  if (!isLikelyEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address looks invalid." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY missing in environment");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = `Pilot request: ${institution}`;

  const text = [
    "A new pilot request has been submitted on simpatient.co.uk",
    "",
    `Name:          ${name}`,
    `Email:         ${email}`,
    `Institution:   ${institution}`,
    `Role:          ${role}`,
    cohortSize ? `Cohort size:   ${cohortSize}` : null,
    courseBlock ? `Course/block:  ${courseBlock}` : null,
    startDate ? `Target start:  ${startDate}` : null,
    signOffContact ? `Sign-off:      ${signOffContact}` : null,
    "",
    message ? "Additional notes:" : null,
    message || null,
    "",
    "Lead added to the pipeline on HubSpot.",
    "",
    "---",
    `Submitted: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const labelCell =
    "padding: 8px 0; color: #4A5664; font-size: 13px; width: 140px; vertical-align: top;";
  const valueCell =
    "padding: 8px 0; color: #0E1A24; font-size: 14px; font-weight: 500; vertical-align: top;";

  const html = `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 24px; color: #0E1A24; background: #FAF8F4;">
      <p style="margin: 0 0 8px; font-size: 12px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #4A5664;">
        New pilot request
      </p>
      <h2 style="margin: 0 0 24px; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 500; line-height: 1.25; color: #0E1A24;">
        ${escapeHtml(institution)}
      </h2>
      <table style="width: 100%; border-collapse: collapse; line-height: 1.5;">
        <tr><td style="${labelCell}">Name</td><td style="${valueCell}">${escapeHtml(name)}</td></tr>
        <tr><td style="${labelCell}">Email</td><td style="${valueCell}"><a href="mailto:${escapeHtml(email)}" style="color: #075A75; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="${labelCell}">Institution</td><td style="${valueCell}">${escapeHtml(institution)}</td></tr>
        <tr><td style="${labelCell}">Role</td><td style="${valueCell}">${escapeHtml(role)}</td></tr>
        ${cohortSize ? `<tr><td style="${labelCell}">Cohort size</td><td style="${valueCell}">${escapeHtml(cohortSize)}</td></tr>` : ""}
        ${courseBlock ? `<tr><td style="${labelCell}">Course / block</td><td style="${valueCell}">${escapeHtml(courseBlock)}</td></tr>` : ""}
        ${startDate ? `<tr><td style="${labelCell}">Target start date</td><td style="${valueCell}">${escapeHtml(startDate)}</td></tr>` : ""}
        ${signOffContact ? `<tr><td style="${labelCell}">Sign-off contact</td><td style="${valueCell}">${escapeHtml(signOffContact)}</td></tr>` : ""}
      </table>
      ${message ? `<div style="margin-top: 24px; padding: 16px 18px; background: #EDF8FB; border-left: 3px solid #0891B2; border-radius: 4px;"><div style="font-size: 11px; color: #4A5664; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">Additional notes</div><div style="font-size: 14px; line-height: 1.6; color: #0E1A24; white-space: pre-wrap;">${escapeHtml(message)}</div></div>` : ""}
      <p style="margin-top: 28px; padding: 12px 16px; background: #F3F0E8; border: 1px solid #E5E1D8; border-radius: 4px; font-size: 13px; color: #4A5664;">
        ✓ Lead added to the pipeline on HubSpot.
      </p>
      <p style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #E5E1D8; font-size: 12px; color: #8A93A0;">
        Submitted ${new Date().toUTCString()}
      </p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error on pilot inquiry:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your pilot request. Please email hello@simpatient.co.uk directly." },
        { status: 502 }
      );
    }

    try {
      await resend.emails.send({
        from: FROM,
        to: [email],
        replyTo: TO[0],
        subject: "Your SimPatient pilot request",
        text: buildConfirmText(name),
        html: buildConfirmHtml(name),
      });
    } catch (confirmErr) {
      console.error("Unexpected error sending pilot confirmation:", confirmErr);
    }

    // Best-effort CRM sync. Dormant unless HUBSPOT_ACCESS_TOKEN is set; never
    // blocks or fails the form response.
    try {
      await syncLeadToHubspot({
        name,
        email,
        institution,
        role,
        programme: courseBlock,
        timeline: startDate,
        cohortSize,
        signOffContact,
        message,
        source: "Website pilot form",
      });
    } catch (crmErr) {
      console.error("Unexpected error syncing pilot lead to HubSpot:", crmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending pilot inquiry:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function buildConfirmText(name: string): string {
  const firstName = name.split(/\s+/)[0] || name;
  return [
    `Hi ${firstName},`,
    "",
    "Thanks for requesting a pilot of SimPatient.",
    "",
    "A pilot runs for 4 weeks with a single cohort. We'll help you set up your org, import your existing marking scheme, and at the end share a written report measuring usage, learner sentiment, and rubric performance.",
    "",
    "I will get back to you within 24 hours to confirm scope and a start date.",
    "",
    "If anything urgent comes up, just reply to this email or write to hello@simpatient.co.uk and we'll come straight back to you.",
    "",
    "Best wishes,",
    "Andrew O'Malley",
    "Founder of SimPatient and Deputy Programme Director of ScotGEM",
  ].join("\n");
}

function buildConfirmHtml(name: string): string {
  const firstName = escapeHtml(name.split(/\s+/)[0] || name);

  const logoHeader = EMAIL_LOGO_URL
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 28px;">
        <tr>
          <td style="vertical-align: middle; padding-right: 12px;">
            <img src="${EMAIL_LOGO_URL}" alt="" width="40" height="40" style="display: block; width: 40px; height: 40px;" />
          </td>
          <td style="vertical-align: middle;">
            <span style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 22px; font-weight: 600; letter-spacing: -0.01em; color: #0E1A24;">SimPatient</span>
          </td>
        </tr>
      </table>`
    : "";

  const signature = EMAIL_FOUNDER_PHOTO_URL
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 4px 0 0;">
        <tr>
          <td style="vertical-align: middle; padding-right: 14px;">
            <img src="${EMAIL_FOUNDER_PHOTO_URL}" alt="Andrew O'Malley" width="56" height="56" style="display: block; width: 56px; height: 56px; border-radius: 50%; object-fit: cover;" />
          </td>
          <td style="vertical-align: middle;">
            <span style="font-size: 15px; font-weight: 600; color: #0E1A24;">Andrew O&rsquo;Malley</span><br />
            <span style="font-size: 14px; color: #4A5664;">Founder of SimPatient and Deputy Programme Director of ScotGEM</span>
          </td>
        </tr>
      </table>`
    : `
      <p style="margin: 4px 0 0; font-size: 15px; line-height: 1.5; color: #0E1A24;">
        <strong style="font-weight: 600;">Andrew O&rsquo;Malley</strong><br />
        <span style="color: #4A5664;">Founder of SimPatient and Deputy Programme Director of ScotGEM</span>
      </p>`;

  return `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #0E1A24; background: #FAF8F4;">
      ${logoHeader}
      <h1 style="margin: 0 0 20px; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 500; line-height: 1.3; color: #0E1A24;">
        Hi ${firstName},
      </h1>
      <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.7; color: #0E1A24;">
        Thanks for requesting a pilot of SimPatient.
      </p>
      <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.7; color: #0E1A24;">
        A pilot runs for 4 weeks with a single cohort. We&rsquo;ll help you set up
        your org, import your existing marking scheme, and at the end share a
        written report measuring usage, learner sentiment, and rubric performance.
      </p>
      <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.7; color: #0E1A24;">
        I will get back to you within 24 hours to confirm scope and a start date.
      </p>
      <p style="margin: 0 0 8px; font-size: 15px; line-height: 1.6; color: #0E1A24;">
        Best wishes,
      </p>
      ${signature}
    </div>
  `;
}
