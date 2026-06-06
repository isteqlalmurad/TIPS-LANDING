"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/research", label: "Research" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  {
    href: "https://andrewomalley.substack.com/",
    label: "Substack",
    external: true,
  },
];

const linkStyle = {
  fontSize: 14,
  color: "rgba(255, 255, 255, 0.85)",
  fontWeight: 500,
  textDecoration: "none",
} as const;

function NavLink({
  href,
  label,
  external,
  style,
  onClick,
}: {
  href: string;
  label: string;
  external?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const merged = { ...linkStyle, ...style };
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" style={merged} onClick={onClick}>
      {label}
    </a>
  ) : (
    <Link href={href} style={merged} onClick={onClick}>
      {label}
    </Link>
  );
}

export function NavBarV3() {
  const [open, setOpen] = useState(false);

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
          onClick={() => setOpen(false)}
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

        {/* Right-aligned cluster: nav links sit close to the Book a demo button */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <nav className="v3-nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} external={l.external} />
            ))}
          </nav>

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

          {/* Hamburger: only visible on mobile, sits next to Book a demo */}
          <button
            type="button"
            className="v3-nav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              padding: 0,
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            <span aria-hidden="true" className="v3-burger-icon" data-open={open} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <nav
          className="v3-mobile-menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 4,
            margin: "0 clamp(24px, 6vw, 96px)",
            padding: "12px 0",
            background: "rgba(14, 26, 36, 0.96)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 8,
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              label={l.label}
              external={l.external}
              onClick={() => setOpen(false)}
              style={{ padding: "12px 20px", fontSize: 15 }}
            />
          ))}
        </nav>
      )}

      <style jsx>{`
        /* Burger icon: three lines that morph to an X when open */
        .v3-burger-icon,
        .v3-burger-icon::before,
        .v3-burger-icon::after {
          display: block;
          width: 18px;
          height: 2px;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 2px;
          transition: transform 200ms ease, opacity 200ms ease;
        }
        .v3-burger-icon {
          position: relative;
        }
        .v3-burger-icon::before,
        .v3-burger-icon::after {
          content: "";
          position: absolute;
          left: 0;
        }
        .v3-burger-icon::before {
          top: -6px;
        }
        .v3-burger-icon::after {
          top: 6px;
        }
        .v3-burger-icon[data-open="true"] {
          background: transparent;
        }
        .v3-burger-icon[data-open="true"]::before {
          transform: translateY(6px) rotate(45deg);
        }
        .v3-burger-icon[data-open="true"]::after {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* Mobile: hide the inline text links, show the burger + dropdown. */
        @media (max-width: 768px) {
          :global(.v3-nav-links) {
            display: none !important;
          }
          :global(.v3-nav-burger) {
            display: inline-flex !important;
          }
          :global(.v3-mobile-menu) {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
