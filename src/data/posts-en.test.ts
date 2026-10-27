import { describe, expect, it } from "vitest";
import { beingAnEntrepreneur, fluvipThanks, funkyLessons, sellingBeer, subscriptionBoxPoints } from "./posts";
import { beingAnEntrepreneurEn, fluvipThanksEn, funkyLessonsEn, sellingBeerEn, subscriptionBoxPointsEn } from "./posts-en";
import type { Post } from "./types";

const pairs: [string, Post, Post][] = [
  ["funkyLessons", funkyLessons, funkyLessonsEn],
  ["beingAnEntrepreneur", beingAnEntrepreneur, beingAnEntrepreneurEn],
  ["fluvipThanks", fluvipThanks, fluvipThanksEn],
  ["subscriptionBoxPoints", subscriptionBoxPoints, subscriptionBoxPointsEn],
  ["sellingBeer", sellingBeer, sellingBeerEn],
];

describe.each(pairs)("English translation of %s", (_name, original, translation) => {
  it("has the same number of sections as the original", () => {
    expect(translation.sections).toHaveLength(original.sections.length);
  });

  it("has a heading exactly where the original has one", () => {
    expect(translation.sections.map((s) => Boolean(s.heading))).toEqual(original.sections.map((s) => Boolean(s.heading)));
  });

  it("keeps the numbering of the original headings", () => {
    original.sections.forEach((s, i) => {
      const numbered = s.heading?.match(/^\d+\./);
      if (numbered) expect(translation.sections[i]?.heading?.startsWith(numbered[0])).toBe(true);
    });
  });

  it("has a translated title and non-empty translated text", () => {
    expect(translation.title.trim().length).toBeGreaterThan(0);
    expect(translation.title).not.toBe(original.title);
    original.sections.forEach((s, i) => {
      const t = translation.sections[i]!;
      expect(t.text.trim().length, `section ${i}`).toBeGreaterThan(0);
      expect(t.text, `section ${i}`).not.toBe(s.text);
      if (s.heading) expect(t.heading, `heading ${i}`).not.toBe(s.heading);
    });
  });

  it("leaves no Spanish punctuation behind", () => {
    const all = [translation.title, ...translation.sections.flatMap((s) => [s.heading ?? "", s.text])];
    for (const text of all) expect(text).not.toMatch(/[¿¡]/);
  });
});

describe("English translations as a set", () => {
  it("translates the signature line", () => {
    const last = beingAnEntrepreneurEn.sections.at(-1)!;
    expect(last.text).toBe("Written by: Vladimir Guzmán Mendoza.");
  });

  it("keeps proper names, brands and hashtags", () => {
    expect(funkyLessonsEn.sections.map((s) => s.text).join(" ")).toContain("#ViveFunky");
    expect(funkyLessonsEn.sections[1]!.text).toContain("René Rojas");
    expect(beingAnEntrepreneurEn.sections.map((s) => s.text).join(" ")).toContain("Muhammad Yunus");
    expect(sellingBeerEn.sections.at(-1)!.text).toContain("#DontWorryBEERHAPPY");
    expect(fluvipThanksEn.sections.map((s) => s.text).join(" ")).toContain("Wayra");
  });

  it("has five distinct titles", () => {
    const titles = pairs.map(([, , t]) => t.title);
    expect(new Set(titles).size).toBe(5);
  });
});

describe("proper nicknames", () => {
  it("keeps Juan Ramírez's nickname in Spanish, as the author asked", async () => {
    const { fluvipThanksEn } = await import("./posts-en");
    const text = fluvipThanksEn.sections.map((s) => s.text).join(" ");
    expect(text).toContain("“el gordito gustador”");
    expect(text).not.toContain("bon vivant");
  });
});
