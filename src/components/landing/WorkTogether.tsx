import Link from "next/link";
import { getGinggaUrl, WORK } from "@/data/work";

function BookLink({ className }: { className: string }) {
  return (
    <a className={className} href={WORK.cta.href} target="_blank" rel="noopener noreferrer">
      {WORK.cta.label} <span aria-hidden="true">→</span>
    </a>
  );
}

export function WorkTogether() {
  return (
    <>
      <section className="work-intro wrap">
        <span className="eyebrow">{WORK.eyebrow}</span>
        <h1>
          {WORK.headlineLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          <em>{WORK.headlineEmphasis}</em>
        </h1>
        <p>{WORK.intro}</p>
        <div className="work-actions">
          <BookLink className="cta-primary" />
          <Link className="work-link" href={WORK.secondaryCta.href}>
            {WORK.secondaryCta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="work-offers wrap" aria-labelledby="work-offers-title">
        <h2 id="work-offers-title">How I can help</h2>
        <ul aria-label="Ways to work together">
          {WORK.offers.map((offer) => (
            <li key={offer.title}>
              <h3>{offer.title}</h3>
              <div>
                <p>{offer.text}</p>
                {"link" in offer && (
                  <Link className="work-link" href={offer.link.href}>
                    {offer.link.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="work-approach wrap">
        <p>{WORK.approach}</p>
      </section>

      <section className="work-gingga wrap" aria-labelledby="work-gingga-title">
        <h2 id="work-gingga-title">{WORK.gingga.title}</h2>
        <div>
          <p>{WORK.gingga.text}</p>
          <a className="work-link" href={getGinggaUrl()} target="_blank" rel="noopener noreferrer">
            {WORK.gingga.linkLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="page-closing">
        <div className="wrap">
          <h2>
            Start with the <em>decision.</em>
          </h2>
          <p>{WORK.closing.text}</p>
          <BookLink className="cta-primary" />
        </div>
      </section>
    </>
  );
}
