import { INTRO } from "@/data/intro";

export function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-statement">
      <div className="wrap intro-inner">
        <span className="eyebrow">{INTRO.eyebrow}</span>
        <div className="intro-body">
          <h2 id="intro-statement">{INTRO.statement}</h2>
          <p>{INTRO.support}</p>
        </div>
      </div>
    </section>
  );
}
