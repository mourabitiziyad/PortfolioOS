"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
  { label: "CV", href: "/CV.pdf", external: true },
  { label: "Email", href: "mailto:mourabitiziyad@gmail.com", external: true },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="site-mark" href="/" aria-label="Ziyad Mourabiti, home">
        <span>ZM</span>
        <span className="site-mark-dot">.</span>
      </Link>
      <nav aria-label="Primary navigation" className="site-nav">
        {navigation.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            aria-current={item.href.startsWith("/") && pathname === item.href ? "page" : undefined}
          >
            {item.label}
            {item.external ? (
              <span className="site-nav-external" aria-hidden="true">↗</span>
            ) : null}
          </Link>
        ))}
      </nav>
      <Link className="os-link" href="/desktop/about">
        <span aria-hidden="true">●</span> Open PortfolioOS
      </Link>
    </header>
  );
}
