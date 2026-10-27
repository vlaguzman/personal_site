import { describe, expect, it } from "vitest";
import { ESSAYS, getEssays, START_HERE_SLUG, TOPICS } from "./essays";
import { milestones } from "./milestones";
import { beingAnEntrepreneurEn, fluvipThanksEn, funkyLessonsEn, sellingBeerEn, subscriptionBoxPointsEn } from "./posts-en";
import { NEWSLETTER } from "./site";

describe("essays data", () => {
  const blogPosts = milestones.flatMap((m) => m.blocks).flatMap((b) => (b.kind === "posts" ? b.items : []));

  it("publishes every blog post of the timeline as an essay, with its real body", () => {
    expect(ESSAYS.map((e) => e.title).sort()).toEqual(blogPosts.map((p) => p.title).sort());
    for (const essay of ESSAYS) {
      const post = blogPosts.find((p) => p.title === essay.title);
      expect(essay.sections).toBe(post?.sections);
      expect(essay.lang).toBe("es");
    }
  });

  it("has unique url-safe slugs", () => {
    const slugs = ESSAYS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("only uses known topics", () => {
    for (const e of ESSAYS) if (e.topic) expect(TOPICS).toContain(e.topic);
  });

  it("starts the reader at an essay that exists", () => {
    expect(ESSAYS.map((e) => e.slug)).toContain(START_HERE_SLUG);
  });

  it("has no newsletter endpoint until a real service is configured", () => {
    expect(NEWSLETTER.endpoint).toBeNull();
  });
});

describe("getEssays", () => {
  it("returns the Spanish originals for es", () => {
    expect(getEssays("es")).toBe(ESSAYS);
    for (const e of getEssays("es")) expect(e.translatedWithAI).toBeUndefined();
  });

  it("returns an English translation of every essay for en, with the same slug, topic and order", () => {
    const en = getEssays("en");
    expect(en.map((e) => e.slug)).toEqual(ESSAYS.map((e) => e.slug));
    expect(en.map((e) => e.topic)).toEqual(ESSAYS.map((e) => e.topic));
    expect(en.map((e) => e.image)).toEqual(ESSAYS.map((e) => e.image));
  });

  it("marks every translation as English and translated with AI", () => {
    for (const e of getEssays("en")) {
      expect(e.lang).toBe("en");
      expect(e.translatedWithAI).toBe(true);
    }
  });

  it("builds the translations from the English posts", () => {
    const bySlug = Object.fromEntries(getEssays("en").map((e) => [e.slug, e]));
    expect(bySlug["lecciones-quiebra-restaurante"]?.sections).toBe(funkyLessonsEn.sections);
    expect(bySlug["ser-emprendedor"]?.sections).toBe(beingAnEntrepreneurEn.sections);
    expect(bySlug["negocio-caja-suscripcion"]?.sections).toBe(subscriptionBoxPointsEn.sections);
    expect(bySlug["gracias-fluvip"]?.sections).toBe(fluvipThanksEn.sections);
    expect(bySlug["vender-cerveza"]?.sections).toBe(sellingBeerEn.sections);
  });

  it("never shares a title between a translation and its original", () => {
    getEssays("en").forEach((e, i) => expect(e.title).not.toBe(ESSAYS[i]!.title));
  });
});

