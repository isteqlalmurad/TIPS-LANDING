import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const FROM =
  process.env.DEMO_INQUIRY_FROM ||
  process.env.PRICING_INQUIRY_FROM ||
  "SimPatient Demo Requests <hello@simpatient.co.uk>";
const TO = parseRecipients(
  process.env.DEMO_INQUIRY_TO_EMAIL ||
    process.env.PRICING_INQUIRY_TO_EMAIL ||
    "hello@simpatient.co.uk"
);

function parseRecipients(value: string): string[] {
  return value
    .split(",")
    .map((addr) => addr.trim())
    .filter((addr) => addr.length > 0);
}

const MAX_LEN = {
  name: 120,
  email: 200,
  institution: 200,
  role: 120,
  programme: 200,
  timeline: 120,
  message: 2000,
};

type Payload = {
  name?: string;
  email?: string;
  institution?: string;
  role?: string;
  programme?: string;
  timeline?: string;
  message?: string;
  website?: string;
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

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX_LEN.name);
  const email = clean(body.email, MAX_LEN.email).toLowerCase();
  const institution = clean(body.institution, MAX_LEN.institution);
  const role = clean(body.role, MAX_LEN.role);
  const programme = clean(body.programme, MAX_LEN.programme);
  const timeline = clean(body.timeline, MAX_LEN.timeline);
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
  const subject = `Demo request from demo page — ${institution}`;

  const text = [
    "A new demo request has been submitted from the SimPatient demo page.",
    "",
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Institution: ${institution}`,
    `Role:        ${role}`,
    programme ? `Programme:   ${programme}` : null,
    timeline ? `Timeline:    ${timeline}` : null,
    "",
    message ? "What they want to see:" : null,
    message || null,
    "",
    "---",
    `Submitted: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #134E4A;">
      <h2 style="margin: 0 0 16px; font-size: 18px; color: #0E7490;">New demo request</h2>
      <p style="margin: 0 0 24px; font-size: 14px; color: #134E4A;">
        Submitted via the <strong>SimPatient demo page</strong>.
      </p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.5;">
        <tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6; width: 130px;">Name</td><td style="padding: 6px 0; font-weight: 500;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6;">Email</td><td style="padding: 6px 0; font-weight: 500;"><a href="mailto:${escapeHtml(email)}" style="color: #0891B2;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6;">Institution</td><td style="padding: 6px 0; font-weight: 500;">${escapeHtml(institution)}</td></tr>
        <tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6;">Role</td><td style="padding: 6px 0; font-weight: 500;">${escapeHtml(role)}</td></tr>
        ${programme ? `<tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6;">Programme</td><td style="padding: 6px 0; font-weight: 500;">${escapeHtml(programme)}</td></tr>` : ""}
        ${timeline ? `<tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6;">Timeline</td><td style="padding: 6px 0; font-weight: 500;">${escapeHtml(timeline)}</td></tr>` : ""}
      </table>
      ${message ? `<div style="margin-top: 24px; padding: 16px; background: #F0FDFA; border-left: 3px solid #22D3EE; border-radius: 4px;"><div style="font-size: 11px; color: #134E4A; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">What they want to see</div><div style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div></div>` : ""}
      <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E0F2FE; font-size: 12px; color: #134E4A; opacity: 0.5;">
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
      console.error("Resend error on demo inquiry:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your demo request. Please email hello@simpatient.co.uk directly." },
        { status: 502 }
      );
    }

    try {
      await resend.emails.send({
        from: FROM,
        to: [email],
        replyTo: TO[0],
        subject: "Thanks for requesting a SimPatient demo",
        text: buildConfirmText(name),
        html: buildConfirmHtml(name),
      });
    } catch (confirmErr) {
      console.error("Unexpected error sending demo confirmation:", confirmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending demo inquiry:", err);
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
    "Thanks for requesting a SimPatient demo. We've received your details and will come back with next steps shortly.",
    "",
    "If anything urgent comes up, reply to this email or write to hello@simpatient.co.uk.",
    "",
    "Warm regards,",
    "The SimPatient team",
  ].join("\n");
}

function buildConfirmHtml(name: string): string {
  const firstName = escapeHtml(name.split(/\s+/)[0] || name);
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #134E4A; background: #FFFFFF;">
      <h1 style="margin: 0 0 16px; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 500; line-height: 1.25; color: #134E4A;">
        Thanks, ${firstName}. We've got your demo request.
      </h1>
      <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.65; color: #134E4A;">
        Our team will review your details and come back with the best next step for your institution.
      </p>
      <p style="margin: 0; font-size: 13px; line-height: 1.6; color: rgba(19, 78, 74, 0.7);">
        Anything urgent? Reply to this email, or write to
        <a href="mailto:hello@simpatient.co.uk" style="color: #0891B2; text-decoration: underline;">hello@simpatient.co.uk</a>.
      </p>
    </div>
  `;
}
