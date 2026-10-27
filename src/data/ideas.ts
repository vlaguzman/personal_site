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

const CTA_HREF = "/speaking#writing";

const IDEAS: Record<Locale, IdeasContent> = {
  en: {
    eyebrow: "HOW I THINK",
    titleLead: "Ideas worth",
    titleEmphasis: "challenging",
    listLabel: "Ideas worth challenging",
    items: [
      {
        claim: "Faster isn’t always better.",
        argument:
          "“Make it faster” is a founding premise of digital entrepreneurship, and AI has amplified it. What I’ve learned is that you don’t always have to run: whoever runs without knowing where they’re going never arrives anywhere.",
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
        claim: "No siempre más rápido es mejor.",
        argument:
          "Aunque “make it faster” es una premisa del emprendimiento digital, potenciada por la IA, he aprendido que no siempre hay que correr: quien corre sin saber a dónde va no llega a ningún lugar.",
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
