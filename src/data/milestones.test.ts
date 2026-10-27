import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { milestones } from "./milestones";
import type { Block } from "./types";

const ids = milestones.map((m) => m.id);

describe("milestones", () => {
  it("keeps the 14 milestones in chronological order", () => {
    expect(milestones).toHaveLength(14);
    expect(ids[0]).toBe("year2010");
    expect(ids.at(-1)).toBe("now");
  });

  it("has unique ids", () => {
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has a title, eyebrow, period and content for each milestone", () => {
    for (const m of milestones) {
      expect(m.titleLines.length, m.id).toBeGreaterThan(0);
      expect(m.eyebrow, m.id).not.toBe("");
      expect(m.period, m.id).not.toBe("");
      expect(m.blocks.length, m.id).toBeGreaterThan(0);
    }
  });

  it("marks exactly one milestone as current, and it is the last", () => {
    const current = milestones.filter((m) => m.current);
    expect(current.map((m) => m.id)).toEqual(["now"]);
  });

  it("only links to anchors that exist", () => {
    const hrefs: string[] = [];
    const collect = (b: Block) => {
      if (b.kind === "origin") hrefs.push(b.href);
      if (b.kind === "ventureTree") b.ventures.forEach((v) => hrefs.push(v.href));
    };
    milestones.forEach((m) => m.blocks.forEach(collect));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(ids).toContain(href.slice(1));
  });

  it("gives every blog post a title and body", () => {
    const posts = milestones.flatMap((m) => m.blocks).flatMap((b) => (b.kind === "posts" ? b.items : []));
    expect(posts).toHaveLength(5);
    for (const post of posts) {
      expect(post.title, post.title).not.toBe("");
      expect(post.sections.length, post.title).toBeGreaterThan(0);
    }
  });

  it("only references gallery images that exist in public/", () => {
    const srcs = milestones.flatMap((m) => m.blocks).flatMap((b) => (b.kind === "gallery" ? b.images.map((i) => i.src) : []));
    expect(srcs).toHaveLength(16);
    for (const src of srcs) expect(existsSync(join("public", src)), src).toBe(true);
  });

  it("only adds a short `learned` lesson where the copy already states one", () => {
    const withLesson = milestones.filter((m) => m.learned !== undefined);
    expect(withLesson.length).toBeGreaterThanOrEqual(5);
    for (const m of withLesson) {
      expect(m.learned!.trim(), m.id).not.toBe("");
      expect(m.learned!.length, m.id).toBeLessThanOrEqual(200);
    }
    expect(milestones.find((m) => m.id === "now")?.learned).toBeUndefined();
    expect(milestones.find((m) => m.id === "year2012")?.learned).toBeUndefined();
  });

  it("opens Gingga externally", () => {
    const button = milestones.flatMap((m) => m.blocks).find((b) => b.kind === "button");
    expect(button).toMatchObject({ href: "https://gingga.com/" });
  });
});

describe("leadership figures", () => {
  const facts = (id: string) =>
    milestones
      .find((m) => m.id === id)
      ?.blocks.flatMap((b) => (b.kind === "facts" ? b.items : [])) ?? [];

  it("starts FLUVIP with 4 people (him included) and 20 people led", () => {
    expect(facts("year2014-fluvip").map((f) => f.value)).toEqual(["4", "20"]);
  });

  it("has him leading 15 people at HoyTrabajas", () => {
    expect(facts("year2019").find((f) => f.label === "developers led")?.value).toBe("15");
  });
});
