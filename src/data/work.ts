import { milestones } from "./milestones";
import { SITE } from "./site";

export const WORK = {
  eyebrow: "WORK TOGETHER",
  headlineLines: ["Independent thinking."],
  headlineEmphasis: "Practical experience.",
  intro:
    "I work with founders and business leaders who need to make better decisions about strategy, technology and growth.",
  cta: { label: "Book a conversation", href: SITE.calendly },
  secondaryCta: { label: "See the experience behind it", href: "/journey" },
  offers: [
    {
      title: "Strategic advisory",
      text: "Founder-level perspective on business models, product decisions, technical leadership and organisational challenges.",
    },
    {
      title: "AI and technology strategy",
      text: "Helping businesses identify useful opportunities, assess feasibility and turn technology decisions into practical plans.",
    },
    {
      title: "Workshops and speaking",
      text: "Interactive sessions for leadership teams, entrepreneurial communities and organisations navigating technological change.",
      link: { label: "See speaking", href: "/speaking" },
    },
  ],
  approach: "Engagements are considered individually, based on the problem, potential impact and fit.",
  gingga: {
    title: "Looking for Gingga?",
    text: "Gingga, the company building AI-powered sales systems, is independent from this work and has its own website. If that is what you are looking for, start there.",
    linkLabel: "Visit Gingga",
  },
  closing: {
    title: "Start with the decision.",
    text: "Tell me about the decision you are facing. If I can help, we will talk about how.",
  },
} as const;

/** Gingga's site, read from the journey so the URL lives in one place. */
export function getGinggaUrl() {
  const now = milestones.find((m) => m.id === "now");
  const button = now?.blocks.find((b) => b.kind === "button");
  if (button?.kind !== "button") throw new Error("Gingga link not found in the Now milestone");
  return button.href;
}
