"use client";

import { motion } from "framer-motion";
import { Users, Link2, ShieldCheck, KeyRound, Infinity as InfinityIcon, History, type LucideIcon } from "lucide-react";

const row1 = [
  { icon: Users, title: "Groups", body: "Strict cohort isolation. A learner only sees scenarios assigned to one of their groups." },
  { icon: Link2, title: "Invite links", body: "Multi-redeemer by default, single-use available, role-bound, expiry-bound, anonymous-redemption flag." },
  { icon: KeyRound, title: "Plain-English roles", body: "super_admin · org_owner · org_admin · author · learner. No JIRA needed to figure out who can do what." },
];

const row2 = [
  { icon: ShieldCheck, title: "SSO", body: "Microsoft Entra (Azure AD) and Google. Find-only on sign-in: accounts created via invite, never from arbitrary OAuth." },
  { icon: InfinityIcon, title: "No learner cap", body: "Invite the whole programme. Pricing is per-organisation, not per-seat." },
  { icon: History, title: "Audit trail", body: "Every credit allocation, deduction, and persona deletion logged. Persona-name snapshots preserve learner history." },
];

function Tile({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div
      style={{
        padding: 28,
        background: "var(--v2-paper)",
        border: "1px solid var(--v2-rule)",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Icon size={20} strokeWidth={1.5} color="var(--v2-cyan-deep)" />
      <h3 style={{ fontSize: 21, fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>{title}</h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--v2-ink-muted)", margin: 0 }}>{body}</p>
    </div>
  );
}

export function MultiTenant() {
  return (
    <section className="v2-section" style={{ borderTop: "1px solid var(--v2-rule)" }}>
      <div className="v2-container">
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>
            Multi-tenant architecture
          </p>
          <h2
            style={{
              fontSize: "var(--v2-text-display-lg)",
              fontWeight: 400,
              margin: 0,
              marginBottom: 24,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            Built for institutions,{" "}
            <em style={{ fontStyle: "italic", color: "var(--v2-cyan-deep)" }}>not individuals.</em>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 20 }}
          className="v2-mt-grid"
        >
          {row1.map((t) => (
            <Tile key={t.title} {...t} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          className="v2-mt-grid"
        >
          {row2.map((t) => (
            <Tile key={t.title} {...t} />
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .v2-mt-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
