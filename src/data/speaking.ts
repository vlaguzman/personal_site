import type { Locale } from "@/i18n/config";
import { getHero, type HeroContent } from "./hero";
import { milestones } from "./milestones";
import { SITE } from "./site";
import type { GalleryImage } from "./types";

export type SpeakingContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  headlineLines: string[];
  headlineEmphasis: string;
  intro: string;
  photo: HeroContent["photo"];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  sections: { topics: string; featured: string; teaching: string; bio: string };
  /** Accessible name of the topics list. */
  topicsLabel: string;
  topics: { title: string; text: string }[];
  bio: string;
  founderProfileLabel: string;
  closing: { titleLead: string; titleEmphasis: string; text: string };
};

type CommunityText = { eyebrow: string; title: string; text: string };

// Locale-neutral values are defined once; only text differs per locale.
const INVITE_HREF = SITE.calendly;
const CAMBRIDGE_HREF = "#cambridge";

const SPEAKING: Record<Locale, Omit<SpeakingContent, "photo">> = {
  en: {
    meta: {
      title: "Speaking | Vladimir Guzmán",
      description:
        "Talks and workshops on entrepreneurship, technology and human potential. Challenge assumptions, start better conversations.",
    },
    eyebrow: "SPEAKING",
    headlineLines: ["Challenge assumptions."],
    headlineEmphasis: "Start better conversations.",
    intro:
      "I bring firsthand experience from entrepreneurship, technology leadership and AI to conversations about how businesses grow, how people adapt and how we create opportunities that matter.",
    primaryCta: { label: "Invite me to speak", href: INVITE_HREF },
    secondaryCta: { label: "See the Cambridge talk", href: CAMBRIDGE_HREF },
    sections: {
      topics: "What I speak about",
      featured: "Featured talk",
      teaching: "Teaching",
      bio: "About Vladimir",
    },
    topicsLabel: "Speaking topics",
    topics: [
      {
        title: "Entrepreneurship without mythology",
        text: "Challenging the popular stories about raising capital, scaling, failure, risk, freedom and what it really means to build a business.",
      },
      {
        title: "Technology beyond the hype",
        text: "Practical thinking about AI, automation, software, product strategy and the decisions businesses actually need to make.",
      },
      {
        title: "Human potential and opportunity",
        text: "Exploring education, meaningful work, leadership, inclusion and what helps people discover and develop their capabilities.",
      },
    ],
    bio: "Vladimir Guzmán is a Colombian entrepreneur and technology builder based in London. He is the co-founder and former CTO of HoyTrabajas (Y Combinator W22), a former technology leader at FLUVIP, and is now building Gingga, AI-powered sales systems.",
    founderProfileLabel: "Download founder profile",
    closing: {
      titleLead: "Start the",
      titleEmphasis: "conversation.",
      text: "Conferences, roundtables and workshops. Tell me about your audience and the conversation you would like to start.",
    },
  },
  es: {
    meta: {
      title: "Charlas | Vladimir Guzmán",
      description:
        "Charlas y talleres sobre emprendimiento, tecnología y potencial humano. Cuestiona los supuestos, empieza mejores conversaciones.",
    },
    eyebrow: "CHARLAS",
    headlineLines: ["Cuestiona los supuestos."],
    headlineEmphasis: "Empieza mejores conversaciones.",
    intro:
      "Aporto experiencia directa en emprendimiento, liderazgo tecnológico e inteligencia artificial a conversaciones sobre cómo crecen los negocios, cómo se adaptan las personas y cómo creamos oportunidades que importan.",
    primaryCta: { label: "Invítame a hablar", href: INVITE_HREF },
    secondaryCta: { label: "Conoce la charla de Cambridge", href: CAMBRIDGE_HREF },
    sections: {
      topics: "Sobre qué hablo",
      featured: "Charla destacada",
      teaching: "Docencia",
      bio: "Sobre Vladimir",
    },
    topicsLabel: "Temas de las charlas",
    topics: [
      {
        title: "Emprendimiento sin mitología",
        text: "Cuestionar las historias populares sobre levantar capital, escalar, fracasar, el riesgo, la libertad y lo que realmente significa construir un negocio.",
      },
      {
        title: "Tecnología más allá del hype",
        text: "Pensamiento práctico sobre IA, automatización, software, estrategia de producto y las decisiones que los negocios realmente necesitan tomar.",
      },
      {
        title: "Potencial humano y oportunidad",
        text: "Explorar la educación, el trabajo con sentido, el liderazgo, la inclusión y lo que ayuda a las personas a descubrir y desarrollar sus capacidades.",
      },
    ],
    bio: "Vladimir Guzmán es un emprendedor colombiano y constructor de tecnología radicado en Londres. Es cofundador y ex-CTO de HoyTrabajas (Y Combinator W22), exlíder tecnológico de FLUVIP y hoy construye Gingga, sistemas de ventas con inteligencia artificial.",
    founderProfileLabel: "Descargar perfil de fundador",
    closing: {
      titleLead: "Empieza la",
      titleEmphasis: "conversación.",
      text: "Conferencias, mesas redondas y talleres. Cuéntame sobre tu audiencia y la conversación que te gustaría iniciar.",
    },
  },
};

const TEACHING: Record<Locale, { text: string }> = {
  en: { text: "I have been a professor of entrepreneurship and AI applied to business." },
  es: { text: "He sido profesor de emprendimiento e IA aplicada a los negocios." },
};

/** Photos from the journey in which he appears. More can be added here as they are uploaded. */
const TEACHING_PHOTOS = ["/images/journey/consulate-london.jpg"];

export function getSpeaking(lang: Locale): SpeakingContent {
  return { ...SPEAKING[lang], photo: getHero(lang).photo };
}

/**
 * His teaching. The general Consulate story (video, figures, all photos) lives on the journey;
 * here only the photos where he appears are shown, read from the journey so nothing is repeated.
 * Until the journey is translated, the photo alt text stays English.
 */
export function getTeaching(lang: Locale) {
  const gallery = milestones.find((m) => m.id === "year2023-community")?.blocks.find((b) => b.kind === "gallery");
  if (gallery?.kind !== "gallery") throw new Error("Consulate milestone has no photos");
  const images = (gallery.images as GalleryImage[]).filter((i) => TEACHING_PHOTOS.includes(i.src));
  if (images.length !== TEACHING_PHOTOS.length) throw new Error("A teaching photo is missing from the journey");
  return { ...TEACHING[lang], images };
}
