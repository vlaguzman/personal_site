import { describe, expect, it } from "vitest";
import { ESSAYS, START_HERE_SLUG, TOPICS } from "./essays";
import { milestones } from "./milestones";
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
