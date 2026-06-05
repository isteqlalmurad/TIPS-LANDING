"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#product", label: "Product" },
  { href: "#research", label: "Research" },
  { href: "#educators", label: "Educators" },
  { href: "/sp-quote", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--v2-paper)",
        borderBottom: scrolled ? "1px solid var(--v2-rule)" : "1px solid transparent",
        transition: "border-color 200ms ease",
      }}
    >
      <div
        className="v2-container"
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <Link href="/v2" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/logo/SimLogo-dark.png"
            alt="SimPatient"
            width={120}
            height={28}
            style={{ height: 22, width: "auto" }}
            priority
          />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: 14,
                color: "var(--v2-ink)",
                fontWeight: 500,
                textDecoration: "none",
              }}
              className="v2-nav-link"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="https://app.simpatient.co.uk"
            style={{ fontSize: 14, color: "var(--v2-ink-muted)", textDecoration: "none" }}
          >
            Sign in
          </Link>
          <Link href="/book-demo" className="v2-btn v2-btn-primary" style={{ height: 40, padding: "0 16px", fontSize: 14 }}>
            Book a demo
          </Link>
        </div>
      </div>
    </header>
  );
}
