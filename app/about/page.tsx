import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/site/contact-cta";
import { PublicPage } from "@/components/site/public-page";
import { SectionHeading } from "@/components/site/section-heading";
import { capabilityGroups } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ziyad Mourabiti: a Moroccan full-stack software engineer at SAP working across platforms, product, data, and applied AI.",
};

const journey = [
  {
    period: "Morocco",
    title: "Curiosity became a craft",
    text: "I studied computer science and communication at Al Akhawayn University, graduated Summa Cum Laude, then returned to teach database systems while building software for university and public-sector teams.",
  },
  {
    period: "Munich",
    title: "Data met product engineering",
    text: "At TUM, I focused on data engineering, distributed systems, and applied AI. Projects ranged from railway-delay prediction to conversational crop-breeding tools and photovoltaic detection from satellite imagery.",
  },
  {
    period: "Today",
    title: "Building dependable platforms",
    text: "At SAP, I own features across requirements, planning, threat modeling, and implementation for Built-In Support. I like work where product judgment and technical depth reinforce each other.",
  },
];

export default function AboutPage() {
  return (
    <PublicPage>
      <header className="page-hero about-hero">
        <p className="eyebrow">About / The longer version</p>
        <h1>Born in Morocco. Building in Germany.</h1>
        <p>
          I am a full-stack engineer who enjoys the whole arc of a problem:
          understanding it, shaping the system, shipping it, and helping the
          people around it succeed.
        </p>
      </header>

      <section className="page-section page-section-first journey-section">
        <SectionHeading eyebrow="Journey" title="The through-line is ownership." />
        <ol className="journey-list">
          {journey.map((item, index) => (
            <li key={item.period}>
              <div className="journey-index">0{index + 1}</div>
              <p className="eyebrow">{item.period}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="capabilities-section">
        <SectionHeading
          eyebrow="Capabilities"
          title="Tools follow the problem."
          description="I work across the stack, with the strongest overlap around product engineering, platforms, and data."
        />
        <div className="capability-grid">
          {capabilityGroups.map((group) => (
            <article key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="personal-note">
        <p className="eyebrow">Outside the work</p>
        <blockquote>
          Football gives me the drama, chess gives me the puzzles, and hip-hop
          usually provides the soundtrack.
        </blockquote>
        <p>
          I follow Liverpool FC and Morocco&apos;s Atlas Lions, play FIFA and Smash
          Bros, and am always up for a thoughtful conversation. For the current
          snapshot, see <Link href="/now">what I&apos;m doing now</Link>.
        </p>
      </section>

      <ContactCta />
    </PublicPage>
  );
}

