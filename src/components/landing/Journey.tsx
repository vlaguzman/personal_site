import { ARC } from "@/data/arc";
import { milestones } from "@/data/milestones";
import { Milestone } from "./Milestone";
import { ScrollReveal } from "./ScrollReveal";

export function Journey() {
  return (
    <section id="journey" className="journey wrap">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE JOURNEY</span>
          <h1>
            Different ventures.
            <br />
            <em>One purpose.</em>
          </h1>
        </div>
        <p>
          Building, learning and starting again since 2010, guided by a question: why do some people transform their
          lives while others, equally talented, never get the chance?
        </p>
      </div>
      <ol className="arc" aria-label="The arc of the journey">
        {ARC.map((stage, i) => (
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
        {[...milestones].reverse().map((m) => (
          <Milestone key={m.id} milestone={m} />
        ))}
      </div>
      <ScrollReveal selector="#journey .milestone, #journey .arc li" />
    </section>
  );
}
