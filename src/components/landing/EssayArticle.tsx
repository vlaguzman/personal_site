import Link from "next/link";
import { getEssaysUi } from "@/data/essays-ui";
import type { Essay } from "@/data/types";
import { localePath, type Locale } from "@/i18n/config";
import { readingTimeMinutes } from "@/lib/essays";
import { ShareLinks } from "./ShareLinks";
import { TranslationBadge } from "./TranslationBadge";

type Props = {
  essay: Essay;
  related: readonly Essay[];
  lang: Locale;
  /** True when a Spanish original has an English translation under the same slug. */
  translationAvailable?: boolean;
};

export function EssayArticle({ essay, related, lang, translationAvailable = false }: Props) {
  const ui = getEssaysUi(lang);

  return (
    <>
      <article className="essay" lang={essay.lang}>
        <Link className="essay-back" href={localePath(lang, "/speaking#writing")} lang={lang}>
          <span aria-hidden="true">←</span> {ui.article.back}
        </Link>
        <div className="essay-header">
          {essay.topic && <span className="eyebrow" lang={lang}>{ui.topics[essay.topic]}</span>}
          <h1>{essay.title}</h1>
          <p className="essay-meta" lang={lang}>
            <span>{ui.readingTime(readingTimeMinutes(essay.sections))}</span>
            {essay.lang !== lang && <span>{ui.languageNote.long(essay.lang)}</span>}
          </p>
          {essay.translatedWithAI && (
            <div className="essay-translation" lang={lang}>
              <TranslationBadge lang={lang} />
              <p>
                {ui.translation.note}{" "}
                <Link href={localePath("es", `/essays/${essay.slug}`)}>{ui.translation.readOriginal}</Link>
              </p>
            </div>
          )}
          {translationAvailable && !essay.translatedWithAI && (
            <p className="essay-translation" lang={lang}>
              <Link href={localePath("en", `/essays/${essay.slug}`)}>{ui.translation.readTranslation}</Link>
            </p>
          )}
        </div>
        <div className="essay-body">
          {essay.sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              <p>{s.text}</p>
            </section>
          ))}
        </div>
        <ShareLinks title={essay.title} lang={lang} />
      </article>
      {related.length > 0 && (
        <section className="essay-related" aria-labelledby="essay-related-title">
          <h2 id="essay-related-title">{ui.article.related}</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={localePath(lang, `/essays/${r.slug}`)}>
                  <span lang={r.lang}>{r.title}</span>
                  <span className="essay-meta"> · {ui.readingTimeShort(readingTimeMinutes(r.sections))}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
