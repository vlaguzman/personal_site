import type { Locale } from "@/i18n/config";

export const SITE = {
  /** Production origin, used to make canonical and hreflang URLs absolute. Override per environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vlaguzman.com",
  themeColor: "#172033",
  email: "guzman.vla@gmail.com",
  calendly: "https://calendly.com/guzman-vla/ideas",
  linkedin: "https://www.linkedin.com/in/vlaguzman/",
} as const;

export type SiteMeta = { title: string; description: string };

const SITE_META: Record<Locale, SiteMeta> = {
  en: {
    title: "Vladimir Guzmán | A builder’s journey",
    description:
      "Vladimir Guzmán. Colombian entrepreneur, software engineer and founder of Gingga. A journey through technology, entrepreneurship and community.",
  },
  es: {
    title: "Vladimir Guzmán | El camino de un constructor",
    description:
      "Vladimir Guzmán. Emprendedor colombiano, ingeniero de software y fundador de Gingga. Un recorrido por la tecnología, el emprendimiento y la comunidad.",
  },
};

export function getSiteMeta(lang: Locale): SiteMeta {
  return SITE_META[lang];
}

/** Main navigation targets, in display order. Labels come from `getChrome(lang).nav`. */
export const NAV_LINKS = [
  { href: "/journey" },
  { href: "/journey#now" },
  { href: "/speaking" },
  { href: "/work-together" },
  { href: "#contact" },
] as const;

export const FOUNDER_PROFILE_PDF = "/docs/founder-profile.pdf";

/** Locale-neutral parts of the Cambridge talk. The slides are in English, so the cover alt text is too. */
export const TALK = {
  pdf: "/docs/unlocking-human-potential-cambridge-2026.pdf",
  pdfName: "unlocking-human-potential-cambridge-2026.pdf",
  cover: "/images/cambridge-talk-cover.png",
  coverAlt:
    "Unlocking Human Potential in the Age of AI, Vladimir Guzmán Mendoza. Clare Hall Cambridge and Hero Amazonia. Conference 2026.",
} as const;
