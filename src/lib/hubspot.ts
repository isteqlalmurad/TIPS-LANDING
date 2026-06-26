// src/lib/hubspot.ts
//
// Lightweight HubSpot CRM integration for website lead capture.
//
// On each demo / pricing form submission we (best-effort, never blocking the
// user-facing response):
//   1. Create or update a Contact (matched by email)
//   2. Create a Deal for that contact, placed in the first pipeline stage
//      ("New Inquiry"), and associate it with the contact
//   3. Log the raw inquiry details as a Note on the contact
//   4. Stamp a lead source ("Website demo form" / "Website pricing form")
//
// Everything here is DORMANT until HUBSPOT_ACCESS_TOKEN is set in the
// environment — with no token, syncLeadToHubspot() returns immediately and the
// forms behave exactly as before. So this is safe to ship before the HubSpot
// account exists.
//
// Required env (Private App token with scopes: crm.objects.contacts.write,
// crm.objects.deals.write, crm.objects.notes.write, and the read counterparts):
//   HUBSPOT_ACCESS_TOKEN          — the private-app token
// Optional env (sensible defaults; override once you know your HubSpot IDs):
//   HUBSPOT_PIPELINE_ID           — deal pipeline id (default: "default")
//   HUBSPOT_NEW_INQUIRY_STAGE_ID  — stage id for incoming leads ("New Inquiry")

const HUBSPOT_BASE = "https://api.hubapi.com";

const TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || "";
const PIPELINE_ID = process.env.HUBSPOT_PIPELINE_ID || "default";
const NEW_INQUIRY_STAGE_ID = process.env.HUBSPOT_NEW_INQUIRY_STAGE_ID || "";

export type LeadSource =
  | "Website demo form"
  | "Website pricing form"
  | "Website pilot form";

export interface Lead {
  name: string;
  email: string;
  institution: string;
  role: string;
  programme?: string;
  timeline?: string;
  cohortSize?: string;
  signOffContact?: string;
  message?: string;
  source: LeadSource;
}

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };
}

function splitName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

// Create or update a contact (HubSpot upserts by email via the dedicated
// idempotency endpoint). Returns the contact id, or null on failure.
async function upsertContact(lead: Lead): Promise<string | null> {
  const { firstname, lastname } = splitName(lead.name);
  const properties: Record<string, string> = {
    email: lead.email,
    firstname,
    lastname,
    company: lead.institution,
    jobtitle: lead.role,
    hs_lead_status: "NEW",
    // Standard analytics source field; the human-readable label goes in the note.
    hs_analytics_source: "OFFLINE",
  };

  // Try to create; if the contact already exists (409), update it instead.
  const createRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) {
    const json = (await createRes.json()) as { id: string };
    return json.id;
  }

  if (createRes.status === 409) {
    // Already exists — update by email idempotency key.
    const updateRes = await fetch(
      `${HUBSPOT_BASE}/crm/v3/objects/contacts/${encodeURIComponent(
        lead.email
      )}?idProperty=email`,
      {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ properties }),
      }
    );
    if (updateRes.ok) {
      const json = (await updateRes.json()) as { id: string };
      return json.id;
    }
    console.error("HubSpot contact update failed:", updateRes.status, await safeText(updateRes));
    return null;
  }

  console.error("HubSpot contact create failed:", createRes.status, await safeText(createRes));
  return null;
}

// Create a deal in the "New Inquiry" stage and associate it with the contact.
async function createDeal(lead: Lead, contactId: string): Promise<void> {
  const coreProperties: Record<string, string> = {
    dealname: `${lead.institution} — ${lead.name}`,
    pipeline: PIPELINE_ID,
    dealstage: NEW_INQUIRY_STAGE_ID,
  };

  // Omit dealstage if not configured, so HubSpot uses the pipeline's first stage.
  if (!NEW_INQUIRY_STAGE_ID) delete coreProperties.dealstage;

  // Custom deal properties so the inquiry detail is visible on the deal itself
  // (and can be added to the board card view). These internal names must match
  // the deal properties created in HubSpot (Settings → Properties → Deals). If
  // any don't exist, the create call fails and we retry with core fields only —
  // so the deal is always created either way.
  const customProperties: Record<string, string> = {
    lead_source: lead.source,
    institution: lead.institution,
    role: lead.role,
  };
  if (lead.programme) customProperties.programme__cohort = lead.programme;
  if (lead.timeline) customProperties.timeline = lead.timeline;
  if (lead.cohortSize) customProperties.cohort_size = lead.cohortSize;
  if (lead.signOffContact) customProperties.sign_off_contact = lead.signOffContact;
  if (lead.message) customProperties.inquiry_message = lead.message;

  const association = {
    to: { id: contactId },
    // 3 = the standard deal→contact association type id
    types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }],
  };

  // First attempt: core + custom properties.
  let res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/deals`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      properties: { ...coreProperties, ...customProperties },
      associations: [association],
    }),
  });

  // If the custom properties don't exist yet (400), fall back to core-only so a
  // deal is still created. Once the properties are added in HubSpot, the first
  // attempt succeeds and this fallback is never hit.
  if (res.status === 400) {
    console.error(
      "HubSpot deal create with custom properties failed (are the custom deal properties created?). Retrying with core fields.",
      await safeText(res)
    );
    res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/deals`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ properties: coreProperties, associations: [association] }),
    });
  }

  if (!res.ok) {
    console.error("HubSpot deal create failed:", res.status, await safeText(res));
  }
}

// Log the raw inquiry as a note on the contact.
async function logNote(lead: Lead, contactId: string): Promise<void> {
  const lines = [
    `Source: ${lead.source}`,
    `Institution: ${lead.institution}`,
    `Role: ${lead.role}`,
    lead.programme ? `Programme: ${lead.programme}` : null,
    lead.timeline ? `Timeline: ${lead.timeline}` : null,
    lead.cohortSize ? `Cohort size: ${lead.cohortSize}` : null,
    lead.signOffContact ? `Sign-off contact: ${lead.signOffContact}` : null,
    lead.message ? `\nMessage:\n${lead.message}` : null,
  ].filter(Boolean);

  const body = {
    properties: {
      hs_note_body: lines.join("\n"),
      hs_timestamp: Date.now().toString(),
    },
    associations: [
      {
        to: { id: contactId },
        // 202 = the standard note→contact association type id
        types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }],
      },
    ],
  };

  const res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/notes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("HubSpot note create failed:", res.status, await safeText(res));
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    return (await res.text()).slice(0, 500);
  } catch {
    return "(no body)";
  }
}

// Public entry point. Best-effort and non-throwing: any failure is logged and
// swallowed so it never affects the user-facing form response.
export async function syncLeadToHubspot(lead: Lead): Promise<void> {
  if (!TOKEN) return; // dormant until configured

  try {
    const contactId = await upsertContact(lead);
    if (!contactId) return;

    // Deal + note are independent; run them in parallel.
    await Promise.allSettled([createDeal(lead, contactId), logNote(lead, contactId)]);
  } catch (err) {
    console.error("Unexpected HubSpot sync error:", err);
  }
}
