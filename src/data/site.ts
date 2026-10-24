export const SITE = {
  title: "Vladimir Guzmán | A builder’s journey",
  description:
    "Vladimir Guzmán. Colombian entrepreneur, software engineer and founder of Gingga. A journey through technology, entrepreneurship and community.",
  themeColor: "#0F1F18",
  email: "guzman.vla@gmail.com",
  linkedin: "https://www.linkedin.com/in/vlaguzman/",
} as const;

export const NAV_LINKS = [
  { href: "#journey", label: "The journey" },
  { href: "#now", label: "Now" },
  { href: "#talks", label: "Talks & events" },
  { href: "/essays", label: "Essays" },
  { href: "#contact", label: "Let’s connect" },
] as const;

export const FOUNDER_PROFILE_PDF = "/docs/founder-profile.pdf";

export const TALK = {
  pdf: "/docs/unlocking-human-potential-cambridge-2026.pdf",
  pdfName: "unlocking-human-potential-cambridge-2026.pdf",
  cover: "/images/cambridge-talk-cover.png",
  coverAlt:
    "Unlocking Human Potential in the Age of AI, Vladimir Guzmán Mendoza. Clare Hall Cambridge and Hero Amazonia. Conference 2026.",
  themes: ["Entrepreneurship", "AI & adaptation", "Human potential"],
} as const;

/**
 * Newsletter service. There is no backend yet: while `endpoint` is null the
 * signup block shows a mailto call to action instead of a form.
 */
export const NEWSLETTER: { endpoint: string | null } = { endpoint: null };
