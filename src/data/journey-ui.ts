import type { Locale } from "@/i18n/config";

export type JourneyUi = {
  meta: { title: string; description: string };
  eyebrow: string;
  headlineLines: string[];
  headlineEmphasis: string;
  intro: string;
  /** Accessible name of the arc list. */
  arcLabel: string;
  /** Label of the "what I learned" box of a milestone. */
  learnedLabel: string;
  /** Label of the founder profile download under the intro. */
  profileLabel: string;
};

const JOURNEY_UI: Record<Locale, JourneyUi> = {
  en: {
    meta: {
      title: "The journey | Vladimir Guzmán",
      description:
        "Building, learning and starting again since 2010: the ventures, failures and lessons behind Vladimir Guzmán, from a restaurant in Colombia to Y Combinator.",
    },
    eyebrow: "THE JOURNEY",
    headlineLines: ["Different ventures."],
    headlineEmphasis: "One purpose.",
    intro:
      "Building, learning and starting again since 2010, guided by a question: why do some people transform their lives while others, equally talented, never get the chance?",
    arcLabel: "The arc of the journey",
    learnedLabel: "What I learned",
    profileLabel: "Download founder profile",
  },
  es: {
    meta: {
      title: "Mi trayectoria | Vladimir Guzmán",
      description:
        "Construir, aprender y volver a empezar desde 2010: los emprendimientos, los fracasos y las lecciones detrás de Vladimir Guzmán, desde un restaurante en Colombia hasta Y Combinator.",
    },
    eyebrow: "MI TRAYECTORIA",
    headlineLines: ["Distintos proyectos."],
    headlineEmphasis: "Un solo propósito.",
    intro:
      "Construyendo, aprendiendo y volviendo a empezar desde 2010, guiado por una pregunta: ¿por qué algunas personas transforman sus vidas mientras otras, igual de talentosas, nunca tienen la oportunidad?",
    arcLabel: "El arco de la trayectoria",
    learnedLabel: "Lo que aprendí",
    profileLabel: "Descargar perfil de fundador",
  },
};

export function getJourneyUi(lang: Locale): JourneyUi {
  return JOURNEY_UI[lang];
}
