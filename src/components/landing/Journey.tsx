import { milestones } from "@/data/milestones";
import { Milestone } from "./Milestone";

export function Journey() {
  return (
    <section id="journey" className="journey wrap">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / THE JOURNEY</span>
          <h2>
            Different ventures.
            <br />
            <em>One purpose.</em>
          </h2>
        </div>
        <p>
          Building, learning and starting again since 2010, guided by a question: why do some people transform their
          lives while others, equally talented, never get the chance?
        </p>
      </div>
      <div className="timeline">
        {milestones.map((m) => (
          <Milestone key={m.id} milestone={m} />
        ))}
      </div>
    </section>
  );
}
