import Link from "next/link";
import { profile, socialLinks } from "@/lib/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Built by {profile.name}, somewhere between Morocco and Germany.</p>
      <div>
        {socialLinks.map((link) => (
          <Link href={link.href} key={link.href} target="_blank" rel="noreferrer">
            {link.label}<span className="sr-only"> (opens in a new tab)</span>
          </Link>
        ))}
      </div>
    </footer>
  );
}

