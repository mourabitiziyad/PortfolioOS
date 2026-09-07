import Link from "next/link";
import { profile, proofPoints } from "@/lib/portfolio";

export default function Page() {
  return (
    <section className="os-welcome" aria-labelledby="os-welcome-title">
      <div className="os-welcome-main">
        <div className="os-welcome-kicker">
          <span className="os-status-dot" aria-hidden="true" />
          PortfolioOS · updated September 2026
        </div>
        <h1 id="os-welcome-title">{profile.name}</h1>
        <p className="os-welcome-role">{profile.role}</p>
        <p className="os-welcome-copy">{profile.introduction}</p>
        <div className="os-welcome-actions">
          <Link href="/desktop/projects" className="os-primary-action">
            Open selected work <span aria-hidden="true">→</span>
          </Link>
          <Link href="/desktop/CV" className="os-secondary-action">
            View CV
          </Link>
        </div>
      </div>

      <dl className="os-welcome-facts">
        {proofPoints.map((point, index) => (
          <div key={point.label}>
            <dt>{String(index + 1).padStart(2, "0")} · {point.label}</dt>
            <dd>{point.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
