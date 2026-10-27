import Link from "next/link";
import { getGinggaUrl, getWork } from "@/data/work";
import { localePath, type Locale } from "@/i18n/config";

function BookLink({ className, cta }: { className: string; cta: { label: string; href: string } }) {
  return (
    <a className={className} href={cta.href} target="_blank" rel="noopener noreferrer">
      {cta.label} <span aria-hidden="true">→</span>
    </a>
  );
}

export function WorkTogether({ lang }: { lang: Locale }) {
  const work = getWork(lang);

  return (
    <>
      <section className="work-intro wrap">
        <span className="eyebrow">{work.eyebrow}</span>
        <h1>
          {work.headlineLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          <em>{work.headlineEmphasis}</em>
        </h1>
        <p>{work.intro}</p>
        <div className="work-actions">
          <BookLink className="cta-primary" cta={work.cta} />
          <Link className="work-link" href={localePath(lang, work.secondaryCta.href)}>
            {work.secondaryCta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="work-offers wrap" aria-labelledby="work-offers-title">
        <h2 id="work-offers-title">{work.offersTitle}</h2>
        <ul aria-label={work.offersLabel}>
          {work.offers.map((offer) => (
            <li key={offer.title}>
              <h3>{offer.title}</h3>
              <div>
                <p>{offer.text}</p>
                {offer.link && (
                  <Link className="work-link" href={localePath(lang, offer.link.href)}>
                    {offer.link.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="work-approach wrap">
        <p>{work.approach}</p>
      </section>

      <section className="work-gingga wrap" aria-labelledby="work-gingga-title">
        <h2 id="work-gingga-title">{work.gingga.title}</h2>
        <div>
          <p>{work.gingga.text}</p>
          <a className="work-link" href={getGinggaUrl()} target="_blank" rel="noopener noreferrer">
            {work.gingga.linkLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="page-closing">
        <div className="wrap">
          <h2>
            {work.closing.titleLead} <em>{work.closing.titleEmphasis}</em>
          </h2>
          <p>{work.closing.text}</p>
          <BookLink className="cta-primary" cta={work.cta} />
        </div>
      </section>
    </>
  );
}
