import { describe, expect, it } from "vitest";
import { HERO, getLatestEssayHref } from "./hero";
import { milestones } from "./milestones";

describe("hero data", () => {
  it("points the essay CTA at the latest milestone that has blog posts", () => {
    const withPosts = milestones.filter((m) => m.blocks.some((b) => b.kind === "posts"));
    const href = getLatestEssayHref();
    expect(href).toBe(`#${withPosts.at(-1)!.id}`);
    expect(milestones.map((m) => m.id)).toContain(href.slice(1));
  });

  it("falls back to the journey anchor when there are no posts", () => {
    expect(getLatestEssayHref([])).toBe("#journey");
  });

  it("introduces him by his former CTO roles", () => {
    expect(HERO.subheadline).toBe(
      "Former CTO at HoyTrabajas.com (YC W22) & FLUVIP (Latin American Influencer Marketing Leader)",
    );
  });

  it("uses a photo that exists in public/ with a meaningful alt", async () => {
    const { existsSync } = await import("node:fs");
    expect(existsSync(`public${HERO.photo.src}`)).toBe(true);
    expect(HERO.photo.alt).toBe("Vladimir Guzmán presenting at Clare Hall, Cambridge");
  });
});
