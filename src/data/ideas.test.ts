import { describe, expect, it } from "vitest";
import { IDEAS } from "./ideas";

describe("IDEAS", () => {
  it("challenges exactly three assumptions", () => {
    expect(IDEAS.items).toHaveLength(3);
  });

  it("states each idea as a claim, with a supporting argument", () => {
    expect(IDEAS.items.map((i) => i.claim)).toEqual([
      "Not every business needs AI.",
      "Raising money isn’t the same as building a successful business.",
      "Talent isn’t always the problem. Opportunity often is.",
    ]);
    for (const idea of IDEAS.items) expect(idea.argument.length).toBeGreaterThan(0);
  });

  it("admits it does not have every answer and invites readers to the essays", () => {
    expect(IDEAS.closing).toBe(
      "I don’t claim to have every answer. I believe good questions, honest debate and the willingness to experiment can take us further.",
    );
    expect(IDEAS.cta).toEqual({ label: "Explore more ideas", href: "/essays" });
  });
});
