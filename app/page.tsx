import Link from "next/link";
import { ContactCta } from "@/components/site/contact-cta";
import { FeaturedCaseStudy } from "@/components/site/featured-case-study";
import { HeroCardDeck } from "@/components/site/hero-card-deck";
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
      <div className="work-landmark-zone">
        <div className="work-landmark-background">
          <LandmarkMorph
            showLabel={false}
            colorZones={[
              { selector: ".proof-strip", color: "215, 248, 93" },
              { selector: "#work", color: "27, 24, 20" },
              { selector: ".now-preview", color: "215, 248, 93" },
              { selector: ".contact-cta", color: "244, 239, 229" },
            ]}
          />
        </div>

        <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="status-line">
            <span aria-hidden="true" /> {profile.role}
          </p>
          <h1 id="hero-title">
            I build software
            <em> end to end.</em>
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

        <HeroCardDeck />
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

        <section className="page-section" id="work">
          <SectionHeading
            eyebrow="Selected work"
            title="Two projects in depth."
            description="What I am building at SAP and what I researched for my master's thesis."
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
            eyebrow="More work"
            title="Other projects."
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
          </a>{" "}
          + {" "}
          <a
            href="https://sketchfab.com/3d-models/hassan-ii-mosque-casablanca-architectural-83e038c6a8664eb695a2de3ed0310bf6"
            target="_blank"
            rel="noreferrer"
          >
            Hassan II reference by abdlilah ben (CC BY 4.0)
          </a>
        </p>

        <section className="about-preview">
        <div>
          <p className="eyebrow">About me</p>
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
            <p className="eyebrow">Currently</p>
            <h2 id="now-title">What I&apos;m up to.</h2>
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
      </div>
    </PublicPage>
  );
}
