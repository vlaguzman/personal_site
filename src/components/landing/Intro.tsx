import { getIntro } from "@/data/intro";
import type { Locale } from "@/i18n/config";

export function Intro({ lang }: { lang: Locale }) {
  const intro = getIntro(lang);
  return (
    <section className="intro" aria-labelledby="intro-statement">
      <div className="wrap intro-inner">
        <span className="eyebrow">{intro.eyebrow}</span>
        <div className="intro-body">
          <h2 id="intro-statement">{intro.statement}</h2>
          <p>{intro.support}</p>
        </div>
      </div>
    </section>
  );
}
