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

  it("opens Gingga externally", () => {
    const button = milestones.flatMap((m) => m.blocks).find((b) => b.kind === "button");
    expect(button).toMatchObject({ href: "https://gingga.com/" });
  });
});
