import Image from "next/image";
import Link from "next/link";
import { getEssaysUi } from "@/data/essays-ui";
import type { Essay } from "@/data/types";
import { localePath, type Locale } from "@/i18n/config";
import { readingTimeMinutes } from "@/lib/essays";
import { TranslationBadge } from "./TranslationBadge";

export function EssayCard({ essay, lang }: { essay: Essay; lang: Locale }) {
  const ui = getEssaysUi(lang);
  const label = essay.topic ? ui.topics[essay.topic].toLocaleUpperCase(lang) : ui.fallbackLabel;

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
          {label}
          {essay.lang !== lang && ` · ${ui.languageNote.short(essay.lang).toLocaleUpperCase(lang)}`}
        </span>
        <h3 lang={essay.lang}>
          <Link href={localePath(lang, `/essays/${essay.slug}`)} lang={essay.lang}>
            {essay.title}
          </Link>
        </h3>
        {essay.translatedWithAI && <TranslationBadge lang={lang} />}
        <span className="essay-meta">{ui.readingTime(readingTimeMinutes(essay.sections))}</span>
      </div>
    </article>
  );
}
