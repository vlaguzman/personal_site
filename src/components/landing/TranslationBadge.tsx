import { getEssaysUi } from "@/data/essays-ui";
import type { Locale } from "@/i18n/config";

/** Quiet chip that marks an essay as an AI translation. The text is the signal, never colour alone. */
export function TranslationBadge({ lang }: { lang: Locale }) {
  return (
    <span className="essay-ai-badge" lang={lang}>
      {getEssaysUi(lang).translation.badge}
    </span>
  );
}
