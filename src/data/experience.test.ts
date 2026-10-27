import { describe, expect, it } from "vitest";
import { getExperience } from "./experience";

describe("getExperience", () => {
  const experience = getExperience(new Date("2026-06-01"));

  it("computes the years of experience from the earliest milestone", () => {
    expect(experience.paragraphs[0]).toBe(
      "I’ve spent 16 years working across entrepreneurship, software, product development and technology leadership.",
    );
  });

  it("links the ventures that failed to the ones that raised millions", () => {
    expect(experience.paragraphs[1]).toBe(
      "From early ventures that failed to companies that raised millions, every chapter has challenged how I think about business, success and leadership.",
    );
  });

  it("lists five roles, each with a title and context", () => {
    expect(experience.roles.map((r) => r.title)).toEqual([
      "Co-founder and former CTO",
      "Former technology leader",
      "Founder of multiple ventures",
      "Entrepreneurship programmes and workshops",
      "Speaker",
    ]);
    for (const role of experience.roles) expect(role.context.length).toBeGreaterThan(0);
    expect(experience.roles[0].context).toBe("HoyTrabajas · Y Combinator W22");
  });

  it("sends readers to the journey", () => {
    expect(experience.cta).toEqual({ label: "Explore my journey", href: "#journey" });
  });
});
