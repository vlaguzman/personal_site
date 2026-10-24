import Image from "next/image";
import Link from "next/link";
import type { Essay } from "@/data/types";
import { readingTimeMinutes } from "@/lib/essays";

export function EssayCard({ essay }: { essay: Essay }) {
  return (
    <article className="essay-card">
      {essay.image && (
        <Image
          className="essay-card-image"
          src={essay.image.src}
          alt={essay.image.alt}
          width={essay.image.width}
          height={essay.image.height}
          sizes="(max-width: 760px) 100vw, 33vw"
        />
      )}
      <div className="essay-card-body">
        <span className="eyebrow">
          {essay.topic ? essay.topic.toUpperCase() : "ESSAY"}
          {essay.lang === "es" && " · IN SPANISH"}
        </span>
        <h3 lang={essay.lang}>
          <Link href={`/essays/${essay.slug}`} lang={essay.lang}>
            {essay.title}
          </Link>
        </h3>
        <span className="essay-meta">{`${readingTimeMinutes(essay.sections)} min read`}</span>
      </div>
    </article>
  );
}
