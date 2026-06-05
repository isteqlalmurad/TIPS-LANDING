"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/research", label: "Research" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  {
    href: "https://andrewomalley.substack.com/",
    label: "AI x MedEd",
    external: true,
  },
];

export function NavBarV3() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          paddingLeft: "clamp(24px, 6vw, 96px)",
          paddingRight: "clamp(24px, 6vw, 96px)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <Image
            src="/logo/SimLogo.png"
            alt=""
            width={120}
            height={28}
            style={{
              height: 28,
              width: "auto",
              filter: "brightness(0) invert(1)",
            }}
            priority
          />
          <span
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: 20,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            SimPatient
          </span>
        </Link>

        <nav className="v3-nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map((l) => {
            const style = {
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.85)",
              fontWeight: 500,
              textDecoration: "none",
            } as const;
            return l.external ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={style}
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} style={style}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/book-demo"
            style={{
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.95)",
              padding: "8px 16px",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              borderRadius: 4,
              textDecoration: "none",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            Book a demo
          </Link>
        </div>
      </div>

      <style jsx>{`
        /* Mobile: hide the middle nav links. The logo + Book a demo button remain. */
        @media (max-width: 768px) {
          :global(.v3-nav-links) {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
