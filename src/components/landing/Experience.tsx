import { getExperience } from "@/data/experience";

export function Experience() {
  const experience = getExperience();
  return (
    <section id="experience" className="experience">
      <div className="wrap experience-inner">
        <div className="experience-story">
          <span className="eyebrow">{experience.eyebrow}</span>
          <h2>
            Built through <em>experience</em>
          </h2>
          {experience.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a className="cta-secondary" href={experience.cta.href}>
            {experience.cta.label} <span aria-hidden="true">→</span>
          </a>
        </div>
        <ul className="experience-roles" aria-label="Experience">
          {experience.roles.map((role) => (
            <li key={role.title}>
              <strong>{role.title}</strong>
              <span>{role.context}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
