import { TALK } from "@/data/site";

export function Talks() {
  return (
    <section id="talks" className="talks wrap">
      <div className="section-heading">
        <div>
          <span className="eyebrow">04 / TALKS &amp; EVENTS</span>
          <h2>
            Ideas worth
            <br />
            <em>sharing.</em>
          </h2>
        </div>
        <p>
          Conversations about entrepreneurship, technology and the human potential that becomes visible when people
          have the opportunity to learn.
        </p>
      </div>
      <article className="talk-feature">
        <a
          className="talk-cover"
          href={TALK.pdf}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the Cambridge talk slides as a PDF"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TALK.cover} alt={TALK.coverAlt} width={1440} height={810} loading="lazy" />
        </a>
        <div className="talk-description">
          <span className="eyebrow">CAMBRIDGE · 2026 · CONFERENCE TALK</span>
          <h3>
            Unlocking Human Potential
            <br />
            in the Age of AI
          </h3>
          <p className="talk-venue">Clare Hall, Cambridge</p>
          <p>
            From opening a restaurant to building technology businesses, I explore how learning and adaptation can
            change a person’s path, and why AI makes recognising overlooked talent more urgent.
          </p>
          <ul className="talk-topics" aria-label="Talk themes">
            {TALK.themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
          <a className="button" href={TALK.pdf} target="_blank" rel="noopener noreferrer">
            View slides <span aria-hidden="true">↗</span>
          </a>
          <a className="talk-download" href={TALK.pdf} download={TALK.pdfName}>
            Download PDF ↓
          </a>
        </div>
      </article>
      <blockquote className="talk-quote">
        “The tragedy is not that the world lacks talent.
        <br />
        The tragedy is that so much talent stays hidden.”
      </blockquote>
    </section>
  );
}
