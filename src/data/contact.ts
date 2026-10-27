import type { Locale } from "@/i18n/config";

/** Labels only: the Calendly, LinkedIn and profile URLs are locale-neutral and live in `site.ts`. */
export type ContactContent = {
  eyebrow: string;
  /** First heading line; the emphasis is the second line. */
  titleLead: string;
  titleEmphasis: string;
  text: string;
  booking: { label: string };
  linkedin: { label: string };
  profile: { label: string };
};

const CONTACT: Record<Locale, ContactContent> = {
  en: {
    eyebrow: "THE NEXT CONVERSATION",
    titleLead: "What are",
    titleEmphasis: "you building?",
    text: "I’m open to thoughtful conversations about entrepreneurship, strategic technology and partnerships that help businesses move forward.",
    booking: { label: "Book a conversation" },
    linkedin: { label: "LinkedIn" },
    profile: { label: "Download founder profile" },
  },
  es: {
    eyebrow: "LA PRÓXIMA CONVERSACIÓN",
    titleLead: "¿Qué estás",
    titleEmphasis: "construyendo?",
    text: "Estoy abierto a conversaciones reflexivas sobre emprendimiento, tecnología estratégica y alianzas que ayuden a los negocios a avanzar.",
    booking: { label: "Agenda una conversación" },
    linkedin: { label: "LinkedIn" },
    profile: { label: "Descargar perfil de fundador" },
  },
};

export function getContact(lang: Locale): ContactContent {
  return CONTACT[lang];
}
