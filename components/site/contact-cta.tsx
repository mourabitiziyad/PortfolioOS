import { profile } from "@/lib/portfolio";

export function ContactCta() {
  return (
    <section className="contact-cta" aria-labelledby="contact-title">
      <p className="eyebrow">Have a hard problem worth solving?</p>
      <h2 id="contact-title">Let&apos;s make the complex feel clear.</h2>
      <a className="button button-light" href={`mailto:${profile.email}`}>
        Start a conversation <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
