import { profile } from "@/lib/portfolio";

export function ContactCta() {
  return (
    <section className="contact-cta" aria-labelledby="contact-title">
      <p className="eyebrow">Want to work together?</p>
      <h2 id="contact-title">Say hello.</h2>
      <a className="button button-light" href={`mailto:${profile.email}`}>
        Start a conversation <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
