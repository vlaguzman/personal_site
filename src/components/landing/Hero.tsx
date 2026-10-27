import Image from "next/image";
import { Fragment } from "react";
import { getHero } from "@/data/hero";
import { localePath, type Locale } from "@/i18n/config";

export function Hero({ lang }: { lang: Locale }) {
  const hero = getHero(lang);
  return (
    <section id="home" className="hero">
      <div className="hero-media">
        <Image
          className="hero-photo"
          src={hero.photo.src}
          alt={hero.photo.alt}
          width={hero.photo.width}
          height={hero.photo.height}
          sizes="(max-width: 760px) 100vw, 60vw"
          priority
        />
      </div>
      <div className="hero-inner">
        <span className="eyebrow">{hero.eyebrow}</span>
        <h1>
          {hero.headlineLines.map((line) => (
            <Fragment key={line}>
              {line}
              <br />
            </Fragment>
          ))}
          <em>{hero.headlineEmphasis}</em>
        </h1>
        <p className="hero-byline">
          <strong>{hero.byline.name}</strong>
          <span>{hero.byline.roles}</span>
        </p>
        <div className="hero-actions">
          <a className="cta-primary" href={localePath(lang, hero.primaryCta.href)}>
            {hero.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a className="cta-secondary" href={localePath(lang, hero.secondaryCta.href)} target="_blank" rel="noopener noreferrer">
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
