import type { Metadata } from "next";
import { ContactCta } from "@/components/site/contact-cta";
import { PublicPage } from "@/components/site/public-page";
import { nowItems } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Now",
  description: "What Ziyad Mourabiti is working on and thinking about now.",
  alternates: { canonical: "/now" },
  openGraph: {
    title: "Now - Ziyad Mourabiti",
    description: "What Ziyad Mourabiti is working on and thinking about now.",
    url: "/now",
  },
};

export default function NowPage() {
  return (
    <PublicPage>
      <header className="page-hero now-page-hero">
        <p className="eyebrow">Now / Updated September 2026</p>
        <h1>What I&apos;m up to.</h1>
        <p>
          A short update on my work, research, and life outside the screen.
        </p>
      </header>

      <section className="now-page-list" aria-label="Current focuses">
        {nowItems.map((item, index) => (
          <article key={item.label}>
            <span aria-hidden="true">0{index + 1}</span>
            <div>
              <h2>{item.label}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="now-principle">
        <p className="eyebrow">How I try to work</p>
        <blockquote>
          Make the system legible. Make the trade-offs explicit. Leave the code
          and the team stronger than you found them.
        </blockquote>
      </section>

      <ContactCta />
    </PublicPage>
  );
}
