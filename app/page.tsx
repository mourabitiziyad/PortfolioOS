import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/site/contact-cta";
import { FeaturedCaseStudy } from "@/components/site/featured-case-study";
import { LandmarkMorph } from "@/components/site/landmark-morph";
import { ProjectCard } from "@/components/site/project-card";
import { PublicPage } from "@/components/site/public-page";
import { SectionHeading } from "@/components/site/section-heading";
import { TextLink } from "@/components/site/text-link";
import { featuredWork, nowItems, profile, projects, proofPoints } from "@/lib/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.siteUrl,
    jobTitle: "Full-stack software engineer",
    worksFor: {
      "@type": "Organization",
      name: "SAP",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Technical University of Munich" },
      { "@type": "CollegeOrUniversity", name: "Al Akhawayn University" },
    ],
    sameAs: [
      "https://github.com/mourabitiziyad",
      "https://linkedin.com/in/ziyadmourabiti",
    ],
    knowsAbout: [
      "Full-stack software engineering",
      "Platform engineering",
      "Distributed systems",
      "Applied artificial intelligence",
    ],
  };

  return (
    <PublicPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="status-line">
            <span aria-hidden="true" /> {profile.role}
          </p>
          <h1 id="hero-title">
            Engineering with
            <em> range and rigor.</em>
          </h1>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/work">
              View selected work <span aria-hidden="true">↘</span>
            </Link>
            <Link className="button button-ghost" href="/desktop/about">
              Open PortfolioOS <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <figure className="hero-visual">
          <div className="hero-window-bar">
            <span>MERZOUGA_31.0802N</span>
            <span aria-hidden="true">● ● ●</span>
          </div>
          <div className="hero-image">
            <Image
              src="/merzouga-full.jpg"
              alt="Golden sand dunes in Merzouga, Morocco"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 46vw"
            />
            <div className="hero-image-note">Morocco → Germany</div>
          </div>
          <figcaption>
            <span>A builder shaped by two places.</span>
            <a
              href="https://unsplash.com/photos/dessert-illustration-yWbxfKurMH0"
              target="_blank"
              rel="noreferrer"
            >
              Photo: Fernando Paredes Murillo
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </figcaption>
        </figure>
      </section>

      <section className="proof-strip" aria-label="Career highlights">
        <div className="proof-strip-inner">
          {proofPoints.map((point, index) => (
            <article key={point.label}>
              <span className="proof-index" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <p>{point.label}</p>
                <strong>{point.value}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="work-landmark-zone">
        <div className="work-landmark-background">
          <LandmarkMorph />
        </div>

        <section className="page-section" id="work">
          <SectionHeading
            eyebrow="Selected work"
            title="Complex systems, made useful."
            description="Two chapters that connect product thinking, platform engineering, and applied research."
          />
          <div className="case-study-list">
            {featuredWork.map((work, index) => (
              <FeaturedCaseStudy key={work.id} work={work} index={index} />
            ))}
          </div>
          <div className="section-end-link">
            <TextLink label="See the complete project archive" href="/work" />
          </div>
        </section>

        <section className="page-section selected-projects">
          <SectionHeading
            eyebrow="More shipped work"
            title="From prototypes to platforms."
          />
          <div className="project-grid">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <p className="landmark-data-credit">
          Geometry: {" "}
          <a href="https://geodaten.bayern.de/opengeodata/" target="_blank" rel="noreferrer">
            Bavaria LoD2
          </a>{" "}
          + {" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
            © OpenStreetMap contributors
          </a>
        </p>
      </div>

      <section className="about-preview">
        <div>
          <p className="eyebrow">The person behind the systems</p>
          <h2>Salam, I&apos;m Ziyad.</h2>
        </div>
        <div className="about-preview-copy">
          <p>
            I grew up in Morocco, studied computer science at Al Akhawayn,
            taught database systems, and moved to Germany for an MSc in Data
            Engineering & Analytics at TUM.
          </p>
          <p>
            I care about collective wins, direct communication, and software
            that earns trust. Outside work, you&apos;ll find me following Liverpool
            and the Atlas Lions, playing chess, or arguing about hip-hop.
          </p>
          <TextLink label="More about me" href="/about" />
        </div>
      </section>

      <section className="now-preview" aria-labelledby="now-title">
        <div className="now-heading">
          <p className="eyebrow">Now / September 2026</p>
          <h2 id="now-title">What has my attention.</h2>
        </div>
        <div className="now-grid">
          {nowItems.map((item) => (
            <article key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <TextLink label="Visit the Now page" href="/now" className="text-link-light" />
      </section>

      <ContactCta />
    </PublicPage>
  );
}
