import type { Locale } from "@/i18n/config";
import { SITE } from "./site";

export type ConversationsContent = {
  eyebrow: string;
  /** Heading text before the emphasised words. A "\n" marks a visual line break. */
  titleLead: string;
  titleEmphasis: string;
  /** Whether the emphasis starts a new line instead of continuing the last lead line. */
  titleEmphasisOnOwnLine: boolean;
  paragraphs: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const PRIMARY_HREF = "/speaking";
const SECONDARY_HREF = SITE.whatsapp;

const CONVERSATIONS: Record<Locale, ConversationsContent> = {
  en: {
    eyebrow: "SPEAKING & WRITING",
    titleLead: "Conversations\nworth",
    titleEmphasis: "having",
    titleEmphasisOnOwnLine: false,
    paragraphs: [
      "I speak and write about the intersection of entrepreneurship, technology and people.",
      "My goal is not to tell people what to think. It is to challenge assumptions, share practical experiences and create conversations that lead to better decisions.",
    ],
    primaryCta: { label: "Explore my talks", href: PRIMARY_HREF },
    secondaryCta: { label: "Invite me to speak", href: SECONDARY_HREF },
  },
  es: {
    eyebrow: "CHARLAS Y ESCRITURA",
    titleLead: "Conversaciones que",
    titleEmphasis: "valen la pena",
    titleEmphasisOnOwnLine: true,
    paragraphs: [
      "Escribo y comparto experiencias sobre emprendimiento, tecnología y personas.",
      "No busco decirles a otros cómo pensar. Me interesa cuestionar supuestos, compartir aprendizajes reales y abrir conversaciones que nos ayuden a tomar mejores decisiones.",
    ],
    primaryCta: { label: "Conoce mis charlas", href: PRIMARY_HREF },
    secondaryCta: { label: "Invítame a un evento", href: SECONDARY_HREF },
  },
};

export function getConversations(lang: Locale): ConversationsContent {
  return CONVERSATIONS[lang];
}
