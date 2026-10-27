import Link from "next/link";
import { Fragment } from "react";
import { getConversations } from "@/data/conversations";
import { localePath, type Locale } from "@/i18n/config";

export function Conversations({ lang }: { lang: Locale }) {
  const conversations = getConversations(lang);
  const lines = conversations.titleLead.split("\n");
  return (
    <section id="conversations" className="conversations wrap">
      <div className="conversations-heading">
        <div>
          <span className="eyebrow">{conversations.eyebrow}</span>
          <h2>
            {lines.map((line, i) => (
              <Fragment key={line}>
                {`${line} `}
                {(i < lines.length - 1 || conversations.titleEmphasisOnOwnLine) && <br />}
              </Fragment>
            ))}
            <em>{conversations.titleEmphasis}</em>
          </h2>
        </div>
        <div className="conversations-body">
          {conversations.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="conversations-actions">
            <Link className="cta-primary" href={localePath(lang, conversations.primaryCta.href)}>
              {conversations.primaryCta.label} <span aria-hidden="true">→</span>
            </Link>
            <a
              className="conversations-link"
              href={localePath(lang, conversations.secondaryCta.href)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {conversations.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
