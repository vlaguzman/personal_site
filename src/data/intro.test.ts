import { describe, expect, it } from "vitest";
import { INTRO } from "./intro";

describe("intro data", () => {
  it("opens with failure and restarting", () => {
    expect(INTRO.statement).toBe("I’ve built businesses, led technology teams, experienced failure and started again.");
  });

  it("backs it up with the restaurant-to-YC story", () => {
    expect(INTRO.support).toBe(
      "From opening a restaurant in Colombia to building a Y Combinator-backed company, I’ve learned that the most valuable ideas often begin by questioning what everyone else takes for granted.",
    );
  });
});
