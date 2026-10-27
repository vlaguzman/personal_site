import { Fragment } from "react";
import { getArc } from "@/data/arc";
import { getJourneyUi } from "@/data/journey-ui";
import { FOUNDER_PROFILE_PDF } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getMilestones } from "@/data/milestones";
import { Milestone } from "./Milestone";
import { ScrollReveal } from "./ScrollReveal";

export function Journey({ lang }: { lang: Locale }) {
  const ui = getJourneyUi(lang);
  return (
    <section id="journey" className="journey wrap">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{ui.eyebrow}</span>
          <h1>
            {ui.headlineLines.map((line) => (
              <Fragment key={line}>
                {line}
                <br />
              </Fragment>
            ))}
            <em>{ui.headlineEmphasis}</em>
          </h1>
        </div>
        <div>
          <p>{ui.intro}</p>
          <a className="journey-profile" href={FOUNDER_PROFILE_PDF} download="founder-profile.pdf">
            {ui.profileLabel} ↓
          </a>
        </div>
      </div>
      <ol className="arc" aria-label={ui.arcLabel}>
        {getArc(lang).map((stage, i) => (
          <li key={stage.label}>
            <span className="arc-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <strong>{stage.label}</strong>
            <p>{stage.text}</p>
          </li>
        ))}
      </ol>
      <div className="timeline">
        {[...getMilestones(lang)].reverse().map((m) => (
          <Milestone key={m.id} lang={lang} milestone={m} />
        ))}
      </div>
      <ScrollReveal selector="#journey .milestone, #journey .arc li" />
    </section>
  );
}
