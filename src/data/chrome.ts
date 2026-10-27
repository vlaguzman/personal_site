import type { Locale } from "@/i18n/config";
import { NAV_LINKS } from "./site";

type NavHref = (typeof NAV_LINKS)[number]["href"];

export type ChromeContent = {
  wordmarkSubtitle: string;
  /** Accessible name of the main navigation. */
  navLabel: string;
  /** Accessible name of the language switcher. */
  languageLabel: string;
  nav: { href: string; label: string }[];
  footer: {
    tagline: string;
    links: { journey: string; speaking: string; workTogether: string };
    backToTop: string;
  };
};

/** Locale text for the shared header and footer. Nav labels are keyed by href so none can be missing. */
type ChromeText = Omit<ChromeContent, "nav"> & { navLabels: Record<NavHref, string> };

const CHROME: Record<Locale, ChromeText> = {
  en: {
    wordmarkSubtitle: "ENTREPRENEUR & BUILDER",
    navLabel: "Main navigation",
    languageLabel: "Language",
    navLabels: {
      "/journey": "The journey",
      "/speaking": "Speaking & writing",
      "/work-together": "Work together",
      "#contact": "Let’s connect",
    },
    footer: {
      tagline: "Colombian entrepreneur. Based in London.",
      links: { journey: "Journey", speaking: "Speaking & writing", workTogether: "Work together" },
      backToTop: "Back to top ↑",
    },
  },
  es: {
    wordmarkSubtitle: "EMPRENDEDOR Y CONSTRUCTOR",
    navLabel: "Navegación principal",
    languageLabel: "Idioma",
    navLabels: {
      "/journey": "Mi trayectoria",
      "/speaking": "Charlas y escritos",
      "/work-together": "Trabajemos juntos",
      "#contact": "Conectemos",
    },
    footer: {
      tagline: "Emprendedor colombiano. Radicado en Londres.",
      links: { journey: "Trayectoria", speaking: "Charlas y escritos", workTogether: "Trabajemos juntos" },
      backToTop: "Volver arriba ↑",
    },
  },
};

export function getChrome(lang: Locale): ChromeContent {
  const { navLabels, ...text } = CHROME[lang];
  return { ...text, nav: NAV_LINKS.map(({ href }) => ({ href, label: navLabels[href] })) };
}
