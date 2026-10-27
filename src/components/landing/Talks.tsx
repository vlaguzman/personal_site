import { TalkFeature } from "./TalkFeature";

export function Talks() {
  return (
    <section id="talks" className="talks wrap">
      <div className="section-heading">
        <div>
          <span className="eyebrow">TALKS &amp; EVENTS</span>
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
      <TalkFeature />
      <blockquote className="talk-quote">
        “The tragedy is not that the world lacks talent.
        <br />
        The tragedy is that so much talent stays hidden.”
      </blockquote>
    </section>
  );
}
