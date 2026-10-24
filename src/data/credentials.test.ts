import { describe, expect, it } from "vitest";
import { getCredentials } from "./credentials";
import { milestones } from "./milestones";

const factValues = milestones.flatMap((m) => m.blocks).flatMap((b) => (b.kind === "facts" ? b.items.map((f) => f.value) : []));

describe("getCredentials", () => {
  const items = getCredentials(new Date("2026-06-01"));

  it("lists 4 to 5 items with a value and a label", () => {
    expect(items.length).toBeGreaterThanOrEqual(4);
    expect(items.length).toBeLessThanOrEqual(5);
    for (const item of items) {
      expect(item.value).not.toBe("");
      expect(item.label).not.toBe("");
    }
  });

  it("computes the years since the earliest milestone", () => {
    const start = Number.parseInt(milestones[0].year, 10);
    expect(items.find((i) => i.value === String(2026 - start))).toBeDefined();
  });

  it("only uses figures that already appear in the milestone facts", () => {
    const figures = items.map((i) => i.value).filter((v) => /^\d[\d,.+]*$/.test(v) && v !== String(2026 - Number.parseInt(milestones[0].year, 10)));
    expect(figures.length).toBeGreaterThan(0);
    for (const value of figures) expect(factValues, value).toContain(value);
  });

  it("includes Y Combinator", () => {
    expect(items.some((i) => /YC|Y Combinator/.test(i.value + i.label))).toBe(true);
  });
});
