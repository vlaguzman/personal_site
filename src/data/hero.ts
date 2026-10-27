import type { Locale } from "@/i18n/config";

export type HeroContent = {
  eyebrow: string;
  headlineLines: string[];
  headlineEmphasis: string;
  byline: { name: string; roles: string };
  photo: { src: string; alt: string; width: number; height: number };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

// Locale-neutral values are defined once; only text differs per locale.
const PHOTO = { src: "/images/hero-cambridge-talk.jpg", width: 2000, height: 1500 };
const PRIMARY_HREF = "/essays";
const SECONDARY_HREF = "#contact";
const NAME = "Vladimir Guzmán";

const HERO: Record<Locale, HeroContent> = {
  en: {
    eyebrow: "COLOMBIAN ROOTS. LONDON CHAPTER.",
    headlineLines: ["Question the obvious."],
    headlineEmphasis: "Build what matters.",
    byline: { name: NAME, roles: "Entrepreneur · Technology Builder · Speaker" },
    photo: { ...PHOTO, alt: "Vladimir Guzmán presenting at Clare Hall, Cambridge" },
    primaryCta: { label: "Explore my thinking", href: PRIMARY_HREF },
    secondaryCta: { label: "Invite me to speak", href: SECONDARY_HREF },
  },
  es: {
    eyebrow: "RAÍCES COLOMBIANAS. CAPÍTULO LONDRES.",
    headlineLines: ["Cuestiona lo establecido."],
    headlineEmphasis: "Construye lo que importa.",
    byline: { name: NAME, roles: "Emprendedor · Líder tecnológico · Conferencista" },
    photo: { ...PHOTO, alt: "Vladimir Guzmán presentando en Clare Hall, Cambridge" },
    primaryCta: { label: "Explora mis ideas", href: PRIMARY_HREF },
    secondaryCta: { label: "Invítame a conversar", href: SECONDARY_HREF },
  },
};

export function getHero(lang: Locale): HeroContent {
  return HERO[lang];
}
