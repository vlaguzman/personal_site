import type { Locale } from "@/i18n/config";
import type { Belief } from "./types";

export type BeliefsContent = {
  eyebrow: string;
  /** Heading text before the emphasised word. */
  titleLead: string;
  titleEmphasis: string;
  intro: { statement: string; text: string };
  items: Belief[];
  closing: { lead: string; cta: { label: string; href: string } };
};

const CTA_HREF = "#contact";

const BELIEFS: Record<Locale, BeliefsContent> = {
  en: {
    eyebrow: "PRINCIPLES",
    titleLead: "What I",
    titleEmphasis: "believe",
    intro: {
      statement: "Build with ambition. Act with integrity. Stay human.",
      text: "I believe entrepreneurship can create freedom and opportunity, but it should never become an excuse to lose sight of what matters.",
    },
    items: [
      {
        title: "Success should mean more than money.",
        text: "Profit matters. Financial sustainability matters. But neither is a complete definition of a successful life or a meaningful business.",
      },
      {
        title: "Nobody builds anything meaningful alone.",
        text: "Entrepreneurship may begin with individual initiative, but lasting progress depends on relationships, collaboration and generosity.",
      },
      {
        title: "Technology should expand human potential, not replace human purpose.",
        text: "AI and automation are powerful tools, but adopting technology without asking what it improves is not innovation.",
      },
      {
        title: "Integrity is tested when it becomes inconvenient.",
        text: "Courage sometimes means challenging the consensus, admitting uncertainty, turning down an opportunity or starting again.",
      },
      {
        title: "Build a life worth living, not just a business worth selling.",
        text: "Professional achievement should not automatically outrank relationships, personal growth and the things that give life meaning.",
      },
    ],
    closing: { lead: "If this resonates,", cta: { label: "Let’s talk", href: CTA_HREF } },
  },
  es: {
    eyebrow: "PRINCIPIOS",
    titleLead: "En qué",
    titleEmphasis: "creo",
    intro: {
      statement: "Ambición para construir. Principios para decidir. Personas primero.",
      text: "Creo que emprender puede abrir oportunidades y transformar vidas, pero nunca debería significar perder aquello que da sentido a lo que hacemos.",
    },
    items: [
      {
        title: "El éxito debería significar más que dinero.",
        text: "La rentabilidad importa. La sostenibilidad financiera importa. Pero ninguna de las dos define por completo una vida exitosa ni un negocio con sentido.",
      },
      {
        title: "Nadie construye nada importante solo.",
        text: "Emprender puede empezar con la iniciativa de una persona, pero el progreso duradero depende de las relaciones, la colaboración y la generosidad.",
      },
      {
        title: "La tecnología debería ampliar el potencial humano, no reemplazar el propósito humano.",
        text: "La IA y la automatización son herramientas poderosas, pero adoptar tecnología sin preguntarse qué mejora no es innovar.",
      },
      {
        title: "La integridad se prueba cuando se vuelve incómoda.",
        text: "A veces el coraje es cuestionar el consenso, admitir la incertidumbre, rechazar una oportunidad o empezar de nuevo.",
      },
      {
        title: "Construye una vida que valga la pena vivir, no solo un negocio que valga la pena vender.",
        text: "El éxito profesional no debería pasar automáticamente por encima de las relaciones, el crecimiento personal y lo que le da sentido a la vida.",
      },
    ],
    closing: { lead: "Si esto resuena,", cta: { label: "Conversemos", href: CTA_HREF } },
  },
};

export function getBeliefs(lang: Locale): BeliefsContent {
  return BELIEFS[lang];
}
