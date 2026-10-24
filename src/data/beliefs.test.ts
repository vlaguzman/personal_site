import { describe, expect, it } from "vitest";
import { BELIEFS } from "./beliefs";

describe("BELIEFS", () => {
  it("has 3 to 4 short principles", () => {
    expect(BELIEFS.length).toBeGreaterThanOrEqual(3);
    expect(BELIEFS.length).toBeLessThanOrEqual(4);
    for (const b of BELIEFS) {
      expect(b.title.length).toBeGreaterThan(0);
      expect(b.text.length).toBeGreaterThan(0);
      expect(b.text.length, b.title).toBeLessThanOrEqual(220);
    }
  });

  it("has unique titles", () => {
    expect(new Set(BELIEFS.map((b) => b.title)).size).toBe(BELIEFS.length);
  });
});
