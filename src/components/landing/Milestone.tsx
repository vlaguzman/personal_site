import { Fragment } from "react";
import Link from "next/link";
import { ESSAYS } from "@/data/essays";
import type { Block, Milestone as MilestoneData } from "@/data/types";
import { localePath, type Locale } from "@/i18n/config";
import { Gallery } from "./Gallery";
import { VideoEmbed } from "./VideoEmbed";

function BlockView({ block, lang }: { block: Block; lang: Locale }) {
  switch (block.kind) {
    case "paragraph":
      return <p className={block.variant}>{block.text}</p>;
    case "facts":
      return (
        <div className="fact">
          {block.items.map((f) => (
            <Fragment key={f.value}>
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </Fragment>
          ))}
        </div>
      );
    case "details":
      return (
        <details>
          <summary>
            {block.summary} <span>+</span>
          </summary>
          <p>{block.text}</p>
        </details>
      );
    case "roles":
      return (
        <div className="role-history">
          {block.items.map((r) => (
            <div key={r.period}>
              <span>{r.period}</span>
              <strong>{r.title}</strong>
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      );
    case "origin":
      return (
        <a className="venture-origin" href={block.href}>
          <span aria-hidden="true">↳</span> {block.label}
        </a>
      );
    case "ventureTree":
      return (
        <div className="venture-tree" aria-label={block.ariaLabel}>
          <div className="venture-root">
            <span className="eyebrow">{block.root.eyebrow}</span>
            <strong>{block.root.name}</strong>
            <span>{block.root.tagline}</span>
          </div>
          <ul className="venture-branches">
            {block.ventures.map((v) => (
              <li key={v.href}>
                <a href={v.href}>
                  <span>
                    <strong>{v.name}</strong>
                    <small>{v.note}</small>
                  </span>
                  <b aria-hidden="true">↑</b>
                </a>
              </li>
            ))}
            <li className="venture-experiments">
              <span>
                <strong>{block.experiments.name}</strong>
                <small>{block.experiments.note}</small>
              </span>
            </li>
          </ul>
        </div>
      );
    case "yc":
      return (
        <div className="yc">
          <span>Y</span>
          <div>
            {block.label}
            <small>{block.season}</small>
          </div>
        </div>
      );
    case "gallery":
      return <Gallery images={block.images} />;
    case "posts":
      return (
        <div className="blog-posts">
          <span className="eyebrow">{block.label}</span>
          {block.items.map((post) => {
            const essay = ESSAYS.find((e) => e.title === post.title);
            if (!essay) throw new Error(`Timeline post "${post.title}" has no matching essay`);
            return (
              <Link key={essay.slug} href={localePath(lang, `/essays/${essay.slug}`)} className="blog-post" lang={essay.lang}>
                {post.title} <span aria-hidden="true">→</span>
              </Link>
            );
          })}
        </div>
      );
    case "video":
      return <VideoEmbed youtubeId={block.youtubeId} title={block.title} />;
    case "button":
      return (
        <a className="button" href={block.href} target="_blank" rel="noopener noreferrer">
          {block.label} <span>↗</span>
        </a>
      );
  }
}

function Learned({ text }: { text: string }) {
  return (
    <aside className="learned" aria-label="What I learned">
      <span className="eyebrow">What I learned</span>
      <p>{text}</p>
    </aside>
  );
}

export function Milestone({ milestone, lang }: { milestone: MilestoneData; lang: Locale }) {
  const { id, year, yearIsRange, period, eyebrow, titleLines, titleEmphasis, current, companyBuilder, learned, blocks } =
    milestone;
  // The lesson closes the story, ahead of any photos and blog posts.
  const mediaAt = blocks.findIndex((b) => b.kind === "video" || b.kind === "gallery" || b.kind === "posts");
  const learnedAt = mediaAt === -1 ? blocks.length : mediaAt;
  const className = ["milestone", companyBuilder && "company-builder", current && "current"]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className} id={id}>
      <div className={yearIsRange ? "year words" : "year"}>
        {year}
        <span>
          {current && <i aria-hidden="true" />}
          {current && " "}
          {period}
        </span>
      </div>
      <div className="story">
        {blocks[0]?.kind === "origin" && <BlockView block={blocks[0]} lang={lang} />}
        <span className="eyebrow">{eyebrow}</span>
        <h2>
          {titleLines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
          {titleEmphasis && (
            <>
              <br />
              <em>{titleEmphasis}</em>
            </>
          )}
        </h2>
        {blocks.map((block, i) => {
          if (blocks[0]?.kind === "origin" && i === 0) return null;
          return (
            <Fragment key={i}>
              {i === learnedAt && learned && <Learned text={learned} />}
              <BlockView block={block} lang={lang} />
            </Fragment>
          );
        })}
        {learned && learnedAt === blocks.length && <Learned text={learned} />}
      </div>
    </article>
  );
}
