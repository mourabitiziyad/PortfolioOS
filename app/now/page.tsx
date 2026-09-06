import type { Metadata } from "next";
import { ContactCta } from "@/components/site/contact-cta";
import { PublicPage } from "@/components/site/public-page";
import { nowItems } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Now",
  description: "What Ziyad Mourabiti is working on and thinking about now.",
};

export default function NowPage() {
  return (
    <PublicPage>
      <header className="page-hero now-page-hero">
        <p className="eyebrow">Now / Updated September 2026</p>
        <h1>A small snapshot of the present.</h1>
        <p>
          Portfolios record finished work. This page keeps a little space for
          what is still moving.
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
        <p className="eyebrow">A working principle</p>
        <blockquote>
          Make the system legible. Make the trade-offs explicit. Leave the code
          and the team stronger than you found them.
        </blockquote>
      </section>

      <ContactCta />
    </PublicPage>
  );
}
