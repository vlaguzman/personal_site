import type { Locale } from "@/i18n/config";

export type PurposeContent = {
  eyebrow: string;
  /** Opening of the quote, up to the emphasised words. Keeps its trailing space. */
  quoteLead: string;
  quoteEmphasis: string;
  name: string;
  tagline: string;
};

const NAME = "Vladimir Guzmán";

const PURPOSE: Record<Locale, PurposeContent> = {
  en: {
    eyebrow: "WHAT CONNECTS IT ALL",
    quoteLead: "My purpose is to help entrepreneurs ",
    quoteEmphasis: "make a living from their passion.",
    name: NAME,
    tagline: "TECHNOLOGY + EDUCATION + PRACTICAL SUPPORT",
  },
  es: {
    eyebrow: "LO QUE LO CONECTA TODO",
    quoteLead: "Mi propósito es ayudar a los emprendedores a ",
    quoteEmphasis: "vivir de su pasión.",
    name: NAME,
    tagline: "TECNOLOGÍA + EDUCACIÓN + APOYO PRÁCTICO",
  },
};

export function getPurpose(lang: Locale): PurposeContent {
  return PURPOSE[lang];
}
