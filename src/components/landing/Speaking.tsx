import Image from "next/image";
import { FOUNDER_PROFILE_PDF } from "@/data/site";
import { getSpeaking, getTeaching } from "@/data/speaking";
import type { Locale } from "@/i18n/config";
import { Gallery } from "./Gallery";
import { TalkFeature } from "./TalkFeature";

function InviteLink({ className, cta }: { className: string; cta: { label: string; href: string } }) {
  return (
    <a className={className} href={cta.href} target="_blank" rel="noopener noreferrer">
      {cta.label} <span aria-hidden="true">→</span>
    </a>
  );
}

export function Speaking({ lang }: { lang: Locale }) {
  const speaking = getSpeaking(lang);
  const teaching = getTeaching(lang);

  return (
    <>
      <section className="speaking-intro wrap">
        <span className="eyebrow">{speaking.eyebrow}</span>
        <h1>
          {speaking.headlineLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          <em>{speaking.headlineEmphasis}</em>
        </h1>
        <div className="speaking-intro-body">
          <div>
            <p>{speaking.intro}</p>
            <div className="speaking-actions">
              <InviteLink className="cta-primary" cta={speaking.primaryCta} />
              <a className="speaking-link" href={speaking.secondaryCta.href}>
                {speaking.secondaryCta.label} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <Image
            className="speaking-photo"
            src={speaking.photo.src}
            alt={speaking.photo.alt}
            width={speaking.photo.width}
            height={speaking.photo.height}
            sizes="(max-width: 760px) 100vw, 45vw"
            priority
          />
        </div>
      </section>

      <section className="speaking-topics wrap" aria-labelledby="speaking-topics-title">
        <h2 id="speaking-topics-title">{speaking.sections.topics}</h2>
        <ul aria-label={speaking.topicsLabel}>
          {speaking.topics.map((topic) => (
            <li key={topic.title}>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="speaking-featured wrap" aria-labelledby="speaking-featured-title">
        <h2 id="speaking-featured-title">{speaking.sections.featured}</h2>
        <TalkFeature lang={lang} id="cambridge" />
      </section>

      <section className="speaking-teaching wrap" aria-labelledby="speaking-teaching-title">
        <h2 id="speaking-teaching-title">{speaking.sections.teaching}</h2>
        <div className="speaking-teaching-grid">
          <p>{teaching.text}</p>
          <Gallery lang={lang} images={teaching.images} />
        </div>
      </section>

      <section className="speaking-bio wrap" aria-labelledby="speaking-bio-title">
        <h2 id="speaking-bio-title">{speaking.sections.bio}</h2>
        <div>
          <p>{speaking.bio}</p>
          <a className="speaking-link" href={FOUNDER_PROFILE_PDF} download="founder-profile.pdf">
            {speaking.founderProfileLabel} ↓
          </a>
        </div>
      </section>

      <section className="page-closing">
        <div className="wrap">
          <h2>
            {speaking.closing.titleLead} <em>{speaking.closing.titleEmphasis}</em>
          </h2>
          <p>{speaking.closing.text}</p>
          <InviteLink className="cta-primary" cta={speaking.primaryCta} />
        </div>
      </section>
    </>
  );
}
