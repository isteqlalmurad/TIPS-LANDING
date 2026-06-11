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
  const subject = `Demo request from demo page: ${institution}`;

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
        subject: "Thank you for your interest in SimPatient",
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
    "Thank you very much for taking an interest in our research and product.",
    "",
    "I will get back to you within 24 hours. In the meantime, please do let me know what times would work best for you. If you could list a few, that would be a great help.",
    "",
    "Best wishes,",
    "Andrew O'Malley",
    "Founder of SimPatient and Deputy Programme Director of ScotGEM",
  ].join("\n");
}

function buildConfirmHtml(name: string): string {
  const firstName = escapeHtml(name.split(/\s+/)[0] || name);

  // Logo header — icon + "SimPatient" wordmark lockup. Table layout so the two
  // sit side by side reliably in Outlook. Rendered only when a URL is set.
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

  // Founder avatar — a small round photo beside the signature. Falls back to a
  // text-only signature when no URL is configured.
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
        Thank you very much for taking an interest in our research and product.
      </p>
      <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.7; color: #0E1A24;">
        I will get back to you within 24 hours. In the meantime, please do let me
        know what times would work best for you. If you could list a few, that
        would be a great help.
      </p>
      <p style="margin: 0 0 8px; font-size: 15px; line-height: 1.6; color: #0E1A24;">
        Best wishes,
      </p>
      ${signature}
    </div>
  `;
}
