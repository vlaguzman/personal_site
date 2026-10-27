import { describe, expect, it } from "vitest";
import { getExperience } from "./experience";
import { milestones } from "./milestones";

const factValues = milestones.flatMap((m) => m.blocks).flatMap((b) => (b.kind === "facts" ? b.items.map((f) => f.value) : []));

/** Figures supplied by the author that no milestone repeats. Keep this list short. */
const AUTHOR_FIGURES = ["20+"];

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
    expect(experience.cta).toEqual({ label: "Explore my journey", href: "/journey" });
  });

  it("backs the story with the money raised and two operating figures", () => {
    expect(experience.figures.map((f) => f.value)).toEqual(["US$4.5m", "US$5m", "20+", "270+"]);
    const text = [...experience.paragraphs, ...experience.roles.flatMap((r) => [r.title, r.context])].join(" ");
    for (const figure of experience.figures) {
      expect(text).not.toContain(figure.value);
      expect(figure.label.length).toBeGreaterThan(0);
    }
  });

  it("describes 20+ as the size of the teams he has led, not a number of companies", () => {
    const figure = experience.figures.find((f) => f.value === "20+");
    expect(figure?.label).toBe("people in the teams I have led across my companies");
  });

  it("cites the press for the money raised", () => {
    const raised = experience.figures.filter((f) => "source" in f);
    expect(raised.map((f) => f.label)).toEqual(["Series A at FLUVIP, 2018", "Seed round at HoyTrabajas, 2022"]);
    expect(raised.map((f) => ("source" in f ? f.source : null))).toEqual([
      {
        label: "LatamList",
        href: "https://latamlist.com/colombian-marketing-startup-fluvip-receives-us4-5m-series-a-investment/",
      },
      {
        label: "Forbes Colombia",
        href: "https://forbes.co/emprendedores/plataforma-de-empleos-hoytrabajas-capta-us5-millones-en-ronda-semilla",
      },
    ]);
  });

  it("only uses uncited figures that already appear in the milestone facts", () => {
    for (const figure of experience.figures) {
      if ("source" in figure) continue;
      expect([...factValues, ...AUTHOR_FIGURES], figure.value).toContain(figure.value);
    }
  });
});
