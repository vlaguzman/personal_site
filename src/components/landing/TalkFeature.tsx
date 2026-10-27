import { Fragment } from "react";
import { getTalk } from "@/data/talk";
import type { Locale } from "@/i18n/config";

export function TalkFeature({ id, lang }: { id?: string; lang: Locale }) {
  const talk = getTalk(lang);

  return (
    <article className="talk-feature" id={id}>
      <a
        className="talk-cover"
        href={talk.pdf}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={talk.coverLinkLabel}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={talk.cover} alt={talk.coverAlt} lang="en" width={1440} height={810} loading="lazy" />
      </a>
      <div className="talk-description">
        <span className="eyebrow">{talk.eyebrow}</span>
        <h3 lang="en">
          {talk.titleLines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h3>
        <p className="talk-venue">{talk.venue}</p>
        <p>{talk.description}</p>
        <ul className="talk-topics" aria-label={talk.themesLabel}>
          {talk.themes.map((theme) => (
            <li key={theme}>{theme}</li>
          ))}
        </ul>
        <a className="button" href={talk.pdf} target="_blank" rel="noopener noreferrer">
          {talk.viewSlides} <span aria-hidden="true">↗</span>
        </a>
        <a className="talk-download" href={talk.pdf} download={talk.pdfName}>
          {talk.download} ↓
        </a>
      </div>
    </article>
  );
}
