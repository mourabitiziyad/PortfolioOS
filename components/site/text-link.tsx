import Link from "next/link";
import type { PortfolioLink } from "@/lib/portfolio";

type TextLinkProps = PortfolioLink & { className?: string };

export function TextLink({ label, href, external, className }: TextLinkProps) {
  return (
    <Link
      className={className ? `text-link ${className}` : "text-link"}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{label}</span>
      <span aria-hidden="true">{external ? "↗" : "→"}</span>
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </Link>
  );
}

