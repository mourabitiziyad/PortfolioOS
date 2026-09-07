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
  openGraph: {
    title: "Work - Ziyad Mourabiti",
    description:
      "Selected platform engineering, applied AI, distributed systems, and product work by Ziyad Mourabiti.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <PublicPage>
      <header className="page-hero">
        <p className="eyebrow">Work</p>
        <h1>A few things I&apos;ve built.</h1>
        <p>
          A closer look at work I have owned, researched, and shipped, and the
          decisions behind it.
        </p>
      </header>

      <section className="page-section page-section-first">
        <SectionHeading
          eyebrow="Featured"
          title="Two projects in depth."
          description="What I am building at SAP and what I researched for my master's thesis."
        />
        <div className="case-study-list">
          {featuredWork.map((work, index) => (
            <FeaturedCaseStudy key={work.id} work={work} index={index} />
          ))}
        </div>
      </section>

      <section className="page-section selected-projects">
        <SectionHeading
          eyebrow="More work"
          title="Other projects."
          description="Products and research tools I have built with different teams."
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
