import Link from "next/link";
import { Clock } from "./clock";
import { profile, socialLinks } from "@/lib/portfolio";

export function NavBar() {
  const github = socialLinks.find((link) => link.label === "GitHub");
  const linkedin = socialLinks.find((link) => link.label === "LinkedIn");

  return (
    <div className="os-menu-bar">
      <div className="os-menu-brand">
        <Link href="/desktop" className="os-home-link">
          <span className="os-brand-mark" aria-hidden="true">ZM</span>
          <span>PortfolioOS</span>
        </Link>
        <span className="os-menu-version">2026.09</span>
      </div>

      <nav className="os-menu-links" aria-label="PortfolioOS links">
        <Link href="/">Main site</Link>
        {github ? (
          <a href={github.href} target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        {linkedin ? (
          <a href={linkedin.href} target="_blank" rel="noopener noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        <a href={`mailto:${profile.email}`}>Email <span aria-hidden="true">↗</span></a>
      </nav>

      <Clock className="os-menu-clock" />
    </div>
  );
}
