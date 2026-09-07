import { Window } from "@/components/window";
import { capabilityGroups, featuredWork, nowItems, profile, projects } from "@/lib/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";

function ViewHeader({ eyebrow, title, intro }: Readonly<{
  eyebrow: string;
  title: string;
  intro: string;
}>) {
  return (
    <header className="os-view-header">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{intro}</span>
    </header>
  );
}

function Capabilities() {
  return (
    <section className="os-capabilities" aria-labelledby="capabilities-title">
      <h2 id="capabilities-title">Capabilities</h2>
      <div className="os-capability-grid">
        {capabilityGroups.map((group) => (
          <div className="os-capability-card" key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <Window>
      <div className="os-view">
        <ViewHeader
          eyebrow="Stack"
          title="Tools I use to ship reliable software."
          intro="A practical mix of product engineering, platform systems, and applied AI."
        />
        <Capabilities />
      </div>
    </Window>
  );
}

const projectsData = [
  ...featuredWork.map((project) => ({
    title: project.title,
    org: project.eyebrow,
    date: project.id === "sap-built-in-support" ? "Current" : "2025–2026",
    description: project.summary,
    proof: project.outcome,
    tags: project.tags,
    links: project.links,
  })),
  ...projects.map((project) => ({
    ...project,
    proof: project.proof ?? "",
  })),
];

function Projects() {
  return (
    <Window>
      <div className="os-view">
        <ViewHeader
          eyebrow="Work"
          title="Selected work, from platforms to applied AI."
          intro="A compact archive of the systems, research, and products I have built."
        />
        <ul className="os-project-list">
          {projectsData.map((project, index) => (
            <li key={project.title} className="os-project-card">
              <div className="os-project-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="os-project-copy">
                <div className="os-project-meta">
                  <span>{project.org}</span>
                  <time>{project.date}</time>
                </div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {project.proof ? <p className="os-project-proof">{project.proof}</p> : null}
                <ul className="os-tag-list" aria-label={`${project.title} technologies and themes`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                {project.links.length ? (
                  <div className="os-project-links">
                    {project.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label} <span aria-hidden="true">{link.external ? "↗" : "→"}</span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

function Cv() {
  return (
    <Window>
      <div className="os-cv">
        <div className="os-cv-toolbar">
          <div>
            <span>PDF · updated 2026</span>
            <strong>Ziyad Mourabiti — CV</strong>
          </div>
          <Link href="/CV.pdf" target="_blank" rel="noopener noreferrer">
            Open PDF <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <object data="/CV.pdf" type="application/pdf" aria-label="Ziyad Mourabiti CV">
          <p>
            The embedded preview is unavailable.{" "}
            <Link href="/CV.pdf" target="_blank" rel="noopener noreferrer">Open the CV as a PDF.</Link>
          </p>
        </object>
      </div>
    </Window>
  );
}

function About() {
  return (
    <Window>
      <article className="os-view os-about">
        <ViewHeader
          eyebrow="About"
          title="Salam, I’m Ziyad."
          intro={profile.role}
        />
        <div className="os-about-grid">
          <div className="os-about-copy">
            <p className="os-lead">
              I work across product, platform, and data—turning complex systems into software people can understand and trust.
            </p>
            <p>
              At SAP, I build Built-In Support and own features from planning and threat modeling through implementation. I earned an MSc in Data Engineering &amp; Analytics from TUM in 2025; my thesis studied generative super-resolution for satellite-based solar mapping.
            </p>
            <p>
              Before that, I studied computer science and communication at Al Akhawayn, taught database systems, and built software for university and public-sector teams.
            </p>
            <p>
              Outside work, I follow Liverpool and the Atlas Lions, play chess, FIFA, and Smash Bros, and keep hip-hop in rotation.
            </p>
          </div>
          <aside className="os-about-side" aria-label="Profile details">
            <dl>
              <div>
                <span aria-hidden="true">01</span>
                <div>
                  <dt>Location</dt>
                  <dd>Morocco ↔ Germany</dd>
                </div>
              </div>
              <div>
                <span aria-hidden="true">02</span>
                <div>
                  <dt>Building</dt>
                  <dd>SAP Built-In Support</dd>
                </div>
              </div>
              <div>
                <span aria-hidden="true">03</span>
                <div>
                  <dt>Education</dt>
                  <dd>MSc Data Engineering &amp; Analytics · TUM</dd>
                </div>
              </div>
            </dl>
          </aside>
        </div>
        <Capabilities />
      </article>
    </Window>
  );
}

function Now() {
  return (
    <Window>
      <div className="os-view">
        <ViewHeader
          eyebrow="Now · September 2026"
          title="What I’m focused on right now."
          intro="A short snapshot, updated as work and life change."
        />
        <ul className="os-now-list">
          {nowItems.map((item, index) => (
            <li key={item.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{item.label}</h2>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

export default function Page({ params }: Readonly<{ params: { folder: string } }>) {
  switch (params.folder) {
    case "projects":
      return <Projects />;
    case "skills":
      return <Skills />;
    case "about":
      return <About />;
    case "now":
      return <Now />;
    case "CV":
      return <Cv />;
    default:
      notFound();
  }
}
