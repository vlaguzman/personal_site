import { describe, expect, it } from "vitest";
import { bentoShapes } from "./bento";

const area = { tile: 1, wide: 2, big: 4, full: 8 } as const;

describe("bentoShapes", () => {
  it("returns one shape per image", () => {
    for (const n of [0, 1, 2, 3, 4, 5, 9]) expect(bentoShapes(n)).toHaveLength(n);
  });

  it("always fills whole rows of a 4-column grid (no holes)", () => {
    for (const n of [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
      const total = bentoShapes(n).reduce((sum, s) => sum + area[s], 0);
      expect(total % 4, `n=${n}`).toBe(0);
    }
  });

  it("varies the shapes in a longer gallery", () => {
    expect(new Set(bentoShapes(9)).size).toBeGreaterThan(2);
  });
});
