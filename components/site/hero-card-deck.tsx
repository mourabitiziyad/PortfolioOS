"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type KeyboardEvent } from "react";

const cards = [
  { id: "dcom", label: "D-COM talk", file: "TALK_01", meta: "MANNHEIM · 2026" },
  { id: "research", label: "Research", file: "RESEARCH_SAMPLE_05", meta: "S2DR3 · 10×" },
  { id: "acdesa", label: "ACDSA", file: "CONFERENCE_01", meta: "ACDSA · 2026" },
  { id: "delaybahn", label: "DelayBahn", file: "SYSTEM_01", meta: "2M+ TRIPS" },
] as const;

function ResearchCard() {
  const [position, setPosition] = useState(50);

  return (
    <>
      <div className="hero-research-body hero-card-body">
        <div className="hero-research-heading">
          <div>
            <p>Applied AI · MSc research</p>
            <h2>Satellite detail, tested for utility.</h2>
          </div>
          <span aria-label="ten times super-resolution">10× SR</span>
        </div>

        <div
          className="hero-comparison"
          style={{ "--comparison-position": `${position}%` } as CSSProperties}
        >
          <div className="hero-comparison-layer">
            <Image
              src="/pv-sentinel2-input.webp"
              alt="Low-resolution Sentinel-2 view of a solar farm in Brandenburg"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 46vw"
            />
          </div>
          <div className="hero-comparison-layer hero-comparison-after">
            <Image
              src="/pv-s2dr3-output.webp"
              alt="S2DR3 reconstruction of the same solar farm"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 46vw"
            />
          </div>
          <span className="hero-comparison-label hero-comparison-label-left">
            Sentinel-2 input
          </span>
          <span className="hero-comparison-label hero-comparison-label-right">
            S2DR3 output
          </span>
          <span className="hero-comparison-divider" aria-hidden="true" />
          <input
            className="hero-comparison-range"
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Compare the Sentinel-2 input with the S2DR3 output"
            aria-valuetext={`${100 - position}% S2DR3 output visible`}
          />
        </div>

        <div className="hero-research-finding">
          <span>Finding</span>
          <p>
            Super-resolution improved PV segmentation, but visual quality alone
            did not predict model performance.
          </p>
        </div>
      </div>
      <div className="hero-card-footer">
        <span>Brandenburg · thesis evaluation set</span>
        <Link href="#pv-super-resolution">Explore the case study ↘</Link>
      </div>
    </>
  );
}

function DcomCard() {
  return (
    <>
      <div className="hero-card-body hero-talk-body">
        <div className="hero-talk-photo">
          <Image
            src="/dcom-mannheim-talk.webp"
            alt="Ziyad Mourabiti speaking on stage at SAP d-com in Mannheim"
            fill
            sizes="(max-width: 860px) 100vw, 46vw"
          />
        </div>
        <div className="hero-talk-copy">
          <p className="hero-card-kicker">SAP d-com · Mannheim</p>
          <h2>
            Situation-aware,
            <em> agentic support.</em>
          </h2>
          <p className="hero-card-description">
            Co-presented with Alexander Gahr on bringing product context and guided
            resolution directly into the support experience.
          </p>
        </div>
      </div>
      <div className="hero-card-footer">
        <span>July 2026 · SAP d-com</span>
        <Link href="#sap-built-in-support">See the related work ↘</Link>
      </div>
    </>
  );
}

function ConferenceCard() {
  return (
    <>
      <div className="hero-card-body hero-conference-body">
        <p className="hero-card-kicker">Research · oral presentation</p>
        <div className="hero-conference-mark" aria-hidden="true">
          ACDSA <span>2026</span>
        </div>
        <h2>Generative super-resolution for satellite-based solar mapping.</h2>
        <p className="hero-card-description">
          The master&apos;s research became an oral presentation at ACDSA 2026.
        </p>
      </div>
      <div className="hero-card-footer">
        <span>Research presented</span>
        <a href="/pv-sr-conference-certificate.pdf" target="_blank" rel="noreferrer">
          View certificate ↗
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </>
  );
}

function DelayBahnCard() {
  return (
    <>
      <div className="hero-card-body hero-scale-body">
        <Image
          className="hero-scale-background"
          src="/delaybahn-dashboard.webp"
          alt=""
          fill
          sizes="(max-width: 860px) 100vw, 46vw"
        />
        <div className="hero-scale-content">
          <p className="hero-card-kicker">Distributed systems · TUM</p>
          <strong className="hero-scale-number">2M+</strong>
          <span className="hero-scale-label">trips processed</span>
          <h2>Delay-aware routing across European rail.</h2>
          <svg className="hero-route-map" viewBox="0 0 420 92" aria-hidden="true">
            <path d="M8 66 C75 66 78 22 145 22 S225 72 286 60 S347 17 412 17" />
            <circle cx="8" cy="66" r="6" />
            <circle cx="145" cy="22" r="6" />
            <circle cx="286" cy="60" r="6" />
            <circle cx="412" cy="17" r="6" />
          </svg>
        </div>
      </div>
      <div className="hero-card-footer">
        <span>Scheduled ingestion + journey planning</span>
        <a href="https://github.com/mourabitiziyad/delaybahn" target="_blank" rel="noreferrer">
          View project ↗
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </>
  );
}

export function HeroCardDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = cards[activeIndex];

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + cards.length) % cards.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target instanceof HTMLInputElement) return;
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  };

  return (
    <section
      className="hero-card-deck"
      aria-label="Selected highlights"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      <h2 className="sr-only">Selected highlights</h2>
      <div className="hero-card-deck-stage">
        <article
          className={`hero-visual hero-deck-card hero-deck-card-${activeCard.id}`}
          aria-label={`${activeIndex + 1} of ${cards.length}: ${activeCard.label}`}
          key={activeCard.id}
        >
          <div className="hero-window-bar">
            <span>{activeCard.file}</span>
            <span>{activeCard.meta}</span>
          </div>
          {activeCard.id === "research" && <ResearchCard />}
          {activeCard.id === "dcom" && <DcomCard />}
          {activeCard.id === "acdesa" && <ConferenceCard />}
          {activeCard.id === "delaybahn" && <DelayBahnCard />}
        </article>
      </div>

      <div className="hero-deck-controls" aria-label="Choose a highlight">
        <button type="button" onClick={() => move(-1)} aria-label="Previous highlight">
          ←
        </button>
        <div className="hero-deck-tabs">
          {cards.map((card, index) => (
            <button
              type="button"
              key={card.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${card.label}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next highlight">
          →
        </button>
      </div>
    </section>
  );
}
