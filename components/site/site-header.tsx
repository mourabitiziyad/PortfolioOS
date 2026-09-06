import Link from "next/link";

const navigation = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
  { label: "CV", href: "/CV.pdf" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-mark" href="/" aria-label="Ziyad Mourabiti, home">
        <span>ZM</span>
        <span className="site-mark-dot">.</span>
      </Link>
      <nav aria-label="Primary navigation" className="site-nav">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="os-link" href="/desktop/about">
        <span aria-hidden="true">●</span> Open PortfolioOS
      </Link>
    </header>
  );
}

