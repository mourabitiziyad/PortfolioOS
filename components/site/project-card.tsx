import type { Project } from "@/lib/portfolio";
import { TextLink } from "./text-link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card-meta">
        <span>{project.org}</span>
        <span>{project.date}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.proof ? <p className="project-proof">{project.proof}</p> : null}
      <ul className="tag-list" aria-label={`${project.title} technologies and themes`}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {project.links.length ? (
        <div className="project-links">
          {project.links.map((link) => (
            <TextLink key={link.href} {...link} />
          ))}
        </div>
      ) : null}
    </article>
  );
}

