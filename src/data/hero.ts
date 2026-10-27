export const HERO = {
  eyebrow: "COLOMBIAN ROOTS. LONDON CHAPTER.",
  headlineLines: ["Question the obvious."],
  headlineEmphasis: "Build what matters.",
  byline: {
    name: "Vladimir Guzmán",
    roles: "Entrepreneur · Technology Builder · Speaker",
  },
  lead: [
    "I’ve built businesses, led technology teams, experienced failure and started again.",
    "From opening a restaurant in Colombia to building a Y Combinator-backed company, I’ve learned that the most valuable ideas often begin by questioning what everyone else takes for granted.",
  ],
  photo: {
    src: "/images/hero-cambridge-talk.jpg",
    alt: "Vladimir Guzmán presenting at Clare Hall, Cambridge",
    width: 2000,
    height: 1500,
  },
  primaryCta: { label: "Explore my thinking", href: "/essays" },
  secondaryCta: { label: "Invite me to speak", href: "#contact" },
} as const;
