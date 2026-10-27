import Link from "next/link";
import { IDEAS } from "@/data/ideas";

export function Ideas() {
  return (
    <section id="ideas" className="ideas">
      <div className="wrap">
        <div className="ideas-heading">
          <span className="eyebrow">{IDEAS.eyebrow}</span>
          <h2>
            Ideas worth <em>challenging</em>
          </h2>
        </div>
        <ul className="idea-list" aria-label="Ideas worth challenging">
          {IDEAS.items.map((idea) => (
            <li key={idea.claim}>
              <h3>{idea.claim}</h3>
              <p>{idea.argument}</p>
            </li>
          ))}
        </ul>
        <div className="ideas-closing">
          <p>{IDEAS.closing}</p>
          <Link className="cta-primary" href={IDEAS.cta.href}>
            {IDEAS.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
