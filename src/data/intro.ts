import type { Locale } from "@/i18n/config";

export type IntroContent = { eyebrow: string; statement: string; support: string };

const INTRO: Record<Locale, IntroContent> = {
  en: {
    eyebrow: "WHERE THIS COMES FROM",
    statement: "I’ve built businesses, led technology teams, experienced failure and started again.",
    support:
      "From opening a restaurant in Colombia to building a Y Combinator-backed company, I’ve learned that the most valuable ideas often begin by questioning what everyone else takes for granted.",
  },
  es: {
    eyebrow: "DE DÓNDE VIENE ESTO",
    statement: "He creado empresas, liderado equipos de tecnología, fracasado y vuelto a empezar.",
    support:
      "Desde abrir un restaurante en Colombia hasta construir una startup que llegó a Y Combinator, he aprendido que muchas de las mejores oportunidades aparecen cuando nos atrevemos a cuestionar lo que otros dan por hecho.",
  },
};

export function getIntro(lang: Locale): IntroContent {
  return INTRO[lang];
}
