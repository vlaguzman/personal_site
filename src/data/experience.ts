import { milestones } from "./milestones";

export function getExperience(now: Date = new Date()) {
  const years = now.getFullYear() - Number.parseInt(milestones[0].year, 10);
  return {
    eyebrow: "THE TRACK RECORD",
    paragraphs: [
      `I’ve spent ${years} years working across entrepreneurship, software, product development and technology leadership.`,
      "From early ventures that failed to companies that raised millions, every chapter has challenged how I think about business, success and leadership.",
    ],
    roles: [
      { title: "Co-founder and former CTO", context: "HoyTrabajas · Y Combinator W22" },
      { title: "Former technology leader", context: "FLUVIP" },
      { title: "Founder of multiple ventures", context: "Including businesses that didn’t work" },
      { title: "Entrepreneurship programmes and workshops", context: "London" },
      { title: "Speaker", context: "AI, entrepreneurship and human potential" },
    ],
    cta: { label: "Explore my journey", href: "#journey" },
  } as const;
}
