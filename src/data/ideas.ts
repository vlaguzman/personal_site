import type { Locale } from "@/i18n/config";

export type IdeasContent = {
  eyebrow: string;
  /** Heading text before the emphasised word. */
  titleLead: string;
  titleEmphasis: string;
  /** Accessible name of the list of ideas. */
  listLabel: string;
  items: { claim: string; argument: string }[];
  closing: string;
  cta: { label: string; href: string };
};

const CTA_HREF = "/essays";

const IDEAS: Record<Locale, IdeasContent> = {
  en: {
    eyebrow: "HOW I THINK",
    titleLead: "Ideas worth",
    titleEmphasis: "challenging",
    listLabel: "Ideas worth challenging",
    items: [
      {
        claim: "Not every business needs AI.",
        argument:
          "Technology should solve meaningful problems, not simply follow trends. The question isn’t what we can automate, but what becomes possible when we do.",
      },
      {
        claim: "Raising money isn’t the same as building a successful business.",
        argument:
          "Funding creates opportunities, but customers, financial discipline and real value are what sustain a company.",
      },
      {
        claim: "Talent isn’t always the problem. Opportunity often is.",
        argument:
          "What if our greatest untapped resource isn’t technology, but the human potential we haven’t learned to recognise?",
      },
    ],
    closing:
      "I don’t claim to have every answer. I believe good questions, honest debate and the willingness to experiment can take us further.",
    cta: { label: "Explore more ideas", href: CTA_HREF },
  },
  es: {
    eyebrow: "CÓMO PIENSO",
    titleLead: "Ideas que vale la pena",
    titleEmphasis: "cuestionar",
    listLabel: "Ideas que vale la pena cuestionar",
    items: [
      {
        claim: "No todos los negocios necesitan inteligencia artificial.",
        argument:
          "La tecnología debe resolver problemas reales, no simplemente seguir tendencias. La pregunta no es cuánto podemos automatizar, sino qué nuevas posibilidades podemos crear.",
      },
      {
        claim: "Levantar inversión no es lo mismo que construir una empresa exitosa.",
        argument:
          "El capital abre puertas, pero son los clientes, la disciplina financiera y el valor que generamos los que sostienen un negocio.",
      },
      {
        claim: "El talento no siempre es el problema. Las oportunidades muchas veces sí.",
        argument:
          "¿Y si una de nuestras mayores riquezas no estuviera en la tecnología, sino en el potencial de millones de personas que todavía no hemos aprendido a reconocer?",
      },
    ],
    closing:
      "No pretendo tener todas las respuestas. Creo en las buenas preguntas, en debatir con honestidad y en aprender haciendo.",
    cta: { label: "Explora más ideas", href: CTA_HREF },
  },
};

export function getIdeas(lang: Locale): IdeasContent {
  return IDEAS[lang];
}
