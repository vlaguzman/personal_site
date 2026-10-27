import Image from "next/image";
import { Fragment } from "react";
import { HERO } from "@/data/hero";
import { localePath, type Locale } from "@/i18n/config";

export function Hero({ lang }: { lang: Locale }) {
  return (
    <section id="home" className="hero">
      <div className="hero-media">
        <Image
          className="hero-photo"
          src={HERO.photo.src}
          alt={HERO.photo.alt}
          width={HERO.photo.width}
          height={HERO.photo.height}
          sizes="(max-width: 760px) 100vw, 60vw"
          priority
        />
      </div>
      <div className="hero-inner">
        <span className="eyebrow">{HERO.eyebrow}</span>
        <h1>
          {HERO.headlineLines.map((line) => (
            <Fragment key={line}>
              {line}
              <br />
            </Fragment>
          ))}
          <em>{HERO.headlineEmphasis}</em>
        </h1>
        <p className="hero-byline">
          <strong>{HERO.byline.name}</strong>
          <span>{HERO.byline.roles}</span>
        </p>
        <div className="hero-actions">
          <a className="cta-primary" href={localePath(lang, HERO.primaryCta.href)}>
            {HERO.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a className="cta-secondary" href={localePath(lang, HERO.secondaryCta.href)}>
            {HERO.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
