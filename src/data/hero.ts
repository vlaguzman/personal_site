import { milestones as allMilestones } from "./milestones";
import type { Milestone } from "./types";

/** Anchor of the most recent milestone that carries blog posts; falls back to the journey section. */
export function getLatestEssayHref(list: readonly Milestone[] = allMilestones): string {
  const latest = list.filter((m) => m.blocks.some((b) => b.kind === "posts")).at(-1);
  return latest ? `#${latest.id}` : "#journey";
}

export const HERO = {
  eyebrow: "COLOMBIAN ROOTS. LONDON CHAPTER.",
  headlineLines: ["Builder.", "Founder."],
  headlineEmphasis: "YC alumnus.",
  subheadline:
    "Former CTO at HoyTrabajas.com (YC W22) & FLUVIP (Latin American Influencer Marketing Leader)",
  photo: {
    src: "/images/hero-cambridge-talk.jpg",
    alt: "Vladimir Guzmán presenting at Clare Hall, Cambridge",
    width: 2000,
    height: 1500,
  },
  primaryCta: { label: "Read my latest essay", href: getLatestEssayHref() },
  secondaryCta: { label: "Work with me", href: "#contact" },
} as const;
