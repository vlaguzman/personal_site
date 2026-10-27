import Link from "next/link";
import { getIdeas } from "@/data/ideas";
import { localePath, type Locale } from "@/i18n/config";

export function Ideas({ lang }: { lang: Locale }) {
  const ideas = getIdeas(lang);
  return (
    <section id="ideas" className="ideas">
      <div className="wrap">
        <div className="ideas-heading">
          <span className="eyebrow">{ideas.eyebrow}</span>
          <h2>
            {ideas.titleLead} <em>{ideas.titleEmphasis}</em>
          </h2>
        </div>
        <ul className="idea-list" aria-label={ideas.listLabel}>
          {ideas.items.map((idea) => (
            <li key={idea.claim}>
              <h3>{idea.claim}</h3>
              <p>{idea.argument}</p>
            </li>
          ))}
        </ul>
        <div className="ideas-closing">
          <p>{ideas.closing}</p>
          <Link className="cta-primary" href={localePath(lang, ideas.cta.href)}>
            {ideas.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
