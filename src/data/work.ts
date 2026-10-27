import type { Locale } from "@/i18n/config";
import { milestones } from "./milestones";
import { SITE } from "./site";

export type WorkContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  headlineLines: string[];
  headlineEmphasis: string;
  intro: string;
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  offersTitle: string;
  /** Accessible name of the offers list. */
  offersLabel: string;
  offers: { title: string; text: string; link?: { label: string; href: string } }[];
  approach: string;
  gingga: { title: string; text: string; linkLabel: string };
  closing: { titleLead: string; titleEmphasis: string; text: string };
};

// Locale-neutral values are defined once; only text differs per locale.
const BOOK_HREF = SITE.calendly;
const JOURNEY_HREF = "/journey";
const SPEAKING_HREF = "/speaking";

const WORK: Record<Locale, WorkContent> = {
  en: {
    meta: {
      title: "Work together | Vladimir Guzmán",
      description:
        "Strategic advisory, AI and technology strategy, and workshops for founders and business leaders. Independent thinking, practical experience.",
    },
    eyebrow: "WORK TOGETHER",
    headlineLines: ["Independent thinking."],
    headlineEmphasis: "Practical experience.",
    intro:
      "I work with founders and business leaders who need to make better decisions about strategy, technology and growth.",
    cta: { label: "Book a conversation", href: BOOK_HREF },
    secondaryCta: { label: "See the experience behind it", href: JOURNEY_HREF },
    offersTitle: "How I can help",
    offersLabel: "Ways to work together",
    offers: [
      {
        title: "Strategic advisory",
        text: "Founder-level perspective on business models, product decisions, technical leadership and organisational challenges.",
      },
      {
        title: "AI and technology strategy",
        text: "Helping businesses identify useful opportunities, assess feasibility and turn technology decisions into practical plans.",
      },
      {
        title: "Workshops and speaking",
        text: "Interactive sessions for leadership teams, entrepreneurial communities and organisations navigating technological change.",
        link: { label: "See speaking", href: SPEAKING_HREF },
      },
    ],
    approach: "Engagements are considered individually, based on the problem, potential impact and fit.",
    gingga: {
      title: "Looking for Gingga?",
      text: "Gingga, the company building AI-powered sales systems, is independent from this work and has its own website. If that is what you are looking for, start there.",
      linkLabel: "Visit Gingga",
    },
    closing: {
      titleLead: "Start with the",
      titleEmphasis: "decision.",
      text: "Tell me about the decision you are facing. If I can help, we will talk about how.",
    },
  },
  es: {
    meta: {
      title: "Trabajemos juntos | Vladimir Guzmán",
      description:
        "Asesoría estratégica, estrategia de IA y tecnología, y talleres para fundadores y líderes de negocio. Pensamiento independiente, experiencia práctica.",
    },
    eyebrow: "TRABAJEMOS JUNTOS",
    headlineLines: ["Pensamiento independiente."],
    headlineEmphasis: "Experiencia práctica.",
    intro:
      "Trabajo con fundadores y líderes de negocio que necesitan tomar mejores decisiones sobre estrategia, tecnología y crecimiento.",
    cta: { label: "Agenda una conversación", href: BOOK_HREF },
    secondaryCta: { label: "Conoce la experiencia detrás", href: JOURNEY_HREF },
    offersTitle: "Cómo puedo ayudar",
    offersLabel: "Formas de trabajar juntos",
    offers: [
      {
        title: "Asesoría estratégica",
        text: "Perspectiva de fundador sobre modelos de negocio, decisiones de producto, liderazgo técnico y desafíos organizacionales.",
      },
      {
        title: "Estrategia de IA y tecnología",
        text: "Ayudo a los negocios a identificar oportunidades útiles, evaluar su viabilidad y convertir las decisiones de tecnología en planes prácticos.",
      },
      {
        title: "Talleres y charlas",
        text: "Sesiones interactivas para equipos de liderazgo, comunidades emprendedoras y organizaciones que atraviesan el cambio tecnológico.",
        link: { label: "Conoce las charlas", href: SPEAKING_HREF },
      },
    ],
    approach: "Cada colaboración se evalúa de forma individual, según el problema, el impacto potencial y la afinidad.",
    gingga: {
      title: "¿Buscas Gingga?",
      text: "Gingga, la empresa que construye sistemas de ventas con inteligencia artificial, es independiente de este trabajo y tiene su propio sitio web. Si es lo que buscas, empieza por allí.",
      linkLabel: "Visitar Gingga",
    },
    closing: {
      titleLead: "Empieza por la",
      titleEmphasis: "decisión.",
      text: "Cuéntame sobre la decisión que estás enfrentando. Si puedo ayudar, hablaremos de cómo.",
    },
  },
};

export function getWork(lang: Locale): WorkContent {
  return WORK[lang];
}

/** Gingga's site, read from the journey so the URL lives in one place. */
export function getGinggaUrl() {
  const now = milestones.find((m) => m.id === "now");
  const button = now?.blocks.find((b) => b.kind === "button");
  if (button?.kind !== "button") throw new Error("Gingga link not found in the Now milestone");
  return button.href;
}
