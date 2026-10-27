import type { Locale } from "@/i18n/config";
import { milestones } from "./milestones";

export type ExperienceContent = {
  eyebrow: string;
  /** Heading text before the emphasised word. */
  titleLead: string;
  titleEmphasis: string;
  paragraphs: string[];
  /** Accessible name of the roles list. */
  rolesLabel: string;
  roles: { title: string; context: string }[];
  /** Accessible name of the figures list. */
  figuresLabel: string;
  figures: { value: string; label: string; source?: { label: string; href: string } }[];
  cta: { label: string; href: string };
};

/** Copy that differs per locale. The years paragraph is a function because the number is computed. */
type ExperienceText = {
  eyebrow: string;
  titleLead: string;
  titleEmphasis: string;
  yearsParagraph: (years: number) => string;
  paragraph: string;
  rolesLabel: string;
  roles: ExperienceContent["roles"];
  figuresLabel: string;
  /** One label per entry in FIGURES, in the same order. */
  figureLabels: [string, string, string, string];
  cta: { label: string };
};

// Locale-neutral values are defined once; only the labels differ per locale.
const FIGURES = [
  {
    value: "US$4.5m",
    source: {
      label: "LatamList",
      href: "https://latamlist.com/colombian-marketing-startup-fluvip-receives-us4-5m-series-a-investment/",
    },
  },
  {
    value: "US$5m",
    source: {
      label: "Forbes Colombia",
      href: "https://forbes.co/emprendedores/plataforma-de-empleos-hoytrabajas-capta-us5-millones-en-ronda-semilla",
    },
  },
  { value: "20+" },
  { value: "270+" },
] as const;

const CTA_HREF = "/journey";

const EXPERIENCE: Record<Locale, ExperienceText> = {
  en: {
    eyebrow: "THE TRACK RECORD",
    titleLead: "Built through",
    titleEmphasis: "experience",
    yearsParagraph: (years) =>
      `I’ve spent ${years} years working across entrepreneurship, software, product development and technology leadership.`,
    paragraph:
      "From early ventures that failed to companies that raised millions, every chapter has challenged how I think about business, success and leadership.",
    rolesLabel: "Experience",
    roles: [
      { title: "Co-founder and former CTO", context: "HoyTrabajas · Y Combinator W22" },
      { title: "Former technology leader", context: "FLUVIP" },
      { title: "Founder of multiple ventures", context: "Including businesses that didn’t work" },
      { title: "Entrepreneurship programmes and workshops", context: "London" },
      { title: "Speaker", context: "AI, entrepreneurship and human potential" },
    ],
    figuresLabel: "Track record",
    figureLabels: [
      "Series A at FLUVIP, 2018",
      "Seed round at HoyTrabajas, 2022",
      "people in the teams I have led across my companies",
      "entrepreneurs reached at the Colombian Consulate in London",
    ],
    cta: { label: "Explore my journey" },
  },
  es: {
    eyebrow: "LA TRAYECTORIA",
    titleLead: "Aprender",
    titleEmphasis: "construyendo",
    yearsParagraph: (years) =>
      `Llevo ${years} años entre el emprendimiento, el desarrollo de software, los productos digitales y el liderazgo tecnológico.`,
    paragraph:
      "He participado en negocios que cerraron, empresas que crecieron internacionalmente y proyectos que levantaron millones en inversión. Cada experiencia ha cambiado mi manera de entender el éxito.",
    rolesLabel: "Experiencia",
    roles: [
      { title: "Cofundador y ex-CTO", context: "HoyTrabajas · Y Combinator W22" },
      { title: "Exlíder tecnológico", context: "FLUVIP" },
      { title: "Fundador de distintos emprendimientos", context: "Incluidos algunos que no funcionaron" },
      { title: "Formación y acompañamiento a emprendedores", context: "Londres" },
      { title: "Conferencista", context: "IA, emprendimiento y potencial humano" },
    ],
    figuresLabel: "Trayectoria en cifras",
    figureLabels: [
      "Serie A en FLUVIP, 2018",
      "Ronda semilla en HoyTrabajas, 2022",
      "personas en los equipos que he liderado en mis empresas",
      "emprendedores alcanzados en el Consulado de Colombia en Londres",
    ],
    cta: { label: "Conoce mi trayectoria" },
  },
};

export function getExperience(lang: Locale, now: Date = new Date()): ExperienceContent {
  const text = EXPERIENCE[lang];
  const years = now.getFullYear() - Number.parseInt(milestones[0].year, 10);
  return {
    eyebrow: text.eyebrow,
    titleLead: text.titleLead,
    titleEmphasis: text.titleEmphasis,
    paragraphs: [text.yearsParagraph(years), text.paragraph],
    rolesLabel: text.rolesLabel,
    roles: text.roles,
    figuresLabel: text.figuresLabel,
    figures: FIGURES.map((figure, i) => ({ ...figure, label: text.figureLabels[i] as string })),
    cta: { label: text.cta.label, href: CTA_HREF },
  };
}
