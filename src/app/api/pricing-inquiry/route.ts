import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/pricing-inquiry
 *
 * Receives a pricing-inquiry form submission and emails it to the configured
 * recipient via Resend. Uses the same sending identity as the main SimPatient
 * product app (hello@simpatient.co.uk).
 *
 * Anti-spam: a `website` honeypot field MUST be empty. Bots fill every input
 * they see; real users never see this one. ~80% spam rejection with zero UX cost.
 */

const FROM =
  process.env.PRICING_INQUIRY_FROM ||
  "SimPatient Inquiries <hello@simpatient.co.uk>";
const TO = parseRecipients(
  process.env.PRICING_INQUIRY_TO_EMAIL || "hello@simpatient.co.uk"
);

function parseRecipients(value: string): string[] {
  return value
    .split(",")
    .map((addr) => addr.trim())
    .filter((addr) => addr.length > 0);
}
const CALENDLY_URL =
  process.env.SIMPATIENT_CALENDLY_URL ||
  "https://calendly.com/hello-simpatient/simpatient-meeting";

// Soft caps — anything beyond these is almost certainly malicious
const MAX_LEN = {
  name: 120,
  email: 200,
  institution: 200,
  role: 100,
  cohortSize: 40,
  message: 2000,
};

type Payload = {
  name?: string;
  email?: string;
  institution?: string;
  role?: string;
  cohortSize?: string;
  message?: string;
  website?: string; // honeypot
};

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isLikelyEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string): string {
  return s
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

  const subject = `Pricing inquiry — ${institution}`;

  // Plain-text body for the email
  const text = [
    "A new pricing inquiry has been submitted on simpatient.co.uk",
    "",
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Institution: ${institution}`,
    `Role:        ${role}`,
    cohortSize ? `Cohort size: ${cohortSize}` : null,
    "",
    message ? "Message:" : null,
    message || null,
    "",
    "---",
    `Submitted: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  // HTML body — clean structured table styled for readability
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #134E4A;">
      <h2 style="margin: 0 0 16px; font-size: 18px; color: #0E7490;">New pricing inquiry</h2>
      <p style="margin: 0 0 24px; font-size: 14px; color: #134E4A;">
        Submitted via the SimPatient pricing form.
      </p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.5;">
        <tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6; width: 130px;">Name</td><td style="padding: 6px 0; font-weight: 500;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6;">Email</td><td style="padding: 6px 0; font-weight: 500;"><a href="mailto:${escapeHtml(email)}" style="color: #0891B2;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6;">Institution</td><td style="padding: 6px 0; font-weight: 500;">${escapeHtml(institution)}</td></tr>
        <tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6;">Role</td><td style="padding: 6px 0; font-weight: 500;">${escapeHtml(role)}</td></tr>
        ${cohortSize ? `<tr><td style="padding: 6px 0; color: #134E4A; opacity: 0.6;">Cohort size</td><td style="padding: 6px 0; font-weight: 500;">${escapeHtml(cohortSize)}</td></tr>` : ""}
      </table>
      ${message ? `<div style="margin-top: 24px; padding: 16px; background: #F0FDFA; border-left: 3px solid #22D3EE; border-radius: 4px;"><div style="font-size: 11px; color: #134E4A; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">Message</div><div style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div></div>` : ""}
      <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E0F2FE; font-size: 12px; color: #134E4A; opacity: 0.5;">
        Submitted ${new Date().toUTCString()}
      </p>
    </div>
  `;

  try {
    // 1) Notify the SimPatient team. This MUST succeed.
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error on pricing inquiry:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your inquiry. Please email hello@simpatient.co.uk directly." },
        { status: 502 }
      );
    }

    // 2) Send a confirmation email to the submitter (best-effort).
    // We don't block on this — if it fails the user still gets the success
    // response because their inquiry already reached the team.
    try {
      const confirmText = buildConfirmText(name);
      const confirmHtml = buildConfirmHtml(name);
      const { error: confirmError } = await resend.emails.send({
        from: FROM,
        to: [email],
        replyTo: TO[0],
        subject: "Thanks for reaching out to SimPatient",
        text: confirmText,
        html: confirmHtml,
      });
      if (confirmError) {
        console.error("Resend error sending confirmation to submitter:", confirmError);
      }
    } catch (confirmErr) {
      console.error("Unexpected error sending submitter confirmation:", confirmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending pricing inquiry:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/* ─── Submitter confirmation email ─────────────────────────────────────── */

function buildConfirmText(name: string): string {
  const firstName = name.split(/\s+/)[0] || name;
  return [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to SimPatient. We've received your pricing inquiry and our team will get back to you within one working day with a costed proposal tailored to your cohort.",
    "",
    "In the meantime, if you'd like to see SimPatient in action you can book a live demo directly here:",
    CALENDLY_URL,
    "",
    "If anything urgent comes up, just reply to this email or write to hello@simpatient.co.uk and we'll come straight back to you.",
    "",
    "Warm regards,",
    "The SimPatient team",
    "https://simpatient.co.uk",
  ].join("\n");
}

function buildConfirmHtml(name: string): string {
  const firstName = escapeHtml(name.split(/\s+/)[0] || name);
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #134E4A; background: #FFFFFF;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 500; color: #0E7490; letter-spacing: -0.01em;">SimPatient</div>
      </div>

      <h1 style="margin: 0 0 16px; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 500; line-height: 1.25; color: #134E4A; letter-spacing: -0.01em;">
        Thanks, ${firstName}. We've got your inquiry.
      </h1>

      <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.65; color: #134E4A;">
        Our team will come back to you <strong>within one working day</strong> with a costed proposal tailored to your cohort, timeline, and what you're trying to solve.
      </p>

      <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.65; color: #134E4A;">
        In the meantime, if you'd like to see SimPatient in action, you can book a live 30-minute demo at a time that suits you:
      </p>

      <div style="text-align: center; margin: 28px 0 32px;">
        <a href="${escapeHtml(CALENDLY_URL)}"
           style="display: inline-block; padding: 14px 28px; background: #0891B2; color: #FFFFFF; text-decoration: none; font-size: 15px; font-weight: 500; border-radius: 10px; letter-spacing: 0.01em; box-shadow: 0 6px 16px rgba(8, 145, 178, 0.25);">
          Book a demo →
        </a>
      </div>

      <p style="margin: 0 0 8px; font-size: 13px; line-height: 1.6; color: rgba(19, 78, 74, 0.7);">
        Anything urgent? Just reply to this email, or write to
        <a href="mailto:hello@simpatient.co.uk" style="color: #0891B2; text-decoration: underline;">hello@simpatient.co.uk</a>
        and we'll come straight back to you.
      </p>

      <p style="margin: 32px 0 0; padding-top: 20px; border-top: 1px solid #E0F2FE; font-size: 13px; line-height: 1.6; color: #134E4A;">
        Warm regards,<br>
        <strong>The SimPatient team</strong>
      </p>

      <p style="margin: 24px 0 0; font-size: 11px; color: rgba(19, 78, 74, 0.45); text-align: center;">
        SimPatient · AI-simulated communication training for medical education<br>
        <a href="https://simpatient.co.uk" style="color: rgba(19, 78, 74, 0.55); text-decoration: none;">simpatient.co.uk</a>
      </p>
    </div>
  `;
}
