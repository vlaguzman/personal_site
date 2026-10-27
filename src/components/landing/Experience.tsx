import Link from "next/link";
import { getExperience } from "@/data/experience";
import { localePath, type Locale } from "@/i18n/config";

export function Experience({ lang }: { lang: Locale }) {
  const experience = getExperience(lang);
  return (
    <section id="experience" className="experience">
      <div className="wrap experience-inner">
        <div className="experience-story">
          <span className="eyebrow">{experience.eyebrow}</span>
          <h2>
            {experience.titleLead} <em>{experience.titleEmphasis}</em>
          </h2>
          {experience.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="cta-secondary" href={localePath(lang, experience.cta.href)}>
            {experience.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="experience-roles" aria-label={experience.rolesLabel}>
          {experience.roles.map((role) => (
            <li key={role.title}>
              <strong>{role.title}</strong>
              <span>{role.context}</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="wrap experience-figures" aria-label={experience.figuresLabel}>
        {experience.figures.map((figure) => (
          <li key={figure.value}>
            <strong>{figure.value}</strong>
            <span>{figure.label}</span>
            {figure.source && (
              <a href={figure.source.href} target="_blank" rel="noopener noreferrer">
                {figure.source.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
