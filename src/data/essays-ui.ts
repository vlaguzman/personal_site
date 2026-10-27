import type { Locale } from "@/i18n/config";
import type { Topic } from "./types";

/**
 * Interface text of the essays hub and the essay page. The essays themselves
 * (titles, bodies, slugs) are not here: see `posts.ts` (Spanish originals) and
 * `posts-en.ts` (English translations).
 * `Topic` keys stay English because they drive filtering; only the label is localised.
 */
export type EssaysUi = {
  meta: { title: string; description: string };
  hub: { eyebrow: string; titleLead: string; titleEmphasis: string; intro: string };
  /** Accessible name of the topic filter group. */
  filterLabel: string;
  allLabel: string;
  topics: Record<Topic, string>;
  /** Eyebrow of the featured essay. */
  startHere: string;
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
  newsletter: {
    title: string;
    emailLabel: string;
    subscribe: string;
    noList: string;
    mailtoLabel: string;
    mailtoSubject: string;
  };
  article: { back: string; related: string };
};

const LANGUAGE_NAMES: Record<Locale, Record<Locale, string>> = {
  en: { en: "English", es: "Spanish" },
  es: { en: "inglés", es: "español" },
};

const ESSAYS_UI: Record<Locale, EssaysUi> = {
  en: {
    meta: {
      title: "Essays | Vladimir Guzmán",
      description:
        "Lessons on startups, strategy and building companies, collected from Vladimir Guzmán’s own ventures. Organised by topic, not by date.",
    },
    hub: {
      eyebrow: "ESSAYS",
      titleLead: "Lessons from",
      titleEmphasis: "building",
      intro:
        "Notes on startups, strategy and building companies, written after the fact from my own ventures. Organised by topic rather than date, so you can read in whatever order serves you. The originals are in Spanish, the language I wrote them in. Each one also has an English translation, made with AI.",
    },
    filterLabel: "Filter by topic",
    allLabel: "All",
    topics: {
      Startups: "Startups",
      Product: "Product",
      Technology: "Technology",
      Strategy: "Strategy",
      Fundraising: "Fundraising",
    },
    startHere: "Start here",
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
    newsletter: {
      title: "New essays, when they’re ready",
      emailLabel: "Email address",
      subscribe: "Subscribe",
      noList: "There is no mailing list yet. Email me and I’ll note you down for the next essay.",
      mailtoLabel: "Email me to be notified",
      mailtoSubject: "Notify me about new essays",
    },
    article: { back: "All essays", related: "Related reading" },
  },
  es: {
    meta: {
      title: "Ensayos | Vladimir Guzmán",
      description:
        "Lecciones sobre startups, estrategia y cómo construir empresas, recogidas de los propios proyectos de Vladimir Guzmán. Organizadas por tema, no por fecha.",
    },
    hub: {
      eyebrow: "ENSAYOS",
      titleLead: "Lo que aprendí",
      titleEmphasis: "construyendo",
      intro:
        "Notas sobre startups, estrategia y cómo construir empresas, escritas en retrospectiva a partir de mis propios proyectos. Organizadas por tema y no por fecha, para que las leas en el orden que más te sirva. Están en su idioma original, el español. Cada uno tiene también una traducción al inglés hecha con IA.",
    },
    filterLabel: "Filtrar por tema",
    allLabel: "Todos",
    topics: {
      Startups: "Startups",
      Product: "Producto",
      Technology: "Tecnología",
      Strategy: "Estrategia",
      Fundraising: "Levantar capital",
    },
    startHere: "Empieza aquí",
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
    newsletter: {
      title: "Nuevos ensayos, cuando estén listos",
      emailLabel: "Correo electrónico",
      subscribe: "Suscribirme",
      noList: "Todavía no hay lista de correo. Escríbeme y te anoto para el próximo ensayo.",
      mailtoLabel: "Escríbeme para que te avise",
      mailtoSubject: "Avísame de los nuevos ensayos",
    },
    article: { back: "Todos los ensayos", related: "Lecturas relacionadas" },
  },
};

export function getEssaysUi(lang: Locale): EssaysUi {
  return ESSAYS_UI[lang];
}
