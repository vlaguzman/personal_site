import { getHero } from "./hero";
import { milestones } from "./milestones";
import { SITE } from "./site";
import type { Fact, GalleryImage } from "./types";

export const SPEAKING = {
  eyebrow: "SPEAKING",
  headlineLines: ["Challenge assumptions."],
  headlineEmphasis: "Start better conversations.",
  intro:
    "I bring firsthand experience from entrepreneurship, technology leadership and AI to conversations about how businesses grow, how people adapt and how we create opportunities that matter.",
  photo: getHero("en").photo,
  primaryCta: { label: "Invite me to speak", href: SITE.calendly },
  secondaryCta: { label: "See the Cambridge talk", href: "#cambridge" },
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
  closing:
    "Conferences, roundtables and workshops. Tell me about your audience and the conversation you would like to start.",
} as const;

/** The Consulate programmes as a speaking engagement, read from the journey so nothing is repeated. */
export function getConsulateEngagement() {
  const milestone = milestones.find((m) => m.id === "year2023-community");
  if (!milestone) throw new Error("Consulate milestone not found");
  const video = milestone.blocks.find((b) => b.kind === "video");
  const gallery = milestone.blocks.find((b) => b.kind === "gallery");
  const facts = milestone.blocks.find((b) => b.kind === "facts");
  if (video?.kind !== "video" || gallery?.kind !== "gallery" || facts?.kind !== "facts") {
    throw new Error("Consulate milestone is missing its video, photos or facts");
  }
  return {
    eyebrow: "LONDON · 2023–2025 · PROGRAMMES & WORKSHOPS",
    title: "Colombian Consulate in London",
    text: "I designed entrepreneurship programmes and delivered workshops for migrant entrepreneurs, from business development to digital transformation.",
    video: { youtubeId: video.youtubeId, title: video.title },
    images: gallery.images as GalleryImage[],
    facts: facts.items as Fact[],
  };
}
