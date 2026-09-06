import type { FeaturedWork } from "@/lib/portfolio";
import { TextLink } from "./text-link";

export function FeaturedCaseStudy({
  work,
  index,
}: {
  work: FeaturedWork;
  index: number;
}) {
  return (
    <article className={`case-study case-study-${work.tone}`} id={work.id}>
      <div className="case-study-number" aria-hidden="true">
        0{index + 1}
      </div>
      <div className="case-study-intro">
        <p className="eyebrow">{work.eyebrow}</p>
        <h3>{work.title}</h3>
        <p className="case-study-summary">{work.summary}</p>
        <ul className="tag-list" aria-label={`${work.title} technologies and themes`}>
          {work.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className="case-study-details">
        <div>
          <p className="detail-label">Context</p>
          <p>{work.context}</p>
        </div>
        <div>
          <p className="detail-label">My contribution</p>
          <p>{work.contribution}</p>
        </div>
        <div>
          <p className="detail-label">Outcome</p>
          <p>{work.outcome}</p>
        </div>
        <div className="case-study-links">
          {work.links.map((link) => (
            <TextLink key={link.href} {...link} />
          ))}
        </div>
      </div>
    </article>
  );
}

