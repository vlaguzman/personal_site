import Link from "next/link";
import type { Essay } from "@/data/types";
import { readingTimeMinutes } from "@/lib/essays";
import { ShareLinks } from "./ShareLinks";

type Props = { essay: Essay; related: readonly Essay[] };

export function EssayArticle({ essay, related }: Props) {
  return (
    <>
      <article className="essay" lang={essay.lang}>
        <Link className="essay-back" href="/essays" lang="en">
          <span aria-hidden="true">←</span> All essays
        </Link>
        <div className="essay-header">
          {essay.topic && <span className="eyebrow">{essay.topic}</span>}
          <h1>{essay.title}</h1>
          <p className="essay-meta" lang="en">
            <span>{`${readingTimeMinutes(essay.sections)} min read`}</span>
            {essay.lang === "es" && <span>Written in Spanish</span>}
          </p>
        </div>
        <div className="essay-body">
          {essay.sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              <p>{s.text}</p>
            </section>
          ))}
        </div>
        <ShareLinks title={essay.title} />
      </article>
      {related.length > 0 && (
        <section className="essay-related" aria-labelledby="essay-related-title">
          <h2 id="essay-related-title">Related reading</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/essays/${r.slug}`}>
                  <span lang={r.lang}>{r.title}</span>
                  <span className="essay-meta"> · {readingTimeMinutes(r.sections)} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
