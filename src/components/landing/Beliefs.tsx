import { BELIEFS } from "@/data/beliefs";

export function Beliefs() {
  return (
    <section id="beliefs" className="beliefs">
      <div className="wrap">
        <div className="beliefs-heading">
          <span className="eyebrow">03 / PRINCIPLES</span>
          <h2>
            What I <em>believe</em>
          </h2>
        </div>
        <ol className="belief-list">
          {BELIEFS.map((belief, i) => (
            <li key={belief.title}>
              <span className="belief-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{belief.title}</h3>
              <p>{belief.text}</p>
            </li>
          ))}
        </ol>
        <div className="closing-cta">
          <p>If this resonates,</p>
          <a className="cta-primary" href="#contact">
            Let’s talk <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
