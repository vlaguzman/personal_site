import type { Locale } from "@/i18n/config";
import { TALK } from "./site";

export type TalkContent = {
  pdf: string;
  pdfName: string;
  cover: string;
  coverAlt: string;
  eyebrow: string;
  /** The talk's real title, which is English in every locale. One entry per visual line. */
  titleLines: string[];
  venue: string;
  description: string;
  /** Accessible name of the cover image link. */
  coverLinkLabel: string;
  viewSlides: string;
  download: string;
};

type TalkText = Pick<
  TalkContent,
  "eyebrow" | "description" | "coverLinkLabel" | "viewSlides" | "download"
>;

// Locale-neutral values are defined once; only text differs per locale.
const TITLE_LINES = ["Unlocking Human Potential", "in the Age of AI"];
const VENUE = "Clare Hall, Cambridge";

const TALK_TEXT: Record<Locale, TalkText> = {
  en: {
    eyebrow: "CAMBRIDGE · 2026 · CONFERENCE TALK",
    description:
      "From opening a restaurant to building technology businesses, I explore how learning and adaptation can change a person’s path, and why AI makes recognising overlooked talent more urgent.",
    coverLinkLabel: "Open the Cambridge talk slides as a PDF",
    viewSlides: "View slides",
    download: "Download PDF",
  },
  es: {
    eyebrow: "CAMBRIDGE · 2026 · CHARLA EN CONFERENCIA",
    description:
      "Desde abrir un restaurante hasta construir negocios de tecnología, exploro cómo el aprendizaje y la adaptación pueden cambiar el camino de una persona, y por qué la IA hace más urgente reconocer el talento que pasa desapercibido.",
    coverLinkLabel: "Abrir las diapositivas de la charla de Cambridge en PDF",
    viewSlides: "Ver diapositivas (en inglés)",
    download: "Descargar PDF",
  },
};

export function getTalk(lang: Locale): TalkContent {
  return { ...TALK, titleLines: TITLE_LINES, venue: VENUE, ...TALK_TEXT[lang] };
}
