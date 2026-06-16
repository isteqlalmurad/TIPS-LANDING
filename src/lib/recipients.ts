// src/lib/recipients.ts
//
// Resolves the team notification recipient list for the inquiry forms, with a
// test-mode exclusion so we don't email certain people during local/preview
// testing — they're only included on the real production deployment.
//
// TEST_EXCLUDE_EMAILS (optional, comma-separated): addresses to drop from the
// recipient list whenever NODE_ENV !== "production". Defaults to Andrew's
// address so test runs don't reach him; production sends to everyone.

const TEST_EXCLUDE_EMAILS =
  process.env.TEST_EXCLUDE_EMAILS || "aso2@st-andrews.ac.uk";

function parse(value: string): string[] {
  return value
    .split(",")
    .map((addr) => addr.trim())
    .filter((addr) => addr.length > 0);
}

// Parse a comma-separated recipient string into an array, removing the
// test-exclude addresses when not running in production.
export function resolveRecipients(value: string): string[] {
  const all = parse(value);
  if (process.env.NODE_ENV === "production") return all;

  const exclude = new Set(parse(TEST_EXCLUDE_EMAILS).map((e) => e.toLowerCase()));
  return all.filter((addr) => !exclude.has(addr.toLowerCase()));
}
