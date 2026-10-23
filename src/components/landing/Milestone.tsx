import { Fragment } from "react";
import type { Block, Milestone as MilestoneData } from "@/data/types";

function BlockView({ block }: { block: Block }) {
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
                  <b aria-hidden="true">↓</b>
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
    case "button":
      return (
        <a className="button" href={block.href} target="_blank" rel="noopener noreferrer">
          {block.label} <span>↗</span>
        </a>
      );
  }
}

export function Milestone({ milestone }: { milestone: MilestoneData }) {
  const { id, year, yearIsRange, period, eyebrow, titleLines, titleEmphasis, current, companyBuilder, blocks } =
    milestone;
  const className = ["milestone", companyBuilder && "company-builder", current && "current"]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className} id={id}>
      <div className={yearIsRange ? "year words" : "year"}>
        {year}
        <span>
          {current && <i />}
          {current && " "}
          {period}
        </span>
      </div>
      <div className="story">
        {blocks[0]?.kind === "origin" && <BlockView block={blocks[0]} />}
        <span className="eyebrow">{eyebrow}</span>
        <h3>
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
        </h3>
        {blocks.map((block, i) => (blocks[0]?.kind === "origin" && i === 0 ? null : <BlockView key={i} block={block} />))}
      </div>
    </article>
  );
}
