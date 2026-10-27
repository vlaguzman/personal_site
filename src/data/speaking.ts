import type { Locale } from "@/i18n/config";
import { getHero, type HeroContent } from "./hero";
import { milestones } from "./milestones";
import { SITE } from "./site";
import type { Fact, GalleryImage } from "./types";

export type SpeakingContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  headlineLines: string[];
  headlineEmphasis: string;
  intro: string;
  photo: HeroContent["photo"];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  sections: { topics: string; featured: string; community: string; bio: string };
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
      community: "In the community",
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
    bio: "Vladimir Guzmán is a Colombian entrepreneur and technology builder based in London. He is the co-founder and former CTO of HoyTrabajas (Y Combinator W22), a former technology leader at FLUVIP, and is now building Gingga, AI-powered sales systems. At the Colombian Consulate in London he supported 270+ entrepreneurs through programmes and workshops.",
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
      community: "En la comunidad",
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
    bio: "Vladimir Guzmán es un emprendedor colombiano y constructor de tecnología radicado en Londres. Es cofundador y ex-CTO de HoyTrabajas (Y Combinator W22), exlíder tecnológico de FLUVIP y hoy construye Gingga, sistemas de ventas con inteligencia artificial. En el Consulado de Colombia en Londres acompañó a 270+ emprendedores a través de programas y talleres.",
    founderProfileLabel: "Descargar perfil de fundador",
    closing: {
      titleLead: "Empieza la",
      titleEmphasis: "conversación.",
      text: "Conferencias, mesas redondas y talleres. Cuéntame sobre tu audiencia y la conversación que te gustaría iniciar.",
    },
  },
};

const COMMUNITY: Record<Locale, CommunityText> = {
  en: {
    eyebrow: "LONDON · 2023–2025 · PROGRAMMES & WORKSHOPS",
    title: "Colombian Consulate in London",
    text: "I designed entrepreneurship programmes and delivered workshops for migrant entrepreneurs, from business development to digital transformation.",
  },
  es: {
    eyebrow: "LONDRES · 2023–2025 · PROGRAMAS Y TALLERES",
    title: "Consulado de Colombia en Londres",
    text: "Diseñé programas de emprendimiento e impartí talleres para emprendedores migrantes, desde el desarrollo de negocios hasta la transformación digital.",
  },
};

export function getSpeaking(lang: Locale): SpeakingContent {
  return { ...SPEAKING[lang], photo: getHero(lang).photo };
}

/**
 * The Consulate programmes as a speaking engagement. The video, photos and facts are read from
 * the journey so nothing is repeated; until the journey is translated their text stays English.
 */
export function getConsulateEngagement(lang: Locale) {
  const milestone = milestones.find((m) => m.id === "year2023-community");
  if (!milestone) throw new Error("Consulate milestone not found");
  const video = milestone.blocks.find((b) => b.kind === "video");
  const gallery = milestone.blocks.find((b) => b.kind === "gallery");
  const facts = milestone.blocks.find((b) => b.kind === "facts");
  if (video?.kind !== "video" || gallery?.kind !== "gallery" || facts?.kind !== "facts") {
    throw new Error("Consulate milestone is missing its video, photos or facts");
  }
  return {
    ...COMMUNITY[lang],
    video: { youtubeId: video.youtubeId, title: video.title },
    images: gallery.images as GalleryImage[],
    facts: facts.items as Fact[],
  };
}
