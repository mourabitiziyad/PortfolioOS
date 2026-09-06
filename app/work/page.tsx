import type { Metadata } from "next";
import { ContactCta } from "@/components/site/contact-cta";
import { FeaturedCaseStudy } from "@/components/site/featured-case-study";
import { ProjectCard } from "@/components/site/project-card";
import { PublicPage } from "@/components/site/public-page";
import { SectionHeading } from "@/components/site/section-heading";
import { featuredWork, projects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected platform engineering, applied AI, distributed systems, and product work by Ziyad Mourabiti.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PublicPage>
      <header className="page-hero">
        <p className="eyebrow">Work / Selected systems</p>
        <h1>Proof over buzzwords.</h1>
        <p>
          A closer look at the systems I have owned, researched, and shipped -
          and the decisions that made them work.
        </p>
      </header>

      <section className="page-section page-section-first">
        <SectionHeading
          eyebrow="Featured"
          title="Depth where it matters."
          description="My current enterprise platform work and the research system behind my master's thesis."
        />
        <div className="case-study-list">
          {featuredWork.map((work, index) => (
            <FeaturedCaseStudy key={work.id} work={work} index={index} />
          ))}
        </div>
      </section>

      <section className="page-section selected-projects">
        <SectionHeading
          eyebrow="Archive"
          title="Other things I have built."
          description="Products, research tools, and systems across different teams and stages."
        />
        <div className="project-grid project-grid-full">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <ContactCta />
    </PublicPage>
  );
}
