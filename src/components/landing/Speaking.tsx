import Image from "next/image";
import { FOUNDER_PROFILE_PDF } from "@/data/site";
import { getConsulateEngagement, SPEAKING } from "@/data/speaking";
import { Gallery } from "./Gallery";
import { TalkFeature } from "./TalkFeature";
import { VideoEmbed } from "./VideoEmbed";

function InviteLink({ className }: { className: string }) {
  return (
    <a className={className} href={SPEAKING.primaryCta.href} target="_blank" rel="noopener noreferrer">
      {SPEAKING.primaryCta.label} <span aria-hidden="true">→</span>
    </a>
  );
}

export function Speaking() {
  const engagement = getConsulateEngagement();

  return (
    <>
      <section className="speaking-intro wrap">
        <span className="eyebrow">{SPEAKING.eyebrow}</span>
        <h1>
          {SPEAKING.headlineLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          <em>{SPEAKING.headlineEmphasis}</em>
        </h1>
        <div className="speaking-intro-body">
          <div>
            <p>{SPEAKING.intro}</p>
            <div className="speaking-actions">
              <InviteLink className="cta-primary" />
              <a className="speaking-link" href={SPEAKING.secondaryCta.href}>
                {SPEAKING.secondaryCta.label} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <Image
            className="speaking-photo"
            src={SPEAKING.photo.src}
            alt={SPEAKING.photo.alt}
            width={SPEAKING.photo.width}
            height={SPEAKING.photo.height}
            sizes="(max-width: 760px) 100vw, 45vw"
            priority
          />
        </div>
      </section>

      <section className="speaking-topics wrap" aria-labelledby="speaking-topics-title">
        <h2 id="speaking-topics-title">What I speak about</h2>
        <ul aria-label="Speaking topics">
          {SPEAKING.topics.map((topic) => (
            <li key={topic.title}>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="speaking-featured wrap" aria-labelledby="speaking-featured-title">
        <h2 id="speaking-featured-title">Featured talk</h2>
        <TalkFeature id="cambridge" />
      </section>

      <section className="speaking-community wrap" aria-labelledby="speaking-community-title">
        <h2 id="speaking-community-title">In the community</h2>
        <div className="speaking-community-grid">
          <div>
            <span className="eyebrow">{engagement.eyebrow}</span>
            <h3>{engagement.title}</h3>
            <p>{engagement.text}</p>
            <dl className="speaking-facts">
              {engagement.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <VideoEmbed youtubeId={engagement.video.youtubeId} title={engagement.video.title} />
        </div>
        <Gallery images={engagement.images} />
      </section>

      <section className="speaking-bio wrap" aria-labelledby="speaking-bio-title">
        <h2 id="speaking-bio-title">About Vladimir</h2>
        <div>
          <p>{SPEAKING.bio}</p>
          <a className="speaking-link" href={FOUNDER_PROFILE_PDF} download="founder-profile.pdf">
            Download founder profile ↓
          </a>
        </div>
      </section>

      <section className="page-closing">
        <div className="wrap">
          <h2>
            Start the <em>conversation.</em>
          </h2>
          <p>{SPEAKING.closing}</p>
          <InviteLink className="cta-primary" />
        </div>
      </section>
    </>
  );
}
