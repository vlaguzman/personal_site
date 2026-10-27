import { getBeliefs } from "@/data/beliefs";
import { localePath, type Locale } from "@/i18n/config";

export function Beliefs({ lang }: { lang: Locale }) {
  const beliefs = getBeliefs(lang);
  return (
    <section id="beliefs" className="beliefs">
      <div className="wrap">
        <div className="beliefs-heading">
          <div>
            <span className="eyebrow">{beliefs.eyebrow}</span>
            <h2>
              {beliefs.titleLead} <em>{beliefs.titleEmphasis}</em>
            </h2>
          </div>
          <div className="beliefs-intro">
            <p className="beliefs-statement">{beliefs.intro.statement}</p>
            <p>{beliefs.intro.text}</p>
          </div>
        </div>
        <ol className="belief-list">
          {beliefs.items.map((belief, i) => (
            <li key={belief.title}>
              <details name="beliefs">
                <summary>
                  <span className="belief-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{belief.title}</h3>
                  <span className="belief-toggle" aria-hidden="true" />
                </summary>
                <p>{belief.text}</p>
              </details>
            </li>
          ))}
        </ol>
        <div className="closing-cta">
          <p>{beliefs.closing.lead}</p>
          <a className="cta-primary" href={localePath(lang, beliefs.closing.cta.href)}>
            {beliefs.closing.cta.label} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
