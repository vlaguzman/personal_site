import type { Locale } from "@/i18n/config";
import type { Topic } from "./types";

/**
 * Interface text of the essay browser (on the speaking page) and the essay page. The essays themselves
 * (titles, bodies, slugs) are not here: see `posts.ts` (Spanish originals) and
 * `posts-en.ts` (English translations).
 * `Topic` keys stay English because they drive filtering; only the label is localised.
 */
export type EssaysUi = {
  /** Accessible name of the topic filter group. */
  filterLabel: string;
  allLabel: string;
  topics: Record<Topic, string>;
  /** Live count under the filters. */
  count: (shown: number, total: number) => string;
  /** Eyebrow of a card whose essay has no topic. */
  fallbackLabel: string;
  readingTime: (minutes: number) => string;
  readingTimeShort: (minutes: number) => string;
  /** Notice for an essay written in a language other than the page's. Receives the essay's language. */
  languageNote: { short: (essayLang: Locale) => string; long: (essayLang: Locale) => string };
  /**
   * Labels for the AI translations. `badge` is the chip shown wherever a translated essay appears;
   * `note` and `readOriginal` sit in the translated article's header; `readTranslation` sits in the original's.
   */
  translation: { badge: string; note: string; readOriginal: string; readTranslation: string };
  share: { label: string; x: string; linkedin: string };
  article: { back: string; related: string };
};

const LANGUAGE_NAMES: Record<Locale, Record<Locale, string>> = {
  en: { en: "English", es: "Spanish" },
  es: { en: "inglés", es: "español" },
};

const ESSAYS_UI: Record<Locale, EssaysUi> = {
  en: {
    filterLabel: "Filter by topic",
    allLabel: "All",
    topics: {
      Startups: "Startups",
      Product: "Product",
      Technology: "Technology",
      Strategy: "Strategy",
      Fundraising: "Fundraising",
    },
    count: (shown, total) => `Showing ${shown} of ${total} ${total === 1 ? "essay" : "essays"}`,
    fallbackLabel: "ESSAY",
    readingTime: (minutes) => `${minutes} min read`,
    readingTimeShort: (minutes) => `${minutes} min`,
    languageNote: {
      short: (essayLang) => `In ${LANGUAGE_NAMES.en[essayLang]}`,
      long: (essayLang) => `Written in ${LANGUAGE_NAMES.en[essayLang]}`,
    },
    translation: {
      badge: "Translated with AI",
      note: "Translated with AI from the Spanish original.",
      readOriginal: "Read the original in Spanish",
      readTranslation: "Read in English (translated with AI)",
    },
    share: { label: "SHARE", x: "Share on X", linkedin: "Share on LinkedIn" },
    article: { back: "All essays", related: "Related reading" },
  },
  es: {
    filterLabel: "Filtrar por tema",
    allLabel: "Todos",
    topics: {
      Startups: "Startups",
      Product: "Producto",
      Technology: "Tecnología",
      Strategy: "Estrategia",
      Fundraising: "Levantar capital",
    },
    count: (shown, total) => `Mostrando ${shown} de ${total} ${total === 1 ? "ensayo" : "ensayos"}`,
    fallbackLabel: "ENSAYO",
    readingTime: (minutes) => `${minutes} min de lectura`,
    readingTimeShort: (minutes) => `${minutes} min`,
    languageNote: {
      short: (essayLang) => `En ${LANGUAGE_NAMES.es[essayLang]}`,
      long: (essayLang) => `Escrito en ${LANGUAGE_NAMES.es[essayLang]}`,
    },
    translation: {
      badge: "Traducido con IA",
      note: "Traducido con IA a partir del original en español.",
      readOriginal: "Leer el original en español",
      readTranslation: "Leer en inglés (traducido con IA)",
    },
    share: { label: "COMPARTIR", x: "Compartir en X", linkedin: "Compartir en LinkedIn" },
    article: { back: "Todos los ensayos", related: "Lecturas relacionadas" },
  },
};

export function getEssaysUi(lang: Locale): EssaysUi {
  return ESSAYS_UI[lang];
}
