import type { Locale } from "@/i18n/config";
import { getHero, type HeroContent } from "./hero";
import { getWhatsappLink } from "./site";

export type SpeakingContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  headlineLines: string[];
  headlineEmphasis: string;
  intro: string;
  photo: HeroContent["photo"];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  sections: { topics: string; featured: string; teaching: string; writing: string; bio: string };
  /** Accessible name of the topics list. */
  topicsLabel: string;
  topics: { title: string; text: string }[];
  /** Intro of the Writing section, above the essay browser. */
  writingIntro: string;
  bio: string;
  founderProfileLabel: string;
  closing: { titleLead: string; titleEmphasis: string; text: string };
};

type CommunityText = { eyebrow: string; title: string; text: string };

// Locale-neutral values are defined once; only text differs per locale.
const CAMBRIDGE_HREF = "#cambridge";

const SPEAKING: Record<Locale, Omit<SpeakingContent, "photo">> = {
  en: {
    meta: {
      title: "Speaking & writing | Vladimir Guzmán",
      description:
        "Talks, workshops and essays on entrepreneurship, technology and human potential. Challenge assumptions, start better conversations.",
    },
    eyebrow: "SPEAKING",
    headlineLines: ["Challenge assumptions."],
    headlineEmphasis: "Start better conversations.",
    intro:
      "I bring firsthand experience from entrepreneurship, technology leadership and AI to conversations about how businesses grow, how people adapt and how we create opportunities that matter.",
    primaryCta: { label: "Invite me to speak", href: getWhatsappLink("en") },
    secondaryCta: { label: "See the Cambridge talk", href: CAMBRIDGE_HREF },
    sections: {
      topics: "What I speak about",
      featured: "Featured talk",
      teaching: "Teaching",
      writing: "Writing",
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
    writingIntro:
      "Notes on startups, strategy and building companies, written after the fact from my own ventures. The originals are in Spanish, the language I wrote them in; each one also has an English translation, made with AI.",
    bio: "Vladimir Guzmán is a Colombian entrepreneur and technology builder based in London. He is the co-founder and former CTO of HoyTrabajas (Y Combinator W22), a former technology leader at FLUVIP, and is now building Gingga, AI solutions for entrepreneurs.",
    founderProfileLabel: "Download founder profile",
    closing: {
      titleLead: "Start the",
      titleEmphasis: "conversation.",
      text: "Conferences, roundtables and workshops. Tell me about your audience and the conversation you would like to start.",
    },
  },
  es: {
    meta: {
      title: "Charlas y escritos | Vladimir Guzmán",
      description:
        "Charlas, talleres y ensayos sobre emprendimiento, tecnología y potencial humano. Cuestiona los supuestos, empieza mejores conversaciones.",
    },
    eyebrow: "CHARLAS",
    headlineLines: ["Cuestiona los supuestos."],
    headlineEmphasis: "Empieza mejores conversaciones.",
    intro:
      "Aporto experiencia directa en emprendimiento, liderazgo tecnológico e inteligencia artificial a conversaciones sobre cómo crecen los negocios, cómo se adaptan las personas y cómo creamos oportunidades que importan.",
    primaryCta: { label: "Invítame a hablar", href: getWhatsappLink("es") },
    secondaryCta: { label: "Conoce la charla de Cambridge", href: CAMBRIDGE_HREF },
    sections: {
      topics: "Sobre qué hablo",
      featured: "Charla destacada",
      teaching: "Docencia",
      writing: "Escritos",
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
    writingIntro:
      "Notas sobre startups, estrategia y cómo construir empresas, escritas en retrospectiva a partir de mis propios proyectos. Están en su idioma original, el español; cada una tiene también una traducción al inglés hecha con IA.",
    bio: "Vladimir Guzmán es un emprendedor colombiano y constructor de tecnología radicado en Londres. Es cofundador y ex-CTO de HoyTrabajas (Y Combinator W22), exlíder tecnológico de FLUVIP y hoy construye Gingga, soluciones con inteligencia artificial para emprendedores.",
    founderProfileLabel: "Descargar perfil de fundador",
    closing: {
      titleLead: "Empieza la",
      titleEmphasis: "conversación.",
      text: "Conferencias, mesas redondas y talleres. Cuéntame sobre tu audiencia y la conversación que te gustaría iniciar.",
    },
  },
};

type TeachingText = {
  talksLabel: string;
  talks: string[];
  photoAlt: string;
};

const TEACHING: Record<Locale, TeachingText> = {
  en: {
    talksLabel: "I had the opportunity to work with the Colombian community and technology through classes such as:",
    talks: [
      "Purpose-Driven Entrepreneurship: Finding Your IKIGAI",
      "Business Model Design: Business Model Canvas",
      "Problem Discovery and Validation: From Problems to Business Opportunities",
      "MVP Testing and Customer Feedback: Validating Ideas Through Real-World Experiments",
      "Marketing with AI",
    ],
    photoAlt: "Vladimir Guzmán speaking into a microphone at an event",
  },
  es: {
    talksLabel: "Tuve la oportunidad de trabajar con la comunidad colombiana y la tecnología en clases como:",
    talks: [
      "Emprendimiento con propósito: encontrando tu IKIGAI",
      "Diseño de modelos de negocio: Business Model Canvas",
      "Descubrimiento y validación de problemas: de los problemas a las oportunidades de negocio",
      "Pruebas de MVP y feedback de clientes: validar ideas con experimentos reales",
      "Marketing con IA",
    ],
    photoAlt: "Vladimir Guzmán hablando con un micrófono en un evento",
  },
};

/** Photos of him teaching. Add more here as they are uploaded; each needs its alt text in both languages. */
const TEACHING_PHOTOS = ["/images/speaking/speaker-microphone.jpg"];

export function getSpeaking(lang: Locale): SpeakingContent {
  return { ...SPEAKING[lang], photo: getHero(lang).photo };
}

/** His teaching: the classes he gave and the photos where he appears. The general Consulate story lives on the journey. */
export function getTeaching(lang: Locale) {
  const { photoAlt, ...rest } = TEACHING[lang];
  return { ...rest, images: TEACHING_PHOTOS.map((src) => ({ src, alt: photoAlt })) };
}

type CommunityProgramText = {
  title: string;
  intro: string;
  classes: string[];
  linkLabel: string;
  photoAlts: [string, string];
};

const COMMUNITY_PROGRAM: Record<Locale, CommunityProgramText> = {
  en: {
    title: "In 2024 I co-led an English programme for the Latino community",
    intro: "Run by The Giving Lab and focused on the challenges that Latino migrants face in London. The classes included:",
    classes: ["English for work", "English from zero", "English for older adults", "Soft skills development"],
    linkLabel: "Visit The Giving Lab",
    photoAlts: [
      "Vladimir Guzmán and another person smiling in front of a screen with the Spanglish and The Giving Lab logos",
      "Adult learners around a table in an English class, with Vladimir Guzmán standing at the back",
    ],
  },
  es: {
    title: "En 2024 colideré un programa de inglés para la comunidad latina",
    intro:
      "Impulsado por The Giving Lab y enfocado en los retos que enfrenta el público migrante latino en Londres. Las clases incluyeron:",
    classes: [
      "Inglés para el trabajo",
      "Inglés desde cero",
      "Inglés para personas mayores",
      "Desarrollo de habilidades blandas",
    ],
    linkLabel: "Conocer The Giving Lab",
    photoAlts: [
      "Vladimir Guzmán y otra persona sonriendo frente a una pantalla con los logos de Spanglish y The Giving Lab",
      "Personas adultas alrededor de una mesa en una clase de inglés, con Vladimir Guzmán de pie al fondo",
    ],
  },
};

const COMMUNITY_PROGRAM_URL = "https://opencollective.com/thegivinglab";
const COMMUNITY_PROGRAM_PHOTOS = ["/images/speaking/giving-lab-spanglish.jpg", "/images/speaking/giving-lab-class.jpg"];

/** The 2024 English programme for the Latino community he co-led with The Giving Lab. */
export function getCommunityProgram(lang: Locale) {
  const { linkLabel, photoAlts, ...text } = COMMUNITY_PROGRAM[lang];
  return {
    ...text,
    link: { label: linkLabel, href: COMMUNITY_PROGRAM_URL },
    images: COMMUNITY_PROGRAM_PHOTOS.map((src, i) => ({ src, alt: photoAlts[i] })),
  };
}
