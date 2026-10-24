import Link from "next/link";
import type { Essay } from "@/data/types";
import { excerpt, readingTimeMinutes } from "@/lib/essays";

export function StartHere({ essay }: { essay: Essay }) {
  return (
    <section className="essays-start" aria-labelledby="essays-start-title">
      <span className="eyebrow">Start here</span>
      <h2 id="essays-start-title" lang={essay.lang}>
        <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
      </h2>
      <p lang={essay.lang}>{excerpt(essay.sections, 220)}</p>
      <p className="essay-meta">
        {essay.topic && <span>{essay.topic}</span>}
        <span>{`${readingTimeMinutes(essay.sections)} min read`}</span>
        {essay.lang === "es" && <span>In Spanish</span>}
      </p>
    </section>
  );
}
