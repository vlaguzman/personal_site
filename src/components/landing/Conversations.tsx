import Link from "next/link";
import { CONVERSATIONS } from "@/data/conversations";
import { localePath, type Locale } from "@/i18n/config";

export function Conversations({ lang }: { lang: Locale }) {
  return (
    <section id="conversations" className="conversations wrap">
      <div className="conversations-heading">
        <div>
          <span className="eyebrow">{CONVERSATIONS.eyebrow}</span>
          <h2>
            Conversations{" "}
            <br />
            worth <em>having</em>
          </h2>
        </div>
        <div className="conversations-body">
          {CONVERSATIONS.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="conversations-actions">
            <Link className="cta-primary" href={localePath(lang, CONVERSATIONS.primaryCta.href)}>
              {CONVERSATIONS.primaryCta.label} <span aria-hidden="true">→</span>
            </Link>
            <a className="conversations-link" href={localePath(lang, CONVERSATIONS.secondaryCta.href)}>
              {CONVERSATIONS.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
